// connected-context: the finale and payoff of the post's visual language. A seed of
// context grows outward tile by tile (echo of greenfield), then external knowledge
// silos HOT-LOAD in from beyond each petal tip (echo of progressive disclosure / the
// established-codebase corpus) and snap into place, assembling a complete 8-bit
// flower -- the compounding knowledge system, fully bloomed. The silhouette is a
// hand-authored petal layout (rotated 4x) computed at build time; no JS ships.
import { rect, text, group, color, n } from './_lib.js';

const VB = '0 0 640 380';
const CX = 320, CY = 178;
const PITCH = 28, CELL = 23;

const tx = (i) => CX + i * PITCH - CELL / 2;
const ty = (j) => CY + j * PITCH - CELL / 2;

// rotate a cell 90deg clockwise, k times — used to stamp one petal into four
const rot = ([i, j]) => [-j, i];
const rotN = (p, k) => { for (let t = 0; t < k; t++) p = rot(p); return p; };

// the hot plus-core (loadHot) + its softer corners (load)
const CORE_HOT = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]];
const CORE_RING = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
// one petal pointing north: a narrow neck opening into a fat round lobe (load),
// capped by a silo tip (loadHot). the narrow neck notches the diagonals so the
// four petals read as distinct blossoms rather than a solid diamond.
const PETAL_BODY = [[0, -2], [-1, -3], [0, -3], [1, -3], [-1, -4], [0, -4], [1, -4]];
const PETAL_SILO = [0, -5];

export default function build() {
  const key = (i, j) => i + ',' + j;
  const map = new Map(); // key -> { i, j, kind }
  const put = (i, j, kind) => { if (!map.has(key(i, j))) map.set(key(i, j), { i, j, kind }); };

  CORE_HOT.forEach(([i, j]) => put(i, j, 'hot'));
  CORE_RING.forEach(([i, j]) => put(i, j, 'body'));
  for (let k = 0; k < 4; k++) {
    PETAL_BODY.forEach((p) => { const [i, j] = rotN([...p], k); put(i, j, 'body'); });
    const [si, sj] = rotN([...PETAL_SILO], k);
    put(si, sj, 'silo');
  }

  const cells = [...map.values()].map((c) => ({
    ...c, dist: Math.hypot(c.i, c.j), ang: Math.atan2(c.j, c.i),
  }));

  // body = core + petal tiles (everything that is not a hot-loading silo), grown
  // outward from the seed one tile at a time
  const body = cells
    .filter((c) => c.kind !== 'silo')
    .sort((a, b) => a.dist - b.dist || a.ang - b.ang);
  const silos = cells.filter((c) => c.kind === 'silo').sort((a, b) => a.ang - b.ang);

  let order = 0;
  const bodyEls = body.map((c) => {
    const tok = c.kind === 'hot' ? 'loadHot' : 'load';
    const isCenter = c.i === 0 && c.j === 0;
    return rect(tx(c.i), ty(c.j), CELL, CELL, tok, {
      rx: 6, cls: `cc-t ${isCenter ? 'cc-core ' : ''}n${order++}`,
    });
  });
  const NBODY = order;

  // silos slide in from just beyond their petal tip (--tx/--ty start offset)
  const siloEls = silos.map((s, k) => {
    const len = Math.hypot(s.i, s.j) || 1;
    const ox = n((s.i / len) * PITCH * 1.4), oy = n((s.j / len) * PITCH * 1.4);
    return `<rect x="${n(tx(s.i))}" y="${n(ty(s.j))}" width="${CELL}" height="${CELL}" rx="6" `
      + `style="fill:${color('loadHot')};--tx:${ox}px;--ty:${oy}px" class="cc-silo k${k}"/>`;
  });

  const bloom = group(bodyEls.join('') + siloEls.join(''), { cls: 'cc-bloom' });

  const figure = [
    bloom,
    text(CX, 360, 'a compounding knowledge system', { anchor: 'middle', size: 14, weight: 700, op: 0.85 }),
  ].join('\n');

  // --- timing ---
  const START = 0.1, BEAT = 0.14;
  const buildEnd = +(START + NBODY * BEAT).toFixed(2);
  // body pops one-by-one outward, then a slow brightness wave sweeps out forever
  const bodyDelays = body.map((c, i) => {
    const ring = Math.min(5, Math.round(c.dist));
    const sweep = (buildEnd + 1 + ring * 0.22).toFixed(2);
    return `.ctx-connected-context .n${i}{animation-delay:${(START + i * BEAT).toFixed(2)}s,${sweep}s;}`;
  }).join('\n');
  // silos hot-load after the body is grown, then shimmer
  const siloStart = buildEnd + 0.25;
  const siloDelays = silos.map((_, k) =>
    `.ctx-connected-context .k${k}{animation-delay:${(siloStart + k * 0.28).toFixed(2)}s,${(siloStart + k * 0.28 + 1.4).toFixed(2)}s;}`).join('\n');

  return {
    viewBox: VB,
    body: figure,
    caption: 'A compounding knowledge system. A seed of context grows outward tile by tile, then external knowledge silos hot-load in to complete the bloom, so the relevant cluster arrives already assembled rather than as scattered fragments.',
    ariaLabel: 'An eight-bit flower built from tiles. A hot seed tile at the centre grows outward one tile at a time into four blue petals, then bright external knowledge-silo tiles load in from beyond each petal tip and snap into place, completing the bloom. A slow brightness wave then pulses outward through the petals and the silo tips shimmer, conveying a knowledge system that keeps compounding.',
    anim: `
.ctx-connected-context .cc-bloom{transform-box:fill-box;transform-origin:center;animation:cc-breathe 8s ease-in-out infinite;}
.ctx-connected-context .cc-t{transform-box:fill-box;transform-origin:center;animation:cc-pop .45s cubic-bezier(.2,.8,.3,1) both,cc-sweep 3.6s ease-in-out infinite;}
${bodyDelays}
.ctx-connected-context .cc-core{animation:cc-pop .5s cubic-bezier(.2,.8,.3,1) both,cc-coreglow 3.2s ease-in-out infinite;animation-delay:0s,${(buildEnd + 1).toFixed(2)}s;}
.ctx-connected-context .cc-silo{transform-box:fill-box;transform-origin:center;animation:cc-load .6s cubic-bezier(.2,.8,.3,1) both,cc-shimmer 3.4s ease-in-out infinite;}
${siloDelays}
@keyframes cc-pop{from{opacity:0;transform:scale(0);}60%{transform:scale(1.12);}}
@keyframes cc-sweep{0%,100%{opacity:.8;}50%{opacity:1;}}
@keyframes cc-coreglow{0%,100%{opacity:1;}50%{opacity:.72;}}
@keyframes cc-load{0%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(.3);}70%{opacity:1;}100%{opacity:1;transform:translate(0,0) scale(1);}}
@keyframes cc-shimmer{0%,100%{opacity:.82;}50%{opacity:1;}}
@keyframes cc-breathe{0%,100%{transform:scale(1);}50%{transform:scale(1.012);}}`,
  };
}
