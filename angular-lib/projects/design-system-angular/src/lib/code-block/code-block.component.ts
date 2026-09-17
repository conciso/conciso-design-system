import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, signal } from '@angular/core';

/**
 * CodeBlock — Wrapper um `.cb-wrap` aus css/components.css → „Code-Block“.
 *
 * Header mit Sprach-Label (.cb-lang) und optionalem Kopier-Button (.cb-copy),
 * darunter der Code in `pre.cb-body` (white-space:pre, horizontal scrollbar).
 * Optionale Terminal-Variante (.cb-terminal). Syntax-Highlighting-Spans
 * (.k/.v/.s/…) werden hier bewusst nicht gesetzt — der Code bleibt Klartext.
 */
@Component({
  selector: 'cds-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapClasses()">
      <div class="cb-header">
        <span class="cb-lang">{{ lang() }}</span>
        @if (copyable()) {
          <button class="cb-copy" type="button" (click)="copy()">
            {{ copied() ? 'Kopiert!' : 'Kopieren' }}
          </button>
        }
      </div>
      <pre class="cb-body">{{ code() }}</pre>
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

  /** @internal */
  copy(): void {
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
