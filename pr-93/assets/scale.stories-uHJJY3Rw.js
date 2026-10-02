import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,At as n,H as r,I as i,V as a,Y as o,fn as s,j as c,k as l,kt as u,q as d,sn as f}from"./angular-platform-CAY__VLP.js";import{i as p,n as m,r as h,t as g}from"./forms-CAzAEGKf.js";import{n as _,t as v}from"./cva-base.directive-PVycmkzM.js";var y,b;function init_scale_component(){return(init_scale_component=e((()=>{s(),l(),p(),_(),y=0,b=class ScaleComponent extends v{label=t(`Bewertung`);labels=t([`Niedrig`,`Mittel`,`Hoch`]);value=c(1);area=t(`co`);helper=t(``);disabled=c(!1);scaleId=t(`cds-scale-${++y}`);constructor(){super(),u(()=>{let e=this.max(),t=this.value();t>e?this.value.set(e):t<0&&this.value.set(0)})}normalizeValue(e){let t=typeof e==`number`&&!Number.isNaN(e)?Math.round(e):0;return Math.min(this.max(),Math.max(0,t))}applyValue(e){this.value.set(e)}applyDisabled(e){this.disabled.set(e)}max=i(()=>Math.max(0,this.labels().length-1));currentLabel=i(()=>this.labels()[this.value()]??``);sliderClasses=i(()=>`slider slider-${this.area()}`);outputClasses=i(()=>`field-slider-output slider-${this.area()}`);tickColumns=i(()=>{let e=this.labels().length;if(e<=1)return`1fr`;let t=`minmax(calc(11px + (100% - 22px) / ${e-1} / 2), max-content)`;return e===2?`${t} ${t}`:`${t} ${`repeat(${e-2}, minmax(min-content, 1fr))`} ${t}`});tickItems=i(()=>{let e=this.labels(),t=e.length,n={position:`static`,transform:`none`,"white-space":`normal`,"box-sizing":`border-box`,hyphens:`auto`};return e.map((e,r)=>t<=1?{label:e,style:{...n,"text-align":`left`,"padding-left":`11px`}}:r===0?{label:e,style:{...n,"text-align":`left`,"padding-left":`11px`,"padding-right":`4px`}}:r===t-1?{label:e,style:{...n,"text-align":`right`,"padding-left":`4px`,"padding-right":`11px`}}:{label:e,style:{...n,"text-align":`center`,"padding-inline":`4px`}})});onInput(e){let t=Number(e.target.value);this.value.set(t),this.onChange(t)}markTouched(){this.onTouched()}static ctorParameters=()=>[];static propDecorators={label:[{type:d,args:[{isSignal:!0,alias:`label`,required:!1,transform:void 0}]}],labels:[{type:d,args:[{isSignal:!0,alias:`labels`,required:!1,transform:void 0}]}],value:[{type:d,args:[{isSignal:!0,alias:`value`,required:!1}]},{type:o,args:[`valueChange`]}],area:[{type:d,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],helper:[{type:d,args:[{isSignal:!0,alias:`helper`,required:!1,transform:void 0}]}],disabled:[{type:d,args:[{isSignal:!0,alias:`disabled`,required:!1}]},{type:o,args:[`disabledChange`]}],scaleId:[{type:d,args:[{isSignal:!0,alias:`scaleId`,required:!1,transform:void 0}]}]}},b=f([r({selector:`cds-scale`,changeDetection:a.OnPush,providers:[{provide:m,useExisting:n(()=>b),multi:!0}],template:`
    <div class="field-slider">
      <div class="field-slider-header">
        <label class="field-slider-label" [attr.for]="scaleId()">{{ label() }}</label>
        <output [class]="outputClasses()" [attr.for]="scaleId()" [id]="scaleId() + '-out'">{{
          currentLabel()
        }}</output>
      </div>
      <input
        [class]="sliderClasses()"
        type="range"
        [id]="scaleId()"
        min="0"
        [max]="max()"
        step="1"
        [value]="value()"
        [disabled]="disabled()"
        [attr.aria-valuetext]="currentLabel()"
        [attr.aria-describedby]="helper() ? scaleId() + '-hint' : null"
        (input)="onInput($event)"
        (blur)="markTouched()"
      />
      @if (labels().length) {
        <!-- Alle Skalen-Labels als CSS-Grid-Spalten (Breiten: tickColumns()), bei
             ausreichend Platz exakt auf ihre Thumb-Position ausgerichtet (Thumb 22px,
             siehe css/components.css); bei schmalen Breiten gibt das Grid lieber den
             Umbruch frei, statt Labels zu überlagern oder abzuschneiden (siehe dort).
             KEINE Reduktion — jedes Label ist wählbar, PFLICHT-Inhalt (kein Dropping
             wie bei cds-slider). Statt Absolut-Positionierung Normalfluss: mehrzeilige
             Labels (lange Kategorien bei schmaler Breite) wachsen den Container in der
             Höhe und schieben nachfolgenden Inhalt nach unten, statt ihn zu
             überlagern. Self-contained positioniert (der --tick-p-Kernmechanismus liegt
             noch auf dem main-PR; nach Merge kann das vereinfacht werden). -->
        <div
          class="field-slider-ticks"
          aria-hidden="true"
          style="position:relative;display:grid;padding:0;height:auto;align-items:start"
          [style.grid-template-columns]="tickColumns()"
        >
          @for (t of tickItems(); track $index) {
            <span [style]="t.style">{{ t.label }}</span>
          }
        </div>
      }
      @if (helper()) {
        <span class="helper" [id]="scaleId() + '-hint'">{{ helper() }}</span>
      }
    </div>
  `})],b)})))()}function inkRect(e){let t=document.createRange();return t.selectNodeContents(e),t.getBoundingClientRect()}function lineCount(e){let t=document.createRange();return t.selectNodeContents(e),t.getClientRects().length}var x,S,C,w,T,E,D,O,k,A,j,M;function init_scale_stories(){return(init_scale_stories=e((()=>{p(),init_scale_component(),{within:x,fireEvent:S,waitFor:C,expect:w}=__STORYBOOK_MODULE_TEST__,T={title:`Komponenten/Inputs & Forms/Skala`,component:b,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-1599`},layout:`padded`,docs:{description:{component:`Stufen-Auswahl für GEORDNETE (ordinale) Kategorien, deren Labels die Werte sind (z. B. Niedrig < Mittel < Hoch). Auf Basis des nativen Range-Inputs; der aktuelle Wert erscheint als Label und wird Screenreadern über aria-valuetext gemeldet. Für ungeordnete/gleichrangige Optionen ist ein Slider das falsche Element, dafür die Radio-Gruppe oder den Segment-Umschalter (AreaTabs) nutzen.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]},value:{control:{type:`number`,min:0}},disabled:{control:`boolean`}},args:{label:`Zufriedenheit`,labels:[`Sehr unzufrieden`,`Unzufrieden`,`Neutral`,`Zufrieden`,`Sehr zufrieden`],value:2,area:`co`,helper:``,disabled:!1,scaleId:`demo-scale`}},E={play:async({canvasElement:e})=>{let t=e.querySelector(`output`);await w(t).toHaveTextContent(`Neutral`);let n=x(e).getByRole(`slider`);S.input(n,{target:{value:`4`}}),await C(()=>w(t).toHaveTextContent(`Sehr zufrieden`))}},D={args:{scaleId:`demo-scale-disabled`,disabled:!0},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=x(e);await w(t.getByRole(`slider`)).toBeDisabled()}},O={name:`Verschiedene Skalen`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[b]},template:`
      <div style="display:grid;gap:32px;max-width:460px">
        <cds-scale scaleId="sc-3" area="co" label="Priorität"
          [labels]="['Niedrig','Mittel','Hoch']" [value]="1"></cds-scale>
        <cds-scale scaleId="sc-4" area="ki" label="Häufigkeit"
          [labels]="['nie','selten','oft','immer']" [value]="2"></cds-scale>
        <cds-scale scaleId="sc-5" area="es" label="Erfahrung"
          [labels]="['Einsteiger','Fortgeschritten','Erfahren','Experte']" [value]="1"></cds-scale>
      </div>
    `})},k={name:`Label-Kollision bei schmaler Breite`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},render:()=>({moduleMetadata:{imports:[b]},template:`
      <div style="width:432px">
        <cds-scale scaleId="sc-overlap" area="co" label="Zufriedenheit"
          [labels]="['Sehr unzufrieden','Unzufrieden','Neutral','Zufrieden','Sehr zufrieden']"
          [value]="2" helper="Pflichtfeld"></cds-scale>
      </div>
    `}),play:async({canvasElement:e})=>{await document.fonts.ready;let t=e.querySelector(`.field-slider-ticks`),n=Array.from(t.querySelectorAll(`:scope > *`));await w(n).toHaveLength(5);let r=t.getBoundingClientRect(),i=n.map(inkRect);for(let e=1;e<i.length;e++)await w(i[e].left-i[e-1].right).toBeGreaterThanOrEqual(6);for(let e of i)await w(e.left).toBeGreaterThanOrEqual(r.left-.5),await w(e.right).toBeLessThanOrEqual(r.right+.5);for(let e of n)await w(lineCount(e)).toBeLessThanOrEqual(2);let a=e.querySelector(`.helper`).getBoundingClientRect();await w(r.bottom).toBeLessThanOrEqual(a.top+.5)}},A={name:`Label-Kollision bei sehr schmaler Breite`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},render:()=>({moduleMetadata:{imports:[b]},template:`
      <div style="width:380px">
        <cds-scale scaleId="sc-overlap-narrow" area="co" label="Zufriedenheit"
          [labels]="['Sehr unzufrieden','Unzufrieden','Neutral','Zufrieden','Sehr zufrieden']"
          [value]="2" helper="Pflichtfeld"></cds-scale>
      </div>
    `}),play:async({canvasElement:e})=>{await document.fonts.ready;let t=e.querySelector(`.field-slider-ticks`),n=Array.from(t.querySelectorAll(`:scope > *`));await w(n).toHaveLength(5);let r=t.getBoundingClientRect(),i=n.map(inkRect);for(let e=1;e<i.length;e++)await w(i[e].left-i[e-1].right).toBeGreaterThanOrEqual(6);for(let e of i)await w(e.left).toBeGreaterThanOrEqual(r.left-.5),await w(e.right).toBeLessThanOrEqual(r.right+.5);for(let e of n)await w(lineCount(e)).toBeLessThanOrEqual(2);await w(r.height).toBeGreaterThan(16);let a=e.querySelector(`.helper`).getBoundingClientRect();await w(r.bottom).toBeLessThanOrEqual(a.top+.5)}},j={name:`Formularbindung`,parameters:{controls:{disable:!0},snapshot:{skip:!0},docs:{description:{story:"Die Skala ist ein `ControlValueAccessor` und bindet direkt an reactive forms (`formControl`); der Formularwert ist der Stufen-INDEX (hier live angezeigt). Ohne Formular geht alternativ `[(value)]`."}}},render:()=>{let e=new g(2);return{moduleMetadata:{imports:[b,h]},props:{ctrl:e,labels:[`Sehr unzufrieden`,`Unzufrieden`,`Neutral`,`Zufrieden`,`Sehr zufrieden`]},template:`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-scale label="Zufriedenheit" scaleId="form-scale" [labels]="labels" [formControl]="ctrl"></cds-scale>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Index: <strong>{{ ctrl.value }}</strong></p>
        </div>
      `}},play:async({canvasElement:e})=>{let t=x(e);await w(e).toHaveTextContent(`Index: 2`),S.input(t.getByRole(`slider`),{target:{value:`4`}}),await C(()=>w(e).toHaveTextContent(`Index: 4`))}},M=[`Interaktiv`,`Deaktiviert`,`Stufen`,`LabelUeberlappung`,`LabelUeberlappungSchmal`,`Formularbindung`],E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  // Schieben wählt eine Stufe; das <output> zeigt das Label (nicht die Zahl).
  // Assertion aufs <output> scopen — das Label taucht auch als Tick auf.
  play: async ({
    canvasElement
  }) => {
    const out = canvasElement.querySelector('output');
    await expect(out).toHaveTextContent('Neutral');
    const slider = within(canvasElement).getByRole('slider');
    fireEvent.input(slider, {
      target: {
        value: '4'
      }
    });
    await waitFor(() => expect(out).toHaveTextContent('Sehr zufrieden'));
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    scaleId: 'demo-scale-disabled',
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
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Verschiedene Skalen',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [ScaleComponent]
    },
    template: \`
      <div style="display:grid;gap:32px;max-width:460px">
        <cds-scale scaleId="sc-3" area="co" label="Priorität"
          [labels]="['Niedrig','Mittel','Hoch']" [value]="1"></cds-scale>
        <cds-scale scaleId="sc-4" area="ki" label="Häufigkeit"
          [labels]="['nie','selten','oft','immer']" [value]="2"></cds-scale>
        <cds-scale scaleId="sc-5" area="es" label="Erfahrung"
          [labels]="['Einsteiger','Fortgeschritten','Erfahren','Experte']" [value]="1"></cds-scale>
      </div>
    \`
  })
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Label-Kollision bei schmaler Breite',
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
      imports: [ScaleComponent]
    },
    template: \`
      <div style="width:432px">
        <cds-scale scaleId="sc-overlap" area="co" label="Zufriedenheit"
          [labels]="['Sehr unzufrieden','Unzufrieden','Neutral','Zufrieden','Sehr zufrieden']"
          [value]="2" helper="Pflichtfeld"></cds-scale>
      </div>
    \`
  }),
  // Regressionstest für den Überlappungs-Befund (432px, fünf Stufen: Labels 1/2 und
  // 4/5 überlagerten sich). Prüft die Grid-Positionierung aus \`tickColumns()\`/
  // \`tickItems()\` direkt am gerenderten DOM statt an der internen Berechnung, da die
  // Lib laut ADR-0005 keine eigenen .spec.ts-Unit-Tests führt — jeder Komponententest
  // läuft als Story samt Interaktionstest. Bei 432px reicht der Platz, damit
  // \`tickColumns()\` jede Spalte bis auf ihre natürliche (einzeilige) Breite wachsen
  // lässt — hier wird also NICHT umgebrochen, das ist beabsichtigt (Lesbarkeit vor
  // exakter Ausrichtung, siehe \`tickColumns()\`). Der eigentliche Umbruchfall steht in
  // \`LabelUeberlappungSchmal\`.
  play: async ({
    canvasElement
  }) => {
    // Vor jeder Messung Web-Fonts abwarten: Zeilenzahl/Ink-Breite hängen an den
    // tatsächlichen Glyphenmetriken. Ohne das liefe die Messung ggf. noch gegen die
    // Fallback-Schrift (FOUT) und ergäbe je nach Timing andere, flackernde Werte.
    await document.fonts.ready;
    const ticksEl = canvasElement.querySelector('.field-slider-ticks') as HTMLElement;
    const ticks = Array.from(ticksEl.querySelectorAll<HTMLElement>(':scope > *'));
    await expect(ticks).toHaveLength(5);
    const containerBox = ticksEl.getBoundingClientRect();
    const inks = ticks.map(inkRect);
    // Mindestens 6px Lücke zwischen benachbarten Labels — auf der Text-Ink, nicht der
    // (ggf. breiteren, jetzt zusätzlich per padding-inline verbreiterten) Zellenbox
    // gemessen. Bloße Nicht-Überlappung (Lücke ≥ 0) reichte hier nicht: Bei 432px
    // stießen zwei Ink-Boxes exakt aneinander (0px Lücke, „LabelLabel“ ohne sichtbare
    // Trennung) — kein Overlap, aber auch keine Lesbarkeit. Die 4px-Innenpadding in
    // \`tickItems()\` erzwingen jetzt ≥ 8px; 6px als Testschwelle lässt Sub-Pixel-
    // Rundung Luft, ohne die Regression (0px) durchzulassen.
    for (let i = 1; i < inks.length; i++) {
      await expect(inks[i].left - inks[i - 1].right).toBeGreaterThanOrEqual(6);
    }
    // Kein Label ragt aus dem Tick-Container heraus.
    for (const ink of inks) {
      await expect(ink.left).toBeGreaterThanOrEqual(containerBox.left - 0.5);
      await expect(ink.right).toBeLessThanOrEqual(containerBox.right + 0.5);
    }
    // Maximal 2 Zeilen je Label.
    for (const el of ticks) {
      await expect(lineCount(el)).toBeLessThanOrEqual(2);
    }
    // Tick-Reihe schiebt den Helper-Text nach unten, statt ihn zu überlagern.
    const helper = canvasElement.querySelector('.helper')!.getBoundingClientRect();
    await expect(containerBox.bottom).toBeLessThanOrEqual(helper.top + 0.5);
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Label-Kollision bei sehr schmaler Breite',
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
      imports: [ScaleComponent]
    },
    template: \`
      <div style="width:380px">
        <cds-scale scaleId="sc-overlap-narrow" area="co" label="Zufriedenheit"
          [labels]="['Sehr unzufrieden','Unzufrieden','Neutral','Zufrieden','Sehr zufrieden']"
          [value]="2" helper="Pflichtfeld"></cds-scale>
      </div>
    \`
  }),
  // Gegenstück zu \`LabelUeberlappung\`: 380px ist die per Messung schmalste Breite mit
  // stabilem Ergebnis, bei der das Randlabel „Sehr unzufrieden“ noch exakt zwischen
  // den beiden Wörtern auf 2 Zeilen umbricht (kein Wort selbst muss trennen) und dabei
  // nicht mit „Unzufrieden“ überlappt. Bisektion ergab: 300px erzwang bereits 4 Zeilen
  // UND echte Ink-Überlappung; um 340px lieferte dieselbe Breite je nach umgebender
  // Struktur (ein einzelnes cds-scale direkt vs. mehrere nebeneinander) uneinheitlich
  // 2 oder 4 Zeilen — offenbar reagiert die minmax()-Spaltenverteilung nahe der
  // Wechsel-Schwelle empfindlich auf Nachbar-Elemente/Messreihenfolge, auch NACH
  // \`document.fonts.ready\`; nicht abschließend geklärt. 380px liegt mit Marge über
  // dieser Grauzone und war in mehreren Testläufen und Strukturvarianten konsistent
  // (400px bricht bereits gar nicht mehr um, siehe \`LabelUeberlappung\`-Kommentar).
  // Belegt den echten Umbruchfall: die Tick-Reihe wächst über die frühere fixe 16px
  // hinaus und schiebt den Helper-Text nach unten, statt ihn zu überlagern.
  play: async ({
    canvasElement
  }) => {
    await document.fonts.ready;
    const ticksEl = canvasElement.querySelector('.field-slider-ticks') as HTMLElement;
    const ticks = Array.from(ticksEl.querySelectorAll<HTMLElement>(':scope > *'));
    await expect(ticks).toHaveLength(5);
    const containerBox = ticksEl.getBoundingClientRect();
    const inks = ticks.map(inkRect);
    // Mindestens 6px Lücke statt bloßer Nicht-Überlappung — s. Begründung in
    // \`LabelUeberlappung\`.
    for (let i = 1; i < inks.length; i++) {
      await expect(inks[i].left - inks[i - 1].right).toBeGreaterThanOrEqual(6);
    }
    for (const ink of inks) {
      await expect(ink.left).toBeGreaterThanOrEqual(containerBox.left - 0.5);
      await expect(ink.right).toBeLessThanOrEqual(containerBox.right + 0.5);
    }
    for (const el of ticks) {
      await expect(lineCount(el)).toBeLessThanOrEqual(2);
    }
    await expect(containerBox.height).toBeGreaterThan(16);
    const helper = canvasElement.querySelector('.helper')!.getBoundingClientRect();
    await expect(containerBox.bottom).toBeLessThanOrEqual(helper.top + 0.5);
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
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
        story: 'Die Skala ist ein \`ControlValueAccessor\` und bindet direkt an reactive ' + 'forms (\`formControl\`); der Formularwert ist der Stufen-INDEX (hier live ' + 'angezeigt). Ohne Formular geht alternativ \`[(value)]\`.'
      }
    }
  },
  render: () => {
    const ctrl = new FormControl(2);
    return {
      moduleMetadata: {
        imports: [ScaleComponent, ReactiveFormsModule]
      },
      props: {
        ctrl,
        labels: ['Sehr unzufrieden', 'Unzufrieden', 'Neutral', 'Zufrieden', 'Sehr zufrieden']
      },
      template: \`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-scale label="Zufriedenheit" scaleId="form-scale" [labels]="labels" [formControl]="ctrl"></cds-scale>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Index: <strong>{{ ctrl.value }}</strong></p>
        </div>
      \`
    };
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Index: 2');
    fireEvent.input(c.getByRole('slider'), {
      target: {
        value: '4'
      }
    });
    await waitFor(() => expect(canvasElement).toHaveTextContent('Index: 4'));
  }
}`,...j.parameters?.docs?.source}}}})))()}init_scale_stories();export{D as Deaktiviert,j as Formularbindung,E as Interaktiv,k as LabelUeberlappung,A as LabelUeberlappungSchmal,O as Stufen,M as __namedExportsOrder,T as default};