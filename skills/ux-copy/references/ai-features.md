# Strings for AI features

Load for any surface where a model produces output a person sees, acts on, or is asked to trust. Chat, generated text or images, suggestions, summaries, auto-fill, agent actions, confidence displays, consent for training data.

**This file inverts two rules that hold everywhere else in this skill.** Read the conflicts first.

> Not legal advice. The regulatory section states what the cited texts say. Dates and scope move; verify against the source before shipping anything you are relying on.

---

## Two rules that flip here

### 1. Hedging is required, not weak

`directness.md` treats modal stacking and hedges as defects: `you may want to consider` gets cut, `we recommend you change your password` becomes `Change your password`. **That is correct for deterministic UI and wrong for probabilistic output.**

Microsoft's HAX guideline **G2-A** requires the opposite: *match the precision of the words to the precision of the system.* Certain language (`will`, `is`) only when performance is genuinely high. Uncertain language (`may`, `might`, `we think`) when mistakes are likely.

**An unhedged claim about a probabilistic feature is a defect**, and HAX names the consequence: over-inflated expectations cause frustration and product abandonment.

Four pitfalls HAX names, which stop this becoming an excuse for mush:

- Over-certain language inflates expectations.
- Excessively uncertain language makes people underestimate a system that works.
- **Hedging so vague it becomes meaningless**: `this might not be right` says nothing.
- Hedging so subtle nobody notices it.
- Treating every kind of uncertainty identically.

**The resolution between the two files: hedge the confidence, never the instruction.** `We think this recipe feeds 4. Change it if not.` Uncertain about the estimate, imperative about what to do.

### 2. A required disclosure goes first, against the placement ladder

The placement ladder says never front-load, never interrupt first use. **EU law now requires exactly that for AI interaction.** See below. Budget one line in the highest-attention slot and spend the craft everywhere else.

---

## Mandatory: EU AI Act Article 50

**In force since 2 August 2026.** Deliberately excluded from the Digital Omnibus deferral that pushed high-risk obligations to December 2027. A narrow grace period runs to **2 December 2026** for machine-readable marking on systems already on the market.

Source: https://artificialintelligenceact.eu/article/50/ · Commission FAQ: https://digital-strategy.ec.europa.eu/en/faqs/transparency-obligations-under-article-50-ai-act

| § | What it requires |
|---|---|
| **50(1)** | People must be told they are interacting with an AI, **unless that is obvious** to a reasonably well-informed person in context |
| **50(2)** | Synthetic output marked machine-readable. **Carve-out** for assistive editing that does not substantially alter the input |
| **50(3)** | Emotion recognition and biometric categorisation must notify the people exposed |
| **50(4)** | Deepfakes and AI-written public-interest text must be disclosed. Reduced for artistic work; exempt where a human holds editorial responsibility |
| **50(5)** | **All of it, "in a clear and distinguishable manner at the latest at the time of the first interaction or exposure", conforming to accessibility requirements** |

**What the Commission's FAQ adds, and it is the part that decides your strings:**

- The disclosure must be **visible or audible**, not buried in a settings page.
- People must not need "specific technical tools or dedicated actions" to see it.
- **Machine-readable marking alone does not discharge the deployer's duty.** A C2PA manifest is not a label.
- Spell-check and grammar correction do **not** count as the human review that exempts public-interest text.

**The `50(1)` lever is the useful one.** If your assistant is named, visually distinct, and obviously a feature, "obvious in context" may already be satisfied. A support widget written to read like a person is not. The more human your copy, the more disclosure you owe.

A voluntary **Code of Practice on marking and labelling AI-generated content** (10 June 2026) proposes a standardised EU "AI" label localised per language: `KI` in German, `IA` in French. *Unverified: the icon spec itself could not be opened. Do not implement to a guessed glyph.*

**US, FTC.** There is no AI exemption from existing law, and *Operation AI Comply* targets deceptive AI claims. **`AI-powered` is a factual claim, not an adjective**, and so is any accuracy figure in a confidence chip. Substantiate or cut.

---

## The anthropomorphism test: the most operational rule in the corpus

Apple, HIG Machine Learning:

> **Keep attributions factual and based on objective analysis.** Don't provide an attribution that implies understanding or judgment of people's emotions, preferences, or beliefs.

```
Wrong    Because you love nonfiction
Right    Because you've read nonfiction
```

**A model may state observed behaviour. It may never claim an interior state.** `read` is a log entry. `love` is a claim about someone's mind that the system cannot support. Every warm second-person flourish in AI copy fails on this line.

Apple's second half: *"overly specific attributions can make people think that your app is watching them too closely."* Accuracy and creepiness are different failures, and both are live.

## Confidence and uncertainty

**PAIR's rule beats every hedging technique: name the specific gap, do not soften the verb.**

