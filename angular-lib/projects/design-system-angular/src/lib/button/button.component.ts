import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import type { CdsArea } from '../area';

/**
 * Stil-Varianten des Buttons. `filled-on-band` ist der invertierte Filled-Button
 * für farbige Bereichs-Bänder (Doku: „On-Band-Modifier“) — er wird hier als
 * eigener Variant-Wert geführt statt als abhängiges Flag, da das Invertieren nur
 * in Kombination mit `filled` je sinnvoll ist.
 */
export type CdsButtonVariant = 'filled' | 'tonal' | 'elevated' | 'outlined' | 'text' | 'filled-on-band';
export type CdsButtonSize = 'sm' | 'md' | 'lg';
/**
 * Ton des Buttons. `err` markiert eine destruktive Aktion, die sich nicht rückgängig machen
 * lässt (Löschen, Verwerfen), und ersetzt dann die Bereichsfarbe. Kürzel wie bei `CdsSnackTone`.
 */
export type CdsButtonTone = 'def' | 'err';

/**
 * Button — dünner Angular-Wrapper um die bestehende `.btn`-CSS-Familie.
 *
 * Erfindet KEINE Styles: setzt ausschließlich die im Design System vorhandenen
 * Klassen (.btn, .btn-filled/.btn-tonal/.btn-elevated/.btn-outlined/.btn-text,
 * .btn-sm/.btn-lg, .btn-co/.btn-ki/.btn-es/.btn-wo, .btn-full, .btn-on-band)
 * zusammen. Siehe css/components.css → „Buttons“. Der Klick wird als `clicked`
 * ausgegeben (für Nutzung außerhalb reiner Formular-Submits).
 */
@Component({
  selector: 'cds-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // .btn-full setzt width:100% auf dem <button> — greift aber nur, wenn auch der
  // Host die Zeile füllt (Custom Elements sind display:inline und schrumpfen auf
  // Inhaltsbreite). Bei full=true daher den Host auf block stellen.
  host: { '[style.display]': "full() ? 'block' : null" },
  template: `
    <button [class]="classes()" [disabled]="disabled()" [attr.type]="type()" (click)="clicked.emit($event)">
      {{ label() }}
    </button>
  `,
})
export class ButtonComponent {
  /** Sichtbarer Text des Buttons. */
  readonly label = input('Button');
  /** Visuelle Variante → .btn-filled / .btn-tonal / .btn-elevated / .btn-outlined /
   *  .btn-text; `filled-on-band` → .btn-filled + .btn-on-band (invertiert). */
  readonly variant = input<CdsButtonVariant>('filled');
  /** Markenbereich → .btn-co / .btn-ki / .btn-es / .btn-wo. Wirkungslos bei `tone="err"`. */
  readonly area = input<CdsArea>('co');
  /** Ton → `err` setzt .btn-err (destruktive Aktion) statt der Bereichsklasse. */
  readonly tone = input<CdsButtonTone>('def');
  /** Größe → .btn-sm / (md = Default) / .btn-lg */
  readonly size = input<CdsButtonSize>('md');
  /** Volle Breite → .btn-full (Host wird block, damit 100% greifen). */
  readonly full = input(false);
  readonly disabled = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  /** Klick auf den Button (feuert nicht, wenn `disabled`). */
  readonly clicked = output<MouseEvent>();

  /** @internal */
  protected readonly classes = computed(() => {
    // filled-on-band = invertierter Filled-Button; rendert .btn-filled + .btn-on-band.
    const onBand = this.variant() === 'filled-on-band';
    // Ton ersetzt den Bereich, statt ihn zu überlagern: so hängt das Ergebnis nicht an der
    // Reihenfolge der Regeln in components.css und dark-mode.css.
    const color = this.tone() === 'err' ? 'err' : this.area();
    const cls = ['btn', `btn-${onBand ? 'filled' : this.variant()}`, `btn-${color}`];
    if (this.size() === 'sm') cls.push('btn-sm');
    if (this.size() === 'lg') cls.push('btn-lg');
    if (this.full()) cls.push('btn-full');
    if (onBand) cls.push('btn-on-band');
    return cls.join(' ');
  });
}
