# Feel

How a control feels when touched: the loop from input to visible response, for press, drag, scroll, swipe, and snap. This file owns gate K9. The other gates own how a finished animation moves; K9 owns whether the interface answers the hand fast enough, in the right shape, and without lying about where the finger is.

Spine: Steve Swink, *Game Feel: A Game Designer's Guide to Virtual Sensation* (2008). Swink defines feel as real-time control, simulated space, and polish (ch. 1), and he measures it (chs. 5 to 9). The book's structure has held up. Several of its numbers have not. Where research since 2008 has moved a number, this file uses the newer one and says so in "Where the book is dated".

Stay in lane:
- Timing and easing of animations that nobody is steering belong to K1 and K2 and spring-physics.md.
- Gesture code patterns (pan into spring, sheets, detents) live in react-native-craft.md. This file sets the numbers those patterns must hit.
- Whether a surface should be playful at all is not a feel question. A control that responds in 8 ms can still be the wrong idea.

## The default failure: latency dressed up as smoothness

The failure this file bans: **treating the response to input as an animation to be eased, instead of a loop to be closed.** It shows up four ways:

1. A dragged element follows the finger through a `transition: transform 200ms`, or through `withTiming`. It trails the finger by the duration and reads as "smooth" in a screen recording and as "mushy" under the hand.
2. Press feedback waits for `click` / `onPress`, which fire on release. The user gets nothing while their finger is down.
3. Heavy work runs in the handler before the first paint (a state update that re-renders a list, a network call awaited before the pressed state shows).
4. A haptic fires out of sync with the visual, or on every scroll tick.

Why it is banned: under direct touch the finger is the reference point, so any lag shows up as a gap you can measure between finger and content. Users detect that gap at around 11 ms when dragging, against roughly 64 to 69 ms when tapping (Jota et al. 2013; Deber et al. 2015, URLs below). An eased drag at 200 ms is about 18 times past the drag threshold. No amount of polish closes that gap. Swink says the same thing about polish in general: it layers artificial cues on top of the simulation and does not replace response (ch. 9).

## The loop, with current numbers

Swink's model (ch. 2) comes from Card, Moran and Newell's Model Human Processor. The perceptual processor takes about 100 ms (range 50 to 200). A full perceive, think, act correction cycle takes about 240 ms. The computer has to hold three thresholds: motion above 10 fps, response within 240 ms, and continuity at 100 ms or better. It gives 50 ms as the point where response feels instantaneous.

Those are thresholds for *indirect* control of an avatar with a gamepad. Touch changed the reference frame. The table below is what to build to now.

| Interaction | Perceptible at | Performance hurt at | Build target | Source |
|---|---|---|---|---|
| Direct-touch drag (finger on content) | mean JND 11 ms; some users detect 2 to 6 ms | above 10 ms (25 ms and 50 ms significantly slower than 10 ms) | same frame as the input: 1 frame at 60 Hz is 16.7 ms, at 120 Hz 8.3 ms | Deber 2015, Ng 2012, Jota 2013 |
| Direct-touch tap (land-on feedback) | mean JND 64 to 69 ms; nobody below 20 ms | no gain below 10 ms | pressed state visible 1 to 2 frames after touch-down, under 40 ms | Jota 2013, Deber 2015 |
| Indirect drag (trackpad, mouse) | mean JND 55 ms | not measured there | under 50 ms | Deber 2015 |
| Indirect tap (click, trackpad tap) | mean JND 96 ms | not measured there | under 100 ms, Nielsen's 0.1 s | Deber 2015, Nielsen |
| Latency *improvement* worth shipping | a cut as small as 8.3 ms is noticeable across a wide range of baselines | n/a | every frame you remove counts | Deber 2015 |
| Web click, tap, or key to next paint | n/a | n/a | INP at or under 200 ms at p75 is "good". It is a floor, not a feel target | web.dev INP |
| Result of an action (not its feedback) | around 1 s before flow of thought breaks | n/a | under 1 s, or show progress from 1 s | Nielsen |
| Wait before attention leaves | around 10 s | n/a | past 10 s, show time remaining and allow cancel | Nielsen |

