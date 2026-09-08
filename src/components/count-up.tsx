"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a figure up when it scrolls into view.
 *
 * Parses the numeric part out of strings like "−75%", "1M+" or "99.9%" and
 * animates only that, preserving whatever prefix and suffix the figure has.
 *
 * The final value is what renders on the server and in the first frame, so the
 * number is correct and readable even if the animation never runs — reduced
 * motion, no JavaScript, or a throttled tab.
 */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Split "−75%" into prefix "−", number 75, suffix "%".
    const match = value.match(/^(\D*?)([\d.,]+)(.*)$/);
    if (!match) return;

    const [, prefix, rawNumber, suffix] = match;
    const target = Number(rawNumber.replace(/,/g, ""));
    if (!Number.isFinite(target) || target === 0) return;

    const decimals = (rawNumber.split(".")[1] ?? "").length;
    const grouped = rawNumber.includes(",");

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const withGroups = grouped
        ? Number(fixed).toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : fixed;
      return `${prefix}${withGroups}${suffix}`;
    };

    let raf = 0;
    let started = false;

    const run = () => {
      const duration = 1100;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        // ease-out cubic: fast then settling, so it reads as landing on a value
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(format(target * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        setDisplay(format(0));
        run();
        io.disconnect();
      },
      { threshold: 0.4 },
    );

    io.observe(node);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
