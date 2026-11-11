import { site } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { SectionShell } from "@/components/ui/SectionShell";

function Stars({ count }: { count: number }) {
  return (
    <span data-stars className="js-stars tracking-[2px] text-amber6">
      {"★".repeat(count)}
    </span>
  );
}

export function SocialProof() {
  const marqueeItems = [...site.socialProof.press, ...site.socialProof.press];

  return (
    <SectionShell
      id="reviews"
      dataSection="social-proof"
      aria-label="Social proof"
      className="overflow-hidden bg-cream text-night"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-28">
        <Label className="text-night/55">{site.socialProof.label}</Label>

        <blockquote className="mt-6 max-w-4xl sm:mt-8">
          <p
            data-headline-line
            className="js-headline-line font-display text-[clamp(2rem,9vw,2.625rem)] leading-[1.04] font-normal italic tracking-[-0.01em] lg:text-[clamp(2rem,4.5vw,3.75rem)]"
          >
            {site.socialProof.quote}
          </p>
          <Label className="mt-5 text-amber7 sm:mt-6">
            {site.socialProof.quoteAttribution}
          </Label>
        </blockquote>

        {/* Mobile / tablet: single fitting row. Desktop: marquee track. */}
        <div className="mt-10 flex items-center justify-between gap-3 border-y border-night/15 py-5 opacity-55 sm:mt-12 sm:gap-4 sm:py-6 lg:hidden">
          {site.socialProof.press.map((logo) => (
            <span
              key={logo.name}
              className="font-logo shrink min-w-0 text-[clamp(0.7rem,3.4vw,1.125rem)] tracking-[0.08em] uppercase sm:tracking-[0.12em]"
            >
              {logo.name}
            </span>
          ))}
        </div>

        <div className="relative mt-14 hidden overflow-hidden border-y border-night/15 py-6 lg:block">
          <div
            data-marquee-track
            className="js-marquee-track flex w-max items-center gap-16 opacity-55"
          >
            {marqueeItems.map((logo, index) => (
              <span
                key={`${logo.name}-${index}`}
                className="font-logo shrink-0 text-xl tracking-[0.18em] uppercase"
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 lg:mt-14 lg:grid-cols-[0.7fr_1fr_1fr]">
          <div
            data-review-card="rating"
            className="js-review-card flex flex-row items-end gap-4 border border-night/10 bg-cream5 p-6 sm:p-8 lg:flex-col lg:justify-end lg:gap-0"
          >
            <div className="font-display text-[72px] leading-[0.85] sm:text-[88px]">
              {site.socialProof.rating}
            </div>
            <div className="pb-1 lg:mt-3 lg:pb-0">
              <Stars count={5} />
              <p className="mt-1 text-[13px] leading-snug text-night/65 lg:mt-2">
                {site.socialProof.ratingLabel}
              </p>
            </div>
          </div>

          {site.socialProof.reviews.map((review) => (
            <article
              key={review.author}
              data-review-card
              className="js-review-card flex w-full flex-col gap-4 border border-night/10 bg-cream5 p-6 sm:p-8"
            >
              <Stars count={review.stars} />
              <p className="font-display text-[22px] leading-snug font-normal italic">
                {review.quote}
              </p>
              <p className="mt-auto text-xs">
                <span className="font-semibold">{review.author}</span>
                <span className="text-night/55"> · {review.meta}</span>
              </p>
            </article>
          ))}
        </div>

        <Label className="mt-8 text-night/40">{site.socialProof.disclaimer}</Label>
      </div>
    </SectionShell>
  );
}
