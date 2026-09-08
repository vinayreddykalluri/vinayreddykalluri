import { CompanyLogo } from "@/components/company-logo";
import icons from "@/data/tech-icons.json";

type IconEntry = { title: string; path: string; hex: string };
const ICONS = icons as Record<string, IconEntry>;

/**
 * Mark for a technology.
 *
 * Three tiers, cheapest first:
 *  1. an inline Simple Icons path — no network request, no layout shift
 *  2. the /api/logo proxy, for anything Simple Icons does not carry
 *  3. a monogram tile
 *
 * Rendered in currentColor rather than the brand hex, so the marks sit in the
 * page's palette instead of dragging thirty different brand colours into it,
 * and so they stay legible in both themes.
 */
export function TechLogo({
  icon,
  domain,
  name,
  size = 32,
}: {
  icon?: string;
  domain?: string;
  name: string;
  size?: number;
}) {
  const entry = icon ? ICONS[icon] : undefined;

  if (!entry) {
    return <CompanyLogo domain={domain} name={name} size={size} />;
  }

  return (
    <span
      className="flex shrink-0 items-center justify-center border border-[var(--border)] bg-[color:var(--surface-strong)] text-[color:var(--foreground)]"
      style={{ width: size, height: size }}
    >
      <svg
        role="img"
        aria-label={`${entry.title} logo`}
        viewBox="0 0 24 24"
        width={size * 0.56}
        height={size * 0.56}
        fill="currentColor"
      >
        <path d={entry.path} />
      </svg>
    </span>
  );
}
