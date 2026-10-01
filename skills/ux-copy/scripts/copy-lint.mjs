#!/usr/bin/env node
/**
 * copy-lint: the deterministic floor for UI strings.
 *
 * Catches only what a regex can be sure about. Everything requiring judgment
 * is a WARN, not an ERROR, because a lint that cries wolf gets switched off.
 *
 *   node copy-lint.mjs <dir> [--config copy-lint.json] [--warn] [--json]
 *
 * Exit 1 on any ERROR. WARNs never fail the build unless --warn is passed.
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, extname, relative } from "node:path";

const args = process.argv.slice(2);
const root = args.find((a) => !a.startsWith("--")) ?? ".";
const failOnWarn = args.includes("--warn");
const asJson = args.includes("--json");
const cfgFlag = args.indexOf("--config");
const cfgPath = cfgFlag > -1 ? args[cfgFlag + 1] : join(root, "copy-lint.json");

const DEFAULTS = {
  bannedPhrases: ["curated", "bespoke", "seamless", "elevate", "world-class", "best-in-class"],
  bannedLabels: ["submit", "click here", "tap here", "learn more", "oops"],
  allowAllCaps: ["OK", "PDF", "CSV", "JSON", "URL", "API", "ID", "AM", "PM", "USD", "TK", "HEIC", "JPEG", "PNG", "SMS", "GPS", "PIN", "FAQ", "HD", "AI", "QR"],
  maxLen: { default: 200 },
  ignore: ["node_modules", ".git", "dist", "build", ".next", "ios", "android", "__tests__", "__fixtures__"],
  exts: [".tsx", ".ts", ".jsx", ".js", ".swift", ".kt"],
};
const cfg = existsSync(cfgPath)
  ? { ...DEFAULTS, ...JSON.parse(readFileSync(cfgPath, "utf8")) }
  : DEFAULTS;

/* ── string extraction ───────────────────────────────────────────────────
   Deliberately conservative. A missed string is cheaper than a false hit on
   a class name or an import path, which is what teaches people to ignore it. */
const CODEY =
  /^(?:[a-z]+[A-Z]|[\w.-]*\/|https?:|#|\.|@|[A-Z_]+$|M\s?[\d.]|[\d\s.,%-]+$)|(?:px|rem|em|vh|vw|deg|ms)$|^(?:[a-z-]+:)|^\S+\.(?:json|js|ts|tsx|jsx|mjs|css|png|jpg|svg|sqlite|db)$/;
const CLASSY = /(?:flex|grid|text-|bg-|px-|py-|mt-|mb-|w-|h-|rounded|border|absolute|relative|font-)/;

const COPY_PROPS =
  /^(?:title|body|label|line|hint|note|cost|why|text|message|caption|placeholder|description|eyebrow|foot|alt|accessibilityLabel|aria-label|subtitle|heading|error|helper)$/;

function candidates(src) {
  const out = [];
  const lines = src.split("\n");
  let inBlock = false;
  lines.forEach((line, i) => {
    // Block comments: a JSX {/* ... */} block's continuation lines start with
    // prose, so a line-shape test alone lints the whole comment as copy.
    if (inBlock) {
      if (/\*\//.test(line)) inBlock = false;
      return;
    }
    if (/\/\*/.test(line) && !/\*\//.test(line.slice(line.indexOf("/*") + 2))) {
      inBlock = true;
      return;
    }
    if (/^\s*(?:\/\/|\*|\/\*)/.test(line)) return;
    const seen = new Set();
    // Copy-bearing component props carry strings the bare patterns miss.
    // (Alert.Title, Button.Label, ListGroup.ItemTitle, object-literal copy fields.)
    for (const re of [
      /"([^"\\]{3,300})"/g,
      /'([^'\\]{3,300})'/g,
      />\s*([A-Za-z][^<>{}\n]{3,300}?)\s*</g,
      /\b(?:title|body|label|line|hint|note|cost|why|text|message|caption|placeholder|description|eyebrow|foot)\s*[:=]\s*"([^"\\]{3,300})"/g,
    ]) {
      let m;
      while ((m = re.exec(line))) {
        const s = m[1].trim();
        if (!s || seen.has(s)) continue;
        if (CODEY.test(s) || CLASSY.test(s)) continue;
        if (!/[a-zA-Z]{3}/.test(s)) continue;
        // A single-token string in JSX attribute position is a prop value unless
        // the attribute is on the copy allowlist. Both conditions are required:
        // `label="Done"` is one token and IS copy.
        if (!/\s/.test(s)) {
          const before = line.slice(0, m.index);
          const attr = before.match(/([A-Za-z_$][\w$]*)\s*=\s*["']?$/);
          if (attr && !COPY_PROPS.test(attr[1])) continue;
          if (!attr && s.length < 6) continue; // bare short token: probably a key
        }
        seen.add(s);
        out.push({ line: i + 1, text: s, col: m.index + 1 });
      }
    }
  });
  return out;
}

