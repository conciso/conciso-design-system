import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,B as n,D as r,G as i,H as a,It as o,Kt as s,O as c,P as l,Tn as u,Ut as d,bn as f,k as p,q as m,qt as h,tt as g,z as _}from"./angular-platform-BGeCprOl.js";import{i as v,n as y,r as b,t as x}from"./forms-CsHRYVN2.js";import{n as S,t as C}from"./cva-base.directive-CmqEZn86.js";var w,T;function init_slider_component(){return(init_slider_component=e((()=>{u(),r(),v(),S(),w=0,T=class SliderComponent extends C{host=s(a);destroyRef=s(o);width=h(0);label=c(`Budget-Rahmen`);area=c(`co`);min=c(1e4,{transform:t});max=c(1e5,{transform:t});step=c(5e3,{transform:t});value=p(5e4);unit=c(` €`);tickCount=c(3,{transform:t});minTickSpacing=c(56,{transform:t});helper=c(`Schritte: 5.000 €`);disabled=p(!1);sliderId=c(`cds-slider-${++w}`);constructor(){super(),g(()=>{let e=this.host.nativeElement.querySelector(`.field-slider`);if(e&&(this.width.set(e.getBoundingClientRect().width),typeof ResizeObserver<`u`)){let t=new ResizeObserver(e=>{this.width.set(e[0].contentRect.width)});t.observe(e),this.destroyRef.onDestroy(()=>t.disconnect())}})}normalizeValue(e){let t=typeof e==`number`&&!Number.isNaN(e)?e:this.min();return this.clamp(t)}clamp(e){return Math.min(this.max(),Math.max(this.min(),e))}applyValue(e){this.value.set(e)}applyDisabled(e){this.disabled.set(e)}sliderClasses=l(()=>`slider slider-${this.area()}`);outputClasses=l(()=>`field-slider-output slider-${this.area()}`);formatted=l(()=>`${this.value().toLocaleString(`de-DE`)}${this.unit()}`);effectiveTickCount(){let e=this.tickCount();if(e<2)return Math.max(0,Math.trunc(e));let t=this.width();if(!t)return e;let n=Math.max(2,Math.floor(t/this.minTickSpacing()));return Math.min(e,n)}tickItems=l(()=>{let e=this.effectiveTickCount();if(e<1)return[];let at=e=>`calc(11px + ${e} * (100% - 22px))`,t=this.min(),n=this.max();return e===1?[{label:this.formatTick(t),left:at(.5)}]:Array.from({length:e},(r,i)=>{let a=i/(e-1);return{label:this.formatTick(t+(n-t)*a),left:at(a)}})});formatTick(e){let t=Math.abs(e),fmt=e=>e.toLocaleString(`de-DE`,{maximumFractionDigits:1});return t>=1e6?`${fmt(e/1e6)}M`:t>=1e3?`${fmt(e/1e3)}k`:fmt(e)}onInput(e){let t=Number(e.target.value);this.value.set(t),this.onChange(t)}markTouched(){this.onTouched()}static ctorParameters=()=>[];static propDecorators={label:[{type:i,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],area:[{type:i,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],min:[{type:i,args:[{isSignal:!0,alias:`min`,required:!1,transform:void 0}]}],max:[{type:i,args:[{isSignal:!0,alias:`max`,required:!1,transform:void 0}]}],step:[{type:i,args:[{isSignal:!0,alias:`step`,required:!1,transform:void 0}]}],value:[{type:i,args:[{isSignal:!0,alias:`value`,required:!1}]},{type:m,args:[`valueChange`]}],unit:[{type:i,args:[{isSignal:!0,alias:`unit`,required:!1,transform:void 0}]}],tickCount:[{type:i,args:[{isSignal:!0,alias:`tickCount`,required:!1,transform:void 0}]}],minTickSpacing:[{type:i,args:[{isSignal:!0,alias:`minTickSpacing`,required:!1,transform:void 0}]}],helper:[{type:i,args:[{isSignal:!0,alias:`helper`,required:!1,transform:void 0}]}],disabled:[{type:i,args:[{isSignal:!0,alias:`disabled`,required:!1}]},{type:m,args:[`disabledChange`]}],sliderId:[{type:i,args:[{isSignal:!0,alias:`sliderId`,required:!1,transform:void 0}]}]}},T=f([n({selector:`cds-slider`,changeDetection:_.OnPush,providers:[{provide:y,useExisting:d(()=>T),multi:!0}],template:`
    <div class="field-slider">
      <div class="field-slider-header">
        <label class="field-slider-label" [attr.for]="sliderId()">{{ label() }}</label>
        <output [class]="outputClasses()" [attr.for]="sliderId()" [id]="sliderId() + '-out'">
          {{ formatted() }}
        </output>
      </div>
      <input
        [class]="sliderClasses()"
        type="range"
        [id]="sliderId()"
        [min]="min()"
        [max]="max()"
        [step]="step()"
        [value]="value()"
        [disabled]="disabled()"
        [attr.aria-valuetext]="formatted()"
        [attr.aria-describedby]="helper() ? sliderId() + '-hint' : null"
        (input)="onInput($event)"
        (blur)="markTouched()"
      />
      @if (tickItems().length) {
        <!-- Ticks exakt auf die Thumb-Position ausgerichtet: der Thumb (22px, siehe
             css/components.css) läuft mittig von 11px bis (Breite − 11px). Das
             space-between des Kern-CSS träfe die Label-MITTEN nicht (bei vielen Ticks
             sichtbar), daher hier absolut positioniert und zentriert. -->
        <div
          class="field-slider-ticks"
          aria-hidden="true"
          style="position:relative;display:block;padding:0;height:16px"
        >
          @for (t of tickItems(); track $index) {
            <span
              [style.left]="t.left"
              style="position:absolute;transform:translateX(-50%);white-space:nowrap"
              >{{ t.label }}</span
            >
          }
        </div>
      }
      @if (helper()) {
        <span class="helper" [id]="sliderId() + '-hint'">{{ helper() }}</span>
      }
    </div>
  `})],T)})))()}var E,D,O,k,A,j,M,N,P,F,I;function init_slider_stories(){return(init_slider_stories=e((()=>{v(),init_slider_component(),{within:E,fireEvent:D,waitFor:O,expect:k}=__STORYBOOK_MODULE_TEST__,A={title:`Komponenten/Inputs & Forms/Slider`,component:T,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-2513`},layout:`padded`,docs:{description:{component:`Numerische Wertauswahl über einen Regler mit Live-Anzeige des gewählten Werts (formatiert, z. B. mit Einheit). Volle Tastatursteuerung über Pfeiltasten sowie Pos1/Ende.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]},tickCount:{control:{type:`number`,min:0,max:12}},minTickSpacing:{control:{type:`number`,min:24,max:120}},disabled:{control:`boolean`}},args:{label:`Budget-Rahmen`,area:`co`,min:1e4,max:1e5,step:5e3,value:5e4,unit:` €`,tickCount:5,minTickSpacing:56,helper:`Schritte: 5.000 €`,disabled:!1,sliderId:`demo-slider`}},j={play:async({canvasElement:e})=>{let t=E(e);await k(t.getByText(`50.000 €`)).toBeInTheDocument();let n=t.getByRole(`slider`);D.input(n,{target:{value:`75000`}}),await O(()=>k(t.getByText(`75.000 €`)).toBeInTheDocument())}},M={args:{sliderId:`demo-slider-disabled`,disabled:!0},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=E(e);await k(t.getByRole(`slider`)).toBeDisabled()}},N={name:`Ticks (auto-reduziert)`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[T]},template:`
      <div style="display:grid;gap:32px">
        <div style="max-width:520px">
          <cds-slider sliderId="s-wide" label="Breit: 7 Ticks" [tickCount]="7"></cds-slider>
        </div>
        <div style="max-width:200px">
          <cds-slider sliderId="s-narrow" label="Schmal, reduziert" [tickCount]="7"></cds-slider>
        </div>
      </div>
    `})},P={name:`Je Bereich`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[T]},template:`
      <div style="display:grid;gap:24px;max-width:420px">
        <cds-slider area="co" sliderId="s-co" label="Corporate"></cds-slider>
        <cds-slider area="ki" sliderId="s-ki" label="Angewandte KI"></cds-slider>
        <cds-slider area="es" sliderId="s-es" label="Effektive Software"></cds-slider>
        <cds-slider area="wo" sliderId="s-wo" label="Wirksame Organisationen"></cds-slider>
      </div>
    `})},F={name:`Formularbindung`,parameters:{controls:{disable:!0},snapshot:{skip:!0},docs:{description:{story:"Der Slider ist ein `ControlValueAccessor` und bindet direkt an reactive forms (`formControl`); der Formularwert ist die Zahl (hier live angezeigt). Ohne Formular geht alternativ `[(value)]`."}}},render:()=>{let e=new x(5e4);return{moduleMetadata:{imports:[T,b]},props:{ctrl:e},template:`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-slider label="Budget-Rahmen" sliderId="form-slider" [formControl]="ctrl"></cds-slider>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value }}</strong></p>
        </div>
      `}},play:async({canvasElement:e})=>{let t=E(e);await k(e).toHaveTextContent(`Wert: 50000`),D.input(t.getByRole(`slider`),{target:{value:`75000`}}),await O(()=>k(e).toHaveTextContent(`Wert: 75000`))}},I=[`Interaktiv`,`Deaktiviert`,`AutoTicks`,`ProBereich`,`Formularbindung`],j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  // Schieben aktualisiert die formatierte Live-Ausgabe (de-DE + Einheit).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(c.getByText('50.000 €')).toBeInTheDocument();
    const slider = c.getByRole('slider');
    fireEvent.input(slider, {
      target: {
        value: '75000'
      }
    });
    await waitFor(() => expect(c.getByText('75.000 €')).toBeInTheDocument());
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    sliderId: 'demo-slider-disabled',
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
    await expect(c.getByRole('slider')).toBeDisabled();
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  name: 'Ticks (auto-reduziert)',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Gleiche gewünschte Tick-Zahl (7), zwei Breiten: breit zeigt alle, schmal
  // reduziert automatisch (ResizeObserver), Endpunkte bleiben erhalten.
  render: () => ({
    moduleMetadata: {
      imports: [SliderComponent]
    },
    template: \`
      <div style="display:grid;gap:32px">
        <div style="max-width:520px">
          <cds-slider sliderId="s-wide" label="Breit: 7 Ticks" [tickCount]="7"></cds-slider>
        </div>
        <div style="max-width:200px">
          <cds-slider sliderId="s-narrow" label="Schmal, reduziert" [tickCount]="7"></cds-slider>
        </div>
      </div>
    \`
  })
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Je Bereich',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [SliderComponent]
    },
    template: \`
      <div style="display:grid;gap:24px;max-width:420px">
        <cds-slider area="co" sliderId="s-co" label="Corporate"></cds-slider>
        <cds-slider area="ki" sliderId="s-ki" label="Angewandte KI"></cds-slider>
        <cds-slider area="es" sliderId="s-es" label="Effektive Software"></cds-slider>
        <cds-slider area="wo" sliderId="s-wo" label="Wirksame Organisationen"></cds-slider>
      </div>
    \`
  })
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
        story: 'Der Slider ist ein \`ControlValueAccessor\` und bindet direkt an reactive ' + 'forms (\`formControl\`); der Formularwert ist die Zahl (hier live angezeigt). ' + 'Ohne Formular geht alternativ \`[(value)]\`.'
      }
    }
  },
  render: () => {
    const ctrl = new FormControl(50000);
    return {
      moduleMetadata: {
        imports: [SliderComponent, ReactiveFormsModule]
      },
      props: {
        ctrl
      },
      template: \`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-slider label="Budget-Rahmen" sliderId="form-slider" [formControl]="ctrl"></cds-slider>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value }}</strong></p>
        </div>
      \`
    };
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Wert: 50000');
    fireEvent.input(c.getByRole('slider'), {
      target: {
        value: '75000'
      }
    });
    await waitFor(() => expect(canvasElement).toHaveTextContent('Wert: 75000'));
  }
}`,...F.parameters?.docs?.source}}}})))()}init_slider_stories();export{N as AutoTicks,M as Deaktiviert,F as Formularbindung,j as Interaktiv,P as ProBereich,I as __namedExportsOrder,A as default};