import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { CdsArea } from '../area';
import { PillComponent } from '../pill/pill.component';

/** Ein Eintrag der Breadcrumb-Leiste (`.article-breadcrumb`). */
export interface CdsArticleBreadcrumbItem {
  /** Sichtbarer Text. */
  label: string;
  /** Linkziel. Am letzten Eintrag wirkungslos, siehe Klassendoku. */
  href?: string;
}

/**
 * ArticleHeader (`cds-article-header`) — Wrapper um `.article-header` aus
 * css/components.css (css/components.css:1486–1490, 1508–1519): der zentrierte Kopf
 * eines Wissensbeitrags (Breadcrumb, optionale Pill, H1, Lead, Meta-Strip).
 * Hauptvorlage ist
 * `apps/storybook/src/docs/seitenmuster/wissensbeitrag.mdx`, Abschnitt „Article
 * Header“ — dort steht das verbindliche Markup samt Begründung.
 *
 * **Breadcrumb sitzt im Header — abweichend von der allgemeinen Navigationsregel,
 * bewusst der Hauptvorlage folgend.** Unterseiten können den Breadcrumb vor dem
 * Header in einer eigenen, linksbündigen `.ep-section` setzen, damit er weder
 * mittig ausgerichtet wird noch einen abweichenden Abstand zur Navigation erhält.
 * Die Komponente bietet hingegen einen Breadcrumb-Input im Header. Konsumenten,
 * die der allgemeinen Regel folgen wollen, lassen `breadcrumb` leer und setzen die
 * Leiste selbst davor
 * (siehe Story „Ohne Breadcrumb“).
 *
 * **Letzter Breadcrumb-Eintrag immer ohne Link, mit `aria-current="page"`.**
 * Vereinfachte Beispiele mit zwei verlinkten Einträgen sind kein vollständiges
 * Barrierefreiheits-Beispiel. Die Komponente setzt deshalb Trenner dekorativ und
 * den letzten Array-Eintrag als `<span aria-current="page">` ohne Link um,
 * unabhängig von einem dort eventuell gesetzten `href`.
 *
 * **Keine bereichsgefärbte Breadcrumb-Verlinkung (`.t-{area}`).** Die
 * Inline-Beispiele färben ihren zweiten (dort letzten) Eintrag mit `.t-ki`/`.t-es`/
 * `.t-wo`; die API sieht dafür aber kein Feld vor (`{label, href?}`, kein
 * `area` pro Eintrag), und eine Zuordnung „Bereichsfarbe auf den vorletzten
 * Eintrag“ wäre geraten, nicht aus der Doku ableitbar — zumal der gefärbte Eintrag
 * dort ein Link ist, kein `aria-current`-Element, also nicht deckungsgleich mit dem
 * oben umgesetzten Muster. Bleibt bewusst außen vor.
 *
 * **Pill über `cds-pill`, kein direkt komponiertes `<span class="pill">`.** Geprüft
 * per `npx storybook tools docs show --id komponenten-chips-badges-pills-pill`:
 * `PillComponent`s Host ist `<cds-pill>`, `.pill` sitzt eine Ebene darunter auf
 * einem inneren `<span>` (anders als bei `FeaturedCardComponent`, wo genau das wegen
 * `.card-featured-body>.pill`-Kindselektoren nicht ginge). `.article-header`/`.pill`
 * haben keinen solchen Kindselektor (css/components.css:1486–1507 geprüft) — die
 * zusätzliche Ebene ist hier folgenlos, deshalb bleibt `cds-pill` als echte
 * Komponente eingesetzt, keine Klassen-Duplikation nötig.
 *
 * **Pille rendert nur, wenn `area` UND `pill` gesetzt sind — kein erfundener
 * Default.** `PillComponent.area` ist als `CdsArea` mit einem eigenen Default
 * (`'ki'`) typisiert; diese Komponente führt `area` dagegen als `CdsArea | undefined`
 * (kein eigener Default vorgegeben). Ein erster Entwurf reichte
 * `area()` per `as CdsArea`-Cast durch, damit ein `undefined`-Binding
 * `cds-pill`s eigenen Default überschreiben kann — eine Typ-Lüge, um einen Fall
 * abzudecken, der beim Nachzählen gar nicht vorkommt: Alle Pille-Vorkommen im
 * Article-Header-Kontext tragen ein `data-area`, keines ohne Bereich. Die Pille rendert
 * deshalb nur innerhalb von `@if (area(); as pillArea)` (narrowt `CdsArea |
 * undefined` sauber auf `CdsArea`, ohne Cast) — ist `pill()` gesetzt, `area()`
 * aber nicht, bleibt die Pille schlicht weg, statt eine geratene Bereichsfarbe zu
 * zeigen. Gepinnt in der Story „Pille ohne Bereich“.
 *
 * **`pillAriaLabel`, wie bei `FeaturedCardComponent`.** `PillComponent`s eigener
 * Default („Bereich `<label>`“) passt nur, wenn die Pille einen Bereichsnamen trägt.
 * Im Wissensbeitrag trägt die Pille dagegen die Lesezeit (`wissensbeitrag.mdx`,
 * Abschnitt „Pill · Lesezeit“: `aria-label="Lesezeit 8 Minuten"`) — ein Text, den
 * die Komponente nicht zuverlässig aus einem freien `pill`-String wie
 * „8 min Lesezeit“ herleiten kann (keine Zahl zu parsen, keine Garantie, dass der
 * Text überhaupt eine Lesezeit ist). `pillAriaLabel` bleibt deshalb optional, ohne
 * eigenen Default: ungesetzt geht `undefined` direkt an `cds-pill`s `ariaLabel`
 * durch, das dann auf seinen eigenen Default („Bereich `<pill>`“) zurückfällt —
 * keine Logik-Duplikation nötig, weil hier die echte `PillComponent` verwendet
 * wird, keine Klassen-Nachbildung.
 *
 * **`date`/`dateLabel` getrennt, ANDERS als `cds-stoerer`.** `cds-stoerer`
 * formatiert ein reines ISO-Datum selbst nach `de-DE`
 * (`stoerer.component.ts:formattedDate`, inkl. manuellem Aufbau der
 * `Date`-Komponenten gegen den UTC-Mitternacht-Fallstrick von `new Date(iso)`).
 * Diese Komponente tut das NICHT: `date` liefert nur den maschinenlesbaren
 * `datetime`-Wert, `dateLabel` die sichtbare Schreibweise — bewusst als zwei
 * getrennte Inputs. Begründung der Abweichung: Erstens deckt
 * sich das mit jeder realen Instanz (6 von 6 `.article-meta-date`-Vorkommen tragen
 * einen redaktionell gesetzten Text wie „13. Mai 2026“, keinen von
 * `Intl.DateTimeFormat` erzeugten) — anders als der Störer, dessen Kacheln NUR ein
 * ISO-Datum ohne separaten Text führen. Zweitens umgeht die Trennung den
 * Zeitzonen-Fallstrick vollständig, statt ihn zu beheben: ohne eigene Formatierung
 * konstruiert diese Komponente nie ein `Date`-Objekt aus `date()`, die
 * UTC-Mitternacht-Falle kann hier gar nicht erst auftreten. Ist `dateLabel` leer,
 * zeigt die Komponente `date()` unverändert als sichtbaren Text (bewusst als
 * ISO-Form, nicht geraten formatiert) — in der Story „Interaktiv“ als Warnfall extra
 * benannt, damit niemand das versehentlich auf eine Produktionsseite bringt.
 *
 * **Meta-Strip nur, wenn es etwas zu zeigen gibt.** `authorName`/`date` sind bewusst
 * Beiwerk (Default `''`); ausgezählt haben alle 6 realen
 * `.article-meta`-Vorkommen sowohl Autor als auch Datum, eine Stellenanzeige
 * nutzt `.article-header` dagegen KOMPLETT OHNE
 * `.article-meta` (dort ein `<dl>` aus Job-Fakten statt Autor/Datum) — dieser
 * abweichenden Verwendung folgt diese Komponente nicht (dafür ist in der API kein
 * Feld vorgesehen), sie belegt aber, dass ein leerer Meta-Strip ein realer Fall ist.
 * `.article-meta` (und darin `.article-meta-author`/`.article-meta-sep`) rendern
 * deshalb nur, wenn `authorName()` bzw. `date()` tatsächlich etwas liefern; der
 * Trenner nur, wenn beide Seiten vorhanden sind.
 *
 * **Avatar projiziert über `[cdsAvatar]`, PLUS `cds-avatar-stack`.** Der
 * ursprüngliche Entwurf nennt nur `<ng-content select="[cdsAvatar]">`; ergänzt um den
 * Tag-Selektor `cds-avatar-stack`, weil `AvatarStackComponent` (siehe dort) ein
 * Element-Selektor ist, kein `[cdsAvatar]`-Attribut trägt und sonst nicht in den
 * Meta-Strip projiziert werden könnte — nötig für die Story
 * „Mehrere Autor:innen“.
 *
 * **Host als Block.** `.article-header` sitzt am Host und setzt nur
 * `max-width:880px;margin:0 auto`. An einem unbekannten, also `display:inline`
 * gerenderten Element greift beides nicht, die Block-Kinder liefen über die
 * 880 px hinaus. `:host{display:block}` wie bei `cds-hero-image` und
 * `cds-footer-main`; Story „Breite begrenzt“ pinnt das.
 */
