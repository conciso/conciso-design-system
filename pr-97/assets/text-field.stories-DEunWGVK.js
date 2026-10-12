import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{A as n,At as r,H as i,V as a,fn as o,k as s,q as c,sn as l}from"./angular-platform-CAY__VLP.js";import{i as u,n as d,r as f,t as p}from"./forms-CAzAEGKf.js";import{i as m,n as h,r as g,t as _}from"./field-shell.component-DUmY17WE.js";var v;function init_text_field_component(){return(init_text_field_component=e((()=>{o(),s(),u(),m(),h(),v=class TextFieldComponent extends g{type=n(`text`);placeholder=n(``);static propDecorators={type:[{type:c,args:[{isSignal:!0,alias:`type`,required:!1,transform:void 0}]}],placeholder:[{type:c,args:[{isSignal:!0,alias:`placeholder`,required:!1,transform:void 0}]}]}},v=l([i({selector:`cds-text-field`,changeDetection:a.OnPush,imports:[_],providers:[{provide:d,useExisting:r(()=>v),multi:!0}],template:`
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
      <input
        [id]="fieldId()"
        [type]="type()"
        [placeholder]="placeholder()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.required]="required() ? '' : null"
        [attr.aria-required]="required() ? 'true' : null"
        [attr.aria-invalid]="error() ? 'true' : null"
        [attr.aria-describedby]="error() ? errorId() : null"
        (input)="handleInput($event)"
        (blur)="handleBlur()"
      />
    </cds-field-shell>
  `})],v)})))()}var y=t({Deaktiviert:()=>E,Fehlerzustand:()=>T,FehlerzustandMitAlert:()=>k,FehlerzustandRuhig:()=>O,Formularbindung:()=>D,Interaktiv:()=>w,__namedExportsOrder:()=>A,default:()=>C}),b,x,S,C,w,T,E,D,O,k,A;function init_text_field_stories(){return(init_text_field_stories=e((()=>{u(),init_text_field_component(),{within:b,userEvent:x,expect:S}=__STORYBOOK_MODULE_TEST__,C={title:`Komponenten/Inputs & Forms/Textfeld`,component:v,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=3-1900`},layout:`padded`,docs:{description:{component:`Einzeiliges Textfeld: verbindet Label, Eingabe, Hilfetext und Fehlermeldung zu einer zusammenhängenden Einheit. Über den Typ für E-Mail, Telefon, Text usw. Pflichtfelder werden markiert; im Fehlerzustand erscheint eine Meldung. WCAG AA.`}}},argTypes:{type:{control:`text`},required:{control:`boolean`}},args:{label:`E-Mail`,type:`email`,placeholder:`name@firma.de`,helper:`Wir nutzen die Adresse ausschließlich für die Antwort.`,error:``,required:!0,fieldId:`demo-email`}},w={},T={args:{error:`Bitte eine gültige E-Mail-Adresse eingeben.`,fieldId:`demo-email-error`}},E={args:{fieldId:`demo-email-disabled`,disabled:!0},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=b(e).getByLabelText(/E-Mail/);await S(t).toBeDisabled();let n=getComputedStyle(t);await S(Number(n.opacity)).toBeLessThan(1),await S(n.cursor).toBe(`not-allowed`)}},D={name:`Formularbindung`,parameters:{controls:{disable:!0},snapshot:{skip:!0},docs:{description:{story:"Das Feld ist ein `ControlValueAccessor` und bindet direkt an reactive forms (`formControl`), genau so wird die Komponentenbibliothek in echten Angular-Projekten konsumiert. Der Wert lässt sich damit auslesen (hier live angezeigt) und validieren. Ohne Formular geht alternativ `[(value)]`."}}},render:()=>{let e=new p(``);return{moduleMetadata:{imports:[v,f]},props:{ctrl:e},template:`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-text-field
            label="E-Mail"
            type="email"
            placeholder="name@firma.de"
            fieldId="demo-email-form"
            [formControl]="ctrl"
          ></cds-text-field>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">
            Wert: <strong>{{ ctrl.value || '(leer)' }}</strong>
          </p>
        </div>
      `}},play:async({canvasElement:e})=>{let t=b(e).getByLabelText(/E-Mail/);await S(e).toHaveTextContent(`Wert: (leer)`),await x.type(t,`maria@firma.de`),await S(t).toHaveValue(`maria@firma.de`),await S(e).toHaveTextContent(`Wert: maria@firma.de`)}},O={name:`Fehlerzustand · ruhig (Fehlerübersicht sagt an)`,args:{error:`Bitte eine gültige E-Mail-Adresse eingeben.`,fieldId:`demo-email-quiet`,quietError:!0},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=b(e),n=t.getByLabelText(/E-Mail/);await S(t.queryByRole(`alert`)).toBeNull();let r=t.getByText(`Bitte eine gültige E-Mail-Adresse eingeben.`);await S(r).toBeVisible(),await S(n).toHaveAttribute(`aria-describedby`,r.id),await S(n).toHaveAttribute(`aria-invalid`,`true`)}},k={name:`Fehlerzustand · Vorgabe mit Alert`,args:{error:`Bitte eine gültige E-Mail-Adresse eingeben.`,fieldId:`demo-email-alert`},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=b(e);await S(t.getByRole(`alert`)).toHaveTextContent(`Bitte eine gültige E-Mail-Adresse`)}},A=[`Interaktiv`,`Fehlerzustand`,`Deaktiviert`,`Formularbindung`,`FehlerzustandRuhig`,`FehlerzustandMitAlert`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    error: 'Bitte eine gültige E-Mail-Adresse eingeben.',
    fieldId: 'demo-email-error'
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    fieldId: 'demo-email-disabled',
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
    const control = c.getByLabelText(/E-Mail/);
    await expect(control).toBeDisabled();
    // Sichtbar vom aktiven Zustand unterscheidbar: reduzierte Deckkraft, Sperr-Cursor.
    const stil = getComputedStyle(control);
    await expect(Number(stil.opacity)).toBeLessThan(1);
    await expect(stil.cursor).toBe('not-allowed');
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Formularbindung',
  parameters: {
    controls: {
      disable: true
    },
    // Getippter/fokussierter Endzustand → nicht deterministisch snapshotten.
    snapshot: {
      skip: true
    },
    docs: {
      description: {
        story: 'Das Feld ist ein \`ControlValueAccessor\` und bindet direkt an reactive ' + 'forms (\`formControl\`), genau so wird die Komponentenbibliothek in echten ' + 'Angular-Projekten konsumiert. Der Wert lässt sich damit auslesen (hier live ' + 'angezeigt) und validieren. Ohne Formular geht alternativ \`[(value)]\`.'
      }
    }
  },
  render: () => {
    const ctrl = new FormControl('');
    return {
      moduleMetadata: {
        imports: [TextFieldComponent, ReactiveFormsModule]
      },
      props: {
        ctrl
      },
      template: \`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-text-field
            label="E-Mail"
            type="email"
            placeholder="name@firma.de"
            fieldId="demo-email-form"
            [formControl]="ctrl"
          ></cds-text-field>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">
            Wert: <strong>{{ ctrl.value || '(leer)' }}</strong>
          </p>
        </div>
      \`
    };
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const input = c.getByLabelText(/E-Mail/);
    await expect(canvasElement).toHaveTextContent('Wert: (leer)');
    // Tippen → CVA schreibt in den FormControl, Anzeige liest den Wert aus.
    await userEvent.type(input, 'maria@firma.de');
    await expect(input).toHaveValue('maria@firma.de');
    await expect(canvasElement).toHaveTextContent('Wert: maria@firma.de');
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Fehlerzustand · ruhig (Fehlerübersicht sagt an)',
  args: {
    error: 'Bitte eine gültige E-Mail-Adresse eingeben.',
    fieldId: 'demo-email-quiet',
    quietError: true
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  // In langen Formularen trägt die fokussierte Fehlerübersicht das role="alert". Die
  // Einzelmeldung bleibt sichtbar und über aria-describedby am Feld, sagt sich aber nicht selbst an.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const feld = c.getByLabelText(/E-Mail/);
    await expect(c.queryByRole('alert')).toBeNull();
    const meldung = c.getByText('Bitte eine gültige E-Mail-Adresse eingeben.');
    await expect(meldung).toBeVisible();
    await expect(feld).toHaveAttribute('aria-describedby', meldung.id);
    await expect(feld).toHaveAttribute('aria-invalid', 'true');
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Fehlerzustand · Vorgabe mit Alert',
  args: {
    error: 'Bitte eine gültige E-Mail-Adresse eingeben.',
    fieldId: 'demo-email-alert'
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
    await expect(c.getByRole('alert')).toHaveTextContent('Bitte eine gültige E-Mail-Adresse');
  }
}`,...k.parameters?.docs?.source}}}})))()}export{y as n,init_text_field_stories as t};