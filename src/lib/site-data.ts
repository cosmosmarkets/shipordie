import crewData from "../../reference/crew-members.json";
import scrapeData from "../../reference/scrape-content.json";

export type Tweet = {
  author_name: string;
  handle: string;
  text: string;
  date: string;
  url: string;
};

export const siteStats = {
  shippingCount: crewData.stats.pirates_shipping,
  overboardCount: crewData.stats.people_thrown_overboard,
  spotsLeft: crewData.stats.pricing_spots_left,
  priceNow: crewData.stats.current_price_usd,
  priceWas: 299,
} as const;

export const tweets: Tweet[] =
  scrapeData.sections.founders.tweet_carousel.tweets.map((t) => ({
    author_name: t.author_name,
    handle: t.handle,
    text: t.text.replace(/&amp;/g, "&"),
    date: t.date,
    url: t.url,
  }));

export const crewMembers = crewData.members.slice(0, 48);
