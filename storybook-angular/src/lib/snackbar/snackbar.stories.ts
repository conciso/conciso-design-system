import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect, fn } from 'storybook/test';
import { SnackbarComponent } from '@conciso/design-system-angular';

const meta: Meta<SnackbarComponent> = {
  title: 'Komponenten/Feedback/Snackbar',
  component: SnackbarComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    docs: {
      description: {
        component:
          'Kurze Statusmeldung als Feedback auf Nutzeraktionen — etwa nach dem ' +
          'Absenden eines Kontaktformulars, der Newsletter-Anmeldung oder bei ' +
          'Validierungsfehlern. Drei Varianten: Default, Erfolg (OK) und Fehler, ' +
          'jeweils mit optionaler Aktion.',
      },
    },
  },
  argTypes: {
    tone: { control: 'inline-radio', options: ['def', 'ok', 'err'] },
  },
  args: {
    message: 'Formular gespeichert, noch nicht abgesendet.',
    tone: 'def',
    actionLabel: 'Jetzt senden',
  },
};
export default meta;

type Story = StoryObj<SnackbarComponent>;

export const Interaktiv: Story = {};

export const AktionsButton: Story = {
  name: 'Aktions-Button',
  parameters: { controls: { disable: true } },
  args: { actionLabel: 'Jetzt senden', action: fn() },
  // Klick auf die Aktion feuert action.
  play: async ({ canvasElement, args }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', { name: 'Jetzt senden' }));
    await expect(args.action).toHaveBeenCalledTimes(1);
  },
};

export const Toene: Story = {
  name: 'Töne',
  parameters: { controls: { disable: true } },
  render: () => ({
    moduleMetadata: { imports: [SnackbarComponent] },
    template: `
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <cds-snackbar tone="def" message="Formular gespeichert, noch nicht abgesendet." actionLabel="Jetzt senden"></cds-snackbar>
        <cds-snackbar tone="ok" message="Änderungen erfolgreich gespeichert." actionLabel="Rückgängig"></cds-snackbar>
        <cds-snackbar tone="err" message="Speichern fehlgeschlagen." actionLabel="Erneut versuchen"></cds-snackbar>
      </div>
    `,
  }),
};
