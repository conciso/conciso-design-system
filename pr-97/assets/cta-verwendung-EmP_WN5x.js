import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{s as t}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i as n,r}from"./react-C77DJ2jK.js";import{c as i,o as a}from"./blocks-MIQYy-EB.js";import{n as o,t as s}from"./cta-band.stories-B4-nHiHw.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components},{HtmlBeispiel:r}=t;return r||_missingMdxReference(`HtmlBeispiel`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{of:s,name:`Verwendung`}),`
`,(0,c.jsx)(t.h1,{id:`verwendung`,children:`Verwendung`}),`
`,(0,c.jsxs)(t.p,{children:[`Call to Action deckt zwei Pattern-Familien ab: das Page-End-CTA-Band als letzte, konkrete
Einladung am Ende jeder Customer-Page, und vier Download-CTA-Varianten für
Ressourcen-Downloads. Ergänzend dokumentiert diese Seite den Editorial Split als
sekundäre Konversionsfläche neben dem primären Page-End-CTA. Das Page-End-CTA-Band hat
ein eigenes Bauteil (`,(0,c.jsx)(t.code,{children:`CtaBand`}),`, Attributselektor
`,(0,c.jsx)(t.code,{children:`[cdsCtaBand]`}),`), ebenso die vier Download-Varianten (`,(0,c.jsx)(t.code,{children:`DownloadCta`}),`); der Editorial Split
bleibt ein CSS-Rezept ohne Angular-Komponente.`]}),`
`,(0,c.jsx)(t.h2,{id:`wann-welche-variante`,children:`Wann welche Variante`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Variante`}),(0,c.jsx)(t.th,{children:`Bauteil`}),(0,c.jsx)(t.th,{children:`Wann einsetzen`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Page-End-CTA-Band`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`CtaBand`}),` (`,(0,c.jsx)(t.code,{children:`[cdsCtaBand]`}),`)`]}),(0,c.jsx)(t.td,{children:`Letzte Einladung am Ende jeder Customer-Page, direkt vor dem Footer, eine Aktion auf der Bereichsfarbe als Hintergrund`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Editorial Split`}),(0,c.jsxs)(t.td,{children:[`bauteillos (CSS-Rezept `,(0,c.jsx)(t.code,{children:`.ep-section`}),` + `,(0,c.jsx)(t.code,{children:`.layout-grid`}),`)`]}),(0,c.jsx)(t.td,{children:`Sekundäre oder tertiäre Konversionsfläche neben dem primären Page-End-CTA (zum Beispiel ein Karriere-Block auf der Landing), ohne Card-Chrome`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Download · Hero`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`DownloadCta`})}),(0,c.jsx)(t.td,{children:`Hauptressource einer Seite, Landing Pages, Ressourcenseiten, Kampagnen, maximal einmal pro Seite`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Download · Mit Vorschaubild`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`DownloadCta`})}),(0,c.jsx)(t.td,{children:`Whitepapers und Reports, deren Deckblatt als Vorschau den Inhalt sofort greifbar macht`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Download · Kompakt`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`DownloadCta`})}),(0,c.jsx)(t.td,{children:`Ressourcenlisten mit mehreren Downloads (zum Beispiel eine Mediathek)`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Download · Minimal`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`DownloadCta`})}),(0,c.jsx)(t.td,{children:`Quellenangaben, Fließtext-Links oder Nebenbereiche (Footer, Blog, Dokumentation)`})]})]})]}),`
`,(0,c.jsxs)(t.h3,{id:`page-end-cta-band-ctaband`,children:[`Page-End-CTA-Band (`,(0,c.jsx)(t.code,{children:`CtaBand`}),`)`]}),`
`,(0,c.jsxs)(t.p,{children:[`Attributselektor `,(0,c.jsx)(t.code,{children:`[cdsCtaBand]`}),` statt eigenem Element: die Bandfläche ist im Mockup
ausnahmslos ein Inline-Style direkt am Element (`,(0,c.jsx)(t.code,{children:`.ep-cta-band`}),`, Padding
`,(0,c.jsx)(t.code,{children:`var(--s12) var(--s8)`}),`, zentriert), ein eigenes Element würde denselben „Fläche am
Host“-Fehler reproduzieren, den `,(0,c.jsx)(t.code,{children:`docs/adr/0008`}),` für `,(0,c.jsx)(t.code,{children:`cds-section`}),` gemessen hat. Der
Konsument setzt Hintergrund und Schrift deshalb
weiterhin selbst, auf demselben `,(0,c.jsx)(t.code,{children:`<div cdsCtaBand>`}),`, das die Komponente trägt:
Bereichsfarbe (`,(0,c.jsx)(t.code,{children:`--co-700`}),` / `,(0,c.jsx)(t.code,{children:`--ki-800`}),` / `,(0,c.jsx)(t.code,{children:`--es-700`}),` / `,(0,c.jsx)(t.code,{children:`--wo-700`}),`), Schrift `,(0,c.jsx)(t.code,{children:`color:#fff`}),`.
Auf der dunklen Fläche wird der Filled-Button über die zusammengesetzte Modifier-Klasse
`,(0,c.jsx)(t.code,{children:`.btn-on-band`}),` invertiert (weißer Hintergrund, Text in der Bereichsfarbe), die
Komponente setzt diese Klassen direkt (`,(0,c.jsx)(t.code,{children:`cds-button`}),` kennt zwar den Modifier, kann aber
keinen `,(0,c.jsx)(t.code,{children:`<a>`}),` rendern, siehe `,(0,c.jsx)(t.code,{children:`cta-band.component.ts`}),`). Die Aktion führt in der
Regel auf die adaptive Kontaktseite (`,(0,c.jsx)(t.code,{children:`data-ep="kontakt"`}),`), nie auf ein Overlay oder
Modal. Bewusst nur EINE Aktion, kein `,(0,c.jsx)(t.code,{children:`secondaryLabel`}),`: keines der 22
Mockup-Vorkommen zeigt eine zweite, und `,(0,c.jsx)(t.code,{children:`.btn-on-band`}),` lässt sich mit den
vorhandenen CSS-Klassen ohnehin nicht in einer zurückhaltenderen zweiten Variante
bauen (jede Nicht-`,(0,c.jsx)(t.code,{children:`filled`}),`-Variante würde Text in Bandfarbe auf Bandfarbe zeigen).`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<div cdsCtaBand
     heading="Erstgespräch, 30 Minuten, kostenfrei."
     sub="Du schilderst Deine Situation, wir geben eine erste Einschätzung."
     primaryLabel="Termin buchen"
     primaryHref="/kontakt"
     style="background:var(--co-700);color:#fff">
</div>
`})}),`
`,(0,c.jsx)(t.h3,{id:`editorial-split-bauteillos`,children:`Editorial Split (bauteillos)`}),`
`,(0,c.jsxs)(t.p,{children:[`Ruhige 2-Spalten-Aufteilung in einer normalen `,(0,c.jsx)(t.code,{children:`.ep-section`}),`: links ein Foto im
4:3-Format mit `,(0,c.jsx)(t.code,{children:`--r-md`}),`, rechts Eyebrow, H2, Lead und Button. Kein Card-Container, kein
Schatten, keine Border. Bühne entsteht über die Hintergrundfarbe der Sektion
(typischerweise `,(0,c.jsx)(t.code,{children:`--co-50`}),` oder `,(0,c.jsx)(t.code,{children:`--n-50`}),`) und über das Foto links, nicht über
Card-Chrome, das dem Markenwert „Ruhig“ widerspräche.`]}),`
`,(0,c.jsx)(r,{titel:`Call-to-Action-Sektion mit Bild`,children:(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<div class="ep-section" style="background:var(--co-50)">
  <div class="layout-grid" style="align-items:center">
    <div class="col-6">
      <img src="platzhalter.svg" alt="Beschreibend"
           style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:var(--r-md)">
    </div>
    <div class="col-6">
      <div class="ep-section-label t-co">Karriere</div>
      <h2 class="ep-section-h2">Dein Fußabdruck bei Conciso.</h2>
      <p class="ep-section-sub">Projekte mit Wirkung, ein Team, das füreinander einsteht.</p>
      <button class="btn btn-filled btn-co">Stellen entdecken</button>
    </div>
  </div>
</div>
`})})}),`
`,(0,c.jsx)(t.h2,{id:`barrierefreiheit`,children:`Barrierefreiheit`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Aspekt`}),(0,c.jsx)(t.th,{children:`Regel`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Button-Label`}),(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`aria-label`}),` mit Dateiname und Format auf dem Download-Button setzen (zum Beispiel „Figma-Bibliothek herunterladen (Figma, 48 MB)“), der Text „Herunterladen“ allein nennt kein Ziel`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Format- und Größenangabe`}),(0,c.jsx)(t.td,{children:`Dateiformat und Dateigröße immer sichtbar im Markup, nicht nur im Button-Label`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Brand Area`}),(0,c.jsx)(t.td,{children:`Bereichsfarbe des zugehörigen Dokuments nutzen, keine bereichsfremde Farbe`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Kontrast auf Bereichsfläche`}),(0,c.jsxs)(t.td,{children:[`Der Filled-Button wird auf der farbigen Fläche des Page-End-CTA-Band über `,(0,c.jsx)(t.code,{children:`.btn-on-band`}),` invertiert (weißer Hintergrund, Text in Bereichsfarbe); ohne Inversion würde der Button auf der eigenen Bereichsfarbe stehen und Kontrast verlieren`]})]})]})]}),`
`,(0,c.jsx)(t.h2,{id:`dos--donts`,children:`Dos & Don'ts`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Dateiformat und -größe immer angeben, Nutzer sollen vor dem Download wissen, was sie erhalten`}),`
`,(0,c.jsx)(t.li,{children:`Brand-Area-Farbe des zugehörigen Dokuments verwenden, stärkt die visuelle Zugehörigkeit`}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`aria-label`}),` auf dem Button setzen, zum Beispiel „Figma-Bibliothek herunterladen (Figma, 48 MB)“`]}),`
`,(0,c.jsx)(t.li,{children:`Pro Seite maximal einen Hero-CTA, mehrere Hero-Blöcke erzeugen visuelle Konkurrenz`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Nicht tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Download-Button ohne Format und Größe, erhöht die kognitive Last und bricht Vertrauen`}),`
`,(0,c.jsx)(t.li,{children:`Hero-Variante für unwichtige Sekundär-Downloads, die Größe signalisiert Wichtigkeit`}),`
`,(0,c.jsx)(t.li,{children:`Generisches „Herunterladen“ ohne Dateinamen, schlecht für Screenreader und Kontext`}),`
`,(0,c.jsx)(t.li,{children:`Bereichsfremde Farbe für ein Dokument verwenden, bricht den thematischen Zusammenhang`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`verwandte-seiten`,children:`Verwandte Seiten`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Komponenten/Call to Action/CTA-Band (Story, deckt `,(0,c.jsx)(t.code,{children:`CtaBand`}),` ab)`]}),`
`,(0,c.jsx)(t.li,{children:`Komponenten/Call to Action/DownloadCta (Story, deckt alle vier Download-Varianten ab)`}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var c;function init_cta_verwendung(){return(init_cta_verwendung=e((()=>{c=t(),r(),i(),o()})))()}init_cta_verwendung();export{MDXContent as default};