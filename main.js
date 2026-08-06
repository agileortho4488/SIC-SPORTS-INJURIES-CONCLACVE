/* SIC 2027 — hero scroll flight.
   Layers: photo backdrop → frame-sequence canvas (scrubbed) → beat captions → poster overlay.
   The typographic beats run even before frames finish loading; the canvas joins when decoded. */

/* Countdown — plain content update, runs in every mode */
(function () {
  const target = new Date('2027-01-29T09:00:00+05:30').getTime();
  const cells = {};
  document.querySelectorAll('[data-cd]').forEach(el => cells[el.dataset.cd] = el);
  if (!cells.d) return;
  function tick() {
    let ms = Math.max(0, target - Date.now());
    const d = Math.floor(ms / 864e5); ms -= d * 864e5;
    const h = Math.floor(ms / 36e5);  ms -= h * 36e5;
    const m = Math.floor(ms / 6e4);   ms -= m * 6e4;
    const s = Math.floor(ms / 1e3);
    cells.d.textContent = d;
    cells.h.textContent = String(h).padStart(2, '0');
    cells.m.textContent = String(m).padStart(2, '0');
    cells.s.textContent = String(s).padStart(2, '0');
  }
  tick();
  setInterval(tick, 1000);
})();

(function () {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !window.gsap || !window.ScrollTrigger) {
    document.documentElement.classList.add('static');
    return; // static 100svh poster over the photo, page fully usable
  }

  gsap.registerPlugin(ScrollTrigger);

  // bump when assets/ or flight/ media are replaced — busts stale caches
  const MEDIA_V = '?v=2';

  // Lenis smooth scroll, driven by gsap.ticker — short duration keeps it responsive
  const lenis = new Lenis({ duration: 0.85, wheelMultiplier: 1.15 });
  document.documentElement.classList.add('lenis');
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ── ambient background loop (desktop only; mobile keeps the photo) ── */
  const video = document.querySelector('.hero-video');
  const wantVideo = !matchMedia('(max-width: 768px)').matches;
  if (wantVideo) {
    video.src = 'assets/flight-loop.mp4' + MEDIA_V;
    video.play().then(() => video.classList.add('playing')).catch(() => {});
  }

  /* ── frame-sequence canvas ─────────────────────────────── */
  const canvas = document.getElementById('flight');
  const ctx = canvas.getContext('2d');
  const isMobile = matchMedia('(max-width: 768px)').matches;
  const SET = isMobile ? { count: 60, dir: 'flight/m' } : { count: 120, dir: 'flight/d' };
  const frames = [];
  let framesReady = false;
  let last = -1;

  function sizeCanvas() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    last = -1; // force redraw at new size
  }

  // object-fit: cover, computed manually
  function draw(i) {
    const img = frames[i];
    if (!img || i === last) return;
    last = i;
    const cw = canvas.width, ch = canvas.height;
    const s = Math.max(cw / img.width, ch / img.height);
    const dw = img.width * s, dh = img.height * s;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }

  function currentFrame() {
    return Math.round(state.frame);
  }

  const state = { frame: 0 };

  sizeCanvas();
  let resizeT;
  addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { sizeCanvas(); if (framesReady) draw(currentFrame()); }, 150);
  });

  // Preload + decode every frame before the canvas participates
  {
    const pad = n => String(n + 1).padStart(4, '0');
    let loaded = 0;
    for (let i = 0; i < SET.count; i++) {
      const img = new Image();
      img.src = `${SET.dir}/f${pad(i)}.webp${MEDIA_V}`;
      img.decode().then(() => {
        frames[i] = img;
        if (++loaded === SET.count) { framesReady = true; draw(currentFrame()); }
      }).catch(() => {}); // missing frames: canvas simply never joins
    }
  }

  /* ── the flight ────────────────────────────────────────── */
  const BEATS = 7;
  const words = gsap.utils.toArray('.beat-word');
  const captions = gsap.utils.toArray('.beat-caption');
  const dots = gsap.utils.toArray('.rail-dot');
  const overlay = document.querySelector('.hero-overlay');
  const slashFill = document.querySelector('.hero-slash-fill');

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '+=380%',
      pin: true,
      pinSpacing: true,
      scrub: 0.35,
      anticipatePin: 1,
      onUpdate(self) {
        const active = Math.min(BEATS - 1, Math.floor(self.progress * BEATS));
        dots.forEach((d, i) => d.classList.toggle('on', i <= active && self.progress > 0.02));
        if (framesReady) draw(currentFrame());
        // ambient loop is covered by the canvas mid-flight — don't burn battery under it
        if (wantVideo && video.src) {
          const covered = framesReady && self.progress > 0.15 && self.progress < 0.9;
          if (covered && !video.paused) video.pause();
          else if (!covered && video.paused) video.play().catch(() => {});
        }
      },
    },
  });

  // Timeline is 0→6 "screens" of scroll. Overlay fades out over the first
  // 0.7 screens, back in over the last 0.5 — never fade the pinned #hero itself.
  tl.to(overlay, { opacity: 0, duration: 0.7 }, 0);
  tl.set(overlay, { pointerEvents: 'none' }, 0.7);
  tl.set(overlay, { pointerEvents: 'auto' }, 5.5);
  tl.to(overlay, { opacity: 1, duration: 0.5 }, 5.5);

  // Frame canvas: scrub across the whole flight, visible only mid-flight
  tl.to(state, { frame: SET.count - 1, snap: 'frame', duration: 6 }, 0);
  tl.to(canvas, { opacity: 1, duration: 0.7 }, 0);
  tl.to(canvas, { opacity: 0, duration: 0.5 }, 5.5);

  // Diagonal progress rule fills across the whole flight
  tl.fromTo(slashFill, { scaleX: 0 }, { scaleX: 1, duration: 6 }, 0);

  // 7 beats across screens 0.5 → 5.5: giant outlined word drifts through,
  // lime caption crosses upper-left
  const span = 5 / BEATS; // scroll-screens per beat
  words.forEach((word, i) => {
    const at = 0.5 + i * span;
    tl.fromTo(word,
      { xPercent: -35, opacity: 0 },
      { xPercent: -50, opacity: 1, duration: span * 0.45 }, at);
    tl.to(word,
      { xPercent: -65, opacity: 0, duration: span * 0.45 }, at + span * 0.55);
    tl.fromTo(captions[i],
      { x: -40, opacity: 0 },
      { x: 0, opacity: 1, duration: span * 0.35 }, at);
    tl.to(captions[i],
      { x: 40, opacity: 0, duration: span * 0.35 }, at + span * 0.65);
  });

  // Rail dots tween scroll to their beat
  const st = tl.scrollTrigger;
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const p = (0.5 + i * span + span * 0.3) / 6;
      lenis.scrollTo(st.start + p * (st.end - st.start), { duration: 1.2 });
    });
  });

  // Sections below the hero rise in quietly (no parallax — restraint)
  gsap.utils.toArray('section:not(#hero), footer').forEach(sec => {
    gsap.from(sec, {
      opacity: 0, y: 30, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: sec, start: 'top 85%' },
    });
  });

  // Display headings: word-mask rise (hand-rolled split — no SplitText plugin)
  gsap.utils.toArray('main h2.display').forEach(h => {
    const frag = document.createDocumentFragment();
    h.childNodes.forEach(node => {
      if (node.nodeType === 3) {
        node.textContent.split(/\s+/).filter(Boolean).forEach(word => {
          const wd = document.createElement('span');
          wd.className = 'wd';
          wd.innerHTML = `<span class="wdi">${word}</span>`;
          frag.append(wd, ' ');
        });
      } else {
        frag.append(node.cloneNode(true));
      }
    });
    h.replaceChildren(frag);
    gsap.from(h.querySelectorAll('.wdi'), {
      yPercent: 110, duration: 0.7, stagger: 0.07, ease: 'power3.out',
      scrollTrigger: { trigger: h, start: 'top 85%' },
    });
  });

  // Why-stats: count numbers up from zero (en-IN grouping preserved)
  document.querySelectorAll('.why-stat b').forEach(b => {
    const tokens = b.textContent.split(/(\d[\d,]*)/);
    const targets = tokens.map(t => /^\d/.test(t) ? parseInt(t.replace(/,/g, ''), 10) : null);
    if (!targets.some(t => t !== null)) return;
    const state = { p: 0 };
    gsap.to(state, {
      p: 1, duration: 1.4, ease: 'power2.out',
      scrollTrigger: { trigger: b, start: 'top 88%', once: true },
      onUpdate() {
        b.textContent = tokens.map((t, i) => targets[i] === null ? t
          : Math.round(targets[i] * state.p).toLocaleString('en-IN')).join('');
      },
    });
  });

  // Highlight rows stagger in individually
  ScrollTrigger.batch('.highlight-list li', {
    start: 'top 90%',
    once: true,
    onEnter: batch => gsap.from(batch, {
      opacity: 0, x: -30, duration: 0.6, stagger: 0.1, ease: 'power2.out',
    }),
  });

  // Cards rise in (features, committee, venue facts, why-stats)
  ScrollTrigger.batch('.feature-grid li, .committee > div, .venue-facts li, .why-stat', {
    start: 'top 92%',
    once: true,
    onEnter: batch => gsap.from(batch, {
      opacity: 0, y: 30, duration: 0.6, stagger: 0.08, ease: 'power2.out',
    }),
  });

  // Nav: smooth anchor scrolling through Lenis + active-section state
  document.querySelectorAll('.nav a[href^="#"], .hero-ctas a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { duration: 1.2, offset: -70 });
    });
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    const sec = document.querySelector(a.hash);
    if (!sec) return;
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 40%',
      end: 'bottom 40%',
      onToggle: self => a.classList.toggle('active', self.isActive),
    });
  });

  /* ── premium layer ─────────────────────────────────────── */

  // scroll progress hairline
  const progress = document.getElementById('progress');
  ScrollTrigger.create({
    start: 0,
    end: () => ScrollTrigger.maxScroll(window),
    onUpdate: self => progress.style.transform = `scaleX(${self.progress})`,
  });

  // back to top
  const toTop = document.querySelector('.to-top');
  // listen to BOTH lenis and native scroll — keyboard, anchor jumps and touch
  // don't always route through lenis, and the button must never be stuck hidden
  const syncToTop = () => toTop.classList.toggle('show', window.scrollY > innerHeight * 1.5);
  lenis.on('scroll', syncToTop);
  addEventListener('scroll', syncToTop, { passive: true });
  syncToTop();
  toTop.addEventListener('click', () => lenis.scrollTo(0, { duration: 1.1 }));

  // pointer-driven effects — fine pointers only
  if (matchMedia('(pointer: fine)').matches) {
    document.documentElement.classList.add('fine-pointer');

    // cursor spotlight
    const spot = document.getElementById('spot');
    const sx = gsap.quickTo(spot, 'x', { duration: 0.35, ease: 'power2.out' });
    const sy = gsap.quickTo(spot, 'y', { duration: 0.35, ease: 'power2.out' });
    addEventListener('mousemove', e => { sx(e.clientX); sy(e.clientY); });

    // magnetic CTAs
    document.querySelectorAll('.pill, .ghost').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          x: (e.clientX - r.left - r.width / 2) * 0.18,
          y: (e.clientY - r.top - r.height / 2) * 0.3,
          duration: 0.3,
        });
      });
      el.addEventListener('mouseleave', () => gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' }));
    });

    // committee card tilt
    document.querySelectorAll('.committee > div').forEach(card => {
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        gsap.to(card, {
          rotateY: ((e.clientX - r.left) / r.width - 0.5) * 8,
          rotateX: (0.5 - (e.clientY - r.top) / r.height) * 8,
          transformPerspective: 700,
          duration: 0.35,
        });
      });
      card.addEventListener('mouseleave', () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5 }));
    });
  }
})();
