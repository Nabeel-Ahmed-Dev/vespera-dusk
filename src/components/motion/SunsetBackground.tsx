"use client";

import {
  EASE_SCRUB,
  SCRUB,
  gsap,
  ScrollTrigger,
  useGSAP,
} from "@/lib/gsap";
import { createMotionMatchMedia, useReducedMotion } from "@/lib/reduced-motion";

/** Motion-spec sunset stops (Hero → Notes). */
const SUNSET_GOLD = "#E7C07F";
const SUNSET_AMBER = "#A9681F";
const SUNSET_NIGHT = "#0E0B08";
const FG_NIGHT = "#0E0B08";
const FG_CREAM = "#F6EEDF";

function setSunsetVars(bg: string, fg: string) {
  const root = document.documentElement;
  root.style.setProperty("--sunset-bg", bg);
  root.style.setProperty("--sunset-fg", fg);
}

function clearSunsetVars() {
  const root = document.documentElement;
  root.style.removeProperty("--sunset-bg");
  root.style.removeProperty("--sunset-fg");
}

/**
 * Scroll-linked sunset background: gold → amber → night from Hero to Notes.
 * Under reduced motion, does nothing — sections keep their static backgrounds.
 */
export function SunsetBackground() {
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (reducedMotion !== false) {
        document.documentElement.removeAttribute("data-sunset");
        clearSunsetVars();
        return;
      }

      const motion = createMotionMatchMedia();

      motion.add((conditions) => {
        if (conditions.reduce) {
          document.documentElement.removeAttribute("data-sunset");
          clearSunsetVars();
          return;
        }

        document.documentElement.dataset.sunset = "live";
        setSunsetVars(SUNSET_GOLD, FG_NIGHT);

        const state = { bg: SUNSET_GOLD };

        const apply = (progress: number) => {
          const fg = progress >= 0.5 ? FG_CREAM : FG_NIGHT;
          setSunsetVars(state.bg, fg);
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero",
            endTrigger: "#notes",
            start: "top top",
            end: "top top",
            scrub: SCRUB,
            invalidateOnRefresh: true,
            onUpdate: (self) => apply(self.progress),
          },
        });

        tl.to(state, {
          bg: SUNSET_AMBER,
          ease: EASE_SCRUB,
          duration: 1,
          onUpdate: () => apply(tl.scrollTrigger?.progress ?? 0),
        });
        tl.to(state, {
          bg: SUNSET_NIGHT,
          ease: EASE_SCRUB,
          duration: 1,
          onUpdate: () => apply(tl.scrollTrigger?.progress ?? 0),
        });

        ScrollTrigger.refresh();

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
          document.documentElement.removeAttribute("data-sunset");
          clearSunsetVars();
        };
      });

      return () => {
        motion.revert();
        document.documentElement.removeAttribute("data-sunset");
        clearSunsetVars();
      };
    },
    { dependencies: [reducedMotion] },
  );

  if (reducedMotion !== false) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ background: "var(--sunset-bg, #E7C07F)" }}
    />
  );
}
