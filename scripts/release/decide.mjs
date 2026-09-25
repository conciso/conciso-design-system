// Release-Entscheidung des Publish-Workflows (ADR-0010, ADR-0011, ADR-0012): was dieser Lauf
// tun soll.
//
// Grundsatz: ERST einen unfertigen früheren Release abschließen, DANN Neues veröffentlichen.
// Ein Lauf kann an drei Stellen abbrechen — zwischen den beiden Publishes, zwischen den
// Publishes und dem Tag, zwischen Tag und GitHub-Release. Solange einer dieser Zustände
// besteht, wird keine neue Version berechnet; sonst könnte ein späterer Commit mit höherer
// Version den unfertigen Stand überholen und ihn dauerhaft liegen lassen. Die Heilung hängt
// deshalb bewusst NICHT an der Version, die die Engine gerade ausrechnet, sondern am Stand
// von Registry und Tags:
//
// - Fehlt hinter dem letzten Tag ein Paket (GitHub Packages ODER npmjs, siehe unten) →
//   `nachziehen` aus dem Tag-Commit.
// - Hat der letzte Tag kein GitHub-Release → `finalisieren`.
// - Liegt in einer Registry eine Version über dem letzten Tag, ist dieser Release unfertig
//   (der Tag entsteht erst nach allen Publishes) → `nachziehen`: fehlendes Paket
//   veröffentlichen, Tag und Release setzen — aus dem Quellstand der Registry.
// - Sonst, wenn die Engine eine Version liefert → `neu`.
//
// Nach `nachziehen`/`finalisieren` stößt der Workflow sich selbst erneut an, damit die
// inzwischen gelandeten Commits nicht bis zum nächsten Push warten.
//
// npmjs (ADR-0011): Alle drei Pakete gehen seit ADR-0011/ADR-0012 ZUSÄTZLICH nach npmjs.org.
// npmjs hat die Versionen bis einschließlich NPM_BASELINE nie gesehen (sie lagen nur in
// GitHub Packages) und sollen dort auch nie nachträglich erscheinen — „npmjs beginnt mit dem
// nächsten Release“. Ein alter Tag <= NPM_BASELINE gilt deshalb NIE als „auf npmjs
// unfertig“, egal was die npmjs-Registry-Abfrage für ihn zurückgibt (typischerweise „gar
// nicht veröffentlicht“). Nur Versionen ECHT ÜBER NPM_BASELINE zählen für den
// npmjs-Vollständigkeits-Check. NPM_BASELINE ist ein fester historischer Wert (der höchste
// Tag vor ADR-0011), keine Ableitung aus `latestTag` — der wandert mit jedem Release weiter,
// NPM_BASELINE nicht.
//
// MCP-Server (ADR-0012): Das dritte Paket existiert erst seit diesem Ticket — es gab für
// keinen Tag bis einschließlich MCP_BASELINE (der letzte Tag VOR ADR-0012) ein
// mcp-server/-Verzeichnis, auf KEINER Registry. Ohne eine Sperre analog zu NPM_BASELINE
// würde Schritt 1 unten („getaggt, aber ein Paket fehlt“) versuchen, den MCP-Server für
// diesen alten Tag aus dessen Commit nachzuziehen — der hat kein mcp-server/, der Build
// bräche ab und JEDER weitere Release bliebe blockiert (derselbe Blockademechanismus, den
// NPM_BASELINE für npmjs verhindert). Deshalb: MCP_BASELINE, dieselbe Konstruktion wie
// NPM_BASELINE, aber für BEIDE Registries — anders als NPM_BASELINE (nur npmjs war
// nachträglich betroffen) gab es das MCP-Paket bis MCP_BASELINE auf GitHub Packages UND
// npmjs gleichermaßen nicht.
//
// Aufruf im Workflow: `node scripts/release/decide.mjs` mit den Fakten als Umgebungs-
// variablen (siehe unten); gibt das Ergebnis als `schlüssel=wert`-Zeilen auf stdout aus.
// Nach $GITHUB_OUTPUT schreibt erst der Workflow-Schritt, der noch Quellstand und Notes
// ergänzt — so gibt es jeden Schlüssel dort genau einmal.
import { fileURLToPath } from 'node:url';

