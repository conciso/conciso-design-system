import { Component, Input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Slider — Wrapper um `.field-slider` / `.slider` aus css/components.css → „Slider".
 *
 * Range-Eingabe mit Label + Live-Ausgabe, bereichsgefärbtem Thumb/Output
 * (.slider-<area> setzt --sl-color), optionalen Ticks und Helper-Text. Der
 * Ausgabewert wird beim Schieben formatiert (de-DE + Einheit) aktualisiert.
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
      @if (ticks.length) {
        <div class="field-slider-ticks" aria-hidden="true">
          @for (tick of ticks; track $index) {
            <span>{{ tick }}</span>
          }
        </div>
      }
      @if (helper) {
        <span class="helper" [id]="sliderId + '-hint'">{{ helper }}</span>
      }
    </div>
  `,
})
export class SliderComponent {
  @Input() label = 'Budget-Rahmen';
  /** Markenbereich → .slider-<area> (Thumb- + Output-Farbe). */
  @Input() area: CdsArea = 'co';
  @Input() min = 10000;
  @Input() max = 100000;
  @Input() step = 5000;
  @Input() value = 50000;
  /** Einheit, an den formatierten Wert angehängt (z. B. ' €'). */
  @Input() unit = ' €';
  @Input() ticks: string[] = ['10k', '55k', '100k'];
  @Input() helper = 'Schritte: 5.000 €';
  @Input() disabled = false;
  @Input() sliderId = 'cds-slider';

  get sliderClasses(): string {
    return `slider slider-${this.area}`;
  }
  get outputClasses(): string {
    return `field-slider-output slider-${this.area}`;
  }
  get formatted(): string {
    return `${this.value.toLocaleString('de-DE')}${this.unit}`;
  }

  onInput(event: Event): void {
    this.value = Number((event.target as HTMLInputElement).value);
  }
}
