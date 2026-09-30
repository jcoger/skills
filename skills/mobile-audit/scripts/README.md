# mobile-audit scripts

## token-lint.mjs

The deterministic floor of the kit's design "hold" (gates D1/D2). Greps the component layer for the drift coding agents introduce over time. Node ≥ 18, zero dependencies.

```bash
node token-lint.mjs <dir> [--tokens token,theme] [--grid 4] [--quiet]
```

**Checks (v0):**
- **D1 color**: raw hex (`#6366F1`) and `rgb()/rgba()` in component code.
- **D2 weight**: raw `fontWeight` literals (use a token from the closed ≤3-weight set).
- **D2 size**: raw `fontSize` literals (use a type-scale token).
- **D1 spacing**: `padding/margin/gap/...` values off the 8pt grid.

**Exit code:** `1` if any violations (so it can gate a review), `0` if clean.

**Conventions:**
- Token/theme files are excluded automatically (they're *allowed* to hold raw values). Tune with `--tokens`.
- `node_modules`, `ios`, `android`, build dirs, and `__tests__` are skipped.
- Add `// lint-ok` on a line to whitelist a documented exception.

**Scope:** intentionally conservative. It catches the mechanical drift, not the judgment calls. The `mobile-audit` AUDIT pass covers what a script can't see (states, platform fit, hierarchy, accessibility, over-expression). Lint is the floor; AUDIT is the bar.

**Roadmap:** v0 ships color/weight/spacing. Next: radius-scale + concentric-radius checks; a font-weight-set cardinality check across the app (flag a 4th distinct weight); an **em-dash-in-visible-strings** check (`—`/`–` in JSX text and string literals, the most reliable copy tell); heuristics for fake-precise numbers and generic placeholder names ("John Doe"/"Acme"); and an optional `--ci` summary format for a code-review step (for example the compound-engineering plugin's `ce-code-review`).
