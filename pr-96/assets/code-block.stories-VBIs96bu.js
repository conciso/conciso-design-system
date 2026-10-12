import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{A as n,Ft as r,H as i,I as a,Nt as o,St as s,V as c,fn as l,k as u,q as d,sn as f}from"./angular-platform-CAY__VLP.js";var p;function init_code_block_component(){return(init_code_block_component=e((()=>{l(),u(),p=class CodeBlockComponent{lang=n(`HTML`);code=n.required();terminal=n(!1);copyable=n(!0);copied=r(!1);destroyRef=o(s);resetTimer;constructor(){this.destroyRef.onDestroy(()=>this.clearResetTimer())}wrapClasses=a(()=>this.terminal()?`cb-wrap cb-terminal`:`cb-wrap`);copyStatus=a(()=>this.copied()?`Code kopiert.`:``);copy(){navigator.clipboard&&navigator.clipboard.writeText(this.code()).then(()=>{this.copied.set(!0),this.clearResetTimer(),this.resetTimer=setTimeout(()=>this.copied.set(!1),1500)}).catch(()=>{})}clearResetTimer(){this.resetTimer!==void 0&&(clearTimeout(this.resetTimer),this.resetTimer=void 0)}static ctorParameters=()=>[];static propDecorators={lang:[{type:d,args:[{isSignal:!0,alias:`lang`,required:!1,transform:void 0}]}],code:[{type:d,args:[{isSignal:!0,alias:`code`,required:!0,transform:void 0}]}],terminal:[{type:d,args:[{isSignal:!0,alias:`terminal`,required:!1,transform:void 0}]}],copyable:[{type:d,args:[{isSignal:!0,alias:`copyable`,required:!1,transform:void 0}]}]}},p=f([i({selector:`cds-code-block`,changeDetection:c.OnPush,template:`
    <div [class]="wrapClasses()">
      <div class="cb-header">
        <span class="cb-lang">{{ lang() }}</span>
        @if (copyable()) {
          <button class="cb-copy" type="button" aria-label="Code kopieren" (click)="copy()">
            {{ copied() ? 'Kopiert!' : 'Kopieren' }}
          </button>
          <!-- Steht von Anfang an im DOM (nicht erst ab dem ersten Klick erzeugt), sonst
               kündigen viele Screenreader die erste Statusänderung gar nicht an. -->
          <span class="sr-only" role="status" aria-live="polite">{{ copyStatus() }}</span>
        }
      </div>
      <pre class="cb-body" tabindex="0"><code>{{ code() }}</code></pre>
    </div>
  `})],p)})))()}var m=t({Interaktiv:()=>b,KopierButton:()=>S,Terminal:()=>x,__namedExportsOrder:()=>C,default:()=>y}),h,g,_,v,y,b,x,S,C;function init_code_block_stories(){return(init_code_block_stories=e((()=>{init_code_block_component(),{within:h,userEvent:g,expect:_,waitFor:v}=__STORYBOOK_MODULE_TEST__,y={title:`Komponenten/Code-Block`,component:p,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-1276`},layout:`padded`,docs:{description:{component:`Darstellung von Quellcode mit Header aus Sprachkennung und Kopier-Button. Für Wissens- und Technikbeiträge. Varianten: Standard, mit Zeilennummern, Terminal sowie Inline-Code.`}}},argTypes:{terminal:{control:`boolean`},copyable:{control:`boolean`}},args:{lang:`HTML`,code:`<button class="btn btn-filled btn-co">Kontakt</button>`,terminal:!1,copyable:!0}},b={play:async({canvasElement:e})=>{let t=e.querySelector(`pre.cb-body`);_(t).toHaveAttribute(`tabindex`,`0`),_(t?.querySelector(`code`)).toHaveTextContent(`<button class="btn btn-filled btn-co">Kontakt</button>`),t?.focus(),_(t).toHaveFocus()}},x={args:{lang:`bash`,terminal:!0,code:`npm install
npm run storybook`}},S={name:`Kopier-Button`,parameters:{snapshot:{skip:!0},controls:{disable:!0}},play:async({canvasElement:e})=>{let t=h(e),n=Object.getOwnPropertyDescriptor(navigator,`clipboard`);try{Object.defineProperty(navigator,"clipboard",{value:{writeText:()=>Promise.resolve()},configurable:!0});let e=t.getByRole(`button`,{name:`Code kopieren`});await g.click(e);let n=await t.findByRole(`status`);await v(()=>_(n).toHaveTextContent(`Code kopiert.`)),_(t.getByRole(`button`,{name:`Code kopieren`})).toBeInTheDocument(),_(e).toHaveTextContent(`Kopiert!`)}finally{n?Object.defineProperty(navigator,"clipboard",n):delete navigator.clipboard}}},C=[`Interaktiv`,`Terminal`,`KopierButton`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  // A11y-Grundgerüst: \`<code>\` im \`<pre>\` und tabindex="0" für die Tastatur-Erreichbarkeit
  // des horizontal scrollbaren Blocks (siehe code-block-verwendung.mdx, „Barrierefreiheit“).
  play: async ({
    canvasElement
  }) => {
    const pre = canvasElement.querySelector('pre.cb-body');
    expect(pre).toHaveAttribute('tabindex', '0');
    expect(pre?.querySelector('code')).toHaveTextContent('<button class="btn btn-filled btn-co">Kontakt</button>');
    (pre as HTMLElement | null)?.focus();
    expect(pre).toHaveFocus();
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    lang: 'bash',
    terminal: true,
    code: 'npm install\\nnpm run storybook'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Kopier-Button',
  parameters: {
    snapshot: {
      skip: true
    },
    controls: {
      disable: true
    }
  },
  // Clipboard-API im Test-Browser deterministisch mocken: ein echter Zugriff bräuchte
  // Berechtigungen, die im headless Chromium nicht garantiert erteilt sind. Geprüft wird
  // das sichtbare Feedback (Button-Text wechselt auf „Kopiert!“), nicht der echte Copy.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    try {
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: () => Promise.resolve()
        },
        configurable: true
      });
      // Accessible Name kommt vom aria-label und bleibt stabil — ein Bedienelement trägt
      // den Namen seiner Funktion, nicht den seines letzten Ereignisses (a11y-Regel aus
      // code-block-verwendung.mdx). Der Button heißt vor und nach dem Klick gleich.
      const button = c.getByRole('button', {
        name: 'Code kopieren'
      });
      await userEvent.click(button);
      // Die Erfolgsmeldung wird jetzt in der eigenen Live-Region angekündigt, nicht mehr
      // über einen Namenswechsel am Button.
      // waitFor, weil die Region von Anfang an im DOM steht: findByRole kehrt sofort
      // zurück, der Text erscheint aber erst, wenn die clipboard-Promise aufgeloest ist.
      const status = await c.findByRole('status');
      await waitFor(() => expect(status).toHaveTextContent('Code kopiert.'));
      expect(c.getByRole('button', {
        name: 'Code kopieren'
      })).toBeInTheDocument();
      expect(button).toHaveTextContent('Kopiert!');
    } finally {
      if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);else delete (navigator as {
        clipboard?: Clipboard;
      }).clipboard;
    }
  }
}`,...S.parameters?.docs?.source}}}})))()}export{init_code_block_stories as n,m as t};