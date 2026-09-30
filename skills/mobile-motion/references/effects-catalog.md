# effects-catalog.md

The named-effects catalog for this kit. A vocabulary of the auto-readable, low-effort
effects that make an app feel premium (**Fade, Grow, Shrink, Pulse, Sequence, Flip,
Morph, Flick** and the larger continuous and combination moves), each with when to
reach for it, when it is the wrong tool, the exact Reanimated / Gesture Handler / Skia
API path, the feel token, a minimum-correct code spine, and the production gotcha.

This file is the *what to build* layer. The *how it works on this stack* lives in
`react-native-craft.md`, the spring model in `spring-physics.md`, and gesture/scroll/sheet
physics in `gesture-and-scroll.md`. Entries cross-reference those rather than re-teach them.
Every entry is scored against the craft gates **K1–K8** in SKILL.md; the gate each effect
most depends on is named inline.

**Motion is rationed, not sprinkled.** Most screens use one or two cheap effects; an app earns
**one signature moment** total. That budget is owned by `mobile-design` (gate D7 / EXPRESS), not
here. This catalog is the *vocabulary*; the budget decides how much of it a screen gets. A page
that reaches for six effects has failed the budget, not run out of catalog.

## Table of contents

1. [How to read an entry](#how-to-read-an-entry)
   - [Name the effect (disambiguate the word)](#name-the-effect-disambiguate-the-word-before-you-build)
   - [Choose the motion type (spring vs curve)](#choose-the-motion-type-spring-vs-curve)
2. [Feel tokens](#feel-tokens): the motion side of the token system
3. **Single effects**
   - [Fade](#fade)
   - [Grow](#grow)
   - [Shrink](#shrink)
   - [Pulse](#pulse)
   - [Sequence](#sequence) (stagger + chained beats)
   - [Flip](#flip)
   - [Morph](#morph) (shape change in place)
   - [Shared-element transition (card to hero)](#shared-element-transition-card-to-hero)
   - [Icon and SVG animation](#icon-and-svg-animation)
   - [Flick](#flick)
   - [Scroll-driven motion](#scroll-driven-motion)
   - [Color and state transition](#color-and-state-transition)
   - [Gesture composition and interruptibility](#gesture-composition-and-interruptibility)
4. **Composite surfaces**
   - [Morphing toolbar](#morphing-toolbar-scroll-aware-action-bar)
   - [Spatial transitions](#spatial-transitions-fly-dont-teleport)
   - [Skia backgrounds and shaders](#skia-backgrounds-and-shaders)
5. **Combination craft**
   - [The orchestration model: one clock, many styles](#the-orchestration-model-one-clock-many-styles)
   - [Choreography gates](#choreography-gates)
   - [Worked combinations](#worked-combinations) (card takeover, rolling stat, squish, group reveal)
   - [Quick two-effect combos](#quick-two-effect-combos)
   - [Build a combo from a description (COMBO SPEC)](#build-a-combo-from-a-description-combo-spec)
6. **Supporting craft**
   - [Sequence entrances after mount](#sequence-entrances-after-mount)
   - [Components that are mostly motion](#components-that-are-mostly-motion) (bottom sheet, drag-to-reorder)
   - [Loading and perceived performance](#loading-and-perceived-performance)
   - [Haptics](#haptics)
   - [Platform feel (iOS vs Android)](#platform-feel-ios-vs-android)
   - [Verifying 60fps](#verifying-60fps)
   - [Accessibility beyond reduced motion](#accessibility-beyond-reduced-motion)
7. [AUDIT checklist](#audit-checklist): the per-effect hooks for REVIEW mode
8. [Library cheat-sheet](#library-cheat-sheet)

---

## Stack note (read once)

This catalog is **Reanimated 4 + Gesture Handler + Skia**, the surface defined in
`react-native-craft.md`. Two currency facts that the spines below assume:

- **Worklets are their own package.** In Reanimated 4, `runOnJS`, `useSharedValue`,
  `useAnimatedStyle`, etc. live in `react-native-worklets` and are re-exported from
  `react-native-reanimated` for back-compat but marked deprecated. New code should import
  worklet primitives (`runOnJS` especially) from `react-native-worklets`; the spines keep
  the `react-native-reanimated` import where it still resolves, but a fresh file should
  prefer the worklets package. Babel plugin is `react-native-worklets/plugin`.
- **The new Gesture API only.** Every gesture spine uses `Gesture.Pan()` / `Gesture.Tap()`
  with `.onChange` / `.onBegin` / `.onFinalize` and a `GestureDetector`. The old
  `useAnimatedGestureHandler` + `<PanGestureHandler>` API is deprecated. Do not introduce it.

---

## How to read an entry

Every effect uses the same shape so the agent can route fast:

- **Reach for it when** / **Wrong tool when**: pick on purpose, not by habit.
- **API path**: the specific Reanimated / Gesture Handler / Skia primitive, not a vibe.
- **Feel**: which [feel token](#feel-tokens) drives it, so motion stays consistent app-wide.
- **Spine**: the minimum correct code. Copy and fill; do not redesign.
- **Gotchas**: the thing that actually breaks it in production.
- **Gate**: the K-gate this effect leans on hardest.

**Four ways motion starts.** Almost everything here is one of: (1) on mount via `entering`,
(2) on a state change via `withTiming` / `withSpring`, (3) on a gesture via Gesture Handler,
(4) on a loop via `withRepeat`. The named effects map cleanly onto these. The shared model
(`useSharedValue` → `useAnimatedStyle`, animation on the UI thread at 60/120fps) lives in
`react-native-craft.md`; this file does not re-explain it.

**Spines use literal colors and numbers for legibility.** Real components reference the design
tokens (`colors.*`, per `mobile-design` gate D1) and the feel tokens below, never inline hex or
ad-hoc durations. The snippets show the *motion*, not the token discipline; the lint
(`mobile-audit`) would flag a raw `"#0A84FF"` in a real component.

---

## Name the effect (disambiguate the word before you build)

Everyday words map to several effects, and reaching for the *word* instead of the *behavior* is how a build goes down the wrong path for days ("morph" is the classic trap). Before building anything cross-screen or "turns into", diagnose with the one question that separates the candidates:

| You said… | Ask | If yes → | If no → |
|---|---|---|---|
| morph / turns into / transforms / becomes | Is it the **same element continuing across two screens**? | **Shared-element transition** | a **shape changing in place** → [Morph](#morph) |
| grow / expands / opens into | Does it **travel to another screen or container**? | **Shared-element transition** | a **scale-in on one screen** → [Grow](#grow) |
| transition / animate between pages | Is a **specific element** continuous, or the **whole screen**? | element → shared-element; screen → [Spatial transitions](#spatial-transitions-fly-dont-teleport) | n/a |
| reveal / flip | Two **faces of one object**? | [Flip](#flip) | else fade or morph |

**The tell for a shared-element transition:** the *same content* (this photo, this title, this card) exists on both sides of a navigation and should look continuous. That is never a "morph" (shape change) and never a "grow" (in-place scale). It is one element traveling and resizing between screens. See the [Shared-element transition](#shared-element-transition-card-to-hero) entry.

## Choose the motion type (spring vs curve)

**Springs are not the default.** A spring is the right tool for a specific job; reaching for it on everything makes fixed, choreographed moves wobble and feel imprecise. The skill should make this call deliberately per beat, not reflexively spring:

| The move is… | Use | Why |
|---|---|---|
| Gesture-driven, interruptible, or carries momentum (drag, swipe, fling, a value that can change mid-flight) | **Spring**, velocity-preserving (K8) | only a spring retargets from the current value + velocity |
| A state settle with a known endpoint that won't be interrupted (toggle, selection lands, snap) | **Spring, near-critical** (bounce 0–0.15), or a curve | feels alive without wobble; never a bouncy spring on serious UI |
| A fixed, choreographed, timed move: enter, exit, page or shared-element transition, a card flying to a hero | **Curve** (ease-out for enter/exit · ease-in-out for on-screen travel) | endpoints and duration are known; a spring would bounce a precise move |
| Expand **into a bounded area** (thumbnail → hero slot, card → fixed panel) | **Curve (ease-out)**, not a spring | a spring overshoots past the target band and reads as broken |
| Color / selection / theme | **Curve** (ease) | non-spatial; ease keeps the hue shift legible |
| Constant motion (ticker, marquee) | **Linear** | only constant motion is linear |

Default when unsure: **ease-out** (K1). Bounce is rationed: drag-to-dismiss and deliberately playful surfaces only, kept subtle (0.1–0.3); everything else damps to rest. (This is the K1 easing canon made explicit; it matches the web-animation easing blueprint.) So the card→hero shared-element travel is a **curve** (or a critically-damped spring), never a bouncy spring.

## Feel tokens

A premium app reuses a tiny set of motion settings everywhere. These **feel tokens** are the
*semantic* layer of the kit's motion-token system: named intents (`press`, `enter`, `settle`…)
that compose from the *primitive* easing / duration / spring presets owned by
`react-native-craft.md` (the duration tiers per K2) and the spring model in `spring-physics.md`
(bounce ≈ `1 - dampingRatio`). This table does not introduce a second system; it names intents
on top of those primitives. Both tiers compile into the one constants file in IMPLEMENT
(SKILL.md step 2); a spine that says "use the `press` token" resolves to a primitive spring there.

| Token | Use | Config |
|---|---|---|
| `press` | Tap-down shrink feedback | spring: mass 0.5, damping 14, stiffness 240 (settles ~120ms) |
| `enter` | Element appears | timing 220ms, `Easing.out(Easing.cubic)` (or `FadeIn`) |
| `exit` | Element leaves | timing 150ms, `Easing.in(Easing.cubic)` (or `FadeOut`). K2: ~20% faster than enter |
| `settle` | Gesture release lands | spring: damping 18, stiffness 200, pass release velocity (K8) |
| `celebrate` | Reward / success pop | spring: damping 9, stiffness 180 (a little overshoot) |
| `loop` | Pulse / attention | timing 700ms, `Easing.inOut(Easing.quad)`, reverse repeat |

The micro-interaction ceiling is ~300ms (K2). Anything the user triggers and waits on lands
under that. Loops and ambient motion may be slower because the user is not blocked. Animate
`transform` and `opacity` only (K4). Gate expressive effects behind `useReducedMotion()` (K6).

---

## Fade

**Reach for it when** an element enters, leaves, or swaps and you want the change to feel
intentional instead of popping. The safest, most universal effect; the correct default for
conditional content.

**Wrong tool when** the element also moves or resizes (combine with translate or scale; see
[Grow](#grow), K7), or when instant feedback matters more than smoothness (a fade on a tap
target can feel laggy).

**API path.** For mount/unmount, the predefined `FadeIn` / `FadeOut` layout animations need
zero state management. For a value you own, animate an `opacity` shared value.

**Feel.** `enter` for appears, `exit` for leaves.

**Spine.**
~~~tsx
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

// Zero-state crossfade on mount / unmount
<Animated.View entering={FadeIn.duration(220)} exiting={FadeOut.duration(150)}>
  <Card />
</Animated.View>;
~~~
~~~tsx
// Manual, when you own the trigger
const opacity = useSharedValue(0);
const style = useAnimatedStyle(() => ({ opacity: opacity.value }));
useEffect(() => { opacity.value = withTiming(1, { duration: 220 }); }, []);
return <Animated.View style={[styles.card, style]} />;
~~~

**Gotchas.** A true crossfade between two pieces of content needs both layers mounted and
absolutely stacked, or you get a flash of empty space. Exiting animations only fire if the
element is unmounted through React, not hidden with `display`.

**Gate.** K6. Fade is the canonical reduced-motion fallback for every other effect.

---

## Grow

**Reach for it when** something arrives and deserves a beat of presence (a card popping in,
a FAB expanding, a confirmation badge), or to add weight to an entrance by pairing scale
with a fade.

**Wrong tool when** it is ambient or frequent. Growth reads as "look here," so overusing it
makes everything shout. One growing element at a time.

**API path.** A `scale` shared value driven by `withSpring` (life) or `withTiming` (control).
For entrances, combine with `FadeIn`. K7: scale entrances start at ~0.95, never 0.

**Feel.** `celebrate` for a reward pop, `enter` for a calm arrival.

**Spine.**
~~~tsx
const scale = useSharedValue(0.95); // K7: not 0
const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
useEffect(() => {
  scale.value = withSpring(1, { damping: 12, stiffness: 180 });
}, []);
return <Animated.View style={[styles.card, style]} />;
~~~

**Gotchas.** Scaling text or icons past ~1.1 reveals blur (you are magnifying rasterized
pixels). Keep grow subtle, or scale a container, not type. Never grow by animating
width/height; use `transform: scale` (K4).

**Gate.** K7 (anchored entrance), K4 (transform only).

---

## Shrink

**Reach for it when** you want tactile feedback on touch. A control that dips to ~0.96 on
press-in and springs back on release is the single highest-return premium detail in an app,
and it is nearly free.

**Wrong tool when** the target is tiny (a small shrink is invisible) or non-interactive
(shrinking should signal "I am being pressed").

**API path.** A `scale` shared value toggled in a `Gesture.Tap()` (or `Pressable`
`onPressIn`/`onPressOut`). Use the `press` token.

**Feel.** `press` in both directions.

**Spine.**
~~~tsx
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const scale = useSharedValue(1);
const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
const tap = Gesture.Tap()
  .onBegin(() => { scale.value = withSpring(0.96, { mass: 0.5, damping: 14, stiffness: 240 }); })
  .onFinalize(() => { scale.value = withSpring(1); });
return (
  <GestureDetector gesture={tap}>
    <Animated.View style={[styles.button, style]} />
  </GestureDetector>
);
~~~

**Gotchas.** Use `onBegin`/`onFinalize`, not `onStart`/`onEnd`, so press-down registers
instantly and always releases even if the tap is cancelled. Pair with a subtle opacity drop
only on a light surface; double feedback can feel heavy.

**Gate.** K3. This fires on the highest-frequency interactions, so keep it nearly free and
instant; it is the one motion a 100+/day control *should* have.

---

## Pulse

**Reach for it when** something needs passive attention the user has not acted on yet: a
"new" badge, a record button, a CTA waiting for a first tap. A gentle scale or opacity rhythm
draws the eye without a gesture.

**Wrong tool when** it never stops. An infinite pulse on primary content is fatiguing and
burns battery. Reserve it, and stop it once the user acknowledges.

**API path.** `withRepeat` wrapping `withTiming`, `reverse` flag on so it ping-pongs back to
rest instead of snapping. (A looping ambient pulse can also be a CSS keyframe animation in
Reanimated 4; see the tool-selection table in `react-native-craft.md`.)

**Feel.** `loop`.

**Spine.**
~~~tsx
const scale = useSharedValue(1);
const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
useEffect(() => {
  if (reduced) return;                                  // K6: no loop under reduced motion
  scale.value = withRepeat(
    withTiming(1.08, { duration: 700, easing: Easing.inOut(Easing.quad) }),
    -1,    // forever
    true,  // reverse: animate back to 1 each cycle
  );
}, []);
~~~

**Gotchas.** `withRepeat` repeats the animation you hand it, so to loop a multi-step move wrap
the steps in `withSequence` first, then repeat that. Cancel the loop (set the value back to
rest, or `cancelAnimation`) when the thing is acknowledged so it does not keep animating
off-screen.

**Gate.** K6 (a loop must have a static fallback), K3 (never on primary content the user
sees constantly).

---

## Sequence

**Reach for it when** several things should resolve in order rather than all at once: a list
revealing row by row, a multi-part confirmation (check draws, label slides, panel settles),
or any chained beat. Staggering is what makes content feel composed instead of dumped.

**Wrong tool when** the items are unrelated or the list is long. A 40-row stagger makes the
user wait; cap the stagger to the first handful, then show the rest instantly (K3).

**API path.** Two tools: `withSequence` chains animations on one shared value; `withDelay`
offsets a start. For list reveals, a directional entering animation with a per-index delay is
cleanest. (See `react-native-craft.md` for the stagger-cap rule.)

**Feel.** `enter` per item, `settle` on the final landing.

**Spine.**
~~~tsx
// Chained beats on one value
ring.value = withSequence(
  withTiming(1.2, { duration: 120 }),
  withSpring(1, { damping: 9 }),
);
~~~
~~~tsx
// Staggered list reveal (cap the visible stagger)
import Animated, { FadeInDown } from "react-native-reanimated";

{items.map((item, i) => (
  <Animated.View key={item.id} entering={FadeInDown.delay(Math.min(i, 6) * 60).springify()}>
    <Row item={item} />
  </Animated.View>
))}
~~~

**Gotchas.** Keep per-item delay small (50–70ms) and cap the total. On a `FlatList`,
index-based delay applies to whatever renders, so on fast scroll later rows animate late;
gate the stagger to the initial screenful.

**Gate.** K2/K3. Cap the stagger so item 20 never reads as lag.

---

## Flip

**Reach for it when** one surface has two sides (front/back of a card, reveal of hidden or
secure content, a toggle that flips state). The 3D rotation is a strong, premium reveal that
still reads instantly.

**Wrong tool when** the two states are not truly "two faces of one object." If content just
changes, a [fade](#fade) or [morph](#morph) is more honest and cheaper.

**API path.** Two absolutely-stacked faces, each with `rotateY` interpolated from one shared
value, plus a `perspective` transform so it looks 3D, plus an opacity cull (see gotcha).

**Feel.** a single `withTiming` ~400–450ms (a fixed choreographed move, so a curve is correct
here per K1), or `withSpring` for bounce.

**Spine.**
~~~tsx
const spin = useSharedValue(0); // 0 = front, 1 = back
const front = useAnimatedStyle(() => ({
  transform: [{ perspective: 800 }, { rotateY: `${interpolate(spin.value, [0, 1], [0, 180])}deg` }],
  opacity: spin.value < 0.5 ? 1 : 0,   // durable backface cull (see gotcha)
}));
const back = useAnimatedStyle(() => ({
  transform: [{ perspective: 800 }, { rotateY: `${interpolate(spin.value, [0, 1], [180, 360])}deg` }],
  opacity: spin.value < 0.5 ? 0 : 1,
}));
const flip = () => { spin.value = withTiming(spin.value ? 0 : 1, { duration: 450 }); };
~~~

**Gotchas.** Without `perspective` the card squashes flat instead of rotating in space.
Always include it. `backfaceVisibility: "hidden"` is unreliable on Android (and has regressed
on some iOS/Expo combos), so the durable fallback shown above drives each face's `opacity` to
0 once its angle passes 90° rather than trusting backface culling.

**Gate.** K1 (a fixed timed move uses a curve, not a spring), K4 (rotate/opacity only).

---

## Morph

**Reach for it when** one thing becomes another and you want continuity instead of a cut: an
icon toggling (play↔pause, plus↔close), a container resizing between states, or a thumbnail
expanding to full screen. Morphing says "these states are the same object."

**Wrong tool when** the start and end are unrelated, or the shapes are structurally
incompatible (see gotchas). Then a crossfade is right.

**API path, three tiers by ambition:**
1. **Layout morph (size and position).** `layout={LinearTransition...}` on a view; Reanimated
   animates size/position changes smoothly on state change. This is the K4-correct way to
   resize. Never animate `width`/`height` by hand.
2. **Vector / icon morph (true shape change).** Skia's `usePathInterpolation` interpolates
   between paths on the UI thread, driven by a Reanimated shared value. A real vector morph,
   not an image crossfade. (Skia integration basics: `react-native-craft.md`.)
3. **Shared element (across screens)** is its own move, not a morph: the card→hero "grow."
   If the same element travels between two screens, go to the
   [Shared-element transition](#shared-element-transition-card-to-hero) entry, not this one.

**Feel.** timing 250–400ms for icons; `settle` (spring) for layout, but **ease-out, not spring, when expanding into a bounded area** (a spring overshoots the target band). See [Choose the motion type](#choose-the-motion-type-spring-vs-curve).

**Spine (vector morph).**
~~~tsx
import { Canvas, Path, usePathInterpolation, Skia } from "@shopify/react-native-skia";

const play = Skia.Path.MakeFromSVGString(PLAY_SVG)!;
const pause = Skia.Path.MakeFromSVGString(PAUSE_SVG)!;
const progress = useSharedValue(0);
const path = usePathInterpolation(progress, [0, 1], [play, pause]);
const toggle = () => { progress.value = withTiming(progress.value ? 0 : 1, { duration: 250 }); };
return (
  <Canvas style={styles.icon}>
    <Path path={path} color="#FFFFFF" />
  </Canvas>
);
~~~

**Gotchas.** `usePathInterpolation` needs the two paths to share command structure and point
count; morphing structurally different or differently-sized shapes needs a library like
Flubber or Polymorph, which runs on the JS thread and can lag on large paths. Keep morph
paths compatible by design. For layout morph, `LinearTransition` is optimized, but still do
not also animate width/height by hand on the same view.

**Gate.** K4 (layout morph replaces animated width/height), K1 (ease-in-out for an on-screen
shape change).

---

## Shared-element transition (card to hero)

**Reach for it when** the *same element* should appear continuous across a navigation: a list photo card that becomes the detail hero, a thumbnail that opens into a full image, a row that expands into a screen. The element travels and resizes between two screens. This is the move people *call* "morph" or "grow" but is neither. See [Name the effect](#name-the-effect-disambiguate-the-word-before-you-build).

**Wrong tool when** the two things are not the same element (use a page [Spatial transition](#spatial-transitions-fly-dont-teleport)), the change is a shape morph in place ([Morph](#morph)), or it is an in-place scale ([Grow](#grow)).

**The approach that works (expo-router + Fabric): the morph *replaces* the transition.** Do not fly a clone over a native push. Kill the route animation and FLIP the *real destination element* from a stashed source rect, self-contained on the destination screen, no clone, no portal, no overlay host.
1. On press, `measureInWindow` the source card and stash its rect in a **tiny module store** (not navigation params, not context; far simpler and more robust).
2. Push with the route's **`animation: 'none'`** (expo-router `Stack.Screen`). Native push transitions **snapshot the incoming screen**, so a JS/Reanimated animation *during* the push paints only 2–3 frames. Remove the transition; don't animate over it.
3. On the destination, mount the **light hero only**, take the stashed rect once, and FLIP the real hero: set its initial `translate`+`scale` to the source rect, animate to rest. Animate the real element, never a flying clone.

**Ways this goes wrong (all tried, all traps):**
- **Overlay clone flying in window coords while the native push animates the destination** → chasing a moving target → the doubled "new card on top." The obvious first instinct; it is the trap.
- **`FullWindowOverlay`** (react-native-screens) under Fabric → janky and mispositioned for Reanimated.
- **`@gorhom/portal`** → not directly importable under pnpm (transitive only).
- **`sharedTransitionTag`** (Reanimated shared transitions) → experimental, feature-flagged in RA4, finicky with images. Not the reliable path today.

**Sequence it or it starves (the non-obvious one).** An entrance running *concurrently with the screen mount* gets starved to 2–3 frames even on the UI thread: mount layout + image decode saturate the thread, so transform-only (K4) is **necessary but not sufficient**; thread contention dominates. Mount the light hero only → `runAfterInteractions` → run the morph → *then* mount and stagger the heavy content and sheets. See [Sequence entrances after mount](#sequence-entrances-after-mount).

**Feel.** **ease-out, not a spring.** This expands into a *bounded* area (the hero slot); a spring overshoots past the target band and reads as broken. ~300–400ms, under the page-transition ceiling. (Bounded-grow exception in [Choose the motion type](#choose-the-motion-type-spring-vs-curve).)

**Spine (FLIP the real element, no clone).**
~~~tsx
// shared/heroRect.ts: a tiny module store, not context/params
let _rect: { x: number; y: number; w: number; h: number } | null = null;
export const stashHeroRect = (r: typeof _rect) => { _rect = r; };
export const takeHeroRect = () => { const r = _rect; _rect = null; return r; }; // take once

// source screen, on press
cardRef.current?.measureInWindow((x, y, w, h) => { stashHeroRect({ x, y, w, h }); navigate(); });

// destination: route option animation:'none'; FLIP the real hero AFTER interactions
const p = useSharedValue(0);
const from = useRef(takeHeroRect()).current;          // source rect, taken once on mount
useEffect(() => {
  const task = InteractionManager.runAfterInteractions(() => {          // don't race the mount
    p.value = withTiming(1, { duration: 320, easing: Easing.out(Easing.cubic) }); // ease-out, bounded
  });
  return () => task.cancel();
}, []);
const hero = useAnimatedStyle(() => {
  if (!from) return {};                                // no source rect → just render at rest
  return { transform: [                                // delta from source → the hero's own layout
    { translateX: interpolate(p.value, [0, 1], [from.x - target.x, 0]) },
    { translateY: interpolate(p.value, [0, 1], [from.y - target.y, 0]) },
    { scale:      interpolate(p.value, [0, 1], [from.w / target.w, 1]) }, // scale, not width (K4)
  ] };
}); // target = the hero's measured rect from onLayout
~~~

**Gotchas.** Measure in **window** coords (`measureInWindow`). Drive resize with **`scale`** off the rect ratio, never animated `width`/`height` (K4). **Judge smoothness in a release build**. Dev-mode jank here is real and misleading; sequence first, then evaluate. On SwiftUI this is one modifier (`navigationTransition(.zoom)`); on RN it is measured work, budget for it. Reduced motion: a cross-fade, no travel (K6).

**Gate.** K1 (ease-out for a fixed bounded move), K4 (transform/scale), K6; plus [Sequence entrances after mount](#sequence-entrances-after-mount).

## Icon and SVG animation

**Reach for it when** you have SVG assets and want them to animate: an icon toggling between
two states, a logo that draws itself on, a checkmark that traces, a glyph whose fill or stroke
shifts with state. This is the **react-native-svg** route, distinct from the Skia route in
[Morph](#morph) (reach here when the asset is already an SVG file).

**Wrong tool when** a plain transform or opacity on a static icon would do (do not reach for
path animation just to fade or scale an icon), or when the "icon" is really a Lottie / After
Effects export (use `lottie-react-native` instead of hand-wiring paths).

**API path.** react-native-svg elements are not animatable by default; wrap the element
(`Path`, `Circle`, …) with `Animated.createAnimatedComponent`, then drive its props with
`useAnimatedProps` off a shared value. In increasing difficulty:
- *transform / opacity*: cheapest, on the wrapping `Animated.View` or element.
- *fill / stroke color*: `interpolateColor` inside `useAnimatedProps`, driven by a 0→1 value.
- *draw-on (trace a line)*: set `strokeDasharray` to the path length and animate
  `strokeDashoffset` from that length down to 0, so the stroke draws itself.
- *shape morph (the `d` attribute)*: animate the path data itself. The hard one (see gotchas).

**Feel.** transform and color use the standard tokens; draw-on reads well at 400–800ms
ease-out; a `d` morph at 250–400ms.

**Spine.**
~~~tsx
import Animated, { useSharedValue, useAnimatedProps, interpolateColor, withTiming } from "react-native-reanimated";
import { Path } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const progress = useSharedValue(0); // 0 = state A, 1 = state B

// Draw-on: animate strokeDashoffset from full length down to 0
const drawProps = useAnimatedProps(() => ({
  strokeDashoffset: LENGTH * (1 - progress.value),
}));
// Color shift: interpolateColor inside the props worklet
const colorProps = useAnimatedProps(() => ({
  fill: interpolateColor(progress.value, [0, 1], ["#8E8E93", "#0A84FF"]),
}));
const toggle = () => { progress.value = withTiming(progress.value ? 0 : 1, { duration: 300 }); };
// <AnimatedPath d={ICON} stroke="#FFFFFF" strokeDasharray={LENGTH} animatedProps={drawProps} />
~~~

**Gotchas (the part that bites with exported SVGs).** Morphing the `d` between two icons only
looks right when both paths share command structure and point count. Icons exported from Figma
or Illustrator almost never match, so a naive interpolation jumps and inverts. Three ways out:
(1) hand-author the two states as point-compatible paths, (2) run them through Flubber, which
best-guesses a smooth interpolation but runs on the JS thread (keep paths small), (3) keep the
icon to transform / opacity / color / draw-on and skip true morph. Normalize both icons to the
same `viewBox` first, or the coordinate spaces will not line up. Making two arbitrary `d`
strings point-compatible by eye is the one task to hand to Flubber or a design pass.

> Note: `interpolateColor` here is Reanimated's, feeding a react-native-svg prop. That is
> correct. Inside a **Skia** canvas use Skia's `interpolateColors` instead (the two libraries
> store colors differently; see `react-native-craft.md`).

**Gate.** K4 (favor transform/opacity/color over `d` morph where possible).

---

## Flick

**Reach for it when** a single-finger throw should carry momentum: swipe-to-dismiss a card or
sheet, fling a panel away, flick through a stack. One finger, self-evident: it belongs with
the premium-but-effortless set (unlike pinch, which needs two fingers and discovery).

**Wrong tool when** precision matters more than momentum (use a tracked drag that snaps), or
when an accidental flick would destroy data without undo.

**API path.** `Gesture.Pan()` tracking the finger in `onChange`, then on release read
`velocityX/Y` and either `withDecay` (coast and decelerate) or decide dismiss-vs-return and
spring back **with the release velocity**. This is the core K8 pattern; the full canonical
gesture treatment, including the `snapPoint` helper and sheet handoff, is in
`gesture-and-scroll.md`. This entry is the catalog-level summary.

**Feel.** `settle` for the spring-back; `withDecay` carries its own physics.

**Spine.**
~~~tsx
import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { withDecay, withSpring } from "react-native-reanimated";
import { runOnJS } from "react-native-worklets"; // RA4: worklet fns live here now

const { width } = Dimensions.get("window");
const x = useSharedValue(0);
const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
const pan = Gesture.Pan()
  .onChange((e) => { x.value += e.changeX; })
  .onFinalize((e) => {
    const dismiss = Math.abs(e.velocityX) > 800 || Math.abs(x.value) > width * 0.4;
    if (dismiss) {
      // fire onDismiss on the decay COMPLETION, not at its start; firing now would
      // unmount the card mid-flight instead of letting it coast off-screen
      x.value = withDecay({ velocity: e.velocityX, deceleration: 0.997 }, (fin) => {
        if (fin) runOnJS(onDismiss)();
      });
    } else {
      x.value = withSpring(0, { velocity: e.velocityX, damping: 18, stiffness: 200 });
    }
  });
~~~

**Gotchas.** Decide dismiss from velocity OR distance, not distance alone, so a fast short
flick still works; the `snapPoint` pattern (position plus a velocity factor) is the clean way
to choose a landing target. Feed release velocity into the spring-back or the motion hits a
wall. `withDecay` velocity units are pixels/second from Gesture Handler; do not rescale them.

**Gate.** K8: interruptible, velocity-preserving by construction.

---

## Scroll-driven motion

**Reach for it when** the screen scrolls and the chrome should respond: a collapsing or
parallax header, a title that docks, a CTA that appears past a threshold, images that scale in
as they enter, a read-progress bar.

**Wrong tool when** the reaction should be discrete (cross a threshold, then run a normal state
animation; do not bind continuously) or when you are about to animate layout per frame (see
gotchas).

**API path.** `useAnimatedScrollHandler` writes the live offset into a shared value, then the
`interpolate`-over-ranges model drives the styles. The scrollable must be an
`Animated.ScrollView` / `Animated.FlatList` with `scrollEventThrottle={16}`. Full scroll
treatment (drivers, clamping, sticky headers, parallax budget) is in `gesture-and-scroll.md`.

**Feel.** No token: the finger is the clock. Keep outputs subtle and clamped.

**Spine.**
~~~tsx
const scrollY = useSharedValue(0);
const onScroll = useAnimatedScrollHandler((e) => { scrollY.value = e.contentOffset.y; });

const header = useAnimatedStyle(() => ({
  transform: [
    { translateY: interpolate(scrollY.value, [0, 120], [0, -52], Extrapolation.CLAMP) },
    { scale: interpolate(scrollY.value, [0, 120], [1, 0.92], Extrapolation.CLAMP) },
  ],
  opacity: interpolate(scrollY.value, [0, 120], [1, 0.6], Extrapolation.CLAMP),
}));
// <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16}>
~~~

**Gotchas.** Prefer `transform` and `opacity` on an absolutely-positioned header over
animating `height`. Animating height re-runs layout every frame and is the classic cause of
scroll-linked lag (K4). One `useAnimatedScrollHandler` per scrollable; do not share a single
handler across nested lists. Always `CLAMP` so over-scroll does not push values past range.

**Gate.** K4 (transform on an absolute layer, never per-frame height).

---

## Color and state transition

**Reach for it when** a non-transform property should change smoothly: theme switch, selected
vs unselected, valid vs error, a progress fill. A color transition is how a state change reads
as deliberate instead of a hard repaint.

**Wrong tool when** you would animate many large colored surfaces at once, or use color as a
stand-in for motion that should also move.

**API path.** `interpolateColor` inside a `useAnimatedStyle` (or `useDerivedValue`) worklet,
driven by a shared value. (In a Skia canvas use Skia's `interpolateColors` (see `react-native-craft.md`).)

**Feel.** `enter` / `exit` timings; keep it at or above 200ms so the hue shift stays legible.

**Spine.**
~~~tsx
const progress = useSharedValue(0); // 0 = rest, 1 = active
const style = useAnimatedStyle(() => ({
  backgroundColor: interpolateColor(progress.value, [0, 1], ["#1C1C1E", "#0A84FF"]),
}));
const toggle = () => { progress.value = withTiming(progress.value ? 0 : 1, { duration: 200 }); };
~~~

**Gotchas.** `interpolateColor` only works inside a worklet driven by a shared value; wiring it
to plain React state re-renders makes it stick on the first color. Color is not a transform:
use it deliberately, not on dozens of views. For a full theme swap, the durable pattern is to
snapshot the current UI, swap the theme underneath, and cross-fade the snapshot out.

**Gate.** K1 (ease for color/selection, not a spring).

---

## Gesture composition and interruptibility

**Reach for it when** more than one gesture lives on an element (tap + pan, pan + pinch, single
vs double tap), or when an in-flight animation must survive a new touch. This is the mechanism
behind the **K8 interruptible-by-default** law.

**Wrong tool when** a single gesture covers it. Do not compose for its own sake.

**API path.** `Gesture.Race`, `Gesture.Simultaneous`, `Gesture.Exclusive` combine gestures for
one `GestureDetector`; relation props coordinate gestures across different components.
Interruptibility is free: assigning a new `withSpring` / `withTiming` target to a shared value
mid-animation continues from the current value and velocity. (See `gesture-and-scroll.md` for
the K8 deep treatment and the ScrollView-handoff case.)

**Feel.** `settle` for the catch; the spring carries the in-flight velocity.

**Spine.**
~~~tsx
const pan = Gesture.Pan().onChange((e) => { x.value += e.changeX; });
const pinch = Gesture.Pinch().onChange((e) => { scale.value *= e.scaleChange; });
const composed = Gesture.Simultaneous(pan, pinch);
// <GestureDetector gesture={composed}>

// Interruptible by construction: a tap mid-fling just retargets the value
const onTap = () => { scale.value = withSpring(1); }; // picks up the current velocity
~~~

**Gotchas.** `Simultaneous` when both should fire, `Exclusive` when only one should win
(single vs double tap), `Race` when the first to activate takes it. Do not gate animations
behind an `isAnimating` boolean. That defeats interruptibility.

**Gate.** K8.

---

## Morphing toolbar (scroll-aware action bar)

**Reach for it when** you want a compact floating bar that appears at certain scroll positions
(or after a threshold), whose icons expand to reveal a label on tap or when active: the "pill
that grows a word." It does three jobs at once: appear/disappear on scroll, slide a selection
indicator, expand from icon to icon-plus-label.

**Wrong tool when** the bar is always present and static (that is a normal tab bar), or when
the labels are essential wayfinding (do not hide critical navigation behind a tap).

**API path.** Three composable pieces:
- *Appear on scroll*: drive `translateY` / `opacity` from a scroll shared value with a
  threshold (see [Scroll-driven motion](#scroll-driven-motion)). Hide-on-scroll-down /
  show-on-scroll-up via `useAnimatedReaction` comparing previous vs current offset.
- *Sliding indicator*: measure each item's `x` and `width` with `onLayout` into shared values,
  then spring a backing pill's `translateX` and `width` toward the active item.
- *Icon→label expand*: animate the item's `width` and the label's `opacity` / `translateX`
  together off one progress value; `LinearTransition` reflows the neighbors.

**Feel.** `settle` spring for the indicator and the width morph; `enter` for the bar appearing.

**Spine.**
~~~tsx
// 1) slide the indicator to the active tab (from measured layouts)
const indicator = useAnimatedStyle(() => ({
  transform: [{ translateX: withSpring(tabX.value, { damping: 18, stiffness: 200 }) }],
  width: withSpring(tabW.value, { damping: 18, stiffness: 200 }),
}));
// 2) expand the active item from icon to icon + label off one progress value
const item = useAnimatedStyle(() => ({
  width: interpolate(progress.value, [0, 1], [44, 132], Extrapolation.CLAMP),
}));
const label = useAnimatedStyle(() => ({
  opacity: interpolate(progress.value, [0, 1], [0, 1], Extrapolation.CLAMP),
  transform: [{ translateX: interpolate(progress.value, [0, 1], [-8, 0], Extrapolation.CLAMP) }],
}));
~~~

**Gotchas.** Measure item widths with `onLayout` into shared values before sliding an
indicator; do not hardcode widths. Animate the container with `LinearTransition` so neighbors
reflow when one item grows instead of overlapping. Keep the collapsed tap target ≥ 44pt even
when it shows only an icon. If the bar hides on scroll, debounce direction changes so it does
not flicker on tiny scroll jitters.

> This entry animates `width`, which is normally a K4 no. It is the deliberate exception for a
> measured, indicator-style morph (the values come from layout, not guesses). Pair it with
> `LinearTransition` and never extend the pattern to general resizing.

**Gate.** K8 (indicator springs carry velocity), K4-exception (measured-width morph only).

---

## Spatial transitions (fly, don't teleport)

Core idea: a fluid interface is like moving through water: you float rather than teleport.
Static cuts are fast but can leave users disoriented; applied thoughtfully, directional motion
feels just as fast while adding clarity and a sense of space.

**Reach for it when** moving between screens, tabs, or states where preserving the user's sense
of place matters. Three concrete moves:
- *Directional tab/page motion.* Carry the direction of travel: a tab to the left slides
  content in from the left, to the right from the right. The outgoing screen shifts slightly
  while the incoming one arrives, reading as space rather than a hard swap.
- *Shared-element continuity.* When a thing on one screen becomes a thing on the next (a row
  becomes a detail header, a button becomes a tray), animate the link so the eye follows it.
  Use a shared-bounds transition so the element appears to travel.
- *Label and content morphing.* When only part of the content changes (Continue→Confirm),
  morph the changed part and hold the rest constant.

**Wrong tool when** the two states have no spatial relationship (a true context switch should
cut, not pretend to be connected), or when the motion would slow a high-frequency action (K3).

**API path.** Direction: a stack or tab navigator with a custom transition whose interpolation
sign flips based on the from/to index (React Navigation `animation` option or a custom screen
interpolator), or an `Animated.ScrollView` pager. Shared element: Reanimated shared transitions
(experimental, feature-flagged in Reanimated 4) or a measured-rect FLIP (capture from-rect, to-
rect, animate the delta). Label morph: cross-fade or per-glyph for the changed substring.

**Feel.** `enter` for the incoming view; a smaller, faster shift for the outgoing one. Keep the
whole transition under the 300ms ceiling (K2) so it never feels slower than a cut.

**Spine.**
~~~tsx
// Directional screen/tab transition: the sign follows travel direction
const direction = toIndex > fromIndex ? 1 : -1;
const incoming = useAnimatedStyle(() => ({
  opacity: progress.value,
  transform: [{ translateX: interpolate(progress.value, [0, 1], [direction * 24, 0]) }],
}));
const outgoing = useAnimatedStyle(() => ({
  transform: [{ translateX: interpolate(progress.value, [0, 1], [0, -direction * 8]) }],
}));
~~~

**Gotchas.** Be consistent: the same navigation action must always move the same direction, or
the spatial model breaks. Keep the outgoing shift small (a hint, not a full slide) so it reads
as depth. Only animate a link when a real spatial relationship exists. Always honor reduced
motion with an instant or fade fallback (K6).

**Gate.** K2 (under 300ms), K6, K7 (incoming anchored to direction of travel).

---

## Skia backgrounds and shaders

**Reach for it when** you want an ambient surface plain Views cannot produce: an animated
gradient wash, a mesh-gradient bloom, procedural noise/grain, a holographic or aurora sheen,
soft generative motion behind a hero or paywall, or a real backdrop blur (especially on
Android). This is the GPU tier, deliberately separate from the Reanimated-first effects above.

**Wrong tool when** a `LinearGradient` component or static image already gets you there, the
screen is text-heavy or a standard list (Skia draws in its own canvas and is not for reading),
or you only need a one-off transform/opacity move. Shaders are the most expensive, least
accessible tool in the kit. Spend them on signature surfaces.

**API path.** `@shopify/react-native-skia`, two routes easy→hard:
1. *Built-in shaders, no SkSL.* Compose a `<Canvas>` with a `<Fill>` (or `<Rect>`) plus a
   gradient (`LinearGradient` / `RadialGradient` / `SweepGradient`) or a Perlin
   `Turbulence` / `FractalNoise` shader. Animate by feeding a shared value into positions,
   colors, or noise frequency. Covers most premium-background asks without shader code.
2. *Custom SkSL runtime shader.* `Skia.RuntimeEffect.Make(\`...\`)` compiles an SkSL program
   dropped in via `<Fill><Shader source={effect} uniforms={uniforms} /></Fill>`. This is where
   aurora, holographic, and ShaderToy-style effects come from.

**Animating a shader (the part people get wrong).** There is no built-in `iTime`; declare your
own `uniform float time;` and feed it from Skia's `useClock()` (or a Reanimated shared value),
passing uniforms as a **derived value** so the canvas updates on the UI thread without React
re-rendering every tick. (Full Skia+Reanimated integration and a worked SkSL spine are in
`react-native-craft.md`; do not duplicate that wiring here.)

**Feel.** Ambient backgrounds want slow, non-obvious motion: drift a noise offset or gradient
angle over many seconds, not a tight loop. Tie intensity to scroll or gyroscope for surfaces
that feel alive. Always honor reduced motion with a static gradient or frozen frame (K6).

**Backdrop blur reality.** `BackdropBlur` / `Blur` work for content rendered inside the same
Canvas, but Skia cannot blur live RN views outside the Canvas (a scrolling list behind a sheet).
For a true `backdrop-filter` over dynamic content, reach for `expo-blur` or a platform
`BlurView`; use Skia blur when the blurred content lives in the Canvas.

**Gotchas.**
- *Cost.* One full-screen shader behind a hero is fine; stacking several, or one behind a
  scrolling list, drains battery and drops frames on mid-range Android. Profile on a real
  low-end device.
- *Compile safety.* `RuntimeEffect.Make` returns null on a compile error. Guard it. SkSL is
  close to GLSL but not identical; ported shaders sometimes need tweaks.
- *No mixing.* Skia draws in its own layer; lay the Canvas as a background and absolutely-
  position real content on top.
- *Density.* Supersample `RuntimeShader` image filters (they ignore pixel-density scaling).
- *Text belongs in RN*, not Skia, for readability and accessibility.

**Gate.** K6 (static frame, not a slower shader), K4 (per-frame work stays on the UI thread via
a derived uniform).

---

# Combination craft

The expensive-feeling moments are almost never one big effect. They are several cheap effects
resolving **together** on one timeline: a card grows while old content fades, a number rolls up
while its tile settles, a button squishes and springs back. Reach for combinations on any
moment that matters (state change, success, reveal, swap); single effects are the everyday case.

Two laws make a combination read as premium instead of busy:
1. **One clock.** Drive every sub-effect from a single value (a `progress` shared value, or the
   gesture's own value). That keeps the parts in lockstep and interrupting together (K8).
   Several independent `withTiming` calls is how combinations drift out of sync.
2. **Overlap, do not queue.** The next part starts at ~60–70% of the previous one, not after it
   finishes. Overlap is what separates "choreographed" from "a list of animations in order."

## The orchestration model: one clock, many styles

Use one shared value as the timeline, then derive each animated property from it with
`interpolate` over its **own sub-range**. Give each layer a different range (and curve) so they
feel composed, not mechanical.

~~~tsx
import { interpolate, Extrapolation } from "react-native-reanimated";

const progress = useSharedValue(0); // single clock for this whole moment
useEffect(() => { progress.value = withTiming(1, { duration: 600 }); }, []);

// Outgoing content: fades over the FIRST half
const outgoing = useAnimatedStyle(() => ({
  opacity: interpolate(progress.value, [0, 0.5], [1, 0], Extrapolation.CLAMP),
}));
// Incoming content: grows + fades over the BACK half, overlapping the exit
const incoming = useAnimatedStyle(() => ({
  opacity: interpolate(progress.value, [0.3, 1], [0, 1], Extrapolation.CLAMP),
  transform: [{ scale: interpolate(progress.value, [0.3, 1], [0.96, 1], Extrapolation.CLAMP) }],
}));
~~~

The same one-value pattern staggers a group: each child reads the shared clock over a delayed
sub-range, so the whole set stays synced while arriving in turn.

~~~tsx
function useStaggerStyle(progress: SharedValue<number>, index: number) {
  const start = Math.min(index * 0.12, 0.6); // cap so late rows do not wait forever
  return useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [start, start + 0.4], [0, 1], Extrapolation.CLAMP),
    transform: [{ translateY: interpolate(progress.value, [start, start + 0.4], [12, 0], Extrapolation.CLAMP) }],
  }));
}
~~~

## Choreography gates

Score a combination against these (they extend K1–K8 to multi-part moments):
- **One clock** drives the whole moment; parts are interpolated sub-ranges, not independent timers.
- **Overlap**, do not queue: each part starts before the previous ends.
- **Vary the curve per layer**: outgoing leaves ease-in (out of the way fast), incoming arrives
  ease-out or spring (lands soft). K1 per layer.
- **Lead with motion, finish with settle**: the last thing is a spring coming to rest, never a
  hard stop.
- **One hero per moment**: a single element grows or pops; everything else supports it. Two
  heroes read as chaos.
- **Preserve volume** in any squash (see below), or it looks like a glitch.
- **Interruptible together** (K8): a tap mid-combo retargets the one clock, so the whole moment
  redirects as a unit.
- **Reduced motion collapses the combo** (K6) to a single opacity fade or instant swap. Never
  ship a multi-part combination without that branch.

## Worked combinations

### Card takeover (grow in while old content fades out)
One card grows and takes over while what was there fades away. Stack both layers absolutely so
they share the same space, run them off one clock with overlapping ranges (outgoing `[0, 0.5]`,
incoming `[0.3, 1]`), and put `LinearTransition` on the surrounding container so siblings reflow
into the new size instead of jumping. Use the orchestration spine above verbatim; the overlap in
the middle is the part that sells it. Fade-only here looks flat; the scale gives the incoming
card presence.

### Rolling stat (tabular numbers moving up)
The "numbers moving up" feel is a vertical roll, not a re-render. Each digit is a strip of 0–9
stacked in a fixed-height window with `overflow: hidden`; translate the strip so the right digit
sits in the window, animated with a spring. Roll only the digits that changed.

~~~tsx
const DIGIT_HEIGHT = 40;
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function RollingDigit({ value }: { value: SharedValue<number> }) {
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(-value.value * DIGIT_HEIGHT, { damping: 18, stiffness: 200 }) }],
  }));
  return (
    <View style={styles.window}>
      <Animated.View style={style}>
        {DIGITS.map((d) => <Text key={d} style={styles.digit}>{d}</Text>)}
      </Animated.View>
    </View>
  );
}
~~~
Pair the roll with the `settle` token, use **tabular (monospaced) figures** so width does not
jump, and add a one-shot subtle scale pop or color flash the instant the value lands. That tiny
pop on top of the roll is the premium tell.

### Squish (squash and stretch)
"Getting squishy" is the squash-and-stretch principle. The rule that makes it work is **conserve
volume**: scaleX and scaleY move in opposite directions so the object never looks like it just
shrank. Drive both from one value; let the spring overshoot through rest on release.

~~~tsx
const squish = useSharedValue(0); // 0 = rest, 1 = full squash
const style = useAnimatedStyle(() => ({
  transform: [
    { scaleX: interpolate(squish.value, [0, 1], [1, 1.12]) },
    { scaleY: interpolate(squish.value, [0, 1], [1, 0.88]) }, // inverse keeps volume
  ],
}));
const press = () => {
  squish.value = withSequence(
    withTiming(1, { duration: 90 }),               // anticipation: squash in
    withSpring(0, { damping: 8, stiffness: 220 }), // release: overshoot back through rest
  );
};
~~~
Reach for it on tactile, physical-feeling elements (buttons, toggles, a like that pops). Skip it
on anything that should read as rigid or precise; a serious data control barely squashes.

### Choreographed group reveal
A screen or section arriving: header, then rows, then CTA, all on one clock via the
`useStaggerStyle` pattern, each child doing a small grow + fade + rise. Cap the stagger to the
first handful and show the rest instantly (K3) so a long list never makes the user wait.

## Quick two-effect combos (the everyday wins)
- **Tactile button:** Shrink (`press`) plus a 1–2% opacity dip, under 150ms. Add a squish
  variant for playful surfaces.
- **Content arrival:** Fade plus Grow from ~0.95, springy. One element, or a short stagger.
- **Success moment:** Grow with the `celebrate` overshoot, optional one-shot Pulse, then rest.
- **Icon toggle:** Morph (Skia path) for the glyph, Shrink on the tap target for feedback.
- **Like / reward burst:** Squish the icon, scale-pop past 1 with `celebrate` overshoot, fade in
  a quick accent. One clock, all three.
- **Swipe to dismiss:** Flick for the throw, Fade as it leaves, `LinearTransition` on the list so
  the gap closes smoothly.

## Build a combo from a description (COMBO SPEC)

A premium moment can be described in plain language, beat by beat, and assembled from entries
instead of guessed at. Capture it as a COMBO SPEC, then compile with the one-clock model.

**Grammar.** A combo is an ordered list of beats. Each beat names:
- *subject*: the element that moves (sheet, pill, card, label, icon).
- *effect*: a catalog entry (Grow, Shrink, Fade, Morph, Flick, Pulse, Sequence, scroll, color…).
- *trigger*: what starts it (open, press, settle, scroll, gesture, success).
- *timing*: how it relates to the previous beat: `with` (same start), `after` (starts when the
  previous finishes), or `overlap N%` (starts N% into the previous beat). Overlap is where
  premium lives; pure `after` queues and feels slow.
- *feel*: a feel token (`press` / `enter` / `exit` / `settle` / `celebrate` / `loop`) or an
  explicit spring.

**Worked example.** "the bottom sheet flies up, and as it is arriving the large pill morphs into
a smaller one."

COMBO SPEC:
1. subject: sheet, effect: enter (translateY up), trigger: open, timing: start, feel: settle
2. subject: pill, effect: morph (large→small), trigger: with sheet, timing: overlap 60% of beat 1, feel: settle

**Compile.** `with` and `overlap` beats share one progress clock and interpolate over sub-ranges;
`after` beats chain via `withDelay` or `withSequence`. For the example, run the sheet on a spring
and start the pill morph at ~60% of its travel:
~~~tsx
// one clock drives both; the pill starts at 60% of the sheet's arrival
sheet.value = withSpring(0, { damping: 18, stiffness: 200 }); // 0 = docked (flown up)

const pill = useAnimatedStyle(() => {
  const p = interpolate(sheet.value, [SHEET_START, 0], [0, 1], Extrapolation.CLAMP);
  const morph = interpolate(p, [0.6, 1], [0, 1], Extrapolation.CLAMP); // begins at 60%
  return { transform: [{ scale: interpolate(morph, [0, 1], [1, 0.72]) }] };
});
~~~
**Rules.** Keep a combo to a few beats; more than three or four is probably two moments. Every
combo gets one clock and a reduced-motion collapse (K6). Name each beat with a catalog effect so
the spec stays reviewable.

**Where this lives.** The grammar lives here. Parsing a plain-language description into a COMBO
SPEC, and choosing clock vs sequence, is an IMPLEMENT-mode responsibility in SKILL.md.

> **Tuning loop (IMPLEMENT note).** Motion is felt, not specified. The numbers here are good
> defaults, but the last 10% gets dialed in by hand on a real device. **Do not re-derive a panel**;
> the kit ships one: drop in the bundled **MotionTuner** (`assets/MotionTuner.tsx`), a dev-only,
> zero-extra-dep tuner for timing, spring bounce, and COMBO SPEC overlap, with a curve⇄spring toggle.
> Tune on device, then export the JSON into the motion tokens (`token-lint` holds them) and remove it.
> Full wiring and the video→tune pipeline: `references/tuning.md`.

---

# Supporting craft

## Sequence entrances after mount

The non-obvious performance rule, and the cause of most "my entrance only plays a few frames" bugs. An animation that runs **concurrently with a screen mount gets starved**, even on the UI thread, because mount layout and image decode saturate the thread. Transform-only (K4) is **necessary but not sufficient**; here thread contention dominates, not property choice.

The fix is sequencing, not optimization:
1. Mount only the **light** part first (the hero image, not the whole screen).
2. `InteractionManager.runAfterInteractions(...)`: let the mount and any navigation transition finish.
3. **Then** run the entrance / morph.
4. **Then** mount and stagger the heavy content (lists, sheets, charts).

Two corollaries from the field:
- **Native push transitions snapshot the incoming screen**, so a JS-driven animation *during* the push paints only 2–3 frames. Set the route `animation: 'none'` (expo-router / react-navigation) and run the morph yourself after mount, rather than animating over the system transition.
- **Judge smoothness in a release build.** Dev-mode jank is real and misleading here. Sequence first, then evaluate on release, not on the dev client.

This applies to any heavy-screen entrance, not just the [shared-element transition](#shared-element-transition-card-to-hero).

## Components that are mostly motion

Some "components" are really just choreography, and they are where hand-rolled attempts fall
apart.

**Bottom sheet.** The most common premium surface and the hardest. For production, reach for
`@gorhom/bottom-sheet`; the difficulty is not the drag but the **scroll handoff**: when the
sheet is open and the user drags, the sheet should move only while its inner list is at the top,
otherwise the list scrolls. The library's `BottomSheetScrollView` / `BottomSheetFlatList`
coordinate that. From scratch: a `translateY` shared value, snap points, `withSpring` to the
nearest snap on release fed by release velocity, a backdrop opacity derived from `translateY`,
and a `Gesture.Simultaneous` between the sheet pan and the inner scroll gated on scroll-at-top.
The full sheet/drawer physics treatment is in `gesture-and-scroll.md`. Budget real time for the
handoff.

**Drag-to-reorder lists.** Track the dragged item's position and use `useAnimatedReaction` to
shift neighbors and recompute order on the UI thread, plus auto-scroll near the edges. Unless you
need full control, reach for `react-native-reanimated-dnd` or `react-native-sortables` rather
than rebuilding measurement and collision from scratch.

## Loading and perceived performance

Motion's other half is the waiting, and getting it right makes the app feel faster than it is.
- **Skeletons / shimmer.** Placeholder shapes sized to the real content, with a looping shimmer
  (a translating gradient or gentle opacity pulse). Match them to the real layout so nothing
  jumps when content arrives. (A looping shimmer is a good fit for the CSS animation API; see
  `react-native-craft.md`.)
- **Skeleton→content.** The premium tell is that the skeleton does not pop into content;
  cross-fade, or let `LinearTransition` settle the layout as real data fills in.
- **Optimistic UI.** Animate the change the instant the user acts, reconcile when the server
  responds, animate back on failure. Do not make the user watch a spinner for something you can
  show immediately.
- **Empty states** deserve a small entrance too, not a bare static screen.

## Fundamentals (owned elsewhere: pointers, not repeats)

These pair with every effect but are owned by other files; reach to the named file for depth.

- **Haptics.** Fire `expo-haptics` from an animation's completion callback via `runOnJS`, matched
  to the moment (`selectionAsync` for value changes, `impactAsync` for lands, `notificationAsync`
  for success/error), never per frame. iOS Taptic is a silent no-op in Low Power Mode, so never
  make it load-bearing. Full treatment (API, matching rule, reduced-motion): `react-native-craft.md`.
- **60fps.** Reanimated animates on the UI thread, so a worklet can hold 60fps while the JS thread
  stalls, but a stalled JS thread still kills touch and list rendering. Watch UI-FPS vs JS-FPS in
  the Perf Monitor; if JS-FPS tanks, the cost is re-renders or `runOnJS` spam. Profile on a real
  mid-range Android device, never the simulator. Full perf rules: `react-native-craft.md`.
- **Platform feel.** iOS leans subtle and crisp; Material 3 Expressive leans springier and bolder.
  Decide one look vs platform-faithful up front; if faithful, fork the feel tokens with
  `Platform.select`. iOS spring calibration is the native-feel lens in `swiftui-craft.md`.
- **Accessibility beyond reduced motion.** `useReducedMotion` (K6) is necessary, not sufficient:
  motion that carries meaning (error shake, success pop) needs a non-motion equivalent in text,
  icon, or color, so state is never movement-only. Respect reduce-transparency for blur effects.

---

## AUDIT checklist

The per-effect hooks for REVIEW mode. Each maps to a gate; cite the gate by ID in the review
table (SKILL.md REVIEW format).

- Only `transform` and `opacity` are animated; no width/height/layout by hand. **(K4)**
  Exceptions: `LinearTransition` for resize, and the measured-width [morphing toolbar](#morphing-toolbar-scroll-aware-action-bar).
- Every gesture-launched animation is interruptible and feeds release velocity into the settle. **(K8)**
- No more than a couple of things animate at once on a screen. **(K3)**
- Every loop and large transform has a `useReducedMotion()` fallback; combos collapse to one fade. **(K6)**
- Micro-interactions land under ~300ms; durations come from feel tokens, not ad-hoc numbers. **(K2)**
- Worklet rules respected: no React hooks, `setState`, async, or `console.log` inside a worklet (cross to JS with `runOnJS`).
- Verified on a mid-range Android device, not just the iOS simulator.
- Scroll-linked motion animates transform/opacity on an absolute layer, not width/height per frame. **(K4)**
- Combinations run off one clock; reduced motion collapses them. **(K6, K8)**
- Premium moments that land are paired with a haptic matched to the moment, never one per frame.
- Platform feel is a decision (one look or platform-faithful), not an accident.
- Color and state transitions run via `interpolateColor` inside a worklet, not a React state re-render. **(K1)**
- State that matters is never conveyed by motion alone; there is a text, icon, or color equivalent.
- Navigation transitions carry direction consistently and fall back to instant or fade under reduced motion. **(K6, K7)**
- A morphing toolbar's indicator and item widths come from measured layouts, not hardcoded numbers; tap targets stay ≥ 44pt collapsed.
- Spatial morphs only fire where a real spatial relationship exists; unrelated context switches cut.
- SVG `d` morphs use point-compatible paths or Flubber; exported icons are normalized to one viewBox first.
- Shader backgrounds are reserved for signature surfaces, profiled on low-end Android, and collapse to a static gradient under reduced motion. **(K4, K6)**

---

## Library cheat-sheet

| Need | Tool |
|---|---|
| Scale, opacity, rotate, translate | Reanimated: `useSharedValue` + `useAnimatedStyle` + `withTiming` / `withSpring` |
| Chained or staggered beats | `withSequence`, `withDelay`, `withRepeat`; `FadeIn*.delay(i * n)` for lists |
| Mount / unmount transitions | Entering / exiting layout animations (`FadeIn`, `FadeInDown`, …) |
| Container resize / reflow | `LinearTransition` (layout prop) |
| Gestures + velocity | Gesture Handler (`Pan` / `Tap`) + `withDecay` / `snapPoint` |
| True shape / icon morph | Skia: `usePathInterpolation` driven by a shared value |
| Element across screens | Reanimated shared transitions (experimental, feature-flagged in RA4) |
| Scroll-linked motion | `Animated.ScrollView` / `FlatList` + `useAnimatedScrollHandler` + `interpolate` |
| Color / theme / state | `interpolateColor` inside `useAnimatedStyle` (Skia: `interpolateColors`) |
| Multiple gestures on one element | `Gesture.Simultaneous` / `Exclusive` / `Race` |
| Bottom sheet | `@gorhom/bottom-sheet` (handoff) or `translateY` + snap points |
| Drag-to-reorder | `useAnimatedReaction`, or `react-native-reanimated-dnd` / `react-native-sortables` |
| Loading state | Shimmer / skeleton sized to content, cross-fade to real data |
| Touch feedback | `expo-haptics` (impact / selection / notification) via `runOnJS` |
| Scroll-aware morphing toolbar | Measured layouts + `withSpring` indicator + `LinearTransition` + scroll threshold |
| Directional screen / tab transition | `translateX` sign from index delta, kept under 300ms |
| Element that becomes another | Shared transition (experimental) or measured-rect FLIP |
| Label that changes meaning | Morph the changed substring, hold the rest constant |
| Animate an SVG asset (fill, stroke, draw-on) | `react-native-svg` + `createAnimatedComponent` + `useAnimatedProps` |
| Morph one icon shape into another from SVGs | Point-compatible paths, or Flubber to normalize (JS thread) |
| Animated gradient or noise background | Skia Canvas + gradient or `Turbulence` / `FractalNoise`, animate a shared value (no SkSL) |
| Custom shader background (aurora, holographic) | Skia `RuntimeEffect.Make` (SkSL) + `Shader`, time via a `useClock` uniform |
| Backdrop blur over scrolling content | `expo-blur` / platform `BlurView` (Skia blur stays inside its own Canvas) |

Worklet primitives (`runOnJS`, etc.) import from `react-native-worklets` in Reanimated 4.
