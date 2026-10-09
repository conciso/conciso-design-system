import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{B as t,D as n,G as r,O as i,Tn as a,bn as o,j as s,q as c,z as l}from"./angular-platform-BGeCprOl.js";import{n as u}from"./lucide-angular-CTBwqO1y.js";import{n as d}from"./cds-icons-DtWH1HnJ.js";var f;function init_compare_component(){return(init_compare_component=e((()=>{a(),n(),d(),f=class CompareComponent{summary=i.required();caption=i.required();rowsLabel=i(``);open=i(!1);columns=i.required();rows=i.required();toggled=s();onToggle(e){this.toggled.emit(e.target.open)}static propDecorators={summary:[{type:r,args:[{isSignal:!0,alias:`summary`,required:!0,transform:void 0}]}],caption:[{type:r,args:[{isSignal:!0,alias:`caption`,required:!0,transform:void 0}]}],rowsLabel:[{type:r,args:[{isSignal:!0,alias:`rowsLabel`,required:!1,transform:void 0}]}],open:[{type:r,args:[{isSignal:!0,alias:`open`,required:!1,transform:void 0}]}],columns:[{type:r,args:[{isSignal:!0,alias:`columns`,required:!0,transform:void 0}]}],rows:[{type:r,args:[{isSignal:!0,alias:`rows`,required:!0,transform:void 0}]}],toggled:[{type:c,args:[`toggled`]}]}},f=o([t({selector:`cds-compare`,changeDetection:l.OnPush,imports:[u],template:`
    <details class="ep-compare" [attr.open]="open() ? '' : null" (toggle)="onToggle($event)">
      <summary class="ep-compare-summary">
        {{ summary() }}
        <svg
          lucideChevronDown
          class="ep-compare-caret"
          focusable="false"
          [strokeWidth]="1.25"
        ></svg>
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
  `})],f)})))()}var p,m,h,g,_,v,y,b,x,S,C,w;function init_compare_stories(){return(init_compare_stories=e((()=>{init_compare_component(),{within:p,userEvent:m,expect:h,fn:g}=__STORYBOOK_MODULE_TEST__,_={title:`Komponenten/Tabelle/Vergleichstabelle`,component:f,tags:[`autodocs`,`angular`],parameters:{design:{type:`figma`,url:`https://www.figma.com/design/BQCBQwIDcconnYNpb2w9fn/Conciso-Design-System?node-id=4-5744`},layout:`padded`,docs:{description:{component:"Aufklappbare Vergleichstabelle für den zeilenweisen Direktvergleich mehrerer Pakete/Tarife (`.ep-compare*`, css/components.css:1275 bis 1294). Natives `<details>`/`<summary>` (standardmäßig zu), Tastaturbedienung und Toggle kommen vom Browser. **Mit Daten-Input, anders als `Komponenten/Tabelle/Tabelle` (`cds-table`)**: ausgezählt sind alle 22 Datenzellen des einzigen realen Vorkommens (11 Zeilen × 2 Spalten) entweder ein Ja/Nein-Marker (18×) oder eine kurze Angabe (4×), nie ein Badge oder Link, deshalb `columns`/`rows` statt `<ng-content>`. Ja/Nein-Zellen (`boolean`) tragen fest verdrahteten `.sr-only`-Text („Enthalten“/„Nicht enthalten“), Text-Zellen (`string`) rendern die Angabe unverändert. Die empfohlene Spalte wird über `columns[].pro` als `.ep-compare-pro` hervorgehoben (in `thead` UND `tbody`). `caption` ist Pflicht (`.sr-only`, wie in `tabelle.mdx` dokumentiert), `rowsLabel` (erste Kopfzelle) ist Beiwerk mit Default `''`; beide Abweichungen von der ursprünglichen Skizze sind in der Klassendoku begründet."}}}},v=[{label:`Core`},{label:`Pro`,pro:!0}],y=[{label:`Hosting in Deutschland`,cells:[!0,!0]},{label:`SSO, Nutzer- und Rechtemanagement`,cells:[!0,!0]},{label:`Lokale Modelle`,cells:[`bis 24 Mrd. Param.`,`bis 70 Mrd. Param.`]},{label:`OpenAI-Modelle über API-Key`,cells:[!0,!0]},{label:`Chatbots mit Modellvergleich`,cells:[!0,!0]},{label:`Websuche`,cells:[!0,!0]},{label:`LLM-Gateway für externe Cloud-Modelle`,cells:[!1,!0]},{label:`Eigene KI-Assistenten`,cells:[!1,!0]},{label:`Memory: Wissen über Chats hinweg`,cells:[!1,!0]},{label:`Anbindung an Confluence und SharePoint`,cells:[!1,!0]},{label:`Support pro Monat`,cells:[`30 Min.`,`2,5 Std.`]}],b={args:{summary:`Alle Funktionen vergleichen`,caption:`Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro`,rowsLabel:`Funktion`,open:!1,columns:v,rows:y,toggled:g()},play:async({canvasElement:e,args:t})=>{let n=p(e),r=e.querySelector(`details.ep-compare`),i=e.querySelector(`.ep-compare-caret`);await h(r).not.toHaveAttribute(`open`),await h(r.open).toBe(!1),await h(getComputedStyle(i).transform).toBe(`none`);let a=n.getByText(`Alle Funktionen vergleichen`);await m.click(a),await h(r).toHaveAttribute(`open`),await h(r.open).toBe(!0),await h(t.toggled).toHaveBeenCalledTimes(1),await h(t.toggled).toHaveBeenCalledWith(!0),await h(getComputedStyle(i).transform).not.toBe(`none`),e.querySelector(`table.ep-compare-table`).focus(),await h(r).toHaveAttribute(`open`);let o=e.querySelectorAll(`thead th.ep-compare-pro`);await h(o).toHaveLength(1),await h(o[0]).toHaveTextContent(`Pro`);let s=e.querySelectorAll(`tbody td.ep-compare-pro`);await h(s).toHaveLength(y.length);let c=e.querySelectorAll(`tbody tr:first-child td`);for(let e of Array.from(c))await h(e.querySelector(`.ep-compare-yes`)).toHaveTextContent(`✓`),await h(e).toHaveTextContent(`Enthalten`);let l=e.querySelector(`.ep-compare-no`);await h(l.parentElement).toHaveTextContent(`Nicht enthalten`)}},x={name:`Bereits offen`,args:{summary:`Alle Funktionen vergleichen`,caption:`Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro`,rowsLabel:`Funktion`,open:!0,columns:v,rows:y},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=e.querySelector(`details.ep-compare`);await h(t).toHaveAttribute(`open`),await h(t.open).toBe(!0);let n=e.querySelector(`.ep-compare-table-wrap`);await h(n.offsetHeight).toBeGreaterThan(0)}},S={name:`Mit Text-Zellen`,args:{summary:`Alle Funktionen vergleichen`,caption:`Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro`,rowsLabel:`Funktion`,open:!0,columns:v,rows:[{label:`Hosting in Deutschland`,cells:[!0,!0]},{label:`Lokale Modelle`,cells:[`bis 24 Mrd. Param.`,`bis 70 Mrd. Param.`]},{label:`Support pro Monat`,cells:[`30 Min.`,`2,5 Std.`]}]},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=p(e),n=t.getByText(`Lokale Modelle`).closest(`tr`).querySelectorAll(`td`);await h(n[0]).toHaveTextContent(`bis 24 Mrd. Param.`),await h(n[0].querySelector(`.ep-compare-yes, .ep-compare-no`)).toBeNull(),await h(n[1]).toHaveTextContent(`bis 70 Mrd. Param.`);let r=t.getByText(`Support pro Monat`).closest(`tr`).querySelectorAll(`td`);await h(r[0]).toHaveTextContent(`30 Min.`),await h(r[1]).toHaveTextContent(`2,5 Std.`)}},C={name:`Hervorgehobene Spalte`,args:{summary:`Alle Funktionen vergleichen`,caption:`Funktionsvergleich der Pakete AI.Box Core und AI.Box Pro`,rowsLabel:`Funktion`,open:!0,columns:v,rows:y},parameters:{controls:{disable:!0}},play:async({canvasElement:e})=>{let t=e.querySelectorAll(`thead th`),n=t[1],r=t[2];await h(r).toHaveClass(`ep-compare-pro`),await h(getComputedStyle(r).color).not.toBe(getComputedStyle(n).color),await h(getComputedStyle(r).borderBottomWidth).not.toBe(getComputedStyle(n).borderBottomWidth);let i=e.querySelector(`tbody tr`).querySelectorAll(`td`),a=i[0],o=i[1];await h(o).toHaveClass(`ep-compare-pro`),await h(getComputedStyle(o).backgroundColor).not.toBe(getComputedStyle(a).backgroundColor)}},w=[`Interaktiv`,`BereitsOffen`,`MitTextZellen`,`HervorgehobeneSpalte`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}}})))()}init_compare_stories();export{x as BereitsOffen,C as HervorgehobeneSpalte,b as Interaktiv,S as MitTextZellen,w as __namedExportsOrder,_ as default};