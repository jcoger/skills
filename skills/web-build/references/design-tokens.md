# Design Tokens

The token block is the brand, compiled. Every visual decision the direction skills made becomes a named value here, and nothing downstream is allowed to use a raw value again (W2).

## Naming: role, not value

`--color-brand-primary`, never `--blue-600`. Role names survive a rebrand; value names rot the moment the palette shifts. The test: if the brand changed from blue to green, would any token *name* have to change? If yes, the name is wrong.

Layers:

- **Surfaces:** `--surface-primary`, `--surface-secondary`, `--surface-inverse`, `--surface-raised`
- **Text:** `--text-primary`, `--text-secondary`, `--text-inverse`, `--text-accent`
- **Brand:** `--brand-primary`, `--brand-secondary`, `--brand-accent`
- **UI:** `--ui-border`, `--ui-focus`, `--ui-error`, `--ui-success`

## The block

Generic example shape (values are placeholders; real values come from brand direction, W1):

~~~css
:root {
  /* Surfaces */
  --surface-primary: #FAFAF8;
  --surface-secondary: #F0EFEA;
  --surface-inverse: #101418;     /* hero, footer */
  --surface-raised: #FFFFFF;

  /* Text. Contrast vs expected surface in comments. */
  --text-primary: #15191E;        /* 15.2:1 on surface-primary */
  --text-secondary: #5A6470;      /* 5.6:1 on surface-primary */
  --text-inverse: #F5F6F4;        /* 14.8:1 on surface-inverse */

  /* Brand */
  --brand-primary: #0A2540;
  --brand-accent: #2ECB8F;        /* graphics + large text only: 2.4:1, fails body copy */

  /* UI */
  --ui-border: #E2E0D9;
  --ui-focus: #0A2540;

  /* Type scale: fluid, clamp(min, preferred, max) */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
  --text-xl: clamp(1.25rem, 1.1rem + 0.8vw, 1.563rem);
  --text-2xl: clamp(1.563rem, 1.3rem + 1.2vw, 1.953rem);
  --text-4xl: clamp(2.441rem, 1.9rem + 2.5vw, 3.052rem);
  --text-hero: clamp(2.5rem, 1.5rem + 5vw, 5rem);

  --tracking-tight: -0.02em;      /* headlines */
  --tracking-normal: 0;
  --tracking-wide: 0.06em;        /* eyebrows, all-caps labels */
  --leading-tight: 1.1;           /* hero */
  --leading-snug: 1.3;            /* headings */
  --leading-normal: 1.6;          /* body */

  /* Spacing: one scale, sections use the top end */
  --space-1: 0.25rem;  --space-2: 0.5rem;  --space-3: 0.75rem;
  --space-4: 1rem;     --space-6: 1.5rem;  --space-8: 2rem;
  --space-12: 3rem;    --space-16: 4rem;   --space-24: 6rem;
  --space-section: clamp(4rem, 2rem + 8vw, 10rem);

  /* Radius */
  --radius-sm: 6px;  --radius-md: 12px;  --radius-lg: 24px;  --radius-full: 9999px;

  /* Motion: imported from animation-craft's web tokens (duration + easing). Do not redefine. */
}
~~~

Rules baked into that example: the accent color carries its own usage warning when it fails body-copy contrast; section spacing is one fluid token, not per-section magic numbers; the type scale is fluid only where it matters (lg and up).

## Tailwind v4 mapping

Tailwind v4 is CSS-first: tokens declared in `@theme` become both CSS custom properties and utility classes. Declare once, use everywhere:

~~~css
@import "tailwindcss";

@theme {
  --color-surface-primary: #FAFAF8;
  --color-text-primary: #15191E;
  --color-brand-primary: #0A2540;
  --font-display: "Family Name", ui-serif, Georgia, serif;
  --spacing-section: clamp(4rem, 2rem + 8vw, 10rem);
}
~~~

Now `bg-surface-primary` and `text-brand-primary` exist as utilities, and `var(--color-brand-primary)` works in raw CSS. One source of truth, no JS config drift.

## Contrast checklist

- Body text: 4.5:1 minimum against its surface.
- Large text (24px+, or 19px bold): 3:1.
- UI elements (borders of inputs, focus rings, icons that carry meaning): 3:1.
- Check text-on-image separately; specify the scrim token if the ratio depends on one.

## Font engineering (W5)

- **Sourcing:** commercial foundries for ownable display faces, Fontshare and Google Fonts for workhorses. The pairing decision is brand direction (W1); the loading is yours.
- **Weights:** every weight is ~20-80KB. Load the minimum the design actually uses; a variable font often beats three static weights and unlocks weight animation.
- **Loading (Next.js):** `next/font` self-hosted. `display: swap` for body text; `display: optional` is defensible for a display face where the fallback is well-matched.
- **Metric-compatible fallbacks:** the difference between a flash and a layout shift (CLS). `next/font` generates `size-adjust` fallbacks automatically; if hand-rolling:

~~~css
@font-face {
  font-family: "Display Fallback";
  src: local("Georgia");
  size-adjust: 104%;
  ascent-override: 92%;
}
~~~

- **Subsetting:** latin subset unless the content says otherwise. Preload only the display face used in the hero.

Output spec format:

~~~
FONT LOADING
| Family | Role | Weights | Source | Display | Fallback |
|---|---|---|---|---|---|
| <display face> | headlines | variable 500-700 | self-hosted via next/font | swap | Georgia + size-adjust |
| <text face> | body, UI | 400, 500 | self-hosted via next/font | swap | system-ui stack |
~~~
