# Type, Spacing, Radius, Elevation (mobile)

The numeric backbone. Set these in SYSTEM as scales; components pick from the scale, never invent values. Mobile is denser and more constrained than web. These are the mobile numbers, not borrowed web ones.

## Type scale

Mobile type is tighter than web: fewer steps, a real body floor, and it must scale with the user's accessibility setting.

| Token | iOS (pt) | Android (sp) | Use |
|---|---|---|---|
| display | 34–40 | 32–36 | one-per-screen hero headline (onboarding, paywall) |
| title | 28 | 28 | screen titles (large-title nav) |
| heading | 20–22 | 20 | section + card titles |
| body | **17** | **16** | default copy: the floor, never go below |
| callout | 16 | 15 | secondary body |
| caption | 13 | 12 | labels, metadata, timestamps (floor: 13/12) |

Rules:
- **Body never below 17pt iOS / 14sp Android.** Smaller body is the fastest "this wasn't made by someone who uses phones" tell.
- **≤ 3 weights total** (e.g. regular / medium / semibold). A stray 4th weight is agent drift (D2). Define the closed set in tokens.
- **Scale with the user.** iOS: map to Dynamic Type text styles (or a scaling token), never hardcode a size that ignores the accessibility slider. Android: use `sp`, which scales by default. Cap scaling on truly fixed UI (a numeric badge) deliberately, not everywhere.
- **Tracking tightens as size grows.** Display/title get slightly negative tracking; body stays at 0. Don't track body copy.
- **Type is a token, not a prop sprinkle.** `<Text variant="heading">`, not `fontSize={20}` in the screen.

## Spacing: the 8pt grid

One closed scale; every margin/padding/gap is a multiple. No `padding: 7`.

```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64
```

- **16 is the default screen side margin**; 24 for calmer, more premium screens. Pick one per app and hold it.
- **Vertical rhythm is deliberate, not uniform.** Group related elements tight (8/12), separate sections wide (24/32). A screen where everything is 16 apart reads as a wireframe.
- **Whitespace is the premium signal**. When unsure, add space and cut content, don't cram. Premium apps are *less* dense than the agent default.

## Radius + the concentric rule

A radius scale, plus the one rule that most reliably reads as "designed":

| Token | Value | Use |
|---|---|---|
| sm | 8 | inputs, chips, small controls |
| md | 12–16 | cards, sheets (most things) |
| lg | 20–28 | hero cards, large surfaces |
| full | 9999 | pills, avatars, the primary CTA |

**Concentric radius (the tell):** a nested element's radius = outer radius − padding. A `radius.lg` (24) card with `16` padding gives inner elements `8`. If padding ≥ outer radius, inner corners go square. iOS 26 made this a first-class API (`ConcentricRectangle`); on RN, compute it. Mismatched nested corners (a 16-radius card holding a 16-radius image flush to its edge) is a classic agent mistake.

- **Pick one radius family and hold it.** Cards `md`, pills `full`, inputs `sm`. Don't mix random radii across the app.

## Elevation

| Scheme | How elevation reads |
|---|---|
| Light | a soft shadow token (low spread, low opacity): `elevation.card`, `elevation.sheet`. Never a hard drop shadow. |
| Dark | a **lighter tonal surface step** (`surface.raised` is lighter than `surface.primary`). Shadows are mostly invisible on dark; don't rely on them. |

- Two or three elevation steps max. A page where every card floats has no hierarchy.
- Borders and elevation do the same job. Pick one per surface. A card with both a shadow and a 1px border is usually a mistake; hairline (`ui.border`) for flat grouping, shadow/tonal for true lift.

## What `mobile-audit` checks here

Off-scale spacing (not a multiple of 4) (D1); body below the floor or a hardcoded size that ignores Dynamic Type (D2); a 4th font weight (D2); mismatched concentric radius; a card carrying both shadow and border.
