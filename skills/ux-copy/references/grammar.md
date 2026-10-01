# Grammar for strings

Load for any AUDIT or SWEEP, and any time a string reads slightly wrong and nobody can say why.

**Interface strings break grammar in a small, repeating set of ways.** They are short, they are written fast, they are read out of context, and they are usually written by someone thinking about the feature rather than the sentence. "Check the grammar" is not actionable. These ten classes are.

`scripts/copy-lint.mjs` catches the mechanical half. This file is the half a regex cannot see.

---

## 1. The comma before "and"

The most common error in short product copy.

**One subject, two things = no comma.** That is a compound predicate, not two sentences.

```
Wrong    The shop buys a little more chicken, and a little less rice.
Right    The shop buys a little more chicken and a little less rice.

Wrong    Saved, and not read.
Right    Saved and not read.
```

**Two complete sentences = the comma is correct.**

```
Right    The amounts are the recipe's own, and none of them are on your list.
         (`none of them are` has its own subject and verb)
```

**The test:** cover everything before the comma. Can what remains stand alone as a sentence? If yes, keep the comma. If no, delete it.

**A fragment plus a clause is the same error wearing a disguise.**

```
Wrong    Hotter in the pan for them, and the mild side becomes a separate pot.
Right    Hotter in the pan for them. The mild side becomes a separate pot.
```

## 2. Adjective doing an adverb's job

An adjective describes a thing. An adverb describes an action. UI copy reaches for the shorter word and gets the wrong one.

```
Wrong    you salt lighter at the stove
Right    you salt more lightly at the stove
Better   you use less salt at the stove
```

The third is best: the error is usually a signal that a stronger verb was available.

**Do not over-apply this.** English has flat adverbs: words identical in both roles. `Cook faster`, `move slower`, `press harder`, `think different` (deliberate) are all fine. `faster`, `slower`, `harder`, `quicker`, `deeper`, `closer` need no `-ly`. The genuine errors cluster on `lighter`, `softer`, `different`, `easy`, `careful`, `gentle`.

## 3. A thing given a mind

Systems do not know, want, think, believe, decide, remember, or buy. When a string says they do, the real actor has gone missing.

```
Wrong    the list does not know yet
Right    the list has not been updated yet
Better   Buy double. The list still shows the single amount.

Wrong    The shop buys more chicken.
Right    You buy more chicken.
```

Not a style preference. Personifying a component hides who is responsible, which is the same failure as an agentless passive (`directness.md`, the hard limit). Naming a file, a module, or a screen as the actor is the tell.

## 4. Pronoun with nothing to point at

**Every string is read out of context.** A screen reader announces it alone. A notification arrives with no screen. A toast appears over unrelated content. A pronoun in the first three words has nothing behind it.

```
Weak     It didn't happen, we ate something else
Better   Dinner didn't happen. We ate something else.

Weak     This one needs you to place it.
Better   This dish needs a night.
```

Mid-string pronouns are fine when their antecedent is inside the same string.

## 5. Count and mass

| Countable | Uncountable |
|---|---|
| fewer items | less time |
| number of files | amount of storage |
| many photos | much space |

`fewer` where you can count them, `less` where you cannot. `3 items or fewer`, `less than an hour`.

## 6. Dangling modifiers

An opening phrase attaches to whatever noun follows it. Get that wrong and the sentence says something absurd.

```
Wrong    Once saved, you can find it in your library.
         (you were not saved)
Right    Once it is saved, you can find it in your library.
Better   Saved dishes live in your library.

Wrong    To continue, an account is required.
         (the account is not continuing)
Right    To continue, create an account.
```

Very common in onboarding, where instructions start with a condition.

## 7. Parallelism

Anything appearing together must share a shape. Paired buttons, list items, tabs, settings rows, sequential steps.

```
Wrong    [ Save ]  [ Cancelling ]
Right    [ Save ]  [ Cancel ]

Wrong    · Add a dish
         · Choosing a night
         · The list gets built
Right    · Add a dish
         · Choose a night
         · Build the list
```

If the list is actions, every item leads with a verb. If it is things, every item is a noun. Never mixed.

## 8. Agreement with counted things

```
Wrong    3 items is ready
Right    3 items are ready

Wrong    1 items remaining
Right    1 item remaining
```

**Interpolated counts need both branches written.** `{n} item{s}` fails at zero in several languages and is a localization trap. Write the singular and plural forms explicitly.

## 9. Tense drift across a set

Within one screen, one flow, one set of related strings, pick a tense and hold it. Simple past, present, future only. Nothing perfect, nothing progressive (`directness.md`).

```
Drifting   Your file was saved. We're updating your library. The list will have been built.
Holding    Your file is saved. Your library is up to date. The list is ready.
```

## 10. Wrong part of speech for the job

The UI-specific version of the whole category.

| Slot | Wants | Wrong |
|---|---|---|
| A button, a menu action | **verb** | `Settings` for an action, `Confirmation` for a submit |
| A destination, a tab, a nav label | **noun** | `Save` for a place |
| Describing how an action happens | **adverb** | `salt lighter` |
| Describing a thing | **adjective** | n/a |
| A heading | **noun phrase or imperative** | a gerund: `Adding a dish` → `Add a dish` |

A noun on a button and a verb on a tab are the two that confuse people most, because they break the promise the label makes about what happens next. `directness.md`'s WYLTIWLT test catches the first in three seconds.

---

## Running the check

Read the string **aloud, cold, with nothing else on screen.** Most of these ten announce themselves that way and are invisible on the page.

For a set of strings, read them **in sequence**: parallelism, tense drift, and agreement only show up in company.

```bash
node scripts/copy-lint.mjs ./src        # the mechanical half
```

**Point it at UI code, not at data.** A knowledge base, a fixture set, a corpus of quotations, or a research file will produce a wall of noise. Book citations legitimately use semicolons and em dashes. Scope it to where components live, and put anything else in the config's `ignore`.
