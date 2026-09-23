import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ArticleCalloutComponent } from '@conciso/design-system-angular';

const meta: Meta<ArticleCalloutComponent> = {
  title: 'Seitenmuster/Wissensbeitrag/Callout',
  component: ArticleCalloutComponent,
  decorators: [moduleMetadata({ imports: [ArticleCalloutComponent] })],
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Bereichsgetönter Aside-Block für Praxis-Beispiele im Lauftext eines Wissensbeitrags ' +
          '(`.article-callout*`, css/components.css:1591–1600). Projizierte Absätze bleiben ' +
          'direkte Kinder von `.article-callout` (`<ng-content>` fügt kein eigenes Element ein), ' +
          'Voraussetzung für den Kindselektor `.article-callout > p` (css/components.css:1600). ' +
          '`area` hat den verteidigbaren Default `\'co\'`: die Basisregel ohne `[data-area]` ' +
          'rendert bereits identisch zu `[data-area="co"]`. **Bekannter CSS-Befund** (siehe ' +
          '`.scratch/angular-seitenbausteine/issues/22-css-luecke-callout-eyebrow-spezifitaet.md`): ' +
          '`.article-callout-eyebrow` verliert gegen `.article-callout > p` bei Schriftgröße, ' +
          '-gewicht und Randabstand (Spezifität 0,1,0 gegen 0,1,1), reproduziert hier exakt wie im ' +
          'rohen Mockup, nicht im Wrapper geflickt (ADR-0001). `aside` trägt `aria-labelledby` ' +
          'auf die Eyebrow, sobald eine gesetzt ist — Zusatz zum Mockup (ARIA, kein CSS), weil ' +
          'mehrere `.article-callout` auf derselben Seite sonst gleichnamige, ununterscheidbare ' +
          '`complementary`-Landmarks wären (axe `landmark-unique`, siehe ' +
          '`.scratch/angular-seitenbausteine/issues/23-doku-luecke-callout-landmark-label.md`).',
      },
    },
  },
};
export default meta;

type Story = StoryObj<ArticleCalloutComponent>;

