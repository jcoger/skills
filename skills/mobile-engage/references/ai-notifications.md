# AI-written notifications

Load in AI mode. A model-written push is grounded in the user's own data ("Thursday is the salmon, 25 minutes"). It can be the most specific message the app sends, and it is the only one that can state something false on a lock screen with your app's name on it. Every AI row in the PUSH MAP carries the six guardrails below. Missing one fails E9.

## Why the floor is non-negotiable

A notification is read in two seconds, out of context, often aloud by a voice assistant or in a car. The reader cannot check it. When Apple's on-device model summarised news notifications in late 2024, it produced false headlines under real publishers' names (one summary told readers a murder suspect had shot himself; he had not). The publisher complained publicly, and in January 2025 Apple paused the summaries for news apps and added a label marking summaries as AI-generated. When summaries returned for news in the iOS 26 betas (July 2025), they came with a warning that summarisation may change the meaning of the original. If the platform owner needs a disclaimer, your job needs a floor. A notification that is wrong once costs trust in every notification after it.

## The six guardrails (E9)

### 1. A templated fallback for every AI message
Every AI row names a template that runs when anything fails: the model times out, returns malformed output, fails validation, fails the cross-check, or the cost brake trips. The fallback is written and reviewed like any other string (route it to `ux-copy`). **The fallback is the floor, so it must be good enough to send on its own.** If the template would not be worth sending, the AI version is not worth the risk.

### 2. Schema-validate the output, and cap its length
Ask for structured output (JSON with `title`, `body`, and the ids of any items named). Validate with a schema library (Zod or equivalent) before anything else touches it:

~~~ts
const PushCopy = z.object({
  title: z.string().min(1).max(40),
  body: z.string().min(1).max(110),
  namedItemIds: z.array(z.string()).max(3),
});
~~~

Lengths follow the platform's visible budget (about 40 characters for a title and 110 for a body before truncation on a collapsed iOS notification; `ux-copy` owns the exact budgets). Any parse or validation failure goes to the fallback. Never "repair" the output with a second free-form model call on the send path.

### 3. Cross-check every named item against the user's real data
If the copy names a dish, a person, a date, a place, or a number, the output must carry the **id** of that item, and the sender checks the id exists in the user's own rows and that the name in the copy matches the name in the row. The model is given the candidate items with their ids in the prompt; it chooses, it does not invent. One mismatch sends the fallback.

This also catches the quiet failures: a date one day off, yesterday's plan instead of today's, a person the user deleted, an item from another user's context.

### 4. The same cap and quiet hours as every other row, server-side
An AI row is a row. It sits in the rank order, counts against the global cap, respects quiet hours in the user's local time, and has a dedupe key. Generation happens **after** arbitration picks it, not before, so you never pay for copy that loses.

Generate ahead of the send window (in a batch job), store the validated copy with the send row, and send from storage. Generating at send time couples delivery to model latency and outages.

### 5. No PII in the payload
Push payloads pass through Apple's or Google's servers and the push service, sit in the device's notification store, and show on the lock screen to whoever holds the phone.
- The **payload** carries ids and the type: `{ type, itemId }`. The app fetches the rest on open.
- The **visible copy** names only what the user would be comfortable seeing on a lock screen in a meeting. Health, money amounts, relationship details, and anything the user marked private stay out of copy entirely, templated or not.
- The **prompt** gets the minimum: the candidate items and their ids, not the user's whole profile. Contact details, emails, and phone numbers never reach the model.
- If the app requires consent before sending user data to a third-party model (App Store guideline 5.1.2(i) does), a user who declined gets the template, always.

### 6. Cost logged per send
Log model, tokens in and out, and cost on the send row, in the same place the rest of the app's AI spend is logged. Add a per-run brake: if a run's projected cost passes a ceiling, the rest of the run uses templates. A notification job is the one AI feature that runs for every user every day without anyone opening the app; it is where a runaway bill starts.

## The row, filled in

~~~
AI ROWS: GUARDRAILS
  tonight_dish: fallback template:tonight_dish_v1 ("Tonight: {dishName}. Tap for the recipe.")
                schema PushCopy (title ≤40, body ≤110, namedItemIds ≤1)
                cross-check namedItemIds[0] = today's planned dish id for this user; name matches
                payload { type: "tonight_dish", dayId } (no dish text in data)
                cost → ai_spend (model, tokens, usd) per send · run brake $X
                kill switch AI_PUSH_TONIGHT=off → template for everyone
~~~

## Order of rollout

1. Ship the row with the **template only.** Prove delivery (E10) and the success event (E7).
2. Generate AI copy in shadow: write it to the log, send the template. Read 50 of them by hand.
3. Switch on for a slice (10%). Compare the success event to the template slice, not the open rate.
4. Keep it only if it beats the template on the success event. Specific copy that does not change behaviour is spend.

## What a model must never do in a push

- State anything not in the candidate data it was given.
- Promise a duration, an outcome, or a result.
- Use urgency, guilt, or loss framing (the never-send list applies in full).
- Address the user by a name or nickname they did not give the app.
- Write in a voice other than the product's. Give the model the voice doc and three approved examples; `ux-copy` owns both.
