# State & Data

The single biggest source of mobile-app rot is one mistake: **treating fetched
server data as global client state.** Everything below exists to prevent it
(gate A2).

## The core split

There are two fundamentally different kinds of state. They live in different
places and must not be conflated.

| Kind | Examples | Owner | Tool |
|---|---|---|---|
| **Server state** | user, posts, bookings, anything from the API | the server | **TanStack Query** (cache) |
| **Client / UI state** | tab selection, theme, modal-open, draft input, filters | the app | **Zustand** / local state |

**Server state is asynchronous, owned remotely, and shared.** It can go stale,
needs caching/refetch/retry, and is the *server's* truth; your app holds a
cached copy. **Client state is synchronous and yours**: it has no canonical
remote version.

### The rule (gate A2)
**Never copy server data into a global store as the source of truth.** No
`useUserStore` holding the fetched user object; no Zustand slice mirroring a
list you got from the API. Server data lives in the Query cache; components read
it via query hooks. Duplicating it into a store creates two sources of truth
that drift: the bug AUDIT looks for first.

## Server state: TanStack Query

- One `QueryClient` in `shared/lib`, provided at the root layout.
- Query/mutation hooks live in `features/<x>/api` (gate A3: out of components).
- **Query keys** are structured and centralized per feature so cache
  invalidation is precise:

```ts
// features/feed/api/keys.ts
export const feedKeys = {
  all: ["feed"] as const,
  list: (filter: string) => [...feedKeys.all, "list", filter] as const,
  detail: (id: string) => [...feedKeys.all, "detail", id] as const,
};
```

- Reads are `useQuery`; writes are `useMutation` with `onSuccess` →
  `invalidateQueries(feedKeys.list(...))`. The cache, not a manual store update,
  is what propagates the change.
- Caching, retry, background refetch, stale time, and offline behavior are
  Query's job. Configure them on the client/hook, don't reimplement.
- Pagination: `useInfiniteQuery`, feeding the FlashList (see performance.md).

A screen calls `const { data, isPending } = useFeed(filter)` and renders. It
does not own, store, or sync that data anywhere else.

## Client / UI state: keep it small

Use **Zustand** for genuinely global UI state, and prefer local `useState` for
anything one screen owns.

What belongs in a store: theme/appearance, auth *status* (not the user object;
that's a query), a global filter, a cross-screen wizard step, transient UI like
a global toast. That's usually it.

```ts
// shared/lib/ui-store.ts
import { create } from "zustand";
interface UIState {
  theme: "light" | "dark" | "system";
  setTheme: (t: UIState["theme"]) => void;
}
export const useUIStore = create<UIState>((set) => ({
  theme: "system",
  setTheme: (theme) => set({ theme }),
}));
```

**Avoid global-state sprawl:** if a piece of state is only read by one screen and
its children, it's local state, not a store. A store with 15 slices is a smell:
most of them are probably either server data (move to Query) or local state
(move to the component).

**Auth pattern:** store auth *status* + token handle in a store (and the token
itself in secure storage); fetch the user *profile* with a query. Status gates
navigation (the `(auth)` vs `(app)` group split); the profile is server data.

## Avoiding prop-drilling

Don't thread data through five component layers, and don't reach for a global
store to escape drilling. Order of preference:

1. **Co-locate**: keep state where it's used; lift only as far as the common
   ancestor.
2. **Composition**: pass JSX as children/slots instead of passing data down to
   be rendered deep.
3. **A query hook at the leaf**: server data doesn't need drilling at all; the
   deep component can call the same `useQuery` and read from cache (no refetch).
4. **Context** for a stable, rarely-changing value (theme, current org), not
   for fast-changing data (re-renders the whole tree).
5. **Zustand** only for truly global, cross-tree UI state.

## Forms

Use a dedicated form library (**react-hook-form**, with a schema validator like
**Zod**), not ad-hoc `useState` per field, and never a global store for draft
input. Form state is local and ephemeral; it lives in the form, validates with
the schema, and on submit calls a `useMutation`. Keep the Zod schema in
`features/<x>/model` so validation and types share one source.

## Persistence

- **Secure** (tokens, secrets): `expo-secure-store`.
- **Non-sensitive** (theme pref, onboarding-seen flag, small caches):
  `@react-native-async-storage/async-storage` or MMKV for hot paths.
- Persist *UI preferences and the query cache* (Query's persister) if you want
  offline/instant-restore, not a hand-rolled mirror of server entities.

## Write-seam correctness (three shipped bugs, one section)

Bugs that live exactly at the boundary between client state and the server: invisible in the
form, fatal at the write.

**Multi-step saves need idempotency.** A save that performs dependent writes (create parent →
create children) can fail *after* the first write commits; the user sees "Save failed," retries,
and duplicates the parent. Pattern: a synchronous in-flight ref (block double-submit), plus a
`createdParentRef` that survives the failure so a retry *resumes* instead of re-creating, or
client-generated ids so the insert is idempotent. Any flow with two or more dependent writes
gets one of these on day 1.

**Anchor partial dates at the write boundary.** A "year optional" date field emits the ISO
recurring form `--MM-DD`; a Postgres `date` column rejects it (error 22007). Display code that
handles both forms hides the mismatch until the write. Convert to a concrete date (e.g. next
occurrence) in the mutation hook (the one seam every writer shares), not in each form.

**"We fixed this already": check the sibling surface first.** When a fixed bug reappears, the
usual cause is not a lost branch: the fix shipped on one surface (onboarding) and the sibling
surface (an edit flow using a copy of the same UI) was never switched. Extract the shared
component at fix time, or the second surface *will* regress. Grep for the copy before hunting
git history.

## AUDIT checks

- A store slice holding fetched server entities as truth → **A2 fail**.
- A multi-step mutation with no in-flight guard or resume/idempotency path → write-seam risk.
- A date/partial-value form writing raw form encoding to the server → anchor at the mutation.
- Query/mutation defined inside a `.tsx` screen → A3 fail.
- `useState` per form field with manual validation → move to react-hook-form +
  Zod.
- Context carrying fast-changing data → re-render risk; reconsider.
- A 10+ slice global store → likely server-data or local-state leakage.
