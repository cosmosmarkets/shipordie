# Ship or Die — Voice & Landing Copy

Source of truth for the redesign landing page. Structure mirrors [scrape-content.json](scrape-content.json).

**Last updated:** voice pass — harsher on **OR DIE** stakes, elevated nautical (≈45% builder truth / 45% nautical / 10% flourish).

---

## Voice system

### Mix: 45 / 45 / 10

| Layer | % | Role |
|-------|---|------|
| **Builder truth** | 45% | 30-day deadline, live link, buy button, kicked out, no refund, 0 users / 0 revenue |
| **Nautical skin** | 45% | crew, ship, deck, berth, mission, chart, harbor, overboard, landfall, plank, tide |
| **Full flourish** | 10% | One-liners: hero DIE beat, consequences, refund FAQ, stats “Aye”, pricing warning |

### Voice card

**We sound like:** captains who already shipped — you board, you launch in 30 days, or you’re gone. No second chances dressed up as “accountability coaching.”

**We never sound like:** a course, a cozy community, or a pirate cosplay forum that forgot to mention the plank.

**OR DIE means:** miss landfall → overboard → access gone → money gone → your name on the warning wall. Not a metaphor you can negotiate.

### Writing rules

1. **Stakes before poetry** — say what you lose, then paint the sea.
2. **One metaphor per sentence** — no fog-wind-map-hammer chains.
3. **Fact first, flourish last** — “Timer starts at mission commit. No hiding in port.”
4. **Modern verbs** — ship, launch, build, validate. Skip “tis / hark / ye” except a single headline wink.
5. **DIE is literal** — kicked out forever, not “we’ll check in.”

### Nautical vocabulary (use freely)

| Group | Words |
|-------|--------|
| People & place | crew, ship, deck, berth, harbor, port, captain(s), mate(s), fleet, galley |
| Journey | voyage, mission, chart, course, bearing, waters, open sea, tide |
| Time & stakes | deadline, D-day, bell rings, time’s up, last chance, no quarter |
| Failure | overboard, plank, marooned, washed up, hall of shame, warning tale, shark bait |
| Success | landfall, made port, hoist colors, trophy, flag raised |
| Action | board, weigh anchor, set sail, man the deck, hold the line, swab excuses |

### Do / don’t

| Do | Don’t |
|----|--------|
| ship, link, deadline, crew, mission, overboard, small bet, buy button | transform, unlock, journey, ecosystem, exclusive experience |
| name the punishment (plank, shame, no refund) | soften with “we’re here to support you” |
| Marc/Jack ship counts & MRR | guru worship, vague inspiration |
| anti-course, anti–productivity tourist | grindset, hustle porn |

### Dynamic placeholders

```text
{shipping_count}   {overboard_count}   {spots_left}   {price_now}   {price_was}
```

---

## Meta & SEO

### Recommended

| Field | Copy |
|-------|------|
| **title** | Ship or Die — Ship in 30 days or get thrown overboard. Forever. |
| **description** | Private crew. Hard deadline. Miss your launch — lose your berth, your money, and your spot. No refunds. No re-boarding. |
| **og_title** | Ship or Die — 30 days to landfall or walk the plank |
| **og_description** | A paid ship for founders who launch something people can click — or get marooned. |

### Alternate (shorter)

| Field | Copy |
|-------|------|
| **title** | Ship or Die — Launch in 30 days or you're out |
| **description** | Ship a startup in 30 days or get kicked off the ship. Forever. $249. No refund. |

---

## Navigation

| Element | Copy |
|---------|------|
| Logo | Ship or Die |
| Byline | by Marc Lou & Jack Friks |
| Dashboard | Dashboard |
| Pricing | Pricing |
| **Primary CTA (recommended)** | Board now |
| Alternate CTA | Claim your berth |
| Alternate CTA | Join the crew |

---

## Hero

Visual: storm, ship, plank/overboard sprites — copy should match the violence of the animation.

### Headline stack (recommended)

| Part | Copy |
|------|------|
| Line 1 | **SHIP** |
| Line 2 | your app to landfall in 30 days |
| Line 3 | **or** |
| Line 4 | **DIE** |
| Stakes line | Miss the deadline — walk the plank. Kicked off the ship **forever.** No appeal. No refund. |

### Alternate headlines

**Stakes line B:** No launch, no berth. Overboard. Done.

**Stakes line C:** Fail to ship — marooned. The crew doesn't wait for you.

**Full stack alt:** SHIP / something the crew can board in 30 days / or / DIE / You're off the ship. Permanently.

### Subhead (optional, below stack)

A private crew on a hard clock. You launch with a link — or you don't belong on this deck anymore.

### Scroll cue

↓ Man the deck or man the plank

---

## Problem (scroll sequence)

