---
name: design-craft-library
description: A library of named, portable design moves from award-tier marketing sites, tagged for retrieval. Use FIND to pull patterns matching a project brief (archetype, mood, section plan), EXTRACT to permanently capture the best moves from a live URL into new entries, and CURATE to dedupe and maintain the library. Composes with marketing-page-layout and other marketing skills.
---

# design-craft-library

A pattern library that compounds. Every site studied becomes a permanent, tagged entry: what the move is, when it earns its place, why it works, and which skill builds it. The sibling skills decide and build; this one remembers.

## Stay in lane

This skill owns naming and remembering: turning a move seen on a real site into a portable entry with a name, the conditions that earn it, why it works, and which skill builds it. It does not decide whether a move belongs on a given page, and it is not a general image search.

| For | Use |
|---|---|
| Deciding which sections a page gets and composing them | `marketing-page-layout` (`/mk-page`), which calls FIND with its LAYOUT SPEC |
| Deciding how a page moves | `motion-direction` (`/mk-motion`), which filters motion entries by its approved personality |
| Page types and the site map | `marketing-site-architecture` (`/mk-plan`) |
| Building an entry into code | `web-build` (`/mk-build`), or `animation-craft` (`/mk-anim`) for motion entries |

**An entry is a move, not a screenshot.** If what you have is a picture you like but cannot name the move, the rule it follows, or when it fails, it is inspiration and not yet an entry. EXTRACT exists to close that gap.

## Mode selection

| Prompt looks like | Mode |
|---|---|
| A live URL plus "study / steal / extract / add to the library" | EXTRACT |
| A project brief plus "what should we use / find patterns / pull references" | FIND |
| "dedupe / clean up / prune / retag the library" | CURATE |

## Routing

| File | Loaded by | What is inside |
|---|---|---|
| references/index.md | FIND step 1, EXTRACT step 4, CURATE | Every entry: ID, name, tags, one-liner. The ONLY file FIND reads in full. |
| references/tag-taxonomy.md | EXTRACT, CURATE | Allowed tag values and counts. Never invent tags. |
| references/entry-template.md | EXTRACT, CURATE | The strict entry format and writing rules. |
| entries/*.md | FIND step 3, shortlisted files only | One atomic pattern per file. Never bulk-load. |

## FIND

1. Read references/index.md. Do not load entry files yet.
2. Match the project context (archetype, mood, section plan) against tags and one-liners. Shortlist at most 10.
3. Load only the shortlisted entry files.
4. Return 3 to 7 entries. For each: why-this-one reasoning tied to a specific section or decision in the brief, plus the build-owner pointer. Also list 1 or 2 near-misses with the skip reason.
5. If fewer than 3 genuinely match, say so and suggest an EXTRACT target instead of padding the list.

## EXTRACT

1. Fetch the live URL. If marketing-page-layout is installed, use its AUDIT fetch protocol (rendered DOM plus screenshots via Playwright or Puppeteer, DOM-only as a flagged fallback). Otherwise fetch and read the rendered page directly.
2. Identify portable moves: specific, nameable, reusable detached from the source brand. Maximum 5 per site. "Nice site" is not a move.
3. Draft each as an entry per references/entry-template.md, tags only from references/tag-taxonomy.md.
4. Dedupe against references/index.md. If an existing entry covers the move, propose adding the URL as a second source on that entry instead of writing a duplicate.
5. STOP. Show every proposed entry in full and wait for approval. Nothing is written before confirmation.
6. On approval: write entry files using the next available IDs and append one row per entry to references/index.md.

## CURATE

1. Load references/index.md and flag: near-duplicate pairs, entries with stale sources, entries never returned by FIND.
2. Propose a plan: merge (keep the lower ID), retag, or prune. Show it and stop for approval.
3. On approval, apply. Merged or pruned entries keep a tombstone row in the index ("MERGED INTO NNN" or "PRUNED YYYY-MM") so IDs are never reused.

## Hard rules

- Entries are distribution-safe: no client names, no internal tokens, no proprietary copy. The public source URL is the only attribution.
- One move per entry. If the draft needs an "and", split it.
- Tags come from the taxonomy only. Propose taxonomy additions explicitly in EXTRACT or CURATE output; never add silently.
- Approval gate before any write, in both EXTRACT and CURATE.
- IDs are permanent. Never renumber, never reuse.
- FIND never returns more than 7 entries and never dumps the whole library.

## Worked example: FIND

Brief: "Premium health DTC homepage, editorial mood, photography from mixed sources, sections: hero, ingredient story, proof, pricing."

Index pass shortlists 005, 006, 008, 009, 011, 012. After loading those six files, the response:

1. **006 Single-treatment photography.** Directly solves the mixed-source photography problem; editorial mood match. Apply before any section work.
2. **008 Annotated product hotspots.** Gives the ingredient story section its mechanism: one hero product image, numbered ingredient callouts.
3. **011 Oversized stat band.** Anchor for the proof section IF a verifiable stat exists. Ask for the stat before committing; a weak number at display scale damages trust.
4. **012 Restraint as confidence.** Sizing posture for the pricing section; supports the premium positioning.

Near-misses: **009 Proof wall** (playful energy clashes with the editorial mood and it needs 12+ real items), **005 Photo marquee band** (kinetic pacing fights the editorial rhythm).

Note the shape: each entry is tied to a specific section or decision, and the skips are explained. Never a dump of everything tagged dtc.

## Worked example: EXTRACT (abridged)

Prompt: "EXTRACT https://example-fintech.com" (a consumer fintech with a loud visual system).

Output before any write:

PROPOSED: 2 new entries, 1 dedupe hit.
- NEW <next ID> Ticker stat strip: thin auto-updating band of live-feeling numbers directly under the hero. [full entry text shown]
- NEW <next ID + 1> Hover-flip pricing cards: pricing tiers that flip to reveal the fee detail on hover, tap on touch. [full entry text shown]
- DEDUPE: the per-letter hero animation matches 003 Kinetic type hero. Proposing a second source line on 003 instead of a new entry.

Approve all, some, or none. Nothing is written until you confirm.

## Works with (when installed)

- **marketing-page-layout:** COMPOSE and ELEVATE call FIND with the LAYOUT SPEC; AUDIT inspiration-mining output (PATTERN EXTRACT) feeds EXTRACT step 3 directly.
- **motion-direction:** pulls entries tagged domain: motion or interaction, and filters mood against the approved motion personality (the mood names match on purpose).
- **marketing-site-architecture:** adds page-type tags to the taxonomy when installed; FIND then accepts page-type context.
- **A brand reference or scouting skill (if installed):** the seam is unit of storage. Brand-level references with personal annotations live there; move-level entries live here. When a scouted keeper is a marketing site with portable moves, route its URL to EXTRACT; when FIND comes up thin, request a scout for the gap instead of padding results.
