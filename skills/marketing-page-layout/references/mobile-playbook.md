# Mobile Playbook

Mobile is not derived from desktop. It is designed in the same pass. This file is the single source of truth for mobile rules across COMPOSE, BUILD, and EVALUATE so that mobile critique is one load, not a scavenger hunt.

## The 7 laws (binding)

1. **Design 375px in the same pass as 1280px.** Never mobile-last. The LAYOUT SPEC must note any section that reorders, collapses, or hides on mobile.
2. **Vertical rhythm multiplies by ~0.6, not 1.** `py-24` desktop -> `py-16` mobile. `py-32` -> `py-20`. Uniform desktop padding on mobile feels airless.
3. **Type scales with viewport, not at the breakpoint.** Use `clamp()` so type breathes between 375 and 1280. Never hard-swap font sizes only at a breakpoint.
4. **Tap targets >= 44px.** Buttons `h-12` (48px), nav links `py-3` minimum, inputs `h-12`. Two adjacent tap targets need >= 8px of separation.
5. **No horizontal overflow, ever.** Root is `overflow-x-clip`. Any breakout uses negative margin within the safe range (`-mx-6` matches the gutter, never wider).
6. **One column by default.** Asymmetric splits stack to single column. Bentos collapse to a vertical sequence with the anchor cell first. Grids reduce to 1 or 2 cols, never 3 below 640px.
7. **Imagery is re-cropped, not shrunk.** Lifestyle photos use a 4:5 mobile crop with focal point preserved. UI screenshots reframe to the most legible single panel. Stretching a 16:9 desktop hero into a 9:16 phone slot is a defect.

---

## Section-by-section triage

How each library section behaves on mobile. Use this table during COMPOSE (annotate MOBILE NOTES) and during BUILD (implement).

| Section family | Mobile move |
|---|---|
| Nav / header | Hamburger right, `size-10` tap target. Full-screen overlay drawer, stacked links `text-lg py-4`. Close button top-right. Never half-height slide-down. |
| Hero, split | Stack copy above visual. Headline `clamp(2.25rem, 10vw, 3rem)`. CTA pair becomes full-width primary + ghost link. |
| Hero, full-bleed / video | Keep media. Raise scrim opacity to 70%. Anchor copy bottom-left with safe-area padding. |
| Hero, editorial oversized | Type stays oversized (`clamp(2.75rem, 12vw, 4rem)`). The whole point is the type. |
| Hero, kinetic / interactive demo | Replace with a static framed shot at 375; live demos rarely survive mobile rendering. Note this as a known fallback. |
| Logo rail | Switch to a marquee even if desktop is static; 5 logos visible at 375px is impossible. |
| Feature grid, 3-col | Collapse to 1 col with `space-y-8`. If 6 features, use `grid-cols-2` of icon-only compact cards. |
| Feature zigzag | Single column, visual-first on every row; the alternation no longer reads on mobile. |
| Bento | Vertical stack, anchor cell first at full width, then satellites. Resist 2-col bento at 375. |
| Product showcase, full-bleed | Re-crop to a portrait or square; never letterbox a 16:9 into a phone slot. |
| Sticky step theater | Falls back to vertical timeline (8B); sticky behavior breaks on short viewports. |
| Tabbed demo | Becomes an accordion or a scroll-snap rail of tab panels. |
| Annotated hotspots | Hotspots become a captioned vertical list below the image; pin-on-tap is fine but the list is the source of truth. |
| Comparison verdict | Two-column verdict becomes a tabbed switcher OR stacks with the "us" side first. |
| Feature matrix | Becomes a definition-list pattern (label above value). Never horizontal-scroll a comparison table. |
| Stats band | Stack 4-up vertically with `space-y-10`. The 8xl hero stat stays oversized, supporting stats compress. |
| Marquee type band | Keeps moving. Reduce font size one step so the phrase reads at 375. |
| Horizontal scroll gallery | Already native to mobile. Reduce card height to `h-[320px]`. |
| Sticky stack cards | Cards still pin but go full-width edge to edge (`-mx-6`), shorter min-height. |
| Split-screen chapters | Two panels stack vertically; contrast between them stays the point. |
| Image mosaic | Masonry collapses to a 2-col with smaller `gap-2`. |
| Testimonial wall, masonry | Single column, `space-y-6`. Do not try to preserve masonry. |
| Press / awards rail | Marquee variant only; static rails do not fit. |
| UGC wall | 2-col grid feels right at 375; 3-col is too cramped, 1-col loses the wall energy. |
| Pricing, 3-tier | Snap-rail of tier cards (`snap-x`), peek of next card visible; OR single elevated tier with "See other plans" disclosure. |
| Offer clarity | Stays as a single panel, checklist above price card. |
| Objection grid | Single column accordion-friendly cards. |
| FAQ | Already mobile-native. Increase `text-base` to `text-[17px]` for legibility. |
| Final CTA | Display-xl type compresses to `clamp(2rem, 9vw, 3.5rem)`. CTA full width. |
| Footer, 4-col | Single column. Accordion only if total link count >= 20. |

---

## Mobile-only signature moments

A page can have its signature moment ONLY visible on mobile, as long as desktop has its own. Candidates that mobile genuinely rewards:

- Sticky bottom CTA bar that materializes past the hero (session-dismissible).
- Snap-scroll product carousel where each card is `h-[80vh]`.
- A pull-quote treated full-bleed with display type at `clamp(2rem, 8vw, 3.5rem)`.
- Thumb-zone gestures: swipeable comparison verdicts, drag-to-reveal before/after.

---

## Screenshot protocol for EVALUATE

Mobile critique without screenshots is malpractice. When EVALUATE runs, capture three screenshots:

1. **Desktop 1280 x 800**, scrolled top.
2. **Tablet 768 x 1024**, scrolled to mid-page.
3. **Mobile 375 x 812**, full-page tall (stitched).

Use whichever capture tool exists in the environment, in this priority:
- The browser MCP (Claude in Chrome): navigate to the URL, resize the viewport, take screenshots. Fastest option in most Claude Code sessions.
- Playwright (`page.screenshot({ fullPage: true })`).
- Puppeteer or a Puppeteer-based MCP server.
- Any headless Chromium runner already wired into the project.
- A local dev server rendered in iframes at those widths, captured with the OS screenshot tool.

If none of the above is available, render the page inside `<iframe>` elements at 1280, 768, and 375 widths, capture the surrounding viewport, and explicitly flag in the EVALUATE report that screenshots are simulated, not real device.

Inspect each screenshot for:
- Horizontal scroll (any > 0px of overflow is a gate fail).
- Tap target spacing on every interactive element.
- Type readability: longest body line `<= 50` characters on mobile, body `>= 16px` rendered.
- Image crop: focal subject not cut, no stretched aspect.
- Section rhythm at thumbnail scale: do sections still feel distinct, or has the page become one long beige column?

---

## The mobile gate (EVALUATE blocker)

If any of the following is true, the page CANNOT pass EVALUATE regardless of other scores:

- Horizontal overflow at 375px.
- Primary CTA below the fold AND not repeated mid-page or in a sticky bar.
- Tap target < 44px on any conversion-path element (CTA, nav, form input, pricing card).
- Hero headline truncates or wraps to > 4 lines at 375px.
- Image stretched (non-uniform scale) at any breakpoint.
- Body type rendering below 16px on mobile.
- Tabbed/sticky pattern broken: cannot reach all states with a touch.

A mobile gate failure is reported FIRST in the EVALUATE output, before any other findings, with the heading `MOBILE GATE FAILED`.
