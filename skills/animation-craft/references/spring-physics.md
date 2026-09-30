# Spring Physics

One mental model for springs across web, SwiftUI, and React Native: **duration + bounce**. Think in those two numbers everywhere; translate to each platform's API last.

## The two numbers

- **Perceptual duration:** how long the motion feels. Same budget discipline as K2: UI springs feel like 200-350ms even though springs technically settle asymptotically.
- **Bounce:** 0 is critically damped (no overshoot). Guide:
  - `0.0` - smooth, serious, product chrome
  - `0.05-0.2` - subtle settle, most UI, "alive" without being playful
  - `0.2-0.4` - visible bounce, drag interactions, playful brands
  - `> 0.5` - exaggerated, almost never in production

## When a spring beats a curve

- The value can change mid-flight (gestures, rapid toggling): springs preserve velocity and retarget; keyframes restart from zero (K8).
- Drag release with momentum: the spring inherits the gesture's velocity.
- Anything that should feel physical rather than scheduled.

When a curve is fine: one-shot entrances and exits, hover states, scroll reveals. Do not pay spring complexity for motion that never gets interrupted.

## Platform translation

| Mental model | SwiftUI | Reanimated (RN) | Motion (JS) | CSS |
|---|---|---|---|---|
| duration 0.25, bounce 0 | `.smooth(duration: 0.3)` | `{ duration: 300, dampingRatio: 1 }` | `{ type: "spring", duration: 0.3, bounce: 0 }` | `--ease-out-cubic` at 250ms (close enough) |
| duration 0.25, bounce 0.15 | `.snappy(duration: 0.25)` | `{ duration: 250, dampingRatio: 0.85 }` | `{ type: "spring", duration: 0.25, bounce: 0.15 }` | `linear()` spring (below) |
| duration 0.4, bounce 0.3 | `.bouncy(duration: 0.4)` | `{ duration: 400, dampingRatio: 0.7 }` | `{ type: "spring", duration: 0.4, bounce: 0.3 }` | `linear()` spring |
| gesture-tracking | `.interactiveSpring()` | `withSpring` with gesture `velocity` | `useSpring` / gesture springs | not possible in pure CSS |

Stiffness/damping/mass APIs exist on all platforms; prefer duration + bounce, it is the model a director can reason about.

Reanimated translation: `withSpring` takes `{ duration, dampingRatio }` directly. Bounce maps as roughly `1 - dampingRatio`, so bounce 0.15 is dampingRatio 0.85. Pass the gesture's release `velocity` into the spring config for K8.

Remotion translation: its `spring({ frame, fps, config })` was ported from Reanimated, so the same model holds in video. `config: { damping: 200 }` reads as bounce 0; the default config has visible bounce, so set damping deliberately. Durations are measured in frames, not ms, and K8 does not apply (nothing in a rendered file is interruptible).

## Native CSS springs with linear()

The `linear()` easing function (Baseline, all modern engines) encodes a sampled spring curve directly in CSS. You do not write the points by hand; generate them (Josh Comeau's generator, kvin.me/css-springs, or sample any spring lib at 50+ points).

~~~css
:root {
  /* generated: duration 0.3s, bounce ~0.2 */
  --spring-pop: linear(
    0, 0.0117 1.62%, 0.049 3.39%, 0.1962 7.12%, 0.5964 14.7%,
    0.7741 18.62%, 0.9151 22.74%, 1.0173 27.27%, 1.0807 32.22%,
    1.1072 37.71%, 1.1062 43.43%, 1.0188 62.18%, 0.9986 77.34%, 1
  );
  --spring-pop-duration: 300ms; /* keep paired with the curve */
}

.badge { transition: transform var(--spring-pop-duration) var(--spring-pop); }

@supports not (transition-timing-function: linear(0, 1)) {
  .badge { transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }
}
~~~

Caveats: a `linear()` spring is a recording, not a simulation. It does not preserve velocity on interruption, so it fails K8 for rapid-toggle UI; use Motion or SwiftUI springs there. It is ideal for one-shot entrances and badges that want bounce without JS. The duration and the curve are generated as a pair; changing one without the other breaks the physics.

## Bounce discipline

Bounce is a brand decision, not a per-element choice. The motion spec's personality sets the bounce range once; every spring on the page draws from it. A serious fintech page with one random bouncy card reads as a bug.
