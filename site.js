(function(){
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  document.addEventListener('visibilitychange', function(){ root.classList.toggle('tab-hidden', document.hidden); });

  /* ── the sky: three star planes behind the rain ─────────────
     Position is randomised first (BrutaliststyleContext V7: rain has no
     pitch, and neither do stars). Each plane has its own size, colour mix
     and scroll speed, so depth reads the way it does in the cosmic style. */
  var sky = document.getElementById('sky');
  var TINTS = ['#ffffff','#fff4e0','#dfe8ff','#ffd9b8','#ecd9ff','#cfe0ff'];
  var PLANES = [
    { n: 150, min: .6, max: 1.3, alpha: [.35,.75], depth: -0.03 },
    { n: 70,  min: 1.1, max: 2.0, alpha: [.55,.95], depth: -0.07 },
    { n: 16,  min: 2.2, max: 3.2, alpha: [.7,1],    depth: -0.13, glow: true }
  ];
  if (sky) {
    PLANES.forEach(function (p) {
      var el = document.createElement('div');
      el.className = 'splane';
      el.setAttribute('data-depth', p.depth);
      for (var i = 0; i < p.n; i++) {
        var s = document.createElement('i');
        var size = p.min + Math.random() * (p.max - p.min);
        var tint = TINTS[Math.floor(Math.random() * TINTS.length)];
        s.className = 'star';
        s.style.left = (Math.random() * 100).toFixed(2) + '%';
        s.style.top = (Math.random() * 100).toFixed(2) + '%';
        s.style.width = s.style.height = size.toFixed(2) + 'px';
        s.style.background = tint;
        s.style.opacity = (p.alpha[0] + Math.random() * (p.alpha[1] - p.alpha[0])).toFixed(2);
        if (p.glow) s.style.boxShadow = '0 0 ' + (size * 3).toFixed(1) + 'px ' + tint;
        if (!reduce && Math.random() < 0.35) {
          s.style.animation = 'twinkle ' + (2.5 + Math.random() * 4).toFixed(2) + 's ease-in-out ' + (-Math.random() * 6).toFixed(2) + 's infinite';
        }
        el.appendChild(s);
      }
      sky.appendChild(el);
    });
  }

  /* ── the rain (brutalist v1 mechanics) ──────────────────── */
  var host = document.getElementById('matrix');
  if (host) {
    var frag = document.createDocumentFragment();
    var planes = [-0.02, -0.055, -0.10].map(function (d) {
      var el = document.createElement('div'); el.className = 'mlayer'; el.setAttribute('data-depth', d); frag.appendChild(el); return el;
    });
    var x = Math.random() * 3, guard = 0;
    while (x < 100 && guard++ < 60) {
      var col = document.createElement('div');
      col.className = 'mcol';
      var depth = Math.random();
      var rows = 70 + Math.floor(Math.random() * 40);
      for (var r = 0; r < rows; r++) {
        var g = document.createElement('i');
        var t = Math.random();
        g.className = t > 0.93 ? 'b3' : t > 0.66 ? 'b2' : t > 0.30 ? 'b1' : 'b0';
        g.textContent = Math.random() < 0.5 ? '0' : '1';
        col.appendChild(g);
      }
      col.style.left = x.toFixed(2) + '%';
      col.style.fontSize = (10 + depth * 8).toFixed(1) + 'px';
      col.style.opacity = (0.34 + depth * 0.66).toFixed(2);
      if (reduce) { col.style.animation = 'none'; col.style.transform = 'translate3d(0,' + (Math.random() * 60).toFixed(1) + 'vh,0)'; }
      else { col.style.animationDuration = (27 - depth * 18).toFixed(2) + 's'; col.style.animationDelay = (-Math.random() * 26).toFixed(2) + 's'; }
      planes[depth < 0.34 ? 0 : depth < 0.67 ? 1 : 2].appendChild(col);
      x += 1.4 + Math.random() * 7.6;
    }
    host.appendChild(frag);
  }

  /* ── depth planes + current section in the bar ─────────── */
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-depth]'));
  var navs = Array.prototype.slice.call(document.querySelectorAll('.sysline a'));
  var screens = Array.prototype.slice.call(document.querySelectorAll('.screen'));
  var GROUP = { top:'top', run:'run', software:'software', soon:'soon', hardware:'hardware', robots:'hardware', embedded:'hardware', contact:'contact' };
  var ticking = false;
  function frame() {
    var y = window.scrollY, h = window.innerHeight, k = Math.min(1, window.innerWidth / 1440);
    if (!reduce) {
      for (var i = 0; i < layers.length; i++) {
        var l = layers[i], d = parseFloat(l.getAttribute('data-depth'));
        if (l.getAttribute('data-anchor') === 'self') {
          var rc = l.getBoundingClientRect();
          l.style.translate = '0 ' + Math.round(-(rc.top + rc.height / 2 - h / 2) * d * k) + 'px';
        } else {
          l.style.translate = '0 ' + (y * d * k).toFixed(1) + 'px';
        }
      }
    }
    var cur = 'top', best = Infinity;
    for (var s = 0; s < screens.length; s++) {
      var r2 = screens[s].getBoundingClientRect();
      // a screen taller than the window owns the centre line while it spans it
      var dist = (r2.top <= h / 2 && r2.bottom >= h / 2) ? -1 : Math.abs(r2.top + r2.height / 2 - h / 2);
      if (dist < best) { best = dist; cur = screens[s].id; }
    }
    var group = GROUP[cur] || 'top';
    navs.forEach(function (n) {
      if (n.getAttribute('href') === '#' + group) n.setAttribute('aria-current', 'true'); else n.removeAttribute('aria-current');
    });
    ticking = false;
  }
  function kick() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', kick, { passive: true });
  window.addEventListener('resize', kick);
  frame();   // browsers restore scroll on reload; sync once at load

  /* ── the app viewer ─────────────────────────────────────────
     Each app is a real, separate site in apps/. It opens in a full-screen
     frame with its own address in the bar and its own history entry, so the
     browser's Back button closes it. The frame is emptied on close so a
     WebGL map is not left running behind the page. */
  var APPS = {
    surge:      { name: 'surge',      src: 'apps/surge/index.html',           addr: 'apps/surge/' },
    starfinder: { name: 'starfinder', src: 'apps/starfinder/StarFinder.html', addr: 'apps/starfinder/' },
    // iris: the simulated Iris demo is kept in apps/iris-demo/ but no longer linked.
    couchlight: { name: 'couchlight (demo)', src: 'apps/couchlight/index.html', addr: 'apps/couchlight/' }
  };
  var viewer = document.getElementById('viewer');
  var vframe = document.getElementById('vframe');
  var vname = document.getElementById('vname');
  var vaddr = document.getElementById('vaddr');
  var vnew = document.getElementById('vnew');
  var vload = document.getElementById('vload');
  var lastFocus = null, pushed = false;

  function openApp(key, fromHash) {
    var a = APPS[key]; if (!a) return;
    lastFocus = document.activeElement;
    vname.textContent = a.name;
    vaddr.textContent = ' ' + a.addr;
    vnew.href = a.src;
    vload.hidden = false;
    vframe.onload = function () { vload.hidden = true; };
    vframe.src = a.src;
    viewer.hidden = false;
    document.body.classList.add('viewing');
    if (!fromHash && location.hash !== '#/app/' + key) { history.pushState({ app: key }, '', '#/app/' + key); pushed = true; }
    document.getElementById('vback').focus();
  }
  function closeApp(fromHash) {
    if (viewer.hidden) return;
    viewer.hidden = true;
    vframe.src = 'about:blank';
    document.body.classList.remove('viewing');
    if (!fromHash && /^#\/app\//.test(location.hash)) {
      // arrived straight on an app link: there is no page behind it to go back to
      if (pushed) history.back(); else history.replaceState(null, '', location.pathname + location.search);
    }
    pushed = false;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function route() {
    var m = /^#\/app\/([a-z]+)$/.exec(location.hash);
    if (m && APPS[m[1]]) openApp(m[1], true); else closeApp(true);
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-open]'), function (b) {
    b.addEventListener('click', function () { openApp(b.getAttribute('data-open')); });
  });
  document.getElementById('vback').addEventListener('click', function () { closeApp(); });
  window.addEventListener('popstate', route);
  window.addEventListener('hashchange', route);
  route();

  /* ── lightbox for every image plate ────────────────────── */
  var lb = document.getElementById('lightbox'), lbimg = document.getElementById('lbimg'), lbcap = document.getElementById('lbcap');
  var lbFrom = null;
  function openLb(btn) {
    lbFrom = btn;
    lbimg.src = btn.getAttribute('data-full');
    var img = btn.querySelector('img');
    lbimg.alt = img ? img.alt : '';
    lbcap.innerHTML = btn.getAttribute('data-cap') || '';
    lb.hidden = false;
    document.getElementById('lbclose').focus();
  }
  function closeLb() { if (lb.hidden) return; lb.hidden = true; lbimg.src = ''; if (lbFrom) lbFrom.focus(); }
  Array.prototype.forEach.call(document.querySelectorAll('.plate button.img[data-full]'), function (b) {
    b.addEventListener('click', function () { openLb(b); });
  });
  document.getElementById('lbclose').addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!lb.hidden) closeLb(); else if (!viewer.hidden) closeApp();
  });

  /* ── the shell ─────────────────────────────────────────── */
  var log = document.getElementById('log'), form = document.getElementById('shf'), input = document.getElementById('cmd'), box = document.getElementById('sh');
  if (!log || !form || !input) return;
  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  var MAN = {
    exoskeleton: 'four lower-limb iterations: linear actuator, cable-driven, wearable brace, strings-driven. scroll to 04.',
    surge: 'coastal flood exposure, honest about its instruments. try: open surge',
    starfinder: 'parks, light pollution, cell coverage. try: open starfinder',
    iris: 'phone-to-PC camera streaming over WebRTC. in development.',
    couchlight: 'every streaming app on one grid, driven by a controller from the couch. 0.9 beta. try: open couchlight',
    sage: 'persistent memory and identity infrastructure for AI agents. coming soon.',
    steamstreamer: 'every streaming app on one controller-friendly dashboard. released.',
    anyfactory: 'a 3D-printing OS with automated part ejection. open source.'
  };
  var LS = {
    '': 'apps/  hardware/  skills/  contact',
    apps: 'surge  starfinder  couchlight',
    hardware: 'exoskeletons/  robotics/  embedded/',
    skills: 'mechanical-design/  actuation-systems/  prototyping/  software-and-ai/  embedded-and-firmware/'
  };
  var hist = [], hi = 0, lines = 0;
  function print(html, cls) {
    var span = document.createElement('span'); if (cls) span.className = cls;
    span.innerHTML = html + '\n'; log.appendChild(span);
    if (++lines > 120) log.removeChild(log.firstChild);
    log.scrollTop = log.scrollHeight;
  }
  function run(raw) {
    var line = raw.trim(); if (!line) return;
    print('<span class="g">rose@workshop</span>:<span style="color:var(--cyan)">~</span>$ ' + esc(line), 'u');
    var parts = line.split(/\s+/), c = parts[0].toLowerCase(), a = parts.slice(1).join(' ').toLowerCase().replace(/\/$/, '');
    switch (c) {
      case 'help': print('help  ls [dir]  man &lt;thing&gt;  open &lt;app&gt;  contact  whoami  date  clear'); break;
      case 'ls': print(LS[a] !== undefined ? LS[a] : 'ls: ' + esc(a) + ': no such directory', LS[a] !== undefined ? '' : 'e'); break;
      case 'man':
        if (MAN[a]) print('<span class="p">' + esc(a) + '</span> &mdash; ' + esc(MAN[a]));
        else print(a ? 'no manual entry for ' + esc(a) + '. try: ls apps' : 'what manual page do you want?', 'e');
        break;
      case 'open': case 'run':
        if (APPS[a]) { print('starting ' + esc(a) + '&hellip;', 'g'); openApp(a); }
        else print('usage: open surge | starfinder | couchlight', 'e');
        break;
      case 'contact': print('rosedavison47@gmail.com &middot; github.com/rose-bot47 &middot; linkedin.com/in/rose-davison'); break;
      case 'whoami': print('a visitor. welcome to the workshop.'); break;
      case 'date': print(esc(new Date().toString())); break;
      case 'sudo': print('no root here. try: contact', 'e'); break;
      case 'clear': log.innerHTML = ''; lines = 0; break;
      default: print(esc(c) + ': command not found. type help.', 'e');
    }
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault(); var v = input.value; input.value = '';
    if (v.trim()) { hist.push(v); hi = hist.length; } run(v);
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') { if (hi > 0) { hi--; input.value = hist[hi] || ''; } e.preventDefault(); }
    else if (e.key === 'ArrowDown') { if (hi < hist.length) { hi++; input.value = hist[hi] || ''; } e.preventDefault(); }
  });
  box.addEventListener('click', function (e) { if (e.target !== input) input.focus(); });
})();
