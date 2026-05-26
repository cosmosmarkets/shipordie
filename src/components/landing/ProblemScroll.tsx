"use client";

import { useEffect, useRef, useState } from "react";
import { copy } from "@/lib/copy";
import { assets } from "@/lib/assets";

export function ProblemScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.35))
      );
      const idx = Math.min(
        copy.problem.length - 1,
        Math.floor(progress * copy.problem.length)
      );
      setActiveIndex(idx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="problem-scroll"
      aria-label="The problem"
    >
      <div
        className="problem-scroll__noise"
        aria-hidden
        style={{ backgroundImage: `url(${assets.pixelNoise})` }}
      />
      <div className="problem-scroll__sticky">
        <div className="problem-scroll__lines">
          {copy.problem.map((line, index) => {
            const isActive = index <= activeIndex;
            const classes = [
              "problem-line",
              "emphasis" in line && line.emphasis ? "problem-line--gold" : "",
              "dim" in line && line.dim ? "problem-line--dim" : "",
              "reveal" in line && line.reveal ? "problem-line--reveal" : "",
              isActive ? "problem-line--active" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <p key={line.text} className={classes}>
                {"emphasis" in line && line.emphasis ? <em>{line.text}</em> : line.text}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
