import { Component, Input } from '@angular/core';

export interface CdsFooterLink {
  label: string;
  href: string;
}

/**
 * Footer — Wrapper um `.footer` aus css/components.css → „Footer".
 *
 * Zwei-Band-Layout: helles Main-Band (.footer-main, 3-Spalten-Grid aus Brand/
 * Adresse, Nav-Liste, Contentletter-Form) plus dunkler Bottom-Streifen
 * (.footer-btm) mit Copyright, Rechts-Links und Social-Icons. Konsumiert nur
 * bestehende Klassen; Social-Glyphen sind schlanke Inline-SVGs (currentColor),
 * da die Doku-Bildassets hier nicht eingebunden sind.
 */
@Component({
  selector: 'cds-footer',
  standalone: true,
  template: `
    <footer class="footer" aria-label="Seitenfuß">
      <div class="footer-main">
        <div class="footer-grid">
          <div>
            <div class="footer-brand">{{ brand }}</div>
            <address class="footer-address">
              <p [innerText]="address"></p>
              <p>
                Tel.: <a class="footer-link" [href]="telHref">{{ tel }}</a><br />E-Mail:
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

          <div>
            <h3 class="footer-htitle">{{ newsletterTitle }}</h3>
            <p class="footer-newsletter-desc">{{ newsletterDesc }}</p>
            <form class="footer-newsletter-form" aria-label="Contentletter-Anmeldung">
              <label class="footer-field">
                <span class="footer-field-label">Dein Vorname</span>
                <input type="text" placeholder="Maria" autocomplete="given-name" />
              </label>
              <label class="footer-field">
                <span class="footer-field-label"
                  >Deine E-Mail <span class="req" aria-hidden="true">*</span></span
                >
                <input
                  type="email"
                  placeholder="name@unternehmen.de"
                  aria-required="true"
                  autocomplete="email"
                  required
                />
              </label>
              <label class="footer-newsletter-consent">
                <input type="checkbox" required />
                <span>Einverstanden mit den <a class="body-link" href="#">Datenschutzhinweisen</a></span>
              </label>
              <button type="submit" class="btn btn-filled btn-co">Abonnieren</button>
            </form>
          </div>
        </div>
      </div>

      <div class="footer-btm">
        <span>{{ copyright }}</span>
        <nav aria-label="Rechtliche Hinweise" style="display:flex;gap:var(--s4);flex-wrap:wrap">
          @for (link of legalLinks; track link.label) {
            <a class="footer-btm-link" [href]="link.href">{{ link.label }}</a>
          }
        </nav>
        <nav class="footer-social" aria-label="Soziale Netzwerke">
          <a href="#" target="_blank" rel="noopener" aria-label="LinkedIn (neues Tab)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.96-1.8-2.96s-2.08 1.4-2.08 2.86V21h-4z"
              />
            </svg>
          </a>
          <a href="#" target="_blank" rel="noopener" aria-label="YouTube (neues Tab)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.77-1.77C19.3 5.1 12 5.1 12 5.1s-7.3 0-8.83.43A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.77 1.77C4.7 18.9 12 18.9 12 18.9s7.3 0 8.83-.43a2.5 2.5 0 0 0 1.77-1.77C23 15.2 23 12 23 12zM9.75 15.02V8.98L15 12z"
              />
            </svg>
          </a>
        </nav>
      </div>
    </footer>
  `,
})
export class FooterComponent {
  @Input() brand = 'Conciso GmbH';
  @Input() address = 'Pariser Bogen 7\n44269 Dortmund';
  @Input() tel = '+49 231 226175-0';
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
  @Input() newsletterTitle = 'Contentletter abonnieren';
  @Input() newsletterDesc = 'Alle drei Monate neue Beiträge direkt ins Postfach.';
  @Input() copyright = '© 2026 Conciso GmbH · Dortmund';
  @Input() legalLinks: CdsFooterLink[] = [
    { label: 'Datenschutz', href: '#' },
    { label: 'Impressum', href: '#' },
  ];

  get telHref(): string {
    return 'tel:' + this.tel.replace(/\s/g, '');
  }
}

