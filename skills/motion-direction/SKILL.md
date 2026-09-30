---
name: motion-direction
description: Art direction for website motion. Use when deciding how a site or page should move, choosing a motion personality, writing a motion spec before any animation is built, or auditing the motion on a live page. Trigger phrases include "motion direction", "how should this page move", "animation direction", "motion personality", "motion spec", "the animations feel random", "audit the motion on this site".
---

# motion-direction

This skill is the art-direction layer for motion. It decides HOW a site moves before anyone writes an animation: which personality, where the signature moment lives, what never moves. It does not own easing-curve craft or spring physics, that belongs to an implementation animation skill. It does not own which sections exist, that belongs to a layout skill. It does not own self-contained product story loops (a hero demo with a plot), those belong to a story choreography skill and arrive as a BEAT SHEET; the spec reserves their slot and directs how the page moves around them. It owns coherence.

The most common motion failure on marketing sites is not bad easing. It is incoherence: every section animating differently, motion with no job, three energy levels fighting on one page. Award-tier motion reads as one mind making every decision.

## Stay in lane

This skill owns the art direction of motion: the personality, the scroll clock, where the one signature moment lives, what each section does on reveal, and what never moves. It writes the MOTION SPEC before any animation is built.

| For | Use |
|---|---|
| Which sections exist, their order, shapes and sizing | `marketing-page-layout` (`/mk-page`) |
| A self-contained hero or demo loop that tells one product story in timed beats | `product-choreography` (`/mk-story`) |
| Easing curves, springs, timing code, input feel and latency, per-platform implementation | `animation-craft` (`/mk-anim`) |
| Performance budget and how the spec is wired into the build | `web-build` (`/mk-build`) |

Where the edges touch: this skill names a personality and a reveal per section, and `animation-craft` turns those into curves and code. It references `marketing-page-layout`'s section IDs rather than inventing its own. Anything the viewer drives directly, a press, a drag, a scroll-linked control, is feel, and belongs to `animation-craft`'s feel reference.

## Hard rules

1. **One personality per site.** Pick one of the five personalities in references/motion-personalities.md and stay in it. Campaign pages may shift intensity (more or less motion), never personality.
2. **One scroll clock.** All scroll-driven motion derives from one progress model. Never mix two scroll systems (for example a scrub library plus separate per-element observers with their own timing) on one page.
3. **Spec before code.** No animation gets built without a COMPOSE_MOTION spec. The spec is the taste document, the build is mechanical.
4. **Tokens only.** Every duration, easing, distance, and stagger in the spec comes from the personality token block. No inline magic numbers.
5. **Motion must have a job.** Entrance hierarchy, interaction feedback, spatial continuity, or narrative. If you cannot name the job in one clause, cut the motion.
6. **Budget.** One signature moment per page, at most three supporting accents. Everything else uses the base reveal.
7. **Composited properties only.** Animate transform, opacity, and clip-path. Never layout properties (width, height, margin, padding, top, left).
8. **Reduced motion is a design deliverable.** Every spec row names its reduced-motion variant. The reduced experience is designed, not just disabled.

## Mode routing

| User intent sounds like | Mode |
|---|---|
| "How should this site move", "give me a motion direction/spec" | COMPOSE_MOTION |
| "Implement this spec", "add the animations", "build the motion" | BUILD_MOTION |
| "Audit/review the motion on this page", "why does this feel off", "steal what works from this site's motion" | AUDIT_MOTION |

If the user asks for animation on a page with no spec, run COMPOSE_MOTION first (fast, one approval) rather than building unspecified motion.

## COMPOSE_MOTION

1. **Read the context.** Brand temperature (serious to brash), audience, page archetype, content density, and what the layout spec says exists (use section IDs if a layout spec is present).
2. **Propose exactly two personality candidates** from references/motion-personalities.md. For each: one sentence on why it fits, one sentence on the risk. Wait for the user to pick. Do not propose three or more, deliberation needs a real choice, not a menu.
3. **Place the signature moment.** Pick one from references/signature-moments.md that embodies the brand claim. State why it is earned and what it costs. If the signature moment is a self-contained product story loop, do not write its beats here: route the story to the choreography skill (BEAT SHEET), mark the spec row as `signature: external loop, see BEAT SHEET`, and keep the rest of the page subordinate to it.
4. **Write the spec** using the exact format in references/handoff-spec.md: header, token block, per-section table. Assign every section a pattern from references/reveal-language.md.
5. **Run the gates.** Check the spec against all eight gates in references/vocabulary-gates.md. State pass/fail per gate. Fix failures before presenting.
6. **Present the spec** with a 3-sentence rationale. Stop. Do not build.

### Worked example (condensed)

