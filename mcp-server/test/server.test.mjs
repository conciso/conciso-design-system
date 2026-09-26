// Pinnt das Verhalten aus ADR-0012/Issue 01: Server startet über stdio, registriert genau die
// drei Storybook-Doku-Werkzeuge, und docs-show liefert für Button echte Inputs/Outputs aus dem
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

import { EINRICHTUNG_DOC_ID } from '../src/instructions.mjs';

const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SERVER_BIN = join(PKG_ROOT, 'bin', 'cds-mcp.mjs');
const SNAPSHOT_MANIFESTS = join(PKG_ROOT, 'snapshot', 'manifests');

/** Startet den Server als Kindprozess und reicht einen kleinen JSON-RPC-über-stdio-Client zurück. */
function startClient() {
  const child = spawn(process.execPath, [SERVER_BIN], { stdio: ['pipe', 'pipe', 'pipe'] });

  let buffer = '';
  const pending = new Map();
  let nextId = 1;
  const stderrChunks = [];
  const stdoutNonJsonLines = [];

  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (chunk) => {
    buffer += chunk;
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';
    for (const line of lines) {
      if (!line.trim()) continue;
      let msg;
      try {
        msg = JSON.parse(line);
      } catch {
        // Akzeptanzkriterium „nichts außer Protokollnachrichten auf stdout“: jede Zeile, die
        // kein valides JSON ist, ist selbst schon ein Verstoß und wird gesammelt statt verworfen.
        stdoutNonJsonLines.push(line);
        continue;
      }
      const waiter = pending.get(msg.id);
      if (waiter) {
        pending.delete(msg.id);
        waiter(msg);
      }
    }
  });

  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (chunk) => stderrChunks.push(chunk));

  function send(msg) {
    child.stdin.write(`${JSON.stringify(msg)}\n`);
  }

  function request(method, params, { timeoutMs = 5000 } = {}) {
    const id = nextId++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        pending.delete(id);
        reject(new Error(`Zeitüberschreitung bei „${method}“ (id=${id})`));
      }, timeoutMs);
      pending.set(id, (msg) => {
        clearTimeout(timer);
        resolve(msg);
      });
      send({ jsonrpc: '2.0', id, method, params });
    });
  }

  function notify(method, params) {
    send({ jsonrpc: '2.0', method, params });
  }

  async function close() {
    child.stdin.end();
    child.kill('SIGTERM');
    await new Promise((resolve) => {
      const hardTimer = setTimeout(() => {
        child.kill('SIGKILL');
        resolve();
      }, 2000);
      child.once('exit', () => {
        clearTimeout(hardTimer);
        resolve();
      });
    });
  }

  return {
    request,
    notify,
    close,
    stderrText: () => stderrChunks.join(''),
    stdoutNonJsonLines: () => stdoutNonJsonLines,
  };
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
    // Issue 02: instructions müssen die Einrichtung-Seite referenzieren, damit die KI sie per
    // docs-show findet, statt beim Einrichten zu raten.
    assert.match(init.result.instructions ?? '', new RegExp(EINRICHTUNG_DOC_ID));

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
      client.stdoutNonJsonLines(),
      [],
      'stdout darf ausschließlich JSON-RPC-Nachrichten enthalten',
    );
  } finally {
    await client.close();
  }
});
