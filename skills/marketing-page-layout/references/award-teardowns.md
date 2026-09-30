# Award Teardowns

10 archetypes distilled from award-tier marketing pages. Each is a portable composition pattern, not a brand to copy. Used by COMPOSE (pick the archetype closest to your content), BUILD (execute the moves), and ELEVATE (reach for moves you haven't tried).

---

## 1. The dark OS (Linear archetype)

**Feel:** Precision engineering. The page itself feels like the product: dark, fast, no waste.

**Section flow:** Hero (product in motion, dark) → proof bar (monochrome logos on dark) → feature zigzag (3x, alternating screenshot + copy) → bento grid (one live/animated anchor cell) → stats band (dark, oversized tabular numbers) → testimonial wall (dark cards, subtle borders) → final CTA (same dark, minimal).

**Layout moves:**
- Near-zero color palette: one accent (usually blue or violet), white text, dark surfaces.
- Bento anchor cell runs a live or looping product animation, the signature moment.
- Feature rows use generous `py-32` and let the screenshot dominate (7/5 split, visual side).
- Stats band uses `text-8xl tabular-nums` on a dark-on-darker surface.

**Craft:**
- Grain at 4-5% over every dark surface. Kills the CSS-gradient look.
- Subtle grid or dot pattern (`bg-dots` with mask fade) behind at least one section.
- Screenshots in custom dark chrome frames, never raw browser captures.
- Motion is functional (UI transitions, code animations), never decorative.

**Steal:** The discipline of one accent color. Grain on dark. Bento with a living anchor cell. Stats that feel like a dashboard.

**Do not steal:** The darkness itself. It only earns its keep when the product is a tool that lives in a dark UI. A DTC brand in this palette looks like it's cosplaying.

---

## 2. The gradient system (Stripe archetype)

**Feel:** Engineered optimism. Complex product made to feel inevitable through visual confidence.

**Section flow:** Hero (gradient mesh + product vignette) → proof bar (blue-chip logos) → product showcase (full-bleed, framed UI) → feature grid (3-col icon cards on tinted surface) → bento (integration/ecosystem story) → comparison or matrix → testimonial spotlight (enterprise quote) → pricing → final CTA (gradient callback).

**Layout moves:**
- Hero gradient is a layered mesh (3-4 radial stops at 10-14% opacity), never a flat two-tone.
- At least two background system shifts: gradient → flat white/light → tinted → dark or gradient return.
- Asymmetric splits (`7/5`, `8/4`) dominate; centered stacks used sparingly for social proof only.
- One grid-breaking element: a screenshot that bleeds past the container edge.

**Craft:**
- The gradient mesh is the brand. It appears in hero and echoes (muted) in the final CTA. Mid-page is deliberately flat to make the gradient moments register.
- Card borders are `border-black/5` or `border-white/10`, never heavy.
- Typography is restrained: one display size, one body size, tight hierarchy. The gradient does the talking.
- Imagery is product-only: UI frames with consistent chrome, never lifestyle.

**Steal:** Mesh gradient as bookend (hero + close). The confidence of flat white mid-page between two crafted moments. Grid-break as controlled rule-breaker.

**Do not steal:** The specific gradient palette. Every Stripe-inspired site uses the same purple-blue-teal, and it reads as derivative instantly.

---

## 3. The monochrome grid (Vercel archetype)

**Feel:** Developer-facing minimalism. The grid is the aesthetic; content earns its place or gets cut.

**Section flow:** Hero (display type, no image or subtle geometric) → proof bar → feature grid (3-col, icon + title + one-liner) → code/demo block (dark, monospace) → comparison matrix → changelog or "what's new" rail → docs CTA → footer.

**Layout moves:**
- Near-monochrome: black, white, 2 grays, one accent for links/CTAs only.
- Dot grid or fine-line grid (`bg-grid`) as structural texture, mask-faded.
- Card grids use `gap-px` or `gap-[1px]` with shared borders: the "spreadsheet" feel.
- Hero is type-dominant: `display-xl` with tight tracking, minimal or zero imagery.

**Craft:**
- Border system is the design: `border-black/10` on light, `border-white/10` on dark, consistent everywhere.
- Dark code blocks are a section type, not an inline element. They get `py-24` and room to breathe.
- No gradients, no mesh, no orbs. Texture comes from the grid pattern and border rhythm only.
- Motion is page-transition-level (route changes, tab switches), not scroll-triggered decoration.

**Steal:** The `gap-px` shared-border card grid. Dot/line grid as the only texture. Type-dominant hero with no imagery.

**Do not steal:** The austerity itself unless the audience is developers. Non-technical audiences read monochrome minimalism as unfinished.

---

## 4. The editorial gallery (siteinspire archetype)

**Feel:** Curated taste. The layout choices signal that someone with opinions made this.

**Section flow:** Hero (oversized serif or display type, minimal imagery) → manifesto/belief statement (editorial break, centered, generous whitespace) → work grid (mixed aspect ratios, deliberate white space) → capabilities (borderless, left-aligned, list-style) → press/recognition rail → single testimonial (pull-quote scale) → contact CTA → big-brand footer.

**Layout moves:**
- Mixed-aspect image grid: 16:9 next to 4:5 next to 1:1, with intentional gaps. Not a uniform card grid; a composed gallery.
- At least one full-bleed image break between text sections.
- Section padding varies dramatically: editorial break at `py-36`, capabilities at `py-16`, creating deliberate breath/density contrast.
- Left-alignment is the default; centered text is reserved for one pull-quote or manifesto moment.

**Craft:**
- Typography carries the page: serif or display face at `clamp(3rem, 8vw, 6rem)` for the hero, tight leading.
- Backgrounds are flat or near-flat: cream, off-white, one dark section. No gradients, no mesh. Sophistication comes from spacing and type, not surface treatment.
- Images are graded to a single temperature: all warm, or all cool, or all desaturated. Mixed grades break the curation.
- Hover states on the work grid are the micro-interaction: scale, overlay, or caption reveal.

**Steal:** Mixed-aspect image grids. Padding as composition tool (extreme variation). Serif type at display scale.

**Do not steal:** The low-information-density approach for pages that need to convert. Editorial pacing works for portfolios; it loses cold-traffic visitors who need value props fast.

---

## 5. The premium DTC (Aesop / Glossier archetype)

**Feel:** Elevated physical product. The page makes you feel the texture, smell, weight.

**Section flow:** Hero (lifestyle photo, full-bleed or near-full, scrim + centered copy) → trust rail (press logos, awards) → product showcase (single product, generous negative space) → how it works / ingredients (clean 3-step) → editorial image break (full-bleed, no text) → testimonial spotlight (one quote, large) → product grid (2-3 items) → offer clarity (what you get) → final CTA (product image + add-to-cart).

**Layout moves:**
- Photography dominates: `min-h-[70vh]` hero, at least two full-bleed image moments.
- Negative space is aggressive: `py-32` to `py-40` on showcase sections. The product floats.
- Color palette derived from the product itself: warm neutrals, one accent from packaging.
- Grid is minimal: mostly stacked or 6/6 splits. Asymmetry is in the photography crop, not the layout.

**Craft:**
- Image grade is everything: warm, consistent, slightly desaturated. Every photo looks like the same photographer shot it.
- Body type is larger than expected: `text-lg` default, generous `leading-relaxed`. The pace is slow and deliberate.
- One texture moment: paper grain, linen scan, or subtle material texture as a section background.
- Transitions between sections use color-shift: warm cream → pure white → warm cream, not hard cuts.

**Steal:** Photography-as-architecture (images define the rhythm, not cards). Warm-shift section transitions. Material texture as background.

**Do not steal:** The languorous pacing for any page that needs to convert on first visit from paid traffic. DTC premium pacing assumes the visitor already wants the product.

---

## 6. The immersive launch (Apple event / gaming archetype)

**Feel:** Spectacle. The scroll IS the experience. One product, one night, maximum drama.

**Section flow:** Hero (full-viewport, video or 3D, product reveal) → single stat or tagline (oversized, dark) → feature chapters (sticky scroll theater, one feature per viewport) → spec comparison → pre-order/waitlist CTA → minimal footer.

**Layout moves:**
- Full-viewport sections everywhere: `min-h-screen` is the default, not the exception.
- Sticky scroll theater: copy pins left while visuals transition right (or vice versa).
- Section count is LOW: 6-8 sections for the entire page. Each section earns its viewport.
- Dark throughout. Light sections feel like intermissions if they appear at all.

**Craft:**
- Video or 3D is the hero medium. If neither exists, this archetype is the wrong pick.
- Text appears via scroll-triggered fade, not on load. Timing is part of the design.
- Grain at 5-6% over dark surfaces for texture. Animated gradient orbs optional for accent.
- Performance budget matters: lazy-load video, intersection observer for animations, `prefers-reduced-motion` fallback.

**Steal:** Sticky scroll theater for one feature showcase section. Single-stat dark interstitials. Video hero confidence.

**Do not steal:** The full-viewport-everything approach for pages with more than 3 things to say. This archetype works for product launches with one hero product; it suffocates multi-feature marketing.

---

## 7. The friendly product (Pitch / Amie archetype)

**Feel:** Warm, approachable SaaS. Color is personality, not decoration. The page feels like the product already likes you.

**Section flow:** Hero (product UI in a soft-shadow frame, colorful but not loud, playful headline) → proof bar (friendly logos, startups and mid-market) → feature zigzag (3x, product screenshots with colorful accent backgrounds per feature) → bento grid (product UI as anchor, supporting features as satellites) → testimonial wall (avatar-forward, casual tone quotes) → integrations or ecosystem → pricing (transparent, low-friction) → FAQ → final CTA (warm, echoes hero color) → footer.

**Layout moves:**
- Rounded everything: `rounded-2xl` cards, `rounded-xl` media, `rounded-full` avatars, `rounded-lg` buttons. The radius IS the brand.
- Color-coded feature sections: each major feature gets a tinted background (blue, green, purple, peach) at 5-8% opacity. Rotates through the page.
- Cards feel touchable: generous `p-8`, visible but soft shadows (`shadow-lg` with low-opacity spread), slight hover lift.
- Hero shows the product immediately: no abstract art, no lifestyle, just the UI looking good in a crafted frame.

**Craft:**
- Product screenshots are the imagery strategy. Each one is real, framed consistently (`rounded-xl border border-black/8 shadow-[0_16px_48px_-12px_rgb(0_0_0/0.12)]`), and cropped to the meaningful region.
- Background system is soft mesh (2.1 with pastel stops at 6-8%) + grain. No dark bands unless the brand has a dark mode.
- Illustrations, if present, are simple line or filled-shape style, never 3D renders, never complex scene illustrations.
- Micro-copy is warm: "Get started free" not "Start your trial," "See how it works" not "Request demo."

**Steal:** Color-coded feature sections with tinted backgrounds. Rounded-everything as a coherent system. Product UI as the primary image strategy (no lifestyle photography needed).

**Do not steal:** The softness for enterprise or infrastructure products. Rounded corners and pastel tints signal "approachable tool," not "mission-critical platform." Pitch can do it because it's a presentation tool; your security product cannot.

---

## 8. The lifestyle platform (Aesop / Equinox archetype)

**Feel:** You're buying a feeling, not a feature list. The page sells membership in something aspirational.

**Section flow:** Hero (cinematic photography, full-bleed, scrim + short evocative headline) → belief statement or manifesto (editorial break, one sentence, centered, oversized type) → experience showcase (2-3 moments, full-width photography alternating with tight copy blocks) → social proof (UGC wall or curated testimonials with photos) → how it works (3 elegant steps, minimal) → stats band (community size, locations, outcomes; warm, not corporate) → single testimonial (pull-quote, large, with portrait) → offer clarity (what membership/access includes) → final CTA (photography background, warm scrim, simple form or button).

**Layout moves:**
- Photography is architecture: images at `min-h-[60vh]` to `min-h-[80vh]` define the page rhythm.
- Copy sections are deliberately narrow: `max-w-[560px]` centered, creating extreme contrast with the full-bleed images.
- Warm palette: cream, ivory, warm gray, terracotta, or forest accents. Cool blues and purples are absent.
- Section padding is generous and variable: `py-36` around image moments, `py-20` around copy blocks.

**Craft:**
- Every photo is warm-graded: `filter: saturate(0.95) contrast(1.03) sepia(0.04)` or similar. Mixed temperatures break the spell.
- Typography is editorial: serif or refined sans-serif for headlines, generous `leading-relaxed` body. The page reads slowly on purpose.
- One texture moment: paper grain, linen, or warm noise overlay on a flat cream section.
- Transitions between sections use warm color shifts: cream → white → warm gray → cream. Never a hard cut to dark unless it's one dramatic moment.

**Steal:** Photography-as-rhythm (images define the tempo, copy fills the gaps). The narrow copy block contrasted with full-bleed images. Warm grade as unifier across mixed photo sources.

**Do not steal:** The slow, editorial pacing for any page where the visitor needs information quickly. This archetype assumes desire already exists and nurtures it. Cold traffic from a Google ad needs value props, not vibes.

---

## 9. The restrained portfolio (Work & Co / Area 17 archetype)

**Feel:** The work is the argument. Everything else gets out of the way. Confidence through reduction.

**Section flow:** Hero (positioning statement in display type, no imagery or a single subtle background treatment) → capabilities (short list, no icons, just text; borderless) → work grid (THE moment: mixed-aspect project cards with hover reveals) → process or approach (3-4 steps, minimal, left-aligned) → select client logos (proof bar, muted) → single testimonial (enterprise voice, understated) → contact CTA (direct, no fluff) → big-brand footer.

**Layout moves:**
- Work grid is the signature: `grid-cols-2` at desktop with one card occasionally spanning full width for the anchor project. Mixed aspects (16:10 + 4:5 + 1:1) composed intentionally.
- Section count is LOW: 7-9 sections. Every section that doesn't serve the argument gets cut.
- Left-alignment is the rule. Centered text appears once at most (the hero or a single quote).
- Whitespace is the luxury: `py-32` or more around the work grid. The page breathes because it has less to say.

**Craft:**
- Typography is the entire design system: one typeface, one weight for body, one for display, strictly adhered. The font choice IS the brand.
- Backgrounds are flat: white, off-white, one dark section. No gradients, no mesh, no grid patterns. Texture comes from image content, not CSS.
- Work grid hover states are the only animation: project title reveal, subtle scale, or desaturate-to-color transition. No scroll-triggered motion elsewhere.
- Word count is brutally low. Capabilities are 4-6 words each. Process steps are one sentence. If it takes a paragraph, it's not tight enough.

**Steal:** Mixed-aspect work grid with the span-2 anchor card. Typography-only design system (no reliance on decoration). Extreme section reduction: cutting sections IS the design move.

**Do not steal:** The minimalism for pages that need to convert strangers. This archetype works because agency/studio visitors are already qualified (they found you, they're evaluating taste). A product page aimed at cold traffic needs more sections, more proof, more CTAs.

---

## 10. The founder page (Ali Abdaal / Sahil Bloom archetype)

**Feel:** Personality-led. One person, one perspective, one portrait doing most of the heavy lifting. The page sells trust in a human, not a product.

**Section flow:** Hero (portrait + name + one-line positioning, editorial oversized type) → proof bar (as seen in / worked with, media logos or brand logos) → body of work (3-4 cards: newsletter, course, podcast, book, each a product in the ecosystem) → manifesto or belief statement (editorial break, first person, one paragraph) → stats band (subscriber count, audience size, revenue: the scale story) → testimonial wall (audience quotes, avatar-heavy) → featured content (latest posts, videos, or podcast episodes) → single CTA (newsletter signup or flagship offering) → minimal footer.

**Layout moves:**
- One hero portrait carries the page. Shot is professional but not corporate: natural light, real environment, warm grade. Reused (cropped differently) in the manifesto section or about block.
- Body-of-work section uses a `grid-cols-2` or `grid-cols-3` where each card is a different product/channel with its own thumbnail and clear CTA.
- First-person voice throughout: "I" and "my" in headlines and body copy. Third-person sounds like a publicist wrote it.
- Stats band positions audience metrics like a SaaS metrics dashboard: big numbers, short labels.

**Craft:**
- The portrait is the imagery strategy. Every other image is secondary: book cover, podcast artwork, video thumbnails. Lifestyle photography is unnecessary. The person IS the lifestyle.
- Warm palette derived from the portrait: skin tones inform the accent colors. Cool blue sites with warm portraits feel disconnected.
- Background system is minimal: warm flat or soft mesh. One dark section (stats or manifesto) for gravity. No complex textures. The person's face is the texture.
- Social proof is layered: media logos (authority) → audience size (scale) → individual quotes (relatability). This sequence matters.

**Steal:** Portrait-as-architecture (one image, multiple crops, carries the entire visual identity). Body-of-work grid as an ecosystem map. Stats band framed as audience metrics.

**Do not steal:** The personality-forward approach for any page where the individual isn't the product. A SaaS company with a "founder letter" section is fine; a SaaS company where the founder's portrait is the hero is a red flag. This archetype works when the person IS the brand.

---

## How to use these teardowns

**In COMPOSE:** Identify the 1-2 archetypes closest to your content and audience. Use their section flows as starting spines, then adapt from the content audit. A SaaS product with warm branding might blend archetype 7 (friendly product) spine with archetype 2 (gradient system) craft.

**In BUILD:** Pull specific moves from the steal lists. You can combine moves across archetypes. A Linear-style bento with Stripe-style mesh is a valid composition. But limit to 2 archetype influences per page; 3+ reads as confused.

**In ELEVATE:** When a section feels flat, check whether an archetype has a move for that section type. A weak hero might need the editorial gallery's oversized serif; a weak proof section might need the DTC premium's full-bleed image break.

**In EVALUATE:** Score "signature moment quality" (D6) by asking: could this moment appear in any archetype's teardown? If no archetype would claim it, it's not signature-grade.
