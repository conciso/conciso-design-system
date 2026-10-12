import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n}from"./blocks-CgfgLRYg.js";import{s as r}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i,r as a}from"./react-C77DJ2jK.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...i(),...e.components},{HtmlBeispiel:r}=t;return r||_missingMdxReference(`HtmlBeispiel`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n,{title:`Seitenmuster/Seminar · Training`,name:`Übersicht`}),`
`,(0,o.jsx)(t.h1,{id:`seminar--training`,children:`Seminar · Training`}),`
`,(0,o.jsxs)(t.p,{children:[`Page-Pattern für die Landingpage eines einzelnen Seminars oder Trainings, an einen Bereich
gebunden (Beispiel: Wirksame Organisationen, `,(0,o.jsx)(t.code,{children:`data-accent="wo"`}),`).`]}),`
`,(0,o.jsx)(t.h2,{id:`aufbau`,children:`Aufbau`}),`
`,(0,o.jsx)(t.p,{children:`Reihenfolge nach Entscheidungslogik: erst Orientierung und Vertrauen, dann Buchung, dann
Tiefe. Das Vertrauen (Trainer) steht bewusst vor den Terminen.`}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Sektion`}),(0,o.jsx)(t.th,{children:`Inhalt`}),(0,o.jsx)(t.th,{children:`Hintergrund`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Hero`}),(0,o.jsx)(t.td,{children:`Pill-Eyebrow plus große Headline plus Subline, kein CTA`}),(0,o.jsx)(t.td,{children:`Bereich-50 (getönt)`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Lernziele plus Angebots-Kasten`}),(0,o.jsxs)(t.td,{children:[`Zweispaltig: links (`,(0,o.jsx)(t.code,{children:`.col-8`}),`) die scanbare Bullet-Liste, rechts (`,(0,o.jsx)(t.code,{children:`.col-4`}),`) Preis und Rahmendaten. Ein eigener Fakten-Streifen unter dem Header entfällt bewusst`]}),(0,o.jsx)(t.td,{children:`weiß`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Trainer`}),(0,o.jsxs)(t.td,{children:[`Bei einer Person das Profil groß, bei zwei bis vier `,(0,o.jsx)(t.code,{children:`.author-card-group.is-grid`}),` (siehe unten)`]}),(0,o.jsx)(t.td,{children:`weiß`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Termine`}),(0,o.jsx)(t.td,{children:`Wiederholbare Termin-Zeilen plus Anmeldung`}),(0,o.jsxs)(t.td,{children:[`grau (`,(0,o.jsx)(t.code,{children:`--n-50`}),`)`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Inhalte & Voraussetzungen`}),(0,o.jsx)(t.td,{children:`Zweispaltig, Fließtext plus Sidebar`}),(0,o.jsx)(t.td,{children:`weiß`})]})]})]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Rhythmus:`}),` ein getönter Hero als Akzent, danach Weiß/Grau-Wechsel, die letzte Sektion
bleibt weiß, sodass der graue Footer sich klar absetzt (Haarlinie).`]}),`
`,(0,o.jsxs)(t.h2,{id:`rahmendaten--ep-facts`,children:[`Rahmendaten · `,(0,o.jsx)(t.code,{children:`.ep-facts`})]}),`
`,(0,o.jsxs)(t.p,{children:[`Dauer, Format, Gruppengröße, Sprache, Preis: die Angaben, an denen sich entscheidet, ob ein
Angebot passt. Sie stehen als semantische `,(0,o.jsx)(t.code,{children:`<dl>`}),` mit `,(0,o.jsx)(t.code,{children:`.ep-facts`}),`, einspaltig, Label über
Wert, Haarlinie zwischen den Paaren. Labels tragen den Bereichston über `,(0,o.jsx)(t.code,{children:`.t-XX`}),`, nie als
Inline-Farbe.`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Zwei Darstellungen:`}),` einspaltig als Grundform, zweispaltig über `,(0,o.jsx)(t.code,{children:`.is-grid`}),` für Kästen,
die neben Inhalt stehen (macht den Kasten kompakter, verzichtet dafür auf die Haarlinien und
eignet sich nur für kurze Werte, lange Werte brauchen die Grundform). Über `,(0,o.jsx)(t.code,{children:`auto-fit`}),` wird
sie in schmalen Kästen von selbst wieder einspaltig.`]}),`
`,(0,o.jsx)(t.p,{children:`Die Liste bringt keinen eigenen Rahmen und keine Fläche mit, sie zieht in einen Container
ein, den die Seite schon hat (Angebots-Box oder Sticky-Sidebar). Nur wenn eine Seite keinen
solchen Container hat, bekommt sie einen schlichten eigenen. Vorher prüfen, was der
Container schon sagt: Eine Angebots-Box nennt Laufzeit, Leistung und Ergebnis oft bereits
im Label und in der Häkchenliste, dann entfällt die Liste ganz. Doppelte Angaben sind
schlimmer als fehlende, sie lesen sich wie zwei Quellen, die sich widersprechen könnten.`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Kein eigener Streifen unter dem Hero.`}),` Die Angaben standen früher als eigener
Key-Facts-Streifen zwischen Hero und erster Inhaltssektion. Sie sitzen jetzt dort, wo auch
über das Angebot entschieden wird, das hält sie an einer Stelle statt an zweien. Wer die Rahmendaten früher sichtbar braucht,
löst das nicht über einen neuen Streifen, sondern indem Preis und primäre Aktion nach oben
wandern.`]}),`
`,(0,o.jsx)(r,{titel:`Fakten-Liste ohne Rahmen`,children:(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<!-- Ohne eigenen Rahmen: steht bereits in einer Angebots-Box oder Sidebar. -->
<dl class="ep-facts">
  <div>
    <dt class="t-wo">Dauer</dt>
    <dd>2 Tage, 9 bis 17 Uhr</dd>
  </div>
  <!-- weitere Paare, nur Angaben, die der Container nicht schon nennt -->
</dl>
`})})}),`
`,(0,o.jsx)(t.h2,{id:`trainerinnen`,children:`Trainer:innen`}),`
`,(0,o.jsxs)(t.p,{children:[`Die Sektion steht bewusst vor den Terminen: Wer bucht, will vorher wissen, wer vorne steht.
Trainer:innen kommen nur auf Seminar- und Training-Landings vor, nicht in Wissensbeiträgen.
Markup-seitig sind sie keine eigene Komponente, sondern die Author Card (siehe
`,(0,o.jsx)(t.code,{children:`Seitenmuster/Wissensbeitrag`}),`, Abschnitt Author Card) in einer Gruppe:
`,(0,o.jsx)(t.code,{children:`.author-card-group`}),` stapelt untereinander, `,(0,o.jsx)(t.code,{children:`.author-card-group.is-grid`}),` stellt sie
zweispaltig. Eine gemeinsame `,(0,o.jsx)(t.code,{children:`.author-card-group-eyebrow`}),` ersetzt die Eyebrows der einzelnen
Karten, trägt die Sektion bereits ein `,(0,o.jsx)(t.code,{children:`.ep-section-label`}),` plus H2, entfällt sie.`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Wann welche Darstellung:`}),` Die Entscheidung fällt an der Personenzahl, nicht am
Geschmack.`]}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Personen`}),(0,o.jsx)(t.th,{children:`Darstellung`}),(0,o.jsx)(t.th,{children:`Warum`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`1`}),(0,o.jsxs)(t.td,{children:[`Große Sektion: Bild im Format 4:3 in `,(0,o.jsx)(t.code,{children:`.col-5`}),`, Name, Rolle und Bio in `,(0,o.jsx)(t.code,{children:`.col-7`})]}),(0,o.jsx)(t.td,{children:`Bei genau einer Person trägt das große Bild, ein 64-px-Avatar wirkt beiläufig, obwohl die Person hier das Vertrauen stiftet`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`2 bis 4`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.author-card-group.is-grid`}),`, Avatar `,(0,o.jsx)(t.code,{children:`.article-avatar-lg`}),` (64 px), ein bis zwei Sätze Bio`]}),(0,o.jsx)(t.td,{children:`Gestapelt würden vier volle Bios die Sektion über 1.500 px lang machen und die Termine aus dem Blick schieben`})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Mehr als 4`}),(0,o.jsx)(t.td,{children:`Nicht mit diesem Muster, auf die durchführenden Personen kürzen oder auf das Team-Tile-Grid ohne Bio wechseln`}),(0,o.jsx)(t.td,{children:`Ab der dritten Reihe liest niemand mehr Bios`})]})]})]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Warum Raster statt Tile-Grid:`}),` Das Team-Tile-Grid (siehe `,(0,o.jsx)(t.code,{children:`Seitenmuster/Wissensbeitrag`}),`)
stellt vier Personen kompakter dar, aber ohne Bio. Auf einer Landing, die etwas verkauft,
ist die Bio das Argument, sie beantwortet, warum diese Person das Training hält. Container
ist 960 statt 720 px, weil zwei Karten nebeneinander sonst je rund 340 px hätten und der
Avatar den Text auf etwa 260 px drückt. Mobil kollabiert das Raster bei 768 px einspaltig.`]}),`
`,(0,o.jsx)(r,{titel:`Trainer:innen-Gruppe mit gemeinsamer Überschrift`,children:(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-html`,children:`<!-- Gemeinsame Überschrift ist optional: Trägt die Sektion bereits ein
     .ep-section-label plus H2, entfällt sie. -->
<p class="author-card-group-eyebrow">Trainer:innen</p>
<div class="author-card-group is-grid">
  <!-- Unveränderte Author Card, nur ohne .author-card-eyebrow -->
  <div class="author-card" data-area="wo">
    <div class="article-avatar article-avatar-lg" data-area="wo" aria-hidden="true">TM</div>
    <div>
      <p class="author-card-name">Tobias Mehnert</p>
      <p class="author-card-role">Senior-Berater Organisationsentwicklung</p>
      <p class="author-card-bio">Begleitet seit über 15 Jahren Veränderungsvorhaben.</p>
    </div>
  </div>
  <!-- 1 bis 3 weitere Karten, insgesamt maximal 4 -->
</div>
`})})}),`
`,(0,o.jsx)(t.h2,{id:`termine-modul`,children:`Termine-Modul`}),`
`,(0,o.jsxs)(t.p,{children:[`Beliebig wiederholbare Termin-Zeile (`,(0,o.jsx)(t.code,{children:`<li>`}),`) mit linker Bereichs-Akzentleiste. Der
Anmeldebutton führt auf die adaptive Kontaktseite mit vorbelegtem Bereich und Anliegen.`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Anfrage statt Direktbuchung:`}),` Das ist bewusst so, weil Seminartermine bei Conciso oft im
Gespräch entstehen. Steht bei einem Angebot der Preis pro Platz fest und ist das Kontingent
bekannt, gehört stattdessen das Buchungsformular (siehe `,(0,o.jsx)(t.code,{children:`Komponenten/Buchungsformular`}),`) auf
die Seite. Die Abwägung zwischen beiden Wegen steht dort im Abschnitt „Anfrage oder
Direktbuchung“.`]}),`
`,(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:`Element`}),(0,o.jsx)(t.th,{children:`Umsetzung`})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Datum / Ort`}),(0,o.jsxs)(t.td,{children:[`Datum `,(0,o.jsx)(t.code,{children:`--ty-title-sm`}),`, Ort oder „Online“ `,(0,o.jsx)(t.code,{children:`--ty-body-sm`}),` · `,(0,o.jsx)(t.code,{children:`--tx-secondary`})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Termingarantie / Status`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.badge-ok`}),` „Durchführung garantiert“ wenn gesichert, sonst neutraler Status-Text („Noch Plätze frei“). Ohne Garantie entfällt die Markierung.`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Anmeldung`}),(0,o.jsxs)(t.td,{children:[(0,o.jsx)(t.code,{children:`.btn-sm`}),` in Bereichsfarbe „Platz anfragen“ → Kontaktseite (`,(0,o.jsx)(t.code,{children:`data-k-bereich`}),`/`,(0,o.jsx)(t.code,{children:`data-k-anliegen`}),`)`]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:`Leerzustand`}),(0,o.jsx)(t.td,{children:`Ohne offene Termine entfällt die Liste, stattdessen Hinweis „nur auf Anfrage“ plus Outlined-CTA „Termin anfragen“`})]})]})]}),`
`,(0,o.jsx)(t.h2,{id:`inhalte--sticky-sidebar`,children:`Inhalte & Sticky-Sidebar`}),`
`,(0,o.jsxs)(t.p,{children:[`Hauptteil zweispaltig (`,(0,o.jsx)(t.code,{children:`.layout-grid`}),`, `,(0,o.jsx)(t.code,{children:`align-items:start`}),`): links (`,(0,o.jsx)(t.code,{children:`.col-8`}),`) langer
Fließtext mit eingestreuten Bildern und den Voraussetzungen als Unterabschnitt, rechts
(`,(0,o.jsx)(t.code,{children:`.col-4`}),`) das Kontaktformular. Preis und Rahmendaten sitzen nicht hier, sondern weiter oben
neben den Lernzielen. Die Formular-Überschrift ist ein gefüllter Bereichsbalken und sitzt
oben auf ihrer eigenen Karte.`]}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:`Sticky:`}),` Die Sidebar trägt `,(0,o.jsx)(t.code,{children:`position:sticky;top:var(--s4)`}),` und läuft in Produktion beim
Scrollen mit. Auf Mobile rutscht die Sidebar unter den Fließtext.`]}),`
`,(0,o.jsx)(t.h2,{id:`buchungs-anker`,children:`Buchungs-Anker`}),`
`,(0,o.jsxs)(t.p,{children:[`Am Ende der Inhalte ein dezenter Text-Link „Zu den Terminen“ als In-Page-Anker auf die
Termine-Sektion (`,(0,o.jsx)(t.code,{children:`id="seminar-termine"`}),`), smooth-scrollend. Schließt die Buchungs-Schleife
ohne zweites CTA-Band.`]}),`
`,(0,o.jsx)(t.h2,{id:`verwendung`,children:`Verwendung`}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Dos`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Vertrauen (Trainer, Belege) vor die Termine setzen, die Buchung folgt der Überzeugung.`}),`
`,(0,o.jsx)(t.li,{children:`Rahmendaten und Preis dort zeigen, wo über das Angebot entschieden wird, das
Termine-Modul auch im Leerzustand bedienen.`}),`
`]}),`
`,(0,o.jsx)(t.p,{children:(0,o.jsx)(t.strong,{children:`Don'ts`})}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Viele große Bilder pro Sektion, wenige platzierte Bilder halten den Lesefluss ruhig.`}),`
`,(0,o.jsx)(t.li,{children:`Buchungs-CTA nur ganz oben, ohne Anker am Seitenende.`}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var o;function init_seminar(){return(init_seminar=e((()=>{o=r(),a(),t()})))()}init_seminar();export{MDXContent as default};