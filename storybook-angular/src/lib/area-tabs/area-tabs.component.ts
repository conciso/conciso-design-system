import { NgTemplateOutlet } from '@angular/common';
import { Component, ElementRef, contentChildren, inject, input, model } from '@angular/core';
import type { CdsArea } from '../area';
import { AreaTabComponent } from './area-tab.component';

// Modulweiter Zähler → eindeutige IDs je Instanz. Ein konstanter Präfix würde bei
// mehreren AreaTabs kollidieren (doppelte tab-/panel-id → kaputte aria-controls/
// -labelledby-Verknüpfung und falsches Fokus-Ziel bei der Tastatur-Navigation).
let uid = 0;

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
    <div class="area-tabs" role="tablist" [attr.aria-label]="ariaLabel()">
      @for (tab of tabs(); track tab; let i = $index) {
        <button
          class="atab"
          type="button"
          role="tab"
          [class.active]="i === active()"
          [attr.aria-selected]="i === active()"
          [attr.tabindex]="i === active() ? 0 : -1"
          [attr.data-area]="tab.area()"
          [id]="tabId(i)"
          [attr.aria-controls]="panelId(i)"
          [style]="'--atab-color:' + atabAccent(tab.area())"
          (click)="active.set(i)"
          (keydown)="onKeydown($event)"
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
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly instance = ++uid;

  /** Die Tabs kommen als projizierte `<cds-area-tab>`-Kinder. */
  readonly tabs = contentChildren(AreaTabComponent);
  /** Index des aktiven Tabs. Two-Way (`[(active)]`). */
  readonly active = model(0);
  /** Zugänglicher Name der Tab-Leiste (WAI-ARIA verlangt aria-label/-labelledby). */
  readonly ariaLabel = input('Bereiche');

  /** Aktiv-Akzent je Bereich: ki braucht -800 (700 reißt AA), sonst -700 (wie .t-*). */
  protected atabAccent(area: CdsArea): string {
    return area === 'ki' ? 'var(--ki-800)' : `var(--${area}-700)`;
  }

  protected tabId(i: number): string {
    return `cds-atab-${this.instance}-${i}`;
  }
  protected panelId(i: number): string {
    return `cds-atab-${this.instance}-panel-${i}`;
  }

  /**
   * WAI-ARIA-Tabs-Tastatur (horizontal, automatische Aktivierung): ←/→ bewegen mit
   * Umlauf, Home/End springen an die Enden. Der Fokus wird mitgeführt (Roving
   * Tabindex: nur der aktive Tab ist per Tab erreichbar). Panels laden sofort, daher
   * ist Auswahl = Fokus (APG-empfohlen).
   */
  protected onKeydown(event: KeyboardEvent): void {
    const n = this.tabs().length;
    if (!n) return;
    const cur = this.active();
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = (cur + 1) % n;
        break;
      case 'ArrowLeft':
        next = (cur - 1 + n) % n;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = n - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.active.set(next);
    this.host.nativeElement.querySelector<HTMLElement>(`#${CSS.escape(this.tabId(next))}`)?.focus();
  }
}
