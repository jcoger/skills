# Strings the law writes for you

Load for **consent, cookies, privacy choices, checkout, subscription signup, and cancellation**. Those five surfaces are the only ones where wording is regulated, and on them the rules override house voice, brevity, and visual hierarchy.

> Not legal advice. Verified against the cited texts as of 2026-08-25. Statuses move. Have anything you rely on reviewed.

---

## The hedging conflict, resolved three ways

This skill now says three different things about hedging, and all three are right in their own place. State which one applies.

| Surface | Rule | Source |
|---|---|---|
| Ordinary deterministic UI | **No hedging.** `we recommend you change your password` → `Change your password` | `directness.md` |
| Model output, confidence, suggestions | **Hedging required**, calibrated to real performance | `ai-features.md`, HAX G2-A |
| **Consent, privacy, legal** | **Hedging is a violation** | EDPB |

EDPB, on `Your data might be used to improve our services`:

> the use of conditional tense or vague wording does not constitute 'clear and plain language' as required by Article 12(1)

**On a consent screen you say `will`, and you name the purpose.** `improving users' experience`, `marketing purposes`, `IT-security purposes`, and `future research` are all named as too vague to be "specific."

---

## Six button labels that are literally mandated

The only ones in the world. Everything else on this page constrains wording; these *are* the wording.

| Label | Law | When | If you get it wrong |
|---|---|---|---|
| **order with obligation to pay** *(or an unambiguous equivalent)* | EU CRD Art 8(2) | Any order button creating a payment obligation | **The consumer is not bound by the contract** |
| **withdraw from contract here** | EU CRD **Art 11a(1)** | Any online interface, throughout the 14-day withdrawal period | Non-compliance |
| **confirm withdrawal**: *"only with the words"* | EU CRD **Art 11a(3)** | The confirmation step of that flow | Non-compliance |
| **Verträge hier kündigen** | German § 312k(2) BGB | The cancellation button on any consumer subscription site | Consumer may cancel any time, no notice period |
| **jetzt kündigen** | § 312k(2) no. 2 BGB | The confirm button on the cancellation page | Same |
| **click to cancel** *(or words to that effect)* | Cal. B&P § 17602(e)(2) | **Only** when you show a retention offer during online cancellation | ARL violation |

**Article 11a applies from 19 June 2026 and is widely unimplemented.** Inserted by Directive (EU) 2023/2673. Despite arriving via the distance-financial-services directive it sits in CRD Chapter III and its own wording is general: *"for distance contracts concluded by the means of an online interface."* Not limited to financial services.

**It is a withdrawal button, not a cancellation button.** The 14-day cooling-off right, not subscription cancellation. A product may need this *and* the German cancel pair. The withdrawal function must be *"continuously available throughout the withdrawal period"* and *"prominently displayed."*

**These are directive texts.** Each Member State's transposition supplies the binding national-language wording. Check the local transposition before shipping a localised label.

**The case that removes every defence.** CJEU *Fuhrmann-2* (C-249/21) tested `Complete booking` and held that

> **only the words that appear on that button** … should be taken into account.

Not the heading. Not the price summary next to it. Not the flow. **The words on the button, alone.** `Buy now`, `Confirm`, `Continue`, `Complete booking`, `Submit` are all exposed. `Order and pay` and `Buy now with obligation to pay` are safe shapes.

German § 312k is stricter still: the button *"muss … mit **nichts anderem als den Wörtern**"*: **nothing other than those words.** No brand name appended, no reassurance, no retention nudge.

**The test for any alternative label** (*Fuhrmann-2* para 33): the word must be *"necessarily and systematically associated with the creation of an obligation to pay"* in that language, for the average consumer. Traders *"are free to use any words of their choice, provided that it is entirely clear from those words"* that activating it binds them to pay. The Court expressly refused to weigh business burden: *"the formulation or alteration of words on an electronic ordering button does not entail a significant burden."*

---

## What an enforcement order actually mandates

The FTC's consent orders are the clearest published statement of what wording it accepts. **Amazon settled the Prime case for $2.5 billion in September 2025** (the largest civil penalty ever for an FTC rule violation), and the order dictates literal copy rules:

> A. Include a clear option or button to decline the Negative Option Feature (**e.g., cannot say "no thanks, I don't want free shipping"**);
> B. Include language in the call to action that **references Prime membership (e.g., "Join Prime")**;
> C. **Remove the double-stacked sign-up button**;
> D. If it auto-renews, **indicate that by using the word "renews"**;
> E. Always disclose the price and autorenewal on the sign-up page.

