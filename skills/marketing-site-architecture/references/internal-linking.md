# Internal Linking

How pages connect: clusters, link surfaces, and the flows that move readers from informational pages toward money pages. Linking is architecture made visible; a good map with bad linking is still a maze.

---

## Hub-and-spoke clusters

Every page belongs to exactly one cluster with a hub:

- **The hub** (pillar guide, integrations hub, customers hub, blog category) links out to every spoke.
- **Every spoke links back to its hub** and sideways to 2 or 3 sibling spokes.
- Healthy pillar clusters run 8 to 12 spokes; fewer reads thin, more usually means two topics pretending to be one.
- Hubs earn surface placement (nav, footer, or a category page), never buried three folders deep. The hub's placement tells search engines and visitors where the expertise lives.

## Link surfaces (use each for its job)

| Surface | Job | Rules |
|---|---|---|
| Nav | Route the 5 to 7 journeys that matter | Never the sitemap; mega-menu panels group by cluster |
| Footer | The real sitemap | Every hub listed, organized by cluster; legal set lives here |
| Contextual (in-body) | Carry authority and readers between related pages | Descriptive anchors; the highest-value link type |
| Related-content modules | Catch the reader at the end | 3 items max, same cluster first, one step toward money |
| Breadcrumbs | Orientation below top level | Match the cluster structure; mark up with BreadcrumbList |

## Money flows

The defining question for every informational page: what is one step closer to revenue, and is it linked?

- Blog post -> its pillar, and the most relevant use-case or persona page.
- Pillar -> its spokes, plus product pages at natural bridge points (not forced, but never absent).
- Use case / persona page -> product page, pricing, and matched case study.
- Case study -> the persona page for the reader's segment, then pricing or demo.
- Comparison and alternatives pages -> pricing and migration lander.
- Pricing -> comparisons (catch the evaluator before they leave to search "vs").

If an informational page has no path toward money within one click, it is decoration, not strategy.

## Anchor text

- Anchors describe the destination: "competitor comparison for recruiting teams", never "click here" or "learn more".
- Vary phrasing naturally across the site; identical exact-match anchors everywhere read as manipulation.
- The anchor is a promise; the destination page's H1 should feel like the promise kept.

## Programmatic cross-linking

The pattern proven by large integration directories (Zapier is the canonical public example): pairing pages link up to both parents ("X + Y" links to the X hub and the Y hub), and parents list their pairings. This makes every page reachable, distributes authority evenly, and creates the crawl paths that get large page sets indexed.

Rules: every programmatic page reachable from its hub within 2 clicks; paginate hub listings cleanly; cross-link related pairings ("people who connect X also connect Z").

## Structural rules

1. **3-click rule:** every page reachable within 3 clicks of home (programmatic depth included).
2. **Zero orphans:** every page has at least one contextual inbound link, not just a sitemap entry.
3. **New page protocol:** at publish, add 2 or 3 contextual links FROM existing relevant pages to the new page. New pages with no inbound links wait months to matter.
4. **Comparison-page seeding:** link to comparison pages from pricing and from any blog content mentioning the competitor; these pages rarely earn external links and depend on internal ones.

## Quarterly linking audit

- [ ] Orphan scan: pages with zero contextual inbound links.
- [ ] Depth scan: anything more than 3 clicks from home.
- [ ] Cluster coverage: spokes missing hub links, hubs missing spoke links.
- [ ] Money-flow check: every informational page links one step toward revenue.
- [ ] Anchor quality: kill "click here" anchors on sight.
- [ ] Broken links after any URL changes (redirects in place, internal links updated to final URLs).
