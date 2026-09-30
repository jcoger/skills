# Loop design

Load in LOOP mode. The LOOP SPEC answers one question: **why does this person open the app again, and what makes them?** If the answer is "they'll remember," there is no loop.

## 1. Name the cadence first (E1)

Every product has a **natural frequency**: how often the real-world need behind it recurs. The loop's rhythm is set by that need, not by a growth target. Brian Balfour (Reforge) puts most of a product's retention potential in that frequency: a quarterly job cannot be turned into a daily one, and the teams that win add adjacent, more frequent jobs rather than pushing harder on the one they have.

| The need | Rhythm | Example shapes |
|---|---|---|
| Recurs daily | daily | what to eat tonight, a practice, a daily read |
| Recurs weekly | weekly | planning the week, a weekly shop, a weekly report |
| Tied to dated events | event-driven | birthdays, appointments, renewals, trips |
| Tied to the calendar | seasonal | holidays, tax time, school terms |

Rules:
- **A weekly product measured on daily actives will look broken and be "fixed" with noise.** Measure retention at the cadence: a weekly product's D7 is its D1.
- **Appointment beats nagging.** A fixed, predictable rhythm ("your week is ready every Sunday") builds its own internal reminder, the way a weekly bin day does. A product that asks every day invites the user to put it off every day (Chou, Appointment Dynamics).
- **Event-driven products need a filler loop or they vanish between events.** A birthday app with nothing between birthdays gets deleted in the gap. The filler is small, optional, and budgeted (a daily question, a widget), never a push every day.
- Write the cadence as one sentence with the evidence. Example: "Weekly, because households plan groceries once a week (source: the shop-day question in onboarding)." The evidence is the app's own data or research, never a guess dressed as one.

## 2. The four links (E2)

Each loop is **trigger → action → reward → next trigger**. It is Eyal's Hooked model (trigger, action, variable reward, investment) written so each link is checkable.

| Link | What it must be | The common break |
|---|---|---|
| **Trigger** | External: a push, email, widget, or calendar entry that fires **without the user opening the app**. Condition checked at send time | A trigger that only fires on app open is not a trigger, it is a screen |
| **Action** | One thing, reachable in one tap from the trigger | The push opens Home and the user has to find the thing |
| **Reward** | Delivered **inside the product**, immediately: the answer, the plan, the progress, the thing made for them | The notification itself is the whole reward, so there is no reason to tap |
| **Next trigger** | Something the action set up: a date saved, a preference learned, a plan committed. It gives the next trigger its content | The loop depends on the calendar alone, so the user's action changes nothing |

**Investment is the next trigger's fuel.** Every action should leave data that makes the next trigger more specific. A reminder that knows the date, the person, and last year's choice is worth ten generic ones. Chou calls the lasting version the "Alfred effect": users stay with the system that knows them, even over a smarter one that doesn't.

**Fogg's check on every trigger:** behaviour happens when motivation, ability, and a prompt arrive together (B = MAP). A prompt sent when ability is low (the user is driving, asleep, at work) is wasted and teaches them to ignore you. Send when the user can act: send-time choice is part of the trigger. Fogg names three prompt jobs, and each map row should know which it is doing:

| Prompt | When | The push must |
|---|---|---|
| **Signal** | Motivated and able | Just remind. Short, literal |
| **Facilitator** | Motivated, ability low | Remove a step: the deep link lands on the exact thing, pre-filled |
| **Spark** | Able, motivation low | Give a reason: the new, specific, true thing waiting for them |

**Variable, not random.** The reward should vary because the content is fresh (a new plan, a new answer, what changed), not because a slot machine was bolted on. Freshness lasts; manufactured unpredictability burns out.

## 3. The absence trigger (E3)

Most apps build triggers for dates and events and nothing for the user who stops coming. Silence is the default response to absence, and it is the wrong one. It is also the easiest gap to miss in review, because every existing trigger looks correct.

**The signal.** A `last_active_at` column, written **by the server** on meaningful events (an app open that loads data, a completed action). Client-only "last seen" in local storage is invisible to the sender. Without this column, no absence trigger is possible; add it first.

**The window.** Derive it from the rhythm, and write the reason. Duolingo's published user states are the clearest public model for a daily product: *current* (active today and in the prior 6 days), *at risk* (quiet today, active in the prior 6 days), *reactivated* (back after 7 to 29 days away), *resurrected* (back after 30+), *dormant* (quiet 31+ days). Its growth work found that raising current-user retention moved daily actives about five times more than the next-best lever: keeping people is worth more than winning them back. The table scales those states to other rhythms; that scaling is inference, not a published rule.

