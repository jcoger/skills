# Beat Sheet Spec

The BEAT SHEET is the handoff contract. An implementation skill (UI animation or video) should be able to build from it with zero story decisions left open. Every field is mandatory.

## The contract

~~~
BEAT SHEET: <concept name>
CLAIM: <the one competitive claim this proves>
ARCHETYPE: <from story-patterns.md, plus any single stacked beat>
EMOTION: <relief | victory | confidence | satisfaction | delight>
SIGNATURE: <the single frame someone would screenshot>
RUNTIME: <total seconds>  LOOP: <reset strategy, in-fiction>
MEDIUM: <lottie | code | video | in-app>  BUILD RISK: <one line>

| Beat | Time | What happens | Mover | Tension or payoff | Notes |
|---|---|---|---|---|---|

STATIC: <what deliberately does not animate>
OUTCOME: <the human or business outcome shown before the reset>
~~~

Field rules:

- **Time** is a range in seconds ("2.0-3.0s"). Ranges, not exact frames; the implementation skill owns frames.
- **Mover** names the ONE primary mover for the beat (B4). "Camera" is a valid mover.
- **Tension or payoff** forces every beat to justify itself. A beat that is neither is a candidate for deletion.
- **STATIC** is the discipline line: naming what holds still is what makes the mover read.
- Pattern vocabulary in "What happens" should stay descriptive ("beam sweeps down", "card slides to gate 2"), never technical ("translateY with expo ease"). Technique belongs downstream.

## Worked example

~~~
BEAT SHEET: The Scan
CLAIM: Our review layer catches the errors that get invoices rejected.
ARCHETYPE: The Scan
EMOTION: satisfaction
SIGNATURE: Beam mid-sweep, first hidden error igniting red
RUNTIME: 6s  LOOP: scanned invoice exits right, next invoice slides in from left
MEDIUM: code  BUILD RISK: beam glow must stay cheap (no heavy blur)

| Beat | Time | What happens | Mover | Tension or payoff | Notes |
|---|---|---|---|---|---|
| 1 | 0-1.0s | Invoice slides to center, looks clean | Invoice | Setup: nothing seems wrong | Dark backdrop, document is the only light thing |
| 2 | 1.0-2.8s | Beam sweeps top to bottom, slow and methodical | Beam | Tension: what will it find | Invoice holds perfectly still |
| 3 | 2.8-3.5s | Three flaws ignite in sequence as the beam passes | Flaw markers | Tension peak: this would have been rejected | Beam keeps moving; markers pulse, small amplitude |
| 4 | 3.5-3.9s | Hold. Everything still, three red marks pulsing | None (hold) | The oh-no moment lands | Holds are content |
| 5 | 3.9-5.0s | Corrections cascade top to bottom, red turns to check | Corrections | Payoff: precision, fast | One correction at a time, tight rhythm |
| 6 | 5.0-6.0s | Stat line lands; invoice exits right, next enters left | Invoice pair | Outcome plus reset | Stat: "caught before it cost you" style line, no fake numbers |

STATIC: backdrop, logo, stat container until beat 6
OUTCOME: the stat line plus the clean invoice leaving for approval
~~~

## Loop design

The loop strategy is chosen at storyboard time, not left to the builder. Four strategies:

1. **Conveyor reset.** The finished item exits, the next one enters. The factory never stops. Best default for item-based stories (Near Miss, Gauntlet, Scan, Handoff).
2. **Counter reset.** Numbers or timelines snap back and start again, framed as "the next project". For Race and Time-Lapse.
3. **Ouroboros morph.** The final state visually becomes the first state (the clean dashboard fragments back into chaos offscreen, the build disassembles). Highest craft, use sparingly.
4. **Ambient.** No reset because there is no plot edge: feeds, heartbeats, sorters. The loop point falls mid-flow where no beat boundary exists.

The seam test: watch the loop point three times in a row. If you can feel where it restarts, the seam fails. Fixes: never end on a unique one-time event without handing off inside the fiction; match exit and enter velocities at the seam; for muted social, the last frame must also read as a valid first frame.

## Timing craft

- Beats run 0.5 to 2 seconds. Under 0.5s is a transition, not a beat; over 2s needs interior movement or it stalls.
- Holds after a payoff are content, not dead time. 0.4 to 1 second.
- Hero loops: 4 to 8 seconds total. Past 8 seconds, comprehension on loop entry suffers (viewers join mid-loop).
- Demo and social video: beats per the video reference's pacing rules; hook lives in the first 2 seconds.
- Tension beats can run slightly long; payoff beats should land slightly fast. Anticipation stretches, resolution snaps.

## Medium handoff

| Medium | Goes to | What changes |
|---|---|---|
| code (web hero, in-page) | UI animation skill (IMPLEMENT) | Time ranges become tokens and eases; loop runs on the page with pause-on-reduced-motion and a pause control if over 5s |
| lottie | UI animation skill, Lottie constraints | Vector-only movers, no heavy blur or particles, flat layer count; the beam-style glow becomes a gradient sweep |
| video (rendered) | Video craft reference | Beats map one-to-one to sequences or timeline labels; times convert to frames at the project fps; loop seam = last frame hands to first |
| in-app | screen-choreography.md | The beat sheet dissolves into entrance and journey scripts; story gates yield to frequency rules |

What the implementation skill expects from you: the table above filled completely, the STATIC line, and no technique words. What you should expect back: a gate-checked build and pushback on any beat the medium cannot express, which is a B6 finding, not an implementation problem.

## Review notes for beat sheets

- A beat whose Mover column lists two movers fails B4. Split it or demote one to "supports".
- "LOOP: fades back to start" fails B5 on sight.
- A sheet with no hold anywhere reads as noise at build time; payoffs need landing room.
- Stats and claims in beats must come from the client's real material. Never invent numbers; write the slot ("approval stat here") if the number is not confirmed.
