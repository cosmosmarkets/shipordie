import html
import re
import json
from pathlib import Path
from urllib.parse import urljoin

BASE = "https://www.ship-or-die.com"
SRC = Path(__file__).parent / "source.html"
OUT = Path(__file__).parent

src = SRC.read_text(encoding="utf-8")


def clean_html(text: str) -> str:
    text = re.sub(r"<br\s*/?>", "\n", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


# --- Assets ---
all_paths = set()
for pat in [
    r'(?:src|href)="(/[^"]+)"',
    r"url\((/[^)]+)\)",
    r"bg-\[url\(&#x27;([^&]+)&#x27;\)\]",
    r"bg-\[url\('([^']+)'\)\]",
]:
    all_paths.update(re.findall(pat, src))

media = sorted(p for p in all_paths if any(x in p for x in ("/media/", "/landing/", ".webp", ".png", ".jpg", ".gif", ".svg")))
fonts = sorted(p for p in all_paths if p.endswith(".woff2"))
css_files = sorted(set(re.findall(r'<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"', src)))
scripts = sorted(set(re.findall(r'<script[^>]*src="([^"]+)"', src)))

# --- Colors from Tailwind arbitrary values and hex ---
colors = sorted(set(re.findall(r"#(?:[0-9a-fA-F]{3}){1,2}\b", src)))
tailwind_colors = sorted(set(re.findall(r"(?:text|bg|border|from|to|via)-\[([^\]]+)\]", src)))

# --- Meta ---
meta = {}
for m in re.finditer(r"<meta\s+([^>]+)>", src):
    attrs = dict(re.findall(r'(\w+)="([^"]*)"', m.group(1)))
    if "name" in attrs:
        meta[attrs["name"]] = attrs.get("content", "")
    if "property" in attrs:
        meta[attrs["property"]] = attrs.get("content", "")

title = re.search(r"<title>([^<]+)</title>", src).group(1)

# --- Tweets ---
tweets = []
for article in re.findall(r'<article class="tweet-container-module__[^"]*">(.*?)</article>', src, re.S):
    author = re.search(r'alt="([^"]*)"[^>]*width="48"', article)
    handle = re.search(r'href="https://x\.com/([^/"]+)/status/', article)
    text_block = re.search(r'<p[^>]*class="[^"]*tweet-body[^"]*"[^>]*>(.*?)</p>', article, re.S)
    if not text_block:
        text_block = re.search(r'<div[^>]*class="[^"]*tweet-body[^"]*"[^>]*>(.*?)</div>', article, re.S)
    date = re.search(r'dateTime="([^"]+)"', article)
    likes = re.search(r'aria-label="(\d+) likes?"', article)
    replies = re.search(r'aria-label="(\d+) repl', article)
    imgs = re.findall(r'src="(https://pbs\.twimg\.com/[^"]+)"', article)
    status_url = re.search(r'href="(https://x\.com/[^"]+/status/\d+)"', article)
    if author or handle:
        tweets.append(
            {
                "author_name": author.group(1) if author else "",
                "handle": handle.group(1) if handle else "",
                "text": clean_html(text_block.group(1)) if text_block else "",
                "date": date.group(1) if date else "",
                "likes": int(likes.group(1)) if likes else 0,
                "replies": int(replies.group(1)) if replies else 0,
                "images": imgs,
                "url": status_url.group(1) if status_url else "",
            }
        )

# --- Community members (crew scene) ---
crew = []
for block in re.findall(r'<a[^>]*href="/[^"]*"[^>]*class="[^"]*crew[^"]*"[^>]*>(.*?)</a>', src, re.S):
    name = re.search(r'alt="([^"]+)"', block)
    startups = re.search(r"(\d+)\s*startup", block, re.I)
    profile = re.search(r'href="(/profile/[^"]+)"', block)
    if name:
        crew.append(
            {
                "name": name.group(1),
                "startups_shipped": int(startups.group(1)) if startups else 0,
                "profile_url": profile.group(1) if profile else "",
            }
        )

# Alternative: look for profile links with names
if len(crew) < 10:
    for m in re.finditer(
        r'href="(/profile/[^"]+)"[^>]*>.*?alt="([^"]+)"[^>]*>.*?(\d+)\s*startup',
        src,
        re.S,
    ):
        crew.append(
            {
                "name": m.group(2),
                "startups_shipped": int(m.group(3)),
                "profile_url": m.group(1),
            }
        )

# Dedupe crew
seen = set()
unique_crew = []
for c in crew:
    key = c["name"]
    if key not in seen:
        seen.add(key)
        unique_crew.append(c)
crew = unique_crew

# --- FAQ ---
faqs = []
for block in re.findall(r"<details[^>]*>(.*?)</details>", src, re.S):
    q = re.search(r"<summary[^>]*>(.*?)</summary>", block, re.S)
    body = re.sub(r"<summary[^>]*>.*?</summary>", "", block, flags=re.S)
    if q:
        faqs.append({"question": clean_html(q.group(1)), "answer": clean_html(body)})

# --- Headings ---
headings = [clean_html(x) for x in re.findall(r"<h[1-6][^>]*>(.*?)</h[1-6]>", src, re.S)]

# --- CTAs ---
ctas = []
for m in re.finditer(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', src, re.S):
    label = clean_html(m.group(2))
    if label and len(label) < 60 and any(k in label.lower() for k in ("join", "crew", "ship", "dashboard", "pricing")):
        ctas.append({"label": label, "href": m.group(1)})

# Dedupe CTAs
seen_cta = set()
unique_ctas = []
for c in ctas:
    k = (c["label"], c["href"])
    if k not in seen_cta:
        seen_cta.add(k)
        unique_ctas.append(c)

# --- Stats ---
stats = {}
for key, pat in [
    ("people_shipping", r"(\d+)\s*people are shipping"),
    ("thrown_overboard", r"(\d+)\s*people thrown overboard"),
    ("pirates_shipping", r"(\d+)\s*pirates are shipping"),
    ("spots_left", r"(\d+)\s*spots left"),
]:
    m = re.search(pat, src, re.I)
    if m:
        stats[key] = int(m.group(1))

# --- Section structure from HTML ---
section_ids = sorted(set(re.findall(r'\sid="([a-zA-Z0-9_-]+)"', src)))

# --- Design system ---
design = {
    "background_classes": sorted(set(re.findall(r"bg-background|bg-\[[^\]]+\]|bg-[a-z]+", src)))[:30],
    "text_classes": sorted(set(re.findall(r"text-bone|text-\[[^\]]+\]|text-[a-z]+", src)))[:40],
    "font_classes": sorted(set(re.findall(r"font-(?:mono|display|pirate|sans|serif|\[[^\]]+\])", src))),
    "hex_colors": colors,
    "tailwind_arbitrary_colors": tailwind_colors[:40],
    "key_colors": {
        "bone": "Primary light text (text-bone)",
        "background": "Page background (bg-background)",
        "gold_accent": "#d4a556 — highlighted stats/emphasis",
        "muted_teal": "#667d82 — dimmed scroll text",
        "soft_green": "#c9d2cc — body copy in problem section",
    },
}

# --- Full content bundle ---
bundle = {
    "meta": {
        "url": BASE,
        "title": title,
        "description": meta.get("description", ""),
        "og_title": meta.get("og:title", ""),
        "og_description": meta.get("og:description", ""),
        "og_image": meta.get("og:image", ""),
        "og_image_width": meta.get("og:image:width", ""),
        "og_image_height": meta.get("og:image:height", ""),
        "twitter_card": meta.get("twitter:card", ""),
        "twitter_image": meta.get("twitter:image", ""),
    },
    "typography": {
        "fonts": {
            "Anton": "Hero SHIP/DIE headlines",
            "Pirata One": "Pirate decorative headings",
            "Geist Mono": "UI / step labels / body mono",
            "Press Start 2P": "Pixel retro accents",
        },
        "woff2_files": fonts,
    },
    "navigation": {
        "logo": "Ship or Die",
        "byline": "by Marc Lou & Jack Friks",
        "items": [
            {"label": "Dashboard", "href": "/dashboard"},
            {"label": "Pricing", "href": "#pricing"},
            {"label": "Join now", "href": "#pricing", "style": "primary CTA"},
        ],
    },
    "sections": {
        "hero": {
            "id": "top",
            "headline_parts": ["SHIP", "your app in 30 days", "or", "DIE", "miss the deadline, get kicked out forever."],
            "scroll_cue": True,
            "animated_scene": {
                "layers": [
                    "storm-layer + storm-flash",
                    "moon",
                    "clouds",
                    "rain particles",
                    "ship-scene (hero ship image)",
                    "crew sprites (multiple positions)",
                    "captain sprite",
                    "slacker sprite",
                    "fall + splash sprites (overboard animation)",
                    "wave layers (parallax)",
                ],
                "hero_ship": "/_next/static/media/ship-hero.11aijkz4a5ddc.webp",
            },
            "header": "Sticky nav over hero",
        },
        "problem": {
            "layout": "Sticky scroll-reveal text, min-h 145svh, pixel noise texture overlay",
            "texture": "/landing/pirate/pixel-noise.png",
            "copy_sequence": [
                {"text": "0 users.", "style": "emphasis gold, full opacity"},
                {"text": "0 revenue.", "style": "emphasis gold, dimmed"},
                {"text": "Not because the idea is bad...", "style": "dimmed blur"},
                {"text": "...but because nobody can actually use your app yet.", "style": "dimmed blur"},
                {"text": "\"I'm two weeks away.\"", "style": "dimmed blur"},
                {"text": "You've been two weeks away for four months 💀", "style": "dimmed blur"},
                {"text": "Polishing in private isn't progress.", "style": "revealed"},
                {"text": "You don't need more time.", "style": "revealed"},
                {"text": "You need a different strategy.", "style": "revealed, emphasis"},
            ],
        },
        "how_it_works": {
            "headline": "Ship an app every 30 days until one changes your life",
            "steps": [
                {
                    "number": "01",
                    "label": "step",
                    "title": "Become a pirate",
                    "bullets": [
                        "Join our Discord community of pirates who ship",
                        "Hold each other accountable with daily check-ins",
                        "Feeling solo? Join the voice channels and cowork with others",
                    ],
                    "image": "/_next/static/media/step-1.146j4hpyjcz8o.png",
                },
                {
                    "number": "02",
                    "label": "step",
                    "title": "Make small bets",
                    "bullets": [
                        "One feature. A buy button. That's all you need to validate",
                        "Overthinking? Each step guides you to the next",
                        "Finally launch your idea — it's mandatory",
                    ],
                    "image": "/_next/static/media/step-2.17jvbmqhriu4h.jpg",
                },
                {
                    "number": "03",
                    "label": "step",
                    "title": "Don't quit",
                    "bullets": [
                        "Public mission profiles that keep you accountable",
                        "30-day deadlines and trophies that turn shipping into a game",
                        "Ship, launch, repeat is your new normal",
                    ],
                    "image": "/_next/static/media/step-3.0jt6mi8tf6a48.jpg",
                },
            ],
            "cta": {"label": "Join the crew", "href": "#pricing"},
        },
        "consequences": {
            "headline": "Miss the deadline...",
            "penalties": [
                "Hall of shame in the public Discord channel",
                "Kicked out of the community",
                "Publicly marked overboard",
                "No refund",
            ],
            "visual": "Plank walk animation — pirate walks plank, falls, shark",
        },
        "founders": {
            "headline": "Built by people who ship.",
            "people": [
                {
                    "name": "Marc Lou",
                    "bio": "Marc thought he was Mark Zuckerberg and spent 2 years building ambitious startups nobody wanted: 0 users, $0 revenue. So he changed strategy: build, launch, repeat. He has now launched 30+ startups, including DataFast ($22K MRR) and TrustMRR ($33K MRR).",
                },
                {
                    "name": "jack friks",
                    "bio": "Jack quit McDonald's to learn to code in his mom's basement. His first app Curiosity Quench hit 100,000 downloads, then he shipped Post Bridge (now $35K MRR) and Lovelee Couples (100,000+ downloads).",
                },
            ],
            "social_proof_headline": f"{stats.get('pirates_shipping', 110)} pirates are shipping. Aye!",
            "tweet_carousel": {
                "visible_count": 3,
                "expand_label": "Show 3 more tweets",
                "tweets": tweets,
            },
        },
        "pricing": {
            "id": "pricing",
            "eyebrow": "pricing",
            "headline": "Join the crew.",
            "price": {"was": 299, "now": 249, "currency": "USD", "type": "one-time payment"},
            "includes": [
                "Private community access",
                "Gamified 30-day startup journey",
                "Public profile with all your apps",
            ],
            "warning": "No refund. Ship or get kicked out.",
            "cta": {"label": "Join for $249", "href": "checkout/payment link"},
            "tier_ladder": [
                {"price": 199, "label": "sold out"},
                {"price": 249, "label": f"{stats.get('spots_left', 90)} spots left", "active": True},
                {"price": 299, "label": "standard price"},
            ],
        },
        "faq": {
            "headline": "Questions before you board?",
            "items": faqs,
        },
        "community": {
            "id": "community",
            "stats": {
                "shipping": stats.get("people_shipping"),
                "overboard": stats.get("thrown_overboard"),
            },
            "crew_scene": "Interactive deck with member avatars — on_deck vs overboard states",
            "members": crew,
            "footer": {
                "legal": [
                    {"label": "Terms", "href": "/terms"},
                    {"label": "Privacy", "href": "/privacy"},
                ],
                "copyright": "Ship or Die — Marc Lou & Jack Friks",
            },
        },
    },
    "headings_extracted": headings,
    "ctas": unique_ctas,
    "section_ids": section_ids,
    "design_system": design,
    "assets": {
        "css": css_files,
        "javascript": scripts,
        "images_and_media": media,
        "fonts": fonts,
        "full_urls": [urljoin(BASE, p) for p in media + fonts],
    },
    "stats": stats,
}

(OUT / "scrape-content.json").write_text(json.dumps(bundle, indent=2, ensure_ascii=False), encoding="utf-8")

# Asset manifest for download
manifest = {
    "base": BASE,
    "assets": [
        {"path": p, "url": urljoin(BASE, p), "type": "font" if p.endswith(".woff2") else "image"}
        for p in sorted(set(media + fonts))
    ],
}
(OUT / "asset-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")

# Update SCRAPE.md with tweets and crew
lines = (OUT / "SCRAPE.md").read_text(encoding="utf-8") if (OUT / "SCRAPE.md").exists() else []

md = []
md.append("# Ship or Die — Complete Site Scrape\n")
md.append(f"**Live URL:** {BASE}\n")
md.append(f"**Title:** {title}\n")
md.append(f"**Description:** {bundle['meta']['description']}\n\n")

md.append("## Design System\n\n")
md.append("### Colors\n")
for k, v in design["key_colors"].items():
    md.append(f"- **{k}**: {v}\n")
md.append("\n### Hex values found in source\n")
for c in colors[:20]:
    md.append(f"- `{c}`\n")

md.append("\n### Typography\n")
for font, use in bundle["typography"]["fonts"].items():
    md.append(f"- **{font}** — {use}\n")

md.append("\n## Page Sections (in order)\n")
md.append("1. **Hero** — animated pirate ship storm scene\n")
md.append("2. **Problem** — scroll-reveal copy about 0 users/revenue\n")
md.append("3. **How it works** — 3 steps with images\n")
md.append("4. **Consequences** — miss deadline penalties + plank animation\n")
md.append("5. **Founders** — Marc Lou & jack friks bios + tweet carousel\n")
md.append("6. **Pricing** — $249 one-time, tier ladder\n")
md.append("7. **FAQ** — 11 accordion questions\n")
md.append("8. **Community** — live crew deck + stats footer\n")

md.append("\n## Tweets in carousel\n\n")
for i, t in enumerate(tweets, 1):
    md.append(f"### {i}. @{t['handle']} ({t['author_name']})\n")
    md.append(f"- **Date:** {t['date']}\n")
    md.append(f"- **Text:** {t['text'][:300]}{'...' if len(t['text'])>300 else ''}\n")
    md.append(f"- **URL:** {t['url']}\n")
    md.append(f"- **Likes:** {t['likes']} | **Replies:** {t['replies']}\n\n")

md.append(f"\n## Community Members ({len(crew)} parsed)\n\n")
for c in crew[:30]:
    md.append(f"- **{c['name']}** — {c['startups_shipped']} startups shipped — `{c.get('profile_url','')}`\n")
if len(crew) > 30:
    md.append(f"\n... and {len(crew)-30} more\n")

md.append("\n## All Media Assets\n\n")
for p in media:
    md.append(f"- `{p}`\n")

md.append("\n## FAQ\n\n")
for item in faqs:
    md.append(f"### {item['question']}\n\n{item['answer']}\n\n")

(OUT / "SCRAPE.md").write_text("".join(md), encoding="utf-8")

print(f"Done: {len(tweets)} tweets, {len(crew)} crew, {len(media)} media, {len(faqs)} FAQs, {len(colors)} colors")