How to read it. Nielsen's 0.1 s still holds for **tap feedback**. It is ten times too loose for **drag**. INP's 200 ms "good" line is a page-health metric across the 75th percentile of real sessions. A press that takes 200 ms to show anything already feels late, since that is about three times the tap threshold. Use INP to find broken pages. Use the table to build controls.

## Where the book is dated

| Book claim (chapter) | What changed | Use now |
|---|---|---|
| 50 ms "feels instantaneous", 100 ms noticeable but ignorable, 240 ms is the upper bound (ch. 2) | Those figures come from indirect gamepad control. Direct touch has control-display unity: the finger is the cursor. Direct-drag JND is about 11 ms. Commercial touch pipelines measured 50 to 200 ms end to end in 2015 (Deber) | Tap: under 40 ms. Drag: same frame. 240 ms only marks where control is fully broken, never a budget |
| 10 fps is enough for motion, 30 fps is "pleasingly smooth" (ch. 2) | 60 Hz is the floor on every current phone. ProMotion runs up to 120 Hz, on iPhone since the 13 Pro and on iPad Pro, and most Android flagships ship 90 to 120 Hz | Budget per frame: 16.7 ms at 60 Hz, 11.1 ms at 90 Hz, 8.3 ms at 120 Hz. A dropped frame at 120 Hz is a 16.7 ms hitch, and that is right where drag JND sits |
| A three-frame delay (50 ms at 60 fps) is "all but inevitable" (ch. 2) | Still roughly true of the pipeline. At 120 Hz the same three frames cost 25 ms, and prediction can hide part of it (`getPredictedEvents()` on web, system touch prediction on iOS) | Fix what you own: handler work, re-renders, thread hops. Do not add a frame of your own |
| Measure response lag with a 60 fps camera (ch. 2, citing Mick West) | Phone slow-motion at 240 fps gives 4.2 ms resolution, which is fine enough to resolve drag lag | Film finger and screen together at 240 fps and count frames from contact to first pixel change |
| Rumble and force feedback are blunt and fatiguing (ch. 9) | Linear-actuator engines (Taptic Engine, modern Android LRAs) produce crisp 10 to 20 ms clicks. Both platforms ship semantic haptic APIs | Haptics are a precise confirmation channel with rules (see Haptics). They are no longer a blunt effect |
| The touch screen kiosk as the cautionary tale for touch games (ch. 19) | Swink wrote this just as capacitive multitouch shipped. The direct-manipulation vocabulary he did not cover (momentum, rubber-banding, interruptible springs) is now the baseline users expect | Treat WWDC 2018's fluid-interface rules as the touch-era continuation of his "instantaneous response" and "organic motion" principles |
| Response is judged within the correction cycle, not per event (ch. 2) | The web now measures every interaction in the field (INP, since March 12, 2024), and the Long Animation Frames API attributes the slow ones | Ship with field data. Lab feel checks alone miss the slow long tail |

## What held, translated to interface controls

These parts of the book transfer directly. Each gets a UI reading.

**Attack and release (ch. 7).** Swink describes every response as an ADSR envelope. A long attack reads as floaty, a short curved attack as tight, and a short linear one as twitchy or stiff. His key refinement (ch. 17) is that an attack can run long and still feel responsive, *provided something obvious happens within 70 to 100 ms*. For UI:
- Press-in is the attack. It must show a visible change on the first frame after touch-down. Ease-out and springs both front-load movement, which is why they fit. ease-in delays the attack, which is why K1 bans it.
- Press-out and release can be softer and longer than press-in. Mirrored attack and release, as in Swink's Mario example, suit continuous motion. Asymmetry suits buttons: snap in, settle out.
- Decay (overshoot above the sustain level) is almost always a bug in control, per Swink. In UI, overshoot belongs to released momentum, never to a press.

