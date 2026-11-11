"use client";

import { useRef } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { SectionShell } from "@/components/ui/SectionShell";
import {
  EASE_REVEAL,
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
  const enterRef = useRef<HTMLDivElement>(null);
  const sweepBandRef = useRef<HTMLDivElement>(null);
  const metasRef = useRef<HTMLDivElement>(null);
  const editionRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const discoverRef = useRef<HTMLAnchorElement>(null);
  const perksRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const wordmark = wordmarkRef.current;
      const bottle = bottleRef.current;
      const scrubEl = scrubRef.current;
      const tiltEl = tiltRef.current;
      const bobEl = bobRef.current;
      const enterEl = enterRef.current;
      const sweepBand = sweepBandRef.current;
      const metas = metasRef.current;
      const edition = editionRef.current;
      const tagline = taglineRef.current;
      const desc = descRef.current;
      const discover = discoverRef.current;
      const perks = perksRef.current;
      const vertical = root?.querySelector<HTMLElement>(".js-hero-vertical");
      const stock = root?.querySelector<HTMLElement>(".js-hero-stock");
      const cta = root?.querySelector<HTMLElement>(".js-hero-cta");
      const scrollHint = root?.querySelector<HTMLElement>(".js-hero-scroll");
      if (
        !root ||
        !wordmark ||
        !bottle ||
        !scrubEl ||
        !tiltEl ||
        !bobEl ||
        !enterEl ||
        !sweepBand ||
        !metas ||
        !vertical ||
        !edition ||
        !tagline ||
        !desc ||
        !stock ||
        !cta ||
        !discover ||
        !perks ||
        !scrollHint
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

            const rightCol = [stock, cta, discover, perks];
            const heroContent = [
              wordmark,
              enterEl,
              metas,
              vertical,
              edition,
              tagline,
              desc,
              ...rightCol,
              scrollHint,
            ];

            if (reduce) {
              gsap.set(heroContent, { opacity: 0 });
              root.removeAttribute("data-hero-entering");
              gsap.to(heroContent, {
                opacity: 1,
                duration: 0.3,
                ease: "power1.out",
              });
              return;
            }

            const duskX = mobile ? DUSK_X_MOBILE : DUSK_X_DESKTOP;
            const scaleEnd = mobile ? 0.88 : 0.82;
            const trigger = root.closest("section") ?? root;
            const yBottle = mobile ? 20 : 40;
            const yCopy = mobile ? 6 : 12;
            const yRail = mobile ? 8 : 16;

            // No flash: hide before entrance, then drop the CSS visibility guard.
            gsap.set(enterEl, { opacity: 0, y: yBottle, scale: 0.96 });
            gsap.set([metas, vertical, edition], { opacity: 0 });
            gsap.set(tagline, { yPercent: 100, y: 0 });
            gsap.set(desc, { opacity: 0, y: yCopy });
            gsap.set([...rightCol, scrollHint], { opacity: 0, y: yRail });
            root.removeAttribute("data-hero-entering");

            // Liquid light sweep helpers — armed after entrance completes.
            let sweeping = false;
            let idleCall: gsap.core.Tween | undefined;

            const playSweep = () => {
              if (sweeping) return;
              sweeping = true;
              idleCall?.kill();
              const box = sweepBand.parentElement;
              const boxW = box ? box.offsetWidth : 0;
              const bandW = sweepBand.offsetWidth;
              // Travel fully off-canvas on both sides so it never parks on the glass.
              gsap.fromTo(
                sweepBand,
                { x: -bandW * 1.15, rotation: 18, opacity: 0 },
                {
                  x: boxW + bandW * 0.15,
                  rotation: 18,
                  keyframes: { opacity: [0, 1, 1, 0], easeEach: "none" },
                  duration: 2.2,
                  ease: "sine.inOut",
                  onComplete: () => {
                    sweeping = false;
                    armIdle(4.8);
                  },
                },
              );
            };

            const armIdle = (delay: number) => {
              idleCall?.kill();
              idleCall = gsap.delayedCall(delay, () => {
                playSweep();
              });
            };

            gsap.set(sweepBand, { x: -9999, rotation: 18, opacity: 0 });

            let entrancePlayed = false;

            // DUSK SplitText: load rise + scroll drift / late fade.
            SplitText.create(wordmark, {
              type: "chars",
              tag: "span",
              charsClass: "js-dusk-letter",
              aria: "auto",
              autoSplit: true,
              onSplit(self) {
                const chars = self.chars;

                if (!entrancePlayed) {
                  entrancePlayed = true;
                  gsap.set(chars, { yPercent: 100, y: 0 });

                  const entrance = gsap.timeline({
                    onComplete: () => {
                      // Idle bob on bob wrapper only after entrance ends.
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
                      armIdle(0);
                    },
                  });

                  entrance
                    .to(
                      chars,
                      {
                        yPercent: 0,
                        duration: 1.1,
                        stagger: 0.05,
                        ease: EASE_REVEAL,
                      },
                      0,
                    )
                    .to(
                      enterEl,
                      {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.2,
                        ease: EASE_REVEAL,
                      },
                      0.15,
                    )
                    .to(
                      [metas, vertical, edition],
                      {
                        opacity: 1,
                        duration: 0.8,
                        ease: "power1.out",
                      },
                      0.3,
                    )
                    .to(
                      tagline,
                      {
                        yPercent: 0,
                        duration: 0.9,
                        ease: EASE_REVEAL,
                      },
                      0.45,
                    )
                    .to(
                      desc,
                      {
                        opacity: 1,
                        y: 0,
                        duration: 0.9,
                        ease: EASE_REVEAL,
                      },
                      0.45,
                    )
                    .to(
                      [...rightCol, scrollHint],
                      {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.08,
                        ease: "power1.out",
                      },
                      0.6,
                    );
                }

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
        data-hero-entering=""
        className="relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-6 pb-10 pt-[72px] sm:px-8 lg:h-[100dvh] lg:min-h-0 lg:px-16 lg:pb-4"
      >
        {/* Desktop top metas */}
        <div
          ref={metasRef}
          className="js-hero-enter hidden items-start justify-between pt-4 lg:flex"
        >
          <Label className="text-night/60">{site.hero.metaLeft}</Label>
          <Label className="text-night/60">{site.hero.metaRight}</Label>
        </div>

        {/* Mobile / tablet centered eyebrow */}
        <p className="mt-8 text-center text-[9px] font-semibold tracking-[0.14em] text-night/65 uppercase whitespace-nowrap lg:hidden">
          {site.hero.eyebrow}
        </p>

        {/* Layout shell: centered on the 100dvh hero, rotated with Tailwind. GSAP only fades the inner label. */}
        <div className="pointer-events-none absolute top-1/2 left-8 hidden -translate-x-1/2 -translate-y-1/2 -rotate-90 lg:block">
          <Label className="js-hero-enter js-hero-vertical block whitespace-nowrap text-night/50">
            {site.hero.metaVertical}
          </Label>
        </div>

        {/* Stage: fills leftover viewport height on lg (no fixed aspect). */}
        <div className="relative mx-auto mt-2.5 flex w-full min-h-0 flex-1 items-center justify-center lg:mt-1">
          <div className="relative aspect-[342/470] w-full max-w-[min(100%,max(240px,calc((100svh-350px)*0.728)))] sm:max-w-[min(100%,max(300px,calc((100svh-460px)*0.728)))] lg:max-w-[1320px] lg:aspect-auto lg:h-full lg:min-h-0">
            <div
              ref={wordmarkRef}
              className="js-hero-enter js-dusk-wordmark absolute inset-x-[-40vw] top-0 lg:inset-x-0 z-0 flex select-none items-start justify-center overflow-hidden font-display text-[clamp(5.5rem,33.8vw,8.25rem)] leading-[0.85] font-light tracking-[-0.02em] lg:top-[2%] lg:text-[clamp(9rem,min(31vw,64dvh),29rem)] lg:leading-[0.76] lg:tracking-[-0.045em]"
              aria-label={site.hero.wordmark}
            >
              {site.hero.wordmark}
            </div>

            <span
              ref={editionRef}
              className="js-hero-enter pointer-events-none absolute top-[-5%] right-[calc(50%-min(41.2vw,161px))] z-10 font-display text-[1.25rem] italic text-night/70 sm:top-0 sm:right-[calc(50%-198px)] sm:text-2xl lg:top-[6%] lg:right-[4%] lg:text-4xl xl:text-5xl"
            >
              {site.hero.editionMark}
            </span>

            {/* Layout shell keeps -translate-x-1/2; GSAP never animates this node. */}
            <div
              ref={bottleRef}
              data-bottle="hero"
              className="js-bottle absolute top-[9%] left-1/2 z-20 w-[88%] -translate-x-1/2 sm:w-[80%] sm:max-w-[380px] lg:top-1/2 lg:h-full lg:w-auto lg:max-h-full lg:max-w-[min(34vw,380px)] lg:-translate-y-1/2"
            >
              {/* Outer: scroll scrub (rotate / scale) */}
              <div ref={scrubRef} className="h-full will-change-transform">
                {/* Mid: cursor tilt */}
                <div ref={tiltRef} className="h-full will-change-transform">
                  {/* Idle bob (starts after entrance) */}
                  <div ref={bobRef} className="relative h-full will-change-transform">
                    {/* Innermost: load entrance — does not fight scrub / tilt / bob */}
                    <div
                      ref={enterRef}
                      className="js-hero-enter relative h-full will-change-transform"
                    >
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
                        className="relative h-auto w-full object-contain drop-shadow-[0_30px_40px_rgba(14,11,8,0.25)] lg:h-full lg:w-auto"
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
                          className="absolute top-[-30%] left-0 h-[160%] w-[70%] will-change-transform"
                          style={{
                            // Soft glow + thin specular line, diagonal via GSAP rotation.
                            background:
                              "linear-gradient(90deg, rgba(255,246,228,0) 0%, rgba(255,240,214,0.10) 24%, rgba(255,244,224,0.38) 40%, rgba(255,252,244,0.70) 47%, rgba(255,255,255,0.95) 49%, rgba(255,252,244,0.70) 51%, rgba(255,244,224,0.30) 58%, rgba(255,240,214,0.08) 70%, rgba(255,246,228,0) 82%, rgba(255,255,255,0.45) 86%, rgba(255,246,228,0) 89%, rgba(255,246,228,0) 100%)",
                            mixBlendMode: "screen",
                            filter: "blur(2px)",
                            opacity: 0,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 mt-2 flex flex-col items-center gap-5 lg:mt-0 lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-5">
          <div className="max-w-xl text-center lg:text-left">
            <h1 className="overflow-hidden">
              <span
                ref={taglineRef}
                data-headline-line
                className="js-hero-enter js-headline-line block font-display text-[1.75rem] leading-[1.1] font-normal italic sm:text-[clamp(1.75rem,3vw,2.6rem)] sm:leading-[1.12]"
              >
                {site.hero.tagline}
              </span>
            </h1>
            <p
              ref={descRef}
              data-headline-line
              className="js-hero-enter js-headline-line mt-3 hidden max-w-md text-sm leading-relaxed text-night/70 lg:block"
            >
              {site.hero.description}
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-4 lg:items-end lg:gap-2.5">
            <Button
              href="#offer"
              magnetic
              className="js-hero-enter js-hero-cta order-1 h-14 w-full min-w-0 lg:order-2 lg:w-auto lg:min-w-[240px]"
            >
              {site.hero.cta}
            </Button>
            <Label className="js-hero-enter js-hero-stock order-2 flex items-center justify-center gap-2 text-[9px] text-night/85 lg:order-1 lg:text-[10px]">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber7" />
              {site.hero.stock}
            </Label>
            <a
              ref={discoverRef}
              href="#story"
              className="js-hero-enter order-3 hidden min-h-11 items-center text-[13px] font-medium text-night/75 underline decoration-night/30 underline-offset-4 sm:inline-flex"
            >
              {site.hero.discover}
            </a>
            <p
              ref={perksRef}
              className="js-hero-enter order-4 hidden text-xs text-night/55 sm:block"
            >
              {site.hero.perks}
            </p>
          </div>
        </div>

        <Label className="js-hero-enter js-hero-scroll mt-6 hidden text-center text-night/45 sm:block lg:mt-2">
          {site.hero.scrollHint}
        </Label>
      </div>
    </SectionShell>
  );
}
