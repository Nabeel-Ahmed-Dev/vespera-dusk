import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { SectionShell } from "@/components/ui/SectionShell";

export function Nav() {
  return (
    <SectionShell
      as="nav"
      dataSection="nav"
      aria-label={site.brand.name}
      className="absolute inset-x-0 top-0 z-30 bg-transparent"
    >
      <div className="relative mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:grid lg:h-auto lg:grid-cols-[calc(100%*426/1344)_auto_1fr] lg:px-12 lg:pt-7">
        <a
          href="#hero"
          className="inline-flex min-h-11 items-center justify-self-start font-logo text-[13px] tracking-logo uppercase text-[var(--sunset-fg,#0e0b08)] lg:min-h-0 lg:text-[16px] lg:leading-4"
        >
          {site.nav.logo}
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {site.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[13px] font-medium transition-colors text-[color-mix(in_srgb,var(--sunset-fg,#0e0b08)_80%,transparent)] hover:text-[var(--sunset-fg,#0e0b08)]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-self-end gap-4 lg:gap-7">
          <a
            href="#offer"
            className="inline-flex min-h-11 items-center text-[13px] font-medium text-[color-mix(in_srgb,var(--sunset-fg,#0e0b08)_80%,transparent)] lg:min-h-0"
          >
            {site.nav.bag}
          </a>
          <div className="hidden lg:block">
            <Button href="#offer" magnetic className="lg:h-[39px] lg:w-[200px] lg:px-0">
              <span className="mr-2.5 inline-block h-1.5 w-1.5 rounded-full bg-honey4" />
              {site.nav.shopCta}
            </Button>
          </div>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded="false"
            className="flex h-11 w-11 shrink-0 items-center justify-center text-[var(--sunset-fg,#0e0b08)] lg:hidden"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden
            >
              <path d="M4 9h16" />
              <path d="M4 15h16" />
            </svg>
          </button>
        </div>
      </div>
    </SectionShell>
  );
}
