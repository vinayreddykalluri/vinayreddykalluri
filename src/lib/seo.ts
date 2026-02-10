import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/data/profile";

export const DEFAULT_OG_IMAGE_PATH = "/og/cover.svg";

export function normalizePath(path: string) {
  if (path === "/") {
    return "/";
  }

  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return `/${trimmed}/`;
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${normalizePath(path)}`;
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  tags = [],
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const normalizedPath = normalizePath(path);
  const pageTitle =
    title === "Home" ? siteConfig.name : `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: normalizedPath,
      siteName: siteConfig.name,
      locale: "en_US",
      type,
      images: [
        {
          url: DEFAULT_OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} website preview`,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags.length ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [DEFAULT_OG_IMAGE_PATH],
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
            nocache: true,
            googleBot: {
              index: false,
              follow: false,
              noimageindex: true,
            },
          },
        }
      : {}),
  };
}

const siteTitle = `${siteConfig.name} | ${siteConfig.role}`;

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.summary,
  keywords: [
    "Senior Java Backend Engineer",
    "Java",
    "Spring Boot",
    "Kafka",
    "AWS",
    "Distributed Systems",
    "Microservices",
    "Atlanta Engineer",
    "EB2 NIW",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: siteTitle,
    description: siteConfig.summary,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
    url: "/",
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} website preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteConfig.summary,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};
