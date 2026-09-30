# Journey: strings for new users, new features, and returns

Load this when the strings are for onboarding, a feature introduction, a redesign rollout, or a lapsed-user return. The same structure covers all four.

---

## The premise

Onboarding is not a moment. It is not a flow, a tutorial, a video, or a signup. It is a process that connects many actions over time, bridging the gap between trying a product and becoming a core user of it.

**Guided interaction** is the middle path between two failures:

| Failure | Why it fails |
|---|---|
| **Front-loaded instruction**: tour, video, carousel, slideshow, "Let's get started!" | Tries to predict what a person will care about. Presented out of context, before they have touched anything. Only one chance to remember it. Overwhelming. Makes the product seem more complex than it is. Users who sat through a tutorial rated the concepts as *harder* than users who skipped it. Expensive to maintain and localize. Raises awareness without driving behavior. |
| **Unsupported immersion**: drop them in, they'll figure it out | Also overwhelming. Excludes the risk-averse, who want a comprehensive approach before acting. "Our product is simple enough" is an assumption about who gets to be a user. |

The paradox of the active user: people would get more out of a product if they learned it up front, but they will not, because they are motivated by the one specific thing they came to do, not by the product's larger potential. You cannot design around this. Design with it.

**So: weave guidance into the interactions themselves.** The best compliment is a user who does not notice they were guided.

---

## Mapping, before writing a word

You cannot write a prompt without knowing where it sits in a journey.

### 1. Define core use

The end state of onboarding: not expertise, but the point at which someone is doing the activities that make them part of the core user base.

Requirements for a good definition:
- **Aligned to a real business goal**, not a vanity metric. `Has an account` is not core use.
- **Achievable and desirable for the user.** Aspirational but real.
- **Specific.** Not "is retained."
- **Framed around one individual**, not an aggregate percentage.
- **Independent of technology.** Not "sells ten items *with the app*."

> Sells at least ten items per week while maintaining a high seller rating.

Products with multiple audiences need multiple definitions.

### 2. Define core use routines

Three to six recurring behaviors a core user actually does. Onboarding actions build toward these. `Creates an account` is not a routine. It happens once.

### 3. Define entry situations

Richer than entry points. An entry situation is the channel *plus* the motivation and context the person arrives with.

> A person trying to get rid of one piece of clutter found us through search. Their journey needs to succeed with that single item first.
> A person who restores furniture got a referral link and wants a shop. Shorter path to core use.

### 4. Work backward

From each routine, ask what action came immediately before it. Then before that. Keep going until you reach an entry situation. Repeat for different routine/entry combinations. Repeated actions across paths are the high-priority ones.

Working backward is the whole trick: starting from the beginning produces the path you *assume* people take.

### 5. Scope each action

Too broad and it is unclear what problem it solves. Too narrow and it does not solve the problem. A well-scoped action:
- **Produces a benefit the user notices on completion.** If asking for someone's industry has no visible effect, it is not in scope for an onboarding action. Cut it or move it.
- **Includes all the work needed.** Two actions that must always follow each other are one action.
- **Matches the user's definition.** The team may read "create an account" as account + seller profile + demographics. The user reads it as "a login so I can come back."

### 6. Prioritize

- Which actions, if skipped, cause abandonment?
- Which are prerequisites for others?
- Which show up across many entry situations?
- Which can you actually build?

---

## Writing the three parts

Each prioritized action needs strings for prompt, work, and follow-up.

### Prompt

**Pick the context.** The stronger your confidence that this action is relevant and achievable right now, the more prominent the prompt. Low confidence gets a lightweight inline cue; high confidence can earn a full screen. Contextual cues can come from time, prior actions, or what the user just completed. Alexa suggesting music after a morning weather check is relevant; after a kitchen timer it is not.

**Align to the benefit they will notice immediately.** One benefit, the one that lands the moment the action completes.

> Tell us what you drive
> We'll help you find parts and accessories for your vehicle.

**Do not name a concept they have not met.** eBay Motors did not say "The Garage" until after the vehicle was saved.

**Set expectations in the label itself.** `Turn on notifications` promises a tap. `Set up notification preferences` promises decisions. For anything long, preview the work or name the prerequisites: tell someone to charge their device *before* they start.

**Free samples.** Do not force a commitment before the value is visible. Let people use a real portion of the product before the account wall: compose and download a design, see a seven-day forecast, check out as a guest. The context they gain makes every subsequent prompt easier to write and easier to accept. Guest checkout was worth $300 million in one documented case.

Two cautions: do not put a prompt at every turn, and never let someone create work during a free sample and then threaten to delete it unless they sign up.

### Work

**Continuity.** The framing that got them to act carries through every screen of the work. If the prompt said "property alerts," the flow does not switch to "saved searches." Different entry prompt, different messaging through the flow.

**Support sits at the point of work.** Instructions for photographing an ID belong on the camera screen, not on a screen before it. If there is more detail than fits, expand it in place rather than navigating away.

**Subtasks.** Group them on one screen when they are independent and few. Sequence them when they depend on each other or each needs focus. Either way:
- Required subtasks before optional ones.
- Determinate progress. A progress bar or pagination, not a spinner. People need the light at the end of the tunnel more than they need fewer screens. A lack of signposting is usually the real complaint about a "long" flow.
- **No subtask that requires leaving the flow.** Email verification mid-signup is the classic offender. Defer it, or let them continue with limited functionality.

**Alternatives.** A second route to the same outcome, a way to skip the optional part, and a way to save and return. Save-and-return matters most where the investment is largest, which is exactly where you most need people to start.

**Errors** get the treatment in `states.md`: why, what to do, where to go if that fails.

### Follow-up

