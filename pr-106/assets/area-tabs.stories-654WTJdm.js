import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{B as n,C as r,D as i,G as a,H as o,Kt as s,M as c,O as l,Tn as u,Z as d,bn as f,d as p,et as m,k as h,p as g,q as _,v,y,z as b}from"./angular-platform-BGeCprOl.js";import{i as x,t as S}from"./dist-CMu91nUe.js";var C;function init_area_tab_component(){return(init_area_tab_component=e((()=>{u(),i(),C=class AreaTabComponent{area=l.required();label=l(``);content=c.required(d);static propDecorators={area:[{type:a,args:[{isSignal:!0,alias:`area`,required:!0,transform:void 0}]}],label:[{type:a,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],content:[{type:y,args:[d,{isSignal:!0}]}]}},C=f([n({selector:`cds-area-tab`,changeDetection:b.OnPush,template:`<ng-template><ng-content></ng-content></ng-template>`})],C)})))()}var w,T,E;function init_area_tabs_component(){return(init_area_tabs_component=e((()=>{u(),p(),i(),init_area_tab_component(),w=0,T=[`a[href]`,`area[href]`,`button:not([disabled])`,`input:not([disabled]):not([type="hidden"])`,`select:not([disabled])`,`textarea:not([disabled])`,`summary`,`audio[controls]`,`video[controls]`,`[contenteditable]:not([contenteditable="false"])`,`[tabindex]`].map(e=>`${e}:not([tabindex="-1"])`).join(`, `),E=class AreaTabsComponent{host=s(o);instance=++w;tabs=r(C);active=h(0);ariaLabel=l(`Bereiche`);constructor(){m(()=>{this.host.nativeElement.querySelectorAll(`[role="tabpanel"]`).forEach(e=>{e.querySelector(T)?e.removeAttribute(`tabindex`):e.setAttribute(`tabindex`,`0`)})})}atabAccent(e){return e===`ki`?`var(--ki-800)`:`var(--${e}-700)`}tabId(e){return`cds-atab-${this.instance}-${e}`}panelId(e){return`cds-atab-${this.instance}-panel-${e}`}onKeydown(e){let t=this.tabs().length;if(!t)return;let n=this.active(),r;switch(e.key){case`ArrowRight`:r=(n+1)%t;break;case`ArrowLeft`:r=(n-1+t)%t;break;case`Home`:r=0;break;case`End`:r=t-1;break;default:return}e.preventDefault(),this.active.set(r),this.host.nativeElement.querySelector(`#${CSS.escape(this.tabId(r))}`)?.focus()}static ctorParameters=()=>[];static propDecorators={tabs:[{type:v,args:[C,{isSignal:!0}]}],active:[{type:a,args:[{isSignal:!0,alias:`active`,required:!1}]},{type:_,args:[`activeChange`]}],ariaLabel:[{type:a,args:[{isSignal:!0,alias:`ariaLabel`,required:!1,transform:void 0}]}]}},E=f([n({selector:`cds-area-tabs`,changeDetection:b.OnPush,imports:[g],template:`
    <div class="area-tabs" role="tablist" [attr.aria-label]="ariaLabel()">
      @for (tab of tabs(); track tab; let i = $index) {
        <button
          class="atab"
          type="button"
          role="tab"
          [class.active]="i === active()"
          [attr.aria-selected]="i === active()"
          [attr.tabindex]="i === active() ? 0 : -1"
          [attr.data-area]="tab.area()"
          [id]="tabId(i)"
          [attr.aria-controls]="panelId(i)"
          [style]="'--atab-color:' + atabAccent(tab.area())"
          (click)="active.set(i)"
          (keydown)="onKeydown($event)"
        >
          <span class="area-dot" [style.background]="'var(--' + tab.area() + '-500)'"></span>
          {{ tab.label() }}
        </button>
      }
    </div>

    @for (tab of tabs(); track tab; let i = $index) {
      <div
        class="atab-content"
        role="tabpanel"
        [class.visible]="i === active()"
        [id]="panelId(i)"
        [attr.aria-labelledby]="tabId(i)"
      >
        <ng-container [ngTemplateOutlet]="tab.content()"></ng-container>
      </div>
    }
  `})],E)})))()}var D=t({Interaktiv:()=>N,PanelFokus:()=>F,ReicherInhalt:()=>I,Tastatur:()=>P,__namedExportsOrder:()=>L,default:()=>j}),O,k,A,j,M,N,P,F,I,L;function init_area_tabs_stories(){return(init_area_tabs_stories=e((()=>{S(),init_area_tab_component(),init_area_tabs_component(),{within:O,userEvent:k,expect:A}=__STORYBOOK_MODULE_TEST__,j={title:`Marke/Brand Areas/AreaTabs`,component:E,decorators:[x({imports:[E,C]})],tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5774`},layout:`padded`,docs:{description:{component:"Tab-Umschalter zwischen mehreren Bereichen: pro Bereich ein `<cds-area-tab>` mit `area`, `label` und BELIEBIGEM projiziertem Inhalt (Text, Listen, Komponenten …), der beim Anklicken angezeigt wird. Der aktive Tab wird in der Bereichsfarbe hervorgehoben; der aktive Index ist über `[(active)]` steuerbar."}}},args:{active:0}},M=`font:var(--ty-body-md);color:var(--tx-secondary);margin:0`,N={render:e=>({props:e,template:`
      <cds-area-tabs [active]="active">
        <cds-area-tab area="co" label="Corporate">
          <p style="${M}">Marke, Haltung und konsistente Kommunikation.</p>
        </cds-area-tab>
        <cds-area-tab area="ki" label="Angewandte KI">
          <p style="${M}">KI-Lösungen mit echtem Geschäftsnutzen.</p>
        </cds-area-tab>
        <cds-area-tab area="es" label="Effektive Software">
          <p style="${M}">Schlanke Architektur, schnellere Lieferung.</p>
        </cds-area-tab>
        <cds-area-tab area="wo" label="Wirksame Organisationen">
          <p style="${M}">Teams, die lernen und sich anpassen.</p>
        </cds-area-tab>
      </cds-area-tabs>
    `}),play:async({canvasElement:e})=>{let t=O(e).getAllByRole(`tab`);await A(t[0]).toHaveAttribute(`aria-selected`,`true`),await k.click(t[1]),await A(t[1]).toHaveAttribute(`aria-selected`,`true`),await A(t[0]).toHaveAttribute(`aria-selected`,`false`)}},P={name:`Tastatur`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},render:()=>({template:`
      <cds-area-tabs>
        <cds-area-tab area="co" label="Corporate">
          <p style="${M}">Marke, Haltung und konsistente Kommunikation.</p>
        </cds-area-tab>
        <cds-area-tab area="ki" label="Angewandte KI">
          <p style="${M}">KI-Lösungen mit echtem Geschäftsnutzen.</p>
        </cds-area-tab>
        <cds-area-tab area="es" label="Effektive Software">
          <p style="${M}">Schlanke Architektur, schnellere Lieferung.</p>
        </cds-area-tab>
        <cds-area-tab area="wo" label="Wirksame Organisationen">
          <p style="${M}">Teams, die lernen und sich anpassen.</p>
        </cds-area-tab>
      </cds-area-tabs>
    `}),play:async({canvasElement:e})=>{let t=O(e).getAllByRole(`tab`);t[0].focus(),await A(t[0]).toHaveAttribute(`aria-selected`,`true`),await k.keyboard(`{ArrowRight}`),await A(t[1]).toHaveAttribute(`aria-selected`,`true`),await A(t[1]).toHaveFocus(),await k.keyboard(`{ArrowRight}{ArrowRight}`),await A(t[3]).toHaveAttribute(`aria-selected`,`true`),await A(t[3]).toHaveFocus(),await k.keyboard(`{ArrowRight}`),await A(t[0]).toHaveAttribute(`aria-selected`,`true`),await A(t[0]).toHaveFocus(),await k.keyboard(`{ArrowLeft}`),await A(t[3]).toHaveAttribute(`aria-selected`,`true`),await A(t[3]).toHaveFocus(),await k.keyboard(`{Home}`),await A(t[0]).toHaveAttribute(`aria-selected`,`true`),await A(t[0]).toHaveFocus(),await k.keyboard(`{End}`),await A(t[3]).toHaveAttribute(`aria-selected`,`true`),await A(t[3]).toHaveFocus()}},F={name:`Panel-Fokus (tabindex)`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},render:()=>({template:`
      <cds-area-tabs>
        <cds-area-tab area="co" label="Nur Text">
          <p style="${M}">Marke, Haltung und konsistente Kommunikation.</p>
        </cds-area-tab>
        <cds-area-tab area="ki" label="Mit Button">
          <button type="button" class="btn btn-primary">Beratung anfragen</button>
        </cds-area-tab>
        <cds-area-tab area="es" label="Mit Link">
          <p style="${M}"><a class="body-link" href="#">Referenzprojekte</a></p>
        </cds-area-tab>
        <cds-area-tab area="wo" label="Nur tabindex -1">
          <button type="button" tabindex="-1" class="btn btn-primary">Nicht per Tab erreichbar</button>
        </cds-area-tab>
      </cds-area-tabs>
    `}),play:async({canvasElement:e})=>{let t=e.querySelectorAll(`[role="tabpanel"]`);await A(t).toHaveLength(4),await A(t[0]).toHaveAttribute(`tabindex`,`0`),await A(t[1]).not.toHaveAttribute(`tabindex`),await A(t[2]).not.toHaveAttribute(`tabindex`),await A(t[3]).toHaveAttribute(`tabindex`,`0`)}},I={name:`Reicher Inhalt`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},render:()=>({template:`
      <cds-area-tabs>
        <cds-area-tab area="ki" label="Angewandte KI">
          <h4 style="font:var(--ty-heading-sm);margin:0 0 var(--s2)">KI mit Geschäftsnutzen</h4>
          <ul style="font:var(--ty-body-md);color:var(--tx-secondary);margin:0 0 var(--s3);padding-left:1.2em">
            <li>Use-Case-Bewertung &amp; Priorisierung</li>
            <li>RAG- und Assistenz-Lösungen</li>
            <li>Betrieb &amp; Monitoring</li>
          </ul>
          <button type="button" class="btn btn-primary">Beratung anfragen</button>
        </cds-area-tab>
        <cds-area-tab area="es" label="Effektive Software">
          <p style="${M}">
            Schlanke Architektur und schnellere Lieferung, inkl.
            <a class="body-link" href="#">Referenzprojekten</a>.
          </p>
        </cds-area-tab>
      </cds-area-tabs>
    `})},L=[`Interaktiv`,`Tastatur`,`PanelFokus`,`ReicherInhalt`],N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`
      <cds-area-tabs [active]="active">
        <cds-area-tab area="co" label="Corporate">
          <p style="\${bodyStyle}">Marke, Haltung und konsistente Kommunikation.</p>
        </cds-area-tab>
        <cds-area-tab area="ki" label="Angewandte KI">
          <p style="\${bodyStyle}">KI-Lösungen mit echtem Geschäftsnutzen.</p>
        </cds-area-tab>
        <cds-area-tab area="es" label="Effektive Software">
          <p style="\${bodyStyle}">Schlanke Architektur, schnellere Lieferung.</p>
        </cds-area-tab>
        <cds-area-tab area="wo" label="Wirksame Organisationen">
          <p style="\${bodyStyle}">Teams, die lernen und sich anpassen.</p>
        </cds-area-tab>
      </cds-area-tabs>
    \`
  }),
  // Tab-Wechsel: Klick aktiviert den Tab (aria-selected) und sein Panel.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const tabs = c.getAllByRole('tab');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await userEvent.click(tabs[1]);
    await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Tastatur',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  render: () => ({
    template: \`
      <cds-area-tabs>
        <cds-area-tab area="co" label="Corporate">
          <p style="\${bodyStyle}">Marke, Haltung und konsistente Kommunikation.</p>
        </cds-area-tab>
        <cds-area-tab area="ki" label="Angewandte KI">
          <p style="\${bodyStyle}">KI-Lösungen mit echtem Geschäftsnutzen.</p>
        </cds-area-tab>
        <cds-area-tab area="es" label="Effektive Software">
          <p style="\${bodyStyle}">Schlanke Architektur, schnellere Lieferung.</p>
        </cds-area-tab>
        <cds-area-tab area="wo" label="Wirksame Organisationen">
          <p style="\${bodyStyle}">Teams, die lernen und sich anpassen.</p>
        </cds-area-tab>
      </cds-area-tabs>
    \`
  }),
  // ArrowRight/-Left bewegen mit Umlauf in BEIDE Richtungen, Home/End springen an
  // die Enden; der Fokus wandert mit (Roving Tabindex).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const tabs = c.getAllByRole('tab');
    tabs[0].focus();
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{ArrowRight}');
    await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[1]).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}{ArrowRight}');
    await expect(tabs[3]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[3]).toHaveFocus();

    // Umlauf vorwärts: ArrowRight am letzten Tab springt zum ersten.
    await userEvent.keyboard('{ArrowRight}');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[0]).toHaveFocus();

    // Umlauf rückwärts: ArrowLeft am ersten Tab springt zum letzten.
    await userEvent.keyboard('{ArrowLeft}');
    await expect(tabs[3]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[3]).toHaveFocus();
    await userEvent.keyboard('{Home}');
    await expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[0]).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(tabs[3]).toHaveAttribute('aria-selected', 'true');
    await expect(tabs[3]).toHaveFocus();
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Panel-Fokus (tabindex)',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // WAI-ARIA-Tabs: \`tabindex="0"\` nur an Panels ohne fokussierbaren Inhalt, damit die
  // Tastatur den Text erreicht. Enthält das Panel Button oder Link, entfällt es.
  render: () => ({
    template: \`
      <cds-area-tabs>
        <cds-area-tab area="co" label="Nur Text">
          <p style="\${bodyStyle}">Marke, Haltung und konsistente Kommunikation.</p>
        </cds-area-tab>
        <cds-area-tab area="ki" label="Mit Button">
          <button type="button" class="btn btn-primary">Beratung anfragen</button>
        </cds-area-tab>
        <cds-area-tab area="es" label="Mit Link">
          <p style="\${bodyStyle}"><a class="body-link" href="#">Referenzprojekte</a></p>
        </cds-area-tab>
        <cds-area-tab area="wo" label="Nur tabindex -1">
          <button type="button" tabindex="-1" class="btn btn-primary">Nicht per Tab erreichbar</button>
        </cds-area-tab>
      </cds-area-tabs>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const panels = canvasElement.querySelectorAll<HTMLElement>('[role="tabpanel"]');
    await expect(panels).toHaveLength(4);
    await expect(panels[0]).toHaveAttribute('tabindex', '0');
    await expect(panels[1]).not.toHaveAttribute('tabindex');
    await expect(panels[2]).not.toHaveAttribute('tabindex');
    // Ein Button mit tabindex="-1" ist per Tab nicht erreichbar: das Panel braucht tabindex="0".
    await expect(panels[3]).toHaveAttribute('tabindex', '0');
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Reicher Inhalt',
  // Neue Story ohne eingecheckte Baseline. visual.yml liegt noch nicht auf main →
  // workflow_dispatch (Baseline-Erzeugung im gepinnten Image) ist nicht verfügbar,
  // der push-Bootstrap generiert nur bei fehlenden Baselines. Nach dem Merge nach
  // main kann die Baseline erzeugt und snapshot.skip entfernt werden.
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  // Zeigt, dass der Panel-Inhalt beliebiges Markup/Komponenten sein kann — nicht nur Text.
  render: () => ({
    template: \`
      <cds-area-tabs>
        <cds-area-tab area="ki" label="Angewandte KI">
          <h4 style="font:var(--ty-heading-sm);margin:0 0 var(--s2)">KI mit Geschäftsnutzen</h4>
          <ul style="font:var(--ty-body-md);color:var(--tx-secondary);margin:0 0 var(--s3);padding-left:1.2em">
            <li>Use-Case-Bewertung &amp; Priorisierung</li>
            <li>RAG- und Assistenz-Lösungen</li>
            <li>Betrieb &amp; Monitoring</li>
          </ul>
          <button type="button" class="btn btn-primary">Beratung anfragen</button>
        </cds-area-tab>
        <cds-area-tab area="es" label="Effektive Software">
          <p style="\${bodyStyle}">
            Schlanke Architektur und schnellere Lieferung, inkl.
            <a class="body-link" href="#">Referenzprojekten</a>.
          </p>
        </cds-area-tab>
      </cds-area-tabs>
    \`
  })
}`,...I.parameters?.docs?.source}}}})))()}export{init_area_tabs_stories as n,D as t};