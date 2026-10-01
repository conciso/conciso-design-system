// Neue und geänderte Stories eines PRs → story-links.json, die Eingabe für den PR-Kommentar
// der PR-Vorschau (das vollständige Storybook eines offenen PRs neben dem von main) und später
// für dessen Screenshots.
//
// Zwei Quellen:
// - „neu“: Diff zweier Story-Indizes (`storybook index`) am Merge-Base und am PR-Head. Exakt,
//   kennt aber keine inhaltlichen Änderungen.
// - „geändert“: Zuordnung der geänderten Dateien zu Stories nach den Ordnerkonventionen des Repos
//   (Story-/MDX-Pfad, Lib-Ordner ↔ Story-Ordner, Klassen-/Token-Suche für das CSS). Was eine
//   Storybook-relevante Datei ist, aber nichts trifft, landet unter `unmapped`, damit der
//   Kommentar es sagen kann statt es still wegzulassen.
//
// `storybook tools stories changed` taugt dafür nicht: kein Basis-Ref, der Barrel-Import
// (public-api.ts) markiert jede Story als geändert, CSS und MDX sieht es gar nicht.
//
// Aufbau: buildStoryLinks() ist rein (Indizes, Änderungsliste und Dateiinhalte rein, JSON raus)
// und trägt die Tests. Die CLI unten holt die Eingaben aus Git und `storybook index`.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, symlinkSync, unlinkSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

// Bei mehr als dieser Zahl Komponenten listet der Kommentar nur noch Titel (Link auf die Übersicht), keine
// einzelnen Stories mehr. Die JSON-Datei bleibt vollständig, die Kürzung ist Darstellung.
export const MAX_COMPONENTS = 15;

// Fallback, wenn `storybook index` am Merge-Base scheitert (z. B. weil der PR Abhängigkeiten
// hebt und der Basis-Stand mit den node_modules des Heads nicht mehr lädt). Spiegelt den Stand
// von main statt des Merge-Base: von main inzwischen entfernte Stories erscheinen fälschlich
// als neu, bis der PR aktualisiert wird. Als Notlösung vertretbar.
export const PAGES_INDEX_URL = 'https://conciso.github.io/conciso-design-system/index.json';

const STORYBOOK_DIR = 'apps/storybook';
const LIB_DIR = 'packages/angular/src/lib/';
const STORY_LIB_DIR = `${STORYBOOK_DIR}/src/lib/`;
const CSS_DIR = 'packages/css/css/';

// Betreffen jede Story; der Kommentar verlinkt dann die Wurzel statt 200 Einzel-Links.
const GLOBAL_FILES = [`${CSS_DIR}base.css`, `${CSS_DIR}fonts.css`];
const GLOBAL_PREFIXES = ['packages/css/fonts/', `${STORYBOOK_DIR}/.storybook/`];

// Storybook-relevante Bereiche (Pfadfilter von storybook-angular.yml, ohne die Teile, die
// keine Stories haben). Eine Datei hier, die keine Regel trifft, ist „nicht zugeordnet“;
// alles außerhalb wird stillschweigend ignoriert.
const RELEVANT_PREFIXES = [`${STORYBOOK_DIR}/`, 'packages/angular/src/', 'packages/css/'];
const IGNORED = [
  // Exportliste; neue Exporte zeigt der Index-Diff über ihre neuen Stories.
  'packages/angular/src/public-api.ts',
  // Screenshot-Baselines der Visual-Tests, kommen mit der Story-Änderung selbst.
  `${STORYBOOK_DIR}/visual-snapshots/`,
  // Werkzeug-Konfiguration der Storybook-App (Lint, Vitest), ändert keine gerenderte Story.
  `${STORYBOOK_DIR}/.gitignore`,
  `${STORYBOOK_DIR}/eslint.config.js`,
  `${STORYBOOK_DIR}/vitest.config.mts`,
  `${STORYBOOK_DIR}/visual-baseline-guard.mts`,
];
// Begleittexte (README, Lizenzen) neben Assets und Quellen.
const isProse = (path) => /(^|\/)(LICENSE[^/]*|[^/]+\.md)$/.test(path);

