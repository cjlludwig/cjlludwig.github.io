---

title: "Claude Code Save Plan Hook"
date: "2026-02-20"
slug: "claude-code-save-plan-hook"
description: Never lose a Claude Code plan again. A tiny Claude Code hook that copies your latest plan into docs/plans so it survives terminal restarts and stays tied to the repo."
tags: ["claude-code", "anthropic", "ai-agents", "developer-experience", "tooling", "devai"]
---
I’ve been using Claude Code enough that I now default to Plan before I let it touch anything. The downside is obvious the moment you start running multiple threads of work in parallel: you end up with several plans in flight, each mid-groomed, each representing real time spent nudging the model toward something you’d actually approve.

And then a run hangs, or the agent crashes, or the terminal gets into a weird state.

Anthropic (and, frankly, most agent runtimes) still have enough instability that “just restart the session” is a normal troubleshooting step. That’s fine until you realize you just lost the plan you carefully shaped into a crisp set of steps.

So I wired up a small hook that snapshots the latest Claude plan into the repo the moment Claude transitions from `Plan -> Edit`. It’s a pure quality-of-life upgrade, but one that very quickly becomes “how did I live without this?”

## The problem: plans persist, but not where you need them

Claude Code helpfully persists plans to a common location, `~/.claude/plans/{random_name}.md`.

That’s useful, but in practice it becomes a single bucket across all repos and sessions on your machine. If you’re hopping between projects (or juggling multiple plans), it gets messy fast.

What I actually wanted was:

* “When a plan is about to result in edits, save a copy inside **this repo**.”
* Name it something human-readable (based on the plan header).
* Make it safe to run repeatedly and safe across multiple tool invocations.

## The solution: snapshot on PreToolUse

Claude Code exposes hooks. A `PreToolUse` hook is the perfect place to do this because it runs right as Claude is about to invoke an editing tool.

The flow looks like this:

1. Claude creates/tunes a plan (persisted under `~/.claude/plans/`).
2. Claude is about to call `Write`, `Edit`, `MultiEdit`, or `Bash`.
3. Our hook runs:

   * Finds the most recently updated plan file.
   * Derives a slug from the plan’s `# Heading`.
   * Copies it into `docs/plans/{descriptive_name}.md` in the current repo.
   * Exits silently if there’s nothing to do.

From that point on, you’ve got a stable, repo-local record of the intent before implementation begins.

And because the file lives in your repo, it becomes easy to reference later in Claude prompts -- `@docs/plans/{descriptive_name}.md`.


## Why is this valuable?

Plans capture something that’s often missing in the final code, `intent`. Having that intent preserved inside the repo pays dividends well beyond simply avoiding lost work. It makes writing a strong PR description straightforward because you’re not reconstructing context from scattered code changes. It gives you a clean paper trail when debugging regressions, showing what you originally meant to implement. And it creates high-signal “why” documentation that stands apart from the implementation itself.

Instead of ephemeral agent chatter, plans become lightweight, versionable engineering artifacts that travel with the code.

---

## Hook implementation

Below is the exact setup: a `settings.json` hook plus a small Node script.

### Save plan hook

```json
// ./claude/settings.json
{
  "permissions": {
      "defaultMode": "plan",
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit|Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR\"/.claude/hooks/save-plan.js"
          }
        ]
      }
    ]
  }
}
```

### Save plan script

```js
// .claude/hooks/save-plan.js
import fs from 'fs';
import path from 'path';
import os from 'os';

const input = JSON.parse(fs.readFileSync('/dev/stdin', 'utf8'));
const { session_id, permission_mode } = input;

if (permission_mode !== 'acceptEdits') process.exit(0);

const lockFile = path.join(os.tmpdir(), `claude-plan-saved-${session_id}`);
if (fs.existsSync(lockFile)) process.exit(0);
fs.writeFileSync(lockFile, '1');

const plansDir = path.join(os.homedir(), '.claude', 'plans');
if (!fs.existsSync(plansDir)) process.exit(0);

const latest = fs.readdirSync(plansDir)
  .filter(f => f.endsWith('.md'))
  .map(f => ({ f, mtime: fs.statSync(path.join(plansDir, f)).mtimeMs }))
  .sort((a, b) => b.mtime - a.mtime)[0];

if (!latest) process.exit(0);

const content = fs.readFileSync(path.join(plansDir, latest.f), 'utf8');
const title = content.match(/^#\s+(.+)$/m)?.[1]
  ?.trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const outName = title ? `${title}.md` : latest.f;

const projectDir = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
const outDir = path.join(projectDir, 'docs', 'plans');
fs.mkdirSync(outDir, { recursive: true });

fs.copyFileSync(
  path.join(plansDir, latest.f),
  path.join(outDir, outName)
);

process.exit(0);
```

## Further Reading / Resources

* Claude Code documentation ([hooks, settings, tool lifecycle](https://code.claude.com/docs/en/hooks)).
