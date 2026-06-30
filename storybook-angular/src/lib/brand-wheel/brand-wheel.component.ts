import { Component } from '@angular/core';

/**
 * BrandWheel — Wrapper um `.bw-wrap` / `.bw-svg` aus css/components.css → „Brand Wheel".
 *
 * Statische Marken-Illustration (Kreisdiagramm „Ruhige Energie"): Kernwert
 * Gelassenheit im Zentrum, drei Pfeiler (Ruhig / Klar / Energiegeladen) mit je
 * drei Eigenschaften. Das SVG ist verbatim aus docs/index.html übernommen und
 * nutzt ausschließlich die `.bw-*`-Klassen + Tokens (theme-reaktiv via dark-mode.css).
 */
@Component({
  selector: 'cds-brand-wheel',
  standalone: true,
  template: `
    <div class="bw-wrap">
      <svg viewBox="0 0 520 520" class="bw-svg" role="img" aria-labelledby="bw-title bw-desc">
        <title id="bw-title">Markenrad: Ruhige Energie</title>
        <desc id="bw-desc">
          Kreisdiagramm mit Kernwert Gelassenheit im Zentrum. Pfeiler Ruhig mit den Eigenschaften
          Verlässlich, Selbstsicher, Kompetent. Pfeiler Klar mit Aufmerksam, Präzise, Pragmatisch.
          Pfeiler Energiegeladen mit Kraftvoll, Agil, Leidenschaftlich.
        </desc>

        <!-- Outer ring segments -->
        <path class="bw-outer" d="M 73.8 367.5 A 215 215 0 0 1 260 45 L 260 100 A 160 160 0 0 0 121.4 340 Z" />
        <path class="bw-outer" d="M 260 45 A 215 215 0 0 1 446.2 367.5 L 398.6 340 A 160 160 0 0 0 260 100 Z" />
        <path class="bw-outer" d="M 446.2 367.5 A 215 215 0 0 1 73.8 367.5 L 121.4 340 A 160 160 0 0 0 398.6 340 Z" />

        <!-- Middle ring segments -->
        <path class="bw-middle" d="M 121.4 340 A 160 160 0 0 1 260 100 L 260 175 A 85 85 0 0 0 186.4 302.5 Z" />
        <path class="bw-middle" d="M 260 100 A 160 160 0 0 1 398.6 340 L 333.6 302.5 A 85 85 0 0 0 260 175 Z" />
        <path class="bw-middle" d="M 398.6 340 A 160 160 0 0 1 121.4 340 L 186.4 302.5 A 85 85 0 0 0 333.6 302.5 Z" />

        <!-- Inner circle -->
        <circle class="bw-inner" cx="260" cy="260" r="85" />

        <!-- Divider lines -->
        <line class="bw-divider" x1="260" y1="260" x2="260" y2="45" />
        <line class="bw-divider" x1="260" y1="260" x2="446.2" y2="367.5" />
        <line class="bw-divider" x1="260" y1="260" x2="73.8" y2="367.5" />

        <!-- Outer ring border -->
        <circle class="bw-ring-outline" cx="260" cy="260" r="215" />

        <!-- Core label -->
        <text class="bw-label-core" x="260" y="260" text-anchor="middle" dominant-baseline="middle">GELASSENHEIT</text>

        <!-- Segment labels -->
        <text class="bw-label-segment" x="154" y="199" text-anchor="middle" dominant-baseline="middle">RUHIG</text>
        <text class="bw-label-segment" x="366" y="199" text-anchor="middle" dominant-baseline="middle">KLAR</text>
        <text class="bw-label-segment" x="260" y="382" text-anchor="middle" dominant-baseline="middle">ENERGIEGELADEN</text>

        <!-- Attribute labels – RUHIG -->
        <text class="bw-label-attr" x="75.8" y="292.5" text-anchor="middle" dominant-baseline="middle">VERLÄSSLICH</text>
        <text class="bw-label-attr" x="98" y="166.5" text-anchor="middle" dominant-baseline="middle">SELBSTSICHER</text>
        <text class="bw-label-attr" x="196" y="84" text-anchor="middle" dominant-baseline="middle">KOMPETENT</text>

        <!-- Attribute labels – KLAR -->
        <text class="bw-label-attr" x="324" y="84" text-anchor="middle" dominant-baseline="middle">AUFMERKSAM</text>
        <text class="bw-label-attr" x="422" y="166.5" text-anchor="middle" dominant-baseline="middle">PRÄZISE</text>
        <text class="bw-label-attr" x="444" y="292.5" text-anchor="middle" dominant-baseline="middle">PRAGMATISCH</text>

        <!-- Attribute labels – ENERGIEGELADEN -->
        <text class="bw-label-attr" x="380" y="403" text-anchor="middle" dominant-baseline="middle">KRAFTVOLL</text>
        <text class="bw-label-attr" x="260" y="447" text-anchor="middle" dominant-baseline="middle">AGIL</text>
        <text class="bw-label-attr" x="140" y="403" text-anchor="middle" dominant-baseline="middle">LEIDENSCHAFTLICH</text>
      </svg>
    </div>
  `,
})
export class BrandWheelComponent {}
