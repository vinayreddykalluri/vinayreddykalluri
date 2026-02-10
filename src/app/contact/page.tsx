import type { Metadata } from "next";
import { siteConfig } from "@/data/profile";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Vinay Reddy Kalluri for backend engineering opportunities and collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="space-y-10 md:space-y-12">
      <header className="max-w-3xl space-y-4">
        <p className="kicker">Contact</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Open to high-impact backend opportunities</h1>
        <p className="text-base leading-7 text-[color:var(--muted)]">
          If you are hiring for platform/backend leadership or want to collaborate on distributed systems work, reach out directly.
        </p>
      </header>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="surface-panel p-7">
          <h2 className="text-xl font-semibold">Direct Channels</h2>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a className="text-[color:var(--accent)] transition hover:text-[color:var(--accent-strong)]" href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
            </li>
            <li>
              <a className="text-[color:var(--accent)] transition hover:text-[color:var(--accent-strong)]" href={siteConfig.contact.phoneHref}>
                {siteConfig.contact.phoneLabel}
              </a>
            </li>
            <li>
              <a className="text-[color:var(--accent)] transition hover:text-[color:var(--accent-strong)]" href={siteConfig.contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn Profile
              </a>
            </li>
            <li>
              <a className="text-[color:var(--accent)] transition hover:text-[color:var(--accent-strong)]" href={siteConfig.contact.github} target="_blank" rel="noreferrer">
                GitHub Profile
              </a>
            </li>
          </ul>
        </article>

        <article className="rounded-[1.6rem] border border-[#72EFDD66] bg-[linear-gradient(135deg,#7400B8,#5E60CE,#4EA8DE)] p-7 text-white shadow-[0_22px_48px_rgba(79,70,229,0.35)]">
          <h2 className="text-xl font-semibold">Availability</h2>
          <p className="mt-3 text-sm leading-6 text-white/90">
            Available for {siteConfig.workAuthorization.availability}. {siteConfig.workAuthorization.visa}. Focused on
            senior backend engineering and platform reliability roles.
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-[#0b1022] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(11,16,34,0.45)] transition hover:-translate-y-0.5 hover:bg-[#131a34] focus-visible:outline-white"
          >
            Start a conversation
          </a>
        </article>
      </section>
    </div>
  );
}
