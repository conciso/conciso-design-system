// Tests für tools/ci/story-links.mjs (neue und geänderte Stories eines PRs → story-links.json).
// Stil wie tools/release/*.test.mjs: node:test + node:assert/strict, keine Dependencies.
//
// Seam ist buildStoryLinks(): reine Funktion über zwei Story-Indizes, die geänderten Dateien
// und den Dateiinhalten. Git und `storybook index` bleiben in der CLI-Hülle.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';
import { buildStoryLinks, parseNameStatus, storyUrl, MAX_COMPONENTS } from './story-links.mjs';

const ROOT = 'https://conciso.github.io/conciso-design-system/pr/73/';

// --- Hilfen für synthetische Indizes ---------------------------------------------------------

function story(title, name, importPath, extra = {}) {
  const id = `${slug(title)}--${slug(name)}`;
  return { type: 'story', id, title, name, importPath, tags: [], ...extra };
}
function autodocs(title, importPath) {
  return { type: 'docs', id: `${slug(title)}--übersicht`, title, name: 'Übersicht', importPath, tags: ['autodocs'] };
}
function mdx(title, name, importPath, extra = {}) {
  return { type: 'docs', id: `${slug(title)}--${slug(name)}`, title, name, importPath, tags: [], ...extra };
}
function slug(s) {
  return s.toLowerCase().replace(/[^a-zäöüß0-9]+/g, '-');
}
function index(...entries) {
  return { v: 5, entries: Object.fromEntries(entries.map((e) => [e.id, e])) };
}

const BUTTON = 'Komponenten/Aktionen/Button';
const CARD = 'Komponenten/Inhalte/Card';
const BUTTON_STORIES = './src/lib/button/button.stories.ts';
const CARD_STORIES = './src/lib/card/card.stories.ts';

const BASIS = [
  autodocs(BUTTON, BUTTON_STORIES),
  story(BUTTON, 'Primär', BUTTON_STORIES),
  story(BUTTON, 'Sekundär', BUTTON_STORIES),
  autodocs(CARD, CARD_STORIES),
  story(CARD, 'Standard', CARD_STORIES),
  mdx('Grundlagen/Farben', 'Farben', './src/docs/grundlagen/farben.mdx'),
];

function run({ base = index(...BASIS), head = index(...BASIS), changes, headFiles = {}, baseFiles = {} }) {
  return buildStoryLinks({
    base: 'b'.repeat(40),
    head: 'h'.repeat(40),
    previewRoot: ROOT,
    baseIndex: base,
    baseIndexSource: base ? 'merge-base' : 'unavailable',
    headIndex: head,
    changes: parseNameStatus(changes),
    headFiles,
    baseFiles,
  });
}

function ids(result) {
  return {
    components: result.components.map((c) => [c.title, c.status, c.stories.map((s) => `${s.id}:${s.status}`)]),
    docsPages: result.docsPages.map((d) => `${d.id}:${d.status}`),
  };
}

// --- URLs ------------------------------------------------------------------------------------

test('URL: Story und Docs-Seite unterscheiden sich im Pfad, die ID ist prozentkodiert', () => {
  assert.equal(
    storyUrl(ROOT, { type: 'story', id: 'komponenten-hero-störer--interaktiv' }),
    `${ROOT}?path=/story/komponenten-hero-st%C3%B6rer--interaktiv`,
  );
  assert.equal(
    storyUrl(ROOT, { type: 'docs', id: 'komponenten-feedback-bestätigungsdialog--übersicht' }),
    `${ROOT}?path=/docs/komponenten-feedback-best%C3%A4tigungsdialog--%C3%BCbersicht`,
  );
});

test('URL: fehlender Schrägstrich am Ende der Vorschau-Wurzel wird ergänzt', () => {
  assert.equal(storyUrl('https://x.test/pr/1', { type: 'story', id: 'a--b' }), 'https://x.test/pr/1/?path=/story/a--b');
});

// --- „neu“ aus dem Index-Diff ------------------------------------------------------------------

test('neu: Story nur im Head-Index ist neu, die übrigen Stories derselben Komponente nicht', () => {
  const neu = story(BUTTON, 'Tertiär', BUTTON_STORIES);
  const result = run({
    head: index(...BASIS, neu),
    changes: `M\tapps/storybook/src/lib/button/button.stories.ts`,
  });
  const button = result.components.find((c) => c.title === BUTTON);
  assert.equal(button.status, 'changed');
  assert.deepEqual(
    button.stories.map((s) => [s.name, s.status]),
    [
      ['Primär', 'changed'],
      ['Sekundär', 'changed'],
      ['Tertiär', 'new'],
    ],
  );
});