**Acknowledge in proportion.** Small action, small feedback. Big investment, real acknowledgment. Over-emphasis is disruptive; under-emphasis makes people wonder if it took.

**Close the loop the prompt opened.** If the prompt was about alerts, the confirmation names the alert setting.

**Next steps, with three things to avoid:**
- **No catchall checklists.** A checklist that includes something a given user will never do renders the whole list meaningless. One incomplete item can sit on someone's account page for years.
- **No superficial rewards.** A rewards system is a whole concept that itself needs introducing. Congratulating someone for reading five pages of a PDF gets notifications turned off, not more reading.
- **No launching straight into the next flow.** Let them see the result of what they just did. Tacked-on flows destroy the sense of progress and turn a good experience into a slog.

---

## Where the sources disagree: tours

**Higgins:** front-loaded instruction fails. Tours, videos, and carousels get skipped, are out of context, hard to remember, and expensive to maintain. Users rated concepts taught by a tutorial as *harder* than users who skipped it.

**Adobe Spectrum:** tours and tutorials are legitimate techniques, subject to limits: under 10 steps, one tool or technique each, and the first step sets expectations.

**Both are right, for different products.** Adobe writes for professional creative tools where learning a technique *is* the value being delivered; somebody opening Photoshop to learn cropping wants the tutorial. Higgins writes for products where a person arrived to do one specific thing and the product is in the way.

**The test:** is learning the product the reason they came, or an obstacle to it? For most consumer and service products it is an obstacle. Default to guided interaction. Reach for a tour only when the interface is genuinely novel and orientation is the goal, and cap it as Adobe does.

## Language for anything that teaches

Adobe's research found people read educational content as either beginner-only or too heavy, requiring brainpower they have not budgeted. Word choice moves that more than anything else.

| Lighter | Too heavy |
|---|---|
| tutorial, walk through, show how | course, class, training, lesson |
| try it out, practice, do {thing} | homework, exercise, instruction |
| guided, guidance, session | teaching, education |
| going deeper, develop skills | curriculum, module |

### Jargon: explain, then name

Define on first reference, *then* give the name. Never the reverse, and never the name alone.

**One piece of jargon per sentence, maximum.** Two makes the sentence heavy no matter how short it is.

Jargon relevant to the product's own field is fine and often wanted: someone new to a cooking product may well want to learn what a braise is. Invented jargon is not. Do not create new terms.

### Do not refer to the interface

Say `Go to Learn`, not `Go to the Learn tab`. Avoid `tab`, `panel`, `menu`, `page`, `section`.

Three reasons, all real: the UI does not look the same to everyone, so naming a visual container excludes people; the container changes and the string goes stale; and translators need the referent, not the furniture. Use the name as a standalone proper noun.

### Frame it as theirs, not as a catalogue

| Prefer | Avoid |
|---|---|
| this tutorial and others | the complete collection |
| this and many more | all tutorials |
| beginner · advanced | playlist, full set |

Lead with the specific thing that fits them, then mention there is more. Never open with the size of the library.

### Never name the browser

`Open in browser` is measurably demotivating and reduces engagement. When a link does leave the product, say so without naming the medium: `Go to`, `Play video`, `Find out more`.

And where something stays in-app, **say that**: `right here`, `without leaving the app`, `in-app tutorial`. It is a real benefit and it goes unclaimed constantly.

## Reinforcement

One encounter is not enough for a concept to stick. Retention drops off sharply within a day of first exposure, and repeated exposure spaced over time is what reduces the loss.

Reinforcement is not repetition. It is finding the contextual moments where a point needs restating, in the words that fit that moment.

> A code of conduct agreed to once at signup is forgotten.
> A summary pinned in the main feed, snippets beside the comment field, snippets beside the compose view, and a clear explanation when something is flagged. That gets adopted.

**The test:** if you cannot find reasonable, contextually relevant places to remind someone of a thing, it is not as important as you think, and it does not belong at first run either.

---

## Beyond first run

The same structure covers three other situations, and the strings work the same way.

**New feature introduction.** Inline prompt into the feature, in-context guidance through first use, follow-up confirming success and suggesting next steps. Not an overlay announcing that a feature exists.

**Product or service update.** High-priority messages go at the point of the relevant interaction, not at launch. A transit app warning about non-essential travel puts it on the trip search, where it is read, not on a first-run screen where it is dismissed.

**Redesign or migration.** Guidance inside the old version, priming for the change. Opt-in to the new version, and the ability to switch back for a period, so people learn the differences at their own pace.

**Lapsed return.** What changed since they were last here, and how to pick up where they left off.

---

## Documenting the outcome

Alongside the STRING SHEET, record the journey decisions so the next person does not remap from scratch:

```
Core use:            Sells 10+ items/week with a high seller rating
Core use routines:   Maintains a storefront · Responds within 24h ·
                     Lists 5+/week · Ships within 2 days
Entry situation 1:   Wants to clear clutter; found us via search
  Prioritized:       Views similar items → Copies details → Creates account →
                     Posts first item → Downloads app → Turns on notifications
Entry situation 2:   Wants a shop; arrived via referral link
  Prioritized:       Redeems trial → Customizes theme → Posts first item → ...
```

This becomes the rollout order. Ship actions in journey order, and never ship an action whose follow-up points at a next step that does not exist yet.

---

## Do not silo it

Onboarding guidance that lives apart from the design system drifts. Standardize the patterns into the pattern library, organized by *the user need they address* rather than under a heading called "onboarding". The same pattern usually serves new and existing users with the same need.

And do not let one person own it. A team with a new onboarding designer every year starts from scratch every year, which is exactly how a product ends up back on front-loaded instruction.
