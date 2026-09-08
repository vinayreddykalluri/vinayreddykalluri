import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
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
  const channels = [
    {
      label: "Email",
      value: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      label: "Phone",
      value: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`,
    },
    {
      label: "LinkedIn",
      value: "in/vinayreddykalluri",
      href: siteConfig.contact.linkedin,
      external: true,
    },
    {
      label: "GitHub",
      value: "@vinayreddykalluri",
      href: siteConfig.contact.github,
      external: true,
    },
    {
      label: "Writing",
      value: "vinayreddykalluri.medium.com",
      href: siteConfig.contact.medium,
      external: true,
    },
    {
      label: "Based in",
      value: siteConfig.location,
    },
  ];

  return (
    <div className="shell py-14 md:py-20">
      <PageHeader
        kicker="Contact"
        title="Open to high-impact backend work."
        lede="If you are hiring for platform or backend leadership, or want to collaborate on distributed systems work, the fastest route is email."
      />

      <Reveal>
        <section className="mt-12 grid gap-px bg-[color:var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => {
            const inner = (
              <>
                <p className="data-label text-[color:var(--faint)]">
                  {channel.label}
                </p>
                <p className="mt-3 break-words font-sans text-lg font-semibold">
                  {channel.value}
                </p>
              </>
            );

            return channel.href ? (
              <a
                key={channel.label}
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="bg-[color:var(--background)] p-7 transition-colors hover:bg-[color:var(--accent-soft)]"
              >
                {inner}
              </a>
            ) : (
              <div
                key={channel.label}
                className="bg-[color:var(--background)] p-7"
              >
                {inner}
              </div>
            );
          })}
        </section>
      </Reveal>

      <Reveal>
        <section className="band-accent mt-16 p-9 md:p-14">
          <span className="kicker">Availability</span>
          <h2 className="display-lg mt-4 max-w-[20ch]">
            Remote, hybrid, or onsite in the U.S.
          </h2>
          <p className="band-dim measure mt-5 text-lg">
            {siteConfig.workAuthorization.visa}. Focused on distributed systems,
            platform reliability, and backend modernization.
          </p>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="cta-primary mt-8 px-7 py-3 text-sm"
          >
            Start a conversation
          </a>
        </section>
      </Reveal>
    </div>
  );
}
