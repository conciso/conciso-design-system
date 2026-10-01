/**
 * Geteilte Tastatur-Logik für Dot-Leisten mit `role="tab"` in `role="tablist"`
 * (Carousel, LogoCarousel): ←/→ mit Umlauf, Home/End an die Enden, automatische
 * Aktivierung (WAI-ARIA-Tabs-Muster). Reine Funktion, kein State — der Aufrufer
 * hält Länge/aktiven Index selbst und setzt bei einem Treffer den neuen Index
 * sowie den Fokus (Roving Tabindex).
 *
 * NICHT über `public-api.ts` exportiert: reines internes Implementierungsdetail
 * der Lib, keine öffentliche API.
 */
export function nextDotsIndex(length: number, current: number, key: string): number | null {
  if (!length) return null;
  switch (key) {
    case 'ArrowRight':
      return (current + 1) % length;
    case 'ArrowLeft':
      return (current - 1 + length) % length;
    case 'Home':
      return 0;
    case 'End':
      return length - 1;
    default:
      return null;
  }
}
