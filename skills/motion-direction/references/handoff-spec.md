# Handoff Spec

The contract between direction and build. COMPOSE_MOTION produces this document; BUILD_MOTION (or any implementation skill or human) consumes it without making taste decisions. If the builder has to choose a duration, the spec failed.

---

## Spec format

~~~
MOTION SPEC: <site/page name>
PERSONALITY: <one of five> | SCROLL CLOCK: <model> | SIGNATURE: <moment name>

TOKENS
<the personality token block, with any tuned values and one-line reasons for each tune>

| Section | Trigger | Pattern | Tokens used | Stagger | Reduced motion |
|---|---|---|---|---|---|
| Hero (#1) | load | masked line rise | dur-slow, ease-primary | 60ms/line | opacity-only |
| ... | | | | | |

NOTES
<anything the builder must know: mobile variants, content dependencies, what is explicitly NOT animated>
~~~

Rules:
- Section names reference layout-spec section IDs when a layout spec exists (for example "#7 sticky stack").
- Trigger is one of: load, enter (viewport), enter-once, scrub, hover, state (UI interaction).
- Pattern names come from reveal-language.md verbatim. Signature moment names come from signature-moments.md verbatim.
- Every row's reduced-motion cell is filled. "Same" is valid only for opacity-only rows.
- A LAST row lists what is deliberately static, naming non-motion is part of direction.

## Scroll clock models (pick one)

1. **enter-only:** no continuous scroll motion; IO or CSS-SDA enter triggers fire time-based reveals. (Typical: grounded, playful.)
2. **progress-driver:** one observer writes a `--progress` custom property (0 to 1) per tracked element; ALL continuous motion is CSS deriving from it. Zero dependencies, the most coherent parallax model. (Typical: editorial.)
3. **scrub-timeline:** a scrub library (or CSS-SDA `scroll()` timelines) owns continuous motion; enter reveals still allowed for non-scrubbed content. (Typical: immersive, kinetic.)

Never two continuous models on one page (gate M2).

## Library decision logic

Work down the list, stop at the first fit:

1. **CSS scroll-driven animations** (`animation-timeline: view()/scroll()`): reveals, parallax, progress bars. Off-main-thread, zero JS. Verify browser support for the audience; pair with an IO fallback or accept static in non-supporting browsers.
2. **IO + CSS classes:** time-based enter reveals with universal support. The workhorse for enter-only clocks.
3. **Custom progress driver (about 60 lines of JS):** the progress-driver clock. Choose when editorial coherence matters and dependencies should be zero.
4. **GSAP + ScrollTrigger:** pinning, scrub timelines, orchestrated multi-element sequences, image-sequence scrubs. The choice for immersive theaters. Costs bundle and license awareness; do not import it for fade-rises.
5. **Motion/Framer Motion:** React state-driven UI, layout animation, exit transitions, springs (playful personality in React apps).
6. **View Transitions API (native):** route and page transitions, crossfades, shared-element morphs, with zero dependencies. Prefer it over library page-transition systems; where unsupported, the fallback is an instant route change, which is always acceptable.

Mixing 4 and 5 on one page is allowed only when 4 owns scroll and 5 owns UI state, and they share no elements.

## Mobile motion rules

Mobile is not the desktop spec at a smaller size. Every spec's NOTES block must address these:

- **Hover does not exist.** Every hover row names its touch story: revealed by default, tap-to-toggle, or omitted. Gate hover work behind `@media (hover: hover) and (pointer: fine)`.
- **Cursor behaviors never ship on touch.** The layout must be complete without them.
- **The effect budget drops one tier.** L-cost moments need an explicit mobile variant or a static replacement. Shader and WebGL work defaults OFF below the laptop breakpoint unless the spec argues otherwise in writing.
- **Theaters get shorter.** Pinned scrub distance caps at 1.5x viewport on mobile (3x feels endless on a phone), or the theater unpins into stacked beats.
- **Distances and durations shrink.** Rise distances at 60 to 70 percent of desktop values; durations never exceed the desktop base tier (long motion feels slower on small screens).
- **Velocity effects off on touch.** Flick velocity is wild and unclampable in practice.
- **The test is a mid-range phone**, or 4x CPU throttle as a proxy. Sixty fps on mobile outranks any desktop flourish.

## Performance budget

- Animate transform, opacity, clip-path only. Accordion heights via grid-template-rows trick or transforms.
- will-change applied just before animating, removed after; never permanently on more than 3 elements.
- Blur under 20px; shadows crossfaded via pre-rendered layers, not transitioned.
- Image-sequence scrubs: WebP/AVIF frames, capped at viewport-appropriate resolution, preloaded on idle.
- Test: 4x CPU throttle scroll-through with a performance trace; zero animation-attributed layout entries; INP under 200ms.

## Acceptance checklist (run before handoff)

- [ ] All eight gates (M1 to M8) pass, stated explicitly.
- [ ] Every row's pattern exists in reveal-language.md.
- [ ] Signature moment is singular and connected to the brand claim in one sentence.
- [ ] Reduced-motion column complete; pause controls specified for any loop over 5s.
- [ ] Mobile behavior specified for every M/L-cost row (cursor and hover rows specify their touch story).
- [ ] The deliberately-static list exists.
