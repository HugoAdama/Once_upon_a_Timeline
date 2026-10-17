/**
 * Filtrado interactivo de hitos en la Cronología histórica de TWICE
 */
export function initTimelineFilter(): void {
  const filterBtns = document.querySelectorAll<HTMLButtonElement>('[data-timeline-filter]');
  const timelineItems = document.querySelectorAll<HTMLElement>('.timeline-item');
  const counterEl = document.getElementById('timeline-results-count');

  if (!filterBtns.length || !timelineItems.length) return;

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
