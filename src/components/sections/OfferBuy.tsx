import Image from "next/image";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { SectionShell } from "@/components/ui/SectionShell";

const gallery = [
  site.images.bottleDark,
  site.images.goldFlat,
  site.images.labelClose,
  site.images.topdown,
] as const;

export function OfferBuy() {
  const selected = site.offer.sizes.find((size) => size.selected);

  return (
    <SectionShell
      id="offer"
      dataSection="offer-buy"
      aria-label="Offer"
      className="overflow-hidden bg-cream text-night"
    >
      <div className="mx-auto grid w-full max-w-[1440px] lg:grid-cols-2">
        <div className="relative min-h-[480px] bg-[linear-gradient(180deg,#E8C27E,#B67828)] lg:min-h-[840px]">
          <div
            aria-hidden
            className="absolute top-[18%] left-1/2 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-[#FFE9BF] opacity-80 blur-[50px]"
          />
          <div
            data-bottle="offer"
            className="js-bottle absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={site.images.bottleDark.src}
              alt={site.images.bottleDark.alt}
              width={420}
              height={630}
              className="relative z-10 h-auto w-[55%] max-w-[320px] object-contain"
            />
            <div
              data-light-sweep
              className="js-light-sweep pointer-events-none absolute inset-0"
              aria-hidden
            />
          </div>

          <Label className="absolute top-6 left-6 rounded-full bg-night px-3.5 py-2 text-cream5">
            {site.offer.batchBadge}
          </Label>
          <Label className="absolute bottom-6 left-6 text-night/70">
            {site.offer.figCaption}
          </Label>

          <div className="absolute bottom-16 left-6 hidden gap-2 sm:flex">
            {gallery.map((image, index) => (
              <div
                key={image.src}
                className={`relative h-14 w-14 overflow-hidden border ${
                  index === 0 ? "border-night" : "border-night/20"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt || site.offer.title}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center bg-cream px-10 py-16 lg:px-16 lg:py-20">
          <Label className="text-night/55">{site.offer.label}</Label>

          <h2 className="mt-5 font-display text-[clamp(3rem,5vw,4.5rem)] leading-[0.92] font-light">
            {site.offer.title}
          </h2>
          <p className="mt-3 text-[13px] text-night/70">{site.offer.subtitle}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span
              data-price
              className="js-price font-display text-5xl font-normal leading-none"
            >
              ${site.offer.price}
            </span>
            <s className="font-display text-2xl text-night/40">
              {site.offer.compareAtLabel}
            </s>
            <Label className="rounded-full bg-honey3 px-2.5 py-1.5 text-night">
              {site.offer.saveBadge}
            </Label>
          </div>

          <div className="mt-10">
            <Label className="text-night/55">{site.offer.sizeLabel}</Label>
            <div className="mt-3 flex gap-3">
              {site.offer.sizes.map((size) => (
                <button
                  key={size.id}
                  type="button"
                  data-size-option={size.id}
                  className={`js-size-option flex flex-1 flex-col gap-1 rounded-[4px] border p-3.5 text-left ${
                    size.selected
                      ? "border-night border-[1.5px] bg-cream5"
                      : "border-night/18"
                  }`}
                >
                  {size.badge ? (
                    <span className="mb-1 w-fit rounded-full bg-night px-2 py-0.5 text-[9px] font-semibold tracking-label text-cream5 uppercase">
                      {size.badge}
                    </span>
                  ) : null}
                  <span className="font-display text-2xl font-normal">
                    {size.volume}
                  </span>
                  <span className="text-sm font-bold">{size.priceLabel}</span>
                  <span className="text-[11px] text-night/55">{size.perMl}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-[4px] bg-honey2/60 p-3.5 text-[13px] leading-snug font-medium">
            <span
              aria-hidden
              className="mt-0.5 h-[18px] w-[18px] shrink-0 rounded-[3px] border-[1.5px] border-night/60"
            />
            <span>{site.offer.sample}</span>
          </div>

          <Button href="#offer" magnetic className="mt-6 h-[58px] w-full">
            {site.offer.cta}
          </Button>
          <p className="mt-3 text-center text-xs text-night/55">
            {site.offer.payments}
          </p>

          <div className="mt-8">
            <div className="mb-2 flex justify-between">
              <Label className="text-night/70">{site.offer.stockClaimed}</Label>
              <Label className="text-amber7">{site.offer.stockLeft}</Label>
            </div>
            <div
              data-stock-meter
              className="js-stock-meter h-[3px] bg-night/10"
            >
              <div
                className="h-full bg-amber6"
                style={{ width: `${site.offer.stockPercent}%` }}
              />
            </div>
          </div>

          <ul className="mt-8 space-y-2.5 border-t border-night/10 pt-6 text-[13px] font-semibold">
            {site.offer.perks.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>

          {selected ? (
            <span className="sr-only">
              Selected size {selected.volume} at {selected.priceLabel}
            </span>
          ) : null}
        </div>
      </div>
    </SectionShell>
  );
}
