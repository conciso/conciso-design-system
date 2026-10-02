import type { Meta, StoryObj } from '@storybook/angular-vite';
import { within, expect } from 'storybook/test';
import { ArticleFigureComponent } from '@conciso/design-system-angular';
import { platzhalterBild } from '../../platzhalter';

// Neutraler Inline-SVG-Platzhalter im 16:9-Format (css/components.css:1574:
// aspect-ratio:16/9), analog zum Muster in hero-image.stories.ts: apps/storybook
// mountet nur assets/brand als Static-Dir (.storybook/main.ts), assets/images ist
// dort bewusst nicht eingebunden — ein Pfad wie `assets/images/wissensbeitrag-ki.jpg`
// würde deshalb in keiner Story auflösen.
const figurePlaceholder = platzhalterBild('Bildfläche · 16:9', 1280, 720);

const meta: Meta<ArticleFigureComponent> = {
  title: 'Seitenmuster/Wissensbeitrag/Figure',
  component: ArticleFigureComponent,
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Redaktionelles Inline-Bild mit optionaler Bildunterschrift im Lauftext eines ' +
          'Wissensbeitrags (`.article-figure`/`.article-figcaption`, ' +
          'css/components.css:1573–1575). `loading="lazy"` ist fest verdrahtet: ausgezählt tragen ' +
          '2 der 3 realen Mockup-Vorkommen dieses Attribut (die beiden Bilder MIT Caption, mittig ' +
          'im Lauftext), das dritte ist ein captionsloses Lead-Bild direkt unter dem Article Header, ' +
          'trägt stattdessen `loading="eager" fetchpriority="high"` ' +
          'und liegt außerhalb dieses Bauteils — die API sieht dafür kein Input vor. `alt` ' +
          "ist Pflicht, `caption` Beiwerk mit Default `''` (kein `<figcaption>` ohne Text).",
      },
    },
  },
  args: {
    src: figurePlaceholder,
    alt:
      'Nahaufnahme einer Hauptplatine mit Mikrochips, Speicherbausteinen und feinen ' +
      'Beschriftungen, in dunklen Tönen fotografiert',
    caption:
      'Detailaufnahme einer Hauptplatine. Wo KI-Pilotmodelle scheitern, ist selten die Hardware ' +
      'der Engpass, sondern die Datenpipeline drumherum.',
  },
};
export default meta;

type Story = StoryObj<ArticleFigureComponent>;

// Wortlaut der beiden identischen Beispielstellen.
export const Interaktiv: Story = {
  render: (args) => ({
    props: args,
    template: `<cds-article-figure [src]="src" [alt]="alt" [caption]="caption"></cds-article-figure>`,
  }),
  // Akzeptanzkriterien: <figcaption> folgt direkt auf <img>, keine Zwischenebene; alt landet als
  // zugänglicher Name; loading="lazy" ist gesetzt.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const figure = canvasElement.querySelector('figure.article-figure') as HTMLElement;
    await expect(figure.children).toHaveLength(2);
    await expect(figure.children[0].tagName).toBe('IMG');
    await expect(figure.children[1].tagName).toBe('FIGCAPTION');

    const img = figure.querySelector('img') as HTMLImageElement;
    await expect(img).toHaveAttribute('loading', 'lazy');
    await expect(
      c.getByRole('img', {
        name: 'Nahaufnahme einer Hauptplatine mit Mikrochips, Speicherbausteinen und feinen Beschriftungen, in dunklen Tönen fotografiert',
      }),
    ).toBeInTheDocument();

    const figcaption = figure.querySelector('figcaption.article-figcaption') as HTMLElement;
    await expect(figcaption).toHaveTextContent('Detailaufnahme einer Hauptplatine.');
  },
};

// Wortlaut des captionslosen Lead-Bilds der Beispielseite, belegt den realen,
// captionslosen Fall.
export const OhneCaption: Story = {
  name: 'Ohne Caption',
  args: {
    caption: '',
    alt: 'Whiteboard mit handgezeichneter Matrix der Achsen AI Value und AI Readiness, mit eingezeichneten Use-Case-Punkten',
  },
  parameters: { controls: { disable: true } },
  render: (args) => ({
    props: args,
    template: `<cds-article-figure [src]="src" [alt]="alt" [caption]="caption"></cds-article-figure>`,
  }),
  // caption ist Beiwerk mit Default '' → ohne Text entsteht kein <figcaption>, das Bild bleibt
  // vollständig mit seinem alt-Text als zugänglichem Namen.
  play: async ({ canvasElement }) => {
    const figure = canvasElement.querySelector('figure.article-figure') as HTMLElement;
    await expect(figure.querySelector('figcaption')).toBeNull();
    await expect(figure.children).toHaveLength(1);
  },
};
