# Section Library

40+ section types with layout variants and imagery direction. COMPOSE picks the section and variant; BUILD pulls the sizing and imagery lines. Variant choice is how pages avoid looking templated: never default to variant A every time, and never place two sections with the same shape adjacent.

Source DNA: awwwards element patterns (sticky scrolling cards, photo marquees, pointer-panning galleries, video heroes), siteinspire/godly editorial archetypes, land-book and saasframe/landingfolio conversion taxonomies, unsection hero taxonomy (image / large type / minimal / video / card), and DTC product-page practice (ingredient breakdowns, shoppable UGC).

Shape vocabulary: `split` (two asymmetric columns), `grid` (uniform cards), `bento` (mixed-size cells), `rail` (thin horizontal strip), `editorial` (oversized type, low density), `full-bleed` (edge to edge), `stack` (centered single column), `gallery` (image-led, scroll or grid), `sticky` (pinned element while content scrolls), `band` (short full-width statement strip).

IDs are stable references (recipes cite them); they are grouped by category, not strictly sequential. Every section lists: Job / Variants / Sizing / Imagery. Imagery treatments (duotone, grain, frame system, grade) are implemented per visual-craft.md.

## Index (jump by category)

- **Navigation:** 0 Nav/header
- **Openers:** 1 Hero · 2 Proof bar/logo rail · 3 Announcement bar
- **Product and features:** 4 Feature grid · 5 Feature split (zigzag) · 6 Bento · 7 Product showcase · 8 How it works · 9 Tabbed/interactive demo · 10 Integrations wall · 11 Use cases/personas · 28 Annotated hotspots · 29 Spec/ingredient breakdown · 30 Video · 31 Calculator/ROI
- **Narrative and editorial:** 12 Manifesto/editorial break · 13 Founder note · 14 Stats band · 15 Comparison (us vs them) · 16 Before/after · 32 Marquee type band · 33 Horizontal scroll gallery · 34 Sticky stack cards · 35 Split-screen chapters · 36 Image mosaic · 40 Team/humans
- **Proof:** 17 Testimonial spotlight · 18 Testimonial grid/wall · 19 Case study cards · 20 Press rail · 21 Community/UGC wall · 37 Awards/badges rail · 38 Lookbook/collection
- **Conversion:** 22 Pricing · 23 Offer clarity · 24 Objection grid · 25 FAQ · 39 Mid-page CTA band · 26 Final CTA · 27 Footer

---

## Navigation

### 0. Nav / header
Job: orient, not sell. The nav earns trust through restraint: too many links, too tall, or too decorative and it competes with the hero.

- **A. Minimal bar**: logo left, 4-6 text links center, one CTA button right. `h-16` to `h-18`, `px-6` mobile / `px-8` desktop. The default for most pages.
- **B. Transparent overlay**: same layout, `position: fixed`, transparent on load, gains `bg-white/80 backdrop-blur-xl` on scroll (`scrollY > 48`). The award-tier default for immersive heroes.
- **C. Compact center logo**: links split evenly left and right of a centered logo. Fashion, hospitality, editorial brands.
- **D. Mega-nav**: A or B with dropdown panels for multi-product companies. Panel `max-w-[1200px]` centered, `p-8`, grid of link groups. Only when the site has 4+ distinct product areas.

Sizing: `h-16` is the safe default. Never exceed `h-20`. Every pixel of nav height is stolen from the hero. Logo `h-6` to `h-8`. Nav links `text-sm font-medium`. CTA button matches the page's secondary size (`h-9 px-4 text-sm rounded-lg`), never the hero's primary size.

Scroll behavior: B (transparent overlay) transitions on scroll with `transition-colors duration-200`. The blur + tint appears, the logo may swap to a dark variant, and the nav gets a `border-b border-black/5` hairline. Sticky navs that aren't transparent on load (variant A) use `sticky top-0 z-50` with the same border hairline.

Mobile: hamburger right, `size-10` tap target. Drawer is full-screen overlay `bg-white` with stacked links at `text-lg py-4`. Close button top-right matching hamburger position. Never a half-height slide-down panel; it creates scroll conflicts.

Rule: the nav is not a section in the section count. It does not get a background system, texture, or decorative treatment. It is infrastructure.

