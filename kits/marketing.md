# The /mk-* Marketing Stack

A pipeline of 9 Claude Code skills that take a marketing site from blank page to shipped code, plus an 11-command router (`/mk-*`) for driving them deliberately.

Most AI-built marketing sites fail in predictable ways: pages get added with no map, the argument runs in the company's order instead of the visitor's, layouts collapse into the same 5-section template, motion is incoherent, and the handoff to code loses every design decision. This stack fixes each failure at its own layer, and the layers hand each other **named spec artifacts** so nothing gets reinterpreted downstream.

## The pipeline

Each skill owns one decision and produces one artifact. Downstream skills consume artifacts; they never re-decide upstream questions.

| # | Skill | Command | Produces |
|---|---|---|---|
| 1 | `marketing-site-architecture` | `/mk-plan` | site map, **PAGE SPEC**, **RIFF SHEET** |
| 2 | `conversion-architecture` | `/mk-convert` | **CONVERSION SPEC** |
| 3 | `retrieval-architecture` | `/mk-cite` | **RETRIEVAL SPEC** |
| 4 | `marketing-page-layout` | `/mk-page` | **LAYOUT SPEC** |
| 5 | `design-craft-library` | `/mk-find`, `/mk-extract` | library entries, **PATTERN EXTRACT** |
| 6 | `motion-direction` | `/mk-motion` | **MOTION SPEC** |
| 7 | `product-choreography` | `/mk-story` | **BEAT SHEET** |
| 8 | `web-build` | `/mk-build` | **BUILD SPEC** + kickoff prompt |
| 9 | `animation-craft` | `/mk-anim` | working animation (web / React Native / SwiftUI / video) |
| n/a | (router) | `/mk-review` | routes any artifact to its owning skill's review mode |

## The spec-contract chain

The system holds together through named artifacts, not vibes:

```
PAGE SPEC ─► CONVERSION SPEC ─► RETRIEVAL SPEC ─► LAYOUT SPEC ─► MOTION SPEC ─► BUILD SPEC ─► code
 (job,         (argument order,    (passages,         (sections,      (per-section    (stack, tokens,
  temperature)  proof, CTA)         answer blocks)     sizing, shapes)  reveal table)   components, perf)
                                          │
                                          └─► BEAT SHEET ──► animation-craft
                                             (hero/demo loop story)
```

- **PAGE SPEC**: what the page is for, its temperature, what it inherits from home.
- **CONVERSION SPEC**: the argument order, proof plan, CTA strategy. Becomes the layout's section-order constraint.
- **RETRIEVAL SPEC**: the passage plan: where section boundaries fall, what each one answers completely, which passage carries the number, and what must exist as prose rather than only inside a component. Serves search and AI answers as one strategy.
- **LAYOUT SPEC**: the section-by-section composition with shapes, sizing, and the signature moment. What web-build builds and what motion-direction references for section IDs.
- **MOTION SPEC**: personality, scroll clock, per-section reveal table, reduced-motion column.
- **BEAT SHEET**: one claim, timed beats, one mover per beat, implementation medium.
- **BUILD SPEC + kickoff prompt**: tokens, font loading, component map, CMS model, perf budget. The contract for the coding session.

Each skill, when an upstream spec is missing, names the skill that produces it rather than improvising the direction itself.

## Gate prefixes

Every skill enforces pass/fail gates, lettered per skill so a review can cite them unambiguously:

| Prefix | Skill |
|---|---|
| A1–A12 | marketing-site-architecture |
| C1–C7 | conversion-architecture |
| R1–R8 | retrieval-architecture |
| L1–L8 | marketing-page-layout |
| M1–M8 | motion-direction |
| B1–B8 | product-choreography |
| W1–W8 | web-build |
| K1–K9 | animation-craft |

## The /mk-* convention

Skills keep their descriptive folder names so Claude Code can auto-invoke them by description. The commands are thin routers: each names the skill, the mode, and the stop point, then passes your request through. Type `/mk-` and the whole stack lines up in the slash menu. The commands are for when you want to summon a layer deliberately instead of describing the work.

Skills and commands are complementary: the skills still auto-trigger when Claude recognizes the work; the commands are the deliberate entry points. Each command degrades gracefully: its skill's own SKILL.md states what it needs.

Want a different prefix? Rename the files in `commands/`. The prefix lives only in the filenames.

## Install

As a Claude Code plugin (skills and the `/mk-*` commands in one step):

```
/plugin marketplace add jcoger/skills
/plugin install marketing-stack@jcoger-skills
```

Skills only, for any agent that reads `SKILL.md`:

```bash
npx skills add jcoger/skills
```

Install all nine for the full pipeline, or cherry-pick. Each skill works on its own and names any missing upstream spec by skill.

## Usage

```
/mk-plan     map the site for a seed-stage B2B SaaS, one product, three personas
/mk-convert  sequence the persuasion for a switcher landing page
/mk-cite     plan the passages for the pricing page so it can be quoted
/mk-page     compose the homepage from the PAGE SPEC + CONVERSION SPEC
/mk-motion   pick a personality and write the motion spec
/mk-story    storyboard the hero animation: "we catch errors before they cost you"
/mk-build    spec the build for Claude Code from the specs in hand
/mk-anim     implement the hero and sticky-stack rows from the MOTION SPEC
/mk-review   audit anything: page, motion, conversion, retrieval, architecture, story, animation code, or build
```

A typical build runs left to right; a typical audit runs `/mk-review` first, then re-composes from the findings.

## Stack assumptions

- The layout and sizing systems are **Tailwind-first**; web-build targets **Next.js (App Router) + Tailwind v4** by default but documents its stack picker.
- `EVALUATE` / `AUDIT` modes capture screenshots via a browser MCP or Playwright when available, and flag when they can't.
- `animation-craft` covers web (Motion / GSAP / modern CSS), React Native (Reanimated 4 / Gesture Handler / Skia), SwiftUI, and video (Remotion).

## License

MIT. Use it, fork it, re-prefix it. Made by [Jarrett Coger](https://jcoger.com).
