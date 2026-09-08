/**
 * One page header for every route, so type scale, spacing and the rule under
 * the title stay identical across the site rather than drifting per page.
 */
export function PageHeader({
  kicker,
  title,
  lede,
  aside,
}: {
  kicker: string;
  title: string;
  lede?: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="border-b border-[var(--border)] pb-10 md:pb-14">
      <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
        <div>
          <span className="kicker">{kicker}</span>
          <h1 className="display-lg mt-4 max-w-[20ch]">{title}</h1>
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
      {lede ? (
        <p className="measure mt-6 text-lg leading-relaxed text-[color:var(--muted)]">
          {lede}
        </p>
      ) : null}
    </header>
  );
}
