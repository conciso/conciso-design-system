import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n}from"./blocks-CgfgLRYg.js";import{s as r}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i,r as a}from"./react-C77DJ2jK.js";function _createMdxContent(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...i(),...e.components},{HtmlBeispiel:r}=t;return r||_missingMdxReference(`HtmlBeispiel`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n,{title:`Grundlagen/Einrichtung`,name:`Übersicht`}),`
`,(0,o.jsx)(t.h1,{id:`einrichtung`,children:`Einrichtung`}),`
`,(0,o.jsx)(t.p,{children:`So bindest du das Conciso Design System in ein Projekt ein, von der Installation bis zum
ersten Element, und schließt optional eine KI daran an. Zwei Wege stehen offen: mit
Angular-Wrapper-Komponenten, oder rein über die CSS-Schicht, etwa in Astro oder einem
statischen HTML-Projekt.`}),`
`,(0,o.jsx)(t.h2,{id:`mit-angular-einrichten`,children:`Mit Angular einrichten`}),`
`,(0,o.jsx)(t.h3,{id:`beide-pakete-installieren`,children:`Beide Pakete installieren`}),`
`,(0,o.jsx)(t.p,{children:`Angular-Lib und CSS-Schicht tragen immer dieselbe Versionsnummer und liegen öffentlich auf
npmjs.org, du brauchst keinen Account und kein Token:`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-bash`,children:`npm i @conciso/design-system @conciso/design-system-angular
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Alternative: GitHub Packages.`}),` Für Consumer innerhalb der GitHub-Organisation
`,(0,o.jsx)(t.code,{children:`conciso`}),` liegen beide Pakete zusätzlich privat, org-scoped in GitHub Packages. Dafür
eine `,(0,o.jsx)(t.code,{children:`.npmrc`}),` im Projekt anlegen, die den `,(0,o.jsx)(t.code,{children:`@conciso`}),`-Scope umleitet, plus ein Token mit
Scope `,(0,o.jsx)(t.code,{children:`read:packages`}),` auch fürs Lesen (in GitHub Actions genügt `,(0,o.jsx)(t.code,{children:`secrets.GITHUB_TOKEN`}),`):`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-ini`,children:`@conciso:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=\${GITHUB_TOKEN}
`})}),`
`,(0,o.jsxs)(t.p,{children:[`Ausführliche Anleitung (Token-Beschaffung, CI vs. lokaler Rechner): README von
`,(0,o.jsx)(t.code,{children:`@conciso/design-system-angular`}),` auf
`,(0,o.jsx)(t.a,{href:`https://www.npmjs.com/package/@conciso/design-system-angular`,rel:`nofollow`,children:`npmjs.com`}),`.`]}),`
`,(0,o.jsx)(t.h3,{id:`css-und-fonts-global-einbinden`,children:`CSS und Fonts global einbinden`}),`
`,(0,o.jsxs)(t.p,{children:[`Die Angular-Lib liefert `,(0,o.jsx)(t.strong,{children:`kein eigenes CSS`}),`: Die Wrapper-Komponenten setzen nur die
vorhandenen Klassen der CSS-Schicht zusammen, das Styling kommt aus einem globalen
Cascade, der sich nicht pro Komponente kapseln lässt. Fehlt dieser Schritt, erscheinen die
Komponenten ungestylt.`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:`angular.json`})}),` → `,(0,o.jsx)(t.code,{children:`architect.build.options`}),`, Eintrag `,(0,o.jsx)(t.code,{children:`assets`}),` ergänzen (`,(0,o.jsx)(t.code,{children:`css`}),` und
`,(0,o.jsx)(t.code,{children:`fonts`}),` werden unverändert kopiert, kein CSS-Bundling durch den Angular-Build, deshalb
`,(0,o.jsx)(t.code,{children:`assets`}),` statt `,(0,o.jsx)(t.code,{children:`styles`}),`):`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsonc`,children:`{
  "assets": [
    // … bestehende Einträge (z. B. "public") …
    {
      "glob": "**/*",
      "input": "node_modules/@conciso/design-system/css",
      "output": "conciso/css"
    },
    {
      "glob": "**/*",
      "input": "node_modules/@conciso/design-system/fonts",
      "output": "conciso/fonts"
    }
  ]
}
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:(0,o.jsx)(t.code,{children:`src/index.html`})}),`, CSS in genau dieser Reihenfolge laden (fonts → tokens → dark-mode →
base → components; `,(0,o.jsx)(t.code,{children:`fonts.css`}),` referenziert die Font-Dateien relativ als `,(0,o.jsx)(t.code,{children:`../fonts/*`}),`,
`,(0,o.jsx)(t.code,{children:`conciso/css`}),` und `,(0,o.jsx)(t.code,{children:`conciso/fonts`}),` müssen also Geschwisterordner bleiben):`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<link rel="stylesheet" href="conciso/css/fonts.css" />
<link rel="stylesheet" href="conciso/css/tokens.css" />
<link rel="stylesheet" href="conciso/css/dark-mode.css" />
<link rel="stylesheet" href="conciso/css/base.css" />
<link rel="stylesheet" href="conciso/css/components.css" />
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Kritisches CSS deaktivieren.`}),` Der Angular-Production-Build versucht standardmäßig,
referenziertes CSS als kritisches CSS zu inlinen. Das über `,(0,o.jsx)(t.code,{children:`assets`}),` eingebundene CSS liegt
zu diesem Zeitpunkt aber noch nicht im Ausgabeverzeichnis, das führt zu harmlosen, aber
vermeidbaren Build-Warnungen. In `,(0,o.jsx)(t.code,{children:`architect.build.configurations.production`}),` ergänzen:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-jsonc`,children:`{
  "optimization": {
    "scripts": true,
    "fonts": true,
    "styles": { "minify": true, "inlineCritical": false }
  }
}
`})}),`
`,(0,o.jsxs)(t.p,{children:[`Weitere Details: README von `,(0,o.jsx)(t.code,{children:`@conciso/design-system-angular`}),` auf
`,(0,o.jsx)(t.a,{href:`https://www.npmjs.com/package/@conciso/design-system-angular`,rel:`nofollow`,children:`npmjs.com`}),`.`]}),`
`,(0,o.jsx)(t.h3,{id:`erste-komponente-verwenden`,children:`Erste Komponente verwenden`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-ts`,children:`import { ButtonComponent } from '@conciso/design-system-angular';
`})}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<cds-button area="co" variant="filled" label="Kontakt" />
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`area`}),` (Default `,(0,o.jsx)(t.code,{children:`co`}),`), `,(0,o.jsx)(t.code,{children:`variant`}),` (Default `,(0,o.jsx)(t.code,{children:`filled`}),`) und `,(0,o.jsx)(t.code,{children:`label`}),` (Default `,(0,o.jsx)(t.code,{children:`Button`}),`) sind die
dokumentierten Inputs von `,(0,o.jsx)(t.code,{children:`ButtonComponent`}),`. Vollständige Liste mit allen Varianten:
`,(0,o.jsx)(t.code,{children:`Komponenten/Buttons/Button`}),` in diesem Storybook, oder per KI-Assistent das Werkzeug
`,(0,o.jsx)(t.code,{children:`docs-show`}),` (siehe unten).`]}),`
`,(0,o.jsx)(t.h2,{id:`ohne-angular-einrichten`,children:`Ohne Angular einrichten`}),`
`,(0,o.jsxs)(t.p,{children:[`Kein Angular-Projekt, etwa Astro oder statisches HTML? Dann fällt der Angular-Lib-Teil
weg, übrig bleibt die CSS-Schicht `,(0,o.jsx)(t.code,{children:`@conciso/design-system`}),` allein, dieselbe Quelle, die
auch die Angular-Wrapper oben nutzen.`]}),`
`,(0,o.jsx)(t.h3,{id:`paket-installieren-empfohlen`,children:`Paket installieren (empfohlen)`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-bash`,children:`npm i @conciso/design-system
`})}),`
`,(0,o.jsx)(t.p,{children:`Am einfachsten das gebündelte Einzel-CSS importieren (Ladereihenfolge und Fonts bereits
enthalten):`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-js`,children:`import '@conciso/design-system';
// entspricht: import '@conciso/design-system/dist/conciso-ds.css';
`})}),`
`,(0,o.jsxs)(t.p,{children:[`Brauchst du stattdessen nur einzelne Dateien, etwa nur `,(0,o.jsx)(t.code,{children:`tokens.css`}),` ohne die fertigen
Komponentenklassen, importierst du sie einzeln, in genau dieser Reihenfolge (fonts →
tokens → dark-mode → base → components):`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-js`,children:`import '@conciso/design-system/css/fonts.css';
import '@conciso/design-system/css/tokens.css';
import '@conciso/design-system/css/dark-mode.css';
import '@conciso/design-system/css/base.css';
import '@conciso/design-system/css/components.css';
`})}),`
`,(0,o.jsx)(t.h3,{id:`dateien-direkt-kopieren`,children:`Dateien direkt kopieren`}),`
`,(0,o.jsxs)(t.p,{children:[`Hält dein Projekt die CSS-Schicht stattdessen als kopierte Dateien vor, ganz ohne
`,(0,o.jsx)(t.code,{children:`npm install`}),` und ohne Build, gilt dieselbe Reihenfolge wie oben, nur als `,(0,o.jsx)(t.code,{children:`<link>`}),`-Tags
(Tokens definieren Variablen, Dark-Mode überschreibt sie, Base setzt Grundlagen, Components
nutzt alles):`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<link rel="stylesheet" href="css/fonts.css" />
<link rel="stylesheet" href="css/tokens.css" />
<link rel="stylesheet" href="css/dark-mode.css" />
<link rel="stylesheet" href="css/base.css" />
<link rel="stylesheet" href="css/components.css" />
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`fonts.css`}),` referenziert die Font-Dateien relativ als `,(0,o.jsx)(t.code,{children:`../fonts/*`}),`, der `,(0,o.jsx)(t.code,{children:`fonts`}),`-Ordner
muss also als Geschwisterordner neben `,(0,o.jsx)(t.code,{children:`css`}),` liegen, sonst brechen die `,(0,o.jsx)(t.code,{children:`@font-face`}),`-Regeln.`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Alternative: ein einziges Bundle.`}),` Statt der fünf Dateien reicht auch ein einzelner
Link auf das gebündelte CSS (Reihenfolge und `,(0,o.jsx)(t.code,{children:`@font-face`}),`-Regeln bereits enthalten):`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<link rel="stylesheet" href="dist/conciso-ds.css" />
`})}),`
`,(0,o.jsxs)(t.p,{children:[`Auch hier muss `,(0,o.jsx)(t.code,{children:`fonts`}),` als Geschwisterordner neben `,(0,o.jsx)(t.code,{children:`dist`}),` liegen: Die `,(0,o.jsx)(t.code,{children:`url(...)`}),`-Pfade im
Bundle lösen relativ zur CSS-Datei auf.`]}),`
`,(0,o.jsx)(t.h3,{id:`astro`,children:`Astro`}),`
`,(0,o.jsxs)(t.p,{children:[`CSS aus einem npm-Paket bindest du in Astro am saubersten global in einem Layout ein: ein
ESM-`,(0,o.jsx)(t.code,{children:`import`}),` im Frontmatter der Layout-Komponente, oben bei den übrigen Imports. Am
einfachsten mit dem gebündelten CSS:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-astro`,children:`---
import '@conciso/design-system';
---
`})}),`
`,(0,o.jsx)(t.p,{children:`Brauchst du stattdessen nur einzelne Dateien, importierst du sie einzeln, in derselben
Reihenfolge wie oben (fonts → tokens → dark-mode → base → components):`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-astro`,children:`---
import '@conciso/design-system/css/fonts.css';
import '@conciso/design-system/css/tokens.css';
import '@conciso/design-system/css/dark-mode.css';
import '@conciso/design-system/css/base.css';
import '@conciso/design-system/css/components.css';
---
`})}),`
`,(0,o.jsxs)(t.p,{children:[`Kopierte Dateien statt des npm-Pakets bindest du in Astro genauso über `,(0,o.jsx)(t.code,{children:`<link>`}),`-Tags im
Layout ein, wie oben unter „Dateien direkt kopieren“ beschrieben.`]}),`
`,(0,o.jsx)(t.h3,{id:`erstes-element-verwenden`,children:`Erstes Element verwenden`}),`
`,(0,o.jsx)(t.p,{children:`Kein Framework nötig, die Komponenten sind CSS-Klassen auf normalem HTML:`}),`
`,(0,o.jsx)(r,{titel:`Button mit CSS-Klassen`,children:(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<button type="button" class="btn btn-filled btn-co">Kontakt</button>
`})})}),`
`,(0,o.jsxs)(t.p,{children:[`Welche Klassen zu welcher Variante gehören, zeigt die Storybook-Seite der jeweiligen
Komponente (z. B. `,(0,o.jsx)(t.code,{children:`Komponenten/Buttons/Button`}),` in diesem Storybook), oder per KI-Assistent
das Werkzeug `,(0,o.jsx)(t.code,{children:`docs-show`}),` (siehe unten).`]}),`
`,(0,o.jsx)(t.h2,{id:`ki-assistenten-anbinden`,children:`KI-Assistenten anbinden`}),`
`,(0,o.jsxs)(t.p,{children:[`Das Design System bringt einen eigenen MCP-Server mit: `,(0,o.jsx)(t.code,{children:`@conciso/design-system-mcp`}),`
(`,(0,o.jsx)(t.code,{children:`bin`}),`: `,(0,o.jsx)(t.code,{children:`cds-mcp`}),`), Transport stdio, kein Port, nichts im Netz erreichbar. Er liefert
dieselben Werkzeuge, mit denen sich auch diese Seite abfragen lässt (`,(0,o.jsx)(t.code,{children:`docs-list`}),`,
`,(0,o.jsx)(t.code,{children:`docs-show`}),`, `,(0,o.jsx)(t.code,{children:`docs-show-story`}),`), als mitgelieferten Snapshot passend zur installierten
Version, ohne Live-Abruf von einer Website. Zwei Wege, ihn einzubinden: mit installiertem
Paket, oder per `,(0,o.jsx)(t.code,{children:`npx`}),` ganz ohne Installation, etwa wenn dein Projekt die CSS-Schicht nur
kopiert statt installiert hat (siehe oben, „Dateien direkt kopieren“).`]}),`
`,(0,o.jsx)(t.h3,{id:`mit-installiertem-paket`,children:`Mit installiertem Paket`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-bash`,children:`npm i -D @conciso/design-system-mcp
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Versionen synchron halten.`}),` Der Server vergleicht beim Start seine eigene Version mit
der installierten Version der Angular-Lib und `,(0,o.jsx)(t.strong,{children:`warnt`}),` bei Abweichung (in seinen
`,(0,o.jsx)(t.code,{children:`instructions`}),` und auf stderr), bricht aber nicht ab. Am einfachsten: alle drei Pakete
gemeinsam auf derselben Version installieren oder aktualisieren, zum Beispiel
`,(0,o.jsx)(t.code,{children:`npm i @conciso/design-system@X @conciso/design-system-angular@X @conciso/design-system-mcp@X`}),`. Ohne Angular-Projekt bleibt dieser automatische Abgleich
aus, auch mit installiertem `,(0,o.jsx)(t.code,{children:`@conciso/design-system-mcp`}),`: Die Prüfung vergleicht bislang
nur gegen die Angular-Lib, nicht gegen die CSS-Schicht selbst.`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Claude Code.`}),` Empfohlen als committete Projektdatei `,(0,o.jsx)(t.code,{children:`.mcp.json`}),` im Repo-Root:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-json`,children:`{
  "mcpServers": {
    "conciso-ds": {
      "command": "npx",
      "args": ["cds-mcp"]
    }
  }
}
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`VS Code / GitHub Copilot.`}),` `,(0,o.jsx)(t.code,{children:`.vscode/mcp.json`}),`, Schlüssel `,(0,o.jsx)(t.code,{children:`servers`}),`, mit explizitem
`,(0,o.jsx)(t.code,{children:`"type": "stdio"`}),` (laut aktueller VS-Code-Doku ein Pflichtfeld für stdio-Server):`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-json`,children:`{
  "servers": {
    "conciso-ds": {
      "type": "stdio",
      "command": "npx",
      "args": ["cds-mcp"]
    }
  }
}
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Cursor.`}),` `,(0,o.jsx)(t.code,{children:`.cursor/mcp.json`}),`, Schlüssel `,(0,o.jsx)(t.code,{children:`mcpServers`}),`:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-json`,children:`{
  "mcpServers": {
    "conciso-ds": {
      "command": "npx",
      "args": ["cds-mcp"]
    }
  }
}
`})}),`
`,(0,o.jsx)(t.p,{children:`Alle drei Varianten starten denselben Prozess über stdio, ohne laufenden Dienst und ohne
Port.`}),`
`,(0,o.jsx)(t.h3,{id:`ohne-installiertes-paket`,children:`Ohne installiertes Paket`}),`
`,(0,o.jsxs)(t.p,{children:[`Ist `,(0,o.jsx)(t.code,{children:`@conciso/design-system-mcp`}),` im Projekt nicht installiert, startest du denselben
Server trotzdem über `,(0,o.jsx)(t.code,{children:`npx`}),`, mit fester Versionsnummer statt `,(0,o.jsx)(t.code,{children:`cds-mcp`}),` und mit `,(0,o.jsx)(t.code,{children:`-y`}),`, damit
`,(0,o.jsx)(t.code,{children:`npx`}),` das Paket ohne Rückfrage lädt:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-json`,children:`{
  "mcpServers": {
    "conciso-ds": {
      "command": "npx",
      "args": ["-y", "@conciso/design-system-mcp@<Version>"]
    }
  }
}
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`.vscode/mcp.json`}),` (VS Code / GitHub Copilot), wieder mit `,(0,o.jsx)(t.code,{children:`"type": "stdio"`}),`:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-json`,children:`{
  "servers": {
    "conciso-ds": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@conciso/design-system-mcp@<Version>"]
    }
  }
}
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`.cursor/mcp.json`}),` (Cursor):`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-json`,children:`{
  "mcpServers": {
    "conciso-ds": {
      "command": "npx",
      "args": ["-y", "@conciso/design-system-mcp@<Version>"]
    }
  }
}
`})}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Version an den kopierten Stand binden.`}),` `,(0,o.jsx)(t.code,{children:`<Version>`}),` ist die Version der CSS-Schicht,
die dein Projekt kopiert hat: Aktualisierst du die Kopie, ziehst du diese Versionsnummer
mit, sonst dokumentiert der Server Komponenten, die dein kopierter Stand gar nicht kennt.
Den MCP-Server gibt es erst ab einer späteren Version als die CSS-Schicht; welche Versionen
existieren, zeigt `,(0,o.jsx)(t.code,{children:`npm view @conciso/design-system-mcp versions`}),`. Ist dein Stand älter,
nimmst du die älteste verfügbare Version. Die eingebaute Versionsprüfung greift hier
ohnehin nicht automatisch: Sie vergleicht sich beim Start mit der `,(0,o.jsx)(t.strong,{children:`installierten`}),`
Version von
`,(0,o.jsx)(t.code,{children:`@conciso/design-system-angular`}),` in `,(0,o.jsx)(t.code,{children:`node_modules`}),`. Ist nichts installiert, findet sie
nichts zum Vergleichen und nennt stattdessen in ihren `,(0,o.jsx)(t.code,{children:`instructions`}),` nur, für welche
Version ihr eigener Snapshot gebaut wurde, den Rest prüfst du selbst gegen deinen
kopierten Stand.`]}),`
`,(0,o.jsx)(t.h2,{id:`siehe-auch`,children:`Siehe auch`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`Komponenten/Buttons/Button`}),` in diesem Storybook`]}),`
`,(0,o.jsxs)(t.li,{children:[`README von `,(0,o.jsx)(t.code,{children:`@conciso/design-system`}),` auf
`,(0,o.jsx)(t.a,{href:`https://www.npmjs.com/package/@conciso/design-system`,rel:`nofollow`,children:`npmjs.com`})]}),`
`,(0,o.jsxs)(t.li,{children:[`README von `,(0,o.jsx)(t.code,{children:`@conciso/design-system-angular`}),` auf
`,(0,o.jsx)(t.a,{href:`https://www.npmjs.com/package/@conciso/design-system-angular`,rel:`nofollow`,children:`npmjs.com`})]}),`
`,(0,o.jsxs)(t.li,{children:[`README von `,(0,o.jsx)(t.code,{children:`@conciso/design-system-mcp`}),` auf
`,(0,o.jsx)(t.a,{href:`https://www.npmjs.com/package/@conciso/design-system-mcp`,rel:`nofollow`,children:`npmjs.com`})]}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var o;function init_einrichtung(){return(init_einrichtung=e((()=>{o=r(),a(),t()})))()}init_einrichtung();export{MDXContent as default};