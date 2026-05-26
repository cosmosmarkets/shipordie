# AGENTS.md — Ship or Die redesign

## Purpose

Portfolio-quality marketing site for **Ship or Die**. Demonstrates frontend skill for founders (Marc Lou & Jack Friks). **No production backend** — checkout and dashboard are not wired.

## Canonical URLs

| Resource | URL |
|----------|-----|
| GitHub | https://github.com/cosmosmarkets/shipordie |
| Vercel | https://vercel.com/jawad-designs-projects1/shipordie |

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 App Router (`src/app/`) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 + `src/app/globals.css` + `src/styles/hero.css` |
| Fonts | `next/font/google` — Anton, Pirata One, Geist Mono |
| Images | `next/image`, assets in `public/` |
| Data | Build-time JSON: `reference/crew-members.json`, `reference/scrape-content.json` via `src/lib/site-data.ts` |
| Copy | `src/lib/copy.ts` (from `reference/COPY.md`) |
| Deploy | Vercel, root `.`, `npm run build` |

**Out of scope:** auth, Stripe, Discord API, database, real checkout.

## Skills (apply every session)

### frontend-design

Before UI work: commit to a **bold pirate/naval** direction using scraped tokens (`reference/SCRAPE.md`). Anti-generic rules:

- Custom palette (navy `#020712`, bone `#f3e6c9`, gold `#d4a556`) — no Tailwind default indigo/blue primary
- Pair display + mono body (Anton/Pirata + Geist Mono)
- Layered shadows and depth (base → elevated → floating)
- Animate **only** `transform` and `opacity` — never `transition-all`
- Every clickable: hover, focus-visible, active
- `prefers-reduced-motion`: static hero, no blur on problem scroll

Skill path: `~/.claude/skills/frontend-design/SKILL.md`

### frontend-developer

Implementation standards:

- Server Components by default; `"use client"` only for scroll, accordion, tweet expand
- Accessible FAQ (`aria-expanded`), skip link, semantic landmarks
- Optimize LCP (hero ship `priority`), avoid layout shift on images
- TypeScript strict; no fake payment flows

Skill path: `~/.claude/skills/frontend-developer/SKILL.md`

## Project overrides

- Output is **Next.js components**, not a single `index.html`.
- Local dev: `npm run dev` (port 3000).
- Copy source: `reference/COPY.md`. Design tokens: `reference/SCRAPE.md`.
- `brand_assets/` at repo root overrides placeholders if present.

## Git

- Branch: `main`
- Remote: `https://github.com/cosmosmarkets/shipordie.git`
- Conventional commit subjects (e.g. `feat:`, `fix:`)

## Hard rules

- Do not impersonate live checkout or claim functional payments.
- Pricing CTA stays disabled with “Portfolio demo” copy.
- Do not add backend routes without explicit request.
