# The Twelve States

Every interactive surface has these. A mockup shows one or two. The shipped product needs all of them. Mark N/A with a reason. Never leave one blank.

| # | State | What it must carry |
|---|---|---|
| 1 | **Default** | What this is, what you can do here |
| 2 | **Empty** | Why it is empty, what to do, where the control is |
| 3 | **Loading** | That work is happening, roughly how long if over 3s |
| 4 | **Partial / skeleton** | That more is coming, not that this is all there is |
| 5 | **Success** | It worked, what changed, what is next |
| 6 | **Error: user recoverable** | What happened, why, one clear route out |
| 7 | **Error: system** | Ownership, apology proportional to damage, what happens now |
| 8 | **Validation: inline** | Which field, what rule, what a valid value looks like |
| 9 | **Permission request** | What is being asked, what it enables, what happens if declined |
| 10 | **Permission denied** | That the feature is limited, how to change it, what still works |
| 11 | **Offline / degraded** | What still works, what is queued, when it retries |
| 12 | **Destructive confirm** | Exactly what is lost, whether it is reversible, an escape |

---

# Character budgets

Defaults at the narrowest supported width. Truncation is the real constraint. Verify in the running preview at 375px and in the simulator before treating any of these as settled.

| Slot | Budget | Note |
|---|---|---|
| Primary action label | 25 | 1–3 words. Verb first |
| Secondary action label | 20 | |
| Nav label (top-level) | 18 | 1–2 words |
| Tab bar label (iOS) | 12 | Truncates hard |
| Section header | 30 | |
| Field label | 24 | |
| Field placeholder | 30 | Never a substitute for a label |
| Helper text | 90 | One sentence |
| Inline validation | 80 | |
| Error message body | 120 | Cause + route out |
| Empty state headline | 45 | |
| Empty state body | 120 | |
| Toast | 60 | Gone in 4s. Nothing load-bearing |
| Tooltip | 80 | |
| Dialog title | 50 | |
| Dialog body | 180 | |
| Push notification title | 40 | |
| Push notification body | 110 | ~2 lines collapsed on iOS |
| Settings row label | 32 | |
| Settings row description | 100 | |

---

# Action labels

**The phrase defines the action. The style only supports it.** Even an icon-only control needs a decided verb. It becomes the accessibility label and the analytics event name.

**Rules.**
- Verb first, and the verb is the one the code performs. `Remove` from a list, `Delete` from the system, `Archive` if it is recoverable. These are three different words for three different operations.
- Include the consequence when the consequence is money, time, or permanence: `Pay $48.00` beats `Continue`. `Delete 3 photos` beats `Delete`.
- The label sets the expectation for the work ahead. `Turn on notifications` promises one tap. `Set up notification preferences` promises decisions. Pick the true one.
- Nouns signal navigation, verbs signal action. `Account` goes somewhere; `Save account` does something.
- Never `Submit`. Never `Click here`. Never `OK` on anything consequential. Label the button with the action it takes.
- Cancel is the escape from a dialog. If both buttons are actions, neither says Cancel.

**Ambiguity is expensive.** A European ATM offering notes "especially in 50s" introduced doubt into a transaction the user trusted. One soft word, and the user stops to wonder. Save ambiguity for poetry, keep it out of payment systems.

---

# Errors

## Write the message first, then pick the component

**The most common error-design failure is choosing the component first.** A complex message crammed into a toast. A one-line message blocking the screen in an alert dialog. A high-consequence error auto-dismissing after four seconds.

Write what the message needs to say with no UI constraints at all. *Then* choose where it lives. *(Adobe Spectrum.)*

Three axes decide the component:

| | Low | High |
|---|---|---|
| **Consequence** | Easily resolved | High-stakes, possibly destructive |
| **Complication** | Little to explain | Specific circumstances the person needs |
| **Action** | Nothing to do, or just "try again" | They must actively fix something |

| Component | Consequence | Complication | Action |
|---|---|---|---|
| Alert dialog | High | High | High |
| Alert banner | Low | Low | High |
| In-line alert | Any | High | High |
| Help text (inline) | Low | Low | High |
| Toast | Low | Low | Low |

One message per component. Alert dialogs are task-level and genuinely interruptive. Use them consciously. Alert banners are system-level and best for connectivity. In-line alerts aggregate several field errors into one. Toasts are for contextual errors triggered by a user action, and should carry an inline action wherever possible.

## The best error is no error

Before writing one, try to make it impossible. Inline validation. Disabled states that say why. Auto-correcting an out-of-range value rather than rejecting it: a field capped at 100 that receives `101` should quietly become `100`.

**Never write an error message as a workaround for unintuitive design.** That is the design's problem wearing a string's clothes. See §When it is not a string problem.

## Anatomy

Three parts, in order. The middle one is optional.

