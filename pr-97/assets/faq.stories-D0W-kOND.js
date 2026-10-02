import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,V as r,fn as i,k as a,q as o,sn as s}from"./angular-platform-CAY__VLP.js";var c;function init_faq_component(){return(init_faq_component=e((()=>{i(),a(),c=class FaqComponent{items=t.required();static propDecorators={items:[{type:o,args:[{isSignal:!0,alias:`items`,required:!0,transform:void 0}]}]}},c=s([n({selector:`cds-faq`,changeDetection:r.OnPush,template:`
    <div class="ep-faq">
      @for (item of items(); track item) {
        <!-- Kein [open]-Binding: „standardmäßig zugeklappt“ ist der Default. Ein
             gebundenes [open]="false" würde den nativen Toggle bei jedem Change-
             Detection-Lauf wieder zuklappen. -->
        <details>
          <summary>
            {{ item.q }}
            <svg
              class="ep-faq-caret"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </summary>
          <p class="ep-faq-a">{{ item.a }}</p>
        </details>
      }
    </div>
  `})],c)})))()}var l,u,d,f,p,m,h,g;function init_faq_stories(){return(init_faq_stories=e((()=>{init_faq_component(),{within:l,userEvent:u,expect:d}=__STORYBOOK_MODULE_TEST__,f={title:`Seitenmuster/Wissensbeitrag/FAQ`,component:c,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4936`},layout:`padded`,docs:{description:{component:`Akkordeon aus aufklappbaren Fragen und Antworten für FAQ-Sektionen auf Content- und Marketingseiten. Standardmäßig zugeklappt, öffnet sich jede Frage per Klick oder Tastatur. Liest sich am besten im zweispaltigen Layout mit Überschrift links und Fragenliste rechts.`}}},args:{items:[{q:`Wie läuft die Bewerbung ab?`,a:`Über das Formular bei der jeweiligen Stelle oder initiativ. Du bekommst zeitnah eine Rückmeldung, danach folgt ein Kennenlern-Gespräch.`},{q:`Wo und wie arbeitet ihr?`,a:`Unser Büro ist der Workgarden in Dortmund. Du kannst flexibel remote arbeiten, gemeinsame Präsenztage halten das Team zusammen.`},{q:`Welche Technologien nutzt ihr?`,a:`Moderne, langlebige Stacks: die Wahl richtet sich nach dem Problem, nicht nach dem Hype.`}]}},p={play:async({canvasElement:e})=>{let t=l(e).getByText(`Wie läuft die Bewerbung ab?`),n=t.closest(`details`);await d(n).not.toHaveAttribute(`open`),await u.click(t),await d(n).toHaveAttribute(`open`)}},m={name:`Doppelte Fragen`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},args:{items:[{q:`Wie läuft die Bewerbung ab?`,a:`Über das Formular bei der jeweiligen Stelle.`},{q:`Wie läuft die Bewerbung ab?`,a:`Initiativ per E-Mail.`}]},play:async({canvasElement:e})=>{await d(e.querySelectorAll(`details`)).toHaveLength(2)}},h={name:`Zustand folgt dem Eintrag`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},render:e=>({props:{items:e.items,prepend(){this.items=[{q:`Gibt es Probetage?`,a:`Ja, nach Absprache.`},...this.items]}},template:`
      <button type="button" (click)="prepend()">Frage voranstellen</button>
      <cds-faq [items]="items"></cds-faq>
    `}),play:async({canvasElement:e})=>{let t=l(e);await u.click(t.getByText(`Wie läuft die Bewerbung ab?`)),await u.click(t.getByRole(`button`,{name:`Frage voranstellen`})),await d(t.getByText(`Gibt es Probetage?`).closest(`details`)).not.toHaveAttribute(`open`),await d(t.getByText(`Wie läuft die Bewerbung ab?`).closest(`details`)).toHaveAttribute(`open`)}},g=[`Interaktiv`,`DoppelteFragen`,`ZustandFolgtEintrag`],p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}}})))()}init_faq_stories();export{m as DoppelteFragen,p as Interaktiv,h as ZustandFolgtEintrag,g as __namedExportsOrder,f as default};