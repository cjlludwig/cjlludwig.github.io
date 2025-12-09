---
title: "Building AI Agents at Scale"
date: "2025-12-03T00:00:00Z"
slug: "building-ai-agents-at-scale"
description: "Notes from AWS re:Invent 2025: Scaling agentic systems, enforcing multi-tenant safety, and choosing the right architectural patterns."
tags: ["aws", "agents", "mcp", "ai", "architecture", "AWS re:Invent"]
---

# Building AI Agents at Scale

## TLDR
- AWS framed agent growth as a progression: flexible → structured → scalable → multi-tenant.
- Multi-tenant isolation using JWT-derived tenant IDs was a highlight.
- AgentCore + MCP demonstrated how guardrails and determinism evolve alongside capability.
- The simplified pattern-selection matrix clarified when to use orchestrators, graphs, workflows, and swarm.
- Conversational agents alone are insufficient—production systems demand predictability.

---

## From Chat Demos to Production-Ready Agents

The workshop walked through the real-world lifecycle of agentic systems. Early versions typically start as flexible, chat-centric prototypes. Over time, requirements shift toward **determinism**, **auditing**, and **strict routing**, especially in multi-tenant SaaS environments.

AWS used AgentCore and MCP registries to illustrate how this progression naturally unfolds: as capabilities expand, so must the structural safeguards around the agent.

---

## Tenant-Segmented Agents: A Required Safety Layer

One of the most practical demos showed the runtime automatically extracting a **tenant_id from the user’s JWT** and injecting it into every tool call. This ensured that Lambdas, REST APIs, and other backend tools were always scoped to the correct tenant.

This approach prevents:
- Cross-tenant data access  
- Hallucinated or incorrect tenant identifiers  
- Nondeterministic routing attempts  

The segmentation lives inside the agent definition rather than relying on the LLM to reason about tenant safety, making it especially attractive for ISVs and SaaS builders.

---

## Choosing a Pattern for Agentic Workflows

Instead of treating "agents" as a one-size-fits-all solution, the workshop broke down four distinct architectural patterns. The value was in understanding when each should be applied.

### Orchestrator  
Ideal for **early iteration and conversational front ends**.  
Highly flexible but weak in structure, determinism, and parallelism.

### Graph  
Ideal for **fast, structured, deterministic flows**.  
Explicit nodes and transitions provide strong control but zero conversational flexibility.

### Workflow Engine  
Ideal for **durable, auditable, production-grade orchestration**.  
Great for long-running or multi-system processes with retry and validation needs.

### Swarm  
Ideal for **rich conversational experiences**.  
High flexibility but not suitable for business-critical or deterministic flows.

---

## Real Systems Combine Patterns

One of the strongest messages from the workshop: **mature agentic systems almost never use a single pattern.**

Common progression:
1. Begin with an orchestrator for experimentation.  
2. Add Graph or Workflow engines for critical steps requiring determinism.  
3. Introduce multi-tenant enforcement at the runtime layer.  
4. Use swarm-style behavior only for conversational UX.

This approach balances flexibility with reliability as the system scales.

---

## Why It Matters

AWS reinforced that agentic capability isn't the hard part anymore—the surrounding **architecture** is.  
Predictability, safety, auditability, and routing controls are what distinguish a demo from a production system.

The agent is only as safe as the scaffolding around it. This workshop was all about building that scaffolding.

---

## Further Reading / Resources
- AWS re:Invent Session Catalog: https://reinvent.awsevents.com/
- AWS Documentation: https://docs.aws.amazon.com  
- Model Context Protocol: https://modelcontextprotocol.io  
- AWS Step Functions: https://aws.amazon.com/step-functions  
- Temporal Workflow Platform: https://temporal.io  

