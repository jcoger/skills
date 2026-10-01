# Voice, and the models worth running

## Defining a voice

### Use a voice chart, not a list of adjectives

Three principles across the top. Six dimensions down the side. Fill every cell.

| | Principle 1 | Principle 2 | Principle 3 |
|---|---|---|---|
| **Concepts** | what to surface, even off-task | | |
| **Vocabulary** | words that support or undermine it | | |
| **Verbosity** | how many words it earns | | |
| **Grammar** | imperative, question, fragment, sentence | | |
| **Punctuation and caps** | | | |

Punctuation is the **last** row. Most style guides start there and never reach vocabulary or verbosity, which is why they cannot settle an argument about a specific string.

### Define every trait with its failure mode

Never a bare adjective.

| Do | Don't |
|---|---|
| Fun, but not silly | Fun |
| Confident, but not cocky | Confident |
| Helpful, but not overbearing | Helpful |

### Ask what the product is absolutely not

Negative space defines a voice faster than positive space. Three things it would never say.

### Scope humour by occasion, not by presence

Not *"do we use humour."* **"When do they use it?"** A product with humour everywhere has none.

---

## Tone

### Pick the mode before writing

| Mode | The job |
|---|---|
| **Standing Out** | Build desire before detail |
| **Converting** | Remove friction, then reward the decision |
| **Adding Delight** | Reward attention with one perfect detail |
| **Reassurance** | Human first, logistics second |

### Write to the feeling, not the component

Same component, different moment, different copy. Build the string from a scenario card:

| Slot | |
|---|---|
| **Type** | Failure message |
| **User** | *"What went wrong? I really need to get this out."* |
| **Feelings** | confusion, stress, anger |
| **Tips** | Offer a next step. Stay calm. No exclamation points. Don't joke with frustrated people |
| **Copy** | |

Slot 2 is a **quote**, in the person's own words. Write it before any product copy exists.

### Scope banned words to the moment, not the product

`immediately` is fine on a settings screen and wrong on a failure. A global ban list is a blunt instrument.

---

## Editing

### Edit in four passes, in this order

**Purposeful → Concise → Conversational → Clear**

Clarity edits on unpurposeful text are wasted. Do not reorder.

### Kill happy talk

Introductory text that welcomes people and says how good the product is.

> **Test:** you can hear a small voice saying *"blah blah blah blah."*

### Kill preamble, keep field help

| Do | Don't |
|---|---|
| Remove the paragraph explaining the form | Remove the format hint under the field |

Instructions before a task should be designed away. Instructions *at* a field are required (WCAG 3.3.2).

---

## Words

### Avoid negative contractions

| Do | Don't |
|---|---|
| You cannot undo this | You can't undo this |
| Do not close this window | Don't close this window |
| You'll get an email · We'll save it | |

Positive contractions are fine and cause no measured difficulty. **Negative ones are misread as the opposite of what they say.**

### Write headings as statements

| Do | Don't |
|---|---|
| Front-load your headings | Should you front-load your headings? |

A question spends the first slot on *who / what / when / where / why*, so the front-load is lost.

### Front-load link text, and keep links out of mid-sentence

| Do | Don't |
|---|---|
| Buy pink grapefruits | Grapefruits for sale, pink ones only |
| *(link at the end of the sentence)* | *(link in the middle)* |

Mid-sentence links slow scanning and are a readability problem for autistic readers.

### Use numerals

| Do | Don't |
|---|---|
| 2 items · 9 nights | two items · nine nights |
| One item left *(step or list point)* | |
| Nine people joined *(opens a sentence)* | |

Avoid `0` and `1` where they read as O, I, or l. Ranges take `to`, not a hyphen: `500 to 900`.

### Only say "we" when a person did the work

| Case | Use |
|---|---|
| The user acts on the interface | `I`, `my`, and only if needed for clarity |
| The product asks, instructs, describes | `you`, `your` |
| **Real humans did it** | `we` |
| Everything else | **no pronoun** |

There are no human beings processing a search. Do not say `we` about a system.

### Only say "we" for the reader who can tell who "we" is

`we` is safe only where it is already obvious **in that section**. People arrive mid-page and skim.

---

## Forms

### Work the three layers top-down

| Layer | Ask |
|---|---|
| **Relationship** | Why are we asking at all? Is now the right time? Can we get it another way? |
| **Conversation** | Are the questions in a logical order? Are the response spaces the right size? |
| **Appearance** | Do headings organize it? Is it readable? Are instructions concise? |

A field nobody should be asked for cannot be rescued by a better label. Most form-copy problems are relationship problems.

### Put everything needed for an action above the action

> **Label > Instruction > Field.** Never below the button.

A person using a screen reader pressed Confirm five times because the required checkbox and its error sat below it. They abandoned the purchase.

Layout, page structure, validation timing and required/optional marking (the non-word half): a UI design or layout skill.

---

## Layering

### Write the same message at three depths

**Bite, snack, meal**: label, helper text, help article.

| Depth | Example |
|---|---|
| Bite | `Slow-braised short rib` |
| Snack | `Built around bone broth and root vegetables` |
| Meal | `Braised 4 hours, then finished with a paprika oil made from scratch` |

The bite must stand alone. The snack and the meal may never carry anything needed to act.

---

## Settling an argument

### Use data, not taste, when two terms are both defensible

1. **Google Trends**: which phrasing people search. `sign in` beats `log in`.
2. **Ngram**: for plausibility, not popularity. `sign your name`, not `sign your signature`.

Bring the chart. It changes minds that *"sounds funny"* does not.

### Give every string an owner

Publish no string without a support plan. A string nobody owns and nobody updates is debt.

### Say when the problem is the design

> **A string that will not come right is a design defect, not a writing defect.**

When a message cannot fit, three moves in order: ask for more room · split it into chunks · **change the interaction.** The component is a variable, not a constant.

State this plainly. It is the best-supported claim in the literature, and no major design system says it.

---

## Sources

Torrey Podmajersky, *Strategic Writing for UX*: the voice chart, the four editing passes · Kinneret Yifrah, *Microcopy: The Complete Guide*: negative-space voice, the ordering law · Nicole Fenton and Kate Kiefer Lee, *Nicely Said* and voiceandtone.com: this-but-not-that, scenario cards · Michael Metts and Andy Welfle, *Writing Is Designing* · Ginny Redish, *Letting Go of the Words*: bite, snack, meal · Caroline Jarrett, *Forms That Work*: the three layers · Steve Krug, *Don't Make Me Think*: happy talk · Erin Kissane, *The Elements of Content Strategy*: supported content · John Saito: the pronoun rule, the data method · [Readability Guidelines](http://readabilityguidelines.wikidot.com/): the contraction, heading, link and number rules, each with published usability evidence. Retired 8 June 2026; alpha wiki still readable.