test('neu: Index-Diff findet neue Einträge auch ohne passende Dateiänderung (z. B. umbenannter Titel)', () => {
  const neu = story('Komponenten/Neu', 'Standard', './src/lib/neu/neu.stories.ts');
  const result = run({ head: index(...BASIS, neu), changes: '' });
  assert.deepEqual(ids(result).components, [['Komponenten/Neu', 'new', [`${neu.id}:new`]]]);
});

test('neu: ohne Basis-Index gelten die Einträge hinzugefügter Story-Dateien als neu', () => {
  const neu = [autodocs('Komponenten/Neu', './src/lib/neu/neu.stories.ts'), story('Komponenten/Neu', 'Standard', './src/lib/neu/neu.stories.ts')];
  const result = run({
    base: null,
    head: index(...BASIS, ...neu),
    changes: `A\tapps/storybook/src/lib/neu/neu.stories.ts`,
  });
  assert.equal(result.baseIndexSource, 'unavailable');
  assert.deepEqual(ids(result).components, [['Komponenten/Neu', 'new', ['komponenten-neu--standard:new']]]);
  assert.equal(result.components[0].docs.id, 'komponenten-neu--übersicht');
});

// --- „geändert“ aus der Datei-Zuordnung --------------------------------------------------------

test('geändert: Story-Datei → alle ihre Stories, die Komponente verlinkt ihre Übersicht', () => {
  const result = run({ changes: `M\tapps/storybook/src/lib/card/card.stories.ts` });
  assert.deepEqual(ids(result).components, [[CARD, 'changed', ['komponenten-inhalte-card--standard:changed']]]);
  const card = result.components[0];
  assert.equal(card.docs.url, `${ROOT}?path=/docs/komponenten-inhalte-card--%C3%BCbersicht`);
  assert.deepEqual(card.stories[0].because, ['apps/storybook/src/lib/card/card.stories.ts']);
});

test('geändert: MDX-Datei → Docs-Seite unter docsPages, keine Komponente', () => {
  const result = run({ changes: `M\tapps/storybook/src/docs/grundlagen/farben.mdx` });
  assert.deepEqual(ids(result), { components: [], docsPages: ['grundlagen-farben--farben:changed'] });
});

test('geändert: angehängte MDX-Seite landet unter docsPages, nicht als Komponente', () => {
  const verwendung = mdx(CARD, 'Verwendung', './src/docs/komponenten/card-verwendung.mdx', {
    storiesImports: [CARD_STORIES],
    tags: ['attached-mdx'],
  });
  const result = run({
    base: index(...BASIS, verwendung),
    head: index(...BASIS, verwendung),
    changes: `M\tapps/storybook/src/docs/komponenten/card-verwendung.mdx`,
  });
  assert.deepEqual(ids(result), { components: [], docsPages: ['komponenten-inhalte-card--verwendung:changed'] });
});

test('geändert: Datei im Lib-Ordner → Stories des gleichnamigen Story-Ordners', () => {
  const result = run({ changes: `M\tpackages/angular/src/lib/button/button.component.ts` });
  assert.deepEqual(ids(result).components, [
    [BUTTON, 'changed', ['komponenten-aktionen-button--primär:changed', 'komponenten-aktionen-button--sekundär:changed']],
  ]);
});

test('geändert: shared/ → Komponenten, die die Datei importieren', () => {
  const result = run({
    changes: `M\tpackages/angular/src/lib/shared/focus.ts`,
    headFiles: {
      'packages/angular/src/lib/shared/focus.ts': 'export const focus = 1;',
      'packages/angular/src/lib/card/card.component.ts': "import { focus } from '../shared/focus';",
      'packages/angular/src/lib/button/button.component.ts': "import { x } from '../shared/focus-trap';",
    },
  });
  assert.deepEqual(ids(result).components, [[CARD, 'changed', ['komponenten-inhalte-card--standard:changed']]]);
  assert.deepEqual(result.components[0].stories[0].because, ['packages/angular/src/lib/shared/focus.ts']);
});

