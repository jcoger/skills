# Visual Craft: Imagery and Backgrounds

The difference between competent and award-tier is usually here. Flat white sections with stock icons read as template; layered backgrounds, treated imagery, and one crafted moment read as authored. Used by BUILD (implement) and ELEVATE (upgrade). Brand colors always come from the project tokens; everything below is expressed in token-relative terms.

## Part 1: Imagery

### 1.1 Choose ONE primary image strategy per page

| Strategy | Best for | Execution notes |
|---|---|---|
| Product UI in frames | SaaS, devtools | Real screenshots in browser/device chrome, `rounded-xl`, layered shadow, slight perspective ok |
| Product in context | DTC, physical goods | Lifestyle photography, consistent grade across the page |
| Abstract 3D / render | Infra, AI, finance | Custom renders > stock; one consistent material/light language |
| Illustration system | Friendly brands, education | One stroke weight, one palette, never mixed with 3D |
| Editorial photography | Studios, brands | Large crops, confident negative space, duotone or grade unifies |

Mixing two strategies on one page is allowed only as primary + accent (e.g. UI frames primary, abstract 3D in the final CTA). Three strategies = visual noise, EVALUATE flags it.

### 1.2 Treatments that unify cheap or mixed assets

- **Consistent grade**: one `filter` recipe applied everywhere, e.g. `filter: saturate(0.92) contrast(1.05)`.
- **Duotone** (editorial, killer for award-tier): grayscale the image, overlay brand color with blend mode.
~~~css
.duotone { position: relative; }
.duotone img { filter: grayscale(1) contrast(1.1); }
.duotone::after {
  content: ""; position: absolute; inset: 0;
  background: var(--brand-primary);
  mix-blend-mode: multiply; opacity: 0.85;
}
~~~
- **Frame system**: every screenshot gets identical chrome: `rounded-xl border border-black/10 shadow-[0_24px_64px_-24px_rgb(0_0_0/0.25)]`. Optional browser top bar (three dots + url pill) as a tiny component.
- **Crop discipline**: crop UI shots to the meaningful region. Full-app screenshots at card size are unreadable and scream template.
- **AI-generated imagery**: defer prompt craft to your image-generation skill or the brand system; this skill only enforces consistency (same seed/style ref family per page) and aspect discipline.

### 1.3 Imagery-poor mode (when there is no shoot, no product photos, no real screenshots yet)

A surprising number of award-tier sites win with little or no photography. Treat the absence as a constraint that forces design, not a deficit to apologize for. Many studio and launch pages on awwwards/siteinspire ship with zero photography and win on type and background craft alone.

Allowed moves, ranked by reliability:

1. **Type as imagery.** Display type at `clamp(3.5rem, 9vw, 8rem)` IS the visual. Hero variants 1D (editorial oversized) and 1G (kinetic) earn their keep here. Marquee bands (#32) and oversized editorial breaks (#12A) carry the page where photography would.
2. **Backgrounds as imagery.** Layered mesh + grain (2.1 + 2.2) on the hero, dot grid + mask fade (2.4) at mid-page, animated gradient (2.3) on the final CTA. Three sections of background craft can replace three sections of mediocre stock.
3. **Diagrammed product.** When a screenshot is unavailable or premature, ship a clean diagrammatic stand-in: a labeled SVG of the workflow, a hand-drawn-feel architecture map, a single annotated wireframe. Reads as honest, never as missing.
4. **One hero asset, deployed twice.** If the project can produce ONE high-quality image (one real screenshot, one product shot, one custom render), put it in the hero AND the bento anchor cell. Do not dilute it by demanding more weak siblings.
5. **Geometric crops as image substitutes.** Bold color blocks at intentional aspects (square, 4:5, 16:9) with caps-label captions read as editorial intention, not placeholder.
6. **Annotated empty frames.** A browser chrome around a deliberately spare UI mock with handwritten-style callouts reads as design-in-progress, which is a tone many early-stage brands earn from.

Defects to avoid in imagery-poor mode:
- Stock photography of generic teams pointing at laptops. Worse than no image.
- Gradient blob illustrations from the standard library every founder is using this year.
- AI images with hands, faces, or text in them.
- Carousels of weak images padding for breadth. One strong asset beats six weak ones; cut the section.
- Apologizing in copy ("Image coming soon", visible placeholder text in frames).

EVALUATE in imagery-poor mode adds two checks:
- Type scale earns the visual load: at least one section with display type `> 4rem` at desktop.
- Background variety: at least 3 distinct background treatments present (mesh, grain, grid, mask, orbs, dark band).

## Part 2: Background systems

A page gets 2 or 3 background systems, mapped in COMPOSE. More becomes noise; one becomes flat. Texture opacities below are deliberate: backgrounds support, never compete.

### 2.1 Layered radial mesh (the modern hero default)

~~~css
.bg-mesh {
  background:
    radial-gradient(at 20% 15%, color-mix(in oklch, var(--brand-primary) 14%, transparent) 0, transparent 50%),
    radial-gradient(at 85% 30%, color-mix(in oklch, var(--brand-accent) 10%, transparent) 0, transparent 55%),
    radial-gradient(at 50% 95%, color-mix(in oklch, var(--brand-secondary) 8%, transparent) 0, transparent 60%),
    var(--surface-primary);
}
~~~
Keep stops at 8 to 14% strength. A mesh at 40% opacity looks like 2019.

### 2.2 Noise/grain overlay (the texture that kills flatness)

SVG turbulence as a data URI, one reusable class, 3 to 5% opacity:
~~~css
.grain::before {
  content: ""; position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.04; mix-blend-mode: overlay;
}
~~~
Apply over meshes, dark bands, and hero images. This single class is the highest ROI move in this file.

### 2.3 Slow animated gradient (signature-moment grade)

~~~css
@keyframes drift { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-4%,3%) scale(1.08); } }
.bg-animated > .blob {
  position: absolute; border-radius: 9999px; filter: blur(80px);
  width: 40vw; height: 40vw; opacity: 0.35;
  animation: drift 18s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) { .bg-animated > .blob { animation: none; } }
