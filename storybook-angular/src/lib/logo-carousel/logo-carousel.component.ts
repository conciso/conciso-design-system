import { Component, OnDestroy, OnInit, input, model, signal } from '@angular/core';
import { CdsLogo, LogoComponent } from '../logo/logo.component';

export type { CdsLogo } from '../logo/logo.component';

/** Eindeutige IDs je Instanz (Dot aria-controls ↔ Slide-id). */
let cdsLogoCarouselUid = 0;

/**
 * LogoCarousel — Wrapper um `.logo-carousel` aus css/components.css → „Logo-Carousel".
 *
 * Diskrete Sets von je fünf Logos, die automatisch per Crossfade wechseln
 * (`[aria-hidden]` je Slide). Pausierbar über den Pause-Button (.logo-carousel-pause,
 * sichtbar bei Hover/Fokus bzw. dauerhaft im Pause-Zustand .paused), Dots wählen ein
 * Set direkt. Autoplay respektiert prefers-reduced-motion.
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
    <div class="logo-carousel" [class.paused]="paused()">
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
            @for (logo of set; track logo.label) {
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
export class LogoCarouselComponent implements OnInit, OnDestroy {
  readonly sets = input<CdsLogo[][]>([
    [{ label: 'NORDWIND' }, { label: 'MERIDIAN' }, { label: 'AVERA' }, { label: 'KONTUR' }, { label: 'STELLA' }],
    [{ label: 'VOLTAIC' }, { label: 'HEXAGON' }, { label: 'LUMEN' }, { label: 'PRAXIS' }, { label: 'ORBIT' }],
    [{ label: 'CASCADE' }, { label: 'VERTEX' }, { label: 'NIMBUS' }, { label: 'FORGE' }, { label: 'ATLAS' }],
  ]);
  /** Autoplay-Intervall in **Millisekunden** (Standard 6000 = 6 s). */
  readonly interval = input(6000);
  /** Aktives Set. Two-Way (`[(active)]`) via model(). */
  readonly active = model(0);

  protected readonly paused = signal(false);
  private timer: ReturnType<typeof setInterval> | null = null;
  private readonly uid = ++cdsLogoCarouselUid;

  /** Stabile Slide-id für die aria-controls-Verknüpfung der Dots. */
  slideId(i: number): string {
    return `cds-logo-set-${this.uid}-${i + 1}`;
  }

  ngOnInit(): void {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) this.start();
  }

  ngOnDestroy(): void {
    this.stop();
  }

  togglePause(): void {
    this.paused.set(!this.paused());
    if (this.paused()) this.stop();
    else this.start();
  }

  goTo(i: number): void {
    this.active.set(i);
  }

  private start(): void {
    this.stop();
    if (typeof window === 'undefined') return;
    this.timer = setInterval(() => {
      this.active.set((this.active() + 1) % this.sets().length);
    }, this.interval());
  }

  private stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
