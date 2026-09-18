/*
 * Public API Surface von @conciso/design-system-angular
 *
 * Der einzige Einstiegspunkt der Angular-Lib. Alle Wrapper-Komponenten und ihre
 * öffentlichen Typen (CdsArea, CdsButtonVariant, CdsButtonSize, CdsThemeMode, …) werden
 * ausschließlich von hier re-exportiert — es gibt keine sekundären Entry-Points
 * (siehe docs/adr/0004-verteilung-und-versionierung.md).
 *
 * Vollständig umgezogen (Tickets 01–09, siehe docs/adr/0002 und 0003): alle
 * Komponenten leben hier in der Lib, storybook-angular enthält nur noch
 * Stories und importiert ausschließlich von hier.
 */

export * from './lib/area';
export * from './lib/theme-switch/theme-mode';
export * from './lib/button/button.component';
export * from './lib/topnav/topnav.component';
export * from './lib/theme-switch/cycle-button.component';
export * from './lib/area-badge/area-badge.component';
export * from './lib/status-badge/status-badge.component';
export * from './lib/chip/chip.component';
export * from './lib/pill/pill.component';

// Bulk-Batch A: Form-Felder & Eingaben (Ticket 05)
export * from './lib/field/text-field.component';
export * from './lib/field/textarea-field.component';
export * from './lib/field/select-field.component';
export * from './lib/checkbox/checkbox.component';
export * from './lib/radio-group/radio-group.component';
export * from './lib/select/select.component';
export * from './lib/combobox/combobox.component';
export * from './lib/slider/slider.component';

// Bulk-Batch B (Ticket 06): Layout & Navigation
export * from './lib/footer/footer.component';
export * from './lib/footer/footer-main.component';
export * from './lib/footer/footer-bottom.component';
export * from './lib/area-tabs/area-tab.component';
export * from './lib/area-tabs/area-tabs.component';
export * from './lib/logo/logo.component';
export * from './lib/logo-carousel/logo-carousel.component';
export * from './lib/carousel/carousel.component';
export * from './lib/theme-switch/segment-tri.component';
export * from './lib/theme-switch/select.component';

// Bulk-Batch C (Ticket 07): Content & Daten-Anzeige.
export * from './lib/card/card.component';
export * from './lib/stat-card/stat-card.component';
export * from './lib/stat-strip/stat-strip.component';
export * from './lib/blockquote/blockquote.component';
export * from './lib/code-block/code-block.component';
export * from './lib/faq/faq.component';
export * from './lib/scale/scale.component';
export * from './lib/snackbar/snackbar.component';
export * from './lib/testimonial/testimonial.component';
export * from './lib/team-voice/team-voice.component';
export * from './lib/download-cta/download-cta.component';

// Angular-Seitenbausteine (.scratch/angular-seitenbausteine, Ticket 01): Sektions-Gerüst
export * from './lib/section/section.component';
// Angular-Seitenbausteine (Ticket 02): Hero-Bild
export * from './lib/hero-image/hero-image.component';
// Angular-Seitenbausteine (Ticket 03): Störer-Kacheln über dem Hero
export * from './lib/stoerer/stoerer.component';
export * from './lib/stoerer/stoerer-set.component';
// Angular-Seitenbausteine (Ticket 04): Klickbare Karte und Featured-Karte
export * from './lib/link-card/link-card.component';
export * from './lib/featured-card/featured-card.component';
// Angular-Seitenbausteine (Ticket 05): Icon-Karte
export * from './lib/icon-card/icon-card.component';
// Angular-Seitenbausteine (Ticket 06): Feature-Liste
export * from './lib/feature/feature.component';
// Angular-Seitenbausteine (Ticket 07): Page-End-CTA-Band
export * from './lib/cta-band/cta-band.component';
// Angular-Seitenbausteine (Ticket 08): Tier-Trenner und Fakten-Liste (cds-award-list
// zurückgestellt, siehe .scratch/angular-seitenbausteine/issues/08-angebots-bausteine.md)
export * from './lib/tier/tier.component';
export * from './lib/facts/facts.component';
// Angular-Seitenbausteine (Ticket 09): Datentabelle
export * from './lib/table/table.component';
// Angular-Seitenbausteine (Ticket 10): aufklappbare Vergleichstabelle
export * from './lib/compare/compare.component';
// Angular-Seitenbausteine (Ticket 11): Beitrags-Kopf und Avatare
export * from './lib/avatar/avatar.component';
export * from './lib/avatar/avatar-stack.component';
export * from './lib/article-header/article-header.component';
// Angular-Seitenbausteine (Ticket 12): Artikel-Körper (Inhaltsverzeichnis, Callout,
// Figure, Pull-Quote)
export * from './lib/article-toc/article-toc.component';
export * from './lib/article-callout/article-callout.component';
export * from './lib/article-figure/article-figure.component';
export * from './lib/article-pullquote/article-pullquote.component';
