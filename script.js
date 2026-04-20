/* ============================================================
   DaanveerXSni Sanatani Coders — script.js
   Community : DaanveerXSni_Sanatani_Coders
   Tagline   : बलिदानं परं धर्मः। धर्म एव कर्म भवति।
   ============================================================ */

/* ══════════════════════════════════════════════
   WELCOME LOADER
══════════════════════════════════════════════ */
(function initLoader() {
  const loader = document.getElementById('welcome-loader');
  if (!loader) return;

  // ── Loader canvas particles ──────────────────
  const wlCanvas = document.getElementById('wl-canvas');
  const wlCtx    = wlCanvas.getContext('2d');
  let wlW, wlH, wlParticles = [], wlRAF;

  function resizeWL() {
    wlW = wlCanvas.width  = window.innerWidth;
    wlH = wlCanvas.height = window.innerHeight;
  }
  resizeWL();
  window.addEventListener('resize', resizeWL);

  class WLParticle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x  = Math.random() * (wlW || 800);
      this.y  = init ? Math.random() * (wlH || 600) : (wlH || 600) + 10;
      this.r  = Math.random() * 2 + .5;
      this.vx = (Math.random() - .5) * .3;
      this.vy = -(Math.random() * .6 + .2);
      this.a  = Math.random() * .55 + .1;
      this.c  = Math.random() > .55 ? '#f0c040' : Math.random() > .5 ? '#26c6da' : '#7986cb';
      this.tw = Math.random() * .025 + .006;
      this.to = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.y < -10 || this.x < -10 || this.x > wlW + 10) this.reset(false);
    }
    draw() {
      const o = this.a * (.5 + .5 * Math.sin(Date.now() * this.tw + this.to));
      wlCtx.save();
      wlCtx.globalAlpha = o;
      wlCtx.fillStyle   = this.c;
      wlCtx.beginPath();
      wlCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      wlCtx.fill();
      wlCtx.restore();
    }
  }

  for (let i = 0; i < 60; i++) wlParticles.push(new WLParticle());

  function animWL() {
    wlCtx.clearRect(0, 0, wlW, wlH);
    wlParticles.forEach(p => { p.update(); p.draw(); });
    wlRAF = requestAnimationFrame(animWL);
  }
  animWL();

  // ── Animate each character of the name ───────
  const nameStr   = 'DaanveerXSni';
  const goldChars = new Set([8]); // 'X' is index 8
  const nameWrap  = document.querySelector('.wl-name');
  if (nameWrap) {
    nameWrap.innerHTML = '';
    [...nameStr].forEach((ch, i) => {
      const span = document.createElement('span');
      span.className   = 'wl-char ' + (goldChars.has(i) ? 'gold' : 'white');
      span.textContent = ch;
      span.style.fontSize      = '52px';
      span.style.animationDelay = (.75 + i * .06) + 's';
      nameWrap.appendChild(span);
    });
  }

  // ── Dismiss loader after load animation ──────
  const DISMISS_AFTER = 4200; // ms
  setTimeout(() => {
    loader.classList.add('wl-out');
    setTimeout(() => {
      loader.style.display = 'none';
      cancelAnimationFrame(wlRAF);
    }, 950);
  }, DISMISS_AFTER);
})();


/* ══════════════════════════════════════════════
   PARTICLE CANVAS (background)
══════════════════════════════════════════════ */
const canvas = document.getElementById('particle-canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.r  = Math.random() * 2.5 + .5;
    this.vx = (Math.random() - .5) * .4;
    this.vy = (Math.random() - .5) * .4;
    this.a  = Math.random() * .5 + .1;
    this.c  = Math.random() > .6 ? '#f0c040' : Math.random() > .5 ? '#00bcd4' : '#5c6bc0';
    this.tw = Math.random() * .02 + .005;
    this.to = Math.random() * Math.PI * 2;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    const o = this.a * (.5 + .5 * Math.sin(Date.now() * this.tw + this.to));
    ctx.save();
    ctx.globalAlpha = o;
    ctx.fillStyle   = this.c;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animParticles);
}
animParticles();


/* ══════════════════════════════════════════════
   CUSTOM CURSOR + SPARK TRAIL
══════════════════════════════════════════════ */
const cur  = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0, sparkTimer = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
  sparkTimer++;
  if (sparkTimer % 4 === 0) {
    const s   = document.createElement('div');
    const ang = Math.random() * Math.PI * 2;
    const d   = Math.random() * 30 + 10;
    s.className  = 'cursor-spark';
    s.style.cssText = `left:${mx}px;top:${my}px;width:${Math.random()*6+3}px;height:${Math.random()*6+3}px;background:${Math.random()>.5?'var(--gold)':'var(--teal)'};--tx:${Math.cos(ang)*d}px;--ty:${Math.sin(ang)*d}px`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
});

