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
  window.addEventListener('scroll', function() {
    backBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  /* In-Page-Topnav-Links, Logo, Submenu-Items und klickbare Karten wechseln ebenfalls die Tabs */
  document.querySelectorAll('.ep-page .ep-nav-btn[data-ep], .ep-page .ep-nav-sub-btn[data-ep], .ep-page .ep-logo[data-ep], .ep-page .ep-card-link[data-ep]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      activateExamplePage(link.dataset.ep);
      var sec = document.getElementById('sec-examples');
      if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ── Bild-Slider (Carousel) ── */
  document.querySelectorAll('.img-slider').forEach(function(slider) {
    var track   = slider.querySelector('.img-slider-track');
    var slides  = Array.from(slider.querySelectorAll('.img-slide'));
    var dots    = Array.from(slider.querySelectorAll('.img-dot'));
    var total   = slides.length;
    var current = 0;

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
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
