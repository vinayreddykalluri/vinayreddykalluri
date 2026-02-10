import type { Metadata } from "next";
import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { getBlogPostingJsonLd } from "@/lib/structured-data";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags ?? [],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const postJsonLd = getBlogPostingJsonLd({
    title: post.title,
    description: post.description,
    slug,
    publishedTime: post.date,
    tags: post.tags ?? [],
  });

  return (
    <article className="surface-panel mx-auto max-w-3xl space-y-7 p-7 md:p-11">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd) }}
      />
      <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-[0.08em] text-[color:var(--muted)]">
          {formatDate(post.date)}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {post.title}
        </h1>
        <p className="text-base text-[color:var(--muted)]">
          {post.description}
        </p>
        {post.tags && post.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="soft-chip rounded-full px-3 py-1 text-xs"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mdx-content">{post.content}</div>

      <Link
        href="/blog"
        className="inline-flex rounded-full border border-[var(--border)] bg-[color:var(--surface-strong)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
      >
        Back to Blog
      </Link>
    </article>
  );
}