// Nur schlichtes X.Y.Z: stamp-version.mjs lässt nichts anderes durch, also kann auch
// nichts anderes veröffentlicht worden sein. Alles andere wird ignoriert.
const VERSION = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

// Letzte Version, die es NUR in GitHub Packages gibt (siehe ADR-0011). Bewusst nicht aus
// Registry- oder Tag-Daten abgeleitet, sondern als historische Konstante hinterlegt: sie
// bleibt stehen, auch wenn `latestTag` längst weitergezogen ist.
export const NPM_BASELINE = '2.0.0';

// Letzter Tag, für den es das MCP-Paket noch auf KEINER Registry gab (siehe ADR-0012) — der
// letzte Tag vor diesem Ticket. Anders als NPM_BASELINE gilt dieser Wert für BEIDE Registries
// gleichermaßen (GitHub Packages UND npmjs), weil das Paket komplett neu ist und nicht nur
// nachträglich auf einer zweiten Registry hinzukam. Ebenfalls eine feste Konstante, aus
// demselben Grund wie NPM_BASELINE: `latestTag` wandert mit jedem Release weiter,
// MCP_BASELINE nicht.
export const MCP_BASELINE = '2.1.1';

function teile(version) {
  return VERSION.exec(version).slice(1).map(Number);
}

function groesser(a, b) {
  const [x, y] = [teile(a), teile(b)];
  for (let i = 0; i < 3; i++) if (x[i] !== y[i]) return x[i] > y[i];
  return false;
}

function hoechste(versionen) {
  return versionen.filter((v) => VERSION.test(v)).reduce((max, v) => (!max || groesser(v, max) ? v : max), null);
}

// Zählt eine Version für den npmjs-Vollständigkeits-Check? Nur echt über NPM_BASELINE (siehe
// Kopfkommentar) — alles bis einschließlich NPM_BASELINE gab es auf npmjs nie und soll dort
// auch nicht nachgeholt werden.
function npmRelevant(version) {
  return groesser(version, NPM_BASELINE);
}

// Fehlt `version` in der npmjs-Versionsliste UND ist sie npmjs-relevant? Eine alte,
// npmjs-irrelevante Version zählt nie als „fehlt“, selbst wenn `versionenNpm` sie
// tatsächlich nicht enthält (was für sie der Normalfall ist).
function npmFehlt(versionenNpm, version) {
  return npmRelevant(version) && !versionenNpm.includes(version);
}

// Zählt eine Version für den MCP-Vollständigkeits-Check (ADR-0012)? Nur echt über
// MCP_BASELINE — alles bis einschließlich MCP_BASELINE gab es auf KEINER Registry, siehe
// Kopfkommentar. Dieselbe Funktion gilt für GitHub Packages UND npmjs (anders als
// npmRelevant, das nur den npmjs-Sonderfall beschreibt).
function mcpRelevant(version) {
  return groesser(version, MCP_BASELINE);
}

// Fehlt `version` in der MCP-Versionsliste EINER Registry UND ist sie MCP-relevant? Wird
// für cssVersions-artige (GitHub Packages) UND cssVersionsNpm-artige (npmjs) Listen
// gleichermaßen aufgerufen — MCP_BASELINE gilt für beide Registries identisch.
function mcpFehlt(versionenMcp, version) {
  return mcpRelevant(version) && !versionenMcp.includes(version);
}

