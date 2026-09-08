"use client";

import { useEffect, useRef } from "react";

/**
 * Kafka partition lanes, drawn to canvas.
 *
 * Decorative, but drawn from the subject matter rather than invented: four
 * lanes carrying records left to right at different rates, with the occasional
 * highlighted record standing in for a retry. Deliberately carries no axis or
 * figures so it can never be misread as live telemetry.
 */
export function EventLanes({ lanes = 4 }: { lanes?: number }) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let last = 0;

    type Record = { lane: number; x: number; v: number; hot: boolean };
    let records: Record[] = [];

    const tokens = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        line: s.getPropertyValue("--border").trim() || "#ccc",
        dim: s.getPropertyValue("--faint").trim() || "#888",
        hot: s.getPropertyValue("--accent").trim() || "#6e1a2b",
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      records = [];
      for (let l = 0; l < lanes; l += 1) {
        const n = 5 + l;
        for (let i = 0; i < n; i += 1) {
          records.push({
            lane: l,
            x: i / n + Math.random() * 0.05,
            v: 0.026 + l * 0.008 + Math.random() * 0.016,
            hot: Math.random() < 0.17,
          });
        }
      }
    };

    const draw = (dt: number) => {
      if (!width || !height) return;
      const t = tokens();
      ctx.clearRect(0, 0, width, height);

      const pad = 14;
      const laneH = (height - pad * 2) / lanes;

      ctx.strokeStyle = t.line;
      ctx.lineWidth = 1;
      for (let l = 0; l < lanes; l += 1) {
        const y = Math.round(pad + laneH * l + laneH / 2) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      records.forEach((r) => {
        if (dt) r.x += r.v * dt;
        if (r.x > 1.1) {
          r.x = -0.1;
          r.hot = Math.random() < 0.17;
        }
        const y = pad + laneH * r.lane + laneH / 2;
        ctx.fillStyle = r.hot ? t.hot : t.dim;
        ctx.globalAlpha = r.hot ? 0.95 : 0.4;
        ctx.fillRect(r.x * width, y - 3, r.hot ? 16 : 10, 6);
      });
      ctx.globalAlpha = 1;
    };

    const loop = (ts: number) => {
      const dt = last ? Math.min((ts - last) / 1000, 0.05) : 0;
      last = ts;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    resize();
    seed();
    draw(0);

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            resize();
            draw(0);
          })
        : null;
    ro?.observe(canvas);

    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [lanes]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="block h-[128px] w-full sm:h-[150px]"
    />
  );
}
