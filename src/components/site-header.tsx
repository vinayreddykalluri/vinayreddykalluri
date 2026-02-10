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
    <header className="sticky top-0 z-40 border-b border-[var(--border)]/70 bg-[color:var(--surface)]/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#7400B8,#5E60CE)] text-sm font-bold text-white shadow-[0_10px_22px_rgba(94,96,206,0.35)]">
            {siteConfig.shortName}
          </span>
          <span className="text-sm font-semibold tracking-tight transition group-hover:text-[color:var(--accent)]">
            {siteConfig.name}
          </span>
        </Link>

        <button
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="glass-nav inline-flex rounded-xl px-3.5 py-2 text-sm font-medium text-[color:var(--foreground)] md:hidden"
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
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      active
                        ? "bg-[linear-gradient(135deg,#7400B8,#5E60CE)] font-semibold text-white shadow-[0_10px_20px_rgba(94,96,206,0.32)]"
                        : "text-[color:var(--muted)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]"
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
        className={`${menuOpen ? "block" : "hidden"} border-t border-[var(--border)] bg-[color:var(--surface-strong)]/92 md:hidden`}
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
          {navLinks.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-xl px-3 py-2 text-sm transition ${
                    active
                      ? "bg-[linear-gradient(135deg,#7400B8,#5E60CE)] font-semibold text-white"
                      : "text-[color:var(--muted)] hover:bg-[color:var(--accent-soft)] hover:text-[color:var(--foreground)]"
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
