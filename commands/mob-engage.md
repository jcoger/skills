---
description: Mobile retention loop and push map. Write the LOOP SPEC, write or audit the PUSH MAP, add AI-written notifications with guardrails, or prove delivery.
---
Use the mobile-engage skill. Read its SKILL.md first.
Pick the mode: LOOP (name the cadence, write each loop as trigger → action → reward → next trigger, plus the absence trigger; references/loop-design.md), MAP (one row per notification type, rank order, server-side cap and quiet hours, never-send list; references/push-map.md), AI (add the guardrail block to every model-written row; references/ai-notifications.md), PROVE (delivery from push receipts or the HTTP response table, never a job log; references/delivery-proof.md). An audit of a live app runs PROVE first. Walk the E-gates (E1 to E10) with evidence. End with the LOOP SPEC and/or PUSH MAP in their fixed formats and the open gates in order. Route plumbing gaps to mobile-scaffold (S12), strings to ux-copy, routes to mobile-architecture, first-run activation to onboarding, release checks to mobile-ship.

Request: $ARGUMENTS
