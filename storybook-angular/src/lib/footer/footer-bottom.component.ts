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
 * Footer — unterer Teil (`.footer-btm`): dunkler Streifen mit Copyright, Rechts-Links
 * und Social-Profilen. Die Host-Klasse `footer-btm` trägt Hintergrund/Flex-Layout aus
 * css/components.css. Social-Glyphen sind schlanke Inline-SVGs in Weiß; verifizierte
 * Built-in-Icons (linkedin, youtube) via `platform`, beliebige weitere via `iconPath`.
 */
@Component({
  selector: 'cds-footer-bottom',
  standalone: true,
  host: { class: 'footer-btm' },
  template: `
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
  `,
})
export class FooterBottomComponent {
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
}
