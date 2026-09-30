# Content to Sections

How COMPOSE derives a section list from actual content instead of pasting a template. The core failure this prevents: pages with too few sections because the model never inventoried what it had, and filler sections because it inventoried nothing and padded anyway.

## Step 1: Content audit

Inventory before composing. Fill this table honestly; "none" is an allowed and important answer.

~~~
ASSET                  | WHAT EXISTS                       | STRENGTH (none/weak/strong)
Value propositions     | e.g. 3 distinct outcomes          |
Features               | count + which have visuals        |
Product visuals        | UI shots? lifestyle? 3D? none?    |
Testimonials           | count, named? roles? photos?      |
Stats                  | real numbers with sources?        |
Logos / press          | count, recognizable?              |
Case studies           | with metrics?                     |
Pricing                | public? tiers? guarantee?         |
Objections             | known hesitations from sales/VoC  |
FAQ material           | real search queries?              |
Founder / story        | usable narrative?                 |
Comparison target      | named competitor or "old way"?    |
~~~

## Step 2: Classify the page

- **Goal:** convert (signup/purchase), launch (waitlist/announce), compare (switchers), educate (cold problem-aware traffic).
- **Temperature:** cold (paid ads, SEO) needs mechanics and objection handling; warm (referral, brand search) can compress education and lead with product.
- Pick the closest recipe in `page-recipes.md` as a skeleton.

For DTC/ecommerce, map to the lander taxonomy first: Explainer, Reasons Why, Us-Vs-Them, Better Way, Bundle, Advertorial, Quiz, Influencer, UGC Video, New Product, Seasonal. Each implies a spine:
- **Explainer** -> education-heavy: hero, mechanism, how-it-works, proof, offer.
- **Reasons Why** -> numbered editorial splits ("7 reasons"), each reason = one zigzag row, proof interleaved.
- **Us-Vs-Them** -> comparison section is the spine; everything else supports the verdict.
- **Better Way** -> old-way pain narrative -> mechanism reveal -> transformation proof.
- **Bundle** -> offer clarity is the spine; value-stack math, what's-included, savings framing.
- **Advertorial** -> editorial single column, story arc, soft CTA cadence every ~2.5 viewports.
- **Quiz / Influencer / UGC** -> proof and personality lead; community wall and spotlight quotes early.

## Step 3: Story arc (the trust sequence)

Write the page's argument as one paragraph before listing sections. A cold visitor builds trust in this order, and section order must mirror it:

~~~
identity match -> trust signals -> product -> proof -> mechanics -> offer -> objections -> questions -> close
~~~

Do not reorder casually: proof before product feels hollow, offer before mechanics feels pushy, objections after the close never get read. Warm traffic may compress steps 2 and 5, never skip the close.

## Step 4: Proof mapping

Proof is the most under-sectioned asset. Mapping rules:
- 1 great quote -> Testimonial spotlight (#17). 6+ decent quotes -> wall (#18). Both can coexist on one page in different shapes.
- Real metrics -> Stats band (#14); a customer metric -> Case study cards (#19) or Before/after (#16).
- 5+ recognizable logos -> Proof bar (#2) directly after hero, always.
- Press quotes -> Press rail (#20) in the back half.
- Strong proof = multiple proof sections distributed through the page (positions ~2, ~6, ~9), not one "social proof section".

## Step 5: Derivation rules

1. Every strong asset gets a section. Every weak asset gets merged or cut. Never write fake stats, fake quotes, or placeholder logos to fill a recipe slot.
2. If the audit has 3+ "strong" proof rows, the page should have 3+ proof sections.
3. If mechanics are non-obvious (services, marketplaces, anything cold), How it works (#8) is mandatory.
4. If a named competitor or "old way" exists, add Comparison (#15); it is usually the conversion spine.
5. If known objections exist, Objection grid (#24) above FAQ. FAQ never substitutes for it.
6. Every page ends Final CTA (#26) then Footer (#27). Landers use minimal footer.
7. Count check: primary pages 10 to 14 sections, focused landers 7 to 10. If under minimum after honest mapping, tell the user what content is missing instead of padding.
8. An editorial break (#12) is near-free: it needs one sentence of belief, adds rhythm, and is the cheapest award-tier move. Default it into any page of 10+ sections.

## Worked example A: rich-content SaaS homepage

Audit: 3 value props, 6 features (4 with UI shots), 9 logos, 7 testimonials (1 exceptional), 3 stats, 2 case studies with metrics, public 3-tier pricing, 5 known objections.

Derivation: 9 logos -> proof bar at #2. Exceptional quote -> spotlight, separate from the wall. 4 features with visuals -> zigzag; 2 visual-less -> merge into bento satellites. Case studies + stats are distinct shapes, both stay.

~~~
01 Hero (split 7/5)            06 Stats band (2+2 asym, dark)
02 Proof bar (static rail)     07 Case study cards (featured 8/4)
03 Feature zigzag (3 rows)     08 Testimonial wall (masonry)
04 Bento grid (1 anchor + 4)   09 Pricing (3-tier)
05 Testimonial spotlight       10 Objection grid (4 cards)
                               11 FAQ (accordion)
                               12 Final CTA (dark band) + footer
~~~
Signature moment candidate: the bento (#4) or the dark stats band (#6).

## Worked example B: thin-content waitlist page

Audit: 1 value prop, product in private beta (1 teaser visual), no testimonials, no pricing, founder has a credible story, 2 real numbers (beta users, waitlist count).

Derivation: no fake proof. Founder note carries trust. Editorial break carries conviction. 7 sections, and that is correct here:

~~~
01 Hero (editorial oversized, waitlist form inline)
02 Product teaser (full-bleed media)
03 Editorial break (the belief statement)
04 How it will work (3 steps)
05 Founder note (5/7)
06 Stats rail (2 real numbers, py-12)
07 Final CTA (centered, repeats form) + minimal footer
~~~

## Worked example C: DTC Us-Vs-Them lander (cold traffic)

Audit: named "old way" (frozen meal kits), strong UGC, 4.9 rating + 3 stats, known objections (subscription fear, picky kids), one offer.

~~~
01 Hero (split, identity-first headline + trust anchor line)
02 Press/ratings rail
03 The old way (pain narrative, muted palette)
04 Comparison verdict (two-column, spine of the page)
05 Product/menu showcase (full-bleed)
06 UGC wall (masonry, platform icons)
07 How it works (3 steps)
08 Offer clarity (included list + price + cancel-anytime)
09 Objection grid (3 cards, verbatim sales objections)
10 FAQ (search-query phrasing)
11 Final CTA (full-bleed image close) + minimal footer
~~~

## Output contract

COMPOSE ends with the LAYOUT SPEC (the composition-plan table, see SKILL.md format), a named signature moment, a background rhythm map, mobile notes, and the open content gaps. No code.
