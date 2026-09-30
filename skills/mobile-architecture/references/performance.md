# Performance

Premium mobile apps feel instant. On RN that comes from a few structural habits,
not last-minute optimization. Each item below is written to be **checkable**:
AUDIT mode looks for the violation; ARCHITECT mode bakes in the avoidance.

## 1. Virtualize every long list (gate A6)

Never `.map()` over unbounded data in render. Use a virtualized list.

**Default: FlashList** (Shopify) for any list that can grow: feeds, search
results, chats, anything CMS/API-driven. It recycles row components instead of
mounting/unmounting, giving large lists much smoother scroll than `FlatList`.
Use `FlatList` only for short, fixed lists (settings rows, a 5-item menu). Use
`SectionList`/FlashList sections for grouped data.

```tsx
<FlashList
  data={posts}
  keyExtractor={(p) => p.id}        // stable, not the index
  renderItem={renderPost}            // hoisted, not an inline arrow
/>
```

**Checks:**
- Any screen rendering a scrollable list from API data via `ScrollView` +
  `.map()` → A6 fail. Convert to FlashList.
- `keyExtractor={(_, i) => String(i)}` (index key) on a list that can reorder or
  paginate → fail; keys must be stable identity.
- FlashList with no memoized row → re-renders defeat recycling (see §2).

### FlashList + recycling gotcha
Because cells are recycled, never derive view state from previous render inside a
row, and reset any shared/animated value keyed to the item. If a row animates,
key the animation to the item id and reset on id change. (mobile-motion owns the
animation detail; structurally, just ensure rows are pure functions of their
item.)

## 2. Re-render hygiene in hot paths (gate A6 support)

Hot lists are the place inline allocations hurt most. A new function or object
each render breaks `memo` and forces every visible row to re-render.

- **Memoize row components:** `const Row = memo(function Row({ item }) {...})`.
- **Stable callbacks:** wrap row handlers in `useCallback`; pass the item id and
  let the row look up, rather than closing over changing data.
- **No inline allocations in `renderItem` or row props:** no inline `style={{}}`,
  no inline arrow `onPress={() => ...}`, no array/object literals built in
  render. Hoist styles (`StyleSheet.create`) and handlers.
- **Don't pass new props every render:** derive once with `useMemo` if a row
  needs computed data.

**Check:** grep row/list files for inline `style={{`, inline `() =>` in
`renderItem` or on row props, and unmemoized row components. Each is a finding.

> Note: with the New Architecture (default in current SDKs), some animation
> regressions exist and are being addressed upstream. Keep heavy animation off
> the JS thread (Reanimated worklets) and out of list rows where possible.

## 3. Images

Images are the most common memory/scroll killer.

- Use **`expo-image`**, not RN `Image`. It gives disk/memory caching,
  `contentFit`, and built-in transitions.
- Always render at display size; request appropriately sized remote images
  (server transform / CDN params), never full-res thumbnails.
- Set explicit width/height (or aspect ratio) so layout doesn't thrash.
- Use `placeholder` (blurhash/thumbhash) for perceived speed in lists.

**Check:** raw `<Image>` from `react-native` in a list, or full-resolution
remote URLs rendered into small cells → finding.

## 4. Startup and bundle

- **Splash → first paint:** keep the root `_layout.tsx` light. Load fonts and
  critical config behind the splash (`expo-splash-screen` `preventAutoHide` →
  `hide` when ready); don't block first paint on non-critical network calls.
- **Defer heavy work:** lazy-init analytics, heavy SDKs, and non-critical stores
  after first interactive frame.
- **Lean dependencies:** every native module adds startup and binary weight.
  This is why "no new dependencies without asking." Prefer Expo-maintained
  modules.
- **Hermes** is the engine (default). Keep it; avoid patterns that defeat it.
- Heavy, rarely-used screens can be code-split via dynamic import where it pays.

## 5. Make it measurable

Don't claim "it's fast." Instrument:
- Profile JS/render with React DevTools Profiler and the in-app perf monitor;
  watch for dropped frames during list scroll.
- Use Reanimated/RN's frame timing to confirm 60fps (120 on ProMotion) on the
  target device, not the simulator.
- Track cold-start time and first-interactive as numbers across builds.

## Performance posture in the SPEC

Section 6 of the APP ARCHITECTURE SPEC records, per screen: which lists are
virtualized (and FlashList vs FlatList), estimated row counts, and any
image-heavy or animation-heavy screens with their handling. That's the artifact
the build step and AUDIT check against.
