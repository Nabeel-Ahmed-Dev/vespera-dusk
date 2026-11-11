"use client";

import { useEffect, useState } from "react";
import { gsap, mmConditions } from "@/lib/gsap";

/**
 * Client hook for `prefers-reduced-motion: reduce`.
 * Returns `null` until mounted (unknown), then a boolean — avoids hydration mismatch
 * and lets callers skip Lenis / scrubs until the preference is known.
 */
export function useReducedMotion(): boolean | null {
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(mmConditions.reduce);
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export type MotionMatchMediaConditions = {
  desktop: boolean;
  mobile: boolean;
  reduce: boolean;
};

/**
 * Creates a `gsap.matchMedia` with desktop / mobile / reduce conditions.
 * Callers should `mm.revert()` on cleanup (or rely on `useGSAP` context).
 */
export function createMotionMatchMedia(scope?: Element | string | object) {
  const mm = gsap.matchMedia(scope);

  return {
    mm,
    /**
     * Run `setup` whenever the named queries change.
     * Skip scrub / Lenis work when `conditions.reduce` is true.
     */
    add(
      setup: (conditions: MotionMatchMediaConditions) => void | (() => void),
    ) {
      return mm.add(mmConditions, (context) => {
        const conditions = context.conditions as MotionMatchMediaConditions;
        return setup(conditions);
      });
    },
    revert: () => mm.revert(),
  };
}
