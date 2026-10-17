/**
 * Maneja la navegación responsive:
 * - Menú desplegable para dispositivos móviles
 * - Detección activa de sección visible (Scroll Spy)
 */
export function initNavigation(): void {
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      nav.classList.toggle('nav-open', !isExpanded);
      document.body.classList.toggle('menu-locked', !isExpanded);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('nav-open');
        document.body.classList.remove('menu-locked');
      });
    });
  }

  // Scroll spy para navegación
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  function onScrollSpy(): void {
    const scrollPos = window.scrollY + 140;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScrollSpy, { passive: true });
}
