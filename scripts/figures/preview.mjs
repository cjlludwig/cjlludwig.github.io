// Rasterize figures to PNG (light + dark) for visual review WITHOUT the dev server.
// The dev server is user-managed -- never start it. Use this to tune a figure's
// static/final state, then refresh the browser to check animation.
//
//   node scripts/figures/preview.mjs                # all figures
//   node scripts/figures/preview.mjs greenfield     # one or more by name
//
// Note: PNGs show the BASE (no-animation) state -- exactly what prefers-reduced-motion
// users see -- so it must already be fully resolved. Inline CSS vars/keyframes are not
// applied, which is why raw fills must use color(token), not a literal var(--token).
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import sharp from 'sharp';
import { figures } from './index.js';
import { setMode, standaloneSVG } from './_lib.js';

const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(figures);
const outDir = path.join(os.tmpdir(), 'ctx-figures');
fs.mkdirSync(outDir, { recursive: true });

for (const name of names) {
  const build = figures[name];
  if (!build) { console.error(`unknown figure: ${name} (have: ${Object.keys(figures).join(', ')})`); continue; }
  for (const theme of ['light', 'dark']) {
    setMode('png', theme);
    const svg = standaloneSVG(build(), theme);
    const file = path.join(outDir, `${name}-${theme}.png`);
    await sharp(Buffer.from(svg)).png().toFile(file);
    console.log(file);
  }
}
setMode('css');
