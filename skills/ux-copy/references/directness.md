# Directness: why a string reads evasive

Load this when copy is grammatically fine and still makes a reader say "what?", when auditing generated copy, or when someone says a string "isn't direct enough."

**The headline: passive voice is almost never the actual problem.** No authoritative source bans it. Adobe Spectrum, Microsoft, IBM Carbon, GOV.UK, 18F, and the Federal Plain Language Guidelines all name situations where passive is the correct choice. Reaching for "that's passive voice" as the diagnosis is usually a misread of one of the seven patterns below, most of which are grammatically active.

---

## Identifying passive, if you need to

**The zombie test** (Dr. Rebecca Johnson, via the 18F Content Guide): if you can add *by zombies* after the verb and the sentence still works, it is passive.

> The file was deleted *by zombies*. ✓ passive
> Zombies deleted the file. ✗ active

## When passive is correct

| Situation | Source |
|---|---|
| Softening a message, providing distance (a disabled account, a rejection) | Adobe Spectrum |
| Avoiding blaming the user, **especially in errors, warnings, and notifications** | Microsoft Style Guide; Microsoft Windows UX Guide |
| Softening an error message | 18F Content Guide |
| The system genuinely is the subject and the human is secondary | IBM Carbon |
| The actor is unknown, or unimportant to the reader | Mary Dash (plainlanguage.gov); Federal Plain Language Guidelines |
| The outcome matters more than the agent | GOV.UK |
| Headings and links, where front-loading a keyword aids scanning | NN/g, *Passive Voice Is Redeemed For Web Headings* |

**The hard limit,** and the only near-universal rule on this: never use passive in a way that makes actions appear to happen with nobody doing them. That is 18F's line, and it is the one worth enforcing.

Microsoft's own worked pair: the active `You entered an incorrect logon` is marked **incorrect** because it blames the user. `Incorrect password` is marked correct. Active is not automatically better.

---

## The seven patterns that actually cause it

Most of these are grammatically active. That is why "passive voice" never quite fits what you are looking at.

### 1. Hidden verbs (nominalization)

A verb buried inside a noun, propped up by a weak one. The single best-documented pattern, and the most common in generated copy.

**Tells:** endings in `-tion`, `-ment`, `-sion`, `-ance`, `-ing`. Pairing with *make, take, give, have, do, achieve, perform, conduct, provide*. A noun sitting between "the" and "of."

```
make an application        →  apply
carry out a review         →  review
perform a search           →  search
establish connectivity     →  connect
undertake the calculation  →  calculate
provide confirmation       →  confirm
```

*Federal Plain Language Guidelines (§"Avoid hidden verbs"), GOV.UK, Microsoft. No modern design system covers this. It is a plain-language inheritance.*

> **Citation trap:** the Federal Guidelines section titled "Don't turn verbs into nouns" is about noun strings, not nominalization. The nominalization guidance is under "Avoid hidden verbs." Easy to miscite.

### 2. Existential openers

```
There are 2 errors on this page.   →  Fix 2 fields to continue.
There is a problem with your card. →  Your card was declined.
```

*Microsoft "Top 10 tips", tip 10. One unlabeled Polaris example. Nobody else covers it, so Microsoft is the only citation available.*

### 3. Modal stacking and permission language

Hedges that make a required step read as optional.

```
you may want to consider  →  (cut entirely, or: state the action)
you can now save          →  Save
is required to            →  must
is permitted to           →  may
We recommend you change your password  →  Change your password
```

Also cut: **please**, **please note**, **sorry** in instructions. "Please" turns a required step into a suggestion.

*Federal PL Guidelines (modal table), Microsoft, Polaris ("don't use permissive language"), GOV.UK, Atlassian, Carbon.*

### 4. Vague system-speak with no remedy

`The application has encountered an error` fails **not** because the system is the subject. Carbon endorses system-as-subject when the system genuinely is the subject: `The database needs to be rebooted` over `Someone needs to reboot the database`.

