import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n,s as r}from"./blocks-CgfgLRYg.js";import{s as i}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i as a,r as o}from"./react-C77DJ2jK.js";import{n as s,t as c}from"./icons-El4mOoid.js";function _createMdxContent(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...a(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n,{title:`Grundlagen/Icons`,name:`Übersicht`}),`
`,(0,l.jsx)(t.h1,{id:`icons`,children:`Icons`}),`
`,(0,l.jsxs)(t.p,{children:[`Zwei Quellen, SVG inline, Farbgebung über `,(0,l.jsx)(t.code,{children:`currentColor`}),`: Die generischen UI-Icons (Pfeile,
Hinweise, Schließen, Feature-Symbole) kommen aus `,(0,l.jsx)(t.a,{href:`https://lucide.dev`,rel:`nofollow`,children:`Lucide`}),` (ISC-Lizenz),
das Paket `,(0,l.jsx)(t.code,{children:`@conciso/design-system/icons`}),` enthält nur noch die DS-eigenen Bereichs-Glyphen, für
die es kein Lucide-Pendant gibt. Die Entscheidung steht in ADR-0016.`]}),`
`,(0,l.jsxs)(t.p,{children:[`Die DS-eigenen Glyphen sind die fünf Bereichs-Glyphen (Corporate ×2, Angewandte KI, Effektive
Software, Wirksame Organisationen, durchgehend Solid mit gefüllten Multi-Path-Symbolen). Quelle der Wahrheit sind
`,(0,l.jsx)(t.code,{children:`icons/source/*.svg`}),`; der Build erzeugt daraus `,(0,l.jsx)(t.code,{children:`dist/icons/icons.json`}),` und die weiteren
Paketexporte. Jeder Schlüssel liegt in der Registry als genau eine Variante vor, die Größe wird
über `,(0,l.jsx)(t.code,{children:`width`}),`/`,(0,l.jsx)(t.code,{children:`height`}),` oder CSS gesetzt, die `,(0,l.jsx)(t.code,{children:`viewBox`}),` bleibt dabei erhalten. Welche Glyphen die
Registry enthält: siehe Galerie unten.`]}),`
`,(0,l.jsx)(t.h2,{id:`ui-icons-aus-lucide`,children:`UI-Icons aus Lucide`}),`
`,(0,l.jsx)(t.p,{children:`Lucide zeichnet im Outline-Stil auf einem 24-px-Raster mit runden Enden. Lucide-Icons werden
nie ins DS-Paket kopiert, sondern direkt aus dem Lucide-Paket bezogen.`}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsxs)(t.strong,{children:[`CSS und HTML (`,(0,l.jsx)(t.code,{children:`lucide-static`}),`).`]}),` `,(0,l.jsx)(t.code,{children:`npm install lucide-static`}),`, dann die gewünschte SVG-Datei
aus `,(0,l.jsx)(t.code,{children:`lucide-static/icons/<name>.svg`}),` inline einbetten (kein `,(0,l.jsx)(t.code,{children:`<img>`}),`, damit die Farbe über CSS
steuerbar bleibt). Die Datei bringt `,(0,l.jsx)(t.code,{children:`fill="none"`}),`, `,(0,l.jsx)(t.code,{children:`stroke="currentColor"`}),`, runde Enden und
Ecken sowie `,(0,l.jsx)(t.code,{children:`stroke-width="2"`}),` mit. Die Strichstärke wird auf den DS-Token der Größe gesetzt,
sonst wirkt das Icon neben der DS-Typografie zu schwer:`]}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-html`,children:`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="m6 9 6 6 6-6"/>
</svg>
`})}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-css`,children:`.mein-icon { stroke-width: var(--icon-stroke-md); }
`})}),`
`,(0,l.jsxs)(t.p,{children:[`Ein CSS-`,(0,l.jsx)(t.code,{children:`stroke-width`}),` schlägt das gleichnamige Attribut. Die Tokens `,(0,l.jsx)(t.code,{children:`--icon-stroke-micro`}),` bis
`,(0,l.jsx)(t.code,{children:`--icon-stroke-xl`}),` stehen im Abschnitt „Größen & Stroke-Width“. Für Chrome-Icons (Navigation,
Select, Combobox, Theme-Switch) gilt 1,5 (`,(0,l.jsx)(t.code,{children:`--icon-stroke-md`}),`).`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsxs)(t.strong,{children:[`Angular (`,(0,l.jsx)(t.code,{children:`@lucide/angular`}),`).`]}),` `,(0,l.jsx)(t.code,{children:`npm install @lucide/angular`}),` (Peer Angular ≥ 17). Jedes Icon
ist eine eigene Standalone-Komponente mit Attributselektor am `,(0,l.jsx)(t.code,{children:`<svg>`}),`, nur importierte Icons
landen im Bundle:`]}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-ts`,children:`import { LucideChevronDown } from '@lucide/angular';

