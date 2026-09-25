# ADR-0012: Service-API für Overlays

- Status: akzeptiert
- Datum: 2026-09-25

## Kontext

Bis hierher besteht die [Angular-Lib](../../CONTEXT.md#angular-lib) nur aus
[Wrapper-Komponenten](../../CONTEXT.md#wrapper-komponente), die ein Konsument in sein Template
setzt. [ADR-0007](0007-api-konventionen-der-angular-komponenten.md) legt dafür fest, was ihre
öffentliche Oberfläche ist: genau Inputs und Outputs.

Der [Bestätigungsdialog](../../CONTEXT.md#bestätigungsdialog) (Issue #45) passt nicht in dieses
Muster. Sein erster Anwender ist ein `CanDeactivate`-Guard: Er soll fragen, ob ungespeicherte
Änderungen verworfen werden, und die Antwort direkt zurückgeben. Ein Guard ist eine Funktion,
er hat kein Template, in das man `<cds-confirm-dialog>` setzen könnte. Eine deklarative
Komponente mit `[open]` und `(closed)` würde den Konsumenten zwingen, sie in eine Seite zu
setzen, ihren Zustand dort zu halten und das Ergebnis per Hand an den Guard zurückzureichen.

## Entscheidung

1. **Overlays, die eine Antwort liefern, bekommen einen Service als öffentliche API.** Für den
   Bestätigungsdialog ist das `CdsConfirmDialog` mit `open(options): Promise<boolean>`
   (`providedIn: 'root'`). Die öffentliche Oberfläche eines solchen Services ist seine
   Methodensignatur plus der Options-Typ (`CdsConfirmDialogOptions`). Das ergänzt ADR-0007 § 1:
   dort Inputs und Outputs, hier Methoden und Typen.
2. **Die Komponente, die der Service rendert, bleibt intern.** `ConfirmDialogComponent` steht nicht
   in `public-api.ts`. Sie folgt trotzdem ADR-0001 (nur Klassen der CSS-Schicht, hier `.dialog`)
   und ADR-0007 (Inhalt `input.required()`, Implementierung `protected` + `@internal`).
3. **Der Service rendert selbst**: `createComponent` mit dem `EnvironmentInjector` der App, Host
   direkt unter `<body>`, `ApplicationRef.attachView`, nach dem Schließen `destroy()` und Host
   entfernen. Das ist der erste Ort in der Lib, der dynamisch rendert; er bleibt bewusst klein
   und ohne eigene Overlay-Infrastruktur.
4. **Höchstens ein offenes Overlay je Service.** Ein zweiter Aufruf, solange eines offen ist,
   erhält dasselbe Promise. Wird die App zerstört, solange es offen ist, löst das Promise mit
   `false` auf.
5. **Das Ergebnis entsteht im `close`-Event des nativen `<dialog>`**, das der Browser asynchron
   auslöst. Erst dort ist `returnValue` gesetzt und der Dialog geschlossen.

## Begründung

- Ein Promise ist das, was ein Guard zurückgeben kann. Jede andere Form verlagert Zustand und
  Verdrahtung zum Konsumenten, und zwar bei jeder Verwendung neu.
- Die Komponente intern zu halten folgt der Regel aus ADR-0007 § 5, erst beim dritten Vorkommen
  zu abstrahieren, sinngemäß auch für öffentliche API: Eine Template-Form ist später ohne Bruch
  ergänzbar, eine veröffentlichte wieder zu entfernen kostet einen Major.
- `@angular/cdk/overlay` wurde nicht herangezogen. Das native `<dialog>` liefert Top-Layer,
  Fokus-Falle, Escape und die inerte Seite bereits; die CDK brächte eine neue peerDependency und
  eigene Styles, die mit der globalen CSS-Schicht konkurrieren (ADR-0001).

## Konsequenzen

- Ein künftiges Overlay mit Antwort (etwa ein Auswahl-Dialog) folgt diesem Muster. Kommt ein
  drittes dazu, ist eine gemeinsame Basis für das Rendern zu prüfen (ADR-0007 § 5).
- Getestet wird wie überall über Stories ([ADR-0005](0005-testebene-der-angular-lib.md)). Weil
  der Dialog unter `<body>` hängt, suchen die Play-Functions ihn über `screen`, nicht im
  `canvasElement`. Escape lässt sich dort nicht auslösen (synthetische Events stoßen das native
  `cancel` nicht an, dieselbe Grenze wie bei `cds-slider`); die Story stellt stattdessen
  `close()` ohne `returnValue` nach, der echte Tastendruck ist mit Playwright gegengeprüft.
- Serverseitiges Rendern ist wie in ADR-0007 § 5 nicht erreichbar und nicht berücksichtigt. Der
  Service fasst `document` erst in `open()` an, ein Aufruf beim Rendern auf dem Server wäre ein
  Fehler des Aufrufers.
