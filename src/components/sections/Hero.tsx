"use client";

import { useRef } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { SectionShell } from "@/components/ui/SectionShell";
import {
  EASE_SCRUB,
  SCRUB,
  SplitText,
  gsap,
  mmConditions,
  useGSAP,
} from "@/lib/gsap";
import { whenPreloaded } from "@/lib/preloader";

const BOTTLE_SRC = site.images.bottleTilt.src;

/** Desktop DUSK drift (vw) — D/U left, S/K right at ~0.6–1.2×. */
const DUSK_X_DESKTOP = [-18, -10, 10, 18] as const;
/** Mobile distances ≈ half. */
const DUSK_X_MOBILE = [-9, -5, 5, 9] as const;

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const bobRef = useRef<HTMLDivElement>(null);
  const sweepBandRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const wordmark = wordmarkRef.current;
      const bottle = bottleRef.current;
      const scrubEl = scrubRef.current;
      const tiltEl = tiltRef.current;
      const bobEl = bobRef.current;
      const sweepBand = sweepBandRef.current;
      if (
        !root ||
        !wordmark ||
        !bottle ||
        !scrubEl ||
        !tiltEl ||
        !bobEl ||
        !sweepBand
      ) {
        return;
      }

      let cancelled = false;
      const mm = gsap.matchMedia();

      void whenPreloaded.then(() => {
        if (cancelled) return;

        mm.add(
          {
            ...mmConditions,
            finePointer: "(pointer: fine)",
          },
          (context) => {
            const { reduce, desktop, mobile, finePointer } =
              context.conditions as {
                reduce: boolean;
                desktop: boolean;
                mobile: boolean;
                finePointer: boolean;
              };

            if (reduce) {
              gsap.set([scrubEl, wordmark], { opacity: 0 });
              gsap.to([scrubEl, wordmark], {
                opacity: 1,
                duration: 0.3,
                ease: "power1.out",
              });
              return;
            }

            const duskX = mobile ? DUSK_X_MOBILE : DUSK_X_DESKTOP;
            const scaleEnd = mobile ? 0.88 : 0.82;
            const trigger = root.closest("section") ?? root;

            // Idle bob on innermost wrapper (does not fight scrub / tilt).
            gsap.fromTo(
              bobEl,
              { y: -6 },
              {
                y: 6,
                duration: 4,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              },
            );

            // Scroll scrub on outer wrapper.
            gsap.fromTo(
              scrubEl,
              { rotate: 0, scale: 1 },
              {
                rotate: -14,
                scale: scaleEnd,
                ease: EASE_SCRUB,
                scrollTrigger: {
                  trigger,
                  start: "top top",
                  end: "bottom top",
                  scrub: SCRUB,
                },
              },
            );

            // DUSK SplitText char drift + late fade (same 0–100vh scrub).
            SplitText.create(wordmark, {
              type: "chars",
              tag: "span",
              charsClass: "js-dusk-letter",
              aria: "auto",
              autoSplit: true,
              onSplit(self) {
                const chars = self.chars;
                const tl = gsap.timeline({
                  scrollTrigger: {
                    trigger,
                    start: "top top",
                    end: "bottom top",
                    scrub: SCRUB,
                  },
                });

                tl.to(
                  chars,
                  {
                    x: (i: number) => `${duskX[i] ?? 0}vw`,
                    stagger: 0.04,
                    ease: "none",
                    duration: 1,
                  },
                  0,
                );

                // Opacity → 0 over the last ~40% of the scrub range.
                tl.to(
                  chars,
                  {
                    opacity: 0,
                    stagger: 0.04,
                    ease: "none",
                    duration: 0.4,
                  },
                  0.6,
                );

                return tl;
              },
            });

            // Liquid light sweep: 1.2s pass, then ~4.8s idle (6s cycle).
            let sweeping = false;
            let idleCall: gsap.core.Tween | undefined;

            const armIdle = (delay: number) => {
              idleCall?.kill();
              idleCall = gsap.delayedCall(delay, () => {
                playSweep();
              });
            };

            const playSweep = () => {
              if (sweeping) return;
              sweeping = true;
              idleCall?.kill();
              gsap.fromTo(
                sweepBand,
                { xPercent: -120 },
                {
                  xPercent: 120,
                  duration: 1.2,
                  ease: "sine.inOut",
                  onComplete: () => {
                    sweeping = false;
                    armIdle(4.8);
                  },
                },
              );
            };

            gsap.set(sweepBand, { xPercent: -120 });
            armIdle(0);

            if (desktop) {
              const onBottleEnter = () => {
                if (!sweeping) playSweep();
              };
              bottle.addEventListener("mouseenter", onBottleEnter);

              if (finePointer) {
                const tiltTo = gsap.quickTo(tiltEl, "rotation", {
                  duration: 0.6,
                  ease: "power3.out",
                });

                const onMove = (event: MouseEvent) => {
                  const rect = trigger.getBoundingClientRect();
                  if (rect.width <= 0) return;
                  const x = (event.clientX - rect.left) / rect.width;
                  tiltTo(gsap.utils.mapRange(0, 1, -6, 6, x));
                };

                const onLeave = () => {
                  tiltTo(0);
                };

                trigger.addEventListener("mousemove", onMove);
                trigger.addEventListener("mouseleave", onLeave);

                return () => {
                  idleCall?.kill();
                  bottle.removeEventListener("mouseenter", onBottleEnter);
                  trigger.removeEventListener("mousemove", onMove);
                  trigger.removeEventListener("mouseleave", onLeave);
                };
              }

              return () => {
                idleCall?.kill();
                bottle.removeEventListener("mouseenter", onBottleEnter);
              };
            }

            return () => {
              idleCall?.kill();
            };
          },
        );
      });

      return () => {
        cancelled = true;
        mm.revert();
      };
    },
    { scope: rootRef },
  );

  return (
    <SectionShell
      id="hero"
      dataSection="hero"
      aria-label="Hero"
      className="min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#F6DCA8_0%,#D9A355_58%,#A9681F_100%)] text-night"
    >
      <div
        ref={rootRef}
        className="relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-6 pb-10 pt-[72px] sm:px-8 lg:min-h-screen lg:px-16 lg:pb-8"
      >
        {/* Desktop top metas */}
        <div className="hidden items-start justify-between pt-4 lg:flex">
          <Label className="text-night/60">{site.hero.metaLeft}</Label>
          <Label className="text-night/60">{site.hero.metaRight}</Label>
        </div>

        {/* Mobile / tablet centered eyebrow */}
        <p className="mt-8 text-center text-[9px] font-semibold tracking-[0.14em] text-night/65 uppercase whitespace-nowrap lg:hidden">
          {site.hero.eyebrow}
        </p>

        <Label className="pointer-events-none absolute top-[42%] left-6 origin-left -translate-y-1/2 -rotate-90 text-night/50 hidden lg:left-8 lg:block">
          {site.hero.metaVertical}
        </Label>

        {/* Stage: DUSK + bottle share one composition frame */}
        <div className="relative mx-auto mt-2.5 flex w-full items-center justify-center lg:mt-1 lg:flex-1">
          <div className="relative aspect-[342/470] w-full max-w-[1320px] lg:aspect-[16/9]">
            <div
              ref={wordmarkRef}
              className="js-dusk-wordmark absolute inset-x-0 top-0 z-0 flex select-none items-start justify-center font-display text-[clamp(5.5rem,33.8vw,8.25rem)] leading-[0.85] font-light tracking-[-0.02em] lg:top-[2%] lg:text-[clamp(9rem,31vw,29rem)] lg:leading-[0.76] lg:tracking-[-0.045em]"
              aria-label={site.hero.wordmark}
            >
              {site.hero.wordmark}
            </div>

            <span className="pointer-events-none absolute top-[1%] right-0 z-10 font-display text-[1.25rem] italic text-night/70 sm:text-2xl lg:top-[6%] lg:right-[4%] lg:text-4xl xl:text-5xl">
              {site.hero.editionMark}
            </span>

            {/* Layout shell keeps -translate-x-1/2; GSAP never animates this node. */}
            <div
              ref={bottleRef}
              data-bottle="hero"
              className="js-bottle absolute top-[9%] left-1/2 z-20 w-[88%] -translate-x-1/2 sm:w-[80%] sm:max-w-[380px] lg:top-[8%] lg:w-[min(34vw,380px)] lg:max-w-none"
            >
              {/* Outer: scroll scrub (rotate / scale) */}
              <div ref={scrubRef} className="will-change-transform">
                {/* Mid: cursor tilt */}
                <div ref={tiltRef} className="will-change-transform">
                  {/* Inner: idle bob */}
                  <div ref={bobRef} className="relative will-change-transform">
                    <div
                      aria-hidden
                      className="absolute bottom-[2%] left-1/2 h-8 w-[55%] -translate-x-1/2 rounded-full bg-night/30 blur-xl"
                    />
                    <Image
                      src={BOTTLE_SRC}
                      alt={site.images.bottleTilt.alt}
                      width={840}
                      height={1075}
                      sizes="(max-width: 640px) 88vw, (max-width: 1023px) 380px, 380px"
                      quality={90}
                      priority
                      className="relative h-auto w-full object-contain drop-shadow-[0_30px_40px_rgba(14,11,8,0.25)]"
                    />
                    <div
                      data-light-sweep
                      className="js-light-sweep pointer-events-none absolute inset-0 overflow-hidden"
                      aria-hidden
                      style={{
                        WebkitMaskImage: `url(${BOTTLE_SRC})`,
                        maskImage: `url(${BOTTLE_SRC})`,
                        WebkitMaskSize: "contain",
                        maskSize: "contain",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        WebkitMaskPosition: "center",
                        maskPosition: "center",
                      }}
                    >
                      <div
                        ref={sweepBandRef}
                        className="absolute top-0 left-0 h-full w-[45%]"
                        style={{
                          background:
                            "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                          mixBlendMode: "screen",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 mt-2 flex flex-col items-center gap-5 lg:mt-0 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="overflow-hidden">
              <span
                data-headline-line
                className="js-headline-line block font-display text-[1.75rem] leading-[1.1] font-normal italic sm:text-[clamp(1.75rem,3vw,2.6rem)] sm:leading-[1.12]"
              >
                {site.hero.tagline}
              </span>
            </h1>
            <p
              data-headline-line
              className="js-headline-line mt-3 hidden max-w-md text-sm leading-relaxed text-night/70 lg:block"
            >
              {site.hero.description}
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-4 lg:items-end lg:gap-3.5">
            <Button
              href="#offer"
              magnetic
              className="order-1 h-14 w-full min-w-0 lg:order-2 lg:w-auto lg:min-w-[240px]"
            >
              {site.hero.cta}
            </Button>
            <Label className="order-2 flex items-center justify-center gap-2 text-[9px] text-night/85 lg:order-1 lg:text-[10px]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber7" />
              {site.hero.stock}
            </Label>
            <a
              href="#story"
              className="order-3 hidden min-h-11 items-center text-[13px] font-medium text-night/75 underline decoration-night/30 underline-offset-4 sm:inline-flex"
            >
              {site.hero.discover}
            </a>
            <p className="order-4 hidden text-xs text-night/55 sm:block">
              {site.hero.perks}
            </p>
          </div>
        </div>

        <Label className="mt-6 hidden text-center text-night/45 sm:block">
          {site.hero.scrollHint}
        </Label>
      </div>
    </SectionShell>
  );
}
