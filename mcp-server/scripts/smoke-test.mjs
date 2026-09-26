#!/usr/bin/env node
// Tarball-Smoke-Test über stdio (ADR-0012). Installiert den per `npm pack` gebauten Tarball von
// @conciso/design-system-mcp in ein frisches, leeres Verzeichnis — genau wie ein Consumer es
// täte — und spricht dort rohes JSON-RPC mit dem `cds-mcp`-Kindprozess. Fängt die Fehlerklasse
// ab, die Unit-Tests aus dem Repo (test/server.test.mjs) nicht sehen können, weil sie gegen den
// Quellbaum laufen: Paketierungsfehler wie ein fehlendes `bin`, ein `files`-Feld, das den
// Snapshot nicht mitnimmt, oder stdout-Verschmutzung durch eine Dependency.
//
// WARUM AUSSERHALB DES REPOS INSTALLIERT WIRD: im Repo-Root liegt bereits ein node_modules mit
// @conciso/design-system-mcp als Workspace-Symlink. Ein Install DORT würde nie ein
// Paketierungsproblem sehen, weil Node ohnehin den Quellbaum auflöst. Deshalb: os.tmpdir(),
// kein Ordner unterhalb des Repos.
//
// Aufruf: `node mcp-server/scripts/smoke-test.mjs [pfad-zum-tarball]`. Ohne Pfad packt sich das
// Paket selbst (dieselbe packTarball()-Funktion wie eval/run-eval.mjs).
//
// Prüft:
//   - initialize erfolgreich
//   - tools/list enthält genau docs-list, docs-show, docs-show-story
//   - docs-show(komponenten-buttons-button) enthält jeden dokumentierten Input und Output von
//     Button, aus dem Docgen des installierten Snapshots gelesen (siehe eval/checker.mjs)
//   - docs-show(komponenten-buttons-button) enthält zusätzlich die Verwendungsguidance
//     (Überschrift „Dos & Don'ts“ plus ein Kernsatz), angehängt per
//     <Meta of={ButtonStories}> (ADR-0012)
//   - docs-show(grundlagen-farben) enthält die Verwendungsguidance der Farben-Seite
//     (Überschrift „Farbstufen, wofür?“ plus die Kontrastregel „AA ab 4,5:1 für
//     Fließtext…“), angehängt per <Meta of={FarbenStories}> (ADR-0012, Ticket 05)
//   - docs-show(grundlagen-typografie) enthält die Verwendungsguidance der
//     Typografie-Seite (Überschrift „Wann welche Schrift“ plus die Kernaussage zur
//     Schriftwahl, Montserrat für Fließtext), angehängt per
//     <Meta of={TypografieStories}> (ADR-0012, Ticket 06)
//   - Stichprobe je Komponentengruppe (Ticket 04): docs-show der tragenden Komponente
//     enthält eine Kernaussage der jeweiligen Verwendungsseite (GROUP_USAGE_CHECKS unten)
//   - docs-list enthält NICHT mehr die alten, eigenständigen IDs der jetzt angehängten
//     Verwendungsseiten (Button plus die 16 Gruppen aus Ticket 04, OLD_STANDALONE_VERWENDUNG_DOC_IDS
//     unten) — jede Seite kommt nur noch angehängt zurück, nicht doppelt
//   - docs-list enthält die Seite „Einrichtung“ (grundlagen-einrichtung--übersicht)
//   - docs-show für JEDE Komponenten- und Doku-id aus dem installierten Snapshot liefert kein
//     Fehlerergebnis (weder JSON-RPC-error noch isError noch leerer Text) — Regressionsschutz für
//     den @storybook/mcp-Encoding-Bug: @storybook/mcp löst Manifest-`$ref`s URL-artig auf und ruft
//     den manifestProvider mit prozentkodierten Pfaden auf (grundlagen-einrichtung--%C3%BCbersicht.json
//     statt …--übersicht.json auf der Platte); ENOENT traf jede id mit Nicht-ASCII-Zeichen, nicht
//     nur die Einrichtung-Seite. Der einzelne Button-Check oben (rein ASCII) hätte das nicht
//     gefangen.
//   - docs-show(grundlagen-einrichtung--übersicht) enthält explizit die Überschriften
//     „Einrichtung“ und „KI-Assistenten anbinden“ — genau die Seite, auf die die Server-
//     instructions verweisen
//   - @internal-Gate: KEINE Komponente im ausgelieferten Snapshot hat argTypes der Kategorie
//     „properties“/„methods“ (ADR-0006 — vergessenes @internal), geprüft direkt in den
//     services/core/docgen/*.json-Dateien des installierten Pakets
//   - jede Zeile auf stdout ist gültiges JSON-RPC 2.0
//
// Bewusst NICHT geprüft: der Inhalt von `instructions` und der Versionsabgleich mit der
// Angular-Lib (server.mjs/test/*.test.mjs), an denen dieses Skript nichts ändert.
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { EINRICHTUNG_DOC_ID } from '../src/instructions.mjs';
import { buildTruthMap } from '../eval/checker.mjs';
import { createJsonRpcClient } from '../test-support/jsonrpc-client.mjs';
import { installTarball, packTarball } from '../test-support/tarball.mjs';

