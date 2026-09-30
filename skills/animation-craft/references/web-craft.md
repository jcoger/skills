# Web Craft

CSS and JS implementation reference. Tokens first, then fixes, then the library decision tree.

## Easing tokens

Define once per project. Weak to strong; stronger curves read as more confident but need shorter durations to avoid floatiness.

~~~css
:root {
  /* enter / exit (K1: user-initiated, element appearing or leaving) */
  --ease-out-quad:  cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
  --ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
  --ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);
  --ease-out-expo:  cubic-bezier(0.19, 1, 0.22, 1);

  /* on-screen movement / morph (K1) */
  --ease-in-out-quad:  cubic-bezier(0.455, 0.03, 0.515, 0.955);
  --ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
  --ease-in-out-quint: cubic-bezier(0.86, 0, 0.07, 1);

  /* durations (K2) */
  --dur-micro: 120ms;   /* press states, toggles */
  --dur-fast:  200ms;   /* tooltips, dropdowns, hovers */
  --dur-base:  280ms;   /* modals, drawers, reveals */
  --dur-slow:  600ms;   /* marketing moments only, never product UI */
}
~~~

Role map: entering/exiting -> ease-out token. Moving/morphing on screen -> ease-in-out token. Hover and color -> plain `ease` at `--dur-fast` or faster. Constant motion -> `linear`. ease-in: never on UI.

Default pick: `--ease-out-cubic` at `--dur-fast` is the workhorse. Reserve quint/expo for the one or two moments per page that deserve emphasis.

## Practical fixes (the details that read as craft)

| Scenario | Fix |
|---|---|
| Button press feel | `transform: scale(0.97)` on `:active`, `--dur-micro` |
| Element appears from nowhere | Start at `scale(0.95)` or `translateY(8-24px)`, never `scale(0)` (K7) |
| Popover scales from wrong point | `transform-origin` set to the trigger corner (K7) |
| Sequential tooltips feel slow | Skip the delay and entrance after the first one (K3) |
| Hover flicker | Animate a child element; keep the hover target static |
| Hover fires on touch | Wrap hover styles in `@media (hover: hover) and (pointer: fine)` |
| Jitter on animated element | `will-change: transform` applied just before animating, removed after; never permanently on more than 3 elements |
| Exit feels draggy | Exits run ~20 percent faster, and simpler (opacity-only is fine) |
| Shadow transition is janky | Crossfade two pre-rendered shadow layers via opacity, do not transition box-shadow |
| Small targets hard to hit | 44px minimum hit area via pseudo-element, independent of visual size |

## Modern CSS entry and exit (current)

Three recent platform additions remove old JS workarounds. All are progressive enhancements; ship fallbacks.

- **`@starting-style`** defines the "from" state for entry transitions, including elements arriving from `display: none`. Kills the mount-then-add-class dance for dialogs, popovers, and toasts.
- **`transition-behavior: allow-discrete`** lets `display` and `overlay` ride along in a transition, so pure-CSS exit animations work on dialogs and popovers too.
- **`interpolate-size: allow-keywords`** (Chromium so far) animates to intrinsic sizes like `height: auto`. Where unsupported, keep the `grid-template-rows: 0fr` to `1fr` trick.

~~~css
/* dialog enter + exit with zero JS; backdrop shares tokens (K5) */
dialog {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
  transition:
    opacity var(--dur-fast) var(--ease-out-cubic),
    transform var(--dur-fast) var(--ease-out-cubic),
    display var(--dur-fast) allow-discrete,
    overlay var(--dur-fast) allow-discrete;
}
dialog[open] { opacity: 1; transform: none; }
@starting-style {
  dialog[open] { opacity: 0; transform: translateY(8px) scale(0.98); }
}

dialog::backdrop {
  background: rgb(0 0 0 / 0);
  transition: background var(--dur-fast) ease,
              display var(--dur-fast) allow-discrete,
              overlay var(--dur-fast) allow-discrete;
}
dialog[open]::backdrop { background: rgb(0 0 0 / 0.4); }
@starting-style {
  dialog[open]::backdrop { background: rgb(0 0 0 / 0); }
}
~~~

Prefer native `<dialog>` and the `popover` attribute plus these transitions over portal libraries for simple overlays. The panel and its backdrop share duration and easing exactly (K5).

## Reduced motion (K6)

Every animated element ships with a branch. Pattern for whole projects:

~~~css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
~~~

Use the blanket kill only as a baseline; elements whose meaning depends on motion (progress, state change) get an explicit opacity-only variant instead. In JS, check `matchMedia("(prefers-reduced-motion: reduce)")` before initializing observers or scrub timelines. Autoplaying loops over 5 seconds get a pause control regardless.

## Library decision tree

Work down, stop at the first fit. Importing a library below your stopping point is a review finding.

1. **CSS transitions + custom properties.** All state-driven UI: hovers, toggles, modals, accordions. Interruptible by default (K8), zero bytes.
2. **CSS animations (@keyframes).** Entrances, loops, anything not tied to interactive state.
3. **CSS scroll-driven animations / IntersectionObserver.** Scroll-triggered work; see scroll-tech.md for the decision between them.
4. **View Transitions API (native).** Route and page transitions, crossfades, shared-element morphs. Same-document is broadly supported; cross-document (MPA) works in Chromium and Safari via the `@view-transition { navigation: auto; }` opt-in CSS at-rule on both pages. Firefox support is still in progress. The fallback is an instant route change, which is always acceptable. Prefer this over library page-transition systems.
5. **Motion (formerly Framer Motion).** React state-driven UI: layout animation, exit transitions (`AnimatePresence`), gesture springs. Most React sites start here and graduate to GSAP only when timelines or scroll theaters outgrow it (craft sections below). Hybrid engine hands simple transforms to the browser. Use the `motion/react` import; the standalone `motion` package also works without React.
6. **GSAP + ScrollTrigger.** Imperative timelines, pinning, scrub theaters, orchestrated multi-element sequences, SVG/canvas/WebGL. Now fully free including all plugins. Do not import it for fade-rises.

