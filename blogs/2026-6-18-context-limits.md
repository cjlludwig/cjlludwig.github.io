---
title: "AI Context Window Limits in the Real World"
date: "2026-06-18T12:00:00Z"
slug: "ai-context-window-limits"
description: "Why AI coding agents struggle in large codebases, and how context windows, AI memory, and lost-in-the-middle behavior shape real adoption."
tags: ["ai context window", "ai limits", "ai memory", "ai coding agents", "context engineering", "large codebases", "ai adoption"]
image: ""
---

The general back and forth about the unbounded potential of AI to takeover jobs VS barely being able to often seems largely disconnected from the technical underpinnings at play and I'd like to dive deeper into it.

First, where does AI succeed reliably today? Most of the biggest wins for AI implementations are in well-defined tasks or open-ended asks, with the most impressive being in greenfield initiatives. These are areas where the only variables at play are the input to the AI, so constraints are minimal and the AI can operate with fewer hidden bounds. You see this in almost all vibe-coded projects and highly publicized AI managed releases like Claude Code, Codex, etc. The solution space didn't have to account for much pre-existing context because it was truly open-ended. The user didn't need to have strong opinions on the "how" of implementation because there were few constraints needed outside of the "goal" of the prompt and any requirements provided there.

I like to think of these cases as having a small "seed" to germinate the resulting project from, this metaphor will make more sense moving forward.

