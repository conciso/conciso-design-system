import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, input, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars3, heroMagnifyingGlass, heroXMark, uiCaretDown } from '../icons/cds-icons';
import { ThemeCycleComponent } from '../theme-switch/cycle-button.component';

/** Eindeutige IDs je Topnav-Instanz (Such-Feld ↔ sr-only-Label). */
let cdsTopnavUid = 0;

export interface CdsNavSubItem {
  label: string;
  href: string;
}

export interface CdsNavItem {
  label: string;
  href?: string;
  sub?: CdsNavSubItem[];
}

/**
 * Topnav — Wrapper um `.ep-topnav` aus css/components.css → „Topnav“.
 *
 * Customer-Navigation: Logo, Top-Level-Links mit optionalem Klapp-Submenü
 * (.ep-nav-has-sub / .ep-nav-sub, aria-expanded), rechts gebündelte Aktionen
 * (Such-Popover .ep-nav-search + Theme-Cycle-Button) und ein CTA-Button.
 * Disclosure-Logik in Angular: nur ein Menü offen, Escape und Außenklick schließen.
 *
 * Der Theme-Umschalter ist fest der Cycle-Button (cds-theme-cycle); ob er auch
 * „System“ anbietet, steuert `showSystemTheme` (durchgereicht an dessen showSystem).
 */
@Component({
  selector: 'cds-topnav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ThemeCycleComponent, NgIcon],
  viewProviders: [provideIcons({ heroBars3, heroMagnifyingGlass, heroXMark, uiCaretDown })],
  // ng-icon rendert sein <svg> inline (vertical-align:baseline) → im 24px-Toggle säße der
  // 10px-Caret zu tief. Host auf Flex stellen zentriert das SVG unabhängig von der Baseline.
  // Wirkt nur hier (emulated); die portable .ep-nav-item-caret aus components.css bleibt unberührt.
  styles: `.ep-nav-item-caret { display: inline-flex; align-items: center; justify-content: center; }`,
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'onEscape()',
  },
  template: `
    <header class="ep-topnav" [class.nav-open]="navOpen()">
      <a class="ep-logo" href="#" (click)="$event.preventDefault()">
        @if (logoSrc()) {
          <!-- Größe (24px) + Theme-Swap kommen aus der portablen css/components.css
               (.ep-logo img, .logo-themed-default/-light via [data-theme]). -->
          <img [class.logo-themed-default]="!!logoDarkSrc()" [src]="logoSrc()" [alt]="logoAlt() || logo()" />
          @if (logoDarkSrc()) {
            <img class="logo-themed-light" [src]="logoDarkSrc()" [alt]="logoAlt() || logo()" />
          }
        } @else {
          {{ logo() }}
        }
      </a>

      <nav class="ep-nav-links" [id]="navId" aria-label="Hauptnavigation">
        @for (item of links(); track $index; let i = $index) {
          @if (item.sub?.length) {
            <div class="ep-nav-item ep-nav-has-sub" [class.is-open]="openIndex() === i">
              <!-- Label = eigener Link (führt z. B. auf eine Übersichtsseite), NICHT der Toggle.
                   Der Caret ist ein separater Button daneben — so wie in der portablen Vorlage
                   (docs/index.html). Ohne href bleibt es ein Platzhalter-Link (#, kein Sprung). -->
              <a
                class="ep-nav-btn"
                [href]="item.href || '#'"
                [attr.aria-current]="item.href && item.href === activeHref() ? 'page' : null"
                (click)="item.href || $event.preventDefault()"
              >
                {{ item.label }}
              </a>
              <button
                class="ep-nav-item-toggle"
                type="button"
                [attr.aria-label]="'Untermenü ' + item.label"
                [attr.aria-expanded]="openIndex() === i"
                [attr.aria-controls]="subId(i)"
                (click)="toggleSub(i)"
              >
                <ng-icon class="ep-nav-item-caret" name="uiCaretDown" size="10px" aria-hidden="true" />
              </button>
              <div class="ep-nav-sub" [id]="subId(i)">
                @for (s of item.sub; track $index) {
                  <a class="ep-nav-sub-btn" [href]="s.href" [attr.aria-current]="s.href === activeHref() ? 'page' : null" (click)="closeAll()">
                    {{ s.label }}
                  </a>
                }
              </div>
            </div>
          } @else {
            <a class="ep-nav-btn" [href]="item.href || '#'" [attr.aria-current]="item.href && item.href === activeHref() ? 'page' : null">
              {{ item.label }}
            </a>
          }
        }
      </nav>

      <div class="ep-nav-actions">
        @if (showSearch()) {
        <div class="ep-nav-search" [class.is-open]="searchOpen()">
          <button
            class="ep-nav-icon-btn ep-nav-search-toggle"
            type="button"
            aria-label="Suche"
            [attr.aria-expanded]="searchOpen()"
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
        }

        <cds-theme-cycle [showSystem]="showSystemTheme()" />
      </div>

      <!-- Hamburger: nur unter dem Mobile-Breakpoint sichtbar (CSS .ep-nav-burger), schaltet
           .nav-open am Header → .ep-nav-links klappt auf. Icons via .icon-menu/.icon-close. -->
      <button
        class="ep-nav-burger"
        type="button"
        [attr.aria-label]="navOpen() ? 'Menü schließen' : 'Menü öffnen'"
        [attr.aria-expanded]="navOpen()"
        [attr.aria-controls]="navId"
        (click)="toggleNav()"
      >
        <ng-icon class="icon-menu" name="heroBars3" size="24px" aria-hidden="true" />
        <ng-icon class="icon-close" name="heroXMark" size="24px" aria-hidden="true" />
      </button>

      @if (showCta()) {
        <a class="btn btn-filled btn-sm btn-co" href="#" (click)="$event.preventDefault()">{{ ctaLabel() }}</a>
      }
    </header>
  `,
})
export class TopnavComponent {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly document = inject(DOCUMENT);

