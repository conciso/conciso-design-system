import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import type { CdsIconEntry } from '@conciso/design-system/icons';

/**
 * Rendert ein DS-eigenes Glyph aus `@conciso/design-system/icons` (Objekt mit `viewBox` und
 * `body`) als `<svg [cdsGlyph]="uiCaretDown" [size]="10">`.
 *
 * Intern, NICHT Teil der `public-api.ts`; Komponenten beziehen es über `./cds-icons`.
 * Warum nicht `[lucideIcon]`: dessen Icon-Daten sind ein Element-Baum mit fest quadratischer
 * viewBox (`0 0 size size`) — das Markup der DS-Glyphen (String-`body`, 10er-/12er-viewBox)
 * müsste erst geparst werden.
 *
 * Der `body` stammt aus Build-Konstanten des DS-Pakets (nie aus Nutzereingaben); deshalb ist
 * `bypassSecurityTrustHtml` hier vertretbar (gleiches Muster wie card/blockquote).
 * Dekorativ: `aria-hidden`, nicht fokussierbar.
 */
@Component({
  selector: 'svg[cdsGlyph]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    xmlns: 'http://www.w3.org/2000/svg',
    fill: 'none',
    'aria-hidden': 'true',
    focusable: 'false',
    '[attr.viewBox]': 'glyph().viewBox',
    '[attr.width]': 'size()',
    '[attr.height]': 'size()',
  },
  template: `<svg:g [innerHTML]="body()"></svg:g>`,
})
export class CdsGlyphComponent {
  /** DS-Glyph (benannter Export aus `@conciso/design-system/icons`). */
  readonly glyph = input.required<Pick<CdsIconEntry, 'viewBox' | 'body'>>({ alias: 'cdsGlyph' });
  /** Kantenlänge in px (width = height). */
  readonly size = input.required<number>();

  private readonly sanitizer = inject(DomSanitizer);
  /** @internal */
  protected readonly body = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.glyph().body),
  );
}
