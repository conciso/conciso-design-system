# Kontext & Glossar — Conciso Design System

Dieses Dokument hält die gemeinsame Sprache des Repos fest. Wenn ein Begriff hier
definiert ist, benutze **genau diesen** Begriff (in Issues, ADRs, Commit-Messages,
Testnamen) und nicht ein Synonym.

Entscheidungen, die diese Begriffe tragen, stehen als ADRs unter [`docs/adr/`](docs/adr/).

## Landschaft

Das Design System besteht aus einer framework-agnostischen Basisschicht und
frameworkspezifischen Aufsätzen darauf:

- **CSS-Schicht** (`@conciso/design-system`) — die Quelle der Wahrheit für Aussehen
  und Tokens.
- **Angular-Lib** (`@conciso/design-system-angular`) — dünne Wrapper-Komponenten
  über der CSS-Schicht.
- **Storybook** (`storybook-angular/`) — dokumentiert und testet die Angular-Lib; die
  öffentlich veröffentlichte Doku des Design Systems.
- **Doku-Site** (`docs/index.html`) — eigenständige statische Doku der CSS-Schicht,
  nicht veröffentlicht.

## Glossar

### CSS-Schicht

Das Paket `@conciso/design-system`: framework-agnostische Design-Tokens und
CSS-Komponenten (`css/*.css`, gebündelt in `dist/conciso-ds.css`), plus die
generierten Icon-Glyphen (`icons/icons.js`) und Fonts (`fonts/`). Wird als
**globaler Cascade** geladen — die Styles gelten dokumentweit, nicht pro Komponente
gekapselt. Dies ist die **Quelle der Wahrheit** für alles Visuelle.

### Angular-Lib

Das Paket `@conciso/design-system-angular`: die extrahierte Angular-Komponenten-
Bibliothek. Enthält die ~40 [Wrapper-Komponenten](#wrapper-komponente) und ihre
öffentlichen Typen. Gebaut mit ng-packagr im Angular Package Format, ein einziger
Einstiegspunkt (`public-api.ts`).

### Storybook

Die Doku des Design Systems, die nach außen zeigt: Stories, MDX-Seiten und
Komponenten-API der [Angular-Lib](#angular-lib) auf Basis der [CSS-Schicht](#css-schicht).
Öffentlich erreichbar, aber nicht für Suchmaschinen bestimmt. Die Pakete selbst
bleiben intern. Siehe [ADR-0009](docs/adr/0009-storybook-oeffentlich-auf-github-pages.md).

### Doku-Site

Die eigenständige, statische Doku-Seite der [CSS-Schicht](#css-schicht)
(`docs/index.html`). Existiert neben dem [Storybook](#storybook), wird aber
**nicht** veröffentlicht. Nicht synonym mit „Storybook“ verwenden.

### Wrapper-Komponente

Eine Angular-Komponente, die **kein eigenes CSS erfindet**, sondern ausschließlich
die vorhandenen CSS-Klassen der [CSS-Schicht](#css-schicht) zusammensetzt (z.B.
`cds-button` → `.btn .btn-filled .btn-co`). Konsequenz: Die Angular-Lib liefert
**keine Styles mit**; der Konsument muss die CSS-Schicht separat global einbinden.
Siehe [ADR-0001](docs/adr/0001-angular-lib-als-css-wrapper.md).

Die meisten Wrapper tragen einen Element-Selektor (`cds-card`). Muss das gestylte
CSS-Element dagegen selbst die Stelle im DOM einnehmen, die es ohne Angular einnähme —
als Grid- oder Flex-Kind, als Ziel einer Layout-Klasse des Konsumenten, oder weil sein
Tag zwischen `<a>` und `<div>` wechselt —, dann trägt der Host die CSS-Klasse und die
Komponente einen Attributselektor (`<div cdsIconCard>`). Siehe
[ADR-0008](docs/adr/0008-selektortyp-der-wrapper-komponenten.md).

### Quelle der Wahrheit (Komponenten-Code)

Der Komponenten-Code lebt **in der Angular-Lib**, nicht im Storybook. `storybook-angular`
enthält nach der Extraktion nur noch die `*.stories.ts` und importiert die Komponenten
aus der Lib. Siehe [ADR-0002](docs/adr/0002-topologie-und-quelle-der-wahrheit.md).

### Consumer / Konsument

Ein anderes Angular-Projekt, das `@conciso/design-system-angular` einbindet. Ein
Consumer installiert **beide** Pakete (Angular-Lib + CSS-Schicht) und bindet CSS +
Fonts global in seiner `angular.json` (`styles`/`assets`) ein.

### Consumer-Fixture

Die committete Minimal-Konsumenten-App im Repo, die im CI den gepackten Tarball
installiert und einen produktiven AOT-Build fährt ([Consumer-Smoke-Test](#consumer-smoke-test)).
Dient zugleich als lebendes Konsum-Beispiel.

### Consumer-Smoke-Test

Das CI-Gate, das die Angular-Lib per `npm pack` tarballt, in die
[Consumer-Fixture](#consumer-fixture) installiert und einen produktiven
**AOT-`ng build`** fährt. Läuft bei PR/Push und als harte Vorbedingung des
Publish-Jobs. Fängt Fehler ab, die erst beim echten Konsum auftreten (unvollständige
APF-Metadaten, fehlende Re-Exports, peer-Dep-Auflösung, AOT-Template-Typfehler,
fehlende Icon-Registrierungen). Siehe [ADR-0004](docs/adr/0004-verteilung-und-versionierung.md).

### Lockstep-Versionierung

Angular-Lib und CSS-Schicht tragen **immer dieselbe Versionsnummer**; Angular-Lib vX
gehört zu CSS vX. Die peerDependency der Angular-Lib auf die CSS-Schicht wird
entsprechend eng gepinnt (z.B. `0.1.x`). Siehe
[ADR-0004](docs/adr/0004-verteilung-und-versionierung.md).

### Pilot-Scheibe

Die erste Extraktions-Runde: eine dünne vertikale Scheibe (Button + Topnav, wobei
Topnav theme-switch `cycle-button` und Icons mitzieht), die die gesamte Kette
Build → Pack → Konsum einmal komplett bewies, bevor die restlichen Komponenten im
Bulk umzogen. Beides ist abgeschlossen — alle 37 Komponenten liegen in der
[Angular-Lib](#angular-lib).

### DS-Glyphen

Design-System-eigene Icons (`ui*`), die aus `@conciso/design-system/icons`
(generiertes `icons/icons.js`) stammen — nicht aus `@ng-icons`. Die zentrale
Icon-Registry (`icons/cds-icons.ts`) ist die einzige Import-Fläche für
Komponenten-Icons; Komponenten importieren nie direkt aus `@ng-icons/heroicons`.
