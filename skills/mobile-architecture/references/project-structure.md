# Project Structure

How to organize an Expo Router app so it stays coherent past 30 screens. The
enemy is a flat `screens/` pile with a `utils.ts` god-file and fetch calls
inline in JSX. The fix is **routes thin, features fat, shared small.**

## The two trees: `app/` and `src/`

Expo Router owns `app/`. Every file there is a route. Keep `app/` files thin:
they import a screen component from a feature and wire up params/layout. All
real code lives in `src/`.

```
app/                      # routes ONLY: thin wrappers
  _layout.tsx             # root layout (providers, fonts, splash)
  (auth)/                 # route group: unauthenticated stack
    _layout.tsx
    sign-in.tsx
  (app)/                  # route group: authenticated app
    _layout.tsx           # the tab navigator lives here
    (home)/               # a tab = a nested stack (group folder)
      _layout.tsx
      index.tsx           # → renders <HomeScreen/> from features
      [id].tsx            # detail screen, dynamic param
    (search)/
    (profile)/
    settings.tsx          # presented as modal (configured in _layout)
src/
  features/               # the app's real surface area
    home/
      ui/                 # screen + components private to this feature
        HomeScreen.tsx
      api/                # queries + mutations (TanStack Query)
        useFeed.ts
      model/             # types, schemas, domain logic
        feed.ts
      index.ts           # PUBLIC surface: the only thing others import
    profile/
    search/
  shared/                 # reused across 2+ features
    ui/                   # design-system primitives (Button, Card, Sheet)
    lib/                  # api client, query client, storage, analytics
    hooks/                # useDebounce, useSafeAreaInsets wrappers
    types/
  config/
    env.ts                # typed env access (see below)
    theme.ts              # tokens; consumed by shared/ui
    constants.ts
```

## The rule that keeps it coherent

**Dependency direction is one-way: `features → shared → config`.**
- A feature may import from `shared/` and `config/`.
- A feature may NOT import another feature's internals. If two features need the
  same thing, it moves to `shared/`.
- `shared/` never imports from `features/`. If you're tempted, the thing isn't
  shared. It belongs in the feature.

This is gate **A4**. Enforce it: each feature exposes a single `index.ts`. Route
files and other features import only from `features/x` (the index), never
`features/x/ui/Internal`.

## Routes are thin (gate A1)

A route file should be ~5 lines: read params, render the feature screen.

```tsx
// app/(app)/(home)/[id].tsx
import { useLocalSearchParams } from "expo-router";
import { PostScreen } from "@/features/home";

export default function PostRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <PostScreen id={id} />;
}
```

If a route file contains data fetching, business rules, or layout logic, that's
an A1/A3 fail. Push it into the feature.

## Where business logic lives (gate A3)

| Concern | Home |
|---|---|
| Data fetching / mutations | `features/x/api/*` (TanStack Query hooks) |
| Domain rules, mapping, validation | `features/x/model/*` |
| Screen composition | `features/x/ui/XScreen.tsx` |
| Reusable visual primitives | `shared/ui/*` |
| API client, query client, storage | `shared/lib/*` |

Screens **compose hooks**; they do not define queries or rules inline. A screen
that calls `fetch()` or builds a query object in JSX is mislayered.

## Config and env

Never read `process.env` scattered through the app. Centralize and type it.

```ts
// src/config/env.ts
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};

export const env = {
  apiUrl: extra.apiUrl as string,
  posthogKey: extra.posthogKey as string | undefined,
} as const;

if (!env.apiUrl) throw new Error("Missing apiUrl in app config extra");
```

Populate `extra` from `app.config.ts` (use `.ts`, not `.json`, so you can read
`process.env` at build time and switch per EAS profile). Secrets that must not
ship in the bundle stay server-side or in EAS secrets, never in `extra`.

## Path aliases

Set `@/*` → `src/*` in `tsconfig.json` so imports read as
`@/features/home`, not `../../../features/home`. Keeps boundary violations
visible (a `../` crossing into another feature is an obvious smell).

## Naming conventions

- Route groups `(name)` for organization without a URL segment (tabs, auth/app
  split). Dynamic routes `[id].tsx`. Catch-all `[...rest].tsx`.
- Feature folders are nouns (`home`, `checkout`), lowercase.
- Components PascalCase, hooks `useX`, query hooks `useXQuery`/`useXMutation`.

## Smell checklist (for AUDIT)

- Flat `screens/` folder with no feature grouping → restructure.
- `utils.ts` / `helpers.ts` over 200 lines → split by domain into features.
- Any `import` reaching `features/a/ui/...` from `features/b` → A4 fail.
- `fetch`/axios call or query object inside a `.tsx` screen → A3 fail.
- `process.env.X` read outside `config/` → centralize.