**Sensitivity and transfer functions (chs. 6 and 7).** Swink separates input sensitivity (how many states the device has) from response sensitivity (how the software maps them). A button has two states. A finger on glass has continuous position and velocity. UI throws most of that away. Recover it where it earns its place:
- Use release velocity for flings and snaps, instead of position alone.
- Apply a nonlinear mapping past boundaries (rubber-banding) instead of a hard stop. This is Swink's "filtering" layer.
- Control-display ratio is 1:1 for direct touch while tracking. Change it only past an edge, and let the change signal the edge (WWDC 2018).

**Predictable results and control ambiguity (ch. 17).** Two gestures that can fire from the same input at nearly the same moment feel random to the user, even if the code resolves them deterministically. Swink's Mario 64 example is the button-chord version. The touch version is a tap versus a pan in the same view, or a vertical sheet drag versus horizontal paging. Resolve intent with movement hysteresis: 10 pt on iOS, 8 dp default touch slop on Android. Run recognizers in parallel from touch-down. Never resolve intent with a timer.

**State changes that the user can see (ch. 7).** One input can mean different things in different states, provided the state is visible. In UI: an edit mode, a selected state, a drag already in progress. If the state is invisible, the result reads as a bug. That is Swink's "state overwhelm" pitfall.

**Harmony (ch. 17).** Every cue (visual, sound, haptic) should agree on one physical reality. Modern platform guidance says the same about haptics specifically: a haptic out of sync with its animation feels broken (Android haptics principles). One spring token drives the element, its shadow, its backdrop, and its haptic trigger point. See K5.

**Polish sells, it does not substitute (ch. 9).** Polish is layered on top of the simulation. Removing it should leave the control working. If a control only feels right because of its polish, the response is wrong underneath.

## Per interaction

### Press (buttons, rows, cards, toggles)

- The pressed state shows on touch-down (`pointerdown` / `:active` on web, `onPressIn` in React Native). The action commits on release (`click` / `onPress`), so the user can cancel by sliding off.
- Press-in: ease-out or a critically damped spring. Visible on frame 1, settled within `--dur-micro` (about 100 to 120 ms). Scale 0.96 to 0.98, or an opacity or fill shift.
- Release: can take 1.5 to 2 times as long as press-in, and can carry a small settle.
- Keep work out of the press-in path. A pressed state that depends on a React re-render has the render time added to its latency.
- Cancel on slide-off, with a retention area (React Native `Pressable` defaults to 20 to 30 px of `pressRetentionOffset`), so a small drift does not cancel the press.
- Long press is 500 ms on both React Native `Pressable` and iOS. If the control has one, show progress from touch-down so the wait reads as intentional.
- Double-tap costs every single tap about 500 ms of waiting on iOS (WWDC 2018). Do not add double-tap to a surface where single tap is the primary action.

### Drag (sliders, reorder, sheets, canvases)

- 1:1 tracking on the same frame as the input. No transition, no `withTiming`, no smoothing filter on position while the finger is down. Smoothing adds latency by definition.
- The drag runs off the main thread where the platform allows it: a Reanimated worklet on the UI thread in React Native, compositor-only transforms on web, driven by `pointermove` with `setPointerCapture`.
- On web, declare `touch-action` on the drag surface (`none` for free drag, `pan-y` for a horizontal slider inside a vertical page). This lets the browser tell your gesture apart from scrolling without waiting on JavaScript.
- Drawing or inking on web: render the `getCoalescedEvents()` points for accuracy and `getPredictedEvents()` points to hide a frame of latency. Discard the predicted points on the next event.
- Past a boundary, apply resistance that grows with distance. A constant multiplier feels like a wall made of rubber, and a hard stop feels like a bug.

### Scroll

