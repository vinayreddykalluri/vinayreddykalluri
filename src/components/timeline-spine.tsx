"use client";

import { useEffect, useRef } from "react";

/**
 * A continuous spine down the timeline that fills as you scroll through it.
 *
 * Height is written straight to the fill element's style from one rAF-throttled
 * passive scroll listener — no React state, so scrolling nineteen entries costs
 * no re-renders.
 *
 * The track is always drawn; only the accent fill is scroll-linked. Under
 * reduced motion, or with no JavaScript, the fill is simply complete, so the
 * spine reads as a finished line rather than a broken one.
 */
export function TimelineSpine({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const fill = fillRef.current;
    if (!wrap || !fill) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      fill.style.height = "100%";
      return;
    }

    let ticking = false;
    let raf = 0;

    const update = () => {
      ticking = false;
      const rect = wrap.getBoundingClientRect();
      // Fill down to roughly the middle of the viewport, so the leading edge
      // sits just ahead of whatever the reader is looking at.
      const marker = window.innerHeight * 0.55;
      const progress = (marker - rect.top) / rect.height;
      const clamped = Math.max(0, Math.min(1, progress));
      fill.style.height = `${(clamped * 100).toFixed(2)}%`;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      {/* track */}
      <span
        className="pointer-events-none absolute bottom-0 left-0 top-0 w-px bg-[var(--border)]"
        aria-hidden="true"
      />
      {/* scroll-linked fill; starts complete so no-JS renders a finished line */}
      <span
        ref={fillRef}
        style={{ height: "100%" }}
        className="pointer-events-none absolute left-0 top-0 w-px bg-[color:var(--accent)]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
