import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{n,t as r}from"./button.component-BsGAIH6q.js";var i=t({AufBand:()=>h,Bereichsfarben:()=>f,Deaktiviert:()=>g,Destruktiv:()=>p,Groessen:()=>m,Interaktiv:()=>u,KlickVerhalten:()=>_,Varianten:()=>d,__namedExportsOrder:()=>v,default:()=>l}),a,o,s,c,l,u,d,f,p,m,h,g,_,v;function init_button_stories(){return(init_button_stories=e((()=>{n(),{within:a,userEvent:o,expect:s,fn:c}=__STORYBOOK_MODULE_TEST__,l={title:`Komponenten/Button`,component:r,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=3-1658`},docs:{description:{component:"Die zentrale Aktions-Schaltfläche des Design Systems. Fünf Stil-Varianten (Filled, Tonal, Elevated, Outlined, Text) und drei Größen (Default, Small, Large) decken unterschiedliche Betonung und Kontext ab; der Ton `err` markiert destruktive Aktionen, ein Inversions-Modus passt Buttons auf farbige Bereichs-Bänder an. Mindest-Touch-Target 44 px."}}},argTypes:{variant:{control:{type:`select`,labels:{"filled-on-band":`Filled (auf Band)`}},options:[`filled`,`tonal`,`elevated`,`outlined`,`text`,`filled-on-band`],description:`Stil-Variante mit abnehmender Betonung: Filled, Tonal, Elevated, Outlined, Text. „Filled (auf Band)“ ist der invertierte Filled-Button für farbige Bereichs-Bänder.`},area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`],description:"Brand Area, die die Button-Farbe bestimmt (wirkungslos bei Ton `err`)"},tone:{control:{type:`inline-radio`,labels:{def:`Standard`,err:`Destruktiv`}},options:[`def`,`err`],description:"Ton: `err` markiert eine Aktion, die sich nicht rückgängig machen lässt, und ersetzt die Bereichsfarbe"},size:{control:`inline-radio`,options:[`sm`,`md`,`lg`],description:`Größe: Small, Medium (Default) oder Large`},full:{control:`boolean`,description:`Streckt den Button auf die volle Breite des Containers`},disabled:{control:`boolean`}},args:{label:`Kontakt aufnehmen`,variant:`filled`,area:`co`,tone:`def`,size:`md`,full:!1,disabled:!1}},u={parameters:{layout:`padded`},render:e=>({props:e,moduleMetadata:{imports:[r]},template:`
      @if (variant === 'filled-on-band') {
        <div [style.background]="'var(--' + area + (area === 'ki' ? '-800' : '-700') + ')'" style="padding:24px;border-radius:var(--r-md)">
          <cds-button [label]="label" [variant]="variant" [area]="area" [tone]="tone" [size]="size" [full]="full" [disabled]="disabled" />
        </div>
      } @else {
        <cds-button [label]="label" [variant]="variant" [area]="area" [tone]="tone" [size]="size" [full]="full" [disabled]="disabled" />
      }
    `})},d={name:`Alle Varianten`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[r]},template:`
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <cds-button variant="filled" label="Filled"></cds-button>
        <cds-button variant="tonal" label="Tonal"></cds-button>
        <cds-button variant="elevated" label="Elevated"></cds-button>
        <cds-button variant="outlined" label="Outlined"></cds-button>
        <cds-button variant="text" label="Text"></cds-button>
      </div>
    `})},f={name:`Bereichsfarben`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[r]},template:`
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <cds-button area="co" label="Corporate"></cds-button>
        <cds-button area="ki" label="Angewandte KI"></cds-button>
        <cds-button area="es" label="Effektive Software"></cds-button>
        <cds-button area="wo" label="Wirksame Organisationen"></cds-button>
      </div>
    `})},p={name:`Destruktiv`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[r]},template:`
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <cds-button tone="err" label="Löschen"></cds-button>
        <cds-button tone="err" variant="outlined" label="Verwerfen"></cds-button>
        <cds-button tone="err" variant="text" label="Entfernen"></cds-button>
      </div>
    `}),play:async({canvasElement:e})=>{let t=a(e).getByRole(`button`,{name:`Löschen`});await s(t).toHaveClass(`btn-err`),await s(t).not.toHaveClass(`btn-co`)}},m={name:`Größen`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[r]},template:`
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <cds-button size="sm" label="Small"></cds-button>
        <cds-button size="md" label="Medium"></cds-button>
        <cds-button size="lg" label="Large"></cds-button>
      </div>
    `})},h={name:`Auf Bereichs-Band`,parameters:{layout:`padded`,controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[r]},template:`
      <div style="display:flex;flex-direction:column;gap:12px">
        <div style="background:var(--co-700);padding:20px;border-radius:var(--r-md)">
          <cds-button variant="filled-on-band" area="co" label="Termin buchen"></cds-button>
        </div>
        <div style="background:var(--ki-800);padding:20px;border-radius:var(--r-md)">
          <cds-button variant="filled-on-band" area="ki" label="KI-Potenzial analysieren"></cds-button>
        </div>
        <div style="background:var(--es-700);padding:20px;border-radius:var(--r-md)">
          <cds-button variant="filled-on-band" area="es" label="Assessment anfragen"></cds-button>
        </div>
        <div style="background:var(--wo-700);padding:20px;border-radius:var(--r-md)">
          <cds-button variant="filled-on-band" area="wo" label="Erstgespräch anfragen"></cds-button>
        </div>
      </div>
    `})},g={args:{disabled:!0,label:`Nicht verfügbar`,clicked:c()},play:async({canvasElement:e,args:t})=>{let n=a(e);await o.click(n.getByRole(`button`,{name:`Nicht verfügbar`}),{pointerEventsCheck:0}),await s(t.clicked).not.toHaveBeenCalled()}},_={name:`Klick-Verhalten`,parameters:{controls:{disable:!0}},args:{clicked:c()},play:async({canvasElement:e,args:t})=>{let n=a(e);await o.click(n.getByRole(`button`,{name:`Kontakt aufnehmen`})),await s(t.clicked).toHaveBeenCalledTimes(1)}},v=[`Interaktiv`,`Varianten`,`Bereichsfarben`,`Destruktiv`,`Groessen`,`AufBand`,`Deaktiviert`,`KlickVerhalten`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  // padded statt centered: im zentrierten Flex-Canvas schrumpft der Story-Root
  // auf Inhaltsbreite, wodurch .btn-full (width:100%) nie sichtbar würde.
  parameters: {
    layout: 'padded'
  },
  // Bei variant="filled-on-band" den Button auf dem farbigen Bereichs-Band zeigen
  // (wie in der Doku, Band = --XX-700 bzw. ki-800) — auf weißem Canvas wäre die
  // Invertierung nicht beurteilbar. Sonst exakt das ungerahmte Standard-Rendering.
  render: args => ({
    props: args,
    moduleMetadata: {
      imports: [ButtonComponent]
    },
    template: \`
      @if (variant === 'filled-on-band') {
        <div [style.background]="'var(--' + area + (area === 'ki' ? '-800' : '-700') + ')'" style="padding:24px;border-radius:var(--r-md)">
          <cds-button [label]="label" [variant]="variant" [area]="area" [tone]="tone" [size]="size" [full]="full" [disabled]="disabled" />
        </div>
      } @else {
        <cds-button [label]="label" [variant]="variant" [area]="area" [tone]="tone" [size]="size" [full]="full" [disabled]="disabled" />
      }
    \`
  })
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Alle Varianten',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [ButtonComponent]
    },
    template: \`
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <cds-button variant="filled" label="Filled"></cds-button>
        <cds-button variant="tonal" label="Tonal"></cds-button>
        <cds-button variant="elevated" label="Elevated"></cds-button>
        <cds-button variant="outlined" label="Outlined"></cds-button>
        <cds-button variant="text" label="Text"></cds-button>
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Bereichsfarben',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [ButtonComponent]
    },
    template: \`
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <cds-button area="co" label="Corporate"></cds-button>
        <cds-button area="ki" label="Angewandte KI"></cds-button>
        <cds-button area="es" label="Effektive Software"></cds-button>
        <cds-button area="wo" label="Wirksame Organisationen"></cds-button>
      </div>
    \`
  })
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Destruktiv',
  parameters: {
    controls: {
      disable: true
    }
  },
  // tone="err" ersetzt die Bereichsklasse durch .btn-err, gedacht für Filled, Outlined, Text.
  render: () => ({
    moduleMetadata: {
      imports: [ButtonComponent]
    },
    template: \`
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <cds-button tone="err" label="Löschen"></cds-button>
        <cds-button tone="err" variant="outlined" label="Verwerfen"></cds-button>
        <cds-button tone="err" variant="text" label="Entfernen"></cds-button>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const loeschen = c.getByRole('button', {
      name: 'Löschen'
    });
    await expect(loeschen).toHaveClass('btn-err');
    await expect(loeschen).not.toHaveClass('btn-co');
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Größen',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [ButtonComponent]
    },
    template: \`
      <div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center">
        <cds-button size="sm" label="Small"></cds-button>
        <cds-button size="md" label="Medium"></cds-button>
        <cds-button size="lg" label="Large"></cds-button>
      </div>
    \`
  })
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Auf Bereichs-Band',
  parameters: {
    layout: 'padded',
    controls: {
      disable: true
    }
  },
  // Invertierter Filled-Button (variant="filled-on-band") auf dem farbigen
  // Bereichs-Band — der einzige Kontext, in dem die Inversion Sinn ergibt
  // (Doku: „On-Band-Modifier“ / Page-End-CTA-Band). Band = --XX-700, ki = -800.
  render: () => ({
    moduleMetadata: {
      imports: [ButtonComponent]
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:12px">
        <div style="background:var(--co-700);padding:20px;border-radius:var(--r-md)">
          <cds-button variant="filled-on-band" area="co" label="Termin buchen"></cds-button>
        </div>
        <div style="background:var(--ki-800);padding:20px;border-radius:var(--r-md)">
          <cds-button variant="filled-on-band" area="ki" label="KI-Potenzial analysieren"></cds-button>
        </div>
        <div style="background:var(--es-700);padding:20px;border-radius:var(--r-md)">
          <cds-button variant="filled-on-band" area="es" label="Assessment anfragen"></cds-button>
        </div>
        <div style="background:var(--wo-700);padding:20px;border-radius:var(--r-md)">
          <cds-button variant="filled-on-band" area="wo" label="Erstgespräch anfragen"></cds-button>
        </div>
      </div>
    \`
  })
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    label: 'Nicht verfügbar',
    clicked: fn()
  },
  // Natives disabled-Attribut verhindert das Klick-Event bereits im Browser — clicked
  // darf nicht feuern. .btn[disabled] setzt zusätzlich pointer-events:none (css/
  // components.css), daher die Pointer-Events-Prüfung von userEvent hier bewusst
  // abschalten (sonst bricht der Klickversuch selbst mit einem Fehler ab, statt die
  // erwartete Nicht-Reaktion zu zeigen).
  play: async ({
    canvasElement,
    args
  }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', {
      name: 'Nicht verfügbar'
    }), {
      pointerEventsCheck: 0
    });
    await expect(args.clicked).not.toHaveBeenCalled();
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Klick-Verhalten',
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    clicked: fn()
  },
  // clicked feuert bei einem Klick auf den (nicht deaktivierten) Button.
  play: async ({
    canvasElement,
    args
  }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', {
      name: 'Kontakt aufnehmen'
    }));
    await expect(args.clicked).toHaveBeenCalledTimes(1);
  }
}`,..._.parameters?.docs?.source}}}})))()}export{init_button_stories as n,i as t};