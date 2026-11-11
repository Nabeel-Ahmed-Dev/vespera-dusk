import { site } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { SectionShell } from "@/components/ui/SectionShell";

export function ScentPyramid() {
  return (
    <SectionShell
      id="notes"
      dataSection="scent-pyramid"
      aria-label="Scent pyramid"
      className="overflow-hidden bg-night text-cream"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-32">
        <Label className="text-cream/60">{site.scentPyramid.label}</Label>

        <div className="mt-7 grid gap-10 sm:mt-8 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-24">
          <div>
            <h2 className="font-display text-[clamp(2.5rem,11vw,2.875rem)] leading-[1.02] font-light tracking-[-0.01em] lg:text-[clamp(2.5rem,5vw,4.75rem)]">
              <span data-headline-line className="js-headline-line">
                {site.scentPyramid.headline}
              </span>
              <span
                data-headline-line
                className="js-headline-line italic text-honey3"
              >
                {site.scentPyramid.headlineItalic}
              </span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-cream/70">
              {site.scentPyramid.body}
            </p>

            <svg
              viewBox="0 0 520 460"
              className="mt-10 w-full max-w-[420px] sm:mt-12"
              aria-hidden
            >
              <defs>
                <linearGradient id="pyramid-top" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FBE7C0" />
                  <stop offset="1" stopColor="#EDC98A" />
                </linearGradient>
                <linearGradient id="pyramid-heart" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#E0AE5C" />
                  <stop offset="1" stopColor="#B9782A" />
                </linearGradient>
                <linearGradient id="pyramid-base" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8A5418" />
                  <stop offset="1" stopColor="#2A1A0B" />
                </linearGradient>
              </defs>
              <g
                data-pyramid-band="top"
                className="js-pyramid-band origin-bottom"
                style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
              >
                <polygon
                  points="260,0 344.8,150 175.2,150"
                  fill="url(#pyramid-top)"
                />
              </g>
              <g
                data-pyramid-band="heart"
                className="js-pyramid-band origin-bottom"
                style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
              >
                <polygon
                  points="173,156 347,156 432.9,306 87.1,306"
                  fill="url(#pyramid-heart)"
                />
              </g>
              <g
                data-pyramid-band="base"
                className="js-pyramid-band origin-bottom"
                style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
              >
                <polygon
                  points="84.8,312 435.2,312 520,460 0,460"
                  fill="url(#pyramid-base)"
                />
              </g>
            </svg>
          </div>

          <div className="flex flex-col">
            {site.scentPyramid.tiers.map((tier) => (
              <div
                key={tier.phase}
                data-pyramid-row={tier.phase.toLowerCase()}
                className="js-pyramid-row border-t border-cream/15 py-7"
              >
                <Label className="text-cream/50">
                  {tier.roman} · {tier.phase} — {tier.timing}
                </Label>
                <h3 className="mt-3 font-display text-[clamp(1.75rem,8vw,2.125rem)] font-light lg:text-[clamp(1.75rem,3vw,2.25rem)]">
                  {tier.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tier.notes.map((note) => (
                    <span
                      key={note}
                      data-note-pill
                      className="js-note-pill inline-flex min-h-11 items-center rounded-full border border-cream/30 px-3.5 py-1.5 text-[13px] font-medium text-cream/90"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <Label className="mt-6 text-cream/35">
              {site.scentPyramid.disclaimer}
            </Label>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
