# Reveal Language

The grammar of entrances and scroll motion. Every spec row picks one pattern from this catalog by name. Each pattern lists: what it communicates, personality fit, cost, implementation note, and the required reduced-motion fallback.

Implementation notes use three trigger technologies:
- **CSS-SDA:** CSS scroll-driven animations (`animation-timeline: view()` or `scroll()`). Zero JS, runs off main thread. Now supported in Chrome, Edge, and Safari; provide an IntersectionObserver fallback or accept static for unsupported browsers.
- **IO:** IntersectionObserver toggling a class, animation in CSS. The universal workhorse.
- **JS-scrub:** scroll position mapped to progress in JS (GSAP ScrollTrigger or a custom driver). Only when scrubbing or pinning.

---

## 1. Fade-rise (the base reveal)
- **Says:** content arriving in order, nothing more. The default for everything that is not a moment.
- **Mechanics:** opacity 0 to 1 plus translateY(var(--rise)) to 0. Never start from scale(0) or opacity 0 with no transform, it reads as a pop.
- **Fit:** all personalities (distance and duration come from the personality tokens).
- **Cost:** S. **Trigger:** IO or CSS-SDA.
- **Reduced motion:** opacity-only, same duration.

## 2. Clip-wipe image reveal
- **Says:** crafted, photographic, deliberate. Like a print developing.
- **Mechanics:** `clip-path: inset(100% 0 0 0)` to `inset(0)`. Pair with the inner image counter-translating 4 to 8 percent for depth.
- **Fit:** editorial, grounded. **Cost:** S. **Trigger:** IO or CSS-SDA.
- **Reduced motion:** opacity crossfade.

## 3. Word-row split
- **Says:** typographic confidence. Headline rows start offset (up, left, right) and converge.
- **Fit:** editorial (slow), kinetic (fast). **Cost:** M (needs row splitting that survives responsive wrap).
- **Trigger:** load (hero) or IO. **Reduced motion:** opacity-only per row.

## 4. Masked line rise
- **Says:** premium type craft. Each line rises from behind an overflow mask.
- **Mechanics:** wrap lines in overflow-hidden spans, translateY(110%) to 0, stagger per line.
- **Fit:** kinetic, editorial. **Cost:** M (line splitting; re-split on resize). **Trigger:** IO.
- **Reduced motion:** opacity-only.

## 5. Scale-settle
- **Says:** soft arrival for cards and media. 0.95 to 1.0, never from zero.
- **Fit:** grounded, playful (with spring overshoot). **Cost:** S. **Trigger:** IO or CSS-SDA.
- **Reduced motion:** opacity-only.

## 6. Stagger systems (modifier, not a pattern)
- Siblings stagger by `--stagger`; total sequence must finish under 600ms after the first item (kinetic and editorial may extend to 900ms).
- Grids stagger by row, not by index. Index-staggering a 12-item grid makes item 12 wait over a second.
- Never stagger across sections. Each section's clock starts at its own trigger.

## 7. Counter-scroll drift (parallax)
- **Says:** depth and breath. Images drift against scroll direction at per-element speeds.
- **Mechanics:** speed values from --drift tokens (negative = counter-scroll). All elements derive from ONE progress value, the scroll clock. This single rule separates coherent parallax from theme-park parallax.
- **Fit:** editorial, immersive. **Cost:** M. **Trigger:** JS-scrub writing a `--progress` custom property, or CSS-SDA where ranges allow.
- **Reduced motion:** static positions.

## 8. Sticky scrub theater
- **Says:** this beat is the story. Section pins, scroll scrubs the scene (steps, camera, sequence).
- **Fit:** immersive (core), kinetic (one beat max). **Cost:** L. **Trigger:** JS-scrub.
- **Rules:** scrub length 2 to 3x viewport height max, progress must be visible (visitors need to feel advancement), never two theaters back to back.
- **Reduced motion:** unpinned static frames stacked vertically.

## 9. Kinetic type
- **Says:** the brand has a pulse. Type scales, weights (variable font axis), or tracks with scroll.
- **Fit:** kinetic. **Cost:** M. **Trigger:** JS-scrub or CSS-SDA.
- **Reduced motion:** static at final state.

