// Shared helpers for build-time blog figures.
//
// Figures are authored as small ESM modules that return
//   { viewBox, body, caption, ariaLabel, anim }
// and are assembled into themeable, static, inline SVG by `assemble()`.
//
// Legend (one color per concept, max two accents on a neutral ground):
//   load   (accent A, blue)  -> context that is loaded / in-window / attended
//   empty  (neutral)         -> capacity that is available but unloaded
//   limit  (accent B, amber) -> the constraint: hard limit + attention loss
//   frame  (neutral line)    -> structure (window border, axes)
//   text                     -> sparse inline labels
//
// Colors come from CSS custom properties so the existing `html.dark .ctxN`
// override pattern themes every figure. A `png` mode inlines literal colors so
// the build can rasterize figures with librsvg/sharp for verification.

let MODE = 'css';      // 'css' (production) | 'png' (rasterize for review)
let THEME = 'light';   // only used in png mode

const PALETTE = {
  // Blue family = context that lives in the window:
  //   loadDim = pre-existing/older context, load = current/new, loadHot = retrieved on demand
  // empty = available capacity, ctx = unloaded neutral, limit = the hard cap (accent B)
  light: { frame: '#b7afa0', empty: '#ece8df', ctx: '#cdc6b8', loadDim: '#33408a', load: '#1a4fd4', loadHot: '#4d8df2', limit: '#c2620a', text: '#6f6a60', win: '#1a1a2008' },
  dark: { frame: '#46465a', empty: '#17171f', ctx: '#34343f', loadDim: '#3b4a85', load: '#6384f0', loadHot: '#86b3ff', limit: '#f5a524', text: '#9a93ab', win: '#ffffff0a' },
};

export function setMode(mode, theme = 'light') { MODE = mode; THEME = theme; }

// color value: a CSS var in production, a literal hex when rasterizing
function cv(token) {
  if (token === 'none') return 'none';
  return MODE === 'png' ? PALETTE[THEME][token] : `var(--${token})`;
}

// mode-aware color for raw markup (e.g. gradient stops) the element helpers
// don't cover.
export function color(token) { return cv(token); }

const n = (v) => (Number.isInteger(v) ? v : +(+v).toFixed(2));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => esc(s).replace(/"/g, '&quot;');

// ---- element helpers --------------------------------------------------------
export function rect(x, y, w, h, token, { rx = 0, op, cls = '', extra = '' } = {}) {
  let s = `fill:${cv(token)}`;
  if (op != null) s += `;opacity:${op}`;
  return `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"${rx ? ` rx="${n(rx)}"` : ''} style="${s}"${cls ? ` class="${cls}"` : ''}${extra}/>`;
}
export function box(x, y, w, h, strokeTok, { rx = 0, sw = 2, fill = 'none', op, cls = '', dash = '' } = {}) {
  let s = `fill:${cv(fill)};stroke:${cv(strokeTok)};stroke-width:${sw}`;
  if (dash) s += `;stroke-dasharray:${dash}`;
  if (op != null) s += `;opacity:${op}`;
  return `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}"${rx ? ` rx="${n(rx)}"` : ''} style="${s}"${cls ? ` class="${cls}"` : ''}/>`;
}
export function line(x1, y1, x2, y2, strokeTok, { sw = 2, op, cls = '', dash = '', cap = 'round' } = {}) {
  let s = `stroke:${cv(strokeTok)};stroke-width:${sw};stroke-linecap:${cap};fill:none`;
  if (dash) s += `;stroke-dasharray:${dash}`;
  if (op != null) s += `;opacity:${op}`;
  return `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" style="${s}"${cls ? ` class="${cls}"` : ''}/>`;
}
export function path(d, { stroke, fill = 'none', sw = 2, op, cls = '', join = 'round', cap = 'round', extra = '' } = {}) {
  let s = `fill:${cv(fill)}`;
  if (stroke) s += `;stroke:${cv(stroke)};stroke-width:${sw};stroke-linejoin:${join};stroke-linecap:${cap}`;
  if (op != null) s += `;opacity:${op}`;
  return `<path d="${d}" style="${s}"${cls ? ` class="${cls}"` : ''}${extra}/>`;
}
export function circle(cx, cy, r, token, { op, cls = '', stroke, sw = 0 } = {}) {
  let s = `fill:${cv(token)}`;
  if (stroke) s += `;stroke:${cv(stroke)};stroke-width:${sw}`;
  if (op != null) s += `;opacity:${op}`;
  return `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" style="${s}"${cls ? ` class="${cls}"` : ''}/>`;
}
export function text(x, y, str, { size = 15, anchor = 'middle', token = 'text', weight = 600, cls = '', op } = {}) {
  let s = `fill:${cv(token)};font-weight:${weight};font-size:${size}px`;
  if (op != null) s += `;opacity:${op}`;
  return `<text x="${n(x)}" y="${n(y)}" text-anchor="${anchor}" dominant-baseline="middle" style="${s}"${cls ? ` class="${cls}"` : ''}>${esc(str)}</text>`;
}
export function group(inner, { cls = '', extra = '' } = {}) {
  return `<g${cls ? ` class="${cls}"` : ''}${extra}>${inner}</g>`;
}

// ---- assembly ---------------------------------------------------------------
function paletteCss(cls, anim) {
  const vars = (t) => Object.entries(PALETTE[t]).map(([k, v]) => `--${k}:${v};`).join('');
  // Gate animations on `.ctx-in` (added by the client when the figure scrolls into
  // view) so the build plays on-screen instead of finishing before it is seen. Every
  // animation selector is scoped `.${cls} ...`, so this rewrite reaches all of them.
  // Without `.ctx-in` no animation applies and the fully-resolved base state shows,
  // which also keeps no-JS / pre-hydration renders correct.
  const gated = (anim || '').replaceAll(`.${cls} `, `.${cls}.ctx-in `);
  return `
.${cls}{${vars('light')}}
html.dark .${cls}{${vars('dark')}}
.${cls} svg{display:block;width:100%;height:auto;overflow:visible;}
.${cls} text{font-family:var(--font-sans,system-ui,-apple-system,sans-serif);letter-spacing:.01em;}
${gated}
@media (prefers-reduced-motion:reduce){.${cls} *{animation:none!important;transition:none!important;}}`;
}

// Full <figure> for production (css mode).
export function assemble(name, fig) {
  const cls = `ctx-${name}`;
  return `<figure class="ctx-fig ${cls}">
<style>${paletteCss(cls, fig.anim)}</style>
<svg viewBox="${fig.viewBox}" role="img" aria-label="${escAttr(fig.ariaLabel)}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
${fig.body}
</svg>
<figcaption>${esc(fig.caption)}</figcaption>
</figure>`;
}

// Standalone, self-colored SVG for rasterized review (png mode).
export function standaloneSVG(fig, theme = 'light') {
  const [, , w, h] = fig.viewBox.split(/\s+/).map(Number);
  const bg = theme === 'dark' ? '#09090f' : '#faf9f7';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w * 2}" height="${h * 2}" viewBox="${fig.viewBox}"><rect x="0" y="0" width="${w}" height="${h}" fill="${bg}"/>${fig.body}</svg>`;
}

export { n, esc, escAttr };
