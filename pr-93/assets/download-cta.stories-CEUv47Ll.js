import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,I as r,N as i,V as a,Y as o,fn as s,k as c,q as l,sn as u}from"./angular-platform-CAY__VLP.js";var d;function init_download_cta_component(){return(init_download_cta_component=e((()=>{s(),c(),d=class DownloadCtaComponent{area=t(`co`);eyebrow=t(``);title=t.required();desc=t(``);meta=t(``);primaryLabel=t.required();secondaryLabel=t(``);primaryClick=i();secondaryClick=i();primaryAriaLabel=r(()=>`${this.primaryLabel()}: ${this.title()}${this.meta()?` (${this.meta()})`:``}`);secondaryAriaLabel=r(()=>`${this.secondaryLabel()}: ${this.title()}${this.meta()?` (${this.meta()})`:``}`);static propDecorators={area:[{type:l,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],eyebrow:[{type:l,args:[{isSignal:!0,alias:`eyebrow`,required:!1,transform:void 0}]}],title:[{type:l,args:[{isSignal:!0,alias:`title`,required:!0,transform:void 0}]}],desc:[{type:l,args:[{isSignal:!0,alias:`desc`,required:!1,transform:void 0}]}],meta:[{type:l,args:[{isSignal:!0,alias:`meta`,required:!1,transform:void 0}]}],primaryLabel:[{type:l,args:[{isSignal:!0,alias:`primaryLabel`,required:!0,transform:void 0}]}],secondaryLabel:[{type:l,args:[{isSignal:!0,alias:`secondaryLabel`,required:!1,transform:void 0}]}],primaryClick:[{type:o,args:[`primaryClick`]}],secondaryClick:[{type:o,args:[`secondaryClick`]}]}},d=u([n({selector:`cds-download-cta`,changeDetection:a.OnPush,host:{"[attr.title]":`null`},template:`
    <div class="cta-dl" [attr.data-area]="area() || null">
      <div class="cta-dl-icon">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
      </div>
      <div class="cta-dl-body">
        @if (eyebrow()) {
          <p class="cta-dl-eyebrow">{{ eyebrow() }}</p>
        }
        <h3 class="cta-dl-title">{{ title() }}</h3>
        <p class="cta-dl-desc">{{ desc() }}</p>
        @if (meta()) {
          <div class="cta-dl-meta">
            <span class="cta-strip-meta">{{ meta() }}</span>
          </div>
        }
      </div>
      <div class="cta-dl-actions">
        <!-- Klassen direkt komponiert statt cds-button: .cta-dl-actions steht auf
             flex-direction:column + align-items:stretch (css/components.css:1421) und
             streckt seine Kinder; ein cds-button-Custom-Element streckt sich darüber
             nicht mit. Die einzige Eingabe, die es zum Füllen der Spalte brächte, full,
             zentriert über .btn-full (css/components.css:53) zugleich das Label und
             würde den bisher linksbündigen Look ändern. -->
        <button
          [class]="'btn btn-filled btn-' + area()"
          type="button"
          [attr.aria-label]="primaryAriaLabel()"
          (click)="primaryClick.emit($event)"
        >
          {{ primaryLabel() }}
        </button>
        @if (secondaryLabel()) {
          <button
            [class]="'btn btn-text btn-' + area()"
            type="button"
            [attr.aria-label]="secondaryAriaLabel()"
            (click)="secondaryClick.emit($event)"
          >
            {{ secondaryLabel() }}
          </button>
        }
      </div>
    </div>
  `})],d)})))()}var f,p,m,h,g,_,v,y;function init_download_cta_stories(){return(init_download_cta_stories=e((()=>{init_download_cta_component(),{within:f,userEvent:p,expect:m,fn:h}=__STORYBOOK_MODULE_TEST__,g={title:`Komponenten/Call to Action/DownloadCta`,component:d,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3968`},layout:`padded`,docs:{description:{component:`Call-to-Action-Block für Ressourcen-Downloads mit Icon, Eyebrow, Titel, Beschreibung und bis zu zwei Aktionen (Hero · Mit Vorschaubild · Kompakt · Minimal). Farblich an jede Brand Area angepasst.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]}},args:{area:`co`,eyebrow:`Conciso Design System`,title:`Figma-Bibliothek herunterladen`,desc:`Alle Komponenten, Tokens, Icons und Brand Assets, direkt einsatzbereit als Figma-Bibliothek.`,meta:`Figma · Version 1.0 · 48 MB`,primaryLabel:`Herunterladen`,secondaryLabel:`Vorschau ansehen`,primaryClick:h(),secondaryClick:h()}},_={play:async({canvasElement:e,args:t})=>{let n=f(e),r=n.getByRole(`button`,{name:/^Herunterladen:/});await m(r).toHaveAccessibleName(`${t.primaryLabel}: ${t.title} (${t.meta})`),await p.click(r),await m(t.primaryClick).toHaveBeenCalledTimes(1);let i=n.getByRole(`button`,{name:/^Vorschau ansehen:/});await m(i).toHaveAccessibleName(`${t.secondaryLabel}: ${t.title} (${t.meta})`),await p.click(i),await m(t.secondaryClick).toHaveBeenCalledTimes(1)}},v={name:`Host-Attribut`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},render:()=>({template:`
      <cds-download-cta
        title="Figma-Bibliothek herunterladen"
        primaryLabel="Herunterladen"
      ></cds-download-cta>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`cds-download-cta`);await m(t).not.toHaveAttribute(`title`)}},y=[`Interaktiv`,`HostAttribut`],_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  // Beide Aktionen sind rohe <button>-Elemente mit (click)-gebundenem Output
  // (primaryClick/secondaryClick) — vorher ohne jede Bindung, ein Klick verpuffte.
  //
  // Der Accessible Name ist seit der a11y-Nachbesserung nicht mehr der reine Button-Text
  // (der bliebe generisch, „Herunterladen“ allein nennt kein Ziel), sondern
  // „<Label>: <Titel> (<Meta>)“ — genau wie beim Combobox-Remove-Button
  // (\`aria-label="'Entfernen: ' + opt.label"\`) matchen wir hier per Regex auf den
  // Label-Präfix statt auf den vollen, von den Args abhängigen String.
  play: async ({
    canvasElement,
    args
  }) => {
    const c = within(canvasElement);
    const primary = c.getByRole('button', {
      name: /^Herunterladen:/
    });
    await expect(primary).toHaveAccessibleName(\`\${args.primaryLabel}: \${args.title} (\${args.meta})\`);
    await userEvent.click(primary);
    await expect(args.primaryClick).toHaveBeenCalledTimes(1);
    const secondary = c.getByRole('button', {
      name: /^Vorschau ansehen:/
    });
    await expect(secondary).toHaveAccessibleName(\`\${args.secondaryLabel}: \${args.title} (\${args.meta})\`);
    await userEvent.click(secondary);
    await expect(args.secondaryClick).toHaveBeenCalledTimes(1);
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Host-Attribut',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  render: () => ({
    template: \`
      <cds-download-cta
        title="Figma-Bibliothek herunterladen"
        primaryLabel="Herunterladen"
      ></cds-download-cta>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector('cds-download-cta');
    await expect(host).not.toHaveAttribute('title');
  }
}`,...v.parameters?.docs?.source}}}})))()}init_download_cta_stories();export{v as HostAttribut,_ as Interaktiv,y as __namedExportsOrder,g as default};