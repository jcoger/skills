---
name: marketing-site-architecture
description: Whole-site architecture for marketing websites. Use when deciding which pages a site needs, planning a site map, speccing a new page type (competitor comparison, use case, integration, pillar), making subpages riff off the home page, or auditing a live site's page strategy. Trigger phrases include "site map", "site architecture", "what pages do we need", "plan the website", "competitor page", "spec a page", "subpages", "audit their site", "information architecture", "IA", "nav labels", "card sort", "tree test", "content audit".
---

# marketing-site-architecture

This skill is the whole-site layer. It decides WHICH pages exist, what job each does, and how they hold together as one brand and one search strategy. It does not design sections (a layout skill owns that), direct motion (a motion skill owns that), or sequence persuasion within a page (a conversion skill owns that). It owns the map.

Sites fail at the site level before any page fails: pages accumulate one request at a time, subpages either clone the home page or abandon it, and SEO pages ship as doorway junk that embarrasses the brand.

## Hard rules

1. **Home is the source of truth.** Every subpage riffs off the home page's system (tokens, type, nav, personality). No page redesigns the brand.
2. **One job, one primary query per page.** A page serving two intents loses both. If a page needs two jobs, it is two pages.
3. **Pages earn their existence.** A page ships when people search for it, sales needs it, or the journey breaks without it. Never "we should probably have one".
4. **Temperature before design.** Assign page temperature (T1 to T5, references/riff-system.md) before any section work. Temperature sets the design energy budget.
5. **Nav stays small.** 5 to 7 top-level items no matter how many pages exist. Depth lives in footers, hub pages, and contextual links.
6. **No orphans.** Every page belongs to a cluster with a hub and is reachable within 3 clicks of home.
7. **Programmatic pages pass the same gates.** Template plus unique data is legitimate. If two pages would answer the same query with the same content, they are one page.
8. **Honest SEO only.** Structured data describes what is visibly on the page. Comparisons acknowledge competitor strengths. No fake urgency, no doorway near-duplicates.
9. **Structure and labels before navigation.** Decide the scheme and the words on the groups first; the nav is the UI that exposes them. Every top-level label names its source in the visitor's vocabulary (queries, search logs, sales and support language), never stakeholder preference alone. references/information-architecture.md.

## Mode routing

| User intent sounds like | Mode |
|---|---|
| "What pages do we need", "map the site", "plan the website" | ARCHITECT_SITE |
| "Spec/build a comparison page", "we need a use-case page", "add an integrations section" | SPEC_PAGE |
| "Audit this site's architecture", "what's their page strategy", "why is our site a mess" | AUDIT_ARCHITECTURE |

If the user asks for a single page on a site with no map, offer a fast ARCHITECT_SITE first; a page specced without a map usually lands in the wrong cluster.

## ARCHITECT_SITE

1. **Read the business.** Stage, product count, personas, sales motion (self-serve vs sales-assisted), price point, content capacity (who will actually write this), and competitive pressure.
2. **Pick the nearest recipe** from references/site-map-recipes.md and say why.
3. **Tailor the page list.** Every page gets: job (one sentence), primary query, temperature, cluster. Cut recipe pages the business cannot feed; add pages only with a named job.
4. **Organize and label** per references/information-architecture.md: pick the primary scheme (topic or task; audience only as a secondary "for <persona>" group), give every page one primary home and an outline ID (0.0, 1.0, 1.1), and write each top-level label with its vocabulary source.
5. **Order the build in three tranches:** launch (the site cannot exist without these), growth (compounding search and proof assets), scale (programmatic and pillar plays). Capacity-honest: tranche 2 with no writer is fiction.
6. **Sketch the linking plan** per references/internal-linking.md: clusters, hubs, money flows.
7. **Run gates A1 to A11** (below; A12 too on a redesign). Present the map with its test status: a tree test plan, or results. Stop. Do not spec individual pages until the map is approved.

### Worked example (condensed)

Request: "Map the site for a seed-stage B2B SaaS, one product, three personas, sales-assisted."

Recipe: seed-stage SaaS. Tranche 1 (launch): home (T5), product (T4), pricing (T3), three persona pages (T3, one per persona, each with its own query), about (T3), demo/contact (T2). Tranche 2 (growth): two competitor comparison pages (T3, picked by sales-call frequency, not vanity), three case studies (T3), security/trust page (T2), blog hub plus four posts supporting the persona pages (T1). Tranche 3 (scale): integrations hub plus top six integration pages (T2, programmatic), one pillar guide owning the category query (T2).

