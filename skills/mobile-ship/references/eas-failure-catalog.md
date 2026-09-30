# EAS / Cloud-Build Failure Catalog

Every entry below happened on a real first production build, seven of them sequentially on one
app. Match the error text first; most "mysterious" cloud-build failures are here. All of the
JS-bundle-stage failures are catchable locally in ~2 minutes with
`npx expo export --platform ios` (that command runs the exact Metro+Hermes production bundle the
cloud runs), which is why `mobile-ship` BUNDLE mode exists.

| # | Symptom (error text / behavior) | Cause | Fix |
|---|---|---|---|
| 1 | Cloud install runs `npm ci`, chokes on `workspace:*` protocol | A stray tracked `package-lock.json` (or wrong lockfile) makes the builder pick the wrong package manager | Track exactly one lockfile; gitignore the others by name; set the `packageManager` field so the builder can't guess |
| 2 | Install crashes early, often around `node:sqlite` or an engine error | Cloud image's default Node is older than the package manager requires | Pin `"node"` in **every** `eas.json` profile, not just production |
| 3 | Install fails inside a dependency's preinstall (license check, codegen) | A dep with a preinstall/postinstall that needs an env var or was never actually imported | If unused: remove the dep. If used: provide the env var as an EAS secret, and (pnpm) list it in `onlyBuiltDependencies` |
| 4 | `metro.config.js` throws on `require.resolve(...)` in the cloud | A `link:`/absolute-path dependency that only resolves on one machine | Remove it or replace with a real published/tarball dep; purge its watchFolders/extraNodeModules references |
| 5 | Production bundle fails: `Cannot find module 'babel-preset-expo'` (or similar) | Config files reference transitive deps that strict/isolated node_modules doesn't hoist | Add anything named in `babel.config.js`/`metro.config.js` as a **direct** dependency at the SDK-pinned version |
| 6 | Hermes bundle step: `error: Invalid expression encountered` | A dependency's ESM build uses dynamic `import()`, which Hermes cannot compile; Metro picked the ESM build via package `exports`. Dev never compiles with Hermes, so dev is blind to it | Scoped `resolveRequest` in `metro.config.js`: resolve that one package with `unstable_enablePackageExports: false` so Metro takes its CJS build. Verify with `npx expo export` |
| 7 | Build succeeds; app **crashes instantly on launch** in TestFlight | `EXPO_PUBLIC_*` inlined as `undefined`: cloud builds don't read local `.env` (only `expo start` does) | Bind each profile to an EAS environment in `eas.json`; `eas env:push <env> --path .env` (default path is `.env.local`, so the `--path` matters). Then check R2 every release |
| 8 | Build succeeds; release crashes on a third-party SDK's `configure()` while dev works | Some SDKs ship deliberate `#if !DEBUG` guards (e.g. payment SDKs crashing on a `test_` store key in release) | R3: no test keys in production env. TRIAGE rule: dev-works-release-crashes on an SDK init call → read that SDK's release guards before any deeper theory |
| 9 | `ERR_PNPM_IGNORED_BUILDS` in cloud install | pnpm blocked a required postinstall | Add the package to `onlyBuiltDependencies` (day-one job: `mobile-scaffold` S1) |
| 10 | Local `expo run:ios` doesn't show a config change (missing Info.plist key → instant crash on a permission use) | `ios/` is a generated prebuild artifact; local builds reuse the stale one. Cloud builds prebuild fresh from `app.config.ts`, so local and cloud silently diverge | After any config-plugin/Info.plist change: `npx expo prebuild` before a local build. Never edit under `ios/` directly |
| 11 | `pod install` dies with `Unicode Normalization not appropriate for ASCII-8BIT` | Non-UTF-8 shell locale in a non-interactive shell (agents hit this constantly) | Prefix `LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8` (see `mobile-architecture/references/dev-loop.md` §2) |

## The one-command preventive

```bash
npx expo export --platform ios
```

Catches #4, #5, #6 (the JS-bundle class) locally before a cloud minute is spent. Wire it into the
loop via `scripts/preflight.mjs`, which also statically checks #1, #2, #3, #7's env binding, and
scans for #8's test keys.

## Cost framing

Each cloud build is 15+ minutes and (on paid tiers) money. The catalog above represents roughly a
full day of sequential cloud-build debugging on a real app. The preflight script reduces the same
set to one local run.
