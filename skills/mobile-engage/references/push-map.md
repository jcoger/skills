# The push map

Load in MAP mode. The PUSH MAP is one table: every notification type the app can send, one row each. If a send exists in code and not in the map, the map is wrong. If a row exists in the map and not in code, mark it `planned` and say so.

## The row, field by field

| Field | What it holds | The test |
|---|---|---|
| **type** | A stable snake_case id. It is the log key, the route key, and the analytics property | The same string appears in the log table, the route switch, and the event |
| **trigger** | The state checked **at send time**: "3+ days since signup AND the item has no date AND not sent before" | It reads as a condition, not a date. A day count is only ever a floor inside the condition |
| **dedupe key** | What makes a second send a duplicate: per account, per (account, item), per (item, date snapshot) | A unique index exists for it. If a date moves, the key includes a snapshot of the date so the new date can fire and the old one cannot |
| **copy source** | `template:<id>` or `ai:<prompt id> → fallback template:<id>` | Every AI row names its fallback. See `ai-notifications.md` |
| **cap** | The per-type limit (once ever, once per item, once per week) on top of the global cap | Written as a number |
| **channel + fallback** | push, email, in-app card, widget. And where it goes when push is off | A user with push denied still has a path, or the row says "push only" on purpose |
| **deep link** | The route the tap opens, with its params | The route exists in the *installed* build (E6) |
| **success event** | The action this push exists to cause | Not `notification_opened`. The thing after the open |
| **min build** | The first app version that routes this type | The token row carries the app version, and the sender filters on it |
| **status** | live / dark (behind a flag) / planned / cut | Dark types have a named flag |

## The global budget

**Cap.** Start at **one push per user per day and three per week**, and raise it only with evidence from the success events. The best public evidence says fewer is fine: when Pinterest capped each user to a predicted weekly budget, volume fell 6 to 24% while click-through rose 11 to 31% and engagement rose 1 to 3%. A user who mutes you mutes every row, including the one that mattered. Treat the widely shared "uninstalls above N per week" figures as folklore; the most-cited one is a hypothetical in a vendor blog post (see `sources.md`).

**Rotate the words.** Sending the same template every day performs worse than choosing at random: at Duolingo's scale, a template's lift decays with a half-life of about 15 days since the user last saw it. Every recurring row carries 3+ copy variants, logs which one was sent, and does not repeat the last one the user saw.

**Rank order.** When two rows are due for one user on one day, one wins. "The higher-priority one" is not checkable. Write the order as a numbered list, in one function, in one file. A good default shape, top to bottom:

1. Things with a real-world deadline the user set (a dated reminder, an appointment)
2. Things the user explicitly asked for (a plan they committed, an alert they turned on)
3. Money the user must know about (trial ending, payment failed)
4. Gaps that block future value (a missing date that silences every future reminder)
5. Nudges that deepen use
6. Absence triggers
7. Seasonal or editorial cues

**What loses, waits.** The losing row is re-evaluated on the next run with its condition checked fresh. It does not queue and fire tomorrow alongside tomorrow's winner. A burst is the worst send pattern there is.

**Quiet hours** run in the user's local timezone, stored server-side (write the device timezone with the token). A single fixed UTC send time lands at 7am on one coast and 4am somewhere else. Default quiet hours: 21:00 to 08:00 local. Use a send window, not a send minute, so one missed run does not drop the day.

**Where it lives.** Cap, rank, quiet hours, and dedupe all run on the server, in the sender. A client-side cap cannot see the other device, the email lane, or the server's own retries.

## Platform interruption levels

Map every row to the platform level it deserves, and default low.

| iOS `interruptionLevel` | Use for | Android analogue |
|---|---|---|
| `passive` | Nice-to-know. Lands in the list without sound or wake | Low-importance channel |
| `active` (default) | The normal case | Default-importance channel |
| `timeSensitive` | A real deadline the user set, today. Breaks through Focus, so it needs the entitlement and a real reason | High-importance channel |
| `critical` | Health and safety only, with a special Apple entitlement. Never for engagement | n/a |

Android: one notification **channel** per row family (reminders, plans, account), created at startup, so a user can mute nudges without muting reminders. A user who can only mute everything will.

- **Channel importance is permanent.** Once a channel exists, the app can change its name and description but not its importance or sound. Get the channel map right before the first release; fixing it later means a new channel id.
- **A message with no `channelId` does not display** on Android 8+. Every row names its channel.
- **Do not schedule reminders with exact alarms.** Android 14 denies `SCHEDULE_EXACT_ALARM` by default for new installs, and `USE_EXACT_ALARM` is reserved for alarm-clock and calendar apps. Server-sent pushes, or inexact local windows, are the path.

## The never-send list

Write it into the map. Every row is checked against it.

