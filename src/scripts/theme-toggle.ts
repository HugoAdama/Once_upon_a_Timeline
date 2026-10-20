/**
 * Manejador del Modo Concierto / Dark Mode ('Candybong Night Mode')
 * - Soporte para localStorage persistente
 * - Detección automática de preferencia del sistema
 * - Transición fluida a 60 FPS acelerada por GPU mediante View Transitions API
 * - Expansión radial orgánica desde el punto de interacción
 * - Micro-vibración háptica y fallback sin parpadeos
 */
export function initThemeToggle(): void {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('twice-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', (event: MouseEvent) => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    // Micro-vibración táctil sutil si el dispositivo lo soporta
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(25);
      } catch {
        // Fallback silencioso
      }
    }

    const updateTheme = () => {
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('twice-theme', next);
      window.dispatchEvent(new CustomEvent('once:theme-changed', { detail: { theme: next } }));
    };

    // Comprobar si el navegador soporta document.startViewTransition y no hay preferencia de movimiento reducido
    const supportsViewTransition =
      typeof document !== 'undefined' &&
      'startViewTransition' in document &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!supportsViewTransition) {
      document.documentElement.classList.add('theme-transitioning');
      updateTheme();
      window.setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 350);
      return;
    }

    // Coordenadas del epicentro para la expansión radial fluida
    const rect = toggleBtn.getBoundingClientRect();
    const x = event.clientX || rect.left + rect.width / 2;
    const y = event.clientY || rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.classList.add('theme-transitioning');

    const transition = (document as any).startViewTransition(() => {
      updateTheme();
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath,
        },
        {
          duration: 440,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: '::view-transition-new(root)',
        }
      );
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove('theme-transitioning');
    });
  });
}