**Four transferable rules: name the product in the CTA, never phrase the decline as a loss, use the word `renews`, no stacked-button pattern.**

The charged strings are ordinary product copy. Decline: `No thanks, I do not want fast, free shipping.` Accept CTAs that never named the product: `Get FREE Two-Day Shipping`, `Start your Prime FREE trial`. And the cancellation flow: *"a four-page, six-click, fifteen-option"* path where **`End Membership` did not end membership.** The FTC counted `Remind Me Later` appearing four times and `Keep My Membership` three.

**The pattern across every order: a button that does not do what it says.** `Continue to Cancel`, `End Membership` that opens a retention flow, `No, cancel` that exits the cancellation path. That is the core of a $2.5B case.

*Also verified: Publishers Clearing House ($18.5M) mandates exact disclaimer strings and requires a "keep shopping" CTA to be **less prominent** than the entry CTA. Epic ($245M) turned on adjacent `PREVIEW STYLES`/`PURCHASE` buttons and on renaming `Undo` to `Cancel Purchase`, shrinking it, and requiring press-and-hold, internally observed as a ~35% drop in undo rate. Uber (filed April 2025, live) turns on enrollment CTAs (`Try for free`, `Start Saving`, `Claim offer`), where "consumers never click a button labeled 'Join Uber One.'"*

*Two corrections worth carrying: **there is no FTC action against LinkedIn**. The case usually meant is a private class action. And "save now, pay later" does not appear in the Epic complaint.*

---

## Consent choices: the pairs that are violations

California **11 CCR § 7004** got materially stronger on **1 January 2026**, and it names product patterns you have almost certainly shipped.

| Pattern | Verdict |
|---|---|
| `Yes` / `Ask me later` | **Violation.** *"there is no option to decline… 'Ask me later' implies that the consumer has not declined but delayed."* An equal choice is `Yes` / `No` |
| `Accept All` / `More Information` | **Violation.** So is `Accept All` / `Preferences`. The compliant pair is `Accept All` / `Decline All` |
| `Yes` beside `Do Not Sell or Share My Personal Information` | **Violation**: a double negative |
| Toggles reading `on` / `off` alone | **Confusing** without clarifying language. Hardened from "may be" to "are" in 2026 |
| Button order flipped mid-flow: `Yes, No` then `No, Yes` | Violation |
| `Yes` button larger or more eye-catching than `No` | **New in 2026.** Visual prominence is now regulated text |
| Closing or navigating away from a pop-up | **Not consent.** New in 2026 |

**This kills `Not now` and `Maybe later` as the only alternative to Yes.** The FTC reaches the same conclusion independently, naming *"repeatedly presenting the choices as 'Yes' or 'Not Now' instead of 'Yes' or 'No'"* as **Nagging**.

The governing default, stated twice by the EDPB: **if one option is highlighted, it must be the more privacy-protective one.**

---

## Confirmshaming, in the regulators' own words

Colorado Rule 7.09 is the richest source of literal banned strings anywhere.

```
Banned    "I accept, I want to help endangered species" / "No, I don't care about animals"
Banned    "Please do not check this box if you wish to Consent to this data use"
Banned    "Do you wish to provide or decline Consent…?"  →  answered  Yes / No
Right     the same question answered  Provide / Decline
```

That last one is a real grammatical rule: **answer labels must be parallel to the question stem.**

The FTC writes its own: `No, I don't want to save money` · `Uncheck the box if you prefer not to receive email updates` · a button labelled **`No, cancel`** that does not cancel but exits the cancellation flow.

Colorado also bans **gratuitous virtue framing**: saying an app *"helps save lives"* when asking for consent, if the advertising is not what saves the lives. And: **"everyone does it" is expressly not a defence** (Rule 7.09(E)).

---

## Voice is a liability on exactly two surfaces

**Consent and cancellation.** The EDPB cites brand-voice copy as *evidence of manipulation*, and its examples are ordinary product writing:

> Hey, a lone wolf, are you? But sharing and connecting with others help make the world a better place! Share your geolocation!

> Tell us about your amazing self! We can't wait…

Account deletion copy (`you'll lose everything forever`, `your friends will forget you`) is named as playing on fear of missing out and breaching Art 5(1)(a).

