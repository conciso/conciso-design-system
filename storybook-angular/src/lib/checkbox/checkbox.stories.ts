import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { CheckboxComponent } from '@conciso/design-system-angular';

const meta: Meta<CheckboxComponent> = {
  title: 'Atoms/Checkbox',
  component: CheckboxComponent,
  tags: ['autodocs'],
  // Der Datenschutz-Link (.body-link) ist Corporate — die Bereichs-Tönung ist ein
  // SEITEN-Zustand, nicht Sache der Checkbox. Über den Toolbar-Umschalter „Bereich“
  // (preview.ts) lässt sich der echte .ep-page[data-accent]-Kontext zuschalten; dann
  // tönt der CSS-Kern den Link. Bewusst entkoppelt vom `area`-Input der Komponente.
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Einwilligungs-Feld: ein natives Kontrollkästchen mit Bereichsfarbe (accent-color) ' +
          'und einem Label, das den Einwilligungstext samt optional verlinktem Datenschutz' +
          'hinweis trägt. Typische Verwendung: Newsletter- und DSGVO-Einwilligung, meist als ' +
          'Pflichtfeld. WCAG AA.',
      },
    },
  },
  argTypes: {
    area: { control: 'inline-radio', options: ['co', 'ki', 'es', 'wo'] },
    required: { control: 'boolean' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label:
      'Ich bin einverstanden, dass meine E-Mail-Adresse für den Versand des Newsletters verwendet wird.',
    linkLabel: 'Datenschutzhinweise',
    linkHref: '#',
    required: true,
    checked: false,
    disabled: false,
    area: 'co',
  },
};
export default meta;

type Story = StoryObj<CheckboxComponent>;

export const Interaktiv: Story = {};

export const LesbarerZustand: Story = {
  name: 'Lesbarer Zustand',
  parameters: {
    controls: { disable: true },
    // Geklickter/fokussierter Endzustand → nicht deterministisch snapshotten.
    snapshot: { skip: true },
    docs: {
      description: {
        story:
          'Die `cds-checkbox` sind per `[(checked)]` an ein State-Objekt gebunden; ' +
          'jede Änderung emittiert `checkedChange` und aktualisiert die Anzeige. ' +
          'Der Absenden-Button liest die Pflicht-Einwilligung aus und ist erst ' +
          'aktiv, wenn sie gesetzt ist — genau so konsumiert man `checked` im echten Code.',
      },
    },
  },
  render: () => {
    const state = { consent: false, newsletter: false };
    return {
      moduleMetadata: { imports: [CheckboxComponent] },
      props: {
        state,
        zustand: () =>
          `Einwilligung ${state.consent ? 'an' : 'aus'} · Newsletter ${
            state.newsletter ? 'an' : 'aus'
          }`,
      },
      template: `
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:34rem">
          <cds-checkbox
            label="Ich stimme der Datenverarbeitung zu."
            [required]="true"
            [(checked)]="state.consent"
          ></cds-checkbox>
          <cds-checkbox
            label="Newsletter abonnieren (optional)."
            [(checked)]="state.newsletter"
          ></cds-checkbox>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">
            Zustand: <strong>{{ zustand() }}</strong>
          </p>
          <button type="button" class="btn btn-primary" [disabled]="!state.consent">
            Absenden
          </button>
        </div>
      `,
    };
  },
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const consent = c.getByRole('checkbox', { name: /Datenverarbeitung/ });
    const absenden = c.getByRole('button', { name: 'Absenden' });
    // Start: Pflicht-Einwilligung aus → Button gesperrt.
    await expect(consent).not.toBeChecked();
    await expect(absenden).toBeDisabled();
    await expect(canvasElement).toHaveTextContent('Einwilligung aus · Newsletter aus');
    // Klick → checkedChange wird ausgelesen: Anzeige + Button aktualisieren.
    await userEvent.click(consent);
    await expect(consent).toBeChecked();
    await expect(canvasElement).toHaveTextContent('Einwilligung an · Newsletter aus');
    await expect(absenden).toBeEnabled();
  },
};