- Scroll belongs to the platform. Do not reimplement it. Custom scroll physics almost always gets deceleration wrong against the user's calibrated expectation.
- Web: register touch and wheel listeners as `{ passive: true }`, so the browser never waits on JavaScript before scrolling. Use CSS scroll-snap for paging, not JavaScript snapping.
- React Native: one `useAnimatedScrollHandler` per screen writes one shared value (see react-native-craft.md). No `setState` per scroll event.
- Scroll-linked effects never delay the scroll itself. If an effect cannot keep up at the display's refresh rate, it gets cut. The scroll does not slow down to wait for it.

### Swipe and fling (dismiss, pager, card deck)

- Decide on release using both distance and velocity: a fast short flick counts as intent. React Native patterns in this pack use about 120 px or 800 px/s as the trigger.
- Hand the release velocity to the spring or decay (K8). The motion continues the finger's motion instead of starting over from rest.
- Detect a pause or a change of direction from acceleration, not from a timer (WWDC 2018). A timer adds its full duration to the latency.

### Snap (detents, carousels, pickers)

- Pick the snap target by projecting momentum, not by the nearest point to where the finger lifted. Apple's WWDC 2018 projection: `(velocity / 1000) * rate / (1 - rate)`, with `rate` set to the scroll deceleration rate (0.998 normal, 0.99 fast). Then spring to the nearest detent from the *projected* point.
- The spring toward the detent inherits the release velocity. Bounce 0 to 0.15 for chrome. A little more is allowed when the throw was hard, since momentum earns overshoot.
- One selection haptic per detent crossed. Never a continuous buzz.

## Springs versus duration curves, for feel

spring-physics.md owns the tuning model (duration plus bounce). The feel rules:

- **Anything the finger can interrupt is a spring.** Springs retarget from the current position and velocity. A duration curve restarts from zero, which reads as the interface ignoring the hand. WWDC 2018 frames interruptibility as the core of a fluid interface, not a feature of it.
- **Start at critical damping (bounce 0).** Apple's guidance in the same session is to begin at 100 percent damping and add bounce only where the gesture carried momentum.
- **Springs front-load motion.** They reach most of their travel early and spend the rest settling. This is Swink's "rapid initial attack, long tail" shape (ch. 7), which is why a spring can take 400 ms to settle and still feel immediate.
- **Duration curves stay right for motion nobody steers.** Enters, exits, and transitions with fixed endpoints (K1). Do not pay for a spring on something no one can interrupt.
- On web, a CSS `linear()` spring is a recording. It feels right once and wrong on interruption, so it never drives a gesture.

## Haptics

Haptics are the tactile channel in Swink's model, and the one that changed most since 2008. The rules:

1. **Semantic APIs only.** iOS: `UIImpactFeedbackGenerator`, `UISelectionFeedbackGenerator`, `UINotificationFeedbackGenerator` (or SwiftUI `.sensoryFeedback`). Android: `View.performHapticFeedback(HapticFeedbackConstants.X)`, which needs no VIBRATE permission. Expo: `selectionAsync()`, `impactAsync(style)`, `notificationAsync(type)`, and `performAndroidHapticsAsync(AndroidHaptics.X)` for the Android constants. Never `Vibrator.vibrate(ms)` or `VibrationEffect.createOneShot` for UI feedback. Android's own guidance calls those buzzy and legacy.
2. **Match strength to frequency.** Very frequent events (detent ticks, text handle moves) get the subtlest effect: selection or `SEGMENT_TICK`. Moderate events (toggles) get medium: `TOGGLE_ON` / `TOGGLE_OFF` or light impact. Rare, important events (submit, success, failure) get notification types or `CONFIRM` / `REJECT`. This is K3 applied to touch.
3. **Fire in sync with the visual event**, at the frame the element lands, snaps, or crosses. Not on release and not after the animation. A haptic out of sync reads as broken.
4. **Prepare before the moment on iOS.** Call `prepare()` when the gesture begins. The engine stays ready for a few seconds. Calling `prepare()` right before triggering buys nothing.
5. **One per event, never per frame.** From a Reanimated worklet, cross to JS once at the crossing (`runOnJS`, or the worklets `scheduleOnRN` equivalent), and guard with a last-detent shared value so it cannot fire twice.
6. **Haptics confirm, they never carry information alone.** The Taptic Engine goes silent in Low Power Mode, while the camera or dictation is active, and when the user turns it off (Expo docs). Every haptic has a visual twin.
7. **Web: assume none.** `navigator.vibrate` is not supported in iOS Safari, and on Android it is a one-shot buzz of exactly the kind the platform tells you not to use for UI. Design web feel without haptics.
8. Haptics stay on under reduced motion (K6). They are not motion.

