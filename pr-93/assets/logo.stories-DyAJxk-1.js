import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{n,t as r}from"./logo.component-BURKZYT3.js";var i=t({MitBild:()=>o,TextFallback:()=>s,Wortmarken:()=>c,__namedExportsOrder:()=>l,default:()=>a}),a,o,s,c,l;function init_logo_stories(){return(init_logo_stories=e((()=>{n(),a={title:`Marke/Logo/Logo`,component:r,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4032`},layout:`centered`,docs:{description:{component:"Einzelne Logo-Kachel. Zeigt bevorzugt ein **Bild** (`src`); ohne Bild fällt sie auf den Text-`label` als Platzhalter zurück. Eigenständig nutzbar (Partner-Leiste, „Bekannt aus“-Reihe) oder als Baustein des `cds-logo-carousel`."}}},argTypes:{label:{description:`Firmen-/Markenname, Alt-Fallback und Text-Platzhalter.`},src:{description:`Bildquelle (URL/Data-URI). Gesetzt → Bild statt Text.`},alt:{description:"Alt-Text des Bilds (Fallback: `label`)."}}},o={parameters:{snapshot:{skip:!0}},args:{label:`Conciso`,src:`./conciso/brand/logo-conciso.svg`}},s={parameters:{snapshot:{skip:!0}},args:{label:`NORDWIND`}},c={parameters:{controls:{disable:!0},layout:`padded`},render:()=>({moduleMetadata:{imports:[r]},template:`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">
        <figure style="margin:0">
          <div style="background:var(--bg-plate);border:var(--bd-strong);border-radius:var(--r-lg);padding:32px 24px">
            <cds-logo label="Conciso" alt="Conciso, Standard" src="./conciso/brand/logo-conciso.svg"></cds-logo>
          </div>
          <figcaption style="font:var(--ty-label-sm);color:var(--tx-secondary);margin-top:8px">Standard</figcaption>
        </figure>
        <figure style="margin:0">
          <div style="background:#F5F7F7;border:var(--bd-strong);border-radius:var(--r-lg);padding:32px 24px">
            <cds-logo label="Conciso" alt="Conciso, Mono dunkel" src="./conciso/brand/logo-conciso-dark.svg"></cds-logo>
          </div>
          <figcaption style="font:var(--ty-label-sm);color:var(--tx-secondary);margin-top:8px">Mono dunkel</figcaption>
        </figure>
        <figure style="margin:0">
          <div style="background:var(--n-700);border-radius:var(--r-lg);padding:32px 24px">
            <cds-logo label="Conciso" alt="Conciso, Mono hell" src="./conciso/brand/logo-conciso-light.svg"></cds-logo>
          </div>
          <figcaption style="font:var(--ty-label-sm);color:var(--tx-secondary);margin-top:8px">Mono hell auf dunklem Grund</figcaption>
        </figure>
      </div>
    `})},l=[`MitBild`,`TextFallback`,`Wortmarken`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    snapshot: {
      skip: true
    }
  },
  args: {
    label: 'Conciso',
    src: './conciso/brand/logo-conciso.svg'
  }
}`,...o.parameters?.docs?.source},description:{story:`Mit Bild: das Conciso-Logo als Stellvertreter (Kacheln liegen randlos auf weißer Platte).`,...o.parameters?.docs?.description}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  // TODO: snapshot.skip entfernen, sobald visual.yml auf main ist und Baselines
  // erzeugt werden können (CI schreibt neue Snapshots nicht selbst).
  parameters: {
    snapshot: {
      skip: true
    }
  },
  args: {
    label: 'NORDWIND'
  }
}`,...s.parameters?.docs?.source},description:{story:`Ohne Bild: Text-Platzhalter als Fallback.`,...s.parameters?.docs?.description}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    },
    layout: 'padded'
  },
  render: () => ({
    moduleMetadata: {
      imports: [LogoComponent]
    },
    template: \`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px">
        <figure style="margin:0">
          <div style="background:var(--bg-plate);border:var(--bd-strong);border-radius:var(--r-lg);padding:32px 24px">
            <cds-logo label="Conciso" alt="Conciso, Standard" src="./conciso/brand/logo-conciso.svg"></cds-logo>
          </div>
          <figcaption style="font:var(--ty-label-sm);color:var(--tx-secondary);margin-top:8px">Standard</figcaption>
        </figure>
        <figure style="margin:0">
          <div style="background:#F5F7F7;border:var(--bd-strong);border-radius:var(--r-lg);padding:32px 24px">
            <cds-logo label="Conciso" alt="Conciso, Mono dunkel" src="./conciso/brand/logo-conciso-dark.svg"></cds-logo>
          </div>
          <figcaption style="font:var(--ty-label-sm);color:var(--tx-secondary);margin-top:8px">Mono dunkel</figcaption>
        </figure>
        <figure style="margin:0">
          <div style="background:var(--n-700);border-radius:var(--r-lg);padding:32px 24px">
            <cds-logo label="Conciso" alt="Conciso, Mono hell" src="./conciso/brand/logo-conciso-light.svg"></cds-logo>
          </div>
          <figcaption style="font:var(--ty-label-sm);color:var(--tx-secondary);margin-top:8px">Mono hell auf dunklem Grund</figcaption>
        </figure>
      </div>
    \`
  })
}`,...c.parameters?.docs?.source},description:{story:"Die drei Wortmarken-Varianten, jeweils auf dem Grund, für den sie gedacht sind:\nStandard (Vollfarbe) auf heller Platte, Mono dunkel (einfarbig, auch der Punkt in der Wortmarkenfarbe) auf festem Hellgrau,\nMono hell (Weiß) auf dunklem Grund. Dateien: `logo-conciso.svg`, `logo-conciso-dark.svg`\nund `logo-conciso-light.svg`.",...c.parameters?.docs?.description}}}})))()}export{i as n,init_logo_stories as t};