It fails because it is vague, jargon-heavy, and offers nothing to do next.

```
That password is too short  →  Choose a password with at least 8 characters
Invalid ID                  →  You need an ID that looks like someone@example.com
Invalid name.               →  Use only letters for your name
```

*Apple HIG; Microsoft; Polaris. The fix is a remedy, not a grammar change.*

### 5. Gerund headings

```
Adding a page to your project  →  Add a page to your project
Shopping                       →  Shop
```

*Atlassian bans them in UI copy. NN/g prefers base verb forms in navigation. Microsoft warns on ambiguity without banning.*

### 6. Front-loaded conditions

**The sources genuinely disagree here.** Do not cite consensus.

- **Against:** Microsoft marks `If you want to add effects to your image, select filters` as the Don't, against `Select filters to add effects to your image`.
- **For:** Material M2's "Begin with the objective" says the opposite: `To remove a photo from this album, drag it to the trash` is the Do.
- **Neither:** Federal PL Guidelines give a length rule instead. Short condition that prevents a misreading goes first. Long condition with a short main clause goes last. Both long, use an if-then table.

**This skill's position:** verb first by default, condition first only when reading the action without the condition would mislead. Say which you did and why when it matters.

Regardless of side: **`in order to` → `to`.** Banned outright by GOV.UK and 18F.

### 7. Weak main verbs

Ban *be, have, make, do* as the load-bearing verb of a sentence. Almost always a hidden verb in disguise. *(Microsoft word choice.)*

---

## Who is the sentence about

Universal agreement across every source checked: **address the person as "you."** The Federal Guidelines call it the highest-impact technique available; Mary Dash calls pronoun choice the single biggest factor in tone.

Everything else is contested.

### The "we" problem: sources directly contradict

| Position | Source |
|---|---|
| Ban it. Who "we" refers to is unclear | Apple |
| Avoid, write around it | Material, Microsoft, Polaris |
| **Require it in errors**, so people are not blamed | Atlassian |
| Fine for the company, explaining itself | Carbon |

Atlassian's Do (`We couldn't load your page`) is nearly Apple's Don't (`We're having trouble loading this content`). Both defensible. They cannot both be one product's style.

**This skill's position, following Polaris, which reconciles all three concerns:**

> **"We" appears only when the product is at fault.** Never for a routine action, never for a user error, never for a system state nobody caused.

```
We couldn't save your changes.        ✓  we broke it
We need your email to continue.       ✗  →  Enter your email to continue.
We found 3 results.                   ✗  →  3 results.
```

### The other person rules

- **"I" / "my" only for consent and permissions.** `I agree to the terms` is correct because the person is the one agreeing. Everywhere else, do not speak *as* the user. Speak *to* them. *(Adobe, Apple, Material, Polaris agree.)*
- **Singular they.** Never `he/she` or `(s)he`. *(Adobe Spectrum, explicitly.)*
- **Possessives are usually unnecessary.** `Favorites` says what `Your Favorites` says, shorter. *(Apple. Reinforces the existing ban on `My [anything]`.)*

### Adobe's framing, which is subtler than the rest

> In UX content, we want to talk about what's happening rather than who or what is making something happen.

Worth sitting with, because it cuts against naive active-voice advice. The goal is not to find an actor for every sentence. It is to describe the situation the person is in. Sometimes that has an actor and sometimes it does not, and forcing one in produces exactly the stilted copy this file exists to prevent.

---

## Buttons: the WYLTIWLT test

From Jonathan Richards, *The Grammar of Interactivity* (UX Booth, 2013), cited by Kubie. Pronounced "wilty-wilt."

**A button label must make grammatical sense after both:**

1. **"Would you like to…?"** (the system asking)
2. **"I would like to…"** (the person answering)

```
Learn more   →  "Would you like to learn more?" / "I would like to learn more."   ✓
Settings     →  "Would you like to settings?"                                     ✗
Free themes  →  "I would like to free themes?"                                    ✗
Create My Account → "I would like to create my account"  ✗ (whose account?)
```