## Frame budgets and refresh rate

| Display | Frame | Main-thread JS per frame during interaction |
|---|---|---|
| 60 Hz | 16.7 ms | about 10 ms (RAIL, which assumes about 6 ms of browser overhead) |
| 90 Hz | 11.1 ms | about 5 ms (derived) |
| 120 Hz | 8.3 ms | about 2 to 3 ms (derived). In practice: none. Move the work off the main thread |

- RAIL (web.dev) was written for 60 Hz. Its 10 ms frame budget does not survive 120 Hz. Treat the derived rows as order-of-magnitude guides, not measured limits.
- **iOS native and React Native:** 120 Hz animation requires `CADisableMinimumFrameDurationOnPhone = true` in Info.plist. It is on by default in the React Native template from 0.82 onward. Check older projects and Expo config plugins explicitly.
- **Web on iPhone:** Safari has defaulted to about 60 fps page rendering, with 120 Hz behind a user-facing feature flag. Build to 120 Hz budgets anyway, since Chrome on Android and desktop ProMotion render at the full rate, and verify at 60 Hz on iPhone.
- Judge React Native feel in a release build only. Debug builds run Reanimated and React Native without compiler optimizations (Reanimated docs).
- Web INP: break long handlers with `scheduler.yield()` or by deferring non-visual work until after the next paint. Use the Long Animation Frames API to find what blocked the frame.

## K9 checks (input feel)

K9 applies to anything a person presses, drags, scrolls, swipes, or snaps. Every check is binary. Cite by letter.

- **K9a. Press shows on touch-down.** The pressed state renders on `pointerdown` / `:active` / `onPressIn`, and never waits on `click` / `onPress`.
- **K9b. Press-in visible on frame 1, commit on release.** The first frame after touch-down shows a change. The action fires on release and cancels on slide-off past the retention area.
- **K9c. Drag tracks 1:1 with no easing.** No transition, `withTiming`, or smoothing on position while the pointer is down. Film at 240 fps: content stays on the finger within 1 frame (8.3 ms at 120 Hz, 16.7 ms at 60 Hz).
- **K9d. Continuous input off the main thread.** Drag and scroll-linked motion runs in a UI-thread worklet (React Native) or as compositor-only transforms (web). There is zero `setState` / re-render per move event.
- **K9e. Scroll is never blocked.** Web touch and wheel listeners are passive, and the drag surface declares its `touch-action`. React Native has one scroll handler per screen, and the platform owns deceleration.
- **K9f. Release carries velocity.** Every fling, dismiss, and snap hands release velocity to a spring or decay. Snap targets come from projected momentum, not the lift-off point.
- **K9g. Gesture intent resolves by movement, not time.** Hysteresis of about 10 pt on iOS or 8 dp on Android before a pan claims the touch. Recognizers run in parallel. There is no double-tap on a surface whose primary action is a single tap.
- **K9h. Boundaries rubber-band.** Past an edge, resistance grows with distance. No hard stop, and no 1:1 tracking into empty space.
- **K9i. Haptics are semantic, synced, and single.** They use platform semantic APIs (never raw vibrate), fire on the frame of the visual event, fire once per event, are prepared ahead on iOS, and each one has a visual twin.
- **K9j. Budgets hold at the display's real rate.** Checked on a 120 Hz device in a release build, with `CADisableMinimumFrameDurationOnPhone` set for native. No dropped frames during interaction at 4x CPU throttle (web) or on a mid-range Android device (React Native).
- **K9k. Web field latency passes.** INP at or under 200 ms at p75 in field data. The pressed state appears within 40 ms in lab traces on a mid-range phone.
- **K9l. Polish removal test.** Strip the sound, the haptic, and the decorative motion. The control still answers within the thresholds above. If it only felt right because of the polish, the response is wrong.

