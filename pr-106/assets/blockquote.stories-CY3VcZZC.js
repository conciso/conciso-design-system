import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{B as n,D as r,G as i,O as a,Tn as o,bn as s,z as c}from"./angular-platform-BGeCprOl.js";import{u as l}from"./lucide-angular-CTBwqO1y.js";import{n as u,t as d}from"./cds-icons-DtWH1HnJ.js";var f;function init_blockquote_component(){return(init_blockquote_component=e((()=>{o(),r(),u(),f=class BlockquoteComponent{quote=a.required();name=a.required();roleLabel=a(``);area=a(`co`);iconStroke=d;static propDecorators={quote:[{type:i,args:[{isSignal:!0,alias:`quote`,required:!0,transform:void 0}]}],name:[{type:i,args:[{isSignal:!0,alias:`name`,required:!0,transform:void 0}]}],roleLabel:[{type:i,args:[{isSignal:!0,alias:`roleLabel`,required:!1,transform:void 0}]}],area:[{type:i,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}]}},f=s([n({selector:`cds-blockquote`,changeDetection:c.OnPush,imports:[l],template:`
    <figure class="bq" [attr.data-area]="area() || null">
      <svg lucideQuote class="bq-icon" [size]="24" [strokeWidth]="iconStroke"></svg>
      <blockquote>{{ quote() }}</blockquote>
      @if (name() || roleLabel()) {
        <figcaption class="bq-caption">
          @if (name()) {
            <span class="bq-name">{{ name() }}</span>
          }
          @if (roleLabel()) {
            <span class="bq-role">{{ roleLabel() }}</span>
          }
        </figcaption>
      }
    </figure>
  `})],f)})))()}var p=t({Interaktiv:()=>g,ProBereich:()=>_,__namedExportsOrder:()=>v,default:()=>h}),m,h,g,_,v;function init_blockquote_stories(){return(init_blockquote_stories=e((()=>{init_blockquote_component(),{expect:m}=__STORYBOOK_MODULE_TEST__,h={title:`Komponenten/Zitate & Testimonials/Blockquote`,component:f,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4419`},layout:`padded`,docs:{description:{component:`Hervorgehobenes Zitat mit Akzentlinie, Quote-Icon und optionaler Attribution (Name, Rolle). Je nach Themengebiet bereichsgefärbt. Für kurze, prägnante Aussagen im Textfluss.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]}},args:{quote:`Klare Kommunikation schafft Vertrauen, lange bevor das erste Meeting stattfindet.`,name:`Maria Schneider`,roleLabel:`Head of Marketing, Musterunternehmen GmbH`,area:`co`}},g={play:async({canvasElement:e})=>{let t=e.querySelector(`svg.bq-icon`);await m(t).toHaveClass(`lucide-quote`),await m(t).toHaveAttribute(`aria-hidden`,`true`),await m(getComputedStyle(t).fill).not.toBe(`none`),await m(getComputedStyle(t).transform).toBe(`matrix(0.6, 0, 0, 0.6, 0, 0)`)}},_={name:`Je Bereich`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[f]},template:`
      <div style="display:grid;gap:24px;max-width:640px">
        <cds-blockquote area="co" quote="Klare Kommunikation schafft Vertrauen." name="A. Becker" roleLabel="CEO"></cds-blockquote>
        <cds-blockquote area="ki" quote="KI liefert ab Tag eins messbaren Mehrwert." name="S. Khan" roleLabel="Head of Data"></cds-blockquote>
        <cds-blockquote area="es" quote="Weniger Code, klarere Architektur." name="M. Lang" roleLabel="VP Engineering"></cds-blockquote>
        <cds-blockquote area="wo" quote="Teams, die lernen und sich anpassen." name="P. Adam" roleLabel="COO"></cds-blockquote>
      </div>
    `})},v=[`Interaktiv`,`ProBereich`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  // Zitat-Icon: gefülltes Lucide-Quote (ADR-0016) — dekorativ, Füllung per CSS-Klasse (currentColor).
  play: async ({
    canvasElement
  }) => {
    const icon = canvasElement.querySelector('svg.bq-icon') as SVGElement;
    await expect(icon).toHaveClass('lucide-quote');
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    await expect(getComputedStyle(icon).fill).not.toBe('none');
    // Optische Größe: per transform auf 60 % skaliert, Layoutmaße bleiben.
    await expect(getComputedStyle(icon).transform).toBe('matrix(0.6, 0, 0, 0.6, 0, 0)');
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Je Bereich',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [BlockquoteComponent]
    },
    template: \`
      <div style="display:grid;gap:24px;max-width:640px">
        <cds-blockquote area="co" quote="Klare Kommunikation schafft Vertrauen." name="A. Becker" roleLabel="CEO"></cds-blockquote>
        <cds-blockquote area="ki" quote="KI liefert ab Tag eins messbaren Mehrwert." name="S. Khan" roleLabel="Head of Data"></cds-blockquote>
        <cds-blockquote area="es" quote="Weniger Code, klarere Architektur." name="M. Lang" roleLabel="VP Engineering"></cds-blockquote>
        <cds-blockquote area="wo" quote="Teams, die lernen und sich anpassen." name="P. Adam" roleLabel="COO"></cds-blockquote>
      </div>
    \`
  })
}`,..._.parameters?.docs?.source}}}})))()}export{init_blockquote_stories as n,p as t};