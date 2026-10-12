import{n as e,r as t}from"./rolldown-runtime-D_-wTCJc.js";import{Ft as n,k as r}from"./angular-platform-CAY__VLP.js";var i=t({VollstaendigesFormular:()=>d,__namedExportsOrder:()=>f,default:()=>c}),a,o,s,c,l,u,d,f;function init_buchungsformular_stories(){return(init_buchungsformular_stories=e((()=>{r(),{expect:a,userEvent:o,within:s}=__STORYBOOK_MODULE_TEST__,c={title:`Komponenten/Buchungsformular`,parameters:{layout:`padded`,controls:{disable:!0},snapshot:{skip:!0},docs:{description:{component:"Buchungsformular: Komposition aus den Feldern der CSS-Schicht (`.field`, `.seg`, `.btn`)\nund den `.bk-*`-Klassen. Es gibt dafür kein eigenes Angular-Bauteil, die Story ist deshalb\nein reines Markup-Template. Die Verwendungsseite „Übersicht“ (`buchungsformular.mdx`)\nzeigt sie als „Vollständiges Formular“.\n\nDas Verhalten ist auf das Wesentliche begrenzt: bedingte Blöcke mit `hidden` und\nmitgeschaltetem `required`, Anzahl, Hinzufügen und Entfernen im Teilnehmenden-Repeater\nund die Preiszeile. Validierung, Fehlerübersicht und Erfolgszustand sind nicht Teil der Story,\nsie stehen als Pflicht-Verhalten auf der Verwendungsseite."}}}},l=1290,u=12,d={name:`Vollständiges Formular`,parameters:{docs:{description:{story:'Durchgehend Angewandte KI: Header `--ki-800`, `.btn-ki`, `.seg-ki`, Checkboxen mit `accent-color:var(--ki-ink)`. `data-accent="ki"` sitzt am umgebenden Container und tönt die Links im Formular mit.'}}},render:()=>{let e=n(!0),t=n(!1),r=n([0]),i=n(``),a=1,euro=e=>`${e.toLocaleString(`de-DE`)} €`;return{props:{firma:e,abweichend:t,personen:r,anzahlFehler:i,maxPlaetze:u,setFirma:t=>e.set(t),setAbweichend:e=>t.set(e),hinzufuegen:()=>{r().length>=u||(i.set(``),r.update(e=>[...e,a++]))},entfernen:e=>{r().length<2||(i.set(``),r.update(t=>t.filter((t,n)=>n!==e)))},setAnzahl:(e,t)=>{let n=Math.max(1,Math.min(u,parseInt(e,10)||1)),o=r().length;if(n<o){let e=Array.from(t.closest(`form`)?.querySelectorAll(`.bk-person`)??[]);for(let r=o-1;r>=n;r--)if(Array.from(e[r]?.querySelectorAll(`input`)??[]).some(e=>e.value.trim()!==``)){t.value=String(o),i.set(`Teilnehmende ${r+1} enthält noch Daten. Entferne den Block direkt über „Entfernen“.`);return}}i.set(``),t.value=String(n),r.update(e=>n>=e.length?[...e,...Array.from({length:n-e.length},()=>a++)]:e.slice(0,n))},plaetze:e=>e===1?`1 Platz`:`${e} Plätze`,summe:e=>`${euro(l)} × ${e} = ${euro(l*e)} zzgl. MwSt.`,gesamt:e=>euro(l*e),einzel:e=>`${e} × ${euro(l)}, zzgl. MwSt.`},template:`
        <div data-accent="ki" style="max-width:720px">
          <div class="ds-card">
            <div style="background:var(--ki-800);padding:var(--s4) var(--s6)">
              <div style="font:500 12px/16px var(--font);letter-spacing:.1em;text-transform:uppercase;color:var(--ki-200);margin-bottom:2px">Buchung · Angewandte KI</div>
              <div style="font:400 20px/28px var(--font-display);color:#fff">KI im Arbeitsalltag verankern</div>
            </div>
            <div class="ds-inner">
              <form data-booking [attr.data-price]="${l}" [attr.data-max]="maxPlaetze" novalidate aria-label="Training buchen" (submit)="$event.preventDefault()">
                <p style="font:var(--ty-body-sm);color:var(--tx-secondary);margin:0 0 var(--s6)">Mit <span class="req" aria-hidden="true">*</span> markierte Felder sind Pflichtfelder.</p>

                <fieldset class="bk-fieldset">
                  <legend class="bk-legend">Termin</legend>
                  <div class="field">
                    <label for="bk-termin">Durchführung <span class="req" aria-hidden="true">*</span></label>
                    <select id="bk-termin" name="termin" required aria-required="true">
                      <option value="" disabled selected>Bitte wählen…</option>
                      <option value="2026-04-14">14. bis 15. April 2026 · Dortmund</option>
                      <option value="2026-06-09">9. bis 10. Juni 2026 · Online</option>
                    </select>
                    <span class="helper">1.290 € pro Platz, zzgl. MwSt.</span>
                  </div>
                </fieldset>

                <fieldset class="bk-fieldset">
                  <legend class="bk-legend">Auftraggeber</legend>

                  <fieldset class="bk-subgroup">
                    <legend class="bk-sublegend">Anmeldung als</legend>
                    <div class="seg seg-ki">
                      <div class="seg-option">
                        <input type="radio" id="bk-typ-firma" name="bk-typ" value="firma" [checked]="firma()" (change)="setFirma(true)">
                        <label for="bk-typ-firma">Firma</label>
                      </div>
                      <div class="seg-option">
                        <input type="radio" id="bk-typ-privat" name="bk-typ" value="privat" [checked]="!firma()" (change)="setFirma(false)">
                        <label for="bk-typ-privat">Privatperson</label>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset class="bk-subgroup" [hidden]="!firma()">
                    <legend class="bk-sublegend">Firmendaten</legend>
                    <div class="field">
                      <label for="bk-firma">Firma <span class="req" aria-hidden="true">*</span></label>
                      <input type="text" id="bk-firma" name="firma" placeholder="Musterbau GmbH" data-required [attr.required]="firma() ? '' : null" [attr.aria-required]="firma() ? 'true' : null" autocomplete="organization" data-err="Bitte gib den Firmennamen an">
                    </div>
                    <div class="bk-grid-2">
                      <div class="field">
                        <label for="bk-abteilung">Abteilung</label>
                        <input type="text" id="bk-abteilung" name="abteilung" placeholder="Personalentwicklung" autocomplete="organization-title">
                      </div>
                      <div class="field">
                        <label for="bk-ustid">USt-IdNr.</label>
                        <input type="text" id="bk-ustid" name="ustid" placeholder="DE123456789">
                        <span class="helper">Nur nötig, wenn wir ins EU-Ausland fakturieren.</span>
                      </div>
                    </div>
                    <div class="field">
                      <label for="bk-bestellnr">Bestellnummer oder Kostenstelle</label>
                      <input type="text" id="bk-bestellnr" name="bestellnummer" placeholder="PO-2026-0815">
                      <span class="helper">Erscheint auf der Rechnung, falls Deine Buchhaltung das verlangt.</span>
                    </div>
                  </fieldset>

                  <fieldset class="bk-subgroup">
                    <legend class="bk-sublegend">Kontaktperson</legend>
                    <p class="bk-intro">Diese Person erhält Bestätigung und Rechnung. Ob sie selbst teilnimmt, legst Du weiter unten fest.</p>
                    <div class="bk-grid-2">
                      <div class="field">
                        <label for="bk-vorname">Vorname <span class="req" aria-hidden="true">*</span></label>
                        <input type="text" id="bk-vorname" name="vorname" placeholder="Maria" required aria-required="true" autocomplete="given-name" data-err="Bitte gib Deinen Vornamen an">
                      </div>
                      <div class="field">
                        <label for="bk-nachname">Nachname <span class="req" aria-hidden="true">*</span></label>
                        <input type="text" id="bk-nachname" name="nachname" placeholder="Müller" required aria-required="true" autocomplete="family-name" data-err="Bitte gib Deinen Nachnamen an">
                      </div>
                    </div>
                    <div class="field">
                      <label for="bk-email">E-Mail <span class="req" aria-hidden="true">*</span></label>
                      <input type="email" id="bk-email" name="email" placeholder="maria.mueller@unternehmen.de" required aria-required="true" autocomplete="email" data-err="Bitte eine gültige E-Mail-Adresse eingeben">
                    </div>
                    <div class="field">
                      <label for="bk-tel">Telefon</label>
                      <input type="tel" id="bk-tel" name="telefon" placeholder="+49 231 1234567" autocomplete="tel">
                      <span class="helper">Nur für Rückfragen zum Termin.</span>
                    </div>
                  </fieldset>
                </fieldset>

                <fieldset class="bk-fieldset">
                  <legend class="bk-legend">Rechnungsanschrift</legend>
                  <p class="bk-intro">Anschrift der buchenden Firma beziehungsweise Person.</p>
                  <div class="field">
                    <label for="bk-strasse">Straße und Hausnummer <span class="req" aria-hidden="true">*</span></label>
                    <input type="text" id="bk-strasse" name="strasse" placeholder="Pariser Bogen 7" required aria-required="true" autocomplete="street-address" data-err="Bitte gib Straße und Hausnummer an">
                  </div>
                  <div class="bk-grid-plz">
                    <div class="field">
                      <label for="bk-plz">PLZ <span class="req" aria-hidden="true">*</span></label>
                      <input type="text" id="bk-plz" name="plz" inputmode="numeric" placeholder="44269" required aria-required="true" autocomplete="postal-code" data-err="Bitte gib die Postleitzahl an">
                    </div>
                    <div class="field">
                      <label for="bk-ort">Ort <span class="req" aria-hidden="true">*</span></label>
                      <input type="text" id="bk-ort" name="ort" placeholder="Dortmund" required aria-required="true" autocomplete="address-level2" data-err="Bitte gib den Ort an">
                    </div>
                  </div>
                  <div class="field">
                    <label for="bk-land">Land</label>
                    <select id="bk-land" name="land" autocomplete="country-name">
                      <option selected>Deutschland</option>
                      <option>Österreich</option>
                      <option>Schweiz</option>
                      <option>Anderes Land</option>
                    </select>
                  </div>
                  <div class="bk-consent">
                    <input type="checkbox" id="bk-abweichend" [checked]="abweichend()" (change)="setAbweichend($any($event.target).checked)" style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
                    <label for="bk-abweichend">Die Rechnung geht an eine andere Adresse</label>
                  </div>

                  <fieldset class="bk-subgroup" [hidden]="!abweichend()">
                    <legend class="bk-sublegend">Abweichende Rechnungsadresse</legend>
                    <div class="field">
                      <label for="bk-r-empfaenger">Rechnungsempfänger <span class="req" aria-hidden="true">*</span></label>
                      <input type="text" id="bk-r-empfaenger" name="rechnung_empfaenger" placeholder="Musterbau GmbH, Zentrale Buchhaltung" data-required [attr.required]="abweichend() ? '' : null" [attr.aria-required]="abweichend() ? 'true' : null" autocomplete="section-rechnung organization" data-err="Bitte gib den Rechnungsempfänger an">
                    </div>
                    <div class="field">
                      <label for="bk-r-strasse">Straße und Hausnummer <span class="req" aria-hidden="true">*</span></label>
                      <input type="text" id="bk-r-strasse" name="rechnung_strasse" placeholder="Industriestraße 12" data-required [attr.required]="abweichend() ? '' : null" [attr.aria-required]="abweichend() ? 'true' : null" autocomplete="section-rechnung street-address" data-err="Bitte gib Straße und Hausnummer an">
                    </div>
                    <div class="bk-grid-plz">
                      <div class="field">
                        <label for="bk-r-plz">PLZ <span class="req" aria-hidden="true">*</span></label>
                        <input type="text" id="bk-r-plz" name="rechnung_plz" inputmode="numeric" placeholder="40213" data-required [attr.required]="abweichend() ? '' : null" [attr.aria-required]="abweichend() ? 'true' : null" autocomplete="section-rechnung postal-code" data-err="Bitte gib die Postleitzahl an">
                      </div>
                      <div class="field">
                        <label for="bk-r-ort">Ort <span class="req" aria-hidden="true">*</span></label>
                        <input type="text" id="bk-r-ort" name="rechnung_ort" placeholder="Düsseldorf" data-required [attr.required]="abweichend() ? '' : null" [attr.aria-required]="abweichend() ? 'true' : null" autocomplete="section-rechnung address-level2" data-err="Bitte gib den Ort an">
                      </div>
                    </div>
                    <div class="field">
                      <label for="bk-r-email">Rechnungs-E-Mail</label>
                      <input type="email" id="bk-r-email" name="rechnung_email" placeholder="rechnung@unternehmen.de" autocomplete="section-rechnung email">
                      <span class="helper">Leer lassen, wenn die Rechnung an die Kontakt-E-Mail gehen soll.</span>
                    </div>
                  </fieldset>
                </fieldset>

                <fieldset class="bk-fieldset">
                  <legend class="bk-legend">Teilnehmende</legend>
                  <div class="bk-consent">
                    <input type="checkbox" id="bk-selbst" checked style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
                    <label for="bk-selbst">Ich nehme selbst teil</label>
                  </div>
                  <div class="field bk-count" [class.has-error]="anzahlFehler()">
                    <label for="bk-anzahl">Plätze <span class="req" aria-hidden="true">*</span></label>
                    <input type="number" id="bk-anzahl" name="anzahl" [value]="personen().length" (change)="setAnzahl($any($event.target).value, $any($event.target))" min="1" [attr.max]="maxPlaetze" step="1" inputmode="numeric" required aria-required="true" [attr.aria-invalid]="anzahlFehler() ? 'true' : null" [attr.aria-describedby]="anzahlFehler() ? 'bk-anzahl-err' : null" data-err="Bitte gib eine Zahl zwischen 1 und 12 an">
                    @if (anzahlFehler()) {
                      <span class="error-msg" id="bk-anzahl-err" role="alert">{{ anzahlFehler() }}</span>
                    }
                  </div>
                  <div class="bk-summary" role="status">
                    <span>{{ plaetze(personen().length) }}</span>
                    <span class="bk-summary-total">{{ summe(personen().length) }}</span>
                  </div>

                  @for (id of personen(); track id; let i = $index) {
                    <fieldset class="bk-person">
                      <legend class="bk-person-title">Teilnehmende {{ i + 1 }}</legend>
                      @if (personen().length > 1) {
                        <button type="button" class="btn btn-text btn-sm btn-ki bk-person-remove" [attr.aria-label]="'Teilnehmende ' + (i + 1) + ' entfernen'" (click)="entfernen(i)">Entfernen</button>
                      }
                      <div class="bk-grid-2">
                        <div class="field">
                          <label [attr.for]="'bk-p' + id + '-vorname'">Vorname <span class="req" aria-hidden="true">*</span></label>
                          <input type="text" [id]="'bk-p' + id + '-vorname'" name="tn_vorname[]" placeholder="Maria" required aria-required="true" [attr.autocomplete]="'section-tn' + (i + 1) + ' given-name'" data-err="Bitte gib den Vornamen an">
                        </div>
                        <div class="field">
                          <label [attr.for]="'bk-p' + id + '-nachname'">Nachname <span class="req" aria-hidden="true">*</span></label>
                          <input type="text" [id]="'bk-p' + id + '-nachname'" name="tn_nachname[]" placeholder="Müller" required aria-required="true" [attr.autocomplete]="'section-tn' + (i + 1) + ' family-name'" data-err="Bitte gib den Nachnamen an">
                        </div>
                      </div>
                      <div class="field">
                        <label [attr.for]="'bk-p' + id + '-email'">E-Mail <span class="req" aria-hidden="true">*</span></label>
                        <input type="email" [id]="'bk-p' + id + '-email'" name="tn_email[]" placeholder="maria.mueller@unternehmen.de" required aria-required="true" [attr.autocomplete]="'section-tn' + (i + 1) + ' email'" data-err="Bitte eine gültige E-Mail-Adresse eingeben">
                        <span class="helper">Bekommt Unterlagen und Zugangsdaten direkt.</span>
                      </div>
                    </fieldset>
                  }

                  <button type="button" class="btn btn-outlined btn-sm btn-ki" [disabled]="personen().length >= maxPlaetze" (click)="hinzufuegen()">Weitere Person hinzufügen</button>
                </fieldset>

                <fieldset class="bk-fieldset">
                  <legend class="bk-legend">Abschluss</legend>
                  <div class="field">
                    <label for="bk-anmerkung">Anmerkungen</label>
                    <textarea id="bk-anmerkung" name="anmerkung" rows="3" placeholder="Worauf sollen wir achten?"></textarea>
                    <span class="helper">Zum Beispiel Ernährungswünsche oder Bedarf an barrierefreiem Zugang.</span>
                  </div>
                  <div class="bk-consent">
                    <input type="checkbox" id="bk-agb" aria-required="true" data-err="Bitte akzeptiere die Teilnahme- und Stornobedingungen" style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
                    <label for="bk-agb">Ich akzeptiere die <a class="body-link" href="#">Teilnahme- und Stornobedingungen</a>. <span class="req" aria-hidden="true">*</span></label>
                  </div>
                  <div class="bk-consent">
                    <input type="checkbox" id="bk-ds" aria-required="true" data-err="Bitte stimme der Verarbeitung zu" style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
                    <label for="bk-ds">Ich bin einverstanden, dass meine Angaben zur Abwicklung der Buchung verwendet werden. <a class="body-link" href="#">Datenschutzhinweise</a> <span class="req" aria-hidden="true">*</span></label>
                  </div>
                  <div class="bk-consent bk-consent-optional">
                    <input type="checkbox" id="bk-cl" style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
                    <label for="bk-cl">Schick mir alle drei Monate den Contentletter. Jederzeit abmeldbar.</label>
                  </div>
                  <div class="bk-order">
                    <p class="bk-order-title">Das buchst Du</p>
                    <dl class="bk-order-list">
                      <div><dt>Training</dt><dd>KI im Arbeitsalltag verankern, zwei Tage</dd></div>
                      <div><dt>Termin</dt><dd data-empty>Noch nicht gewählt</dd></div>
                      <div><dt>Auftraggeber</dt><dd data-empty>Noch nicht ausgefüllt</dd></div>
                      <div><dt>Plätze</dt><dd>{{ personen().length }}</dd></div>
                    </dl>
                    <div class="bk-order-total">
                      <span class="bk-order-total-label">Gesamt</span>
                      <span class="bk-order-total-value">{{ gesamt(personen().length) }}</span>
                    </div>
                    <p class="bk-order-note">{{ einzel(personen().length) }}</p>
                  </div>
                  <button type="submit" class="btn btn-filled btn-ki btn-full">Zahlungspflichtig buchen</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      `}},play:async({canvasElement:e})=>{let t=s(e),n=e.querySelector(`#bk-firma`),r=e.querySelector(`#bk-r-empfaenger`);if(!n||!r)throw Error(`Bedingte Felder fehlen im Formular.`);await a(t.getByRole(`group`,{name:`Firmendaten`})).toBeVisible(),await a(n).toBeRequired(),await a(t.queryByRole(`group`,{name:`Abweichende Rechnungsadresse`})).toBeNull(),await a(r).not.toBeRequired(),await o.click(t.getByRole(`radio`,{name:`Privatperson`})),await a(t.queryByRole(`group`,{name:`Firmendaten`})).toBeNull(),await a(n).not.toBeRequired(),await a(n).not.toHaveAttribute(`aria-required`),await o.click(t.getByRole(`radio`,{name:`Firma`})),await a(t.getByRole(`group`,{name:`Firmendaten`})).toBeVisible(),await a(n).toBeRequired(),await o.click(t.getByRole(`checkbox`,{name:/andere Adresse/})),await a(t.getByRole(`group`,{name:`Abweichende Rechnungsadresse`})).toBeVisible(),await a(r).toBeRequired(),await a(r).toHaveAttribute(`aria-required`,`true`),await o.click(t.getByRole(`button`,{name:`Weitere Person hinzufügen`})),await a(t.getByRole(`group`,{name:`Teilnehmende 2`})).toBeVisible(),await a(t.getByText(`2 Plätze`)).toBeVisible(),await o.click(t.getByRole(`button`,{name:`Teilnehmende 2 entfernen`})),await a(t.queryByRole(`group`,{name:`Teilnehmende 2`})).toBeNull(),await a(t.getByText(`1 Platz`)).toBeVisible();let i=t.getByRole(`spinbutton`,{name:/Plätze/});await o.click(t.getByRole(`button`,{name:`Weitere Person hinzufügen`}));let c=s(t.getByRole(`group`,{name:`Teilnehmende 2`}));await o.type(c.getByLabelText(/Vorname/),`Max`),await o.clear(i),await o.type(i,`1`),await o.tab(),await a(t.getByRole(`group`,{name:`Teilnehmende 2`})).toBeVisible(),await a(i).toHaveValue(2),await a(i).toHaveAttribute(`aria-invalid`,`true`),await a(t.getByRole(`alert`)).toHaveTextContent(`Teilnehmende 2 enthält noch Daten`),await a(t.getByText(`2 Plätze`)).toBeVisible(),await o.clear(c.getByLabelText(/Vorname/)),await o.clear(i),await o.type(i,`1`),await o.tab(),await a(t.queryByRole(`group`,{name:`Teilnehmende 2`})).toBeNull(),await a(i).toHaveValue(1),await a(t.queryByRole(`alert`)).toBeNull()}},f=[`VollstaendigesFormular`],d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  name: 'Vollständiges Formular',
  parameters: {
    docs: {
      description: {
        story: 'Durchgehend Angewandte KI: Header \`--ki-800\`, \`.btn-ki\`, \`.seg-ki\`, Checkboxen mit ' + '\`accent-color:var(--ki-ink)\`. \`data-accent="ki"\` sitzt am umgebenden Container und ' + 'tönt die Links im Formular mit.'
      }
    }
  },
  render: () => {
    const firma = signal(true);
    const abweichend = signal(false);
    const personen = signal<number[]>([0]);
    const anzahlFehler = signal('');
    let naechsteId = 1;
    const euro = (n: number): string => \`\${n.toLocaleString('de-DE')} €\`;
    return {
      props: {
        firma,
        abweichend,
        personen,
        anzahlFehler,
        maxPlaetze: MAX_PLAETZE,
        setFirma: (wert: boolean) => firma.set(wert),
        setAbweichend: (wert: boolean) => abweichend.set(wert),
        hinzufuegen: () => {
          if (personen().length >= MAX_PLAETZE) return;
          anzahlFehler.set('');
          personen.update(liste => [...liste, naechsteId++]);
        },
        entfernen: (position: number) => {
          if (personen().length < 2) return;
          anzahlFehler.set('');
          personen.update(liste => liste.filter((_, index) => index !== position));
        },
        // Verringern kürzt nur leere Blöcke am Ende. Enthält einer noch Daten, bleibt die
        // Anzahl stehen und eine Fehlermeldung nennt den Block (Repeater-Verhalten der Doku).
        setAnzahl: (roh: string, feld: HTMLInputElement) => {
          const ziel = Math.max(1, Math.min(MAX_PLAETZE, parseInt(roh, 10) || 1));
          const aktuell = personen().length;
          if (ziel < aktuell) {
            const bloecke = Array.from(feld.closest('form')?.querySelectorAll<HTMLElement>('.bk-person') ?? []);
            for (let i = aktuell - 1; i >= ziel; i--) {
              const belegt = Array.from(bloecke[i]?.querySelectorAll('input') ?? []).some(eingabe => eingabe.value.trim() !== '');
              if (belegt) {
                feld.value = String(aktuell);
                anzahlFehler.set(\`Teilnehmende \${i + 1} enthält noch Daten. Entferne den Block direkt über „Entfernen“.\`);
                return;
              }
            }
          }
          anzahlFehler.set('');
          feld.value = String(ziel);
          personen.update(liste => ziel >= liste.length ? [...liste, ...Array.from({
            length: ziel - liste.length
          }, () => naechsteId++)] : liste.slice(0, ziel));
        },
        plaetze: (n: number) => n === 1 ? '1 Platz' : \`\${n} Plätze\`,
        summe: (n: number) => \`\${euro(PREIS_PRO_PLATZ)} × \${n} = \${euro(PREIS_PRO_PLATZ * n)} zzgl. MwSt.\`,
        gesamt: (n: number) => euro(PREIS_PRO_PLATZ * n),
        einzel: (n: number) => \`\${n} × \${euro(PREIS_PRO_PLATZ)}, zzgl. MwSt.\`
      },
      template: \`
        <div data-accent="ki" style="max-width:720px">
          <div class="ds-card">
            <div style="background:var(--ki-800);padding:var(--s4) var(--s6)">
              <div style="font:500 12px/16px var(--font);letter-spacing:.1em;text-transform:uppercase;color:var(--ki-200);margin-bottom:2px">Buchung · Angewandte KI</div>
              <div style="font:400 20px/28px var(--font-display);color:#fff">KI im Arbeitsalltag verankern</div>
            </div>
            <div class="ds-inner">
              <form data-booking [attr.data-price]="\${PREIS_PRO_PLATZ}" [attr.data-max]="maxPlaetze" novalidate aria-label="Training buchen" (submit)="$event.preventDefault()">
                <p style="font:var(--ty-body-sm);color:var(--tx-secondary);margin:0 0 var(--s6)">Mit <span class="req" aria-hidden="true">*</span> markierte Felder sind Pflichtfelder.</p>

                <fieldset class="bk-fieldset">
                  <legend class="bk-legend">Termin</legend>
                  <div class="field">
                    <label for="bk-termin">Durchführung <span class="req" aria-hidden="true">*</span></label>
                    <select id="bk-termin" name="termin" required aria-required="true">
                      <option value="" disabled selected>Bitte wählen…</option>
                      <option value="2026-04-14">14. bis 15. April 2026 · Dortmund</option>
                      <option value="2026-06-09">9. bis 10. Juni 2026 · Online</option>
                    </select>
                    <span class="helper">1.290 € pro Platz, zzgl. MwSt.</span>
                  </div>
                </fieldset>

                <fieldset class="bk-fieldset">
                  <legend class="bk-legend">Auftraggeber</legend>

                  <fieldset class="bk-subgroup">
                    <legend class="bk-sublegend">Anmeldung als</legend>
                    <div class="seg seg-ki">
                      <div class="seg-option">
                        <input type="radio" id="bk-typ-firma" name="bk-typ" value="firma" [checked]="firma()" (change)="setFirma(true)">
                        <label for="bk-typ-firma">Firma</label>
                      </div>
                      <div class="seg-option">
                        <input type="radio" id="bk-typ-privat" name="bk-typ" value="privat" [checked]="!firma()" (change)="setFirma(false)">
                        <label for="bk-typ-privat">Privatperson</label>
                      </div>
                    </div>
                  </fieldset>

                  <fieldset class="bk-subgroup" [hidden]="!firma()">
                    <legend class="bk-sublegend">Firmendaten</legend>
                    <div class="field">
                      <label for="bk-firma">Firma <span class="req" aria-hidden="true">*</span></label>
                      <input type="text" id="bk-firma" name="firma" placeholder="Musterbau GmbH" data-required [attr.required]="firma() ? '' : null" [attr.aria-required]="firma() ? 'true' : null" autocomplete="organization" data-err="Bitte gib den Firmennamen an">
                    </div>
                    <div class="bk-grid-2">
                      <div class="field">
                        <label for="bk-abteilung">Abteilung</label>
                        <input type="text" id="bk-abteilung" name="abteilung" placeholder="Personalentwicklung" autocomplete="organization-title">
                      </div>
                      <div class="field">
                        <label for="bk-ustid">USt-IdNr.</label>
                        <input type="text" id="bk-ustid" name="ustid" placeholder="DE123456789">
                        <span class="helper">Nur nötig, wenn wir ins EU-Ausland fakturieren.</span>
                      </div>
                    </div>
                    <div class="field">
                      <label for="bk-bestellnr">Bestellnummer oder Kostenstelle</label>
                      <input type="text" id="bk-bestellnr" name="bestellnummer" placeholder="PO-2026-0815">
                      <span class="helper">Erscheint auf der Rechnung, falls Deine Buchhaltung das verlangt.</span>
                    </div>
                  </fieldset>

                  <fieldset class="bk-subgroup">
                    <legend class="bk-sublegend">Kontaktperson</legend>
                    <p class="bk-intro">Diese Person erhält Bestätigung und Rechnung. Ob sie selbst teilnimmt, legst Du weiter unten fest.</p>
                    <div class="bk-grid-2">
                      <div class="field">
                        <label for="bk-vorname">Vorname <span class="req" aria-hidden="true">*</span></label>
                        <input type="text" id="bk-vorname" name="vorname" placeholder="Maria" required aria-required="true" autocomplete="given-name" data-err="Bitte gib Deinen Vornamen an">
                      </div>
                      <div class="field">
                        <label for="bk-nachname">Nachname <span class="req" aria-hidden="true">*</span></label>
                        <input type="text" id="bk-nachname" name="nachname" placeholder="Müller" required aria-required="true" autocomplete="family-name" data-err="Bitte gib Deinen Nachnamen an">
                      </div>
                    </div>
                    <div class="field">
                      <label for="bk-email">E-Mail <span class="req" aria-hidden="true">*</span></label>
                      <input type="email" id="bk-email" name="email" placeholder="maria.mueller@unternehmen.de" required aria-required="true" autocomplete="email" data-err="Bitte eine gültige E-Mail-Adresse eingeben">
                    </div>
                    <div class="field">
                      <label for="bk-tel">Telefon</label>
                      <input type="tel" id="bk-tel" name="telefon" placeholder="+49 231 1234567" autocomplete="tel">
                      <span class="helper">Nur für Rückfragen zum Termin.</span>
                    </div>
                  </fieldset>
                </fieldset>

                <fieldset class="bk-fieldset">
                  <legend class="bk-legend">Rechnungsanschrift</legend>
                  <p class="bk-intro">Anschrift der buchenden Firma beziehungsweise Person.</p>
                  <div class="field">
                    <label for="bk-strasse">Straße und Hausnummer <span class="req" aria-hidden="true">*</span></label>
                    <input type="text" id="bk-strasse" name="strasse" placeholder="Pariser Bogen 7" required aria-required="true" autocomplete="street-address" data-err="Bitte gib Straße und Hausnummer an">
                  </div>
                  <div class="bk-grid-plz">
                    <div class="field">
                      <label for="bk-plz">PLZ <span class="req" aria-hidden="true">*</span></label>
                      <input type="text" id="bk-plz" name="plz" inputmode="numeric" placeholder="44269" required aria-required="true" autocomplete="postal-code" data-err="Bitte gib die Postleitzahl an">
                    </div>
                    <div class="field">
                      <label for="bk-ort">Ort <span class="req" aria-hidden="true">*</span></label>
                      <input type="text" id="bk-ort" name="ort" placeholder="Dortmund" required aria-required="true" autocomplete="address-level2" data-err="Bitte gib den Ort an">
                    </div>
                  </div>
                  <div class="field">
                    <label for="bk-land">Land</label>
                    <select id="bk-land" name="land" autocomplete="country-name">
                      <option selected>Deutschland</option>
                      <option>Österreich</option>
                      <option>Schweiz</option>
                      <option>Anderes Land</option>
                    </select>
                  </div>
                  <div class="bk-consent">
                    <input type="checkbox" id="bk-abweichend" [checked]="abweichend()" (change)="setAbweichend($any($event.target).checked)" style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
                    <label for="bk-abweichend">Die Rechnung geht an eine andere Adresse</label>
                  </div>

                  <fieldset class="bk-subgroup" [hidden]="!abweichend()">
                    <legend class="bk-sublegend">Abweichende Rechnungsadresse</legend>
                    <div class="field">
                      <label for="bk-r-empfaenger">Rechnungsempfänger <span class="req" aria-hidden="true">*</span></label>
                      <input type="text" id="bk-r-empfaenger" name="rechnung_empfaenger" placeholder="Musterbau GmbH, Zentrale Buchhaltung" data-required [attr.required]="abweichend() ? '' : null" [attr.aria-required]="abweichend() ? 'true' : null" autocomplete="section-rechnung organization" data-err="Bitte gib den Rechnungsempfänger an">
                    </div>
                    <div class="field">
                      <label for="bk-r-strasse">Straße und Hausnummer <span class="req" aria-hidden="true">*</span></label>
                      <input type="text" id="bk-r-strasse" name="rechnung_strasse" placeholder="Industriestraße 12" data-required [attr.required]="abweichend() ? '' : null" [attr.aria-required]="abweichend() ? 'true' : null" autocomplete="section-rechnung street-address" data-err="Bitte gib Straße und Hausnummer an">
                    </div>
                    <div class="bk-grid-plz">
                      <div class="field">
                        <label for="bk-r-plz">PLZ <span class="req" aria-hidden="true">*</span></label>
                        <input type="text" id="bk-r-plz" name="rechnung_plz" inputmode="numeric" placeholder="40213" data-required [attr.required]="abweichend() ? '' : null" [attr.aria-required]="abweichend() ? 'true' : null" autocomplete="section-rechnung postal-code" data-err="Bitte gib die Postleitzahl an">
                      </div>
                      <div class="field">
                        <label for="bk-r-ort">Ort <span class="req" aria-hidden="true">*</span></label>
                        <input type="text" id="bk-r-ort" name="rechnung_ort" placeholder="Düsseldorf" data-required [attr.required]="abweichend() ? '' : null" [attr.aria-required]="abweichend() ? 'true' : null" autocomplete="section-rechnung address-level2" data-err="Bitte gib den Ort an">
                      </div>
                    </div>
                    <div class="field">
                      <label for="bk-r-email">Rechnungs-E-Mail</label>
                      <input type="email" id="bk-r-email" name="rechnung_email" placeholder="rechnung@unternehmen.de" autocomplete="section-rechnung email">
                      <span class="helper">Leer lassen, wenn die Rechnung an die Kontakt-E-Mail gehen soll.</span>
                    </div>
                  </fieldset>
                </fieldset>

                <fieldset class="bk-fieldset">
                  <legend class="bk-legend">Teilnehmende</legend>
                  <div class="bk-consent">
                    <input type="checkbox" id="bk-selbst" checked style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
                    <label for="bk-selbst">Ich nehme selbst teil</label>
                  </div>
                  <div class="field bk-count" [class.has-error]="anzahlFehler()">
                    <label for="bk-anzahl">Plätze <span class="req" aria-hidden="true">*</span></label>
                    <input type="number" id="bk-anzahl" name="anzahl" [value]="personen().length" (change)="setAnzahl($any($event.target).value, $any($event.target))" min="1" [attr.max]="maxPlaetze" step="1" inputmode="numeric" required aria-required="true" [attr.aria-invalid]="anzahlFehler() ? 'true' : null" [attr.aria-describedby]="anzahlFehler() ? 'bk-anzahl-err' : null" data-err="Bitte gib eine Zahl zwischen 1 und 12 an">
                    @if (anzahlFehler()) {
                      <span class="error-msg" id="bk-anzahl-err" role="alert">{{ anzahlFehler() }}</span>
                    }
                  </div>
                  <div class="bk-summary" role="status">
                    <span>{{ plaetze(personen().length) }}</span>
                    <span class="bk-summary-total">{{ summe(personen().length) }}</span>
                  </div>

                  @for (id of personen(); track id; let i = $index) {
                    <fieldset class="bk-person">
                      <legend class="bk-person-title">Teilnehmende {{ i + 1 }}</legend>
                      @if (personen().length > 1) {
                        <button type="button" class="btn btn-text btn-sm btn-ki bk-person-remove" [attr.aria-label]="'Teilnehmende ' + (i + 1) + ' entfernen'" (click)="entfernen(i)">Entfernen</button>
                      }
                      <div class="bk-grid-2">
                        <div class="field">
                          <label [attr.for]="'bk-p' + id + '-vorname'">Vorname <span class="req" aria-hidden="true">*</span></label>
                          <input type="text" [id]="'bk-p' + id + '-vorname'" name="tn_vorname[]" placeholder="Maria" required aria-required="true" [attr.autocomplete]="'section-tn' + (i + 1) + ' given-name'" data-err="Bitte gib den Vornamen an">
                        </div>
                        <div class="field">
                          <label [attr.for]="'bk-p' + id + '-nachname'">Nachname <span class="req" aria-hidden="true">*</span></label>
                          <input type="text" [id]="'bk-p' + id + '-nachname'" name="tn_nachname[]" placeholder="Müller" required aria-required="true" [attr.autocomplete]="'section-tn' + (i + 1) + ' family-name'" data-err="Bitte gib den Nachnamen an">
                        </div>
                      </div>
                      <div class="field">
                        <label [attr.for]="'bk-p' + id + '-email'">E-Mail <span class="req" aria-hidden="true">*</span></label>
                        <input type="email" [id]="'bk-p' + id + '-email'" name="tn_email[]" placeholder="maria.mueller@unternehmen.de" required aria-required="true" [attr.autocomplete]="'section-tn' + (i + 1) + ' email'" data-err="Bitte eine gültige E-Mail-Adresse eingeben">
                        <span class="helper">Bekommt Unterlagen und Zugangsdaten direkt.</span>
                      </div>
                    </fieldset>
                  }

                  <button type="button" class="btn btn-outlined btn-sm btn-ki" [disabled]="personen().length >= maxPlaetze" (click)="hinzufuegen()">Weitere Person hinzufügen</button>
                </fieldset>

                <fieldset class="bk-fieldset">
                  <legend class="bk-legend">Abschluss</legend>
                  <div class="field">
                    <label for="bk-anmerkung">Anmerkungen</label>
                    <textarea id="bk-anmerkung" name="anmerkung" rows="3" placeholder="Worauf sollen wir achten?"></textarea>
                    <span class="helper">Zum Beispiel Ernährungswünsche oder Bedarf an barrierefreiem Zugang.</span>
                  </div>
                  <div class="bk-consent">
                    <input type="checkbox" id="bk-agb" aria-required="true" data-err="Bitte akzeptiere die Teilnahme- und Stornobedingungen" style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
                    <label for="bk-agb">Ich akzeptiere die <a class="body-link" href="#">Teilnahme- und Stornobedingungen</a>. <span class="req" aria-hidden="true">*</span></label>
                  </div>
                  <div class="bk-consent">
                    <input type="checkbox" id="bk-ds" aria-required="true" data-err="Bitte stimme der Verarbeitung zu" style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
                    <label for="bk-ds">Ich bin einverstanden, dass meine Angaben zur Abwicklung der Buchung verwendet werden. <a class="body-link" href="#">Datenschutzhinweise</a> <span class="req" aria-hidden="true">*</span></label>
                  </div>
                  <div class="bk-consent bk-consent-optional">
                    <input type="checkbox" id="bk-cl" style="width:18px;height:18px;margin-top:2px;accent-color:var(--ki-ink);flex-shrink:0;cursor:pointer">
                    <label for="bk-cl">Schick mir alle drei Monate den Contentletter. Jederzeit abmeldbar.</label>
                  </div>
                  <div class="bk-order">
                    <p class="bk-order-title">Das buchst Du</p>
                    <dl class="bk-order-list">
                      <div><dt>Training</dt><dd>KI im Arbeitsalltag verankern, zwei Tage</dd></div>
                      <div><dt>Termin</dt><dd data-empty>Noch nicht gewählt</dd></div>
                      <div><dt>Auftraggeber</dt><dd data-empty>Noch nicht ausgefüllt</dd></div>
                      <div><dt>Plätze</dt><dd>{{ personen().length }}</dd></div>
                    </dl>
                    <div class="bk-order-total">
                      <span class="bk-order-total-label">Gesamt</span>
                      <span class="bk-order-total-value">{{ gesamt(personen().length) }}</span>
                    </div>
                    <p class="bk-order-note">{{ einzel(personen().length) }}</p>
                  </div>
                  <button type="submit" class="btn btn-filled btn-ki btn-full">Zahlungspflichtig buchen</button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      \`
    };
  },
  // Bedingte Blöcke: „Privatperson“ blendet Firmendaten aus und nimmt \`required\` vom
  // Firmenfeld, die Checkbox für die abweichende Rechnungsadresse blendet ihren Block ein
  // und macht dessen Felder zu Pflichtfeldern. Der Repeater ergänzt und entfernt Blöcke.
  play: async ({
    canvasElement
  }) => {
    const c = within(canvasElement);
    const firmenfeld = canvasElement.querySelector<HTMLInputElement>('#bk-firma');
    const empfaenger = canvasElement.querySelector<HTMLInputElement>('#bk-r-empfaenger');
    if (!firmenfeld || !empfaenger) throw new Error('Bedingte Felder fehlen im Formular.');

    // Ausgangszustand: Firma gewählt, Firmendaten sichtbar und Pflicht, Rechnungsblock verborgen.
    await expect(c.getByRole('group', {
      name: 'Firmendaten'
    })).toBeVisible();
    await expect(firmenfeld).toBeRequired();
    await expect(c.queryByRole('group', {
      name: 'Abweichende Rechnungsadresse'
    })).toBeNull();
    await expect(empfaenger).not.toBeRequired();

    // „Privatperson“: Block verschwindet, das Pflichtfeld blockiert nicht mehr.
    await userEvent.click(c.getByRole('radio', {
      name: 'Privatperson'
    }));
    await expect(c.queryByRole('group', {
      name: 'Firmendaten'
    })).toBeNull();
    await expect(firmenfeld).not.toBeRequired();
    await expect(firmenfeld).not.toHaveAttribute('aria-required');

    // Zurück auf „Firma“: Block und Pflicht kommen zurück.
    await userEvent.click(c.getByRole('radio', {
      name: 'Firma'
    }));
    await expect(c.getByRole('group', {
      name: 'Firmendaten'
    })).toBeVisible();
    await expect(firmenfeld).toBeRequired();

    // Abweichende Rechnungsadresse: Block erscheint, Felder werden Pflicht.
    await userEvent.click(c.getByRole('checkbox', {
      name: /andere Adresse/
    }));
    await expect(c.getByRole('group', {
      name: 'Abweichende Rechnungsadresse'
    })).toBeVisible();
    await expect(empfaenger).toBeRequired();
    await expect(empfaenger).toHaveAttribute('aria-required', 'true');

    // Repeater: Hinzufügen ergänzt einen Block samt Entfernen-Button, die Preiszeile zieht nach.
    await userEvent.click(c.getByRole('button', {
      name: 'Weitere Person hinzufügen'
    }));
    await expect(c.getByRole('group', {
      name: 'Teilnehmende 2'
    })).toBeVisible();
    await expect(c.getByText('2 Plätze')).toBeVisible();
    await userEvent.click(c.getByRole('button', {
      name: 'Teilnehmende 2 entfernen'
    }));
    await expect(c.queryByRole('group', {
      name: 'Teilnehmende 2'
    })).toBeNull();
    await expect(c.getByText('1 Platz')).toBeVisible();

    // Anzahl verringern verwirft keine ausgefüllten Blöcke: Die Anzahl bleibt stehen,
    // eine Meldung nennt den Block. Erst ein leerer Block fällt weg.
    const anzahl = c.getByRole('spinbutton', {
      name: /Plätze/
    });
    await userEvent.click(c.getByRole('button', {
      name: 'Weitere Person hinzufügen'
    }));
    const zweiter = within(c.getByRole('group', {
      name: 'Teilnehmende 2'
    }));
    await userEvent.type(zweiter.getByLabelText(/Vorname/), 'Max');
    await userEvent.clear(anzahl);
    await userEvent.type(anzahl, '1');
    await userEvent.tab();
    await expect(c.getByRole('group', {
      name: 'Teilnehmende 2'
    })).toBeVisible();
    await expect(anzahl).toHaveValue(2);
    await expect(anzahl).toHaveAttribute('aria-invalid', 'true');
    await expect(c.getByRole('alert')).toHaveTextContent('Teilnehmende 2 enthält noch Daten');
    await expect(c.getByText('2 Plätze')).toBeVisible();
    await userEvent.clear(zweiter.getByLabelText(/Vorname/));
    await userEvent.clear(anzahl);
    await userEvent.type(anzahl, '1');
    await userEvent.tab();
    await expect(c.queryByRole('group', {
      name: 'Teilnehmende 2'
    })).toBeNull();
    await expect(anzahl).toHaveValue(1);
    await expect(c.queryByRole('alert')).toBeNull();
  }
}`,...d.parameters?.docs?.source}}}})))()}export{i as n,init_buchungsformular_stories as r,d as t};