1. **Purely informational pushes.** "Welcome!", "Thanks for joining", "We updated the app". Nothing to do, nothing gained.
2. **Marketing without explicit opt-in.** Apple's App Review Guideline 4.5.4: push must not be used for promotions or direct marketing unless the user explicitly opted in to receive them, in language shown in the UI, with a way to opt out.
3. **Borrowed urgency.** Countdowns that are not real, "last chance" that is not the last, loss framing on things the user never had.
4. **Streak guilt.** A push whose whole message is "you'll lose your streak." If the product uses streaks, the push points at the next action, not at the loss.
5. **Pushes the user cannot act on.** If the tap cannot take them to the thing, send nothing.
6. **Duration promises.** "Just 30 seconds" is a promise the product cannot keep for everyone.
7. **Anything a lock-screen reader should not see.** Guideline 4.5.4 also says push must not carry sensitive personal or confidential information. See the privacy section in `ai-notifications.md`.
8. **The same thing twice.** Apple's HIG warns that repeat notifications about one thing lead people to turn off all of your notifications.

Copy rules that come from the platform, not taste (the strings themselves go to `ux-copy`): don't put the app name in the title (the OS shows it), write a generic fallback for when previews are hidden, and keep it literal, because the OS may summarise your notification again with its own model.

## Permission: earn it, then watch it

**Prime before the system prompt.** The system dialog is one-shot on iOS: a "Don't Allow" sends the user to Settings forever. Show your own screen first, at a moment when the push has an obvious job ("Want a reminder the day before?" right after the user adds a date). The system prompt follows only a "yes" on your screen. Never ask at first launch.

**Provisional authorization** (iOS 12+) delivers quietly to Notification Center without a prompt, and lets the user keep or turn off from the notification itself. Good for apps whose first pushes are low-stakes. It costs nothing to the one-shot prompt, because the prompt has not been used.

**Android 13+** requires the `POST_NOTIFICATIONS` runtime permission, and notifications start off on new installs. Apps targeting API 33+ choose when to ask. Older targets get an automatic prompt the moment they create a channel, and a denial there is not re-asked until reinstall. Target 33+ and prime. In Expo, create the channel (`setNotificationChannelAsync`) **before** requesting the token, or Android 13 never shows the prompt.

**What to expect.** Median opt-in is roughly half of users on each platform (Airship's 2025 data: iOS about 49%, Android about 53%, with Android falling each year since the runtime permission). Category spread is wide: OneSignal's 2024 benchmarks run from about 21% (iOS games) to about 52% (iOS utilities). Plan the program as if half your users cannot be reached by push. Vendor claims that priming "doubles" opt-in have no published method; test it on your own funnel.

**The denied path.** Every row whose channel is push declares what happens when push is off: an in-app card at the next open, an email, a widget, or nothing (on purpose). A user who says no to push is still a user.

**Reach is a metric.** Put **token coverage** on the dashboard: users active in the last 30 days with a live token, divided by users active in the last 30 days. If it is low, every push decision is a decision about a minority. In one app it was 7%, and the push program had been planned as if it were most users.

## Landing: every tap goes somewhere

- **One pure `routeFor(type, data)` function**, tested per type. A tap with no case goes nowhere, or to Home, which reads as broken.
- **Parse defensively.** An older build receiving a newer type must not crash. It falls through to a safe route and logs the unknown type.
- **Cold start and warm start both.** A tap on a killed app arrives through the launch response, not the listener. Test both. `expo-notifications`: `useLastNotificationResponse` / `getLastNotificationResponseAsync` for cold start, `addNotificationResponseReceivedListener` for warm.
- **Not in Expo Go.** Remote push does not work in Expo Go on Android from SDK 53. Test in a development build.
- **Simulate every type on a real build.** iOS simulator: `xcrun simctl push <device> <bundle-id> payload.apns`. Android: send through FCM to a real device or emulator. One payload file per type, kept in the repo.
- **Version gate.** Write the app version on the token row. A new type ships dark, switches on only for tokens whose version routes it.

## The one-unit rule

Adding a notification type is one change, never pieces:

| Piece | Why |
|---|---|
| Map row | The spec |
| Log constraint widened (if the log table checks types) | Otherwise the log insert fails silently, dedupe breaks, and the push re-fires every run |
| Dedupe unique index | The key, enforced by the database |
| `routeFor` case + payload file | E6 |
| Copy variants, with the variant index logged | So a variant can be read back and compared |
| Rank in the order | E4 |
| Feature flag | Ships dark |
| Success event in the event dictionary | E7 |

## Measurement and the cut rule

Per type, per week: **sent → delivered (receipts) → opened → success event.** Four numbers, one row.

- `notification_opened` fires on every tap with `type` and `variant`. If it has never fired, the instrument is broken, not the users.
- The **success event** is the action, not the open. An open with no action is a push that interrupted someone for nothing.
- **Holdout.** Once volume allows (hundreds of eligible users per type per week), hold back 10% of eligible users from a type and compare the success event. Opens alone cannot tell you whether the push caused the action or only preceded it.
- **The cut rule.** Write it in the map. Default: a type sent 10+ times with zero success events by day 30 is cut or rewritten. A type whose sends correlate with disables is cut regardless of its opens.
- **Watch disables.** Read the OS permission status on each app open and log a change. A rise in disables after a new type ships is the loudest signal you will get.

## The in-app half

Not every return is a push. Map these as rows too, with channel `in-app` or `widget`:

- A card at the top of Home that shows what changed while the user was away.
- Home-screen widgets: passive presence at zero notification budget.
- An email lane for users who muted push. Lapsed users have usually muted push already, so win-back rows fan out to email.

A surface that costs no notification budget and persists across days often moves more than a push that is read once.
