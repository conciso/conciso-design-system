import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { AuthorCardComponent, AuthorCardGroupComponent, AvatarComponent } from '@conciso/design-system-angular';

const meta: Meta<AuthorCardComponent> = {
  title: 'Seitenmuster/Wissensbeitrag/Author-Card',
  component: AuthorCardComponent,
  decorators: [moduleMetadata({ imports: [AuthorCardComponent, AuthorCardGroupComponent, AvatarComponent] })],
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Avatar-plus-Bio-Strip am Ende eines Wissensbeitrags (`.author-card`, ' +
          'css/components.css:1602–1606), einzeln oder über `cds-author-card-group` gebündelt ' +
          '(`.author-card-group`, css/components.css:1547–1563). Attributselektor ' +
          '`div[cdsAuthorCard]`: gemessen im `.is-grid`-Fall bricht ein Element-Selektor den ' +
          'Höhenausgleich der Reihe (84/204 px statt 204/204 px, siehe Klassendoku), weil der ' +
          'unsichtbare Host gestreckt wird, nicht die sichtbare `.author-card`-Box eine Ebene ' +
          'darunter. `cds-author-card-group` bleibt dagegen Element-Selektor (ADR-0008-Standardfall), ' +
          'setzt `.author-card-group` aber auf ein INNERES `<div>` statt auf den Host, damit die ' +
          'Gruppen-Eyebrow (`.author-card-group-eyebrow`) ein echtes Geschwister davon bleibt, ' +
          'Voraussetzung für `.author-card-group-eyebrow:has(+ .author-card-group.is-grid)` ' +
          '(css/components.css:1563). Avatar kommt als projizierter Inhalt ' +
          '(`<ng-content select="[cdsAvatar]">`), `area`/`size` setzt der Konsument direkt am ' +
          'Avatar. **`area` ist bewusst kein Input dieser Komponente:** `.author-card[data-area]` ' +
          'hat trotz gegenteiliger Doku-Aussage keine einzige CSS-Regel (siehe ' +
          '`.scratch/angular-seitenbausteine/issues/24-css-luecke-author-card-data-area.md`).',
      },
    },
  },
};
export default meta;

type Story = StoryObj<AuthorCardComponent>;

export const Interaktiv: Story = {
  args: {
    name: 'Lukas Brandt',
    roleLabel: 'Senior AI Engineer · bei Conciso seit 2019',
    bio: 'Begleitet KI-Projekte von der Strategie bis in die Produktion. Schwerpunkt: RAG-Systeme und LLM-Integration in regulierten Branchen.',
    eyebrow: 'Über den Autor',
  },
  // Wortlaut 1:1 aus docs/index.html:8424–8430 (Artikel-Demo, ein:e Autor:in mit eigenem Eyebrow).
  render: (args) => ({
    props: args,
    template: `
      <div style="background:var(--n-50);border-block:var(--bd);padding:32px 24px">
        <div cdsAuthorCard [name]="name" [roleLabel]="roleLabel" [bio]="bio" [eyebrow]="eyebrow">
          <div cdsAvatar name="Lukas Brandt" area="ki" size="lg"></div>
        </div>
      </div>
    `,
  }),
  // Akzeptanzkriterium: der Host TRÄGT die Klasse .author-card selbst (Attributselektor, keine
  // Zwischenebene), der Avatar ist projizierter Inhalt, die Eyebrow rendert als <h3> eine Ebene
  // unter dem <h2> des Article-Body (Barrierefreiheit laut wissensbeitrag.mdx).
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector('[cdsAuthorCard]') as HTMLElement;
    await expect(card.tagName).toBe('DIV');
    await expect(card).toHaveClass('author-card');
    await expect(card).not.toHaveAttribute('data-area');

    const avatar = card.querySelector('[cdsAvatar]') as HTMLElement;
    await expect(avatar).toHaveClass('article-avatar', 'article-avatar-lg');
    await expect(avatar).toHaveAttribute('data-area', 'ki');
    await expect(avatar).toHaveAttribute('aria-hidden', 'true');
    await expect(avatar).toHaveTextContent('LB');

    const eyebrow = card.querySelector('.author-card-eyebrow');
    await expect(eyebrow?.tagName).toBe('H3');
    await expect(eyebrow).toHaveTextContent('Über den Autor');
    await expect(card.querySelector('.author-card-name')).toHaveTextContent('Lukas Brandt');
    await expect(card.querySelector('.author-card-role')).toHaveTextContent('Senior AI Engineer');
    await expect(card.querySelector('.author-card-bio')).toHaveTextContent('Begleitet KI-Projekte');
  },
};

