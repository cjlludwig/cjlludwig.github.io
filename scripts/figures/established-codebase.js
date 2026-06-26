// established-codebase: the pre-existing code, tools, and conventions form a huge
// corpus the session never sees -- the codebase itself, architecture docs,
// historical tickets, spoken conversations, written notes, team conventions. The
// context window holds only a tiny slice, and the field feathers out at the edges
// to imply the corpus runs further than the frame can show (the unknown unknowns).
import { box, rect, text } from './_lib.js';

const VB = '0 0 640 380';
const F = { x: 64, y: 74, cols: 16, rows: 9, cell: 26, gap: 6 };
const fx = (c) => F.x + c * (F.cell + F.gap);
const fy = (r) => F.y + r * (F.cell + F.gap);
const gridCx = F.x + (F.cols * (F.cell + F.gap) - F.gap) / 2;

// the corpus, partitioned into named kinds of pre-existing context
const REGIONS = [
  { c0: 0, c1: 4, r0: 0, r1: 3, label: 'architecture docs' },
  { c0: 5, c1: 10, r0: 0, r1: 3, label: 'historical tickets' },
  { c0: 11, c1: 15, r0: 0, r1: 3, label: 'spoken conversations' },
  { c0: 0, c1: 4, r0: 4, r1: 8, label: 'the codebase' },
  { c0: 5, c1: 10, r0: 4, r1: 8, label: 'written notes' },
  { c0: 11, c1: 15, r0: 4, r1: 8, label: 'conventions' },
];

// the window holds only a tiny slice (3 cols x 2 rows) of the whole corpus
const WC = { c0: 1, c1: 3, r0: 6, r1: 7 };
const inWin = (c, r) => c >= WC.c0 && c <= WC.c1 && r >= WC.r0 && r <= WC.r1;

// small label on a chip so it reads over the dim tiles in both themes
function labelChip(cxp, cyp, label, { size = 12, token = 'text' } = {}) {
  const w = label.length * (size * 0.55) + 18;
  return rect(cxp - w / 2, cyp - 11, w, 22, 'empty', { rx: 6, op: 0.9 }) +
    text(cxp, cyp, label, { size, weight: 700, token });
}

export default function build() {
  const corpus = [], seen = [];
  for (let r = 0; r < F.rows; r++)
    for (let c = 0; c < F.cols; c++) {
      if (inWin(c, r)) seen.push(rect(fx(c), fy(r), F.cell, F.cell, 'load', { rx: 5 }));
      else corpus.push(rect(fx(c), fy(r), F.cell, F.cell, 'ctx', { rx: 5, op: 0.34 }));
    }

  // outlined corpus regions (boxes feather with the field; labels stay crisp)
  const regBoxes = [], regLabels = [];
  REGIONS.forEach((R, i) => {
    const x = fx(R.c0) - 3, y = fy(R.r0) - 3;
    const w = fx(R.c1) + F.cell + 3 - x, h = fy(R.r1) + F.cell + 3 - y;
    const lx = (fx(R.c0) + fx(R.c1) + F.cell) / 2, ly = fy(R.r0) + F.cell / 2;
    regBoxes.push(`<g class="ec-reg r${i}">${box(x, y, w, h, 'frame', { rx: 9, sw: 1.5, op: 0.5, dash: '3 5' })}</g>`);
    regLabels.push(`<g class="ec-lab r${i}">${labelChip(lx, ly, R.label)}</g>`);
  });

  const wx = fx(WC.c0) - 5, wy = fy(WC.r0) - 5;
  const ww = fx(WC.c1) + F.cell - fx(WC.c0) + 10, wh = fy(WC.r1) + F.cell - fy(WC.r0) + 10;

  // soft vignette: the tile field + region outlines dissolve at the outer edges,
  // implying the corpus runs further than the frame can show (the unknown unknowns).
  const gx0 = fx(0), gy0 = fy(0);
  const gx1 = fx(F.cols - 1) + F.cell, gy1 = fy(F.rows - 1) + F.cell;
  const INS = 4, BLUR = 26;
  const defs = `<defs>`
    + `<filter id="ec-soft" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="${BLUR}"/></filter>`
    + `<mask id="ec-vignette" maskUnits="userSpaceOnUse" x="${gx0 - 60}" y="${gy0 - 60}" width="${gx1 - gx0 + 120}" height="${gy1 - gy0 + 120}">`
    + `<rect x="${gx0 + INS}" y="${gy0 + INS}" width="${gx1 - gx0 - 2 * INS}" height="${gy1 - gy0 - 2 * INS}" fill="#fff" filter="url(#ec-soft)"/>`
    + `</mask></defs>`;

  const body = [
    defs,
    text(gridCx, 46, 'pre-existing context the session never sees', { anchor: 'middle', size: 15, weight: 700, op: 0.85 }),
    `<g mask="url(#ec-vignette)"><g class="ec-corpus">${corpus.join('')}</g>${regBoxes.join('')}</g>`,
    regLabels.join(''),
    box(wx, wy, ww, wh, 'load', { rx: 10, sw: 2.5, cls: 'win' }),
    `<g class="ec-seen">${seen.join('')}</g>`,
    text(wx, wy - 9, 'context window', { anchor: 'start', size: 13, weight: 700, token: 'load' }),
  ].join('\n');

  // per-region entrance stagger
  const delays = REGIONS.map((_, i) => `.ctx-established-codebase .r${i}{animation-delay:${(0.2 + i * 0.09).toFixed(2)}s;}`).join('\n');

  return {
    viewBox: VB,
    body,
    caption: 'An established codebase. The code itself, plus architecture docs, historical tickets, spoken conversations, written notes, and conventions, forms a vast corpus the session never sees; the context window only ever holds a tiny slice of the total context.',
    ariaLabel: 'A large grid of dim context tiles fills the frame under the heading pre-existing context the session never sees, partitioned into labelled regions: architecture docs, historical tickets, spoken conversations, the codebase, written notes, and team conventions. A small bright-bordered context window sits inside the codebase region, enclosing only a tiny cluster of its tiles, showing how little of even the code the session actually holds. The tile field dissolves softly at the outer edges, implying the corpus extends beyond the frame.',
    anim: `
.ctx-established-codebase .ec-corpus{animation:ec-fade .8s ease both;}
.ctx-established-codebase .ec-reg,.ctx-established-codebase .ec-lab{animation:ec-fade .6s ease both;}
${delays}
.ctx-established-codebase .ec-seen{animation:ec-rise .6s cubic-bezier(.22,.61,.36,1) .75s both;transform-box:fill-box;}
.ctx-established-codebase .win{transform-origin:center;animation:ec-win 3.6s cubic-bezier(.4,0,.2,1) .75s infinite;}
@keyframes ec-fade{from{opacity:0;}}
@keyframes ec-rise{from{opacity:0;transform:translateY(8px);}}
@keyframes ec-win{0%,100%{opacity:.7;}50%{opacity:1;}}`,
  };
}
