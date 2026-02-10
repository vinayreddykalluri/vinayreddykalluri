import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-10 text-2xl font-semibold tracking-tight" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="mt-4 leading-8 text-[color:var(--muted)]" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-6 text-[color:var(--muted)]" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-[color:var(--muted)]" {...props} />,
  li: (props) => <li className="leading-7" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-[color:var(--accent)] underline decoration-[color:var(--accent)] underline-offset-4"
      rel="noreferrer"
      target="_blank"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote className="mt-6 border-l-4 border-[var(--accent)] pl-4 italic text-[color:var(--muted)]" {...props} />
  ),
  code: (props) => (
    <code className="rounded bg-[color:var(--accent-soft)] px-1.5 py-0.5 font-mono text-sm text-[color:var(--accent-strong)]" {...props} />
  ),
  pre: (props) => (
    <pre className="mt-6 overflow-x-auto rounded-xl bg-[#0f172a] p-4 text-sm text-[#e2e8f0]" {...props} />
  ),
};
