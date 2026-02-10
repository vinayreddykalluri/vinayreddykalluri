export type ExternalArticle = {
  title: string;
  description: string;
  href: string;
  publishedAt: string;
};

export const externalArticles: ExternalArticle[] = [
  {
    title: "Read my writing on Medium",
    description:
      "Long-form thoughts on engineering growth, distributed systems, and the journey of building meaningful technology.",
    href: "https://vinayreddykalluri.medium.com",
    publishedAt: "2026-01-01",
  },
];
