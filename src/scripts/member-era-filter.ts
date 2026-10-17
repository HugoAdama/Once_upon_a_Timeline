/**
 * Inicializa el filtro de eras fotográficas de las integrantes de TWICE
 * y las animaciones interactivas de inclinación 3D (Photocard Tilt & Hologram)
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

  // Soporte para giro 3D de Photocard coleccionable e inclinación holográfica realista
  const flipWrappers = document.querySelectorAll<HTMLElement>('[data-photocard-wrap]');
  flipWrappers.forEach((wrap) => {
    const flipBtns = wrap.querySelectorAll<HTMLButtonElement>('[data-photocard-flip], [data-photocard-flip-back]');
    flipBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        wrap.classList.toggle('is-flipped');
      });
    });

    // Inclinación 3D reactiva al cursor (Fluid 3D Tilt)
    wrap.addEventListener('mousemove', (e: MouseEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      if (wrap.classList.contains('is-flipped')) return;

      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Ángulo de inclinación de hasta ±8.5 grados
      const rotateX = ((y - centerY) / centerY) * -8.5;
      const rotateY = ((x - centerX) / centerX) * 8.5;

      const shimmerX = (x / rect.width) * 100;
      const shimmerY = (y / rect.height) * 100;

      wrap.style.setProperty('--card-rot-x', `${rotateX.toFixed(2)}deg`);
      wrap.style.setProperty('--card-rot-y', `${rotateY.toFixed(2)}deg`);
      wrap.style.setProperty('--shimmer-x', `${shimmerX.toFixed(1)}%`);
      wrap.style.setProperty('--shimmer-y', `${shimmerY.toFixed(1)}%`);
    });

    wrap.addEventListener('mouseleave', () => {
      wrap.style.setProperty('--card-rot-x', '0deg');
      wrap.style.setProperty('--card-rot-y', '0deg');
    });
  });

  // Prevenir que clics en enlaces o botones interactivos del summary colapsen la tarjeta
  const interactivePills = document.querySelectorAll<HTMLElement>('.member-ig-badge, .member-bias-btn');
  interactivePills.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });
}
