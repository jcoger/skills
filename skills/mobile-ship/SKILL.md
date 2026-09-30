---
name: mobile-ship
description: >-
  The release gate for a React Native / Expo app. Prove the production build before the store does. Use before any EAS/cloud build, TestFlight push, or store submission; when a release build crashes but dev works; when an EAS build fails; or to run the store-compliance checklist. Covers production-bundle preflight, release-build smoke testing, crash-log-first debugging, EAS failure triage, and App Store / Play submission readiness. The closing layer of the Mobile Kit. Modes: BUNDLE (preflight the JS bundle), SMOKE (verify the release build), STORE (submission checklist), TRIAGE (debug a failed build or a release-only crash).
---

# mobile-ship

The default failure of shipping RN is trusting the dev build. **Dev builds lie**: they load JS from Metro (never compiling the production bundle), run with `#if DEBUG` native guards disabled, and reuse a stale local prebuild, so the crash you ship is, by construction, one the dev loop *cannot show you*. Teams then discover it 15 cloud-build minutes at a time, or worse, in a store review. This skill bans that: nothing goes to a cloud build, TestFlight, or review without passing the gates below, and every release-only failure is debugged from the crash log, never from theory.

This is the **close** of the Mobile Kit lifecycle: `mobile-scaffold` → `mobile-architecture` → `mobile-design` → `mobile-motion` → `mobile-audit` → `mobile-ship`. This skill owns *build, release, and submission* only. Design quality is `mobile-audit`'s hold; day-one foundations (env binding, toolchain pins) are `mobile-scaffold`'s gates. When TRIAGE finds a foundation gap, route the fix there and gate here.

## Modes

| Mode | When | What happens |
|---|---|---|
| **BUNDLE** | Before every cloud build | Run `scripts/preflight.mjs` (static checks + the production bundle). ~2 min locally vs 15+ per failed cloud build. |
| **SMOKE** | Before TestFlight / any release | The release-build verification sequence from `references/release-verification.md`. Dev-mode passes do not count. |
| **STORE** | Before submission (start in week 1 via `mobile-scaffold` S9) | Walk the checklist in `references/store-submission.md`. |
| **TRIAGE** | A build failed or a release build crashes | Crash-log first. Match against `references/eas-failure-catalog.md` before forming any theory. |

## The R-gates (binary, evidence required)

- **R1 Bundle proven**: `npx expo export --platform ios` (and android when shipping it) exits 0. This is the exact Metro+Hermes bundle the cloud runs. FAIL: skipped, or run only "last week."
- **R2 Env complete**: every `EXPO_PUBLIC_*` the code reads exists in the target EAS environment; every dev-only flag is OFF there. Cloud builds do not read local `.env`. FAIL: any var missing or any dev flag on.
- **R3 No test keys in production**: no `test_`/sandbox third-party keys in the production environment. Some SDKs (payments especially) deliberately **crash release builds** on a test key while working perfectly in dev. FAIL: any test-prefixed key.
- **R4 Release smoke passed**: release build, Metro killed, app launched from the embedded bundle, stable ≥2 minutes, zero crash logs, core flow walked. The full sequence (and why each step exists) is in `references/release-verification.md`. FAIL: only dev-mode verification.
- **R5 Device boot**: the full native-module stack booted on a *physical device* in a release build at least once per native-dependency change. The simulator is a different CPU class and provably misses device-only native crashes. FAIL: simulator-only verification of native changes.
- **R6 Store checklist complete**: every line of `references/store-submission.md` checked, with evidence.
- **R7 Observability in the build**: crash reporting and analytics initialized and verified receiving from a release build (a crash reporter that dev-only-works is decoration).
- **R8 Versioning sane**: build number bumped, what-changed recorded, the previous shippable build still identifiable for rollback.

## Output artifact

~~~
SHIP REPORT: [app] [version/build]
MODE(S) RUN: BUNDLE | SMOKE | STORE | TRIAGE
VERDICT: SHIP | NOT READY (n gates open)

R1 Bundle          pass/FAIL: [export exit code + date]
R2 Env             pass/FAIL: [env name; vars verified n/n; dev flags]
R3 Keys            pass/FAIL: [scan result]
R4 Release smoke   pass/FAIL: [launch method; stable duration; crash-log check]
R5 Device boot     pass/FAIL: [device; build type; date]
R6 Store checklist pass/FAIL: [n/n items]
R7 Observability   pass/FAIL: [crash+analytics receipt from release build]
R8 Versioning      pass/FAIL: [build #; rollback target]

OPEN GATES (ordered)
1. [gate] -> [fix]
ROUTED: [foundation gaps → mobile-scaffold; design regressions → mobile-audit]
~~~

## TRIAGE rules (release-only failures)

1. **Pull the crash log before theorizing.** A real shipped app burned two full wrong theories (env vars, a native-lib ABI mismatch) that ten minutes with the actual crash log would have killed. The log names the thread and the frame; theories don't.
2. **Reproduce release the RIGHT way.** `expo run:ios --configuration Release` still deep-links to Metro and loads dev JS: a false "works." The honest repro: build Release, **kill Metro** (`lsof -tiTCP:8081 -sTCP:LISTEN | xargs kill -9`), launch via `xcrun simctl launch` so the app runs its embedded bytecode.
3. **Know the simulator's limits.** It's a different CPU class than devices; a device-only native crash will pass simulator smoke forever. That's what R5 is for.
4. **A Hermes/GC segfault at startup is a native module corrupting the heap, not a JS bug.** The JS frame on the stack is the victim, not the culprit. Isolate by gating native-module `init()` calls one at a time (the *configure call*, not the import, is usually the trigger).
5. **Match the failure text against the catalog first**: `references/eas-failure-catalog.md` maps exact error strings to causes for the known build-chain failures. Most "mysterious" first-cloud-build failures are in it.

## Conduct

- Never declare shippable from a dev build. If only dev evidence exists, the verdict is NOT READY with R4 open. Say so plainly.
- Preflight is cheap; run BUNDLE before *every* cloud build, not the first one. The script exists so this doesn't depend on memory.
- Gates are per-release, not per-project. R4/R5 evidence from last release doesn't carry.