const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = join(PKG_ROOT, '..');
const EXPECTED_TOOL_NAMES = ['docs-list', 'docs-show', 'docs-show-story'];
const BUTTON_SELECTOR = 'cds-button';
// Vor dem Anhängen per <Meta of={...}> (ADR-0012) hatten diese Verwendungsseiten eine
// eigenständige ID im Docs-Manifest; keine davon darf nach dem Anhängen in docs-list
// wieder auftauchen (sonst käme die jeweilige Seite doppelt zurück). Erster Eintrag ist
// Button (Spike), die übrigen 16 sind der Rollout aus Ticket 04 über alle Gruppen.
const OLD_STANDALONE_VERWENDUNG_DOC_IDS = [
  'komponenten-buttons--verwendung',
  'komponenten-chips-badges-pills--verwendung',
  'komponenten-inputs-forms--verwendung',
  'komponenten-dropdowns--verwendung',
  'komponenten-feedback--verwendung',
  'komponenten-cards-teaser--verwendung',
  'komponenten-call-to-action--verwendung',
  'komponenten-tabelle--übersicht',
  'komponenten-zitate-testimonials--verwendung',
  'komponenten-code-block--verwendung',
  'komponenten-slider-carousel--verwendung',
  'komponenten-sektion--übersicht',
  'komponenten-navigation--verwendung',
  'komponenten-hero--übersicht',
  'komponenten-footer--verwendung',
  'komponenten-theme-umschalter--verwendung',
  'marke-logo--verwendung',
];
// Stichprobe je Komponentengruppe (Ticket 04, ADR-0012-Nachtrag): docs-show der tragenden
// Komponente jeder Gruppe enthält einen Kernsatz aus deren angehängter Verwendungsseite. Button
// selbst ist bereits oben geprüft (eigene Assertion mit Docgen-Abgleich), hier nicht doppelt.
const GROUP_USAGE_CHECKS = [
  {
    id: 'komponenten-chips-badges-pills-chip',
    sentence: 'Chips für aktive Filterauswahl, die Nutzerin steuert selbst, was sichtbar ist.',
  },
  {
    id: 'komponenten-inputs-forms-textfeld',
    sentence: 'Jedes Feld mit sichtbarem Label versehen, Placeholder allein ist keine barrierefreie Beschriftung.',
  },
  {
    id: 'komponenten-dropdowns-custom-select',
    sentence: 'Custom Select für eine Ja/Nein- oder Zwei-Optionen-Wahl, dafür sind Radios oder ein nativer Select besser.',
  },
  {
    id: 'komponenten-feedback-snackbar',
    sentence: 'Feldfehler inline direkt unter dem Eingabefeld zeigen, Snackbar nur für globale Submit-Fehler.',
  },
  {
    id: 'komponenten-cards-teaser-card',
    sentence: 'Card-Text auf max. 2 Sätze begrenzen, prägnant und scanbar, kein Fließtext.',
  },
  {
    id: 'komponenten-call-to-action-cta-band',
    sentence: 'Bewusst nur EINE Aktion, kein',
  },
  {
    id: 'komponenten-tabelle-tabelle',
    sentence: 'Scroll-Container verwenden statt die Tabelle zu verkleinern, Lesbarkeit hat Vorrang',
  },
  {
    id: 'komponenten-zitate-testimonials-blockquote',
    sentence: 'Echte Kundenstimmen verwenden, keine KI-generierten Platzhalter in der Produktion',
  },
  {
    id: 'komponenten-code-block-code-block',
    sentence:
      'Terminal-Variante für alle Shell-Befehle und Ausgaben, der grüne Prompt signalisiert sofort: hier wird etwas ausgeführt',
  },
  {
    id: 'komponenten-slider-carousel-carousel',
    sentence: 'Kein Auto-Play ohne Pause-Button, WCAG 2.1 Kriterium 2.2.2 verbietet unkontrollierte Bewegung',
  },
  {
    id: 'komponenten-sektion-sektion',
    sentence: 'Die Fläche gehört der Seite, nicht dem Bauteil.',
  },
  {
    id: 'komponenten-navigation-topnav',
    sentence: 'Zwei Submenüs gleichzeitig offen lassen, vor jedem Öffnen muss das vorherige schließen',
  },
  {
    id: 'komponenten-hero-hero-bild',
    sentence: 'Standard auf allen Customer-Pages',
  },
  {
    id: 'komponenten-footer-komplett',
    sentence: 'Footer als primäre Navigation verwenden, er ist eine Ergänzung, kein Ersatz für die Topnav',
  },
  {
    id: 'komponenten-theme-umschalter-cycle-button',
    sentence: 'Icon-Button, ein Klick zyklt durch die Modi, vorgesehen für den Header',
  },
  {
    id: 'marke-logo-logo',
    sentence: 'Logo proportional skalieren (Höhe als Leitmaß), der Vektor bleibt in jeder Größe scharf.',
  },
];
// Siehe docs/adr/0006: der Docgen-Server legt Interna (Template-Getter, CVA-Plumbing,
// Event-Handler, injizierte Services) standardmäßig in diese beiden Kategorien. `@internal`
// im JSDoc der Lib nimmt sie aus dem Docgen-Modus `propsTable: 'api'` heraus; taucht eine
// dieser Kategorien im ausgelieferten Manifest trotzdem auf, wurde ein `@internal` vergessen.
const INTERNAL_LEAK_CATEGORIES = new Set(['properties', 'methods']);

