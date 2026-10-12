import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,bn as o,z as s}from"./angular-platform-BGeCprOl.js";var c;function init_status_badge_component(){return(init_status_badge_component=e((()=>{a(),n(),c=class StatusBadgeComponent{label=i.required();tone=i(`ok`);static propDecorators={label:[{type:r,args:[{isSignal:!0,alias:`label`,required:!0,transform:void 0}]}],tone:[{type:r,args:[{isSignal:!0,alias:`tone`,required:!1,transform:void 0}]}]}},c=o([t({selector:`cds-status-badge`,changeDetection:s.OnPush,template:`<span class="badge badge-{{ tone() }}">{{ label() }}</span>`})],c)})))()}var l,u,d,f;function init_status_badge_stories(){return(init_status_badge_stories=e((()=>{init_status_badge_component(),l={title:`Komponenten/Chips, Badges & Pills/Status-Badge`,component:c,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-2103`},docs:{description:{component:`Passive Zustands-Kennzeichnung: ein kleines, nicht interaktives Label, das den Status eines Elements über semantische Farben trägt: OK, Warnung, Fehler oder Neutral (z. B. Live, Beta, Deprecated, Draft). Für die Zuordnung zu einer Brand Area die Bereichs-Badge, für interaktive Filter den Chip nutzen.`}}},argTypes:{tone:{control:`inline-radio`,options:[`ok`,`warn`,`err`,`neu`],description:`Status-Ton: OK, Warnung, Fehler oder Neutral`}},args:{label:`Live`,tone:`ok`}},u={},d={name:`Alle Töne`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[c]},template:`
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-status-badge tone="ok" label="Live"></cds-status-badge>
        <cds-status-badge tone="warn" label="Beta"></cds-status-badge>
        <cds-status-badge tone="err" label="Deprecated"></cds-status-badge>
        <cds-status-badge tone="neu" label="Draft"></cds-status-badge>
      </div>
    `})},f=[`Interaktiv`,`Toene`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Alle Töne',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [StatusBadgeComponent]
    },
    template: \`
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
        <cds-status-badge tone="ok" label="Live"></cds-status-badge>
        <cds-status-badge tone="warn" label="Beta"></cds-status-badge>
        <cds-status-badge tone="err" label="Deprecated"></cds-status-badge>
        <cds-status-badge tone="neu" label="Draft"></cds-status-badge>
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}}})))()}init_status_badge_stories();export{u as Interaktiv,d as Toene,f as __namedExportsOrder,l as default};