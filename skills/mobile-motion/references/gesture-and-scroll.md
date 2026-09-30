# gesture-and-scroll.md

Gesture-driven motion, scroll-driven animation, and sheet/drawer physics on React Native. The spec's scroll clock decides which section of this file applies; never run two continuous scroll models on one screen. Everything here is Reanimated + Gesture Handler; the spring feel it reaches for is set in spring-physics.md and calibrated against the SwiftUI lens in swiftui-craft.md.

## The one rule that governs all of it (K8)

A gesture writes to a shared value every frame; on release, the gesture's velocity is handed to a spring or decay so the animation **continues** the finger's motion instead of starting a new one. Curves restart from rest and feel scheduled; springs carrying velocity feel thrown. This is the difference between native-feeling and not, and it applies equally to swipe-to-dismiss, sheet drag, drawer drag, and pull-to-refresh.

## Gesture into motion: the canonical pattern

~~~jsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDecay } from 'react-native-reanimated';

function DismissibleCard({ onDismiss }) {
  const x = useSharedValue(0);

  const pan = Gesture.Pan()
    .onChange((e) => { x.value += e.changeX; })          // track the finger 1:1
    .onEnd((e) => {
      const gone = Math.abs(x.value) > 120 || Math.abs(e.velocityX) > 800;
      if (gone) {
        x.value = withSpring(Math.sign(x.value || e.velocityX) * 500,
          { velocity: e.velocityX, duration: 300, dampingRatio: 1 });
        runOnJS(onDismiss)();                             // discrete event, once
      } else {
        x.value = withSpring(0,                           // snap back, still carrying velocity
          { velocity: e.velocityX, duration: 300, dampingRatio: 0.85 });
      }
    });

  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] })); // K4

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={style}>{/* card */}</Animated.View>
    </GestureDetector>
  );
}
~~~

For free momentum that flicks and rests against bounds, use `withDecay({ velocity: e.velocityX, clamp: [min, max] })`.

Composition: use `Gesture.Simultaneous`, `Gesture.Race`, and `Gesture.Exclusive` to combine pan/tap/long-press cleanly rather than hand-rolling gesture state. A vertical sheet drag inside a horizontal pager is `Race`/`Exclusive` territory, not a tangle of booleans.

## Tappable controls inside a gesture (the swipe-deck trap)

A `GestureDetector` claims the touch responder for its whole subtree. A `Pan` on a card **swallows `onPress` from child `Pressable`/`Button`s**. Even with `activeOffsetX` set, the swipe works but the in-card buttons never fire. This is the canonical "the deck advances on swipe but the Later/Answer buttons are dead" bug.

Fix: render the interactive controls in a **sibling overlay *outside* the `GestureDetector`**, sharing the same animated transform as the card, with `pointerEvents="box-none"` so body swipes still fall through to the gesture while button taps land on the overlay. The buttons drawn inside the card become visual-only.

~~~jsx
<View>
  <GestureDetector gesture={pan}>
    <Animated.View style={cardStyle}>{/* card face: buttons here are visual only */}</Animated.View>
  </GestureDetector>

  {/* same transform, OUTSIDE the detector; box-none lets card-body swipes pass through */}
  <Animated.View style={[StyleSheet.absoluteFill, cardStyle]} pointerEvents="box-none">
    <View pointerEvents="auto" style={styles.actions}>
      <Button title="Later" onPress={onLater} />
      <Button title="Answer" onPress={onAnswer} />
    </View>
  </Animated.View>
</View>
~~~

Don't reach for `Gesture.Exclusive` with a tap to untangle this. The sibling overlay is simpler and doesn't fight the responder.

**Relatedly: don't gate React state on a spring's completion callback.** A `withSpring(target, cfg, (finished) => {...})` callback runs on the UI thread and is **unreliable for triggering follow-up state** (e.g. reordering the deck once the top card flies off). It can fire late, fire on interruption, or not round-trip to JS cleanly. Commit the data change **synchronously** in `onEnd` the moment you decide the gesture succeeded, and animate the *incoming* element into place. State is JS truth; let the outgoing animation be cosmetic, never the trigger.

