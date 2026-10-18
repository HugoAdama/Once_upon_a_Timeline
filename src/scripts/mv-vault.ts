/**
 * Inicializa el Cinema MV Vault: filtrado por categoría y reproductor modal
 */
export function initMvVault(): void {
  const filterTabs = document.querySelectorAll<HTMLButtonElement>('[data-mv-filter]');
  const mvCards = document.querySelectorAll<HTMLElement>('.mv-card');
  const modal = document.querySelector<HTMLElement>('#mv-modal');
  const modalIframe = document.querySelector<HTMLIFrameElement>('#mv-modal-iframe');
  const modalTitle = document.querySelector<HTMLElement>('#mv-modal-title');
  const modalClose = document.querySelector<HTMLButtonElement>('#mv-modal-close');

  // Filtrado de videos musicales
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const category = tab.getAttribute('data-mv-filter') || 'all';

      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      mvCards.forEach((card) => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Apertura de modal con video
  const playTriggers = document.querySelectorAll<HTMLElement>('[data-play-mv]');
  playTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const youtubeId = trigger.getAttribute('data-youtube-id');
      const title = trigger.getAttribute('data-title') || 'TWICE Music Video';

      if (modal && modalIframe && youtubeId) {
        modalIframe.src = `https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`;
        if (modalTitle) modalTitle.textContent = title;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal(): void {
    if (modal && modalIframe) {
      modal.classList.remove('open');
      modalIframe.src = '';
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('open')) {
      closeModal();
    }
  });
}
