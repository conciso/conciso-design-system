import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import { AreaTabComponent, AreaTabsComponent } from '@conciso/design-system-angular';

const meta: Meta<AreaTabsComponent> = {
  title: 'Marke/Brand Areas/AreaTabs',
  component: AreaTabsComponent,
  decorators: [moduleMetadata({ imports: [AreaTabsComponent, AreaTabComponent] })],
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tab-Umschalter zwischen mehreren Bereichen: pro Bereich ein `<cds-area-tab>` mit ' +
          '`area`, `label` und BELIEBIGEM projiziertem Inhalt (Text, Listen, Komponenten …), ' +
          'der beim Anklicken angezeigt wird. Der aktive Tab wird in der Bereichsfarbe ' +
          'hervorgehoben; der aktive Index ist über `[(active)]` steuerbar.',
      },
    },
  },
  args: { active: 0 },
};
export default meta;

type Story = StoryObj<AreaTabsComponent>;

const bodyStyle = 'font:var(--ty-body-md);color:var(--tx-secondary);margin:0';

export const Interaktiv: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-area-tabs [active]="active">
        <cds-area-tab area="co" label="Corporate">
          <p style="${bodyStyle}">Marke, Haltung und konsistente Kommunikation.</p>
        </cds-area-tab>
        <cds-area-tab area="ki" label="Angewandte KI">
          <p style="${bodyStyle}">KI-Lösungen mit echtem Geschäftsnutzen.</p>
        </cds-area-tab>
        <cds-area-tab area="es" label="Effektive Software">
          <p style="${bodyStyle}">Schlanke Architektur, schnellere Lieferung.</p>
        </cds-area-tab>
        <cds-area-tab area="wo" label="Wirksame Organisationen">
          <p style="${bodyStyle}">Teams, die lernen und sich anpassen.</p>
        </cds-area-tab>
      </cds-area-tabs>
    `,
  }),
  // Tab-Wechsel: Klick aktiviert den Tab (aria-selected) und sein Panel.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const tabs = c.getAllByRole('tab');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(tabs[1]);
    await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  },
};

export const Tastatur: Story = {
  name: 'Tastatur',
  parameters: { snapshot: { skip: true }, controls: { disable: true } },
  render: () => ({
    template: `
      <cds-area-tabs>
        <cds-area-tab area="co" label="Corporate">
          <p style="${bodyStyle}">Marke, Haltung und konsistente Kommunikation.</p>
        </cds-area-tab>
        <cds-area-tab area="ki" label="Angewandte KI">
          <p style="${bodyStyle}">KI-Lösungen mit echtem Geschäftsnutzen.</p>
        </cds-area-tab>
        <cds-area-tab area="es" label="Effektive Software">
          <p style="${bodyStyle}">Schlanke Architektur, schnellere Lieferung.</p>
        </cds-area-tab>
        <cds-area-tab area="wo" label="Wirksame Organisationen">
          <p style="${bodyStyle}">Teams, die lernen und sich anpassen.</p>
        </cds-area-tab>
      </cds-area-tabs>
    `,
  }),
  // ArrowRight/-Left bewegen mit Umlauf in BEIDE Richtungen, Home/End springen an
  // die Enden; der Fokus wandert mit (Roving Tabindex).
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const tabs = c.getAllByRole('tab');
    tabs[0].focus();
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

    await userEvent.keyboard('{ArrowRight}');
    await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[1]).toHaveFocus();

    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    await expect(tabs[3]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[3]).toHaveFocus();

    // Umlauf vorwärts: ArrowRight am letzten Tab springt zum ersten.
    await userEvent.keyboard('{ArrowRight}');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[0]).toHaveFocus();

    // Umlauf rückwärts: ArrowLeft am ersten Tab springt zum letzten.
    await userEvent.keyboard('{ArrowLeft}');
    await expect(tabs[3]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[3]).toHaveFocus();

    await userEvent.keyboard('{Home}');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[0]).toHaveFocus();

    await userEvent.keyboard('{End}');
    await expect(tabs[3]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[3]).toHaveFocus();
  },
};

export const ReicherInhalt: Story = {
  name: 'Reicher Inhalt',
  // Neue Story ohne eingecheckte Baseline. visual.yml liegt noch nicht auf main →
  // workflow_dispatch (Baseline-Erzeugung im gepinnten Image) ist nicht verfügbar,
  // der push-Bootstrap generiert nur bei fehlenden Baselines. Nach dem Merge nach
  // main kann die Baseline erzeugt und snapshot.skip entfernt werden.
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  // Zeigt, dass der Panel-Inhalt beliebiges Markup/Komponenten sein kann — nicht nur Text.
  render: () => ({
    template: `
      <cds-area-tabs>
        <cds-area-tab area="ki" label="Angewandte KI">
          <h4 style="font:var(--ty-heading-sm);margin:0 0 var(--s2)">KI mit Geschäftsnutzen</h4>
          <ul style="font:var(--ty-body-md);color:var(--tx-secondary);margin:0 0 var(--s3);padding-left:1.2em">
            <li>Use-Case-Bewertung &amp; Priorisierung</li>
            <li>RAG- und Assistenz-Lösungen</li>
            <li>Betrieb &amp; Monitoring</li>
          </ul>
          <button type="button" class="btn btn-primary">Beratung anfragen</button>
        </cds-area-tab>
        <cds-area-tab area="es" label="Effektive Software">
          <p style="${bodyStyle}">
            Schlanke Architektur und schnellere Lieferung — inkl.
            <a class="body-link" href="#">Referenzprojekten</a>.
          </p>
        </cds-area-tab>
      </cds-area-tabs>
    `,
  }),
};
