import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n,s as r}from"./blocks-CgfgLRYg.js";import{s as i}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i as a,r as o}from"./react-C77DJ2jK.js";import{n as s,t as c}from"./hero-image.stories-DYn0VGVd.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...a(),...e.components},{HtmlBeispiel:i}=t;return i||_missingMdxReference(`HtmlBeispiel`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n,{of:c,name:`Verwendung`}),`
`,(0,l.jsx)(t.h1,{id:`hero`,children:`Hero`}),`
`,(0,l.jsxs)(t.p,{children:[`Drei Hero-Varianten für den Seitenkopf: Hero-Image mit Caption-Overlay (21:9,
Standard auf allen Customer-Pages), Slider-Hero mit Crossfade-Rotation (optional)
sowie eine reduzierte Sub-Sektion direkt unter dem Hero für CTAs (auf jeder
Customer-Page Pflicht). Dazu der Störer, der ausschließlich auf der Startseite über
dem Hero-Bild liegt. Hero-Image und Störer haben eigene Angular-Bauteile:
`,(0,l.jsx)(t.code,{children:`Komponenten/Hero/Hero-Bild`}),` (`,(0,l.jsx)(t.code,{children:`cds-hero-image`}),`) und `,(0,l.jsx)(t.code,{children:`Komponenten/Hero/Störer`}),`
(`,(0,l.jsx)(t.code,{children:`cds-stoerer`}),` in `,(0,l.jsx)(t.code,{children:`cds-stoerer-set`}),`). Slider-Hero und Sub-Sektion haben keins, ihre
Klassen kommen direkt aus der CSS-Schicht. Der Slider-Hero teilt seine Track-Mechanik
mit `,(0,l.jsx)(t.code,{children:`Komponenten/Slider & Carousel/Carousel`}),`.`]}),`
`,(0,l.jsx)(t.h2,{id:`hero-image-mit-caption-overlay`,children:`Hero-Image mit Caption-Overlay`}),`
`,(0,l.jsxs)(t.p,{children:[`Vollbreit, 21:9-Format, Caption als Gradient-Overlay über dem Bild, ohne
Track-Mechanik, ohne Buttons und Dots, ohne JavaScript. Klasse `,(0,l.jsx)(t.code,{children:`.hero-image`}),` als
`,(0,l.jsx)(t.code,{children:`<figure>`}),`-Container; semantisch ist Bild und Caption ein figure/figcaption-Pattern.
Verwenden, wenn die Bildaussage stark genug ist, dass keine Rotation nötig wäre, und
wenn die Marken-Headline besser am Bild verankert sitzt als in einer separaten
Hero-Body-Spalte.`]}),`
`,(0,l.jsxs)(t.p,{children:[`Optionale Eyebrow-Zeile `,(0,l.jsx)(t.code,{children:`.hero-image-caption-eyebrow`}),` direkt vor dem Titel,
Versalien mit Letter-Spacing, identisch zur Eyebrow-Logik im Standard-Hero. Auf
Bereichs-Pages enthält sie typischerweise die drei Werte des Bereichs, auf der
Landing den Zeit-Ort-Anker.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Höhe und Skalierung auf breiten Bildschirmen.`}),` Der Hero zielt auf rund 75 % der
Viewport-Höhe. Das 21:9-Format würde auf 4K- oder Ultrawide-Monitoren rechnerisch
aber noch höher werden (auf 3.840 px Breite wären das 1.646 px Höhe). Damit
Gesichter nicht ins Gigantische kippen, ist `,(0,l.jsx)(t.code,{children:`.hero-image-media`}),` über
`,(0,l.jsx)(t.code,{children:`max-height:clamp(480px,75vh,900px)`}),` gedeckelt: mindestens 480 px auf flachen
Fenstern, bevorzugt 75 vh, gedeckelt bei 900 px. Dieselbe Logik liegt auf dem
Slider-Hero. Die Caption bleibt durch `,(0,l.jsx)(t.code,{children:`padding-inline:max(var(--s8),calc(50% - 640px))`}),`
in einer 1280-px-Spalte zentriert.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Object-Position pro Bild.`}),` Sobald der Cap greift, beschneidet
`,(0,l.jsx)(t.code,{children:`object-fit:cover`}),` das Bild zusätzlich vertikal. Für Bilder mit zentralen
Gesichtern oder asymmetrischer Komposition den passenden `,(0,l.jsx)(t.code,{children:`object-position`}),`-Wert
direkt am `,(0,l.jsx)(t.code,{children:`<img>`}),`-Element setzen (z. B. `,(0,l.jsx)(t.code,{children:`style="object-position:center 20%"`}),`).
Default ist `,(0,l.jsx)(t.code,{children:`center center`}),`.`]}),`
`,(0,l.jsx)(t.p,{children:`Das folgende Schema zeigt die Bildfläche im 21:9-Format mit dem Caption-Overlay
darüber: Eyebrow, Headline und Sub-Text liegen als Gradient von unten nach oben
über dem Bild.`}),`
`,(0,l.jsx)(r,{children:(0,l.jsx)(`div`,{style:{border:`var(--bd-strong)`,borderRadius:`var(--r-lg)`,overflow:`hidden`,marginBottom:`var(--s8)`},children:(0,l.jsxs)(`div`,{style:{position:`relative`,minHeight:`240px`,background:`linear-gradient(135deg,var(--n-300) 0%,var(--n-200) 55%,var(--n-300) 100%)`},children:[(0,l.jsx)(`div`,{style:{position:`absolute`,top:`var(--s4)`,left:`var(--s5)`,font:`500 12px/14px var(--font)`,letterSpacing:`.1em`,textTransform:`uppercase`,color:`var(--n-500)`},children:(0,l.jsx)(t.p,{children:`Bildfläche · 21:9 · object-fit:cover`})}),(0,l.jsxs)(`div`,{style:{position:`absolute`,left:0,right:0,bottom:0,padding:`var(--s7) var(--s6) var(--s5)`,background:`linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.65) 50%,transparent 100%)`},children:[(0,l.jsx)(`div`,{style:{font:`500 12px/16px var(--font)`,letterSpacing:`.1em`,textTransform:`uppercase`,color:`rgba(255,255,255,.85)`,marginBottom:`var(--s2)`},children:(0,l.jsx)(t.p,{children:`④ Eyebrow, Bereichskontext oder Zeit-Ort`})}),(0,l.jsx)(`div`,{style:{font:`400 28px/34px var(--font-display)`,color:`#fff`,marginBottom:`var(--s2)`},children:(0,l.jsx)(t.p,{children:`⑤ Headline (Caption-Title)`})}),(0,l.jsx)(`div`,{style:{font:`400 14px/20px var(--font)`,color:`rgba(255,255,255,.92)`,maxWidth:`520px`},children:(0,l.jsx)(t.p,{children:`⑥ Sub-Text: konkret und prägnant, max. 2 Sätze.`})})]})]})})}),`
`,(0,l.jsx)(i,{titel:`Hero-Bild mit Eyebrow, Titel und Text`,children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-html`,children:`<!-- Hero-Image: 21:9, Eyebrow + Titel + Text als Gradient-Overlay -->
<figure class="hero-image">
  <div class="hero-image-media">
    <img src="platzhalter.svg" alt="Kurze Bildbeschreibung" loading="eager">
  </div>
  <figcaption class="hero-image-caption">
    <p class="hero-image-caption-eyebrow">Seit 2016 · Dortmund</p>
    <h1 class="hero-image-caption-title">Klare Köpfe. Ruhige Energie.</h1>
    <p class="hero-image-caption-text">KI, Software und Organisationsentwicklung aus Dortmund.</p>
  </figcaption>
</figure>
`})})}),`
`,(0,l.jsxs)(t.h3,{id:`content-breite-akzentbilder-ep-media-band`,children:[`Content-breite Akzentbilder (`,(0,l.jsx)(t.code,{children:`.ep-media-band`}),`)`]}),`
`,(0,l.jsxs)(t.p,{children:[`Zwischen den Sektionen lockern gelegentlich Akzentbilder (Menschen,
Workshop-Atmosphäre) den Lesefluss auf. Anders als das vollbreite Hero-Image laufen
sie nicht randlos, sondern auf Content-Breite: `,(0,l.jsx)(t.code,{children:`.ep-media-band`}),` als `,(0,l.jsx)(t.code,{children:`<figure>`}),`
hängt an derselben Zentrier-Regel wie `,(0,l.jsx)(t.code,{children:`.ep-section`}),`
(`,(0,l.jsx)(t.code,{children:`padding-inline:max(var(--s8),calc(50% - 640px))`}),`) und rastet damit pixelgenau auf
die 1280-px-Spalte ein, bündig mit Text und Karten. Ein randloses Zwischenbild
würde auf breiten Schirmen zu einem sehr breiten, flachen Band mit unkontrolliertem
Beschnitt: Die Proportionen kippen dann je nach Fensterbreite. Auf Content-Breite
gedeckelt bleiben sie stabil, den randlosen Auftritt behält allein der Hero. Die
Ecken sind mit `,(0,l.jsx)(t.code,{children:`--r-lg`}),` gerundet wie Karten, der Radius liegt auf dem `,(0,l.jsx)(t.code,{children:`<img>`}),`, nicht
auf dem `,(0,l.jsx)(t.code,{children:`<figure>`}),` (das ist durch das Gutter-Padding breiter als das sichtbare
Bild). Das Band trägt `,(0,l.jsx)(t.code,{children:`margin:var(--s12) 0`}),`, damit es als eigenständiges Element
auf dem Seitengrund steht und nicht an einer angrenzenden vollbreiten Farbfläche
klebt.`]}),`
`,(0,l.jsx)(t.h2,{id:`slider-hero`,children:`Slider-Hero`}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Status.`}),` Aktuell auf keiner Beispielseite produktiv eingesetzt, der statische
Hero-Image ist der Standard. Der Slider-Hero ist eine optionale Alternative, wenn
mehrere gleichwertige Aussagen rotieren sollen (z. B. wechselnde Kundenprojekte auf
einer Referenz-Übersicht). Aufmerksamkeits-Konkurrenz mit der Marken-Headline
einplanen.`]}),`
`,(0,l.jsxs)(t.p,{children:[`Vollbreit, randlos, 21:9-Format. Caption liegt als Gradient-Overlay über dem Bild.
Modifier-Klasse `,(0,l.jsx)(t.code,{children:`.img-slider-hero`}),` zum Basis-Element hinzufügen.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Übergang.`}),` Crossfade über 600 ms. Slides liegen absolut übereinander; die aktive
Slide trägt die Klasse `,(0,l.jsx)(t.code,{children:`.active`}),` (initial im HTML auf der ersten Slide setzen,
damit beim Page-Load nichts unsichtbar ist). Unter `,(0,l.jsx)(t.code,{children:`prefers-reduced-motion:reduce`}),`
entfällt die Transition automatisch.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Skalierung auf breiten Bildschirmen.`}),` `,(0,l.jsx)(t.code,{children:`.img-slider-hero .img-slider-track`}),` ist
über `,(0,l.jsx)(t.code,{children:`max-height:clamp(420px,64vh,680px)`}),` gedeckelt, damit der Hero auf 4K- und
Ultrawide-Monitoren nicht die gesamte Viewport-Höhe einnimmt. Gleiche Logik wie
beim statischen Hero-Image.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`21:9 gegenüber 16:9.`}),` Hero und Slider-Hero laufen auf `,(0,l.jsx)(t.code,{children:`.hero-image-media`}),` und
`,(0,l.jsx)(t.code,{children:`.img-slider-hero .img-slider-track`}),` mit `,(0,l.jsx)(t.code,{children:`aspect-ratio:21/9`}),`. Der Basis-Slider
außerhalb des Hero-Kontexts (`,(0,l.jsx)(t.code,{children:`.img-slide-media`}),`, genutzt in
`,(0,l.jsx)(t.code,{children:`Komponenten/Slider & Carousel/Carousel`}),`) und `,(0,l.jsx)(t.code,{children:`.card-media`}),` in
`,(0,l.jsx)(t.code,{children:`Komponenten/Cards & Teaser/Card`}),` laufen dagegen mit `,(0,l.jsx)(t.code,{children:`aspect-ratio:16/9`}),`. Ein Hero
ist breiter und flacher als eine Karte, weil er die volle Seitenbreite trägt statt
einer begrenzten Spalte.`]}),`
`,(0,l.jsx)(i,{titel:`Hero-Bildstrecke mit Crossfade`,interaktiv:!0,children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-html`,children:`<!-- Modifier .img-slider-hero für Vollbild-Darstellung mit Crossfade -->
<div class="img-slider img-slider-hero"
     role="region" aria-roledescription="Bildschirmpräsentation" aria-label="Hero-Bildstrecke">
  <div class="img-slider-track">
    <!-- erste Slide trägt .active, damit sie ohne JS sofort sichtbar ist -->
    <div class="img-slide active" role="group" aria-roledescription="Folie" aria-label="Folie 1 von 4">
      <div class="img-slide-media">
        <img src="platzhalter.svg" alt="Kurze Bildbeschreibung">
      </div>
      <div class="img-slide-caption">
        <p class="img-slide-caption-title">Titel</p>
        <p class="img-slide-caption-text">Beschreibung</p>
      </div>
    </div>
    <!-- weitere .img-slide … -->
  </div>
  <button class="img-slider-btn img-slider-prev" aria-label="Vorherige Folie">…</button>
  <button class="img-slider-btn img-slider-next" aria-label="Nächste Folie">…</button>
  <div class="img-slider-dots" role="tablist" aria-label="Folien-Navigation">
    <button class="img-dot" role="tab" aria-selected="true" aria-label="Folie 1 von 4"></button>
    <button class="img-dot" role="tab" aria-selected="false" aria-label="Folie 2 von 4"></button>
  </div>
</div>
`})})}),`
`,(0,l.jsx)(t.h2,{id:`reduzierte-sub-sektion-mit-ctas`,children:`Reduzierte Sub-Sektion mit CTAs`}),`
`,(0,l.jsxs)(t.p,{children:[`Direkt unterhalb des Heros sitzt eine schmale, getönte Sektion (`,(0,l.jsx)(t.code,{children:`.ep-section`}),`,
zentriert, Padding `,(0,l.jsx)(t.code,{children:`var(--s10)`}),`) mit Eyebrow, kurzer Lead-Zeile und zwei CTAs. Sie
übernimmt die Funktion „Was tun?“, ohne mit der Hero-Headline zu konkurrieren: Der
Hero macht das Versprechen, die Sektion darunter macht das Angebot. Eine
Angebots-Sektion direkt unter dem Hero-Image ist auf jeder Customer-Page Pflicht,
ihre Form variiert (schmaler Sub-Strip oder, auf Bereichs-Pages mit
Manifest-Charakter, eine reichere Manifest-Intro).`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Bereichs-Tinting.`}),` Hintergrund und untere Trennlinie folgen dem Page-Bereich,
nicht pauschal Corporate.`]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Page`}),(0,l.jsx)(t.th,{children:`Eyebrow-Text`}),(0,l.jsx)(t.th,{children:`Eyebrow-Farbe`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Landing`}),(0,l.jsx)(t.td,{children:`„Verbunden gedacht“ (Brücke-Variante B)`}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`--co-700`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Angewandte KI`}),(0,l.jsx)(t.td,{children:`Leistungs-Achsen: „AI.Engineering · AI.Automation · AI.Box“`}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`--ki-800`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Effektive Software`}),(0,l.jsx)(t.td,{children:`Manifest-Intro (Variante C): „Was effektive Software ausmacht“`}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`--es-700`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Wirksame Organisationen`}),(0,l.jsx)(t.td,{children:`Leistungs-Achsen: „Change · Leadership · Struktur“`}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`--wo-700`})})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Unternehmen`}),(0,l.jsx)(t.td,{children:`Profil-Hub-Achsen: „Team · Karriere · Referenzen“`}),(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`--co-700`})})]})]})]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`CTAs pro Page-Typ.`}),` Filled (primär, Selbst-Erschließung) plus Outlined
(sekundär, Direkt-Kontakt oder Belege), beide in der Bereichsfarbe.`]}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Page`}),(0,l.jsx)(t.th,{children:`Primär (Filled)`}),(0,l.jsx)(t.th,{children:`Sekundär (Outlined)`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Landing`}),(0,l.jsx)(t.td,{children:`Keine CTAs (Brücke-Variante B)`}),(0,l.jsx)(t.td,{children:`entfällt`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Angewandte KI`}),(0,l.jsx)(t.td,{children:`Use Case analysieren`}),(0,l.jsx)(t.td,{children:`Fallstudien ansehen`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Effektive Software`}),(0,l.jsx)(t.td,{children:`Unsere Leistungen ansehen`}),(0,l.jsx)(t.td,{children:`Gespräch anfragen`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Wirksame Organisationen`}),(0,l.jsx)(t.td,{children:`Transformation starten`}),(0,l.jsx)(t.td,{children:`Ansatz kennenlernen`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Unternehmen`}),(0,l.jsx)(t.td,{children:`Team kennenlernen`}),(0,l.jsx)(t.td,{children:`Karriere`})]})]})]}),`
`,(0,l.jsx)(t.p,{children:`Wichtig: Wenn Hero und Sub-Strip zusammen verwendet werden, darf der Sub-Strip
keine eigene H1 und keine wiederholte Was/Wo-Aussage tragen, sonst entstehen
Doppel-Informationen direkt untereinander. Die Lead-Zeile ist stattdessen die
Brücke zu den CTAs („Schau Dir an, wie wir arbeiten, oder buch direkt ein
Erstgespräch.“) und echoet nicht das Hero-Versprechen.`}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Variante`}),(0,l.jsx)(t.th,{children:`Inhalt`}),(0,l.jsx)(t.th,{children:`Wann einsetzen`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`A · mit CTAs`}),(0,l.jsx)(t.td,{children:`Eyebrow, Lead, zwei Buttons (Filled primär, Outlined sekundär)`}),(0,l.jsx)(t.td,{children:`Standard, wenn die Sub-Sektion zwei direkte Aktionen anbieten soll`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`B · Brücke ohne CTAs`}),(0,l.jsx)(t.td,{children:`Eyebrow, Lead, Drei-Spalter mit Bereichs-Eyebrows`}),(0,l.jsx)(t.td,{children:`Wenn der Sticky-Topnav-Kontakt-Button bereits die primäre Konversion trägt`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`C · Manifest-Intro`}),(0,l.jsxs)(t.td,{children:[`Eyebrow, Lead (erster Satz in `,(0,l.jsx)(t.code,{children:`--ty-serif-md`}),`), Fließtext, zwei CTAs, zweispaltiges Grid`]}),(0,l.jsx)(t.td,{children:`Auf Bereichs-Pages, deren Einstieg eine Haltung oder Definition transportiert`})]})]})]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Wann B statt A?`}),` Hat die Page eine deutliche Architektur mit mehreren
thematischen Sektionen darunter (zum Beispiel die Drei Bereiche), kündigt B diese
Architektur als ruhige Vorschau an. CTAs in der Sub-Sektion würden hier mit dem
Erstgespräch-CTA-Band am Page-Ende konkurrieren. A bleibt richtig auf
Bereichs-Pages, wo die Sub-Sektion die einzige direkte Konversions-Stelle vor dem
Page-Ende ist.`]}),`
`,(0,l.jsx)(t.p,{children:`Das folgende Schema zeigt Variante A: Markenrad-Eyebrow, Lead-Zeile und die zwei
CTAs (Filled primär, Outlined sekundär) auf dem getönten Sub-Strip-Hintergrund.`}),`
`,(0,l.jsx)(r,{children:(0,l.jsx)(`div`,{style:{border:`var(--bd-strong)`,borderRadius:`var(--r-lg)`,overflow:`hidden`,marginBottom:`var(--s8)`},children:(0,l.jsxs)(`div`,{style:{background:`var(--co-50)`,textAlign:`center`,padding:`var(--s7) var(--s6)`},children:[(0,l.jsx)(`div`,{className:`t-co`,style:{font:`500 12px/16px var(--font)`,letterSpacing:`.1em`,textTransform:`uppercase`,marginBottom:`var(--s2)`},children:(0,l.jsx)(t.p,{children:`⑦ Markenrad-Eyebrow „Ruhig · Klar · Energiegeladen“`})}),(0,l.jsx)(`div`,{style:{font:`400 14px/20px var(--font)`,color:`var(--tx-secondary)`,marginBottom:`var(--s4)`,maxWidth:`520px`,marginLeft:`auto`,marginRight:`auto`},children:(0,l.jsx)(t.p,{children:`⑧ Lead-Zeile: Brücke zu den CTAs, nicht das Hero-Versprechen echoen.`})}),(0,l.jsxs)(`div`,{style:{display:`flex`,gap:`var(--s3)`,justifyContent:`center`,flexWrap:`wrap`},children:[(0,l.jsx)(`div`,{style:{background:`var(--co-700)`,borderRadius:`var(--r-full)`,padding:`8px 20px`,font:`var(--ty-name)`,color:`#fff`},children:(0,l.jsx)(t.p,{children:`⑨ Primäraktion (Filled)`})}),(0,l.jsx)(`div`,{className:`t-co`,style:{border:`2px solid var(--co-700)`,borderRadius:`var(--r-full)`,padding:`6px 18px`,font:`var(--ty-name)`},children:(0,l.jsx)(t.p,{children:`⑩ Sekundäraktion (Outlined)`})})]})]})})}),`
`,(0,l.jsx)(i,{titel:`Sub-Strip unter dem Hero`,children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-html`,children:`<!-- Sub-Strip: Bereichs-Tint, Eyebrow, Lead, 2 CTAs (Werte hier: Landing/Corporate) -->
<div class="ep-section" style="background:var(--co-band);text-align:center;padding-block:var(--s10);border-bottom:var(--bd)">
  <p class="ep-hero-eyebrow" style="color:var(--co-ink)">Ruhig · Klar · Energiegeladen</p>
  <p>Schau Dir an, wie wir arbeiten, oder buch direkt ein Erstgespräch.</p>
  <div class="ep-hero-ctas" style="justify-content:center">
    <button class="btn btn-filled btn-co">Unsere Leistungen</button>
    <button class="btn btn-outlined btn-co">Gespräch anfragen</button>
  </div>
</div>
`})})}),`
`,(0,l.jsx)(t.h2,{id:`störer-über-dem-hero-startseite`,children:`Störer über dem Hero (Startseite)`}),`
`,(0,l.jsxs)(t.p,{children:[`Kompakte Verweiskacheln, die als Set oben rechts über dem Hero-Bild liegen und je
auf einen aktuellen Inhalt zeigen: die nächste Veranstaltung, einen neuen
Wissensbeitrag, eine Pressemitteilung oder eine allgemeine Info (neue
Seminar-Landingpage, neues Produkt). Klassen `,(0,l.jsx)(t.code,{children:`.stoerer-hero`}),` (Wrapper um Hero und
Set), `,(0,l.jsx)(t.code,{children:`.stoerer-set`}),`, `,(0,l.jsx)(t.code,{children:`.stoerer-list`}),`, `,(0,l.jsx)(t.code,{children:`.stoerer`}),`.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Nur auf der Startseite.`}),` Auf Bereichs- und Detailseiten trägt der Hero genau
eine Aussage; ein zweiter Aufmerksamkeitspunkt daneben würde sie schwächen. Die
Weiterleitung übernimmt dort die reduzierte Sub-Sektion unter dem Hero.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Das Ziel ist immer die eigene Seite des Inhalts, nie ein Anker auf der
Startseite.`}),` Ein Klick auf die Veranstaltungs-Kachel führt auf die
Veranstaltungs-Detailseite (`,(0,l.jsx)(t.code,{children:`Seitenmuster/Veranstaltung`}),`), die Wissens-Kachel auf
den Beitrag (`,(0,l.jsx)(t.code,{children:`Seitenmuster/Wissensbeitrag`}),`). Der Störer ist eine Abkürzung zum
Inhalt, keine Sprungmarke innerhalb der Startseite. Die Sektion bleibt der
kanonische Ort, sie führt Bild, Anreißer und Kontext, der Störer führt nur Typ,
Titel und Meta. Daraus folgt eine Pflichtregel: Das Thema-Label spiegelt das
Vokabular der zugehörigen Sektion, es führt kein zweites Wort für dieselbe Domäne
ein.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Ein Set, keine Einzelkacheln.`}),` Alle Kacheln eines Sets haben dieselbe Breite
(`,(0,l.jsx)(t.code,{children:`--stoerer-w`}),`, Default 22,5rem/360 px), denselben Aufbau, dieselbe
Typo-Hierarchie und dieselben Abstände. Die Höhe hält `,(0,l.jsx)(t.code,{children:`.stoerer-title`}),` gleich:
`,(0,l.jsx)(t.code,{children:`min-height:2lh`}),` reserviert zwei Zeilen, das innere Element kappt längere Titel
per `,(0,l.jsx)(t.code,{children:`line-clamp`}),`. Default sind zwei Kacheln, drei sind das Maximum.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Eine Farbgebung für alle vier Typen.`}),` Der Inhaltstyp steht im Thema-Label und im
Icon, nie in der Farbe. Vier Bereichsfarben nebeneinander würden gegeneinander und
gegen die Hero-Headline arbeiten. Der Akzent ist deshalb durchgehend Corporate
(`,(0,l.jsx)(t.code,{children:`--co-ink`}),`), aus demselben Grund wie bei der Topnav: der Störer ist Chrome über
dem Bild, kein Bereichsinhalt. Ein `,(0,l.jsx)(t.code,{children:`data-area`}),` gibt es hier bewusst nicht.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Deckende Fläche, kein Glas.`}),` Über einem Foto ist der Grund unbekannt, eine
halbtransparente Kachel trägt je nach Bildstelle 2:1 oder 12:1, und keine Regel
kann das absichern. Auf `,(0,l.jsx)(t.code,{children:`--bg-surface`}),` steht der Text auf einer bekannten Fläche
und ist messbar: Light 5,52 bis 10,92:1, Dark 8,32 bis 10,48:1. Dazu trägt die
Kachel schon im Light einen `,(0,l.jsx)(t.code,{children:`--bd-strong`}),`-Rahmen, abweichend von den übrigen
Karten: auf einer ausgebrannt hellen Bildstelle leistet der schwarze `,(0,l.jsx)(t.code,{children:`--e1`}),`-Schatten
keine Kante mehr. Der Rahmen (`,(0,l.jsx)(t.code,{children:`--bd-strong-c`}),`) liefert Light 2,25:1 gegen die
Kachel, Dark 4,21:1. Er ist Kontur, kein Bedienelement-Rand: die Kachel ist über
ihren Inhalt erkennbar.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Das Typ-Glyph sitzt im Thema-Label, nicht rechts hinter einem Trenner.`}),` Das
Glyph ist ein reiner Typ-Marker, also eine Kategorie, und gehört als
Leading-Element vor das Label. Rechts stand es im Slot für Aktionen und Status,
auf einer vollständig klickbaren Kachel also doppeldeutig (kann als Button
lesen). Ohne Icon-Spalte wächst die Textspalte von 269 auf 326 px (plus 21 %), und
die realistischen Titel der Startseite klammern nicht mehr.`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Platzierung.`}),` Oben rechts, weil die Caption unten links liegt und die
Sub-Sektion direkt darunter die freie Zone bildet. Das Hero-Bild muss dafür
ausgewählt sein: die Kacheln verdecken das obere rechte Viertel deckend, dort darf
also kein tragendes Bildmotiv liegen (Gesichter, Produkt, Logo).`]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Container-Query statt Fensterbreite.`}),` Bei 21:9 ist die Hero-Höhe die Breite ×
9/21. Eine Kachel ist 126 px hoch, drei plus Abstände und der Rand oben brauchen
426 px Höhe und damit 994 px Hero-Breite. Ob die da ist, sagt der Hero, nicht das
Fenster: Eine Media Query auf 1025 px ließ ein Dreier-Set in einem 1200-px-Fenster
mit 898-px-Hero 41 px in die Sub-Sektion ragen. Die Entscheidung hängt deshalb an
einer Container-Query auf `,(0,l.jsx)(t.code,{children:`.stoerer-hero`}),`, Schwelle 64,0625rem (1025 px), dem
Desktop-Tier der Responsive-Strategie:`]}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-css`,children:`.stoerer-hero{position:relative;container-type:inline-size}

@container (min-width:64.0625rem){
  .stoerer-set{position:absolute;top:var(--s6);right:var(--s8)}
  .stoerer-list{display:flex;flex-direction:column;width:var(--stoerer-w)}
}
`})}),`
`,(0,l.jsxs)(t.p,{children:[`Außerhalb der `,(0,l.jsx)(t.code,{children:`@container`}),`-Regel (schmaler Hero oder ein Browser ohne
Container-Query-Support) bleibt `,(0,l.jsx)(t.code,{children:`.stoerer-set`}),` ein normaler Block unter dem Hero,
ein- oder zweispaltig je nach Platz: Das ist der Default-Zweig, und er ist zugleich
der funktionierende Fall, nie ein Overlay, das halb in die Sub-Sektion ragt.`]}),`
`,(0,l.jsxs)(t.p,{children:[`Das folgende Specimen zeigt alle vier Inhaltstypen nebeneinander: gleiche
Fläche, gleiche Typo-Hierarchie, unterschieden allein durch Thema-Label und
Icon. Im Einsatz stehen höchstens drei Kacheln zusammen, deshalb trägt dieses
Specimen eine breitere, abweichende Grid-Spalte; die `,(0,l.jsx)(t.code,{children:`href`}),`-Werte sind
Platzhalter, im Einsatz zeigt jede Kachel auf die Detailseite ihres Inhalts
(siehe Tabelle unten).`]}),`
`,(0,l.jsx)(r,{children:(0,l.jsxs)(`ul`,{className:`stoerer-list`,style:{display:`grid`,gridTemplateColumns:`repeat(auto-fit,minmax(320px,1fr))`,width:`auto`,marginBottom:`var(--s8)`},children:[(0,l.jsx)(`li`,{children:(0,l.jsxs)(`a`,{className:`stoerer`,href:`#gt-hero-stoerer`,children:[(0,l.jsxs)(`span`,{className:`stoerer-topic`,children:[(0,l.jsx)(`svg`,{className:`stoerer-icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"aria-hidden":`true`,children:(0,l.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5`})}),(0,l.jsx)(t.p,{children:`Nächste Veranstaltung`})]}),(0,l.jsx)(`span`,{className:`stoerer-title`,children:(0,l.jsx)(`span`,{children:`Effizienz durch n8n`})}),(0,l.jsx)(`span`,{className:`stoerer-meta`,children:(0,l.jsxs)(t.p,{children:[(0,l.jsx)(`time`,{dateTime:`2026-12-03`,children:`3. Dezember 2026`}),`
`,(0,l.jsx)(`span`,{"aria-hidden":`true`,children:` · `}),`
`,(0,l.jsx)(`span`,{className:`sr-only`,children:`, `}),`
Dortmund`]})})]})}),(0,l.jsx)(`li`,{children:(0,l.jsxs)(`a`,{className:`stoerer`,href:`#gt-hero-stoerer`,children:[(0,l.jsxs)(`span`,{className:`stoerer-topic`,children:[(0,l.jsx)(`svg`,{className:`stoerer-icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"aria-hidden":`true`,children:(0,l.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z`})}),(0,l.jsx)(t.p,{children:`Neu im Wissen`})]}),(0,l.jsx)(`span`,{className:`stoerer-title`,children:(0,l.jsx)(`span`,{children:`Refactoring-Schulden ehrlich rechnen`})}),(0,l.jsx)(`span`,{className:`stoerer-meta`,children:(0,l.jsxs)(t.p,{children:[(0,l.jsx)(`time`,{dateTime:`2026-04-22`,children:`22. April 2026`}),`
`,(0,l.jsx)(`span`,{"aria-hidden":`true`,children:` · `}),`
`,(0,l.jsx)(`span`,{className:`sr-only`,children:`, `}),`
7 min Lesezeit`]})})]})}),(0,l.jsx)(`li`,{children:(0,l.jsxs)(`a`,{className:`stoerer`,href:`#gt-hero-stoerer`,children:[(0,l.jsxs)(`span`,{className:`stoerer-topic`,children:[(0,l.jsx)(`svg`,{className:`stoerer-icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"aria-hidden":`true`,children:(0,l.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46`})}),(0,l.jsx)(t.p,{children:`Pressemitteilung`})]}),(0,l.jsx)(`span`,{className:`stoerer-title`,children:(0,l.jsx)(`span`,{children:`Conciso begleitet Stadtwerke bei der KI-Einführung`})}),(0,l.jsx)(`span`,{className:`stoerer-meta`,children:(0,l.jsx)(`time`,{dateTime:`2026-08-12`,children:`12. August 2026`})})]})}),(0,l.jsx)(`li`,{children:(0,l.jsxs)(`a`,{className:`stoerer`,href:`#gt-hero-stoerer`,children:[(0,l.jsxs)(`span`,{className:`stoerer-topic`,children:[(0,l.jsx)(`svg`,{className:`stoerer-icon`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"aria-hidden":`true`,children:(0,l.jsx)(`path`,{strokeLinecap:`round`,strokeLinejoin:`round`,d:`m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z`})}),(0,l.jsx)(t.p,{children:`Neues Seminar`})]}),(0,l.jsx)(`span`,{className:`stoerer-title`,children:(0,l.jsx)(`span`,{children:`Scrum Master Kurs, neue Termine ab Oktober`})}),(0,l.jsx)(`span`,{className:`stoerer-meta`,children:`Seminar · 2 Tage`})]})})]})}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Inhaltstyp`}),(0,l.jsx)(t.th,{children:`Thema-Label`}),(0,l.jsx)(t.th,{children:`Meta-Zeile`}),(0,l.jsx)(t.th,{children:`Ziel des Links`}),(0,l.jsx)(t.th,{children:`Icon (DS-Key)`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Veranstaltung`}),(0,l.jsx)(t.td,{children:`„Nächste Veranstaltung“`}),(0,l.jsx)(t.td,{children:`Datum · Ort`}),(0,l.jsx)(t.td,{children:`Veranstaltungs-Detailseite`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`ui-calendar-days`}),` (Kalender)`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Wissensbeitrag`}),(0,l.jsx)(t.td,{children:`„Neu im Wissen“`}),(0,l.jsx)(t.td,{children:`Datum · Lesezeit`}),(0,l.jsx)(t.td,{children:`Wissensbeitrag`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`ui-newspaper`}),` (Artikel)`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Pressemitteilung`}),(0,l.jsx)(t.td,{children:`„Pressemitteilung“`}),(0,l.jsx)(t.td,{children:`Datum`}),(0,l.jsx)(t.td,{children:`Presseseite oder einzelne Meldung`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`ui-megaphone`}),` (Megafon)`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Info`}),(0,l.jsx)(t.td,{children:`Spiegelt das Wort des Ziels, z. B. „Neues Seminar“, „Neues Produkt“`}),(0,l.jsx)(t.td,{children:`Kurze Einordnung, z. B. Format und Dauer`}),(0,l.jsx)(t.td,{children:`Seminar-Landingpage, Produkt- oder Angebotsseite`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`ui-information-circle`}),` (Info)`]})]})]})]}),`
`,(0,l.jsxs)(t.p,{children:[(0,l.jsx)(t.strong,{children:`Icon-Mapping.`}),` `,(0,l.jsx)(t.code,{children:`ui-newspaper`}),` ist im Designsystem das Artikel-Glyph und trägt
deshalb den Wissensbeitrag. Die Pressemitteilung bekommt das Megafon: Sie ist eine
Verlautbarung, kein Beitrag zum Lesen. Alle vier Icons sind Outline, 16 px mit
`,(0,l.jsx)(t.code,{children:`--icon-stroke-micro`}),`, die Micro-Stufe der Icon-Skala (16 × 16 trägt Stroke 1,
24 × 24 trüge 1,25), damit sie sich als Familie lesen. Ein fünfter Typ braucht ein
fünftes Icon aus dieser Familie, keine Doppelbelegung, sonst unterscheidet das Icon
nichts mehr.`]}),`
`,(0,l.jsx)(i,{titel:`Hero-Bild mit Störer-Set`,children:(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-html`,children:`<div class="stoerer-hero">
  <figure class="hero-image">
    <div class="hero-image-media">
      <img src="platzhalter.svg" alt="Kurze Bildbeschreibung" loading="lazy">
    </div>
    <figcaption class="hero-image-caption">
      <p class="hero-image-caption-eyebrow">Seit 2016 · Dortmund</p>
      <p class="hero-image-caption-title">Klare Köpfe. Ruhige Energie.</p>
      <p class="hero-image-caption-text">KI, Software und Organisationsentwicklung aus Dortmund.</p>
    </figcaption>
  </figure>
  <aside class="stoerer-set" aria-label="Aktuelles">
    <ul class="stoerer-list">
      <li>
        <a class="stoerer" href="/veranstaltungen/effizienz-durch-n8n">
          <span class="stoerer-topic">
            <svg class="stoerer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>
            Nächste Veranstaltung
          </span>
          <span class="stoerer-title"><span>Effizienz durch n8n</span></span>
          <span class="stoerer-meta">
            <time datetime="2026-12-03">3. Dezember 2026</time><span aria-hidden="true"> · </span><span class="sr-only">, </span>Dortmund
          </span>
        </a>
      </li>
    </ul>
  </aside>
</div>
`})})}),`
`,(0,l.jsx)(t.h3,{id:`störer--zustände`,children:`Störer · Zustände`}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Zustand`}),(0,l.jsx)(t.th,{children:`Darstellung`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`:hover`})}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--bg-surface-hover`}),` plus `,(0,l.jsx)(t.code,{children:`--e3`}),`, 2 px Lift, Titel unterstrichen`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:(0,l.jsx)(t.code,{children:`:focus-visible`})}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--focus-ring`}),` plus `,(0,l.jsx)(t.code,{children:`--e3`})]})]})]})]}),`
`,(0,l.jsx)(t.h3,{id:`störer--barrierefreiheit`,children:`Störer · Barrierefreiheit`}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Aspekt`}),(0,l.jsx)(t.th,{children:`Regel`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Kontrast Thema`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--co-ink`}),` auf `,(0,l.jsx)(t.code,{children:`--bg-surface`}),`: Light 5,52:1, Dark 8,32:1`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Kontrast Titel`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--tx-primary`}),`: Light 10,92:1, Dark 10,48:1`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Kontrast Meta`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--tx-secondary`}),`: Light 6,29:1, Dark 7,13:1, nicht `,(0,l.jsx)(t.code,{children:`--tx-muted`})]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Deckende Fläche`}),(0,l.jsxs)(t.td,{children:[`Text über Foto lässt sich nicht messen. Die Kachel ist deshalb opak, kein `,(0,l.jsx)(t.code,{children:`backdrop-filter`}),`, keine Alpha-Fläche`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Rahmen`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--bd-strong-c`}),`: Light 2,25:1 gegen die Kachel, Dark 4,21:1. Kontur gegen das Foto, kein Bedienelement-Rand`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Fokus`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`--focus-ring`}),` auf der ganzen Kachel plus `,(0,l.jsx)(t.code,{children:`--e3`}),`, ein Tab-Stop je Kachel, kein verschachtelter Link`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Hover ohne Farbe`}),(0,l.jsx)(t.td,{children:`Der Titel unterstreicht (WCAG 1.4.1), ein Schatten- oder Flächen-Zuwachs ist über einem Foto je nach Bildstelle kaum sichtbar`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Landmark`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`<aside aria-label="Aktuelles">`}),` nach der Caption im DOM: Die H1 kommt zuerst, der Störer danach (WCAG 1.3.2)`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Trennzeichen`}),(0,l.jsxs)(t.td,{children:[`Der mittige Punkt in der Meta-Zeile ist `,(0,l.jsx)(t.code,{children:`aria-hidden`}),`, daneben steht ein `,(0,l.jsx)(t.code,{children:`.sr-only`}),`-Komma, sonst verschmelzen Datum und Ort`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Icon`}),(0,l.jsxs)(t.td,{children:[(0,l.jsx)(t.code,{children:`aria-hidden="true"`}),`, es wiederholt nur das Thema-Label und trägt keine eigene Bedeutung`]})]})]})]}),`
`,(0,l.jsx)(t.h3,{id:`störer--verwendung`,children:`Störer · Verwendung`}),`
`,(0,l.jsxs)(t.table,{children:[(0,l.jsx)(t.thead,{children:(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.th,{children:`Aspekt`}),(0,l.jsx)(t.th,{children:`Regel`})]})}),(0,l.jsxs)(t.tbody,{children:[(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Anzahl`}),(0,l.jsx)(t.td,{children:`Default zwei, Maximum drei. Eine einzelne Kachel ist erlaubt, wenn nur ein Anlass aktuell ist`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Ein Typ, eine Kachel`}),(0,l.jsxs)(t.td,{children:[`Kein Typ doppelt im Set. Für mehrere Termine auf die Veranstaltungsübersicht (`,(0,l.jsx)(t.code,{children:`Seitenmuster/Veranstaltungsübersicht`}),`) verlinken`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Thema-Label`}),(0,l.jsx)(t.td,{children:`Ein bis drei Wörter, benennt den Inhaltstyp, nicht den Bereich`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Vokabular`}),(0,l.jsx)(t.td,{children:`Ein Domänenwort pro Domäne über Nav, Störer und Sektion`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Ziel`}),(0,l.jsx)(t.td,{children:`Die Detailseite des Inhalts, nie ein Abschnitt der Startseite. Existiert für einen Anlass keine eigene Seite, ist er kein Störer-Kandidat`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Dublette`}),(0,l.jsx)(t.td,{children:`Erlaubt und beabsichtigt: der Störer ist die Abkürzung zu einem Inhalt, der weiter unten seine Sektion hat. Bedingung: gleiches Ziel und gleiches Domänenwort, plus der Titel im zugänglichen Namen`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Titel`}),(0,l.jsxs)(t.td,{children:[`Der Titel des Inhalts, gekürzt auf das, was in zwei Zeilen trägt, redaktionell, nicht dem `,(0,l.jsx)(t.code,{children:`line-clamp`}),` überlassen`]})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Reihenfolge`}),(0,l.jsx)(t.td,{children:`Redaktionell frei, bewusst ohne Regel, aber sie wechselt nicht pro Seitenaufruf`})]}),(0,l.jsxs)(t.tr,{children:[(0,l.jsx)(t.td,{children:`Aktualität`}),(0,l.jsx)(t.td,{children:`Ein Störer verfällt: vergangene Termine und Meldungen älter als das gewählte Redaktionsfenster raus`})]})]})]}),`
`,(0,l.jsx)(`div`,{className:`doc-eyebrow`,children:`Dos & Don'ts`}),`
`,(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:`✓ Tun`})}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:`Alle Kacheln eines Sets in gleicher Breite, gleichem Aufbau und gleicher Typo-Hierarchie halten, sie sind ein Set`}),`
`,(0,l.jsx)(t.li,{children:`Den Inhaltstyp über Thema-Label und Icon unterscheiden, die Farbgebung bleibt für alle Typen dieselbe`}),`
`,(0,l.jsxs)(t.li,{children:[`Die ganze Kachel als `,(0,l.jsx)(t.code,{children:`<a>`}),` auszeichnen, ein Tab-Stop, sichtbarer Hover und Fokus`]}),`
`,(0,l.jsxs)(t.li,{children:[`Titel redaktionell auf zwei Zeilen kürzen, statt sich auf das `,(0,l.jsx)(t.code,{children:`line-clamp`}),` zu verlassen`]}),`
`,(0,l.jsx)(t.li,{children:`Das Thema-Label mit dem Wort der zugehörigen Sektion bilden`}),`
`,(0,l.jsx)(t.li,{children:`Das Typ-Glyph als Leading-Element direkt vor sein Label setzen`}),`
`,(0,l.jsx)(t.li,{children:`Den Störer der Startseite vorbehalten, auf allen anderen Seiten trägt der Hero eine Aussage`}),`
`]}),`
`,(0,l.jsx)(t.p,{children:(0,l.jsx)(t.strong,{children:`✕ Nicht tun`})}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[`Kacheln in Bereichsfarben einfärben oder `,(0,l.jsx)(t.code,{children:`data-area`}),` setzen, dann konkurrieren sie untereinander und mit dem Hero`]}),`
`,(0,l.jsxs)(t.li,{children:[`Halbtransparente Fläche oder `,(0,l.jsx)(t.code,{children:`backdrop-filter`}),`, der Kontrast hängt dann von der Bildstelle ab`]}),`
`,(0,l.jsx)(t.li,{children:`Mehr als drei Kacheln, unterschiedlich große Kacheln, oder eine Kachel mit Bild und Anreißer (das ist dann eine Card und gehört in eine Sektion)`}),`
`,(0,l.jsx)(t.li,{children:`Buttons, einen zweiten Link oder ein Schließen-Kreuz in der Kachel, das bricht den einen Tab-Stop`}),`
`,(0,l.jsx)(t.li,{children:`Auf einen Anker der eigenen Seite verlinken statt auf die Detailseite`}),`
`,(0,l.jsx)(t.li,{children:`Das Glyph in den Trailing-Slot rechts stellen, mit oder ohne Trenner`}),`
`,(0,l.jsx)(t.li,{children:`Ein zweites Wort für dieselbe Domäne einführen`}),`
`,(0,l.jsx)(t.li,{children:`Das Overlay über eine Media Query an die Fensterbreite hängen statt über eine Container-Query an die Hero-Breite`}),`
`]}),`
`,(0,l.jsx)(t.h2,{id:`verwandte-seiten`,children:`Verwandte Seiten`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`Komponenten/Hero/Hero-Bild`}),` (`,(0,l.jsx)(t.code,{children:`cds-hero-image`}),`)`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`Komponenten/Hero/Störer`}),` (`,(0,l.jsx)(t.code,{children:`cds-stoerer`}),`, `,(0,l.jsx)(t.code,{children:`cds-stoerer-set`}),`)`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`Komponenten/Slider & Carousel/Carousel`}),` (Track-Mechanik des Slider-Hero)`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`Komponenten/Cards & Teaser/Card`}),` (16:9-Referenz gegenüber dem 21:9-Hero)`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`Seitenmuster/Veranstaltung`}),`, `,(0,l.jsx)(t.code,{children:`Seitenmuster/Wissensbeitrag`}),` (Ziele der Störer-Kacheln)`]}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var l;function init_hero(){return(init_hero=e((()=>{l=i(),o(),t(),s()})))()}init_hero();export{MDXContent as default};