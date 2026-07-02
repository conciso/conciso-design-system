import { Component, Input } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Stil-Varianten des Buttons. `filled-on-band` ist der invertierte Filled-Button
 * für farbige Bereichs-Bänder (Doku: „On-Band-Modifier") — er wird hier als
 * eigener Variant-Wert geführt statt als abhängiges Flag, da das Invertieren nur
 * in Kombination mit `filled` je sinnvoll ist.
 */
export type CdsButtonVariant = 'filled' | 'tonal' | 'elevated' | 'outlined' | 'text' | 'filled-on-band';
export type CdsButtonSize = 'sm' | 'md' | 'lg';

/**
 * Button — dünner Angular-Wrapper um die bestehende `.btn`-CSS-Familie.
 *
 * Erfindet KEINE Styles: setzt ausschließlich die im Design System vorhandenen
 * Klassen (.btn, .btn-filled/.btn-tonal/.btn-elevated/.btn-outlined/.btn-text,
 * .btn-sm/.btn-lg, .btn-co/.btn-ki/.btn-es/.btn-wo, .btn-full, .btn-on-band)
 * zusammen. Siehe css/components.css → „Buttons".
 */
@Component({
  selector: 'cds-button',
  standalone: true,
  // .btn-full setzt width:100% auf dem <button> — greift aber nur, wenn auch der
  // Host die Zeile füllt (Custom Elements sind display:inline und schrumpfen auf
  // Inhaltsbreite). Bei full=true daher den Host auf block stellen.
  host: { '[style.display]': "full ? 'block' : null" },
  template: `
    <button [class]="classes" [disabled]="disabled" [attr.type]="type">
      {{ label }}
    </button>
  `,
})
export class ButtonComponent {
  /** Sichtbarer Text des Buttons. */
  @Input() label = 'Button';
  /** Visuelle Variante → .btn-filled / .btn-tonal / .btn-elevated / .btn-outlined /
   *  .btn-text; `filled-on-band` → .btn-filled + .btn-on-band (invertiert). */
  @Input() variant: CdsButtonVariant = 'filled';
  /** Markenbereich → .btn-co / .btn-ki / .btn-es / .btn-wo */
  @Input() area: CdsArea = 'co';
  /** Größe → .btn-sm / (md = Default) / .btn-lg */
  @Input() size: CdsButtonSize = 'md';
  /** Volle Breite → .btn-full (Host wird block, damit 100% greifen). */
  @Input() full = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  get classes(): string {
    // filled-on-band = invertierter Filled-Button; rendert .btn-filled + .btn-on-band.
    const onBand = this.variant === 'filled-on-band';
    const cls = ['btn', `btn-${onBand ? 'filled' : this.variant}`, `btn-${this.area}`];
    if (this.size === 'sm') cls.push('btn-sm');
    if (this.size === 'lg') cls.push('btn-lg');
    if (this.full) cls.push('btn-full');
    if (onBand) cls.push('btn-on-band');
    return cls.join(' ');
  }
}
