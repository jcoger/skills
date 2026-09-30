#!/usr/bin/env node
/**
 * mobile-ship preflight: run before every EAS/cloud build.
 *
 * Static checks (fast) for the known build-chain failures (see
 * references/eas-failure-catalog.md), then optionally proves the production
 * JS bundle locally with `expo export` (--bundle), which catches the
 * Hermes/transitive-dep class in ~2 minutes instead of a 15+ minute cloud cycle.
 *
 * Usage:
 *   node preflight.mjs [project-dir] [--bundle] [--platform ios|android]
 *
 * Exit codes: 0 = clean, 1 = failures found.
 */
import { execSync, spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const runBundle = args.includes('--bundle');
const platform = args.includes('--platform') ? args[args.indexOf('--platform') + 1] : 'ios';
const dir = resolve(args.find((a) => !a.startsWith('--') && a !== platform) ?? '.');

const failures = [];
const warnings = [];
const ok = [];

const read = (p) => (existsSync(join(dir, p)) ? readFileSync(join(dir, p), 'utf8') : null);
const readJson = (p) => {
  const raw = read(p);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { failures.push(`${p} is not valid JSON`); return null; }
};

// ── 1. Exactly one lockfile tracked (catalog #1) ────────────────────────────
const LOCKFILES = ['package-lock.json', 'pnpm-lock.yaml', 'yarn.lock', 'bun.lockb', 'bun.lock'];
let tracked = [];
try {
  const files = execSync('git ls-files', { cwd: dir, encoding: 'utf8' }).split('\n');
  tracked = LOCKFILES.filter((l) => files.includes(l));
} catch {
  tracked = LOCKFILES.filter((l) => existsSync(join(dir, l)));
  warnings.push('not a git repo (or git failed); checked lockfiles on disk instead of tracked');
}
if (tracked.length === 1) ok.push(`one lockfile: ${tracked[0]}`);
else if (tracked.length === 0) failures.push('no lockfile tracked: the cloud builder will guess your package manager');
else failures.push(`multiple lockfiles tracked (${tracked.join(', ')}); the builder may pick the wrong package manager (catalog #1)`);

// ── 2. packageManager pinned (catalog #1/#2) ────────────────────────────────
const pkg = readJson('package.json');
if (pkg?.packageManager) ok.push(`packageManager pinned: ${pkg.packageManager}`);
else failures.push('package.json has no "packageManager" field. Pin it (catalog #1)');

// ── 3. eas.json: Node pin + environment binding per profile (catalog #2, #7) ─
const eas = readJson('eas.json');
if (!eas?.build) {
  warnings.push('no eas.json build profiles found (skip if not using EAS)');
} else {
  for (const [name, profile] of Object.entries(eas.build)) {
    const chain = [profile];
    let p = profile;
    while (p?.extends && eas.build[p.extends]) { p = eas.build[p.extends]; chain.push(p); }
    const node = chain.find((c) => c.node)?.node;
    const env = chain.find((c) => c.environment)?.environment;
    if (node) ok.push(`profile "${name}": node ${node}`);
    else failures.push(`profile "${name}" has no Node pin; cloud default may be too old (catalog #2)`);
    if (env) ok.push(`profile "${name}": environment "${env}"`);
    else warnings.push(`profile "${name}" not bound to an EAS environment. Cloud builds do NOT read local .env (catalog #7)`);
  }
}

// ── 4. link:/file:/absolute deps (catalog #4) ───────────────────────────────
for (const field of ['dependencies', 'devDependencies']) {
  for (const [name, spec] of Object.entries(pkg?.[field] ?? {})) {
    if (/^(link:|file:\/|\/)/.test(String(spec))) {
      failures.push(`${field}.${name} = "${spec}": machine-local path will not resolve in the cloud (catalog #4)`);
    }
  }
}

// ── 5. babel/metro config deps must be direct (catalog #5) ──────────────────
const allDeps = { ...(pkg?.dependencies ?? {}), ...(pkg?.devDependencies ?? {}) };
const babelSrc = read('babel.config.js') ?? read('babel.config.cjs') ?? '';
for (const m of babelSrc.matchAll(/['"]([\w@][\w@/.-]*?)['"]/g)) {
  const name = m[1];
  if (/^(babel-preset-|@babel\/|babel-plugin-|react-native-|nativewind|expo)/.test(name) && !name.startsWith('.')) {
    const pkgName = name.startsWith('@') ? name.split('/').slice(0, 2).join('/') : name.split('/')[0];
    if (!allDeps[pkgName] && !['expo'].includes(pkgName)) {
      warnings.push(`babel.config references "${pkgName}" which is not a direct dependency; strict node_modules may not hoist it (catalog #5)`);
    }
  }
}

// ── 6. test-key scan (catalog #8) ───────────────────────────────────────────
for (const envFile of ['.env', '.env.production']) {
  const envSrc = read(envFile);
  if (!envSrc) continue;
  for (const line of envSrc.split('\n')) {
    const m = line.match(/^\s*(EXPO_PUBLIC_\w*(?:KEY|TOKEN)\w*)\s*=\s*["']?((?:test_|sk_test|pk_test)\S*)/i);
    if (m) failures.push(`${envFile}: ${m[1]} looks like a TEST key ("${m[2].slice(0, 12)}…"). Some SDKs deliberately crash release builds on test keys (catalog #8). Verify the EAS production environment holds the live key.`);
  }
}
warnings.push('this script cannot read the EAS cloud environment. Verify pushed vars with: eas env:list --environment production');

// ── 7. optional: prove the production bundle (catalog #4/#5/#6) ─────────────
if (runBundle && failures.length === 0) {
  console.log(`\n▶ npx expo export --platform ${platform}  (the exact Metro+Hermes bundle the cloud runs)…`);
  const r = spawnSync('npx', ['expo', 'export', '--platform', platform], { cwd: dir, stdio: 'inherit' });
  if (r.status === 0) ok.push('production bundle exports clean');
  else failures.push(`expo export --platform ${platform} failed (exit ${r.status}). Fix locally before spending a cloud build`);
} else if (runBundle) {
  warnings.push('skipped --bundle because static checks already failed');
} else {
  warnings.push('bundle not proven this run. Pass --bundle to run expo export (~2 min)');
}

// ── report ───────────────────────────────────────────────────────────────────
console.log('\nPREFLIGHT REPORT');
for (const line of ok) console.log(`  ✓ ${line}`);
for (const line of warnings) console.log(`  ⚠ ${line}`);
for (const line of failures) console.log(`  ✗ ${line}`);
console.log(failures.length ? `\nNOT READY: ${failures.length} failure(s).` : '\nCLEAN: static checks pass.');
process.exit(failures.length ? 1 : 0);