<figure class="ctx-fig ctx1">
<style>
.ctx1{--seed:#1a4fd4;--seedH:#5b82ea;--grn:#2e9e64;--grnH:#5fd29a;--blk:#c5beb1;--blkD:#ddd7cc;--acc:#1a4fd4;--accH:#5b82ea;--soil:#b3a994;}
html.dark .ctx1{--seed:#5b82ea;--seedH:#9db4f5;--grn:#3fb37c;--grnH:#74e2ac;--blk:#33333f;--blkD:#23232e;--acc:#5b82ea;--accH:#9db4f5;--soil:#2a2a36;}
.ctx1 svg{shape-rendering:crispEdges;}
.ctx1 .p-seed{fill:var(--seed);}.ctx1 .p-seedH{fill:var(--seedH);}
.ctx1 .p-grn{fill:var(--grn);}.ctx1 .p-grnH{fill:var(--grnH);}
.ctx1 .p-blk{fill:var(--blk);}.ctx1 .p-blkD{fill:var(--blkD);}
.ctx1 .p-acc{fill:var(--acc);}.ctx1 .p-accH{fill:var(--accH);}
.ctx1 .p-soil{fill:var(--soil);}
.ctx1 .p-dot{fill:var(--acc);opacity:.22;}
.ctx1 .p-fill{fill:var(--acc);opacity:.2;}
.ctx1 .p-limit{fill:var(--acc);}
.ctx1 .bite{fill:var(--acc);}
.ctx1 .link{stroke:var(--acc);stroke-width:2;opacity:.32;fill:none;}
@media (prefers-reduced-motion:reduce){.ctx1 [class*="grow"],.ctx1 [class*="tide"],.ctx1 [class*="sprout"]{clip-path:none!important;animation:none!important;transform:none!important;}}
.ctx1 .sprout1{clip-path:inset(100% 0 0 0);animation:c1 4.8s steps(11,end) infinite;}
@keyframes c1{0%{clip-path:inset(100% 0 0 0);}38%{clip-path:inset(0 0 0 0);}86%{clip-path:inset(0 0 0 0);}89%{clip-path:inset(100% 0 0 0);}100%{clip-path:inset(100% 0 0 0);}}</style>
<svg viewBox="0 0 640 352" role="img" aria-label="A tiny pixel seed on open ground germinates and grows a tall sprout, over and over, in open space.">
<rect class="p-soil" x="80" y="256" width="16" height="16"/>
<rect class="p-soil" x="96" y="256" width="16" height="16"/>
<rect class="p-soil" x="112" y="256" width="16" height="16"/>
<rect class="p-soil" x="128" y="256" width="16" height="16"/>
<rect class="p-soil" x="144" y="256" width="16" height="16"/>
<rect class="p-soil" x="160" y="256" width="16" height="16"/>
<rect class="p-soil" x="176" y="256" width="16" height="16"/>
<rect class="p-soil" x="192" y="256" width="16" height="16"/>
<rect class="p-soil" x="208" y="256" width="16" height="16"/>
<rect class="p-soil" x="224" y="256" width="16" height="16"/>
<rect class="p-soil" x="240" y="256" width="16" height="16"/>
<rect class="p-soil" x="256" y="256" width="16" height="16"/>
<rect class="p-soil" x="272" y="256" width="16" height="16"/>
<rect class="p-soil" x="288" y="256" width="16" height="16"/>
<rect class="p-soil" x="304" y="256" width="16" height="16"/>
<rect class="p-soil" x="320" y="256" width="16" height="16"/>
<rect class="p-soil" x="336" y="256" width="16" height="16"/>
<rect class="p-soil" x="352" y="256" width="16" height="16"/>
<rect class="p-soil" x="368" y="256" width="16" height="16"/>
<rect class="p-soil" x="384" y="256" width="16" height="16"/>
<rect class="p-soil" x="400" y="256" width="16" height="16"/>
<rect class="p-soil" x="416" y="256" width="16" height="16"/>
<rect class="p-soil" x="432" y="256" width="16" height="16"/>
<rect class="p-soil" x="448" y="256" width="16" height="16"/>
<rect class="p-soil" x="464" y="256" width="16" height="16"/>
<rect class="p-soil" x="480" y="256" width="16" height="16"/>
<rect class="p-soil" x="496" y="256" width="16" height="16"/>
<rect class="p-soil" x="512" y="256" width="16" height="16"/>
<rect class="p-soil" x="528" y="256" width="16" height="16"/>
<rect class="p-soil" x="544" y="256" width="16" height="16"/>
<rect class="p-soil" x="80" y="272" width="16" height="16"/>
<rect class="p-soil" x="96" y="272" width="16" height="16"/>
<rect class="p-soil" x="112" y="272" width="16" height="16"/>
<rect class="p-soil" x="128" y="272" width="16" height="16"/>
<rect class="p-soil" x="144" y="272" width="16" height="16"/>
<rect class="p-soil" x="160" y="272" width="16" height="16"/>
<rect class="p-soil" x="176" y="272" width="16" height="16"/>
<rect class="p-soil" x="192" y="272" width="16" height="16"/>
<rect class="p-soil" x="208" y="272" width="16" height="16"/>
<rect class="p-soil" x="224" y="272" width="16" height="16"/>
<rect class="p-soil" x="240" y="272" width="16" height="16"/>
<rect class="p-soil" x="256" y="272" width="16" height="16"/>
<rect class="p-soil" x="272" y="272" width="16" height="16"/>
<rect class="p-soil" x="288" y="272" width="16" height="16"/>
<rect class="p-soil" x="304" y="272" width="16" height="16"/>
<rect class="p-soil" x="320" y="272" width="16" height="16"/>
<rect class="p-soil" x="336" y="272" width="16" height="16"/>
<rect class="p-soil" x="352" y="272" width="16" height="16"/>
<rect class="p-soil" x="368" y="272" width="16" height="16"/>
<rect class="p-soil" x="384" y="272" width="16" height="16"/>
<rect class="p-soil" x="400" y="272" width="16" height="16"/>
<rect class="p-soil" x="416" y="272" width="16" height="16"/>
<rect class="p-soil" x="432" y="272" width="16" height="16"/>
<rect class="p-soil" x="448" y="272" width="16" height="16"/>
<rect class="p-soil" x="464" y="272" width="16" height="16"/>
<rect class="p-soil" x="480" y="272" width="16" height="16"/>
<rect class="p-soil" x="496" y="272" width="16" height="16"/>
<rect class="p-soil" x="512" y="272" width="16" height="16"/>
<rect class="p-soil" x="528" y="272" width="16" height="16"/>
<rect class="p-soil" x="544" y="272" width="16" height="16"/>
<g class="sprout1">
<rect class="p-grn" x="304" y="48" width="16" height="16"/>
<rect class="p-grn" x="320" y="48" width="16" height="16"/>
<rect class="p-grnH" x="288" y="64" width="16" height="16"/>
<rect class="p-grn" x="304" y="64" width="16" height="16"/>
<rect class="p-grn" x="320" y="64" width="16" height="16"/>
<rect class="p-grnH" x="336" y="64" width="16" height="16"/>
<rect class="p-grn" x="304" y="80" width="16" height="16"/>
<rect class="p-grn" x="320" y="80" width="16" height="16"/>
<rect class="p-grnH" x="288" y="96" width="16" height="16"/>
<rect class="p-grn" x="304" y="96" width="16" height="16"/>
<rect class="p-grn" x="320" y="96" width="16" height="16"/>
<rect class="p-grnH" x="272" y="112" width="16" height="16"/>
<rect class="p-grn" x="304" y="112" width="16" height="16"/>
<rect class="p-grn" x="320" y="112" width="16" height="16"/>
<rect class="p-grn" x="304" y="128" width="16" height="16"/>
<rect class="p-grn" x="320" y="128" width="16" height="16"/>
<rect class="p-grn" x="304" y="144" width="16" height="16"/>
<rect class="p-grn" x="320" y="144" width="16" height="16"/>
<rect class="p-grnH" x="336" y="144" width="16" height="16"/>
<rect class="p-grn" x="304" y="160" width="16" height="16"/>
<rect class="p-grn" x="320" y="160" width="16" height="16"/>
<rect class="p-grnH" x="352" y="160" width="16" height="16"/>
<rect class="p-grn" x="304" y="176" width="16" height="16"/>
<rect class="p-grn" x="320" y="176" width="16" height="16"/>
<rect class="p-grn" x="304" y="192" width="16" height="16"/>
<rect class="p-grn" x="320" y="192" width="16" height="16"/>
<rect class="p-grn" x="304" y="208" width="16" height="16"/>
<rect class="p-grn" x="320" y="208" width="16" height="16"/>
</g>
<rect class="p-seed" x="304" y="224" width="16" height="16"/>
<rect class="p-seedH" x="320" y="224" width="16" height="16"/>
<rect class="p-seedH" x="304" y="240" width="16" height="16"/>
<rect class="p-seed" x="320" y="240" width="16" height="16"/>
</svg>
<figcaption>A greenfield seed. From a tiny prompt, with open space and few constraints, it germinates and grows freely.</figcaption>
</figure>

Next, where does AI tend to publicly struggle? Almost any application into a well-established domain, product, or workflow quickly decays into frustrating results. The same small seed of initial prompt doesn't reliably meet the desired end state because there are bounds that are almost always implicitly ignored in the initial seed. Things like pre-existing codebases, existing tool-sets, company conventions, etc all influence what "done" looks like in established products. You can't just maverick a novel toolset and codebase and expect it to work seamlessly with millions of lines of code already working in production.

<figure class="ctx-fig ctx2">
<style>
.ctx2{--seed:#1a4fd4;--seedH:#5b82ea;--grn:#2e9e64;--grnH:#5fd29a;--blk:#c5beb1;--blkD:#ddd7cc;--acc:#1a4fd4;--accH:#5b82ea;--soil:#b3a994;}
html.dark .ctx2{--seed:#5b82ea;--seedH:#9db4f5;--grn:#3fb37c;--grnH:#74e2ac;--blk:#33333f;--blkD:#23232e;--acc:#5b82ea;--accH:#9db4f5;--soil:#2a2a36;}
.ctx2 svg{shape-rendering:crispEdges;}
.ctx2 .p-seed{fill:var(--seed);}.ctx2 .p-seedH{fill:var(--seedH);}
.ctx2 .p-grn{fill:var(--grn);}.ctx2 .p-grnH{fill:var(--grnH);}
.ctx2 .p-blk{fill:var(--blk);}.ctx2 .p-blkD{fill:var(--blkD);}
.ctx2 .p-acc{fill:var(--acc);}.ctx2 .p-accH{fill:var(--accH);}
.ctx2 .p-soil{fill:var(--soil);}
.ctx2 .p-dot{fill:var(--acc);opacity:.22;}
.ctx2 .p-fill{fill:var(--acc);opacity:.2;}
.ctx2 .p-limit{fill:var(--acc);}
.ctx2 .bite{fill:var(--acc);}
.ctx2 .link{stroke:var(--acc);stroke-width:2;opacity:.32;fill:none;}
@media (prefers-reduced-motion:reduce){.ctx2 [class*="grow"],.ctx2 [class*="tide"],.ctx2 [class*="sprout"]{clip-path:none!important;animation:none!important;transform:none!important;}}
.ctx2 .sprout2{transform-box:fill-box;transform-origin:bottom center;animation:c2 5s ease-in-out infinite;}
@keyframes c2{0%,100%{transform:rotate(-2.2deg);}50%{transform:rotate(2.2deg);}}</style>
<svg viewBox="0 0 640 352" role="img" aria-label="The same seed sits on the ground but is walled in by a dense brick field of pre-existing blocks; a thin sprout sways as it threads up through a narrow crack.">
<rect class="p-soil" x="80" y="256" width="16" height="16"/>
<rect class="p-soil" x="96" y="256" width="16" height="16"/>
<rect class="p-soil" x="112" y="256" width="16" height="16"/>
<rect class="p-soil" x="128" y="256" width="16" height="16"/>
<rect class="p-soil" x="144" y="256" width="16" height="16"/>
<rect class="p-soil" x="160" y="256" width="16" height="16"/>
<rect class="p-soil" x="176" y="256" width="16" height="16"/>
<rect class="p-soil" x="192" y="256" width="16" height="16"/>
<rect class="p-soil" x="208" y="256" width="16" height="16"/>
<rect class="p-soil" x="224" y="256" width="16" height="16"/>
<rect class="p-soil" x="240" y="256" width="16" height="16"/>
<rect class="p-soil" x="256" y="256" width="16" height="16"/>
<rect class="p-soil" x="272" y="256" width="16" height="16"/>
<rect class="p-soil" x="288" y="256" width="16" height="16"/>
<rect class="p-soil" x="304" y="256" width="16" height="16"/>
<rect class="p-soil" x="320" y="256" width="16" height="16"/>
<rect class="p-soil" x="336" y="256" width="16" height="16"/>
<rect class="p-soil" x="352" y="256" width="16" height="16"/>
<rect class="p-soil" x="368" y="256" width="16" height="16"/>
<rect class="p-soil" x="384" y="256" width="16" height="16"/>
<rect class="p-soil" x="400" y="256" width="16" height="16"/>
<rect class="p-soil" x="416" y="256" width="16" height="16"/>
<rect class="p-soil" x="432" y="256" width="16" height="16"/>
<rect class="p-soil" x="448" y="256" width="16" height="16"/>
<rect class="p-soil" x="464" y="256" width="16" height="16"/>
<rect class="p-soil" x="480" y="256" width="16" height="16"/>
<rect class="p-soil" x="496" y="256" width="16" height="16"/>
<rect class="p-soil" x="512" y="256" width="16" height="16"/>
<rect class="p-soil" x="528" y="256" width="16" height="16"/>
<rect class="p-soil" x="544" y="256" width="16" height="16"/>
<rect class="p-soil" x="80" y="272" width="16" height="16"/>
<rect class="p-soil" x="96" y="272" width="16" height="16"/>
<rect class="p-soil" x="112" y="272" width="16" height="16"/>
<rect class="p-soil" x="128" y="272" width="16" height="16"/>
<rect class="p-soil" x="144" y="272" width="16" height="16"/>
<rect class="p-soil" x="160" y="272" width="16" height="16"/>
<rect class="p-soil" x="176" y="272" width="16" height="16"/>
<rect class="p-soil" x="192" y="272" width="16" height="16"/>
<rect class="p-soil" x="208" y="272" width="16" height="16"/>
<rect class="p-soil" x="224" y="272" width="16" height="16"/>
<rect class="p-soil" x="240" y="272" width="16" height="16"/>
<rect class="p-soil" x="256" y="272" width="16" height="16"/>
<rect class="p-soil" x="272" y="272" width="16" height="16"/>
<rect class="p-soil" x="288" y="272" width="16" height="16"/>
<rect class="p-soil" x="304" y="272" width="16" height="16"/>
<rect class="p-soil" x="320" y="272" width="16" height="16"/>
<rect class="p-soil" x="336" y="272" width="16" height="16"/>
<rect class="p-soil" x="352" y="272" width="16" height="16"/>
<rect class="p-soil" x="368" y="272" width="16" height="16"/>
<rect class="p-soil" x="384" y="272" width="16" height="16"/>
<rect class="p-soil" x="400" y="272" width="16" height="16"/>
<rect class="p-soil" x="416" y="272" width="16" height="16"/>
<rect class="p-soil" x="432" y="272" width="16" height="16"/>
<rect class="p-soil" x="448" y="272" width="16" height="16"/>
<rect class="p-soil" x="464" y="272" width="16" height="16"/>
<rect class="p-soil" x="480" y="272" width="16" height="16"/>
<rect class="p-soil" x="496" y="272" width="16" height="16"/>
<rect class="p-soil" x="512" y="272" width="16" height="16"/>
<rect class="p-soil" x="528" y="272" width="16" height="16"/>
<rect class="p-soil" x="544" y="272" width="16" height="16"/>
<g class="sprout2">
<rect class="p-grn" x="304" y="112" width="16" height="16"/>
<rect class="p-grn" x="320" y="112" width="16" height="16"/>
<rect class="p-grn" x="304" y="128" width="16" height="16"/>
<rect class="p-grn" x="320" y="128" width="16" height="16"/>
<rect class="p-grnH" x="288" y="144" width="16" height="16"/>
<rect class="p-grn" x="304" y="144" width="16" height="16"/>
<rect class="p-grn" x="320" y="144" width="16" height="16"/>
<rect class="p-grn" x="304" y="160" width="16" height="16"/>
<rect class="p-grn" x="320" y="160" width="16" height="16"/>
<rect class="p-grn" x="304" y="176" width="16" height="16"/>
<rect class="p-grn" x="320" y="176" width="16" height="16"/>
</g>
<rect class="p-seed" x="304" y="192" width="16" height="16"/>
<rect class="p-seed" x="320" y="192" width="16" height="16"/>
<rect class="p-seed" x="288" y="208" width="16" height="16"/>
<rect class="p-seedH" x="304" y="208" width="16" height="16"/>
<rect class="p-seedH" x="320" y="208" width="16" height="16"/>
<rect class="p-seed" x="336" y="208" width="16" height="16"/>
<rect class="p-seed" x="288" y="224" width="16" height="16"/>
<rect class="p-seedH" x="304" y="224" width="16" height="16"/>
<rect class="p-seedH" x="320" y="224" width="16" height="16"/>
<rect class="p-seed" x="336" y="224" width="16" height="16"/>
<rect class="p-seed" x="304" y="240" width="16" height="16"/>
<rect class="p-seed" x="320" y="240" width="16" height="16"/>
<rect class="p-blk" x="112" y="128" width="16" height="16"/>
<rect class="p-blk" x="128" y="128" width="16" height="16"/>
<rect class="p-blk" x="144" y="128" width="16" height="16"/>
<rect class="p-blkD" x="160" y="128" width="16" height="16"/>
<rect class="p-blkD" x="176" y="128" width="16" height="16"/>
<rect class="p-blkD" x="192" y="128" width="16" height="16"/>
<rect class="p-blk" x="208" y="128" width="16" height="16"/>
<rect class="p-blk" x="224" y="128" width="16" height="16"/>
<rect class="p-blk" x="240" y="128" width="16" height="16"/>
<rect class="p-blkD" x="256" y="128" width="16" height="16"/>
<rect class="p-blkD" x="272" y="128" width="16" height="16"/>
<rect class="p-blkD" x="288" y="128" width="16" height="16"/>
<rect class="p-blk" x="336" y="128" width="16" height="16"/>
<rect class="p-blkD" x="352" y="128" width="16" height="16"/>
<rect class="p-blkD" x="368" y="128" width="16" height="16"/>
<rect class="p-blkD" x="384" y="128" width="16" height="16"/>
<rect class="p-blk" x="400" y="128" width="16" height="16"/>
<rect class="p-blk" x="416" y="128" width="16" height="16"/>
<rect class="p-blk" x="432" y="128" width="16" height="16"/>
<rect class="p-blkD" x="448" y="128" width="16" height="16"/>
<rect class="p-blkD" x="464" y="128" width="16" height="16"/>
<rect class="p-blkD" x="480" y="128" width="16" height="16"/>
<rect class="p-blk" x="496" y="128" width="16" height="16"/>
<rect class="p-blk" x="512" y="128" width="16" height="16"/>
<rect class="p-blk" x="112" y="144" width="16" height="16"/>
<rect class="p-blkD" x="128" y="144" width="16" height="16"/>
<rect class="p-blkD" x="144" y="144" width="16" height="16"/>
<rect class="p-blkD" x="160" y="144" width="16" height="16"/>
<rect class="p-blk" x="176" y="144" width="16" height="16"/>
<rect class="p-blk" x="192" y="144" width="16" height="16"/>
<rect class="p-blk" x="208" y="144" width="16" height="16"/>
<rect class="p-blkD" x="224" y="144" width="16" height="16"/>
<rect class="p-blkD" x="240" y="144" width="16" height="16"/>
<rect class="p-blkD" x="256" y="144" width="16" height="16"/>
<rect class="p-blk" x="272" y="144" width="16" height="16"/>
<rect class="p-blk" x="288" y="144" width="16" height="16"/>
<rect class="p-blkD" x="336" y="144" width="16" height="16"/>
<rect class="p-blkD" x="352" y="144" width="16" height="16"/>
<rect class="p-blk" x="368" y="144" width="16" height="16"/>
<rect class="p-blk" x="384" y="144" width="16" height="16"/>
<rect class="p-blk" x="400" y="144" width="16" height="16"/>
<rect class="p-blkD" x="416" y="144" width="16" height="16"/>
<rect class="p-blkD" x="432" y="144" width="16" height="16"/>
<rect class="p-blkD" x="448" y="144" width="16" height="16"/>
<rect class="p-blk" x="464" y="144" width="16" height="16"/>
<rect class="p-blk" x="480" y="144" width="16" height="16"/>
<rect class="p-blk" x="496" y="144" width="16" height="16"/>
<rect class="p-blkD" x="512" y="144" width="16" height="16"/>
<rect class="p-blk" x="112" y="160" width="16" height="16"/>
<rect class="p-blk" x="128" y="160" width="16" height="16"/>
<rect class="p-blk" x="144" y="160" width="16" height="16"/>
<rect class="p-blkD" x="160" y="160" width="16" height="16"/>
<rect class="p-blkD" x="176" y="160" width="16" height="16"/>
<rect class="p-blkD" x="192" y="160" width="16" height="16"/>
<rect class="p-blk" x="208" y="160" width="16" height="16"/>
<rect class="p-blk" x="224" y="160" width="16" height="16"/>
<rect class="p-blk" x="240" y="160" width="16" height="16"/>
<rect class="p-blkD" x="256" y="160" width="16" height="16"/>
<rect class="p-blkD" x="272" y="160" width="16" height="16"/>
<rect class="p-blkD" x="288" y="160" width="16" height="16"/>
<rect class="p-blk" x="336" y="160" width="16" height="16"/>
<rect class="p-blkD" x="352" y="160" width="16" height="16"/>
<rect class="p-blkD" x="368" y="160" width="16" height="16"/>
<rect class="p-blkD" x="384" y="160" width="16" height="16"/>
<rect class="p-blk" x="400" y="160" width="16" height="16"/>
<rect class="p-blk" x="416" y="160" width="16" height="16"/>
<rect class="p-blk" x="432" y="160" width="16" height="16"/>
<rect class="p-blkD" x="448" y="160" width="16" height="16"/>
<rect class="p-blkD" x="464" y="160" width="16" height="16"/>
<rect class="p-blkD" x="480" y="160" width="16" height="16"/>
<rect class="p-blk" x="496" y="160" width="16" height="16"/>
<rect class="p-blk" x="512" y="160" width="16" height="16"/>
<rect class="p-blk" x="112" y="176" width="16" height="16"/>
<rect class="p-blkD" x="128" y="176" width="16" height="16"/>
<rect class="p-blkD" x="144" y="176" width="16" height="16"/>
<rect class="p-blkD" x="160" y="176" width="16" height="16"/>
<rect class="p-blk" x="176" y="176" width="16" height="16"/>
<rect class="p-blk" x="192" y="176" width="16" height="16"/>
<rect class="p-blk" x="208" y="176" width="16" height="16"/>
<rect class="p-blkD" x="224" y="176" width="16" height="16"/>
<rect class="p-blkD" x="240" y="176" width="16" height="16"/>
<rect class="p-blkD" x="256" y="176" width="16" height="16"/>
<rect class="p-blk" x="272" y="176" width="16" height="16"/>
<rect class="p-blk" x="288" y="176" width="16" height="16"/>
<rect class="p-blkD" x="336" y="176" width="16" height="16"/>
<rect class="p-blkD" x="352" y="176" width="16" height="16"/>
<rect class="p-blk" x="368" y="176" width="16" height="16"/>
<rect class="p-blk" x="384" y="176" width="16" height="16"/>
<rect class="p-blk" x="400" y="176" width="16" height="16"/>
<rect class="p-blkD" x="416" y="176" width="16" height="16"/>
<rect class="p-blkD" x="432" y="176" width="16" height="16"/>
<rect class="p-blkD" x="448" y="176" width="16" height="16"/>
<rect class="p-blk" x="464" y="176" width="16" height="16"/>
<rect class="p-blk" x="480" y="176" width="16" height="16"/>
<rect class="p-blk" x="496" y="176" width="16" height="16"/>
<rect class="p-blkD" x="512" y="176" width="16" height="16"/>
<rect class="p-blk" x="112" y="192" width="16" height="16"/>
<rect class="p-blk" x="128" y="192" width="16" height="16"/>
<rect class="p-blk" x="144" y="192" width="16" height="16"/>
<rect class="p-blkD" x="160" y="192" width="16" height="16"/>
<rect class="p-blkD" x="176" y="192" width="16" height="16"/>
<rect class="p-blkD" x="192" y="192" width="16" height="16"/>
<rect class="p-blk" x="208" y="192" width="16" height="16"/>
<rect class="p-blk" x="224" y="192" width="16" height="16"/>
<rect class="p-blk" x="240" y="192" width="16" height="16"/>
<rect class="p-blkD" x="256" y="192" width="16" height="16"/>
<rect class="p-blkD" x="272" y="192" width="16" height="16"/>
<rect class="p-blkD" x="352" y="192" width="16" height="16"/>
<rect class="p-blkD" x="368" y="192" width="16" height="16"/>
<rect class="p-blkD" x="384" y="192" width="16" height="16"/>
<rect class="p-blk" x="400" y="192" width="16" height="16"/>
<rect class="p-blk" x="416" y="192" width="16" height="16"/>
<rect class="p-blk" x="432" y="192" width="16" height="16"/>
<rect class="p-blkD" x="448" y="192" width="16" height="16"/>
<rect class="p-blkD" x="464" y="192" width="16" height="16"/>
<rect class="p-blkD" x="480" y="192" width="16" height="16"/>
<rect class="p-blk" x="496" y="192" width="16" height="16"/>
<rect class="p-blk" x="512" y="192" width="16" height="16"/>
<rect class="p-blk" x="112" y="208" width="16" height="16"/>
<rect class="p-blkD" x="128" y="208" width="16" height="16"/>
<rect class="p-blkD" x="144" y="208" width="16" height="16"/>
<rect class="p-blkD" x="160" y="208" width="16" height="16"/>
<rect class="p-blk" x="176" y="208" width="16" height="16"/>
<rect class="p-blk" x="192" y="208" width="16" height="16"/>
<rect class="p-blk" x="208" y="208" width="16" height="16"/>
<rect class="p-blkD" x="224" y="208" width="16" height="16"/>
<rect class="p-blkD" x="240" y="208" width="16" height="16"/>
<rect class="p-blkD" x="256" y="208" width="16" height="16"/>
<rect class="p-blk" x="272" y="208" width="16" height="16"/>
<rect class="p-blkD" x="352" y="208" width="16" height="16"/>
<rect class="p-blk" x="368" y="208" width="16" height="16"/>
<rect class="p-blk" x="384" y="208" width="16" height="16"/>
<rect class="p-blk" x="400" y="208" width="16" height="16"/>
<rect class="p-blkD" x="416" y="208" width="16" height="16"/>
<rect class="p-blkD" x="432" y="208" width="16" height="16"/>
<rect class="p-blkD" x="448" y="208" width="16" height="16"/>
<rect class="p-blk" x="464" y="208" width="16" height="16"/>
<rect class="p-blk" x="480" y="208" width="16" height="16"/>
<rect class="p-blk" x="496" y="208" width="16" height="16"/>
<rect class="p-blkD" x="512" y="208" width="16" height="16"/>
<rect class="p-blk" x="112" y="224" width="16" height="16"/>
<rect class="p-blk" x="128" y="224" width="16" height="16"/>
<rect class="p-blk" x="144" y="224" width="16" height="16"/>
<rect class="p-blkD" x="160" y="224" width="16" height="16"/>
<rect class="p-blkD" x="176" y="224" width="16" height="16"/>
<rect class="p-blkD" x="192" y="224" width="16" height="16"/>
<rect class="p-blk" x="208" y="224" width="16" height="16"/>
<rect class="p-blk" x="224" y="224" width="16" height="16"/>
<rect class="p-blk" x="240" y="224" width="16" height="16"/>
<rect class="p-blkD" x="256" y="224" width="16" height="16"/>
<rect class="p-blkD" x="272" y="224" width="16" height="16"/>
<rect class="p-blkD" x="352" y="224" width="16" height="16"/>
<rect class="p-blkD" x="368" y="224" width="16" height="16"/>
<rect class="p-blkD" x="384" y="224" width="16" height="16"/>
<rect class="p-blk" x="400" y="224" width="16" height="16"/>
<rect class="p-blk" x="416" y="224" width="16" height="16"/>
<rect class="p-blk" x="432" y="224" width="16" height="16"/>
<rect class="p-blkD" x="448" y="224" width="16" height="16"/>
<rect class="p-blkD" x="464" y="224" width="16" height="16"/>
<rect class="p-blkD" x="480" y="224" width="16" height="16"/>
<rect class="p-blk" x="496" y="224" width="16" height="16"/>
<rect class="p-blk" x="512" y="224" width="16" height="16"/>
<rect class="p-blk" x="112" y="240" width="16" height="16"/>
<rect class="p-blkD" x="128" y="240" width="16" height="16"/>
<rect class="p-blkD" x="144" y="240" width="16" height="16"/>
<rect class="p-blkD" x="160" y="240" width="16" height="16"/>
<rect class="p-blk" x="176" y="240" width="16" height="16"/>
<rect class="p-blk" x="192" y="240" width="16" height="16"/>
<rect class="p-blk" x="208" y="240" width="16" height="16"/>
<rect class="p-blkD" x="224" y="240" width="16" height="16"/>
<rect class="p-blkD" x="240" y="240" width="16" height="16"/>
<rect class="p-blkD" x="256" y="240" width="16" height="16"/>
<rect class="p-blk" x="272" y="240" width="16" height="16"/>
<rect class="p-blkD" x="352" y="240" width="16" height="16"/>
<rect class="p-blk" x="368" y="240" width="16" height="16"/>
<rect class="p-blk" x="384" y="240" width="16" height="16"/>
<rect class="p-blk" x="400" y="240" width="16" height="16"/>
<rect class="p-blkD" x="416" y="240" width="16" height="16"/>
<rect class="p-blkD" x="432" y="240" width="16" height="16"/>
<rect class="p-blkD" x="448" y="240" width="16" height="16"/>
<rect class="p-blk" x="464" y="240" width="16" height="16"/>
<rect class="p-blk" x="480" y="240" width="16" height="16"/>
<rect class="p-blk" x="496" y="240" width="16" height="16"/>
<rect class="p-blkD" x="512" y="240" width="16" height="16"/>
</svg>
<figcaption>The same seed in an established system. Existing code, tools, and conventions wall it in, and the sprout barely finds a crack to the surface.</figcaption>
</figure>

This isn't to say that AI can't do well in these codebases but we have to "trick" the agent into acting like it has all of that pre-existing context we take for granted, which isn't a trivial effort. We do this in a variety of ways but the most common is through a strategy called "progressive disclosure", where we tie bits of relevant information with the portions of the codebase they help explain. For example, if you've got some nuance to how your company runs infra you may include an `AGENTS.md` file in your `/tf` directory with all the templates related to the codebase's infra. When the agent peeks into that section of the code it will always load that context, making sure it's only loaded when relevant. There's a variety of other advanced "tricks" for working around these context windows but they all involve some form of selectively loading only the relevant information when needed.

<figure class="ctx-fig ctx3">
<style>
.ctx3{--seed:#1a4fd4;--seedH:#5b82ea;--grn:#2e9e64;--grnH:#5fd29a;--blk:#c5beb1;--blkD:#ddd7cc;--acc:#1a4fd4;--accH:#5b82ea;--soil:#b3a994;}
html.dark .ctx3{--seed:#5b82ea;--seedH:#9db4f5;--grn:#3fb37c;--grnH:#74e2ac;--blk:#33333f;--blkD:#23232e;--acc:#5b82ea;--accH:#9db4f5;--soil:#2a2a36;}
.ctx3 svg{shape-rendering:crispEdges;}
.ctx3 .p-seed{fill:var(--seed);}.ctx3 .p-seedH{fill:var(--seedH);}
.ctx3 .p-grn{fill:var(--grn);}.ctx3 .p-grnH{fill:var(--grnH);}
.ctx3 .p-blk{fill:var(--blk);}.ctx3 .p-blkD{fill:var(--blkD);}
.ctx3 .p-acc{fill:var(--acc);}.ctx3 .p-accH{fill:var(--accH);}
.ctx3 .p-soil{fill:var(--soil);}
.ctx3 .p-dot{fill:var(--acc);opacity:.22;}
.ctx3 .p-fill{fill:var(--acc);opacity:.2;}
.ctx3 .p-limit{fill:var(--acc);}
.ctx3 .bite{fill:var(--acc);}
.ctx3 .link{stroke:var(--acc);stroke-width:2;opacity:.32;fill:none;}
@media (prefers-reduced-motion:reduce){.ctx3 [class*="grow"],.ctx3 [class*="tide"],.ctx3 [class*="sprout"]{clip-path:none!important;animation:none!important;transform:none!important;}}
.ctx3 .hi{fill:var(--accH);opacity:0;}
.ctx3 .h1{animation:c3hi 7s steps(1,end) 0s infinite;}
.ctx3 .h2{animation:c3hi 7s steps(1,end) 0s infinite;}
.ctx3 .h3{animation:c3hi 7s steps(1,end) 0s infinite;}
.ctx3 .h1{animation-delay:.3s;}.ctx3 .h2{animation-delay:2.3s;}.ctx3 .h3{animation-delay:4.3s;}
@keyframes c3hi{0%,22%{opacity:0;}1%,18%{opacity:.6;}}
.ctx3 .grow3{clip-path:inset(100% 0 0 0);animation:c3 7s linear infinite;}
@keyframes c3{0%,24.3%{clip-path:inset(100% 0 0 0);}24.4%,52.9%{clip-path:inset(66% 0 0 0);}53%,81.4%{clip-path:inset(33% 0 0 0);}81.5%,93%{clip-path:inset(0 0 0 0);}93.1%,100%{clip-path:inset(100% 0 0 0);}}</style>
<svg viewBox="0 0 640 352" role="img" aria-label="A field of context blocks surrounds the seed; faint trails connect a few relevant blocks to it, and those blocks fire pixel bites of information into the seed one at a time, the sprout growing a step with each.">
<rect class="p-soil" x="80" y="256" width="16" height="16"/>
<rect class="p-soil" x="96" y="256" width="16" height="16"/>
<rect class="p-soil" x="112" y="256" width="16" height="16"/>
<rect class="p-soil" x="128" y="256" width="16" height="16"/>
<rect class="p-soil" x="144" y="256" width="16" height="16"/>
<rect class="p-soil" x="160" y="256" width="16" height="16"/>
<rect class="p-soil" x="176" y="256" width="16" height="16"/>
<rect class="p-soil" x="192" y="256" width="16" height="16"/>
<rect class="p-soil" x="208" y="256" width="16" height="16"/>
<rect class="p-soil" x="224" y="256" width="16" height="16"/>
<rect class="p-soil" x="240" y="256" width="16" height="16"/>
<rect class="p-soil" x="256" y="256" width="16" height="16"/>
<rect class="p-soil" x="272" y="256" width="16" height="16"/>
<rect class="p-soil" x="288" y="256" width="16" height="16"/>
<rect class="p-soil" x="304" y="256" width="16" height="16"/>
<rect class="p-soil" x="320" y="256" width="16" height="16"/>
<rect class="p-soil" x="336" y="256" width="16" height="16"/>
<rect class="p-soil" x="352" y="256" width="16" height="16"/>
<rect class="p-soil" x="368" y="256" width="16" height="16"/>
<rect class="p-soil" x="384" y="256" width="16" height="16"/>
<rect class="p-soil" x="400" y="256" width="16" height="16"/>
<rect class="p-soil" x="416" y="256" width="16" height="16"/>
<rect class="p-soil" x="432" y="256" width="16" height="16"/>
<rect class="p-soil" x="448" y="256" width="16" height="16"/>
<rect class="p-soil" x="464" y="256" width="16" height="16"/>
<rect class="p-soil" x="480" y="256" width="16" height="16"/>
<rect class="p-soil" x="496" y="256" width="16" height="16"/>
<rect class="p-soil" x="512" y="256" width="16" height="16"/>
<rect class="p-soil" x="528" y="256" width="16" height="16"/>
<rect class="p-soil" x="544" y="256" width="16" height="16"/>
<rect class="p-soil" x="80" y="272" width="16" height="16"/>
<rect class="p-soil" x="96" y="272" width="16" height="16"/>
<rect class="p-soil" x="112" y="272" width="16" height="16"/>
<rect class="p-soil" x="128" y="272" width="16" height="16"/>
<rect class="p-soil" x="144" y="272" width="16" height="16"/>
<rect class="p-soil" x="160" y="272" width="16" height="16"/>
<rect class="p-soil" x="176" y="272" width="16" height="16"/>
<rect class="p-soil" x="192" y="272" width="16" height="16"/>
<rect class="p-soil" x="208" y="272" width="16" height="16"/>
<rect class="p-soil" x="224" y="272" width="16" height="16"/>
<rect class="p-soil" x="240" y="272" width="16" height="16"/>
<rect class="p-soil" x="256" y="272" width="16" height="16"/>
<rect class="p-soil" x="272" y="272" width="16" height="16"/>
<rect class="p-soil" x="288" y="272" width="16" height="16"/>
<rect class="p-soil" x="304" y="272" width="16" height="16"/>
<rect class="p-soil" x="320" y="272" width="16" height="16"/>
<rect class="p-soil" x="336" y="272" width="16" height="16"/>
<rect class="p-soil" x="352" y="272" width="16" height="16"/>
<rect class="p-soil" x="368" y="272" width="16" height="16"/>
<rect class="p-soil" x="384" y="272" width="16" height="16"/>
<rect class="p-soil" x="400" y="272" width="16" height="16"/>
<rect class="p-soil" x="416" y="272" width="16" height="16"/>
<rect class="p-soil" x="432" y="272" width="16" height="16"/>
<rect class="p-soil" x="448" y="272" width="16" height="16"/>
<rect class="p-soil" x="464" y="272" width="16" height="16"/>
<rect class="p-soil" x="480" y="272" width="16" height="16"/>
<rect class="p-soil" x="496" y="272" width="16" height="16"/>
<rect class="p-soil" x="512" y="272" width="16" height="16"/>
<rect class="p-soil" x="528" y="272" width="16" height="16"/>
<rect class="p-soil" x="544" y="272" width="16" height="16"/>
<rect class="p-blkD" x="80" y="96" width="16" height="16"/>
<rect class="p-blkD" x="96" y="96" width="16" height="16"/>
<rect class="p-blkD" x="112" y="96" width="16" height="16"/>
<rect class="p-blkD" x="128" y="96" width="16" height="16"/>
<rect class="p-blkD" x="80" y="112" width="16" height="16"/>
<rect class="p-blkD" x="96" y="112" width="16" height="16"/>
<rect class="p-blkD" x="112" y="112" width="16" height="16"/>
<rect class="p-blkD" x="128" y="112" width="16" height="16"/>
<rect class="p-blkD" x="80" y="128" width="16" height="16"/>
<rect class="p-blkD" x="96" y="128" width="16" height="16"/>
<rect class="p-blkD" x="112" y="128" width="16" height="16"/>
<rect class="p-blkD" x="128" y="128" width="16" height="16"/>
<rect class="p-blkD" x="240" y="32" width="16" height="16"/>
<rect class="p-blkD" x="256" y="32" width="16" height="16"/>
<rect class="p-blkD" x="272" y="32" width="16" height="16"/>
<rect class="p-blkD" x="288" y="32" width="16" height="16"/>
<rect class="p-blkD" x="240" y="48" width="16" height="16"/>
<rect class="p-blkD" x="256" y="48" width="16" height="16"/>
<rect class="p-blkD" x="272" y="48" width="16" height="16"/>
<rect class="p-blkD" x="288" y="48" width="16" height="16"/>
<rect class="p-blkD" x="240" y="64" width="16" height="16"/>
<rect class="p-blkD" x="256" y="64" width="16" height="16"/>
<rect class="p-blkD" x="272" y="64" width="16" height="16"/>
<rect class="p-blkD" x="288" y="64" width="16" height="16"/>
<rect class="p-blkD" x="400" y="32" width="16" height="16"/>
<rect class="p-blkD" x="416" y="32" width="16" height="16"/>
<rect class="p-blkD" x="432" y="32" width="16" height="16"/>
<rect class="p-blkD" x="448" y="32" width="16" height="16"/>
<rect class="p-blkD" x="400" y="48" width="16" height="16"/>
<rect class="p-blkD" x="416" y="48" width="16" height="16"/>
<rect class="p-blkD" x="432" y="48" width="16" height="16"/>
<rect class="p-blkD" x="448" y="48" width="16" height="16"/>
<rect class="p-blkD" x="400" y="64" width="16" height="16"/>
<rect class="p-blkD" x="416" y="64" width="16" height="16"/>
<rect class="p-blkD" x="432" y="64" width="16" height="16"/>
<rect class="p-blkD" x="448" y="64" width="16" height="16"/>
<rect class="p-blkD" x="544" y="112" width="16" height="16"/>
<rect class="p-blkD" x="560" y="112" width="16" height="16"/>
<rect class="p-blkD" x="576" y="112" width="16" height="16"/>
<rect class="p-blkD" x="592" y="112" width="16" height="16"/>
<rect class="p-blkD" x="544" y="128" width="16" height="16"/>
<rect class="p-blkD" x="560" y="128" width="16" height="16"/>
<rect class="p-blkD" x="576" y="128" width="16" height="16"/>
<rect class="p-blkD" x="592" y="128" width="16" height="16"/>
<rect class="p-blkD" x="544" y="144" width="16" height="16"/>
<rect class="p-blkD" x="560" y="144" width="16" height="16"/>
<rect class="p-blkD" x="576" y="144" width="16" height="16"/>
<rect class="p-blkD" x="592" y="144" width="16" height="16"/>
<rect class="p-blkD" x="96" y="192" width="16" height="16"/>
<rect class="p-blkD" x="112" y="192" width="16" height="16"/>
<rect class="p-blkD" x="128" y="192" width="16" height="16"/>
<rect class="p-blkD" x="144" y="192" width="16" height="16"/>
<rect class="p-blkD" x="96" y="208" width="16" height="16"/>
<rect class="p-blkD" x="112" y="208" width="16" height="16"/>
<rect class="p-blkD" x="128" y="208" width="16" height="16"/>
<rect class="p-blkD" x="144" y="208" width="16" height="16"/>
<rect class="p-blkD" x="96" y="224" width="16" height="16"/>
<rect class="p-blkD" x="112" y="224" width="16" height="16"/>
<rect class="p-blkD" x="128" y="224" width="16" height="16"/>
<rect class="p-blkD" x="144" y="224" width="16" height="16"/>
<rect class="p-blkD" x="528" y="192" width="16" height="16"/>
<rect class="p-blkD" x="544" y="192" width="16" height="16"/>
<rect class="p-blkD" x="560" y="192" width="16" height="16"/>
<rect class="p-blkD" x="576" y="192" width="16" height="16"/>
<rect class="p-blkD" x="528" y="208" width="16" height="16"/>
<rect class="p-blkD" x="544" y="208" width="16" height="16"/>
<rect class="p-blkD" x="560" y="208" width="16" height="16"/>
<rect class="p-blkD" x="576" y="208" width="16" height="16"/>
<rect class="p-blkD" x="528" y="224" width="16" height="16"/>
<rect class="p-blkD" x="544" y="224" width="16" height="16"/>
<rect class="p-blkD" x="560" y="224" width="16" height="16"/>
<rect class="p-blkD" x="576" y="224" width="16" height="16"/>
<rect class="p-dot" x="176" y="112" width="16" height="16"/>
<rect class="p-dot" x="208" y="128" width="16" height="16"/>
<rect class="p-dot" x="240" y="144" width="16" height="16"/>
<rect class="p-dot" x="256" y="160" width="16" height="16"/>
<rect class="p-dot" x="288" y="176" width="16" height="16"/>
<rect class="p-dot" x="320" y="80" width="16" height="16"/>
<rect class="p-dot" x="320" y="112" width="16" height="16"/>
<rect class="p-dot" x="320" y="128" width="16" height="16"/>
<rect class="p-dot" x="320" y="160" width="16" height="16"/>
<rect class="p-dot" x="320" y="176" width="16" height="16"/>
<rect class="p-dot" x="464" y="112" width="16" height="16"/>
<rect class="p-dot" x="432" y="128" width="16" height="16"/>
<rect class="p-dot" x="416" y="144" width="16" height="16"/>
<rect class="p-dot" x="384" y="160" width="16" height="16"/>
<rect class="p-dot" x="352" y="176" width="16" height="16"/>
<rect class="p-acc" x="112" y="48" width="16" height="16"/>
<rect class="p-acc" x="128" y="48" width="16" height="16"/>
<rect class="p-acc" x="144" y="48" width="16" height="16"/>
<rect class="p-acc" x="160" y="48" width="16" height="16"/>
<rect class="p-acc" x="112" y="64" width="16" height="16"/>
<rect class="p-accH" x="128" y="64" width="16" height="16"/>
<rect class="p-accH" x="144" y="64" width="16" height="16"/>
<rect class="p-acc" x="160" y="64" width="16" height="16"/>
<rect class="p-acc" x="112" y="80" width="16" height="16"/>
<rect class="p-acc" x="128" y="80" width="16" height="16"/>
<rect class="p-acc" x="144" y="80" width="16" height="16"/>
<rect class="p-acc" x="160" y="80" width="16" height="16"/>
<rect class="p-acc" x="288" y="16" width="16" height="16"/>
<rect class="p-acc" x="304" y="16" width="16" height="16"/>
<rect class="p-acc" x="320" y="16" width="16" height="16"/>
<rect class="p-acc" x="336" y="16" width="16" height="16"/>
<rect class="p-acc" x="288" y="32" width="16" height="16"/>
<rect class="p-accH" x="304" y="32" width="16" height="16"/>
<rect class="p-accH" x="320" y="32" width="16" height="16"/>
<rect class="p-acc" x="336" y="32" width="16" height="16"/>
<rect class="p-acc" x="288" y="48" width="16" height="16"/>
<rect class="p-acc" x="304" y="48" width="16" height="16"/>
<rect class="p-acc" x="320" y="48" width="16" height="16"/>
<rect class="p-acc" x="336" y="48" width="16" height="16"/>
<rect class="p-acc" x="464" y="48" width="16" height="16"/>
<rect class="p-acc" x="480" y="48" width="16" height="16"/>
<rect class="p-acc" x="496" y="48" width="16" height="16"/>
<rect class="p-acc" x="512" y="48" width="16" height="16"/>
<rect class="p-acc" x="464" y="64" width="16" height="16"/>
<rect class="p-accH" x="480" y="64" width="16" height="16"/>
<rect class="p-accH" x="496" y="64" width="16" height="16"/>
<rect class="p-acc" x="512" y="64" width="16" height="16"/>
<rect class="p-acc" x="464" y="80" width="16" height="16"/>
<rect class="p-acc" x="480" y="80" width="16" height="16"/>
<rect class="p-acc" x="496" y="80" width="16" height="16"/>
<rect class="p-acc" x="512" y="80" width="16" height="16"/>
<rect class="hi h1" x="112" y="48" width="64" height="48"/>
<rect class="hi h2" x="288" y="16" width="64" height="48"/>
<rect class="hi h3" x="464" y="48" width="64" height="48"/>
<g class="grow3">
<rect class="p-grn" x="304" y="64" width="16" height="16"/>
<rect class="p-grn" x="320" y="64" width="16" height="16"/>
<rect class="p-grnH" x="288" y="80" width="16" height="16"/>
<rect class="p-grn" x="304" y="80" width="16" height="16"/>
<rect class="p-grn" x="320" y="80" width="16" height="16"/>
<rect class="p-grnH" x="336" y="80" width="16" height="16"/>
<rect class="p-grn" x="304" y="96" width="16" height="16"/>
<rect class="p-grn" x="320" y="96" width="16" height="16"/>
<rect class="p-grnH" x="288" y="112" width="16" height="16"/>
<rect class="p-grn" x="304" y="112" width="16" height="16"/>
<rect class="p-grn" x="320" y="112" width="16" height="16"/>
<rect class="p-grnH" x="272" y="128" width="16" height="16"/>
<rect class="p-grn" x="304" y="128" width="16" height="16"/>
<rect class="p-grn" x="320" y="128" width="16" height="16"/>
<rect class="p-grn" x="304" y="144" width="16" height="16"/>
<rect class="p-grn" x="320" y="144" width="16" height="16"/>
<rect class="p-grn" x="304" y="160" width="16" height="16"/>
<rect class="p-grn" x="320" y="160" width="16" height="16"/>
<rect class="p-grnH" x="336" y="160" width="16" height="16"/>
<rect class="p-grn" x="304" y="176" width="16" height="16"/>
<rect class="p-grn" x="320" y="176" width="16" height="16"/>
<rect class="p-grnH" x="352" y="176" width="16" height="16"/>
</g>
<rect class="p-seed" x="304" y="192" width="16" height="16"/>
<rect class="p-seed" x="320" y="192" width="16" height="16"/>
<rect class="p-seed" x="288" y="208" width="16" height="16"/>
<rect class="p-seedH" x="304" y="208" width="16" height="16"/>
<rect class="p-seedH" x="320" y="208" width="16" height="16"/>
<rect class="p-seed" x="336" y="208" width="16" height="16"/>
<rect class="p-seed" x="288" y="224" width="16" height="16"/>
<rect class="p-seedH" x="304" y="224" width="16" height="16"/>
<rect class="p-seedH" x="320" y="224" width="16" height="16"/>
<rect class="p-seed" x="336" y="224" width="16" height="16"/>
<rect class="p-seed" x="304" y="240" width="16" height="16"/>
<rect class="p-seed" x="320" y="240" width="16" height="16"/>
<path id="c3p0" d="M144 96 Q 232 156 320 196" fill="none"/>
<path id="c3p1" d="M320 64 Q 320 156 320 196" fill="none"/>
<path id="c3p2" d="M496 96 Q 408 156 320 196" fill="none"/>
<rect class="bite" x="-8" y="-8" width="16" height="16">
<animateMotion dur="7s" begin="0s" repeatCount="indefinite" keyTimes="0;0.043;0.243;1" keyPoints="0;0;1;1" calcMode="linear"><mpath href="#c3p0"/></animateMotion>
<animate attributeName="opacity" dur="7s" begin="0s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.043;0.047;0.233;0.243;1"/></rect>
<rect class="bite" x="-8" y="-8" width="16" height="16">
<animateMotion dur="7s" begin="0s" repeatCount="indefinite" keyTimes="0;0.329;0.529;1" keyPoints="0;0;1;1" calcMode="linear"><mpath href="#c3p1"/></animateMotion>
<animate attributeName="opacity" dur="7s" begin="0s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.329;0.333;0.519;0.529;1"/></rect>
<rect class="bite" x="-8" y="-8" width="16" height="16">
<animateMotion dur="7s" begin="0s" repeatCount="indefinite" keyTimes="0;0.614;0.814;1" keyPoints="0;0;1;1" calcMode="linear"><mpath href="#c3p2"/></animateMotion>
<animate attributeName="opacity" dur="7s" begin="0s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;0.614;0.618;0.804;0.814;1"/></rect>
</svg>
<figcaption>Progressive disclosure. Only the relevant context lights up and feeds the seed on demand, one bite at a time, and the sprout grows with each delivery instead of drowning in everything at once.</figcaption>
</figure>

Why do we even need to be aware of this? Well for starters, LLMs operate differently than humans in a few distinct ways.

1. The model has no memory.
   * Every AI tool you use mimics memory by shoving history, preferences, files, docs, or summaries back into the LLM. Even tools that support project memory describe each new session as starting with a fresh context window ([Anthropic](https://docs.anthropic.com/en/docs/claude-code/memory)). These tend to look like chat histories that are literally copy and pasted over and over as individual messages are sent. Your 1000 message thread in ChatGPT is growing in size linearly, despite how simple the latest message is.
2. They have a strict finite attention span.
   * This concept is technically defined as a context window. The window size is the upper limit that an LLM can ever process in a single call. In every AI tool you use, if this limit is hit some data is summarized, condensed, or just plain cut off to make room for incoming info. This is a very hard technical problem to solve and "expanding the limit" is dramatically limited by available hardware memory. The exact number depends on model size and serving tricks, but modern million token windows exist now ([Claude](https://www.anthropic.com/news/claude-opus-4-6)) and can easily push memory needs into the hundreds of GB and sometimes well past that. KV cache memory scaling is one of the core bottlenecks in long-context inference ([arXiv](https://arxiv.org/abs/2603.20397)). Most desktops hover around 16GB.
3. They don't use every token equally well.
    * You can technically feed a model a massive context dump, but that doesn't mean it will reliably notice the right detail. Long context models often perform best when the important information is near the beginning or end of the prompt, and are more likely to miss details buried in the middle ([arXiv](https://arxiv.org/abs/2307.03172)).

<figure class="ctx-fig ctx6">
<style>
.ctx6{--seed:#1a4fd4;--seedH:#5b82ea;--grn:#2e9e64;--grnH:#5fd29a;--blk:#c5beb1;--blkD:#ddd7cc;--acc:#1a4fd4;--accH:#5b82ea;--soil:#b3a994;}
html.dark .ctx6{--seed:#5b82ea;--seedH:#9db4f5;--grn:#3fb37c;--grnH:#74e2ac;--blk:#33333f;--blkD:#23232e;--acc:#5b82ea;--accH:#9db4f5;--soil:#2a2a36;}
.ctx6 svg{shape-rendering:crispEdges;}
.ctx6 .p-seed{fill:var(--seed);}.ctx6 .p-seedH{fill:var(--seedH);}
.ctx6 .p-grn{fill:var(--grn);}.ctx6 .p-grnH{fill:var(--grnH);}
.ctx6 .p-blk{fill:var(--blk);}.ctx6 .p-blkD{fill:var(--blkD);}
.ctx6 .p-acc{fill:var(--acc);}.ctx6 .p-accH{fill:var(--accH);}
.ctx6 .p-soil{fill:var(--soil);}
.ctx6 .p-dot{fill:var(--acc);opacity:.22;}
.ctx6 .p-fill{fill:var(--acc);opacity:.2;}
.ctx6 .p-limit{fill:var(--acc);}
.ctx6 .bite{fill:var(--acc);}
.ctx6 .link{stroke:var(--acc);stroke-width:2;opacity:.32;fill:none;}
@media (prefers-reduced-motion:reduce){.ctx6 [class*="grow"],.ctx6 [class*="tide"],.ctx6 [class*="sprout"]{clip-path:none!important;animation:none!important;transform:none!important;}}
.ctx6 .lost{opacity:1;}
@keyframes c6lost{0%,100%{opacity:.85;}50%{opacity:.12;}}
.ctx6 .l3{animation:c6lost 3.4s ease-in-out 0.54s infinite;}.ctx6 .l4{animation:c6lost 3.4s ease-in-out 0.36s infinite;}.ctx6 .l5{animation:c6lost 3.4s ease-in-out 0.18s infinite;}.ctx6 .l6{animation:c6lost 3.4s ease-in-out 0.00s infinite;}.ctx6 .l7{animation:c6lost 3.4s ease-in-out 0.18s infinite;}.ctx6 .l8{animation:c6lost 3.4s ease-in-out 0.36s infinite;}.ctx6 .l9{animation:c6lost 3.4s ease-in-out 0.54s infinite;}</style>
<svg viewBox="0 0 640 352" role="img" aria-label="A row of context tokens forms a U shape: tall, bright and retained at the start and end of the prompt, but sunken and dim in the middle, where the tokens flicker and fade to show information being lost.">
<rect class="p-soil" x="80" y="240" width="480" height="16"/>
<rect class="p-fill" x="144" y="128" width="16" height="16"/>
<rect class="p-fill" x="144" y="144" width="16" height="16"/>
<rect class="p-fill" x="144" y="160" width="16" height="16"/>
<rect class="p-fill" x="144" y="176" width="16" height="16"/>
<rect class="p-fill" x="144" y="192" width="16" height="16"/>
<rect class="p-fill" x="144" y="208" width="16" height="16"/>
<rect class="p-fill" x="144" y="224" width="16" height="16"/>
<rect class="p-acc" x="144" y="112" width="16" height="16"/>
<rect class="p-fill" x="176" y="160" width="16" height="16"/>
<rect class="p-fill" x="176" y="176" width="16" height="16"/>
<rect class="p-fill" x="176" y="192" width="16" height="16"/>
<rect class="p-fill" x="176" y="208" width="16" height="16"/>
<rect class="p-fill" x="176" y="224" width="16" height="16"/>
<rect class="p-acc" x="176" y="144" width="16" height="16"/>
<rect class="p-fill" x="208" y="192" width="16" height="16"/>
<rect class="p-fill" x="208" y="208" width="16" height="16"/>
<rect class="p-fill" x="208" y="224" width="16" height="16"/>
<rect class="p-acc" x="208" y="176" width="16" height="16"/>
<rect class="p-fill" x="240" y="208" width="16" height="16"/>
<rect class="p-fill" x="240" y="224" width="16" height="16"/>
<rect class="p-blkD lost l3" x="240" y="192" width="16" height="16"/>
<rect class="p-fill" x="272" y="224" width="16" height="16"/>
<rect class="p-blkD lost l4" x="272" y="208" width="16" height="16"/>
<rect class="p-blkD lost l5" x="304" y="224" width="16" height="16"/>
<rect class="p-blkD lost l6" x="336" y="224" width="16" height="16"/>
<rect class="p-blkD lost l7" x="368" y="224" width="16" height="16"/>
<rect class="p-fill" x="400" y="224" width="16" height="16"/>
<rect class="p-blkD lost l8" x="400" y="208" width="16" height="16"/>
<rect class="p-fill" x="432" y="208" width="16" height="16"/>
<rect class="p-fill" x="432" y="224" width="16" height="16"/>
<rect class="p-blkD lost l9" x="432" y="192" width="16" height="16"/>
<rect class="p-fill" x="464" y="192" width="16" height="16"/>
<rect class="p-fill" x="464" y="208" width="16" height="16"/>
<rect class="p-fill" x="464" y="224" width="16" height="16"/>
<rect class="p-acc" x="464" y="176" width="16" height="16"/>
<rect class="p-fill" x="496" y="160" width="16" height="16"/>
<rect class="p-fill" x="496" y="176" width="16" height="16"/>
<rect class="p-fill" x="496" y="192" width="16" height="16"/>
<rect class="p-fill" x="496" y="208" width="16" height="16"/>
<rect class="p-fill" x="496" y="224" width="16" height="16"/>
<rect class="p-acc" x="496" y="144" width="16" height="16"/>
<rect class="p-fill" x="528" y="128" width="16" height="16"/>
<rect class="p-fill" x="528" y="144" width="16" height="16"/>
<rect class="p-fill" x="528" y="160" width="16" height="16"/>
<rect class="p-fill" x="528" y="176" width="16" height="16"/>
<rect class="p-fill" x="528" y="192" width="16" height="16"/>
<rect class="p-fill" x="528" y="208" width="16" height="16"/>
<rect class="p-fill" x="528" y="224" width="16" height="16"/>
<rect class="p-acc" x="528" y="112" width="16" height="16"/>
</svg>
<figcaption>Models attend most to the start and end of a prompt. Detail buried in the middle is the first thing they lose.</figcaption>
</figure>

These facts compound in interesting ways to really force you to consider how can I get all of the relevant information for a given task loaded in one-shot in the fewest words possible.

<figure class="ctx-fig ctx4">
<style>
.ctx4{--seed:#1a4fd4;--seedH:#5b82ea;--grn:#2e9e64;--grnH:#5fd29a;--blk:#c5beb1;--blkD:#ddd7cc;--acc:#1a4fd4;--accH:#5b82ea;--soil:#b3a994;}
html.dark .ctx4{--seed:#5b82ea;--seedH:#9db4f5;--grn:#3fb37c;--grnH:#74e2ac;--blk:#33333f;--blkD:#23232e;--acc:#5b82ea;--accH:#9db4f5;--soil:#2a2a36;}
.ctx4 svg{shape-rendering:crispEdges;}
.ctx4 .p-seed{fill:var(--seed);}.ctx4 .p-seedH{fill:var(--seedH);}
.ctx4 .p-grn{fill:var(--grn);}.ctx4 .p-grnH{fill:var(--grnH);}
.ctx4 .p-blk{fill:var(--blk);}.ctx4 .p-blkD{fill:var(--blkD);}
.ctx4 .p-acc{fill:var(--acc);}.ctx4 .p-accH{fill:var(--accH);}
.ctx4 .p-soil{fill:var(--soil);}
.ctx4 .p-dot{fill:var(--acc);opacity:.22;}
.ctx4 .p-fill{fill:var(--acc);opacity:.2;}
.ctx4 .p-limit{fill:var(--acc);}
.ctx4 .bite{fill:var(--acc);}
.ctx4 .link{stroke:var(--acc);stroke-width:2;opacity:.32;fill:none;}
@media (prefers-reduced-motion:reduce){.ctx4 [class*="grow"],.ctx4 [class*="tide"],.ctx4 [class*="sprout"]{clip-path:none!important;animation:none!important;transform:none!important;}}
.ctx4 .limit{animation:c4lim 5.5s ease-in-out infinite;}
.ctx4 .grove{clip-path:inset(100% 0 0 0);animation:c4 5.5s steps(10,end) infinite;}
@keyframes c4{0%{clip-path:inset(100% 0 0 0);}30%{clip-path:inset(0 0 0 0);}82%{clip-path:inset(0 0 0 0);}85%{clip-path:inset(100% 0 0 0);}100%{clip-path:inset(100% 0 0 0);}}
@keyframes c4lim{0%,27%{opacity:.35;}30%,82%{opacity:1;}85%,100%{opacity:.35;}}</style>
<svg viewBox="0 0 640 352" role="img" aria-label="A pixel seed grows inside a bounded window, the window filling up beneath it, until it reaches the bright dashed limit line near the top, which flashes; then the whole window clears and it starts over.">
<rect class="p-blkD" x="208" y="64" width="16" height="16"/>
<rect class="p-blkD" x="416" y="64" width="16" height="16"/>
<rect class="p-blkD" x="208" y="80" width="16" height="16"/>
<rect class="p-blkD" x="416" y="80" width="16" height="16"/>
<rect class="p-blkD" x="208" y="96" width="16" height="16"/>
<rect class="p-blkD" x="416" y="96" width="16" height="16"/>
<rect class="p-blkD" x="208" y="112" width="16" height="16"/>
<rect class="p-blkD" x="416" y="112" width="16" height="16"/>
<rect class="p-blkD" x="208" y="128" width="16" height="16"/>
<rect class="p-blkD" x="416" y="128" width="16" height="16"/>
<rect class="p-blkD" x="208" y="144" width="16" height="16"/>
<rect class="p-blkD" x="416" y="144" width="16" height="16"/>
<rect class="p-blkD" x="208" y="160" width="16" height="16"/>
<rect class="p-blkD" x="416" y="160" width="16" height="16"/>
<rect class="p-blkD" x="208" y="176" width="16" height="16"/>
<rect class="p-blkD" x="416" y="176" width="16" height="16"/>
<rect class="p-blkD" x="208" y="192" width="16" height="16"/>
<rect class="p-blkD" x="416" y="192" width="16" height="16"/>
<rect class="p-blkD" x="208" y="208" width="16" height="16"/>
<rect class="p-blkD" x="416" y="208" width="16" height="16"/>
<rect class="p-blkD" x="208" y="224" width="16" height="16"/>
<rect class="p-blkD" x="416" y="224" width="16" height="16"/>
<rect class="p-blkD" x="208" y="240" width="16" height="16"/>
<rect class="p-blkD" x="416" y="240" width="16" height="16"/>
<rect class="p-blkD" x="208" y="256" width="16" height="16"/>
<rect class="p-blkD" x="416" y="256" width="16" height="16"/>
<rect class="p-blk" x="208" y="256" width="16" height="16"/>
<rect class="p-blk" x="224" y="256" width="16" height="16"/>
<rect class="p-blk" x="240" y="256" width="16" height="16"/>
<rect class="p-blk" x="256" y="256" width="16" height="16"/>
<rect class="p-blk" x="272" y="256" width="16" height="16"/>
<rect class="p-blk" x="288" y="256" width="16" height="16"/>
<rect class="p-blk" x="304" y="256" width="16" height="16"/>
<rect class="p-blk" x="320" y="256" width="16" height="16"/>
<rect class="p-blk" x="336" y="256" width="16" height="16"/>
<rect class="p-blk" x="352" y="256" width="16" height="16"/>
<rect class="p-blk" x="368" y="256" width="16" height="16"/>
<rect class="p-blk" x="384" y="256" width="16" height="16"/>
<rect class="p-blk" x="400" y="256" width="16" height="16"/>
<rect class="p-blk" x="416" y="256" width="16" height="16"/>
<g class="grove">
<rect class="p-fill" x="224" y="112" width="16" height="16"/>
<rect class="p-fill" x="240" y="112" width="16" height="16"/>
<rect class="p-fill" x="256" y="112" width="16" height="16"/>
<rect class="p-fill" x="272" y="112" width="16" height="16"/>
<rect class="p-fill" x="288" y="112" width="16" height="16"/>
<rect class="p-fill" x="304" y="112" width="16" height="16"/>
<rect class="p-fill" x="320" y="112" width="16" height="16"/>
<rect class="p-fill" x="336" y="112" width="16" height="16"/>
<rect class="p-fill" x="352" y="112" width="16" height="16"/>
<rect class="p-fill" x="368" y="112" width="16" height="16"/>
<rect class="p-fill" x="384" y="112" width="16" height="16"/>
<rect class="p-fill" x="400" y="112" width="16" height="16"/>
<rect class="p-fill" x="224" y="128" width="16" height="16"/>
<rect class="p-fill" x="240" y="128" width="16" height="16"/>
<rect class="p-fill" x="256" y="128" width="16" height="16"/>
<rect class="p-fill" x="272" y="128" width="16" height="16"/>
<rect class="p-fill" x="288" y="128" width="16" height="16"/>
<rect class="p-fill" x="304" y="128" width="16" height="16"/>
<rect class="p-fill" x="320" y="128" width="16" height="16"/>
<rect class="p-fill" x="336" y="128" width="16" height="16"/>
<rect class="p-fill" x="352" y="128" width="16" height="16"/>
<rect class="p-fill" x="368" y="128" width="16" height="16"/>
<rect class="p-fill" x="384" y="128" width="16" height="16"/>
<rect class="p-fill" x="400" y="128" width="16" height="16"/>
<rect class="p-fill" x="224" y="144" width="16" height="16"/>
<rect class="p-fill" x="240" y="144" width="16" height="16"/>
<rect class="p-fill" x="256" y="144" width="16" height="16"/>
<rect class="p-fill" x="272" y="144" width="16" height="16"/>
<rect class="p-fill" x="288" y="144" width="16" height="16"/>
<rect class="p-fill" x="304" y="144" width="16" height="16"/>
<rect class="p-fill" x="320" y="144" width="16" height="16"/>
<rect class="p-fill" x="336" y="144" width="16" height="16"/>
<rect class="p-fill" x="352" y="144" width="16" height="16"/>
<rect class="p-fill" x="368" y="144" width="16" height="16"/>
<rect class="p-fill" x="384" y="144" width="16" height="16"/>
<rect class="p-fill" x="400" y="144" width="16" height="16"/>
<rect class="p-fill" x="224" y="160" width="16" height="16"/>
<rect class="p-fill" x="240" y="160" width="16" height="16"/>
<rect class="p-fill" x="256" y="160" width="16" height="16"/>
<rect class="p-fill" x="272" y="160" width="16" height="16"/>
<rect class="p-fill" x="288" y="160" width="16" height="16"/>
<rect class="p-fill" x="304" y="160" width="16" height="16"/>
<rect class="p-fill" x="320" y="160" width="16" height="16"/>
<rect class="p-fill" x="336" y="160" width="16" height="16"/>
<rect class="p-fill" x="352" y="160" width="16" height="16"/>
<rect class="p-fill" x="368" y="160" width="16" height="16"/>
<rect class="p-fill" x="384" y="160" width="16" height="16"/>
<rect class="p-fill" x="400" y="160" width="16" height="16"/>
<rect class="p-fill" x="224" y="176" width="16" height="16"/>
<rect class="p-fill" x="240" y="176" width="16" height="16"/>
<rect class="p-fill" x="256" y="176" width="16" height="16"/>
<rect class="p-fill" x="272" y="176" width="16" height="16"/>
<rect class="p-fill" x="288" y="176" width="16" height="16"/>
<rect class="p-fill" x="304" y="176" width="16" height="16"/>
<rect class="p-fill" x="320" y="176" width="16" height="16"/>
<rect class="p-fill" x="336" y="176" width="16" height="16"/>
<rect class="p-fill" x="352" y="176" width="16" height="16"/>
<rect class="p-fill" x="368" y="176" width="16" height="16"/>
<rect class="p-fill" x="384" y="176" width="16" height="16"/>
<rect class="p-fill" x="400" y="176" width="16" height="16"/>
<rect class="p-fill" x="224" y="192" width="16" height="16"/>
<rect class="p-fill" x="240" y="192" width="16" height="16"/>
<rect class="p-fill" x="256" y="192" width="16" height="16"/>
<rect class="p-fill" x="272" y="192" width="16" height="16"/>
<rect class="p-fill" x="288" y="192" width="16" height="16"/>
<rect class="p-fill" x="304" y="192" width="16" height="16"/>
<rect class="p-fill" x="320" y="192" width="16" height="16"/>
<rect class="p-fill" x="336" y="192" width="16" height="16"/>
<rect class="p-fill" x="352" y="192" width="16" height="16"/>
<rect class="p-fill" x="368" y="192" width="16" height="16"/>
<rect class="p-fill" x="384" y="192" width="16" height="16"/>
<rect class="p-fill" x="400" y="192" width="16" height="16"/>
<rect class="p-fill" x="224" y="208" width="16" height="16"/>
<rect class="p-fill" x="240" y="208" width="16" height="16"/>
<rect class="p-fill" x="256" y="208" width="16" height="16"/>
<rect class="p-fill" x="272" y="208" width="16" height="16"/>
<rect class="p-fill" x="288" y="208" width="16" height="16"/>
<rect class="p-fill" x="304" y="208" width="16" height="16"/>
<rect class="p-fill" x="320" y="208" width="16" height="16"/>
<rect class="p-fill" x="336" y="208" width="16" height="16"/>
<rect class="p-fill" x="352" y="208" width="16" height="16"/>
<rect class="p-fill" x="368" y="208" width="16" height="16"/>
<rect class="p-fill" x="384" y="208" width="16" height="16"/>
<rect class="p-fill" x="400" y="208" width="16" height="16"/>
<rect class="p-fill" x="224" y="224" width="16" height="16"/>
<rect class="p-fill" x="240" y="224" width="16" height="16"/>
<rect class="p-fill" x="256" y="224" width="16" height="16"/>
<rect class="p-fill" x="272" y="224" width="16" height="16"/>
<rect class="p-fill" x="288" y="224" width="16" height="16"/>
<rect class="p-fill" x="304" y="224" width="16" height="16"/>
<rect class="p-fill" x="320" y="224" width="16" height="16"/>
<rect class="p-fill" x="336" y="224" width="16" height="16"/>
<rect class="p-fill" x="352" y="224" width="16" height="16"/>
<rect class="p-fill" x="368" y="224" width="16" height="16"/>
<rect class="p-fill" x="384" y="224" width="16" height="16"/>
<rect class="p-fill" x="400" y="224" width="16" height="16"/>
<rect class="p-fill" x="224" y="240" width="16" height="16"/>
<rect class="p-fill" x="240" y="240" width="16" height="16"/>
<rect class="p-fill" x="256" y="240" width="16" height="16"/>
<rect class="p-fill" x="272" y="240" width="16" height="16"/>
<rect class="p-fill" x="288" y="240" width="16" height="16"/>
<rect class="p-fill" x="304" y="240" width="16" height="16"/>
<rect class="p-fill" x="320" y="240" width="16" height="16"/>
<rect class="p-fill" x="336" y="240" width="16" height="16"/>
<rect class="p-fill" x="352" y="240" width="16" height="16"/>
<rect class="p-fill" x="368" y="240" width="16" height="16"/>
<rect class="p-fill" x="384" y="240" width="16" height="16"/>
<rect class="p-fill" x="400" y="240" width="16" height="16"/>
<rect class="p-grn" x="304" y="112" width="16" height="16"/>
<rect class="p-grn" x="320" y="112" width="16" height="16"/>
<rect class="p-grnH" x="288" y="128" width="16" height="16"/>
<rect class="p-grn" x="304" y="128" width="16" height="16"/>
<rect class="p-grn" x="320" y="128" width="16" height="16"/>
<rect class="p-grn" x="304" y="144" width="16" height="16"/>
<rect class="p-grn" x="320" y="144" width="16" height="16"/>
<rect class="p-grnH" x="336" y="144" width="16" height="16"/>
<rect class="p-grn" x="304" y="160" width="16" height="16"/>
<rect class="p-grn" x="320" y="160" width="16" height="16"/>
<rect class="p-grnH" x="288" y="176" width="16" height="16"/>
<rect class="p-grn" x="304" y="176" width="16" height="16"/>
<rect class="p-grn" x="320" y="176" width="16" height="16"/>
<rect class="p-grn" x="304" y="192" width="16" height="16"/>
<rect class="p-grn" x="320" y="192" width="16" height="16"/>
<rect class="p-grn" x="304" y="208" width="16" height="16"/>
<rect class="p-grn" x="320" y="208" width="16" height="16"/>
<rect class="p-grn" x="304" y="224" width="16" height="16"/>
<rect class="p-grn" x="320" y="224" width="16" height="16"/>
<rect class="p-grn" x="304" y="240" width="16" height="16"/>
<rect class="p-grn" x="320" y="240" width="16" height="16"/>
<rect class="p-seed" x="304" y="192" width="16" height="16"/>
<rect class="p-seed" x="320" y="192" width="16" height="16"/>
<rect class="p-seed" x="288" y="208" width="16" height="16"/>
<rect class="p-seedH" x="304" y="208" width="16" height="16"/>
<rect class="p-seedH" x="320" y="208" width="16" height="16"/>
<rect class="p-seed" x="336" y="208" width="16" height="16"/>
<rect class="p-seed" x="288" y="224" width="16" height="16"/>
<rect class="p-seedH" x="304" y="224" width="16" height="16"/>
<rect class="p-seedH" x="320" y="224" width="16" height="16"/>
<rect class="p-seed" x="336" y="224" width="16" height="16"/>
<rect class="p-seed" x="304" y="240" width="16" height="16"/>
<rect class="p-seed" x="320" y="240" width="16" height="16"/>
</g>
<rect class="p-limit limit" x="224" y="96" width="16" height="16"/>
<rect class="p-limit limit" x="256" y="96" width="16" height="16"/>
<rect class="p-limit limit" x="288" y="96" width="16" height="16"/>
<rect class="p-limit limit" x="320" y="96" width="16" height="16"/>
<rect class="p-limit limit" x="352" y="96" width="16" height="16"/>
<rect class="p-limit limit" x="384" y="96" width="16" height="16"/>
<rect class="p-limit limit" x="208" y="96" width="16" height="16"/>
<rect class="p-limit limit" x="416" y="96" width="16" height="16"/>
</svg>
<figcaption>A finite context window. The window fills as the seed grows, until it hits the limit, then everything clears and begins again with no memory of the last run.</figcaption>
</figure>

So how does all of this relate to "AI takeover" discussions? Humans are notoriously bad at estimating effort and level of difficulty, especially in abstract spaces like "context." Most real software work depends on far more than the files being edited. The relevant context includes the codebase, docs, tickets, logs, systems behavior, historical decisions, company conventions, in-person conversations, and the stuff experts only know because they have been burned by it before. That total context can easily spill outside even very large context windows, so an LLM is always going to require retrieval and summarization tricks to get it to understand a given task.

The natural direction is to start persisting this context where missing and connecting LLMs to knowledge silos in companies where these types of architecture, getting started, troubleshooting, etc docs have been stored for the past few decades. These efforts will constantly raise the bar for AI performance when done well, and compound over time, but most pundits dramatically underestimate both the quality of existing docs and the level of difficulty required to associate the information with the right parts of codebases on-demand.

A simple anecdote is to consider the average employee onboarding experience at a given company, in 99% of companies this experience is known to have significant gaps that are constantly accumulating. You often have to pair with an expert for months to get even the baseline understanding of the lay of the land and start to understand how to operate as a novice in the space. We all know this to be true but forget that this same onboarding process is a pre-req for effective implementations at scale for LLMs as well.

This is not to say that AI can't make immediate impact in organizations OOTB today, but just that we do a bad job articulating gaps where they exist and the entire community would be much better off understanding some of the foundational constraints in the tools we're advocating for.

I'm optimistic that there's a lot of work to be done and many amazing implementations of applied AI that will come out over the coming years. We're on the precipice of novel tech and tools that we don't have any basis of understanding for so concrete predictions should be taken with a heavy grain of salt for the time being. We're better off trying to talk about the tools, understanding how they work, and experimenting to find the many tangible improvements to our ways of working grounded in today.

<figure class="ctx-fig ctx5">
<style>
.ctx5{--seed:#1a4fd4;--seedH:#5b82ea;--grn:#2e9e64;--grnH:#5fd29a;--blk:#c5beb1;--blkD:#ddd7cc;--acc:#1a4fd4;--accH:#5b82ea;--soil:#b3a994;}
html.dark .ctx5{--seed:#5b82ea;--seedH:#9db4f5;--grn:#3fb37c;--grnH:#74e2ac;--blk:#33333f;--blkD:#23232e;--acc:#5b82ea;--accH:#9db4f5;--soil:#2a2a36;}
.ctx5 svg{shape-rendering:crispEdges;}
.ctx5 .p-seed{fill:var(--seed);}.ctx5 .p-seedH{fill:var(--seedH);}
.ctx5 .p-grn{fill:var(--grn);}.ctx5 .p-grnH{fill:var(--grnH);}
.ctx5 .p-blk{fill:var(--blk);}.ctx5 .p-blkD{fill:var(--blkD);}
.ctx5 .p-acc{fill:var(--acc);}.ctx5 .p-accH{fill:var(--accH);}
.ctx5 .p-soil{fill:var(--soil);}
.ctx5 .p-dot{fill:var(--acc);opacity:.22;}
.ctx5 .p-fill{fill:var(--acc);opacity:.2;}
.ctx5 .p-limit{fill:var(--acc);}
.ctx5 .bite{fill:var(--acc);}
.ctx5 .link{stroke:var(--acc);stroke-width:2;opacity:.32;fill:none;}
@media (prefers-reduced-motion:reduce){.ctx5 [class*="grow"],.ctx5 [class*="tide"],.ctx5 [class*="sprout"]{clip-path:none!important;animation:none!important;transform:none!important;}}
.ctx5 .p-acc{animation:c5node 2.8s ease-in-out infinite;}
@keyframes c5node{0%,100%{opacity:.5;}50%{opacity:1;}}
.ctx5 .grow5{clip-path:inset(100% 0 0 0);animation:c5 7s steps(13,end) infinite;}
@keyframes c5{0%{clip-path:inset(100% 0 0 0);}48%{clip-path:inset(0 0 0 0);}90%{clip-path:inset(0 0 0 0);}93%{clip-path:inset(100% 0 0 0);}100%{clip-path:inset(100% 0 0 0);}}</style>
<svg viewBox="0 0 640 352" role="img" aria-label="The seed grows into a full pixel tree, trunk first then a broad green canopy, dotted with glowing blue knowledge nodes joined by faint connecting links.">
<rect class="p-soil" x="80" y="256" width="16" height="16"/>
<rect class="p-soil" x="96" y="256" width="16" height="16"/>
<rect class="p-soil" x="112" y="256" width="16" height="16"/>
<rect class="p-soil" x="128" y="256" width="16" height="16"/>
<rect class="p-soil" x="144" y="256" width="16" height="16"/>
<rect class="p-soil" x="160" y="256" width="16" height="16"/>
<rect class="p-soil" x="176" y="256" width="16" height="16"/>
<rect class="p-soil" x="192" y="256" width="16" height="16"/>
<rect class="p-soil" x="208" y="256" width="16" height="16"/>
<rect class="p-soil" x="224" y="256" width="16" height="16"/>
<rect class="p-soil" x="240" y="256" width="16" height="16"/>
<rect class="p-soil" x="256" y="256" width="16" height="16"/>
<rect class="p-soil" x="272" y="256" width="16" height="16"/>
<rect class="p-soil" x="288" y="256" width="16" height="16"/>
<rect class="p-soil" x="304" y="256" width="16" height="16"/>
<rect class="p-soil" x="320" y="256" width="16" height="16"/>
<rect class="p-soil" x="336" y="256" width="16" height="16"/>
<rect class="p-soil" x="352" y="256" width="16" height="16"/>
<rect class="p-soil" x="368" y="256" width="16" height="16"/>
<rect class="p-soil" x="384" y="256" width="16" height="16"/>
<rect class="p-soil" x="400" y="256" width="16" height="16"/>
<rect class="p-soil" x="416" y="256" width="16" height="16"/>
<rect class="p-soil" x="432" y="256" width="16" height="16"/>
<rect class="p-soil" x="448" y="256" width="16" height="16"/>
<rect class="p-soil" x="464" y="256" width="16" height="16"/>
<rect class="p-soil" x="480" y="256" width="16" height="16"/>
<rect class="p-soil" x="496" y="256" width="16" height="16"/>
<rect class="p-soil" x="512" y="256" width="16" height="16"/>
<rect class="p-soil" x="528" y="256" width="16" height="16"/>
<rect class="p-soil" x="544" y="256" width="16" height="16"/>
<rect class="p-soil" x="80" y="272" width="16" height="16"/>
<rect class="p-soil" x="96" y="272" width="16" height="16"/>
<rect class="p-soil" x="112" y="272" width="16" height="16"/>
<rect class="p-soil" x="128" y="272" width="16" height="16"/>
<rect class="p-soil" x="144" y="272" width="16" height="16"/>
<rect class="p-soil" x="160" y="272" width="16" height="16"/>
<rect class="p-soil" x="176" y="272" width="16" height="16"/>
<rect class="p-soil" x="192" y="272" width="16" height="16"/>
<rect class="p-soil" x="208" y="272" width="16" height="16"/>
<rect class="p-soil" x="224" y="272" width="16" height="16"/>
<rect class="p-soil" x="240" y="272" width="16" height="16"/>
<rect class="p-soil" x="256" y="272" width="16" height="16"/>
<rect class="p-soil" x="272" y="272" width="16" height="16"/>
<rect class="p-soil" x="288" y="272" width="16" height="16"/>
<rect class="p-soil" x="304" y="272" width="16" height="16"/>
<rect class="p-soil" x="320" y="272" width="16" height="16"/>
<rect class="p-soil" x="336" y="272" width="16" height="16"/>
<rect class="p-soil" x="352" y="272" width="16" height="16"/>
<rect class="p-soil" x="368" y="272" width="16" height="16"/>
<rect class="p-soil" x="384" y="272" width="16" height="16"/>
<rect class="p-soil" x="400" y="272" width="16" height="16"/>
<rect class="p-soil" x="416" y="272" width="16" height="16"/>
<rect class="p-soil" x="432" y="272" width="16" height="16"/>
<rect class="p-soil" x="448" y="272" width="16" height="16"/>
<rect class="p-soil" x="464" y="272" width="16" height="16"/>
<rect class="p-soil" x="480" y="272" width="16" height="16"/>
<rect class="p-soil" x="496" y="272" width="16" height="16"/>
<rect class="p-soil" x="512" y="272" width="16" height="16"/>
<rect class="p-soil" x="528" y="272" width="16" height="16"/>
<rect class="p-soil" x="544" y="272" width="16" height="16"/>
<g class="grow5">
<rect class="p-grnH" x="304" y="80" width="16" height="16"/>
<rect class="p-grnH" x="320" y="80" width="16" height="16"/>
<rect class="p-grnH" x="272" y="96" width="16" height="16"/>
<rect class="p-grnH" x="288" y="96" width="16" height="16"/>
<rect class="p-grn" x="304" y="96" width="16" height="16"/>
<rect class="p-grn" x="320" y="96" width="16" height="16"/>
<rect class="p-grnH" x="336" y="96" width="16" height="16"/>
<rect class="p-grnH" x="352" y="96" width="16" height="16"/>
<rect class="p-grnH" x="256" y="112" width="16" height="16"/>
<rect class="p-grn" x="272" y="112" width="16" height="16"/>
<rect class="p-grn" x="288" y="112" width="16" height="16"/>
<rect class="p-grnH" x="304" y="112" width="16" height="16"/>
<rect class="p-grn" x="320" y="112" width="16" height="16"/>
<rect class="p-acc" x="336" y="112" width="16" height="16"/>
<rect class="p-grn" x="352" y="112" width="16" height="16"/>
<rect class="p-grnH" x="368" y="112" width="16" height="16"/>
<rect class="p-grnH" x="240" y="128" width="16" height="16"/>
<rect class="p-grn" x="256" y="128" width="16" height="16"/>
<rect class="p-acc" x="272" y="128" width="16" height="16"/>
<rect class="p-grn" x="288" y="128" width="16" height="16"/>
<rect class="p-grn" x="304" y="128" width="16" height="16"/>
<rect class="p-grnH" x="320" y="128" width="16" height="16"/>
<rect class="p-grn" x="336" y="128" width="16" height="16"/>
<rect class="p-grn" x="352" y="128" width="16" height="16"/>
<rect class="p-grn" x="368" y="128" width="16" height="16"/>
<rect class="p-grnH" x="384" y="128" width="16" height="16"/>
<rect class="p-grnH" x="224" y="144" width="16" height="16"/>
<rect class="p-grn" x="240" y="144" width="16" height="16"/>
<rect class="p-grn" x="256" y="144" width="16" height="16"/>
<rect class="p-grn" x="272" y="144" width="16" height="16"/>
<rect class="p-grnH" x="288" y="144" width="16" height="16"/>
<rect class="p-grn" x="304" y="144" width="16" height="16"/>
<rect class="p-grn" x="320" y="144" width="16" height="16"/>
<rect class="p-acc" x="336" y="144" width="16" height="16"/>
<rect class="p-grn" x="352" y="144" width="16" height="16"/>
<rect class="p-grn" x="368" y="144" width="16" height="16"/>
<rect class="p-grn" x="384" y="144" width="16" height="16"/>
<rect class="p-grnH" x="400" y="144" width="16" height="16"/>
<rect class="p-grnH" x="240" y="160" width="16" height="16"/>
<rect class="p-grn" x="256" y="160" width="16" height="16"/>
<rect class="p-grn" x="272" y="160" width="16" height="16"/>
<rect class="p-acc" x="288" y="160" width="16" height="16"/>
<rect class="p-grn" x="304" y="160" width="16" height="16"/>
<rect class="p-grnH" x="320" y="160" width="16" height="16"/>
<rect class="p-grn" x="336" y="160" width="16" height="16"/>
<rect class="p-grn" x="352" y="160" width="16" height="16"/>
<rect class="p-grnH" x="368" y="160" width="16" height="16"/>
<rect class="p-grnH" x="384" y="160" width="16" height="16"/>
<rect class="p-grnH" x="256" y="176" width="16" height="16"/>
<rect class="p-grnH" x="272" y="176" width="16" height="16"/>
<rect class="p-grn" x="288" y="176" width="16" height="16"/>
<rect class="p-grn" x="304" y="176" width="16" height="16"/>
<rect class="p-grn" x="320" y="176" width="16" height="16"/>
<rect class="p-acc" x="336" y="176" width="16" height="16"/>
<rect class="p-grnH" x="352" y="176" width="16" height="16"/>
<rect class="p-grnH" x="368" y="176" width="16" height="16"/>
<rect class="p-grnH" x="272" y="192" width="16" height="16"/>
<rect class="p-grn" x="288" y="192" width="16" height="16"/>
<rect class="p-grn" x="304" y="192" width="16" height="16"/>
<rect class="p-grn" x="320" y="192" width="16" height="16"/>
<rect class="p-grn" x="336" y="192" width="16" height="16"/>
<rect class="p-grnH" x="352" y="192" width="16" height="16"/>
<rect class="p-grn" x="304" y="208" width="16" height="16"/>
<rect class="p-grn" x="320" y="208" width="16" height="16"/>
<rect class="p-grn" x="304" y="224" width="16" height="16"/>
<rect class="p-grn" x="320" y="224" width="16" height="16"/>
<rect class="p-grn" x="304" y="240" width="16" height="16"/>
<rect class="p-grn" x="320" y="240" width="16" height="16"/>
<rect class="p-grn" x="304" y="256" width="16" height="16"/>
<rect class="p-grn" x="320" y="256" width="16" height="16"/>
<line class="link" x1="344" y1="120" x2="320" y2="208"/>
<line class="link" x1="280" y1="136" x2="320" y2="208"/>
<line class="link" x1="344" y1="152" x2="320" y2="208"/>
<line class="link" x1="296" y1="168" x2="320" y2="208"/>
<line class="link" x1="344" y1="184" x2="320" y2="208"/>
</g>
</svg>
<figcaption>Persisted, well-connected context. The seed grows into a tree whose branches carry linked knowledge the agent can reach for.</figcaption>
</figure>

## References

- [Anthropic: Manage Claude's memory](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Claude: Opus 4.6 with 1M token context](https://www.anthropic.com/news/claude-opus-4-6)
- [arXiv: KV Cache Optimization Strategies for Scalable and Efficient LLM Inference](https://arxiv.org/abs/2603.20397)
- [arXiv: BaKlaVa, Budgeted Allocation of KV Cache for Long-Context Inference](https://arxiv.org/abs/2502.13176)
- [arXiv: KV-Compress, Paged KV-Cache Compression with Variable Compression Rates per Attention Head](https://arxiv.org/abs/2410.00161)
- [arXiv: Lost in the Middle, How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)
- [arXiv: Found in the Middle, Calibrating Positional Attention Bias Improves Long Context Utilization](https://arxiv.org/abs/2406.16008)
