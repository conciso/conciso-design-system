import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,bn as o,z as s}from"./angular-platform-BGeCprOl.js";var c;function init_stat_card_component(){return(init_stat_card_component=e((()=>{a(),n(),c=class StatCardComponent{value=i.required();label=i.required();area=i(`co`);trend=i();trendText=i(``);static propDecorators={value:[{type:r,args:[{isSignal:!0,alias:`value`,required:!0,transform:void 0}]}],label:[{type:r,args:[{isSignal:!0,alias:`label`,required:!0,transform:void 0}]}],area:[{type:r,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],trend:[{type:r,args:[{isSignal:!0,alias:`trend`,required:!1,transform:void 0}]}],trendText:[{type:r,args:[{isSignal:!0,alias:`trendText`,required:!1,transform:void 0}]}]}},c=o([t({selector:`cds-stat-card`,changeDetection:s.OnPush,template:`
    <div class="card-stat" [attr.data-area]="area() || null">
      <p class="card-stat-value">{{ value() }}</p>
      <p class="card-stat-label">{{ label() }}</p>
      @if (trend()) {
        <span
          class="card-stat-trend"
          [class.up]="trend() === 'up'"
          [class.down]="trend() === 'down'"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path [attr.d]="trend() === 'up' ? 'M7 14l5-5 5 5z' : 'M7 10l5 5 5-5z'" />
          </svg>
          {{ trendText() }}
        </span>
      }
    </div>
  `})],c)})))()}var l,u,d,f;function init_stat_card_stories(){return(init_stat_card_stories=e((()=>{init_stat_card_component(),l={title:`Komponenten/Cards & Teaser/StatCard`,component:c,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3374`},layout:`padded`,docs:{description:{component:`Inhaltskarte für eine einzelne Kennzahl mit Wert, Beschriftung und optionalem Trend-Indikator (steigend/fallend). Farblich an jede Brand Area angepasst.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]},trend:{control:`inline-radio`,options:[void 0,`up`,`down`]}},args:{value:`98 %`,label:`Kundenzufriedenheit`,area:`co`,trend:`up`,trendText:`+12 %`}},u={},d={parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[c]},template:`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px">
        <cds-stat-card area="co" value="120+" label="Projekte" trend="up" trendText="+8"></cds-stat-card>
        <cds-stat-card area="ki" value="98 %" label="Zufriedenheit" trend="up" trendText="+12 %"></cds-stat-card>
        <cds-stat-card area="es" value="−34 %" label="Time-to-Market" trend="down" trendText="schneller"></cds-stat-card>
        <cds-stat-card area="wo" value="15 J." label="Erfahrung"></cds-stat-card>
      </div>
    `})},f=[`Interaktiv`,`Kennzahlen`],u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [StatCardComponent]
    },
    template: \`
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px">
        <cds-stat-card area="co" value="120+" label="Projekte" trend="up" trendText="+8"></cds-stat-card>
        <cds-stat-card area="ki" value="98 %" label="Zufriedenheit" trend="up" trendText="+12 %"></cds-stat-card>
        <cds-stat-card area="es" value="−34 %" label="Time-to-Market" trend="down" trendText="schneller"></cds-stat-card>
        <cds-stat-card area="wo" value="15 J." label="Erfahrung"></cds-stat-card>
      </div>
    \`
  })
}`,...d.parameters?.docs?.source}}}})))()}init_stat_card_stories();export{u as Interaktiv,d as Kennzahlen,f as __namedExportsOrder,l as default};