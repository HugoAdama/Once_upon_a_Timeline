/**
 * Inicializa la detección y revelado de elementos con scroll-reveal
 * y la barra de progreso de lectura.
 * Usa CSS Scroll-Driven Animations nativas si están soportadas;
 * de lo contrario, aplica fallbacks progresivos con IntersectionObserver y scroll pasivo.
 */
export function initScrollReveals(): void {
  const reveals = document.querySelectorAll('.scroll-reveal');
  const progressBar = document.querySelector<HTMLElement>('.scroll-progress-bar');

  const hasNativeTimeline = window.CSS && CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
  const hasScrollTimeline = window.CSS && CSS.supports('animation-timeline: scroll()');

  // Fallback para scroll-reveal
  if (!hasNativeTimeline && reveals.length) {
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

  // Fallback progresivo para barra de progreso de lectura si no hay soporte nativo de animation-timeline: scroll()
  if (!hasScrollTimeline && progressBar) {
    const updateProgress = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / totalScroll)) : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }
}
