# ADR-0016: Lucide als Quelle der UI-Icons

- Status: akzeptiert
- Datum: 2026-10-09
- Weicht ab von: der Legacy-Doku (`docs/legacy-site`), die Heroicons als Quelle aller UI-Icons nennt.

## Kontext

Die UI-Icons kamen bisher aus zwei Richtungen. Das CSS-Paket `@conciso/design-system` brachte rund 95 Dateien `icons/source/ui-*.svg` mit, die überwiegend aus Heroicons kopiert oder leicht angepasst waren (74 davon sind pfadgleich, einige stammen aus Material Icons). Die Angular-Lib hing zusätzlich an `@ng-icons/core` und `@ng-icons/heroicons`, beide als `allowedNonPeerDependencies` mitgeliefert. Damit pflegte das DS eine Kopie einer fremden Icon-Bibliothek samt Fremdlizenzen, ohne dass Consumer dieselbe Bibliothek für eigene Icons nutzen konnten.

Lucide (ISC-Lizenz) ist vollständig paketiert: `lucide-static` für CSS- und HTML-Consumer, `@lucide/angular` mit einer tree-shakable Standalone-Komponente pro Icon (`<svg lucideChevronDown>`, Signal-Inputs, Peer Angular ≥ 17).

Erwogen: (a) `ui-*` aus Lucide generieren und weiter im Paket ausliefern, (b) `@ng-icons/lucide` statt `@ng-icons/heroicons`, (c) Icons ganz aus dem Paket nehmen und `@lucide/angular` direkt nutzen.

## Entscheidung

- **Option (c).** Das CSS-Paket liefert keine generischen UI-Icons mehr. Wer UI-Icons braucht, nimmt Lucide direkt.
- `@conciso/design-system/icons` exportiert nur noch DS-eigene Glyphen: die Bereichs-Glyphen `co-*`, `ki-*`, `es-*`, `wo-*` sowie `ui-caret-down`, `ui-check` und `ui-quote`, für die es kein gleichwertiges Lucide-Icon gibt (kräftiger Caret, kleiner Haken, gefülltes Zitatzeichen).
- Die Angular-Lib nutzt `@lucide/angular` als **peerDependency**. `@ng-icons/*` entfällt. `lib/icons/cds-icons.ts` bleibt die einzige Import-Fläche der Komponenten.
- Strichstärken kommen weiter aus den Tokens `--icon-stroke-*`, nicht aus dem Lucide-Default 2.
- `docs/legacy-site` bleibt als Archiv unverändert.

## Folgen

- Breaking Change für Consumer: Die Exporte der entfernten `ui-*`-Icons und ihre Einträge in `icons.json` fallen weg, und Angular-Consumer müssen `@lucide/angular` selbst installieren.
- Die Optik ändert sich: Lucide zeichnet mit runden Enden und anderen Proportionen als Heroicons. Topnav, Select, Combobox und Theme-Switch brauchen einen visuellen Abgleich, die Figma-Bibliothek zieht nach.
- `icons/LICENSE-heroicons` und der Heroicons-Abschnitt in NOTICE entfallen, sobald keine abgeleitete Datei mehr im Paket liegt. Die Herkunft von `ui-quote` (Pfad wie Material „format_quote“, Apache 2.0) ist vorher zu klären.
- Ein Inline-Icon in Doku oder Story nimmt ab jetzt den Pfad aus `lucide-static`, kein eigenes Markup.