export const ZweiAutorinnen: Story = {
  name: 'Zwei Autor:innen',
  parameters: { controls: { disable: true } },
  // Wortlaut 1:1 aus docs/index.html:8436–8455 (zwei Bios untereinander, eine
  // Gruppen-Überschrift ersetzt die individuellen Eyebrows, siehe wissensbeitrag.mdx
  // „Eyebrow-Konvention“).
  render: () => ({
    template: `
      <div style="background:var(--n-50);border-block:var(--bd);padding:32px 24px">
        <cds-author-card-group eyebrow="Über die Autor:innen">
          <div cdsAuthorCard name="Lukas Brandt" roleLabel="Senior AI Engineer · bei Conciso seit 2019"
            bio="Begleitet KI-Projekte von der Strategie bis in die Produktion. Schwerpunkt: RAG-Systeme und LLM-Integration in regulierten Branchen.">
            <div cdsAvatar name="Lukas Brandt" area="ki" size="lg"></div>
          </div>
          <div cdsAuthorCard name="Maria Müller" roleLabel="UX Lead · bei Conciso seit 2020"
            bio="Verbindet Anwender:innen-Forschung mit AI-Produkt-Design. Sorgt dafür, dass technische Möglichkeiten und reale Bedürfnisse zueinander finden.">
            <div cdsAvatar name="Maria Müller" area="ki" size="lg"></div>
          </div>
        </cds-author-card-group>
      </div>
    `,
  }),
  // Akzeptanzkriterium (Ticket 13): Karten sind direkte Kinder von .author-card-group, auch ohne
  // is-grid. Die Gruppen-Eyebrow rendert als <h3>-Geschwister VOR .author-card-group (nicht als
  // Kind darin), keine der beiden Karten trägt einen eigenen .author-card-eyebrow.
  play: async ({ canvasElement }) => {
    const groupEyebrow = canvasElement.querySelector('.author-card-group-eyebrow');
    await expect(groupEyebrow?.tagName).toBe('H3');
    await expect(groupEyebrow).toHaveTextContent('Über die Autor:innen');
    await expect(groupEyebrow?.nextElementSibling).toHaveClass('author-card-group');

    const group = canvasElement.querySelector('.author-card-group') as HTMLElement;
    await expect(group).not.toHaveClass('is-grid');
    const cards = Array.from(group.children) as HTMLElement[];
    await expect(cards).toHaveLength(2);
    await expect(cards.every((el) => el.classList.contains('author-card'))).toBe(true);
    await expect(cards.every((el) => el.querySelector('.author-card-eyebrow') === null)).toBe(true);

    await expect(cards[0].querySelector('.author-card-name')).toHaveTextContent('Lukas Brandt');
    await expect(cards[1].querySelector('.author-card-name')).toHaveTextContent('Maria Müller');
  },
};

export const AlsRaster: Story = {
  name: 'Als Raster',
  parameters: { controls: { disable: true } },
  // Namen/Rollen 1:1 aus der realen Beispielseite Scrum-Training (docs/index.html:13812–13823).
  // Tobias Mehnerts Bio ist bewusst auf einen Satz gekürzt (NICHT 1:1 aus dem Mockup), Anja
  // Reuters Bio bleibt wortgleich — der Längenkontrast ist der Regressionsschutz für
  // ADR-0008 (siehe Klassendoku AuthorCardComponent): mit gleich langen Bios wäre die Baseline
  // grün und ein gebrochener Höhenausgleich unsichtbar, exakt wie beim ersten Anlauf dieses
  // Kriteriums (ADR-0008, „Im Raster“ bei cds-icon-card).
  render: () => ({
    template: `
      <cds-author-card-group [grid]="true">
        <div cdsAuthorCard name="Tobias Mehnert" roleLabel="Senior-Berater Organisationsentwicklung"
          bio="Seit über 15 Jahren in Veränderungsprojekten.">
          <div cdsAvatar name="Tobias Mehnert" area="wo" size="lg"></div>
        </div>
        <div cdsAuthorCard name="Anja Reuter" roleLabel="Lead Organisationsentwicklung · TÜV SÜD zertifiziert"
          bio="Kommt aus der Produktentwicklung und kennt Scrum aus der Rolle der Product Ownerin. Schwerpunkt: Priorisierung, wenn alle Anforderungen dringend sind.">
          <div cdsAvatar name="Anja Reuter" area="wo" size="lg"></div>
        </div>
      </cds-author-card-group>
    `,
  }),
  // Regressionsschutz für die Grundsatzentscheidung (Attributselektor): trotz stark
  // unterschiedlicher Bio-Länge bekommen beide Karten dieselbe Höhe, weil .author-card selbst
  // das Grid-Kind ist und align-items:stretch (Grid-Default von .author-card-group.is-grid,
  // css/components.css:1555) direkt darauf trifft, nicht auf einen unsichtbaren Host darüber.
  play: async ({ canvasElement }) => {
    const group = canvasElement.querySelector('.author-card-group') as HTMLElement;
    await expect(group).toHaveClass('is-grid');

    const cards = Array.from(group.children) as HTMLElement[];
    await expect(cards).toHaveLength(2);
    await expect(cards.every((el) => el.classList.contains('author-card'))).toBe(true);

    // Gegenprobe, dass der Inhalt tatsächlich unterschiedlich lang ist (sonst wäre eine
    // gleiche Höhe kein Beleg für den Ausgleich, siehe Klassendoku-Kommentar oben).
    const bios = cards.map((el) => el.querySelector('.author-card-bio')?.textContent ?? '');
    await expect(bios[1]!.length).toBeGreaterThan(bios[0]!.length * 2);

    const heights = cards.map((el) => el.getBoundingClientRect().height);
    await expect(heights[1]).toBe(heights[0]);
  },
};

export const OhneBio: Story = {
  name: 'Ohne Bio',
  parameters: { controls: { disable: true } },
  // Synthetischer Randfall (kein Vorkommen im Mockup): bio ist Beiwerk mit Default '', prüft die
  // optionale Darstellung ohne erfundenen Platzhaltertext.
  render: () => ({
    template: `
      <div style="background:var(--n-50);border-block:var(--bd);padding:32px 24px">
        <div cdsAuthorCard name="Daniel Herzog" roleLabel="Head of Delivery · bei Conciso seit 2017">
          <div cdsAvatar name="Daniel Herzog" area="wo" size="lg"></div>
        </div>
      </div>
    `,
  }),
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector('[cdsAuthorCard]') as HTMLElement;
    await expect(card.querySelector('.author-card-bio')).toBeNull();
    await expect(card.querySelector('.author-card-name')).toHaveTextContent('Daniel Herzog');
    await expect(card.querySelector('.author-card-role')).toHaveTextContent('Head of Delivery');
  },
};