## 10. Marquee band
- **Says:** abundance (logos, press, menu of work). Linear infinite, 60 to 120s loop, pause on hover.
- **Fit:** kinetic, playful. **Cost:** S. **Trigger:** CSS keyframe.
- **Reduced motion:** static row, REQUIRED (a permanent marquee also violates pause-stop-hide accessibility unless a control exists).

## 11. Number roll
- **Says:** proof feels inevitable. Stats count from a believable start to final value, once, on first view.
- **Fit:** grounded (signature-grade), all others (accent). **Cost:** S. **Trigger:** IO, once.
- **Reduced motion:** final values, static.

## 12. Hover media reveal
- **Says:** depth on demand. Image swap, video-on-hover, color flood.
- **Fit:** editorial, playful, kinetic. **Cost:** S to M.
- **Rules:** gate behind `@media (hover: hover) and (pointer: fine)`. Touch gets the revealed state or a tap affordance.
- **Reduced motion:** crossfade instead of motion-based reveal.

## 13. Shader image treatment (WebGL displacement)
- **Says:** technically elite, imagery as living material. Displacement or distortion on hover or scroll, gooey transitions between images, RGB-shift grids.
- **Fit:** immersive, kinetic. **Cost:** L (WebGL via Three.js, OGL, or curtains.js).
- **Rules:** ONE shader treatment per site, applied consistently, it is a personality statement, not a per-section choice. Never use it to decorate weak photography. Ship a static image fallback for WebGL failure and low-power devices.
- **Trigger:** hover (gated to `pointer: fine`) or JS-scrub.
- **Reduced motion:** static image, no displacement.

## 14. Text scramble / decode
- **Says:** technical, live, machine-adjacent. Characters cycle before settling into the real string.
- **Fit:** kinetic, immersive (dev tools, data products). **Cost:** S to M.
- **Rules:** once per element, settles in under 800ms, use monospace or stable-width glyphs so the layout does not shimmer. Headlines and labels only, never body copy.
- **Trigger:** load or IO, once.
- **Reduced motion:** text static.

## 15. SVG line draw / morph
- **Says:** crafted illustration, things being made in front of you. Paths draw in via stroke-dashoffset, or shapes morph between states.
- **Fit:** playful, editorial. **Cost:** M.
- **Trigger:** IO or CSS-SDA.
- **Reduced motion:** final drawn state.

## 16. Scroll-linked video / image sequence
- **Says:** cinematic product story. Playback position maps to scroll progress.
- **Fit:** immersive. **Cost:** L.
- **Rules:** an image sequence scrubs more reliably than seeking a video element. Cap frame count and resolution per viewport, preload on idle, and give mobile a shorter sequence or static keyframes.
- **Trigger:** JS-scrub.
- **Reduced motion:** 2 or 3 static keyframes.

## 17. Horizontal rail
- **Says:** a curated set worth panning through (selected work, product line, timeline).
- **Mechanics:** vertical scroll drives horizontal translate inside a pinned section, so the visitor never changes scroll direction. Free-dragging rails need a visible affordance plus keyboard access.
- **Fit:** editorial, kinetic, immersive. **Cost:** M to L.
- **Rules:** portfolios and galleries yes, conversion-critical content no (content hidden in a rail underperforms for buying decisions). 3 to 6 items per rail. Never fight native horizontal touch gestures.
- **Trigger:** JS-scrub (pinned) or native overflow scroll with snap.
- **Reduced motion:** standard vertical stack, or a plain scrollable overflow row.

## 18. Blur-up media reveal
- **Says:** soft photographic arrival. Media sharpens from a blurred state as it enters.
- **Mechanics:** `filter: blur(12px)` to 0 plus a slight scale-settle. Keep blur under 20px (performance budget).
- **Fit:** editorial, grounded. **Cost:** S.
- **Trigger:** IO or CSS-SDA.
- **Reduced motion:** opacity-only.

---

## Assignment heuristics

- Hero gets the most articulate pattern the personality allows; everything below the fold defaults to pattern 1 unless a section earns more.
- Two adjacent sections never use the same non-base pattern (rhythm needs contrast).
- If a section's content is weak, no pattern will save it. Flag the content, do not decorate it.
