---
name: mobile-engage
description: >-
  The retention loop and the push map for a React Native / Expo app (the reason a user comes back, and every notification that pulls them). Use when an app needs a reason to return, when writing or auditing what the app sends and when, when adding an inactivity or win-back trigger, when adding AI-written (model-generated) notification copy, or when notifications "went quiet" and nobody can prove what was delivered. Produces a LOOP SPEC (trigger, action, reward, next trigger, including an inactivity trigger) and a PUSH MAP (every notification with its trigger, copy source, cap, quiet hours, deep link, and success event). Modes: LOOP (write the loop), MAP (write or audit the push map), AI (add model-written copy with guardrails), PROVE (prove delivery from receipts, not job logs).
---

# mobile-engage

The default failure of RN retention work is **shipping a scheduler and calling it a retention system.** A cron job fires, an HTTP call leaves, the job log says "succeeded," and everyone moves on. In one shipped app the log said succeeded 91 days in a row while every call hit a 401: three months of zero reminders, invisible because the scheduler never waited for the response. The same app reached submission with 7% of accounts holding a push token, a `notification_opened` event that had never fired once, and nothing at all that fired when a user stopped opening the app. Every piece existed. None of it was a loop, and none of it was proven.

This skill bans that. It forces two written artifacts before the send code (a LOOP SPEC and a PUSH MAP), and it accepts delivery only from the delivery-response table, never from a scheduler's job log.

**Banned by name** (each seen in a real app, each has a gate):

| Name | What it looks like | Gate |
|---|---|---|
| **The silent cron** | "The job ran" offered as proof of delivery | E10 |
| **The calendar blast** | Pushes scheduled by day number, not by what the user has or has not done | E4 |
| **The orphan push** | A notification type the installed build cannot route. The tap opens Home, or nothing | E6 |
| **The loop with no absence** | Every trigger keys on a date or an event. Nothing fires when the user goes quiet | E3 |
| **The day-0 hello** | A purely informational push ("Welcome!") that asks for attention and gives nothing back | E5 |
| **The borrowed urgency** | Streak guilt, fake countdowns, "you're missing out" | E5 |
| **The unfloored model** | Model-written copy that ships with no templated fallback, no schema check, no cross-check of the items it names | E9 |
| **The dark instrument** | Sends are counted, opens are not. Nobody can say which push earns its place | E7 |

## Stay in lane

This skill owns **why the user returns and what the app sends to bring them back.** It does not own:

| Neighbour | Owns | Hand off when |
|---|---|---|
| `mobile-scaffold` | S12 plumbing: the notifications plugin in its object form, the token table, the entitlement table | The plugin, token table, or native build is missing. Gate S12 first, then come back |
| `onboarding` | First-run activation: the activation moment, the first session | The question is "why don't new users reach value." Engage starts after activation |
| `ux-copy` | The words. Title and body strings, character budgets, voice | The map row is written and needs its strings (or its fallback strings) |
| `mobile-architecture` | The nav graph and deep-link structure | A push needs a route the graph does not have |
| `churn-prevention` | Cancel flows, save offers, dunning | The row is about billing, not about use |
| `mobile-ship` | Release checks (R1 to R8) | The map is built and is going to a release |

## Modes

| Mode | When | What happens |
|---|---|---|
| **LOOP** | New app, or an app with no written reason to return | Name the natural cadence, write each loop as trigger → action → reward → next trigger, add the inactivity trigger. Emit the LOOP SPEC. `references/loop-design.md` |
| **MAP** | Before any send code, or auditing an existing app's sends | One row per notification type, a total rank order, the global cap, the never-send list. Emit the PUSH MAP. `references/push-map.md` |
| **AI** | A map row wants model-written copy | Add the guardrail block to that row. No AI row ships without it. `references/ai-notifications.md` |
| **PROVE** | Before a release, or when sends "went quiet" | Walk the delivery chain from the response table back to the token. Never accept a job log. `references/delivery-proof.md` |

A new app runs LOOP, then MAP, then AI only for rows that need it, then PROVE. An audit of a live app runs PROVE first: nothing else is worth deciding until you know what actually arrives.

## The E-gates (binary, evidence required)

- **E1 Rhythm named.** The loop's rhythm is set by how often the real need recurs (a meal is daily, a plan is weekly, a birthday is yearly), written as one sentence with the evidence. FAIL: "daily engagement" assumed for a weekly need, or no cadence written.
- **E2 Loop closed.** Every loop has all four links: an external trigger that fires without the user opening the app, one action, a reward delivered inside the product, and a next trigger that the action set up. FAIL: any link missing, or a reward that lives only in the notification.
- **E3 Absence trigger.** At least one trigger keys on the user *not* showing up: a server-written last-active signal, a dormancy window derived from the cadence, a ladder with a hard stop, and free users included. FAIL: no last-active signal, a window picked by feel, or a win-back that only fires when a subscription lapses.
- **E4 Budget enforced server-side.** Every row checks a condition at send time and has a dedupe key. All rows sit in one written total rank order. A global cap (per user, per day and per week) and quiet hours in the user's local timezone are enforced on the server. What loses arbitration waits; it never fires tomorrow in a burst. FAIL: client-side caps, UTC quiet hours, "higher priority wins" without the order written down.
- **E5 Never-send list written and honoured.** No purely informational push, no marketing push without explicit opt-in, no borrowed urgency, no streak guilt, no push the user cannot act on. FAIL: the list is absent, or any map row matches it.
- **E6 Every push lands.** Every type has a route in the *installed* build, the token row carries the app version so a new type only reaches builds that parse it, and each type was tapped from a simulated push on a real build. FAIL: any type whose tap was never exercised.
- **E7 Every push is measured.** Each row names its success event (the action the push exists to cause, not the open). `notification_opened` fires with the type. A cut rule is written (for example: 10+ sends, zero target actions by day 30, the type is cut). FAIL: opens untracked, or no cut rule.
- **E8 Permission earned, reach visible.** The system prompt is preceded by a prime at a moment of value, never at first launch. Denied users have a non-push path (an in-app surface, email). Token coverage (share of active users with a live token) is on a dashboard. FAIL: prompt on launch, no fallback, coverage unknown.
- **E9 AI rows floored.** Every model-written row has: a templated fallback, schema-validated output with a length cap, every named item cross-checked against the user's real data, the same server-side cap and quiet hours as templated rows, no PII in the payload, and cost logged per send. FAIL: any one missing on any AI row. N/A only when the map has no AI rows.
- **E10 Delivery proven from receipts.** Delivery is read from the provider's delivery response (Expo push receipts, or the HTTP response table the scheduler writes), per type, for a real scheduled run. Dead tokens are removed on the provider's "not registered" error. FAIL: evidence is a job log, a ticket, or "we got one on the test phone."

