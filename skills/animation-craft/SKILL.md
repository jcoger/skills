---
name: animation-craft
description: Implementation craft for UI and web animation. Use when implementing a MOTION SPEC, writing CSS, JS, SwiftUI, or React Native (Reanimated, Skia) animation code, building programmatic video with Remotion or HyperFrames, adding transitions or hover states, reviewing animation code, or fixing animation that feels wrong. Trigger phrases include "implement this motion spec", "animate this", "build this animation", "add a transition", "review my animation code", "this animation feels off", "this feels sluggish", "make this feel premium", "the press feels mushy", "drag lags behind my finger", "add haptics", "make a video of this", "build this in Remotion".
---

# animation-craft

This is the implementation layer for motion. A direction skill (motion-direction) decides WHAT moves, WHERE the signature moment lives, and WHICH pattern each section uses. This skill makes those decisions move well in code: easing, duration, springs, triggers, performance, accessibility.

Stay in lane:
- Do not invent new animated moments that are not in the spec or the request.
- Do not reorder or restyle page sections. That belongs to a layout skill.
- If no spec exists and the request is vague ("add some animations"), ask the four intake questions below instead of decorating everything.

## Craft gates (K1 to K9)

Every animation this skill writes or approves passes K1 to K8. Anything a person presses, drags, scrolls, swipes, or snaps also passes K9. Cite gates by ID in reviews.

- **K1. Easing matches role.** Enter/exit: ease-out. On-screen movement or morph: ease-in-out. Hover and color: ease. Constant motion (marquee, ticker): linear. ease-in for UI: never, it delays feedback.
- **K2. Duration matches size and role.** Micro-interactions 100-150ms. Standard UI (tooltips, dropdowns) 150-250ms. Modals and drawers 200-300ms. UI stays under 300ms; only marketing-page moments may exceed it. Exits run about 20 percent faster than entrances. Bigger elements move slower than small ones.
- **K3. Frequency rule.** Interactions used 100+ times a day get no animation, or nearly none. Command palettes, tab switches, keyboard-initiated actions: instant. Rare and first-run moments may be special.
- **K4. Compositor properties only.** Animate transform, opacity, and clip-path. Never layout properties (width, height, padding, margin, top/left). Accordion heights via the grid-template-rows trick or transforms. Blur stays under 20px.
- **K5. Paired elements move as a unit.** Modal + overlay, tooltip + arrow, drawer + backdrop share easing and duration exactly.
- **K6. Reduced motion is a fallback, not a slowdown.** Every animation has a prefers-reduced-motion (web), accessibilityReduceMotion (SwiftUI), or useReducedMotion (React Native) branch: none, or an opacity-only crossfade. Never just slower. Haptics may remain.
- **K7. Entrances are anchored.** Scale entrances start at 0.95, not 0. transform-origin matches the trigger location. Elements never appear from nowhere or from the wrong direction.
- **K8. State-driven motion is interruptible.** UI that responds to user state uses transitions or springs that retarget mid-flight (CSS transitions, Motion springs, SwiftUI springs), not fixed keyframe sequences that restart from zero.
- **K9. Input feel closes the loop.** Press feedback shows on touch-down, visible on the first frame. Drag tracks 1:1 with no easing, on the same frame as the input. Release hands velocity to a spring. Haptics are semantic, synced, and fire once. Targets: tap feedback under 40 ms, drag within 1 frame (8.3 ms at 120 Hz), web INP at or under 200 ms at p75. The lettered checks K9a to K9l are in references/feel.md.

On video surfaces (Remotion, HyperFrames), K2, K3, K6, and K8 translate differently; the gate translation table in references/video-craft.md is authoritative there.

## Mode routing

| Prompt looks like | Mode |
|---|---|
| A MOTION SPEC or BEAT SHEET block, or "implement / build / animate this" | IMPLEMENT |
| Code plus "review / check / critique" | REVIEW |
| "Feels off / sluggish / cheap / janky / too much" | TUNE |

Platform routing: web work reads references/web-craft.md; SwiftUI work reads references/swiftui-craft.md; React Native work (Reanimated, Gesture Handler, Skia) reads references/react-native-craft.md; programmatic video work (Remotion, HyperFrames) reads references/video-craft.md; anything spring-related reads references/spring-physics.md; anything a person presses, drags, swipes, or snaps, and any haptic, reads references/feel.md; anything scroll-triggered, scrubbed, or page-transition on the web reads references/scroll-tech.md. React Native scroll motion lives inside react-native-craft.md, not scroll-tech.md.

## IMPLEMENT

**With a MOTION SPEC** (the normal case):
1. Read the spec header: personality, scroll clock, signature moment. The scroll clock decides the trigger technology for the whole page (see scroll-tech.md). Never mix two continuous scroll models.
2. Convert the TOKENS block to code tokens (CSS custom properties or a constants file) before writing any animation. All durations and easings reference tokens, never inline values.
3. Implement row by row. The pattern name in each row is the contract; do not substitute a different pattern. Fill every reduced-motion cell as written.
4. Respect the NOTES block, especially mobile variants and the deliberately-static list. Static means static.
5. Gate-check the result against K1 to K8 (plus K9 for interactive controls) and state it: "Gates: K1-K8 pass, K9: a-l pass" or name the exception and why the spec demands it.

