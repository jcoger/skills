# Riff System

How subpages relate to the home page. The home page is the source of truth; every other page is a riff: same system, same voice, energy scaled to the page's job. This file defines page temperature, what every page inherits, what may vary, and the riff sheet that makes it enforceable.

---

## Page temperature

Temperature is a design energy budget, set by the page's job in the journey, not by anyone's enthusiasm for the page.

| Temp | Energy | Belongs to | What it gets |
|---|---|---|---|
| **T5** | Full expression | Home (usually nothing else) | Signature moment, custom sections, maximum craft spend |
| **T4** | One notch down | Product pages, migration landers, studio case studies, DTC story | Strong custom hero, may carry the site signature moment, mostly custom sections |
| **T3** | Confident, efficient | Persona pages, pricing, comparisons, case studies, about | Standard hero shapes, base reveals, one accent allowed, mostly systematic sections |
| **T2** | Systematic | Integration pages, resources, security, careers, hubs | Template-driven, content-first, zero custom section design |
| **T1** | Reading surface | Blog posts, docs, legal | Typography and spacing do all the work |

Rules:
- One T5 per site. Two T5 pages means the brand has no center.
- Temperature can move a page up only with a business reason ("this lander takes half our paid traffic" earns T4). "The CEO likes this page" does not.
- Design budget follows temperature: if the blog looks more designed than pricing, temperatures are inverted and the site reads as confused.

## What every page inherits (non-negotiable)

- Design tokens: color, type scale, spacing rhythm, radius, shadow.
- Nav and footer, identical everywhere (exception: stripped-nav paid landers, which still use the same tokens).
- Button and link grammar: same shapes, same hover behavior, everywhere.
- Voice: same person wrote every page.
- Motion personality (if a motion skill directs the site): the personality NEVER changes between pages. Intensity scales with temperature: T5 gets the full spec, T3 gets base reveals plus maybe one accent, T1 gets almost nothing.
- Imagery treatment: same grade, same style rules, density varies.

## What varies by temperature

- Hero scale and ambition (T5 statement hero down to T1 title block).
- Signature moment: T4-5 pages only, and only one page actually carries it.
- Section count and density.
- Custom vs systematic sections (T3 and below assemble from the system; T4-5 may invent).

## The riff sheet

One short block per page, written before design. This is the enforcement mechanism:

~~~
RIFF SHEET: <page>
TEMPERATURE: T<n> (reason: <one clause>)
INHERITS: tokens, nav, footer, voice, motion personality at T<n> intensity, imagery grade
VARIES: <hero shape> <density> <specific allowed departures>
SIGNATURE MOMENT: <none | carries the site moment | page-local accent>
NEAREST SIBLING: <the existing page this should feel most like>
~~~

The NEAREST SIBLING line is the practical trick: "the comparison page should feel like pricing, not like home" settles most design arguments before they start.

## Riff recipes (common cases)

- **Persona page off home:** inherit the home hero's shape at 80 percent scale, swap the claim for the persona's stakes, reuse home's proof band with persona-filtered logos.
- **Comparison page off pricing:** inherit pricing's table craft and FAQ pattern; the comparison table is pricing's comparison table with a competitor column.
- **Migration lander off product page:** inherit the product page's capability sections, add the event hero and switch-path section, strip nav for paid variants.
- **Blog off nothing visual:** inherits tokens and type only; the design IS the type system. Resist the urge to decorate.
- **Integration pages off one template:** design the template once at T2, then only data varies. If a specific integration becomes strategic, promote that one page to T3 deliberately.

## Anti-patterns

- **Every page T5.** Exhausting to visit, ruinous to build, and the actual moments stop landing because everything shouts.
- **The orphan brand.** A subpage so quiet or so different it looks like another company. Usually means the inherits list was ignored.
- **Nav drift.** Different nav or footer treatments per site section. The chrome never changes.
- **Enthusiasm-driven temperature.** The careers page got the 3D hero because it was fun. Temperature follows journey importance, full stop.
