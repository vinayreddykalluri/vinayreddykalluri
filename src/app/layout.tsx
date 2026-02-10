import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig, siteUrl } from "@/data/profile";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const title = `${siteConfig.name} | ${siteConfig.role}`;
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
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.summary,
  keywords: [
    "Senior Java Backend Engineer",
    "Spring Boot",
    "Kafka",
    "AWS",
    "Distributed Systems",
    "Microservices",
    "Atlanta Engineer",
    "EB2 NIW",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description: siteConfig.summary,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.summary,
  },
  category: "technology",
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
      <body className={`${manrope.variable} ${ibmPlexMono.variable} min-h-screen antialiased`}>
        {/* Shared shell keeps every section one click away. */}
        <div className="site-bg min-h-screen">
          <SiteHeader />
          <main className="mx-auto max-w-6xl px-4 pb-24 pt-14 sm:px-6 lg:px-8">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
