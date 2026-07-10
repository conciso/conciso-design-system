import { NgTemplateOutlet } from '@angular/common';
import { Component, contentChildren, model } from '@angular/core';
import type { CdsArea } from '../area';
import { AreaTabComponent } from './area-tab.component';

/**
 * AreaTabs — Wrapper um `.area-tabs` / `.atab` / `.atab-content` aus
 * css/components.css → „Area Tabs". Bereichsgefärbte Tab-Leiste: der aktive Tab
 * setzt `--atab-color` (Bereichs-700) für Text + Unterstrich, der Punkt nutzt
 * Bereichs-500. Umschalten per Klick (aria-selected / sichtbares Panel).
 *
 * Tabs werden deklarativ als `<cds-area-tab>`-Kinder projiziert; jeder Tab trägt
 * `area` + `label` und BELIEBIGEN Inhalt (Markup/Komponenten), der ins Panel
 * gerendert wird. Der aktive Index ist über `[(active)]` steuerbar.
 */
@Component({
  selector: 'cds-area-tabs',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <div class="area-tabs" role="tablist">
      @for (tab of tabs(); track tab; let i = $index) {
        <button
          class="atab"
          type="button"
          role="tab"
          [class.active]="i === active()"
          [attr.aria-selected]="i === active()"
          [attr.data-area]="tab.area()"
          [id]="tabId(i)"
          [attr.aria-controls]="panelId(i)"
          [style]="'--atab-color:' + atabAccent(tab.area())"
          (click)="active.set(i)"
        >
          <span class="area-dot" [style.background]="'var(--' + tab.area() + '-500)'"></span>
          {{ tab.label() }}
        </button>
      }
    </div>

    @for (tab of tabs(); track tab; let i = $index) {
      <div
        class="atab-content"
        role="tabpanel"
        [class.visible]="i === active()"
        [id]="panelId(i)"
        [attr.aria-labelledby]="tabId(i)"
      >
        <ng-container [ngTemplateOutlet]="tab.content"></ng-container>
      </div>
    }
  `,
})
export class AreaTabsComponent {
  /** Die Tabs kommen als projizierte `<cds-area-tab>`-Kinder. */
  readonly tabs = contentChildren(AreaTabComponent);
  /** Index des aktiven Tabs. Two-Way (`[(active)]`). */
  readonly active = model(0);

  /** Aktiv-Akzent je Bereich: ki braucht -800 (700 reißt AA), sonst -700 (wie .t-*). */
  protected atabAccent(area: CdsArea): string {
    return area === 'ki' ? 'var(--ki-800)' : `var(--${area}-700)`;
  }

  protected tabId(i: number): string {
    return `cds-atab-${i}`;
  }
  protected panelId(i: number): string {
    return `cds-atab-panel-${i}`;
  }
}
