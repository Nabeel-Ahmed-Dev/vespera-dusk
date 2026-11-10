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
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-10 pb-8 pt-[72px] lg:px-16">
        <div className="flex items-start justify-between pt-4">
          <Label className="text-night/60">{site.hero.metaLeft}</Label>
          <Label className="text-night/60">{site.hero.metaRight}</Label>
        </div>

        <Label className="pointer-events-none absolute top-[42%] left-6 origin-left -translate-y-1/2 -rotate-90 text-night/50 lg:left-8">
          {site.hero.metaVertical}
        </Label>

        {/* Stage: DUSK + bottle share one composition frame */}
        <div className="relative mx-auto mt-1 flex w-full flex-1 items-center justify-center">
          <div className="relative aspect-[16/9] w-full max-w-[1320px]">
            <div
              className="js-dusk-wordmark absolute inset-x-0 top-[2%] z-0 flex select-none items-start justify-center gap-[0.015em] font-display text-[clamp(9rem,31vw,29rem)] leading-[0.76] font-light tracking-[-0.045em]"
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

            <span className="pointer-events-none absolute top-[6%] right-[4%] z-10 font-display text-4xl italic text-night/70 lg:text-5xl">
              {site.hero.editionMark}
            </span>

            <div
              data-bottle="hero"
              className="js-bottle absolute top-[8%] left-1/2 z-20 w-[min(34vw,380px)] -translate-x-1/2"
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

        <div className="relative z-20 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="max-w-xl">
            <h1 className="overflow-hidden">
              <span
                data-headline-line
                className="js-headline-line block font-display text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.12] font-normal italic"
              >
                {site.hero.tagline}
              </span>
            </h1>
            <p
              data-headline-line
              className="js-headline-line mt-3 max-w-md text-sm leading-relaxed text-night/70"
            >
              {site.hero.description}
            </p>
          </div>

          <div className="flex flex-col items-start gap-3.5 lg:items-end">
            <Label className="flex items-center gap-2 text-night/80">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber7" />
              {site.hero.stock}
            </Label>
            <Button href="#offer" magnetic className="min-w-[240px]">
              {site.hero.cta}
            </Button>
            <a
              href="#story"
              className="text-[13px] font-medium text-night/75 underline decoration-night/30 underline-offset-4"
            >
              {site.hero.discover}
            </a>
            <p className="text-xs text-night/55">{site.hero.perks}</p>
          </div>
        </div>

        <Label className="mt-6 text-center text-night/45">
          {site.hero.scrollHint}
        </Label>
      </div>
    </SectionShell>
  );
}