**With a BEAT SHEET** (from a story or choreography skill): same discipline as a MOTION SPEC. Time ranges become tokens or frames, feel words map to spring tokens, one mover per beat is preserved, and the STATIC line is enforced. Medium `video` routes to references/video-craft.md.

**Without a spec**, ask four questions, then default to restraint:
1. Marketing page or product UI? (Product UI: K2 and K3 dominate, almost everything is 150-250ms ease-out.)
2. How often will users see it?
3. What is the one moment that deserves the budget?
4. Any existing duration/easing tokens to match?

### Worked example (spec row to code)

Spec row: `| Features (#12) | enter-once | fade-rise | dur-base, ease-primary | 80ms/card | opacity-only |`

~~~css
.feature-card {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity var(--dur-base) var(--ease-primary),
              transform var(--dur-base) var(--ease-primary);
  transition-delay: calc(var(--card-index) * 80ms);
}
.feature-card.is-inview { opacity: 1; transform: none; }

@media (prefers-reduced-motion: reduce) {
  .feature-card { transform: none; transition: opacity var(--dur-base) ease; }
}
~~~

~~~js
// enter-once: unobserve after first trigger
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("is-inview");
      io.unobserve(e.target);
    }
  }
}, { rootMargin: "0px 0px -10% 0px" });
document.querySelectorAll(".feature-card").forEach((el, i) => {
  el.style.setProperty("--card-index", i % 3); // stagger resets per row
  io.observe(el);
});
~~~

Note the craft details that make this pass review: enter-once unobserves, stagger index resets per visual row so the third row does not wait 720ms, rootMargin fires slightly before the element is centered, and reduced motion gets a pure crossfade.

## REVIEW

Review animation code or a built component against the gates. Output format is mandatory: a single markdown table with Before and After columns, one row per issue, each row citing a gate. Never a prose list of before/after pairs.

| Before | After | Gate |
|---|---|---|
| `transition: all 400ms ease-in` | `transition: transform 200ms var(--ease-out-cubic), opacity 200ms var(--ease-out-cubic)` | K1, K2, K4 (`all` catches layout props) |
| `transform: scale(0)` entrance | `transform: scale(0.95)` + `transform-origin: top right` (trigger corner) | K7 |
| Modal 200ms, overlay 300ms | Both 200ms, same easing token | K5 |
| No reduced-motion branch | `@media (prefers-reduced-motion: reduce)` opacity-only | K6 |

After the table, give a one-line verdict: SHIP, or the two highest-impact rows to fix first.

## TUNE

"Feels off" has a small number of real causes. Diagnose from symptom before touching code:

| Symptom | Likely cause | Fix |
|---|---|---|
| Sluggish, laggy | ease-in or linear on UI; duration over 300ms; animation on a 100+/day action | K1 easing swap; K2 duration cut; K3 remove it |
| Cheap, generic | Default `ease` everywhere; everything fades the same; no anchor | Stronger ease-out (quint/expo) on the one moment that matters; vary distance not duration |
| Janky, stuttery | Layout property animation; blur over 20px; main-thread scroll handler | K4; move to compositor props; see scroll-tech.md |
| Floaty, disconnected | Duration too long for travel distance; bounce on non-playful UI | Match duration to distance; bounce to 0-0.2 |
| Abrupt, popping | No exit animation; scale from 0; missing transform-origin | K7; add 20 percent faster exit |
| Restarts mid-gesture | Keyframes on state-driven UI | K8; switch to transitions or springs |
| Mushy press, drag trails the finger | Feedback on click/onPress instead of touch-down; eased or re-rendered drag; main-thread work in the input path | K9; see references/feel.md |

Fix the diagnosed cause only. Tuning is not an invitation to redesign the motion. If the real problem is direction (wrong moments animated, no hierarchy), say so and route to motion-direction.

## Reference routing

| File | Read when |
|---|---|
| references/web-craft.md | Any CSS/JS implementation: tokens, fixes, library decision tree |
| references/swiftui-craft.md | Any SwiftUI implementation: presets, transitions, haptics |
| references/react-native-craft.md | Any React Native implementation: Reanimated 4 (CSS API and worklets), Gesture Handler, Skia canvas and shaders |
| references/video-craft.md | Remotion or HyperFrames work: frame-deterministic animation, beat pacing, render hygiene |
| references/spring-physics.md | Choosing or tuning springs on either platform; CSS linear() springs |
| references/scroll-tech.md | Scroll triggers, scrub, parallax, page transitions, mobile motion |
| references/feel.md | Input feel on any surface: latency thresholds, press, drag, scroll, swipe, snap, haptics, frame budgets at 120 Hz, K9 checks |

## Sources

- Steve Swink, *Game Feel: A Game Designer's Guide to Virtual Sensation* (2008). Spine of references/feel.md; chapters cited there.
- Jota et al., CHI 2013, and Deber et al., CHI 2015, on touch latency perception. https://www.tactuallabs.com/papers/howMuchFasterIsFastEnoughCHI15.pdf
- Interaction to Next Paint. https://web.dev/articles/inp
- WWDC 2018, "Designing Fluid Interfaces." https://developer.apple.com/videos/play/wwdc2018/803/
- Full source list: references/feel.md.
