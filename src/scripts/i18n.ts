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

  // 3. Actualizar etiqueta visible del selector en Header
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
