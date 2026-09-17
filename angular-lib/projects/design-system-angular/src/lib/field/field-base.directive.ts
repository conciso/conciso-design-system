import { Directive, input, model } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';

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
 * `[(value)]` und der `valueChange`-Output funktionieren.
 *
 * Angular vererbt Inputs/Logik über eine mit `@Directive()` dekorierte abstrakte
 * Basisklasse — deshalb steht die LOGIK hier. Das gemeinsame MARKUP (Label/Helper/
 * Fehler) wird NICHT vererbt (Angular vererbt keine Templates); dafür teilen sich
 * die Komponenten die FieldShellComponent per Komposition. Den `NG_VALUE_ACCESSOR`-
 * Provider setzt jede konkrete Komponente selbst (forwardRef auf ihre Klasse).
 */
@Directive()
export abstract class FieldBase implements ControlValueAccessor {
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

  /**
   * ControlValueAccessor-Callbacks (von Angular-Forms registriert).
   *
   * @internal
   */
  protected onChange: (value: string) => void = () => {
    /* von Angular-Forms via registerOnChange gesetzt */
  };
  /** @internal */
  protected onTouched: () => void = () => {
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

  /**
   * Vom Template bei Eingabe/Änderung des nativen Controls aufgerufen.
   *
   * @internal
   */
  handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
    this.value.set(value);
    this.onChange(value);
  }
  /**
   * Vom Template bei Verlassen des Felds → markiert das Control als „touched“.
   *
   * @internal
   */
  handleBlur(): void {
    this.onTouched();
  }

  /** @internal */
  get errorId(): string {
    return `${this.fieldId()}-error`;
  }
}
