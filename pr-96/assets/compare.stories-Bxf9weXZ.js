import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{A as t,H as n,N as r,V as i,Y as a,fn as o,k as s,q as c,sn as l}from"./angular-platform-CAY__VLP.js";var u;function init_compare_component(){return(init_compare_component=e((()=>{o(),s(),u=class CompareComponent{summary=t.required();caption=t.required();rowsLabel=t(``);open=t(!1);columns=t.required();rows=t.required();toggled=r();onToggle(e){this.toggled.emit(e.target.open)}static propDecorators={summary:[{type:c,args:[{isSignal:!0,alias:`summary`,required:!0,transform:void 0}]}],caption:[{type:c,args:[{isSignal:!0,alias:`caption`,required:!0,transform:void 0}]}],rowsLabel:[{type:c,args:[{isSignal:!0,alias:`rowsLabel`,required:!1,transform:void 0}]}],open:[{type:c,args:[{isSignal:!0,alias:`open`,required:!1,transform:void 0}]}],columns:[{type:c,args:[{isSignal:!0,alias:`columns`,required:!0,transform:void 0}]}],rows:[{type:c,args:[{isSignal:!0,alias:`rows`,required:!0,transform:void 0}]}],toggled:[{type:a,args:[`toggled`]}]}},u=l([n({selector:`cds-compare`,changeDetection:i.OnPush,template:`
    <details class="ep-compare" [attr.open]="open() ? '' : null" (toggle)="onToggle($event)">
      <summary class="ep-compare-summary">
        {{ summary() }}
        <svg
          class="ep-compare-caret"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.25"
          aria-hidden="true"
          focusable="false"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <div class="ep-compare-table-wrap">
        <table class="ep-compare-table">
          <caption class="sr-only">
            {{
              caption()
            }}
          </caption>
          <thead>
            <tr>
              <th scope="col">{{ rowsLabel() }}</th>
              @for (column of columns(); track $index) {
                <th scope="col" [class.ep-compare-pro]="column.pro">{{ column.label }}</th>
              }
            </tr>
          </thead>
          <tbody>
            @for (row of rows(); track $index) {
              <tr>
                <th scope="row">{{ row.label }}</th>
                @for (cell of row.cells; track $index) {
                  <td [class.ep-compare-pro]="columns()[$index].pro">
                    @if (cell === true) {
                      <span class="ep-compare-yes" aria-hidden="true">✓</span
                      ><span class="sr-only">Enthalten</span>
                    } @else if (cell === false) {
                      <span class="ep-compare-no" aria-hidden="true">−</span
                      ><span class="sr-only">Nicht enthalten</span>
                    } @else {
                      {{ cell }}
                    }
                  </td>
                }
              </tr>
            }
          </tbody>
        </table>
      </div>
    </details>
  `})],u)})))()}var d,f,p,m,h,g,_,v,y,b,x,S;function init_compare_stories(){return(init_compare_stories=e((()=>{init_compare_component(),{within:d,userEvent:f,expect:p,fn:m}=__STORYBOOK_MODULE_TEST__,h={title:`Komponenten/Vergleichstabelle`,component:u,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5744`},layout:`padded`,docs:{description:{component:"Aufklappbare Vergleichstabelle für den zeilenweisen Direktvergleich mehrerer Pakete/Tarife (`.ep-compare*`, css/components.css:1275 bis 1294). Natives `<details>`/`<summary>` (standardmäßig zu), Tastaturbedienung und Toggle kommen vom Browser. **Mit Daten-Input, anders als `Komponenten/Tabelle` (`cds-table`)**: ausgezählt sind alle 22 Datenzellen des einzigen realen Vorkommens (11 Zeilen × 2 Spalten) entweder ein Ja/Nein-Marker (18×) oder eine kurze Angabe (4×), nie ein Badge oder Link, deshalb `columns`/`rows` statt `<ng-content>`. Ja/Nein-Zellen (`boolean`) tragen fest verdrahteten `.sr-only`-Text („Enthalten“/„Nicht enthalten“), Text-Zellen (`string`) rendern die Angabe unverändert. Die empfohlene Spalte wird über `columns[].pro` als `.ep-compare-pro` hervorgehoben (in `thead` UND `tbody`). `caption` ist Pflicht (`.sr-only`, wie in `tabelle.mdx` dokumentiert), `rowsLabel` (erste Kopfzelle) ist Beiwerk mit Default `''`; beide Abweichungen von der ursprünglichen Skizze sind in der Klassendoku begründet."}}}},g=[{label:`Core`},{label:`Pro`,pro:!0}],_=[{label:`Hosting in Deutschland`,cells:[!0,!0]},{label:`SSO, Nutzer- und Rechtemanagement`,cells:[!0,!0]},{label:`Lokale Modelle`,cells:[`bis 24 Mrd. Param.`,`bis 70 Mrd. Param.`]},{label:`OpenAI-Modelle über API-Key`,cells:[!0,!0]},{label:`Chatbots mit Modellvergleich`,cells:[!0,!0]},{label:`Websuche`,cells:[!0,!0]},{label:`LLM-Gateway für externe Cloud-Modelle`,cells:[!1,!0]},{label:`Eigene KI-Assistenten`,cells:[!1,!0]},{label:`Memory: Wissen über Chats hinweg`,cells:[!1,!0]},{label:`Anbindung an Confluence und SharePoint`,cells:[!1,!0]},{label:`Support pro Monat`,cells:[`30 Min.`,`2,5 Std.`]}],v={args:{summary:`Alle Funktionen vergleichen`,caption:`Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro`,rowsLabel:`Funktion`,open:!1,columns:g,rows:_,toggled:m()},play:async({canvasElement:e,args:t})=>{let n=d(e),r=e.querySelector(`details.ep-compare`),i=e.querySelector(`.ep-compare-caret`);await p(r).not.toHaveAttribute(`open`),await p(r.open).toBe(!1),await p(getComputedStyle(i).transform).toBe(`none`);let a=n.getByText(`Alle Funktionen vergleichen`);await f.click(a),await p(r).toHaveAttribute(`open`),await p(r.open).toBe(!0),await p(t.toggled).toHaveBeenCalledTimes(1),await p(t.toggled).toHaveBeenCalledWith(!0),await p(getComputedStyle(i).transform).not.toBe(`none`),e.querySelector(`table.ep-compare-table`).focus(),await p(r).toHaveAttribute(`open`);let o=e.querySelectorAll(`thead th.ep-compare-pro`);await p(o).toHaveLength(1),await p(o[0]).toHaveTextContent(`Pro`);let s=e.querySelectorAll(`tbody td.ep-compare-pro`);await p(s).toHaveLength(_.length);let c=e.querySelectorAll(`tbody tr:first-child td`);for(let e of Array.from(c))await p(e.querySelector(`.ep-compare-yes`)).toHaveTextContent(`✓`),await p(e).toHaveTextContent(`Enthalten`);let l=e.querySelector(`.ep-compare-no`);await p(l.parentElement).toHaveTextContent(`Nicht enthalten`)}},y={name:`Bereits offen`,args:{summary:`Alle Funktionen vergleichen`,caption:`Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro`,rowsLabel:`Funktion`,open:!0,columns:g,rows:_},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=e.querySelector(`details.ep-compare`);await p(t).toHaveAttribute(`open`),await p(t.open).toBe(!0);let n=e.querySelector(`.ep-compare-table-wrap`);await p(n.offsetHeight).toBeGreaterThan(0)}},b={name:`Mit Text-Zellen`,args:{summary:`Alle Funktionen vergleichen`,caption:`Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro`,rowsLabel:`Funktion`,open:!0,columns:g,rows:[{label:`Hosting in Deutschland`,cells:[!0,!0]},{label:`Lokale Modelle`,cells:[`bis 24 Mrd. Param.`,`bis 70 Mrd. Param.`]},{label:`Support pro Monat`,cells:[`30 Min.`,`2,5 Std.`]}]},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=d(e),n=t.getByText(`Lokale Modelle`).closest(`tr`).querySelectorAll(`td`);await p(n[0]).toHaveTextContent(`bis 24 Mrd. Param.`),await p(n[0].querySelector(`.ep-compare-yes, .ep-compare-no`)).toBeNull(),await p(n[1]).toHaveTextContent(`bis 70 Mrd. Param.`);let r=t.getByText(`Support pro Monat`).closest(`tr`).querySelectorAll(`td`);await p(r[0]).toHaveTextContent(`30 Min.`),await p(r[1]).toHaveTextContent(`2,5 Std.`)}},x={name:`Hervorgehobene Spalte`,args:{summary:`Alle Funktionen vergleichen`,caption:`Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro`,rowsLabel:`Funktion`,open:!0,columns:g,rows:_},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=e.querySelectorAll(`thead th`),n=t[1],r=t[2];await p(r).toHaveClass(`ep-compare-pro`),await p(getComputedStyle(r).color).not.toBe(getComputedStyle(n).color),await p(getComputedStyle(r).borderBottomWidth).not.toBe(getComputedStyle(n).borderBottomWidth);let i=e.querySelector(`tbody tr`).querySelectorAll(`td`),a=i[0],o=i[1];await p(o).toHaveClass(`ep-compare-pro`),await p(getComputedStyle(o).backgroundColor).not.toBe(getComputedStyle(a).backgroundColor)}},S=[`Interaktiv`,`BereitsOffen`,`MitTextZellen`,`HervorgehobeneSpalte`],v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    summary: 'Alle Funktionen vergleichen',
    caption: 'Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro',
    rowsLabel: 'Funktion',
    open: false,
    columns,
    rows,
    toggled: fn()
  },
  // Akzeptanzkriterien: Klick auf <summary> klappt auf und feuert toggled mit true, das Caret
  // dreht über [open], die pro-Spalte ist in thead und tbody markiert, Ja/Nein-Zellen haben
  // einen Textwert.
  play: async ({
    canvasElement,
    args
  }) => {
    const c = within(canvasElement);
    const details = canvasElement.querySelector('details.ep-compare') as HTMLDetailsElement;
    const caret = canvasElement.querySelector('.ep-compare-caret') as SVGElement;

    // Standardmäßig zu, Caret ungedreht.
    await expect(details).not.toHaveAttribute('open');
    await expect(details.open).toBe(false);
    await expect(getComputedStyle(caret).transform).toBe('none');

    // Klick auf <summary> klappt auf.
    const summary = c.getByText('Alle Funktionen vergleichen');
    await userEvent.click(summary);
    await expect(details).toHaveAttribute('open');
    await expect(details.open).toBe(true);
    await expect(args.toggled).toHaveBeenCalledTimes(1);
    await expect(args.toggled).toHaveBeenCalledWith(true);
    // Caret dreht über [open] (css/components.css:1281) — gemessen, nicht angenommen.
    await expect(getComputedStyle(caret).transform).not.toBe('none');

    // Ein zweiter, vom Toggle unabhängiger Interaktionsschritt (Fokus auf die Tabelle) löst eine
    // weitere Change-Detection aus; die Tabelle bleibt offen (siehe Klassendoku zu \`open\`).
    const table = canvasElement.querySelector('table.ep-compare-table') as HTMLElement;
    table.focus();
    await expect(details).toHaveAttribute('open');

    // pro-Spalte in thead UND tbody markiert.
    const headPro = canvasElement.querySelectorAll('thead th.ep-compare-pro');
    await expect(headPro).toHaveLength(1);
    await expect(headPro[0]).toHaveTextContent('Pro');
    const bodyPro = canvasElement.querySelectorAll('tbody td.ep-compare-pro');
    await expect(bodyPro).toHaveLength(rows.length);

    // Ja/Nein-Zellen haben einen für Screenreader lesbaren Textwert, nicht nur die Glyphe.
    const firstRowCells = canvasElement.querySelectorAll('tbody tr:first-child td');
    for (const cell of Array.from(firstRowCells)) {
      await expect(cell.querySelector('.ep-compare-yes')).toHaveTextContent('✓');
      await expect(cell).toHaveTextContent('Enthalten');
    }
    const noCell = canvasElement.querySelector('.ep-compare-no') as HTMLElement;
    await expect(noCell.parentElement).toHaveTextContent('Nicht enthalten');
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Bereits offen',
  args: {
    summary: 'Alle Funktionen vergleichen',
    caption: 'Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro',
    rowsLabel: 'Funktion',
    open: true,
    columns,
    rows
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  // open=true ist reiner Anfangszustand (siehe Klassendoku): schon beim ersten Rendern offen,
  // ohne Klick.
  play: async ({
    canvasElement
  }) => {
    const details = canvasElement.querySelector('details.ep-compare') as HTMLDetailsElement;
    await expect(details).toHaveAttribute('open');
    await expect(details.open).toBe(true);
    const wrap = canvasElement.querySelector('.ep-compare-table-wrap') as HTMLElement;
    await expect(wrap.offsetHeight).toBeGreaterThan(0);
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  name: 'Mit Text-Zellen',
  args: {
    summary: 'Alle Funktionen vergleichen',
    caption: 'Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro',
    rowsLabel: 'Funktion',
    open: true,
    columns,
    rows: [{
      label: 'Hosting in Deutschland',
      cells: [true, true]
    }, {
      label: 'Lokale Modelle',
      cells: ['bis 24 Mrd. Param.', 'bis 70 Mrd. Param.']
    }, {
      label: 'Support pro Monat',
      cells: ['30 Min.', '2,5 Std.']
    }]
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const modelleRow = c.getByText('Lokale Modelle').closest('tr') as HTMLElement;
    const cells = modelleRow.querySelectorAll('td');
    await expect(cells[0]).toHaveTextContent('bis 24 Mrd. Param.');
    await expect(cells[0].querySelector('.ep-compare-yes, .ep-compare-no')).toBeNull();
    await expect(cells[1]).toHaveTextContent('bis 70 Mrd. Param.');
    const supportRow = c.getByText('Support pro Monat').closest('tr') as HTMLElement;
    const supportCells = supportRow.querySelectorAll('td');
    await expect(supportCells[0]).toHaveTextContent('30 Min.');
    await expect(supportCells[1]).toHaveTextContent('2,5 Std.');
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Hervorgehobene Spalte',
  args: {
    summary: 'Alle Funktionen vergleichen',
    caption: 'Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro',
    rowsLabel: 'Funktion',
    open: true,
    columns,
    rows
  },
  parameters: {
    controls: {
      disable: true
    }
  },
  play: async ({
    canvasElement
  }) => {
    const headCells = canvasElement.querySelectorAll('thead th');
    const coreHead = headCells[1] as HTMLElement;
    const proHead = headCells[2] as HTMLElement;
    await expect(proHead).toHaveClass('ep-compare-pro');
    await expect(getComputedStyle(proHead).color).not.toBe(getComputedStyle(coreHead).color);
    await expect(getComputedStyle(proHead).borderBottomWidth).not.toBe(getComputedStyle(coreHead).borderBottomWidth);
    const firstRow = canvasElement.querySelector('tbody tr') as HTMLElement;
    const bodyCells = firstRow.querySelectorAll('td');
    const coreCell = bodyCells[0] as HTMLElement;
    const proCell = bodyCells[1] as HTMLElement;
    await expect(proCell).toHaveClass('ep-compare-pro');
    await expect(getComputedStyle(proCell).backgroundColor).not.toBe(getComputedStyle(coreCell).backgroundColor);
  }
}`,...x.parameters?.docs?.source}}}})))()}init_compare_stories();export{y as BereitsOffen,x as HervorgehobeneSpalte,v as Interaktiv,b as MitTextZellen,S as __namedExportsOrder,h as default};