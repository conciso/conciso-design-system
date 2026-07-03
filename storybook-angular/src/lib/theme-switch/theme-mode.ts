import { Injectable, type Signal, signal } from '@angular/core';

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

/** tri = alle drei, binär = ohne „System". Basis des `triState`-Parameters. */
export function cdsThemeModes(triState: boolean): CdsThemeMode[] {
  return triState ? CDS_THEME_ORDER : CDS_THEME_ORDER.filter((m) => m !== 'system');
}

// ── Modul-globale Theme-Quelle ──────────────────────────────────────────────
// EIN Zustand, geteilt von den Switcher-Komponenten (über ThemeModeService) UND
// der Storybook-Glue in preview.ts (Toolbar-Sync). Angular-DI allein würde das
// nicht leisten, da jede Story eine eigene App-Instanz (eigenen Root-Injector)
// hat — die modul-globale Quelle ist über alle hinweg dieselbe.
const _mode = signal<CdsThemeMode>('light');
let _mql: MediaQueryList | null = null;
const _subs = new Set<(m: CdsThemeMode) => void>();

const onSystemChange = (e: MediaQueryListEvent): void => reflect(e.matches);

/** Aufgelösten Zustand ans <html> schreiben (light = kein Attribut). */
function reflect(dark: boolean): void {
  const root = document.documentElement;
  if (dark) root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
}

/** Aktuellen Modus anwenden; „system" live an prefers-color-scheme koppeln. */
function apply(): void {
  _mql?.removeEventListener('change', onSystemChange);
  _mql = null;
  if (_mode() === 'system') {
    _mql = window.matchMedia('(prefers-color-scheme: dark)');
    _mql.addEventListener('change', onSystemChange);
    reflect(_mql.matches);
  } else {
    reflect(_mode() === 'dark');
  }
}

export const themeStore = {
  /** Readonly-Signal des aktuellen Modus (Komponenten lesen hierüber). */
  mode: _mode.asReadonly() as Signal<CdsThemeMode>,

  /** Setzen + anwenden + Abonnenten benachrichtigen (z. B. Toolbar-Sync). */
  set(mode: CdsThemeMode): void {
    if (_mode() === mode) return;
    _mode.set(mode);
    apply();
    _subs.forEach((cb) => cb(mode));
  },

  /** Wie set(), aber OHNE Broadcast — für Toolbar→Store, um eine Emit-Rückkopplung
   *  zu vermeiden (die Toolbar hat den Wert ja bereits). */
  setSilent(mode: CdsThemeMode): void {
    if (_mode() === mode) return;
    _mode.set(mode);
    apply();
  },

  /** Auf Modus-Änderungen hören (gibt eine Abmelde-Funktion zurück). */
  subscribe(cb: (m: CdsThemeMode) => void): () => void {
    _subs.add(cb);
    return () => _subs.delete(cb);
  },
};

/**
 * Dünner Angular-Service über der modul-globalen Quelle — damit die Komponenten
 * wie gewohnt `inject(ThemeModeService)` nutzen können. Setzt/entfernt letztlich
 * `data-theme="dark"` am <html> (genau wie der DS es erwartet). Alle Switcher UND
 * der globale Theme-Toolbar-Schalter bleiben so synchron.
 */
@Injectable({ providedIn: 'root' })
export class ThemeModeService {
  readonly mode = themeStore.mode;
  set(mode: CdsThemeMode): void {
    themeStore.set(mode);
  }
}
