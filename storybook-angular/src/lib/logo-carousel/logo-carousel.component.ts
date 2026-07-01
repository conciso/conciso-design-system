import { Component, Input, OnDestroy, OnInit } from '@angular/core';

/**
 * LogoCarousel — Wrapper um `.logo-carousel` aus css/components.css → „Logo-Carousel".
 *
 * Diskrete Sets von je 5 Logo-Kacheln, die automatisch per Crossfade wechseln
 * (`[aria-hidden]` je Slide). Pausierbar über den Pause-Button (.logo-carousel-pause,
 * sichtbar bei Hover/Fokus bzw. dauerhaft im Pause-Zustand .paused), Dots wählen ein
 * Set direkt. Autoplay respektiert prefers-reduced-motion. Logos sind Platzhalter
 * (.logo-placeholder), da hier keine Kundenlogos eingebunden sind.
 */
@Component({
  selector: 'cds-logo-carousel',
  standalone: true,
  template: `
    <div class="logo-carousel" [class.paused]="paused">
      <button
        class="logo-carousel-pause"
        type="button"
        [attr.aria-label]="paused ? 'Abspielen' : 'Pausieren'"
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
        @for (set of sets; track $index; let i = $index) {
          <div class="logo-carousel-slide" [attr.aria-hidden]="i !== active">
            @for (logo of set; track logo) {
              <div class="logo-tile"><span class="logo-placeholder">{{ logo }}</span></div>
            }
          </div>
        }
      </div>

      <div class="logo-carousel-dots" role="tablist" aria-label="Logo-Sets">
        @for (set of sets; track $index; let i = $index) {
          <button
            class="logo-carousel-dot"
            type="button"
            role="tab"
            [attr.aria-selected]="i === active"
            [attr.aria-label]="'Logo-Set ' + (i + 1)"
            (click)="goTo(i)"
          ></button>
        }
      </div>
    </div>
  `,
})
export class LogoCarouselComponent implements OnInit, OnDestroy {
  @Input() sets: string[][] = [
    ['NORDWIND', 'MERIDIAN', 'AVERA', 'KONTUR', 'STELLA'],
    ['VOLTAIC', 'HEXAGON', 'LUMEN', 'PRAXIS', 'ORBIT'],
    ['CASCADE', 'VERTEX', 'NIMBUS', 'FORGE', 'ATLAS'],
  ];
  /** Autoplay-Intervall in ms. */
  @Input() interval = 3000;
  @Input() active = 0;

  protected paused = false;
  private timer: ReturnType<typeof setInterval> | null = null;

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
    this.paused = !this.paused;
    if (this.paused) this.stop();
    else this.start();
  }

  goTo(i: number): void {
    this.active = i;
  }

  private start(): void {
    this.stop();
    if (typeof window === 'undefined') return;
    this.timer = setInterval(() => {
      this.active = (this.active + 1) % this.sets.length;
    }, this.interval);
  }

  private stop(): void {
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}