What the EDPB actually objects to, quotable at a stakeholder: *"the combination of motivational language with other forms of emphasis, such as exclamation marks"*, language that *"delivers a sense of urgency or sounds like an imperative"*, and expressions that *"can make them feel obliged."*

**Humour is explicitly out.** On a cookie banner joking about baking: *"Humour should not be used to misrepresent the potential risks and invalidate the actual information."*

The EDPB's word for the required register is **neutral**. On a trust spectrum, consent and cancellation are the furthest structure-leads surfaces that exist.

---

## The asymmetry rule

The most transferable finding in the whole regulatory corpus, and it is about *flow*, not wording.

Users who click `skip` get **"Are you sure?"**. Users who hand over the data get nothing.

> Only those who refuse to disclose the data are asked to confirm their choice… This constitutes a breach of the fairness principle.

**Confirming only the decline branch is itself the violation, regardless of how well the confirmation is written.** One confirmation step is allowed as a mis-click guard. The second step is what breaks it.

Same shape on deletion: `Do you really want to do so? Why do you want to do this?`: *"users should not be discouraged by additional questions… they should be able to just exercise their right, without their motivation being put into question."* A mandatory free-text "why are you leaving?" that greys out the delete button is an infringement.

---

## Consent declaration wording

**EDPB 05/2020, footnote 38**: the single most actionable string rule in EU privacy law:

> The declaration of consent must be named as such. Drafting, such as **"I know that…"** does not meet the requirement of clear language.

So `I understand that…`, `I acknowledge…`, and `I'm aware that…` are all **outside a valid consent declaration.** The checkbox has to say it *consents*.

Also: silence, pre-ticked boxes, inactivity, and **scrolling or swiping** never constitute consent (GDPR Recital 32; EDPB Example 16). Withdrawal must be *"as easy as"* giving it (Art 7(3)).

**Naming things euphemistically fails.** Deletion links reading `See you` or `Deactivate` fail because the wording *"does not clearly convey"* the destination. People look for `Delete my account`. And a settings nav offering `data protection`, `privacy`, `safety`, `content`, `your preferences` is *"too many options"*, since *"'data protection' and 'privacy' are often used as synonyms and are therefore especially confusing if presented as different sections."*

**Precision in your domain's vocabulary is not intelligibility.** A breach notice saying *"special categories of personal data"* was itself found deceptive, because *"'special' has a very different meaning in general language."* Using the legally exact term can be the violation.

---

## Disclosure placement beats disclosure wording

FTC **.com Disclosures** (still March 2013: there is no 2022 update) tests: proximity to the claim it qualifies, prominence, **unavoidability**, repetition, and *"whether the language of the disclosure is understandable to the intended audience."*

> consumers should not be able to proceed further with a transaction… without scrolling through the disclosure

**A disclosure behind `Learn more`, in a tooltip, or in a footnote is presumptively not clear and conspicuous.** Progressive disclosure is good UX and bad compliance; on these five surfaces, compliance wins.

**Per se unlawful under the UCPD blacklist**, no harm test required:
- Falsely stating limited availability to force an immediate decision (Item 7)
- `free` / `gratis` / `without charge` when anything beyond unavoidable response and delivery cost is payable (Item 20). The classic exposure is a card-required "free trial" that auto-converts

**False urgency has a literal banned example** in both California and Colorado: a countdown clock saying *"time is running out to consent to this data use and receive a limited discount"* where the discount is not actually limited.

---

## Confirmshaming has named strings in EU guidance too

The European Commission's UCPD guidance names two strings you have almost certainly written:

> the consumer is prompted, without reasoned justification, to reconsider their choice through emotional messages several times (**"We're sorry to see you go"**, **"Here are the benefits you will lose"**)

Note the qualifier: the breach is the *cumulative flow plus repeated prompting*, not one string standing alone. And *"unsubscribing from a service should be as easy as subscribing."*

Two Articles worth knowing because they reach design, not just words. **Art 6** catches misleading *"in any way, including overall presentation… even if the information is factually correct."* **Art 7(2)** makes it an omission to give material information *"in an unclear, unintelligible, ambiguous or untimely manner."* And: *"The UCPD does not require intention for the deployment of the dark pattern."*

## Deadline: 27 September 2026

New per se blacklist items apply in **one month**, added by Directive (EU) 2024/825. These are pure wording bans with no harm test:

