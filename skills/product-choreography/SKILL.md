---
name: product-choreography
description: Story direction for product animations and in-app motion. Use when concepting a hero product animation, storyboarding how a demo or feature animation should unfold, writing a beat sheet, designing a looping product visual, choreographing app screen entrances and user journeys, or reviewing a storyboard or built animation. Trigger phrases include "hero animation ideas", "animate the product", "show why we're better", "storyboard this", "write the beat sheet", "make it loop", "choreograph this screen", "the app feels static", "review this storyboard".
---

# product-choreography

This is the story layer for product motion. A page-motion skill (motion-direction) decides how a page moves on scroll. An implementation skill (animation-craft, video-craft) decides how code moves. This skill decides what a self-contained product animation SAYS: the one claim it proves, the story that proves it, the beats that tell the story, and the loop that lets it run forever. The output is a BEAT SHEET another skill can build without taste decisions.

Stay in lane:
- Do not pick easings, durations in code, springs, or libraries. That is animation-craft and video-craft territory; this skill writes time ranges and intent.
- Do not design page sections or scroll behavior. That belongs to layout and motion-direction skills.
- Do not start writing beats until the claim is named (B1). If the request has no claim ("make a cool animation"), ask for the competitive message first or pull it from a CONVERSION SPEC if one exists.

## Inputs to ask for if missing

1. What is the product and what does it actually do (the real mechanism, not the tagline)?
2. What is the one competitive claim this animation must prove?
3. Where will it live (marketing hero, demo video, social, in-app)?
4. What is the medium (Lottie, code, rendered video, native app)?

## Story gates (B1 to B8)

Every concept and beat sheet passes all eight. Cite gates by ID in reviews.

- **B1. One claim.** The animation proves exactly one competitive claim, written down before any beats. "We're great" is not a claim. "We catch the errors that would have gotten you rejected" is.
- **B2. Beat-one comprehension.** A cold viewer, muted, knows what they are looking at by the end of beat 1 and what is at stake by beat 2. If comprehension depends on narration or prior context, the concept fails.
- **B3. Tension before payoff.** Something almost goes wrong, races, or hangs in the balance. A sequence of pleasant things happening is a screensaver, not a story.
- **B4. One mover per beat.** Each beat has one primary mover; everything else holds or quietly supports. A whole-frame camera move counts as the mover.
- **B5. The loop is part of the story.** The final beat hands off to beat 1 inside the fiction: the next item enters, the counter resets, the cycle begins again. A crossfade back to the start is a defeat.
- **B6. Buildable in the named medium.** Every beat uses movers the medium can express. Name the build risk per concept (vector-only for Lottie, frame determinism for video, perf budget for code).
- **B7. A signature frame exists.** Name the single frame someone would screenshot. If you cannot name it, the concept is wallpaper.
- **B8. Beats are timed.** Every beat gets a time range and the total runtime is stated. Hero loops run 4 to 8 seconds; demo videos can run longer but every beat still earns its time.

## The four filters

The fast quality test, used to compare concepts in CONCEPT and to score work in REVIEW. Score each 1 to 5:

1. **Get it quickly?** Comprehension speed for a cold, muted viewer. (Maps to B2.)
2. **Loops naturally?** Does the reset live inside the story? (Maps to B5.)
3. **Can we build it?** Honest feasibility in the named medium. (Maps to B6.)
4. **Is it intriguing?** Would someone watch it twice? Tension and signature moment. (Maps to B3, B7.)

A concept needs 16+ total with no score below 3 to be a top pick. A 5 on intrigue never rescues a 2 on comprehension.

## Mode routing

| Prompt looks like | Mode |
|---|---|
| "Hero animation ideas", "animate the product", "show why we're better" | CONCEPT |
| "Storyboard this", "write the beat sheet", a chosen concept | STORYBOARD |
| "Choreograph this screen", "the app feels static", "entrance sequence", "this flow feels dead" | CHOREOGRAPH |
| A storyboard, beat sheet, or built animation plus "review / critique / does this work" | REVIEW |

Reference routing: concept work reads references/story-patterns.md; beat sheets read references/beat-sheet-spec.md; in-app work reads references/screen-choreography.md.

## CONCEPT

1. Name the claim (B1). If a CONVERSION SPEC or objection map exists, the claim is usually the top objection inverted.
2. Open references/story-patterns.md and shortlist archetypes from the claim-to-archetype picker.
3. Produce 3 to 5 concepts. Each concept gets:
   - **The story** in two sentences, told from the viewer's seat.
   - **Beat skeleton:** 4 to 6 one-line beats with rough times (not a full sheet yet).
   - **Why it wins:** against the named alternatives (competitor, DIY, status quo), not in the abstract.
   - **Emotional beat:** relief, victory, confidence, satisfaction, or delight. One.
   - **Signature moment** (B7) and **build risk** (B6).
4. End with a comparison table (concept, core message, emotional beat, signature moment) and a recommendation: **top pick**, **runner-up**, **dark horse**, each with one honest sentence of reasoning. Ownability is the tiebreaker: prefer the story only this product can tell.

### Worked example (compressed)

Claim: "our review layer catches the errors that get invoices rejected." Shortlist from the picker: precision claims point to The Near Miss, The Scan, The Gauntlet. Three concepts: a Near Miss (invoice almost ships with a wrong PO number, caught at the last second), a Scan (beam sweeps the invoice, three hidden errors light up and self-correct), a Race (two invoices submitted, one bounces and restarts while ours clears). Recommendation: the Scan is top pick because watching hidden errors surface is the one story competitors without a review layer cannot tell; the Race is runner-up for instant comprehension; the Near Miss is the dark horse because its pause-and-catch beat has the strongest tension.

## STORYBOARD

1. Take the chosen concept and write the full BEAT SHEET per the contract in references/beat-sheet-spec.md. Every field, no gaps.
2. Gate-check B1 to B8 and state it: "Gates: B1-B8 pass" or name the exception.
3. Run the four filters and state the scores.
4. Name the handoff: medium `code` or `lottie` goes to an implementation skill for UI animation; medium `video` goes to the video reference; medium `in-app` goes to CHOREOGRAPH.

## CHOREOGRAPH

In-app motion is choreography without a plot: screens entering, sheets rising, journeys flowing. Read references/screen-choreography.md and produce an ENTRANCE SCRIPT (one screen) or a JOURNEY SCRIPT (a flow). Rules that always apply:

- Reading-order stagger, 30 to 80ms between elements; primary content leads.
- Repeat visits skip the entrance (frequency rule); interaction feedback stays.
- Every transition answers "where did this come from?" Nothing appears from nowhere.
- Scripts name intent and order; springs, tokens, and code come from the implementation skill.

## REVIEW

Score the four filters, cite gates per issue, and output a Before/After table, one row per issue:

| Before | After | Gate |
|---|---|---|
| Beats 2 through 4 all animate simultaneously | One mover per beat; hold the rest | B4 |
| Loop restarts via crossfade | Last beat: next document slides in as the current one exits | B5 |
| No frame worth screenshotting | Give the catch moment a pause and a visual spike | B7 |

Verdict after the table: SHIP, NEEDS WORK (name the two highest-impact fixes), or REBUILD (the claim or archetype is wrong, route back to CONCEPT).

## Reference routing

| File | Read when |
|---|---|
| references/story-patterns.md | CONCEPT: archetype library, claim-to-archetype picker, combination rules |
| references/beat-sheet-spec.md | STORYBOARD: the BEAT SHEET contract, loop design, medium handoff |
| references/screen-choreography.md | CHOREOGRAPH: depth planes, entrance scripts, journey scripts |
