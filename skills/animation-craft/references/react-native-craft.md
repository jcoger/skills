# react-native-craft.md

Implementation reference for React Native. Reanimated owns motion, Gesture Handler owns input, Skia owns custom drawing. All gates K1-K8 apply on this platform; this file maps them onto this stack. Shared spring mental model lives in spring-physics.md.

React Native IS the mobile platform, so the mobile rules are not a downgrade path here, they are the baseline: hover does not exist, effect budgets are already one tier down, and the test device is a mid-range Android phone, not the simulator.

## Stack facts (current)

- Reanimated 4 is New Architecture only (React Native 0.76+, Fabric). Apps still on the legacy architecture stay on Reanimated 3.x; all v2/v3 worklet code runs in 4.x with only minor renames.
- Worklets are now a separate package: `react-native-worklets`, with babel plugin `react-native-worklets/plugin` (replaces `react-native-reanimated/plugin`). This matters because other libraries (vision-camera, gesture libs) share the same worklet runtime.
- Reanimated 4 ships two animation systems that coexist:
  1. **CSS-compatible API**: declarative `transitionProperty` / `animationName` style props. For state-driven UI.
  2. **Worklet API**: shared values + `useAnimatedStyle`. For gestures, scroll, and anything continuous or interruptible mid-flight.
- Skia comes from `@shopify/react-native-skia`. GPU-rendered canvas; the Fabric rewrite made animations substantially faster than the old implementation, with the largest gains on Android.

## Which tool for which job

| Job | Reach for | Why |
|---|---|---|
| State toggle (open/close, selected, expanded) | CSS transition | Declarative, cheap, easy to read |
| Looping ambient motion (pulse, shimmer) | CSS animation (keyframes) | No worklet needed, respects K3 budget |
| Gesture-driven anything | Worklets + Gesture Handler | Velocity preservation, interruptible (K8) |
| Scroll-driven anything | Worklets + scroll handler | Frame-accurate progress on the UI thread |
| Mount/unmount of list items, modals | Layout animations (entering/exiting) | Built-in, handles unmount timing for you |
| List reorder, size changes | `LinearTransition` layout animation | Automatic FLIP-style movement |
| Animated gradients, shaders, masks, glow, generative backgrounds | Skia | Views cannot do this; canvas can |
| Data viz past a few hundred points | Skia | SVG stutters; Skia holds 60fps at 5,000+ points |

Rule of thumb: start at the top of this table and only move down when the row above cannot express the motion. A worklet for a simple opacity toggle is over-engineering; a CSS transition driving a gesture is impossible.

## Easing and duration tokens (worklet API)

Same canon as web-craft.md, expressed for Reanimated:

~~~js
import { Easing } from 'react-native-reanimated';

// Enters and exits (K1: ease-out family)
export const easeOutQuad  = Easing.bezier(0.25, 0.46, 0.45, 0.94);
export const easeOutCubic = Easing.bezier(0.215, 0.61, 0.355, 1);
export const easeOutExpo  = Easing.bezier(0.19, 1, 0.22, 1);

// On-screen movement (K1: ease-in-out family)
export const easeInOutQuad  = Easing.bezier(0.455, 0.03, 0.515, 0.955);
export const easeInOutCubic = Easing.bezier(0.645, 0.045, 0.355, 1);

// Durations (K2): same tiers as web
export const durMicro = 120;   // taps, toggles, icon swaps
export const durBase  = 200;   // most UI transitions
export const durModal = 280;   // sheets, modals, overlays
// Exits run ~20% faster than enters. Never ease-in for UI.
~~~

In practice most interactive RN motion should be springs, not curves (next section). Curves are for enters, exits, and fixed choreography.

## Springs: the default for interactive UI

`withSpring` accepts the duration + bounce mental model directly via `duration` and `dampingRatio`:

~~~js
import { withSpring } from 'react-native-reanimated';

// dampingRatio 1 = critically damped (no bounce)
// 0.8-0.9 = subtle life, the right default for product UI
// below 0.7 = playful, use deliberately and rarely
const snappy = { duration: 250, dampingRatio: 0.85 };
const smooth = { duration: 350, dampingRatio: 1 };

offset.value = withSpring(0, snappy);
~~~

