#!/usr/bin/env node
// Kopiert `manifests/` und `services/` aus dem Storybook-Build (storybook-angular/storybook-static)
// unverändert — Verzeichnislayout 1:1 — in den Snapshot dieses Pakets (siehe ADR-0012). Baut den
// Storybook-Build NICHT selbst: Vorbedingung ist `npm run build:storybook` im Repo-Root (siehe
// README.md). Der Snapshot ist gitignored (abgeleitet, siehe .gitignore) und wird bei jedem Lauf
// frisch geschrieben, damit er nie hinter einem neueren Storybook-Build zurückbleibt.
import { cpSync, existsSync, mkdirSync, rmSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DEFAULT_STORYBOOK_STATIC = join(PKG_ROOT, '..', 'storybook-angular', 'storybook-static');
const DEFAULT_SNAPSHOT_DIR = join(PKG_ROOT, 'snapshot');

// Beide Top-Level-Verzeichnisse werden gebraucht — `manifests/` selbst plus alle per `$ref`
// referenzierten Service-Dateien, die komplett unter `services/` liegen (verifiziert per Spike
// vom 2026-09-25: services/core/docgen, services/core/story-docs, services/addon-docs/mdx). Nur
// ihre Existenz wird hier vorab geprüft; WIE jedes kopiert wird, entscheiden die beiden cpSync-
// Aufrufe weiter unten (unterschiedlich, siehe isJsonOrDir).
const SNAPSHOT_SOURCES = ['manifests', 'services'];

// `manifests/` enthält neben den beiden vom manifestProvider gelesenen JSON-Dateien auch
// `components.html` — eine von Storybook mitgebaute, für Menschen lesbare Debug-Seite (~925 KB),
// die kein Werkzeug jemals anfragt. Nur `services/` braucht die 1:1-Kopie unverändert; `manifests/`
// filtert auf *.json, damit die Debug-Seite nicht unnötig ins Paket wandert.
function isJsonOrDir(src) {
  return statSync(src).isDirectory() || src.endsWith('.json');
}

/**
 * @param {{ storybookStatic?: string, snapshotDir?: string }} [options]
 * @returns {string} der geschriebene Snapshot-Pfad
 */
export function buildSnapshot({
  storybookStatic = DEFAULT_STORYBOOK_STATIC,
  snapshotDir = DEFAULT_SNAPSHOT_DIR,
} = {}) {
  if (!existsSync(storybookStatic)) {
    throw new Error(
      `Storybook-Build fehlt: „${storybookStatic}“ existiert nicht. ` +
        'Vorher „npm run build:storybook“ im Repo-Root ausführen.',
    );
  }

  for (const name of SNAPSHOT_SOURCES) {
    const src = join(storybookStatic, name);
    if (!existsSync(src)) {
      throw new Error(
        `Manifest-Verzeichnis fehlt im Storybook-Build: „${src}“. ` +
          'Vorher „npm run build:storybook“ im Repo-Root ausführen (liefert der Docgen-Server/' +
          '@storybook/addon-mcp die Manifeste?).',
      );
    }
  }

  // Frisch schreiben statt zusammenführen: eine gelöschte Manifest-Datei aus einem älteren
  // Snapshot darf nicht überleben.
  rmSync(snapshotDir, { recursive: true, force: true });
  mkdirSync(snapshotDir, { recursive: true });

  cpSync(join(storybookStatic, 'manifests'), join(snapshotDir, 'manifests'), {
    recursive: true,
    filter: isJsonOrDir,
  });
  cpSync(join(storybookStatic, 'services'), join(snapshotDir, 'services'), { recursive: true });

  // Die beiden Dateien, aus denen der manifestProvider tatsächlich liest (siehe src/server.mjs) —
  // ohne sie ist der Snapshot nutzlos, auch wenn der Kopiervorgang selbst anstandslos durchlief
  // (z. B. weil der Docgen-Server eine der beiden aus anderem Grund nicht geschrieben hat).
  for (const name of ['components.json', 'docs.json']) {
    const path = join(snapshotDir, 'manifests', name);
    if (!existsSync(path)) {
      throw new Error(`Snapshot unvollständig: „${path}“ fehlt nach dem Kopieren.`);
    }
  }

  return snapshotDir;
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  try {
    const dir = buildSnapshot();
    console.log(`Snapshot gebaut: ${dir}`);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
