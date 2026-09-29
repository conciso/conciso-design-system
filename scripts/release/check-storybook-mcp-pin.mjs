#!/usr/bin/env node
// Versionsgleichheits-Gate (ADR-0012): `mcp-server/package.json` pinnt `@storybook/mcp` exakt
// auf die Storybook-Version, mit der der MCP-Snapshot gebaut wird (siehe
// mcp-server/scripts/build-snapshot.mjs, docs/adr/0012). `storybook-angular/package.json`
// deklariert `storybook` dagegen nur als SemVer-Range (`^10.6.0`) — ein Storybook-Minor-Update
// dort würde den Pin sonst unbemerkt hinter sich lassen, bis @storybook/mcp gegen eine andere
// Storybook-Version bricht. Verglichen wird deshalb NICHT Range gegen Range, sondern der Pin
// gegen die TATSÄCHLICH INSTALLIERTE Storybook-Version (nach `npm ci`, aus
// node_modules/storybook/package.json).
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

// npm workspaces hoisten eine gemeinsame Dependency normalerweise ins root node_modules; ein
// Versionskonflikt kann sie aber auch verschachtelt im node_modules des anfordernden Workspace
// belassen (hier: storybook-angular). Beide Orte prüfen, statt nur den Normalfall anzunehmen.
function findInstalledStorybookVersion(root) {
  const candidates = [
    join(root, 'node_modules', 'storybook', 'package.json'),
    join(root, 'storybook-angular', 'node_modules', 'storybook', 'package.json'),
  ];
  const path = candidates.find((p) => existsSync(p));
  if (!path) {
    throw new Error(
      `„storybook“ nicht in node_modules gefunden (geprüft: ${candidates.join(', ')}) — vorher „npm ci“ ausführen.`,
    );
  }
  return readJson(path).version;
}

/**
 * @param {string} [root] Repo-Wurzel (Default: das echte Repo), parametrisiert für Tests.
 * @returns {{ pinnedVersion: string, installedVersion: string }}
 */
export function checkStorybookMcpPin(root = ROOT) {
  const mcpPkg = readJson(join(root, 'mcp-server', 'package.json'));
  const pinnedVersion = mcpPkg.dependencies?.['@storybook/mcp'];
  if (!pinnedVersion) {
    throw new Error('mcp-server/package.json hat keine dependency „@storybook/mcp“.');
  }
  const installedVersion = findInstalledStorybookVersion(root);
  if (pinnedVersion !== installedVersion) {
    throw new Error(
      `Versions-Drift: „@storybook/mcp“ in mcp-server/package.json ist auf ${pinnedVersion} gepinnt, ` +
        `installiert ist aber Storybook ${installedVersion} (node_modules/storybook). Snapshot und ` +
        `@storybook/mcp müssen zur selben Storybook-Version passen (ADR-0012) — den Pin in ` +
        `mcp-server/package.json auf ${installedVersion} nachziehen.`,
    );
  }
  return { pinnedVersion, installedVersion };
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  try {
    const { pinnedVersion } = checkStorybookMcpPin();
    console.log(
      `Versionsgleichheit ok: @storybook/mcp und die installierte Storybook-Version sind beide ${pinnedVersion}.`,
    );
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
