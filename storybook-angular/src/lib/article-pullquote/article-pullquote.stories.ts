import type { Meta, StoryObj } from '@storybook/angular-vite';
import { expect } from 'storybook/test';
import { ArticlePullquoteComponent } from '@conciso/design-system-angular';

const meta: Meta<ArticlePullquoteComponent> = {
  title: 'Seitenmuster/Wissensbeitrag/Pull-Quote',
  component: ArticlePullquoteComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Typografische Hervorhebung eines Satzes aus dem eigenen Lauftext eines ' +
          'Wissensbeitrags (`.article-pullquote`, css/components.css:1608–1612), ohne ' +
          'Attribution. **Nicht `Komponenten/Zitate & Testimonials/Blockquote`** ' +
          '(`cds-blockquote`, `.bq`): der Blockquote zitiert eine dritte, benannte Person mit ' +
          'getönter Box und Quote-Icon, das Pull-Quote zitiert den eigenen Text ohne Box, Icon ' +
          'oder Namen — volle Abgrenzung in beiden Klassendocs. `quote` enthält die deutschen ' +
          'Anführungszeichen bereits als Teil des Texts (`quotes:none`, keine ' +
          'CSS-generierten Marken); die Komponente ergänzt keine eigenen. `area` hat den ' +
          "verteidigbaren Default `'co'` (Basisregel ohne `[data-area]` entspricht bereits " +
          '`[data-area="co"]`).',
      },
    },
  },
};
export default meta;

type Story = StoryObj<ArticlePullquoteComponent>;

// Wortlaut 1:1 aus dem Mockup (docs/index.html:15075, identisch mit der isolierten Doku-Demo
// docs/index.html:8136) — einziges reales Vorkommen, data-area="ki".
export const Interaktiv: Story = {
  render: (args) => ({
    props: args,
    template: `<cds-article-pullquote [quote]="quote" [area]="area"></cds-article-pullquote>`,
  }),
  args: {
    quote:
      '„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“',
    area: 'ki',
  },
  // Akzeptanzkriterien: <blockquote class="article-pullquote"> trägt den Text unverändert
  // (inklusive der deutschen Anführungszeichen aus dem Input) und das data-area-Attribut.
  play: async ({ canvasElement }) => {
    const quote = canvasElement.querySelector('blockquote.article-pullquote') as HTMLElement;
    await expect(quote).toHaveAttribute('data-area', 'ki');
    await expect(quote).toHaveTextContent(
      '„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“',
    );
  },
};

// Dasselbe reale Zitat viermal, nur area variiert — isoliert bewusst allein die Akzentfarbe
// (border-left-color) als Variable, statt für co/es/wo neue Zitate zu erfinden: im Mockup
// existiert nur das eine, ki-getönte Pull-Quote (siehe Klassendoku).
export const ProBereich: Story = {
  name: 'Pro Bereich',
  parameters: { controls: { disable: true } },
  render: () => ({
    template: `
      <div style="display:flex;flex-direction:column;gap:16px">
        <cds-article-pullquote area="co" quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"></cds-article-pullquote>
        <cds-article-pullquote area="ki" quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"></cds-article-pullquote>
        <cds-article-pullquote area="es" quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"></cds-article-pullquote>
        <cds-article-pullquote area="wo" quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"></cds-article-pullquote>
      </div>
    `,
  }),
  // Vier gemessene Akzentfarben (border-left-color), nicht angenommen.
  play: async ({ canvasElement }) => {
    const quotes = Array.from(
      canvasElement.querySelectorAll('blockquote.article-pullquote'),
    ) as HTMLElement[];
    await expect(quotes).toHaveLength(4);
    const borders = new Set(quotes.map((q) => getComputedStyle(q).borderLeftColor));
    await expect(borders.size).toBe(4);
  },
};
