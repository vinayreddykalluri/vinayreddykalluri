import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { externalArticles } from "@/data/blog";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Technical notes, architecture writing, and engineering insights by Vinay Reddy Kalluri.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();
  const blogListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(`/blog/${post.slug}`),
      name: post.title,
    })),
  };

  return (
    <div className="space-y-10 md:space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />
      <Reveal>
        <header className="max-w-3xl space-y-4">
          <p className="kicker">Blog</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Thoughtful backend engineering notes
          </h1>
          <p className="text-base leading-7 text-[color:var(--muted)]">
            Static MDX posts for architecture ideas and practical lessons, plus
            external writing on Medium.
          </p>
        </header>
      </Reveal>

      <Reveal delay={0.04}>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">MDX Articles</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={0.04 * (index % 4)}>
                <article className="surface-card p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--muted)]">
                    {formatDate(post.date)}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition hover:text-[color:var(--accent)]"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                    {post.description}
                  </p>
                  {post.tags && post.tags.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li
                          key={tag}
                          className="soft-chip rounded-[3px] px-3 py-1 text-xs"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.08}>
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">External Writing</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {externalArticles.map((article, index) => (
              <Reveal key={article.href} delay={0.04 * (index % 4)}>
                <article className="surface-card p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--muted)]">
                    {formatDate(article.publishedAt)}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{article.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">
                    {article.description}
                  </p>
                  <a
                    className="spark-link mt-5 inline-flex px-4 py-2 text-xs font-semibold"
                    href={article.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Visit Medium
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}
