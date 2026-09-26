import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';

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
 * - `aria-label="Code kopieren"` auf dem Kopier-Button ist **stabil** und wechselt nach
 *   dem Klick nicht mehr. Ein Bedienelement trägt den Namen seiner Funktion, nicht den
 *   seines letzten Ereignisses — sonst findet man den Button per Sprachsteuerung danach
 *   nicht mehr, und eine Elementliste zeigt einen Button „Code kopiert“, der tatsächlich
 *   kopiert. Die Erfolgsmeldung läuft stattdessen über eine eigene, visuell versteckte
 *   Live-Region (`.sr-only` + `role="status"`, Muster aus `snackbar.component.ts`), die
 *   von Anfang an im DOM steht und nur ihren Textinhalt wechselt: `aria-live` beobachtet
 *   Inhalts-, keine Attribut-Änderungen, und eine Region, die erst beim Klick entsteht,
 *   kündigt bei vielen Screenreadern nichts an. Zusätzlich verhalten sich Live-Regionen
 *   auf dem gerade fokussierten Element (hier: der Button nach dem Klick) uneinheitlich.
 *   Der sichtbare Button-Text wechselt weiterhin „Kopieren“ ↔ „Kopiert!“, ist aber durch
 *   `aria-label` für die Namensberechnung überschrieben und rein optisches Feedback.
 */
@Component({
  selector: 'cds-code-block',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div [class]="wrapClasses()">
      <div class="cb-header">
        <span class="cb-lang">{{ lang() }}</span>
        @if (copyable()) {
          <button class="cb-copy" type="button" aria-label="Code kopieren" (click)="copy()">
            {{ copied() ? 'Kopiert!' : 'Kopieren' }}
          </button>
          <!-- Steht von Anfang an im DOM (nicht erst ab dem ersten Klick erzeugt), sonst
               kündigen viele Screenreader die erste Statusänderung gar nicht an. -->
          <span class="sr-only" role="status" aria-live="polite">{{ copyStatus() }}</span>
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
  protected readonly wrapClasses = computed(() =>
    this.terminal() ? 'cb-wrap cb-terminal' : 'cb-wrap',
  );

  /**
   * Text der Live-Region (`role="status"`) neben dem Button. Leer im Ruhezustand, damit
   * ein erneuter Klick nach Ablauf des Reset-Timers wieder von „“ auf „Code kopiert.“
   * wechselt und so erneut als Änderung erkannt und angekündigt wird.
   *
   * @internal
   */
  protected readonly copyStatus = computed(() => (this.copied() ? 'Code kopiert.' : ''));

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
