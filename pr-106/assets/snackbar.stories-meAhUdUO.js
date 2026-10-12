import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{B as n,D as r,G as i,O as a,P as o,Tn as s,bn as c,j as l,q as u,z as d}from"./angular-platform-BGeCprOl.js";var f;function init_snackbar_component(){return(init_snackbar_component=e((()=>{s(),r(),f=class SnackbarComponent{message=a.required();tone=a(`def`);actionLabel=a(``);action=l();classes=o(()=>`snack snack-${this.tone()}`);isError=o(()=>this.tone()===`err`);iconStroke=o(()=>({def:`var(--co-200)`,ok:`var(--c-success-strong-icon)`,err:`var(--c-error-strong-icon)`})[this.tone()]);iconPath=o(()=>({def:`M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18`,ok:`M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z`,err:`M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z`})[this.tone()]);static propDecorators={message:[{type:i,args:[{isSignal:!0,alias:`message`,required:!0,transform:void 0}]}],tone:[{type:i,args:[{isSignal:!0,alias:`tone`,required:!1,transform:void 0}]}],actionLabel:[{type:i,args:[{isSignal:!0,alias:`actionLabel`,required:!1,transform:void 0}]}],action:[{type:u,args:[`action`]}]}},f=c([n({selector:`cds-snackbar`,changeDetection:d.OnPush,template:`
    <div
      [class]="classes()"
      [attr.role]="isError() ? 'alert' : 'status'"
      [attr.aria-live]="isError() ? 'assertive' : 'polite'"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        [style.stroke]="iconStroke()"
        stroke-width="1.25"
        aria-hidden="true"
        focusable="false"
        style="flex-shrink: 0"
      >
        <path stroke-linecap="round" stroke-linejoin="round" [attr.d]="iconPath()" />
      </svg>
      {{ message() }}
      @if (actionLabel()) {
        <button class="snack-act" type="button" (click)="action.emit()">{{ actionLabel() }}</button>
      }
    </div>
  `})],f)})))()}var p=t({AktionsButton:()=>b,Interaktiv:()=>y,Toene:()=>x,__namedExportsOrder:()=>S,default:()=>v}),m,h,g,_,v,y,b,x,S;function init_snackbar_stories(){return(init_snackbar_stories=e((()=>{init_snackbar_component(),{within:m,userEvent:h,expect:g,fn:_}=__STORYBOOK_MODULE_TEST__,v={title:`Komponenten/Feedback/Snackbar`,component:f,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5222`},docs:{description:{component:`Kurze Statusmeldung als Feedback auf Nutzeraktionen, etwa nach dem Absenden eines Kontaktformulars, der Newsletter-Anmeldung oder bei Validierungsfehlern. Drei Varianten: Default, Erfolg (OK) und Fehler, jeweils mit optionaler Aktion.`}}},argTypes:{tone:{control:`inline-radio`,options:[`def`,`ok`,`err`]}},args:{message:`Formular gespeichert, noch nicht abgesendet.`,tone:`def`,actionLabel:`Jetzt senden`}},y={},b={name:`Aktions-Button`,parameters:{controls:{disable:!0}},args:{actionLabel:`Jetzt senden`,action:_()},play:async({canvasElement:e,args:t})=>{let n=m(e);await h.click(n.getByRole(`button`,{name:`Jetzt senden`})),await g(t.action).toHaveBeenCalledTimes(1)}},x={name:`Töne`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[f]},template:`
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <cds-snackbar tone="def" message="Formular gespeichert, noch nicht abgesendet." actionLabel="Jetzt senden"></cds-snackbar>
        <cds-snackbar tone="ok" message="Änderungen erfolgreich gespeichert." actionLabel="Rückgängig"></cds-snackbar>
        <cds-snackbar tone="err" message="Speichern fehlgeschlagen." actionLabel="Erneut versuchen"></cds-snackbar>
      </div>
    `})},S=[`Interaktiv`,`AktionsButton`,`Toene`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Aktions-Button',
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    actionLabel: 'Jetzt senden',
    action: fn()
  },
  // Klick auf die Aktion feuert action.
  play: async ({
    canvasElement,
    args
  }) => {
    const c = within(canvasElement);
    await userEvent.click(c.getByRole('button', {
      name: 'Jetzt senden'
    }));
    await expect(args.action).toHaveBeenCalledTimes(1);
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Töne',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [SnackbarComponent]
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:12px;align-items:flex-start">
        <cds-snackbar tone="def" message="Formular gespeichert, noch nicht abgesendet." actionLabel="Jetzt senden"></cds-snackbar>
        <cds-snackbar tone="ok" message="Änderungen erfolgreich gespeichert." actionLabel="Rückgängig"></cds-snackbar>
        <cds-snackbar tone="err" message="Speichern fehlgeschlagen." actionLabel="Erneut versuchen"></cds-snackbar>
      </div>
    \`
  })
}`,...x.parameters?.docs?.source}}}})))()}export{p as n,init_snackbar_stories as t};