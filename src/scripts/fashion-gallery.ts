/**
 * Script de inicialización de la galería lookbook interactiva para las fichas de moda escénica.
 * Permite alternar con fluidez entre el look principal y los detalles de sastrería / escenario.
 */
export function initFashionGalleries(): void {
  const cards = document.querySelectorAll<HTMLElement>('[data-fashion-card]');

  cards.forEach((card) => {
    const mainImg = card.querySelector<HTMLImageElement>('[data-main-img]');
    const captionEl = card.querySelector<HTMLElement>('[data-caption-target] .fashion-indicator-text');
    const pills = card.querySelectorAll<HTMLButtonElement>('.fashion-gallery-pill');

    if (!mainImg || pills.length === 0) return;

    pills.forEach((pill) => {
      const switchImage = () => {
        const targetSrc = pill.getAttribute('data-src');
        const targetCaption = pill.getAttribute('data-caption');
        if (!targetSrc || mainImg.src.endsWith(targetSrc)) return;

        // Feedback visual en las pastillas selectoras
        pills.forEach((p) => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-selected', 'true');

        // Transición suave
        mainImg.style.transition = 'opacity 0.25s ease, transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)';
        mainImg.style.opacity = '0.35';
        mainImg.style.transform = 'scale(0.98)';

        const tempImg = new Image();
        tempImg.onload = () => {
          mainImg.src = targetSrc;
          mainImg.style.opacity = '1';
          mainImg.style.transform = 'scale(1)';
          if (captionEl && targetCaption) {
            captionEl.textContent = targetCaption;
          }
        };
        tempImg.src = targetSrc;
      };

      pill.addEventListener('click', switchImage);
      pill.addEventListener('mouseenter', switchImage);
    });
  });
}
