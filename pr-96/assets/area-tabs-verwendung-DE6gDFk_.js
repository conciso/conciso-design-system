import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n}from"./blocks-CgfgLRYg.js";import{s as r}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i,r as a}from"./react-C77DJ2jK.js";import{n as o,t as s}from"./area-tabs.stories-Ceg_QyhH.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...i(),...e.components},{HtmlBeispiel:r}=t;return r||_missingMdxReference(`HtmlBeispiel`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{of:s,name:`Verwendung`}),`
`,(0,c.jsx)(t.h1,{id:`verwendung`,children:`Verwendung`}),`
`,(0,c.jsxs)(t.p,{children:[`Area Tabs schalten zwischen den vier Unternehmensbereichen um, zum Beispiel im Bereichs-Komponenten-Vergleich: dieselben Bauteile, einmal je Bereich, immer nur ein Bereich sichtbar. Die Leiste folgt dem WAI-ARIA-Tabs-Muster mit Pfeiltasten, Home/End und Roving-Tabindex. Das Angular-Bauteil (`,(0,c.jsx)(t.code,{children:`cds-area-tabs`}),` mit `,(0,c.jsx)(t.code,{children:`cds-area-tab`}),`) liefert das fertig, wer nur die CSS-Schicht verwendet, ergänzt es selbst (Abschnitt „Nur CSS-Schicht“).`]}),`
`,(0,c.jsx)(t.h2,{id:`wann-einsetzen`,children:`Wann einsetzen`}),`
`,(0,c.jsxs)(t.p,{children:[`Tabs passen, wenn die Panels gleichartig aufgebaut sind und die Person sie vergleicht, ohne die Seite zu verlassen. Der aktive Tab trägt Text und 3-px-Unterstrich in `,(0,c.jsx)(t.code,{children:`--atab-color`}),`, dem Bereichston `,(0,c.jsx)(t.code,{children:`--XX-700`}),`. Beim Bereich Angewandte KI ist es `,(0,c.jsx)(t.code,{children:`--ki-800`}),`, weil `,(0,c.jsx)(t.code,{children:`--ki-700`}),` die AA-Schwelle für Normaltext reißt. Der Punkt vor dem Label nutzt `,(0,c.jsx)(t.code,{children:`--XX-500`}),`. Im Dark Mode setzen Regeln auf `,(0,c.jsx)(t.code,{children:`.atab[data-area]`}),` den Ton; `,(0,c.jsx)(t.code,{children:`data-area`}),` gehört deshalb in jedes Tab-Markup.`]}),`
`,(0,c.jsx)(t.h2,{id:`barrierefreiheit`,children:`Barrierefreiheit`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Element`}),(0,c.jsx)(t.th,{children:`Regel`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Leiste`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`role="tablist"`}),` mit `,(0,c.jsx)(t.code,{children:`aria-label`}),` (Standard „Bereiche“), WAI-ARIA verlangt einen zugänglichen Namen`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Tab`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`<button role="tab">`}),` mit `,(0,c.jsx)(t.code,{children:`aria-selected`}),`, `,(0,c.jsx)(t.code,{children:`aria-controls`}),` auf das Panel und `,(0,c.jsx)(t.code,{children:`id`}),` für die Rückverknüpfung`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Panel`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`role="tabpanel"`}),` mit `,(0,c.jsx)(t.code,{children:`aria-labelledby`}),` auf den Tab, nur das aktive Panel ist sichtbar (`,(0,c.jsx)(t.code,{children:`display: none`}),` entfernt die übrigen aus dem Lesefluss)`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Roving-Tabindex`}),(0,c.jsxs)(t.td,{children:[`Nur der aktive Tab ist per Tab erreichbar (`,(0,c.jsx)(t.code,{children:`tabindex="0"`}),`), die übrigen tragen `,(0,c.jsx)(t.code,{children:`tabindex="-1"`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Zielgröße`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`min-height: 40px`}),`, eine bewusste Abweichung von den 44 px (siehe `,(0,c.jsx)(t.code,{children:`Grundlagen/Barrierefreiheit`}),`)`]})]})]})]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Taste`}),(0,c.jsx)(t.th,{children:`Funktion`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`→`}),(0,c.jsx)(t.td,{children:`Nächster Tab, vom letzten zum ersten`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`←`}),(0,c.jsx)(t.td,{children:`Vorheriger Tab, vom ersten zum letzten`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Home / End`}),(0,c.jsx)(t.td,{children:`Erster beziehungsweise letzter Tab`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Tab`}),(0,c.jsx)(t.td,{children:`Verlässt die Leiste und führt in den Inhalt des aktiven Panels`})]})]})]}),`
`,(0,c.jsx)(t.p,{children:`Auswahl und Fokus fallen zusammen (automatische Aktivierung): Die Panels sind sofort verfügbar, deshalb muss ein Tab nicht zusätzlich bestätigt werden.`}),`
`,(0,c.jsx)(t.h2,{id:`nur-css-schicht`,children:`Nur CSS-Schicht`}),`
`,(0,c.jsxs)(t.p,{children:[`Wer nur die CSS-Schicht verwendet, setzt dieses Markup ein. Der erste Tab trägt `,(0,c.jsx)(t.code,{children:`.active`}),`, `,(0,c.jsx)(t.code,{children:`aria-selected="true"`}),` und `,(0,c.jsx)(t.code,{children:`tabindex="0"`}),`, das erste Panel `,(0,c.jsx)(t.code,{children:`.visible`}),`. `,(0,c.jsx)(t.code,{children:`--atab-color`}),` und `,(0,c.jsx)(t.code,{children:`data-area`}),` setzt jeder Tab selbst.`]}),`
`,(0,c.jsx)(r,{titel:`Area Tabs als reines Markup`,interaktiv:!0,children:(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<div class="area-tabs" role="tablist" aria-label="Bereiche">
  <button class="atab active" type="button" role="tab" id="tab-co" aria-selected="true" aria-controls="panel-co" tabindex="0" data-area="co" style="--atab-color:var(--co-700)">
    <span class="area-dot" style="background:var(--co-500)"></span>Corporate
  </button>
  <button class="atab" type="button" role="tab" id="tab-ki" aria-selected="false" aria-controls="panel-ki" tabindex="-1" data-area="ki" style="--atab-color:var(--ki-800)">
    <span class="area-dot" style="background:var(--ki-500)"></span>Angewandte KI
  </button>
  <button class="atab" type="button" role="tab" id="tab-es" aria-selected="false" aria-controls="panel-es" tabindex="-1" data-area="es" style="--atab-color:var(--es-700)">
    <span class="area-dot" style="background:var(--es-500)"></span>Effektive Software
  </button>
  <button class="atab" type="button" role="tab" id="tab-wo" aria-selected="false" aria-controls="panel-wo" tabindex="-1" data-area="wo" style="--atab-color:var(--wo-700)">
    <span class="area-dot" style="background:var(--wo-500)"></span>Wirksame Organisationen
  </button>
</div>

<div class="atab-content visible" role="tabpanel" id="panel-co" aria-labelledby="tab-co" tabindex="0">
  <p>Inhalt des Bereichs Corporate.</p>
</div>
<div class="atab-content" role="tabpanel" id="panel-ki" aria-labelledby="tab-ki" tabindex="0">
  <p>Inhalt des Bereichs Angewandte KI.</p>
</div>
<div class="atab-content" role="tabpanel" id="panel-es" aria-labelledby="tab-es" tabindex="0">
  <p>Inhalt des Bereichs Effektive Software.</p>
</div>
<div class="atab-content" role="tabpanel" id="panel-wo" aria-labelledby="tab-wo" tabindex="0">
  <p>Inhalt des Bereichs Wirksame Organisationen.</p>
</div>
`})})}),`
`,(0,c.jsx)(t.p,{children:`Das Umschalten kommt aus einem Skript. Jede Umsetzung ergänzt:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Bei jedem Wechsel trägt genau ein Tab `,(0,c.jsx)(t.code,{children:`.active`}),`, `,(0,c.jsx)(t.code,{children:`aria-selected="true"`}),` und `,(0,c.jsx)(t.code,{children:`tabindex="0"`}),`, alle anderen keine `,(0,c.jsx)(t.code,{children:`.active`}),`, `,(0,c.jsx)(t.code,{children:`aria-selected="false"`}),` und `,(0,c.jsx)(t.code,{children:`tabindex="-1"`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Genau ein Panel trägt `,(0,c.jsx)(t.code,{children:`.visible`}),`, das über `,(0,c.jsx)(t.code,{children:`aria-controls`}),` verknüpfte. Alle anderen verlieren `,(0,c.jsx)(t.code,{children:`.visible`}),` und sind damit ausgeblendet.`]}),`
`,(0,c.jsx)(t.li,{children:`→ und ← wechseln zum nächsten beziehungsweise vorherigen Tab und laufen um. Home springt zum ersten, End zum letzten Tab. Jede dieser Tasten unterdrückt das Standardverhalten, aktiviert den Tab und setzt den Fokus darauf.`}),`
`,(0,c.jsxs)(t.li,{children:[`Enthält ein Panel kein fokussierbares Element, trägt es `,(0,c.jsx)(t.code,{children:`tabindex="0"`}),`, damit die Tastatur den Inhalt erreicht. Enthält es ein fokussierbares Element (Button, Link, Formularfeld), trägt es kein `,(0,c.jsx)(t.code,{children:`tabindex`}),`. Das Angular-Bauteil setzt das selbst.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`dos--donts`,children:`Dos & Don'ts`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Die Leiste mit `,(0,c.jsx)(t.code,{children:`aria-label`}),` benennen und jeden Tab per `,(0,c.jsx)(t.code,{children:`aria-controls`}),` mit seinem Panel verknüpfen`]}),`
`,(0,c.jsxs)(t.li,{children:[`Für den Bereich Angewandte KI den Ton `,(0,c.jsx)(t.code,{children:`--ki-800`}),` setzen`]}),`
`,(0,c.jsx)(t.li,{children:`Gleichartig aufgebaute Panels verwenden, damit der Vergleich zwischen den Bereichen gelingt`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Nicht tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Tabs ohne Pfeiltasten, Home/End und Roving-Tabindex ausliefern, die Leiste wäre per Tastatur nur über jeden einzelnen Tab-Stop erreichbar`}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`--ki-700`}),` als Aktivton verwenden, er reißt im Light Mode die AA-Schwelle für Normaltext`]}),`
`,(0,c.jsx)(t.li,{children:`Tabs als Navigation zwischen Seiten einsetzen, dafür gehören Links in die Navigation`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`verwandte-seiten`,children:`Verwandte Seiten`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Marke/Brand Areas`}),` (die vier Bereiche und ihre Farbsystem-Werte)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Grundlagen/Barrierefreiheit`}),` (Zielgrößen, ARIA-Muster)`]}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var c;function init_area_tabs_verwendung(){return(init_area_tabs_verwendung=e((()=>{c=r(),a(),t(),o()})))()}init_area_tabs_verwendung();export{MDXContent as default};