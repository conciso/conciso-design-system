# Conciso · Mikrocopy-Conventions

Verbindliche Sprach-Regeln für alle Texte in der Conciso-Web-Präsenz und in Sub-Seiten oder Formularen, die später dazukommen.

## Anrede

- **Du-Form** durchgängig, kleingeschrieben im Fließtext: „Du schilderst Deine Situation."
- **Großschreibung** in höflicher Anrede in CTAs und Formularfeldern: „Wie können wir Dir helfen?", „Dein Anliegen".
- Kein Mischen von Du- und Sie-Anreden auf einer Seite.

## Tonfall

Quelle: Markenrad — drei Achsen mit je drei Eigenschaften.

| Achse | Eigenschaften | Sprachliche Wirkung |
|---|---|---|
| **Ruhig** | verlässlich, selbstsicher, kompetent | nicht aufgeregt, keine Verkaufs-Rhetorik, keine Übertreibungen |
| **Klar** | aufmerksam, präzise, pragmatisch | konkret statt blumig, kurze Sätze, eindeutige Verben |
| **Energiegeladen** | kraftvoll, agil, leidenschaftlich | aktive Verben, Tempo wo angemessen, Überzeugung statt Floskel |

Wenn ein Text sich anfühlt wie auf einer Beratungs-Mainstream-Seite („visionäre Lösungen für die digitale Transformation"), ist er nicht im Conciso-Ton.

## Schreibregeln

### Aktiv statt Passiv
- Ja: „Wir entwickeln Systeme, die halten."
- Nein: „Es werden Systeme entwickelt, die halten."

### Konkrete Verben statt Adjektiv-Nebel
- Ja: „Wir hören erst zu, dann bauen wir."
- Nein: „Aufmerksamer, partnerschaftlicher Ansatz."

### Kein Marketing-Sprech
Vermeiden:
- „state-of-the-art", „cutting-edge", „next level"
- „digital transformation", „synergetische Lösungen"
- „Wir bringen Ihre Marke aufs nächste Level"
- Buzzwords ohne Substanz

### Zahlen sprechen
Wo es Zahlen gibt: nutzen statt umschreiben.
- Ja: „120+ Projekte, 10 Jahre, 70+ Menschen."
- Nein: „Langjährige Erfahrung mit zahlreichen Kunden."

### Markenrad-Adjektive bewusst einstreuen
Die neun Eigenschaften des Markenrads (verlässlich · selbstsicher · kompetent · aufmerksam · präzise · pragmatisch · kraftvoll · agil · leidenschaftlich) sollten in Karten-Texten und längerer Copy spürbar werden — gern visuell hervorgehoben (`<strong>`).

## Mikrocopy nach Kontext

### CTA-Buttons
Der Button-Text muss zur Folge-Aktion passen.

| Folge-Aktion | Button-Text |
|---|---|
| Formular öffnet sich | „Nachricht schreiben" / „Kontakt aufnehmen" |
| Calendly / Booking-Tool öffnet sich | „Termin buchen" / „Gespräch vereinbaren" |
| Scroll zu Sektion innerhalb der Seite | „Unsere Leistungen" / „Mehr erfahren" |
| Externe Seite | „Auf [Plattform] öffnen ↗" |

Niemals generisches „Mehr" oder „Klick hier".

### Fehlermeldungen
Drei Bestandteile, in dieser Reihenfolge:
1. **Was passiert ist** — sachlich, ohne Schuldzuweisung
2. **Warum** — falls relevant und kurz erklärbar
3. **Was tun** — konkrete Handlungsmöglichkeit

Beispiel: „Die E-Mail-Adresse ist nicht erreichbar. Möglicherweise ein Tippfehler — prüf den Eintrag, dann probier es erneut."

### Bestätigungen
Konkret, nicht Floskel.
- Ja: „Deine Nachricht ist bei uns. Wir melden uns innerhalb eines Werktags."
- Nein: „Vielen Dank! Ihre Anfrage war erfolgreich."

### Form-Labels und Placeholders
- Label = Was ist das Feld? („E-Mail-Adresse", „Dein Anliegen")
- Placeholder = Beispiel oder Hilfestellung — nicht das Label wiederholen
- Pflichtfeld-Markierung mit Sternchen + `aria-required="true"`

### Eyebrows (Vor-Headlines)
- Uppercase mit Letter-Spacing
- Kurz: 2–4 Wörter
- Trenner: Mittelpunkt mit Spaces (` · `), nicht Komma oder Strich

Beispiele: „WAS WIR TUN", „RUHIG · KLAR · ENERGIEGELADEN", „SEIT 2016 · DORTMUND"

## Begriffs-Architektur

### Bereichs-Bezeichnungen

| Intern (CSS-Tokens, Spec) | Customer-Facing (Webseite) |
|---|---|
| Corporate / `co` | Über uns |
| Angewandte KI / `ki` | Angewandte KI |
| Effektive Software / `es` | Effektive Software |
| Wirksame Organisationen / `wo` | Wirksame Organisationen |

Im Header und Footer gilt die Reihenfolge: **Leistungen · Wissen · Über uns**.
„Leistungen" bündelt KI · Software · Organisation. „Über uns" bündelt Profil-Infos (Team, Jobs, Referenzen, Veranstaltungen, Presse).

### Sub-Disziplin-Notation

| Bereich | Notation | Beispiele |
|---|---|---|
| Angewandte KI | Punkt-Notation | AI.Engineering · AI.Automation · AI.Box |
| Effektive Software | klassisch | Engineering · Deployment · Qualität |
| Wirksame Organisationen | klassisch | Change · Leadership · Struktur |

Die Punkt-Notation beim KI-Bereich ist beabsichtigt (produktähnliche Marken-Architektur) und wird nicht auf andere Bereiche übertragen.

## Was nicht geht

- Mischung Du / Sie auf einer Seite
- „Erfolgreich!" als Bestätigungstext (Floskel)
- Generische Button-Texte („Senden", „OK", „Weiter")
- Übertreibungen ohne Substanz
- Anglizismen, wo deutsche Worte präziser sind („Termin buchen" > „Slot booken")

## Pflege

Diese Datei ist die Referenz für jeden neuen Text auf Conciso-Sub-Seiten. Bei Konflikten zwischen einer früheren Formulierung und dieser Datei gilt diese Datei.
