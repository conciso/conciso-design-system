// Pinnt, dass die Paket-README (README.md, wird mit ausgeliefert) dieselbe Anzahl fester Regeln
// aufzählt wie die Server-instructions (src/instructions.mjs). Zählt nur die nummerierten Zeilen
// zwischen den beiden Anker-Sätzen, nicht den Wortlaut: eine inhaltliche Änderung einer Regel
// bleibt weiterhin Handarbeit, aber eine ganz vergessene oder verwaiste Regel wird erkannt.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

import { OWN_RULE_COUNT } from '../src/instructions.mjs';

const README_PATH = join(dirname(fileURLToPath(import.meta.url)), '..', 'README.md');
const RULES_START_MARKER = 'feste Regeln mit:';
const RULES_END_MARKER = 'Weitere Eigenschaften:';

test('README: Anzahl der aufgelisteten festen Regeln stimmt mit instructions.mjs überein', () => {
  const readme = readFileSync(README_PATH, 'utf8');
  const startIndex = readme.indexOf(RULES_START_MARKER);
  const endIndex = readme.indexOf(RULES_END_MARKER);
  assert.ok(
    startIndex !== -1 && endIndex !== -1 && startIndex < endIndex,
    `README-Anker „${RULES_START_MARKER}“/„${RULES_END_MARKER}“ nicht gefunden oder in falscher Reihenfolge. README.md umstrukturiert?`,
  );

  const rulesSection = readme.slice(startIndex, endIndex);
  const readmeRuleCount = (rulesSection.match(/^\d+\.\s/gm) ?? []).length;

  assert.equal(
    readmeRuleCount,
    OWN_RULE_COUNT,
    `README zählt ${readmeRuleCount} Regeln, instructions.mjs liefert ${OWN_RULE_COUNT}. ` +
      'README.md unter „Beim Verbinden gibt der Server…“ nachziehen.',
  );
});