## Sheet and drawer physics

A bottom sheet is the canonical mobile motion component, and most "this feels janky" sheet bugs come from skipping the velocity hand-off or animating layout.

Principles:
- **Detents are targets, not keyframes.** Define snap points (e.g. `[collapsed, half, expanded]`) and on release spring to the nearest one *weighted by velocity*: a fast upward flick should overshoot to the next detent even if position is closer to the current one.
- **Translate, never resize.** Move the sheet with `translateY` (K4). Do not animate `height`; render at full height and slide it off-screen.
- **The backdrop is paired (K5).** Backdrop opacity derives from the same shared value as sheet position, on the same spring: one clock, like SwiftUI's `withAnimation` coordinating two views.
- **Rubber-band past the top.** When dragged beyond the max detent, apply resistance (e.g. `excess * 0.2`) instead of letting it track 1:1. This is the iOS overscroll feel.
- **Haptic on detent change**, fired once via `runOnJS`, not per frame (see react-native-craft.md).

~~~jsx
function snapTarget(position, velocity, detents) {
  'worklet';
  const projected = position + velocity * 0.15;   // project where the throw is headed
  return detents.reduce((best, d) =>
    Math.abs(d - projected) < Math.abs(best - projected) ? d : best, detents[0]);
}
// onEnd: y.value = withSpring(snapTarget(y.value, e.velocityY, DETENTS),
//                            { velocity: e.velocityY, duration: 300, dampingRatio: 0.9 });
~~~

A drawer (side menu) is the same pattern on the X axis: track the finger, spring to open/closed weighted by velocity, derive a dimming backdrop from the same value, rubber-band past the open edge.

### Sheets and the keyboard (the detached-sheet gotcha)

A text field inside a sheet has to clear the keyboard, and the library's automatic keyboard handling **only works on the modal path**. In `@gorhom/bottom-sheet`, `bottomInset` is honored by `BottomSheetModal` but **ignored by the plain `BottomSheet`** (the non-modal / `detached` path). Its keyboard repositioning subtracts only the safe-area offset, so `keyboardBehavior="interactive"` lifts a detached/floating sheet by an amount that's off by the safe area, and shifts again depending on whether a `FullWindowOverlay` host is in play. Endless per-device tuning is the symptom.

Drive it yourself instead of fighting the library:
- Listen to `keyboardWillShow`/`keyboardWillHide` (iOS) and set `bottomInset = keyboardHeight + gap` while the keyboard is up.
- Use `keyboardBehavior="extend"` so the library does **not** add a *second* offset on top of your inset.
- **Android stays on `adjustResize`** (the window itself resizes). Do **not** also add keyboard height there or it double-counts.
- Cap the sheet's max content size (`maxDynamicContentSize`) to `windowHeight − bottomInset − topInset − margin` while the keyboard is up, so a tall sheet's top can't push off-screen.

The result is a floating sheet that sits a fixed gap above the keyboard on every device, regardless of safe area.

**One more, if sheets render in the main RN window** (e.g. `disableFullWindowOverlay`, sometimes needed to keep keyboard-frame math consistent): a child with `autoFocus` fires **on mount, not on open.** If a screen pre-mounts several sheets, the keyboard flies up on screen entry. Gate the focusable child behind an `isOpen`-driven mount flag (with a short unmount delay for the close animation) so focus only happens when a sheet actually opens.

### Styling a sheet your component library wraps

Most React Native UI kits ship their bottom sheet as a **composed** component around a
Reanimated-based sheet library, with styling exposed through the kit's own class or slot
props. Three things go wrong the same way in every one of them:

- **Style through the kit's slot props, not the underlying library's `style` props.**
  Style-object props such as a handle or background style often pass through to the inner
  sheet and are then silently overridden by the kit's wrapper. If a style "doesn't take",
  look for the kit's named slot (content container, background, handle indicator) before
  reaching for `style`.
- **Padding belongs on the content-container slot, not on a wrapper `View`.** Kits
  usually set default padding there, including a safe-area offset, so an extra padded
  `View` inside the sheet double-pads.