  private readonly uid = ++cdsTopnavUid;
  /** @internal */
  protected readonly searchId = `cds-topnav-search-${this.uid}`;
  /** @internal */
  protected readonly navId = `cds-topnav-nav-${this.uid}`;

  readonly logo = input('conciso.');
  /** Optionales Logo-Bild/-Icon (URL oder Data-URI). Gesetzt → statt des Text-Logos.
   *  Doku: immer SVG (logo-conciso.svg), Default-Variante für helle Hintergründe. */
  readonly logoSrc = input<string>();
  /** Optionale helle Logo-Variante für den Dark Mode (Doku: logo-conciso-light.svg).
   *  Gesetzt → Theme-Swap via .logo-themed-* (schaltet über [data-theme] um);
   *  sonst wird logoSrc in beiden Themes gezeigt. */
  readonly logoDarkSrc = input<string>();
  /** Alt-Text des Logo-Bilds (Fallback: der Text aus `logo`). */
  readonly logoAlt = input('');
  readonly ctaLabel = input('Kontakt');
  /** Suche (Icon + Popover) rechts anzeigen. */
  readonly showSearch = input(true);
  /** Kontakt-/CTA-Button anzeigen. */
  readonly showCta = input(true);
  /** Bietet der Theme-Cycle-Button im Header auch „System“ an (tri) oder nur Hell/Dunkel? */
  readonly showSystemTheme = input(true);
  /** Href des aktuell aktiven Eintrags (Single Source of Truth). Nur der Eintrag
   *  — Top-Level ODER Sub — mit passendem href erhält aria-current="page". Dadurch
   *  kann strukturell höchstens EINER aktiv sein (statt mehrerer current-Flags). */
  readonly activeHref = input<string>();
  readonly links = input<CdsNavItem[]>([
    {
      label: 'Leistungen',
      sub: [
        { label: 'Angewandte KI', href: '#ki' },
        { label: 'Effektive Software', href: '#software' },
        { label: 'Wirksame Organisationen', href: '#organisationen' },
      ],
    },
    {
      label: 'Unternehmen',
      sub: [
        { label: 'Über uns', href: '#ueber-uns' },
        { label: 'Team', href: '#team' },
        { label: 'Jobs', href: '#jobs' },
      ],
    },
    { label: 'Beiträge', href: '#beitraege' },
    { label: 'Kontakt', href: '#kontakt' },
  ]);