Report as "K9: a-l pass", or name the failing letters.

## Sources

Book (chapter cited inline):
- Steve Swink, *Game Feel: A Game Designer's Guide to Virtual Sensation* (Morgan Kaufmann, 2008). Ch. 1 definition, ch. 2 perception thresholds, chs. 6 and 7 input and response metrics (sensitivity, ADSR, filtering), ch. 9 polish, ch. 17 principles, ch. 19 future of input.

Latency perception:
- Jota, Ng, Dietz, Wigdor, "How fast is fast enough? A study of the effects of latency in direct-touch pointing tasks," CHI 2013. https://www.tactuallabs.com/papers/howFastIsFastEnoughCHI13.pdf
- Ng, Lepinski, Wigdor, Sanders, Dietz, "Designing for Low-Latency Direct-Touch Input," UIST 2012 (Microsoft Applied Sciences 1 ms prototype). https://dl.acm.org/doi/10.1145/2380116.2380174
- Deber, Jota, Forlines, Wigdor, "How Much Faster is Fast Enough? User Perception of Latency & Latency Improvements in Direct and Indirect Touch," CHI 2015. https://www.tactuallabs.com/papers/howMuchFasterIsFastEnoughCHI15.pdf
- Nielsen, "Response Times: The 3 Important Limits." https://www.nngroup.com/articles/response-times-3-important-limits/

Web:
- Interaction to Next Paint. https://web.dev/articles/inp
- INP becomes a Core Web Vital (March 12, 2024). https://web.dev/blog/inp-cwv-launch
- RAIL performance model. https://web.dev/articles/rail
- Optimize INP. https://web.dev/articles/optimize-inp
- Long Animation Frames API. https://developer.chrome.com/docs/web-platform/long-animation-frames
- `getCoalescedEvents()`. https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/getCoalescedEvents
- `getPredictedEvents()`. https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/getPredictedEvents
- 300 ms tap delay removal. https://developer.chrome.com/blog/300ms-tap-delay-gone-away

Apple:
- WWDC 2018, "Designing Fluid Interfaces" (session 803). https://developer.apple.com/videos/play/wwdc2018/803/
- WWDC 2023, "Animate with springs." https://developer.apple.com/videos/play/wwdc2023/10158/
- `UIFeedbackGenerator` and `prepare()`. https://developer.apple.com/documentation/uikit/uifeedbackgenerator
- `CADisableMinimumFrameDurationOnPhone`. https://developer.apple.com/documentation/bundleresources/information-property-list/cadisableminimumframedurationonphone
- Human Interface Guidelines, Playing haptics. https://developer.apple.com/design/human-interface-guidelines/playing-haptics

Android and React Native:
- Haptics design principles. https://developer.android.com/develop/ui/views/haptics/haptics-principles
- Add haptic feedback to events. https://developer.android.com/develop/ui/views/haptics/haptic-feedback
- `ViewConfiguration` (touch slop). https://developer.android.com/reference/android/view/ViewConfiguration
- expo-haptics. https://docs.expo.dev/versions/latest/sdk/haptics/
- React Native `Pressable`. https://reactnative.dev/docs/pressable
- Reanimated performance guide (120 fps, release builds). https://docs.swmansion.com/react-native-reanimated/docs/guides/performance/
