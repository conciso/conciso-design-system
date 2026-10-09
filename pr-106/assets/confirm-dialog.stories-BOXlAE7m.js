import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,Ft as r,G as i,It as a,Kt as o,Lt as s,M as c,O as l,P as u,R as d,T as f,Tn as p,W as m,bn as h,d as g,j as _,nt as v,q as y,qt as b,y as x,z as S}from"./angular-platform-BGeCprOl.js";import{n as C,t as w}from"./button.component-bp_giSvI.js";var T,E;function init_confirm_dialog_component(){return(init_confirm_dialog_component=e((()=>{p(),g(),n(),T=0,E=class ConfirmDialogComponent{heading=l.required();message=l.required();confirmLabel=l.required();cancelLabel=l.required();destructive=l(!1);emphasis=l(`confirm`);area=l(`co`);closed=_();titleId=`cds-confirm-dialog-${++T}-title`;bodyId=`cds-confirm-dialog-${T}-body`;dialog=c.required(`dialog`);cancelBtn=c.required(`cancelBtn`);confirmBtn=c.required(`confirmBtn`);document=o(r);opener=null;downOnBackdrop=!1;confirmClasses=u(()=>{let e=this.destructive()?`err`:this.area();return`btn btn-${this.emphasis()===`confirm`?`filled`:`outlined`} btn-${e}`});cancelClasses=u(()=>`btn btn-${this.emphasis()===`cancel`?`filled`:`text`} btn-${this.area()}`);focusCancel=u(()=>this.destructive()||this.emphasis()===`cancel`);ngAfterViewInit(){this.opener=this.document.activeElement,this.dialog().nativeElement.showModal(),(this.focusCancel()?this.cancelBtn():this.confirmBtn()).nativeElement.focus()}onPointerDown(e){this.downOnBackdrop=e.target===this.dialog().nativeElement}onDialogClick(e){e.target===this.dialog().nativeElement&&this.downOnBackdrop&&this.finish(`cancel`),this.downOnBackdrop=!1}finish(e){let t=this.dialog().nativeElement;t.open&&t.close(e)}onClose(){this.opener instanceof HTMLElement&&this.opener.isConnected&&this.opener.focus(),this.closed.emit(this.dialog().nativeElement.returnValue===`confirm`)}static propDecorators={heading:[{type:i,args:[{isSignal:!0,alias:`heading`,required:!0,transform:void 0}]}],message:[{type:i,args:[{isSignal:!0,alias:`message`,required:!0,transform:void 0}]}],confirmLabel:[{type:i,args:[{isSignal:!0,alias:`confirmLabel`,required:!0,transform:void 0}]}],cancelLabel:[{type:i,args:[{isSignal:!0,alias:`cancelLabel`,required:!0,transform:void 0}]}],destructive:[{type:i,args:[{isSignal:!0,alias:`destructive`,required:!1,transform:void 0}]}],emphasis:[{type:i,args:[{isSignal:!0,alias:`emphasis`,required:!1,transform:void 0}]}],area:[{type:i,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],closed:[{type:y,args:[`closed`]}],dialog:[{type:x,args:[`dialog`,{isSignal:!0}]}],cancelBtn:[{type:x,args:[`cancelBtn`,{isSignal:!0}]}],confirmBtn:[{type:x,args:[`confirmBtn`,{isSignal:!0}]}]}},E=h([t({selector:`cds-confirm-dialog`,changeDetection:S.OnPush,template:`
    <!-- Der click-Handler ist der Hintergrund-Klick. Seine Tastatur-Entsprechung ist Escape,
         das das native <dialog> selbst als cancel/close behandelt; ein keydown-Handler hier
         wäre doppelt. -->
    <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events -->
    <dialog
      #dialog
      class="dialog"
      role="alertdialog"
      [attr.aria-labelledby]="titleId"
      [attr.aria-describedby]="bodyId"
      (pointerdown)="onPointerDown($event)"
      (click)="onDialogClick($event)"
      (close)="onClose()"
    >
      <div class="dialog-inner">
        <h2 class="dialog-title" [id]="titleId">{{ heading() }}</h2>
        <p class="dialog-body" [id]="bodyId">{{ message() }}</p>
        <!-- Die gefüllte Hauptaktion steht immer zuletzt (rechts, gestapelt unten), die
             DOM-Reihenfolge folgt deshalb der Gewichtung, nicht der Rolle. -->
        <div class="dialog-actions">
          @if (emphasis() === 'cancel') {
            <button
              #confirmBtn
              type="button"
              [class]="confirmClasses()"
              (click)="finish('confirm')"
            >
              {{ confirmLabel() }}
            </button>
            <button #cancelBtn type="button" [class]="cancelClasses()" (click)="finish('cancel')">
              {{ cancelLabel() }}
            </button>
          } @else {
            <button #cancelBtn type="button" [class]="cancelClasses()" (click)="finish('cancel')">
              {{ cancelLabel() }}
            </button>
            <button
              #confirmBtn
              type="button"
              [class]="confirmClasses()"
              (click)="finish('confirm')"
            >
              {{ confirmLabel() }}
            </button>
          }
        </div>
      </div>
    </dialog>
  `})],E)})))()}var D;function init_confirm_dialog_service(){return(init_confirm_dialog_service=e((()=>{p(),g(),n(),init_confirm_dialog_component(),D=class CdsConfirmDialog{appRef=o(d);injector=o(s);document=o(r);pending=null;finish=null;constructor(){o(a).onDestroy(()=>this.finish?.(!1))}open(e){return this.pending||=new Promise(t=>{let n=f(E,{environmentInjector:this.injector});n.setInput(`heading`,e.title),n.setInput(`message`,e.message),n.setInput(`confirmLabel`,e.confirmLabel),n.setInput(`cancelLabel`,e.cancelLabel),n.setInput(`destructive`,e.destructive??!1),n.setInput(`emphasis`,e.emphasis??`confirm`),n.setInput(`area`,e.area??`co`);let r=n.instance.closed.subscribe(e=>this.finish?.(e));this.finish=e=>{this.finish=null,this.pending=null,r.unsubscribe(),this.appRef.detachView(n.hostView),n.destroy(),n.location.nativeElement.remove(),t(e)},this.document.body.appendChild(n.location.nativeElement),this.appRef.attachView(n.hostView),n.changeDetectorRef.detectChanges()}),this.pending}static ctorParameters=()=>[]},D=h([m({providedIn:`root`})],D)})))()}async function openDialog(e,t){await A.click(M(e).getByRole(`button`,{name:t}));let n=await k.findByRole(`alertdialog`);return await j(()=>O(n.open).toBe(!0)),n}function buttonOrder(e){return M(e).getAllByRole(`button`).map(e=>e.textContent?.trim()??``)}async function expectResult(e,t){await j(()=>O(M(e).getByRole(`status`)).toHaveTextContent(t)),await j(()=>O(k.queryByRole(`alertdialog`)).toBeNull())}var O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W;function init_confirm_dialog_stories(){return(init_confirm_dialog_stories=e((()=>{p(),n(),C(),init_confirm_dialog_service(),{expect:O,screen:k,userEvent:A,waitFor:j,within:M}=__STORYBOOK_MODULE_TEST__,N=class ConfirmDialogDemoComponent{triggerLabel=l.required();title=l.required();message=l.required();confirmLabel=l.required();cancelLabel=l.required();destructive=l(!1);emphasis=l(`confirm`);area=l(`co`);openTwice=l(!1);resultText=b(``);dialog=o(D);async open(){this.resultText.set(``);let e={title:this.title(),message:this.message(),confirmLabel:this.confirmLabel(),cancelLabel:this.cancelLabel(),destructive:this.destructive(),emphasis:this.emphasis(),area:this.area()},t=this.dialog.open(e),n=this.openTwice()?this.dialog.open(e):t,r=await t,i=t===n?``:` (zweites Promise abweichend)`;this.resultText.set((r?`Ergebnis: bestätigt`:`Ergebnis: abgebrochen`)+i)}static propDecorators={triggerLabel:[{type:i,args:[{isSignal:!0,alias:`triggerLabel`,required:!0,transform:void 0}]}],title:[{type:i,args:[{isSignal:!0,alias:`title`,required:!0,transform:void 0}]}],message:[{type:i,args:[{isSignal:!0,alias:`message`,required:!0,transform:void 0}]}],confirmLabel:[{type:i,args:[{isSignal:!0,alias:`confirmLabel`,required:!0,transform:void 0}]}],cancelLabel:[{type:i,args:[{isSignal:!0,alias:`cancelLabel`,required:!0,transform:void 0}]}],destructive:[{type:i,args:[{isSignal:!0,alias:`destructive`,required:!1,transform:void 0}]}],emphasis:[{type:i,args:[{isSignal:!0,alias:`emphasis`,required:!1,transform:void 0}]}],area:[{type:i,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],openTwice:[{type:i,args:[{isSignal:!0,alias:`openTwice`,required:!1,transform:void 0}]}]}},N=h([t({selector:`cds-confirm-dialog-demo`,imports:[w],changeDetection:S.OnPush,template:`
    <div style="display:flex;align-items:center;gap:var(--s4);flex-wrap:wrap">
      <cds-button variant="outlined" [area]="area()" [label]="triggerLabel()" (clicked)="open()" />
      <output aria-live="polite" style="font:var(--ty-body-md);color:var(--tx-secondary)">{{
        resultText()
      }}</output>
    </div>
  `})],N),P=class ConfirmDialogDestroyDemoComponent{resultText=b(``);parentInjector=o(s);async openAndDestroy(){let e=v([D],this.parentInjector),t=e.get(D).open({title:`Änderungen verwerfen?`,message:`Deine Änderungen am Profil gehen verloren.`,confirmLabel:`Verwerfen`,cancelLabel:`Weiter bearbeiten`,destructive:!0,emphasis:`cancel`});e.destroy(),this.resultText.set(await t?`Ergebnis: bestätigt`:`Ergebnis: abgebrochen`)}},P=h([t({selector:`cds-confirm-dialog-destroy-demo`,imports:[w],changeDetection:S.OnPush,template:`
    <cds-button label="Dialog öffnen und Injector zerstören" (clicked)="openAndDestroy()" />
    <output aria-live="polite">{{ resultText() }}</output>
  `})],P),F={title:`Komponenten/Feedback/Bestätigungsdialog`,component:N,tags:[`autodocs`,`angular`],parameters:{layout:`padded`,docs:{description:{component:'Modale Rückfrage vor einer Aktion, die sich nicht rückgängig machen lässt. Aufruf über den Service `CdsConfirmDialog`: `open(options)` liefert ein `Promise<boolean>`, das ein Route-Guard direkt zurückgeben kann (`true` nur bei Bestätigen, sonst `false`). Die Controls hier bilden die Optionen ab. Aufgebaut auf dem nativen `<dialog>` (`role="alertdialog"`), Styles aus `.dialog` der CSS-Schicht.'}}},argTypes:{destructive:{control:`boolean`,description:`Aktion lässt sich nicht rückgängig machen`},emphasis:{control:{type:`inline-radio`,labels:{confirm:`Aktion`,cancel:`Sicherer Weg`}},options:[`confirm`,`cancel`],description:`Welcher Button gefüllt ist`},area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]},openTwice:{table:{disable:!0}},triggerLabel:{table:{disable:!0}}},args:{triggerLabel:`Profil verlassen`,title:`Änderungen verwerfen?`,message:`Deine Änderungen am Profil gehen verloren.`,confirmLabel:`Verwerfen`,cancelLabel:`Weiter bearbeiten`,destructive:!0,emphasis:`cancel`,area:`co`,openTwice:!1}},I={parameters:{snapshot:{skip:!0}}},L={name:`Unterbrechung (ungespeicherte Änderungen)`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=await openDialog(e,`Profil verlassen`),n=M(t);await O(t).toHaveAccessibleName(`Änderungen verwerfen?`),await O(t).toHaveAccessibleDescription(`Deine Änderungen am Profil gehen verloren.`);let r=n.getByRole(`button`,{name:`Weiter bearbeiten`}),i=n.getByRole(`button`,{name:`Verwerfen`});await O(r).toHaveFocus(),await O(r).toHaveClass(`btn-filled`),await O(i).toHaveClass(`btn-outlined`,`btn-err`),await O(buttonOrder(t)).toEqual([`Verwerfen`,`Weiter bearbeiten`]),await A.click(i),await expectResult(e,`Ergebnis: bestätigt`),await O(M(e).getByRole(`button`,{name:`Profil verlassen`})).toHaveFocus()}},R={name:`Selbst ausgelöst (Löschen)`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},args:{triggerLabel:`Profil löschen`,title:`Profil löschen?`,message:`Dein Profil und alle Einträge darin werden dauerhaft gelöscht.`,confirmLabel:`Profil löschen`,cancelLabel:`Abbrechen`,destructive:!0,emphasis:`confirm`},play:async({canvasElement:e})=>{let t=await openDialog(e,`Profil löschen`),n=M(t),r=n.getByRole(`button`,{name:`Abbrechen`});await O(r).toHaveFocus(),await O(r).toHaveClass(`btn-text`),await O(n.getByRole(`button`,{name:`Profil löschen`})).toHaveClass(`btn-filled`,`btn-err`),await O(buttonOrder(t)).toEqual([`Abbrechen`,`Profil löschen`]),t.close(),await expectResult(e,`Ergebnis: abgebrochen`)}},z={name:`Nicht destruktiv`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},args:{triggerLabel:`Anfrage senden`,title:`Anfrage absenden?`,message:`Wir melden uns innerhalb eines Werktags bei Dir.`,confirmLabel:`Anfrage absenden`,cancelLabel:`Abbrechen`,destructive:!1,emphasis:`confirm`,area:`ki`},play:async({canvasElement:e})=>{let t=await openDialog(e,`Anfrage senden`),n=M(t).getByRole(`button`,{name:`Anfrage absenden`});await O(n).toHaveFocus(),await O(n).toHaveClass(`btn-filled`,`btn-ki`),await A.click(t),await expectResult(e,`Ergebnis: abgebrochen`)}},B={name:`Textauswahl bis außerhalb`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},play:async({canvasElement:e})=>{let t=await openDialog(e,`Profil verlassen`),n=M(t).getByText(`Deine Änderungen am Profil gehen verloren.`);await A.pointer([{keys:`[MouseLeft>]`,target:n},{target:t},{keys:`[/MouseLeft]`,target:t}]),await O(t.open).toBe(!0),await A.click(M(t).getByRole(`button`,{name:`Weiter bearbeiten`})),await expectResult(e,`Ergebnis: abgebrochen`)}},V={name:`Doppelt geöffnet`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},args:{openTwice:!0},play:async({canvasElement:e})=>{await openDialog(e,`Profil verlassen`),await O(k.getAllByRole(`alertdialog`)).toHaveLength(1),await A.click(k.getByRole(`button`,{name:`Weiter bearbeiten`})),await expectResult(e,`Ergebnis: abgebrochen`),await O(M(e).getByRole(`status`)).not.toHaveTextContent(`abweichend`)}},H={name:`Aufräumen beim Zerstören`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[P]},template:`<cds-confirm-dialog-destroy-demo />`}),play:async({canvasElement:e})=>{await A.click(M(e).getByRole(`button`,{name:`Dialog öffnen und Injector zerstören`})),await j(()=>O(M(e).getByRole(`status`)).toHaveTextContent(`Ergebnis: abgebrochen`)),await O(document.querySelector(`cds-confirm-dialog`)).toBeNull()}},U={name:`Geöffnet`,parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{await openDialog(e,`Profil verlassen`)}},W=[`Interaktiv`,`Unterbrechung`,`SelbstAusgeloest`,`NichtDestruktiv`,`Textauswahl`,`DoppeltGeoeffnet`,`AufraeumenBeimZerstoeren`,`Geoeffnet`],I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  parameters: {
    snapshot: {
      skip: true
    }
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Unterbrechung (ungespeicherte Änderungen)',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  // Der Fall aus dem Route-Guard: der sichere Weg ist gefüllt und fokussiert, „Verwerfen“
  // ist Outlined mit .btn-err. Bestätigen liefert true, der Fokus kehrt zum Auslöser zurück.
  play: async ({
    canvasElement
  }) => {
    const dialog = await openDialog(canvasElement, 'Profil verlassen');
    const d = within(dialog);
    await expect(dialog).toHaveAccessibleName('Änderungen verwerfen?');
    await expect(dialog).toHaveAccessibleDescription('Deine Änderungen am Profil gehen verloren.');
    const weiter = d.getByRole('button', {
      name: 'Weiter bearbeiten'
    });
    const verwerfen = d.getByRole('button', {
      name: 'Verwerfen'
    });
    await expect(weiter).toHaveFocus();
    await expect(weiter).toHaveClass('btn-filled');
    await expect(verwerfen).toHaveClass('btn-outlined', 'btn-err');
    await expect(buttonOrder(dialog)).toEqual(['Verwerfen', 'Weiter bearbeiten']);
    await userEvent.click(verwerfen);
    await expectResult(canvasElement, 'Ergebnis: bestätigt');
    await expect(within(canvasElement).getByRole('button', {
      name: 'Profil verlassen'
    })).toHaveFocus();
  }
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Selbst ausgelöst (Löschen)',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  args: {
    triggerLabel: 'Profil löschen',
    title: 'Profil löschen?',
    message: 'Dein Profil und alle Einträge darin werden dauerhaft gelöscht.',
    confirmLabel: 'Profil löschen',
    cancelLabel: 'Abbrechen',
    destructive: true,
    emphasis: 'confirm'
  },
  // Die Löschung ist gefüllt und rot, der Fokus liegt trotzdem auf „Abbrechen“ (Text-Button).
  // Escape bricht ab.
  //
  // Escape selbst lässt sich hier nicht auslösen: userEvent.keyboard() bildet Tasten in
  // JavaScript nach, und synthetische Events stoßen das native cancel des <dialog> nicht an.
  // Dieselbe Grenze wie bei cds-slider und cds-scale (docs/adr/0005, Ergänzung 2026-09-17).
  // Nachgestellt wird deshalb, was der Browser auf Escape tut: close() ohne returnValue. Ein
  // echter Tastendruck über Playwright schließt den Dialog und liefert false.
  play: async ({
    canvasElement
  }) => {
    const dialog = await openDialog(canvasElement, 'Profil löschen');
    const d = within(dialog);
    const abbrechen = d.getByRole('button', {
      name: 'Abbrechen'
    });
    await expect(abbrechen).toHaveFocus();
    await expect(abbrechen).toHaveClass('btn-text');
    await expect(d.getByRole('button', {
      name: 'Profil löschen'
    })).toHaveClass('btn-filled', 'btn-err');
    await expect(buttonOrder(dialog)).toEqual(['Abbrechen', 'Profil löschen']);
    dialog.close();
    await expectResult(canvasElement, 'Ergebnis: abgebrochen');
  }
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Nicht destruktiv',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  args: {
    triggerLabel: 'Anfrage senden',
    title: 'Anfrage absenden?',
    message: 'Wir melden uns innerhalb eines Werktags bei Dir.',
    confirmLabel: 'Anfrage absenden',
    cancelLabel: 'Abbrechen',
    destructive: false,
    emphasis: 'confirm',
    area: 'ki'
  },
  // Ohne Risiko liegt der Fokus auf der Hauptaktion in Bereichsfarbe. Klick auf den
  // Hintergrund (Ziel ist das <dialog> selbst) bricht ab.
  play: async ({
    canvasElement
  }) => {
    const dialog = await openDialog(canvasElement, 'Anfrage senden');
    const absenden = within(dialog).getByRole('button', {
      name: 'Anfrage absenden'
    });
    await expect(absenden).toHaveFocus();
    await expect(absenden).toHaveClass('btn-filled', 'btn-ki');
    await userEvent.click(dialog);
    await expectResult(canvasElement, 'Ergebnis: abgebrochen');
  }
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Textauswahl bis außerhalb',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  // Maus im Text drücken und erst über dem Hintergrund loslassen: der click geht an den
  // gemeinsamen Vorfahren, also an das <dialog>. Er darf nicht schließen, weil der
  // pointerdown nicht auf dem Hintergrund begann.
  play: async ({
    canvasElement
  }) => {
    const dialog = await openDialog(canvasElement, 'Profil verlassen');
    const text = within(dialog).getByText('Deine Änderungen am Profil gehen verloren.');
    await userEvent.pointer([{
      keys: '[MouseLeft>]',
      target: text
    }, {
      target: dialog
    }, {
      keys: '[/MouseLeft]',
      target: dialog
    }]);
    await expect(dialog.open).toBe(true);
    await userEvent.click(within(dialog).getByRole('button', {
      name: 'Weiter bearbeiten'
    }));
    await expectResult(canvasElement, 'Ergebnis: abgebrochen');
  }
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Doppelt geöffnet',
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  args: {
    openTwice: true
  },
  // Ein doppelt ausgelöster Guard öffnet keinen zweiten Dialog und erhält dasselbe Promise.
  play: async ({
    canvasElement
  }) => {
    await openDialog(canvasElement, 'Profil verlassen');
    await expect(screen.getAllByRole('alertdialog')).toHaveLength(1);
    await userEvent.click(screen.getByRole('button', {
      name: 'Weiter bearbeiten'
    }));
    await expectResult(canvasElement, 'Ergebnis: abgebrochen');
    await expect(within(canvasElement).getByRole('status')).not.toHaveTextContent('abweichend');
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Aufräumen beim Zerstören',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [ConfirmDialogDestroyDemoComponent]
    },
    template: '<cds-confirm-dialog-destroy-demo />'
  }),
  play: async ({
    canvasElement
  }) => {
    await userEvent.click(within(canvasElement).getByRole('button', {
      name: 'Dialog öffnen und Injector zerstören'
    }));
    await waitFor(() => expect(within(canvasElement).getByRole('status')).toHaveTextContent('Ergebnis: abgebrochen'));
    await expect(document.querySelector('cds-confirm-dialog')).toBeNull();
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Geöffnet',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Für das Visual-Snapshot: bleibt offen. Steht zuletzt, damit kein offener Dialog in
  // eine folgende Story ragt; beim Abbau der Story-App löst der Service ihn mit false auf.
  play: async ({
    canvasElement
  }) => {
    await openDialog(canvasElement, 'Profil verlassen');
  }
}`,...U.parameters?.docs?.source}}}})))()}init_confirm_dialog_stories();export{H as AufraeumenBeimZerstoeren,V as DoppeltGeoeffnet,U as Geoeffnet,I as Interaktiv,z as NichtDestruktiv,R as SelbstAusgeloest,B as Textauswahl,L as Unterbrechung,W as __namedExportsOrder,F as default};