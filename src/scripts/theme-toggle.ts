/**
 * Manejador del Modo Concierto / Dark Mode ('Candybong Night Mode')
 * - Soporte para localStorage persistente
 * - Detección automática de preferencia del sistema
 * - Efecto de destello interactivo al conmutar
 */
export function initThemeToggle(): void {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const storedTheme = localStorage.getItem('twice-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('twice-theme', next);

      // Micro-efecto de vibración táctil si el dispositivo lo soporta
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(25);
      }
    });
  }
}
