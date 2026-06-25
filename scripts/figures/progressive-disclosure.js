// progressive-disclosure: a large field of available context, most of it dim and
// unloaded. Relevant pieces are retrieved into the window on demand: a live frontier
// (hot blue) loads in, accumulating as loaded context (darker blue) behind it.
import { box, rect, text, path, group } from './_lib.js';

const VB = '0 0 640 380';

// left: the available context (codebase, docs, tickets)
const F = { x: 56, y: 96, cols: 6, rows: 7, cell: 20, gap: 10 };
const fx = (c) => F.x + c * (F.cell + F.gap);
const fy = (r) => F.y + r * (F.cell + F.gap);
const relevant = [[5, 1], [4, 3], [5, 5]];
const isRel = (c, r) => relevant.some(([rc, rr]) => rc === c && rr === r);

// right: the context window with its own inner tile grid
const W = { x: 404, y: 84, w: 196, h: 224, rx: 12 };
const G = { cols: 4, rows: 5, cell: 24, gap: 10 };
const gw = G.cols * (G.cell + G.gap) - G.gap;
const gx0 = W.x + (W.w - gw) / 2;
const gy0 = W.y + 54;
const gx = (c) => gx0 + c * (G.cell + G.gap);
const gy = (r) => gy0 + r * (G.cell + G.gap);
const hotRows = [1, 2, 3]; // left-column frontier tiles being hot-loaded

export default function build() {
  // available-context field
  const field = [];
  for (let r = 0; r < F.rows; r++)
    for (let c = 0; c < F.cols; c++) {
      if (isRel(c, r)) continue;
      field.push(rect(fx(c), fy(r), F.cell, F.cell, 'ctx', { rx: 4, op: 0.5 }));
    }
  const sources = relevant.map(([c, r]) => rect(fx(c), fy(r), F.cell, F.cell, 'load', { rx: 4 }));

  // window grid: row 0 is open capacity; behind the frontier is accumulated
  // loaded context (darker blue); the left-column frontier is hot-loading.
  const tiles = [], hot = [];
  for (let r = 0; r < G.rows; r++)
    for (let c = 0; c < G.cols; c++) {
      if (r === 0) { tiles.push(rect(gx(c), gy(r), G.cell, G.cell, 'empty', { rx: 5 })); continue; }
      if (c === 0 && hotRows.includes(r)) continue; // frontier drawn separately
      tiles.push(rect(gx(c), gy(r), G.cell, G.cell, 'loadDim', { rx: 5 }));
    }
  hotRows.forEach((r, i) => hot.push(rect(gx(0), gy(r), G.cell, G.cell, 'loadHot', { rx: 5, cls: `hot h${i}` })));

  // connectors from each source to its frontier tile + travelling pulse
  const links = [], pulses = [];
  relevant.forEach(([c, r], i) => {
    const x1 = fx(c) + F.cell, y1 = fy(r) + F.cell / 2;
    const x2 = gx(0), y2 = gy(hotRows[i]) + G.cell / 2;
    const dx = (x2 - x1) * 0.5;
    const d = `M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
    links.push(path(d, { stroke: 'loadHot', sw: 2, op: 0.45 }));
    pulses.push(`<circle r="4.5" class="pulse p${i}" style="fill:var(--loadHot);opacity:0;offset-path:path('${d}');"/>`);
  });

  const body = [
    text(fx(0), F.y - 16, 'available context', { anchor: 'start', size: 14, weight: 700, op: 0.9 }),
    group(field.join(''), {}),
    group(sources.join(''), {}),
    box(W.x, W.y, W.w, W.h, 'frame', { rx: W.rx, sw: 3, fill: 'win' }),
    text(W.x + 16, W.y + 20, 'context window', { anchor: 'start', size: 13, weight: 700, op: 0.8 }),
    text(W.x + 16, W.y + 38, 'loaded on demand', { anchor: 'start', size: 12, weight: 600, op: 0.7 }),
    group(tiles.join(''), {}),
    group(links.join(''), { cls: 'links' }),
    group(hot.join(''), {}),
    group(pulses.join(''), { cls: 'pulses' }),
  ].join('\n');

  return {
    viewBox: VB,
    body,
    caption: 'Progressive disclosure. Most of the codebase stays unloaded; only the pieces relevant to the task are retrieved into the window when they are needed.',
    ariaLabel: 'On the left, a field of dim unloaded context with a few highlighted as relevant. Curved connectors carry those into the context window on the right, where a bright frontier of hot-loaded tiles is backed by darker-blue accumulated context, with open capacity left at the top.',
    anim: `
.ctx-progressive-disclosure .hot{animation:pd-hot 2.8s cubic-bezier(.4,0,.2,1) infinite;}
.ctx-progressive-disclosure .h1{animation-delay:.5s;}
.ctx-progressive-disclosure .h2{animation-delay:1s;}
.ctx-progressive-disclosure .pulse{offset-rotate:0deg;animation:pd-flow 2.8s cubic-bezier(.45,0,.55,1) infinite;}
.ctx-progressive-disclosure .p1{animation-delay:.5s;}
.ctx-progressive-disclosure .p2{animation-delay:1s;}
@keyframes pd-flow{0%{offset-distance:0%;opacity:0;}12%{opacity:1;}78%{opacity:1;}100%{offset-distance:100%;opacity:0;}}
@keyframes pd-hot{0%,100%{opacity:.78;}50%{opacity:1;}}`,
  };
}
