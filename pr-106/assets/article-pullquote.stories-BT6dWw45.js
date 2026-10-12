import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{n as t,t as n}from"./article-pullquote.component-Bh0_pFpF.js";var r,i,a,o,s;function init_article_pullquote_stories(){return(init_article_pullquote_stories=e((()=>{t(),{expect:r}=__STORYBOOK_MODULE_TEST__,i={title:`Seitenmuster/Wissensbeitrag/Pull-Quote`,component:n,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4821`},layout:`padded`,docs:{description:{component:"Typografische Hervorhebung eines Satzes aus dem eigenen Lauftext eines Wissensbeitrags (`.article-pullquote`, css/components.css:1608 bis 1612), ohne Attribution. **Nicht `Komponenten/Zitate & Testimonials/Blockquote`** (`cds-blockquote`, `.bq`): der Blockquote zitiert eine dritte, benannte Person mit getönter Box und Quote-Icon, das Pull-Quote zitiert den eigenen Text ohne Box, Icon oder Namen, volle Abgrenzung in beiden Klassendocs. `quote` enthält die deutschen Anführungszeichen bereits als Teil des Texts (`quotes:none`, keine CSS-generierten Marken); die Komponente ergänzt keine eigenen. `area` hat den verteidigbaren Default `'co'` (Basisregel ohne `[data-area]` entspricht bereits `[data-area=\"co\"]`)."}}}},a={render:e=>({props:e,template:`<cds-article-pullquote [quote]="quote" [area]="area"></cds-article-pullquote>`}),args:{quote:`„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“`,area:`ki`},play:async({canvasElement:e})=>{let t=e.querySelector(`blockquote.article-pullquote`);await r(t).toHaveAttribute(`data-area`,`ki`),await r(t).toHaveTextContent(`„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“`)}},o={name:`Pro Bereich`,parameters:{controls:{disable:!0}},render:()=>({template:`
      <div style="display:flex;flex-direction:column;gap:16px">
        <cds-article-pullquote area="co" quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"></cds-article-pullquote>
        <cds-article-pullquote area="ki" quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"></cds-article-pullquote>
        <cds-article-pullquote area="es" quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"></cds-article-pullquote>
        <cds-article-pullquote area="wo" quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"></cds-article-pullquote>
      </div>
    `}),play:async({canvasElement:e})=>{let t=Array.from(e.querySelectorAll(`blockquote.article-pullquote`));await r(t).toHaveLength(4);let n=new Set(t.map(e=>getComputedStyle(e).borderLeftColor));await r(n.size).toBe(4)}},s=[`Interaktiv`,`ProBereich`],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`<cds-article-pullquote [quote]="quote" [area]="area"></cds-article-pullquote>\`
  }),
  args: {
    quote: '„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“',
    area: 'ki'
  },
  // Akzeptanzkriterien: <blockquote class="article-pullquote"> trägt den Text unverändert
  // (inklusive der deutschen Anführungszeichen aus dem Input) und das data-area-Attribut.
  play: async ({
    canvasElement
  }) => {
    const quote = canvasElement.querySelector('blockquote.article-pullquote') as HTMLElement;
    await expect(quote).toHaveAttribute('data-area', 'ki');
    await expect(quote).toHaveTextContent('„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“');
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Pro Bereich',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    template: \`
      <div style="display:flex;flex-direction:column;gap:16px">
        <cds-article-pullquote area="co" quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"></cds-article-pullquote>
        <cds-article-pullquote area="ki" quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"></cds-article-pullquote>
        <cds-article-pullquote area="es" quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"></cds-article-pullquote>
        <cds-article-pullquote area="wo" quote="„KI scheitert selten an der Technologie. Sie scheitert an der Prozesslandschaft, in die sie hineingeworfen wird.“"></cds-article-pullquote>
      </div>
    \`
  }),
  // Vier gemessene Akzentfarben (border-left-color), nicht angenommen.
  play: async ({
    canvasElement
  }) => {
    const quotes = Array.from(canvasElement.querySelectorAll('blockquote.article-pullquote')) as HTMLElement[];
    await expect(quotes).toHaveLength(4);
    const borders = new Set(quotes.map(q => getComputedStyle(q).borderLeftColor));
    await expect(borders.size).toBe(4);
  }
}`,...o.parameters?.docs?.source}}}})))()}init_article_pullquote_stories();export{a as Interaktiv,o as ProBereich,s as __namedExportsOrder,i as default};