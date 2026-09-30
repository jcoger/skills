# Performance and SEO

The budget is declared in the BUILD SPEC, before the first component exists (W4). Performance retrofitted after launch costs ten times what it costs at spec time.

## The budget block

~~~
PERF BUDGET: <project>
LCP: <= 2.5s mobile (target 1.8s)
CLS: <= 0.1 (target 0.02)
INP: <= 200ms (target 100ms)
JS:  < 200KB initial, compressed. Each route's client JS listed.
IMAGES: AVIF first, WebP fallback, max 2400px, quality ~75, LCP element priority-loaded
THIRD-PARTY: <each script: name, justification, load strategy>. Default count: zero.
~~~

## LCP playbook

- Identify the LCP element per page type at spec time. It is almost always the hero image, the hero headline, or the BEAT SHEET loop's poster frame.
- Image LCP: `priority` on exactly that image, AVIF/WebP via the framework image component, `sizes` attribute that matches the actual layout, never lazy-loaded.
- Text LCP: the display font must not block it. `display: swap` plus a metric-matched fallback (see design-tokens.md).
- Animated hero (BEAT SHEET): ship a static poster frame as the LCP element, mount the loop after. The signature frame from the beat sheet is the poster.
- Preconnect to any origin the hero touches. Self-host everything you can.

## INP playbook

- Hydrate less. Server components by default; client components are the exception with a named reason.
- Long tasks over 50ms get split or deferred. Heavy work goes behind `requestIdleCallback` or a worker.
- Every interaction shows feedback within 100ms, even if completion takes longer. The implementation skill owns the feedback motion; the budget owns the deadline.
- Third-party scripts are the usual INP killer: load on interaction or facade them (the chat widget becomes a button that loads the widget on first click).

## CLS playbook

- Width and height (or aspect-ratio) on every image, video, and embed. No exceptions.
- Font fallbacks metric-matched (size-adjust), so the swap does not reflow.
- Nothing inserts above existing content after load: banners, toasts, and consent UI reserve their space or overlay.
- Animations that move layout are a CLS source and a W6 conversation: transform-based motion does not shift layout; top/left/height motion does.

## Third-party policy

Every script: name, what it earns, and its load strategy (`afterInteractive`, on-interaction, or facade). Analytics earns its place; most of the rest is negotiable. The honest framing for stakeholders: each marketing tag is a tax on INP, and INP is a ranking and conversion input.

## Measurement

- **Lab:** Lighthouse in CI on every PR, against the budget numbers, mobile throttled.
- **Field:** CrUX / PageSpeed Insights monthly; field INP is the number that matters, lab can only approximate it.
- **Deep dives:** WebPageTest filmstrip when LCP regresses and the cause is not obvious.
- AUDIT mode reports measured values next to budget values. "Feels fast" is not a finding.

## SEO meta layer

Structure (which pages exist, which schema types apply) is marketing-site-architecture's call. This file implements it:

- **Titles:** one pattern per page type, declared once: `<Page name> | <Brand>` for subpages, the brand promise for the homepage. 50-60 characters.
- **Descriptions:** written per page, 140-160 characters, claim plus differentiator, no keyword stuffing.
- **OG images:** 1200x630, templated per page type (title on brand surface), generated at build time, not screenshotted by hand.
- **Canonical:** every page self-canonicalizes; programmatic pages canonicalize their filter variants.
- **JSON-LD:** implement exactly the schema types the site map assigned (Organization, Product, FAQPage, Article, BreadcrumbList). Validate in CI; broken structured data is worse than none.
- **Sitemap and robots:** generated, not hand-maintained; programmatic collections included automatically.

## Animation performance

One rule here, the rest belongs to the implementation skill: motion must live on compositor properties (transform, opacity, filter within reason), and any animation that ships is inside the JS budget like everything else. A 60KB animation library for one fade is a W4 finding.