Order fixed. Gold emphasis on lines 1–2. Emoji optional on line 6.

| # | Copy | Notes |
|---|------|--------|
| 1 | **0 users.** | gold emphasis |
| 2 | **0 revenue.** | gold, dimmed |
| 3 | Not because the chart was wrong... | dimmed |
| 4 | ...because your ship never left harbor. Nobody could board your app. | dimmed |
| 5 | "I'm two weeks from landfall." | dimmed |
| 6 | You've been "two weeks out" for four months. Still in port. Still dying slowly. | dimmed; 💀 optional |
| 7 | Polishing below deck isn't a voyage. | revealed |
| 8 | You don't need calmer seas. | revealed |
| 9 | You need a crew that won't let you rot at anchor. | revealed, emphasis |

---

## How it works

### Section headline

**Recommended:** One voyage every 30 days until one startup makes landfall and changes your life.

**Alternate:** Ship to port every 30 days — or don't belong on this ship.

### Step 01 — Swear into the crew

| Field | Copy |
|-------|------|
| Label | step |
| Number | 01 |
| Title | Swear into the crew |
| Intro | You're the average of the five sailors you sail with. Board a private crew that ships to port — not productivity tourists drifting in safe harbor. |
| Bullet 1 | Discord crew of pirates who actually launch |
| Bullet 2 | Daily check-ins — the deck sees if you moved |
| Bullet 3 | Solo watch? Voice channels. Cowork on deck until it's live. |

**Asset:** `assets/_next/static/media/step-1.*`

### Step 02 — Short voyages, small bets

| Field | Copy |
|-------|------|
| Number | 02 |
| Title | Short voyages, small bets |
| Intro | Big waters scare everyone. Sail one feature to port with a buy button. We chart the route — gamified missions, no infinite planning. |
| Bullet 1 | One feature. A buy button. That's your landfall. |
| Bullet 2 | Lost at sea? Each mission marks the next bearing. |
| Bullet 3 | Launch isn't optional. The crew expects a link. |

**Asset:** `assets/_next/static/media/step-2.*`

### Step 03 — Ship or die (the rule)

| Field | Copy |
|-------|------|
| Number | 03 |
| Title | Ship or die — that's the rule |
| Intro | This is the whole game. Quitting should feel stupid. Shipping should feel like raising your flag. Keep launching until one voyage changes your life — or keep dying in harbor. |
| Bullet 1 | Public mission profiles — the crew watches your chart |
| Bullet 2 | 30-day deadlines and trophies — miss one, you're overboard |
| Bullet 3 | Ship, launch, repeat — or you're shark bait |

**Asset:** `assets/_next/static/media/step-3.*`

### Section CTA

| Label | Destination |
|-------|-------------|
| **Recommended:** Board the crew | `#pricing` |
| Alternate: Weigh anchor — join | `#pricing` |
| Alternate: Hoist your colors | `#pricing` |

---

## Consequences

Highest nautical + harshest stakes on the page (~55% nautical, DIE-forward).

### Headline

**Recommended:** Miss landfall...

### Intro

The deadline isn't a suggestion. The bell rings. You didn't ship. Now you pay.

### Penalties (bullets)

1. **Hall of shame** — your name in the public Discord channel for the whole crew to see
2. **Thrown overboard** — community access revoked. You're off the ship.
3. **Marked forever** — overboard on your profile. A warning tale for the next wave.
4. **No refund** — you bought a berth. You didn't earn it. The money's gone.

### Closing line (under plank animation)

Walk the plank. Splash. The sharks don't send a follow-up email.

### Alternate headline

**OR DIE isn't branding. It's policy.**

---

## Founders

~25% nautical — credibility first.

### Section headline

**Recommended:** Captains who actually make port.

**Alternate:** Built by people who ship — or die trying.

### Marc Lou

Marc thought he was Mark Zuckerberg and spent 2 years building ambitious startups nobody wanted: 0 users, $0 revenue. So he changed strategy: build, launch, repeat. He has now launched 30+ startups, including DataFast ($22K MRR) and TrustMRR ($33K MRR).

### jack friks

Jack quit McDonald's to learn to code in his mom's basement. His first app Curiosity Quench hit 100,000 downloads, then he shipped Post Bridge (now $35K MRR) and Lovelee Couples (100,000+ downloads).

### Social proof (above tweet carousel)

**Recommended:** {shipping_count} pirates on deck. {overboard_count} already overboard. Aye.

**Alternate:** {shipping_count} shipping. {overboard_count} didn't make landfall.

### Tweet carousel

Use live X embeds — do not rewrite member posts.

| UI label | Copy |
|----------|------|
| Expand | Show 3 more from the crew |

---

## Pricing

### Eyebrow

berth / pricing

### Headline

**Recommended:** Buy your berth — or stay ashore.

