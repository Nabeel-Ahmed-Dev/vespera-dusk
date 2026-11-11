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
      <div className="relative mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-6 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-16">
        <a
          href="#hero"
          className="justify-self-start font-logo text-[13px] tracking-logo text-night uppercase"
        >
          {site.nav.logo}
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {site.nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[13px] font-medium text-night/80 transition-colors hover:text-night"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-self-end gap-4 lg:gap-5">
          <a
            href="#offer"
            className="text-[13px] font-medium text-night/80"
          >
            {site.nav.bag}
          </a>
          <Button
            href="#offer"
            magnetic
            className="hidden h-11 px-5 text-[11px] lg:inline-flex"
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-honey3" />
            {site.nav.shopCta}
          </Button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded="false"
            className="flex h-11 w-11 items-center justify-center text-night lg:hidden"
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
