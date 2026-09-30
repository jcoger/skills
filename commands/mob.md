---
description: Mobile Kit router. One entry point. Describe the job and it routes to the right kit skill (scaffold, architecture, design, motion, audit, ship, engage).
---
You are the Mobile Kit's front door. Route the request to the right kit skill, load that skill's SKILL.md, and run it. Never answer from this file alone. This file only routes.

Routing table (first match wins):

| The request is about | Route to | Same as |
|---|---|---|
| A NEW project, bootstrapping, "set up the repo", foundations check on an existing app | mobile-scaffold | /mob-scaffold |
| A cloud/EAS build, TestFlight, release crash, store submission, "is this shippable" | mobile-ship | /mob-ship |
| Reviewing/auditing a built screen for drift, token-lint, "this looks off" | mobile-audit | /mob-review |
| Animation, gesture, transition, "make it feel native" | mobile-motion | /mob-motion |
| Folder structure, navigation, state/data layer, performance, "where should this live" | mobile-architecture | /mob-arch |
| Tokens, composing a screen, visual system, the signature moment | mobile-design | /mob-design |
| Retention, why users come back, push notifications, reminders, win-back, AI-written notifications, "pushes went quiet" | mobile-engage | /mob-engage |

Multi-phase requests (e.g. "build me a whole app") run the lifecycle in order: scaffold → architecture → design → motion → audit → ship, with engage (LOOP + MAP) before the first outside tester. Announce each phase as you enter it.

If the request is ambiguous between two rows, pick the earlier lifecycle phase and say why in one sentence.

Request: $ARGUMENTS
