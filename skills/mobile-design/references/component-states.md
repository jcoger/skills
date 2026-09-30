# Component States

The line between a demo and a product is the states. An agent left alone builds the happy path and stops; premium apps design every state a component can reach. "Design the states" is a binding rule (D5), not a nicety.

## Every interactive component declares its states

For any button, row, input, card, or control, all reachable states are designed, never left to the framework default:

- **default** · **pressed** (the touch-down feedback) · **disabled** (visibly inert, reduced opacity + no shadow) · **loading** (in-place spinner or skeleton, not a blocking modal) · **selected/active** (the one emphasized state) · **error** (for inputs/forms).

A `pressed` state is mandatory on every tappable element. Instant feedback (opacity/scale dip) is what makes an app feel responsive. The framework's default ripple/highlight is rarely the right one; specify it.

## Screen-level states (the four that get skipped)

Every screen that can be empty, loading, errored, or offline needs each of those designed:

| State | What premium does |
|---|---|
| **Empty** | Never a blank screen. Centered brand-tinted illustration + headline (what's empty) + 1–2 line conversational subtext + one action (or a clear pointer to the FAB). |
| **Loading** | A **skeleton that mirrors the final layout** (same card count, heights, line count), perceived ~20–30% faster than a spinner. Generic gray boxes that don't match the layout are a tell. Reserve spinners for short, indeterminate waits. |
| **Error** | A human message (not a stack trace or "Something went wrong"), a cause if known, and a **retry**. Inline where possible, not a dead-end. |
| **Offline** | A non-blocking banner; keep cached content visible; queue writes where safe. |

## Perceived performance (a premium signal agents never add)

- **Skeletons over spinners** for content loads; match the real layout.
- **Optimistic UI** for low-risk writes (like, save, favorite, toggle): update state immediately, revert only on error. Never optimistic for payments, deletes, or anything destructive/irreversible.
- **Instant press feedback** on every tap; the UI should never feel like it's waiting to acknowledge a touch.

## Forms & inputs (mobile-specific craft)

- Label above the field; the field owns a clear focus state and an inline error slot beneath (reserve the space so layout doesn't jump).
- The right keyboard per field (email/number/phone), `KeyboardAvoidingView` so the focused field and its submit button stay visible, and a "return key" that advances or submits.
- The submit action stays reachable above the keyboard, not stranded behind it.
- Validate on blur or submit, not on every keystroke; show success as well as error.

## What `mobile-audit` checks here (D5)

A tappable element with no pressed state; a list with no skeleton/loading state; a screen that can be empty with no empty state; an error path that dead-ends with no retry; an input with no focus or error state; a destructive action treated optimistically.
