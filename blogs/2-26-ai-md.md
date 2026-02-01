---
title: "Using Markdown Templates with AI"
date: "2026-02-01"
slug: "using-markdown-templates-with-ai"
description: "While working with LLM tools for production application development, I’ve found one of the highest-leverage productivity hacks to be the use of Markdown..."
tags: ["dev ai", "cursor", "claude code", "tech doc", "markdown templates", "llm tools"]
image: ""
---

While working with LLM tools for production application development, I’ve found one of the highest-leverage productivity hacks to be the use of Markdown templates for consistent documentation and SDLC processes.

Documentation is, at best, a chore for most developers and, at worst, a curse word. It’s frequently treated as an afterthought. Something written post-release to appease management. Headless LLM coding agents change the economics of that behavior entirely.

Where teams previously absorbed the cost of poor documentation through strong onboarding, tribal knowledge, and sheer camaraderie, LLM-driven workflows surface that cost immediately. You now pay for bad docs in wasted tokens, broken inference loops, and repeated iterations to reach something even marginally commit-worthy. And that’s assuming you’re validating the generated code at all, which I sincerely hope you are.

In an LLM-as-dev world, documentation-as-code becomes far more compelling. LLMs are already excellent at navigating codebases. Storing documentation alongside logic makes more sense than scattering it across wikis, tickets, and third-party tools.

You *can* mitigate some of this fragmentation with MCPs, but every additional system is another logical hop for the model to reason through. That friction adds up. I strongly prefer treating the repo as the source of truth and copying documentation outward *after* publication, not the other way around. This keeps docs embedded in normal development workflows where review is required and documentation is treated as an iterable artifact, not a static deliverable.

## Organization

Most conventions push teams toward centralizing repository documentation under a `/docs` directory. This keeps the project root clean while still allowing flexibility underneath.

Within `/docs`, organize by concern in whatever way feels most natural to your team. At a minimum, I like including a `/specs` directory to aggregate feature-level documentation over time for fast reference. Higher-level architectural material, such as technical requirement docs or design overviews, often fits cleanly under something like `/trds`.

The critical detail is that *each* subset should include a generic `TEMPLATE.md` to drive consistency and baseline quality.

When developers are left to their own devices, shorthand notes and half-formed thoughts tend to get promoted directly into “official” docs. That works for the author’s mental model, but it introduces cognitive friction for everyone else. The same friction shows up for LLMs. Missing structure or references often breaks self-navigation and forces extra inference cycles, which is just wasted spend.

I also recommend placing a `README.md` at the top of the `/docs` folder to clearly outline conventions, expectations, and stylistic rules.

```markdown
/docs
├── README.md              # Conventions, style guide, template usage
├── TEMPLATE.md            # Default doc template
├── /specs
│   ├── TEMPLATE.md        # Feature spec template
│   ├── user-auth.md
│   └── data-pipeline.md
└── /trds
    ├── TEMPLATE.md        # Technical requirements template
    ├── architecture.md
    └── system-design.md
```

## Templates

Markdown templates are open-ended documents with a prescribed structure and conventions. Their job is to guide discovery, thinking, and note-taking, not to constrain expression.

Finding the right balance between rigid structure and intuitive guidance is non-trivial and somewhat personal. As a rule of thumb, keeping hierarchical depth under three levels and total sections under five or six tends to land in a sweet spot.

Beyond that, templates start to feel like busywork. You get sections that aren’t applicable, filler text written purely to satisfy structure, and documentation that exists to be completed rather than read. That defeats the purpose. The goal is comprehension, not completeness theater.

### Types of Templates

1. PR templates – must have
2. Specs – nice to have
3. Architecture / technical docs – nice to have
4. Agent rules – nice to have

### General Recommendations

* **Use LLM hints.**
  Markdown comments are a clean way to embed guidance for LLMs without polluting the human-readable surface area of a document.

* **Distinguish human guidance from LLM hints.**
  Use blockquotes (`>`) for human-facing template descriptions that should be removed on publish. This creates a clear visual distinction: comments stay (for LLMs), blockquotes go (replaced by real content). It also makes cleanup obvious during review.

* **Lead with a rules alert.**
  Place a [GitHub-flavored alert](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) (`> [!NOTE]`, `> [!TIP]`, etc.) at the top of each template summarizing core rules: what the doc is for, how to handle optional sections, and what to remove before publishing. This primes authors before they start writing and makes expectations explicit rather than implied.