function log(msg) {
  console.log(msg);
}

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function resolveServerBin(tmpDir) {
  const binPath = join(tmpDir, 'node_modules', '.bin', 'cds-mcp');
  if (!existsSync(binPath)) {
    throw new Error(
      `bin „cds-mcp“ fehlt nach der Installation: „${binPath}“ existiert nicht. ` +
        'Paketierungsfehler — passt das „bin“-Feld in mcp-server/package.json?',
    );
  }
  return binPath;
}

/** Direkter Node-Aufruf statt `npx cds-mcp`: keine zusätzliche npx-Registry-/Cache-Auflösung,
 * der aufgelöste Pfad ist ein normales ESM-Modul und läuft mit demselben Node-Interpreter,
 * der auch dieses Skript ausführt. */
function spawnServer(binPath, cwd) {
  return spawn(process.execPath, [binPath], { cwd, stdio: ['pipe', 'pipe', 'pipe'] });
}

async function runProtocolChecks(client, errors, tmpDir) {
  const init = await client.request('initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'cds-mcp-smoke-test', version: '0.0.0' },
  });
  if (init.error) {
    errors.push(`initialize fehlgeschlagen: ${JSON.stringify(init.error)}`);
    return; // Ohne initialize sind alle Folgeanfragen witzlos.
  }
  if (!init.result) {
    errors.push('initialize lieferte kein result.');
    return;
  }
  client.notify('notifications/initialized', {});

  const list = await client.request('tools/list', {});
  if (list.error) {
    errors.push(`tools/list fehlgeschlagen: ${JSON.stringify(list.error)}`);
  } else {
    const names = (list.result?.tools ?? []).map((tool) => tool.name).sort();
    if (JSON.stringify(names) !== JSON.stringify(EXPECTED_TOOL_NAMES)) {
      errors.push(
        `tools/list soll genau ${JSON.stringify(EXPECTED_TOOL_NAMES)} enthalten, war ${JSON.stringify(names)}.`,
      );
    }
  }

  const docsShow = await client.request('tools/call', {
    name: 'docs-show',
    arguments: { id: 'komponenten-buttons-button' },
  });
  if (docsShow.error) {
    errors.push(`docs-show fehlgeschlagen: ${JSON.stringify(docsShow.error)}`);
  } else {
    const text = docsShow.result?.content?.[0]?.text ?? '';
    // Gegen JEDES dokumentierte Input/Output aus dem installierten Snapshot prüfen (nicht nur
    // die zwei Stichproben „variant“/„clicked“): dieselbe Wahrheit, die eval/checker.mjs für die
    // Erfundene-API-Prüfung liest (buildTruthMap), hier gegen den ausgelieferten docs-show-Text.
    const truth = buildTruthMap(snapshotDir(tmpDir)).elementSelectors.get(BUTTON_SELECTOR);
    if (!truth) {
      errors.push(`Kein Docgen-Eintrag für Selektor „${BUTTON_SELECTOR}“ im installierten Snapshot gefunden.`);
    } else {
      const missing = [...truth.inputs, ...truth.outputs].filter((name) => !text.includes(name));
      if (missing.length > 0) {
        errors.push(
          `docs-show(komponenten-buttons-button) fehlt ${missing.length} dokumentiertes Input/Output: ` +
            `${missing.join(', ')}.`,
        );
      }
    }
    // Verwendungsguidance (ADR-0012): die Seite hängt per <Meta of={ButtonStories}> an
    // Button, docs-show liefert sie mit. Prüft Überschrift plus Kernsatz, wie die
    // Einrichtung-Assertion weiter unten.
    if (!/#\s*Dos & Don'ts\b/.test(text)) {
      errors.push('docs-show(komponenten-buttons-button) enthält nicht die Überschrift „Dos & Don\'ts“.');
    }
    if (!text.includes('Pro Kontext maximal ein Filled Button')) {
      errors.push(
        'docs-show(komponenten-buttons-button) enthält nicht den Kernsatz der Verwendungsseite ' +
          '(„Pro Kontext maximal ein Filled Button…“ aus den Dos & Don\'ts).',
      );
    }
  }

  const docsShowFarben = await client.request('tools/call', {
    name: 'docs-show',
    arguments: { id: 'grundlagen-farben' },
  });
  if (docsShowFarben.error) {
    errors.push(`docs-show(grundlagen-farben) fehlgeschlagen: ${JSON.stringify(docsShowFarben.error)}`);
  } else {
    const text = docsShowFarben.result?.content?.[0]?.text ?? '';
    // Verwendungsguidance (Ticket 05, ADR-0012): die Seite hängt per
    // <Meta of={FarbenStories}> an der Foundation-Story „Grundlagen/Farben“,
    // docs-show liefert sie mit derselben id wie Paletten/Semantisch mit.
    if (!text.includes('## Farbstufen, wofür?')) {
      errors.push('docs-show(grundlagen-farben) enthält nicht die Überschrift „Farbstufen, wofür?“.');
    }
    if (!text.includes('AA ab 4,5:1 für Fließtext')) {
      errors.push(
        'docs-show(grundlagen-farben) enthält nicht die Kontrastregel „AA ab 4,5:1 für Fließtext…“.',
      );
    }
  }

  const docsShowTypografie = await client.request('tools/call', {
    name: 'docs-show',
    arguments: { id: 'grundlagen-typografie' },
  });
  if (docsShowTypografie.error) {
    errors.push(
      `docs-show(grundlagen-typografie) fehlgeschlagen: ${JSON.stringify(docsShowTypografie.error)}`,
    );
  } else {
    const text = docsShowTypografie.result?.content?.[0]?.text ?? '';
    // Verwendungsguidance (Ticket 06, ADR-0012): die Seite hängt per
    // <Meta of={TypografieStories}> an der Foundation-Story „Grundlagen/Typografie“.
    if (!text.includes('## Wann welche Schrift')) {
      errors.push('docs-show(grundlagen-typografie) enthält nicht die Überschrift „Wann welche Schrift“.');
    }
    if (!text.includes('Montserrat (Grotesk, Title, Body und Label) trägt UI-Text, Fließtext')) {
      errors.push(
        'docs-show(grundlagen-typografie) enthält nicht die Kernaussage zur Schriftwahl ' +
          '(Montserrat für Fließtext).',
      );
    }
  }

  await checkGroupUsageGuidance(client, errors);

  const docsList = await client.request('tools/call', { name: 'docs-list', arguments: {} });
  if (docsList.error) {
    errors.push(`docs-list fehlgeschlagen: ${JSON.stringify(docsList.error)}`);
  } else {
    const text = docsList.result?.content?.[0]?.text ?? '';
    if (!text.includes(EINRICHTUNG_DOC_ID)) {
      errors.push(`docs-list enthält nicht die Seite „Einrichtung“ (${EINRICHTUNG_DOC_ID}).`);
    }
    // Regressionsschutz für ADR-0012: jede dieser Verwendungsseiten ist per <Meta of={...}>
    // an ihre tragende Komponente gehängt, ihre alte, eigenständige ID darf also nicht mehr
    // separat in docs-list auftauchen (sonst käme die jeweilige Seite doppelt zurück).
    const stillStandalone = OLD_STANDALONE_VERWENDUNG_DOC_IDS.filter((id) => text.includes(id));
    if (stillStandalone.length > 0) {
      errors.push(
        `docs-list enthält noch ${stillStandalone.length} alte, eigenständige Doku-id(s) neben der ` +
          `angehängten Seite: ${stillStandalone.join(', ')}.`,
      );
    }
  }

  const einrichtung = await client.request('tools/call', {
    name: 'docs-show',
    arguments: { id: EINRICHTUNG_DOC_ID },
  });
  if (einrichtung.error) {
    errors.push(`docs-show(${EINRICHTUNG_DOC_ID}) fehlgeschlagen: ${JSON.stringify(einrichtung.error)}`);
  } else {
    const text = einrichtung.result?.content?.[0]?.text ?? '';
    if (!/#\s*Einrichtung\b/.test(text)) {
      errors.push(`docs-show(${EINRICHTUNG_DOC_ID}) enthält nicht die Überschrift „Einrichtung“.`);
    }
    if (!text.includes('KI-Assistenten anbinden')) {
      errors.push(`docs-show(${EINRICHTUNG_DOC_ID}) enthält nicht die Überschrift „KI-Assistenten anbinden“.`);
    }
  }
}

