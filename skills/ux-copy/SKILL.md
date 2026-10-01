---
name: ux-copy
description: "Write, audit, or sweep the strings inside a product: button and action labels, nav labels, field labels and helper text, empty states, error and validation messages, permission prompts, confirmation and destructive dialogs, loading and success states, toasts, tooltips, settings labels, alt text, accessibility labels, push notifications, and onboarding prompts. Trigger on 'what should this button say', 'write the empty state', 'this error is confusing', 'microcopy', 'UX copy', 'UX writing', 'in-app copy', 'string sheet', 'label this', 'name this action', 'notification copy', 'confirm dialog', 'audit the copy on this screen', 'these labels are inconsistent', 'our copy is a mess', 'where is our copy debt', 'sweep the copy', 'this doesn't sound direct', 'this reads like AI wrote it', 'is this copy accessible', 'alt text', or 'define our product voice'. Also trigger whenever a screen, component, or flow is being built and its text is unwritten, placeholder, lorem ipsum, or 'CTA goes here'. Write the strings rather than inventing filler. Six modes: WRITE, AUDIT, FIX one string, LEXICON for terminology, LENS for a multi-perspective review, SWEEP for a read-only whole-product copy audit that produces a reviewable queue. Produces a STRING SHEET. Not for marketing pages (a marketing-copy skill), not for layout (a UI design skill)."
---

# UX Copy

The strings inside a product: the text that, if removed, breaks the interface. Naming, labelling, explaining, warning, confirming, recovering.

## The six default failures

| # | Failure | The rule |
|---|---|---|
| 1 | **Writing the string inside the box.** Sizing a button, then hunting for two words that fit | Brevity is the last lens. *"How do I make it fit?"* is the right question at the wrong time |
| 2 | **Bolting the fix onto the front.** A string fails a gate, so you append the missing piece | Cut it to the bone first, then add only what the gate demanded |
| 3 | **One register for every string** | Pick the tonal mode before writing |
| 4 | **Narrative leak.** The product starts talking about itself | Personality is about the reader. Narrative is about the product |
| 5 | **Fixing one class and walking past the rest** | A rewrite is a new string. Re-run every gate on it |
| 6 | **Grading your own copy "cold."** The writer knows what every term means and which numbers are scaled, so the gaps are invisible to them | A subagent with only the rendered text reads it. See *The cold read* |

---

## Stay in lane

| Need | Skill |
|---|---|
| **In-app strings, labels, states, errors, notifications** | **this one** |
| Marketing page copy | a marketing-copy skill |
| Editing existing marketing copy | a copy-editing skill |
| Layout, hierarchy, visual craft | a UI design or layout skill |
| Motion | a motion skill |
| Onboarding *flow structure*: which actions, what order | an onboarding-flow skill |
| Conversion levers on a signup or form | a conversion skill for signup and forms |
| Design handoff | a design-handoff skill |
| CMS schema semantics | your CMS's own guidance |
| A long-form string | Compound Writing's `cw-line-edit`, if installed, then back through these gates |
| The cold read itself | Compound Writing's `cw-reader`, if installed, in a subagent, then its findings back through these gates |

Onboarding is the genuine overlap: that skill decides *which actions* a new user takes; this one writes *what those actions say*.

---

## Operating modes

| Input | Mode | Output |
|---|---|---|
| A surface with no strings yet | **WRITE** | STRING SHEET |
| An existing surface to review | **AUDIT** | STRING SHEET, `current` → `proposed`, plus findings |
| One string | **FIX** | Three options, ≤1 screen |
| Terminology across a product | **LEXICON** | Controlled vocabulary. Load `references/lexicon.md` |
| High stakes, or nobody can see it clearly | **LENS** | Consensus, tensions, priorities |
| A whole product | **SWEEP** | Read-only queue in `docs/copy/` |

FIX is a conversation, not an artifact. **SWEEP never edits a string.**

### LENS

Pick three to five. Say which, and what you left out.

| Lens | Asks |
|---|---|
| **The Liar** | Is every word true? Does the label match the code? Do the numbers on the surface add up? Does every `every` hold for each instance? |
| **Mom** | Which word would an outsider guess at? And every pronoun: **it what? this what?** |
| **Hemingway** | What dies with nothing lost? |
| **The Tired User** | 6pm, ten minutes in, something just failed. Does this help? |
| **The Hundredth Time** | They have read this ninety-nine times. Still bearable? |
| **The Screen Reader** | Read aloud, no visual context. Does it still say what it does? |

