# Second-order tells

The standard AI-tell lists are vocabulary: *delve*, *leverage*, *robust*, *in today's fast-paced world*. Those are easy, and `copy-lint.mjs` greps them.

**These are the ones that survive that filter.** They are rhythms, not words. Every one of them can be built from perfectly plain vocabulary, which is why a string can pass every other gate and still read as written by a machine, or by a founder quoting their own strategy doc.

Concept and structure adapted from the Every `draft-review-kit` guardrails skill, retuned from long-form prose to interface strings.

**They have two causes and one shape.** A model reaching for a satisfying cadence and a team quoting its own thesis produce identical sentences. Diagnose the shape; the cause only changes where the fix goes.

---

## Rationed, not banned

These are **not errors**. Most are good sentences. The problem is density: one is a signature, three is a template.

Each carries a **cap**, not a prohibition:

| Tier | Meaning |
|---|---|
| **Cap 1** | One per surface, and it should be the line the surface is remembered for |
| **Ration** | Flag the recurrence pattern, not each instance. Note the count |
| **Cut** | No legitimate use in an interface string |

**Flag a strong one anyway.** If a passage is genuinely good and still pattern-detectable, say both: *this is strong, and it is the third of its kind on this screen.* The person decides which survives. Silently keeping all three is how a voice becomes a formula.

---

## 1. The balanced two-beat · **Cap 1**

Two parallel clauses in symmetry, the second one abstract. The single most common tell in a product with a strong strategy document.

```
Two cooking nights. Everything else follows.
Style is the how. Voice is the why.
The engine composes. The person decides.
```

**Why it fires.** Parallelism is earned by *accretion*: three or more concrete details piling up. Cut it to two abstractions and the symmetry stops feeling discovered and starts feeling arranged. The reader hears the shape before the meaning.

**Three fixes, in order of preference:**

1. **Extend to a third beat with a specific.** Two abstractions plus one concrete detail becomes a cascade, which reads as thought rather than construction.
2. **Break the symmetry.** Vary the length or the grammar of one half.
3. **Cut the second half.** Usually the first clause carried the whole fact and the second was the flourish.

Reserve the balanced two-beat for the one line the product is remembered by. One per surface, and most surfaces should have none.

## 2. The correlative · **Ration**

`not X, but Y` and everything wearing its clothes: `X, never Y` · `less X, more Y` · `it isn't X, it's Y`.

```
Report, never rule.
Not a meal planner. A cooking engine.
This isn't a recipe app, it's a week.
```

**Why it fires.** It defines a thing by what it is not, which forces the reader to hold the wrong idea before they get the right one. In prose there is room for that. In a string read in two seconds there is not.

**The fix is always the same: delete the X half and lead with Y.** The reader catches up instantly. `Report, never rule` becomes `We state what we found.`

The negated form is worse in an interface than in an essay, because a person scanning may read only the first half.

## 3. Manufactured reassurance · **Cut**

A statement of what did *not* happen, offered as comfort nobody asked for.

```
Nothing was guessed, which is the point.
Nothing was dropped.
We didn't change anything you set.
```

**Why it fires.** It answers a fear the reader has not had yet. Raising it plants it. This is distinct from a genuine no-op message. `Nothing has moved` on a week that genuinely did not change is a *state*, and states are fine.

**The test: was the reader worried about this before they read it?** If not, the sentence created the worry so it could resolve it.

**The fix:** state what happened. `Saved. Add what it needs in Saved.`

## 4. The aphorism on a screen · **Cut**

A sentence built to be quoted rather than acted on.

```
A dish that did not work is worth more than one nobody reported.
The best week is the one you didn't have to think about.
Every door ends on a night.
```

**Why it fires.** It is a motto. Mottos belong on the marketing site, in the deck, in the doc. A person mid-task is not an audience for a maxim.

**The overlap with narrative leak is total.** See §Narrative leak in SKILL.md. If a string would work as a chapter epigraph, it is not a UI string.

**The fix:** say what the reader does now. `Tell us if it worked. It changes next week's picks.`

## 5. Rule-of-three with nothing in it · **Ration**

Three parallel items, all abstract.

```
Simple, honest, and yours.
No planning, no shopping, no cleanup.
```

**Why it fires, and when it does not.** Three concrete items is a cascade and it works: `No planning, no shopping, no cleanup` names three real chores and is fine. Three abstractions is a jingle: `Simple, honest, and yours` names nothing.

**The test: could a person point at each of the three?** If not, cut to the one that is true.

## 6. Reader projection · **Ration, cap 2**

`Maybe you...` repeated, inviting the reader to fill in their own version.

```
Maybe it's the planning. Maybe it's the shopping. Maybe it's just Tuesday.
```

Warm once. Templated by the third. Two maximum, and the second should be concrete.

## 7. The pseudo-question · **Cut**

A rhetorical question used as a transition, answered in the next breath.

```
So what happens now? Your list gets built.
Why does this matter? Because Tuesday.
```

**Why it fires.** It fakes a dialogue. In an interface, a question mark is a promise that an answer is being requested from the reader. Using it decoratively breaks that promise.

**Exception:** a real question with real options. `Delete this project?` above two buttons is a question doing its job.

**The fix:** delete the question, keep the answer.

## 8. The false-precision flourish · **Ration**

Machine-confident phrasing that sounds authored rather than said.

```
A coin flip with stamina.
Author diversity decay.
The one compression that costs almost no identity.
```

**Why it fires.** It is a coined phrase where a plain description was available. Coinages are a real technique and they belong to the product's actual vocabulary, but a coinage that appears once, undefined, in the middle of a task, is showing off.

**The test:** is this a term the product genuinely uses, defined somewhere, and worth teaching? Then keep it and explain-then-name (`journey.md`). Otherwise it is decoration.

---

## The diagnostic question

Adapted from the guardrails skill, which asks whether a passage sounds like the writer thinking out loud or like a model that found a satisfying rhythm. The interface version:

> **Does this sound like someone telling you where you are, or like a sentence that enjoyed being written?**

The first stays. The second gets a cap.

For a product with strong internal docs, the sharper version:

> **Would this string exist if nobody had ever written the strategy?**

---

## Density check

Run once per surface, not per string. These tells are individually fine and collectively fatal.

1. Count the instances of tells 1, 2, 5, and 6 across the whole surface.
2. **Three or more on one screen means the surface has a voice problem, not a string problem.** Report it that way rather than filing four separate findings.
3. Rank them and keep the best one. Cut or flatten the rest.

A screen where every line has a cadence has no cadence. The one memorable sentence needs plain sentences around it to be memorable.
