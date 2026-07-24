import { Component, ElementRef, effect, inject, input, model, signal } from '@angular/core';
import { CdsLogo, LogoComponent } from '../logo/logo.component';

export type { CdsLogo } from '../logo/logo.component';

/** Eindeutige IDs je Instanz (Dot aria-controls ↔ Slide-id). */
let cdsLogoCarouselUid = 0;

/**
 * LogoCarousel — Wrapper um `.logo-carousel` aus css/components.css → „Logo-Carousel".
 *
 * Diskrete Sets von je fünf Logos, die automatisch per Crossfade wechseln
 * (`[aria-hidden]` je Slide). Das Autoplay pausiert bei Maus-Hover und Tastatur-Fokus
 * (damit Nutzer in Ruhe lesen/bedienen können), zusätzlich dauerhaft über den
 * Pause-Button (.logo-carousel-pause, sichtbar bei Hover/Fokus bzw. im .paused-Zustand);
 * Dots wählen ein Set direkt. Autoplay respektiert prefers-reduced-motion.
 *
 * Der Timer wird zentral über ein `effect` gesteuert: er läuft nur, wenn NICHT
 * pausiert, NICHT gehovert, NICHT fokussiert und reduzierte Bewegung nicht gewünscht
 * ist. Eine Änderung des `interval` startet ihn automatisch neu.
 *
 * Jede Kachel ist ein `cds-logo`: bevorzugt ein Bild (`src`), sonst der Text als
 * Platzhalter/Fallback. Standardmäßig sind reine Text-Platzhalter gesetzt – reale
 * Anwendungen übergeben ihre Kundenlogos als Bilder.
 */
@Component({
  selector: 'cds-logo-carousel',
  standalone: true,
  imports: [LogoComponent],
  template: `
    <div
      class="logo-carousel"
      [class.paused]="paused()"
      (mouseenter)="hovered.set(true)"
      (mouseleave)="hovered.set(false)"
      (focusin)="focused.set(true)"
      (focusout)="onFocusOut($event)"
    >
      <button
        class="logo-carousel-pause"
        type="button"
        [attr.aria-label]="paused() ? 'Abspielen' : 'Pausieren'"
        (click)="togglePause()"
      >
        <svg class="icon-pause" width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <rect x="3" y="2" width="3" height="10" rx="1" /><rect x="8" y="2" width="3" height="10" rx="1" />
        </svg>
        <svg class="icon-play" width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
          <path d="M4 2.5v9l7-4.5z" />
        </svg>
      </button>

      <div class="logo-carousel-track">
        @for (set of sets(); track $index; let i = $index) {
          <div
            class="logo-carousel-slide"
            [id]="slideId(i)"
            role="group"
            aria-roledescription="Logo-Set"
            [attr.aria-label]="'Set ' + (i + 1) + ' von ' + sets().length"
            [attr.aria-hidden]="i !== active()"
          >
            @for (logo of set; track $index) {
              <cds-logo [label]="logo.label" [src]="logo.src" [alt]="logo.alt || ''" />
            }
          </div>
        }
      </div>

      <div class="logo-carousel-dots" role="tablist" aria-label="Logo-Set auswählen">
        @for (set of sets(); track $index; let i = $index) {
          <button
            class="logo-carousel-dot"
            type="button"
            role="tab"
            [attr.aria-selected]="i === active()"
            [attr.aria-controls]="slideId(i)"
            [attr.aria-label]="'Set ' + (i + 1) + ' von ' + sets().length"
            (click)="goTo(i)"
          ></button>
        }
      </div>
    </div>
  `,
})
export class LogoCarouselComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly sets = input<CdsLogo[][]>([
    [{ label: 'NORDWIND' }, { label: 'MERIDIAN' }, { label: 'AVERA' }, { label: 'KONTUR' }, { label: 'STELLA' }],
    [{ label: 'VOLTAIC' }, { label: 'HEXAGON' }, { label: 'LUMEN' }, { label: 'PRAXIS' }, { label: 'ORBIT' }],
    [{ label: 'CASCADE' }, { label: 'VERTEX' }, { label: 'NIMBUS' }, { label: 'FORGE' }, { label: 'ATLAS' }],
  ]);
  /** Autoplay-Intervall in **Millisekunden** (Standard 6000 = 6 s). */
  readonly interval = input(6000);
  /** Aktives Set. Two-Way (`[(active)]`) via model(). */
  readonly active = model(0);

  /** Vom Nutzer explizit pausiert (Pause-Button). */
  protected readonly paused = signal(false);
  /** Transiente Pause: Maus über dem Carousel. */
  protected readonly hovered = signal(false);
  /** Transiente Pause: Tastatur-Fokus innerhalb des Carousels. */
  protected readonly focused = signal(false);
  /** Reduzierte Bewegung gewünscht → kein Autoplay. Einmal beim Erzeugen ermittelt. */
  private readonly reducedMotion = signal(
    typeof window !== 'undefined' &&
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
  );
  private readonly uid = ++cdsLogoCarouselUid;

  constructor() {
    // Zentrale Timer-Steuerung: Der Effect legt bei jeder relevanten Änderung
    // (paused/hovered/focused/interval/reduced-motion) den Intervall-Timer neu an und
    // räumt den alten via onCleanup auf. Der aktive Index wird nur IM Callback gelesen
    // und ist daher keine Effect-Abhängigkeit (kein Neustart bei jedem Wechsel).
    effect((onCleanup) => {
      const play =
        !this.reducedMotion() && !this.paused() && !this.hovered() && !this.focused();
      const ms = this.interval();
      if (!play || typeof window === 'undefined') return;
      const timer = setInterval(() => {
        this.active.set((this.active() + 1) % this.sets().length);
      }, ms);
      onCleanup(() => clearInterval(timer));
    });
  }

  /** Stabile Slide-id für die aria-controls-Verknüpfung der Dots. */
  slideId(i: number): string {
    return `cds-logo-set-${this.uid}-${i + 1}`;
  }

  togglePause(): void {
    this.paused.set(!this.paused());
  }

  goTo(i: number): void {
    this.active.set(i);
  }

  /** Fokus-Pause nur aufheben, wenn der Fokus das Carousel ganz verlässt (nicht bei
   *  Wechsel zwischen Kind-Elementen). */
  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.host.nativeElement.contains(next)) this.focused.set(false);
  }
}
