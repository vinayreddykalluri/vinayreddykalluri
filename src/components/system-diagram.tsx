"use client";

import { useEffect, useRef, useState } from "react";

/**
 * An animated cross-section of the event-driven pipeline this site's owner
 * actually builds: producers publish to a partitioned topic, a consumer group
 * drains it, most records land in the sink, some fail and are re-driven
 * through a retry path, and a few end up in the dead-letter queue.
 *
 * It is not decoration — every stage and every failure path maps to something
 * named in the résumé (partitions, consumer groups, idempotency, multi-level
 * retries, dead-letter handling). Hovering a stage explains it.
 *
 * Canvas for the moving parts, real DOM for labels so the content stays
 * readable and accessible. Under reduced motion it renders one static frame.
 */

const STAGES = [
  {
    id: "produce",
    label: "Producer",
    detail: "Services publish domain events instead of calling each other directly.",
    x: 0.06,
  },
  {
    id: "topic",
    label: "Topic · p0–p3",
    detail: "Partitioned for throughput; the key decides ordering within a partition.",
    x: 0.36,
  },
  {
    id: "consume",
    label: "Consumer group",
    detail: "Members share partitions and commit offsets, so work scales horizontally.",
    x: 0.64,
  },
  {
    id: "sink",
    label: "Sink",
    detail: "Idempotent writes, so a replayed record cannot double-apply.",
    x: 0.93,
  },
] as const;

type Rec = {
  x: number;
  lane: number;
  speed: number;
  state: "flow" | "retry" | "dead";
  retries: number;
  t: number;
};

const LANES = 4;

export function SystemDiagram() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let last = 0;
    let recs: Rec[] = [];

    const tokens = () => {
      const s = getComputedStyle(document.documentElement);
      return {
        line: s.getPropertyValue("--border").trim() || "#ccc",
        dim: s.getPropertyValue("--faint").trim() || "#888",
        accent: s.getPropertyValue("--accent").trim() || "#8a5410",
        alt: s.getPropertyValue("--accent-alt").trim() || "#1739b8",
      };
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      if (!r.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (): Rec => ({
      x: STAGES[0].x,
      lane: Math.floor(Math.random() * LANES),
      speed: 0.05 + Math.random() * 0.05,
      state: "flow",
      retries: 0,
      t: 0,
    });

    const seed = () => {
      recs = Array.from({ length: 16 }, () => {
        const r = spawn();
        r.x = STAGES[0].x + Math.random() * (STAGES[3].x - STAGES[0].x);
        return r;
      });
    };

    const laneY = (lane: number) => {
      const top = h * 0.26;
      const span = h * 0.42;
      return top + (span / (LANES - 1)) * lane;
    };

    const draw = (dt: number) => {
      if (!w || !h) return;
      const t = tokens();
      ctx.clearRect(0, 0, w, h);

      // partition rails
      ctx.strokeStyle = t.line;
      ctx.lineWidth = 1;
      for (let l = 0; l < LANES; l += 1) {
        const y = Math.round(laneY(l)) + 0.5;
        ctx.beginPath();
        ctx.moveTo(STAGES[0].x * w, y);
        ctx.lineTo(STAGES[3].x * w, y);
        ctx.stroke();
      }

      // stage uprights
      STAGES.forEach((stage) => {
        const x = Math.round(stage.x * w) + 0.5;
        ctx.strokeStyle = active === stage.id ? t.accent : t.line;
        ctx.lineWidth = active === stage.id ? 2 : 1;
        ctx.beginPath();
        ctx.moveTo(x, h * 0.18);
        ctx.lineTo(x, h * 0.74);
        ctx.stroke();
      });

      // retry arc: consumer back to topic
      ctx.strokeStyle = t.alt;
      ctx.globalAlpha = active === "consume" ? 0.9 : 0.45;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(STAGES[2].x * w, h * 0.74);
      ctx.quadraticCurveTo(
        ((STAGES[1].x + STAGES[2].x) / 2) * w,
        h * 0.93,
        STAGES[1].x * w,
        h * 0.74,
      );
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;

      recs.forEach((r, i) => {
        if (dt) {
          r.t += dt;
          if (r.state === "retry") {
            // travelling backwards along the retry arc
            r.x -= r.speed * dt * 1.6;
            if (r.x <= STAGES[1].x) {
              r.x = STAGES[1].x;
              r.state = "flow";
            }
          } else {
            r.x += r.speed * dt;
            // failure happens at the consumer boundary
            if (
              r.state === "flow" &&
              r.x >= STAGES[2].x &&
              r.x - r.speed * dt < STAGES[2].x
            ) {
              if (Math.random() < 0.22) {
                r.retries += 1;
                r.state = r.retries > 2 ? "dead" : "retry";
              }
            }
            if (r.x > STAGES[3].x + 0.03) recs[i] = spawn();
          }
        }

        const y =
          r.state === "retry"
            ? laneY(r.lane) + Math.sin((r.x - STAGES[1].x) * 12) * 6 + h * 0.1
            : laneY(r.lane);

        const colour =
          r.state === "dead" ? t.dim : r.state === "retry" ? t.alt : t.accent;
        ctx.fillStyle = colour;
        ctx.globalAlpha = r.state === "flow" ? 0.9 : 0.75;
        ctx.fillRect(r.x * w, y - 3, r.state === "flow" ? 13 : 9, 6);
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
  }, [active]);

  const activeStage = STAGES.find((s) => s.id === active);

  return (
    <div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="block h-[260px] w-full sm:h-[320px]"
          role="img"
          aria-label="Diagram of an event-driven pipeline: a producer publishes to a partitioned topic, a consumer group drains it into an idempotent sink, failed records are re-driven through a retry path, and records that exhaust their retries move to a dead-letter queue."
        />
      </div>

      <div className="mt-4 grid gap-px bg-[color:var(--border)] sm:grid-cols-4">
        {STAGES.map((stage) => (
          <button
            key={stage.id}
            type="button"
            onMouseEnter={() => setActive(stage.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(stage.id)}
            onBlur={() => setActive(null)}
            aria-pressed={active === stage.id}
            className={`bg-[color:var(--background)] p-4 text-left transition-colors ${
              active === stage.id ? "bg-[color:var(--accent-soft)]" : ""
            }`}
          >
            <span className="data-label text-[color:var(--accent-strong)]">
              {stage.label}
            </span>
          </button>
        ))}
      </div>

      <p className="measure mt-5 min-h-[3.5rem] leading-relaxed text-[color:var(--muted)]">
        {activeStage
          ? activeStage.detail
          : "Records flow left to right across four partitions. Amber records are in flight; blue ones failed at the consumer and are being re-driven along the retry path; grey ones exhausted their retries and would land in the dead-letter queue."}
      </p>
    </div>
  );
}
