import Image from "next/image";
import { site } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { SectionShell } from "@/components/ui/SectionShell";

export function Story() {
  return (
    <SectionShell
      id="story"
      dataSection="story"
      aria-label="Story"
      className="overflow-hidden bg-[linear-gradient(180deg,#A9681F_0%,#4A2D10_22%,#16110C_55%,#0E0B08_100%)] text-cream"
    >
      <div className="mx-auto w-full max-w-[1440px] px-10 py-24 lg:px-16 lg:py-32">
        <div className="mb-14 flex items-start justify-between gap-8">
          <Label className="text-cream/60">{site.story.label}</Label>
          <Label className="text-cream/50">{site.story.aside}</Label>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <h2 className="max-w-3xl font-display text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[1.02] font-light tracking-[-0.01em]">
              <span className="overflow-hidden block">
                <span
                  data-headline-line
                  className="js-headline-line block"
                >
                  {site.story.headline}
                </span>
              </span>
              <span className="overflow-hidden block">
                <span
                  data-headline-line
                  className="js-headline-line block italic text-honey3"
                >
                  {site.story.headlineItalic}
                </span>
              </span>
              <span className="overflow-hidden block">
                <span
                  data-headline-line
                  className="js-headline-line block"
                >
                  {site.story.headlineRest}
                </span>
              </span>
            </h2>

            <p
              data-headline-line
              className="js-headline-line mt-10 max-w-lg text-[15px] leading-relaxed text-cream/70 lg:ml-auto"
            >
              {site.story.body}
            </p>
            <p className="mt-6 max-w-lg font-display text-xl italic text-honey3 lg:ml-auto">
              {site.story.attribution}
            </p>

            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-cream/15 pt-8">
              {site.story.stats.map((stat) => (
                <div
                  key={stat.value}
                  data-stat={stat.value}
                  className="js-stat"
                >
                  <div className="font-display text-[clamp(2rem,3.5vw,3.25rem)] leading-none text-honey3">
                    {stat.value}
                  </div>
                  <p className="mt-3 text-[11px] leading-snug text-cream/55">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <figure className="relative lg:mt-8">
            <div
              data-story-image
              className="js-story-image relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src={site.images.darkAmber.src}
                alt={site.images.darkAmber.alt || site.images.bottleTilt.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="eager"
                className="object-cover"
              />
            </div>
            <div
              data-edition-badge
              className="js-edition-badge absolute bottom-4 left-4 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-honey3 text-night lg:left-auto lg:right-4"
            >
              <span className="font-display text-2xl italic">
                {site.story.badgeEdition}
              </span>
              <Label className="mt-0.5 text-[7px] text-night">
                {site.story.badgeLabel}
              </Label>
            </div>
            <figcaption>
              <Label className="mt-4 text-cream/45">{site.story.figCaption}</Label>
            </figcaption>
          </figure>
        </div>
      </div>
    </SectionShell>
  );
}
