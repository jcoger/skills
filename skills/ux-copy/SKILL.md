---
name: ux-copy
description: "Write, audit, or sweep the strings inside a product: button and action labels, nav labels, field labels and helper text, empty states, error and validation messages, permission prompts, confirmation and destructive dialogs, loading and success states, toasts, tooltips, settings labels, alt text, accessibility labels, push notifications, and onboarding prompts. Trigger on 'what should this button say', 'write the empty state', 'this error is confusing', 'microcopy', 'UX copy', 'UX writing', 'in-app copy', 'string sheet', 'label this', 'name this action', 'notification copy', 'confirm dialog', 'audit the copy on this screen', 'these labels are inconsistent', 'our copy is a mess', 'where is our copy debt', 'sweep the copy', 'this doesn't sound direct', 'this reads like AI wrote it', 'is this copy accessible', 'alt text', or 'define our product voice'. Also trigger whenever a screen, component, or flow is being built and its text is unwritten, placeholder, lorem ipsum, or 'CTA goes here': write the strings rather than inventing filler. Six modes: WRITE, AUDIT, FIX one string, LEXICON for terminology, LENS for a multi-perspective review, SWEEP for a read-only whole-product copy audit that produces a reviewable queue. Produces a STRING SHEET. Not for marketing-page copy, and not for layout or visual design."
---

# UX Copy

**The default failure: writing the string inside the box.** A designer sizes a button, then hunts for two words that fit. That is brevity-first, and it is backwards. Brevity is the last lens, never the first. "How do I make it fit?" is the right question at the wrong time.

This skill writes in-product strings: the text that, if removed, breaks the interface. It owns naming, labeling, explaining, warning, confirming, and recovering. Nothing else.

---

## Stay in lane

| Need | Skill |
|---|---|
| **In-app strings, labels, states, errors, notifications** | **this one** |
| Marketing page copy (hero, pricing, features, about) | a marketing-copy skill |
| Editing existing marketing copy | a copy-editing skill |
| Layout, spacing, hierarchy, visual craft | a UI/visual-design skill |
| Motion and transitions | a motion-design skill |
| Onboarding *flow structure* (which actions, what order) | an onboarding-flow skill |
| Conversion levers on a signup or form | a conversion skill |
| Documenting a design for handoff | a design-handoff skill |
| Sanity field labels and schema semantics | your CMS schema skill |
| A long-form string (onboarding body, paywall, docs) | a long-form line-editing skill, then back through these gates |
| Prose that needs many perspectives at once | a multi-reviewer panel skill, or LENS mode below, for strings |

If the string lives inside the product, it is this skill's. If it lives on a marketing page, hand it to a marketing-copy skill. Onboarding is a genuine overlap: `onboarding` decides *which actions* a new user takes; this skill writes *what those actions say*.

---

## Mode routing

Pick one. Say which you picked.

| Input | Mode | Output |
|---|---|---|
| A screen, component, or flow with no strings yet | **WRITE** | Full STRING SHEET |
| An existing screen, flow, or repo the user wants reviewed | **AUDIT** | STRING SHEET with `current` → `proposed` + findings |
| One specific string ("this error is confusing") | **FIX** | Three options with rationale, ≤1 screen |
| "Our labels are inconsistent" / naming across a product | **LEXICON** | Controlled vocabulary table, load `references/lexicon.md` |
| A high-stakes surface, or one nobody can see clearly anymore | **LENS** | Consensus, tensions, priorities |
| A whole product: "where is our copy debt", "audit the copy everywhere" | **SWEEP** | `docs/copy/README.md` + numbered plans. Read-only |

WRITE and AUDIT both produce the artifact. FIX does not. It is a conversation. SWEEP produces plans for other agents and **never edits a string itself.**

---

## LENS mode

A multi-perspective review, tuned for strings. Use it when a surface is about to ship, when the team has argued about the same six words twice, or when you have been staring at a flow long enough to stop reading it.

**Do not run all six.** Pick three to five, say which and why, and say what you left out.

| Lens | Asks | Reach for when |
|---|---|---|
| **The Liar** | Is every word of this true? Does the label match the code? Does the benefit match what they actually get? | Anything with a promise, a number, a price, or a consequence |
| **Mom** | Which word here would a smart person outside this company have to guess at? | Product-specific vocabulary, anything the team named |
| **Hemingway** | What dies with nothing lost? | Anything over budget, anything that feels heavy |
| **The Tired User** | It is 6pm, they have been at this for ten minutes, something just failed. Does this help? | Errors, dead ends, recovery, empty states |
| **The Hundredth Time** | This person has read this string ninety-nine times. Is it still bearable? | Toasts, confirmations, notifications, anything on a repeated action |
| **The Screen Reader** | Read aloud with no visual context. Does it still say what it does? | Icon-only controls, anything where layout carries meaning |

**Output, three sections, in this order:**