Output: **Consensus** (flagged by more than one: fix these) · **Tensions** (real disagreements, stated as a table, left unresolved) · **Priorities**. Then one hard question, if there is one.

Every lens above is run by the writer. None of them is a cold read.

### The cold read

**The person who wrote the strings cannot read them cold.** Required on anything read top to bottom in one sitting, any structure-leads surface, and any surface where numbers relate to each other. Load `references/cold-read.md`.

1. Extract the **rendered** text in reading order, plus a second file of strings that only show on interaction.
2. Spawn a subagent with that text, the named reader **and their expertise**, and the hard rules. **Not the plan.** Use Compound Writing's `cw-reader`, if installed.
3. **Verify every finding against the data or code before applying it.** The reader's findings are hypotheses.
4. Re-run every gate on each applied rewrite. Lock the strings it said landed.

It catches what per-string gates cannot: a term used before it is shown, a qualifier placed after the claims it qualifies, parts that do not add up to the whole, an `every` with an exception, and a misquote.

### SWEEP

**Step zero, before anything else:**

```bash
ls docs/copy/ docs/content/ 2>/dev/null     # a prior sweep and its rejected list
find . -iname "*voice*" -o -iname "*tone*"  # the product's own voice doc
```

**If a prior sweep exists, you are not running a new one.** Read its rejected list, work its open rows against current `HEAD`, and report the delta. A second queue raised blind to the first re-litigates settled decisions.

**If a voice doc exists, it overrides this skill.** Read it before writing a single finding.

**Compute, never estimate.** Every number comes from a command that ran.

**Quote, never assume.** A row may only be reported **open** if you can quote the current string **verbatim from the file in this pass**. If you cannot produce the quote, the row is **closed**.

A content search is not enough. Comments quote strings that were removed, and cite the row that removed them, so a grep for a finding matches its own obituary. Three rows were once reported open against a commit where all three were already fixed, with the fix documented three lines above the match.

```bash
node <skill-dir>/scripts/copy-lint.mjs ./src   # point at UI code, never at data or a corpus
```

**The artifact is a queue, not a report.** `docs/copy/README.md` plus `NNN-slug.md` per accepted plan. Grouped by problem type so whole groups clear in one reply:

| Group | Type | Severity |
|---|---|---|
| A | Wrong or unverified verb | inaccurate |
| B | Two facts in one slot, or two readings | ambiguous |
| C | Missing state | missing |
| D | One concept, more than one word | inconsistent |
| E | Wordy | wordy |
| F | Flat. *Voice-leads and shared bands only* | flat |
| G | Off-voice | off-voice |
| H | Excluding. Fails Gate K | *varies: rank each row* |
| I | Narrative. **Usually a CUT** | inaccurate-adjacent |
| J | Grammar | wrong |

State the reply format at the top: `accept A, C` · `reject F` · `reject B2: reason` · `change D1 to "…"`. Unmentioned rows stay open.

**Clearing writes the record.** Accept → a plan file. **Reject → a dated entry in *Findings considered and rejected*, carrying the person's own words.** A rejection is the most valuable output: it stops every future sweep re-flagging the same string.

**The rejected list is not the only record.** In a codebase that comments *decisions* rather than behaviour, rejections live in component doc comments. **Before proposing any visual or structural change, read the doc comment of the component involved.**

> A proposal to size avatars by appetite was about to be made. It had been tried and rejected a year earlier, and the reason was in `Plate.tsx`: it *"priced a person's plate by their appetite, which is a grade."* Not in the queue. In the component.

**Also required:** *Frontier, deliberately not planned* · *Watch-items* (a pattern with no rule yet; two appearances proposes a rule, three promotes it; three rejections retires one).

**Over about a dozen enforce-level findings on one surface, stop writing rows.** Report counts, the top three patterns, and one sentence saying the surface needs a voice decision before line-level work.

**A plan may not span bands.** Errors and item descriptions in one plan means one register applied to both.

---

## Tone

**The voice never changes. The tone does.** Every surface sits in one tonal mode. Name it, then write.

