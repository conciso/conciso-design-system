import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,bn as o,z as s}from"./angular-platform-BGeCprOl.js";import{i as c,t as l}from"./dist-CMu91nUe.js";import{n as u}from"./lucide-angular-CTBwqO1y.js";import{n as d}from"./cds-icons-DtWH1HnJ.js";import{n as f,t as p}from"./article-callout.component-Da0fGVjy.js";import{n as m,t as h}from"./article-figure.component-BQsdJrcE.js";import{n as g,t as _}from"./article-pullquote.component-Bh0_pFpF.js";import{n as v,t as y}from"./platzhalter-Djsxs5M2.js";var b;function init_article_toc_component(){return(init_article_toc_component=e((()=>{a(),n(),d(),b=class ArticleTocComponent{summary=i(`Inhalt`);open=i(!1);items=i.required();static propDecorators={summary:[{type:r,args:[{isSignal:!0,alias:`summary`,required:!1,transform:void 0}]}],open:[{type:r,args:[{isSignal:!0,alias:`open`,required:!1,transform:void 0}]}],items:[{type:r,args:[{isSignal:!0,alias:`items`,required:!0,transform:void 0}]}]}},b=o([t({selector:`cds-article-toc`,changeDetection:s.OnPush,imports:[u],template:`
    <details class="article-toc" [attr.open]="open() ? '' : null">
      <summary class="article-toc-summary" aria-label="Inhaltsverzeichnis ein- und ausklappen">
        <span>{{ summary() }}</span>
        <svg lucideChevronDown class="article-toc-caret" [strokeWidth]="1.25"></svg>
      </summary>
      <ol class="article-toc-list">
        @for (item of items(); track $index) {
          <li>
            <a [href]="item.href">{{ item.label }}</a>
          </li>
        }
      </ol>
    </details>
  `})],b)})))()}var x,S,C,w,T,E,D,O,k,A;function init_article_toc_stories(){return(init_article_toc_stories=e((()=>{l(),y(),init_article_toc_component(),f(),m(),g(),{within:x,userEvent:S,expect:C}=__STORYBOOK_MODULE_TEST__,w=v(`Bildfläche · 16:9`,1280,720),T=[{label:`Demo-Magie schlägt Produktions-Realität`,href:`#wb-ki-demo`},{label:`Drei Stolpersteine, die wir immer wieder sehen`,href:`#wb-ki-stolpersteine`},{label:`Was den Unterschied macht: Readiness statt Begeisterung`,href:`#wb-ki-readiness`},{label:`Pragmatischer Pfad: Konzept → Validierung → Produktion`,href:`#wb-ki-pfad`},{label:`Fazit`,href:`#wb-ki-fazit`}],E={title:`Seitenmuster/Wissensbeitrag/Inhaltsverzeichnis`,component:b,decorators:[c({imports:[b,p,h,_]})],tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5001`},layout:`padded`,docs:{description:{component:"Aufklappbares Inhaltsverzeichnis am Anfang eines Wissensbeitrags (`.article-toc*`, css/components.css:1577 bis 1589). Natives `<details>`/`<summary>`, kein nachgebautes Disclosure: Tastaturbedienung und Toggle-Zustand kommen vom Browser, das CSS hängt an `[open]`. Zweites Vorkommen des `<details>`-mit-Caret-Musters neben `cds-compare`, bewusst NICHT zusammengezogen (ADR-0007 §5), unter anderem weil dieses Bauteil keinen `toggled`-Output hat. `aria-label` am `<summary>` („Inhaltsverzeichnis ein- und ausklappen“) ist fest verdrahtet, 1:1 aus beiden realen Mockup-Vorkommen übernommen, kein erfundener zugänglicher Name. Element-Selektor (ADR-0008-Standardfall): `.article-toc` ist in beiden Vorkommen ein gewöhnlicher Block-Nachfahre in `.article-body`, kein Grid-/Flex-Kind, kein Geschwister-Kombinator, kein Tag-Wechsel."}}}},D={render:e=>({props:e,template:`<cds-article-toc [summary]="summary" [open]="open" [items]="items"></cds-article-toc>`}),args:{summary:`Inhalt`,open:!1,items:T},play:async({canvasElement:e})=>{let t=x(e),n=e.querySelector(`details.article-toc`),r=e.querySelector(`.article-toc-caret`);await C(n).not.toHaveAttribute(`open`),await C(n.open).toBe(!1),await C(getComputedStyle(r).transform).toBe(`none`);let i=t.getByText(`Inhalt`);await C(i.closest(`summary`)).toHaveAttribute(`aria-label`,`Inhaltsverzeichnis ein- und ausklappen`),await S.click(i),await C(n).toHaveAttribute(`open`),await C(n.open).toBe(!0),await C(getComputedStyle(r).transform).not.toBe(`none`);let a=e.querySelectorAll(`.article-toc-list a`);await C(a).toHaveLength(5),await C(a[0]).toHaveAttribute(`href`,`#wb-ki-demo`),await C(a[4]).toHaveTextContent(`Fazit`),i.focus(),await S.tab(),await C(document.activeElement).toBe(a[0])}},O={name:`Bereits offen`,args:{summary:`Inhalt`,open:!0,items:T},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=e.querySelector(`details.article-toc`);await C(t).toHaveAttribute(`open`),await C(t.open).toBe(!0);let n=e.querySelector(`.article-toc-list`);await C(n.offsetHeight).toBeGreaterThan(0)}},k={name:`Im Artikel-Body`,parameters:{controls:{disable:!0}},render:()=>({props:{items:T,figurePlaceholder:w},template:`
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
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`.article-body`);await C(t.tagName).toBe(`DIV`);let n=Array.from(t.children).map(e=>e.tagName);await C(n).toEqual([`P`,`CDS-ARTICLE-TOC`,`H2`,`P`,`CDS-ARTICLE-PULLQUOTE`,`CDS-ARTICLE-CALLOUT`,`CDS-ARTICLE-FIGURE`]),await C(t.querySelector(`details.article-toc`)).not.toBeNull(),await C(t.querySelector(`blockquote.article-pullquote`)).not.toBeNull(),await C(t.querySelector(`aside.article-callout`)).not.toBeNull(),await C(t.querySelector(`figure.article-figure`)).not.toBeNull()}},A=[`Interaktiv`,`BereitsOffen`,`ImArtikelBody`],D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
}`,...k.parameters?.docs?.source}}}})))()}init_article_toc_stories();export{O as BereitsOffen,k as ImArtikelBody,D as Interaktiv,A as __namedExportsOrder,E as default};