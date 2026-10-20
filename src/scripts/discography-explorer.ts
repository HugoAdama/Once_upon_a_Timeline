import { normalizar } from '../utils/text';
import { t } from './i18n';

const FAV_STORAGE_KEY = 'once-favorite-releases';
const VIEW_STORAGE_KEY = 'once-releases-view-mode';

/**
 * Inicializa la lógica interactiva del Explorador de Discografía:
 * - Filtrado instantáneo por texto (título y canciones)
 * - Filtros combinados por mercado, año y formato
 * - Filtro de favoritos personalizados ("Mis Favoritos" con localStorage)
 * - Conmutador de vista Cuadrícula de Portadas vs Lista Compacta
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
  const filterFavBtn = document.getElementById('filter-fav-btn') as HTMLButtonElement | null;
  const favsCounter = document.getElementById('favs-counter');
  const clearBtn = document.getElementById('clear-filters-btn');
  const resetEmptyBtn = document.getElementById('reset-empty-btn');
  const resultsCounter = document.getElementById('results-counter');
  const noResultsMsg = document.getElementById('no-results-msg');
  const viewGridBtn = document.getElementById('view-grid-btn') as HTMLButtonElement | null;
  const viewCompactBtn = document.getElementById('view-compact-btn') as HTMLButtonElement | null;
  const discographySection = document.getElementById('discografia');

  const releaseItems = Array.from(document.querySelectorAll<HTMLLIElement>('.release-item'));
  const marketPanels = Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-market-panel]'));
  const yearSections = Array.from(document.querySelectorAll<HTMLElement>('[data-year-section]'));

  if (!searchInput || !yearSelect || !formatSelect || !resultsCounter) return;

  let selectedMarket = 'all';
  let filterOnlyFavs = false;
  let favoritesSet = new Set<string>();
  let debounceTimer: ReturnType<typeof setTimeout> | null = null;
  let rafId: number | null = null;

  // 1. Cargar Favoritos guardados
  try {
    const rawFavs = localStorage.getItem(FAV_STORAGE_KEY);
    if (rawFavs) {
      const parsed = JSON.parse(rawFavs);
      if (Array.isArray(parsed)) {
        favoritesSet = new Set(parsed);
      }
    }
  } catch (_) {
    favoritesSet = new Set();
  }

  function updateFavoritesUI(): void {
    if (favsCounter) {
      favsCounter.textContent = `(${favoritesSet.size})`;
    }

    releaseItems.forEach((item) => {
      const isFav = favoritesSet.has(item.id);
      const favBtn = item.querySelector<HTMLButtonElement>('[data-fav-release]');
      if (favBtn) {
        favBtn.classList.toggle('active', isFav);
        favBtn.setAttribute('aria-pressed', String(isFav));
      }
    });

    if (filterFavBtn) {
      filterFavBtn.classList.toggle('active', filterOnlyFavs);
      filterFavBtn.setAttribute('aria-pressed', String(filterOnlyFavs));
    }
  }

  function toggleFavorite(releaseId: string): void {
    if (favoritesSet.has(releaseId)) {
      favoritesSet.delete(releaseId);
    } else {
      favoritesSet.add(releaseId);
    }

    try {
      localStorage.setItem(FAV_STORAGE_KEY, JSON.stringify(Array.from(favoritesSet)));
    } catch (_) {
      // Fallback
    }

    updateFavoritesUI();
    if (filterOnlyFavs) {
      applyFilters();
    }
  }

  // 2. Conmutador de Vista (Cuadrícula vs Lista Compacta)
  function applyViewMode(mode: 'grid' | 'compact'): void {
    const isCompact = mode === 'compact';
    discographySection?.classList.toggle('view-compact-mode', isCompact);

    if (viewGridBtn && viewCompactBtn) {
      viewGridBtn.classList.toggle('active', !isCompact);
      viewGridBtn.setAttribute('aria-pressed', String(!isCompact));
      viewCompactBtn.classList.toggle('active', isCompact);
      viewCompactBtn.setAttribute('aria-pressed', String(isCompact));
    }

    try {
      localStorage.setItem(VIEW_STORAGE_KEY, mode);
    } catch (_) {
      // Fallback
    }
  }

  const savedViewMode = (localStorage.getItem(VIEW_STORAGE_KEY) as 'grid' | 'compact') || 'grid';
  applyViewMode(savedViewMode);

  viewGridBtn?.addEventListener('click', () => applyViewMode('grid'));
  viewCompactBtn?.addEventListener('click', () => applyViewMode('compact'));

  // 3. Sincronización con URL
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

    if (filterOnlyFavs) params.set('favs', '1');
    else params.delete('favs');

    const newQueryString = params.toString();
    const newUrl =
      window.location.pathname +
      (newQueryString ? `?${newQueryString}` : '') +
      window.location.hash;

    window.history.replaceState(null, '', newUrl);
  }

  function restoreFiltersFromUrl(): boolean {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const market = params.get('market');
    const year = params.get('year');
    const format = params.get('format');
    const favs = params.get('favs');

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

    if (favs === '1') {
      filterOnlyFavs = true;
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
      const matchesFav = !filterOnlyFavs || favoritesSet.has(item.id);

      let matchesSearch = true;
      if (normalizedQuery !== '') {
        const normalizedTitle = normalizar(rawTitle);
        const normalizedTracks = normalizar(rawTracks);
        matchesSearch = normalizedTitle.includes(normalizedQuery) || normalizedTracks.includes(normalizedQuery);
      }

      const isMatch = matchesMarket && matchesYear && matchesFormat && matchesFav && matchesSearch;

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

      if (normalizedQuery !== '' || selectedYear !== 'all' || selectedFormat !== 'all' || selectedMarket !== 'all' || filterOnlyFavs) {
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
    filterOnlyFavs = false;

    marketChips.forEach((btn) => {
      const isAll = btn.getAttribute('data-filter-market') === 'all';
      btn.classList.toggle('active', isAll);
      btn.setAttribute('aria-checked', isAll ? 'true' : 'false');
    });

    if (filterFavBtn) {
      filterFavBtn.classList.remove('active');
      filterFavBtn.setAttribute('aria-pressed', 'false');
    }

    applyFilters();
    searchInput?.focus();
  }

  // Interacción botón Favoritos en la barra de filtros
  filterFavBtn?.addEventListener('click', () => {
    filterOnlyFavs = !filterOnlyFavs;
    updateFavoritesUI();
    scheduleFilterApply(0);
  });

  // Delegación de clic para guardar/remover de favoritos en cada release
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const favBtn = target?.closest<HTMLButtonElement>('[data-fav-release]');
    if (favBtn) {
      e.preventDefault();
      e.stopPropagation();
      const releaseId = favBtn.dataset.favRelease;
      if (releaseId) {
        toggleFavorite(releaseId);
      }
    }
  });

  // Búsqueda y selects
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

  // Pestañas de Descubrimiento (Eras Destacadas vs Killing Parts)
  const tabQuickEras = document.getElementById('tab-quick-eras') as HTMLButtonElement | null;
  const tabKillingParts = document.getElementById('tab-killing-parts') as HTMLButtonElement | null;
  const panelQuickEras = document.getElementById('panel-quick-eras') as HTMLElement | null;
  const panelKillingParts = document.getElementById('panel-killing-parts') as HTMLElement | null;

  function setDiscoveryTab(activeTab: 'eras' | 'killing'): void {
    const isEras = activeTab === 'eras';
    if (tabQuickEras && tabKillingParts && panelQuickEras && panelKillingParts) {
      tabQuickEras.classList.toggle('active', isEras);
      tabQuickEras.setAttribute('aria-selected', String(isEras));
      tabKillingParts.classList.toggle('active', !isEras);
      tabKillingParts.setAttribute('aria-selected', String(!isEras));

      panelQuickEras.classList.toggle('active', isEras);
      panelQuickEras.hidden = !isEras;
      panelKillingParts.classList.toggle('active', !isEras);
      panelKillingParts.hidden = isEras;
    }
  }

  tabQuickEras?.addEventListener('click', () => setDiscoveryTab('eras'));
  tabKillingParts?.addEventListener('click', () => setDiscoveryTab('killing'));

  tabQuickEras?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      tabKillingParts?.focus();
      setDiscoveryTab('killing');
    }
  });

  tabKillingParts?.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      tabQuickEras?.focus();
      setDiscoveryTab('eras');
    }
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

  const killingPartButtons = document.querySelectorAll<HTMLButtonElement>('[data-killing-query]');
  killingPartButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-killing-query') || '';
      if (searchInput) {
        searchInput.value = query;
        scheduleFilterApply(0);
        searchInput.focus();

        setTimeout(() => {
          const firstVisible = releaseItems.find((item) => item.style.display !== 'none');
          if (firstVisible) {
            const details = firstVisible.querySelector<HTMLDetailsElement>('details.release-details');
            if (details) details.open = true;
            firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstVisible.classList.remove('highlight-target');
            void firstVisible.offsetWidth;
            firstVisible.classList.add('highlight-target');
          }
        }, 150);
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

  // Handler para el botón Expandir / Colapsar todos los lanzamientos
  const toggleAllBtn = document.getElementById('toggle-all-releases-btn') as HTMLButtonElement | null;
  const toggleAllText = document.getElementById('toggle-all-text');
  const toggleExpandIcon = toggleAllBtn?.querySelector<SVGElement>('.toggle-expand-icon');
  const toggleCollapseIcon = toggleAllBtn?.querySelector<SVGElement>('.toggle-collapse-icon');
  let allExpanded = false;

  if (toggleAllBtn) {
    toggleAllBtn.addEventListener('click', () => {
      allExpanded = !allExpanded;
      toggleAllBtn.setAttribute('aria-expanded', String(allExpanded));

      if (allExpanded) {
        marketPanels.forEach((panel) => {
          panel.open = true;
        });
      }

      const allDetails = document.querySelectorAll<HTMLDetailsElement>('.release-details');
      allDetails.forEach((details) => {
        const parentItem = details.closest<HTMLElement>('.release-item');
        if (!parentItem || parentItem.style.display === 'none') return;
        details.open = allExpanded;
      });

      if (toggleAllText) {
        const key = allExpanded ? 'disco.collapseAll' : 'disco.expandAll';
        toggleAllText.setAttribute('data-i18n', key);
        toggleAllText.textContent = t(key);
      }
      if (toggleExpandIcon && toggleCollapseIcon) {
        toggleExpandIcon.style.display = allExpanded ? 'none' : 'block';
        toggleCollapseIcon.style.display = allExpanded ? 'block' : 'none';
      }
    });

    window.addEventListener('once:lang-changed', () => {
      if (toggleAllText) {
        const key = allExpanded ? 'disco.collapseAll' : 'disco.expandAll';
        toggleAllText.textContent = t(key);
      }
    });
  }

  // Inicializar estado de Favoritos en la UI
  updateFavoritesUI();

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
