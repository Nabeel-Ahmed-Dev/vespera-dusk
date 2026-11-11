import Image from "next/image";
import { site } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { SectionShell } from "@/components/ui/SectionShell";

export function CraftVessel() {
  return (
    <SectionShell
      id="vessel"
      dataSection="craft-vessel"
      aria-label="The vessel"
      className="overflow-hidden bg-night text-cream"
    >
      <div className="mx-auto grid w-full max-w-[1440px] lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-[720px]">
          <Image
            src={site.images.labelClose.src}
            alt={site.images.labelClose.alt || site.brand.product}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
            priority
            data-craft-image
            className="js-craft-image object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent lg:hidden" />

          <div
            data-craft-inset
            className="js-craft-inset absolute right-6 bottom-6 z-10 hidden h-[200px] w-[150px] overflow-hidden border border-cream/20 shadow-[0_20px_40px_rgba(0,0,0,0.35)] lg:right-10 lg:bottom-10 lg:block lg:h-[240px] lg:w-[180px]"
          >
            <Image
              src={site.images.darkAmber.src}
              alt={site.images.darkAmber.alt || site.brand.product}
              fill
              sizes="180px"
              quality={75}
              loading="eager"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-28">
          <Label className="text-cream/60">{site.craft.label}</Label>
          <h2 className="mt-6 max-w-xl font-display text-[clamp(2.5rem,11vw,2.875rem)] leading-[1.02] font-light tracking-[-0.01em] lg:text-[clamp(2.5rem,4.5vw,4.5rem)]">
            <span data-headline-line className="js-headline-line">
              {site.craft.headline}
            </span>
            <span
              data-headline-line
              className="js-headline-line italic text-honey3"
            >
              {site.craft.headlineItalic}
            </span>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/70">
            {site.craft.body}
          </p>

          <div className="mt-10 flex flex-col sm:mt-12">
            {site.craft.details.map((detail) => (
              <div
                key={detail.number}
                data-craft-row
                className="js-craft-row flex gap-4 border-t border-cream/15 py-5"
              >
                <span
                  data-craft-divider
                  className="js-craft-divider font-display text-[22px] italic text-honey3"
                >
                  {detail.number}
                </span>
                <div>
                  <p className="text-sm font-semibold">{detail.title}</p>
                  <p className="mt-1 text-xs text-cream/55">
                    {detail.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