/** Stichprobe je Komponentengruppe (Ticket 04): docs-show der tragenden Komponente enthält
 * einen Kernsatz ihrer angehängten Verwendungsseite (<Meta of={...}>, ADR-0012). Ein Fehlschlag
 * hier bedeutet entweder ein verlorenes Attachment (Umbau/Refactoring) oder einen geänderten
 * Kernsatz in der MDX-Datei — beides soll den Smoke-Test rot machen, nicht erst ein Eval. */
async function checkGroupUsageGuidance(client, errors) {
  for (const { id, sentence } of GROUP_USAGE_CHECKS) {
    const response = await client.request('tools/call', { name: 'docs-show', arguments: { id } });
    if (response.error) {
      errors.push(`docs-show(${id}) fehlgeschlagen: ${JSON.stringify(response.error)}`);
      continue;
    }
    const text = response.result?.content?.[0]?.text ?? '';
    if (!text.includes(sentence)) {
      errors.push(
        `docs-show(${id}) enthält nicht den Kernsatz der Verwendungsseite dieser Gruppe („${sentence}“).`,
      );
    }
  }
}

/** Pfad zum `snapshot`-Verzeichnis des in `tmpDir` installierten Pakets. */
function snapshotDir(tmpDir) {
  return join(tmpDir, 'node_modules', '@conciso', 'design-system-mcp', 'snapshot');
}