---

## Openers

### 1. Hero
Job: answer "am I in the right place and why should I care" in under 3 seconds. Headline is identity-first or outcome-first, never feature-first.
- **A. Split 7/5**: copy left (eyebrow, display headline, subhead, CTA pair, trust anchor line), visual right. The workhorse. `min-h-[80vh]` cap, not forced 100vh.
- **B. Centered + product below**: centered copy `max-w-[820px]`, full product shot underneath breaking out to `max-w-[1100px]`. Best for strong UI screenshots.
- **C. Full-bleed immersive**: background image/video/canvas edge to edge, copy overlaid bottom-left or centered, scrim for contrast. Needs a real visual asset.
- **D. Editorial oversized**: headline at `clamp(3.5rem, 9vw, 8rem)` spanning the container, visual tucked below or beside in a 4-col cell. Studio and brand sites.
- **E. Split + floating UI collage**: copy left, 2 or 3 overlapping product cards right with `rotate-[-2deg]`/`rotate-[1.5deg]`, shadow system.
- **F. Video hero**: muted autoplay loop (8 to 15s, no audio) at `min-h-[70vh]`, gradient scrim `from-black/60`, one line + single CTA. Poster frame fallback; respect `prefers-reduced-motion`.
- **G. Kinetic type**: display-xl headline where one word rotates/swaps, or a type ticker strip beneath the static headline. Type IS the imagery; motion spec goes to the animation skill.
- **H. Interactive / demo hero**: live embedded product, playground input, or configurator right of copy. Highest effort, highest payoff for devtools and AI products.
Sizing: `pt-[96px]` to clear nav, `pb-20` to `pb-32`. Mobile: copy first, visual second, headline `clamp(2.25rem, 10vw, 3rem)`.
Imagery: one hero-grade asset, never a collage of mediocre ones. UI products: cropped screenshot in frame with glow halo. DTC: full-bleed lifestyle with scrim, product sharp in lower third. Studio: duotone editorial photo or no image at all (type carries it).

### 2. Proof bar / logo rail
Job: borrowed trust immediately after the hero. Ambient, no heading or a muted one-liner.
- **A. Static rail**: 5 to 7 grayscale logos, `opacity-60 hover:opacity-100`, `py-10`.
- **B. Marquee**: infinite horizontal scroll for 8+ logos, masked gradient edges.
- **C. Stat + logo hybrid**: one bold stat left ("4,200 teams"), logos right.
- **D. Ratings hybrid**: star rating + review count + platform badges (G2, Trustpilot, App Store) inline with logos. Default for DTC.
Sizing: never more than `py-12`. This is a rail, not a section.
Imagery: monochrome SVG logos at uniform optical height (`h-6` to `h-8`), never raster screenshots of logos.

### 3. Announcement bar
Job: launch news or offer above the nav. `h-10`, dismissible, one line, one link. Skip unless there is real news.

---

## Product and features

### 4. Feature grid
Job: scannable breadth. 3 to 6 features of equal weight.
- **A. 3-col cards**: icon, title, 2-line body. `gap-8`, card `p-8`. The default everyone overuses; pick B, C, or D if any grid already exists on the page.
- **B. 2-col with large visuals**: each card carries a real product crop, `aspect-[4/3]`.
- **C. Borderless editorial grid**: no card chrome, hairline `divide-x divide-y` dividers, generous `p-10` cells. Premium feel.
- **D. Type-led index list**: no icons, no cards; numbered rows with caps labels, hairlines, and a one-line description. The siteinspire move; pairs with editorial pages.
Imagery: B uses cropped UI/product details, one consistent aspect. A uses one icon family only; mixing icon styles is an instant tell. D uses none, type is the texture.

### 5. Feature split (zigzag)
Job: depth on 2 to 4 headline features, one at a time.
- **A. Alternating 7/5**: visual and copy swap sides each row. `space-y-24` between rows, NOT separate sections.
- **B. Sticky visual**: copy column scrolls through 3 to 4 points while visual stays `sticky top-24` and swaps. Flag motion for animation skill.
- **C. Numbered editorial splits**: oversized index numerals (01, 02, 03) at `text-8xl opacity-10` behind each row.
- **D. Media-dominant rows**: visual takes 8 cols and bleeds to the viewport edge on its side; copy compresses to `max-w-[40ch]`. The Linear move.
Imagery: each row gets a DIFFERENT crop or state of the product, not the same screenshot three times. Apply one frame system; add glow halo on dark bands.

