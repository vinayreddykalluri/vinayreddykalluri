import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/project-card";
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
    <div className="space-y-10 md:space-y-12">
      <Reveal>
        <header className="max-w-3xl space-y-4">
          <p className="kicker">Projects</p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Case studies from architecture to outcome
          </h1>
          <p className="text-base leading-7 text-[color:var(--muted)]">
            Each project is structured around problem context, solution design,
            stack decisions, and business or product impact.
          </p>
        </header>
      </Reveal>

      <section className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.name} delay={0.04 * (index % 4)}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </section>
    </div>
  );
}
