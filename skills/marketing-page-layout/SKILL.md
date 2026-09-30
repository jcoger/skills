---
name: marketing-page-layout
description: >-
  Compose, build, audit, evaluate, and elevate marketing pages and landing pages to an award-tier standard (land-book, siteinspire, awwwards). Use when asked to build a landing page, marketing page, homepage, or any page section (hero, pricing, features, FAQ, CTA); when deciding what sections a page needs; when a page looks bland, generic, or template-like; when reviewing a built page; or when auditing a live URL (a deployed page, a competitor, or an inspiration site). Modes: COMPOSE (plan sections from content), BUILD (execute layout), AUDIT (review a live URL), EVALUATE (score against rubric), ELEVATE (push toward award territory).
---

# marketing-page-layout

You are composing marketing pages judged against the best of land-book.com, siteinspire.com, and awwwards.com. The default LLM output is a 5-section centered-stack template with uniform padding and a 3-column card grid. That output is banned. So are these defaults unless the brief or the brand tokens call for them: a cream or off-white page background, italic accent words in headlines, numbered "01/02/03" section labels, monospace labels, and pill-shaped buttons. This skill replaces it with deliberate composition, enforced sizing, and adversarial self-critique.

## Operating rules (always on)

1. **Sections come from content, not templates.** Derive the section list from the actual copy, proof, and product. A recipe is a starting skeleton, never the answer.
2. **Numbers, not adjectives.** Specify `py-24`, `max-w-[1200px]`, `7/5 split`. Never "generous spacing" or "clean layout".
3. **Minimum section counts.** Primary pages (homepage, core lander): 10 to 14 sections. Focused landers (waitlist, single offer): 7 to 10. Anything under 7 requires explicit user sign-off.
4. **No repeated layout shape back-to-back.** Two 3-column card grids in a row is a defect. Rotate shapes: split, grid, full-bleed, editorial, rail, bento.
5. **Background rhythm.** Minimum 2 background changes per page. Pages of 10+ sections include at least one dark or high-contrast section. Map the rhythm before building.
6. **One signature moment per page.** Exactly one section that could be screenshotted for an awards gallery. Two competing moments cancel each other out.
7. **Mobile is designed, not derived.** Every section is resolved at 375px in the same pass as 1280px. Tap targets >= 44px, no horizontal overflow.
8. **Stay in lane.** Brand tokens come from web-build's BUILD SPEC (or the project token file). Page-scroll motion comes from motion-direction's MOTION SPEC; self-contained hero/demo loops come from product-choreography's BEAT SHEET. This skill owns composition, layout, sizing, imagery direction, and backgrounds. Nav/header comes from nav patterns in section-library.md; this skill specs layout and scroll behavior, not nav content.

## Mode selection

Modes are invoked by keyword (COMPOSE, BUILD, AUDIT, EVALUATE, ELEVATE) or inferred from the request. "Build the landing page" with no approved composition means: run COMPOSE first, stop for approval, then BUILD. "Review this page" or "why does this look bland" means EVALUATE on the local build. A URL in the prompt ("audit https://...", "why is acme.com so good", "what's wrong with our live homepage") routes to AUDIT. Every mode opens its response by stating which mode is running.

Recommended loops:
- **Build path:** COMPOSE -> approve -> BUILD -> EVALUATE -> fix -> ELEVATE.
- **Audit path:** AUDIT (live URL) -> top fixes -> COMPOSE the revision -> BUILD.

---

## COMPOSE (deliberate before building)

Read first: `references/content-to-sections.md`, `references/section-library.md`, `references/page-recipes.md`