test('geändert: Umbenennung im Lib-Ordner zählt für den neuen Pfad', () => {
  const result = run({ changes: `R100\tpackages/angular/src/lib/alt/card.ts\tpackages/angular/src/lib/card/card.ts` });
  assert.deepEqual(ids(result).components, [[CARD, 'changed', ['komponenten-inhalte-card--standard:changed']]]);
});

// --- CSS ---------------------------------------------------------------------------------------

const CARD_COMPONENT = {
  'packages/angular/src/lib/card/card.component.ts': "template: '<div class=\"card card-elevated\">'",
  'packages/angular/src/lib/button/button.component.ts': "template: '<button class=\"btn\">'",
  // Prosa in einer MDX-Seite zählt für CSS nicht: nur Story-Ordner werden zugeordnet.
  'apps/storybook/src/docs/grundlagen/farben.mdx': 'Die Klasse card taucht hier auch auf.',
};

test('CSS: geänderte Regel → erste Klasse jedes Selektors → Story-Ordner, die sie verwenden', () => {
  const result = run({
    changes: `M\tpackages/css/css/components.css`,
    baseFiles: { 'packages/css/css/components.css': '.card{padding:1px}\n.card .btn{margin:0}' },
    headFiles: {
      ...CARD_COMPONENT,
      'packages/css/css/components.css': '/* .btn im Kommentar */\n.card{padding:2px}\n.card .btn{margin:1px}',
    },
  });
  assert.deepEqual(ids(result), { components: [[CARD, 'changed', ['komponenten-inhalte-card--standard:changed']]], docsPages: [] });
  assert.deepEqual(result.unmapped, []);
});

test('CSS: Regeln in @media werden mit ihrem Kontext verglichen', () => {
  const result = run({
    changes: `M\tpackages/css/css/components.css`,
    baseFiles: { 'packages/css/css/components.css': '.btn{a:b}\n@media (max-width:1px){.card{a:b}}' },
    headFiles: { ...CARD_COMPONENT, 'packages/css/css/components.css': '.btn{a:b}\n@media (max-width:2px){.card{a:b}}' },
  });
  assert.deepEqual(ids(result).components.map((c) => c[0]), [CARD]);
});

test('CSS: Klasse, die kein Story-Ordner verwendet → Datei unter unmapped', () => {
  const result = run({
    changes: `M\tpackages/css/css/components.css`,
    baseFiles: { 'packages/css/css/components.css': '' },
    headFiles: { ...CARD_COMPONENT, 'packages/css/css/components.css': '.nirgends{a:b}' },
  });
  assert.deepEqual(result.components, []);
  assert.deepEqual(result.unmapped, ['packages/css/css/components.css']);
});

test('Token: neuer Token ist lokal → Regeln, die ihn per var() nutzen → deren Klassen', () => {
  const result = run({
    changes: `M\tpackages/css/css/tokens.css`,
    baseFiles: { 'packages/css/css/tokens.css': ':root{--a:1}' },
    headFiles: {
      ...CARD_COMPONENT,
      'packages/css/css/tokens.css': ':root{--a:1;--neu:2}',
      'packages/css/css/components.css': '.card{color:var(--neu)}\n.btn{color:var(--neu-x)}',
    },
  });
  assert.equal(result.global.flag, false);
  assert.deepEqual(ids(result).components.map((c) => c[0]), [CARD]);
});

test('Token: geänderter oder entfernter Wert ist global', () => {
  for (const head of [':root{--a:2}', ':root{}']) {
    const result = run({
      changes: `M\tpackages/css/css/tokens.css`,
      baseFiles: { 'packages/css/css/tokens.css': ':root{--a:1}' },
      headFiles: { 'packages/css/css/tokens.css': head },
    });
    assert.deepEqual(result.global, { flag: true, files: ['packages/css/css/tokens.css'] });
    assert.deepEqual(result.unmapped, []);
  }
});

test('Token: Custom Property in einer Klassen-Regel ist eine Regeländerung, nicht global', () => {
  const result = run({
    changes: `M\tpackages/css/css/dark-mode.css`,
    baseFiles: { 'packages/css/css/dark-mode.css': '[data-theme="dark"] .card{--a:1;color:red}' },
    headFiles: { ...CARD_COMPONENT, 'packages/css/css/dark-mode.css': '[data-theme="dark"] .card{--a:2;color:red}' },
  });
  assert.deepEqual(ids(result).components.map((c) => c[0]), [CARD]);
  assert.equal(result.global.flag, false);
});

