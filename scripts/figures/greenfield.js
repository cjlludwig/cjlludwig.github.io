// greenfield: a near-empty context window where a single "seed" tile germinates and
// grows OUTWARD in a branching cascade -- not a linear fill -- settling into a neat
// organic cluster with open room around it (few constraints). Tiles cool from a hot
// seed at the core to faint tiles at the frontier, where little sprouts twinkle. A
// deliberate early-stage echo of the finale bloom (seed -> compounding system).
// Layout is a deterministic seeded branch-walk computed at build time; no JS ships.
import { box, rect, text, line, circle, group } from './_lib.js';

const VB = '0 0 640 380';
const W = { x: 70, y: 46, w: 500, h: 300, rx: 14 }; // same frame as finite-window (a pair)
const COLS = 14, ROWS = 8, CELL = 24, GAP = 8;
const X0 = 100, Y0 = 86;
const cx = (c) => X0 + c * (CELL + GAP);
const cy = (r) => Y0 + r * (CELL + GAP);

// seed near centre so the cluster radiates with open room on all sides
const SEED = [7, 3];
// arm directions (radians) that elongate the silhouette into branching tendrils.
// four diagonals keep the silhouette balanced; the base lumps add organic life.
const ARMS = [-2.356, -0.785, 0.785, 2.356];

export default function build() {
  const key = (c, r) => c + ',' + r;
  const inGrid = (c, r) => c >= 0 && c < COLS && r >= 0 && r < ROWS;

  // star-convex organic radius: a lumpy base disk with gaussian bumps along the
  // arm angles, so the cluster stays connected/neat but sprouts branching tendrils.
  const radius = (theta) => {
    let R = 2.05 + 0.3 * Math.sin(3 * theta + 0.4) + 0.18 * Math.sin(5 * theta + 1.7);
    for (const a of ARMS) {
      let d = Math.atan2(Math.sin(theta - a), Math.cos(theta - a)); // wrapped angle diff
      R += 1.45 * Math.exp(-((d / 0.46) ** 2));
    }
    return R;
  };

  // collect the cluster cells with their distance from the seed
  const cells = [];
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const dx = c - SEED[0], dy = r - SEED[1];
      const dist = Math.hypot(dx, dy);
      const inset = c === SEED[0] && r === SEED[1] ? true : dist <= radius(Math.atan2(dy, dx)) + 1e-6;
      if (!inset) continue;
      cells.push({ c, r, dist, ang: Math.atan2(dy, dx) });
    }
  const seen = new Set(cells.map((c) => key(c.c, c.r)));

  // colour + opacity cool from the hot seed outward to a faint frontier
  const tok = (d) => (d < 0.6 ? 'loadHot' : d < 1.7 ? 'load' : d < 2.7 ? 'load' : 'loadDim');
  const op = (d) => +Math.max(0.32, 1 - d * 0.13).toFixed(2);

  // reveal order: outward by distance, sweeping by angle within each radius, so
  // tiles appear one at a time, marching out from the seed.
  const ordered = cells.sort((a, b) => a.dist - b.dist || a.ang - b.ang);
  const tileEls = ordered.map((c, i) =>
    rect(cx(c.c), cy(c.r), CELL, CELL, tok(c.dist), {
      rx: 5, op: c.dist < 0.1 ? 1 : op(c.dist), cls: `gf-t n${i}`,
    }));

  // a small sparkle in the empty cell just beyond each arm tip
  const sprouts = [];
  ARMS.forEach((a) => {
    const rr = radius(a) + 0.9;
    const c = Math.round(SEED[0] + Math.cos(a) * rr), r = Math.round(SEED[1] + Math.sin(a) * rr);
    if (!inGrid(c, r) || seen.has(key(c, r))) return;
    seen.add(key(c, r));
    const px = cx(c) + CELL / 2, py = cy(r) + CELL / 2, k = 6;
    sprouts.push(group(
      line(px - k, py, px + k, py, 'loadHot', { sw: 1.4 }) +
      line(px, py - k, px, py + k, 'loadHot', { sw: 1.4 }) +
      circle(px, py, 1.6, 'loadHot'),
      { cls: `gf-spk k${sprouts.length % 4}` }
    ));
  });

  const body = [
    box(W.x, W.y, W.w, W.h, 'frame', { rx: W.rx, sw: 3, fill: 'win' }),
    text(W.x + 16, W.y + 20, 'context window', { anchor: 'start', size: 13, weight: 600, op: 0.75 }),
    group(tileEls.join(''), { cls: 'gf-field' }),
    sprouts.join(''),
  ].join('\n');

  // reveal cascade: one tile at a time, each a beat after the last, marching
  // outward from the seed; sprouts twinkle once the frontier arrives.
  const BEAT = 0.4, START = 0.1;
  const N = ordered.length;
  // seed (n0) pops first, then keeps glowing; the rest follow one by one
  const tileDelays = ordered.slice(1).map((_, i) =>
    `.ctx-greenfield .n${i + 1}{animation-delay:${(START + (i + 1) * BEAT).toFixed(2)}s;}`).join('\n');
  const frontierDelay = +(START + N * BEAT).toFixed(2);

  return {
    viewBox: VB,
    body,
    caption: 'A greenfield task. A single seed tile germinates and branches outward into the open context window, settling into a vibe-coded cluster with plenty of room left to grow and few constraints to work around.',
    ariaLabel: 'A nearly empty context window. A single bright seed tile near the centre grows outward one tile at a time, the cluster cooling from hot at the core to faint at the edges and settling into a neat organic shape. Small sparkles twinkle in the empty cells just beyond the frontier, and open space surrounds the cluster as room to grow.',
    anim: `
.ctx-greenfield .gf-t{transform-box:fill-box;transform-origin:center;animation:gf-pop .45s cubic-bezier(.2,.8,.3,1) both;}
${tileDelays}
.ctx-greenfield .n0{animation:gf-pop .5s cubic-bezier(.2,.8,.3,1) both,gf-seedglow 3.4s ease-in-out 1.2s infinite;}
.ctx-greenfield .gf-spk{transform-box:fill-box;transform-origin:center;animation:gf-twinkle 3s ease-in-out infinite;animation-delay:${frontierDelay}s;}
.ctx-greenfield .k1{animation-delay:${(frontierDelay + 0.4).toFixed(2)}s;}
.ctx-greenfield .k2{animation-delay:${(frontierDelay + 0.8).toFixed(2)}s;}
.ctx-greenfield .k3{animation-delay:${(frontierDelay + 1.2).toFixed(2)}s;}
@keyframes gf-pop{from{opacity:0;transform:scale(0);}60%{transform:scale(1.12);}}
@keyframes gf-seedglow{0%,100%{opacity:1;}50%{opacity:.72;}}
@keyframes gf-twinkle{0%,100%{opacity:0;transform:scale(.5) rotate(0deg);}50%{opacity:.9;transform:scale(1) rotate(45deg);}}`,
  };
}
