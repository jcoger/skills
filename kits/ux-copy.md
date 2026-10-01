# ux-copy

A Claude Code skill for **the strings inside a product**: button labels, empty states, error messages, permission prompts, destructive confirmations, notifications, alt text. The text that, if you deleted it, would break the interface.

Not marketing copy. Not layout. The words in the boxes.

## The problem

Ask a coding agent to build a screen and it will invent the strings. They come out grammatically fine and quietly wrong: `Submit`, `Something went wrong`, `Oops!`, `Are you sure?`, a button that says `Delete` next to code that calls `remove`, an error that names a cause and offers no way out, an empty state that says nothing, and an icon-only control with no accessibility label at all.

The deeper failure is *writing the string inside the box*: sizing a button first, then hunting for two words that fit. That is brevity-first, and it is backwards.

## What it does

Six modes:

| Mode | For | Output |
|---|---|---|
| **WRITE** | A screen or flow with no strings yet | A **STRING SHEET**: every string, every state, with IDs, code keys, and character budgets |
| **AUDIT** | An existing surface | The same sheet, `current` → `proposed`, plus findings ranked by severity |
| **FIX** | One specific string | Three options with reasoning |
| **LEXICON** | "Our labels are inconsistent" | A controlled vocabulary, three-status |
| **LENS** | A high-stakes surface, or one nobody can see clearly | Six reviewer lenses → consensus, tensions, priorities |
| **SWEEP** | A whole product | A read-only, **clearable review queue** grouped by problem type |

## The ideas that make it different

**Accuracy → Clarity → Brevity, in that order.** Brevity is last. Get it true, then clear, then short. "How do I make it fit?" is the right question at the wrong time.

**Cut before you add.** When a string fails a gate, cut it to the bone *first*, then add only what the gate demanded. The repaired string almost always comes out shorter than the broken one, because the padding and the defect were the same words.

```
Broken   The caption did not name enough to read it. Nothing was guessed, which is the point.  (82)
Bolted   ...It is saved. Open Saved to add what it needs.                                      (88)
Right    Not enough in the caption to read. Nothing guessed. Open Saved to add what it needs.  (82)
```

**The claim and the commentary.** A good line arrives, then a clause admiring it arrives behind. `Nothing was guessed` is the claim. `, which is the point` is commentary, written for a reviewer. Cut the commentary, keep the claim, and the string gets shorter *and* more characterful.

**The band decides the gate severity.** Personality is not uniform. A trust spectrum (voice leads / shared / structure leads) decides how hard each gate bites: full strength on billing and errors, relaxed on a profile page. The band chooses *which* words, never *how many*. Personality in a well-run product is shorter than the neutral version, not longer.

**The writer cannot read their own copy cold.** They know what every term means and which numbers are scaled, so the gaps are invisible to them. On any surface read top to bottom, any billing or consent surface, and any surface where numbers relate, the skill hands the rendered text to a subagent that never saw the plan, then checks every finding against the data before applying it. In its first real run, a cold read caught score weights of 40, 15 and 10 presented as the whole score, a list of 5 + 4 + 1 under a heading that said 12, `every card` on a page where five cards had none, and a misquote inside quotation marks. The writer had walked past all of them.

**Twenty binary gates**, three of which fire only on AI output, multi-language products, or regulated flows. Two that most copy guidance lacks:

- **Gate I: too flat for its surface.** Every other gate cuts. On a voice-leads surface, correct-but-lifeless is a failure. Capped so it can never add length.
- **Gate J: voice rules govern product-authored strings only.** Never edit a customer quote to pass a style guide. That fabricates a testimonial, which is worse than the banned word. And the reverse: any words the product puts inside quotation marks are exactly what the person said.

**SWEEP is a queue, not a report.** Findings grouped by problem type so whole groups clear in one reply. Accepting writes a plan file; **rejecting writes a dated entry in "Findings considered and rejected."** Copy is the most re-litigated thing in a product. Without that record, every fresh audit re-flags the same strings forever.

