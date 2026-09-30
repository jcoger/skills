---
description: Mobile design hold. Audit a screen/app for drift; run the token-lint.
---
Use the mobile-audit skill. Read its SKILL.md first.
Run LINT (scripts/token-lint.mjs) over the changed files first, then AUDIT against the D-gates (D1 to D8).
Cite evidence (file:line or a screenshot observation) for every finding. Route motion issues to mobile-motion and structure issues to mobile-architecture. End with a SHIP / NEEDS WORK / REBUILD verdict and ordered must-fixes.

Request: $ARGUMENTS