Request: "Motion direction for a B2B fintech landing page, serious brand, modern, product is an API."

Candidates offered: **grounded** (calm confidence matches a trust-critical buyer; risk: forgettable if the type and layout are also quiet) vs **kinetic** (energy differentiates in a beige category; risk: undermines trust if the page must carry compliance weight). User picks grounded.

Signature moment: number-roll proof band (stats count up once on first view). Earned because the page's strongest asset is usage numbers, and grounded sites win by making proof feel inevitable rather than loud.

Spec output (excerpt):

~~~
PERSONALITY: grounded | SCROLL CLOCK: viewport-enter, no scrub | SIGNATURE: number-roll proof band

TOKENS
--ease-primary: cubic-bezier(0.215, 0.61, 0.355, 1);  /* ease-out-cubic */
--ease-hover: ease;
--dur-fast: 150ms; --dur-base: 250ms; --dur-slow: 400ms;
--rise: 16px; --stagger: 40ms;

| Section | Trigger | Pattern | Tokens | Reduced motion |
|---|---|---|---|---|
| Hero | load | fade-rise, headline then sub then CTA | dur-slow, rise, stagger | opacity-only crossfade |
| Logo band | enter | fade only, no rise | dur-base | static |
| Feature grid | enter | fade-rise by row | dur-base, stagger per row | opacity-only |
| Proof band | enter once | number roll (SIGNATURE) | dur-slow per digit | final values static |
| CTA | enter | fade-rise | dur-base | opacity-only |
~~~

Gates: M1 pass (one personality) ... M7 pass (every row has a reduced variant). Presented, awaiting approval.

## BUILD_MOTION

Requires an approved spec. Never invent direction in this mode.

1. **Choose the implementation stack** using the decision logic in references/handoff-spec.md (CSS scroll-driven first, single --progress driver for editorial coherence, GSAP only when pinning/scrubbing earns it, Motion for React state UI).
2. **Define the scroll clock implementation** and where the token block lives (one CSS custom-property block at :root).
3. **Scaffold per section** in spec order. Each scaffold: trigger wiring, pattern implementation, reduced-motion variant, and a one-line comment naming the spec row it implements.
4. **Performance pass** per the budget in references/handoff-spec.md (composited properties, will-change hygiene, 4x CPU throttle test).
5. **Self-check** against gates M6 and M7 before declaring done.

If the implementation animation skill is installed, hand it the spec and let it own step 3 details (curve values, springs). This skill still owns steps 1, 2, and 5.

## AUDIT_MOTION

Follow the full procedure in references/motion-audit.md. Summary:

1. **Declare intent**: self-audit (gate compliance on our own page), competitor read (what their motion strategy says), or inspiration mining (extract reusable moves).
2. **Run the five observation passes**: load, slow+fast scroll, pointer, reduced-motion emulation, performance trace.
3. **Score the seven dimensions** (1 to 5 each) and give a verdict: SHIP, NEEDS WORK, or REBUILD.
4. For inspiration mining, output PATTERN EXTRACT lines formatted for a craft-library EXTRACT intake if that skill is installed.

### Worked example (condensed)

Request: "Audit the motion on a competitor's pricing page, what is their strategy?"

Intent: competitor read. Passes: **load** (logo wipe, then staggered fade-rise, settled at about 900ms, clean), **scroll at two speeds** (a single enter-trigger system, no scrub, no parallax: an enter-only clock), **pointer** (magnetic CTA plus card tilt, only two behaviors, disciplined), **reduced-motion emulation** (everything still animates: M7 fail), **trace at 4x throttle** (one layout-attributed entry from an accordion animating height: M6 fail).

Read: grounded personality executed at about 80 percent. Their motion says "we are stable, the product is the hero." Verdict on their page: NEEDS WORK (M6, M7). Strategy takeaway: they leave craft on the table at exactly the gates a visitor cannot name but can feel. Passing M6 and M7 on our page is cheap differentiation.

## Reference routing

| File | Used by | Contents |
|---|---|---|
| references/motion-personalities.md | COMPOSE_MOTION | The five personalities with full token blocks, references, NO lists |
| references/reveal-language.md | COMPOSE_MOTION, BUILD_MOTION | The reveal pattern catalog with fallbacks |
| references/signature-moments.md | COMPOSE_MOTION | Hero-moment catalog with earned-when and cost |
| references/vocabulary-gates.md | All modes | Gates M1 to M8 with tests and fixes |
| references/handoff-spec.md | COMPOSE_MOTION, BUILD_MOTION | Spec format, library decision logic, performance budget |
| references/motion-audit.md | AUDIT_MOTION | Observation protocol, scoring, output formats |