Every page listed with its primary query, for example persona page 2: "<category> for recruiting teams". Gates pass: nav is Product, Solutions (3 personas), Pricing, Customers, Company = 5 items (A3); every tranche-1 page is 1 click from home (A4). Map presented, awaiting approval.

## SPEC_PAGE

1. **Identify the page type** in references/page-type-recipes.md. If the map exists, confirm the page is on it (or argue for adding it).
2. **Fix the basics:** job, primary query, temperature.
3. **Write the riff sheet** per references/riff-system.md: what this page inherits, what it may vary, whether it carries a signature moment (T4 and up only).
4. **Write the section spine** from the page-type recipe, adapted to the actual content available. If a layout skill is installed, hand the spine to it using its section vocabulary.
5. **Attach SEO structure** per references/seo-structured-data.md (title pattern, schema types) and linking (in from, out to) per references/internal-linking.md.
6. **Output the page spec:**

~~~
PAGE SPEC: <page>
TYPE: <recipe name> | TEMPERATURE: T<n> | PRIMARY QUERY: "<query>"
JOB: <one sentence>
RIFF SHEET: inherits <list> | varies <list> | signature moment: <none, or which>
SPINE: <ordered section list>
LINKS: in from <pages>; out to <pages>
STRUCTURED DATA: <types>
~~~

### Worked example (condensed)

Request: "Spec our comparison page against the category leader."

~~~
PAGE SPEC: /compare/us-vs-leader
TYPE: competitor comparison | TEMPERATURE: T3 (evaluation page, converts on clarity not spectacle) | PRIMARY QUERY: "<us> vs <leader>"
JOB: win an active evaluation by being the most honest comparison the searcher finds that day.
RIFF SHEET: inherits tokens, nav, footer, voice, motion personality at T3 intensity (base reveals only), imagery grade | varies: table-led layout | signature moment: none | NEAREST SIBLING: pricing
SPINE: neutral framing hero -> honest feature table (concede their enterprise reporting) -> who should genuinely pick them -> where we win, with numbers -> switcher testimonials -> migration path -> CTA
LINKS: in from pricing and any blog post mentioning <leader>; out to pricing, migration lander, one matched case study
STRUCTURED DATA: BreadcrumbList only (no ratings markup without real on-page reviews)
~~~

Note the riff sheet doing its job: this page feels like pricing, not like home, and borrows pricing's table craft rather than inventing new patterns.

## AUDIT_ARCHITECTURE

Inputs: the site's nav, footer, sitemap (or crawl of visible links), plus 3 to 5 representative pages at different temperatures. For your own site, add a crawl inventory and Search Console queries (references/information-architecture.md, section 8).

**Grounding rule:** separate observed from inferred. State what was actually read (nav, footer, sitemap, which pages) versus estimated (page counts from pagination, assumed clusters). If less than roughly 80 percent of the claims rest on observed pages, say so and narrow the verdict accordingly. Never present an inferred page count or cluster as fact.

1. **Coverage pass.** Map found pages against the nearest recipe in references/site-map-recipes.md. Build a coverage table: page types present, thin, missing. Missing types with real query volume are the opportunity list.
2. **Riff pass.** Compare a hot page, a mid page, and a cool page. One brand or three? Does design energy track importance, or is the blog fancier than pricing?
3. **Linking pass.** Orphan check, click depth from home, whether informational pages link toward money pages, anchor text quality.
4. **SEO structure pass.** Title patterns, schema presence and honesty, programmatic hygiene (near-duplicates, thin pages).
5. **IA pass.** Scheme (org chart, audience gate, or visitor tasks?), label table (nav label vs H1 vs title tag), junk-drawer labels, hidden desktop nav, and the navigation stress test on 3 deep pages. On your own site, every inventory URL gets a fate.
6. **Verdict** per pass: SOLID, GAPS, or BROKEN, plus a ranked list of missing-page opportunities (for competitor audits, this list is the deliverable).

### Worked verdict (condensed)

