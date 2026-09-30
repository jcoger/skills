# Release-Build Verification (the SMOKE sequence)

## Why dev evidence is worthless for release

Three structural reasons, each one a real shipped failure:

1. **Dev never compiles the production bundle.** Metro serves JS; Hermes bytecode compilation
   happens only in the export/archive step. Bundle-stage failures are invisible in dev forever.
2. **`#if DEBUG` guards flip in release.** SDKs ship code paths that only exist in release builds,
   including deliberate crashes (a payment SDK configured with a test store key works in every dev
   build and crashes 100% of release builds, by design). Dev cannot show you this class.
3. **`expo run:ios --configuration Release` still lies.** It deep-links to Metro if Metro is up,
   loading dev JS over the embedded bundle: a false "works." This exact false signal disproved
   a correct theory on a real crash hunt and cost a build cycle.

## The honest sequence

```bash
# 1. Build the release configuration
npx expo run:ios --configuration Release

# 2. Kill Metro so the dev-client fallback is impossible
lsof -tiTCP:8081 -sTCP:LISTEN | xargs kill -9

# 3. Terminate and relaunch so the app boots from its EMBEDDED bytecode
xcrun simctl terminate booted <bundle-id>
xcrun simctl launch booted <bundle-id>

# 4. Watch: stable PID for ≥2 minutes, walk the core flow, then check crash logs
xcrun simctl spawn booted log show --last 5m --predicate 'eventMessage CONTAINS "<AppName>"' | grep -i crash
ls ~/Library/Logs/DiagnosticReports/ | grep <AppName>
```

Optional sanity check that you're really on production bytecode: the exported `main.jsbundle`
starts with Hermes magic bytes (`c61f bc03`), not JS source text.

## The simulator's blind spot

The iOS simulator is **arm64**; modern iPhones are **arm64e** (pointer authentication). A class of
native-module heap corruption crashes reproduces *only* on physical arm64e devices. The simulator
release-smoke passes forever while every TestFlight install crashes at launch. Hence gate R5:
boot the full native-module stack on a physical device in a release build at least once per
native-dependency change, and again before submission.

## Crash-log-first triage

When a release build crashes:

1. **Get the log**: TestFlight crash feeds (via your build service's tooling), or
   `~/Library/Logs/DiagnosticReports/`, or Console.app device logs. Do this before forming any
   theory. On a real hunt, two plausible theories (missing env vars; a native-lib version
   mismatch) each burned a full build cycle and were both disproven by data that the crash log
   had contained from the start.
2. **Read the crashing thread, not the loudest one.** Background worker threads (animation
   libraries spawn several) look suspicious and are usually idle bystanders.
3. **A Hermes/GC segfault during startup = a native module corrupting the heap.** The JS function
   on the stack is the first *victim* to touch the poisoned memory, not the cause. Don't debug
   the JS.
4. **Bisect by `init()`, not by import.** Gate each native SDK's configure/init call behind a
   flag and toggle one per build. On the real case, importing both suspect SDKs with init skipped
   launched clean. The trigger was one SDK's `configure()` call. That isolation converged in
   3 builds; theorizing had burned 9.
5. **Then check the SDK's release guards** (reason #2 above) before concluding "native bug."
   Read the actual pod/gradle source for `#if !DEBUG` around the crashing call.

## Per-release checklist (feeds gate R4/R5)

- [ ] Release build, Metro killed, launched from embedded bundle
- [ ] Stable ≥2 min, zero entries in crash logs
- [ ] Core flow walked (sign-in → the app's one central loop → background/foreground)
- [ ] Physical-device boot current for this native-dependency set
- [ ] Crash reporter received a test event **from this release build**
