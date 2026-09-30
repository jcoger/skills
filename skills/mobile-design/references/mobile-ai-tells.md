# Mobile AI Tells (the anti-slop catalog)

The specific defaults a coding agent reaches for that make a mobile app read as "AI-built." Naming them is what makes them catchable. None of this is abstract taste; each is a concrete pattern to *not* ship. Loaded in SCREEN and run in the Pre-Flight; `mobile-audit` checks for them too.

## Open with the design read (before composing)

Before generating a screen or system, state it in one line:

> **Reading this as: a \<app kind> for \<audience>, with a \<feeling> feel, leaning \<calm / standard / expressive>.**

Example: *"Reading this as: a habit-tracker for self-improvers, with a focused-calm feel, leaning calm with one celebratory moment."* This forces intent before output and is the cheapest way to stop the model defaulting to a generic aesthetic.

## Anti-default discipline

Do not reach for these without a reason from the brief: AI-purple/blue gradient glows, a centered hero over a dark mesh, three identical feature cards, glassmorphism on everything, the warm beige+brass "premium" palette, Inter as the only font, an infinite-loop animation on every card, a generic full-screen spinner. These are the defaults. Reach past them deliberately.

## Layout & platform tells

- **Web hover states on a touch surface.** Designing `:hover` affordances for a phone. Touch has *pressed*, not hover; every tappable element gets a press state, not a hover one.
- **A top tab/nav bar on iOS where a bottom tab bar belongs.** Putting primary navigation at the top on iOS signals the builder doesn't use iPhones. With 3-5 destinations, use a bottom tab bar.
- **Ignored safe areas.** Content or a CTA under the home indicator, notch, or Dynamic Island. The bottom action that ignores the home-indicator inset.
- **Sub-44pt tap targets.** Icon buttons and rows the thumb can't reliably hit (44pt iOS / 48dp Android floor).
- **Lowest-common-denominator chrome.** The same neutral nav on both platforms because per-platform divergence felt like work. SF Pro on Android, or Roboto on iOS. A custom on-screen back button fighting the iOS edge-swipe.
- **Desktop density on a phone.** Cramming a desktop amount of content into 390px. Premium mobile is *less* dense than the agent default.
- **`100vh`-style full-height bugs.** Layout that jumps because it didn't account for the dynamic viewport or safe-area insets.
- **Liquid Glass on the content layer.** Glass belongs on chrome (nav / tab / sheet), never on lists, cards, or backgrounds.

## State & feedback tells

- **Generic spinner instead of a skeleton** that mirrors the final layout (the skeleton reads ~20-30% faster).
- **No empty state.** A blank screen where "nothing here yet" should be a designed moment.
- **No pressed feedback.** Taps that don't acknowledge instantly.
- **Optimistic UI on a destructive or irreversible action** (delete, payment). Optimism is for likes and toggles only.
- **An error path that dead-ends** with "Something went wrong" and no retry.

## Color, type & shape tells

- **Brand color sprayed everywhere.** Brand is rationed to the one primary action and the single active state; more than that reads as a demo.
- **A 4th font weight** creeping in beyond the closed (3-or-fewer) weight set.
- **Body type below the floor** (17pt iOS / 14sp Android), or sizes hardcoded against Dynamic Type.
- **Mismatched nested corners.** A card and the image inside it sharing a radius flush to the edge, which violates the concentric rule (inner radius = outer radius minus the padding).
- **Drop shadows for elevation in dark mode** instead of tonal surface steps; pure `#000` as a dark surface.
- **Over-expression.** More than one signature moment, or all five expression levers turned at once.

## Icon discipline

- **Never hand-roll SVG icon paths.** Use one icon library (a single set such as SF Symbols on iOS, or one RN icon family); never draw glyphs from scratch.
- **One icon family per app.** Don't mix two icon sets in the same tree.
- **Standardize weight and size.** One stroke weight, sizes from the scale (20 inline, 24 feature), not a different size per usage.

## Copy & content tells (platform-agnostic, run every string)

Mobile has copy too: onboarding headlines, paywall benefits, empty-state subtext, button labels, error messages. Before "done," re-read every visible string and fix:

- **No em-dashes or en-dashes (the `—` and `–` characters) anywhere visible.** Not in headlines, labels, body, buttons, or captions. Use a period, a comma, or a regular hyphen. This is the single most reliable AI tell in copy.
- **No fake-precise numbers** presented as real (`92%`, `4.1x`, `13.4 lb`). Use real data, label it as sample, or cut it. Don't fake precision the product doesn't claim.
- **No generic names or brands** such as "John Doe", "Sarah Chen", "Acme", "Nexus", "SmartFlow". Use realistic, specific, locale-appropriate names.
- **No filler verbs** such as "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize", "Supercharge". Concrete verbs only.
- **No AI-hallucinated cute copy:** forced metaphors, mock-poetic micro-meta, passive-aggressive humility. If a string doesn't clearly make sense, replace it with a plain functional one. Boring beats clever-but-wrong.
- **One copy register per app.** Don't mix technical mono, editorial prose, and marketing punch unless the brand voice calls for it.