// Quell-SVGs des Icon-Sets: zu sehen auf der Icon-Übersicht der Grundlagen.
const ICON_SOURCES = 'packages/css/icons/';
const ICON_DOCS = './src/docs/grundlagen/icons.mdx';

// --- Hilfen ------------------------------------------------------------------------------------

/** URL einer Index-Entry in der Vorschau: /story/ für Stories, /docs/ für Docs-Seiten. */
export function storyUrl(previewRoot, entry) {
  const root = previewRoot.endsWith('/') ? previewRoot : `${previewRoot}/`;
  const kind = entry.type === 'docs' ? 'docs' : 'story';
  return `${root}?path=/${kind}/${encodeURIComponent(entry.id)}`;
}

/** Ausgabe von `git diff --name-status` → [{ status, path, oldPath? }]. */
export function parseNameStatus(text) {
  return text
    .split('\n')
    .map((line) => line.replace(/\r$/, ''))
    .filter(Boolean)
    .map((line) => {
      const [code, a, b] = line.split('\t');
      const status = code[0];
      return status === 'R' || status === 'C' ? { status, oldPath: a, path: b } : { status, path: a };
    });
}

// importPath im Index ist relativ zu apps/storybook („./src/lib/…“).
const toImportPath = (repoPath) => `./${repoPath.slice(STORYBOOK_DIR.length + 1)}`;
const isStoryFile = (p) => p.startsWith(`${STORYBOOK_DIR}/src/`) && /\.stories\.(ts|mdx)$/.test(p);
const isMdxFile = (p) => p.startsWith(`${STORYBOOK_DIR}/src/`) && p.endsWith('.mdx');
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// Ganzes Wort im Sinn von CSS-Bezeichnern: „card“ trifft nicht „card-elevated“.
const wordRe = (term) => new RegExp(`(?<![\\w-])${escapeRe(term)}(?![\\w-])`);

/** Story-Ordner einer Datei (Lib- oder Story-Seite), sonst null. */
function storyFolder(path) {
  for (const prefix of [LIB_DIR, STORY_LIB_DIR]) {
    if (path.startsWith(prefix)) {
      const rest = path.slice(prefix.length);
      if (rest.includes('/')) return rest.split('/')[0];
    }
  }
  return null;
}

// --- CSS ---------------------------------------------------------------------------------------

/**
 * Minimaler CSS-Parser: Regeln mit ihrem At-Rule-Kontext (@media …) und ihren Deklarationen.
 * Reicht für die Dateien in packages/css/css (keine Verschachtelung außer At-Rules).
 */
export function parseCss(text) {
  const src = text.replace(/\/\*[\s\S]*?(\*\/|$)/g, '');
  const rules = [];
  (function walk(from, to, context) {
    let i = from;
    while (i < to) {
      const open = src.indexOf('{', i);
      const semi = src.indexOf(';', i);
      if (open === -1 || open >= to) break;
      // `@import …;` und Ähnliches ohne Block überspringen.
      if (semi !== -1 && semi < open && !src.slice(i, semi).includes('}')) {
        i = semi + 1;
        continue;
      }
      let depth = 1;
      let j = open + 1;
      for (; j < to && depth > 0; j++) {
        if (src[j] === '{') depth++;
        else if (src[j] === '}') depth--;
      }
      const prelude = src.slice(i, open).replace(/}/g, '').trim().replace(/\s+/g, ' ');
      if (prelude.startsWith('@') && !prelude.startsWith('@font-face')) {
        walk(open + 1, j - 1, [...context, prelude]);
      } else {
        const declarations = src
          .slice(open + 1, j - 1)
          .split(';')
          .map((d) => d.trim())
          .filter(Boolean)
          .map((d) => {
            const colon = d.indexOf(':');
            return [d.slice(0, colon).trim(), d.slice(colon + 1).trim().replace(/\s+/g, ' ')];
          });
        rules.push({ context: context.join(' '), selector: prelude, declarations });
      }
      i = j;
    }
  })(0, src.length, []);
  return rules;
}

