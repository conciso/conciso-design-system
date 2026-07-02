import { Component, Input } from '@angular/core';
import type { CdsArea } from '../area';

export type CdsButtonVariant = 'filled' | 'tonal' | 'elevated' | 'outlined' | 'text';
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
  /** Visuelle Variante → .btn-filled / .btn-tonal / .btn-elevated / .btn-outlined / .btn-text */
  @Input() variant: CdsButtonVariant = 'filled';
  /** Markenbereich → .btn-co / .btn-ki / .btn-es / .btn-wo */
  @Input() area: CdsArea = 'co';
  /** Größe → .btn-sm / (md = Default) / .btn-lg */
  @Input() size: CdsButtonSize = 'md';
  /** Volle Breite → .btn-full (Host wird block, damit 100% greifen). */
  @Input() full = false;
  /** Invertiert für farbige Bereichs-Bänder → .btn-on-band. Nur in Kombination
   *  mit variant="filled" definiert (so auch durchgängig in der Doku); bei allen
   *  anderen Varianten wird der Wert ignoriert. */
  @Input() onBand = false;
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  get classes(): string {
    const cls = ['btn', `btn-${this.variant}`, `btn-${this.area}`];
    if (this.size === 'sm') cls.push('btn-sm');
    if (this.size === 'lg') cls.push('btn-lg');
    if (this.full) cls.push('btn-full');
    if (this.onBand && this.variant === 'filled') cls.push('btn-on-band');
    return cls.join(' ');
  }
}