1. **Consensus**: what more than one lens flagged, with which lenses. These are not opinions; fix them.
2. **Tensions**: where two lenses genuinely disagree, stated as a table with what is at stake. Do not resolve these. Hemingway wanting a cut and The Tired User wanting a route out is a real trade with a real answer, and it is the user's answer.
3. **Priorities**: ordered, with the reason each is where it is.

Then one hard question, if there is one worth asking.

---

## SWEEP mode: the whole product

Modelled on a read-only codebase-audit skill, and it inherits that pattern's hardest rule: **strictly read-only.** SWEEP surveys, prioritizes, and writes plans another agent executes. It does not fix a single string, however tempting, however small. The moment it starts editing it stops being a survey and becomes an unreviewed refactor of everything a user reads.

Use it when copy debt is spread across a product, when a rebrand needs scoping, before a launch, or when nobody can say how bad it is.

### Compute, do not estimate

Every number in the output comes from a command that ran. The best audits label themselves *"generated, not written"*. Grep the counts, do not eyeball them.

```
# the string surface, per repo idiom
grep -rhoE '>[A-Z][^<>{}]{2,}<' --include="*.tsx" app/ | wc -l
grep -rhoE '(aria-label|accessibilityLabel|placeholder|title)="[^"]+"' -r src/ | wc -l
# the cheap gates, product-authored strings only
grep -rn "—" src/ --include="*.tsx" | wc -l
grep -rniE "curated|bespoke|seamless|elevate|submit|click here|oops" src/ | wc -l
```

Sanity-driven strings live in the dataset, not the repo. Query them, and say which half of the count came from where.

### The artifact is a review queue, not a report

**The output is a worklist someone clears, one item at a time.** Not prose, not a memo. Every finding is individually addressable, individually rejectable, and disappears from the list once decided. A report gets read once and dropped. A queue gets worked.

`docs/copy/README.md`, plus `docs/copy/NNN-slug.md` per accepted plan.

**1. State in one screen.** Computed. Strings counted, surfaces covered, which of the twelve states exist product-wide, whether a lexicon exists, whether a voice doc exists, which bands are defined. Include the commit it was generated against.

**2. The queue.** Every finding, **grouped by problem type**, severity order across the groups:

| Group | Problem type | Severity |
|---|---|---|
| A | Wrong or unverified verb: the label does not match the code | inaccurate |
| B | Two facts in one slot, or a string with two readings | ambiguous |
| C | Missing state: a path with no string | missing |
| D | Terminology: one concept, more than one word | inconsistent |
| E | Wordy: fails the cut checklist | wordy |
| F | Flat: passes everything, says nothing. *Voice-leads and shared only* | flat |
| G | Off-voice: breaks a stated rule | off-voice |
| H | Excluding: fails Gate K or L. Unlabelled control, directional language, meaning carried by colour alone, a disability term used as metaphor | *severity varies* |

**Group H does not sit at one severity.** An unlabelled icon-only control locks people out and ranks with *inaccurate*. `See all` instead of `View all` is a polish item. Rank each H row on its own and say why.

**Group by type, not by surface.** Decisions cluster by type: a person who rejects one *flat* finding usually rejects the whole group, and that is one reply instead of nine. Surface is a column, not the axis.

Every row:

```
| ID | Where | Current | Proposed | Why |
|----|-------|---------|----------|-----|
| B1 | RecipeScreen.tsx:104 | `3 PLATES · 2.5 PORTIONS` | `3 PLATES TONIGHT` | Two facts, one slot |
```

`Why` is one line. The full reasoning lives in the plan file, written only after the item is accepted. Do not write nine plan files for findings that may all be rejected.

**3. How to clear it.** State the reply format at the top of the queue, so responding costs one message:

> Reply with any of: `accept A, C` · `reject F` · `reject B2: reason` · `change D1 to "..."`
> Anything not mentioned stays open.

Whole groups clear at once. That is the point of grouping by type.

**4. Frontier, deliberately not planned.** Copy work that is real and is not being done, with why. A rebrand's second half. Localization before the terms settle. Personality on a surface with no voice doc yet. Naming it prevents rediscovery as a fresh gap every quarter.

**5. Findings considered and rejected.** Dated, with evidence, and the line *do not re-raise without new evidence.*

### Clearing the queue is what writes the record

The two halves are one loop. Nothing is manual bookkeeping.

| Decision | What happens |
|---|---|
| **Accept** | Becomes `NNN-slug.md`, a self-contained plan an executor runs cold. Row leaves the queue |
| **Reject** | Becomes a dated entry in *Findings considered and rejected*, carrying the reason given. Row leaves the queue |
| **Change** | The supplied string replaces the proposal, then accepted as above |
| **No reply** | Stays open. Carries to the next sweep unchanged |

**A rejection is the most valuable output of a sweep.** An accepted finding fixes one string. A rejected finding, written down with a date and a reason, stops every future agent re-flagging it forever. Ask for the reason when it is not obvious, and record the person's own words rather than a paraphrase.

Re-running a sweep reads the rejected list first and does not re-raise anything in it.

### The rejected list is the point