```
Avoid    Be careful on your evening run.
Aim for  Be careful. It's after 6pm and our route recommendations
         don't include street light data.
```

```
Avoid    We have adjusted your route to aid your recovery.
Aim for  Minimal elevation, even surface, slow pace.
```

Four ways to express confidence, with the caution attached to each *(PAIR)*:

| Form | Caution |
|---|---|
| Categorical: High / Medium / Low | Only works if **each tier carries an action instruction.** Otherwise it is noise |
| N-best alternatives | `This photo might be New York, Tokyo, or Los Angeles` |
| Numeric percentage | People misread raw values without context. PAIR discourages |
| Error bars, distributions | Domain experts only |

### Apple's ladder: translate confidence into something people already use

> **In general, translate confidence values into concepts that people already understand.**

Apple's own bad example is its own product: `97% match` *"doesn't communicate enough information to help people make a choice."* `Because you listen to pop music` does.

Ranked, best last:
1. Raw percentage: almost never
2. Semantic category: `high chance`, `low chance`
3. **Converted to an action**: `This is a good time to buy` · `Consider waiting for a better price`

Two guardrails, both verbatim, and the second is the one nobody follows:

> If you're not sure how your confidence values correlate with the quality of your results, it's not a good idea to convey confidence to people.

> **When you know that confidence values correspond to result quality, you generally want to avoid showing results when confidence is low.**

**The best low-confidence copy is no result.** Exception: contexts where people expect statistics: weather, sports, polling.

**Modal verb, settled.** IBM Carbon: when either works, prefer **might**, because `may` is ambiguous between possibility and permission. So: **might** for possibility, **can** for ability, **may** only for permission.

**Numeric precision is itself an honesty signal** *(HAX G2-B)*. To signal confidence, be granular. To signal possible error, round, or use a range: `about 20 minutes`, `a few`, `roughly 4 servings`. Rounding is normally a readability choice; here it carries meaning.

---

## Caveats, and why the blanket disclaimer does not work

**The footer line is compliance, not a safeguard.** Do not count it as mitigation.

A 2026 study (arXiv:2608.07493, n=52, preprint) tested four placements of strings like *"This is general information, not medical advice."* Trust stayed high (3.94/5) regardless of placement, and some participants read the disclaimer **as evidence of honesty, which raised their trust.** Microsoft Research's overreliance work reports the same desensitisation over time.

**What to do instead:** tie the caveat to the actual failure mode of that specific output *(Shape of AI)*.

```
Weak     AI can make mistakes. Check important info.
Better   Check the dates. This summary often gets them wrong.
```

**NN/g partly rehabilitates the disclaimer**, and the distinction is worth keeping: the *generic* one fails; an action-paired, specific one works. Their named DO and DON'T:

```
DO     Claude can make mistakes. Please double-check responses.
DON'T  AI-generated, for reference only.
```

Their rules: *"Pair disclaimers with an action"*: say what to do, not just what is limited. Place them **near the input box**, where attention is. Repeat in onboarding.

**Two failure numbers worth carrying:** one study found a model falsely attributed **76% of 200 quotes** while signalling uncertainty in only **7 of 153 error cases**. Confidence and correctness are not correlated by default.

**Citations:** never `Source` as a link label. Use the publication or article name. Place the citation next to the specific claim, styled differently from the output.

Place caveats where the output appears, not in a global footer. Keep the blanket line if legal wants it, and spend the real effort on **making correction easy** (HAX G9), which is the mitigation that measurably works.

---

## Consent and data use

Three parts, all required *(PAIR)*:

| | |
|---|---|
| **Scope** | What is collected, and why |
| **Reach** | Yours alone, or pooled across everyone |
| **Removal** | How to delete it or reset |

**The anti-omission rule, with PAIR's own example:** describe the real reach, not the flattering subset. `We use all your liked songs to generate recommendations, not just your favourites.`

Three domains need **separate strings**, because consenting to one is not consenting to another *(Shape of AI)*: the person's own data, their organisation's data, and other people's data.

Article 50(3) makes notification mandatory for emotion recognition and biometric categorisation.

**Gap, honestly:** no authoritative source was found prescribing training-data opt-in wording specifically. Write it from the Scope/Reach/Removal structure and have it reviewed.

---

## Naming, and not pretending to be a person

**PAIR: explain the benefit, not the technology.** This is the governing pattern, and it cuts against most of what shipped in 2024–26.

```
Avoid    RUN is the only intelligent running app that uses deep neural
         machine learning to make your run smarter.
Aim for  RUN is a running app that adapts to your fitness level and
         designs personalized workouts.
```

```
Avoid    Hey, I'm Allstar! I'm your personal virtual trainer.
         Ask me anything about how to improve your runs.
```

That second one is close to what most assistants actually ship. PAIR's position is that a first-person persona greeting creates capability expectations the model cannot meet.

