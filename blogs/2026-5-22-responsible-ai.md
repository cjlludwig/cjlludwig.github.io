---
title: "AI Best Practices for the Workplace"
date: "2026-05-22T12:00:00Z"
slug: "ai-best-practices-workplace"
description: "The AI best practices your team needs before workslop quietly shifts the review burden onto your top performers."
tags: ["ai", "ai best practices", "ai productivity", "teams", "ai slop", "workslop"]
---

A common problem I see in AI transformation discourse is the obsession with tool usage above all else.

Are you using Claude Code / Cowork / Design yet? Codex? Some new hype-named skill like `grill-me`, `caveman`, or `superpowers`? What’s your token usage? Are you AI-native?

A lot of these conversations push usage as the goal without much guidance on effectiveness, conventions, or what “good” actually looks like. The result is real workplace friction.

One version of that friction is “workslop” ([HBR article](https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity)). AI-generated output that looks polished enough to pass along, but still requires someone else to review, correct, restructure, or fully redo it. Instead of making the team faster, it quietly shifts the burden onto the people most capable of catching the problems.

That's where the 10x productivity narrative starts to break down.

When weaker performers use generative AI poorly, they do not magically become 10x operators. They can just as easily produce 10x more vague analysis, oversized pull requests, half-checked summaries, and deceptively confident output. Then top performers feel responsible for absorbing that slop before it reaches customers, leadership, or production.

Now the team has not eliminated work. It has redistributed it.

One common response from the AI crowd is “just use AI to review it.” I think there's merit to that, but it's incomplete.

### Why AI Review Isn't Enough

AI review has two failure modes that make it unreliable as a standalone check. The first is incentive misalignment. Models are trained to produce output that gets approved, not output that's correct, and that shows up in review. RLHF training increased false-positive approval rates by 24.1% on QA tasks and 18.3% on coding tasks ([U-Sophistry, ICLR 2025](https://arxiv.org/abs/2409.12822)), and regressive sycophancy (abandoning a correct judgment under pressure) shows up in roughly 15% of cases across major models ([SycEval, Stanford 2025](https://arxiv.org/abs/2502.08177)). A reviewer that can be nudged off a correct call isn't a backstop, it's a rubber stamp with extra steps.

The second is attention. AI doesn't review a 2,000-line PR with the same focus it brings to 200 lines. Accuracy dropped from 94.9% to 44.5% as context grew from 4K to 128K tokens ([RULER, NVIDIA 2024](https://arxiv.org/abs/2404.06654)), with the worst failures concentrated in the middle of long contexts ([Liu et al., 2024](https://arxiv.org/abs/2307.03172)). The content a reviewer most needs to scrutinize is statistically the most likely to get missed.

Neither addresses the most obvious gap, the model has no stake in whether the work holds up in production. AI review can be a useful signal. It can't be a substitute for accountability.

### The Fix Is Better Norms  

What teams need is a set of norms for responsible AI usage in the workplace. Not to slow adoption down, but to make sure adoption actually improves the work instead of flooding the organization with faster, shinier garbage.

That redistribution isn't harmless. It creates a real operating tax:

