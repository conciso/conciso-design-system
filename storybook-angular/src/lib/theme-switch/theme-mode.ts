import { Injectable, signal } from '@angular/core';

/** Drei Theme-Modi. „system" folgt der OS-Einstellung (prefers-color-scheme). */
export type CdsThemeMode = 'light' | 'dark' | 'system';

/** Reihenfolge (Cycle-Button, Segment, Dropdown). */
export const CDS_THEME_ORDER: CdsThemeMode[] = ['light', 'dark', 'system'];

/** Heroicons-Name je Modus (für @ng-icons/heroicons — das DS nutzt Hero, nicht Lucide). */
export const CDS_THEME_ICON: Record<CdsThemeMode, string> = {
  light: 'heroSun',
  dark: 'heroMoon',
  system: 'heroComputerDesktop',
};

/** Deutsches Label je Modus. */
export const CDS_THEME_LABEL: Record<CdsThemeMode, string> = {
  light: 'Hell',
  dark: 'Dunkel',
  system: 'System',
};

/**
 * Modus-Liste für den bi-/tri-state-Umschalter: tri = alle drei, binär = ohne
 * „System". Alle Switcher leiten ihre Optionen hierüber ab — so ist „binär vs.
 * tri" überall derselbe eine Parameter (triState).
 */
export function cdsThemeModes(triState: boolean): CdsThemeMode[] {
  return triState ? CDS_THEME_ORDER : CDS_THEME_ORDER.filter((m) => m !== 'system');
}

/**
 * Gemeinsame Theme-Logik für alle Theme-Switch-Varianten. Setzt bzw. entfernt
 * `data-theme="dark"` am <html> des Preview-Iframes (genau wie der DS es erwartet).
 * „system" löst über `matchMedia('(prefers-color-scheme: dark)')` auf und reagiert
 * live auf OS-Wechsel. Singleton → alle Varianten in einer Story bleiben synchron.
 */
@Injectable({ providedIn: 'root' })
export class ThemeModeService {
  /** Aktuell gewählter Modus (Signal → OnPush-freundlich). */
  readonly mode = signal<CdsThemeMode>('light');

  private mql: MediaQueryList | null = null;
  private readonly onSystemChange = (e: MediaQueryListEvent): void => this.reflect(e.matches);

  set(mode: CdsThemeMode): void {
    this.mode.set(mode);
    this.apply();
  }

  private apply(): void {
    this.mql?.removeEventListener('change', this.onSystemChange);
    this.mql = null;

    if (this.mode() === 'system') {
      this.mql = window.matchMedia('(prefers-color-scheme: dark)');
      this.mql.addEventListener('change', this.onSystemChange);
      this.reflect(this.mql.matches);
    } else {
      this.reflect(this.mode() === 'dark');
    }
  }

  /** Aufgelösten Zustand ans <html> schreiben (light = kein Attribut). */
  private reflect(dark: boolean): void {
    const root = document.documentElement;
    if (dark) root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
  }
}
