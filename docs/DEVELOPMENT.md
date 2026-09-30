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

Hosting is Cloudflare Workers (static assets). The domain is registered at
Porkbun, with DNS served by Cloudflare.

`next build` writes the static export to `out/`, and `wrangler.jsonc` points a
Worker at that directory. No server code runs — the Worker only serves assets.

```bash
npm run build      # writes out/
npm run preview    # serve the built output locally via wrangler
npm run deploy     # build, then publish to Cloudflare
```

First-time setup on a new machine:

```bash
npx wrangler login
```

### Routing notes

- `next.config.ts` sets `trailingSlash: true`, so pages emit as
  `out/about/index.html`. `html_handling: "auto-trailing-slash"` serves those
  at `/about/`.
- `not_found_handling: "404-page"` serves the exported `out/404.html`. On
  Workers this must be set explicitly — unlike Pages, it is not inferred.

### DNS

`vinayreddykalluri.com` stays registered at Porkbun; only the nameservers point
to Cloudflare. A Workers Custom Domain then requires no manual DNS record —
Cloudflare creates the record and issues the certificate.

### Nightly rebuild

`.github/workflows/nightly.yml` rebuilds and redeploys at 07:00 UTC daily, and
can be run by hand from the Actions tab.

The reason is the static export. Every GitHub figure in the HTML — commit
counts, "last pushed", upstream contribution dates — is fixed at build time.
The homepage swaps in live data shortly after load, but the first paint still
shows the snapshot, so without a nightly build that first frame drifts further
from the truth every day.

The workflow needs one repository secret:

| Secret | What it is |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with permission to edit Workers |
| `CLOUDFLARE_ACCOUNT_ID` | The account the Worker lives in. Held as a secret only so this public repository carries no account identifiers. |

Create the token at **Cloudflare → My Profile → API Tokens → Create Token**,
using the **Edit Cloudflare Workers** template and scoping it to this account
and the `vinayreddykalluri.com` zone. Then, so the value never passes through a
shell history or a chat window:

```bash
gh secret set CLOUDFLARE_API_TOKEN
```

`GITHUB_TOKEN` needs no setup — Actions provides it automatically, and
`scripts/fetch-github.mjs` uses it to lift the anonymous GitHub rate limit.

To check the whole pipeline without deploying anything:

```bash
gh workflow run "Nightly rebuild" -f dry_run=true
```

Each run writes a summary showing what the live GitHub API returned, including
a `degraded` list naming any figure that fell back to the build snapshot.

Two things worth knowing about scheduled Actions: GitHub starts cron jobs on a
best-effort basis and may run them late, and it disables schedules entirely
after 60 days with no repository activity.
