# spring-physics.md

One mental model for springs on mobile: **duration + bounce**. Think in those two numbers, then translate to the platform API last. On mobile, springs are the default for interactive motion. Curves are the exception (enters, exits, fixed choreography). This is the inverse of the web, and it is most of what makes an app feel native.

## The two numbers

- **Perceptual duration:** how long the motion feels. Same budget discipline as K2: UI springs feel like 200-350ms even though springs technically settle asymptotically.
- **Bounce:** 0 is critically damped (no overshoot). Guide:
  - `0.0` - smooth, serious, product chrome
  - `0.05-0.2` - subtle settle, most UI, "alive" without being playful
  - `0.2-0.4` - visible bounce, drag interactions, playful brands
  - `> 0.5` - exaggerated, almost never in production

## When a spring beats a curve

- The value can change mid-flight (gestures, rapid toggling): springs preserve velocity and retarget; keyframes/`withTiming` restart from zero (K8).
- Drag release with momentum: the spring inherits the gesture's velocity.
- Anything that should feel physical rather than scheduled, which, on mobile, is most interactive motion.

When a curve is fine: one-shot entrances and exits, selection states, scroll reveals. Do not pay spring complexity for motion that never gets interrupted.

## Platform translation

The two columns that matter for this kit are Reanimated (what you ship) and SwiftUI (the native-feel target you are matching). The others are kept for cross-referencing a shared design system.

| Mental model | SwiftUI (feel target) | Reanimated (RN, ship this) | Motion (JS) | CSS |
|---|---|---|---|---|
| duration 0.25, bounce 0 | `.smooth(duration: 0.3)` | `{ duration: 300, dampingRatio: 1 }` | `{ type: "spring", duration: 0.3, bounce: 0 }` | `--ease-out-cubic` at 250ms (close enough) |
| duration 0.25, bounce 0.15 | `.snappy(duration: 0.25)` | `{ duration: 250, dampingRatio: 0.85 }` | `{ type: "spring", duration: 0.25, bounce: 0.15 }` | `linear()` spring |
| duration 0.4, bounce 0.3 | `.bouncy(duration: 0.4)` | `{ duration: 400, dampingRatio: 0.7 }` | `{ type: "spring", duration: 0.4, bounce: 0.3 }` | `linear()` spring |
| gesture-tracking | `.interactiveSpring()` | `withSpring` with gesture `velocity` | `useSpring` / gesture springs | not possible in pure CSS |

Stiffness/damping/mass APIs exist on all platforms; prefer duration + bounce, it is the model a director can reason about and the one the spec speaks in.

**Reanimated translation (the operative one):** `withSpring` takes `{ duration, dampingRatio }` directly. Bounce maps as roughly `1 - dampingRatio`, so bounce 0.15 is dampingRatio 0.85. Pass the gesture's release `velocity` into the spring config for K8. When you pick a Reanimated spring, name the SwiftUI preset in the same row. That is the native-feel lens keeping iOS feel honest.

## Springs over duration: the default discipline

On this stack, reach for `withSpring` first for any interactive value. Use `withTiming` (a curve) only when the motion is genuinely one-shot and uninterruptible. The single most common "doesn't feel native" bug is a `withTiming` on a value that a gesture or a rapid toggle can interrupt: it visibly restarts instead of retargeting. Swap it to a spring carrying velocity and the feel snaps into place.

## Bounce discipline

Bounce is a brand decision, not a per-element choice. The motion spec's personality sets the bounce range once; every spring on the screen draws from it. A serious finance app with one random bouncy card reads as a bug. If the spec says bounce 0-0.1, dampingRatio stays at or above ~0.9 everywhere, including gesture snap-backs and sheet detents.

## A note on the velocity hand-off

The physical correctness that sells a gesture is passing the release velocity into the spring:

~~~js
x.value = withSpring(target, { velocity: e.velocityX, duration: 300, dampingRatio: 0.85 });
~~~

Without `velocity`, the spring starts from rest and the motion visibly "stutters" at the moment the finger lifts. The hand-off is the difference between a thrown object and a scheduled one. This is `.interactiveSpring()` behavior reproduced in Reanimated, and it is non-negotiable for swipe-to-dismiss, sheet drag, and drawer drag (see gesture-and-scroll.md).
