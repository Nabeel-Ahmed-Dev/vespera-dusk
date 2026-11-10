import Image from "next/image";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { SectionShell } from "@/components/ui/SectionShell";

function staggerLetters(text: string, keyPrefix: string) {
  return text.split("").map((char, index) => (
    <span
      key={`${keyPrefix}-${index}`}
      data-cta-letter
      className="js-cta-letter inline-block"
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export function FinalCtaFooter() {
  return (
    <SectionShell
      id="footer"
      as="footer"
      dataSection="final-cta-footer"
      aria-label="Final call to action and footer"
      className="overflow-hidden bg-night text-cream"
    >
      <div className="relative min-h-[620px] overflow-hidden">
        <Image
          src={site.images.darkAmber.src}
          alt=""
          fill
          sizes="100vw"
          loading="eager"
          data-final-bg
          className="js-final-bg object-cover"
        />
        <div
          data-final-vignette
          className="js-final-vignette absolute inset-0 bg-[linear-gradient(180deg,rgba(14,11,8,0.9),rgba(14,11,8,0.45)_45%,#0E0B08)]"
        />

        <div className="relative z-10 mx-auto flex min-h-[620px] w-full max-w-[1440px] flex-col items-center justify-center px-10 py-24 text-center lg:px-16">
          <Label className="text-honey3">{site.finalCta.label}</Label>
          <h2 className="mt-8 font-display text-[clamp(4rem,10vw,7.5rem)] leading-[0.9] font-light tracking-[-0.02em]">
            <span className="block">
              {staggerLetters(site.finalCta.headline, "wear")}
            </span>
            <span className="block italic text-honey3">
              {staggerLetters(site.finalCta.headlineItalic, "hour")}
            </span>
          </h2>
          <div className="mt-10 flex w-full max-w-md flex-col gap-3">
            <Button href="#offer" variant="honey" magnetic className="w-full">
              {site.finalCta.primaryCta}
            </Button>
            <Button
              href="#offer"
              variant="outline-light"
              magnetic
              className="w-full"
            >
              {site.finalCta.secondaryCta}
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1440px] border-t border-cream/15 px-10 py-12 lg:px-16">
        <h3 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-light">
          {site.footer.newsletterTitle}
        </h3>
        <p className="mt-3 max-w-md text-sm text-cream/60">
          {site.footer.newsletterBody}
        </p>
        <form className="mt-6 flex max-w-lg items-center justify-between border-b border-cream/50 py-3.5">
          <label className="sr-only" htmlFor="night-list-email">
            {site.footer.emailPlaceholder}
          </label>
          <input
            id="night-list-email"
            type="email"
            name="email"
            placeholder={site.footer.emailPlaceholder}
            className="w-full bg-transparent text-sm text-cream outline-none placeholder:text-cream/45"
          />
          <button
            type="submit"
            className="shrink-0 text-[10px] font-semibold tracking-label text-honey3 uppercase"
          >
            {site.footer.subscribe}
          </button>
        </form>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-10 lg:px-16">
        <div className="flex flex-wrap gap-12 text-sm text-cream/80">
          {site.footer.linkGroups.map((group, groupIndex) => (
            <ul key={groupIndex} className="flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className="relative mt-16 w-full overflow-hidden">
        <svg
          data-footer-wordmark
          className="js-footer-wordmark block w-full translate-y-[18%] text-honey3/15"
          viewBox="0 0 100 16"
          preserveAspectRatio="xMidYMax meet"
          role="img"
          aria-label={site.footer.logo}
        >
          <text
            x="0"
            y="14.2"
            textLength="100"
            lengthAdjust="spacingAndGlyphs"
            fill="currentColor"
            style={{
              fontFamily: "var(--font-logo)",
              fontSize: "16px",
              fontWeight: 600,
              letterSpacing: "0",
              textTransform: "uppercase",
            }}
          >
            {site.footer.logo}
          </text>
        </svg>
        <Label className="pointer-events-none absolute inset-x-0 bottom-5 z-10 px-10 text-cream/40 lg:px-16">
          {site.footer.copyright}
        </Label>
      </div>
    </SectionShell>
  );
}
