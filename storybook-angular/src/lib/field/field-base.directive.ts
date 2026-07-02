import { Directive, Input } from '@angular/core';

// Modulweiter Zähler → jede Instanz bekommt per Default eine EINDEUTIGE id.
// Ein konstanter Default würde bei mehreren Feldern kollidieren (doppelte id →
// kaputte label/for- und aria-describedby-Verknüpfung).
let uid = 0;

/**
 * Gemeinsame Basis der Field-Komponenten (Textfeld / Textbereich / Auswahlfeld).
 *
 * Bündelt die geteilten Inputs und die a11y-Verdrahtung. Angular vererbt @Inputs
 * über eine mit `@Directive()` dekorierte abstrakte Basisklasse — deshalb steht
 * hier die LOGIK. Das gemeinsame MARKUP (Label/Helper/Fehler) wird NICHT vererbt
 * (Angular vererbt keine Templates); dafür teilen sich die Komponenten die
 * FieldShellComponent per Komposition.
 */
@Directive()
export abstract class FieldBase {
  /** Sichtbares Label. */
  @Input() label = '';
  /** Optionaler Hilfetext unter dem Feld. */
  @Input() helper = '';
  /** Gesetzt = Fehlerzustand (.has-error + .error-msg). */
  @Input() error = '';
  /** Pflichtfeld → .req-Asterisk + aria-required. */
  @Input() required = false;
  /** id für die label/for- und aria-describedby-Verknüpfung. Default eindeutig. */
  @Input() fieldId = `cds-field-${++uid}`;

  get errorId(): string {
    return `${this.fieldId}-error`;
  }
}
