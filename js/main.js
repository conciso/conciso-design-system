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

  /* ── Beispielseiten: Tab-Wechsel ── */
  function activateExamplePage(epKey) {
    document.querySelectorAll('.ep-tab').forEach(function(t) { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
    document.querySelectorAll('.ep-page').forEach(function(p) { p.classList.remove('visible'); });
    var tab = document.querySelector('.ep-tab[data-ep="' + epKey + '"]');
    var page = document.getElementById('ep-' + epKey);
    if (tab) { tab.classList.add('active'); tab.setAttribute('aria-selected','true'); }
    if (page) page.classList.add('visible');
  }
  document.querySelectorAll('.ep-tab[data-ep]').forEach(function(btn) {
    btn.addEventListener('click', function() { activateExamplePage(btn.dataset.ep); });
  });
  /* In-Page-Links mit data-ep (Topnav, Logo, Submenus, klickbare Karten, Breadcrumbs, Article-Cards) wechseln den Tab */
  document.querySelectorAll('.ep-page a[data-ep]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      activateExamplePage(link.dataset.ep);
      var sec = document.getElementById('sec-examples');
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Wissens-Übersicht: Filter-Chips + Suche (Phase 1: client-side, Title+Lead+Pill) ── */
  (function() {
    var page = document.getElementById('ep-wb-uebersicht');
    if (!page) return;
    var chips = page.querySelectorAll('.chip[data-filter]');
    var searchInput = page.querySelector('#wb-search-input');
    var featuredSection = page.querySelector('#wb-featured-section');
    var featuredCards = page.querySelectorAll('#wb-featured-section .card[data-area]');
    var gridCards = page.querySelectorAll('.layout-grid > .card[data-area]');
    var resultCount = page.querySelector('.wb-result-count');
    var emptyState = page.querySelector('.wb-empty-state');
    var emptyDetail = page.querySelector('.wb-empty-state-detail');
    var loadMore = page.querySelector('.wb-load-more');
    var resetBtn = page.querySelector('.wb-reset-search');

    var state = { filter: 'all', query: '' };
    var debounceTimer = null;

    function cardSearchHaystack(card) {
      // Liest Title + Lead + Pill aus der Card (für Grid- und Featured-Cards)
      var title = (card.querySelector('.card-title, h2') || {}).textContent || '';
      var lead = (card.querySelector('.card-text, p') || {}).textContent || '';
      var pill = (card.querySelector('.pill') || {}).textContent || '';
      return (title + ' ' + lead + ' ' + pill).toLowerCase();
    }
    function matchesQuery(card, q) {
      if (!q) return true;
      return cardSearchHaystack(card).indexOf(q.toLowerCase()) !== -1;
    }

    function applyFilters() {
      var q = state.query.trim();
      var f = state.filter;
      var hasQuery = q.length > 0;
      var visibleGridCount = 0;

      // Featured-Section: bei aktiver Suche komplett ausblenden, sonst Filter-aware
      if (hasQuery) {
        if (featuredSection) featuredSection.classList.add('is-hidden');
      } else {
        if (featuredSection) featuredSection.classList.remove('is-hidden');
        var featuredTarget = (f === 'all') ? 'ki' : f;
        featuredCards.forEach(function(card) {
          card.classList.toggle('is-hidden', card.dataset.area !== featuredTarget);
        });
      }

      // Grid: AND-Logik aus Filter + Suche
      gridCards.forEach(function(card) {
        var areaMatch = (f === 'all') || (card.dataset.area === f);
        var searchMatch = matchesQuery(card, q);
        var show = areaMatch && searchMatch;
        card.classList.toggle('is-hidden', !show);
        if (show) visibleGridCount++;
      });

      // Empty State und Load-More
      var isEmpty = visibleGridCount === 0;
      if (emptyState) emptyState.classList.toggle('is-hidden', !isEmpty);
      if (loadMore) loadMore.classList.toggle('is-hidden', isEmpty || hasQuery);

      // Empty-State-Detail-Text
      if (isEmpty && emptyDetail) {
        if (hasQuery && f !== 'all') {
          emptyDetail.textContent = 'Für „' + q + '" im Bereich ' + chipLabel(f) + ' gibt es aktuell keine Beiträge.';
        } else if (hasQuery) {
          emptyDetail.textContent = 'Für „' + q + '" gibt es aktuell keine Beiträge.';
        } else if (f !== 'all') {
          emptyDetail.textContent = 'Im Bereich ' + chipLabel(f) + ' sind aktuell keine Beiträge hinterlegt.';
        } else {
          emptyDetail.textContent = '';
        }
      }

      // Live-Count: nur während aktiver Suche
      if (resultCount) {
        if (hasQuery) {
          resultCount.textContent = visibleGridCount + ' ' + (visibleGridCount === 1 ? 'Treffer' : 'Treffer') + ' für „' + q + '"';
        } else {
          resultCount.textContent = '';
        }
      }
    }

    function chipLabel(f) {
      var labels = { ki: 'Angewandte KI', es: 'Effektive Software', wo: 'Wirksame Organisationen' };
      return labels[f] || '';
    }

    // Filter-Chip-Klicks
    chips.forEach(function(chip) {
      chip.addEventListener('click', function() {
        state.filter = chip.dataset.filter;
        chips.forEach(function(c) {
          c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
        });
        applyFilters();
      });
    });

    // Such-Input mit Debounce (300 ms)
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(function() {
          state.query = searchInput.value;
          applyFilters();
        }, 300);
      });
      // Escape leert die Suche, Fokus bleibt
      searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchInput.value) {
          searchInput.value = '';
          state.query = '';
          applyFilters();
          e.preventDefault();
        }
      });
    }

    // Global „/"-Shortcut fokussiert die Suche, wenn die Wissens-Übersicht aktiv ist
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

    // Reset-Button im Empty State
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

    // Init: setze initial-State
    applyFilters();
  })();

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

})();
