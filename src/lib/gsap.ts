"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Reveal / enter eases — motion-spec. */
export const EASE_REVEAL = "expo.out";

/** Scrubbed / scroll-linked eases — motion-spec. */
export const EASE_SCRUB = "power2.inOut";

/** Default ScrollTrigger scrub lag (seconds). */
export const SCRUB = 1;

/** Shared duration tokens (seconds). */
export const DURATION = {
  reveal: 0.9,
  scrubHint: 1,
} as const;

/**
 * Named media queries for `gsap.matchMedia().add({ ... }, fn)`.
 * Breakpoint matches Tailwind `lg` (1024px).
 */
export const mmConditions = {
  desktop: "(min-width: 1024px)",
  mobile: "(max-width: 1023px)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

export { gsap, ScrollTrigger, SplitText, useGSAP };