/** Liest alle Komponenten- und Doku-ids direkt aus den Manifesten des INSTALLIERTEN Pakets (nicht
 * aus dem docs-list-Text geparst — robuster, und dieselbe Form, die der manifestProvider
 * tatsächlich ausliefert). Deckt beide Kategorien ab: components.json (z. B.
 * „komponenten-buttons-button“) und docs.json (die „…--übersicht“-MDX-Seiten, überwiegend mit
 * Nicht-ASCII-Zeichen in der id — genau die Klasse, die der @storybook/mcp-Encoding-Bug traf). */
function readAllDocsShowIds(tmpDir, errors) {
  const manifestsDir = join(snapshotDir(tmpDir), 'manifests');
  const componentsPath = join(manifestsDir, 'components.json');
  const docsPath = join(manifestsDir, 'docs.json');
  for (const path of [componentsPath, docsPath]) {
    if (!existsSync(path)) {
      errors.push(`Manifest fehlt im installierten Paket: „${path}“.`);
      return [];
    }
  }

  let components;
  let docs;
  try {
    components = JSON.parse(readFileSync(componentsPath, 'utf8'));
  } catch (err) {
    errors.push(`„${componentsPath}“ ist kein valides JSON: ${err.message}`);
    return [];
  }
  try {
    docs = JSON.parse(readFileSync(docsPath, 'utf8'));
  } catch (err) {
    errors.push(`„${docsPath}“ ist kein valides JSON: ${err.message}`);
    return [];
  }

  return [...Object.keys(components.components ?? {}), ...Object.keys(docs.docs ?? {})];
}

