import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{A as n,H as r,V as i,Y as a,fn as o,j as s,k as c,q as l,sn as u}from"./angular-platform-CAY__VLP.js";var d;function init_chip_component(){return(init_chip_component=e((()=>{o(),c(),d=class ChipComponent{label=n.required();area=n();pressed=s(!1);toggle(){this.pressed.set(!this.pressed())}static propDecorators={label:[{type:l,args:[{isSignal:!0,alias:`label`,required:!0,transform:void 0}]}],area:[{type:l,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],pressed:[{type:l,args:[{isSignal:!0,alias:`pressed`,required:!1}]},{type:a,args:[`pressedChange`]}]}},d=u([r({selector:`cds-chip`,changeDetection:i.OnPush,template:`
    <button
      class="chip"
      type="button"
      [attr.data-area]="area() || null"
      [attr.aria-pressed]="pressed()"
      (click)="toggle()"
    >
      {{ label() }}
    </button>
  `})],d)})))()}var f=t({Interaktiv:()=>_,LesbarerZustand:()=>v,Zustaende:()=>y,__namedExportsOrder:()=>b,default:()=>g}),p,m,h,g,_,v,y,b;function init_chip_stories(){return(init_chip_stories=e((()=>{init_chip_component(),{within:p,userEvent:m,expect:h}=__STORYBOOK_MODULE_TEST__,g={title:`Komponenten/Chips, Badges & Pills/Chip`,component:d,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=3-1781`},docs:{description:{component:`Interaktiver Filter-Chip: ein umschaltbares Element, das eine Auswahl aktiviert oder deaktiviert, etwa in Bereichs-Filtern von Listing-Seiten. Optional je Brand Area farblich codiert.`}}},argTypes:{area:{control:`inline-radio`,options:[void 0,`co`,`ki`,`es`,`wo`]},pressed:{control:`boolean`}},args:{label:`Filter`,area:void 0,pressed:!1}},_={play:async({canvasElement:e})=>{let t=p(e).getByRole(`button`,{name:`Filter`});await h(t).toHaveAttribute(`aria-pressed`,`false`),await m.click(t),await h(t).toHaveAttribute(`aria-pressed`,`true`)}},v={name:`Lesbarer Zustand`,parameters:{controls:{disable:!0},snapshot:{skip:!0},docs:{description:{story:"Die `cds-chip` sind per `[(pressed)]` an ein Filter-Array gebunden; ein Klick togglet `aria-pressed`, emittiert `pressedChange` und aktualisiert die Liste der aktiven Filter, genau so konsumiert man den Status im echten Code."}}},render:()=>{let e=[{label:`Corporate`,area:`co`,pressed:!0},{label:`Angewandte KI`,area:`ki`,pressed:!1},{label:`Effektive Software`,area:`es`,pressed:!1},{label:`Wirksame Organisationen`,area:`wo`,pressed:!1}];return{moduleMetadata:{imports:[d]},props:{filters:e,aktiveLabels:()=>e.filter(e=>e.pressed).map(e=>e.label).join(`, `)||`(leer)`},template:`
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
          @for (f of filters; track f.label) {
            <cds-chip [label]="f.label" [area]="f.area" [(pressed)]="f.pressed"></cds-chip>
          }
        </div>
        <p style="margin-top:16px;font:14px/1.4 system-ui,sans-serif">
          Aktiv: <strong>{{ aktiveLabels() }}</strong>
        </p>
      `}},play:async({canvasElement:e})=>{let t=p(e);await h(t.getByRole(`button`,{name:`Corporate`})).toHaveAttribute(`aria-pressed`,`true`),await h(e).toHaveTextContent(`Aktiv: Corporate`),await m.click(t.getByRole(`button`,{name:`Angewandte KI`})),await h(e).toHaveTextContent(`Aktiv: Corporate, Angewandte KI`),await m.click(t.getByRole(`button`,{name:`Corporate`})),await h(e).toHaveTextContent(`Aktiv: Angewandte KI`)}},y={name:`Zustände`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[d]},template:`
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-chip label="Inaktiv"></cds-chip>
        <cds-chip label="Aktiv" [pressed]="true"></cds-chip>
        <cds-chip area="co" label="Corporate"></cds-chip>
        <cds-chip area="ki" label="Angewandte KI" [pressed]="true"></cds-chip>
      </div>
    `})},b=[`Interaktiv`,`LesbarerZustand`,`Zustaende`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  // Toggle-Verhalten: Klick schaltet aria-pressed um.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const chip = c.getByRole('button', {
      name: 'Filter'
    });
    await expect(chip).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(chip);
    await expect(chip).toHaveAttribute('aria-pressed', 'true');
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
        story: 'Die \`cds-chip\` sind per \`[(pressed)]\` an ein Filter-Array gebunden; ' + 'ein Klick togglet \`aria-pressed\`, emittiert \`pressedChange\` und ' + 'aktualisiert die Liste der aktiven Filter, genau so konsumiert man ' + 'den Status im echten Code.'
      }
    }
  },
  render: () => {
    const filters = [{
      label: 'Corporate',
      area: 'co',
      pressed: true
    }, {
      label: 'Angewandte KI',
      area: 'ki',
      pressed: false
    }, {
      label: 'Effektive Software',
      area: 'es',
      pressed: false
    }, {
      label: 'Wirksame Organisationen',
      area: 'wo',
      pressed: false
    }];
    return {
      moduleMetadata: {
        imports: [ChipComponent]
      },
      props: {
        filters,
        aktiveLabels: () => filters.filter(f => f.pressed).map(f => f.label).join(', ') || '(leer)'
      },
      template: \`
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
          @for (f of filters; track f.label) {
            <cds-chip [label]="f.label" [area]="f.area" [(pressed)]="f.pressed"></cds-chip>
          }
        </div>
        <p style="margin-top:16px;font:14px/1.4 system-ui,sans-serif">
          Aktiv: <strong>{{ aktiveLabels() }}</strong>
        </p>
      \`
    };
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    // Start: nur „Corporate“ ist aktiv.
    await expect(c.getByRole('button', {
      name: 'Corporate'
    })).toHaveAttribute('aria-pressed', 'true');
    await expect(canvasElement).toHaveTextContent('Aktiv: Corporate');
    // Klick auf „Angewandte KI“ → Zustand wird ausgelesen und angezeigt.
    await userEvent.click(c.getByRole('button', {
      name: 'Angewandte KI'
    }));
    await expect(canvasElement).toHaveTextContent('Aktiv: Corporate, Angewandte KI');
    // Erneuter Klick auf „Corporate“ → wieder abgewählt.
    await userEvent.click(c.getByRole('button', {
      name: 'Corporate'
    }));
    await expect(canvasElement).toHaveTextContent('Aktiv: Angewandte KI');
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Zustände',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [ChipComponent]
    },
    template: \`
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-chip label="Inaktiv"></cds-chip>
        <cds-chip label="Aktiv" [pressed]="true"></cds-chip>
        <cds-chip area="co" label="Corporate"></cds-chip>
        <cds-chip area="ki" label="Angewandte KI" [pressed]="true"></cds-chip>
      </div>
    \`
  })
}`,...y.parameters?.docs?.source}}}})))()}export{init_chip_stories as n,f as t};