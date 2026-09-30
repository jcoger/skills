# Stack Decisions

One choice, one line of rationale, made before anything else. The stack is downstream of three questions: who edits content, how much application logic exists, and what the motion ceiling is.

## The picker

| Project shape | Stack | Why |
|---|---|---|
| Marketing site or landing page, speed and visual quality priority | Visual builder (e.g. Subframe) | Fastest path to a polished page; design-level control without a codebase |
| Product UI, application logic, auth, dashboards | Next.js + Claude Code | It is a codebase; it needs to scale as one |
| Marketing site that shares tokens and components with the product | Next.js + Claude Code | One repo, one token file, no drift between site and app |
| Content-heavy site: blog, docs, programmatic SEO pages | Astro or Next.js | Static-first rendering; islands keep JS near zero on content pages |
| Motion-heavy microsite, brand experiment, one-off | Framer | Motion ceiling is highest; lifespan is short; codebase ownership does not matter |
| Marketing + product together | Hybrid: builder for marketing, Next.js for product | Each surface gets its best tool; share the token values, not the code |

Hard rule: never mix two visual builders on one project. Pick one and commit.

## The three questions, expanded

1. **Who edits content after launch?** Developers only: content lives in code, no CMS. Marketers weekly: CMS for those surfaces only (W7). Nobody, ever: static, done.
2. **Is this a site or an app?** A site renders content; an app manages state. The moment auth, user data, or workflows appear, it is an app and it belongs in Next.js regardless of how pretty the marketing pages need to be.
3. **What is the motion ceiling?** Scroll reveals and hover states: any stack. Scroll-driven scenes, canvas work, or a BEAT SHEET hero with medium `code`: you need full code control, which rules out most builders.

## 2026 defaults (Next.js path)

- App Router with React Server Components. Ship server components by default; add `"use client"` only where interaction demands it. Less hydration is the single biggest INP lever.
- Tailwind v4 with CSS-first config. Tokens live in `@theme` as real CSS custom properties (see design-tokens.md), so the token file works in Tailwind utilities and raw CSS alike.
- `next/image` and `next/font` are non-negotiable. They are the perf budget half-implemented for free.
- TypeScript strict. Claude Code is dramatically more reliable against typed code.

## CMS scoping (W7)

A CMS earns its place only when a non-developer will edit a surface more than once a quarter. When in scope:

- Model **Tier 1 surfaces only**: the things that actually change (posts, case studies, job listings, legal pages). Marketing page copy is usually Tier 2; it changes through design iterations, not content edits, and belongs in code.
- Per schema: name, fields table (name, type, required, validation), reusable objects (one image-with-alt object, one CTA object, reused everywhere).
- Collections come from marketing-site-architecture's site map: if the map says the blog and the comparison pages are programmatic, those are your collections. Do not invent collections the map does not call for.
- Sketch one query per template so the data shape is proven before build.

~~~
CMS MODEL: <project>
| Schema | Surface | Fields | Editor |
|---|---|---|---|
| post | /blog/[slug] | title, slug, hero (imageWithAlt), body, seo | marketing |
| caseStudy | /customers/[slug] | title, slug, logo, stats[], quote (cta), body | marketing |
Reusable objects: imageWithAlt, cta, seo
Not modeled (lives in code): homepage, pricing, feature pages
~~~

## Decision smells

- "Let's use the builder for the app too" -> it is an app, see question 2.
- "Put everything in the CMS so we have flexibility" -> W7 violation; flexibility nobody uses is maintenance everybody pays.
- "We'll pick the stack after design" -> the motion ceiling and CMS questions change the design; pick first.
- A stack rationale longer than two sentences usually means the answer is Next.js and someone is negotiating with it.
