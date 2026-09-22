# ADR-0006: Storybook 10.6 — Docgen-Server statt Compodoc, MCP-Manifest, Conciso-Chrome

- Status: akzeptiert
- Datum: 2026-09-17

## Kontext

`storybook-angular/` lief auf Storybook 10.5 mit `@storybook/angular-vite`, Compodoc
ausgeschaltet; die Props-Tabellen entstanden ausschließlich aus den `argTypes` der
CSF-Stories. Storybook 10.6 ändert für Angular-Vite drei Dinge, die eine Entscheidung
verlangen statt eines stillen Versions-Bumps:

1. **Server-seitiger Docgen ist Default.** `experimentalDocgenServer` liest Inputs,
   Outputs und JSDoc einmal aus der TypeScript-Quelle der Angular-Lib und speist damit
   Controls, Docs-Seiten und ein Komponenten-Manifest. Die Compodoc-Optionen
   (`compodoc`, `compodocArgs` in `framework.options` und in den `angular.json`-Targets)
   sind deprecated.
2. **MCP für Agenten.** `@storybook/addon-mcp` stellt im Dev-Server unter `/mcp` einen
   Endpunkt bereit (Tools `stories-preview`, `stories-changed`,
   `stories-find-by-component`, `test-run`, `docs-list`, `docs-show`, `docs-show-story`,
   `review-create`, `get-storybook-story-instructions`) und schreibt beim Build
   `manifests/components.json`. Vor 10.6 lieferte nur `@storybook/react` ein
   Komponenten-Manifest; seit 10.6 tut es `@storybook/angular-vite` nativ
   (`meta.docgen: "angular-component-meta"`).
3. Das Schwester-Repo Atelier (`libs/angular/.storybook`) hat genau diese Optionen bereits
   in Betrieb und dazu `@storybook/addon-themes`, `@storybook/addon-designs` und ein
   gebrandetes Manager-Theme. Es war zu entscheiden, was davon hierher gehört.

Verifizierte Nebenwirkung des Docgen-Servers in diesem Repo: 25 von 37 Manifest-Einträgen
tragen `argTypes` der Kategorien `properties` (56) und `methods` (99) — Template-Getter
(`classes`, `wrapClasses`), ControlValueAccessor-Plumbing (`writeValue`, `registerOnChange`),
Event-Handler (`onKeydown`) und injizierte Services (`svc`). Sie tauchten nach dem Upgrade
in Docs-Props-Tabelle und Controls-Panel auf; vorher waren sie unsichtbar.

## Entscheidung

1. **Upgrade auf 10.6.0** für alle Familienpakete, Compodoc-Optionen entfernt
   (`framework.options: {}`, `angular.json` ohne `compodoc`). Der Docgen-Server ist
   explizit gesetzt (`features.experimentalDocgenServer: true`), obwohl Default —
   als Schutz gegen einen künftigen Default-Wechsel.
2. **`@storybook/addon-mcp` aktiv**, dazu `features.componentsManifest: true` und
   `features.experimentalReview: true`. Letzteres ist tri-state: unset erreicht
   `review-create` nur über den deprecated `storybook ai`-Proxy-Kanal, ein direkter
   MCP-Client (z. B. `claude mcp add --transport http …`) braucht das explizite `true`
   (Atelier-ADR 0143, gegen den installierten 10.6.0-Dist verifiziert). Die CI
   (`storybook-angular.yml`) prüft nach dem Build, dass das Manifest existiert,
   `meta.docgen === "angular-component-meta"` trägt und mindestens einen Eintrag hat.
