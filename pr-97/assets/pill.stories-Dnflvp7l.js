import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{n as t,t as n}from"./pill.component-CamsB5EU.js";var r,i,a,o;function init_pill_stories(){return(init_pill_stories=e((()=>{t(),r={title:`Komponenten/Chips, Badges & Pills/Pill`,component:n,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-2123`},docs:{description:{component:`Redaktioneller Eyebrow in Versalien: eine passive Markierung, die einen Inhalt einer Brand Area zuordnet, typischerweise als thematischer Anker vor einem Titel. Abgrenzung zur Badge: die Pill ist ein redaktioneller Bereichs-Anker im Lesefluss, die Badge eine punktuelle Status- oder Bereichs-Kennzeichnung.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]}},args:{label:`Angewandte KI`,area:`ki`}},i={},a={parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[n]},template:`
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-pill area="co" label="Corporate"></cds-pill>
        <cds-pill area="ki" label="Angewandte KI"></cds-pill>
        <cds-pill area="es" label="Effektive Software"></cds-pill>
        <cds-pill area="wo" label="Wirksame Organisationen"></cds-pill>
      </div>
    `})},o=[`Interaktiv`,`Bereiche`],i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [PillComponent]
    },
    template: \`
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-pill area="co" label="Corporate"></cds-pill>
        <cds-pill area="ki" label="Angewandte KI"></cds-pill>
        <cds-pill area="es" label="Effektive Software"></cds-pill>
        <cds-pill area="wo" label="Wirksame Organisationen"></cds-pill>
      </div>
    \`
  })
}`,...a.parameters?.docs?.source}}}})))()}init_pill_stories();export{a as Bereiche,i as Interaktiv,o as __namedExportsOrder,r as default};