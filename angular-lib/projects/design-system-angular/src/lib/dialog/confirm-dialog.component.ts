import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import type { CdsArea } from '../area';

let uid = 0;

/** Welcher der beiden Buttons gefüllt ist (siehe Gewichtungsregel in der Doku). */
export type CdsConfirmDialogEmphasis = 'confirm' | 'cancel';

/**
 * Bestätigungsdialog — Wrapper um `.dialog` aus css/components.css → „Dialog“.
 *
 * Nicht öffentlich exportiert: gerendert wird er ausschließlich von `CdsConfirmDialog`
 * (siehe confirm-dialog.service.ts), der ihn erzeugt, öffnet und wieder abräumt.
 *
 * Fokus-Falle, Escape und die inerte Seite liefert das native <dialog> über showModal().
 * Ergänzt wird, was der Browser nicht übernimmt, wie im Referenzverhalten in docs/main.js:
 * - Anfangsfokus auf der sicheren Aktion (bei destruktiven Dialogen) bzw. der Hauptaktion.
 *   Programmatisch statt per autofocus-Attribut, das die Template-Lint-Regel no-autofocus
 *   ablehnt; die Wirkung ist dieselbe.
 * - Hintergrund-Klick schließt nur, wenn pointerdown UND click auf dem <dialog> selbst
 *   landen. Sonst schlösse eine Textauswahl, die außerhalb des Dialogs endet: deren click
 *   geht an den gemeinsamen Vorfahren, also ebenfalls an das <dialog>.
 * - Der Fokus kehrt ausdrücklich zum zuvor fokussierten Element zurück.
 *
 * Das Ergebnis wird im close-Event gemeldet, das der Browser asynchron auslöst; erst dort
 * ist returnValue gesetzt und der Dialog wirklich zu.
 */
@Component({
  selector: 'cds-confirm-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Der click-Handler ist der Hintergrund-Klick. Seine Tastatur-Entsprechung ist Escape,
         das das native <dialog> selbst als cancel/close behandelt; ein keydown-Handler hier
         wäre doppelt. -->
    <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events -->
    <dialog
      #dialog
      class="dialog"
      role="alertdialog"
      [attr.aria-labelledby]="titleId"
      [attr.aria-describedby]="bodyId"
      (pointerdown)="onPointerDown($event)"
      (click)="onDialogClick($event)"
      (close)="onClose()"
    >
      <div class="dialog-inner">
        <h2 class="dialog-title" [id]="titleId">{{ heading() }}</h2>
        <p class="dialog-body" [id]="bodyId">{{ message() }}</p>
        <!-- Die gefüllte Hauptaktion steht immer zuletzt (rechts, gestapelt unten), die
             DOM-Reihenfolge folgt deshalb der Gewichtung, nicht der Rolle. -->
        <div class="dialog-actions">
          @if (emphasis() === 'cancel') {
            <button #confirmBtn type="button" [class]="confirmClasses()" (click)="finish('confirm')">
              {{ confirmLabel() }}
            </button>
            <button #cancelBtn type="button" [class]="cancelClasses()" (click)="finish('cancel')">
              {{ cancelLabel() }}
            </button>
          } @else {
            <button #cancelBtn type="button" [class]="cancelClasses()" (click)="finish('cancel')">
              {{ cancelLabel() }}
            </button>
            <button #confirmBtn type="button" [class]="confirmClasses()" (click)="finish('confirm')">
              {{ confirmLabel() }}
            </button>
          }
        </div>
      </div>
    </dialog>
  `,
})
export class ConfirmDialogComponent implements AfterViewInit {
  /** Die Entscheidung als Frage, z. B. „Änderungen verwerfen?“. */
  readonly heading = input.required<string>();
  /** Die Folge der Aktion, keine Wiederholung des Titels. */
  readonly message = input.required<string>();
  /** Verb aus dem Titel, z. B. „Verwerfen“. */
  readonly confirmLabel = input.required<string>();
  /** Wie es ohne die Aktion weitergeht, z. B. „Weiter bearbeiten“. */
  readonly cancelLabel = input.required<string>();
  /** Destruktive Aktion → Bestätigen trägt .btn-err, der Fokus liegt auf Abbrechen. */
  readonly destructive = input(false);
  /** Welcher Button gefüllt ist: die Aktion (`confirm`) oder der sichere Weg (`cancel`). */
  readonly emphasis = input<CdsConfirmDialogEmphasis>('confirm');
  /** Markenbereich der nicht destruktiven Buttons → .btn-co / .btn-ki / .btn-es / .btn-wo */
  readonly area = input<CdsArea>('co');

  /** true = bestätigt, false = abgebrochen (Button, Escape, Hintergrund). */
  readonly closed = output<boolean>();

  /** @internal */
  protected readonly titleId = `cds-confirm-dialog-${++uid}-title`;
  /** @internal */
  protected readonly bodyId = `cds-confirm-dialog-${uid}-body`;

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');
  private readonly cancelBtn = viewChild.required<ElementRef<HTMLButtonElement>>('cancelBtn');
  private readonly confirmBtn = viewChild.required<ElementRef<HTMLButtonElement>>('confirmBtn');
  private readonly document = inject(DOCUMENT);
  private opener: Element | null = null;
  private downOnBackdrop = false;

  /**
   * Gefüllt ist genau ein Button. Der andere ist bei Abbrechen ein Text-Button (Nebenaktion
   * laut Button-Hierarchie), bei Bestätigen Outlined, damit eine destruktive Nebenaktion als
   * eigene Fläche erkennbar bleibt.
   *
   * @internal
   */
  protected readonly confirmClasses = computed(() => {
    const color = this.destructive() ? 'err' : this.area();
    const style = this.emphasis() === 'confirm' ? 'filled' : 'outlined';
    return `btn btn-${style} btn-${color}`;
  });

  /** @internal */
  protected readonly cancelClasses = computed(() => {
    const style = this.emphasis() === 'cancel' ? 'filled' : 'text';
    return `btn btn-${style} btn-${this.area()}`;
  });

  /**
   * Bei destruktiven Dialogen immer die sichere Aktion, sonst die Hauptaktion.
   *
   * @internal
   */
  protected readonly focusCancel = computed(() => this.destructive() || this.emphasis() === 'cancel');

  /** @internal */
  ngAfterViewInit(): void {
    this.opener = this.document.activeElement;
    this.dialog().nativeElement.showModal();
    (this.focusCancel() ? this.cancelBtn() : this.confirmBtn()).nativeElement.focus();
  }

  /** @internal */
  protected onPointerDown(event: PointerEvent): void {
    this.downOnBackdrop = event.target === this.dialog().nativeElement;
  }

  /** @internal */
  protected onDialogClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement && this.downOnBackdrop) this.finish('cancel');
    this.downOnBackdrop = false;
  }

  /** @internal */
  protected finish(result: 'confirm' | 'cancel'): void {
    const dialog = this.dialog().nativeElement;
    if (dialog.open) dialog.close(result);
  }

  /**
   * Auch Escape landet hier: Der Browser schließt dann mit leerem returnValue.
   *
   * @internal
   */
  protected onClose(): void {
    if (this.opener instanceof HTMLElement && this.opener.isConnected) this.opener.focus();
    this.closed.emit(this.dialog().nativeElement.returnValue === 'confirm');
  }
}
