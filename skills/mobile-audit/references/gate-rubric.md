# D-Gate Rubric (authoritative)

The eight design gates the Mobile Kit holds an app to. `mobile-design` self-checks against these during SYSTEM/SCREEN/EXPRESS; `mobile-audit` enforces them. Each gate is **binary** (pass/fail) and requires **evidence**: a `file:line` for code, or a one-line observation for a screenshot/simulator capture. No gate passes on vibes.

---

### D1: Tokens (no raw values in components)

**Fail if:** any color (`#RRGGBB`, `rgb()`, named color like `'red'`), spacing/padding/margin not on the 8pt scale, radius, or shadow appears as a literal in component code instead of referencing a token. Token-definition files are exempt (they hold the raw values on purpose).
**Evidence:** the literal + its `file:line`, and the token it should reference.
**Why it's first:** this is where agent drift starts and the lint catches most of it. Broad D1 failure = REBUILD (the system isn't being used).

### D2: Type (scale, weights, scalable)

**Fail if:** a hardcoded `fontSize` that bypasses the type scale; body below 17pt iOS / 14sp Android; more than 3 font weights across the app; type that won't scale with Dynamic Type / `sp` (a fixed size locked against the accessibility slider on body/UI text).
**Evidence:** the size/weight + `file:line`; or a count of distinct weights found.

### D3: Targets & safe area

**Fail if:** any interactive element (button, row, icon-button, input) is smaller than 44pt iOS / 48dp Android; any interactive element or text sits inside the home-indicator, notch, or Dynamic Island exclusion zone; the bottom-anchored action ignores the home-indicator inset.
**Evidence:** the element + measured size or the unsafe placement.

### D4: Light + dark

**Fail if:** only one scheme is designed and the other is an un-tuned inversion; dark mode uses drop shadows for elevation instead of tonal surface steps; pure `#000` is used as a dark app surface (leaves no room to step elevation).
**Evidence:** the missing scheme, or the shadow-on-dark / pure-black surface @ `file:line`.

### D5: States

**Fail if:** a tappable element has no pressed state; a list/content area has no loading (skeleton) state; a screen that can be empty has no empty state; an error path dead-ends with no retry; an input lacks focus or error states; a destructive/irreversible action is treated optimistically.
**Evidence:** the component + the missing state.

### D6: Platform fit

**Fail if:** the wrong system font (SF Pro on Android, Roboto on iOS); a custom on-screen back control that fights the iOS edge-swipe-back; Android system back unhandled; Liquid Glass applied to the content layer (lists/cards/backgrounds) rather than chrome; lowest-common-denominator chrome where the platform expects divergence (e.g. an Android-style top-nav on iOS where a tab bar belongs).
**Evidence:** the misfit + `file:line` or screenshot observation.

### D7: Expression budget

**Fail if:** more than one signature moment in the app; an expressive flourish with no stated job (information or feeling); expression that removed a label, broke a convention, or buried the primary action; brand color/gradient used expressively on more than the one moment; all five expression levers turned at once on a single surface.
**Evidence:** the second signature moment, or the job-less flourish.

### D8: Accessibility

**Fail if:** body text contrast below 4.5:1 (or large text below 3:1) against its surface; Dynamic Type / scalable text not respected (D2 overlaps); `prefers-reduced-motion` / reduce-motion not honored by animated components (overlaps `mobile-motion` K6); meaningful controls without accessible labels; color used as the *only* signal for state (e.g. error shown by red alone, no icon/text).
**Evidence:** the measured contrast ratio, or the un-handled reduced-motion / missing-label site.

---

## Severity → verdict

- **REBUILD**: D1 or D3 fails broadly: the design system or safe-area discipline isn't being used at all. The screen needs re-composing from `mobile-design`, not patching.
- **NEEDS WORK**: any single gate fails. List the must-fixes in order.
- **SHIP**: all eight pass. Still name the weakest area; a real screen always has one.

## What routes elsewhere (don't score here)

- **Motion quality** (easing, duration, jank, spring feel) → `mobile-motion` REVIEW (gates K1–K8). D8 only covers whether reduced-motion is *honored*, not whether the motion is good.
- **Architecture/structure** (state coupling, module boundaries, list virtualization) → `mobile-architecture` AUDIT (gates A1–A6).
- This skill owns the visual design system, platform fit, and accessibility hold.