Mapping to the shared model in spring-physics.md: bounce roughly equals `1 - dampingRatio`. A SwiftUI `.snappy(0.25)` and a Reanimated `{ duration: 250, dampingRatio: 0.85 }` should feel like the same component.

The reason springs win for interactive UI is K8: a spring retargeted mid-flight preserves velocity automatically. A `withTiming` retargeted mid-flight visibly restarts.

## Gestures into motion (K8 in practice)

The canonical pattern: gesture writes to a shared value every frame, release hands the gesture velocity to a spring or decay. The animation continues the finger's motion instead of starting a new one.

~~~jsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDecay } from 'react-native-reanimated';

function DismissibleCard({ onDismiss }) {
  const x = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange((e) => { x.value += e.changeX; })
    .onEnd((e) => {
      const gone = Math.abs(x.value) > 120 || Math.abs(e.velocityX) > 800;
      if (gone) {
        // continue in the direction of the throw, with the throw's velocity
        x.value = withSpring(Math.sign(x.value || e.velocityX) * 500, {
          velocity: e.velocityX, duration: 300, dampingRatio: 1,
        });
      } else {
        // snap back, still carrying velocity (K8)
        x.value = withSpring(0, { velocity: e.velocityX, duration: 300, dampingRatio: 0.8 });
      }
    });

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }],   // K4: transform only
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={style}>{/* card */}</Animated.View>
    </GestureDetector>
  );
}
~~~

For momentum scrolling and flick-to-rest, use `withDecay({ velocity: e.velocityX, clamp: [min, max] })`.

## Layout animations (mount, unmount, reorder)

