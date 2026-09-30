---
name: mobile-motion
description: The motion layer of a mobile app kit. Implements motion to spec for React Native / Expo apps (the default surface) and native SwiftUI apps; SwiftUI also serves as the native-feel reference for RN. Use when implementing a MOTION SPEC into an app screen, writing Reanimated, Gesture Handler, Skia, or SwiftUI animation, adding a transition, sheet, drawer, or gesture, reviewing animation code, or fixing motion that feels wrong. Trigger phrases include "animate this screen", "implement this motion spec", "build this transition", "add a gesture", "the transition feels off", "this feels sluggish", "make it feel native", "spring", "Reanimated", "SwiftUI animation", "PhaseAnimator", "gesture", "swipe to dismiss", "bottom sheet physics", "make it feel premium".
---

# mobile-motion

This is the **motion layer** of the mobile app kit. It takes a reserved motion moment and makes it move well in code: easing, duration, springs, gestures, scroll, performance, accessibility. The **default build surface is React Native / Expo, Reanimated-first**; **native SwiftUI is also supported** (see `references/swiftui-effects-catalog.md`). SwiftUI additionally serves as the **native-feel reference lens**: even when emitting React Native, the SwiftUI spring-first mental model tells you how the motion should FEEL on iOS.

The gates (K1–K8), the spec process, and the cross-cutting laws (one-clock orchestration, choreography gates, the COMBO SPEC grammar, the expression budget) are **surface-independent**, owned once in `references/effects-catalog.md`. Pick the build surface, then read its catalog: React Native → `effects-catalog.md` + `react-native-craft.md`; native SwiftUI → `swiftui-effects-catalog.md` + `swiftui-craft.md`.

## Where this sits in the kit

