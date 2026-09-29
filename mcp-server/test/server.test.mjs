// Pinnt das Verhalten aus ADR-0012: Server startet über stdio, registriert genau die drei
// Storybook-Doku-Werkzeuge, und docs-show liefert für Button echte Inputs/Outputs aus dem
// Snapshot. Voraussetzung: der Snapshot existiert bereits (`npm run build:snapshot`, das seinerseits
// `npm run build:storybook` im Repo-Root voraussetzt) — dieser Test baut ihn nicht selbst.
//
// Kindprozess wird IMMER in einem `finally` beendet: ein zuvor hängen gebliebener Spike hat genau
// hieran den Testlauf blockiert. Jede Anfrage hat außerdem ihr eigenes Timeout.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

import { DOCS_LIST_ID_SCHEME_HINT, EINRICHTUNG_DOC_ID } from '../src/instructions.mjs';
import { createJsonRpcClient } from '../test-support/jsonrpc-client.mjs';

const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SERVER_BIN = join(PKG_ROOT, 'bin', 'cds-mcp.mjs');
const SNAPSHOT_MANIFESTS = join(PKG_ROOT, 'snapshot', 'manifests');

/** Startet den Server als Kindprozess und reicht den gemeinsamen JSON-RPC-über-stdio-Client
 * zurück (siehe test-support/jsonrpc-client.mjs). */
function startClient() {
  const child = spawn(process.execPath, [SERVER_BIN], { stdio: ['pipe', 'pipe', 'pipe'] });
  return createJsonRpcClient(child, { defaultTimeoutMs: 5000 });
}

test('cds-mcp: initialize, genau drei Werkzeuge, docs-show liefert Button-Inputs/-Outputs', { timeout: 20_000 }, async () => {
  assert.ok(
    existsSync(SNAPSHOT_MANIFESTS),
    `Snapshot fehlt (${SNAPSHOT_MANIFESTS}) — vorher „npm run build:storybook“ im Repo-Root und ` +
      '„npm run build:snapshot“ in mcp-server/ ausführen.',
  );

  const client = startClient();
  try {
    const init = await client.request('initialize', {
      protocolVersion: '2025-06-18',
      capabilities: {},
      clientInfo: { name: 'cds-mcp-test', version: '0.0.0' },
    });
    assert.equal(init.error, undefined, `initialize-Fehler: ${JSON.stringify(init.error)}`);
    assert.ok(init.result, 'initialize liefert kein result');
    // instructions müssen die Einrichtung-Seite referenzieren, damit die KI sie per docs-show
    // findet, statt beim Einrichten zu raten.
    assert.match(init.result.instructions ?? '', new RegExp(EINRICHTUNG_DOC_ID));
    // instructions müssen auf die Verwendungsguidance hinweisen und beide Fundorte nennen: den
    // „Docs“-Abschnitt der Komponentenantwort und, als Rückfall, docs-list.
    assert.match(init.result.instructions ?? '', /Verwendungsguidance/);
    assert.match(init.result.instructions ?? '', /Docs/);
    assert.match(init.result.instructions ?? '', /docs-list/);
    // instructions müssen erklären, dass docs-list gleichnamige Einträge nur über ihre id
    // unterscheidet (ADR-0012): kein Manifest-Feld liefert einen sprechenden Namen, ein
    // umbenannter `name` würde zugleich das Sidebar-Blatt umbenennen.
    assert.ok((init.result.instructions ?? '').includes(DOCS_LIST_ID_SCHEME_HINT));

    client.notify('notifications/initialized', {});

    const list = await client.request('tools/list', {});
    assert.equal(list.error, undefined, `tools/list-Fehler: ${JSON.stringify(list.error)}`);
    const names = list.result.tools.map((tool) => tool.name).sort();
    assert.deepEqual(names, ['docs-list', 'docs-show', 'docs-show-story']);

    const docsShow = await client.request('tools/call', {
      name: 'docs-show',
      arguments: { id: 'komponenten-buttons-button' },
    });
    assert.equal(docsShow.error, undefined, `docs-show-Fehler: ${JSON.stringify(docsShow.error)}`);
    const text = docsShow.result.content[0].text;
    assert.match(text, /variant/, 'docs-show sollte den Input „variant“ enthalten');
    assert.match(text, /clicked/, 'docs-show sollte den Output „clicked“ enthalten');

    assert.deepEqual(
      client.protocolErrors(),
      [],
      'stdout darf ausschließlich JSON-RPC-2.0-Nachrichten enthalten',
    );
  } finally {
    await client.close();
  }
});