/** Ruft docs-show für JEDE id aus readAllDocsShowIds auf (Komponenten + Doku-Seiten) und schlägt
 * fehl, sobald irgendein Ergebnis ein Fehler ist — JSON-RPC-error, `isError`, oder leerer Text.
 * Regressionsschutz für den @storybook/mcp-Encoding-Bug (ENOENT traf jede id mit
 * Nicht-ASCII-Zeichen): der Button-Check oben allein hätte das nicht gefangen, weil
 * „komponenten-buttons-button“ rein ASCII ist. ~90 ids bei aktuellem Snapshot-Umfang, mit
 * Einzel-Timeout pro Anfrage (siehe test-support/jsonrpc-client.mjs) — unproblematisch für
 * einen CI-Smoke-Test.
 * @returns {Promise<number>} Anzahl erfolgreich aufgelöster ids.
 */
async function checkEveryDocsShowId(client, tmpDir, errors) {
  const ids = readAllDocsShowIds(tmpDir, errors);
  if (ids.length === 0) {
    if (errors.length === 0) {
      errors.push('Keine ids aus components.json/docs.json des installierten Pakets gefunden.');
    }
    return 0;
  }

  let okCount = 0;
  const failed = [];
  for (const id of ids) {
    const response = await client.request('tools/call', { name: 'docs-show', arguments: { id } });
    if (response.error) {
      failed.push(`${id}: JSON-RPC-Fehler ${JSON.stringify(response.error)}`);
      continue;
    }
    if (response.result?.isError) {
      const text = response.result?.content?.[0]?.text ?? '(kein Text)';
      failed.push(`${id}: isError=true, „${text.slice(0, 200)}“`);
      continue;
    }
    const text = response.result?.content?.[0]?.text ?? '';
    if (!text.trim()) {
      failed.push(`${id}: leerer Text im Ergebnis`);
      continue;
    }
    okCount++;
  }

  if (failed.length > 0) {
    errors.push(`docs-show fehlgeschlagen für ${failed.length} von ${ids.length} ids:`);
    for (const line of failed) errors.push(`  - ${line}`);
  } else {
    log(`→ docs-show ok für alle ${okCount} ids (Komponenten + Doku-Seiten, inkl. Nicht-ASCII).`);
  }
  return okCount;
}

/** @internal-Gate über ALLE Komponenten (schließt die in ADR-0006 offen gelassene Lücke). Liest
 * die Docgen-Dateien direkt vom Dateisystem statt über docs-show pro Komponente zu gehen: ein
 * JSON-RPC-Aufruf pro Komponente wäre bei ~50+ Komponenten unnötig langsam, und die Form von
 * `argTypes[*].table.category` ist dieselbe, die der manifestProvider ausliefert (per Stichprobe
 * an komponenten-buttons-button.json verifiziert). */