~~~
Durations 15 to 25s. Anything under 8s is distracting. Use on ONE section maximum (hero or final CTA); hand finer motion to the animation skill.

### 2.4 Geometric structure: dot and line grids

~~~css
.bg-dots {
  background-image: radial-gradient(color-mix(in oklch, var(--text-primary) 12%, transparent) 1px, transparent 1px);
  background-size: 24px 24px;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%);
}
.bg-grid {
  background-image:
    linear-gradient(to right, color-mix(in oklch, var(--text-primary) 7%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in oklch, var(--text-primary) 7%, transparent) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: linear-gradient(to bottom, black 40%, transparent 90%);
}
~~~
The mask fade is mandatory; un-faded full-section grids look like graph paper. Pairs well with devtools and "system" positioning.

### 2.5 Blurred orbs + glass panels

Orbs: 2 or 3 fixed-position brand-color circles, `blur(100px)`, `opacity 0.25 to 0.4`, placed off-edge (`-top-32 -right-40`) so they bleed in. Glass panels above them: `bg-white/60 backdrop-blur-xl border border-white/40` (light) or `bg-white/[0.06] backdrop-blur-xl border-white/[0.08]` (dark). Glass without something colorful behind it is just gray; orbs and glass are a paired system.

### 2.6 Dark section alternation

Rules for the dark band(s) on a light page:
- 1 or 2 dark sections per page, placed at moments that deserve gravity: stats, manifesto, final CTA.
- Never pure #000 on light pages; use the brand's ink/near-black token.
- Bump contrast inside: text gets `text-white/90`, muted text `text-white/60`, borders `border-white/10`.
- Dark sections get texture by default (grain at 5 to 6%, or a darker mesh); flat dark reads cheap faster than flat light.
- Entering and leaving dark: full-bleed hard cut is fine; never radius-corner a dark band on one end only.

### 2.7 Section transitions

Default is a clean cut between background systems. Upgrades, used sparingly:
- **Gradient hand-off**: section N ends with the tint that section N+1 uses as its base.
- **Overlap pull-up**: the next section's first element (a card, a screenshot) pulls up into the previous section with `-mt-16` to `-mt-24` and a shadow. One per page is a strong move; on every seam it is a gimmick.
- Diagonal/curved dividers are dated unless the brand is deliberately playful. Avoid by default.

### 2.8 Canvas / WebGL

Shader gradients, particle fields, and fluid sims are award-bait but cost performance and time. Use only when: the page is a brand statement (studio, launch), there is one (hero), and a static fallback ships for `prefers-reduced-motion` and slow devices. Implementation belongs to the animation skill; this skill only reserves the slot and the fallback.

## Part 3: Picking the system (decision table)

| Page temperature | Hero background | Mid-page | Gravity moment |
|---|---|---|---|
| SaaS, trustworthy | mesh 2.1 + grain 2.2 | tint alternation | dark band 2.6 + grain |
| Devtools, technical | grid 2.4 + grain | flat + hairline dividers | dark band + dots |
| DTC, warm | photography + scrim | cream/tint alternation | full-bleed image close |
| Studio, expressive | animated 2.3 or canvas 2.8 | confident flat + type | big-brand footer |
| Launch, minimal | orbs 2.5 + glass form | flat | animated final CTA |
| Imagery-poor (any) | mesh 2.1 + grain 2.2 | dot grid 2.4 + dark band 2.6 | animated gradient 2.3 or marquee band #32 |
| Friendly SaaS | soft mesh 2.1 (pastel stops) + grain | warm tint bands, rounded cards | colorful bento or product-as-illustration hero |
| Lifestyle / experience | photography + subtle scrim | cream/warm alternation | full-bleed editorial photography moment |
| Professional services | flat or subtle grid 2.4 | confident flat + hairlines | work grid with grid-break, big-brand footer |
| Founder-led brand | warm flat or portrait-anchored | tint alternation, low texture | editorial portrait moment or oversized type close |

EVALUATE checks: >= 2 background shifts, grain or texture present somewhere, no section where the background fights the content, reduced-motion fallbacks exist.
