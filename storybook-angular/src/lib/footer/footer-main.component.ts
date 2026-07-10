import { Component, Input } from '@angular/core';

export interface CdsFooterLink {
  label: string;
  href: string;
}

/**
 * Footer — oberer Teil (`.footer-main`): helles 3-Spalten-Band mit Marken-Identität +
 * Adresse (inkl. Maps-Links, Tel/Fax/E-Mail), Nav-Liste und optionaler Contentletter-
 * Anmeldung. Die Host-Klasse `footer-main` trägt Hintergrund/Padding aus
 * css/components.css; `:host{display:block}` macht das Band auch standalone (außerhalb
 * von `<cds-footer>`) zum Block. Zusammen mit `cds-footer-bottom` in `<cds-footer>`
 * projiziert.
 */
@Component({
  selector: 'cds-footer-main',
  standalone: true,
  host: { class: 'footer-main' },
  styles: [':host{display:block}'],
  template: `
    <div class="footer-grid">
      <div>
        <div class="footer-brand">{{ brand }}</div>
        <address class="footer-address">
          <p [innerText]="address"></p>
          @if (mapsLinks.length) {
            <p class="footer-address-maps">
              @for (m of mapsLinks; track m.label; let last = $last) {
                <a class="footer-link" [href]="m.href" target="_blank" rel="noopener">{{ m.label }}</a
                >@if (!last) {<span aria-hidden="true">&nbsp;·&nbsp;</span>}
              }
            </p>
          }
          <p>
            Tel.: <a class="footer-link" [href]="telHref">{{ tel }}</a
            >@if (fax) {<br />Fax: {{ fax }}}<br />E-Mail:
            <a class="footer-link" [href]="'mailto:' + email">{{ email }}</a>
          </p>
        </address>
      </div>

      <div>
        <h3 class="footer-htitle">{{ navTitle }}</h3>
        <nav [attr.aria-label]="navTitle">
          <ul class="footer-nav-list">
            @for (link of navLinks; track link.label) {
              <li><a class="footer-link" [href]="link.href">{{ link.label }}</a></li>
            }
          </ul>
        </nav>
      </div>

      @if (showNewsletter) {
        <div>
          <h3 class="footer-htitle">{{ newsletterTitle }}</h3>
          <p class="footer-newsletter-desc">{{ newsletterDesc }}</p>
          <form class="footer-newsletter-form" [attr.aria-label]="newsletterTitle">
            <label class="footer-field">
              <span class="footer-field-label">{{ newsletterNameLabel }}</span>
              <input type="text" [placeholder]="newsletterNamePlaceholder" autocomplete="given-name" />
            </label>
            <label class="footer-field">
              <span class="footer-field-label"
                >{{ newsletterEmailLabel }} <span class="req" aria-hidden="true">*</span></span
              >
              <input
                type="email"
                [placeholder]="newsletterEmailPlaceholder"
                aria-required="true"
                autocomplete="email"
                required
              />
            </label>
            <label class="footer-newsletter-consent">
              <input type="checkbox" required />
              <span
                >{{ newsletterConsentText }}
                <a class="body-link" [href]="newsletterConsentLinkHref">{{ newsletterConsentLinkLabel }}</a></span
              >
            </label>
            <button type="submit" class="btn btn-filled btn-co">{{ newsletterSubmitLabel }}</button>
          </form>
        </div>
      }
    </div>
  `,
})
export class FooterMainComponent {
  @Input() brand = 'Conciso GmbH';
  @Input() address = 'Pariser Bogen 7\n44269 Dortmund';
  @Input() mapsLinks: CdsFooterLink[] = [
    {
      label: 'Google Maps',
      href: 'https://www.google.com/maps/place/Pariser+Bogen+7,+44269+Dortmund',
    },
    {
      label: 'OpenStreetMap',
      href: 'https://www.openstreetmap.org/search?query=Pariser+Bogen+7%2C+44269+Dortmund',
    },
    { label: 'Apple Karten', href: 'https://maps.apple.com/?address=Pariser+Bogen+7,44269+Dortmund' },
  ];
  @Input() tel = '+49 231 226175-0';
  @Input() fax = '+49 231 226175-10';
  @Input() email = 'info@conciso.de';
  @Input() navTitle = 'Wichtige Inhalte';
  @Input() navLinks: CdsFooterLink[] = [
    { label: 'Angewandte KI', href: '#' },
    { label: 'Effektive Software', href: '#' },
    { label: 'Wirksame Organisationen', href: '#' },
    { label: 'Beiträge', href: '#' },
    { label: 'Jobs', href: '#' },
    { label: 'Kontakt', href: '#' },
  ];

  /** Newsletter-Spalte anzeigen. */
  @Input() showNewsletter = true;
  @Input() newsletterTitle = 'Contentletter abonnieren';
  @Input() newsletterDesc = 'Alle drei Monate neue Beiträge direkt ins Postfach.';
  @Input() newsletterNameLabel = 'Dein Vorname';
  @Input() newsletterNamePlaceholder = 'Maria';
  @Input() newsletterEmailLabel = 'Deine E-Mail';
  @Input() newsletterEmailPlaceholder = 'name@unternehmen.de';
  @Input() newsletterConsentText = 'Einverstanden mit den';
  @Input() newsletterConsentLinkLabel = 'Datenschutzhinweisen';
  @Input() newsletterConsentLinkHref = '#';
  @Input() newsletterSubmitLabel = 'Abonnieren';

  get telHref(): string {
    return 'tel:' + this.tel.replace(/\s/g, '');
  }
}
