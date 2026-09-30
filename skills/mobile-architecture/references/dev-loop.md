# The Dev Loop

Structure isn't only folders. It's the loop you build *inside*. These are the parts of the
RN + Expo dev loop that bite on a real product, written to be checkable the same way the gates
are. None of it is optional polish; each one is a recurring hour lost when you don't know it.

## 1. Rebuild only when the native layer changed

The most common wasted five minutes in RN is a full native rebuild for a change that didn't
need one.

- **JS / TS / styling change** (components, tokens, Tailwind/NativeWind config, business logic,
  `global.css`) → `expo start -c` and reload the installed dev client. No rebuild.
- **Native change** (a new native module, an `app.json` / config-plugin / entitlement edit, the
  `Podfile`, anything under `ios/` or `android/`) → `expo run:ios` / `run:android` to rebuild and
  reinstall the dev client.

Rule of thumb: rebuild natively only when the installed app is *stale* or won't connect to Metro.
**Monorepo note:** the native project lives under the app package (e.g. `apps/<app>/ios`), not the
repo root. Run `pod` and build commands from the app directory.

## 2. The iOS UTF-8 locale crash (CocoaPods)

`pod install` or `expo run:ios` from a non-interactive shell can die inside CocoaPods with:

```
Unicode Normalization not appropriate for ASCII-8BIT (Encoding::CompatibilityError)
```

Cause: CocoaPods calls `unicode_normalize` on the install-root *path* and the shell locale isn't
UTF-8, so the path arrives as ASCII-8BIT. It is **not** a path or monorepo problem and won't
reproduce in your normal interactive terminal. Fix: prefix the locale.

```bash
LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 pod install                       # in apps/<app>/ios
LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 npx expo run:ios --device <UDID>  # in apps/<app>
```

## 3. Static-analysis posture (lint the idioms, not against them)

A static RN auditor earns its keep, but RN idioms generate **false positives**. Triage them;
don't blindly contort code to silence them.

- **"Raw text not wrapped in `<Text>`"** fires on string children of a `<Button>` that already
  wraps them internally, and the tool can't see through the component. Disable the rule for that
  wrapper; don't nest a redundant `<Text>`.
- **"Use a virtualized list"** fires on short, bounded carousels. Converting a 5-item `ScrollView`
  to `FlatList` trades a handful of non-virtualization warnings for a pile of inline-`renderItem`
  ones and buys nothing (see `performance.md` §1: virtualize *unbounded* lists only). Leave short
  bounded lists as `ScrollView` + `.map()`.
- **Secret-file scanners** flag a gitignored `.env` they find on disk even though it was never
  committed. Verify with `git ls-files` before acting.

Disable confirmed false positives in the tool's config with a one-line reason, and fix the real
ones. A clean score earned by contorting idiomatic code is the worse codebase. Separately, run the
type checker from the app's own `node_modules` (`apps/<app>/node_modules/.bin/tsc --noEmit`) in a
monorepo. A bare `npx tsc` often resolves the wrong (or no) TypeScript.

## 4. End-to-end flows (Maestro)

Maestro drives the real app through the **accessibility tree**. Two things make RN + Expo E2E
harder than the docs imply.

**Launching an Expo dev client.** A dev client isn't a standalone build: a plain `launchApp` after
`clearState` lands on the Expo dev launcher (server picker), and a deep link pops the developer
menu. Build one reusable preamble flow that deep-links straight to Metro and dismisses the intro +
menu, and run it at the top of every flow:

```yaml
- launchApp                # or: { launchApp: { clearState: true } }
- openLink: <scheme>://expo-development-client/?url=http%3A%2F%2Flocalhost%3A8081
- tapOn: { text: "Continue", optional: true }   # intro modal
- tapOn: { id: "xmark", optional: true }          # dev menu
```

A preview/release build needs none of this. Drop the preamble and the launcher disappears.

**The accessibility tree is the contract, and it has holes:**
- Buttons match their **`accessibilityLabel`, not their visible text.** If the label differs from
  the on-screen copy, `tapOn: { text }` silently misses. Match the label.
- **Content rendered through a portal into a separate host does not appear in the iOS a11y tree
  Maestro reads**, most notably bottom sheets (`@gorhom/bottom-sheet`'s `Portal`). The sheet is
  visibly on screen, but `assertVisible` / `tapOn` by text *inside* it all fail. To automate sheet
  flows, expose `testID`/accessibility on the sheet content or render it in-tree; otherwise those
  flows are blocked (blind `point:` taps are fragile and still can't assert content). Native
  `Alert`s **are** readable, so confirm-dialog flows work.

**Flow-syntax gotchas that cost a morning:**
- `assertVisible` takes **no** timeout. Use `extendedWaitUntil: { visible: {...}, timeout: N }`
  (same for `notVisible`). `maxTimeout` is not a property.
- `tapOn` accepts `optional` but **not** `timeout`.
- Shorthand `- tapOn: "X"` can't carry sibling keys. Expand to `- tapOn: { text: "X", optional: true }`.
- `text:` is a **full-string regex**, not a substring. Multi-line titles need DOTALL:
  `text: "(?s)Who's the first.*"`.

**Stabilize the harness.** A dev-only red-box (`LogBox`) overlay **hijacks taps** and makes flows
fail intermittently. Silence known dev-backend `console.error`s under `__DEV__`
(`LogBox.ignoreLogs([...])`) so the overlay can't intercept. The errors still print to Metro.

## 5. The production bundle is part of the loop

Dev builds load JS from Metro and never compile the production (Hermes) bundle, so a whole
failure class (un-hoisted transitive deps referenced by `babel.config.js`, a dependency's ESM
build using dynamic `import()` that Hermes can't compile) is invisible until a 15+ minute cloud
build fails. The 2-minute local equivalent:

```bash
npx expo export --platform ios   # the exact Metro+Hermes bundle EAS runs
```

Run it after scaffold and before every cloud build. The full failure catalog, the release-smoke
sequence (build Release, **kill Metro**, `simctl launch` so the embedded bytecode actually runs;
`expo run:ios --configuration Release` alone still loads dev JS from Metro and gives a false
"works"), and a runnable preflight script live in the `mobile-ship` skill.
