"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { copy } from "@/lib/copy";
import { assets } from "@/lib/assets";
import { PirateButton } from "@/components/ui/PirateButton";

const RAIN_DROPS = [
  { left: "4%", top: "7%", height: 14, opacity: 0.5, delay: 0, duration: 620 },
  { left: "10%", top: "-4%", height: 18, opacity: 0.42, delay: -180, duration: 760 },
  { left: "17%", top: "12%", height: 12, opacity: 0.38, delay: -420, duration: 680 },
  { left: "24%", top: "2%", height: 20, opacity: 0.46, delay: -90, duration: 830 },
  { left: "32%", top: "-8%", height: 14, opacity: 0.36, delay: -520, duration: 720 },
  { left: "39%", top: "15%", height: 15, opacity: 0.48, delay: -260, duration: 650 },
  { left: "46%", top: "3%", height: 12, opacity: 0.4, delay: -610, duration: 780 },
  { left: "53%", top: "-5%", height: 18, opacity: 0.44, delay: -340, duration: 700 },
  { left: "61%", top: "9%", height: 14, opacity: 0.5, delay: -130, duration: 840 },
  { left: "68%", top: "-2%", height: 15, opacity: 0.4, delay: -480, duration: 730 },
  { left: "75%", top: "13%", height: 12, opacity: 0.38, delay: -720, duration: 670 },
  { left: "82%", top: "5%", height: 17, opacity: 0.46, delay: -230, duration: 810 },
  { left: "89%", top: "-7%", height: 14, opacity: 0.42, delay: -570, duration: 690 },
  { left: "96%", top: "11%", height: 15, opacity: 0.44, delay: -390, duration: 760 },
];

