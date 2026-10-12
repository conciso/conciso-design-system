import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n,s as r}from"./blocks-CgfgLRYg.js";import{s as i}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i as a,r as o}from"./react-C77DJ2jK.js";function _createMdxContent(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...a(),...e.components},{HtmlBeispiel:i}=t;return i||_missingMdxReference(`HtmlBeispiel`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n,{title:`Grundlagen/Barrierefreiheit`,name:`Übersicht`}),`
`,(0,s.jsx)(t.h1,{id:`barrierefreiheit`,children:`Barrierefreiheit`}),`
`,(0,s.jsxs)(t.p,{children:[`Kontrastverhältnisse aller Brand-Farben, Tastaturnavigation, ARIA Patterns, Touch
Targets, Reduced Motion. Pflicht sind die Stufen A und AA, AAA nehmen wir mit, wo es ohne
Nachteil geht. Vollständige Kriterien-Übersicht:
`,(0,s.jsx)(t.a,{href:`https://www.w3.org/WAI/WCAG22/quickref/`,rel:`nofollow`,children:`WCAG 2.2 Quickref (W3C)`}),`.`]}),`
`,(0,s.jsx)(t.h2,{id:`anspruch`,children:`Anspruch`}),`
`,(0,s.jsx)(t.p,{children:`Das System ist auf Konformitätsstufe AA gebaut. Nach WCAG-Definition heißt das: alle
Erfolgskriterien der Stufe A und alle der Stufe AA sind erfüllt. AA liegt also nicht über
A, sondern schließt es ein. Der Anspruch gilt für jedes Kriterium, nicht nur für Kontrast,
ebenso für Tastaturbedienung, Fokus, Struktur, Beschriftung, Bewegung und Zielgrößen.`}),`
`,(0,s.jsx)(t.p,{children:`Stufe AAA ist Zugabe, kein Abnahmekriterium. Wo sie ohne Nachteil für Gestaltung oder
Verständlichkeit erreichbar ist, nehmen wir sie mit. Wo sie etwas kostet, bleibt AA der
Maßstab. An einem AAA-Kriterium scheitert keine Änderung.`}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Pflicht, A und AA.`}),` Gilt für alles, was das System ausliefert. Zwei Prüfungen laufen
automatisch: `,(0,s.jsx)(t.code,{children:`npm run check:contrast`}),` rendert die Doku in beiden Modi und muss 0 melden,
`,(0,s.jsx)(t.code,{children:`npm run check:dark-states`}),` findet Zustände, die im Dark Mode unlesbar würden. Alles, was
sich nicht messen lässt (Tastaturpfad, Screenreader-Ausgabe), gehört in die Prüfung von
Hand.`]}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Freiwillig darüber.`}),` An vielen Stellen liegt das System über der Pflicht. Die meisten
Textfarben erreichen 7:1 und mehr (AAA). Touch-Targets liegen bei 44 px, das ist 2.5.5 auf
AAA, verlangt wären 24 px. Diese Marken zeigen den Überschuss, nicht die Messlatte, sie
dürfen an einzelnen Stellen fehlen, ohne dass etwas kaputt ist.`]}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Nicht erfüllt, bewusst.`}),` 2.3.3 Animation from Interactions (AAA) verlangt, dass eine
durch Bedienung ausgelöste Bewegung abschaltbar ist. Der Hover-Lift von 2 px auf
klickbaren Karten und auf dem Störer läuft auch bei `,(0,s.jsx)(t.code,{children:`prefers-reduced-motion: reduce`}),`, weil
er die Klickbarkeit signalisiert. Auto-Bewegung ist davon getrennt, die Carousels
respektieren die Einstellung.`]}),`
`,(0,s.jsx)(t.h2,{id:`kontrastverhältnisse--textfarben-auf-weiß`,children:`Kontrastverhältnisse · Textfarben auf Weiß`}),`
`,(0,s.jsxs)(t.p,{children:[`Die Modus-Markierung zeigt, auf welchen Theme-Modus sich ein Wert bezieht: Light für die
hellen Token-Werte (Page-Background `,(0,s.jsx)(t.code,{children:`#FFFFFF`}),`), Dark für die dunklen Pendants
(Page-Background `,(0,s.jsx)(t.code,{children:`#151A1F`}),`).`]}),`
`,(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:`Farbe`}),(0,s.jsx)(t.th,{children:`Wert (Light)`}),(0,s.jsx)(t.th,{children:`Kontrast auf Weiß`}),(0,s.jsx)(t.th,{children:`Einsatz`}),(0,s.jsx)(t.th,{children:`Stufe`})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--tx-primary`})}),(0,s.jsx)(t.td,{children:`#333E48`}),(0,s.jsx)(t.td,{children:`10,4:1`}),(0,s.jsx)(t.td,{children:`Fließtext, Headlines, UI-Labels`}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--tx-secondary`})}),(0,s.jsx)(t.td,{children:`#4A6565`}),(0,s.jsx)(t.td,{children:`5,8:1`}),(0,s.jsx)(t.td,{children:`Lead, Sub-Titel, Captions`}),(0,s.jsx)(t.td,{children:`AA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--tx-muted`})}),(0,s.jsx)(t.td,{children:`#5A7171`}),(0,s.jsx)(t.td,{children:`5,25:1`}),(0,s.jsx)(t.td,{children:`Leise Texte: Eyebrow, Counter, Meta-Angaben, Captions. Abgedunkelt von #6E8585 (3,9:1), das AA für Normaltext verfehlte`}),(0,s.jsx)(t.td,{children:`AA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Corporate 700`}),(0,s.jsx)(t.td,{children:`#007575`}),(0,s.jsx)(t.td,{children:`5,5:1`}),(0,s.jsx)(t.td,{children:`Links, farbige Überschriften`}),(0,s.jsx)(t.td,{children:`AA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Angewandte KI 800`}),(0,s.jsx)(t.td,{children:`#475705`}),(0,s.jsx)(t.td,{children:`8,1:1`}),(0,s.jsx)(t.td,{children:`Texteinsatz (700 mit 4,4:1 nicht ausreichend)`}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Angewandte KI 700`}),(0,s.jsx)(t.td,{children:`#6B8208`}),(0,s.jsx)(t.td,{children:`4,4:1`}),(0,s.jsx)(t.td,{children:`Knapp unter 4,5:1 AA-Schwelle`}),(0,s.jsx)(t.td,{children:`Fail`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Effektive Software 500`}),(0,s.jsx)(t.td,{children:`#2F5FD4`}),(0,s.jsx)(t.td,{children:`5,7:1`}),(0,s.jsxs)(t.td,{children:[`Links, farbige Überschriften, Akzentflächen. Button-Background nutzt `,(0,s.jsx)(t.code,{children:`--es-700`}),` (`,(0,s.jsx)(t.code,{children:`.btn-es`}),`)`]}),(0,s.jsx)(t.td,{children:`AA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Effektive Software 700`}),(0,s.jsx)(t.td,{children:`#1B3D9A`}),(0,s.jsx)(t.td,{children:`9,7:1`}),(0,s.jsx)(t.td,{children:`Fließtext, dunkle Überschriften`}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Wirksame Organisationen 600`}),(0,s.jsx)(t.td,{children:`#347A22`}),(0,s.jsx)(t.td,{children:`5,3:1`}),(0,s.jsx)(t.td,{children:`Buttons mit weißer Schrift (mindestens 600)`}),(0,s.jsx)(t.td,{children:`AA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Wirksame Organisationen 700`}),(0,s.jsx)(t.td,{children:`#285E1A`}),(0,s.jsx)(t.td,{children:`7,8:1`}),(0,s.jsx)(t.td,{children:`Texteinsatz, Links`}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Rosé 500`}),(0,s.jsx)(t.td,{children:`#C23060`}),(0,s.jsx)(t.td,{children:`5,3:1`}),(0,s.jsx)(t.td,{children:`Links, Buttons, farbige Labels`}),(0,s.jsx)(t.td,{children:`AA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Rosé 700`}),(0,s.jsx)(t.td,{children:`#7E1639`}),(0,s.jsx)(t.td,{children:`10,2:1`}),(0,s.jsx)(t.td,{children:`Texteinsatz, dunkle Überschriften`}),(0,s.jsx)(t.td,{children:`AAA`})]})]})]}),`
`,(0,s.jsxs)(t.p,{children:[`Angewandte-KI-700 ist die einzige Zeile, die AA für Normaltext verfehlt (4,4:1 gegen die
4,5:1-Schwelle), deshalb trägt farbiger KI-Text `,(0,s.jsx)(t.code,{children:`--ki-800`}),`, nicht `,(0,s.jsx)(t.code,{children:`--ki-700`}),`.`]}),`
`,(0,s.jsxs)(t.p,{children:[`Diese Tabelle zeigt nur die reinen Kontrastwerte. Welches Token (Ink, Fill, Band oder
Tönung) für welche Rolle passt und wann eine Bereichsfarbe als Textfarbe überhaupt in
Frage kommt, beschreibt `,(0,s.jsx)(t.code,{children:`Grundlagen/Farben`}),` ausführlich, inklusive Dos & Don'ts.`]}),`
`,(0,s.jsx)(t.p,{children:`Der folgende Block zeigt zusätzlich zur Tabelle die tatsächliche Farbe jedes Tokens als
Fläche und macht die Lesbarkeit der weißen „Aa“-Beschriftung direkt sichtbar, statt sie nur
als Zahl zu benennen.`}),`
`,`
`,`
`,`
`,(0,s.jsx)(r,{children:c.map((e,t)=>(0,s.jsx)(ContrastRow,{...e},t))}),`
`,(0,s.jsx)(t.h2,{id:`kontrastverhältnisse--akzentfarben-nicht-für-text`,children:`Kontrastverhältnisse · Akzentfarben (nicht für Text)`}),`
`,(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:`Farbe`}),(0,s.jsx)(t.th,{children:`Wert`}),(0,s.jsx)(t.th,{children:`Kontrast auf Weiß`}),(0,s.jsx)(t.th,{children:`Hinweis`})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Corporate 500`}),(0,s.jsx)(t.td,{children:`#00BEBE`}),(0,s.jsx)(t.td,{children:`2,3:1`}),(0,s.jsx)(t.td,{children:`Nur als Hintergrundfläche, dunkler Text #002B2B (6,0:1 auf der Fläche)`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Angewandte KI 500`}),(0,s.jsx)(t.td,{children:`#B5E61C`}),(0,s.jsx)(t.td,{children:`1,4:1`}),(0,s.jsx)(t.td,{children:`Ausschließlich als Akzent, Text #475705 auf der Fläche (5,6:1)`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Wirksame Organisationen 500`}),(0,s.jsx)(t.td,{children:`#44A030`}),(0,s.jsx)(t.td,{children:`3,3:1`}),(0,s.jsx)(t.td,{children:`Nur Large Text / UI-Komponenten, weiße Schrift auf 500 verfehlt (3,3:1), mindestens 600 verwenden`})]})]})]}),`
`,(0,s.jsx)(t.p,{children:`Der Block zeigt, wie kräftig die reine Akzentfläche wirkt und mit welcher (nicht weißen)
Textfarbe die „Aa“-Beschriftung überhaupt lesbar bleibt, was die Tabelle nur als Fließtext
nennt.`}),`
`,`
`,(0,s.jsx)(r,{children:l.map((e,t)=>(0,s.jsx)(ContrastRow,{...e},t))}),`
`,(0,s.jsx)(t.h2,{id:`kontrastverhältnisse--dark-mode`,children:`Kontrastverhältnisse · Dark Mode`}),`
`,(0,s.jsxs)(t.p,{children:[`Im Dark Mode ist die Page-Background `,(0,s.jsx)(t.code,{children:`#151A1F`}),` (Token `,(0,s.jsx)(t.code,{children:`--bg-page`}),`), gehobene Flächen wie
Karten sitzen auf `,(0,s.jsx)(t.code,{children:`#28323D`}),` (`,(0,s.jsx)(t.code,{children:`--bg-surface`}),`). Die Basisfläche trägt 17,5:1 gegen Weiß und
liegt damit über der Material-Schwelle von 15,8:1, die sicherstellt, dass Fließtext auch
auf der höchsten Elevationsstufe noch 4,5:1 erreicht.`]}),`
`,(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:`Farbe`}),(0,s.jsx)(t.th,{children:`Wert (Dark)`}),(0,s.jsxs)(t.th,{children:[`Kontrast auf `,(0,s.jsx)(t.code,{children:`#151A1F`})]}),(0,s.jsx)(t.th,{children:`Einsatz`}),(0,s.jsx)(t.th,{children:`Stufe`})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--tx-primary`})}),(0,s.jsx)(t.td,{children:`#DDE9E9`}),(0,s.jsx)(t.td,{children:`14,1:1`}),(0,s.jsx)(t.td,{children:`Fließtext, Headlines, UI-Labels. Auf bg-surface 10,5:1`}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--tx-secondary`})}),(0,s.jsx)(t.td,{children:`#A6C6C6`}),(0,s.jsx)(t.td,{children:`9,6:1`}),(0,s.jsx)(t.td,{children:`Lead, Sub-Titel, Captions, Body in Karten. Auf bg-surface 7,1:1`}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--tx-muted`})}),(0,s.jsx)(t.td,{children:`#93B6B6`}),(0,s.jsx)(t.td,{children:`8,0:1`}),(0,s.jsx)(t.td,{children:`Gedämpfte Meta-Angaben. Auf bg-surface 6,0:1 (vorher 4,1:1, verfehlte dort AA)`}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Corporate 200`}),(0,s.jsx)(t.td,{children:`#80DEDE`}),(0,s.jsx)(t.td,{children:`11,2:1`}),(0,s.jsxs)(t.td,{children:[`Eyebrows, Card-Eyebrows, Bereichs-Text. Light-Pendant `,(0,s.jsx)(t.code,{children:`--co-700`})]}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Corporate 300`}),(0,s.jsx)(t.td,{children:`#4DD0D0`}),(0,s.jsx)(t.td,{children:`9,4:1`}),(0,s.jsxs)(t.td,{children:[`Pillar-Titles, Code-Tokens, Footer-Links. Light-Pendant `,(0,s.jsx)(t.code,{children:`--co-700`})]}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Angewandte KI 200`}),(0,s.jsx)(t.td,{children:`#D6F06D`}),(0,s.jsx)(t.td,{children:`13,8:1`}),(0,s.jsxs)(t.td,{children:[`KI-Bereichstexte, Tab-Active-State. Light-Pendant `,(0,s.jsx)(t.code,{children:`--ki-800`})]}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Effektive Software 200`}),(0,s.jsx)(t.td,{children:`#98B7EE`}),(0,s.jsx)(t.td,{children:`8,6:1`}),(0,s.jsxs)(t.td,{children:[`ES-Bereichstexte. Light-Pendant `,(0,s.jsx)(t.code,{children:`--es-700`})]}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Wirksame Organisationen 200`}),(0,s.jsx)(t.td,{children:`#A3D48E`}),(0,s.jsx)(t.td,{children:`10,3:1`}),(0,s.jsxs)(t.td,{children:[`WO-Bereichstexte. Light-Pendant `,(0,s.jsx)(t.code,{children:`--wo-700`})]}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--c-success`})}),(0,s.jsx)(t.td,{children:`#5CE8A0`}),(0,s.jsx)(t.td,{children:`11,3:1`}),(0,s.jsx)(t.td,{children:`Erfolgs-Marker in Do/Don't-Listen. Light-Pendant #0E6644 (6,99:1)`}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--c-warning`})}),(0,s.jsx)(t.td,{children:`#F0C060`}),(0,s.jsx)(t.td,{children:`10,4:1`}),(0,s.jsx)(t.td,{children:`Hinweise, Beta-Zustände. Light-Pendant #8A5E0A (5,70:1)`}),(0,s.jsx)(t.td,{children:`AAA`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--c-error`})}),(0,s.jsx)(t.td,{children:`#FFA5A5`}),(0,s.jsx)(t.td,{children:`9,3:1`}),(0,s.jsx)(t.td,{children:`Fehler-Marker, Inline-Fehlertext, Required-Asterisks. Auf bg-surface 6,9:1. Light-Pendant #B22020 (6,73:1)`}),(0,s.jsx)(t.td,{children:`AAA`})]})]})]}),`
`,(0,s.jsxs)(t.p,{children:[`Der Block zeigt dieselben Farben, wie sie im Dark Mode tatsächlich erscheinen, inklusive
der bei den Status-Farben vom Muster abweichenden Textfarbe für „Aa“, was die Tabelle nicht
abbildet. Die Zeilen tragen ihre Dark-Werte als feste Hex-Angaben (kein CSS-Token, kein
`,(0,s.jsx)(t.code,{children:`data-theme`}),`-Wrapper): Fläche und „Aa“-Textfarbe sind pro Zeile hart codiert, deshalb bleibt
der Block unabhängig vom aktuell aktiven Storybook-Theme korrekt.`]}),`
`,`
`,(0,s.jsx)(r,{children:u.map((e,t)=>(0,s.jsx)(ContrastRow,{...e},t))}),`
`,(0,s.jsx)(t.h2,{id:`tastaturnavigation`,children:`Tastaturnavigation`}),`
`,(0,s.jsx)(t.p,{children:`Jede Funktion ist ohne Maus erreichbar. Vier Kriterien greifen zusammen: 2.1.1 Keyboard
(alles bedienbar), 2.1.2 No Keyboard Trap (überall wieder heraus), 2.4.3 Focus Order
(sinnvolle Reihenfolge) und 2.4.7 Focus Visible (man sieht, wo man steht).`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Reihenfolge kommt aus dem Markup.`}),` Die Tab-Folge ergibt sich aus der
DOM-Reihenfolge, nicht aus der CSS-Position (WCAG 2.4.3). Regel: keine positiven
`,(0,s.jsx)(t.code,{children:`tabindex`}),`-Werte, sie stellen die Kette global um.`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsxs)(t.strong,{children:[`Sprungziele mit `,(0,s.jsx)(t.code,{children:`tabindex="-1"`}),`.`]}),` Ein Anker allein bewegt in manchen Browsern nur den
Scroll, nicht den Fokus. Landepunkte wie `,(0,s.jsx)(t.code,{children:`#main-content`}),` tragen deshalb
`,(0,s.jsx)(t.code,{children:`tabindex="-1"`}),`, programmatisch fokussierbar, aber nicht in der Tab-Kette.`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Skip-Link zuerst.`}),` Erstes fokussierbares Element der Seite, außerhalb des Viewports
geparkt und erst im Fokus sichtbar (WCAG 2.4.1). Überspringt die Navigation und setzt
den Fokus auf den Hauptinhalt.`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Keine Tastaturfalle.`}),` Jedes Element, das den Fokus einfängt, gibt ihn wieder her
(WCAG 2.1.2). Escape schließt Submenüs, Dropdowns und die Suche und setzt den Fokus auf
das auslösende Element zurück.`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Fokus darf nicht verdeckt sein.`}),` Das fokussierte Element muss sichtbar bleiben, nicht
hinter einer klebenden Leiste liegen (2.4.11, neu in WCAG 2.2).`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Ein Bauteil, ein Muster.`}),` Gleichartige Bauteile nehmen dieselben Tasten. Alles, was
eine Liste von Optionen öffnet (Submenü, Custom Select, Combobox), reagiert auf
Pfeil-runter/-hoch, Home/End und Escape.`]}),`
`]}),`
`,(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:`Bauteil`}),(0,s.jsx)(t.th,{children:`Tasten`}),(0,s.jsx)(t.th,{children:`Verhalten`})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Skip-Link`}),(0,s.jsx)(t.td,{children:`Enter`}),(0,s.jsx)(t.td,{children:`setzt den Fokus auf den Hauptinhalt`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Topnav-Submenü`}),(0,s.jsx)(t.td,{children:`Enter, Space, Pfeil ↓/↑, Home, End, Esc`}),(0,s.jsx)(t.td,{children:`Caret öffnet, Pfeile wandern durch die Einträge, Esc schließt und gibt den Fokus auf den Auslöser zurück, ein Klick außerhalb schließt ebenfalls (Heraustabben schließt ebenfalls)`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Custom Select`}),(0,s.jsx)(t.td,{children:`Enter, Space, Pfeil ↓/↑, Home, End, Esc, Tab, Buchstabe`}),(0,s.jsx)(t.td,{children:`öffnet und wählt, ein Buchstabe springt zur passenden Option (Puffer 600 ms), Tab schließt und geht weiter`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Combobox & Multi-Select`}),(0,s.jsx)(t.td,{children:`Pfeil ↓/↑, Home, End, Enter, Esc, Backspace`}),(0,s.jsx)(t.td,{children:`wie Select, Backspace im leeren Feld entfernt die letzte Auswahl`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Bild-Carousel`}),(0,s.jsx)(t.td,{children:`Pfeil ←/→`}),(0,s.jsx)(t.td,{children:`eine Folie zurück oder vor, wirkt auf dem gesamten Slider`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Logo-Karussell`}),(0,s.jsx)(t.td,{children:`Pfeil ←/↑/→/↓, Home, End`}),(0,s.jsx)(t.td,{children:`auf den Pagination-Dots, jede Taste pausiert zusätzlich den Auto-Wechsel`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Such-Feld der Beitragsübersicht`}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:`/`}),`, Esc`]}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:`/`}),` fokussiert die Suche, Esc leert das Feld`]})]})]})]}),`
`,(0,s.jsx)(t.h2,{id:`touch-targets`,children:`Touch Targets`}),`
`,(0,s.jsx)(t.p,{children:`Zwei Kriterien regeln die Zielgröße, und sie verlangen nicht dasselbe: 2.5.8 Target Size
(Minimum) fordert auf AA mindestens 24 × 24 px, 2.5.5 Target Size (Enhanced) auf AAA
mindestens 44 × 44 px. 2.5.8 ist neu in WCAG 2.2, in 2.1 gibt es auf AA gar keine
Zielgrößen-Anforderung. Das System zielt auf 44 px, liegt damit über der AA-Pflicht und
trifft zugleich die Empfehlung der Plattform-Guidelines. Wo 44 px nicht erreichbar sind,
gilt 24 px als harte Untergrenze.`}),`
`,(0,s.jsxs)(t.p,{children:[`Abstand zählt mit: 2.5.8 lässt kleinere Ziele zu, wenn genug Freiraum um sie liegt.
Zwischen benachbarten Zielen deshalb mindestens `,(0,s.jsx)(t.code,{children:`--s2`}),` (8 px), damit ein Daumen nicht zwei
Aktionen gleichzeitig trifft.`]}),`
`,(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:`Bauteil`}),(0,s.jsx)(t.th,{children:`Maß`}),(0,s.jsx)(t.th,{children:`Wo gesetzt`})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Buttons, alle Varianten`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`min-height: 44px`})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`.btn`})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Formularfelder (Input, Textarea, Select)`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`min-height: 44px`})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:`.field input`}),`, `,(0,s.jsx)(t.code,{children:`textarea`}),`, `,(0,s.jsx)(t.code,{children:`select`})]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Back-to-Top-Button`}),(0,s.jsx)(t.td,{children:`44 × 44 px`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`.back-to-top`})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Carousel-Pfeile`}),(0,s.jsx)(t.td,{children:`44 × 44 px`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`.img-slider-btn`})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Beispielseiten-Tabs und Aufklapp-Caret`}),(0,s.jsx)(t.td,{children:`44 px`}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:`.ep-tab`}),`, `,(0,s.jsx)(t.code,{children:`.ep-tab-toggle`})]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Topnav-Suchfeld`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`height: 44px`})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`.ep-nav-search-input`})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Topnav-Caret, mobil`}),(0,s.jsx)(t.td,{children:`44 × 44 px`}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:`.ep-nav-item-toggle`}),` im Mobil-Breakpoint`]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Snackbar`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`min-height: 48px`})}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`.snack`})})]})]})]}),`
`,(0,s.jsxs)(t.p,{children:[`Zwei bewusste Abweichungen: Segmented Control (`,(0,s.jsx)(t.code,{children:`.seg-option label`}),`) und Area Tabs
(`,(0,s.jsx)(t.code,{children:`.atab`}),`) liegen bei `,(0,s.jsx)(t.code,{children:`min-height: 40px`}),`. Beide sind Zeilen in einer dicht gesetzten
Umschaltgruppe, in der 44 px die Leiste optisch auseinanderziehen würden. Sie erfüllen
2.5.8 (AA) deutlich, verfehlen 2.5.5 (AAA) um 4 px. Neue Bauteile orientieren sich an
44 px, nicht an diesen beiden.`]}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Die 44-px-Ausnahme von der Spacing-Skala:`}),` Die 44 stehen hartcodiert im CSS, weil die
Spacing-Skala keinen 44-px-Schritt hat. Das ist eine der erlaubten Ausnahmen der
Strict-Scale-Konvention (siehe `,(0,s.jsx)(t.code,{children:`Grundlagen/Spacing & Grid`}),`): Werte, die eine physische
Mindestgröße beschreiben, folgen ihrer eigenen Logik statt dem 8pt-Rhythmus.`]}),`
`,(0,s.jsx)(t.h2,{id:`aria-patterns`,children:`ARIA Patterns`}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Focus-Ring.`}),` Sichtbarer Fokusindikator für alle interaktiven Elemente (WCAG 2.4.7).`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-css`,children:`--focus-ring: 0 0 0 3px var(--co-50), 0 0 0 5px var(--co-700);
:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}
`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Formulare & Fehler.`}),` Fehlermeldungen programmatisch mit dem Feld verknüpfen (WCAG
1.3.1, 3.3.1).`]}),`
`,(0,s.jsx)(i,{titel:`Eingabefeld mit Fehlermeldung`,children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-html`,children:`<input aria-invalid="true" aria-describedby="err-id">
<span id="err-id" role="alert">Pflichtfeld</span>
`})})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Dekorative Icons.`}),` SVGs ohne inhaltliche Bedeutung vor Screenreadern verbergen (WCAG
1.1.1).`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-html`,children:`<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
  <path d="…"/>
</svg>
`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Icon-only Buttons.`}),` Buttons ohne sichtbares Label brauchen ein zugängliches
Textalternativ (WCAG 1.1.1).`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-html`,children:`<button aria-label="Menü öffnen">
  <svg aria-hidden="true" focusable="false">…</svg>
</button>
`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Tab Panels.`}),` Tabs als Tablist mit vollständigen ARIA-Relationen (WCAG 4.1.2). Pfeiltasten, Home/End und Roving-Tabindex gehören dazu, die Umsetzung für Area Tabs steht unter `,(0,s.jsx)(t.code,{children:`Marke/Brand Areas/AreaTabs/Verwendung`}),`.`]}),`
`,(0,s.jsxs)(t.p,{children:[`Ein Panel trägt `,(0,s.jsx)(t.code,{children:`tabindex="0"`}),` nur, wenn es kein fokussierbares Element enthält (reiner Text). Steckt ein Button, Link oder Formularfeld darin, entfällt das Attribut.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-html`,children:`<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">Tab 1</button>
</div>
<!-- Panel mit reinem Text: tabindex="0" -->
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0">…</div>
`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Live Regions.`}),` Dynamische Inhalte für Screenreader ankündigen (WCAG 4.1.3).`]}),`
`,(0,s.jsx)(i,{titel:`Statusmeldung als Live-Region`,children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-html`,children:`<!-- Status, höflich, unterbricht nicht -->
<div role="status" aria-live="polite">Gespeichert.</div>

<!-- Alert, sofort, unterbricht -->
<div role="alert" aria-live="assertive">Verbindungsfehler.</div>
`})})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Toggle & Filter-Buttons.`}),` Buttons mit zwei Zuständen (gedrückt, nicht gedrückt)
brauchen `,(0,s.jsx)(t.code,{children:`aria-pressed`}),`, damit Screenreader den Status ansagen (WCAG 4.1.2). Verwendung
unter anderem bei Filter-Chips.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-html`,children:`<button class="chip" aria-pressed="true" data-area="ki">Angewandte KI</button>

/* Style stützt sich auf das ARIA-Attribut, nicht auf eine separate
   .sel- oder .active-Klasse */
.chip[aria-pressed="true"] { … }
`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Such-Feld als Landmark.`}),` Such-Bereiche bekommen `,(0,s.jsx)(t.code,{children:`role="search"`}),` plus eigenes
`,(0,s.jsx)(t.code,{children:`aria-label`}),`, damit wird das Suchfeld zur Landmark, die Screenreader-Nutzerinnen direkt
anspringen (WCAG 1.3.1, 2.4.6).`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-html`,children:`<div role="search" aria-label="Beiträge durchsuchen">
  <svg aria-hidden="true" focusable="false">…</svg>
  <input type="search" aria-label="Beiträge nach Stichwort durchsuchen">
</div>
`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Aktive Navigation.`}),` Der aktive Eintrag in einer Navigation wird via
`,(0,s.jsx)(t.code,{children:`aria-current="page"`}),` markiert, ein sichtbarer Active-State allein reicht für
Screenreader nicht (WCAG 1.3.1).`]}),`
`,(0,s.jsx)(i,{titel:`Navigationslink der aktuellen Seite`,children:(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-html`,children:`<a class="ep-nav-btn" href="/ueber-uns" aria-current="page">Unternehmen</a>

<style>
  .ep-nav-btn[aria-current="page"] { color: var(--co-700); }
</style>
`})})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsxs)(t.strong,{children:[`Visuell versteckt (`,(0,s.jsx)(t.code,{children:`.sr-only`}),`).`]}),` Text nur für Screenreader, visuell entfernt. Trägt die
Bedeutung hinter rein grafischen Markern (Häkchen, Minus) in Vergleichstabellen, Glyph
allein reicht nicht (WCAG 1.1.1, 1.3.1). Dieselbe Utility ergänzt auch eine `,(0,s.jsx)(t.code,{children:`<caption>`}),`
der Vergleichstabelle um Text, den nur Screenreader brauchen. Sie steht in `,(0,s.jsx)(t.code,{children:`base.css`}),`.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-html`,children:`<td>
  <span class="ep-compare-yes" aria-hidden="true">✓</span>
  <span class="sr-only">Enthalten</span>
</td>

.sr-only {
  position: absolute; width: 1px; height: 1px;
  margin: -1px; padding: 0; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
`})}),`
`,(0,s.jsx)(t.h2,{id:`reduzierte-bewegung--high-contrast`,children:`Reduzierte Bewegung & High Contrast`}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsxs)(t.strong,{children:[(0,s.jsx)(t.code,{children:`prefers-reduced-motion`}),`.`]}),` Nutzer mit Gleichgewichts- oder Aufmerksamkeitsstörungen
können Animationen deaktivieren (WCAG 2.3.3 AAA).`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-css`,children:`@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsxs)(t.strong,{children:[(0,s.jsx)(t.code,{children:`forced-colors`}),` (High Contrast).`]}),` Windows High Contrast Mode ersetzt Farben durch
Systemfarben, Grenzen durch Borders statt nur Farbe ausdrücken.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-css`,children:`@media (forced-colors: active) {
  .btn-filled {
    border: 2px solid ButtonText;
    forced-color-adjust: none;
  }
  .btn-outlined { border-color: ButtonText; }
}
`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Theme-Umschaltung.`}),` Das Design System kennt genau zwei Modi, Light und Dark.
Umgeschaltet wird ausschließlich über das Attribut `,(0,s.jsx)(t.code,{children:`[data-theme="dark"]`}),` am `,(0,s.jsx)(t.code,{children:`<html>`}),`.
Einen dritten Modus, der der Betriebssystem-Präferenz folgt, gibt es bewusst nicht,
`,(0,s.jsx)(t.code,{children:`prefers-color-scheme`}),` wird im ausgelieferten CSS nicht ausgewertet, Standard ist Light.
`,(0,s.jsx)(t.code,{children:`color-scheme: dark`}),` ist im Dark-Theme fest gesetzt, damit native Controls (Checkbox,
Radio, Scrollbar, Select-Popup) dark-thematisiert rendern. Ohne diese Deklaration zeigt der
Browser zum Beispiel eine hell-thematisierte Checkbox auf dunklem Grund, optisch ein
Fremdkörper.`]}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Druck.`}),` `,(0,s.jsx)(t.code,{children:`dark-mode.css`}),` steht komplett in `,(0,s.jsx)(t.code,{children:`@media screen`}),`, Token-Block und
Komponenten-Regeln. Eine Seite mit gesetztem `,(0,s.jsx)(t.code,{children:`data-theme="dark"`}),` druckt deshalb die
Light-Werte aus `,(0,s.jsx)(t.code,{children:`tokens.css`}),` statt der vollen dunklen Fläche, ohne dass diese Werte ein
zweites Mal gepflegt werden müssen. Die Komponenten-Regeln müssen mit in den Block: Viele
von ihnen setzen eine helle Tint- oder Festfarbe, die auf dem hellen Druckgrund nur 1,2 bis
1,9:1 trägt. Neue Dark-Regeln gehören deshalb immer innerhalb des Blocks, sonst drucken sie
dunkel mit.`]}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`Smooth-Scroll für In-Page-Anker.`}),` Klicks auf In-Page-Anker innerhalb derselben Seite
animieren das Scrollen statt hart zu springen. Bei `,(0,s.jsx)(t.code,{children:`prefers-reduced-motion: reduce`}),` wird
der Hard-Jump beibehalten, weil sanftes Scrollen für vestibulär empfindliche Nutzerinnen
Schwindel auslösen kann (WCAG 2.3.3).`]}),`
`,(0,s.jsx)(t.h2,{id:`video-embed`,children:`Video-Embed`}),`
`,(0,s.jsxs)(t.p,{children:[`Videos (zum Beispiel YouTube) werden als responsiver `,(0,s.jsx)(t.code,{children:`<iframe>`}),` eingebunden. Ein
Großteil der Barrierefreiheit hängt am Videoinhalt selbst (Untertitel, Transkript) und
lässt sich nicht allein über das Embed erzwingen.`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-html`,children:`<iframe
  src="https://www.youtube-nocookie.com/embed/ID"
  title="Was ist Keycloak? Erklärt von …"
  loading="lazy"
  referrerpolicy="strict-origin-when-cross-origin"
  allowfullscreen
  style="width:100%;aspect-ratio:16/9;border:0;border-radius:var(--r-lg)"></iframe>
`})}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsxs)(t.strong,{children:[`iframe braucht `,(0,s.jsx)(t.code,{children:`title`}),`.`]}),` Jeder Video-iframe bekommt einen aussagekräftigen `,(0,s.jsx)(t.code,{children:`title`}),`
(WCAG 4.1.2), Screenreader kündigen den Frame damit benannt an.`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Untertitel (WCAG 1.2.2, AA).`}),` Aufgezeichnete Videos brauchen Untertitel. Automatische
YouTube-Untertitel allein erfüllen die Anforderung nicht (Qualität, Zeichensetzung).
Fremdsprachige Videos bekommen Untertitel in der Seitensprache.`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Transkript & Audiodeskription.`}),` Ein Transkript in der Nähe des Videos hilft allen,
die es nicht abspielen können, und dient Suchmaschinen. Enthält das Bild Informationen,
die im Ton fehlen, ist zusätzlich eine Audiodeskription nötig (WCAG 1.2.3/1.2.5).`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Kein Autoplay.`}),` Nie `,(0,s.jsx)(t.code,{children:`autoplay=1`}),` setzen, Ton und Bewegung starten erst auf Klick
(WCAG 1.4.2, 2.2.2), das respektiert auch `,(0,s.jsx)(t.code,{children:`prefers-reduced-motion`}),`.`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Responsiv und ohne Rahmen.`}),` `,(0,s.jsx)(t.code,{children:`width:100%`}),` plus `,(0,s.jsx)(t.code,{children:`aspect-ratio:16/9`}),` hält das Video
seitenbreit ohne horizontales Scrollen.`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Datenschutz.`}),` Einbindung über `,(0,s.jsx)(t.code,{children:`youtube-nocookie.com`}),` und `,(0,s.jsx)(t.code,{children:`loading="lazy"`}),` reduziert
Tracking und Ladelast. Für die produktive Seite gilt zusätzlich: erst nach Einwilligung
laden, da beim Abspielen Cookies gesetzt werden.`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Sprache kennzeichnen.`}),` Weicht die Videosprache von der Seitensprache ab, im
umgebenden Text ausweisen (zum Beispiel Videosprache Englisch).`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.strong,{children:`Fokus & Tastatur.`}),` Der YouTube-Player ist tastaturbedienbar und beschriftet, der
iframe ist fokussierbar, keine positiven `,(0,s.jsx)(t.code,{children:`tabindex`}),`-Werte vergeben.`]}),`
`]}),`
`,(0,s.jsxs)(t.p,{children:[`Was das Design-System liefert versus was der Videoinhalt liefern muss: Embed-seitig sind
`,(0,s.jsx)(t.code,{children:`title`}),`, kein Autoplay, responsives 16:9, Datenschutz-Host und Sprach-Hinweis abgedeckt.
Untertitel, Transkript und Audiodeskription hängen an der Videoquelle und müssen beim
Upload hinterlegt werden, das kann das Design System nicht erzwingen.`]}),`
`,(0,s.jsx)(t.h2,{id:`gates`,children:`Gates`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`npm run check:contrast`}),` prüft beide Modi in Chromium und muss
0 Befunde melden (Text gegen 4,5:1 beziehungsweise 3:1 bei Großtext, getönte
Bauteil-Füllungen gegen den 1,3:1-Faustwert, Bedienelement-Rahmen gegen 3:1).`]}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`npm run check:dark-states`}),` findet Zustände (Hover, Focus, Active), die im Dark Mode
dunkel auf dunkel und damit unlesbar würden.`]}),`
`,(0,s.jsxs)(t.li,{children:[`Storybook fährt `,(0,s.jsx)(t.code,{children:`@storybook/addon-a11y`}),` global scharf: `,(0,s.jsx)(t.code,{children:`a11y: { test: 'error' }`}),` in
`,(0,s.jsx)(t.code,{children:`.storybook/preview.ts`}),`, axe-Verstöße lassen den Test-Runner fehlschlagen.`]}),`
`,(0,s.jsxs)(t.li,{children:[`Einzelne Stories mit einem bekannten, im CSS-Kern liegenden Befund dürfen lokal
`,(0,s.jsx)(t.code,{children:`a11y: { test: 'todo' }`}),` setzen (im Panel weiter sichtbar, aber nicht blockierend). Zum
Zeitpunkt dieser Seite sind in `,(0,s.jsx)(t.code,{children:`apps/storybook/src/lib`}),` `,(0,s.jsx)(t.strong,{children:`keine`}),` aktiven
`,(0,s.jsx)(t.code,{children:`test: 'todo'`}),`-Overrides gesetzt. `,(0,s.jsx)(t.code,{children:`apps/storybook/README.md`}),` dokumentiert drei
frühere, inzwischen im CSS-Kern behobene Befunde (DownloadCta-Eyebrow, CodeBlock-Copy,
Slider-Wertanzeige) als Referenz dafür, wie eine solche Ausnahme aussieht und wann sie
wieder scharf geschaltet wird.`]}),`
`]}),`
`,(0,s.jsx)(t.h2,{id:`siehe-auch`,children:`Siehe auch`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`Grundlagen/Farben`}),` für Token-Rollen je Farbstufe (Ink, Fill, Band, Tönung) und Dos & Don'ts`]}),`
`,(0,s.jsx)(t.li,{children:`CONTRIBUTING.md § 1 Grundprinzipien, § 3 Farbe & Kontrast`}),`
`,(0,s.jsxs)(t.li,{children:[(0,s.jsx)(t.code,{children:`apps/storybook/README.md`}),`, Abschnitt „Frühere a11y-Befunde im CSS-Kern (behoben)“`]}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var s,withCode,ContrastRow,c,l,u;function init_barrierefreiheit(){return(init_barrierefreiheit=e((()=>{s=i(),o(),t(),withCode=e=>e.split("`").map((e,t)=>t%2==1?(0,s.jsx)(`code`,{className:`token`,children:e},t):e),ContrastRow=({bg:e,fg:t,mode:n,name:r,ratio:i,badgeText:a,badgeClass:o})=>(0,s.jsxs)(`div`,{className:`contrast-row`,children:[(0,s.jsx)(`div`,{className:`cswatch`,style:{background:e,color:t},children:`Aa`}),(0,s.jsxs)(`div`,{className:`cinfo`,children:[(0,s.jsxs)(`div`,{className:`cname`,children:[(0,s.jsx)(`span`,{className:`a11y-mode`,children:n}),withCode(r)]}),(0,s.jsx)(`div`,{className:`cratio`,children:withCode(i)})]}),(0,s.jsx)(`span`,{className:`cbadge ${o}`,children:a})]}),c=[{bg:`#333E48`,fg:`#fff`,mode:`Light`,name:"`--tx-primary` #333E48 auf Weiß",ratio:`10,4:1, Fließtext, Headlines, UI-Labels`,badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#4A6565`,fg:`#fff`,mode:`Light`,name:"`--tx-secondary` #4A6565 auf Weiß",ratio:`5,8:1, Lead, Sub-Titel, Captions`,badgeText:`AA ✓`,badgeClass:`c-aa`},{bg:`#5A7171`,fg:`#fff`,mode:`Light`,name:"`--tx-muted` #5A7171 auf Weiß",ratio:`5,25:1, leise Texte: Eyebrow, Counter, Meta-Angaben, Captions · abgedunkelt von #6E8585 (3,9:1), das AA für Normaltext verfehlte`,badgeText:`AA ✓`,badgeClass:`c-aa`},{bg:`#007575`,fg:`#fff`,mode:`Light`,name:`Corporate 700 #007575 auf Weiß`,ratio:`5,5:1, Links, farbige Überschriften`,badgeText:`AA ✓`,badgeClass:`c-aa`},{bg:`#475705`,fg:`#fff`,mode:`Light`,name:`Angewandte KI 800 #475705 auf Weiß`,ratio:`8,1:1, Texteinsatz (700 mit 4,4:1 nicht ausreichend)`,badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#6B8208`,fg:`#fff`,mode:`Light`,name:`Angewandte KI 700 #6B8208 auf Weiß`,ratio:`4,4:1, knapp unter 4,5:1 AA-Schwelle`,badgeText:`Fail ✗`,badgeClass:`c-fail-badge`},{bg:`#2F5FD4`,fg:`#fff`,mode:`Light`,name:`Effektive Software 500 #2F5FD4 auf Weiß`,ratio:"5,7:1, Links, farbige Überschriften, Akzentflächen · Button-Background nutzt `--es-700` (`.btn-es`)",badgeText:`AA ✓`,badgeClass:`c-aa`},{bg:`#1B3D9A`,fg:`#fff`,mode:`Light`,name:`Effektive Software 700 #1B3D9A auf Weiß`,ratio:`9,7:1, Fließtext, dunkle Überschriften`,badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#347A22`,fg:`#fff`,mode:`Light`,name:`Wirksame Organisationen 600 #347A22 auf Weiß`,ratio:`5,3:1, Buttons mit weißer Schrift (mind. 600)`,badgeText:`AA ✓`,badgeClass:`c-aa`},{bg:`#285E1A`,fg:`#fff`,mode:`Light`,name:`Wirksame Organisationen 700 #285E1A auf Weiß`,ratio:`7,8:1, Texteinsatz, Links`,badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#C23060`,fg:`#fff`,mode:`Light`,name:`Rosé 500 #C23060 auf Weiß`,ratio:`5,3:1, Links, Buttons, farbige Labels`,badgeText:`AA ✓`,badgeClass:`c-aa`},{bg:`#7E1639`,fg:`#fff`,mode:`Light`,name:`Rosé 700 #7E1639 auf Weiß`,ratio:`10,2:1, Texteinsatz, dunkle Überschriften`,badgeText:`AAA ✓`,badgeClass:`c-aaa`}],l=[{bg:`#00BEBE`,fg:`#002B2B`,mode:`Light`,name:`Corporate 500 #00BEBE, Akzentfläche`,ratio:`2,3:1 auf Weiß, nur als Hintergrundfläche · dunkler Text: #002B2B (6,0:1 ✓)`,badgeText:`Fläche only`,badgeClass:`c-fail-badge`},{bg:`#B5E61C`,fg:`#475705`,mode:`Light`,name:`Angewandte KI 500 #B5E61C, Akzentfläche`,ratio:`1,4:1 auf Weiß, ausschließlich als Akzent · Text: #475705 auf Fläche (5,6:1 ✓)`,badgeText:`Fläche only`,badgeClass:`c-fail-badge`},{bg:`#44A030`,fg:`#0A1F05`,mode:`Light`,name:`Wirksame Organisationen 500 #44A030`,ratio:`3,3:1 auf Weiß, nur Large Text / UI-Komponenten · weiße Schrift: 3,3:1 ✗ → mind. 600 verwenden`,badgeText:`AA Large ✓`,badgeClass:`c-aa`}],u=[{bg:`#DDE9E9`,fg:`#151A1F`,mode:`Dark`,name:"`--tx-primary` #DDE9E9 auf #151A1F",ratio:`14,1:1, Fließtext, Headlines, UI-Labels · auf bg-surface 10,5:1`,badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#A6C6C6`,fg:`#151A1F`,mode:`Dark`,name:"`--tx-secondary` #A6C6C6 auf #151A1F",ratio:`9,6:1, Lead, Sub-Titel, Captions, Body in Karten · auf bg-surface 7,1:1`,badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#93B6B6`,fg:`#151A1F`,mode:`Dark`,name:"`--tx-muted` #93B6B6 auf #151A1F",ratio:`8,0:1, gedämpfte Meta-Angaben · auf bg-surface 6,0:1 (vorher 4,1:1, verfehlte dort AA)`,badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#80DEDE`,fg:`#151A1F`,mode:`Dark`,name:`Corporate 200 #80DEDE auf #151A1F`,ratio:"11,2:1, Eyebrows, Card-Eyebrows, Bereichs-Text · Light-Pendant: `--co-700`",badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#4DD0D0`,fg:`#151A1F`,mode:`Dark`,name:`Corporate 300 #4DD0D0 auf #151A1F`,ratio:"9,4:1, Pillar-Titles, Code-Tokens, Footer-Links · Light-Pendant: `--co-700`",badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#D6F06D`,fg:`#151A1F`,mode:`Dark`,name:`Angewandte KI 200 #D6F06D auf #151A1F`,ratio:"13,8:1, KI-Bereichstexte, Tab-Active-State · Light-Pendant: `--ki-800`",badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#98B7EE`,fg:`#151A1F`,mode:`Dark`,name:`Effektive Software 200 #98B7EE auf #151A1F`,ratio:"8,6:1, ES-Bereichstexte · Light-Pendant: `--es-700`",badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#A3D48E`,fg:`#151A1F`,mode:`Dark`,name:`Wirksame Organisationen 200 #A3D48E auf #151A1F`,ratio:"10,3:1, WO-Bereichstexte · Light-Pendant: `--wo-700`",badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#5CE8A0`,fg:`#092417`,mode:`Dark`,name:"`--c-success` #5CE8A0 auf #151A1F",ratio:`11,3:1, ✓-Marker in Do/Don't-Listen · Light-Pendant: #0E6644 (6,99:1 ✓)`,badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#F0C060`,fg:`#271E0A`,mode:`Dark`,name:"`--c-warning` #F0C060 auf #151A1F",ratio:`10,4:1, Hinweise, Beta-Zustände · Light-Pendant: #8A5E0A (5,70:1 ✓)`,badgeText:`AAA ✓`,badgeClass:`c-aaa`},{bg:`#FFA5A5`,fg:`#3D0F0F`,mode:`Dark`,name:"`--c-error` #FFA5A5 auf #151A1F",ratio:`9,3:1, ✕-Marker, Inline-Fehlertext, Required-Asterisks · auf bg-surface 6,9:1 · Light-Pendant: #B22020 (6,73:1 ✓)`,badgeText:`AAA ✓`,badgeClass:`c-aaa`}]})))()}init_barrierefreiheit();export{ContrastRow,l as contrastAccent,u as contrastDark,c as contrastTextLight,MDXContent as default,withCode};