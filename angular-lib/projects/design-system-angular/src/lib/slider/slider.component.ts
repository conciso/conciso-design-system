import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  input,
  model,
  numberAttribute,
  signal,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import type { CdsArea } from '../area';
import { CvaBase } from '../shared/cva-base.directive';

// Modulweiter Zähler → jede Instanz bekommt per Default eine EINDEUTIGE id.
// Ein konstanter Default würde bei mehreren Slidern kollidieren (doppelte id →
// kaputte label/for-, output/for- und aria-describedby-Verknüpfung).
let uid = 0;

/**
 * Slider — Wrapper um `.field-slider` / `.slider` aus css/components.css → „Slider“.
 *
 * Range-Eingabe mit Label + Live-Ausgabe, bereichsgefärbtem Thumb/Output
 * (.slider-<area> setzt --sl-color), automatisch berechneten Ticks und Helper-Text.
 *
 * Ticks: Es wird nur eine gewünschte ANZAHL (`tickCount`) angegeben; die Positionen/
 * Labels werden gleichmäßig aus [min, max] berechnet (space-between wie das CSS-
 * Layout). Wird der Slider zu schmal, reduziert die Komponente die Tick-Zahl reaktiv
 * (ResizeObserver), sodass die Labels nicht überlappen — Endpunkte bleiben erhalten.
 *
 * Als `ControlValueAccessor` direkt an Angular-Formulare anbindbar (`[(ngModel)]`,
 * `formControlName`); ohne Formular geht `[(value)]` (valueChange via model()).
 *
 * Verwendungsguidance dieser Gruppe: siehe Textfeld (`komponenten-inputs-forms-textfeld--verwendung`).
 */
@Component({
  selector: 'cds-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SliderComponent), multi: true },
  ],
  template: `
    <div class="field-slider">
      <div class="field-slider-header">
        <label class="field-slider-label" [attr.for]="sliderId()">{{ label() }}</label>
        <output [class]="outputClasses()" [attr.for]="sliderId()" [id]="sliderId() + '-out'">
          {{ formatted() }}
        </output>
      </div>
      <input
        [class]="sliderClasses()"
        type="range"
        [id]="sliderId()"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.aria-valuetext]="formatted()"
        [attr.aria-describedby]="helper() ? sliderId() + '-hint' : null"
        (input)="onInput($event)"
        (blur)="markTouched()"
      />
      @if (tickItems().length) {
        <!-- Ticks exakt auf die Thumb-Position ausgerichtet: der Thumb (22px, siehe
             css/components.css) läuft mittig von 11px bis (Breite − 11px). Das
             space-between des Kern-CSS träfe die Label-MITTEN nicht (bei vielen Ticks
             sichtbar), daher hier absolut positioniert und zentriert. -->
        <div
          class="field-slider-ticks"
          aria-hidden="true"
          style="position:relative;display:block;padding:0;height:16px"
        >
          @for (t of tickItems(); track $index) {
            <span
              [style.left]="t.left"
              style="position:absolute;transform:translateX(-50%);white-space:nowrap"
              >{{ t.label }}</span
            >
          }
        </div>
      }
      @if (helper()) {
        <span class="helper" [id]="sliderId() + '-hint'">{{ helper() }}</span>
      }
    </div>
  `,
})
export class SliderComponent extends CvaBase<number> {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  /** Gemessene Slider-Breite (px); treibt die reaktive Tick-Reduktion. */
  private readonly width = signal(0);

  readonly label = input('Budget-Rahmen');
  /** Markenbereich → .slider-<area> (Thumb- + Output-Farbe). */
  readonly area = input<CdsArea>('co');
  readonly min = input(10000, { transform: numberAttribute });
  readonly max = input(100000, { transform: numberAttribute });
  readonly step = input(5000, { transform: numberAttribute });
  /** Aktueller Wert. Two-Way (`[(value)]`) UND Angular-Forms. */
  readonly value = model(50000);
  /** Einheit, an den formatierten Wert angehängt (z. B. ' €'). */
  readonly unit = input(' €');
  /** Gewünschte Anzahl Ticks (inkl. Endpunkte). 0 = keine. Wird bei zu schmalem
   *  Slider automatisch reduziert. */
  readonly tickCount = input(3, { transform: numberAttribute });
  /** Mindestbreite (px) pro Tick-Label, ab der reduziert wird. */
  readonly minTickSpacing = input(56, { transform: numberAttribute });
  readonly helper = input('Schritte: 5.000 €');
  /** Deaktiviert; auch über Angular-Forms (setDisabledState) steuerbar. */
  readonly disabled = model(false);
  readonly sliderId = input(`cds-slider-${++uid}`);

