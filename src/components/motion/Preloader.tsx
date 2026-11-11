"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { EASE_REVEAL, gsap, mmConditions, useGSAP } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/lenis-control";
import {
  hasPreloadedSession,
  markPreloaded,
  PRELOADED_DATA_ATTR,
} from "@/lib/preloader";

/** Total ritual length — curtain wipe then leave (~2.4s). */
const PRELOADER_DURATION = 2.4;
/** 18:47 as total minutes from 00:00. */
const TARGET_MINUTES = 18 * 60 + 47;

function formatClock(totalMinutes: number): string {
  const clamped = Math.max(0, Math.min(TARGET_MINUTES, Math.round(totalMinutes)));
  const hours = Math.floor(clamped / 60);
  const minutes = clamped % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function shouldSkipPreloader(): boolean {
  if (typeof window === "undefined") return false;
  if (document.documentElement.getAttribute(PRELOADED_DATA_ATTR) === "1") {
    return true;
  }
  if (window.matchMedia(mmConditions.reduce).matches) return true;
  return hasPreloadedSession();
}

/**
 * Full-screen load ritual: clock 00:00→18:47, DUSK mask rise, gold curtain.
 * Skipped on repeat visits (sessionStorage) and when prefers-reduced-motion.
 * Overlay is aria-hidden; page content stays available to assistive tech.
 * Visibility for skip is decided before paint via layout boot script + CSS.
 *
 * Transforms are GSAP-owned only — no Tailwind translate utilities (v4 `translate`
 * property would fight GSAP's `transform` and leave letters/curtain off-screen).
 */
export function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const curtainRef = useRef<HTMLDivElement>(null);

  const wordmark = site.hero.wordmark;
  const letters = wordmark.split("");

  useGSAP(
    () => {
      if (shouldSkipPreloader()) {
        markPreloaded();
        return;
      }

      const root = rootRef.current;
      const clockEl = clockRef.current;
      const curtain = curtainRef.current;
      const letterEls = lettersRef.current.filter(Boolean);
      if (!root || !clockEl || !curtain || letterEls.length === 0) return;

      lockScroll();

      const clock = { minutes: 0 };
      clockEl.textContent = formatClock(0);

      // Initial off-screen via GSAP. Reset y: GSAP parses the inline translateY(100%) pre-paint hide as px y, which would otherwise stack with yPercent and keep letters/curtain clipped.
      gsap.set(letterEls, { y: 0, yPercent: 100 });
      gsap.set(curtain, { y: 0, yPercent: 100 });

      const tl = gsap.timeline({
        defaults: { ease: EASE_REVEAL },
        onComplete: () => {
          markPreloaded();
          unlockScroll();
        },
      });

      // Clock + DUSK rise share the first beat.
      tl.to(
        clock,
        {
          minutes: TARGET_MINUTES,
          duration: 1.05,
          onUpdate: () => {
            clockEl.textContent = formatClock(clock.minutes);
          },
        },
        0,
      );

      tl.to(
        letterEls,
        {
          yPercent: 0,
          duration: 1.05,
          stagger: 0.07,
        },
        0,
      );

      // Gold curtain visibly wipes up over the night overlay, then leave.
      tl.to(
        curtain,
        {
          yPercent: 0,
          duration: 1.0, ease: "power3.inOut",
        },
        0.95,
      );

      tl.to(
        root,
        {
          yPercent: -100,
          duration: 0.75, ease: "power3.inOut",
        },
        1.85,
      );

      tl.duration(PRELOADER_DURATION);

      return () => {
        unlockScroll();
      };
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      data-vd-preloader=""
      aria-hidden="true"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-night text-cream"
    >
      <div className="relative z-10 flex flex-col items-center gap-5">
        <span
          ref={clockRef}
          className="text-[10px] font-semibold tracking-label text-cream/70 uppercase tabular-nums"
        >
          00:00
        </span>

        {/* Same display size as hero wordmark; ivory/gold on night for contrast. */}
        <p
          className="flex select-none items-center justify-center gap-[0.015em] font-display text-[clamp(5.5rem,33.8vw,8.25rem)] leading-[0.85] font-light tracking-[-0.02em] text-cream lg:text-[clamp(9rem,31vw,29rem)] lg:leading-[0.76] lg:tracking-[-0.045em]"
          aria-hidden="true"
        >
          {letters.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className="inline-block overflow-hidden leading-[0.85] lg:leading-[0.76]"
            >
              <span
                ref={(el) => {
                  if (el) lettersRef.current[index] = el;
                }}
                className="inline-block will-change-transform"
                style={{ transform: "translateY(100%)" }}
              >
                {letter}
              </span>
            </span>
          ))}
        </p>
      </div>

      <div
        ref={curtainRef}
        className="pointer-events-none absolute inset-0 z-20 will-change-transform"
        style={{
          background: "linear-gradient(180deg, #E7C07F 0%, #A9681F 100%)",
          transform: "translateY(100%)",
        }}
      />
    </div>
  );
}