### 6. Bento grid
Job: feature breadth with visual hierarchy; the modern alternative to flat grids.
- **A. 2-row bento**: one `col-span-2 row-span-2` anchor cell + 3 or 4 satellites. 12-col grid, `gap-4`, cells `rounded-2xl p-8`.
- **B. Asymmetric 5-cell**: 8/4 top row, 4/4/4 bottom row.
- **C. Mixed-media bento**: cells alternate stat, product crop, short quote, micro-demo.
- **D. Live bento**: 1 or 2 cells contain actual interactive UI (a working toggle, a mini chart). Award-tier when real.
Rule: every bento needs exactly one anchor cell. Equal cells = it is just a grid.
Imagery: the anchor cell carries the strongest visual on the page after the hero. Satellites use abstract crops or single-stat typography, not full screenshots shrunk to unreadable.

### 7. Product showcase (full-bleed)
Job: let one big product visual carry a section. Minimal copy: eyebrow + one line.
- **A. Browser-framed screenshot** on tinted band, `max-w-[1100px]`, `rounded-xl`, layered shadow.
- **B. Edge-to-edge media** with copy overlaid or above, `min-h-[70vh]`.
- **C. Device trio**: desktop center, mobile overlapping foreground.
- **D. Perspective stage**: screenshot tilted with subtle 3D transform on a mesh + grain band, glow underneath. Use once per page maximum.
Imagery: this section IS imagery; if the best available asset is weak, cut the section rather than ship a stretched screenshot.

### 8. How it works / steps
Job: remove mechanic mystery for cold traffic. 3 or 4 steps maximum.
- **A. Horizontal 3-step**: numbered, micro-visual per step, connecting line. Vertical at mobile.
- **B. Vertical timeline 5/7**: line + nodes left, expanded step content right.
- **C. Step cards with screenshots**: each step carries a real UI crop.
- **D. Sticky step theater**: steps pin and swap a shared visual stage as you scroll. Premium; needs animation skill.
Imagery: per-step visuals must be the same family (all UI crops, or all illustrations); a photo + icon + screenshot mix reads as scrapbook.

### 9. Tabbed / interactive demo
Job: multiple workflows in one frame. Tabs or segmented control above a large product frame; switch swaps the visual. Cap at 4 tabs.
Imagery: each tab state is a distinct prepared crop at identical aspect, preloaded to avoid layout shift.

### 10. Integrations wall
Job: ecosystem trust.
- **A. Icon grid 6x3** with hover labels. **B. Orbit/cluster diagram** around the product logo. **C. Marquee rows** scrolling opposite directions, masked edges.
Imagery: official brand icons at uniform size on uniform tiles (`size-12` icon in `size-16` tile); cap visible icons at ~18.

### 11. Use cases / personas
Job: let each visitor self-select a lane.
- **A. 3-col persona cards** with per-persona micro-proof. **B. Horizontal scroll-snap rail** of 4 to 6 cards. **C. Split**: persona tabs left, detail right.
Imagery: persona-specific product crops or duotone photography per card; generic stock people are banned.

### 28. Annotated product hotspots
Job: explain a dense interface or physical product in place, instead of listing features abstractly.
- **A. Hotspot pins**: one large product image, 3 to 5 numbered pins, click/hover reveals a note card.
- **B. Callout lines**: static annotations with hairline leader lines to labeled details; works without JS, prints beautifully.
- **C. Exploded view**: physical product separated into layers/parts with labels. DTC and hardware.
Sizing: image `max-w-[1100px]` centered, `py-32`; annotations `text-sm`.
Imagery: requires one high-resolution master asset; pins at `size-7` with `tabular-nums`. The DTC equivalent of the bento.

### 29. Spec / ingredient breakdown
Job: substance proof for considered purchases (supplements, food, hardware, pro tools).
- **A. Ingredient grid**: each ingredient/component as a row or card with photo chip, dose/spec, and a one-line "why it is in here".
- **B. Spec table**: caps-label table with hairlines, `tabular-nums`; the engineering-credibility shape.
- **C. Stacked transparency panel**: "What's inside / What's NOT inside" two-column with check/cross.
Imagery: macro photography or consistent rendered chips at `aspect-square`, identical lighting; spec tables use no imagery.