3. **Interna per JSDoc `@internal` aus Props-Tabellen und Manifest nehmen.** Die API einer
   [Wrapper-Komponente](../../CONTEXT.md#wrapper-komponente) sind genau ihre Inputs und
   Outputs. Alle übrigen öffentlichen Member der Lib (Template-Getter, ControlValueAccessor-
   Methoden, Event-Handler, interne Signale, Lifecycle-Hooks) tragen `@internal`; im
   Docgen-Modus `propsTable: 'api'` (Default) lässt der Analyzer genau diese Member aus
   (`documentedInMode` in `docgen-worker.js`: ausgelassen wird, was `private`, `#`-privat oder
   `@internal` ist). Regel für neue Komponenten: was nicht Input oder Output ist, bekommt
   `@internal`.
4. **Storybook-Chrome im Conciso-Look**: `.storybook/theme.ts` (zwei `create()`-Themes,
   Werte aus `css/tokens.css` und `css/dark-mode.css` mit Token-Namen im Kommentar),
   `manager.ts` wählt je Ladevorgang nach `prefers-color-scheme`, `manager-head.html`
   lädt `fonts.css` (Montserrat, self-hosted), `parameters.docs.theme` setzt das
   Light-Theme für die Docs-Chrome.

### Bewusst nicht übernommen

- **`@storybook/addon-themes`.** Das Repo hat bereits einen dreistufigen Theme-Schalter
  (hell/dunkel/system) in `preview.ts`, der über `themeStore` bidirektional mit den
  Theme-Switcher-Komponenten der Lib synchron läuft. `withThemeByDataAttribute` kennt nur
  feste Werte, kein „system“, und wäre ein zweiter Schreiber von `data-theme`. Kein
  Mehrwert, echtes Konfliktrisiko.
- **`@storybook/addon-designs`.** Kein Figma-Bezug im Repo.
- **`framework.options.propsTable: 'inputs'`** als Alternative zu Punkt 3: blendet auch
  Outputs aus, die echte API sind.
- **Globaler `argTypesEnhancer` in `preview.ts`** als Alternative zu Punkt 3 (erster Versuch):
  verifiziert wirkungslos. Mit `experimentalDocgenServer` rendern Docs-ArgTypes und
  Controls-Panel aus dem `core/docgen`-Store (`useDocgenServiceRows`), nicht aus
  `context.argTypes`; die Enhancer-Pipeline sieht die Docgen-Member nie. Der Einwand, die Lib
  solle kein Storybook-Detail kennen, trägt nicht: `@internal` ist ein TSDoc-Standard-Tag mit
  eigener Bedeutung („kein Teil der öffentlichen API“) und hätte auch ohne Storybook seinen
  Platz.
- **`@ignore`** statt `@internal`: entfernt das Member komplett aus dem Docgen statt es nur
  aus der Props-Tabelle zu lassen; `@internal` ist die präzisere Aussage.
- **Manager-Theme an den Toolbar-Schalter koppeln.** Der Toolbar-Schalter steuert die
  Preview (`data-theme` am `<html>` des Story-Frames); das Storybook-Chrome ist kein Teil
  des Design Systems und folgt daher nur dem Betriebssystem.

## Begründung

- Der Docgen-Server macht die JSDoc-Kommentare der Lib zur Doku-Quelle und ist zugleich
  der einzige Weg zum Komponenten-Manifest. Die Compodoc-Pipeline hat in diesem Repo nie
  gelaufen; es gibt nichts zu bewahren.
- Das Manifest und der MCP-Endpunkt sind die Schnittstelle, über die Agenten Stories,
  Tests und Doku dieses Design Systems lesen — dieselbe Arbeitsweise, die Atelier bereits
  produktiv nutzt. Das CI-Gate verhindert, dass ein künftiges Update das Manifest still
  wieder abschaltet.
- `@internal` wirkt an der Quelle: Props-Tabelle, Controls-Panel und das MCP-Manifest
  (`services/core/docgen/*.json`) zeigen dieselbe, bereinigte API — Agenten sehen keine
  CVA-Methoden mehr. Ein clientseitiger Filter hätte das Manifest nie erreicht.
- Die Theme-Werte sind fest verdrahtet, weil der Manager ein eigenes React-Bundle ohne
  Zugriff auf die CSS-Custom-Properties der Preview ist. Token-Namen im Kommentar sind
  der Kompromiss: eine Token-Änderung in `css/` fällt bei der Suche nach dem Namen auf.

## Konsequenzen

- Props-Tabellen zeigen Inputs und Outputs mit Beschreibung aus dem JSDoc der Lib.
  Wer eine Beschreibung ändern will, ändert sie **in der Lib**, nicht in der Story;
  Story-`argTypes` überschreiben nur, wo sie bewusst gesetzt sind.
- Wer einer Komponente ein neues öffentliches Member gibt, das kein Input/Output ist,
  muss es `@internal` taggen — sonst erscheint es in Props-Tabelle und Manifest. Es gibt
  dafür (noch) kein Gate; ein Zähler über `argTypes[*].table.category` im Manifest wäre einer.
- Der bekannte Bug in `@storybook/angular-vite` (Component-only-Stories rendern unter
  Vitest „undefined“, wenn `setProjectAnnotations` die Framework-Annotationen nicht
  explizit erhält) besteht in 10.6.0 fort; der Workaround in `vitest.setup.ts` bleibt.
- Ändert sich ein Token in `css/tokens.css` oder `css/dark-mode.css`, muss `theme.ts`
  nachgezogen werden. Es gibt dafür kein Gate.
- Follow-ups, bewusst nicht in diesem Schritt: (a) `@storybook/addon-vitest` meldet, dass
  es Preview-Annotationen seit 10.3 selbst anwendet — ob `vitest.setup.ts` damit ganz
  entfallen kann, ist ungeprüft; (b) die Docs-Chrome folgt nicht dem Toolbar-Theme
  (Storybook bietet dafür keinen Haken ohne eigenen `DocsContainer`).

### Der MCP-Endpunkt ist im lokalen Netz erreichbar — bewusst

`angular.json` bindet den Dev-Server auf `"host": "0.0.0.0"`, also an alle Interfaces.
Das stand dort schon vor diesem Schritt, damit sich Storybook von anderen Geräten
aufrufen lässt; neu ist, dass unter `/mcp` jetzt eine JSON-RPC-Oberfläche daran hängt.
Wer den Port erreicht, kann ihre Werkzeuge aufrufen — eine Authentifizierung gibt es nicht.

Geprüft, was hinter den Werkzeugen steckt, statt von den Namen auszugehen: Der
überwiegende Teil ist lesend (`stories-preview`, `stories-changed`,
`stories-find-by-component`, `docs-list`, `docs-show`, `docs-show-story`,
`get-storybook-story-instructions`). Eine Ausnahme: `test-run` läuft über
`boot-test-runner.ts` in `@storybook/addon-vitest` und startet dort per
`executeNodeCommand` einen Node-Prozess. Bei `review-create` ließ sich die
Implementierung im ausgelieferten Bundle nicht auflösen; dort liegt nur die
Statusseite, die den Namen listet.

Wir nehmen das in Kauf, aus vier Gründen: Die Bindung öffnet nichts nach außen, ein
Zugriff setzt Anwesenheit im selben Netz voraus. Über `test-run` lässt sich kein
fremder Code einschleusen, nur der ausführen, der ohnehin im Repo liegt. Der
Lesezugriff betrifft Stories und Doku eines Design Systems, das zur Veröffentlichung
bestimmt ist. Und die Erreichbarkeit im Netz ist der Zweck der Einstellung.

Die Grenze der Abwägung: In einem fremden Netz — Konferenz- oder öffentliches WLAN —
ist „im selben Netz“ eine deutlich schwächere Schranke als im Firmennetz. Wer dort mit
laufendem Dev-Server arbeitet, startet ihn mit `npm run storybook -- --host 127.0.0.1`.
Sollte der Endpunkt je Werkzeuge bekommen, die über Lesen und Testläufe hinausgehen,
ist diese Abwägung neu zu treffen.
