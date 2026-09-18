import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { within, userEvent, expect } from 'storybook/test';
import {
  ArticleTocComponent,
  ArticleCalloutComponent,
  ArticleFigureComponent,
  ArticlePullquoteComponent,
  type CdsArticleTocItem,
} from '@conciso/design-system-angular';

// Selber 16:9-Platzhalter wie in article-figure.stories.ts, hier nur für die
// „Im Artikel-Body“-Kontext-Story dupliziert (kein sinnvoller gemeinsamer Import
// zwischen zwei Story-Dateien in diesem Repo, siehe dortiger Kommentar zur
// Static-Dir-Einschränkung von assets/images).
const figurePlaceholder =
  "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1280'%20height='720'%3E%3Crect%20width='1280'%20height='720'%20fill='%23E8EDED'/%3E%3Ctext%20x='640'%20y='360'%20font-family='sans-serif'%20font-size='28'%20fill='%236E8585'%20text-anchor='middle'%20dominant-baseline='middle'%3EArticle-Figure%2016%3A9%3C/text%3E%3C/svg%3E";

// Wortlaut und Anker 1:1 aus dem Mockup (docs/index.html:15049–15061, Beispielseite
// Wissensbeitrag · KI) — 5 Einträge, dieselbe Zahl wie in der isolierten Doku-Demo
// (docs/index.html:7948–7960), dort mit Platzhalter-Hrefs.
const items: CdsArticleTocItem[] = [
  { label: 'Demo-Magie schlägt Produktions-Realität', href: '#wb-ki-demo' },
  { label: 'Drei Stolpersteine, die wir immer wieder sehen', href: '#wb-ki-stolpersteine' },
  { label: 'Was den Unterschied macht: Readiness statt Begeisterung', href: '#wb-ki-readiness' },
  { label: 'Pragmatischer Pfad: Konzept → Validierung → Produktion', href: '#wb-ki-pfad' },
  { label: 'Fazit', href: '#wb-ki-fazit' },
];

