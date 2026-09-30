---
name: retrieval-architecture
description: >-
  Organize a page's content so it gets found and quoted, in Google and in AI answers. Use when writing or auditing any page meant to earn search traffic or AI citations, when deciding how copy breaks into sections, when a page ranks but is never cited, when planning an AEO/GEO program, or when someone quotes an AI-visibility statistic. Trigger phrases include "SEO", "AEO", "GEO", "AI visibility", "get cited by ChatGPT", "answer engine", "why isn't this page ranking", "llms.txt", "schema for AI", "share of voice in AI". Modes: SPEC (produce the RETRIEVAL SPEC), AUDIT (review a built or live page), MEASURE (design citation measurement), CHECK (grade an AEO claim before believing it).
---

# retrieval-architecture

This skill is the passage layer. It decides **how a page's content is
organized so a machine can find it, extract it, and quote it**, in
classic search and in AI answers, which are one strategy and not two.

It does not decide which pages exist (`marketing-site-architecture` owns
the map), what order the argument runs in (`conversion-architecture` owns
persuasion), or what the sections look like (`marketing-page-layout` owns
composition). It owns the **retrievable unit**.

## The two default failures

**One: the model writes for the query the user typed.** Nobody's prompt is
the retrieval key. Engines rewrite it, fan it into multiple queries, and
re-query after seeing results. A page written for one phrasing competes in
a space that does not exist.

**Two: the model repeats vendor marketing as fact.** Most circulating GEO
practice traces to a company selling a GEO product, with no dataset and no
control group. The claim *"Google's March 2026 update cost scaled-content
sites 87% of their traffic"* has turned up in real client proposals.
There was no such update.

**Both are banned.** Write for the expansion, and grade every claim before
you act on it.

## Where this sits

```
PAGE SPEC ──► CONVERSION SPEC ──► RETRIEVAL SPEC ──► LAYOUT SPEC ──► ...
 (job)          (argument order)    (passages,          (sections,
                                     answer blocks,      shapes, sizing)
                                     what must be prose)
```

Conversion decides the order of the argument. **This decides where the
passage boundaries fall inside it**, and what each one has to answer
completely. Layout then composes those passages visually.

If the CONVERSION SPEC is missing, say so and route to
`conversion-architecture` rather than inventing the argument order.

## Modes

| Mode | When | Output |
|---|---|---|
| **SPEC** | Before writing or building | RETRIEVAL SPEC |
| **AUDIT** | A page exists and underperforms | Gate report, R1–R8 |
| **MEASURE** | Designing citation tracking | Measurement spec |
| **CHECK** | Someone cited a statistic | Graded verdict per claim |

---

## SPEC mode: the RETRIEVAL SPEC

Fixed format.

```
# RETRIEVAL SPEC: <page>

## The question set
The 8 to 12 sub-questions this page should be retrievable for.
Derived from the expansion, not from one head term.

## Passage plan
| # | Heading (phrased as the question) | Answers completely | Words | Carries |
Each row is one retrievable unit, 150 to 400 words.

## The first passage
Verbatim. Carries the differentiator and the number.

## Must exist as prose
Facts that currently live only in a card, tab, table, or accordion.

## Entity block
How the brand is named, once, identically, everywhere.

## Out of scope
```

---

## The rules, and why

**Sections are 150 to 400 words under a descriptive heading.** Retrieval
operates on passages. Production rerankers silently chunk anything past
~510 tokens, so **a page ranks at the rank of its single best passage.**
Everything else is dead weight for that query.

**Headings are phrased as the question.** "How long does plan review take
in Cobb County?" not "Timelines." The heading is what the passage gets
matched against.

**Every section answers its heading completely.** A published production
reranker scores passages 0 to 4, where 4.0 requires the passage "answers
the question completely" and **explicitly tolerates surrounding unrelated
text.** Partial answers score 2.0 regardless of how good the page is.
Completeness, not density, not authority.

**Every section survives being quoted alone.** No pronoun refers outside
its own section. Name the subject each time. Adding this context
artificially cut measured retrieval failure by 35%; writing it costs
nothing.

**The first passage carries the differentiator and the number.** Retrieved
page text is discarded after the response. On later conversational turns
the engine has only its own compressed summary of your page. What is not
in the first extractable block does not survive into turn three.

