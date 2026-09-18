import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import type { CdsArea } from '../area';
import { CDS_QUOTE_ICON } from '../icons';

/**
 * Blockquote — Wrapper um `.bq` aus css/components.css → „Blockquote“.
 *
 * Bereichsgefärbtes Zitat mit linker Akzentleiste und getöntem Grund (data-area),
 * Quote-Icon (ui-quote, dieselbe Glyphe wie docs/index.html), Zitat und
 * Caption (Name/Rolle). Nur bestehende Klassen.
 *
 * **Nicht `cds-article-pullquote` (`.article-pullquote`).** Dieses Bauteil ist
 * ein eigenständiges Zitat: eine dritte, benannte Person (`name`/`roleLabel` sind
 * Pflicht), mit getönter Akzent-Box und Quote-Icon. `cds-article-pullquote` ist
 * dagegen ein typografischer Akzent im eigenen Lauftext eines Wissensbeitrags,
 * ohne Attribution, ohne Box, ohne Icon — der Autor zitiert dort einen Satz aus
 * dem eigenen Text, nicht eine dritte Stimme. Volle Abgrenzung samt Tabelle in
 * dessen Klassendoku (`article-pullquote.component.ts`).
 */
@Component({
  selector: 'cds-blockquote',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <figure class="bq" [attr.data-area]="area() || null">
      <svg class="bq-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" [innerHTML]="quoteIcon()"></svg>
      <blockquote>{{ quote() }}</blockquote>
      @if (name() || roleLabel()) {
        <figcaption class="bq-caption">
          @if (name()) {
            <span class="bq-name">{{ name() }}</span>
          }
          @if (roleLabel()) {
            <span class="bq-role">{{ roleLabel() }}</span>
          }
        </figcaption>
      }
    </figure>
  `,
})
export class BlockquoteComponent {
  private readonly sanitizer = inject(DomSanitizer);

  /** Zitattext. */
  readonly quote = input.required<string>();
  /** Name der zitierten Person. */
  readonly name = input.required<string>();
  /** Rolle/Funktion der zitierten Person (leer = keine Caption-Zeile dafür). */
  readonly roleLabel = input('');
  /** Markenbereich → data-area (Akzentleiste + getönter Grund). */
  readonly area = input<CdsArea>('co');

  /**
   * Zitat-Icon aus der zentralen Icon-Registry (icons.ts) statt dreifach
   * dupliziertem SVG-Pfad in Blockquote/Testimonial/TeamVoice.
   *
   * @internal
   */
  protected readonly quoteIcon = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(CDS_QUOTE_ICON.body),
  );
}
