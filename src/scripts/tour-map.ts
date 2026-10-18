/**
 * Inicializa World Tour Odyssey: navegación entre giras mundiales
 */
export function initTourOdyssey(): void {
  const tourNavBtns = document.querySelectorAll<HTMLButtonElement>('[data-tour-id]');
  const tourPanels = document.querySelectorAll<HTMLElement>('.tour-content-panel');

  tourNavBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tourId = btn.getAttribute('data-tour-id');
      if (!tourId) return;

      tourNavBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      tourPanels.forEach((panel) => {
        if (panel.id === `panel-${tourId}`) {
          panel.style.display = 'block';
        } else {
          panel.style.display = 'none';
        }
      });
    });
  });
}