### 30. Video section
Job: demo, founder story, or brand film that deserves its own moment, not a hero background.
- **A. Lightbox poster**: full-width poster frame with play button, opens overlay player. The safe default.
- **B. Inline scrub**: muted looping demo video in a browser frame, replacing a static screenshot in any showcase slot.
- **C. Testimonial video wall**: 3 vertical (9:16) customer clips side by side; tap to unmute. The UGC era default for DTC.
Sizing: A at `aspect-video max-w-[1100px] py-32`; C cards `aspect-[9/16] rounded-2xl`.
Imagery: poster frames are designed, not auto-grabbed: real frame + duotone or scrim + duration label.

### 31. Calculator / interactive ROI
Job: let the visitor compute their own value. Slider or 2 to 3 inputs left, live output number at stat scale right (`text-7xl tabular-nums`).
Sizing: 5/7 split panel `rounded-2xl p-10` on tint band.
Imagery: none; the live number is the imagery. One per page maximum, near pricing.

---

## Narrative and editorial

### 12. Manifesto / editorial break
Job: change the page's breathing rhythm and state a belief. The most underused section in LLM output and the most common award-tier move.
- **A. Oversized statement**: one sentence at `clamp(2rem, 5vw, 4rem)`, `max-w-[20ch]`, `py-32`, often on a dark or accent band.
- **B. Two-line poetic split**: muted first line, bold second line.
- **C. Statement + supporting trio**: big claim left 7 cols, three short proofs right 5 cols.
- **D. Scroll-reveal statement**: words or lines fade/illuminate as the reader scrolls. Motion to animation skill.
Imagery: usually none; when present, one duotone full-bleed photo BEHIND the statement at 20 to 30% visibility.

### 13. Founder note
Job: human trust for considered purchases. 5/7 split: portrait or signature left, short letter right at `text-lg leading-relaxed max-w-[55ch]`. One per site.
Imagery: real environmental portrait (not headshot-on-white), graded to match the page; handwritten signature SVG.

### 14. Stats band
Job: quantified credibility. **A.** 4-up big numbers `text-5xl`/`text-6xl` tabular-nums, `py-20`. **B.** 2+2 asymmetric: hero stat `text-8xl` left, three smaller right. **C.** Inline stat rail, `py-12`. **D.** Counter-on-scroll variant of any of these (animation skill). Only real numbers.
Imagery: none. Dark band + grain is the default dressing.

### 15. Comparison (us vs them)
Job: conversion logic for switchers; the spine of Us-Vs-Them landers.
- **A. Two-column verdict**: "old way" muted/desaturated left vs. product elevated right with accent ring.
- **B. Feature matrix table**: sticky header, check/cross/partial, own column tinted with top badge.
- **C. Stacked contrast cards**: 3 rows of before/after pairs.
- **D. Slider verdict**: a draggable divider between the two worlds. Memorable; one per page.
Imagery: the "them" side uses desaturated/grayscale screenshots; the "us" side full color with glow. The grade gap IS the argument.

### 16. Before / after
Job: visceral transformation proof. **A.** Slider/toggle between states. **B.** Side-by-side annotated screenshots. **C.** Stat-anchored: "14 hrs -> 20 min" oversized between visuals.
Imagery: identical framing/crop/lighting on both states; only the subject changes. Mismatched crops kill credibility.

### 32. Marquee type band
Job: brand energy and section punctuation; the awwwards staple.
- **A. Single-line ticker**: repeating phrase at `text-5xl` to `text-7xl`, outlined + filled alternating, slow infinite scroll (60 to 90s loop).
- **B. Dual-direction bands**: two stacked marquees scrolling opposite ways.
- **C. Static oversized strip**: same look, no motion; the reduced-motion fallback and a valid choice on its own.
Sizing: `py-8` to `py-12`, full-bleed, content overflows viewport deliberately (clip, no scrollbar).
Imagery: type only, or inline logo/icon chips between phrases. Use once per page; two marquees of the same kind is noise.

