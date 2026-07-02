import { Component, Input } from '@angular/core';
import type { CdsArea } from '../area';

// Modulweiter Zähler → jede Gruppe bekommt per Default einen EINDEUTIGEN name.
// Gleiche names über Gruppen hinweg würden deren Radios fälschlich koppeln.
let uid = 0;

/**
 * Radio-Gruppe (Optionsfelder) nach docs/index.html („Forms").
 *
 * Für 2–6 sich gegenseitig ausschließende Optionen (mehr → Select). Bewusst KEIN
 * nachgebauter Kreis: native `<input type="radio">` mit `accent-color` in der
 * Bereichsfarbe, gruppiert in `<fieldset>`/`<legend>` (Gruppen-Label wie ein
 * Feld-Label), alle Optionen teilen denselben `name`.
 */
@Component({
  selector: 'cds-radio-group',
  standalone: true,
  template: `
    <fieldset style="border:0;padding:0;margin:0;min-inline-size:0">
      <legend
        style="font:var(--ty-label-sm);text-transform:uppercase;letter-spacing:.06em;color:var(--tx-secondary);margin-bottom:var(--s2);padding:0"
        >{{ legend }}@if (required) {&nbsp;<span class="req" aria-hidden="true">*</span>}</legend
      >
      <div style="display:flex;flex-direction:column;gap:var(--s3)">
        @for (opt of options; track opt) {
          <label
            style="display:flex;align-items:center;gap:var(--s3);cursor:pointer;font:var(--ty-body-md);color:var(--tx-primary)"
          >
            <input
              type="radio"
              [name]="name"
              [value]="opt"
              [checked]="opt === value"
              [disabled]="disabled"
              [attr.required]="required ? '' : null"
              [style.accent-color]="'var(--' + area + '-500)'"
              style="width:18px;height:18px;flex-shrink:0;cursor:pointer"
            />
            <span>{{ opt }}</span>
          </label>
        }
      </div>
    </fieldset>
  `,
})
export class RadioGroupComponent {
  /** Gruppen-Label (die Frage) → <legend>. */
  @Input() legend = 'Optionen';
  /** Auswahloptionen (Label = Wert). */
  @Input() options: string[] = [];
  /** Aktuell gewählter Wert. */
  @Input() value = '';
  /** Gemeinsamer name aller Radios der Gruppe. Default eindeutig. */
  @Input() name = `cds-radio-${++uid}`;
  /** Pflichtauswahl → required + .req-Asterisk. */
  @Input() required = false;
  @Input() disabled = false;
  /** Brand Area → accent-color der Radios. */
  @Input() area: CdsArea = 'co';
}
