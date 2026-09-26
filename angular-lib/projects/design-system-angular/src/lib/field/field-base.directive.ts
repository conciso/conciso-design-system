import { computed, Directive, input, model } from '@angular/core';
import { CvaBase } from '../shared/cva-base.directive';

// Modulweiter Zähler → jede Instanz bekommt per Default eine EINDEUTIGE id.
// Ein konstanter Default würde bei mehreren Feldern kollidieren (doppelte id →
// kaputte label/for- und aria-describedby-Verknüpfung).
let uid = 0;

/**
 * Gemeinsame Basis der Field-Komponenten (Textfeld / Textbereich / Auswahlfeld).
 *
 * Bündelt die geteilten Inputs, die a11y-Verdrahtung UND die Wert-Anbindung. Als
 * `ControlValueAccessor` binden sich die Felder direkt an Angular-Formulare
 * (`[(ngModel)]`, `formControlName`) — der übliche Weg für eine Komponenten-
 * bibliothek. Zusätzlich ist `value` ein `model()`, sodass ohne Formular auch
 * `[(value)]` und der `valueChange`-Output funktionieren. Den ControlValueAccessor-
 * Kitt (onChange/onTouched, writeValue, registerOnChange/-Touched, setDisabledState)
 * erbt sie von `CvaBase` (`lib/shared/cva-base.directive.ts`) — geteilt mit
 * Checkbox/RadioGroup/Slider/Scale, die dieselbe Boilerplate wortgleich hatten.
 *
 * Angular vererbt Inputs/Logik über eine mit `@Directive()` dekorierte abstrakte
 * Basisklasse — deshalb steht die LOGIK hier. Das gemeinsame MARKUP (Label/Helper/
 * Fehler) wird NICHT vererbt (Angular vererbt keine Templates); dafür teilen sich
 * die Komponenten die FieldShellComponent per Komposition. Den `NG_VALUE_ACCESSOR`-
 * Provider setzt jede konkrete Komponente selbst (forwardRef auf ihre Klasse).
 */
@Directive()
export abstract class FieldBase extends CvaBase<string> {
  /** Sichtbares Label. */
  readonly label = input('');
  /** Optionaler Hilfetext unter dem Feld. */
  readonly helper = input('');
  /** Gesetzt = Fehlerzustand (.has-error + .error-msg). */
  readonly error = input('');
  /** Pflichtfeld → .req-Asterisk + aria-required. */
  readonly required = input(false);
  /** id für die label/for- und aria-describedby-Verknüpfung. Default eindeutig. */
  readonly fieldId = input(`cds-field-${++uid}`);

  /** Feldwert — Two-Way (`[(value)]`) UND Angular-Forms (ngModel/formControlName). */
  readonly value = model('');
  /** Deaktiviert; auch über Angular-Forms (setDisabledState) steuerbar. */
  readonly disabled = model(false);

  /** @internal */
  protected override normalizeValue(value: string): string {
    return value ?? '';
  }
  /** @internal */
  protected override applyValue(value: string): void {
    this.value.set(value);
  }
  /** @internal */
  protected override applyDisabled(disabled: boolean): void {
    this.disabled.set(disabled);
  }

  /**
   * Vom Template bei Eingabe/Änderung des nativen Controls aufgerufen.
   *
   * @internal
   */
  protected handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
      .value;
    this.value.set(value);
    this.onChange(value);
  }
  /**
   * Vom Template bei Verlassen des Felds → markiert das Control als „touched“.
   *
   * @internal
   */
  protected handleBlur(): void {
    this.onTouched();
  }

  /** @internal */
  protected readonly errorId = computed(() => `${this.fieldId()}-error`);
}
