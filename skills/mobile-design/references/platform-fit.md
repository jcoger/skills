# Platform Fit (the native-feel lens)

The emit surface is React Native / Expo, but a premium app is **platform-faithful, not lowest-common-denominator.** "Made by someone who actually uses phones" comes from honoring the conventions each platform's users feel in their thumbs. One RN codebase, but the chrome, navigation, and a few components adapt per platform via `Platform.select` / `.ios.tsx` / `.android.tsx`. This is the difference between "an app" and "a native app."

## What must diverge (the tells)

| Concern | iOS | Android |
|---|---|---|
| System font | SF Pro (Text < 20pt, Display ≥ 20pt) | Roboto |
| Primary nav | Bottom **tab bar**, 3–5 destinations | Bottom nav (3–5) or nav drawer for overflow |
| Back | **Edge-swipe-from-left** + a back chevron in the header; never a custom on-screen back button mid-screen | Hardware/gesture **system back** is real. Handle it; don't assume a UI back button |
| Header title | Large-title that collapses on scroll | Top app bar, title left-aligned |
| Header actions | Text labels on the right ("Edit", "Done") | Icon-only actions |
| Sheets / modals | Native sheet with detents + grabber; "Sheet", "Alert" | Bottom sheet / dialog; "Bottom sheet", "Dialog", "Snackbar" |
| Pickers | Wheel/drum picker | Calendar / dropdown |
| Switch | iOS pill switch (green default) | M3 switch with check |
| Expressive material | **Liquid Glass** on chrome (see below) | **M3 Expressive** shape/color/motion (see below) |

What stays **consistent across platforms:** your brand layer: tokens, type ramp, spacing, the one signature moment. The brand is constant; the chrome is native.

## Safe areas (non-negotiable, D3)

- Wrap screens in safe-area insets. Nothing interactive sits under the **home indicator, notch, or Dynamic Island**.
- The bottom-anchored primary action respects the home-indicator inset (don't jam a pill against the very bottom edge).
- Full-bleed media may extend into the unsafe zone; *controls and text never do*.

## iOS 26: Liquid Glass (use with restraint)

A translucent material that refracts what's behind it. Apple's own guidance is restraint, and over-use is the new "this looks AI-built."

**Do:** apply only to the **navigation/control layer**: tab bar, nav bar, toolbars, floating controls, sheets, menus, alerts.
**Don't:** put glass on the **content layer**: lists, cards, tables, full-screen backgrounds. Don't stack glass on glass without grouping it into a single render pass. Don't tint every control. Only the one primary action gets the prominent treatment. Don't hand-build the accessibility fallbacks; the system handles Reduce Transparency / Increase Contrast / Reduce Motion. Respect them, don't reimplement.
On RN, approximate with a blur material (e.g. expo-blur) on chrome only, and keep content opaque.

**Persistent blur is a scroll-perf trap.** A live backdrop blur re-samples whatever's behind it every frame; parked over a scrolling list as an *always-mounted* overlay (a floating back button, a sticky pill), that's continuous GPU work and reads as scroll jank. So reserve real `BlurView` for **mount-on-demand** chrome that isn't composited over moving content: sheets, menus, alerts animate in, then the content behind them holds still. For **always-mounted** floating controls, fake the frosted look with a semi-transparent fill + a hairline border instead of a live blur. And confirm any translucency/shadow/blur cost on a **physical device**: the iOS Simulator's GPU compositing is far slower than real hardware, so sim-only jank sends you chasing fixes that don't exist on device.

## Android: Material 3 Expressive (calm base, expressive moments)

The most research-backed M3 update: bold type, expressive shape/color, physics-based motion, dynamic color. The rule mirrors the whole kit: **clarity first, expression second.**

**Do:** use shape, size, and color to carry hierarchy. Make the one important element unmistakable. Use the M3 motion physics (springs) for state changes. 1–2 hero moments per product, no more.
**Don't:** add flourish at the cost of a label or a convention. Don't make everything expressive. That flattens the hierarchy expression is supposed to create. Don't ship dynamic color without checking contrast in both light and dark.

## RN implementation pattern

- Centralize divergence: a small `platform` module + `Platform.select` for tokens (font family, nav style) and `.ios.tsx` / `.android.tsx` for components that genuinely differ (the tab bar, the sheet, the back affordance).
- Never fork a whole screen per platform. Fork the *chrome and the few divergent components*, share the content.
- Test both: a screen that only looks right on iOS is half-built.

## What `mobile-audit` checks here (D6)

SF Pro on Android (or Roboto on iOS); a custom on-screen back button fighting the iOS back gesture; Android system back unhandled; interactive elements in the safe-area exclusion zone; Liquid Glass on the content layer; expression with no platform-correct fallback.
