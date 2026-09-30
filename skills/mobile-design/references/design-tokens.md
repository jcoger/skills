# Design Tokens (mobile)

The token layer is the brand, compiled. It is the single source of truth the whole app obeys, and the thing `mobile-audit` lints against. Get it right in SYSTEM before any screen is composed. Default emit target is a typed token module (TypeScript constants, optionally surfaced as NativeWind theme keys) so the agent uses values verbatim, never a raw hex in a component.

## Naming: role, not value

`colors.brand.primary`, never `colors.indigo600`. Role names survive a rebrand; value names rot the moment the palette shifts. The test: if the brand changed hue, would any token *name* have to change? If yes, the name is wrong. A raw `#6366F1` anywhere in component code is the single most common agent-drift tell and a hard fail (D1).

## Three tiers

Indirection is what lets the agent look up instead of invent.

1. **Primitive** (the raw ramp, private): `gray0…gray1000`, `indigo50…900`. Components never touch these.
2. **Semantic** (role aliases, public): `surface.primary`, `text.secondary`, `brand.primary`, `ui.danger`. Components reference only these.
3. **Component** (optional, for repeated parts): `button.primary.bg → brand.primary`. Add only when a component needs to vary independently of the role.

## The layers (role set)

- **Surfaces:** `surface.primary` (app bg), `surface.secondary` (grouped bg), `surface.raised` (cards/sheets), `surface.inverse` (dark band on a light app).
- **Text:** `text.primary`, `text.secondary` (muted), `text.inverse`, `text.accent`.
- **Brand:** `brand.primary` (the one action + active state), `brand.accent` (sparingly).
- **UI / semantic:** `ui.border`, `ui.danger`, `ui.success`, `ui.warning`, `ui.focus`.

## Light and dark are both first-class (D4)

Define both schemes from the start; never derive dark by inverting light. Two rules that separate premium dark mode from cheap:

- **Elevation in dark = lighter tonal surface, not a drop shadow.** A raised card on a dark app is a step *lighter*, not a shadow. Shadows mostly disappear on dark and read as muddy.
- **Never pure `#000` on a dark app**. Use a near-black brand ink so surfaces have room to step up. Pure black makes elevation impossible.

## The token module (drop-in shape)

A typed module the agent imports. Light/dark resolved at the theme boundary, not per-component.

~~~ts
// theme/tokens.ts: values are placeholders; real values come from brand inputs (SYSTEM)
const primitive = {
  ink: '#0B0D10', white: '#FFFFFF',
  gray: { 50:'#F6F7F8', 100:'#ECEEF1', 300:'#CDD2D9', 500:'#7B828C', 700:'#3A4049', 900:'#171A1F' },
  indigo: { 400:'#7C84FF', 500:'#5B63F5', 600:'#4A52E0' },
} as const

export const light = {
  surface: { primary: primitive.white, secondary: primitive.gray[50], raised: primitive.white, inverse: primitive.ink },
  text:    { primary: primitive.gray[900], secondary: primitive.gray[500], inverse: primitive.white, accent: primitive.indigo[600] },
  brand:   { primary: primitive.indigo[500], accent: primitive.indigo[400] },
  ui:      { border: primitive.gray[100], danger: '#E5484D', success: '#30A46C', warning: '#F0A91B', focus: primitive.indigo[500] },
} as const

export const dark = {
  // raised is a STEP LIGHTER than primary: tonal elevation, no shadows
  surface: { primary: primitive.ink, secondary: '#14171C', raised: '#1B1F26', inverse: primitive.white },
  text:    { primary: '#F4F6F8', secondary: '#9AA2AD', inverse: primitive.gray[900], accent: primitive.indigo[400] },
  brand:   { primary: primitive.indigo[400], accent: primitive.indigo[500] },
  ui:      { border: '#262B33', danger: '#FF6369', success: '#3DD68C', warning: '#FFC453', focus: primitive.indigo[400] },
} as const

export type Theme = typeof light
~~~

Consumed via a theme hook (`useTheme()`), or surfaced to NativeWind as semantic class names (`bg-surface-primary`, `text-text-secondary`). Either way: one source, no per-component values.

## Color discipline (the restraint that reads as premium)

- **Neutral or dark canvas; brand color is rationed.** Brand reserved for the one primary action and the single active/selected state. A screen with brand color in five places reads as a demo, not a product.
- **Accent that fails body-copy contrast carries a usage note in the token** (graphics/large-text only). Don't let the agent put a 2.4:1 accent on 15pt text.
- **Semantic colors are never raw.** Error text is `ui.danger`, not `'red'`.

## What `mobile-audit` checks here

Raw hex / `rgb()` / named colors in components (D1); a color used that isn't a semantic token; pure `#000` on a dark theme; brand color used more than once per screen as a fill. See `mobile-audit`.
