import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,I as r,V as i,fn as a,k as o,q as s,sn as c}from"./angular-platform-CAY__VLP.js";import{n as l,t as u}from"./pill.component-CamsB5EU.js";import{n as d,t as f}from"./_virtual_angular_jit_style_inline_20c71c1acac87d0e-D4If-lgz.js";import{n as p,t as m}from"./avatar.component-CN-R8QII.js";import{n as h,t as g}from"./avatar-stack.component-BaEHZxr5.js";import{r as _,t as v}from"./dist-Cwu2f28i.js";var y;function init_article_header_component(){return(init_article_header_component=e((()=>{a(),d(),o(),l(),y=class ArticleHeaderComponent{title=t.required();lead=t(``);breadcrumb=t([]);pill=t(``);pillAriaLabel=t();area=t();authorName=t(``);authorRole=t(``);date=t(``);dateLabel=t(``);hasAuthor=r(()=>!!this.authorName());hasDate=r(()=>!!this.date());static propDecorators={title:[{type:s,args:[{isSignal:!0,alias:`title`,required:!0,transform:void 0}]}],lead:[{type:s,args:[{isSignal:!0,alias:`lead`,required:!1,transform:void 0}]}],breadcrumb:[{type:s,args:[{isSignal:!0,alias:`breadcrumb`,required:!1,transform:void 0}]}],pill:[{type:s,args:[{isSignal:!0,alias:`pill`,required:!1,transform:void 0}]}],pillAriaLabel:[{type:s,args:[{isSignal:!0,alias:`pillAriaLabel`,required:!1,transform:void 0}]}],area:[{type:s,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}],authorName:[{type:s,args:[{isSignal:!0,alias:`authorName`,required:!1,transform:void 0}]}],authorRole:[{type:s,args:[{isSignal:!0,alias:`authorRole`,required:!1,transform:void 0}]}],date:[{type:s,args:[{isSignal:!0,alias:`date`,required:!1,transform:void 0}]}],dateLabel:[{type:s,args:[{isSignal:!0,alias:`dateLabel`,required:!1,transform:void 0}]}]}},y=c([n({selector:`cds-article-header`,changeDetection:i.OnPush,imports:[u],host:{class:`article-header`,"[attr.title]":`null`},template:`
    @if (breadcrumb().length) {
      <nav class="article-breadcrumb" aria-label="Breadcrumb">
        @for (item of breadcrumb(); track $index; let last = $last) {
          @if (last) {
            <span aria-current="page">{{ item.label }}</span>
          } @else {
            @if (item.href) {
              <a [href]="item.href">{{ item.label }}</a>
            } @else {
              <span>{{ item.label }}</span>
            }
            <span class="article-breadcrumb-sep" aria-hidden="true">/</span>
          }
        }
      </nav>
    }
    @if (area(); as pillArea) {
      @if (pill()) {
        <cds-pill [label]="pill()" [area]="pillArea" [ariaLabel]="pillAriaLabel()" />
      }
    }
    <h1 class="article-title">{{ title() }}</h1>
    @if (lead()) {
      <p class="article-lead">{{ lead() }}</p>
    }
    @if (hasAuthor() || hasDate()) {
      <div class="article-meta">
        @if (hasAuthor()) {
          <div class="article-meta-author">
            <ng-content select="[cdsAvatar], cds-avatar-stack"></ng-content>
            <div class="article-meta-text">
              <p class="article-meta-name">{{ authorName() }}</p>
              @if (authorRole()) {
                <p class="article-meta-role">{{ authorRole() }}</p>
              }
            </div>
          </div>
        }
        @if (hasAuthor() && hasDate()) {
          <span class="article-meta-sep" aria-hidden="true"></span>
        }
        @if (hasDate()) {
          <time class="article-meta-date" [attr.datetime]="date()">{{
            dateLabel() || date()
          }}</time>
        }
      </div>
    }
  `,styles:[f]})],y)})))()}var b,x,S,C,w,T,E,D,O,k;function init_article_header_stories(){return(init_article_header_stories=e((()=>{v(),init_article_header_component(),p(),h(),{within:b,expect:x}=__STORYBOOK_MODULE_TEST__,S=[{label:`Wissen`,href:`#`},{label:`Angewandte KI`}],C={title:`Seitenmuster/Wissensbeitrag/Article-Header`,component:y,decorators:[_({imports:[y,m,g]})],tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-1610`},layout:`padded`,docs:{description:{component:'Zentrierter Kopf eines Wissensbeitrags (`.article-header`, css/components.css:1486 bis 1519): Breadcrumb, optionale Pill, H1, Lead, Meta-Strip. Hauptvorlage ist `apps/storybook/src/docs/seitenmuster/wissensbeitrag.mdx`, Abschnitt „Article Header“. Der Avatar (`div[cdsAvatar]` oder `cds-avatar-stack`) wird über `<ng-content select="[cdsAvatar], cds-avatar-stack">` in den Meta-Strip projiziert. Der letzte Breadcrumb-Eintrag rendert immer ohne Link mit `aria-current="page"`, unabhängig von einem dort eventuell gesetzten `href` (siehe Klassendoku). `date`/`dateLabel` bleiben getrennt: `dateLabel` liefert die sichtbare Schreibweise, `date` allein den `datetime`-Wert; ohne `dateLabel` zeigt das `<time>` das rohe ISO-Datum sichtbar an (bewusst als Warnfall in „Interaktiv“ demonstriert).'}}}},w={render:e=>({props:e,template:`
      <cds-article-header
        [title]="title"
        [lead]="lead"
        [breadcrumb]="breadcrumb"
        [pill]="pill"
        [pillAriaLabel]="pillAriaLabel"
        [area]="area"
        [authorName]="authorName"
        [authorRole]="authorRole"
        [date]="date"
        [dateLabel]="dateLabel"
      >
        <div cdsAvatar name="Lukas Brandt" area="ki"></div>
      </cds-article-header>
    `}),args:{title:`Warum 60 % der KI-Piloten nie in Produktion gehen`,lead:`Demos überzeugen, Use-Cases scheitern. Was wir aus 200 Implementierungen über den Pfad zur Produktion gelernt haben.`,breadcrumb:S,pill:`8 min Lesezeit`,pillAriaLabel:`Lesezeit 8 Minuten`,area:`ki`,authorName:`Lukas Brandt`,authorRole:`Senior AI Engineer · Conciso`,date:`2026-05-13`,dateLabel:`13. Mai 2026`},play:async({canvasElement:e})=>{let t=b(e),n=e.querySelector(`nav.article-breadcrumb`);await x(n).toHaveAttribute(`aria-label`,`Breadcrumb`);let r=n.querySelectorAll(`:scope > a, :scope > span:not(.article-breadcrumb-sep)`);await x(r).toHaveLength(2),await x(r[0].tagName).toBe(`A`),await x(r[0]).not.toHaveAttribute(`aria-current`),await x(r[1].tagName).toBe(`SPAN`),await x(r[1]).toHaveAttribute(`aria-current`,`page`),await x(r[1]).not.toHaveAttribute(`href`),await x(r[1]).toHaveTextContent(`Angewandte KI`);let i=e.querySelector(`time.article-meta-date`);await x(i).toHaveAttribute(`datetime`,`2026-05-13`),await x(i).toHaveTextContent(`13. Mai 2026`);let a=e.querySelector(`[cdsAvatar]`);await x(a).toHaveTextContent(`LB`);let o=e.querySelector(`.pill`);await x(o).toHaveAttribute(`data-area`,`ki`),await x(o).toHaveAttribute(`aria-label`,`Lesezeit 8 Minuten`),await x(t.getByRole(`heading`,{level:1})).toHaveTextContent(`Warum 60 % der KI-Piloten nie in Produktion gehen`)}},T={name:`Ohne Breadcrumb`,render:e=>({props:e,template:`
      <cds-article-header
        [title]="title"
        [lead]="lead"
        [pill]="pill"
        [pillAriaLabel]="pillAriaLabel"
        [area]="area"
        [authorName]="authorName"
        [authorRole]="authorRole"
        [date]="date"
        [dateLabel]="dateLabel"
      >
        <div cdsAvatar name="Maria Müller" area="es"></div>
      </cds-article-header>
    `}),args:{title:`Was wir aus 200 Migrationen gelernt haben`,lead:`Eine kollektive Retrospektive aus fünf Conciso-Engineering-Teams.`,pill:`18 min Lesezeit`,pillAriaLabel:`Lesezeit 18 Minuten`,area:`es`,authorName:`Maria Müller`,authorRole:`Principal Engineer · Conciso`,date:`2026-07-02`,dateLabel:`2. Juli 2026`},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{await x(e.querySelector(`nav.article-breadcrumb`)).toBeNull(),await x(e.querySelector(`h1.article-title`)).toHaveTextContent(`Was wir aus 200 Migrationen gelernt haben`)}},E={name:`Mehrere Autor:innen`,render:e=>({props:e,template:`
      <cds-article-header
        [title]="title"
        [lead]="lead"
        [pill]="pill"
        [pillAriaLabel]="pillAriaLabel"
        [area]="area"
        [authorName]="authorName"
        [authorRole]="authorRole"
        [date]="date"
        [dateLabel]="dateLabel"
      >
        <cds-avatar-stack [more]="2">
          <div cdsAvatar name="Paul Meinhardt" area="es"></div>
          <div cdsAvatar name="Anna Rieth" area="es"></div>
          <div cdsAvatar name="Daniel Herzog" area="es"></div>
        </cds-avatar-stack>
      </cds-article-header>
    `}),args:{title:`Was wir aus 200 Migrationen gelernt haben`,lead:`Eine kollektive Retrospektive aus fünf Conciso-Engineering-Teams.`,pill:`18 min Lesezeit`,pillAriaLabel:`Lesezeit 18 Minuten`,area:`es`,authorName:`Paul Meinhardt, Anna Rieth & 3 weitere`,authorRole:`Conciso-Engineering`,date:`2026-07-02`,dateLabel:`2. Juli 2026`},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=e.querySelector(`cds-avatar-stack`);await x(t).toHaveAttribute(`aria-hidden`,`true`),await x(t.querySelectorAll(`.article-avatar`)).toHaveLength(3),await x(t.querySelector(`.article-avatar-more`)).toHaveTextContent(`+2`);let n=e.querySelector(`.article-meta-name`);await x(n).toHaveTextContent(`Paul Meinhardt, Anna Rieth & 3 weitere`)}},D={name:`Pille ohne Bereich`,render:e=>({props:e,template:`
      <cds-article-header [title]="title" [lead]="lead" [pill]="pill">
        <div cdsAvatar name="Lukas Brandt"></div>
      </cds-article-header>
    `}),args:{title:`Warum 60 % der KI-Piloten nie in Produktion gehen`,lead:`Demos überzeugen, Use-Cases scheitern.`,pill:`8 min Lesezeit`},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{await x(e.querySelector(`.pill`)).toBeNull(),await x(e.querySelector(`h1.article-title`)).toHaveTextContent(`Warum 60 % der KI-Piloten nie in Produktion gehen`)}},O={name:`Breite begrenzt`,parameters:{controls:{disable:!0},snapshot:{skip:!0}},render:()=>({template:`
      <div style="width:1200px">
        <cds-article-header
          title="Warum 60 % der KI-Piloten nie in Produktion gehen"
          lead="Demos überzeugen, Use-Cases scheitern. Was wir aus 200 Implementierungen über den Pfad zur Produktion gelernt haben."
        ></cds-article-header>
      </div>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`cds-article-header`),n=t.querySelector(`.article-lead`);await x(t).not.toHaveAttribute(`title`),await x(getComputedStyle(t).display).toBe(`block`),await x(t.getBoundingClientRect().width).toBe(880),await x(n.getBoundingClientRect().width).toBeLessThanOrEqual(880)}},k=[`Interaktiv`,`OhneBreadcrumb`,`MehrereAutorinnen`,`PilleOhneBereich`,`BreiteBegrenzt`],w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`
      <cds-article-header
        [title]="title"
        [lead]="lead"
        [breadcrumb]="breadcrumb"
        [pill]="pill"
        [pillAriaLabel]="pillAriaLabel"
        [area]="area"
        [authorName]="authorName"
        [authorRole]="authorRole"
        [date]="date"
        [dateLabel]="dateLabel"
      >
        <div cdsAvatar name="Lukas Brandt" area="ki"></div>
      </cds-article-header>
    \`
  }),
  args: {
    title: 'Warum 60 % der KI-Piloten nie in Produktion gehen',
    lead: 'Demos überzeugen, Use-Cases scheitern. Was wir aus 200 Implementierungen über den Pfad ' + 'zur Produktion gelernt haben.',
    breadcrumb,
    pill: '8 min Lesezeit',
    pillAriaLabel: 'Lesezeit 8 Minuten',
    area: 'ki',
    authorName: 'Lukas Brandt',
    authorRole: 'Senior AI Engineer · Conciso',
    date: '2026-05-13',
    dateLabel: '13. Mai 2026'
  },
  // Akzeptanzkriterien: Breadcrumb ist <nav aria-label="Breadcrumb">, letzter Eintrag ohne Link
  // mit aria-current="page"; Datum ist ein <time> mit gültigem ISO-Wert; Initialen stimmen mit
  // name überein.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const nav = canvasElement.querySelector('nav.article-breadcrumb') as HTMLElement;
    await expect(nav).toHaveAttribute('aria-label', 'Breadcrumb');
    const crumbs = nav.querySelectorAll(':scope > a, :scope > span:not(.article-breadcrumb-sep)');
    await expect(crumbs).toHaveLength(2);
    await expect(crumbs[0].tagName).toBe('A');
    await expect(crumbs[0]).not.toHaveAttribute('aria-current');
    await expect(crumbs[1].tagName).toBe('SPAN');
    await expect(crumbs[1]).toHaveAttribute('aria-current', 'page');
    await expect(crumbs[1]).not.toHaveAttribute('href');
    await expect(crumbs[1]).toHaveTextContent('Angewandte KI');
    const time = canvasElement.querySelector('time.article-meta-date') as HTMLTimeElement;
    await expect(time).toHaveAttribute('datetime', '2026-05-13');
    await expect(time).toHaveTextContent('13. Mai 2026');
    const avatar = canvasElement.querySelector('[cdsAvatar]') as HTMLElement;
    await expect(avatar).toHaveTextContent('LB');
    const pill = canvasElement.querySelector('.pill') as HTMLElement;
    await expect(pill).toHaveAttribute('data-area', 'ki');
    await expect(pill).toHaveAttribute('aria-label', 'Lesezeit 8 Minuten');
    await expect(c.getByRole('heading', {
      level: 1
    })).toHaveTextContent('Warum 60 % der KI-Piloten nie in Produktion gehen');
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  name: 'Ohne Breadcrumb',
  render: args => ({
    props: args,
    template: \`
      <cds-article-header
        [title]="title"
        [lead]="lead"
        [pill]="pill"
        [pillAriaLabel]="pillAriaLabel"
        [area]="area"
        [authorName]="authorName"
        [authorRole]="authorRole"
        [date]="date"
        [dateLabel]="dateLabel"
      >
        <div cdsAvatar name="Maria Müller" area="es"></div>
      </cds-article-header>
    \`
  }),
  args: {
    title: 'Was wir aus 200 Migrationen gelernt haben',
    lead: 'Eine kollektive Retrospektive aus fünf Conciso-Engineering-Teams.',
    pill: '18 min Lesezeit',
    pillAriaLabel: 'Lesezeit 18 Minuten',
    area: 'es',
    authorName: 'Maria Müller',
    authorRole: 'Principal Engineer · Conciso',
    date: '2026-07-02',
    dateLabel: '2. Juli 2026'
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  // Kein breadcrumb-Input (Default []) → keine <nav> im DOM. Konsumenten, die der
  // allgemeinen Navigationsregel folgen, lassen den Input leer und setzen die
  // Leiste selbst davor.
  play: async ({
    canvasElement
  }) => {
    await expect(canvasElement.querySelector('nav.article-breadcrumb')).toBeNull();
    await expect(canvasElement.querySelector('h1.article-title')).toHaveTextContent('Was wir aus 200 Migrationen gelernt haben');
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Mehrere Autor:innen',
  render: args => ({
    props: args,
    template: \`
      <cds-article-header
        [title]="title"
        [lead]="lead"
        [pill]="pill"
        [pillAriaLabel]="pillAriaLabel"
        [area]="area"
        [authorName]="authorName"
        [authorRole]="authorRole"
        [date]="date"
        [dateLabel]="dateLabel"
      >
        <cds-avatar-stack [more]="2">
          <div cdsAvatar name="Paul Meinhardt" area="es"></div>
          <div cdsAvatar name="Anna Rieth" area="es"></div>
          <div cdsAvatar name="Daniel Herzog" area="es"></div>
        </cds-avatar-stack>
      </cds-article-header>
    \`
  }),
  // Wortlaut der Beispielseite: 3 Avatare + \`+2\` im Stapel, Text
  // nennt die ersten zwei Namen („Namens-Konvention“ in wissensbeitrag.mdx erlaubt 2 ODER 3).
  args: {
    title: 'Was wir aus 200 Migrationen gelernt haben',
    lead: 'Eine kollektive Retrospektive aus fünf Conciso-Engineering-Teams.',
    pill: '18 min Lesezeit',
    pillAriaLabel: 'Lesezeit 18 Minuten',
    area: 'es',
    authorName: 'Paul Meinhardt, Anna Rieth & 3 weitere',
    authorRole: 'Conciso-Engineering',
    date: '2026-07-02',
    dateLabel: '2. Juli 2026'
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  // Detaillierte Überlappungs-Messung des Stapels steht in avatar.stories.ts („Avatar-Stapel“);
  // hier nur die Einbettung im Meta-Strip: Stapel + \`+N\` projiziert, Autorentext vollständig als
  // Text vorhanden (Barrierefreiheit: der Stapel ist aria-hidden, die Namen stehen im Fließtext).
  play: async ({
    canvasElement
  }) => {
    const stack = canvasElement.querySelector('cds-avatar-stack') as HTMLElement;
    await expect(stack).toHaveAttribute('aria-hidden', 'true');
    await expect(stack.querySelectorAll('.article-avatar')).toHaveLength(3);
    await expect(stack.querySelector('.article-avatar-more')).toHaveTextContent('+2');
    const name = canvasElement.querySelector('.article-meta-name') as HTMLElement;
    await expect(name).toHaveTextContent('Paul Meinhardt, Anna Rieth & 3 weitere');
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'Pille ohne Bereich',
  render: args => ({
    props: args,
    template: \`
      <cds-article-header [title]="title" [lead]="lead" [pill]="pill">
        <div cdsAvatar name="Lukas Brandt"></div>
      </cds-article-header>
    \`
  }),
  args: {
    title: 'Warum 60 % der KI-Piloten nie in Produktion gehen',
    lead: 'Demos überzeugen, Use-Cases scheitern.',
    pill: '8 min Lesezeit'
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  // Pinnt die Entscheidung aus der Klassendoku: \`pill\` ist gesetzt, \`area\` NICHT — ausgezählt
  // trägt jede reale Pille im Article-Header-Kontext ein data-area, ein Fall ohne Bereich
  // kommt nicht vor.
  // Statt einen Default zu erfinden (frühere Fassung: \`as CdsArea\`-Cast, der einem
  // undefined-Binding erlaubte, cds-pills eigenen Default zu überschreiben), rendert die
  // Komponente ohne \`area\` schlicht KEINE Pille.
  play: async ({
    canvasElement
  }) => {
    await expect(canvasElement.querySelector('.pill')).toBeNull();
    await expect(canvasElement.querySelector('h1.article-title')).toHaveTextContent('Warum 60 % der KI-Piloten nie in Produktion gehen');
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Breite begrenzt',
  // Kein eigener Screenshot: geprüft wird nur die Geometrie des Hosts.
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
      <div style="width:1200px">
        <cds-article-header
          title="Warum 60 % der KI-Piloten nie in Produktion gehen"
          lead="Demos überzeugen, Use-Cases scheitern. Was wir aus 200 Implementierungen über den Pfad zur Produktion gelernt haben."
        ></cds-article-header>
      </div>
    \`
  }),
  // Der Host ist ein Block, damit max-width:880px und margin:0 auto aus
  // .article-header greifen. Als Inline-Element liefen Titel und Lead über die
  // volle Breite des 1200 px breiten Containers.
  play: async ({
    canvasElement
  }) => {
    const host = canvasElement.querySelector<HTMLElement>('cds-article-header')!;
    const lead = host.querySelector<HTMLElement>('.article-lead')!;
    await expect(host).not.toHaveAttribute('title');
    await expect(getComputedStyle(host).display).toBe('block');
    await expect(host.getBoundingClientRect().width).toBe(880);
    await expect(lead.getBoundingClientRect().width).toBeLessThanOrEqual(880);
  }
}`,...O.parameters?.docs?.source}}}})))()}init_article_header_stories();export{O as BreiteBegrenzt,w as Interaktiv,E as MehrereAutorinnen,T as OhneBreadcrumb,D as PilleOhneBereich,k as __namedExportsOrder,C as default};