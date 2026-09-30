# Sizing System

Exact values for BUILD. Three reference viewports: 375 (mobile), 768 (tablet), 1280 (desktop). Values are Tailwind-first with raw CSS equivalents. Deviating from a default requires a stated reason in a code comment.

## 1. Containers

| Role | Class | Width |
|---|---|---|
| Standard content | `max-w-[1200px] mx-auto` (or `max-w-7xl` = 1280px) | pick ONE per project, use everywhere |
| Narrow text (FAQ, advertorial, legal) | `max-w-[760px] mx-auto` | reading column |
| Text measure inside any section | `max-w-[68ch]` | never let body copy run container-wide |
| Hero centered copy | `max-w-[820px]` | |
| Breakout visual | `max-w-[1320px]` or `w-full` | screenshots, bento, showcase media |
| Page gutters | `px-6` at 375, `px-8` at 768+, optional `px-12` at 1536+ | applied on the container |

Rule: full-bleed sections still place their inner content on the standard container. The background bleeds, the grid does not.

## 2. Vertical rhythm (the anti-uniform-padding law)

Uniform `py-24` on every section is the #1 tell of generated pages. Padding scales with section weight:

| Section weight | Desktop | Mobile | Examples |
|---|---|---|---|
| Rail | `py-10` to `py-12` | `py-8` | proof bar, press rail, stats rail |
| Standard | `py-24` | `py-16` | feature grids, testimonials, FAQ, pricing |
| Feature moment | `py-32` | `py-20` | bento, showcase, comparison, spotlight |
| Editorial break / final CTA | `py-28` to `py-36` | `py-20` | manifesto, close |
| Hero | `pt-[96px]` nav offset + `pb-20` to `pb-32` | `pt-[72px] pb-16` | |

Rhythm rule: alternate compressed and expansive. A page should read like 10/32/24/12/32/24/28, never 24/24/24/24. Adjacent sections sharing a background color need a divider, a tint shift, or >= 160px combined whitespace between content blocks, otherwise they smear into one.

## 3. Grid and splits

- Base: 12-column grid, `gap-6` (24px) default, `gap-8` (32px) for cards with imagery, `gap-4` (16px) inside bentos.
- Asymmetric splits are the default: `7/5` (col-span-7 + col-span-5) for hero and feature rows, `8/4` for featured + sidebar shapes, `5/7` reversed on alternating rows.
- `6/6` only when both sides carry equal visual weight (e.g. before/after).
- Alternate split direction on consecutive split sections; never two same-direction splits adjacent.
- Card grids: 3-col at 1280, 2-col at 768, 1-col at 375. Bentos: anchor cell `col-span-2 row-span-2`; at 375 all bento cells stack full-width, anchor first.
- Grid-breaking (deliberate, max 1 or 2 per page): one element extends past the container by 48 to 96px (`-mr-12` to `-mr-24`), or an image bleeds to the viewport edge on one side only.

## 4. Type scale

Fluid via clamp. Define once as utilities/tokens, never one-off sizes mid-page.

| Token | Value | Use |
|---|---|---|
| display | `clamp(2.75rem, 6vw, 5rem)` `leading-[1.05]` `tracking-[-0.02em]` | hero H1 only |
| display-xl | `clamp(3.5rem, 9vw, 8rem)` `leading-[0.95]` `tracking-[-0.03em]` | editorial hero / signature type moment |
| h2 | `clamp(1.875rem, 4vw, 3rem)` `leading-[1.1]` `tracking-[-0.01em]` | section headings |
| h3 | `clamp(1.25rem, 2vw, 1.5rem)` `leading-snug` | card titles, step titles |
| eyebrow | `text-[13px] font-medium uppercase tracking-[0.08em]` | above H2s, accent color |
| body-lg | `text-lg leading-relaxed` (18/29) | subheads, intro paragraphs |
| body | `text-base leading-relaxed` (16/26) | default copy |
| caption | `text-sm leading-normal` muted | labels, trust anchors, captions |
| stat | `text-5xl`-`text-8xl` `font-semibold tabular-nums tracking-tight` | stats bands |

Hierarchy law: each section has exactly one dominant element. If the heading and the visual fight, shrink one. Heading-to-body ratio within a section should be >= 2.5x for moments, ~2x for standard sections.

Section heading block: eyebrow `mb-3`, H2 `mb-4`, lead `mb-12` to `mb-16` before content. Left-align headings in split/asymmetric sections; centered headings only on stack sections (and never more than ~half the page centered).

## 5. Components

- Buttons: primary `h-12 px-6 rounded-lg text-[15px] font-medium` (mobile full-width `w-full`), hero may use `h-14 px-8`. Secondary = ghost/outline same height. CTA pairs: `gap-3`, never two solid primaries.
- Cards: `p-6` (dense) to `p-8` (standard) to `p-10` (premium borderless). Radius system: pick one family, e.g. cards `rounded-2xl`, buttons/inputs `rounded-lg`, media `rounded-xl`; never mix radius families randomly.
- Inputs: `h-12`, label above, inline form (email + button) collapses to stacked at 375.
- Icons: 20px inline, 24px feature-grid, 40 to 48px only inside icon containers (`size-12 rounded-lg bg-accent/10`).
- Tap targets at 375: minimum `44px`; nav links, accordion rows, and footer links included.

## 6. Imagery sizing

| Use | Aspect | Notes |
|---|---|---|
| Hero product/UI | `aspect-[4/3]` or `aspect-[16/10]` | crop to the meaningful region, not the full app |
| Showcase screenshot | `aspect-[16/10]` in browser frame | `rounded-xl border shadow-[0_24px_64px_-24px_rgb(0_0_0/0.25)]` |
| Card thumbnails | `aspect-[4/3]` uniform within a grid | mixed aspects inside one grid is a defect |
| Avatars | `size-10` walls, `size-14` spotlight | |
| Full-bleed bands | `min-h-[60vh]` to `min-h-[75vh]` | with scrim for text contrast |

## 7. 375px laws

1. No horizontal overflow, ever. Marquees and scroll rails use `overflow-x-clip` on the page and intentional `overflow-x-auto` + `snap-x` on the rail only.
2. Hero triage: eyebrow, headline (`clamp` floor ~2.25rem), one-line subhead, single primary CTA, trust line. Cut the rest.
3. Stack order may differ from desktop DOM order when meaning demands (visual-first sections flip to copy-first).
4. Type floors: body never below 16px, captions never below 13px.
5. Section padding ~0.6x desktop; rails stay thin.
6. Tables (comparison matrix) become stacked cards or horizontally scrollable with a visible edge hint.

## 8. Common sizing defects (auto-fail in EVALUATE)

- Uniform `py-24` (or anything uniform) across all sections.
- Body copy at full container width (no measure).
- Forced `h-screen` hero with content overflow at 375 or on short laptops.
- 6/6 splits everywhere; zero asymmetry on the page.
- One-off font sizes that exist nowhere in the scale.
- Card grids where images have inconsistent aspect ratios.
- Centered everything: every section heading centered, every block symmetric.
