# ADR-0001: Angular-Lib als dünne CSS-Wrapper, CSS als peerDependency

- Status: akzeptiert
- Datum: 2026-07-24

## Kontext

Die Angular-Komponenten des Design Systems sind **Wrapper-Komponenten**: Sie
erfinden kein eigenes CSS, sondern setzen ausschließlich die Klassen der
CSS-Schicht (`@conciso/design-system`) zusammen — z.B. `cds-button` → `.btn
.btn-filled .btn-co`. Das Styling kommt aus einem **globalen Cascade** (Tokens,
Komponenten-Klassen, Dark-Mode), der sich nicht sinnvoll pro Komponente kapseln
lässt: Shadow DOM würde die globalen Tokens abschneiden.

Beim Extrahieren der Komponenten in eine eigene Bibliothek muss geklärt werden,
woher das konsumierende Projekt die Styles bekommt und wie die Lib diese
Abhängigkeit ausdrückt.

Zusätzlicher Zwang: Die `fonts.css` referenziert die Fonts relativ (`../fonts/*`).
Wie das CSS geladen wird, entscheidet darüber, ob diese relativen Pfade auflösen.

## Entscheidung

Die Angular-Lib deklariert `@conciso/design-system` als **peerDependency**. Der
**Konsument** installiert beide Pakete und bindet die CSS-Schicht + Fonts selbst
global ein (`angular.json` → `styles`/`assets`). Die Lib liefert **kein CSS mit**
und injiziert zur Laufzeit **nichts** ins DOM.

Ein copy-paste-fertiger `angular.json`-Schnipsel (styles + fonts-assets) gehört ins
README der Lib.

## Begründung

- Konsistent mit dem bestehenden Design-System-Prinzip: framework-agnostisches CSS,
  global geladen — genau wie Storybook es über `preview-head.html` macht.
- Der Konsument behält Kontrolle über **Ladereihenfolge, Dark-Mode-Strategie und
  Overrides** — bei einem globalen Cascade entscheidend.
- **SSR-/Angular-Universal-sicher**: kein `document`-Zugriff, kein FOUC, keine
  Doppel-Injektion, keine Hydration-Mismatches.
- Angulars Asset-Pipeline (`assets`-Array) löst die relativen Font-Pfade
  kontrolliert und dokumentierbar auf.

## Verworfene Alternativen

- **`dependency` + `provideConcisoDesignSystem()` injiziert CSS zur Laufzeit:**
  Bequemer Einzeiler für den Konsumenten, aber Laufzeit-DOM-Injektion kämpft gegen
  Angulars Style-Pipeline (Cascade-Reihenfolge weicht von Storybook ab), braucht
  SSR-Guards und trifft die relative Font-Basis nur fragil. Bleibt als **optionaler
  Komfort-Provider** später nachrüstbar, ohne die Architektur zu ändern.
- **Keine deklarierte Kopplung (rein per Doku):** kein Versionsvertrag; der Konsument
  könnte inkompatibles CSS ziehen.

## Konsequenzen

- Der Konsument hat einen zusätzlichen, manuellen Onboarding-Schritt (CSS + Fonts
  eintragen). Vergisst er ihn, rendern Komponenten unstyled — laut und offensichtlich.
- Die Versionskopplung der peerDependency wird in
  [ADR-0004](0004-verteilung-und-versionierung.md) festgelegt (Lockstep).
