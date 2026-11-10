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
      <div className="mx-auto w-full max-w-[1440px] px-10 py-24 lg:px-16 lg:py-28">
        <Label className="text-night/55">{site.socialProof.label}</Label>

        <blockquote className="mt-8 max-w-4xl">
          <p
            data-headline-line
            className="js-headline-line font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.04] font-normal italic tracking-[-0.01em]"
          >
            {site.socialProof.quote}
          </p>
          <Label className="mt-6 text-amber7">
            {site.socialProof.quoteAttribution}
          </Label>
        </blockquote>

        <div className="relative mt-14 overflow-hidden border-y border-night/15 py-6">
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

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.7fr_1fr_1fr]">
          <div
            data-review-card="rating"
            className="js-review-card flex flex-col justify-end border border-night/10 bg-cream5 p-8"
          >
            <div className="font-display text-[88px] leading-[0.85]">
              {site.socialProof.rating}
            </div>
            <div className="mt-3">
              <Stars count={5} />
              <p className="mt-2 text-[13px] text-night/65">
                {site.socialProof.ratingLabel}
              </p>
            </div>
          </div>

          {site.socialProof.reviews.map((review) => (
            <article
              key={review.author}
              data-review-card
              className="js-review-card flex flex-col gap-4 border border-night/10 bg-cream5 p-8"
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
