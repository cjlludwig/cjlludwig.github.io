// lost-in-the-middle: positional attention is high at the start and end of the
// prompt and degrades in the middle. The curve is built with d3.line + curveBasis
// at build time and serialized to a static path; no D3 ships to the client.
//
// Motion couples the two halves so they read as one mechanism: a probe rides the
// curve left->right and a lift/flicker wave sweeps the token strip in sync, so
// edge tokens jump as the probe passes and the middle band stays flat and dims.
import * as d3 from 'd3';
import { line, rect, text, path, circle, group, color } from './_lib.js';

const VB = '0 0 640 380';
const X0 = 78, X1 = 562, YB = 250, YT = 86;

// U-shaped positional attention: ~1 at the edges, ~0.16 in the middle
const attention = (p) => 0.16 + 0.84 * Math.pow(Math.abs(2 * p - 1), 1.6);

const C = '.ctx-lost-in-the-middle';
const P = 5;          // probe traverse period (s) — shared by the token wave
const DASH = 1400;    // >= curve length, so the draw-in fully hides then reveals

export default function build() {
  const x = d3.scaleLinear([0, 1], [X0, X1]);
  const y = d3.scaleLinear([0, 1], [YB, YT]);
  const data = d3.range(0, 1.0001, 1 / 72).map((p) => ({ p, a: attention(p) }));

  const curve = d3.line().x((d) => x(d.p)).y((d) => y(d.a)).curve(d3.curveBasis)(data);
  const fill = d3.area().x((d) => x(d.p)).y0(YB).y1((d) => y(d.a)).curve(d3.curveBasis)(data);

  // token strip mirroring the curve's x-range, coloured + animated by attention.
  // Each token's wave is delayed by its position so the pulse tracks the probe.
  const N = 24, gap = 4;
  const tw = (X1 - X0) / N - gap;
  const ty = 290;
  const tokens = [];
  const delays = [];
  for (let i = 0; i < N; i++) {
    const p = (i + 0.5) / N, a = attention(p);
    const tx = X0 + i * (tw + gap);
    delays.push(`${C} .t${i}{animation-delay:${(p * P).toFixed(2)}s;}`);
    if (a >= 0.58) {
      tokens.push(rect(tx, ty, tw, 30, 'load', { rx: 4, cls: `lm-tok wv-hi t${i}` }));
    } else if (a <= 0.34) {
      tokens.push(rect(tx, ty, tw, 30, 'limit', { rx: 4, op: 0.5, cls: `lm-lost t${i}` }));
    } else {
      tokens.push(rect(tx, ty, tw, 30, 'ctx', { rx: 4, op: 0.65, cls: `lm-tok wv-mid t${i}` }));
    }
  }

  // trough geometry — drop a guide from the curve minimum onto the lost band
  const tcx = x(0.5), tcy = y(attention(0.5));

  const defs = `<defs><linearGradient id="lm-grad" gradientUnits="userSpaceOnUse" x1="${X0}" y1="0" x2="${X1}" y2="0">`
    + `<stop offset="0" stop-color="${color('load')}" stop-opacity="0.24"/>`
    + `<stop offset="0.32" stop-color="${color('load')}" stop-opacity="0.06"/>`
    + `<stop offset="0.5" stop-color="${color('load')}" stop-opacity="0.03"/>`
    + `<stop offset="0.68" stop-color="${color('load')}" stop-opacity="0.06"/>`
    + `<stop offset="1" stop-color="${color('load')}" stop-opacity="0.24"/>`
    + `</linearGradient></defs>`;

  // offset-path + base opacity are inline (structural), so the probe is hidden
  // and parked on the curve in the base/reduced-motion state; only the ride
  // animation is gated on `.ctx-in`. (Putting these in `anim` would gate them too,
  // leaving a stray visible dot at the SVG origin before scroll-in.)
  const probe = group(
    circle(0, 0, 10, 'load', { op: 0.28 }) + circle(0, 0, 4, 'load'),
    { cls: 'lm-probe', extra: ` style="opacity:0;offset-path:path('${curve}');offset-rotate:0deg"` }
  );

  const body = [
    defs,
    // axes
    line(X0, YB, X1, YB, 'frame', { sw: 1.5, op: 0.8, cap: 'butt' }),
    line(X0, YB, X0, YT - 6, 'frame', { sw: 1.5, op: 0.8, cap: 'butt' }),
    group(text(X0 - 10, (YB + YT) / 2, 'attention', { anchor: 'middle', size: 13, weight: 600, op: 0.85 }), { cls: 'lm-fade-el', extra: ` transform="rotate(-90 ${X0 - 10} ${(YB + YT) / 2})"` }),
    // attention curve (d3) — washed fill, then the drawn-in stroke
    `<path d="${fill}" style="fill:url(#lm-grad)" class="lm-fill"/>`,
    // trough guide: curve minimum -> lost band (static, survives reduced motion)
    line(tcx, tcy + 4, tcx, ty - 2, 'limit', { sw: 1.5, op: 0.5, dash: '2 5', cap: 'butt' }),
    circle(tcx, tcy, 3.5, 'limit'),
    path(curve, { stroke: 'load', sw: 3, cls: 'lm-curve' }),
    // probe rides the curve
    probe,
    // peak callouts
    text(x(0.04), y(1) - 14, 'start', { anchor: 'start', size: 13, weight: 600, op: 0.85, cls: 'lm-fade-el' }),
    text(x(0.96), y(1) - 14, 'end', { anchor: 'end', size: 13, weight: 600, op: 0.85, cls: 'lm-fade-el' }),
    // token strip
    group(tokens.join(''), { cls: 'lm-strip' }),
    text((X0 + X1) / 2, 336, 'lost in the middle', { anchor: 'middle', size: 14, weight: 700, token: 'limit', cls: 'lm-fade-el' }),
    text(X0, 336, 'position in prompt', { anchor: 'start', size: 12, weight: 600, op: 0.7, cls: 'lm-fade-el' }),
  ].join('\n');

  const anim = `
/* entrance: curve draws in, fill + labels fade up, strip rises */
${C} .lm-curve{stroke-dasharray:${DASH};stroke-dashoffset:0;animation:lm-draw 1s cubic-bezier(.65,.05,.36,1) both;}
@keyframes lm-draw{from{stroke-dashoffset:${DASH};}to{stroke-dashoffset:0;}}
${C} .lm-fill{animation:lm-fade .9s ease .25s both;}
${C} .lm-fade-el{animation:lm-fade .8s ease .3s both;}
@keyframes lm-fade{from{opacity:0;}}
${C} .lm-strip{animation:lm-rise .6s cubic-bezier(.22,.61,.36,1) both;transform-box:fill-box;}
@keyframes lm-rise{from{opacity:0;transform:translateY(10px);}}

/* probe rides the attention curve on a loop */
${C} .lm-probe{animation:lm-ride ${P}s linear infinite;}
@keyframes lm-ride{0%{offset-distance:0%;opacity:0;}5%{opacity:1;}95%{opacity:1;}100%{offset-distance:100%;opacity:0;}}

/* token wave, delayed per position so the pulse tracks the probe */
${C} .lm-tok{transform-box:fill-box;}
${C} .wv-hi{animation:lm-wave-hi ${P}s linear infinite;}
${C} .wv-mid{animation:lm-wave-mid ${P}s linear infinite;}
${C} .lm-lost{animation:lm-flick ${P}s linear infinite;}
@keyframes lm-wave-hi{0%,9%,100%{transform:translateY(0);}3%{transform:translateY(-8px);}}
@keyframes lm-wave-mid{0%,100%{transform:translateY(0);opacity:.65;}3%{transform:translateY(-5px);opacity:1;}9%{transform:translateY(0);opacity:.65;}}
@keyframes lm-flick{0%,100%{opacity:.5;}3%{opacity:.12;}9%{opacity:.5;}}
${delays.join('\n')}`;

  return {
    viewBox: VB,
    body,
    caption: 'Lost in the middle. Models attend most to the start and end of a prompt, so detail buried in the middle is overlooked.',
    ariaLabel: 'A U-shaped attention curve, high at the start and end of the prompt and low in the middle. A probe rides the curve while a strip of tokens below pulses in sync: blue tokens lift at the edges where attention is high, and the amber band in the middle stays flat and flickers where attention is lost.',
    anim,
  };
}
