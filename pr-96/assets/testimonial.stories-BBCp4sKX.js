import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,I as r,Nt as i,V as a,fn as o,k as s,o as c,q as l,s as u,sn as d}from"./angular-platform-CAY__VLP.js";import{n as f,r as p}from"./icons-cAZQriMl.js";var m;function init_testimonial_component(){return(init_testimonial_component=e((()=>{o(),s(),u(),p(),m=class TestimonialComponent{sanitizer=i(c);quote=t.required();name=t.required();roleLabel=t(``);area=t(`co`);quoteIcon=r(()=>this.sanitizer.bypassSecurityTrustHtml(f.body));static propDecorators={quote:[{type:l,args:[{isSignal:!0,alias:`quote`,required:!0,transform:void 0}]}],name:[{type:l,args:[{isSignal:!0,alias:`name`,required:!0,transform:void 0}]}],roleLabel:[{type:l,args:[{isSignal:!0,alias:`roleLabel`,required:!1,transform:void 0}]}],area:[{type:l,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}]}},m=d([n({selector:`cds-testimonial`,changeDetection:a.OnPush,template:`
    <figure class="testimonial" [attr.data-area]="area() || null">
      <!-- ui-quote aus @conciso/design-system/icons. -->
      <svg
        class="testimonial-icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        [innerHTML]="quoteIcon()"
      ></svg>
      <blockquote>{{ quote() }}</blockquote>
      <figcaption class="testimonial-footer">
        <div>
          <p class="testimonial-name">{{ name() }}</p>
          <p class="testimonial-role">{{ roleLabel() }}</p>
        </div>
      </figcaption>
    </figure>
  `})],m)})))()}var h,g,_,v;function init_testimonial_stories(){return(init_testimonial_stories=e((()=>{init_testimonial_component(),h={title:`Komponenten/Zitate & Testimonials/Testimonial`,component:m,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4458`},layout:`padded`,docs:{description:{component:`Kundenstimme als Karte: Zitat mit Quote-Icon und Attribution (Name und Rolle) im Footer. Semantisch korrektes figure/blockquote/figcaption-Muster, je nach Themengebiet bereichsgefärbt.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]}},args:{quote:`Conciso hat unsere Plattform spürbar verschlankt: weniger Code, klarere Prozesse, zufriedenere Teams.`,name:`Dr. Maria Schmidt`,roleLabel:`CTO, Beispiel GmbH`,area:`co`}},g={},_={name:`Je Bereich`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[m]},template:`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
        <cds-testimonial area="co" name="A. Becker" roleLabel="CEO"
          quote="Ein Auftritt, auf den wir stolz sind: klar, konsistent, professionell."></cds-testimonial>
        <cds-testimonial area="ki" name="S. Khan" roleLabel="Head of Data"
          quote="Die KI-Lösung liefert seit Tag eins messbaren Mehrwert."></cds-testimonial>
        <cds-testimonial area="es" name="M. Lang" roleLabel="VP Engineering"
          quote="Weniger technische Schulden, schnellere Releases, genau wie versprochen."></cds-testimonial>
      </div>
    `})},v=[`Interaktiv`,`ProBereich`],g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}}})))()}init_testimonial_stories();export{g as Interaktiv,_ as ProBereich,v as __namedExportsOrder,h as default};