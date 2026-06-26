// finite-window: a finite window full to a hard limit. Distinct context tiles
// stream in at the bottom and the field ticks upward one row per beat; the oldest
// row rises into the limit line and dissolves (eviction). Each tile carries its
// own brightness so the upward motion is actually visible, and the texture repeats
// every VIS_ROWS rows so the step loop is seamless. A fixed vertical fade handles
// enter-at-bottom / evict-at-limit. No JS ships to the client.
import { box, rect, line, text } from './_lib.js';

const VB = '0 0 640 380';
const W = { x: 70, y: 46, w: 500, h: 300, rx: 14 };
const COLS = 14, CELL = 24, GAP = 8, PITCH = CELL + GAP;
const startX = 100, startY = 86;
const VIS_ROWS = 8;
const BEAT = 0.85;                   // seconds per one-row tick
const PERIOD_ROWS = 2 * VIS_ROWS;    // ramp repeats every 2 windows -> one ramp fills the view
const TILT = 0.3;                    // column phase shift -> diagonal bottom-left -> top-right
const TOTAL_ROWS = VIS_ROWS + PERIOD_ROWS + 1; // cover the window across a full cycle
const cx = (c) => startX + c * PITCH;
const cy = (r) => startY + r * PITCH;
const LIMIT_Y = startY - 8;
const gridW = COLS * PITCH - GAP;
const clipBottom = cy(VIS_ROWS - 1) + CELL;
const H = clipBottom - LIMIT_Y;
const maskX = startX - 4, maskW = gridW + 8;

// Recency ramp: a smooth diagonal gradient sloping bottom-left (newest, bright) to
// top-right (oldest, dim). cos keeps it seamless across the PERIOD_ROWS repeat, and
// the column term tilts the front so the flow reads as bottom-left -> top-right.
const tileOp = (r, c) => {
  const phase = (r % PERIOD_ROWS) / PERIOD_ROWS + (1 - c / (COLS - 1)) * TILT;
  return +(0.5 + 0.225 * (1 + Math.cos(2 * Math.PI * phase))).toFixed(2);
};

export default function build() {
  // ramp repeats every PERIOD_ROWS rows -> a one-row step stays seamless over a cycle
  const tiles = [];
  for (let r = 0; r < TOTAL_ROWS; r++)
    for (let c = 0; c < COLS; c++)
      tiles.push(rect(cx(c), cy(r), CELL, CELL, 'load', { rx: 5, op: tileOp(r, c) }));

  const clipId = 'ctx-fw-clip';
  const maskId = 'ctx-fw-fade';
  const gradId = 'ctx-fw-fadeg';

  const clip = `<clipPath id="${clipId}"><rect x="${maskX}" y="${LIMIT_Y}" width="${maskW}" height="${H}"/></clipPath>`;

  // fixed fade: invisible at the limit (evict), full through the body, partly faded
  // at the very bottom so new rows ease in rather than pop at the clip edge.
  const mask = `<mask id="${maskId}" maskUnits="userSpaceOnUse" x="${maskX}" y="${LIMIT_Y}" width="${maskW}" height="${H}">`
    + `<linearGradient id="${gradId}" gradientUnits="userSpaceOnUse" x1="0" y1="${LIMIT_Y}" x2="0" y2="${clipBottom}">`
    + `<stop offset="0" stop-color="#fff" stop-opacity="0"/>`
    + `<stop offset="0.16" stop-color="#fff" stop-opacity="0.92"/>`
    + `<stop offset="0.82" stop-color="#fff" stop-opacity="1"/>`
    + `<stop offset="1" stop-color="#fff" stop-opacity="0.4"/>`
    + `</linearGradient>`
    + `<rect x="${maskX}" y="${LIMIT_Y}" width="${maskW}" height="${H}" fill="url(#${gradId})"/></mask>`;

  const conveyor = `<g clip-path="url(#${clipId})" mask="url(#${maskId})"><g class="flow">\n${tiles.join('')}\n</g></g>`;

  const body = [
    clip,
    mask,
    box(W.x, W.y, W.w, W.h, 'frame', { rx: W.rx, sw: 3, fill: 'win' }),
    text(W.x + 16, W.y + 20, 'context window', { anchor: 'start', size: 13, weight: 600, op: 0.75 }),
    conveyor,
    line(startX - 6, LIMIT_Y, startX + gridW + 6, LIMIT_Y, 'limit', { sw: 3.5, cls: 'limit' }),
    text(startX + gridW + 6, LIMIT_Y - 12, 'context limit', { anchor: 'end', size: 14, weight: 700, token: 'limit' }),
  ].join('\n');

  const T = (PERIOD_ROWS * BEAT).toFixed(1); // one full cycle = PERIOD_ROWS ticks

  return {
    viewBox: VB,
    body,
    caption: 'A finite window. Fresh context streams in at the bottom-left and ages along the grid; the window ticks upward one context chunk at a time, and the oldest context rises into the hard limit and is evicted to make room.',
    ariaLabel: 'A finite context window filled with blue tiles up to a bold amber limit line at the top. The tiles form a diagonal brightness gradient, brightest at the bottom-left where fresh context enters and dimming toward the top-right where it ages. The grid ticks upward one row per beat, and the oldest row rises into the limit line and dissolves as it is evicted.',
    anim: `
.ctx-finite-window .flow{animation:fw-flow ${T}s steps(${PERIOD_ROWS},end) infinite;}
@keyframes fw-flow{from{transform:translateY(0);}to{transform:translateY(-${PERIOD_ROWS * PITCH}px);}}
.ctx-finite-window .limit{animation:fw-flare ${BEAT}s ease infinite;}
@keyframes fw-flare{0%{opacity:1;stroke-width:5.5;}18%{opacity:.7;stroke-width:3.5;}82%{opacity:.7;stroke-width:3.5;}100%{opacity:1;stroke-width:5.5;}}`,
  };
}