/**
 * @param {{
 *   latestTag: string, tagHasRelease: boolean, tagIsAnnotated: boolean,
 *   cssVersions: string[], libVersions: string[], mcpVersions: string[],
 *   cssVersionsNpm: string[], libVersionsNpm: string[], mcpVersionsNpm: string[],
 *   engineVersion: string, dry: boolean,
 * }} fakten
 * @returns {{ mode: 'nichts' } | {
 *   mode: 'neu'|'nachziehen'|'finalisieren', version: string,
 *   publishCss: boolean, publishLib: boolean, publishCssNpm: boolean, publishLibNpm: boolean,
 *   publishMcp: boolean, publishMcpNpm: boolean,
 *   source: 'head'|'registry'|'tag', notes: 'engine'|'range'|'tag'|'github'|'keine',
 * }}
 */
export function decide({
  latestTag,
  tagHasRelease,
  tagIsAnnotated,
  cssVersions,
  libVersions,
  mcpVersions = [],
  cssVersionsNpm = [],
  libVersionsNpm = [],
  mcpVersionsNpm = [],
  engineVersion,
  dry,
}) {
  // Bootstrap-Versionen (z. B. „0.0.0-bootstrap.0“, siehe CONTRIBUTING § 15/ADR-0011)
  // tragen ein Prerelease-Suffix und matchen VERSION deshalb nie — rausfiltern, BEVOR sie
  // irgendwo ankommen: npmRelevant()/mcpRelevant()/groesser() erwarten ausschließlich
  // schlichtes X.Y.Z (wie stamp-version.mjs es für GitHub Packages erzwingt) und würden an
  // einem Prerelease-String sonst hart abstürzen (VERSION.exec liefert null). Ein
  // Nebeneffekt, der genau die geforderte Regel erfüllt: eine Bootstrap-Version zählt
  // dadurch nirgendwo als „auf npmjs veröffentlicht“ — sie ist nie höchste Version, nie ein
  // Treffer in `includes()`. `mcpVersions` (GitHub Packages) wird bewusst NICHT gefiltert,
  // aus demselben Grund wie cssVersions/libVersions: GitHub Packages braucht kein OIDC-
  // Bootstrap, dort kann keine Prerelease-Version auftauchen.
  cssVersionsNpm = cssVersionsNpm.filter((v) => VERSION.test(v));
  libVersionsNpm = libVersionsNpm.filter((v) => VERSION.test(v));
  mcpVersionsNpm = mcpVersionsNpm.filter((v) => VERSION.test(v));

  const getaggt = latestTag ? latestTag.replace(/^v/, '') : null;
  // npm-Anteil nur mit npmjs-relevanten Versionen gefüttert (siehe npmRelevant), MCP-Anteil
  // nur mit MCP-relevanten (siehe mcpRelevant): eine irrelevante Alt-Version (z. B. durch
  // einen kaputten Registry-Rückgabewert) darf den „höchste veröffentlichte Version“-
  // Vergleich in Schritt 3 nicht verfälschen.
  const veroeffentlicht = hoechste([
    ...cssVersions,
    ...libVersions,
    ...mcpVersions.filter(mcpRelevant),
    ...cssVersionsNpm.filter(npmRelevant),
    ...libVersionsNpm.filter(npmRelevant),
    ...mcpVersionsNpm.filter(mcpRelevant),
  ]);
  const alle = (publishCss, publishLib, publishCssNpm, publishLibNpm, publishMcp, publishMcpNpm) =>
    dry
      ? {
          publishCss: true,
          publishLib: true,
          publishCssNpm: true,
          publishLibNpm: true,
          publishMcp: true,
          publishMcpNpm: true,
        }
      : { publishCss, publishLib, publishCssNpm, publishLibNpm, publishMcp, publishMcpNpm };

  // Reihenfolge: älteste Lücke zuerst. Erst den letzten Tag vervollständigen, dann eine
  // Version darüber nachziehen, dann Neues. Umgekehrt würde ein höherer halber Stand
  // getaggt und der unfertige alte Tag wäre danach nicht mehr der letzte — und bliebe
  // dauerhaft liegen.

  // 1. Getaggt, aber ein Paket fehlt in der Tag-Version (etwa eine gelöschte Paketversion,
  //    oder — seit ADR-0011 — ein gescheiterter npmjs-Publish neben einem erfolgreichen
  //    GitHub-Packages-Publish): aus dem Tag-Commit nachziehen. Nur für annotierte Tags —
  //    die stammen aus diesem Workflow, ihr Checkout enthält die Release-Skripte. Aus einem
  //    leichtgewichtigen Alt-Tag (vor ADR-0010) lässt sich so nicht bauen; ein Versuch würde
  //    jeden weiteren Release blockieren. Dort nur ein Hinweis, die Entscheidung läuft weiter.
  let hinweis;
  const fehltCss = getaggt && !cssVersions.includes(getaggt);
  const fehltLib = getaggt && !libVersions.includes(getaggt);
  const fehltCssNpm = getaggt && npmFehlt(cssVersionsNpm, getaggt);
  const fehltLibNpm = getaggt && npmFehlt(libVersionsNpm, getaggt);
  // MCP_BASELINE (siehe Kopfkommentar): für den letzten Tag vor ADR-0012 (und alles davor)
  // liefert mcpFehlt() strukturell IMMER false, egal was mcpVersions/mcpVersionsNpm
  // enthalten — ohne diese Sperre würde hier versucht, den MCP-Server aus einem Tag-Commit
  // nachzuziehen, der kein mcp-server/ hat, und jeder weitere Release bliebe blockiert.
  const fehltMcp = getaggt && mcpFehlt(mcpVersions, getaggt);
  const fehltMcpNpm = getaggt && mcpFehlt(mcpVersionsNpm, getaggt);
  if (fehltCss || fehltLib || fehltCssNpm || fehltLibNpm || fehltMcp || fehltMcpNpm) {
    if (tagIsAnnotated) {
      return {
        mode: 'nachziehen',
        version: getaggt,
        ...alle(fehltCss, fehltLib, fehltCssNpm, fehltLibNpm, fehltMcp, fehltMcpNpm),
        source: 'tag',
        notes: tagHasRelease ? 'keine' : 'tag',
      };
    }
    hinweis = `Tag ${latestTag} ist ein Alt-Tag, aber ${[fehltCss && 'die CSS-Schicht', fehltLib && 'die Angular-Lib', fehltCssNpm && 'die CSS-Schicht auf npmjs', fehltLibNpm && 'die Angular-Lib auf npmjs', fehltMcp && 'der MCP-Server', fehltMcpNpm && 'der MCP-Server auf npmjs'].filter(Boolean).join(' und ')} fehlt in Version ${getaggt} — bitte manuell prüfen.`;
  }
  const mitHinweis = (ergebnis) => (hinweis ? { ...ergebnis, hinweis } : ergebnis);

  // 2. Getaggt, aber ohne GitHub-Release → nachholen. Betrifft nur das GitHub-Release
  //    (nicht die Registries), deshalb wird hier nichts gebaut oder veröffentlicht.
  if (getaggt && !tagHasRelease) {
    return mitHinweis({
      mode: 'finalisieren',
      version: getaggt,
      publishCss: false,
      publishLib: false,
      publishCssNpm: false,
      publishLibNpm: false,
      publishMcp: false,
      publishMcpNpm: false,
      source: 'tag',
      notes: tagIsAnnotated ? 'tag' : 'github',
    });
  }

  // 3. Eine veröffentlichte Version über dem letzten Tag ist unfertig (der Tag entsteht
  //    erst nach allen Publishes) → fehlendes Paket, Tag und Release nachziehen.
  if (veroeffentlicht && (!getaggt || groesser(veroeffentlicht, getaggt))) {
    return mitHinweis({
      mode: 'nachziehen',
      version: veroeffentlicht,
      ...alle(
        !cssVersions.includes(veroeffentlicht),
        !libVersions.includes(veroeffentlicht),
        npmFehlt(cssVersionsNpm, veroeffentlicht),
        npmFehlt(libVersionsNpm, veroeffentlicht),
        mcpFehlt(mcpVersions, veroeffentlicht),
        mcpFehlt(mcpVersionsNpm, veroeffentlicht),
      ),
      source: 'registry',
      notes: 'range',
    });
  }

  // 4. Alles Frühere ist fertig → neue Version aus der Engine. Sie liegt per Konstruktion
  //    immer über dem letzten Tag (>= NPM_BASELINE, >= MCP_BASELINE), npmjs und der
  //    MCP-Server sind hier also immer relevant — kein zusätzliches npmRelevant()-/
  //    mcpRelevant()-Gate nötig. Die Quelle ist außerdem IMMER der aktuelle Commit (HEAD),
  //    der seit diesem Ticket mcp-server/ enthält — anders als in Schritt 1 (Tag-Commit)
  //    gibt es hier kein „alter Commit ohne MCP-Verzeichnis“-Risiko.
  if (engineVersion) {
    return mitHinweis({
      mode: 'neu',
      version: engineVersion,
      ...alle(true, true, true, true, true, true),
      source: 'head',
      notes: 'engine',
    });
  }
  return mitHinweis({ mode: 'nichts' });
}

