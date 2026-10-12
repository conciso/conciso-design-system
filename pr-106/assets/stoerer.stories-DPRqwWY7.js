import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,C as n,D as r,G as i,M as a,O as o,P as s,Tn as c,Z as l,bn as u,d,p as f,v as p,y as m,z as h}from"./angular-platform-BGeCprOl.js";import{i as g,t as _}from"./dist-CMu91nUe.js";import{n as v,t as y}from"./hero-image.component-BloJAjja.js";import{n as b,t as x}from"./platzhalter-Djsxs5M2.js";var S;function init_stoerer_component(){return(init_stoerer_component=e((()=>{c(),r(),S=class StoererComponent{topic=o.required();title=o.required();href=o.required();meta=o(``);date=o(``);content=a.required(l);hasMeta=s(()=>!!(this.date()||this.meta()));formattedDate=s(()=>{let e=this.date();if(!e)return``;let[t,n,r]=e.split(`-`).map(Number);return!t||!n||!r?e:new Intl.DateTimeFormat(`de-DE`,{day:`numeric`,month:`long`,year:`numeric`}).format(new Date(t,n-1,r))});static propDecorators={topic:[{type:i,args:[{isSignal:!0,alias:`topic`,required:!0,transform:void 0}]}],title:[{type:i,args:[{isSignal:!0,alias:`title`,required:!0,transform:void 0}]}],href:[{type:i,args:[{isSignal:!0,alias:`href`,required:!0,transform:void 0}]}],meta:[{type:i,args:[{isSignal:!0,alias:`meta`,required:!1,transform:void 0}]}],date:[{type:i,args:[{isSignal:!0,alias:`date`,required:!1,transform:void 0}]}],content:[{type:m,args:[l,{isSignal:!0}]}]}},S=u([t({selector:`cds-stoerer`,changeDetection:h.OnPush,host:{"[attr.title]":`null`},template:`
    <ng-template>
      <a class="stoerer" [href]="href()">
        <span class="stoerer-topic">
          <ng-content select="[cdsIcon]"></ng-content>
          {{ topic() }}
        </span>
        <span class="stoerer-title"
          ><span>{{ title() }}</span></span
        >
        @if (hasMeta()) {
          <span class="stoerer-meta">
            @if (date()) {
              <time [attr.datetime]="date()">{{ formattedDate() }}</time>
            }
            @if (date() && meta()) {
              <span aria-hidden="true"> · </span><span class="sr-only">, </span>
            }
            {{ meta() }}
          </span>
        }
      </a>
    </ng-template>
  `})],S)})))()}var C;function init_stoerer_set_component(){return(init_stoerer_set_component=e((()=>{c(),d(),r(),init_stoerer_component(),C=class StoererSetComponent{label=o(`Aktuelles`);tiles=n(S);static propDecorators={label:[{type:i,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],tiles:[{type:p,args:[S,{isSignal:!0}]}]}},C=u([t({selector:`cds-stoerer-set`,changeDetection:h.OnPush,imports:[f],template:`
    <aside class="stoerer-set" [attr.aria-label]="label()">
      <ul class="stoerer-list">
        @for (tile of tiles(); track tile) {
          <li><ng-container [ngTemplateOutlet]="tile.content()"></ng-container></li>
        }
      </ul>
    </aside>
  `})],C)})))()}var w,T,E,D,O,k,A,j,M,N,P,F;function init_stoerer_stories(){return(init_stoerer_stories=e((()=>{_(),x(),v(),init_stoerer_component(),init_stoerer_set_component(),{within:w,userEvent:T,expect:E}=__STORYBOOK_MODULE_TEST__,D=b(`Bildfläche · 21:9`,1600,686),O=`<svg cdsIcon class="stoerer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8 2v3" /><path d="M16 2v3" /><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /><path d="M8 13h.01" /><path d="M12 13h.01" /><path d="M16 13h.01" /><path d="M8 17h.01" /><path d="M12 17h.01" /><path d="M16 17h.01" /></svg>`,k=`<svg cdsIcon class="stoerer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" /><path d="M14 2v5a1 1 0 0 0 1 1h5" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>`,A={title:`Komponenten/Hero/Störer`,component:C,decorators:[g({imports:[C,S,y]})],tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-1132`},layout:`padded`,docs:{description:{component:"Set aus ein bis drei Verweiskacheln (`<cds-stoerer>`), das ausschließlich auf der Startseite oben rechts über dem Hero-Bild liegt (`.stoerer-set` / `.stoerer-list`). Jede Kachel ist ein vollständig klickbarer `<a>` mit Typ-Glyph, Thema-Label, Titel und Meta-Zeile. Der Positionsrahmen `.stoerer-hero`, der Hero-Bild und Set gemeinsam umschließt, ist bewusst kein Teil dieser Komponente und bleibt Sache des Konsumenten (siehe „Zwei Kacheln über dem Hero“ unten)."}}},args:{label:`Aktuelles`}},j={render:e=>({props:e,template:`
      <cds-stoerer-set [label]="label">
        <cds-stoerer topic="Nächste Veranstaltung" title="Effizienz durch n8n"
          href="#veranstaltung" date="2026-12-03" meta="Dortmund">
          ${O}
        </cds-stoerer>
        <cds-stoerer topic="Neu im Wissen" title="Warum 60 % der KI-Piloten nie in Produktion gehen"
          href="#wissensbeitrag" date="2026-05-13" meta="8 min Lesezeit">
          ${k}
        </cds-stoerer>
      </cds-stoerer-set>
    `}),play:async({canvasElement:e})=>{let t=w(e),n=e.querySelector(`aside.stoerer-set`);await E(n).toHaveAttribute(`aria-label`,`Aktuelles`);let r=e.querySelector(`ul.stoerer-list`);await E(r?.children.length).toBe(2),await E(Array.from(r?.children??[]).every(e=>e.tagName===`LI`)).toBe(!0),await E(e.querySelector(`cds-stoerer`)).toBeNull();let i=t.getAllByRole(`link`);await E(i).toHaveLength(2),await E(i[0].tagName).toBe(`A`),await T.tab(),await E(i[0]).toHaveFocus(),await T.tab(),await E(i[1]).toHaveFocus();let a=e.querySelectorAll(`.stoerer-meta .sr-only`);await E(a).toHaveLength(2)}},M={name:`Host-Attribut`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},render:()=>({template:`
      <cds-stoerer topic="Nächste Veranstaltung" title="Effizienz durch n8n" href="#veranstaltung">
        ${O}
      </cds-stoerer>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`cds-stoerer`);await E(t).not.toHaveAttribute(`title`)}},N={name:`Zwei Kacheln über dem Hero`,parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3999`},layout:`fullscreen`,controls:{disable:!0},docs:{description:{story:"`.stoerer-hero` umschließt Hero-Bild und Set gemeinsam (`position:relative`, `container-type:inline-size`): Der Rahmen bleibt Sache der Seite, nicht der Störer-Komponente, sonst könnte das Set das Hero-Bild nicht überlagern."}}},render:()=>({template:`
      <div class="stoerer-hero">
        <cds-hero-image src="${D}" alt="Conciso-Team geht gemeinsam über ein sonniges Industriegelände"
          eyebrow="Seit 2016 · Dortmund" heading="KI, Software und Organisation für den Mittelstand."
          text="Pragmatisch geplant, kraftvoll umgesetzt."></cds-hero-image>
        <cds-stoerer-set>
          <cds-stoerer topic="Nächste Veranstaltung" title="Effizienz durch n8n"
            href="#veranstaltung" date="2026-12-03" meta="Dortmund">
            ${O}
          </cds-stoerer>
          <cds-stoerer topic="Neu im Wissen" title="Warum 60 % der KI-Piloten nie in Produktion gehen"
            href="#wissensbeitrag" date="2026-05-13" meta="8 min Lesezeit">
            ${k}
          </cds-stoerer>
        </cds-stoerer-set>
      </div>
    `}),play:async({canvasElement:e})=>{let t=w(e);await E(e.querySelector(`.stoerer-hero .hero-image`)).not.toBeNull(),await E(e.querySelector(`.stoerer-hero aside.stoerer-set`)).not.toBeNull(),await E(t.getAllByRole(`link`)).toHaveLength(2)}},P={name:`Ohne Meta`,parameters:{controls:{disable:!0}},render:()=>({template:`
      <cds-stoerer-set label="Aktuelles">
        <cds-stoerer topic="Neues Seminar" title="Scrum Master Kurs, neue Termine ab Oktober" href="#seminar">
          ${k}
        </cds-stoerer>
      </cds-stoerer-set>
    `}),play:async({canvasElement:e})=>{let t=w(e);await E(e.querySelector(`.stoerer-meta`)).toBeNull(),await E(t.getByRole(`link`,{name:/Scrum Master Kurs, neue Termine ab Oktober/})).toBeInTheDocument()}},F=[`Interaktiv`,`HostAttribut`,`ZweiKachelnUeberDemHero`,`OhneMeta`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`
      <cds-stoerer-set [label]="label">
        <cds-stoerer topic="Nächste Veranstaltung" title="Effizienz durch n8n"
          href="#veranstaltung" date="2026-12-03" meta="Dortmund">
          \${iconCalendarDays}
        </cds-stoerer>
        <cds-stoerer topic="Neu im Wissen" title="Warum 60 % der KI-Piloten nie in Produktion gehen"
          href="#wissensbeitrag" date="2026-05-13" meta="8 min Lesezeit">
          \${iconDocumentText}
        </cds-stoerer>
      </cds-stoerer-set>
    \`
  }),
  // Drei Entscheidungen gepinnt: (1) das Set trägt sein aria-label, (2) jede Kachel
  // ist ein echtes <a>, tastaturerreichbar, (3) der sr-only-Trenner steht in der
  // Meta-Zeile, wenn date UND meta gesetzt sind (bei beiden Kacheln hier der Fall).
  // Zusätzlich die <li>-Entscheidung selbst: die Liste hat ausschließlich <li> als
  // direkte Kinder, kein <cds-stoerer>-Tag taucht im gerenderten DOM auf.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const aside = canvasElement.querySelector('aside.stoerer-set');
    await expect(aside).toHaveAttribute('aria-label', 'Aktuelles');
    const list = canvasElement.querySelector('ul.stoerer-list');
    await expect(list?.children.length).toBe(2);
    await expect(Array.from(list?.children ?? []).every(el => el.tagName === 'LI')).toBe(true);
    await expect(canvasElement.querySelector('cds-stoerer')).toBeNull();
    const links = c.getAllByRole('link');
    await expect(links).toHaveLength(2);
    await expect(links[0].tagName).toBe('A');
    await userEvent.tab();
    await expect(links[0]).toHaveFocus();
    await userEvent.tab();
    await expect(links[1]).toHaveFocus();
    const separators = canvasElement.querySelectorAll('.stoerer-meta .sr-only');
    await expect(separators).toHaveLength(2);
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Host-Attribut',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  render: () => ({
    template: \`
      <cds-stoerer topic="Nächste Veranstaltung" title="Effizienz durch n8n" href="#veranstaltung">
        \${iconCalendarDays}
      </cds-stoerer>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector('cds-stoerer');
    await expect(host).not.toHaveAttribute('title');
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Zwei Kacheln über dem Hero',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3999'
    },
    layout: 'fullscreen',
    controls: {
      disable: true
    },
    docs: {
      description: {
        story: '\`.stoerer-hero\` umschließt Hero-Bild und Set gemeinsam (\`position:relative\`, ' + '\`container-type:inline-size\`): Der Rahmen bleibt Sache der Seite, nicht der ' + 'Störer-Komponente, sonst könnte das Set das Hero-Bild nicht überlagern.'
      }
    }
  },
  render: () => ({
    template: \`
      <div class="stoerer-hero">
        <cds-hero-image src="\${heroPlaceholder}" alt="Conciso-Team geht gemeinsam über ein sonniges Industriegelände"
          eyebrow="Seit 2016 · Dortmund" heading="KI, Software und Organisation für den Mittelstand."
          text="Pragmatisch geplant, kraftvoll umgesetzt."></cds-hero-image>
        <cds-stoerer-set>
          <cds-stoerer topic="Nächste Veranstaltung" title="Effizienz durch n8n"
            href="#veranstaltung" date="2026-12-03" meta="Dortmund">
            \${iconCalendarDays}
          </cds-stoerer>
          <cds-stoerer topic="Neu im Wissen" title="Warum 60 % der KI-Piloten nie in Produktion gehen"
            href="#wissensbeitrag" date="2026-05-13" meta="8 min Lesezeit">
            \${iconDocumentText}
          </cds-stoerer>
        </cds-stoerer-set>
      </div>
    \`
  }),
  // Die Kombination selbst ist das Verhalten: Hero-Bild und Störer-Set rendern
  // gemeinsam innerhalb desselben .stoerer-hero-Rahmens, den der Konsument stellt.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    // Nachfahren-Selektoren, nicht \`>\`: cds-hero-image/cds-stoerer-set bleiben als
    // eigene Host-Elemente im DOM stehen (anders als das projizierte cds-stoerer,
    // siehe Entscheidung in stoerer-set.component.ts).
    await expect(canvasElement.querySelector('.stoerer-hero .hero-image')).not.toBeNull();
    await expect(canvasElement.querySelector('.stoerer-hero aside.stoerer-set')).not.toBeNull();
    await expect(c.getAllByRole('link')).toHaveLength(2);
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Ohne Meta',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Bleiben date und meta beide leer, entfällt die gesamte .stoerer-meta-Zeile statt
  // leer zu rendern — dieselbe „leer = ausgeblendet“-Konvention wie bei cds-hero-image
  // und cds-section.
  render: () => ({
    template: \`
      <cds-stoerer-set label="Aktuelles">
        <cds-stoerer topic="Neues Seminar" title="Scrum Master Kurs, neue Termine ab Oktober" href="#seminar">
          \${iconDocumentText}
        </cds-stoerer>
      </cds-stoerer-set>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(canvasElement.querySelector('.stoerer-meta')).toBeNull();
    await expect(c.getByRole('link', {
      name: /Scrum Master Kurs, neue Termine ab Oktober/
    })).toBeInTheDocument();
  }
}`,...P.parameters?.docs?.source}}}})))()}init_stoerer_stories();export{M as HostAttribut,j as Interaktiv,P as OhneMeta,N as ZweiKachelnUeberDemHero,F as __namedExportsOrder,A as default};