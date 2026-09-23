import type { Meta, StoryObj } from '@storybook/angular-vite';
import { userEvent, expect } from 'storybook/test';
import { TableComponent } from '@conciso/design-system-angular';

const meta: Meta<TableComponent> = {
  title: 'Komponenten/Tabelle/Tabelle',
  component: TableComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Datentabelle mit horizontalem Scroll-Container (`.tbl`/`.tbl-wrap`, ' +
          'css/components.css:1462–1480). Ausgezählt: außerhalb der Doku-Sektion `sec-table` ' +
          'selbst kommt `.tbl-wrap` nur zweimal vor, beide auf Beitragsseiten ' +
          '(`docs/index.html:8622`, `15080`). Element-Selektor `cds-table` (ADR-0008-Standardfall): ' +
          'keines der 5 `.tbl-wrap`-Vorkommen in `docs/index.html` ist selbst ein direktes ' +
          'Grid-/Flex-Kind. ' +
          'Kein Daten-Input: der Konsument projiziert `<thead>`/`<tbody>`/`<tfoot>` unverändert per ' +
          '`<ng-content>`, weil die Beispielseiten darin Badges, Links und `data-num` setzen, keine ' +
          'reinen Strings. `caption` ist Pflicht (`input.required<string>()`): die eigene Doku ' +
          '(`tabelle.mdx`) nennt `<caption>` „Pflicht“, alle 5 realen `.tbl`-Vorkommen in ' +
          '`docs/index.html` haben eine — ADR-0007 §2. `.tbl-wrap` ist deshalb immer per Tastatur ' +
          'erreichbar UND immer benannt (`tabindex="0"`, eigener `:focus-visible`-Ring, ' +
          '`role="region"` + `aria-label`): `scrollLabel` hat Vorrang, sonst `caption`, nie leer. ' +
          '`.tbl-sort` (sortierbare Spaltenköpfe) bleibt bewusst außen vor: die Klasse liefert nur ' +
          'den Button-Look, es gibt keine Sortierlogik dazu (siehe ' +
          '`.scratch/angular-seitenbausteine/issues/19-fehlende-sortierlogik-tbl-sort.md`).',
      },
    },
  },
  args: {
    caption: 'Beratungsleistungen im Überblick',
    striped: false,
    scrollLabel: '',
  },
};
export default meta;

type Story = StoryObj<TableComponent>;

