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
// MCP-Server (ADR-0012): Das dritte Paket existiert erst seit diesem Ticket — für Schritt 1
// unten („getaggt, aber ein Paket fehlt“) muss deshalb bekannt sein, ob der GETAGGTE COMMIT
// überhaupt ein mcp-server/-Verzeichnis hat, sonst würde versucht, den MCP-Server aus einem
// Tag-Commit nachzuziehen, der ihn nicht kennt — der Build bräche ab und JEDER weitere
// Release bliebe blockiert.
//
// Bewusst KEINE feste Versions-Konstante (anders als NPM_BASELINE): Ob ein Tag mcp-server/
// enthält, ist eine Eigenschaft des BAUMS dieses Commits, keine Eigenschaft seiner
// Versionsnummer — NPM_BASELINE funktioniert, weil „npmjs existiert seit einem fixen
// Zeitpunkt“ zeitlich linear ist, aber welche VERSIONSNUMMER der letzte Tag VOR diesem
// Ticket trägt, hängt vom Zufall ab, wann `main` zuletzt released hat, bevor dieser PR
// merged. main kann zwischen dem Schreiben dieses Codes und dem Merge weiterziehen (ein
// `feat`-PR released z. B. v2.2.0, BEVOR dieses Ticket merged) — eine hartkodierte Version
// wie „2.1.1“ wäre dann zu niedrig und Schritt 1 versuchte fälschlich, MCP aus v2.2.0
// nachzuziehen, dessen Baum ihn ebenfalls nicht hat. Der Publish-Workflow ermittelt den Fakt
// deshalb direkt aus dem Tag-Commit (`git cat-file -e "$TAG^{commit}:mcp-server/package.json"`)
// und übergibt ihn als `tagHasMcp` — ein Fakt über den Baum, keine Vermutung über die Zukunft.
// `tagHasMcp` fehlt/ist `false` per Default: ohne den Fakt (z. B. ein Aufrufer, der ihn
// vergisst) wird nie versucht, MCP aus einem Tag zu heilen — sicherer Rückfall.
//
// Schritt 3 (eine Registry-Version über dem Tag) und Schritt 4 (neu aus HEAD) brauchen
// `tagHasMcp` NICHT: ihr Quellstand ist entweder HEAD selbst (Schritt 4, hat seit diesem
// Ticket immer mcp-server/) oder der `gitHead` einer bereits veröffentlichten Version
// (Schritt 3) — die kann nur von EINEM Lauf DIESES (MCP-fähigen) `decide.mjs` stammen, denn
// nur der setzt jemals `publishMcp`/`publishMcpNpm`. Ein Lauf mit dem alten, MCP-unfähigen
// Code kennt diese Felder nicht und schließt einen unfertigen Release wie bisher (nur
// CSS/Lib) noch VOR dem Merge dieses Tickets ab, inklusive Tag und Release — ein
// „veroeffentlicht über dem Tag ohne mcp-server/“-Zwischenstand kann diesen Merge deshalb
// nicht überleben.
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

// Fehlt `version` in der MCP-Versionsliste EINER Registry, obwohl der GETAGGTE COMMIT
// mcp-server/ enthält? `tagHasMcp` ist der Fakt aus dem Workflow (siehe Kopfkommentar) — ohne
// ihn (false) gilt eine fehlende MCP-Version nie als „fehlt“, egal was `versionenMcp` enthält.
// Wird für GitHub Packages UND npmjs gleichermaßen aufgerufen (beide Registries kennen
// dasselbe `tagHasMcp`, es ist eine Eigenschaft des Commits, keine der Registry).
function mcpFehlt(tagHasMcp, versionenMcp, version) {
  return tagHasMcp && !versionenMcp.includes(version);
}

