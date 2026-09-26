# ADR-0012: MCP-Server für Consumer auf Basis der Storybook-Manifeste

- Status: akzeptiert
- Datum: 2026-09-25
- Ergänzt: [ADR-0004](0004-verteilung-und-versionierung.md) (drittes Paket im
  Lockstep), [ADR-0006](0006-storybook-10-6-docgen-server-mcp-und-theming.md)
  (Manifest als Schnittstelle für Agenten), [ADR-0010](0010-release-ausloesung-und-versionsquelle.md)
  (Stories und MDX werden veröffentlichungsrelevant), [ADR-0011](0011-veroeffentlichung-auf-npmjs.md)
  (dieselben zwei Registries).

## Kontext

Seit ADR-0006 schreibt der Storybook-Build `manifests/components.json` und
`manifests/docs.json` (plus die `$ref`-Ziele unter `services/core/`, zusammen rund
1,1 MB); der Dev-Server stellt über `@storybook/addon-mcp` unter `/mcp` Werkzeuge für
Agenten bereit. Das erreicht nur Maintainer dieses Repos, die den Dev-Server laufen
haben. Ein [Consumer](../../CONTEXT.md#consumer--konsument) hat nichts davon: Seine KI
kennt die API der [Angular-Lib](../../CONTEXT.md#angular-lib) nicht, erfindet Inputs
und vergisst, die [CSS-Schicht](../../CONTEXT.md#css-schicht) global einzubinden — ohne
sie sehen die [Wrapper-Komponenten](../../CONTEXT.md#wrapper-komponente) kaputt aus
(ADR-0001).

Das veröffentlichte Storybook (ADR-0009) liefert die Manifeste zwar öffentlich aus,
zeigt aber immer den Stand von `main`, nicht die Version, die ein Consumer installiert
hat. Storybook bietet mit `@storybook/mcp` eine Bibliothek (kein `bin`), die
`docs-list`, `docs-show` und `docs-show-story` an einen `tmcp`-Server hängt und die
Manifeste über einen frei wählbaren `manifestProvider` liest.

## Entscheidung

- **Eigenes Paket `@conciso/design-system-mcp`** im Workspace `mcp-server/`, als
  drittes Paket in beiden Registries (npmjs.org ohne Auth und GitHub Packages, siehe
  ADR-0011) und in der
  [Lockstep-Versionierung](../../CONTEXT.md#lockstep-versionierung). `bin`: `cds-mcp`.
- **Zielgruppe zuerst Angular-Consumer.** Werkzeuge für reine CSS-Schicht-Nutzer
  (Tokens, Klassen, Icons) folgen später.
- **Daten sind ein mitgelieferter Snapshot** der Manifeste (`manifests/` und
  `services/`) aus dem Storybook-Build desselben Commits. Kein Live-Abruf von Pages.
- **Aufgebaut auf `@storybook/mcp`**, versionsgleich gepinnt zu der Storybook-Version,
  mit der der Snapshot gebaut wurde; der `manifestProvider` liest aus dem Paket.
- **Transport stdio** über `tmcp`. Kein Port, kein Dienst, nichts im Netz erreichbar.
- **Eigene deutsche `instructions`** mit den harten Regeln des Design Systems (CSS-Schicht
  global einbinden, kein eigenes CSS für DS-Komponenten, nur dokumentierte Inputs und
  Outputs, vorher `docs-show`).
- **Einrichtung als MDX-Seite im Storybook** („Einrichtung“, mit Abschnitt
  „KI-Assistenten anbinden“). Sie gelangt über `docs.json` in den Snapshot; es gibt
  kein eigenes Setup-Werkzeug. Das README des Pakets verweist darauf.
- **Installation als `devDependency`**, empfohlen über eine committete `.mcp.json`
  im Projekt. Der Server vergleicht beim Start die installierte Version der
  Angular-Lib mit seiner eigenen und **warnt** bei Abweichung (in den `instructions`
  und auf stderr), statt abzubrechen.
- **`storybook-angular/src/**` wird
  [veröffentlichungsrelevanter Pfad](../../CONTEXT.md#veröffentlichungsrelevanter-pfad).**
  Die Bump-Regeln aus ADR-0010 bleiben unverändert: `docs`-Commits lösen kein Release
  aus, ihr Stand fährt mit dem nächsten Release mit.
- **CI-Gate:** Ein Smoke-Test startet den per `npm pack` gebauten Tarball über stdio
  und prüft `initialize`, die drei Werkzeuge, die dokumentierten Inputs/Outputs einer
  bekannten Komponente, das Fehlen von `@internal`-Membern und die Seite „Einrichtung“
  (`mcp-server/scripts/smoke-test.mjs`). Läuft zweimal: bei jedem PR/Push als eigener Job in
  `storybook-angular.yml` (Platzhalter-Version `0.0.0`, prüft die Paketstruktur), und im
  Publish-Workflow als **Schritt innerhalb** des Publish-Jobs, NICHT als vorgeschaltete
  `needs:`-Abhängigkeit. Grund: Die echte Version steht erst nach `stamp-version.mjs` im
  gestempelten Tarball, und dieses Stempeln passiert bereits im Publish-Job, vor dem Bauen von
  CSS-Schicht, Angular-Lib und MCP-Snapshot; ein separater `needs:`-Job müsste Stempel-, Build-
  und Pack-Schritt duplizieren oder gegen den unbrauchbaren Platzhalter 0.0.0 prüfen. Der
  Smoke-Test läuft deshalb auf demselben Tarball, der direkt danach veröffentlicht wird —
  schlägt er fehl, bricht der Publish-Job ab, bevor `npm publish` läuft.

### Bewusst nicht gewählt

- **`bin` in der Angular-Lib.** Versionsgleichheit wäre gratis, aber die Lib bekäme
  eine Node-Laufzeitabhängigkeit und 1,1 MB, die jeder Consumer ohne KI-Werkzeug
  mitzahlt; ng-packagr müsste ein CLI mitbauen.
- **Live-Abruf von GitHub Pages.** Liefert den Stand von `main` — genau die erfundene
  API, die der Server verhindern soll, nur mit offiziellem Anschein.
- **Eigene Implementierung der Doku-Werkzeuge.** Dupliziert `@storybook/mcp` und müsste
  jeder Formatänderung des Manifests hinterherlaufen.
- **Lokales HTTP.** Braucht einen laufenden Dienst und einen Port und brächte die
  Netz-Abwägung aus ADR-0006 zurück.
- **Exakte `peerDependency` auf die Lib.** npm bricht dann mit ERESOLVE ab, sobald nur
  die Lib aktualisiert wird; die Laufzeitwarnung erreicht die KI dort, wo der Fehler
  sonst entstünde.

## Begründung

Das Kernproblem sind erfundene Props. Dagegen hilft nur Wissen, das zur installierten
Version passt — daher Snapshot und Lockstep. Die Werkzeuge sind dieselben, die
Maintainer über addon-mcp nutzen; Consumer- und Maintainer-KI sehen dieselbe
Oberfläche, gepflegt von Storybook. Die Regeln in den `instructions` wirken, bevor die
KI überhaupt ein Werkzeug aufruft.

**Scope-Erweiterung (siehe Nachtrag unten):** Ebenso oft wie die erfundene Prop ist die
falsch gewählte Komponente oder Variante, dagegen hilft kein Docgen, sondern nur
Verwendungsguidance, die denselben Aufruf erreicht.

## Konsequenzen

- Für Commits unter `storybook-angular/src/**` gilt ab jetzt commitlint. Wer eine
  Doku-Korrektur sofort ausliefern will, committet sie als `fix`.
- Jedes Storybook-Update ist zugleich ein Update von `@storybook/mcp`. Das Paket ist
  jung; seine API kann sich in Minor-Versionen ändern. Der Smoke-Test fängt Brüche,
  nimmt aber die Prüfarbeit nicht ab.
- Der Publish-Workflow, die Existenzprüfung in `decide.mjs` (je Registry), die
  Pfadliste (`relevant-paths.mjs`) und der Check, der sie gegen die `files`-Felder
  abgleicht, müssen das dritte Paket kennen.
- **`tagHasMcp`-Fakt statt `NPM_BASELINE`-artiger Konstante:** `NPM_BASELINE` aus ADR-0011
  ist für den MCP-Server bedeutungslos — es markiert den letzten Tag, den es NUR auf GitHub
  Packages gab, aber den MCP-Server gab es dort vor der hier beschriebenen Einführung
  überhaupt nicht, auf KEINER Registry. Eine analoge feste Versions-Konstante wäre hier aber,
  anders als bei `NPM_BASELINE`, eine Wette auf die Zukunft: ob ein Tag `mcp-server/` kennt,
  ist eine Eigenschaft des BAUMS seines Commits, keine Eigenschaft seiner Versionsnummer, und
  `main` kann zwischen dem Schreiben dieses Codes und dem Merge des MCP-Servers weiterziehen
  (ein `feat`-PR released z. B. v2.2.0, bevor der MCP-Server merged wird) — eine hartkodierte
  Version wäre dann zu niedrig, und die Existenzprüfung versuchte, den MCP-Server rückwirkend aus
  einem Tag-Commit ohne `mcp-server/`-Verzeichnis nachzuziehen, jeder weitere Release bliebe
  blockiert. `decide.mjs` bekommt den Fakt deshalb direkt vom Workflow: `tagHasMcp` prüft, ob
  der Baum des getaggten Commits `mcp-server/package.json` enthält
  (`git cat-file -e "$TAG^{commit}:mcp-server/package.json"`) — für BEIDE Registries
  gleichermaßen (anders als `NPM_BASELINE` betraf das MCP-Fehlen nie nur eine Registry). Der
  Fakt fehlt sicher: ohne ihn (Default `false`) wird nie versucht, MCP aus einem Tag zu
  heilen.
- Der Smoke-Test schließt nebenbei die in ADR-0006 genannte Lücke „kein Gate für
  `@internal`“ — zumindest für das ausgelieferte Manifest.
- **Per Spike verifiziert (2026-09-25):** Die `add*Tool`-Funktionen von `@storybook/mcp`
  10.6.0 laufen auf einem `tmcp`-Server (`.withContext()`) mit `@tmcp/transport-stdio`
  ganz ohne HTTP-`Request`; der `manifestProvider` erreicht die Werkzeuge über das
  Kontextobjekt, das `transport.listen(…)` übergeben bekommt. Er wird mit Pfaden relativ
  zur Storybook-Wurzel aufgerufen (`./manifests/components.json`,
  `./services/core/docgen/<id>.json`); `manifests/` und `services/` lassen sich also 1:1
  ins Paket kopieren. `docs-show` für Button liefert genau Inputs und Outputs, keine
  `@internal`-Member. Die Brücke auf den HTTP-Handler wird nicht gebraucht.

## Nachtrag (2026-09-26): Verwendungsseiten an Komponenten

**Kontext.** Migrierte Verwendungsseiten (Dos & Don'ts, Begründungen) liegen als
eigenständige MDX-Seiten mit eigener Doku-ID neben ihrer Komponente.
`@storybook/mcp` führt Komponenten- und Doku-Manifest nur zusammen, wenn eine
MDX-Seite per `<Meta of={Component}>` an eine Story hängt
(`componentManifest.docs`). Ohne dieses Attachment liefert `docs-show` einer
Komponente nie die Verwendungsguidance, ein Consumer-Agent müsste die zweite,
andersartige Doku-ID selbst finden.

**Entscheidung.** Verwendungsseiten hängen künftig per
`<Meta of={ComponentStories}>` an einer tragenden Komponente ihrer Gruppe, statt
als eigenständige Seite daneben zu stehen. Bei Gruppen mit mehreren Komponenten
wird die tragende Komponente je Gruppe explizit festgelegt.

Per Spike an Button verifiziert: `components.json[komponenten-buttons-button]`
trägt danach ein `docs`-Feld, `docs-show(komponenten-buttons-button)` liefert
den Verwendungstext unter einer neuen `## Docs`-Überschrift.

**Konsequenzen.**

- Die Doku-ID einer angehängten Seite wechselt auf `<komponenten-id>--verwendung`,
  bisherige eigenständige IDs entfallen. Referenzen auf eine alte ID vorher prüfen.
- Der Eintrag verschwindet aus `docs-list`, er kommt nur noch automatisch mit
  `docs-show` der Komponente.
- In der Sidebar wird die Verwendungsseite Kind der tragenden Komponente statt
  deren Geschwister, `storySort` in `preview.ts` braucht dafür je Gruppe einen
  Nachzug.
- Die MDX-Kopfzeile (Import, `<Meta>`) erscheint unverändert als Text in
  `docs-show`. Kosmetisch, keine Assertion ist davon betroffen.
