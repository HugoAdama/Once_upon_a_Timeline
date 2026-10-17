/**
 * Filtrado interactivo de hitos en la Cronología histórica de TWICE
 * y sinergia inteligente para auto-desplegar la ficha del álbum correspondiente en la discografía.
 */
export function initTimelineFilter(): void {
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('[data-timeline-filter]');
  const timelineItems = document.querySelectorAll<HTMLElement>('.timeline-item');
  const counterEl = document.getElementById('timeline-results-count');

  if (filterBtns.length && timelineItems.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.timelineFilter || 'all';

        filterBtns.forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-pressed', String(isActive));
        });

        let visibleCount = 0;
        timelineItems.forEach((item) => {
          const itemCategory = item.dataset.timelineCategory;
          const matches = category === 'all' || itemCategory === category;

          if (matches) {
            item.style.display = '';
            item.classList.add('timeline-item-visible');
            visibleCount++;
          } else {
            item.style.display = 'none';
            item.classList.remove('timeline-item-visible');
          }
        });

        if (counterEl) {
          counterEl.textContent = `Mostrando ${visibleCount} de ${timelineItems.length} momentos`;
        }
      });
    });
  }

  // Sinergia inteligente: Auto-desplegar el álbum y hacer scroll suave al hacer clic en "Ver canciones y eras"
  const jumpBtns = document.querySelectorAll<HTMLAnchorElement>('.timeline-jump-btn');
  jumpBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const targetId = href.slice(1);
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      e.preventDefault();

      // Abrir el detalle si está cerrado
      const details = targetEl.querySelector<HTMLDetailsElement>('details') || (targetEl.tagName === 'DETAILS' ? (targetEl as HTMLDetailsElement) : null);
      if (details) {
        details.open = true;
      }

      // Si el elemento estaba oculto por filtros de discografía, asegurarse de que se muestre
      if (targetEl.style.display === 'none') {
        targetEl.style.display = '';
      }

      // Scroll suave con compensación por header fijo
      const headerOffset = 84;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      // Efecto visual de resaltado temporal
      targetEl.classList.remove('timeline-target-highlight');
      // Forzar reflujo para reiniciar animación si ya estaba
      void targetEl.offsetWidth;
      targetEl.classList.add('timeline-target-highlight');

      setTimeout(() => {
        targetEl.classList.remove('timeline-target-highlight');
      }, 2500);

      // Actualizar historial del navegador de forma limpia
      try {
        history.pushState(null, '', href);
      } catch (_) {
        // Fallback
      }
    });
  });
}