## Install

As a Claude Code plugin:

```
/plugin marketplace add jcoger/skills
/plugin install ux-copy@jcoger-skills
```

Or for any agent that reads `SKILL.md`:

```bash
npx skills add jcoger/skills
```

Then `/ux-copy`, or let it trigger on "what should this button say", "this error is confusing", "sweep the copy", "is this copy accessible".

## Files

```
ux-copy/
├── SKILL.md              modes · gates · register · bands · the artifact
├── references/           loaded on demand, not up front
│   ├── states.md         the 12 states · error anatomy · component matrix · budgets
│   ├── cold-read.md      when a subagent reads it · the six reactions · order of encounter
│   ├── grammar.md        the ten grammar classes an audit checks
│   ├── tells.md          second-order tells, flagged by density not instance
│   ├── directness.md     why copy reads evasive · when passive is correct · WYLTIWLT
│   ├── lexicon.md        controlled vocabulary · the system-to-human pass
│   ├── journey.md        onboarding · prompt/work/follow-up · the drive under the sentence
│   ├── frameworks.md     voice chart · scenario cards · the evidence-cited rules
│   ├── inclusive.md      readability · WCAG wording criteria · alt text · non-visual
│   ├── ai-features.md    strings around model output (two rules invert)
│   ├── localization.md   shipping in more than one language (six rules invert)
│   └── regulated.md      consent, cookies, checkout, cancellation
└── scripts/
    └── copy-lint.mjs     the deterministic floor: run it on UI code
```

## One worked example

`references/directness.md` exists because "that's passive voice" is usually the wrong diagnosis. **No authoritative source bans passive voice.** Adobe, Microsoft, IBM Carbon, GOV.UK, 18F and the Federal Plain Language Guidelines each name situations where it is correct, and softening an error so it does not blame the user is the main one.

What actually reads evasive is a family of mostly-*active* constructions: hidden verbs (`perform a search` for `search`), existential openers (`There are 2 errors`), modal stacking (`you may want to consider`), and vague system-speak with no remedy (`The application has encountered an error`). The file separates them, and marks the four places the sources genuinely contradict each other rather than inventing a consensus.

## Sources

Built on four books, read end to end:

- Scott Kubie, *Writing for Designers* (A Book Apart, 2018)
- Erika Hall, *Conversational Design* (A Book Apart, 2018)
- Krystal Higgins, *Better Onboarding* (A Book Apart, 2021)
- Yu-kai Chou, *Actionable Gamification* (2015), for its classification of motivation only, not its mechanics

The first three are short, excellent, and worth owning. This skill is a working synthesis, not a substitute.

Plus primary guidance from [Adobe Spectrum](https://spectrum.adobe.com/page/voice-and-tone/) (all nine UX writing pages), the [Federal Plain Language Guidelines](https://www.plainlanguage.gov/guidelines/), [Microsoft](https://learn.microsoft.com/en-us/style-guide/welcome/), [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/writing), [IBM Carbon](https://carbondesignsystem.com/guidelines/content/writing-style/), [Atlassian](https://atlassian.design/foundations/content/language-and-grammar), [GOV.UK](https://www.gov.uk/guidance/content-design/writing-for-gov-uk), Shopify Polaris, the 18F Content Guide, and [NN/g](https://www.nngroup.com/articles/passive-voice-is-redeemed-for-web/). The four tonal modes and trust spectrum are Wise's. WYLTIWLT is Jonathan Richards', from *The Grammar of Interactivity* (UX Booth, 2013). The cold read's reader reactions come from the `cw-reader` skill in the Compound Writing plugin, which the skill uses if it is installed.

Where a source is offline (UX Booth, 18F, the old plainlanguage.gov, Polaris's content pages), the reference files say so, so nobody cites a dead link.

Full attribution, claim by claim, is in `SKILL.md` § Sources.

## License

MIT. Made by [Jarrett Coger](https://jcoger.com).