It forces a verb into every label and rejects noun-only and pronoun-laden ones. It is the fastest button test available and it takes three seconds.

> **Verification note:** UX Booth is offline and the original article could not be read directly. The test's name, author, date, and mechanism were confirmed across four consistent secondary sources. Treat the exact phrasing as secondhand.

### Imperative for actions: near-universal

`{verb} + {noun}`, except for conventional labels (`Done`, `Close`, `Cancel`). Drop articles. `OK` is an exclamation, not an action. Avoid it on anything consequential.

*Polaris (most explicit), Apple, NN/g, Carbon, GOV.UK, Mailchimp, Atlassian.*

**Two gaps worth knowing:** Material M3 dropped M2's button-verb rule entirely and now gives only a length guideline. Microsoft's default mood is indicative, not imperative, scoped narrowly to procedures, the only source that narrow.

---

## Where this skill's rules and Adobe diverge

Deliberate, not oversights. Recorded so nobody re-raises them.

| Adobe Spectrum says | This skill's rule | Note |
|---|---|---|
| Use em dashes with spaces to separate related thoughts | **Zero em dashes** | This skill wins. Material M3 independently says avoid em dashes in UX writing |
| Sentence case everywhere; all caps never for emphasis | One cooking app uses all-caps mono eyebrows | Defensible: that app scopes them to state, counts, and column headers, which is labelling, not emphasis. Flag if they drift into emphasis |
| No emoji in any interface language | Non-verbal cues treated as part of the string | Adobe's reasons are real: localization and comprehension. Adopt for anything shipping in more than one language |
| No exclamation marks: hard to localize, easy to overuse | Same | Agreement |
| No semicolons: formal, measurably hurts comprehension | Adopt | New. Add to the proofing list |
| No ampersands. Spell out "and" | Adopt | New. More localizable, and `&` draws the eye to the least important word |
| No slashes to join ideas, never `and/or` | Adopt | New. Reads noncommittal |

## Punctuation worth adopting wholesale

Adobe's rules here are the most complete of any source and conflict with nothing in this skill's style.

- **Periods:** a full sentence gets one. A short phrase, standalone or in a toast or banner, does not. **Never in a header or on a button.**
- **Lists:** no terminal punctuation, unless an item is a complete sentence. Then every item gets one. Capitalize each item, sentence case. Action lists all lead with a verb; noun lists all stay nouns.
- **Colons:** fine to introduce a list or steps. **Never at the end of a form field label**. The component already shows the relationship.
- **Ellipsis:** for truncation, and for in-progress states. Avoid on buttons unless the button leads somewhere requiring further action. Dropped when referring to the element in running text.
- **Question marks:** the only punctuation acceptable in a title. Never rhetorical.
- **Serial comma**, always. If a sentence needs many commas, split it.
- **Smart quotes**, except in code. Only for quoting a person or naming a file.
- **Asterisk** or `(required)` to mark a required field. **Never** to mark something optional.

## Verb tense

Simple past, present, future. Nothing perfect, nothing progressive.

**The test:** if `was, were, has, have, is, are, be` sits before the verb, or the verb ends in `-ing`, it is not simple tense.

```
You've entered an incorrect password.  →  You entered an incorrect password.
You're not undoing this action.        →  You can't undo this action.
Your card will have been charged…      →  Your card will be charged…
```

Fewer words, faster to scan, and materially easier for the large share of readers whose first language is not English. *(Adobe Spectrum.)*

## Contractions

Use the common ones: `what's, we'll, you'll, you're, can't, isn't, doesn't`. They keep copy from reading robotic.

**Not** when contracting a noun with *is/does/has/was* (reads as a possessive). **Not** the old-fashioned or colloquial ones. **Not** in legal, payment, or account-security copy. Casual is wrong when the stakes are money or access. *(Adobe Spectrum.)*

This maps cleanly onto the bands: contractions relax as you move from structure-leads toward voice-leads.
