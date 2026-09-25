import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import {
  ButtonComponent,
  CdsConfirmDialog,
  type CdsArea,
  type CdsConfirmDialogEmphasis,
} from '@conciso/design-system-angular';

/**
 * Nur für die Stories: ein Auslöser, der CdsConfirmDialog aufruft und das Ergebnis anzeigt.
 * Die Lib exportiert bewusst keine Komponente, der Service rendert den Dialog selbst unter
 * <body>. Deshalb suchen die Play-Functions ihn über `screen`, nicht im canvasElement.
 */
@Component({
  selector: 'cds-confirm-dialog-demo',
  imports: [ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="display:flex;align-items:center;gap:var(--s4);flex-wrap:wrap">
      <cds-button variant="outlined" [area]="area()" [label]="triggerLabel()" (clicked)="open()" />
      <output aria-live="polite" style="font:var(--ty-body-md);color:var(--tx-secondary)">{{ resultText() }}</output>
    </div>
  `,
})
class ConfirmDialogDemoComponent {
  readonly triggerLabel = input.required<string>();
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly confirmLabel = input.required<string>();
  readonly cancelLabel = input.required<string>();
  readonly destructive = input(false);
  readonly emphasis = input<CdsConfirmDialogEmphasis>('confirm');
  readonly area = input<CdsArea>('co');
  /** Ruft open() zweimal hintereinander auf, um den doppelt ausgelösten Guard nachzustellen. */
  readonly openTwice = input(false);

  protected readonly resultText = signal('');
  private readonly dialog = inject(CdsConfirmDialog);

  protected async open(): Promise<void> {
    this.resultText.set('');
    const options = {
      title: this.title(),
      message: this.message(),
      confirmLabel: this.confirmLabel(),
      cancelLabel: this.cancelLabel(),
      destructive: this.destructive(),
      emphasis: this.emphasis(),
      area: this.area(),
    };
    const first = this.dialog.open(options);
    const second = this.openTwice() ? this.dialog.open(options) : first;
    const result = await first;
    const same = first === second ? '' : ' (zweites Promise abweichend)';
    this.resultText.set((result ? 'Ergebnis: bestätigt' : 'Ergebnis: abgebrochen') + same);
  }
}

const UNTERBRECHUNG = {
  triggerLabel: 'Profil verlassen',
  title: 'Änderungen verwerfen?',
  message: 'Deine Änderungen am Profil gehen verloren.',
  confirmLabel: 'Verwerfen',
  cancelLabel: 'Weiter bearbeiten',
  destructive: true,
  emphasis: 'cancel' as CdsConfirmDialogEmphasis,
};

const meta: Meta<ConfirmDialogDemoComponent> = {
  title: 'Komponenten/Feedback/Bestätigungsdialog',
  component: ConfirmDialogDemoComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Modale Rückfrage vor einer Aktion, die sich nicht rückgängig machen lässt. ' +
          'Aufruf über den Service `CdsConfirmDialog`: `open(options)` liefert ein ' +
          '`Promise<boolean>`, das ein Route-Guard direkt zurückgeben kann (`true` nur bei ' +
          'Bestätigen, sonst `false`). Die Controls hier bilden die Optionen ab. Aufgebaut auf ' +
          'dem nativen `<dialog>` (`role="alertdialog"`), Styles aus `.dialog` der CSS-Schicht.',
      },
    },
  },
  argTypes: {
    destructive: { control: 'boolean', description: 'Aktion lässt sich nicht rückgängig machen' },
    emphasis: {
      control: { type: 'inline-radio', labels: { confirm: 'Aktion', cancel: 'Sicherer Weg' } },
      options: ['confirm', 'cancel'],
      description: 'Welcher Button gefüllt ist',
    },
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
    openTwice: { table: { disable: true } },
    triggerLabel: { table: { disable: true } },
  },
  args: { ...UNTERBRECHUNG, area: 'co', openTwice: false },
};
export default meta;

type Story = StoryObj<ConfirmDialogDemoComponent>;

/** Dialog öffnen, nach der Aktion suchen. Der Service hängt ihn unter <body>. */
async function openDialog(canvasElement: HTMLElement, trigger: string): Promise<HTMLDialogElement> {
  await userEvent.click(within(canvasElement).getByRole('button', { name: trigger }));
  const dialog = await screen.findByRole('alertdialog');
  await waitFor(() => expect((dialog as HTMLDialogElement).open).toBe(true));
  return dialog as HTMLDialogElement;
}

/** Beschriftungen der Buttons in DOM-Reihenfolge. Die gefüllte Hauptaktion steht immer zuletzt. */
function buttonOrder(dialog: HTMLElement): string[] {
  return within(dialog).getAllByRole('button').map((b) => b.textContent?.trim() ?? '');
}

/** Das close-Event feuert asynchron, deshalb auf die Ergebnisanzeige warten. */
async function expectResult(canvasElement: HTMLElement, text: string): Promise<void> {
  await waitFor(() => expect(within(canvasElement).getByRole('status')).toHaveTextContent(text));
  await waitFor(() => expect(screen.queryByRole('alertdialog')).toBeNull());
}

export const Interaktiv: Story = {
  parameters: { snapshot: { skip: true } },
};

export const Unterbrechung: Story = {
  name: 'Unterbrechung (ungespeicherte Änderungen)',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  // Der Fall aus dem Route-Guard: der sichere Weg ist gefüllt und fokussiert, „Verwerfen“
  // ist Outlined mit .btn-err. Bestätigen liefert true, der Fokus kehrt zum Auslöser zurück.
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement, 'Profil verlassen');
    const d = within(dialog);
    await expect(dialog).toHaveAccessibleName('Änderungen verwerfen?');
    await expect(dialog).toHaveAccessibleDescription('Deine Änderungen am Profil gehen verloren.');
    const weiter = d.getByRole('button', { name: 'Weiter bearbeiten' });
    const verwerfen = d.getByRole('button', { name: 'Verwerfen' });
    await expect(weiter).toHaveFocus();
    await expect(weiter).toHaveClass('btn-filled');
    await expect(verwerfen).toHaveClass('btn-outlined', 'btn-err');
    await expect(buttonOrder(dialog)).toEqual(['Verwerfen', 'Weiter bearbeiten']);

    await userEvent.click(verwerfen);
    await expectResult(canvasElement, 'Ergebnis: bestätigt');
    await expect(within(canvasElement).getByRole('button', { name: 'Profil verlassen' })).toHaveFocus();
  },
};

export const SelbstAusgeloest: Story = {
  name: 'Selbst ausgelöst (Löschen)',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  args: {
    triggerLabel: 'Profil löschen',
    title: 'Profil löschen?',
    message: 'Dein Profil und alle Einträge darin werden dauerhaft gelöscht.',
    confirmLabel: 'Profil löschen',
    cancelLabel: 'Abbrechen',
    destructive: true,
    emphasis: 'confirm',
  },
  // Die Löschung ist gefüllt und rot, der Fokus liegt trotzdem auf „Abbrechen“ (Text-Button).
  // Escape bricht ab.
  //
  // Escape selbst lässt sich hier nicht auslösen: userEvent.keyboard() bildet Tasten in
  // JavaScript nach, und synthetische Events stoßen das native cancel des <dialog> nicht an.
  // Dieselbe Grenze wie bei cds-slider und cds-scale (docs/adr/0005, Ergänzung 2026-09-17).
  // Nachgestellt wird deshalb, was der Browser auf Escape tut: close() ohne returnValue. Ein
  // echter Tastendruck über Playwright schließt den Dialog und liefert false.
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement, 'Profil löschen');
    const d = within(dialog);
    const abbrechen = d.getByRole('button', { name: 'Abbrechen' });
    await expect(abbrechen).toHaveFocus();
    await expect(abbrechen).toHaveClass('btn-text');
    await expect(d.getByRole('button', { name: 'Profil löschen' })).toHaveClass('btn-filled', 'btn-err');
    await expect(buttonOrder(dialog)).toEqual(['Abbrechen', 'Profil löschen']);

    dialog.close();
    await expectResult(canvasElement, 'Ergebnis: abgebrochen');
  },
};

export const NichtDestruktiv: Story = {
  name: 'Nicht destruktiv',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  args: {
    triggerLabel: 'Anfrage senden',
    title: 'Anfrage absenden?',
    message: 'Wir melden uns innerhalb eines Werktags bei dir.',
    confirmLabel: 'Anfrage absenden',
    cancelLabel: 'Abbrechen',
    destructive: false,
    emphasis: 'confirm',
    area: 'ki',
  },
  // Ohne Risiko liegt der Fokus auf der Hauptaktion in Bereichsfarbe. Klick auf den
  // Hintergrund (Ziel ist das <dialog> selbst) bricht ab.
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement, 'Anfrage senden');
    const absenden = within(dialog).getByRole('button', { name: 'Anfrage absenden' });
    await expect(absenden).toHaveFocus();
    await expect(absenden).toHaveClass('btn-filled', 'btn-ki');

    await userEvent.click(dialog);
    await expectResult(canvasElement, 'Ergebnis: abgebrochen');
  },
};

export const Textauswahl: Story = {
  name: 'Textauswahl bis außerhalb',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  // Maus im Text drücken und erst über dem Hintergrund loslassen: der click geht an den
  // gemeinsamen Vorfahren, also an das <dialog>. Er darf nicht schließen, weil der
  // pointerdown nicht auf dem Hintergrund begann.
  play: async ({ canvasElement }) => {
    const dialog = await openDialog(canvasElement, 'Profil verlassen');
    const text = within(dialog).getByText('Deine Änderungen am Profil gehen verloren.');
    await userEvent.pointer([
      { keys: '[MouseLeft>]', target: text },
      { target: dialog },
      { keys: '[/MouseLeft]', target: dialog },
    ]);
    await expect(dialog.open).toBe(true);

    await userEvent.click(within(dialog).getByRole('button', { name: 'Weiter bearbeiten' }));
    await expectResult(canvasElement, 'Ergebnis: abgebrochen');
  },
};

export const DoppeltGeoeffnet: Story = {
  name: 'Doppelt geöffnet',
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  args: { openTwice: true },
  // Ein doppelt ausgelöster Guard öffnet keinen zweiten Dialog und erhält dasselbe Promise.
  play: async ({ canvasElement }) => {
    await openDialog(canvasElement, 'Profil verlassen');
    await expect(screen.getAllByRole('alertdialog')).toHaveLength(1);
    await userEvent.click(screen.getByRole('button', { name: 'Weiter bearbeiten' }));
    await expectResult(canvasElement, 'Ergebnis: abgebrochen');
    await expect(within(canvasElement).getByRole('status')).not.toHaveTextContent('abweichend');
  },
};

export const Geoeffnet: Story = {
  name: 'Geöffnet',
  parameters: { controls: { disable: true } },
  // Für das Visual-Snapshot: bleibt offen. Steht zuletzt, damit kein offener Dialog in
  // eine folgende Story ragt; beim Abbau der Story-App löst der Service ihn mit false auf.
  play: async ({ canvasElement }) => {
    await openDialog(canvasElement, 'Profil verlassen');
  },
};
