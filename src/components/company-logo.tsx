"use client";

import { useState } from "react";

/**
 * Company mark, resolved through the Worker's /api/logo proxy.
 *
 * The logo.dev token lives only as a Cloudflare secret on the Worker, so it
 * never appears in this bundle, in page source, or in git.
 *
 * Falls back to a monogram whenever the image cannot load — no token
 * configured, an unknown domain, or the request failing — so the layout is
 * identical either way and nothing renders as a broken image.
 */
export function CompanyLogo({
  domain,
  name,
  size = 48,
}: {
  domain?: string;
  name: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);

  const monogram = name
    .replace(/\(.*?\)/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const box =
    "flex shrink-0 items-center justify-center border border-[var(--border)] bg-[color:var(--surface-strong)]";

  if (!domain || failed) {
    return (
      <div
        className={box}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <span className="font-mono text-xs font-semibold tracking-[0.06em] text-[color:var(--faint)]">
          {monogram}
        </span>
      </div>
    );
  }

  return (
    <div className={box} style={{ width: size, height: size }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/api/logo?d=${encodeURIComponent(domain)}&s=${size * 2}`}
        alt={`${name} logo`}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="h-[70%] w-[70%] object-contain"
      />
    </div>
  );
}
