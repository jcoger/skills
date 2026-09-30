# Screen Recipes

Starting spines for the screens almost every app needs, distilled from how premium apps actually build them (read at the pixel level on Mobbin, not theory). A recipe is the floor, not the answer: SCREEN adapts it to the real content. Each lists the spine, the premium moves, and real reference apps to study.

The seven signals from SKILL.md apply to every recipe: one focal element, bottom-anchored action, generous whitespace, one emphasized active state, floating controls over media, color restraint, every state designed.

---

## 1. Onboarding / welcome

**Spine:** heavy top whitespace → one display headline (the focal element) → optional social proof → **full-width pill CTA pinned to the bottom safe area**. ~24px side margins.

**Premium moves:**
- One headline owns the screen. **Serif/editorial = calm**; **bold sans = energetic**. Pick to match the brand feeling.
- Dark variants: gradient canvas + a single centered brand glyph, white pill CTA. Reads premium instantly.
- Social proof sits just above the CTA when used: a rating card or a 3-stat row (e.g. "350M · 4.8 · 14M"), never both.
- Multi-step onboarding: a thin progress indicator, one question per screen, the same pinned-CTA rhythm throughout. Personalization questions early earn investment.

**Refs:** Tolan (editorial serif), pliability (premium dark gradient), Vocabulary (illustration + stat row), Deepstash (rating card + dark pill), FotMob (bold sans + brand pill).

## 2. Auth (sign in / sign up)

**Spine:** back/close affordance → short title → minimal fields (email, or name pair) → primary pill → provider buttons (Apple/Google) → fine-print legal.

**Premium moves:** ask for the least possible (defer profile to after value); Sign in with Apple is table stakes on iOS; one field group, generous spacing, the submit pill anchored low; inline validation on blur, not per keystroke. Keep it boring and fast: auth is friction, not a moment.

## 3. Feed + navigation (the app's home)

**Spine:** large bold screen title ("Home" / "For You") → segmented tabs or filter chips for sub-feeds → content as rounded image-led **cards** or thumbnail+headline+meta **rows** → **bottom tab bar, 4–5 destinations, one active in brand color** → brand-colored **FAB** for the single create action.

**Premium moves:**
- The iOS-native "large title + segmented control" is the premium feed idiom. Use it.
- Cards: rounded, image-led, consistent aspect; rows: thumbnail + bold headline + muted meta (author chip, counts). Don't mix card and row styles in one feed.
- Exactly one active tab, in brand color; the FAB is the *one* create action, offset bottom-right (or center).
- Generous row spacing; let content breathe. A dense feed is the agent default. Resist it.

**Refs:** Apple Store (large title + premium cards + custom tab bar), Medium (rows + segmented tabs + FAB), The Guardian (editorial masthead + full-bleed cards), Pinterest (masonry + tab bar).

## 4. Content detail

**Spine:** full-bleed **hero** (image/photo) with **floating circular controls** (back, save, share) over it → title + key metadata (price, rating, reviews) → body → **persistent sticky bottom action bar** that survives scroll.

**Premium moves:**
- Controls float as circular glass/scrim buttons *on* the hero. They don't stack into a toolbar.
- The sticky bottom bar is the conversion anchor: often price-left + CTA-right, or a single full-width pill. It stays put as the body scrolls.
- Metadata earns its line: rating + review-count as a tappable link, price prominent. Safe-area aware bottom bar.

**Refs:** Viator (hero + floating controls + price-left/CTA-right sticky bar), Me+ (hero + sticky "Add to my routine" pill), Taco Bell (product hero + sticky "View bag").

## 5. Settings

**Spine:** header title → grouped sections → rows with right-aligned muted value + chevron.

**Two valid idioms. Pick one and hold it:**
- **iOS grouped-inset:** caps gray section headers, rows inside rounded cards on a grouped background. Classic, safe.
- **Modern plain-list:** bold section titles, leading icons per row, hairline dividers. More editorial.

**Premium moves:** secondary value right-aligned and **muted** + chevron; toggles in brand/green; destructive actions (delete account, sign out) in `ui.danger` and grouped at the bottom; a version line at the very bottom is a nice honest touch.

**Refs:** Tinder (inset cards), Base (modern plain-list, bold section titles), Binance (plain-list + subtitles + values).

## 6. Paywall

**Spine:** dark/gradient canvas → **value before price** (benefit list OR free-vs-pro comparison) → 2–3 plan options with **exactly one pre-selected and elevated** → savings badge on annual → one high-contrast primary CTA → demoted "Restore" + "Not now" → trial-reassurance + legal microcopy.

**Premium moves:**
- Lead with value, not the price grid. A benefit list with icons, or a Free-vs-Pro column comparison with the Pro column glowing.
- One plan is visibly selected (border/fill/badge), usually annual, with a "Save X%" badge. The user should never wonder which is recommended.
- Primary CTA is the single high-contrast action (often white-on-dark); "Restore" and "Not now" are low-emphasis. A trial-reassurance line + legal sit under the button.
- Device-in-device mockups or a subtle glow behind the CTA push it premium without clutter.

**Refs:** FocusFlight (device mockup + elevated annual + glow), Atoms (free-vs-pro + plan cards + savings), Fixtured (comparison + testimonial + selected annual), Sweatcoin (bottom-sheet purchase, yearly selected).

## 7. Empty / error states

**Empty spine:** centered brand-tinted illustration → headline (what's empty) → 1–2 line conversational subtext → one action (full-width pill, centered button, or a pointer to the FAB). Never a blank screen.
**Error spine:** human message + cause + **retry**, inline where possible.

**Refs:** Collect (illustration + pointer to FAB), Instagram (spot illustration + centered pill), Woolworths (brand-tinted + full-width CTA).

## 8. Form / input flow

**Spine:** clear title → grouped fields (label above, focus + inline-error states) → keyboard-aware layout → submit reachable above the keyboard.

**Premium moves:** the right keyboard per field; `KeyboardAvoidingView`; reserve the error slot so layout doesn't jump; validate on blur/submit; advance/submit on return; show success, not just error. See `component-states.md`.

---

## Using these recipes

In SCREEN: name the recipe, pull the spine, adapt to the actual content, mark the expression and motion slots. You may blend two recipes (a detail screen with a paywall-style sticky CTA), but keep the seven signals intact and don't let two focal elements compete. When the content contradicts the recipe (no social proof exists, no annual plan), cut the slot. Never invent content to fill it.
