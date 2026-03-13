---
title: "AI Agents Ate the Conference: Reality, Hype, and Hard Lessons from re:Invent"
date: "2025-12-08"
slug: "ai-agents-ate-the-conference"
description: "A candid engineer's recap of re:Invent 2025: the gap between leadership and engineering on AI agents, and what real-world agent architecture looks like."
tags: ["Agents", "AI Engineering", "AWS re:Invent", "Agentic Systems", "LLMs", "Architecture"]
---
# AI Agents Ate the Conference

Another re:Invent is in the books, or as I like to call it, **Cowboys and Coders Week**. The PBR championship always lands on the same dates, so the Strip fills up with a strange mix of hoodies, boots, and people loudly comparing Cybertrucks to F-150s.  

I walked away with plenty of technical notes, but the real value of re:Invent has always been the **industry temperature check**. You get tens of thousands of engineers across every company size and maturity level all wrestling with similar problems. This year, the collective mood around AI and agents felt especially sharp:  
 **we’re all still figuring this out, even the AWS teams building the tools.**

---

## The Leadership–Engineering Perception Gap

One theme kept resurfacing in keynotes, chalk talks, and hallway conversations:  
**leaders and engineers are not talking about the same kind of “agents.”**

### What leaders are saying

If you watched the [re:Invent keynotes](https://reinvent.awsevents.com/keynotes/), you saw a pitch for highly capable, nearly autonomous agent systems:

- Acting independently  
- Built in a fraction of the time  
- Seamlessly pushed to production  
- Reasoning and adapting with minimal supervision  

It’s an inspiring narrative that occasionally feels like a recruiting pitch for AGI.

### What engineers are actually building

The engineers presenting the 400/500-level sessions told a very different story:

- Production agents are not monolithic super-intelligences.  
- They’re **collections of tiny, tightly scoped agentic units**, each responsible for one well-bounded task.  
- These pieces require **substantial upfront design**, narrow inputs, deep evaluation, and consistent benchmarking.  
- The “intelligence” shows up only when these small components are stitched together.

Multiple sessions quietly converged on the same rules of thumb for production agents: most useful ones end up making binary decisions in practice, things like "rotate traffic" or "hold steady." They work best when they only read from one or two input streams. Teams increasingly run them as sidecars so that when they misbehave the blast radius stays small. Swarms did get mentioned, but usually as something people tried, then backed away from because the operational overhead was not worth it.

Not exactly the sci-fi ideal of end-to-end autonomy.

### Why the gap matters

Leadership hears “autonomous coworkers.”  
Engineers hear “a lattice of brittle reasoning units that each require a test suite.”  

Both perspectives contain truth, but the mismatch is already creating friction inside engineering orgs. Bridging that expectation gap will be essential for successful agent launches.

---

## The Coding Benchmark Illusion

A session from the AGI team on frontier model benchmarking took aim at well-known “85% coding score” from frontier models.

Leadership interpretation:  
> “85% of expert-level capability. We can automate 85% of engineering.”

But the team’s visualization looked more like a set of nested buckets:

1. **Real-world engineering work**  
2. → Recorded engineering tasks  
3. → Golden benchmark tasks  
4. → The benchmark itself  

The score at the bottom is **a fraction of a fraction of a fraction** of actual engineering capability. That nuance often evaporates when the stat hits a slide deck, and expectations drift accordingly.

That illusion gets worse over time. Eval datasets are increasingly contaminated, frontier models are now "seeing" a meaningful chunk of the test set during training, and small changes to prompts or decoding parameters can move scores more than most slide decks admit. We compress a messy, non deterministic capability space into a tidy number that looks scientific, but often is not measuring what we think it is.

---

## Workflows, Graphs, and Swarms: The Great Agent Design Schism

Another pattern surfaced across sessions.

### What the advanced sessions endorsed

Most 400/500-level talks promoted structured workflows with optional business-intent orchestration. Think:

- Task-specific agents with clear responsibilities  
- Strong output guarantees  
- Controlled dynamic routing  
- A grounded, production-ready architecture  

The clearest example came from AWS’s new work on **Lambda Durable Functions**, which formalizes multi-step workflows and long-running agentic patterns. It’s worth reading the announcement:  
[Build Multi-Step Applications and AI Workflows with AWS Lambda Durable Functions](https://aws.amazon.com/blogs/aws/build-multi-step-applications-and-ai-workflows-with-aws-lambda-durable-functions/).

### What the mid-level sessions showcased

The 200/300 tracks leaned toward chat-centric demos:

- Dynamic graphs where sub-agents act as tools  
- A single chat agent orchestrating everything  
- Occasional references to **swarms**, usually with very few implementation details  

Swarm examples mostly appeared in keynotes, which didn’t help make the case for real-world scalability.

### The deeper issue

We use **“agent”** to describe:

- Structured workflows  
- Chat interfaces with tool access  
- Loose collections of semi-autonomous components  
- A tuned LLM with triggers and actions  

With a vocabulary that broad, it’s no surprise teams talk past each other. A shared mental model is still emerging.

---

## The Rise of AI-Native Development (…Almost)

In conversations with other engineers, tool adoption felt uneven. Cursor, Copilot, and Kiro are gaining traction, but they’re still far from universal.

Many sessions focused on the mindset shift required to make these tools effective. No matter the name—*spec-driven development*, *context engineering*, or something similar—the message was consistent:  
AI is only a force multiplier once we change **how** we work, not just which IDE we use.

For a good summary of the broader trend, these pieces from AWS and industry analysts capture it well:

- [5 Qualities to Become the Renaissance Developer in the AI Era](https://builder.aws.com/content/36PrCPEn56UGlBrGdcbbeIvlT51/5-qualities-to-become-the-renaissance-developer-in-the-ai-era-aws-reinvent-cto-keynote-summary)  
- *The Kernel*: [Dawn of the Renaissance Developer](https://thekernel.news/articles/dawn-of-the-renaissance-developer/)

---

## Fine-Tuning: More Accessible, Still Optional

My team has avoided fine-tuning because doing it safely in production takes specialized expertise. This year’s SageMaker announcements lower that barrier significantly.

Right-sized and tuned models are becoming more compelling for targeted tasks, but my position hasn’t changed:  
**start with off-the-shelf models, ship the MVP, then optimize.**  
Fine-tuning remains an optimization path, not a default strategy.

---

## Great Non-Agent Announcements That Got Buried

The agent wave overshadowed several genuinely useful platform updates. Among the ones that deserved more attention:

- **Database Cost Planner**: [Introducing Database Savings Plans for AWS Databases](https://aws.amazon.com/blogs/aws/introducing-database-savings-plans-for-aws-databases/)
- **Extended Lambda function duration**: [Build multi-step applications and AI workflows with AWS Lambda durable functions](https://aws.amazon.com/blogs/aws/build-multi-step-applications-and-ai-workflows-with-aws-lambda-durable-functions/) 
- **Custom Lambda environments**: [Introducing AWS Lambda Managed Instances](https://aws.amazon.com/blogs/aws/introducing-aws-lambda-managed-instances-serverless-simplicity-with-ec2-flexibility/)  

Some team absolutely spent a year shipping these capabilities only to get overshadowed by agent demos. I salute them.

---

## Werner Vogels, Voice of Reason (Again)

Werner delivered one of the strongest keynotes this year, and it’s worth watching:  
- **CTO Keynote:** https://www.youtube.com/watch?v=3Y1G9najGiI  

He dismantled the “end of the developer” narrative by tracing similar predictions through COBOL, visual programming, cloud, and every other wave of existential anxiety. The pattern is familiar:  
> “Engineers won’t be needed soon.”

Reality always contradicts it. Each wave has increased demand for software and for people who build it.

AWS's companion resource is also worth reading:

- The AWS summary:  
  https://builder.aws.com/content/36PrCPEn56UGlBrGdcbbeIvlT51/5-qualities-to-become-the-renaissance-developer-in-the-ai-era-aws-reinvent-cto-keynote-summary  

Werner’s core messages:

- AI is an enabler, not a replacement  
- Adaptation beats anxiety  
- Curiosity matters  
- And the line that instantly entered tech folklore:  
  **“Vibe coding without human review is gambling.”**

It hit especially hard after attending a session on self-evolving agents where no one could clearly explain how accountability works once you remove HITL. If there’s no human on the hook, how do you trust the system at all?

Werner’s stance was refreshing:  
**human review stays in the loop, and ownership remains with the developer.**

---

## The Important Stats

- **Sessions attended:** 13 + 4 keynotes  
- **Steps walked:** 68,300  
- **Most steps in one day:** 21,450  
- **Swag collected:** 1 hoodie, 4 shirts, 1 sock  
- **Plates consumed at Bacchanal Buffet:** 4  
- **Connor Bedard goals scored:** 2 (go Blackhawks!)  
- **Blizzards driven through:** 1  
- **Cups of coffee:** ∞  

---

## Final Thanks

Huge thanks to **Built Technologies** for investing in employee upskilling and giving me the chance to attend. I always come back from re:Invent with fresh ideas, but this year felt especially pivotal. The agent landscape is evolving fast, and it’s clear we’re still only at the beginning of figuring out what production grade agents actually look like in practice.