1. **What happened**: first, in plain language, framed as what it means to the person
2. **The underlying cause**: only when it genuinely helps. Sometimes it clarifies; sometimes it is in the way
3. **How to fix it**: as simple and actionable as possible. If there is nothing they can do, say what the product is doing

```
Weak    FORBIDDEN
Weak    This operation has failed to execute
Good    Your files didn't sync
Good    Your campaign couldn't be created
```

Three jobs, in order: **why it happened**, **what to do**, **where to go if that fails**.

Errors are memorable. Negative experiences stick harder than unremarkable ones, which makes an error one of the best chances to show what the product is like.

```
Bad:   Error 773
Bad:   Something went wrong.
Bad:   Oops! Try again.
Good:  Your card was declined. Try another card, or contact your bank.
Good:  We couldn't read your ID. Make sure all four corners are visible and there's no glare. [Retake photo]
```

**Patterns by kind.**

| Kind | Shape |
|---|---|
| Validation | `<Field> must <rule>.` + example of valid input |
| Wrong credentials | Do not say which half was wrong. `That email and password don't match.` |
| Network | `You're offline. We'll retry when you're back.` + what is queued |
| Rate limit | Say the actual wait. `Try again in 30 seconds.` not `Try again later` |
| Permission | `<Feature> needs <permission>.` + `Open Settings` |
| Server fault | Own it. `Something broke on our end. We've been notified.` + what happens to their work |
| Not found | What is missing, and one route back |

**On apologies.** Proportional, and rarer than instinct suggests. **Save "sorry" for data loss, or for something requiring major work to recover.** Apologising for a small thing, or for something the product did not cause, reads as insincere and pushes the useful part of the message further down.

```
Weak    Oops! So sorry, but we couldn't post your comment. Try again
Good    We couldn't post your comment. Try again
```

"Oops" is for spilling a beer on your dog, not for losing someone's data.

**Never** put the full list of error-preventing instructions up front so that everyone reads them. Show the specific error to the specific person who hit it.

## Five more rules that change the wording

**Centre the person's goal, not the system's constraint.** Nobody cares what the architecture could not do.

```
Weak    There was a RAISE without a handler.
Good    Accept the End User License Agreement terms.
```

**Don't blame, even when it is their fault.** Move the subject off the person.

```
Weak    You went offline. Connect to the internet and try again.
Good    Your computer appears to be offline. Connect to the internet and try again.
```

**Positive framing.** Say what they can do, not what they cannot or what they got wrong.

**Specific errors, generic language.** Write a distinct message per case rather than one catch-all. A catch-all forces the reader to work out which half applies to them. But keep the *wording* generic: filenames, usernames, and folder names are visible elsewhere in the UI, and interpolating them multiplies the strings to localise.

```
Weak    Your document "Final-proposal-May-Monthly-Meeting.indd" could not be
        saved to the library "May Proposals"
Good    Your document couldn't be saved. Try again.

Weak    There's an issue with your internet connection. It could be your wifi,
        router, modem, or ethernet cable.
Good    Your wifi connection is unstable and affecting download speed. Try
        switching to an ethernet cable.
```

**Error codes last, and only if useful.** Put them at the end so nobody hits an unreadable string before the sentence that helps. Include one only when the audience could actually use it.

## Error tone scales with severity

| Tone | When | Example |
|---|---|---|
| **Instructive** | Low-volume, low-consequence. Just stating the state | `Unable to load this page.` |
| **Reassuring** | Minor error, but they are probably worried | `Our servers timed out and we couldn't save your file. Try again, and contact your admin if it keeps happening.` |
| **Supportive** | Something genuinely bad. Data loss, billing failure | `We couldn't renew your subscription because your card expired. You have 90 days to recover your files by renewing with an active card.` |

**"We" and "you" are correct in errors.** This is the one place the general caution relaxes. They answer the two questions the reader has: where did this go wrong, and who has to fix it. *(Adobe, Atlassian, Polaris all agree here.)* Still only claim "we" when the product is genuinely at fault.

---

# Empty states

An empty screen that says nothing is a failure. Four things:

1. What belongs here
2. Why it is empty right now
3. The single next action, with the control visible or pointed at
4. Optional: seeded, editable content the user can play through

```
Headline:  No invoices yet
Body:      Your sent invoices will show up here, with payment status.
Action:    Create your first invoice
```

Distinguish **first-run empty** (nothing yet, encourage) from **filtered empty** (results exist, filter excludes them, offer to clear) from **cleared empty** (they finished everything, acknowledge it). Three different states, three different strings.

**Playthrough content beats an empty box.** Seeding a workspace with an editable sample (a pre-made task list the user can check off and morph into their own) teaches the mechanics without a tutorial, and lets people move at their own pace and order.

---

# Destructive confirmations

The only place where more words is usually right.

