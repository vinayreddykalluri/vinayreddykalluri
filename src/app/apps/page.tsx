import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/Reveal";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Apps",
  description:
    "Android apps by KVR Dev Labs: Flames Match party games and Keep Motive daily quotes, published on Google Play.",
  path: "/apps",
});

const apps = [
  {
    name: "Flames Match: Desi Party Games",
    tagline: "Party games on everyone's phone — no sign-up, just a room code.",
    description:
      "The classic FLAMES name game plus a full party suite: Would You Rather, Never Have I Ever, Who's Most Likely To and Group FLAMES, played live across phones over shared room codes. Six content vibes — including Desi, Shaadi and College modes — tune the questions to the group.",
    facts: [
      ["Platform", "Android · Google Play"],
      ["Stack", "Flutter · Firebase (Firestore, Auth, App Check)"],
      ["Privacy", "No accounts; names and history stay on-device"],
    ],
    playUrl:
      "https://play.google.com/store/apps/details?id=com.flutter_match.flames_match",
    privacyUrl:
      "https://github.com/vinayreddykalluri/flames_match_privacy/blob/main/README.md",
  },
  {
    name: "Keep Motive — Daily Quotes",
    tagline: "A quiet daily nudge: one quote, every day.",
    description:
      "A small, focused app that delivers a daily motivational quote without feeds, streaks of guilt, or noise. Built to be opened in seconds and closed feeling slightly better.",
    facts: [
      ["Platform", "Android · Google Play"],
      ["Stack", "Flutter"],
    ],
    playUrl:
      "https://play.google.com/store/apps/details?id=com.keep_motive.keep_motive",
    privacyUrl: null,
  },
] as const;

export default function AppsPage() {
  return (
    <div className="shell py-14 md:py-20">
      <PageHeader
        kicker="KVR Dev Labs"
        title="Apps, shipped end to end."
        lede="Consumer Android apps designed, built and operated solo under the KVR Dev Labs banner — product, code, release engineering and store presence. Published on Google Play."
        aside={
          <Link href="/contact" className="cta-primary px-6 py-3 text-sm">
            Get in touch
          </Link>
        }
      />

      <div className="flex flex-col">
        {apps.map((app, index) => (
          <Reveal key={app.name}>
            <article className="grid scroll-mt-28 gap-8 border-b border-[var(--border)] py-12 md:grid-cols-[auto_1fr] md:gap-12">
              <p className="stat-figure text-[color:var(--border)] md:w-28">
                {String(index + 1).padStart(2, "0")}
              </p>

              <div>
                <span className="kicker">Google Play</span>
                <h2 className="mt-3 text-3xl md:text-4xl">{app.name}</h2>
                <p className="mt-3 text-lg text-[color:var(--muted)]">
                  {app.tagline}
                </p>

                <p className="measure mt-6 leading-relaxed text-[color:var(--muted)]">
                  {app.description}
                </p>

                <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                  {app.facts.map(([label, value]) => (
                    <div key={label}>
                      <dt className="data-label text-[color:var(--faint)]">
                        {label}
                      </dt>
                      <dd className="mt-1 text-sm leading-relaxed">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href={app.playUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta-primary px-6 py-3 text-sm"
                  >
                    Get it on Google Play
                  </a>
                  {app.privacyUrl ? (
                    <a
                      href={app.privacyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[color:var(--muted)] underline-offset-4 hover:text-[color:var(--foreground)] hover:underline"
                    >
                      Privacy policy
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 text-sm leading-relaxed text-[color:var(--faint)]">
        Support for any KVR Dev Labs app:{" "}
        <a
          href="mailto:kalluri.vinayreddy@gmail.com"
          className="underline-offset-4 hover:underline"
        >
          kalluri.vinayreddy@gmail.com
        </a>
        . Replies usually land within a day.
      </p>
    </div>
  );
}
