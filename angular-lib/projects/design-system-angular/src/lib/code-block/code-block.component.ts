import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, signal } from '@angular/core';

/**
 * CodeBlock — Wrapper um `.cb-wrap` aus css/components.css → „Code-Block“.
 *
 * Header mit Sprach-Label (.cb-lang) und optionalem Kopier-Button (.cb-copy),
 * darunter der Code in `pre.cb-body` (white-space:pre, horizontal scrollbar).
 * Optionale Terminal-Variante (.cb-terminal). Syntax-Highlighting-Spans
 * (.k/.v/.s/…) werden hier bewusst nicht gesetzt — der Code bleibt Klartext.
 *
 * A11y (siehe docs/komponenten/code-block-verwendung.mdx, Abschnitt „Barrierefreiheit“):
 * - `<code>` im `<pre>` als semantisches Grundgerüst, damit Screenreader den Inhalt
 *   als „Code“ ankündigen. `.cb-body code{font:inherit}` in components.css fängt den
 *   Browser-Default (`code{font-family:monospace}`) ab, sonst würde das verschachtelte
 *   `<code>` eine andere Schrift als der Rest des Blocks zeigen.
 * - `tabindex="0"` auf `pre.cb-body`, weil der Block bei langen Zeilen horizontal
 *   scrollt und sonst per Tastatur nicht erreichbar wäre.
 * - `aria-label` auf dem Kopier-Button, weil der sichtbare Text „Kopieren“ allein kein
 *   Ziel nennt; `aria-live="polite"` direkt am Button, damit der Label-Wechsel nach dem
 *   Kopieren („Code kopiert“) auch vorgelesen wird, ohne eine zusätzliche Live-Region
 *   einzuführen.
 */
@Component({
  selector: 'cds-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapClasses()">
      <div class="cb-header">
        <span class="cb-lang">{{ lang() }}</span>
        @if (copyable()) {
          <button
            class="cb-copy"
            type="button"
            [attr.aria-label]="copyLabel()"
            aria-live="polite"
            (click)="copy()"
          >
            {{ copied() ? 'Kopiert!' : 'Kopieren' }}
          </button>
        }
      </div>
      <pre class="cb-body" tabindex="0"><code>{{ code() }}</code></pre>
    </div>
  `,
})
export class CodeBlockComponent {
  /** Sprach-Label im Header (.cb-lang), rein informativ, ohne Syntax-Highlighting. */
  readonly lang = input('HTML');
  /** Anzuzeigender Code (Klartext, `pre`-formatiert). */
  readonly code = input.required<string>();
  /** Terminal-Optik → .cb-terminal. */
  readonly terminal = input(false);
  /** Kopier-Button anzeigen (.cb-copy). */
  readonly copyable = input(true);

  /** @internal */
  protected readonly copied = signal(false);

  private readonly destroyRef = inject(DestroyRef);
  /** Reset-Timer des „Kopiert!“-Feedbacks; gemerkt, um ihn zu clearen. */
  private resetTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    // Verhindert, dass der Reset-Callback nach dem Zerstören der Komponente feuert.
    this.destroyRef.onDestroy(() => this.clearResetTimer());
  }

  /** @internal */
  protected readonly wrapClasses = computed(() => (this.terminal() ? 'cb-wrap cb-terminal' : 'cb-wrap'));

  /**
   * Accessible Name des Kopier-Buttons, vor und nach dem Kopieren.
   *
   * @internal
   */
  protected readonly copyLabel = computed(() => (this.copied() ? 'Code kopiert' : 'Code kopieren'));

  /** @internal */
  protected copy(): void {
    // Clipboard-API gibt es nur in sicheren Kontexten (https/localhost). Fehlt sie,
    // brechen wir sauber ab, statt über optional chaining still ins Leere zu laufen.
    if (!navigator.clipboard) return;
    navigator.clipboard
      .writeText(this.code())
      .then(() => {
        this.copied.set(true);
        // Vor dem erneuten Arm-en clearen → schnelle Wiederholklicks stapeln keine Timer.
        this.clearResetTimer();
        this.resetTimer = setTimeout(() => this.copied.set(false), 1500);
      })
      .catch(() => {
        /* Schreiben abgelehnt (z. B. fehlende Berechtigung) → kein Feedback. */
      });
  }

  private clearResetTimer(): void {
    if (this.resetTimer !== undefined) {
      clearTimeout(this.resetTimer);
      this.resetTimer = undefined;
    }
  }
}
