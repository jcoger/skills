---
name: conversion-architecture
description: Persuasion sequencing for marketing pages. Use when designing what order a page's argument runs in, where proof sits, what the CTA strategy is, handling objections, framing offers, building landing pages for paid traffic, or auditing why a page does not convert. Trigger phrases include "conversion", "landing page sequence", "why isn't this converting", "CTA strategy", "proof", "objections", "offer", "pressure-test this page".
---

# conversion-architecture

This skill is the persuasion layer. It decides the ORDER the argument runs in, where proof sits, what the visitor is asked to do, and how hesitation gets answered. It does not design sections (a layout skill owns that), direct motion (a motion skill owns that), or decide which pages exist (a site architecture skill owns that). It owns the argument.

Pages fail to convert for sequencing reasons before design reasons: the argument runs in the company's order instead of the visitor's, claims float unproven, CTAs compete, and fake urgency burns the trust the rest of the page earned.

## Stay in lane

This skill owns the argument: the order a page's case runs in, where proof sits, what the visitor is asked to do and when, and how each objection is answered. It does not decide which pages exist or what anything looks like.

| For | Use |
|---|---|
| Which pages exist, the site map, a page's job and temperature, nav labels | `marketing-site-architecture` (`/mk-plan`) |
| How the argument breaks into passages that search and AI answers can quote | `retrieval-architecture` (`/mk-cite`) |
| Turning the argument order into sections, shapes, sizing and the signature moment | `marketing-page-layout` (`/mk-page`) |
| How the page moves, and the hero or demo loop that shows the product | `motion-direction` (`/mk-motion`), `product-choreography` (`/mk-story`) |

Where the edges touch: the CONVERSION SPEC's argument order becomes `marketing-page-layout`'s section-order constraint, and it hands over sequence, not composition. The objection list is also a label source for `marketing-site-architecture`.

## Hard rules

1. **The visitor's order, not the company's.** The sequence answers the visitor's questions in the order they arise (is this for me, can I trust you, what is it, does it work, how does it work, what does it cost, what about my situation, what do I do). Company org charts and feature taxonomies are not sequences.
2. **Audience temperature before sequencing.** Cold, warm, and hot visitors need different argument orders (references/conversion-sequences.md). Sequencing a page without naming its traffic temperature is guessing.
3. **One primary CTA.** One primary action per page, repeated at rhythm. At most one lower-commitment alternate. Single-CTA pages outconvert CTA buffets by roughly a third in published research; competing offers create decision paralysis.
4. **No claim without proof in reach.** Every significant claim has matched proof within one viewport. A claim the visitor must scroll to verify is a claim they discount.
5. **Urgency from real events only.** Real deadlines, real capacity limits, real price changes. Fake countdowns and false scarcity are dark patterns: they cost trust, are increasingly illegal in major markets, and sophisticated visitors detect them instantly.
6. **Objections answered where they arise.** The page answers the top objections in sequence position, just before each would surface. An FAQ at the bottom is for the tail, not the top five.
7. **Proof density scales with price and risk.** A $9 tool needs a logo band; a $50k platform needs segment-matched case studies, security answers, and named references. Underproofing expensive things and overproofing cheap things both lose.
8. **Never trade trust for a click.** Any tactic the visitor would resent if they noticed it is conversion debt, not conversion.

## Mode routing

| User intent sounds like | Mode |
|---|---|
| "Map the conversion for this page", "design the lander", "sequence this argument" | MAP_CONVERSION |
| "Pressure-test this draft", "why isn't this converting", "fix the persuasion" | APPLY |
| "Audit this live page's conversion", "tear down their lander" | AUDIT_CONVERSION |

If a site architecture skill is installed and the page has a spec, start from it: the page's job, primary query, and page temperature are inputs here. Page temperature (design energy) and audience temperature (visitor warmth) are different axes; confirm both.

## MAP_CONVERSION

1. **Name the audience.** Traffic source, awareness stage (references/conversion-sequences.md temperature scale), price point, and the single action that counts as conversion.
2. **Pick the sequence** from references/conversion-sequences.md nearest to this temperature and page type. Say why.
3. **Build the objection map** (references/objection-mapping.md): top 5 objections ranked, each assigned a sequence position.
4. **Write the proof plan** (references/proof-system.md): every claim in the sequence paired with its proof, density checked against price tier.
5. **Set the CTA strategy** (references/cta-strategy.md): primary action, alternate (if any), placement rhythm, label copy, post-click honesty.
6. **Frame the offer** (references/offer-framing.md): what they get, what it costs (money, time, effort), risk reversal, honest urgency (or none).
7. **Run gates C1 to C7.** Output the conversion spec:

