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
    document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
    var sec = document.getElementById('sec-' + section);
    var btn = document.querySelector('.nav-item[data-section="' + section + '"]');
    if (sec) sec.classList.add('visible');
    if (btn) btn.classList.add('active');
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

  /* ── Sub-nav anchor clicks: smooth scroll ── */
  document.querySelectorAll('.nav-sub-item').forEach(function(link) {
    link.addEventListener('click', function(e) {
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
      if (epKey) activateExamplePage(epKey);
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

  /* ── Theme switcher ── */
  document.querySelectorAll('.tbtn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var t = btn.id.replace('tb-', '');
      document.documentElement.removeAttribute('data-theme');
      if (t !== 'light') document.documentElement.setAttribute('data-theme', t);
      document.querySelectorAll('.tbtn').forEach(function(b) { b.classList.remove('active'); b.setAttribute('aria-pressed','false'); });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed','true');
    });
  });

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
  function activateExamplePage(epKey) {
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
  /* In-Page-Links mit data-ep (Topnav, Logo, Submenus, klickbare Karten, Breadcrumbs, Article-Cards) wechseln den Tab */
  document.querySelectorAll('.ep-page a[data-ep]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      activateExamplePage(link.dataset.ep);
    });
  });

  /* In-Page-Anker innerhalb derselben ep-page (z. B. „Platz sichern" → #ev-anmeldung):
     Browser-Default ist Hard-Jump und bricht den „Ruhig"-Markenwert. Hier sanftes Scrollen,
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

  /* ── Listing-Pages (Wissen-Übersicht, Veranstaltungen-Übersicht): Filter-Chips + Suche ──
     Client-side Suche über Title + Lead + Pill, AND-Logik mit Bereichs-Filter.
     Featured-Section ist filter-aware (eine Variante pro Bereich) und wird bei Suche ausgeblendet. */
  function setupListPage(opts) {
    var page = document.getElementById(opts.pageId);
    if (!page) return;
    var prefix = opts.prefix;
    var defaultFeaturedArea = opts.defaultFeaturedArea || 'ki';
    var noun = opts.noun;
    var nounPluralDat = opts.nounPluralDat; // für „keine X hinterlegt"

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
          emptyDetail.textContent = 'Für „' + q + '" im Bereich ' + chipLabel(f) + ' gibt es aktuell keine ' + nounPluralDat + '.';
        } else if (hasQuery) {
          emptyDetail.textContent = 'Für „' + q + '" gibt es aktuell keine ' + nounPluralDat + '.';
        } else if (f !== 'all') {
          emptyDetail.textContent = 'Im Bereich ' + chipLabel(f) + ' sind aktuell keine ' + nounPluralDat + ' hinterlegt.';
        } else {
          emptyDetail.textContent = '';
        }
      }

      if (resultCount) {
        if (hasQuery) {
          resultCount.textContent = visibleGridCount + ' Treffer für „' + q + '"';
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

    // Global „/"-Shortcut fokussiert die Suche, wenn diese Listing-Page aktiv ist
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
          img.src = 'images/' + member.photo;
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

})();
