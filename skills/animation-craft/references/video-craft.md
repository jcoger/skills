# video-craft.md

Implementation reference for programmatic video: Remotion (React, DOM-based) and HyperFrames (HTML + GSAP, agent-native). Code in, MP4 out. This surface breaks core assumptions of every other file in this package, so read the prime rule first.

## The prime rule: every frame is a pure function of time

A renderer screenshots frame 0, frame 1, frame 2. Nothing wall-clock-driven survives that:

- **Banned in Remotion:** CSS transitions, CSS animations (they flicker across rendered frames and the docs warn against them explicitly), requestAnimationFrame state, setTimeout/setInterval driving visuals, `Math.random()` without a seed, `Date.now()`.
- **The only clock in Remotion** is `useCurrentFrame()`. Everything visual derives from it through `interpolate()` and `spring()`.
- **HyperFrames works because GSAP timelines are seekable.** Every tween lives on one master timeline the renderer can `seek()` to any time deterministically. The same rule applies: no animation that cannot be seeked.
- The test for both: scrub the preview timeline backward and forward. Anything that breaks on scrub breaks in render.

## How the gates translate to camera time

| Gate | In video |
|---|---|
| K1 easing roles | Survives intact. Bolder curves (expo, quint) read even better at video scale. |
| K2 duration budgets | Replaced by pacing. Viewers are not waiting on their own click; UI durations read as twitchy on camera. Scale moves up 1.5-2x and think in beats, not ms. |
| K3 frequency rule | Not applicable. Replacement discipline: one mover per beat. |
| K4 compositor props | Still good hygiene (fast previews, fast renders), but render correctness, not jank, is the stake. |
| K5 paired elements | Survives intact. |
| K6 reduced motion | No media query inside an MP4. The substitute is legibility: type sized for the destination feed, holds after reveals, captions handled by the platform or burned in deliberately. |
| K7 anchored entrances | Survives intact. scale(0) entrances read just as cheap on camera. |
| K8 interruptibility | Not applicable. Nothing is interruptible in a rendered file. |

## Remotion craft

Think in frames, write in seconds times fps:

~~~jsx
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

function Title({ text }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // spring() is ported from Reanimated; damping 200 = no bounce
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const y = interpolate(enter, [0, 1], [40, 0]);
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  const style = { opacity, transform: "translateY(" + y + "px)" };
  return <h1 style={style}>{text}</h1>;
}
~~~

Rules:

- **Always clamp.** `extrapolateRight: "clamp"` (and left, when relevant) on nearly every `interpolate`. Unclamped values overshoot into nonsense exactly like unclamped scroll interpolation.
- **Delay by offsetting the clock:** pass `frame - delayFrames` into `spring()`; it idles at 0 until the delay passes. Stagger items with `frame - index * 3`.
- **`<Sequence>` is the beat container.** Inside a Sequence, `useCurrentFrame()` resets to 0, so components are reusable per beat:

~~~jsx
import { AbsoluteFill, Sequence } from "remotion";

function Promo() {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={60}><Hook /></Sequence>
      <Sequence from={60} durationInFrames={150}><Demo /></Sequence>
      <Sequence from={210}><Cta /></Sequence>
    </AbsoluteFill>
  );
}
~~~

- Randomness uses Remotion's seeded `random()`, never `Math.random()`.
- Assets that load (fonts, images, data) use the delayRender/continueRender pattern or `staticFile`; a frame must never render before its assets exist.
- `Easing` is exported by Remotion and takes the same bezier values as the web tokens; the K1 role map carries over directly.
- Remotion publishes official agent skills for its API surface. This file is the craft layer (what reads well), not an API reference; both can be installed together.

## HyperFrames craft

HTML is the format: elements plus data attributes for timing and tracks, rendered to video. Built for agents, so output is diffable and version-controlled.

- GSAP is the primary animation driver because its timelines seek deterministically. Lottie, WAAPI, and Three.js adapters exist; reach for them only when GSAP cannot express the visual.
- All GSAP craft from web-craft.md applies: timeline `defaults`, position-parameter overlap, SplitText line masks. The duration scale shifts up per the gate table; the choreography principles do not change.
- **frame.md is the design-token translation layer:** the same brand tokens, rewritten for the camera. The practical rules it encodes: type scales up 2-3x from web sizes, there is no hover and no nav chrome, margins respect platform UI overlays (progress bars, captions, reaction buttons), and colors need contrast that survives compression.

## Pacing craft (the replacement for K2 and K3)

- **Hook first.** The first 1-2 seconds earn the rest. Lead with the most visually arresting moment, not a logo.
- **One idea per beat, one mover per moment.** The camera itself (scaling or translating the whole frame) counts as a mover.
- **Holds are content.** 0.5-1s of stillness after a reveal lets it land. Filling every frame with motion reads as noise, not energy.
- **Beat lengths:** 2-4 seconds for social and teasers; product demos can hold longer when the screen content is doing the work.
- **Cuts beat exits.** In video, cutting is normal language; prefer a clean cut over an elaborate exit animation.
- **Design for the feed:** if it autoplays muted, the first 2 seconds must work without sound, and a looping video's last frame should hand off to its first.

## Render hygiene

- Compose at 1080p minimum, 4K for product hero work. Check type legibility at phone size, since that is where feed video is watched.
- Durations in frames, not ms. A 0.9s entrance at 30fps is 27 frames; unit confusion is the most common spec-to-video bug.
- Scrub test before render: drag the playhead backward through every beat.
- Keep renders deterministic: seeded randomness, preloaded assets, no network-dependent timing.

## REVIEW additions for video code

- Any CSS transition or animation inside a Remotion composition.
- Wall-clock APIs (setTimeout, requestAnimationFrame, Date.now) driving visuals.
- `Math.random()` without a seed.
- Unclamped `interpolate()`.
- Durations written in ms where frames are expected.
- Every element animating at once; no holds anywhere.
- Type that will be illegible at phone size in a feed.
- A HyperFrames animation living outside the master timeline (unseekable).
