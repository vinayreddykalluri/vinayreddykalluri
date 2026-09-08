import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Vinay Reddy Kalluri for backend engineering opportunities and collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="shell py-14 md:py-20 space-y-10 md:space-y-12">
      <Reveal>
        <header className="max-w-3xl space-y-4">
          <p className="kicker">Contact</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Open to high-impact backend opportunities
          </h1>
          <p className="text-base leading-7 text-[color:var(--muted)]">
            If you are hiring for platform/backend leadership or want to
            collaborate on distributed systems work, reach out directly.
          </p>
        </header>
      </Reveal>

      <section className="grid gap-5 md:grid-cols-2">
        <Reveal delay={0.04}>
          <article className="surface-panel h-full p-7">
            <h2 className="text-xl font-semibold">Direct Channels</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  className="spark-link inline-flex px-4 py-2 font-semibold text-[color:var(--accent)]"
                  href={`mailto:${siteConfig.contact.email}`}
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  className="spark-link inline-flex px-4 py-2 font-semibold text-[color:var(--accent)]"
                  href={siteConfig.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn Profile
                </a>
              </li>
              <li>
                <a
                  className="spark-link inline-flex px-4 py-2 font-semibold text-[color:var(--accent)]"
                  href={siteConfig.contact.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub Profile
                </a>
              </li>
            </ul>
          </article>
        </Reveal>

        <Reveal delay={0.08}>
          <article className="rounded-[3px] border border-[color:var(--accent)] bg-[color:var(--accent-soft)] p-7">
            <h2 className="text-xl font-semibold">Availability</h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--muted)]">
              Available for {siteConfig.workAuthorization.availability}.{" "}
              {siteConfig.workAuthorization.visa}. Focused on senior backend
              engineering and platform reliability roles.
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="cta-primary mt-6 px-6 py-2.5 text-sm"
            >
              Start a conversation
            </a>
          </article>
        </Reveal>
      </section>
    </div>
  );
}
