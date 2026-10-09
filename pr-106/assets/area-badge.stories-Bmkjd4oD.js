import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,bn as o,z as s}from"./angular-platform-BGeCprOl.js";var c;function init_area_badge_component(){return(init_area_badge_component=e((()=>{a(),n(),c=class AreaBadgeComponent{label=i.required();area=i(`co`);static propDecorators={label:[{type:r,args:[{isSignal:!0,alias:`label`,required:!0,transform:void 0}]}],area:[{type:r,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}]}},c=o([t({selector:`cds-area-badge`,changeDetection:s.OnPush,template:`<span class="badge" [attr.data-area]="area()">{{ label() }}</span>`})],c)})))()}var l,u,d,f;function init_area_badge_stories(){return(init_area_badge_stories=e((()=>{init_area_badge_component(),l={title:`Komponenten/Chips, Badges & Pills/Bereichs-Badge`,component:c,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-2113`},docs:{description:{component:`Passive Bereichs-Kennzeichnung: ein kleines, nicht interaktives Label, das ein Element einer der vier Brand Areas zuordnet (50er-Grund, 800er-Text). Für Zustände die Status-Badge, für einen redaktionellen Anker im Lesefluss die Pill, für interaktive Filter den Chip nutzen.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`],description:`Brand Area, die die Bereichsfarbe bestimmt`}},args:{label:`Corporate`,area:`co`}},u={},d={parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[c]},template:`
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-area-badge area="co" label="Corporate"></cds-area-badge>
        <cds-area-badge area="ki" label="Angewandte KI"></cds-area-badge>
        <cds-area-badge area="es" label="Effektive Software"></cds-area-badge>
        <cds-area-badge area="wo" label="Wirksame Organisationen"></cds-area-badge>
      </div>
    `})},f=[`Interaktiv`,`Bereiche`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [AreaBadgeComponent]
    },
    template: \`
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-area-badge area="co" label="Corporate"></cds-area-badge>
        <cds-area-badge area="ki" label="Angewandte KI"></cds-area-badge>
        <cds-area-badge area="es" label="Effektive Software"></cds-area-badge>
        <cds-area-badge area="wo" label="Wirksame Organisationen"></cds-area-badge>
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}}})))()}init_area_badge_stories();export{d as Bereiche,u as Interaktiv,f as __namedExportsOrder,l as default};