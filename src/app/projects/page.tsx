import Link from "next/link";
import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/Reveal";
import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Case-study projects by Vinay Reddy Kalluri: problem, solution, tech stack, and measurable impact.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <div className="shell py-14 md:py-20">
      <PageHeader
        kicker="Projects"
        title="Case studies, from architecture to outcome."
        lede="Each project is structured the same way: the problem as it actually presented, the technical decision taken, and what measurably changed afterwards."
        aside={
          <Link href="/contact" className="cta-primary px-6 py-3 text-sm">
            Work together
          </Link>
        }
      />

      <div className="flex flex-col">
        {projects.map((project, index) => (
          <Reveal key={project.name}>
            <article className="grid gap-8 border-b border-[var(--border)] py-12 md:grid-cols-[auto_1fr] md:gap-12">
              <p className="stat-figure text-[color:var(--border)] md:w-28">
                {String(index + 1).padStart(2, "0")}
              </p>

              <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="kicker">{project.type}</span>
                    <span className="data-label text-[color:var(--faint)]">
                      {project.period}
                    </span>
                  </div>

                  <h2 className="mt-3 text-3xl md:text-4xl">{project.name}</h2>

                  <div className="mt-6">
                    <p className="data-label text-[color:var(--faint)]">
                      Problem
                    </p>
                    <p className="mt-2 leading-relaxed text-[color:var(--muted)]">
                      {project.problem}
                    </p>
                  </div>

                  <div className="mt-5">
                    <p className="data-label text-[color:var(--faint)]">
                      Approach
                    </p>
                    <p className="mt-2 leading-relaxed text-[color:var(--muted)]">
                      {project.solution}
                    </p>
                  </div>
                </div>

                <div className="lg:border-l lg:border-[var(--border)] lg:pl-12">
                  <p className="data-label text-[color:var(--faint)]">Impact</p>
                  <p className="mt-3 text-lg leading-relaxed">
                    {project.impact}
                  </p>

                  <div className="signal-track mt-7">
                    {project.stack.map((tech) => (
                      <span key={tech} className="signal-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      className="spark-link mt-7 px-5 py-2.5 text-sm"
                    >
                      {project.hrefLabel ?? "Visit"} &rarr;
                    </a>
                  ) : null}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