- **`mobile-design` owns the static design and RESERVES where motion goes**: the signature moment, the transitions, the gestures. It hands off a spec with those slots marked.
- **`mobile-motion` (this skill) implements those slots and adds no new design taste.** Same discipline as a craft layer everywhere: **specs in, no taste out.**
- The kit works standalone. It pairs with any plan → build → review workflow (for example the compound-engineering plugin's `ce-plan` / `ce-work` / `ce-code-review`): **the build step runs the build; this skill implements motion to spec inside that build.** It does not own the feature, the data, or the layout.

Stay in lane:
- Do not invent animated moments that are not in the spec or the request.
- Do not reorder or restyle screens. That is `mobile-design`'s job.
- If no spec exists and the request is vague ("add some animations"), ask the four intake questions in IMPLEMENT instead of decorating every view.

## Craft gates (K1 to K8)

Every animation this skill writes or approves passes all eight. Cite gates by ID in reviews.

- **K1. Easing matches role, and spring-vs-curve is a deliberate call, not a default.** Enter/exit: ease-out. On-screen movement: ease-in-out. Color and selection: ease. Constant motion (ticker, marquee): linear. ease-in for UI: never. It delays feedback. **Spring** is for *gesture-driven, interruptible, or momentum* motion (drag, swipe, fling, a value that can change mid-flight). **Curve** is for *fixed, known-endpoint* moves: enters, exits, page and shared-element transitions, color. **Do not default to spring**: a fixed A→B travel (a card flying to a hero) is a curve, not a bouncy spring. Bounce is rationed to drag-dismiss and playful surfaces (0.1–0.3). Full decision table: the "Choose the motion type" section in references/effects-catalog.md; spring tuning in references/spring-physics.md.
- **K2. Duration matches size and role.** Micro-interactions (taps, toggles, icon swaps) 100-150ms. Standard UI transitions 150-250ms. Sheets, modals, drawers 200-300ms. UI stays under 300ms; only a marketing/onboarding signature moment may exceed it. Exits run about 20 percent faster than entrances. Bigger surfaces move slower than small ones.
- **K3. Frequency rule.** Interactions used 100+ times a day get no animation, or nearly none. Tab switches, keyboard-initiated actions, list taps: instant or near-instant. Rare and first-run moments may be special. Mobile makes this sharper: a fidgety daily-use screen reads as cheap, not polished.
- **K4. Compositor properties only.** Animate `transform` and `opacity`. Never layout properties (width, height, padding, margin). Size changes go through `LinearTransition`, not animated `width`/`height`. Blur stays modest. This holds even on the UI thread: layout still recomputes.
- **K5. Paired elements move as a unit.** Sheet + backdrop, modal + overlay, tooltip + arrow share easing and duration exactly.
- **K6. Reduced motion is a fallback, not a slowdown.** Every animation has a `useReducedMotion` (React Native) / `accessibilityReduceMotion` (SwiftUI) branch: none, or an opacity-only crossfade. Never just slower. Haptics may remain. For Skia, reduced motion means a good static frame, not a slower shader.
- **K7. Entrances are anchored.** Scale entrances start at 0.95, not 0. Enters come from a small `translateY` (8-16px) plus opacity, not from nowhere or the wrong direction. Origin matches the trigger location.
- **K8. State-driven and gesture motion is interruptible.** Anything that can change mid-flight (gestures, rapid toggles) uses springs that retarget and preserve velocity, not fixed keyframe/`withTiming` sequences that restart from zero. On gesture release, hand the gesture's velocity to the spring.

## Mode routing

| Prompt looks like | Mode |
|---|---|
| A MOTION SPEC or BEAT SHEET block, or "implement / build / animate this screen" | IMPLEMENT |
| Code plus "review / check / critique" | REVIEW |
| "Feels off / sluggish / cheap / janky / too much / not native" | TUNE |

Reference routing: any React Native implementation reads references/react-native-craft.md (the primary surface). To check how the motion should FEEL on iOS, consult references/swiftui-craft.md as the native-feel lens. Anything spring-related reads references/spring-physics.md. Anything gesture-driven, scroll-driven, or sheet/drawer physics reads references/gesture-and-scroll.md. Input-feel thresholds (touch latency, press and drag timing, snap projection, haptic rules, 120 Hz budgets) are owned by the animation-craft skill's references/feel.md (gate K9); read it before tuning how a control answers touch.

## IMPLEMENT

**Storyboard complex motion in words before writing code.** For anything multi-element, cross-screen, or a combination (not a single everyday effect), write the choreography first, so the move can be read and corrected before a line of code:

1. **List the elements that change and what each does**, in plain language: "the photo card travels from the list and becomes the detail hero; the title cross-fades in; the background dims."
2. **Name the real effect** for each, using the disambiguation table in `references/effects-catalog.md`. This is where "morph" gets caught: a card→hero is a *shared-element transition*, not a morph.
3. **Make the type call per beat** (spring vs curve) via that file's "Choose the motion type" section. Do **not** default to spring; a fixed A→B travel is a curve.
4. **Order the beats** with the COMBO SPEC grammar (one clock, overlap not queue).

Get the storyboard right first. This catches the expensive mistakes (wrong effect, wrong motion type) in words, where they are cheap, instead of in code over days. Then implement it.

**With a MOTION SPEC** (the normal case):
1. Read the spec header: personality, scroll clock, signature moment, and the bounce range the personality sets (this fixes spring feel for the whole screen; see spring-physics.md).
2. Convert the TOKENS block to a constants file (durations, easings, spring configs) before writing any animation. All durations, easings, and spring configs reference tokens, never inline values.
3. Implement row by row. The pattern name in each row is the contract; do not substitute a different pattern. Fill every reduced-motion cell as written.
4. Respect the NOTES block, especially the deliberately-static list. Static means static.
5. Apply the **native-feel lens**: for each interactive moment, ask what the equivalent SwiftUI spring would feel like (`.snappy`, `.smooth`, `.bouncy`) and match the Reanimated spring to it. iOS users have a calibrated sense of "right"; the lens is how you hit it from React Native.
6. Gate-check the result against K1 to K8 and state it: "Gates: K1-K8 pass" or name the exception and why the spec demands it.

**With a BEAT SHEET** (from a story or choreography step): same discipline. Time ranges become tokens, feel words map to spring tokens, one mover per beat is preserved, the STATIC line is enforced.

**Without a spec**, ask four questions, then default to restraint:
1. Onboarding/marketing moment or everyday product UI? (Everyday UI: K2 and K3 dominate: almost everything is a 150-250ms ease-out curve; a spring only where the motion is gesture-driven or interruptible, per K1.)
2. How often will users see it?
3. What is the one moment that deserves the budget?
4. Any existing duration/easing/spring tokens to match?

### Worked example (spec row to code)

Spec row: `| Saved list (#9) | enter-once | fade-rise | dur-base, ease-primary | 50ms/item | opacity-only |`

~~~jsx
import Animated, { FadeInDown, FadeIn, FadeOut, useReducedMotion } from 'react-native-reanimated';

function SavedRow({ item, index }) {
  const reduced = useReducedMotion();
  const entering = reduced
    ? FadeIn.duration(150)                                  // K6: crossfade, not slower
    : FadeInDown.duration(220).delay(Math.min(index, 6) * 50); // K7 rise + capped stagger
  return (
    <Animated.View entering={entering} exiting={FadeOut.duration(160)}>
      {/* row content */}
    </Animated.View>
  );
}
~~~

Craft details that pass review: the rise comes from `translateY` + opacity (never `scale(0)`), the stagger caps at 6 items so item 20 does not read as lag, the exit runs faster than the enter (K2), and reduced motion gets a pure crossfade (K6).

## REVIEW

Review animation code or a built screen against the gates. Output format is mandatory: a single markdown table with Before and After columns, one row per issue, each row citing a gate. Never a prose list of before/after pairs.

| Before | After | Gate |
|---|---|---|
| `withTiming` on a gesture-released value | `withSpring(target, { velocity: e.velocityX, ... })` | K8 (preserve velocity) |
| Animated `width` for an expanding card | `LinearTransition` layout animation | K4 |
| `FadeInDown.delay(index * 60)` on a 30-item list | Cap stagger at 6-8 items, rest arrive together | K2, K3 |
| Sheet 240ms, backdrop 320ms | Both 240ms, same spring/easing token | K5 |
| No `useReducedMotion` branch in a motion-heavy file | Explicit crossfade fallback | K6 |
| `scale(0)` entrance | `scale(0.95)` + translateY, origin at trigger | K7 |
| "Morph" building a card→hero across two screens | Shared-element transition (measured-rect FLIP), curve not bouncy spring | K1 (right effect + type) |
| Bouncy spring on a fixed enter / page transition | Curve (ease-out / ease-in-out); reserve springs for gesture and interruptible motion | K1 |
| Entrance only paints 2–3 frames during a screen push | Route `animation: 'none'` + run after `runAfterInteractions`, then stagger heavy content | sequencing (effects-catalog) |

After the table, give a one-line verdict: SHIP, or the two highest-impact rows to fix first.

## TUNE

"Feels off" on mobile has a small number of real causes. Diagnose from symptom before touching code:

| Symptom | Likely cause | Fix |
|---|---|---|
| Sluggish, laggy | ease-in or linear on UI; duration over 300ms; animation on a 100+/day action | K1 easing swap; K2 duration cut; K3 remove it |
| Cheap, generic | Curve where a spring belongs; everything fades the same; no anchor | Spring the interactive moment; vary distance not duration; anchor the entrance |
| Janky, stuttery | Layout-property animation; per-frame `runOnJS`/`setState`; JS-thread scroll handler | K4; move to compositor props; `useAnimatedScrollHandler` |
| Floaty, disconnected | Spring duration too long for travel; bounce too high on serious UI | Match duration to distance; pull bounce toward 0-0.2 |
| Abrupt, popping | No exit animation; scale from 0; missing origin | K7; add a 20%-faster exit |
| Restarts mid-gesture | `withTiming` / keyframes on gesture or state-driven UI | K8; switch to springs carrying velocity |
| Doesn't feel native | Curve-driven where iOS would spring; no velocity hand-off on release | Apply the native-feel lens (swiftui-craft.md); match the SwiftUI spring |
| Wobbles / overshoots on a precise move | Spring used where a curve belongs (fixed A→B, enter/exit, transition) | Curve it (ease-out/ease-in-out); springs only for gesture/interruptible motion |
| Fought "morph" for days on a card→hero | Wrong effect: same element across a nav is a shared-element transition | Stop morphing; FLIP the real element with route `animation:'none'` per effects-catalog, ease-out not spring |
| Entrance/morph only plays a few frames, stutters on push | Animation racing the screen mount; native transition snapshots the incoming screen | Sequence: route `animation:'none'` → `runAfterInteractions` → morph → then heavy content; judge in a release build |

Fix the diagnosed cause only. Tuning is not an invitation to redesign the motion. If the real problem is direction (wrong moments animated, no hierarchy, missing reserved slot), say so and route back to `mobile-design`.

**Set up the on-device tuner when feel is the question.** When the user asks to dial in the feel, or after building anything spring-y or built from a reference video (where the video gave the *structure* but not the *feel*), drop in the bundled **MotionTuner** (`assets/MotionTuner.tsx`): a dev-only, zero-extra-dep panel with sliders for timing (duration, delay, stagger, easing), spring bounce, choreography overlap %, and a curve⇄spring toggle to A/B the type call live. Wire it per `references/tuning.md`, tune on device, then export the JSON into the motion tokens and remove the tuner. The tuned values become tokens and `token-lint` holds them. This is the last step of the pipeline: reference video → storyboard + COMBO SPEC → build → tuner → tuned tokens.

## Reference routing

| File | Read when |
|---|---|
| references/react-native-craft.md | Any RN implementation: Reanimated 4 (CSS API and worklets), Gesture Handler, Skia canvas and shaders. The default surface. |
| references/effects-catalog.md | **RN effects catalog**: named effects (Fade, Grow, Shrink, Pulse, Sequence, Flip, Morph, Flick, scroll, shaders) with when-to-use and Reanimated spines. **Owns the cross-cutting laws** (one-clock orchestration, choreography gates, COMBO SPEC, budget). Pick the effect for a moment. |
| references/swiftui-effects-catalog.md | **SwiftUI effects catalog**: the same effect vocabulary built natively (`KeyframeAnimator`, `matchedGeometryEffect`, `.sensoryFeedback`, Metal shaders, `@Animatable`). Read when the build surface is native SwiftUI. References effects-catalog.md for the shared laws. |
| references/swiftui-craft.md | The native-feel **lens**: how motion should FEEL on iOS and the SwiftUI→Reanimated translation, even when emitting React Native. (Distinct from the SwiftUI catalog, which is for actually building in Swift.) |
| references/spring-physics.md | Choosing or tuning springs; the shared duration + bounce model |
| references/gesture-and-scroll.md | Gesture-driven motion, scroll-driven animation on RN, sheet and drawer physics |
| references/tuning.md + assets/MotionTuner.tsx | Dialing in the feel: the bundled dev-only tuning panel (timing + spring + choreography), and exporting tuned values back into tokens. Read when the user asks to tune feel or builds from a reference video. |
