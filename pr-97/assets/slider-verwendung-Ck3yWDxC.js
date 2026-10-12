import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{s as t}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i as n,r}from"./react-C77DJ2jK.js";import{c as i,o as a}from"./blocks-MIQYy-EB.js";import{n as o,t as s}from"./carousel.stories-jLVZ30eh.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components},{HtmlBeispiel:r}=t;return r||_missingMdxReference(`HtmlBeispiel`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(a,{of:s,name:`Verwendung`}),`
`,(0,c.jsx)(t.h1,{id:`verwendung`,children:`Verwendung`}),`
`,(0,c.jsxs)(t.p,{children:[`Slider & Carousel führt zwei getrennte Formen: das Bild-Carousel zur Seiten-Integration
(Story `,(0,c.jsx)(t.code,{children:`Carousel`}),`) und das Kundenlogo-Karussell (Story `,(0,c.jsx)(t.code,{children:`LogoCarousel`}),`) als pausierbares Crossfade-Karussell.
Beide sind WCAG 2.1 AA konform und respektieren `,(0,c.jsx)(t.code,{children:`prefers-reduced-motion`}),`. Die
Slider-Hero-Variante für den Seitenkopf ist unter Komponenten/Hero dokumentiert.`]}),`
`,(0,c.jsx)(t.h2,{id:`bild-carousel--verwendung`,children:`Bild-Carousel · Verwendung`}),`
`,(0,c.jsxs)(t.p,{children:[`Eingebettet in Seiteninhalt, maximal 780 px breit, abgerundete Ecken (16:9). Caption
erscheint unterhalb des Bildes auf weißem Grund, keine Modifier-Klasse nötig, nur die
Basis-Klasse `,(0,c.jsx)(t.code,{children:`.img-slider`}),`. Übergang per Crossfade über 600 ms; unter
`,(0,c.jsx)(t.code,{children:`prefers-reduced-motion: reduce`}),` entfällt die Transition automatisch.`]}),`
`,(0,c.jsx)(t.h3,{id:`barrierefreiheit--aria`,children:`Barrierefreiheit & ARIA`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribut`}),(0,c.jsx)(t.th,{children:`Zweck`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`role="region"`})}),(0,c.jsx)(t.td,{children:`Semantischer Landmark für den gesamten Slider`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-roledescription`})}),(0,c.jsx)(t.td,{children:`„Bildschirmpräsentation“, Screenreader liest den Typ vor`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`aria-label`}),` auf der Region`]}),(0,c.jsxs)(t.td,{children:[`Benennt die Bildstrecke („Bildstrecke“ als Standard). Gibt es mehrere Bildstrecken auf einer Seite, trägt jede einen eigenen, unterscheidbaren Namen, sonst sind die Landmarks nicht auseinanderzuhalten. Im Angular-Bauteil setzt das der Input `,(0,c.jsx)(t.code,{children:`label`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`role="group"`}),` auf Slide`]}),(0,c.jsx)(t.td,{children:`Fasst Bild und Caption je Folie zusammen`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-hidden`})}),(0,c.jsxs)(t.td,{children:[`Inaktive Slides tragen `,(0,c.jsx)(t.code,{children:`aria-hidden="true"`}),` und werden übersprungen, die aktive Slide trägt `,(0,c.jsx)(t.code,{children:`aria-hidden="false"`}),` und `,(0,c.jsx)(t.code,{children:`.active`}),` (setzt JS)`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`aria-label`}),` auf Button`]}),(0,c.jsx)(t.td,{children:`„Vorherige / Nächste Folie“, kein Icon-only`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`role="tablist"`}),` Dots`]}),(0,c.jsxs)(t.td,{children:[`Dot-Navigation als Tab-Gruppe, bekanntes Tastatur-Pattern. Der aktive Dot trägt `,(0,c.jsx)(t.code,{children:`aria-selected="true"`}),` und `,(0,c.jsx)(t.code,{children:`tabindex="0"`}),`, die übrigen `,(0,c.jsx)(t.code,{children:`aria-selected="false"`}),` und `,(0,c.jsx)(t.code,{children:`tabindex="-1"`}),` (Roving-Tabindex)`]})]})]})]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Taste`}),(0,c.jsx)(t.th,{children:`Funktion`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`←`}),(0,c.jsx)(t.td,{children:`Vorherige Folie, wirkt auf dem gesamten Slider und läuft von der ersten zur letzten Folie um`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`→`}),(0,c.jsx)(t.td,{children:`Nächste Folie, wirkt auf dem gesamten Slider und läuft von der letzten zur ersten Folie um`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Tab`}),(0,c.jsx)(t.td,{children:`Fokus auf Prev/Next-Button, dann auf den aktiven Dot (Roving-Tabindex)`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Enter / Space`}),(0,c.jsx)(t.td,{children:`Dot oder Button aktivieren`})]})]})]}),`
`,(0,c.jsx)(t.h3,{id:`dos--donts`,children:`Dos & Don'ts`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Immer aussagekräftiges `,(0,c.jsx)(t.code,{children:`alt`}),`-Attribut bei echten Bildern, kein `,(0,c.jsx)(t.code,{children:`alt=""`}),` bei inhaltlichen Fotos`]}),`
`,(0,c.jsx)(t.li,{children:`Caption für jede Folie, gibt dem Inhalt auch ohne Bild ausreichend Kontext`}),`
`,(0,c.jsxs)(t.li,{children:[`Bilder mit `,(0,c.jsx)(t.code,{children:`object-fit: cover`}),` und fester Höhe einsetzen, verhindert Layout-Sprünge beim Laden`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Nicht tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Kein Auto-Play ohne Pause-Button, WCAG 2.1 Kriterium 2.2.2 verbietet unkontrollierte Bewegung`}),`
`,(0,c.jsx)(t.li,{children:`Mehr als 6 bis 7 Slides, Nutzende verlieren die Orientierung, lieber eine separate Galerie verwenden`}),`
`,(0,c.jsx)(t.li,{children:`Kartentypen oder Seitenverhältnisse innerhalb eines Carousels mischen, einheitliche Bildgröße halten`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`bild-carousel--nur-css-schicht`,children:`Bild-Carousel · Nur CSS-Schicht`}),`
`,(0,c.jsxs)(t.p,{children:[`Wer nur die CSS-Schicht verwendet, setzt dieses Markup ein. Die erste Folie trägt `,(0,c.jsx)(t.code,{children:`.active`}),` und `,(0,c.jsx)(t.code,{children:`aria-hidden="false"`}),`, damit beim Laden ohne Skript etwas sichtbar ist. Der erste Dot trägt `,(0,c.jsx)(t.code,{children:`.active`}),`, `,(0,c.jsx)(t.code,{children:`aria-selected="true"`}),` und `,(0,c.jsx)(t.code,{children:`tabindex="0"`}),`. Jede Folie bekommt eine eindeutige `,(0,c.jsx)(t.code,{children:`id`}),`, auf die der `,(0,c.jsx)(t.code,{children:`aria-controls`}),` des zugehörigen Dots zeigt.`]}),`
`,(0,c.jsx)(r,{titel:`Bild-Carousel als reines Markup`,children:(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<div class="img-slider" role="region" aria-roledescription="Bildschirmpräsentation" aria-label="Kundenprojekte">
  <div class="img-slider-track">
    <div class="img-slide active" id="img-slide-1" role="group" aria-roledescription="Folie" aria-label="Folie 1 von 3" aria-hidden="false">
      <div class="img-slide-media">
        <img src="platzhalter.svg" alt="Kurze Bildbeschreibung">
      </div>
      <div class="img-slide-caption">
        <p class="img-slide-caption-title">Markenstrategie für die Energiewende</p>
        <p class="img-slide-caption-text">Corporate · Rebranding und Kommunikationssystem für einen regionalen Energieversorger.</p>
      </div>
    </div>
    <div class="img-slide" id="img-slide-2" role="group" aria-roledescription="Folie" aria-label="Folie 2 von 3" aria-hidden="true">
      <div class="img-slide-media">
        <img src="platzhalter.svg" alt="Kurze Bildbeschreibung">
      </div>
      <div class="img-slide-caption">
        <p class="img-slide-caption-title">KI-gestütztes Berichtswesen</p>
        <p class="img-slide-caption-text">Angewandte KI · Automatisierte Auswertung von Produktionsdaten für ein Fertigungsunternehmen.</p>
      </div>
    </div>
    <div class="img-slide" id="img-slide-3" role="group" aria-roledescription="Folie" aria-label="Folie 3 von 3" aria-hidden="true">
      <div class="img-slide-media">
        <img src="platzhalter.svg" alt="Kurze Bildbeschreibung">
      </div>
      <div class="img-slide-caption">
        <p class="img-slide-caption-title">Cloud-Migration einer Versicherungsplattform</p>
        <p class="img-slide-caption-text">Effektive Software · Ablösung eines Legacy-Systems durch eine skalierbare Microservice-Architektur.</p>
      </div>
    </div>
  </div>
  <button class="img-slider-btn img-slider-prev" type="button" aria-label="Vorherige Folie">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>
  </button>
  <button class="img-slider-btn img-slider-next" type="button" aria-label="Nächste Folie">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>
  </button>
  <div class="img-slider-dots" role="tablist" aria-label="Folien-Navigation">
    <button class="img-dot active" type="button" role="tab" aria-selected="true" aria-controls="img-slide-1" aria-label="Folie 1 von 3" tabindex="0"></button>
    <button class="img-dot" type="button" role="tab" aria-selected="false" aria-controls="img-slide-2" aria-label="Folie 2 von 3" tabindex="-1"></button>
    <button class="img-dot" type="button" role="tab" aria-selected="false" aria-controls="img-slide-3" aria-label="Folie 3 von 3" tabindex="-1"></button>
  </div>
</div>
`})})}),`
`,(0,c.jsx)(t.p,{children:`Der Wechsel kommt aus einem Skript, die CSS-Schicht liefert nur die Darstellung. Jede Umsetzung ergänzt:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Bei jedem Wechsel (Prev, Next, Dot-Klick, Pfeiltaste) trägt genau eine Folie `,(0,c.jsx)(t.code,{children:`.active`}),` und `,(0,c.jsx)(t.code,{children:`aria-hidden="false"`}),`, alle anderen `,(0,c.jsx)(t.code,{children:`aria-hidden="true"`}),` ohne `,(0,c.jsx)(t.code,{children:`.active`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Jeder Dot trägt `,(0,c.jsx)(t.code,{children:`aria-controls`}),` mit der `,(0,c.jsx)(t.code,{children:`id`}),` seiner Folie. Die `,(0,c.jsx)(t.code,{children:`id`}),`s sind auf der Seite eindeutig.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Der Dot der aktiven Folie trägt `,(0,c.jsx)(t.code,{children:`.active`}),`, `,(0,c.jsx)(t.code,{children:`aria-selected="true"`}),` und `,(0,c.jsx)(t.code,{children:`tabindex="0"`}),`, alle anderen `,(0,c.jsx)(t.code,{children:`aria-selected="false"`}),` und `,(0,c.jsx)(t.code,{children:`tabindex="-1"`}),`.`]}),`
`,(0,c.jsx)(t.li,{children:`Der Wechsel läuft um: Prev auf der ersten Folie springt zur letzten, Next auf der letzten zur ersten.`}),`
`,(0,c.jsx)(t.li,{children:`Die Pfeiltasten ← und → wirken auf dem gesamten Slider, nicht nur auf den Dots, und unterdrücken das Standardverhalten der Taste.`}),`
`,(0,c.jsx)(t.li,{children:`Es gibt keinen Auto-Wechsel. Wer einen ergänzt, braucht einen Pause-Button (siehe Kundenlogo-Karussell).`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`kundenlogo-karussell--verwendung`,children:`Kundenlogo-Karussell · Verwendung`}),`
`,(0,c.jsxs)(t.p,{children:[`Diskrete Sets von je 5 Logos, die alle 6 Sekunden per Crossfade wechseln. Pausiert
automatisch bei Hover und Tastatur-Fokus, zusätzlich manueller Pause-Button (WCAG
2.2.2). Pagination-Dots erlauben gezieltes Springen, Tastatur-Navigation über Pfeil-,
Home- und End-Taste; Dot-Klick und Tastaturbedienung pausieren dauerhaft. Die Logos sitzen randlos auf einer hellen Platte (`,(0,c.jsx)(t.code,{children:`--bg-plate`}),`),
die in beiden Themes hell bleibt, weil Kundenlogos meist nur in einer farbigen
beziehungsweise dunklen Fassung ohne Dark-Variante vorliegen. Kein Hover-Effekt, da die
Logos nicht verlinkt sind, ein Lift würde fälschlich Klickbarkeit suggerieren.`]}),`
`,(0,c.jsx)(t.h3,{id:`barrierefreiheit`,children:`Barrierefreiheit`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Attribut`}),(0,c.jsx)(t.th,{children:`Zweck`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`role="region"`}),` + `,(0,c.jsx)(t.code,{children:`aria-roledescription`}),` + `,(0,c.jsx)(t.code,{children:`aria-label`})]}),(0,c.jsxs)(t.td,{children:[`Semantischer Landmark mit Karussell-Hinweis für Screenreader, benannt „Kundenlogos“. Mehrere Karussells auf einer Seite brauchen unterscheidbare Namen, im Angular-Bauteil über den Input `,(0,c.jsx)(t.code,{children:`label`})]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`aria-hidden`})}),(0,c.jsx)(t.td,{children:`Inaktive Sets werden Screenreader-seitig ausgeblendet, nur das sichtbare Set wird vorgelesen`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`role="group"`}),` pro Set`]}),(0,c.jsxs)(t.td,{children:[`Logos als Gruppe gebündelt mit eigenem `,(0,c.jsx)(t.code,{children:`aria-label`}),` („Set 1 von 2“)`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`role="tablist"`}),` + `,(0,c.jsx)(t.code,{children:`role="tab"`})]}),(0,c.jsxs)(t.td,{children:[`Pagination-Dots als Tab-Pattern, `,(0,c.jsx)(t.code,{children:`aria-selected`}),` markiert das aktive Set, Roving-Tabindex`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsxs)(t.td,{children:[(0,c.jsx)(t.code,{children:`aria-label`}),` auf Pause-Button`]}),(0,c.jsxs)(t.td,{children:[`Das Label wechselt zwischen „Logo-Animation pausieren“ und „Logo-Animation fortsetzen“ und macht den Zustand hörbar. Der Button trägt bewusst kein `,(0,c.jsx)(t.code,{children:`aria-pressed`}),`, damit der Zustand nicht doppelt angesagt wird`]})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Tastatur-Navigation`}),(0,c.jsx)(t.td,{children:`Auf den Dots wechseln ←/↑ zum vorherigen und →/↓ zum nächsten Set, Home / End springen zum ersten / letzten Set; jede dieser Tasten und der Dot-Klick pausieren dauerhaft. Pause-Button via Space oder Enter`})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`prefers-reduced-motion`})}),(0,c.jsx)(t.td,{children:`Auto-Rotation und Crossfade deaktiviert, Set 1 bleibt statisch sichtbar, Dots bleiben nutzbar`})]})]})]}),`
`,(0,c.jsx)(t.h3,{id:`dos--donts-1`,children:`Dos & Don'ts`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Genau 5 Logos pro Set, gleiche Anzahl in allen Sets für gleichmäßiges Grid`}),`
`,(0,c.jsx)(t.li,{children:`Logos als SVG einbinden, skalieren verlustfrei auf jede Displaydichte`}),`
`,(0,c.jsxs)(t.li,{children:[`Einheitliche Tile-Höhe (72 px), unterschiedliche Logo-Proportionen über `,(0,c.jsx)(t.code,{children:`object-fit: contain`}),` angleichen`]}),`
`,(0,c.jsxs)(t.li,{children:[`Pro Set eine eindeutige `,(0,c.jsx)(t.code,{children:`id`}),` für die `,(0,c.jsx)(t.code,{children:`aria-controls`}),`-Verknüpfung der Dots`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Nicht tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Keine Kundennamen in bunten Markenfarben, Logos einheitlich grau oder schwarz halten`}),`
`,(0,c.jsx)(t.li,{children:`Mehr als 3 Sets vermeiden, ab 4 Sets wird die Pagination unübersichtlich und wirkt zu werblich`}),`
`,(0,c.jsx)(t.li,{children:`Intervall unter 5 Sekunden setzen, gibt Lesenden keine Zeit, ein Logo aufzunehmen`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`kundenlogo-karussell--nur-css-schicht`,children:`Kundenlogo-Karussell · Nur CSS-Schicht`}),`
`,(0,c.jsxs)(t.p,{children:[`Wer nur die CSS-Schicht verwendet, setzt dieses Markup ein. Das erste Set trägt `,(0,c.jsx)(t.code,{children:`aria-hidden="false"`}),`, der erste Dot `,(0,c.jsx)(t.code,{children:`aria-selected="true"`}),` und `,(0,c.jsx)(t.code,{children:`tabindex="0"`}),`. Jedes Set bekommt eine eindeutige `,(0,c.jsx)(t.code,{children:`id`}),` für die `,(0,c.jsx)(t.code,{children:`aria-controls`}),`-Verknüpfung der Dots.`]}),`
`,(0,c.jsx)(r,{titel:`Kundenlogo-Karussell als reines Markup`,children:(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<div class="logo-carousel" role="region" aria-roledescription="Logo-Karussell" aria-label="Kundenlogos">
  <button class="logo-carousel-pause" type="button" aria-label="Logo-Animation pausieren">
    <svg class="icon-pause" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><rect x="2" y="2" width="3.5" height="10" rx="1" fill="currentColor"/><rect x="8.5" y="2" width="3.5" height="10" rx="1" fill="currentColor"/></svg>
    <svg class="icon-play" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><polygon points="3,2 12,7 3,12" fill="currentColor"/></svg>
  </button>
  <div class="logo-carousel-track">
    <div class="logo-carousel-slide" id="logo-set-1" role="group" aria-roledescription="Logo-Set" aria-label="Set 1 von 2" aria-hidden="false">
      <div class="logo-tile"><span class="logo-placeholder">Muster<br>AG</span></div>
      <div class="logo-tile"><span class="logo-placeholder">Digital<br>Hub</span></div>
      <div class="logo-tile"><span class="logo-placeholder">Infra<br>Base SE</span></div>
      <div class="logo-tile"><span class="logo-placeholder">Build<br>GmbH</span></div>
      <div class="logo-tile"><span class="logo-placeholder">Alpha<br>Corp.</span></div>
    </div>
    <div class="logo-carousel-slide" id="logo-set-2" role="group" aria-roledescription="Logo-Set" aria-label="Set 2 von 2" aria-hidden="true">
      <div class="logo-tile"><span class="logo-placeholder">Strateg<br>&amp; Co.</span></div>
      <div class="logo-tile"><span class="logo-placeholder">KI<br>Ventures</span></div>
      <div class="logo-tile"><span class="logo-placeholder">Dev<br>Works</span></div>
      <div class="logo-tile"><span class="logo-placeholder">Helios<br>GmbH</span></div>
      <div class="logo-tile"><span class="logo-placeholder">Konzern<br>AG</span></div>
    </div>
  </div>
  <div class="logo-carousel-dots" role="tablist" aria-label="Logo-Set auswählen">
    <button class="logo-carousel-dot" type="button" role="tab" aria-selected="true" aria-controls="logo-set-1" aria-label="Set 1 von 2" tabindex="0"></button>
    <button class="logo-carousel-dot" type="button" role="tab" aria-selected="false" aria-controls="logo-set-2" aria-label="Set 2 von 2" tabindex="-1"></button>
  </div>
</div>
`})})}),`
`,(0,c.jsxs)(t.p,{children:[`Rotation, Pause und Tastatur kommen aus einem Skript, die CSS-Schicht liefert nur Darstellung und Crossfade über `,(0,c.jsx)(t.code,{children:`[aria-hidden]`}),`. Jede Umsetzung ergänzt:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Mit weniger als zwei Sets passiert nichts: kein Timer, keine Dots-Logik.`}),`
`,(0,c.jsxs)(t.li,{children:[`Alle 6 Sekunden zeigt das nächste Set, nach dem letzten wieder das erste. Bei `,(0,c.jsx)(t.code,{children:`prefers-reduced-motion: reduce`}),` startet kein Timer, die Einstellung wird beim Start ausgewertet. Weil dann nichts läuft, das sich pausieren ließe, bleibt der Pause-Button versteckt (`,(0,c.jsx)(t.code,{children:`hidden`}),`), statt einen Lauf zu behaupten.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Bei jedem Wechsel trägt genau ein Set `,(0,c.jsx)(t.code,{children:`aria-hidden="false"`}),` (alle anderen `,(0,c.jsx)(t.code,{children:`"true"`}),`) und genau ein Dot `,(0,c.jsx)(t.code,{children:`aria-selected="true"`}),` und `,(0,c.jsx)(t.code,{children:`tabindex="0"`}),` (alle anderen `,(0,c.jsx)(t.code,{children:`"false"`}),` und `,(0,c.jsx)(t.code,{children:`"-1"`}),`).`]}),`
`,(0,c.jsx)(t.li,{children:`Die Rotation hält an, solange die Maus über dem Karussell liegt oder der Fokus darin steht. Nach Hover- oder Fokus-Ende läuft sie nur weiter, wenn nicht manuell pausiert wurde. Fokus-Ende zählt nur, wenn der Fokus das Karussell wirklich verlässt, nicht beim Wechsel zwischen Kind-Elementen.`}),`
`,(0,c.jsxs)(t.li,{children:[`Manuell pausiert ist das Karussell über die Klasse `,(0,c.jsx)(t.code,{children:`.paused`}),` am Karussell, sie schaltet auch Pause- und Play-Icon um. Der Pause-Button schaltet um. Sein Label wechselt zwischen „Logo-Animation pausieren“ und „Logo-Animation fortsetzen“, ein `,(0,c.jsx)(t.code,{children:`aria-pressed`}),` setzt er nicht, sonst würde der Zustand doppelt angesagt. Fortsetzen startet die Rotation wieder.`]}),`
`,(0,c.jsx)(t.li,{children:`Ein Klick auf einen Dot springt zum Set und pausiert dauerhaft, nicht nur bei Tastaturbedienung.`}),`
`,(0,c.jsx)(t.li,{children:`Auf den Dots wechseln ← und ↑ zum vorherigen, → und ↓ zum nächsten Set, mit Umlauf (erstes ↔ letztes). Home springt zum ersten, End zum letzten Set. Jede dieser Tasten unterdrückt das Standardverhalten, setzt den Fokus auf den neu aktiven Dot und pausiert dauerhaft.`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`bewegungs-anforderung-prefers-reduced-motion`,children:`Bewegungs-Anforderung (prefers-reduced-motion)`}),`
`,(0,c.jsxs)(t.p,{children:[`Die globale Barrierefreiheits-Sektion (Grundlagen/Barrierefreiheit) hält für
`,(0,c.jsx)(t.code,{children:`prefers-reduced-motion: reduce`}),` die Basisregel fest: `,(0,c.jsx)(t.code,{children:`animation-duration`}),`,
`,(0,c.jsx)(t.code,{children:`transition-duration`}),` und `,(0,c.jsx)(t.code,{children:`scroll-behavior`}),` fallen auf `,(0,c.jsx)(t.code,{children:`0.01ms`}),` beziehungsweise `,(0,c.jsx)(t.code,{children:`auto`}),`
zurück (WCAG 2.3.3 AAA). Für die beiden Karussell-Typen gilt zusätzlich:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Bild-Carousel:`}),` die Crossfade-Transition (600 ms) entfällt automatisch, keine gesonderte Handhabung im Markup nötig.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Kundenlogo-Karussell:`}),` bei aktiver Reduktion bleibt das erste Set sichtbar, ohne Auto-Wechsel und ohne Pause-Button; die Pagination-Dots bleiben bedienbar.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`Von der Ausnahme unberührt bleibt der 2-Pixel-Hover-Lift auf klickbaren Karten und dem
Störer: Er läuft auch unter `,(0,c.jsx)(t.code,{children:`prefers-reduced-motion: reduce`}),` weiter, weil er reine
Klickbarkeit signalisiert. Auto-Bewegung ist davon getrennt zu betrachten, nur sie
respektieren die Carousels.`]}),`
`,(0,c.jsx)(t.h2,{id:`verwandte-seiten`,children:`Verwandte Seiten`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Komponenten/Slider & Carousel/Carousel`}),`
`,(0,c.jsx)(t.li,{children:`Komponenten/Slider & Carousel/LogoCarousel`}),`
`,(0,c.jsx)(t.li,{children:`Komponenten/Hero (Slider-Hero-Variante)`}),`
`,(0,c.jsxs)(t.li,{children:[`Grundlagen/Barrierefreiheit (Basisregel `,(0,c.jsx)(t.code,{children:`prefers-reduced-motion`}),`)`]}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var c;function init_slider_verwendung(){return(init_slider_verwendung=e((()=>{c=t(),r(),i(),o()})))()}init_slider_verwendung();export{MDXContent as default};