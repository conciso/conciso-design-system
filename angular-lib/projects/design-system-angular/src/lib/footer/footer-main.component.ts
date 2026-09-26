import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Footer — oberer Teil (`.footer-main`): helles Band als **generisches Spalten-Layout**.
 * Der Inhalt wird als beliebige Spalten projiziert (jedes Top-Level-Kind = eine
 * Grid-Spalte), statt fester Adresse/Nav/Newsletter-Struktur — so eignet es sich für
 * Website- UND App-Footer ohne Marketing-Lock-in.
 *
 * ```html
 * <cds-footer-main>
 *   <div>…Spalte 1…</div>
 *   <div>…Spalte 2…</div>
 * </cds-footer-main>
 * ```
 *
 * Die Host-Klasse `footer-main` trägt Hintergrund/Padding aus css/components.css;
 * `:host{display:block}` macht das Band auch standalone zum Block. Spaltenanzahl/-breiten
 * über `columns` (grid-template-columns); ohne Angabe gilt das 3-Spalten-Default.
 *
 * Verwendungsguidance dieser Gruppe: siehe Footer, Komplett (`komponenten-footer-komplett--verwendung`).
 */
@Component({
  selector: 'cds-footer-main',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'footer-main' },
  styles: [':host{display:block}'],
  template: `
    <div class="footer-grid" [style.grid-template-columns]="columns() || null">
      <ng-content></ng-content>
    </div>
  `,
})
export class FooterMainComponent {
  /**
   * Optionale `grid-template-columns` (z. B. `'repeat(4, 1fr)'` oder `'2fr 1fr'`).
   * Ohne Angabe gilt das Default aus `.footer-grid` (1.2fr 1fr 1.3fr, 3 Spalten).
   */
  readonly columns = input<string>();
}
