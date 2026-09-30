# Component Map

The component map is how section IDs survive the trip from spec to code (W3). Every row of the LAYOUT SPEC gets a component; every component points back at its row. Six months later, anyone can diff the live site against the spec.

## Core set

Every project starts with these eight. Project-specific components get added per spec, never invented ahead of need.

| Component | Job |
|---|---|
| Button | All CTA variants (primary, secondary, ghost), all states, one place |
| Type primitives | Heading, Body, Eyebrow, Caption: the type scale made unavoidable |
| Nav | Header, mobile menu, scroll behavior per MOTION SPEC |
| SectionShell | Owns vertical rhythm (`--space-section`), max-width, background variants. Every section renders inside one |
| Card | The repeated unit: features, posts, testimonials are variants of it |
| Hero | The one component allowed bespoke treatment per page |
| Footer | Sitemap links per marketing-site-architecture, legal, last CTA |
| FormField | Input, label, error, success: conversion spec decides where forms appear; this decides how they behave |

Rule: **variants over new components.** A testimonial card is `Card variant="quote"`, not `TestimonialCard`. New top-level components need a job no existing component can absorb.

## Component brief format

One brief per component, written before code:

~~~
COMPONENT: <name>
JOB: <one sentence>
SERVES: <section IDs from the LAYOUT SPEC>
PROPS: <each prop + which spec row supplies its value>
TOKENS: <the tokens it consumes; raw values banned (W2)>
MOTION: <the MOTION SPEC row that applies, by reference, or "static">
STATES: <hover / focus / active / disabled / loading / error, each specced>
~~~

The STATES line is where generic builds die. A Button with an unspecced focus state gets whatever the framework defaults to, and the framework's taste is nobody's taste.

## The map

~~~
COMPONENT MAP: <page>
| Section ID | Component | Spec source | Motion ref | Notes |
|---|---|---|---|---|
| #1 Hero | Hero | LAYOUT SPEC row 1 | MOTION SPEC row 1 | BEAT SHEET loop mounts here; reserve the slot |
| #12 Logo strip | Card variant="logo" in SectionShell | LAYOUT SPEC row 2 | static (deliberate) | CONVERSION SPEC: proof above the fold |
| #7 Feature triptych | Card variant="feature" x3 | LAYOUT SPEC row 3 | MOTION SPEC row 3 | stagger handled by implementation skill |
| #22 Comparison table | ComparisonTable (new) | LAYOUT SPEC row 4 | enter-only | new component justified: no variant absorbs a table |
~~~

Every row in the LAYOUT SPEC appears exactly once. A spec row with no component is unbuilt scope; a component with no spec row is invented scope (W1). Both are findings in AUDIT.

## Traceability in code

- Component file headers carry their section IDs: `// Serves: #1 Hero (LAYOUT SPEC row 1)`.
- SectionShell takes a `sectionId` prop rendered as a `data-section` attribute, which makes live-site audits a DOM query instead of archaeology.

## Rules that keep maps honest

- SectionShell owns all vertical spacing. If a section needs custom rhythm, that is a spec change, not a one-off margin.
- The Hero is the only component allowed to break the shell's grid, because marketing-page-layout sizes heroes individually.
- Props carry content, tokens carry style, the MOTION SPEC carries movement. A prop named `animationDelay` on a Card is a W6 leak.
- If two pages need the "same" section with different behavior, that is two spec rows and one component with a variant, decided in the map, not at build time.
