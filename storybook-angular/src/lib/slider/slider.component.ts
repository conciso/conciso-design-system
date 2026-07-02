import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  signal,
} from '@angular/core';
import type { CdsArea } from '../area';

// Modulweiter Zähler → jede Instanz bekommt per Default eine EINDEUTIGE id.
// Ein konstanter Default würde bei mehreren Slidern kollidieren (doppelte id →
// kaputte label/for-, output/for- und aria-describedby-Verknüpfung).
let uid = 0;

/**
 * Slider — Wrapper um `.field-slider` / `.slider` aus css/components.css → „Slider".
 *
 * Range-Eingabe mit Label + Live-Ausgabe, bereichsgefärbtem Thumb/Output
 * (.slider-<area> setzt --sl-color), automatisch berechneten Ticks und Helper-Text.
 *
 * Ticks: Es wird nur eine gewünschte ANZAHL (`tickCount`) angegeben; die Positionen/
 * Labels werden gleichmäßig aus [min, max] berechnet (space-between wie das CSS-
 * Layout). Wird der Slider zu schmal, reduziert die Komponente die Tick-Zahl reaktiv
 * (ResizeObserver), sodass die Labels nicht überlappen — Endpunkte bleiben erhalten.
 */
@Component({
  selector: 'cds-slider',
  standalone: true,
  template: `
    <div class="field-slider">
      <div class="field-slider-header">
        <label class="field-slider-label" [attr.for]="sliderId">{{ label }}</label>
        <output [class]="outputClasses" [attr.for]="sliderId" [id]="sliderId + '-out'">
          {{ formatted }}
        </output>
      </div>
      <input
        [class]="sliderClasses"
        type="range"
        [id]="sliderId"
        [min]="min"
        [max]="max"
        [step]="step"
        [value]="value"
        [disabled]="disabled"
        [attr.aria-describedby]="helper ? sliderId + '-hint' : null"
        (input)="onInput($event)"
      />
      @if (tickItems.length) {
        <!-- Ticks exakt auf die Thumb-Position ausgerichtet: der Thumb (22px, siehe
             css/components.css) läuft mittig von 11px bis (Breite − 11px). Das
             space-between des Kern-CSS träfe die Label-MITTEN nicht (bei vielen Ticks
             sichtbar), daher hier absolut positioniert und zentriert. -->
        <div
          class="field-slider-ticks"
          aria-hidden="true"
          style="position:relative;display:block;padding:0;height:16px"
        >
          @for (t of tickItems; track $index) {
            <span
              [style.left]="t.left"
              style="position:absolute;transform:translateX(-50%);white-space:nowrap"
              >{{ t.label }}</span
            >
          }
        </div>
      }
      @if (helper) {
        <span class="helper" [id]="sliderId + '-hint'">{{ helper }}</span>
      }
    </div>
  `,
})
export class SliderComponent implements AfterViewInit, OnDestroy {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private resizeObserver?: ResizeObserver;
  /** Gemessene Slider-Breite (px); treibt die reaktive Tick-Reduktion. */
  private readonly width = signal(0);

  @Input() label = 'Budget-Rahmen';
  /** Markenbereich → .slider-<area> (Thumb- + Output-Farbe). */
  @Input() area: CdsArea = 'co';
  @Input() min = 10000;
  @Input() max = 100000;
  @Input() step = 5000;
  @Input() value = 50000;
  /** Einheit, an den formatierten Wert angehängt (z. B. ' €'). */
  @Input() unit = ' €';
  /** Gewünschte Anzahl Ticks (inkl. Endpunkte). 0 = keine. Wird bei zu schmalem
   *  Slider automatisch reduziert. */
  @Input() tickCount = 3;
  /** Mindestbreite (px) pro Tick-Label, ab der reduziert wird. */
  @Input() minTickSpacing = 56;
  @Input() helper = 'Schritte: 5.000 €';
  @Input() disabled = false;
  @Input() sliderId = `cds-slider-${++uid}`;

  ngAfterViewInit(): void {
    const el = this.host.nativeElement.querySelector<HTMLElement>('.field-slider');
    if (!el) return;
    this.width.set(el.getBoundingClientRect().width);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver((entries) => {
        this.width.set(entries[0].contentRect.width);
      });
      this.resizeObserver.observe(el);
    }
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }

  get sliderClasses(): string {
    return `slider slider-${this.area}`;
  }
  get outputClasses(): string {
    return `field-slider-output slider-${this.area}`;
  }
  get formatted(): string {
    return `${this.value.toLocaleString('de-DE')}${this.unit}`;
  }

  /** Effektive Tick-Anzahl: Wunsch, aber auf das reduziert, was in die Breite passt. */
  private effectiveTickCount(): number {
    if (this.tickCount < 2) return Math.max(0, Math.trunc(this.tickCount));
    const w = this.width();
    if (!w) return this.tickCount; // vor der Messung: Wunschanzahl
    const maxFit = Math.max(2, Math.floor(w / this.minTickSpacing));
    return Math.min(this.tickCount, maxFit);
  }

  /**
   * Gleichmäßig über [min, max] verteilte Ticks: Label (kompakt formatiert) plus
   * absolute Ziel-Position (left), zentriert auf die echte Thumb-Position.
   */
  get tickItems(): { label: string; left: string }[] {
    const n = this.effectiveTickCount();
    if (n < 1) return [];
    // left so, dass die Label-MITTE auf dem Thumb-Mittelpunkt liegt (Thumb 22px →
    // von 11px bis Breite−11px). translateX(-50%) zentriert das Label darüber.
    const at = (p: number) => `calc(11px + ${p} * (100% - 22px))`;
    if (n === 1) return [{ label: this.formatTick(this.min), left: at(0.5) }];
    return Array.from({ length: n }, (_, i) => {
      const p = i / (n - 1);
      return { label: this.formatTick(this.min + (this.max - this.min) * p), left: at(p) };
    });
  }

  /** Kompakte Tick-Beschriftung: k/M-Kurzform (de-DE), z. B. 32500 → „32,5k". */
  private formatTick(v: number): string {
    const abs = Math.abs(v);
    const fmt = (x: number) => x.toLocaleString('de-DE', { maximumFractionDigits: 1 });
    if (abs >= 1_000_000) return `${fmt(v / 1_000_000)}M`;
    if (abs >= 1_000) return `${fmt(v / 1_000)}k`;
    return fmt(v);
  }

  onInput(event: Event): void {
    this.value = Number((event.target as HTMLInputElement).value);
  }
}