(function animRing() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a,button,.sec-card,.founder-card,.founder-full-card,.founder-compact-card,.dom-card,.con-card,.stat-box,.jrc,.val-card,.info-card,.ach-box,.domain-about-card,.ca-card').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width = '54px'; ring.style.height = '54px'; ring.style.borderColor = 'var(--gold)'; cur.style.width = '14px'; cur.style.height = '14px'; });
  el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.borderColor = 'var(--gold)'; cur.style.width = '10px'; cur.style.height = '10px'; });
});


/* ══════════════════════════════════════════════
   RIPPLE ON BUTTONS
══════════════════════════════════════════════ */
function addRipple(scope) {
  (scope || document).querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const r    = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      r.className = 'ripple-effect';
      r.style.left = (e.clientX - rect.left) + 'px';
      r.style.top  = (e.clientY - rect.top)  + 'px';
      btn.appendChild(r);
      setTimeout(() => r.remove(), 700);
    });
  });
}
addRipple();


/* ══════════════════════════════════════════════
   SPARKLE BURST ON CTA
══════════════════════════════════════════════ */
document.querySelectorAll('.sparkle-btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const cols = ['#c9a84c','#e8c96a','#0d7377','#14a085','#c0392b','#f5e4a8'];
    for (let i = 0; i < 16; i++) {
      const s   = document.createElement('div');
      const ang = (i / 16) * Math.PI * 2 + Math.random() * .5;
      const d   = Math.random() * 100 + 50;
      s.className = 'sparkle-particle';
      s.style.cssText = `left:${e.clientX}px;top:${e.clientY}px;width:${Math.random()*8+4}px;height:${Math.random()*8+4}px;background:${cols[Math.floor(Math.random()*cols.length)]};--tx:${Math.cos(ang)*d}px;--ty:${Math.sin(ang)*d}px;animation-duration:${.6+Math.random()*.4}s`;
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1100);
    }
  });
});


