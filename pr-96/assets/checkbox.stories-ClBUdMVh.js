import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,At as n,H as r,V as i,Y as a,fn as o,j as s,k as c,q as l,sn as u}from"./angular-platform-CAY__VLP.js";import{i as d,n as f}from"./forms-CAzAEGKf.js";import{n as p,t as m}from"./cva-base.directive-PVycmkzM.js";var h;function init_checkbox_component(){return(init_checkbox_component=e((()=>{o(),c(),d(),p(),h=class CheckboxComponent extends m{label=t(`Ich bin einverstanden.`);linkLabel=t(``);linkHref=t(`#`);required=t(!1);checked=s(!1);disabled=s(!1);area=t(`co`);normalizeValue(e){return!!e}applyValue(e){this.checked.set(e)}applyDisabled(e){this.disabled.set(e)}onCheckboxChange(e){let t=e.target.checked;this.checked.set(t),this.onChange(t)}markTouched(){this.onTouched()}static propDecorators={label:[{type:l,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],linkLabel:[{type:l,args:[{isSignal:!0,alias:`linkLabel`,required:!1,transform:void 0}]}],linkHref:[{type:l,args:[{isSignal:!0,alias:`linkHref`,required:!1,transform:void 0}]}],required:[{type:l,args:[{isSignal:!0,alias:`required`,required:!1,transform:void 0}]}],checked:[{type:l,args:[{isSignal:!0,alias:`checked`,required:!1}]},{type:a,args:[`checkedChange`]}],disabled:[{type:l,args:[{isSignal:!0,alias:`disabled`,required:!1}]},{type:a,args:[`disabledChange`]}],area:[{type:l,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}]}},h=u([r({selector:`cds-checkbox`,changeDetection:i.OnPush,providers:[{provide:f,useExisting:n(()=>h),multi:!0}],template:`
    <label style="display:flex;align-items:flex-start;gap:var(--s3);cursor:pointer">
      <input
        type="checkbox"
        [checked]="checked()"
        [disabled]="disabled()"
        [attr.required]="required() ? '' : null"
        [attr.aria-required]="required() ? 'true' : null"
        [style.accent-color]="'var(--' + area() + '-500)'"
        style="width:18px;height:18px;margin-top:2px;flex-shrink:0;cursor:pointer"
        (change)="onCheckboxChange($event)"
        (blur)="markTouched()"
      />
      <!-- prettier-ignore -->
      <span style="font:var(--ty-body-md);color:var(--tx-secondary)"
        >{{ label() }}@if (linkLabel()) {&nbsp;<a class="body-link" [href]="linkHref()">{{ linkLabel() }}</a>}@if (required()) {&nbsp;<span class="req" aria-hidden="true">*</span>}</span
      >
    </label>
  `})],h)})))()}var g,_,v,y,b,x,S,C,w,T;function init_checkbox_stories(){return(init_checkbox_stories=e((()=>{init_checkbox_component(),{within:g,userEvent:_,expect:v}=__STORYBOOK_MODULE_TEST__,y={title:`Komponenten/Inputs & Forms/Checkbox`,component:h,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-2245`},layout:`padded`,docs:{description:{component:`Einwilligungs-Feld: ein natives Kontrollkästchen mit Bereichsfarbe (accent-color) und einem Label, das den Einwilligungstext samt optional verlinktem Datenschutzhinweis trägt. Typische Verwendung: Newsletter- und DSGVO-Einwilligung, meist als Pflichtfeld. WCAG AA.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]},required:{control:`boolean`},checked:{control:`boolean`},disabled:{control:`boolean`}},args:{label:`Ich bin einverstanden, dass meine E-Mail-Adresse für den Versand des Newsletters verwendet wird.`,linkLabel:`Datenschutzhinweise`,linkHref:`#`,required:!0,checked:!1,disabled:!1,area:`co`}},b={},x={args:{disabled:!0},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=g(e);await v(t.getByRole(`checkbox`)).toBeDisabled()}},S={name:`Tastatur`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=g(e).getByRole(`checkbox`);t.focus(),await v(t).not.toBeChecked(),await _.keyboard(` `),await v(t).toBeChecked(),await _.keyboard(` `),await v(t).not.toBeChecked()}},C={name:`Fokusring`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=g(e);await _.tab();let n=t.getAllByRole(`checkbox`)[0];await v(n).toHaveFocus();let r=getComputedStyle(n);await v(r.outlineStyle).toBe(`none`),await v(r.boxShadow).not.toBe(`none`)}},w={name:`Lesbarer Zustand`,parameters:{controls:{disable:!0},snapshot:{skip:!0},docs:{description:{story:"Die `cds-checkbox` sind per `[(checked)]` an ein State-Objekt gebunden; jede Änderung emittiert `checkedChange` und aktualisiert die Anzeige. Der Absenden-Button liest die Pflicht-Einwilligung aus und ist erst aktiv, wenn sie gesetzt ist, genau so konsumiert man `checked` im echten Code."}}},render:()=>{let e={consent:!1,newsletter:!1};return{moduleMetadata:{imports:[h]},props:{state:e,zustand:()=>`Einwilligung ${e.consent?`an`:`aus`} · Newsletter ${e.newsletter?`an`:`aus`}`},template:`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:34rem">
          <cds-checkbox
            label="Ich stimme der Datenverarbeitung zu."
            [required]="true"
            [(checked)]="state.consent"
          ></cds-checkbox>
          <cds-checkbox
            label="Newsletter abonnieren (optional)."
            [(checked)]="state.newsletter"
          ></cds-checkbox>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">
            Zustand: <strong>{{ zustand() }}</strong>
          </p>
          <button type="button" class="btn btn-primary" [disabled]="!state.consent">
            Absenden
          </button>
        </div>
      `}},play:async({canvasElement:e})=>{let t=g(e),n=t.getByRole(`checkbox`,{name:/Datenverarbeitung/}),r=t.getByRole(`button`,{name:`Absenden`});await v(n).not.toBeChecked(),await v(r).toBeDisabled(),await v(e).toHaveTextContent(`Einwilligung aus · Newsletter aus`),await _.click(n),await v(n).toBeChecked(),await v(e).toHaveTextContent(`Einwilligung an · Newsletter aus`),await v(r).toBeEnabled()}},T=[`Interaktiv`,`Deaktiviert`,`Tastatur`,`Fokusring`,`LesbarerZustand`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
    await expect(c.getByRole('checkbox')).toBeDisabled();
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Tastatur',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Leertaste auf der fokussierten Checkbox schaltet checked um (natives Verhalten
  // von <input type="checkbox">, hier über echte Tastatur statt Klick geprüft).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const checkbox = c.getByRole('checkbox');
    checkbox.focus();
    await expect(checkbox).not.toBeChecked();
    await userEvent.keyboard(' ');
    await expect(checkbox).toBeChecked();
    await userEvent.keyboard(' ');
    await expect(checkbox).not.toBeChecked();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
    const control = c.getAllByRole('checkbox')[0];
    await expect(control).toHaveFocus();
    const stil = getComputedStyle(control);
    await expect(stil.outlineStyle).toBe('none');
    await expect(stil.boxShadow).not.toBe('none');
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Lesbarer Zustand',
  parameters: {
    controls: {
      disable: true
    },
    // Geklickter/fokussierter Endzustand → nicht deterministisch snapshotten.
    snapshot: {
      skip: true
    },
    docs: {
      description: {
        story: 'Die \`cds-checkbox\` sind per \`[(checked)]\` an ein State-Objekt gebunden; ' + 'jede Änderung emittiert \`checkedChange\` und aktualisiert die Anzeige. ' + 'Der Absenden-Button liest die Pflicht-Einwilligung aus und ist erst ' + 'aktiv, wenn sie gesetzt ist, genau so konsumiert man \`checked\` im echten Code.'
      }
    }
  },
  render: () => {
    const state = {
      consent: false,
      newsletter: false
    };
    return {
      moduleMetadata: {
        imports: [CheckboxComponent]
      },
      props: {
        state,
        zustand: () => \`Einwilligung \${state.consent ? 'an' : 'aus'} · Newsletter \${state.newsletter ? 'an' : 'aus'}\`
      },
      template: \`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:34rem">
          <cds-checkbox
            label="Ich stimme der Datenverarbeitung zu."
            [required]="true"
            [(checked)]="state.consent"
          ></cds-checkbox>
          <cds-checkbox
            label="Newsletter abonnieren (optional)."
            [(checked)]="state.newsletter"
          ></cds-checkbox>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">
            Zustand: <strong>{{ zustand() }}</strong>
          </p>
          <button type="button" class="btn btn-primary" [disabled]="!state.consent">
            Absenden
          </button>
        </div>
      \`
    };
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const consent = c.getByRole('checkbox', {
      name: /Datenverarbeitung/
    });
    const absenden = c.getByRole('button', {
      name: 'Absenden'
    });
    // Start: Pflicht-Einwilligung aus → Button gesperrt.
    await expect(consent).not.toBeChecked();
    await expect(absenden).toBeDisabled();
    await expect(canvasElement).toHaveTextContent('Einwilligung aus · Newsletter aus');
    // Klick → checkedChange wird ausgelesen: Anzeige + Button aktualisieren.
    await userEvent.click(consent);
    await expect(consent).toBeChecked();
    await expect(canvasElement).toHaveTextContent('Einwilligung an · Newsletter aus');
    await expect(absenden).toBeEnabled();
  }
}`,...w.parameters?.docs?.source}}}})))()}init_checkbox_stories();export{x as Deaktiviert,C as Fokusring,b as Interaktiv,w as LesbarerZustand,S as Tastatur,T as __namedExportsOrder,y as default};