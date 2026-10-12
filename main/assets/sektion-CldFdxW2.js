import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n}from"./blocks-CgfgLRYg.js";import{s as r}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i,r as a}from"./react-C77DJ2jK.js";import{n as o,t as s}from"./section.stories-BKL4LxJl.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...i(),...e.components},{HtmlBeispiel:r}=t;return r||_missingMdxReference(`HtmlBeispiel`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{of:o,name:`Verwendung`}),`
`,(0,c.jsx)(t.h1,{id:`sektion`,children:`Sektion`}),`
`,(0,c.jsxs)(t.p,{children:[`Das strukturelle Gerüst, in dem auf den Beispielseiten praktisch jeder andere
Baustein sitzt: `,(0,c.jsx)(t.code,{children:`.ep-section`}),` mit dem optionalen Kopf-Trio aus Kicker, Überschrift
und Lead. 133 Vorkommen in den Beispielseiten, 85 davon mit Kopfzeile. Das
Angular-Bauteil ist `,(0,c.jsx)(t.code,{children:`Komponenten/Sektion/Sektion`}),` (`,(0,c.jsx)(t.code,{children:`[cdsSection]`}),`).`]}),`
`,(0,c.jsx)(t.h2,{id:`aufbau`,children:`Aufbau`}),`
`,(0,c.jsxs)(t.p,{children:[`Drei Klassen bilden den Kopf: `,(0,c.jsx)(t.code,{children:`.ep-section-label`}),` (Kicker, bereichsfärbbar über
`,(0,c.jsx)(t.code,{children:`.t-co`}),` / `,(0,c.jsx)(t.code,{children:`.t-ki`}),` / `,(0,c.jsx)(t.code,{children:`.t-es`}),` / `,(0,c.jsx)(t.code,{children:`.t-wo`}),`), `,(0,c.jsx)(t.code,{children:`.ep-section-h2`}),` (Überschrift) und
`,(0,c.jsx)(t.code,{children:`.ep-section-sub`}),` (Lead). Alle drei sind Beiwerk: Eine Sektion besteht auch ganz
ohne Kopf, nur aus ihrem Inhalt darunter.`]}),`
`,(0,c.jsx)(r,{titel:`Sektion mit Label und Überschrift`,children:(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<div class="ep-section" style="background:var(--n-50)">
  <div class="ep-section-label t-co">Was wir tun</div>
  <h2 class="ep-section-h2">So ist eine Sektion aufgebaut.</h2>
  <p class="ep-section-sub">Kicker, Überschrift und Lead sind Beiwerk, der Inhalt darunter ist frei.</p>
  <!-- beliebiger Inhalt -->
</div>
`})})}),`
`,(0,c.jsx)(t.h2,{id:`angular-wrapper`,children:`Angular-Wrapper`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`[cdsSection]`}),` ist ein Attributselektor statt eines eigenen Elements
(`,(0,c.jsx)(t.code,{children:`docs/adr/0008-selektortyp-der-wrapper-komponenten.md`}),`). Der
Konsument wählt das Tag: `,(0,c.jsx)(t.code,{children:`<section cdsSection>`}),` oder `,(0,c.jsx)(t.code,{children:`<div cdsSection>`}),`. Die
Komponente setzt `,(0,c.jsx)(t.code,{children:`aria-labelledby`}),`, wenn ein zugänglicher Name verfügbar ist:
entweder die eigene Überschrift oder eine per `,(0,c.jsx)(t.code,{children:`labelledBy`}),` übergebene id einer
Überschrift außerhalb der Komponente. Fehlt beides, setzt sie kein
`,(0,c.jsx)(t.code,{children:`aria-labelledby`}),`.`]}),`
`,(0,c.jsx)(t.h2,{id:`verwendung`,children:`Verwendung`}),`
`,(0,c.jsxs)(t.p,{children:[`Die Fläche gehört der Seite, nicht dem Bauteil. Sektionen wechseln im Rhythmus
zwischen `,(0,c.jsx)(t.code,{children:`--bg-surface`}),` und `,(0,c.jsx)(t.code,{children:`--n-50`}),`, auf einzelnen Sektionsflächen kommt
zusätzlich eine Bereichstönung als Akzent vor. Welche Fläche eine Sektion trägt,
hängt von ihren Nachbarn ab, und nur die Seite kennt diese Nachbarn. Deshalb setzt
`,(0,c.jsx)(t.code,{children:`.ep-section`}),` selbst keinen Hintergrund, und `,(0,c.jsx)(t.code,{children:`[cdsSection]`}),` hat keinen
`,(0,c.jsx)(t.code,{children:`background`}),`-Input: Die Fläche kommt per Klasse oder Inline-Style direkt an das
Element, das `,(0,c.jsx)(t.code,{children:`cdsSection`}),` trägt (`,(0,c.jsx)(t.code,{children:`<section cdsSection style="background:…">`}),`).`]}),`
`,(0,c.jsx)(t.h2,{id:`dos--donts`,children:`Dos & Don'ts`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Die Hintergrundfläche als Klasse oder Style auf dem Element setzen, das `,(0,c.jsx)(t.code,{children:`cdsSection`}),` trägt, im Wechsel mit den Nachbar-Sektionen.`]}),`
`,(0,c.jsx)(t.li,{children:`Kicker, Überschrift und Lead weglassen, wenn eine Sektion keinen eigenen Kopf braucht.`}),`
`,(0,c.jsxs)(t.li,{children:[`Ohne eigene Überschrift `,(0,c.jsx)(t.code,{children:`labelledBy`}),` auf eine vorhandene Überschrift setzen, damit die Sektion einen zugänglichen Namen behält.`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Nicht tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Eine Hintergrundfarbe fest in die Komponente einbauen, sie kennt ihre Nachbar-Sektionen nicht.`}),`
`,(0,c.jsx)(t.li,{children:`Mehrere getönte Sektionen direkt hintereinander setzen, das wirkt schnell bunt statt ruhig.`}),`
`,(0,c.jsxs)(t.li,{children:[`Im Angular-Wrapper `,(0,c.jsx)(t.code,{children:`<section cdsSection>`}),` ohne Überschrift und ohne `,(0,c.jsx)(t.code,{children:`labelledBy`}),` schreiben, wenn `,(0,c.jsx)(t.code,{children:`<div cdsSection>`}),` genügt: die Sektion bliebe für Screenreader ohnehin namenlos, das Tag verspricht aber eine Landmark, die nie entsteht.`]}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var c;function init_sektion(){return(init_sektion=e((()=>{c=r(),a(),t(),s()})))()}init_sektion();export{MDXContent as default};