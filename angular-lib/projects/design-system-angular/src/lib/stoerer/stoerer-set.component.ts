import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChildren, input } from '@angular/core';
import { StoererComponent } from './stoerer.component';

/**
 * StoererSet (cds-stoerer-set) — Wrapper um `.stoerer-set` / `.stoerer-list` aus
 * css/components.css (css/components.css:926–974): das Set aus ein bis drei
 * `<cds-stoerer>`-Kacheln, das auf der Startseite oben rechts über dem Hero-Bild
 * liegt. Der Positionsrahmen `.stoerer-hero` (umschließt Hero-Bild UND Set,
 * `container-type:inline-size` für die Container-Query-Schwelle) ist bewusst NICHT
 * Teil dieser Komponente, sondern bleibt beim Konsumenten (siehe
 * `.scratch/angular-seitenbausteine/issues/03-stoerer.md`): er umschließt Hero UND
 * Set gemeinsam, das könnte diese Komponente als internes Detail nicht leisten, ohne
 * das Hero-Bild selbst zu kennen.
 *
 * **Entscheidung — `<li>` ohne strukturelles Wrapper-Element.** `.stoerer-list` ist
 * ein `<ul>`; nach HTML-AAM bekommt ein `<li>` die implizite Rolle `listitem` nur als
 * direktes Kind eines `<ul>`/`<ol>`/`<menu>` — Screenreader kündigen die Liste sonst
 * nicht mit Anzahl an. Ein einfaches `<ng-content>` hätte `<cds-stoerer>` selbst
 * zwischen `<ul>` und `<li>` geschoben (kein direktes Kind mehr), und ein
 * `display:contents`-Wrapper verbietet sich als neues CSS (ADR-0001). Gelöst über
 * dasselbe Muster, das `cds-area-tabs`/`cds-area-tab` bereits für „projizierte
 * Kind-Komponente, deren Markup an einer selbst bestimmten Stelle im eigenen Template
 * landet“ etabliert (`area-tabs/area-tabs.component.ts`): `cds-stoerer` rendert nicht
 * in sich selbst, sondern in ein `<ng-template>` und liefert es als `TemplateRef`
 * (`stoerer.component.ts`). Diese Komponente liest die projizierten `<cds-stoerer>`
 * über `contentChildren()` und setzt ihr Template per `ngTemplateOutlet` direkt in
 * ein selbst gerendertes `<li>` ein. Im laufenden Storybook geprüft (`Komponenten/Hero/
 * Störer` → Story „Interaktiv“, DOM live im Browser per `querySelector` abgefragt,
 * zusätzlich in der Play-Funktion der Story gepinnt): `<ul class="stoerer-list">`
 * hat ausschließlich `<li>` als direkte Kinder (`ul.stoerer-list > *` → `["LI","LI"]`),
 * `<cds-stoerer>` selbst taucht im gerenderten DOM nirgends auf — Angular hängt
 * unprojizierten Content ohne passendes `<ng-content>`-Ziel gar nicht erst ein, exakt
 * wie bei `<cds-area-tab>` innerhalb von `<cds-area-tabs>`. Ein `items`-Array (die im
 * Ticket vermerkte Alternative) hätte denselben DOM-Baum ergeben, aber den
 * Konsumenten gezwungen, das projizierte Icon jeder Kachel in ein Datenobjekt
 * umzuziehen; mit dieser Lösung bleibt die deklarative, Content-projizierende API
 * erhalten.
 *
 * Verwendungsguidance dieser Gruppe: siehe Hero-Bild (`komponenten-hero-hero-bild--verwendung`).
 */
@Component({
  selector: 'cds-stoerer-set',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  template: `
    <aside class="stoerer-set" [attr.aria-label]="label()">
      <ul class="stoerer-list">
        @for (tile of tiles(); track tile) {
          <li><ng-container [ngTemplateOutlet]="tile.content()"></ng-container></li>
        }
      </ul>
    </aside>
  `,
})
export class StoererSetComponent {
  /** Zugänglicher Name des Sets (`<aside aria-label>`); „Aktuelles“ wie im Mockup. */
  readonly label = input('Aktuelles');

  /**
   * Die Kacheln kommen als projizierte `<cds-stoerer>`-Kinder.
   *
   * @internal
   */
  protected readonly tiles = contentChildren(StoererComponent);
}
