import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n,s as r}from"./blocks-CgfgLRYg.js";import{s as i}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i as a,r as o}from"./react-C77DJ2jK.js";import{n as s,t as c}from"./topnav.stories-N5R0mgh1.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...a(),...e.components},{HtmlBeispiel:i}=t;return i||_missingMdxReference(`HtmlBeispiel`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n,{of:s,name:`Verwendung`}),`
`,(0,l.jsx)(t.h1,{id:`verwendung`,children:`Verwendung`}),`
`,(0,l.jsxs)(t.p,{children:[`Navigation führt drei Elemente: Topnav, Breadcrumb und Back-to-Top-Button. Nur die
Topnav hat ein eigenes Bauteil (Story `,(0,l.jsx)(t.code,{children:`Topnav`}),`); Breadcrumb und Back-to-Top sind
CSS-Rezepte ohne Angular-Komponente.`]}),`
`,(0,l.jsx)(t.h2,{id:`wann-welches-element`,children:`Wann welches Element`}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Element`}),(0,l.jsx)(t.th,{children:`Bauteil`}),(0,l.jsx)(t.th,{children:`Wann einsetzen`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Topnav`}),(0,l.jsxs)(t.td,{children:[`Story `,(0,l.jsx)(t.code,{children:`Topnav`})]}),(0,l.jsx)(t.td,{children:`Auf jeder Customer-Page als persistente Kopfzeile: Logo, vier Top-Items, Kontakt-CTA`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Breadcrumb`}),(0,l.jsxs)(t.td,{children:[`bauteillos (CSS-Rezept `,(0,l.jsx)(t.code,{children:`.article-breadcrumb`}),`)`]}),(0,l.jsx)(t.td,{children:`Auf Unterseiten ab der zweiten Ebene, zeigt den Pfad von der Startseite zur aktuellen Seite`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Back-to-Top-Button`}),(0,l.jsxs)(t.td,{children:[`bauteillos (CSS-Rezept `,(0,l.jsx)(t.code,{children:`.back-to-top`}),`)`]}),(0,l.jsxs)(t.td,{children:[`Auf jeder Customer-Page, sticky unten rechts, erscheint ab `,(0,l.jsx)(t.code,{children:`scrollY > 400px`})]})]})]})]}),`
`,(0,l.jsx)(t.h2,{id:`topnav-aufbau`,children:`Topnav: Aufbau`}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Element`}),(0,l.jsx)(t.th,{children:`Regel`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Logo`}),(0,l.jsx)(t.td,{children:`Immer ganz links, immer sichtbar, Verlässlichkeit in der ersten Sekunde`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Top-Items`}),(0,l.jsxs)(t.td,{children:[`Vier Einträge: Angewandte KI · Leistungen · Wissen · Unternehmen. „Angewandte KI“, „Leistungen“ und „Unternehmen“ sind Links zur jeweiligen Übersicht mit aufklappbarem Submenü über einen separaten Caret-Button, „Wissen“ ist ein einfacher Link ohne Submenü. Aktiver Eintrag über `,(0,l.jsx)(t.code,{children:`aria-current="page"`})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Aktionen`}),(0,l.jsxs)(t.td,{children:[`Rechts vor dem CTA sitzt der Aktions-Cluster `,(0,l.jsx)(t.code,{children:`.ep-nav-actions`}),` mit zwei Icon-Buttons (`,(0,l.jsx)(t.code,{children:`.ep-nav-icon-btn`}),`): der Suche (Lupe, öffnet ein Disclosure-Popover) und dem Theme-Umschalter (Cycle-Button, siehe `,(0,l.jsx)(t.code,{children:`Komponenten/Theme-Umschalter`}),`). Beide bleiben Corporate-Chrome (Petrol), auch auf Bereichsseiten. Die Suche lässt sich über `,(0,l.jsx)(t.code,{children:`showSearch`}),` abschalten`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`CTA-Button`}),(0,l.jsxs)(t.td,{children:[`Genau ein Outlined-Button, Label „Kontakt“, Brand-Petrol (`,(0,l.jsx)(t.code,{children:`--co-700`}),`), ganz rechts über `,(0,l.jsx)(t.code,{children:`margin-left:auto`})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Layout und Hintergrund`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`.ep-topnav`}),` mit `,(0,l.jsx)(t.code,{children:`--bg-surface`}),`, `,(0,l.jsx)(t.code,{children:`border-bottom:var(--bd)`}),`, Padding `,(0,l.jsx)(t.code,{children:`var(--s4) var(--s8)`}),` (rund 64 px hoch). Ein `,(0,l.jsx)(t.code,{children:`gap`}),`-basierter Flow (kein `,(0,l.jsx)(t.code,{children:`justify-content`}),`) hält die Nav am Logo, der CTA wird per `,(0,l.jsx)(t.code,{children:`margin-left:auto`}),` nach rechts gedrückt, das Layout bleibt stabil, egal wie viele Nav-Items dazukommen`]})]})]})]}),`
`,(0,l.jsx)(t.p,{children:`Das Schema zeigt den Nav-Bar-Wireframe und darunter die zugehörige Callout-Zeile mit den
nummerierten Hinweisen ①②③ zu Logo, Top-Items und Kontakt-Button.`}),`
`,(0,l.jsx)(r,{children:(0,l.jsxs)(`div`,{style:{border:`var(--bd-strong)`,borderRadius:`var(--r-lg)`,overflow:`hidden`,marginBottom:`var(--s8)`},children:[(0,l.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:`var(--s4)`,padding:`0 var(--s6)`,height:`64px`,background:`var(--bg-surface)`,borderBottom:`var(--bd)`},children:[(0,l.jsx)(`div`,{style:{background:`var(--co-700)`,borderRadius:`var(--r-xs)`,padding:`3px 10px`,font:`700 12px/16px var(--font)`,color:`#fff`,flexShrink:0},children:(0,l.jsx)(t.p,{children:`Logo`})}),(0,l.jsxs)(`div`,{style:{display:`flex`,gap:`var(--s5)`,flex:1,alignItems:`center`},children:[(0,l.jsx)(`div`,{style:{display:`inline-flex`,alignItems:`center`,gap:`var(--s1)`,font:`400 12px/16px var(--font)`,color:`var(--tx-secondary)`},children:(0,l.jsxs)(t.p,{children:[`Angewandte KI `,(0,l.jsx)(`span`,{style:{opacity:.5},children:`▾`})]})}),(0,l.jsx)(`div`,{style:{display:`inline-flex`,alignItems:`center`,gap:`var(--s1)`,font:`400 12px/16px var(--font)`,color:`var(--tx-secondary)`},children:(0,l.jsxs)(t.p,{children:[`Leistungen `,(0,l.jsx)(`span`,{style:{opacity:.5},children:`▾`})]})}),(0,l.jsx)(`div`,{style:{font:`400 12px/16px var(--font)`,color:`var(--tx-secondary)`},children:`Wissen`}),(0,l.jsx)(`div`,{className:`t-co`,style:{display:`inline-flex`,alignItems:`center`,gap:`var(--s1)`,font:`600 12px/16px var(--font)`},children:(0,l.jsxs)(t.p,{children:[`Unternehmen `,(0,l.jsx)(`span`,{style:{opacity:.5},children:`▾`})]})})]}),(0,l.jsx)(`div`,{className:`t-co`,style:{border:`1.5px solid var(--co-700)`,borderRadius:`var(--r-full)`,padding:`2px 12px`,font:`600 12px/16px var(--font)`,flexShrink:0},children:(0,l.jsx)(t.p,{children:`Kontakt`})})]}),(0,l.jsxs)(`div`,{style:{display:`flex`,alignItems:`flex-start`,gap:`var(--s4)`,padding:`var(--s3) var(--s6)`,background:`var(--bg-overlay)`},children:[(0,l.jsx)(`div`,{style:{font:`400 12px/16px var(--font)`,color:`var(--tx-muted)`,flexShrink:0,width:`80px`},children:(0,l.jsxs)(t.p,{children:[`① Logo`,(0,l.jsx)(`br`,{}),`immer links`]})}),(0,l.jsx)(`div`,{style:{font:`400 12px/16px var(--font)`,color:`var(--tx-muted)`,flex:1},children:(0,l.jsxs)(t.p,{children:[`② Top-Items · 4 Einträge · „Angewandte KI“, „Leistungen“ und „Unternehmen“ mit aufklappbarem Submenü,
„Wissen“ ohne · aktiver Eintrag in
Brand-Petrol via `,(0,l.jsx)(`code`,{className:`token`,style:{fontSize:`12px`},children:`aria-current="page"`})]})}),(0,l.jsx)(`div`,{style:{font:`400 12px/16px var(--font)`,color:`var(--tx-muted)`,flexShrink:0,textAlign:`right`},children:(0,l.jsxs)(t.p,{children:[`③ Outlined „Kontakt“`,(0,l.jsx)(`br`,{}),`ganz rechts`]})})]})]})}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Aktiv-Markierung:`}),` Aktiver Punkt über `,(0,l.jsx)(t.code,{children:`aria-current="page"`}),` ausgezeichnet und
zusätzlich durch einen nicht-farbigen Indikator bestätigt: Top-Level-Links tragen einen
dezenten Akzent-Unterstrich, Submenü-Einträge eine Tönungsfläche (`,(0,l.jsx)(t.code,{children:`--co-50`}),`) plus
Fettung. Die Markierung hängt also nie allein an der Farbe (WCAG 1.4.1). Nur Hover und
das bloße Aufklappen markieren ausschließlich über Farbe und Caret-Drehung, den
Unterstrich gibt es allein im Aktiv-Zustand.`]}),`
`,(0,l.jsxs)(t.p,{children:[`Auf Bereichsseiten trägt das Submenü die aktive Seite: Hat ein Submenü-Eintrag
`,(0,l.jsx)(t.code,{children:`aria-current="page"`}),`, erhält auch der Label-Link seines Top-Items (zum Beispiel
„Leistungen“) denselben Petrol-Unterstrich wie ein direkt aktiver Top-Level-Link. Das
löst reines CSS über `,(0,l.jsx)(t.code,{children:`:has()`}),` am `,(0,l.jsx)(t.code,{children:`.ep-nav-has-sub`}),`, ein Skript ist dafür nicht nötig. So
zeigt die Navigation auch dann, in welchem Bereich Nutzende gerade sind, wenn das
Submenü geschlossen ist.`]}),`
`,(0,l.jsx)(t.h2,{id:`topnav-dropdowns-disclosure-pattern`,children:`Topnav-Dropdowns: Disclosure-Pattern`}),`
`,(0,l.jsxs)(t.p,{children:[`Jedes Top-Item mit Submenü besteht aus zwei getrennten Bedienelementen: dem Label-Link
(`,(0,l.jsx)(t.code,{children:`.ep-nav-btn`}),`, ein echtes `,(0,l.jsx)(t.code,{children:`<a>`}),`), der direkt zur Übersichtsseite navigiert, und einem
separaten Caret-Button (`,(0,l.jsx)(t.code,{children:`.ep-nav-item-toggle`}),`), der ausschließlich das Submenü öffnet
und schließt. Es ist ein Disclosure-Pattern aus Links, kein Menü-Widget, deshalb bewusst
ohne `,(0,l.jsx)(t.code,{children:`aria-haspopup`}),`.`]}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`aria-expanded`}),` (`,(0,l.jsx)(t.code,{children:`true`}),`/`,(0,l.jsx)(t.code,{children:`false`}),`) und `,(0,l.jsx)(t.code,{children:`aria-controls`}),` sitzen auf dem Caret-Button; die JS-Klasse `,(0,l.jsx)(t.code,{children:`.is-open`}),` markiert das geöffnete `,(0,l.jsx)(t.code,{children:`.ep-nav-has-sub`}),`.`]}),`
`,(0,l.jsxs)(t.li,{children:[`Geöffnet wird per Klick/Tap, Tastatur (`,(0,l.jsx)(t.code,{children:`Enter`}),`/`,(0,l.jsx)(t.code,{children:`Space`}),` auf dem Caret) oder, nur auf Geräten mit echtem Hover (`,(0,l.jsx)(t.code,{children:`pointer:fine`}),`), per Hover (JS-gesteuert mit Intent-Verzögerung und unsichtbarer Brücke über den Gap, WCAG 1.4.13).`]}),`
`,(0,l.jsxs)(t.li,{children:[`Pfeiltasten (`,(0,l.jsx)(t.code,{children:`↓`}),`/`,(0,l.jsx)(t.code,{children:`↑`}),`) sowie `,(0,l.jsx)(t.code,{children:`Home`}),`/`,(0,l.jsx)(t.code,{children:`End`}),` navigieren die Einträge innerhalb des geöffneten Submenüs.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`Escape`}),` schließt das Submenü und gibt den Fokus auf den Caret zurück; ein Klick außerhalb oder eine Navigation schließen ebenfalls. Heraustabben (der Fokus verlässt das Submenü) schließt es ebenfalls.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsxs)(t.strong,{children:[`Kein reines CSS-`,(0,l.jsx)(t.code,{children:`:hover`}),`-Öffnen:`]}),` Der Reveal hängt immer an `,(0,l.jsx)(t.code,{children:`.is-open`}),`, damit `,(0,l.jsx)(t.code,{children:`aria-expanded`}),` mitläuft.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Nie zwei Menüs gleichzeitig offen:`}),` Vor jedem Öffnen ruft das JS `,(0,l.jsx)(t.code,{children:`closeAllNavItems`}),`.`]}),`
`,(0,l.jsx)(t.li,{children:`Der Label-Link navigiert unverändert direkt zur Übersicht, nur der Caret-Button klappt auf; ein Klick auf das Label öffnet oder schließt kein Menü.`}),`
`,(0,l.jsx)(t.li,{children:`Mobil (ab 760 px und darunter): ein Hamburger-Button wird injiziert, Submenüs öffnen dort inline statt als schwebendes Overlay.`}),`
`,(0,l.jsx)(t.li,{children:`Der Caret-Button hat eine eigene Hit-Area ≥ 24 px (WCAG 2.5.8); mobil liegen Label und Caret in einer Zeile mit ≥ 44 px Tap-Fläche.`}),`
`]}),`
`,(0,l.jsx)(t.h2,{id:`breadcrumb`,children:`Breadcrumb`}),`
`,(0,l.jsxs)(t.p,{children:[`Auf Unterseiten (zweite Ebene und tiefer) sitzt über dem Inhalt eine Breadcrumb-Leiste
(`,(0,l.jsx)(t.code,{children:`.article-breadcrumb`}),`). Sie zeigt den Pfad von der Startseite bis zur aktuellen Seite;
das letzte Element ist die aktuelle Seite, trägt `,(0,l.jsx)(t.code,{children:`aria-current="page"`}),` und ist kein
Link.`]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Aspekt`}),(0,l.jsx)(t.th,{children:`Regel`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Hülle`}),(0,l.jsxs)(t.td,{children:[`Eigene `,(0,l.jsx)(t.code,{children:`.ep-section`}),` mit `,(0,l.jsx)(t.code,{children:`padding-block:var(--s5)`}),` und `,(0,l.jsx)(t.code,{children:`--bg-surface`}),`, direkt unter der Topnav; das `,(0,l.jsx)(t.code,{children:`<nav>`}),` mit `,(0,l.jsx)(t.code,{children:`margin-bottom:0`})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Ausrichtung`}),(0,l.jsx)(t.td,{children:`Immer linksbündig, auch auf redaktionellen Seiten (Wissensbeitrag, Stellen-Detail). Titel und Lead dürfen darunter zentriert sein, der Breadcrumb bleibt links`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Pfad`}),(0,l.jsxs)(t.td,{children:[`Startseite → … → aktuelle Seite; Trenner `,(0,l.jsx)(t.code,{children:`.article-breadcrumb-sep`}),` (dekorativ, `,(0,l.jsx)(t.code,{children:`aria-hidden`}),`); letztes Element `,(0,l.jsx)(t.code,{children:`aria-current="page"`}),`, ohne Link`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Nicht`}),(0,l.jsxs)(t.td,{children:[`Den Breadcrumb nicht in einen zentrierten `,(0,l.jsx)(t.code,{children:`.article-header`}),` einbetten, sonst wird er mittig ausgerichtet und bekommt einen abweichenden Abstand zur Nav`]})]})]})]}),`
`,(0,l.jsx)(t.h2,{id:`back-to-top-button`,children:`Back-to-Top-Button`}),`
`,(0,l.jsxs)(t.p,{children:[`Globaler Page-Button, der nach `,(0,l.jsx)(t.code,{children:`scrollY > 400px`}),` sanft eingeblendet wird und beim Klick
smooth zum Seitenanfang scrollt. Sitzt sticky unten rechts (`,(0,l.jsx)(t.code,{children:`position:fixed`}),`), damit er
auf langen Seiten ohne Scrollen erreichbar bleibt; typischer Anwendungsfall:
Wissensbeiträge, Bereichsseiten, Listen-Übersichten. Gehört auf jede Customer-Page, auch
Landing-Pages, Detailseiten und Beispielartikel.`]}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`aria-label="Nach oben scrollen"`}),`, der reine Caret-Icon-Button braucht eine textuelle Beschriftung.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`type="button"`}),`, verhindert Submit-Verhalten in einem Form-Kontext.`]}),`
`,(0,l.jsxs)(t.li,{children:[`Tastatur: per `,(0,l.jsx)(t.code,{children:`Tab`}),` erreichbar, `,(0,l.jsx)(t.code,{children:`Enter`}),`/`,(0,l.jsx)(t.code,{children:`Space`}),` löst aus, keine zusätzliche ARIA-Rolle nötig (natives `,(0,l.jsx)(t.code,{children:`<button>`}),`).`]}),`
`,(0,l.jsxs)(t.li,{children:[`Reduced Motion: bei `,(0,l.jsx)(t.code,{children:`prefers-reduced-motion: reduce`}),` springt die Seite ohne Smooth-Scroll-Animation an den Anfang (WCAG 2.3.3).`]}),`
`,(0,l.jsx)(t.li,{children:`Touch-Target: 44×44 px erfüllt WCAG 2.5.5 (Target Size).`}),`
`,(0,l.jsxs)(t.li,{children:[`Fokus-Ring: `,(0,l.jsx)(t.code,{children:`var(--focus-ring)`}),` bei Tastaturfokus, sichtbar gegen den weißen Hintergrund und gegen farbige Inhalte.`]}),`
`]}),`
`,(0,l.jsx)(t.h2,{id:`barrierefreiheit`,children:`Barrierefreiheit`}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Aspekt`}),(0,l.jsx)(t.th,{children:`Regel`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Semantik`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`<nav>`}),` mit `,(0,l.jsx)(t.code,{children:`aria-label="Hauptnavigation"`}),`, wenn mehrere Navigationsbereiche auf einer Seite stehen, listen Screenreader alle Landmarks auf`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Aktiver Eintrag`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`aria-current="page"`}),` auf dem aktiven Nav-Link setzen, der visuelle Active-State allein ist für Screenreader nicht erkennbar`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Tastatur`}),(0,l.jsxs)(t.td,{children:[`Alle Nav-Items per `,(0,l.jsx)(t.code,{children:`Tab`}),`; `,(0,l.jsx)(t.code,{children:`Enter`}),`/`,(0,l.jsx)(t.code,{children:`Space`}),` öffnet das Submenü; `,(0,l.jsx)(t.code,{children:`↓`}),`/`,(0,l.jsx)(t.code,{children:`↑`}),` und `,(0,l.jsx)(t.code,{children:`Home`}),`/`,(0,l.jsx)(t.code,{children:`End`}),` navigieren die Einträge; `,(0,l.jsx)(t.code,{children:`Esc`}),` schließt (Fokus zurück zum Toggle), vollständig ohne Maus bedienbar`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Dropdown-Zustand`}),(0,l.jsxs)(t.td,{children:[`Das Label ist ein `,(0,l.jsx)(t.code,{children:`<a>`}),`-Link zur Übersicht; ein separater Caret-`,(0,l.jsx)(t.code,{children:`<button>`}),` trägt per JS `,(0,l.jsx)(t.code,{children:`aria-expanded`}),` und `,(0,l.jsx)(t.code,{children:`aria-controls`}),` auf das Submenü (Disclosure aus Links, kein Menü-Widget, daher kein `,(0,l.jsx)(t.code,{children:`aria-haspopup`}),`); geöffnet wird per Klick/Tastatur und, additiv nur auf `,(0,l.jsx)(t.code,{children:`pointer:fine`}),`, per Hover (JS-gesteuert über `,(0,l.jsx)(t.code,{children:`.is-open`}),`, nie rein per CSS-`,(0,l.jsx)(t.code,{children:`:hover`}),`)`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Suche`}),(0,l.jsxs)(t.td,{children:[`Der Such-Toggle ist ein `,(0,l.jsx)(t.code,{children:`<button type="button">`}),` mit `,(0,l.jsx)(t.code,{children:`aria-label`}),` und `,(0,l.jsx)(t.code,{children:`aria-expanded`}),`, das Label wechselt mit dem Zustand („Suche öffnen“, geöffnet „Suche schließen“), `,(0,l.jsx)(t.code,{children:`aria-controls`}),` verweist auf das Popover. Das Formular trägt `,(0,l.jsx)(t.code,{children:`role="search"`}),`, das Feld ein per `,(0,l.jsx)(t.code,{children:`.sr-only`}),` verstecktes Label „Suchbegriff“, `,(0,l.jsx)(t.code,{children:`type="search"`}),` und `,(0,l.jsx)(t.code,{children:`autocomplete="off"`}),`. `,(0,l.jsx)(t.code,{children:`Esc`}),` schließt das Popover und gibt den Fokus an den Toggle zurück, wenn er im Popover lag; ein Klick außerhalb schließt ohne Fokusumzug, Heraustabben schließt ebenfalls`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Mobile Navigation`}),(0,l.jsxs)(t.td,{children:[`Der Hamburger-Button ist ein `,(0,l.jsx)(t.code,{children:`<button type="button">`}),` mit `,(0,l.jsx)(t.code,{children:`aria-expanded`}),`, `,(0,l.jsx)(t.code,{children:`aria-controls`}),` auf die Link-Liste und wechselndem `,(0,l.jsx)(t.code,{children:`aria-label`}),` („Menü öffnen“, „Menü schließen“). Beide Icons sind `,(0,l.jsx)(t.code,{children:`aria-hidden`})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Skip-Link`}),(0,l.jsx)(t.td,{children:`„Zum Inhalt springen“-Link als erstes fokussierbares Element, ermöglicht Tastaturnutzern das Überspringen langer Navigationen`})]})]})]}),`
`,(0,l.jsx)(t.h2,{id:`topnav-dropdowns--nur-css-schicht`,children:`Topnav-Dropdowns · Nur CSS-Schicht`}),`
`,(0,l.jsxs)(t.p,{children:[`Wer nur die CSS-Schicht verwendet, setzt dieses Markup ein. Label-Link und Caret-Button sind zwei Bedienelemente, das Submenü steht als Geschwister daneben. Im Ausgangszustand ist `,(0,l.jsx)(t.code,{children:`aria-expanded`}),` `,(0,l.jsx)(t.code,{children:`false`}),` und `,(0,l.jsx)(t.code,{children:`.is-open`}),` nicht gesetzt.`]}),`
`,(0,l.jsx)(i,{titel:`Topnav mit Submenü als reines Markup`,interaktiv:!0,children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-html`,children:`<header class="ep-topnav">
  <a class="ep-logo" href="/">conciso.</a>
  <nav class="ep-nav-links" aria-label="Hauptnavigation">
    <div class="ep-nav-item ep-nav-has-sub">
      <a class="ep-nav-btn" href="/leistungen">Leistungen</a>
      <button class="ep-nav-item-toggle" type="button" aria-label="Untermenü Leistungen" aria-expanded="false" aria-controls="nav-sub-leistungen">
        <svg class="ep-nav-item-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6"/></svg>
      </button>
      <div class="ep-nav-sub" id="nav-sub-leistungen">
        <a class="ep-nav-sub-btn" href="/leistungen/angewandte-ki">Angewandte KI</a>
        <a class="ep-nav-sub-btn" href="/leistungen/effektive-software">Effektive Software</a>
        <a class="ep-nav-sub-btn" href="/leistungen/wirksame-organisationen">Wirksame Organisationen</a>
      </div>
    </div>
    <a class="ep-nav-btn" href="/wissen" aria-current="page">Wissen</a>
  </nav>
</header>
`})})}),`
`,(0,l.jsx)(t.p,{children:`Jede Umsetzung ergänzt das Verhalten, das das CSS nicht liefert:`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Zustand:`}),` `,(0,l.jsx)(t.code,{children:`.is-open`}),` am `,(0,l.jsx)(t.code,{children:`.ep-nav-has-sub`}),` und `,(0,l.jsx)(t.code,{children:`aria-expanded`}),` am Caret wechseln immer gemeinsam. Das Submenü erscheint nur über `,(0,l.jsx)(t.code,{children:`.is-open`}),`, nie über reines `,(0,l.jsx)(t.code,{children:`:hover`}),`. `,(0,l.jsx)(t.code,{children:`aria-controls`}),` verweist auf eine eindeutige `,(0,l.jsx)(t.code,{children:`id`}),` des Submenüs.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Öffnen und Schließen:`}),` Klick, `,(0,l.jsx)(t.code,{children:`Enter`}),` und `,(0,l.jsx)(t.code,{children:`Space`}),` auf dem Caret schalten um. Der Label-Link navigiert und schaltet nichts.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Ein Menü zugleich:`}),` Vor jedem Öffnen werden alle anderen Submenüs geschlossen.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Pfeiltasten:`}),` `,(0,l.jsx)(t.code,{children:`↓`}),` auf einem geschlossenen Item öffnet das Menü und fokussiert den ersten Eintrag. Im offenen Menü geht `,(0,l.jsx)(t.code,{children:`↓`}),` zum nächsten Eintrag, am letzten springt der Fokus zum ersten (Umlauf). `,(0,l.jsx)(t.code,{children:`↑`}),` geht rückwärts, am ersten Eintrag oder ohne Fokus im Menü springt der Fokus zum letzten. `,(0,l.jsx)(t.code,{children:`↑`}),`, `,(0,l.jsx)(t.code,{children:`Home`}),` und `,(0,l.jsx)(t.code,{children:`End`}),` wirken nur bei geöffnetem Menü, `,(0,l.jsx)(t.code,{children:`Home`}),` fokussiert den ersten, `,(0,l.jsx)(t.code,{children:`End`}),` den letzten Eintrag. Das Standardverhalten der Taste wird unterdrückt.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Escape:`}),` Schließt das Submenü. Lag der Fokus im Submenü, kehrt er zum Caret zurück, sonst bleibt er, wo er ist. Escape schließt auch ein Menü, das nur per Hover offen ist, auch wenn der Fokus nicht darin liegt (WCAG 1.4.13, schließbar).`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Außenklick und Navigation:`}),` Ein Klick außerhalb und ein Klick auf einen Eintrag schließen die Menüs. Der Außenklick verschiebt den Fokus nicht. Heraustabben (der Fokus verlässt das Menü) schließt es ebenfalls.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Hover (optional):`}),` Nur auf Geräten mit echtem Hover (`,(0,l.jsx)(t.code,{children:`pointer:fine`}),`). Öffnen mit 100 ms Verzögerung, Schließen mit 250 ms, damit der Weg über den Abstand ins Menü die Brücke bleibt. Ein Klick auf den Caret bricht beide Timer ab, sonst öffnet ein Rest-Timer ein per Klick geschlossenes Menü wieder.`]}),`
`]}),`
`,(0,l.jsx)(t.h2,{id:`mobile-navigation--nur-css-schicht`,children:`Mobile Navigation · Nur CSS-Schicht`}),`
`,(0,l.jsxs)(t.p,{children:[`Unter 760 px zeigt das CSS den Hamburger-Button und klappt `,(0,l.jsx)(t.code,{children:`.ep-nav-links`}),` unter dem Logo auf, sobald `,(0,l.jsx)(t.code,{children:`.nav-open`}),` am `,(0,l.jsx)(t.code,{children:`.ep-topnav`}),` steht. Wer nur die CSS-Schicht verwendet, setzt den Button selbst ins Markup, ein Skript fügt ihn nicht ein. Er steht vor der Link-Liste im `,(0,l.jsx)(t.code,{children:`.ep-topnav`}),` und ist über 760 px ausgeblendet.`]}),`
`,(0,l.jsx)(i,{titel:`Topnav mit Hamburger-Button als reines Markup`,interaktiv:!0,children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-html`,children:`<header class="ep-topnav">
  <a class="ep-logo" href="/">conciso.</a>
  <button class="ep-nav-burger" type="button" aria-label="Menü öffnen" aria-expanded="false" aria-controls="nav-links">
    <svg class="icon-menu" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path stroke-linecap="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg>
    <svg class="icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>
  </button>
  <nav class="ep-nav-links" id="nav-links" aria-label="Hauptnavigation">
    <a class="ep-nav-btn" href="/leistungen">Leistungen</a>
    <a class="ep-nav-btn" href="/wissen" aria-current="page">Wissen</a>
  </nav>
</header>
`})})}),`
`,(0,l.jsx)(t.p,{children:`Jede Umsetzung ergänzt das Verhalten, das das CSS nicht liefert:`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Schalten:`}),` Ein Klick auf den Button schaltet `,(0,l.jsx)(t.code,{children:`.nav-open`}),` am `,(0,l.jsx)(t.code,{children:`.ep-topnav`}),` um und setzt `,(0,l.jsx)(t.code,{children:`aria-expanded`}),` sowie das `,(0,l.jsx)(t.code,{children:`aria-label`}),` („Menü öffnen“ oder „Menü schließen“) passend dazu. `,(0,l.jsx)(t.code,{children:`aria-controls`}),` verweist auf die `,(0,l.jsx)(t.code,{children:`id`}),` der Link-Liste.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Button:`}),` `,(0,l.jsx)(t.code,{children:`type="button"`}),`, damit er in einem Formular nichts absendet. Beide Icons sind `,(0,l.jsx)(t.code,{children:`aria-hidden`}),` und nicht fokussierbar.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Schließen:`}),` Escape und ein Klick außerhalb schließen das Menü. Lag der Fokus in der Link-Liste, kehrt er bei Escape zum Button zurück.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Link-Klick:`}),` Ein Klick auf einen Link in der Liste schließt das offene Mobilmenü und setzt `,(0,l.jsx)(t.code,{children:`.nav-open`}),`, `,(0,l.jsx)(t.code,{children:`aria-expanded`}),` und `,(0,l.jsx)(t.code,{children:`aria-label`}),` zurück.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Breakpoint:`}),` Den Button blendet das CSS über 760 px aus, dort hat `,(0,l.jsx)(t.code,{children:`.nav-open`}),` keine Wirkung. Submenüs öffnen im Mobilmenü inline statt als Overlay, ihr Verhalten steht unter „Topnav-Dropdowns“.`]}),`
`]}),`
`,(0,l.jsx)(t.h2,{id:`topnav-suche--nur-css-schicht`,children:`Topnav-Suche · Nur CSS-Schicht`}),`
`,(0,l.jsxs)(t.p,{children:[`Das Such-Popover erscheint, sobald `,(0,l.jsx)(t.code,{children:`.is-open`}),` am `,(0,l.jsx)(t.code,{children:`.ep-nav-search`}),` steht. Wer nur die CSS-Schicht verwendet, setzt Toggle und Popover selbst ins Markup und lässt sie in `,(0,l.jsx)(t.code,{children:`.ep-nav-actions`}),` rechts vor dem CTA stehen.`]}),`
`,(0,l.jsx)(i,{titel:`Such-Toggle mit Popover als reines Markup`,interaktiv:!0,children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-html`,children:`<div class="ep-nav-actions">
  <div class="ep-nav-search">
    <button class="ep-nav-icon-btn ep-nav-search-toggle" type="button" aria-label="Suche öffnen" aria-expanded="false" aria-controls="nav-search-pop">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"/></svg>
    </button>
    <div class="ep-nav-search-pop" id="nav-search-pop">
      <form class="ep-nav-search-form" role="search" action="/suche">
        <label class="sr-only" for="nav-search-input">Suchbegriff</label>
        <input class="ep-nav-search-input" id="nav-search-input" type="search" name="q" placeholder="Wonach suchst Du?" autocomplete="off">
        <button class="btn btn-filled btn-sm btn-co" type="submit">Suchen</button>
      </form>
    </div>
  </div>
</div>
`})})}),`
`,(0,l.jsx)(t.p,{children:`Jede Umsetzung ergänzt das Verhalten, das das CSS nicht liefert:`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Zustand:`}),` `,(0,l.jsx)(t.code,{children:`.is-open`}),` am `,(0,l.jsx)(t.code,{children:`.ep-nav-search`}),`, `,(0,l.jsx)(t.code,{children:`aria-expanded`}),` und `,(0,l.jsx)(t.code,{children:`aria-label`}),` am Toggle („Suche öffnen“ oder „Suche schließen“) wechseln immer gemeinsam. `,(0,l.jsx)(t.code,{children:`aria-controls`}),` verweist auf die `,(0,l.jsx)(t.code,{children:`id`}),` des Popovers.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Ein Popup zugleich:`}),` Das Öffnen der Suche schließt offene Submenüs, das Öffnen eines Submenüs schließt die Suche.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Escape:`}),` Schließt das Popover. Lag der Fokus darin, kehrt er zum Toggle zurück.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Außenklick:`}),` Schließt das Popover, ohne den Fokus umzusetzen. Heraustabben (der Fokus verlässt das Popover) schließt es ebenfalls.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Formular:`}),` `,(0,l.jsx)(t.code,{children:`role="search"`}),`, das Feld mit sichtbar versteckter Beschriftung „Suchbegriff“ (`,(0,l.jsx)(t.code,{children:`.sr-only`}),`), `,(0,l.jsx)(t.code,{children:`type="search"`}),` und `,(0,l.jsx)(t.code,{children:`autocomplete="off"`}),`. Absenden geht an die globale Suche des Produkts, nicht an einen Platzhalter.`]}),`
`]}),`
`,(0,l.jsx)(t.h2,{id:`back-to-top--nur-css-schicht`,children:`Back-to-Top · Nur CSS-Schicht`}),`
`,(0,l.jsxs)(t.p,{children:[`Das CSS blendet `,(0,l.jsx)(t.code,{children:`.back-to-top`}),` standardmäßig aus, `,(0,l.jsx)(t.code,{children:`visibility:hidden`}),` nimmt den Button zugleich aus der Tab-Reihenfolge. Erst `,(0,l.jsx)(t.code,{children:`.visible`}),` zeigt ihn. Der Button steht direkt vor `,(0,l.jsx)(t.code,{children:`</body>`}),`. Im Beispiel steht `,(0,l.jsx)(t.code,{children:`position:static`}),` und `,(0,l.jsx)(t.code,{children:`visible`}),` fest, damit die Vorschau Platz belegt und den Button zeigt; im Produkt bleibt es bei `,(0,l.jsx)(t.code,{children:`position:fixed`}),` aus dem CSS und `,(0,l.jsx)(t.code,{children:`.visible`}),` setzt das Skript.`]}),`
`,(0,l.jsx)(i,{titel:`Back-to-Top-Button als reines Markup`,interaktiv:!0,children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-html`,children:`<button class="back-to-top visible" type="button" aria-label="Nach oben scrollen" style="position:static">
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>
</button>
`})})}),`
`,(0,l.jsx)(t.p,{children:`Jede Umsetzung ergänzt das Verhalten, das das CSS nicht liefert:`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Einblenden:`}),` Ein Scroll-Listener schaltet `,(0,l.jsx)(t.code,{children:`.visible`}),` ab `,(0,l.jsx)(t.code,{children:`scrollY > 400`}),`. Der Listener ist `,(0,l.jsx)(t.code,{children:`passive`}),`, er blockiert das Scrollen nicht.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Klick:`}),` Der Klick-Handler scrollt mit `,(0,l.jsx)(t.code,{children:`window.scrollTo({ top: 0 })`}),` zum Seitenanfang, sanft (`,(0,l.jsx)(t.code,{children:`behavior: 'smooth'`}),`).`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.strong,{children:`Reduced Motion:`}),` Bei `,(0,l.jsx)(t.code,{children:`prefers-reduced-motion: reduce`}),` springt die Seite ohne Animation (`,(0,l.jsx)(t.code,{children:`behavior: 'auto'`}),`).`]}),`
`]}),`
`,(0,l.jsx)(t.h2,{id:`dos--donts`,children:`Dos & Don'ts`}),`
`,(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:`Tun`})}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[`Aktiven Eintrag über `,(0,l.jsx)(t.code,{children:`aria-current="page"`}),` und zusätzlich einen nicht-farbigen Indikator markieren (Unterstrich beziehungsweise Tönungsfläche plus Fettung), nie nur über Farbe (WCAG 1.4.1)`]}),`
`,(0,l.jsxs)(t.li,{children:[`Genau einen Outlined-Kontakt-Button ganz rechts, per `,(0,l.jsx)(t.code,{children:`margin-left:auto`}),` vom Nav-Flow abgesetzt`]}),`
`,(0,l.jsx)(t.li,{children:`Label-Link und Caret-Button als getrennte Bedienelemente führen: Label navigiert, Caret klappt auf`}),`
`,(0,l.jsx)(t.li,{children:`Breadcrumb immer linksbündig setzen, auch wenn Titel und Lead darunter zentriert sind`}),`
`,(0,l.jsxs)(t.li,{children:[`Back-to-Top auf jeder Customer-Page einbinden, inklusive Fallback auf einen Hard-Jump bei `,(0,l.jsx)(t.code,{children:`prefers-reduced-motion`})]}),`
`,(0,l.jsx)(t.li,{children:`Die Headline trägt den Kernwert Gelassenheit: ruhig, selbstsicher, ohne Ausrufezeichen`}),`
`,(0,l.jsx)(t.li,{children:`Eyebrow und aktiven Nav-Link den Bereich zeigen lassen, damit Nutzende sofort verstehen, wo sie sind`}),`
`,(0,l.jsx)(t.li,{children:`Die Primäraktion im Sub-Strip mit einem Verb benennen, konkret und direkt („Starten“, „Anfragen“, „Entdecken“)`}),`
`,(0,l.jsxs)(t.li,{children:[`Den Hero als vollbreites Bild mit dunklem Caption-Overlay führen, der getönte Sub-Strip darunter trägt `,(0,l.jsx)(t.code,{children:`--co-50`}),` als ruhige Brand-Klammer`]}),`
`,(0,l.jsx)(t.li,{children:`Die Topnav als ruhige Konstante halten und die Brand-Klammer von der Nav über die Hero-Caption bis zum Sub-Strip durchziehen, damit Nutzende Kontext und Bereichszugehörigkeit nie verlieren`}),`
`]}),`
`,(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:`Nicht tun`})}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[`Dropdown-Menüs rein über CSS `,(0,l.jsx)(t.code,{children:`:hover`}),` öffnen, nicht per Tastatur erreichbar; `,(0,l.jsx)(t.code,{children:`aria-expanded`}),` für den Toggle nutzen`]}),`
`,(0,l.jsx)(t.li,{children:`Vom IA-Schema (Angewandte KI · Leistungen · Wissen · Unternehmen plus Kontakt) abweichen oder zusätzliche Top-Items ergänzen, das verwässert die Customer-Page-Navigation`}),`
`,(0,l.jsxs)(t.li,{children:[`Breadcrumb in einen zentrierten `,(0,l.jsx)(t.code,{children:`.article-header`}),` einbetten, sonst verschiebt sich seine Ausrichtung`]}),`
`,(0,l.jsx)(t.li,{children:`Zwei Submenüs gleichzeitig offen lassen, vor jedem Öffnen muss das vorherige schließen`}),`
`,(0,l.jsxs)(t.li,{children:[`Back-to-Top ohne `,(0,l.jsx)(t.code,{children:`aria-label`}),` oder ohne Fallback bei `,(0,l.jsx)(t.code,{children:`prefers-reduced-motion`}),` ausliefern`]}),`
`,(0,l.jsx)(t.li,{children:`Mehr als zwei CTAs im Sub-Strip setzen oder CTAs in das Hero-Caption-Overlay ziehen: Das widerspricht dem Markenwert Klar und konkurriert mit der Headline`}),`
`,(0,l.jsx)(t.li,{children:`Reißerische Headlines mit Ausrufezeichen oder Superlativketten schreiben, das verstößt gegen Gelassenheit`}),`
`,(0,l.jsxs)(t.li,{children:[`Eine vollflächige Bereichsfarbe als Sub-Strip-Hintergrund (statt `,(0,l.jsx)(t.code,{children:`--co-50`}),`) oder als Farbe des Caption-Overlays verwenden: zu dominant, das überschreibt das Ruhig-Gefühl`]}),`
`]}),`
`,(0,l.jsx)(t.h2,{id:`verwandte-seiten`,children:`Verwandte Seiten`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`Komponenten/Navigation`}),`
`,(0,l.jsx)(t.li,{children:`Komponenten/Hero (Zusammenspiel von Topnav und Hero)`}),`
`,(0,l.jsx)(t.li,{children:`Komponenten/Theme-Umschalter (Cycle-Button in der Topnav, Verhalten und Persistenz)`}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var l;function init_navigation_verwendung(){return(init_navigation_verwendung=e((()=>{l=i(),o(),t(),c()})))()}init_navigation_verwendung();export{MDXContent as default};