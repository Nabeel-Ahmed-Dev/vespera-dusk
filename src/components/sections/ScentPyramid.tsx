"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { SectionShell } from "@/components/ui/SectionShell";
import {
  DURATION,
  EASE_REVEAL,
  ScrollTrigger,
  gsap,
  mmConditions,
  useGSAP,
} from "@/lib/gsap";
import { whenPreloaded } from "@/lib/preloader";

const BAND_ORDER = ["base", "heart", "top"] as const;

export function ScentPyramid() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const pyramidRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const headline = headlineRef.current;
      const body = bodyRef.current;
      const pyramid = pyramidRef.current;
      if (!root || !headline || !body || !pyramid) return;

      const headlineLines = headline.querySelectorAll<HTMLElement>(
        "[data-headline-line]",
      );
      const bands = BAND_ORDER.map((name) =>
        pyramid.querySelector<SVGGElement>(`[data-pyramid-band="${name}"]`),
      ).filter((el): el is SVGGElement => Boolean(el));
      const rows = gsap.utils.toArray<HTMLElement>(
        root.querySelectorAll("[data-pyramid-row]"),
      );

      let cancelled = false;
      const mm = gsap.matchMedia();
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;

      // Hide immediately so content does not flash before ScrollTriggers arm.
      if (!prefersReduced) {
        gsap.set(headlineLines, { yPercent: 100, y: 0 });
        if (!isMobile && headlineLines[1]) {
          gsap.set(headlineLines[1], { x: 40 });
        }
        gsap.set(body, { opacity: 0, y: 24 });
        gsap.set(bands, {
          transformOrigin: "50% 100%",
          scaleY: 0,
        });
        rows.forEach((row) => {
          const labelEl = row.children[0] as HTMLElement | undefined;
          const titleEl = row.querySelector<HTMLElement>("h3");
          const fadeText = [labelEl, titleEl].filter(
            (el): el is HTMLElement => Boolean(el),
          );
          const pills = row.querySelectorAll("[data-note-pill]");
          gsap.set(fadeText, { opacity: 0, y: 20 });
          gsap.set(pills, { opacity: 0, y: 16 });
        });
      }

      void whenPreloaded.then(() => {
        if (cancelled) return;

        mm.add(mmConditions, (context) => {
          const { reduce, mobile } = context.conditions as {
            reduce: boolean;
            desktop: boolean;
            mobile: boolean;
          };

          const finePointer = window.matchMedia(
            "(hover: hover) and (pointer: fine)",
          ).matches;

          const revealedBands = new Set<Element>();
          const revealedRows = new Set<Element>();
          let activeKey: string | null = null;
          let hoverDuration = 0;
          const cleanups: Array<() => void> = [];

          const applyHighlight = () => {
            bands.forEach((band) => {
              if (!revealedBands.has(band)) return;
              const key = band.getAttribute("data-pyramid-band");
              gsap.to(band, {
                opacity: activeKey === null ? 1 : key === activeKey ? 1 : 0.3,
                duration: hoverDuration,
                ease: "power2.out",
                overwrite: "auto",
              });
            });

            rows.forEach((row) => {
              if (!revealedRows.has(row)) return;
              const key = row.getAttribute("data-pyramid-row");
              gsap.to(row, {
                opacity: activeKey === null ? 1 : key === activeKey ? 1 : 0.45,
                duration: hoverDuration,
                ease: "power2.out",
                overwrite: "auto",
              });
            });
          };

          const setupHover = (duration: number) => {
            if (mobile || !finePointer || rows.length === 0) return;
            hoverDuration = duration;

            rows.forEach((row) => {
              const onEnter = () => {
                activeKey = row.getAttribute("data-pyramid-row");
                applyHighlight();
              };
              const onLeave = () => {
                activeKey = null;
                applyHighlight();
              };
              const onFocusOut = (event: FocusEvent) => {
                const next = event.relatedTarget as Node | null;
                if (next && row.contains(next)) return;
                onLeave();
              };

              row.addEventListener("pointerenter", onEnter);
              row.addEventListener("pointerleave", onLeave);
              row.addEventListener("focusin", onEnter);
              row.addEventListener("focusout", onFocusOut);

              cleanups.push(() => {
                row.removeEventListener("pointerenter", onEnter);
                row.removeEventListener("pointerleave", onLeave);
                row.removeEventListener("focusin", onEnter);
                row.removeEventListener("focusout", onFocusOut);
              });
            });
          };

          if (reduce) {
            bands.forEach((band) => revealedBands.add(band));
            rows.forEach((row) => revealedRows.add(row));
            setupHover(0);
            return () => {
              cleanups.forEach((fn) => fn());
            };
          }

          const headlineDur = mobile ? 0.7 : DURATION.reveal;
          const bodyDur = mobile ? 0.7 : DURATION.reveal;
          const bandDur = mobile ? 0.5 : 0.6;
          const bandStagger = mobile ? 0.12 : 0.15;
          const pillStagger = mobile ? 0.03 : 0.04;

          setupHover(0.35);

          // Re-assert hidden start (matchMedia may remount after breakpoint change).
          gsap.set(headlineLines, { yPercent: 100, y: 0, x: 0 });
          if (!mobile && headlineLines[1]) {
            gsap.set(headlineLines[1], { x: 40 });
          }
          gsap.set(body, { opacity: 0, y: 24 });
          gsap.set(bands, {
            transformOrigin: "50% 100%",
            scaleY: 0,
            opacity: 1,
          });

          const introTl = gsap
            .timeline({ paused: true })
            .to(headlineLines, {
              yPercent: 0,
              x: 0,
              duration: headlineDur,
              stagger: 0.12,
              ease: EASE_REVEAL,
            })
            .to(
              body,
              {
                opacity: 1,
                y: 0,
                duration: bodyDur,
                ease: EASE_REVEAL,
              },
              0.2,
            );

          ScrollTrigger.create({
            trigger: headline,
            start: "top 60%",
            once: true,
            onEnter: () => {
              introTl.play();
            },
          });

          const bandsTl = gsap.timeline({
            paused: true,
            onComplete: () => {
              bands.forEach((band) => revealedBands.add(band));
              if (activeKey !== null) applyHighlight();
            },
          });

          bandsTl.to(bands, {
            scaleY: 1,
            duration: bandDur,
            stagger: bandStagger,
            ease: EASE_REVEAL,
          });

          ScrollTrigger.create({
            trigger: pyramid,
            start: "top 65%",
            once: true,
            onEnter: () => {
              bandsTl.play();
            },
          });

          rows.forEach((row) => {
            const labelEl = row.children[0] as HTMLElement | undefined;
            const titleEl = row.querySelector<HTMLElement>("h3");
            const fadeText = [labelEl, titleEl].filter(
              (el): el is HTMLElement => Boolean(el),
            );
            const pills = gsap.utils.toArray<HTMLElement>(
              row.querySelectorAll("[data-note-pill]"),
            );

            gsap.set(fadeText, { opacity: 0, y: 20 });
            gsap.set(pills, { opacity: 0, y: 16 });
            gsap.set(row, { opacity: 1 });

            const rowTl = gsap.timeline({
              paused: true,
              onComplete: () => {
                revealedRows.add(row);
                if (activeKey !== null) applyHighlight();
              },
            });

            rowTl
              .to(fadeText, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: EASE_REVEAL,
              })
              .to(
                pills,
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: pillStagger,
                  ease: EASE_REVEAL,
                },
                0.15,
              );

            ScrollTrigger.create({
              trigger: row,
              start: "top 65%",
              once: true,
              onEnter: () => {
                rowTl.play();
              },
            });
          });

          return () => {
            cleanups.forEach((fn) => fn());
          };
        });
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
      id="notes"
      dataSection="scent-pyramid"
      aria-label="Scent pyramid"
      className="overflow-hidden bg-night text-cream"
    >
      <div
        ref={rootRef}
        className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-32"
      >
        <Label className="text-cream/60">{site.scentPyramid.label}</Label>

        <div className="mt-7 grid gap-10 sm:mt-8 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-24">
          <div>
            <h2
              ref={headlineRef}
              className="font-display text-[clamp(2.5rem,11vw,2.875rem)] leading-[1.02] font-light tracking-[-0.01em] lg:text-[clamp(2.5rem,5vw,4.75rem)]"
            >
              <span className="block overflow-hidden">
                <span data-headline-line className="js-headline-line block">
                  {site.scentPyramid.headline}
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  data-headline-line
                  className="js-headline-line block italic text-honey3"
                >
                  {site.scentPyramid.headlineItalic}
                </span>
              </span>
            </h2>
            <p
              ref={bodyRef}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/70"
            >
              {site.scentPyramid.body}
            </p>

            <svg
              ref={pyramidRef}
              viewBox="0 0 520 460"
              className="mt-10 w-full max-w-[420px] sm:mt-12"
              aria-hidden
            >
              <defs>
                <linearGradient id="pyramid-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FBE7C0" />
                  <stop offset="1" stopColor="#EDC98A" />
                </linearGradient>
                <linearGradient id="pyramid-heart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#E0AE5C" />
                  <stop offset="1" stopColor="#B9782A" />
                </linearGradient>
                <linearGradient id="pyramid-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8A5418" />
                  <stop offset="1" stopColor="#2A1A0B" />
                </linearGradient>
              </defs>
              <g data-pyramid-band="top" className="js-pyramid-band">
                <polygon
                  points="260,0 344.8,150 175.2,150"
                  fill="url(#pyramid-top)"
                />
              </g>
              <g data-pyramid-band="heart" className="js-pyramid-band">
                <polygon
                  points="173,156 347,156 432.9,306 87.1,306"
                  fill="url(#pyramid-heart)"
                />
              </g>
              <g data-pyramid-band="base" className="js-pyramid-band">
                <polygon
                  points="84.8,312 435.2,312 520,460 0,460"
                  fill="url(#pyramid-base)"
                />
              </g>
            </svg>
          </div>

          <div className="flex flex-col">
            {site.scentPyramid.tiers.map((tier) => (
              <div
                key={tier.phase}
                data-pyramid-row={tier.phase.toLowerCase()}
                tabIndex={0}
                className="js-pyramid-row border-t border-cream/15 py-7"
              >
                <Label className="text-cream/50">
                  {tier.roman} · {tier.phase} — {tier.timing}
                </Label>
                <h3 className="mt-3 font-display text-[clamp(1.75rem,8vw,2.125rem)] font-light lg:text-[clamp(1.75rem,3vw,2.25rem)]">
                  {tier.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tier.notes.map((note) => (
                    <span
                      key={note}
                      data-note-pill
                      className="js-note-pill inline-flex min-h-11 items-center rounded-full border border-cream/30 px-3.5 py-1.5 text-[13px] font-medium text-cream/90"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <Label className="mt-6 text-cream/35">
              {site.scentPyramid.disclaimer}
            </Label>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