/**
 * @param {{
 *   latestTag: string, tagHasRelease: boolean, tagIsAnnotated: boolean, tagHasMcp?: boolean,
 *   cssVersions: string[], libVersions: string[], mcpVersions: string[],
 *   cssVersionsNpm: string[], libVersionsNpm: string[], mcpVersionsNpm: string[],
 *   engineVersion: string, dry: boolean,
 * }} fakten `tagHasMcp` (Default `false`): enthält der Baum des getaggten Commits
 *   `mcp-server/package.json`? Fakt aus dem Workflow, keine abgeleitete Version — siehe
 *   Kopfkommentar.
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
  tagHasMcp = false,
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
  // irgendwo ankommen: npmRelevant()/groesser() erwarten ausschließlich schlichtes X.Y.Z
  // (wie stamp-version.mjs es für GitHub Packages erzwingt) und würden an einem
  // Prerelease-String sonst hart abstürzen (VERSION.exec liefert null). Ein Nebeneffekt, der
  // genau die geforderte Regel erfüllt: eine Bootstrap-Version zählt dadurch nirgendwo als
  // „auf npmjs veröffentlicht“ — sie ist nie höchste Version, nie ein Treffer in `includes()`.
  // `mcpVersionsNpm` braucht den Filter nicht mehr zur Absturzvermeidung (mcpFehlt() ruft nur
  // noch `.includes()` auf, das crasht an keinem String) — er bleibt trotzdem stehen, damit
  // alle drei `*VersionsNpm`-Listen gleich behandelt werden und ein Bootstrap-Platzhalter nie
  // in irgendeiner künftigen Verwendung dieser Liste auftaucht. `mcpVersions` (GitHub
  // Packages) wird bewusst NICHT gefiltert, aus demselben Grund wie cssVersions/libVersions:
  // GitHub Packages braucht kein OIDC-Bootstrap, dort kann keine Prerelease-Version auftauchen.
  cssVersionsNpm = cssVersionsNpm.filter((v) => VERSION.test(v));
  libVersionsNpm = libVersionsNpm.filter((v) => VERSION.test(v));
  mcpVersionsNpm = mcpVersionsNpm.filter((v) => VERSION.test(v));

  const getaggt = latestTag ? latestTag.replace(/^v/, '') : null;
  // npm-Anteil nur mit npmjs-relevanten Versionen gefüttert (siehe npmRelevant): eine
  // npmjs-irrelevante Alt-Version (z. B. durch einen kaputten Registry-Rückgabewert) darf den
  // „höchste veröffentlichte Version“-Vergleich in Schritt 3 nicht verfälschen. `mcpVersions`/
  // `mcpVersionsNpm` brauchen kein analoges Gate: Der MCP-Server hat keine irrelevante
  // Altversion, die es zu ignorieren gälte (er existierte davor auf KEINER Registry) —
  // `hoechste()` filtert intern ohnehin auf gültiges X.Y.Z (schützt vor der
  // Bootstrap-Prerelease, falls der Filter oben je entfällt).
  const veroeffentlicht = hoechste([
    ...cssVersions,
    ...libVersions,
    ...mcpVersions,
    ...cssVersionsNpm.filter(npmRelevant),
    ...libVersionsNpm.filter(npmRelevant),
    ...mcpVersionsNpm,
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
  // `tagHasMcp` (siehe Kopfkommentar): ist der Fakt false (Tag-Baum ohne mcp-server/, oder
  // gar nicht ermittelt), liefert mcpFehlt() IMMER false, egal was mcpVersions/mcpVersionsNpm
  // enthalten — ohne diese Sperre würde hier versucht, den MCP-Server aus einem Tag-Commit
  // nachzuziehen, der kein mcp-server/ hat, und jeder weitere Release bliebe blockiert.
  const fehltMcp = getaggt && mcpFehlt(tagHasMcp, mcpVersions, getaggt);
  const fehltMcpNpm = getaggt && mcpFehlt(tagHasMcp, mcpVersionsNpm, getaggt);
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
  //    erst nach allen Publishes) → fehlendes Paket, Tag und Release nachziehen. MCP braucht
  //    HIER kein `tagHasMcp`-Gate (anders als Schritt 1): eine Version, die bereits über dem
  //    Tag in einer Registry liegt, kann nur aus einem Lauf DIESES MCP-fähigen `decide.mjs`
  //    stammen (nur der setzt `publishMcp`/`publishMcpNpm` und veröffentlicht dadurch
  //    überhaupt in dieser dritten Dimension) — ihr Quellstand (per `gitHead` aufgelöst) hat
  //    also immer mcp-server/. MCP wird deshalb genau wie CSS/Lib behandelt: fehlt die Version
  //    in der Liste, fehlt sie, ohne Bedingung. Siehe Kopfkommentar für die ausführliche
  //    Begründung, warum ein „veroeffentlicht ohne mcp-server/“-Zwischenstand diesen Merge
  //    nicht überleben kann.
  if (veroeffentlicht && (!getaggt || groesser(veroeffentlicht, getaggt))) {
    return mitHinweis({
      mode: 'nachziehen',
      version: veroeffentlicht,
      ...alle(
        !cssVersions.includes(veroeffentlicht),
        !libVersions.includes(veroeffentlicht),
        npmFehlt(cssVersionsNpm, veroeffentlicht),
        npmFehlt(libVersionsNpm, veroeffentlicht),
        !mcpVersions.includes(veroeffentlicht),
        !mcpVersionsNpm.includes(veroeffentlicht),
      ),
      source: 'registry',
      notes: 'range',
    });
  }

  // 4. Alles Frühere ist fertig → neue Version aus der Engine. Sie liegt per Konstruktion
  //    immer über dem letzten Tag (>= NPM_BASELINE), npmjs ist hier also immer relevant —
  //    kein zusätzliches npmRelevant()-Gate nötig. Die Quelle ist außerdem IMMER der aktuelle
  //    Commit (HEAD), der seit diesem Ticket mcp-server/ enthält — anders als in Schritt 1
  //    (Tag-Commit) gibt es hier kein „alter Commit ohne MCP-Verzeichnis“-Risiko, deshalb auch
  //    kein `tagHasMcp`-Gate nötig.
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
    tagHasMcp: env.TAG_HAS_MCP === 'true',
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
