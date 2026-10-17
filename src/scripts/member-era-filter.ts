/**
 * Inicializa el filtro de eras fotográficas de las integrantes de TWICE.
 * Conmuta entre las fotografías correspondientes a 'current', 'between' y 'classic'.
 */
export function initMemberEraFilter(): void {
  const eraButtons = document.querySelectorAll<HTMLButtonElement>('[data-member-era-filter]');
  const memberCards = document.querySelectorAll<HTMLElement>('.member-card');

  const ERA_LABELS: Record<string, string> = {
    current: 'Actual (2023-2025)',
    between: 'BETWEEN (2021-2022)',
    classic: 'Debut (2015-2018)',
  };

  eraButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const era = btn.getAttribute('data-member-era-filter') || 'current';

      eraButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      memberCards.forEach((card) => {
        const img = card.querySelector<HTMLImageElement>('.member-actual-photo');
        const badge = card.querySelector<HTMLElement>('[data-member-era-badge]');

        if (img) {
          const newSrc = img.getAttribute(`data-photo-${era}`);
          if (newSrc && newSrc !== img.src) {
            img.style.opacity = '0.3';
            img.style.transform = 'scale(0.97)';

            setTimeout(() => {
              img.src = newSrc;
              img.style.opacity = '1';
              img.style.transform = 'scale(1)';
            }, 180);
          }
        }

        if (badge) {
          badge.textContent = ERA_LABELS[era] || 'Era Actual';
        }
      });
    });
  });
}
