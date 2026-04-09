---
title: "DevAI’s Velocity Trap"
date: "2026-04-05"
slug: "devai-velocity-trap"
description: "The AI coding narrative optimizes for speed. But when coding becomes free, the bottleneck moves — and quality debt compounds fast."
tags: ["dev ai", "software quality", "ai tools", "engineering culture", "velocity", "technical debt"]
image: ""
---

Simon Willison's [recent article](https://simonwillison.net/guides/agentic-engineering-patterns/better-code) nails a concept I've been mulling on, the primary DevAi benefit **"should be"** increased quality.

That framing runs counter to the narrative currently pushed by most inference providers (the shovel makers of the AI gold rush) and the hype ecosystem around them: that the primary benefit of DevAI is **"speed"**.

AI tools absolutely can increase development speed. But that speed comes with real trade-offs that engineering organizations should understand before pushing teams to 10× code output.

## Speed Kills

In the **"coding is free"** paradigm there are some pretty straightforward second order effects that are crucial to acknowledge:

1. Value of shipped code decreases -> when shipping features becomes cheap, teams ship more of them whether they create meaningful value or not.
2. Quality of software decreases -> as the volume of shipped code grows, the bar for releasing code drops (understanding, testing, validation) and the portion of the system fully understood shrinks.

The "[sloppification](https://en.wikipedia.org/wiki/AI_slop)" of software is an immediate repercussion. Suddenly every idea can get implemented in no time at all, and that starts to feel like justification for doing so. You can see this in the wild already, App Store submissions have [increased dramatically YoY](https://appfigures.com/resources/insights/20251205?f=2), Github commits are [growing at an exponential rate](https://x.com/kdaigle/status/2040164759836778878?s=20), and every consumer app is shoehorning in an AI chat interface (whether you asked for it or not.)

“Can we do something?” is no longer the blocker. “Should we do something?” now is.

With this volume increase in shipped features, the trade-off is almost always reduced understanding and confidence in what is being shipped. This compounds quickly over time and you dramatically increase the surface area of the system that you know you don't know anything about.

At that point it becomes a probability problem: when something undesirable will occur, not if. Just look at AWS internally admitting that GenAI has caused it to [break the internet](https://www.ft.com/content/00c282de-ed14-4acd-a948-bc8d6bdb339d) repeatedly in 2025, along with pretty much every major tech company suspiciously experiencing a significant drop in availability in the past year.

> TL;DR: There's no such thing as free lunch. Coding can be faster. That doesn’t mean it should be.

## Quality Counter - A New Hope

AI reduces knowledge gaps cheaply. We've built the most advanced knowledge tool in human history. You have a tool with the accumulated context of 50 yrs of the engineering profession at the scale of the human race, that should help you plug any gap in confidence in your own limitations through thoughtful search, learning, and implementation.

You should no longer be accepting “unknowns” before deploying features because of time constraints.

Research areas of ambiguity. Use the tools to harden systems. Find blind spots and bottlenecks.

With this shift, the trade-offs we’ve historically accepted start to change.

You no longer need to cut scope on valuable quality improvements just to meet timelines. Decisions have often come down to what you reasonably understand about a feature, forcing you to skip or defer anything ambiguous or difficult—performance work, resilience, compatibility, refactors.

Now, you can reasonably tackle those in the same implementation window.

## The Velocity vs Quality Tradeoff

The “10× code velocity” narrative is built on a flawed premise: that code output is the desired business outcome.

It’s not.

That framing optimizes for a metric for metric’s sake, rather than shipping meaningful, high-quality features.

And because we’re focused on the first-order effect (a faster code firehose) we’re not considering what more advanced usage of these tools actually enables.

There are two realistic paths presented here:

Scenario 1 (Optimistic Velocity Path):

- Defect Rate: Same as before AI
- Velocity: 10x
- Bugs: 10x
- Performance: Worse

Scenario 2 (Quality Path):

- Velocity: ~1.25x
- Bugs: ~0.5x
- Performance: 10x

The velocity narrative hides what happens if quality doesn’t improve.

Even in an optimistic case where defect rates stay flat (unlikely, given compounding knowledge debt), any increase in velocity directly scales bugs. 10× velocity → 10× bugs.

The real shift is to stop shipping unknowns. Instead of using AI to push more code through the system, you use it to reduce uncertainty before code ever ships. Understanding edge cases instead of skipping them, improving performance instead of deferring it, and hardening systems instead of assuming they’ll hold.

The outcome is still impactful to the business, just in a different way. Better features lead to more satisfied customers stronger retention, and ultimately more organic growth.

## Putting it together

The mental model for these tools needs to evolve past first-order speed gains into something more intentional. If we continue optimizing for velocity alone, we shouldn’t be surprised when customer experience declines alongside it.

These tools give us the opportunity to build better software, not just more of it. That requires being more deliberate. Thinking critically about what we build, why we build it, and validating that it actually works once shipped.

As Jeff Goldblum once said:
> Your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should...
