# Delivery proof

Load in PROVE mode. The only acceptable answer to "did it send?" is a row from a table the delivery provider wrote to. Everything upstream of that (the scheduler log, the function's own "sent" log line, the ticket) proves that a request was made, not that it arrived.

## The chain, and what each link proves

Read from the bottom up. Stop at the first link that has no evidence: that is where the investigation starts.

| # | Link | Proves | Does NOT prove |
|---|---|---|---|
| 1 | Scheduler job log (`cron.job_run_details`, a cloud scheduler's run history) | The job started | That the HTTP call it made succeeded, or got a response at all |
| 2 | HTTP response table (for example Supabase `pg_net`'s `net._http_response`) | The sender function answered, with a status code | That the function sent anything |
| 3 | Your send log (`notification_log` or similar) | The function decided to send and called the push service | That the push service accepted it |
| 4 | Push **ticket** (Expo's response to the send call) | The push service accepted the message into its queue | That Apple or Google accepted it |
| 5 | Push **receipt** (fetched later by ticket id) | Apple or Google accepted it for delivery | That the phone showed it (Focus, disabled, offline) |
| 6 | `notification_opened` in analytics | A person tapped it | That they did the thing |
| 7 | The success event | The push did its job | |

E10 needs link 5 for every type, from a real scheduled run. Links 6 and 7 are E7.

## The async-HTTP trap

**Database schedulers that call HTTP are usually fire-and-forget.** `pg_cron` calling `net.http_post` queues the request and returns a request id immediately. The cron job is logged as succeeded the moment the request is queued. If the endpoint returns 401 because an auth header expired or was never set, the cron log still says succeeded, every day.

That is not hypothetical. One app logged 91 consecutive successful runs of its reminder job while every call returned 401. Nobody noticed for three months, because the only thing anyone checked was the job log.

The check:

~~~sql
-- pg_net keeps responses for a limited time (6 hours by default), so run this soon after the job.
select id, status_code, left(content::text, 200) as body, created
from net._http_response
order by created desc
limit 20;
~~~

Anything other than 2xx on the sender's calls is a failed run, whatever the cron log says. Generalise the rule to any scheduler: find where the **response** is recorded and read that. If the scheduler records no response, make the sender write its own run row (start, end, status, counts) and read that.

## Expo push: tickets vs receipts

Expo's push service answers in two steps, and only the second is delivery evidence.

**Send** (`POST https://exp.host/--/api/v2/push/send`): up to 100 messages per request, and up to 600 notifications per second per project; chunk and throttle (the `expo-server-sdk` libraries do both). The response is one **ticket** per message, in order: `{ status: "ok", id }` or `{ status: "error", message, details: { error } }`. An `ok` ticket means Expo queued it. Nothing more.

**Receipts** (`POST https://exp.host/--/api/v2/push/getReceipts` with up to 1,000 ticket ids): fetch them after a delay (Expo suggests about 15 minutes). Receipts are kept for about 24 hours, then gone. A receipt with `status: "ok"` means Apple or Google accepted the message. A receipt with `status: "error"` carries `details.error`:

| Receipt error | Meaning | Action |
|---|---|---|
| `DeviceNotRegistered` | The token is dead (app uninstalled, token rotated, notifications revoked in some cases) | Delete the token. Stop sending to it. Continuing hurts your sender reputation |
| `MessageTooBig` | Payload over 4,096 bytes | Send ids, not content. Fetch content on open |
| `MessageRateExceeded` | Too many to one device | Back off exponentially, then find out why: your cap is broken. Fix E4 |
| `MismatchSenderId` | Android FCM credentials don't match the app | Fix the FCM credentials in the Expo project |
| `InvalidCredentials` | APNs key or FCM key is wrong or revoked | Fix credentials before anything else. Every send to that platform is failing |

**Store every ticket id with its send log row.** Then a follow-up job (or the next run) fetches receipts for tickets 15 minutes to 24 hours old, writes the outcome to the log row, and deletes dead tokens. A ticket id you did not store is a receipt you can never read.

If you send through APNs or FCM directly, the synchronous response is the receipt equivalent: APNs `410 Unregistered` or `410 ExpiredToken` (and `400 BadDeviceToken`) and FCM `UNREGISTERED` (404) mean delete the token. APNs `429 TooManyRequests` means too many pushes to one token in a row.

## Token hygiene

- **One row per device, not per user.** A user with a phone and a tablet has two tokens.
- **Upsert on every app launch**, with the app version, platform, and device timezone. Tokens rotate; a token written once at signup goes stale. Firebase treats a token as stale after about a month without the device connecting, and Android tokens expire after 270 days inactive.
- **Delete on the provider's "not registered" error,** scoped to the user who owns it.
- **Delete on sign-out,** or the next person on the device gets the last person's pushes.
- **Never trust the client's permission state alone.** A user can turn off notifications in Settings without opening the app. Read `getPermissionsAsync()` on every launch and write the result, so the server knows who is reachable.

## Reach metrics (put these on one dashboard)

| Metric | Definition | Why |
|---|---|---|
| **Token coverage** | 30-day actives with a live token ÷ 30-day actives | How many users the push program can reach at all |
| **Permission grant rate** | Grants ÷ system prompts shown | Whether the prime works |
| **Delivery rate** per type | Receipts ok ÷ tickets ok | Credential or token rot shows here first |
| **Open rate** per type | `notification_opened` ÷ receipts ok | Whether the copy and timing earn a tap |
| **Success rate** per type | Success events within 24h ÷ receipts ok | Whether the push does its job |
| **Disable rate** | Users flipping permission to denied, per week | The cost side. Watch it after every new type |

## The proof query

The output of PROVE is one row per type from a real run, written into the PUSH MAP's DELIVERY PROOF block:

~~~
[type]: run [date] · sent [n] · receipts ok [n] · errors [n by code] · dead tokens removed [n] · source [table/query]
~~~

If a type has never been sent (dark, or no eligible users), say so: `never sent: no evidence`. That is an honest open gate, not a pass.

## When pushes "went quiet"

Walk the chain from the bottom, in this order, and stop at the first broken link:

1. **Credentials.** Any `InvalidCredentials` or `MismatchSenderId` in recent receipts or tickets? Fix first: nothing else matters.
2. **The response table.** Did the sender return 2xx on its last runs? A 401 or 500 here is the silent cron.
3. **The send log.** Did the sender write rows? Zero rows with 2xx responses means the conditions matched nobody. Check the trigger queries against real data, and check whether a type was dropped from a log constraint (inserts failing silently).
4. **Tokens.** How many users have a live token? A coverage of a few percent looks exactly like "pushes stopped working."
5. **Receipts.** Tickets ok but receipts erroring? Read the error codes.
6. **Opens.** Receipts ok but `notification_opened` never fires? The instrument is broken (the handler is not wired, or the cold-start path drops the event), or the route is an orphan.
