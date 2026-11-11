import { site } from "@/content/site";
import { Label } from "@/components/ui/Label";
import { SectionShell } from "@/components/ui/SectionShell";

export function GuaranteeFaq() {
  return (
    <SectionShell
      id="faq"
      dataSection="guarantee-faq"
      aria-label="Guarantee and FAQ"
      className="overflow-hidden"
    >
      <div className="bg-night text-cream">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-6 py-8 sm:gap-5 sm:px-8 sm:py-10 lg:flex-row lg:items-baseline lg:justify-between lg:gap-10 lg:px-16">
          {site.guarantee.items.map((item) => (
            <p
              key={item.title}
              data-guarantee-item
              className="js-guarantee-item font-display text-xl font-normal lg:text-[22px]"
            >
              {item.title}{" "}
              <span className="font-sans text-xs text-cream/55">
                — {item.detail}
              </span>
            </p>
          ))}
        </div>
      </div>

      <div className="bg-cream text-night">
        <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-16 sm:gap-12 sm:px-8 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-16 lg:py-28">
          <div>
            <Label className="text-night/55">{site.faq.label}</Label>
            <h2 className="mt-6 font-display text-[clamp(2.5rem,11vw,2.875rem)] leading-[1.02] font-light tracking-[-0.01em] lg:text-[clamp(2.5rem,5vw,4.75rem)]">
              <span data-headline-line className="js-headline-line">
                {site.faq.headline}
              </span>
              <span
                data-headline-line
                className="js-headline-line italic text-amber7"
              >
                {site.faq.headlineItalic}
              </span>
            </h2>
          </div>

          <div className="border-t border-night/15">
            {site.faq.items.map((item, index) => (
              <details
                key={item.question}
                data-faq-item
                className="js-faq-item group border-b border-night/15"
                open={index === 0}
              >
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-[clamp(1.125rem,5vw,1.375rem)] font-normal">
                    {item.question}
                  </span>
                  <span
                    data-faq-icon
                    className="js-faq-icon text-lg leading-none text-night/70 group-open:hidden"
                    aria-hidden
                  >
                    +
                  </span>
                  <span
                    data-faq-icon
                    className="js-faq-icon hidden text-lg leading-none text-night/70 group-open:inline"
                    aria-hidden
                  >
                    −
                  </span>
                </summary>
                <p className="pb-5 text-sm leading-relaxed text-night/70">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
