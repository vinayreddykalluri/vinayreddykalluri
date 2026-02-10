import fs from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/lib/mdx-components";

const BLOG_DIRECTORY = path.join(process.cwd(), "src/content/blog");

export type BlogFrontmatter = {
  title: string;
  date: string;
  description: string;
  tags?: string[];
};

export type BlogSummary = BlogFrontmatter & {
  slug: string;
};

export type BlogPost = BlogSummary & {
  content: React.ReactNode;
};

export async function getAllPostSlugs() {
  const files = await fs.readdir(BLOG_DIRECTORY);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort((a, b) => a.localeCompare(b));
}

async function readPostSource(slug: string) {
  const fullPath = path.join(BLOG_DIRECTORY, `${slug}.mdx`);

  try {
    return await fs.readFile(fullPath, "utf8");
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<BlogSummary[]> {
  const slugs = await getAllPostSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const source = await readPostSource(slug);
      if (!source) {
        return null;
      }

      const { data } = matter(source);
      const frontmatter = data as BlogFrontmatter;
      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        description: frontmatter.description,
        tags: frontmatter.tags ?? [],
      };
    }),
  );

  const summaries = posts.flatMap((post) => (post ? [post] : []));
  return summaries.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const source = await readPostSource(slug);
  if (!source) {
    notFound();
  }

  // Compile MDX with frontmatter and lightweight markdown enhancements.
  const { content, frontmatter } = await compileMDX<BlogFrontmatter>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    },
  });

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    description: frontmatter.description,
    tags: frontmatter.tags ?? [],
    content,
  };
}
