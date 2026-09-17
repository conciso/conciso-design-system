# ADR-0007: API-Konventionen der Angular-Komponenten

- Status: akzeptiert
- Datum: 2026-09-17

## Kontext

Ein Review aller 37 Komponenten der Angular-Lib gegen die Angular-Konventionen (Signals, Change
Detection, Barrierefreiheit, Testbarkeit) förderte rund 170 Befunde zutage. Die meisten waren
Einzelfälle, aber fünf Muster zogen sich durch fast jede Datei. Sie hatten eine gemeinsame
Ursache: es gab keine festgeschriebene Antwort auf die Frage, **was an einer
[Wrapper-Komponente](../../CONTEXT.md#wrapper-komponente) eigentlich ihre öffentliche Oberfläche
ist**. Ohne diese Antwort wanderte alles Mögliche hinein — Template-Getter, interne Zustände,
erfundene Beispieltexte als Vorgabewerte.

Die Einzelbefunde sind behoben. Diese ADR hält die Regeln fest, die dabei entstanden sind, damit
die nächste Komponente sie von vornherein erfüllt.

## Entscheidung

### 1. Die API ist genau: Inputs und Outputs

Alles andere an einer Komponentenklasse ist Implementierung. Template-Getter, Event-Handler,
interne Zustandssignale und Lifecycle-Hooks sind `protected` und tragen `@internal`. Methoden, die
ein Interface erfüllen (`ControlValueAccessor`), bleiben notwendigerweise `public` und tragen
deshalb nur `@internal`.

Das ist nicht kosmetisch: seit [ADR-0006](0006-storybook-10-6-docgen-server-mcp-und-theming.md)
liest der Docgen-Server die Klassen direkt und speist daraus Props-Tabelle, Controls und das
Manifest, das Agenten über MCP abfragen. Was nicht markiert ist, wird dort als API angeboten.

### 2. Inhalt ist Pflicht, Beiwerk ist leer, Konfiguration hat Vorgaben

Drei Sorten Input, drei Regeln:

- **Inhalt** — das, was die Komponente darstellt (`quote`, `label`, `items`, `slides`, `code`):
  `input.required()`. Ohne ihn ist die Komponente sinnlos.
- **Beiwerk** — weglassbare Zusätze (`roleLabel`, `trendText`, `meta`): optional mit dem Default
  `''`.
- **Konfiguration** — Varianten und Verhalten (`area`, `tone`, `hero`, `interval`): optional mit
  einer echten, verteidigbaren Vorgabe.

Der Auslöser: zehn Komponenten trugen erfundenen Conciso-Beispieltext als Vorgabewert. Wer eine
Bindung vergaß, lieferte „Maria Schneider, Head of Marketing“ oder eine Recruiting-FAQ an seine
Nutzer aus, ohne dass irgendetwas fehlschlug. Beispieldaten gehören in die Stories, nicht in die
Bibliothek.

### 3. OnPush und `computed()` sind der Normalfall

Abgeleitete Werte sind `computed()`, nicht Getter; Komponenten laufen mit
`ChangeDetectionStrategy.OnPush`. Die Reihenfolge ist dabei nicht beliebig: ein Getter, dessen
Quelle kein Signal ist, wird unter OnPush nicht mehr verlässlich neu berechnet. Erst `computed()`,
dann OnPush.

### 4. Zustand wird abgeleitet, nicht in `effect()` geschrieben

`computed()` für reine Ableitungen, `linkedSignal` für Zustand, der aus einem Input vorbelegt wird
und lokal überschreibbar bleibt. `effect()` ist für Seiteneffekte.

Eine begründete Ausnahme steht in `scale.component.ts`: Der Wert ist ein zweiseitig gebundenes
`model()`, das ein Konsument direkt setzen kann. `computed()` und `linkedSignal` erzeugen jeweils
ein eigenes abgeleitetes Signal und können nicht in ein fremdes zurückschreiben — eine Korrektur
muss dort aber beim Konsumenten ankommen, nicht nur in der Anzeige. Wer eine solche Ausnahme
braucht, begründet sie im Code.

### 5. Abstraktion erst beim dritten Vorkommen

Zwei gleiche Stellen sind ein Zufall. Diese Regel hat im Review in beide Richtungen entschieden:
die Formular-Anbindung von vier Komponenten wurde zu `CvaBase` zusammengezogen, die drei
„Klick außerhalb schließt“-Behandlungen blieben getrennt, weil sie sich in Ereignistyp, Aufruf und
Vorbedingung unterscheiden und eine gemeinsame Fassung entweder Verhalten vereinheitlicht oder so
viel parametrisiert hätte, dass nichts gewonnen wäre.

Ebenfalls abgelehnt: ein DI-gebundener ID-Generator gegen Drift beim serverseitigen Rendern. Die
Begründung trug nicht, weil serverseitiges Rendern in diesem Repo nirgends erreichbar ist — kein
`platform-server`, kein `server.ts`, kein Prerender-Target, und die Consumer-Fixture baut für den
Browser. Gegen ein Problem zu bauen, das sich nicht zeigen lässt, kostet mehr als es spart.
Sollte SSR ein Thema werden, ist dieser Punkt erneut zu prüfen.

## Konsequenzen

- Die Punkte 1 und 2 sind **Breaking Changes** gegenüber 1.0.0: Pflicht-Inputs und der entfallene
  `FieldShellComponent`-Export. Sie liegen zusammen mit dem anstehenden Angular-Peer-Bump im
  nächsten MAJOR, siehe [ADR-0004](0004-verteilung-und-versionierung.md) zum Lockstep beider
  Pakete.
- Eine neue Komponente erfüllt diese Regeln von Anfang an. Der Review-Aufwand entfällt damit,
  nicht aber die Prüfung im Pull Request.
- Es gibt kein automatisches Gate für Punkt 1. Ein Zähler über die Kategorien im
  Komponenten-Manifest (`properties` und `methods` müssen 0 bleiben) wäre eines und ist als
  Möglichkeit vermerkt.
- Punkt 2 macht die Stories zur Heimat der Beispieldaten. Wer eine Komponente neu anlegt, schreibt
  die Demo-Werte dort hin, nicht in die Klasse.
