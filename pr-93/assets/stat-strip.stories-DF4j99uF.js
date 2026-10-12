import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,V as r,fn as i,k as a,q as o,sn as s}from"./angular-platform-CAY__VLP.js";var c;function init_stat_strip_component(){return(init_stat_strip_component=e((()=>{i(),a(),c=class StatStripComponent{stats=t.required();rounded=t(!0);static propDecorators={stats:[{type:o,args:[{isSignal:!0,alias:`stats`,required:!0,transform:void 0}]}],rounded:[{type:o,args:[{isSignal:!0,alias:`rounded`,required:!1,transform:void 0}]}]}},c=s([n({selector:`cds-stat-strip`,changeDetection:r.OnPush,template:`
    <div class="card-stat-strip" [style.border-radius]="rounded() ? 'var(--r-lg)' : null">
      @for (stat of stats(); track stat) {
        <div class="card-stat-flat" [attr.data-area]="stat.area || null">
          <p class="card-stat-flat-value">{{ stat.value }}</p>
          <p class="card-stat-flat-label">{{ stat.label }}</p>
        </div>
      }
    </div>
  `})],c)})))()}var l,u,d,f;function init_stat_strip_stories(){return(init_stat_strip_stories=e((()=>{init_stat_strip_component(),l={title:`Komponenten/Cards & Teaser/StatStrip`,component:c,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3429`},layout:`fullscreen`,docs:{description:{component:`Flache Kennzahlen-Leiste, die mehrere zentrierte Werte nebeneinander als ruhiges Band zusammenfasst, ohne Rahmen oder Schatten. Jede Kennzahl ist an ihre Brand Area farblich angepasst.`}}},argTypes:{rounded:{control:`boolean`}},args:{rounded:!0,stats:[{area:`co`,value:`94 %`,label:`Kundenzufriedenheit`},{area:`ki`,value:`3×`,label:`Schnellere Prozesse durch KI`},{area:`es`,value:`99,9 %`,label:`System-Uptime`},{area:`wo`,value:`280+`,label:`Transformationsprojekte`}]}},u={},d={name:`Drei Kennzahlen`,args:{stats:[{area:`co`,value:`120+`,label:`Projekte`},{area:`es`,value:`−34 %`,label:`Time-to-Market`},{area:`wo`,value:`15 J.`,label:`Erfahrung`}]}},f=[`Interaktiv`,`DreiKennzahlen`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Drei Kennzahlen',
  args: {
    stats: [{
      area: 'co',
      value: '120+',
      label: 'Projekte'
    }, {
      area: 'es',
      value: '−34 %',
      label: 'Time-to-Market'
    }, {
      area: 'wo',
      value: '15 J.',
      label: 'Erfahrung'
    }]
  }
}`,...d.parameters?.docs?.source}}}})))()}init_stat_strip_stories();export{d as DreiKennzahlen,u as Interaktiv,f as __namedExportsOrder,l as default};