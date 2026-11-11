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
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-32">
        <div className="mb-8 flex items-start justify-between gap-8 sm:mb-10 lg:mb-14">
          <Label className="text-cream/60">{site.story.label}</Label>
          <Label className="hidden text-cream/50 lg:block">{site.story.aside}</Label>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-20 lg:gap-y-10">
          <h2 className="order-1 max-w-3xl font-display text-[clamp(2.5rem,11vw,2.875rem)] leading-[1.02] font-light tracking-[-0.01em] lg:col-start-1 lg:row-start-1 lg:text-[clamp(2.5rem,5.5vw,5.5rem)]">
            <span className="block overflow-hidden">
              <span data-headline-line className="js-headline-line block">
                {site.story.headline}
              </span>
            </span>
            <span className="block overflow-hidden">
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

          <figure className="order-2 relative lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-8">
            <div
              data-story-image
              className="js-story-image relative aspect-[4/5] overflow-hidden"
            >
              <Image
                src={site.images.darkAmber.src}
                alt={site.images.darkAmber.alt || site.images.bottleTilt.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                quality={90}
                loading="eager"
                className="object-cover"
              />
            </div>
            <div
              data-edition-badge
              className="js-edition-badge absolute right-4 bottom-4 flex h-24 w-24 flex-col items-center justify-center rounded-full bg-honey3 text-night"
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

          <div className="order-3 flex flex-col lg:col-start-1 lg:row-start-2">
            <p
              data-headline-line
              className="js-headline-line max-w-lg text-[15px] leading-relaxed text-cream/70 lg:ml-auto"
            >
              {site.story.body}
            </p>
            <p className="mt-6 max-w-lg font-display text-xl italic text-honey3 lg:ml-auto">
              {site.story.attribution}
            </p>

            <div className="mt-10 grid grid-cols-3 gap-3.5 border-t border-cream/15 pt-6 sm:gap-6 lg:mt-16 lg:pt-8">
              {site.story.stats.map((stat) => (
                <div
                  key={stat.value}
                  data-stat={stat.value}
                  className="js-stat min-w-0"
                >
                  <div className="font-display text-[clamp(1.75rem,8vw,2.375rem)] leading-none text-honey3 lg:text-[clamp(2rem,3.5vw,3.25rem)]">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-[11px] leading-snug text-cream/55 lg:mt-3">
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