| Mode | The job | Where |
|---|---|---|
| **Standing Out** | Build desire before detail | Marketing, referral, share, launch |
| **Converting** | Remove friction, then reward the decision | Pricing, booking, signup, onboarding |
| **Adding Delight** | Reward attention with one perfect detail | Profiles, item descriptions, confirmations, empty states |
| **Reassurance** | Human first, logistics second | Errors, cancellations, billing, safety, legal |

Not every product has all four. **Say which it has, once, in its voice doc.**

### Spend the emotional registers rarely

| Register | How often |
|---|---|
| Motivational | Rarely |
| Helpful | Occasionally |
| **Instructive** | **Often (the default)** |
| Reassuring | Occasionally |
| Supportive | Rarely |

A product that is Motivational everywhere is Motivational nowhere.

### The trust spectrum sets gate severity

| Voice leads | Shared | Structure leads |
|---|---|---|
| Item and profile descriptions | Benefit headlines | Safety, vetting, compliance |
| Delight moments, empty states | Feature explanations | Allergens, dietary constraints |
| Service notifications | Form fields and labels | Billing, payment |
| Onboarding moments | Confirmations | Errors, dead ends |
| Social and marketing | Value props | Legal, consent, cancellation |

> **If getting it wrong costs trust, money, or safety, structure leads. If it just means the copy is boring, let the voice loose.**

| Band | Gates | Relaxed |
|---|---|---|
| Structure leads | All, plus the cut checklist. **Gate I never fires** | Nothing. No wink, ever |
| Shared | All | Cut checklist yields to one deliberate personality line |
| Voice leads | Accuracy, truth, terminology, Gate I | Budget and cut checklist advisory |

**The bands are fixed. What sits in each is the project's call**, and belongs in its voice doc.

### Three levels of enforcement

| Level | Applies to | Behaviour |
|---|---|---|
| **Enforce** | Accuracy, states, dead ends, exclusion, banned words, grammar | Every instance |
| **Ration** | `references/tells.md`, personality density, coinages | **Flag the recurrence, not each instance.** Report the count and the cap |
| **Never** | Signature moves | Silent |

### Signature moves

Ask, and record in the voice doc: **"What are three things we do that a strict reviewer would flag, and that we are keeping?"**

Once listed, **out of scope for every gate and lens.** Not argued each time.

> A signature move is a pattern the team chose and can state. A tic is one nobody chose and everybody repeats.

### The wink

*Cleverness is a filter, not an add-on.* The joke can never cost trust. On a structure-leads surface, personality is **warmth in plain words**, not a joke.

### Personality is compression, not addition

**The band decides which words, never how many.** Voice is almost always *shorter* than the neutral version:

| Voice | Neutral |
|---|---|
| `We don't play about who's in your home.` (38) | `We screen every chef thoroughly.` (47) |
| `Ready when you're back.` (22) | `This will be finished by the time you return.` (44) |
| `Nothing guessed.` (16) | `No information was inferred automatically.` (55) |

**If the personality version needs more words than the plain one, it is decoration.**

### The claim and the commentary

```
Nothing was guessed, which is the point.
└── claim ────┘  └─── commentary ───┘
```

The claim is voice. The commentary is written for a reviewer. **Cut the commentary, keep the claim.** The string gets shorter *and* more characterful. Do not cut both.

Tells: `which is the point` · `that's the whole idea` · `and that matters` · `no small thing`.

### Narrative leak

| Voice | About | Belongs |
|---|---|---|
| **Task** | What the reader is doing | The UI |
| **Argument** | Why the product is built this way | The docs |
| **Narrative** | The story of building it | Nowhere near a user |

```
Task       Ready when you're back.
Argument   Two cooking nights. Everything else follows.
Narrative  There is no appliance version of this and we should not invent one.
```

All three are short and voiced. **Only the first is about the reader.**

Tells: names a file or module · `we` about a team decision · a disclaimer aimed at the team's comfort · explains why the design is right · states a thesis · internal vocabulary · would read fine in the README.

Two tests: **would this exist if the plan document had never been written?** · **is this about what they are doing, or what we decided?**

### Meeting a new product

**If it has a voice doc, read it and stop here.**

If not, ask before writing. Four questions, one message:

1. **What human role does this play in someone's life?** A real role: the friend who knows the spot, a reliable banker, a bike shop mechanic.
2. **Which tonal modes does it have, and which surfaces sit in which band?**
3. **Three adjectives you want, and three you fear.** The second list does more work.
4. **What is the gut-check question?** One sentence, asked before anything ships.

