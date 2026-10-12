import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{A as n,H as r,I as i,Nt as a,V as o,fn as s,k as c,o as l,q as u,s as d,sn as f}from"./angular-platform-CAY__VLP.js";import{n as p,r as m}from"./icons-cAZQriMl.js";var h;function init_blockquote_component(){return(init_blockquote_component=e((()=>{s(),c(),d(),m(),h=class BlockquoteComponent{sanitizer=a(l);quote=n.required();name=n.required();roleLabel=n(``);area=n(`co`);quoteIcon=i(()=>this.sanitizer.bypassSecurityTrustHtml(p.body));static propDecorators={quote:[{type:u,args:[{isSignal:!0,alias:`quote`,required:!0,transform:void 0}]}],name:[{type:u,args:[{isSignal:!0,alias:`name`,required:!0,transform:void 0}]}],roleLabel:[{type:u,args:[{isSignal:!0,alias:`roleLabel`,required:!1,transform:void 0}]}],area:[{type:u,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}]}},h=f([r({selector:`cds-blockquote`,changeDetection:o.OnPush,template:`
    <figure class="bq" [attr.data-area]="area() || null">
      <svg
        class="bq-icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        [innerHTML]="quoteIcon()"
      ></svg>
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
  `})],h)})))()}var g=t({Interaktiv:()=>v,ProBereich:()=>y,__namedExportsOrder:()=>b,default:()=>_}),_,v,y,b;function init_blockquote_stories(){return(init_blockquote_stories=e((()=>{init_blockquote_component(),_={title:`Komponenten/Zitate & Testimonials/Blockquote`,component:h,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4419`},layout:`padded`,docs:{description:{component:`Hervorgehobenes Zitat mit Akzentlinie, Quote-Icon und optionaler Attribution (Name, Rolle). Je nach Themengebiet bereichsgefärbt. Für kurze, prägnante Aussagen im Textfluss.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]}},args:{quote:`Klare Kommunikation schafft Vertrauen, lange bevor das erste Meeting stattfindet.`,name:`Maria Schneider`,roleLabel:`Head of Marketing, Musterunternehmen GmbH`,area:`co`}},v={},y={name:`Je Bereich`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[h]},template:`
      <div style="display:grid;gap:24px;max-width:640px">
        <cds-blockquote area="co" quote="Klare Kommunikation schafft Vertrauen." name="A. Becker" roleLabel="CEO"></cds-blockquote>
        <cds-blockquote area="ki" quote="KI liefert ab Tag eins messbaren Mehrwert." name="S. Khan" roleLabel="Head of Data"></cds-blockquote>
        <cds-blockquote area="es" quote="Weniger Code, klarere Architektur." name="M. Lang" roleLabel="VP Engineering"></cds-blockquote>
        <cds-blockquote area="wo" quote="Teams, die lernen und sich anpassen." name="P. Adam" roleLabel="COO"></cds-blockquote>
      </div>
    `})},b=[`Interaktiv`,`ProBereich`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}}})))()}export{init_blockquote_stories as n,g as t};