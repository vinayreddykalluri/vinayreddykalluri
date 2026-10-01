import type { Metadata } from "next";
import { FirebaseAnalytics } from "@/components/firebase-analytics";
import { Chivo, Fraunces } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteMetadata } from "@/lib/seo";
import "./globals.css";

// High-contrast display serif for the oversized headlines, paired with a
// warm grotesque for everything that has to be read at body size.
/*
 * Fraunces was requested with its SOFT, WONK and opsz axes. Nothing in the CSS
 * ever sets font-variation-settings, so all three sat at their defaults while
 * the extra axis data shipped anyway — 118KB of the homepage's 180KB of fonts,
 * paid for letterforms nobody ever moved. Dropping them renders identically.
 */
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const chivo = Chivo({
  variable: "--font-body",
  subsets: ["latin"],
  // 500 was carrying three elements on the whole site; they moved to 600.
  weight: ["400", "600", "700"],
  display: "swap",
});

/*
 * IBM Plex Mono is no longer downloaded. It was the voice of every eyebrow,
 * date and chip on the site — 104 elements on the homepage alone, set at 11px
 * in tracked-out capitals, which is the slowest text a person can scan. Those
 * now use the text face. The handful of places that are genuinely code — commit
 * SHAs, repository names — use the system monospace stack instead, which costs
 * nothing to download and is what code is meant to look like on each platform.
 */

const themeInitScript = `
(() => {
  try {
    const key = "vrk-theme";
    const stored = localStorage.getItem(key);
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = stored || (systemDark ? "dark" : "light");
    document.documentElement.dataset.theme = theme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export const metadata: Metadata = {
  ...siteMetadata,
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={`${fraunces.variable} ${chivo.variable} min-h-screen antialiased`}
      >
        <FirebaseAnalytics />
        {/* Shared shell keeps every section one click away. */}
        <div className="site-bg min-h-screen">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-[color:var(--accent)] focus:bg-[color:var(--background)] focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="w-full">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
