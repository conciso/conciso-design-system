import { Component, input, signal } from '@angular/core';

/**
 * CodeBlock — Wrapper um `.cb-wrap` aus css/components.css → „Code-Block".
 *
 * Header mit Sprach-Label (.cb-lang) und optionalem Kopier-Button (.cb-copy),
 * darunter der Code in `pre.cb-body` (white-space:pre, horizontal scrollbar).
 * Optionale Terminal-Variante (.cb-terminal). Syntax-Highlighting-Spans
 * (.k/.v/.s/…) werden hier bewusst nicht gesetzt — der Code bleibt Klartext.
 */
@Component({
  selector: 'cds-code-block',
  standalone: true,
  template: `
    <div [class]="wrapClasses">
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
  readonly lang = input('HTML');
  readonly code = input('<button class="btn btn-filled btn-co">Kontakt</button>');
  /** Terminal-Optik → .cb-terminal. */
  readonly terminal = input(false);
  /** Kopier-Button anzeigen (.cb-copy). */
  readonly copyable = input(true);

  protected readonly copied = signal(false);

  get wrapClasses(): string {
    return this.terminal() ? 'cb-wrap cb-terminal' : 'cb-wrap';
  }

  copy(): void {
    void navigator.clipboard?.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    });
  }
}
