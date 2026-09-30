# Signature Moments

The one motion beat a visitor remembers and describes to someone else. Budget: ONE per page (gate M5). A signature moment must embody the brand claim, not just impress. Each entry: what it is, when it is earned, personality fit, cost (S under 2h, M 2 to 6h, L over 6h), reduced-motion plan, and the caution.

---

## 1. Load sequence with counter
Percentage or digit-cycle preloader resolving into a choreographed hero reveal (rows converging from different directions).
- **Earned when:** the site genuinely loads heavy assets AND the brand is editorial/immersive. A loader on a light page is theater that costs real bounce rate.
- **Fit:** editorial, immersive. **Cost:** M.
- **Reduced motion:** skip counter, simple opacity sequence.
- **Caution:** never longer than actual load time plus 400ms.

## 2. Kinetic type hero
Oversized display type that moves: masked rises, scroll-linked scale or weight, per-word energy.
- **Earned when:** the brand voice IS the product (fintech consumer, culture brands) and the headline copy is strong enough to carry size.
- **Fit:** kinetic. **Cost:** M.
- **Reduced motion:** static type at final state, full size.
- **Caution:** type that moves must still be readable in under a second. Legibility loss = demote.

## 3. Rendered object scroll-scrub
A 3D object (product, device, abstract brand object) rotating or assembling as scroll progresses, usually an image-sequence scrub or WebGL.
- **Earned when:** the product is physical or the brand has a real 3D asset. Renting a generic blob is a 2019 tell.
- **Fit:** immersive, kinetic. **Cost:** L.
- **Reduced motion:** 2 or 3 static renders at key angles.
- **Caution:** image-sequence scrubs need aggressive compression and preloading; test on mid-range mobile before committing.

## 4. Sticky pin theater
A section pins while scroll advances a story: feature steps, before/after, a camera move.
- **Earned when:** there is an actual sequence to tell (3 to 5 beats). Pinning a single static layout is fake theater.
- **Fit:** immersive. **Cost:** L.
- **Reduced motion:** unpinned beats stacked vertically.
- **Caution:** 2 to 3x viewport of scroll distance max; show progress; one theater per page.

## 5. Draggable canvas or gallery
Visitor can drag/throw cards, images, or stickers; physics settle them.
- **Earned when:** playful brands where touch-feel is the differentiator; portfolio/culture sites.
- **Fit:** playful, immersive. **Cost:** M to L.
- **Reduced motion:** standard grid, drag still works without inertia.
- **Caution:** must coexist with page scroll on touch (drag axis discipline), and content must remain reachable without dragging.

## 6. Cursor-reactive layer
Magnetic buttons, pointer-tracking image tilt, a gallery whose items lean toward the cursor.
- **Earned when:** desktop-heavy audience, craft brands signaling attention to detail.
- **Fit:** playful, kinetic. **Cost:** M.
- **Reduced motion + touch:** none of it fires; the layout must be complete without it.
- **Caution:** the most copied move on award sites. Use one cursor behavior, not four.

## 7. Slide-off section transitions
Outgoing section visibly exits (slides up/over) as the next arrives, sections feel like cards in a deck.
- **Earned when:** kinetic brands with strong section color shifts.
- **Fit:** kinetic. **Cost:** M.
- **Reduced motion:** normal scroll, no pinned exits.
- **Caution:** breaks if section heights vary wildly; lock section sizing first (layout skill owns this).

## 8. Split-title convergence
Section titles split to opposite screen edges and slide inward on entry, anchored by a center mark.
- **Earned when:** editorial sites with strong name-pairs or project titles.
- **Fit:** editorial. **Cost:** S to M.
- **Reduced motion:** title static, centered.
- **Caution:** needs generous horizontal space; collapses below tablet width (define the mobile variant in the spec).

