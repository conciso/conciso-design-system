import { Component, Input } from '@angular/core';

export interface CdsSlide {
  image?: string;
  title: string;
  text: string;
}

/**
 * Carousel — Wrapper um `.img-slider` aus css/components.css → „Bild-Slider".
 *
 * Crossfade-Carousel: alle Slides liegen gestapelt im Grid, die aktive trägt
 * `.active` (opacity). Prev/Next-Buttons (.img-slider-btn) und Dots (.img-dot)
 * steuern den Index. Optionale Hero-Variante (.img-slider-hero). Ohne Bild-URL
 * wird ein neutraler Platzhalter gezeigt.
 */
@Component({
  selector: 'cds-carousel',
  standalone: true,
  template: `
    <div [class]="wrapClasses">
      <div class="img-slider-track">
        @for (slide of slides; track slide.title; let i = $index) {
          <div class="img-slide" [class.active]="i === active">
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

      <button class="img-slider-btn img-slider-prev" type="button" aria-label="Vorherige Slide" (click)="prev()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 19.5-7.5-7.5 7.5-7.5" />
        </svg>
      </button>
      <button class="img-slider-btn img-slider-next" type="button" aria-label="Nächste Slide" (click)="next()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div class="img-slider-dots">
        @for (slide of slides; track slide.title; let i = $index) {
          <button
            class="img-dot"
            type="button"
            [class.active]="i === active"
            [attr.aria-label]="'Slide ' + (i + 1)"
            [attr.aria-current]="i === active"
            (click)="active = i"
          ></button>
        }
      </div>
    </div>
  `,
})
export class CarouselComponent {
  @Input() slides: CdsSlide[] = [
    { title: 'Strategie-Workshop', text: 'Gemeinsam Ziele schärfen und Prioritäten setzen.' },
    { title: 'Team-Enablement', text: 'Wissen teilen, Verantwortung verteilen, Wirkung erhöhen.' },
    { title: 'Go-Live', text: 'Vom Prototyp zur produktiven Lösung, messbar und stabil.' },
  ];
  @Input() active = 0;
  /** Hero-Variante (vollflächig, 21:9, Caption als Overlay) → .img-slider-hero. */
  @Input() hero = false;

  get wrapClasses(): string {
    return this.hero ? 'img-slider img-slider-hero' : 'img-slider';
  }

  prev(): void {
    this.active = (this.active - 1 + this.slides.length) % this.slides.length;
  }
  next(): void {
    this.active = (this.active + 1) % this.slides.length;
  }

  protected readonly placeholder =
    "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='800'%20height='450'%3E%3Crect%20width='800'%20height='450'%20fill='%23E8EDED'/%3E%3Ctext%20x='400'%20y='225'%20font-family='sans-serif'%20font-size='24'%20fill='%236E8585'%20text-anchor='middle'%20dominant-baseline='middle'%3EBild%3C/text%3E%3C/svg%3E";
}