export function Hero() {
  const pirateScrollRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = pirateScrollRef.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let rainArmed = false;
    let raf = 0;

    const clamp = (v: number, min: number, max: number) =>
      Math.min(Math.max(v, min), max);

    // Clamp linear range mapping to [0,1].
    const map01 = (v: number, min: number, max: number) =>
      clamp((v - min) / (max - min), 0, 1);

    const getMetrics = () => {
      const rect = el.getBoundingClientRect();
      const scrollLength = Math.max(rect.height - window.innerHeight, 1);
      const sectionTop = rect.top + window.scrollY;
      return {
        progress: clamp(
          (window.scrollY - sectionTop) / scrollLength,
          0,
          1
        ),
      };
    };

    const update = () => {
      const { progress } = getMetrics();
      const innerWidth = window.innerWidth;
      const isMobile = innerWidth < 640;
      const isTablet = innerWidth >= 640 && innerWidth < 980;

      const s = map01(progress, 0.56, 0.66);
      const sceneVisualOpacity = 1 - map01(progress, 0.86, 0.98);
      const c = map01(progress, 0.1, 0.46);
      const u = map01(progress, 0.46, 0.58);
      const p = map01(progress, 0.5, 0.78);
      const f = map01(progress, 0.7, 0.9);
      const launchCopyOpacity = 1 - s;
      const g = rainArmed ? 1 - map01(window.scrollY, 8, 30) : 0;

      const stormOpacity = map01(progress, 0.46, 0.5) * sceneVisualOpacity;
      const stormStrikeOpacity = Math.max(
        map01(progress, 0.46, 0.475) *
          (1 - map01(progress, 0.475, 0.505)),
        0.45 *
          (map01(progress, 0.54, 0.555) *
            (1 - map01(progress, 0.555, 0.585)))
      );
      const stormAmbientOpacity =
        map01(progress, 0.58, 0.66) * (1 - map01(progress, 0.78, 0.84));

      const rainOpacity = prefersReduced
        ? 0
        : map01(progress, 0.46, 0.58) *
            (1 - map01(progress, 0.88, 0.98)) *
            1.12;

      const captainOpacity =
        map01(progress, 0.08, 0.14) * (1 - map01(progress, 0.84, 0.94));
      const slackerOpacity = 1 - map01(progress, 0.5, 0.58);
      const fallOpacity =
        map01(progress, 0.5, 0.58) * (1 - map01(progress, 0.86, 0.96));
      const splashOpacity =
        map01(progress, 0.7, 0.78) * (1 - map01(progress, 0.92, 1));

      const captainFrame =
        u > 0 ? 5 : Math.min(Math.floor(10 * c) % 5, 4);
      const fallFrame = 2 + Math.min(Math.floor(4 * p), 3);
      const splashFrame = Math.min(Math.floor(5 * f), 4);

      // Custom properties + dataset flags drive the extracted hero CSS.
      el.style.setProperty("--scene-progress", progress.toFixed(3));
      el.style.setProperty(
        "--scene-visual-opacity",
        sceneVisualOpacity.toFixed(3)
      );
      el.style.setProperty("--storm-opacity", stormOpacity.toFixed(3));
      el.style.setProperty(
        "--storm-strike-opacity",
        stormStrikeOpacity.toFixed(3)
      );
      el.style.setProperty(
        "--storm-ambient-opacity",
        stormAmbientOpacity.toFixed(3)
      );
      el.style.setProperty("--rain-opacity", rainOpacity.toFixed(3));

      el.dataset.stormActive =
        stormOpacity > 0.01 ||
        stormStrikeOpacity > 0.01 ||
        stormAmbientOpacity > 0.01
          ? "true"
          : "false";

      el.style.setProperty("--captain-opacity", captainOpacity.toFixed(3));
      el.style.setProperty("--slacker-opacity", slackerOpacity.toFixed(3));
      el.style.setProperty("--fall-opacity", fallOpacity.toFixed(3));
      el.style.setProperty("--splash-opacity", splashOpacity.toFixed(3));

      el.style.setProperty(
        "--captain-x",
        `${Math.round(c * (isMobile ? -205 : isTablet ? -410 : -522))}px`
      );
      el.style.setProperty(
        "--fall-x",
        `${Math.round(p * (isMobile ? -36 : isTablet ? -116 : -145))}px`
      );
      el.style.setProperty(
        "--fall-y",
        `${Math.round(p * (isMobile ? 108 : isTablet ? 152 : 175))}px`
      );
      el.style.setProperty(
        "--fall-rotate",
        `${Math.round(-64 * p)}deg`
      );
      el.style.setProperty(
        "--splash-scale",
        (0.7 + 0.22 * f).toFixed(3)
      );

      el.style.setProperty(
        "--launch-copy-opacity",
        launchCopyOpacity.toFixed(3)
      );
      el.style.setProperty(
        "--scroll-cue-opacity",
        (g * launchCopyOpacity).toFixed(3)
      );
      el.style.setProperty(
        "--scroll-cue-y",
        `${Math.round(-((1 - g) * 8))}px`
      );
      el.style.setProperty("--consequence-opacity", s.toFixed(3));
      el.style.setProperty(
        "--consequence-y",
        `${Math.round((1 - s) * 22)}px`
      );

      el.dataset.captainFrame = String(captainFrame);
      el.dataset.fallFrame = String(fallFrame);
      el.dataset.splashFrame = String(splashFrame);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    const timer = window.setTimeout(() => {
      rainArmed = true;
      scheduleUpdate();
    }, 5000);

    const onScroll = () => scheduleUpdate();
    const onResize = () => scheduleUpdate();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="top" ref={pirateScrollRef} className="pirate-scroll">
      <div className="scene-visuals" aria-hidden="true">
        <div className="storm-layer">
          <div className="storm-asset" />
        </div>
        <div className="storm-flash" />
        <div className="storm-ambient-flash" />
        <div className="moon-asset" />
        <div className="cloud-asset cloud-asset-one" />
        <div className="cloud-asset cloud-asset-two" />
        <div className="pirate-rain-layer">
          {RAIN_DROPS.map((drop, i) => (
            <span
              key={`${drop.left}-${drop.top}`}
              style={
                {
                  "--rain-left": drop.left,
                  "--rain-top": drop.top,
                  "--drop-height": `${drop.height}px`,
                  "--drop-opacity": drop.opacity,
                  "--drop-delay": `${drop.delay}ms`,
                  "--drop-duration": `${drop.duration}ms`,
                  "--drop-drift": `${-18 - ((i % 4) * 3)}vw`,
                } as React.CSSProperties
              }
            >
              {`${drop.left}-${drop.top}`}
            </span>
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
          <div className="captain-sprite">
            {Array.from({ length: 8 }).map((_, r) => (
              <div
                key={r}
                className={`action-frame captain-frame captain-frame-${r}`}
              >
                {r}
              </div>
            ))}
          </div>
          <div className="slacker-sprite">
            <div className="action-frame slacker-idle-frame" />
          </div>
          <div className="fall-sprite">
            {Array.from({ length: 6 }).map((_, r) => (
              <div
                key={r}
                className={`action-frame fall-frame fall-frame-${r}`}
              >
                {r}
              </div>
            ))}
          </div>
          <div className="splash-sprite">
            {Array.from({ length: 5 }).map((_, r) => (
              <div
                key={r}
                className={`action-frame splash-frame splash-frame-${r}`}
              >
                {r}
              </div>
            ))}
          </div>
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
