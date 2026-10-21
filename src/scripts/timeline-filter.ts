import { t } from './i18n';

/**
 * Filtrado interactivo de hitos en la Cronología histórica de TWICE,
 * riel cronológico rápido y sinergia inteligente para auto-desplegar la ficha
 * del álbum correspondiente en la discografía.
 */
export function initTimelineFilter(): void {
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('[data-timeline-filter]');
  const milestoneCards = document.querySelectorAll<HTMLElement>('.timeline-card, .timeline-item');
  const counterEl = document.getElementById('timeline-results-count');
  const scrubberNodes = document.querySelectorAll<HTMLButtonElement>('.scrubber-node-btn');

  let currentCategory = 'all';

  // Función para aplicar filtro por categoría
  function applyCategoryFilter(category: string): void {
    currentCategory = category;
    let visibleCount = 0;

    // Actualizar botones de filtro
    filterBtns.forEach((btn) => {
      const btnCat = btn.dataset.timelineFilter || 'all';
      const isActive = btnCat === category;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    // Actualizar visibilidad de tarjetas de hitos
    milestoneCards.forEach((card) => {
      const cardCategory = card.dataset.timelineCategory;
      const matches = category === 'all' || cardCategory === category;

      if (matches) {
        card.style.display = '';
        card.classList.add('timeline-item-visible');
        visibleCount++;
      } else {
        card.style.display = 'none';
        card.classList.remove('timeline-item-visible');
      }
    });

    // Actualizar estado visual de los nodos en el riel cronológico
    scrubberNodes.forEach((node) => {
      const nodeCategory = node.dataset.timelineCategory;
      const matches = category === 'all' || nodeCategory === category;

      node.classList.toggle('scrubber-node-dimmed', !matches);
      node.classList.toggle('scrubber-node-active-era', matches && category !== 'all');
    });

    // Actualizar contador accesible
    if (counterEl) {
      const tpl = t('timeline.resultsCount') || 'Mostrando {shown} de {total} momentos';
      counterEl.textContent = tpl.replace('{shown}', String(visibleCount)).replace('{total}', String(milestoneCards.length));
    }
  }

  window.addEventListener('once:lang-changed', () => {
    applyCategoryFilter(currentCategory);
  });

  // Eventos de los botones de filtro
  if (filterBtns.length && milestoneCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const category = btn.dataset.timelineFilter || 'all';
        applyCategoryFilter(category);
      });
    });
  }

  // Eventos del Riel Cronológico Rápido (Scrubber)
  if (scrubberNodes.length) {
    scrubberNodes.forEach((node) => {
      node.addEventListener('click', () => {
        const targetId = node.dataset.scrubberTarget;
        if (!targetId) return;

        const targetCard = document.getElementById(targetId);
        if (!targetCard) return;

        // Si la tarjeta está oculta por un filtro activo, restablecer filtro a 'all'
        if (targetCard.style.display === 'none') {
          applyCategoryFilter('all');
        }

        // Marcar nodo seleccionado en el riel
        scrubberNodes.forEach((n) => n.classList.remove('scrubber-node-current'));
        node.classList.add('scrubber-node-current');

        // Scroll suave hacia la tarjeta con compensación por la cabecera fija
        const headerOffset = 90;
        const elementPosition = targetCard.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });

        // Efecto visual de halo / spotlight momentáneo
        targetCard.classList.remove('milestone-spotlight');
        void targetCard.offsetWidth; // Forzar reflujo
        targetCard.classList.add('milestone-spotlight');

        setTimeout(() => {
          targetCard.classList.remove('milestone-spotlight');
        }, 2200);
      });
    });
  }

  // Sinergia inteligente: Auto-desplegar el álbum y hacer scroll suave al hacer clic en "Ver álbum y canciones"
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
      const details =
        targetEl.querySelector<HTMLDetailsElement>('details') ||
        (targetEl.tagName === 'DETAILS' ? (targetEl as HTMLDetailsElement) : null);
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