Copy is re-litigated harder than code because everyone can read it and everyone has a view. Without this section, every audit re-flags the same strings and the team relearns the same answers.

What belongs here:

- **A deliberate voice choice that reads as a mistake.** Clipped, unpunctuated declaratives. A product that refuses exclamation marks on principle.
- **A banned word inside a user quote.** Already decided: the ban governs the product's voice, never a person's. See Gate J. This one gets re-flagged constantly.
- **A documented tradeoff.** A string that is long because legal requires it. A term kept because changing it breaks a URL or an App Store listing.
- **A rewrite that was tried and measured worse.** With the measurement.
- **An open terminology decision.** Not a finding, a decision awaiting a person. Point at the lexicon's open table.

Each entry: what was flagged, why it was rejected, the date, and who decided.

### Plan files

Self-contained. An executor with zero session context runs it cold. Goal → the strings in scope, quoted in full with file and line → the band and mode → acceptance checks → out of scope → how to verify. One plan is one coherent piece of work, never a grab bag.

**A plan may not span bands.** Errors and dish descriptions in one plan means one register applied to both, which is the failure SWEEP exists to catch.

### What SWEEP must not do

- **Not edit.** Not one string.
- **Not re-raise a rejected finding.** Read that section first, every time, before flagging anything.
- **Not flag user-generated content.** Gate J.
- **Not treat a missing voice doc as a copy defect.** It is a plan: *define the voice*, and it blocks the plans beneath it.
- **Not count comments, test fixtures, log lines, or dev-only strings** in the string surface. Say what the filter was.

---

## Register: decide the band before writing a word

**The third default failure: one register for every string.** A skill made of cutting gates optimizes everything toward short and flat, which is right for a billing error and wrong for a dish description. The voice stays fixed. The **tone flexes by surface**.

Framework borrowed from Wise's content design system, which is the clearest public statement of it.

### The four tonal modes

| Mode | The job | Typical surfaces |
|---|---|---|
| **Standing Out** | Build desire before detail. Lead with the feeling | Marketing, referral prompts, share sheets, launch moments |
| **Converting** | Remove friction, then reward the decision. Benefits lead | Pricing, booking, signup, onboarding, upgrade |
| **Adding Delight** | Reward attention with one perfect detail | Profiles, item descriptions, confirmations, empty states, edutainment |
| **Reassurance** | Human first, logistics second. Clarity leads | Errors, cancellations, delays, billing, safety, allergens, legal |

Not every product uses all four. A tool with nothing to sell may live almost entirely in Delight and Reassurance. Say which modes the product actually has.

### The tone spectrum, and its frequency budget

The four modes say what a surface is *for*. This says how emotionally involved to be, and **how often each register is allowed**. That second column is the part people skip.

| Tone | Attitude | How often |
|---|---|---|
| **Motivational** | Positive, encouraging. Cheering them on | Rarely |
| **Helpful** | Polite, respectful. Brief because they are busy | Occasionally |
| **Instructive** | Neutral, direct. Here is what you need | **Often** |
| **Reassuring** | Professional, reliable. We know you are worried | Occasionally |
| **Supportive** | Concerned, empathetic. Something bad happened | Rarely |

*(Adobe Spectrum.)*

**The default is Instructive, even in a product with strong personality.** The emotional registers lose their force through repetition: a product that is Motivational everywhere is Motivational nowhere, and the one moment that needed lifting has nothing left to lift with. The best-written personas say this about themselves: the memorable one at a party is rarely the loudest.

This is orthogonal to the bands. The band says how much personality the stakes permit. The tone spectrum says which emotional register, with a budget. A voice-leads surface is usually Helpful or Instructive, not Motivational.

### The trust spectrum

Which mode a surface gets is decided by what a mistake costs.

| Voice leads | Voice and structure share | Structure leads, voice seasons |
|---|---|---|
| Item and profile descriptions | Benefit headlines | Safety, vetting, compliance |
| Delight moments, empty states | Feature explanations | Allergens and dietary constraints |
| Service notifications | Form fields and labels | Billing and payment |
| Onboarding moments | Confirmations | Errors and dead ends |
| Social and marketing | Value props | Legal and terms |

> **The rule of thumb.** If getting it wrong could cost trust, money, or safety, structure leads. If getting it wrong just means the copy is boring, let the voice loose.

The bands are fixed. **What sits in each band is the project's call** and belongs in its voice doc. A hospitality product may put service push notifications under *voice leads*; a health product would not.

### What the band changes

| Band | Gates at full strength | What relaxes |
|---|---|---|
| **Structure leads** | Every gate, plus the cut checklist. Gate I does not fire | Nothing. No wink here, ever |
| **Shared** | Every gate | The cut checklist yields to one deliberate personality line |
| **Voice leads** | Accuracy, truth, terminology, and Gate I | Budget and cut checklist are advisory. Personality is the point |

### The wink

