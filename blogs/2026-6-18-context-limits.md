---
title: "AI Context Window Limits in the Real World"
date: "2026-06-18T12:00:00Z"
slug: "ai-context-window-limits"
description: "Why AI coding agents struggle in large codebases, and how context windows, AI memory, and lost-in-the-middle behavior shape real adoption."
tags: ["ai context window", "ai limits", "ai memory", "ai coding agents", "context engineering", "large codebases", "ai adoption"]
image: ""
---

The debate around AI often swings between two extremes. It will take over everyone’s job, or it can barely do anything useful. Both arguments usually skip the technical constraints that determine where AI actually works.

The missing layer is that practical limits are not only about model quality. They are about whether the model can see the right information, retain the right information, ignore irrelevant information, and apply the right organizational constraints at the right moment. In real companies, that context is rarely clean, centralized, or complete.

You can see this most clearly in the difference between greenfield work and established systems.

Where does AI succeed reliably today? Most of the biggest wins are in well-defined tasks or open-ended asks, with the most impressive examples showing up in greenfield initiatives. These are cases where the initial constraints are minimal, so the model can operate with fewer bounds. You see this in many vibe-coded projects and highly publicized tools like Claude Code, Codex, and other coding agents. The solution space does not have to account for much because it is mostly open-ended. The user does not need strong opinions on the “how” because there are few constraints outside of the goal, the prompt, and any explicit requirements provided up front.

I like to think of these cases as starting from a small seed. The prompt provides enough direction for the project to germinate from almost nothing.

```figure
name: greenfield
```

Where does AI tend to struggle? Almost any application in a well-established domain, product, or workflow can quickly decay into frustrating results. The same small seed of an initial prompt doesn't reliably reach the desired end state because established systems have boundaries that are almost always implicit.

Pre-existing codebases, toolchains, deployment patterns, company conventions, architectural decisions, and historical tradeoffs all influence what “done” actually means. You cannot just drop a novel toolset and codebase into a mature environment and expect it to work seamlessly with millions of lines of code already running in production.

```figure
name: established-codebase
```

This isn't to say that AI can't do well in these codebases but we have to "trick" the agent into acting like it has all of that pre-existing context we take for granted, which isn't a trivial effort. We do this in a variety of ways but the most common is through a strategy called "progressive disclosure", where we tie bits of relevant information with the portions of the codebase they help explain.

For example, if you've got some nuance to how your company runs infra you may include an `AGENTS.md` file in your `/tf` directory with all the templates related to the codebase's infra. When the agent peeks into that section of the code it will always load that context, making sure it's only loaded when relevant. There's a variety of other advanced "tricks" for working around these context windows but they all involve some form of selectively loading only the relevant information when needed.

```figure
name: progressive-disclosure
```

Why does this matter? Because LLMs do not experience context the way humans do.

1. The model has no durable memory.
   * Every AI tool mimics memory by putting history, preferences, files, docs, or summaries back into the model’s context. Even tools with project memory still start each new session with a fresh context window and reload the relevant information back in. That means “memory” is usually less like a human remembering something and more like giving the model a packet of notes before it answers. The same basic idea applies to long-running ChatGPT threads. The more history the tool tries to preserve, the more prior context has to be carried forward, summarized, or selectively reintroduced.

2. The model has a strict finite attention span.
   * This concept is technically defined as a context window, the upper limit of what an LLM can process in a single call. In every AI tool you use, if this limit is hit, something has to be summarized, condensed, or cut off to make room for incoming information. It is tempting to ask why we do not simply make the window bigger, but long context is expensive. The model has to keep track of the surrounding information while generating each new token, which consumes hardware memory, compute, and time. Modern million-token windows exist now ([Claude](https://www.anthropic.com/news/claude-opus-4-6)), so the limit is moving, but bigger windows are not free and do not remove the underlying constraint.
3. The model does not focus consistently.
   * Even if you can fit a lot of information into the window, the model may still miss the thing that matters. Long context can behave like a giant meeting transcript. The answer might technically be in there, but that does not guarantee the model will reliably find and use it. Details in the “middle” tend to get lost ([arXiv](https://arxiv.org/abs/2307.03172)).

```figure
name: lost-in-the-middle
```

It's tempting to think a big enough window ends this conversation. If a model holds a million tokens, surely it can swallow your whole codebase and get on with it. The catch is that agents don't load a codebase once and sit still. Every turn they read files, run commands, trip over errors, and pull in info, and all of that lands back in the window on top of everything already there. The window isn't a container you fill, it's a running tally that compounds with each interaction. A handful of tool calls against a real repo burns through that million tokens faster than you ever could by hand, and you're back to summarizing and cutting before the task is even finished.

These facts compound to really force you to consider how can I get all of the relevant information for a given task loaded in one-shot in the fewest words possible.

```figure
name: finite-window
```

So how does all of this relate to "AI takeover" discussions? Humans are notoriously bad at estimating effort and level of difficulty, especially in abstract spaces like "context." Most real software work depends on far more than the files being edited. The relevant context includes the codebase, docs, tickets, logs, systems behavior, historical decisions, company conventions, in-person conversations, and the stuff experts only know because they have been burned by it before. That total context can easily spill outside even very large context windows, so an LLM is always going to require retrieval and summarization tricks to get it to understand a given task.

The natural direction is to start persisting this context where missing and connecting LLMs to knowledge silos in companies where these types of docs have been stored for the past few decades. These efforts will consistently raise the bar for AI performance when done well, and compound over time, but most pundits underestimate both the quality of existing docs and the level of difficulty required to associate the information with the right parts of codebases on-demand.

A simple anecdote is to consider the average employee onboarding experience at a given company. In 99% of companies this experience is known to have significant gaps that are constantly accumulating. You often have to pair with an expert for months to get even the baseline understanding of the lay of the land and start to understand how to operate as a novice in the space. We all know this to be true but forget that this same onboarding process is a pre-req for effective LLM implementations at scale as well.

This is not to say that AI can't make immediate impact in organizations OOTB today, but just that we do a bad job articulating gaps where they exist and the entire community would be much better off understanding some of the foundational constraints in the tools we're advocating for.

Greenfield AI can grow from a small seed because there is little existing terrain to respect. Enterprise AI needs more than a seed, it needs soil. Mapped systems, retrievable context, documented conventions, good evals, and the accumulated judgment of the people who know where the sharp edges are.

I'm optimistic about applied AI, but am skeptical of predictions that ignore the ground conditions. The practical path is not to argue from viral tweets. It's to understand the constraints, improve the context layer, and experiment against real workflows. The teams that do this well will get far more value from AI than the teams that treat a bigger context window as a substitute for organizational knowledge.

```figure
name: connected-context
```

## References

- [Anthropic: Manage Claude's memory](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Claude: Opus 4.6 with 1M token context](https://www.anthropic.com/news/claude-opus-4-6)
- [arXiv: KV Cache Optimization Strategies for Scalable and Efficient LLM Inference](https://arxiv.org/abs/2603.20397)
- [arXiv: BaKlaVa, Budgeted Allocation of KV Cache for Long-Context Inference](https://arxiv.org/abs/2502.13176)
- [arXiv: KV-Compress, Paged KV-Cache Compression with Variable Compression Rates per Attention Head](https://arxiv.org/abs/2410.00161)
- [arXiv: Lost in the Middle, How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172)
- [arXiv: Found in the Middle, Calibrating Positional Attention Bias Improves Long Context Utilization](https://arxiv.org/abs/2406.16008)
