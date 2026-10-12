import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,bn as o,z as s}from"./angular-platform-BGeCprOl.js";import{u as c}from"./lucide-angular-CTBwqO1y.js";import{n as l,t as u}from"./cds-icons-DtWH1HnJ.js";var d;function init_testimonial_component(){return(init_testimonial_component=e((()=>{a(),n(),l(),d=class TestimonialComponent{quote=i.required();name=i.required();roleLabel=i(``);area=i(`co`);iconStroke=u;static propDecorators={quote:[{type:r,args:[{isSignal:!0,alias:`quote`,required:!0,transform:void 0}]}],name:[{type:r,args:[{isSignal:!0,alias:`name`,required:!0,transform:void 0}]}],roleLabel:[{type:r,args:[{isSignal:!0,alias:`roleLabel`,required:!1,transform:void 0}]}],area:[{type:r,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}]}},d=o([t({selector:`cds-testimonial`,changeDetection:s.OnPush,imports:[c],template:`
    <figure class="testimonial" [attr.data-area]="area() || null">
      <svg lucideQuote class="testimonial-icon" [size]="24" [strokeWidth]="iconStroke"></svg>
      <blockquote>{{ quote() }}</blockquote>
      <figcaption class="testimonial-footer">
        <div>
          <p class="testimonial-name">{{ name() }}</p>
          <p class="testimonial-role">{{ roleLabel() }}</p>
        </div>
      </figcaption>
    </figure>
  `})],d)})))()}var f,p,m,h,g;function init_testimonial_stories(){return(init_testimonial_stories=e((()=>{init_testimonial_component(),{expect:f}=__STORYBOOK_MODULE_TEST__,p={title:`Komponenten/Zitate & Testimonials/Testimonial`,component:d,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4458`},layout:`padded`,docs:{description:{component:`Kundenstimme als Karte: Zitat mit Quote-Icon und Attribution (Name und Rolle) im Footer. Semantisch korrektes figure/blockquote/figcaption-Muster, je nach Themengebiet bereichsgefärbt.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]}},args:{quote:`Conciso hat unsere Plattform spürbar verschlankt: weniger Code, klarere Prozesse, zufriedenere Teams.`,name:`Dr. Maria Schmidt`,roleLabel:`CTO, Beispiel GmbH`,area:`co`}},m={play:async({canvasElement:e})=>{let t=e.querySelector(`svg.testimonial-icon`);await f(t).toHaveClass(`lucide-quote`),await f(t).toHaveAttribute(`aria-hidden`,`true`),await f(getComputedStyle(t).fill).not.toBe(`none`),await f(getComputedStyle(t).transform).toBe(`matrix(0.6, 0, 0, 0.6, 0, 0)`)}},h={name:`Je Bereich`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[d]},template:`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
        <cds-testimonial area="co" name="A. Becker" roleLabel="CEO"
          quote="Ein Auftritt, auf den wir stolz sind: klar, konsistent, professionell."></cds-testimonial>
        <cds-testimonial area="ki" name="S. Khan" roleLabel="Head of Data"
          quote="Die KI-Lösung liefert seit Tag eins messbaren Mehrwert."></cds-testimonial>
        <cds-testimonial area="es" name="M. Lang" roleLabel="VP Engineering"
          quote="Weniger technische Schulden, schnellere Releases, genau wie versprochen."></cds-testimonial>
      </div>
    `})},g=[`Interaktiv`,`ProBereich`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  // Zitat-Icon: gefülltes Lucide-Quote (ADR-0016) — dekorativ, Füllung per CSS-Klasse (currentColor).
  play: async ({
    canvasElement
  }) => {
    const icon = canvasElement.querySelector('svg.testimonial-icon') as SVGElement;
    await expect(icon).toHaveClass('lucide-quote');
    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    await expect(getComputedStyle(icon).fill).not.toBe('none');
    // Optische Größe: per transform auf 60 % skaliert, Layoutmaße bleiben.
    await expect(getComputedStyle(icon).transform).toBe('matrix(0.6, 0, 0, 0.6, 0, 0)');
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Je Bereich',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [TestimonialComponent]
    },
    template: \`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
        <cds-testimonial area="co" name="A. Becker" roleLabel="CEO"
          quote="Ein Auftritt, auf den wir stolz sind: klar, konsistent, professionell."></cds-testimonial>
        <cds-testimonial area="ki" name="S. Khan" roleLabel="Head of Data"
          quote="Die KI-Lösung liefert seit Tag eins messbaren Mehrwert."></cds-testimonial>
        <cds-testimonial area="es" name="M. Lang" roleLabel="VP Engineering"
          quote="Weniger technische Schulden, schnellere Releases, genau wie versprochen."></cds-testimonial>
      </div>
    \`
  })
}`,...h.parameters?.docs?.source}}}})))()}init_testimonial_stories();export{m as Interaktiv,h as ProBereich,g as __namedExportsOrder,p as default};