"use client";

import { useRef } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { SectionShell } from "@/components/ui/SectionShell";
import {
  DURATION,
  EASE_REVEAL,
  ScrollTrigger,
  SplitText,
  gsap,
  mmConditions,
  useGSAP,
} from "@/lib/gsap";
import { whenPreloaded } from "@/lib/preloader";

function formatClock(minutesPastEighteen: number): string {
  const mins = Math.round(minutesPastEighteen);
  return `18:${String(mins).padStart(2, "0")}`;
}

export function Story() {
  const rootRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const attributionRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const headline = headlineRef.current;
      const body = bodyRef.current;
      const attribution = attributionRef.current;
      const imageClip = imageRef.current;
      const badge = badgeRef.current;
      const statsRow = statsRef.current;
      if (
        !root ||
        !headline ||
        !body ||
        !attribution ||
        !imageClip ||
        !badge ||
        !statsRow
      ) {
        return;
      }

      const imageInner = imageClip.querySelector("img");
      const headlineLines = headline.querySelectorAll<HTMLElement>(
        ".js-headline-line",
      );
      const statEls = gsap.utils.toArray<HTMLElement>(
        statsRow.querySelectorAll(".js-stat"),
      );
      const statValues = statEls.map((el) =>
        el.querySelector<HTMLElement>("[data-stat-value]"),
      );

      let cancelled = false;
      const mm = gsap.matchMedia();

      void whenPreloaded.then(() => {
        if (cancelled) return;

        mm.add(mmConditions, (context) => {
          const { reduce, mobile } = context.conditions as {
            reduce: boolean;
            desktop: boolean;
            mobile: boolean;
          };

          const dur = (seconds: number) => seconds * (mobile ? 0.75 : 1);

          if (reduce) {
            gsap.set([headline, body, attribution, imageClip, statsRow], {
              opacity: 0,
            });

            gsap.to(headline, {
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
              scrollTrigger: {
                trigger: headline,
                start: "top 60%",
                once: true,
              },
            });

            gsap.to([body, attribution], {
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
              scrollTrigger: {
                trigger: body,
                start: "top 65%",
                once: true,
              },
            });

            gsap.to(imageClip, {
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
              scrollTrigger: {
                trigger: imageClip,
                start: "top 60%",
                once: true,
              },
            });

            gsap.to(statsRow, {
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
              scrollTrigger: {
                trigger: statsRow,
                start: "top 65%",
                once: true,
              },
            });

            return;
          }

          const revealDur = dur(DURATION.reveal);
          const imageDur = dur(1.2);
          const countDur = dur(1.4);
          const imageScaleFrom = mobile ? 1.08 : 1.15;

          // --- Headline line masks ---
          gsap.set(headlineLines, { yPercent: 100, y: 0 });
          if (!mobile && headlineLines[1]) {
            gsap.set(headlineLines[1], { x: 40 });
          }

          const headlineTween = gsap.to(headlineLines, {
            yPercent: 0,
            x: 0,
            duration: revealDur,
            stagger: 0.12,
            ease: EASE_REVEAL,
            paused: true,
          });

          ScrollTrigger.create({
            trigger: headline,
            start: "top 60%",
            once: true,
            onEnter: () => {
              headlineTween.play();
            },
          });

          // --- Body SplitText + attribution ---
          gsap.set(attribution, { opacity: 0, y: 16 });

          SplitText.create(body, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            aria: "auto",
            onSplit(self) {
              gsap.set(self.lines, { yPercent: 100, y: 0 });

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: body,
                  start: "top 65%",
                  once: true,
                },
              });

              tl.to(self.lines, {
                yPercent: 0,
                duration: revealDur,
                stagger: 0.12,
                ease: EASE_REVEAL,
              });

              tl.to(
                attribution,
                {
                  opacity: 1,
                  y: 0,
                  duration: revealDur,
                  ease: EASE_REVEAL,
                },
                "-=0.35",
              );

              return tl;
            },
          });

          // --- Image clip + zoom ---
          if (imageInner) {
            gsap.set(imageClip, { clipPath: "inset(100% 0 0 0)" });
            gsap.set(imageInner, { scale: imageScaleFrom });

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: imageClip,
                  start: "top 60%",
                  once: true,
                },
              })
              .to(
                imageClip,
                {
                  clipPath: "inset(0% 0 0 0)",
                  duration: imageDur,
                  ease: EASE_REVEAL,
                },
                0,
              )
              .to(
                imageInner,
                {
                  scale: 1,
                  duration: imageDur,
                  ease: EASE_REVEAL,
                },
                0,
              );
          }

          // --- Stats fade + count-up (SSR keeps finals until armed) ---
          gsap.set(statEls, { opacity: 0, y: 16 });

          const clockProxy = { m: 47 };
          const percentProxy = { n: 22 };
          const hoursProxy = { n: 12 };

          const clockTween = gsap.fromTo(
            clockProxy,
            { m: 0 },
            {
              m: 47,
              duration: countDur,
              ease: "power2.out",
              paused: true,
              immediateRender: false,
              onStart: () => {
                if (statValues[0]) statValues[0].textContent = formatClock(0);
              },
              onUpdate: () => {
                if (statValues[0]) {
                  statValues[0].textContent = formatClock(clockProxy.m);
                }
              },
            },
          );

          const percentTween = gsap.fromTo(
            percentProxy,
            { n: 0 },
            {
              n: 22,
              duration: countDur,
              ease: "power2.out",
              paused: true,
              immediateRender: false,
              onStart: () => {
                if (statValues[1]) statValues[1].textContent = "0%";
              },
              onUpdate: () => {
                if (statValues[1]) {
                  statValues[1].textContent = `${Math.round(percentProxy.n)}%`;
                }
              },
            },
          );

          const hoursTween = gsap.fromTo(
            hoursProxy,
            { n: 0 },
            {
              n: 12,
              duration: countDur,
              ease: "power2.out",
              paused: true,
              immediateRender: false,
              onStart: () => {
                if (statValues[2]) statValues[2].textContent = "0h+";
              },
              onUpdate: () => {
                if (statValues[2]) {
                  statValues[2].textContent = `${Math.round(hoursProxy.n)}h+`;
                }
              },
            },
          );

          const statsFade = gsap.to(statEls, {
            opacity: 1,
            y: 0,
            duration: revealDur,
            stagger: 0.1,
            ease: EASE_REVEAL,
            paused: true,
            immediateRender: false,
          });

          ScrollTrigger.create({
            trigger: statsRow,
            start: "top 65%",
            once: true,
            onEnter: () => {
              statsFade.play();
              clockTween.play();
              percentTween.play();
              hoursTween.play();
            },
          });

          // --- Badge spin (pause off-screen) ---
          const badgeSpin = gsap.to(badge, {
            rotation: 360,
            duration: 20,
            ease: "none",
            repeat: -1,
            paused: true,
          });

          ScrollTrigger.create({
            trigger: root.closest("section") ?? root,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              if (self.isActive) badgeSpin.play();
              else badgeSpin.pause();
            },
          });
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
      id="story"
      dataSection="story"
      aria-label="Story"
      className="overflow-hidden bg-[linear-gradient(180deg,#A9681F_0%,#4A2D10_22%,#16110C_55%,#0E0B08_100%)] text-cream"
    >
      <div
        ref={rootRef}
        className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:pt-[120px] lg:pb-[67px]"
      >
        <div className="mb-8 flex items-start justify-between gap-8 sm:mb-10 lg:mb-[37px]">
          <Label className="text-cream/60 lg:text-[11px] lg:leading-[13px]">{site.story.label}</Label>
          <Label className="hidden text-cream/50 lg:block lg:text-[11px] lg:leading-[13px]">{site.story.aside}</Label>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[680fr_592fr] lg:gap-x-[72px] lg:gap-y-[58px]">
          <h2
            ref={headlineRef}
            className="order-1 max-w-3xl font-display text-[clamp(2.5rem,11vw,2.875rem)] leading-[1.02] font-light tracking-[-0.01em] lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:text-[min(99px,6.875vw)] lg:leading-[1.05] lg:tracking-normal"
          >
            <span className="block overflow-hidden">
              <span data-headline-line className="js-headline-line block">
                {site.story.headline}
              </span>
            </span>
            <span className="block overflow-hidden lg:pl-[min(180px,12.5vw)]">
              <span
                data-headline-line
                className="js-headline-line block italic text-honey3"
              >
                {site.story.headlineItalic}
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-headline-line className="js-headline-line block">
                {site.story.headlineRest}
              </span>
            </span>
          </h2>

          <figure className="order-2 relative lg:col-start-2 lg:row-start-2 lg:self-start">
            <div
              ref={imageRef}
              data-story-image
              className="js-story-image relative aspect-[4/5] overflow-hidden lg:aspect-[592/640]"
            >
              <Image
                src={site.images.darkAmber.src}
                alt={site.images.darkAmber.alt || site.images.bottleTilt.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 592px"
                quality={90}
                loading="eager"
                className="object-cover will-change-transform"
              />
            </div>
            <div
              ref={badgeRef}
              data-edition-badge
              className="js-edition-badge absolute right-4 bottom-4 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-honey3 text-night will-change-transform lg:right-auto lg:bottom-[23px] lg:left-[-70px] lg:h-[140px] lg:w-[140px]"
            >
              <span className="font-display text-2xl italic lg:text-[34px] lg:leading-[41px]">
                {site.story.badgeEdition}
              </span>
              <Label className="mt-0.5 text-[7px] text-night lg:text-[8px] lg:leading-[10px]">
                {site.story.badgeLabel}
              </Label>
            </div>
            <figcaption>
              <Label className="mt-4 text-cream/45 lg:mt-5 lg:text-[11px] lg:leading-[13px]">{site.story.figCaption}</Label>
            </figcaption>
          </figure>

          <div className="order-3 flex flex-col lg:col-start-1 lg:row-start-2 lg:pt-[60px] lg:pb-[104px]">
            <p
              ref={bodyRef}
              data-headline-line
              className="js-headline-line max-w-lg text-[15px] leading-relaxed text-cream/70 lg:ml-[26.47%] lg:max-w-[430px] lg:text-[18px] lg:leading-[29px]"
            >
              {site.story.body}
            </p>
            <p
              ref={attributionRef}
              className="mt-6 max-w-lg font-display text-xl italic text-honey3 lg:mt-7 lg:mb-10 lg:ml-[26.47%] lg:max-w-[430px] lg:text-[22px] lg:leading-[27px]"
            >
              {site.story.attribution}
            </p>

            <div
              ref={statsRef}
              className="mt-10 grid grid-cols-3 gap-3.5 border-t border-cream/15 pt-6 sm:gap-6 lg:mt-auto lg:grid-cols-[repeat(3,minmax(0,200px))] lg:gap-10 lg:border-t-0 lg:pt-0"
            >
              {site.story.stats.map((stat) => (
                <div
                  key={stat.value}
                  data-stat={stat.value}
                  className="js-stat min-w-0"
                >
                  <div
                    data-stat-value
                    aria-label={stat.value}
                    className="font-display text-[clamp(1.75rem,8vw,2.375rem)] leading-none text-honey3 lg:text-[min(72px,5vw)]"
                  >
                    {stat.value}
                  </div>
                  <div aria-hidden className="hidden h-px w-full bg-cream/20 lg:mt-2 lg:block" />
                  <p className="mt-2 text-[11px] leading-snug text-cream/55 lg:mt-2 lg:text-[13px] lg:leading-5">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