/* ══════════════════════════════════════════════
   3-D TILT ON CARDS
══════════════════════════════════════════════ */
function addTilt(selector, scope) {
  (scope || document).querySelectorAll(selector).forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x  = e.clientX - rect.left;
      const y  = e.clientY - rect.top;
      const cx = rect.width / 2, cy = rect.height / 2;
      const rx2 = (y - cy) / cy * -8;
      const ry2 = (x - cx) / cx * 8;
      card.style.transform = `perspective(600px) rotateX(${rx2}deg) rotateY(${ry2}deg) translateY(-6px) scale(1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}
addTilt('.info-card');
addTilt('.stat-box');
addTilt('.dom-card');
addTilt('.sec-card');
addTilt('.founder-card');
addTilt('.founder-compact-card');
addTilt('.domain-about-card');


/* ══════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════ */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('revealed'); revObs.unobserve(e.target); }
  });
}, { threshold: .08 });

function initReveal(scope) {
  (scope || document).querySelectorAll('.pg.active .reveal,.pg.active .reveal-left,.pg.active .reveal-right,.pg.active .reveal-scale').forEach(el => revObs.observe(el));
}
initReveal();

const visObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('vis-v'); e.target.classList.remove('vis-h'); visObs.unobserve(e.target); }
  });
}, { threshold: .1 });
document.querySelectorAll('.vis-h').forEach(el => visObs.observe(el));


/* ══════════════════════════════════════════════
   TIMELINE ANIMATION
══════════════════════════════════════════════ */
function animTl() {
  ['ti1','ti2','ti3','ti4'].forEach((id, i) => {
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) { el.classList.add('vis-v'); el.classList.remove('vis-h'); }
    }, i * 200);
  });
}


/* ══════════════════════════════════════════════
   MAGNETIC JOIN BUTTONS
══════════════════════════════════════════════ */
function initMagnetic(scope) {
  (scope || document).querySelectorAll('.join-btns .btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width  / 2;
      const y = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translateX(${x*.15}px) translateY(${y*.15}px) scale(1.03)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}
initMagnetic();


/* ══════════════════════════════════════════════
   NAV + FOOTER INJECTOR (sub-pages)
══════════════════════════════════════════════ */
function makeNav(active) {
  return `<nav class="nav">
    <span class="nav-brand" onclick="nav('home')">
      <svg class="nav-logo-icon" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#f0c040" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.8"/>
        <circle cx="20" cy="20" r="12" fill="none" stroke="#5c6bc0" stroke-width="1" opacity="0.5"/>
        <text x="20" y="25" text-anchor="middle" font-family="serif" font-size="14" font-weight="700" fill="#f0c040">D&#xD7;</text>
      </svg>
      Daanveer<span class="x-mark">X</span>Sni <span class="nav-sanatani">Sanatani Coders</span>
    </span>
    <ul class="nav-links">
      <li><a onclick="nav('about')"   class="${active==='about'?'active-link':''}">About</a></li>
      <li><a onclick="nav('founders')" class="${active==='founders'?'active-link':''}">Founders</a></li>
      <li><a onclick="nav('domains')" class="${active==='domains'?'active-link':''}">Domains</a></li>
      <li><a onclick="nav('journey')" class="${active==='journey'?'active-link':''}">Journey</a></li>
      <li><a onclick="nav('connect')" class="${active==='connect'?'active-link':''}">Connect</a></li>
    </ul>
    <button class="nav-back" onclick="nav('home')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>Home
    </button>
  </nav>`;
}

function makeFooter() {
  return `<footer class="foot">
    <span class="foot-brand">Daanveer<span>X</span>Sni Sanatani Coders</span>
    <span class="foot-copy">
      Founded by Praveen Rathod &amp; Snigdha Upadhyay
      <span class="foot-tagline">बलिदानं परं धर्मः। &nbsp; धर्म एव कर्म भवति।</span>
    </span>
    <div class="foot-social">
      <a class="fsoc" href="https://www.instagram.com/daanveerxsni_sanatani_coders?igsh=MWZlY3BvMnByNGxoNg==" target="_blank"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/></svg></a>
      <a class="fsoc" href="https://chat.whatsapp.com/CHXaIUi51GrLI4ytV8Vptc" target="_blank"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>
      <a class="fsoc" href="https://t.me/+FL8KI9sOIQw2MTZl" target="_blank"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.5l-2.95-.924c-.64-.203-.658-.64.136-.954l11.57-4.46c.535-.194 1.002.13.968.059z"/></svg></a>
      <a class="fsoc" href="mailto:suryaputrakarn24680@gmail.com"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg></a>
    </div>
  </footer>`;
}

['about','founders','domains','journey','connect'].forEach(p => {
  const navEl  = document.getElementById('nav-'  + p);
  const footEl = document.getElementById('foot-' + p);
  if (navEl)  navEl.innerHTML  = makeNav(p);
  if (footEl) footEl.innerHTML = makeFooter();
  if (navEl) {
    addRipple(navEl);
    initMagnetic(navEl);
  }
});


/* ══════════════════════════════════════════════
   PAGE NAVIGATION
══════════════════════════════════════════════ */
function nav(page) {
  const wipe = document.getElementById('page-wipe');
  wipe.style.transition    = 'transform .3s cubic-bezier(.77,0,.18,1)';
  wipe.style.transformOrigin = 'left';
  wipe.style.transform     = 'scaleX(1)';

  setTimeout(() => {
    document.querySelectorAll('.pg').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('pg-' + page);
    if (target) { target.classList.add('active'); window.scrollTo({ top: 0, behavior: 'instant' }); }

    wipe.style.transition      = 'transform .4s cubic-bezier(.77,0,.18,1)';
    wipe.style.transformOrigin = 'right';
    wipe.style.transform       = 'scaleX(0)';

    setTimeout(() => {
      if (target) {
        target.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(el => revObs.observe(el));
        target.querySelectorAll('.vis-h').forEach(el => visObs.observe(el));
        addTilt('.dom-card', target);
        addTilt('.founder-full-card', target);
        addTilt('.founder-compact-card', target);
        addTilt('.domain-about-card', target);
        initMagnetic(target);
      }
      if (page === 'about')   { setTimeout(() => { countUp('a1', 4, 900); countUp('a2', 2, 900); }, 400); }
      if (page === 'journey') { setTimeout(() => animTl(), 400); }
    }, 100);
  }, 320);
}


/* ══════════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════════ */
function countUp(id, target, dur) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    el.textContent = Math.round(p * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* stat boxes on home already show static values — no counter needed for them */

/* about page counters triggered on nav */
if (document.querySelector('#pg-about.active')) {
  setTimeout(() => { countUp('a1', 4, 900); countUp('a2', 2, 900); }, 600);
}