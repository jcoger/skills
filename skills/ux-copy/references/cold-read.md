# The cold read

The writer cannot read their own strings cold. They know what `the target` is, why the weights look odd, and which feature is not built yet. So they fill every gap without noticing it was there. Gate H ("read aloud, cold") is honest only when someone else does the reading.

**The fix is mechanical: hand the rendered copy to a subagent that has never seen the plan, and ask it to read as the real reader.** Then verify what it reports before you apply any of it.

> **Incident, 2026-10-01.** A client-facing casting read for a talent agent. The writing session had been through a UI design skill, a typography skill and a voice pass. A cold-read subagent, given only the visible text in reading order, found: score weights of 40 + 15 + 10 presented as the whole score (65%, and *"she will add it"*); a list of 5 + 4 + 1 under a heading that said 12; `every card carries a first email` on a page where five cards had none; quote marks around words a creator never said; `the target` used before any target was shown; and a "not built yet" label placed *after* four present-tense claims about the unbuilt feature. None of these are style findings. Every one is a trust finding, and the writer had walked past all six.

---

## When it fires

| Surface | Cold read |
|---|---|
| Anything read **in one sitting, top to bottom**: a client-facing page, a report, a long onboarding sequence, a settings page with explanations | **Required** |
| Structure-leads band: billing, consent, errors that explain a policy | **Required** |
| A surface with numbers that relate to each other: scores, totals, counts, funnels, prices with breakdowns | **Required** |
| A STRING SHEET of more than about 10 strings for one surface | Recommended |
| One button, one toast, a FIX | Skip. The LENS table is enough |

---

## Running it

**1. Extract what the reader actually sees, in the order they see it.** Not the source file, not the sheet. Pull the visible text from the running page. Then pull a second file with strings that render only on interaction (tooltips, panel labels, level descriptions built in JavaScript, error states). The subagent cannot hover.

**2. Name the reader and their expertise.** The reader is not a generic outsider. A casting agent catches a lip-products creator ranked first on a nail brief. A generic reader does not. Say what they know cold and what they do not:

> She is an expert in casting and outreach, not in software or scoring models. Calibrate the read to her.

Also say whether they read it alone. A page walked through live and then reread alone has two readers, and the second one has nobody to ask.

**3. Give the subagent the hard rules, and nothing else from the plan.** Voice rules, banned words, what not to touch (quoted words, handles, numbers). **Do not hand over the plan, the brief, or the reasons.** The whole value is that it does not know them.

**4. Ask for findings first, then rewrites.** Use Compound Writing's `cw-reader` if it is installed. Otherwise use the prompt template below. Ask for every original string **verbatim**, so each one can be found with a search.

**5. Verify before applying. The reader's findings are hypotheses.** Check every factual claim against the data or the code. The reader is right that `40 + 15 + 10` reads as 65%. Only the code knows whether the score is scaled to 100. A reader-proposed rewrite that states a fact you have not checked is the same Liar defect, written by someone else.

**6. Run every gate on every applied rewrite.** A rewrite is a new string (default failure 5). The reader does not know the lexicon.

---

## The six reactions

Name the reaction before the cause. Each one points at a different repair.

| Reaction | Usual cause | Usual repair |
|---|---|---|
| **I don't understand** | Internal shorthand, a term not defined, a sentence that needs a reread | System-to-human pass (Gate R). Split the sentence |
| **I'm missing something** | A thing named before it was shown | Introduce it at first use, or move the first use |
| **I don't believe this** | Numbers that do not reconcile, a claim broader than the evidence, a quote that is not verbatim | Fix the fact, not the wording |
| **I don't know why I'm here** | No stakes or next step near the top | Introduction moment: the six unspoken questions |
| **I feel pushed away** | A put-down of something the reader chose, presumption, a word that sounds like it is about them but is not | Reword around the reader's own choice |
| **I expected something else** | A label or heading that promises one thing and delivers another | Change the promise, or the thing |

**Severity is about the read, not the defect:** *Stops the read* · *Causes a stumble* · *Worth noticing*. A "stops the read" finding on a structure-leads surface blocks the sheet.

---

## What the cold read catches that per-string gates miss

Gates A to U judge one string at a time. These four judge the surface as a path.

**Order of encounter.** Confusion created early is not repaired by a definition later. Trace first use, not first definition.

```
Broken   The target follows the card you're on.        ← line 6, no target shown yet
         ...
         Tap them on the target.                       ← line 31, target finally on screen
Right    The bullseye chart on the side marks whichever creator you're reading.
```

The same rule for disclaimers: **a qualifier goes before the claims it qualifies.** `Not built yet` after four present-tense sentences is read last by the reader who skims, which is every reader.

```
Broken   Where this is going  → four present-tense claims → "Not built yet."
Right    Where this could go (not built yet)  → the claims
```

**The reader does the math.** Any set of numbers on one surface will be added, compared, and counted. Before shipping, do it for them:

- Do the parts add up to the whole? (weights to 100%, items in a list to the count in the heading)
- Do the funnel steps only go down?
- Does a "top" or "best" item actually rank first?
- Is the order of a list meaningful, and if not, does it look like it is?

Reconcile it, or say in the copy why it does not (`The total is scaled to 100.`).

**Quantifiers are claims.** `every`, `all`, `none`, `always`, `each`, `only` are checked against every instance on the surface, not the typical one. `every card carries a first email` is false if one card does not.

**Quotes are verbatim, inside product copy too.** Gate J protects a quote from being edited. This is the other half: when the product quotes a person (a user's own words reflected back, a creator line in a drafted email), the words inside the marks are exactly what they said. A paraphrase goes outside quotation marks. A misquote in personalized copy is worse than no personalization.

---

## Keep what works

The reader also reports what landed on first contact. **Carry those strings into the sheet as locked**, with the reason, so the next pass does not "improve" them. A cold read that only lists faults invites rewriting the strings that were carrying the page.

---

## Prompt template

When Compound Writing's `cw-reader` is not installed, spawn a subagent with this. Fill the brackets. Leave the plan out.

```
Read this copy as [reader], encountering it for the first time.
[What they know well. What they do not. Whether they read it alone.]

INPUTS
- Visible copy, in reading order: [path]
- Strings that only render on interaction: [path]
- Live surface, if you want to see it: [url]

Read once, top to bottom, before proposing anything. Track where a term or
reference arrives before it is explained, where you would reread, where you
would stop believing a number or claim, where you feel talked down to, and
where a heading promised something the section did not deliver. Add up every
set of numbers that relate. Check every "every", "all", "none" against each
instance. Later context does not repair earlier confusion.

For each finding: the exact string, your reaction (don't understand / missing
something / don't believe / don't know why I'm here / pushed away / expected
something else), the cause, and severity (stops the read / stumble / worth
noticing).

HARD RULES for any rewrite: [voice rules, banned words, do-not-touch list].
Do not state a fact you cannot see on the page. Flag it as a question instead.

OUTPUT [path]:
1. Findings, most important first, max 12.
2. What works on first contact. Name the strings.
3. Replacements: | # | original, verbatim | replacement | why |
4. Questions that are not copy problems (scoring, data, product decisions).
```

Section 4 matters. The cold read is often the first place a model or product problem shows up, because the reader is the first person who did not already know the answer. Route those to "When it is not a string problem" in `SKILL.md`, not into a rewrite.
