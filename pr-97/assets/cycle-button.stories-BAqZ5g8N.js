import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{n,t as r}from"./cycle-button.component-DCslOX6m.js";import{o as i,s as a}from"./iframe-QDqT5_zd.js";var o=t({Binaer:()=>f,Interaktiv:()=>d,KlickZyklus:()=>p,KlickZyklusBinaer:()=>m,__namedExportsOrder:()=>h,default:()=>u}),s,c,l,u,d,f,p,m,h;function init_cycle_button_stories(){return(init_cycle_button_stories=e((()=>{i(),n(),{within:s,userEvent:c,expect:l}=__STORYBOOK_MODULE_TEST__,u={title:`Komponenten/Theme-Umschalter/Cycle-Button`,component:r,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5234`},docs:{description:{component:"Theme-Umschalter als einzelner Icon-Button: ein Klick schaltet der Reihe nach durch die Modi, das Icon zeigt den aktuellen. Vorgesehener Einsatz: im Header (kompakt, ein Tap). `showSystem` schaltet zwischen Hell/Dunkel/System und binär Hell/Dunkel."}}},argTypes:{showSystem:{control:`boolean`}},args:{showSystem:!0}},d={},f={name:`Binär (nur Hell/Dunkel)`,args:{showSystem:!1}},p={name:`Klick-Zyklus`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=s(e).getByRole(`button`),n=a.mode();try{a.set(`light`),await l(t).toHaveAttribute(`aria-label`,`Farbthema: Hell, klicken zum Wechseln`),await c.click(t),await l(t).toHaveAttribute(`aria-label`,`Farbthema: Dunkel, klicken zum Wechseln`),await c.click(t),await l(t).toHaveAttribute(`aria-label`,`Farbthema: System, klicken zum Wechseln`),await c.click(t),await l(t).toHaveAttribute(`aria-label`,`Farbthema: Hell, klicken zum Wechseln`)}finally{a.set(n)}}},m={name:`Klick-Zyklus · binär`,args:{showSystem:!1},parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=s(e).getByRole(`button`),n=a.mode();try{a.set(`light`),await l(t).toHaveAttribute(`aria-label`,`Farbthema: Hell, klicken zum Wechseln`),await c.click(t),await l(t).toHaveAttribute(`aria-label`,`Farbthema: Dunkel, klicken zum Wechseln`),await c.click(t),await l(t).toHaveAttribute(`aria-label`,`Farbthema: Hell, klicken zum Wechseln`)}finally{a.set(n)}}},h=[`Interaktiv`,`Binaer`,`KlickZyklus`,`KlickZyklusBinaer`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Binär (nur Hell/Dunkel)',
  args: {
    showSystem: false
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Klick-Zyklus',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Klicks durchlaufen Hell → Dunkel → System (und zurück), das aria-label wandert mit.
  // themeStore ist ein Modul-Singleton (geteilt mit der Storybook-Toolbar und den
  // anderen Theme-Switchern) — den Ausgangswert am Ende zwingend zurücksetzen,
  // sonst färbt der Modus in nachfolgende Stories ab.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const button = c.getByRole('button');
    const original = themeStore.mode();
    try {
      themeStore.set('light');
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Hell, klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Dunkel, klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: System, klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Hell, klicken zum Wechseln');
    } finally {
      themeStore.set(original);
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Klick-Zyklus · binär',
  args: {
    showSystem: false
  },
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Mit showSystem=false wechselt nur Hell ↔ Dunkel, „System“ wird übersprungen.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const button = c.getByRole('button');
    const original = themeStore.mode();
    try {
      themeStore.set('light');
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Hell, klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Dunkel, klicken zum Wechseln');
      await userEvent.click(button);
      await expect(button).toHaveAttribute('aria-label', 'Farbthema: Hell, klicken zum Wechseln');
    } finally {
      themeStore.set(original);
    }
  }
}`,...m.parameters?.docs?.source}}}})))()}export{init_cycle_button_stories as n,o as t};