- **Detached (floating) sheets need rounding on all four corners.** Kit defaults are
  normally written for an attached sheet and round the top corners only.

Before overriding anything, read the kit's own default styles file in `node_modules`.
The defaults are the fastest map of which slot owns which property, and they tell you
what a given override is fighting. Also check you are styling the **composed** sheet
component and not a same-named primitive, which some kits export as a plain `View`.

For production sheets, a maintained library (e.g. a Reanimated-based bottom-sheet) is usually the right call; reproduce these principles by hand only when the spec reserves a sheet whose physics the library cannot express.

## Scroll-driven motion

Maps to the spec's scroll clock contract:

- **Enter-only clock** (the cheap default): layout `entering` animations triggered by list visibility, or an in-view hook flipping a shared value once. Best for everyday lists and feeds.
- **Progress driver:** one `useAnimatedScrollHandler` writes a single `scrollY` shared value; every animated element on the screen interpolates from it. Same principle as a web `--progress` driver: everything shares one clock, so a sticky header, a parallax hero, and a fading title stay in phase.
- **Scrub timeline:** interpolate multiple properties across a defined scroll range, always clamped.

~~~jsx
import Animated, {
  useAnimatedScrollHandler, useSharedValue, useAnimatedStyle, interpolate, Extrapolation,
} from 'react-native-reanimated';

const scrollY = useSharedValue(0);
const onScroll = useAnimatedScrollHandler((e) => {
  scrollY.value = e.contentOffset.y;        // ONE driver for the whole screen
});

const headerStyle = useAnimatedStyle(() => ({
  opacity: interpolate(scrollY.value, [0, 120], [1, 0], Extrapolation.CLAMP),
  transform: [{ translateY: interpolate(scrollY.value, [0, 120], [0, -24], Extrapolation.CLAMP) }],
}));

// usage: <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16}>
~~~

Always pass `Extrapolation.CLAMP` unless overshoot is deliberate. Unclamped interpolation is the number one source of "it glitches when I scroll fast." For long lists, drive animations off `FlatList`/`FlashList` with the animated scroll handler rather than mounting hundreds of independently animated rows.

## Collapsing / sticky headers

The most common scroll-driven mobile pattern. Drive every part (header height area, title scale, large-title-to-inline crossfade, blur intensity) from the **same** `scrollY` value with clamped interpolations. The iOS large-title-to-inline transition is the feel target (the SwiftUI lens): the large title fades and shrinks as the compact title fades in, both keyed to the same scroll offset, never two separate handlers fighting.

## Parallax budget

Parallax is seasoning, not the dish. Keep travel small (a hero image moving 6-10% of its height), derive it from the shared `scrollY`, and never let it cost a frame. Heavy parallax on mobile reads as lag, not depth.

## Pull-to-refresh

Prefer the platform `RefreshControl` for standard cases. It carries the correct native feel for free. Build a custom pulled-content animation only when the spec reserves it; then it is the same gesture pattern (track the pull, resist past threshold, haptic + spring on trigger).

## Reduced motion (K6)

Gesture tracking itself stays: a user dragging a sheet must see it follow their finger regardless of the reduced-motion setting; that is direct manipulation, not decoration. What changes under reduced motion: the *non-interactive* derived flourishes (parallax, decorative scale, the signature scroll reveal) collapse to a crossfade or to nothing. Check `useReducedMotion()` and branch the derived effects, not the 1:1 finger tracking.

## Acceptance

Before calling gesture/scroll work done:
- Full-screen scroll-through at 4x CPU throttle (or a mid-range Android release build) with no dropped frames attributable to animation.
- Every gesture release hands velocity to a spring or decay (K8). No `withTiming` on released values.
- All scroll interpolations are clamped unless overshoot is intentional.
- Sheet/drawer backdrops share one clock with their surface (K5).
- Reduced-motion pass: direct manipulation still tracks; derived flourishes are gone or crossfaded.
- The deliberately-static list from the spec is still static.
