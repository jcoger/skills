# Entry Template

Every entry is one file, one move, this exact shape. Rules first, then the template.

## Writing rules

1. **One move per entry.** If describing it needs an "and", split it into two entries.
2. **Specificity bar.** "Good hero" is useless. "Nav reduced to logo plus a single CTA so the page becomes a one-way corridor" is an entry. Name the exact mechanism.
3. **Portability test.** The move must work detached from the source brand. If it only works with that brand's assets, voice, or budget, it is not an entry.
4. **Distribution-safe.** No client names, internal design tokens, or proprietary copy. The public source URL is the only attribution.
5. **"Do not copy" is required.** Every source has something that should stay at the source: a color ramp, a timing value, an excess. Naming it is what separates a library from a clone kit.
6. **Tags from tag-taxonomy.md only.** Counts per group are defined there.
7. **IDs are permanent.** Next available number, zero-padded to 3 digits. Filename: NNN-kebab-case-name.md. Never renumber, never reuse.
8. **Why it works is written in the shared system vocabulary:** shape (split, grid, bento, rail, editorial, full-bleed, stack, gallery, sticky, band), signature moment, background system, motion personality (grounded, kinetic, editorial, playful, immersive).

## Template (copy exactly)

# NNN - Move name
- **Source:** url.com (observed YYYY-MM)
- **Tags:** archetype: x · domain: x · mood: x · cost: x
- **What:** What the move is, 2 sentences maximum.
- **Use when:** the conditions that earn it. **Skip when:** the conditions that disqualify it.
- **Why it works:** the mechanism, in shared vocabulary.
- **Build owner:** which sibling skill implements it (marketing-page-layout, motion-direction, marketing-site-architecture, conversion skill, or plain build).
- **Do not copy:** the part that should stay at the source.
- **Cost:** S (under 2h) / M (2 to 6h) / L (over 6h)

## Second sources

When EXTRACT dedupes a move into an existing entry, append a line under Source:
- **Also seen:** url.com (observed YYYY-MM), one clause on what their variant adds.
Three or more sources on one entry is a signal the move is a staple, worth noting in the one-liner.
