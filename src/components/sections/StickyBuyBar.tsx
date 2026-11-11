"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function StickyBuyBar() {
  // Hidden while the hero (which has its own Add to bag button) is on screen.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      data-section="sticky-buy"
      data-visible={visible ? "true" : "false"}
      aria-hidden={!visible}
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 pt-2 transition-[translate,opacity] duration-500 ease-out motion-reduce:transition-none lg:hidden ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[130%] opacity-0"}`}
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
