"use client";

import { useCallback, useRef } from "react";

/**
 * Writes the pointer position into --mx/--my on whichever `.spot` element is
 * under the cursor, which the stylesheet turns into a radial highlight.
 *
 * One listener on the container rather than one per tile, and it writes CSS
 * variables instead of triggering React renders — so a grid of fifty tiles
 * costs a single passive pointermove handler.
 *
 * Progressive enhancement: with no pointer, or no JavaScript, tiles keep their
 * border and elevation treatment and nothing looks unfinished.
 */
export function Spotlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onPointerMove = useCallback((event: React.PointerEvent) => {
    if (event.pointerType === "touch") return;
    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
      ".spot",
    );
    if (!target) return;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    target.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <div ref={ref} className={className} onPointerMove={onPointerMove}>
      {children}
    </div>
  );
}
