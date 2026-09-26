import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { within, expect } from 'storybook/test';
import {
  ArticleHeaderComponent,
  AvatarComponent,
  AvatarStackComponent,
  type CdsArticleBreadcrumbItem,
} from '@conciso/design-system-angular';

const breadcrumb: CdsArticleBreadcrumbItem[] = [
  { label: 'Wissen', href: '#' },
  { label: 'Angewandte KI' },
];

const meta: Meta<ArticleHeaderComponent> = {
  title: 'Seitenmuster/Wissensbeitrag/Article-Header',
  component: ArticleHeaderComponent,
  decorators: [
    moduleMetadata({ imports: [ArticleHeaderComponent, AvatarComponent, AvatarStackComponent] }),
  ],
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Zentrierter Kopf eines Wissensbeitrags (`.article-header`, css/components.css:1486–1519): ' +
          'Breadcrumb, optionale Pill, H1, Lead, Meta-Strip. Hauptvorlage ist ' +
          '`storybook-angular/src/docs/seitenmuster/wissensbeitrag.mdx`, Abschnitt „Article Header“. ' +
          'Der Avatar (`div[cdsAvatar]` oder `cds-avatar-stack`) wird über `<ng-content select=' +
          '"[cdsAvatar], cds-avatar-stack">` in den Meta-Strip projiziert. Der letzte ' +
          'Breadcrumb-Eintrag rendert immer ohne Link mit `aria-current="page"`, unabhängig von ' +
          'einem dort eventuell gesetzten `href` (siehe Klassendoku). `date`/`dateLabel` bleiben ' +
          'getrennt: `dateLabel` liefert die sichtbare Schreibweise, `date` allein den ' +
          '`datetime`-Wert — ohne `dateLabel` zeigt das `<time>` das rohe ISO-Datum sichtbar an ' +
          '(bewusst als Warnfall in „Interaktiv“ demonstriert).',
      },
    },
  },
};
export default meta;

type Story = StoryObj<ArticleHeaderComponent>;

