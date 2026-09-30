---
description: Mobile release gate. Preflight the production bundle, smoke the release build, run the store checklist, or triage a build failure.
---
Use the mobile-ship skill. Read its SKILL.md first.
Pick the mode: BUNDLE (run scripts/preflight.mjs, with --bundle before a cloud build), SMOKE (references/release-verification.md sequence; dev-mode evidence does not count), STORE (references/store-submission.md checklist), TRIAGE (crash-log first; match references/eas-failure-catalog.md before theorizing). Walk the R-gates (R1 to R8) with evidence. End with the SHIP REPORT and a SHIP / NOT READY verdict. Route foundation gaps to mobile-scaffold and design regressions to mobile-audit.

Request: $ARGUMENTS