~~~jsx
import Animated, { FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';

<Animated.View
  entering={FadeInDown.duration(220).delay(index * 50)}  // stagger lists ~40-60ms/item
  exiting={FadeOut.duration(160)}                        // K2: exit ~20% faster than enter
  layout={LinearTransition.duration(200)}                // smooth reorders and size changes
/>
~~~

Rules:
- Cap visible stagger: past 6-8 items, let the rest arrive together. A 20-item full stagger reads as lag, not craft.
- Enters come from `translateY` 8-16px plus opacity, never from `scale(0)` (K7).
- Custom builders exist (`.withInitialValues`, keyframe builders) but the presets cover most real product work. Reach for custom only when the spec names a pattern the presets cannot express.

## Scroll-driven motion

Maps to the motion-direction scroll clock contract:

- **Enter-only clock**: layout `entering` animations triggered by list visibility, or an in-view hook flipping a shared value once. Cheapest, the right default.
- **Progress driver**: one scroll handler writes a single progress value, every animated element interpolates from it. Same principle as the web `--progress` driver: everything on the same scroll clock.
- **Scrub timeline**: interpolate multiple properties across a defined scroll range, always with clamping.

~~~jsx
import Animated, { useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolation } from 'react-native-reanimated';

const scrollY = useSharedValue(0);
const onScroll = useAnimatedScrollHandler((e) => {
  scrollY.value = e.contentOffset.y;   // one driver for the whole screen
});

const headerStyle = useAnimatedStyle(() => ({
  opacity: interpolate(scrollY.value, [0, 120], [1, 0], Extrapolation.CLAMP),
  transform: [{
    translateY: interpolate(scrollY.value, [0, 120], [0, -24], Extrapolation.CLAMP),
  }],
}));
~~~

Always pass `Extrapolation.CLAMP` unless overshoot is a deliberate choice. Unclamped interpolation is the number one source of "it glitches when I scroll fast."

## Reduced motion (K6)

~~~jsx
import { useReducedMotion, ReducedMotionConfig, ReduceMotion } from 'react-native-reanimated';

const reduced = useReducedMotion();
// crossfade instead of movement, never just a slower version
const entering = reduced ? FadeIn.duration(150) : FadeInDown.duration(220);
~~~

Per-animation control also exists (`withSpring(x, { reduceMotion: ReduceMotion.System })`), but prefer explicit fallbacks: the system default disables the animation entirely, and some animations (a loading indicator, a progress bar) must keep running. For Skia, reduced motion means freezing the clock and rendering a good static frame, not a slower shader.

## Skia: when to reach for the canvas

Reach for Skia when views cannot express the visual: animated gradients and mesh backgrounds, SKSL shaders, masking and glow, path drawing, image filters, particle fields, charts past a few hundred points.

Do not build whole screens in canvas. Text, layout, and accessibility live in RN views; the canvas is a layer behind or inside them. A Skia hero background with regular views composited on top is the standard award-tier pattern.

## Skia + Reanimated integration

Shared and derived values pass directly as Skia props. No `createAnimatedComponent`, no `useAnimatedProps`:

~~~jsx
import { Canvas, Rect, LinearGradient, vec } from '@shopify/react-native-skia';
import { useSharedValue, useDerivedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

function BreathingBackground({ width, height }) {
  const t = useSharedValue(0);
  useEffect(() => {
    t.value = withRepeat(withTiming(1, { duration: 6000 }), -1, true);
  }, []);

  const end = useDerivedValue(() => vec(width, height * (0.6 + t.value * 0.4)));

  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient start={vec(0, 0)} end={end} colors={['#101014', '#1c2030']} />
      </Rect>
    </Canvas>
  );
}
~~~

Gotchas:
- Color interpolation: use `interpolateColors` from Skia, not Reanimated's `interpolateColor`. The two libraries store colors differently.
- `useClock()` from Skia gives a shared value of elapsed milliseconds for time-driven shaders and ambient motion.
- A gesture or scroll shared value can drive a shader uniform directly, which is how interactive backgrounds stay at 60fps: nothing crosses back to the JS thread.

## Shaders (SKSL)

~~~jsx
import { Canvas, Fill, Shader, Skia } from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

const source = Skia.RuntimeEffect.Make(`
uniform float u_time;
uniform vec2 u_resolution;

half4 main(vec2 pos) {
  vec2 uv = pos / u_resolution;
  float wave = sin(uv.x * 6.0 + u_time) * 0.5 + 0.5;
  return half4(mix(vec3(0.06, 0.06, 0.09), vec3(0.11, 0.13, 0.19), wave * uv.y), 1.0);
}`)!;

function ShaderBackground({ clock, width, height }) {
  const uniforms = useDerivedValue(() => ({
    u_time: clock.value / 1000,
    u_resolution: [width, height],
  }));
  return (
    <Canvas style={StyleSheet.absoluteFill}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
}
~~~

Shader rules:
- Keep uniforms few and scalar; pass progress values, not objects.
- Normalize by resolution so the effect is device-independent.
- Budget like any other effect: one shader background per screen, test on mid-range Android, ship a static gradient fallback for reduced motion.

## Path animation

- Line-draw reveals: animate the `end` prop of a `Path` from 0 to 1 (path trim), driven by a shared value.
- Shape morphs: `path.interpolate(otherPath, t)` requires both paths to have the same verb structure. Author the two states from the same path skeleton.

## Performance rules (K4 on this stack)

- Animate `transform` and `opacity` on views. Width, height, margin, and padding trigger layout even on the UI thread; reach for `LinearTransition` instead when size must change.
- Never read or write `.value` during render. Worklet callbacks and `useDerivedValue` only.
- `runOnJS` is for discrete events (dismiss callbacks, haptics), never per-frame.
- One scroll handler per screen writing one shared value beats five handlers doing their own math.
- Skia earns its keep at scale: single GPU draw call for the whole canvas. But an empty 60fps clock-driven canvas still burns battery, so pause `useClock`-driven canvases when off-screen.
- The test protocol: mid-range Android device, release build. Debug-mode jank is real but exaggerated; release-mode jank is disqualifying.

## REVIEW additions for React Native code

Extra smells to flag beyond the standard gates:

- Core `Animated` from react-native used for gesture or scroll work that belongs in Reanimated.
- `setState` or `runOnJS` called per frame.
- `onScroll` without `useAnimatedScrollHandler` feeding animation logic through the JS thread.
- `withTiming` on gesture-released values (restarts instead of preserving velocity, K8).
- Exits with the same duration as enters (K2).
- Unclamped `interpolate` on scroll-driven values.
- Reanimated's `interpolateColor` feeding a Skia prop.
- No `useReducedMotion` branch anywhere in a file full of motion (K6).
