# Screen Choreography

The in-app lane. No plot here; the craft is spatial continuity, depth, and order. Output is an ENTRANCE SCRIPT (one screen) or a JOURNEY SCRIPT (a flow). Springs, tokens, and code come from the implementation skill; this file owns intent, order, and timing intent.

## Principles

1. **Spatial continuity.** Every transition answers "where did this come from?" and "where does it return to?" Elements arrive from a source and leave toward one. Nothing appears from nowhere.
2. **Depth planes.** Three layers: **Ground** (current screen), **Surface** (sheets, overlays, expanded cards), **Focus** (modals, full takeovers). When Surface rises, Ground recedes (scale to roughly 0.96 and dim). When Focus activates, everything behind dims further. The user always knows which layer they are on.
3. **Priority stagger.** On screen load, elements enter in reading order, 30 to 80ms apart. Primary content leads. Nothing enters simultaneously.
4. **Frequency-aware intensity.** Seen 100+ times a day: skip the entrance after first load, keep press feedback only. A few times per session: standard choreography. Once ever (first run): the most expressive moments live here.
5. **Scale floors.** Nothing enters from scale(0). Large elements (cards, sheets) from 0.92, small (avatars, pills) from 0.85, micro (dots, indicators) from 0.7.
6. **Paired elements share timing.** Sheet + backdrop, modal + overlay move as one object.
7. **Haptic punctuation (mobile).** Spring-driven interactions pair with haptics: light tap for presses, select for choices, confirm for completions, a weighty thud for sheet arrivals. Haptics survive reduced motion.

## ENTRANCE SCRIPT format

~~~
ENTRANCE SCRIPT: <screen name>
FIRST-VISIT ONLY: <yes/no, what repeat visits get instead>

| Order | Element | Move | Delay | Feel |
|---|---|---|---|---|

Total perceived entrance: <ms, keep under ~500ms>
REDUCED MOTION: <the fallback, usually simultaneous fade>
~~~

- **Move** is descriptive: "fade + rise 12px", "scale in from 0.85", "crossfade". No easings or spring configs.
- **Feel** is one word the implementation skill maps to its spring and curve tokens: soft, snappy, bouncy, instant.
- Stagger within a group is written as "+30ms each" on the group row, not one row per item.

### Worked example

~~~
ENTRANCE SCRIPT: Home
FIRST-VISIT ONLY: yes; repeat visits skip entrance, only the status card crossfades if its content changed

| Order | Element | Move | Delay | Feel |
|---|---|---|---|---|
| 1 | Status card | fade + rise 12px | 0ms | soft |
| 2 | Primary action card | fade + rise 12px | 80ms | soft |
| 3 | Items row container | fade + rise 8px | 160ms | soft |
| 4 | Items in row | scale in from 0.85 | 160ms +30ms each | bouncy |
| 5 | Feed header | fade | 240ms | instant |
| 6 | Feed items | fade + rise 8px | 280ms +50ms each | soft |

Total perceived entrance: ~450ms
REDUCED MOTION: all elements fade in together over 100ms; no rises, no scale, no stagger
~~~

The craft details that make this read as intentional: the hero of the screen enters first, container before children, the bouncy feel is spent only on the smallest elements, and the whole thing stays under half a second so it reads as alive rather than slow.

## Sheet contract

All sheets in an app follow one motion contract, written once:

- **Open:** backdrop fades in; Ground recedes (scale + dim); sheet rises from bottom; sheet content staggers in (title, fields, actions, ~30ms); arrival haptic.
- **Close:** sheet drops (slightly slower feel than open is wrong; exits run faster); Ground restores; backdrop fades. No haptic on close.
- **Gesture dismiss:** 1:1 finger tracking, threshold at roughly 40 percent travel, snap whichever way, Ground scale interpolates with sheet position, interruptible at every moment.

## JOURNEY SCRIPT format

A journey script choreographs a full flow as one readable sequence. Format: plain numbered prose, one motion event per line, with feel words and haptic notes inline.

~~~
JOURNEY SCRIPT: open app -> capture a note (target ~10s)

1. App opens -> Home entrance script runs (~450ms)
2. User taps mic -> press dip + tap haptic
3. Recording ring pulses around mic (ambient, small amplitude)
4. User taps stop -> review sheet rises (sheet contract, weighty haptic), Ground recedes
5. User confirms -> sheet drops, Ground restores, confirm haptic
6. Success check pops at the source item (scale floor 0.7, bouncy), then settles
7. The affected item visibly updates (its badge or ring thickens), answering "where did my action go?"
~~~

The last line is the signature of good journey choreography: the user's action lands somewhere visible. A flow that ends with nothing changing on screen feels like it swallowed the input.

## Shared-element transitions

Two tiers, named honestly:

- **Matched motion (simulated):** source fades and shrinks slightly; destination's hero element scales up from ~0.6 into place. No measurement, no overlay. Ships fast, holds up at normal speed.
- **True shared element:** the element is measured, cloned to an overlay, and animates position and size between screens. Premium, expensive, and worth it only on the one or two transitions users repeat constantly (list -> detail).

Script which tier each transition gets. Default to matched motion; reserve true shared elements for the flagship transition, and say which one it is.

## MVP vs polish split

Every choreography deliverable ends with two lists:

- **MVP:** entrance scripts, sheet contract, press feedback, matched-motion transitions. The app feels alive.
- **Polish:** true shared elements, ambient loops (pulses, ring animations), micro-celebrations, per-item feed staggers. The app feels crafted.

The discipline: polish items are named at script time but never block MVP. An app that ships all polish and no contract feels random; the contract is what reads as quality.

## Review smells (in-app)

- Entrance plays on every tab switch (frequency rule violated).
- An element enters from scale(0) or from nowhere (no source).
- Sheet and backdrop on different clocks.
- A journey where the user's action never visibly lands anywhere.
- Total entrance over 700ms (the screen is performing instead of working).
- Reduced motion branch missing from any script.
