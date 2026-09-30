# Store Submission Checklist (STORE mode)

**The planning rule: submission is two release cycles of work, always.** A real project's
operating log recorded exactly this ("we keep claiming Submission is one RC of work and it never
is") and then compressed sign-in, deletion, legal, and disclosures into a single pre-launch day
anyway. Scaffold these in week 1 (`mobile-scaffold` S9), verify them here.

## A. Apple hard requirements (rejections, not suggestions)

- [ ] **Sign in with Apple**: required whenever any third-party sign-in (Google, etc.) is
  offered. Adding it late touches auth routing, so stub it early.
- [ ] **Account deletion**: in-app, discoverable, actually deletes server data. Requires a
  verified cascade map: audit every FK's `ON DELETE` behavior from the migration files (not from
  memory) and keep the map as a doc that reviews check against.
- [ ] **Privacy**: `NSxxxUsageDescription` strings for every permission actually requested
  (missing one = instant crash at first use, and local builds hide config drift; see failure
  catalog #10); privacy manifest; App Privacy questionnaire answers that match reality.
- [ ] **Legal URLs live**: privacy policy + terms/EULA at real URLs before review.
- [ ] **Purchases**: subscription disclosure copy (price, period, renewal, cancel path) on the
  paywall; restore purchases; products approved in the store console; **production payment keys**
  in the production env (R3: a test key crashes release builds of some payment SDKs).

## B. Access for review

- [ ] A working demo account (real credentials in App Review notes) or anonymous-first entry.
- [ ] Review notes explaining anything gated (location features, push timing, paid content).
- [ ] Backend up and reachable from a fresh install with no dev flags.

## C. Assets and metadata

- [ ] Screenshots at required sizes (6.9" minimum set for current iPhones), current with the
  shipped UI. Stale screenshots are a rejection.
- [ ] App icon final (all slots), name/subtitle/keywords/description written and reviewed by a
  human for voice.
- [ ] Age rating questionnaire, category, support URL.

## D. Runtime posture (overlaps the R-gates; verify per submission)

- [ ] Crash reporting + analytics receiving from a release build (R7).
- [ ] Push: production APNs environment; dead-token pruning on send failures.
- [ ] Deep links: cold-start path handled (a notification tap can resolve before auth hydration;
  queue the link, fire when the session is ready).
- [ ] All dev-only screens/flags compiled out or forced off in production (R2).

## E. Rollback readiness (R8)

- [ ] Build number bumped; the previous shippable build identified.
- [ ] What-changed recorded where the team will find it.
- [ ] Phased release (or equivalent) decided deliberately, not by default.

## Google Play deltas (when shipping Android)

Data-safety form instead of the Apple questionnaire; account-deletion **web** URL additionally
required; closed-testing track requirements for new developer accounts; target-API-level
deadline check.
