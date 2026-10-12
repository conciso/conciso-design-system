import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{n as t,t as n}from"./article-callout.component-BoISl-vE.js";import{r,t as i}from"./dist-Cwu2f28i.js";var a,o,s,c,l,u;function init_article_callout_stories(){return(init_article_callout_stories=e((()=>{i(),t(),{expect:a}=__STORYBOOK_MODULE_TEST__,o={title:`Seitenmuster/Wissensbeitrag/Callout`,component:n,decorators:[r({imports:[n]})],tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-4809`},layout:`padded`,docs:{description:{component:"Bereichsgetönter Aside-Block für Praxis-Beispiele im Lauftext eines Wissensbeitrags (`.article-callout*`, css/components.css:1591 bis 1600). Projizierte Absätze bleiben direkte Kinder von `.article-callout` (`<ng-content>` fügt kein eigenes Element ein), Voraussetzung für den Kindselektor `.article-callout > p` (css/components.css:1600). `area` hat den verteidigbaren Default `'co'`: die Basisregel ohne `[data-area]` rendert bereits identisch zu `[data-area=\"co\"]`. Ehemaliger CSS-Befund behoben: `.article-callout-eyebrow` steht jetzt als `.article-callout > .article-callout-eyebrow` (Spezifität 0,2,0) und gewinnt gegen `.article-callout > p` (0,1,1); reproduziert hier unverändert das gepatchte Mockup, nicht im Wrapper geflickt (ADR-0001). `aside` trägt `aria-labelledby` auf die Eyebrow, sobald eine gesetzt ist (Zusatz zum Mockup: ARIA, kein CSS), weil mehrere `.article-callout` auf derselben Seite sonst gleichnamige, ununterscheidbare `complementary`-Landmarks wären (axe `landmark-unique`)."}}}},s={render:e=>({props:e,template:`
      <cds-article-callout [eyebrow]="eyebrow" [area]="area">
        <p>Bei einem mittelständischen Versicherer haben wir vor dem Pilot-Start sechs Wochen lang nur Daten und Prozesse aufgeräumt. Das Pilotmodell selbst war anschließend in zwei Wochen produktiv. Ohne Drama, ohne Bypass. Das ist die unspektakuläre Variante des Erfolgs, die selten in Vorträgen vorkommt.</p>
      </cds-article-callout>
    `}),args:{eyebrow:`In der Praxis`,area:`ki`},play:async({canvasElement:e})=>{let t=e.querySelector(`aside.article-callout`);await a(t).toHaveAttribute(`data-area`,`ki`);let n=t.querySelectorAll(`:scope > p`);await a(n).toHaveLength(2),await a(n[0]).toHaveClass(`article-callout-eyebrow`),await a(n[0]).toHaveTextContent(`In der Praxis`),await a(n[1]).not.toHaveClass(`article-callout-eyebrow`),await a(n[1]).toHaveTextContent(`Bei einem mittelständischen Versicherer`),await a(t.children).toHaveLength(2);let r=t.getAttribute(`aria-labelledby`);await a(r).toBeTruthy(),await a(document.getElementById(r)).toBe(n[0])}},c={name:`Pro Bereich`,parameters:{controls:{disable:!0}},render:()=>({template:`
      <div style="display:flex;flex-direction:column;gap:24px">
        <cds-article-callout area="co" eyebrow="Aus dem Markenrad">
          <p>Drei Pfeiler, Ruhig, Klar, Energiegeladen, als Prüfstein für jeden Beitrag. Das ist nicht Pflicht, sondern Erleichterung: Wenn der Text gegen alle drei besteht, klingt er nach Conciso.</p>
        </cds-article-callout>
        <cds-article-callout area="ki" eyebrow="In der Praxis">
          <p>Bei einem mittelständischen Versicherer haben wir vor dem Pilot-Start sechs Wochen lang nur Daten und Prozesse aufgeräumt. Das Pilotmodell selbst war anschließend in zwei Wochen produktiv.</p>
        </cds-article-callout>
        <cds-article-callout area="es" eyebrow="Aus dem Code">
          <p>Wenn ein Modul mehr als drei verschiedene Kontexte bedient, ist es kein Modul mehr, sondern eine Sammlung. Refactoring beginnt mit ehrlicher Inventur, nicht mit dem Werkzeugkasten.</p>
        </cds-article-callout>
        <cds-article-callout area="wo" eyebrow="Beobachtung">
          <p>Wenn ein Veränderungsprojekt im Lenkungskreis hängt, liegt es selten an den Argumenten. Häufiger an einer Rolle, die nie geklärt wurde, und an der Schweigespirale, die daraus entsteht.</p>
        </cds-article-callout>
      </div>
    `}),play:async({canvasElement:e})=>{let t=Array.from(e.querySelectorAll(`aside.article-callout`));await a(t).toHaveLength(4);let n=t.map(e=>e.getAttribute(`data-area`));await a(n).toEqual([`co`,`ki`,`es`,`wo`]);let r=new Set(t.map(e=>getComputedStyle(e).backgroundColor));await a(r.size).toBe(4);let i=new Set(t.map(e=>getComputedStyle(e).borderLeftColor));await a(i.size).toBe(4)}},l={name:`Ohne Eyebrow`,parameters:{controls:{disable:!0}},render:()=>({template:`
      <cds-article-callout area="es">
        <p>Wenn ein Modul mehr als drei verschiedene Kontexte bedient, ist es kein Modul mehr, sondern eine Sammlung.</p>
      </cds-article-callout>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`aside.article-callout`);await a(t.querySelector(`.article-callout-eyebrow`)).toBeNull(),await a(t.querySelectorAll(`:scope > p`)).toHaveLength(1)}},u=[`Interaktiv`,`ProBereich`,`OhneEyebrow`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => ({
    props: args,
    template: \`
      <cds-article-callout [eyebrow]="eyebrow" [area]="area">
        <p>Bei einem mittelständischen Versicherer haben wir vor dem Pilot-Start sechs Wochen lang nur Daten und Prozesse aufgeräumt. Das Pilotmodell selbst war anschließend in zwei Wochen produktiv. Ohne Drama, ohne Bypass. Das ist die unspektakuläre Variante des Erfolgs, die selten in Vorträgen vorkommt.</p>
      </cds-article-callout>
    \`
  }),
  // Wortlaut der Beispielseite Wissensbeitrag · KI.
  args: {
    eyebrow: 'In der Praxis',
    area: 'ki'
  },
  // Akzeptanzkriterium: Callout-Absätze bleiben direkte Kinder von .article-callout, keine
  // zusätzliche Ebene um <ng-content>. Geprüft über den echten Kindselektor (:scope > p), nicht
  // nur über querySelector auf .article-callout p (der auch verschachtelte Treffer fände).
  play: async ({
    canvasElement
  }) => {
    const aside = canvasElement.querySelector('aside.article-callout') as HTMLElement;
    await expect(aside).toHaveAttribute('data-area', 'ki');
    const directChildren = aside.querySelectorAll(':scope > p');
    await expect(directChildren).toHaveLength(2);
    await expect(directChildren[0]).toHaveClass('article-callout-eyebrow');
    await expect(directChildren[0]).toHaveTextContent('In der Praxis');
    await expect(directChildren[1]).not.toHaveClass('article-callout-eyebrow');
    await expect(directChildren[1]).toHaveTextContent('Bei einem mittelständischen Versicherer');

    // Keine fremde Zwischenebene: das <aside> hat genau die zwei projizierten/eigenen <p>,
    // kein <div> oder Ähnliches drumherum.
    await expect(aside.children).toHaveLength(2);

    // aria-labelledby zeigt auf die Eyebrow-id (siehe Klassendoku).
    const labelledBy = aside.getAttribute('aria-labelledby');
    await expect(labelledBy).toBeTruthy();
    await expect(document.getElementById(labelledBy!)).toBe(directChildren[0]);
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Pro Bereich',
  parameters: {
    controls: {
      disable: true
    }
  },
  // Ein Callout je Bereich.
  render: () => ({
    template: \`
      <div style="display:flex;flex-direction:column;gap:24px">
        <cds-article-callout area="co" eyebrow="Aus dem Markenrad">
          <p>Drei Pfeiler, Ruhig, Klar, Energiegeladen, als Prüfstein für jeden Beitrag. Das ist nicht Pflicht, sondern Erleichterung: Wenn der Text gegen alle drei besteht, klingt er nach Conciso.</p>
        </cds-article-callout>
        <cds-article-callout area="ki" eyebrow="In der Praxis">
          <p>Bei einem mittelständischen Versicherer haben wir vor dem Pilot-Start sechs Wochen lang nur Daten und Prozesse aufgeräumt. Das Pilotmodell selbst war anschließend in zwei Wochen produktiv.</p>
        </cds-article-callout>
        <cds-article-callout area="es" eyebrow="Aus dem Code">
          <p>Wenn ein Modul mehr als drei verschiedene Kontexte bedient, ist es kein Modul mehr, sondern eine Sammlung. Refactoring beginnt mit ehrlicher Inventur, nicht mit dem Werkzeugkasten.</p>
        </cds-article-callout>
        <cds-article-callout area="wo" eyebrow="Beobachtung">
          <p>Wenn ein Veränderungsprojekt im Lenkungskreis hängt, liegt es selten an den Argumenten. Häufiger an einer Rolle, die nie geklärt wurde, und an der Schweigespirale, die daraus entsteht.</p>
        </cds-article-callout>
      </div>
    \`
  }),
  // Vier Bereiche, vier gemessene Hintergrund-/Akzentfarben (nicht angenommen): .article-callout
  // selbst (Hintergrund, Border-Links) ist von der Eyebrow-Spezifitätslücke NICHT betroffen, nur
  // die Eyebrow-Schrift/-Abstand (siehe Klassendoku).
  play: async ({
    canvasElement
  }) => {
    const asides = Array.from(canvasElement.querySelectorAll('aside.article-callout')) as HTMLElement[];
    await expect(asides).toHaveLength(4);
    const areas = asides.map(a => a.getAttribute('data-area'));
    await expect(areas).toEqual(['co', 'ki', 'es', 'wo']);
    const backgrounds = new Set(asides.map(a => getComputedStyle(a).backgroundColor));
    await expect(backgrounds.size).toBe(4);
    const borders = new Set(asides.map(a => getComputedStyle(a).borderLeftColor));
    await expect(borders.size).toBe(4);
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Ohne Eyebrow',
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    template: \`
      <cds-article-callout area="es">
        <p>Wenn ein Modul mehr als drei verschiedene Kontexte bedient, ist es kein Modul mehr, sondern eine Sammlung.</p>
      </cds-article-callout>
    \`
  }),
  // eyebrow ist Beiwerk mit Default '' → ohne Bindung entsteht kein .article-callout-eyebrow,
  // der projizierte Absatz bleibt trotzdem ein direktes Kind.
  play: async ({
    canvasElement
  }) => {
    const aside = canvasElement.querySelector('aside.article-callout') as HTMLElement;
    await expect(aside.querySelector('.article-callout-eyebrow')).toBeNull();
    await expect(aside.querySelectorAll(':scope > p')).toHaveLength(1);
  }
}`,...l.parameters?.docs?.source}}}})))()}init_article_callout_stories();export{s as Interaktiv,l as OhneEyebrow,c as ProBereich,u as __namedExportsOrder,o as default};