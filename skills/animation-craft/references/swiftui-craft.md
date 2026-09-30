# SwiftUI Craft

SwiftUI is spring-first where CSS is curve-first. The gates K1 to K8 still apply; this file maps them to the native APIs.

## Defaults

| Preset | Use | Feel |
|---|---|---|
| `.snappy(duration: 0.25)` | General-purpose UI, the `ease-out 200ms` equivalent | Fast, clean, modern iOS |
| `.smooth(duration: 0.3)` | On-screen movement, subtle state changes | Critically damped, no bounce |
| `.bouncy(duration: 0.4)` | Drag and playful interactions only | Visible overshoot |
| `.interactiveSpring()` | Gesture-driven, low latency | Tracks the finger |
| `.spring(duration:bounce:)` | Custom tuning | Full control |

Default pick: `.snappy(duration: 0.25)`. Springs beat timing curves in SwiftUI because every SwiftUI animation is interruptible and velocity-preserving by default (K8 for free).

## Implicit vs explicit

~~~swift
// Implicit: per-view, like a CSS transition
Text("Hello")
    .scaleEffect(isExpanded ? 1.2 : 1.0)
    .animation(.snappy(duration: 0.25), value: isExpanded)

// Explicit: coordinate multiple views from one state change (K5: paired elements)
withAnimation(.spring(duration: 0.3, bounce: 0.15)) {
    isExpanded.toggle()
}
~~~

Default to `withAnimation` for state-driven UI; it keeps paired elements on one clock.

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

Scale insertions start at 0.95, never 0 (K7).

## Hero morphs

`matchedGeometryEffect` is the FLIP equivalent: same `id` and `@Namespace` in both states, wrap the state change in `withAnimation`, and SwiftUI interpolates position and size.

## Multi-step sequences

`PhaseAnimator` (iOS 17+) cycles discrete phases without timers; use it for the rare marketing-style moment, not product chrome (K3).

## Haptics

No web equivalent; pair with meaningful state changes only, never decoration:

~~~swift
Button("Confirm") {
    withAnimation(.snappy) { confirmed = true }
}
.sensoryFeedback(.impact(weight: .medium), trigger: confirmed)
~~~

Types: `.impact`, `.selection`, `.success`, `.warning`, `.error`. Haptics stay on when reduced motion is on.

## Reduced motion (K6)

~~~swift
@Environment(\.accessibilityReduceMotion) var reduceMotion

ContentView()
    .opacity(isVisible ? 1 : 0)
    .scaleEffect(reduceMotion ? 1 : (isVisible ? 1 : 0.95))
    .animation(reduceMotion ? .none : .snappy(duration: 0.25), value: isVisible)
~~~

Helper for app-wide consistency:

~~~swift
extension Animation {
    static func appDefault(_ reduceMotion: Bool) -> Animation? {
        reduceMotion ? nil : .snappy(duration: 0.25)
    }
}
~~~

Reduced means none or crossfade, never slower.

## Performance (K4 equivalents)

- Animate `offset`, `scaleEffect`, `rotationEffect`, `opacity`. Never animate `.frame()` or `.padding()` changes; they recompute layout.
- Keep per-frame state out of `body`. A `body` recompute per frame is the SwiftUI version of a React re-render per frame.
- `drawingGroup()` flattens complex composited views onto one GPU layer.
- Custom GPU transforms via `GeometryEffect` with `animatableData`.
- Debug: Simulator -> Debug -> Slow Animations (Cmd+T) runs at 1/5 speed; watch for layout passes in Instruments.

## Cross-platform note

iOS has no hover. For shared macOS/iOS code, gate hover behind `#if os(macOS)`; on iOS use `ButtonStyle` press states plus haptics instead.
