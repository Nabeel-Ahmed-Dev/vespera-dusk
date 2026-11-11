import Image from "next/image";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { SectionShell } from "@/components/ui/SectionShell";

export function Hero() {
  const letters = site.hero.wordmark.split("");

  return (
    <SectionShell
      id="hero"
      dataSection="hero"
      aria-label="Hero"
      className="min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#F6DCA8_0%,#D9A355_58%,#A9681F_100%)] text-night"
    >
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-6 pb-10 pt-[72px] sm:px-8 lg:min-h-screen lg:px-16 lg:pb-8">
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
              className="js-dusk-wordmark absolute inset-x-0 top-0 z-0 flex select-none items-start justify-center gap-[0.015em] font-display text-[clamp(5.5rem,33.8vw,8.25rem)] leading-[0.85] font-light tracking-[-0.02em] lg:top-[2%] lg:text-[clamp(9rem,31vw,29rem)] lg:leading-[0.76] lg:tracking-[-0.045em]"
              aria-label={site.hero.wordmark}
            >
              {letters.map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  data-dusk-letter={letter}
                  className="js-dusk-letter inline-block"
                >
                  {letter}
                </span>
              ))}
            </div>

            <span className="pointer-events-none absolute top-[1%] right-0 z-10 font-display text-[1.25rem] italic text-night/70 sm:text-2xl lg:top-[6%] lg:right-[4%] lg:text-4xl xl:text-5xl">
              {site.hero.editionMark}
            </span>

            <div
              data-bottle="hero"
              className="js-bottle absolute top-[9%] left-1/2 z-20 w-[88%] -translate-x-1/2 sm:w-[80%] sm:max-w-[380px] lg:top-[8%] lg:w-[min(34vw,380px)] lg:max-w-none"
            >
              <div
                aria-hidden
                className="absolute bottom-[2%] left-1/2 h-8 w-[55%] -translate-x-1/2 rounded-full bg-night/30 blur-xl"
              />
              <Image
                src={site.images.bottleTilt.src}
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
              />
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
              className="order-3 hidden text-[13px] font-medium text-night/75 underline decoration-night/30 underline-offset-4 sm:inline"
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
