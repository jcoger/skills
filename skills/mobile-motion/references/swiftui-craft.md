# swiftui-craft.md: the native-feel lens

This kit ships React Native / Expo. So why a SwiftUI file?

Because **SwiftUI is the reference for how motion should FEEL on iOS.** Apple's frameworks are spring-first and interruptible by default; that default is what users have been trained to read as "native." When you write a Reanimated spring, you are trying to reproduce a feel that SwiftUI gives you for free. This file is the lens: read it to decide what the target feel IS, then go implement it in react-native-craft.md.

You will rarely emit Swift from this kit. You will constantly borrow its mental model. The gates K1 to K8 still apply; this file maps them to the native APIs so you know what "right" looks like before you reproduce it.

## The core insight to carry across

SwiftUI is spring-first where CSS is curve-first. Every SwiftUI animation is interruptible and velocity-preserving by default. That is K8 for free. When your React Native motion feels "off" or "not native," the usual cause is that you reached for a curve (`withTiming`) where iOS would have used a spring. The fix is almost always: name the SwiftUI preset you actually want, then translate it to a Reanimated spring (spring-physics.md has the table).

## Defaults (the feel targets)

| Preset | Use | Feel | RN equivalent |
|---|---|---|---|
| `.snappy(duration: 0.25)` | General-purpose UI, the `ease-out 200ms` equivalent | Fast, clean, modern iOS | `{ duration: 250, dampingRatio: 0.85 }` |
| `.smooth(duration: 0.3)` | On-screen movement, subtle state changes | Critically damped, no bounce | `{ duration: 300, dampingRatio: 1 }` |
| `.bouncy(duration: 0.4)` | Drag and playful interactions only | Visible overshoot | `{ duration: 400, dampingRatio: 0.7 }` |
| `.interactiveSpring()` | Gesture-driven, low latency | Tracks the finger | `withSpring` with gesture `velocity` |
| `.spring(duration:bounce:)` | Custom tuning | Full control | `{ duration, dampingRatio: 1 - bounce }` |

Default pick: `.snappy(duration: 0.25)`. When in doubt about how an interactive moment should feel on iOS, this is the answer, and `{ duration: 250, dampingRatio: 0.85 }` is how you ship it in React Native.

## Implicit vs explicit (why iOS coordination feels coherent)

~~~swift
// Implicit: per-view, like a CSS transition / a single useAnimatedStyle
Text("Hello")
    .scaleEffect(isExpanded ? 1.2 : 1.0)
    .animation(.snappy(duration: 0.25), value: isExpanded)

// Explicit: coordinate multiple views from one state change (K5: paired elements)
withAnimation(.spring(duration: 0.3, bounce: 0.15)) {
    isExpanded.toggle()
}
~~~

The lesson for React Native: `withAnimation` puts paired elements on one clock. When you implement a sheet + backdrop in Reanimated, drive both from the same shared value / same spring config so they move as a unit (K5). That single-clock coordination is what makes the native version feel coherent.

## Enter / exit (K1, K2, K7)

~~~swift
if showDetail {
    DetailView()
        .transition(.opacity.combined(with: .scale(scale: 0.95)))
}

// Asymmetric: exits simpler and faster
.transition(.asymmetric(
    insertion: .scale(scale: 0.95).combined(with: .opacity),
    removal: .opacity
))
~~~

Scale insertions start at 0.95, never 0 (K7). The React Native equivalent is `FadeInDown` / a custom entering builder starting from `scale 0.95` + a small `translateY`; asymmetric maps to a faster `exiting` than `entering` (K2).

## Hero morphs

`matchedGeometryEffect` is the FLIP equivalent: same `id` and `@Namespace` in both states, wrap the state change in `withAnimation`, and SwiftUI interpolates position and size. This is the feel target for a shared-element transition between two screens; in React Native you reproduce it with a shared transition library or a measured-layout interpolation, aiming for this same continuity.

## Multi-step sequences

`PhaseAnimator` (iOS 17+) cycles discrete phases without timers; it is for the rare signature/onboarding moment, not product chrome (K3). When a spec reserves a multi-phase signature beat, this is the feel; reproduce it in Reanimated with a sequence of springs/timings, still honoring K3 (not on a daily-use control).

## Haptics

No web equivalent, and a defining part of native feel. Pair with meaningful state changes only, never decoration:

~~~swift
Button("Confirm") {
    withAnimation(.snappy) { confirmed = true }
}
.sensoryFeedback(.impact(weight: .medium), trigger: confirmed)
~~~

Types: `.impact`, `.selection`, `.success`, `.warning`, `.error`. Haptics stay on when reduced motion is on. The React Native counterpart is `expo-haptics` fired on the same discrete milestones (see react-native-craft.md). Match the moments SwiftUI would buzz on (a commit, a selection change, a threshold cross), not a denser cadence.

## Reduced motion (K6)

~~~swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

ContentView()
    .opacity(isVisible ? 1 : 0)
    .scaleEffect(reduceMotion ? 1 : (isVisible ? 1 : 0.95))
    .animation(reduceMotion ? .none : .snappy(duration: 0.25), value: isVisible)
~~~

Reduced means none or crossfade, never slower: the same rule as the React Native `useReducedMotion` branch.

## Performance (K4 equivalents)

- Animate `offset`, `scaleEffect`, `rotationEffect`, `opacity`. Never animate `.frame()` or `.padding()` changes; they recompute layout, the exact mirror of "transform/opacity only, never width/height" in React Native.
- Keep per-frame state out of `body`. A `body` recompute per frame is the SwiftUI version of a React re-render per frame.
- `drawingGroup()` flattens complex composited views onto one GPU layer, the conceptual cousin of dropping into a Skia canvas.

## Using this file in practice

1. You have an interactive moment to implement in React Native.
2. Ask: if Apple shipped this, which preset would they use? `.snappy`? `.smooth`? `.bouncy`? Gesture-tracking?
3. Translate that preset to a Reanimated spring via spring-physics.md.
4. Confirm the velocity hand-off on gesture release (K8) and the paired-element single clock (K5), because those are what SwiftUI gives for free and React Native does not.

That round trip (feel decided in SwiftUI terms, shipped in Reanimated) is the whole point of the lens.
