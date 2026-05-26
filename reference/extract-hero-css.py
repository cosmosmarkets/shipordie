import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
html = (ROOT / "reference" / "source.html").read_text(encoding="utf-8", errors="ignore")

def css_hrefs(from_html: str) -> list[str]:
    # Next can emit hero-related CSS under both:
    # - /_next/static/css/*.css
    # - /_next/static/chunks/*.css (turbopack-style)
    return sorted(
        set(
            re.findall(
                r'href="(/_next/static/(?:chunks|css)/[^"]+\.css[^"]*)"',
                from_html,
            )
        )
    )


links = css_hrefs(html)
out = ROOT / "src" / "styles" / "hero-live.css"
out.parent.mkdir(parents=True, exist_ok=True)

def fetch_text(url: str) -> str:
    try:
        return urllib.request.urlopen(url, timeout=60).read().decode("utf-8", errors="ignore")
    except Exception as e:
        return f"/* failed {url}: {e} */"


if not links:
    # Fallback: snapshot might be stale; try the current deployed HTML.
    live = urllib.request.urlopen("https://www.ship-or-die.com", timeout=30).read().decode("utf-8", errors="ignore")
    links = css_hrefs(live)

chunks: list[str] = []
for link in links:
    # IMPORTANT: keep the full query string (e.g. ?dpl=...) because some hashed CSS assets appear to require it.
    url = "https://www.ship-or-die.com" + link
    chunks.append(fetch_text(url))

text = "\n".join(chunks)

# Include inline `<style>` blocks from the snapshot.
# The reference HTML embeds some hero CSS directly (e.g. rain layer rules).
inline_styles = re.findall(
    r"<style[^>]*>(.*?)</style>",
    html,
    flags=re.DOTALL | re.IGNORECASE,
)
if inline_styles:
    text += "\n" + "\n".join(inline_styles)

# If we couldn't fetch anything useful, still write something for debugging.
if not text.strip():
    out.write_text("/* no css links fetched */", encoding="utf-8")
    raise SystemExit(0)

# Keep hero-related rules only
keywords = (
    # top-level hero structure
    "pirate-scroll",
    "pirate-stage",
    "pirate-rain-layer",
    # storm / sky
    "storm-layer",
    "storm-flash",
    "storm-ambient-flash",
    "storm-asset",
    "moon-asset",
    "cloud-asset",
    # visuals
    "ship-scene",
    "ship-image",
    "wave-layer",
    "wave-layer-back",
    "wave-layer-front",
    # header/copy on the hero
    "scene-header",
    "scene-brand",
    "scene-header-actions",
    "scene-copy",
    "scene-copy-ship",
    # sprite animations
    "action-frame",
    "crew-sprite",
    "crew-sprite-two",
    "crew-sprite-three",
    "crew-sprite-four",
    "captain-sprite",
    "slacker-sprite",
    "fall-sprite",
    "splash-sprite",
    "slacker-idle-frame",
    "captain-frame-",
    "fall-frame-",
    "splash-frame-",
    # sprite keyframe names used by hero animation CSS
    "crewWork",
    "laptopFlicker",
    "typingHands",
    "startMissionPirateBob",
    # rain / storm keyframes
    "ambientScreenFlash",
    "ambientThunderFlash",
    "pirateRainDrop",
    # wave keyframes
    "waveBack",
    "waveFront",
    "waveMid",
)
# Minified CSS is often one line — extract brace blocks containing keywords
blocks = []
i = 0
while i < len(text):
    # Avoid starting inside property values (e.g. decimals like `0.45`) by requiring the previous char
    # to look like it's at the end of a rule.
    if text[i] == "." or text[i] == "@":
        prev = text[i - 1] if i > 0 else ""
        if i > 0 and prev not in ("}", "\n", "\r", ";", " "):
            i += 1
            continue
        start = i
        depth = 0
        j = i
        while j < len(text):
            if text[j] == "{":
                depth += 1
            elif text[j] == "}":
                depth -= 1
                if depth == 0:
                    block = text[start : j + 1]
                    if any(k in block for k in keywords):
                        blocks.append(block)
                    i = j + 1
                    break
            j += 1
        else:
            break
    else:
        i += 1
out.write_text("\n\n".join(blocks) if blocks else text[:300000], encoding="utf-8")
lines = blocks
print(f"Wrote {out} ({len(lines)} filtered lines, {len(chunks)} chunks)")