// Wortlaut aus dem Mockup (docs/index.html:5062–5109, Doku-Sektion sec-table, Gruppe
// „Standard“) — reale Beispieldaten statt erfundener, unterschiedlich lange Zelltexte
// wie im Original.
export const Interaktiv: Story = {
  args: {
    caption: 'Beratungsleistungen im Überblick',
    scrollLabel: 'Leistungsübersicht Tabelle',
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
        <thead>
          <tr>
            <th scope="col">Leistung</th>
            <th scope="col">Bereich</th>
            <th scope="col">Format</th>
            <th scope="col">Zielgruppe</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">KI-Readiness Assessment</th>
            <td><span class="badge" data-area="ki">Angewandte KI</span></td>
            <td>Workshop &amp; Analyse</td>
            <td style="color:var(--tx-secondary)">Geschäftsführung, IT-Leitung</td>
          </tr>
          <tr>
            <th scope="row">Organisationsentwicklung</th>
            <td><span class="badge" data-area="wo">Wirksame Organisationen</span></td>
            <td>Begleitprogramm</td>
            <td style="color:var(--tx-secondary)">Führungskräfte, Teams</td>
          </tr>
          <tr>
            <th scope="row">Software-Architektur Review</th>
            <td><span class="badge" data-area="es">Effektive Software</span></td>
            <td>Audit &amp; Bericht</td>
            <td style="color:var(--tx-secondary)">Entwicklungsteams, CTOs</td>
          </tr>
        </tbody>
      </cds-table>
    `,
  }),
  // Akzeptanzkriterien: Tabellenstruktur exakt wie vom CSS erwartet (<table class="tbl">
  // direkt unter <div class="tbl-wrap">, <caption> als erstes Kind, danach ohne
  // zusätzlichen Knoten dazwischen genau thead/tbody), Scroll-Container per Tab
  // erreichbar und benannt (scrollLabel hat Vorrang vor caption).
  play: async ({ canvasElement }) => {
    const wrap = canvasElement.querySelector('.tbl-wrap') as HTMLElement;
    await expect(wrap).toHaveAttribute('tabindex', '0');
    await expect(wrap).toHaveAttribute('role', 'region');
    await expect(wrap).toHaveAttribute('aria-label', 'Leistungsübersicht Tabelle');

    const table = wrap.querySelector('table') as HTMLElement;
    await expect(table).toHaveClass('tbl');
    await expect(table).not.toHaveClass('tbl--striped');
    await expect(table.parentElement).toBe(wrap);

    // <caption> als erstes Kind der Tabelle, kein davorstehender Text/Element.
    const children = Array.from(table.children) as HTMLElement[];
    await expect(children[0].tagName).toBe('CAPTION');
    await expect(children[0]).toHaveTextContent('Beratungsleistungen im Überblick');
    // Direkt danach die projizierten Elemente, ohne fremden Knoten dazwischen:
    // <ng-content> fügt selbst kein DOM-Element ein.
    await expect(children[1].tagName).toBe('THEAD');
    await expect(children[2].tagName).toBe('TBODY');
    await expect(children).toHaveLength(3);

    // Scroll-Container per Tastatur erreichbar: Tab von document.body aus muss ihn
    // fokussieren (echte Tab-Reihenfolge, kein direktes .focus()).
    (document.body as HTMLElement).focus();
    await userEvent.tab();
    await expect(document.activeElement).toBe(wrap);
  },
};

// Wortlaut aus dem Mockup (docs/index.html:5117–5177, Gruppe „Gestreift“). Ohne
// scrollLabel: prüft den Fallback auf caption als aria-label (siehe Klassendoku).
export const Gestreift: Story = {
  args: {
    caption: 'Veranstaltungen & Workshops 2025',
    striped: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
        <thead>
          <tr>
            <th scope="col">Datum</th>
            <th scope="col">Veranstaltung</th>
            <th scope="col">Ort</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="white-space:nowrap;color:var(--tx-secondary)">15. Jan 2025</td>
            <th scope="row">KI im Unternehmensalltag, Einstiegsworkshop</th>
            <td style="color:var(--tx-secondary)">Frankfurt</td>
            <td><span class="badge badge-ok">Abgeschlossen</span></td>
          </tr>
          <tr>
            <td style="white-space:nowrap;color:var(--tx-secondary)">12. Feb 2025</td>
            <th scope="row">Führung in der Transformation</th>
            <td style="color:var(--tx-secondary)">Online</td>
            <td><span class="badge badge-ok">Abgeschlossen</span></td>
          </tr>
          <tr>
            <td style="white-space:nowrap;color:var(--tx-secondary)">24. Jun 2025</td>
            <th scope="row">Prompt Engineering für Fachteams</th>
            <td style="color:var(--tx-secondary)">Online</td>
            <td><span class="badge badge-neu">Anmeldung offen</span></td>
          </tr>
        </tbody>
      </cds-table>
    `,
  }),
  play: async ({ canvasElement }) => {
    const table = canvasElement.querySelector('table') as HTMLElement;
    await expect(table).toHaveClass('tbl');
    await expect(table).toHaveClass('tbl--striped');

    // Ohne scrollLabel fällt der Name auf caption zurück.
    const wrap = canvasElement.querySelector('.tbl-wrap') as HTMLElement;
    await expect(wrap).toHaveAttribute('role', 'region');
    await expect(wrap).toHaveAttribute('aria-label', 'Veranstaltungen & Workshops 2025');
  },
};

