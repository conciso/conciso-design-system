import{n as e}from"./rolldown-runtime-D_-wTCJc.js";import{c as t,o as n}from"./blocks-CgfgLRYg.js";import{s as r}from"./chunk-W22LQPXL-CIjuTlSF.js";import{i,r as a}from"./react-C77DJ2jK.js";import{n as o,t as s}from"./cycle-button.stories-Dyjb2X5o.js";function _createMdxContent(e){let t={code:`code`,h1:`h1`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...i(),...e.components},{HtmlBeispiel:r}=t;return r||_missingMdxReference(`HtmlBeispiel`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n,{of:s,name:`Verwendung`}),`
`,(0,c.jsx)(t.h1,{id:`theme-umschalter--verwendung`,children:`Theme-Umschalter · Verwendung`}),`
`,(0,c.jsxs)(t.p,{children:[`Diese Seite hält die Platzierungsregeln fest und beschreibt vor allem das Bauteil aus dem
Repo selbst:
der Angular-Lib
(`,(0,c.jsx)(t.code,{children:`packages/angular/src/lib/theme-switch/`}),`) und der
Storybook-Konfiguration (`,(0,c.jsx)(t.code,{children:`.storybook/preview.ts`}),`).`]}),`
`,(0,c.jsx)(t.h2,{id:`dreistufiger-modus`,children:`Dreistufiger Modus`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`CdsThemeMode`}),` kennt drei Werte: `,(0,c.jsx)(t.code,{children:`light`}),`, `,(0,c.jsx)(t.code,{children:`dark`}),`, `,(0,c.jsx)(t.code,{children:`system`}),`. `,(0,c.jsx)(t.code,{children:`system`}),` folgt der
Betriebssystem-Einstellung (`,(0,c.jsx)(t.code,{children:`prefers-color-scheme`}),`). Die Reihenfolge, in der alle
drei Umschalter zyklen beziehungsweise Optionen anbieten, ist fest:
`,(0,c.jsx)(t.code,{children:`CDS_THEME_ORDER = ['light', 'dark', 'system']`}),`.`]}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Modus`}),(0,c.jsx)(t.th,{children:`Label`}),(0,c.jsx)(t.th,{children:`Icon-Key`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`light`})}),(0,c.jsx)(t.td,{children:`Hell`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`heroSun`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`dark`})}),(0,c.jsx)(t.td,{children:`Dunkel`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`heroMoon`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`system`})}),(0,c.jsx)(t.td,{children:`System`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.code,{children:`heroComputerDesktop`})})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[`Alle drei Umschalter teilen denselben `,(0,c.jsx)(t.code,{children:`showSystem`}),`-Parameter: `,(0,c.jsx)(t.code,{children:`true`}),` zeigt alle drei
Modi (tri), `,(0,c.jsx)(t.code,{children:`false`}),` blendet „System“ aus und wechselt nur zwischen Hell und Dunkel
(binär). Die Auswahl trifft `,(0,c.jsx)(t.code,{children:`cdsThemeModes(showSystem)`}),` in `,(0,c.jsx)(t.code,{children:`theme-mode.ts`}),`.`]}),`
`,(0,c.jsxs)(t.h2,{id:`themestore-als-einziger-schreiber-von-data-theme`,children:[(0,c.jsx)(t.code,{children:`themeStore`}),` als einziger Schreiber von `,(0,c.jsx)(t.code,{children:`data-theme`})]}),`
`,(0,c.jsxs)(t.p,{children:[`Alle drei Komponenten und die Storybook-Toolbar lesen und schreiben über
`,(0,c.jsx)(t.code,{children:`themeStore`}),` (`,(0,c.jsx)(t.code,{children:`theme-mode.ts`}),`), eine modul-globale Quelle, kein Angular-Service:
Jede Story hat ihre eigene App-Instanz mit eigenem Root-Injector, Angular-DI allein
würde den Zustand also nicht über alle Stories hinweg teilen. `,(0,c.jsx)(t.code,{children:`ThemeModeService`}),` ist
nur ein dünner Injectable-Wrapper darüber für `,(0,c.jsx)(t.code,{children:`inject(ThemeModeService)`}),` im
gewohnten Muster.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`themeStore`}),` ist die `,(0,c.jsx)(t.strong,{children:`einzige`}),` Stelle im System, die das Attribut `,(0,c.jsx)(t.code,{children:`data-theme`}),` am
`,(0,c.jsx)(t.code,{children:`<html>`}),`-Element setzt oder entfernt:`]}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`dark`}),` gesetzt → `,(0,c.jsx)(t.code,{children:`data-theme="dark"`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`light`}),` → Attribut entfernt (Light ist der Default ohne Attribut).`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`system`}),` → koppelt live an `,(0,c.jsx)(t.code,{children:`window.matchMedia('(prefers-color-scheme: dark)')`}),`
und reflektiert dessen `,(0,c.jsx)(t.code,{children:`matches`}),`-Wert als `,(0,c.jsx)(t.code,{children:`dark`}),` oder `,(0,c.jsx)(t.code,{children:`light`}),`; ein
`,(0,c.jsx)(t.code,{children:`change`}),`-Listener hält das synchron, solange der Modus `,(0,c.jsx)(t.code,{children:`system`}),` bleibt.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`Ein `,(0,c.jsx)(t.code,{children:`document`}),`/`,(0,c.jsx)(t.code,{children:`window`}),`-Guard schützt SSR und Prerendering: Ohne `,(0,c.jsx)(t.code,{children:`document`}),` wird
das Attribut übersprungen, der Modus bleibt im Signal erhalten und greift, sobald im
Browser das nächste `,(0,c.jsx)(t.code,{children:`apply()`}),` läuft. Die Lib fasst den globalen Cascade sonst nicht
an (siehe `,(0,c.jsx)(t.code,{children:`docs/adr/0001`}),`).`]}),`
`,(0,c.jsx)(t.h2,{id:`synchronisation-mit-der-storybook-toolbar`,children:`Synchronisation mit der Storybook-Toolbar`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`.storybook/preview.ts`}),` verdrahtet zwei Richtungen:`]}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Store → Toolbar.`}),` `,(0,c.jsx)(t.code,{children:`themeStore.subscribe(...)`}),` emittiert bei jeder Änderung
`,(0,c.jsx)(t.code,{children:`UPDATE_GLOBALS`}),` an den Storybook-Channel, damit der globale
Theme-Toolbar-Schalter mitwandert, wenn eine Story-Komponente den Modus ändert.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Toolbar → Store.`}),` Ein Decorator ruft bei jedem Kontextwechsel
`,(0,c.jsx)(t.code,{children:`themeStore.setSilent(context.globals['theme'])`}),` auf: `,(0,c.jsx)(t.code,{children:`setSilent`}),` wendet den
Modus an, `,(0,c.jsx)(t.strong,{children:`ohne`}),` erneut zu emittieren, sonst entstünde eine Rückkopplungs-
schleife zwischen Toolbar und Store.`]}),`
`]}),`
`,(0,c.jsxs)(t.p,{children:[`Damit bleiben Toolbar, Docs-Vorschau und alle drei Switcher-Komponenten immer
denselben Modus zeigen. Das Docs-Chrome selbst (Überschriften, Tabellen) bleibt
davon unabhängig immer im Light-Theme (`,(0,c.jsx)(t.code,{children:`concisoLight`}),`), weil Storybook Toolbar- und
Docs-Theme nicht koppelt.`]}),`
`,(0,c.jsx)(t.h2,{id:`theme-umschalter--nur-css-schicht`,children:`Theme-Umschalter · Nur CSS-Schicht`}),`
`,(0,c.jsxs)(t.p,{children:[`Wer nur die CSS-Schicht verwendet, baut den Umschalter aus `,(0,c.jsx)(t.code,{children:`.theme-bar`}),` und `,(0,c.jsx)(t.code,{children:`.tbtn`}),`. Der aktive Modus trägt `,(0,c.jsx)(t.code,{children:`aria-pressed="true"`}),` und zusätzlich `,(0,c.jsx)(t.code,{children:`.active`}),`, denn das CSS färbt über `,(0,c.jsx)(t.code,{children:`.active`}),`. Im Beispiel steht `,(0,c.jsx)(t.code,{children:`position:static`}),`, damit die Vorschau Platz belegt; im Produkt bleibt es bei `,(0,c.jsx)(t.code,{children:`position:fixed`}),` aus dem CSS oder einer eigenen Platzierung.`]}),`
`,(0,c.jsx)(r,{titel:`Theme-Umschalter als reines Markup`,interaktiv:!0,children:(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<div class="theme-bar" role="group" aria-label="Farbthema" style="position:static">
  <button class="tbtn active" type="button" aria-pressed="true">Hell</button>
  <button class="tbtn" type="button" aria-pressed="false">Dunkel</button>
</div>
`})})}),`
`,(0,c.jsx)(t.p,{children:`Jede Umsetzung ergänzt das Verhalten, das das CSS nicht liefert:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Zustand:`}),` Genau ein Button der Gruppe trägt `,(0,c.jsx)(t.code,{children:`aria-pressed="true"`}),` und `,(0,c.jsx)(t.code,{children:`.active`}),`, alle anderen `,(0,c.jsx)(t.code,{children:`aria-pressed="false"`}),`. Ein Klick verschiebt beides auf den gewählten Button. Ohne sichtbares Label (Icon-only) braucht jeder Button ein `,(0,c.jsx)(t.code,{children:`aria-label`}),` mit dem Namen des Modus.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Anwenden:`}),` Nur das Nötige setzen. Für Dark `,(0,c.jsx)(t.code,{children:`data-theme="dark"`}),` am `,(0,c.jsx)(t.code,{children:`<html>`}),` setzen, für Light das Attribut entfernen. Nie erst entfernen und dann neu setzen: Das Attribut fehlt dann kurz, die Body-Transition läuft von Dark über Light zurück nach Dark, und die Seite flackert. Setzen auf denselben Wert ist dagegen ein No-Op.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Persistenz:`}),` Der Zugriff auf `,(0,c.jsx)(t.code,{children:`localStorage`}),` steht beim Lesen und beim Schreiben in `,(0,c.jsx)(t.code,{children:`try/catch`}),`. Ein blockierter Speicher (privater Modus, gesperrte Cookies) darf den Umschalter nicht stilllegen, der Modus gilt dann nur bis zum Neuladen.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Mehrere Umschalter:`}),` Gibt es mehr als einen (Gruppe und Icon-Button im Header), aktualisiert jeder Wechsel alle. Sie lesen den Zustand aus einer gemeinsamen Quelle, damit keiner einen veralteten Modus zeigt.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Beim Laden:`}),` Der gespeicherte Modus setzt `,(0,c.jsx)(t.code,{children:`data-theme`}),` vor dem ersten Paint (Anti-Flash-Snippet unten), danach gleicht die Seite den Anzeigezustand der Umschalter an.`]}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`dark-mode-der-unterbau-aus-der-css-schicht`,children:`Dark Mode: der Unterbau aus der CSS-Schicht`}),`
`,(0,c.jsxs)(t.p,{children:[`Der CSS-Schicht-Vertrag (`,(0,c.jsx)(t.code,{children:`docs/GETTING-STARTED.md`}),` § 3) kennt nur ein Attribut:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-js`,children:`document.documentElement.setAttribute('data-theme', 'dark'); // dunkel
document.documentElement.removeAttribute('data-theme');      // hell (Default)
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Genau zwei Modi in der ausgelieferten CSS.`}),` Das System kennt Light und Dark,
keinen dritten Modus, der der Betriebssystem-Präferenz folgt: `,(0,c.jsx)(t.code,{children:`prefers-color-scheme`}),`
wird im ausgelieferten CSS nicht ausgewertet, Default ist Light. Der dritte,
UI-seitige Modus „System“ der drei Theme-Umschalter-Komponenten liegt deshalb eine
Ebene `,(0,c.jsx)(t.strong,{children:`über`}),` der CSS-Schicht: `,(0,c.jsx)(t.code,{children:`themeStore`}),` löst `,(0,c.jsx)(t.code,{children:`system`}),` selbst über
`,(0,c.jsx)(t.code,{children:`matchMedia`}),` auf und schreibt der CSS-Schicht am Ende immer nur einen der zwei
Zustände, die sie kennt (`,(0,c.jsx)(t.code,{children:`data-theme="dark"`}),` gesetzt oder entfernt). Ein Consumer,
der die Betriebssystem-Präferenz ohne diese Komponenten übernehmen will, wertet sie
im eigenen Produkt genauso aus:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-js`,children:`if (matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.setAttribute('data-theme', 'dark');
`})}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Anti-Flash-Snippet (Pflicht).`}),` Wer den Modus persistiert, setzt dieses Skript immer als
erstes Skript im `,(0,c.jsx)(t.code,{children:`<head>`}),`, vor dem Stylesheet und damit vor dem ersten Paint. Nie am
Ende des `,(0,c.jsx)(t.code,{children:`<body>`}),` oder in einem Bundle, das erst nach dem Rendern läuft: Dann blitzt beim
Reload kurz Light auf, bevor `,(0,c.jsx)(t.code,{children:`data-theme`}),` gesetzt ist. Das Skript liest die gespeicherte
Präferenz aus `,(0,c.jsx)(t.code,{children:`localStorage`}),`:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-html`,children:`<script>
  (function(){
    try {
      var t = localStorage.getItem('ds-theme');
      if (t && t !== 'light') document.documentElement.setAttribute('data-theme', t);
    } catch(e) {}
  })();
<\/script>
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Persistenz beim Umschalten: `,(0,c.jsx)(t.code,{children:`localStorage.setItem('ds-theme', 'dark' | 'light')`}),`.
Die drei Angular-Umschalter selbst persistieren nicht; das bleibt Aufgabe des
Consumers, der `,(0,c.jsx)(t.code,{children:`themeStore.subscribe(...)`}),` an die eigene Persistenz anschließt.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`subscribe`}),` meldet nur künftige Änderungen und liest den gespeicherten Wert nie. Der
Store startet immer mit `,(0,c.jsx)(t.code,{children:`light`}),`; ohne Hydrierung zeigen die Umschalter nach einem
Reload Light an, obwohl das Anti-Flash-Snippet `,(0,c.jsx)(t.code,{children:`data-theme`}),` schon auf `,(0,c.jsx)(t.code,{children:`dark`}),` gesetzt
hat. Deshalb liest der Consumer beim Start den gespeicherten Wert und setzt ihn mit
`,(0,c.jsx)(t.code,{children:`themeStore.set(...)`}),` in den Store (alternativ `,(0,c.jsx)(t.code,{children:`ThemeModeService.set(...)`}),`), bevor die
Umschalter rendern. Beides ist Teil der öffentlichen API:`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{className:`language-ts`,children:`import { themeStore, type CdsThemeMode } from '@conciso/design-system-angular';

try {
  const saved = localStorage.getItem('ds-theme') as CdsThemeMode | null;
  if (saved) themeStore.set(saved);
} catch {}

themeStore.subscribe((mode) => {
  try {
    localStorage.setItem('ds-theme', mode);
  } catch {}
});
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Beide Zugriffe auf `,(0,c.jsx)(t.code,{children:`localStorage`}),` stehen in `,(0,c.jsx)(t.code,{children:`try/catch`}),`, weil der Zugriff im privaten Modus oder bei gesperrtem Storage wirft. Das Anti-Flash-Snippet kennt nur `,(0,c.jsx)(t.code,{children:`dark`}),` und `,(0,c.jsx)(t.code,{children:`light`}),`. Ein gespeichertes `,(0,c.jsx)(t.code,{children:`system`}),` greift erst mit der Hydrierung, weil `,(0,c.jsx)(t.code,{children:`themeStore`}),` es dann über `,(0,c.jsx)(t.code,{children:`matchMedia`}),` auflöst.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`Warum das für jede Komponente gilt (CONTRIBUTING § 5).`}),` `,(0,c.jsx)(t.code,{children:`data-theme`}),` ist der
einzige Schalter im System: Alle Token flippen darüber, keine Komponente wertet
`,(0,c.jsx)(t.code,{children:`prefers-color-scheme`}),` selbst aus oder führt eine eigene dritte Flächen-Stufe ein.
Weil `,(0,c.jsx)(t.code,{children:`themeStore`}),` der einzige Schreiber dieses Attributs ist, bleibt diese Garantie
auch mit drei unterschiedlichen Umschalter-Bauteilen (Cycle-Button, Segment,
Dropdown) und der Storybook-Toolbar intakt: Es gibt genau eine Quelle der Wahrheit
für den Modus, unabhängig davon, über welchen Umschalter er gesetzt wurde.`]}),`
`,(0,c.jsx)(t.h2,{id:`dos--donts`,children:`Dos & Don'ts`}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Cycle-Button im Header, Segment als eigenständiges Element, Dropdown ausschließlich in den Einstellungen einsetzen.`}),`
`,(0,c.jsxs)(t.li,{children:[`Alle drei Umschalter über denselben `,(0,c.jsx)(t.code,{children:`themeStore`}),` laufen lassen, damit sie und die Storybook-Toolbar synchron bleiben.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Das Anti-Flash-Snippet immer als erstes Skript im `,(0,c.jsx)(t.code,{children:`<head>`}),` einbinden, vor dem Stylesheet.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Die Persistenz im Consumer selbst anschließen (`,(0,c.jsx)(t.code,{children:`themeStore.subscribe(...)`}),` schreibt in die eigene Ablage), die Umschalter speichern nichts.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Bei einer eigenen Umsetzung ohne diese Komponenten die Betriebssystem-Präferenz genauso oberhalb der CSS-Schicht auflösen und der CSS-Schicht am Ende nur `,(0,c.jsx)(t.code,{children:`data-theme="dark"`}),` oder gar kein Attribut übergeben.`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Nicht tun`})}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`data-theme`}),` parallel zu diesen Komponenten von einer zweiten Stelle aus setzen: Ein Consumer hat nur eine Quelle der Wahrheit für den Modus, und das ist `,(0,c.jsx)(t.code,{children:`themeStore`}),`.`]}),`
`,(0,c.jsx)(t.li,{children:`Annehmen, dass die Umschalter den Modus über einen Reload hinweg behalten.`}),`
`,(0,c.jsxs)(t.li,{children:[`Einen dritten Flächen-Zustand für `,(0,c.jsx)(t.code,{children:`System`}),` in eigenem CSS ergänzen, die ausgelieferte CSS kennt nur Hell und Dunkel.`]}),`
`,(0,c.jsx)(t.li,{children:`Das Dropdown als dauerhaftes Element auf jeder Seite einsetzen, dafür ist es nicht vorgesehen.`}),`
`]}),`
`,(0,c.jsx)(t.h2,{id:`verwandte-seiten`,children:`Verwandte Seiten`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Komponenten/Theme-Umschalter/Cycle-Button`}),` (Icon-Button, ein Klick wechselt reihum durch die Modi, vorgesehen für den Header)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Komponenten/Theme-Umschalter/Segment`}),` (Segment-Leiste zum Hovern, immer responsiv und animiert)`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.code,{children:`Komponenten/Theme-Umschalter/Dropdown`}),` (Custom Select, vorgesehen nur in den Einstellungen, nicht als persistentes Element)`]}),`
`]})]})}function MDXContent(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(_createMdxContent,{...e})}):_createMdxContent(e)}function _missingMdxReference(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}var c;function init_theme_umschalter(){return(init_theme_umschalter=e((()=>{c=r(),a(),t(),o()})))()}init_theme_umschalter();export{MDXContent as default};