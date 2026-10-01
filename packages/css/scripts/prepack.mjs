#!/usr/bin/env node
// npm ruft `prepack` vor `npm pack`/`npm publish` auf. Legt die Dateien ins Paket, die
// `files` referenziert, die aber im Repo-Wurzelverzeichnis liegen (npm kann `files` nicht auf
// ../../LICENSE zeigen lassen, dasselbe Muster wie bei der Angular-Lib und beim MCP-Server):
// LICENSE, NOTICE und die README des Repos, die zugleich die Paket-README ist. Die Kopien sind
// gitignored (siehe .gitignore) und werden bei jedem Pack-Lauf frisch geschrieben.
import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const REPO_ROOT = join(PKG_ROOT, '..', '..');

try {
  for (const name of ['LICENSE', 'NOTICE', 'README.md']) {
    const src = join(REPO_ROOT, name);
    if (!existsSync(src)) {
      throw new Error(`${name} fehlt im Repo-Wurzelverzeichnis: „${src}“.`);
    }
    copyFileSync(src, join(PKG_ROOT, name));
  }
  // console.error statt console.log: stdout gehört bei `npm pack` dem Tarball-Namen.
  console.error('prepack ok: LICENSE, NOTICE und README.md kopiert.');
} catch (err) {
  console.error(`prepack fehlgeschlagen: ${err.message}`);
  process.exit(1);
}