~~~
CONVERSION SPEC: <page>
AUDIENCE: <source> | TEMPERATURE: <cold/warm/hot> | CONVERSION: <the one action>
SEQUENCE: <ordered beats, each with its job>
PROOF PLAN: <claim -> proof, per beat>
CTA: primary "<label>" at <positions>; alternate "<label>" (lower commitment)
OBJECTIONS: <top 5, each with its sequence position>
OFFER: <get / cost / risk reversal / urgency (real event or none)>
~~~

If a layout skill is installed, hand it the sequence as the section order constraint. If a story choreography skill is installed and the hero earns a product loop, the spec's strongest claim is that loop's one claim: hand the choreography skill the claim and the proof that backs it, and let it argue the story from there.

### Worked example (condensed)

Request: "Map the lander for paid traffic from people leaving a competitor after its price increase."

Audience: hot (product-aware switchers, already decided to leave). Conversion: started migration / trial.
Sequence: event-acknowledging hero (name the price increase, date it) -> switch-path mechanics (their concepts mapped to ours, effort honesty: "most teams migrate in one afternoon") -> switcher proof (named customers who made this exact move, with numbers) -> price comparison at their new price, not their old one -> objection beat (data migration, contract overlap, team retraining) -> close with the real deadline (their renewal date, not ours).
CTA: primary "Start your migration" in hero, after proof, at close. Alternate: "See the migration guide" (lower commitment, same direction). Urgency: their renewal date is a real event; no countdown theater.
Gates: C1 hot sequence skips problem education entirely (they know), C3 the "one afternoon" claim sits one beat from the switcher quotes proving it, C5 urgency is their deadline, passes.

## APPLY

Input: a draft page, wireframe, or spec.

1. Reconstruct the implied sequence and name the temperature it is actually written for (often the giveaway: cold-traffic education on a hot-traffic page).
2. Run gates C1 to C7 against it.
3. Output fixes in sequence order, each tagged with its gate, most damaging first. Rewrite beats only where the fix is structural (wrong order, missing proof, competing CTAs); flag copy-level issues without rewriting everything.

## AUDIT_CONVERSION

Inputs: a live page (fetched), its traffic context if known.

**Grounding rule:** separate observed from inferred. State what was actually read (the page, which sections, visible proof) versus assumed (traffic source, price point). If traffic context is unknown, audit against the most likely temperature and say so. Never present an inferred conversion problem as observed fact.

1. **Sequence pass.** Map the actual beat order. Whose order is it, the visitor's or the company's? Where does it lose someone?
2. **Proof pass.** List claims; for each, the nearest proof and its distance. Score specificity (names and numbers vs vague praise).
3. **CTA pass.** Count distinct actions requested. Primary identifiable? Competing offers? Label quality? Post-click transparency?
4. **Honesty pass.** Urgency real or manufactured? Markup or claims that overpromise?
5. **Verdict per gate:** pass / fail with the observed evidence, plus ranked fixes (highest conversion impact first).

### Worked verdict (condensed)

"Audited a competitor's direct-response lander (observed: full page; inferred: paid search traffic, stated as assumption). Sequence: claim hero -> mass logo band -> three-audience benefit split -> capability sections per audience -> named testimonials with resolution numbers -> close. That is a clean warm-traffic sequence. CTA discipline strong: one pair (trial + demo) repeated, never competing offers. Proof strong: named people, specific percentages. Gaps: no objection handling anywhere (pricing absent, migration unaddressed), C6 fail; no risk reversal at the close, C7 partial. For us: an honest pricing beat and a migration-effort beat would outconvert this page with switchers."

## Acceptance gates

- **C1:** audience temperature named; sequence matches it (no cold education for hot traffic, no unearned close for cold).
- **C2:** one primary CTA, repeated; at most one lower-commitment alternate; zero competing offers.
- **C3:** every significant claim has matched proof within one viewport.
- **C4:** proof is specific: names, roles, numbers. Anonymous praise counts as zero.
- **C5:** urgency is a real event or absent. No countdown theater, no false scarcity.
- **C6:** top 5 objections answered at their sequence position, not just in a bottom FAQ.
- **C7:** the offer is concrete: the visitor can state what they get, what it costs them, and what happens after the click.

## Reference routing

| File | Used by | Contents |
|---|---|---|
| references/conversion-sequences.md | MAP_CONVERSION, AUDIT_CONVERSION | Temperature scale, master sequence, sequences per temperature, lander taxonomy |
| references/proof-system.md | All modes | Proof hierarchy, placement, density by price tier, specificity rules |
| references/cta-strategy.md | All modes | Primary CTA discipline, commitment ladder, labels, placement rhythm, forms |
| references/objection-mapping.md | MAP_CONVERSION, APPLY | Harvesting, ranking, placement, formats |
| references/offer-framing.md | MAP_CONVERSION, APPLY | Get/cost/risk framing, risk reversal, honest urgency menu |
