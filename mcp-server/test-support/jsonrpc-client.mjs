// Gemeinsamer JSON-RPC-über-stdio-Client für Tests und CI-Skripte: bisher als `startClient` in
// test/server.test.mjs und `createJsonRpcClient` in scripts/smoke-test.mjs fast wortgleich
// dupliziert. Bewusst NICHT Teil des ausgelieferten Pakets (siehe
// mcp-server/package.json#files) — reines Test-/CI-Werkzeug.
//
// Spricht nur mit einem bereits gestarteten Kindprozess, startet ihn nicht selbst: Quellbaum
// (test/server.test.mjs) und installierter Tarball (scripts/smoke-test.mjs) unterscheiden sich
// nur im aufgelösten `bin`-Pfad, das bleibt Sache des jeweiligen Aufrufers.
const DEFAULT_TIMEOUT_MS = 10_000;
const HARD_KILL_GRACE_MS = 2_000;

/**
 * @param {import('node:child_process').ChildProcessWithoutNullStreams} child
 * @param {{ defaultTimeoutMs?: number }} [options]
 * @returns {{
 *   request: (method: string, params: unknown, opts?: { timeoutMs?: number }) => Promise<any>,
 *   notify: (method: string, params: unknown) => void,
 *   close: () => Promise<void>,
 *   stderrText: () => string,
 *   protocolErrors: () => string[],
 * }}
 */
export function createJsonRpcClient(child, { defaultTimeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  let buffer = '';
  const pending = new Map();
  let nextId = 1;
  const stderrChunks = [];
  // Jede stdout-Zeile, die kein valides JSON-RPC-2.0-Objekt ist, landet sofort hier statt erst
  // am Ende gesammelt zu werden — Akzeptanzkriterium „jede Zeile auf stdout ist gültiges
  // JSON-RPC“ (siehe test/server.test.mjs, scripts/smoke-test.mjs).
  const protocolErrors = [];

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
        protocolErrors.push(`stdout-Zeile ist kein valides JSON: „${line.slice(0, 200)}“`);
        continue;
      }
      if (!msg || typeof msg !== 'object' || msg.jsonrpc !== '2.0') {
        protocolErrors.push(`stdout-Zeile ist kein JSON-RPC-2.0-Objekt: „${line.slice(0, 200)}“`);
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

  // Stirbt der Kindprozess, bevor eine Antwort ankam (Absturz, falscher bin-Pfad, fehlende
  // Dependency), sonst hängen offene requests() bis zum vollen Timeout statt sofort einen
  // klaren Grund zu melden.
  child.once('exit', (code, signal) => {
    if (pending.size === 0) return;
    const reason = `Serverprozess vorzeitig beendet (Exit-Code ${code}, Signal ${signal}) vor einer Antwort.`;
    for (const waiter of pending.values()) waiter({ error: { message: reason } });
    pending.clear();
  });

  // Ohne diesen Handler wirft Node ein unbehandeltes 'error'-Event als Exception statt es
  // sauber abzufangen (process.execPath existiert in der Praxis zwar immer, billig genug ist
  // die Absicherung trotzdem).
  child.on('error', (err) => {
    protocolErrors.push(`Kindprozess-Fehler: ${err.message}`);
    if (pending.size === 0) return;
    for (const waiter of pending.values()) waiter({ error: { message: `Kindprozess-Fehler: ${err.message}` } });
    pending.clear();
  });

  function send(msg) {
    child.stdin.write(`${JSON.stringify(msg)}\n`);
  }

  function request(method, params, { timeoutMs = defaultTimeoutMs } = {}) {
    const id = nextId++;
    return new Promise((resolvePromise) => {
      const timer = setTimeout(() => {
        pending.delete(id);
        resolvePromise({ error: { message: `Zeitüberschreitung bei „${method}“ (id=${id}, ${timeoutMs} ms).` } });
      }, timeoutMs);
      pending.set(id, (msg) => {
        clearTimeout(timer);
        resolvePromise(msg);
      });
      send({ jsonrpc: '2.0', id, method, params });
    });
  }

  function notify(method, params) {
    send({ jsonrpc: '2.0', method, params });
  }

  async function close() {
    try {
      child.stdin.end();
    } catch {
      // Kindprozess ist ggf. schon beendet — es folgt ohnehin ein harter Kill.
    }
    try {
      child.kill('SIGTERM');
    } catch {
      // s.o.
    }
    await new Promise((resolvePromise) => {
      const hardTimer = setTimeout(() => {
        try {
          child.kill('SIGKILL');
        } catch {
          // Prozess ist zwischen SIGTERM und hier schon weg.
        }
        resolvePromise();
      }, HARD_KILL_GRACE_MS);
      child.once('exit', () => {
        clearTimeout(hardTimer);
        resolvePromise();
      });
    });
  }

  return {
    request,
    notify,
    close,
    stderrText: () => stderrChunks.join(''),
    protocolErrors: () => [...protocolErrors],
  };
}