**Alternate:** Board the ship.

### Price block

| Field | Copy |
|-------|------|
| Was | ${price_was} |
| Now | **${price_now}** |
| Type | one-time — one berth, no monthly toll |

### Includes

1. Private ship — Discord crew, missions, pressure
2. Gamified 30-day voyage — charted to landfall
3. Public captain's log — every app you've shipped

### Warning (prominent)

**No refund. Miss your deadline — you're overboard. Ship or die.**

### Primary CTA

**Recommended:** Board for ${price_now}

**Alternate:** Claim your berth — ${price_now}

### Tier ladder

| Price | Label |
|-------|--------|
| $199 | sold out — lower decks full |
| ${price_now} | **{spots_left} berths left** (active) |
| $299 | full fare — when this wave sells out |

---

## FAQ

### Section headline

Questions before you board the ship?

### Items

#### What can I ship on this voyage?

Anything the crew can board with a link — SaaS, tool, directory, marketplace, AI wrapper, cursed little skiff of an experiment. No link, no landfall. Doesn't count.

#### What if I already have an idea?

Good. Stop charting the same harbor. Ship the smallest version people can actually use — or you'll die polishing below deck.

#### What if I don't have an idea yet?

Pick a bearing in 48 hours. No three weeks in the fog asking the wind for permission. Indecision is how you die before you launch.

#### Do I need to be a technical founder?

No. You need enough grit to get a link live. Code it, vibe-code it, duct-tape the hull. The sea doesn't care how your boat floats — only that it reaches port.

#### When does the 30-day timer start?

After checkout, you choose the mission you're committing to. The clock starts when that mission is created — not when you "feel ready."

After you make landfall and stay on board, you don't have to start a new voyage immediately. Ride a winner. Start the next mission when you want — new mission, new 30-day bell.

#### What happens if I don't launch in 30 days?

**You die on this ship.** Overboard. Access revoked. Hall of shame. Profile marked. No refund. No re-boarding. You become the cautionary tale the next crew points at.

#### Can I change my idea after joining?

Early, for a real reason — not because you got scared of open water. Once you've sworn the oath on a mission, that chart and that clock own you.

#### Is this a course?

No. Courses let you hide below deck and feel productive. This is a **deadline**, a **crew**, and a **public launch** that watches you sink or sail. Ship or die.

#### How much time do I need each week?

Enough to move the ship **every day**. Full-time job, kids, chaos, bad Wi-Fi — the crew has seen worse. The rule isn't comfort. It's **progress toward landfall**.

#### Will the crew help me?

Aye. Feedback, pressure, visibility, mates who've sailed the same storm. You still swing the hammer. Nobody ships **for** you.

#### Can I get a refund?

You paid to board a ship with a plank attached. If you're asking for a refund, you wanted a cruise — not a crew. Blink twice. Close this tab. Start over somewhere softer.

---

## Community & footer

### Section headline

**Recommended:** The crew on deck right now

**Alternate:** Live deck — who's shipping, who's overboard

### Stats

| Stat | Label |
|------|--------|
| Shipping | **{shipping_count}** on deck |
| Overboard | **{overboard_count}** overboard |

### Subcopy

Every pirate has a portrait on the ship. Make landfall — you work on deck. Miss the deadline — you're in the water with the rest of them.

### Links

| Label | Href |
|-------|------|
| View full crew | `/crew` |

### Footer

| Element | Copy |
|---------|------|
| Terms | Terms |
| Privacy | Privacy |
| Copyright | Ship or Die — Marc Lou & Jack Friks |

---

## Microcopy appendix

### Global CTAs

| Context | Recommended | Alternate |
|---------|-------------|-----------|
| Nav primary | Board now | Claim your berth |
| Hero → pricing | Board the crew | Man the deck |
| How it works | Board the crew | Weigh anchor |
| Pricing | Board for ${price_now} | Ship or die — ${price_now} |
| Post-founder | Join the voyage | — |

### OR DIE — usage guide

Use **DIE** language when stating **irreversible loss**:

- Hero stakes line
- Step 03 title and bullets
- Consequences block
- Pricing warning
- FAQ: missed deadline, refund, "is this a course"
- Meta description

Avoid DIE in founder bios and factual timer explanations (keep those clear).

### Words we use

ship, launch, landfall, crew, mission, berth, deck, overboard, plank, chart, harbor, voyage, bell, oath, port, link, buy button, 30 days, kicked out, forever, no refund

### Words we avoid

transform, unlock your potential, exclusive ecosystem, journey (as filler), synergy, supportive community, second chance, pause your membership

---

## Changelog

| Date | Note |
|------|------|
| Redesign pass | Initial COPY.md — 45/45/10 voice, harsher OR DIE, elevated nautical |
