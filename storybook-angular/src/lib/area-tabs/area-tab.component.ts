import { Component, Input, TemplateRef, ViewChild, input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Einzelner Tab für `<cds-area-tabs>`. Trägt Label + Bereich; sein Inhalt ist
 * BELIEBIGES projiziertes Markup (Text, Listen, Komponenten, CTAs …), das die
 * Elternkomponente ins zugehörige Panel rendert.
 *
 * Der Inhalt wird in ein internes `<ng-template>` projiziert (via `<ng-content>`)
 * und über einen TemplateRef bereitgestellt — so kann `cds-area-tabs` ihn getrennt
 * vom Tab-Button an der Panel-Position ausgeben (ngTemplateOutlet), passend zur
 * `.area-tabs` / `.atab-content`-Struktur aus css/components.css.
 */
@Component({
  selector: 'cds-area-tab',
  standalone: true,
  template: `<ng-template><ng-content></ng-content></ng-template>`,
})
export class AreaTabComponent {
  /** Markenbereich → Tab-Punkt (Bereichs-500) + aktiver Text/Unterstrich. */
  readonly area = input.required<CdsArea>();
  /** Beschriftung im Tab-Button. */
  readonly label = input('');

  /** Projizierter Panel-Inhalt; von der Elternkomponente via Outlet gerendert. */
  @ViewChild(TemplateRef, { static: true }) readonly content!: TemplateRef<unknown>;
}
