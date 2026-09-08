import type { Metadata } from "next";
import { FirebaseAnalytics } from "@/components/firebase-analytics";
import { Bricolage_Grotesque, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteMetadata } from "@/lib/seo";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

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
        className={`${bricolage.variable} ${newsreader.variable} ${ibmPlexMono.variable} min-h-screen antialiased`}
      >
        <FirebaseAnalytics />
        {/* Shared shell keeps every section one click away. */}
        <div className="site-bg min-h-screen">
          <SiteHeader />
          <main className="w-full">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
