// Tests für scripts/release/compute-bump.mjs (Seam: Bump-Stufe aus gefilterten Commits —
// .scratch/automatische-releases/spec.md Regel 4).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeBump, nextVersion } from './compute-bump.mjs';

test('feat ergibt minor', () => {
  assert.equal(computeBump([{ subject: 'feat(button): Variante ghost ergänzen' }]), 'minor');
});

test('fix ergibt patch', () => {
  assert.equal(computeBump([{ subject: 'fix(a11y): Fokusring nachziehen' }]), 'patch');
});

test('perf ergibt patch', () => {
  assert.equal(computeBump([{ subject: 'perf(css): Bundle-Größe senken' }]), 'patch');
});

test('build(deps) ergibt patch', () => {
  assert.equal(computeBump([{ subject: 'build(deps): Angular auf 21.3 heben' }]), 'patch');
});

test('build ohne deps-Scope löst kein Release aus', () => {
  assert.equal(computeBump([{ subject: 'build(ci): Cache-Key ändern' }]), null);
});

test('! am Typ ergibt major, unabhängig vom Typ', () => {
  assert.equal(computeBump([{ subject: 'feat(lib)!: Pflichtfeld einführen' }]), 'major');
  assert.equal(computeBump([{ subject: 'build(deps)!: Peer-Range anheben' }]), 'major');
});

test('BREAKING CHANGE: im Footer ergibt major', () => {
  assert.equal(
    computeBump([
      { subject: 'fix(lib): Verhalten korrigieren', body: 'BREAKING CHANGE: altes Signal entfernt' },
    ]),
    'major',
  );
});

test('BREAKING-CHANGE: (Bindestrich-Schreibweise) im Footer ergibt ebenfalls major', () => {
  assert.equal(
    computeBump([
      { subject: 'fix(lib): Verhalten korrigieren', body: 'BREAKING-CHANGE: altes Signal entfernt' },
    ]),
    'major',
  );
});

test('BREAKING CHANGE mitten im Fließtext (kein eigenes Footer-Token) löst NICHT major aus', () => {
  // Conventional-Commits-Footer sind eigene Zeilen; eine bloße Erwähnung im Fließtext ist
  // kein Footer-Token und darf die Bump-Stufe nicht auf major heben.
  assert.equal(
    computeBump([
      {
        subject: 'fix(lib): Verhalten korrigieren',
        body: 'Dieser Fix behebt keine BREAKING CHANGE: es ist nur eine Erwähnung im Text.',
      },
    ]),
    'patch',
  );
});

test('docs ergibt kein Release', () => {
  assert.equal(computeBump([{ subject: 'docs(readme): Tippfehler beheben' }]), null);
});

test('höchste Stufe über mehrere Commits gewinnt', () => {
  assert.equal(
    computeBump([
      { subject: 'fix(a11y): Fokusring nachziehen' },
      { subject: 'feat(button): Variante ghost ergänzen' },
      { subject: 'docs(readme): Tippfehler beheben' },
    ]),
    'minor',
  );
});

test('leere Commit-Liste löst kein Release aus', () => {
  assert.equal(computeBump([]), null);
});

test('nextVersion erhöht die richtige Stelle und setzt niedrigere auf 0', () => {
  assert.equal(nextVersion('1.0.0', 'major'), '2.0.0');
  assert.equal(nextVersion('1.2.3', 'minor'), '1.3.0');
  assert.equal(nextVersion('1.2.3', 'patch'), '1.2.4');
  assert.equal(nextVersion('1.2.3', null), null);
});
