---
title: "Small Bug, Big Signal: Vercel’s Security Incident and a Skills.sh Vulnerability"
date: "2026-04-21T12:00:00Z"
slug: "vercel-hack-skillssh-security"
description: "I found a security bug in Vercel’s skills.sh before their data breach. Here’s what AI-driven developer tooling gets wrong about security."
tags: ["vercel hack", "vercel breach", "ai security", "vibe coding", "security", "vercel", "agents", "skills.sh", "data breach", "llm tools", "engineering"]
image: ""
---

Vercel just had one of the most significant [security lapses](https://techcrunch.com/2026/04/20/app-host-vercel-confirms-security-incident-says-customer-data-was-stolen-via-breach-at-context-ai/) of the vibe code / DevAI era.

It made me think of a recent security bug I identified in their popular `vercel-labs/skills.sh` framework. Back in January of this year, I read about a new framework to help distribute agent skills — reusable commands or generalized instructions — across the various providers and standards they require.

This was a great idea. The number of Dev Agents on the market has grown exponentially over the past year. Claude Code, Cursor, Kiro, and Windsurf, just to name a few. Each has introduced its own implementation requirements for largely the same agent tooling, including skills. For example, Claude Code requires skills installed in `.claude/skills` and Cursor in `.cursor/skills`. It becomes a mess to manage, especially as it’s now common to swap agents based on usage and pricing.

The beauty of `skills.sh` is that it uses symlinks — file pointers that let you place the same file in multiple locations — to manage a single skill and wire it across agents. It also provides a simple way to discover commonly used skills. A useful shortcut to see what others have already refined.

Skills themselves are simple — just Markdown text files — but English is a finicky interface. Your `beautify-ui` skill might not be as effective as the more widely used `pretty-ui` on `skills.sh`. Like any shared library, adoption becomes a signal of quality. Instead of building from scratch and iterating alone, it often makes sense to start from something already battle-tested.

So `skills.sh` solves a real problem in the DevAI landscape.

But that usefulness doesn’t stop at public sharing. It’s easy to see how the same model applies internally. Companies have workflows and architectural context that often live as tribal knowledge. That’s exactly the kind of information that’s hardest to distribute, whether to new hires or new agents.

A tool that can standardize and distribute those “skills” internally is immediately valuable. Which is why it was interesting to see that `skills.sh` works with private Git repos, even though it’s not well documented in the FAQ.

That’s where the obvious question comes in, are we exposing confidential information?

Private skills can easily include internal processes or architectural details. If those leak, even indirectly, that’s a real risk.

So the next question is whether you can opt out of data collection. The docs suggest yes, and largely wave away the concern:

> **Is any personal data collected?**
> No. The telemetry is completely anonymous and only tracks aggregate skill installation counts.  
> **Can I opt out of telemetry?**
> Yes. You can disable telemetry when using the CLI.

On paper, that sounds safe enough to start using internally.

“Not so fast, my friend.” — Lee Corso

I was still a bit distrustful. This tool was clearly vibe-coded to support a common DevAI use case. Nothing inherently wrong with that, but it does raise questions about how thoroughly edge cases — like telemetry opt-out — were handled.

So I did some digging and noticed that the privacy check I found, [`isRepoPrivate`](https://github.com/vercel-labs/skills/blob/bc21a37a12b90fcb5aec051c91baf5b227b704b1/src/source-parser.ts#L67), wasn’t just true or false like the name implied. It falls back to `null` if it can’t determine the state. That sounds reasonable, but from experience, I know that ambiguous states like this often lead to leaks if referenced in multiple places without strict handling.

Instead of digging through the codebase for hours, I enlisted my own “security expert,” Claude, and pointed it at the finding. I asked it to analyze potential gaps. Early on, the agent got confused when non-functional code comments contradicted the actual implementation, which is concerning. But after some iteration, it produced a solid overview. My suspicions were correct—the implementation leaked in several places.

I summarized the findings in a [Github Issue](https://github.com/vercel-labs/skills/issues/699) (posted in March) for the maintainers to review and address. Another developer even proposed a partial fix within a few days, which I reviewed. However, at the time of writing, one month later, the team still hasn’t reviewed or merged the fix.

This is significant because the bug directly contradicts the documentation and leads enterprise teams to believe the tool is safe for internal use. The amount of exposed data may be limited, but any exposure beyond what is documented is a problem. Several other engineers have commented on the issue, sharing similar concerns and frustration.

This brings me back to Vercel’s recent, much larger security incident. In that case, an AI tool became an attack vector due to poorly configured security settings. These are easy to overlook when the focus is on rapidly shipping demo-worthy features.

Core engineering principles like reusability, maintainability, and security often get sidelined because the AI-generated code appears to work. That’s likely the same root cause here. The framework works well for the common case of publicly shared skills, but once you move into edge cases, the layered AI-generated code starts to overlap and drift. Consistency and security guarantees degrade quickly.

Without stronger rigor and better validation processes, this wave of AI adoption will produce more incidents like this—hurting both companies and the customers who trust them.

We need to push back against skipping foundational practices like code review and proper quality gates in the name of speed. Shipping faster doesn’t improve outcomes if it puts credibility at risk.

## Resources

- [Vercel Hack](https://techcrunch.com/2026/04/20/app-host-vercel-confirms-security-incident-says-customer-data-was-stolen-via-breach-at-context-ai/)
- [Github Issue](https://github.com/vercel-labs/skills/issues/699)
- [`isRepoPrivate`](https://github.com/vercel-labs/skills/blob/bc21a37a12b90fcb5aec051c91baf5b227b704b1/src/source-parser.ts#L67)