// `npm view … versions --json` liefert ein Array, bei genau einer Version aber einen String.
// Nur eine leere Eingabe zählt als „keine Versionen“ (der Workflow übergibt bei E404 `[]`).
// Eine kaputte oder abgeschnittene Registry-Antwort wirft dagegen, statt als leer
// durchzugehen: sonst übersähe decide() ein unfertiges Paket und veröffentlichte darüber
// hinweg — genau das, was die geschlossen scheiternden Abfragen im Workflow verhindern.
export function versionsliste(json) {
  if (!json || !json.trim()) return [];
  const wert = JSON.parse(json);
  const liste = Array.isArray(wert) ? wert : [wert];
  if (!liste.every((v) => typeof v === 'string')) {
    throw new Error(`Unerwartete Versionsliste aus der Registry: ${json.slice(0, 200)}`);
  }
  return liste;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const env = process.env;
  const d = decide({
    latestTag: env.LATEST_TAG ?? '',
    tagHasRelease: env.TAG_HAS_RELEASE === 'true',
    tagIsAnnotated: env.TAG_IS_ANNOTATED === 'true',
    cssVersions: versionsliste(env.CSS_VERSIONS),
    libVersions: versionsliste(env.LIB_VERSIONS),
    mcpVersions: versionsliste(env.MCP_VERSIONS),
    cssVersionsNpm: versionsliste(env.CSS_VERSIONS_NPM),
    libVersionsNpm: versionsliste(env.LIB_VERSIONS_NPM),
    mcpVersionsNpm: versionsliste(env.MCP_VERSIONS_NPM),
    engineVersion: env.ENGINE_VERSION ?? '',
    dry: env.DRY === 'true',
  });
  const zeilen =
    d.mode === 'nichts'
      ? [
          'mode=nichts',
          'publish=false',
          'publish_css=false',
          'publish_lib=false',
          'publish_css_npm=false',
          'publish_lib_npm=false',
          'publish_mcp=false',
          'publish_mcp_npm=false',
        ]
      : [
          `mode=${d.mode}`,
          `version=${d.version}`,
          'publish=true',
          `publish_css=${d.publishCss}`,
          `publish_lib=${d.publishLib}`,
          `publish_css_npm=${d.publishCssNpm}`,
          `publish_lib_npm=${d.publishLibNpm}`,
          `publish_mcp=${d.publishMcp}`,
          `publish_mcp_npm=${d.publishMcpNpm}`,
          `source=${d.source}`,
          `notes_source=${d.notes}`,
        ];
  if (d.hinweis) zeilen.push(`hinweis=${d.hinweis}`);
  console.log(zeilen.join('\n'));
}
