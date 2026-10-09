import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{s as t}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i as n,r}from"./react-C77DJ2jK.js";import{c as i,o as a,s as o}from"./blocks-MIQYy-EB.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(a,{title:`Grundlagen/Elevation`,name:`Übersicht`}),`
`,(0,s.jsx)(t.h1,{id:`elevation`,children:`Elevation`}),`
`,(0,s.jsx)(t.p,{children:`6 Ebenen, Shadow + Tonal Overlay (Primärfarbe auf Oberfläche).`}),`
`,(0,s.jsx)(t.h2,{id:`elevation--interaktivität-contributing--4`,children:`Elevation = Interaktivität (CONTRIBUTING § 4)`}),`
`,(0,s.jsxs)(t.p,{children:[`Statische Cards und Flächen ruhen flach mit Rahmen (`,(0,s.jsx)(t.code,{children:`--e0`}),` + `,(0,s.jsx)(t.code,{children:`--bd-strong`}),`). Interaktive
Elemente (Links, klickbare Cards `,(0,s.jsx)(t.code,{children:`.ep-card-link`}),`) tragen Schatten (`,(0,s.jsx)(t.code,{children:`--e1`}),`) und heben auf
Hover (`,(0,s.jsx)(t.code,{children:`--e3`}),`). Begründung: Schatten signalisiert anfassbar, statische Info-Cards mit
Schatten täuschen Interaktivität vor.`]}),`
`,(0,s.jsxs)(t.p,{children:[`Entscheidend ist die Fläche, nicht der Inhalt. Eine Karte mit Buttons oder Text-Links im
Footer ist statisch, die Buttons sind die Interaktion, die Fläche führt nirgendwohin. Sie
ruht flach. Schatten bekommt sie erst, wenn sie selbst der klickbare Bereich ist, also
`,(0,s.jsx)(t.code,{children:`<a class="card card-elevated">`}),` oder `,(0,s.jsx)(t.code,{children:`<a class="ep-card ep-card-link">`}),`.`]}),`
`,(0,s.jsxs)(t.p,{children:[`Der Riegel steht im CSS: `,(0,s.jsx)(t.code,{children:`.card-elevated`}),` ist auf `,(0,s.jsx)(t.code,{children:`a.card-elevated`}),` gescoped, eine
`,(0,s.jsx)(t.code,{children:`<article>`}),`- oder `,(0,s.jsx)(t.code,{children:`<div>`}),`-Karte kann den Schatten also auch mit gesetzter Klasse nicht
bekommen. Gleiches gilt für Inline-`,(0,s.jsx)(t.code,{children:`box-shadow`}),` auf statischen Blöcken, nicht setzen, auch
nicht mit Token.`]}),`
`,(0,s.jsx)(t.h2,{id:`shadow-elevation`,children:`Shadow Elevation`}),`
`,(0,s.jsx)(t.p,{children:`Die sechs Ebenen im direkten Vergleich, gerendert mit den Werten aus der Tabelle unten.
Level 0 bleibt flach mit Rahmen, ab Level 1 trägt jede Kachel den zugehörigen
Schatten-Token.`}),`
`,`
`,`
`,(0,s.jsx)(o,{children:(0,s.jsx)(`div`,{className:`layout-grid`,style:{padding:`var(--s6) 0`},children:c.map(e=>(0,s.jsx)(ElevationSwatch,{...e},e.swatchLabel))})}),`
`,(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:`Level`}),(0,s.jsx)(t.th,{children:`Token`}),(0,s.jsx)(t.th,{children:`Einsatz`})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`0`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--e0`})}),(0,s.jsx)(t.td,{children:`Flat, Outlined, Seiten-Hintergrund, Tabellen`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`1`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--e1`})}),(0,s.jsx)(t.td,{children:`Card, FAB, Standard-Cards, Listen-Karten`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`2`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--e2`})}),(0,s.jsx)(t.td,{children:`Chip, Hover, Dropdown-Anker`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`3`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--e3`})}),(0,s.jsx)(t.td,{children:`Nav Drawer, Side Sheet, persistente Panels`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`4`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--e4`})}),(0,s.jsx)(t.td,{children:`Modal, Sheet, Dialoge mit Scrim`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`5`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--e5`})}),(0,s.jsx)(t.td,{children:`Tooltip, Dialog, Snackbar, Autocomplete-Dropdown`})]})]})]}),`
`,(0,s.jsxs)(t.p,{children:[`Werte aus `,(0,s.jsx)(t.code,{children:`css/tokens.css`}),`:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-css`,children:`--e0: none;
--e1: 0 1px 2px rgba(0,0,0,.30), 0 1px 3px 1px rgba(0,0,0,.15);
--e2: 0 1px 2px rgba(0,0,0,.30), 0 2px 6px 2px rgba(0,0,0,.15);
--e3: 0 1px 3px rgba(0,0,0,.30), 0 4px 8px 3px rgba(0,0,0,.15);
--e4: 0 2px 3px rgba(0,0,0,.30), 0 6px 10px 4px rgba(0,0,0,.15);
--e5: 0 4px 4px rgba(0,0,0,.30), 0 8px 12px 6px rgba(0,0,0,.15);
`})}),`
`,(0,s.jsx)(t.p,{children:`Kombinationsregel: Level 1 bis 2 können Schatten oder Tonal Overlay einsetzen. Level 3 bis
5 kombinieren beide, der Schatten signalisiert Abstand zur Seite, die Tönung verstärkt die
visuelle Zugehörigkeit zur Primärfarbe.`}),`
`,(0,s.jsx)(t.h2,{id:`tonal-elevation`,children:`Tonal Elevation`}),`
`,(0,s.jsx)(t.p,{children:`Zusätzlich zur Shadow-Elevation wird eine semitransparente Schicht der Primärfarbe auf
Oberflächen gelegt. Je höher das Level, desto stärker die Tönung, Tiefe durch Farbe statt
nur Schatten.`}),`
`,(0,s.jsxs)(t.p,{children:[`Die Kachel-Reihe macht den Unterschied sichtbar: von 0 % (reine `,(0,s.jsx)(t.code,{children:`--bg-surface`}),`) bis 14 %
Tonal-Anteil auf Level 5.`]}),`
`,`
`,(0,s.jsx)(o,{children:(0,s.jsx)(`div`,{className:`layout-grid`,style:{marginBottom:`var(--s4)`},children:l.map(e=>(0,s.jsx)(ElevationSwatch,{...e},e.swatchLabel))})}),`
`,(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:`Level`}),(0,s.jsx)(t.th,{children:`Tonal-Anteil`}),(0,s.jsx)(t.th,{children:`Token`})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`0`}),(0,s.jsx)(t.td,{children:`0 %`}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:`--bg-surface`}),` (kein Tonal Overlay)`]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`1`}),(0,s.jsx)(t.td,{children:`5 %`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--tonal-1`})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`2`}),(0,s.jsx)(t.td,{children:`8 %`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--tonal-2`})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`3`}),(0,s.jsx)(t.td,{children:`11 %`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--tonal-3`})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`4`}),(0,s.jsx)(t.td,{children:`12 %`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--tonal-4`})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`5`}),(0,s.jsx)(t.td,{children:`14 %`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--tonal-5`})})]})]})]}),`
`,(0,s.jsxs)(t.p,{children:[`Werte aus `,(0,s.jsx)(t.code,{children:`css/tokens.css`}),` (Beispiel für die Corporate-Primärfarbe):`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-css`,children:`--tonal-1: rgba(0,190,190,.05);
--tonal-2: rgba(0,190,190,.08);
--tonal-3: rgba(0,190,190,.11);
--tonal-4: rgba(0,190,190,.12);
--tonal-5: rgba(0,190,190,.14);
`})}),`
`,(0,s.jsx)(t.h2,{id:`interaktiv-versus-statisch`,children:`Interaktiv versus statisch`}),`
`,(0,s.jsxs)(t.p,{children:[`Zwei Karten mit identischem farbigen Top-Border machen den Unterschied sichtbar: Links ruht
die Fläche flach mit Rahmen, rechts trägt sie den Ruhe-Schatten `,(0,s.jsx)(t.code,{children:`--e1`}),` und würde auf Hover zu
`,(0,s.jsx)(t.code,{children:`--e3`}),` wechseln.`]}),`
`,(0,s.jsx)(o,{children:(0,s.jsxs)(`div`,{className:`layout-grid`,style:{alignItems:`start`,marginBottom:`var(--s6)`},children:[(0,s.jsxs)(`div`,{className:`col-6`,children:[(0,s.jsx)(`span`,{className:`lbl`,children:`✓ Statisch · ruht flach`}),(0,s.jsxs)(`div`,{style:{border:`var(--bd-strong)`,borderTop:`4px solid var(--ki-500)`,borderRadius:`var(--r-lg)`,padding:`var(--s5)`,background:`var(--bg-surface)`},children:[(0,s.jsx)(`span`,{className:`el-lbl`,children:`Rahmen, kein Schatten`}),(0,s.jsx)(`div`,{style:{font:`var(--ty-body-sm)`,color:`var(--tx-secondary)`},children:(0,s.jsx)(t.p,{children:`Stat-Karte · Testimonial · Info-/Feature-Karte`})})]})]}),(0,s.jsxs)(`div`,{className:`col-6`,children:[(0,s.jsx)(`span`,{className:`lbl`,children:`✓ Interaktiv · ruht auf --e1, hebt auf Hover`}),(0,s.jsxs)(`div`,{style:{boxShadow:`var(--e1)`,borderTop:`4px solid var(--ki-500)`,borderRadius:`var(--r-lg)`,padding:`var(--s5)`,background:`var(--bg-surface)`},children:[(0,s.jsx)(`span`,{className:`el-lbl`,children:`Schatten + Hover-Lift → --e3`}),(0,s.jsx)(`div`,{style:{font:`var(--ty-body-sm)`,color:`var(--tx-secondary)`},children:(0,s.jsx)(t.p,{children:`Klickbare Karte / Link-Karte`})})]})]})]})}),`
`,(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:`Typ`}),(0,s.jsx)(t.th,{children:`Ruhezustand`}),(0,s.jsx)(t.th,{children:`Hover/Focus`}),(0,s.jsx)(t.th,{children:`Klassen`})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Statisch`}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:`--e0`}),` + Rahmen (`,(0,s.jsx)(t.code,{children:`--bd`}),` bzw. `,(0,s.jsx)(t.code,{children:`--bd-strong`}),`)`]}),(0,s.jsx)(t.td,{children:`unverändert`}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:`.card`}),` · `,(0,s.jsx)(t.code,{children:`.ep-card`}),` · `,(0,s.jsx)(t.code,{children:`.card-stat`}),` · `,(0,s.jsx)(t.code,{children:`.testimonial`}),` · `,(0,s.jsx)(t.code,{children:`.ds-card`}),` · `,(0,s.jsx)(t.code,{children:`.bw-pillar-card`}),` · `,(0,s.jsx)(t.code,{children:`.cta-dl`}),` · `,(0,s.jsx)(t.code,{children:`.cta-visual`})]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Interaktiv`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--e1`})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:`--e3`}),` + `,(0,s.jsx)(t.code,{children:`translateY(-2px)`}),`, im Dark zusätzlich `,(0,s.jsx)(t.code,{children:`--bg-surface-hover`})]}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`.ep-card-link`})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Link-Karte`}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:`--e1`})}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:`--e2`}),` + `,(0,s.jsx)(t.code,{children:`translateY(-2px)`})]}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.code,{children:`a.card.card-elevated`}),` (wirkt nur auf `,(0,s.jsx)(t.code,{children:`<a>`}),`, statische Karten bleiben flach)`]})]})]})]}),`
`,(0,s.jsx)(t.h2,{id:`barrierefreiheit`,children:`Barrierefreiheit`}),`
`,(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:`Aspekt`}),(0,s.jsx)(t.th,{children:`Regel`})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Forced Colors`}),(0,s.jsx)(t.td,{children:`Windows High Contrast unterdrückt Schatten vollständig, Elevation nie als einziges Unterscheidungsmerkmal einsetzen, immer auch Border oder Hintergrundfarbe nutzen`})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Nicht allein`}),(0,s.jsxs)(t.td,{children:[`Elevation allein kommuniziert keine Bedeutung für Screenreader, strukturelle Hierarchie muss zusätzlich durch Semantik (`,(0,s.jsx)(t.code,{children:`<header>`}),`, `,(0,s.jsx)(t.code,{children:`<main>`}),`, Überschriften) ausgedrückt werden`]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Kontrast`}),(0,s.jsxs)(t.td,{children:[`Oberflächen-Kontrast zwischen `,(0,s.jsx)(t.code,{children:`--bg-page`}),` und `,(0,s.jsx)(t.code,{children:`--bg-surface`}),` prüfen, auch ohne Schatten müssen Karten und Panels erkennbar sein`]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:`Schwebende Panels im Dark`}),(0,s.jsxs)(t.td,{children:[`Menüs und Popover liegen über fremdem Inhalt, den sie nicht kennen. Auf der tiefen Basisfläche trägt ein schwarzer Schatten sie dort nicht mehr, gemessen stand ein Topnav-Menü über einem Hero-Foto nur 1,34:1 gegen die hellste Stelle daneben. Sie bekommen deshalb im Dark den stärkeren Rand `,(0,s.jsx)(t.code,{children:`--bd-strong-c`}),`, der unabhängig vom Untergrund liest.`]})]})]})]}),`
`,(0,s.jsx)(t.h2,{id:`dos--donts`,children:`Dos & Don'ts`}),`
`,(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:`Tun`})}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsx)(t.li,{children:`Level steigt mit z-Index: je weiter vorn ein Element liegt, desto höher sein
Elevation-Level`}),`
`,(0,s.jsx)(t.li,{children:`Level 1 für Standard-Cards und Listen-Elemente im normalen Seitenkontext`}),`
`,(0,s.jsx)(t.li,{children:`Level 3 bis 5 nur für Elemente, die anderen Inhalt überlagern: Drawer, Modal, Tooltip`}),`
`,(0,s.jsx)(t.li,{children:`Tonal Overlay ab Level 3 zusätzlich zum Schatten, verstärkt die Zugehörigkeit zur
Primärfarbe`}),`
`,(0,s.jsx)(t.li,{children:`Level 0 (kein Schatten) für Outlined-Varianten im Tabellen- oder Listen-Kontext`}),`
`]}),`
`,(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:`Nicht tun`})}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsx)(t.li,{children:`Schatten als Dekoration ohne semantischen Grund, Elevation kommuniziert immer räumliche
Hierarchie`}),`
`,(0,s.jsx)(t.li,{children:`Mehrere Level-5-Elemente gleichzeitig sichtbar, zu viel visuelle Konkurrenz auf einer
Ebene`}),`
`,(0,s.jsx)(t.li,{children:`Level überspringen (zum Beispiel direkt von 0 auf 4), verwirrt die wahrgenommene
räumliche Hierarchie`}),`
`,(0,s.jsxs)(t.li,{children:[`Eigene `,(0,s.jsx)(t.code,{children:`box-shadow`}),`-Werte statt Tokens, bricht die Konsistenz im Dark Mode`]}),`
`,(0,s.jsx)(t.li,{children:`Tonal Overlay ohne zugehörigen Schatten auf Level 3 bis 5, die Kombination beider ist die
Regel`}),`
`]}),`
`,(0,s.jsx)(t.h2,{id:`verwendung`,children:`Verwendung`}),`
`,(0,s.jsx)(t.p,{children:`Sechs schematische Beispiel-Kacheln zeigen je Elevation-Level ein typisches Bauteil, von der
Outlined Card auf Level 0 bis zum Tooltip auf Level 5.`}),`
`,`
`,`
`,(0,s.jsx)(o,{children:(0,s.jsx)(`div`,{style:{display:`grid`,gridTemplateColumns:`1fr 1fr 1fr`,gap:`var(--s4)`},children:u.map(e=>(0,s.jsx)(UsageLevelCard,{...e},e.level))})}),`
`,(0,s.jsx)(t.h2,{id:`siehe-auch`,children:`Siehe auch`}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsx)(t.li,{children:`CONTRIBUTING.md § 4 Elevation = Interaktivität`}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var s,ElevationSwatch,c,l,u,UsageLevelCard;function init_elevation(){return(init_elevation=e((()=>{s=t(),r(),i(),ElevationSwatch=({style:e,swatchLabel:t,body:n})=>(0,s.jsxs)(`div`,{className:`el-card col-2`,style:e,children:[(0,s.jsx)(`span`,{className:`el-lbl`,children:t}),n]}),c=[{style:{border:`var(--bd-strong)`},swatchLabel:`Level 0`,body:`Flat · Outlined`},{style:{boxShadow:`var(--e1)`},swatchLabel:`Level 1`,body:`Card · FAB`},{style:{boxShadow:`var(--e2)`},swatchLabel:`Level 2`,body:`Chip · Hover`},{style:{boxShadow:`var(--e3)`},swatchLabel:`Level 3`,body:`Nav Drawer`},{style:{boxShadow:`var(--e4)`},swatchLabel:`Level 4`,body:`Modal · Sheet`},{style:{boxShadow:`var(--e5)`},swatchLabel:`Level 5`,body:`Tooltip · Dialog`}],l=[{style:{background:`var(--bg-surface)`},swatchLabel:`0 % Tonal`,body:`Level 0`},{style:{background:`color-mix(in srgb, var(--co-500) 5%, var(--bg-surface))`},swatchLabel:`5 % Tonal`,body:`Level 1`},{style:{background:`color-mix(in srgb, var(--co-500) 8%, var(--bg-surface))`},swatchLabel:`8 % Tonal`,body:`Level 2`},{style:{background:`color-mix(in srgb, var(--co-500) 11%, var(--bg-surface))`},swatchLabel:`11 % Tonal`,body:`Level 3`},{style:{background:`color-mix(in srgb, var(--co-500) 12%, var(--bg-surface))`},swatchLabel:`12 % Tonal`,body:`Level 4`},{style:{background:`color-mix(in srgb, var(--co-500) 14%, var(--bg-surface))`},swatchLabel:`14 % Tonal`,body:`Level 5`}],u=[{level:0,cardStyle:{border:`var(--bd-strong)`},label:`Outlined Card`,desc:`Tabelle · Listeneintrag`},{level:1,cardStyle:{boxShadow:`var(--e1)`},label:`Standard-Card`,desc:`Produktkarte · FAB`},{level:2,cardStyle:{boxShadow:`var(--e2)`,minHeight:90},label:`Chip · Hover`,chip:!0},{level:3,cardStyle:{boxShadow:`var(--e3)`,minHeight:90},label:`Nav Drawer`,desc:`Sidebar · Panel`},{level:4,cardStyle:{boxShadow:`var(--e4)`,minHeight:90},label:`Modal · Sheet`,desc:`Dialog · Overlay`},{level:5,cardStyle:{boxShadow:`var(--e5)`,minHeight:90},label:`Tooltip · Dialog`,desc:`Snackbar · Autocomplete`}],UsageLevelCard=({level:e,cardStyle:t,label:n,desc:r,chip:i})=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`},children:[(0,s.jsxs)(`div`,{style:{font:`500 12px/16px var(--font)`,letterSpacing:`.06em`,textTransform:`uppercase`,color:`var(--tx-muted)`,marginBottom:`var(--s2)`},children:[`Level `,e]}),(0,s.jsxs)(`div`,{style:{borderRadius:`var(--r-lg)`,padding:`var(--s4)`,background:`var(--bg-surface)`,flex:1,...t},children:[(0,s.jsx)(`span`,{className:`el-lbl`,children:n}),i?(0,s.jsx)(`div`,{style:{display:`inline-flex`,alignItems:`center`,padding:`4px 10px`,borderRadius:`var(--r-full)`,background:`var(--bg-overlay)`,boxShadow:`var(--e2)`,font:`500 12px/16px var(--font)`,color:`var(--tx-primary)`},children:`Chip`}):(0,s.jsx)(`div`,{style:{font:`400 12px/16px var(--font)`,color:`var(--tx-secondary)`},children:r})]})]})})))()}init_elevation();export{ElevationSwatch,UsageLevelCard,MDXContent as default,c as shadowSwatches,l as tonalSwatches,u as usageLevels};