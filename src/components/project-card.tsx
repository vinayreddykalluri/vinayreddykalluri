import type { ProjectItem } from "@/data/projects";

type ProjectCardProps = {
  project: ProjectItem;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="surface-card group flex h-full flex-col p-7">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="kicker">{project.type}</p>
          <h3 className="mt-2 text-xl font-semibold">{project.name}</h3>
        </div>
        <p className="soft-chip rounded-full px-3 py-1 text-xs">
          {project.period}
        </p>
      </header>

      <div className="mt-5 space-y-3.5 text-sm leading-7 text-[color:var(--muted)]">
        <p>
          <span className="font-semibold text-[color:var(--foreground)]">
            Problem:
          </span>{" "}
          {project.problem}
        </p>
        <p>
          <span className="font-semibold text-[color:var(--foreground)]">
            Solution:
          </span>{" "}
          {project.solution}
        </p>
        <p>
          <span className="font-semibold text-[color:var(--foreground)]">
            Impact:
          </span>{" "}
          {project.impact}
        </p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="soft-chip rounded-full px-3 py-1 text-xs">
            {tech}
          </li>
        ))}
      </ul>

      {project.href ? (
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-[color:var(--surface-strong)] px-4 py-2 text-xs font-semibold transition group-hover:border-[color:var(--accent)] group-hover:text-[color:var(--accent)]"
        >
          View Link
        </a>
      ) : null}
    </article>
  );
}
