# Vinay Reddy Kalluri - Personal Website

Frontend-only personal website built with:

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Static export (`output: "export"`)
- MDX blog support

## Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Build and Preview Static Output

```bash
npm run build
npm run start
```

Build output is generated in `out/`.

## SEO Setup

Set the production site URL before building/deploying:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

This is used for canonical URLs, sitemap URLs, and structured metadata.

## Structure

```text
src/
  app/
    page.tsx                 # Home
    about/page.tsx           # About
    career/page.tsx          # Career
    projects/page.tsx        # Projects
    blog/page.tsx            # Blog listing
    blog/[slug]/page.tsx     # Blog post page
    timeline/page.tsx        # Timeline
    contact/page.tsx         # Contact
  components/
    site-header.tsx
    site-footer.tsx
    experience-card.tsx
    project-card.tsx
    reveal-on-scroll.tsx
  content/blog/
    *.mdx                    # MDX posts with frontmatter
  data/
    profile.ts
    experience.ts
    projects.ts
    timeline.ts
    blog.ts
  lib/
    blog.ts                  # MDX loader + frontmatter parser
    format.ts
    mdx-components.tsx
```

## Content Updates

- Profile and contact: `src/data/profile.ts`
- Career: `src/data/experience.ts`
- Projects: `src/data/projects.ts`
- Timeline events: `src/data/timeline.ts`
- External blog links: `src/data/blog.ts`
- MDX posts: `src/content/blog/*.mdx`

## Deploy

Deploy `out/` to Vercel static hosting, Netlify, Cloudflare Pages, GitHub Pages, or S3 + CloudFront.
