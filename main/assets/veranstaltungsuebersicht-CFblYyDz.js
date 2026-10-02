import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n}from"./blocks-CgfgLRYg.js";import{s as r}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i,r as a}from"./react-C77DJ2jK.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...i(),...e.components},{HtmlBeispiel:r}=t;return r||_missingMdxReference(`HtmlBeispiel`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n,{title:`Seitenmuster/Veranstaltungsübersicht`,name:`Übersicht`}),`
`,(0,o.jsx)(t.h1,{id:`veranstaltungsübersicht`,children:`Veranstaltungsübersicht`}),`
`,(0,o.jsxs)(t.p,{children:[`Listing-Seite für Veranstaltungen, parallel zu `,(0,o.jsx)(t.code,{children:`Seitenmuster/Beitragsübersicht`}),`: zentrierter
Header mit Suche und Bereichs-Filter, Featured pro Bereich, Card-Grid darunter. Die
Detail-Seite ist separat als `,(0,o.jsx)(t.code,{children:`Seitenmuster/Veranstaltung`}),` dokumentiert.`]}),`
`,(0,o.jsx)(t.h2,{id:`aufbau`,children:`Aufbau`}),`
`,(0,o.jsxs)(t.p,{children:[`Die Übersichts-Seite folgt im Wesentlichen dem Aufbau der Beitragsübersicht: zentrierter
Header, Such-Feld, Filter-Chips pro Bereich, Featured pro Bereich, Card-Grid darunter,
„Mehr laden“-Block, CTA-Band, Footer. Such-Logik und Filter-aware-Featured sind 1:1
übernommen (siehe `,(0,o.jsx)(t.code,{children:`Seitenmuster/Beitragsübersicht`}),`, Abschnitt Listing-Filter und Suche ·
Nur CSS-Schicht), es ändern sich nur das Nomen („Veranstaltungen“) und das Default-Featured.`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Anpassungen gegenüber der Beitragsübersicht:`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Pill-Inhalt:`}),` weiterhin nur der Bereichsname. Das Format steht statt der Lesezeit in der
Meta-Zeile, das Format-Vokabular ist auf fünf Begriffe begrenzt (siehe `,(0,o.jsx)(t.code,{children:`Seitenmuster/Veranstaltung`}),`, Abschnitt Formate).`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Card-Meta:`}),` Datum (mit Wochentag) und Ort sitzen oberhalb des Titels, nicht am
Card-Fuß. Datum ist der wichtigste Hard-Filter und kommt vor dem Titel-Investment.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Default-Featured:`}),` „Effektive Software“ statt „Angewandte KI“.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Counter:`}),` „6 anstehend · 18 im Archiv“ statt „6 von 24 Beiträgen“, weil Veranstaltungen
zeitlich gebunden sind und Vergangenes nicht im Default-View erscheint.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Empty-State-Sekundär-CTA:`}),` „Veranstaltungs-Newsletter“ statt „Contentletter
abonnieren“.`]}),`
`]}),`
`,(0,o.jsx)(t.h2,{id:`veranstaltungs-card`,children:`Veranstaltungs-Card`}),`
`,(0,o.jsx)(t.p,{children:`Der Reading-Flow ist auf die Entscheidung für eine Veranstaltung optimiert. Für
Veranstaltungen ist das Datum ein harter Filter („Kann ich überhaupt?“) und gehört vor das
Titel-Investment.`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Reihenfolge:`}),` Bild (Atmosphäre, optional), Pill mit dem Bereichsnamen (Filter-Check), Datum
mit Wochentag (Kalender-Check), Ort („Dortmund“ für vor Ort, „Online“ für Webinar), Titel
(Interesse-Hook), Body (worum geht's), CTA „Zur Veranstaltung →“.`]}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Element`}),(0,o.jsx)(t.th,{children:`Style`}),(0,o.jsx)(t.th,{children:`Begründung`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Pill`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.pill`}),` mit `,(0,o.jsx)(t.code,{children:`data-area`}),`, ohne `,(0,o.jsx)(t.code,{children:`style`})]}),(0,o.jsxs)(t.td,{children:[`Bereichsfarbe als Filter-Signal, die Eigenmarge nehmen `,(0,o.jsx)(t.code,{children:`.card-body`}),` und `,(0,o.jsx)(t.code,{children:`.card-featured-body`}),` selbst zurück`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Meta-Trio (Datum, Ort, Format)`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`--ty-body-sm`}),` (14 px), `,(0,o.jsx)(t.code,{children:`--tx-muted`}),`, vertikal gestapelt`]}),(0,o.jsx)(t.td,{children:`Editorial-Listen-Look, Hard-Filter über die Reihenfolge, nicht über visuelle Hervorhebung`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Ort-Spezifik`}),(0,o.jsx)(t.td,{children:`Stadt-Name oder „Online“`}),(0,o.jsx)(t.td,{children:`Bei Webinaren „Online“, sonst Stadt-Name, nicht der Venue`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Icons`}),(0,o.jsx)(t.td,{children:`Micro (16×16, Stroke 1)`}),(0,o.jsx)(t.td,{children:`Konvention für Inline-Meta-Icons`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`CTA`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`color:var(--co-700)`}),`, `,(0,o.jsx)(t.code,{children:`margin-top:auto`})]}),(0,o.jsx)(t.td,{children:`Einheitliche Bereichs-übergreifende CTA-Farbe, Auto-Margin für gemeinsame Baseline`})]})]})]}),`
`,(0,o.jsx)(t.h2,{id:`featured-horizontale-großkarte`,children:`Featured, horizontale Großkarte`}),`
`,(0,o.jsxs)(t.p,{children:[`Für Landing-Sektionen und Bereichs-Hubs, wenn genau ein kommender Termin hervorgehoben
werden soll (kein Grid, kein Listing). Eine horizontale `,(0,o.jsx)(t.code,{children:`.card.card-elevated.card-featured`}),`
als Anker, links das Bild im 16:9-Verhältnis, rechts der Content-Block: Pill, Meta-Strip
(Datum, Ort, Format), Titel, Lead, CTA. Die Bildspalte trägt `,(0,o.jsx)(t.code,{children:`.card-media`}),` mit demselben
Verhältnis wie die Listing-Cards, Redaktion pflegt ein Bild in einem Zuschnitt für Featured
und Grid. Die Spaltenteilung (60 Prozent Bild, 40 Prozent Content) liegt in der Klasse, nicht
im `,(0,o.jsx)(t.code,{children:`style`}),`-Attribut. Die Stufen richten sich nach der Kartenbreite (`,(0,o.jsx)(t.code,{children:`@container`}),`), nicht
nach dem Viewport, denn die Kartenbreite hängt am Platz im Layout. Über 1000 px steht das
Bild bei 60 Prozent. Über 900 bis 1000 px (Tablet-Landscape) verdichtet sich die Karte auf
65/35 mit zweizeiligem Lead: Ein 16:9-Bild wird mit der Breite auch höher, und diese Höhe
braucht der Content-Block. Bis 900 px wird gestapelt, weil die Textspalte sonst unter
250 px fällt.`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Editorial-Variant:`}),` Featured-Cards nutzen `,(0,o.jsx)(t.code,{children:`.card-title-hero`}),` (24 px Serif, Headline-sm)
statt der 20 px Sans des Standard-`,(0,o.jsx)(t.code,{children:`.card-title`}),`. Ein Termin bekommt die alleinige Bühne,
das rechtfertigt das Serif-Treatment zwischen Section-H2 (28 px Serif) und
Standard-Card-Title (20 px Sans).`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Warum nicht ein Grid mit drei Karten?`}),` Auf einer Landing ist die Frage „Was passiert als
Nächstes?“ wichtiger als „Welche Veranstaltungen laufen aktuell?“. Ein einziges,
atmosphärisch bebildertes Highlight kommuniziert klarer als drei kleinere Cards. Die
Übersichts-Seite erfüllt die Breitenrolle, der Featured-Block auf der Landing die
Tiefenrolle. Ein Link unter der Karte („Alle Veranstaltungen ansehen →“) führt ins
Listing.`]}),`
`,(0,o.jsx)(r,{titel:`Featured-Karte einer Veranstaltung`,children:(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<a class="card card-elevated card-featured" data-area="es" href="/veranstaltungen/n8n">
  <div class="card-media"><img src="platzhalter.svg" alt="" aria-hidden="true" style="object-position:center 35%"></div>
  <div class="card-featured-body">
    <span class="pill" data-area="es">Effektive Software</span>
    <div style="display:flex;flex-direction:column;gap:var(--s2);font:var(--ty-body-sm);color:var(--tx-muted)">
      <span>Do, 3. Dezember 2026 · 18:00</span>
      <span>WORKGARDEN Dortmund</span>
      <span>Meet-Up</span>
    </div>
    <h3 class="card-title-hero">Effizienz durch n8n.</h3>
    <p class="card-text">Drei kurze Inputs …</p>
    <span class="card-cta-link">Zur Veranstaltung <span aria-hidden="true">→</span></span>
  </div>
</a>
`})})}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Aspekt`}),(0,o.jsx)(t.th,{children:`Featured (Landing)`}),(0,o.jsx)(t.th,{children:`Standard-Card (Listing)`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Anlass`}),(0,o.jsx)(t.td,{children:`Genau ein hervorgehobener Termin`}),(0,o.jsx)(t.td,{children:`Mehrere parallel sichtbare Termine`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Layout`}),(0,o.jsxs)(t.td,{children:[`Horizontal, 16:9 Bild plus Content, drei Stufen nach Kartenbreite (`,(0,o.jsx)(t.code,{children:`@container`}),`, nicht Viewport): über 1000 px Bild 60 %, über 900 bis 1000 px Bild 65 % mit zweizeiligem Lead (Tablet-Landscape), bis 900 px gestapelt`]}),(0,o.jsx)(t.td,{children:`Vertikal, 16:9 Bild über Content`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Bild-Geometrie`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.card-media`}),` mit `,(0,o.jsx)(t.code,{children:`aspect-ratio:16/9`}),`, Bildausschnitt über `,(0,o.jsx)(t.code,{children:`object-position`}),` am `,(0,o.jsx)(t.code,{children:`<img>`}),`, nicht als `,(0,o.jsx)(t.code,{children:`background-position`}),` am Container. Dasselbe Verhältnis wie im Listing: ein Bild, ein Zuschnitt`]}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.card-media`}),` mit `,(0,o.jsx)(t.code,{children:`aspect-ratio:16/9`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Headline`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.card-title-hero`}),` (24 px Serif), `,(0,o.jsx)(t.code,{children:`text-wrap:balance`}),` steckt in der Klasse`]}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.card-title`}),` (20 px Sans), `,(0,o.jsx)(t.code,{children:`line-clamp:2`}),`, `,(0,o.jsx)(t.code,{children:`min-height:2lh`}),` für die Gleichhöhe im Grid`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Lead`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.card-text`}),`, `,(0,o.jsx)(t.code,{children:`min-height:0`}),`, `,(0,o.jsx)(t.code,{children:`line-clamp`}),` bleibt als Riegel gegen zu lange Leads`]}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.card-text`}),` mit `,(0,o.jsx)(t.code,{children:`line-clamp:3`}),`, `,(0,o.jsx)(t.code,{children:`min-height:3lh`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Meta-Strip`}),(0,o.jsxs)(t.td,{children:[`Datum, Ort, Format vertikal gestapelt, `,(0,o.jsx)(t.code,{children:`--ty-body-sm`}),`, `,(0,o.jsx)(t.code,{children:`--tx-muted`})]}),(0,o.jsx)(t.td,{children:`Pill „Bereich“ über Datum plus Ort gestapelt`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Kürzen bei zu viel Text`}),(0,o.jsxs)(t.td,{children:[`Das Bild bestimmt die Höhe, nicht der Text. Wird der Content-Block zu hoch, gibt der Lead zuerst nach (`,(0,o.jsx)(t.code,{children:`.card-text`}),` mit `,(0,o.jsx)(t.code,{children:`line-clamp`}),`, als schrumpfendes Flex-Item), damit Pill, Meta-Strip, Titel und CTA stehen bleiben. `,(0,o.jsx)(t.code,{children:`.card-title-hero`}),` kappt innerhalb der Featured-Card auf 3 Zeilen, sonst schiebt ein langer Titel Pill und CTA aus der Karte. Kurz: Der Text weicht, das Bildverhältnis nicht`]}),(0,o.jsxs)(t.td,{children:[`Titel `,(0,o.jsx)(t.code,{children:`line-clamp:2`}),`, Text `,(0,o.jsx)(t.code,{children:`line-clamp:3`}),`, Gleichhöhe über `,(0,o.jsx)(t.code,{children:`min-height`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`CTA`}),(0,o.jsx)(t.td,{children:`„Zur Veranstaltung →“`}),(0,o.jsx)(t.td,{children:`„Zur Veranstaltung →“`})]})]})]}),`
`,(0,o.jsx)(t.h2,{id:`verwendung`,children:`Verwendung`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Aspekt`}),(0,o.jsx)(t.th,{children:`Regel`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Format-Vokabular`}),(0,o.jsx)(t.td,{children:`Nur die fünf Formate in der Meta-Zeile, keine eigenen Wörter wie „Workshop“ oder „Bootcamp“. Die Pill trägt allein den Bereichsnamen`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Pill-Margin`}),(0,o.jsxs)(t.td,{children:[`Kein `,(0,o.jsx)(t.code,{children:`margin-bottom`}),` im Markup, `,(0,o.jsx)(t.code,{children:`.card-body`}),` und `,(0,o.jsx)(t.code,{children:`.card-featured-body`}),` nehmen die Eigenmarge der Pill selbst zurück: In einer Flex-Spalte addiert sie sich zum `,(0,o.jsx)(t.code,{children:`gap`}),`, statt zu kollabieren. Der Abstand kommt allein aus dem `,(0,o.jsx)(t.code,{children:`gap`}),` und hält Pill und Datum als Meta-Header zusammen`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Pill-Breite`}),(0,o.jsxs)(t.td,{children:[`Kein `,(0,o.jsx)(t.code,{children:`width:fit-content`}),` und kein `,(0,o.jsx)(t.code,{children:`align-self`}),` im Markup, die Pill bringt das selbst mit`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Datums-Reihenfolge`}),(0,o.jsx)(t.td,{children:`Cards chronologisch, kommende Veranstaltungen zuerst, Vergangenes über „Frühere Veranstaltungen ansehen“ oder Archiv-Filter`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Datums-Format`}),(0,o.jsx)(t.td,{children:`Wochentag plus ausgeschriebener Monat`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Card-Ort`}),(0,o.jsx)(t.td,{children:`Stadt-Name, nicht der Venue, für Webinar „Online“. Auf der Detail-Seite zeigt der Meta-Strip dann den vollen Venue-Namen`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Filter-Logik`}),(0,o.jsx)(t.td,{children:`Drei Bereichs-Chips (ki, es, wo), kein Corporate-Chip`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Such-Scope`}),(0,o.jsx)(t.td,{children:`Titel plus Lead plus Pill (Bereichsname), dieselbe Such-Logik wie in der Beitragsübersicht. Datum und Ort sind nicht Teil des Such-Index, eine Datums-Suche wäre ein Kalender-Filter, kein Volltext`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`CTA-Text`}),(0,o.jsx)(t.td,{children:`Einheitlich „Zur Veranstaltung →“. Ein differenzierter CTA („Platz sichern“ oder „Anmelden“) gehört erst auf die Detail-Seite, wenn der Preis-Kontext sichtbar ist`})]})]})]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Dos`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Datum vor Titel platzieren, „Kann ich da?“ ist der wichtigste Filter.`}),`
`,(0,o.jsx)(t.li,{children:`Wochentag mitgeben, macht bei Meet-Ups nach 18:00 den Unterschied.`}),`
`,(0,o.jsx)(t.li,{children:`Die Pill auf den Bereichsnamen beschränken, das Format steht in der Meta-Zeile auf dem Vokabular der fünf Formate, Charakter-Begriffe gehören in den Titel.`}),`
`,(0,o.jsx)(t.li,{children:`Monatsnamen ausschreiben, passt zur Marken-Tonalität.`}),`
`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Don'ts`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Datum am Card-Fuß platzieren (Wissensbeitrag-Muster).`}),`
`,(0,o.jsx)(t.li,{children:`Vergangene Veranstaltungen im Default-View mischen.`}),`
`,(0,o.jsx)(t.li,{children:`Eigene Format-Begriffe einführen.`}),`
`,(0,o.jsx)(t.li,{children:`Preis und Verfügbarkeit auf jeder Card zeigen, das gehört auf die Detail-Seite.`}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var o;function init_veranstaltungsuebersicht(){return(init_veranstaltungsuebersicht=e((()=>{o=r(),a(),t()})))()}init_veranstaltungsuebersicht();export{MDXContent as default};