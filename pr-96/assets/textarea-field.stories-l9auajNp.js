import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,At as n,H as r,V as i,fn as a,k as o,q as s,sn as c}from"./angular-platform-CAY__VLP.js";import{i as l,n as u,r as d,t as f}from"./forms-CAzAEGKf.js";import{i as p,n as m,r as h,t as g}from"./field-shell.component-DUmY17WE.js";var _;function init_textarea_field_component(){return(init_textarea_field_component=e((()=>{a(),o(),l(),p(),m(),_=class TextareaFieldComponent extends h{placeholder=t(``);static propDecorators={placeholder:[{type:s,args:[{isSignal:!0,alias:`placeholder`,required:!1,transform:void 0}]}]}},_=c([r({selector:`cds-textarea-field`,changeDetection:i.OnPush,imports:[g],providers:[{provide:u,useExisting:n(()=>_),multi:!0}],template:`
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
      <textarea
        [id]="fieldId()"
        [placeholder]="placeholder()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.required]="required() ? '' : null"
        [attr.aria-required]="required() ? 'true' : null"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-describedby]="error() ? errorId() : null"
        (input)="handleInput($event)"
        (blur)="handleBlur()"
      ></textarea>
    </cds-field-shell>
  `})],_)})))()}var v,y,b,x,S,C,w,T,E,D;function init_textarea_field_stories(){return(init_textarea_field_stories=e((()=>{l(),init_textarea_field_component(),{within:v,userEvent:y,expect:b,waitFor:x}=__STORYBOOK_MODULE_TEST__,S={title:`Komponenten/Inputs & Forms/Textbereich`,component:_,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-2582`},layout:`padded`,docs:{description:{component:`Mehrzeiliges Textfeld für längere Eingaben (z. B. Nachrichten): Label, Textbereich, Hilfetext und Fehlermeldung als zusammenhängende Einheit. Pflichtfelder werden markiert; im Fehlerzustand erscheint eine Meldung. WCAG AA.`}}},argTypes:{required:{control:`boolean`}},args:{label:`Nachricht`,placeholder:`Ihre Nachricht an uns`,helper:`Mind. 20 Zeichen.`,error:``,required:!1,fieldId:`demo-message`}},C={},w={args:{error:`Bitte gib eine Nachricht ein.`,fieldId:`demo-message-error`},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=v(e),n=t.getByLabelText(/Nachricht/),r=t.getByText(`Bitte gib eine Nachricht ein.`);await b(r).toBeVisible(),await b(n).toHaveAttribute(`aria-describedby`,b.stringContaining(r.id)),await b(n).toHaveAttribute(`aria-invalid`,`true`)}},T={args:{fieldId:`demo-message-disabled`,disabled:!0},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=v(e).getByLabelText(/Nachricht/);await b(t).toBeDisabled();let n=getComputedStyle(t);await b(Number(n.opacity)).toBeLessThan(1),await b(n.cursor).toBe(`not-allowed`)}},E={name:`Formularbindung`,parameters:{controls:{disable:!0},snapshot:{skip:!0},docs:{description:{story:"Der Textbereich ist ein `ControlValueAccessor` (via FieldBase) und bindet direkt an reactive forms (`formControl`), der Wert lässt sich so auslesen (hier die Zeichenzahl) und validieren. Ohne Formular geht alternativ `[(value)]`."}}},render:()=>{let e=new f(``);return{moduleMetadata:{imports:[_,d]},props:{ctrl:e},template:`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-textarea-field
            label="Nachricht"
            placeholder="Ihre Nachricht an uns"
            fieldId="form-message"
            [formControl]="ctrl"
          ></cds-textarea-field>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Zeichen: <strong>{{ ctrl.value?.length || 0 }}</strong></p>
        </div>
      `}},play:async({canvasElement:e})=>{let t=v(e);await b(e).toHaveTextContent(`Zeichen: 0`),await y.type(t.getByLabelText(/Nachricht/),`Hallo`),await x(()=>b(e).toHaveTextContent(`Zeichen: 5`))}},D=[`Interaktiv`,`Fehlerzustand`,`Deaktiviert`,`Formularbindung`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    error: 'Bitte gib eine Nachricht ein.',
    fieldId: 'demo-message-error'
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
    const feld = c.getByLabelText(/Nachricht/);
    const meldung = c.getByText('Bitte gib eine Nachricht ein.');
    await expect(meldung).toBeVisible();
    await expect(feld).toHaveAttribute('aria-describedby', expect.stringContaining(meldung.id));
    await expect(feld).toHaveAttribute('aria-invalid', 'true');
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    fieldId: 'demo-message-disabled',
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
    const control = c.getByLabelText(/Nachricht/);
    await expect(control).toBeDisabled();
    // Sichtbar vom aktiven Zustand unterscheidbar: reduzierte Deckkraft, Sperr-Cursor.
    const stil = getComputedStyle(control);
    await expect(Number(stil.opacity)).toBeLessThan(1);
    await expect(stil.cursor).toBe('not-allowed');
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
        story: 'Der Textbereich ist ein \`ControlValueAccessor\` (via FieldBase) und bindet ' + 'direkt an reactive forms (\`formControl\`), der Wert lässt sich so auslesen ' + '(hier die Zeichenzahl) und validieren. Ohne Formular geht alternativ \`[(value)]\`.'
      }
    }
  },
  render: () => {
    const ctrl = new FormControl('');
    return {
      moduleMetadata: {
        imports: [TextareaFieldComponent, ReactiveFormsModule]
      },
      props: {
        ctrl
      },
      template: \`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-textarea-field
            label="Nachricht"
            placeholder="Ihre Nachricht an uns"
            fieldId="form-message"
            [formControl]="ctrl"
          ></cds-textarea-field>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Zeichen: <strong>{{ ctrl.value?.length || 0 }}</strong></p>
        </div>
      \`
    };
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Zeichen: 0');
    await userEvent.type(c.getByLabelText(/Nachricht/), 'Hallo');
    await waitFor(() => expect(canvasElement).toHaveTextContent('Zeichen: 5'));
  }
}`,...E.parameters?.docs?.source}}}})))()}init_textarea_field_stories();export{T as Deaktiviert,w as Fehlerzustand,E as Formularbindung,C as Interaktiv,D as __namedExportsOrder,S as default};