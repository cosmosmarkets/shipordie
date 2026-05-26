# CLAUDE.md — Ship or Die redesign

See **[AGENTS.md](./AGENTS.md)** for full agent rules (stack, URLs, skills, git).

## Quick reference

- **GitHub:** https://github.com/cosmosmarkets/shipordie
- **Vercel:** https://vercel.com/jawad-designs-projects1/shipordie
- **Dev:** `npm run dev` → http://localhost:3000
- **Build:** `npm run build`

## Always do first

1. Read `reference/COPY.md` for copy changes.
2. Apply **frontend-design** skill before UI edits.
3. Apply **frontend-developer** skill for React/Next implementation.

## Design guardrails

- Pirate/navy tokens from scrape — not generic AI SaaS blue.
- No `transition-all`.
- Hero: full storm/ship/rain recreation in `src/styles/hero.css`.
- Hybrid IA: stats strip before pricing (`StatsStrip`).

## Data

Update `reference/crew-members.json` / `reference/scrape-content.json` when refreshing stats or tweets; rebuild to pick up changes.
