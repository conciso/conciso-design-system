import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,Kt as i,O as a,P as o,Tn as s,bn as c,o as l,s as u,z as d}from"./angular-platform-BGeCprOl.js";import{n as f,t as p}from"./icons-BLev2C7b.js";var m;function init__virtual_angular_jit_style_inline_5094700f56d325c1(){return(init__virtual_angular_jit_style_inline_5094700f56d325c1=e((()=>{m=`:host{display:flex}`})))()}var h;function init__virtual_angular_jit_style_inline_c988c3fbd9884a97(){return(init__virtual_angular_jit_style_inline_c988c3fbd9884a97=e((()=>{h=`:host>.card{flex:1;min-width:0}`})))()}var g;function init_link_card_component(){return(init_link_card_component=e((()=>{s(),init__virtual_angular_jit_style_inline_5094700f56d325c1(),init__virtual_angular_jit_style_inline_c988c3fbd9884a97(),n(),u(),f(),g=class LinkCardComponent{sanitizer=i(l);title=a.required();text=a.required();href=a.required();eyebrow=a(``);area=a();showMedia=a(!0);ctaLabel=a(``);ctaPinned=a(!1);mediaSvg=o(()=>{let e=p[this.area()??`co`];return this.sanitizer.bypassSecurityTrustHtml(`<svg class="ico-48" viewBox="${e.viewBox}" fill="currentColor" aria-hidden="true" focusable="false">${e.body}</svg>`)});static propDecorators={title:[{type:r,args:[{isSignal:!0,alias:`title`,required:!0,transform:void 0}]}],text:[{type:r,args:[{isSignal:!0,alias:`text`,required:!0,transform:void 0}]}],href:[{type:r,args:[{isSignal:!0,alias:`href`,required:!0,transform:void 0}]}],eyebrow:[{type:r,args:[{isSignal:!0,alias:`eyebrow`,required:!1,transform:void 0}]}],area:[{type:r,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],showMedia:[{type:r,args:[{isSignal:!0,alias:`showMedia`,required:!1,transform:void 0}]}],ctaLabel:[{type:r,args:[{isSignal:!0,alias:`ctaLabel`,required:!1,transform:void 0}]}],ctaPinned:[{type:r,args:[{isSignal:!0,alias:`ctaPinned`,required:!1,transform:void 0}]}]}},g=c([t({selector:`cds-link-card`,changeDetection:d.OnPush,host:{"[attr.title]":`null`},template:`
    <a class="card card-elevated" [href]="href()" [attr.data-area]="area() || null">
      @if (showMedia()) {
        <div class="card-media" [innerHTML]="mediaSvg()"></div>
      }
      <div class="card-body">
        @if (eyebrow()) {
          <p class="card-eyebrow">{{ eyebrow() }}</p>
        }
        <h3 class="card-title">
          <span>{{ title() }}</span>
        </h3>
        <p class="card-text">{{ text() }}</p>
        @if (ctaLabel()) {
          <span class="card-cta-link" [class.card-cta-link--pinned]="ctaPinned()">
            {{ ctaLabel() }} <span aria-hidden="true">→</span>
          </span>
        }
      </div>
    </a>
  `,styles:[m,h]})],g)})))()}var _,v,y,b,x,S,C,w;function init_link_card_stories(){return(init_link_card_stories=e((()=>{init_link_card_component(),{within:_,userEvent:v,expect:y}=__STORYBOOK_MODULE_TEST__,b={title:`Komponenten/Cards & Teaser/Klickbare Karte`,component:g,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-2995`},layout:`padded`,docs:{description:{component:"Variante B der klickbaren Karte (`a.card.card-elevated`): die ganze Fläche ist ein `<a>` und trägt deshalb nach der Konvention „Elevation = Interaktivität“ (`CONTRIBUTING.md` §4) den Schatten, den `cds-card` bewusst nicht trägt. Struktur wie `cds-card` (Media/Eyebrow/Titel/Text), zusätzlich ein optionaler Fuß `.card-cta-link`, wahlweise unten an die Kartenunterkante angeheftet (`--pinned`) für gleich hohe Karten im Raster."}}},argTypes:{area:{control:`inline-radio`,options:[void 0,`co`,`ki`,`es`,`wo`]},showMedia:{control:`boolean`}},args:{eyebrow:`Angewandte KI`,title:`Warum 60 % der KI-Piloten nie in Produktion gehen`,text:`Demos überzeugen, Use-Cases scheitern. Was wir aus 200 Implementierungen gelernt haben.`,href:`#wissensbeitrag-ki-piloten`,area:`ki`,showMedia:!0,ctaLabel:`Beitrag lesen`,ctaPinned:!1}},x={play:async({canvasElement:e})=>{let t=_(e).getAllByRole(`link`);await y(t).toHaveLength(1);let n=t[0];await y(n.tagName).toBe(`A`),await y(n).toHaveAttribute(`href`,`#wissensbeitrag-ki-piloten`);let r=e.querySelector(`.card-cta-link`);await y(r?.tagName).toBe(`SPAN`),await y(r).not.toHaveClass(`card-cta-link--pinned`),await v.tab(),await y(n).toHaveFocus();let i=!1;n.addEventListener(`click`,e=>{i=!0,e.preventDefault()}),await v.keyboard(`{Enter}`),await y(i).toBe(!0)}},S={name:`Pro Bereich`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[g]},template:`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px">
        <cds-link-card area="co" eyebrow="Corporate" title="Marke &amp; Haltung"
          text="Ein konsistenter Auftritt über alle Berührungspunkte hinweg."
          href="#leistungen-marke" ctaLabel="Mehr erfahren"></cds-link-card>
        <cds-link-card area="ki" eyebrow="AI.Applied" title="KI, die wirkt"
          text="Angewandte KI-Lösungen mit echtem Geschäftsnutzen."
          href="#leistungen-ki" ctaLabel="Mehr erfahren"></cds-link-card>
        <cds-link-card area="es" eyebrow="Effektive Software" title="Schlanke Systeme"
          text="Weniger Code, klarere Architektur, schnellere Lieferung."
          href="#leistungen-es" ctaLabel="Mehr erfahren"></cds-link-card>
        <cds-link-card area="wo" eyebrow="Wirksame Organisationen" title="Starke Teams"
          text="Organisationen, die lernen und sich wirksam anpassen."
          href="#leistungen-wo" ctaLabel="Mehr erfahren"></cds-link-card>
      </div>
    `}),play:async({canvasElement:e})=>{let t=e.querySelectorAll(`cds-link-card`);await y(t).toHaveLength(4);for(let e of t)await y(e).not.toHaveAttribute(`title`)}},C={name:`Im Raster`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[g]},template:`
      <div class="layout-grid" style="align-items:stretch">
        <cds-link-card class="col-4" area="ki" eyebrow="Angewandte KI"
          title="Warum 60 % der KI-Piloten nie in Produktion gehen"
          text="Demos überzeugen, Use-Cases scheitern."
          href="#wissensbeitrag-ki-piloten" ctaLabel="Beitrag lesen" [ctaPinned]="true"></cds-link-card>
        <cds-link-card class="col-4" area="es" eyebrow="Effektive Software"
          title="Schlanke Architektur senkt Betriebskosten"
          text="Ein längerer Anreißer über zwei Zeilen, damit der Höhenunterschied zwischen den Karten sichtbar wird und --pinned trotzdem greift."
          href="#wissensbeitrag-architektur" ctaLabel="Beitrag lesen" [ctaPinned]="true"></cds-link-card>
        <cds-link-card class="col-4" area="wo"
          title="Teams, die sich selbst organisieren"
          text="Wie verteilte Verantwortung Entscheidungen beschleunigt."
          href="#wissensbeitrag-teams" ctaLabel="Beitrag lesen" [ctaPinned]="true"></cds-link-card>
      </div>
    `}),play:async({canvasElement:e})=>{let t=e.querySelectorAll(`.card-cta-link--pinned`);await y(t).toHaveLength(3);let n=Array.from(e.querySelectorAll(`a.card`)).map(e=>e.getBoundingClientRect().height);await y(new Set(n).size).toBe(1);let r=Array.from(t).map(e=>e.getBoundingClientRect().bottom);await y(new Set(r).size).toBe(1)}},w=[`Interaktiv`,`ProBereich`,`ImRaster`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  // Vier Entscheidungen gepinnt: (1) die ganze Fläche ist ein echtes <a> mit Ziel,
  // nicht ein <article> mit Klick-Handler, (2) es gibt genau EIN Link-Ziel im
  // Canvas — der CTA-Fuß ist ein <span>, kein verschachteltes zweites <a> — (3) das
  // <a> ist per Tab erreichbar, und (4) Enter aktiviert es wie jeden nativen Link.
  // Geprüft über einen abgefangenen click (nicht über echte Navigation: die würde
  // die Storybook-Seite selbst verlassen und den Testlauf abbrechen) —
  // preventDefault() verhindert dabei nur den Sprung, nicht die Aktivierung selbst.
  // Zusätzlich: ohne gesetztes ctaPinned bleibt der Modifier aus.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const links = c.getAllByRole('link');
    await expect(links).toHaveLength(1);
    const card = links[0];
    await expect(card.tagName).toBe('A');
    await expect(card).toHaveAttribute('href', '#wissensbeitrag-ki-piloten');
    const cta = canvasElement.querySelector('.card-cta-link');
    await expect(cta?.tagName).toBe('SPAN');
    await expect(cta).not.toHaveClass('card-cta-link--pinned');
    await userEvent.tab();
    await expect(card).toHaveFocus();
    let activated = false;
    card.addEventListener('click', event => {
      activated = true;
      event.preventDefault();
    });
    await userEvent.keyboard('{Enter}');
    await expect(activated).toBe(true);
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Pro Bereich',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [LinkCardComponent]
    },
    template: \`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px">
        <cds-link-card area="co" eyebrow="Corporate" title="Marke &amp; Haltung"
          text="Ein konsistenter Auftritt über alle Berührungspunkte hinweg."
          href="#leistungen-marke" ctaLabel="Mehr erfahren"></cds-link-card>
        <cds-link-card area="ki" eyebrow="AI.Applied" title="KI, die wirkt"
          text="Angewandte KI-Lösungen mit echtem Geschäftsnutzen."
          href="#leistungen-ki" ctaLabel="Mehr erfahren"></cds-link-card>
        <cds-link-card area="es" eyebrow="Effektive Software" title="Schlanke Systeme"
          text="Weniger Code, klarere Architektur, schnellere Lieferung."
          href="#leistungen-es" ctaLabel="Mehr erfahren"></cds-link-card>
        <cds-link-card area="wo" eyebrow="Wirksame Organisationen" title="Starke Teams"
          text="Organisationen, die lernen und sich wirksam anpassen."
          href="#leistungen-wo" ctaLabel="Mehr erfahren"></cds-link-card>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const hosts = canvasElement.querySelectorAll('cds-link-card');
    await expect(hosts).toHaveLength(4);
    for (const host of hosts) await expect(host).not.toHaveAttribute('title');
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Im Raster',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Drei Listing-Karten mit unterschiedlich langem Anreißer nebeneinander: der
  // Grid-Container zieht sie per align-items:stretch auf gleiche Höhe
  // (.card-body{flex:1} macht die Karte dehnbar), --pinned schiebt den CTA-Fuß in
  // jeder Karte trotzdem auf dieselbe Unterkante.
  render: () => ({
    moduleMetadata: {
      imports: [LinkCardComponent]
    },
    template: \`
      <div class="layout-grid" style="align-items:stretch">
        <cds-link-card class="col-4" area="ki" eyebrow="Angewandte KI"
          title="Warum 60 % der KI-Piloten nie in Produktion gehen"
          text="Demos überzeugen, Use-Cases scheitern."
          href="#wissensbeitrag-ki-piloten" ctaLabel="Beitrag lesen" [ctaPinned]="true"></cds-link-card>
        <cds-link-card class="col-4" area="es" eyebrow="Effektive Software"
          title="Schlanke Architektur senkt Betriebskosten"
          text="Ein längerer Anreißer über zwei Zeilen, damit der Höhenunterschied zwischen den Karten sichtbar wird und --pinned trotzdem greift."
          href="#wissensbeitrag-architektur" ctaLabel="Beitrag lesen" [ctaPinned]="true"></cds-link-card>
        <cds-link-card class="col-4" area="wo"
          title="Teams, die sich selbst organisieren"
          text="Wie verteilte Verantwortung Entscheidungen beschleunigt."
          href="#wissensbeitrag-teams" ctaLabel="Beitrag lesen" [ctaPinned]="true"></cds-link-card>
      </div>
    \`
  }),
  // --pinned erscheint auf allen drei Karten, sobald das Flag gesetzt ist. Die
  // dritte Karte hat bewusst keine Eyebrow und ist damit von Haus aus kürzer:
  // Titel und Anreißer sind per line-clamp/min-height auf feste Zeilen gebracht,
  // die Eyebrow nicht. Gleich hoch werden die Karten dann nur, wenn a.card die
  // vom Raster gestreckte Höhe des Hosts übernimmt.
  play: async ({
    canvasElement
  }) => {
    const pinned = canvasElement.querySelectorAll('.card-cta-link--pinned');
    await expect(pinned).toHaveLength(3);
    const heights = Array.from(canvasElement.querySelectorAll('a.card')).map(card => card.getBoundingClientRect().height);
    await expect(new Set(heights).size).toBe(1);
    const ctaBottoms = Array.from(pinned).map(cta => cta.getBoundingClientRect().bottom);
    await expect(new Set(ctaBottoms).size).toBe(1);
  }
}`,...C.parameters?.docs?.source}}}})))()}init_link_card_stories();export{C as ImRaster,x as Interaktiv,S as ProBereich,w as __namedExportsOrder,b as default};