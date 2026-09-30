# Vocabulary Gates (M1 to M8)

Every COMPOSE_MOTION spec and every AUDIT_MOTION run is checked against all eight gates. State pass/fail per gate explicitly. A spec with any failing gate does not get presented, fix it first.

---

## M1: One personality
**Check:** Can you name the single personality, and does every spec row stay inside its NO list?
**Test:** Read each row against the personality's NO list in motion-personalities.md.
**Common failure:** a grounded site with one bouncy playful moment "for delight". That is two personalities. If the moment matters, change the moment, not the personality.

## M2: One scroll clock
**Check:** Does all scroll-driven motion derive from one progress model?
**Test:** Count scroll systems. A scrub library AND independent per-element observers with their own offsets AND a separate parallax plugin = three clocks.
**Why it is a gate:** coherence is the single biggest perceived-quality factor in motion. Pages where everything shares a clock feel alive; pages with mixed clocks feel like widgets.
**Fix:** pick one driver (see handoff-spec.md library logic) and express everything through it. IO enter-triggers for time-based reveals plus one scrub driver for scrubbed motion is acceptable (two trigger types, one clock for anything continuous).

## M3: Token compliance
**Check:** Does every duration, easing, distance, and stagger reference the token block?
**Test:** grep the spec (or code) for raw ms values and cubic-bezier values that are not token definitions.
**Common failure:** "300ms felt better here." Then change the token or accept the system value. One-off values are how coherence dies over ten edits.

## M4: Motion has a job
**Check:** Can every row name its job in one clause: entrance hierarchy, feedback, spatial continuity, or narrative?
**Common failure:** "engagement." Engagement is not a job, it is a hope. Cut the row.

## M5: Budget respected
**Check:** Exactly one signature moment, at most three supporting accents, everything else base reveal?
**Common failure:** three sections each doing something special. Three moments = zero moments. Demote two.

## M6: Performance
**Check:** transform, opacity, clip-path only. will-change applied only while animating. Blur effects under 20px. No animation of layout properties anywhere.
**Test:** DevTools performance trace while scrolling; zero layout/reflow entries attributable to animation; steady frame rate at 4x CPU throttle.
**Common failures:** animating height for accordions (use grid-template-rows or transform), box-shadow transitions on hover (pre-render two shadows, crossfade opacity), permanent will-change on dozens of elements.
**Ownership:** this is the direction-level performance contract. The implementation specifics (per-library technique, exact throttle profiles, scroll-driver wiring) live in animation-craft; this gate states the rule, animation-craft K4/K6 enforce it in code.

## M7: Reduced motion complete
**Check:** Every spec row has a designed reduced-motion variant, and the global no-preference wrapper exists.
**Standard:** build no-motion-first. Wrap motion in `@media (prefers-reduced-motion: no-preference)` rather than overriding after the fact. Anything autoplaying, moving longer than 5 seconds (marquees, ambient video, loops) needs a visible pause control regardless of OS settings (WCAG 2.2.2 pause-stop-hide).
**Common failure:** `* { animation: none !important }` as the entire strategy. That is disabling, not designing. Content must still arrive with hierarchy (opacity sequencing is fine, it is not motion).

## M8: Paired elements share timing
**Check:** Elements that move as a unit (modal + overlay, card + its shadow, headline + subhead in one beat) use identical duration and easing.
**Common failure:** drawer at 300ms expo-out, its backdrop at 200ms linear. Reads as two objects, breaks the illusion of one surface.

---

## Global NO list (applies over every personality)

- No scroll hijacking (changing scroll speed or snapping the wheel against the user).
- No entrance animations over 1.2s, ever, in any personality.
- No ease-in on entrances (delays feedback, feels sluggish).
- No animating interactions a visitor performs constantly (primary nav open on a docs site, search focus). High-frequency = no animation.
- No autoplay motion in more than two viewports simultaneously.
- No motion that gates content (visitor must be able to read everything even if every animation fails to fire).

## Quick YES list (safe in any personality)

- Fade-rise base reveal with personality tokens.
- Hover feedback under 200ms on interactive elements.
- Number roll on a proof section, once.
- Opacity-led hierarchy on load (hero first, supporting second).