## 9. Ambient background system
A living background: slow gradient drift, grain, blurred orbs, subtle generative field. Not triggered, always breathing.
- **Earned when:** the page needs warmth without foreground motion (grounded sites especially).
- **Fit:** any personality, intensity tuned. **Cost:** S to M.
- **Reduced motion:** static frame of the background, REQUIRED pause control if it loops visibly.
- **Caution:** must survive the squint test, content contrast comes first.

## 10. Velocity-reactive elements
Elements skew, blur, or letter-space proportional to scroll speed; the page feels physical.
- **Earned when:** kinetic brands; works best on image rails and oversized type.
- **Fit:** kinetic. **Cost:** M.
- **Reduced motion:** off entirely.
- **Caution:** clamp the effect; unclamped velocity skew on a fast flick looks broken.

## 11. Page transition system
Wipes, crossfades, or persistent-element morphs between routes; the site feels like one continuous space.
- **Earned when:** multi-page editorial/immersive sites where browsing IS the experience.
- **Fit:** editorial, immersive. **Cost:** M to L.
- **Reduced motion:** instant route change with opacity crossfade.
- **Caution:** transitions must never delay navigation more than 600ms; back-button must feel native.

## 12. Number-roll proof band
Stats count up once on first view, with believable starting values.
- **Earned when:** the numbers are genuinely strong. Rolling to "14 customers" hurts.
- **Fit:** grounded (signature-grade there), accent elsewhere. **Cost:** S.
- **Reduced motion:** final values static.
- **Caution:** once per page, never re-trigger on re-scroll.

## 13. Shader hero
A full-bleed WebGL surface as the hero: flowing gradient field, pointer-reactive displacement over imagery, generative pattern.
- **Earned when:** the brand claim IS technical or visual mastery (studios, creative tools, dev platforms). On a trust-first B2B page it reads as showing off.
- **Fit:** immersive, kinetic. **Cost:** L.
- **Reduced motion:** static frame of the field.
- **Caution:** must pass the 4x CPU throttle test, ship a static fallback for WebGL failure, and respect battery (a hot phone is a memorable moment for the wrong reason).

## 14. Custom cursor object
The cursor becomes a designed object: a dot that morphs into labels ("View", "Drag", "Play"), scales over targets, blends with imagery.
- **Earned when:** desktop-heavy editorial or portfolio audiences where wayfinding doubles as brand expression.
- **Fit:** editorial, playful. **Cost:** M.
- **Touch + reduced motion:** never ships on touch. Reduced motion keeps the label states, drops the trailing lerp.
- **Caution:** never hide the native cursor without a complete replacement, keep the lerp tight (a laggy cursor reads as broken), and every cue the cursor gives must also exist on the element itself for keyboard and touch users.

## 15. Grid rearrange moment
A filterable grid (work, products, features) where items fluidly re-sort, scale, and reflow on filter change (FLIP technique).
- **Earned when:** the volume and diversity of items IS the proof: portfolio depth, catalog breadth.
- **Fit:** playful, kinetic, editorial. **Cost:** M.
- **Reduced motion:** instant re-sort with an opacity crossfade.
- **Caution:** transform-based FLIP only, never animate layout. Cap the stagger so a 20-item refilter settles in under 700ms.

## 16. Exploded product view
A product (device, package, interface stack) separates into labeled layers on scroll or toggle, then reassembles.
- **Earned when:** the product's construction or layering IS the differentiator: hardware, materials stories, layered architecture.
- **Fit:** immersive, grounded (restrained version). **Cost:** L.
- **Reduced motion:** static exploded diagram with labels.
- **Caution:** needs real 3D or genuinely layered assets. Faking it with stacked PNGs reads cheap at desktop sizes.

---

## Placement rules

1. The signature moment lives in the hero OR one mid-page beat, never both (two moments compete, both lose).
2. The two sections adjacent to the moment go quiet (base reveal only), contrast is what makes the moment land.
3. The moment must embody the claim: a speed claim earns kinetic type, a craft claim earns a clip-wipe system, a product claim earns the object scrub. If you cannot connect moment to claim in one sentence, pick a different moment.
