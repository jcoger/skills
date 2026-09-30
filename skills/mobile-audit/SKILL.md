---
name: mobile-audit
description: >-
  Hold a mobile app to its design system and catch the design drift coding agents introduce as an app grows. Use to review or audit any built mobile screen or component for token violations, off-scale spacing, stray font weights, missing states, platform misfit, accessibility gaps, or over-expression; when a UI "looks off" or has drifted from the system; or as the design gate inside a code review. Pairs with any code-review workflow (for example the compound-engineering plugin's ce-code-review) and runs a token-lint over the codebase. The enforcement layer of the Mobile Kit. Modes: AUDIT (review against the gates) and LINT (run the script).
---

# mobile-audit

This is the **hold**: the part of the Mobile Kit that makes "stick to good design" real. Coding agents don't design badly once; they *drift*: a raw hex here, an off-scale padding there, a fourth font weight, a screen with no empty state, brand color sprayed across five elements. Over a 30-screen app that drift compounds into incoherence. This skill catches it.

It works standalone, and it pairs with any plan → build → review workflow (for example the compound-engineering plugin's `ce-plan` / `ce-work` / `ce-code-review`): when a code review runs on mobile UI, this is the design gate it applies. It owns the authoritative **D-gates** (which `mobile-design` self-checks against) and a **token-lint** script. Motion-quality issues route to `mobile-motion` REVIEW; architecture/structure issues route to `mobile-architecture` AUDIT. This skill owns the *design-system, platform-fit, and accessibility* hold.

## How the hold works (two layers)

1. **LINT**: a deterministic script (`scripts/token-lint.mjs`) greps the component layer for the mechanically-checkable violations (raw hex, off-grid spacing, raw font sizes/weights). Exit code 1 = drift exists. This is the layer that doesn't rely on anyone remembering to look. *(v0 covers the deterministic color/spacing/weight checks; the gate set below is the full bar and expands the script over time.)*
2. **AUDIT**: a judgment pass against the full D-gate rubric for what a script can't see: missing states, platform misfit, hierarchy, over-expression, accessibility. Reads the screen (code + a screenshot/simulator when available).

Run LINT first (cheap, catches the obvious), then AUDIT for the rest.

## AUDIT

Read first: `references/gate-rubric.md`.

Score the artifact that exists (code, and a screenshot/simulator capture when available), never the intent. Inspect each of the eight D-gates; each is binary pass/fail with required evidence (file:line or a screenshot observation). A gate fails loudly with the specific violation and the fix.

Steps:
1. **Run LINT** over the changed files (or the app) and fold its findings into D1.
2. **Walk the D-gates** (D1–D8 in `gate-rubric.md`) against the screen/component. While walking, scan for the named mobile AI tells and run a copy self-audit (zero em-dashes, no fake-precise numbers, no generic names/filler verbs, no AI-hallucinated cute copy) per `mobile-design`'s `references/mobile-ai-tells.md`.
3. **Cite evidence** for every finding: `file:line` for code, a one-line observation for visual. "Spacing feels off" is not a finding; "`padding: 13` at Card.tsx:24 is off the 8pt scale (D1)" is.
4. **Separate must-fix from polish.** A token/safe-area/state failure is must-fix; a hierarchy nuance is polish.
5. **Route out-of-lane findings** to the owning skill (motion → mobile-motion, structure → mobile-architecture) rather than scoring them here.

Verdict: **SHIP** (all gates pass) · **NEEDS WORK** (any gate fails) · **REBUILD** (D1 or D3 fails broadly; the system itself isn't being used).

Output format:

~~~
MOBILE AUDIT: [screen/component/app]
LINT: [n violations] (or "clean")
VERDICT: SHIP | NEEDS WORK | REBUILD

D1 Tokens            pass/FAIL: [evidence]
D2 Type              pass/FAIL: [evidence]
D3 Targets & safe    pass/FAIL: [evidence]
D4 Light + dark      pass/FAIL: [evidence]
D5 States            pass/FAIL: [evidence]
D6 Platform fit      pass/FAIL: [evidence]
D7 Expression        pass/FAIL: [evidence]
D8 Accessibility     pass/FAIL: [evidence]

MUST FIX (ordered)
1. [finding @ file:line] -> [fix]
ROUTED: [motion → mobile-motion / structure → mobile-architecture]
~~~

## LINT

Run the bundled script from this skill's own folder over the project's component directory. Where that folder lives depends on how the kit was installed (plugin, `~/.claude/skills/mobile-audit/`, or `<repo>/.claude/skills/mobile-audit/`):

```bash
node <mobile-audit skill folder>/scripts/token-lint.mjs <path-to-app-or-src>
```

It flags raw hex/`rgb()` colors, off-8pt-grid numeric spacing, and raw `fontSize`/`fontWeight` literals in component files, with `file:line` and a suggestion, and exits non-zero when violations exist so it can gate a review. It's intentionally conservative (few false positives); the AUDIT pass covers everything it can't see. Point it at the design-tokens path to exclude (token files are *allowed* to hold raw values).

## The D-gates (authoritative; `mobile-design` self-checks against these)

Full definitions, fail conditions, and evidence requirements live in `references/gate-rubric.md`. In brief:

- **D1 Tokens**: every color/size/space references a token; no raw value in components.
- **D2 Type**: the scale, ≤3 weights, scalable; body ≥ 17pt/14sp.
- **D3 Targets & safe area**: ≥44pt/48dp; nothing in the home-indicator/notch/Island zone.
- **D4 Light + dark**: both designed; dark uses tonal elevation.
- **D5 States**: pressed/disabled/loading/empty/error all designed.
- **D6 Platform fit**: font/nav/back/sheets correct; not lowest-common-denominator.
- **D7 Expression**: ≤1 signature moment; every flourish has a job.
- **D8 Accessibility**: contrast, Dynamic Type, reduced-motion honored.

## Conduct

- Score what the evidence shows. SHIP means every gate passed with evidence, and the report still names the weakest area as a polish note.
- The lint is the floor, not the ceiling. A codebase can pass LINT and still fail AUDIT (the hard part is states, platform fit, and hierarchy).
- Cite, don't vibe. Every finding carries evidence.
