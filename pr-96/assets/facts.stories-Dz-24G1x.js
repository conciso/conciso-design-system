import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,V as r,fn as i,k as a,q as o,sn as s}from"./angular-platform-CAY__VLP.js";var c;function init_facts_component(){return(init_facts_component=e((()=>{i(),a(),c=class FactsComponent{items=t.required();grid=t(!1);area=t();static propDecorators={items:[{type:o,args:[{isSignal:!0,alias:`items`,required:!0,transform:void 0}]}],grid:[{type:o,args:[{isSignal:!0,alias:`grid`,required:!1,transform:void 0}]}],area:[{type:o,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}]}},c=s([n({selector:`cds-facts`,changeDetection:r.OnPush,template:`
    <dl class="ep-facts" [class.is-grid]="grid()">
      @for (item of items(); track $index) {
        <div>
          <dt [class]="area() ? 't-' + area() : null">{{ item.term }}</dt>
          <dd>{{ item.value }}</dd>
        </div>
      }
    </dl>
  `})],c)})))()}var l,u,d,f,p;function init_facts_stories(){return(init_facts_stories=e((()=>{init_facts_component(),{expect:l}=__STORYBOOK_MODULE_TEST__,u={title:`Komponenten/Fakten-Liste`,component:c,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4889`},layout:`padded`,docs:{description:{component:'Definitionsliste für die Rahmendaten eines Angebots (Termin, Dauer, Ort, Preis), `.ep-facts` (css/components.css:1261 bis 1272), einspaltig mit Haarlinie zwischen den Paaren oder als `.is-grid` zweispaltig für Kästen, die neben Inhalt stehen. Bringt bewusst keinen eigenen Rahmen mit, sie zieht in einen vorhandenen Container ein (Angebots-Box, Sticky-Sidebar). Element-Selektor `cds-facts` (ADR-0008-Standardfall): analog zu `cds-faq` trägt die INNERE `<dl class="ep-facts">` die CSS-Klasse, nicht der Host; die Semantik einer Definitionsliste hängt am `<dl>`-Tag selbst, ein Custom-Element kann es nicht annehmen. Jedes Paar rendert als `<div><dt>…</dt><dd>…</dd></div>`, weil `.ep-facts > div + div` den Trenner ab dem zweiten Paar über den direkten `<div>`-Nachfahren setzt. `area` färbt `.t-{area}` auf jedes `<dt>`, über die ursprüngliche Skizze hinaus ergänzt, weil alle 3 realen `.ep-facts`-Vorkommen im Mockup diese Tönung einheitlich einsetzen (siehe Klassendoku).'}}},argTypes:{area:{control:`inline-radio`,options:[void 0,`co`,`ki`,`es`,`wo`]}},args:{items:[{term:`Dauer`,value:`2 Tage, 9 bis 17 Uhr`},{term:`Format`,value:`Präsenz & Online`},{term:`Gruppe`,value:`max. 12 Personen`},{term:`Sprache`,value:`Deutsch`}],grid:!1,area:`wo`}},d={render:e=>({props:e,template:`<cds-facts [items]="items" [grid]="grid" [area]="area"></cds-facts>`}),play:async({canvasElement:e})=>{let t=e.querySelector(`dl`);await l(t).toHaveClass(`ep-facts`),await l(t).not.toHaveClass(`is-grid`);let n=Array.from(t.children);await l(n).toHaveLength(4);for(let e of n)await l(e.tagName).toBe(`DIV`),await l(e.children).toHaveLength(2),await l(e.children[0].tagName).toBe(`DT`),await l(e.children[1].tagName).toBe(`DD`);let r=t.querySelectorAll(`dt`);await l(r[0]).toHaveTextContent(`Dauer`),await l(r[0]).toHaveClass(`t-wo`);let i=t.querySelectorAll(`dd`);await l(i[0]).toHaveTextContent(`2 Tage, 9 bis 17 Uhr`),await l(getComputedStyle(n[0]).borderTopWidth).toBe(`0px`),await l(getComputedStyle(n[1]).borderTopWidth).not.toBe(`0px`)}},f={name:`Als Raster`,args:{grid:!0},parameters:{controls:{disable:!0}},render:e=>({props:e,template:`
      <div style="background:var(--bg-surface);border:var(--bd-strong);border-radius:var(--r-lg);padding:var(--s6);max-width:420px">
        <cds-facts [items]="items" [grid]="grid" [area]="area"></cds-facts>
      </div>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`dl`);await l(t).toHaveClass(`is-grid`),await l(getComputedStyle(t).display).toBe(`grid`);let n=Array.from(t.children);await l(getComputedStyle(n[1]).borderTopWidth).toBe(`0px`);let r=n[0].getBoundingClientRect(),i=n[1].getBoundingClientRect();await l(i.top).toBe(r.top)}},p=[`Interaktiv`,`AlsRaster`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`<cds-facts [items]="items" [grid]="grid" [area]="area"></cds-facts>\`
  }),
  // Akzeptanzkriterium: <dl>/<div>/<dt>/<dd>-Verschachtelung exakt wie vom CSS
  // erwartet. Trenner ab dem zweiten Paar (.ep-facts > div + div,
  // css/components.css:1262): erstes Paar ohne oberen Rand, ab dem zweiten mit.
  play: async ({
    canvasElement
  }) => {
    const dl = canvasElement.querySelector('dl') as HTMLElement;
    await expect(dl).toHaveClass('ep-facts');
    await expect(dl).not.toHaveClass('is-grid');
    const pairs = Array.from(dl.children) as HTMLElement[];
    await expect(pairs).toHaveLength(4);
    for (const pair of pairs) {
      await expect(pair.tagName).toBe('DIV');
      await expect(pair.children).toHaveLength(2);
      await expect(pair.children[0].tagName).toBe('DT');
      await expect(pair.children[1].tagName).toBe('DD');
    }
    const dts = dl.querySelectorAll('dt');
    await expect(dts[0]).toHaveTextContent('Dauer');
    await expect(dts[0]).toHaveClass('t-wo');
    const dds = dl.querySelectorAll('dd');
    await expect(dds[0]).toHaveTextContent('2 Tage, 9 bis 17 Uhr');
    await expect(getComputedStyle(pairs[0]).borderTopWidth).toBe('0px');
    await expect(getComputedStyle(pairs[1]).borderTopWidth).not.toBe('0px');
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Als Raster',
  args: {
    grid: true
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  // Die Liste zieht in einen vorhandenen Kasten ein; die max-width sitzt deshalb am
  // umschließenden <div>, nicht am
  // cds-facts-Host — ein Custom-Element ohne eigenes display ist per UA-Stylesheet
  // inline, \`max-width\` griffe dort nicht (derselbe Grund wie ADR-0008 Fall 2).
  render: args => ({
    props: args,
    template: \`
      <div style="background:var(--bg-surface);border:var(--bd-strong);border-radius:var(--r-lg);padding:var(--s6);max-width:420px">
        <cds-facts [items]="items" [grid]="grid" [area]="area"></cds-facts>
      </div>
    \`
  }),
  // is-grid schaltet die Rasterung: zweispaltig ohne Haarlinien zwischen den
  // Paaren (css/components.css:1271–1272), auto-fit legt bei 420 px Kastenbreite
  // zwei Spalten an (2×140px + 20px Gap = 300px, drei Spalten passen mit 460px
  // nicht mehr).
  play: async ({
    canvasElement
  }) => {
    const dl = canvasElement.querySelector('dl') as HTMLElement;
    await expect(dl).toHaveClass('is-grid');
    await expect(getComputedStyle(dl).display).toBe('grid');
    const pairs = Array.from(dl.children) as HTMLElement[];
    await expect(getComputedStyle(pairs[1]).borderTopWidth).toBe('0px');
    const firstRect = pairs[0].getBoundingClientRect();
    const secondRect = pairs[1].getBoundingClientRect();
    await expect(secondRect.top).toBe(firstRect.top);
  }
}`,...f.parameters?.docs?.source}}}})))()}init_facts_stories();export{f as AlsRaster,d as Interaktiv,p as __namedExportsOrder,u as default};