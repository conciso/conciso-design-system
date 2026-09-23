import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * AuthorCard (`div[cdsAuthorCard]`) — Wrapper um `.author-card` aus css/components.css
 * (css/components.css:1602–1606): der Avatar-plus-Bio-Strip am Ende eines
 * Wissensbeitrags, einzeln oder mehrfach in `cds-author-card-group`. Dreizehntes und
 * letztes Ticket der Seitenbausteine-Serie. Ausgezählt: 17 reale Vorkommen in
 * `docs/index.html` — 4 einzelstehend (2 Doku-Demos `docs/index.html:8193,8207`, 1
 * Artikel-Demo `8424`, 1 reale Beispielseite `15179`) und 13 in fünf Gruppen (siehe
 * `AuthorCardGroupComponent`).
 *
 * **Attributselektor (ADR-0008), gemessen im `is-grid`-Fall statt nur hergeleitet.**
 * `.author-card-group.is-grid` (css/components.css:1555) ist `display:grid` ohne
 * eigenes `align-items` — der CSS-Default `stretch` gleicht die Kartenhöhen einer
 * Reihe deshalb NUR aus, wenn `.author-card` selbst das Grid-Kind ist. Spike-Story
 * (zwei Karten, 600-px-Raster, kurze gegen deutlich längere Bio, seither wieder
 * gelöscht) hat beide Varianten nebeneinander gebaut und mit `getBoundingClientRect()`
 * gemessen:
 *
 * | Variante | Grid-Kind (Tag) | `.author-card`-Höhen | Bio-Rect (kurz / lang) |
 * |---|---|---|---|
 * | Element-Selektor `<cds-author-card-naive>` | `CDS-AUTHOR-CARD-NAIVE`, 204/204 px (gestreckt) | **84 / 204 px** (ungleich) | 24×73 / 144×200 px |
 * | Attributselektor `div[cdsAuthorCardSpike]` | `DIV.author-card`, 204/204 px | **204 / 204 px** (gleich) | — |
 *
 * Beim Element-Selektor wird der UNSICHTBARE `<cds-author-card-naive>`-Host auf 204 px
 * gestreckt, die sichtbare `.author-card`-Box eine Ebene darunter bleibt bei ihrer
 * Inhaltshöhe (84 px) — exakt der Fehler aus ADR-0008 Fall 1. Mit dem Attributselektor
 * IST `.author-card` das Grid-Kind, `align-items:stretch` trifft direkt zu.
 *
 * **Ehrlicher Zusatz, anders als bei `cds-icon-card`: die Baseline-Screenshots beider
 * Spike-Varianten waren byte-identisch** (`sha1` gleich). `.author-card` trägt (anders
 * als `.ep-card`) weder Hintergrund noch Rahmen noch Schatten — der zusätzliche,
 * unsichtbare Leerraum unter der kurzen Bio malt in keiner der beiden Varianten ein
 * Pixel. Der Fehler ist damit heute rein strukturell (falsches Boxmodell, `getBoundingClientRect()`
 * auf `.author-card` lügt), nicht optisch sichtbar. Er wird real, sobald `.author-card`
 * künftig einen Rahmen/Hintergrund/Hover-Zustand bekommt, und er verfälscht schon
 * heute jede Messung/Positionierung, die sich auf die tatsächliche Kartenhöhe verlässt
 * (u. a. die Story „Als Raster“ unten, die genau das pinnt). Das ADR-0008-Kriterium
 * ist strukturell formuliert („die Stelle im DOM einnehmen, die es ohne Angular
 * einnähme“), nicht optisch — der Attributselektor bleibt deshalb die richtige Wahl,
 * obwohl der Effekt heute unsichtbar ist.
 *
 * **`area` ist bewusst NICHT Teil der API — CSS-Befund, nicht erfundene Konfiguration.**
 * Alle 17 realen `.author-card`-Vorkommen tragen `data-area`, und sowohl
 * `docs/index.html:8185` als auch `wissensbeitrag.mdx:199` behaupten wörtlich, das
 * färbe „nur den Avatar“. Ausgezählt gibt es aber in `css/components.css` (Light UND
 * Dark) KEINE einzige `.author-card[data-area="…"]`-Regel — weder direkt noch über
 * einen Nachfahren-Selektor auf `.article-avatar`, dessen eigene
 * `[data-area]`-Färbung (css/components.css:1523–1526) ein Element-Selektor auf dem
 * Avatar selbst ist, unabhängig vom Vorfahren. `data-area` auf `.author-card` ist
 * damit, gegen die Doku-Aussage, komplett wirkungslos — die Bereichsfarbe kommt
 * ausschließlich vom `area`-Input, den der Konsument direkt an das projizierte
 * `[cdsAvatar]` bindet (siehe unten). Ein `area`-Input, der hier nur `data-area` ohne
 * jede CSS-Wirkung setzt, wäre eine erfundene Konfiguration ohne Gegenwert — Befund
 * gemeldet, nicht im Wrapper geflickt (ADR-0001):
 * `.scratch/angular-seitenbausteine/issues/24-css-luecke-author-card-data-area.md`.
 *
 * **Avatar projiziert über `[cdsAvatar]`, wie bei `cds-article-header`.** Der
 * Konsument setzt Größe (`size="lg"`, css/components.css:1527) und Bereich
 * (`area="…"`) direkt am projizierten `<div cdsAvatar>` — diese Komponente reicht
 * nichts durch, exakt die Trennung, die `cds-article-header` bereits etabliert
 * (siehe dessen Klassendoku, Abschnitt „Avatar projiziert über `[cdsAvatar]`“).
 *
 * **Eyebrow als `<h3>`, nur wenn gesetzt** (Beiwerk, Default `''`) — deckungsgleich
 * mit allen 4 einzelstehenden realen Vorkommen: 2 tragen `<h3 class="author-card-eyebrow">`
 * (`docs/index.html:8196,8427`, „Über den Autor“/„Über die Autorin“, Ticket-Vorgabe:
 * eine Ebene unter dem `<h2>` des Article-Body), die anderen 2 (Doku-Demos ohne
 * umgebende Artikelstruktur) haben gar keinen. Innerhalb einer Gruppe trägt laut
 * `wissensbeitrag.mdx` („Eyebrow-Konvention“) keine einzelne Karte mehr einen eigenen
 * Eyebrow — die Gruppen-Überschrift ersetzt sie (siehe `AuthorCardGroupComponent`);
 * Konsumenten lassen `eyebrow` dafür einfach leer.
 *
 * **`roleLabel`, NICHT `role` wie im Ticket-Text — gemessene Abweichung, kein
 * Freihand-Entscheid.** Ein erster Entwurf folgte der Ticket-API wörtlich
 * (`role`-Input, mit `role="…"` als schlichtem Attribut in den Stories gesetzt, wie
 * `name`/`bio`/`eyebrow`). Storybooks eingebauter a11y-Check (`aria-roles`) schlug
 * darauf für JEDE Story mit echtem Rollentext fehl: `role` ist ein globales
 * HTML-/ARIA-Attribut, und ein Angular-Input MIT DIESEM NAMEN wird bei einem
 * ungebundenen `role="Senior AI Engineer …"` zwar als Startwert an den Input
 * durchgereicht, bleibt aber ZUSÄTZLICH als echtes `role`-Attribut im DOM stehen —
 * axe meldete wörtlich „Roles must be one of the valid ARIA roles: Senior, AI,
 * Engineer, …“, weil der Freitext als ARIA-Rolle interpretiert wird. Exakt dieselbe
 * Kollision umgehen `BlockquoteComponent`, `TestimonialComponent` und
 * `TeamVoiceComponent` bereits mit `roleLabel` statt `role`
 * (`grep -rn "readonly role" angular-lib/projects/design-system-angular/src/lib/`
 * zeigt nur diese drei). Diese Komponente folgt demselben, bereits etablierten
 * Muster statt die Kollision ein viertes Mal zu wiederholen — CSS-Klasse bleibt
 * unverändert `.author-card-role`, nur der Input-Name weicht vom Ticket-Text ab.
 */
@Component({
  selector: 'div[cdsAuthorCard]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'author-card' },
  template: `
    <ng-content select="[cdsAvatar]"></ng-content>
    <div>
      @if (eyebrow()) {
        <h3 class="author-card-eyebrow">{{ eyebrow() }}</h3>
      }
      <p class="author-card-name">{{ name() }}</p>
      @if (roleLabel()) {
        <p class="author-card-role">{{ roleLabel() }}</p>
      }
      @if (bio()) {
        <p class="author-card-bio">{{ bio() }}</p>
      }
    </div>
  `,
})
export class AuthorCardComponent {
  /** Name (`.author-card-name`). */
  readonly name = input.required<string>();
  /**
   * Rolle/Position (`.author-card-role`), leer = keine Rollenzeile. Heißt bewusst
   * `roleLabel`, nicht `role` (Kollision mit dem ARIA-Attribut `role`), siehe
   * Klassendoku.
   */
  readonly roleLabel = input('');
  /** Bio-Text (`.author-card-bio`), leer = kein Bio-Absatz. */
  readonly bio = input('');
  /** Kicker über dem Namen (`.author-card-eyebrow`, `<h3>`), leer = keine Eyebrow. */
  readonly eyebrow = input('');
}
