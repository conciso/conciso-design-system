import { Directive } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';

/**
 * ControlValueAccessor-Kitt OHNE Markup- oder Werttyp-Annahmen: hält NUR, was bei
 * `checkbox`, `radio-group`, `slider`, `scale` (und, über `FieldBase`, den drei
 * Field-Komponenten) wortgleich war — die `onChange`/`onTouched`-Callbacks plus
 * `writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`.
 *
 * Generisch über den Werttyp `T` (boolean bei Checkbox, string bei RadioGroup/
 * FieldBase, number bei Slider/Scale). Die defensive Normalisierung eines
 * eingehenden Formularwerts (Klemmen auf [min, max], `!!`-Cast, `NaN`-Abfang, …)
 * ist komponentenspezifisch und bleibt darum bewusst NICHT hier: `writeValue` ruft
 * den überschreibbaren Hook `normalizeValue` auf (Default: unverändert), die
 * konkrete Komponente überschreibt ihn UND `applyValue`/`applyDisabled` (schreiben
 * in ihr eigenes `model()`-Signal — die Basis kennt dessen Namen nicht).
 */
@Directive()
export abstract class CvaBase<T> implements ControlValueAccessor {
  /** @internal */
  protected onChange: (value: T) => void = () => {
    /* von Angular-Forms via registerOnChange gesetzt */
  };
  /** @internal */
  protected onTouched: () => void = () => {
    /* von Angular-Forms via registerOnTouched gesetzt */
  };

  /**
   * Rohen Formularwert in einen gültigen Komponentenwert übersetzen (Klemmen,
   * Typ-Cast, `NaN`-Abfang, …). Default: unverändert durchreichen.
   *
   * @internal
   */
  protected normalizeValue(value: T): T {
    return value;
  }

  /** Normalisierten Wert ins eigene `model()`-Signal der Komponente schreiben. @internal */
  protected abstract applyValue(value: T): void;
  /** `disabled`-Zustand ins eigene `model()`-Signal der Komponente schreiben. @internal */
  protected abstract applyDisabled(disabled: boolean): void;

  /** @internal */
  writeValue(value: T): void {
    this.applyValue(this.normalizeValue(value));
  }
  /** @internal */
  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }
  /** @internal */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  /** @internal */
  setDisabledState(isDisabled: boolean): void {
    this.applyDisabled(isDisabled);
  }
}