**PAIR's onboarding template**, which is rare in being a literal fill-in:

> This is **{feature}**, and it'll help you by **{core benefit}**. Right now, it's not able to **{primary limitation}**. Over time it'll change to become more relevant to you. You can help it get better by **{what the person can do}**.

### First person: the only per-surface rule anyone published

Sources genuinely contradict here. Microsoft's style guide mandates `I / me / my`, but its AI section is dated **2019**, predates LLMs, and still references Cortana. NN/g (Dec 2025) wants factual neutral language. Apple's Writing page says avoid `we` outright, and would rewrite `We're having trouble loading this content` as `Unable to load content`.

**Intuit resolves it, and it is the rule to adopt:**

> **First person inside chat**, where turn-taking needs an actor. **Outside chat, let the work lead, not the technology**, and *"embrace passive voice when needed."*

```
Outside chat, wrong   I categorized 24 of your recent transactions. I matched
                      them based on your past activity.
Outside chat, right   24 recent transactions categorized. Review and confirm
                      to keep your books accurate.
```

That second one is the **work-leads test**: the sentence is about what happened to the person's books, not about what the model did.

### Capitalisation, answered

Intuit is the only source with a published rule: **`Payroll AI`**. Discipline capitalised, `AI` in caps. Not `Payroll ai`, not `payroll AI`. Microsoft: use `AI`, never spell out *artificial intelligence*, and **do not say `smart technology`**.

Intuit also bans `agentic` in user-facing copy: *"technical jargon that might mean something to us, but is unfamiliar to others outside of tech."* And `done for you` only for a specific completed task, because the claim is not yet true of full workflows.

**Naming strategies** *(Shape of AI)*: persona (`Fin`), company (`Einstein`), entity (`Copilot`), technology (`Ask AI`). Whichever you pick, **nobody may mistake it for a human**, the name must match real capability, and it must be identical across chat, notifications, voice, and docs.

---

## Labelling generated content

**Three conventions disagree. Pick one deliberately.**

| Source | Position |
|---|---|
| **C2PA** | **Avoid `Made with AI`**: ambiguous about whether the asset is wholly or partly generated. Avoid `AI-edited` / `AI-enhanced` without verifiable context. Prefer source-precise: `Recorded by the capture device`, `Entered by the creator` |
| **Platforms** | Converged on short noun labels: `AI-generated`, `AI info`, `AI-generated content` |
| **EU Code of Practice** | A standardised localised `AI` glyph *(spec unverified)* |

**Recommended position, absent a C2PA implementation: say what the AI did, not that AI existed.** `Summarized with AI` beats `AI`. A verb is information; a category is a shrug.

If you do implement Content Credentials, C2PA's rules bind: `Content Credentials` is title case, a brand, **never translated**, and the pin icon is not to be modified.

---

## Loading, blocked, and limit copy

**Name the actual work.** Generic spinners are the default because a progress claim can lie. But a model's wait is long enough that silence is worse. Apple, June 2026:

> Instead of `Processing…`, say `Finding substitutions for ingredients` or `Summarizing key themes from your notes`.

**But only steps that are really happening.** Intuit: *"Avoid fake progress indicators. Only show steps that reflect real work being done."*

**Blocked content takes no blame and no apology.** Apple's own string: `Unable to use that description.` Not *your request violated*, not *sorry*.

**A capability limit names what it cannot reach and offers the next hop** *(NN/g)*:

```
Weak     I can't help with that.
Better   I don't have access to your purchase history, but I can connect
         you to someone who does.
```

**Limits are not defects if you say them first.** Apple: *"When there's a mismatch between people's expectations about a feature and what the feature can actually accomplish, a limitation can seem like a defect."* And the string almost nobody ships: *"Consider telling people when limitations are resolved."*

## Agent actions and confirmation

**The counter-rule first, because it is the one people get wrong: do not confirm low-risk actions.** Approval fatigue is itself the failure, and friction on a search or a draft costs more than it protects *(Shape of AI)*.

Confirm when the risk is real. The taxonomy:

- Reputation: a badly written email going out
- Money: an errant purchase
- Security: sharing personal or corporate data
- Work: overwritten records
- Time: cleaning up a wrong action

**Match friction to risk.** Make it clear when verification has been turned off. Alert when the person's action is what is blocking progress.

**Confirm by restating the inference, then asking** *(PAIR)*:

```
Avoid    Run started. You're in position for the next scheduled run.
Aim for  Ready to run? You're in position for the next scheduled run.
         Start the run timer?
```

**Confirm the interpretation, not the action.** A standard dialog confirms *what will happen*. With a language model the failure mode is *what it understood you to mean*, so restate the parsed intent with literal values, as a question *(IBM Carbon)*:

```
To confirm, you want to move $300.00 to Checking?
```