### 33. Horizontal scroll gallery
Job: photography, work, or product range presented as a panning strip; the photo marquee pattern.
- **A. Scroll-snap rail**: `overflow-x-auto snap-x` cards at `h-[420px]`, varied widths, visible edge hint of the next card.
- **B. Auto-pan marquee**: continuous slow photo marquee, masked edges, pauses on hover.
- **C. Scroll-hijack pan**: vertical scroll drives horizontal travel through a chapter. High effort; animation skill owns the motion.
Imagery: 5 to 8 images, one grade, mixed orientations allowed but consistent height; captions `text-sm` muted below or overlaid on scrim.

### 34. Sticky stack cards
Job: sequential ideas that build on each other; the sticky column scrolling cards pattern.
- **A. Stacking cards**: each card `sticky top-24`, the next scrolls over it with slight scale-down of the one beneath.
- **B. Pinned split**: left column pins (heading + index), right column scrolls long content.
Sizing: cards `min-h-[70vh] rounded-3xl p-12`, alternating background tints per card.
Imagery: each card pairs one statement with one visual; backgrounds rotate through the page's tint system so the stack reads as chapters.

### 35. Split-screen chapters
Job: two-track storytelling (problem|solution, before|after, builder|buyer) at viewport scale.
- **A. Static 50/50 full-bleed**: two `min-h-[80vh]` panels, contrasting backgrounds, one CTA each.
- **B. Hover-expand**: panels at 50/50 expand to 65/35 on hover.
- **C. Alternating chapter spreads**: successive full-viewport 50/50 spreads with image side swapping.
Imagery: the two sides must contrast deliberately (dark/light, photo/type, mono/color); identical treatments defeat the shape.

### 36. Image mosaic / collage
Job: brand world-building through density; lookbook energy without commerce.
- **A. Masonry mosaic**: `columns-3 gap-4` mixed-aspect images, one or two cells swapped for type blocks.
- **B. Overlap collage**: 4 to 6 images with deliberate overlaps, rotation `-3deg` to `3deg`, taped/framed treatment for analog brands.
- **C. Grid-with-holes**: strict 12-col grid where 2 or 3 cells are intentionally empty; the gaps are the sophistication.
Imagery: this section lives or dies on grading; one filter recipe across every image, mixed sources unified by duotone if needed.

### 40. Team / humans section
Job: "who is behind this" trust for services, agencies, and enterprise sales.
- **A. Portrait grid**: uniform crops, hover reveals role or a human detail.
- **B. Editorial strip**: one wide team photo, names as a caps index below.
- **C. Founder pair 5/7**: portraits left, short "why we built this" right.
Imagery: same backdrop/lighting/crop across every portrait; candid > corporate. No LinkedIn-style mixed headshots.

---

## Proof

### 17. Testimonial spotlight
Job: one devastating quote treated editorially. Quote at `clamp(1.5rem, 3vw, 2.25rem) leading-snug max-w-[28ch]`, avatar + name + role + logo below, `py-28`.
Imagery: real avatar `size-14`, company logo chip; optional faint oversized quotation mark or customer logo at `opacity-5` behind.

### 18. Testimonial grid / wall
Job: volume of social proof. **A.** Masonry 3-col, varied heights. **B.** Uniform 3x2 grid. **C.** Two-row marquee scrolling opposite directions. **D.** Platform-native wall: cards styled as tweets/G2 reviews with platform icons. 6 to 12 cards, `p-6 rounded-xl`.
Imagery: every card needs an avatar; faceless quote walls read fake. D keeps platform chrome authentic, not restyled.

