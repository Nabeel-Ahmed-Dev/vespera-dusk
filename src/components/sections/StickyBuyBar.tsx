import Image from "next/image";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function StickyBuyBar() {
  return (
    <div
      data-section="sticky-buy"
      className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-2 lg:hidden"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div
        className="mx-auto flex h-[68px] w-full max-w-lg items-center gap-3 rounded-full bg-night px-2.5 pl-2.5 shadow-[0_-8px_30px_rgba(14,11,8,0.25)]"
        aria-label="Sticky buy bar"
      >
        <div className="relative h-[52px] w-11 shrink-0">
          <Image
            src={site.images.bottleTilt.src}
            alt=""
            fill
            sizes="44px"
            quality={75}
            className="object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-xl leading-none font-normal text-cream">
            {site.stickyBuy.title}
          </p>
          <p className="mt-1 truncate text-[11px] text-cream/60">
            {site.stickyBuy.detail}
          </p>
        </div>
        <Button
          href="#offer"
          variant="honey"
          className="h-[52px] shrink-0 px-5 text-[12px]"
        >
          {site.stickyBuy.cta}
        </Button>
      </div>
    </div>
  );
}
