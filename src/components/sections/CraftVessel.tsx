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
            data-craft-image
            className="js-craft-image object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-night/40 to-transparent lg:hidden" />
        </div>

        <div className="flex flex-col justify-center px-10 py-20 lg:px-16 lg:py-28">
          <Label className="text-cream/60">{site.craft.label}</Label>
          <h2 className="mt-6 max-w-xl font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.02] font-light tracking-[-0.01em]">
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

          <div className="mt-12 flex flex-col">
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
