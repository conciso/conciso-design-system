import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{B as n,D as r,G as i,O as a,P as o,Tn as s,bn as c,z as l}from"./angular-platform-BGeCprOl.js";var u,d;function init_section_component(){return(init_section_component=e((()=>{s(),r(),u=0,d=class SectionComponent{label=a(``);heading=a(``);sub=a(``);area=a();labelledBy=a(``);instance=++u;headingId=`cds-section-${this.instance}-heading`;ariaLabelledBy=o(()=>this.heading()?this.headingId:this.labelledBy()||null);labelClasses=o(()=>{let e=this.area();return e?`ep-section-label t-${e}`:`ep-section-label`});static propDecorators={label:[{type:i,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],heading:[{type:i,args:[{isSignal:!0,alias:`heading`,required:!1,transform:void 0}]}],sub:[{type:i,args:[{isSignal:!0,alias:`sub`,required:!1,transform:void 0}]}],area:[{type:i,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],labelledBy:[{type:i,args:[{isSignal:!0,alias:`labelledBy`,required:!1,transform:void 0}]}]}},d=c([n({selector:`section[cdsSection], div[cdsSection]`,changeDetection:l.OnPush,host:{class:`ep-section`,"[attr.aria-labelledby]":`ariaLabelledBy()`},template:`
    @if (label()) {
      <div [class]="labelClasses()">{{ label() }}</div>
    }
    @if (heading()) {
      <h2 class="ep-section-h2" [id]="headingId">{{ heading() }}</h2>
    }
    @if (sub()) {
      <p class="ep-section-sub">{{ sub() }}</p>
    }
    <ng-content></ng-content>
  `})],d)})))()}var f=t({BenanntVonAussen:()=>y,BereichsgefaerbtesLabel:()=>x,FlaecheAmHost:()=>S,Interaktiv:()=>_,NurUeberschrift:()=>b,OhneKopf:()=>v,__namedExportsOrder:()=>C,default:()=>h}),p,m,h,g,_,v,y,b,x,S,C;function init_section_stories(){return(init_section_stories=e((()=>{init_section_component(),{within:p,expect:m}=__STORYBOOK_MODULE_TEST__,h={title:`Komponenten/Sektion/Sektion`,component:d,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3855`},layout:`padded`,docs:{description:{component:'Strukturelles Grundgerüst einer Seiten-Sektion: `.ep-section` mit dem optionalen Kopf-Trio aus Kicker (`label`), Überschrift (`heading`) und Lead (`sub`). Alle drei sind Beiwerk, eine Sektion besteht auch nur aus ihrem projizierten Inhalt. Attributselektor `[cdsSection]` statt eigenem Element: `<section cdsSection>` oder `<div cdsSection>`, der Konsument wählt das Tag und entscheidet damit, ob die Sektion überhaupt eine `<section>`-Landmark werden kann; die Komponente setzt nur `aria-labelledby`, wenn ein zugänglicher Name verfügbar ist. Die Hintergrundfläche einer Sektion ist eine Seiten-Entscheidung (Flächen-Rhythmus zwischen Nachbar-Sektionen) und deshalb kein Input dieser Komponente, sitzt aber direkt am Host: `<section cdsSection style="background:…">`, kein umschließendes Element mehr nötig (siehe „Fläche am Host“).'}}},argTypes:{area:{control:`inline-radio`,options:[void 0,`co`,`ki`,`es`,`wo`]}},args:{label:`Was wir tun`,heading:`Drei Bereiche. Ein Maßstab.`,sub:`Sie stärken sich gegenseitig. Wir denken sie zusammen, nicht nebeneinander.`,area:`co`}},g=`font:var(--ty-body-md);color:var(--tx-secondary);margin:0`,_={render:e=>({props:e,template:`
      <section cdsSection [label]="label" [heading]="heading" [sub]="sub" [area]="area">
        <p style="${g}">Beliebiger Inhalt unterhalb des Kopfes, hier ein einfacher Absatz als Platzhalter.</p>
      </section>
    `}),play:async({canvasElement:e})=>{let t=p(e).getByRole(`region`,{name:`Drei Bereiche. Ein Maßstab.`});await m(t.tagName).toBe(`SECTION`)}},v={name:`Ohne Kopf`,parameters:{controls:{disable:!0}},render:()=>({template:`
      <div cdsSection>
        <p style="${g}">Eine Sektion besteht auch ganz ohne Kopf, nur aus ihrem projizierten Inhalt.</p>
      </div>
    `}),play:async({canvasElement:e})=>{let t=p(e);await m(t.queryByRole(`region`)).toBeNull();let n=e.querySelector(`.ep-section`);await m(n).not.toHaveAttribute(`aria-labelledby`),await m(t.getByText(`Eine Sektion besteht auch ganz ohne Kopf, nur aus ihrem projizierten Inhalt.`)).toBeInTheDocument()}},y={name:`Benannt von außen`,parameters:{controls:{disable:!0}},render:()=>({template:`
      <h2 id="story-section-externe-ueberschrift" style="font:var(--ty-headline-md);margin:0 0 var(--s4)">Externe Überschrift oberhalb der Sektion</h2>
      <section cdsSection labelledBy="story-section-externe-ueberschrift">
        <p style="${g}">Kein eigener Kopf, der zugängliche Name kommt von der Überschrift darüber.</p>
      </section>
    `}),play:async({canvasElement:e})=>{let t=p(e).getByRole(`region`,{name:`Externe Überschrift oberhalb der Sektion`});await m(t.tagName).toBe(`SECTION`)}},b={name:`Nur Überschrift`,parameters:{controls:{disable:!0}},args:{label:``,sub:``,area:void 0},render:e=>({props:e,template:`
      <section cdsSection [heading]="heading">
        <p style="${g}">Kicker und Lead bleiben hier leer, nur die Überschrift ist gesetzt.</p>
      </section>
    `})},x={name:`Bereichsgefärbtes Label`,parameters:{controls:{disable:!0}},render:()=>({template:`
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <section cdsSection label="Corporate" area="co" heading="Marke &amp; Haltung"></section>
        <section cdsSection label="AI.Applied" area="ki" heading="Angewandte KI"></section>
        <section cdsSection label="Effektive Software" area="es" heading="Schlanke Systeme"></section>
        <section cdsSection label="Wirksame Organisationen" area="wo" heading="Starke Teams"></section>
      </div>
    `})},S={name:`Fläche am Host`,parameters:{controls:{disable:!0}},render:()=>({template:`
      <section cdsSection heading="Getönte Fläche direkt am Host" style="background:var(--n-50);border-radius:var(--r-lg)">
        <p style="${g}">Kein umschließendes Element mehr nötig: style sitzt direkt auf dem Element, das cdsSection trägt.</p>
      </section>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`section.ep-section`);await m(t).not.toBeNull(),await m(t.getAttribute(`style`)).toContain(`background`)}},C=[`Interaktiv`,`OhneKopf`,`BenanntVonAussen`,`NurUeberschrift`,`BereichsgefaerbtesLabel`,`FlaecheAmHost`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`
      <section cdsSection [label]="label" [heading]="heading" [sub]="sub" [area]="area">
        <p style="\${bodyStyle}">Beliebiger Inhalt unterhalb des Kopfes, hier ein einfacher Absatz als Platzhalter.</p>
      </section>
    \`
  }),
  // Entscheidung 1 gepinnt: Mit gesetzter Überschrift bekommt die Sektion eine echte
  // region-Landmark, deren zugänglicher Name (via aria-labelledby) der gerenderten
  // .ep-section-h2 entspricht. Das Tag selbst (<section>) hat hier der Konsument
  // gewählt, nicht die Komponente.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const region = c.getByRole('region', {
      name: 'Drei Bereiche. Ein Maßstab.'
    });
    await expect(region.tagName).toBe('SECTION');
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Ohne Kopf',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Eine Sektion besteht auch ganz ohne Kopf, nur aus ihrem projizierten Inhalt. Hier
  // bewusst als <div cdsSection> geschrieben: ohne heading/labelledBy bekäme ein
  // <section> ohnehin keine Landmark-Rolle (Entscheidung 1 in der Klassendoku) — das
  // ist jetzt eine Entscheidung des Konsumenten am Tag, nicht mehr der Komponente.
  render: () => ({
    template: \`
      <div cdsSection>
        <p style="\${bodyStyle}">Eine Sektion besteht auch ganz ohne Kopf, nur aus ihrem projizierten Inhalt.</p>
      </div>
    \`
  }),
  // Entscheidung 1 gepinnt (Gegenprobe): kein aria-labelledby ohne Namen, der
  // projizierte Inhalt ist trotzdem da.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(c.queryByRole('region')).toBeNull();
    const host = canvasElement.querySelector('.ep-section');
    await expect(host).not.toHaveAttribute('aria-labelledby');
    await expect(c.getByText('Eine Sektion besteht auch ganz ohne Kopf, nur aus ihrem projizierten Inhalt.')).toBeInTheDocument();
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Benannt von außen',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Ohne eigene Überschrift kommt der zugängliche Name über labelledBy von einer
  // Überschrift AUSSERHALB der Komponente (siehe Entscheidung 1 in der Klassendoku).
  render: () => ({
    template: \`
      <h2 id="story-section-externe-ueberschrift" style="font:var(--ty-headline-md);margin:0 0 var(--s4)">Externe Überschrift oberhalb der Sektion</h2>
      <section cdsSection labelledBy="story-section-externe-ueberschrift">
        <p style="\${bodyStyle}">Kein eigener Kopf, der zugängliche Name kommt von der Überschrift darüber.</p>
      </section>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const region = c.getByRole('region', {
      name: 'Externe Überschrift oberhalb der Sektion'
    });
    await expect(region.tagName).toBe('SECTION');
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Nur Überschrift',
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    label: '',
    sub: '',
    area: undefined
  },
  render: args => ({
    props: args,
    template: \`
      <section cdsSection [heading]="heading">
        <p style="\${bodyStyle}">Kicker und Lead bleiben hier leer, nur die Überschrift ist gesetzt.</p>
      </section>
    \`
  })
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Bereichsgefärbtes Label',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    template: \`
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <section cdsSection label="Corporate" area="co" heading="Marke &amp; Haltung"></section>
        <section cdsSection label="AI.Applied" area="ki" heading="Angewandte KI"></section>
        <section cdsSection label="Effektive Software" area="es" heading="Schlanke Systeme"></section>
        <section cdsSection label="Wirksame Organisationen" area="wo" heading="Starke Teams"></section>
      </div>
    \`
  })
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Fläche am Host',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Ging mit dem Element-Selektor nicht (siehe ADR-0008, „Fall 2“: ein background auf
  // dem <cds-section>-Host wurde computed korrekt gemeldet, aber nie gemalt — der Host
  // war ein unbekanntes Custom Element, display:inline, mit einem Block-Kind darin).
  // Mit dem Attributselektor IST das Element, das den Style trägt, dasselbe Element,
  // das .ep-section trägt: kein umschließendes <div> mehr nötig.
  render: () => ({
    template: \`
      <section cdsSection heading="Getönte Fläche direkt am Host" style="background:var(--n-50);border-radius:var(--r-lg)">
        <p style="\${bodyStyle}">Kein umschließendes Element mehr nötig: style sitzt direkt auf dem Element, das cdsSection trägt.</p>
      </section>
    \`
  }),
  // Kein Wrapper-Element mehr zwischen dem style-Attribut und .ep-section: beides
  // sitzt auf demselben Knoten. Ob die Fläche auch tatsächlich GEMALT wird (nicht nur
  // computed korrekt gemeldet, siehe ADR-0008 „Fall 2“), zeigt die Baseline-PNG dieser
  // Story — das ist der Punkt, an dem Computed Styles/getBoundingClientRect laut
  // Messung versagt hatten, ein Screenshot nicht.
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector('section.ep-section') as HTMLElement;
    await expect(host).not.toBeNull();
    // style und .ep-section sitzen auf demselben Knoten, kein Wrapper mehr dazwischen.
    await expect(host.getAttribute('style')).toContain('background');
  }
}`,...S.parameters?.docs?.source}}}})))()}export{f as n,init_section_stories as t};