**Intuit's review pattern**, directly liftable: `Review before [action]`.
> I drafted your email using your past campaigns and brand settings. **Review before sending.**

**For anything that produces an artifact, the preview is the confirmation.** Do not write `Send email to 5 people?` Show the drafted email, with recipients, subject, and body, editable. *(Single-source, but it follows from HAX 16A "Feedforward".)*

---

## Feedback acknowledgement

`Thanks for your feedback` is the default string in almost every product, and PAIR ranks it **worst of five**:

1. Thanks for your feedback
2. Thanks! Your feedback helps us improve future run recommendations
3. Thanks! We'll improve your future run recommendations
4. **Thanks! Your next run recommendation won't include hills**
5. **Thanks. We've updated your recommendations. Take a look**

> Don't just thank users. Reveal how the feedback will benefit them.

Feedback options must be **mutually exclusive and collectively exhaustive**. And once someone declines a feature, respect it, and always leave a way to do the task the ordinary, non-automated way.

---

## Non-determinism: the genuinely unsolved part

PAIR has no chapter on it. HAX predates generative models. The only concrete guidance found is Shape of AI's **Regenerate** pattern:

- Say that regenerating may produce something different **from the same input**.
- Say whether regenerating **overwrites or branches**.
- If consistency matters, expose a seed.

Everything else in circulation is blog-level. If a product needs this, it is writing new ground rather than applying a standard.

---

## The mandatory floor, consolidated

Five hard obligations exist across everything researched. Everything else in this file is guidance.

| # | Obligation | Enforced by |
|---|---|---|
| 1 | **EU AI Act Art. 50**: tell people it is AI, at first interaction, visibly or audibly, accessibly. Machine-readable marking by 2 Dec 2026 | law |
| 2 | **Apple ASRG 5.1.2(i)**: disclose and get explicit permission before sending personal data to a third-party AI | App Review |
| 3 | **Apple Foundation Models AUP**: never strip content credentials that label content AI-generated | framework access |
| 4 | **Salesforce AI AUP §6**: disclose bot identity, provide a human path, never pass generated content off as human-written | contract, material breach |
| 5 | **Shopify App Store 2.2.8/2.2.9**: listing copy and agent runtime behaviour must be materially consistent | store review |

**Verified negative, worth knowing:** Apple's App Store Review Guidelines contain **no AI-content labelling requirement**. The words *deepfake*, *synthetic*, and *AI-generated* do not appear. Do not tell anyone Apple requires an AI badge.

## Marking is not a control

IBM Carbon's three rules for an AI label, and the third is the sharpest labelling rule found anywhere:

- Don't use it as decoration.
- **Don't modify its behaviour**: it is a pathway to explainability.
- **Don't use the AI label as a trigger for an AI action.** It *"is not a UI icon and should not be used with buttons or other call-to-actions to trigger an AI action like 'regenerate.'"*

**The marker and the control must be separate affordances.** Almost every product conflates them in one sparkle icon.

**The revert rule, and its logic:** when a person edits AI-generated content, the label is replaced by a revert action. The label is a claim about provenance: **the moment a human edits, the claim expires.**

**Density:** a *focused* label per instance when people need to tell AI from non-AI content; a *broad* label over a section when they do not. Carbon's own example: broad on a whole conversation, focused on a single message.

**The literal string is `AI`**, localised: `IA` (French, Spanish-ES, Portuguese-BR), `KI` (German), `ИИ` (Russian, Bulgarian), `AI` elsewhere. This **matches the EU Code of Practice's proposed label**, a meaningful convergence between a design system and a regulator. Accessible name: `aria-label="AI - Show information"`.

## Sources

Verified at source: [Microsoft HAX Toolkit](https://www.microsoft.com/en-us/haxtoolkit/ai-guidelines/) (18 guidelines, Amershi et al. CHI 2019) · [Google PAIR Guidebook](https://pair.withgoogle.com/guidebook-v2/patterns) (6 chapters, 23 patterns) · [EU AI Act Art. 50](https://artificialintelligenceact.eu/article/50/) + Commission FAQ · [C2PA UX Recommendations 2.2](https://spec.c2pa.org/specifications/specifications/2.2/ux/UX_Recommendations.html) · [Shape of AI](https://www.shapeof.ai/) · arXiv:2608.07493 · [FTC Operation AI Comply](https://www.ftc.gov/news-events/news/press-releases/2024/09/ftc-announces-crackdown-deceptive-ai-claims-schemes)

**Not verified, still open:** Apple's HIG *Generative AI* page exists but is client-rendered and was not read. IBM Carbon ships an AI-label component with explainability popover rules. Path unconfirmed. Microsoft's Writing Style Guide AI terminology entries, which are the most likely authority on `AI` capitalisation and whether to say `smart` or `auto`, were not retrieved. Platform policies (YouTube, TikTok, Meta) are from search summaries, not primary sources.
