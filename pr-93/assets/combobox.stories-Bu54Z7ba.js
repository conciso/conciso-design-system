import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,At as n,Ft as r,H as i,I as a,Nt as o,P as s,R as c,V as l,W as u,Y as d,fn as f,j as p,k as m,q as h,sn as g,x as _}from"./angular-platform-CAY__VLP.js";import{i as v,n as y,r as b,t as x}from"./forms-CAzAEGKf.js";import{d as S,l as C,n as w,s as T,u as E}from"./ng-icons-heroicons-outline-D63aMe8L.js";import{t as D}from"./cds-icons-De84Mmkh.js";import{n as O,t as k}from"./disposable-timeout--2m_dMi6.js";var A,j;function init_combobox_component(){return(init_combobox_component=e((()=>{f(),m(),v(),E(),D(),O(),A=0,j=class ComboboxComponent{host=o(u);input=s(`input`);label=t(`Thema`);options=t([]);value=p(void 0);values=p([]);multi=t(!1);area=t();placeholder=t(`Suchen…`);emptyText=t(`Keine Treffer`);disabled=p(!1);open=r(!1);activeIndex=r(0);selected=a(()=>this.multi()?this.values():this.value()?[this.value()]:[]);selectedLabel=a(()=>this.options().find(e=>e.value===this.value())?.label??``);query=c({source:()=>({open:this.open(),multi:this.multi(),label:this.selectedLabel()}),computation:(e,t)=>e.open?t?.value??``:e.multi?``:e.label});onChange=()=>{};onTouched=()=>{};instance=++A;ids={label:`cds-combobox-${this.instance}-label`,menu:`cds-combobox-${this.instance}-menu`,option:e=>`cds-combobox-${this.instance}-opt-${e}`};writeValue(e){if(this.multi()){let t=Array.isArray(e)?[...e]:[];this.values.set(t)}else{let t=typeof e==`string`?e:void 0;this.value.set(t),this.query.set(t?this.options().find(e=>e.value===t)?.label??``:``)}}registerOnChange(e){this.onChange=e}registerOnTouched(e){this.onTouched=e}setDisabledState(e){this.disabled.set(e)}selectedOptions(){return this.selected().map(e=>this.options().find(t=>t.value===e)).filter(e=>!!e)}filtered(){let e=this.query().trim().toLowerCase(),t=this.selected();return this.options().filter(n=>this.multi()&&t.includes(n.value)?!1:!e||n.label.toLowerCase().includes(e))}isSelected(e){return this.selected().includes(e)}focusInput(){this.disabled()||this.input()?.nativeElement.focus()}openMenu(){this.disabled()||this.open()||(this.open.set(!0),this.activeIndex.set(0))}close(){if(this.open.set(!1),this.multi())this.query.set(``);else{let e=this.options().find(e=>e.value===this.value())?.label??``;this.query.set(e)}}onInput(e){this.query.set(e.target.value),this.open.set(!0),this.activeIndex.set(0)}select(e){if(this.multi()){let t=[...this.selected(),e.value];this.values.set(t),this.onChange(t),this.onTouched(),this.query.set(``),this.activeIndex.set(0),this.focusInput()}else this.value.set(e.value),this.onChange(e.value),this.onTouched(),this.query.set(e.label),this.open.set(!1)}removeValue(e,t){t?.stopPropagation();let n=this.selected().filter(t=>t!==e);this.values.set(n),this.onChange(n),this.onTouched(),this.focusInput()}clear(e){e?.stopPropagation(),!this.multi()&&this.value()!==void 0&&(this.value.set(void 0),this.onChange(``)),this.query.set(``),this.activeIndex.set(0),this.focusInput(),this.openMenu()}toggleMenu(e){e.stopPropagation(),!this.disabled()&&(this.open()?this.close():(this.focusInput(),this.openMenu()))}markTouched(){this.onTouched()}onKeydown(e){let t=this.filtered();switch(e.key){case`ArrowDown`:e.preventDefault(),this.open()?this.activeIndex.set(Math.min(t.length-1,this.activeIndex()+1)):this.openMenu(),this.scrollActive();break;case`ArrowUp`:e.preventDefault(),this.open()?this.activeIndex.set(Math.max(0,this.activeIndex()-1)):this.openMenu(),this.scrollActive();break;case`Home`:if(!this.open())return;e.preventDefault(),this.activeIndex.set(0),this.scrollActive();break;case`End`:if(!this.open())return;e.preventDefault(),this.activeIndex.set(t.length-1),this.scrollActive();break;case`Enter`:{let n=t[this.activeIndex()];this.open()&&n&&(e.preventDefault(),this.select(n));break}case`Escape`:e.preventDefault(),this.close();break;case`Backspace`:this.multi()&&this.query().length===0&&this.selected().length&&this.removeValue(this.selected()[this.selected().length-1])}}scrollTimer=k();scrollActive(){this.scrollTimer.schedule(()=>{this.host.nativeElement.querySelector(`#${CSS.escape(this.ids.option(this.activeIndex()))}`)?.scrollIntoView({block:`nearest`})})}onDocPointerDown(e){this.open()&&!this.host.nativeElement.contains(e.target)&&this.close()}static propDecorators={input:[{type:_,args:[`input`,{isSignal:!0}]}],label:[{type:h,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],options:[{type:h,args:[{isSignal:!0,alias:`options`,required:!1,transform:void 0}]}],value:[{type:h,args:[{isSignal:!0,alias:`value`,required:!1}]},{type:d,args:[`valueChange`]}],values:[{type:h,args:[{isSignal:!0,alias:`values`,required:!1}]},{type:d,args:[`valuesChange`]}],multi:[{type:h,args:[{isSignal:!0,alias:`multi`,required:!1,transform:void 0}]}],area:[{type:h,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],placeholder:[{type:h,args:[{isSignal:!0,alias:`placeholder`,required:!1,transform:void 0}]}],emptyText:[{type:h,args:[{isSignal:!0,alias:`emptyText`,required:!1,transform:void 0}]}],disabled:[{type:h,args:[{isSignal:!0,alias:`disabled`,required:!1}]},{type:d,args:[`disabledChange`]}]}},j=g([i({selector:`cds-combobox`,changeDetection:l.OnPush,imports:[C],viewProviders:[S({heroChevronDown:w,heroXMark:T})],providers:[{provide:y,useExisting:n(()=>j),multi:!0}],host:{"(document:pointerdown)":`onDocPointerDown($event)`},template:`
    <div
      class="ep-combobox"
      [class.is-multi]="multi()"
      [class.is-open]="open()"
      [class.is-disabled]="disabled()"
      [attr.data-area]="area() || null"
    >
      <span class="ep-select-label" [id]="ids.label">{{ label() }}</span>
      <!-- Klick auf die Feldfläche fokussiert das Input (cursor:text); das Input selbst
           ist direkt tastaturfokussierbar — daher a11y-Regeln hier gezielt aus. -->
      <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
      <div
        class="ep-combobox-control"
        [class.has-clear]="query().length > 0"
        (click)="focusInput()"
      >
        @if (multi()) {
          @for (opt of selectedOptions(); track opt.value) {
            <span class="ep-combobox-token">
              <span class="ep-combobox-token-label">{{ opt.label }}</span>
              <button
                type="button"
                class="ep-combobox-token-remove"
                [attr.aria-label]="opt.label + ' entfernen'"
                (click)="removeValue(opt.value, $event)"
              >
                <ng-icon name="heroXMark" size="14px" aria-hidden="true" />
              </button>
            </span>
          }
        }
        <input
          #input
          class="ep-combobox-input"
          type="text"
          role="combobox"
          autocomplete="off"
          [attr.aria-labelledby]="ids.label"
          [attr.aria-expanded]="open()"
          [attr.aria-controls]="ids.menu"
          aria-autocomplete="list"
          [attr.aria-activedescendant]="
            open() && activeIndex() >= 0 && activeIndex() < filtered().length
              ? ids.option(activeIndex())
              : null
          "
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [value]="query()"
          (input)="onInput($event)"
          (keydown)="onKeydown($event)"
          (focus)="openMenu()"
          (blur)="markTouched()"
        />
        @if (query().length > 0) {
          <button
            type="button"
            class="ep-combobox-clear"
            aria-label="Eingabe löschen"
            (click)="clear($event)"
          >
            <ng-icon name="heroXMark" size="16px" aria-hidden="true" />
          </button>
        }
        <!-- Chevron ist kein fokussierbares Element, sondern Maus-Komfort; die Tastatur
             öffnet und schließt über das Input (↓ / Esc). -->
        <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
        <ng-icon
          class="ep-select-caret"
          name="heroChevronDown"
          size="24px"
          aria-hidden="true"
          (click)="toggleMenu($event)"
        />
      </div>
      <ul
        class="ep-combobox-menu"
        role="listbox"
        [attr.aria-multiselectable]="multi() || null"
        [style.display]="filtered().length ? null : 'none'"
        [id]="ids.menu"
        [attr.aria-labelledby]="ids.label"
      >
        @for (opt of filtered(); track opt.value; let i = $index) {
          <!-- Listbox-Muster: Optionen bewusst nicht einzeln fokussierbar; Tastatur
               läuft über das Input (aria-activedescendant). -->
          <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
          <li
            class="ep-select-option"
            role="option"
            [id]="ids.option(i)"
            [attr.data-value]="opt.value"
            [class.is-active]="i === activeIndex()"
            [attr.aria-selected]="isSelected(opt.value)"
            (click)="select(opt)"
            (mouseenter)="activeIndex.set(i)"
          >
            {{ opt.label }}
          </li>
        }
      </ul>
      <!-- Leermeldung außerhalb der Listbox: eine Listbox ohne option-Kind verletzt
           aria-required-children. Die Listbox bleibt bei 0 Treffern ausgeblendet. Die Live-Region
         (sr-only) steht dauerhaft im DOM, damit der Wechsel zuverlässig angesagt wird; das sichtbare
         Panel ist aria-hidden, damit nichts doppelt gelesen wird. -->
      <div class="sr-only" role="status">
        @if (!filtered().length) {
          {{ emptyText() }}
        }
      </div>
      @if (!filtered().length) {
        <div class="ep-combobox-menu" aria-hidden="true">
          <div class="ep-combobox-empty">{{ emptyText() }}</div>
        </div>
      }
    </div>
  `})],j)})))()}var M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J;function init_combobox_stories(){return(init_combobox_stories=e((()=>{v(),init_combobox_component(),{within:M,userEvent:N,expect:P,waitFor:F}=__STORYBOOK_MODULE_TEST__,I=[{value:`ki`,label:`Angewandte KI`},{value:`es`,label:`Effektive Software`},{value:`wo`,label:`Wirksame Organisationen`},{value:`strategie`,label:`Strategie-Workshop`},{value:`daten`,label:`Datenanalyse & Reporting`},{value:`auto`,label:`Prozessautomatisierung`},{value:`cloud`,label:`Cloud-Migration`},{value:`change`,label:`Change-Begleitung`},{value:`training`,label:`Schulung & Training`},{value:`presse`,label:`Presse & Medien`}],L=[{value:`ki`,label:`Künstliche Intelligenz`},{value:`rag`,label:`LLM & RAG`},{value:`ds`,label:`Design Systems`},{value:`cloud`,label:`Cloud & DevOps`},{value:`scrum`,label:`Agile & Scrum`},{value:`okr`,label:`OKR & Strategie`},{value:`change`,label:`Change-Management`},{value:`ux`,label:`UX & Forschung`}],R={title:`Komponenten/Dropdowns/Combobox`,component:j,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5495`},layout:`padded`,docs:{description:{component:"Wie der Custom Select, aber mit Tipp-Filter im Feld, für lange Listen. Substring-Filter (case-insensitiv), Leerzustand bei keinem Treffer, Lösch-Button bei Texteingabe. Mit `multi` als Mehrfachauswahl: gewählte Werte werden zu entfernbaren Chips, Rücktaste bei leerem Feld entfernt den letzten. Input als role=combobox mit aria-autocomplete/-activedescendant; Listbox mit role=listbox/option."}}},argTypes:{area:{control:`inline-radio`,options:[void 0,`co`,`ki`,`es`,`wo`]},multi:{control:`boolean`},disabled:{control:`boolean`}},args:{label:`Thema`,options:I,placeholder:`Thema suchen…`,emptyText:`Kein Thema gefunden`,area:`es`,multi:!1,disabled:!1}},z={play:async({canvasElement:e})=>{let t=M(e),n=t.getByRole(`combobox`);await N.type(n,`Cloud`),await N.click(await t.findByRole(`option`,{name:`Cloud-Migration`})),await F(()=>P(n).toHaveValue(`Cloud-Migration`))}},B={name:`Tastatur`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},args:{label:`Interessen`,options:L,placeholder:`Hinzufügen…`,area:`wo`,multi:!0,values:[]},play:async({canvasElement:e})=>{let t=M(e),n=t.getByRole(`combobox`);await N.click(n),await P(n).toHaveAttribute(`aria-expanded`,`true`),await N.keyboard(`{Escape}`),await P(n).toHaveAttribute(`aria-expanded`,`false`),await N.keyboard(`{ArrowDown}`),await P(n).toHaveAttribute(`aria-expanded`,`true`),await N.keyboard(`{Escape}`),await P(n).toHaveAttribute(`aria-expanded`,`false`),await N.keyboard(`{ArrowUp}`),await P(n).toHaveAttribute(`aria-expanded`,`true`);let r=t.getAllByRole(`option`);await N.keyboard(`{End}`),await P(n).toHaveAttribute(`aria-activedescendant`,r[r.length-1].id),await N.keyboard(`{Home}`),await P(n).toHaveAttribute(`aria-activedescendant`,r[0].id),await N.keyboard(`{Enter}`),await P(t.getAllByRole(`button`,{name:/ entfernen$/})).toHaveLength(1),await N.type(n,`Cloud`),await P(n).toHaveValue(`Cloud`),await N.keyboard(`{Escape}`),await P(n).toHaveValue(``),await P(n).toHaveAttribute(`aria-expanded`,`false`)}},V={name:`Multi-Select`,args:{label:`Interessen`,options:L,placeholder:`Hinzufügen…`,area:`wo`,multi:!0,values:[`ki`,`ds`,`ux`]},play:async({canvasElement:e})=>{let t=M(e);await P(t.getAllByRole(`button`,{name:/ entfernen$/})).toHaveLength(3)}},H={name:`Multi-Select · Hinzufügen`,args:{label:`Interessen`,options:L,placeholder:`Hinzufügen…`,area:`wo`,multi:!0,values:[`ki`,`ds`]},parameters:{snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=M(e);await N.type(t.getByRole(`combobox`),`UX`),await N.click(await t.findByRole(`option`,{name:`UX & Forschung`})),await F(()=>P(t.getAllByRole(`button`,{name:/ entfernen$/})).toHaveLength(3))}},U={name:`Formularbindung`,parameters:{controls:{disable:!0},snapshot:{skip:!0},docs:{description:{story:"Die Combobox ist ein `ControlValueAccessor` und bindet direkt an reactive forms (`formControl`); im Einzelmodus ist der Formularwert der Options-`value` (hier live angezeigt), im Multi-Modus ein `string[]`. Ohne Formular gehen `[(value)]` / `[(values)]`."}}},render:()=>{let e=new x(``);return{moduleMetadata:{imports:[j,b]},props:{ctrl:e,options:I},template:`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-combobox label="Thema" [options]="options" [formControl]="ctrl"></cds-combobox>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '(leer)' }}</strong></p>
        </div>
      `}},play:async({canvasElement:e})=>{let t=M(e),n=t.getByRole(`combobox`);await N.type(n,`Cloud`),await N.click(await t.findByRole(`option`,{name:`Cloud-Migration`})),await F(()=>P(e).toHaveTextContent(`Wert: cloud`))}},W={name:`Multi-Select · Chip entfernen`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},args:{label:`Interessen`,options:L,placeholder:`Hinzufügen…`,area:`wo`,multi:!0,values:[`ki`,`ds`]},play:async({canvasElement:e})=>{let t=M(e);await N.click(t.getByRole(`button`,{name:`Design Systems entfernen`})),await P(t.queryByRole(`button`,{name:`Design Systems entfernen`})).toBeNull(),await P(t.getAllByRole(`button`,{name:/ entfernen$/})).toHaveLength(1),await P(t.getByRole(`combobox`)).toHaveFocus()}},G={name:`Einzelauswahl · Eingabe löschen hebt Auswahl auf`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},render:()=>{let e=new x(`cloud`);return{moduleMetadata:{imports:[j,b]},props:{ctrl:e,options:I},template:`
        <cds-combobox label="Thema" [options]="options" [formControl]="ctrl"></cds-combobox>
        <p data-testid="wert">Wert: {{ ctrl.value || '(leer)' }}</p>
      `}},play:async({canvasElement:e})=>{let t=M(e),n=t.getByRole(`combobox`);await P(n).toHaveValue(`Cloud-Migration`),await N.click(t.getByRole(`button`,{name:`Eingabe löschen`})),await P(n).toHaveFocus(),await P(n).toHaveAttribute(`aria-expanded`,`true`),await N.keyboard(`{Escape}`),await P(n).toHaveValue(``),await P(e).toHaveTextContent(`Wert: (leer)`)}},K={name:`Menü · Mehrfachauswahl und Leerzustand`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[j]},props:{options:L,themen:I},template:`
      <div data-testid="multi"><cds-combobox label="Interessen" [options]="options" [multi]="true"></cds-combobox></div>
      <div data-testid="einzel"><cds-combobox label="Thema" [options]="themen"></cds-combobox></div>
    `}),play:async({canvasElement:e})=>{let t=M(M(e).getByTestId(`multi`)),n=M(M(e).getByTestId(`einzel`));await P(t.getByRole(`listbox`,{hidden:!0})).toHaveAttribute(`aria-multiselectable`,`true`),await P(n.getByRole(`listbox`,{hidden:!0})).not.toHaveAttribute(`aria-multiselectable`);let r=t.getByRole(`status`);await P(r).toBeEmptyDOMElement(),await N.type(t.getByRole(`combobox`),`zzz`),await P(r).toHaveTextContent(`Keine Treffer`);let i=M(e).getByTestId(`multi`).querySelector(`.ep-combobox-empty`);await P(i?.closest(`.ep-combobox-menu`)).toHaveAttribute(`aria-hidden`,`true`),await P(r.closest(`[role="listbox"]`)).toBeNull(),await P(t.queryByRole(`listbox`)).toBeNull(),await P(t.queryAllByRole(`option`)).toHaveLength(0)}},q={name:`Chevron schaltet das Menü um`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=M(e).getByRole(`combobox`),n=e.querySelector(`.ep-select-caret`);if(!n)throw Error(`Chevron fehlt.`);await N.click(n),await P(t).toHaveAttribute(`aria-expanded`,`true`),await N.click(n),await P(t).toHaveAttribute(`aria-expanded`,`false`),await N.click(n),await P(t).toHaveAttribute(`aria-expanded`,`true`)}},J=[`Interaktiv`,`Tastatur`,`MultiSelect`,`MultiSelectHinzufuegen`,`Formularbindung`,`ChipEntfernen`,`EinzelauswahlLoeschen`,`MenueAttribute`,`ChevronUmschalten`],z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  // Tippen filtert; Auswahl übernimmt das Label ins Feld.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const input = c.getByRole('combobox');
    await userEvent.type(input, 'Cloud');
    await userEvent.click(await c.findByRole('option', {
      name: 'Cloud-Migration'
    }));
    await waitFor(() => expect(input).toHaveValue('Cloud-Migration'));
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Tastatur',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  args: {
    label: 'Interessen',
    options: INTERESSEN,
    placeholder: 'Hinzufügen…',
    area: 'wo',
    multi: true,
    values: []
  },
  // Reine Tastatur, keine Klicks auf Optionen: ArrowDown/ArrowUp öffnen BEIDE das
  // geschlossene Menü (vorher nur ArrowDown), Home/End springen auf die erste/letzte
  // gefilterte Option, Enter wählt, Escape schließt und leert im Multi-Modus den
  // stehen gebliebenen Filtertext (vorher blieb er stehen).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const input = c.getByRole('combobox');

    // Fokus öffnet automatisch ((focus)="openMenu()") — für den eigentlichen
    // Test erst wieder schließen.
    await userEvent.click(input);
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    await expect(input).toHaveAttribute('aria-expanded', 'false');

    // ArrowDown öffnet das geschlossene Menü (Referenzverhalten, unverändert).
    await userEvent.keyboard('{ArrowDown}');
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    await expect(input).toHaveAttribute('aria-expanded', 'false');

    // ArrowUp öffnet das geschlossene Menü genauso (der eigentliche Fix).
    await userEvent.keyboard('{ArrowUp}');
    await expect(input).toHaveAttribute('aria-expanded', 'true');

    // Home/End auf der (noch ungefilterten) Optionsliste.
    const options = c.getAllByRole('option');
    await userEvent.keyboard('{End}');
    await expect(input).toHaveAttribute('aria-activedescendant', options[options.length - 1].id);
    await userEvent.keyboard('{Home}');
    await expect(input).toHaveAttribute('aria-activedescendant', options[0].id);

    // Enter wählt die aktive (erste) Option → Chip „Künstliche Intelligenz“.
    await userEvent.keyboard('{Enter}');
    await expect(c.getAllByRole('button', {
      name: / entfernen$/
    })).toHaveLength(1);

    // Filtertext ohne Auswahl tippen, dann Escape: schließt UND leert das Feld.
    await userEvent.type(input, 'Cloud');
    await expect(input).toHaveValue('Cloud');
    await userEvent.keyboard('{Escape}');
    await expect(input).toHaveValue('');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Multi-Select',
  args: {
    label: 'Interessen',
    options: INTERESSEN,
    placeholder: 'Hinzufügen…',
    area: 'wo',
    multi: true,
    values: ['ki', 'ds', 'ux']
  },
  // Statischer Ruhezustand (drei voreingestellte Chips, kein Fokus/Popup) — bewusst
  // OHNE play, damit der Visual-Snapshot deterministisch ist. Die Tipp-/Auswahl-
  // Interaktion prüft „Multi-Select · Hinzufügen“ (dort snapshot-frei).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(c.getAllByRole('button', {
      name: / entfernen$/
    })).toHaveLength(3);
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Multi-Select · Hinzufügen',
  args: {
    label: 'Interessen',
    options: INTERESSEN,
    placeholder: 'Hinzufügen…',
    area: 'wo',
    multi: true,
    values: ['ki', 'ds']
  },
  // Interaktionstest: startet mit zwei Chips, ein weiteres Interesse tippen + wählen → drei.
  // Vom Visual-Snapshot ausgenommen: der getippte/fokussierte Zwischenzustand ist nicht
  // pixel-deterministisch (Sub-Pixel-Antialiasing → ~2px Rauschen bei jedem Re-Baseline).
  parameters: {
    snapshot: {
      skip: true
    }
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await userEvent.type(c.getByRole('combobox'), 'UX');
    await userEvent.click(await c.findByRole('option', {
      name: 'UX & Forschung'
    }));
    await waitFor(() => expect(c.getAllByRole('button', {
      name: / entfernen$/
    })).toHaveLength(3));
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Formularbindung',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    },
    docs: {
      description: {
        story: 'Die Combobox ist ein \`ControlValueAccessor\` und bindet direkt an reactive ' + 'forms (\`formControl\`); im Einzelmodus ist der Formularwert der Options-\`value\` ' + '(hier live angezeigt), im Multi-Modus ein \`string[]\`. Ohne Formular gehen ' + '\`[(value)]\` / \`[(values)]\`.'
      }
    }
  },
  render: () => {
    const ctrl = new FormControl('');
    return {
      moduleMetadata: {
        imports: [ComboboxComponent, ReactiveFormsModule]
      },
      props: {
        ctrl,
        options: THEMEN
      },
      template: \`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-combobox label="Thema" [options]="options" [formControl]="ctrl"></cds-combobox>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '(leer)' }}</strong></p>
        </div>
      \`
    };
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const input = c.getByRole('combobox');
    await userEvent.type(input, 'Cloud');
    await userEvent.click(await c.findByRole('option', {
      name: 'Cloud-Migration'
    }));
    await waitFor(() => expect(canvasElement).toHaveTextContent('Wert: cloud'));
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Multi-Select · Chip entfernen',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  args: {
    label: 'Interessen',
    options: INTERESSEN,
    placeholder: 'Hinzufügen…',
    area: 'wo',
    multi: true,
    values: ['ki', 'ds']
  },
  // Das Label nennt die Option („<Label> entfernen“), nach dem Entfernen steht der Fokus
  // wieder im Eingabefeld statt auf dem verschwundenen Button.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', {
      name: 'Design Systems entfernen'
    }));
    await expect(c.queryByRole('button', {
      name: 'Design Systems entfernen'
    })).toBeNull();
    await expect(c.getAllByRole('button', {
      name: / entfernen$/
    })).toHaveLength(1);
    await expect(c.getByRole('combobox')).toHaveFocus();
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Einzelauswahl · Eingabe löschen hebt Auswahl auf',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  render: () => {
    const ctrl = new FormControl('cloud');
    return {
      moduleMetadata: {
        imports: [ComboboxComponent, ReactiveFormsModule]
      },
      props: {
        ctrl,
        options: THEMEN
      },
      template: \`
        <cds-combobox label="Thema" [options]="options" [formControl]="ctrl"></cds-combobox>
        <p data-testid="wert">Wert: {{ ctrl.value || '(leer)' }}</p>
      \`
    };
  },
  // Der Lösch-Button leert nicht nur den Text, sondern hebt die Auswahl auf: Auch nach
  // dem Schließen bleibt das Feld leer, der Formularwert ist geleert.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const input = c.getByRole('combobox');
    await expect(input).toHaveValue('Cloud-Migration');
    await userEvent.click(c.getByRole('button', {
      name: 'Eingabe löschen'
    }));
    await expect(input).toHaveFocus();
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.keyboard('{Escape}');
    await expect(input).toHaveValue('');
    await expect(canvasElement).toHaveTextContent('Wert: (leer)');
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Menü · Mehrfachauswahl und Leerzustand',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [ComboboxComponent]
    },
    props: {
      options: INTERESSEN,
      themen: THEMEN
    },
    template: \`
      <div data-testid="multi"><cds-combobox label="Interessen" [options]="options" [multi]="true"></cds-combobox></div>
      <div data-testid="einzel"><cds-combobox label="Thema" [options]="themen"></cds-combobox></div>
    \`
  }),
  // Die Mehrfachauswahl-Listbox trägt aria-multiselectable, die Einzelauswahl nicht.
  // Der Leerzustand ist eine Statusmeldung (role=status) außerhalb der Listbox mit dem Vorgabetext „Keine Treffer“.
  play: async ({
    canvasElement
  }) => {
    const multi = within(within(canvasElement).getByTestId('multi'));
    const einzel = within(within(canvasElement).getByTestId('einzel'));
    await expect(multi.getByRole('listbox', {
      hidden: true
    })).toHaveAttribute('aria-multiselectable', 'true');
    await expect(einzel.getByRole('listbox', {
      hidden: true
    })).not.toHaveAttribute('aria-multiselectable');

    // Die Live-Region steht vor dem Filtern leer im DOM, damit der Wechsel angesagt wird.
    const leer = multi.getByRole('status');
    await expect(leer).toBeEmptyDOMElement();
    await userEvent.type(multi.getByRole('combobox'), 'zzz');
    await expect(leer).toHaveTextContent('Keine Treffer');
    const panel = within(canvasElement).getByTestId('multi').querySelector('.ep-combobox-empty');
    await expect(panel?.closest('.ep-combobox-menu')).toHaveAttribute('aria-hidden', 'true');
    // Die Meldung ist keine Option und steht außerhalb der Listbox; die leere Listbox ist ausgeblendet.
    await expect(leer.closest('[role="listbox"]')).toBeNull();
    await expect(multi.queryByRole('listbox')).toBeNull();
    await expect(multi.queryAllByRole('option')).toHaveLength(0);
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Chevron schaltet das Menü um',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Ein Klick auf den Chevron schließt ein offenes und öffnet ein geschlossenes Menü.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const input = c.getByRole('combobox');
    const chevron = canvasElement.querySelector<HTMLElement>('.ep-select-caret');
    if (!chevron) throw new Error('Chevron fehlt.');
    await userEvent.click(chevron);
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(chevron);
    await expect(input).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(chevron);
    await expect(input).toHaveAttribute('aria-expanded', 'true');
  }
}`,...q.parameters?.docs?.source}}}})))()}init_combobox_stories();export{q as ChevronUmschalten,W as ChipEntfernen,G as EinzelauswahlLoeschen,U as Formularbindung,z as Interaktiv,K as MenueAttribute,V as MultiSelect,H as MultiSelectHinzufuegen,B as Tastatur,J as __namedExportsOrder,R as default};