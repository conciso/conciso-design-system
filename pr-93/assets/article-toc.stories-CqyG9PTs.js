import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,V as r,fn as i,k as a,q as o,sn as s}from"./angular-platform-CAY__VLP.js";import{i as c,t as l}from"./dist-2fJEWV6G.js";import{n as u,t as d}from"./article-callout.component-BoISl-vE.js";import{n as f,t as p}from"./article-figure.component-Djfpe7A2.js";import{n as m,t as h}from"./article-pullquote.component-CmShpLLs.js";import{n as g,t as _}from"./platzhalter-Djsxs5M2.js";var v;function init_article_toc_component(){return(init_article_toc_component=e((()=>{i(),a(),v=class ArticleTocComponent{summary=t(`Inhalt`);open=t(!1);items=t.required();static propDecorators={summary:[{type:o,args:[{isSignal:!0,alias:`summary`,required:!1,transform:void 0}]}],open:[{type:o,args:[{isSignal:!0,alias:`open`,required:!1,transform:void 0}]}],items:[{type:o,args:[{isSignal:!0,alias:`items`,required:!0,transform:void 0}]}]}},v=s([n({selector:`cds-article-toc`,changeDetection:r.OnPush,template:`
    <details class="article-toc" [attr.open]="open() ? '' : null">
      <summary class="article-toc-summary" aria-label="Inhaltsverzeichnis ein- und ausklappen">
        <span>{{ summary() }}</span>
        <svg
          class="article-toc-caret"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.25"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <ol class="article-toc-list">
        @for (item of items(); track $index) {
          <li>
            <a [href]="item.href">{{ item.label }}</a>
          </li>
        }
      </ol>
    </details>
  `})],v)})))()}var y,b,x,S,C,w,T,E,D,O;function init_article_toc_stories(){return(init_article_toc_stories=e((()=>{l(),_(),init_article_toc_component(),u(),f(),m(),{within:y,userEvent:b,expect:x}=__STORYBOOK_MODULE_TEST__,S=g(`Bildfläche · 16:9`,1280,720),C=[{label:`Demo-Magie schlägt Produktions-Realität`,href:`#wb-ki-demo`},{label:`Drei Stolpersteine, die wir immer wieder sehen`,href:`#wb-ki-stolpersteine`},{label:`Was den Unterschied macht: Readiness statt Begeisterung`,href:`#wb-ki-readiness`},{label:`Pragmatischer Pfad: Konzept → Validierung → Produktion`,href:`#wb-ki-pfad`},{label:`Fazit`,href:`#wb-ki-fazit`}],w={title:`Seitenmuster/Wissensbeitrag/Inhaltsverzeichnis`,component:v,decorators:[c({imports:[v,d,p,h]})],tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5001`},layout:`padded`,docs:{description:{component:"Aufklappbares Inhaltsverzeichnis am Anfang eines Wissensbeitrags (`.article-toc*`, css/components.css:1577 bis 1589). Natives `<details>`/`<summary>`, kein nachgebautes Disclosure: Tastaturbedienung und Toggle-Zustand kommen vom Browser, das CSS hängt an `[open]`. Zweites Vorkommen des `<details>`-mit-Caret-Musters neben `cds-compare`, bewusst NICHT zusammengezogen (ADR-0007 §5), unter anderem weil dieses Bauteil keinen `toggled`-Output hat. `aria-label` am `<summary>` („Inhaltsverzeichnis ein- und ausklappen“) ist fest verdrahtet, 1:1 aus beiden realen Mockup-Vorkommen übernommen, kein erfundener zugänglicher Name. Element-Selektor (ADR-0008-Standardfall): `.article-toc` ist in beiden Vorkommen ein gewöhnlicher Block-Nachfahre in `.article-body`, kein Grid-/Flex-Kind, kein Geschwister-Kombinator, kein Tag-Wechsel."}}}},T={render:e=>({props:e,template:`<cds-article-toc [summary]="summary" [open]="open" [items]="items"></cds-article-toc>`}),args:{summary:`Inhalt`,open:!1,items:C},play:async({canvasElement:e})=>{let t=y(e),n=e.querySelector(`details.article-toc`),r=e.querySelector(`.article-toc-caret`);await x(n).not.toHaveAttribute(`open`),await x(n.open).toBe(!1),await x(getComputedStyle(r).transform).toBe(`none`);let i=t.getByText(`Inhalt`);await x(i.closest(`summary`)).toHaveAttribute(`aria-label`,`Inhaltsverzeichnis ein- und ausklappen`),await b.click(i),await x(n).toHaveAttribute(`open`),await x(n.open).toBe(!0),await x(getComputedStyle(r).transform).not.toBe(`none`);let a=e.querySelectorAll(`.article-toc-list a`);await x(a).toHaveLength(5),await x(a[0]).toHaveAttribute(`href`,`#wb-ki-demo`),await x(a[4]).toHaveTextContent(`Fazit`),i.focus(),await b.tab(),await x(document.activeElement).toBe(a[0])}},E={name:`Bereits offen`,args:{summary:`Inhalt`,open:!0,items:C},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=e.querySelector(`details.article-toc`);await x(t).toHaveAttribute(`open`),await x(t.open).toBe(!0);let n=e.querySelector(`.article-toc-list`);await x(n.offsetHeight).toBeGreaterThan(0)}},D={name:`Im Artikel-Body`,parameters:{controls:{disable:!0}},render:()=>({props:{items:C,figurePlaceholder:S},template:`
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
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`.article-body`);await x(t.tagName).toBe(`DIV`);let n=Array.from(t.children).map(e=>e.tagName);await x(n).toEqual([`P`,`CDS-ARTICLE-TOC`,`H2`,`P`,`CDS-ARTICLE-PULLQUOTE`,`CDS-ARTICLE-CALLOUT`,`CDS-ARTICLE-FIGURE`]),await x(t.querySelector(`details.article-toc`)).not.toBeNull(),await x(t.querySelector(`blockquote.article-pullquote`)).not.toBeNull(),await x(t.querySelector(`aside.article-callout`)).not.toBeNull(),await x(t.querySelector(`figure.article-figure`)).not.toBeNull()}},O=[`Interaktiv`,`BereitsOffen`,`ImArtikelBody`],T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`<cds-article-toc [summary]="summary" [open]="open" [items]="items"></cds-article-toc>\`
  }),
  args: {
    summary: 'Inhalt',
    open: false,
    items
  },
  // Akzeptanzkriterien: <summary> klappt per Klick auf, das Caret dreht über [open]
  // (css/components.css:1583), die Links bleiben nach dem Öffnen per Tastatur (Tab)
  // erreichbar — gemessen, nicht angenommen.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const details = canvasElement.querySelector('details.article-toc') as HTMLDetailsElement;
    const caret = canvasElement.querySelector('.article-toc-caret') as SVGElement;

    // Standardmäßig zu, Caret ungedreht.
    await expect(details).not.toHaveAttribute('open');
    await expect(details.open).toBe(false);
    await expect(getComputedStyle(caret).transform).toBe('none');
    const summary = c.getByText('Inhalt');
    await expect(summary.closest('summary')).toHaveAttribute('aria-label', 'Inhaltsverzeichnis ein- und ausklappen');

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
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Bereits offen',
  args: {
    summary: 'Inhalt',
    open: true,
    items
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  // open=true ist reiner Anfangszustand (kein Zwei-Wege-Zustand, kein Output): schon
  // beim ersten Rendern offen, ohne Klick.
  play: async ({
    canvasElement
  }) => {
    const details = canvasElement.querySelector('details.article-toc') as HTMLDetailsElement;
    await expect(details).toHaveAttribute('open');
    await expect(details.open).toBe(true);
    const list = canvasElement.querySelector('.article-toc-list') as HTMLElement;
    await expect(list.offsetHeight).toBeGreaterThan(0);
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Im Artikel-Body',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    props: {
      items,
      figurePlaceholder
    },
    template: \`
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
    \`
  }),
  // .article-body ist ein rohes <div>, kein Custom Element — die vier Bausteine sitzen als
  // direkte Kinder daneben, in derselben Lesereihenfolge wie im Mockup.
  play: async ({
    canvasElement
  }) => {
    const body = canvasElement.querySelector('.article-body') as HTMLElement;
    await expect(body.tagName).toBe('DIV');
    const directChildTags = Array.from(body.children).map(el => el.tagName);
    await expect(directChildTags).toEqual(['P', 'CDS-ARTICLE-TOC', 'H2', 'P', 'CDS-ARTICLE-PULLQUOTE', 'CDS-ARTICLE-CALLOUT', 'CDS-ARTICLE-FIGURE']);
    await expect(body.querySelector('details.article-toc')).not.toBeNull();
    await expect(body.querySelector('blockquote.article-pullquote')).not.toBeNull();
    await expect(body.querySelector('aside.article-callout')).not.toBeNull();
    await expect(body.querySelector('figure.article-figure')).not.toBeNull();
  }
}`,...D.parameters?.docs?.source}}}})))()}init_article_toc_stories();export{E as BereitsOffen,D as ImArtikelBody,T as Interaktiv,O as __namedExportsOrder,w as default};