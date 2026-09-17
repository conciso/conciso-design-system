import { Component, forwardRef, input, model } from '@angular/core';
import { type ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import type { CdsArea } from '../area';

// Modulweiter Zähler → jede Gruppe bekommt per Default einen EINDEUTIGEN name.
// Gleiche names über Gruppen hinweg würden deren Radios fälschlich koppeln.
let uid = 0;

/**
 * Radio-Gruppe (Optionsfelder) nach docs/index.html („Forms“).
 *
 * Für 2–6 sich gegenseitig ausschließende Optionen (mehr → Select). Bewusst KEIN
 * nachgebauter Kreis: native `<input type="radio">` mit `accent-color` in der
 * Bereichsfarbe, gruppiert in `<fieldset>`/`<legend>` (Gruppen-Label wie ein
 * Feld-Label), alle Optionen teilen denselben `name`.
 *
 * Als `ControlValueAccessor` direkt an Angular-Formulare anbindbar (`[(ngModel)]`,
 * `formControlName`); ohne Formular geht `[(value)]` (valueChange via model()).
 */
@Component({
  selector: 'cds-radio-group',
  standalone: true,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioGroupComponent), multi: true },
  ],
  template: `
    <fieldset style="border:0;padding:0;margin:0;min-inline-size:0">
      <legend
        style="font:var(--ty-label-sm);text-transform:uppercase;letter-spacing:.06em;color:var(--tx-secondary);margin-bottom:var(--s2);padding:0"
        >{{ legend() }}@if (required()) {&nbsp;<span class="req" aria-hidden="true">*</span>}</legend
      >
      <div style="display:flex;flex-direction:column;gap:var(--s3)">
        @for (opt of options(); track opt) {
          <label
            style="display:flex;align-items:center;gap:var(--s3);cursor:pointer;font:var(--ty-body-md);color:var(--tx-primary)"
          >
            <input
              type="radio"
              [name]="name()"
              [value]="opt"
              [checked]="opt === value()"
              [disabled]="disabled()"
              [attr.required]="required() ? '' : null"
              [attr.aria-required]="required() ? 'true' : null"
              [style.accent-color]="'var(--' + area() + '-500)'"
              style="width:18px;height:18px;flex-shrink:0;cursor:pointer"
              (change)="onRadioChange(opt)"
              (blur)="markTouched()"
            />
            <span>{{ opt }}</span>
          </label>
        }
      </div>
    </fieldset>
  `,
})
export class RadioGroupComponent implements ControlValueAccessor {
  /** Gruppen-Label (die Frage) → <legend>. */
  readonly legend = input('Optionen');
  /** Auswahloptionen (Label = Wert). */
  readonly options = input<string[]>([]);
  /** Aktuell gewählter Wert. Two-Way (`[(value)]`) UND Angular-Forms. */
  readonly value = model('');
  /** Gemeinsamer name aller Radios der Gruppe. Default eindeutig. */
  readonly name = input(`cds-radio-${++uid}`);
  /** Pflichtauswahl → required + .req-Asterisk. */
  readonly required = input(false);
  /** Deaktiviert; auch über Angular-Forms (setDisabledState) steuerbar. */
  readonly disabled = model(false);
  /** Brand Area → accent-color der Radios. */
  readonly area = input<CdsArea>('co');

  private onChange: (value: string) => void = () => {
    /* von Angular-Forms via registerOnChange gesetzt */
  };
  private onTouched: () => void = () => {
    /* von Angular-Forms via registerOnTouched gesetzt */
  };

  /** @internal */
  writeValue(value: string): void {
    this.value.set(value ?? '');
  }
  /** @internal */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  /** @internal */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  /** @internal */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  /** @internal */
  onRadioChange(opt: string): void {
    this.value.set(opt);
    this.onChange(opt);
    this.onTouched();
  }
  /** @internal */
  markTouched(): void {
    this.onTouched();
  }
}
