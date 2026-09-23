import { ChangeDetectionStrategy, Component, TemplateRef, computed, input, viewChild } from '@angular/core';

/**
 * Stoerer (cds-stoerer) — eine Kachel für `<cds-stoerer-set>`, Wrapper um `.stoerer`
 * aus css/components.css (css/components.css:926–974): Typ-Glyph + Thema-Label
 * (`.stoerer-topic`), Titel über zwei Zeilen (`.stoerer-title`), Meta-Zeile
 * (`.stoerer-meta`). Die ganze Kachel ist ein `<a>` — Klick auf die Fläche navigiert,
 * kein Div mit Klick-Handler.
 *
 * **Nur innerhalb von `<cds-stoerer-set>` verwendbar.** Diese Komponente rendert ihr
 * Markup nicht in sich selbst, sondern in ein internes `<ng-template>` und stellt es
 * dem Set als `TemplateRef` bereit (Begründung: Entscheidung 1 in der Klassendoku von
 * `StoererSetComponent`, `stoerer-set.component.ts`) — dasselbe Muster wie
 * `AreaTabComponent` für `cds-area-tabs` (`area-tabs/area-tab.component.ts`). Ohne
 * umgebendes `<cds-stoerer-set>` bleibt eine Kachel deshalb unsichtbar: Angular hängt
 * projizierten Inhalt ohne passendes `<ng-content>`-Ziel nicht ins DOM.
 *
 * **Entscheidung — Icon als projizierter Inhalt.** Wie in Ticket 05 (`cds-icon-card`,
 * `.scratch/angular-seitenbausteine/issues/05-icon-karte.md`, Abschnitt „Entscheidung:
 * Icon als projizierter Inhalt“) sind die Störer-Icons im Mockup wechselnde
 * Heroicons, keine DS-Bereichsglyphen aus der Registry — Inhalt, nicht Chrom. Deshalb
 * Projektion über `<ng-content select="[cdsIcon]">` statt eines `icon`-Inputs.
 * Abweichend von Ticket 05 trägt das projizierte `<svg>` die Klasse `stoerer-icon`
 * selbst (zusätzlich zu `cdsIcon`, `viewBox`, `aria-hidden="true"`,
 * `focusable="false"`): `.ep-card-icon` ist dort ein Container, der die Größe per
 * Nachfahren-Selektor (`.ep-card-icon svg`) an ein unverändertes Kind durchreicht.
 * `.stoerer-icon` (css/components.css:974) sitzt dagegen direkt auf dem SVG als
 * Flex-Kind von `.stoerer-topic` — es gibt keinen Container, der die Klasse
 * stellvertretend tragen könnte, ohne ein neues CSS-Selektorpaar zu erfinden
 * (verboten, ADR-0001). Der vollständige Kontrakt steht zusätzlich in der Story.
 */
@Component({
  selector: 'cds-stoerer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template>
      <a class="stoerer" [href]="href()">
        <span class="stoerer-topic">
          <ng-content select="[cdsIcon]"></ng-content>
          {{ topic() }}
        </span>
        <span class="stoerer-title"><span>{{ title() }}</span></span>
        @if (hasMeta()) {
          <span class="stoerer-meta">
            @if (date()) {
              <time [attr.datetime]="date()">{{ formattedDate() }}</time>
            }
            @if (date() && meta()) {
              <span aria-hidden="true"> · </span><span class="sr-only">, </span>
            }
            {{ meta() }}
          </span>
        }
      </a>
    </ng-template>
  `,
})
export class StoererComponent {
  /** Thema/Inhaltstyp neben dem Icon (`.stoerer-topic`, z. B. „Nächste Veranstaltung“). */
  readonly topic = input.required<string>();
  /** Titel des verlinkten Inhalts — redaktionell auf zwei Zeilen gekürzt. */
  readonly title = input.required<string>();
  /** Linkziel; die Kachel ist vollständig klickbar. */
  readonly href = input.required<string>();
  /** Meta-Text nach dem Datum (Ort/Lesezeit/Format), leer = kein Meta-Text. */
  readonly meta = input('');
  /** ISO-Datum (`JJJJ-MM-TT`) → `<time datetime>`, gerendert vor `meta`, leer = kein Datum. */
  readonly date = input('');

  /**
   * Kachel-Markup als Template, das `cds-stoerer-set` per `ngTemplateOutlet` in sein
   * eigenes `<li>` einsetzt (siehe Klassendoku).
   *
   * @internal
   */
  readonly content = viewChild.required<TemplateRef<unknown>>(TemplateRef);

  /** @internal */
  protected readonly hasMeta = computed(() => !!(this.date() || this.meta()));

  /**
   * `date` als deutsches Langdatum („3. Dezember 2026“), manuell aus den
   * ISO-Komponenten gebaut statt über `new Date(iso)`: Ein reines Datums-ISO-String
   * wird von der Date-API als UTC-Mitternacht gelesen, `Intl.DateTimeFormat`
   * formatiert aber in der lokalen Zeitzone — in Zonen westlich von UTC kippt das
   * angezeigte Datum sonst einen Tag zurück.
   *
   * @internal
   */
  protected readonly formattedDate = computed(() => {
    const iso = this.date();
    if (!iso) return '';
    const [year, month, day] = iso.split('-').map(Number);
    if (!year || !month || !day) return iso;
    return new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric' }).format(
      new Date(year, month - 1, day),
    );
  });
}