* **Use Markdown formatting tools and linters.**
  Tools like [markdownlint](https://github.com/markdownlint/markdownlint) help deterministically enforce conventions and prevent slow stylistic drift.

* **Be opinionated about style.**
  Templates and documentation formats are inherently opinionated. Don’t shy away from nit-picky rules. Once adopted, they compound in value.

* **Leverage LLM rules.**
  Cursor rules, `CLAUDE.md`, `AGENTS.md`, and similar mechanisms should be used aggressively. If you like Mermaid diagrams, say so. If you dislike deep sub-headers, document it. This moves tool output closer to a peer dynamic rather than a guessing game.

* **Use visualization extensions.**
  Markdown extensions like [Mermaid.js](https://mermaid.js.org/) and Code Snippets are excellent for breaking up walls of text. Diagrams often convey nuance more efficiently than prose for both humans and LLMs. Use them for flows, graphs, and system relationships.

* **Always preview rendered output.**
  Make sure you can preview how docs render on GitHub or your target platform. Nothing undermines trust faster than a diagram that fails to render in production.

* **Don’t escape the template too early.**
  There’s a strong instinct to abandon structure when a section feels heavy or “not applicable.” Instead, work through it with an LLM as a collaborative brainstorming exercise. You’ll often discover what *isn’t* needed only after fully considering what *could* be. Over time, this sharpens both the templates and the resulting documentation.

## Tools

Here's a practical toolkit for working with Markdown templates and docs-as-code workflows:

### VS Code / Cursor Extensions

* **[Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)**  
Keyboard shortcuts, TOC generation, auto-preview. Eliminates friction for basic formatting tasks.

* **[markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)**  
Enforces consistent style. Configure via `.markdownlint.json` in your repo root. Catches trailing whitespace, heading structure violations, and other formatting drift before it compounds.

* **[Markdown Preview Mermaid Support](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid)**  
Renders Mermaid diagrams in the built-in preview pane. Essential for validating flowcharts and architecture diagrams without leaving the editor.

* **[Paste Image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image)**  
Pastes screenshots directly into docs with auto-generated relative paths. Useful for quick captures during troubleshooting or pairing sessions.

### Web Tools

* **[Mermaid Live Editor](https://mermaid.live/)**  
Iterate on diagrams with instant preview. Export to SVG or PNG. Faster than fighting with syntax in your editor when building complex flows.

* **[StackEdit](https://stackedit.io/)**  
Browser-based Markdown editor with live preview, sync to GitHub/Google Drive, and export to HTML/PDF. Helpful for non-technical stakeholders who need to contribute docs without local tooling.

* **[HackMD](https://hackmd.io/)**  
Collaborative Markdown editor. Real-time multi-user editing with GitHub sync. Good for RFC-style documents or async spec reviews.

* **[Tables Generator](https://www.tablesgenerator.com/markdown_tables)**  
Visual table builder for Markdown. Avoids manual pipe-alignment hell for complex tables.

### Automation

**Pre-commit hooks**  
Wire up `markdownlint-cli` or `prettier` to run on staged `.md` files. Prevents broken formatting from reaching main. Example:
```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/igorshubovych/markdownlint-cli
    rev: v0.39.0
    hooks:
      - id: markdownlint
```

**GitHub Actions**  
Automate link checking and diagram validation in CI. [markdown-link-check](https://github.com/tcort/markdown-link-check) catches broken URLs. Pair with Mermaid CLI to validate diagram syntax before merge.

## Putting It All Together

Below is a reference template and a sample GitHub repository that show these conventions in practice. The template reflects the structural constraints discussed above, and the repo demonstrates how documentation, specs, and agent rules live alongside code as first-class artifacts.

If you adopt nothing else, start with the template. Once it’s in place, the surrounding structure tends to emerge naturally.

### Repo

See [llm-md-templates](https://github.com/cjlludwig/llm-md-templates) repo for a boilerplate reference.

### Template

```md
# Feature: [Title]

> [!NOTE]
> **Template rules:**
> - This doc captures a feature from problem through implementation criteria.
> - Replace blockquoted guidance with your content as you go.
> - Delete sections that don't apply—not every feature needs every section.
> - Remove this alert before marking the doc as complete.

<!-- LLM: This is a feature spec. Focus on problem statement and success criteria before implementation. -->

## Problem Statement

> Describe the user pain point or business need. Be specific about *who* is affected and *why* this matters.

## Proposed Solution

> High-level approach. Avoid implementation minutiae—focus on the "what" and "why."

### System Context

<!-- LLM: Use this diagram to understand service boundaries and data flow. -->

> Update the diagram below to reflect actual system boundaries.

'''mermaid
flowchart LR
    A[Client] --> B[API Gateway]
    B --> C[Service]
    C --> D[(Database)]
'''

## Success Criteria

<!-- LLM: These are non-negotiable acceptance criteria. All must be satisfied. -->

> Define measurable criteria. Remove placeholders.

- [ ] Criterion 1
- [ ] Criterion 2

## Open Questions

> Track unresolved decisions. Remove this section when all are resolved.

| Question | Owner | Status |
|----------|-------|--------|
| Example? | @owner | Open |
```

> **Note:** Replace `'''` with standard code fences. Shown escaped here to render correctly in the parent block.