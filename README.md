# Ship or Die — Site Clone / Redesign Reference

Thorough scrape of [ship-or-die.com](https://www.ship-or-die.com/) for redesign work.

## Files

| File | Purpose |
|------|---------|
| `COPY.md` | Voice rules + finalized landing copy for redesign |
| `source.html` | Full live HTML (~610KB) |
| `SCRAPE.md` | Human-readable audit — copy, sections, design tokens, tweets, FAQs |
| `scrape-content.json` | Structured JSON — all sections, copy, tweets, FAQs, assets, design system |
| `crew-members.json` | Parsed community member names + startup counts |
| `asset-manifest.json` | All discovered asset URLs |
| `assets/` | Downloaded images, fonts, avatars (156+ files) |

## Scripts

```bash
python scrape.py           # Re-parse source.html → JSON + SCRAPE.md
python extract-crew.py     # Extract community members
python download-assets.py  # Download static media + avatars
```

## Site Summary

**Product:** Private paid community ($249 one-time) for founders who must ship a startup in 30 days or get kicked out.

**Tech stack (original):** Next.js (App Router), Tailwind CSS, custom pirate-themed animations, embedded X/Twitter cards.

**Page flow:**
1. Hero — storm + ship animation, "SHIP … or DIE"
2. Problem — scroll-reveal "0 users / 0 revenue" copy
3. How it works — 3 steps with screenshots
4. Consequences — plank walk / overboard penalties
5. Founders — Marc Lou & jack friks + tweet carousel
6. Pricing — $249 (was $299), tier ladder
7. FAQ — 11 accordion items
8. Community — interactive crew deck + footer

## Design Tokens (key)

| Token | Value | Usage |
|-------|-------|-------|
| `text-bone` | light cream | Primary text |
| `bg-background` | `#020712`–`#0a1624` range | Dark navy page bg |
| Gold accent | `#d4a556` | Stats, emphasis |
| Muted | `#667d82` | Dimmed scroll text |
| Body | `#c9d2cc` | Problem section copy |

**Fonts:** Anton (hero), Pirata One (pirate headings), Geist Mono (UI), Press Start 2P (pixel accents)

## Key Assets

- `assets/_next/static/media/ship-hero.*.webp` — hero ship
- `assets/_next/static/media/step-1|2|3.*` — how-it-works screenshots
- `assets/_next/static/media/deadline-*` — plank/consequence scene
- `assets/_next/static/media/ship_crew_3_decks.*` — community deck
- `assets/landing/pirate/pixel-noise.png` — texture overlay
- `assets/landing/pirate/scroll-hand.png` — scroll cue

## Live stats (at scrape time)

- **110** pirates shipping
- **106** people shipping startups
- **4** thrown overboard
- **90** spots left at $249
- **9** tweets in carousel

## Notes for redesign

- Hero is heavily animated (CSS sprites, storm layers, parallax waves) — consider which effects to keep vs simplify
- Community section uses pixel-art avatars from CloudFront CDN
- Checkout CTA links to payment flow (not in static HTML)
- `/dashboard` is a separate authenticated route
