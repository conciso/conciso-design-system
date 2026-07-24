/*
 * Public API Surface von @conciso/design-system-angular
 *
 * Der einzige Einstiegspunkt der Angular-Lib. Alle Wrapper-Komponenten und ihre
 * öffentlichen Typen (CdsArea, CdsButtonVariant, CdsButtonSize, ThemeMode, …) werden
 * ausschließlich von hier re-exportiert — es gibt keine sekundären Entry-Points
 * (siehe docs/adr/0004-verteilung-und-versionierung.md).
 *
 * Pilot-Scheibe (siehe docs/adr/0003-pilot-scheibe-und-validierung.md): Button,
 * Topnav und die von Topnav genutzte theme-switch cycle-button sind umgezogen.
 * Der restliche Bulk-Umzug (~38 Komponenten) folgt in späteren Tickets.
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
export * from './lib/field/field-shell.component';
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
