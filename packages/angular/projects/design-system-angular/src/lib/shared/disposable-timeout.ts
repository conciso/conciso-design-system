import { DestroyRef, inject } from '@angular/core';

/**
 * `setTimeout`-Wrapper, der beim Zerstören der aufrufenden Komponente/Direktive
 * automatisch aufräumt (`DestroyRef.onDestroy`) — muss darum im Injektionskontext
 * erzeugt werden (Feld-Initializer/Konstruktor), wie `inject()` selbst.
 *
 * Deckt zwei Vorkommen ab, die `select.component.ts` und `combobox.component.ts`
 * (WP5 §5.5) wortgleich hatten: „scroll aktives Element in Sicht“ (Fire-and-forget,
 * ein Aufruf reicht) UND „Type-ahead-Puffer nach 500 ms leeren“ (Debounce — ein
 * erneuter `schedule()`-Aufruf ersetzt den noch laufenden Timer, stapelt also
 * nicht). Beides ist derselbe Bedarf: „terminiert, aber nicht über das Ende der
 * Komponente hinaus“.
 */
export function disposableTimeout(): {
  /** Vorherigen Timer verwerfen und `fn` neu terminieren. */
  schedule(fn: () => void, ms?: number): void;
  /** Laufenden Timer verwerfen, ohne neu zu terminieren. */
  clear(): void;
} {
  const destroyRef = inject(DestroyRef);
  let handle: ReturnType<typeof setTimeout> | undefined;
  const clear = (): void => clearTimeout(handle);
  destroyRef.onDestroy(clear);
  return {
    schedule(fn: () => void, ms?: number): void {
      clear();
      handle = setTimeout(fn, ms);
    },
    clear,
  };
}