export const Interaktiv: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-article-header
        [title]="title"
        [lead]="lead"
        [breadcrumb]="breadcrumb"
        [pill]="pill"
        [pillAriaLabel]="pillAriaLabel"
        [area]="area"
        [authorName]="authorName"
        [authorRole]="authorRole"
        [date]="date"
        [dateLabel]="dateLabel"
      >
        <div cdsAvatar name="Lukas Brandt" area="ki"></div>
      </cds-article-header>
    `,
  }),
  args: {
    title: 'Warum 60 % der KI-Piloten nie in Produktion gehen',
    lead:
      'Demos überzeugen, Use-Cases scheitern. Was wir aus 200 Implementierungen über den Pfad ' +
      'zur Produktion gelernt haben.',
    breadcrumb,
    pill: '8 min Lesezeit',
    pillAriaLabel: 'Lesezeit 8 Minuten',
    area: 'ki',
    authorName: 'Lukas Brandt',
    authorRole: 'Senior AI Engineer · Conciso',
    date: '2026-05-13',
    dateLabel: '13. Mai 2026',
  },
  // Akzeptanzkriterien: Breadcrumb ist <nav aria-label="Breadcrumb">, letzter Eintrag ohne Link
  // mit aria-current="page"; Datum ist ein <time> mit gültigem ISO-Wert; Initialen stimmen mit
  // name überein.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);

    const nav = canvasElement.querySelector('nav.article-breadcrumb') as HTMLElement;
    await expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
    const crumbs = nav.querySelectorAll(':scope > a, :scope > span:not(.article-breadcrumb-sep)');
    await expect(crumbs).toHaveLength(2);
    await expect(crumbs[0].tagName).toBe('A');
    await expect(crumbs[0]).not.toHaveAttribute('aria-current');
    await expect(crumbs[1].tagName).toBe('SPAN');
    await expect(crumbs[1]).toHaveAttribute('aria-current', 'page');
    await expect(crumbs[1]).not.toHaveAttribute('href');
    await expect(crumbs[1]).toHaveTextContent('Angewandte KI');

    const time = canvasElement.querySelector('time.article-meta-date') as HTMLTimeElement;
    await expect(time).toHaveAttribute('datetime', '2026-05-13');
    await expect(time).toHaveTextContent('13. Mai 2026');

    const avatar = canvasElement.querySelector('[cdsAvatar]') as HTMLElement;
    await expect(avatar).toHaveTextContent('LB');

    const pill = canvasElement.querySelector('.pill') as HTMLElement;
    await expect(pill).toHaveAttribute('data-area', 'ki');
    await expect(pill).toHaveAttribute('aria-label', 'Lesezeit 8 Minuten');

    await expect(c.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Warum 60 % der KI-Piloten nie in Produktion gehen',
    );
  },
};

export const OhneBreadcrumb: Story = {
  name: 'Ohne Breadcrumb',
  render: (args) => ({
    props: args,
    template: `
      <cds-article-header
        [title]="title"
        [lead]="lead"
        [pill]="pill"
        [pillAriaLabel]="pillAriaLabel"
        [area]="area"
        [authorName]="authorName"
        [authorRole]="authorRole"
        [date]="date"
        [dateLabel]="dateLabel"
      >
        <div cdsAvatar name="Maria Müller" area="es"></div>
      </cds-article-header>
    `,
  }),
  args: {
    title: 'Was wir aus 200 Migrationen gelernt haben',
    lead: 'Eine kollektive Retrospektive aus fünf Conciso-Engineering-Teams.',
    pill: '18 min Lesezeit',
    pillAriaLabel: 'Lesezeit 18 Minuten',
    area: 'es',
    authorName: 'Maria Müller',
    authorRole: 'Principal Engineer · Conciso',
    date: '2026-07-02',
    dateLabel: '2. Juli 2026',
  },
  parameters: { controls: { disable: true } },
  // Kein breadcrumb-Input (Default []) → keine <nav> im DOM. Konsumenten, die der
  // allgemeinen Navigationsregel folgen (docs/index.html:2423: "Den Breadcrumb nicht in
  // einen zentrierten .article-header einbetten…"), lassen den Input leer und setzen die
  // Leiste selbst davor.
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('nav.article-breadcrumb')).toBeNull();
    await expect(canvasElement.querySelector('h1.article-title')).toHaveTextContent(
      'Was wir aus 200 Migrationen gelernt haben',
    );
  },
};

export const MehrereAutorinnen: Story = {
  name: 'Mehrere Autor:innen',
  render: (args) => ({
    props: args,
    template: `
      <cds-article-header
        [title]="title"
        [lead]="lead"
        [pill]="pill"
        [pillAriaLabel]="pillAriaLabel"
        [area]="area"
        [authorName]="authorName"
        [authorRole]="authorRole"
        [date]="date"
        [dateLabel]="dateLabel"
      >
        <cds-avatar-stack [more]="2">
          <div cdsAvatar name="Paul Meinhardt" area="es"></div>
          <div cdsAvatar name="Anna Rieth" area="es"></div>
          <div cdsAvatar name="Daniel Herzog" area="es"></div>
        </cds-avatar-stack>
      </cds-article-header>
    `,
  }),
  // Wortlaut 1:1 aus dem Mockup (docs/index.html:8407–8410): 3 Avatare + `+2` im Stapel, Text
  // nennt die ersten zwei Namen („Namens-Konvention“ in wissensbeitrag.mdx erlaubt 2 ODER 3).
  args: {
    title: 'Was wir aus 200 Migrationen gelernt haben',
    lead: 'Eine kollektive Retrospektive aus fünf Conciso-Engineering-Teams.',
    pill: '18 min Lesezeit',
    pillAriaLabel: 'Lesezeit 18 Minuten',
    area: 'es',
    authorName: 'Paul Meinhardt, Anna Rieth & 3 weitere',
    authorRole: 'Conciso-Engineering',
    date: '2026-07-02',
    dateLabel: '2. Juli 2026',
  },
  parameters: { controls: { disable: true } },
  // Detaillierte Überlappungs-Messung des Stapels steht in avatar.stories.ts („Avatar-Stapel“);
  // hier nur die Einbettung im Meta-Strip: Stapel + `+N` projiziert, Autorentext vollständig als
  // Text vorhanden (Barrierefreiheit: der Stapel ist aria-hidden, die Namen stehen im Fließtext).
  play: async ({ canvasElement }) => {
    const stack = canvasElement.querySelector('cds-avatar-stack') as HTMLElement;
    await expect(stack).toHaveAttribute('aria-hidden', 'true');
    await expect(stack.querySelectorAll('.article-avatar')).toHaveLength(3);
    await expect(stack.querySelector('.article-avatar-more')).toHaveTextContent('+2');

    const name = canvasElement.querySelector('.article-meta-name') as HTMLElement;
    await expect(name).toHaveTextContent('Paul Meinhardt, Anna Rieth & 3 weitere');
  },
};

export const PilleOhneBereich: Story = {
  name: 'Pille ohne Bereich',
  render: (args) => ({
    props: args,
    template: `
      <cds-article-header [title]="title" [lead]="lead" [pill]="pill">
        <div cdsAvatar name="Lukas Brandt"></div>
      </cds-article-header>
    `,
  }),
  args: {
    title: 'Warum 60 % der KI-Piloten nie in Produktion gehen',
    lead: 'Demos überzeugen, Use-Cases scheitern.',
    pill: '8 min Lesezeit',
  },
  parameters: { controls: { disable: true } },
  // Pinnt die Entscheidung aus der Klassendoku: `pill` ist gesetzt, `area` NICHT — ausgezählt
  // trägt jede reale Pille im Article-Header-Kontext (docs/index.html:7856, 7912–7914, 8310,
  // 8337, 8367, 8398, 15021) ein data-area, ein Fall ohne Bereich kommt im Mockup nicht vor.
  // Statt einen Default zu erfinden (frühere Fassung: `as CdsArea`-Cast, der einem
  // undefined-Binding erlaubte, cds-pills eigenen Default zu überschreiben), rendert die
  // Komponente ohne `area` schlicht KEINE Pille.
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('.pill')).toBeNull();
    await expect(canvasElement.querySelector('h1.article-title')).toHaveTextContent(
      'Warum 60 % der KI-Piloten nie in Produktion gehen',
    );
  },
};

export const BreiteBegrenzt: Story = {
  name: 'Breite begrenzt',
  // Kein eigener Screenshot: geprüft wird nur die Geometrie des Hosts.
  parameters: { controls: { disable: true }, snapshot: { skip: true } },
  render: () => ({
    template: `
      <div style="width:1200px">
        <cds-article-header
          title="Warum 60 % der KI-Piloten nie in Produktion gehen"
          lead="Demos überzeugen, Use-Cases scheitern. Was wir aus 200 Implementierungen über den Pfad zur Produktion gelernt haben."
        ></cds-article-header>
      </div>
    `,
  }),
  // Der Host ist ein Block, damit max-width:880px und margin:0 auto aus
  // .article-header greifen. Als Inline-Element liefen Titel und Lead über die
  // volle Breite des 1200 px breiten Containers.
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector<HTMLElement>('cds-article-header')!;
    const lead = host.querySelector<HTMLElement>('.article-lead')!;
    await expect(getComputedStyle(host).display).toBe('block');
    await expect(host.getBoundingClientRect().width).toBe(880);
    await expect(lead.getBoundingClientRect().width).toBeLessThanOrEqual(880);
  },
};
