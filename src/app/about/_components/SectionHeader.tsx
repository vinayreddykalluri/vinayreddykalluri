type SectionHeaderProps = {
  kicker?: string;
  title: string;
  description?: string;
  className?: string;
  headingLevel?: "h1" | "h2";
  titleClassName?: string;
};

export function SectionHeader({
  kicker,
  title,
  description,
  className = "",
  headingLevel = "h2",
  titleClassName = "",
}: SectionHeaderProps) {
  const HeadingTag = headingLevel;

  return (
    <header className={`space-y-4 ${className}`}>
      {kicker ? (
        <p className="kicker tracking-[0.18em] text-[color:var(--accent)]">{kicker}</p>
      ) : null}
      <HeadingTag
        className={`text-3xl leading-[1.1] font-semibold tracking-tight sm:text-4xl md:text-[2.8rem] ${titleClassName}`}
      >
        {title}
      </HeadingTag>
      {description ? (
        <p className="max-w-3xl text-base leading-8 text-[color:var(--muted)]">
          {description}
        </p>
      ) : null}
    </header>
  );
}