// data-num sitzt direkt am projizierten <th>/<td>, keine Komponenten-API dafür
// nötig (Entscheidung 1 der Klassendoku) — .tbl td[data-num]/th[data-num]
// (css/components.css:1472) richtet rechtsbündig aus und schaltet auf
// tabellarische Ziffern um.
export const MitZahlenspalte: Story = {
  name: 'Mit Zahlenspalte',
  args: {
    caption: 'Beratungsleistungen im Überblick',
    scrollLabel: 'Leistungsübersicht mit Dauer',
  },
  parameters: { controls: { disable: true } },
  render: (args) => ({
    props: args,
    template: `
      <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
        <thead>
          <tr>
            <th scope="col">Leistung</th>
            <th scope="col">Format</th>
            <th scope="col" data-num>Dauer (Tage)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">KI-Readiness Assessment</th>
            <td>Workshop &amp; Analyse</td>
            <td data-num>2</td>
          </tr>
          <tr>
            <th scope="row">Agile Transformation</th>
            <td>Coaching &amp; Training</td>
            <td data-num>180</td>
          </tr>
        </tbody>
      </cds-table>
    `,
  }),
  play: async ({ canvasElement }) => {
    const numCell = canvasElement.querySelector('td[data-num]') as HTMLElement;
    await expect(getComputedStyle(numCell).textAlign).toBe('right');
    await expect(getComputedStyle(numCell).fontVariantNumeric).toContain('tabular-nums');
  },
};

// css/components.css:1471 stylt tfoot, im Mockup selbst unbelegt (kein <tfoot> in
// docs/index.html) — hier eine Summenzeile als plausible Nutzung der bestehenden Regel.
export const MitFusszeile: Story = {
  name: 'Mit Fußzeile',
  args: {
    caption: 'Projektstunden nach Bereich',
    scrollLabel: 'Projektstunden Tabelle',
  },
  parameters: { controls: { disable: true } },
  render: (args) => ({
    props: args,
    template: `
      <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
        <thead>
          <tr>
            <th scope="col">Bereich</th>
            <th scope="col" data-num>Stunden</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Angewandte KI</th>
            <td data-num>64</td>
          </tr>
          <tr>
            <th scope="row">Effektive Software</th>
            <td data-num>112</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Gesamt</th>
            <td data-num>176</td>
          </tr>
        </tfoot>
      </cds-table>
    `,
  }),
  // <tfoot> als letztes Kind nach <tbody>, unmittelbar (kein Knoten dazwischen).
  play: async ({ canvasElement }) => {
    const table = canvasElement.querySelector('table') as HTMLElement;
    const children = Array.from(table.children) as HTMLElement[];
    const tags = children.map((el) => el.tagName);
    await expect(tags).toEqual(['CAPTION', 'THEAD', 'TBODY', 'TFOOT']);
    await expect(children[3]).toHaveTextContent('Gesamt');
    await expect(children[3]).toHaveTextContent('176');
  },
};

// Schmaler Viewport erzwingt den horizontalen Scroll-Container: gemessen über
// scrollWidth/clientWidth am echten Layout, nicht angenommen.
export const SchmalerViewport: Story = {
  name: 'Schmaler Viewport',
  args: {
    caption: 'Beratungsleistungen im Überblick',
    scrollLabel: 'Leistungsübersicht Tabelle',
  },
  parameters: { controls: { disable: true } },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:280px">
        <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
          <thead>
            <tr>
              <th scope="col">Leistung</th>
              <th scope="col">Bereich</th>
              <th scope="col">Format</th>
              <th scope="col">Zielgruppe</th>
              <th scope="col">Dauer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">KI-Readiness Assessment</th>
              <td><span class="badge" data-area="ki">Angewandte KI</span></td>
              <td>Workshop &amp; Analyse</td>
              <td style="color:var(--tx-secondary)">Geschäftsführung, IT-Leitung</td>
              <td style="color:var(--tx-secondary)">2 Tage</td>
            </tr>
          </tbody>
        </cds-table>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const wrap = canvasElement.querySelector('.tbl-wrap') as HTMLElement;
    // Gemessen, nicht angenommen: der Inhalt ist breiter als der Container, der
    // Scroll-Container muss also tatsächlich scrollen können.
    await expect(wrap.scrollWidth).toBeGreaterThan(wrap.clientWidth);
    await expect(wrap).toHaveAttribute('tabindex', '0');
  },
};
