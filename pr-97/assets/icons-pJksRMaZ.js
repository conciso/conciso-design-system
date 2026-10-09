import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{s as t}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i as n,r}from"./react-C77DJ2jK.js";import{c as i,o as a,s as o}from"./blocks-MIQYy-EB.js";import{n as s,t as c}from"./icons-BJYQD7C2.js";function _createMdxContent(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a,{title:`Grundlagen/Icons`,name:`Übersicht`}),`
`,(0,l.jsx)(t.h1,{id:`icons`,children:`Icons`}),`
`,(0,l.jsxs)(t.p,{children:[`Bereichsspezifische Icons, SVG inline, Farbgebung über die jeweilige Brand Area via
`,(0,l.jsx)(t.code,{children:`currentColor`}),`. Quelle der Wahrheit sind `,(0,l.jsx)(t.code,{children:`icons/source/*.svg`}),`; der Build erzeugt daraus
`,(0,l.jsx)(t.code,{children:`dist/icons/icons.json`}),` und die weiteren Paketexporte.`]}),`
`,(0,l.jsxs)(t.p,{children:[`Zwei Stile koexistieren: Der Großteil der generischen UI-Icons (Pfeile, Hinweise,
Schließen, Feature-Symbole) ist im Outline-Stil aus `,(0,l.jsx)(t.a,{href:`https://heroicons.com`,rel:`nofollow`,children:`heroicons.com`}),`
(MIT-Lizenz), ein kleinerer Teil (zum Beispiel Play/Pause, Download) ist Solid. Die fünf
Bereichs-Glyphen (Corporate ×2, Angewandte KI, Effektive Software, Wirksame
Organisationen) sind durchgehend Solid (gefüllte Multi-Path-Symbole). Jeder Schlüssel
liegt in der Registry als genau eine Variante vor, die Größe wird über `,(0,l.jsx)(t.code,{children:`width`}),`/`,(0,l.jsx)(t.code,{children:`height`}),`
oder CSS gesetzt, die `,(0,l.jsx)(t.code,{children:`viewBox`}),` bleibt dabei erhalten. Alle 99 Icons: siehe Galerie unten.`]}),`
`,(0,l.jsx)(t.h2,{id:`größen--stroke-width`,children:`Größen & Stroke-Width`}),`
`,(0,l.jsxs)(t.p,{children:[`Für Outline-Icons skaliert die Stroke-Width mit der Icon-Größe, damit die visuelle
Gewichtung konsistent bleibt: Micro-Icons brauchen feine Linien, XLarge-Icons vertragen
kräftigere Konturen. Die Werte stehen als CSS Custom Properties (`,(0,l.jsx)(t.code,{children:`--icon-stroke-micro`}),` bis
`,(0,l.jsx)(t.code,{children:`--icon-stroke-xl`}),`) in `,(0,l.jsx)(t.code,{children:`css/tokens.css`}),`.`]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Größe`}),(0,l.jsx)(t.th,{children:`Bezeichnung`}),(0,l.jsx)(t.th,{children:`Stroke-Width`}),(0,l.jsx)(t.th,{children:`Verwendung`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`16 × 16`}),(0,l.jsx)(t.td,{children:`Micro`}),(0,l.jsx)(t.td,{children:`1 px`}),(0,l.jsx)(t.td,{children:`Inline-Icons in Text, Tabellenzeilen, kleine UI-Elemente`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`24 × 24`}),(0,l.jsx)(t.td,{children:`Small`}),(0,l.jsx)(t.td,{children:`1,25 px`}),(0,l.jsx)(t.td,{children:`Standard-UI, Navigation, Buttons, Formulare`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`32 × 32`}),(0,l.jsx)(t.td,{children:`Medium`}),(0,l.jsx)(t.td,{children:`1,5 px`}),(0,l.jsx)(t.td,{children:`Karten, Listen, Sidebar-Einträge`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`48 × 48`}),(0,l.jsx)(t.td,{children:`Large`}),(0,l.jsx)(t.td,{children:`2 px`}),(0,l.jsx)(t.td,{children:`Feature-Bereiche, Onboarding, Erklär-Abschnitte`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`64 × 64`}),(0,l.jsx)(t.td,{children:`XLarge`}),(0,l.jsx)(t.td,{children:`2,5 px`}),(0,l.jsx)(t.td,{children:`Leere Zustände, Illustrationen, Hero-Bereiche`})]})]})]}),`
`,(0,l.jsx)(t.h2,{id:`die-vier-bereichs-glyph-familien`,children:`Die vier Bereichs-Glyph-Familien`}),`
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
`,(0,l.jsxs)(t.p,{children:[`Alle 99 Icons aus der Registry (`,(0,l.jsx)(t.code,{children:`@conciso/design-system/icons.json`}),`), live gerendert. Unter jeder Kachel
steht der Schlüssel, den ein Entwickler tatsächlich importiert; der Name aus der Registry
liegt als Tooltip (`,(0,l.jsx)(t.code,{children:`title`}),`-Attribut) auf der Kachel.`]}),`
`,(0,l.jsx)(t.h3,{id:`bereichs-glyphen`,children:`Bereichs-Glyphen`}),`
`,(0,l.jsxs)(t.p,{children:[`Die fünf Bereichs-Glyphen, je in ihrer Bereichsfarbe (Hintergrund `,(0,l.jsx)(t.code,{children:`--XX-50`}),`, `,(0,l.jsx)(t.code,{children:`color`}),` aus
der Tabelle oben; `,(0,l.jsx)(t.code,{children:`currentColor`}),` im SVG übernimmt diese Farbe).`]}),`
`,(0,l.jsx)(o,{children:(0,l.jsx)(`div`,{style:{display:`flex`,flexWrap:`wrap`,gap:`var(--s6)`},children:f.map(([e,t])=>(0,l.jsx)(IconTile,{iconKey:e,icon:t,background:d[t.area],color:u[t.area]},e))})}),`
`,(0,l.jsx)(t.h3,{id:`ui-icons`,children:`UI-Icons`}),`
`,(0,l.jsxs)(t.p,{children:[`Die 94 bereichsneutralen UI-Icons auf neutraler Fläche, Farbe `,(0,l.jsx)(t.code,{children:`--tx-primary`}),`.`]}),`
`,(0,l.jsx)(o,{children:(0,l.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(88px, 1fr))`,gap:`var(--s5)`},children:p.map(([e,t])=>(0,l.jsx)(IconTile,{iconKey:e,icon:t,background:`var(--bg-surface)`,color:`var(--tx-primary)`,border:`var(--bd-strong)`},e))})}),`
`,(0,l.jsx)(t.h2,{id:`verwendungsregeln`,children:`Verwendungsregeln`}),`
`,(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:`Technische Regeln`})}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Eigenschaft`}),(0,l.jsx)(t.th,{children:`Regel`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Quelle`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.a,{href:`https://heroicons.com`,rel:`nofollow`,children:`heroicons.com`}),`, Stil Outline. Keine eigenen Icons zeichnen.`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Format`}),(0,l.jsxs)(t.td,{children:[`SVG inline, kein `,(0,l.jsx)(t.code,{children:`<img>`}),`, damit Farbe über CSS steuerbar bleibt`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Größen`}),(0,l.jsx)(t.td,{children:`Ausschließlich 16, 24, 32, 48, 64 px, keine Zwischenwerte`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Stroke-Width`}),(0,l.jsx)(t.td,{children:`Outline-Icons: 1, 1,25, 1,5, 2, 2,5 px, passend zur Größe`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Hintergrund-Rect`}),(0,l.jsx)(t.td,{children:`Im Code entfernen, Hintergrundfarbe kommt vom Parent-Element`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Barrierefreiheit`}),(0,l.jsxs)(t.td,{children:[`Dekorativ: `,(0,l.jsx)(t.code,{children:`aria-hidden="true"`}),`, bedeutungstragend: `,(0,l.jsx)(t.code,{children:`role="img"`}),` + `,(0,l.jsx)(t.code,{children:`aria-label`})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`viewBox`}),(0,l.jsxs)(t.td,{children:[`Bleibt bei jeder Darstellungsgröße unverändert (ein Wert pro Glyph in der Registry); Größe über `,(0,l.jsx)(t.code,{children:`width`}),`/`,(0,l.jsx)(t.code,{children:`height`}),` oder CSS setzen`]})]})]})]}),`
`,(0,l.jsx)(t.h2,{id:`wie-ein-icon-entsteht-contributing--10-schritt-3`,children:`Wie ein Icon entsteht (CONTRIBUTING § 10 Schritt 3)`}),`
`,(0,l.jsxs)(t.ol,{children:[`
`,(0,l.jsxs)(t.li,{children:[`Normalisiertes SVG unter `,(0,l.jsx)(t.code,{children:`icons/source/{area|ui}-{name}.svg`}),` ablegen. Farben als
`,(0,l.jsx)(t.code,{children:`currentColor`}),`, Outline-Icons mit inline `,(0,l.jsx)(t.code,{children:`stroke-width`}),`, `,(0,l.jsx)(t.code,{children:`width`}),`/`,(0,l.jsx)(t.code,{children:`height`}),` weglassen (die
Größe setzt der Consumer). Key-Präfix `,(0,l.jsx)(t.code,{children:`co|ki|es|wo`}),` für Bereichs-Glyphen, sonst `,(0,l.jsx)(t.code,{children:`ui`}),`.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`npm run build:icons`}),` ausführen. Das Skript generiert `,(0,l.jsx)(t.code,{children:`dist/icons/icons.json`}),`,
`,(0,l.jsx)(t.code,{children:`dist/icons/icons.js`}),`, `,(0,l.jsx)(t.code,{children:`dist/icons/icons.d.ts`}),` und `,(0,l.jsx)(t.code,{children:`dist/icons/README.md`}),` aus
`,(0,l.jsx)(t.code,{children:`icons/source/`}),`.`]}),`
`,(0,l.jsxs)(t.li,{children:[`Label und Verwendung optional in `,(0,l.jsx)(t.code,{children:`icons/manifest.json`}),` pflegen.`]}),`
`]}),`
`,(0,l.jsxs)(t.p,{children:[`Quelle ist ausschließlich `,(0,l.jsx)(t.code,{children:`icons/source/*.svg`}),`, die generierten Dateien unter
`,(0,l.jsx)(t.code,{children:`dist/icons/`}),` werden nie von Hand editiert oder committet.`]}),`
`,(0,l.jsx)(t.h2,{id:`ds-glyphen`,children:`DS-Glyphen`}),`
`,(0,l.jsxs)(t.p,{children:[`DS-Glyphen sind Design-System-eigene Icons (`,(0,l.jsx)(t.code,{children:`ui*`}),`), die aus `,(0,l.jsx)(t.code,{children:`@conciso/design-system/icons`}),`
(generiertes `,(0,l.jsx)(t.code,{children:`dist/icons/icons.js`}),`, importiert über `,(0,l.jsx)(t.code,{children:`@conciso/design-system/icons`}),`) stammen,
nicht aus `,(0,l.jsx)(t.code,{children:`@ng-icons`}),`. Die zentrale Icon-Registry
`,(0,l.jsx)(t.code,{children:`icons/cds-icons.ts`}),` in der Angular-Lib ist die einzige Import-Fläche für
Komponenten-Icons: Komponenten importieren nie direkt aus `,(0,l.jsx)(t.code,{children:`@ng-icons/heroicons`}),`. Ein
Heroicon wird nur dort registriert, wo das Design System (noch) kein eigenes Glyph
definiert; bekommt es später ein DS-Pendant, wird ausschließlich `,(0,l.jsx)(t.code,{children:`cds-icons.ts`}),`
umgestellt.`]}),`
`,(0,l.jsx)(t.h2,{id:`dos--donts`,children:`Dos & Don'ts`}),`
`,(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:`Tun`})}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[`Größe über `,(0,l.jsx)(t.code,{children:`width`}),`/`,(0,l.jsx)(t.code,{children:`height`}),` oder CSS setzen, die `,(0,l.jsx)(t.code,{children:`viewBox`}),` bleibt dabei unverändert`]}),`
`,(0,l.jsxs)(t.li,{children:[`Das Hintergrund-`,(0,l.jsx)(t.code,{children:`<rect>`}),` vor dem Einbinden entfernen, es dient nur der Designvorschau`]}),`
`,(0,l.jsx)(t.li,{children:`Bereichsfarbe für Hintergrund und Pfad einhalten, Konsistenz über alle Brand Areas`}),`
`,(0,l.jsxs)(t.li,{children:[`Dekorative Icons mit `,(0,l.jsx)(t.code,{children:`aria-hidden="true"`}),` ausblenden, Screenreader überspringen sie`]}),`
`]}),`
`,(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:`Nicht tun`})}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`Icons zwischen Bereichen tauschen, jedes Icon gehört zu genau einer Brand Area`}),`
`,(0,l.jsx)(t.li,{children:`Nicht-standardisierte Größen verwenden (zum Beispiel 20 px, 36 px), bricht den visuellen
Rhythmus`}),`
`,(0,l.jsxs)(t.li,{children:[`Icons als `,(0,l.jsx)(t.code,{children:`<img src>`}),` einbinden, verhindert Farbanpassung und Dark-Mode-Unterstützung`]}),`
`,(0,l.jsx)(t.li,{children:`Das Hintergrund-Rect im Code belassen, erzeugt ungewollte farbige Fläche im Layout`}),`
`]}),`
`,(0,l.jsx)(t.h2,{id:`siehe-auch`,children:`Siehe auch`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`CONTRIBUTING.md § 10 Schritt 3`}),`
`,(0,l.jsx)(t.li,{children:`CONTEXT.md, Abschnitt DS-Glyphen`}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`dist/icons/README.md`}),` im gebauten npm-Paket`]}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var l,u,d,f,p,IconTile;function init_icons(){return(init_icons=e((()=>{l=t(),r(),i(),s(),u={co:`var(--tx-brand)`,ki:`var(--ki-800)`,es:`var(--es-700)`,wo:`var(--wo-800)`},d={co:`var(--co-50)`,ki:`var(--ki-50)`,es:`var(--es-50)`,wo:`var(--wo-50)`},f=Object.entries(c).filter(([,e])=>e.area!==`ui`),p=Object.entries(c).filter(([,e])=>e.area===`ui`),IconTile=({iconKey:e,icon:t,background:n,color:r,border:i})=>{let[a,o]=t.viewBox.split(` `).slice(2).map(Number),s=t.style===`solid`?{fill:`currentColor`}:{fill:`none`,stroke:`currentColor`,strokeWidth:t.strokeWidth||`1`};return(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:`var(--s2)`},children:[(0,l.jsx)(`div`,{className:`icon-size-swatch`,"data-area":t.area,title:t.name,style:{background:n,color:r,border:i,borderRadius:`var(--r-md)`,width:56,height:56,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,l.jsx)(`svg`,{viewBox:t.viewBox,width:a,height:o,"aria-hidden":`true`,...s,dangerouslySetInnerHTML:{__html:t.body}})}),(0,l.jsx)(`span`,{className:`lbl`,children:e})]})}})))()}init_icons();export{d as AREA_BG,u as AREA_COLOR,IconTile,f as areaIcons,MDXContent as default,p as uiIcons};