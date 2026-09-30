# Scroll Tech

Trigger technology for scroll-linked motion, plus page transitions and mobile rules. The MOTION SPEC's scroll clock decides which section of this file applies; never run two continuous scroll models on one page.

## Decision table

| Scroll clock (from spec) | Technology |
|---|---|
| enter-only | IntersectionObserver + CSS classes, or CSS-SDA `view()` for supporting browsers |
| progress-driver | One observer writing `--progress` custom properties; all motion is CSS |
| scrub-timeline | CSS-SDA `scroll()`/`view()` where it fits; GSAP ScrollTrigger for pinning and orchestration |

## CSS scroll-driven animations (CSS-SDA)

Zero JS, runs off the main thread. Supported in Chrome, Edge, and Safari 26+; Firefox is the remaining holdout (it is an Interop 2026 focus area, so check current support when you build).

~~~css
/* reveal on viewport entry */
@keyframes rise { from { opacity: 0; transform: translateY(24px); } }
.card {
  animation: rise var(--dur-base) var(--ease-out-cubic) both;
  animation-timeline: view();
  animation-range: entry 0% entry 60%; /* completes before fully in view */
}

/* scroll progress bar */
.progress {
  transform-origin: left;
  animation: grow auto linear both;
  animation-timeline: scroll(root);
}
@keyframes grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
~~~

Fallback pattern, progressive enhancement:

~~~css
/* static by default; animation only where supported */
@supports (animation-timeline: view()) {
  .card { animation: rise var(--dur-base) var(--ease-out-cubic) both;
          animation-timeline: view(); animation-range: entry 0% entry 60%; }
}
~~~

Or keep the IO implementation as the universal path and treat CSS-SDA as the upgrade. Either is acceptable; pick one strategy per project.

## The progress driver (editorial clock)

One small script (about 60 lines, zero dependencies) writes a `--progress` custom property (0 to 1) per tracked element from its viewport position; every continuous effect derives from it in CSS:

~~~css
.image-wrap img { transform: translateY(calc(var(--progress) * -6%)); }
.caption       { opacity: calc(var(--progress) * 1.4 - 0.2); }
~~~

Why choose it over a scrub library: every effect on the page shares one clock, so parallax layers, captions, and reveals stay in phase. Parallax distances stay small (-8 to +4 percent); parallax is seasoning, not the dish. Implementation rules: one `requestAnimationFrame` loop, reads batched before writes, observer disconnects when elements leave the tracked range.

## Scrub and pinning (GSAP ScrollTrigger)

Reserve for genuine theaters: pinned sequences, image-sequence scrubs, orchestrated multi-element timelines. Rules:

- Pin distance: 2-3x viewport desktop, capped at 1.5x on mobile, or unpin into stacked beats.
- Scrubbed values map to transform/opacity/clip-path only (K4).
- `scrub: true` or a small number (0.5-1) for slight smoothing; large smoothing values feel detached.
- Image sequences: WebP/AVIF frames, resolution capped to viewport, preloaded on idle.
- One ScrollTrigger timeline per theater; do not scatter dozens of independent triggers.

## View Transitions API (page transitions)

Native, zero-dependency route transitions.

- **Same-document (SPA):** `document.startViewTransition(() => updateDOM())`. Give moving elements `view-transition-name` for shared-element morphs.
- **Cross-document (MPA):** both pages opt in with CSS; works in Chromium and Safari, Firefox in progress. Fallback is an instant navigation, always acceptable.

~~~css
@view-transition { navigation: auto; }

::view-transition-old(root) { animation-duration: 200ms; }
::view-transition-new(root) { animation-duration: 240ms; }
~~~

Craft rules: default crossfade reads as polish at 200-250ms; shared-element morphs are signature-moment material, use one or two named elements, not ten. Respect reduced motion: wrap custom transition animations in the media query; the instant fallback is the reduced-motion behavior.

## Mobile rules (every implementation, not optional)

- Hover work gated behind `@media (hover: hover) and (pointer: fine)`; every hover effect has a touch story: visible by default, tap-to-toggle, or omitted.
- Cursor-following behaviors never ship on touch.
- Effect budget drops one tier on mobile; WebGL and shader work defaults off below the laptop breakpoint.
- Rise distances at 60-70 percent of desktop; durations never exceed the desktop base tier.
- Velocity-driven effects off on touch.
- Test on a mid-range phone or 4x CPU throttle. Sixty fps on mobile outranks any desktop flourish.

## Acceptance

Before calling scroll work done: full-page scroll-through at 4x throttle with a performance trace, zero animation-attributed layout entries, reduced-motion pass shows content without motion, and the deliberately-static list from the spec is still static.
