"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/data/profile";

function isActivePath(currentPath: string, href: string) {
  if (href === "/") {
    return currentPath === "/";
  }

  return currentPath === href || currentPath.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:var(--background)]/92">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-[3px] bg-[color:var(--accent)] font-mono text-[11px] font-semibold tracking-[0.08em] text-white transition group-hover:bg-[color:var(--accent-strong)]">
            {siteConfig.shortName}
          </span>
          <span className="text-sm font-semibold tracking-tight transition group-hover:text-[color:var(--accent)]">
            {siteConfig.name}
          </span>
        </Link>

        <button
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="glass-nav inline-flex rounded-[3px] px-3.5 py-2 font-mono text-xs uppercase tracking-[0.1em] text-[color:var(--foreground)] md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative rounded-[3px] px-3 py-2 text-sm transition after:absolute after:inset-x-3 after:bottom-1 after:h-px after:transition ${
                      active
                        ? "font-semibold text-[color:var(--foreground)] after:bg-[color:var(--accent)]"
                        : "text-[color:var(--muted)] after:bg-transparent hover:text-[color:var(--foreground)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={`${menuOpen ? "block motion-safe:animate-[fade-up_260ms_ease-out]" : "hidden"} border-t border-[var(--border)] bg-[color:var(--surface-strong)]/92 md:hidden`}
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
          {navLinks.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-[3px] border-l-2 px-3 py-2 text-sm transition ${
                    active
                      ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] font-semibold text-[color:var(--foreground)]"
                      : "border-transparent text-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
