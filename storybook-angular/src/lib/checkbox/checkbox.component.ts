import { Component, Input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Checkbox — Einwilligungs-/Consent-Feld nach docs/index.html („Forms").
 *
 * Bewusst KEIN nachgebautes Kästchen: ein natives `<input type="checkbox">` mit
 * `accent-color` in der Bereichsfarbe (genau wie die Doku), umschlossen von einem
 * `<label>` mit dem Einwilligungstext und optional verlinktem Datenschutzhinweis.
 * Dokumentierte Verwendung: Newsletter-/DSGVO-Einwilligung, i. d. R. `required`.
 */
@Component({
  selector: 'cds-checkbox',
  standalone: true,
  template: `
    <label style="display:flex;align-items:flex-start;gap:var(--s3);cursor:pointer">
      <input
        type="checkbox"
        [checked]="checked"
        [disabled]="disabled"
        [attr.required]="required ? '' : null"
        [attr.aria-required]="required ? 'true' : null"
        [style.accent-color]="'var(--' + area + '-500)'"
        style="width:18px;height:18px;margin-top:2px;flex-shrink:0;cursor:pointer"
      />
      <span style="font:var(--ty-body-md);color:var(--tx-secondary)"
        >{{ label }}@if (linkLabel) {&nbsp;<a class="body-link" [href]="linkHref">{{ linkLabel }}</a>}</span
      >
    </label>
  `,
})
export class CheckboxComponent {
  /** Einwilligungstext neben der Checkbox. */
  @Input() label = 'Ich bin einverstanden.';
  /** Optionaler verlinkter Hinweis am Ende des Labels (z. B. „Datenschutzhinweise"). */
  @Input() linkLabel = '';
  /** Ziel des verlinkten Hinweises. */
  @Input() linkHref = '#';
  /** Pflicht-Einwilligung → required + aria-required. */
  @Input() required = false;
  @Input() checked = false;
  @Input() disabled = false;
  /** Brand Area → accent-color der Checkbox. */
  @Input() area: CdsArea = 'co';
}
