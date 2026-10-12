import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,Ut as o,bn as s,k as c,q as l,z as u}from"./angular-platform-BGeCprOl.js";import{i as d,n as f,r as p,t as m}from"./forms-CsHRYVN2.js";import{n as h,t as g}from"./cva-base.directive-CmqEZn86.js";var _,v;function init_radio_group_component(){return(init_radio_group_component=e((()=>{a(),n(),d(),h(),_=0,v=class RadioGroupComponent extends g{legend=i(`Optionen`);options=i([]);value=c(``);name=i(`cds-radio-${++_}`);required=i(!1);disabled=c(!1);area=i(`co`);normalizeValue(e){return e??``}applyValue(e){this.value.set(e)}applyDisabled(e){this.disabled.set(e)}onRadioChange(e){this.value.set(e),this.onChange(e),this.onTouched()}markTouched(){this.onTouched()}static propDecorators={legend:[{type:r,args:[{isSignal:!0,alias:`legend`,required:!1,transform:void 0}]}],options:[{type:r,args:[{isSignal:!0,alias:`options`,required:!1,transform:void 0}]}],value:[{type:r,args:[{isSignal:!0,alias:`value`,required:!1}]},{type:l,args:[`valueChange`]}],name:[{type:r,args:[{isSignal:!0,alias:`name`,required:!1,transform:void 0}]}],required:[{type:r,args:[{isSignal:!0,alias:`required`,required:!1,transform:void 0}]}],disabled:[{type:r,args:[{isSignal:!0,alias:`disabled`,required:!1}]},{type:l,args:[`disabledChange`]}],area:[{type:r,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}]}},v=s([t({selector:`cds-radio-group`,changeDetection:u.OnPush,providers:[{provide:f,useExisting:o(()=>v),multi:!0}],template:`
    <fieldset style="border:0;padding:0;margin:0;min-inline-size:0">
      <!-- prettier-ignore -->
      <legend
        style="font:var(--ty-label-sm);text-transform:uppercase;letter-spacing:.06em;color:var(--tx-secondary);margin-bottom:var(--s2);padding:0"
        >{{ legend() }}@if (required()) {&nbsp;<span class="req" aria-hidden="true">*</span>}</legend
      >
      <div style="display:flex;flex-direction:column;gap:var(--s3)">
        @for (opt of options(); track opt) {
          <label
            style="display:flex;align-items:center;gap:var(--s3);cursor:pointer;font:var(--ty-body-md);color:var(--tx-primary)"
          >
            <input
              type="radio"
              [name]="name()"
              [value]="opt"
              [checked]="opt === value()"
              [disabled]="disabled()"
              [attr.required]="required() ? '' : null"
              [attr.aria-required]="required() ? 'true' : null"
              [style.accent-color]="'var(--' + area() + '-500)'"
              style="width:18px;height:18px;flex-shrink:0;cursor:pointer"
              (change)="onRadioChange(opt)"
              (blur)="markTouched()"
            />
            <span>{{ opt }}</span>
          </label>
        }
      </div>
    </fieldset>
  `})],v)})))()}var y,b,x,S,C,w,T,E,D,O,k,A;function init_radio_group_stories(){return(init_radio_group_stories=e((()=>{d(),init_radio_group_component(),{within:y,userEvent:b,expect:x,waitFor:S}=__STORYBOOK_MODULE_TEST__,C={title:`Komponenten/Inputs & Forms/Radio`,component:v,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-2305`},layout:`padded`,docs:{description:{component:`Optionsfelder für 2 bis 6 sich gegenseitig ausschließende Optionen (mehr → Auswahlfeld, Mehrfachauswahl → Checkbox). Native Radio-Buttons mit Bereichsfarbe (accent-color), gruppiert in fieldset/legend, sodass Screenreader Frage und Optionen als zusammengehörig ansagen. WCAG AA.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]},required:{control:`boolean`},disabled:{control:`boolean`}},args:{legend:`Bevorzugter Kontaktweg`,options:[`E-Mail`,`Telefon`,`Beides`],value:`E-Mail`,required:!1,disabled:!1,area:`co`}},w={},T={args:{disabled:!0},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=y(e);for(let e of t.getAllByRole(`radio`))await x(e).toBeDisabled()}},E={name:`Pflichtfeld`,args:{required:!0},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=y(e);for(let e of t.getAllByRole(`radio`))await x(e).toHaveAttribute(`aria-required`,`true`)}},D={name:`Tastatur`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=y(e),n=t.getByRole(`radio`,{name:`E-Mail`}),r=t.getByRole(`radio`,{name:`Telefon`}),i=t.getByRole(`radio`,{name:`Beides`});n.focus(),await x(n).toBeChecked(),await b.keyboard(`{ArrowDown}`),await x(r).toBeChecked(),await x(r).toHaveFocus(),await b.keyboard(`{ArrowDown}`),await x(i).toBeChecked(),await x(i).toHaveFocus(),await b.keyboard(`{ArrowUp}`),await x(r).toBeChecked(),await x(r).toHaveFocus()}},O={name:`Fokusring`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=y(e);await b.tab();let n=t.getAllByRole(`radio`).find(e=>e===document.activeElement);await x(n).toBeDefined();let r=getComputedStyle(n);await x(r.outlineStyle).toBe(`none`),await x(r.boxShadow).not.toBe(`none`)}},k={name:`Formularbindung`,parameters:{controls:{disable:!0},snapshot:{skip:!0},docs:{description:{story:"Die Radio-Gruppe ist ein `ControlValueAccessor` und bindet direkt an reactive forms (`formControl`), der Wert lässt sich so auslesen (hier live angezeigt) und validieren. Ohne Formular geht alternativ `[(value)]`."}}},render:()=>{let e=new m(`E-Mail`);return{moduleMetadata:{imports:[v,p]},props:{ctrl:e,options:[`E-Mail`,`Telefon`,`Beides`]},template:`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-radio-group legend="Bevorzugter Kontaktweg" [options]="options" [formControl]="ctrl"></cds-radio-group>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '(leer)' }}</strong></p>
        </div>
      `}},play:async({canvasElement:e})=>{let t=y(e);await x(e).toHaveTextContent(`Wert: E-Mail`),await b.click(t.getByRole(`radio`,{name:`Telefon`})),await S(()=>x(e).toHaveTextContent(`Wert: Telefon`))}},A=[`Interaktiv`,`Deaktiviert`,`Pflichtfeld`,`Tastatur`,`Fokusring`,`Formularbindung`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    for (const radio of c.getAllByRole('radio')) {
      await expect(radio).toBeDisabled();
    }
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Pflichtfeld',
  // Deckt den &nbsp;-getrennten Pflicht-Asterisk in der <legend> ab (prettier-ignore
  // im Template, weil das &nbsp; direkt an der @if-Interpolation hängt).
  args: {
    required: true
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    for (const radio of c.getAllByRole('radio')) {
      await expect(radio).toHaveAttribute('aria-required', 'true');
    }
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Tastatur',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Radios teilen einen name → Pfeiltasten wechseln die Auswahl UND den Fokus
  // innerhalb der Gruppe, ganz ohne Tab (userEvent bildet damit dieselbe
  // name-basierte Gruppierung nach, die Browser für natives radio-Verhalten nutzen).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const email = c.getByRole('radio', {
      name: 'E-Mail'
    });
    const telefon = c.getByRole('radio', {
      name: 'Telefon'
    });
    const beides = c.getByRole('radio', {
      name: 'Beides'
    });
    email.focus();
    await expect(email).toBeChecked();
    await userEvent.keyboard('{ArrowDown}');
    await expect(telefon).toBeChecked();
    await expect(telefon).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(beides).toBeChecked();
    await expect(beides).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(telefon).toBeChecked();
    await expect(telefon).toHaveFocus();
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Fokusring',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Tastaturfokus zeigt den Marken-Fokusring (box-shadow) statt des Browser-Standardrings.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await userEvent.tab();
    const radio = c.getAllByRole('radio').find(r => r === document.activeElement);
    await expect(radio).toBeDefined();
    const stil = getComputedStyle(radio as HTMLElement);
    await expect(stil.outlineStyle).toBe('none');
    await expect(stil.boxShadow).not.toBe('none');
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
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
        story: 'Die Radio-Gruppe ist ein \`ControlValueAccessor\` und bindet direkt an ' + 'reactive forms (\`formControl\`), der Wert lässt sich so auslesen (hier live ' + 'angezeigt) und validieren. Ohne Formular geht alternativ \`[(value)]\`.'
      }
    }
  },
  render: () => {
    const ctrl = new FormControl('E-Mail');
    return {
      moduleMetadata: {
        imports: [RadioGroupComponent, ReactiveFormsModule]
      },
      props: {
        ctrl,
        options: ['E-Mail', 'Telefon', 'Beides']
      },
      template: \`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-radio-group legend="Bevorzugter Kontaktweg" [options]="options" [formControl]="ctrl"></cds-radio-group>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '(leer)' }}</strong></p>
        </div>
      \`
    };
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Wert: E-Mail');
    await userEvent.click(c.getByRole('radio', {
      name: 'Telefon'
    }));
    await waitFor(() => expect(canvasElement).toHaveTextContent('Wert: Telefon'));
  }
}`,...k.parameters?.docs?.source}}}})))()}init_radio_group_stories();export{T as Deaktiviert,O as Fokusring,k as Formularbindung,w as Interaktiv,E as Pflichtfeld,D as Tastatur,A as __namedExportsOrder,C as default};