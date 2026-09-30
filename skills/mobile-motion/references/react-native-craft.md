# react-native-craft.md

The primary implementation surface for this kit. Reanimated owns motion, Gesture Handler owns input, Skia owns custom drawing. All gates K1-K8 apply; this file maps them onto this stack. The shared spring mental model lives in spring-physics.md. Gesture, scroll, and sheet/drawer physics live in gesture-and-scroll.md. How the result should FEEL on iOS (the native-feel lens) lives in swiftui-craft.md.

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

The same canon as the rest of the kit, expressed for Reanimated. Build these into a constants file during IMPLEMENT step 2; never inline raw values.

~~~js
import { Easing } from 'react-native-reanimated';

// Enters and exits (K1: ease-out family)
export const easeOutQuad  = Easing.bezier(0.25, 0.46, 0.45, 0.94);
export const easeOutCubic = Easing.bezier(0.215, 0.61, 0.355, 1);
export const easeOutExpo  = Easing.bezier(0.19, 1, 0.22, 1);

// On-screen movement (K1: ease-in-out family)
export const easeInOutQuad  = Easing.bezier(0.455, 0.03, 0.515, 0.955);
export const easeInOutCubic = Easing.bezier(0.645, 0.045, 0.355, 1);

// Durations (K2): same tiers as the rest of the kit
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

Mapping to the shared model in spring-physics.md: bounce roughly equals `1 - dampingRatio`. A SwiftUI `.snappy(0.25)` and a Reanimated `{ duration: 250, dampingRatio: 0.85 }` should feel like the same component. This is the native-feel lens in practice. When you pick a spring, name the SwiftUI preset it stands in for; that is how you keep iOS feel calibrated from React Native.

The reason springs win for interactive UI is K8: a spring retargeted mid-flight preserves velocity automatically. A `withTiming` retargeted mid-flight visibly restarts.

## Gestures into motion (K8 in practice)

The canonical pattern: gesture writes to a shared value every frame, release hands the gesture velocity to a spring or decay. The animation continues the finger's motion instead of starting a new one. Full gesture and sheet/drawer treatment is in gesture-and-scroll.md; the minimal shape:

~~~jsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

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

For momentum scrolling and flick-to-rest, use `withDecay({ velocity: e.velocityX, clamp: [min, max] })`. See gesture-and-scroll.md.

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

Maps to the spec's scroll clock contract. The full treatment (drivers, clamping, sticky headers, parallax budgets) is in gesture-and-scroll.md. The short version:

- **Enter-only clock**: layout `entering` animations triggered by list visibility, or an in-view hook flipping a shared value once. Cheapest, the right default.
- **Progress driver**: one scroll handler writes a single progress value, every animated element interpolates from it. Everything on the same scroll clock.
- **Scrub timeline**: interpolate multiple properties across a defined scroll range, always with `Extrapolation.CLAMP`.

Unclamped interpolation is the number one source of "it glitches when I scroll fast."

## Reduced motion (K6)

~~~jsx
import { useReducedMotion, FadeIn, FadeInDown } from 'react-native-reanimated';

const reduced = useReducedMotion();
// crossfade instead of movement, never just a slower version
const entering = reduced ? FadeIn.duration(150) : FadeInDown.duration(220);
~~~

Per-animation control also exists (`withSpring(x, { reduceMotion: ReduceMotion.System })`), but prefer explicit fallbacks: the system default disables the animation entirely, and some animations (a loading indicator, a progress bar) must keep running. For Skia, reduced motion means freezing the clock and rendering a good static frame, not a slower shader.

## Skia: when to reach for the canvas

Reach for Skia when views cannot express the visual: animated gradients and mesh backgrounds, SKSL shaders, masking and glow, path drawing, image filters, particle fields, charts past a few hundred points.

Do not build whole screens in canvas. Text, layout, and accessibility live in RN views; the canvas is a layer behind or inside them. A Skia hero background with regular views composited on top is the standard award-tier pattern for a signature moment.

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

## Haptics (the mobile-only layer)

The web has no equivalent; on mobile, a haptic on a meaningful state change is a large part of what reads as "native." Pair haptics with state changes, never decoration, and keep them on under reduced motion (K6).

~~~jsx
import * as Haptics from 'expo-haptics';

// on a confirm, a successful save, a threshold cross in a gesture
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
// on selection change in a picker or segmented control
Haptics.selectionAsync();
// on a button press that commits something
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
~~~

Fire haptics from `runOnJS` on discrete gesture milestones (threshold crossed, snapped to a detent), never per frame. The native-feel lens: SwiftUI pairs `.sensoryFeedback` with the same moments. Match those moments, not a denser cadence.

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
- Haptics fired per frame instead of on discrete milestones.
- A spring chosen with no sense of the SwiftUI preset it stands in for (no native-feel calibration).

## The silent-failure family (modern iOS + New Architecture)

Three failures that produce **no error**: the motion just doesn't happen, or the app dies only
in release. All three shipped on a real app; all three were burned hours. Verify on the current
iOS major in a release build before trusting any of these APIs on a critical path.

1. **Layout `entering`/`exiting` can silently no-op** on recent iOS majors with current
   Reanimated (observed: iOS 26 / Reanimated 4.3). The view mounts stuck at opacity 0, or the
   animation half-runs, and `entering` on a view containing a `TextInput` can swallow its focus.
   The table above still recommends layout animations for list items and decorative mounts;
   that stands. But for anything that **must be visible on mount or drives interaction**, use the
   shared-value driver instead. It cannot silently fail:

   ~~~tsx
   const p = useSharedValue(0);
   useEffect(() => { p.value = withTiming(1, { duration: 220 }); }, []);
   const style = useAnimatedStyle(() => ({
     opacity: p.value,
     transform: [{ translateY: (1 - p.value) * 8 }],
   }));
   ~~~

2. **A persistent `BlurView` over scrolling content janks.** Real-time blur re-renders every
   frame behind it. For always-mounted chrome (tab bars, floating buttons), fake the frosted
   look with a translucent fill + hairline border; save real blur for short-lived moments.

3. **Release builds run code dev builds never run.** `#if !DEBUG` guards in native SDKs mean an
   init call can work in every dev build and crash 100% of release builds (payment SDKs with
   test keys are the canonical case). Motion-adjacent corollary: judge smoothness AND survival in
   a release build. Dev-mode jank is exaggerated; dev-mode "works" is not evidence.

REVIEW smell to add to the list above: `entering`/`exiting` on a mount-visible or interactive
view (an input, the screen's primary content) instead of the shared-value driver.