- **Title states the consequence, not the action.** `Delete this project?` is weaker than `Delete this project and its 47 files?`
- **Body says what is lost and whether it comes back.** `This can't be undone.` earns its place. If it *can* be undone, say so and note the window.
- **The confirm button repeats the verb.** `Delete project`, never `OK`, never `Yes`.
- **The escape is obvious and is the default focus.**
- Never make it cute. Never make it clever. Nobody wants personality while deleting a year of work.

**Poka-yoke before confirmation.** Preventing the mistake beats confirming it. Gmail catching "attached to this message" with no attachment is worth more than any dialog. Constrain input, offer menus instead of open fields, validate before an action that is non-trivial to undo, the way a server repeats an order before walking it to the kitchen.

---

# Permission prompts

Ask at the moment the permission pays off, never at launch.

```
Title:  Turn on order updates?
Body:   We'll tell you when your food leaves the kitchen and when the driver's close.
Allow:  Turn on updates
Deny:   Not now
```

- The benefit is the one that lands *now*, from the thing they just did.
- `Not now` beats `Don't allow`. It does not spend the OS-level permission.
- Write the denied state too. What still works, and how to change it later.
- Ask after a success, not before. Caviar asks about notifications after the first order, framing it around order status.

---

# Notifications

Five characteristics, all required:

1. **Well-timed**: arrives when the person can act
2. **Concise and clear**: especially anything requiring action
3. **Personalized and relevant**: tied to something they actually did
4. **Delivers value and enables action**: urgency with no possible action is just anxiety
5. **Generates interest and rewards trust**: every notification is a chance for them to turn all of them off

**Appropriate for:** a message from a person they want to hear from; an action that helps them meet a goal or avoid a problem; a system state change that suggests or requires action.

**Never for:** advertising, messages with no user value, situations where there is nothing to act on. A welcome notification with no action is a wasted interruption.

Lead with the information. `Your food arrives 8:25–8:35pm` beats `Deliciousness is in the works!`. Bury the crucial fact under canned cheer and you have failed Manner and Politeness at once.

---

# Loading and success

**Loading.** Under ~1s, no string; the spinner is enough. Over ~3s, say what is happening. Over ~10s, say roughly how long, or show determinate progress. Never `Please wait`.

**Turn-taking matters more than speed.** A conversation works because both sides know whose turn it is. A system that takes time is fine if it is clear something is happening and the expectation is set. Silence reads as broken.

**Success.** Proportional to investment. A saved toggle needs a state change, not a banner. A completed migration needs a real acknowledgment.

Do not create anxiety at the moment of relief. Google Docs' "your work may not be saved — roll the dice?" is the anti-pattern: the last thing a person wants while saving is a gamble.

**Then give a next step** that reflects what they just did. Not a checklist of everything the product offers. Not an immediate launch into another flow. Let them see the result of the work they finished.

---

# Layered depth

Not everyone wants the same amount of information, and the answer is not an average. Write three layers and let people choose their depth. This is progressive disclosure of *content*, distinct from the UI patterns in the placement ladder.

| Layer | Who sees it | What it carries |
|---|---|---|
| **1: The casual line** | Everyone, always visible | The thing itself, in plain words. No jargon, no technique names |
| **2: The scoop** | Expandable, for the curious | Why it is like that. The ingredient story, the health angle, the tradeoff |
| **3: The process note** | For the people who want the mechanism | The technique, the number, the actual how. Translated, never lectured |

```
Layer 1   Slow-braised short rib with a smoked paprika finish.
Layer 2   Built around bone broth and root vegetables. Comfort food that's
          actually doing something for you.
Layer 3   Chef Nia braises this low and slow for 4 hours, then hits it with a
          paprika oil she makes from scratch.
```

**Rules.**
- **Translate, do not teach.** `Your chef did this thing called a chiffonade` beats `A chiffonade is a technique in which`.
- **One insight per moment.** Do not stack three facts. Pick the best one.
- **Depth is a toggle, never the default.** The person who wants macros gets macros. The person who wants dinner is not made to read them.
- **Layer 1 must stand completely alone.** Layers 2 and 3 may never carry information required to act.

Existing shapes to look for: a numbers sheet behind a summary, a "why we love this" expander, a provenance line under a computed value, a nutrition panel behind a single figure. These are usually Layer 3 already, written without knowing it, and they read better once the ladder is explicit.

---

# Repeatable actions

Guidance built for a first-time user becomes noise on the hundredth pass. Clippy was helpful once and enraging forever after.

- If you can detect first use, scaffold it and remove the scaffolding after. Gmail's Smart Compose showed an introductory message and a `tab` hint on first use, then left only the inline suggestion.
- If you cannot detect first use, put the structure in the flow itself so it serves both audiences: a sequenced setup that anyone gets, where the choice to follow it is theirs.
- Reinforce key concepts at the contextual moments where they matter, not by repeating the same message. A code of conduct shown once at signup is forgotten; snippets of it beside the comment field and the compose view are remembered.