**Front-load. Truncation is documented.** Rankers allocate title and
keyword token budgets and ignore everything past the limit.

**Definitions, numbers, comparisons, and steps go in the prose.** Those
four element types carry the highest measured citation influence. Being
cited as a *definition* is worth roughly 3x being cited as a bare
reference. Statistics show the largest replicated lift.

**Anything that only exists in a component also exists as a sentence.**
Article-shaped pages extract at F1 0.93. Product, listing, and service
layouts extract at 0.41 to 0.84. A fact living only inside a card or a
comparison table may never reach the index as clean text.

**Server-render.** Most AI crawlers do not execute JavaScript. Verify with
`curl`, do not assume.

**Do not keyword stuff.** It measures negative for AI citation, not merely
neutral.

**Length: write to the material.** Two credible sources conflict on whether
length helps. Structure heavily, do not pad, do not cut substance to hit a
number.

---

## Gates

Binary. Cite by number in any review.

**R1.** Every section is 150 to 400 words under a descriptive heading
       phrased as a question.
**R2.** Every section answers its heading completely.
**R3.** Every section survives being quoted alone. No orphan pronouns, no
       "as mentioned above."
**R4.** The first extractable passage carries the differentiator and a
       number.
**R5.** Every fact in a card, tab, accordion, or table also exists as a
       sentence.
**R6.** Content is server-rendered. Verified, not assumed.
**R7.** Crawler access verified. Search-inclusion crawlers are distinct
       from training crawlers, and a named user-agent block replaces the
       wildcard entirely.
**R8.** Strip the page's variable. If what remains is generic, the page
       does not ship.

---

## CHECK mode: grade before you believe

Every AEO claim carries a grade or it does not enter the artifact.

| Grade | Meaning | Treatment |
|---|---|---|
| **[P]** | Peer-reviewed | Cite directly |
| **[R]** | Credible preprint, disclosed method | Cite with the caveat |
| **[V+]** | Vendor, method disclosed | Cite, name the interest |
| **[V]** | Vendor marketing | Directional only. Never a number in client work |
| **[D]** | The engine's own documentation | Strongest source for mechanics |
| **[X]** | Unsourced | Do not repeat. Add to the stop list |

**A [D] statement about an engine's own behavior beats any [R] study
inferring the same thing from outside.**

Check `references/stop-repeating.md` first. It holds ten claims that
circulate widely and do not survive checking, including llms.txt as a
citation lever and the March 2026 update.

---

## MEASURE mode: the short version

Full detail in `references/measurement.md`. The three things that matter:

**Sample for breadth, not depth.** At realistic citation rates, three runs
of one prompt gives a ±52 point margin. Brand identity explains ~1.5% of
single-response variance. Reliability comes from more prompts, more
paraphrases, and more engines, not more repeats. Report an aggregate rate
with a confidence interval, never per-prompt presence.

**Session hygiene is not optional.** Memory and location are injected into
the rewritten query. Nobody measures a client from their own account; it
produces false positives every time.

**Report per engine, never averaged.** Cross-engine source overlap runs
under 0.2 Jaccard. Averaging hides the only interesting part.

And disclose the ceiling: the one controlled experiment on AEO work
measured a **1.82x effect at p = 0.16** against a 3.5x platform tailwind.
Most published AEO multiples are platform growth.

---

## Stay in lane

| For | Use |
|---|---|
| Which pages exist, the site map, search strategy at site level | `marketing-site-architecture` (`/mk-plan`) |
| Argument order, proof, CTA | `conversion-architecture` (`/mk-convert`) |
| Sections, shapes, sizing, signature moment | `marketing-page-layout` (`/mk-page`) |
| Implementation, schema markup, metadata syntax | `web-build` (`/mk-build`) |
| Voice, banned phrases | the project's copy gate |

---

## References

Load one at a time.

- `references/claims-ledger.md`: the graded evidence base
- `references/page-mechanics.md`: chunking, rerankers, transient
  grounding, extraction, crawler taxonomy
- `references/measurement.md`: sampling math, session hygiene, tooling
- `references/stop-repeating.md`: debunked and unsourced claims

**Maintenance.** This field moves in weeks, and the ledger is the part that
rots. Two claims in it reversed within a single research session. Any entry
older than six months gets re-verified before it enters client work. Date
every change.