| Rhythm | First attempt | Second attempt | Stop |
|---|---|---|---|
| Daily | 3 days quiet | 7 days | after 2, silent until return |
| Weekly | 10 to 14 days quiet (one missed cycle) | 28 days | after 2 |
| Event-driven | the next real event is the trigger; add one "here's what's coming" at 30 days quiet if no event is near | none | after 1 |

**The ladder has a hard stop.** Two attempts, then silence until the user returns on their own. A third, fourth, fifth nudge to someone who has left is what trains them to disable notifications, and a disabled channel kills every future row, including the ones they would have wanted. Large-scale evidence agrees: in Duolingo's reminder research, a template's effect decays with repetition and recovers with rest (half-life about 15 days), and after roughly a week of ignored reminders the app itself says the reminders are not working and stops. Stopping is a feature. See `sources.md`.

**What the absence push says.** Something true and new: what changed while they were away, what is coming up, what the product made for them. Never "we miss you," never guilt, never "you haven't opened the app in 10 days" (it tells them you are counting, and it gives them nothing).

**Free users count.** A win-back keyed on a subscription lapsing is not an absence trigger. It misses every free user who drifts, and it misses the paying user who stops opening the app until the renewal fails. Both need the activity signal.

**The return.** Design what the user sees when they come back: a card that says what changed, not an empty Home. The return screen is part of the loop.

**Channel.** A lapsed user has often already muted push. The absence ladder fans out to email (or the in-app card on the next open) when push is off.

## 4. White hat and black hat

Chou's Octalysis framework splits motivation into drives that make people feel **in control** (meaning, accomplishment, creativity: "white hat") and drives that make them feel **compelled** (scarcity, unpredictability, loss: "black hat").

- Black hat drives produce action fast and burnout later. Products that lean on them spike and then empty out; the users who stay keep going from sunk cost, not enjoyment, and leave in a wave once one person does.
- White hat alone produces intention without action. People mean to come back and don't.
- **The house rule:** build the loop on white hat (the reward is real progress or a real answer). Use black hat only at a single moment the user opted into (their own deadline, a limit they set), and return to white hat immediately after.

**On loss framing** (streaks, "you'll lose"): Chou's rule of thumb is that a threatened loss should be small in practice (a few percent of what the user has built, never more than about 15 to 30%), must come with an obvious fix in the same message, and should have a grace mechanism (a freeze, a repair). Loss messaging with no clear action makes people look away rather than act. If the product has a streak, the push names the next action, never the loss alone.

**The overjustification trap.** Points and badges help at the start and go stale fast. By the time a user is a regular, the reward must be the product doing something useful for them. Plan the move from extrinsic to intrinsic before launch.

## 5. Quiet days

A day with nothing scheduled is a design decision. Write the quiet days into the LOOP SPEC ("Day 1 after purchase: nothing, on purpose. Days 8 to 10: nothing."). Additive guidance lands best when the user is positioned to act; a push on every day of the first two weeks teaches the user that pushes are noise before the important one arrives.

A useful count: in one app's first fourteen days, the plan came to **four pushes maximum, two of them conditional**, plus two emails. That is a reasonable ceiling to start from.

## 6. Hand-off from onboarding

The loop starts where activation ends. Take the activation event from the `onboarding` work (the moment the user first gets value) and make it the entry point of loop 1. If there is no named activation event, stop and route to `onboarding`: a loop that starts before activation is a nag.

## 7. Worked example (a weekly meal-planning app)

~~~
LOOP SPEC: weekly meal planner
RHYTHM: weekly because households plan food once a week, usually the weekend
ACTIVATION HANDOFF: first_week_generated

LOOP 1: the week
  TRIGGER      push Sunday 17:00 user-local, fires when next week is generated AND user has a token AND not sent this week
  ACTION       open the week (/week/[id])
  REWARD       seven dinners built around what they told us, one tap to swap any
  NEXT TRIGGER swaps and ratings shape next week; the day-of push uses tonight's dish
  EVENT        week_opened

LOOP 2: tonight
  TRIGGER      push 16:00 user-local on a planned day, fires when tonight has a dish AND the user opened the week
  ACTION       open tonight (/day/[date])
  REWARD       the recipe, timed, with the one prep step to start now
  NEXT TRIGGER "cooked it?" rating on the recipe screen feeds next week
  EVENT        dinner_cooked

ABSENCE: quiet week
  SIGNAL       last_active_at written by the week-load endpoint and on any rating
  WINDOW       10 days = 1 missed weekly cycle + 3 days grace
  LADDER       10 days → 28 days → STOP, silent until return
  CHANNEL      push; email if push is off
  RETURN       "Your week is ready" card with the fresh week, not last month's

QUIET DAYS: Monday and Tuesday of week 1 (the plan is new; let them cook)
E1 pass · E2 pass · E3 pass
~~~
