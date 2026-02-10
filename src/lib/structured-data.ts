import { siteConfig } from "@/data/profile";
import { absoluteUrl } from "@/lib/seo";

export function getPersonAndWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: siteConfig.name,
        jobTitle: siteConfig.role,
        url: absoluteUrl("/"),
        email: siteConfig.contact.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Atlanta",
          addressRegion: "Georgia",
          addressCountry: "US",
        },
        sameAs: [siteConfig.contact.linkedin, siteConfig.contact.github, siteConfig.contact.medium],
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: siteConfig.name,
        description: siteConfig.summary,
        inLanguage: "en-US",
      },
    ],
  };
}

type BlogPostingOptions = {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  tags: string[];
};

export function getBlogPostingJsonLd({
  title,
  description,
  slug,
  publishedTime,
  tags,
}: BlogPostingOptions) {
  const postUrl = absoluteUrl(`/blog/${slug}`);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    datePublished: publishedTime,
    dateModified: publishedTime,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
    mainEntityOfPage: postUrl,
    url: postUrl,
    image: absoluteUrl("/og/cover.svg"),
    keywords: tags,
    inLanguage: "en-US",
  };
}