function checkInternalLeak(tmpDir, errors) {
  const docgenDir = join(snapshotDir(tmpDir), 'services', 'core', 'docgen');
  if (!existsSync(docgenDir)) {
    errors.push(
      `Docgen-Verzeichnis fehlt im installierten Paket: „${docgenDir}“. Snapshot unvollständig ` +
        '(fehlt „services/“ im Tarball?).',
    );
    return;
  }

  const files = readdirSync(docgenDir).filter((name) => name.endsWith('.json'));
  if (files.length === 0) {
    errors.push(`Docgen-Verzeichnis „${docgenDir}“ enthält keine JSON-Dateien.`);
    return;
  }

  const leaksPerComponent = new Map();
  let componentCount = 0;

  for (const file of files) {
    const path = join(docgenDir, file);
    let data;
    try {
      data = JSON.parse(readFileSync(path, 'utf8'));
    } catch (err) {
      errors.push(`Docgen-Datei „${file}“ ist kein valides JSON: ${err.message}`);
      continue;
    }
    for (const [componentId, component] of Object.entries(data.components ?? {})) {
      componentCount++;
      const argTypes = component?.argTypes ?? {};
      const leaked = Object.entries(argTypes)
        .filter(([, argType]) => INTERNAL_LEAK_CATEGORIES.has(argType?.table?.category))
        .map(([name, argType]) => `${name} (${argType.table.category})`);
      if (leaked.length > 0) {
        leaksPerComponent.set(componentId, leaked);
      }
    }
  }

  if (leaksPerComponent.size > 0) {
    errors.push(
      `${leaksPerComponent.size} von ${componentCount} Komponenten haben argTypes der Kategorie ` +
        '„properties“/„methods“ im ausgelieferten Manifest — vergessenes @internal (siehe docs/adr/0006):',
    );
    for (const [componentId, leaked] of leaksPerComponent) {
      errors.push(`  - ${componentId}: ${leaked.join(', ')}`);
    }
    return;
  }
  log(`→ @internal-Gate ok: ${componentCount} Komponenten im Snapshot geprüft, keine properties-/methods-Leaks.`);
}

async function main() {
  const tarballArg = process.argv[2];
  let tarballPath;
  if (tarballArg) {
    tarballPath = resolve(tarballArg);
    if (!existsSync(tarballPath)) {
      fail(`Tarball nicht gefunden: „${tarballPath}“.`);
    }
  } else {
    tarballPath = packTarball(REPO_ROOT, { log });
  }

  const tmpDir = mkdtempSync(join(tmpdir(), 'cds-mcp-smoke-'));
  log(`→ Temp-Verzeichnis (außerhalb des Repos): ${tmpDir}`);

  const errors = [];
  let child;
  let client;
  try {
    installTarball(tmpDir, tarballPath, { log });
    const binPath = resolveServerBin(tmpDir);

    log('→ cds-mcp starten und JSON-RPC über stdio sprechen');
    child = spawnServer(binPath, tmpDir);
    client = createJsonRpcClient(child);

    await runProtocolChecks(client, errors, tmpDir);
    const resolvedCount = await checkEveryDocsShowId(client, tmpDir, errors);
    log(`→ docs-show über stdio aufgelöst: ${resolvedCount} ids.`);
    checkInternalLeak(tmpDir, errors);
  } catch (err) {
    errors.push(err.stack ?? err.message ?? String(err));
  } finally {
    if (client) {
      errors.push(...client.protocolErrors());
      await client.close();
    }
    rmSync(tmpDir, { recursive: true, force: true });
  }

  if (errors.length > 0) {
    console.error('\nTarball-Smoke-Test fehlgeschlagen:\n');
    for (const err of errors) console.error(`  - ${err}`);
    process.exit(1);
  }

  log('\nTarball-Smoke-Test grün: docs-list/docs-show/docs-show-story antworten korrekt über stdio, kein @internal-Leak.');
}

main().catch((err) => {
  console.error('Unerwarteter Fehler im Smoke-Test:', err);
  process.exit(1);
});
