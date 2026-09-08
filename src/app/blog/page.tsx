import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
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
    <div className="shell py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd) }}
      />
      <PageHeader
        kicker="Writing"
        title="Backend engineering notes."
        lede="Architecture reasoning and practical lessons that teams can apply in production, plus external writing on Medium."
      />

      <Reveal delay={0.04}>
        <section className="mt-12">
          <div
            className={`grid gap-px bg-[color:var(--border)] ${
              posts.length > 1 ? "md:grid-cols-2" : ""
            }`}
          >
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={0.04 * (index % 4)}>
                <article className="h-full bg-[color:var(--background)] p-7 transition-colors hover:bg-[color:var(--surface)]">
                  <p className="data-label text-[color:var(--faint)]">
                    {formatDate(post.date)}
                  </p>
                  <h3 className="mt-3 text-2xl">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="transition hover:text-[color:var(--accent)]"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 leading-relaxed text-[color:var(--muted)]">
                    {post.description}
                  </p>
                  {post.tags && post.tags.length > 0 ? (
                    <ul className="signal-track mt-5">
                      {post.tags.map((tag) => (
                        <li key={tag} className="signal-pill">
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
        <section className="mt-16 border-t border-[var(--border)] pt-12">
          <p className="kicker">External writing</p>
          <div
            className={`mt-6 grid gap-px bg-[color:var(--border)] ${
              externalArticles.length > 1 ? "md:grid-cols-2" : ""
            }`}
          >
            {externalArticles.map((article, index) => (
              <Reveal key={article.href} delay={0.04 * (index % 4)}>
                <article className="h-full bg-[color:var(--background)] p-7">
                  <p className="data-label text-[color:var(--faint)]">
                    {formatDate(article.publishedAt)}
                  </p>
                  <h3 className="mt-3 text-2xl">{article.title}</h3>
                  <p className="mt-4 leading-relaxed text-[color:var(--muted)]">
                    {article.description}
                  </p>
                  <a
                    className="spark-link mt-6 px-5 py-2.5 text-sm"
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