/** Erste Klasse jedes Selektors einer Regel: `[data-theme] .a .b, html:has(x.c)` → a, c. */
function leadingClasses(selector) {
  const classes = new Set();
  for (const part of selector.split(',')) {
    const match = /\.(-?[_a-zA-Z][\w-]*)/.exec(part);
    if (match) classes.add(match[1]);
  }
  return classes;
}

function multisetDiff(a, b) {
  const counts = new Map();
  for (const x of a) counts.set(x, (counts.get(x) ?? 0) + 1);
  const onlyB = [];
  for (const x of b) {
    const n = counts.get(x) ?? 0;
    if (n > 0) counts.set(x, n - 1);
    else onlyB.push(x);
  }
  const onlyA = [...counts].flatMap(([x, n]) => Array(n).fill(x));
  return [...onlyA, ...onlyB];
}

/**
 * Vergleicht zwei Fassungen einer CSS-Datei. Regeln mit Klasse (auch ihre Custom Properties wie
 * `.seg-ki{--seg-fill:…}`) liefern ihre Klassen; Regeln ohne Klasse (`:root`, `[data-theme]`)
 * tragen die Tokens: neue Tokens sind lokal, ein geänderter Wert oder ein entfernter Token ist
 * global.
 */
export function diffCss(baseText, headText) {
  const base = parseCss(baseText);
  const head = parseCss(headText);
  const isTokenRule = (r) => leadingClasses(r.selector).size === 0;

  const signature = (r) => JSON.stringify([r.context, r.selector, r.declarations]);
  const classRules = (rules) => rules.filter((r) => !isTokenRule(r));
  const bySignature = new Map([...classRules(base), ...classRules(head)].map((r) => [signature(r), r]));
  const classes = new Set();
  for (const sig of multisetDiff(classRules(base).map(signature), classRules(head).map(signature))) {
    for (const c of leadingClasses(bySignature.get(sig).selector)) classes.add(c);
  }

  // Schlüssel: Kontext + Selektor + Name, damit Theme-Überschreibungen getrennt zählen.
  const tokens = (rules) => {
    const map = new Map();
    for (const r of rules.filter(isTokenRule)) {
      for (const [name, value] of r.declarations) {
        if (name.startsWith('--')) map.set(JSON.stringify([r.context, r.selector, name]), { name, value });
      }
    }
    return map;
  };
  const baseTokens = tokens(base);
  const headTokens = tokens(head);
  const addedTokens = new Set();
  let globalChange = false;
  for (const [key, { name, value }] of headTokens) {
    if (!baseTokens.has(key)) addedTokens.add(name);
    else if (baseTokens.get(key).value !== value) globalChange = true;
  }
  for (const key of baseTokens.keys()) if (!headTokens.has(key)) globalChange = true;
  return { classes, addedTokens, globalChange };
}

// --- Kern ----------------------------------------------------------------------------------------

/**
 * @param {object} input
 * @param {string} input.base Merge-Base-SHA
 * @param {string} input.head Head-SHA
 * @param {string} input.previewRoot Wurzel-URL der PR-Vorschau
 * @param {object|null} input.baseIndex index.json am Merge-Base (null: nicht verfügbar)
 * @param {string} input.baseIndexSource Herkunft des Basis-Index („merge-base“, „pages-main“, „unavailable“)
 * @param {object} input.headIndex index.json am Head
 * @param {{status: string, path: string, oldPath?: string}[]} input.changes geänderte Dateien
 * @param {Record<string, string>} input.headFiles Inhalte am Head: Lib, Storybook-src, packages/css/css
 * @param {Record<string, string>} input.baseFiles Inhalte am Merge-Base: geänderte CSS-Dateien
 */
