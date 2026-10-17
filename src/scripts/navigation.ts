/**
 * Navegación global del sitio:
 * - Cabecera sticky con elevación dinámica al hacer scroll (.scrolled)
 * - Menú responsive desplegable accesible (soporte para teclado, Escape, click exterior)
 * - Scroll Spy de alta precisión con requestAnimationFrame
 * - Botón flotante 'Volver arriba' (Scroll To Top)
 */

export function initNavigation(): void {
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('mobile-menu-toggle');
  const nav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');
  const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));

  // 1. Control del menú móvil accesible
  if (toggle && nav) {
    const closeMobileMenu = () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú de navegación');
      nav.classList.remove('nav-open');
      document.body.classList.remove('menu-locked');
    };

    const openMobileMenu = () => {
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar menú de navegación');
      nav.classList.add('nav-open');
      document.body.classList.add('menu-locked');
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Cerrar al pulsar cualquier enlace del menú
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMobileMenu();
        toggle.focus();
      }
    });

    // Cerrar al hacer clic fuera del menú desplegado
    document.addEventListener('click', (e: MouseEvent) => {
      if (
        toggle.getAttribute('aria-expanded') === 'true' &&
        !nav.contains(e.target as Node) &&
        !toggle.contains(e.target as Node)
      ) {
        closeMobileMenu();
      }
    });
  }

  // 2. Scroll Spy y elevación de cabecera optimizada con requestAnimationFrame
  let ticking = false;

  function updateNavigationState(): void {
    const scrollY = window.scrollY;

    // Elevación de cabecera (.scrolled)
    if (header) {
      if (scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Comprobación si estamos al fondo de la página
    const atBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 60;

    let currentSectionId = '';

    if (atBottom && sections.length > 0) {
      currentSectionId = sections[sections.length - 1].getAttribute('id') || '';
    } else {
      const scrollPos = scrollY + 160;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.offsetTop <= scrollPos) {
          currentSectionId = sec.getAttribute('id') || '';
          break;
        }
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (currentSectionId && href === `#${currentSectionId}`) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'location');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
      }
    });

    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavigationState);
        ticking = true;
      }
    },
    { passive: true }
  );

  // Ejecución inmediata para sincronizar estado al cargar o refrescar
  updateNavigationState();
}

/**
 * Inicializa el botón flotante para volver al inicio
 */
export function initScrollToTop(): void {
  const bttBtn = document.getElementById('back-to-top');
  if (!bttBtn) return;

  let ticking = false;

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 420) {
            bttBtn.classList.add('visible');
          } else {
            bttBtn.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  bttBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
    // Llevar foco al inicio o al enlace de salto para accesibilidad
    const skipLink = document.querySelector<HTMLElement>('.skip-to-content');
    if (skipLink) {
      skipLink.focus({ preventScroll: true });
    }
  });
}
