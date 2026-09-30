# Tuning the feel (MotionTuner)

A reference video gives you the **structure** of a motion (the sequence, the layout, rough timing) but not the **feel**: the velocity curve between the poses. Feel is tuned on the device. The kit ships a real tool for it, the same way `mobile-audit` ships `token-lint`: don't re-derive a tuning panel each time, drop in the bundled one.

This is the last step of the motion pipeline:

> reference video → frames → storyboard + COMBO SPEC → build → **MotionTuner (on request)** → export tuned tokens → token-lint holds them.

## What it is

`assets/MotionTuner.tsx` is a **dev-only** (`__DEV__`-gated), **zero-extra-dep** tuning panel built on core React Native (`PanResponder`), so it drops into any RN project with no Leva and no slider library. It tunes the whole feel, not just springs:

- **Timing**: duration, delay, stagger (ms/item), easing (out / inOut / ease / linear).
- **Physics**: spring bounce (the kit's duration + bounce model; `bounce ≈ 1 − dampingRatio`).
- **Choreography**: overlap % (where the next beat starts on the one clock, for combos).
- **Type**: a curve⇄spring toggle, so you can A/B the [motion-type call](effects-catalog.md) live on device and *feel* whether a move wants a spring or a curve (the controls adapt: easing shows for curves, bounce for springs).

## Wiring it

```tsx
import { useMotionTuner, configToTiming, configToSpring } from "<kit>/MotionTuner";
import { withDelay, withSpring, withTiming } from "react-native-reanimated";

const { config, Tuner } = useMotionTuner();
const p = useSharedValue(0);

const run = () => {
  p.value = 0;
  const anim = config.type === "spring"
    ? withSpring(1, configToSpring(config))
    : withTiming(1, configToTiming(config));
  p.value = withDelay(Number(config.delay), anim);
};

return (
  <>
    <YourAnimatedScreen progress={p} />
    <Tuner play={run} />   {/* renders only in __DEV__; auto-replays on each change */}
  </>
);
```

Drag to tune, watch it re-run live, then **Log JSON** (or copy the selectable line at the bottom of the panel).

## Closing the loop (tuned values become tokens)

When the feel is right, paste the exported numbers into your **motion tokens**: the constants file from IMPLEMENT step 2 (durations, easings, spring configs, feel tokens). Then delete the `<Tuner>`. From that point `token-lint` holds the line: the tuned values live as tokens, never as inline literals in components. Video set the structure; you set the feel; the tokens make it permanent and lintable.

## Combos

Tune `overlap` and per-beat `duration` / `stagger` here. For a multi-beat combo, either mount one `<Tuner>` per beat, or extend the schema with beat-prefixed keys (`sheet.duration`, `pill.overlap`). The schema is just an array you pass to `useMotionTuner(schema, defaults)`.

## Raw-physics variant

The default spring control is duration + bounce (the kit's model). If you want raw `damping` / `stiffness` / `mass` sliders instead, add them to the schema and switch `configToSpring` to return `{ damping, stiffness, mass }`. One commented line in the file shows where.

## SwiftUI equivalent

Native SwiftUI doesn't need a bundled tool. A `#if DEBUG` overlay of `Slider`s bound to `@State` spring/duration values is a few lines, and you read them straight into `.spring(duration:bounce:)` / `.easeOut(duration:)`. Same loop: tune in `#if DEBUG`, export the numbers into your motion constants, remove the overlay.

## Note on judging

Tune and judge smoothness in a **release build**, not the dev client. Dev-mode jank is real and misleading (see [Sequence entrances after mount](effects-catalog.md)). Use the tuner to find the values in dev, confirm the feel in release.
