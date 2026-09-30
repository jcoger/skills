---
name: mobile-design
description: >-
  Design premium, native-feeling mobile app screens and the design system behind them, for React Native / Expo apps with a real iOS-vs-Android native-feel lens. Use when building or styling any mobile app screen (onboarding, paywall, feed, detail, settings, empty state, forms), when establishing or capturing an app's design tokens and type/spacing/radius scales, when a mobile UI looks generic, flat, or "AI-built," or when deciding where an app earns a signature moment. Pairs with any plan → build workflow (for example the compound-engineering plugin's ce-plan / ce-work). Modes: SYSTEM (establish the token + scale foundation), SCREEN (compose a screen from the recipe library), EXPRESS (place the one signature moment).
---

# mobile-design

You design native-feeling mobile apps that look like a senior product designer made them, not like a coding agent emitted a default iOS or Android screen. The default agent output is generic: flat surfaces, raw hex, uniform spacing, every state un-designed, brand color sprayed everywhere, no focal point. That output is banned. This skill replaces it with a real token system, a grounded recipe library, and rationed expression, and it holds across a whole app, not one pretty screen.

This is the visual-design and screen-composition layer of the Mobile Kit. It works standalone, and it pairs with any plan → build → review workflow (for example the compound-engineering plugin's `ce-plan` / `ce-work` / `ce-code-review`): the planning and build steps run the build; this skill supplies the design system and screen spines they build from. Architecture comes from `mobile-architecture`, motion from `mobile-motion`, and the enforcement that catches drift from `mobile-audit`. Stay in lane.

## The premium thesis (read once, apply always)

Both platforms converged on the same idea in 2025–26 (iOS Liquid Glass, Material 3 Expressive): **a calm, systematic base plus a few deliberate expressive moments.** Premium is not more decoration. It is restraint plus one moment that earns attention. Encode that as the order of operations: **establish the system, compose calmly, then express once.**

The seven signals that separate premium mobile UI from generic (every one is checkable):

1. **One focal element per screen.** A single display headline or hero owns the screen; nothing competes.
2. **Primary action anchored to the bottom safe area.** Usually a full-width (or near) pill, reachable by thumb.
3. **Generous, deliberate whitespace.** Premium apps are *less* dense than the agent default. Cut, don't cram.
4. **One emphasized active/selected state.** The selected plan, the active tab, the current filter: exactly one, clearly marked.
5. **Floating controls over media, content below.** Back/save/share float as circular controls on a hero; they don't stack into a toolbar.
6. **Color restraint.** Neutral or dark canvas; brand color reserved for the one primary action and the active state.
7. **Every state is designed.** Pressed, disabled, loading, empty, error. Never a raw framework default.

## Operating rules (always on)

1. **System before screens, calm before expressive.** Never start composing without tokens and scales. Never add an expressive flourish before the base reads as clean.
2. **Everything is a token.** No raw hex, no off-scale size, no magic spacing in component code. Colors are named by role (`surface`, `text-primary`, `brand`, `danger`), never by value (`#6366F1`). A rebrand must change zero token *names*. This is the rule `mobile-audit` enforces.
3. **One focal element per screen** (signal 1). If the headline and the visual fight, shrink one.
4. **Primary action lives in the bottom safe area** (signal 2), and a conversion/primary CTA is reachable without hunting.
5. **Type uses the scale, ≤ 3 weights, and scales with the user.** Body never below 17pt iOS / 14sp Android. Dynamic Type / scalable text, never hardcoded sizes locked against accessibility.
6. **Every interactive element ≥ 44pt (iOS) / 48dp (Android), inside the safe area.** Nothing under the home indicator, notch, or Dynamic Island.
7. **Light and dark are both designed**, not one derived as an afterthought. Dark uses tonal surfaces for elevation, not drop shadows.
8. **Platform-faithful, not lowest-common-denominator.** The emit surface is React Native / Expo, but components adapt per platform where it signals craft: SF Pro vs Roboto, bottom tab bar + edge-swipe-back vs Android system back, native sheet behavior, Liquid Glass (iOS) vs M3 Expressive (Android). See `references/platform-fit.md`.
9. **Stay in lane.** App structure and navigation come from `mobile-architecture`'s APP ARCHITECTURE SPEC. Motion comes from `mobile-motion` (this skill only reserves *where* motion goes). Enforcement is `mobile-audit`. This skill owns tokens, scales, screen composition, component states, and the expression budget.

## Modes

Invoked by keyword (SYSTEM, SCREEN, EXPRESS) or inferred. Every mode opens by stating which mode is running.

| Mode | Job | Produces |
|---|---|---|
| **SYSTEM** | Establish or capture the design foundation | **DESIGN SYSTEM SPEC**: token set + type/spacing/radius/elevation scales + light/dark + platform decisions |
| **SCREEN** | Compose a screen or flow from the system | Screen spine: layout, components, states, and where expression is allowed |
| **EXPRESS** | Decide where the app earns its signature moment(s) | Expression budget: the one (or two) surfaces pushed, and why |

Open every SCREEN or SYSTEM pass with a one-line **design read**: *"Reading this as: a \<app kind> for \<audience>, with a \<feeling> feel, leaning \<calm / standard / expressive>."* (see `references/mobile-ai-tells.md`). It forces intent before output and is the cheapest defense against a generic default.

Recommended loop: **design read → SYSTEM → approve → SCREEN (per screen) → EXPRESS once → Pre-Flight → hand to `mobile-audit` before "done."**

---

## SYSTEM (establish the foundation)

Read first: `references/design-tokens.md`, `references/type-and-spacing.md`, `references/platform-fit.md`

The foundation is the single source of truth the rest of the app obeys. Get it right or nothing downstream reads as premium.

1. **Capture or establish brand inputs.** Brand colors, voice, density, light/dark stance, the one feeling the app should evoke. If a brand exists, capture it into tokens; if not, set a restrained default (neutral/dark canvas, one brand hue, one accent).
2. **Build the token layer** (role-not-value, 3-tier: primitive → semantic → component) per `design-tokens.md`. Surfaces, text roles, brand, semantic UI (danger/success/warning), both light and dark.
3. **Set the scales** per `type-and-spacing.md`: a mobile type scale (17pt body floor, ≤3 weights, Dynamic Type), an 8pt spacing scale, a radius scale with a concentric-radius rule, and an elevation language (tonal in dark).
4. **Make platform decisions** per `platform-fit.md`: nav model, iOS-vs-Android divergences, whether/where Liquid Glass or M3 Expressive applies.
5. **Emit drop-in.** Output tokens in the project's real format (TS / NativeWind constants) so the agent uses them verbatim, the format the lint script will check against.
6. **Output the DESIGN SYSTEM SPEC and stop for approval.**

DESIGN SYSTEM SPEC format:

~~~
DESIGN SYSTEM SPEC: [app]
FEELING: [the one adjective] | DENSITY: [calm / standard] | SCHEME: [light / dark / both]

TOKENS (role-not-value, light + dark)
  surface/{primary,secondary,raised,inverse} · text/{primary,secondary,inverse,accent}
  brand/{primary,accent} · ui/{border,danger,success,warning}

TYPE      scale: [display, title, heading, body(17+), caption] · weights: [≤3] · Dynamic Type: yes
SPACING   [4, 8, 12, 16, 24, 32, 48] (8pt grid)
RADIUS    [sm, md, lg, full] · concentric rule: inner = outer − padding
ELEVATION [light: shadow tokens] [dark: tonal surface steps]
PLATFORM  nav: [tabs/stack] · iOS: [SF Pro, edge-back, Liquid Glass on chrome?] · Android: [Roboto, system back, M3?]
EMIT      [path to the tokens file + format]
~~~

---

## SCREEN (compose from the system)

Read first: `references/screen-recipes.md`, `references/component-states.md`, `references/platform-fit.md`, `references/mobile-ai-tells.md`

Compose the *look* of one screen from the foundation. Do not freelance layout. Start from the recipe library (grounded in real premium apps) and adapt to the content.

1. **Identify the recipe.** Match the screen to a recipe in `screen-recipes.md` (onboarding, auth, feed+nav, detail, settings, paywall, empty/error, form). Note the closest real-app references. If the user has a reference-library skill, pull from it first (their own saves carry their taste), then check a product-UI library for the rest of the flow.
2. **Lay out the spine** from the recipe: the focal element, the content blocks, and the bottom-anchored action. Apply the seven signals.
3. **Choose components and their states.** Every component declares its states per `component-states.md` (pressed, disabled, loading, empty, error). A list needs a skeleton; a screen that can be empty needs a designed empty state.
4. **Mark where expression is allowed** (the slot, not the flourish) and where motion mounts (reserve the slot for `mobile-motion`).
5. **Resolve platform divergence** per `platform-fit.md`: what changes between iOS and Android on this screen.
6. **Output the screen spine.** Then self-check against the D-gates (below) and recommend `mobile-audit` before shipping.

Screen spine format:

~~~
SCREEN: [name] | RECIPE: [recipe + ref apps] | NAV: [where it sits in the graph]
FOCAL: [the one element that owns the screen]
SPINE:
  [top]      [e.g. large title / floating controls on hero]
  [body]     [content blocks, components + their states]
  [bottom]   [primary action, anchored in safe area]
STATES: [empty / loading / error handled? how]
EXPRESSION SLOT: [where, or "none (calm screen)"]
MOTION SLOT: [reserved for mobile-motion: what + where]
PLATFORM: [iOS vs Android deltas on this screen]
~~~

---

## EXPRESS (place the signature moment)

Read first: `references/expression-system.md`

Expression is budgeted, not sprinkled. **One signature moment per app, not per screen.** Clarity gates expression: no amount of delight compensates for a lost label or a buried action.

1. **Pick the one surface** that earns the push, usually the highest-emotion moment (first run, a reward, the hero of the home screen, the "aha" of the core loop).
2. **Choose 1–2 expression levers** (color, shape, size, motion, containment), never all five at once.
3. **State the job.** Every flourish answers: what information does this carry, or what feeling does it earn? If neither, cut it.
4. **Output the expression budget** and reserve the motion to `mobile-motion`.

---

## Pre-Flight (run before declaring done)

The hold is not only `mobile-audit`'s job. Catch it here first. Before calling any screen or system done, tick every box. Several are mechanical (countable), not vibes. If you can't honestly tick one, it isn't done.

- [ ] **Design read** stated as a one-liner before composing.
- [ ] **Tokens only**: zero raw hex / off-8pt spacing / raw font sizes or weights in components (the lint passes).
- [ ] **≤ 3 font weights** across the app (count them); **body ≥ 17pt/14sp**, scalable.
- [ ] **One focal element** per screen; nothing competes.
- [ ] **Primary action** anchored in the bottom safe area; nothing interactive in the home-indicator/notch/Island zone; targets ≥ 44pt/48dp.
- [ ] **Brand color used at most once per screen** as a fill (the one action / active state). Count it.
- [ ] **Every state designed**: pressed, disabled, loading (skeleton, not spinner), empty, error-with-retry.
- [ ] **Light + dark** both designed; dark uses tonal elevation, not shadows; no pure `#000` surface.
- [ ] **Platform-faithful**: correct system font, bottom tab bar + edge-back on iOS / system back on Android, native sheets, glass on chrome only.
- [ ] **≤ 1 signature moment** in the whole app; no flourish without a job; not all five expression levers at once.
- [ ] **Icons** from one family, never hand-rolled, standardized weight/size.
- [ ] **Copy self-audit**. Re-read every visible string: **zero em-dashes**, no fake-precise numbers, no generic names ("John Doe"/"Acme"), no filler verbs, no AI-hallucinated cute copy.
- [ ] **No mobile AI tells** from `references/mobile-ai-tells.md` (web hover on touch, top-nav-on-iOS, generic spinner, desktop density…).

## The D-gates (self-check; `mobile-audit` owns the authoritative rubric + lint)

A screen or system is not "done" until it passes. Full definitions, evidence requirements, and the token-lint script live in `mobile-audit`.

- **D1 Tokens**: every color/size/space references a token; no raw hex or off-scale value in components.
- **D2 Type**: uses the scale, ≤ 3 weights, scalable; body ≥ 17pt iOS / 14sp Android.
- **D3 Targets & safe area**: interactive elements ≥ 44pt/48dp; nothing in the home-indicator/notch/Dynamic-Island zone.
- **D4 Light + dark**: both designed; dark uses tonal elevation, not shadows.
- **D5 States**: every component has its pressed/disabled/loading/empty/error states.
- **D6 Platform fit**: platform conventions honored (font, nav, back, sheets); not lowest-common-denominator.
- **D7 Expression budget**: ≤ 1 signature moment per app; every flourish has a job.
- **D8 Accessibility**: contrast passes, Dynamic Type respected, reduced-motion honored.

## Reference routing

| File | Load in mode | Contents |
|---|---|---|
| references/design-tokens.md | SYSTEM | role-not-value token system, 3-tier, light/dark, TS/NativeWind emit |
| references/type-and-spacing.md | SYSTEM | mobile type scale, Dynamic Type, 8pt grid, radius + concentric rule, elevation |
| references/platform-fit.md | SYSTEM, SCREEN | iOS vs Android divergence, Liquid Glass, M3 Expressive, safe areas, RN per-platform |
| references/screen-recipes.md | SCREEN | the recipe library, grounded in real premium apps |
| references/component-states.md | SCREEN | the always-design-states rule, skeletons, optimistic UI |
| references/expression-system.md | EXPRESS | the rationed signature moment, the five levers, restraint |
| references/mobile-ai-tells.md | SCREEN, Pre-Flight | named anti-slop catalog, the design read, copy self-audit, icon discipline |