export function buildStoryLinks({ base, head, previewRoot, baseIndex, baseIndexSource, headIndex, changes, headFiles, baseFiles }) {
  const entries = Object.values(headIndex.entries);
  const baseIds = baseIndex ? new Set(Object.keys(baseIndex.entries)) : null;
  const baseTitles = baseIndex ? new Set(Object.values(baseIndex.entries).map((e) => e.title)) : null;

  const newIds = new Set(baseIds ? entries.filter((e) => !baseIds.has(e.id)).map((e) => e.id) : []);
  const reasonsById = new Map(); // id → Set(geänderte Pfade, die die Entry treffen)
  const attribute = (matched, path) => {
    for (const e of matched) {
      if (!reasonsById.has(e.id)) reasonsById.set(e.id, new Set());
      reasonsById.get(e.id).add(path);
    }
  };
  const byImportPath = (importPath) => entries.filter((e) => e.importPath === importPath);
  const byFolder = (folder) => entries.filter((e) => e.importPath.startsWith(`./src/lib/${folder}/`));

  // Datei mit Treffer → Einträge: Lib-/Story-Ordner ganz, andere Story-Dateien (foundations/)
  // genau. Prosa in MDX-Seiten zählt bewusst nicht, sonst trüge jede Erwähnung einer Klasse.
  const entriesOfHit = (path) => {
    const folder = storyFolder(path);
    if (folder) return byFolder(folder);
    return isStoryFile(path) ? byImportPath(toImportPath(path)) : [];
  };
  const filesMatching = (re, filter = () => true) =>
    Object.entries(headFiles)
      .filter(([p, content]) => filter(p) && re.test(content))
      .map(([p]) => p);
  const inStoryArea = (p) => p.startsWith(LIB_DIR) || p.startsWith(`${STORYBOOK_DIR}/src/`);
  const consumersOf = (term) => filesMatching(wordRe(term), inStoryArea).flatMap(entriesOfHit);

  const globalFiles = new Set();
  const unmapped = new Set();

  for (const { status, path, oldPath } of changes) {
    if (!RELEVANT_PREFIXES.some((p) => path.startsWith(p))) continue;
    if (isProse(path) || IGNORED.some((p) => (p.endsWith('/') ? path.startsWith(p) : path === p))) continue;
    if (GLOBAL_FILES.includes(path) || GLOBAL_PREFIXES.some((p) => path.startsWith(p))) {
      globalFiles.add(path);
      continue;
    }

    let matched = [];
    if (isStoryFile(path) || isMdxFile(path)) {
      // Gelöschte Story-/MDX-Dateien haben in der Vorschau nichts mehr zu zeigen.
      if (status === 'D') continue;
      matched = byImportPath(toImportPath(path));
      if (status === 'A') for (const e of matched) newIds.add(e.id);
    } else if (path.startsWith(LIB_DIR) || path.startsWith(STORY_LIB_DIR)) {
      matched = [path, oldPath].filter(Boolean).flatMap((p) => byFolder(storyFolder(p) ?? ''));
      if (matched.length === 0 && path.startsWith(LIB_DIR)) {
        // Ordner ohne Stories (shared/, icons/) und Dateien direkt unter lib/: eine Stufe über
        // die Import-Pfade der Komponenten, die sie einbinden.
        const module = path.slice(LIB_DIR.length).replace(/\.ts$/, '').replace(/\/index$/, '');
        const importRe = new RegExp(`from\\s+['"](?:\\.{1,2}/)+${escapeRe(module)}(?:\\.js)?['"]`);
        matched = filesMatching(importRe, (p) => p.startsWith(LIB_DIR) && p !== path).flatMap(entriesOfHit);
      }
    } else if (path.startsWith(CSS_DIR) && path.endsWith('.css')) {
      const { classes, addedTokens, globalChange } = diffCss(baseFiles[oldPath ?? path] ?? '', headFiles[path] ?? '');
      if (globalChange) globalFiles.add(path);
      const terms = new Set(classes);
      for (const token of addedTokens) {
        // Neuer Token: Regeln, die ihn per var() nutzen, und direkte Verwendungen in Lib/Stories.
        const used = new RegExp(`var\\(\\s*${escapeRe(token)}(?![\\w-])`);
        for (const [p, content] of Object.entries(headFiles)) {
          if (!p.startsWith(CSS_DIR)) continue;
          for (const rule of parseCss(content)) {
            if (rule.declarations.some(([, v]) => used.test(v))) for (const c of leadingClasses(rule.selector)) terms.add(c);
          }
        }
        matched.push(...consumersOf(token));
      }
      for (const term of terms) matched.push(...consumersOf(term));
      if (globalChange && matched.length === 0) continue;
    } else if (path.startsWith('packages/css/assets/brand/')) {
      // Anders als bei CSS-Klassen zählen hier auch MDX-Seiten: die Marken-Doku zeigt die Datei.
      const name = path.split('/').pop();
      matched = [
        ...consumersOf(name),
        ...filesMatching(wordRe(name), isMdxFile).flatMap((p) => byImportPath(toImportPath(p))),
      ];
    } else if (path.startsWith(ICON_SOURCES)) {
      matched = byImportPath(ICON_DOCS);
    }

    if (matched.length === 0) unmapped.add(path);
    else attribute(matched, path);
  }

  // Ergebnis: Stories und Autodocs-Seiten nach Komponente (Titel), MDX-Seiten getrennt.
  const touched = (e) => newIds.has(e.id) || reasonsById.has(e.id);
  const statusOf = (e) => (newIds.has(e.id) ? 'new' : 'changed');
  const becauseOf = (e) => [...(reasonsById.get(e.id) ?? [])].sort();
  const isAutodocs = (e) => e.type === 'docs' && e.tags?.includes('autodocs') && !e.importPath.endsWith('.mdx');

  const titles = [...new Set(entries.filter((e) => touched(e) && (e.type === 'story' || isAutodocs(e))).map((e) => e.title))];
  const components = titles
    .sort((a, b) => a.localeCompare(b, 'de'))
    .map((title) => {
      const own = entries.filter((e) => e.title === title);
      const docs = own.find(isAutodocs);
      const stories = own.filter((e) => e.type === 'story');
      const isNew = baseTitles ? !baseTitles.has(title) : stories.every((e) => newIds.has(e.id));
      return {
        title,
        status: isNew ? 'new' : 'changed',
        docs: docs ? { id: docs.id, url: storyUrl(previewRoot, docs) } : null,
        stories: stories.filter(touched).map((e) => ({
          id: e.id,
          name: e.name,
          status: statusOf(e),
          url: storyUrl(previewRoot, e),
          because: becauseOf(e),
        })),
      };
    });

  const docsPages = entries
    .filter((e) => e.type === 'docs' && !isAutodocs(e) && touched(e))
    .map((e) => ({ id: e.id, title: e.title, name: e.name, status: statusOf(e), url: storyUrl(previewRoot, e), because: becauseOf(e) }));

  return {
    base,
    head,
    previewRoot,
    baseIndexSource,
    global: { flag: globalFiles.size > 0, files: [...globalFiles].sort() },
    summaryOnly: components.length > MAX_COMPONENTS,
    components,
    docsPages,
    unmapped: [...unmapped].sort(),
  };
}

