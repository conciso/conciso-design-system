import type { Meta, StoryObj } from '@storybook/angular';
import { SnackbarComponent } from './snackbar.component';

const meta: Meta<SnackbarComponent> = {
  title: 'Komponenten/Feedback/Snackbar',
  component: SnackbarComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Wrapper um `.snack` (css/components.css). Statusmeldung (role="status") in ' +
          'drei Tönen (.snack-def/.snack-ok/.snack-err) mit optionaler Aktion (.snack-act).',
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