| Banned | Effect |
|---|---|
| **Generic environmental claims** without demonstrated excellent performance | Kills bare `eco-friendly`, `green`, `sustainable` |
| **Claiming neutral/reduced/positive impact based on offsetting** | **Kills `carbon neutral` as a product claim outright** |
| **Presenting a software update as necessary when it only adds features** | An in-product string ban: `Required update` on an optional feature update |
| Presenting a legal requirement as a distinctive feature of your offer | |
| Presenting a good as repairable when it is not | |

## Status corrections worth knowing

- **FTC "click-to-cancel" is dead.** Vacated by the Eighth Circuit in July 2025; the FTC recodified the pre-2024 text in February 2026. 16 CFR Part 425 is currently the 1973 mail-order rule and has essentially no application to an app subscription screen. An ANPRM issued March 2026, the earliest possible stage, no proposed text exists. **Do not cite it in either direction.**
- **California got stronger**, not weaker, on 1 Jan 2026. It is now the strictest string-level rule in the US.
- **Connecticut incorporates the FTC taxonomy by reference**, so the FTC's named patterns are directly state law there. No cure period since 31 Dec 2024.
- **DSA Art 25 does not apply to consent banners**. Art 25(2) carves out anything already covered by GDPR or the UCPD. Art 25 catches non-personal-data deception: checkout, cancellation, engagement mechanics.
- **DMA Art 5(2)** carries the only countable anti-nagging rule anywhere: after a refusal, a gatekeeper may not re-ask for the same purpose **more than once in a year**.
- **The EU Digital Fairness Act is not law.** Signalled, not confirmed as tabled.

---

## The eight places this overrides house style

1. **Brevity loses at the payment boundary.** Five words where house style wants two, and the contract is void otherwise.
2. **Parallelism beats punchiness.** `Yes`/`Not now` is a named violation.
3. **Warmth is risk on consent and cancel.** Exclamation marks, imperatives, FOMO, humour: all cited as manipulation evidence.
4. **Hedging is a defect here**, the opposite of the AI rule. Say `will`, name the purpose.
5. **"Are you sure?" is asymmetric by default.** Confirm both branches or neither.
6. **Progressive disclosure conflicts with unavoidability.** No tooltips, no `Learn more`, no accordions for material terms.
7. **Visual hierarchy is regulated text** when the prominent option is the less privacy-protective one.
8. **"Everyone does it" is expressly not a defence.**

## Grep for these now, ranked by exposure

1. Any EU checkout button without an unambiguous payment word → **contract void**
2. Missing `withdraw from contract here` / `confirm withdrawal` → live since 19 June 2026, widely unimplemented
3. German cancel buttons not labelled exactly → customer cancels any time, no notice
4. `Not now` / `Ask me later` / `Maybe later` as the only alternative to Yes
5. A decline phrased as a loss: `No thanks, I don't want…` → expressly banned by the Amazon order
6. **Cancel-flow buttons that do not cancel**
7. `We're sorry to see you go` + `Here are the benefits you will lose`
8. `might` / `may` in privacy copy
9. `I understand that…` / `I acknowledge…` on a consent checkbox
10. `Learn more` / `Details` / `Terms and conditions` carrying a material disclosure
11. Countdown timers and stock counters that are not true
12. `Carbon neutral`, bare `eco-friendly`, `Required update` on an optional update → **from 27 Sept 2026**

## Sources

[CRD 2011/83/EU Art 8(2)](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32011L0083) · CJEU *Fuhrmann-2* C-249/21 · [§ 312k BGB](https://www.gesetze-im-internet.de/bgb/__312k.html) · Cal. 11 CCR § 7004 + [CPPA Advisory 2024-02](https://cppa.ca.gov/) · Colorado 4 CCR 904-3 Rule 7.09 · [FTC Bringing Dark Patterns to Light](https://www.ftc.gov/reports/bringing-dark-patterns-light) · FTC .com Disclosures (2013) · [EDPB Guidelines 03/2022 v2.0](https://www.edpb.europa.eu/) · EDPB 05/2020 · GDPR Arts 7, 12 + Recital 32 · DSA Art 25 · DMA Arts 5(2), 13(6) · UCPD Annex I

**Not verified:** specific FTC enforcement actions and settlement figures; EU Digital Fairness Act status; EDPB Guidelines 3/2025 (draft only); whether the Commission has issued DSA Art 25(3) guidelines.
