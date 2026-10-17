import { normalizar } from '../utils/text';

/**
 * Inicializa la lógica interactiva del Explorador de Discografía:
 * - Filtrado instantáneo por texto (título y canciones)
 * - Filtros combinados por mercado, año y formato
 * - Sincronización bidireccional con URL (Deep Linking & Shareable URLs)
 * - Búsqueda optimizada con debounce (120ms) y requestAnimationFrame
 * - Atajo de teclado '/'
 * - Salto con animación, apertura y resalte desde la cronología
 */
export function initDiscographyExplorer(): void {
  const searchInput = document.getElementById('search-input') as HTMLInputElement | null;
  const yearSelect = document.getElementById('filter-year') as HTMLSelectElement | null;
  const formatSelect = document.getElementById('filter-format') as HTMLSelectElement | null;
  const marketChips = document.querySelectorAll<HTMLButtonElement>('[data-filter-market]');
  const clearBtn = document.getElementById('clear-filters-btn');
  const resetEmptyBtn = document.getElementById('reset-empty-btn');
  const resultsCounter = document.getElementById('results-counter');
  const noResultsMsg = document.getElementById('no-results-msg');

  const releaseItems = Array.from(document.querySelectorAll<HTMLLIElement>('.release-item'));
  const marketPanels = Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-market-panel]'));
  const yearSections = Array.from(document.querySelectorAll<HTMLElement>('[data-year-section]'));

  if (!searchInput || !yearSelect || !formatSelect || !resultsCounter) return;

  let selectedMarket = 'all';
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let rafId: number | null = null;

  /**
   * Sincroniza el estado actual de los filtros con la URL sin recargar la página
   */
  function syncUrlParams(): void {
    const params = new URLSearchParams(window.location.search);
    const query = searchInput?.value.trim() || '';
    const year = yearSelect?.value || 'all';
    const format = formatSelect?.value || 'all';

    if (query) params.set('q', query);
    else params.delete('q');

    if (selectedMarket !== 'all') params.set('market', selectedMarket);
    else params.delete('market');

    if (year !== 'all') params.set('year', year);
    else params.delete('year');

    if (format !== 'all') params.set('format', format);
    else params.delete('format');

    const newQueryString = params.toString();
    const newUrl =
      window.location.pathname +
      (newQueryString ? `?${newQueryString}` : '') +
      window.location.hash;

    window.history.replaceState(null, '', newUrl);
  }

  /**
   * Lee los parámetros de la URL al cargar la página
   */
  function restoreFiltersFromUrl(): boolean {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const market = params.get('market');
    const year = params.get('year');
    const format = params.get('format');

    let hasParam = false;

    if (q && searchInput) {
      searchInput.value = q;
      hasParam = true;
    }

    if (year && yearSelect) {
      yearSelect.value = year;
      hasParam = true;
    }

    if (format && formatSelect) {
      formatSelect.value = format;
      hasParam = true;
    }

    if (market) {
      selectedMarket = market;
      hasParam = true;
      marketChips.forEach((btn) => {
        const isMatch = btn.getAttribute('data-filter-market') === market;
        btn.classList.toggle('active', isMatch);
        btn.setAttribute('aria-checked', isMatch ? 'true' : 'false');
      });
    }

    return hasParam;
  }

  function applyFilters(): void {
    const rawQuery = searchInput?.value || '';
    const normalizedQuery = normalizar(rawQuery);
    const selectedYear = yearSelect?.value || 'all';
    const selectedFormat = formatSelect?.value || 'all';

    let visibleCount = 0;

    releaseItems.forEach((item) => {
      const itemMarket = item.getAttribute('data-market') || '';
      const itemYear = item.getAttribute('data-year') || '';
      const itemFormat = item.getAttribute('data-format') || '';
      const rawTitle = item.getAttribute('data-title') || '';
      const rawTracks = item.getAttribute('data-tracks') || '';

      const matchesMarket = selectedMarket === 'all' || itemMarket === selectedMarket;
      const matchesYear = selectedYear === 'all' || itemYear === selectedYear;
      const matchesFormat = selectedFormat === 'all' || itemFormat === selectedFormat;

      let matchesSearch = true;
      if (normalizedQuery !== '') {
        const normalizedTitle = normalizar(rawTitle);
        const normalizedTracks = normalizar(rawTracks);
        matchesSearch = normalizedTitle.includes(normalizedQuery) || normalizedTracks.includes(normalizedQuery);
      }

      const isMatch = matchesMarket && matchesYear && matchesFormat && matchesSearch;

      if (isMatch) {
        item.style.display = '';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    yearSections.forEach((sec) => {
      const childItems = sec.querySelectorAll<HTMLLIElement>('.release-item');
      const hasVisibleChild = Array.from(childItems).some((el) => el.style.display !== 'none');
      sec.style.display = hasVisibleChild ? '' : 'none';
    });

    marketPanels.forEach((panel) => {
      const marketKey = panel.getAttribute('data-market-panel');
      const childItems = panel.querySelectorAll<HTMLLIElement>('.release-item');
      const visibleInMarket = Array.from(childItems).filter((el) => el.style.display !== 'none').length;

      const countEl = panel.querySelector(`[data-market-count-${marketKey}]`);
      if (countEl) {
        countEl.textContent = `${visibleInMarket} ${visibleInMarket === 1 ? 'registro' : 'registros'}`;
      }

      if (normalizedQuery !== '' || selectedYear !== 'all' || selectedFormat !== 'all' || selectedMarket !== 'all') {
        if (visibleInMarket > 0) {
          panel.open = true;
        }
      }

      panel.style.display = visibleInMarket > 0 ? '' : 'none';
    });

    if (resultsCounter) {
      if (visibleCount === 0) {
        resultsCounter.textContent = 'No se encontraron lanzamientos';
        if (noResultsMsg) noResultsMsg.style.display = 'block';
      } else if (visibleCount === 1) {
        resultsCounter.textContent = 'Mostrando 1 lanzamiento';
        if (noResultsMsg) noResultsMsg.style.display = 'none';
      } else {
        resultsCounter.textContent = `Mostrando ${visibleCount} lanzamientos`;
        if (noResultsMsg) noResultsMsg.style.display = 'none';
      }
    }

    syncUrlParams();
  }

  function scheduleFilterApply(delay = 0): void {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        applyFilters();
      });
    }, delay);
  }

  function resetFilters(): void {
    if (searchInput) searchInput.value = '';
    if (yearSelect) yearSelect.value = 'all';
    if (formatSelect) formatSelect.value = 'all';
    selectedMarket = 'all';

    marketChips.forEach((btn) => {
      const isAll = btn.getAttribute('data-filter-market') === 'all';
      btn.classList.toggle('active', isAll);
      btn.setAttribute('aria-checked', isAll ? 'true' : 'false');
    });

    applyFilters();
    searchInput?.focus();
  }

  // Búsqueda con debounce para fluidez en dispositivos móviles
  searchInput.addEventListener('input', () => scheduleFilterApply(120));
  yearSelect.addEventListener('change', () => scheduleFilterApply(0));
  formatSelect.addEventListener('change', () => scheduleFilterApply(0));

  marketChips.forEach((btn) => {
    btn.addEventListener('click', () => {
      marketChips.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');
      selectedMarket = btn.getAttribute('data-filter-market') || 'all';
      scheduleFilterApply(0);
    });
  });

  const quickEraButtons = document.querySelectorAll<HTMLButtonElement>('[data-search-preset]');
  quickEraButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-search-preset') || '';
      if (searchInput) {
        searchInput.value = preset;
        scheduleFilterApply(0);
        searchInput.focus();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (
      e.key === '/' &&
      document.activeElement !== searchInput &&
      !(document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement)
    ) {
      e.preventDefault();
      searchInput?.focus();
      searchInput?.select();
    }
  });

  clearBtn?.addEventListener('click', resetFilters);
  resetEmptyBtn?.addEventListener('click', resetFilters);

  function handleHashJump(hash: string): void {
    if (!hash || !hash.startsWith('#release-')) return;

    const targetId = hash.slice(1);
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    if (targetElement.style.display === 'none') {
      resetFilters();
    }

    const parentMarket = targetElement.closest('details.release-market') as HTMLDetailsElement | null;
    if (parentMarket) {
      parentMarket.open = true;
    }

    const releaseDetails = targetElement.querySelector('details.release-details') as HTMLDetailsElement | null;
    if (releaseDetails) {
      releaseDetails.open = true;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    targetElement.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'center',
    });

    targetElement.classList.add('target-highlight');
    setTimeout(() => {
      targetElement.classList.remove('target-highlight');
    }, 2500);

    const summary = targetElement.querySelector('summary');
    summary?.focus({ preventScroll: true });
  }

  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement)?.closest('a');
    if (!target) return;
    const href = target.getAttribute('href');
    if (href && href.startsWith('#release-')) {
      e.preventDefault();
      window.history.pushState(null, '', href);
      handleHashJump(href);
    }
  });

  // Restaurar estado desde la URL al inicio
  const hadParams = restoreFiltersFromUrl();
  if (hadParams) {
    applyFilters();
  }

  if (window.location.hash && window.location.hash.startsWith('#release-')) {
    setTimeout(() => {
      handleHashJump(window.location.hash);
    }, 120);
  }
}
