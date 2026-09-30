# Kickoff Prompts

The kickoff prompt is the contract (W8). The difference between an authored first build and a generic one is almost entirely this document. A weak prompt produces a competent generic site and then every iteration is spent dragging it toward the spec; a strong prompt starts inside the spec.

## Anatomy

Seven parts, in order. None optional.

1. **Context.** Two sentences: what the product is, who the page is for. Enough for copy slots to be written in-voice, no more.
2. **Stack and setup.** Exact stack from the BUILD SPEC, file structure, and the commands to scaffold it.
3. **The token file, in full.** Pasted, not described. The first file created in the repo, before any component. "Use a warm off-white" produces five different warm off-whites; `--surface-primary: #FAFAF8` produces one.
4. **The specs, pasted.** The LAYOUT SPEC rows and MOTION SPEC rows for the first surface, verbatim (W6). Never paraphrase a spec into the prompt; paraphrase is where direction leaks out.
5. **Exactly one first surface.** One page, or one section. A prompt that asks for the whole site gets the whole site at uniform mediocrity. The hero is usually the right first surface: it sets the quality bar everything else gets diffed against.
6. **Guardrails.** The negative space, stated explicitly:
   - No colors, fonts, or spacing values outside the token file.
   - No magic numbers; if a value is needed and no token fits, stop and flag it.
   - No motion beyond the MOTION SPEC rows provided. Nothing else moves yet.
   - No placeholder lorem: real copy slots with intent labels ("headline: the claim, under 9 words").
   - No new dependencies without naming the cost against the JS budget.
7. **Definition of done.** The W-gates that apply, the perf budget numbers, and the instruction to self-check before declaring done.

## Worked example

~~~
You are building the marketing site for an invoice-compliance product that catches
billing errors before submission. Audience: finance leads at mid-size firms;
skeptical, numbers-first.

STACK: Next.js (App Router) + Tailwind v4 + TypeScript strict. next/image and
next/font everywhere. Scaffold now; first file is the token file below.

TOKENS (app/globals.css, complete, do not extend):
[full @theme block pasted here]

FONTS: [font loading table pasted here]

BUILD THIS FIRST and nothing else: the homepage hero.
LAYOUT SPEC row: [#1 Hero, full-bleed, headline left, product loop right,
sizing per spec: 88vh desktop, auto mobile, headline at --text-hero]
MOTION SPEC row: [hero: enter-only, masked line rise on headline, loop mounts
after LCP; everything else on the page is deliberately static for now]
The hero's product loop has its own beat sheet; mount a static poster frame at
the signature frame for now and reserve the mount point.

GUARDRAILS:
- Only token values. A needed value with no token is a stop-and-flag, not an invention.
- No motion beyond the MOTION SPEC row above.
- Real copy in slots: headline carries the claim "catch errors before they cost you,"
  under 9 words, no generic SaaS phrasing ("supercharge", "seamless", "empower" banned).
- No new dependencies. The JS budget is 200KB and the animation stack is not yours to pick.

DONE MEANS: tokens file exact, hero matches both spec rows, LCP element is the
poster frame with priority, zero raw values in component code, focus states
specced on every interactive element. Self-check against this list before reporting done.
~~~

## Iteration prompts

After the kickoff, three patterns cover most of the build:

- **Next section:** "Build section #12 (logo strip) per LAYOUT SPEC row 2: [row pasted]. Same guardrails as kickoff. It is deliberately static per the MOTION SPEC." One section per prompt; the spec row rides along every time.
- **Fix against spec:** "The feature triptych spacing does not match: spec says SectionShell rhythm (--space-section), the build has a custom 120px margin. Fix to spec; do not adjust the token." Always cite the spec row and the gate (this one is W2 + W3); never just say "fix the spacing."
- **Self-audit:** "Audit the build so far against the component map and the guardrails: list every raw value in component code, every component without a spec row, every spec row without a component, every missing focus state. Report findings; fix nothing yet." Findings first, fixes second, so a wrong auto-fix does not bury the diagnosis.

## Anti-patterns

- "Make it look modern and premium" -> taste delegation; the direction skills already decided what premium means here.
- Describing the design instead of pasting the spec -> paraphrase leak; verbatim or nothing.
- Asking for the whole site in one prompt -> uniform mediocrity; one surface at a time, hero first.
- Guardrails written as positive vibes ("keep it clean") instead of bans ("no values outside the token file") -> unenforceable.
- A kickoff with no definition of done -> "done" becomes whatever compiles.