Plus the signature-moves question above. Write the answers into the voice doc.

For a durable voice document rather than a working answer, use the voice chart in `references/frameworks.md`.

---

## Before writing: the assignment

1. **Surface**: which screen, which platform. Truncation is the constraint, not word count.
2. **Reader and moment**: who is looking, and what just happened to them.
3. **Behavior**: what the control actually does. **Read the code or ask. Never assume.**
4. **Constraints**: budgets, legal strings, existing vocabulary, localization.
5. **Scope**: every string the surface needs, including the ones absent from the mockup.

That last one is where sheets go wrong. A mockup shows the happy path; the strings that ship are mostly the other paths.

---

## Accuracy → Clarity → Brevity

The order is load-bearing.

**Accuracy.** Objectively true. The label matches what the code does. `DELETE` from the system and `REMOVE` from this list are different operations.

**Clarity.** Simplest word available. Logical order. Define anything they have not met.

**Brevity, last.** Write the complete idea, then cut.

```
Click this button to submit the information in the form and also join our mailing list.
→ Submit and Join
→ (then notice these are two decisions, and split them)
```

### Cut before you add

When a string fails a gate, **cut it to the bone first**, then add only what the gate demanded. The repaired string usually comes out shorter, because the padding and the defect were the same words.

```
Broken   The caption did not name enough to read it. Nothing was guessed, which is the point.  (82)
Bolted   …It is saved. Open Saved to add what it needs.                                        (88)
Right    Not enough in the caption to read. Nothing guessed. Open Saved to add what it needs.   (82)
```

**The cut checklist**, before adding a word:

- **Echoes**: does the title or label already say it?
- **Commentary on the claim**: keep the claim, cut the clause admiring it. Do not cut both.
- **Explanations of the design**: those belong in a comment.
- **Engineer words**: `published no recipe data` is `had no recipe`.
- **Hedges**: perhaps, maybe, somewhat, might, generally.
- **Empty intensifiers**: very, really, quite, simply, just.
- **Throat-clearing**: "Please note that," "It looks like," "Unfortunately."
- **Adverbs where a verb would do**: `said quietly` is `whispered`.
- **Correlatives**: "not X, but Y" is usually just Y.

### CUT is a verdict

**Every proposal must be allowed to be nothing.** Three outcomes, checked in this order:

| Verdict | When | In the sheet |
|---|---|---|
| **CUT** | The string should not exist | `[cut]`, with the reason |
| **MERGE** | Two strings are one idea | One proposal, both IDs |
| **REWRITE** | It has a job and does it badly | A replacement |

Cut outright when it is narrative · restates the title · explains the design · is a second sentence adding nothing · reassures the team · **changes nothing for the reader if it disappears.**

**Half a string is still a cut.** Report it as a cut of the clause, not a rewrite of the sentence.

**Before closing a sheet with no CUTs, run the cut test above on every string once more.** If none qualifies, say so; do not invent one.

### A rewrite is a new string

**Re-run every gate from A on any replacement.** Not the gate that produced the finding. All of them.

```
Found     "New dishes start from methods you already have. Nothing here is a test."
Fixed     "New dishes start from methods you already have."
Missed    `methods` is a word the codebase invented, used for two concepts, defined in neither
```

The reassurance was cut correctly. The sentence was still wrong, and the pass reported it done.

**And a fix can create a violation.** Four hints made parallel by opening every one with `It`: good parallelism, four orphaned pronouns. Consistency applied to a defect builds a house style on the defect.

---

## The five maxims

| Maxim | Test |
|---|---|
| **Quantity** | Exactly as much as required |
| **Quality** | True, with evidence. Not "not technically a lie" |
| **Relation** | Relevant *and* appropriate to this moment |
| **Manner** | Brief, orderly, unambiguous |
| **Politeness** | Don't impose. Give options. Make the reader feel good |

Most common violation is **Manner via ordering**: detailed instructions placed *before* the choice they explain. Second is **Quality via expectation gap**: `Get Started` with no explanation is a login wall in a friendly coat.

## The four moments

**Introduction**: answer six unspoken questions: *Who are you? What can you do for me? Why should I care? How should I feel about you? Why should I trust you? What do you want me to do next?*
**Orientation**: where am I, what is here, what are the boundaries. Nav is not the place for novel concepts.
**Action**: **the phrase defines the action; the style only supports it.** An icon still needs a decided verb.
**Guidance**: help me succeed.

