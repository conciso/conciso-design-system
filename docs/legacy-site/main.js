/* ── Vibe Design System — Main Script ── */
(function() {

  /* ── Sub-nav helper ── */
  function updateSubNav(section) {
    document.querySelectorAll('.nav-subnav').forEach(function(nav) {
      nav.classList.toggle('visible', nav.dataset.for === section);
    });
  }

  /* ── Section navigation ── */
  function activateSection(section) {
    document.querySelectorAll('.ds-section').forEach(function(s) { s.classList.remove('visible'); });
    document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); n.removeAttribute('aria-current'); });
    var sec = document.getElementById('sec-' + section);
    var btn = document.querySelector('.nav-item[data-section="' + section + '"]');
    if (sec) sec.classList.add('visible');
    if (btn) { btn.classList.add('active'); btn.setAttribute('aria-current', 'page'); }
    /* data-section am <html> synchron halten — steuert die ds-content-Breite (s. CSS) ohne Layout-Sprung. */
    document.documentElement.setAttribute('data-section', section);
    updateSubNav(section);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  document.querySelectorAll('.nav-item[data-section]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      activateSection(btn.dataset.section);
      localStorage.setItem('ds-active-section', btn.dataset.section);
    });
  });

  /* Restore last active section or fall back to HTML default */
  var saved = localStorage.getItem('ds-active-section');
  var savedBtn = saved && document.querySelector('.nav-item[data-section="' + saved + '"]');
  if (savedBtn) {
    activateSection(saved);
  } else {
    var initialActive = document.querySelector('.nav-item.active[data-section]');
    if (initialActive) updateSubNav(initialActive.dataset.section);
  }

  /* ── Sub-nav anchor clicks: smooth scroll ──
     Die Beispielseiten-Einträge tragen zusätzlich data-ep. Bei ihnen öffnet der Klick die
     Beispielseite der Gruppe (activateExamplePage scrollt selbst und respektiert dabei
     prefers-reduced-motion), statt nur an die Tab-Leiste zu springen: fünf der sechs
     Gruppen-Labels liegen in derselben Grid-Zeile, ein reiner Anker führte also fünfmal
     an dieselbe Stelle. Ohne JS bleibt der href als Sprungziel auf den ersten Tab. */
  document.querySelectorAll('.nav-sub-item').forEach(function(link) {
    link.addEventListener('click', function(e) {
      if (link.dataset.ep) {
        e.preventDefault();
        activateExamplePage(link.dataset.ep);
        return;
      }
      var targetId = link.getAttribute('href').slice(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── Prose anchor links to other sections ──
     A plain <a href="#X"> can't reach a target whose parent .ds-section is currently hidden.
     This handler resolves the target's section, switches to it if needed, scrolls to X, and
     if the link carries data-ep (Beispielseiten-Tab), also activates that example tab. */
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    if (a.classList.contains('nav-sub-item') || a.classList.contains('nav-item')) return;
    if (a.closest('.ep-page')) return; // Links inside example pages are handled separately
    var href = a.getAttribute('href');
    if (href.length < 2) return;
    var target = document.getElementById(href.slice(1));
    if (!target) return;
    var section = target.classList.contains('ds-section') ? target : target.closest('.ds-section');
    if (!section || !section.id) return;
    var key = section.id.replace(/^sec-/, '');
    var sectionAlreadyVisible = section.classList.contains('visible');
    var epKey = a.dataset.ep;
    if (!sectionAlreadyVisible || epKey) {
      e.preventDefault();
      if (!sectionAlreadyVisible) {
        activateSection(key);
        localStorage.setItem('ds-active-section', key);
      }
      /* data-k-bereich / data-k-anliegen mitgeben wie beim ep-page-Handler weiter unten, sonst
         landet ein Bereichs-CTA aus der Doku (z. B. „Inhouse-Termin anfragen“ im Buchungsformular)
         auf der neutralen Kontaktseite ohne Tönung und ohne vorbelegtes Anliegen. */
      if (epKey) activateExamplePage(epKey, { bereich: a.dataset.kBereich, anliegen: a.dataset.kAnliegen });
      if (target !== section) {
        requestAnimationFrame(function() { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      }
    }
  });

  /* ── Back-to-top button ── */
  var backBtn = document.getElementById('back-to-top');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.addEventListener('scroll', function() {
    backBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ── Theme switcher (mit Persistenz) ── */
  function applyTheme(t) {
    /* Nur das Nötige setzen — NICHT erst removeAttribute und dann setAttribute: dieses Churn
       (data-theme kurz weg → Light → wieder Dark) triggert beim Laden die body-Transition
       (background/color) und erzeugt ein sichtbares Light→Dark-Flackern. setAttribute auf den
       gleichen Wert ist dagegen ein No-Op (keine Transition). */
    if (t === 'light') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', t);
    document.querySelectorAll('.tbtn').forEach(function(b) {
      var on = b.id === 'tb-' + t;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    /* Topnav-Theme-Umschalter synchron halten (existieren ggf. erst nach Injektion weiter unten) */
    var dark = t === 'dark';
    document.querySelectorAll('.ep-nav-theme-toggle').forEach(function(b) {
      b.setAttribute('aria-pressed', String(dark));
      b.setAttribute('aria-label', dark ? 'Zum Hellmodus wechseln' : 'Zum Dunkelmodus wechseln');
    });
  }
  document.querySelectorAll('.tbtn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var t = btn.id.replace('tb-', '');
      applyTheme(t);
      try { localStorage.setItem('ds-theme', t); } catch (e) {}
    });
  });
  /* Beim Laden gespeichertes Theme wiederherstellen — data-theme setzt bereits das Inline-Head-Script
     vor dem Paint, hier wird zusätzlich der aktive Button-Status synchronisiert. */
  applyTheme((function() { try { return localStorage.getItem('ds-theme'); } catch (e) { return null; } })() || 'light');

  /* ── Area tabs (Bereichs-Komponenten) ── */
  document.querySelectorAll('.atab[data-area]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.atab').forEach(function(t) { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      document.querySelectorAll('.atab-content').forEach(function(c) { c.classList.remove('visible'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      var panel = document.getElementById('at-' + btn.dataset.area);
      if (panel) panel.classList.add('visible');
    });
  });

  /* ── Chip toggle ── */
  document.querySelectorAll('.chip').forEach(function(chip) {
    chip.addEventListener('click', function() {
      var selected = chip.classList.toggle('sel');
      chip.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
  });

  /* ── Skip link ── */
  document.getElementById('skip-btn').addEventListener('click', function() {
    document.getElementById('main-content').focus();
  });

  /* ── Sidebar toggle ── */
  var sidebarToggleBtn = document.getElementById('sidebar-toggle');
  var dsSidebar = document.querySelector('.ds-sidebar');
  sidebarToggleBtn.addEventListener('click', function() {
    var isCollapsed = dsSidebar.classList.toggle('collapsed');
    sidebarToggleBtn.setAttribute('aria-expanded', String(!isCollapsed));
    sidebarToggleBtn.setAttribute('aria-label', isCollapsed ? 'Navigation ausklappen' : 'Navigation einklappen');
    if (isCollapsed) {
      document.querySelectorAll('.nav-subnav.visible').forEach(function(nav) { nav.classList.remove('visible'); });
    } else {
      var active = document.querySelector('.nav-item.active[data-section]');
      if (active) updateSubNav(active.dataset.section);
    }
  });

  /* ── Beispielseiten: Tab-Wechsel ──
     Scroll an den Anfang von sec-examples, damit der User die neue ep-page von oben sieht.
     Ohne Scroll bleibt die alte Scroll-Y-Position erhalten und der User landet je nach
     Höhe der neuen ep-page mitten in der Seite (z. B. direkt im Anmeldeformular). */
  /* Kontaktseite ist bereichsneutral (co). Kommt der Nutzer über einen Bereichs-CTA
     (Link mit data-k-bereich / optional data-k-anliegen), wird das Formular getönt und
     Thema/Anliegen vorbelegt. Ohne Kontext (Topnav, Footer, Tab) bleibt es Corporate. */
  var KONTAKT_THEME = {
    co: { bg: 'var(--co-700)', btn: 'btn-co', topic: 'Allgemeine Anfrage', eyebrow: 'Anfrage' },
    ki: { bg: 'var(--ki-800)', btn: 'btn-ki', topic: 'Angewandte KI', eyebrow: 'Angewandte KI' },
    es: { bg: 'var(--es-700)', btn: 'btn-es', topic: 'Effektive Software', eyebrow: 'Effektive Software' },
    wo: { bg: 'var(--wo-700)', btn: 'btn-wo', topic: 'Wirksame Organisationen', eyebrow: 'Wirksame Organisationen' }
  };
  function applyKontaktContext(bereich, anliegen) {
    var page = document.getElementById('ep-kontakt');
    if (!page) return;
    var t = KONTAKT_THEME[bereich] || KONTAKT_THEME.co;
    var header = document.getElementById('kf-es-header');
    if (header) header.style.background = t.bg;
    var eyebrow = document.getElementById('kf-es-eyebrow');
    if (eyebrow) eyebrow.textContent = t.eyebrow;
    var submit = page.querySelector('#kf-es-form button[type="submit"]');
    if (submit) { submit.classList.remove('btn-co', 'btn-ki', 'btn-es', 'btn-wo'); submit.classList.add(t.btn); }
    /* Akzent-Scope am Formular, damit auch der Datenschutz-Link im Consent-Label mittönt statt
       corporate zu bleiben. Nur am <form>, nicht an der Karte: Telefon, E-Mail und Maps-Link
       daneben sind Unternehmens-Kontaktdaten und bleiben Corporate. co = Default, kein Attribut. */
    var form = document.getElementById('kf-es-form');
    if (form) {
      if (bereich && KONTAKT_THEME[bereich] && bereich !== 'co') form.setAttribute('data-accent', bereich);
      else form.removeAttribute('data-accent');
    }
    var consent = document.getElementById('kf-es-consent');
    if (consent) consent.style.accentColor = t.bg;
    var topic = document.getElementById('kf-es-topic');
    if (topic) topic.value = t.topic;
    var msg = document.getElementById('kf-es-msg');
    if (msg) msg.value = anliegen || '';
    /* Verstecktes Routing (stabil, unabhängig vom editierbaren Freitext oben) */
    var rb = document.getElementById('kf-es-bereich');
    if (rb) rb.value = KONTAKT_THEME[bereich] ? bereich : 'co';
    var ru = document.getElementById('kf-es-unterthema');
    if (ru) ru.value = anliegen || '';
  }
  function activateExamplePage(epKey, ctx) {
    document.querySelectorAll('.ep-tab').forEach(function(t) { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
    document.querySelectorAll('.ep-page').forEach(function(p) { p.classList.remove('visible'); });
    var tab = document.querySelector('.ep-tab[data-ep="' + epKey + '"]');
    var page = document.getElementById('ep-' + epKey);
    if (tab) {
      tab.classList.add('active'); tab.setAttribute('aria-selected','true');
      /* Knoten der aktiven Seite aufklappen, damit sie im Baum sichtbar ist */
      var activeNode = tab.closest('.ep-tab-node');
      if (activeNode) setTabNodeOpen(activeNode, true);
    }
    if (page) page.classList.add('visible');
    if (epKey === 'kontakt') applyKontaktContext(ctx && ctx.bereich, ctx && ctx.anliegen);
    var sec = document.getElementById('sec-examples');
    if (sec) {
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      sec.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    }
  }
  document.querySelectorAll('.ep-tab[data-ep]').forEach(function(btn) {
    btn.addEventListener('click', function() { activateExamplePage(btn.dataset.ep); });
  });
  /* ── Beispielseiten-Tabs: Unterpunkte ein-/ausklappen ── */
  function setTabNodeOpen(node, open) {
    node.classList.toggle('is-open', open);
    var toggle = node.querySelector('.ep-tab-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', String(open));
  }
  document.querySelectorAll('.ep-tab-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var node = btn.closest('.ep-tab-node');
      if (node) setTabNodeOpen(node, !node.classList.contains('is-open'));
    });
  });

  /* ── Topnav-Dropdowns (Angewandte KI/Leistungen/Unternehmen) ──
     Kern: Klick/Tap auf den Caret-Button, Tastatur (Enter/Space, Pfeile, Home/End, Escape),
     Außenklick — alles mit korrektem aria-expanded für Screenreader und Touch-Geräte.
     Der Label-Link (.ep-nav-btn) navigiert weiterhin direkt zur Übersicht.
     Enhancement: Auf Geräten mit echtem Hover (pointer:fine) öffnet zusätzlich der Hover das
     Flyout (Intent-Delay beim Öffnen, längere Verzögerung beim Schließen als Brücke über den
     Gap zum Menü). Touch/Coarse-Pointer bekommen bewusst KEIN Hover-Öffnen (sonst Synthetik-
     Hover/Double-Tap). Alles läuft über dieselbe is-open/aria-expanded-Logik, damit nur ein
     Menü gleichzeitig offen ist (closeAllNavItems) und der SR-Zustand stimmt. */
  var navHoverCapable = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  function openNavItem(item) {
    closeAllNavItems(item);
    item.classList.add('is-open');
    var t = item.querySelector('.ep-nav-item-toggle');
    if (t) t.setAttribute('aria-expanded', 'true');
  }
  function closeNavItem(item) {
    item.classList.remove('is-open');
    var t = item.querySelector('.ep-nav-item-toggle');
    if (t) t.setAttribute('aria-expanded', 'false');
  }
  function closeAllNavItems(except) {
    document.querySelectorAll('.ep-nav-has-sub.is-open').forEach(function(o) {
      if (o !== except) closeNavItem(o);
    });
  }
  document.querySelectorAll('.ep-nav-item-toggle').forEach(function(btn, i) {
    var item = btn.closest('.ep-nav-has-sub');
    if (!item) return;
    btn.setAttribute('aria-expanded', 'false');
    /* Disclosure verdrahten: Toggle steuert sein Submenü (aria-controls auf eine eindeutige id).
       aria-haspopup entfällt bewusst — es ist eine Link-Disclosure, kein Menü-Widget. */
    var sub = item.querySelector('.ep-nav-sub');
    if (sub) {
      if (!sub.id) sub.id = 'ep-nav-sub-' + i;
      btn.setAttribute('aria-controls', sub.id);
    }
    /* Hover-Timer im Item-Scope, damit der Klick sie abbrechen kann (sonst würde ein noch offener
       Öffnen-Timer ein gerade per Klick geschlossenes Menü wieder aufziehen). */
    var openTimer, closeTimer;
    btn.addEventListener('click', function() {
      clearTimeout(openTimer); clearTimeout(closeTimer);
      if (item.classList.contains('is-open')) closeNavItem(item);
      else openNavItem(item);
    });
    /* Tab aus dem Menü heraus schließt es */
    item.addEventListener('focusout', function(e) {
      if (!item.contains(e.relatedTarget)) closeNavItem(item);
    });
    /* Hover-Öffnen (nur pointer:fine): Öffnen mit kurzem Intent-Delay, Schließen verzögert,
       damit der Weg über den Gap ins Flyout die Brücke bleibt (WCAG 1.4.13 „hoverable“). */
    if (navHoverCapable) {
      item.addEventListener('mouseenter', function() {
        clearTimeout(closeTimer);
        openTimer = setTimeout(function() { openNavItem(item); }, 100);
      });
      item.addEventListener('mouseleave', function() {
        clearTimeout(openTimer);
        closeTimer = setTimeout(function() { closeNavItem(item); }, 250);
      });
    }
    /* Tastatur: Escape schließt (+Fokus zurück), Pfeile/Home/End navigieren die Einträge */
    item.addEventListener('keydown', function(e) {
      var links = Array.prototype.slice.call(item.querySelectorAll('.ep-nav-sub-btn'));
      if (e.key === 'Escape') {
        if (item.classList.contains('is-open')) { closeNavItem(item); btn.focus(); }
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!item.classList.contains('is-open')) openNavItem(item);
        var di = links.indexOf(document.activeElement);
        (di === -1 || di === links.length - 1 ? links[0] : links[di + 1]).focus();
        return;
      }
      if (e.key === 'ArrowUp' && item.classList.contains('is-open')) {
        e.preventDefault();
        var ui = links.indexOf(document.activeElement);
        (ui <= 0 ? links[links.length - 1] : links[ui - 1]).focus();
        return;
      }
      if ((e.key === 'Home' || e.key === 'End') && item.classList.contains('is-open') && links.length) {
        e.preventDefault();
        (e.key === 'Home' ? links[0] : links[links.length - 1]).focus();
      }
    });
  });
  /* Klick außerhalb schließt offene Dropdowns — ebenso ein Klick auf einen Navigationslink (data-ep):
     Der neue Parent-Link liegt IM .ep-nav-has-sub, würde also sonst nicht schließen. Der Caret-Toggle
     trägt kein data-ep und bleibt unberührt (sein eigener Handler steuert Öffnen/Schließen). */
  document.addEventListener('click', function(e) {
    if (!e.target.closest) return;
    if (e.target.closest('[data-ep]') || !e.target.closest('.ep-nav-has-sub')) closeAllNavItems(null);
  });
  /* Escape schließt auch ein rein per Hover geöffnetes Menü, wenn der Fokus nicht darin liegt
     (der item-keydown-Handler greift nur bei Fokus im Item) — WCAG 1.4.13 „dismissible“. */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeAllNavItems(null);
  });

  /* ── Mobile-Navigation: Hamburger-Button pro Topnav (per JS injiziert, kein Markup-Eingriff) ──
     Greift nur unter dem CSS-Breakpoint; auf Desktop ist der Button ausgeblendet. */
  document.querySelectorAll('.ep-topnav').forEach(function(bar, i) {
    var links = bar.querySelector('.ep-nav-links');
    if (!links) return;
    if (!links.id) links.id = 'ep-nav-links-' + i;
    var burger = document.createElement('button');
    burger.type = 'button';
    burger.className = 'ep-nav-burger';
    burger.setAttribute('aria-label', 'Menü öffnen');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', links.id);
    burger.innerHTML = '<svg class="icon-menu" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path stroke-linecap="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"/></svg><svg class="icon-close" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/></svg>';
    bar.insertBefore(burger, links);
    burger.addEventListener('click', function() {
      var open = bar.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    });
    /* Klick auf einen Navigationslink schließt das Mobile-Menü */
    links.addEventListener('click', function(e) {
      if (e.target.closest('a') && bar.classList.contains('nav-open')) {
        bar.classList.remove('nav-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Menü öffnen');
      }
    });
  });

  /* ── Topnav-Aktionen: Suche + Theme-Umschalter ──
     Wie der Hamburger per JS in jede .ep-topnav injiziert, damit Doku-Referenz und alle Beispielseiten
     konsistent versorgt sind, ohne jedes Topnav-Markup einzeln zu pflegen. Rechts vor dem CTA platziert.
     Theme-Toggle nutzt das globale applyTheme (+ Persistenz); die Suche ist ein Disclosure-Popover mit
     barrierefreiem Suchfeld (im Mockup ohne Backend — in Produktion an die globale Suche angebunden). */
  var NAV_ICON = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"/></svg>',
    moon: '<svg class="ep-nav-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"/></svg>',
    sun: '<svg class="ep-nav-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" focusable="false"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"/></svg>'
  };
  document.querySelectorAll('.ep-topnav').forEach(function(bar, i) {
    if (bar.querySelector('.ep-nav-actions')) return;
    var actions = document.createElement('div');
    actions.className = 'ep-nav-actions';

    /* ── Suche (Disclosure-Popover) ── */
    var search = document.createElement('div');
    search.className = 'ep-nav-search';
    var sToggle = document.createElement('button');
    sToggle.type = 'button';
    sToggle.className = 'ep-nav-icon-btn ep-nav-search-toggle';
    sToggle.setAttribute('aria-expanded', 'false');
    sToggle.setAttribute('aria-label', 'Suche öffnen');
    sToggle.innerHTML = NAV_ICON.search;
    var popId = 'ep-nav-search-pop-' + i;
    sToggle.setAttribute('aria-controls', popId);
    var pop = document.createElement('div');
    pop.className = 'ep-nav-search-pop';
    pop.id = popId;
    var inputId = 'ep-nav-search-input-' + i;
    pop.innerHTML =
      '<form class="ep-nav-search-form" role="search" action="#" novalidate>' +
        '<label class="sr-only" for="' + inputId + '">Suchbegriff</label>' +
        '<input class="ep-nav-search-input" id="' + inputId + '" type="search" placeholder="Wonach suchst Du?" autocomplete="off">' +
        '<button class="btn btn-filled btn-sm btn-co" type="submit">Suchen</button>' +
      '</form>';
    search.appendChild(sToggle);
    search.appendChild(pop);
    var sInput = pop.querySelector('.ep-nav-search-input');

    function closeSearch(focusToggle) {
      if (!search.classList.contains('is-open')) return;
      search.classList.remove('is-open');
      sToggle.setAttribute('aria-expanded', 'false');
      sToggle.setAttribute('aria-label', 'Suche öffnen');
      if (focusToggle) sToggle.focus();
    }
    function openSearch() {
      search.classList.add('is-open');
      sToggle.setAttribute('aria-expanded', 'true');
      sToggle.setAttribute('aria-label', 'Suche schließen');
      sInput.focus();
    }
    sToggle.addEventListener('click', function() {
      if (search.classList.contains('is-open')) closeSearch(true); else openSearch();
    });
    pop.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { e.preventDefault(); closeSearch(true); }
    });
    pop.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault(); /* Mockup: in Produktion an die globale Suche anbinden */
    });
    document.addEventListener('click', function(e) {
      if (!search.contains(e.target)) closeSearch(false);
    });
    /* Heraustabben (Fokus verlässt das Popover) schließt ebenfalls — wie bei den Nav-Dropdowns */
    search.addEventListener('focusout', function(e) {
      if (!search.contains(e.relatedTarget)) closeSearch(false);
    });

    /* ── Theme-Umschalter (Light ↔ Dark, global) ── */
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var tToggle = document.createElement('button');
    tToggle.type = 'button';
    tToggle.className = 'ep-nav-icon-btn ep-nav-theme-toggle';
    tToggle.setAttribute('aria-pressed', String(dark));
    tToggle.setAttribute('aria-label', dark ? 'Zum Hellmodus wechseln' : 'Zum Dunkelmodus wechseln');
    tToggle.innerHTML = NAV_ICON.moon + NAV_ICON.sun;
    tToggle.addEventListener('click', function() {
      var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      var next = isDark ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('ds-theme', next); } catch (e) {}
    });

    actions.appendChild(search);
    actions.appendChild(tToggle);

    var cta = bar.querySelector(':scope > .btn');
    if (cta) bar.insertBefore(actions, cta); else bar.appendChild(actions);
  });

  /* In-Page-Links mit data-ep (Topnav, Logo, Submenus, klickbare Karten, Breadcrumbs, Article-Cards) wechseln den Tab */
  document.querySelectorAll('.ep-page a[data-ep]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      activateExamplePage(link.dataset.ep, { bereich: link.dataset.kBereich, anliegen: link.dataset.kAnliegen });
    });
  });

  /* In-Page-Anker innerhalb derselben ep-page (z. B. „Platz sichern“ → #ev-anmeldung):
     Browser-Default ist Hard-Jump und bricht den „Ruhig“-Markenwert. Hier sanftes Scrollen,
     respektiert prefers-reduced-motion und greift nur, wenn das Ziel in derselben ep-page liegt. */
  document.querySelectorAll('.ep-page a[href^="#"]:not([data-ep])').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var href = link.getAttribute('href');
      if (href.length < 2) return;
      var target = document.getElementById(href.slice(1));
      if (!target) return;
      var ownPage = link.closest('.ep-page');
      if (!ownPage || !ownPage.contains(target)) return;
      e.preventDefault();
      var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* ── Formular-Fehlerzustand (geteilt von Kontakt- und Buchungsformular) ──
     Erzeugt bzw. entfernt das dokumentierte Muster: .field.has-error am Wrapper plus
     .error-msg[role="alert"] mit Warn-Icon darunter. */
  var FORM_ERR_ICON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" aria-hidden="true" style="flex-shrink:0"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/></svg> ';
  function clearError(field, input) {
    if (field) field.classList.remove('has-error');
    if (input) { input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby'); }
    var msg = field && field.querySelector('.error-msg');
    if (msg) msg.remove();
  }
  /* quiet=true lässt role="alert" weg. Nötig bei langen Formularen, die stattdessen eine
     Fehlerübersicht fokussieren: ein Dutzend gleichzeitig eingefügter Alerts ergibt beim
     Screenreader eine unbrauchbare Ansage-Salve. Die Meldung bleibt über aria-describedby
     mit dem Feld verbunden und wird beim Fokussieren gelesen. */
  function setError(field, input, id, text, quiet) {
    if (!field) return;
    field.classList.add('has-error');
    if (input) { input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', id); }
    var msg = document.createElement('span');
    msg.className = 'error-msg'; msg.id = id;
    if (!quiet) msg.setAttribute('role', 'alert');
    msg.innerHTML = FORM_ERR_ICON + text;
    field.appendChild(msg);
  }

  /* ── Kontaktformular: Validierung + Fehler-/Erfolgszustand ──
     Hebt das Anfrageformular auf das dokumentierte Muster (.field.has-error + .error-msg[role=alert]
     für Fehler, role="status" für Erfolg). novalidate unterdrückt native Bubbles, damit die
     Inline-Meldungen konsistent zur DS-Komponente erscheinen. */
  (function () {
    var form = document.getElementById('kf-es-form');
    if (!form) return;
    var success = document.getElementById('kf-es-success');
    var ICON = FORM_ERR_ICON;
    var checks = [
      { input: 'kf-es-name', id: 'kf-es-name-err', test: function (v) { return v.value.trim() !== ''; }, msg: 'Bitte gib Deinen Namen an' },
      { input: 'kf-es-email', id: 'kf-es-email-err', test: function (v) { return v.value.trim() !== '' && v.validity.valid; }, msg: 'Bitte eine gültige E-Mail-Adresse eingeben' }
    ];
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var firstInvalid = null;
      checks.forEach(function (c) {
        var input = document.getElementById(c.input);
        var field = input.closest('.field');
        clearError(field, input);
        if (!c.test(input)) { setError(field, input, c.id, c.msg); if (!firstInvalid) firstInvalid = input; }
      });
      var consent = document.getElementById('kf-es-consent');
      var cfield = document.getElementById('kf-es-consent-field');
      var oldMsg = cfield.querySelector('.error-msg'); if (oldMsg) oldMsg.remove();
      consent.removeAttribute('aria-invalid'); consent.removeAttribute('aria-describedby');
      if (!consent.checked) {
        consent.setAttribute('aria-invalid', 'true');
        consent.setAttribute('aria-describedby', 'kf-es-consent-err');
        var m = document.createElement('span');
        m.className = 'error-msg'; m.id = 'kf-es-consent-err'; m.setAttribute('role', 'alert');
        m.style.marginTop = 'var(--s2)';
        m.innerHTML = ICON + 'Bitte stimme der Verarbeitung zu';
        cfield.appendChild(m);
        if (!firstInvalid) firstInvalid = consent;
      }
      if (firstInvalid) { firstInvalid.focus(); return; }
      form.hidden = true;
      success.hidden = false;
      success.style.display = 'flex';
      success.focus();
    });
  })();

  /* ── Listing-Pages (Wissen-Übersicht, Veranstaltungen-Übersicht): Filter-Chips + Suche ──
     Client-side Suche über Title + Lead + Pill, AND-Logik mit Bereichs-Filter.
     Featured-Section ist filter-aware (eine Variante pro Bereich) und wird bei Suche ausgeblendet. */
  function setupListPage(opts) {
    var page = document.getElementById(opts.pageId);
    if (!page) return;
    var prefix = opts.prefix;
    var defaultFeaturedArea = opts.defaultFeaturedArea || 'ki';
    var noun = opts.noun;
    var nounPluralDat = opts.nounPluralDat; // für „keine X hinterlegt“

    var chips = page.querySelectorAll('.chip[data-filter]');
    var searchInput = page.querySelector('#' + prefix + '-search-input');
    var featuredSection = page.querySelector('#' + prefix + '-featured-section');
    var featuredCards = featuredSection ? featuredSection.querySelectorAll('.card[data-area]') : [];
    var gridCards = page.querySelectorAll('.layout-grid > .card[data-area]');
    var resultCount = page.querySelector('.' + prefix + '-result-count');
    var emptyState = page.querySelector('.' + prefix + '-empty-state');
    var emptyDetail = page.querySelector('.' + prefix + '-empty-state-detail');
    var loadMore = page.querySelector('.' + prefix + '-load-more');
    var resetBtn = page.querySelector('.' + prefix + '-reset-search');

    var state = { filter: 'all', query: '' };
    var debounceTimer = null;

    function cardSearchHaystack(card) {
      var title = (card.querySelector('.card-title, h2') || {}).textContent || '';
      var lead = (card.querySelector('.card-text, p') || {}).textContent || '';
      var pill = (card.querySelector('.pill') || {}).textContent || '';
      return (title + ' ' + lead + ' ' + pill).toLowerCase();
    }
    function matchesQuery(card, q) {
      if (!q) return true;
      return cardSearchHaystack(card).indexOf(q.toLowerCase()) !== -1;
    }
    function chipLabel(f) {
      var labels = { ki: 'Angewandte KI', es: 'Effektive Software', wo: 'Wirksame Organisationen' };
      return labels[f] || '';
    }

    function applyFilters() {
      var q = state.query.trim();
      var f = state.filter;
      var hasQuery = q.length > 0;
      var visibleGridCount = 0;

      if (hasQuery) {
        if (featuredSection) featuredSection.classList.add('is-hidden');
      } else {
        if (featuredSection) featuredSection.classList.remove('is-hidden');
        var featuredTarget = (f === 'all') ? defaultFeaturedArea : f;
        featuredCards.forEach(function(card) {
          card.classList.toggle('is-hidden', card.dataset.area !== featuredTarget);
        });
      }

      gridCards.forEach(function(card) {
        var areaMatch = (f === 'all') || (card.dataset.area === f);
        var searchMatch = matchesQuery(card, q);
        var show = areaMatch && searchMatch;
        card.classList.toggle('is-hidden', !show);
        if (show) visibleGridCount++;
      });

      var isEmpty = visibleGridCount === 0;
      if (emptyState) emptyState.classList.toggle('is-hidden', !isEmpty);
      if (loadMore) loadMore.classList.toggle('is-hidden', isEmpty || hasQuery);

      if (isEmpty && emptyDetail) {
        if (hasQuery && f !== 'all') {
          emptyDetail.textContent = 'Für „' + q + '“ im Bereich ' + chipLabel(f) + ' gibt es aktuell keine ' + nounPluralDat + '.';
        } else if (hasQuery) {
          emptyDetail.textContent = 'Für „' + q + '“ gibt es aktuell keine ' + nounPluralDat + '.';
        } else if (f !== 'all') {
          emptyDetail.textContent = 'Im Bereich ' + chipLabel(f) + ' sind aktuell keine ' + nounPluralDat + ' hinterlegt.';
        } else {
          emptyDetail.textContent = '';
        }
      }

      if (resultCount) {
        if (hasQuery) {
          resultCount.textContent = visibleGridCount + ' Treffer für „' + q + '“';
        } else {
          resultCount.textContent = '';
        }
      }
    }

    chips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        state.filter = chip.dataset.filter;
        chips.forEach(function(c) {
          c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
        });
        applyFilters();
      });
    });

    if (searchInput) {
      searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
          state.query = searchInput.value;
          applyFilters();
        }, 300);
      });
      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchInput.value) {
          searchInput.value = '';
          state.query = '';
          applyFilters();
          e.preventDefault();
        }
      });
    }

    // Global „/“-Shortcut fokussiert die Suche, wenn diese Listing-Page aktiv ist
    document.addEventListener('keydown', function(e) {
      if (e.key !== '/') return;
      var active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable)) return;
      if (!page.classList.contains('visible')) return;
      if (searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        state.query = '';
        state.filter = 'all';
        chips.forEach(function(c) {
          c.setAttribute('aria-pressed', c.dataset.filter === 'all' ? 'true' : 'false');
        });
        applyFilters();
        if (searchInput) searchInput.focus();
      });
    }

    applyFilters();
  }

  setupListPage({ pageId: 'ep-wb-uebersicht', prefix: 'wb', defaultFeaturedArea: 'ki', noun: 'Beitrag', nounPluralDat: 'Beiträge' });
  setupListPage({ pageId: 'ep-ev-uebersicht', prefix: 'ev', defaultFeaturedArea: 'es', noun: 'Veranstaltung', nounPluralDat: 'Veranstaltungen' });
  setupListPage({ pageId: 'ep-co-jobs', prefix: 'jobs', defaultFeaturedArea: 'es', noun: 'Stelle', nounPluralDat: 'Stellen' });

  /* ── Logo-Carousel (Crossfade, pausierbar, Tastatur-zugänglich) ── */
  document.querySelectorAll('.logo-carousel').forEach(function(carousel) {
    var slides = Array.from(carousel.querySelectorAll('.logo-carousel-slide'));
    var dots = Array.from(carousel.querySelectorAll('.logo-carousel-dot'));
    var pauseBtn = carousel.querySelector('.logo-carousel-pause');
    var total = slides.length;
    if (total < 2) return;
    var current = 0;
    var timer = null;
    var DURATION = 6000;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function goTo(index) {
      current = (index + total) % total;
      slides.forEach(function(s, i) {
        s.setAttribute('aria-hidden', i !== current ? 'true' : 'false');
      });
      dots.forEach(function(d, i) {
        d.setAttribute('aria-selected', i === current ? 'true' : 'false');
        d.setAttribute('tabindex', i === current ? '0' : '-1');
      });
    }
    function start() {
      if (reducedMotion) return;
      stop();
      timer = setInterval(function() { goTo(current + 1); }, DURATION);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function setPaused(paused) {
      if (paused) {
        stop();
        carousel.classList.add('paused');
        if (pauseBtn) { pauseBtn.setAttribute('aria-pressed', 'true'); pauseBtn.setAttribute('aria-label', 'Logo-Animation fortsetzen'); }
      } else {
        start();
        carousel.classList.remove('paused');
        if (pauseBtn) { pauseBtn.setAttribute('aria-pressed', 'false'); pauseBtn.setAttribute('aria-label', 'Logo-Animation pausieren'); }
      }
    }

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { goTo(i); setPaused(true); });
    });
    if (pauseBtn) {
      pauseBtn.addEventListener('click', function() {
        setPaused(!carousel.classList.contains('paused'));
      });
    }
    carousel.addEventListener('keydown', function(e) {
      if (!e.target.classList.contains('logo-carousel-dot')) return;
      var handled = true;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { goTo(current - 1); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { goTo(current + 1); }
      else if (e.key === 'Home') { goTo(0); }
      else if (e.key === 'End') { goTo(total - 1); }
      else { handled = false; }
      if (handled) { e.preventDefault(); dots[current].focus(); setPaused(true); }
    });
    /* Pause bei Hover und Tastatur-Fokus (Best Practice für Auto-Karussells) */
    carousel.addEventListener('mouseenter', function() { if (!carousel.classList.contains('paused')) stop(); });
    carousel.addEventListener('mouseleave', function() { if (!carousel.classList.contains('paused')) start(); });
    carousel.addEventListener('focusin', function() { if (!carousel.classList.contains('paused')) stop(); });
    carousel.addEventListener('focusout', function(e) {
      if (!carousel.classList.contains('paused') && !carousel.contains(e.relatedTarget)) start();
    });

    goTo(0);
    start();
  });

  /* ── Bild-Slider (Carousel) ── */
  document.querySelectorAll('.img-slider').forEach(function(slider) {
    var slides  = Array.from(slider.querySelectorAll('.img-slide'));
    var dots    = Array.from(slider.querySelectorAll('.img-dot'));
    var total   = slides.length;
    var current = 0;

    function goTo(index) {
      current = (index + total) % total;
      slides.forEach(function(s, i) {
        s.setAttribute('aria-hidden', i !== current ? 'true' : 'false');
        s.classList.toggle('active', i === current);
      });
      dots.forEach(function(d, i) {
        d.classList.toggle('active', i === current);
        d.setAttribute('aria-selected', i === current ? 'true' : 'false');
        d.setAttribute('tabindex', i === current ? '0' : '-1');
      });
    }

    slider.querySelector('.img-slider-prev').addEventListener('click', function() { goTo(current - 1); });
    slider.querySelector('.img-slider-next').addEventListener('click', function() { goTo(current + 1); });
    dots.forEach(function(dot, i) { dot.addEventListener('click', function() { goTo(i); }); });

    slider.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); e.preventDefault(); }
    });

    goTo(0);
  });

  /* ── Team-Tile-Rotation auf Landing ──
     6 Slots werden bei jedem Page-Load zufällig aus dem Pool von 13 Personen gefüllt.
     Der Pool ist absichtlich kein vollständiges Roster — Conciso hat ~70 Köpfe, gezeigt
     werden 6 als rotierender Ausschnitt, damit der Eindruck dynamisch und nicht
     hardcodiert wirkt. Wenn JS deaktiviert ist, bleibt die fallback-Initial-Belegung
     aus dem HTML stehen.

     photo + pos: Mock-Portraits aus dem images-Ordner. Jeder Eintrag zielt mit
     object-position auf ein bestimmtes Gesicht im Foto (manche Fotos enthalten
     mehrere Köpfe, die ich über pos voneinander trenne). In Produktion würde
     pro Person ein dediziertes Portrait liegen. */
  var teamPool = [
    { initials: 'LB', name: 'Lukas Brandt',    role: 'Senior AI Engineer',           area: 'ki', photo: 'meetup-demo.jpg',         pos: '55% 28%' },
    { initials: 'MM', name: 'Maria Müller',    role: 'UX Lead',                       area: 'ki', photo: 'team-tablet.jpg',         pos: '50% 35%' },
    { initials: 'JB', name: 'Julia Becker',    role: 'Senior ML Engineer',            area: 'ki', photo: 'team-coffee.jpg',         pos: '35% 38%' },
    { initials: 'JA', name: 'Jonas Albers',    role: 'AI Solutions Consultant',       area: 'ki', photo: 'meetup-vortrag.jpg',      pos: '38% 30%' },
    { initials: 'TW', name: 'Tim Westphal',    role: 'Lead Software Engineer',        area: 'es', photo: 'meetup-speaker.jpg',      pos: '62% 30%' },
    { initials: 'MH', name: 'Marc Hoffmann',   role: 'Senior Software Engineer',      area: 'es', photo: 'team-tablet.jpg',         pos: '18% 38%' },
    { initials: 'DV', name: 'David Vogel',     role: 'Software Architect',            area: 'es', photo: 'beratung-gespraech.jpg',  pos: '40% 35%' },
    { initials: 'SB', name: 'Selma Behrens',   role: 'DevOps & Platform Engineer',    area: 'es', photo: 'team-tablet.jpg',         pos: '78% 35%' },
    { initials: 'SK', name: 'Sarah Kühn',      role: 'Lead Organisationsentwicklung', area: 'wo', photo: 'workshop-zuhoeren.jpg',   pos: '62% 25%' },
    { initials: 'LS', name: 'Lara Schmitt',    role: 'Senior Change Coach',           area: 'wo', photo: 'team-coffee.jpg',         pos: '18% 35%' },
    { initials: 'CR', name: 'Christoph Roth',  role: 'Lead Transformation',           area: 'wo', photo: 'team-coffee.jpg',         pos: '78% 32%' },
    { initials: 'AV', name: 'Anja Voss',       role: 'Geschäftsführung',              area: 'co', photo: 'workshop-zuhoeren.jpg',   pos: '28% 40%' },
    { initials: 'MB', name: 'Markus Bauer',    role: 'People & Culture',              area: 'co', photo: 'beratung-tasse.jpg',      pos: '50% 25%' }
  ];

  function shuffleArray(arr) {
    var copy = arr.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = copy[i]; copy[i] = copy[j]; copy[j] = tmp;
    }
    return copy;
  }

  document.querySelectorAll('[data-team-tiles]').forEach(function(container) {
    var tiles = container.querySelectorAll('[data-team-tile]');
    if (!tiles.length) return;
    var selected = shuffleArray(teamPool).slice(0, tiles.length);
    tiles.forEach(function(tile, i) {
      var member = selected[i];
      if (!member) return;
      var avatar = tile.querySelector('.article-avatar');
      var name   = tile.querySelector('.author-card-name');
      var role   = tile.querySelector('.author-card-role');
      if (avatar) {
        avatar.setAttribute('data-area', member.area);
        if (member.photo) {
          /* Bild rendern: bestehende Initials als Fallback im Textinhalt bleiben (von img überdeckt) */
          avatar.textContent = member.initials;
          var img = document.createElement('img');
          img.src = 'assets/images/' + member.photo;
          img.alt = '';
          img.style.objectPosition = member.pos || 'center';
          avatar.appendChild(img);
        } else {
          avatar.textContent = member.initials;
        }
      }
      if (name) name.textContent = member.name;
      if (role) role.textContent = member.role;
    });
  });

  /* ── Dropdowns: Custom Select & Combobox ──
     Markup-getrieben: Autor schreibt semantisches HTML (button[aria-haspopup=listbox] + ul[role=listbox]
     bzw. input[role=combobox] + ul[role=listbox]); JS ergänzt IDs, ARIA-Zustände, Tastatur und Filter.
     Tastatur wie das Topnav-Dropdown: Pfeile/Home/End navigieren, Enter/Space wählt, Escape/Tab schließt.
     Ein gemeinsames Register schließt offene Dropdowns bei Außenklick. */
  (function () {
    var ddSeq = 0;
    var ddInstances = []; /* {root, close} */
    function registerDropdown(root, closeFn) { ddInstances.push({ root: root, close: closeFn }); }
    function closeAllDropdowns(except) {
      ddInstances.forEach(function (d) { if (d.root !== except) d.close(); });
    }
    document.addEventListener('click', function (e) {
      ddInstances.forEach(function (d) { if (!d.root.contains(e.target)) d.close(); });
    });

    /* ── Custom Select (Einzelauswahl) ── */
    document.querySelectorAll('.ep-select').forEach(function (root) {
      var trigger = root.querySelector('.ep-select-trigger');
      var menu = root.querySelector('.ep-select-menu');
      var valueEl = root.querySelector('.ep-select-value');
      if (!trigger || !menu || !valueEl) return;
      var options = Array.prototype.slice.call(menu.querySelectorAll('.ep-select-option'));
      var uid = 'ep-select-' + (ddSeq++);
      if (!menu.id) menu.id = uid + '-menu';
      menu.setAttribute('tabindex', '-1');
      var placeholder = valueEl.getAttribute('data-placeholder') || valueEl.textContent;

      /* Optionales verstecktes Feld für den Formular-Submit (data-name am .ep-select) */
      var hidden = null;
      if (root.dataset.name) {
        hidden = document.createElement('input');
        hidden.type = 'hidden';
        hidden.name = root.dataset.name;
        root.appendChild(hidden);
      }

      options.forEach(function (opt, i) {
        if (!opt.id) opt.id = uid + '-opt-' + i;
        if (!opt.hasAttribute('aria-selected')) opt.setAttribute('aria-selected', 'false');
      });

      function optionLabel(opt) { return (opt.dataset.label || opt.textContent).trim(); }
      function selectedOption() {
        return options.filter(function (o) { return o.getAttribute('aria-selected') === 'true'; })[0] || null;
      }
      function syncValue() {
        var sel = selectedOption();
        if (sel) {
          valueEl.textContent = optionLabel(sel);
          trigger.classList.remove('is-placeholder');
          if (hidden) hidden.value = sel.dataset.value != null ? sel.dataset.value : optionLabel(sel);
        } else {
          valueEl.textContent = placeholder;
          trigger.classList.add('is-placeholder');
          if (hidden) hidden.value = '';
        }
      }

      var activeIndex = -1;
      function setActive(i) {
        options.forEach(function (o) { o.classList.remove('is-active'); });
        activeIndex = i;
        if (i >= 0 && options[i]) {
          options[i].classList.add('is-active');
          menu.setAttribute('aria-activedescendant', options[i].id);
          options[i].scrollIntoView({ block: 'nearest' });
        } else {
          menu.removeAttribute('aria-activedescendant');
        }
      }
      function isOpen() { return root.classList.contains('is-open'); }
      function open() {
        if (isOpen() || root.classList.contains('is-disabled')) return;
        closeAllDropdowns(root);
        root.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        var sel = selectedOption();
        setActive(sel ? options.indexOf(sel) : 0);
        menu.focus();
      }
      function close(focusTrigger) {
        if (!isOpen()) return;
        root.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
        setActive(-1);
        if (focusTrigger) trigger.focus();
      }
      function choose(opt) {
        options.forEach(function (o) { o.setAttribute('aria-selected', o === opt ? 'true' : 'false'); });
        syncValue();
        root.dispatchEvent(new CustomEvent('ep:change', { bubbles: true, detail: { value: opt.dataset.value, label: optionLabel(opt) } }));
        close(true);
      }

      trigger.addEventListener('click', function () { if (isOpen()) close(true); else open(); });
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault(); open();
        }
      });
      options.forEach(function (opt, i) {
        opt.addEventListener('click', function () { choose(opt); });
        opt.addEventListener('mousemove', function () { if (activeIndex !== i) setActive(i); });
      });

      var typeBuffer = '', typeTimer = null;
      menu.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { e.preventDefault(); close(true); return; }
        if (e.key === 'Tab') { close(false); return; }
        if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(options.length - 1, activeIndex + 1)); return; }
        if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(0, activeIndex - 1)); return; }
        if (e.key === 'Home') { e.preventDefault(); setActive(0); return; }
        if (e.key === 'End') { e.preventDefault(); setActive(options.length - 1); return; }
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          if (activeIndex >= 0) choose(options[activeIndex]);
          return;
        }
        if (e.key.length === 1 && /\S/.test(e.key)) {
          typeBuffer += e.key.toLowerCase();
          clearTimeout(typeTimer);
          typeTimer = setTimeout(function () { typeBuffer = ''; }, 600);
          for (var k = 0; k < options.length; k++) {
            if (optionLabel(options[k]).toLowerCase().indexOf(typeBuffer) === 0) { setActive(k); break; }
          }
        }
      });

      registerDropdown(root, function () { close(false); });
      syncValue();
    });

    /* ── Combobox (Tipp-Filter, optional Multi-Select via .is-multi) ── */
    document.querySelectorAll('.ep-combobox').forEach(function (root) {
      var control = root.querySelector('.ep-combobox-control');
      var input = root.querySelector('.ep-combobox-input');
      var menu = root.querySelector('.ep-combobox-menu');
      if (!control || !input || !menu) return;
      var multi = root.classList.contains('is-multi');
      var options = Array.prototype.slice.call(menu.querySelectorAll('.ep-select-option'));
      var uid = 'ep-combobox-' + (ddSeq++);
      if (!menu.id) menu.id = uid + '-menu';
      input.setAttribute('role', 'combobox');
      input.setAttribute('aria-controls', menu.id);
      input.setAttribute('aria-expanded', 'false');
      input.setAttribute('aria-autocomplete', 'list');
      if (multi) menu.setAttribute('aria-multiselectable', 'true');

      var empty = menu.querySelector('.ep-combobox-empty');
      if (!empty) {
        empty = document.createElement('li');
        empty.className = 'ep-combobox-empty';
        empty.setAttribute('role', 'presentation');
        empty.textContent = root.dataset.emptyText || 'Keine Treffer';
        empty.hidden = true;
        menu.appendChild(empty);
      }

      options.forEach(function (opt, i) {
        if (!opt.id) opt.id = uid + '-opt-' + i;
        opt.setAttribute('aria-selected', opt.getAttribute('aria-selected') === 'true' ? 'true' : 'false');
      });

      var selected = []; /* gewählte Werte (Multi) */
      function optionLabel(opt) { return (opt.dataset.label || opt.textContent).trim(); }
      function shown() { return options.filter(function (o) { return !o.hidden; }); }
      function activeOpt() { return options.filter(function (o) { return o.classList.contains('is-active'); })[0] || null; }
      function setActive(opt) {
        options.forEach(function (o) { o.classList.remove('is-active'); });
        if (opt) {
          opt.classList.add('is-active');
          input.setAttribute('aria-activedescendant', opt.id);
          opt.scrollIntoView({ block: 'nearest' });
        } else {
          input.removeAttribute('aria-activedescendant');
        }
      }
      function filter() {
        var q = input.value.trim().toLowerCase();
        var any = false;
        options.forEach(function (o) {
          var picked = multi && selected.indexOf(o.dataset.value) !== -1;
          var match = !q || optionLabel(o).toLowerCase().indexOf(q) !== -1;
          o.hidden = picked || !match;
          if (!o.hidden) any = true;
        });
        empty.hidden = any;
        var vis = shown();
        if (vis.indexOf(activeOpt()) === -1) setActive(vis[0] || null);
      }
      function isOpen() { return root.classList.contains('is-open'); }
      function open() {
        if (isOpen() || root.classList.contains('is-disabled')) return;
        closeAllDropdowns(root);
        root.classList.add('is-open');
        input.setAttribute('aria-expanded', 'true');
        filter();
      }
      function close() {
        if (!isOpen()) return;
        root.classList.remove('is-open');
        input.setAttribute('aria-expanded', 'false');
        setActive(null);
        /* Getippten Filtertext nicht über das Schließen hinaus stehen lassen.
           Multi: Eingabe ist reiner Filter → leeren. Single: auf das Label der gewählten Option
           zurückfallen (bzw. leeren), damit kein ungültiger Freitext im Feld hängen bleibt.
           Nächstes open() filtert ohnehin neu, daher hier kein filter()-Aufruf nötig. */
        if (multi) {
          if (input.value !== '') { input.value = ''; updateClear(); }
        } else {
          var sel = options.filter(function (o) { return o.getAttribute('aria-selected') === 'true'; })[0];
          var label = sel ? optionLabel(sel) : '';
          if (input.value !== label) { input.value = label; updateClear(); }
        }
      }
      function renderTokens() {
        Array.prototype.slice.call(control.querySelectorAll('.ep-combobox-token')).forEach(function (t) { t.remove(); });
        selected.forEach(function (val) {
          var opt = options.filter(function (o) { return o.dataset.value === val; })[0];
          var label = opt ? optionLabel(opt) : val;
          var token = document.createElement('span');
          token.className = 'ep-combobox-token';
          var lab = document.createElement('span');
          lab.className = 'ep-combobox-token-label';
          lab.textContent = label;
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'ep-combobox-token-remove';
          btn.setAttribute('aria-label', label + ' entfernen');
          btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" d="M6 18 18 6M6 6l12 12"/></svg>';
          btn.addEventListener('click', function (e) { e.stopPropagation(); deselect(val); input.focus(); });
          token.appendChild(lab); token.appendChild(btn);
          control.insertBefore(token, input);
        });
      }
      function choose(opt) {
        var val = opt.dataset.value != null ? opt.dataset.value : optionLabel(opt);
        if (multi) {
          if (selected.indexOf(val) === -1) selected.push(val);
          opt.setAttribute('aria-selected', 'true');
          input.value = '';
          renderTokens();
          filter();
          input.focus();
        } else {
          options.forEach(function (o) { o.setAttribute('aria-selected', o === opt ? 'true' : 'false'); });
          input.value = optionLabel(opt);
          close();
        }
        updateClear();
        root.dispatchEvent(new CustomEvent('ep:change', { bubbles: true, detail: { value: val, multi: multi, selected: selected.slice() } }));
      }
      function deselect(val) {
        selected = selected.filter(function (v) { return v !== val; });
        var opt = options.filter(function (o) { return o.dataset.value === val; })[0];
        if (opt) opt.setAttribute('aria-selected', 'false');
        renderTokens();
        filter();
      }

      options.forEach(function (opt) {
        opt.addEventListener('click', function () { choose(opt); });
        opt.addEventListener('mousemove', function () { if (!opt.hidden) setActive(opt); });
      });
      control.addEventListener('click', function (e) {
        if (e.target.closest('.ep-combobox-token-remove')) return;
        input.focus(); open();
      });
      /* Chevron als Toggle: schließt ein offenes Menü, öffnet ein geschlossenes (stopPropagation,
         sonst öffnet der Control-Handler direkt wieder). Klick in den Textbereich lässt offen — man tippt. */
      var caret = control.querySelector('.ep-select-caret');
      if (caret) {
        caret.addEventListener('click', function (e) {
          e.stopPropagation();
          if (isOpen()) close(); else { input.focus(); open(); }
        });
      }
      /* Komfort: Lösch-Button leert das Eingabefeld mit einem Klick. Sichtbar nur bei Text im Feld.
         Multi: leert nur den getippten Filtertext, Chips bleiben. Single: leert Text und hebt die Auswahl auf
         (sonst stünde leeres Feld neben weiterhin gewählter Option). Sitzt links vom Chevron. */
      var clearBtn = document.createElement('button');
      clearBtn.type = 'button';
      clearBtn.className = 'ep-combobox-clear';
      clearBtn.setAttribute('aria-label', 'Eingabe löschen');
      clearBtn.hidden = true;
      clearBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><path stroke-linecap="round" d="M6 18 18 6M6 6l12 12"/></svg>';
      if (caret) control.insertBefore(clearBtn, caret); else control.appendChild(clearBtn);
      function updateClear() {
        var has = input.value !== '';
        clearBtn.hidden = !has;
        control.classList.toggle('has-clear', has); /* reserviert Padding rechts für den Button */
      }
      clearBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        input.value = '';
        if (!multi) options.forEach(function (o) { o.setAttribute('aria-selected', 'false'); });
        updateClear();
        input.focus();
        open();
        filter();
      });
      input.addEventListener('focus', open);
      input.addEventListener('input', function () { open(); filter(); updateClear(); });
      input.addEventListener('keydown', function (e) {
        var vis = shown();
        var idx = vis.indexOf(activeOpt());
        if (e.key === 'ArrowDown') { e.preventDefault(); if (!isOpen()) { open(); return; } setActive(vis[Math.min(vis.length - 1, idx + 1)] || vis[0] || null); return; }
        if (e.key === 'ArrowUp') { e.preventDefault(); setActive(vis[Math.max(0, idx - 1)] || null); return; }
        if (e.key === 'Home') { if (isOpen()) { e.preventDefault(); setActive(vis[0] || null); } return; }
        if (e.key === 'End') { if (isOpen()) { e.preventDefault(); setActive(vis[vis.length - 1] || null); } return; }
        if (e.key === 'Enter') { if (isOpen() && activeOpt()) { e.preventDefault(); choose(activeOpt()); } return; }
        if (e.key === 'Escape') { if (isOpen()) { e.preventDefault(); close(); } return; }
        if (e.key === 'Backspace' && multi && input.value === '' && selected.length) { deselect(selected[selected.length - 1]); }
      });

      registerDropdown(root, close);
    });
  })();

  /* ── Farb-Swatches: Hex sichtbar machen (Tonal-Paletten) + Klick/Tastatur zum Kopieren ── */
  (function() {
    var swatches = Array.prototype.slice.call(document.querySelectorAll('.swatch'));
    var clipCards = Array.prototype.slice.call(document.querySelectorAll('.clip-card'));
    if (!swatches.length && !clipCards.length) return;

    /* Hex bewusst aus dem style-ATTRIBUT lesen (nicht el.style.background — Browser
       serialisieren das teils zu rgb()), damit der Literal-Hex erhalten bleibt. */
    function hexIn(str) {
      var m = (str || '').match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/);
      return m ? m[0].toUpperCase() : null;
    }

    /* Screenreader-Rückmeldung */
    var live = document.createElement('div');
    live.setAttribute('aria-live', 'polite');
    live.className = 'sr-only';
    document.body.appendChild(live);

    function legacyCopy(text) {
      try {
        var ta = document.createElement('textarea');
        ta.value = text; ta.setAttribute('readonly', '');
        ta.style.position = 'fixed'; ta.style.left = '-9999px';
        document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta);
      } catch (e) { /* Clipboard nicht verfügbar — Hex ist sichtbar und manuell markierbar */ }
    }
    function done(hex, el) {
      live.textContent = hex + ' kopiert';
      el.classList.add('is-copied');
      window.setTimeout(function() { el.classList.remove('is-copied'); }, 1100);
    }
    function copy(hex, el) {
      if (!hex) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(hex).then(function() { done(hex, el); },
          function() { legacyCopy(hex); done(hex, el); });
      } else { legacyCopy(hex); done(hex, el); }
    }

    function makeCopyable(el, hex) {
      el.dataset.hex = hex;
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute('aria-label', 'Farbe ' + hex + ' kopieren');
      el.setAttribute('title', hex + ' — klicken zum Kopieren');
      el.classList.add('is-copyable');
    }

    var inTonal = !!document.querySelector('#sec-colors');
    swatches.forEach(function(sw) {
      var hex = hexIn(sw.getAttribute('style'));
      if (!hex) return;
      /* Hex nur in der vollbreiten Tonal-Palette (#sec-colors) einblenden — in den schmalen
         Bereichs-Übersichtskarten (#sec-areas) ist zu wenig Platz; dort greift nur der title-Tooltip. */
      if (inTonal && sw.closest('#sec-colors')) {
        var span = sw.querySelector('span');
        var hx = document.createElement('span');
        hx.className = 'swatch-hex';
        hx.textContent = hex;
        if (span && span.style.color) hx.style.color = span.style.color;
        sw.appendChild(hx);
      }
      makeCopyable(sw, hex);
    });
    clipCards.forEach(function(card) {
      var block = card.querySelector('div');
      var hex = hexIn(block && block.getAttribute('style')) || hexIn(card.textContent);
      if (hex) makeCopyable(card, hex);
    });

    document.addEventListener('click', function(e) {
      var el = e.target.closest && e.target.closest('.is-copyable');
      if (el) copy(el.dataset.hex, el);
    });
    document.addEventListener('keydown', function(e) {
      if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;
      var el = e.target.closest && e.target.closest('.is-copyable');
      if (el && document.activeElement === el) { e.preventDefault(); copy(el.dataset.hex, el); }
    });
  })();

  /* ── Buchungsformular: bedingte Felder, Teilnehmenden-Repeater, Preiszeile, Validierung ──
     Läuft über jedes form[data-booking], ist also mehrfach instanziierbar. Alle Elemente werden
     über data-bk-Hooks gefunden statt über feste IDs; die IDs selbst tragen den Formular-Prefix,
     damit label/for eindeutig bleibt. Konfiguration am <form>: data-price (Preis pro Platz in Euro),
     data-max (Höchstzahl Plätze). */
  (function () {
    var EURO = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 });

    function hook(root, name) { return root.querySelector('[data-bk="' + name + '"]'); }

    function setupBookingForm(form) {
      var price = parseInt(form.dataset.price || '0', 10);
      var max = parseInt(form.dataset.max || '12', 10);
      var firmaBlock = hook(form, 'firma-block');
      var rechnungToggle = hook(form, 'rechnung-abweichend');
      var rechnungBlock = hook(form, 'rechnung-block');
      var selbstTeil = hook(form, 'selbst-teil');
      var anzahl = hook(form, 'anzahl');
      var personen = hook(form, 'personen');
      var template = hook(form, 'person-template');
      var addBtn = hook(form, 'add-person');
      /* Zwei Preiszeilen: eine bei der Anzahl (dort passiert die Änderung, deshalb role="status"),
         eine über dem Submit (dort fällt die Entscheidung). Beide werden gemeinsam aktualisiert. */
      var summaryCount = form.querySelectorAll('[data-bk="summary-count"]');
      var summaryTotal = form.querySelectorAll('[data-bk="summary-total"]');
      var errorBox = hook(form, 'errors');
      var terminSelect = hook(form, 'termin');
      var firmaName = hook(form, 'firma');
      /* Das Erfolgspanel liegt außerhalb des Formulars, weil das Formular beim Absenden auf
         hidden geht. Deshalb per ID aus data-success statt über einen Hook im Formular. */
      var success = form.dataset.success ? document.getElementById(form.dataset.success) : null;
      var kontakt = {
        vorname: hook(form, 'kontakt-vorname'),
        nachname: hook(form, 'kontakt-nachname'),
        email: hook(form, 'kontakt-email')
      };

      /* Bedingte Blöcke: hidden statt disabled, damit eingegebene Werte erhalten bleiben und
         beim Submit mitgehen. required wird mitgeschaltet, sonst blockiert ein unsichtbares
         Pflichtfeld die Absendung. */
      function toggleBlock(block, show) {
        if (!block) return;
        block.hidden = !show;
        block.querySelectorAll('[data-required]').forEach(function (el) {
          if (show) { el.setAttribute('required', ''); el.setAttribute('aria-required', 'true'); }
          else {
            el.removeAttribute('required'); el.removeAttribute('aria-required');
            clearError(el.closest('.field'), el);
          }
        });
      }

      function kundentyp() {
        var checked = form.querySelector('[data-bk="kundentyp"]:checked');
        return checked ? checked.value : 'firma';
      }

      function blocks() { return Array.prototype.slice.call(personen.querySelectorAll('.bk-person')); }

      function blockHasData(block) {
        return Array.prototype.slice.call(block.querySelectorAll('input')).some(function (i) {
          return i.value.trim() !== '';
        });
      }

      /* IDs, label/for und autocomplete-Sections nach der aktuellen DOM-Reihenfolge neu setzen.
         Die Feldwerte wandern dabei mit ihrem Knoten mit, es wird nichts umkopiert. */
      function renumber() {
        blocks().forEach(function (block, idx) {
          var n = idx + 1;
          var title = hook(block, 'person-title');
          if (title) title.textContent = 'Teilnehmende ' + n;
          block.querySelectorAll('.field').forEach(function (field) {
            var input = field.querySelector('input');
            var label = field.querySelector('label');
            if (!input) return;
            input.id = form.id + '-p' + n + '-' + input.dataset.bk.replace(/^p-/, '');
            if (label) label.htmlFor = input.id;
            if (input.dataset.ac) input.setAttribute('autocomplete', 'section-tn' + n + ' ' + input.dataset.ac);
          });
          var remove = hook(block, 'remove-person');
          if (remove) {
            /* Block 1 ist bei „Ich nehme selbst teil“ an die Kontaktdaten gebunden und wird nicht
               einzeln entfernt; stattdessen den Haken lösen. */
            var locked = n === 1 && selbstTeil && selbstTeil.checked;
            remove.hidden = locked || blocks().length < 2;
            remove.setAttribute('aria-label', 'Teilnehmende ' + n + ' entfernen');
          }
          var hint = hook(block, 'person-hint');
          if (hint) hint.hidden = !(n === 1 && selbstTeil && selbstTeil.checked);
        });
      }

      function renderPersons(target) {
        var current = blocks().length;
        if (target > current) {
          for (var i = current; i < target; i++) {
            personen.appendChild(template.content.cloneNode(true));
          }
        } else if (target < current) {
          var list = blocks();
          for (var j = current - 1; j >= target; j--) list[j].parentNode.removeChild(list[j]);
        }
        renumber();
        updateSummary();
        syncPerson1();
      }

      function countError(text) {
        var field = anzahl.closest('.field');
        clearError(field, anzahl);
        if (text) setError(field, anzahl, form.id + '-anzahl-err', text);
      }

      /* Anzahl reduzieren darf keine ausgefüllten Blöcke still verwerfen. */
      function requestCount(next) {
        var current = blocks().length;
        next = Math.max(1, Math.min(max, next));
        if (next < current) {
          var list = blocks();
          for (var i = current - 1; i >= next; i--) {
            if (blockHasData(list[i])) {
              anzahl.value = current;
              countError('Teilnehmende ' + (i + 1) + ' enthält noch Daten. Entferne den Block direkt über „Entfernen“.');
              return;
            }
          }
        }
        countError('');
        anzahl.value = next;
        renderPersons(next);
      }

      function updateSummary() {
        var n = blocks().length;
        var total = EURO.format(price) + ' × ' + n + ' = ' + EURO.format(price * n) + ' zzgl. MwSt.';
        summaryCount.forEach(function (el) { el.textContent = n === 1 ? '1 Platz' : n + ' Plätze'; });
        summaryTotal.forEach(function (el) { el.textContent = total; });
        renderOrder(n);
      }

      /* Bestellübersicht direkt über dem Submit. Leere Zeilen bleiben stehen und tragen
         data-empty, statt zu verschwinden: eine Übersicht, die Zeilen ein- und ausblendet,
         springt beim Ausfüllen und man sieht nicht, was noch fehlt. */
      function setOrder(name, value, empty) {
        var el = hook(form, name);
        if (!el) return;
        el.textContent = value;
        if (empty) el.setAttribute('data-empty', ''); else el.removeAttribute('data-empty');
      }

      function renderOrder(n) {
        var opt = terminSelect && terminSelect.options[terminSelect.selectedIndex];
        var hasTermin = opt && terminSelect.value;
        setOrder('order-termin', hasTermin ? opt.textContent : 'Noch nicht gewählt', !hasTermin);

        var kunde;
        if (kundentyp() === 'firma') kunde = firmaName && firmaName.value.trim();
        else kunde = [kontakt.vorname, kontakt.nachname].map(function (f) {
          return f ? f.value.trim() : '';
        }).filter(Boolean).join(' ');
        setOrder('order-kunde', kunde || 'Noch nicht ausgefüllt', !kunde);

        setOrder('order-plaetze', String(n));
        setOrder('order-total', EURO.format(price * n));
        setOrder('order-note', n + ' × ' + EURO.format(price) + ', zzgl. MwSt.');
      }

      /* Block 1 folgt den Kontaktdaten, solange er nicht von Hand bearbeitet wurde. Die Felder
         bleiben editierbar (nie disabled), sonst gingen die Werte beim Submit verloren. */
      function syncPerson1() {
        if (!selbstTeil) return;
        var first = blocks()[0];
        if (!first) return;
        var map = { 'p-vorname': kontakt.vorname, 'p-nachname': kontakt.nachname, 'p-email': kontakt.email };
        Object.keys(map).forEach(function (key) {
          var target = hook(first, key);
          var source = map[key];
          if (!target || !source) return;
          if (selbstTeil.checked && !target.dataset.touched) target.value = source.value;
          else if (!selbstTeil.checked && !target.dataset.touched) target.value = '';
        });
      }

      form.querySelectorAll('[data-bk="kundentyp"]').forEach(function (radio) {
        radio.addEventListener('change', function () { toggleBlock(firmaBlock, kundentyp() === 'firma'); updateSummary(); });
      });
      if (rechnungToggle) rechnungToggle.addEventListener('change', function () {
        toggleBlock(rechnungBlock, rechnungToggle.checked);
      });
      if (terminSelect) terminSelect.addEventListener('change', updateSummary);
      if (firmaName) firmaName.addEventListener('input', updateSummary);
      if (selbstTeil) selbstTeil.addEventListener('change', function () { syncPerson1(); renumber(); });
      [kontakt.vorname, kontakt.nachname, kontakt.email].forEach(function (input) {
        if (input) input.addEventListener('input', function () { syncPerson1(); updateSummary(); });
      });
      if (anzahl) {
        anzahl.addEventListener('change', function () { requestCount(parseInt(anzahl.value, 10) || 1); });
        anzahl.addEventListener('input', function () {
          var v = parseInt(anzahl.value, 10);
          if (!isNaN(v) && v >= 1 && v <= max) requestCount(v);
        });
      }
      if (addBtn) addBtn.addEventListener('click', function () {
        var before = blocks().length;
        requestCount(before + 1);
        var added = blocks()[before];
        if (added) { var f = added.querySelector('input'); if (f) f.focus(); }
      });
      personen.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-bk="remove-person"]');
        if (!btn) return;
        var block = btn.closest('.bk-person');
        block.parentNode.removeChild(block);
        anzahl.value = blocks().length;
        countError('');
        renumber();
        updateSummary();
        anzahl.focus();
      });
      /* Nur echte Nutzereingaben markieren einen Teilnehmenden-Block als „von Hand bearbeitet“; die
         programmatische Übernahme aus den Kontaktdaten löst kein input-Event aus. */
      personen.addEventListener('input', function (e) {
        if (e.target.dataset && e.target.dataset.bk) e.target.dataset.touched = '1';
      });

      /* Fehlerübersicht: ein fokussierbarer Kasten am Formularkopf mit Sprunglinks zu jedem
         fehlerhaften Feld. Bei einem Formular dieser Länge ist der Sprung auf das erste
         ungültige Feld allein zu wenig, weil man die übrigen Fehler nie zu sehen bekommt. */
      function renderErrorList(items) {
        if (!errorBox) return;
        var list = hook(errorBox, 'error-list');
        list.innerHTML = '';
        items.forEach(function (item) {
          var li = document.createElement('li');
          var a = document.createElement('a');
          a.href = '#' + item.id;
          a.textContent = item.text;
          a.dataset.target = item.id;
          li.appendChild(a);
          list.appendChild(li);
        });
        errorBox.hidden = items.length === 0;
      }

      function dropFromErrorList(id) {
        if (!errorBox || errorBox.hidden) return;
        var link = errorBox.querySelector('[data-target="' + id + '"]');
        if (link) link.closest('li').remove();
        if (!errorBox.querySelector('li')) errorBox.hidden = true;
      }

      if (errorBox) errorBox.addEventListener('click', function (e) {
        var link = e.target.closest('a[data-target]');
        if (!link) return;
        e.preventDefault(); e.stopPropagation();
        var target = document.getElementById(link.dataset.target);
        if (target) target.focus();
      });

      function checkConsent(box) {
        var row = box.closest('.bk-consent');
        var old = row.querySelector('.error-msg');
        if (old) old.remove();
        box.removeAttribute('aria-invalid'); box.removeAttribute('aria-describedby');
        if (box.checked) return true;
        box.setAttribute('aria-invalid', 'true');
        box.setAttribute('aria-describedby', box.id + '-err');
        var msg = document.createElement('span');
        msg.className = 'error-msg'; msg.id = box.id + '-err';
        msg.style.flexBasis = '100%';
        msg.innerHTML = FORM_ERR_ICON + (box.dataset.err || 'Bitte bestätige diesen Punkt');
        row.appendChild(msg);
        return false;
      }

      function checkField(input) {
        var field = input.closest('.field');
        clearError(field, input);
        if (input.closest('[hidden]')) return true;
        if (input.value.trim() !== '' && input.validity.valid) return true;
        setError(field, input, input.id + '-err', input.dataset.err || 'Bitte füll dieses Feld aus', true);
        return false;
      }

      /* Nach einem gescheiterten Submit wird jedes Feld beim Tippen erneut geprüft. Einen Fehler
         stehen zu lassen, obwohl er behoben ist, ist die häufigste Frustquelle in langen Formularen. */
      form.addEventListener('input', function (e) {
        if (!form.dataset.submitted) return;
        var el = e.target;
        if (el.hasAttribute('required') && el.closest('.field') && checkField(el)) dropFromErrorList(el.id);
      });
      form.addEventListener('change', function (e) {
        if (!form.dataset.submitted) return;
        var el = e.target;
        if (el.dataset.bk === 'consent-required' && checkConsent(el)) dropFromErrorList(el.id);
        else if (el.tagName === 'SELECT' && el.hasAttribute('required') && checkField(el)) dropFromErrorList(el.id);
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        form.dataset.submitted = '1';
        var problems = [];
        form.querySelectorAll('[required]').forEach(function (input) {
          if (input.closest('[hidden]') || !input.closest('.field')) return;
          if (!checkField(input)) problems.push({ id: input.id, text: input.dataset.err || 'Bitte füll dieses Feld aus' });
        });
        form.querySelectorAll('[data-bk="consent-required"]').forEach(function (box) {
          if (!checkConsent(box)) problems.push({ id: box.id, text: box.dataset.err || 'Bitte bestätige diesen Punkt' });
        });
        renderErrorList(problems);
        if (problems.length) {
          if (errorBox) errorBox.focus();
          else document.getElementById(problems[0].id).focus();
          return;
        }
        form.hidden = true;
        if (success) { success.hidden = false; success.focus(); }
      });

      toggleBlock(firmaBlock, kundentyp() === 'firma');
      toggleBlock(rechnungBlock, rechnungToggle ? rechnungToggle.checked : false);
      renderPersons(Math.max(1, parseInt(anzahl && anzahl.value, 10) || 1));
    }

    document.querySelectorAll('form[data-booking]').forEach(setupBookingForm);
  })();

  /* ── Bestätigungsdialog: Referenzverhalten für .dialog ──
     Ein Auslöser mit data-dialog-open="<id>" öffnet das <dialog class="dialog"> per showModal().
     Fokus-Falle, Escape und die inerte Seite kommen vom Browser, den Anfangsfokus setzt das
     autofocus-Attribut am sicheren Button. Ergänzt wird, was der Browser nicht übernimmt:
     - Hintergrund-Klick schließt, aber nur, wenn pointerdown UND click auf dem <dialog> selbst
       landen. Sonst schlösse eine Textauswahl, die außerhalb des Dialogs endet.
     - Buttons mit data-dialog-result schließen mit diesem Ergebnis.
     - Der Fokus kehrt ausdrücklich zum Auslöser zurück, statt sich auf den Browser zu verlassen.
     Ergebnis: returnValue "confirm" = bestätigt, alles andere (Abbrechen, Escape, Hintergrund) =
     abgebrochen. Dasselbe Verhalten setzt CdsConfirmDialog in der Angular-Lib um. */
  (function() {
    document.querySelectorAll('[data-dialog-open]').forEach(function(trigger) {
      var dialog = document.getElementById(trigger.getAttribute('data-dialog-open'));
      if (!dialog || typeof dialog.showModal !== 'function') return;
      var output = document.getElementById(trigger.getAttribute('data-dialog-output'));
      var downOnBackdrop = false;

      trigger.addEventListener('click', function() {
        dialog.returnValue = '';
        dialog.showModal();
      });
      dialog.addEventListener('pointerdown', function(e) { downOnBackdrop = e.target === dialog; });
      dialog.addEventListener('click', function(e) {
        var btn = e.target.closest('[data-dialog-result]');
        if (btn) dialog.close(btn.getAttribute('data-dialog-result'));
        else if (e.target === dialog && downOnBackdrop) dialog.close('cancel');
        downOnBackdrop = false;
      });
      dialog.addEventListener('close', function() {
        if (trigger.isConnected) trigger.focus();
        if (output) output.textContent = dialog.returnValue === 'confirm' ? 'Ergebnis: bestätigt' : 'Ergebnis: abgebrochen';
      });
    });
  })();

})();
