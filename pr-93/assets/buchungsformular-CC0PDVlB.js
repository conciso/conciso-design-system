import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,n,o as r}from"./blocks-CgfgLRYg.js";import{s as i}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i as a,r as o}from"./react-C77DJ2jK.js";import{r as s,t as c}from"./buchungsformular.stories-BbTBY815.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...a(),...e.components},{HtmlBeispiel:i}=t;return i||_missingMdxReference(`HtmlBeispiel`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r,{title:`Komponenten/Buchungsformular`,name:`Übersicht`}),`
`,(0,l.jsx)(t.h1,{id:`buchungsformular`,children:`Buchungsformular`}),`
`,(0,l.jsxs)(t.p,{children:[`Verbindliche Buchung eines konkreten Termins, am Beispiel eines Seminars
(`,(0,l.jsx)(t.code,{children:`Seitenmuster/Seminar · Training`}),`). Komposition aus den Feldern von
`,(0,l.jsx)(t.code,{children:`Komponenten/Inputs & Forms/*`}),`, ergänzt um drei Dinge, die es dort noch nicht gibt:
Gliederung in Fieldsets, bedingte Feldblöcke und einen Teilnehmenden-Repeater.
Klassen-Präfix `,(0,l.jsx)(t.code,{children:`.bk-*`}),`, Verhalten über `,(0,l.jsx)(t.code,{children:`data-bk`}),`-Hooks im Markup (siehe „Buchungsformular · Nur CSS-Schicht“).`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Für dieses Formular gibt es kein eigenes Angular-Bauteil.`}),` Ein Consumer setzt es
aus vorhandenen Wrapper-Komponenten zusammen: den Feldern aus
`,(0,l.jsx)(t.code,{children:`Komponenten/Inputs & Forms/*`}),` (Textfeld, Auswahlfeld, Checkbox, Radio), den
Dropdowns aus `,(0,l.jsx)(t.code,{children:`Komponenten/Dropdowns/*`}),` und dem Button aus `,(0,l.jsx)(t.code,{children:`Komponenten/Buttons/Button`}),`.
Die `,(0,l.jsx)(t.code,{children:`.bk-*`}),`-Klassen selbst kommen aus der CSS-Schicht und sind bereichsneutral, der
Bereichs-Akzent kommt ausschließlich über `,(0,l.jsx)(t.code,{children:`data-accent`}),` am umgebenden Container
(siehe unten).`]}),`
`,(0,l.jsx)(t.h2,{id:`aufbau`,children:`Aufbau`}),`
`,(0,l.jsx)(t.p,{children:`Die Reihenfolge folgt der Entscheidungslogik der Buchenden: erst, was gebucht wird,
dann, wer bucht und zahlt, dann, wer teilnimmt, zuletzt die Rechtsfolge. Kaufmännisch
heikle Felder (Rechnungsanschrift) stehen bewusst vor den Teilnehmenden, weil sie zur
buchenden Partei gehören und nicht zur Teilnehmerliste.`}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Gruppe`}),(0,l.jsx)(t.th,{children:`Untergruppe`}),(0,l.jsx)(t.th,{children:`Inhalt`}),(0,l.jsx)(t.th,{children:`Warum an dieser Stelle`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Termin`}),(0,l.jsx)(t.td,{children:`keine`}),(0,l.jsx)(t.td,{children:`Select mit den offenen Durchführungen (Pflicht)`}),(0,l.jsx)(t.td,{children:`Bestimmt Preis und Verfügbarkeit, also die Grundlage aller folgenden Felder`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Auftraggeber`}),(0,l.jsx)(t.td,{children:`Anmeldung als`}),(0,l.jsx)(t.td,{children:`Segmented Control „Firma“ / „Privatperson“`}),(0,l.jsx)(t.td,{children:`Weiche vor vielen Feldern, steht in derselben Gruppe wie das, was sie schaltet`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Auftraggeber`}),(0,l.jsx)(t.td,{children:`Firmendaten`}),(0,l.jsx)(t.td,{children:`Firma (Pflicht), Abteilung, USt-IdNr., Bestellnummer oder Kostenstelle`}),(0,l.jsx)(t.td,{children:`Bedingt, nur bei „Firma“. Bestellnummer gehört hierher, weil sie auf die Rechnung muss`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Auftraggeber`}),(0,l.jsx)(t.td,{children:`Kontaktperson`}),(0,l.jsx)(t.td,{children:`Vorname, Nachname, E-Mail (alle Pflicht), Telefon`}),(0,l.jsx)(t.td,{children:`Empfängerin der Bestätigung, gehört zur buchenden Partei, nicht zwingend teilnehmend`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Rechnungsanschrift`}),(0,l.jsx)(t.td,{children:`keine`}),(0,l.jsx)(t.td,{children:`Straße, PLZ, Ort (Pflicht), Land, Checkbox „andere Adresse“`}),(0,l.jsx)(t.td,{children:`Anschrift der buchenden Partei, als Standardfall gesetzt, nicht als Sonderfall`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Rechnungsanschrift`}),(0,l.jsx)(t.td,{children:`Abweichende Rechnungsadresse`}),(0,l.jsx)(t.td,{children:`Empfänger, Anschrift (Pflicht), Rechnungs-E-Mail`}),(0,l.jsx)(t.td,{children:`Opt-in, eingeblendet von der Checkbox darüber, der Normalfall bleibt kurz`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Teilnehmende`}),(0,l.jsx)(t.td,{children:`keine`}),(0,l.jsx)(t.td,{children:`„Ich nehme selbst teil“, Anzahl (Pflicht), Preiszeile, je Person Vorname, Nachname, E-Mail`}),(0,l.jsx)(t.td,{children:`Erst jetzt sinnvoll: die Anzahl entscheidet über Preis und Platzkontingent`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Abschluss`}),(0,l.jsx)(t.td,{children:`keine`}),(0,l.jsx)(t.td,{children:`Anmerkungen, Teilnahmebedingungen (Pflicht), Datenschutz (Pflicht), Contentletter, Bestellübersicht, Submit`}),(0,l.jsx)(t.td,{children:`Rechtsfolge unmittelbar vor dem Button, nicht weiter oben versteckt`})]})]})]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Einseitig statt mehrstufig.`}),` Das Formular ist lang, aber nicht komplex. Ein Stepper
würde die Gesamtlänge verbergen, das Zurückspringen erschweren und einen Zustand
einführen, den es sonst nirgends im System gibt. Die Gliederung leisten die
Fieldsets: sichtbare Gruppen mit Legende, alle gleichzeitig scan- und korrigierbar.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Drei Typo-Stufen, sonst trägt die Gliederung nicht.`}),` Gruppe `,(0,l.jsx)(t.code,{children:`--ty-title-sm`}),`
(20 px, gemischt, `,(0,l.jsx)(t.code,{children:`--tx-primary`}),`), Untergruppe `,(0,l.jsx)(t.code,{children:`--ty-name`}),` (14 px halbfett, gemischt),
Feldlabel 12 px Versalien in `,(0,l.jsx)(t.code,{children:`--tx-secondary`}),`. Zwei benachbarte Ebenen auf demselben
Token laufen zu lassen ist der naheliegende Fehler: Die Gliederung ist dann
semantisch vorhanden und optisch unsichtbar, und ein Formular über 4.000 px lässt
sich nicht mehr überfliegen.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Die Trennlinie gehört nur zwischen die Gruppen.`}),` Sie sitzt über jedem
`,(0,l.jsx)(t.code,{children:`.bk-fieldset`}),` der obersten Ebene, nie über einer `,(0,l.jsx)(t.code,{children:`.bk-subgroup`}),`. Der Grund ist
inhaltlich, nicht dekorativ: Eine Linie zwischen „Anmeldung als“ und „Firmendaten“
schneidet die Weiche von dem ab, was sie schaltet, und zerlegt eine Entscheidung in
zwei scheinbar unabhängige Blöcke. Eine Gruppe ist deshalb eine Entscheidung samt
ihrer Folgen, kein Themenwort: „Auftraggeber“ umfasst die Weiche, die bedingten
Firmendaten und die Kontaktperson, „Rechnungsanschrift“ umfasst die Adresse und den
abweichenden Sonderfall.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Zwei Stellen für den Preis, mit unterschiedlicher Aufgabe.`}),` Bei der Anzahl steht
die Preiszeile `,(0,l.jsx)(t.code,{children:`.bk-summary`}),` mit `,(0,l.jsx)(t.code,{children:`role="status"`}),`, dort ändert sich der Wert und muss
angesagt werden. Unmittelbar über dem Button steht die Bestellübersicht `,(0,l.jsx)(t.code,{children:`.bk-order`}),`
mit Leistung, Termin, Auftraggeber, Plätzen und Gesamtbetrag. Der bloße Betrag würde
dort nicht reichen: Was genau gebucht wird, steht sonst über tausend Pixel weiter
oben verstreut, und im Moment der verbindlichen Zusage ist nichts davon sichtbar.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Leere Zeilen der Übersicht bleiben stehen`}),` und tragen `,(0,l.jsx)(t.code,{children:`data-empty`}),` („Noch nicht
gewählt“, gedämpft). Eine Übersicht, die Zeilen ein- und ausblendet, springt beim
Ausfüllen, und man sieht nicht, was noch fehlt. Die Übersicht ist bewusst keine
Live-Region: Sie wiederholt nur, was im Formular schon steht, und würde sonst jede
Änderung ein zweites Mal ansagen.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Nur Sternchen, kein „(optional)“.`}),` Die Required-Marker trennen Pflicht- und
Kannfelder bereits, eine zweite Auszeichnung macht das Formular unnötig laut
(dieselbe Konvention wie bei der Newsletter-Anmeldung in
`,(0,l.jsx)(t.code,{children:`Komponenten/Inputs & Forms/Textfeld/Verwendung`}),`). Das freiwillige Contentletter-Häkchen ist
am Schluss durch eine Haarlinie von den beiden Pflicht-Bestätigungen getrennt:
gleiche Optik direkt darunter liest sich wie ein Dark Pattern, auch wenn keines
gemeint ist.`]}),`
`,(0,l.jsx)(t.h3,{id:`bereichs-akzent`,children:`Bereichs-Akzent`}),`
`,(0,l.jsxs)(t.p,{children:[`Ein Formular trägt genau eine Brand Area. Header, Eyebrow, Buttons und Segmented
Control tragen dafür die passenden Bereichsklassen (z. B. `,(0,l.jsx)(t.code,{children:`.btn-ki`}),`, `,(0,l.jsx)(t.code,{children:`.seg-ki`}),`), und
Checkboxen setzen `,(0,l.jsx)(t.code,{children:`accent-color:var(--ki-ink)`}),`. Die Links im Formular (Inhouse-
Anfrage, Bedingungen, Datenschutz) tönt `,(0,l.jsx)(t.code,{children:`data-accent="ki"`}),` am umgebenden Container
mit: keine Inline-Farbe am einzelnen Link, sonst greift der Dark-Mode-Override nicht.
Die `,(0,l.jsx)(t.code,{children:`.bk-*`}),`-Klassen selbst sind bereichsneutral, der Akzent kommt ausschließlich von
außen.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsxs)(t.strong,{children:[`Warum `,(0,l.jsx)(t.code,{children:`--ki-ink`}),` statt `,(0,l.jsx)(t.code,{children:`--ki-500`}),` für Checkboxen:`]}),` Die anderen Bereiche setzen
`,(0,l.jsx)(t.code,{children:`accent-color`}),` auf ihr `,(0,l.jsx)(t.code,{children:`-500`}),`. Das Limette-Grün von KI erreicht auf Weiß aber nur
rund 1,4:1 und wäre als angehakte Box kaum zu erkennen. `,(0,l.jsx)(t.code,{children:`--ki-ink`}),` ist der dafür
vorgesehene modusbewusste Token (`,(0,l.jsx)(t.code,{children:`--ki-800`}),` im Light, `,(0,l.jsx)(t.code,{children:`--ki-200`}),` im Dark), dieselbe
Logik wie bei `,(0,l.jsx)(t.code,{children:`.btn-ki`}),`. Zwei Corporate-Töne bleiben bewusst stehen: der Fokusring
und der Feldrahmen im Fokus, weil Fokus Systemfeedback ist und keine Markenfläche.`]}),`
`,(0,l.jsx)(t.h2,{id:`vollständiges-formular`,children:`Vollständiges Formular`}),`
`,(0,l.jsxs)(t.p,{children:[`Das Formular in Angewandte KI, aus den Feldern der CSS-Schicht und den `,(0,l.jsx)(t.code,{children:`.bk-*`}),`-Klassen
zusammengesetzt. Bedienbar sind die bedingten Blöcke (Anmeldung als Firma oder
Privatperson, abweichende Rechnungsadresse) sowie Anzahl, Hinzufügen und Entfernen der
Teilnehmenden. Validierung, Fehlerübersicht und Erfolgszustand zeigt die Story nicht, sie
stehen als Pflicht-Verhalten unter „Buchungsformular · Nur CSS-Schicht“.`]}),`
`,(0,l.jsx)(n,{of:c}),`
`,(0,l.jsx)(t.h2,{id:`buchungsformular--nur-css-schicht`,children:`Buchungsformular · Nur CSS-Schicht`}),`
`,(0,l.jsxs)(t.p,{children:[`Wer nur die CSS-Schicht verwendet, setzt dieses Markup ein: eine Gruppe mit Untergruppe,
ein bedingter Block, die Rechnungsadresse als zweiter bedingter Block, der
Teilnehmenden-Repeater mit Vorlage, die Fehlerübersicht, die Bestellübersicht und
Pflicht-Checkboxen mit verlinktem Rechtstext. Die `,(0,l.jsx)(t.code,{children:`data-bk`}),`-Hooks sind die Namen, über
die das eigene Verhalten die Elemente findet, nicht über feste IDs.`]}),`
`,(0,l.jsx)(i,{titel:`Buchungsformular als reines Markup`,interaktiv:!0,children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-html`,children:`<!-- Bereich am umgebenden Container, nicht am Formular: data-accent tönt .body-link
     und .t-co im Block auf die Bereichsfarbe. Die .bk-*-Klassen selbst sind
     bereichsneutral. -->
<div data-accent="ki">

  <!-- Erfolgspanel außerhalb des Formulars, weil das Formular beim Absenden auf hidden
       geht. data-success am Formular verweist per ID darauf. -->
  <div class="bk-success" id="bk-demo-success" role="status" tabindex="-1" hidden>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="1.5" aria-hidden="true" style="flex-shrink:0">
      <path stroke-linecap="round" stroke-linejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
    </svg>
    <span><strong>Danke, Deine Buchung ist eingegangen.</strong><br>
      Du bekommst die Bestätigung und die Rechnung per E-Mail.</span>
  </div>

  <!-- Konfiguration am Formular: Preis pro Platz, Höchstzahl, Erfolgspanel. novalidate,
       damit die Inline-Meldungen statt der nativen Browser-Bubbles erscheinen. -->
  <form id="bk-demo" data-booking data-price="1290" data-max="12"
        data-success="bk-demo-success" novalidate aria-label="Training buchen">
    <p>Mit <span class="req" aria-hidden="true">*</span> markierte Felder sind Pflichtfelder.</p>

    <!-- Fehlerübersicht am Formularkopf: bekommt nach gescheitertem Submit den Fokus. -->
    <div class="bk-errors" data-bk="errors" role="alert" tabindex="-1" hidden>
      <p class="bk-errors-title">Bitte prüf noch diese Angaben</p>
      <ul data-bk="error-list"></ul>
    </div>

    <fieldset class="bk-fieldset">
      <legend class="bk-legend">Termin</legend>
      <div class="field">
        <label for="bk-demo-termin">Durchführung <span class="req" aria-hidden="true">*</span></label>
        <select id="bk-demo-termin" data-bk="termin" required aria-required="true"
                data-err="Bitte wähl einen Termin">
          <option value="" disabled selected>Bitte wählen…</option>
          <option value="2026-04-14">14. bis 15. April 2026 · Dortmund</option>
          <option value="2026-06-09">9. bis 10. Juni 2026 · Online</option>
        </select>
      </div>
    </fieldset>

    <!-- Gruppe = eine Entscheidung samt ihrer Folgen. Untergruppen gliedern innerhalb,
         verschachtelte fieldsets geben Screenreadern die Zugehörigkeit mit. -->
    <fieldset class="bk-fieldset">
      <legend class="bk-legend">Auftraggeber</legend>

      <fieldset class="bk-subgroup">
        <legend class="bk-sublegend">Anmeldung als</legend>
        <div class="seg seg-ki">
          <div class="seg-option">
            <input type="radio" id="bk-demo-typ-firma" name="bk-demo-typ" value="firma"
                   data-bk="kundentyp" checked>
            <label for="bk-demo-typ-firma">Firma</label>
          </div>
          <div class="seg-option">
            <input type="radio" id="bk-demo-typ-privat" name="bk-demo-typ" value="privat"
                   data-bk="kundentyp">
            <label for="bk-demo-typ-privat">Privatperson</label>
          </div>
        </div>
      </fieldset>

      <!-- Bedingter Block: hidden statt disabled, als Untergruppe IN der Gruppe seines
           Auslösers. data-required markiert Felder, die nur im eingeblendeten Zustand
           Pflicht sind; required und aria-required werden mit dem Block geschaltet. -->
      <fieldset class="bk-subgroup" data-bk="firma-block">
        <legend class="bk-sublegend">Firmendaten</legend>
        <div class="field">
          <label for="bk-demo-firma">Firma <span class="req" aria-hidden="true">*</span></label>
          <input type="text" id="bk-demo-firma" data-bk="firma" data-required required
                 aria-required="true" autocomplete="organization"
                 data-err="Bitte gib den Firmennamen an">
        </div>
      </fieldset>

      <fieldset class="bk-subgroup">
        <legend class="bk-sublegend">Kontaktperson</legend>
        <div class="bk-grid-2"><!-- kollabiert unter 768 px einspaltig -->
          <div class="field">
            <label for="bk-demo-vorname">Vorname <span class="req" aria-hidden="true">*</span></label>
            <input type="text" id="bk-demo-vorname" data-bk="kontakt-vorname" required
                   aria-required="true" autocomplete="given-name"
                   data-err="Bitte gib Deinen Vornamen an">
          </div>
          <div class="field">
            <label for="bk-demo-nachname">Nachname <span class="req" aria-hidden="true">*</span></label>
            <input type="text" id="bk-demo-nachname" data-bk="kontakt-nachname" required
                   aria-required="true" autocomplete="family-name"
                   data-err="Bitte gib Deinen Nachnamen an">
          </div>
        </div>
        <div class="field">
          <label for="bk-demo-email">E-Mail <span class="req" aria-hidden="true">*</span></label>
          <input type="email" id="bk-demo-email" data-bk="kontakt-email" required
                 aria-required="true" autocomplete="email"
                 data-err="Bitte eine gültige E-Mail-Adresse eingeben">
        </div>
      </fieldset>
    </fieldset>

    <fieldset class="bk-fieldset">
      <legend class="bk-legend">Rechnungsanschrift</legend>
      <div class="field">
        <label for="bk-demo-strasse">Straße und Hausnummer <span class="req" aria-hidden="true">*</span></label>
        <input type="text" id="bk-demo-strasse" required aria-required="true"
               autocomplete="street-address" data-err="Bitte gib Straße und Hausnummer an">
      </div>
      <div class="bk-grid-plz">
        <div class="field">
          <label for="bk-demo-plz">PLZ <span class="req" aria-hidden="true">*</span></label>
          <input type="text" id="bk-demo-plz" inputmode="numeric" required aria-required="true"
                 autocomplete="postal-code" data-err="Bitte gib die Postleitzahl an">
        </div>
        <div class="field">
          <label for="bk-demo-ort">Ort <span class="req" aria-hidden="true">*</span></label>
          <input type="text" id="bk-demo-ort" required aria-required="true"
                 autocomplete="address-level2" data-err="Bitte gib den Ort an">
        </div>
      </div>
      <div class="bk-consent">
        <input type="checkbox" id="bk-demo-abweichend" data-bk="rechnung-abweichend"
               style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
        <label for="bk-demo-abweichend">Die Rechnung geht an eine andere Adresse</label>
      </div>

      <!-- Startet verborgen: die Felder tragen data-required, aber noch kein required. -->
      <fieldset class="bk-subgroup" data-bk="rechnung-block" hidden>
        <legend class="bk-sublegend">Abweichende Rechnungsadresse</legend>
        <div class="field">
          <label for="bk-demo-r-empfaenger">Rechnungsempfänger <span class="req" aria-hidden="true">*</span></label>
          <input type="text" id="bk-demo-r-empfaenger" data-required
                 autocomplete="section-rechnung organization"
                 data-err="Bitte gib den Rechnungsempfänger an">
        </div>
      </fieldset>
    </fieldset>

    <!-- Repeater: Anzahl führt, die Blöcke folgen. Ein Block pro Platz wird aus der Vorlage
         geklont; id/for und autocomplete-Section (section-tn1, section-tn2, …) entstehen
         nach Position. -->
    <fieldset class="bk-fieldset">
      <legend class="bk-legend">Teilnehmende</legend>
      <div class="bk-consent">
        <input type="checkbox" id="bk-demo-selbst" data-bk="selbst-teil" checked
               style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
        <label for="bk-demo-selbst">Ich nehme selbst teil</label>
      </div>
      <div class="field bk-count">
        <label for="bk-demo-anzahl">Plätze <span class="req" aria-hidden="true">*</span></label>
        <input type="number" id="bk-demo-anzahl" data-bk="anzahl" value="1" min="1" max="12"
               step="1" inputmode="numeric" required aria-required="true"
               data-err="Bitte gib eine Zahl zwischen 1 und 12 an">
      </div>
      <div class="bk-summary" role="status">
        <span data-bk="summary-count">1 Platz</span>
        <span class="bk-summary-total" data-bk="summary-total">1.290 € × 1 = 1.290 € zzgl. MwSt.</span>
      </div>
      <div data-bk="personen"></div>
      <template data-bk="person-template">
        <fieldset class="bk-person"><!-- Gruppe, nicht nur Optik -->
          <legend class="bk-person-title" data-bk="person-title">Teilnehmende 1</legend>
          <button type="button" class="btn btn-text btn-sm btn-ki bk-person-remove"
                  data-bk="remove-person" hidden>Entfernen</button>
          <div class="bk-grid-2">
            <div class="field">
              <label>Vorname <span class="req" aria-hidden="true">*</span></label>
              <input type="text" data-bk="p-vorname" data-ac="given-name" required
                     aria-required="true" data-err="Bitte gib den Vornamen an">
            </div>
            <div class="field">
              <label>Nachname <span class="req" aria-hidden="true">*</span></label>
              <input type="text" data-bk="p-nachname" data-ac="family-name" required
                     aria-required="true" data-err="Bitte gib den Nachnamen an">
            </div>
          </div>
          <div class="field">
            <label>E-Mail <span class="req" aria-hidden="true">*</span></label>
            <input type="email" data-bk="p-email" data-ac="email" required
                   aria-required="true" data-err="Bitte eine gültige E-Mail-Adresse eingeben">
          </div>
        </fieldset>
      </template>
      <button type="button" class="btn btn-outlined btn-sm btn-ki" data-bk="add-person">
        Weitere Person hinzufügen
      </button>
    </fieldset>

    <fieldset class="bk-fieldset">
      <legend class="bk-legend">Abschluss</legend>

      <!-- Pflicht-Checkbox: data-bk="consent-required" plus eigene Fehlermeldung. Der
           verlinkte Hinweis ist ein echter Anker, kein span: sonst ist er nicht per Tab
           erreichbar und wird nicht als Link angesagt. -->
      <div class="bk-consent">
        <input type="checkbox" id="bk-demo-agb" data-bk="consent-required" aria-required="true"
               data-err="Bitte akzeptiere die Teilnahme- und Stornobedingungen"
               style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
        <label for="bk-demo-agb">Ich akzeptiere die
          <a class="body-link" href="/teilnahmebedingungen">Teilnahme- und Stornobedingungen</a>.
          <span class="req" aria-hidden="true">*</span></label>
      </div>

      <!-- Bestellübersicht unmittelbar vor dem Button. Leere Zeilen bleiben stehen und
           tragen data-empty, statt zu verschwinden. Keine Live-Region. -->
      <div class="bk-order">
        <p class="bk-order-title">Das buchst Du</p>
        <dl class="bk-order-list">
          <div><dt>Termin</dt><dd data-bk="order-termin" data-empty>Noch nicht gewählt</dd></div>
          <div><dt>Auftraggeber</dt><dd data-bk="order-kunde" data-empty>Noch nicht ausgefüllt</dd></div>
          <div><dt>Plätze</dt><dd data-bk="order-plaetze">1</dd></div>
        </dl>
        <div class="bk-order-total">
          <span class="bk-order-total-label">Gesamt</span>
          <span class="bk-order-total-value" data-bk="order-total">1.290 €</span>
        </div>
        <p class="bk-order-note" data-bk="order-note">1 × 1.290 €, zzgl. MwSt.</p>
      </div>
      <button type="submit" class="btn btn-filled btn-ki btn-full">Zahlungspflichtig buchen</button>
    </fieldset>
  </form>
</div>
`})})}),`
`,(0,l.jsx)(t.p,{children:`Jede Umsetzung ergänzt das Verhalten, das der Browser nicht übernimmt:`}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Bereich`}),(0,l.jsx)(t.th,{children:`Pflicht-Verhalten`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Konfiguration`}),(0,l.jsxs)(t.td,{children:[`Am `,(0,l.jsx)(t.code,{children:`<form>`}),`: `,(0,l.jsx)(t.code,{children:`data-booking`}),`, `,(0,l.jsx)(t.code,{children:`data-price`}),` (Preis pro Platz in Euro, nur Anzeige), `,(0,l.jsx)(t.code,{children:`data-max`}),` (Höchstzahl der Plätze, Vorgabe 12), `,(0,l.jsx)(t.code,{children:`data-success`}),` (ID des Erfolgspanels). Das Verhalten läuft über jedes `,(0,l.jsx)(t.code,{children:`form[data-booking]`}),`, das Formular ist also mehrfach auf einer Seite einsetzbar. Die IDs der Felder tragen deshalb das Präfix der Formular-ID, damit `,(0,l.jsx)(t.code,{children:`label for`}),` eindeutig bleibt`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Bedingte Blöcke`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`hidden`}),` am Block, nie `,(0,l.jsx)(t.code,{children:`disabled`}),`. Beim Einblenden bekommen alle Felder mit `,(0,l.jsx)(t.code,{children:`data-required`}),` `,(0,l.jsx)(t.code,{children:`required`}),` und `,(0,l.jsx)(t.code,{children:`aria-required="true"`}),`, beim Ausblenden verlieren sie beides, und ihre Fehlermeldungen werden entfernt. Der Startzustand wird beim Laden aus dem Auslöser gesetzt (gewählter Kundentyp, Häkchen der abweichenden Rechnungsadresse). Der Fokus wandert nicht`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Anzahl und Repeater`}),(0,l.jsxs)(t.td,{children:[`Untergrenze 1, Obergrenze `,(0,l.jsx)(t.code,{children:`data-max`}),`. Die Anzahl begrenzt Eingaben außerhalb dieses Bereichs auf die Grenzen. Erhöhen klont Blöcke aus der Vorlage ans Ende, Verringern entfernt nur leere Blöcke vom Ende. Enthält einer noch Daten, springt das Feld auf die bisherige Anzahl zurück und eine Fehlermeldung am Anzahl-Feld nennt den Block und verweist auf „Entfernen“`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Neu vergeben`}),(0,l.jsxs)(t.td,{children:[`Nach jedem Hinzufügen und Entfernen: Titel („Teilnehmende N“), IDs, `,(0,l.jsx)(t.code,{children:`label for`}),`, `,(0,l.jsx)(t.code,{children:`autocomplete`}),`-Section (`,(0,l.jsx)(t.code,{children:`section-tnN …`}),`) und das `,(0,l.jsx)(t.code,{children:`aria-label`}),` der Entfernen-Buttons („Teilnehmende N entfernen“) nach der DOM-Reihenfolge neu setzen. Die Feldwerte wandern mit ihren Knoten mit, es wird nichts umkopiert`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Entfernen`}),(0,l.jsx)(t.td,{children:`Der Button ist erst ab zwei Blöcken sichtbar, in Block 1 bei gesetztem „Ich nehme selbst teil“ nie. Nach dem Entfernen geht der Fokus auf das Anzahl-Feld, nach dem Hinzufügen in das erste Feld des neuen Blocks`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Ich nehme selbst teil`}),(0,l.jsxs)(t.td,{children:[`Block 1 übernimmt Vorname, Nachname und E-Mail aus dem Kontakt und folgt weiteren Änderungen, solange das Feld nicht von Hand bearbeitet wurde (Merkmal `,(0,l.jsx)(t.code,{children:`touched`}),`, nur echte Nutzereingaben setzen es). Die Felder bleiben editierbar, nie `,(0,l.jsx)(t.code,{children:`disabled`})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Preiszeile`}),(0,l.jsxs)(t.td,{children:[`Eine bei der Anzahl (`,(0,l.jsx)(t.code,{children:`role="status"`}),`), eine in der Bestellübersicht, beide gemeinsam aktualisiert. Format „1.290 € × 3 = 3.870 € zzgl. MwSt.“, Plätze als „1 Platz“ oder „N Plätze“. Beträge in Euro ohne Nachkommastellen`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Bestellübersicht`}),(0,l.jsxs)(t.td,{children:[`Termin, Auftraggeber (bei Firma der Firmenname, bei Privatperson Vor- und Nachname), Plätze, Gesamt und Hinweis werden bei jeder Änderung neu geschrieben. Fehlt ein Wert, bleibt die Zeile mit „Noch nicht gewählt“ oder „Noch nicht ausgefüllt“ und `,(0,l.jsx)(t.code,{children:`data-empty`}),` stehen`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Prüfen beim Absenden`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`preventDefault`}),`, dann alle sichtbaren Felder mit `,(0,l.jsx)(t.code,{children:`required`}),` prüfen. Felder in einem Vorfahren mit `,(0,l.jsx)(t.code,{children:`hidden`}),` und Felder außerhalb eines `,(0,l.jsx)(t.code,{children:`.field`}),` zählen nicht. Gültig ist ein nicht leerer Wert, der auch die native Prüfung besteht (`,(0,l.jsx)(t.code,{children:`validity.valid`}),`). Die Meldung ist der Text aus `,(0,l.jsx)(t.code,{children:`data-err`}),`, ersatzweise „Bitte füll dieses Feld aus“. Einzelmeldungen entstehen im ruhigen Modus ohne `,(0,l.jsx)(t.code,{children:`role="alert"`}),` und bleiben über `,(0,l.jsx)(t.code,{children:`aria-describedby`}),` am Feld`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Einwilligungen`}),(0,l.jsxs)(t.td,{children:[`Jedes Häkchen mit `,(0,l.jsx)(t.code,{children:`data-bk="consent-required"`}),` prüft die Zeile `,(0,l.jsx)(t.code,{children:`.bk-consent`}),`: ungehakt setzt `,(0,l.jsx)(t.code,{children:`aria-invalid="true"`}),` und `,(0,l.jsx)(t.code,{children:`aria-describedby`}),` auf eine `,(0,l.jsx)(t.code,{children:`.error-msg`}),` mit der ID `,(0,l.jsx)(t.code,{children:`<Häkchen-ID>-err`}),` in derselben Zeile. Der Text kommt aus `,(0,l.jsx)(t.code,{children:`data-err`}),`, ersatzweise „Bitte bestätige diesen Punkt“. Beim erneuten Prüfen wird die alte Meldung zuerst entfernt`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Fehlerübersicht`}),(0,l.jsxs)(t.td,{children:[`Pro Fehler ein Eintrag mit Sprunglink auf das Feld (`,(0,l.jsx)(t.code,{children:`href="#id"`}),`, der Klick setzt den Fokus auf das Feld, statt zu navigieren). Der Kasten wird eingeblendet und fokussiert; gibt es keinen Kasten, geht der Fokus auf das erste fehlerhafte Feld. Ohne Fehler bleibt er verborgen`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Nachvalidierung`}),(0,l.jsxs)(t.td,{children:[`Nach dem ersten gescheiterten Submit prüft jede Änderung am betreffenden Feld neu: Pflichtfelder bei `,(0,l.jsx)(t.code,{children:`input`}),`, Selects und Einwilligungen bei `,(0,l.jsx)(t.code,{children:`change`}),`. Ist der Fehler behoben, verschwinden die Meldung am Feld und der Eintrag in der Übersicht, und der Kasten verschwindet mit dem letzten Eintrag`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Erfolg`}),(0,l.jsxs)(t.td,{children:[`Ohne Fehler wird das Formular `,(0,l.jsx)(t.code,{children:`hidden`}),`, das Erfolgspanel außerhalb des Formulars eingeblendet und fokussiert`]})]})]})]}),`
`,(0,l.jsx)(t.p,{children:`Die Prüfungen im Browser sind Komfort, keine Absicherung. Was zusätzlich zwingend in die
Produktion gehört, steht unter „Für die Umsetzung“.`}),`
`,(0,l.jsx)(t.h2,{id:`bedingte-felder`,children:`Bedingte Felder`}),`
`,(0,l.jsxs)(t.p,{children:[`Zwei Weichen blenden Feldblöcke ein und aus. Beide folgen derselben Mechanik: das
`,(0,l.jsx)(t.code,{children:`hidden`}),`-Attribut am Block, `,(0,l.jsx)(t.code,{children:`data-required`}),` an den Feldern, die nur im sichtbaren
Zustand Pflicht sind.`]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Auslöser`}),(0,l.jsx)(t.th,{children:`Eingeblendet`}),(0,l.jsx)(t.th,{children:`Verhalten`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Segmented Control „Firma“`}),(0,l.jsx)(t.td,{children:`Fieldset Firmendaten`}),(0,l.jsx)(t.td,{children:`Firma wird Pflichtfeld. Bei „Privatperson“ verschwindet der Block samt Fehlerzustand`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Checkbox „Rechnung geht an eine andere Adresse“`}),(0,l.jsx)(t.td,{children:`Fieldset Abweichende Rechnungsadresse`}),(0,l.jsx)(t.td,{children:`Empfänger, Straße, PLZ und Ort werden Pflichtfelder`})]})]})]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Regel`}),(0,l.jsx)(t.th,{children:`Begründung`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`hidden`}),` statt `,(0,l.jsx)(t.code,{children:`disabled`})]}),(0,l.jsx)(t.td,{children:`Deaktivierte Felder werden beim Submit nicht mitgesendet und haben keinen Tastaturfokus (Screenreader erreichen sie im Lesemodus weiterhin und sagen sie als deaktiviert an). Ausgeblendete Felder behalten ihren Wert und kommen beim Wiedereinblenden unverändert zurück`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`required`}),` mitschalten`]}),(0,l.jsxs)(t.td,{children:[`Ein unsichtbares Pflichtfeld blockiert die Absendung ohne sichtbare Ursache. `,(0,l.jsx)(t.code,{children:`data-required`}),` ist die Merkmarkierung, `,(0,l.jsx)(t.code,{children:`required`}),` und `,(0,l.jsx)(t.code,{children:`aria-required="true"`}),` werden beim Einblenden gesetzt und beim Ausblenden entfernt`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Fehlerzustand beim Ausblenden aufräumen`}),(0,l.jsxs)(t.td,{children:[`Sonst bleibt eine `,(0,l.jsx)(t.code,{children:`.error-msg`}),` im DOM stehen und wird beim nächsten Einblenden erneut angesagt`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Block liegt in der Gruppe seines Auslösers`}),(0,l.jsxs)(t.td,{children:[`Ein bedingter Block ist keine eigene Gruppe, sondern eine `,(0,l.jsx)(t.code,{children:`.bk-subgroup`}),` innerhalb der Gruppe, die ihn schaltet. Als Geschwister-Gruppe mit eigener Trennlinie wirkt er unabhängig, obwohl er ohne seinen Auslöser gar nicht existiert`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Block bleibt an seiner Position`}),(0,l.jsx)(t.td,{children:`Der eingeblendete Block erscheint unter seinem Auslöser, nicht am Formularanfang. Kein Layout-Sprung, kein Suchen`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Fokus wandert nicht automatisch`}),(0,l.jsx)(t.td,{children:`Ein erzwungener Fokussprung nach dem Klick auf eine Checkbox reißt Tastatur- und Screenreader-Nutzende aus dem Kontext. Der nächste Tab landet ohnehin im neuen Block`})]})]})]}),`
`,(0,l.jsx)(t.h2,{id:`teilnehmende`,children:`Teilnehmende`}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Warum die Anzahl ein eigenes Feld ist.`}),` Ein reiner „Weitere Person
hinzufügen“-Repeater leitet die Anzahl aus der Listenlänge ab. Für eine Buchung
reicht das nicht, weil die Zahl kaufmännisch trägt: Sie bestimmt den Preis und muss
gegen das Platzkontingent des Termins validiert werden (`,(0,l.jsx)(t.code,{children:`min`}),`/`,(0,l.jsx)(t.code,{children:`max`}),`). Deshalb ist die
Anzahl das führende Feld, die Namensblöcke folgen ihr, und der Hinzufügen-Button
erhöht sie, statt sie zu umgehen. So gibt es genau eine Quelle der Wahrheit.`]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Interaktion`}),(0,l.jsx)(t.th,{children:`Verhalten`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Anzahl erhöhen`}),(0,l.jsx)(t.td,{children:`Es werden Blöcke am Ende ergänzt. Bereits eingegebene Namen bleiben unberührt`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Anzahl verringern`}),(0,l.jsxs)(t.td,{children:[`Nur leere Blöcke am Ende fallen weg. Enthält einer noch Daten, bleibt die Anzahl stehen und eine `,(0,l.jsx)(t.code,{children:`.error-msg`}),` nennt den betroffenen Block`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`„Weitere Person hinzufügen“`}),(0,l.jsx)(t.td,{children:`Erhöht die Anzahl um eins und setzt den Fokus in das erste Feld des neuen Blocks`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`„Entfernen“`}),(0,l.jsx)(t.td,{children:`Löscht genau diesen Block, nummeriert die übrigen neu, senkt die Anzahl und setzt den Fokus auf das Anzahl-Feld. Ab zwei Blöcken sichtbar`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`„Ich nehme selbst teil“`}),(0,l.jsx)(t.td,{children:`Block 1 übernimmt Vorname, Nachname und E-Mail aus dem Kontakt und folgt weiteren Änderungen, bis der Block von Hand bearbeitet wird. Die Felder bleiben editierbar. Solange der Haken sitzt, hat Block 1 keinen Entfernen-Button`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Preiszeile`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`.bk-summary`}),` mit `,(0,l.jsx)(t.code,{children:`role="status"`}),`. Zeigt Plätze, Einzelpreis und Summe, aktualisiert bei jeder Änderung der Anzahl`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Blockgrenze`}),(0,l.jsxs)(t.td,{children:[`Jeder Block ist ein `,(0,l.jsx)(t.code,{children:`<fieldset class="bk-person">`}),` mit `,(0,l.jsx)(t.code,{children:`<legend>`}),`. Ohne diese Gruppe hört ein Screenreader dreimal nur „Vorname“, ohne zu wissen, zu wem`]})]})]})]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Warum keine Auto-Nummerierung per CSS-Counter.`}),` Die Blocknummer steckt nicht nur
in der Überschrift, sondern auch in `,(0,l.jsx)(t.code,{children:`id`}),`, `,(0,l.jsx)(t.code,{children:`for`}),` und der `,(0,l.jsx)(t.code,{children:`autocomplete`}),`-Section. Beim
Entfernen eines mittleren Blocks werden alle drei nach der DOM-Reihenfolge neu vergeben,
während die Feldwerte mit ihrem DOM-Knoten mitwandern. Es wird nichts umkopiert,
deshalb kann dabei auch nichts verloren gehen.`]}),`
`,(0,l.jsx)(t.h2,{id:`validierung--barrierefreiheit`,children:`Validierung & Barrierefreiheit`}),`
`,(0,l.jsxs)(t.p,{children:[`Das Formular nutzt dasselbe Muster wie die Kontaktformulare in
`,(0,l.jsx)(t.code,{children:`Komponenten/Inputs & Forms/Textfeld/Verwendung`}),`: `,(0,l.jsx)(t.code,{children:`novalidate`}),` unterdrückt die nativen
Bubbles, geprüft wird beim Submit, Fehler erscheinen als `,(0,l.jsx)(t.code,{children:`.field.has-error`}),` plus
`,(0,l.jsx)(t.code,{children:`.error-msg`}),` mit `,(0,l.jsx)(t.code,{children:`role="alert"`}),` unter dem Feld, der Fokus springt auf das erste
ungültige Feld. Das Setzen und Räumen des Fehlerzustands ist für Kontakt- und
Buchungsformular dasselbe Muster.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Feldspezifische Meldungen.`}),` Jedes Pflichtfeld trägt sein `,(0,l.jsx)(t.code,{children:`data-err`}),` im Markup
(„Bitte gib den Ort an“ statt „Dieses Feld ist erforderlich“). Bei einem Formular
dieser Länge ist eine generische Meldung wertlos, sobald mehrere Fehler gleichzeitig
stehen. Ausgeblendete Blöcke werden übersprungen, geprüft wird nur, was sichtbar
ist.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Fehlerübersicht statt Alert-Salve.`}),` Das kurze Kontaktformular gibt jeder Meldung
ein `,(0,l.jsx)(t.code,{children:`role="alert"`}),`, bei drei Feldern funktioniert das. Hier entstehen bei einem
leeren Submit über zehn Meldungen gleichzeitig, und gleichzeitig eingefügte Alerts
ergeben beim Screenreader eine unbrauchbare Ansage. Deshalb sammelt `,(0,l.jsx)(t.code,{children:`.bk-errors`}),` am
Formularkopf alle Fehler als Sprungliste, trägt selbst das `,(0,l.jsx)(t.code,{children:`role="alert"`}),` und
bekommt den Fokus. Die Meldungen am Feld bleiben über `,(0,l.jsx)(t.code,{children:`aria-describedby`}),` verbunden
und werden beim Fokussieren gelesen, tragen aber kein eigenes `,(0,l.jsx)(t.code,{children:`role="alert"`}),` mehr
(ruhiger Modus).`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Nachvalidierung.`}),` Erst geprüft wird beim Absenden, nicht beim Tippen, damit
niemand beim Ausfüllen angemeckert wird. Nach einem gescheiterten Submit kippt das
Formular in den Nachvalidierungs-Modus: Jede Korrektur räumt die Meldung am Feld und
den zugehörigen Eintrag in der Übersicht sofort weg.`]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Aspekt`}),(0,l.jsx)(t.th,{children:`Regel`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Gruppierung`}),(0,l.jsxs)(t.td,{children:[`Jeder Abschnitt und jeder Teilnehmendenblock ist ein `,(0,l.jsx)(t.code,{children:`<fieldset>`}),` mit `,(0,l.jsx)(t.code,{children:`<legend>`}),`. Screenreader sagen die Gruppe vor dem Feld an, dadurch bleibt „Vorname“ in Block 3 unterscheidbar von „Vorname“ im Kontakt`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Pflicht-Checkboxen`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`aria-required="true"`}),` an der Box selbst. Das sichtbare `,(0,l.jsx)(t.code,{children:`*`}),` im Label ist `,(0,l.jsx)(t.code,{children:`aria-hidden`}),`, ohne das Attribut wäre die Pflicht rein optisch`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Verlinkte Bestätigungen`}),(0,l.jsxs)(t.td,{children:[`Teilnahmebedingungen und Datenschutzhinweise sind echte `,(0,l.jsx)(t.code,{children:`<a class="body-link">`}),` im Label, kein `,(0,l.jsx)(t.code,{children:`<span>`})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Fehlerübersicht`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`.bk-errors`}),` mit `,(0,l.jsx)(t.code,{children:`role="alert"`}),` und `,(0,l.jsx)(t.code,{children:`tabindex="-1"`}),`, wird nach einem gescheiterten Submit fokussiert. Die Einträge sind Sprunglinks auf das jeweilige Feld`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Autofill`}),(0,l.jsxs)(t.td,{children:[`Durchgängige `,(0,l.jsx)(t.code,{children:`autocomplete`}),`-Tokens. Die abweichende Rechnungsadresse trägt `,(0,l.jsx)(t.code,{children:`section-rechnung`}),`, jeder Teilnehmendenblock `,(0,l.jsx)(t.code,{children:`section-tn1`}),`, `,(0,l.jsx)(t.code,{children:`section-tn2`}),` und so weiter, damit der Browser die Blöcke nicht gegenseitig überschreibt (WCAG 1.3.5)`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Anzahl und Preis`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`.bk-summary`}),` trägt `,(0,l.jsx)(t.code,{children:`role="status"`}),`. Jede Änderung von Anzahl, Termin oder Personenliste wird dadurch angesagt, ohne den Fokus zu stören`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Fokusführung`}),(0,l.jsx)(t.td,{children:`Hinzufügen setzt den Fokus in den neuen Block, Entfernen zurück auf das Anzahl-Feld`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Entfernen-Button`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`aria-label="Teilnehmende 3 entfernen"`}),`, weil „Entfernen“ allein in einer Liste gleichlautender Buttons mehrdeutig ist`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Pflichtfelder`}),(0,l.jsxs)(t.td,{children:[`Sichtbares `,(0,l.jsx)(t.code,{children:`*`}),` (`,(0,l.jsx)(t.code,{children:`aria-hidden`}),`) plus `,(0,l.jsx)(t.code,{children:`aria-required="true"`}),`. Der Hinweis „Mit * markierte Felder sind Pflichtfelder“ steht vor dem ersten Feld`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Bestellübersicht`}),(0,l.jsxs)(t.td,{children:[`Bewusst ohne `,(0,l.jsx)(t.code,{children:`role="status"`}),`, sie fasst nur zusammen, was im Formular schon steht. Semantisch eine `,(0,l.jsx)(t.code,{children:`<dl>`}),`, damit Bezeichnung und Wert paarweise gelesen werden`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Erfolgszustand`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`.bk-success`}),` mit `,(0,l.jsx)(t.code,{children:`role="status"`}),` und `,(0,l.jsx)(t.code,{children:`tabindex="-1"`}),`, wird nach dem Absenden fokussiert. Das Formular geht auf `,(0,l.jsx)(t.code,{children:`hidden`})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Touch & Tastatur`}),(0,l.jsxs)(t.td,{children:[`Alle Felder und Buttons ab 44 px Höhe, native Radios und Checkboxen mit `,(0,l.jsx)(t.code,{children:`accent-color`}),`, Fokusring über `,(0,l.jsx)(t.code,{children:`--focus-ring`})]})]})]})]}),`
`,(0,l.jsx)(t.h2,{id:`anfrage-oder-direktbuchung`,children:`Anfrage oder Direktbuchung`}),`
`,(0,l.jsx)(t.p,{children:`Im System gibt es zwei Wege, wie aus Interesse ein Termin wird. Sie schließen sich
nicht aus, sie gehören zu unterschiedlichen Angeboten. Die Entscheidung fällt am
Angebot, nicht am Formular.`}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Kriterium`}),(0,l.jsx)(t.th,{children:`Anfrage (adaptive Kontaktseite)`}),(0,l.jsx)(t.th,{children:`Direktbuchung (dieses Formular)`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Preis`}),(0,l.jsx)(t.td,{children:`individuell, wird im Gespräch bestimmt`}),(0,l.jsx)(t.td,{children:`fester Listenpreis pro Platz, sofort berechenbar`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Verfügbarkeit`}),(0,l.jsx)(t.td,{children:`offen, Termin entsteht erst`}),(0,l.jsx)(t.td,{children:`feste Durchführungen mit Platzkontingent`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Rechtsfolge`}),(0,l.jsx)(t.td,{children:`unverbindlich`}),(0,l.jsx)(t.td,{children:`verbindlich, Submit-Label benennt die Zahlungspflicht`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Datenbedarf`}),(0,l.jsx)(t.td,{children:`Name, E-Mail, Anliegen`}),(0,l.jsx)(t.td,{children:`zusätzlich Rechnungsanschrift und Teilnehmendenliste`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Typische Fälle`}),(0,l.jsx)(t.td,{children:`Inhouse-Training, Beratung, Workshop nach Zuschnitt`}),(0,l.jsx)(t.td,{children:`offenes Seminar mit veröffentlichter Terminliste`})]})]})]}),`
`,(0,l.jsxs)(t.p,{children:[`Die Beispielseite Seminar (`,(0,l.jsx)(t.code,{children:`Seitenmuster/Seminar · Training`}),`) bleibt bewusst beim
Anfrage-Flow: Die Termin-Zeilen führen über `,(0,l.jsx)(t.code,{children:`data-k-bereich`}),` und `,(0,l.jsx)(t.code,{children:`data-k-anliegen`}),`
auf die Kontaktseite. Das Buchungsformular ist die Variante für Angebote, bei denen
Preis und Kontingent feststehen.`]}),`
`,(0,l.jsx)(t.h2,{id:`für-die-umsetzung`,children:`Für die Umsetzung`}),`
`,(0,l.jsx)(t.p,{children:`Die Referenz-Demo ist vollständig bedienbar, aber ein Mockup ohne Backend. Wer die
Komponente in die echte Site überführt, ob Mensch oder Assistent, braucht die folgenden
Punkte als Anforderungen, nicht als Ideen.`}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Wichtigster Punkt: Schutz gegen Datenverlust.`}),` Ein ausgefülltes Formular enthält
bis zu zwölf Teilnehmende mit je drei Feldern, dazu Kontakt und zwei Anschriften. Ein
versehentliches Zurück, ein geschlossener Tab oder ein abgestürzter Browser wirft
alles weg. Das Referenz-Markup hat keinen Zwischenspeicher; in Produktion ist er
Pflicht, nicht optional.`]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Anforderung`}),(0,l.jsx)(t.th,{children:`Umsetzung`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Entwurf laufend sichern`}),(0,l.jsxs)(t.td,{children:[`Bei jedem `,(0,l.jsx)(t.code,{children:`input`}),` und `,(0,l.jsx)(t.code,{children:`change`}),` den Formularstand entprellt (ca. 500 ms) unter einem stabilen Schlüssel ablegen, zum Beispiel `,(0,l.jsx)(t.code,{children:`booking-draft:<formular-id>`})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Wo ablegen`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`sessionStorage`}),` für den laufenden Tab. `,(0,l.jsx)(t.code,{children:`localStorage`}),` nur, wenn der Entwurf einen Browserneustart überleben soll, dann mit Ablaufdatum. Keine Zahlungs- oder Ausweisdaten, und Namen sowie Anschriften sind personenbezogen: Aufbewahrungsdauer und Rechtsgrundlage vorher mit den Datenschutzbeauftragten klären`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Wiederherstellen mit Ansage`}),(0,l.jsx)(t.td,{children:`Beim Laden nicht still befüllen. Einen Hinweis über dem Formular zeigen, mit der Möglichkeit, den Entwurf zu verwerfen`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Entwurf verwerfen`}),(0,l.jsx)(t.td,{children:`Nach erfolgreichem Submit den Schlüssel löschen, sonst taucht die alte Buchung bei der nächsten wieder auf`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Warnung beim Verlassen`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`beforeunload`}),` nur registrieren, solange es ungespeicherte Änderungen gibt, und nach dem Submit wieder abmelden`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Reihenfolge beim Wiederherstellen`}),(0,l.jsx)(t.td,{children:`Erst Kundentyp und die Checkbox für die abweichende Rechnungsadresse setzen, dann die bedingten Blöcke einblenden, dann die Anzahl setzen (das erzeugt die Teilnehmendenblöcke), erst danach die Werte der Personen eintragen. In anderer Reihenfolge schreibt man in Felder, die es noch nicht gibt`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Nicht mit „Ich nehme selbst teil“ kollidieren`}),(0,l.jsx)(t.td,{children:`Die Übernahme aus den Kontaktdaten läuft nur, solange ein Feld nicht von Hand bearbeitet wurde. Beim Wiederherstellen deshalb auch dieses Merkmal mitsichern, sonst überschreibt die Automatik wiederhergestellte Namen`})]})]})]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Thema`}),(0,l.jsx)(t.th,{children:`Anforderung`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Serverseitige Validierung`}),(0,l.jsx)(t.td,{children:`Die Prüfungen im Browser sind Komfort, keine Absicherung. Jede Regel muss serverseitig gespiegelt werden, inklusive der bedingten Pflichtfelder`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Platzkontingent`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`data-max`}),` ist im Referenz-Markup fest. Real kommt die Obergrenze pro Termin aus dem Backend und muss beim Submit erneut geprüft werden. Ausverkaufte Termine gehören nicht in den Select`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Doppelte Buchungen`}),(0,l.jsx)(t.td,{children:`Submit-Button nach dem ersten Klick sperren und die Anfrage mit einem Idempotenzschlüssel versehen`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Preis`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`data-price`}),` ist Anzeige, nie Berechnungsgrundlage. Die Summe entsteht serverseitig aus dem Termin`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Bestellübersicht`}),(0,l.jsx)(t.td,{children:`Welche Angaben bei einer zahlungspflichtigen Buchung zwingend unmittelbar vor dem Absenden stehen müssen, vor dem Livegang rechtlich prüfen lassen`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Ziele der Rechtstexte`}),(0,l.jsxs)(t.td,{children:[`Real zeigen die Consent-Links auf die veröffentlichten Seiten und öffnen sie so, dass das ausgefüllte Formular nicht verloren geht (`,(0,l.jsx)(t.code,{children:`target="_blank"`}),` mit `,(0,l.jsx)(t.code,{children:`rel="noopener"`}),` oder ein Overlay)`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Bereichsfarbe`}),(0,l.jsx)(t.td,{children:'`data-accent="ki'})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Spam`}),(0,l.jsx)(t.td,{children:`Kein sichtbares Captcha als erste Wahl. Zeitmessung und ein verstecktes Honeypot-Feld reichen für ein Formular dieser Länge meist aus und kosten keine Barrierefreiheit`})]})]})]}),`
`,(0,l.jsx)(t.h2,{id:`verwendung`,children:`Verwendung`}),`
`,(0,l.jsx)(`div`,{className:`doc-eyebrow`,children:`Dos & Don'ts`}),`
`,(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:`✓ Tun`})}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`Anzahl und Namensblöcke synchron halten, mit der Anzahl als einziger Quelle der Wahrheit`}),`
`,(0,l.jsxs)(t.li,{children:[`Bedingte Blöcke ein- und ausblenden statt Felder zu deaktivieren, und `,(0,l.jsx)(t.code,{children:`required`}),` mitschalten`]}),`
`,(0,l.jsx)(t.li,{children:`Die Rechnungsanschrift des Anmelders als Standard setzen, die Abweichung als Opt-in anbieten`}),`
`,(0,l.jsx)(t.li,{children:`Das Submit-Label die Rechtsfolge benennen lassen, hier „Zahlungspflichtig buchen“`}),`
`,(0,l.jsxs)(t.li,{children:[`Jedem Pflichtfeld eine eigene Fehlermeldung über `,(0,l.jsx)(t.code,{children:`data-err`}),` geben`]}),`
`,(0,l.jsx)(t.li,{children:`Ab etwa fünf Pflichtfeldern eine Fehlerübersicht zeigen und sie fokussieren, statt nur auf das erste Feld zu springen`}),`
`,(0,l.jsx)(t.li,{children:`Fehler beim Korrigieren sofort wieder wegräumen, am Feld und in der Übersicht`}),`
`,(0,l.jsx)(t.li,{children:`Gruppenüberschrift und Feldlabel typografisch klar trennen, sonst ist die Gliederung nur semantisch da`}),`
`,(0,l.jsx)(t.li,{children:`Eine Gruppe als eine Entscheidung samt ihrer Folgen behandeln, nicht als Themenwort`}),`
`,(0,l.jsx)(t.li,{children:`Vor dem zahlungspflichtigen Button zusammenfassen, was gebucht wird, nicht nur den Betrag`}),`
`,(0,l.jsxs)(t.li,{children:[`Den Bereich einmal über `,(0,l.jsx)(t.code,{children:`data-accent`}),` am umgebenden Container setzen, dann tönen auch die Links im Formular mit`]}),`
`,(0,l.jsxs)(t.li,{children:[`Verlinkte Rechtstexte in den Bestätigungen als echten `,(0,l.jsx)(t.code,{children:`<a>`}),` auszeichnen`]}),`
`]}),`
`,(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:`✕ Nicht tun`})}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`Die Anzahl reduzieren und dabei ausgefüllte Namensblöcke still verwerfen`}),`
`,(0,l.jsxs)(t.li,{children:[`Teilnehmendenblock 1 nach „Ich nehme selbst teil“ auf `,(0,l.jsx)(t.code,{children:`disabled`}),` setzen, die Werte gingen beim Submit verloren`]}),`
`,(0,l.jsx)(t.li,{children:`Firmen- und Rechnungsfelder auch Privatpersonen zeigen, nur mit „(optional)“ entschärft`}),`
`,(0,l.jsx)(t.li,{children:`Unverbindliche Anfrage und zahlungspflichtige Buchung in einem Formular mischen`}),`
`,(0,l.jsx)(t.li,{children:`Das Formular in einen Stepper zerlegen, nur um es kürzer wirken zu lassen`}),`
`,(0,l.jsxs)(t.li,{children:[`Ein Dutzend Meldungen mit `,(0,l.jsx)(t.code,{children:`role="alert"`}),` gleichzeitig einfügen, das ergibt eine unverständliche Ansage`]}),`
`,(0,l.jsxs)(t.li,{children:[`Die Teilnehmendenblöcke nur optisch durch eine Überschrift trennen, ohne `,(0,l.jsx)(t.code,{children:`<fieldset>`})]}),`
`,(0,l.jsx)(t.li,{children:`Pflichtsternchen und „(optional)“ gleichzeitig setzen, eine der beiden Auszeichnungen reicht`}),`
`,(0,l.jsx)(t.li,{children:`Ein freiwilliges Marketing-Häkchen optisch gleichrangig unter die Pflicht-Bestätigungen setzen`}),`
`,(0,l.jsx)(t.li,{children:`Eine Trennlinie zwischen eine Weiche und die Felder legen, die sie schaltet`}),`
`,(0,l.jsx)(t.li,{children:`Einzelnen Links im Formular eine Inline-Bereichsfarbe geben, das bricht im Dark Mode`}),`
`,(0,l.jsxs)(t.li,{children:[`Den verlinkten Rechtstext als `,(0,l.jsx)(t.code,{children:`<span>`}),` mit `,(0,l.jsx)(t.code,{children:`cursor:pointer`}),` bauen, er ist dann für Tastatur und Screenreader kein Link`]}),`
`]}),`
`,(0,l.jsx)(t.h2,{id:`verwandte-seiten`,children:`Verwandte Seiten`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`Komponenten/Inputs & Forms/*`}),` (Textfeld, Auswahlfeld, Checkbox, Radio)`]}),`
`,(0,l.jsx)(t.li,{children:(0,l.jsx)(t.code,{children:`Komponenten/Dropdowns/*`})}),`
`,(0,l.jsx)(t.li,{children:(0,l.jsx)(t.code,{children:`Komponenten/Buttons/Button`})}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var l;function init_buchungsformular(){return(init_buchungsformular=e((()=>{l=i(),o(),t(),s()})))()}init_buchungsformular();export{MDXContent as default};