export const Interaktiv: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cds-article-callout [eyebrow]="eyebrow" [area]="area">
        <p>Bei einem mittelständischen Versicherer haben wir vor dem Pilot-Start sechs Wochen lang nur Daten und Prozesse aufgeräumt. Das Pilotmodell selbst war anschließend in zwei Wochen produktiv. Ohne Drama, ohne Bypass. Das ist die unspektakuläre Variante des Erfolgs, die selten in Vorträgen vorkommt.</p>
      </cds-article-callout>
    `,
  }),
  // Wortlaut 1:1 aus dem Mockup (docs/index.html:15110–15114, Beispielseite Wissensbeitrag · KI).
  args: {
    eyebrow: 'In der Praxis',
    area: 'ki',
  },
  // Akzeptanzkriterium: Callout-Absätze bleiben direkte Kinder von .article-callout, keine
  // zusätzliche Ebene um <ng-content>. Geprüft über den echten Kindselektor (:scope > p), nicht
  // nur über querySelector auf .article-callout p (der auch verschachtelte Treffer fände).
  play: async ({ canvasElement }) => {
    const aside = canvasElement.querySelector('aside.article-callout') as HTMLElement;
    await expect(aside).toHaveAttribute('data-area', 'ki');

    const directChildren = aside.querySelectorAll(':scope > p');
    await expect(directChildren).toHaveLength(2);
    await expect(directChildren[0]).toHaveClass('article-callout-eyebrow');
    await expect(directChildren[0]).toHaveTextContent('In der Praxis');
    await expect(directChildren[1]).not.toHaveClass('article-callout-eyebrow');
    await expect(directChildren[1]).toHaveTextContent('Bei einem mittelständischen Versicherer');

    // Keine fremde Zwischenebene: das <aside> hat genau die zwei projizierten/eigenen <p>,
    // kein <div> oder Ähnliches drumherum.
    await expect(aside.children).toHaveLength(2);

    // aria-labelledby zeigt auf die Eyebrow-id (siehe Klassendoku, Issue 23).
    const labelledBy = aside.getAttribute('aria-labelledby');
    await expect(labelledBy).toBeTruthy();
    await expect(document.getElementById(labelledBy!)).toBe(directChildren[0]);
  },
};

export const ProBereich: Story = {
  name: 'Pro Bereich',
  parameters: { controls: { disable: true } },
  // Wortlaut 1:1 aus der Doku-Sektion (docs/index.html:8086–8115), ein Callout je Bereich.
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:24px">
        <cds-article-callout area="co" eyebrow="Aus dem Markenrad">
          <p>Drei Pfeiler, Ruhig, Klar, Energiegeladen, als Prüfstein für jeden Beitrag. Das ist nicht Pflicht, sondern Erleichterung: Wenn der Text gegen alle drei besteht, klingt er nach Conciso.</p>
        </cds-article-callout>
        <cds-article-callout area="ki" eyebrow="In der Praxis">
          <p>Bei einem mittelständischen Versicherer haben wir vor dem Pilot-Start sechs Wochen lang nur Daten und Prozesse aufgeräumt. Das Pilotmodell selbst war anschließend in zwei Wochen produktiv.</p>
        </cds-article-callout>
        <cds-article-callout area="es" eyebrow="Aus dem Code">
          <p>Wenn ein Modul mehr als drei verschiedene Kontexte bedient, ist es kein Modul mehr, sondern eine Sammlung. Refactoring beginnt mit ehrlicher Inventur, nicht mit dem Werkzeugkasten.</p>
        </cds-article-callout>
        <cds-article-callout area="wo" eyebrow="Beobachtung">
          <p>Wenn ein Veränderungsprojekt im Lenkungskreis hängt, liegt es selten an den Argumenten. Häufiger an einer Rolle, die nie geklärt wurde, und an der Schweigespirale, die daraus entsteht.</p>
        </cds-article-callout>
      </div>
    `,
  }),
  // Vier Bereiche, vier gemessene Hintergrund-/Akzentfarben (nicht angenommen): .article-callout
  // selbst (Hintergrund, Border-Links) ist von der Eyebrow-Spezifitätslücke NICHT betroffen, nur
  // die Eyebrow-Schrift/-Abstand (siehe Klassendoku und Issue 22).
  play: async ({ canvasElement }) => {
    const asides = Array.from(canvasElement.querySelectorAll('aside.article-callout')) as HTMLElement[];
    await expect(asides).toHaveLength(4);
    const areas = asides.map((a) => a.getAttribute('data-area'));
    await expect(areas).toEqual(['co', 'ki', 'es', 'wo']);

    const backgrounds = new Set(asides.map((a) => getComputedStyle(a).backgroundColor));
    await expect(backgrounds.size).toBe(4);
    const borders = new Set(asides.map((a) => getComputedStyle(a).borderLeftColor));
    await expect(borders.size).toBe(4);
  },
};

export const OhneEyebrow: Story = {
  name: 'Ohne Eyebrow',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <cds-article-callout area="es">
        <p>Wenn ein Modul mehr als drei verschiedene Kontexte bedient, ist es kein Modul mehr, sondern eine Sammlung.</p>
      </cds-article-callout>
    `,
  }),
  // eyebrow ist Beiwerk mit Default '' → ohne Bindung entsteht kein .article-callout-eyebrow,
  // der projizierte Absatz bleibt trotzdem ein direktes Kind.
  play: async ({ canvasElement }) => {
    const aside = canvasElement.querySelector('aside.article-callout') as HTMLElement;
    await expect(aside.querySelector('.article-callout-eyebrow')).toBeNull();
    await expect(aside.querySelectorAll(':scope > p')).toHaveLength(1);
  },
};
