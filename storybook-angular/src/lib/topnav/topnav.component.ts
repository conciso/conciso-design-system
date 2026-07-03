import { Component, ElementRef, HostListener, Input, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown, heroMagnifyingGlass } from '@ng-icons/heroicons/outline';
import { ThemeCycleComponent } from '../theme-switch/cycle-button.component';

/** Eindeutige IDs je Topnav-Instanz (Such-Feld ↔ sr-only-Label). */
let cdsTopnavUid = 0;

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
 * (Such-Popover .ep-nav-search + Theme-Cycle-Button) und ein CTA-Button.
 * Disclosure-Logik in Angular: nur ein Menü offen, Escape und Außenklick schließen.
 *
 * Der Theme-Umschalter ist fest der Cycle-Button (cds-theme-cycle); ob er auch
 * „System" anbietet, steuert `showSystemTheme` (durchgereicht an dessen showSystem).
 */
@Component({
  selector: 'cds-topnav',
  standalone: true,
  imports: [ThemeCycleComponent, NgIcon],
  viewProviders: [provideIcons({ heroChevronDown, heroMagnifyingGlass })],
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
                <ng-icon class="ep-nav-item-caret" name="heroChevronDown" size="10px" aria-hidden="true" />
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
            <ng-icon name="heroMagnifyingGlass" size="22px" aria-hidden="true" />
          </button>
          <div class="ep-nav-search-pop">
            <form class="ep-nav-search-form" role="search" (submit)="$event.preventDefault()">
              <label class="sr-only" [attr.for]="searchId">Suchbegriff</label>
              <input
                class="ep-nav-search-input"
                [id]="searchId"
                type="search"
                placeholder="Wonach suchst Du?"
                autocomplete="off"
              />
              <button class="btn btn-filled btn-sm btn-co" type="submit">Suchen</button>
            </form>
          </div>
        </div>

        <cds-theme-cycle [showSystem]="showSystemTheme" />
      </div>

      <a class="btn btn-filled btn-sm btn-co" href="#" (click)="$event.preventDefault()">{{ ctaLabel }}</a>
    </header>
  `,
})
export class TopnavComponent {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);

  protected readonly searchId = `cds-topnav-search-${++cdsTopnavUid}`;

  @Input() logo = 'conciso.';
  @Input() ctaLabel = 'Kontakt';
  /** Bietet der Theme-Cycle-Button im Header auch „System" an (tri) oder nur Hell/Dunkel? */
  @Input() showSystemTheme = true;
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.host.nativeElement.contains(event.target as Node)) this.closeAll();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeAll();
  }
}
