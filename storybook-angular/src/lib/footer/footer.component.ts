import { Component, Input } from '@angular/core';

export interface CdsFooterLink {
  label: string;
  href: string;
}

/** Built-in-Plattformen mit verifiziertem Icon. Weitere über `iconPath` möglich. */
export type CdsSocialPlatform = 'linkedin' | 'youtube';

export interface CdsSocialLink {
  href: string;
  /** Built-in-Plattform (bringt Icon + Label mit). */
  platform?: CdsSocialPlatform;
  /** Aria-Label; Default: das Label der Plattform. */
  label?: string;
  /** Eigenes SVG-Pfad-`d` (viewBox 0 0 24, weiß) — für Plattformen ohne Built-in. */
  iconPath?: string;
}

/**
 * Footer — Wrapper um `.footer` aus css/components.css → „Footer".
 *
 * Zwei-Band-Layout: helles Main-Band (.footer-main, 3-Spalten-Grid aus Brand/
 * Adresse inkl. Maps-Links + Fax, Nav-Liste, Contentletter-Form) plus dunkler
 * Bottom-Streifen (.footer-btm) mit Copyright, Rechts-Links und Social-Icons.
 * Konsumiert nur bestehende Klassen; Social-Glyphen sind schlanke Inline-SVGs in
 * Weiß (wie die -light-Logo-Assets der Doku), da die Bildassets hier nicht
 * eingebunden sind.
 *
 * Alle Inhalte sind über Inputs konfigurierbar; die Newsletter-Spalte lässt sich
 * per `showNewsletter` ausblenden, Social-Links über `socialLinks` (Built-in-Icon
 * via `platform` oder eigenes `iconPath`).
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
              @if (mapsLinks.length) {
                <p class="footer-address-maps">
                  @for (m of mapsLinks; track m.label; let last = $last) {
                    <a
                      class="footer-link"
                      [href]="m.href"
                      target="_blank"
                      rel="noopener"
                      >{{ m.label }}</a
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
      </div>

      <div class="footer-btm">
        <span>{{ copyright }}</span>
        <nav aria-label="Rechtliche Hinweise" style="display:flex;gap:var(--s4);flex-wrap:wrap">
          @for (link of legalLinks; track link.label) {
            <a class="footer-btm-link" [href]="link.href">{{ link.label }}</a>
          }
        </nav>
        @if (socialLinks.length) {
          <!-- Glyphen explizit weiß (fill="#fff") wie die -light-Logo-Assets der Doku:
               currentColor würde die Link-/n-300-Farbe erben (LinkedIn erschiene blau). -->
          <nav class="footer-social" aria-label="Soziale Netzwerke">
            @for (s of socialLinks; track $index) {
              <a [href]="s.href" target="_blank" rel="noopener" [attr.aria-label]="socialLabel(s) + ' (neues Tab)'">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                  <path [attr.d]="socialPath(s)" />
                </svg>
              </a>
            }
          </nav>
        }
      </div>
    </footer>
  `,
})
export class FooterComponent {
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

  @Input() copyright = '© 2026 Conciso GmbH · Dortmund';
  @Input() legalLinks: CdsFooterLink[] = [
    { label: 'Datenschutz', href: '#' },
    { label: 'Impressum', href: '#' },
  ];
  @Input() socialLinks: CdsSocialLink[] = [
    { platform: 'linkedin', href: '#' },
    { platform: 'youtube', href: '#' },
  ];

  /** Verifizierte Built-in-Social-Icons (viewBox 0 0 24, weiß). */
  private readonly socialIcons: Record<CdsSocialPlatform, { d: string; label: string }> = {
    linkedin: {
      label: 'LinkedIn',
      d: 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3 0-2.96-1.8-2.96s-2.08 1.4-2.08 2.86V21h-4z',
    },
    youtube: {
      label: 'YouTube',
      d: 'M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.77-1.77C19.3 5.1 12 5.1 12 5.1s-7.3 0-8.83.43A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.77 1.77C4.7 18.9 12 18.9 12 18.9s7.3 0 8.83-.43a2.5 2.5 0 0 0 1.77-1.77C23 15.2 23 12 23 12zM9.75 15.02V8.98L15 12z',
    },
  };

  protected socialPath(s: CdsSocialLink): string {
    return s.iconPath ?? (s.platform ? this.socialIcons[s.platform].d : '');
  }
  protected socialLabel(s: CdsSocialLink): string {
    return s.label ?? (s.platform ? this.socialIcons[s.platform].label : '');
  }

  get telHref(): string {
    return 'tel:' + this.tel.replace(/\s/g, '');
  }
}