## Actions have three parts

**Name the drive before writing any of them.** What is this asking the person to want, and
is that want honest without us? A drive named is a taste argument settled; a drive unnamed
is why "is this a guilt mechanic" goes three rounds. Vocabulary and the honest-form test
are in `references/journey.md`.

**Prompt.** Align to the benefit they notice *immediately after*. Never name a concept they have not met. The label sets the expectation: `Turn on notifications` promises a tap; `Set up notification preferences` promises decisions.

**Work.** Continuity: the framing that got them to act carries through. Support sits *at* the point of work.

**Follow-up.** Acknowledge in proportion to effort. Then one next step relevant to what they just did. Not a catchall checklist, not a launch into another flow.

## Guidance placement, least displaced first

**Write the message before choosing where it goes.**

1. **Product design itself**: label, affordance, IA, preset. Under 5% change a default
2. **Empty state**: better, seeded with editable playthrough content
3. **Inline cue**: occasional only
4. **Hint**: toast, tooltip, badge. Never load-bearing
5. **Overlay**: only on a user action or at a natural pause. Two at once is a bug
6. **Wizard**: one-time, genuinely complex setup, every screen asking for an action

**For errors this is not enough.** Use the Consequence / Complication / Action matrix in `references/states.md`.

**Do not write** an up-front tutorial, feature tour, carousel, or `Let's get started!` → `You're all set!` wrapper. **One narrow exception:** an interface novel enough that orientation *is* the goal. Full disagreement in `references/journey.md`. Assume you are not the exception.

---

## Voice rules

**These govern strings the product writes.** They **never** apply to anything a person typed: testimonials, quotes, reviews, support transcripts. A customer saying *"the process was seamless"* is proof, not drift. **Never edit a quote to pass a style guide; that fabricates a testimonial.** Trim length, fix a typo, cut an em dash. If it is unusable, drop it. Everything the product says *around* a quote is the product's voice and every rule applies.

- **Zero em dashes.** Attribution lines and en-dash ranges excepted.
- **Banned:** curated, bespoke, seamless, elevate, AI-powered, fuel your body, experience the difference.
- **Banned in UI:** `Submit` as a label, ever · `Click here` · `Oops!` with consequences · `My [anything]` · self-describing as helpful, quick, innovative, smart, important, compelling.
- **Pronouns:** the company's things are *ours*; the user's are *yours*; everything else takes no possessive.
- **Direct is not the same as active voice.** Passive is not banned. Softening an error so it does not blame the user is the main correct use. What reads evasive is hidden verbs, existential openers, modal stacking, and vague system-speak with no remedy, most of them grammatically active. **Load `references/directness.md` before diagnosing anything as "not direct enough."**
- **Hard limit:** never phrase something so the action appears to happen with nobody doing it.
- **"We" only when the product is at fault.** `We couldn't save your changes` yes. `We need your email` no.
- **Every button passes WYLTIWLT**: reads correctly after both *"Would you like to…?"* and *"I would like to…"*.
- **One thing at a time.** Two things means two strings, or a design problem.
- **Do not reach for a joke.** Character comes from specificity and compression, not wit.
- **Works with the visuals off.** No directional language, nothing carried by colour or icon alone, every icon-only control labelled with its action.
- **Read every string aloud, cold.**

**A project's own voice doc overrides this file.**

---

## The artifact: STRING SHEET

```
# STRING SHEET: <surface> · <platform> · <date>

**Assignment:** <surface, reader, moment, one sentence>
**Voice source:** <which doc governs>
**Band:** <voice leads / shared / structure leads> · **Mode:** <one of four>
**Gut-check:** <the project's question>
**Open questions:** <numbered, or none>

| ID | State | Key | String | Budget | Note |
|----|-------|-----|--------|--------|------|
| 1.1 | default | checkout.pay.cta | Pay $48.00 | 25 | Amount inline; states the consequence |
| 1.2 | loading | checkout.pay.pending | Processing | 25 | No ellipsis; spinner carries it |
```

`ID` makes strings talkable: "fix 3.2" beats "the text under the button on the fifth screen." `String` is the real text, or `[cut]`. A missing fact is `[TK: …]` plus an open question, never a stop to go look it up.

