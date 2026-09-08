const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Formats a date for display.
 *
 * A bare "YYYY-MM-DD" is a calendar date, but `new Date()` parses it as UTC
 * midnight — so formatting it in a negative-offset timezone rolls it back a
 * day ("2026-08-01" printed as Jul 31 in America/New_York). Since this site is
 * a static export, that would bake the build machine's timezone into every
 * date every visitor sees.
 *
 * Date-only strings are therefore formatted in UTC, which returns the same
 * calendar date that was written. Strings that carry a real time and offset
 * (GitHub commit timestamps) keep local formatting, which is correct for them.
 */
export function formatDate(dateString: string) {
  const isDateOnly = DATE_ONLY.test(dateString.trim());

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    ...(isDateOnly ? { timeZone: "UTC" } : {}),
  }).format(new Date(dateString));
}
