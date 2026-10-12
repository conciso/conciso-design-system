import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,At as n,H as r,V as i,fn as a,k as o,q as s,sn as c}from"./angular-platform-CAY__VLP.js";import{i as l,n as u,r as d,t as f}from"./forms-CAzAEGKf.js";import{i as p,n as m,r as h,t as g}from"./field-shell.component-DUmY17WE.js";var _;function init_select_field_component(){return(init_select_field_component=e((()=>{a(),o(),l(),p(),m(),_=class SelectFieldComponent extends h{options=t([]);static propDecorators={options:[{type:s,args:[{isSignal:!0,alias:`options`,required:!1,transform:void 0}]}]}},_=c([r({selector:`cds-select-field`,changeDetection:i.OnPush,imports:[g],providers:[{provide:u,useExisting:n(()=>_),multi:!0}],template:`
    <cds-field-shell
      [label]="label()"
      [required]="required()"
      [helper]="helper()"
      [error]="error()"
      [fieldId]="fieldId()"
      [errorId]="errorId()"
      [quietError]="quietError()"
    >
      <!-- required nativ zusätzlich zu aria-required: natives HTML5-required für die
           Formular-Validierung im Browser, aria-required für den Screenreader-Zustand. -->
      <select
        [id]="fieldId()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.required]="required() ? '' : null"
        [attr.aria-required]="required() ? 'true' : null"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-describedby]="error() ? errorId() : null"
        (change)="handleInput($event)"
        (blur)="handleBlur()"
      >
        @for (opt of options(); track opt) {
          <option>{{ opt }}</option>
        }
      </select>
    </cds-field-shell>
  `})],_)})))()}var v,y,b,x,S,C,w,T,E,D,O;function init_select_field_stories(){return(init_select_field_stories=e((()=>{l(),init_select_field_component(),{within:v,userEvent:y,expect:b,waitFor:x}=__STORYBOOK_MODULE_TEST__,S={title:`Komponenten/Inputs & Forms/Auswahlfeld`,component:_,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-2548`},layout:`padded`,docs:{description:{component:`Auswahlfeld (Dropdown): Label, Select, Hilfetext und Fehlermeldung als zusammenhängende Einheit. Die erste Option dient üblicherweise als Platzhalter. Pflichtfelder werden markiert; im Fehlerzustand erscheint eine Meldung. WCAG AA.`}}},argTypes:{required:{control:`boolean`}},args:{label:`Bereich`,options:[`Bitte wählen`,`Corporate`,`Angewandte KI`,`Effektive Software`],helper:`Worum geht es?`,error:``,required:!1,fieldId:`demo-area`}},C={},w={args:{error:`Bitte wähle eine Option.`,fieldId:`demo-area-error`},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=v(e),n=t.getByLabelText(/Bereich/),r=t.getByText(`Bitte wähle eine Option.`);await b(r).toBeVisible(),await b(n).toHaveAttribute(`aria-describedby`,b.stringContaining(r.id)),await b(n).toHaveAttribute(`aria-invalid`,`true`)}},T={args:{fieldId:`demo-area-disabled`,disabled:!0},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=v(e).getByLabelText(/Bereich/);await b(t).toBeDisabled();let n=getComputedStyle(t);await b(Number(n.opacity)).toBeLessThan(1),await b(n.cursor).toBe(`not-allowed`)}},E={name:`Leere Optionsliste`,args:{fieldId:`demo-area-empty`,options:[]},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=v(e).getByLabelText(/Bereich/);await b(t.options).toHaveLength(0),t.focus(),await b(t).toHaveFocus()}},D={name:`Formularbindung`,parameters:{controls:{disable:!0},snapshot:{skip:!0},docs:{description:{story:"Das Auswahlfeld ist ein `ControlValueAccessor` (via FieldBase) und bindet direkt an reactive forms (`formControl`); der Formularwert ist der Options-Text (hier live angezeigt). Ohne Formular geht alternativ `[(value)]`."}}},render:()=>{let e=new f(``);return{moduleMetadata:{imports:[_,d]},props:{ctrl:e,options:[`Bitte wählen`,`Corporate`,`Angewandte KI`,`Effektive Software`]},template:`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-select-field
            label="Bereich"
            [options]="options"
            fieldId="form-area"
            [formControl]="ctrl"
          ></cds-select-field>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '(leer)' }}</strong></p>
        </div>
      `}},play:async({canvasElement:e})=>{let t=v(e);await y.selectOptions(t.getByLabelText(/Bereich/),`Corporate`),await x(()=>b(e).toHaveTextContent(`Wert: Corporate`))}},O=[`Interaktiv`,`Fehlerzustand`,`Deaktiviert`,`LeereOptionsliste`,`Formularbindung`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    error: 'Bitte wähle eine Option.',
    fieldId: 'demo-area-error'
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
    const feld = c.getByLabelText(/Bereich/);
    const meldung = c.getByText('Bitte wähle eine Option.');
    await expect(meldung).toBeVisible();
    await expect(feld).toHaveAttribute('aria-describedby', expect.stringContaining(meldung.id));
    await expect(feld).toHaveAttribute('aria-invalid', 'true');
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    fieldId: 'demo-area-disabled',
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
    const control = c.getByLabelText(/Bereich/);
    await expect(control).toBeDisabled();
    // Sichtbar vom aktiven Zustand unterscheidbar: reduzierte Deckkraft, Sperr-Cursor.
    const stil = getComputedStyle(control);
    await expect(Number(stil.opacity)).toBeLessThan(1);
    await expect(stil.cursor).toBe('not-allowed');
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Leere Optionsliste',
  args: {
    fieldId: 'demo-area-empty',
    options: []
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  // Randfall: keine Optionen → das native <select> bleibt leer, rendert aber ohne
  // Fehler und bleibt fokussierbar.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const select = c.getByLabelText(/Bereich/) as HTMLSelectElement;
    await expect(select.options).toHaveLength(0);
    select.focus();
    await expect(select).toHaveFocus();
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
        story: 'Das Auswahlfeld ist ein \`ControlValueAccessor\` (via FieldBase) und bindet ' + 'direkt an reactive forms (\`formControl\`); der Formularwert ist der Options-' + 'Text (hier live angezeigt). Ohne Formular geht alternativ \`[(value)]\`.'
      }
    }
  },
  render: () => {
    const ctrl = new FormControl('');
    return {
      moduleMetadata: {
        imports: [SelectFieldComponent, ReactiveFormsModule]
      },
      props: {
        ctrl,
        options: ['Bitte wählen', 'Corporate', 'Angewandte KI', 'Effektive Software']
      },
      template: \`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-select-field
            label="Bereich"
            [options]="options"
            fieldId="form-area"
            [formControl]="ctrl"
          ></cds-select-field>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '(leer)' }}</strong></p>
        </div>
      \`
    };
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await userEvent.selectOptions(c.getByLabelText(/Bereich/), 'Corporate');
    await waitFor(() => expect(canvasElement).toHaveTextContent('Wert: Corporate'));
  }
}`,...D.parameters?.docs?.source}}}})))()}init_select_field_stories();export{T as Deaktiviert,w as Fehlerzustand,D as Formularbindung,C as Interaktiv,E as LeereOptionsliste,O as __namedExportsOrder,S as default};