// Tests für tools/ci/pr-comment.mjs: Rendern des Sticky-Kommentars der PR-Vorschau und der
// Umgang mit story-links.json als Fremddaten.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MARKER, MAX_KOMPONENTEN, bereinigeLinks, escape, linkFuer, rendereKommentar } from './pr-comment.mjs';

const VORSCHAU = 'https://conciso.github.io/conciso-design-system/pr-preview/pr-73/';
const SHA = 'd14f9c4aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';

const links = (teile = {}) => ({
  base: 'ae0d282',
  head: SHA,
  previewRoot: 'https://egal.example/',
  baseIndexSource: 'merge-base',
  global: { flag: false, files: [] },
  summaryOnly: false,
  components: [],
  docsPages: [],
  unmapped: [],
  ...teile,
});

const komponente = (teile = {}) => ({
  title: 'Komponenten/Dialog/Bestätigungsdialog',
  status: 'new',
  docs: { id: 'komponenten-dialog-bestätigungsdialog--docs', url: 'https://evil.example/' },
  stories: [
    { id: 'komponenten-dialog-bestätigungsdialog--standard', name: 'Standard', status: 'new', url: 'x', because: [] },
    { id: 'komponenten-dialog-bestätigungsdialog--gefahr', name: 'Gefahr', status: 'new', url: 'x', because: [] },
  ],
  ...teile,
});

test('Kommentar beginnt mit dem Marker und nennt Vorschau und Stand', () => {
  const md = rendereKommentar({ vorschau: VORSCHAU, sha: SHA, links: links() });
  assert.ok(md.startsWith(`${MARKER}\n`));
  assert.match(md, new RegExp(`\\[Vorschau öffnen\\]\\(${VORSCHAU.replace(/[.]/g, '\\.')}\\)`));
  assert.match(md, /Stand `d14f9c4`/);
  assert.match(md, /Keine neuen oder geänderten Stories erkannt\./);
});

