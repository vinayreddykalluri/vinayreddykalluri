// Renders the Open Graph card to PNG at build time.
//
// The card was previously an SVG. X, LinkedIn, Facebook, Slack and iMessage all
// decline to render SVG preview images, so every shared link showed a card with
// no image at all. Sharp rasterises the same artwork to a 1200x630 PNG, which
// every platform accepts.

import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = resolve(root, "public/og");

const W = 1200;
const H = 630;

// Palette lifted from the dark theme in globals.css.
const INK = "#ede7e2";
const BG = "#141013";
const ACCENT = "#e3a64a";
const MUTED = "#a79aa0";
const FAINT = "#93868c";

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const stats = [
  ["8+", "YEARS"],
  ["1M+", "EVENTS / DAY"],
  ["99.9%", "CONSISTENCY"],
  ["−75%", "MIGRATION TIME"],
];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.20"/>
      <stop offset="60%" stop-color="${ACCENT}" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="${BG}"/>
  <circle cx="140" cy="90" r="420" fill="url(#glow)"/>

  <!-- partition rails, the same motif the site uses -->
  ${[0, 1, 2, 3]
    .map((i) => `<rect x="72" y="${470 + i * 22}" width="1056" height="1" fill="${INK}" opacity="0.10"/>`)
    .join("\n  ")}
  ${[
    [180, 0], [420, 0], [760, 0],
    [260, 1], [610, 1],
    [150, 2], [520, 2], [900, 2],
    [340, 3], [700, 3],
  ]
    .map(([x, lane]) => `<rect x="${x}" y="${467 + lane * 22}" width="26" height="7" fill="${ACCENT}" opacity="0.85"/>`)
    .join("\n  ")}

  <text x="72" y="118" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="20" letter-spacing="4" fill="${ACCENT}">${esc(
    "LEAD SOFTWARE ENGINEER",
  )}</text>

  <text x="72" y="228" font-family="Georgia, 'Times New Roman', serif" font-size="86" font-weight="700" fill="${INK}">${esc(
    "Vinay Reddy Kalluri",
  )}</text>

  <text x="72" y="300" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="${MUTED}">${esc(
    "Backend systems that stay stable when scale gets messy.",
  )}</text>

  <text x="72" y="348" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="19" letter-spacing="2" fill="${FAINT}">${esc(
    "JAVA  ·  SPRING BOOT  ·  APACHE KAFKA  ·  AWS  ·  ATLANTA, GA",
  )}</text>

  ${stats
    .map(([value, label], i) => {
      const x = 72 + i * 268;
      return `<rect x="${x}" y="392" width="60" height="3" fill="${ACCENT}"/>
  <text x="${x}" y="440" font-family="Georgia, serif" font-size="42" font-weight="700" fill="${INK}">${esc(value)}</text>
  <text x="${x}" y="${462}" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="15" letter-spacing="2.5" fill="${FAINT}">${esc(label)}</text>`;
    })
    .join("\n  ")}

  <text x="72" y="588" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="19" letter-spacing="2" fill="${MUTED}">${esc(
    "vinayreddykalluri.com",
  )}</text>
</svg>`;

await mkdir(OUT_DIR, { recursive: true });
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(resolve(OUT_DIR, "cover.png"));

console.log(`[og] cover.png written (${W}x${H})`);
