import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
} from '@angular/core';
import { nextDotsIndex } from '../shared/dots-keyboard';

export interface CdsSlide {
  image?: string;
  title: string;
  text: string;
}

// Modulweiter Zähler → eindeutige Slide-IDs je Instanz für die aria-controls-
// Verknüpfung der Dots (doppelte IDs bei mehreren Carousels brächen die Zuordnung).
let uid = 0;

/**
 * Carousel — Wrapper um `.img-slider` aus css/components.css → „Bild-Slider“.
 *
 * Crossfade-Carousel: alle Slides liegen gestapelt im Grid, die aktive trägt
 * `.active` (opacity). Inaktive Slides bekommen zusätzlich `[aria-hidden]`, sonst
 * läse ein Screenreader Titel und Text jeder Folie vor, obwohl visuell nur eine
 * sichtbar ist (identisches Muster wie beim LogoCarousel). Prev/Next-Buttons
 * (.img-slider-btn) und Dots (.img-dot) steuern den Index. Optionale Hero-Variante
 * (.img-slider-hero). Ohne Bild-URL wird ein neutraler Platzhalter gezeigt. Der
 * aktive Index ist über `[(active)]` (model) beobacht-/steuerbar.
 */
@Component({
  selector: 'cds-carousel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      [class]="wrapClasses()"
      role="region"
      aria-roledescription="Bildschirmpräsentation"
      aria-label="Bildstrecke"
    >
      <div class="img-slider-track">
        @for (slide of slides(); track $index; let i = $index) {
          <div
            class="img-slide"
            role="group"
            aria-roledescription="Folie"
            [id]="slideId(i)"
            [attr.aria-label]="'Folie ' + (i + 1) + ' von ' + slides().length"
            [attr.aria-hidden]="i !== active()"
            [class.active]="i === active()"
          >
            <div class="img-slide-media">
              <img [src]="slide.image || placeholder" [alt]="slide.title" />
            </div>
            <div class="img-slide-caption">
              <p class="img-slide-caption-title">{{ slide.title }}</p>
              <p class="img-slide-caption-text">{{ slide.text }}</p>
            </div>
          </div>
        }
      </div>

      <button
        class="img-slider-btn img-slider-prev"
        type="button"
        aria-label="Vorherige Slide"
        (click)="prev()"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 19.5-7.5-7.5 7.5-7.5" />
        </svg>
      </button>
      <button
        class="img-slider-btn img-slider-next"
        type="button"
        aria-label="Nächste Slide"
        (click)="next()"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div class="img-slider-dots" role="tablist" aria-label="Folien-Navigation">
        @for (slide of slides(); track $index; let i = $index) {
          <button
            class="img-dot"
            type="button"
            role="tab"
            [class.active]="i === active()"
            [attr.aria-selected]="i === active()"
            [attr.tabindex]="i === active() ? 0 : -1"
            [attr.aria-controls]="slideId(i)"
            [attr.aria-label]="'Folie ' + (i + 1) + ' von ' + slides().length"
            (click)="active.set(i)"
            (keydown)="onDotsKeydown($event)"
          ></button>
        }
      </div>
    </div>
  `,
})
export class CarouselComponent {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly instance = ++uid;

  /** Anzuzeigende Slides (Bild optional, Titel/Text je Slide Pflicht). */
  readonly slides = input.required<CdsSlide[]>();
  /** Aktiver Slide-Index. Two-Way (`[(active)]`) via model(). */
  readonly active = model(0);
  /** Hero-Variante (vollflächig, 21:9, Caption als Overlay) → .img-slider-hero. */
  readonly hero = input(false);

  /** @internal */
  protected readonly wrapClasses = computed(() =>
    this.hero() ? 'img-slider img-slider-hero' : 'img-slider',
  );

  /** @internal */
  protected prev(): void {
    this.active.set((this.active() - 1 + this.slides().length) % this.slides().length);
  }
  /** @internal */
  protected next(): void {
    this.active.set((this.active() + 1) % this.slides().length);
  }

  /** @internal */
  protected slideId(i: number): string {
    return `cds-carousel-${this.instance}-slide-${i}`;
  }

  /**
   * WAI-ARIA-Tabs-Tastatur auf der Dot-Leiste (horizontal, automatische Aktivierung):
   * ←/→ mit Umlauf, Home/End an die Enden; der Fokus wird mitgeführt (Roving Tabindex).
   * Indexberechnung in `../shared/dots-keyboard.ts` (identisch mit LogoCarousel).
   *
   * @internal
   */
  protected onDotsKeydown(event: KeyboardEvent): void {
    const next = nextDotsIndex(this.slides().length, this.active(), event.key);
    if (next === null) return;
    event.preventDefault();
    this.active.set(next);
    this.host.nativeElement.querySelectorAll<HTMLElement>('.img-dot')[next]?.focus();
  }

  /** @internal */
  protected readonly placeholder =
    "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='800'%20height='450'%3E%3Crect%20width='800'%20height='450'%20fill='%23E8EDED'/%3E%3Ctext%20x='400'%20y='225'%20font-family='sans-serif'%20font-size='24'%20fill='%236E8585'%20text-anchor='middle'%20dominant-baseline='middle'%3EBild%3C/text%3E%3C/svg%3E";
}
