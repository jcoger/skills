# Evaluation Rubric

Used by EVALUATE. Score the artifact that exists (code and/or screenshots at 1280 and 375), never the plan. Verdicts: SHIP (all gates pass, avg >= 4), NEEDS WORK (any gate fails or avg < 4), REBUILD (3+ gates fail). Always report the 3 weakest sections with fixes, even on SHIP.

## Pass/fail gates (binary, checked first)

| Gate | Fail condition |
|---|---|
| L1 Section count | Below recipe minimum without documented user sign-off |
| L2 Shape repetition | Two adjacent sections share the same layout shape |
| L3 Uniform rhythm | All sections share the same vertical padding |
| L4 Background | Fewer than 2 background changes on the page |
| L5 Mobile overflow | Horizontal scroll exists at 375px |
| L6 Signature moment | No section commits a distinct award-tier move (oversized/editorial type, a dark or accent band with texture, a grid-breaking or full-bleed element, or an interactive/animated cell). If every section uses the same flat-tint + standard-type + symmetric-grid treatment, this gate fails. |
| L7 Type scale | One-off font sizes outside the defined scale |
| L8 Fake content | Invented stats, fake logos, or placeholder testimonials presented as real |

Any gate failure caps the verdict at NEEDS WORK. L8 caps it at REBUILD. (These layout gates use the `L` prefix to match the /mk-* stack's per-skill gate convention.)

## Scored dimensions (1 to 5 each)

### D1. Composition (does the page tell the content's story?)
- 5: section order mirrors the trust sequence; every strong content asset has a section; nothing is filler.
- 3: recipe followed but content not fully mapped (strong proof crammed into one section, or a thin section padded).
- 1: template pasted regardless of content.

### D2. Hierarchy (one dominant element per section)
- 5: every section has a clear focal point; eye lands correctly at arm's length squint test.
- 3: 1 or 2 sections where heading, visual, and CTA fight for attention.
- 1: everything bold, everything centered, nothing dominant.

### D3. Sizing accuracy
- 5: containers, measures, paddings, and type match sizing-system.md or document their deviation.
- 3: container right but measures missing (body copy running wide), or icon/avatar sizes inconsistent.
- 1: arbitrary values everywhere; defects list from sizing-system.md section 8 applies.

### D4. Rhythm and variety
- 5: padding swings with section weight; shapes rotate; density alternates packed/empty; the scroll has tempo.
- 3: shapes rotate but padding is near-uniform; page feels like an even march.
- 1: same shape, same padding, same density, N times.

### D5. Visual craft (backgrounds + imagery)
- 5: 2 or 3 deliberate background systems; texture present; imagery follows one strategy with unified treatment.
- 3: backgrounds alternate flat tints competently but no texture/system; imagery inconsistent in aspect or grade.
- 1: flat white everywhere, stock icons, screenshots untreated at random sizes.

### D6. Signature moment quality
- 5: one moment that would hold up on land-book; executed completely (layout + background + type together).
- 3: a moment was attempted but under-committed (e.g. dark band with no texture, bento with equal cells).
- 1: no moment, or three half-moments competing.

### D7. Mobile integrity (375)
- 5: triaged hero, correct stack orders, type floors respected, tap targets >= 44px, rails stay thin.
- 3: stacks correctly but desktop-first compromises show (giant paddings, 6-line headlines, tiny tap targets).
- 1: broken layouts, overflow, unreadable type.

### D8. Conversion logic
- 5: CTA reachable every 2.5 to 3 viewports; objections handled before FAQ; trust anchors near CTAs; final close has gravity.
- 3: hero and footer CTAs only; objections missing despite known hesitations.
- 1: CTA once at top; page ends without a close.

## Output format

~~~
VERDICT: SHIP | NEEDS WORK | REBUILD
GATES: L1 pass ... L8 pass (list failures with evidence)

D1 Composition      4/5  evidence: ...
D2 Hierarchy        3/5  evidence: hero CTA and headline compete (Hero.tsx:31)
...

WEAKEST 3 SECTIONS
1. [section] : [what is wrong] -> FIX: [concrete change with values]
2. ...
3. ...

TOP FIXES (ordered by impact)
1. ...
~~~

## Fix patterns (common findings -> moves)

| Finding | Fix |
|---|---|
| Page feels flat/bland overall | Add grain class site-wide at 4%; convert one section to dark band with texture (visual-craft 2.2, 2.6) |
| Even march / no tempo | Compress rails to py-10, expand 2 moments to py-32; insert an editorial break (#12) |
| Two grids adjacent | Convert one to bento with an anchor cell, or to a borderless editorial grid |
| Everything centered | Left-align section headings, convert 2 stack sections to 7/5 splits alternating direction |
| Weak hero | Raise headline to display scale, add mesh + grain, add trust-anchor line under CTA, cap at min-h-[80vh] |
| Proof feels thin | Split one proof wall into spotlight (#17) + wall (#18) at different page positions |
| Screenshot soup | Apply one frame system + consistent aspect; crop to meaningful UI regions |
| No signature moment | Pick the highest-content section and execute one teardown move completely (award-teardowns cross-cutting list) |
| Final CTA limp | Move to dark/accent band at py-28+, echo hero promise, add guarantee line within 100px of button |

## Evaluator conduct

- Cite file and line or section name for every finding. "Spacing feels off" is not a finding; "sections 3 through 7 all use py-24 (page.tsx:88-214), violating L3" is.
- Never award 5s by default; a first build scoring straight 5s means the evaluation failed, not the build succeeded.
- When screenshots are unavailable, say which dimensions were scored from code alone and at lower confidence.
- End with at most 5 top fixes ordered by impact, not an exhaustive nitpick list.
- When the source is a live URL (AUDIT mode), substitute file:line references with section labels and CSS selectors, for example `section 04 Feature grid (.features .grid > article:nth-child(2))`. Mark animation timing, full accessibility tree, performance budget, and backend behavior as OUT OF SCOPE rather than scoring them low; the skill does not own those concerns.
