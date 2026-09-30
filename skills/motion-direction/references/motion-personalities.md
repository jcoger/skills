# Motion Personalities

Five personalities. Every site gets exactly one. The names deliberately match the craft-library mood tags (grounded, kinetic, editorial, playful, immersive) so an approved direction can pull library entries with zero translation.

Each personality defines: the feel, public reference points, a token block (use these exact values as the starting point, tune only with reason), what moves, what never moves, and a NO list. The NO list is the personality. Breaking it is changing personality, which violates gate M1.

---

## Grounded

**Feel:** Calm confidence. The product is the show, motion is hierarchy. Used by companies that win on trust and precision.
**References:** linear.app, paraform.com, stripe.com

~~~css
--ease-primary: cubic-bezier(0.215, 0.61, 0.355, 1); /* ease-out-cubic */
--ease-hover: ease;
--dur-fast: 150ms; --dur-base: 250ms; --dur-slow: 400ms;
--rise: 16px; --rise-max: 24px; --stagger: 40ms;
~~~

- **Moves:** entrances (fade-rise), hovers, the occasional number roll. Opacity-led, small distances.
- **Scroll behavior:** viewport-enter triggers only. Parallax limited to 2 to 4 percent ambient drift, or none.
- **Signature moment fit:** number roll, ambient background system, restrained product-UI reveal.
- **NO:** bounce, rotation, scroll scrubbing, marquees, type that flies, entrances over 500ms.
- **Failure mode to watch:** invisible. If layout and type are also quiet, the page is forgettable. Fix in layout, not by adding motion.

---

## Kinetic

**Feel:** Energy as brand. Type is the show, scroll has momentum, the page feels like it wants to move. For brands selling speed, money, or culture.
**References:** cash.app (anchor), ugly.cash (the outer boundary, do not cross it)

~~~css
--ease-primary: cubic-bezier(0.19, 1, 0.22, 1); /* expo-out */
--ease-exit: cubic-bezier(0.7, 0, 0.84, 0);
--dur-fast: 200ms; --dur-base: 400ms; --dur-slow: 700ms;
--rise: 60px; --rise-max: 120px; --stagger: 60ms;
~~~

- **Moves:** oversized type (rise, mask reveals, kinetic scale), velocity-reactive skew, marquees, slide-off transitions.
- **Scroll behavior:** scrub is allowed and often central. Fast scroll should look intentional (velocity effects), not janky.
- **Signature moment fit:** kinetic type hero, rendered object scrub, slide-off transitions, velocity-reactive elements.
- **NO:** slow polite fades, 150ms timid entrances, tiny 8px rises. The failure mode is restraint, which reads as broken energy.
- **Boundary:** ugly.cash-style anti-design collision is the ceiling. Past it, the page stops converting.

---

## Editorial

**Feel:** Content breathing. Slow, deliberate, restrained luxury. Motion never decorates, it paces reading. For studios, photography, premium DTC, health brands with calm authority.
**References:** koto.com, functionhealth.com, high-end photography portfolios

~~~css
--ease-primary: cubic-bezier(0.19, 1, 0.22, 1);   /* expo-out, long organic tail */
--ease-ui: cubic-bezier(0.455, 0.03, 0.515, 0.955); /* quad in-out, UI feedback */
--dur-fast: 300ms; --dur-base: 700ms; --dur-slow: 1100ms;
--rise: 32px; --stagger: 150ms;
--drift-fast: -0.08; --drift-slow: 0.04; /* counter-scroll speed range */
~~~

- **Moves:** translation only. Clip-wipe image reveals, word-row splits, counter-scroll image drift, split-title convergence.
- **Never:** scale, rotation, bounce. All motion is translational, this is the personality's defining constraint.
- **Scroll behavior:** the strongest fit for the one-scroll-clock pattern, a single progress value driving every drift so the whole page breathes together.
- **Signature moment fit:** load counter sequence, split-name convergence, page transition wipe, multi-speed image grid.
- **NO:** snappy anything, scale-ins, springs, durations under 300ms outside UI feedback.

---

## Playful

**Feel:** App-like delight. Springy, tactile, a little self-aware. For consumer apps and brands whose product personality IS the pitch.
**References:** flighty.com, family.co

~~~css
/* Spring-led: express as spring(duration, bounce), fall back to curves */
--spring-base: 350ms / bounce 0.25;
--spring-big: 600ms / bounce 0.4;
--ease-fallback: cubic-bezier(0.34, 1.56, 0.64, 1); /* back-out */
--dur-fast: 150ms; --stagger: 50ms;
~~~

- **Moves:** scale and rotation allowed, overshoot is the signature. Draggables, cursor-reactive elements, icon micro-moments.
- **Scroll behavior:** enter triggers with spring settles. Scrub sparingly, springs and scrub fight each other.
- **Signature moment fit:** draggable canvas, cursor-reactive layer, device-frame product moments with spring physics.
- **NO:** solemn 1s fades, parallax gravitas, more than one bouncing thing in view at once.

---

## Immersive

**Feel:** Page as theater. Scroll is the timeline, the visitor is scrubbing a film. For launches, 3D products, award plays.
**References:** lusion.co, award-show site-of-the-day WebGL work

~~~css
/* Progress-driven: durations mostly do not apply, motion maps to scroll progress */
--scrub-smoothing: 0.08; /* lerp factor for scrub catch-up */
--dur-ui: 250ms; /* only non-scrubbed UI feedback */
~~~

- **Moves:** sticky pin theaters, scrubbed 3D objects, scene transitions, camera moves.
- **Scroll behavior:** everything is on the scroll clock by definition. Time-based and scrubbed motion must never share a beat.
- **Signature moment fit:** rendered object scrub, sticky theater, page transition system. The whole page may be the signature moment, in which case the budget is one theater plus quiet sections, not three theaters.
- **NO:** mixing scrubbed and time-based motion in one viewport, shipping without a static fallback, scroll distances over 3x section height per scene (visitors abandon long scrubs).
- **Cost honesty:** this personality is an L-cost commitment. Recommend it only when budget and timeline support it.

---

## Selection logic

| Context signals | First candidate | Second candidate |
|---|---|---|
| B2B SaaS, trust-critical, dense product | grounded | editorial |
| Fintech consumer, culture brand, speed claim | kinetic | playful |
| Studio, portfolio, premium DTC, health | editorial | grounded |
| Consumer app, personality-led product | playful | kinetic |
| Launch, 3D product, award play, big budget | immersive | kinetic |

Always present two candidates with rationale and risk, then let the human pick. The wrong personality executed well is worse than the right one executed adequately.
