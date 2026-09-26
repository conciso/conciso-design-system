# MCP-Server-Eval: mit und ohne Server

Misst, ob der [MCP-Server](../../CONTEXT.md#mcp-server) der KI eines Consumers tatsächlich
hilft — nicht nur, ob das Protokoll antwortet. Siehe
[ADR-0012](../adr/0012-mcp-server-fuer-consumer.md).

## Warum das ein eigenes Skript ist, kein CI-Gate

Der [Tarball-Smoke-Test](../adr/0012-mcp-server-fuer-consumer.md) (`npm run test:smoke -w
mcp-server`) prüft das Protokoll: antwortet `docs-show`, fehlt kein `@internal`-Member. Er
sagt nichts darüber, ob eine KI mit diesem Server tatsächlich bessere Antworten gibt als
ohne — genau das prüft dieses Eval-Set, per echtem `claude -p`-Aufruf. Zwei Gründe, warum das
kein CI-Gate ist:

- **Kein deterministisches Ergebnis.** Modellantworten variieren zwischen Läufen.
- **Jeder Lauf verbraucht Nutzungskontingent bzw. echtes API-Guthaben** (siehe „Was es kostet“
  unten für die Unterscheidung). Ein CI-Gate liefe bei jedem Push.

## Wann ausführen

- **Vor einem Release** des MCP-Servers oder der Angular-Lib (API-Änderungen an Komponenten).
- **Nach einem Storybook-Update**, das `@storybook/mcp` oder die Docgen-Ausgabe betrifft (siehe
  ADR-0012, Konsequenzen: „Jedes Storybook-Update ist zugleich ein Update von
  `@storybook/mcp`“).
- Nicht bei jeder Doku- oder Story-Änderung — dafür reicht der Tarball-Smoke-Test.

## Was es kostet

Ein Lauf startet **zwei `claude -p`-Aufrufe pro Frage** in `mcp-server/eval/fragen.json`
(mit Server, ohne Server), jeweils mit dem in der Umgebung konfigurierten Standardmodell und
maximal 240 s Timeout pro Aufruf. Die tatsächliche Fragen-/Aufrufzahl wächst mit dem Eval-Set
mit — sie steht verlässlich am Kopf jedes Berichts (`Fragen: N`), nicht hier. Der Bericht selbst
nennt auch den **API-Gegenwert** (Zeile „Gesamt-API-Gegenwert (total_cost_usd)“ oben,
„API-Gegenwert (total_cost_usd)“ je Lauf im Detail-Abschnitt — aus `total_cost_usd` der
`claude`-Ausgabe, keine Schätzung).

**`total_cost_usd` ist ein API-Preis-Gegenwert, keine tatsächliche Abbuchung.** Läuft `claude`
in der aktuellen Shell über ein **claude.ai-Abo** (Pro/Max/Team), wird dafür nichts abgerechnet
— der Lauf zählt gegen das Nutzungskontingent des Abos, `total_cost_usd` ist dann nur der
rechnerische Gegenwert in US-Dollar, keine reale Zahlung. **Echte, abgerechnete Kosten** in
dieser Höhe entstehen nur bei Authentifizierung per `ANTHROPIC_API_KEY` (Pay-per-Token). Vor dem
Ausführen also nicht nur `claude --version` prüfen, sondern auch, über welchen Weg diese Shell
authentifiziert ist, wenn der Unterschied (Kontingent vs. echtes Geld) für die Entscheidung
relevant ist.

Als Richtwert (API-Gegenwert bzw. Kontingent-Verbrauch, kein Zielwert): ein Baseline-Lauf mit
11 Fragen (22 Aufrufe) lag bei rund **$5,82 API-Gegenwert** insgesamt. Mit einem denkfähigen
Modell und mehreren Werkzeugaufrufen pro Frage („mit Server“ ruft typischerweise 3–7 Werkzeuge
auf, inklusive der internen `ToolSearch`-Suche nach den MCP-Werkzeugen) bewegt sich ein Lauf im
niedrigen einstelligen Euro-Gegenwert-Bereich und wächst mit der Fragenzahl mit — die für den
jeweils aktuellen Lauf tatsächliche Summe steht in der Kopfzeile des eigenen Berichts.

## Ausführen

```bash
npm run build:storybook              # falls storybook-static fehlt oder veraltet ist
npm run build:snapshot -w mcp-server # optional — npm pack baut den Snapshot im prepack-Hook ohnehin neu
npm run eval -w mcp-server           # packt sich selbst und läuft gegen den Tarball
# oder gegen einen bereits gebauten Tarball:
npm run eval -w mcp-server -- /pfad/zu/conciso-design-system-mcp-0.0.0.tgz
```

Voraussetzung ist in jedem Fall ein aktueller `storybook-angular/storybook-static`-Build —
ohne Tarball-Argument packt sich das Paket selbst (`npm pack -w mcp-server`, dieselbe
Vorgehensweise wie der `mcp-smoke-test`-Job in `.github/workflows/storybook-angular.yml`);
dessen `prepack`-Hook baut den Snapshot aus dem vorhandenen Storybook-Build neu
(`scripts/build-snapshot.mjs`), baut das Storybook selbst aber nicht.

## Wie der Bericht zu lesen ist

Das Skript schreibt eine Markdown-Tabelle (Frage × „mit Server“ × „ohne Server“) auf stdout
und in eine Datei unter dem System-Temp-Verzeichnis (Pfad steht am Ende der Ausgabe;
überschreibbar über `CDS_MCP_EVAL_REPORT_DIR`). Jede Zelle nennt:

- **Werkzeugfehler** — ein `tool_result` mit `isError` macht den Lauf **immer** rot,
  unabhängig vom Antworttext.
- **Erfundene API** — Attribute/Bindungen auf `cds-*`-Elementen in Code-Blöcken der Antwort,
  die für die jeweilige Komponente **nicht** in den `argTypes` des installierten Snapshots
  stehen (`table.category` `inputs`/`outputs`). Kein LLM-Richter: reine Textanalyse gegen die
  echten Docgen-Daten, siehe `mcp-server/eval/checker.mjs`. Standard-HTML-/Angular-Attribute
  (`class`, `id`, `style`, `aria-*`, `data-*`, `*ngIf`, `#ref`, `ngModel`, `(click)` u. Ä.)
  werden dabei ignoriert — die vollständige Liste steht am Kopf von `checker.mjs`.
- **CSS-Hinweis** — nur bei Fragen mit `"checks": ["setup-mentions-global-css", …]`: erwähnt
  die Antwort, dass die CSS-Schicht global eingebunden werden muss (ADR-0001).
- **Kernaussage** — nur bei Fragen mit `"checks": ["core-claim-keywords", …]` (Intentionsfragen,
  siehe unten): trifft die Antwort die erwartete Kernaussage der Verwendungsguidance? Ebenfalls
  kein LLM-Richter, reiner Stichwort-Abgleich gegen `claimKeywords` in der Frage
  (`mcp-server/eval/checker.mjs`, Funktion `checkCoreClaim`). Die Zelle nennt bei einem Fehlschlag,
  wie viele der Teilaspekte (Gruppen) keinen Treffer hatten; der Detail-Abschnitt listet sie
  einzeln mit ihren Synonymen auf.
- **Werkzeugaufrufe** — reine Zählung, keine Wertung; interessant im Vergleich „mit“ vs.
  „ohne“ (ruft die KI mit Server tatsächlich `docs-show` auf, bevor sie antwortet?). Zählt auch
  die interne `ToolSearch`-Suche mit, über die Claude Code MCP-Werkzeuge erst auflöst — die
  Zahl ist also kein reines Maß für „wie viele Design-System-Werkzeuge wurden benutzt“, der
  Detail-Abschnitt zeigt die einzelnen Aufrufe im Klartext.

Der Abschnitt „Details“ darunter zeigt pro Frage/Variante die konkreten Werkzeugaufrufe, jeden
gemeldeten Fund im Klartext und die gekürzte Antwort.

Exit-Code ist **0**, solange kein Werkzeugfehler und kein Infrastruktur-Fehler auftrat — auch
wenn die Tabelle erfundene Attribute oder fehlende CSS-Hinweise zeigt. Schlechte Antwortqualität
ist ein Befund für den Bericht, kein Skriptfehler.

## Fragen erweitern

`mcp-server/eval/fragen.json` ist eine reine Datendatei, ohne Codeänderung erweiterbar. Jeder
Eintrag:

```json
{
  "id": "kurzer-slug",
  "prompt": "Die Frage, wie ein Consumer sie stellen würde.",
  "components": ["komponenten-id-zur-einordnung-im-bericht"],
  "checks": ["no-invented-attributes"]
}
```

`checks` steuert nur Zusatzprüfungen — `no-invented-attributes` läuft ohnehin immer;
`setup-mentions-global-css` zusätzlich bei Einrichtungsfragen. `components` ist rein
informativ für den Bericht; die Wahrheit für die Attribut-Prüfung holt sich das Skript bei
jedem Lauf frisch aus dem installierten Snapshot, nie aus dieser Datei.

### Intentionsfragen und der Check-Typ „core-claim-keywords“

Eine **Intentionsfrage** prüft nicht nur, ob die API stimmt, sondern ob die KI die richtige
Komponente/Variante wählt oder eine Gestaltungsregel kennt — realistische Consumer-Prompts, die
**keine Lösung verraten** (die Frage nennt das Problem, nicht den Fachbegriff der erwarteten
Antwort). Mit `"checks": ["core-claim-keywords"]` kommt ein weiteres Feld dazu:

```json
{
  "id": "typo-serife-fliesstext",
  "prompt": "Ich will für den Fließtext meiner neuen Landingpage die Schriftart Libre Baskerville verwenden, weil sie mir optisch gefällt. Passt das zu den Typografie-Regeln des Conciso Design Systems?",
  "components": ["grundlagen-typografie"],
  "checks": ["no-invented-attributes", "core-claim-keywords"],
  "claimKeywords": [
    ["montserrat"],
    ["headline", "display", "überschrift", "titel", "hero"],
    ["ermüd", "serifenschrift", "serifenschriften"]
  ]
}
```

`claimKeywords` ist eine Liste von **Gruppen**. Jede Gruppe steht für einen Teilaspekt der
erwarteten Kernaussage (z. B. „welches Token/welche Schrift“, „warum“, „stattdessen was“) und
enthält Synonyme/Formulierungsvarianten dafür — innerhalb einer Gruppe genügt **ein** Treffer
(ODER), aber **alle** Gruppen müssen mindestens einen Treffer haben (UND), damit die Kernaussage
insgesamt als getroffen gilt (`checkCoreClaim` in `checker.mjs`). Der Abgleich ist bewusst
einfach gehalten, aber robust gegenüber:

- **Groß-/Kleinschreibung** (`MONTSERRAT` == `montserrat`),
- **Umlaut-/ß-Schreibvarianten und Unicode-Normalform** (vorkomponiertes „ü“ und zerlegtes „u“ +
  Combining-Diaeresis zählen gleich; `groß` == `GROSS`),
- **Wortstämmen als Stichwort** (`"ermüd"` matcht `ermüden`, `ermüdet`, `ermüdend`), sofern man
  bewusst einen Stamm statt eines flektierten Vollworts einträgt.

Kein LLM-Richter, keine Grammatik- oder Bedeutungsprüfung — ein Fund im Bericht („Kernaussage:
fehlt“) heißt „diese Stichwörter kamen nicht vor“, nicht zwingend „die Antwort ist inhaltlich
falsch“ (Formulierungen außerhalb der eingetragenen Synonyme rutschen durch), und umgekehrt kann
ein zufälliger Treffer eines generischen Stichworts (z. B. „oben“) eine korrekte Antwort
vortäuschen, die den Punkt in Wahrheit nicht trifft — wie bei `no-invented-attributes` ist der
Bericht ein Signal für die manuelle Einordnung, kein hartes Urteil.

**Quellenpflicht:** Die erwartete Kernaussage jeder Intentionsfrage muss aus der tatsächlichen
Guidance belegbar sein (Doku-Site `docs/index.html` oder Storybook-MDX unter
`storybook-angular/src/docs/**`) — das Zitat mit Fundstelle gehört nicht in diese Datei, sondern
ins Issue, das die Frage eingeführt hat (siehe `docs/agents/issue-tracker.md`).

## Grenzen der automatischen Prüfung (bewusst nicht behoben)

- Die Attribut-Extraktion ist ein Regex-Parser, kein vollständiger HTML-Parser: ein `>`
  innerhalb eines Attributwerts (z. B. `title="a > b"`) bricht die Erkennung für dieses Tag.
  In der Praxis selten, aber ein Fund im Bericht ist an dieser Stelle mit Vorsicht zu lesen.
- Komponenten mit Attribut-Selektor (`div[cdsIconCard]`, siehe
  [ADR-0008](../adr/0008-selektortyp-der-wrapper-komponenten.md)) werden nur erkannt, wenn das
  Marker-Attribut im selben Tag steht wie die geprüften Bindungen — bei mehrzeilig
  aufgebrochenen Tags mit sehr ungewöhnlicher Formatierung kann das fehlschlagen.
- Ein `[icon]`-Binding, das zufällig denselben Namen wie ein *dokumentiertes* Input einer
  *anderen* Komponente trägt, wird korrekt erkannt (die Prüfung ist pro Element, nicht global)
  — nur zur Klarheit, weil das auf den ersten Blick nicht offensichtlich ist.
- Der Bericht zeigt die Antwort nur gekürzt (600 Zeichen); die vollständige Antwort wird nicht
  separat weggeschrieben, das Consumer-Verzeichnis wird nach jedem Lauf gelöscht. Bei einem
  überraschenden Fund („erfundene API“, aber die Kürzung zeigt keinen Code) bleibt nur ein
  erneuter, gezielter Lauf mit genau dieser Frage, um die volle Antwort zu sehen.
- „Erfundene API: keine“ heißt nicht automatisch „geprüft und sauber“ — bei 0 geprüften
  `cds-*`-Elementen (steht in der Zelle dabei) gab es schlicht keinen Code-Block mit einem
  `cds-*`-Element zu prüfen, etwa weil die KI auf die Fangfrage bewusst kein Beispiel gegeben hat.
