// Versionsprüfung aus ADR-0012 (Lockstep): Der MCP-Server liefert einen Snapshot, der zu genau
// einer Version der Angular-Lib passt. Weicht die installierte Version ab, warnt der Server
// (in den `instructions` und auf stderr) statt abzubrechen — ein MCP-Server, der die Verbindung
// verweigert, ist für die KI unsichtbar, eine falsche Doku-Erwartung dagegen sichtbar und
// korrigierbar.
//
// `checkVersion` ist bewusst eine reine Funktion (zwei Strings/`null` rein, ein Objekt raus):
// Unit-Tests brauchen dafür keine Fixtures, keinen `node_modules`-Baum und keinen Kindprozess.
// Das Auflösen der installierten Version (Dateisystemzugriff) steht getrennt in
// `resolveInstalledVersion`.
import { createRequire } from 'node:module';
import { join } from 'node:path';

/**
 * Version, die das Repo laut ADR-0010 („versionsfreies Repo“, siehe
 * scripts/release/stamp-version.mjs) dauerhaft trägt, bis der Publish-Job die echte Version
 * einstempelt. Vor dem ersten Release — und bei jedem lokalen `npm test` aus einem Checkout, der
 * nie gestempelt wurde — steht sie in JEDEM Paket, auch in einer frisch installierten
 * Angular-Lib aus demselben Checkout. Ein Vergleich dagegen würde in der Entwicklung immer
 * "unterschiedlich" melden, obwohl beide Seiten aus demselben, noch nicht veröffentlichten Stand
 * stammen — eine strukturell falsche Warnung, keine echte Abweichung. Deshalb wird der Vergleich
 * für diesen einen Wert übersprungen, nicht verschärft.
 */
export const PLACEHOLDER_VERSION = '0.0.0';

/**
 * Reine Versionsprüfung ohne Dateisystemzugriff.
 * @param {string} ownVersion Version aus mcp-server/package.json (`pkg.version`).
 * @param {string | null} installedVersion Version der installierten Angular-Lib, oder `null`,
 *   wenn sie nicht auflösbar ist (nicht installiert, kein `package.json`, kaputtes JSON).
 * @returns {{ instructionsNote: string | null, stderrNote: string | null }}
 */
export function checkVersion(ownVersion, installedVersion) {
  if (ownVersion === PLACEHOLDER_VERSION) {
    return {
      instructionsNote: null,
      stderrNote:
        '[cds-mcp] Entwicklungsmodus: eigene Version ist der Platzhalter „0.0.0“, Versionsprüfung übersprungen.',
    };
  }

  if (installedVersion === null) {
    return {
      instructionsNote:
        `Hinweis: „@conciso/design-system-angular“ ist im Projekt nicht installiert. ` +
        `Dieser Snapshot gilt für Version ${ownVersion}.`,
      stderrNote: null,
    };
  }

  if (installedVersion === ownVersion) {
    return { instructionsNote: null, stderrNote: null };
  }

  const note =
    `Warnung: Dieser Snapshot gehört zu Version ${ownVersion} von „@conciso/design-system-angular“, ` +
    `installiert ist Version ${installedVersion}. Dokumentierte Inputs und Outputs können abweichen.`;
  return { instructionsNote: note, stderrNote: `[cds-mcp] ${note}` };
}

/**
 * Löst die Version der installierten Angular-Lib **vom Arbeitsverzeichnis des Consumers aus**
 * auf, nicht vom Installationsort dieses Pakets (`import.meta.url` wäre hier falsch: `cds-mcp`
 * liegt in `node_modules/@conciso/design-system-mcp/…`, die zu prüfende Lib aber im
 * `node_modules` des Consumer-Projekts). `createRequire(join(cwd, 'noop.js'))` erzeugt einen
 * `require`, dessen Modulauflösung an einem Pfad IM Consumer-Verzeichnis beginnt, ohne dass
 * dieser Pfad existieren muss — Node löst `require.resolve` immer relativ zum Verzeichnis eines
 * (auch fiktiven) Moduls auf, nie zur Datei selbst.
 * @param {string} [cwd] Default: `process.cwd()`, parametrisiert für Tests.
 * @returns {string | null}
 */
export function resolveInstalledVersion(cwd = process.cwd()) {
  try {
    const require = createRequire(join(cwd, 'noop.js'));
    const installedPkg = require('@conciso/design-system-angular/package.json');
    return installedPkg.version;
  } catch {
    return null;
  }
}
