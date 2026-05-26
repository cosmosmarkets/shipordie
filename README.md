# Ship or Die — Portfolio redesign

Hybrid Next.js landing page: live [ship-or-die.com](https://www.ship-or-die.com) visual language + copy from [`reference/COPY.md`](reference/COPY.md). Portfolio demo only — no checkout, auth, or backend.

## Links

| Resource | URL |
|----------|-----|
| GitHub | https://github.com/cosmosmarkets/shipordie |
| Vercel project | https://vercel.com/jawad-designs-projects1/shipordie |
| Production URL | https://shipordie-tau.vercel.app (requires Vercel team access if Deployment Protection is on) |

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4
- `next/font` — Anton, Pirata One, Geist Mono
- Build-time data from `reference/crew-members.json` and `reference/scrape-content.json`

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build

```bash
npm run build
npm start
```

## Reference kit

Scrape artifacts live in [`reference/`](reference/) (`source.html`, scripts, `COPY.md`). Static media is in [`public/`](public/).

## Agent docs

- [`AGENTS.md`](AGENTS.md) — Cursor / coding agents
- [`CLAUDE.md`](CLAUDE.md) — Claude Code (mirrors AGENTS.md)
