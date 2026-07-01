import { Component, ElementRef, HostListener, Input, inject } from '@angular/core';

export interface CdsNavSubItem {
  label: string;
  href: string;
  current?: boolean;
}

export interface CdsNavItem {
  label: string;
  href?: string;
  current?: boolean;
  sub?: CdsNavSubItem[];
}

/**
 * Topnav — Wrapper um `.ep-topnav` aus css/components.css → „Topnav".
 *
 * Customer-Navigation: Logo, Top-Level-Links mit optionalem Klapp-Submenü
 * (.ep-nav-has-sub / .ep-nav-sub, aria-expanded), rechts gebündelte Aktionen
 * (Such-Popover .ep-nav-search + Theme-Umschalter .ep-nav-theme-toggle) und ein
 * CTA-Button. Disclosure-Logik in Angular: nur ein Menü offen, Escape und
 * Außenklick schließen. Der Theme-Button setzt data-theme am <html> (dark-mode.css).
 */
@Component({
  selector: 'cds-topnav',
  standalone: true,
  template: `
    <header [class]="navClasses">
      <a class="ep-logo" href="#" (click)="$event.preventDefault()">{{ logo }}</a>

      <nav class="ep-nav-links" aria-label="Hauptnavigation">
        @for (item of links; track item.label; let i = $index) {
          @if (item.sub?.length) {
            <div class="ep-nav-item ep-nav-has-sub" [class.is-open]="openIndex === i">
              <button
                class="ep-nav-btn ep-nav-item-toggle"
                type="button"
                [attr.aria-expanded]="openIndex === i"
                (click)="toggleSub(i)"
              >
                {{ item.label }}
                <svg class="ep-nav-item-caret" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m2 4 3 3 3-3" />
                </svg>
              </button>
              <div class="ep-nav-sub">
                @for (s of item.sub; track s.label) {
                  <a class="ep-nav-sub-btn" [href]="s.href" [attr.aria-current]="s.current ? 'page' : null" (click)="closeAll()">
                    {{ s.label }}
                  </a>
                }
              </div>
            </div>
          } @else {
            <a class="ep-nav-btn" [href]="item.href || '#'" [attr.aria-current]="item.current ? 'page' : null">
              {{ item.label }}
            </a>
          }
        }
      </nav>

      <div class="ep-nav-actions">
        <div class="ep-nav-search" [class.is-open]="searchOpen">
          <button
            class="ep-nav-icon-btn ep-nav-search-toggle"
            type="button"
            aria-label="Suche"
            [attr.aria-expanded]="searchOpen"
            (click)="toggleSearch()"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
            </svg>
          </button>
          <div class="ep-nav-search-pop">
            <form class="ep-nav-search-form" role="search" (submit)="$event.preventDefault()">
              <input class="ep-nav-search-input" type="search" placeholder="Suche …" aria-label="Suchbegriff" />
            </form>
          </div>
        </div>

        <button
          class="ep-nav-icon-btn ep-nav-theme-toggle"
          type="button"
          aria-label="Hell/Dunkel umschalten"
          (click)="toggleTheme()"
        >
          <svg class="ep-nav-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
          </svg>
          <svg class="ep-nav-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2m0 14v2M5.6 5.6l1.4 1.4m10 10 1.4 1.4M3 12h2m14 0h2M5.6 18.4 7 17m10-10 1.4-1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />
          </svg>
        </button>
      </div>

      <a class="btn btn-filled btn-co" href="#" (click)="$event.preventDefault()">{{ ctaLabel }}</a>
    </header>
  `,
})
export class TopnavComponent {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  @Input() logo = 'conciso.';
  @Input() ctaLabel = 'Kontakt';
  @Input() links: CdsNavItem[] = [
    {
      label: 'Leistungen',
      sub: [
        { label: 'Angewandte KI', href: '#', current: true },
        { label: 'Effektive Software', href: '#' },
        { label: 'Wirksame Organisationen', href: '#' },
      ],
    },
    {
      label: 'Unternehmen',
      sub: [
        { label: 'Über uns', href: '#' },
        { label: 'Team', href: '#' },
        { label: 'Jobs', href: '#' },
      ],
    },
    { label: 'Beiträge', href: '#' },
    { label: 'Kontakt', href: '#', current: true },
  ];

  protected openIndex = -1;
  protected searchOpen = false;

  protected readonly navClasses = 'ep-topnav';

  toggleSub(i: number): void {
    this.openIndex = this.openIndex === i ? -1 : i;
    this.searchOpen = false;
  }

  toggleSearch(): void {
    this.searchOpen = !this.searchOpen;
    this.openIndex = -1;
  }

  closeAll(): void {
    this.openIndex = -1;
    this.searchOpen = false;
  }

  toggleTheme(): void {
    const root = document.documentElement;
    if (root.getAttribute('data-theme') === 'dark') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', 'dark');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) this.closeAll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeAll();
  }
}
