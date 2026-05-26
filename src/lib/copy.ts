import { siteStats } from "./site-data";

const p = siteStats;

export const copy = {
  meta: {
    title: "Ship or Die — Ship in 30 days or get thrown overboard. Forever.",
    description:
      "Private crew. Hard deadline. Miss your launch — lose your berth, your money, and your spot. No refunds. No re-boarding.",
    ogTitle: "Ship or Die — 30 days to landfall or walk the plank",
    ogDescription:
      "A paid ship for founders who launch something people can click — or get marooned.",
  },
  nav: {
    logo: "Ship or Die",
    byline: "by Marc Lou & Jack Friks",
    pricing: "Pricing",
    cta: "Board now",
  },
  hero: {
    ship: "SHIP",
    line2: "your app in 30 days",
    or: "or",
    die: "DIE",
    stakes:
      "miss the deadline, get kicked out forever.",
    scrollCue: "scroll to start",
  },
  problem: [
    { text: "0 users.", emphasis: true },
    { text: "0 revenue.", emphasis: true, dim: true },
    { text: "Not because the chart was wrong...", dim: true },
    { text: "...because your ship never left harbor. Nobody could board your app.", dim: true },
    { text: '"I\'m two weeks from landfall."', dim: true },
    { text: 'You\'ve been "two weeks out" for four months. Still in port. Still dying slowly.', dim: true },
    { text: "Polishing below deck isn't a voyage.", reveal: true },
    { text: "You don't need calmer seas.", reveal: true },
    { text: "You need a crew that won't let you rot at anchor.", reveal: true, emphasis: true },
  ],
  howItWorks: {
    headline:
      "One voyage every 30 days until one startup makes landfall and changes your life.",
    cta: "Board the crew",
    steps: [
      {
        number: "01",
        title: "Swear into the crew",
        intro:
          "You're the average of the five sailors you sail with. Board a private crew that ships to port — not productivity tourists drifting in safe harbor.",
        bullets: [
          "Discord crew of pirates who actually launch",
          "Daily check-ins — the deck sees if you moved",
          "Solo watch? Voice channels. Cowork on deck until it's live.",
        ],
      },
      {
        number: "02",
        title: "Short voyages, small bets",
        intro:
          "Big waters scare everyone. Sail one feature to port with a buy button. We chart the route — gamified missions, no infinite planning.",
        bullets: [
          "One feature. A buy button. That's your landfall.",
          "Lost at sea? Each mission marks the next bearing.",
          "Launch isn't optional. The crew expects a link.",
        ],
      },
      {
        number: "03",
        title: "Ship or die — that's the rule",
        intro:
          "This is the whole game. Quitting should feel stupid. Shipping should feel like raising your flag. Keep launching until one voyage changes your life — or keep dying in harbor.",
        bullets: [
          "Public mission profiles — the crew watches your chart",
          "30-day deadlines and trophies — miss one, you're overboard",
          "Ship, launch, repeat — or you're shark bait",
        ],
      },
    ],
  },
  consequences: {
    headline: "Miss landfall...",
    intro:
      "The deadline isn't a suggestion. The bell rings. You didn't ship. Now you pay.",
    penalties: [
      "Hall of shame — your name in the public Discord channel for the whole crew to see",
      "Thrown overboard — community access revoked. You're off the ship.",
      "Marked forever — overboard on your profile. A warning tale for the next wave.",
      "No refund — you bought a berth. You didn't earn it. The money's gone.",
    ],
    closing: "Walk the plank. Splash. The sharks don't send a follow-up email.",
  },
  founders: {
    headline: "Captains who actually make port.",
    socialProof: `${p.shippingCount} pirates on deck. ${p.overboardCount} already overboard. Aye.`,
    expandTweets: "Show 3 more from the crew",
    people: [
      {
        name: "Marc Lou",
        bio: "Marc thought he was Mark Zuckerberg and spent 2 years building ambitious startups nobody wanted: 0 users, $0 revenue. So he changed strategy: build, launch, repeat. He has now launched 30+ startups, including DataFast ($22K MRR) and TrustMRR ($33K MRR).",
      },
      {
        name: "jack friks",
        bio: "Jack quit McDonald's to learn to code in his mom's basement. His first app Curiosity Quench hit 100,000 downloads, then he shipped Post Bridge (now $35K MRR) and Lovelee Couples (100,000+ downloads).",
      },
    ],
  },
  statsStrip: {
    shipping: `${p.shippingCount} on deck`,
    overboard: `${p.overboardCount} overboard`,
    spots: `${p.spotsLeft} berths left at $${p.priceNow}`,
  },
  pricing: {
    eyebrow: "berth / pricing",
    headline: "Buy your berth — or stay ashore.",
    was: p.priceWas,
    now: p.priceNow,
    type: "one-time — one berth, no monthly toll",
    includes: [
      "Private ship — Discord crew, missions, pressure",
      "Gamified 30-day voyage — charted to landfall",
      "Public captain's log — every app you've shipped",
    ],
    warning: "No refund. Miss your deadline — you're overboard. Ship or die.",
    cta: `Board for $${p.priceNow}`,
    demoNote: "Portfolio demo — checkout not wired",
    tiers: [
      { price: 199, label: "sold out — lower decks full", soldOut: true },
      { price: p.priceNow, label: `${p.spotsLeft} berths left`, active: true },
      { price: 299, label: "full fare — when this wave sells out" },
    ],
  },
  faq: {
    headline: "Questions before you board the ship?",
    items: [
      {
        q: "What can I ship on this voyage?",
        a: "Anything the crew can board with a link — SaaS, tool, directory, marketplace, AI wrapper, cursed little skiff of an experiment. No link, no landfall. Doesn't count.",
      },
      {
        q: "What if I already have an idea?",
        a: "Good. Stop charting the same harbor. Ship the smallest version people can actually use — or you'll die polishing below deck.",
      },
      {
        q: "What if I don't have an idea yet?",
        a: "Pick a bearing in 48 hours. No three weeks in the fog asking the wind for permission. Indecision is how you die before you launch.",
      },
      {
        q: "Do I need to be a technical founder?",
        a: "No. You need enough grit to get a link live. Code it, vibe-code it, duct-tape the hull. The sea doesn't care how your boat floats — only that it reaches port.",
      },
      {
        q: "When does the 30-day timer start?",
        a: "After checkout, you choose the mission you're committing to. The clock starts when that mission is created — not when you \"feel ready.\" After you make landfall and stay on board, you don't have to start a new voyage immediately.",
      },
      {
        q: "What happens if I don't launch in 30 days?",
        a: "You die on this ship. Overboard. Access revoked. Hall of shame. Profile marked. No refund. No re-boarding. You become the cautionary tale the next crew points at.",
      },
      {
        q: "Can I change my idea after joining?",
        a: "Early, for a real reason — not because you got scared of open water. Once you've sworn the oath on a mission, that chart and that clock own you.",
      },
      {
        q: "Is this a course?",
        a: "No. Courses let you hide below deck and feel productive. This is a deadline, a crew, and a public launch that watches you sink or sail. Ship or die.",
      },
      {
        q: "How much time do I need each week?",
        a: "Enough to move the ship every day. Full-time job, kids, chaos, bad Wi-Fi — the crew has seen worse. The rule isn't comfort. It's progress toward landfall.",
      },
      {
        q: "Will the crew help me?",
        a: "Aye. Feedback, pressure, visibility, mates who've sailed the same storm. You still swing the hammer. Nobody ships for you.",
      },
      {
        q: "Can I get a refund?",
        a: "You paid to board a ship with a plank attached. If you're asking for a refund, you wanted a cruise — not a crew. Blink twice. Close this tab. Start over somewhere softer.",
      },
    ],
  },
  community: {
    headline: "The crew on deck right now",
    subcopy:
      "Every pirate has a portrait on the ship. Make landfall — you work on deck. Miss the deadline — you're in the water with the rest of them.",
    viewCrew: "View full crew",
  },
  footer: {
    terms: "Terms",
    privacy: "Privacy",
    copyright: "Ship or Die — Marc Lou & Jack Friks",
  },
} as const;
