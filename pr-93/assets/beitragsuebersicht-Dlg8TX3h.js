import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n}from"./blocks-CgfgLRYg.js";import{s as r}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i,r as a}from"./react-C77DJ2jK.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...i(),...e.components},{HtmlBeispiel:r}=t;return r||_missingMdxReference(`HtmlBeispiel`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n,{title:`Seitenmuster/Beitragsübersicht`,name:`Übersicht`}),`
`,(0,o.jsx)(t.h1,{id:`beitragsübersicht`,children:`Beitragsübersicht`}),`
`,(0,o.jsxs)(t.p,{children:[`Page-Pattern für Listing-Seiten mit Bereichs-Filter: zentrierter Header mit Lead,
Filter-Chip-Leiste, ein Featured-Beitrag pro Bereich, der mit dem Filter rotiert, darunter
ein Card-Grid. Dasselbe Pattern trägt auch
`,(0,o.jsx)(t.code,{children:`Seitenmuster/Veranstaltungsübersicht`}),`, dort mit „Format“ statt „Lesezeit“ in der
Meta-Zeile und dem Anmeldungs-Flow statt des Beitrags-Lesers.`]}),`
`,(0,o.jsx)(t.h2,{id:`aufbau`,children:`Aufbau`}),`
`,(0,o.jsx)(t.p,{children:`Die Seite folgt einem Lesefluss von Orientierung über kuratierte Empfehlung zur freien
Erkundung:`}),`
`,(0,o.jsxs)(t.ol,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Topnav`}),` (siehe `,(0,o.jsx)(t.code,{children:`Komponenten/Navigation/Topnav`}),`): „Wissen“ mit `,(0,o.jsx)(t.code,{children:`aria-current="page"`}),`.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Page-Header:`}),` H1, Lead, optionales Such-Feld (`,(0,o.jsx)(t.code,{children:`role="search"`}),` mit Magnifier-Icon und
`,(0,o.jsx)(t.code,{children:`<input type="search">`}),`), Filter-Chips. Zentriert, max. 720 px für die Lead-Breite. Die
Reihenfolge folgt dem User-Intent: spezifische Suche zuerst, Browse-Filter danach. Der
H1 trägt `,(0,o.jsx)(t.code,{children:`--ty-display-sm`}),` (36 px Serif), nicht `,(0,o.jsx)(t.code,{children:`--ty-headline-sm`}),` oder kleiner. Er ist
der alleinige Page-Anker (Listings haben kein Hero-Image) und muss visuell klar
dominieren. So entsteht die Hierarchie 36 px H1, 28 px Section-H2, 24 px
Featured-Card-Hero, 20 px Standard-Card-Titel.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Featured-Beitrag:`}),` zweispaltige Hero-Card (Bild links im 16:9, Inhalt rechts),
bereichsspezifisch, siehe Filter-aware Featured unten.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Beitrags-Grid:`}),` `,(0,o.jsx)(t.code,{children:`.card.card-elevated`}),` in `,(0,o.jsx)(t.code,{children:`.col-4`}),` mit Bild oben, Pill mit dem
Bereichsnamen, Titel, Lead, Meta-Zeile mit Lesezeit und CTA „Beitrag lesen →“ am Karten-Unterrand.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`„Mehr laden“-Block`}),` (optional, ab vielen Beiträgen): zentrierter Outline-Button mit
Counter darunter (`,(0,o.jsx)(t.code,{children:`aria-live="polite"`}),`), lädt die nächste Beitragsseite nach. Alternative
zu Pagination oder Infinite-Scroll, der Footer bleibt erreichbar und deterministisch
zugänglich.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`CTA-Band`}),` für Newsletter oder vergleichbare Conversion.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.strong,{children:`Footer`}),` (siehe `,(0,o.jsx)(t.code,{children:`Komponenten/Footer`}),`).`]}),`
`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Header-Pattern, Editorial statt Marketing:`}),` Der Page-Header ist bewusst zentriert, weil
die Seite zum Lesen und Stöbern einlädt, nicht zum Scannen einer Service-Übersicht. Das
folgt derselben Logik wie der Article-Header in `,(0,o.jsx)(t.code,{children:`Seitenmuster/Wissensbeitrag`}),`: ein ruhiger
Fokuspunkt vor dem Listenfluss. Marketing-Sektionen wie „Was wir tun“ oder „Drei Pfeiler“
(`,(0,o.jsx)(t.code,{children:`.ep-section-*`}),`) sind dagegen linksbündig und scan-tauglich. Auf Listing-Seiten gilt
Editorial-Konvention, auf Service- und Marketing-Seiten Marketing-Konvention.`]}),`
`,(0,o.jsx)(t.h2,{id:`such-verhalten`,children:`Such-Verhalten`}),`
`,(0,o.jsx)(t.p,{children:`Such-Konzept als Phase-1-Implementierung: vollständig client-seitig, ohne Backend.
Funktioniert verlässlich bis rund 100 Beiträge, danach lohnt eine indexierte Lösung (Algolia,
Meilisearch, eigener Service). Die folgenden Regeln beschreiben das Verhalten.`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Aspekt`}),(0,o.jsx)(t.th,{children:`Verhalten`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Instant-Search`}),(0,o.jsx)(t.td,{children:`Filtert beim Tippen mit 300 ms Debounce, kein Submit, keine separate Result-Page`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Such-Scope`}),(0,o.jsx)(t.td,{children:`Titel plus Lead plus Pill (Bereichsname) pro Card (case-insensitive Substring-Match), Lesezeit in der Meta-Zeile gehört nicht dazu, Body-Text bewusst ausgespart (zu teuer client-seitig, erzeugt False Positives)`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Kombination mit Filter`}),(0,o.jsx)(t.td,{children:`AND-Logik: aktiver Bereichs-Filter plus Suche ergibt die engere Schnittmenge`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Featured-Verhalten`}),(0,o.jsx)(t.td,{children:`Wird bei aktiver Suche komplett ausgeblendet, Featured ist redaktionell kuratiert, nicht algorithmisch`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Live-Count`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.wb-result-count`}),` mit `,(0,o.jsx)(t.code,{children:`role="status" aria-live="polite"`}),`, nur während aktiver Suche sichtbar`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Empty State`}),(0,o.jsx)(t.td,{children:`Eigener Block ersetzt das Grid, kontextueller Detailtext, zwei Exit-Pfade (Reset, Newsletter)`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`„Mehr laden“`}),(0,o.jsx)(t.td,{children:`Wird bei aktiver Suche ausgeblendet, bei Filter-only bleibt der Block aktiv`})]})]})]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Tastatur und A11y:`})}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Eingabe`}),(0,o.jsx)(t.th,{children:`Aktion`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`Esc`})}),(0,o.jsx)(t.td,{children:`Leert das Such-Feld, Fokus bleibt im Feld, Filter werden nicht zurückgesetzt`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`role="search"`})}),(0,o.jsx)(t.td,{children:`Landmark um das gesamte Such-Feld, Screenreader können direkt dorthin springen`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`<input type="search">`})}),(0,o.jsxs)(t.td,{children:[`Natives Such-Input mit Browser-X-Button zum Leeren, `,(0,o.jsx)(t.code,{children:`aria-label`}),` statt sichtbarem Label`]})]})]})]}),`
`,(0,o.jsxs)(t.p,{children:[`Es gibt bewusst kein Tastenkürzel wie `,(0,o.jsx)(t.code,{children:`/`}),` für die Suche: Ein Einzelzeichen-Kürzel löst bei Spracheingabe und Bildschirmtastaturen versehentlich aus und müsste nach WCAG 2.1.4 abschaltbar oder umbelegbar sein. Die Suche erreicht man über den `,(0,o.jsx)(t.code,{children:`role="search"`}),`-Landmark.`]}),`
`,(0,o.jsx)(t.h2,{id:`filter-aware-featured`,children:`Filter-aware Featured`}),`
`,(0,o.jsxs)(t.p,{children:[`Der Featured-Block enthält pro Bereich eine eigene Hero-Card. Alle drei Cards liegen im
selben Container und tragen `,(0,o.jsx)(t.code,{children:`data-area="ki|es|wo"`}),`. Per Default ist eine sichtbar, die
anderen tragen `,(0,o.jsx)(t.code,{children:`.is-hidden`}),`. Beim Klick auf einen Filter-Chip blendet das JS die passende
Variante ein und filtert im selben Zug das Grid, beides in einer Operation. Für den Filter
„Alle“ zeigt der Editorial-Pick (im Beispiel die KI-Variante).`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Warum diese Variante:`}),` Ein statisches Featured würde beim Filtern auf andere Bereiche
thematisch nicht zur Auswahl passen. Eine versteckte Featured-Section lässt das Layout beim
Filterwechsel um die Höhe der Card springen. Ein Featured pro Bereich erhält die topische
Kohärenz und vermeidet zugleich Layout-Sprünge.`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Typografie:`}),` Der Titel der Featured-Card nutzt `,(0,o.jsx)(t.code,{children:`.card-title-hero`}),` (24 px Serif,
Headline-sm) statt des Standard-`,(0,o.jsx)(t.code,{children:`.card-title`}),` (20 px Sans), das Featured ist ein
editorialer Hero, kein Grid-Card.`]}),`
`,(0,o.jsx)(r,{titel:`Featured-Bereich mit gefilterter Karte`,children:(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<section id="wb-featured-section">
  <p class="ep-section-label">Featured</p>
  <a class="card card-elevated card-featured" data-area="ki" href="#">
    <div class="card-media"><img src="platzhalter.svg" alt="" aria-hidden="true"></div>
    <div class="card-featured-body">
      <span class="pill" data-area="ki" aria-label="Bereich Angewandte KI">Angewandte KI</span>
      <h2 class="card-title-hero">Warum 60 % der KI-Piloten nie in Produktion gehen</h2>
      <p class="card-text">Demos überzeugen, Use-Cases scheitern. Was wir aus 200 Implementierungen über den Pfad zur Produktion gelernt haben.</p>
      <p style="font:var(--ty-body-sm);color:var(--tx-muted);margin:0">8 min Lesezeit · <time datetime="2026-05-13">13. Mai 2026</time></p>
      <span class="card-cta-link">Beitrag lesen <span aria-hidden="true">→</span></span>
    </div>
  </a>
  <a class="card card-elevated is-hidden card-featured" data-area="es" href="#">
    <div class="card-media"><img src="platzhalter.svg" alt="" aria-hidden="true"></div>
    <div class="card-featured-body">
      <span class="pill" data-area="es" aria-label="Bereich Effektive Software">Effektive Software</span>
      <h2 class="card-title-hero">Refactoring-Schulden ehrlich rechnen</h2>
      <p class="card-text">Wann der Umbau billiger ist als der nächste Workaround, mit Beispielrechnung aus einem Migrationsprojekt.</p>
      <p style="font:var(--ty-body-sm);color:var(--tx-muted);margin:0">7 min Lesezeit · <time datetime="2026-04-22">22. April 2026</time></p>
      <span class="card-cta-link">Beitrag lesen <span aria-hidden="true">→</span></span>
    </div>
  </a>
  <a class="card card-elevated is-hidden card-featured" data-area="wo" href="#">
    <div class="card-media"><img src="platzhalter.svg" alt="" aria-hidden="true"></div>
    <div class="card-featured-body">
      <span class="pill" data-area="wo" aria-label="Bereich Wirksame Organisationen">Wirksame Organisationen</span>
      <h2 class="card-title-hero">Wandel, der wirklich bleibt</h2>
      <p class="card-text">Transformationen scheitern selten am Plan, fast immer an der Kultur. Woran man frühzeitig erkennt, dass Veränderung kippt.</p>
      <p style="font:var(--ty-body-sm);color:var(--tx-muted);margin:0">12 min Lesezeit · <time datetime="2026-04-08">8. April 2026</time></p>
      <span class="card-cta-link">Beitrag lesen <span aria-hidden="true">→</span></span>
    </div>
  </a>
</section>
`})})}),`
`,(0,o.jsx)(t.h2,{id:`listing-filter-und-suche--nur-css-schicht`,children:`Listing-Filter und Suche · Nur CSS-Schicht`}),`
`,(0,o.jsx)(t.p,{children:`Die Listing-Seite besteht aus Markup und CSS. Filter, Suche und das Umschalten des Featured-Blocks bringt keine Komponente mit: Wer nur die CSS-Schicht verwendet, setzt dieses Markup ein und ergänzt das Verhalten darunter. Die Veranstaltungsübersicht nutzt dieselbe Logik, mit anderem Nomen („Veranstaltungen“) und anderem Default-Featured.`}),`
`,(0,o.jsx)(r,{titel:`Listing-Kopf mit Suche, Filter-Chips, Grid, Leerzustand und „Mehr laden“`,interaktiv:!0,children:(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<header style="text-align:center">
  <h1 style="font:var(--ty-display-sm);color:var(--tx-primary);margin:0 0 var(--s6)">Wissensbeiträge</h1>
  <div role="search" aria-label="Beiträge durchsuchen" style="max-width:480px;margin:0 auto var(--s4);position:relative">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--n-400)" stroke-width="1.25" aria-hidden="true" focusable="false" style="position:absolute;left:var(--s4);top:50%;transform:translateY(-50%);pointer-events:none">
      <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
    </svg>
    <input type="search" placeholder="Beitrag suchen" aria-label="Beiträge nach Stichwort durchsuchen" autocomplete="off" style="width:100%;padding:10px var(--s4) 10px 44px;border:1.5px solid var(--field-border);border-radius:var(--r-full);font:var(--ty-body-md);background:var(--bg-surface);color:var(--tx-primary)">
  </div>
  <p class="wb-result-count" role="status" aria-live="polite" style="font:var(--ty-body-sm);color:var(--tx-muted);margin:0 auto var(--s6);min-height:1.5em"></p>
  <div role="toolbar" aria-label="Beiträge nach Bereich filtern" style="display:flex;gap:var(--s2);justify-content:center;flex-wrap:wrap">
    <button class="chip" type="button" aria-pressed="true" data-filter="all" data-area="co">Alle</button>
    <button class="chip" type="button" aria-pressed="false" data-filter="ki" data-area="ki">Angewandte KI</button>
    <button class="chip" type="button" aria-pressed="false" data-filter="es" data-area="es">Effektive Software</button>
    <button class="chip" type="button" aria-pressed="false" data-filter="wo" data-area="wo">Wirksame Organisationen</button>
  </div>
</header>

<div class="layout-grid" style="margin-top:var(--s8)">
  <a class="card card-elevated col-4" data-area="ki" href="#">
    <div class="card-media"><img src="platzhalter.svg" alt="" aria-hidden="true" style="width:100%;height:100%;object-fit:cover"></div>
    <div class="card-body">
      <span class="pill" data-area="ki" aria-label="Bereich Angewandte KI">Angewandte KI</span>
      <div class="card-title"><span>RAG vs. Fine-Tuning: Wann was sinnvoll ist</span></div>
      <div class="card-text">Beide Wege führen zum Ziel, aber selten zum gleichen.</div>
      <p class="card-meta" style="font:var(--ty-body-sm);color:var(--tx-muted);margin:0">8 min Lesezeit</p>
      <span class="card-cta-link">Beitrag lesen <span aria-hidden="true">→</span></span>
    </div>
  </a>
  <a class="card card-elevated col-4" data-area="es" href="#">
    <div class="card-media"><img src="platzhalter.svg" alt="" aria-hidden="true" style="width:100%;height:100%;object-fit:cover"></div>
    <div class="card-body">
      <span class="pill" data-area="es" aria-label="Bereich Effektive Software">Effektive Software</span>
      <div class="card-title"><span>Refactoring-Schulden ehrlich rechnen</span></div>
      <div class="card-text">Wann der Umbau billiger ist als der nächste Workaround.</div>
      <p class="card-meta" style="font:var(--ty-body-sm);color:var(--tx-muted);margin:0">7 min Lesezeit</p>
      <span class="card-cta-link">Beitrag lesen <span aria-hidden="true">→</span></span>
    </div>
  </a>
</div>

<!-- Leerzustand: ersetzt das Grid, solange kein Beitrag passt -->
<div class="wb-empty-state is-hidden" style="text-align:center;padding:var(--s10) var(--s5)">
  <p style="font:var(--ty-title-sm);color:var(--tx-primary);margin:0 0 var(--s2)">Keine Beiträge gefunden.</p>
  <p class="wb-empty-state-detail" style="font:var(--ty-body-md);color:var(--tx-secondary);margin:0 auto var(--s5);max-width:480px"></p>
  <button class="btn btn-outlined btn-co wb-reset-search" type="button">Suche &amp; Filter zurücksetzen</button>
</div>

<div class="wb-load-more" style="display:flex;flex-direction:column;align-items:center;gap:var(--s2);margin-top:var(--s10)">
  <button class="btn btn-outlined btn-co" type="button">Mehr Beiträge laden</button>
  <p style="font:var(--ty-body-sm);color:var(--tx-muted);margin:0">6 von 24 Beiträgen</p>
</div>
`})})}),`
`,(0,o.jsxs)(t.p,{children:[`Die Klassen `,(0,o.jsx)(t.code,{children:`wb-…`}),` sind nur Haken für das Skript und tragen kein CSS. Die Veranstaltungsübersicht nutzt dasselbe Muster mit einem eigenen Präfix. Jede Umsetzung ergänzt das Verhalten, das das Markup nicht liefert:`]}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Aspekt`}),(0,o.jsx)(t.th,{children:`Verhalten`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Entprellen`}),(0,o.jsx)(t.td,{children:`Die Suche läuft 300 ms nach der letzten Eingabe. Filter-Chips wirken sofort, ohne Verzögerung`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Trefferlogik`}),(0,o.jsx)(t.td,{children:`Der Suchtext (ohne Leerzeichen am Rand) wird gegen Titel, Lead und Pill (Bereichsname) jeder Grid-Karte geprüft, die Meta-Zeile zählt nicht dazu, ohne Groß-/Kleinschreibung, als Teilstring. Das Ergebnis ist mit dem Bereichsfilter UND-verknüpft. Featured-Karten zählen nicht mit`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Bereichsfilter`}),(0,o.jsxs)(t.td,{children:[`Genau ein Chip ist aktiv. Beim Klick wandert `,(0,o.jsx)(t.code,{children:`aria-pressed="true"`}),` auf den gewählten Chip, alle anderen stehen auf `,(0,o.jsx)(t.code,{children:`"false"`}),`. „Alle“ ist der Startzustand`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Featured`}),(0,o.jsx)(t.td,{children:`Folgt dem Filter: je Bereich eine Variante, bei „Alle“ der Default des Bereichs (Beitragsübersicht: Angewandte KI, Veranstaltungsübersicht: Effektive Software). Bei aktiver Suche ist der gesamte Featured-Abschnitt ausgeblendet. Featured und Grid schalten in einem Durchgang um`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Ergebniszähler`}),(0,o.jsxs)(t.td,{children:[`Nur bei aktiver Suche, im Format `,(0,o.jsx)(t.code,{children:`3 Treffer für „RAG“`}),` (Zahl = sichtbare Grid-Karten). Ohne Suche bleibt der Text leer. Der Zähler ist eine Live-Region (`,(0,o.jsx)(t.code,{children:`role="status"`}),`, `,(0,o.jsx)(t.code,{children:`aria-live="polite"`}),`)`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Leerzustand`}),(0,o.jsx)(t.td,{children:`Erscheint, sobald keine Grid-Karte sichtbar ist. Der Detailtext hängt von Suche und Filter ab, siehe nächste Tabelle. Zugleich verschwindet „Mehr laden“`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`„Mehr laden“`}),(0,o.jsx)(t.td,{children:`Ausgeblendet bei aktiver Suche und im Leerzustand, sonst sichtbar`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Zurücksetzen`}),(0,o.jsx)(t.td,{children:`Der Button im Leerzustand leert das Suchfeld, setzt den Filter auf „Alle“ und gibt dem Suchfeld den Fokus`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:`Esc`})}),(0,o.jsx)(t.td,{children:`Leert das Suchfeld nur, wenn Text drinsteht. Der Fokus bleibt im Feld, der Filter bleibt gesetzt. Ohne Text bleibt die Taste unberührt`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Startzustand`}),(0,o.jsx)(t.td,{children:`Beim Laden einmal anwenden: Filter „Alle“, keine Suche, Zähler leer, Leerzustand verborgen`})]})]})]}),`
`,(0,o.jsx)(t.p,{children:`Detailtext des Leerzustands, je nach Kombination aus Suche und Filter (im Beispiel für Beiträge, bei Veranstaltungen „Veranstaltungen“):`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Suche`}),(0,o.jsx)(t.th,{children:`Filter`}),(0,o.jsx)(t.th,{children:`Detailtext`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`aktiv`}),(0,o.jsx)(t.td,{children:`ein Bereich`}),(0,o.jsx)(t.td,{children:`Für „RAG“ im Bereich Angewandte KI gibt es aktuell keine Beiträge.`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`aktiv`}),(0,o.jsx)(t.td,{children:`Alle`}),(0,o.jsx)(t.td,{children:`Für „RAG“ gibt es aktuell keine Beiträge.`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`leer`}),(0,o.jsx)(t.td,{children:`ein Bereich`}),(0,o.jsx)(t.td,{children:`Im Bereich Angewandte KI sind aktuell keine Beiträge hinterlegt.`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`leer`}),(0,o.jsx)(t.td,{children:`Alle`}),(0,o.jsx)(t.td,{children:`Kein Detailtext`})]})]})]}),`
`,(0,o.jsx)(t.h2,{id:`verwendung`,children:`Verwendung`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Aspekt`}),(0,o.jsx)(t.th,{children:`Regel`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Filter-Chips`}),(0,o.jsxs)(t.td,{children:[`Toggle-Buttons mit `,(0,o.jsx)(t.code,{children:`aria-pressed`}),` und `,(0,o.jsx)(t.code,{children:`data-filter="all|ki|es|wo"`}),`, aktiver Chip gefüllt in Petrol mit weißem Text`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Featured pro Bereich`}),(0,o.jsxs)(t.td,{children:[`Jede Variante als `,(0,o.jsx)(t.code,{children:`.card.card-elevated`}),` mit `,(0,o.jsx)(t.code,{children:`data-area`}),` im selben Container, nur eine sichtbar`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`„Alle“-Default`}),(0,o.jsx)(t.td,{children:`Zeigt den Editorial-Pick, Konvention für Conciso: KI-Variante als Lead-Thema`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Grid-Karten`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.card.card-elevated.col-4`}),` mit `,(0,o.jsx)(t.code,{children:`data-area`}),` auf Karte und Pill, CTA-Farbe einheitlich `,(0,o.jsx)(t.code,{children:`--co-700`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Pill-Form`}),(0,o.jsxs)(t.td,{children:[`Nur der Bereichsname mit `,(0,o.jsx)(t.code,{children:`data-area`}),` für den Bereichston, Lesezeit in der Meta-Zeile (`,(0,o.jsx)(t.code,{children:`.card-meta`}),`-Inhalt), auf Listing-Seiten ohne Breadcrumb zulässig`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Layout-Stabilität`}),(0,o.jsx)(t.td,{children:`Featured-Section beim Filterwechsel nie ganz verstecken, nur den Inhalt austauschen, sonst springt das Layout. Bei aktiver Suche entfällt sie bewusst`})]})]})]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Dos`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Pro Bereich eine eigene Featured-Variante pflegen, kuratierter Top-Beitrag für die
jeweilige Zielgruppe.`}),`
`,(0,o.jsxs)(t.li,{children:[`CTAs im Grid einheitlich in `,(0,o.jsx)(t.code,{children:`--co-700`}),`, die Bereichsfarbe trägt die Pill.`]}),`
`,(0,o.jsx)(t.li,{children:`Featured-Card visuell anders strukturieren als Grid-Karten, damit die Hierarchie sofort
lesbar ist.`}),`
`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Don'ts`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Featured beim Filterwechsel komplett ausblenden, das Layout springt um die Card-Höhe.`}),`
`,(0,o.jsx)(t.li,{children:`Statisches Featured eines Bereichs zeigen, während ein anderer Bereich aktiv gefiltert
ist.`}),`
`,(0,o.jsx)(t.li,{children:`Featured und Grid-Karten gleich darstellen, ohne Hierarchie scrollen Nutzende am
redaktionellen Anker vorbei.`}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var o;function init_beitragsuebersicht(){return(init_beitragsuebersicht=e((()=>{o=r(),a(),t()})))()}init_beitragsuebersicht();export{MDXContent as default};