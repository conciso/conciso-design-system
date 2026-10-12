import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{s as t}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i as n,r}from"./react-C77DJ2jK.js";import{c as i,o as a}from"./blocks-MIQYy-EB.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components},{HtmlBeispiel:r}=t;return r||_missingMdxReference(`HtmlBeispiel`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a,{title:`Seitenmuster/Veranstaltung`,name:`Übersicht`}),`
`,(0,o.jsx)(t.h1,{id:`veranstaltung`,children:`Veranstaltung`}),`
`,(0,o.jsxs)(t.p,{children:[`Page-Pattern für die Detail-Seite einer einzelnen Veranstaltung: Hero-Image, Meta-Strip mit
Key-Facts, Sub-Strip mit Anmeldungs-CTAs, Themen-Cards, Agenda, Speaker:innen und
Anmeldungs-Form. Liegt in der Topnav unter „Unternehmen“. Die zugehörige Listing-Seite ist
`,(0,o.jsx)(t.code,{children:`Seitenmuster/Veranstaltungsübersicht`}),`.`]}),`
`,(0,o.jsx)(t.h2,{id:`aufbau`,children:`Aufbau`}),`
`,(0,o.jsx)(t.p,{children:`Die Detail-Seite führt vom „Worum geht's?“ über „Wann, wo, wieviel?“ zur Anmeldung:`}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Topnav`}),` mit „Unternehmen“ als `,(0,o.jsx)(t.code,{children:`aria-current="page"`}),`.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Hero-Image`}),` (siehe `,(0,o.jsx)(t.code,{children:`Komponenten/Hero`}),`) mit Eyebrow im Schema „Fokusveranstaltung ·
Format · Preis“, H1 (Veranstaltungs-Titel), Lead.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Meta-Strip:`}),` vier Info-Badges in einem Strip (Datum, Ort, Format, Eintritt), siehe
unten.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Sub-Strip`}),` in Bereichsfarbe-50 mit Markenrad-Eyebrow, Lead und zwei CTAs („Platz
sichern“ plus „Programm ansehen“ als In-Page-Anker).`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Themen-Cards`}),` (3× `,(0,o.jsx)(t.code,{children:`.card.card-elevated.col-4`}),`) mit „Input 1/2/3“-Eyebrow als
Programm-Vorschau.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Agenda und Speaker`}),` (siehe unten).`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Anmeldungs-Form`}),` (siehe unten).`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Page-End-CTA-Band`}),` und `,(0,o.jsx)(t.strong,{children:`Footer`}),` (siehe `,(0,o.jsx)(t.code,{children:`Komponenten/Footer`}),`).`]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[`In-Page-Anker (`,(0,o.jsx)(t.code,{children:`href="#ev-anmeldung"`}),`, `,(0,o.jsx)(t.code,{children:`href="#ev-agenda"`}),`) animieren das Scrollen. Bei
`,(0,o.jsx)(t.code,{children:`prefers-reduced-motion: reduce`}),` bleibt der Hard-Jump erhalten.`]}),`
`,(0,o.jsx)(t.h2,{id:`meta-strip`,children:`Meta-Strip`}),`
`,(0,o.jsx)(t.p,{children:`Direkt unter dem Hero stehen vier Info-Badges in einem Strip: Datum, Ort, Format, Eintritt.
Sie beantworten die Hard-Filter-Fragen, bevor der Besuch in die Themen-Cards einsteigt.`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Element`}),(0,o.jsx)(t.th,{children:`Spezifikation`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Container`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.layout-grid`}),` mit vier `,(0,o.jsx)(t.code,{children:`.col-3`}),`-Spalten, vertikaler Strip mit `,(0,o.jsx)(t.code,{children:`padding-block:var(--s8)`}),`, Border-Bottom in `,(0,o.jsx)(t.code,{children:`--n-100`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Badge`}),(0,o.jsxs)(t.td,{children:[`40×40 Round (`,(0,o.jsx)(t.code,{children:`--r-full`}),`) in Bereichsfarbe-50 (`,(0,o.jsx)(t.code,{children:`--{area}-50`}),`)`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Icon`}),(0,o.jsxs)(t.td,{children:[`Small (24×24, Stroke 1,25) in Bereichsfarbe-700 (`,(0,o.jsx)(t.code,{children:`--{area}-700`}),`)`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Label`}),(0,o.jsxs)(t.td,{children:[`Eyebrow-Style: `,(0,o.jsx)(t.code,{children:`--ty-label-xs`}),`, `,(0,o.jsx)(t.code,{children:`letter-spacing:.09em`}),`, uppercase, `,(0,o.jsx)(t.code,{children:`color:var(--{area}-700)`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Value`}),(0,o.jsxs)(t.td,{children:[`16 px medium (`,(0,o.jsx)(t.code,{children:`font:500 16px/24px var(--font)`}),`), `,(0,o.jsx)(t.code,{children:`color:var(--tx-primary)`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Helper`}),(0,o.jsxs)(t.td,{children:[`Optional in `,(0,o.jsx)(t.code,{children:`--ty-body-md`}),`, `,(0,o.jsx)(t.code,{children:`--tx-secondary`}),`, z. B. „18:00 bis 21:00 Uhr“ unter dem Datum`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Sekundär-Link`}),(0,o.jsx)(t.td,{children:`Optional, unterstrichen in Bereichsfarbe-700, z. B. „Karte öffnen →“`})]})]})]}),`
`,(0,o.jsx)(t.h2,{id:`programm--speaker`,children:`Programm & Speaker`}),`
`,(0,o.jsxs)(t.p,{children:[`Die Agenda ist eine Zeit-Tabelle (Spalte 120 px für Uhrzeit, Spalte 1fr für Titel plus
Speaker) mit Border-Bottom je Zeile. Uhrzeiten in `,(0,o.jsx)(t.code,{children:`font-variant-numeric:tabular-nums`}),` für
saubere vertikale Ausrichtung der Ziffern.`]}),`
`,(0,o.jsxs)(t.p,{children:[`Speaker:innen folgen dem Author-Card-Pattern (siehe `,(0,o.jsx)(t.code,{children:`Seitenmuster/Wissensbeitrag`}),`, Abschnitt
Author Card) mit Initialen oder Foto, Name, Rolle und kurzer Bio. Bei mehreren
Speaker:innen pro Veranstaltung analog zu „Mehrere Autor:innen“ im selben Muster.`]}),`
`,(0,o.jsx)(r,{titel:`Termin-Raster einer Veranstaltung`,children:(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<div style="display:grid;grid-template-columns:120px 1fr;gap:var(--s4) var(--s6);padding:var(--s4) 0;border-bottom:1px solid var(--n-200);align-items:baseline">
  <div style="font:500 14px/20px var(--font);color:var(--es-ink);font-variant-numeric:tabular-nums">18:30 bis 18:50</div>
  <div>
    <div style="font:500 16px/24px var(--font);color:var(--tx-primary)">Input 1 · Warum n8n gerade jetzt</div>
    <div style="font:var(--ty-body-md);color:var(--tx-secondary)">mit Marc Hoffmann</div>
  </div>
</div>
`})})}),`
`,(0,o.jsx)(t.h2,{id:`anmeldung`,children:`Anmeldung`}),`
`,(0,o.jsxs)(t.p,{children:[`Die Anmeldungs-Form folgt dem Kontaktformular-Pattern (siehe
`,(0,o.jsx)(t.code,{children:`Komponenten/Inputs & Forms/Textfeld`}),` und verwandte Felder), aber im Bereich-Theme der
Veranstaltung: Header in Bereichsfarbe-700 mit weißem Text, Form-Body in `,(0,o.jsx)(t.code,{children:`var(--n-50)`}),`.
Anker-ID `,(0,o.jsx)(t.code,{children:`#ev-anmeldung`}),` für den „Platz sichern“-Sprung aus dem Sub-Strip.`]}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Element`}),(0,o.jsx)(t.th,{children:`Regel`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Form-Header`}),(0,o.jsxs)(t.td,{children:[`Vollbreite Banner in `,(0,o.jsx)(t.code,{children:`--{area}-700`}),` mit weißem Text, trägt H2 und kurzen Lead`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Form-Body`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`background:var(--n-50)`}),`, `,(0,o.jsx)(t.code,{children:`padding:var(--s6)`}),`, Felder zweispaltig (Vorname, Nachname), Single-Field für E-Mail, Select für Rolle/Erfahrung, Textarea für „Was Dich beschäftigt“`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Submit-Button`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.btn.btn-filled.btn-{area}.btn-full`}),`, Text formatabhängig: „Platz reservieren“ (Meet-Up), „Anmelden & bezahlen“ (kostenpflichtiges Training)`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Anker-ID`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`id="ev-anmeldung"`}),` auf dem Form-Container`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Datenschutz-Konsent`}),(0,o.jsxs)(t.td,{children:[`Checkbox vor dem Submit-Button, `,(0,o.jsx)(t.code,{children:`accent-color:var(--{area}-700)`}),` trifft das Bereich-Theme auch im nativen Browser-Render`]})]})]})]}),`
`,(0,o.jsx)(t.h2,{id:`formate`,children:`Formate`}),`
`,(0,o.jsx)(t.p,{children:`Conciso nutzt ausschließlich fünf Veranstaltungsformate. Pill, Format-Filter und das
Format-Feld im Meta-Strip kennen nur diese Begriffe.`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Format`}),(0,o.jsx)(t.th,{children:`Wofür`}),(0,o.jsx)(t.th,{children:`Typische Länge`}),(0,o.jsx)(t.th,{children:`Preis`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Meet-Up`}),(0,o.jsx)(t.td,{children:`Kurze Abend-Veranstaltungen, Inputs plus offene Runde, oft kostenlos`}),(0,o.jsx)(t.td,{children:`2 bis 3 Stunden, abends`}),(0,o.jsx)(t.td,{children:`Kostenlos`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Konferenz`}),(0,o.jsx)(t.td,{children:`Größere Multi-Speaker-Veranstaltungen mit Track-Programm`}),(0,o.jsx)(t.td,{children:`1 bis 2 Tage`}),(0,o.jsx)(t.td,{children:`Eintritts-Tickets`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Training`}),(0,o.jsx)(t.td,{children:`Strukturierte Lerneinheit mit Hands-On-Anteil`}),(0,o.jsx)(t.td,{children:`Halbtägig bis mehrtägig`}),(0,o.jsx)(t.td,{children:`Pauschal pro Teilnehmer:in`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Webinar`}),(0,o.jsx)(t.td,{children:`Online-Format, meist kürzer und niedrigschwelliger`}),(0,o.jsx)(t.td,{children:`1 bis 4 Stunden, online`}),(0,o.jsx)(t.td,{children:`Kostenlos oder Pauschal`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Jobmesse`}),(0,o.jsx)(t.td,{children:`Recruiting-Veranstaltung, Conciso präsentiert sich potenziellen Bewerber:innen`}),(0,o.jsx)(t.td,{children:`Stunden bis halbtägig`}),(0,o.jsx)(t.td,{children:`Kostenlos`})]})]})]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Charakter-Wörter im Titel sind erlaubt.`}),` Titel wie „Refactoring Bootcamp“ oder
„Retro-Werkstatt“ dürfen Marketing-Wörter als Branding tragen. Die Pill kategorisiert
dennoch nach den fünf Formaten. Klebt der Charakter-Begriff direkt an der Pill und die
Inkonsistenz fällt auf (Titel „AI Readiness Workshop“, Pill „Training“), wird der Titel
umbenannt.`]}),`
`,(0,o.jsx)(t.h2,{id:`datum--uhrzeit`,children:`Datum & Uhrzeit`}),`
`,(0,o.jsx)(t.p,{children:`Zwei Prinzipien: Wochentag als Hard-Filter zuerst, Monatsnamen ausgeschrieben.`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Kontext`}),(0,o.jsx)(t.th,{children:`Format`}),(0,o.jsx)(t.th,{children:`Beispiel`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Eintägig mit Uhrzeit`}),(0,o.jsx)(t.td,{children:`Wt, T. Monat JJJJ · HH:MM`}),(0,o.jsx)(t.td,{children:`Fr, 5. Februar 2027 · 18:00`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Eintägig ganztägig`}),(0,o.jsx)(t.td,{children:`Wt, T. Monat JJJJ · ganztägig`}),(0,o.jsx)(t.td,{children:`Di, 9. März 2027 · ganztägig`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Halbtägig`}),(0,o.jsx)(t.td,{children:`Wt, T. Monat JJJJ · halbtägig`}),(0,o.jsx)(t.td,{children:`Do, 10. Juni 2027 · halbtägig`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Mehrtägig`}),(0,o.jsx)(t.td,{children:`Wt1 & Wt2, T1. / T2. Monat JJJJ`}),(0,o.jsx)(t.td,{children:`Mo & Di, 22. / 23. Februar 2027`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Zeitspanne (Meta-Strip-Helper)`}),(0,o.jsx)(t.td,{children:`HH:MM bis HH:MM Uhr`}),(0,o.jsx)(t.td,{children:`18:00 bis 21:00 Uhr`})]})]})]}),`
`,(0,o.jsx)(t.p,{children:`Wochentag-Abkürzungen: Mo, Di, Mi, Do, Fr, Sa, So (zwei Buchstaben, ohne Punkt). Bei
Mehrtages-Spans optional ausgeschrieben, im Card-Kontext kurz halten.`}),`
`,(0,o.jsx)(t.h2,{id:`verwendung`,children:`Verwendung`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Aspekt`}),(0,o.jsx)(t.th,{children:`Regel`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Hero-Eyebrow`}),(0,o.jsx)(t.td,{children:`Schema „Fokusveranstaltung · Format · Preis“, für Konferenzen ersetzbar durch „Konferenz“`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Bereich-Theme`}),(0,o.jsx)(t.td,{children:`Komplette Seite trägt eine Bereichsfarbe (ki, es, wo), nicht Corporate-Petrol`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Anker-Konvention`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`#ev-anmeldung`}),` für Form, `,(0,o.jsx)(t.code,{children:`#ev-agenda`}),` für Agenda, beide smooth-scrollend`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Speaker-Pflicht`}),(0,o.jsx)(t.td,{children:`Jede Veranstaltung mindestens einer Speaker:in zuordnen, anonyme Programme reduzieren die Anmeldebereitschaft`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Submit-Button-Label`}),(0,o.jsx)(t.td,{children:`Format-spezifisch: „Platz reservieren“ (Meet-Up), „Anmelden & bezahlen“ (kostenpflichtig), „Ticket buchen“ (Konferenz)`})]})]})]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Dos`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Komplette Detail-Seite in einem Bereich-Theme halten, Mischfarben irritieren beim
Anmeldeschritt.`}),`
`,(0,o.jsx)(t.li,{children:`Meta-Strip mit allen vier Badges zeigen, auch wenn ein Wert „Kostenlos“ oder „Online“
ist.`}),`
`,(0,o.jsx)(t.li,{children:`Speaker:innen mit Foto oder Initialen plus Bio nennen.`}),`
`,(0,o.jsxs)(t.li,{children:[`Smooth-Scroll bei In-Page-Ankern, außer bei `,(0,o.jsx)(t.code,{children:`prefers-reduced-motion`}),`.`]}),`
`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Don'ts`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Generic-Form ohne Bereich-Header.`}),`
`,(0,o.jsx)(t.li,{children:`Eigene Format-Begriffe einführen.`}),`
`,(0,o.jsx)(t.li,{children:`Programm ohne Uhrzeiten oder ohne benannte Speaker.`}),`
`,(0,o.jsx)(t.li,{children:`Datum nur als Zahl („05.02.2027“) ohne Wochentag und ausgeschriebenen Monat.`}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var o;function init_veranstaltung(){return(init_veranstaltung=e((()=>{o=t(),r(),i()})))()}init_veranstaltung();export{MDXContent as default};