@Component({
  imports: [LucideChevronDown],
  template: \`<svg lucideChevronDown [size]="24" [strokeWidth]="1.5" aria-hidden="true"></svg>\`,
})
export class Beispiel {}
`})}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.code,{children:`@lucide/angular`}),` schreibt `,(0,l.jsx)(t.code,{children:`strokeWidth`}),` als Attribut, das Default ist 2, deshalb den Wert
explizit setzen. Die DS-Komponenten registrieren ihre Icons zentral in `,(0,l.jsx)(t.code,{children:`cds-icons.ts`}),`.`]}),`
`,(0,l.jsxs)(t.h2,{id:`migration-von-den-bisherigen-ui--icons`,children:[`Migration von den bisherigen `,(0,l.jsx)(t.code,{children:`ui-*`}),`-Icons`]}),`
`,(0,l.jsxs)(t.p,{children:[`Alle `,(0,l.jsx)(t.code,{children:`ui-*`}),`-Schlüssel sind aus `,(0,l.jsx)(t.code,{children:`@conciso/design-system/icons`}),` und `,(0,l.jsx)(t.code,{children:`icons.json`}),` entfallen. Wer einen davon importiert hat,
nimmt das Lucide-Icon mit dem Namen aus der Tabelle (Angular: PascalCase mit Präfix, also
`,(0,l.jsx)(t.code,{children:`chevron-down`}),` → `,(0,l.jsx)(t.code,{children:`LucideChevronDown`}),`).`]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Bisheriger Schlüssel`}),(0,l.jsx)(t.th,{children:`Lucide-Name`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-chevron-down`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`chevron-down`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-chevron-up-down`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`chevrons-up-down`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-check`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`check`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-caret-down`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`chevron-down`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-quote`})}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`quote`}),` (gefüllt: `,(0,l.jsx)(t.code,{children:`fill="currentColor"`}),`, Strichstärke 1,5; über die Zitat-Klassen auf 60 % skaliert)`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-check-circle`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`circle-check`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-exclamation-circle`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`circle-alert`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-information-circle`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`info`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-magnifying-glass`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`search`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-x-mark`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`x`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-bars-3`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`menu`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-lock-closed`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`lock`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-calendar-days`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`calendar`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`ui-user-group`}),`, `,(0,l.jsx)(t.code,{children:`ui-users`})]}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`users`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-shield-check`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`shield-check`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-cog-6tooth`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`settings`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-arrow-path`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`refresh-cw`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-arrow-down-tray`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`download`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-document-text`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`file-text`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-squares-2x2`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`layout-grid`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`ui-sparkles-4`})}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`sparkles`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`ui-pause`}),`, `,(0,l.jsx)(t.code,{children:`ui-play`})]}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`pause`}),`, `,(0,l.jsx)(t.code,{children:`play`})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`ui-newspaper`}),`, `,(0,l.jsx)(t.code,{children:`ui-megaphone`}),`, `,(0,l.jsx)(t.code,{children:`ui-star`}),`, `,(0,l.jsx)(t.code,{children:`ui-heart`}),`, `,(0,l.jsx)(t.code,{children:`ui-sun`}),`, `,(0,l.jsx)(t.code,{children:`ui-link`}),`, `,(0,l.jsx)(t.code,{children:`ui-map-pin`})]}),(0,l.jsxs)(t.td,{children:[`gleicher Name ohne `,(0,l.jsx)(t.code,{children:`ui-`})]})]})]})]}),`
`,(0,l.jsxs)(t.p,{children:[`Um das bisherige Gewicht zu halten, setzt der Topnav-Caret `,(0,l.jsx)(t.code,{children:`chevron-down`}),` mit Größe 10,
Strichstärke 1,5 und `,(0,l.jsx)(t.code,{children:`absoluteStrokeWidth`}),` (1,5 px auf dem Bildschirm), der Haken im Select
`,(0,l.jsx)(t.code,{children:`check`}),` mit Größe 20 und Strichstärke 3,2 (≈ 2,67 px).`]}),`
`,(0,l.jsx)(t.p,{children:`Die Optik ändert sich leicht: Lucide hat runde Enden und andere Proportionen als die bisherigen
Heroicons-Pfade. Bei Icons mit festem Platz (Buttons, Felder) das Ergebnis prüfen.`}),`
`,(0,l.jsx)(t.h2,{id:`größen--stroke-width`,children:`Größen & Stroke-Width`}),`
`,(0,l.jsxs)(t.p,{children:[`Für Outline-Icons (Lucide und DS-Glyphen) skaliert die Stroke-Width mit der Icon-Größe, damit die visuelle
Gewichtung konsistent bleibt: Micro-Icons brauchen feine Linien, XLarge-Icons vertragen
kräftigere Konturen. Die Werte stehen als CSS Custom Properties (`,(0,l.jsx)(t.code,{children:`--icon-stroke-micro`}),` bis
`,(0,l.jsx)(t.code,{children:`--icon-stroke-xl`}),`) in `,(0,l.jsx)(t.code,{children:`css/tokens.css`}),`.`]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Größe`}),(0,l.jsx)(t.th,{children:`Bezeichnung`}),(0,l.jsx)(t.th,{children:`Stroke-Width`}),(0,l.jsx)(t.th,{children:`Verwendung`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`16 × 16`}),(0,l.jsx)(t.td,{children:`Micro`}),(0,l.jsx)(t.td,{children:`1 px`}),(0,l.jsx)(t.td,{children:`Inline-Icons in Text, Tabellenzeilen, kleine UI-Elemente`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`24 × 24`}),(0,l.jsx)(t.td,{children:`Small`}),(0,l.jsx)(t.td,{children:`1,25 px`}),(0,l.jsx)(t.td,{children:`Standard-UI, Navigation, Buttons, Formulare`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`32 × 32`}),(0,l.jsx)(t.td,{children:`Medium`}),(0,l.jsx)(t.td,{children:`1,5 px`}),(0,l.jsx)(t.td,{children:`Karten, Listen, Sidebar-Einträge`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`48 × 48`}),(0,l.jsx)(t.td,{children:`Large`}),(0,l.jsx)(t.td,{children:`2 px`}),(0,l.jsx)(t.td,{children:`Feature-Bereiche, Onboarding, Erklär-Abschnitte`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`64 × 64`}),(0,l.jsx)(t.td,{children:`XLarge`}),(0,l.jsx)(t.td,{children:`2,5 px`}),(0,l.jsx)(t.td,{children:`Leere Zustände, Illustrationen, Hero-Bereiche`})]})]})]}),`
`,(0,l.jsx)(t.h2,{id:`die-vier-bereichs-glyph-familien-ds-eigen`,children:`Die vier Bereichs-Glyph-Familien (DS-eigen)`}),`
`,(0,l.jsxs)(t.p,{children:[`Jede Bereichs-Glyphe ist ein SVG mit `,(0,l.jsx)(t.code,{children:`fill="currentColor"`}),`, die Farbe ist nicht
eingebrannt, sondern wird vom Consumer über die CSS-Eigenschaft `,(0,l.jsx)(t.code,{children:`color`}),` auf dem
Wrapper-Element gesetzt.`]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Bereich`}),(0,l.jsx)(t.th,{children:`Hintergrund`}),(0,l.jsx)(t.th,{children:(0,l.jsx)(t.code,{children:`color`})})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Corporate`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--co-50`}),` (#E0F7F7)`]}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--tx-brand`}),` (#333E48)`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Angewandte KI`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--ki-50`}),` (#F4FCD5)`]}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--ki-800`}),` (#475705)`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Effektive Software`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--es-50`}),` (#EAF0FB)`]}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--es-700`}),` (#1B3D9A)`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Wirksame Organisationen`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--wo-50`}),` (#EBF5E6)`]}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--wo-800`}),` (#183A0E)`]})]})]})]}),`
`,(0,l.jsxs)(t.p,{children:[`Sonderfall Logo-Zeichen: Das C-Zeichen ist die Bereichsmarke von Corporate und
ausschließlich in Kombination mit dem Conciso-Logo zu verwenden. Für reguläre
Bereichs-Icons im Thema Unternehmen gilt wie bei den anderen Bereichen: Hintergrundfarbe
`,(0,l.jsx)(t.code,{children:`--co-50`}),`, `,(0,l.jsx)(t.code,{children:`color: var(--co-800)`}),`.`]}),`
`,(0,l.jsx)(t.h2,{id:`galerie`,children:`Galerie`}),`
`,`
`,`
`,`
`,`
`,(0,l.jsxs)(t.p,{children:[`Alle DS-eigenen Glyphen aus der Registry (`,(0,l.jsx)(t.code,{children:`@conciso/design-system/icons.json`}),`), live gerendert.
Lucide-Icons stehen hier nicht, sie gehören nicht ins Paket (siehe oben, Galerie unter
`,(0,l.jsx)(t.a,{href:`https://lucide.dev/icons`,rel:`nofollow`,children:`lucide.dev/icons`}),`). Unter jeder Kachel steht der Schlüssel, den ein
Entwickler tatsächlich importiert; der Name aus der Registry liegt als Tooltip (`,(0,l.jsx)(t.code,{children:`title`}),`-Attribut)
auf der Kachel.`]}),`
`,(0,l.jsx)(t.h3,{id:`bereichs-glyphen`,children:`Bereichs-Glyphen`}),`
`,(0,l.jsxs)(t.p,{children:[`Die fünf Bereichs-Glyphen, je in ihrer Bereichsfarbe (Hintergrund `,(0,l.jsx)(t.code,{children:`--XX-50`}),`, `,(0,l.jsx)(t.code,{children:`color`}),` aus
der Tabelle oben; `,(0,l.jsx)(t.code,{children:`currentColor`}),` im SVG übernimmt diese Farbe).`]}),`
`,(0,l.jsx)(r,{children:(0,l.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--s6)`},children:f.map(([e,t])=>(0,l.jsx)(IconTile,{iconKey:e,icon:t,background:d[t.area],color:u[t.area]},e))})}),`
`,(0,l.jsx)(t.h2,{id:`verwendungsregeln`,children:`Verwendungsregeln`}),`
`,(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:`Technische Regeln`})}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Eigenschaft`}),(0,l.jsx)(t.th,{children:`Regel`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Quelle`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.a,{href:`https://lucide.dev`,rel:`nofollow`,children:`lucide.dev`}),` (ISC). Keine eigenen Icons zeichnen, ausgenommen die DS-Glyphen ohne Lucide-Pendant.`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Format`}),(0,l.jsxs)(t.td,{children:[`SVG inline, kein `,(0,l.jsx)(t.code,{children:`<img>`}),`, damit Farbe über CSS steuerbar bleibt`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Größen`}),(0,l.jsx)(t.td,{children:`Ausschließlich 16, 24, 32, 48, 64 px, keine Zwischenwerte`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Stroke-Width`}),(0,l.jsx)(t.td,{children:`Outline-Icons: 1, 1,25, 1,5, 2, 2,5 px, passend zur Größe; nie den Lucide-Default 2 stehen lassen, wenn die Größe etwas anderes vorsieht`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Hintergrund-Rect`}),(0,l.jsx)(t.td,{children:`Im Code entfernen, Hintergrundfarbe kommt vom Parent-Element`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Barrierefreiheit`}),(0,l.jsxs)(t.td,{children:[`Dekorativ: `,(0,l.jsx)(t.code,{children:`aria-hidden="true"`}),`, bedeutungstragend: `,(0,l.jsx)(t.code,{children:`role="img"`}),` + `,(0,l.jsx)(t.code,{children:`aria-label`})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`viewBox`}),(0,l.jsxs)(t.td,{children:[`Bleibt bei jeder Darstellungsgröße unverändert (ein Wert pro Glyph in der Registry); Größe über `,(0,l.jsx)(t.code,{children:`width`}),`/`,(0,l.jsx)(t.code,{children:`height`}),` oder CSS setzen`]})]})]})]}),`
`,(0,l.jsx)(t.h2,{id:`wie-ein-icon-entsteht-contributing--10-schritt-3`,children:`Wie ein Icon entsteht (CONTRIBUTING § 10 Schritt 3)`}),`
`,(0,l.jsxs)(t.p,{children:[`Gilt nur für DS-eigene Glyphen. Bevor ein neues Icon entsteht, prüfen, ob Lucide es hat
(lucide.dev/icons): Dann kein Eintrag in `,(0,l.jsx)(t.code,{children:`icons/source`}),`, sondern Lucide nutzen.`]}),`
`,(0,l.jsxs)(t.ol,{children:[`
`,(0,l.jsxs)(t.li,{children:[`Normalisiertes SVG unter `,(0,l.jsx)(t.code,{children:`icons/source/{area}-{name}.svg`}),` ablegen. Farben als
`,(0,l.jsx)(t.code,{children:`currentColor`}),`, Outline-Icons mit inline `,(0,l.jsx)(t.code,{children:`stroke-width`}),`, `,(0,l.jsx)(t.code,{children:`width`}),`/`,(0,l.jsx)(t.code,{children:`height`}),` weglassen (die
Größe setzt der Consumer). Key-Präfix `,(0,l.jsx)(t.code,{children:`co|ki|es|wo`}),` für Bereichs-Glyphen.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`npm run build:icons`}),` ausführen. Das Skript generiert `,(0,l.jsx)(t.code,{children:`dist/icons/icons.json`}),`,
`,(0,l.jsx)(t.code,{children:`dist/icons/icons.js`}),`, `,(0,l.jsx)(t.code,{children:`dist/icons/icons.d.ts`}),` und `,(0,l.jsx)(t.code,{children:`dist/icons/README.md`}),` aus
`,(0,l.jsx)(t.code,{children:`icons/source/`}),`.`]}),`
`,(0,l.jsxs)(t.li,{children:[`Label und Verwendung optional in `,(0,l.jsx)(t.code,{children:`icons/manifest.json`}),` pflegen.`]}),`
`]}),`
`,(0,l.jsxs)(t.p,{children:[`Quelle ist ausschließlich `,(0,l.jsx)(t.code,{children:`icons/source/*.svg`}),`, die generierten Dateien unter
`,(0,l.jsx)(t.code,{children:`dist/icons/`}),` werden nie von Hand editiert oder committet.`]}),`
`,(0,l.jsx)(t.h2,{id:`ds-glyphen`,children:`DS-Glyphen`}),`
`,(0,l.jsxs)(t.p,{children:[`DS-Glyphen sind die Design-System-eigenen Icons: die Bereichs-Glyphen `,(0,l.jsx)(t.code,{children:`co-*`}),`, `,(0,l.jsx)(t.code,{children:`ki-*`}),`, `,(0,l.jsx)(t.code,{children:`es-*`}),`,
`,(0,l.jsx)(t.code,{children:`wo-*`}),`. Sie stammen aus
`,(0,l.jsx)(t.code,{children:`@conciso/design-system/icons`}),` (generiertes `,(0,l.jsx)(t.code,{children:`dist/icons/icons.js`}),`), alle übrigen UI-Icons aus
Lucide. Die zentrale Icon-Registry `,(0,l.jsx)(t.code,{children:`icons/cds-icons.ts`}),` in der Angular-Lib ist die einzige
Import-Fläche für Komponenten-Icons: Komponenten importieren nie direkt aus `,(0,l.jsx)(t.code,{children:`@lucide/angular`}),`.
Ein Lucide-Icon wird nur dort registriert, wo das Design System kein eigenes Glyph definiert;
bekommt es später ein DS-Pendant, wird ausschließlich `,(0,l.jsx)(t.code,{children:`cds-icons.ts`}),` umgestellt.`]}),`
`,(0,l.jsx)(t.h2,{id:`dos--donts`,children:`Dos & Don'ts`}),`
`,(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:`Tun`})}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[`Größe über `,(0,l.jsx)(t.code,{children:`width`}),`/`,(0,l.jsx)(t.code,{children:`height`}),` oder CSS setzen, die `,(0,l.jsx)(t.code,{children:`viewBox`}),` bleibt dabei unverändert`]}),`
`,(0,l.jsxs)(t.li,{children:[`Das Hintergrund-`,(0,l.jsx)(t.code,{children:`<rect>`}),` vor dem Einbinden entfernen, es dient nur der Designvorschau`]}),`
`,(0,l.jsx)(t.li,{children:`Bereichsfarbe für Hintergrund und Pfad einhalten, Konsistenz über alle Brand Areas`}),`
`,(0,l.jsxs)(t.li,{children:[`Dekorative Icons mit `,(0,l.jsx)(t.code,{children:`aria-hidden="true"`}),` ausblenden, Screenreader überspringen sie`]}),`
`,(0,l.jsxs)(t.li,{children:[`Lucide-Icons mit der Strichstärke aus den `,(0,l.jsx)(t.code,{children:`--icon-stroke-*`}),`-Tokens zeichnen, nicht mit dem Default 2`]}),`
`]}),`
`,(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:`Nicht tun`})}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`Icons zwischen Bereichen tauschen, jedes Icon gehört zu genau einer Brand Area`}),`
`,(0,l.jsx)(t.li,{children:`Nicht-standardisierte Größen verwenden (zum Beispiel 20 px, 36 px), bricht den visuellen
Rhythmus`}),`
`,(0,l.jsxs)(t.li,{children:[`Icons als `,(0,l.jsx)(t.code,{children:`<img src>`}),` einbinden, verhindert Farbanpassung und Dark-Mode-Unterstützung`]}),`
`,(0,l.jsx)(t.li,{children:`Das Hintergrund-Rect im Code belassen, erzeugt ungewollte farbige Fläche im Layout`}),`
`,(0,l.jsxs)(t.li,{children:[`Lucide-SVGs ins DS-Paket oder in `,(0,l.jsx)(t.code,{children:`icons/source`}),` kopieren, sie kommen aus `,(0,l.jsx)(t.code,{children:`lucide-static`}),` bzw. `,(0,l.jsx)(t.code,{children:`@lucide/angular`})]}),`
`]}),`
`,(0,l.jsx)(t.h2,{id:`siehe-auch`,children:`Siehe auch`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`CONTRIBUTING.md § 10 Schritt 3`}),`
`,(0,l.jsx)(t.li,{children:`CONTEXT.md, Abschnitt DS-Glyphen`}),`
`,(0,l.jsxs)(t.li,{children:[`ADR-0016 (`,(0,l.jsx)(t.code,{children:`docs/adr/0016-icon-quelle-lucide.md`}),`)`]}),`
`,(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:`https://lucide.dev`,rel:`nofollow`,children:`lucide.dev`})}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`dist/icons/README.md`}),` im gebauten npm-Paket`]}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var l,u,d,f,IconTile;function init_icons(){return(init_icons=e((()=>{l=i(),o(),t(),s(),u={co:`var(--tx-brand)`,ki:`var(--ki-800)`,es:`var(--es-700)`,wo:`var(--wo-800)`},d={co:`var(--co-50)`,ki:`var(--ki-50)`,es:`var(--es-50)`,wo:`var(--wo-50)`},f=Object.entries(c).filter(([,e])=>e.area!==`ui`),IconTile=({iconKey:e,icon:t,background:n,color:r,border:i})=>{let[a,o]=t.viewBox.split(` `).slice(2).map(Number),s=t.style===`solid`?{fill:`currentColor`}:{fill:`none`,stroke:`currentColor`,strokeWidth:t.strokeWidth||`1`};return(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`var(--s2)`},children:[(0,l.jsx)(`div`,{className:`icon-size-swatch`,"data-area":t.area,title:t.name,style:{background:n,color:r,border:i,borderRadius:`var(--r-md)`,width:56,height:56,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,l.jsx)(`svg`,{viewBox:t.viewBox,width:a,height:o,"aria-hidden":`true`,...s,dangerouslySetInnerHTML:{__html:t.body}})}),(0,l.jsx)(`span`,{className:`lbl`,children:e})]})}})))()}init_icons();export{d as AREA_BG,u as AREA_COLOR,IconTile,f as areaIcons,MDXContent as default};