**AUDIT** adds a `Current` column and a findings list ordered: inaccurate → ambiguous → missing → inconsistent → wordy → flat → off-voice.

---

## Acceptance gates

Binary. All must pass. Say the result of any that were close.

- **A. Accuracy verified.** Every label matches the code, by reading it or by confirmation. Not assumed.
- **B. Every state covered.** All twelve in `references/states.md`, written or marked N/A with a reason.
- **C. Em dashes zero.** Grepped. Banned lists grepped.
- **D. Every string stands alone.** No string needs the one above it to make sense.
- **E. Every error names a cause and a route out.** No dead ends, no bare error code.
- **F. Inside budget** at the narrowest width, or documented as over with a design note. **No repaired string got longer without a stated reason.**
- **G. Terminology consistent.** One concept, one word. *(WCAG 3.2.4 makes this conformance, not preference.)*
- **H. Read aloud, cold**, with nothing else on screen. On a surface where the cold read is required, **cold means a subagent that did not write it**, and its findings were verified before applying. See *The cold read*.
- **I. Not too flat for its surface.** *Voice-leads and shared only.* Correct-but-lifeless is a failure. **Gate I may not add length**, and never overrides A, E, or F.
- **J. Product-authored strings only.** No quote or typed content edited to pass a rule. And the reverse: **any words the product puts inside quotation marks are exactly what that person said.** A paraphrase goes outside the marks.
- **K. Works for everyone.** No directional language. Nothing carried by colour, icon, or emoji alone. Every icon-only control labelled with its action. Alt text where an image carries information. No proxy assumption about money, ability, or background. No disability term as metaphor. Singular they. Varied name examples. Roughly a 6th-grade reading level.
- **M. Grammar** against the ten classes in `references/grammar.md`.
- **N. No narrative leak.** No string names a file, argues for the design, states a thesis, or reassures the team.
- **O. CUT considered first**, and the sheet says which findings are cuts.
- **P. Tell density checked once per surface**, as a density pass, not per string. Signature moves excluded.
- **Q. Every referent resolves inside its own string.** No `It`, `This`, `That` without the noun present. Exception: a literal answer to a question shown beside it.
- **R. System-to-human pass run.** No word appears only because it is what the code calls the thing.
- **S. AI surfaces**: *fires only where a model produces the output.* `references/ai-features.md`.
- **T. Localization**: *fires only if the product ships in more than one language.* `references/localization.md`.
- **U. Regulated surfaces**: *fires only on consent, cookies, checkout, signup, cancellation.* `references/regulated.md`.

---

## When it is not a string problem

Some copy cannot be fixed with copy. The tell is that every rewrite is worse in a new way.

| Symptom | Real problem | Do |
|---|---|---|
| One slot, three strings, three jobs | Two facts sharing a slot | Propose the split. Do not write a fourth variant |
| Every candidate needs a qualifier to be accurate | A leaky abstraction | Name it. Propose which half the user needs |
| The string has to explain why the design is right | The design is not carrying its weight | The explanation goes in a comment |
| An error can only be an apology with no route out | A dead end in the flow | Escalate as a flow bug |

**Say it plainly, propose the best string available under the current design, and mark the row as a holding pattern.** Do not stall the sheet.

### Count the input space

When a slot holds two derived numbers, the pair itself can become a lie at some data values. **Enumerate the reachable inputs and count how many combinations break it.** A number ends the argument where *"this feels ambiguous"* does not.

> Three appetite steps, 2 to 4 people → **117 household shapes. 26 of them (22%) render two identical numbers**, and in every one of those nobody eats a regular portion. `3 plates · 3 portions` for a table of a small kid, a regular adult, and a big eater.

Reach for this whenever a string interpolates more than one computed value. If the enumeration is cheap, run it before writing a single word. It decides whether this is a copy row or a model row.

> **A string that will not come right is a design defect, not a writing defect.** When a message will not fit: ask for more room · split it into chunks · **change the interaction.**

**The pattern to watch:** when the *team* needed a written rule to keep two concepts straight, shipping both to the user in one slot will not work.

---

## References

Load on the trigger, not up front.