@Component({
  selector: 'cds-article-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PillComponent],
  host: { class: 'article-header', '[attr.title]': 'null' },
  styles: [':host{display:block}'],
  template: `
    @if (breadcrumb().length) {
      <nav class="article-breadcrumb" aria-label="Breadcrumb">
        @for (item of breadcrumb(); track $index; let last = $last) {
          @if (last) {
            <span aria-current="page">{{ item.label }}</span>
          } @else {
            @if (item.href) {
              <a [href]="item.href">{{ item.label }}</a>
            } @else {
              <span>{{ item.label }}</span>
            }
            <span class="article-breadcrumb-sep" aria-hidden="true">/</span>
          }
        }
      </nav>
    }
    @if (area(); as pillArea) {
      @if (pill()) {
        <cds-pill [label]="pill()" [area]="pillArea" [ariaLabel]="pillAriaLabel()" />
      }
    }
    <h1 class="article-title">{{ title() }}</h1>
    @if (lead()) {
      <p class="article-lead">{{ lead() }}</p>
    }
    @if (hasAuthor() || hasDate()) {
      <div class="article-meta">
        @if (hasAuthor()) {
          <div class="article-meta-author">
            <ng-content select="[cdsAvatar], cds-avatar-stack"></ng-content>
            <div class="article-meta-text">
              <p class="article-meta-name">{{ authorName() }}</p>
              @if (authorRole()) {
                <p class="article-meta-role">{{ authorRole() }}</p>
              }
            </div>
          </div>
        }
        @if (hasAuthor() && hasDate()) {
          <span class="article-meta-sep" aria-hidden="true"></span>
        }
        @if (hasDate()) {
          <time class="article-meta-date" [attr.datetime]="date()">{{
            dateLabel() || date()
          }}</time>
        }
      </div>
    }
  `,
})
export class ArticleHeaderComponent {
  /** Titel (`.article-title`, `<h1>`). Am Host verbleibt kein natives `title`-Attribut. */
  readonly title = input.required<string>();
  /** Anreißer unter dem Titel (`.article-lead`), leer = kein Lead. */
  readonly lead = input('');
  /** Breadcrumb-Pfad; letzter Eintrag rendert ohne Link mit `aria-current="page"`. */
  readonly breadcrumb = input<CdsArticleBreadcrumbItem[]>([]);
  /** Pille über dem Titel (`.pill`, via `cds-pill`), leer = keine Pille. */
  readonly pill = input('');
  /** `aria-label` der Pille überschreiben, siehe Klassendoku. */
  readonly pillAriaLabel = input<string>();
  /** Markenbereich → `data-area` der Pille; ungesetzt = keine Pille (siehe Klassendoku). */
  readonly area = input<CdsArea>();
  /** Name im Meta-Strip (`.article-meta-name`), leer = kein Meta-Strip-Autorblock. */
  readonly authorName = input('');
  /** Rolle im Meta-Strip (`.article-meta-role`), leer = keine Rollenzeile. */
  readonly authorRole = input('');
  /** ISO-Datum (`JJJJ-MM-TT`) → `<time datetime>`, leer = kein Datum. */
  readonly date = input('');
  /** Sichtbare Schreibweise des Datums; leer = `date` steht unverändert sichtbar. */
  readonly dateLabel = input('');

  /** @internal */
  protected readonly hasAuthor = computed(() => !!this.authorName());
  /** @internal */
  protected readonly hasDate = computed(() => !!this.date());
}
