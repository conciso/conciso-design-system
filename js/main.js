/* ── Vibe Design System — Main Script ── */
(function() {
  document.querySelectorAll('.nav-item[data-section]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.ds-section').forEach(function(s) { s.classList.remove('visible'); });
      document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
      var sec = document.getElementById('sec-' + btn.dataset.section);
      if (sec) sec.classList.add('visible');
      btn.classList.add('active');
    });
  });

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

  document.querySelectorAll('.chip').forEach(function(chip) {
    chip.addEventListener('click', function() {
      chip.classList.toggle('sel');
    });
  });

  document.getElementById('skip-btn').addEventListener('click', function() {
    document.getElementById('main-content').focus();
  });

  document.querySelectorAll('.ep-tab[data-ep]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.ep-tab').forEach(function(t) { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      document.querySelectorAll('.ep-page').forEach(function(p) { p.classList.remove('visible'); });
      btn.classList.add('active');
      btn.setAttribute('aria-selected','true');
      var page = document.getElementById('ep-' + btn.dataset.ep);
      if (page) page.classList.add('visible');
    });
  });
})();