/* ── rules ─────────────────────────────────────────────────────────────── */
const rules = [
  { id: "em-dash", level: "error", test: (s) => s.includes("\u2014"),
    msg: "Em dash. Use a period, a comma, or a line break." },

  { id: "semicolon", level: "error", test: (s) => /\w;\s/.test(s),
    msg: "Semicolon. Split into two sentences." },

  { id: "exclamation", level: "error", test: (s) => /!(?:\s|$|")/.test(s),
    msg: "Exclamation mark. Hard to localize, easy to overuse." },

  { id: "ampersand", level: "error", test: (s) => /\s&\s/.test(s),
    msg: "Ampersand joining words. Spell out 'and'." },

  { id: "slash-join", level: "error", test: (s) => /\b[a-z]{3,}\/[a-z]{3,}\b/i.test(s) && !/https?/.test(s),
    msg: "Slash joining ideas. Use 'and' or 'or'. Never 'and/or'." },

  { id: "banned-phrase", level: "error",
    test: (s) => cfg.bannedPhrases.find((p) => new RegExp(`\\b${p}\\b`, "i").test(s)),
    msg: (h) => `Banned phrase: "${h}".` },

  { id: "banned-label", level: "error",
    test: (s) => cfg.bannedLabels.find((p) => new RegExp(`^${p}\\b`, "i").test(s.trim())),
    msg: (h) => `Banned label: "${h}". Name the specific action.` },

  { id: "internal-ref", level: "error",
    test: (s) => /\b\w+\.(?:js|ts|tsx|jsx|mjs|json|md)\b/.test(s) || /\b(?:TODO|FIXME|XXX|HACK)\b/.test(s),
    msg: "Names a file or carries a code marker. Internal reference in a user-facing string." },

  { id: "directional", level: "error",
    test: (s) => /\b(?:above|below|to the left|to the right|at the bottom|at the top|upper[- ]right|lower[- ]left)\b/i.test(s),
    msg: "Directional language. Order by time (first, next, finally), not by position." },

  { id: "please", level: "error", test: (s) => /\bplease\b/i.test(s),
    msg: "'Please' makes a required step read as optional." },

  { id: "adj-as-adverb", level: "error",
    // Narrow on purpose. `faster`, `slower`, `harder`, `quicker` are established
    // flat adverbs in English and are NOT errors. Only the genuinely wrong ones.
    test: (s) => (s.match(/\b(?:type|salt|season|move|press|tap|click|write|cook|run|load|scroll|swipe|stir)\s+(?:lighter|softer|different|easy|careful|gentle)\b/i) || [])[0],
    msg: (h) => `Adjective doing an adverb's job: "${h}". Use the -ly form, or a stronger verb.` },

  { id: "compound-comma", level: "warn",
    test: (s) => {
      const m = s.match(/([^,.!?]{4,40}),\s+and\s+([^.!?]{4,60})/);
      if (!m) return null;
      // An independent clause after "and" makes the comma correct. Look for a
      // subject followed by a verb.
      if (/^(?:you|we|it|they|he|she|i|that|this|there)\s+\w/i.test(m[2].trim())) return null;
      if (/\b(?:is|are|was|were|has|have|had|does|do|did|will|can|could|would|should|becomes?|gets?|goes|stays?)\b/i.test(m[2])) return null;
      return `${m[1].trim()}, and ${m[2].trim()}`.slice(0, 70);
    },
    msg: (h) => `Possible comma splice in a compound predicate: "${h}". One subject with two objects or two verbs takes no comma before 'and'.` },

  { id: "impossible-agent", level: "warn",
    test: (s) => (s.match(/\bthe\s+(?:list|shop|app|system|page|screen|form|file|engine|database|server)\s+(?:knows|thinks|wants|believes|decides|remembers|buys|feels|hopes)\b/i) || [])[0],
    msg: (h) => `A thing given a mind: "${h}". Name the person doing it, or state the fact plainly.` },

  { id: "orphan-referent", level: "warn",
    test: (s) => /^(?:It|This|That|They|Those|These)\b/.test(s.trim()) && s.trim().split(/\s+/).length > 3,
    msg: "Opens with a pronoun. Strings are read out of context. Name the thing." },

  { id: "team-voice", level: "warn",
    test: (s) => (s.match(/\b(?:we should|we decided|we don't|we do not|we chose|the reason this|which is the point|that is the point|not a \w+ spec)\b/i) || [])[0],
    msg: (h) => `Narrative leak: "${h}". The product is arguing for itself. Belongs in a doc or a comment.` },

  { id: "all-caps-emphasis", level: "warn",
    test: (s) => {
      const t = s.trim();
      // A wholly-uppercase short string is a label or an eyebrow, which is a
      // legitimate pattern. Emphasis is caps sitting inside ordinary prose.
      if (/^[^a-z]+$/.test(t) && t.split(/\s+/).length <= 4) return null;
      if (!/[a-z]/.test(t)) return null;
      const caps = (t.match(/\b[A-Z]{2,}\b/g) ?? []).filter((c) => !cfg.allowAllCaps.includes(c));
      return caps.length ? caps.join(" ") : null;
    },
    msg: (h) => `All caps inside a sentence: "${h}". Caps are for acronyms and standalone labels, never emphasis.` },

  { id: "over-budget", level: "warn",
    test: (s) => (s.length > cfg.maxLen.default ? String(s.length) : null),
    msg: (h) => `${h} characters, over the ${cfg.maxLen.default} default budget.` },
];

/* ── walk ──────────────────────────────────────────────────────────────── */
const findings = [];
(function walk(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const e of entries) {
    if (cfg.ignore.includes(e)) continue;
    const p = join(dir, e);
    let st; try { st = statSync(p); } catch { continue; }
    if (st.isDirectory()) { walk(p); continue; }
    if (!cfg.exts.includes(extname(p))) continue;
    let src; try { src = readFileSync(p, "utf8"); } catch { continue; }
    for (const c of candidates(src)) {
      for (const r of rules) {
        const hit = r.test(c.text);
        if (!hit) continue;
        findings.push({
          file: relative(process.cwd(), p), line: c.line, rule: r.id, level: r.level,
          message: typeof r.msg === "function" ? r.msg(hit) : r.msg,
          string: c.text.length > 90 ? c.text.slice(0, 87) + "..." : c.text,
        });
      }
    }
  }
})(root);

/* ── report ────────────────────────────────────────────────────────────── */
const errors = findings.filter((f) => f.level === "error");
const warns = findings.filter((f) => f.level === "warn");

if (asJson) {
  console.log(JSON.stringify({ errors, warns }, null, 2));
} else if (!findings.length) {
  console.log(`copy-lint: clean (${root})`);
} else {
  for (const group of [["ERROR", errors], ["WARN", warns]]) {
    const [label, list] = group;
    if (!list.length) continue;
    console.log(`\n${label} (${list.length})\n`);
    for (const f of list) {
      console.log(`  ${f.file}:${f.line}  [${f.rule}]`);
      console.log(`    ${f.message}`);
      console.log(`    → ${f.string}\n`);
    }
  }
  console.log(`copy-lint: ${errors.length} error(s), ${warns.length} warning(s)`);
  console.log(`WARNs need a human. Several are heuristics and some will be wrong.`);
}

process.exit(errors.length || (failOnWarn && warns.length) ? 1 : 0);
