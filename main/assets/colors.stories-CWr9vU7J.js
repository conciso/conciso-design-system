import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";var n=t({FlaechenTextRand:()=>s,Paletten:()=>a,Semantisch:()=>o,__namedExportsOrder:()=>c,default:()=>r}),r,swatch,textSwatch,pairSwatch,grid,section,ramp,i,a,o,s,c;function init_colors_stories(){return(init_colors_stories=e((()=>{r={title:`Grundlagen/Farben`,tags:[`autodocs`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=3-172`},layout:`fullscreen`,docs:{description:{component:"Die Marken- und Neutral-Paletten, Flächen, Text- und Randfarben sowie die Status- und Badge-Farben als Live-Swatches direkt aus `css/tokens.css`. Schaltet man oben das Theme auf „Dark“, greifen die Overrides aus `css/dark-mode.css`."}}}},swatch=(e,t=e)=>`
  <div style="display:flex;flex-direction:column;gap:4px">
    <div style="height:48px;border-radius:var(--r-sm);border:var(--bd);background:var(--${e})"></div>
    <span style="font:var(--ty-body-xs);color:var(--tx-secondary)">${t}</span>
  </div>`,textSwatch=e=>`
  <div style="display:flex;flex-direction:column;gap:4px">
    <div style="height:48px;border-radius:var(--r-sm);border:var(--bd);background:var(--bg-surface);display:flex;align-items:center;padding:0 var(--s3);font:var(--ty-title-sm);color:var(--${e})">Aa</div>
    <span style="font:var(--ty-body-xs);color:var(--tx-secondary)">${e}</span>
  </div>`,pairSwatch=(e,t,n)=>`
  <div style="display:flex;flex-direction:column;gap:4px">
    <div style="height:48px;border-radius:var(--r-sm);border:var(--bd);background:var(--${e});color:var(--${t});display:flex;align-items:center;padding:0 var(--s3);font:var(--ty-label-md)">${n}</div>
    <span style="font:var(--ty-body-xs);color:var(--tx-secondary)">${e} / ${t}</span>
  </div>`,grid=(e,t=5)=>`<div style="display:grid;grid-template-columns:repeat(${t},1fr);gap:var(--s2)">${e}</div>`,section=(e,t)=>`
  <section style="margin-bottom:var(--s8)">
    <h3 style="font:var(--ty-title-sm);color:var(--tx-primary);margin:0 0 var(--s3)">${e}</h3>
    ${t}
  </section>`,ramp=(e,t,n=[],r=[])=>{let i=[...[...r,50,100,200,300,400,500,600,700,800,900].map(t=>swatch(`${e}-${t}`)),...n.map(t=>swatch(`${e}-${t}`))].join(``);return section(t,grid(i,10))},i=[`ink`,`band`,`fill`],a={render:()=>({template:`
      <div style="padding:var(--s8);background:var(--bg-page)">
        ${ramp(`co`,`Corporate (--co)`,i)}
        ${ramp(`ki`,`Angewandte KI (--ki)`,i)}
        ${ramp(`es`,`Effektive Software (--es)`,i)}
        ${ramp(`wo`,`Wirksame Organisationen (--wo)`,i)}
        ${ramp(`ro`,`Rosé (--ro)`)}
        ${ramp(`n`,`Neutrals (--n)`,[],[0])}
      </div>
    `})},o={render:()=>({template:`
      <div style="padding:var(--s8);background:var(--bg-page)">
        ${section(`Status (Text und Tint)`,grid([pairSwatch(`c-success-bg`,`c-success`,`Success`),pairSwatch(`c-warning-bg`,`c-warning`,`Warning`),pairSwatch(`c-error-bg`,`c-error`,`Error`)].join(``),3))}
        ${section(`Status kräftig (Snackbar: Fläche, Text, Icon)`,grid([pairSwatch(`c-success-strong`,`c-success-on-strong`,`Text`),pairSwatch(`c-success-strong`,`c-success-strong-icon`,`Icon`),pairSwatch(`c-error-strong`,`c-error-on-strong`,`Text`),pairSwatch(`c-error-strong`,`c-error-strong-icon`,`Icon`)].join(``),4))}
        ${section(`Status-Badge`,grid([pairSwatch(`c-success-bg`,`badge-ok-text`,`Live`),pairSwatch(`c-warning-bg`,`badge-warn-text`,`Beta`),pairSwatch(`c-error-bg`,`badge-err-text`,`Deprecated`),pairSwatch(`badge-neu-bg`,`badge-neu-text`,`Draft`)].join(``),4))}
        ${section(`Kontrast-Badge`,grid([pairSwatch(`cbadge-aa-bg`,`cbadge-aa-text`,`AA`),pairSwatch(`cbadge-aaa-bg`,`cbadge-aaa-text`,`AAA`),pairSwatch(`cbadge-fail-bg`,`cbadge-fail-text`,`Fail`)].join(``),3))}
      </div>
    `})},s={name:`Flächen, Text und Rand`,render:()=>({template:`
      <div style="padding:var(--s8);background:var(--bg-page)">
        ${section(`Fläche`,grid([`bg-page`,`bg-surface`,`bg-surface-hover`,`bg-overlay`,`bg-plate`,`bg-code`,`bg-scrim`].map(e=>swatch(e)).join(``),7))}
        ${section(`Text`,grid([`tx-primary`,`tx-brand`,`tx-secondary`,`tx-muted`].map(e=>textSwatch(e)).join(``),4))}
        ${section(`Rand`,grid([`bd-c`,`bd-strong-c`].map(e=>swatch(e)).join(``),2))}
      </div>
    `})},c=[`Paletten`,`Semantisch`,`FlaechenTextRand`],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <div style="padding:var(--s8);background:var(--bg-page)">
        \${ramp('co', 'Corporate (--co)', areaExtras)}
        \${ramp('ki', 'Angewandte KI (--ki)', areaExtras)}
        \${ramp('es', 'Effektive Software (--es)', areaExtras)}
        \${ramp('wo', 'Wirksame Organisationen (--wo)', areaExtras)}
        \${ramp('ro', 'Rosé (--ro)')}
        \${ramp('n', 'Neutrals (--n)', [], [0])}
      </div>
    \`
  })
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <div style="padding:var(--s8);background:var(--bg-page)">
        \${section('Status (Text und Tint)', grid([pairSwatch('c-success-bg', 'c-success', 'Success'), pairSwatch('c-warning-bg', 'c-warning', 'Warning'), pairSwatch('c-error-bg', 'c-error', 'Error')].join(''), 3))}
        \${section('Status kräftig (Snackbar: Fläche, Text, Icon)', grid([pairSwatch('c-success-strong', 'c-success-on-strong', 'Text'), pairSwatch('c-success-strong', 'c-success-strong-icon', 'Icon'), pairSwatch('c-error-strong', 'c-error-on-strong', 'Text'), pairSwatch('c-error-strong', 'c-error-strong-icon', 'Icon')].join(''), 4))}
        \${section('Status-Badge', grid([pairSwatch('c-success-bg', 'badge-ok-text', 'Live'), pairSwatch('c-warning-bg', 'badge-warn-text', 'Beta'), pairSwatch('c-error-bg', 'badge-err-text', 'Deprecated'), pairSwatch('badge-neu-bg', 'badge-neu-text', 'Draft')].join(''), 4))}
        \${section('Kontrast-Badge', grid([pairSwatch('cbadge-aa-bg', 'cbadge-aa-text', 'AA'), pairSwatch('cbadge-aaa-bg', 'cbadge-aaa-text', 'AAA'), pairSwatch('cbadge-fail-bg', 'cbadge-fail-text', 'Fail')].join(''), 3))}
      </div>
    \`
  })
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Flächen, Text und Rand',
  render: () => ({
    template: \`
      <div style="padding:var(--s8);background:var(--bg-page)">
        \${section('Fläche', grid(['bg-page', 'bg-surface', 'bg-surface-hover', 'bg-overlay', 'bg-plate', 'bg-code', 'bg-scrim'].map(t => swatch(t)).join(''), 7))}
        \${section('Text', grid(['tx-primary', 'tx-brand', 'tx-secondary', 'tx-muted'].map(t => textSwatch(t)).join(''), 4))}
        \${section('Rand', grid(['bd-c', 'bd-strong-c'].map(t => swatch(t)).join(''), 2))}
      </div>
    \`
  })
}`,...s.parameters?.docs?.source},description:{story:`Flächen-, Text- und Randtokens, die jedes Bauteil über Hell und Dunkel hinweg trägt.`,...s.parameters?.docs?.description}}}})))()}export{init_colors_stories as n,n as t};