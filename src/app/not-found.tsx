import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-start justify-center gap-5 px-6">
      <p className="font-mono text-xs tracking-[0.2em] text-[color:var(--accent)] uppercase">404</p>
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="max-w-xl text-[color:var(--muted)]">
        The page you requested does not exist. Use the link below to return to the homepage.
      </p>
      <Link
        href="/"
        className="rounded-full bg-[color:var(--accent)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[color:var(--accent-strong)]"
      >
        Back to home
      </Link>
    </main>
  );
}
