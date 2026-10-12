import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{i as n,r,t as i}from"./forms-CsHRYVN2.js";import{n as a,t as o}from"./select.component-Hee2TAlB.js";var s=t({Deaktiviert:()=>g,Formularbindung:()=>v,Geoeffnet:()=>h,IconStrichstaerke:()=>b,Interaktiv:()=>m,Tastatur:()=>_,TypeaheadPuffer:()=>y,__namedExportsOrder:()=>x,default:()=>p}),c,l,u,d,f,p,m,h,g,_,v,y,b,x;function init_select_stories(){return(init_select_stories=e((()=>{n(),a(),{within:c,userEvent:l,expect:u,waitFor:d}=__STORYBOOK_MODULE_TEST__,f=[{value:`co`,label:`Corporate`},{value:`ki`,label:`Angewandte KI`},{value:`es`,label:`Effektive Software`},{value:`wo`,label:`Wirksame Organisationen`}],p={title:`Komponenten/Dropdowns/Custom Select`,component:o,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5453`},layout:`padded`,docs:{description:{component:`Gestylte Einzelauswahl mit Listbox-Popup, Häkchen und Bereichs-Akzent, für Fälle, in denen das native Select optisch zum Bereich gehören soll. Volle Tastatur (↑↓, Pos1/Ende, Type-ahead, Enter wählt, Esc schließt) und WCAG-AA-Verdrahtung (role=listbox/option, aria-haspopup/-expanded/-activedescendant). Für kurze Listen in Formularen bleibt das native Auswahlfeld der Standard.`}}},argTypes:{area:{control:`inline-radio`,options:[void 0,`co`,`ki`,`es`,`wo`]},disabled:{control:`boolean`}},args:{label:`Bereich`,options:f,placeholder:`Bitte wählen…`,area:void 0,disabled:!1}},m={play:async({canvasElement:e})=>{let t=c(e);await l.click(t.getByRole(`button`)),await l.click(t.getByRole(`option`,{name:`Effektive Software`})),await d(()=>u(t.getByRole(`button`)).toHaveTextContent(`Effektive Software`))}},h={name:`Geöffnet · vorausgewählt`,args:{label:`Anwendungsfall`,area:`ki`,value:`ki`},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=c(e);await l.click(t.getByRole(`button`)),await d(()=>u(t.getByRole(`listbox`)).toBeVisible())}},g={args:{label:`Bereich`,value:`co`,disabled:!0},parameters:{controls:{disable:!0}}},_={name:`Tastatur`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=c(e),n=t.getByRole(`button`);n.focus(),await l.keyboard(`{ArrowDown}`),await d(()=>u(n).toHaveAttribute(`aria-expanded`,`true`));let r=t.getByRole(`listbox`);await d(()=>u(r).toHaveFocus());let i=t.getAllByRole(`option`);await u(r).toHaveAttribute(`aria-activedescendant`,i[0].id),await l.keyboard(`{ArrowDown}`),await u(r).toHaveAttribute(`aria-activedescendant`,i[1].id),await l.keyboard(`{End}`),await u(r).toHaveAttribute(`aria-activedescendant`,i[i.length-1].id),await l.keyboard(`{Home}`),await u(r).toHaveAttribute(`aria-activedescendant`,i[0].id),await l.keyboard(`{Escape}`),await u(n).toHaveAttribute(`aria-expanded`,`false`),await u(n).toHaveFocus(),await u(n).toHaveTextContent(`Bitte wählen…`),await l.keyboard(`{ArrowDown}`),await d(()=>u(r).toHaveFocus()),await l.keyboard(`e`),await u(r).toHaveAttribute(`aria-activedescendant`,i[2].id),await l.keyboard(`{Enter}`),await d(()=>u(n).toHaveTextContent(`Effektive Software`)),await u(n).toHaveAttribute(`aria-expanded`,`false`)}},v={name:`Formularbindung`,parameters:{controls:{disable:!0},snapshot:{skip:!0},docs:{description:{story:"Der Custom Select ist ein `ControlValueAccessor` und bindet direkt an reactive forms (`formControl`); der Formularwert ist der Options-`value` (hier live angezeigt). Ohne Formular geht alternativ `[(value)]`."}}},render:()=>{let e=new i(``);return{moduleMetadata:{imports:[o,r]},props:{ctrl:e,options:f},template:`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-select label="Bereich" [options]="options" [formControl]="ctrl"></cds-select>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '(leer)' }}</strong></p>
        </div>
      `}},play:async({canvasElement:e})=>{let t=c(e);await u(e).toHaveTextContent(`Wert: (leer)`),await l.click(t.getByRole(`button`)),await l.click(t.getByRole(`option`,{name:`Effektive Software`})),await d(()=>u(e).toHaveTextContent(`Wert: es`))}},y={name:`Type-ahead · Puffer 600 ms`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=c(e),warte=e=>new Promise(t=>setTimeout(t,e));t.getByRole(`button`).focus(),await l.keyboard(`{ArrowDown}`);let n=t.getByRole(`listbox`);await d(()=>u(n).toHaveFocus());let r=t.getAllByRole(`option`);await l.keyboard(`w`),await u(n).toHaveAttribute(`aria-activedescendant`,r[3].id),await warte(100),await l.keyboard(`e`),await u(n).toHaveAttribute(`aria-activedescendant`,r[3].id),await warte(1200),await l.keyboard(`e`),await u(n).toHaveAttribute(`aria-activedescendant`,r[2].id)}},b={name:`Icon-Strichstärke`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=c(e),n=e.querySelector(`svg.ep-select-caret`);await u(n).toHaveAttribute(`aria-hidden`,`true`),await u(parseFloat(getComputedStyle(n).strokeWidth)).toBe(1.5),await l.click(t.getByRole(`button`));let r=e.querySelector(`svg.ep-select-check`);await u(r).toHaveAttribute(`aria-hidden`,`true`),await u(r).toHaveAttribute(`viewBox`,`0 0 24 24`);let i=parseFloat(getComputedStyle(r).strokeWidth);await u(i).toBeCloseTo(3.2,5),await u(i*20/24).toBeCloseTo(2.67,2)}},x=[`Interaktiv`,`Geoeffnet`,`Deaktiviert`,`Tastatur`,`Formularbindung`,`TypeaheadPuffer`,`IconStrichstaerke`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  // Öffnen und eine Option wählen; der Trigger zeigt danach das Label.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button'));
    await userEvent.click(c.getByRole('option', {
      name: 'Effektive Software'
    }));
    await waitFor(() => expect(c.getByRole('button')).toHaveTextContent('Effektive Software'));
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Geöffnet · vorausgewählt',
  args: {
    label: 'Anwendungsfall',
    area: 'ki',
    value: 'ki'
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  // Menü offen lassen → zeigt Listbox mit Häkchen auf der gewählten Option.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button'));
    await waitFor(() => expect(c.getByRole('listbox')).toBeVisible());
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Bereich',
    value: 'co',
    disabled: true
  },
  parameters: {
    controls: {
      disable: true
    }
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Tastatur',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Vollständigstes Tastatur-Handling der Lib: ArrowDown öffnet den geschlossenen
  // Trigger, ArrowDown/-Up bewegen (geklemmt, kein Umlauf), Home/End an die Enden,
  // Type-ahead springt zur passenden Option, Enter wählt + schließt, Escape schließt
  // ohne Auswahl und gibt den Fokus an den Trigger zurück.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const trigger = c.getByRole('button');
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'));
    const listbox = c.getByRole('listbox');
    await waitFor(() => expect(listbox).toHaveFocus());
    const options = c.getAllByRole('option');
    await expect(listbox).toHaveAttribute('aria-activedescendant', options[0].id);
    await userEvent.keyboard('{ArrowDown}');
    await expect(listbox).toHaveAttribute('aria-activedescendant', options[1].id);
    await userEvent.keyboard('{End}');
    await expect(listbox).toHaveAttribute('aria-activedescendant', options[options.length - 1].id);
    await userEvent.keyboard('{Home}');
    await expect(listbox).toHaveAttribute('aria-activedescendant', options[0].id);

    // Escape schließt OHNE Auswahl, Fokus geht zurück auf den Trigger.
    await userEvent.keyboard('{Escape}');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(trigger).toHaveFocus();
    await expect(trigger).toHaveTextContent('Bitte wählen…');

    // Erneut öffnen, Type-ahead springt zur ersten Option, deren Label mit „e“ beginnt
    // („Effektive Software“).
    await userEvent.keyboard('{ArrowDown}');
    await waitFor(() => expect(listbox).toHaveFocus());
    await userEvent.keyboard('e');
    await expect(listbox).toHaveAttribute('aria-activedescendant', options[2].id);

    // Enter wählt die aktive Option und schließt die Listbox.
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(trigger).toHaveTextContent('Effektive Software'));
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
        story: 'Der Custom Select ist ein \`ControlValueAccessor\` und bindet direkt an ' + 'reactive forms (\`formControl\`); der Formularwert ist der Options-\`value\` ' + '(hier live angezeigt). Ohne Formular geht alternativ \`[(value)]\`.'
      }
    }
  },
  render: () => {
    const ctrl = new FormControl('');
    return {
      moduleMetadata: {
        imports: [SelectComponent, ReactiveFormsModule]
      },
      props: {
        ctrl,
        options: AREAS
      },
      template: \`
        <div style="display:flex;flex-direction:column;gap:var(--s3);max-width:28rem">
          <cds-select label="Bereich" [options]="options" [formControl]="ctrl"></cds-select>
          <p style="font:14px/1.4 system-ui,sans-serif;margin:0">Wert: <strong>{{ ctrl.value || '(leer)' }}</strong></p>
        </div>
      \`
    };
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(canvasElement).toHaveTextContent('Wert: (leer)');
    await userEvent.click(c.getByRole('button'));
    await userEvent.click(c.getByRole('option', {
      name: 'Effektive Software'
    }));
    await waitFor(() => expect(canvasElement).toHaveTextContent('Wert: es'));
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Type-ahead · Puffer 600 ms',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Bewusst mit großem Abstand zur Grenze (kein Echtzeit-Flackern): Innerhalb von 600 ms wird
  // verkettet („w“, nach 100 ms „e“ ergibt „we“: kein Treffer, die Markierung bleibt bei
  // „Wirksame Organisationen“). Nach deutlich mehr als 600 ms beginnt der Puffer neu,
  // „e“ springt zu „Effektive Software“.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const warte = (ms: number) => new Promise(r => setTimeout(r, ms));
    const trigger = c.getByRole('button');
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');
    const listbox = c.getByRole('listbox');
    await waitFor(() => expect(listbox).toHaveFocus());
    const options = c.getAllByRole('option');
    await userEvent.keyboard('w');
    await expect(listbox).toHaveAttribute('aria-activedescendant', options[3].id);
    await warte(100);
    await userEvent.keyboard('e');
    await expect(listbox).toHaveAttribute('aria-activedescendant', options[3].id);
    await warte(1200);
    await userEvent.keyboard('e');
    await expect(listbox).toHaveAttribute('aria-activedescendant', options[2].id);
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Icon-Strichstärke',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Pinnt die Strichstärke der Chrome-Icons (Lucide, ADR-0016): bisher Heroicons-Outline mit
  // 1.5 (= --icon-stroke-md), Lucide-Default wäre 2. Die Komponente setzt CDS_ICON_STROKE
  // explizit; hier wird der WIRKSAME (berechnete) Wert geprüft, damit auch eine CSS-Regel,
  // die das Attribut überschreibt, auffiele. Dekorative Icons bleiben aria-hidden.
  // Caret: Lucide-Chevron mit 1.5. Haken: Lucide-Check mit 3.2 in der 24er-viewBox bei 20 px
  // (≙ 3.2 * 20 / 24 ≈ 2.67 px Bildschirmstrich, das Gewicht des früheren DS-Glyphs ui-check).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const caret = canvasElement.querySelector('svg.ep-select-caret') as SVGElement;
    await expect(caret).toHaveAttribute('aria-hidden', 'true');
    await expect(parseFloat(getComputedStyle(caret).strokeWidth)).toBe(1.5);
    await userEvent.click(c.getByRole('button'));
    const check = canvasElement.querySelector('svg.ep-select-check') as SVGElement;
    await expect(check).toHaveAttribute('aria-hidden', 'true');
    await expect(check).toHaveAttribute('viewBox', '0 0 24 24');
    const stroke = parseFloat(getComputedStyle(check).strokeWidth);
    await expect(stroke).toBeCloseTo(3.2, 5);
    await expect(stroke * 20 / 24).toBeCloseTo(2.67, 2);
  }
}`,...b.parameters?.docs?.source}}}})))()}export{s as n,init_select_stories as t};