import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{B as n,D as r,G as i,O as a,P as o,Tn as s,bn as c,j as l,q as u,z as d}from"./angular-platform-BGeCprOl.js";var f;function init_cta_band_component(){return(init_cta_band_component=e((()=>{s(),r(),f=class CtaBandComponent{heading=a.required();primaryLabel=a.required();sub=a(``);area=a(`co`);primaryHref=a(``);primaryClick=l();actionClasses=o(()=>`btn btn-filled btn-${this.area()} btn-on-band`);static propDecorators={heading:[{type:i,args:[{isSignal:!0,alias:`heading`,required:!0,transform:void 0}]}],primaryLabel:[{type:i,args:[{isSignal:!0,alias:`primaryLabel`,required:!0,transform:void 0}]}],sub:[{type:i,args:[{isSignal:!0,alias:`sub`,required:!1,transform:void 0}]}],area:[{type:i,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],primaryHref:[{type:i,args:[{isSignal:!0,alias:`primaryHref`,required:!1,transform:void 0}]}],primaryClick:[{type:u,args:[`primaryClick`]}]}},f=c([n({selector:`div[cdsCtaBand]`,changeDetection:d.OnPush,host:{class:`ep-cta-band`},template:`
    <h2 class="ep-cta-h2">{{ heading() }}</h2>
    @if (sub()) {
      <p class="ep-cta-sub">{{ sub() }}</p>
    }
    @if (primaryHref()) {
      <a [class]="actionClasses()" [href]="primaryHref()">{{ primaryLabel() }}</a>
    } @else {
      <button [class]="actionClasses()" type="button" (click)="primaryClick.emit($event)">
        {{ primaryLabel() }}
      </button>
    }
  `})],f)})))()}var p=t({AlsLinks:()=>S,Interaktiv:()=>b,ProBereich:()=>x,__namedExportsOrder:()=>C,default:()=>y}),m,h,g,_,v,y,b,x,S,C;function init_cta_band_stories(){return(init_cta_band_stories=e((()=>{init_cta_band_component(),{within:m,userEvent:h,expect:g,fn:_}=__STORYBOOK_MODULE_TEST__,v=`'var(--' + area + (area === 'ki' ? '-800' : '-700') + ')'`,y={title:`Komponenten/Call to Action/CTA-Band`,component:f,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3889`},layout:`padded`,docs:{description:{component:'Das bereichsgefärbte Page-End-CTA-Band (`.ep-cta-band`, css/components.css:1456): letzte Einladung am Ende jeder Customer-Page, direkt vor dem Footer. Attributselektor `[cdsCtaBand]` statt eigenem Element: die Bandfläche sitzt als Inline-Style direkt am `<div cdsCtaBand style="background:…">`, genau wie im Mockup, ein Element-Selektor würde denselben „Fläche am Host“-Fehler wiederholen, den ADR-0008 für `cds-section` gemessen hat. `area` färbt deshalb nur die Aktion (`.btn-{area}`), nicht das Band selbst. Die Aktion ist ein echter `<a href>`, wenn `primaryHref` gesetzt ist, sonst ein `<button>` mit `primaryClick`, nie ein `<a>` ohne Ziel. Bewusst nur EINE Aktion: keines der 22 Mockup-Vorkommen zeigt eine zweite, und `.btn-on-band` lässt sich mit den vorhandenen CSS-Klassen ohnehin nicht in einer zurückhaltenderen Variante bauen (siehe Klassendoku, Entscheidung 4). Die Aktion komponiert `.btn-filled` + `.btn-on-band` direkt (nicht über `cds-button`, das keinen `href` kennt) und zentriert sich über das ererbte `.ep-cta-band{text-align:center}`, kein zusätzliches Layout im Wrapper.'}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]}},args:{heading:`Erstgespräch, 30 Minuten, kostenfrei.`,sub:`Du schilderst Dein Vorhaben, wir geben eine erste Einschätzung. Wenn es passt, sprechen wir über konkrete Schritte. Wenn nicht, war es trotzdem nützlich.`,area:`co`,primaryLabel:`Termin buchen`,primaryHref:``,primaryClick:_()}},b={parameters:{a11y:{test:`todo`}},render:e=>({props:e,template:`
      <div
        cdsCtaBand
        [heading]="heading"
        [sub]="sub"
        [area]="area"
        [primaryLabel]="primaryLabel"
        [primaryHref]="primaryHref"
        (primaryClick)="primaryClick($event)"
        [style.background]="${v}"
        style="color:#fff;border-radius:var(--r-lg)"
      ></div>
    `}),play:async({canvasElement:e,args:t})=>{let n=m(e),r=e.querySelector(`.ep-cta-band`);await g(r).not.toBeNull(),await g(r.tagName).toBe(`DIV`),await g(e.querySelector(`.ep-cta-h2`)).toHaveTextContent(`Erstgespräch, 30 Minuten, kostenfrei.`);let i=n.getByRole(`button`,{name:`Termin buchen`});await h.click(i),await g(t.primaryClick).toHaveBeenCalledTimes(1),await g(n.queryAllByRole(`button`)).toHaveLength(1),await g(n.queryAllByRole(`link`)).toHaveLength(0)}},x={name:`Pro Bereich`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[f]},template:`
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <div cdsCtaBand heading="Erstgespräch, 30 Minuten, kostenfrei." primaryLabel="Termin buchen" area="co" style="background:var(--co-700);color:#fff;border-radius:var(--r-lg)"></div>
        <div cdsCtaBand heading="Wo steht Ihr KI-Piloten-Portfolio wirklich?" sub="Ein kurzes Gespräch zeigt, welche Anwendungsfälle sich lohnen und welche eher nicht." primaryLabel="Potenzial einschätzen lassen" area="ki" style="background:var(--ki-800);color:#fff;border-radius:var(--r-lg)"></div>
        <div cdsCtaBand heading="Lernen wir uns kennen?" sub="Erzähl uns, was Du vorhast." primaryLabel="Gespräch anfragen" area="es" style="background:var(--es-700);color:#fff;border-radius:var(--r-lg)"></div>
        <div cdsCtaBand heading="Drei Muster, an denen Veränderung scheitert." sub="Wir zeigen in einem kurzen Termin, woran es in Ihrer Organisation konkret hakt, und was ein erster wirksamer Schritt wäre." primaryLabel="Termin vereinbaren" area="wo" style="background:var(--wo-700);color:#fff;border-radius:var(--r-lg)"></div>
      </div>
    `})},S={name:`Als Links`,args:{heading:`Lernen wir uns kennen?`,sub:`Erzähl uns, was Du vorhast, oder komm in Dortmund auf einen Kaffee vorbei.`,primaryLabel:`Gespräch anfragen`,primaryHref:`#sec-examples`},parameters:{a11y:{test:`todo`}},render:e=>({props:e,template:`
      <div
        cdsCtaBand
        [heading]="heading"
        [sub]="sub"
        [area]="area"
        [primaryLabel]="primaryLabel"
        [primaryHref]="primaryHref"
        (primaryClick)="primaryClick($event)"
        [style.background]="${v}"
        style="color:#fff;border-radius:var(--r-lg)"
      ></div>
    `}),play:async({canvasElement:e})=>{let t=m(e);await g(t.queryAllByRole(`button`)).toHaveLength(0);let n=t.getByRole(`link`,{name:`Gespräch anfragen`});await g(n.tagName).toBe(`A`),await g(n).toHaveAttribute(`href`,`#sec-examples`)}},C=[`Interaktiv`,`ProBereich`,`AlsLinks`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  // Bekannter CSS-Kern-Befund, kein Wrapper-Artefakt:
  // \`.ep-cta-sub\` (opacity:.85, css/components.css:1458) unterschreitet auf --co-700
  // den AA-Kontrast (gerechnet mit der WCAG-Formel gegen die Token-Werte: 4,46:1 statt
  // 4,5:1 — Weiß bei 85% Deckkraft ergibt #d9eaea auf #007575). Auf ki-800/es-700/
  // wo-700 liegt derselbe Text bei 6,1–7,4:1: co ist hier der systematische Ausreißer,
  // genau wie beim bekannten Befund zu \`.cta-dl-eyebrow\` in download-cta.stories.ts.
  // Der Fehler liegt nicht am Wrapper. Der Fix gehört in den CSS-Kern, nicht in diese
  // Komponente.
  parameters: {
    a11y: {
      test: 'todo'
    }
  },
  render: args => ({
    props: args,
    template: \`
      <div
        cdsCtaBand
        [heading]="heading"
        [sub]="sub"
        [area]="area"
        [primaryLabel]="primaryLabel"
        [primaryHref]="primaryHref"
        (primaryClick)="primaryClick($event)"
        [style.background]="\${bandBackground}"
        style="color:#fff;border-radius:var(--r-lg)"
      ></div>
    \`
  }),
  // .ep-cta-band sitzt auf dem Host (ein <div>), kein Wrapper darunter. Ohne
  // primaryHref (Default '') rendert ein <button>, der primaryClick feuert. Die
  // Aktion zentriert sich ohne eigenes Layout über das ererbte text-align:center.
  play: async ({
    canvasElement,
    args
  }) => {
    const c = within(canvasElement);
    const band = canvasElement.querySelector('.ep-cta-band') as HTMLElement;
    await expect(band).not.toBeNull();
    await expect(band.tagName).toBe('DIV');
    await expect(canvasElement.querySelector('.ep-cta-h2')).toHaveTextContent('Erstgespräch, 30 Minuten, kostenfrei.');
    const btn = c.getByRole('button', {
      name: 'Termin buchen'
    });
    await userEvent.click(btn);
    await expect(args.primaryClick).toHaveBeenCalledTimes(1);
    await expect(c.queryAllByRole('button')).toHaveLength(1);
    await expect(c.queryAllByRole('link')).toHaveLength(0);
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Pro Bereich',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Absichtlich unterschiedlich lange Unterzeilen (Regressionsschutz-Konvention): mit
  // gleich langen Texten bliebe ein gebrochener Zeilenumbruch unsichtbar.
  render: () => ({
    moduleMetadata: {
      imports: [CtaBandComponent]
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:var(--s6)">
        <div cdsCtaBand heading="Erstgespräch, 30 Minuten, kostenfrei." primaryLabel="Termin buchen" area="co" style="background:var(--co-700);color:#fff;border-radius:var(--r-lg)"></div>
        <div cdsCtaBand heading="Wo steht Ihr KI-Piloten-Portfolio wirklich?" sub="Ein kurzes Gespräch zeigt, welche Anwendungsfälle sich lohnen und welche eher nicht." primaryLabel="Potenzial einschätzen lassen" area="ki" style="background:var(--ki-800);color:#fff;border-radius:var(--r-lg)"></div>
        <div cdsCtaBand heading="Lernen wir uns kennen?" sub="Erzähl uns, was Du vorhast." primaryLabel="Gespräch anfragen" area="es" style="background:var(--es-700);color:#fff;border-radius:var(--r-lg)"></div>
        <div cdsCtaBand heading="Drei Muster, an denen Veränderung scheitert." sub="Wir zeigen in einem kurzen Termin, woran es in Ihrer Organisation konkret hakt, und was ein erster wirksamer Schritt wäre." primaryLabel="Termin vereinbaren" area="wo" style="background:var(--wo-700);color:#fff;border-radius:var(--r-lg)"></div>
      </div>
    \`
  })
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Als Links',
  args: {
    heading: 'Lernen wir uns kennen?',
    sub: 'Erzähl uns, was Du vorhast, oder komm in Dortmund auf einen Kaffee vorbei.',
    primaryLabel: 'Gespräch anfragen',
    primaryHref: '#sec-examples'
  },
  // Derselbe bekannte CSS-Kern-Befund wie in „Interaktiv“ (co-700 + .ep-cta-sub).
  parameters: {
    a11y: {
      test: 'todo'
    }
  },
  render: args => ({
    props: args,
    template: \`
      <div
        cdsCtaBand
        [heading]="heading"
        [sub]="sub"
        [area]="area"
        [primaryLabel]="primaryLabel"
        [primaryHref]="primaryHref"
        (primaryClick)="primaryClick($event)"
        [style.background]="\${bandBackground}"
        style="color:#fff;border-radius:var(--r-lg)"
      ></div>
    \`
  }),
  // Gesetztes Href → echter <a> MIT Ziel, nie ein <a> ohne href (kein
  // klickbar aussehender, aber nicht fokussierbarer Fake-Link).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(c.queryAllByRole('button')).toHaveLength(0);
    const primary = c.getByRole('link', {
      name: 'Gespräch anfragen'
    });
    await expect(primary.tagName).toBe('A');
    await expect(primary).toHaveAttribute('href', '#sec-examples');
  }
}`,...S.parameters?.docs?.source}}}})))()}export{init_cta_band_stories as n,p as t};