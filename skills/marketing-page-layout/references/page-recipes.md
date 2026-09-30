# Page Recipes

Starting skeletons by page goal. A recipe is the floor, not the answer: COMPOSE adapts it to the content audit (sections get swapped, merged, or multiplied based on what actually exists). Section numbers reference section-library.md. Each recipe lists: when to use, ordered spine, background rhythm sketch, signature moment candidates, and what to cut first when content is thin.

---

## 1. SaaS conversion homepage (12 to 14 sections)

Use: product with self-serve signup, warm-to-mixed traffic, real proof available.

~~~
01 Hero #1A or #1B            08 Testimonial wall #18A
02 Proof bar #2A/B            09 Integrations wall #10
03 Product showcase #7A       10 Pricing #22A
04 Feature zigzag #5A (3x)    11 Objection grid #24
05 Bento grid #6A             12 FAQ #25A
06 Stats band #14B (dark)     13 Final CTA #26A (dark)
07 Testimonial spotlight #17  14 Footer #27A or B
~~~
Background rhythm: light / light / tint / light / light / DARK / light / tint / light / light / light / light / DARK.
Signature candidates: bento (#5), dark stats band (#6), big-brand footer (#27B).
Cut first: integrations (#9), then merge spotlight into wall.

## 2. DTC product lander, cold traffic (11 to 13 sections)

Use: paid social/ad traffic to a physical or consumable product.

~~~
01 Hero #1A (lifestyle visual + trust anchor line)
02 Press/ratings rail #20     08 Offer clarity #23
03 Problem narrative #12C     09 Stats band #14A
04 Product showcase #7B       10 Objection grid #24
05 How it works #8A           11 FAQ #25A
06 UGC wall #21               12 Final CTA #26B (full-bleed image)
07 Testimonial spotlight #17  13 Minimal footer #27C
~~~
Signature candidates: full-bleed product showcase (#4), image close (#12).
Cut first: stats band, then press rail. Never cut how-it-works or offer clarity on cold traffic.

## 3. Us-Vs-Them / comparison lander (10 to 11 sections)

Use: switchers, branded "alternative to X" queries, competitive ads.

~~~
01 Hero #1A (verdict-first headline)
02 Proof bar #2A              07 Case study cards #19B
03 The old way #12A (muted)   08 Pricing #22 (vs. theirs framing)
04 Comparison verdict #15A    09 Objection grid #24 (switching-cost objections)
05 Feature matrix #15B        10 FAQ #25 (migration questions)
06 Before/after #16C          11 Final CTA #26A + minimal footer
~~~
Rule: #15A and #15B are different shapes of the same argument; keep both only when the matrix has 6+ real rows.
Signature candidates: the comparison verdict treated editorially, or the before/after stat.

## 4. ICP / persona lander (10 sections)

Use: "for agencies", "for keto", role or segment-specific pages cloned across a program.

~~~
01 Hero #1A (identity-first: name the persona in the H1)
02 Proof bar #2 (persona-relevant logos only)
03 Pain narrative #12C (their words, from VoC)
04 Product showcase #7A (their workflow, not generic)
05 Feature grid #4B (only persona-relevant features)
06 Testimonial wall #18 (same-persona quotes only)
07 How it works #8A           09 FAQ #25 (persona queries)
08 Offer clarity #23          10 Final CTA #26A + minimal footer
~~~
Law: every proof element matches the persona. One off-persona testimonial poisons the page. Global sections (how-it-works, offer) come from brand constants; per-page sections (hero, proof, FAQ) are written fresh.

## 5. Pricing-led lander (9 to 10 sections)

Use: high purchase intent, "pricing" queries, retargeting.

~~~
01 Hero #1 (compressed: pb-16, price transparency promised)
02 Pricing #22A (high on page, py-32, the moment)
03 Value justification #6 bento (what every tier gets)
04 Comparison matrix #15B (tier-by-tier or vs. competitors)
05 Stats band #14C            07 Objection grid #24 (price objections)
06 Testimonial spotlight #17 (ROI quote)
08 FAQ #25 (billing questions) 09 Final CTA #26C (signup card) + footer
~~~
Signature candidate: the pricing section itself, treated as the feature moment.

## 6. Launch / waitlist page (7 to 8 sections)

Use: pre-launch, beta, announcement. Thin content is expected; do not fake proof.

~~~
01 Hero #1D (editorial oversized, form inline)
02 Product teaser #7B (full-bleed, min-h-[70vh])
03 Editorial break #12A (the belief)
04 How it will work #8A
05 Founder note #13
06 Real-numbers rail #14C (waitlist count, beta users)
07 Final CTA #26A (repeat form) 08 Minimal footer #27C
~~~
Signature candidates: the oversized hero type, or the full-bleed teaser. This page lives on type + background craft because it has no proof assets.

## 7. Studio / agency homepage (11 sections)

Use: service business selling judgment and taste; the page itself is the proof.

~~~
01 Hero #1D (editorial, the positioning statement)
02 Proof bar #2A
03 Capabilities #4C (borderless editorial grid)
04 Comparison #15A (us vs. typical agencies)
05 How we work #8B (vertical timeline)
06 Work cards #19 (the portfolio moment, py-32)
07 Pricing #22B or C (transparency as differentiator)
08 Testimonials #18B
09 FAQ #25C
10 Final CTA #26A (dark)
11 Big-brand footer #27B
~~~
Law for studio sites: craft IS the argument. This recipe demands the strongest background system, at least one grid-breaking element in work cards, and display-xl type in the hero. A safe studio site is a failed studio site.

---

## Cross-recipe rules

- Recipes assume desktop order; mobile triage per sizing-system.md section 7.
- Sticky CTA bar (scroll-triggered, session-dismissible) is a valid add-on for recipes 2, 3, 4, 5; appears after scrolling past the hero.
- CTA cadence: a conversion action should be reachable every 2.5 to 3 viewports. On long pages, repeat a compressed CTA band mid-page rather than making every section sell.
- If the user's content audit contradicts the recipe (e.g. no pricing is public), swap in offer clarity (#23) or cut the slot; never invent content to fill a slot.
