import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,P as a,Tn as o,bn as s,d as c,p as l,z as u}from"./angular-platform-BGeCprOl.js";import{n as d,t as f}from"./platzhalter-Djsxs5M2.js";var p;function init_featured_card_component(){return(init_featured_card_component=e((()=>{o(),c(),n(),p=class FeaturedCardComponent{title=i.required();text=i.required();imageSrc=i.required();imageAlt=i.required();href=i(``);pill=i(``);pillAriaLabel=i();area=i();computedPillAriaLabel=a(()=>this.pillAriaLabel()??`Bereich ${this.pill()}`);static propDecorators={title:[{type:r,args:[{isSignal:!0,alias:`title`,required:!0,transform:void 0}]}],text:[{type:r,args:[{isSignal:!0,alias:`text`,required:!0,transform:void 0}]}],imageSrc:[{type:r,args:[{isSignal:!0,alias:`imageSrc`,required:!0,transform:void 0}]}],imageAlt:[{type:r,args:[{isSignal:!0,alias:`imageAlt`,required:!0,transform:void 0}]}],href:[{type:r,args:[{isSignal:!0,alias:`href`,required:!1,transform:void 0}]}],pill:[{type:r,args:[{isSignal:!0,alias:`pill`,required:!1,transform:void 0}]}],pillAriaLabel:[{type:r,args:[{isSignal:!0,alias:`pillAriaLabel`,required:!1,transform:void 0}]}],area:[{type:r,args:[{isSignal:!0,alias:`area`,required:!1,transform:void 0}]}]}},p=s([t({selector:`cds-featured-card`,changeDetection:u.OnPush,imports:[l],host:{"[attr.title]":`null`},template:`
    @if (href()) {
      <a class="card card-elevated card-featured" [href]="href()" [attr.data-area]="area() || null">
        <ng-container [ngTemplateOutlet]="body"></ng-container>
      </a>
    } @else {
      <article class="card card-featured" [attr.data-area]="area() || null">
        <ng-container [ngTemplateOutlet]="body"></ng-container>
      </article>
    }
    <ng-template #body>
      <div class="card-media">
        <img [src]="imageSrc()" [alt]="imageAlt()" />
      </div>
      <div class="card-featured-body">
        @if (pill()) {
          <span
            class="pill"
            [attr.data-area]="area() || null"
            [attr.aria-label]="computedPillAriaLabel()"
            >{{ pill() }}</span
          >
        }
        <h3 class="card-title-hero">{{ title() }}</h3>
        <p class="card-text">{{ text() }}</p>
      </div>
    </ng-template>
  `})],p)})))()}var m,h,g,_,v,y,b,x,S,C,w;function init_featured_card_stories(){return(init_featured_card_stories=e((()=>{init_featured_card_component(),f(),{within:m,userEvent:h,expect:g}=__STORYBOOK_MODULE_TEST__,_=d(`Bildfläche · 16:9`,800,450,24),v={title:`Komponenten/Cards & Teaser/Featured-Karte`,component:p,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-3477`},layout:`padded`,docs:{description:{component:'Horizontale Großkarte für genau einen hervorgehobenen Beitrag oder Termin (`.card-featured`): Bild links 60 %, Textspalte rechts 40 % als absolut positioniertes Overlay, mit `.card-title-hero` (Serif-Editorial-Titel) und optionaler `.pill`. Mit gesetztem `href` ein `<a class="card card-elevated card-featured">`, sonst ein `<article class="card card-featured">` ohne Schatten (§4 „Elevation = Interaktivität“: `.card-elevated` wirkt nur auf `a.card-elevated`). Kein Grid: Featured ist die „genau einer auf der Bühne“-Variante, die Standard-Karte fürs Grid ist `cds-link-card`.'}}},argTypes:{area:{control:`inline-radio`,options:[void 0,`co`,`ki`,`es`,`wo`]}},args:{title:`Effizienz durch n8n.`,text:`Drei kurze Inputs, ein Workflow, spürbar weniger Klickarbeit im Tagesgeschäft.`,imageSrc:_,imageAlt:`Laptop mit einem n8n-Workflow-Diagramm auf dem Bildschirm`,href:`#veranstaltung-n8n`,pill:`Effektive Software`,area:`es`}},y={play:async({canvasElement:e})=>{let t=m(e),n=e.querySelector(`.card-featured`);await g(n?.tagName).toBe(`A`),await g(e.querySelector(`.card-featured > .card-media`)).not.toBeNull(),await g(e.querySelector(`.card-featured > .card-media > img`)).not.toBeNull(),await g(e.querySelector(`.card-featured-body > .pill`)).not.toBeNull(),await g(e.querySelector(`.card-featured-body > .card-title-hero`)).not.toBeNull(),await g(e.querySelector(`.card-featured-body > .card-text`)).not.toBeNull(),await g(e.querySelector(`cds-pill`)).toBeNull(),await g(e.querySelector(`.pill`)).toHaveAttribute(`aria-label`,`Bereich Effektive Software`);let r=t.getAllByRole(`link`);await g(r).toHaveLength(1);let i=r[0];await g(i).toHaveAttribute(`href`,`#veranstaltung-n8n`),await h.tab(),await g(i).toHaveFocus();let a=!1;i.addEventListener(`click`,e=>{a=!0,e.preventDefault()}),await h.keyboard(`{Enter}`),await g(a).toBe(!0)}},b={name:`Pro Bereich`,parameters:{controls:{disable:!0}},render:()=>({moduleMetadata:{imports:[p]},template:`
      <div style="display:flex;flex-direction:column;gap:24px">
        <cds-featured-card area="co" pill="Corporate" title="Zehn Jahre Conciso."
          text="Wie aus einer Zwei-Personen-Idee ein Team wurde, das Mittelstand und KI zusammendenkt."
          imageSrc="${_}" imageAlt="Conciso-Team bei einem Firmenjubiläum"
          href="#beitrag-jubilaeum"></cds-featured-card>
        <cds-featured-card area="ki" pill="Angewandte KI" title="Effizienz durch n8n."
          text="Drei kurze Inputs, ein Workflow, spürbar weniger Klickarbeit im Tagesgeschäft."
          imageSrc="${_}" imageAlt="Laptop mit einem n8n-Workflow-Diagramm auf dem Bildschirm"
          href="#veranstaltung-n8n"></cds-featured-card>
        <cds-featured-card area="es" pill="Effektive Software" title="Schlanke Architektur senkt Betriebskosten."
          text="Was 40 Migrationsprojekte über den Zusammenhang von Komplexität und Wartungsaufwand zeigen."
          imageSrc="${_}" imageAlt="Whiteboard mit einer Architekturskizze"
          href="#beitrag-architektur"></cds-featured-card>
        <cds-featured-card area="wo" pill="Wirksame Organisationen" title="Teams, die sich selbst organisieren."
          text="Wie verteilte Verantwortung Entscheidungen beschleunigt, ohne Führung zu verlieren."
          imageSrc="${_}" imageAlt="Team im Kreis bei einem Workshop"
          href="#beitrag-teams"></cds-featured-card>
      </div>
    `}),play:async({canvasElement:e})=>{let t=e.querySelectorAll(`cds-featured-card`);await g(t).toHaveLength(4);for(let e of t)await g(e).not.toHaveAttribute(`title`)}},x={name:`Pille als Lesezeit`,parameters:{controls:{disable:!0}},args:{pill:`12 min Lesezeit`,pillAriaLabel:`Lesezeit 12 Minuten`},play:async({canvasElement:e})=>{let t=e.querySelector(`.pill`);await g(t).toHaveTextContent(`12 min Lesezeit`),await g(t).toHaveAttribute(`aria-label`,`Lesezeit 12 Minuten`)}},S={name:`Ohne Pill`,parameters:{controls:{disable:!0}},args:{pill:``},play:async({canvasElement:e})=>{await g(e.querySelector(`.pill`)).toBeNull(),await g(e.querySelector(`.card-featured-body > .card-title-hero`)).not.toBeNull()}},C={name:`Ohne Link`,parameters:{controls:{disable:!0}},args:{href:``},play:async({canvasElement:e})=>{let t=m(e);await g(t.queryAllByRole(`link`)).toHaveLength(0);let n=e.querySelector(`.card-featured`);await g(n?.tagName).toBe(`ARTICLE`),await g(n).not.toHaveClass(`card-elevated`)}},w=[`Interaktiv`,`ProBereich`,`PilleAlsLesezeit`,`OhnePill`,`OhneLink`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  // Die fragile Stelle: .card-featured arbeitet mit direkten
  // Kindselektoren (.card-featured>.card-media, .card-featured-body>.pill/-.card-text/
  // -.card-title-hero). Diese Play-Funktion prüft die gerenderte Kette im echten DOM,
  // nicht nur, dass die Klassen irgendwo vorkommen — zusätzlich verifiziert im
  // laufenden Storybook per querySelector (siehe Bericht). Dazu: mit gesetztem href
  // ist die Karte ein <a>, per Tastatur erreichbar, Enter aktiviert es.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const featured = canvasElement.querySelector('.card-featured');
    await expect(featured?.tagName).toBe('A');

    // Direkte Kindselektoren: exakt die Elemente, auf die das CSS zielt, müssen
    // DIREKTE Kinder sein, kein Angular-Host dazwischen.
    await expect(canvasElement.querySelector('.card-featured > .card-media')).not.toBeNull();
    await expect(canvasElement.querySelector('.card-featured > .card-media > img')).not.toBeNull();
    await expect(canvasElement.querySelector('.card-featured-body > .pill')).not.toBeNull();
    await expect(canvasElement.querySelector('.card-featured-body > .card-title-hero')).not.toBeNull();
    await expect(canvasElement.querySelector('.card-featured-body > .card-text')).not.toBeNull();
    // Gegenprobe: kein <cds-pill>-Tag im gerenderten DOM (die Pille ist direkt
    // komponiertes Markup, siehe Klassendoku Entscheidung 2).
    await expect(canvasElement.querySelector('cds-pill')).toBeNull();
    // Ohne pillAriaLabel greift derselbe Default wie bei PillComponent: „Bereich <pill>“.
    await expect(canvasElement.querySelector('.pill')).toHaveAttribute('aria-label', 'Bereich Effektive Software');
    const links = c.getAllByRole('link');
    await expect(links).toHaveLength(1);
    const card = links[0];
    await expect(card).toHaveAttribute('href', '#veranstaltung-n8n');
    await userEvent.tab();
    await expect(card).toHaveFocus();

    // Enter aktiviert den nativen Link — abgefangen über preventDefault(), sonst
    // verließe die echte Navigation die Storybook-Seite und der Testlauf bräche ab
    // (siehe Begründung in link-card.stories.ts).
    let activated = false;
    card.addEventListener('click', event => {
      activated = true;
      event.preventDefault();
    });
    await userEvent.keyboard('{Enter}');
    await expect(activated).toBe(true);
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Pro Bereich',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    moduleMetadata: {
      imports: [FeaturedCardComponent]
    },
    template: \`
      <div style="display:flex;flex-direction:column;gap:24px">
        <cds-featured-card area="co" pill="Corporate" title="Zehn Jahre Conciso."
          text="Wie aus einer Zwei-Personen-Idee ein Team wurde, das Mittelstand und KI zusammendenkt."
          imageSrc="\${eventPlaceholder}" imageAlt="Conciso-Team bei einem Firmenjubiläum"
          href="#beitrag-jubilaeum"></cds-featured-card>
        <cds-featured-card area="ki" pill="Angewandte KI" title="Effizienz durch n8n."
          text="Drei kurze Inputs, ein Workflow, spürbar weniger Klickarbeit im Tagesgeschäft."
          imageSrc="\${eventPlaceholder}" imageAlt="Laptop mit einem n8n-Workflow-Diagramm auf dem Bildschirm"
          href="#veranstaltung-n8n"></cds-featured-card>
        <cds-featured-card area="es" pill="Effektive Software" title="Schlanke Architektur senkt Betriebskosten."
          text="Was 40 Migrationsprojekte über den Zusammenhang von Komplexität und Wartungsaufwand zeigen."
          imageSrc="\${eventPlaceholder}" imageAlt="Whiteboard mit einer Architekturskizze"
          href="#beitrag-architektur"></cds-featured-card>
        <cds-featured-card area="wo" pill="Wirksame Organisationen" title="Teams, die sich selbst organisieren."
          text="Wie verteilte Verantwortung Entscheidungen beschleunigt, ohne Führung zu verlieren."
          imageSrc="\${eventPlaceholder}" imageAlt="Team im Kreis bei einem Workshop"
          href="#beitrag-teams"></cds-featured-card>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const hosts = canvasElement.querySelectorAll('cds-featured-card');
    await expect(hosts).toHaveLength(4);
    for (const host of hosts) await expect(host).not.toHaveAttribute('title');
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Pille als Lesezeit',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Die Pille benennt nicht immer einen Bereich: sichtbar „12 min Lesezeit“,
  // aria-label „Lesezeit 12 Minuten“. Ohne pillAriaLabel
  // entstünde daraus fälschlich „Bereich 12 min Lesezeit“. pillAriaLabel
  // überschreibt den Default gezielt, dieselbe Regel wie bei PillComponent.
  args: {
    pill: '12 min Lesezeit',
    pillAriaLabel: 'Lesezeit 12 Minuten'
  },
  play: async ({
    canvasElement
  }) => {
    const pill = canvasElement.querySelector('.pill');
    await expect(pill).toHaveTextContent('12 min Lesezeit');
    await expect(pill).toHaveAttribute('aria-label', 'Lesezeit 12 Minuten');
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Ohne Pill',
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    pill: ''
  },
  // Leeres pill rendert keine .pill — die Kindselektor-Kette bricht dadurch nicht,
  // .card-featured-body hat dann eben ein Kind weniger.
  play: async ({
    canvasElement
  }) => {
    await expect(canvasElement.querySelector('.pill')).toBeNull();
    await expect(canvasElement.querySelector('.card-featured-body > .card-title-hero')).not.toBeNull();
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Ohne Link',
  parameters: {
    controls: {
      disable: true
    }
  },
  args: {
    href: ''
  },
  // Pflicht-Verhalten: ohne href entsteht kein <a> — die Karte rendert als
  // <article>, bewusst ohne .card-elevated (die Klasse wirkt im CSS ohnehin nur auf
  // a.card-elevated, siehe Entscheidung 1 in der Klassendoku).
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    await expect(c.queryAllByRole('link')).toHaveLength(0);
    const featured = canvasElement.querySelector('.card-featured');
    await expect(featured?.tagName).toBe('ARTICLE');
    await expect(featured).not.toHaveClass('card-elevated');
  }
}`,...C.parameters?.docs?.source}}}})))()}init_featured_card_stories();export{y as Interaktiv,C as OhneLink,S as OhnePill,x as PilleAlsLesezeit,b as ProBereich,w as __namedExportsOrder,v as default};