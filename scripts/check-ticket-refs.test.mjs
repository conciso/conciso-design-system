// Tests für scripts/check-ticket-refs.mjs (Gate-Muster + Allowlist, CONTRIBUTING § 17).
// Stil wie scripts/release/*.test.mjs: node:test + node:assert/strict, keine Dependencies.
//
// PATTERN trägt den globalen Flag „g“ und ist damit zustandsbehaftet (lastIndex). Jeder Test
// arbeitet deshalb über eine frische Kopie der Regex, statt sich auf den einen Modul-weiten
// Export zu verlassen (String.prototype.matchAll würde das zwar an sich schon abfangen, die
// Kopie macht die Unabhängigkeit der Tests aber auch dann explizit, wenn das Muster später
// anders konsumiert wird).
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { PATTERN, isAllowlisted } from './check-ticket-refs.mjs';

function matches(text) {
  return [...text.matchAll(new RegExp(PATTERN.source, PATTERN.flags))];
}

test('Ticket 07 (Einzahl, mit Leerzeichen) trifft', () => {
  assert.equal(matches('Wie in Ticket 07 beschrieben').length, 1);
});

test('Tickets 01–09 (Mehrzahl) trifft', () => {
  assert.equal(matches('Kopfkommentar für Tickets 01–09 der Serie').length, 1);
});

test('.scratch/-Pfad trifft', () => {
  assert.equal(matches('siehe .scratch/angular-seitenbausteine/issues/05-icon-karte.md').length, 1);
});

test('Issue 12 (genau zwei Ziffern) trifft', () => {
  assert.equal(matches('Siehe Issue 12 für Details').length, 1);
});

test('Bulk-Batch trifft', () => {
  assert.equal(matches('Teil von Bulk-Batch A').length, 1);
});

test('spec.md ohne vorangestelltes .scratch/ trifft', () => {
  assert.equal(matches('Randbedingung 1, spec.md').length, 1);
});

test('spec.mdx (MDX-Datei, kein Tracker-Verweis) trifft nicht', () => {
  assert.equal(matches('siehe spec.mdx für die Story-Doku').length, 0);
});

test('spec.md vor einem Satzzeichen trifft weiterhin', () => {
  assert.equal(matches('siehe spec.md.').length, 1);
  assert.equal(matches('(spec.md)').length, 1);
});

test('legitime Texte ohne Ziffer treffen nicht', () => {
  assert.equal(
    matches('Ticket-Referenzen, Issue-Tracker, die Spec, ein Bulk-Import — alles ohne Ziffer').length,
    0,
  );
});

test('Wort „Tickets“ ohne Ziffer (echte Eintrittskarten, kein Tracker-Verweis) trifft nicht', () => {
  assert.equal(matches('Eintritts-Tickets für die Konferenz').length, 0);
});

test('mehrere Treffer in einer Zeile werden alle gezählt', () => {
  assert.equal(matches('Ticket 05 und Bulk-Batch A in einer Zeile').length, 2);
});

test('exakte Allowlist-Pfade sind ausgenommen', () => {
  assert.equal(isAllowlisted('docs/CHANGELOG-legacy.md'), true);
  assert.equal(isAllowlisted('.gitignore'), true);
  assert.equal(isAllowlisted('.prettierignore'), true);
  assert.equal(isAllowlisted('AGENTS.md'), true);
  assert.equal(isAllowlisted('docs/agents/issue-tracker.md'), true);
  assert.equal(isAllowlisted('scripts/check-ticket-refs.mjs'), true);
  assert.equal(isAllowlisted('scripts/check-ticket-refs.test.mjs'), true);
});

test('.agents/-Präfix ist ausgenommen (vendored, generische Tracker-Beschreibung)', () => {
  assert.equal(isAllowlisted('.agents/skills/to-tickets/SKILL.md'), true);
});

test('normale Dateien sind nicht ausgenommen', () => {
  assert.equal(
    isAllowlisted('angular-lib/projects/design-system-angular/src/lib/table/table.component.ts'),
    false,
  );
});
