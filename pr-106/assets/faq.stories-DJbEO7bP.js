import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,bn as o,z as s}from"./angular-platform-BGeCprOl.js";import{n as c}from"./lucide-angular-CTBwqO1y.js";import{n as l}from"./cds-icons-DtWH1HnJ.js";var u;function init_faq_component(){return(init_faq_component=e((()=>{a(),n(),l(),u=class FaqComponent{items=i.required();static propDecorators={items:[{type:r,args:[{isSignal:!0,alias:`items`,required:!0,transform:void 0}]}]}},u=o([t({selector:`cds-faq`,changeDetection:s.OnPush,imports:[c],template:`
    <div class="ep-faq">
      @for (item of items(); track item) {
        <!-- Kein [open]-Binding: „standardmäßig zugeklappt“ ist der Default. Ein
             gebundenes [open]="false" würde den nativen Toggle bei jedem Change-
             Detection-Lauf wieder zuklappen. -->
        <details>
          <summary>
            {{ item.q }}
            <svg lucideChevronDown class="ep-faq-caret" size="24" [strokeWidth]="1.25"></svg>
          </summary>
          <p class="ep-faq-a">{{ item.a }}</p>
        </details>
      }
    </div>
  `})],u)})))()}var d,f,p,m,h,g,_,v;function init_faq_stories(){return(init_faq_stories=e((()=>{init_faq_component(),{within:d,userEvent:f,expect:p}=__STORYBOOK_MODULE_TEST__,m={title:`Seitenmuster/Wissensbeitrag/FAQ`,component:u,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4936`},layout:`padded`,docs:{description:{component:`Akkordeon aus aufklappbaren Fragen und Antworten für FAQ-Sektionen auf Content- und Marketingseiten. Standardmäßig zugeklappt, öffnet sich jede Frage per Klick oder Tastatur. Liest sich am besten im zweispaltigen Layout mit Überschrift links und Fragenliste rechts.`}}},args:{items:[{q:`Wie läuft die Bewerbung ab?`,a:`Über das Formular bei der jeweiligen Stelle oder initiativ. Du bekommst zeitnah eine Rückmeldung, danach folgt ein Kennenlern-Gespräch.`},{q:`Wo und wie arbeitet ihr?`,a:`Unser Büro ist der Workgarden in Dortmund. Du kannst flexibel remote arbeiten, gemeinsame Präsenztage halten das Team zusammen.`},{q:`Welche Technologien nutzt ihr?`,a:`Moderne, langlebige Stacks: die Wahl richtet sich nach dem Problem, nicht nach dem Hype.`}]}},h={play:async({canvasElement:e})=>{let t=d(e).getByText(`Wie läuft die Bewerbung ab?`),n=t.closest(`details`);await p(n).not.toHaveAttribute(`open`),await f.click(t),await p(n).toHaveAttribute(`open`)}},g={name:`Doppelte Fragen`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},args:{items:[{q:`Wie läuft die Bewerbung ab?`,a:`Über das Formular bei der jeweiligen Stelle.`},{q:`Wie läuft die Bewerbung ab?`,a:`Initiativ per E-Mail.`}]},play:async({canvasElement:e})=>{await p(e.querySelectorAll(`details`)).toHaveLength(2)}},_={name:`Zustand folgt dem Eintrag`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},render:e=>({props:{items:e.items,prepend(){this.items=[{q:`Gibt es Probetage?`,a:`Ja, nach Absprache.`},...this.items]}},template:`
      <button type="button" (click)="prepend()">Frage voranstellen</button>
      <cds-faq [items]="items"></cds-faq>
    `}),play:async({canvasElement:e})=>{let t=d(e);await f.click(t.getByText(`Wie läuft die Bewerbung ab?`)),await f.click(t.getByRole(`button`,{name:`Frage voranstellen`})),await p(t.getByText(`Gibt es Probetage?`).closest(`details`)).not.toHaveAttribute(`open`),await p(t.getByText(`Wie läuft die Bewerbung ab?`).closest(`details`)).toHaveAttribute(`open`)}},v=[`Interaktiv`,`DoppelteFragen`,`ZustandFolgtEintrag`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  // Natives details/summary: Klick auf die Frage klappt die Antwort auf.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const summary = c.getByText('Wie läuft die Bewerbung ab?');
    const details = summary.closest('details');
    await expect(details).not.toHaveAttribute('open');
    await userEvent.click(summary);
    await expect(details).toHaveAttribute('open');
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Doppelte Fragen',
  // Regressionstest: gleich lautende Fragen sind zulässig und dürfen das Rendern
  // nicht abbrechen (NG0955 bei Tracking per Fragetext).
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  args: {
    items: [{
      q: 'Wie läuft die Bewerbung ab?',
      a: 'Über das Formular bei der jeweiligen Stelle.'
    }, {
      q: 'Wie läuft die Bewerbung ab?',
      a: 'Initiativ per E-Mail.'
    }]
  },
  play: async ({
    canvasElement
  }) => {
    await expect(canvasElement.querySelectorAll('details')).toHaveLength(2);
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Zustand folgt dem Eintrag',
  // Das native <details> hält seinen open-Zustand selbst. Beim Voranstellen eines
  // Eintrags muss die geöffnete Frage offen bleiben und die neue zugeklappt
  // erscheinen, statt dass der Zustand an der Position hängen bleibt.
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  render: args => ({
    props: {
      items: args.items,
      prepend(this: {
        items: typeof args.items;
      }) {
        this.items = [{
          q: 'Gibt es Probetage?',
          a: 'Ja, nach Absprache.'
        }, ...this.items];
      }
    },
    template: \`
      <button type="button" (click)="prepend()">Frage voranstellen</button>
      <cds-faq [items]="items"></cds-faq>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByText('Wie läuft die Bewerbung ab?'));
    await userEvent.click(c.getByRole('button', {
      name: 'Frage voranstellen'
    }));
    await expect(c.getByText('Gibt es Probetage?').closest('details')).not.toHaveAttribute('open');
    await expect(c.getByText('Wie läuft die Bewerbung ab?').closest('details')).toHaveAttribute('open');
  }
}`,..._.parameters?.docs?.source}}}})))()}init_faq_stories();export{g as DoppelteFragen,h as Interaktiv,_ as ZustandFolgtEintrag,v as __namedExportsOrder,m as default};