| Load when | File |
|---|---|
| **Any WRITE or AUDIT** | `states.md`: the twelve states, error anatomy, component matrix, budgets |
| **Any AUDIT or SWEEP** | `grammar.md`: the ten grammar classes · `tells.md`: the second-order tells |
| A surface read top to bottom, structure-leads, or with related numbers | `cold-read.md`: when it fires, the subagent prompt, the six reactions, order-of-encounter |
| **Defining a voice**, or a string will not come right | `frameworks.md`: voice chart, scenario cards, forms layers, the evidence-cited rules |
| "Not direct enough", or auditing generated copy | `directness.md` |
| Strings span more than one screen | `lexicon.md`: controlled vocabulary, the system-to-human pass |
| A new-user or new-feature flow, **or any activation/retention sequence** | `journey.md`: mapping, prompt/work/follow-up, **and the drive under the sentence** |
| Any string about a person, alt text, an icon-only control | `inclusive.md`: Gate K |
| A model produces the output | `ai-features.md`: **two rules invert here** |
| Ships in more than one language | `localization.md`: **six rules invert here** |
| Consent, cookies, checkout, signup, cancellation | `regulated.md`: **six mandated button labels** |

`scripts/copy-lint.mjs` is the deterministic floor. Point it at UI code, never at data or a corpus.

---

## Handoff

- Give the developer the sheet with `Key` values in the repo's convention.
- Flag every string needing a CMS field. If the CMS injects editing metadata, strip it before any comparison or switch.
- Note which strings need localization.
- A new interactive element ships with a typed `track()` event.
- Save the delivered sheet. When copy changes downstream, it is what says what was approved.

---

## Sources

**Books.** Scott Kubie, *Writing for Designers*: the workflow, the assignment, the inventory, Accuracy → Clarity → Brevity. Erika Hall, *Conversational Design*: Grice's maxims, the four moments, verbs as the interaction, poka-yoke. Krystal Higgins, *Better Onboarding*: guided interaction, prompt/work/follow-up, journey mapping, the placement ladder. Yu-kai Chou, *Actionable Gamification*: the eight drives as naming vocabulary, White Hat / Black Hat, left/right brain, the four journey phases, Rightful Heritage as a word change. **Read it for the classification, not the mechanics**: its own chapter 2 argues against points, badges and leaderboards harder than most voice docs do. Practitioner framework, self-published, and Chou is explicit that he derived it from playing games and went looking for research afterward. The Overjustification citations (Deci 1971; Lepper, Greene & Nisbett 1973) are the part with independent backing.

**Design systems and standards.** [Adobe Spectrum](https://spectrum.adobe.com/page/voice-and-tone/) (all nine UX writing pages) · [Federal Plain Language Guidelines](https://www.plainlanguage.gov/guidelines/) · [Microsoft](https://learn.microsoft.com/en-us/style-guide/welcome/) · [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/writing) · [IBM Carbon](https://carbondesignsystem.com/guidelines/content/writing-style/) · [Atlassian](https://atlassian.design/foundations/content/language-and-grammar) · [GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk) · Shopify Polaris · 18F Content Guide · [NN/g](https://www.nngroup.com/articles/passive-voice-is-redeemed-for-web/) · W3C WCAG, COGA, ARIA APG · Horton & Quesenbery, *A Web for Everyone* (2014), with its dated parts corrected in `references/inclusive.md` · [ISO 24495-1:2023 Plain language](https://www.iso.org/standard/78907.html).

**Practitioners.** Torrey Podmajersky · Kinneret Yifrah · Nicole Fenton and Kate Kiefer Lee · Michael Metts and Andy Welfle · Ginny Redish · Caroline Jarrett · Steve Krug · Erin Kissane · John Saito. Detail in `references/frameworks.md`.

**Frameworks.** The four tonal modes and the trust spectrum are Wise's content design system, reaching this skill secondhand and **not verified at source**: wise.design is JS-gated. "Cleverness is a filter, not an add-on" is General Assembly's. WYLTIWLT is Jonathan Richards', *The Grammar of Interactivity* (UX Booth, 2013). Site offline, confirmed across secondary sources only.

**Cold read.** The reaction taxonomy, the rule that later context does not repair earlier confusion, and "report what works" come from Compound Writing's `cw-reader`. The verify-before-applying step and the order-of-encounter, math and quantifier checks are ours, from the 2026-10-01 incident in `references/cold-read.md`.

**Ours.** The six modes, the gates, the STRING SHEET, the cut checklist, the claim/commentary split, the compression test, band-decides-gate-severity, and the SWEEP queue where clearing an item writes the durable record.
