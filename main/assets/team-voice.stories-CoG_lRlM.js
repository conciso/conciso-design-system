import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,I as r,Nt as i,V as a,fn as o,k as s,o as c,q as l,s as u,sn as d}from"./angular-platform-CAY__VLP.js";import{n as f,r as p}from"./icons-cAZQriMl.js";import{n as m,t as h}from"./platzhalter-Djsxs5M2.js";var g;function init_team_voice_component(){return(init_team_voice_component=e((()=>{o(),s(),u(),p(),g=class TeamVoiceComponent{sanitizer=i(c);quote=t.required();name=t.required();roleLabel=t(``);area=t(`co`);image=t(``);imageAlt=t(`Teamfoto`);quoteIcon=r(()=>this.sanitizer.bypassSecurityTrustHtml(f.body));placeholder=`data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='600'%20height='450'%3E%3Crect%20width='600'%20height='450'%20fill='%23E8EDED'/%3E%3Ctext%20x='300'%20y='225'%20font-family='sans-serif'%20font-size='22'%20fill='%236E8585'%20text-anchor='middle'%20dominant-baseline='middle'%3ETeamfoto%3C/text%3E%3C/svg%3E`;static propDecorators={quote:[{type:l,args:[{isSignal:!0,alias:`quote`,required:!0,transform:void 0}]}],name:[{type:l,args:[{isSignal:!0,alias:`name`,required:!0,transform:void 0}]}],roleLabel:[{type:l,args:[{isSignal:!0,alias:`roleLabel`,required:!1,transform:void 0}]}],area:[{type:l,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],image:[{type:l,args:[{isSignal:!0,alias:`image`,required:!1,transform:void 0}]}],imageAlt:[{type:l,args:[{isSignal:!0,alias:`imageAlt`,required:!1,transform:void 0}]}]}},g=d([n({selector:`cds-team-voice`,changeDetection:a.OnPush,template:`
    <figure class="team-voice" [attr.data-area]="area() || null">
      <div class="team-voice-media">
        <img [src]="image() || placeholder" [alt]="imageAlt()" loading="lazy" />
      </div>
      <figcaption class="team-voice-body">
        <!-- ui-quote aus @conciso/design-system/icons. -->
        <svg
          class="team-voice-icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          [innerHTML]="quoteIcon()"
        ></svg>
        <blockquote class="team-voice-quote">{{ quote() }}</blockquote>
        <div class="team-voice-footer">
          <p class="team-voice-name">{{ name() }}</p>
          <p class="team-voice-role">{{ roleLabel() }}</p>
        </div>
      </figcaption>
    </figure>
  `})],g)})))()}var _,v,y,b,x,S,C;function init_team_voice_stories(){return(init_team_voice_stories=e((()=>{init_team_voice_component(),h(),{expect:_}=__STORYBOOK_MODULE_TEST__,v=m(`Teamfoto`,600,450,24),y={title:`Komponenten/Zitate & Testimonials/TeamVoice`,component:g,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4541`},layout:`padded`,docs:{description:{component:`Team-Stimme in editorialer, fotostarker Variante: großes Foto seitlich, Zitat und Attribution daneben. In Reihen abwechselnd links/rechts angeordnet. Für Repräsentation, wenn Gesichter und Präsenz zählen, etwa auf Karriereseiten.`}}},argTypes:{area:{control:`inline-radio`,options:[`co`,`ki`,`es`,`wo`]}},args:{quote:`Ich kam als Junior und durfte vom ersten Sprint an mitgestalten. Die Lernkurve war steil, aber nie allein.`,name:`Lena Brandt`,roleLabel:`Softwareentwicklerin, seit 2021`,area:`co`,image:v,imageAlt:`Teamfoto`}},b={},x={name:`Alternierende Reihen`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[g]},props:{teamfoto:v},template:`
      <div class="team-voices">
        <cds-team-voice [image]="teamfoto" area="co" name="Lena Brandt" roleLabel="Softwareentwicklerin, seit 2021"
          quote="Ich kam als Junior und durfte vom ersten Sprint an mitgestalten. Die Lernkurve war steil, aber nie allein."></cds-team-voice>
        <cds-team-voice [image]="teamfoto" area="wo" name="Tobias Reuter" roleLabel="Lead Developer, seit 2018"
          quote="Was mich hält, ist die Ehrlichkeit. Wir reden über das, was gut läuft, und genauso über das, was nicht klappt."></cds-team-voice>
        <cds-team-voice [image]="teamfoto" area="es" name="Mara Vogt" roleLabel="Platform Engineer, seit 2022"
          quote="Hier zählt, was funktioniert, nicht, wer am lautesten ist. Das macht die Arbeit ruhig und fokussiert."></cds-team-voice>
      </div>
    `}),play:async({canvasElement:e})=>{let t=Array.from(e.querySelectorAll(`.team-voices > cds-team-voice`));await _(t).toHaveLength(3);let n=t.map(e=>e.querySelector(`.team-voice-media`)),r=t.map(e=>e.querySelector(`.team-voice-body`)),imageLeftOfText=e=>n[e].getBoundingClientRect().left<r[e].getBoundingClientRect().left;await _(imageLeftOfText(0)).toBe(!0),await _(imageLeftOfText(1)).toBe(!1),await _(imageLeftOfText(2)).toBe(!0)}},S={name:`Alternierende Reihen (mobil)`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},render:x.render,play:async({canvasElement:e})=>{let t=e.querySelector(`.team-voices`),n=document.createElement(`iframe`);n.style.cssText=`width:375px;height:1400px;border:0`,n.srcdoc=`<!doctype html><html><head>${Array.from(document.querySelectorAll(`link[rel="stylesheet"], style`)).map(e=>e.outerHTML).join(``)}</head><body>${t.outerHTML}</body></html>`;let r=new Promise(e=>n.addEventListener(`load`,()=>e()));n.title=`Mobile Vorschau der Team-Stimmen`,t.style.display=`none`,e.appendChild(n),await r;let i=n.contentDocument;await _(n.contentWindow.matchMedia(`(max-width:768px)`).matches).toBe(!0);let a=i.querySelectorAll(`.team-voices > cds-team-voice`)[1],o=a.querySelector(`.team-voice-media`),s=a.querySelector(`.team-voice-body`),c=o.getBoundingClientRect(),l=s.getBoundingClientRect();await _(getComputedStyle(a.querySelector(`.team-voice`)).gridTemplateColumns.split(` `)).toHaveLength(1),await _(c.bottom).toBeLessThanOrEqual(l.top+1),await _(Math.abs(c.left-l.left)).toBeLessThan(1)}},C=[`Interaktiv`,`AlternierendeReihen`,`AlternierendMobil`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Alternierende Reihen',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [TeamVoiceComponent]
    },
    props: {
      teamfoto
    },
    template: \`
      <div class="team-voices">
        <cds-team-voice [image]="teamfoto" area="co" name="Lena Brandt" roleLabel="Softwareentwicklerin, seit 2021"
          quote="Ich kam als Junior und durfte vom ersten Sprint an mitgestalten. Die Lernkurve war steil, aber nie allein."></cds-team-voice>
        <cds-team-voice [image]="teamfoto" area="wo" name="Tobias Reuter" roleLabel="Lead Developer, seit 2018"
          quote="Was mich hält, ist die Ehrlichkeit. Wir reden über das, was gut läuft, und genauso über das, was nicht klappt."></cds-team-voice>
        <cds-team-voice [image]="teamfoto" area="es" name="Mara Vogt" roleLabel="Platform Engineer, seit 2022"
          quote="Hier zählt, was funktioniert, nicht, wer am lautesten ist. Das macht die Arbeit ruhig und fokussiert."></cds-team-voice>
      </div>
    \`
  }),
  // Akzeptanzkriterium: Jede .team-voice steckt allein in ihrem cds-team-voice-Host, deshalb
  // zählt die Position des Hosts in .team-voices. Erste und dritte Karte: Bild links vom Text,
  // zweite Karte: Bild rechts vom Text.
  play: async ({
    canvasElement
  }) => {
    const hosts = Array.from(canvasElement.querySelectorAll('.team-voices > cds-team-voice'));
    await expect(hosts).toHaveLength(3);
    const media = hosts.map(h => h.querySelector('.team-voice-media') as HTMLElement);
    const body = hosts.map(h => h.querySelector('.team-voice-body') as HTMLElement);
    const imageLeftOfText = (i: number) => media[i].getBoundingClientRect().left < body[i].getBoundingClientRect().left;
    await expect(imageLeftOfText(0)).toBe(true);
    await expect(imageLeftOfText(1)).toBe(false);
    await expect(imageLeftOfText(2)).toBe(true);
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Alternierende Reihen (mobil)',
  // Reine Verhaltensprüfung ohne Baseline. Die Media-Query hängt am Viewport, nicht an der
  // Container-Breite, daher läuft die gerenderte Angular-Markup in einem 375 px breiten iframe.
  parameters: {
    controls: {
      disable: true
    },
    snapshot: {
      skip: true
    }
  },
  render: AlternierendeReihen.render,
  // Akzeptanzkriterium: Ab max-width 768px ist auch die gerade (zweite) Karte einspaltig, das
  // Bild steht über dem Text und nicht daneben.
  play: async ({
    canvasElement
  }) => {
    const rows = canvasElement.querySelector('.team-voices') as HTMLElement;
    const frame = document.createElement('iframe');
    frame.style.cssText = 'width:375px;height:1400px;border:0';
    const head = Array.from(document.querySelectorAll('link[rel="stylesheet"], style')).map(n => n.outerHTML).join('');
    frame.srcdoc = \`<!doctype html><html><head>\${head}</head><body>\${rows.outerHTML}</body></html>\`;
    const loaded = new Promise<void>(resolve => frame.addEventListener('load', () => resolve()));
    frame.title = 'Mobile Vorschau der Team-Stimmen';
    rows.style.display = 'none';
    canvasElement.appendChild(frame);
    await loaded;
    // Stylesheets per <link> laden asynchron nach dem load-Event des Dokuments nicht mehr nach.
    const doc = frame.contentDocument as Document;
    await expect(frame.contentWindow!.matchMedia('(max-width:768px)').matches).toBe(true);
    const card = doc.querySelectorAll('.team-voices > cds-team-voice')[1];
    const media = card.querySelector('.team-voice-media') as HTMLElement;
    const body = card.querySelector('.team-voice-body') as HTMLElement;
    const m = media.getBoundingClientRect();
    const b = body.getBoundingClientRect();
    await expect(getComputedStyle(card.querySelector('.team-voice') as Element).gridTemplateColumns.split(' ')).toHaveLength(1);
    await expect(m.bottom).toBeLessThanOrEqual(b.top + 1);
    await expect(Math.abs(m.left - b.left)).toBeLessThan(1);
  }
}`,...S.parameters?.docs?.source}}}})))()}init_team_voice_stories();export{S as AlternierendMobil,x as AlternierendeReihen,b as Interaktiv,C as __namedExportsOrder,y as default};