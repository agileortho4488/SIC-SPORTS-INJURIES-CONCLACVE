/* SIC 2027 — mobile navigation.
   Standalone and dependency-free on purpose: only index.html loads GSAP/Lenis,
   but all seven pages need a working menu, and the menu must survive
   prefers-reduced-motion (where main.js returns early before doing anything). */
(function () {
  const nav = document.querySelector('.nav');
  const btn = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!nav || !btn || !menu) return;

  const links = [...menu.querySelectorAll('a')];

  // The header CTA is hidden at this width, so the sheet carries its own copy —
  // otherwise the primary action is unreachable on a phone.
  const cta = document.querySelector('.nav-cta');
  if (cta && !menu.querySelector('.nav-cta-clone')) {
    const clone = cta.cloneNode(true);
    clone.classList.remove('nav-cta');
    clone.classList.add('nav-cta-clone');
    menu.append(clone);
  }

  // Links ride in behind the sheet, 40ms apart. Set here rather than in CSS so
  // the count doesn't have to be hard-coded per page (they differ).
  const stagger = () => menu.querySelectorAll('a').forEach((a, i) => {
    a.style.transitionDelay = isOpen ? `${60 + i * 40}ms` : '0ms';
  });

  let isOpen = false;

  function setOpen(open) {
    isOpen = open;
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('menu-open', open);
    // Lenis keeps its own scroll loop running; overflow:hidden alone won't stop it
    if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
    stagger();
    if (open) menu.querySelector('a')?.focus({ preventScroll: true });
  }

  btn.addEventListener('click', () => setOpen(!isOpen));

  // Any link closes the sheet — including in-page anchors, which otherwise
  // scroll to a section that is still covered by the open menu.
  links.forEach(a => a.addEventListener('click', () => setOpen(false)));
  menu.addEventListener('click', e => { if (e.target.closest('.nav-cta-clone')) setOpen(false); });

  addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) { setOpen(false); btn.focus(); }
  });

  // Tap anywhere outside the sheet
  addEventListener('click', e => {
    if (isOpen && !nav.contains(e.target)) setOpen(false);
  });

  // Rotating to landscape can cross the breakpoint with the sheet still open,
  // which would leave the desktop link row stuck in its "open" styling.
  const desktop = matchMedia('(min-width: 60.0625rem)');
  desktop.addEventListener('change', e => { if (e.matches && isOpen) setOpen(false); });
})();
