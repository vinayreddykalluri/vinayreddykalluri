// Extracts only the Simple Icons actually referenced by src/data/skills.ts and
// writes their SVG paths to a small JSON file.
//
// Importing the simple-icons package directly would pull thousands of icons
// into the bundle for the ~36 in use. This keeps the shipped payload to the
// paths that are actually rendered, and lets the marks be inlined as SVG so a
// technology logo costs no network request at all.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import * as icons from "simple-icons";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = resolve(root, "src/data/skills.ts");
const OUT = resolve(root, "src/data/tech-icons.json");

const source = await readFile(SRC, "utf8");
const slugs = [...source.matchAll(/icon:\s*"([^"]+)"/g)].map((m) => m[1]);
const unique = [...new Set(slugs)];

const out = {};
const missing = [];

for (const slug of unique) {
  const key = `si${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
  const icon = icons[key];
  if (!icon) {
    missing.push(slug);
    continue;
  }
  out[slug] = { title: icon.title, path: icon.path, hex: icon.hex };
}

await writeFile(OUT, `${JSON.stringify(out, null, 2)}\n`);

console.log(`[icons] ${Object.keys(out).length} inlined from ${unique.length} referenced`);
if (missing.length) {
  // Not fatal: a skill with no matching icon falls back to the proxy, then to
  // a monogram, so the page renders either way.
  console.warn(`[icons] no Simple Icon for: ${missing.join(", ")}`);
}