Mixing 5 and 6 on one page is allowed only when GSAP owns scroll and Motion owns UI state, and they share no elements.

## Motion craft (motion.dev, formerly Framer Motion)

Where most React sites should start. State-driven UI, presence, layout, springs; everything interruptible by default (K8). Graduate to GSAP when the work becomes timeline orchestration or scroll theater.

**Variants are the orchestration tool.** The parent coordinates children; stagger lives in data, not delay math:

~~~jsx
import { motion } from "motion/react";

const listV = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const itemV = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.215, 0.61, 0.355, 1] } },
};
const viewportOnce = { once: true, amount: 0.3 };

function FeatureList({ items }) {
  return (
    <motion.ul variants={listV} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {items.map((it) => (
        <motion.li key={it.id} variants={itemV}>{it.label}</motion.li>
      ))}
    </motion.ul>
  );
}
~~~

**Exits need `AnimatePresence`** (React unmounts are instant otherwise):

~~~jsx
import { AnimatePresence, motion } from "motion/react";

const panelV = {
  hidden: { opacity: 0, scale: 0.97, transition: { duration: 0.16 } }, // exit ~20% faster (K2)
  show: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
};

function Popover({ open, children }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div variants={panelV} initial="hidden" animate="show" exit="hidden">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
~~~

Rules that read as craft:

- Springs use the duration + bounce model: `transition: { type: "spring", duration: 0.25, bounce: 0.15 }` (see spring-physics.md). Springs for state-driven movement, tweens with easing tokens for enters and exits.
- The `layout` prop is FLIP-based size and position animation; `layoutId` gives shared-element morphs within a view. Across routes, prefer the View Transitions API.
- Keep per-frame values out of React state: `useMotionValue`, `useTransform`, and `useScroll` stay off the render path entirely.
- `useReducedMotion()` is the K6 branch in JS.
- `whileInView` with `viewport: { once: true, amount: 0.3 }` is the enter-once reveal; `amount: 0.3` fires before the element is centered, which feels responsive.

## GSAP craft

Timelines, overlap, and text. GSAP is fully free now, including SplitText and all formerly paid plugins.

~~~js
import gsap from "gsap";

// timeline defaults keep tokens in one place (K5)
const tl = gsap.timeline({ defaults: { duration: 0.8, ease: "expo.out" } });
tl.from(".hero-line", { yPercent: 110, stagger: 0.06 })
  .from(".hero-sub", { opacity: 0, y: 16, duration: 0.5 }, "-=0.4")
  .from(".hero-cta", { opacity: 0, y: 12, duration: 0.4 }, "<0.1");
~~~

- **Position parameters are the craft.** `"-=0.4"` overlaps the previous tween's end; `"<0.1"` starts just after the previous tween's start. Beats should overlap; end-to-end sequencing reads as a slideshow.
- Set `defaults` on the timeline so duration and easing changes happen in one place.
- Ease names map to the token roles: `power2.out` is roughly cubic, `power4.out` roughly quint, `expo.out` for the one or two hero moments per page.
- React: wrap setup in `useGSAP(() => ..., { scope: container })` from `@gsap/react` for automatic cleanup. Never a raw `useEffect` without a kill.
- ScrollTrigger craft lives in scroll-tech.md; do not duplicate scroll logic here.

### Worked example: masked line rise

The signature text pattern in most motion specs. SplitText's modern API does the masking:

~~~js
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const split = SplitText.create(".hero-title", {
  type: "lines",
  mask: "lines",     // wraps each line in an overflow clip
  autoSplit: true,   // re-splits on font load and resize
});

gsap.from(split.lines, {
  yPercent: 110,
  duration: 0.9,
  ease: "expo.out",
  stagger: 0.08,     // 60-90ms per line
});
~~~

Craft notes:

- Split after fonts are ready (`autoSplit: true` handles it); splitting before the webfont loads produces wrong line breaks.
- SplitText manages accessibility for you. If hand-rolling, put `aria-label` on the container and `aria-hidden` on the fragments.
- Reduced motion: skip the split entirely and fade the heading in.
- Hand-rolled CSS fallback for no-GSAP projects:

~~~css
.line-mask { overflow: clip; }
.line-mask > .line {
  display: inline-block;
  transform: translateY(110%);
  transition: transform 0.9s var(--ease-out-expo);
  transition-delay: calc(var(--line-index) * 80ms);
}
.is-inview .line-mask > .line { transform: none; }
~~~

## Performance checklist

- transform / opacity / clip-path only (K4). `transition: all` is banned; list properties explicitly.
- One animation driver per page for continuous motion (see scroll-tech.md).
- Test at 4x CPU throttle: scroll the full page with a performance trace; zero animation-attributed layout entries; INP under 200ms.
- React: keep per-frame updates out of React state. Drive them with refs, CSS custom properties, or the library's own loop; a re-render per frame is dropped frames.
