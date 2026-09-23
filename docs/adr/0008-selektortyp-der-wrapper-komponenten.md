# ADR-0008: Attributselektor, wo das Host-Element im Weg steht

- Status: akzeptiert
- Datum: 2026-09-18

## Kontext

Eine Angular-Komponente bringt immer ein eigenes Element mit. Bei einem Element-Selektor
(`cds-icon-card`) steht dieses Element zwischen dem Elternteil und dem Markup, das die
Komponente rendert. Für die meisten [Wrapper-Komponenten](../../CONTEXT.md#wrapper-komponente)
ist das folgenlos: das Bauteil steht für sich, und ob eine Ebene mehr im DOM liegt, merkt
niemand.

Folgenlos ist es aber nur, solange die CSS-Schicht das gestylte Element nicht an einer
bestimmten Stelle im Layout-Baum erwartet. Beim Nachziehen der Angular-Wrapper für die
Seitenbausteine der Beispielseiten traten zwei Fälle auf, in denen genau das schiefging — beide
gemessen, nicht hergeleitet.

**Fall 1 — Grid-Kind (`.ep-card` im `.ep-cards`-Raster).** Drei Karten mit unterschiedlich
langem Text sollen im Raster gleich hoch werden; `.ep-cards` ist ein Grid, Grid-Kinder strecken
sich. Das Grid-Kind war aber `<cds-icon-card>`, nicht `.ep-card`: der Host streckte sich, die
Karte darin blieb auf Inhaltshöhe.

| Markup | `.ep-card`-Höhen | CTA-Unterkante |
|---|---|---|
| `<cds-icon-card>` (Element-Selektor) | 174 px / 270 px | nicht deckungsgleich |
| rohes `<div class="ep-card">` | 306 px / 306 px | deckungsgleich |
| `<div cdsIconCard>` (Attributselektor) | 306 px / 306 px / 306 px | 281 px / 281 px / 281 px |

Die CSS-Schicht war in Ordnung. Der Wrapper hat sie gebrochen.

**Fall 2 — Fläche am Host (`.ep-section`).** Sektionsflächen setzt die Doku-Site direkt am
`.ep-section`-Element. Mit einem Element-Selektor ist dieses Element intern, der Konsument kommt
nur an den Host `<cds-section>` — und der ist als unbekanntes Element `display:inline`, mit einem
Block-Kind darin.

Die Messung ist hier lehrreicher als das Ergebnis. `getComputedStyle(host).backgroundColor`
meldete `rgb(255, 0, 0)`, und `host.getBoundingClientRect()` war **deckungsgleich** mit der Box
des inneren `.ep-section`. Beide Signale sagten also „die Fläche sitzt richtig“. Der Screenshot
zeigte trotzdem keinen einzigen roten Pixel: ein Inline-Element, dessen einziges Kind als Block
herausgebrochen wird, hat keine eigene Box zu füllen. Der eingebaute axe-Check rechnete den nicht
gemalten Hintergrund obendrein als effektiven Kontrast ein und meldete Verstöße.

Wer diese Frage ohne Screenshot beantwortet, bekommt von Geometrie, Computed Styles und
a11y-Prüfer dieselbe falsche Auskunft.

## Entscheidung

**Element-Selektor (`cds-*`) bleibt der Standard.** Ein Attributselektor kommt nur dort zum
Einsatz, wo das Host-Element nachweislich etwas kaputt macht. Das Kriterium:

> Die Komponente bekommt einen Attributselektor, wenn das von ihr gestylte CSS-Element selbst
> die Stelle im DOM einnehmen muss, die es ohne Angular einnähme — weil es Kind eines Grid-
> oder Flex-Containers ist, weil der Konsument daran Layout-Eigenschaften setzen können muss,
> oder weil sein Tag variiert (`<a>` gegen `<div>`).

Form:

```ts
selector: 'a[cdsIconCard], div[cdsIconCard]',
host: { class: 'ep-card', '[attr.data-area]': 'area() || null' },
```

Der Host trägt die CSS-Klasse, das Template ist nur noch der Inhalt. Damit ist der Wrapper so
dünn, wie [ADR-0001](0001-angular-lib-als-css-wrapper.md) ihn beschreibt: er setzt Klassen, er
schiebt keine Ebene dazwischen.

**Das Kriterium ist eine Review-Frage, kein Lint-Gate.** `@angular-eslint/component-selector`
erlaubt nach der Umstellung `cds`-Attributselektoren generell; ob der konkrete Fall das Kriterium
erfüllt, kann kein Werkzeug prüfen. Wer einen Attributselektor wählt, begründet ihn im JSDoc mit
dem, was ohne ihn bricht.

**Variiert nur das Tag und sonst nichts, bleibt es bei einer Klasse.** Angular Material spaltet
`MatButton`/`MatAnchor` in zwei Klassen, weil `<button disabled>` und `<a>` sich im Verhalten
unterscheiden (Tabindex, ARIA, Klick-Unterdrückung). Solange der einzige Unterschied eine
CSS-Klasse ist, wäre ein Split Aufwand ohne Gegenwert. Kommt ein echtes Verhaltens-Delta dazu,
ist der Punkt erreicht, an dem Materials Zwei-Klassen-Weg die sauberere Wahl ist — statt
`if (isLink)`-Zweige in einer Klasse anzuhäufen.

## Verworfene Alternativen

- **Host-Klasse bei Element-Selektor** (`host: { class: 'ep-card' }` auf `<cds-icon-card>`):
  löst den Grid-Fall, aber nicht den Tag-Wechsel — ein Host-Tag lässt sich nicht von
  `cds-icon-card` auf `<a>` ändern. Die Link-Variante bliebe außen vor.
- **Markup über `TemplateRef` an eine Eltern-Komponente reichen**, wie `cds-stoerer` /
  `cds-stoerer-set` es für die `<li>`-Frage tun: funktioniert, macht das Bauteil aber ohne seine
  Eltern-Komponente unbrauchbar — es verschwindet dann spurlos, ohne Fehlermeldung. Für die
  Störer-Liste ist das vertretbar, weil eine Kachel ohne Liste ohnehin sinnlos ist. Eine Karte
  steht auch allein.
- **Eine Ausgleichs-Regel ins CSS legen** (etwa `min-height` auf `.ep-card-title`/`-text`, wie
  `.card` es hat): behandelt das Symptom am falschen Ort. Das CSS funktioniert ohne Angular
  korrekt; eine Regel, die nur die Angular-Schicht braucht, gehört nicht in eine
  framework-agnostische CSS-Schicht.
- **Nichts ändern und die Abweichung dokumentieren:** hieße, dass dieselbe Komponente in Angular
  anders aussieht als in der Doku-Site. Ein Design System, dessen zwei Schichten
  auseinanderlaufen, verliert seinen Zweck.

## Konsequenzen

- Die Lib hat ab jetzt zwei API-Formen. `<cds-card>` und `<div cdsIconCard>` stehen
  nebeneinander, und der Unterschied ist für Konsumenten nicht selbsterklärend. Das JSDoc jeder
  Attributselektor-Komponente trägt deshalb die Begründung.
- **Eine strukturelle Garantie geht verloren.** Beim Element-Selektor entschied ein `href`-Input,
  ob eine Karte ein Link wird; ein Konsument konnte den Link-Look nicht ohne Link bekommen. Mit
  dem Attributselektor kann jemand `<a cdsIconCard>` ohne `href` schreiben: nicht fokussierbar,
  keine Link-Rolle, sieht aber klickbar aus. Abgefedert, indem die Link-Klasse an `<a>` **und**
  vorhandenes `href` gebunden ist, und per Story gepinnt. Ein `href` an der `<div>`-Variante
  bleibt wirkungslos, ohne dass etwas warnt.
- **Der Regressionsschutz gehört in die Stories.** Dass die Karten im Raster gleich hoch sind,
  prüft eine Play-Funktion über `getBoundingClientRect()`; Stories zu diesen Bauteilen brauchen
  dafür bewusst **unterschiedlich lange** Texte. Mit gleich langen Texten ist die Baseline grün
  und der Fehler unsichtbar — genau so ist er beim ersten Anlauf fast durchgerutscht.
- **Visuelle Fragen werden am Screenshot entschieden, nicht an Computed Styles.** Fall 2 zeigt,
  dass Geometrie, `getComputedStyle` und axe geschlossen dasselbe Falsche behaupten können.
- [ADR-0007](0007-api-konventionen-der-angular-komponenten.md) bleibt unberührt: Inputs und
  Outputs sind weiterhin die API, der Selektortyp ändert daran nichts.
- **Wo man zuerst nachsieht.** Beide Fälle sind Komponenten mit `<ng-content>`. Das ist kein
  Zufall: eine Komponente ohne projizierten Inhalt behält ihr Template vollständig unter
  Kontrolle und gerät deshalb selten in diese Lage. Kein zusätzliches Kriterium, aber ein
  brauchbarer Anfangsverdacht.
- **Die Grenze zwischen Input und durchgereichtem Attribut verschwimmt.** Bei einem eigenen
  Element gehörte alles in eckigen Klammern der Komponente. Bei `<section cdsSection
  style="…" class="…">` laufen native Attribute an ihr vorbei, ohne dass sie davon weiß. Für
  die Sektionsfläche ist genau das erwünscht; für Konsumenten ist es eine Erwartung mehr, die
  das JSDoc benennen muss.
