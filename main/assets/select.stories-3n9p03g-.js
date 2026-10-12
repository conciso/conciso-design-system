import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,I as r,Nt as i,V as a,fn as o,k as s,q as c,sn as l}from"./angular-platform-CAY__VLP.js";import{a as u,i as d,n as f,o as p,r as m}from"./theme-mode-Bj97f4cM.js";import{n as h,t as g}from"./select.component-Dh6yvHD8.js";var _;function init_select_component(){return(init_select_component=e((()=>{o(),s(),h(),u(),_=class ThemeSelectComponent{showSystem=t(!0);svc=i(m);options=r(()=>d(this.showSystem()).map(e=>({value:e,label:f[e]})));onChange(e){e&&this.svc.set(e)}static propDecorators={showSystem:[{type:c,args:[{isSignal:!0,alias:`showSystem`,required:!1,transform:void 0}]}]}},_=l([n({selector:`cds-theme-select`,changeDetection:a.OnPush,imports:[g],template:`
    <cds-select
      label="Farbthema"
      [options]="options()"
      [value]="svc.mode()"
      (valueChange)="onChange($event)"
    />
  `})],_)})))()}var v,y,b,x,S,C,w,T,E;function init_select_stories(){return(init_select_stories=e((()=>{u(),init_select_component(),{within:v,userEvent:y,expect:b,waitFor:x}=__STORYBOOK_MODULE_TEST__,S={title:`Komponenten/Theme-Umschalter/Dropdown`,component:_,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-1275`},layout:`padded`,docs:{description:{component:"Theme-Umschalter auf Basis unseres Custom Select (gestylte Listbox mit Häkchen). Vorgesehener Einsatz: nur in den Einstellungen (Settings), NICHT als persistentes Element auf allen Seiten. `showSystem` schaltet zwischen Hell/Dunkel/System und binär."}}},argTypes:{showSystem:{control:`boolean`}},args:{showSystem:!0}},C={},w={name:`Binär (nur Hell/Dunkel)`,args:{showSystem:!1}},T={name:`Option wählen`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=v(e),n=p.mode();try{p.set(`light`),await y.click(t.getByRole(`button`)),await y.click(t.getByRole(`option`,{name:`Dunkel`})),await x(()=>b(p.mode()).toBe(`dark`)),await b(t.getByRole(`button`)).toHaveTextContent(`Dunkel`)}finally{p.set(n)}}},E=[`Interaktiv`,`Binaer`,`OptionWaehlen`],C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'Binär (nur Hell/Dunkel)',
  args: {
    showSystem: false
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Option wählen',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Option „Dunkel“ wählen ändert den Modus im themeStore. Modul-Singleton — den
  // Ausgangswert am Ende zwingend zurücksetzen, sonst färbt der Modus in
  // nachfolgende Stories ab.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const original = themeStore.mode();
    try {
      themeStore.set('light');
      await userEvent.click(c.getByRole('button'));
      await userEvent.click(c.getByRole('option', {
        name: 'Dunkel'
      }));
      await waitFor(() => expect(themeStore.mode()).toBe('dark'));
      await expect(c.getByRole('button')).toHaveTextContent('Dunkel');
    } finally {
      themeStore.set(original);
    }
  }
}`,...T.parameters?.docs?.source}}}})))()}init_select_stories();export{w as Binaer,C as Interaktiv,T as OptionWaehlen,E as __namedExportsOrder,S as default};