## Output artifacts

Both are fixed format. Write them to the repo (for example `docs/engage/loop-spec.md` and `docs/engage/push-map.md`) so the send code and the next audit read the same page.

~~~
LOOP SPEC: [app]
RHYTHM: [daily | weekly | event-driven | seasonal] because [the real-world need, one sentence]
ACTIVATION HANDOFF: [the activation event from onboarding; the loop starts here]

LOOP [n]: [name]
  TRIGGER      [external: push / email / widget / calendar], fires when [state condition]
  ACTION       [the one thing the user does] ([screen / route])
  REWARD       [what they get inside the product, immediately]
  NEXT TRIGGER [what the action sets up, and when it fires]
  EVENT        [analytics event that proves the loop turned]

ABSENCE: [name]
  SIGNAL       last_active_at written by [server path] on [which events]
  WINDOW       [n days] = [cadence] x [multiplier], because [reason]
  LADDER       [attempt 1 at window] → [attempt 2 at window x2] → STOP after [n], then silent until return
  CHANNEL      [push → email fallback when push is off or muted]
  RETURN       [what they see on return: what changed while they were gone]

QUIET DAYS: [days with nothing scheduled, on purpose]
E1 pass/FAIL · E2 pass/FAIL · E3 pass/FAIL
~~~

~~~
PUSH MAP: [app] ([date])
GLOBAL CAP: [n]/day, [n]/week per user · QUIET HOURS: [hh–hh] user-local · ENFORCED IN: [server path]
RANK ORDER (what wins when two rows are due): 1 [type] > 2 [type] > ...
NEVER-SEND: [list]

| # | type | trigger (state at send time) | dedupe key | copy source | cap | channel + fallback | deep link | success event | min build | status |
|---|------|------------------------------|------------|-------------|-----|--------------------|-----------|---------------|-----------|--------|

AI ROWS: GUARDRAILS (one block per AI row)
  [type]: fallback [template id] · schema [name, max chars] · cross-check [fields vs table] ·
          payload [ids only, no PII] · cost [where logged] · kill switch [flag]

DELIVERY PROOF
  [type]: run [date] · sent [n] · receipts ok [n] · errors [n by code] · dead tokens removed [n] · source [table/query]
REACH: token coverage [n]% of 30-day actives · permission prime at [moment]
CUT RULE: [rule]

E4 · E5 · E6 · E7 · E8 · E9 · E10  pass/FAIL: [evidence]
OPEN GATES (ordered): 1. [gate] → [fix]
ROUTED: [plumbing → mobile-scaffold · strings → ux-copy · routes → mobile-architecture · release → mobile-ship]
~~~

## Conduct

1. **State before schedule.** A row that fires on "day 3" is a calendar blast. A row that fires on "day 3+, and the user has no dated occasion" is a trigger. The day number is a floor, never the condition.
2. **A quiet day is a decision.** Days with nothing scheduled are part of the design and survive the first review that wants to fill them.
3. **Adding a type is one unit of work.** Map row, dedupe index, log constraint (if the log table checks types), route in the app, copy variants, rank in the order, feature flag. Ship them together. A type dropped from a log constraint makes its log insert fail silently, dedupe breaks, and the push re-fires.
4. **New types ship dark.** Server-side behind a flag, switched on after the build that routes them is the one users have.
5. **The job log is not evidence.** Neither is a ticket. Read the response or the receipt. If you cannot, the E10 verdict is FAIL and you say so.
6. **Read ratios from small numbers as anecdotes.** Ten users produce stories, not rates. Read per-user timelines until the volume supports a rate.
7. **Decide, then say what you decided.** Rhythm, window, and cap all have defaults in the references. Pick one, name it in the spec, and name the reason in one line.

## Reference routing

| File | Load in mode | Contents |
|---|---|---|
| references/loop-design.md | LOOP | cadence, the four links, rewards that last, absence triggers and ladders, white-hat vs black-hat drives, quiet days |
| references/push-map.md | MAP | row fields, arbitration order, caps and quiet hours, the never-send list, permission priming, deep-link landing, the one-unit rule, measurement and the cut rule |
| references/ai-notifications.md | AI | the six guardrails, a validate-then-fallback pattern, what went wrong in public, payload privacy |
| references/delivery-proof.md | PROVE | tickets vs receipts, receipt error codes, async-HTTP scheduler traps, token hygiene, reach metrics, the proof query |
| references/sources.md | any | books, papers, platform docs, and benchmark reports behind the numbers |
