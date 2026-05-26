"use client";

import { useState } from "react";
import { copy } from "@/lib/copy";
import { tweets } from "@/lib/site-data";
import { SectionShell } from "@/components/ui/SectionShell";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function Founders() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? tweets : tweets.slice(0, 3);

  return (
    <SectionShell title={copy.founders.headline} className="founders">
      <div className="founders__bios">
        {copy.founders.people.map((person) => (
          <article key={person.name} className="founder-card">
            <h3>{person.name}</h3>
            <p>{person.bio}</p>
          </article>
        ))}
      </div>
      <p className="founders__proof">{copy.founders.socialProof}</p>
      <div className="tweet-grid">
        {visible.map((tweet) => (
          <a
            key={tweet.url}
            href={tweet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="tweet-card"
          >
            <header>
              <strong>{tweet.author_name}</strong>
              <span>@{tweet.handle}</span>
            </header>
            <p>{tweet.text}</p>
            <time dateTime={tweet.date}>{formatDate(tweet.date)}</time>
          </a>
        ))}
      </div>
      {tweets.length > 3 ? (
        <button
          type="button"
          className="tweet-expand"
          onClick={() => setShowAll((v) => !v)}
        >
          {showAll ? "Show fewer" : copy.founders.expandTweets}
        </button>
      ) : null}
    </SectionShell>
  );
}
