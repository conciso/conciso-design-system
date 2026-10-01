// Gemeinsame Helfer für „ein Consumer-Tarball, frisch installiert“: bisher fast wortgleich in
// scripts/smoke-test.mjs und eval/run-eval.mjs dupliziert (Pack, Install, npm-Aufruf). Bewusst
// NICHT Teil des ausgelieferten Pakets (siehe mcp-server/package.json#files) — reines
// Test-/CI-Werkzeug.
import { mkdtempSync, readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export function npmBin() {
  return process.platform === 'win32' ? 'npm.cmd' : 'npm';
}

export function runNpm(args, cwd) {
  const result = spawnSync(npmBin(), args, { cwd, encoding: 'utf8' });
  if (result.error) {
    throw new Error(`npm ${args.join(' ')} ließ sich nicht starten: ${result.error.message}`);
  }
  if (result.status !== 0) {
    throw new Error(
      `npm ${args.join(' ')} fehlgeschlagen (Exit-Code ${result.status}) in „${cwd}“.\n` +
        `--- stdout ---\n${result.stdout}\n--- stderr ---\n${result.stderr}`,
    );
  }
  return result;
}

/** Installiert den Tarball in ein frisches, leeres Verzeichnis, genau wie ein Consumer es täte. */
export function installTarball(tmpDir, tarballPath, { log = () => {} } = {}) {
  log('→ npm init -y (frisches Consumer-Verzeichnis)');
  runNpm(['init', '-y'], tmpDir);
  log(`→ npm i ${tarballPath}`);
  runNpm(['i', tarballPath, '--no-audit', '--no-fund', '--loglevel=error'], tmpDir);
}

/** Packt @conciso/design-system-mcp aus `repoRoot` in ein frisches Zielverzeichnis und gibt den
 * Pfad der einen erzeugten .tgz-Datei zurück. Tarball-Name bewusst über die tatsächlich
 * erzeugte Datei ermittelt, nicht über `TARBALL="$(npm pack …)"`: der `prepack`-Lifecycle-Hook
 * (siehe scripts/prepack.mjs) und `npm pack` selbst schreiben beide auf denselben stdout, eine
 * Capture bekäme zwei Zeilen statt einer.
 * @param {string} repoRoot Repo-Wurzel, von der aus `npm pack -w mcp-server` läuft.
 */
export function packTarball(repoRoot, { log = () => {} } = {}) {
  const packDir = mkdtempSync(join(tmpdir(), 'cds-mcp-pack-'));
  log(`→ npm pack -w mcp-server --pack-destination ${packDir}`);
  runNpm(['pack', '-w', 'mcp-server', '--silent', '--pack-destination', packDir], repoRoot);
  const tarballs = readdirSync(packDir).filter((name) => name.endsWith('.tgz'));
  if (tarballs.length !== 1) {
    throw new Error(
      `Erwartete genau eine .tgz-Datei in „${packDir}“, gefunden: ${tarballs.join(', ') || '(keine)'}.`,
    );
  }
  return join(packDir, tarballs[0]);
}
