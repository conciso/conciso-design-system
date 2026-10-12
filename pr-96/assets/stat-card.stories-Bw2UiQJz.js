import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,V as r,fn as i,k as a,q as o,sn as s}from"./angular-platform-CAY__VLP.js";var c;function init_stat_card_component(){return(init_stat_card_component=e((()=>{i(),a(),c=class StatCardComponent{value=t.required();label=t.required();area=t(`co`);trend=t();trendText=t(``);static propDecorators={value:[{type:o,args:[{isSignal:!0,alias:`value`,required:!0,transform:void 0}]}],label:[{type:o,args:[{isSignal:!0,alias:`label`,required:!0,transform:void 0}]}],area:[{type:o,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],trend:[{type:o,args:[{isSignal:!0,alias:`trend`,required:!1,transform:void 0}]}],trendText:[{type:o,args:[{isSignal:!0,alias:`trendText`,required:!1,transform:void 0}]}]}},c=s([n({selector:`cds-stat-card`,changeDetection:r.OnPush,template:`
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
  `})],c)})))()}var l,u,d,f;function init_stat_card_stories(){return(init_stat_card_stories=e((()=>{init_stat_card_component(),l={title:`Komponenten/Cards & Teaser/Stat-Card`,component:c,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3374`},layout:`padded`,docs:{description:{component:`Inhaltskarte für eine einzelne Kennzahl mit Wert, Beschriftung und optionalem Trend-Indikator (steigend/fallend). Farblich an jede Brand Area angepasst.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]},trend:{control:`inline-radio`,options:[void 0,`up`,`down`]}},args:{value:`98 %`,label:`Kundenzufriedenheit`,area:`co`,trend:`up`,trendText:`+12 %`}},u={},d={parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[c]},template:`
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