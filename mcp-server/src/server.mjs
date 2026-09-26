// MCP-Server für Consumer (ADR-0012): baut die drei Storybook-Doku-Werkzeuge von
// @storybook/mcp auf einem tmcp-Server mit stdio-Transport auf. Liest ausschließlich aus dem
// mitgelieferten Snapshot (`snapshot/manifests`, `snapshot/services`) — kein Netzzugriff, kein
// Port. Stolperstein aus dem Spike vom 2026-09-25: stdout gehört exklusiv dem JSON-RPC-Protokoll,
// jede Diagnose geht auf stderr.
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ValibotJsonSchemaAdapter } from '@tmcp/adapter-valibot';
import { StdioTransport } from '@tmcp/transport-stdio';
import {
  addGetDocumentationTool,
  addGetStoryDocumentationTool,
  addListAllDocumentationTool,
} from '@storybook/mcp';
import { McpServer } from 'tmcp';

import { buildInstructions } from './instructions.mjs';
import { checkVersion, resolveInstalledVersion } from './version-check.mjs';

const require = createRequire(import.meta.url);
// createRequire statt `import … with { type: 'json' }`: Import-Attribute für JSON brauchen
// neuere Node-Minor-Versionen als unser deklariertes `engines.node: >=20` garantiert; require()
// löst JSON seit jeher auf und funktioniert auf jeder Node-20-Version.
const pkg = require('../package.json');

const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const SNAPSHOT_ROOT = join(PACKAGE_ROOT, 'snapshot');

/**
 * @storybook/mcp ruft den manifestProvider mit Pfaden relativ zur Storybook-Wurzel auf, z. B.
 * „./manifests/components.json“ oder „./services/core/docgen/<id>.json“ (per Spike vom
 * 2026-09-25 verifiziert). `request` bleibt in stdio immer `undefined` — es gibt kein
 * HTTP-Request-Objekt; wir ignorieren es bewusst.
 *
 * ROOT CAUSE (reproduziert am 2026-09-25): @storybook/mcp löst `$ref`-Pfade aus dem Manifest
 * URL-artig auf (`new URL(filePath, base).pathname`, siehe `parseManifestRef` in
 * @storybook/mcp/dist/index.js) und übergibt dem manifestProvider deshalb einen
 * PROZENTKODIERTEN Pfad, z. B. „./services/addon-docs/mdx/grundlagen-einrichtung--%C3%BCbersicht.json“
 * für die Datei „…/grundlagen-einrichtung--übersicht.json“ auf der Platte — betrifft jede docs-id
 * mit Nicht-ASCII-Zeichen (alle „…--übersicht“-MDX-Seiten). Über HTTP dekodiert der Server das
 * automatisch; unser Dateisystem-Provider muss es hier selbst tun.
 *
 * Verteidigung in der Tiefe: `manifestPath` kommt aus `$ref`-Werten im Snapshot, nicht direkt von
 * Nutzereingaben — trotzdem lehnt der Provider jeden Pfad ab, dessen Auflösung `SNAPSHOT_ROOT`
 * verlässt (z. B. per `../..`), statt ihn stillschweigend zu folgen. Das Dekodieren läuft VOR
 * dieser Guard-Prüfung, sonst würde eine kodierte Traversal (`..%2F..%2F…`) die Prüfung als
 * harmlose Zeichenfolge passieren und erst danach zur echten Traversal werden.
 * @param {unknown} _request
 * @param {string} manifestPath
 * @returns {Promise<string>}
 */
export async function manifestProvider(_request, manifestPath) {
  const relative = manifestPath.replace(/^\.\//, '');
  let decoded;
  try {
    decoded = decodeURIComponent(relative);
  } catch {
    throw new Error(`Pfad ungültig kodiert (keine valide Prozentkodierung): „${manifestPath}“.`);
  }
  const absolute = join(SNAPSHOT_ROOT, decoded);
  if (absolute !== SNAPSHOT_ROOT && !absolute.startsWith(SNAPSHOT_ROOT + sep)) {
    throw new Error(`Pfad außerhalb des Snapshots abgelehnt: „${manifestPath}“.`);
  }
  return readFile(absolute, 'utf8');
}

/**
 * Baut den tmcp-Server mit den drei registrierten Werkzeugen, aber startet noch keinen Transport.
 * @param {{ cwd?: string }} [options] `cwd`: Arbeitsverzeichnis, ab dem die Versionsprüfung die
 *   installierte Angular-Lib auflöst (Default `process.cwd()`) — parametrisiert für Tests, damit
 *   sie kein reales Consumer-`node_modules` brauchen.
 */
export async function createServer({ cwd = process.cwd() } = {}) {
  const installedVersion = resolveInstalledVersion(cwd);
  const { instructionsNote, stderrNote } = checkVersion(pkg.version, installedVersion);
  if (stderrNote) {
    console.error(stderrNote);
  }

  const server = new McpServer(
    {
      name: pkg.name,
      version: pkg.version,
      description:
        'Dokumentierte Inputs/Outputs der Angular-Lib des Conciso Design System, aus einem ' +
        'Storybook-Snapshot, kein Netzzugriff.',
    },
    {
      adapter: new ValibotJsonSchemaAdapter(),
      capabilities: { tools: { listChanged: true } },
      instructions: buildInstructions(instructionsNote),
    },
  ).withContext();

  await addListAllDocumentationTool(server);
  await addGetDocumentationTool(server);
  await addGetStoryDocumentationTool(server);

  return server;
}

/** Baut den Server und hängt ihn an stdio. Gibt den Transport zurück (für Tests/Shutdown). */
export async function startServer() {
  const server = await createServer();
  const transport = new StdioTransport(server);
  transport.listen({ manifestProvider });
  console.error(`[cds-mcp] bereit (stdio), Snapshot: ${SNAPSHOT_ROOT}`);
  return transport;
}
