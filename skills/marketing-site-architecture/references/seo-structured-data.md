# SEO and Structured Data

Architecture-level SEO: matching page types to query intent, title patterns, structured data per page type, and programmatic hygiene. Not a rankings playbook; the goal is pages that deserve to rank and markup that tells the truth.

---

## Query intent maps to page type

| Intent | Searcher state | Page type |
|---|---|---|
| Informational ("how to X", "what is X") | Learning | Blog post, pillar guide, free tool |
| Commercial investigation ("best X", "X vs Y", "X for teams") | Evaluating | Comparison, alternatives roundup, persona page, use case |
| Transactional ("X pricing", "buy/try X", "X migration") | Deciding | Pricing, migration lander, signup |
| Navigational ("<brand>", "<brand> login") | Returning | Home, product pages |

The architecture rule: one page per query, one query per page. Two pages competing for the same query split authority and confuse both rankings and visitors (gate A6).

### AI answer engines change the informational math

Informational queries increasingly get answered by AI overviews and answer engines without a click. Architecture consequences:

- Do not build a content tranche on commodity how-to posts ("what is X"); that traffic shrinks every quarter.
- Bias T1-2 informational spend toward assets that answer engines cite and that still convert when cited: free tools, templates, original data, and pillar guides with genuine depth.
- Commercial-investigation pages (comparisons, alternatives, persona pages) hold their click value longest; the searcher needs the full detail, not a summary.

## Title and H1 patterns

- Title tag: unique per page, roughly 60 characters, primary query phrasing near the front, brand at the end. "<Primary query phrase> | <Brand>".
- H1: one per page, agrees with the title without duplicating it robotically. The H1 can carry voice; the title tag carries the query.
- Meta description: ad copy, not summary. Roughly 155 characters, names the visitor's problem, makes a claim. Unique per page; programmatic pages template it with per-page data.
- Patterns per page type: persona page "<Category> for <persona>", comparison "<Us> vs <Them>: <year> comparison", integration "<Us> + <Tool> integration", pillar "<Topic>: the complete guide".

## Structured data per page type

Use JSON-LD in a script tag, separate from markup. Mark up only content visible on the page. Validate before shipping.

| Page type | Schema types |
|---|---|
| All pages | Organization (sitewide, once), WebSite, BreadcrumbList on anything below top level |
| Product/feature, pricing | SoftwareApplication or Product, with offers where real prices are public |
| Blog post, pillar | Article or BlogPosting (headline, author as Person, dates, image) |
| Case study | Article; Review/AggregateRating ONLY if genuine on-page reviews exist |
| Integration/template pages | Usually just BreadcrumbList; do not force schema where none fits |
| How-to content | HowTo only when the page is genuinely instructional steps |

### The FAQ schema caveat (important, most advice online is stale)

Google removed FAQ rich results for nearly all sites (fully deprecated through 2026; only certain government and health sites retain eligibility). Do not add FAQPage markup expecting rich results. FAQ sections remain excellent PAGE content (they answer real objections and capture long-tail phrasing); just do not expect the markup to do anything, and never fabricate Q&A for markup purposes.

General honesty rules:
- Never mark up content that is not visibly on the page.
- Never fake ratings, review counts, or prices.
- Spammy markup risks manual actions; the downside is real and the upside of dishonest markup is zero.

## Programmatic page hygiene

Programmatic pages (integrations, templates, locations) are legitimate when each page carries unique data answering a unique query. The hygiene rules:

1. **Unique payload test:** strip the template; if what remains is identical between two pages, they are doorway pages. Each page needs unique substance (different workflows, different data, different local proof).
2. **Index only what deserves it:** thin or near-empty pages get noindex until they have substance. A large index of junk drags the whole domain.
3. **Canonicals:** every page self-canonical unless it is a true duplicate or a paid variant; stripped-nav paid landers canonical to their organic sibling.
4. **Launch in tranches:** ship the top 10 by demand, watch indexing and engagement, then expand. Never publish 500 pages on day one.
5. **Internal links are the index path:** every programmatic page is linked from its hub, paginated cleanly, never orphaned (see internal-linking.md).

### The enforcement reality (2026, most advice online predates this)

Google's March 2026 spam update hit scaled thin content hard; sites flagged for scaled content abuse lost the majority of their search traffic almost overnight. Two implications:

- **Prune, do not pad.** If a programmatic set gets flagged, or simply never earns engagement, the recovery path is consolidation: 301 near-duplicates into stronger pages, canonicalize variants, and delete pages that cannot be made genuinely useful. Adding a paragraph to every thin page is not a fix and does not work.
- **The unique payload test is existential, not aspirational.** A large index of near-duplicates does not just underperform; it puts the whole domain's rankings at risk.

## Performance note

Core Web Vitals are a layout and motion concern (their skills own the budgets), but architecture decides one thing: page weight class per temperature. T1-2 pages should be near-static and instant; reserve heavy interactive spend for T4-5 pages where it earns conversion.
