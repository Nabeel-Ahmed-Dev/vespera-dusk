"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { registerLenis } from "@/lib/lenis-control";
import { useReducedMotion } from "@/lib/reduced-motion";

type SmoothScrollProps = {
  children: ReactNode;
};

/**
 * Lenis smooth scroll driven by `gsap.ticker` (not ScrollSmoother).
 * Mount once around page content from the root layout.
 * When `prefers-reduced-motion: reduce`, Lenis is not started (native scroll).
 */
export function SmoothScroll({ children }: SmoothScrollProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Wait until preference is known; never start Lenis under reduced motion.
    if (reducedMotion !== false) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: false,
      anchors: true,
      respectReducedMotion: false,
    });
    registerLenis(lenis);

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", onScroll);
      registerLenis(null);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
