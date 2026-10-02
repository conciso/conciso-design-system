#!/usr/bin/env node
// „Fast Exit“ für die langlaufenden Pflicht-Checks: entscheidet, ob ein PR überhaupt Dateien
// berührt, die der jeweilige Workflow prüft. Die Jobs selbst bleiben Pflicht-Checks im Ruleset
// für main (ein per Pfad-Filter nie gestarteter Workflow bliebe dort ewig auf „Waiting“);
// stattdessen läuft vorab ein billiger `changes`-Job, und der schwere Job wird bei `false`
// per `if:` übersprungen — GitHub wertet einen übersprungenen Job als bestanden.
//
// Aufruf: node tools/ci/changed-paths.mjs '<muster>' '<muster>' …
// Ausgabe: `relevant=true|false` nach $GITHUB_OUTPUT (und auf stdout).
//
// Fail-safe: Alles außer einem eindeutigen „nichts Relevantes geändert“ ergibt `true` —
// anderes Event als pull_request (push, workflow_dispatch, Aufruf aus publish.yml), nicht
// ermittelbarer Diff, kein Muster. Lieber einmal zu viel bauen, als eine Prüfung still ausfallen
// zu lassen.
//
// Diff-Basis: Bei pull_request checkt Actions den Merge-Commit von PR-Head und aktuellem Base
// aus; `HEAD^1` ist der Base-Stand. `git diff HEAD^1 HEAD` zeigt damit genau, was der PR
// gegenüber dem heutigen main ändert (Checkout mit fetch-depth: 2 genügt).
//
// Muster: `ordner/**` (alles darunter) oder ein exakter Dateipfad, dieselbe Schreibweise wie in
// den `paths:`-Listen der Workflows. Mehr braucht keine dieser Listen.
import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function matchesPattern(file, pattern) {
  if (pattern.endsWith('/**')) return file.startsWith(pattern.slice(0, -2));
  return file === pattern;
}

export function isRelevant(files, patterns) {
  return files.some((file) => patterns.some((pattern) => matchesPattern(file, pattern)));
}

// Gibt `true`/`false` zurück; `deps` macht Event und Diff für den Test ersetzbar.
export function decide(patterns, { event = process.env.GITHUB_EVENT_NAME, changedFiles = gitChangedFiles } = {}) {
  if (event !== 'pull_request' || patterns.length === 0) return true;
  let files;
  try {
    files = changedFiles();
  } catch {
    return true;
  }
  // Leerer Diff (z. B. leerer Merge-Commit) ist verdächtig → lieber laufen lassen.
  if (files.length === 0) return true;
  return isRelevant(files, patterns);
}

function gitChangedFiles() {
  const out = execFileSync('git', ['diff', '--name-only', 'HEAD^1', 'HEAD'], { encoding: 'utf8' });
  return out.split('\n').filter(Boolean);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const relevant = decide(process.argv.slice(2));
  const line = `relevant=${relevant}`;
  console.log(line);
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${line}\n`);
}