const meta: Meta<ArticleTocComponent> = {
  title: 'Seitenmuster/Wissensbeitrag/Inhaltsverzeichnis',
  component: ArticleTocComponent,
  decorators: [
    moduleMetadata({
      imports: [ArticleTocComponent, ArticleCalloutComponent, ArticleFigureComponent, ArticlePullquoteComponent],
    }),
  ],
  tags: ['autodocs', 'angular'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Aufklappbares Inhaltsverzeichnis am Anfang eines Wissensbeitrags (`.article-toc*`, ' +
          'css/components.css:1577–1589). Natives `<details>`/`<summary>`, kein nachgebautes ' +
          'Disclosure: Tastaturbedienung und Toggle-Zustand kommen vom Browser, das CSS hängt an ' +
          '`[open]`. Zweites Vorkommen des `<details>`-mit-Caret-Musters neben `cds-compare` — ' +
          'bewusst NICHT zusammengezogen (ADR-0007 §5), unter anderem weil dieses Bauteil laut ' +
          'Ticket-API keinen `toggled`-Output hat. `aria-label` am `<summary>` ' +
          '(„Inhaltsverzeichnis ein- und ausklappen“) ist fest verdrahtet, 1:1 aus beiden realen ' +
          'Mockup-Vorkommen übernommen, kein erfundener zugänglicher Name. Element-Selektor ' +
          '(ADR-0008-Standardfall): `.article-toc` ist in beiden Vorkommen ein gewöhnlicher ' +
          'Block-Nachfahre in `.article-body`, kein Grid-/Flex-Kind, kein Geschwister-Kombinator, ' +
          'kein Tag-Wechsel.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<ArticleTocComponent>;

export const Interaktiv: Story = {
  render: (args) => ({
    props: args,
    template: `<cds-article-toc [summary]="summary" [open]="open" [items]="items"></cds-article-toc>`,
  }),
  args: {
    summary: 'Inhalt',
    open: false,
    items,
  },
  // Akzeptanzkriterien: <summary> klappt per Klick auf, das Caret dreht über [open]
  // (css/components.css:1583), die Links bleiben nach dem Öffnen per Tastatur (Tab)
  // erreichbar — gemessen, nicht angenommen.
  play: async ({ canvasElement }) => {
    const c = within(canvasElement);
    const details = canvasElement.querySelector('details.article-toc') as HTMLDetailsElement;
    const caret = canvasElement.querySelector('.article-toc-caret') as SVGElement;

    // Standardmäßig zu, Caret ungedreht.
    await expect(details).not.toHaveAttribute('open');
    await expect(details.open).toBe(false);
    await expect(getComputedStyle(caret).transform).toBe('none');

    const summary = c.getByText('Inhalt');
    await expect(summary.closest('summary')).toHaveAttribute(
      'aria-label',
      'Inhaltsverzeichnis ein- und ausklappen',
    );

    // Klick auf <summary> klappt auf, Caret dreht.
    await userEvent.click(summary);
    await expect(details).toHaveAttribute('open');
    await expect(details.open).toBe(true);
    await expect(getComputedStyle(caret).transform).not.toBe('none');

    // 5 Links, korrekte Reihenfolge und Ziele.
    const links = canvasElement.querySelectorAll('.article-toc-list a');
    await expect(links).toHaveLength(5);
    await expect(links[0]).toHaveAttribute('href', '#wb-ki-demo');
    await expect(links[4]).toHaveTextContent('Fazit');

    // Tastaturerreichbarkeit: von der (jetzt offenen) <summary> aus weiterTABBEN
    // landet auf dem ersten Link der Liste.
    summary.focus();
    await userEvent.tab();
    await expect(document.activeElement).toBe(links[0]);
  },
};

export const BereitsOffen: Story = {
  name: 'Bereits offen',
  args: {
    summary: 'Inhalt',
    open: true,
    items,
  },
  parameters: { controls: { disable: true } },
  // open=true ist reiner Anfangszustand (kein Zwei-Wege-Zustand, kein Output): schon
  // beim ersten Rendern offen, ohne Klick.
  play: async ({ canvasElement }) => {
    const details = canvasElement.querySelector('details.article-toc') as HTMLDetailsElement;
    await expect(details).toHaveAttribute('open');
    await expect(details.open).toBe(true);
    const list = canvasElement.querySelector('.article-toc-list') as HTMLElement;
    await expect(list.offsetHeight).toBeGreaterThan(0);
  },
};

// Akzeptanzkriterium der Spec (Ticket 12): ".article-body bekommt keine Komponente; die Story
// zeigt den rohen Kontext." Der Konsument schreibt <div class="article-body"> selbst, alle vier
// Artikel-Körper-Bausteine sitzen darin als gewöhnliche Geschwister neben rohen <p>/<h2> —
// dieselbe Lesereihenfolge wie in der Beispielseite Wissensbeitrag · KI
// (docs/index.html:15046–15118): TOC, Pull-Quote, Callout, Figure.
export const ImArtikelBody: Story = {
  name: 'Im Artikel-Body',
  parameters: { controls: { disable: true } },
  render: () => ({
    props: { items, figurePlaceholder },
    template: `
      <div class="article-body">
        <p>Wer in den letzten Jahren mit Vorstand oder Bereichsleitung über KI gesprochen hat, kennt das Bild: Die Demo läuft, alle nicken, das Pilotbudget wird freigegeben.</p>

        <cds-article-toc summary="Inhalt" [items]="items"></cds-article-toc>

        <h2>Drei Stolpersteine, die wir immer wieder sehen</h2>
        <p>Im PoC reichen 200 sauber annotierte Beispiele. In der Produktion braucht es Pipelines, Governance und ein Team, das sich für die Daten verantwortlich fühlt.</p>

        <cds-article-pullquote
          area="ki"
          quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"
        ></cds-article-pullquote>

        <cds-article-callout area="ki" eyebrow="In der Praxis">
          <p>Bei einem mittelständischen Versicherer haben wir vor dem Pilot-Start sechs Wochen lang nur Daten und Prozesse aufgeräumt.</p>
        </cds-article-callout>

        <cds-article-figure
          [src]="figurePlaceholder"
          alt="Nahaufnahme einer Hauptplatine mit Mikrochips, Speicherbausteinen und feinen Beschriftungen, in dunklen Tönen fotografiert"
          caption="Detailaufnahme einer Hauptplatine. Wo KI-Pilotmodelle scheitern, ist selten die Hardware der Engpass, sondern die Datenpipeline drumherum."
        ></cds-article-figure>
      </div>
    `,
  }),
  // .article-body ist ein rohes <div>, kein Custom Element — die vier Bausteine sitzen als
  // direkte Kinder daneben, in derselben Lesereihenfolge wie im Mockup.
  play: async ({ canvasElement }) => {
    const body = canvasElement.querySelector('.article-body') as HTMLElement;
    await expect(body.tagName).toBe('DIV');

    const directChildTags = Array.from(body.children).map((el) => el.tagName);
    await expect(directChildTags).toEqual(['P', 'CDS-ARTICLE-TOC', 'H2', 'P', 'CDS-ARTICLE-PULLQUOTE', 'CDS-ARTICLE-CALLOUT', 'CDS-ARTICLE-FIGURE']);

    await expect(body.querySelector('details.article-toc')).not.toBeNull();
    await expect(body.querySelector('blockquote.article-pullquote')).not.toBeNull();
    await expect(body.querySelector('aside.article-callout')).not.toBeNull();
    await expect(body.querySelector('figure.article-figure')).not.toBeNull();
  },
};
