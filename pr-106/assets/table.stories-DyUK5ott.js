import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{B as n,D as r,G as i,O as a,P as o,Tn as s,bn as c,z as l}from"./angular-platform-BGeCprOl.js";var u;function init_table_component(){return(init_table_component=e((()=>{s(),r(),u=class TableComponent{caption=a.required();striped=a(!1);scrollLabel=a(``);accessibleName=o(()=>this.scrollLabel()||this.caption());static propDecorators={caption:[{type:i,args:[{isSignal:!0,alias:`caption`,required:!0,transform:void 0}]}],striped:[{type:i,args:[{isSignal:!0,alias:`striped`,required:!1,transform:void 0}]}],scrollLabel:[{type:i,args:[{isSignal:!0,alias:`scrollLabel`,required:!1,transform:void 0}]}]}},u=c([n({selector:`cds-table`,changeDetection:l.OnPush,template:`
    <div class="tbl-wrap" tabindex="0" role="region" [attr.aria-label]="accessibleName()">
      <table class="tbl" [class.tbl--striped]="striped()">
        <caption>
          {{
            caption()
          }}
        </caption>
        <ng-content></ng-content>
      </table>
    </div>
  `})],u)})))()}var d=t({Gestreift:()=>g,Interaktiv:()=>h,MitFusszeile:()=>v,MitZahlenspalte:()=>_,SchmalerViewport:()=>y,__namedExportsOrder:()=>b,default:()=>m}),f,p,m,h,g,_,v,y,b;function init_table_stories(){return(init_table_stories=e((()=>{init_table_component(),{userEvent:f,expect:p}=__STORYBOOK_MODULE_TEST__,m={title:`Komponenten/Tabelle/Tabelle`,component:u,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=40-1996`},layout:`padded`,docs:{description:{component:'Datentabelle mit horizontalem Scroll-Container (`.tbl`/`.tbl-wrap`, css/components.css:1462 bis 1480). Ausgezählt: außerhalb der Doku-Sektion `sec-table` selbst kommt `.tbl-wrap` nur zweimal vor, beide auf Beitragsseiten. Element-Selektor `cds-table` (ADR-0008-Standardfall): Keines der 5 `.tbl-wrap`-Vorkommen ist selbst ein direktes Grid-/Flex-Kind. Kein Daten-Input: der Konsument projiziert `<thead>`/`<tbody>`/`<tfoot>` unverändert per `<ng-content>`, weil die Beispielseiten darin Badges, Links und `data-num` setzen, keine reinen Strings. `caption` ist Pflicht (`input.required<string>()`): die eigene Doku (`tabelle.mdx`) nennt `<caption>` „Pflicht“, alle 5 realen `.tbl`-Vorkommen haben eine. ADR-0007 §2: `.tbl-wrap` ist deshalb immer per Tastatur erreichbar UND immer benannt (`tabindex="0"`, eigener `:focus-visible`-Ring, `role="region"` + `aria-label`): `scrollLabel` hat Vorrang, sonst `caption`, nie leer. `.tbl-sort` (sortierbare Spaltenköpfe) bleibt bewusst außen vor: die Klasse liefert nur den Button-Look, es gibt keine Sortierlogik dazu.'}}},args:{caption:`Beratungsleistungen im Überblick`,striped:!1,scrollLabel:``}},h={args:{caption:`Beratungsleistungen im Überblick`,scrollLabel:`Leistungsübersicht Tabelle`},render:e=>({props:e,template:`
      <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
        <thead>
          <tr>
            <th scope="col">Leistung</th>
            <th scope="col">Bereich</th>
            <th scope="col">Format</th>
            <th scope="col">Zielgruppe</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">KI-Readiness Assessment</th>
            <td><span class="badge" data-area="ki">Angewandte KI</span></td>
            <td>Workshop &amp; Analyse</td>
            <td style="color:var(--tx-secondary)">Geschäftsführung, IT-Leitung</td>
          </tr>
          <tr>
            <th scope="row">Organisationsentwicklung</th>
            <td><span class="badge" data-area="wo">Wirksame Organisationen</span></td>
            <td>Begleitprogramm</td>
            <td style="color:var(--tx-secondary)">Führungskräfte, Teams</td>
          </tr>
          <tr>
            <th scope="row">Software-Architektur Review</th>
            <td><span class="badge" data-area="es">Effektive Software</span></td>
            <td>Audit &amp; Bericht</td>
            <td style="color:var(--tx-secondary)">Entwicklungsteams, CTOs</td>
          </tr>
        </tbody>
      </cds-table>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`.tbl-wrap`);await p(t).toHaveAttribute(`tabindex`,`0`),await p(t).toHaveAttribute(`role`,`region`),await p(t).toHaveAttribute(`aria-label`,`Leistungsübersicht Tabelle`);let n=t.querySelector(`table`);await p(n).toHaveClass(`tbl`),await p(n).not.toHaveClass(`tbl--striped`),await p(n.parentElement).toBe(t);let r=Array.from(n.children);await p(r[0].tagName).toBe(`CAPTION`),await p(r[0]).toHaveTextContent(`Beratungsleistungen im Überblick`),await p(r[1].tagName).toBe(`THEAD`),await p(r[2].tagName).toBe(`TBODY`),await p(r).toHaveLength(3),document.body.focus(),await f.tab(),await p(document.activeElement).toBe(t)}},g={args:{caption:`Veranstaltungen & Workshops 2025`,striped:!0},render:e=>({props:e,template:`
      <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
        <thead>
          <tr>
            <th scope="col">Datum</th>
            <th scope="col">Veranstaltung</th>
            <th scope="col">Ort</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="white-space:nowrap;color:var(--tx-secondary)">15. Jan 2025</td>
            <th scope="row">KI im Unternehmensalltag, Einstiegsworkshop</th>
            <td style="color:var(--tx-secondary)">Frankfurt</td>
            <td><span class="badge badge-ok">Abgeschlossen</span></td>
          </tr>
          <tr>
            <td style="white-space:nowrap;color:var(--tx-secondary)">12. Feb 2025</td>
            <th scope="row">Führung in der Transformation</th>
            <td style="color:var(--tx-secondary)">Online</td>
            <td><span class="badge badge-ok">Abgeschlossen</span></td>
          </tr>
          <tr>
            <td style="white-space:nowrap;color:var(--tx-secondary)">24. Jun 2025</td>
            <th scope="row">Prompt Engineering für Fachteams</th>
            <td style="color:var(--tx-secondary)">Online</td>
            <td><span class="badge badge-neu">Anmeldung offen</span></td>
          </tr>
        </tbody>
      </cds-table>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`table`);await p(t).toHaveClass(`tbl`),await p(t).toHaveClass(`tbl--striped`);let n=e.querySelector(`.tbl-wrap`);await p(n).toHaveAttribute(`role`,`region`),await p(n).toHaveAttribute(`aria-label`,`Veranstaltungen & Workshops 2025`)}},_={name:`Mit Zahlenspalte`,args:{caption:`Beratungsleistungen im Überblick`,scrollLabel:`Leistungsübersicht mit Dauer`},parameters:{controls:{disable:!0}},render:e=>({props:e,template:`
      <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
        <thead>
          <tr>
            <th scope="col">Leistung</th>
            <th scope="col">Format</th>
            <th scope="col" data-num>Dauer (Tage)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">KI-Readiness Assessment</th>
            <td>Workshop &amp; Analyse</td>
            <td data-num>2</td>
          </tr>
          <tr>
            <th scope="row">Agile Transformation</th>
            <td>Coaching &amp; Training</td>
            <td data-num>180</td>
          </tr>
        </tbody>
      </cds-table>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`td[data-num]`);await p(getComputedStyle(t).textAlign).toBe(`right`),await p(getComputedStyle(t).fontVariantNumeric).toContain(`tabular-nums`)}},v={name:`Mit Fußzeile`,args:{caption:`Projektstunden nach Bereich`,scrollLabel:`Projektstunden Tabelle`},parameters:{controls:{disable:!0}},render:e=>({props:e,template:`
      <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
        <thead>
          <tr>
            <th scope="col">Bereich</th>
            <th scope="col" data-num>Stunden</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Angewandte KI</th>
            <td data-num>64</td>
          </tr>
          <tr>
            <th scope="row">Effektive Software</th>
            <td data-num>112</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Gesamt</th>
            <td data-num>176</td>
          </tr>
        </tfoot>
      </cds-table>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`table`),n=Array.from(t.children),r=n.map(e=>e.tagName);await p(r).toEqual([`CAPTION`,`THEAD`,`TBODY`,`TFOOT`]),await p(n[3]).toHaveTextContent(`Gesamt`),await p(n[3]).toHaveTextContent(`176`)}},y={name:`Schmaler Viewport`,args:{caption:`Beratungsleistungen im Überblick`,scrollLabel:`Leistungsübersicht Tabelle`},parameters:{controls:{disable:!0}},render:e=>({props:e,template:`
      <div style="max-width:280px">
        <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
          <thead>
            <tr>
              <th scope="col">Leistung</th>
              <th scope="col">Bereich</th>
              <th scope="col">Format</th>
              <th scope="col">Zielgruppe</th>
              <th scope="col">Dauer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">KI-Readiness Assessment</th>
              <td><span class="badge" data-area="ki">Angewandte KI</span></td>
              <td>Workshop &amp; Analyse</td>
              <td style="color:var(--tx-secondary)">Geschäftsführung, IT-Leitung</td>
              <td style="color:var(--tx-secondary)">2 Tage</td>
            </tr>
          </tbody>
        </cds-table>
      </div>
    `}),play:async({canvasElement:e})=>{let t=e.querySelector(`.tbl-wrap`);await p(t.scrollWidth).toBeGreaterThan(t.clientWidth),await p(t).toHaveAttribute(`tabindex`,`0`)}},b=[`Interaktiv`,`Gestreift`,`MitZahlenspalte`,`MitFusszeile`,`SchmalerViewport`],h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    caption: 'Beratungsleistungen im Überblick',
    scrollLabel: 'Leistungsübersicht Tabelle'
  },
  render: args => ({
    props: args,
    template: \`
      <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
        <thead>
          <tr>
            <th scope="col">Leistung</th>
            <th scope="col">Bereich</th>
            <th scope="col">Format</th>
            <th scope="col">Zielgruppe</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">KI-Readiness Assessment</th>
            <td><span class="badge" data-area="ki">Angewandte KI</span></td>
            <td>Workshop &amp; Analyse</td>
            <td style="color:var(--tx-secondary)">Geschäftsführung, IT-Leitung</td>
          </tr>
          <tr>
            <th scope="row">Organisationsentwicklung</th>
            <td><span class="badge" data-area="wo">Wirksame Organisationen</span></td>
            <td>Begleitprogramm</td>
            <td style="color:var(--tx-secondary)">Führungskräfte, Teams</td>
          </tr>
          <tr>
            <th scope="row">Software-Architektur Review</th>
            <td><span class="badge" data-area="es">Effektive Software</span></td>
            <td>Audit &amp; Bericht</td>
            <td style="color:var(--tx-secondary)">Entwicklungsteams, CTOs</td>
          </tr>
        </tbody>
      </cds-table>
    \`
  }),
  // Akzeptanzkriterien: Tabellenstruktur exakt wie vom CSS erwartet (<table class="tbl">
  // direkt unter <div class="tbl-wrap">, <caption> als erstes Kind, danach ohne
  // zusätzlichen Knoten dazwischen genau thead/tbody), Scroll-Container per Tab
  // erreichbar und benannt (scrollLabel hat Vorrang vor caption).
  play: async ({
    canvasElement
  }) => {
    const wrap = canvasElement.querySelector('.tbl-wrap') as HTMLElement;
    await expect(wrap).toHaveAttribute('tabindex', '0');
    await expect(wrap).toHaveAttribute('role', 'region');
    await expect(wrap).toHaveAttribute('aria-label', 'Leistungsübersicht Tabelle');
    const table = wrap.querySelector('table') as HTMLElement;
    await expect(table).toHaveClass('tbl');
    await expect(table).not.toHaveClass('tbl--striped');
    await expect(table.parentElement).toBe(wrap);

    // <caption> als erstes Kind der Tabelle, kein davorstehender Text/Element.
    const children = Array.from(table.children) as HTMLElement[];
    await expect(children[0].tagName).toBe('CAPTION');
    await expect(children[0]).toHaveTextContent('Beratungsleistungen im Überblick');
    // Direkt danach die projizierten Elemente, ohne fremden Knoten dazwischen:
    // <ng-content> fügt selbst kein DOM-Element ein.
    await expect(children[1].tagName).toBe('THEAD');
    await expect(children[2].tagName).toBe('TBODY');
    await expect(children).toHaveLength(3);

    // Scroll-Container per Tastatur erreichbar: Tab von document.body aus muss ihn
    // fokussieren (echte Tab-Reihenfolge, kein direktes .focus()).
    (document.body as HTMLElement).focus();
    await userEvent.tab();
    await expect(document.activeElement).toBe(wrap);
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    caption: 'Veranstaltungen & Workshops 2025',
    striped: true
  },
  render: args => ({
    props: args,
    template: \`
      <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
        <thead>
          <tr>
            <th scope="col">Datum</th>
            <th scope="col">Veranstaltung</th>
            <th scope="col">Ort</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="white-space:nowrap;color:var(--tx-secondary)">15. Jan 2025</td>
            <th scope="row">KI im Unternehmensalltag, Einstiegsworkshop</th>
            <td style="color:var(--tx-secondary)">Frankfurt</td>
            <td><span class="badge badge-ok">Abgeschlossen</span></td>
          </tr>
          <tr>
            <td style="white-space:nowrap;color:var(--tx-secondary)">12. Feb 2025</td>
            <th scope="row">Führung in der Transformation</th>
            <td style="color:var(--tx-secondary)">Online</td>
            <td><span class="badge badge-ok">Abgeschlossen</span></td>
          </tr>
          <tr>
            <td style="white-space:nowrap;color:var(--tx-secondary)">24. Jun 2025</td>
            <th scope="row">Prompt Engineering für Fachteams</th>
            <td style="color:var(--tx-secondary)">Online</td>
            <td><span class="badge badge-neu">Anmeldung offen</span></td>
          </tr>
        </tbody>
      </cds-table>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const table = canvasElement.querySelector('table') as HTMLElement;
    await expect(table).toHaveClass('tbl');
    await expect(table).toHaveClass('tbl--striped');

    // Ohne scrollLabel fällt der Name auf caption zurück.
    const wrap = canvasElement.querySelector('.tbl-wrap') as HTMLElement;
    await expect(wrap).toHaveAttribute('role', 'region');
    await expect(wrap).toHaveAttribute('aria-label', 'Veranstaltungen & Workshops 2025');
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Mit Zahlenspalte',
  args: {
    caption: 'Beratungsleistungen im Überblick',
    scrollLabel: 'Leistungsübersicht mit Dauer'
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  render: args => ({
    props: args,
    template: \`
      <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
        <thead>
          <tr>
            <th scope="col">Leistung</th>
            <th scope="col">Format</th>
            <th scope="col" data-num>Dauer (Tage)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">KI-Readiness Assessment</th>
            <td>Workshop &amp; Analyse</td>
            <td data-num>2</td>
          </tr>
          <tr>
            <th scope="row">Agile Transformation</th>
            <td>Coaching &amp; Training</td>
            <td data-num>180</td>
          </tr>
        </tbody>
      </cds-table>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const numCell = canvasElement.querySelector('td[data-num]') as HTMLElement;
    await expect(getComputedStyle(numCell).textAlign).toBe('right');
    await expect(getComputedStyle(numCell).fontVariantNumeric).toContain('tabular-nums');
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Mit Fußzeile',
  args: {
    caption: 'Projektstunden nach Bereich',
    scrollLabel: 'Projektstunden Tabelle'
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  render: args => ({
    props: args,
    template: \`
      <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
        <thead>
          <tr>
            <th scope="col">Bereich</th>
            <th scope="col" data-num>Stunden</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Angewandte KI</th>
            <td data-num>64</td>
          </tr>
          <tr>
            <th scope="row">Effektive Software</th>
            <td data-num>112</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Gesamt</th>
            <td data-num>176</td>
          </tr>
        </tfoot>
      </cds-table>
    \`
  }),
  // <tfoot> als letztes Kind nach <tbody>, unmittelbar (kein Knoten dazwischen).
  play: async ({
    canvasElement
  }) => {
    const table = canvasElement.querySelector('table') as HTMLElement;
    const children = Array.from(table.children) as HTMLElement[];
    const tags = children.map(el => el.tagName);
    await expect(tags).toEqual(['CAPTION', 'THEAD', 'TBODY', 'TFOOT']);
    await expect(children[3]).toHaveTextContent('Gesamt');
    await expect(children[3]).toHaveTextContent('176');
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Schmaler Viewport',
  args: {
    caption: 'Beratungsleistungen im Überblick',
    scrollLabel: 'Leistungsübersicht Tabelle'
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  render: args => ({
    props: args,
    template: \`
      <div style="max-width:280px">
        <cds-table [caption]="caption" [striped]="striped" [scrollLabel]="scrollLabel">
          <thead>
            <tr>
              <th scope="col">Leistung</th>
              <th scope="col">Bereich</th>
              <th scope="col">Format</th>
              <th scope="col">Zielgruppe</th>
              <th scope="col">Dauer</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">KI-Readiness Assessment</th>
              <td><span class="badge" data-area="ki">Angewandte KI</span></td>
              <td>Workshop &amp; Analyse</td>
              <td style="color:var(--tx-secondary)">Geschäftsführung, IT-Leitung</td>
              <td style="color:var(--tx-secondary)">2 Tage</td>
            </tr>
          </tbody>
        </cds-table>
      </div>
    \`
  }),
  play: async ({
    canvasElement
  }) => {
    const wrap = canvasElement.querySelector('.tbl-wrap') as HTMLElement;
    // Gemessen, nicht angenommen: der Inhalt ist breiter als der Container, der
    // Scroll-Container muss also tatsächlich scrollen können.
    await expect(wrap.scrollWidth).toBeGreaterThan(wrap.clientWidth);
    await expect(wrap).toHaveAttribute('tabindex', '0');
  }
}`,...y.parameters?.docs?.source}}}})))()}export{d as n,init_table_stories as t};