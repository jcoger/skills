# Information Architecture

How the map gets organized, labeled, and proven. The other references decide which pages exist and how they link. This file decides the scheme that groups them, the words on the groups, how a visitor finds their way from any entry point, and how you know the structure works before anything is built.

Sources: Morville & Rosenfeld, *Information Architecture for the World Wide Web*, 3rd edition (O'Reilly, 2006), cited as "R&M ch N". Lisa Maria Martin, *Everyday Information Architecture* (A Book Apart, 2019), cited as "Martin ch N". Current practice is cited by URL. Claims marked with a chapter come from the book. Claims marked with a URL come from that page.

---

## The default failures

**One: the model designs navigation and calls it IA.** It picks a header pattern, fills it with plausible words, and never decides the scheme underneath. IA is the structure and the labels. Navigation is the UI that exposes some of it (https://www.nngroup.com/articles/ia-vs-navigation/). A nav chosen before the structure gets redesigned mid-project when the content turns out deeper than the pattern allows. **Banned:** writing a nav before the site map's scheme and labels are decided.

**Two: labels come from the company.** The model mirrors the org chart (Sales, Marketing, Support), the product's internal feature names, or the founder's favorite metaphor. R&M ch5 names org-chart structure as the classic failure. Martin ch3 calls it Conway's Law showing through. **Banned:** any top-level label without a named source in the visitor's vocabulary (see Label sources).

**Three: an untested tree is presented as finished.** The model argues for its structure instead of measuring it. A card sort gets read as validation. It is not. A card sort generates ideas; a tree test evaluates a hierarchy (https://www.nngroup.com/articles/card-sorting-tree-testing-differences/). **Banned:** calling a structure validated without a tree test, or shipping a redesign map without the UNTESTED flag (gate A11).

---

## 1. Organization schemes

A scheme is the shared trait that groups items. A structure is the type of relationship between items and groups (R&M ch5). Decide both before navigation.

| Scheme | Type | Use on a marketing site | Source |
|---|---|---|---|
| Alphabetical, chronological, geographical | Exact | Sub-collections only: changelog, press, locations, integrations directory | R&M ch5 |
| Topic | Ambiguous | Default for resources, blog, guides. Defines the universe of content visitors will expect there | R&M ch5 |
| Task | Ambiguous | Strong for top-level when the top tasks are predictable (see, compare, price, start, get help) | R&M ch5; Martin ch3 |
| Audience | Ambiguous | Secondary only. Rules below | R&M ch5; Martin ch3; NN/g |
| Metaphor | Ambiguous | Ideation only. Never the site's scheme | R&M ch5, ch11 |

**Rules that held up:**

- **Shallow hybrids are fine; deep hybrids are not** (R&M ch5). A top nav that mixes a task ("Pricing") with topics ("Product", "Resources") works because it is short. Mixing schemes inside one list at depth forces visitors to scan every item. When several schemes share a page, give each its own block.
- **Offer more than one path to the same content.** No scheme serves every visitor, so exact schemes serve people who know the name, and ambiguous schemes serve people who do not (R&M ch5).
- **Metaphors carry baggage.** They break when a feature has no real-world twin, and teams fall in love with them (R&M ch5, ch11). Use one to brainstorm, then name things plainly.

**Audience schemes, reconciled.** Martin ch3 rejects audience-first navigation. NN/g lists five failures: visitors cannot tell which group they belong to, cannot tell "about" from "for", pay extra effort before their task, worry the other group got a better deal, and hit duplicated content (https://www.nngroup.com/articles/audience-based-navigation/). R&M ch5 warns the site's guesses about each segment go stale. This skill still builds persona pages, because they win "<category> for <persona>" queries and paid traffic lands on them directly. The rule that reconciles both:

- Persona pages are **destinations**, not a gate. They live under a topic or "Solutions" menu, never as an "I am a..." chooser that stands in front of the product.
- Labels say "for": "For recruiting teams", not "Recruiters".
- The panel shows every persona at once, and each page links sideways to the others.
- If 80 percent of two persona pages is shared, they are one page (page-type-recipes.md, persona failure).

---

## 2. Structure: breadth, depth, and one home per page

- **Hierarchy is the backbone.** Use it first, then lay hypertext links over it. Hypertext alone disorients (R&M ch5).
- **7 plus or minus 2 is not a rule.** R&M ch5 rejects it already in 2006: how many links a page can hold depends on how well the visitor can scan grouped options, not on short-term memory. This skill's 5 to 7 top-level nav items is a scanning and space budget, not a memory limit.
- **Be more conservative on depth than breadth.** Visitors give up past 2 to 3 levels (R&M ch5). Buried content is less discoverable, and all else equal, deep hierarchies are harder to use (https://www.nngroup.com/articles/flat-vs-deep-hierarchy/). Flat fails too when categories overlap. Neither extreme wins.
- **Build broad and shallow for a site that will grow.** Adding a page at level two is cheap. Changing the top level resets every returning visitor's mental model (R&M ch5).
- **One primary home per page.** A case study can appear in an industry list and a service list (polyhierarchy), but it has one canonical parent. That parent sets its URL folder, its breadcrumb, and its canonical tag. Cross-listings are links, not second homes (R&M ch9, Polyhierarchy).
- **Uniform collections are a database, not a tree.** Integrations, case studies, templates, and posts are content types with fields. Their browse pages come from the fields (R&M ch5, database model). This is the CMS content model; hand it to the build layer, do not draw 200 boxes.
- **Page IDs carry across artifacts.** Number the map as an outline: home 0.0, sections 1.0, children 1.1. Use the same IDs in the inventory, the PAGE SPEC, and the wireframes (Martin ch4; R&M ch12). A collection gets one ID with an x: "4.2.x, 40 integration pages".

---

## 3. Labels

A label stands in for a chunk of content in very little space (R&M ch6). Every "huh?" on a label is a visitor deciding whether to leave.

**Label sources, strongest first.** Every top-level and second-level label names its source in the site map.

1. **Search queries.** Google Search Console's Performance report lists the queries a site already appears for (https://support.google.com/webmasters/answer/7576553). For a marketing site with no site search, this is the search log.
2. **Site search logs**, if the site has search. GA4 records them as `view_search_results` with a `search_term` parameter, automatically for the default query parameters q, s, search, query, keyword (https://support.google.com/analytics/answer/9216061). Read 3 to 6 months (https://www.nngroup.com/articles/search-log-analysis/).
3. **Sales-call and support language.** Help desks know the questions (R&M ch10). The objection list conversion-architecture builds is also a vocabulary list.
4. **Competitor navs.** Borrow the de facto standard. R&M ch6 calls this "benevolent plagiarism": when 8 competitors use one label, visitors have learned it.
5. **Card sort or free-listing** results (section 7).
6. **Stakeholder preference.** Last, and never alone.

**Rules:**

- **Generic word beside the branded word.** Branded terms, acronyms, and coined feature names cause vocabulary mismatch; the fix is adding the generic term to the label and synonyms to search (https://www.nngroup.com/articles/search-log-analysis/). "Autopilot" becomes "Autopilot scheduling".
- **Consistent systems, not consistent labels.** Within one set, match style, syntax (all nouns or all verbs, never mixed), granularity, and audience register. No gaps a visitor would notice (R&M ch6). Martin ch3 adds that meaning outranks matching grammar.
- **No junk drawers.** "Miscellaneous", "More", "Other", and "Quick links" get banned on sight (Martin ch3, ch5). Quick links exist for political reasons and carry no context.
- **Nav labels are the strictest set.** Under 10 items, repeated on every page, so pick one variant per family ("Contact" or "Contact us", never both) and use it everywhere (R&M ch6).
- **Build the label table.** One row per nav label: label, the H1 of the page it opens, that page's title tag. When the three disagree, the promise and the destination disagree (R&M ch6). This is the same check as the anchor rule in internal-linking.md.
- **The head of the query log is small.** In one R&M example the top 40 queries were 21.8 percent of a week's searches, the top 10 about 9.5 percent (R&M ch6). Label for the head first, then catch the tail with synonyms.

---

## 4. Navigation

R&M ch7 splits navigation into embedded systems (global, local, contextual) and supplemental ones (site map, index, guides, search). Global nav is often the only element that stays constant, so it deserves the most testing.

**Deep entry is the normal case.** Visitors skip the home page and land from search, ads, social, and AI answers (R&M ch4, ch7). Every page must answer three questions: where am I, what is here, where can I go. Keith Instone's Navigation Stress Test, recommended in R&M ch4 and ch7, is the check:

1. Land on a random T1 to T3 page, not home.
2. Can you name the site, the section, and the parent page?
3. Can you tell where each link goes, and tell the links apart?
4. (Added for marketing sites) Is there one clear next step toward the page's job? Martin ch5: every page gets one primary action, or it is a dead end.

**Visible beats hidden.** In NN/g's 2016 study of 179 participants on 6 sites, desktop visitors used hidden (hamburger) menus in 27 percent of cases against 48 to 50 percent for visible or combo nav, and content discoverability dropped by more than 20 percent with hidden nav. On mobile, hidden nav was used in 57 percent of cases and combo nav (some links visible, the rest in a menu) in 86 percent (https://www.nngroup.com/articles/hamburger-menus/). Rules:

- Desktop: never hide the primary nav behind a menu icon.
- Mobile: show up to 4 items visibly when they fit; hide the rest under a labeled menu with strong contrast. Unlabeled icons lose scent (https://www.nngroup.com/articles/find-navigation-mobile-even-hamburger/).

**Menus** (https://www.nngroup.com/articles/menu-design/, 2024):

- Show the visitor's current location, and give local nav for sibling pages.
- Submenus open on click, not hover. Touch screens have no hover.
- No multilevel cascading flyouts. Use a mega menu instead.
- Avoid novel navigation patterns. Familiar and tested wins.

**Mega menus** earn their place when there are dozens of destinations. Group by the visitor's model, medium granularity, information-carrying words first, each option once, no widgets or search boxes inside. If hover must open one, delay 0.5 s and keep it open until the pointer has been gone 0.5 s (https://www.nngroup.com/articles/mega-menus-work-well/). Panels group by cluster (internal-linking.md).

**Breadcrumbs** show the canonical path, not click history (Martin ch5). They are the visible form of "one primary home per page". Google stopped showing breadcrumbs in mobile results on January 23, 2025; it still uses BreadcrumbList markup on desktop (https://developers.google.com/search/blog/2025/01/simplifying-breadcrumbs). Build them for visitors, not for the results page.

**Supplemental nav.** The footer is the real site map (internal-linking.md). An HTML site-map page is optional; a site of 2 to 3 levels usually does not need one (R&M ch7). The crawler's site map is sitemap.xml.

---

## 5. Search

- **There is no page-count threshold.** R&M ch8 declines to set one: 5, 50, or 500 pages can each go either way. The test is the type of need. A library-like section (docs, help center, large resource library) needs search. A brochure-shaped marketing site usually does not.
- **Search is not a patch for broken navigation.** Fix the structure first (R&M ch8; Martin ch5). "Visitors can just search" is not an IA.
- **If search ships:** one box, same place on every page, restates the query, never a dead end (offer revision, browse, and a human on zero results). Keep nav, footers, and boilerplate out of the index (R&M ch8).
- **The log is IA input.** Monthly: top queries, zero-result queries, rising terms. Zero results means either the visitor's word is missing (add a synonym or relabel) or the content is missing (add it to the map) (R&M ch10; https://www.nngroup.com/articles/search-log-analysis/). Promote hand-picked results for the head queries ("best bets", R&M ch8).

**AI answer engines** are a deep-entry path and an outside search box. The structure rules above still apply to the page a visitor lands on. How each page's passages get found and quoted belongs to `retrieval-architecture`.

---

## 6. Controlled vocabulary, sized for a marketing site

R&M ch9 climbs a ladder: synonym ring, authority file, classification scheme, thesaurus. A marketing site needs the bottom three rungs at most.

| Need | Tool | When |
|---|---|---|
| One name per product, feature, plan, persona | Authority file: preferred term plus variants | Always. It is the entity list the copy and schema share |
| Search finds "couch" when the page says "sofa" | Synonym ring in the search config | Only if the site has search |
| Browse posts, case studies, templates | A shallow taxonomy, 1 to 2 facets (industry, use case) | Once a collection needs pagination |
| Full thesaurus | Skip | Large publishers and intranets only (R&M ch9) |

- **Tags are a controlled list, not a free-for-all.** Martin ch6 documents one publisher with about 4,500 posts carrying 8,182 unique tags, 6,152 of them used once. Free tagging splits content streams ("career" vs "careers") and breaks measurement. Give each kind of metadata its own field.
- **Someone owns the list.** Contributors propose terms, an editor approves them, and the list is reviewed on a schedule. A taxonomy is never done (Martin ch6).

---

## 7. Proving the structure

Methods answer different questions. Use them in this order.

| Method | Question it answers | Numbers | Source |
|---|---|---|---|
| Top-tasks survey | Which few tasks matter most | Rank a long list; a small head takes most votes | https://gerrymcgovern.com/books/top-tasks-a-how-to-guide/read-the-first-chapter/ |
| Open card sort | How visitors group things (generative) | 15 participants qualitative, 30 to 50 quantitative; 30 to 50 cards | https://www.nngroup.com/articles/card-sorting-definition/ |
| Tree test | Can visitors find things in this hierarchy (evaluative) | 50+ per tree for quantitative; 8 to 10 tasks, 15 minutes or less | https://www.nngroup.com/articles/interpreting-tree-test-results/; https://blog.optimalworkshop.com/how-to-benchmark-your-information-architecture/ |
| First-click test | Does the designed nav lead the eye to the right door | Size it like a tree test: 50+ for a quantitative read | https://www.nngroup.com/articles/navigation-ia-tests/ |

**Card sorts, and when each type misleads:**

- **Open** (visitors make and name groups): best for mental models. It misleads when cards share words, because participants group by matching keywords instead of meaning (https://www.nngroup.com/articles/card-sorting-terminology-matches/). Write neutral cards. It also shows one level only, strips away page context, and past 50 cards produces a big "misc" pile.
- **Closed** (visitors sort into your categories): tests placement, not findability. Categories read without the scent their subcategories would give. A tree test usually answers this better (https://www.nngroup.com/articles/card-sorting-definition/).
- **Hybrid** (some categories given, visitors may add more): the given categories anchor everything. Use it only when 1 or 2 categories are truly fixed.
- **Numbers are not the answer.** Nielsen's 2004 analysis found 15 participants reach 0.90 correlation with the full result and 30 reach 0.95, from one organization and similarity scores only. He warns against designing from the scores without listening to what participants say (https://www.nngroup.com/articles/card-sorting-how-many-users-to-test/). R&M ch10 makes the same point: with 5 sessions, percentages mean nothing.

**Tree tests:**

- Write tasks from the top tasks, as scenarios, without the label's words (https://www.nngroup.com/articles/tree-testing/).
- Correct answers must be leaves, not branches.
- Read success with directness. High success with low directness means visitors struggled. First clicks spread evenly across categories mean the categories overlap (https://www.nngroup.com/articles/interpreting-tree-test-results/).
- Benchmark bands (Albert & Tullis, via NN/g): under 40 percent poor, 41 to 60 fair, 61 to 80 good, over 80 very good. Tree tests understate the final design, since the real site adds search and visual cues; a 67 percent task could reach 90 when built (same URL). This skill's line: any top task under 61 percent gets relabeled or restructured before build.

**First clicks predict the outcome.** Bailey and Wolfson (2009, 12 studies): a correct first click led to 87 percent task success, an incorrect one to 46 percent. Optimal Workshop's analysis of millions of tree-test responses found 70 percent against 24 percent (https://www.optimalworkshop.com/blog/correct-first-click-lead-to-3x-higher-task-success). Clicks on static comps matched live-site clicks within about 5 to 7 points on average, but hover menus and other dynamic elements broke the match (https://measuringu.com/do-click-tests-predict-live-site-clicks/, 2023). Test click-to-open nav on static images; test hover behavior live.

**Diagnose before fixing** (https://www.nngroup.com/articles/navigation-ia-tests/):

| Tree test | First-click / usability | The problem is | Fix |
|---|---|---|---|
| Pass | Fail | The UI: placement, contrast, hidden nav | Layout and nav pattern, not labels |
| Fail | Fail | The structure or the labels | Relabel or regroup, then retest the tree |
| Fail | Pass | Visual design is rescuing a weak tree | Fix the tree anyway; deep-entry visitors never see the rescue |

**The minimum a small site should run.** Label sources gathered (section 3). One tree test of 8 top tasks. One first-click test on the home comp at 375 and 1280 wide. If recruiting 50 target visitors is not possible, run 5 to 8 moderated sessions, call the result directional, and keep the UNTESTED flag off only for tasks that passed cleanly.

---

## 8. Inventory and audit

Martin ch2 separates the terms: the audit is the process, the inventory is the artifact. She also calls qualitative-vs-quantitative a false dichotomy. Numbers need a story; judgments need numbers.

**Audit even when the client says "starting fresh"** (Martin ch2). Old content carries equity with visitors, search engines, and owners, and it rarely gets scrapped in the end.

**Scope first, with five questions** (Martin ch2): how much content, what kind, how it is structured, how effective it is, how it is managed. Page count matters less than content type. 100 pages and 100,000 differ; 5,000 and 10,000 barely do.

**Inventory, one row per URL.** Crawl the site, then clean the sheet: drop redirects, 404s, files, and duplicate URLs (trailing slash, http vs https). Add section columns from the URL folders (Martin ch2). Columns for a marketing site:

~~~
ID | URL | Title tag | H1 | Section | Page type | Temperature | Primary query |
Owner | Last updated | Organic clicks (Search Console) | Inbound internal links | Fate | Redirect target
~~~

**Sample the qualitative pass.** Do not read every page. Read a couple of each species: every page type, every section, high-profile and neglected pages alike, weighted by traffic and importance. Stop at diminishing returns (R&M ch10, the "Noah's Ark" sample; Martin ch2).

**Every URL gets a fate.** Keep, update, merge (301 into the stronger page), or remove (https://www.nngroup.com/articles/content-audits/). Merge and remove follow the prune-do-not-pad rule in seo-structured-data.md. Martin gives no fate framework; she adds a warning worth keeping: do not change content only to make the site map look tidy (Martin ch4).

**Structural audit for redesigns.** A second sheet records the site as visitors experience it, not as planned: the ID outline, which pages are reachable only from body links, which nav items leave the domain, and which pages are cross-listed from another section (Martin ch4). It is the input to the linking audit and to the new map.

---

## Where the books are dated

| The book says | Now | Why it changed |
|---|---|---|
| Hover menus and rollover scope notes preview a section (R&M ch6, ch7) | Click-activated submenus; scope lives in visible labels | Touch has no hover; https://www.nngroup.com/articles/menu-design/ |
| Global nav on top, local nav on the left (R&M ch7) | Desktop keeps visible nav; mobile uses combo nav | Neither book tests mobile. Martin is silent on it; R&M predates it. https://www.nngroup.com/articles/hamburger-menus/ |
| HTML site maps and A to Z indexes as visitor tools (R&M ch7) | The footer serves visitors; sitemap.xml serves crawlers | Site-wide search and the fat footer absorbed the job |
| Meta keywords help search engines find the page (R&M ch6, ch9) | Ignored | Google stopped using the keywords meta tag in 2009: https://developers.google.com/search/blog/2009/09/google-does-not-use-keywords-meta-tag |
| Social tagging and tag clouds as a navigation future (R&M ch5, ch7) | Controlled tag lists | The services named are gone. R&M's own skepticism won; Martin ch6 documents the cost of free tagging |
| Card sort of 20 to 25 cards, no participant count, closed sorts to validate (R&M ch10, ch11) | 30 to 50 cards, 15 or 30 to 50 participants, tree tests to validate | Remote tools made tree testing cheap: https://www.nngroup.com/articles/card-sorting-definition/ |
| Search log means the site's own search box (R&M ch6, ch10) | Also Search Console queries, and AI answer referrals | Most marketing sites have no search box but do have query data |
| Breadcrumbs help results pages (Martin ch5) | Mobile results dropped them in January 2025 | https://developers.google.com/search/blog/2025/01/simplifying-breadcrumbs |
| 50 to 100 page strategy reports and Visio blueprints (R&M ch11, ch12) | A living site map with IDs, plus the inventory sheet | Sprint teams review diffs, not binders |
| Crawl tools listed in Martin's Resources | Tools renamed or retired; the method stands | Swap in whatever crawler is current |

**Held up without change:** the scheme-vs-structure split, shallow-vs-deep hybrids, rejecting 7 plus or minus 2, the navigation stress test, label consistency dimensions, search logs as vocabulary, one primary home under polyhierarchy (R&M); audit before redesign, audit vs inventory, task-over-audience labels, controlled tags, and taxonomy governance (Martin).

### What the 4th edition changed

The extraction this skill draws on is the 3rd edition (2006). The 4th edition is Rosenfeld, Morville, and Jorge Arango, *Information Architecture: For the Web and Beyond* (O'Reilly, 2015, xix plus 461 pages). From its catalog record (https://discover.library.unt.edu/catalog/b7388506) and publisher description (https://books.google.com/books/about/Information_Architecture.html?id=dZaJCgAAQBAJ):

- The subtitle drops "World Wide Web" for "the Web and Beyond". The frame moves from single websites to information spread across apps, devices, and channels.
- New opening chapters: The Problems That Information Architecture Addresses, Design for Finding, and Design for Understanding.
- The core chapters stay: anatomy, organization, labeling, navigation, search, controlled vocabularies, research, strategy, design and documentation.
- The 3rd edition's Parts IV to VI are gone: education, ethics, team building, tools, making the business case, business strategy, enterprise IA, and both case studies.
- Examples and figures were updated for mobile-era practice. The authors state the underlying principles carry over unchanged.

This file cites the 3rd edition's chapters. The 4th edition's contents list and description were checked; its chapter text was not. Before citing a 4th-edition chapter, read it.
