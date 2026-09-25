import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  DestroyRef,
  EnvironmentInjector,
  Injectable,
  createComponent,
  inject,
} from '@angular/core';
import type { CdsArea } from '../area';
import { ConfirmDialogComponent, type CdsConfirmDialogEmphasis } from './confirm-dialog.component';

/** Inhalt und Gewichtung eines Bestätigungsdialogs. */
export interface CdsConfirmDialogOptions {
  /** Die Entscheidung als Frage: „Änderungen verwerfen?“ */
  title: string;
  /** Die Folge, keine Wiederholung des Titels: „Deine Änderungen am Profil gehen verloren.“ */
  message: string;
  /** Verb aus dem Titel: „Verwerfen“. Nie „OK“ oder „Ja“. */
  confirmLabel: string;
  /** Wie es ohne die Aktion weitergeht: „Weiter bearbeiten“. */
  cancelLabel: string;
  /** Aktion lässt sich nicht rückgängig machen → .btn-err, Fokus auf der sicheren Aktion. Vorgabe false. */
  destructive?: boolean;
  /**
   * Welcher Button gefüllt ist. `confirm` (Vorgabe), wenn die Person die Aktion selbst
   * ausgelöst hat; `cancel`, wenn der Dialog einen anderen Weg unterbricht, etwa ungespeicherte
   * Änderungen beim Verlassen einer Ansicht.
   */
  emphasis?: CdsConfirmDialogEmphasis;
  /** Markenbereich der nicht destruktiven Buttons. Vorgabe `co`. */
  area?: CdsArea;
}

/**
 * Öffnet einen Bestätigungsdialog und liefert dessen Ergebnis als Promise: `true` nur, wenn
 * die Aktion bestätigt wurde, sonst `false` (Abbrechen, Escape, Klick auf den Hintergrund).
 * Ein Route-Guard kann das Promise direkt zurückgeben:
 *
 * ```ts
 * export const unsavedChangesGuard: CanDeactivateFn<EditPage> = (page) =>
 *   !page.dirty() ||
 *   inject(CdsConfirmDialog).open({
 *     title: 'Änderungen verwerfen?',
 *     message: 'Deine Änderungen am Profil gehen verloren.',
 *     confirmLabel: 'Verwerfen',
 *     cancelLabel: 'Weiter bearbeiten',
 *     destructive: true,
 *     emphasis: 'cancel',
 *   });
 * ```
 *
 * Der einzige Service der Lib, der selbst rendert (siehe docs/adr/0012). Er erzeugt den
 * Dialog per createComponent direkt unter <body>, statt ihn in ein Template des Konsumenten
 * zu setzen: ein Guard hat kein Template. Die Styles kommen wie bei allen Komponenten aus der
 * global eingebundenen CSS-Schicht.
 *
 * Es gibt höchstens einen offenen Dialog. Ein weiterer Aufruf, solange er offen ist (etwa ein
 * doppelt ausgelöster Guard), öffnet keinen zweiten, sondern erhält dasselbe Promise. Wird die
 * App zerstört, während der Dialog offen ist, löst das Promise mit `false` auf, damit kein
 * Aufrufer hängen bleibt.
 */
@Injectable({ providedIn: 'root' })
export class CdsConfirmDialog {
  private readonly appRef = inject(ApplicationRef);
  private readonly injector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT);

  private pending: Promise<boolean> | null = null;
  private finish: ((result: boolean) => void) | null = null;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.finish?.(false));
  }

  /** Öffnet den Dialog; das Promise löst beim Schließen mit dem Ergebnis auf. */
  open(options: CdsConfirmDialogOptions): Promise<boolean> {
    if (this.pending) return this.pending;

    this.pending = new Promise<boolean>((resolve) => {
      const ref: ComponentRef<ConfirmDialogComponent> = createComponent(ConfirmDialogComponent, {
        environmentInjector: this.injector,
      });
      ref.setInput('heading', options.title);
      ref.setInput('message', options.message);
      ref.setInput('confirmLabel', options.confirmLabel);
      ref.setInput('cancelLabel', options.cancelLabel);
      ref.setInput('destructive', options.destructive ?? false);
      ref.setInput('emphasis', options.emphasis ?? 'confirm');
      ref.setInput('area', options.area ?? 'co');

      const subscription = ref.instance.closed.subscribe((result) => this.finish?.(result));
      this.finish = (result) => {
        this.finish = null;
        this.pending = null;
        subscription.unsubscribe();
        this.appRef.detachView(ref.hostView);
        ref.destroy();
        // Der Host liegt außerhalb jeder View, die ihn beim Abbau mitnähme.
        ref.location.nativeElement.remove();
        resolve(result);
      };

      this.document.body.appendChild(ref.location.nativeElement);
      this.appRef.attachView(ref.hostView);
      // Sofort rendern: ngAfterViewInit öffnet den Dialog, ohne auf den nächsten
      // Change-Detection-Lauf der App zu warten.
      ref.changeDetectorRef.detectChanges();
    });
    return this.pending;
  }
}
