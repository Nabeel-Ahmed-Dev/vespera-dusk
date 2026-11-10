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
      <div className="relative mx-auto grid h-[72px] w-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-10 lg:px-16">
        <a
          href="#hero"
          className="justify-self-start font-logo text-[13px] tracking-logo text-night uppercase"
        >
          {site.nav.logo}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
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

        <div className="flex items-center justify-self-end gap-5">
          <a
            href="#offer"
            className="hidden text-[13px] font-medium text-night/80 sm:inline"
          >
            {site.nav.bag}
          </a>
          <Button href="#offer" magnetic className="h-11 px-5 text-[11px]">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-honey3" />
            {site.nav.shopCta}
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
