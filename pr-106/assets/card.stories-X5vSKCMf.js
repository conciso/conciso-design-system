import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{B as n,D as r,G as i,Kt as a,O as o,P as s,Tn as c,bn as l,j as u,o as d,q as f,s as p,z as m}from"./angular-platform-BGeCprOl.js";import{n as h,t as g}from"./icons-BLev2C7b.js";var _;function init_card_component(){return(init_card_component=e((()=>{c(),r(),p(),h(),_=class CardComponent{sanitizer=a(d);eyebrow=o(``);title=o.required();text=o.required();area=o();showMedia=o(!0);actionLabel=o(``);actionClick=u();actionClasses=s(()=>`btn btn-text btn-sm btn-${this.area()??`co`}`);mediaSvg=s(()=>{let e=g[this.area()??`co`];return this.sanitizer.bypassSecurityTrustHtml(`<svg class="ico-48" viewBox="${e.viewBox}" fill="currentColor" aria-hidden="true" focusable="false">${e.body}</svg>`)});static propDecorators={eyebrow:[{type:i,args:[{isSignal:!0,alias:`eyebrow`,required:!1,transform:void 0}]}],title:[{type:i,args:[{isSignal:!0,alias:`title`,required:!0,transform:void 0}]}],text:[{type:i,args:[{isSignal:!0,alias:`text`,required:!0,transform:void 0}]}],area:[{type:i,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],showMedia:[{type:i,args:[{isSignal:!0,alias:`showMedia`,required:!1,transform:void 0}]}],actionLabel:[{type:i,args:[{isSignal:!0,alias:`actionLabel`,required:!1,transform:void 0}]}],actionClick:[{type:f,args:[`actionClick`]}]}},_=l([n({selector:`cds-card`,changeDetection:m.OnPush,host:{"[attr.title]":`null`},template:`
    <article class="card" [attr.data-area]="area() || null">
      @if (showMedia()) {
        <div class="card-media" [innerHTML]="mediaSvg()"></div>
      }
      <div class="card-body">
        @if (eyebrow()) {
          <p class="card-eyebrow">{{ eyebrow() }}</p>
        }
        @if (title()) {
          <h3 class="card-title">
            <span>{{ title() }}</span>
          </h3>
        }
        @if (text()) {
          <p class="card-text">{{ text() }}</p>
        }
        <ng-content></ng-content>
      </div>
      @if (actionLabel()) {
        <div class="card-footer">
          <button [class]="actionClasses()" type="button" (click)="actionClick.emit()">
            {{ actionLabel() }}
          </button>
        </div>
      }
    </article>
  `})],_)})))()}var v=t({FooterAktion:()=>T,FreierInhalt:()=>O,Interaktiv:()=>w,OhneMedien:()=>D,ProBereich:()=>E,__namedExportsOrder:()=>k,default:()=>C}),y,b,x,S,C,w,T,E,D,O,k;function init_card_stories(){return(init_card_stories=e((()=>{init_card_component(),{within:y,userEvent:b,expect:x,fn:S}=__STORYBOOK_MODULE_TEST__,C={title:`Komponenten/Cards & Teaser/Card`,component:_,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-2865`},layout:`padded`,docs:{description:{component:`Generische Teaser-Karte für Inhalte mit optionalem Medienbereich, Eyebrow, Titel, Text und Fußzeilen-Aktion, farblich an jede Brand Area angepasst. Sie ruht flach mit Rahmen: Schatten tragen nach der Konvention „Elevation = Interaktivität“ nur Karten, deren Fläche selbst ein Link ist.`}}},argTypes:{area:{control:`inline-radio`,options:[void 0,`co`,`ki`,`es`,`wo`]},showMedia:{control:`boolean`}},args:{eyebrow:`Insights`,title:`Effektive Software für den Mittelstand`,text:`Wie schlanke Architektur und klare Prozesse messbar Zeit und Kosten sparen.`,area:`es`,showMedia:!0,actionLabel:`Mehr erfahren`}},w={},T={name:`Footer-Aktion`,parameters:{controls:{disable:!0}},args:{actionClick:S()},play:async({canvasElement:e,args:t})=>{let n=y(e);await b.click(n.getByRole(`button`,{name:`Mehr erfahren`})),await x(t.actionClick).toHaveBeenCalledTimes(1)}},E={name:`Eine Karte je Bereich`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[_]},template:`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px">
        <cds-card area="co" eyebrow="Corporate" title="Marke & Haltung"
          text="Ein konsistenter Auftritt über alle Berührungspunkte hinweg."></cds-card>
        <cds-card area="ki" eyebrow="AI.Applied" title="KI, die wirkt"
          text="Angewandte KI-Lösungen mit echtem Geschäftsnutzen."></cds-card>
        <cds-card area="es" eyebrow="Eff. Software" title="Schlanke Systeme"
          text="Weniger Code, klarere Architektur, schnellere Lieferung."></cds-card>
        <cds-card area="wo" eyebrow="Wirks. Orga" title="Starke Teams"
          text="Organisationen, die lernen und sich wirksam anpassen."></cds-card>
      </div>
    `}),play:async({canvasElement:e})=>{let t=e.querySelectorAll(`cds-card`);await x(t).toHaveLength(4);for(let e of t)await x(e).not.toHaveAttribute(`title`)}},D={name:`Ohne Medienfläche`,args:{showMedia:!1,area:`co`,eyebrow:`Hinweis`}},O={name:`Freier Inhalt (ng-content)`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},render:()=>({moduleMetadata:{imports:[_]},template:`
      <cds-card
        area="ki"
        title="Projektstatus"
        [text]="''"
        [actionLabel]="''"
        [showMedia]="false"
        style="max-width:320px"
      >
        <ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--s2);font:var(--ty-body-md)">
          <li style="display:flex;justify-content:space-between"><span>Offen</span><strong>12</strong></li>
          <li style="display:flex;justify-content:space-between"><span>In Arbeit</span><strong>5</strong></li>
          <li style="display:flex;justify-content:space-between"><span>Erledigt</span><strong>28</strong></li>
        </ul>
      </cds-card>
    `})},k=[`Interaktiv`,`FooterAktion`,`ProBereich`,`OhneMedien`,`FreierInhalt`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Footer-Aktion',
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    actionClick: fn()
  },
  // Klick auf die Footer-Aktion feuert actionClick.
  play: async ({
    canvasElement,
    args
  }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', {
      name: 'Mehr erfahren'
    }));
    await expect(args.actionClick).toHaveBeenCalledTimes(1);
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Eine Karte je Bereich',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [CardComponent]
    },
    template: \`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px">
        <cds-card area="co" eyebrow="Corporate" title="Marke & Haltung"
          text="Ein konsistenter Auftritt über alle Berührungspunkte hinweg."></cds-card>
        <cds-card area="ki" eyebrow="AI.Applied" title="KI, die wirkt"
          text="Angewandte KI-Lösungen mit echtem Geschäftsnutzen."></cds-card>
        <cds-card area="es" eyebrow="Eff. Software" title="Schlanke Systeme"
          text="Weniger Code, klarere Architektur, schnellere Lieferung."></cds-card>
        <cds-card area="wo" eyebrow="Wirks. Orga" title="Starke Teams"
          text="Organisationen, die lernen und sich wirksam anpassen."></cds-card>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const hosts = canvasElement.querySelectorAll('cds-card');
    await expect(hosts).toHaveLength(4);
    for (const host of hosts) await expect(host).not.toHaveAttribute('title');
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Ohne Medienfläche',
  args: {
    showMedia: false,
    area: 'co',
    eyebrow: 'Hinweis'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Freier Inhalt (ng-content)',
  // Für SPAs: Titel behalten, aber Text/Aktion/Media aus und beliebigen Inhalt
  // in den .card-body projizieren (z. B. Kennzahlen, Listen, eigene Controls).
  // Neue Story ohne Baseline (visual.yml noch nicht auf main) → snapshot.skip.
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [CardComponent]
    },
    template: \`
      <cds-card
        area="ki"
        title="Projektstatus"
        [text]="''"
        [actionLabel]="''"
        [showMedia]="false"
        style="max-width:320px"
      >
        <ul style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:var(--s2);font:var(--ty-body-md)">
          <li style="display:flex;justify-content:space-between"><span>Offen</span><strong>12</strong></li>
          <li style="display:flex;justify-content:space-between"><span>In Arbeit</span><strong>5</strong></li>
          <li style="display:flex;justify-content:space-between"><span>Erledigt</span><strong>28</strong></li>
        </ul>
      </cds-card>
    \`
  })
}`,...O.parameters?.docs?.source}}}})))()}export{init_card_stories as n,v as t};