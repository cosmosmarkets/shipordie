"use client";

import Image from "next/image";
import { copy } from "@/lib/copy";
import { assets } from "@/lib/assets";
import { PirateButton } from "@/components/ui/PirateButton";

const RAIN_DROPS = [
  { left: "4%", top: "7%", height: 14, opacity: 0.5, delay: 0, duration: 620, drift: "-18vw" },
  { left: "10%", top: "-4%", height: 18, opacity: 0.42, delay: -180, duration: 760, drift: "-21vw" },
  { left: "17%", top: "12%", height: 12, opacity: 0.38, delay: -420, duration: 680, drift: "-24vw" },
  { left: "24%", top: "2%", height: 20, opacity: 0.46, delay: -90, duration: 830, drift: "-27vw" },
  { left: "32%", top: "-8%", height: 14, opacity: 0.36, delay: -520, duration: 720, drift: "-18vw" },
  { left: "39%", top: "15%", height: 15, opacity: 0.48, delay: -260, duration: 650, drift: "-21vw" },
  { left: "46%", top: "3%", height: 12, opacity: 0.4, delay: -610, duration: 780, drift: "-24vw" },
  { left: "53%", top: "-5%", height: 18, opacity: 0.44, delay: -340, duration: 700, drift: "-27vw" },
  { left: "61%", top: "9%", height: 14, opacity: 0.5, delay: -130, duration: 840, drift: "-18vw" },
  { left: "68%", top: "-2%", height: 15, opacity: 0.4, delay: -480, duration: 730, drift: "-21vw" },
  { left: "75%", top: "13%", height: 12, opacity: 0.38, delay: -720, duration: 670, drift: "-24vw" },
  { left: "82%", top: "5%", height: 17, opacity: 0.46, delay: -230, duration: 810, drift: "-27vw" },
  { left: "89%", top: "-7%", height: 14, opacity: 0.42, delay: -570, duration: 690, drift: "-18vw" },
  { left: "96%", top: "11%", height: 15, opacity: 0.44, delay: -390, duration: 760, drift: "-21vw" },
];

export function Hero() {
  return (
    <section id="top" className="pirate-scroll">
      <div className="scene-visuals" aria-hidden="true">
        <div className="storm-layer" />
        <div className="storm-flash" />
        <div className="storm-ambient-flash" />
        <div className="moon-asset" />
        <div className="cloud-asset cloud-asset-one" />
        <div className="cloud-asset cloud-asset-two" />
        <div className="pirate-rain-layer">
          {RAIN_DROPS.map((drop, i) => (
            <span
              key={i}
              style={
                {
                  "--rain-left": drop.left,
                  "--rain-top": drop.top,
                  "--drop-height": `${drop.height}px`,
                  "--drop-opacity": drop.opacity,
                  "--drop-delay": `${drop.delay}ms`,
                  "--drop-duration": `${drop.duration}ms`,
                  "--drop-drift": drop.drift,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
        <div className="ship-scene">
          <Image
            src={assets.shipHero}
            alt="A ship of pirates sailing towards the horizon"
            width={1391}
            height={980}
            priority
            className="ship-image pixel-art"
          />
          <div className="crew-sprite crew-sprite-two" />
          <div className="crew-sprite crew-sprite-three" />
          <div className="crew-sprite crew-sprite-four" />
          <div className="captain-sprite" />
          <div className="slacker-sprite" />
          <div className="fall-sprite" />
          <div className="splash-sprite" />
        </div>
        <div className="wave-layer wave-layer-back" />
        <div className="wave-layer wave-layer-front" />
      </div>

      <div className="pirate-stage">
        <header className="scene-header">
          <a href="#top" className="scene-brand" aria-label="Ship or Die home">
            <Image
              src={assets.icon}
              alt=""
              width={48}
              height={48}
              className="pixel-art size-10 shrink-0 sm:size-12"
            />
            <div>
              <strong>{copy.nav.logo}</strong>
              <small>{copy.nav.byline}</small>
            </div>
          </a>
          <div className="scene-header-actions">
            <a className="nav-link" href="#pricing">
              {copy.nav.pricing}
            </a>
            <PirateButton href="#pricing">{copy.nav.cta}</PirateButton>
          </div>
        </header>

        <div className="scene-copy scene-copy-ship">
          <h1>{copy.hero.ship}</h1>
          <span className="launch-copy">
            {copy.hero.line2}
            <span className="scroll-cue">
              <Image
                src={assets.scrollHand}
                alt=""
                width={32}
                height={32}
                className="scroll-cue__arrow"
              />
              <span>{copy.hero.scrollCue}</span>
            </span>
          </span>
          <div className="consequence-copy">
            <strong>
              <span className="consequence-copy__or">{copy.hero.or}</span>
              <span className="consequence-copy__die">{copy.hero.die}</span>
            </strong>
            <span>{copy.hero.stakes}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
