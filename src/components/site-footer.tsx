import Link from "next/link";
import { siteConfig } from "@/data/profile";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[color:var(--surface)]/70 backdrop-blur">
      <div className="mx-auto grid max-w-6xl gap-9 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{siteConfig.name}</h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[color:var(--muted)]">{siteConfig.footerTagline}</p>
          <p className="mt-4 text-xs text-[color:var(--muted)]">
            &copy; {year} {siteConfig.name}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <ul className="flex flex-wrap gap-3 text-[color:var(--muted)]">
            <li>
              <a className="transition hover:text-[color:var(--foreground)]" href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a className="transition hover:text-[color:var(--foreground)]" href={siteConfig.contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <a className="transition hover:text-[color:var(--foreground)]" href={`mailto:${siteConfig.contact.email}`}>
                Email
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/" className="text-xs text-[color:var(--muted)] transition hover:text-[color:var(--foreground)]">
              Back to top
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