test('Token: Selektor mit „|“ (Attribut-Selektor) verwirrt den Token-Vergleich nicht', () => {
  const result = run({
    changes: `M\tpackages/css/css/tokens.css`,
    baseFiles: { 'packages/css/css/tokens.css': '[lang|=de]{--a:1}' },
    headFiles: { 'packages/css/css/tokens.css': '[lang|=de]{--a:1;--b:2}' },
  });
  assert.equal(result.global.flag, false);
  assert.deepEqual(result.unmapped, ['packages/css/css/tokens.css']);
});

// --- global, ignoriert, nicht zugeordnet -------------------------------------------------------

test('global: base.css, fonts.css, Schriften und .storybook/ setzen das Flag', () => {
  const result = run({
    changes: [
      'M\tpackages/css/css/base.css',
      'M\tpackages/css/css/fonts.css',
      'A\tpackages/css/fonts/inter.woff2',
      'M\tapps/storybook/.storybook/preview.ts',
    ].join('\n'),
  });
  assert.deepEqual(result.global, {
    flag: true,
    files: ['apps/storybook/.storybook/preview.ts', 'packages/css/css/base.css', 'packages/css/css/fonts.css', 'packages/css/fonts/inter.woff2'],
  });
  assert.deepEqual(result.components, []);
  assert.deepEqual(result.unmapped, []);
});

test('ignoriert: Pfade ohne Stories erscheinen nirgends', () => {
  const result = run({
    changes: [
      'M\tCONTEXT.md',
      'M\tdocs/legacy-site/main.js',
      'M\ttools/consumer-fixture/src/app/app.ts',
      'M\tpackages/mcp/scripts/smoke-test.mjs',
      'M\tpackages/angular/src/public-api.ts',
      'A\tapps/storybook/visual-snapshots/x.png',
      'D\tapps/storybook/src/lib/weg/weg.stories.ts',
      'M\tapps/storybook/vitest.config.mts',
      'M\tapps/storybook/README.md',
      'M\tpackages/css/assets/brand/LICENSE',
    ].join('\n'),
  });
  assert.deepEqual(ids(result), { components: [], docsPages: [] });
  assert.deepEqual(result.unmapped, []);
  assert.equal(result.global.flag, false);
});

test('nicht zugeordnet: Storybook-relevante Datei ohne Regel oder ohne Treffer', () => {
  const result = run({
    changes: ['M\tpackages/css/scripts/build-tokens.mjs', 'M\tpackages/angular/src/lib/leer/leer.ts', 'M\tpackages/css/assets/brand/logo.svg'].join('\n'),
  });
  assert.deepEqual(result.unmapped, [
    'packages/angular/src/lib/leer/leer.ts',
    'packages/css/assets/brand/logo.svg',
    'packages/css/scripts/build-tokens.mjs',
  ]);
});

test('Marken-Asset: Dateiname im Story-Ordner → dessen Stories', () => {
  const result = run({
    changes: 'M\tpackages/css/assets/brand/logo.svg',
    headFiles: { 'apps/storybook/src/lib/card/card.stories.ts': "const src = 'assets/brand/logo.svg';" },
  });
  assert.deepEqual(ids(result).components.map((c) => c[0]), [CARD]);
});

test('Marken-Asset: Dateiname in einer MDX-Seite → diese Docs-Seite', () => {
  const result = run({
    changes: 'M\tpackages/css/assets/brand/logo.svg',
    headFiles: { 'apps/storybook/src/docs/grundlagen/farben.mdx': '<img src="assets/brand/logo.svg" />' },
  });
  assert.deepEqual(ids(result), { components: [], docsPages: ['grundlagen-farben--farben:changed'] });
});

test('Icon-Quelle → Icon-Übersicht der Grundlagen', () => {
  const icons = mdx('Grundlagen/Icons', 'Übersicht', './src/docs/grundlagen/icons.mdx');
  const result = run({
    base: index(...BASIS, icons),
    head: index(...BASIS, icons),
    changes: 'A\tpackages/css/icons/source/heroicons/x.svg',
  });
  assert.deepEqual(ids(result).docsPages, ['grundlagen-icons--übersicht:changed']);
});

// --- Begrenzung --------------------------------------------------------------------------------

