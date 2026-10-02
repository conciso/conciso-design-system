import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{n as t,t as n}from"./article-figure.component-Djfpe7A2.js";import{n as r,t as i}from"./platzhalter-Djsxs5M2.js";var a,o,s,c,l,u,d;function init_article_figure_stories(){return(init_article_figure_stories=e((()=>{t(),i(),{within:a,expect:o}=__STORYBOOK_MODULE_TEST__,s=r(`Bildfläche · 16:9`,1280,720),c={title:`Seitenmuster/Wissensbeitrag/Figure`,component:n,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4891`},layout:`padded`,docs:{description:{component:'Redaktionelles Inline-Bild mit optionaler Bildunterschrift im Lauftext eines Wissensbeitrags (`.article-figure`/`.article-figcaption`, css/components.css:1573 bis 1575). `loading="lazy"` ist fest verdrahtet: ausgezählt tragen 2 der 3 realen Mockup-Vorkommen dieses Attribut (die beiden Bilder MIT Caption, mittig im Lauftext), das dritte ist ein captionsloses Lead-Bild direkt unter dem Article Header, trägt stattdessen `loading="eager" fetchpriority="high"` und liegt außerhalb dieses Bauteils, die API sieht dafür kein Input vor. `alt` ist Pflicht, `caption` Beiwerk mit Default `\'\'` (kein `<figcaption>` ohne Text).'}}},args:{src:s,alt:`Nahaufnahme einer Hauptplatine mit Mikrochips, Speicherbausteinen und feinen Beschriftungen, in dunklen Tönen fotografiert`,caption:`Detailaufnahme einer Hauptplatine. Wo KI-Pilotmodelle scheitern, ist selten die Hardware der Engpass, sondern die Datenpipeline drumherum.`}},l={render:e=>({props:e,template:`<cds-article-figure [src]="src" [alt]="alt" [caption]="caption"></cds-article-figure>`}),play:async({canvasElement:e})=>{let t=a(e),n=e.querySelector(`figure.article-figure`);await o(n.children).toHaveLength(2),await o(n.children[0].tagName).toBe(`IMG`),await o(n.children[1].tagName).toBe(`FIGCAPTION`);let r=n.querySelector(`img`);await o(r).toHaveAttribute(`loading`,`lazy`),await o(t.getByRole(`img`,{name:`Nahaufnahme einer Hauptplatine mit Mikrochips, Speicherbausteinen und feinen Beschriftungen, in dunklen Tönen fotografiert`})).toBeInTheDocument();let i=n.querySelector(`figcaption.article-figcaption`);await o(i).toHaveTextContent(`Detailaufnahme einer Hauptplatine.`)}},u={name:`Ohne Caption`,args:{caption:``,alt:`Whiteboard mit handgezeichneter Matrix der Achsen AI Value und AI Readiness, mit eingezeichneten Use-Case-Punkten`},parameters:{controls:{disable:!0}},render:e=>({props:e,template:`<cds-article-figure [src]="src" [alt]="alt" [caption]="caption"></cds-article-figure>`}),play:async({canvasElement:e})=>{let t=e.querySelector(`figure.article-figure`);await o(t.querySelector(`figcaption`)).toBeNull(),await o(t.children).toHaveLength(1)}},d=[`Interaktiv`,`OhneCaption`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`<cds-article-figure [src]="src" [alt]="alt" [caption]="caption"></cds-article-figure>\`
  }),
  // Akzeptanzkriterien: <figcaption> folgt direkt auf <img>, keine Zwischenebene; alt landet als
  // zugänglicher Name; loading="lazy" ist gesetzt.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const figure = canvasElement.querySelector('figure.article-figure') as HTMLElement;
    await expect(figure.children).toHaveLength(2);
    await expect(figure.children[0].tagName).toBe('IMG');
    await expect(figure.children[1].tagName).toBe('FIGCAPTION');
    const img = figure.querySelector('img') as HTMLImageElement;
    await expect(img).toHaveAttribute('loading', 'lazy');
    await expect(c.getByRole('img', {
      name: 'Nahaufnahme einer Hauptplatine mit Mikrochips, Speicherbausteinen und feinen Beschriftungen, in dunklen Tönen fotografiert'
    })).toBeInTheDocument();
    const figcaption = figure.querySelector('figcaption.article-figcaption') as HTMLElement;
    await expect(figcaption).toHaveTextContent('Detailaufnahme einer Hauptplatine.');
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Ohne Caption',
  args: {
    caption: '',
    alt: 'Whiteboard mit handgezeichneter Matrix der Achsen AI Value und AI Readiness, mit eingezeichneten Use-Case-Punkten'
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  render: args => ({
    props: args,
    template: \`<cds-article-figure [src]="src" [alt]="alt" [caption]="caption"></cds-article-figure>\`
  }),
  // caption ist Beiwerk mit Default '' → ohne Text entsteht kein <figcaption>, das Bild bleibt
  // vollständig mit seinem alt-Text als zugänglichem Namen.
  play: async ({
    canvasElement
  }) => {
    const figure = canvasElement.querySelector('figure.article-figure') as HTMLElement;
    await expect(figure.querySelector('figcaption')).toBeNull();
    await expect(figure.children).toHaveLength(1);
  }
}`,...u.parameters?.docs?.source}}}})))()}init_article_figure_stories();export{l as Interaktiv,u as OhneCaption,d as __namedExportsOrder,c as default};