// --- CLI -------------------------------------------------------------------------------------------

const git = (args, opts = {}) =>
  execFileSync('git', ['-c', 'core.quotePath=false', ...args], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...opts });

/** `storybook index` in <checkout>/apps/storybook, mit dem Storybook aus den node_modules des Heads. */
function storybookIndex(checkout) {
  const tmp = mkdtempSync(join(tmpdir(), 'story-index-'));
  const out = join(tmp, 'index.json');
  try {
    execFileSync(process.execPath, [join(ROOT, 'node_modules/storybook/dist/bin/dispatcher.js'), 'index', '-o', out], {
      cwd: join(checkout, STORYBOOK_DIR),
      env: { ...process.env, STORYBOOK_DISABLE_TELEMETRY: '1' },
      stdio: ['ignore', 'ignore', 'pipe'],
      timeout: 180_000,
    });
    return JSON.parse(readFileSync(out, 'utf8'));
  } finally {
    rmSync(tmp, { recursive: true, force: true });
  }
}

/** Index am Merge-Base: eigener Worktree, node_modules des Heads per Junction/Symlink geteilt. */
function mergeBaseIndex(mergeBase) {
  const tmp = mkdtempSync(join(tmpdir(), 'story-links-base-'));
  const dir = join(tmp, 'checkout');
  const link = join(dir, 'node_modules');
  try {
    git(['worktree', 'add', '--detach', '--quiet', dir, mergeBase]);
    symlinkSync(join(ROOT, 'node_modules'), link, 'junction');
    return storybookIndex(dir);
  } finally {
    // Erst den Link lösen, dann den Worktree entfernen: ein rekursives Löschen dürfte nie in die
    // geteilten node_modules laufen.
    if (existsSync(link)) unlinkSync(link);
    if (existsSync(dir)) git(['worktree', 'remove', '--force', dir]);
    rmSync(tmp, { recursive: true, force: true });
  }
}