test('neue Komponente: Übersicht und Stories mit codierten Deep-Links', () => {
  const md = rendereKommentar({ vorschau: VORSCHAU, sha: SHA, links: links({ components: [komponente()] }) });
  assert.match(md, /### Neue Komponenten/);
  assert.doesNotMatch(md, /### Geänderte Komponenten/);
  const id = encodeURIComponent('komponenten-dialog-bestätigungsdialog--standard');
  assert.ok(md.includes(`[Standard](${VORSCHAU}?path=/story/${id})`));
  assert.ok(md.includes(`[Übersicht](${VORSCHAU}?path=/docs/${encodeURIComponent('komponenten-dialog-bestätigungsdialog--docs')})`));
  assert.match(md, /%C3%A4/); // Umlaut codiert
});

test('geänderte Komponenten und Doku-Seiten werden getrennt aufgeführt', () => {
  const md = rendereKommentar({
    vorschau: VORSCHAU,
    sha: SHA,
    links: links({
      components: [komponente({ title: 'Komponenten/Feedback/Snackbar', status: 'changed', docs: null, stories: [{ id: 'snackbar--info', name: 'Info', status: 'changed' }] })],
      docsPages: [{ id: 'komponenten-feedback-snackbar--verwendung', title: 'Komponenten/Feedback/Snackbar', name: 'Verwendung', status: 'changed' }],
    }),
  });
  assert.match(md, /### Geänderte Komponenten/);
  assert.match(md, /### Doku-Seiten/);
  assert.ok(md.includes(`?path=/docs/komponenten-feedback-snackbar--verwendung)`));
});

test('summaryOnly: nur Titel, kein Story-Link', () => {
  const md = rendereKommentar({ vorschau: VORSCHAU, sha: SHA, links: links({ summaryOnly: true, components: [komponente()] }) });
  assert.doesNotMatch(md, /\[Standard\]/);
  assert.match(md, /Bestätigungsdialog\*\*\]\(/);
  assert.match(md, /nur die Titel/);
});

test('globale Änderung verweist auf die Vorschau-Wurzel', () => {
  const md = rendereKommentar({
    vorschau: VORSCHAU,
    sha: SHA,
    links: links({ global: { flag: true, files: ['packages/css/css/base.css'] } }),
  });
  assert.match(md, /### Globale Änderung/);
  assert.match(md, /`packages\/css\/css\/base\.css`/);
  assert.doesNotMatch(md, /Keine neuen/);
});

test('nicht zugeordnete Pfade stehen im aufklappbaren Abschnitt', () => {
  const md = rendereKommentar({ vorschau: VORSCHAU, sha: SHA, links: links({ unmapped: ['packages/angular/src/lib/shared/x.scss'] }) });
  assert.match(md, /<details><summary>Änderungen ohne zugeordnete Story<\/summary>/);
  assert.match(md, /- `packages\/angular\/src\/lib\/shared\/x\.scss`/);
});

test('Hinweis zum Basis-Index bei Fallback', () => {
  assert.match(rendereKommentar({ vorschau: VORSCHAU, sha: SHA, links: links({ baseIndexSource: 'pages-main' }) }), /Näherung/);
  assert.match(rendereKommentar({ vorschau: VORSCHAU, sha: SHA, links: links({ baseIndexSource: 'unavailable' }) }), /Kein Vergleichsstand/);
});

test('fehlende Datei: nur Vorschau-Link und ehrlicher Hinweis', () => {
  const md = rendereKommentar({ vorschau: VORSCHAU, sha: SHA, links: null });
  assert.match(md, /nicht vor/);
  assert.match(md, /Vorschau öffnen/);
  assert.doesNotMatch(md, /###/);
});

test('ungültige Form: kein Wurf, Hinweis im Kommentar', () => {
  for (const kaputt of [[], 'text', 42, { components: 'x' }, {}]) {
    const md = rendereKommentar({ vorschau: VORSCHAU, sha: SHA, links: kaputt });
    assert.ok(md.startsWith(MARKER));
    assert.match(md, /nicht vor/);
  }
});

test('Fremddaten: Markdown in Titeln wird zu Text, URLs aus der Datei zählen nicht', () => {
  const md = rendereKommentar({
    vorschau: VORSCHAU,
    sha: SHA,
    links: links({
      components: [
        komponente({
          title: '[Gewinnspiel](https://evil.example/login) <img src=x onerror=alert(1)>\n@maintainer',
          stories: [{ id: 'ok--eins', name: '`x` | **fett**', status: 'new', url: 'https://evil.example/' }],
        }),
      ],
    }),
  });
  // Der Text darf als Text erscheinen, aber nie als Link-Ziel.
  assert.doesNotMatch(md, /\]\(https:\/\/evil/);
  assert.doesNotMatch(md, /\]\(https:\/\/[^)]*evil/);
  assert.equal(md.match(/\]\(https?:\/\/[^)]+\)/g).every((l) => l.includes('conciso.github.io')), true);
  assert.doesNotMatch(md, /(?<!\\)<img/);
  assert.doesNotMatch(md, /\[Gewinnspiel\]\(/);
  assert.match(md, /\\\[Gewinnspiel\\\]/);
  assert.match(md, /\\@maintainer/);
});

test('Fremddaten: ungültige IDs und Pfade werden verworfen', () => {
  const d = bereinigeLinks(
    links({
      components: [
        komponente({
          docs: { id: 'a/../b?x=1' },
          stories: [
            { id: 'gut--eins', name: 'Eins', status: 'new' },
            { id: 'schlecht)](https://evil.example', name: 'Zwei', status: 'new' },
            { id: 'gut--drei', name: '', status: 'new' },
          ],
        }),
      ],
      unmapped: ['packages/css/a.css', 'x`; rm -rf /', 'a b.css', 7],
      global: { flag: true, files: ['../../etc/passwd`', 'packages/css/css/base.css'] },
    }),
  );
  assert.equal(d.komponenten[0].docs, null);
  assert.deepEqual(d.komponenten[0].stories.map((s) => s.id), ['gut--eins']);
  assert.deepEqual(d.nichtZugeordnet, ['packages/css/a.css']);
  assert.deepEqual(d.globalDateien, ['packages/css/css/base.css']);
});

test('Anzahl der Komponenten ist begrenzt', () => {
  const viele = Array.from({ length: MAX_KOMPONENTEN + 5 }, (_, i) => komponente({ title: `K${i}`, stories: [] }));
  const md = rendereKommentar({ vorschau: VORSCHAU, sha: SHA, links: links({ components: viele }) });
  assert.match(md, /… und 5 weitere Komponenten/);
  assert.ok(md.length < 60_000);
});

test('escape: Steuerzeichen, Länge, Sonderzeichen', () => {
  assert.equal(escape('a\nb\u0000c'), 'a b c');
  assert.equal(escape('x'.repeat(300)).length, 120);
  assert.equal(escape('[a](b)'), '\\[a\\]\\(b\\)');
  assert.equal(escape(undefined), '');
});

test('linkFuer: ergänzt den Schrägstrich und codiert die ID', () => {
  assert.equal(linkFuer('https://h/pr-preview/pr-1', 'story', 'a b--c'), 'https://h/pr-preview/pr-1/?path=/story/a%20b--c');
});
