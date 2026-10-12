import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n}from"./blocks-CgfgLRYg.js";import{s as r}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i,r as a}from"./react-C77DJ2jK.js";import{n as o,t as s}from"./table.stories-C5A-x7TY.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...i(),...e.components},{HtmlBeispiel:r}=t;return r||_missingMdxReference(`HtmlBeispiel`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{of:o,name:`Verwendung`}),`
`,(0,c.jsx)(t.h1,{id:`tabelle`,children:`Tabelle`}),`
`,(0,c.jsxs)(t.p,{children:[`Barrierefreie Datentabellen mit `,(0,c.jsx)(t.code,{children:`<caption>`}),`, `,(0,c.jsx)(t.code,{children:`scope`}),`-Attributen und
Tastaturnavigation, in zwei Varianten: Standard und Gestreift, dazu eine
aufklappbare Vergleichstabelle. Standard und Gestreift deckt das Angular-Bauteil
`,(0,c.jsx)(t.code,{children:`Komponenten/Tabelle/Tabelle`}),` (`,(0,c.jsx)(t.code,{children:`cds-table`}),`) ab: es liefert `,(0,c.jsx)(t.code,{children:`.tbl-wrap`}),` samt
Tastaturzugriff und Name sowie `,(0,c.jsx)(t.code,{children:`.tbl`}),`/`,(0,c.jsx)(t.code,{children:`.tbl--striped`}),`, der Konsument projiziert
`,(0,c.jsx)(t.code,{children:`<thead>`}),`/`,(0,c.jsx)(t.code,{children:`<tbody>`}),`/`,(0,c.jsx)(t.code,{children:`<tfoot>`}),` unverändert hinein. Die aufklappbare Vergleichstabelle
deckt `,(0,c.jsx)(t.code,{children:`Komponenten/Tabelle/Vergleichstabelle`}),` (`,(0,c.jsx)(t.code,{children:`cds-compare`}),`) ab: anders als
`,(0,c.jsx)(t.code,{children:`cds-table`}),` bekommt sie einen Daten-Input (`,(0,c.jsx)(t.code,{children:`columns`}),`/`,(0,c.jsx)(t.code,{children:`rows`}),`), weil ihre Zellen auf
Ja/Nein oder eine kurze Angabe begrenzt sind.`]}),`
`,(0,c.jsx)(t.h2,{id:`standard`,children:`Standard`}),`
`,(0,c.jsxs)(t.p,{children:[`Zeilentrenner, Hover-Highlight, numerische Spalten rechtsbündig. Der
Scroll-Container ist per Tastatur fokussierbar (`,(0,c.jsx)(t.code,{children:`tabindex="0"`}),`).`]}),`
`,(0,c.jsx)(r,{titel:`Standardtabelle`,children:(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<div class="tbl-wrap" tabindex="0" role="region" aria-label="Leistungsübersicht Tabelle">
  <table class="tbl">
    <caption>Beratungsleistungen im Überblick</caption>
    <thead>
      <tr>
        <th scope="col">Leistung</th>
        <th scope="col">Format</th>
        <th scope="col" data-num>Dauer (Tage)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">KI-Readiness Assessment</th>
        <td>Workshop &amp; Analyse</td>
        <td data-num>2</td>
      </tr>
    </tbody>
  </table>
</div>
`})})}),`
`,(0,c.jsxs)(t.p,{children:[`Numerische Spalten bekommen `,(0,c.jsx)(t.code,{children:`data-num`}),` an `,(0,c.jsx)(t.code,{children:`<th>`}),`/`,(0,c.jsx)(t.code,{children:`<td>`}),`, nicht eine eigene Klasse:
`,(0,c.jsx)(t.code,{children:`.tbl td[data-num]`}),`/`,(0,c.jsx)(t.code,{children:`.tbl th[data-num]`}),` richten rechtsbündig aus und schalten auf
tabellarische Ziffern (`,(0,c.jsx)(t.code,{children:`font-variant-numeric: tabular-nums`}),`) um.`]}),`
`,(0,c.jsx)(t.h2,{id:`gestreift`,children:`Gestreift`}),`
`,(0,c.jsxs)(t.p,{children:[`Modifier `,(0,c.jsx)(t.code,{children:`.tbl--striped`}),` für Tabellen mit vielen Zeilen, verbessert die Lesbarkeit
ohne zusätzliche Rahmen.`]}),`
`,(0,c.jsx)(r,{titel:`Gestreifte Tabelle`,children:(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<div class="tbl-wrap" tabindex="0" role="region" aria-label="Veranstaltungskalender Tabelle">
  <table class="tbl tbl--striped">
    <caption>Veranstaltungen &amp; Workshops 2025</caption>
    <thead>
      <tr>
        <th scope="col">Datum</th>
        <th scope="col">Veranstaltung</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>15. Jan 2025</td>
        <th scope="row">KI im Unternehmensalltag, Einstiegsworkshop</th>
        <td>Abgeschlossen</td>
      </tr>
    </tbody>
  </table>
</div>
`})})}),`
`,(0,c.jsxs)(t.p,{children:[`Sortierbare Spaltenüberschriften nutzen `,(0,c.jsx)(t.code,{children:`.tbl-sort`}),` (ein `,(0,c.jsx)(t.code,{children:`<button>`}),` in der `,(0,c.jsx)(t.code,{children:`<th>`}),`)
zusammen mit `,(0,c.jsx)(t.code,{children:`aria-sort="ascending"`}),` bzw. `,(0,c.jsx)(t.code,{children:`"descending"`}),` auf der `,(0,c.jsx)(t.code,{children:`<th>`}),`; `,(0,c.jsx)(t.code,{children:`.tbl--striped`}),`
und `,(0,c.jsx)(t.code,{children:`.tbl-sort`}),` lassen sich kombinieren, gestreift und sortierbar für
datenintensive Ansichten.`]}),`
`,(0,c.jsx)(t.h2,{id:`vergleichstabelle-aufklappbar`,children:`Vergleichstabelle (aufklappbar)`}),`
`,(0,c.jsx)(t.p,{children:`Für den zeilenweisen Vergleich zweier oder mehrerer Pakete beziehungsweise Tarife.
Preiskarten tragen Preis und drei bis vier Highlights (Konversion), die vollständige
Merkmalsliste steckt in der aufklappbaren Tabelle (Tiefenvergleich auf Abruf). So
bleibt der Schnell-Scan kurz, und Karten und Tabelle überschneiden sich nicht.
Erprobt auf der Beispielseite Angewandte KI, AI.Box (Leistungspakete).`}),`
`,(0,c.jsxs)(t.p,{children:[`Aufklappbar via nativem `,(0,c.jsx)(t.code,{children:`<details>`}),`/`,(0,c.jsx)(t.code,{children:`<summary>`}),` (`,(0,c.jsx)(t.code,{children:`.ep-compare`}),`, standardmäßig zu,
gleiche Mechanik wie das Inhaltsverzeichnis in `,(0,c.jsx)(t.code,{children:`Seitenmuster/Wissensbeitrag`}),`).
Tabelle `,(0,c.jsx)(t.code,{children:`.ep-compare-table`}),` mit `,(0,c.jsx)(t.code,{children:`<caption class="sr-only">`}),` und `,(0,c.jsx)(t.code,{children:`scope`}),`-Attributen.
Die empfohlene Spalte wird über `,(0,c.jsx)(t.code,{children:`.ep-compare-pro`}),` (bereichsgetönt) hervorgehoben.
Enthalten/Nicht enthalten als `,(0,c.jsx)(t.code,{children:`.ep-compare-yes`}),` (✓) beziehungsweise `,(0,c.jsx)(t.code,{children:`.ep-compare-no`}),`
(−), jeweils mit `,(0,c.jsx)(t.code,{children:`.sr-only`}),`-Text, da Farbe und Glyph allein keine Bedeutung tragen
(WCAG 1.4.1).`]}),`
`,(0,c.jsx)(r,{titel:`Vergleichstabelle (aufklappbar)`,children:(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<details class="ep-compare">
  <summary class="ep-compare-summary">Alle Funktionen vergleichen</summary>
  <div class="ep-compare-table-wrap">
    <table class="ep-compare-table">
      <caption class="sr-only">Funktionsvergleich Core und Pro</caption>
      <thead>
        <tr>
          <th scope="col">Funktion</th>
          <th scope="col">Core</th>
          <th scope="col" class="ep-compare-pro">Pro</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Hosting in Deutschland</th>
          <td><span class="ep-compare-yes" aria-hidden="true">✓</span><span class="sr-only">Enthalten</span></td>
          <td class="ep-compare-pro">…</td>
        </tr>
      </tbody>
    </table>
  </div>
</details>
`})})}),`
`,(0,c.jsx)(t.h2,{id:`verwendung`,children:`Verwendung`}),`
`,(0,c.jsx)(`div`,{className:`doc-eyebrow`,children:`Wann welche Variante?`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Variante`}),(0,c.jsx)(t.th,{children:`Wann einsetzen`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Standard`}),(0,c.jsx)(t.td,{children:`Für Tabellen mit bis zu 6 Zeilen, klare Zeilentrenner reichen zur Orientierung`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[`Gestreift (`,(0,c.jsx)(t.code,{children:`.tbl--striped`}),`)`]}),(0,c.jsx)(t.td,{children:`Ab ca. 7 Zeilen, der alternierende Hintergrund verbessert die Lesbarkeit ohne zusätzliche Rahmen`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[`Sortierbar (`,(0,c.jsx)(t.code,{children:`.tbl-sort`}),`)`]}),(0,c.jsx)(t.td,{children:`Wenn Nutzer die Reihenfolge selbst bestimmen müssen, Klick auf die Spaltenüberschrift sortiert auf- oder absteigend`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Kombination`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`.tbl--striped`}),` und `,(0,c.jsx)(t.code,{children:`.tbl-sort`}),` lassen sich kombinieren, gestreift und sortierbar für datenintensive Ansichten`]})]})]})]}),`
`,(0,c.jsx)(`div`,{className:`doc-eyebrow`,children:`Barrierefreiheit`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribut / Element`}),(0,c.jsx)(t.th,{children:`Zweck`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`<caption>`})}),(0,c.jsx)(t.td,{children:`Pflicht, Screenreader lesen den Titel vor, bevor die Zellen vorgelesen werden`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`scope="col"`})}),(0,c.jsxs)(t.td,{children:[`Auf alle `,(0,c.jsx)(t.code,{children:`<th>`}),` im `,(0,c.jsx)(t.code,{children:`<thead>`}),`, ordnet Spaltenüberschriften den Zellen darunter zu`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`scope="row"`})}),(0,c.jsx)(t.td,{children:`Wenn die erste Spalte eine Zeilenüberschrift ist, ordnet die Überschrift den Zellen rechts davon zu`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`tabindex="0"`})}),(0,c.jsx)(t.td,{children:`Auf dem Scroll-Container, macht horizontales Scrollen per Tastatur erreichbar`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`role="region"`}),` + `,(0,c.jsx)(t.code,{children:`aria-label`})]}),(0,c.jsx)(t.td,{children:`Auf dem Scroll-Container, kennzeichnet ihn als benannten Landmark für Screenreader`})]})]})]}),`
`,(0,c.jsx)(`div`,{className:`doc-eyebrow`,children:`Dos & Don'ts`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`✓ Tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`<caption>`}),` und `,(0,c.jsx)(t.code,{children:`scope`}),`-Attribute immer setzen, auch bei einfachen Tabellen`]}),`
`,(0,c.jsxs)(t.li,{children:[`Numerische Spalten über `,(0,c.jsx)(t.code,{children:`data-num`}),` rechtsbündig ausrichten, erleichtert den Vergleich von Zahlen`]}),`
`,(0,c.jsx)(t.li,{children:`Scroll-Container verwenden statt die Tabelle zu verkleinern, Lesbarkeit hat Vorrang`}),`
`,(0,c.jsx)(t.li,{children:`Spaltenüberschriften kurz und eindeutig benennen, maximal zwei bis drei Wörter`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`✕ Nicht tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Tabellen für Seiten-Layouts verwenden, dafür CSS Grid oder Flexbox nutzen`}),`
`,(0,c.jsx)(t.li,{children:`Mehr als sieben bis acht Spalten, lieber aufteilen oder Prioritäten setzen`}),`
`,(0,c.jsx)(t.li,{children:`Langen Fließtext in Zellen, Tabellen sind für strukturierte, scannbare Daten gedacht`}),`
`,(0,c.jsxs)(t.li,{children:[`Nur Farbe zur Bedeutungsvermittlung nutzen, Status-Badges zusätzlich mit Text kennzeichnen (siehe `,(0,c.jsx)(t.code,{children:`Komponenten/Chips, Badges & Pills/Status-Badge`}),`)`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`verwandte-seiten`,children:`Verwandte Seiten`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Komponenten/Tabelle/Tabelle`}),` (Angular-Bauteil `,(0,c.jsx)(t.code,{children:`cds-table`}),` für Standard und Gestreift)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Komponenten/Tabelle/Vergleichstabelle`}),` (Angular-Bauteil `,(0,c.jsx)(t.code,{children:`cds-compare`}),` für die aufklappbare
Vergleichstabelle)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Komponenten/Chips, Badges & Pills/Status-Badge`}),` (für Status-Zellen)`]}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var c;function init_tabelle(){return(init_tabelle=e((()=>{c=r(),a(),t(),s()})))()}init_tabelle();export{MDXContent as default};