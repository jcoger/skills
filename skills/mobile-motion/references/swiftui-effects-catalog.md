# swiftui-effects-catalog.md

The SwiftUI sibling of `effects-catalog.md`. Same effects, same gates, same combination craft,
translated to native iOS idioms: declarative animation, `matchedGeometryEffect`, `PhaseAnimator` /
`KeyframeAnimator`, gesture velocity, Metal shaders, Materials, and SF Symbols. This file is the
**native second build surface**: where `effects-catalog.md` terminates in shippable Reanimated and
`swiftui-craft.md` is only a translation *lens* (SwiftUI feel → Reanimated spring), this file
terminates in **shippable Swift**. Reach here when the target is a real SwiftUI build, not an RN one.

Every effect uses the same shape: **Reach for it when / Wrong tool when / API path / Feel /
Spine (Swift) / Gotchas / Gate**, the last tagging the K-gate (K1–K8 in SKILL.md) it leans on
hardest. The source catalog omits the Gate line; it is added here for parity with the RN catalog.

## Table of contents

1. [How to read an entry](#how-to-read-an-entry)
2. [What is different from RN](#what-is-different-from-rn): read once
3. [SwiftUI-only wins: don't rebuild what's free](#swiftui-only-wins-dont-rebuild-what-is-free)
4. [Shared foundation](#shared-foundation) (the model, feel tokens, budget, 60fps, reduced motion)
5. **Single effects**
   - [Fade](#fade)
   - [Grow](#grow)
   - [Shrink](#shrink)
   - [Pulse](#pulse)
   - [Sequence](#sequence)
   - [Flip](#flip)
   - [Morph](#morph) (shape change in place)
   - [Shared-element transition (card to hero)](#shared-element-transition-card-to-hero)
   - [Icon and SF Symbol animation](#icon-and-sf-symbol-animation)
   - [Flick](#flick)
   - [Scroll-driven motion](#scroll-driven-motion)
   - [Color and state transition](#color-and-state-transition)
   - [Gesture composition and interruptibility](#gesture-composition-and-interruptibility)
6. **Composite surfaces**
   - [Morphing toolbar](#morphing-toolbar-scroll-aware-action-bar)
   - [Spatial transitions](#spatial-transitions-fly-dont-teleport)
   - [Metal shaders and generative backgrounds](#metal-shaders-and-generative-backgrounds)
7. [Combination craft (SwiftUI compilation)](#combination-craft-swiftui-compilation): laws owned by `effects-catalog.md`
8. **Supporting craft**
   - [Components that are mostly motion](#components-that-are-mostly-motion)
   - [Loading and perceived performance](#loading-and-perceived-performance)
   - [Haptics](#haptics)
   - [Platform feel](#platform-feel)
   - [Verifying 60fps](#verifying-60fps)
   - [Accessibility beyond reduced motion](#accessibility-beyond-reduced-motion)
9. [AUDIT checklist](#audit-checklist)
10. [Library cheat-sheet](#library-cheat-sheet)

---

## How to read an entry

Same shape as the RN catalog so the agent routes fast:

- **Reach for it when** / **Wrong tool when**: pick on purpose, not by habit.
- **API path**: the specific SwiftUI / Metal primitive, not a vibe.
- **Feel**: which [feel token](#shared-foundation) drives it, so motion stays consistent app-wide.
- **Spine (Swift)**: the minimum correct code. Copy and fill; do not redesign.
- **Gotchas**: the thing that actually breaks it in production.
- **Gate**: the K-gate this effect leans on hardest.

**Four ways motion starts.** Almost everything here is one of: (1) on appear via `.transition` on an
inserted view (or `.onAppear { withAnimation { } }`), (2) on a state change via `withAnimation` /
`.animation(_:value:)`, (3) on a gesture via `DragGesture` / `.gesture`, (4) on a loop via
`.repeatForever(autoreverses:)`, `PhaseAnimator`, or `TimelineView`. The named effects map cleanly
onto these.

**Spines use literal colors and numbers for legibility.** Real components reference the design tokens
(`colors.*`, per `mobile-design` gate D1) and the feel tokens below, never inline hex or ad-hoc
durations. The snippets show the *motion*, not the token discipline; the lint (`mobile-audit`) would
flag a raw color literal in a real component.

---

## What is different from RN

The RN `effects-catalog.md` is the source of truth for *intent*; SwiftUI changes the *mechanics*:

- **Declarative, not imperative shared values.** There is no `useSharedValue` / `useAnimatedStyle`.
  You mutate `@State` inside `withAnimation { }` (or attach `.animation(_:value:)`), and SwiftUI
  interpolates every `Animatable` property between the old and new view. The state is the single
  source of truth.
- **The thread split is different.** RN splits JS thread vs UI thread. SwiftUI splits the **main
  thread** (where `body` is re-evaluated) vs the **render server** (Core Animation, which interpolates
  committed animations). The failure mode is not "JS spam" but **excessive `body` recomputation**.
- **Springs are the default, and the modern API is duration + bounce.** `.bouncy`, `.smooth`,
  `.snappy` are tuned presets; `.spring(duration:bounce:)` and the velocity-preserving
  `.interpolatingSpring(...)` cover the rest.
- **A lot of the RN hard parts are free.** Bottom-sheet scroll handoff (`presentationDetents`),
  shared-element continuity (`matchedGeometryEffect` / `navigationTransition(.zoom)`), rolling numbers
  (`contentTransition(.numericText())`), backdrop blur (Materials), skeletons (`redacted`), and icon
  animation (`symbolEffect`) are first-class. The entries call these out as they come up.

---

## SwiftUI-only wins: don't rebuild what is free

The biggest mindset shift from RN: **check whether the platform already ships the effect before
building it.** SwiftUI hands you a lot of premium motion as a single modifier. Spend the time you
save on the signature moment (the budget below).

- **System sheet with scroll handoff.** `.presentationDetents` gives drag, snap, grabber, and the
  scroll-vs-drag handoff that is the single hardest custom RN bottom sheet, for free.
- **Snapping carousels and paging.** `.scrollTargetBehavior(.viewAligned)` + `.scrollTargetLayout()`
  (or `.paging`) turns any `ScrollView` / `LazyHStack` into a snapping carousel; `.scrollPosition(id:)`
  reads or sets the focused item. No pan-gesture math.
- **Shared-element transitions.** `matchedGeometryEffect` and `navigationTransition(.zoom)` interpolate
  frames across a swap or a navigation push with no manual measurement.
- **Rolling numbers.** `.contentTransition(.numericText(value:))` rolls only the changed digits in the
  direction the value moved; the RN per-digit strip disappears.
- **SF Symbols as a motion system.** Thousands of symbols that animate consistently: `.symbolEffect`
  (`.bounce`, `.pulse`, `.variableColor`, `.wiggle` / `.rotate` / `.breathe`),
  `.contentTransition(.symbolEffect(.replace))`, and `.symbolRenderingMode(.hierarchical / .palette)`.
  No icon set to source, export, or hand-animate.
- **Live backdrop blur.** Materials (`.ultraThinMaterial` and friends) genuinely blur the live,
  scrolling content behind them: the RN hard case is the SwiftUI default. On **iOS 26** the system
  goes further with **Liquid Glass** (see the note in [Metal shaders](#metal-shaders-and-generative-backgrounds)).
- **Skeletons from the real view.** `.redacted(reason: .placeholder)` derives the placeholder from the
  actual view, so there is no parallel skeleton layout to keep in sync.
- **Declarative haptics.** `.sensoryFeedback(_:trigger:)` fires off the same state change your animation
  lands on, so motion and haptics stay in lockstep with one line.
- **Inline GPU.** `Shader` / `MeshGradient` via `.colorEffect` / `.layerEffect` plus
  `TimelineView(.animation)` put Metal-class backgrounds directly in the view tree with no render-target
  plumbing.
- **One codebase, every Apple platform.** The same view animates on iOS, iPadOS, macOS, visionOS,
  watchOS, and tvOS; add `.hoverEffect` / `.onHover` and you get pointer lift on iPad and Mac.

**Control tools that prevent the usual SwiftUI animation bugs:**

- `withAnimation(_:completion:)` runs a closure when the animation actually finishes. Chain or clean
  up without guessing a duration.
- `.transaction { $0.animation = nil }` overrides or disables an inherited animation on one subtree or
  property, so a single value can opt out of a parent `withAnimation`.
- `.geometryGroup()` isolates a subtree's geometry so a parent layout change animates as one unit
  instead of each child resolving on its own: the fix for glitchy nested animations.
- `Spring` is a queryable type: `Spring(duration:bounce:).position(target: 1, time: t)` (and
  `.velocity(...)`) reads the spring's state at any time, so you can drive custom motion from the same
  math the presets use.

---

## Shared foundation

Applies to every entry below.

**The model.** A change to `@State`, wrapped in `withAnimation`, drives an animation; SwiftUI figures
out which animatable properties changed and interpolates them. Prefer attaching `.animation(_:value:)`
scoped to a specific value over a broad `withAnimation` when you want only one thing to move.

**Feel tokens.** Frame these exactly as the RN catalog does: a **semantic** layer of named intents
(`press`, `enter`, `settle`…) sitting over the **primitive** SwiftUI spring presets
(`.snappy` / `.smooth` / `.bouncy`) the OS itself ships. This is not a second, competing system; it
names intents on top of the system primitives. Define them once (an `Animation` extension) and
reference the token, never an ad-hoc number; both tiers compile into the **one constants file** in
IMPLEMENT (SKILL.md step 2), the same as the RN catalog's token file.

| Token | Use | Config (primitive it resolves to) |
|---|---|---|
| `press` | Tap-down shrink feedback | `.snappy(duration: 0.12)` or `.spring(response: 0.2, dampingFraction: 0.7)` |
| `enter` | Element appears | `.smooth` or `.easeOut(duration: 0.22)` |
| `exit` | Element leaves | `.easeIn(duration: 0.15)`. K2: ~20% faster than enter |
| `settle` | Gesture release lands | `.interpolatingSpring(stiffness: 200, damping: 18)` (carries release velocity) |
| `celebrate` | Reward / success pop | `.bouncy(duration: 0.5, extraBounce: 0.2)` |
| `loop` | Pulse / attention | `.easeInOut(duration: 0.7).repeatForever(autoreverses: true)` |

The micro-interaction ceiling is ~300ms (K2). Anything the user triggers and waits on lands under
that. Loops and ambient motion may be slower because the user is not blocked. Animate render-server
properties only (K4; see below). Gate expressive effects behind `accessibilityReduceMotion` (K6).

**Motion is rationed, not sprinkled.** Most screens use one or two cheap effects; an app earns **one
signature moment** total. That budget is owned by `mobile-design` (gate D7 / EXPRESS), not here, same
as the RN catalog. This file is the *vocabulary*; the budget decides how much of it a screen gets.

**The 60fps budget is law (K4).** Animate properties that map to the render server: `opacity`,
`scaleEffect`, `rotationEffect`, `rotation3DEffect`, `offset`. Avoid animating `.frame()` width/height
or anything that forces a layout pass every frame; avoid heavy `.blur` / `.shadow` inside an
animation; do not let `body` recompute every frame. Flatten complex animated subtrees with
`.drawingGroup()` (renders via Metal). Test on a real mid-range device, never the simulator.

**Reduced motion is a deliverable (K6).** Read `@Environment(\.accessibilityReduceMotion)` and branch
expressive effects to an instant change or a plain opacity fade. Every loop and every large transform
(especially 3D) needs this branch.

~~~swift
@Environment(\.accessibilityReduceMotion) private var reduceMotion
var entrance: Animation { reduceMotion ? .easeOut(duration: 0.1) : .bouncy }
~~~

---

## Fade

**Reach for it when** an element enters, leaves, or swaps and you want the change to feel intentional
instead of popping. The safest, most universal effect, and the correct default for conditional content.

**Wrong tool when** the element also moves or resizes (combine with `.move` or `.scale` instead of a
bare fade), or when instant feedback matters more than smoothness.

**API path.** For mount/unmount, gate the view with `if` and attach `.transition(.opacity)`; the change
animates when the governing state is set inside `withAnimation`. For a value you own, animate `.opacity`.

**Feel.** `enter` for appears, `exit` for leaves.

**Spine (Swift).**
~~~swift
// Insertion / removal
if isShown {
    CardView().transition(.opacity)
}
// ... elsewhere:
withAnimation(.easeOut(duration: 0.22)) { isShown = true }
~~~
~~~swift
// Manual, when you own the trigger
@State private var opacity = 0.0
CardView()
    .opacity(opacity)
    .onAppear { withAnimation(.easeOut(duration: 0.22)) { opacity = 1 } }
~~~

**Gotchas.** A transition only fires if the view is actually inserted/removed from the tree (an
`if`/`switch`), not merely `.opacity(0)`. A true crossfade between two contents wants both stacked in a
`ZStack` with an `.asymmetric` transition or matched opacities, or use `.transition(.opacity)` on a
view whose `id` changes so SwiftUI swaps identity. The animation must be attached to the state change
(`withAnimation` or `.animation(_:value:)`) or nothing moves.

**Gate.** K6. Fade is the canonical reduced-motion fallback for every other effect.

---

## Grow

**Reach for it when** something arrives and deserves a beat of presence (a card popping in, a
confirmation badge appearing), or to add weight to an entrance by pairing scale with a fade.

**Wrong tool when** it is ambient or frequent. Growth reads as "look here," so overusing it makes
everything shout. One growing element at a time.

**API path.** `.scaleEffect` driven by state with a spring, or `.transition(.scale.combined(with:
.opacity))` on insertion. K7: scale entrances start at ~0.95, never 0.

**Feel.** `celebrate` for a reward pop, `enter` for a calm arrival.

**Spine (Swift).**
~~~swift
@State private var shown = false
CardView()
    .scaleEffect(shown ? 1 : 0.95) // K7: not 0
    .opacity(shown ? 1 : 0)
    .onAppear { withAnimation(.bouncy) { shown = true } }
~~~

**Gotchas.** Scaling type or icons past ~1.1 reveals softness because you are magnifying rasterized
pixels; scale a container, or keep grow subtle (SF Symbols and `Text` re-render crisply, raster images
do not). Never "grow" by animating `frame(width:height:)`; use `.scaleEffect`. Set a sensible `anchor`
on `scaleEffect` so it grows from the right point (`.center` by default, `.bottomLeading` for a FAB).

**Gate.** K7 (anchored entrance), K4 (transform-equivalent only).

---

## Shrink

**Reach for it when** you want tactile feedback on touch. A control that dips to ~0.96 on press-in and
springs back on release is the single highest-return premium detail in an app, and it is nearly free.

**Wrong tool when** the target is tiny (a small shrink is invisible) or non-interactive (shrinking
should signal "I am being pressed").

**API path.** The idiomatic route is a custom `ButtonStyle` reading `configuration.isPressed`. It
handles press-in/out and cancellation for you. For non-button surfaces, a `DragGesture(minimumDistance:
0)` toggling a `@State` flag. Use the `press` token.

**Feel.** `press` in both directions.

**Spine (Swift).**
~~~swift
struct PressableStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.96 : 1)
            .animation(.spring(response: 0.2, dampingFraction: 0.7), value: configuration.isPressed)
    }
}
// Button("Save") { save() }.buttonStyle(PressableStyle())
~~~

**Gotchas.** Prefer `ButtonStyle` over a hand-rolled gesture: it gives you correct hit-testing,
cancellation when the finger slides off, and accessibility for free. If you must use a gesture, use
`DragGesture(minimumDistance: 0)` (a `TapGesture` has no press-down phase, so you cannot show the dip).
Pair with a subtle opacity drop only on light surfaces; double feedback can feel heavy.

**Gate.** K3. This fires on the highest-frequency interactions, so keep it nearly free and instant;
it is the one motion a 100+/day control *should* have.

---

## Pulse

**Reach for it when** something needs passive attention the user has not acted on yet: a "new" badge, a
record button, a CTA waiting for a first tap.

**Wrong tool when** it never stops. An infinite pulse on primary content is fatiguing and burns
battery. Reserve it, and stop it once the user acknowledges.

**API path.** Two clean options. For an SF Symbol, `.symbolEffect(.pulse)` is one line and is the right
call. For an arbitrary view, a `.repeatForever(autoreverses: true)` animation toggled `onAppear`, or a
two-phase `PhaseAnimator`.

**Feel.** `loop`.

**Spine (Swift).**
~~~swift
@State private var pulsing = false
Badge()
    .scaleEffect(pulsing ? 1.08 : 1)
    .animation(.easeInOut(duration: 0.7).repeatForever(autoreverses: true), value: pulsing)
    .onAppear { pulsing = true }   // gate behind !reduceMotion (K6)
~~~
~~~swift
// SF Symbol: the whole effect, one modifier
Image(systemName: "record.circle").symbolEffect(.pulse)
~~~

**Gotchas.** A `repeatForever` animation keeps running offscreen and on a backgrounded view; stop it by
flipping the flag (or removing the modifier) when the thing is acknowledged. Always branch on
`reduceMotion` to a static state. For multi-step loops, reach for `PhaseAnimator` rather than chaining
repeats by hand.

**Gate.** K6 (a loop must have a static fallback), K3 (never on primary content the user sees constantly).

---

## Sequence

**Reach for it when** several things should resolve in order rather than all at once: a list revealing
row by row, a multi-part confirmation (check draws, label slides, panel settles), or any chained beat.

**Wrong tool when** the items are unrelated or the list is long. A 40-row stagger makes the user wait;
cap the stagger to the first handful, then show the rest instantly (K3).

**API path.** For discrete ordered steps, `PhaseAnimator` cycles a view through phases you define. For
a list reveal, give each row a `.transition` plus an `.animation` whose delay is `Double(index) * 0.05`.
For fully coordinated multi-track beats on one timeline, use `KeyframeAnimator` (see Combination craft).

**Feel.** `enter` per item, `settle` on the final landing.

**Spine (Swift).**
~~~swift
// Staggered list reveal (cap the visible stagger)
ForEach(Array(items.enumerated()), id: \.element.id) { index, item in
    Row(item: item)
        .transition(.move(edge: .bottom).combined(with: .opacity))
        .animation(.spring.delay(Double(min(index, 8)) * 0.06), value: items)
}
~~~
~~~swift
// Discrete chained beats
ReactionView()
    .phaseAnimator([0, 1.2, 1], trigger: tapped) { view, scale in
        view.scaleEffect(scale)
    } animation: { _ in .spring(duration: 0.3, bounce: 0.4) }
~~~

**Gotchas.** Keep the per-item delay small (50–70ms) and cap the index so late rows do not wait forever.
In a `LazyVStack` / `List`, delay applies to whatever renders, so on fast scroll later rows can animate
late. Gate the stagger to the first screenful. `PhaseAnimator` loops back to the first phase when
continuous; give it a `trigger` if you want it to run once and stop.

**Gate.** K2/K3. Cap the stagger so item 20 never reads as lag.

---

## Flip

**Reach for it when** one surface has two sides (front and back of a card, reveal of hidden content, a
toggle that flips state). The 3D rotation is a strong, premium reveal that still reads instantly.

**Wrong tool when** the two states are not truly "two faces of one object." If content just changes, a
[fade](#fade) or [morph](#morph) is more honest and cheaper.

**API path.** `.rotation3DEffect(.degrees(...), axis: (x: 0, y: 1, z: 0), perspective:)`. Two faces
stacked in a `ZStack`; swap each face's opacity as its angle passes 90°. SwiftUI has no
`backfaceVisibility`, so you gate visibility on the angle yourself.

**Feel.** a single spring around 0.5s, or `.easeInOut(duration: 0.45)` (a fixed choreographed move, so
a curve is correct here per K1).

**Spine (Swift).**
~~~swift
@State private var flipped = false
ZStack {
    Front().opacity(flipped ? 0 : 1)
    Back()
        .opacity(flipped ? 1 : 0)
        .rotation3DEffect(.degrees(180), axis: (x: 0, y: 1, z: 0)) // pre-flip so text reads correctly
}
.rotation3DEffect(.degrees(flipped ? 180 : 0), axis: (x: 0, y: 1, z: 0), perspective: 0.5)
.onTapGesture { withAnimation(.spring(response: 0.5, dampingFraction: 0.8)) { flipped.toggle() } }
~~~

**Gotchas.** Without a non-zero `perspective` the card looks like it squashes flat instead of rotating
in space. Because there is no backface culling, the back face must be counter-rotated 180° (or it
renders mirrored), and you must cross the two faces' opacity at the halfway angle or you briefly see
both. Heavy content on a rotating layer is expensive; keep the faces light or `.drawingGroup()` them.

**Gate.** K1 (a fixed timed move uses a curve, not a spring), K4 (rotate/opacity only).

---

## Morph

**Reach for it when** one thing becomes another and you want continuity instead of a cut: an icon
toggling, a container resizing between states, or a thumbnail expanding to full screen. Morphing says
"these states are the same object."

**Wrong tool when** the start and end are unrelated. Then a crossfade is the right call.

**API path, three tiers by ambition:**
1. **Layout / position morph.** `matchedGeometryEffect(id:in:)` links a source and destination view
   through a `@Namespace`; SwiftUI interpolates their frames so the element appears to travel and
   resize. This is the workhorse and removes almost all manual measurement. It is the K4-correct way to
   resize. Never hand-animate `frame`.
2. **Vector / icon morph (true shape change).** For SF Symbols,
   `.contentTransition(.symbolEffect(.replace))` morphs one glyph into another. For a custom shape,
   define a `Shape` and let SwiftUI interpolate the path. The modern idiom is the **`@Animatable`
   macro** (iOS 18): annotate the `Shape` `@Animatable` and SwiftUI auto-synthesizes `animatableData`
   from its stored properties, no hand-written `VectorArithmetic` plumbing. (The manual route below is
   the explanation/fallback.)
3. **Shared element across screens** is its own move, not a morph: the card→hero "grow." If the same
   element travels between two screens, go to the [Shared-element transition](#shared-element-transition-card-to-hero) entry.

**Feel.** timing 0.25–0.4s for icons; `settle` (spring) for layout.

**Spine (Swift): matched layout morph.**
~~~swift
@Namespace private var ns
if expanded {
    Detail().matchedGeometryEffect(id: "hero", in: ns)
} else {
    Thumbnail().matchedGeometryEffect(id: "hero", in: ns)
}
// withAnimation(.spring(response: 0.4, dampingFraction: 0.8)) { expanded.toggle() }
~~~
~~~swift
// Custom Shape morph, modern idiom: the @Animatable macro synthesizes animatableData
@Animatable
struct Wedge: Shape {
    var progress: CGFloat        // interpolated automatically
    func path(in rect: CGRect) -> Path { /* build from progress */ Path() }
}
// Manual fallback (pre-macro / non-trivial cases): implement
//   var animatableData: CGFloat { get { progress } set { progress = newValue } }
// where animatableData is a continuous VectorArithmetic value.
~~~

**Gotchas.** A `matchedGeometryEffect` group must have exactly one source (`isSource: true`) inserted
at a time, or results are undefined. Custom `Shape` interpolation only works if the animated value is a
continuous `VectorArithmetic` (which `@Animatable` derives for you); morphing between structurally
different paths still needs hand-authored point-compatible shapes. For layout morph, do not also
hand-animate `frame` on the same view.

**Gate.** K4 (matched geometry replaces hand-animated frame), K1 (ease-in-out for an on-screen shape change).

---

## Shared-element transition (card to hero)

**Reach for it when** the *same element* should appear continuous across a navigation: a list photo card that becomes the detail hero, a thumbnail that opens into a full image. The element travels and resizes between two screens. People call this "morph" or "grow"; it is neither. Disambiguate via the "Name the effect" table in `effects-catalog.md`.

**Wrong tool when** the two things are not the same element (a page [Spatial transition](#spatial-transitions-fly-dont-teleport)), or it is a shape morph in place ([Morph](#morph)) or an in-place scale ([Grow](#grow)).

**API path (native makes this nearly free):**
1. **`navigationTransition(.zoom(sourceID:in:))`** (iOS 18) + `matchedTransitionSource(id:in:)` on the source: the system zoom transition between pushed views. The modern default for card→hero across a navigation.
2. **`matchedGeometryEffect(id:in:)`** across a conditional swap in one view (no navigation): an in-place expand (thumbnail → full).

**Feel.** A **curve / critically-damped move, not a bouncy spring** (K1): a fixed A→B travel; the system zoom is already tuned this way. Keep it under the page-transition ceiling. (Per the "Choose the motion type" rule in `effects-catalog.md`.)

**Spine (Swift).**
~~~swift
// iOS 18 zoom transition between screens
@Namespace private var ns
NavigationLink {
    Detail().navigationTransition(.zoom(sourceID: item.id, in: ns))
} label: {
    Card(item).matchedTransitionSource(id: item.id, in: ns)
}

// In-place expand (no navigation): one namespace, conditional swap
if expanded { Hero().matchedGeometryEffect(id: "photo", in: ns) }
else        { Card().matchedGeometryEffect(id: "photo", in: ns) }
// withAnimation(.smooth) { expanded.toggle() }   // low-bounce, curve-like
~~~

**Gotchas.** Exactly one `matchedGeometryEffect` source (`isSource: true`) at a time. The zoom transition needs `sourceID` to match a `matchedTransitionSource` of the same id. Reduced motion: a cross-fade, no travel (K6). (On React Native this is measured-rect work (see `effects-catalog.md`); on SwiftUI it is one modifier, which is the kind of thing the native-feel lens is calibrated against.)

**Gate.** K1 (curve for a fixed move), K4 (matched geometry, not hand-animated frame), K6.

## Icon and SF Symbol animation

**Reach for it when** an icon should animate: toggle between two states, bounce on action, trace itself
on, or shift fill/stroke with state. SwiftUI's first-class path is **SF Symbols + symbol effects**,
distinct from the custom-`Shape` route in [Morph](#morph).

**Wrong tool when** a plain `.scaleEffect` / `.opacity` on a static icon would do, or when the "icon"
is really a Lottie / After Effects export (SwiftUI has no native Lottie; use the `lottie-ios` package).

**API path.** SF Symbols animate with `.symbolEffect(...)`: `.bounce` (discrete), `.pulse` and
`.variableColor` (indefinite), `.scale`, plus `.appear` / `.disappear` transitions and `.replace`
content transitions. For a **custom vector** (no SF Symbol): define a `Shape`, and for a **draw-on**
trace use `.trim(from:to:)` animated from 0→1: the clean SwiftUI equivalent of RN's `strokeDashoffset`.
**There is no native SVG loader**; convert SVG art to a `Shape`/`Path` (or asset-catalog vector) or use
a third-party SVG library.

**Feel.** symbol effects use their own tuned timing; draw-on reads well at 0.4–0.8s ease-out; a custom
shape morph at 0.25–0.4s.

**Spine (Swift).**
~~~swift
// Built-in, one line each
Image(systemName: "bell.fill").symbolEffect(.bounce, value: tapCount)
Image(systemName: isOn ? "wifi" : "wifi.slash").contentTransition(.symbolEffect(.replace))
~~~
~~~swift
// Draw-on trace for a custom shape (strokeDashoffset equivalent)
@State private var progress: CGFloat = 0
Checkmark()
    .trim(from: 0, to: progress)
    .stroke(.white, style: StrokeStyle(lineWidth: 3, lineCap: .round, lineJoin: .round))
    .onAppear { withAnimation(.easeOut(duration: 0.5)) { progress = 1 } }
~~~

**Gotchas.** Symbol effects only apply to `Image(systemName:)` (and custom symbols compiled into the
symbol format), not arbitrary views. For those, fall back to `.scaleEffect` / `.opacity` / a custom
`Shape`. `.trim` works on any `Shape`; for a multi-subpath glyph the trim runs across all subpaths in
path order, which can look odd, so trace single-stroke shapes. True `d`-string morphing between two
arbitrary exported icons is not something SwiftUI does for you. Author point-compatible `Shape`s
(`@Animatable`) or pre-bake the frames.

**Gate.** K4 (favor symbol effects / transform / `.trim` over hand-wired path morph where possible).

---

## Flick

**Reach for it when** a single-finger throw should carry momentum: swipe-to-dismiss a card or sheet,
fling a panel away, flick through a stack.

**Wrong tool when** precision matters more than momentum (use a tracked drag that snaps), or when an
accidental flick would destroy data without undo.

**API path.** `DragGesture` tracking `translation` in `.onChanged`; on `.onEnded` read `value.velocity`
and `value.predictedEndTranslation` to decide dismiss vs spring-back, then animate with
`.interpolatingSpring` so the release velocity carries through. This is the core K8 pattern.

**Feel.** `settle` for the spring-back; feed `value.velocity` into `initialVelocity`.

**Spine (Swift).**
~~~swift
@State private var offset: CGFloat = 0
// Read the container width from a GeometryReader / containerRelativeFrame rather than
// UIScreen.main.bounds (soft-deprecated, and wrong on iPad multitasking / Stage Manager).
GeometryReader { proxy in
    let width = proxy.size.width
    let flick = DragGesture()
        .onChanged { offset = $0.translation.width }
        .onEnded { value in
            let predicted = value.predictedEndTranslation.width
            if abs(predicted) > width * 0.4 || abs(value.velocity.width) > 800 {
                withAnimation(.interpolatingSpring(stiffness: 200, damping: 26,
                                                   initialVelocity: value.velocity.width / 100)) {
                    offset = predicted > 0 ? width : -width
                }
                onDismiss()
            } else {
                withAnimation(.interpolatingSpring(stiffness: 200, damping: 18,
                                                   initialVelocity: value.velocity.width / 100)) {
                    offset = 0
                }
            }
        }
    CardView().offset(x: offset).gesture(flick)
}
~~~

**Gotchas.** Decide dismiss from velocity OR predicted distance, not raw distance alone, so a fast short
flick still works. `predictedEndTranslation` is SwiftUI's built-in momentum projection and is the
clean way to choose a landing target. Feed the release velocity into
`.interpolatingSpring(initialVelocity:)` or the motion hits a wall (note the unit-matching: divide the
pixels/sec velocity into the spring's value space). For list rows, `.swipeActions` is the built-in path
and should be preferred when it fits.

**Gate.** K8: interruptible, velocity-preserving by construction.

---

## Scroll-driven motion

**Reach for it when** the screen scrolls and the chrome should respond: a collapsing or parallax
header, items that scale in as they enter, a title that docks, a CTA past a threshold.

**Wrong tool when** the reaction should be discrete (cross a threshold, then run a normal state
animation) or when you are about to animate layout every frame.

**API path.** For per-item entrance/exit as views move through the viewport, `.scrollTransition` gives
you a `phase` to drive `opacity` / `scaleEffect` / `offset`. For geometry-driven chrome (a collapsing
header), read offset with `visualEffect { content, proxy in ... }` (no `GeometryReader` plumbing) or
`onScrollGeometryChange` (iOS 18).

**Feel.** No token here. The finger is the clock. Keep outputs subtle and clamped.

**Spine (Swift).**
~~~swift
ScrollView {
    ForEach(items) { item in
        Card(item: item)
            .scrollTransition { content, phase in
                content
                    .opacity(phase.isIdentity ? 1 : 0.4)
                    .scaleEffect(phase.isIdentity ? 1 : 0.92)
            }
    }
}
~~~
~~~swift
// Geometry-driven header collapse, no GeometryReader
Header().visualEffect { content, proxy in
    let y = proxy.frame(in: .scrollView).minY
    return content.offset(y: max(-52, y)).opacity(y < -120 ? 0.6 : 1)
}
~~~

**Gotchas.** Prefer `transform`/`opacity` over animating header `frame(height:)`; resizing the header
re-runs layout every frame and is the classic scroll-jank cause (K4). `.scrollTransition` closures
return a `VisualEffect`, not a `View`. You can only apply visual-effect modifiers there, not insert
subviews. Clamp outputs so over-scroll does not push values past their range.

**Gate.** K4 (visual-effect transform on an absolute layer, never per-frame height).

---

## Color and state transition

**Reach for it when** a non-transform property should change smoothly: theme switch, selected vs
unselected, valid vs error, a progress fill.

**Wrong tool when** you would be animating many large colored surfaces at once, or using color as a
stand-in for motion that should also move.

**API path.** SwiftUI animates `Color` interpolation automatically. Just change the color inside
`withAnimation` (or `.animation(_:value:)`). Use `.foregroundStyle`, `.background`, `.tint`, or `.fill`.
For animating the *paths* of text (color and weight) rather than crossfading,
`.contentTransition(.interpolate)`.

**Feel.** `enter` / `exit` timings; keep it at or above 0.2s so the hue shift stays legible.

**Spine (Swift).**
~~~swift
@State private var active = false
Capsule()
    .fill(active ? Color.accentColor : Color(.systemGray5))
    .onTapGesture { withAnimation(.easeInOut(duration: 0.2)) { active.toggle() } }
~~~

**Gotchas.** A few color types do not interpolate cleanly (some semantic / hierarchical styles); if a
color "snaps" instead of fading, drive it from an explicit `Color` value. Color is not a transform, so
use it deliberately, not on dozens of views. For a full theme swap, the durable pattern is a
snapshot-and-crossfade rather than animating every descendant color at once.

**Gate.** K1 (ease for color/selection, not a spring).

---

## Gesture composition and interruptibility

**Reach for it when** more than one gesture lives on an element (tap plus drag, drag plus magnify,
single vs double tap), or when an in-flight animation must survive a new touch. This is the mechanism
behind the **K8 interruptible-by-default** law.

**Wrong tool when** a single gesture covers it. Do not compose for its own sake.

**API path.** `SimultaneousGesture`, `ExclusiveGesture`, and `SequenceGesture` (or the
`.simultaneousGesture` / `.highPriorityGesture` modifiers) combine gestures. Interruptibility: SwiftUI
animations are interruptible by default, and `.interpolatingSpring` preserves velocity, so retargeting
a `@State` value mid-animation continues smoothly from the current value.

**Feel.** `settle` for the catch; the spring carries the in-flight velocity.

**Spine (Swift).**
~~~swift
let drag = DragGesture().onChanged { offset = $0.translation }
let magnify = MagnifyGesture().onChanged { scale = $0.magnification }
Thumbnail()
    .gesture(SimultaneousGesture(drag, magnify))
// A tap mid-fling just retargets the value; the spring picks up the current velocity:
    .onTapGesture { withAnimation(.interpolatingSpring(stiffness: 200, damping: 18)) { scale = 1 } }
~~~

**Gotchas.** Use `SimultaneousGesture` when both should fire, `ExclusiveGesture` when only one should
win, `.highPriorityGesture` to beat a child's gesture. Do not gate animations behind an `isAnimating`
boolean. That defeats interruptibility. The hardest case is a gesture competing with a `ScrollView`
for the same touch; the system sheet (`presentationDetents`) solves the most common version for you.

**Gate.** K8.

---

## Morphing toolbar (scroll-aware action bar)

**Reach for it when** you want a compact floating bar that appears at certain scroll positions and
whose icons expand to reveal a label when active: the "pill that grows a word." It does three jobs:
appear/disappear on scroll, slide a selection indicator, and expand from icon to icon-plus-label.

**Wrong tool when** the bar is always present and static (that is a normal `TabView`), or when labels
are essential and should always show.

**API path.** Three composable pieces:
- *Appear on scroll*: drive the bar's `offset`/`opacity` from scroll geometry (`visualEffect` /
  `onScrollGeometryChange`) with a threshold.
- *Sliding indicator*: a single backing capsule moved with `matchedGeometryEffect(id:in:)` to the
  active item (no manual width measurement, which is the big win over RN).
- *Icon to label expand*: reveal the label conditionally with a `.transition`, and the surrounding
  `HStack` reflows automatically.

**Feel.** `settle` spring for the indicator and the width morph; `enter` for the bar appearing.

**Spine (Swift).**
~~~swift
@Namespace private var ns
HStack(spacing: 8) {
    ForEach(tabs) { tab in
        HStack {
            Image(systemName: tab.icon)
            if tab == selected {
                Text(tab.label).transition(.opacity.combined(with: .move(edge: .leading)))
            }
        }
        .padding(.horizontal, 12).frame(minWidth: 44, minHeight: 44)  // tap target ≥ 44pt
        .background {
            if tab == selected {
                Capsule().fill(.tint).matchedGeometryEffect(id: "indicator", in: ns)
            }
        }
        .onTapGesture { withAnimation(.spring(response: 0.35, dampingFraction: 0.8)) { selected = tab } }
    }
}
~~~

**Gotchas.** Let the `HStack` reflow instead of hardcoding item widths. `matchedGeometryEffect` plus
the conditional label does the measurement for you. Keep the collapsed tap target at least 44pt even
when it shows only an icon. If the bar hides on scroll, debounce direction changes so it does not
flicker on tiny scroll jitters. (On iOS 26 the system toolbar gains its own Liquid Glass morphing
behaviors; this hand-rolled version is the portable baseline. Prefer the system toolbar where it fits.)

**Gate.** K8 (indicator spring carries velocity), K4 (matched geometry, not hand-animated width).

---

## Spatial transitions (fly, don't teleport)

Core idea: a fluid interface is like moving through water: you float rather than teleport. Static cuts
are fast but can leave users disoriented; applied thoughtfully, directional motion feels just as fast
while adding clarity and a sense of space.

**Reach for it when** moving between screens, tabs, or states where preserving the user's sense of
place matters. Three concrete moves:
- *Directional tab/page motion.* Carry the direction of travel: a tab to the left slides content in
  from the left. Use an `.asymmetric` `.move(edge:)` transition whose edge flips with the index delta.
- *Shared-element continuity.* When a thing on one screen becomes a thing on the next, link them:
  `matchedTransitionSource(id:in:)` on the source plus `navigationTransition(.zoom(sourceID:in:))` on
  the destination (iOS 18). Otherwise a `matchedGeometryEffect` across the swap.
- *Label and content morphing.* When only part of the content changes (Continue → Confirm), morph the
  changed part with `.contentTransition(.interpolate)` or `.numericText` and hold the rest constant.

**Wrong tool when** the two states have no spatial relationship (a true context switch should cut), or
when motion would slow a high-frequency action (K3). Speed still wins.

**API path.** Direction: a custom `.transition(.asymmetric(insertion:removal:))` driven off the
navigation index, or `TabView`'s page style. Shared element: `navigationTransition(.zoom)` +
`matchedTransitionSource` (iOS 18) or a measured-rect approach. Label morph: `contentTransition`.

**Feel.** `enter` for the incoming view; a smaller, faster shift for the outgoing one. Keep the whole
transition under the 300ms ceiling (K2).

**Spine (Swift).**
~~~swift
// Shared-element zoom between a grid cell and its detail (iOS 18)
@Namespace private var ns
// Source (in the grid):
Thumbnail().matchedTransitionSource(id: item.id, in: ns)
// Destination (pushed view):
DetailView(item: item).navigationTransition(.zoom(sourceID: item.id, in: ns))
~~~
~~~swift
// Directional screen transition: edge follows travel direction
let edge: Edge = toIndex > fromIndex ? .trailing : .leading
Incoming().transition(.asymmetric(
    insertion: .move(edge: edge).combined(with: .opacity),
    removal: .opacity))
~~~

**Gotchas.** Be consistent: the same navigation action must always move the same direction, or the
spatial model breaks. Keep the outgoing shift small (a hint, not a full slide) so it reads as depth,
not a carousel. Only link an element when a real spatial relationship exists. Always honor reduced
motion with an instant or fade fallback (the system's own "prefer cross-fade" setting is the cue).

**Gate.** K2 (under 300ms), K6, K7 (incoming anchored to direction of travel).

---

## Metal shaders and generative backgrounds

**Reach for it when** you want an ambient surface plain views cannot produce: an animated gradient
wash, a mesh-gradient bloom, procedural noise or grain, a holographic or aurora sheen, soft generative
motion behind a hero or paywall, or a custom distortion. SwiftUI's GPU tier, deliberately separate from
the declarative effects above.

**Wrong tool when** a `LinearGradient` / `MeshGradient` or a static image already gets you there, the
screen is text-heavy (shaders draw pixels, not accessible text), or you only need a transform/opacity
move. Shaders are the most expensive, least accessible tool in the kit. Spend them on signature surfaces.

**API path, easy to hard:**
1. *Gradients and mesh, no shader code.* `LinearGradient` / `RadialGradient` / `AngularGradient`, or
   **`MeshGradient`** (iOS 18) for multi-point blooms. Animate by interpolating the control points or
   colors over time. Covers most premium-background asks with zero Metal.
2. *Backdrop blur / glass.* `.background(.ultraThinMaterial)` (and the other Materials) genuinely blur
   the live content behind them, including scrolling lists: the single biggest advantage over the RN
   story. **Liquid Glass (iOS 26):** the system glass material (`.glassEffect`, glass-backed toolbars
   and sheets) is **chrome, not content**. Use it on nav bars, toolbars, sheets, and floating controls,
   never as a fill behind body copy or a data surface. It pairs with the platform-fit rules below; do
   not overbuild it or scatter it across content layers.
3. *Custom Metal shader.* Write a `[[ stitchable ]]` function in a `.metal` file, reference it through
   `ShaderLibrary`, and attach it with `.colorEffect` (recolor each pixel), `.distortionEffect` (move
   each pixel), or `.layerEffect` (sample the rendered layer). Port GLSL to Metal Shading Language with
   minor syntax changes.

**Animating a shader (the part people get wrong).** There is no implicit time uniform. Wrap the view in
`TimelineView(.animation)` and pass `context.date` (as an elapsed `Float`) into the shader as a
parameter (the SwiftUI equivalent of RN's `useClock`); it updates without re-evaluating your `body`
logic every frame.

**Feel.** Ambient backgrounds want slow, non-obvious motion: drift the time or a mesh point over many
seconds, not a tight loop. Tie intensity to scroll or device motion for surfaces that feel alive.
Always honor reduced motion by falling back to a static gradient or a frozen frame (K6).

**Spine (Swift).**
~~~swift
// Animated custom shader background
TimelineView(.animation) { context in
    let t = Float(context.date.timeIntervalSince1970.truncatingRemainder(dividingBy: 1000))
    Rectangle()
        .colorEffect(ShaderLibrary.aurora(.float2(size), .float(t)))
}
~~~
~~~c++
// Shaders.metal
#include <metal_stdlib>
using namespace metal;

[[ stitchable ]] half4 aurora(float2 pos, half4 color, float2 size, float time) {
    float2 uv = pos / size;
    float wave = 0.5 + 0.5 * sin(time + uv.x * 6.0);
    return half4(uv.x, uv.y, wave, 1.0);
}
~~~
~~~swift
// Animated MeshGradient bloom, no Metal at all
TimelineView(.animation) { ctx in
    let t = ctx.date.timeIntervalSince1970
    MeshGradient(width: 3, height: 3, points: meshPoints(at: t), colors: palette)
        .ignoresSafeArea()
}
~~~

**Gotchas.**
- *Cost.* Shaders and `TimelineView(.animation)` run every frame on the GPU/main thread. One full-screen
  shader behind a hero is fine; stacking several, or running one behind a scrolling list, drains battery
  and drops frames on mid-range devices. Profile on a real low-end device.
- *`layerEffect` limits.* Views backed by UIKit/AppKit (some text/media) may not render into a filtered
  layer and will log a warning and show a placeholder. Keep shader targets to drawn SwiftUI content.
- *MSL is not GLSL.* `[[ stitchable ]]` signatures are fixed by the effect kind (`colorEffect` gets
  `(float2 position, half4 color, ...)`); ported ShaderToy code needs the signature and coordinate
  space adapted.
- *Density.* Shader inputs are in pixel space; pass the real size and account for `@2x`/`@3x` so effects
  do not look soft on high-DPI screens.
- *Text belongs in SwiftUI*, not a shader, for readability and accessibility. Lay the effect as a
  background and put real views on top.

**Gate.** K6 (static frame, not a slower shader), K4 (per-frame work stays on the GPU via `TimelineView`,
not a `body` recompute).

---

## Combination craft (SwiftUI compilation)

The expensive-feeling moments are almost never one big effect. They are several cheap effects resolving
**together** on one timeline. **These laws are stack-independent and owned by `effects-catalog.md`:** the
one-clock orchestration *model*, the choreography gates, the **COMBO SPEC** grammar, the motion budget
(one signature moment per app, owned by `mobile-design` D7 / EXPRESS), and the tuning-harness concept.
This section does **not** re-teach them. Read them there. What follows is only their **SwiftUI
realization**.

**The one-clock orchestrator in SwiftUI.** `KeyframeAnimator` is the native "one clock, many tracks":
define a struct of properties and give each its own keyframe track (own timing and curve), all scrubbed
from one timeline. Use `SpringKeyframe` / `CubicKeyframe` / `LinearKeyframe` per track so layers feel
composed, not mechanical. `PhaseAnimator` is the discrete-phase variant (anticipation → release beats).
For the COMBO SPEC's `overlap` semantics, a single `progress` 0→1 value with per-property sub-ranges is
the closest analogue to the RN `interpolate`-over-sub-ranges pattern.

~~~swift
struct Beat { var scale = 0.96; var opacity = 0.0; var y = 12.0 }

CardView()
    .keyframeAnimator(initialValue: Beat(), trigger: revealed) { view, b in
        view.scaleEffect(b.scale).opacity(b.opacity).offset(y: b.y)
    } keyframes: { _ in
        KeyframeTrack(\.opacity) { LinearKeyframe(1, duration: 0.3) }
        KeyframeTrack(\.scale)   { SpringKeyframe(1, duration: 0.5, spring: .bouncy) }
        KeyframeTrack(\.y)       { CubicKeyframe(0, duration: 0.45) }
    }
~~~
~~~swift
// Single-value alternative: one progress, per-property sub-ranges (overlap lives in the ranges)
func lerp(_ p: Double, _ a: Double, _ b: Double, in r: ClosedRange<Double>) -> Double {
    let t = min(max((p - r.lowerBound) / (r.upperBound - r.lowerBound), 0), 1)
    return a + (b - a) * t
}
// outgoing fades over [0, 0.5]; incoming grows+fades over [0.3, 1]; they overlap in the middle
~~~

**Compiling a COMBO SPEC (grammar owned by `effects-catalog.md`).** `with` and `overlap` beats share one
clock and read sub-ranges; `after` beats chain via a `KeyframeAnimator` track that starts later or a
`PhaseAnimator`. For the canonical worked example ("the bottom sheet flies up, and as it is arriving the
large pill morphs into a smaller one"), drive the pill morph off the sheet's progress crossing ~60%:

~~~swift
@State private var sheetProgress: Double = 0 // 0 docked ... 1 fully up
Pill().scaleEffect(lerp(min(max((sheetProgress - 0.6) / 0.4, 0), 1), 1, 0.72, in: 0...1))
// withAnimation(.spring(response: 0.45, dampingFraction: 0.85)) { sheetProgress = 1 }
~~~

Keep a combo to a few beats; every combo gets one clock and a reduced-motion collapse (K6). The
choreography gates (one clock, overlap-don't-queue, vary the curve per layer, lead-with-motion /
finish-with-settle, one hero per moment, preserve volume, interruptible together, reduced-motion
collapse) live in `effects-catalog.md`. Score against them there. In SwiftUI, "interruptible together"
means `.interpolatingSpring` so velocity carries when a tap retargets the one source.

**Tuning harness (SwiftUI realization).** The tuning-loop *concept* (implement from defaults → tune on
device → export tuned numbers back into tokens/spec/code) is owned by `references/tuning.md` (which also
ships the bundled RN `MotionTuner`). In SwiftUI
there is no third-party "Leva" needed: gate a control panel behind `#if DEBUG` with `Slider`s bound to
the same `@State`/config the animation reads (spring `response` / `dampingFraction`, durations, easing,
interpolation ranges, COMBO SPEC overlap percentages). Because SwiftUI is declarative, a `Slider` bound
to the state *is* the live binding. No bridging. In Xcode, a Preview with `@Previewable @State` plus
`let _ = Self._printChanges()` in `body` is the fastest loop; keep the panel out of the shipped bundle.

~~~swift
#if DEBUG
@Previewable @State var response = 0.4
@Previewable @State var damping  = 0.85
VStack {
    AnimatedThing(response: response, damping: damping)
    Slider(value: $response, in: 0.1...0.8)  // export the tuned numbers back into the feel-token file
    Slider(value: $damping,  in: 0.4...1.0)
}
#endif
~~~

---

## Components that are mostly motion

Some "components" are really just choreography, and both below are where SwiftUI hands you what RN
makes you build.

**Bottom sheet.** Use a `.sheet` with `.presentationDetents([.medium, .large])`; the system gives you
the drag, the snap, the grabber (`.presentationDragIndicator(.visible)`), and (critically) the
**scroll handoff for free**: a `ScrollView` inside the sheet scrolls when expanded and drags the sheet
when at the top, with no `SimultaneousGesture` plumbing. Tune with `.presentationBackgroundInteraction`,
`.presentationCornerRadius`, and custom `.fraction`/`.height` detents. Only build from scratch (an
`offset` value + snap points + drag) when you need behavior the system sheet cannot express.

**Drag-to-reorder lists.** A `List` with `.onMove(perform:)` gives reordering in edit mode for free;
`ForEach` + `.onMove` works inside a custom `List`. For drag-and-drop across containers, `.draggable` /
`.dropDestination`. Reach for a custom `matchedGeometryEffect` reorder only when you need full control
over the motion.

## Loading and perceived performance

Motion's other half is the waiting. Getting it right makes the app feel faster than it is.

- **Skeletons.** `.redacted(reason: .placeholder)` turns a real view into a placeholder shape sized to
  the actual content (no separate skeleton layout to maintain). Add a shimmer by sweeping a gradient
  `.mask` across it.
- **Skeleton to content.** Cross-fade rather than pop: swap the redacted view for the real one inside
  `withAnimation`, or let layout settle as data fills in.
- **Optimistic UI.** Update `@State` the instant the user acts, reconcile when the server responds,
  animate back on failure. Do not make the user watch a spinner for something you can show immediately.
- **Empty states.** `ContentUnavailableView` is the system component for empty/error states; give it a
  small entrance rather than a bare static screen.

## Haptics

Touch feedback paired with motion is the single highest-return detail that is almost always missing.

**API path.** `.sensoryFeedback(_:trigger:)` is the declarative way: `.impact` (with weight/flexibility)
for landings and presses, `.selection` for pickers and toggles, `.success` / `.warning` / `.error` for
outcomes. It fires when the trigger value changes, so wire it to the same state your animation lands on.
For fully custom patterns, drop to Core Haptics.

~~~swift
@State private var didSucceed = false
SuccessView().sensoryFeedback(.success, trigger: didSucceed)
// set didSucceed = true at the moment the animation settles
~~~

**Rules.** Match the haptic to the moment, never per frame or per scroll tick. `.selection` for value
changes, `.impact` for things that land, `.success`/`.error` for outcomes. The Taptic engine is silently
a no-op in Low Power Mode and during camera/dictation, so never convey required information by haptics
alone. Debounce rapid triggers. Haptics stay on under reduced motion.

## Platform feel

The catalog is platform-agnostic in intent, but SwiftUI runs across iOS, iPadOS, macOS, and visionOS, so
the kit takes a stance. The default is **match the system**: use the spring presets
(`.smooth` / `.snappy` / `.bouncy`) the OS itself uses, SF Symbols with `symbolEffect`, Materials (and
Liquid Glass on iOS 26) for depth, and Dynamic Type for text. These read as native because they *are*
the system vocabulary. If you target macOS, add hover affordances (`.onHover`) and respect the pointer;
on visionOS, prefer subtle depth over large 2D transforms (hover/gaze states matter). Keep expensive
surfaces (heavy blur, big shadows) out of per-frame animation. Decide one look vs platform-faithful up
front.

## Verifying 60fps

"Test on a real device" needs a method. SwiftUI's split is the **main thread** (`body` re-evaluation and
view-tree reconciliation) and the **render server** (Core Animation interpolating committed animations).
A committed animation can stay smooth even while the main thread is busy, but a main thread that
re-evaluates `body` every frame kills touch responsiveness and list scrolling. Use the Instruments
**Animation Hitches** template and the **SwiftUI** instrument (it counts view-body evaluations) to find
the cost; drop `let _ = Self._printChanges()` into a `body` to see *why* it is re-evaluating. On
ProMotion devices the target is 120fps, so the per-frame budget is tighter (~8ms). Profile on a real
mid-range device, never the simulator.

## Accessibility beyond reduced motion

`accessibilityReduceMotion` (K6) is necessary but not sufficient. Motion that carries meaning (an error
shake, a success pop) needs a non-motion equivalent in text, icon, or color, so state is never conveyed
by movement alone. Honor `accessibilityReduceTransparency` for Material / glass / blur-based effects
(fall back to a solid background). Respect Dynamic Type. Never animate a fixed-height container that
clips scaled text. Large transforms and autoplaying loops can fight VoiceOver focus order, so keep
essential state out of motion-only signals.

---

## AUDIT checklist

The per-effect hooks for REVIEW mode. Each maps to a gate; cite the gate by ID in the review table
(SKILL.md REVIEW format).

- Only render-server-friendly properties are animated (`opacity`, `scaleEffect`, `rotationEffect`,
  `rotation3DEffect`, `offset`); no `frame` width/height animated by hand. **(K4)** Exceptions:
  `matchedGeometryEffect` for resize, and the [morphing toolbar](#morphing-toolbar-scroll-aware-action-bar).
- `body` does not re-evaluate every frame during an animation (verified with `Self._printChanges()` / the
  SwiftUI instrument).
- Every gesture-launched animation is interruptible and feeds release velocity into
  `.interpolatingSpring(initialVelocity:)`. **(K8)**
- No more than a couple of things animate at once on a screen. **(K3)**
- Every loop and large transform (especially 3D) has a `reduceMotion` fallback; combos collapse to one
  fade. **(K6)**
- Micro-interactions land under ~300ms; durations come from feel tokens, not ad-hoc numbers. **(K2)**
- Press feedback uses a `ButtonStyle` (`configuration.isPressed`) rather than a hand-rolled tap where a
  button fits. **(K3)**
- Verified on a real device with Instruments (Animation Hitches), not just the simulator; ProMotion
  budget considered.
- Scroll-linked motion uses `scrollTransition` / `visualEffect` on transform and opacity, not animated
  `frame(height:)` per frame. **(K4)**
- Combinations run off one clock (`KeyframeAnimator`, one value, or the gesture), and reduced motion
  collapses them to a single fade or instant change. **(K6, K8)**
- Premium moments that land are paired with `.sensoryFeedback` matched to the moment, never one per frame.
- Platform feel is a decision (system-matching by default); Materials / Liquid Glass respect
  `accessibilityReduceTransparency`.
- Color and state transitions change a `Color` inside `withAnimation` (or `.contentTransition(.interpolate)`),
  and snapping colors are driven from explicit values. **(K1)**
- State that matters is never conveyed by motion alone; there is a text, icon, or color equivalent.
- Navigation transitions carry direction consistently and fall back to instant or fade under reduced
  motion. **(K6, K7)**
- A morphing toolbar's indicator uses `matchedGeometryEffect` (not hardcoded widths) and tap targets stay
  at least 44pt when collapsed.
- Shared-element transitions use `matchedTransitionSource` + `navigationTransition(.zoom)` (or matched
  geometry) only where a real spatial relationship exists.
- Custom shapes/icons animate via `@Animatable` `Shape` (or manual `animatableData`) / `.trim`; SF
  Symbols use `symbolEffect` / `.contentTransition(.symbolEffect(.replace))` rather than hand-wired paths.
- Shader backgrounds are reserved for signature surfaces, profiled on a low-end device, run their clock
  through `TimelineView(.animation)`, and collapse to a static gradient under reduced motion. **(K4, K6)**
- Liquid Glass is used as chrome (nav/toolbar/sheet/floating controls), never as a fill behind body copy
  or a data surface.

---

## Library cheat-sheet

| Need | Tool |
|---|---|
| Scale, opacity, rotate, offset | State + `.scaleEffect` / `.opacity` / `.rotationEffect` / `.offset` inside `withAnimation` (or `.animation(_:value:)`) |
| Chained / multi-step beats | `PhaseAnimator` (discrete phases) or `KeyframeAnimator` (multi-track) |
| Staggered list reveal | `.transition` + `.animation(...delay(index * n))` per row, capped |
| Mount / unmount transitions | `if`/`switch` + `.transition(.opacity / .scale / .move)` |
| Container resize / position morph | `matchedGeometryEffect(id:in:)` with a `@Namespace` |
| Gestures + velocity | `DragGesture` + `value.velocity` / `predictedEndTranslation` + `.interpolatingSpring` |
| Press feedback | Custom `ButtonStyle` reading `configuration.isPressed` |
| Icon shape morph | `.contentTransition(.symbolEffect(.replace))` (SF Symbols) or `@Animatable` custom `Shape` |
| Icon animate (bounce, pulse, draw-on) | `.symbolEffect(.bounce / .pulse / .variableColor)`; `.trim(from:to:)` for draw-on |
| Element across screens | `matchedTransitionSource` + `navigationTransition(.zoom)` (iOS 18), or matched geometry |
| Scroll-linked motion | `.scrollTransition`; `visualEffect` / `onScrollGeometryChange` for chrome |
| Color / theme / state | Change a `Color` inside `withAnimation`; `.contentTransition(.interpolate)` for text paths |
| Multiple gestures on one element | `SimultaneousGesture` / `ExclusiveGesture` / `.highPriorityGesture` |
| Snapping carousel / paging | `ScrollView` + `.scrollTargetBehavior(.viewAligned / .paging)` + `.scrollTargetLayout()` + `.scrollPosition(id:)` |
| Bottom sheet (with scroll handoff) | `.sheet` + `.presentationDetents` (handoff is free) |
| Drag-to-reorder | `List` + `.onMove`, or `.draggable` / `.dropDestination` |
| Rolling numbers | `.contentTransition(.numericText(value:))` + `.monospacedDigit()` |
| Loading state | `.redacted(reason: .placeholder)` + shimmer mask; `ContentUnavailableView` for empty |
| Touch feedback | `.sensoryFeedback(_:trigger:)` |
| Animated gradient / mesh background | `MeshGradient` (iOS 18) or gradients animated via `TimelineView(.animation)` |
| Custom shader background (aurora, holographic) | `[[ stitchable ]]` Metal + `.colorEffect` / `.distortionEffect` / `.layerEffect`, time via `TimelineView` |
| Backdrop blur over scrolling content | `.background(.ultraThinMaterial)` (Materials blur live content: free); Liquid Glass for chrome (iOS 26) |
| Read container size | `GeometryReader` / `containerRelativeFrame` (not `UIScreen.main.bounds`) |
