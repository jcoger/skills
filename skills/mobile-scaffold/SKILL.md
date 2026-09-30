---
name: mobile-scaffold
description: >-
  The day-one gate for a new React Native / Expo app. Make the decisions that are cheap at scaffold time and brutal at day 45. Use when creating a new RN/Expo project, when bootstrapping a repo before the first feature, or to retrofit-check an existing project for missing foundations (toolchain pins, component-library commitment, sheet/keyboard architecture, quality tooling, EAS env binding, store-compliance scaffold, analytics and crash reporting, notification and entitlement plumbing). The opening layer of the Mobile Kit. Modes: SCAFFOLD (new project) and RETROFIT (gap-check an existing one).
---

# mobile-scaffold

The default failure of a new RN app is not a bad decision. It's a **deferred** one. Nobody decides to have two lockfiles, a half-adopted component library, sheets nested in ScrollViews, and no test runner; those are the defaults you get by starting to build features on day 1. Every one of them is a five-minute choice at scaffold time and a multi-day excavation at day 45, because by then thirty screens sit on top of it. This skill bans deferral: it forces the twelve decisions before the first feature ships.

This is the **opening** of the Mobile Kit lifecycle: `mobile-scaffold` (foundations) → `mobile-architecture` (nav/state/structure spec) → `mobile-design` (tokens and screens) → `mobile-motion` (interaction) → `mobile-audit` (the hold) → `mobile-ship` (the release gate). This skill owns *project foundations only*. It does not design the nav graph (`mobile-architecture`), does not pick token values (`mobile-design`), and does not run release verification (`mobile-ship`). It verifies those siblings have a place to stand.

## Modes

| Mode | When | What happens |
|---|---|---|
| **SCAFFOLD** | Creating a new project | Walk S1–S12 as a build checklist; nothing else gets built until every gate passes. |
| **RETROFIT** | Existing project, foundations unverified | Walk S1–S12 as an audit; emit the report with fixes ordered by blast radius. |

## The S-gates (binary, evidence required)

Read `references/day-one-decisions.md` for the reasoning and the exact commands behind each gate.

- **S1 Toolchain pinned**: `packageManager` field set; Node version pinned in *every* EAS profile; exactly one lockfile tracked; every postinstall-dependent package listed in the package manager's build-approval config. FAIL: any second lockfile, any unpinned profile.
- **S2 Repo shape final**: single-package vs workspace decided and written down; the native project's location known; no "we'll flatten later." FAIL: a planned mid-project restructure.
- **S3 Component library: all-in or none**. A written commitment. All-in means: installed (including any paid tier) with its postinstall wired, the styling model documented in the repo (e.g. className slots vs `style` props), and screen 1 composed from its primitives. None means: no library components anywhere. FAIL: a hybrid (library components wrapped from outside by custom abstractions), or "we'll convert later." A mid-project partial conversion pays the learning curve and the fighting cost simultaneously; it is the most expensive third option.
- **S4 Tokens before surfaces**: a token source of truth exists and screen 1 consumes zero raw values (verify: `mobile-audit` LINT exits 0). FAIL: any raw hex/spacing literal on the first screen.
- **S5 Sheet + keyboard architecture**: bottom sheets are never children of ScrollViews (siblings of the scroll container, always); ONE named keyboard-avoidance primitive exists and every input surface uses it. FAIL: per-surface keyboard handling. This single gate retires what is historically the largest fix cluster in an RN app's life.
- **S6 Quality tooling live on day 1**: `tsc --noEmit` exits 0; a linter is wired; the test runner is a real dependency with ≥1 passing test; `mobile-audit`'s token-lint runs in the loop. FAIL: any of the four missing. Paying this down current costs a day; paying it down stale costs a crunch week.
- **S7 Production bundle proven**: `npx expo export --platform ios` exits 0 *before the first feature*. This runs the exact Metro+Hermes production bundle a cloud build runs, in ~2 minutes, and catches un-hoisted transitive deps and Hermes-incompatible dynamic imports months early. FAIL: never run.
- **S8 EAS env binding**: build profiles bound to EAS environments; env push documented (`eas env:push <env> --path .env`); every dev-only flag defaults OFF in production. FAIL: relying on local `.env` for cloud builds (they do not read it).
- **S9 Store compliance scaffolded in week 1**: third-party sign-in providers include the platform's required one, account deletion, privacy strings/manifest, legal URLs, paid-tier disclosures, and (if user data reaches any third-party model) an AI data-sharing consent screen naming each provider all have stubs or tickets in week 1. Submission is two release cycles of work, always. Schedule it as two. Detail checklist lives with `mobile-ship` (STORE mode); this gate only verifies it is scaffolded, not crammed into launch week.
- **S10 Dev loop configured**: dev-client (not Expo Go) when any native module exists; a launch config exists; the rebuild-vs-reload rule from `mobile-architecture`'s `dev-loop.md` is known. FAIL: no reproducible way to run the app.
- **S11 Observability live**: analytics events have a real sink (not an in-memory or console-only client) and a typed event union with a written event dictionary; crash reporting is installed and a forced crash from a *release* build arrives with a readable, symbolicated stack; every model call logs its cost. FAIL: "analytics later", a sink decision left open, or crash reports that arrive minified.
- **S12 Lifecycle plumbing**: the notifications plugin is configured in the form that writes the push entitlement, push tokens have a table, and entitlement lives in a provider-independent table with a server-side gate stub (even if the paywall is months away). FAIL: a notifications module guarded behind a `require` that "isn't installed yet", or a client-only `isPremium` flag.

## Output artifact

~~~
SCAFFOLD REPORT: [project]
MODE: SCAFFOLD | RETROFIT
VERDICT: READY | NOT READY (n gates open)

S1 Toolchain pinned      pass/FAIL: [evidence: file/field]
S2 Repo shape final      pass/FAIL: [decision + where written]
S3 Library commitment    pass/FAIL: [ALL-IN <library> | NONE; styling model doc]
S4 Tokens first          pass/FAIL: [token source; LINT result]
S5 Sheets + keyboard     pass/FAIL: [primitive name; sheet placement rule]
S6 Quality tooling       pass/FAIL: [tsc/lint/test/token-lint status]
S7 Bundle proven         pass/FAIL: [expo export exit code + date]
S8 EAS env binding       pass/FAIL: [profiles ↔ environments map]
S9 Compliance scaffold   pass/FAIL: [stubs/tickets list]
S10 Dev loop             pass/FAIL: [launch config; dev-client]
S11 Observability        pass/FAIL: [analytics sink; release-build crash with readable stack]
S12 Lifecycle plumbing   pass/FAIL: [push entitlement in signed build; token table; entitlement table]

OPEN GATES (ordered by blast radius)
1. [gate] -> [the five-minute version of the fix, now]
~~~

## Conduct

- **No feature code while a gate is open.** The whole point is sequence; a "we'll circle back" converts a 5-minute fix into a day-45 excavation.
- In RETROFIT mode, do not prescribe a restructure the project can't absorb. Report the gap, cost it honestly, and let the owner sequence it. Exception: S5, S6 and S11 are always worth fixing immediately at any project age: every day without S11 is funnel and crash data that can never be recovered.
- Decisions get *written down in the repo* (README or an architecture doc), not held in a session. The next agent inherits files, not context.
- Route outward: nav/state design → `mobile-architecture`; token values → `mobile-design`; the full store checklist and release verification → `mobile-ship`. S11 and S12 install the plumbing only; what the notifications say and when they fire is a product decision, not a scaffold one.