### 19. Case study cards
Job: proof with depth. **A.** 3-col: logo, headline metric, one-liner, link. **B.** Featured 8/4: one expanded story + two teasers. **C.** Horizontal scroll rail (see #33A mechanics).
Imagery: customer-context photo or product-in-their-brand screenshot per card; metric typeset at stat scale, not body.

### 20. Press rail
Job: third-party authority. Outlet logos + one pull-quote each, or a single rotating press quote between logo pairs. `py-12` to `py-16`.
Imagery: outlet wordmarks in monochrome at uniform height.

### 21. Community / UGC wall
Job: momentum proof for DTC and devtools.
- **A. Social masonry**: real post screenshots, platform icons visible, masked fade bottom + "Join 12,000 others" CTA.
- **B. Shoppable gallery**: customer photos in a grid, hover reveals tagged product + price. The conversion-grade UGC shape.
- **C. Video UGC row**: see #30C.
Imagery: REAL screenshots and customer photos, imperfections included; over-curated UGC defeats its own purpose.

### 37. Awards / badges rail
Job: certified credibility (G2 badges, SOC2, award laurels, "#1 on Product Hunt").
Layout: thin rail `py-10`, 4 to 6 badges at uniform height with muted captions; or a single featured award treated editorially next to a quote.
Imagery: official badge artwork only, never recreated; monochrome unless the badge color IS the proof.

### 38. Lookbook / collection gallery
Job: product range as desire, for fashion, home goods, food menus.
- **A. Editorial lookbook**: large alternating images (60/40 rhythm) with minimal captions, generous `py-32`.
- **B. Hover-swap product grid**: product shot swaps to in-context shot on hover, price visible.
- **C. Menu/catalog index**: type-led list with thumbnail chips; the "catalog is the pitch" shape.
Imagery: hero-grade photography is the entry fee; one grade, art-directed negative space, products sharp.

---

## Conversion

### 22. Pricing
Job: make choosing feel safe and fast.
- **A. 3-tier cards**: middle tier elevated (`scale-[1.03]`, accent ring, badge), feature lists 5 to 7 lines + "everything in X, plus".
- **B. 2-tier + enterprise rail**: two real cards, thin "Talk to us" band beneath.
- **C. Single price editorial**: one big number, included-list in 2 cols, guarantee line. One-product DTC.
- **D. Slider/calculator**: usage-based with live total (pairs with #31).
Always: billing toggle if applicable, guarantee or cancel-anytime line within 100px of the CTA.
Imagery: none inside cards; the section background may carry the page's gravity treatment (dark band, mesh).

### 23. Offer clarity block
Job: kill the "what do I actually get" leak. 7/5 split: included checklist left, price + flexibility note + CTA right in a tinted panel.
Imagery: optional product flat-lay or bundle shot behind/beside the checklist for DTC bundles.

### 24. Objection grid
Job: name the hesitation, dissolve it. 3 or 4 cards, each a real objection as the heading with a 1-2 sentence dissolve. No icons, no decoration; the directness is the design. Sits just above FAQ.

### 25. FAQ
Job: informational reassurance, written as real search queries. **A.** Single-column accordion `max-w-[760px]`, 5 to 8 items. **B.** Two-column static. **C.** Split 4/8: "Questions?" + support link left, accordion right. Emit FAQPage JSON-LD.

### 39. Mid-page CTA band
Job: catch ready buyers without making every section sell. One line + one button on a tint or accent band, `py-16`; insert every 2.5 to 3 viewports on long pages.
Imagery: none, or a slim product strip; this is punctuation, not a destination.

### 26. Final CTA
Job: close the reader who consumed everything.
- **A. Centered statement**: headline echoing the hero, one subhead, CTA pair, `py-28` on a contrast band.
- **B. Full-bleed image close**: brand image edge to edge with overlaid CTA; strong for DTC.
- **C. Split close**: restated value left, signup card right.
- **D. Oversized-type close**: display-xl imperative ("Start building.") with the CTA inline; the studio close.
Imagery: B uses the best lifestyle asset NOT used in the hero; the close should feel like a destination, one of the page's strongest contrast moments.

### 27. Footer
Job: navigation, trust, last brand note. **A.** 4-col links + newsletter. **B.** Big-brand footer: oversized wordmark `text-[12vw] opacity-10`. **C.** Minimal one-row footer for landers. Landers use C.

---

## Anti-sameness check (run during COMPOSE)

- Across the whole page: no shape appears more than twice, and at least 5 distinct shapes are used on a 10+ section page.
- At least one section comes from outside the conversion spine (32 to 36, 28 to 31, 38): these are where variation actually comes from.
- Imagery strategy check: count the distinct image treatments on the plan; more than 2 base strategies (per visual-craft.md 1.1) means cut one.
- If every section on the plan existed in a component library you have seen before, the plan is a template. Swap one section for a braver variant before presenting it.