async function loadBaseIndex(mergeBase, fallbackUrl) {
  try {
    return { index: mergeBaseIndex(mergeBase), source: 'merge-base' };
  } catch (error) {
    console.warn(`storybook index am Merge-Base fehlgeschlagen, nutze ${fallbackUrl}: ${error.message.split('\n')[0]}`);
  }
  try {
    const response = await fetch(fallbackUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return { index: await response.json(), source: 'pages-main' };
  } catch (error) {
    console.warn(`Basis-Index nicht verfügbar, „neu“ nur aus hinzugefügten Story-Dateien: ${error.message}`);
    return { index: null, source: 'unavailable' };
  }
}

async function main() {
  const { values } = parseArgs({
    options: {
      base: { type: 'string' },
      'preview-root': { type: 'string' },
      out: { type: 'string' },
      'fallback-index-url': { type: 'string', default: PAGES_INDEX_URL },
    },
  });
  if (!values.base || !values['preview-root']) {
    console.error(
      'Aufruf: node tools/ci/story-links.mjs --base <ref> --preview-root <url> [--out story-links.json] [--fallback-index-url <url>]\n' +
        'Läuft im Checkout des PR-Heads (Arbeitsverzeichnis = Head, node_modules installiert, volle Historie).',
    );
    process.exit(2);
  }

  const head = git(['rev-parse', 'HEAD']).trim();
  let mergeBase;
  try {
    mergeBase = git(['merge-base', values.base, head], { stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch {
    // Ohne Merge-Base gibt es keinen Diff. Häufigste Ursache: flacher Checkout.
    console.error(`Kein Merge-Base zwischen ${values.base} und HEAD. Checkout mit voller Historie (fetch-depth: 0)?`);
    process.exit(1);
  }
  const changes = parseNameStatus(git(['diff', '--name-status', '--find-renames', mergeBase, head]));

  const headFiles = {};
  for (const path of git(['ls-files', '-z', '--', LIB_DIR, `${STORYBOOK_DIR}/src/`, CSS_DIR]).split('\0').filter(Boolean)) {
    if (/\.(ts|html|mdx|css)$/.test(path)) headFiles[path] = readFileSync(join(ROOT, path), 'utf8');
  }
  const baseFiles = {};
  for (const { status, path, oldPath } of changes) {
    const basePath = oldPath ?? path;
    if (status !== 'A' && basePath.startsWith(CSS_DIR)) baseFiles[basePath] = git(['show', `${mergeBase}:${basePath}`]);
  }

  const { index: baseIndex, source } = await loadBaseIndex(mergeBase, values['fallback-index-url']);
  const result = buildStoryLinks({
    base: mergeBase,
    head,
    previewRoot: values['preview-root'],
    baseIndex,
    baseIndexSource: source,
    headIndex: storybookIndex(ROOT),
    changes,
    headFiles,
    baseFiles,
  });
  const json = `${JSON.stringify(result, null, 2)}\n`;
  if (values.out) writeFileSync(values.out, json);
  else process.stdout.write(json);
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) await main();
