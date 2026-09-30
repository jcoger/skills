---
name: mobile-architecture
description: >-
  Plan or audit the STRUCTURE of a premium mobile app: folder layout,
  navigation graph, state/data strategy, and module boundaries. Use this
  WHENEVER you are about to scaffold, structure, refactor, or review a React
  Native + Expo (Expo Router) app, an iOS/Android app, or "a mobile app." Use
  it when someone says "build me a mobile app," "set up the app structure,"
  "where should this live," "scaffold the screens," "how should I organize this
  Expo project," "review my app architecture," "this codebase is a mess,"
  "untangle the navigation," "server state vs UI state," "why is this list
  janky," or pairs this with a plan → build workflow (for example the
  compound-engineering plugin's ce-plan / ce-work). Produces the APP
  ARCHITECTURE SPEC. Do NOT skip this and emit generic structure. Structure is
  the product.
---

# Mobile Architecture

You are the STRUCTURE layer for premium mobile apps. You decide how a React
Native + Expo (Expo Router) app is organized so a 30+ screen product stays
coherent, fast, and platform-honest, not lowest-common-denominator.

## Where this fits

This skill works standalone. It pairs with any plan → build → review workflow
(for example the compound-engineering plugin's `ce-plan` / `ce-work` /
`ce-code-review`), but none is required.

- **The planning step plans the work; this skill supplies the mobile
  architecture it plans against.** When a planning step runs, inject the APP
  ARCHITECTURE SPEC so the plan is built on real structure, not generic
  boilerplate.
- **The build step executes against this spec.** It reads the SPEC's folder
  layout, navigation graph, and module boundaries as ground truth.
- **mobile-design** consumes the same SPEC for screen-level visual decisions.

If no SPEC exists yet, produce one (ARCHITECT mode) before the build step writes code.

## Build target (locked)

React Native + Expo, **Expo Router** (file-based routing), New Architecture on
(Expo SDK 55+ / RN 0.83+ defaults). TypeScript. This is what you emit.

**Native-feel lens.** Architect with real iOS vs Android divergence in mind
(nav/back behavior, sheets, safe areas) and never flatten them. Treat SwiftUI /
native patterns as a reference lens that informs good structure; RN/Expo is the
output. When a structural choice has a platform consequence, name it.

## Modes

### ARCHITECT
Input: a product or feature description. Output: a complete **APP ARCHITECTURE
SPEC** (template below). Decide the folder structure, navigation graph,
state/data strategy, and module boundaries. Make calls; don't survey options.
Then run gates A1–A6 against your own spec before handing off.

### AUDIT
Input: an existing codebase. Read the real structure: routes, folders, where
logic lives, what the stores hold, how lists are built. Score A1–A6 with
evidence (file paths + line refs). Output gate-scored findings: each failed
gate gets the violating location, why it fails, and the fix. Drift, coupling,
and mislayering are the targets.

## Gates A1–A6 (binary, evidence-required)

Each gate is PASS or FAIL. A FAIL must cite a concrete location or a concrete
absence. No "feels clean."

- **A1: Routing matches structure.** The Expo Router tree (`app/`) reflects the
  real navigation graph: tabs, stacks, and modals are modeled as such, not faked
  with conditional rendering or a single mega-screen. Evidence: route files map
  1:1 to the navigation graph in the SPEC.
- **A2: Server state and client/UI state are separated.** Server data lives in
  a query/cache layer (TanStack Query); UI state lives in a light store
  (Zustand) or local component state. Server data is NEVER copied into a global
  store as the source of truth. Evidence: no store holds fetched-and-owned
  server entities.
- **A3: Business logic is out of components.** Data fetching, mutations,
  mapping, and domain rules live in `features/<x>/api` + hooks, not inline in
  screen JSX. Evidence: screens compose hooks; they don't define queries or
  business rules inline.
- **A4: Module boundaries hold.** Features don't reach into each other's
  internals; cross-feature sharing goes through `shared/` (or a feature's public
  index), and dependency direction is one-way (features → shared, never
  shared → features). Evidence: no `import ../otherFeature/internal` paths.
- **A5: Platform divergence is explicit where it matters.** Back behavior,
  sheets/modals, and safe areas are handled deliberately (header back + iOS
  edge-swipe vs Android system back; native sheet presentation; safe-area
  insets), not assumed identical. Evidence: SPEC names the per-platform calls;
  code uses `.ios/.android` splits or runtime checks where required.
- **A6: Hot lists are virtualization-safe.** Long/unbounded lists use FlashList
  (or FlatList) with stable `keyExtractor`, memoized row components, and stable
  callbacks. No inline allocations or `.map()` over unbounded data in render.
  Evidence: each long list cites its component + that row is memoized.

A spec or codebase ships only when all six PASS (or each FAIL is consciously
waived in writing).

## APP ARCHITECTURE SPEC (template)

Copy this and fill it. This is the named artifact downstream skills consume.

```md
# APP ARCHITECTURE SPEC: <app name>

## 1. Product shape
- One-line: <what the app does>
- Primary surfaces: <e.g. tabs: Home / Search / Profile>
- Auth model: <none | gated | mixed (public + gated)>

## 2. Navigation graph
- Root: <(tabs) | (stack) | (auth) + (app) split>
- Tabs: <tab → root screen each>
- Stacks per tab: <screen → screen pushes>
- Modals / sheets: <which screens are modal/sheet, presentation style>
- Deep links: <path → screen mapping, dynamic params>
- Platform notes: <iOS edge-swipe-back / Android system-back / sheet behavior>

## 3. Folder structure
- app/ tree: <route files, groups, _layout.tsx files>
- features/ : <feature folders + what each owns (ui / api / hooks / model)>
- shared/ : <ui primitives, lib, hooks, types reused across features>
- config/ env: <where keys/env/theme/constants live>

## 4. State & data strategy
- Server state: <TanStack Query: query keys, where hooks live>
- Client/UI state: <Zustand stores: what each holds, what it must NOT hold>
- Form state: <library/approach>
- Persistence: <secure store / async storage: what + why>

## 5. Module boundaries
- Dependency direction: <features → shared, one-way>
- Public surface per feature: <index exports>
- Forbidden imports: <cross-feature internals>

## 6. Performance posture
- Virtualized lists: <which screens, FlashList vs FlatList, est. row count>
- Heavy screens: <images, animations: handling>

## 7. Gate results
- A1 … A6: PASS/FAIL + evidence
```

## References (route to these)

| Need | Read |
|---|---|
| Folder layout, where logic lives, config/env, 30+ screen coherence | `references/project-structure.md` |
| Tabs/stacks/modals, deep links, typed routes, iOS vs Android nav | `references/navigation.md` |
| Server vs UI state, caching, forms, avoiding global-state sprawl | `references/state-and-data.md` |
| List virtualization, re-render hygiene, images, startup/bundle | `references/performance.md` |
| The dev loop: native-rebuild vs JS reload, the iOS locale crash, static-analysis triage, E2E (Maestro) | `references/dev-loop.md` |

Pull the reference for the layer you're deciding. Don't reason about
state from memory when `state-and-data.md` has the opinionated default.
