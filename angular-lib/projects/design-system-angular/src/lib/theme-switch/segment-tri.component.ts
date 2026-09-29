import {
  afterNextRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  viewChild,
  viewChildren,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroComputerDesktop, heroMoon, heroSun } from '../icons/cds-icons';
import { CDS_THEME_ICON, CDS_THEME_LABEL, cdsThemeModes, ThemeModeService } from './theme-mode';

/**
 * Theme-Segment — Segment-Switch für das Farbthema. Vorgesehener Einsatz: als
 * eigenständiges Element zum Hovern. Ist daher IMMER responsiv (unter 640px
 * Icon-only) und IMMER animiert (Aktiv-Markierung gleitet als Thumb) — beides
 * fest, nicht konfigurierbar. Icon + Textlabel stehen immer nebeneinander.
 *
 * Einzige Konfiguration: `showSystem` (tri Hell/Dunkel/System vs. binär Hell/Dunkel).
 *
 * Baut auf den CSS-Kern-Klassen `.theme-bar`/`.tbtn` auf. Jeder Button trägt ein
 * `aria-label`, ist also auch im Icon-only-Modus benannt. Der Thumb wird per
 * getBoundingClientRect an die aktive Zelle gesetzt (ResizeObserver misst bei
 * Breakpoint-/Font-Änderungen nach).
 *
 * Verwendungsguidance dieser Gruppe: siehe Cycle-Button (`komponenten-theme-umschalter-cycle-button--verwendung`).
 */
@Component({
  selector: 'cds-theme-segment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroSun, heroMoon, heroComputerDesktop })],
  template: `
    <div #bar class="theme-bar is-responsive is-animated" role="group" aria-label="Farbthema">
      <span #thumb class="cds-thumb" aria-hidden="true"></span>
      @for (m of order(); track m) {
        <button
          #opt
          class="tbtn"
          type="button"
          [class.active]="svc.mode() === m"
          [attr.aria-pressed]="svc.mode() === m"
          [attr.aria-label]="label[m]"
          (click)="svc.set(m)"
        >
          <ng-icon [name]="icon[m]" size="14px" aria-hidden="true" />
          <span class="tbtn__label">{{ label[m] }}</span>
        </button>
      }
    </div>
  `,
  styles: `
    .theme-bar {
      position: static;
      display: inline-flex;
    }
    .tbtn {
      display: inline-flex;
      align-items: center;
      gap: var(--s1);
    }
    /* Responsive: unter 640px Label ausblenden → Icon-only. Das aria-label bleibt. */
    @media (max-width: 640px) {
      .theme-bar.is-responsive .tbtn__label {
        display: none;
      }
    }
    /* Animiert: ein Thumb gleitet hinter den Buttons. */
    .theme-bar.is-animated {
      position: relative;
      inset: auto;
    }
    .theme-bar.is-animated .cds-thumb {
      position: absolute;
      top: 0;
      left: 0;
      border-radius: var(--r-full);
      /* wie .tbtn.active im Kern (--co-700): weißer Text darauf erfüllt WCAG AA;
         --co-500 wäre zu hell (nur ~2,3:1). */
      background: var(--co-700);
      transition:
        transform var(--m-fast),
        width var(--m-fast),
        height var(--m-fast);
      pointer-events: none;
      z-index: 0;
    }
    .theme-bar.is-animated .tbtn {
      position: relative;
      z-index: 1;
    }
    .theme-bar.is-animated .tbtn.active {
      background: transparent;
    }
  `,
})
export class ThemeSegmentComponent {
  /** true → Hell/Dunkel/System (tri), false → nur Hell/Dunkel (binär). */
  readonly showSystem = input(true);

  /** @internal */
  protected readonly svc = inject(ThemeModeService);
  /** @internal */
  protected readonly icon = CDS_THEME_ICON;
  /** @internal */
  protected readonly label = CDS_THEME_LABEL;

  /** @internal */
  protected readonly order = computed(() => cdsThemeModes(this.showSystem()));

  private readonly bar = viewChild<ElementRef<HTMLElement>>('bar');
  private readonly thumb = viewChild<ElementRef<HTMLElement>>('thumb');
  private readonly opts = viewChildren<ElementRef<HTMLButtonElement>>('opt');
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Thumb nach jedem Render neu setzen (Modus/Optionen als Abhängigkeiten lesen).
    // In Phasen aufgeteilt (WP5 §5.4): erst LESEN (earlyRead), dann SCHREIBEN (write) —
    // das vermeidet Layout-Thrashing (Read/Write im selben Durchlauf), das
    // afterRenderEffect mit seinen Phasen genau dafür anbietet.
    afterRenderEffect({
      earlyRead: () => {
        this.svc.mode();
        this.order();
        return this.measureThumb();
      },
      write: (rect) => this.applyThumb(rect()),
    });

    // Layout-Änderungen ohne Signal (Breakpoint, Font-Load) → Thumb nachmessen. Der
    // ResizeObserver-Callback läuft außerhalb von Angulars Render-Zyklus — dafür gibt
    // es keine Phasen-API; Messen+Schreiben bleibt hier in einem Zug (unvermeidlich,
    // da kein afterRenderEffect-Durchlauf beteiligt ist).
    afterNextRender(() => {
      const bar = this.bar()?.nativeElement;
      if (!bar) return;
      const ro = new ResizeObserver(() => this.applyThumb(this.measureThumb()));
      ro.observe(bar);
      this.destroyRef.onDestroy(() => ro.disconnect());
    });
  }

  /** Thumb-Geometrie relativ zur Leiste messen (reines Lesen, keine Schreibzugriffe). */
  private measureThumb(): { width: number; height: number; x: number; y: number } | null {
    const thumb = this.thumb()?.nativeElement;
    const bar = this.bar()?.nativeElement;
    const el = this.opts()[this.order().indexOf(this.svc.mode())]?.nativeElement;
    if (!thumb || !bar || !el) return null;

    const barRect = bar.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(bar);
    const bx = parseFloat(cs.borderLeftWidth) || 0;
    const by = parseFloat(cs.borderTopWidth) || 0;

    return {
      width: r.width,
      height: r.height,
      x: r.left - barRect.left - bx,
      y: r.top - barRect.top - by,
    };
  }

  /** Gemessene Geometrie auf den Thumb schreiben (reines Schreiben, kein Lesen). */
  private applyThumb(rect: { width: number; height: number; x: number; y: number } | null): void {
    const thumb = this.thumb()?.nativeElement;
    if (!thumb || !rect) return;
    thumb.style.width = `${rect.width}px`;
    thumb.style.height = `${rect.height}px`;
    thumb.style.transform = `translate(${rect.x}px, ${rect.y}px)`;
  }
}