*Cleverness is a filter, not an add-on* (General Assembly's brand writing value). It serves the message or it goes.

**The joke can never cost trust.** A line that is charming and slightly less clear is correct on a profile page and wrong on a permission prompt. On a structure-leads surface, personality shows up as *warmth in plain words*, not as a joke: `We don't play about who's in your home` carries no information and is the most important clause in its string, because a stranger is entering someone's house.

### Personality is compression, not addition

**The band decides which words, never how many.** A wider band is not a budget increase.

Voice in a well-run product is almost always *shorter* than the neutral version of the same idea, because a specific claim beats a hedged explanation:

| Voice | Neutral |
|---|---|
| `We meet every tutor in person.` (30) | `All tutors are thoroughly screened for your safety.` (51) |
| `Pay once. Keep it forever.` (26) | `This is a one-time purchase with permanent access included.` (59) |
| `Ready when you're back.` (23) | `This will be finished by the time you return.` (45) |
| `Nothing guessed.` (16) | `No information was inferred or filled in automatically.` (55) |

**The test: if the personality version needs more words than the plain one, it is decoration, not voice.** Cut it and try again.

### The claim and the commentary

The most common way personality turns wordy: a good line arrives, and then a clause explaining why the line is good arrives behind it.

```
Nothing was guessed, which is the point.
└── the claim ──┘  └── the commentary ──┘
```

**The claim is the voice. The commentary is an annotation.** It is written for a reviewer, not a user, and it is the thing that makes personality read as overdone. Cut the commentary, keep the claim, and the string gets shorter *and* more characterful at once.

Tells for commentary: `which is the point`, `that's the whole idea`, `and that matters`, `here's why that's better`, `no small thing`. Anything that steps back to admire the sentence before it.

Same test as before: would a person who has never seen the plan need this to do the thing in front of them? The claim, usually yes. The commentary, never.

### Meeting a new product: ask, do not assume

**If the product has a voice doc, read it first and stop here.** Common homes: `docs/voice-and-tone.md`, a voice section in the repo's agent instructions, or a design-system doc.

**If it has none, ask before writing. Do not default to neutral.** Neutral is a decision, and it is usually the wrong one. Four questions, asked once, in one message:

1. **What human role does this play in someone's life?** Not a celebrity, not a car. A real role: the friend who knows the spot, a reliable banker, a bike shop mechanic, a compassionate funeral director. This produces more usable output than any abstract adjective exercise.
2. **Which of the four modes does this product actually have,** and which surface sits in which band?
3. **Three adjectives you want people to reach for, and three you fear.** The second list does more work.
4. **What is the gut-check question?** One sentence, asked before anything ships. A hospitality product's might be *"Would the friend who knows the good places say this to someone she actually cares about?"* A tool's might be *"Would a person who has never seen the roadmap need this to do the thing in front of them?"*

Write the answers into the project's voice doc. Do not carry them only in the conversation.

---

## Before writing anything: articulate the assignment

Five things. If you cannot fill all five, ask for the missing one (once, with a recommended default), then proceed.

1. **Surface**: which screen, component, or flow. Which platform (web / iOS / Android). Screen width matters; truncation is the real constraint, not a word count.
2. **Reader and moment**: who is looking at this, and what just happened to them. A person mid-checkout is not the same reader as one browsing.
3. **Behavior**: what the control actually does when pressed. Not what it looks like it does. **If you cannot verify this, do not write the string.** Read the code or ask. Do not write `Delete` when the code calls `remove`.
4. **Constraints**: character budgets, legal or compliance strings that cannot change, existing terms in the product's controlled vocabulary, localization (does this get translated).
5. **Scope**: the inventory of every string the surface needs, including the ones not visible in the mockup: error states, empty state, loading, success, permission denied, offline.

That last one is where most sheets go wrong. A mockup shows the happy path. The strings that ship are mostly the other paths.

---

## The order: Accuracy → Clarity → Brevity

From Kubie's *Writing for Designers*. The order is load-bearing.

**Accuracy first.** Is it objectively true? Does the label match what the code does? Does the benefit match what the user actually gets? Never promise an unbuilt feature. `DELETE` (from the system) and `REMOVE` (from this list) are different words for different operations. Pick the one that is true.

**Clarity second.** Simplest word available. Logical order. Define anything the reader has not met yet. If a concept only exists inside your product, either explain it here or do not use it here.

**Brevity last.** Trim only after it is true and clear. Short does not mean easy to read. Write the complete idea first, then cut:

> Click this button to submit the information in the form and also join our mailing list.
> → `Submit and Join`
> → (and then notice these are two decisions, and split them)

Trimming reveals structural problems. That is the point of doing it last.

### Last does not mean never: cut before you add

**The second default failure: a string fails a gate, so you bolt the missing piece onto the front of it.** An error names no route out, so you append a sentence. A label is ambiguous, so you qualify it. The string gets longer and the original problem is still sitting there underneath.

**When a string fails any gate, cut it to the bone first, then add only what the gate demanded.** The repaired string usually comes out no longer than the broken one, because the words that were failing the gate were the same words padding the length.

```
Broken:   The caption did not name enough to read it. Nothing was guessed, which is the point.   (82)
Bolted:   ...It is saved. Open Saved to add what it needs.                                       (88)
Right:    Not enough in the caption to read. Nothing guessed. Open Saved to add what it needs.   (82)
```

Two things died in the cut: the commentary admiring the claim (`which is the point`), and `did not name enough to read it` in favour of what a person would actually say. The claim itself stayed as `Nothing guessed.` The route out then fit inside the original budget.

**The cut checklist**, run before adding a single word:

- **Echoes.** Does this repeat something the title, the label, or the screen already says?
- **Commentary on the claim.** The claim stays, the clause admiring it goes. `Nothing was guessed, which is the point` → `Nothing guessed.` See §The claim and the commentary. Do not cut both halves, which is the easy mistake.
- **Explanations of the design.** Anything arguing why the product is good belongs in a comment.
- **Engineer words.** `published no recipe data` is `had no recipe`. `Invalid input` is the actual rule.
- **Hedges.** perhaps, maybe, somewhat, might, generally, typically.
- **Empty intensifiers.** very, really, quite, simply, just.
- **Throat-clearing.** "Please note that," "It looks like," "Unfortunately."
- **Adverbs where a verb would do.** `said quietly` is `whispered`.
- **Correlatives.** "not X, but Y" is usually just Y.

This checklist is a compressed UI-facing version of a dedicated line-editing skill. For a long-form string (an onboarding body, a paywall explanation, a settings description over ~200 characters), run the real one, then bring the result back through these gates.

---

## The five maxims

From Grice, via Hall's *Conversational Design*. Every string gets checked against these. They are a checklist, not a philosophy.

| Maxim | The test |
|---|---|
| **Quantity** | Exactly as much as is required. Not less, not more. |
| **Quality** | True, and you have evidence for it. Not "not technically a lie." |
| **Relation** | Relevant *and appropriate* to this moment. Right information, right time. |
| **Manner** | Brief, orderly, unambiguous. Logical sequence. No word with two readings. |
| **Politeness** | Don't impose. Give options. Make the reader feel good. |

The most common violation in real products is **Manner** via ordering. Bank of America's password recovery puts detailed instructions *before* the choice of "forgot username or password." The user already knows which one they forgot. The detail belongs after the choice. Too much information at the wrong time is a Manner failure, not a Quantity one.

The second most common is **Quality** via expectation gap. NN/g flagged `Get Started` as insidious: with no explanation of the service, it is a login wall in a friendly coat. Truth means matching what the user expects to what the system offers, not just avoiding lies.

---

## The four moments

Any surface is doing one of four jobs. Know which, because it changes what the strings need to carry.

1. **Introduction**: first contact. Answer six unspoken questions in as few words as possible: *Who are you? What can you do for me? Why should I care? How should I feel about you? Why should I trust you? What do you want me to do next?*
2. **Orientation**: where am I, what is here, what are the boundaries. Nav labels do this. Nav is not the place for novel concepts: `Budgets`, `Goals`, `Ways to Save`, not `Renaissance 2.0`.
3. **Action**: what can I do. **The phrase defines the action; the style only supports it.** An icon still needs a decided verb behind it, even if the verb never renders.
4. **Guidance**: help me succeed. Instructions, errors, notifications, recovery.

---

## Actions have three parts

From Higgins's *Better Onboarding*. Every meaningful action is prompt → work → follow-up, and each part needs its own strings.

**Prompt.** Align to the benefit the user will notice *immediately after completing it*, not the full list of benefits. Do not name a concept the user has not met yet. Set expectations with the label itself: `Turn on notifications` implies one tap; `Set up notification preferences` implies decisions ahead. Pick the one that is true.

**Work.** Continuity: the same language and framing that got them to act carries through the work. If the prompt said "property alerts," the flow says "property alerts," not "saved searches." Support sits *at* the point of work, not on a screen before it.

**Follow-up.** Acknowledge success in proportion to the effort invested. Over-celebrating a small action is disruptive; under-acknowledging a big one makes the user wonder if it worked. Then give a next step that is relevant to what they just did, not a catchall checklist, not a launch straight into another flow.

---

## Guidance placement, least displaced first

**Write the message before choosing where it goes.** Draft what it needs to say with no UI constraint at all, then place it. Choosing the container first is what produces a complex message crushed into a toast, or one line blocking the whole screen in a dialog.

Then work down this list and stop at the first thing that works.

1. **Product design itself**: the label, the affordance, the information architecture, the preset. This is what survives when a user skips everything else. Under 5% of people change a default; presets are guidance.
2. **Empty state**: a screen with nothing on it should say what to do and where. Better: seed it with editable playthrough content.
3. **Inline cue**: a message in the flow of the content. Occasional only; overuse trains banner blindness.
4. **Hint**: toast, tooltip, badge, one-time animated emphasis. Lightweight, transient, never load-bearing information.
5. **Overlay**: dialog, sheet, callout. Only in response to a user action or at a natural pause. Never proactively mid-task except for something materially affecting the user. Two overlays firing at once is a bug.
6. **Wizard**: a sequenced flow. Valid only for a well-scoped, one-time, genuinely complex setup, where every screen asks for an action rather than serving information.

If a string can only live in an overlay that interrupts, ask whether the underlying design is wrong.

**For errors, this ladder is not enough.** Use the Consequence / Complication / Action matrix in `references/states.md`, which picks between dialog, banner, in-line alert, help text, and toast on three axes rather than one.

**Do not write** an up-front tutorial, a feature tour, a carousel of explanations, or a "Let's get started!" → "You're all set!" wrapper. Front-loaded instruction is out of context, hard to remember, expensive to maintain, and gets skipped. That is the paradox of the active user: people dive in to do the one thing they came for, and will not sit through a lesson about the other eleven.

**The one exception**, and it is narrow: an interface genuinely novel enough that orientation *is* the goal, where learning the tool is the value the person came for. Adobe permits tours on that basis, capped under 10 steps, one technique each, expectations set on the first screen. Higgins argues they fail. Both are right for different products. The full disagreement and the test for which side you are on is in `references/journey.md`. Assume you are on Higgins's side until you can argue otherwise.

---

## Voice rules: house defaults, grep your own output

### What these govern, and what they must never touch

**Every rule below governs strings the product writes.** Headlines, labels, UI, errors, email, notifications, product descriptions.

**They do not apply to anything a person typed.** Testimonials, member quotes, reviews, provider notes, support transcripts, user-generated content of any kind. A customer saying *"the process was seamless"* is proof, not drift. The ban exists to stop the product reaching for a word that overpromises; a customer reaching for it is the evidence you wanted.

**Never edit a quote to pass a style guide. That fabricates a testimonial**, which is a worse problem than the word. Light touch only: trim length, fix a typo, cut an em dash, never at the cost of how the person actually talks. If a quote is unusable, drop it. Do not launder it. Do not flag one in review.

Everything the product says *around* a quote (the headline above the rail, the attribution line, the section eyebrow) is the product's voice, and every rule applies as normal.

*Worth encoding where quotes are authored: a note on the CMS field is the cheapest place to stop a future editor "fixing" a real person's words.*

### The rules

House rules. Adjust the specifics to your own style guide; the shape is what matters. Every one applies to product-authored strings only.

- **Zero em dashes.** Periods, commas, line breaks. Attribution lines and en-dash ranges are the only exceptions.
- **Banned phrases:** curated, bespoke, seamless, elevate, AI-powered.
- **Also banned in UI specifically** (Hall's list, adopted): `Submit` as a button label, ever. `Click here`. `Oops!` for anything with consequences. `My [anything]` as a label. Self-describing as *helpful*, *quick*, *innovative*, *smart*, *important*, or *compelling*. If you have to say it, you are not it.
- **Pronouns:** things belonging to the company are *ours*; things belonging to the user are *yours*; everything else takes no possessive at all. `Inspired by your browsing`, never `Inspired by my browsing`.
- **Direct, which is not the same as active voice.** Passive is not banned: Adobe, Microsoft, Carbon, GOV.UK and 18F all name situations where it is correct, and softening an error so it does not blame the user is the main one. What actually reads evasive is hidden verbs, existential openers, modal stacking, and vague system-speak with no remedy, most of which are grammatically active. **Load `references/directness.md` before diagnosing any string as "not direct enough."**
- **The hard limit:** never phrase something so the action appears to happen with nobody doing it.
- **"We" only when the product is at fault.** Not for a routine action, not for a user error. `We couldn't save your changes` yes; `We need your email` no.
- **Every button passes WYLTIWLT.** It must read correctly after both *"Would you like to…?"* and *"I would like to…"*. Three seconds, catches every noun-only label.
- **One thing at a time.** One idea per button, per heading, per error, per tooltip. If a string is trying to say two things, it is two strings or a design problem.
- **Do not reach for a joke.** Humor that lands once grates by the twentieth repetition, and forced cleverness is the most common way personality goes wrong. This does not mean flat: character comes from specificity and compression, not from wit. See §The wink and §Personality is compression. Timing decides it: nobody wants a joke while their payment processes.
- **Works with the visuals off.** No directional language, nothing carried by colour or an icon alone, every icon-only control labelled with its action. `references/inclusive.md`.
- **Read every string aloud before shipping it.** This is the test for meaning, rhythm, and whether it works when a screen reader speaks it. If you trip, rewrite.

**A project's own voice doc overrides this file.** Read it first.

---

## The artifact: STRING SHEET

Every WRITE and AUDIT ends here. Markdown table, in the response, saved to a file when the user asks or when it exceeds ~20 rows.

```
# STRING SHEET: <surface> · <platform> · <date>

**Assignment:** <surface, reader, moment, in one sentence>
**Voice source:** <which voice doc governs>
**Band:** <voice leads / shared / structure leads> · **Mode:** <one of four>
**Gut-check:** <the project's one question>
**Open questions:** <numbered, or "none">

| ID | State | Key | String | Budget | Note |
|----|-------|-----|--------|--------|------|
| 1.1 | default | checkout.pay.cta | Pay $48.00 | 25 | Amount inline; tells consequence |
| 1.2 | loading | checkout.pay.pending | Processing | 25 | No ellipsis; spinner carries it |
| 1.3 | error.card | checkout.pay.declined | Your card was declined. Try another card or contact your bank. | 120 | Says why + two routes out |
```

**Columns.**
- `ID`: sequential, section.item. This is what makes strings *talkable*. "Fix 3.2" beats "the text under the button on the fifth screen."
- `State`: one of the twelve in `references/states.md`. Never leave a state blank because the mockup did not show it.
- `Key`: the code-side identifier, dot-notation, matching the repo's convention if one exists.
- `String`: the actual text. No placeholders. If a fact is missing, write `[TK: exact refund window]` and flag it in Open questions. Do not stop writing to go look it up.
- `Budget`: character ceiling for this slot at the narrowest supported width.
- `Note`: one line: why this word, or what it depends on.

**AUDIT mode** adds a `Current` column before `String`, and a `Findings` section after the table listing what is wrong and why, ordered by severity: inaccurate → ambiguous → inconsistent → wordy → off-voice.

---

## Acceptance gates

Binary. Every one must be YES before the sheet is delivered. State the result of any that were close.

- **A. Accuracy verified.** Every action label matches what the code does. Verified by reading the code or by explicit confirmation. Not assumed.
- **B. Every state covered.** All twelve states in `references/states.md` are either written or explicitly marked N/A with a reason.
- **C. Em dash count is zero.** Grepped. Banned-phrase list grepped. Banned-UI-word list grepped.
- **D. Every string stands alone.** Read out of context, each string still says what it does. No string depends on the one above it to make sense.
- **E. Every error names a cause and a route out.** Why it happened, and what to do next. No dead ends. No error code alone.
- **F. Every string is inside its budget** at the narrowest supported width, or the budget is documented as exceeded with a design note.
- **F2. No repaired string got longer without a reason you can state.** Any proposal longer than what it replaces carries a one-line justification for the added words. The cut checklist ran first, and you can say what it removed.
- **G. Terminology is consistent** with the product's existing vocabulary. One concept, one word, everywhere. Checked against the lexicon if one exists; new terms flagged for it.
- **H. Read aloud.** Every string was spoken. Anything that tripped was rewritten.
- **I. Not too flat for its surface.** *Voice-leads and shared bands only. Does not fire on structure-leads.* A string can pass every gate above and still say nothing. Ask: does this sound like a person who cares, or like a form? Is there one specific detail, or five generic ones? On a voice-leads surface, correct-but-lifeless is a failure, not a pass.
  **Gate I may not add length.** Any string it changes must come back at or under the character count it started with. Personality is compression: if it needs more words, it is decoration and the gate has been misused. Gate I never overrides A, E, or F.
- **J. Voice rules applied to product-authored strings only.** No user quote, review, or typed content was edited to pass a style rule.
- **K. Works with the visuals switched off.** No directional language (`above`, `below`, `on the left`). Nothing depends on colour, an icon, or an emoji alone. Every icon-only control has an accessibility label naming its *action*. Alt text present where an image carries information nothing else carries. Reads at roughly a 6th-grade level.
- **L. Nothing excludes anyone who could be using this.** No proxy assumption about money, ability, or background. No disability term used as metaphor (`sanity check`, `grayed out`, `crazy`). Gender asked only where genuinely needed, with self-describe and opt-out. Name examples are varied. Singular they throughout.

---

## When it is not a string problem

Some copy cannot be fixed with copy. The tell is that every rewrite is worse in a new way, or that the string is trying to hold a distinction the product should not be asking a person to hold.

Four shapes, and what each actually is:

| The symptom | The real problem | What to do |
|---|---|---|
| One slot rendering three different strings depending on state, each doing a different job | **Two facts sharing a slot.** The design has one container for two ideas | Say so. Propose the split. Do not write a fourth variant |
| Every candidate label needs a qualifier to be accurate | **A leaky abstraction.** The user is being shown an internal distinction | Name the model problem. Propose which half the user needs |
| The string has to explain why the design is right | **The design is not carrying its own weight.** The words are patching it | The explanation goes in a comment. Fix the design or accept the gap |
| An error can only be phrased as an apology with no route out | **A dead end in the flow**, not a wording failure | Escalate as a flow bug. A better sentence does not give them a way out |

**Say it plainly and keep going.** State the model problem in one or two sentences, propose the best string available under the current design, and mark the row so it is clear the copy is a holding pattern. Do not stall the sheet waiting for an architecture decision, and do not quietly write around the problem as though good wording solved it.

The pattern to watch for: when the *team* needed a written rule to keep two concepts straight, shipping both concepts to the user in the same slot will not work. Their rule is a sign the distinction is hard, not a sign it is teachable in twenty characters.

---

## References: load only what the task needs

- **`references/states.md`**: the twelve states, what each must carry, character budgets, and worked patterns for errors, empty states, destructive confirms, permission prompts, and notifications. Load for any WRITE or AUDIT.
- **`references/lexicon.md`**: controlled vocabulary method, the verb table, the banned list in full, and the proofing search list. Load for LEXICON mode, or when strings span more than one screen.
- **`references/journey.md`**: onboarding journey mapping, core use, entry situations, prompt/work/follow-up in detail, spaced reinforcement. Load when the strings are for a new-user or new-feature flow.
- **`references/inclusive.md`**: the readability target, writing about people, directional language, writing the effect rather than the appearance or gesture, alt text, form safety. **Load for any string describing a person, any alt text, any icon-only control, and every AUDIT and SWEEP.** Gates K and L live here.
- **`references/directness.md`**: why a string reads evasive, and the fix. The seven indirection patterns, when passive is correct, who the subject should be, the WYLTIWLT button test, punctuation, verb tense, contractions. **Load before diagnosing any string as "not direct enough," and for any AUDIT of generated copy.** Sourced from Adobe Spectrum, the Federal Plain Language Guidelines, Microsoft, Apple, Polaris, Carbon, GOV.UK, 18F, and NN/g, with the disagreements marked.

---

## Sources

Where each idea came from, so a claim can be checked and a disagreement traced.

**Books**
- Scott Kubie, *Writing for Designers* (A Book Apart, 2018): the Prepare/Compose/Edit/Finish workflow, the assignment, the string inventory, Accuracy → Clarity → Brevity, the editing lenses, the proofing list.
- Erika Hall, *Conversational Design* (A Book Apart, 2018): Grice's maxims plus Lakoff's politeness, the four moments, verbs as the interaction, poka-yoke, the banned-word list, notifications.
- Krystal Higgins, *Better Onboarding* (A Book Apart, 2021): guided interaction, the paradox of the active user, prompt/work/follow-up, journey mapping, core use, the guidance-placement ladder, spaced reinforcement.

**Design systems and style guides**
- Adobe Spectrum, [UX writing](https://spectrum.adobe.com/page/voice-and-tone/): all nine pages. Tone spectrum with frequency, error anatomy and the component matrix, punctuation, verb tense, contractions, inclusive writing, alt text, the in-product word list model.
- [Federal Plain Language Guidelines](https://www.plainlanguage.gov/guidelines/): hidden verbs, modal substitution, "you", conditional placement. *Mary Dash's original tips are gone from the live site; recovered from the UNT web archive.*
- [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/): passive-voice exceptions incl. blame avoidance, weak verbs, existential openers.
- [Apple Human Interface Guidelines: Writing](https://developer.apple.com/design/human-interface-guidelines/writing): verbs on buttons, the "we" ban, possessives, errors that carry a remedy.
- [IBM Carbon: Writing style](https://carbondesignsystem.com/guidelines/content/writing-style/): the one source showing passive as a *Do*.
- [Atlassian Design System](https://atlassian.design/foundations/content/language-and-grammar): "we" in errors, gerund headings, no "please".
- [GOV.UK content design](https://www.gov.uk/guidance/content-design/writing-for-gov-uk): plain language, "in order to", passive exceptions.
- Shopify Polaris content guidelines: imperative verbs, no permissive language, "we" only at fault. *Live pages now redirect; recovered from archive.*
- 18F Content Guide: the zombie test, "soften an error message", the agentless hard limit. *Agency dissolved; source on GitHub.*
- Nielsen Norman Group: [passive voice in headings](https://www.nngroup.com/articles/passive-voice-is-redeemed-for-web/), ["Get Started" stops users](https://www.nngroup.com/articles/get-started/), [link labels](https://www.nngroup.com/articles/better-link-labels/).
- Jonathan Richards, *The Grammar of Interactivity* (UX Booth, 2013): the WYLTIWLT button test. *Site offline; confirmed across secondary sources, not read at source.*

**Frameworks**
- The four tonal modes and the trust spectrum are Wise's content design system.
- "Cleverness is a filter, not an add-on" is General Assembly's, same route.

**Ours**
The six modes, the thirteen gates, the STRING SHEET, the cut checklist, the claim/commentary split, the compression test, the band-decides-gate-severity model, and the SWEEP queue where clearing an item writes the durable record.

---

## Handoff

Strings ship with the build, not after it.

- Give the developer the sheet with `Key` values already in the repo's convention.
- Flag every string that needs a CMS field. If the CMS injects editing metadata into strings (Sanity's stega encoding does), strip it before any string is used in a comparison or a switch.
- Note which strings are user-facing enough to need localization, and which are internal.
- New interactive element means a typed `track()` event. Extend the event union, do not fire a loose string.
- Save the delivered sheet. When the copy gets changed downstream, the sheet is what tells you what was approved.
