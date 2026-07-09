import { Component, forwardRef, input, model } from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { CdsArea } from '../area';

// Modulweiter Zähler → eindeutige Default-id (label/for, output/for, aria).
let uid = 0;

/**
 * Skala (cds-scale) — Slider für GEORDNETE (ordinale) Kategorien, deren Labels die
 * Werte SIND (z. B. Niedrig < Mittel < Hoch, nie < selten < oft < immer).
 *
 * Basiert auf dem nativen <input type="range">; min=0, max=labels.length-1, step=1
 * werden intern abgeleitet und NICHT exponiert. Der aktuelle Wert erscheint als
 * LABEL im <output> und wird Screenreadern über `aria-valuetext` als Text gemeldet
 * (nicht als Zahl) — das anerkannte APG-Muster für ordinale Slider. Die Skalenpunkte
 * zeigen alle Labels, exakt auf ihre Position ausgerichtet und bewusst OHNE
 * Reduktion (jedes Label ist eine wählbare Stufe).
 *
 * NUR für geordnete Kategorien. Ungeordnete/gleichrangige Optionen (ohne natürliche
 * Reihenfolge) gehören NICHT auf einen Slider → cds-radio-group oder cds-area-tabs.
 *
 * Als `ControlValueAccessor` direkt an Angular-Formulare anbindbar (`[(ngModel)]`,
 * `formControlName`); der Formularwert ist der Stufen-INDEX. Ohne Formular geht
 * `[(value)]` (valueChange via model()).
 */
@Component({
  selector: 'cds-scale',
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ScaleComponent), multi: true },
  ],
  template: `
    <div class="field-slider">
      <div class="field-slider-header">
        <label class="field-slider-label" [attr.for]="scaleId()">{{ label() }}</label>
        <output [class]="outputClasses" [attr.for]="scaleId()" [id]="scaleId() + '-out'">{{ currentLabel }}</output>
      </div>
      <input
        [class]="sliderClasses"
        type="range"
        [id]="scaleId()"
        min="0"
        [max]="max"
        step="1"
        [value]="value()"
        [disabled]="disabled()"
        [attr.aria-valuetext]="currentLabel"
        [attr.aria-describedby]="helper() ? scaleId() + '-hint' : null"
        (input)="onInput($event)"
        (blur)="markTouched()"
      />
      @if (labels().length) {
        <!-- Alle Skalen-Labels exakt auf ihre Position ausgerichtet (Thumb 22px, siehe
             css/components.css), zentriert. KEINE Reduktion — jedes Label ist wählbar.
             Self-contained positioniert (der --tick-p-Kernmechanismus liegt noch auf
             dem main-PR; nach Merge kann das vereinfacht werden). -->
        <div
          class="field-slider-ticks"
          aria-hidden="true"
          style="position:relative;display:block;padding:0;height:16px"
        >
          @for (t of tickItems; track $index) {
            <span [style]="t.style">{{ t.label }}</span>
          }
        </div>
      }
      @if (helper()) {
        <span class="helper" [id]="scaleId() + '-hint'">{{ helper() }}</span>
      }
    </div>
  `,
})
export class ScaleComponent implements ControlValueAccessor {
  /** Feld-Label (die Frage), z. B. „Zufriedenheit". */
  readonly label = input('Bewertung');
  /** Geordnete Skalen-Labels; sie sind zugleich die Werte. */
  readonly labels = input<string[]>(['Niedrig', 'Mittel', 'Hoch']);
  /** Gewählte Stufe als Index (0-basiert). Two-Way (`[(value)]`) UND Angular-Forms. */
  readonly value = model(1);
  /** Markenbereich → Thumb-/Output-Farbe. */
  readonly area = input<CdsArea>('co');
  readonly helper = input('');
  /** Deaktiviert; auch über Angular-Forms (setDisabledState) steuerbar. */
  readonly disabled = model(false);
  readonly scaleId = input(`cds-scale-${++uid}`);

  private onChange: (value: number) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: number): void {
    this.value.set(typeof value === 'number' ? value : 0);
  }
  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  /** Oberer Index (aus der Label-Zahl abgeleitet, nicht exponiert). */
  get max(): number {
    return Math.max(0, this.labels().length - 1);
  }
  get currentLabel(): string {
    return this.labels()[this.value()] ?? '';
  }
  get sliderClasses(): string {
    return `slider slider-${this.area()}`;
  }
  get outputClasses(): string {
    return `field-slider-output slider-${this.area()}`;
  }

  /**
   * Alle Labels + Positions-Style. Mitte-Labels sind auf ihrer Thumb-Position
   * zentriert; das ERSTE/LETZTE Label wird an der jeweiligen Kante verankert
   * (linksbündig bei 11px bzw. rechtsbündig bei Breite−11px), damit lange
   * Kategorie-Labels an den Enden nicht über den Rand hinaus abgeschnitten werden.
   * (11px = halbe Thumb-Breite, siehe css/components.css.)
   */
  get tickItems(): { label: string; style: Record<string, string> }[] {
    const labels = this.labels();
    const n = labels.length;
    const base: Record<string, string> = { position: 'absolute', 'white-space': 'nowrap' };
    return labels.map((label, i) => {
      if (n <= 1 || i === 0) return { label, style: { ...base, left: '11px', 'text-align': 'left' } };
      if (i === n - 1) return { label, style: { ...base, right: '11px', 'text-align': 'right' } };
      const p = i / (n - 1);
      return {
        label,
        style: { ...base, left: `calc(11px + ${p} * (100% - 22px))`, transform: 'translateX(-50%)' },
      };
    });
  }

  onInput(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this.value.set(value);
    this.onChange(value);
  }
  markTouched(): void {
    this.onTouched();
  }
}