  constructor() {
    super();
    // Erstmessung + ResizeObserver-Setup: reine Browser-Angelegenheit (Layout gibt es
    // beim serverseitigen Rendern nicht) und läuft genau einmal nach dem ersten Render —
    // afterNextRender ist der Ersatz für ngAfterViewInit + direktem DOM-Zugriff, der
    // (anders als ngAfterViewInit) NIE beim SSR ausgeführt wird.
    afterNextRender(() => {
      const el = this.host.nativeElement.querySelector<HTMLElement>('.field-slider');
      if (!el) return;
      this.width.set(el.getBoundingClientRect().width);
      if (typeof ResizeObserver !== 'undefined') {
        const ro = new ResizeObserver((entries) => {
          this.width.set(entries[0].contentRect.width);
        });
        ro.observe(el);
        this.destroyRef.onDestroy(() => ro.disconnect());
      }
    });
  }

  /** @internal */
  protected override normalizeValue(value: number): number {
    // Auf [min, max] klemmen: ein Formularwert außerhalb des Bereichs würde sonst im
    // <output> stehen, während der native Thumb an min/max klemmt (Modell/UI-Mismatch).
    const n = typeof value === 'number' && !Number.isNaN(value) ? value : this.min();
    return this.clamp(n);
  }
  private clamp(v: number): number {
    return Math.min(this.max(), Math.max(this.min(), v));
  }
  /** @internal */
  protected override applyValue(value: number): void {
    this.value.set(value);
  }
  /** @internal */
  protected override applyDisabled(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  /** @internal */
  protected readonly sliderClasses = computed(() => `slider slider-${this.area()}`);
  /** @internal */
  protected readonly outputClasses = computed(() => `field-slider-output slider-${this.area()}`);
  /** @internal */
  protected readonly formatted = computed(
    () => `${this.value().toLocaleString('de-DE')}${this.unit()}`,
  );

  /** Effektive Tick-Anzahl: Wunsch, aber auf das reduziert, was in die Breite passt. */
  private effectiveTickCount(): number {
    const tickCount = this.tickCount();
    if (tickCount < 2) return Math.max(0, Math.trunc(tickCount));
    const w = this.width();
    if (!w) return tickCount; // vor der Messung: Wunschanzahl
    const maxFit = Math.max(2, Math.floor(w / this.minTickSpacing()));
    return Math.min(tickCount, maxFit);
  }

  /**
   * Gleichmäßig über [min, max] verteilte Ticks: Label (kompakt formatiert) plus
   * absolute Ziel-Position (left), zentriert auf die echte Thumb-Position.
   *
   * @internal
   */
  protected readonly tickItems = computed<{ label: string; left: string }[]>(() => {
    const n = this.effectiveTickCount();
    if (n < 1) return [];
    // left so, dass die Label-MITTE auf dem Thumb-Mittelpunkt liegt (Thumb 22px →
    // von 11px bis Breite−11px). translateX(-50%) zentriert das Label darüber.
    const at = (p: number) => `calc(11px + ${p} * (100% - 22px))`;
    const min = this.min();
    const max = this.max();
    if (n === 1) return [{ label: this.formatTick(min), left: at(0.5) }];
    return Array.from({ length: n }, (_, i) => {
      const p = i / (n - 1);
      return { label: this.formatTick(min + (max - min) * p), left: at(p) };
    });
  });

  /** Kompakte Tick-Beschriftung: k/M-Kurzform (de-DE), z. B. 32500 → „32,5k“. */
  private formatTick(v: number): string {
    const abs = Math.abs(v);
    const fmt = (x: number) => x.toLocaleString('de-DE', { maximumFractionDigits: 1 });
    if (abs >= 1_000_000) return `${fmt(v / 1_000_000)}M`;
    if (abs >= 1_000) return `${fmt(v / 1_000)}k`;
    return fmt(v);
  }

  /** @internal */
  protected onInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.value.set(value);
    this.onChange(value);
  }
  /** @internal */
  protected markTouched(): void {
    this.onTouched();
  }
}