  /** @internal */
  protected readonly openIndex = signal(-1);
  /** @internal */
  protected readonly searchOpen = signal(false);
  /**
   * Mobile-Menü offen? Schaltet .nav-open am Header (→ .ep-nav-links sichtbar).
   *
   * @internal
   */
  protected readonly navOpen = signal(false);

  /**
   * Eindeutige ID des Submenüs zu Eintrag i (Toggle aria-controls ↔ .ep-nav-sub).
   *
   * @internal
   */
  protected subId(i: number): string {
    return `cds-topnav-sub-${this.uid}-${i}`;
  }

  /** @internal */
  protected toggleSub(i: number): void {
    this.openIndex.set(this.openIndex() === i ? -1 : i);
    this.searchOpen.set(false);
  }

  /** @internal */
  protected toggleSearch(): void {
    this.searchOpen.set(!this.searchOpen());
    this.openIndex.set(-1);
  }

  /** @internal */
  protected toggleNav(): void {
    this.navOpen.set(!this.navOpen());
    this.openIndex.set(-1);
    this.searchOpen.set(false);
  }

  /** @internal */
  protected closeAll(): void {
    this.openIndex.set(-1);
    this.searchOpen.set(false);
    this.navOpen.set(false);
  }

  /** @internal */
  protected onDocumentClick(event: MouseEvent): void {
    // Außenklick: NICHT den Fokus umsetzen — der Nutzer hat bewusst woanders
    // hingeklickt, dorthin den Fokus zu ziehen wäre ein eigener Fehler.
    if (!this.host.nativeElement.contains(event.target as Node)) this.closeAll();
  }

  /** @internal */
  protected onEscape(): void {
    this.closeWithFocusReturn();
  }

  /**
   * Wie `closeAll()`, gibt den Fokus aber an den öffnenden Toggle zurück (Submenü-
   * bzw. Such-Toggle) — NUR wenn der Fokus beim Schließen tatsächlich innerhalb des
   * schließenden Bereichs lag. `css/components.css:1148` setzt `.ep-nav-sub{display:
   * none}`, `:1189` dasselbe für `.ep-nav-search-pop`: das fokussierte Element
   * verschwindet damit aus dem Fokus-Baum und der Fokus fiele sonst ans `<body>`
   * (WCAG 2.4.3). Nur für den Escape-Pfad gedacht.
   *
   * @internal
   */
  private closeWithFocusReturn(): void {
    const active = this.document.activeElement;
    let toggle: HTMLElement | null = null;
    const i = this.openIndex();
    if (i >= 0) {
      const sub = this.host.nativeElement.querySelector(`#${this.subId(i)}`);
      if (sub && active && sub.contains(active)) {
        toggle = this.host.nativeElement.querySelector<HTMLElement>(
          `[aria-controls="${this.subId(i)}"]`,
        );
      }
    } else if (this.searchOpen()) {
      const pop = this.host.nativeElement.querySelector('.ep-nav-search-pop');
      if (pop && active && pop.contains(active)) {
        toggle = this.host.nativeElement.querySelector<HTMLElement>('.ep-nav-search-toggle');
      }
    }
    if (!toggle && this.navOpen()) {
      const nav = this.host.nativeElement.querySelector(`#${this.navId}`);
      if (nav && active && nav.contains(active)) {
        toggle = this.host.nativeElement.querySelector<HTMLElement>('.ep-nav-burger');
      }
    }
    this.closeAll();
    toggle?.focus();
  }
}
