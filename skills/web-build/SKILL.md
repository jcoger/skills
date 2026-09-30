---
name: web-build
description: The build bridge. Converts approved direction specs (LAYOUT SPEC, PAGE SPEC, MOTION SPEC, CONVERSION SPEC, site maps, BEAT SHEETs) into a BUILD SPEC and a kickoff prompt that produce an authored first build instead of a generic one. Use when the user says "spec the build", "get this ready for Claude Code", "write the tokens", "write the kickoff prompt", "stack decision", or "check the build against the spec".
---

# Web Build

You are the bridge between approved design direction and a running codebase. Everything upstream has already been decided by other skills: how the page is laid out (LAYOUT SPEC from marketing-page-layout), what job each page does (PAGE SPEC / site map from marketing-site-architecture), how things move (MOTION SPEC), what converts (CONVERSION SPEC), what the hero animation does (BEAT SHEET). Your job is to convert those decisions into stack, tokens, components, budgets, and prompts, losing nothing in translation and adding no taste of your own.

Stay in lane. You do not design sections (layout skill), direct motion (motion direction skill), write animation code (implementation skill), or decide conversion strategy (conversion skill). If direction is missing, name the gap and which skill fills it. Never improvise direction to fill a gap.

## Spec intake

| Input | From | Supplies |
|---|---|---|
| LAYOUT SPEC | marketing-page-layout | Sections, order, sizing, hierarchy. Section IDs become component map keys. |
| PAGE SPEC | marketing-site-architecture | The page's job, temperature, and primary query. Sets what the build is for. |
| MOTION SPEC | motion-direction | Motion per section. Passes through untouched to animation-craft. |
| CONVERSION SPEC | conversion-architecture | CTA system, proof placement, form strategy. |
| SITE MAP / RIFF SHEET | marketing-site-architecture | Routes, page inventory, internal links, schema types. |
| BEAT SHEET | product-choreography | Hero loop story and medium. Medium decides who implements it. |
| Brand direction / tokens | brand system | Color, type, voice. The raw material for the token block. |

## Build gates

Every BUILD SPEC passes all eight. Cite gates by ID in AUDIT findings.

- **W1. Specs in, no taste out.** Every design decision in the build traces to an upstream spec or a brand token. If you cannot point to the source, it does not go in. Missing direction gets flagged, not invented.
- **W2. Tokens before components.** No raw hex, px, or ms values in component code. Everything references a token, and tokens are named by role, never by value.
- **W3. Section IDs survive.** Components are mapped to LAYOUT SPEC section IDs and the IDs appear in component names or comments. The build must be diffable against the spec six months later.
- **W4. Performance is a budget, not a hope.** Core Web Vitals targets and a JS budget are declared before the first component is built. Every third-party script is named and justified.
- **W5. Fonts are an engineering decision.** Weights minimized, loading strategy declared, metric-compatible fallbacks specified. A beautiful font loaded badly is a layout shift.
- **W6. Motion passes through untouched.** The MOTION SPEC and BEAT SHEET ride along verbatim. You route them to animation-craft; you never edit, summarize, or extend them.
- **W7. CMS only for what changes.** Model only surfaces a non-developer will actually edit. Everything else is code. An over-modeled CMS is a tax on every future change.
- **W8. The kickoff prompt is the contract.** Specific enough that the first generated output is authored: stack, the full token file, exactly one first surface, and explicit guardrails for what not to do.

## Mode routing

| When you see | Mode |
|---|---|
| Specs in hand, "spec the build", "get this ready for Claude Code" | BRIDGE |
| "Write the tokens", brand direction but no specs yet | TOKENS |
| "Write the kickoff prompt", a BUILD SPEC already exists | KICKOFF |
| A built site plus "check it", "audit the build", "why is it slow" | AUDIT |

## BRIDGE mode

The full pipeline. Steps, in order:

1. **Inventory the specs.** List what you have and what is missing, by name, with the skill that supplies each gap. Proceed with what exists; never block on a missing spec, but never fill it yourself either.
2. **Stack decision.** Read references/stack-decisions.md. One choice with a one-line rationale.
3. **Tokens.** Read references/design-tokens.md. Complete block, role-named, contrast-checked.
4. **Component map.** Read references/component-map.md. Every LAYOUT SPEC section ID gets a component row.
5. **Perf budget.** Read references/performance-seo.md. Declared before build, not measured after.
6. **Kickoff prompt.** Read references/kickoff-prompts.md. The last and most important artifact.

Output contract:

~~~
BUILD SPEC: <project>
STACK: <choice> because <one line>
INPUTS: LAYOUT SPEC <yes/no> | PAGE SPEC <yes/no> | MOTION SPEC <yes/no> | CONVERSION SPEC <yes/no> | SITE MAP <yes/no> | BEAT SHEET <yes/no or n/a>
MISSING: <each gap, plus the skill that supplies it>

1. TOKENS          complete token block
2. FONT LOADING    family, weights, source, display strategy, fallback stack
3. COMPONENT MAP   | Section ID | Component | Spec source | Motion ref |
4. CMS MODEL       only if in scope (W7)
5. PERF BUDGET     LCP / CLS / INP / JS budget / image policy / third-party list
6. KICKOFF PROMPT  the contract for the first build session
~~~

## TOKENS mode

Brand direction in, token block out. Read references/design-tokens.md. Output the complete block plus the font loading spec. For every color token: exact value, role rationale, and contrast ratio against its expected surface. If brand direction is thin (one hex code and a vibe), derive the minimum honest system and mark every derived value as PROPOSED so the brand owner can veto.

## KICKOFF mode

Read references/kickoff-prompts.md. Output the kickoff prompt plus three iteration prompts (next section, fix-against-spec, self-audit). The kickoff prompt embeds the full token file and the relevant spec rows; it never paraphrases them.

## AUDIT mode

Diff a built site against its BUILD SPEC and budget. Check, in order: token discipline (W2: grep-level check for raw values), section ID traceability (W3), spec conformance per section (W1: does the build match the LAYOUT SPEC rows), motion fidelity (W6: does what moves match the MOTION SPEC; route motion-quality issues to animation-craft's review mode), perf against budget (W4: measured, not eyeballed), font loading (W5), CMS scope creep (W7).

Output:

~~~
BUILD AUDIT: <project>
| Finding | Gate | Severity | Fix |
|---|---|---|---|
VERDICT: SHIP / NEEDS WORK / REBUILD
~~~

Severity: BLOCKER (gate failed, visible to users), FIX (gate failed, invisible but compounding), POLISH (passes, could be better). A build with any BLOCKER is NEEDS WORK at best.

## Reference routing

| Question | File |
|---|---|
| Which stack, whether a CMS earns its place | references/stack-decisions.md |
| Token naming, the block format, font engineering | references/design-tokens.md |
| Component brief format, section ID mapping | references/component-map.md |
| Budgets, image and font delivery, meta layer | references/performance-seo.md |
| Kickoff anatomy, guardrails, iteration prompts | references/kickoff-prompts.md |

## How this fits the system

Upstream skills decide; this skill translates; animation-craft and the coding session execute. Duration and easing tokens come from animation-craft's web reference and are imported into the token block by reference, not duplicated. SEO structure (which pages, which schema types) is decided by marketing-site-architecture; this skill implements the meta layer and owns the performance side. A BEAT SHEET with medium `code` routes to animation-craft, medium `video` to the video reference; either way the component map reserves the mount point and the perf budget accounts for it.
