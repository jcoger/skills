#!/usr/bin/env node
// token-lint: the deterministic floor of the Mobile Kit "hold" (gate D1/D2).
// Scans the component layer for the drift a coding agent introduces over time:
// raw hex/rgb colors, raw fontSize/fontWeight literals, and off-8pt-grid spacing.
// Conservative by design (few false positives); the mobile-audit AUDIT pass covers
// everything a script can't see (states, platform fit, hierarchy, a11y).
//
// Usage:
//   node token-lint.mjs <dir> [--tokens <glob-substr>] [--grid 4] [--quiet]
// Exits 1 when violations exist so it can gate a code review (for example the
// compound-engineering plugin's ce-code-review).
//
// v0: color + weight + spacing checks. Expands toward the full D-gate set over time.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, extname, basename } from 'node:path'

const args = process.argv.slice(2)
const root = args.find((a) => !a.startsWith('--')) ?? '.'
const grid = Number(valFor('--grid') ?? 4)
const quiet = args.includes('--quiet')
// token/theme/config files are ALLOWED to hold raw values, so exclude them
const tokenHint = (valFor('--tokens') ?? 'token,theme,palette,colors,design-system').split(',')

function valFor(flag) {
  const i = args.indexOf(flag)
  return i >= 0 ? args[i + 1] : undefined
}

const CODE_EXT = new Set(['.tsx', '.jsx', '.ts', '.js'])
const SKIP_DIR = new Set(['node_modules', '.git', '.expo', 'ios', 'android', 'build', 'dist', '__tests__'])

const HEX = /#[0-9a-fA-F]{3,8}\b/
const RGB = /\brgba?\(/
const FONT_WEIGHT = /fontWeight\s*:\s*(['"]?\d{3}['"]?)/
const FONT_SIZE = /fontSize\s*:\s*(\d+(?:\.\d+)?)/
const SPACING = /\b(padding|margin|gap|top|bottom|left|right|rowGap|columnGap)(?:Top|Bottom|Left|Right|Horizontal|Vertical|Start|End)?\s*:\s*(\d+(?:\.\d+)?)/g

function isTokenFile(path) {
  const b = basename(path).toLowerCase()
  return tokenHint.some((h) => h && path.toLowerCase().includes(h.trim())) || b.includes('token')
}

function* walk(dir) {
  let entries
  try { entries = readdirSync(dir) } catch { return }
  for (const name of entries) {
    if (SKIP_DIR.has(name)) continue
    const p = join(dir, name)
    let s
    try { s = statSync(p) } catch { continue }
    if (s.isDirectory()) yield* walk(p)
    else if (CODE_EXT.has(extname(p))) yield p
  }
}

const findings = []
function add(file, line, rule, detail, fix) {
  findings.push({ file, line, rule, detail, fix })
}

let scanned = 0
for (const file of walk(root)) {
  if (isTokenFile(file)) continue
  let src
  try { src = readFileSync(file, 'utf8') } catch { continue }
  scanned++
  const lines = src.split('\n')
  lines.forEach((text, i) => {
    const ln = i + 1
    if (/\/\/\s*lint-ok/.test(text)) return
    // D1 color
    const hex = text.match(HEX)
    if (hex && !/^\s*\/\//.test(text)) add(file, ln, 'D1 color', `raw hex ${hex[0]}`, 'reference a semantic color token (e.g. colors.brand.primary)')
    if (RGB.test(text)) add(file, ln, 'D1 color', 'raw rgb()/rgba()', 'reference a color token; apply opacity via a token or a documented exception')
    // D2 type
    const fw = text.match(FONT_WEIGHT)
    if (fw) add(file, ln, 'D2 weight', `raw fontWeight ${fw[1]}`, 'use a weight token from the closed set (≤3 weights)')
    const fs = text.match(FONT_SIZE)
    if (fs) add(file, ln, 'D2 size', `raw fontSize ${fs[1]}`, 'use a type-scale token (body ≥ 17/14); never hardcode against Dynamic Type')
    // D1 spacing: off the grid
    let m
    SPACING.lastIndex = 0
    while ((m = SPACING.exec(text))) {
      const val = Number(m[2])
      if (val !== 0 && val % grid !== 0) add(file, ln, 'D1 spacing', `${m[1]}: ${val} is off the ${grid}pt grid`, `round to a spacing-scale token (multiple of ${grid})`)
    }
  })
}

// report
const byRule = findings.reduce((acc, f) => ((acc[f.rule.split(' ')[0]] = (acc[f.rule.split(' ')[0]] || 0) + 1), acc), {})
if (!quiet) {
  for (const f of findings) {
    console.log(`${f.file}:${f.line}  [${f.rule}] ${f.detail}\n    → ${f.fix}`)
  }
  console.log('')
}
console.log(`token-lint: scanned ${scanned} files · ${findings.length} violations` +
  (findings.length ? `  (${Object.entries(byRule).map(([k, v]) => `${k}:${v}`).join(' ')})` : ' · clean'))
process.exit(findings.length ? 1 : 0)