"Audited <competitor>: read nav, footer, sitemap, and 5 pages across temperatures; roughly 85 percent observed, integration directory size estimated from pagination. Coverage: SOLID on product and integrations (90+ pages), GAPS on proof (3 case studies, none segment-matched), BROKEN on riff (the blog runs hotter than pricing; temperatures are inverted). Linking: comparison pages are orphaned, linked only from the footer. Top opportunities for us: they have no migration lander despite a public price increase, and their comparison pages trash competitors, so an honest one wins the query."

## Acceptance gates

- **A1:** every page has one job and one primary query, written down.
- **A2:** every page has a temperature, and its design budget matches (no T5 blog posts).
- **A3:** nav has 7 or fewer top-level items.
- **A4:** every page reachable within 3 clicks of home; zero orphans.
- **A5:** every specced page has a riff sheet and honors its inherits list.
- **A6:** structured data is honest; no two pages answer the same query.
- **A7:** every top-level and second-level label names its vocabulary source; no junk-drawer labels ("More", "Other", "Quick links"); each label set shares one syntax; a branded or coined term carries a generic word beside it.
- **A8:** the primary scheme is topic or task. No org-chart sections. Audience splits appear only as a secondary group labeled "for <persona>", with every option visible at once.
- **A9:** primary nav is visible on desktop (no menu icon hiding it); submenus open on click; mobile shows what fits (up to 4 items) and hides the rest under a labeled menu.
- **A10:** the navigation stress test passes on 3 pages at T1 to T3 entered cold: site, section, and parent are nameable, links are distinguishable, and one next step toward the page's job is visible.
- **A11:** the tree was tested before build (every top task at 61 percent success or better), or the map is marked UNTESTED with a test plan attached.
- **A12 (redesigns and audits of your own site):** a crawl inventory exists, and every existing URL has a fate: keep, update, merge (with 301 target), or remove.

## Reference routing

| File | Used by | Contents |
|---|---|---|
| references/site-map-recipes.md | ARCHITECT_SITE, AUDIT_ARCHITECTURE | Page sets by archetype and stage, with tranches |
| references/page-type-recipes.md | SPEC_PAGE | 14 page types: job, query intent, temperature, spine, failure modes |
| references/riff-system.md | SPEC_PAGE, AUDIT_ARCHITECTURE | Temperature scale, inheritance rules, riff sheets |
| references/seo-structured-data.md | SPEC_PAGE, AUDIT_ARCHITECTURE | Intent mapping, title patterns, schema per page type, programmatic hygiene |
| references/internal-linking.md | All modes | Clusters, link surfaces, money flows, audit checklist |
| references/information-architecture.md | ARCHITECT_SITE, AUDIT_ARCHITECTURE | Schemes, structure, labels and label sources, navigation research, search logs, controlled vocabulary, card sorts and tree tests, inventory and audit, where the IA books are dated |

## Stay in lane

This skill owns the map: which pages exist, the scheme that groups them, the labels on the groups, each page's one home, and the site-level test that the structure is findable. It hands off everything inside a page.

| For | Use |
|---|---|
| The order a page's argument runs in, proof placement, CTA strategy, objections | `conversion-architecture` (`/mk-convert`) |
| How a page's content breaks into passages that search and AI answers can find and quote, crawler access | `retrieval-architecture` (`/mk-cite`) |
| Section composition, shapes, sizing, the signature moment, nav and header layout | `marketing-page-layout` (`/mk-page`) |
| Schema markup syntax, metadata implementation, CMS content model code | `web-build` (`/mk-build`) |

Where the edges touch: this skill picks a page's primary query and job; `retrieval-architecture` decides the passages that answer it. This skill writes nav labels and decides what the nav contains; `marketing-page-layout` decides how the nav looks and behaves. The objection list `conversion-architecture` builds is a label source here, not a sequence to copy.

## Sources

- Peter Morville and Louis Rosenfeld, *Information Architecture for the World Wide Web*, 3rd edition (O'Reilly, 2006). Chapters 3 to 12.
- Louis Rosenfeld, Peter Morville, and Jorge Arango, *Information Architecture: For the Web and Beyond*, 4th edition (O'Reilly, 2015). Contents and scope changes only.
- Lisa Maria Martin, *Everyday Information Architecture* (A Book Apart, 2019).
- Current practice (NN/g, Optimal Workshop, MeasuringU, Google documentation) is cited by URL inline in references/information-architecture.md.
