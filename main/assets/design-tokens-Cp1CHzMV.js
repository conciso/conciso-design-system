import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n}from"./blocks-CgfgLRYg.js";import{s as r}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i,r as a}from"./react-C77DJ2jK.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...i(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n,{title:`Grundlagen/Design Tokens`,name:`Übersicht`}),`
`,(0,o.jsx)(t.h1,{id:`design-tokens`,children:`Design Tokens`}),`
`,(0,o.jsx)(t.p,{children:`Alle Tokens als CSS Custom Properties, Framework-unabhängig.`}),`
`,(0,o.jsxs)(t.p,{children:[`Die `,(0,o.jsx)(t.strong,{children:`CSS-Schicht`}),` (`,(0,o.jsx)(t.code,{children:`@conciso/design-system`}),`) ist die Quelle der Wahrheit für Aussehen
und Tokens. Die `,(0,o.jsx)(t.strong,{children:`Angular-Lib`}),` (`,(0,o.jsx)(t.code,{children:`@conciso/design-system-angular`}),`) liefert dünne
Wrapper-Komponenten über der CSS-Schicht und bringt selbst keine Styles mit, ein Consumer
bindet die CSS-Schicht separat und global ein.`]}),`
`,(0,o.jsx)(t.h2,{id:`präfix-schema`,children:`Präfix-Schema`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Gruppe`}),(0,o.jsx)(t.th,{children:`Präfixe`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Farbe`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`--co-* --ki-* --es-* --wo-* --ro-* --n-*`}),` (Skala `,(0,o.jsx)(t.code,{children:`-50`}),` bis `,(0,o.jsx)(t.code,{children:`-900`}),`), semantisch `,(0,o.jsx)(t.code,{children:`--c-success/-warning/-error`}),` (Status-Fläche in Grafiken `,(0,o.jsx)(t.code,{children:`--c-*-fill`}),`), Datenvisualisierung `,(0,o.jsx)(t.code,{children:`--dv-*`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Flächen/Text`}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`--bg-* --tx-*`})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Typo`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`--ty-*`}),`, `,(0,o.jsx)(t.code,{children:`--font`}),` / `,(0,o.jsx)(t.code,{children:`--font-display`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Maß`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`--s1…--s16`}),` (Spacing), `,(0,o.jsx)(t.code,{children:`--r-*`}),` (Radius), `,(0,o.jsx)(t.code,{children:`--e0…--e5`}),` (Elevation), `,(0,o.jsx)(t.code,{children:`--tonal-*`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Sonstiges`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`--m-*`}),` (Motion), `,(0,o.jsx)(t.code,{children:`--bd`}),` / `,(0,o.jsx)(t.code,{children:`--bd-strong`}),` (Border), `,(0,o.jsx)(t.code,{children:`--focus-*`}),`, `,(0,o.jsx)(t.code,{children:`--icon-stroke-*`})]})]})]})]}),`
`,(0,o.jsxs)(t.p,{children:[`Neue Tokens folgen demselben Präfix-Schema und gehören in `,(0,o.jsx)(t.code,{children:`css/tokens.css`}),` (Light, Source
of Truth), Dark-Abweichungen in `,(0,o.jsx)(t.code,{children:`css/dark-mode.css`}),`.`]}),`
`,(0,o.jsx)(t.h2,{id:`rollen-zuordnung-contributing--10-schritt-1`,children:`Rollen-Zuordnung (CONTRIBUTING § 10 Schritt 1)`}),`
`,(0,o.jsx)(t.p,{children:`Vor einem neuen Token prüfen, ob die Rolle schon ein Token hat, eine neue Rolle braucht
einen neuen Namen, eine bekannte Rolle nicht:`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Rolle`}),(0,o.jsx)(t.th,{children:`Token`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Farbiger Text`}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`--XX-ink`})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Füllung eines textführenden Bauteils`}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`--XX-fill`})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Dekorative Fläche`}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`--XX-50`})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Sektionsfläche`}),(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`--XX-band`})})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Rahmenfarbe`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`--bd-c`}),` / `,(0,o.jsx)(t.code,{children:`--bd-strong-c`})]})]})]})]}),`
`,(0,o.jsx)(t.h2,{id:`brand--bereiche`,children:`Brand & Bereiche`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-css`,children:`/* Global */
--tx-brand:     #333E48;
--font:         'Montserrat', system-ui, sans-serif;
--font-display: 'Libre Baskerville', Georgia, serif;

/* Corporate */
--co-500: #00BEBE; --co-700: #007575; --co-50: #E0F7F7; --co-800: #004F4F;

/* Angewandte KI, Akzent 500, Text ab 700 */
--ki-500: #B5E61C; --ki-700: #6B8208; --ki-50: #F4FCD5; --ki-800: #475705;

/* Effektive Software */
--es-500: #2F5FD4; --es-700: #1B3D9A; --es-50: #EAF0FB; --es-800: #112568;

/* Wirksame Organisationen */
--wo-500: #44A030; --wo-700: #285E1A; --wo-50: #EBF5E6; --wo-800: #183A0E;
`})}),`
`,(0,o.jsx)(t.h2,{id:`shape-5-stufen`,children:`Shape (5 Stufen)`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-css`,children:`--r-xs:   4px;    /* extraSmall, kleine Icons, Swatches */
--r-sm:   8px;    /* small, Chips, Text Fields, Menus */
--r-md:  12px;    /* medium, Cards, FABs */
--r-lg:  16px;    /* large, große Cards, Sheets */
--r-xl:  28px;    /* extraLarge, Drawers, Dialoge */
--r-full: 9999px; /* full, Buttons, Badges, Pills */
`})}),`
`,(0,o.jsx)(t.h2,{id:`elevation-6-ebenen`,children:`Elevation (6 Ebenen)`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-css`,children:`/* Shadow Elevation */
--e0: none;
--e1: 0 1px 2px rgba(0,0,0,.30), 0 1px 3px 1px rgba(0,0,0,.15);
--e2: 0 1px 2px rgba(0,0,0,.30), 0 2px 6px 2px rgba(0,0,0,.15);
--e3: 0 1px 3px rgba(0,0,0,.30), 0 4px 8px 3px rgba(0,0,0,.15);
--e4: 0 2px 3px rgba(0,0,0,.30), 0 6px 10px 4px rgba(0,0,0,.15);
--e5: 0 4px 4px rgba(0,0,0,.30), 0 8px 12px 6px rgba(0,0,0,.15);

/* Tonal Elevation, Primärfarbe auf Surface */
color-mix(in srgb, var(--co-500) 5%,  var(--bg-surface)); /* Level 1 */
color-mix(in srgb, var(--co-500) 8%,  var(--bg-surface)); /* Level 2 */
color-mix(in srgb, var(--co-500) 11%, var(--bg-surface)); /* Level 3 */
color-mix(in srgb, var(--co-500) 12%, var(--bg-surface)); /* Level 4 */
color-mix(in srgb, var(--co-500) 14%, var(--bg-surface)); /* Level 5 */
`})}),`
`,(0,o.jsxs)(t.p,{children:[`Details zu allen 6 Ebenen und der Interaktiv/Statisch-Regel: `,(0,o.jsx)(t.code,{children:`Grundlagen/Elevation`}),`.`]}),`
`,(0,o.jsx)(t.h2,{id:`button-typen`,children:`Button-Typen`}),`
`,(0,o.jsx)(t.p,{children:`5 Varianten, aufsteigend nach Betonung:`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Klasse`}),(0,o.jsx)(t.th,{children:`Darstellung`}),(0,o.jsx)(t.th,{children:`Betonung`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`.btn-filled`})}),(0,o.jsx)(t.td,{children:`Hintergrund Primärfarbe, Text auf Primärfarbe`}),(0,o.jsx)(t.td,{children:`höchste`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`.btn-tonal`})}),(0,o.jsx)(t.td,{children:`Hintergrund Primary-Container`}),(0,o.jsx)(t.td,{children:`mittlere`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`.btn-elevated`})}),(0,o.jsx)(t.td,{children:`Hintergrund Surface + Schatten`}),(0,o.jsx)(t.td,{children:`leichte`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`.btn-outlined`})}),(0,o.jsx)(t.td,{children:`Rahmen Primärfarbe`}),(0,o.jsx)(t.td,{children:`niedrige`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`.btn-text`})}),(0,o.jsx)(t.td,{children:`nur Textfarbe Primärfarbe`}),(0,o.jsx)(t.td,{children:`minimale`})]})]})]}),`
`,(0,o.jsx)(t.h2,{id:`spacing--motion`,children:`Spacing & Motion`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-css`,children:`--s4: 16px; --s6: 24px; --s8: 32px; --s16: 64px;
--m-fast: 150ms cubic-bezier(.4,0,.2,1);
--focus-ring: 0 0 0 3px var(--co-50), 0 0 0 5px var(--co-700);
`})}),`
`,(0,o.jsxs)(t.p,{children:[`Vollständige Spacing-Skala (`,(0,o.jsx)(t.code,{children:`--s1`}),` bis `,(0,o.jsx)(t.code,{children:`--s16`}),`) und ihre Ausnahmen: `,(0,o.jsx)(t.code,{children:`Grundlagen/Spacing & Grid`}),`.`]}),`
`,(0,o.jsx)(t.h2,{id:`dateien`,children:`Dateien`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Datei`}),(0,o.jsx)(t.th,{children:`Inhalt`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`css/tokens.css`})}),(0,o.jsx)(t.td,{children:`Light-Werte, kanonische Quelle (Source of Truth)`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`css/dark-mode.css`})}),(0,o.jsxs)(t.td,{children:[`Dark-Abweichungen, komplett in `,(0,o.jsx)(t.code,{children:`@media screen`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`dist/tokens/`})}),(0,o.jsxs)(t.td,{children:[`Generierter Export (`,(0,o.jsx)(t.code,{children:`tokens.json`}),`, `,(0,o.jsx)(t.code,{children:`tokens.scss`}),`, `,(0,o.jsx)(t.code,{children:`tokens.js`}),`), gitignored und nicht manuell editieren`]})]})]})]}),`
`,(0,o.jsxs)(t.p,{children:[`Nach jeder Änderung an `,(0,o.jsx)(t.code,{children:`css/tokens.css`}),` oder `,(0,o.jsx)(t.code,{children:`css/dark-mode.css`}),`: `,(0,o.jsx)(t.code,{children:`npm run build:tokens`}),`
ausführen, das Skript liest beide Dateien und schreibt den Export nach `,(0,o.jsx)(t.code,{children:`dist/tokens/`}),` neu.`]}),`
`,(0,o.jsx)(t.h2,{id:`siehe-auch`,children:`Siehe auch`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`CONTRIBUTING.md § 2 Namens-Konventionen, § 10 Eine Komponente / ein Token hinzufügen`}),`
`,(0,o.jsx)(t.li,{children:`CONTEXT.md, Abschnitte CSS-Schicht, Angular-Lib, Wrapper-Komponente`}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}var o;function init_design_tokens(){return(init_design_tokens=e((()=>{o=r(),a(),t()})))()}init_design_tokens();export{MDXContent as default};