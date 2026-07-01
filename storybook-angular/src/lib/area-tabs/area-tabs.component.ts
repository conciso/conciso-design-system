import { Component, Input } from '@angular/core';
import type { CdsArea } from '../area';

export interface CdsTab {
  area: CdsArea;
  label: string;
  /** Inhalt des Panels (einfacher Text für die Doku-Demo). */
  content: string;
}

/**
 * AreaTabs — Wrapper um `.area-tabs` / `.atab` / `.atab-content` aus
 * css/components.css → „Area Tabs". Bereichsgefärbte Tab-Leiste: der aktive Tab
 * setzt `--atab-color` (Bereichs-700) für Text + Unterstrich, der Punkt nutzt
 * Bereichs-500. Umschalten per Klick (aria-selected / sichtbares Panel).
 */
@Component({
  selector: 'cds-area-tabs',
  standalone: true,
  template: `
    <div class="area-tabs" role="tablist">
      @for (tab of tabs; track tab.label; let i = $index) {
        <button
          class="atab"
          type="button"
          role="tab"
          [class.active]="i === active"
          [attr.aria-selected]="i === active"
          [attr.data-area]="tab.area"
          [id]="tabId(i)"
          [attr.aria-controls]="panelId(i)"
          [style]="'--atab-color:' + atabAccent(tab.area)"
          (click)="active = i"
        >
          <span class="area-dot" [style.background]="'var(--' + tab.area + '-500)'"></span>
          {{ tab.label }}
        </button>
      }
    </div>

    @for (tab of tabs; track tab.label; let i = $index) {
      <div
        class="atab-content"
        role="tabpanel"
        [class.visible]="i === active"
        [id]="panelId(i)"
        [attr.aria-labelledby]="tabId(i)"
      >
        <p style="font:var(--ty-body-md);color:var(--tx-secondary);margin:0">{{ tab.content }}</p>
      </div>
    }
  `,
})
export class AreaTabsComponent {
  @Input() tabs: CdsTab[] = [
    { area: 'co', label: 'Corporate', content: 'Marke, Haltung und konsistente Kommunikation.' },
    { area: 'ki', label: 'Angewandte KI', content: 'KI-Lösungen mit echtem Geschäftsnutzen.' },
    { area: 'es', label: 'Effektive Software', content: 'Schlanke Architektur, schnellere Lieferung.' },
    { area: 'wo', label: 'Wirksame Organisationen', content: 'Teams, die lernen und sich anpassen.' },
  ];
  /** Index des aktiven Tabs. */
  @Input() active = 0;

  /** Aktiv-Akzent je Bereich: ki braucht -800 (700 reißt AA), sonst -700 (wie .t-*). */
  protected atabAccent(area: CdsTab['area']): string {
    return area === 'ki' ? 'var(--ki-800)' : `var(--${area}-700)`;
  }

  protected tabId(i: number): string {
    return `cds-atab-${i}`;
  }
  protected panelId(i: number): string {
    return `cds-atab-panel-${i}`;
  }
}
