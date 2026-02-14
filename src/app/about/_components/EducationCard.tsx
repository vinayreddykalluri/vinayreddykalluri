import Image from "next/image";

type EducationItem = {
  degree: string;
  institution: string;
  period: string;
  logo: string;
  logoAlt: string;
  details: readonly string[];
};

type EducationCardProps = {
  item: EducationItem;
};

export function EducationCard({ item }: EducationCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[linear-gradient(160deg,var(--surface),rgba(255,255,255,0.55))] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(94,96,206,0.15)]">
      <div className="h-1.5 bg-gradient-to-r from-[#7400B8] via-[#5E60CE] to-[#4EA8DE]" />
      <div className="space-y-4 p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-[4.5rem] w-[6.5rem] shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[color:var(--surface-strong)] p-2">
            <Image
              src={item.logo}
              alt={item.logoAlt}
              width={160}
              height={70}
              className="h-11 w-full object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base leading-6 font-semibold">{item.degree}</h3>
            <p className="mt-1 text-sm leading-6 text-[color:var(--muted)]">
              {item.institution}
            </p>
            <p className="mt-2 inline-flex rounded-full border border-[var(--border)] bg-[color:var(--accent-soft)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[color:var(--accent-strong)]">
              {item.period}
            </p>
          </div>
        </div>

        <ul className="space-y-2.5">
          {item.details.map((detail) => {
            const [left, ...rightParts] = detail.split(":");
            const hasValue = rightParts.length > 0;
            const right = rightParts.join(":").trim();

            return (
              <li
                key={`${item.degree}-${detail}`}
                className="rounded-xl border border-[var(--border)] bg-[color:var(--surface-strong)]/90 px-3.5 py-2.5 text-sm leading-6 text-[color:var(--muted)]"
              >
                <span className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[color:var(--accent)]" />
                  {hasValue ? (
                    <span>
                      <span className="font-semibold text-[color:var(--foreground)]">
                        {left}:
                      </span>{" "}
                      {right}
                    </span>
                  ) : (
                    <span>{detail}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
