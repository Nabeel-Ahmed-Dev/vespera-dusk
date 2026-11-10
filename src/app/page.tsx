import { site } from "@/content/site";

/** Temporary style-guide preview for Step 2. Step 3 replaces this with the static desktop layout. */
const swatches = [
  { name: "night", className: "bg-night" },
  { name: "night9", className: "bg-night9" },
  { name: "amber7", className: "bg-amber7" },
  { name: "amber6", className: "bg-amber6" },
  { name: "honey4", className: "bg-honey4" },
  { name: "honey3", className: "bg-honey3" },
  { name: "honey2", className: "bg-honey2" },
  { name: "cream", className: "bg-cream" },
  { name: "cream5", className: "bg-cream5" },
  { name: "gold", className: "bg-gold" },
  { name: "amber-mid", className: "bg-amber-mid" },
] as const;

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-6 py-16 text-night">
      <header className="flex flex-col gap-3">
        <p className="font-logo text-sm tracking-logo uppercase">
          {site.nav.logo}
        </p>
        <h1 className="font-display text-4xl font-light tracking-tight">
          Step 2 — tokens, fonts, content
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-night/70">
          Temporary style-guide preview. Step 3 replaces this page with the
          static desktop layout.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <p className="text-[10px] font-semibold tracking-label uppercase text-night/60">
          Color tokens
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {swatches.map((swatch) => (
            <li key={swatch.name} className="flex flex-col gap-2">
              <div
                className={`h-16 w-full rounded-sm border border-night/10 ${swatch.className}`}
              />
              <span className="text-xs font-medium">{swatch.name}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <p className="text-[10px] font-semibold tracking-label uppercase text-night/60">
          Typography
        </p>
        <div className="flex flex-col gap-4">
          <p className="font-display text-4xl font-light">
            Cormorant Garamond — {site.hero.wordmark}
          </p>
          <p className="font-display text-3xl font-normal italic text-amber7">
            {site.hero.tagline}
          </p>
          <p className="font-sans text-base font-medium leading-relaxed">
            Manrope — {site.story.body}
          </p>
          <p className="font-logo text-sm tracking-logo uppercase">
            Montserrat — {site.footer.logo}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <p className="text-[10px] font-semibold tracking-label uppercase text-night/60">
          Label &amp; button samples
        </p>
        <p className="text-[10px] font-semibold tracking-label uppercase">
          {site.story.label}
        </p>
        <button
          type="button"
          className="inline-flex h-14 w-fit items-center justify-center rounded-full bg-night px-8 text-[13px] font-semibold tracking-button text-cream5 uppercase"
        >
          {site.hero.cta}
        </button>
      </section>
    </main>
  );
}
