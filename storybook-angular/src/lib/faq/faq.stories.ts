import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { FaqComponent } from '@conciso/design-system-angular';

const meta: Meta<FaqComponent> = {
  title: 'Seitenmuster/Wissensbeitrag/FAQ',
  component: FaqComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Akkordeon aus aufklappbaren Fragen und Antworten für FAQ-Sektionen auf Content- und ' +
          'Marketingseiten. Standardmäßig zugeklappt, öffnet sich jede Frage per Klick oder ' +
          'Tastatur. Liest sich am besten im zweispaltigen Layout mit Überschrift links und ' +
          'Fragenliste rechts.',
      },
    },
  },
  args: {
    items: [
      {
        q: 'Wie läuft die Bewerbung ab?',
        a: 'Über das Formular bei der jeweiligen Stelle oder initiativ. Du bekommst zeitnah eine Rückmeldung, danach folgt ein Kennenlern-Gespräch.',
      },
      {
        q: 'Wo und wie arbeitet ihr?',
        a: 'Unser Büro ist der Workgarden in Dortmund. Du kannst flexibel remote arbeiten, gemeinsame Präsenztage halten das Team zusammen.',
      },
      {
        q: 'Welche Technologien nutzt ihr?',
        a: 'Moderne, langlebige Stacks — die Wahl richtet sich nach dem Problem, nicht nach dem Hype.',
      },
    ],
  },
};
export default meta;

type Story = StoryObj<FaqComponent>;

export const Interaktiv: Story = {
  // Natives details/summary: Klick auf die Frage klappt die Antwort auf.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const summary = c.getByText('Wie läuft die Bewerbung ab?');
    const details = summary.closest('details');
    await expect(details).not.toHaveAttribute('open');
    await userEvent.click(summary);
    await expect(details).toHaveAttribute('open');
  },
};

export const DoppelteFragen: Story = {
  name: 'Doppelte Fragen',
  // Regressionstest: gleich lautende Fragen sind zulässig und dürfen das Rendern
  // nicht abbrechen (NG0955 bei Tracking per Fragetext).
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  args: {
    items: [
      { q: 'Wie läuft die Bewerbung ab?', a: 'Über das Formular bei der jeweiligen Stelle.' },
      { q: 'Wie läuft die Bewerbung ab?', a: 'Initiativ per E-Mail.' },
    ],
  },
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('details')).toHaveLength(2);
  },
};

export const ZustandFolgtEintrag: Story = {
  name: 'Zustand folgt dem Eintrag',
  // Das native <details> hält seinen open-Zustand selbst. Beim Voranstellen eines
  // Eintrags muss die geöffnete Frage offen bleiben und die neue zugeklappt
  // erscheinen, statt dass der Zustand an der Position hängen bleibt.
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  render: (args) => ({
    props: {
      items: args.items,
      prepend(this: { items: typeof args.items }) {
        this.items = [{ q: 'Gibt es Probetage?', a: 'Ja, nach Absprache.' }, ...this.items];
      },
    },
    template: `
      <button type="button" (click)="prepend()">Frage voranstellen</button>
      <cds-faq [items]="items"></cds-faq>
    `,
  }),
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByText('Wie läuft die Bewerbung ab?'));
    await userEvent.click(c.getByRole('button', { name: 'Frage voranstellen' }));
    await expect(c.getByText('Gibt es Probetage?').closest('details')).not.toHaveAttribute('open');
    await expect(c.getByText('Wie läuft die Bewerbung ab?').closest('details')).toHaveAttribute('open');
  },
};