**Consume upstream specs when present.** If a PAGE SPEC exists (from marketing-site-architecture: the page's job, temperature, primary query, riff sheet), it sets the page's role and energy budget. If a CONVERSION SPEC exists (from conversion-architecture: argument order, proof plan, CTA strategy), its sequence is the section-order constraint. Compose the *look* of each beat, do not re-sequence the argument. When neither exists, run COMPOSE standalone from the content audit below.

1. **Content audit.** Inventory everything available: value props, features, proof assets (testimonials, stats, logos, press, case studies), pricing, objections, FAQ material, imagery assets, brand tokens. Note what is missing.
2. **Classify the page.** Goal (convert, launch, compare, educate) and traffic temperature (cold ad traffic vs. warm referral). Pick the closest recipe from page-recipes.md as the starting skeleton.
3. **Write the story arc.** One paragraph: what the visitor must believe by the end, and the order beliefs build in. Section order mirrors the trust sequence: identity match -> trust signals -> product -> proof -> mechanics -> offer -> objections -> close.
4. **Derive the section list.** Map every content asset to a section. Strong proof earns multiple proof sections in different shapes. Thin content areas get cut or merged, never padded with filler copy. Hit the recipe minimum or justify why not.
5. **Pick a layout variant per section** from section-library.md, enforcing rule 4. If the user has a reference-library skill, pull saved examples of each section type from it before choosing.
6. **Choose the signature moment** and name what makes it screenshot-worthy.
7. **Map the background rhythm** section by section.
8. **Output the LAYOUT SPEC and stop for approval.** Do not write code in COMPOSE. The LAYOUT SPEC is this skill's named artifact (its format is below). It is what web-build consumes to build the page and what motion-direction references for section IDs.

LAYOUT SPEC format:

~~~
PAGE: [name] | GOAL: [goal] | RECIPE BASE: [recipe] | SECTIONS: [n]
ARC: [one-paragraph argument]

 #  | Section        | Variant         | Shape      | Background  | Notes
 01 | Hero           | Split 7/5       | asym split | base        | product right, display type
 02 | Proof bar      | Logo rail       | rail       | base        | py-10, grayscale logos
 ...

SIGNATURE MOMENT: [section + why it earns the screenshot]
MOBILE NOTES: [hero triage, sections that reorder or collapse]
OPEN QUESTIONS: [content gaps the user must fill]
~~~

Worked example (project management SaaS, warm-traffic homepage):

~~~
PAGE: TaskFlow homepage | GOAL: convert trial signup | RECIPE BASE: SaaS conversion (#1) | SECTIONS: 13
ARC: Visitors arrive curious from referral or content. To sign up they must believe (1) this fits teams like theirs, (2) it actually works (proof + product depth), (3) it integrates with their stack, (4) the price is fair, (5) they can leave any time.

 #  | Section            | Variant                 | Shape       | Background  | Notes
 01 | Hero               | 1E Split + UI collage   | asym split  | base        | 3 overlapping product cards, rotate -2/1.5deg
 02 | Proof bar          | 2D Ratings hybrid       | rail        | base        | G2 stars + 7 logos, py-10
 03 | Product showcase   | 7A Browser screenshot   | full-bleed  | tint band   | one hero crop, layered shadow
 04 | Feature zigzag     | 5D Media-dominant       | split (3x)  | base        | visual bleeds to viewport edge, copy max-w-[40ch]
 05 | Bento grid         | 6D Live bento           | bento       | DARK band   | one cell has a working filter toggle. SIGNATURE.
 06 | How it works       | 8D Sticky step theater  | sticky      | base        | 4 steps, shared visual stage
 07 | Editorial break    | 12A Oversized statement | editorial   | accent band | one-sentence belief, py-32
 08 | Testimonial wall   | 18D Platform-native     | grid        | base        | G2/Twitter cards, 6 visible
 09 | Integrations wall  | 10C Marquee rows        | rail        | base        | two rows, opposite directions
 10 | Pricing            | 22A 3-tier              | grid        | tint band   | middle tier elevated, billing toggle
 11 | Objection grid     | 24 default              | grid        | base        | 4 cards, no icons
 12 | FAQ                | 25A Accordion           | stack       | base        | 7 items, max-w-[760px]
 13 | Final CTA          | 26D Oversized-type      | editorial   | DARK band   | display-xl imperative + minimal footer

SIGNATURE MOMENT: #05 live bento. A working interactive cell inside a feature section is rare and screenshotable.
MOBILE NOTES: hero collapses to copy + single product card (no collage); zigzag rows stack visual-first; sticky steps fall back to vertical timeline (8B); pricing becomes a snap-rail of tier cards.
OPEN QUESTIONS: do we have real G2 review counts for the proof bar? is the bento toggle realistic to ship live, or do we ship a static fallback this sprint?
~~~

Shape-variety check on the example: split, rail, full-bleed, split, bento, sticky, editorial, grid, rail, grid, grid, stack, editorial. 8 distinct shapes across 13 sections, no shape adjacent to itself, both a dark and a tint band present. The plan passes the anti-sameness check before BUILD.

---

## BUILD (execute with laws enforced)

Read first: `references/sizing-system.md`, `references/visual-craft.md`, plus the section-library.md entries for sections in the approved plan.

Seam note: in the full pipeline, this skill stops at the LAYOUT SPEC and web-build owns the production build (stack, tokens, CMS, perf, kickoff prompt). BUILD here is for standalone use and design validation: static section markup that proves the composition works. When web-build is in play, hand it the LAYOUT SPEC instead of building.

1. Confirm an approved LAYOUT SPEC exists. If not, run COMPOSE.
2. Pull brand tokens from web-build's BUILD SPEC or the project token file. Never invent new brand colors mid-build.
3. Build section by section in plan order, applying the sizing laws below (full values in sizing-system.md).
4. Implement backgrounds and imagery treatments from visual-craft.md. Flat default backgrounds on every section is a defect.
5. Resolve 375px in the same pass: stack order, fluid type via clamp(), tap targets, image crops. Read `references/mobile-playbook.md` for the section-by-section triage table.
6. Run the BUILD checklist, then recommend EVALUATE.

Sizing laws (defaults, override only with stated reason):

- Content container: `max-w-[1200px]` or `max-w-[1280px]`, `px-6` mobile, `px-8` tablet up. Long-form text measure: `max-w-[68ch]`.
- Vertical rhythm scales with section weight, never uniform: rails `py-10` to `py-12`, standard sections `py-24`, feature moments `py-32`, hero `py-20` to `py-32` plus nav offset. Mobile multiplies by ~0.6 (`py-24` desktop -> `py-16` mobile).
- Grid: 12 columns, `gap-6` to `gap-8`. Prefer asymmetric splits `7/5` or `8/4` over `6/6`. Alternate split direction on consecutive split sections.
- Type: hero display `clamp(2.75rem, 6vw, 5rem)` `leading-[1.05]` `tracking-tight`; section H2 `clamp(1.875rem, 4vw, 3rem)`; eyebrow `text-[13px] uppercase tracking-[0.08em]`; body `text-base`/`text-lg` `leading-relaxed`.

BUILD checklist: no horizontal overflow at 375px; padding varies across sections; no two identical shapes adjacent; signature moment implemented as planned; >= 2 background shifts present; all type from the scale, no one-off sizes.

---

## EVALUATE (critique what was actually built)

Read first: `references/evaluation-rubric.md`

Standalone invocable: works on pages this skill built or any existing page or codebase the user points at.

1. Inspect the real artifact. Read the actual code files, and capture screenshots at 1280x800, 768x1024, and 375x812. Use the browser MCP (Claude in Chrome) if available in the session. It can screenshot at specific viewports without needing Playwright. Otherwise use Playwright, Puppeteer, or any headless capture tool. If no capture is available, render the page in iframes at those widths and flag screenshots as simulated. Never evaluate from memory of the plan. See `references/mobile-playbook.md` for the mobile inspection checklist and gate criteria.
2. Score all 8 rubric dimensions (composition, hierarchy, sizing, rhythm and variety, visual craft, signature moment, mobile, conversion logic). 1 to 5 each, with evidence.
3. Apply the pass/fail gates. Any gate failure caps the verdict at "needs work" regardless of scores.
4. Report each finding as: dimension, score, specific evidence (file and section reference), concrete fix with values.
5. Critique, do not cheerlead. Always name the 3 weakest sections and why, even on a SHIP verdict. Every finding carries evidence, and a gate that passes is reported as a pass.

---

## AUDIT (live page review and pattern extraction)

Read first: `references/evaluation-rubric.md`, `references/mobile-playbook.md`, `references/section-library.md`

Same rubric and gates as EVALUATE, applied to a live URL instead of a local codebase. Three valid intents, declared in the output header:

- **Self-audit:** a deployed page (homepage, lander) that the user owns. Output skews toward a prioritized improvement list.
- **Competitor audit:** a competitor or alternative. Output reports what they do well and where they leak conversions.
- **Inspiration mining:** an award-tier reference (land-book, siteinspire, awwwards). Skip the verdict and produce a portable pattern extract instead of a critique.

Steps:

1. **Fetch the page.** Prefer the browser MCP (Claude in Chrome) when available: navigate to the URL, take screenshots at desktop/tablet/mobile viewports, and read the DOM. This is faster and more reliable than headless tools in most Claude Code sessions. Fall back to Playwright, Puppeteer, or any available headless tool. Capture (a) the rendered HTML/DOM, (b) three full-page screenshots at 1280x800, 768x1024, and 375x812, (c) computed styles for the hero, the offer/pricing section, and the final CTA. If no tool is available, load the URL via fetch + a static HTML parse and flag the audit as DOM-only (no JS-resolved state, no animation, no responsive layout shifts observed).
2. **Inventory the page.** Walk top to bottom and label each section as one of the 40 types in `references/section-library.md` (e.g. "01 Hero 1A split 7/5", "05 Bento 6B asymmetric"). If a section does not map, label it as "custom: [one-line description]" and judge it on its own terms. Note the recipe it most resembles from `references/page-recipes.md`.
3. **Run the 8 gates and 8 scored dimensions** from `references/evaluation-rubric.md`. Use `references/mobile-playbook.md` for the mobile gate.
4. **Anchor every finding to a section label and a selector**, not a file path. Example: "Section 04 Feature grid (`.features .grid > article`): 3 cards with identical icons and identical heading length, no per-card differentiator. FIX: convert the middle cell to a stat block (`text-7xl tabular-nums`) so the row reads as a hierarchy, not a triplet."
5. **Be explicit about live-URL limits.** Animation timing, full accessibility tree, performance budget, and backend behavior are out of scope for this skill. List them under OUT OF SCOPE in the report; do not score them as low.
6. **For self-audit and competitor audit:** emit the standard EVALUATE report plus a QUICK WINS subsection of fixes that require no new content, photography, or copy.
7. **For inspiration mining:** skip the verdict entirely. Emit a PATTERN EXTRACT listing what is portable and what is brand-specific or unaffordable to copy.

Comparative audits (audit A vs. B): run both, then add a DIFFERENTIALS section listing 3 to 5 things B does better than A and 3 to 5 things A does better than B, each with the fix-table move from `references/evaluation-rubric.md` that would close A's gap.

Output format (self / competitor audit):

~~~
AUDIT: [url]
INTENT: self | competitor | comparison
RECIPE MATCH: [closest recipe + section count observed]

VERDICT: SHIP | NEEDS WORK | REBUILD
GATES: L1 pass ... L8 pass (list failures with evidence)

D1 Composition  4/5  evidence: ...
...

SECTION INVENTORY
01 Hero (1A split 7/5)         | strong: ... | weak: ...
02 Proof bar (2A static rail)  | ...
...

WEAKEST 3 SECTIONS
1. [section + selector] : [diagnosis] -> FIX: [concrete change with values]
2. ...
3. ...

TOP FIXES (ordered by impact)
QUICK WINS (no new content, photography, or copy required)
OUT OF SCOPE: animation timing, accessibility tree depth, performance budget, backend
~~~

Output format (inspiration mining):

~~~
PATTERN EXTRACT: [url]
ARCHETYPE: [closest archetype from award-teardowns.md]

SECTION-BY-SECTION
01 Hero: shape [...], type ranges [clamp(...)], background system [visual-craft.md numbering], signature move if any
02 ...

STEAL LIST (portable moves for our work)
1. [move] : where it would slot into our recipes
2. ...

DO NOT STEAL (brand-specific, content-specific, or unaffordable to replicate)
1. ...
~~~

---

## ELEVATE (from competent to award-tier)

Read first: `references/award-teardowns.md`, `references/visual-craft.md`

For pages that pass EVALUATE but feel safe.

1. Diagnose what is generic. Usual suspects: flat backgrounds, all-symmetric layouts, timid type scale, stocky imagery, uniform density.
2. Pick 2 or 3 elevation moves maximum: oversized type moment, grid-breaking element, full-bleed editorial break, background system upgrade, asymmetry pass, density contrast pass. More than 3 at once turns the page into noise.
3. Propose the moves with exact target sections and values. Get approval, then apply.
4. Re-run EVALUATE after applying.

---

## Reference routing

| File | Load in mode | Contents |
|---|---|---|
| references/section-library.md | COMPOSE, BUILD | 40 section types (including nav) with layout variants, sizing, and imagery direction per section |
| references/content-to-sections.md | COMPOSE | content audit -> story arc -> section derivation, worked examples |
| references/sizing-system.md | BUILD | exact values at 375/768/1280: containers, rhythm, grids, type |
| references/page-recipes.md | COMPOSE | 7 page recipes with ordered section lists by page goal |
| references/visual-craft.md | BUILD, ELEVATE | imagery direction and background systems with CSS implementations |
| references/award-teardowns.md | COMPOSE, ELEVATE | 10 annotated teardowns of award-tier archetypes |
| references/evaluation-rubric.md | EVALUATE, AUDIT | 8 scored dimensions, pass/fail gates, fix patterns |
| references/mobile-playbook.md | BUILD, EVALUATE, AUDIT | 7 mobile laws, section-by-section triage, screenshot protocol, mobile gate |

## Pipeline position

This skill is the composition layer of the /mk-* marketing stack. It consumes upstream direction and emits the LAYOUT SPEC:

- **Upstream:** marketing-site-architecture (PAGE SPEC: the page's job and temperature) and conversion-architecture (CONVERSION SPEC: the argument order, which constrains section order).
- **This skill:** composition, layout, sizing, imagery direction, backgrounds. Emits the **LAYOUT SPEC**.
- **Downstream:** web-build (BUILD SPEC: turns the LAYOUT SPEC into production code), motion-direction (MOTION SPEC: references this skill's section IDs), product-choreography (BEAT SHEET: self-contained hero/demo loops). design-craft-library FIND supplies proven section moves during COMPOSE and ELEVATE; AUDIT inspiration-mining feeds its EXTRACT mode.

When the full stack is installed, stop at the LAYOUT SPEC and let web-build build. When used alone, BUILD is available. Never duplicate another skill's output.
