import { I18N_DICTIONARY, type SupportedLang } from '../data/i18n';

const STORAGE_KEY = 'once_preferred_lang';

export function getLanguage(): SupportedLang {
  if (typeof window === 'undefined') return 'es';
  const saved = localStorage.getItem(STORAGE_KEY) as SupportedLang | null;
  if (saved && (saved === 'es' || saved === 'en' || saved === 'ko' || saved === 'ja')) {
    return saved;
  }
  return 'es';
}

export function t(key: string, lang?: SupportedLang): string {
  const activeLang = lang || getLanguage();
  const dict = I18N_DICTIONARY[activeLang] || I18N_DICTIONARY.es;
  return dict[key] || I18N_DICTIONARY.es[key] || '';
}

export function applyTranslations(lang?: SupportedLang): void {
  const currentLang = lang || getLanguage();
  document.documentElement.lang = currentLang;

  // 1. Elementos con data-i18n (reemplazo de texto directo)
  const i18nElements = document.querySelectorAll<HTMLElement>('[data-i18n]');
  i18nElements.forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      const translation = t(key, currentLang);
      if (translation && translation !== key) {
        el.textContent = translation;
      }
    }
  });

  // 2. Elementos con atributos específicos (data-i18n-placeholder, data-i18n-title, data-i18n-aria)
  const placeholderElements = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[data-i18n-placeholder]');
  placeholderElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      const val = t(key, currentLang);
      if (val) el.placeholder = val;
    }
  });

  const titleElements = document.querySelectorAll<HTMLElement>('[data-i18n-title]');
  titleElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    if (key) {
      const val = t(key, currentLang);
      if (val) el.title = val;
    }
  });

  const ariaElements = document.querySelectorAll<HTMLElement>('[data-i18n-aria]');
  ariaElements.forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) {
      const val = t(key, currentLang);
      if (val) el.setAttribute('aria-label', val);
    }
  });

  // 3. Fechas dinámicas (data-date)
  const dateElements = document.querySelectorAll<HTMLElement>('[data-date]');
  const dateLocale = currentLang === 'ja' ? 'ja-JP' : currentLang === 'ko' ? 'ko-KR' : currentLang === 'en' ? 'en-US' : 'es-ES';
  dateElements.forEach((el) => {
    const dateStr = el.getAttribute('data-date');
    if (dateStr) {
      try {
        const d = new Date(dateStr + 'T00:00:00');
        if (!isNaN(d.getTime())) {
          el.textContent = d.toLocaleDateString(dateLocale, { day: 'numeric', month: 'short' });
        }
      } catch (_) {}
    }
  });

  // 4. Badges de formato de lanzamiento (data-format-badge)
  const formatBadges = document.querySelectorAll<HTMLElement>('[data-format-badge]');
  formatBadges.forEach((el) => {
    const fmt = el.getAttribute('data-format-badge');
    if (fmt) {
      const trans = t(`disco.format_${fmt}`, currentLang);
      if (trans) el.textContent = trans;
    }
  });

  // 5. Conteo de canciones (data-track-count)
  const trackCountElements = document.querySelectorAll<HTMLElement>('[data-track-count]');
  trackCountElements.forEach((el) => {
    const rawCount = el.getAttribute('data-track-count');
    if (rawCount) {
      const count = parseInt(rawCount, 10);
      if (currentLang === 'ja') el.textContent = `${count}曲`;
      else if (currentLang === 'ko') el.textContent = `${count}곡`;
      else if (currentLang === 'en') el.textContent = count === 1 ? '1 song' : `${count} songs`;
      else el.textContent = count === 1 ? '1 canción' : `${count} canciones`;
    }
  });

  // 6. Conteo de canciones en setlist de gira (data-setlist-count)
  const setlistElements = document.querySelectorAll<HTMLElement>('[data-setlist-count]');
  setlistElements.forEach((el) => {
    const rawCount = el.getAttribute('data-setlist-count');
    if (rawCount) {
      const count = parseInt(rawCount, 10);
      if (currentLang === 'ja') el.textContent = `(${count}曲)`;
      else if (currentLang === 'ko') el.textContent = `(${count}곡)`;
      else if (currentLang === 'en') el.textContent = `(${count} songs)`;
      else el.textContent = `(${count} canciones)`;
    }
  });

  // 7. Conteo de lanzamientos anuales (data-year-release-count)
  const yearCountElements = document.querySelectorAll<HTMLElement>('[data-year-release-count]');
  yearCountElements.forEach((el) => {
    const rawCount = el.getAttribute('data-year-release-count');
    if (rawCount) {
      const count = parseInt(rawCount, 10);
      if (currentLang === 'ja') el.textContent = `${count}作品`;
      else if (currentLang === 'ko') el.textContent = `${count}개 발매작`;
      else if (currentLang === 'en') el.textContent = count === 1 ? '1 release' : `${count} releases`;
      else el.textContent = count === 1 ? '1 lanzamiento' : `${count} lanzamientos`;
    }
  });

  // 8. Conteo de registros por mercado (data-market-panel-count)
  const marketCountElements = document.querySelectorAll<HTMLElement>('[data-market-panel-count]');
  marketCountElements.forEach((el) => {
    const rawCount = el.getAttribute('data-count');
    if (rawCount) {
      const count = parseInt(rawCount, 10);
      if (currentLang === 'ja') el.textContent = `${count}件の記録`;
      else if (currentLang === 'ko') el.textContent = `${count}개 기록`;
      else if (currentLang === 'en') el.textContent = count === 1 ? '1 record' : `${count} records`;
      else el.textContent = count === 1 ? '1 registro' : `${count} registros`;
    }
  });

  // 9. Contador inicial de resultados en discografía
  const resultsCounter = document.querySelector<HTMLElement>('#results-counter');
  if (resultsCounter) {
    const rawTotal = resultsCounter.getAttribute('data-total-count');
    if (rawTotal) {
      const tpl = t('disco.showingResults', currentLang);
      if (tpl) resultsCounter.textContent = tpl.replace('{count}', rawTotal);
    }
  }

  // 10. Opciones del selector de formatos (#filter-format)
  const formatSelect = document.querySelector<HTMLSelectElement>('#filter-format');
  if (formatSelect) {
    Array.from(formatSelect.options).forEach((opt) => {
      const val = opt.value;
      const trans = t(`disco.format_${val}`, currentLang);
      if (trans) opt.textContent = trans;
    });
  }

  // 11. Opción "Todos los años" (#filter-year)
  const yearAllOption = document.querySelector<HTMLOptionElement>('#filter-year option[value="all"]');
  if (yearAllOption) {
    const allYearsTrans = t('disco.allYears', currentLang);
    if (allYearsTrans) yearAllOption.textContent = allYearsTrans;
  }

  // 12. Nombre por defecto en Photocard Studio
  const fanInput = document.querySelector<HTMLInputElement>('#custom-fan-name');
  if (fanInput) {
    const defaultVal = fanInput.value;
    if (!defaultVal || defaultVal === 'ONCE Oficial' || defaultVal === 'Official ONCE' || defaultVal === '공식 ONCE' || defaultVal === '公式 ONCE') {
      const defaultName = t('studio.defaultFanName', currentLang);
      if (defaultName) fanInput.value = defaultName;
    }
  }

  // 13. Actualizar opciones de miembros en Photocard Studio si existen
  const memberSelect = document.querySelector<HTMLSelectElement>('#custom-member-select');
  if (memberSelect) {
    Array.from(memberSelect.options).forEach((opt) => {
      const memberId = opt.getAttribute('data-id');
      if (memberId) {
        const roleTrans = t(`member.member-${memberId}.role`, currentLang);
        if (roleTrans) {
          opt.textContent = `${opt.value} (${roleTrans})`;
        }
      }
    });
  }

  // 14. Actualizar etiqueta visible del selector en Header
  const langLabel = document.querySelector<HTMLElement>('#current-lang-code');
  if (langLabel) {
    langLabel.textContent = currentLang.toUpperCase();
  }

  // Marcar opción activa en menú
  const menuButtons = document.querySelectorAll<HTMLElement>('[data-set-lang]');
  menuButtons.forEach((btn) => {
    const code = btn.getAttribute('data-set-lang');
    if (code === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

export function setLanguage(lang: SupportedLang): void {
  localStorage.setItem(STORAGE_KEY, lang);
  applyTranslations(lang);
  window.dispatchEvent(new CustomEvent('once:lang-changed', { detail: { lang } }));
}

export function initI18n(): void {
  const currentLang = getLanguage();
  applyTranslations(currentLang);

  // Inicializar listeners del selector de idioma en Header
  const toggleBtn = document.querySelector<HTMLButtonElement>('#lang-toggle-btn');
  const dropdown = document.querySelector<HTMLElement>('#lang-dropdown-menu');

  if (toggleBtn && dropdown) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('is-open');
      dropdown.classList.toggle('is-open', !isOpen);
      toggleBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target as Node) && e.target !== toggleBtn) {
        dropdown.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Opciones del menú
    const optionBtns = dropdown.querySelectorAll<HTMLButtonElement>('[data-set-lang]');
    optionBtns.forEach((opt) => {
      opt.addEventListener('click', () => {
        const langCode = opt.getAttribute('data-set-lang') as SupportedLang | null;
        if (langCode) {
          setLanguage(langCode);
          dropdown.classList.remove('is-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}