test(`Begrenzung: ab mehr als ${MAX_COMPONENTS} Komponenten nur noch Titel (summaryOnly)`, () => {
  const viele = Array.from({ length: MAX_COMPONENTS + 1 }, (_, i) => story(`Komponenten/K${i}`, 'Standard', `./src/lib/k${i}/k.stories.ts`));
  assert.equal(run({ head: index(...BASIS, ...viele.slice(0, MAX_COMPONENTS)), changes: '' }).summaryOnly, false);
  const result = run({ head: index(...BASIS, ...viele), changes: '' });
  assert.equal(result.summaryOnly, true);
  // Die Liste selbst bleibt vollständig, die Kürzung ist Sache der Darstellung.
  assert.equal(result.components.length, MAX_COMPONENTS + 1);
});

// --- PR #73 (echte Indizes, Diff und Dateiausschnitte) ------------------------------------------

const FIXTURE = join(dirname(fileURLToPath(import.meta.url)), 'fixtures', 'pr-73');

function readTree(dir) {
  const files = {};
  (function walk(d) {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      if (statSync(p).isDirectory()) walk(p);
      else files[relative(dir, p).split(sep).join('/')] = readFileSync(p, 'utf8');
    }
  })(dir);
  return files;
}

test('PR #73: neuer Bestätigungsdialog, geänderte Feedback-Verwendung, nichts global', () => {
  const result = buildStoryLinks({
    base: 'ae0d282e652543b7d39b08a47a91d549edb94bbb',
    head: 'd14f9c4d5197999468b36ef035e128d0ad0f45bc',
    previewRoot: ROOT,
    baseIndex: JSON.parse(readFileSync(join(FIXTURE, 'base-index.json'), 'utf8')),
    baseIndexSource: 'merge-base',
    headIndex: JSON.parse(readFileSync(join(FIXTURE, 'head-index.json'), 'utf8')),
    changes: parseNameStatus(readFileSync(join(FIXTURE, 'name-status.txt'), 'utf8')),
    headFiles: readTree(join(FIXTURE, 'head')),
    baseFiles: readTree(join(FIXTURE, 'base')),
  });

  const because = [
    'apps/storybook/src/lib/dialog/confirm-dialog.stories.ts',
    'packages/angular/src/lib/dialog/confirm-dialog.component.ts',
    'packages/angular/src/lib/dialog/confirm-dialog.service.ts',
    'packages/css/css/components.css',
    'packages/css/css/dark-mode.css',
    'packages/css/css/tokens.css',
  ];
  const dialog = (slugPart, name) => ({
    id: `komponenten-feedback-bestätigungsdialog--${slugPart}`,
    name,
    status: 'new',
    url: `${ROOT}?path=/story/komponenten-feedback-best%C3%A4tigungsdialog--${encodeURIComponent(slugPart)}`,
    because,
  });

  assert.deepEqual(result, {
    base: 'ae0d282e652543b7d39b08a47a91d549edb94bbb',
    head: 'd14f9c4d5197999468b36ef035e128d0ad0f45bc',
    previewRoot: ROOT,
    baseIndexSource: 'merge-base',
    global: { flag: false, files: [] },
    summaryOnly: false,
    components: [
      {
        title: 'Komponenten/Feedback/Bestätigungsdialog',
        status: 'new',
        docs: {
          id: 'komponenten-feedback-bestätigungsdialog--übersicht',
          url: `${ROOT}?path=/docs/komponenten-feedback-best%C3%A4tigungsdialog--%C3%BCbersicht`,
        },
        stories: [
          dialog('interaktiv', 'Interaktiv'),
          dialog('unterbrechung', 'Unterbrechung (ungespeicherte Änderungen)'),
          dialog('selbst-ausgeloest', 'Selbst ausgelöst (Löschen)'),
          dialog('nicht-destruktiv', 'Nicht destruktiv'),
          dialog('textauswahl', 'Textauswahl bis außerhalb'),
          dialog('doppelt-geoeffnet', 'Doppelt geöffnet'),
          dialog('aufraeumen-beim-zerstoeren', 'Aufräumen beim Zerstören'),
          dialog('geoeffnet', 'Geöffnet'),
        ],
      },
    ],
    docsPages: [
      {
        id: 'komponenten-feedback-snackbar--verwendung',
        title: 'Komponenten/Feedback/Snackbar',
        name: 'Verwendung',
        status: 'changed',
        url: `${ROOT}?path=/docs/komponenten-feedback-snackbar--verwendung`,
        because: ['apps/storybook/src/docs/komponenten/feedback-verwendung.mdx'],
      },
    ],
    unmapped: [],
  });
});
