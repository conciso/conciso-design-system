import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * AvatarStack (`cds-avatar-stack`) — Wrapper um `.article-avatar-stack` aus
 * css/components.css (css/components.css:1538–1545): mehrere `div[cdsAvatar]`
 * überlappend für Mehrfach-Autor:innen im Meta-Strip, mit optionalem
 * „+N“-Indikator (`.article-avatar-more`) ab vier Personen (siehe
 * `wissensbeitrag.mdx`, Abschnitt „Mehrere Autor:innen“).
 *
 * **Element-Selektor, ADR-0008-Standardfall.** `.article-avatar-stack` ist selbst
 * nie Grid-/Flex-Kind mit Stretch-Bedarf — sein einziger reale Elternkontext,
 * `.article-meta-author`, ist `display:flex;align-items:center` (center, nicht
 * stretch, css/components.css:1514), variiert nicht das Tag und ist selbst nie Teil
 * einer `+`-Kette (nur SEINE Kinder sind das, siehe `AvatarComponent`). Die Klasse
 * darf deshalb direkt am `<cds-avatar-stack>`-Host sitzen.
 *
 * **`<ng-content>` fügt kein eigenes Element ein**, die projizierten
 * `div[cdsAvatar]` bleiben deshalb direkte, adjazente Geschwister des optionalen
 * `.article-avatar-more`-Kreises — Voraussetzung für
 * `.article-avatar-stack .article-avatar + .article-avatar-more`
 * (css/components.css:1541).
 *
 * **`aria-hidden="true"` fest verdrahtet.** Ausgezählt: alle 3 realen
 * `.article-avatar-stack`-Vorkommen (`docs/index.html:8342,8372,8403`) tragen es —
 * dieselbe Begründung wie in `wissensbeitrag.mdx` („Barrierefreiheit“): Namen stehen
 * vollständig als Text in `.article-meta-name`, der Stapel selbst trägt keine eigene
 * Information, der „+N“-Kreis ebenfalls nicht (die Restzahl steht redundant im
 * Namenstext, siehe Story).
 */
@Component({
  selector: 'cds-avatar-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'article-avatar-stack', 'aria-hidden': 'true' },
  template: `
    <ng-content></ng-content>
    @if (more() > 0) {
      <div class="article-avatar-more">+{{ more() }}</div>
    }
  `,
})
export class AvatarStackComponent {
  /** Restzahl für den „+N“-Kreis (`.article-avatar-more`); 0 = kein Indikator. */
  readonly more = input(0);
}
