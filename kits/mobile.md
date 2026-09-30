# The Mobile Kit

Seven Claude Code skills that help a coding agent build **premium, native-feeling mobile apps** and hold one design system across the whole app, from day-one scaffold to store submission, instead of drifting screen by screen. Built for React Native and Expo, with a real iOS-vs-Android native-feel lens. It pairs with any plan, build, review workflow (for example the compound-engineering plugin's `ce-plan`, `ce-work`, `ce-code-review`). It doesn't replace one.

## The problem

A coding agent with no design context produces generic UI. Worse, it *drifts*: a raw hex here, an off-grid padding there, a fourth font weight, a screen with no empty state, brand color sprayed everywhere. Over a 30-screen app that drift compounds into incoherence. The fix isn't a style guide. It's an **enforcement system**: establish a foundation, compose from it, and hold the line.

## The kit

The kit specializes a general build workflow for mobile. It supplies the mobile domain, the craft, and the quality hold:

| Skill | Command | Owns | Augments |
|---|---|---|---|
| `mobile-scaffold` | `/mob-scaffold` | the **day-one gate**: toolchain pins, component-library commitment, sheet and keyboard architecture, quality tooling, env binding, compliance scaffold | project creation |
| `mobile-architecture` | `/mob-arch` | nav graph, Expo/RN structure, state and data layer, module boundaries, performance | the planning phase |
| `mobile-design` | `/mob-design` | tokens plus type, spacing, radius and elevation scales, the screen-recipe library, the signature moment | the build phase |
| `mobile-motion` | `/mob-motion` | Reanimated, Gesture Handler and Skia motion, springs, the native-feel lens | the build phase |
| `mobile-audit` | `/mob-review` | the **hold**: a gate rubric plus a runnable token-lint that catches drift | the code-review phase |
| `mobile-ship` | `/mob-ship` | the **release gate**: production-bundle preflight (runnable script), release-build smoke, EAS failure catalog, store-submission checklist | the release phase |
| `mobile-engage` | `/mob-engage` | the **return**: the retention loop (LOOP SPEC, including an absence trigger) and the push map (PUSH MAP: every notification's trigger, copy source, cap, quiet hours, deep link, success event), guardrails for AI-written copy, delivery proven from receipts | the product-loop phase, and every release after |

Spec flow: `mobile-scaffold` gates the foundations. `mobile-architecture` emits an **APP ARCHITECTURE SPEC**. `mobile-design` composes screens against it and emits a **DESIGN SYSTEM SPEC** plus screen spines. `mobile-motion` implements the motion slots design reserved. `mobile-audit` holds it all to the gates. `mobile-ship` proves the release before the store does. `mobile-engage` gives the user a reason to come back and proves the pushes that ask them to actually arrive.

The two bookends encode two lessons from shipping real apps. First, **every expensive week traces to a decision that was cheap on day 1 and brutal on day 45**: a sheet nested in a ScrollView, a second lockfile, a half-adopted component library, test infra deferred to launch week. Second, **dev builds structurally cannot show you the crash you ship**. They never compile the production bundle, and `#if DEBUG` guards flip in release.

## The premium thesis

Both platforms converged in 2025–26 (iOS Liquid Glass, Material 3 Expressive) on the same idea: **a calm, systematic base plus one or two deliberate expressive moments.** Premium isn't more decoration. It's restraint plus one moment that earns attention. The kit encodes that as the order of operations: establish the system, compose calmly, express once.

Seven checkable signals separate premium mobile UI from generic: one focal element per screen · a bottom-anchored primary action in the safe area · generous whitespace · one emphasized active state · floating controls over media · color restraint · every state designed.

## The hold (what makes it different)

Other design skills hope the model remembers the rules. This kit ships a **deterministic floor**: `mobile-audit/scripts/token-lint.mjs` greps the component layer for raw hex, off-8pt-grid spacing, and raw font sizes and weights, prints `file:line` plus a fix, and exits non-zero so it can gate a review.

```bash
node skills/mobile-audit/scripts/token-lint.mjs ./src        # exit 1 if drift exists
```

The lint is the floor. The AUDIT pass (gates D1–D8) covers what a script can't see: states, platform fit, hierarchy, accessibility, over-expression.

## Gate prefixes

| Prefix | Skill | Covers |
|---|---|---|
| S1–S12 | mobile-scaffold | toolchain pins, repo shape, library commitment, tokens-first, sheets and keyboard, quality tooling, bundle proof, env binding, compliance scaffold, dev loop, observability, lifecycle plumbing |
| A1–A6 | mobile-architecture | routing↔structure, state separation, logic placement, module boundaries, platform divergence, list virtualization |
| D1–D8 | mobile-design / mobile-audit | tokens, type, targets and safe area, light and dark, states, platform fit, expression budget, accessibility |
| K1–K8 | mobile-motion | the motion craft canon (easing by role, duration budgets, compositor-only, reduced motion, interruptibility…) |
| R1–R8 | mobile-ship | bundle proof, env completeness, no test keys, release smoke, device boot, store checklist, observability, versioning |
| E1–E10 | mobile-engage | rhythm named, loop closed, absence trigger, server-side budget, never-send list, every push lands, every push measured, permission and reach, AI rows floored, delivery proven from receipts |

## Install

As a Claude Code plugin (skills and the `/mob` commands in one step):

```
/plugin marketplace add jcoger/skills
/plugin install mobile-kit@jcoger-skills
```

Skills only, for any agent that reads `SKILL.md`:

```bash
npx skills add jcoger/skills
```

Install all seven for the full loop, or cherry-pick. Each works standalone and names any missing sibling spec. **Restart any running `claude` session** to pick up new skills and commands.

**New project in three steps:**

```bash
npx create-expo-app@latest my-app && cd my-app
claude          # then run /mob-scaffold. Nothing else gets built until it says READY.
```

## Usage

```
/mob           the front door: describe the job, it routes to the right kit skill
/mob-scaffold  gate a new project's foundations (SCAFFOLD) · gap-check an existing one (RETROFIT)
/mob-arch      plan the architecture for a [kind of app]: nav graph, structure, state layer
/mob-design    establish the design system for [app] (SYSTEM) · compose the [screen] (SCREEN) · place the signature moment (EXPRESS)
/mob-motion    implement the [interaction]; make it feel native
/mob-review    audit this screen for drift and run the token-lint
/mob-ship      preflight the [cloud build / release / submission]; triage the [build failure / release-only crash]
/mob-engage    write the retention loop (LOOP) · map every push (MAP) · add AI-written copy (AI) · prove delivery (PROVE)
```

A typical project runs `/mob-scaffold` once at creation, then `/mob-arch` → `/mob-design` (per screen) → `/mob-motion` → `/mob-review` before "done," and `/mob-ship` before every release. `/mob-engage` runs LOOP and MAP before the first outside tester, and PROVE before every release that touches a send. Alongside a plan, build, review workflow, each `/mob-` skill plugs into the matching phase.

## Stack assumptions

React Native and Expo (Expo Router; SDK 55+ and RN 0.83+ New Architecture conventions) is the **default build surface**, with platform-faithful divergence: SF Pro vs Roboto, tab bar and edge-back vs system back, native sheets, Liquid Glass on iOS chrome and M3 Expressive on Android.

**Native SwiftUI is also supported** for design and motion. `mobile-motion` ships parallel effect catalogs (`effects-catalog.md` for Reanimated, `swiftui-effects-catalog.md` for native SwiftUI). SwiftUI also serves as the native-feel reference lens that calibrates how motion should *feel* on iOS, even when emitting Reanimated. The cross-cutting motion laws (one-clock orchestration, choreography gates, COMBO SPEC, the expression budget) are surface-independent and owned once. `mobile-architecture` currently targets RN/Expo structure.

## Roadmap

- **Native-Swift app architecture** (a SwiftUI track for `mobile-architecture`). Today architecture targets RN/Expo; design and motion already support native SwiftUI.
- **token-lint v1**: radius and concentric-radius checks, font-weight cardinality, em-dash-in-strings checks, and an optional `--ci` format for review pipelines.

## License

MIT. Made by [Jarrett Coger](https://jcoger.com).
