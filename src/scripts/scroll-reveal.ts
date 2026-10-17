/**
 * Inicializa la detección y revelado de elementos con scroll-reveal.
 * Usa CSS Scroll-Driven Animations nativas si están soportadas;
 * de lo contrario, aplica fallback progresivo mediante IntersectionObserver.
 */
export function initScrollReveals(): void {
  const reveals = document.querySelectorAll('.scroll-reveal');
  if (!reveals.length) return;

  const hasNativeTimeline = window.CSS && CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
  if (!hasNativeTimeline) {
    document.documentElement.classList.add('no-timeline-support');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px',
      }
    );
    reveals.forEach((el) => observer.observe(el));
  }
}
