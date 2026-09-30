# Navigation

Expo Router navigation architecture. The goal: a navigation graph that reads
like the product, types its own params, and respects that iOS and Android do
not navigate the same way.

## The three primitives, and when each is right

| Primitive | Use for | Expo Router |
|---|---|---|
| **Tabs** | 3–5 top-level, co-equal sections the user switches between | `Tabs` in a `(tabs)`/`(app)` group `_layout.tsx` |
| **Stack** | Drill-down within a section (list → detail → sub-detail) | `Stack` per tab, as a nested group folder |
| **Modal** | A self-contained task on top of context (compose, settings, a flow) | `Stack.Screen` with `presentation: "modal"` |

**Default decision:** tabs at the root, a stack inside each tab, modals for
interruptive tasks. Don't put a stack at the root and fake tabs with a custom
bar. That breaks per-tab navigation state and the A1 gate.

### Nested stacks per tab

Each tab is its own stack so back navigation, scroll position, and header state
are preserved per tab. Model it as a group folder with its own `_layout.tsx`:

```tsx
// app/(app)/_layout.tsx: the tab bar
import { Tabs } from "expo-router";
export default function AppLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="(home)" options={{ title: "Home" }} />
      <Tabs.Screen name="(search)" options={{ title: "Search" }} />
      <Tabs.Screen name="(profile)" options={{ title: "Profile" }} />
    </Tabs>
  );
}

// app/(app)/(home)/_layout.tsx: the home stack
import { Stack } from "expo-router";
export default function HomeStack() {
  return <Stack />; // index.tsx + [id].tsx live alongside
}
```

## Modals and sheets

Declare modal presentation in the parent `_layout.tsx`, don't hand-roll an
overlay:

```tsx
<Stack.Screen name="compose" options={{ presentation: "modal" }} />
```

**Sheets (native feel).** For partial-height, detented sheets use a native sheet
presentation: `presentation: "formSheet"` with `sheetAllowedDetents` (Expo
Router / react-native-screens), which gives real iOS sheet physics and the
Android equivalent, rather than a JS-animated `Modal`. Reach for a native sheet
over a Reanimated bottom-sheet when the content is a discrete task; reach for a
gesture bottom-sheet library only when you need a persistent, draggable surface
that's part of the screen.

## Typed routes and params

Enable typed routes. It's on by default in current SDKs via
`experiments.typedRoutes` and regenerates on dev server start. This makes
`<Link href>` and `router.push` reject routes that don't exist (gate A1 support).

Read params with the typed hook and a param shape:

```tsx
const { id } = useLocalSearchParams<{ id: string }>();
```

Push typed:

```tsx
router.push({ pathname: "/(app)/(home)/[id]", params: { id: post.id } });
```

Never stringify-concatenate routes (`router.push("/post/" + id)`). You lose the
type guarantee.

## Deep links

File-based routing gives you deep links for free: a path maps to a route. Set
the `scheme` in `app.config.ts`; for universal/app links add the associated
domain config. Map your link table in the SPEC (path → screen, with dynamic
params) so links resolve into the correct nested stack. A deep link to a detail
screen should restore the tab + stack it belongs to, not dump the user at a
rootless screen.

## Per-platform divergence (gate A5: do not flatten)

Back behavior and presentation genuinely differ. Architect for it:

- **Back navigation.** iOS expects a header back chevron AND edge-swipe-back
  (`gestureEnabled: true`, on by default for stack). Android users expect the
  hardware/gesture **system back** to pop the stack and, at a stack root, to
  move toward exit. Don't disable the iOS swipe gesture for convenience, and
  don't assume a custom in-app back button covers Android's system back. Handle
  it (Expo Router pops automatically; intercept only deliberately, e.g. unsaved-
  changes guards, via a back handler).
- **Tab bar.** iOS bottom tab bar sits above the home indicator; Android tab bar
  has its own metrics. Let the navigator render the platform-native bar rather
  than a single custom bar styled identically for both.
- **Sheets/modals.** iOS card/sheet presentation (rounded, detented, swipe-to-
  dismiss) differs from Android's. Use the native presentation so each platform
  feels right instead of one JS animation on both.
- **Safe areas.** Use `react-native-safe-area-context` insets, not hardcoded
  padding. Notch/Dynamic Island, home indicator, and Android status/nav bars
  differ per device and OS. Header-bearing screens get insets from the
  navigator; full-bleed screens apply `useSafeAreaInsets()` themselves.

When a screen needs genuinely different structure per platform, use
`Component.ios.tsx` / `Component.android.tsx` file splits rather than a runtime
`Platform.OS` ladder inside one component.

## AUDIT checks

- Root is a stack with a hand-built tab bar → A1 fail.
- A "modal" implemented as an absolutely-positioned `View` over the screen →
  use real presentation.
- `router.push` with string concatenation → typed-routes bypass.
- iOS swipe-back disabled globally, or Android back unhandled on a flow with
  unsaved state → A5 fail.
- Hardcoded top/bottom padding instead of safe-area insets → A5 fail.