- Trust erodes when teammates feel like they're reviewing unvetted AI output instead of collaborating with another professional.
- Capacity gets burned on cleanup. BetterUp Labs and Stanford found 40% of workers have encountered workslop, costing nearly two hours of rework per instance ([Study link](https://hrcsuite.com/burnouts-new-face-how-ai-workloads-are-stressing-out-your-top-performers/)).
- Top performers pay first. The people best equipped to catch the problems become the backstop for everyone else’s slop. And the promised efficiency gains rarely come back as breathing room. They get absorbed into higher output expectations, a pattern researchers are calling “workflation.” ([article](https://www.fastcompany.com/91441684/from-cognitive-decline-to-burnout-ais-overlooked-impact-on-workers))

The fix isn't another tool mandate. It's better norms and practice. Responsible AI usage needs norms for what individuals own, how teams collaborate, and what leaders choose to reward.

**Individual Responsibility**
- [Ownership](#ownership) — you ship it, you own it
- [Formatting](#formatting) — format for the medium before you share
- [Bloat](#bloat) — trim output to what your audience actually needs
- [Decompose](#decompose) — use AI to break down what AI built
- [Know Your Limits](#know-your-limits) — if you can't validate it, you're not contributing
- [Verify](#verify) — read it before you forward it
- [Disclosure](#disclosure-vs-non-disclosure) — label raw AI output, refine your own freely
- [Receiving AI Output](#receiving-ai-output) — ask questions, don't absorb review burden silently
- [Outsourced Reasoning](#outsourced-reasoning) — don't bias the model toward the answer you already want

**Team Practices**
- [Prompt Visibility](#prompt-visibility) — share inputs, not just outputs
- [Context Visibility](#context-visibility) — build a shared context corpus
- [Communication and Distribution](#communication-and-distribution) — central channels and a distribution mechanism
- [Automated Messages](#automated-messages) — vet the process, not just the post

**Org / Leadership Strategy**
- [Gamified Metrics](#gamified-metrics) — usage leaderboards produce volume, not quality
- [When Not to Use AI](#when-not-to-use-ai) — cognitive diversity is an asset
- [Showcase Discerningly](#showcase-discerningly) — a demo is not a signal of quality
- [Admit Defeat](#admit-defeat) — failures are worth surfacing too

---

### Individual

#### Ownership

First and foremost it needs to be understood that the user of AI is always responsible for the output they use. If you ship code generated by AI, it's your name on it, not Claude's. This assumption helps to drive home some of the accountability required, so poor usage is attributed to the owner.

#### Formatting

Never share unformatted or misformatted text from an AI tool. This is the fastest way to propagate workslop and lose coworker trust.

When I see a massive chunk of poorly formatted Markdown in Slack it indicates to me that my time is not worth the 10 cents worth of tokens it takes to ask AI to format for your medium or research a skill to help you do so.

Invest some time in finding or creating a few skills for copying into your preferred medium of choice. Slack, Confluence, email, all have some formatting idiosyncrasies that you need to massage into and it's your responsibility as the sharer to do so.

Also consider alternative mediums to share. Sometimes a massive debug session or data report isn't effectively communicated through a Slack, convert it to a Confluence page or even ask AI to write it to an HTML file. These have advanced visualization capabilities baked in and AI is very good at writing them from scratch.

If AI doesn't get you there then take the time to do so manually, the reputational savings outweigh the time savings.

#### Bloat

Writing text is cheap now. Your teammate's time is not. AI tools are often biased toward generating more than you need. Whether that comes from model behavior, product defaults, or token economics, the result is the same. It's your responsibility to make the output consumable.

Simple words like "brief", "succinct", and "concise" can all go a long way to restrain the output and help you tweak it to something actually readable by your audience.

#### Decompose

AI has given a lot of developers a new justification for enormous PRs. The logic goes, the agent implemented the full feature in one pass, so why split it up? The problem is that your implementation speed and the reviewer's processing speed are not the same variable.

A PR solving 10 things at once is faster to ship in the short run. It's also harder to review meaningfully, harder to roll back cleanly if something breaks, and harder to bisect when it does. That win on your end is just cost on theirs. A 10-month study of 2,500 code reviews found defect detection dropped from 87% on PRs under 100 lines to 28% on PRs over 1,000 ([SmartBear/Cisco](https://static1.smartbear.co/support/media/resources/cc/book/code-review-cisco-case-study.pdf)). Reviewers don't get worse at their jobs, they just run out of bandwidth.

This generalizes past code. A book sent in place of a memo. A 40-slide deck for a decision that needs one slide. The output got cheaper to generate, not cheaper to receive.

The move is to use AI for the next order of thinking, not just the first pass. The same agent that produced the monolith can be prompted to decompose it into smaller PRs that can ship on their own. That's a higher-leverage use of the tool. The smaller the slice, the easier it is to get across the line. You're not adding work downstream, you're removing it.

#### Know Your Limits

One prerequisite for sharing AI-generated work that doesn't get talked about enough: you need to be able to validate it's correct before passing it along.

AI is genuinely good at breaking down silos. A non-technical person can now generate a software architecture proposal, a solutioning doc, or a pull request against a platform codebase in minutes. At face value that looks like a win (everyone is an engineer now, 10x output). In practice, if the contributor has no way to assess whether the output is technically sound, they haven't contributed, they've handed a learning problem to someone downstream who actually can. In an RCT with 52 engineers picking up an unfamiliar library, AI users finished the task in similar time but scored 17% lower on a follow-up comprehension test. The AI did the work, so they couldn't have caught an error in it ([Shen & Tamkin, 2026](https://arxiv.org/abs/2601.20245)).

The domain expert on the receiving end now has to do a full review with none of the context on what constraints were or weren't considered when generating it. They can't just approve or push back cleanly. They have to re-derive the work themselves to know which parts are safe. That's the tax. That's not a productivity gain for the org, it's a reallocation. The contributor saved an hour and the expert spent two. When Copilot was introduced across open source projects, core developers reviewed 6.5% more code and saw a 19% drop in their own productivity ([Xu et al., 2025](https://arxiv.org/abs/2510.10165)). The efficiency gain was real, it just landed on the wrong person.

Before sharing AI output in territory you can't verify, ask honestly whether you could catch a meaningful error in it. If the answer is no, either build that foundation first, loop in someone who can validate before you ship, or be explicit with the recipient that you're sharing a starting point that needs expert eyes, not a finished contribution.

None of this is an argument for strict silo adherence. The problems behind these cross-domain pushes are usually real. The better move is to use AI to refine what you actually do understand: scope the problem, sharpen the definition, document your constraints from where you sit. A well-framed problem from a non-expert often gives an implementer everything they need to one-shot a solution. That's a genuine time save. A half-baked solution they have to disassemble first is not.

#### Verify

The minimum bar for distributing AI content is to actually read it, or test the process that generates it thoroughly. Stats and figures should come from tools and integrations, not the model spitting out values. AI is very good at analyzing large amounts of information but it will just as easily make up values without some checks and guidance. It's your responsibility to make sure you have some sort of smell test before forwarding content on.

Links are worth spot-checking too. A citation that 404s or points to an article that doesn't say what you claim is just as bad as no citation. If a stat or source matters enough to include, it matters enough to open the link.

#### Disclosure vs Non-Disclosure

Always disclose if you're copying raw AI output to share with colleagues. It baselines with everyone that you're sharing something you haven't had the capacity to thoroughly vet but you think is value add.

I often preface text blocks with the robot emoji (🤖) or a "Claude Dump" to level-set where it's coming from. This indicates respect for your peers and prevents them from assuming it hasn't been vetted and it reflecting poorly on you when there are some inaccuracies included.

Beyond courtesy, this actually changes how people engage with what you send. A study of 14,300 GitHub commits found explicitly labeling AI-assisted work triggered 23% more review questions and comments ([arXiv](https://arxiv.org/html/2512.00867v1)). The label signals "second look required", which is exactly the right response from reviewers.

Some AI output is also unmistakable for what it is. Em-dashes in every other sentence, every thought broken into headers and sub-bullets, colons where a comma would do, and a relentlessly helpful tone no one actually writes in naturally. Passing that off as your own isn't just bad etiquette, it's a credibility risk. Most people can spot it, and getting caught reads worse than labeling it upfront would have.

If you're refining a thought or text that you yourself wrote I don't think you're obligated to disclose the usage. You're actually using AI to improve the work output in that case to ease your recipients burden in that case.

#### Receiving AI Output

The norms above cover what to do as the sender, but you'll inevitably be on the receiving end too. A few principles worth holding:

Ask clarifying questions freely. If something reads like irresponsible AI output, a quick "did you check this?" is entirely reasonable, and the disclosure norm above is exactly what makes that conversation easy to have. The label removes the social friction.

Don't absorb the review burden silently. Quietly spending an hour cleaning up someone else's workslop is how the pattern perpetuates. Surface it once, offer the context on why it matters, and move on. The goal is a higher floor across the team, not punishing individuals.

#### Outsourced Reasoning

A subtler pattern I see with heavy AI users is the slow outsourcing of their own judgment. Instead of weighing an argument on its merits, they paste the whole disagreement into Claude and ask it to help counter the points. The model obliges every time, even when the other side is right.

That's the trap. A general purpose model will argue whichever side you assign it, tirelessly and confidently. If you prime it with the outcome you want, it aligns to that outcome and manufactures justification on demand (the well-documented [sycophancy problem](https://arxiv.org/abs/2310.13548)). The bias isn't really in the model, it's in the framing you handed it, and most users never see it.

The damage shows up in how decisions actually get made. When one person can generate an endless stream of polished rebuttals, the people offering good-faith feedback start to give up. Not because they were wrong, but because they're worn down. Arguing against a bottomless well of GenAI output is a losing game, and your sharpest people figure that out fast. You end up deciding through fatigue rather than merit, which is a quiet way to lose the exact dissent that keeps you honest.

None of this means AI can't sharpen your thinking. It's genuinely good at pressure-testing a position, surfacing counterpoints you missed, and poking holes in your logic. But you have to actually let it. Ask it to find the weaknesses in your own argument, not just ammunition against someone else's. The moment you hand it a predetermined conclusion, you've turned a reasoning tool into a confirmation machine.

### Team

#### Prompt Visibility

Share your prompts! It allows teams to collaborate and refine AI inputs together and catch issues that individuals often miss. Natural language can be finicky and there's a wide range of interpretation in communication and writing styles. By increasing visibility to raw inputs you'll be able to refine core communication skills required for your business processes.

#### Context Visibility

AI responses are heavily dependent on what context you provide as baseline. If you identify a common gotcha for your workflow and provide the context instruction as rules / memory / or system instructions that's worth sharing. Over time the team should get a rich corpus of common info to raise the baseline for all members using AI.

A good next step once you've built that corpus is to consolidate the most broadly applicable pieces into a shared team context document. Something your team can drop into new AI projects, system prompts, or config files to give everyone a consistent starting point. If your team's prompts are all starting from scratch with different framing, you'll get inconsistent outputs across people on the same tasks. A shared context doc closes that gap and gives you a single place to improve rather than everyone independently rediscovering the same fixes.

#### Communication and Distribution

Creating central channels to foster knowledge sharing, like `#ai-learnings` Slack channels, helps surface and share effective usage patterns. Doing it in the open allows the good patterns to trickle out from the power users and gives a forum to refine any that aren't fully up to par.

In parallel you need a mechanism to distribute the best in class skills and processes outlined for repeat usage. The bar should be low to start here but you'll need to tune your review process over time as adoption and dependency on core flows grow. A GitHub repo is a good start but maybe a Google Drive or similar cloud store works better for your team starting out. Either way it needs to be communicated on how to upload and download effectively.

#### Automated Messages

This one is a bit trickier as I think there's some merit to automating common messages, alerts, and processes through AI. I think the key is to ensure the messages are always accurate and contain continuous value.

If your scheduled post hits daily, follows the same format, and gets no reaction, it's noise, not value. Be open to tweaking or removing these posts over time as you find gaps. Place a high burden on yourself to vet the process outputs before blasting them to the masses.

### Org / Leadership

#### Gamified Metrics

Gamified incentives, like token leaderboards, are a sure-fire way to yield poor usage. Pushing for AI without an accompanying standard to reference will result in widespread workslop.

The data backs this up. Teams using AI coding assistants showed a 9% increase in bugs per developer and a 154% increase in average PR size with no improvement in delivery velocity ([Faros AI](https://www.faros.ai/blog/ai-software-engineering)). Volume went up, quality went down. If your only metric is usage you'll never see that tradeoff coming.

#### When Not to Use AI

A peer-reviewed study found teams with unequal AI access (some members using it, some not) outperformed teams where everyone had full access ([NIH/PMC](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12450962/)). The cognitive diversity from some members bringing unassisted judgment turns out to be an asset, not a gap to close.

It's worth building into your team norms which roles and tasks benefit from AI, and which ones should stay human. Not because AI can't help, but because the mix might already be working better than a full rollout would.

#### Showcase Discerningly

When leaders highlight a project or AI use case it holds a lot of weight. Few things kill AI momentum faster than championing a half-baked demo to your team. It signals you can't tell the difference between something that looks good on first pass and something that's actually ready to ship.

The tricky part is that AI collapses the time to demo. A prototype that would have taken weeks now takes hours, which sounds great until you realize demos were never a reliable signal of quality to begin with. What AI does is make the easy part even easier. Getting to a polished, reliable, production-ready product still requires the same attention it always did, and the demo is actively working against your ability to see that.

Require more than a demo before you put your name on something. Dig into edge cases, ask what breaks, use it yourself on a real workflow. The reputational cost of backing something that falls apart on contact is higher than taking a few extra days to properly evaluate it.

#### Admit Defeat

Failures are just as worth surfacing as wins. ICs know when an AI implementation isn't delivering because they're the ones using it every day. If your narrative is uncompromisingly positive you'll lose credibility with the people you most need to trust your judgment on what's actually worth pursuing.

It also makes it harder to cut losses. It's easy to keep pouring resources into AI efforts in the name of being "AI-native" when the underlying work isn't generating real value. Like any other tool investment, some efforts are worth doubling down on and some are worth cutting loose.

The good news is AI rewards this mentality more than most. Rapid prototyping means a clean restart with lessons learned is often faster than trying to salvage something brittle. The hard part is the admission itself, and being honest about what actually went wrong.

## References

- [HBR: AI-Generated Workslop Is Destroying Productivity](https://hbr.org/2025/09/ai-generated-workslop-is-destroying-productivity)
- [CNBC: AI-generated workslop is here, it's killing teamwork and causing a multimillion dollar productivity problem](https://www.cnbc.com/2025/09/23/ai-generated-workslop-is-destroying-productivity-and-teams-researchers-say.html)
- [Axios: AI "workslop" is crushing workplace efficiency, study finds](https://www.axios.com/2025/09/24/ai-workslop-workplace-efficiency-study)
- [Fast Company: From cognitive decline to burnout, AI's overlooked impact on workers](https://www.fastcompany.com/91441684/from-cognitive-decline-to-burnout-ais-overlooked-impact-on-workers)
- [HRD Connect: Is AI helping burnout or quietly making it worse?](https://www.hrdconnect.com/2026/03/16/is-ai-helping-burnout-or-quietly-making-it-worse/)
- [Emily Post: AI Etiquette Guidelines for the Workplace](https://emilypost.com/advice/ai-etiquette-guidelines-for-the-workplace)
- [Springer: The Case for Selective Non-Transparency in AI-Mediated Work](https://link.springer.com/article/10.1007/s10672-025-09567-z)
- [Upwork Research Institute: Burnout's New Face](https://hrcsuite.com/burnouts-new-face-how-ai-workloads-are-stressing-out-your-top-performers/)
- [Faros AI: The AI Productivity Paradox](https://www.faros.ai/blog/ai-software-engineering)
- [arXiv: The AI Attribution Paradox](https://arxiv.org/html/2512.00867v1)
- [NIH/PMC: Why unequal AI access enhances team productivity](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12450962/)
- [arXiv: Towards Understanding Sycophancy in Language Models](https://arxiv.org/abs/2310.13548)
- [arXiv: AI-Assisted Programming Decreases Expert Productivity (Xu et al., 2025)](https://arxiv.org/abs/2510.10165)
- [arXiv: How AI Impacts Skill Formation (Shen & Tamkin, 2026)](https://arxiv.org/abs/2601.20245)
- [SmartBear: Best Kept Secrets of Peer Code Review (Cisco study)](https://static1.smartbear.co/support/media/resources/cc/book/code-review-cisco-case-study.pdf)
- [arXiv: U-Sophistry — Language Models Learn to Mislead Humans via RLHF](https://arxiv.org/abs/2409.12822)
- [arXiv: SycEval — Evaluating LLM Sycophancy (Stanford, 2025)](https://arxiv.org/abs/2502.08177)
- [arXiv: RULER — What's the Real Context Size of Your Long-Context LLMs? (NVIDIA, 2024)](https://arxiv.org/abs/2404.06654)
- [arXiv: Lost in the Middle — How Language Models Use Long Contexts (Liu et al., 2024)](https://arxiv.org/abs/2307.03172)
