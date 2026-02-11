---

title: "Reasonable Autonomy in Claude Code"
date: "2026-02-11"
slug: "dev-agent-permissions-reasonable-autonomy"
description: "A practical guide to configuring Claude Code permissions for real-world workflows, with examples."
tags: ["AI Agents", "Claude Code", "AI Engineering", "Developer Tooling", "LLMs", "Security"]

---

As I’ve gotten deeper into Claude Code, I’m increasingly convinced the real risk with agent tooling isn’t capability, it’s behavioral drift. The UX nudges you toward momentum. The agent proposes actions. You approve. The loop keeps spinning. You get the dopamine hit of visible progress.

It feels great in the moment. But if you’re not careful, you slowly slide into a soft, sleepy pattern of ceding control. Prompts become noise. Approvals become reflex. And eventually you’re one unlucky 0.001 percent away from the LLM slot machine doing something catastrophic.

So the question becomes: what’s the practical harness for early adopters? How do you reduce constant friction without training yourself to auto-approve everything from sheer noisiness?

I’ve landed somewhere in the middle. Lenient reads and web searches. Loose edits inside repo directories with version control as the backstop. Strict denies around deletes and destructive git operations. The goal is fast planning and iteration, paired with deliberate pushes and rollbacks.

Anthropic’s reference configs are a useful starting point:
[https://github.com/anthropics/claude-code/tree/main/examples/settings](https://github.com/anthropics/claude-code/tree/main/examples/settings)

But they mostly demonstrate the extremes. In practice, serious workflows live in the middle.

## Permission Layers

The mental model that unlocked this for me is simple. Permissions behave like a firewall.

`Deny -> Ask -> Allow`

More precisely, rules are evaluated in order of authority. Deny rules take precedence. Ask rules trigger an explicit prompt. Allow rules auto-approve. Anything not matched falls back to an interactive prompt.

The nuance matters. It’s not just “deny always runs first” in isolation. It’s that deny is the most authoritative rule type. Ask sits in the middle as an intentional friction layer. Allow only applies when nothing stricter matches.

Once you internalize that ordering, you stop reacting to the permission system and start shaping it deliberately. Mentally, I design from the outside in: define hard denies first, then decide where I want explicit human confirmation, then loosen into auto-allow where it’s safe.

Another important shift is treating permissions as layered configuration, not a single toggle.

Claude supports three levels:

* global settings in `~/.claude/settings.json`
* project-shared settings in `.claude/settings.json`
* project-local overrides in `.claude/settings.local.json`

The move is straightforward but powerful. Push universally safe rules up. Push restrictive, context-specific protections down.

Reads and web access are safe everywhere. Those belong in global. Destructive operations and configuration protections are repo-scoped concerns. Those belong in project settings. If something is truly universal and low risk, let it live at the top. If it can damage a specific codebase, keep it close to the code.

## Tiers of Trust

From there, I think in three tiers of trust.

First is lenient. Auto-allow read-only operations like Read, WebFetch, and WebSearch. These are inherently non-destructive. Removing these prompts eliminates the highest-frequency friction with essentially no increase in risk. This is the biggest quality-of-life win. Claude can explore your codebase and reference documentation freely without interrupting your flow.

Second is loose. Broad Edit and Write permissions are what make the agent actually useful. This is where people get nervous. But source code is version-controlled. Git is your undo button.

The trick is pairing broad allows with targeted denies and, where appropriate, explicit ask rules. For example, explicitly deny edits to `.claude/settings*` so the agent cannot modify its own permission boundary. That protects the control plane while allowing mutation in the data plane. You can also choose to require confirmation for operations like `git commit` or `git push`, keeping irreversible or externally visible actions in the “ask” tier even if local edits are auto-allowed.

This becomes a trust-but-verify layer. Let it mutate code you can diff and revert. Protect the configuration that governs its behavior. Require confirmation when state escapes your local machine.

Third is strict. Hard deny destructive commands such as `rm`, `rmdir`, `git clean`, `git reset --hard`, `git checkout --`, and `git restore`. These are the operations where a mistake costs real work. Because deny rules take precedence, even a broad `Bash(*)` allow cannot override them. This is your circuit breaker layer.

Bash deserves special attention. File edits are scoped to your repo. Bash can touch the entire system. That asymmetry matters. Wildcard denies like `Bash(rm *)` let you block categories of destructive intent without preventing useful commands like `npm run tsc` or `make`. You don’t need to enumerate every safe command. Handle the extremes and let ask rules absorb the ambiguous middle.

One subtle but important insight is that you don’t need a rule for everything. Anything not explicitly denied, asked, or allowed will prompt. Commands like `git push`, `npm install`, or `curl` naturally land in that interactive middle unless you explicitly categorize them. That implicit prompt layer is a feature, not a flaw. It preserves friction where you haven’t yet built conviction.

## Putting it Together

What ultimately changed my thinking was realizing the default “prompt for everything” UX is not annoying safety theater. It’s the correct starting posture. You earn automation by understanding your workflow, not by disabling friction wholesale. You start conservative, observe where prompts are high-frequency and low-risk, then promote those into allow rules. You identify irreversible risks, then lock those into deny.

The temptation with agents is to optimize for velocity. But what you actually want is calibrated autonomy. Fast on read-only operations. Confident on reversible mutations. Explicitly confirmed on boundary-crossing actions. Paranoid on destructive ones.

The official examples skew either lax or ultra-strict. Most engineers want something else: low-noise exploration, high-speed iteration, intentional confirmation at trust boundaries, and hard stops on anything that can nuke state.

For me, the three-tier model fills that gap cleanly. Read-only operations get full trust. Reversible mutations get conditional trust with guardrails. Irreversible destructive operations get zero trust. Everything else lives in a deliberate ask layer until proven safe.

The result is an agent that moves quickly when it’s safe, pauses when it should, and stops entirely when it must. That’s the balance I’m aiming for.

## Examples

Here are some practical examples that you can drop into your own workflows.

### Global Settings

`~/.claude/settings.json` - Managed across the full machine or configured at enterprise level.

```json
{
  "permissions": {
    "allow": [
      "Read",
      "WebFetch",
      "WebSearch"
    ],
    "deny": [
      "Bash(rm *)",
      "Bash(rmdir*)",
      "Bash(git clean *)",
      "Bash(git reset --hard*)",
      "Bash(git checkout -- *)",
      "Bash(git restore*)"
    ]
  }
}

```

### Project-shared Settings

`.claude/settings.json` — checked into git, shared with all contributors

```json
{
  "permissions": {
    "allow": [
      "Edit",
      "Write",
      "WebFetch(domain:foo-bar.com)",
      "Bash(npm run tsc:*)",
      "Bash(npm run test:*)",
      "Bash(make:*)",
      "Bash(file:*)",
      "Bash(wc:*)",
      "Bash(which:*)",
      "Bash(npx gatsby build:*)"
    ],
    "deny": [
      "Edit(.claude/settings*)",
      "Write(.claude/settings*)",
    ]
  }
}
```

### Project-local Overrides

`.claude/settings.local.json` — git-ignored, personal workflow preferences

```json
{
  "permissions": {
    "allow": [
      "Bash(python3:*)",
      "Bash(ln:*)",
      "Bash(sips:*)",
      "Bash(pdfunite:*)",
      "Bash(pdfjam:*)",
      "Bash(pdftoppm:*)",
      "Bash(npm run foo:*)",
      "Bash(npm run start:*)"
    ]
  }
}
```

This is where individual tooling goes — PDF processing utilities (sips, pdfunite, pdfjam, pdftoppm) that depend on
local installs, python3 for scripting, and commands like npm run foo that require a personal OPENAI_API_KEY. Another
contributor might not have these tools installed or the API key configured, so they don't belong in the shared file.

The split in practice: Shared settings handle what's universal to the project (Gatsby builds, TypeScript checks,
destructive command blocks). Local settings handle what's specific to your machine (PDF tools, API-dependent scripts,
dev server preferences).
