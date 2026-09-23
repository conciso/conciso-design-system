// Release-Entscheidung des Publish-Workflows (ADR-0008): was dieser Lauf tun soll.
//
// Grundsatz: ERST einen unfertigen früheren Release abschließen, DANN Neues veröffentlichen.
// Ein Lauf kann an drei Stellen abbrechen — zwischen den beiden Publishes, zwischen den
// Publishes und dem Tag, zwischen Tag und GitHub-Release. Solange einer dieser Zustände
// besteht, wird keine neue Version berechnet; sonst könnte ein späterer Commit mit höherer
// Version den unfertigen Stand überholen und ihn dauerhaft liegen lassen. Die Heilung hängt
// deshalb bewusst NICHT an der Version, die die Engine gerade ausrechnet, sondern am Stand
// von Registry und Tags:
//
// - Fehlt hinter dem letzten Tag ein Paket → `nachziehen` aus dem Tag-Commit.
// - Hat der letzte Tag kein GitHub-Release → `finalisieren`.
// - Liegt in der Registry eine Version über dem letzten Tag, ist dieser Release unfertig
//   (der Tag entsteht erst nach beiden Publishes) → `nachziehen`: fehlendes Paket
//   veröffentlichen, Tag und Release setzen — aus dem Quellstand der Registry.
// - Sonst, wenn die Engine eine Version liefert → `neu`.
//
// Nach `nachziehen`/`finalisieren` stößt der Workflow sich selbst erneut an, damit die
// inzwischen gelandeten Commits nicht bis zum nächsten Push warten.
//
// Aufruf im Workflow: `node scripts/release/decide.mjs` mit den Fakten als Umgebungs-
// variablen (siehe unten); gibt das Ergebnis als `schlüssel=wert`-Zeilen auf stdout aus.
// Nach $GITHUB_OUTPUT schreibt erst der Workflow-Schritt, der noch Quellstand und Notes
// ergänzt — so gibt es jeden Schlüssel dort genau einmal.
import { fileURLToPath } from 'node:url';

// Nur schlichtes X.Y.Z: stamp-version.mjs lässt nichts anderes durch, also kann auch
// nichts anderes veröffentlicht worden sein. Alles andere wird ignoriert.
const VERSION = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

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

/**
 * @param {{
 *   latestTag: string, tagHasRelease: boolean, tagIsAnnotated: boolean,
 *   cssVersions: string[], libVersions: string[], engineVersion: string, dry: boolean,
 * }} fakten
 * @returns {{ mode: 'nichts' } | {
 *   mode: 'neu'|'nachziehen'|'finalisieren', version: string,
 *   publishCss: boolean, publishLib: boolean,
 *   source: 'head'|'registry'|'tag', notes: 'engine'|'range'|'tag'|'github',
 * }}
 */
export function decide({ latestTag, tagHasRelease, tagIsAnnotated, cssVersions, libVersions, engineVersion, dry }) {
  const getaggt = latestTag ? latestTag.replace(/^v/, '') : null;
  const veroeffentlicht = hoechste([...cssVersions, ...libVersions]);
  const beide = (publishCss, publishLib) =>
    dry ? { publishCss: true, publishLib: true } : { publishCss, publishLib };

  // Reihenfolge: älteste Lücke zuerst. Erst den letzten Tag vervollständigen, dann eine
  // Version darüber nachziehen, dann Neues. Umgekehrt würde ein höherer halber Stand
  // getaggt und der unfertige alte Tag wäre danach nicht mehr der letzte — und bliebe
  // dauerhaft liegen.

  // 1. Getaggt, aber ein Paket fehlt in der Tag-Version (etwa eine gelöschte Paketversion):
  //    aus dem Tag-Commit nachziehen. Nur für annotierte Tags — die stammen aus diesem
  //    Workflow, ihr Checkout enthält die Release-Skripte. Aus einem leichtgewichtigen
  //    Alt-Tag (vor ADR-0008) lässt sich so nicht bauen; ein Versuch würde jeden weiteren
  //    Release blockieren. Dort nur ein Hinweis, die Entscheidung läuft weiter.
  let hinweis;
  const fehltCss = getaggt && !cssVersions.includes(getaggt);
  const fehltLib = getaggt && !libVersions.includes(getaggt);
  if (fehltCss || fehltLib) {
    if (tagIsAnnotated) {
      return {
        mode: 'nachziehen',
        version: getaggt,
        ...beide(fehltCss, fehltLib),
        source: 'tag',
        notes: tagHasRelease ? 'keine' : 'tag',
      };
    }
    hinweis = `Tag ${latestTag} ist ein Alt-Tag, aber ${[fehltCss && 'die CSS-Schicht', fehltLib && 'die Angular-Lib'].filter(Boolean).join(' und ')} fehlt in Version ${getaggt} — bitte manuell prüfen.`;
  }
  const mitHinweis = (ergebnis) => (hinweis ? { ...ergebnis, hinweis } : ergebnis);

  // 2. Getaggt, aber ohne GitHub-Release → nachholen.
  if (getaggt && !tagHasRelease) {
    return mitHinweis({
      mode: 'finalisieren',
      version: getaggt,
      publishCss: false,
      publishLib: false,
      source: 'tag',
      notes: tagIsAnnotated ? 'tag' : 'github',
    });
  }

  // 3. Eine veröffentlichte Version über dem letzten Tag ist unfertig (der Tag entsteht
  //    erst nach beiden Publishes) → fehlendes Paket, Tag und Release nachziehen.
  if (veroeffentlicht && (!getaggt || groesser(veroeffentlicht, getaggt))) {
    return mitHinweis({
      mode: 'nachziehen',
      version: veroeffentlicht,
      ...beide(!cssVersions.includes(veroeffentlicht), !libVersions.includes(veroeffentlicht)),
      source: 'registry',
      notes: 'range',
    });
  }

  // 4. Alles Frühere ist fertig → neue Version aus der Engine.
  if (engineVersion) {
    return mitHinweis({ mode: 'neu', version: engineVersion, ...beide(true, true), source: 'head', notes: 'engine' });
  }
  return mitHinweis({ mode: 'nichts' });
}

// `npm view … versions --json` liefert ein Array, bei genau einer Version aber einen String.
function versionsliste(json) {
  try {
    const wert = JSON.parse(json || '[]');
    return Array.isArray(wert) ? wert : [wert];
  } catch {
    return [];
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const env = process.env;
  const d = decide({
    latestTag: env.LATEST_TAG ?? '',
    tagHasRelease: env.TAG_HAS_RELEASE === 'true',
    tagIsAnnotated: env.TAG_IS_ANNOTATED === 'true',
    cssVersions: versionsliste(env.CSS_VERSIONS),
    libVersions: versionsliste(env.LIB_VERSIONS),
    engineVersion: env.ENGINE_VERSION ?? '',
    dry: env.DRY === 'true',
  });
  const zeilen =
    d.mode === 'nichts'
      ? ['mode=nichts', 'publish=false', 'publish_css=false', 'publish_lib=false']
      : [
          `mode=${d.mode}`,
          `version=${d.version}`,
          'publish=true',
          `publish_css=${d.publishCss}`,
          `publish_lib=${d.publishLib}`,
          `source=${d.source}`,
          `notes_source=${d.notes}`,
        ];
  if (d.hinweis) zeilen.push(`hinweis=${d.hinweis}`);
  console.log(zeilen.join('\n'));
}
