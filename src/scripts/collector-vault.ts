/**
 * Once Upon a Timeline — Collector Vault & Relics Interaction
 * Maneja las pestañas principales del museo, el simulador de luz del Candybong
 * y las tarjetas 3D interactivas con brillo holográfico de las photocards más raras.
 */

import { t } from './i18n';

export function initCollectorVault(): void {
  const container = document.getElementById('boveda-coleccionista');
  if (!container) return;

  // ==========================================
  // 1. PESTAÑAS PRINCIPALES DEL MUSEO
  // ==========================================
  const vaultTabBtns = container.querySelectorAll<HTMLButtonElement>('[data-vault-tab]');
  const vaultPanels = container.querySelectorAll<HTMLElement>('.vault-panel');

  vaultTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-vault-tab');
      if (!targetTab) return;

      vaultTabBtns.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle('active', isCurrent);
        b.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      });

      vaultPanels.forEach((panel) => {
        const isTarget = panel.id === `vault-panel-${targetTab}`;
        panel.classList.toggle('active', isTarget);
      });
    });
  });

  // ==========================================
  // 2. SIMULADOR LUMÍNICO DEL CANDYBONG
  // ==========================================
  const lightStage = document.getElementById('candybong-light-stage');
  const readoutDot = document.getElementById('readout-dot');
  const readoutLabel = document.getElementById('readout-label');
  const colorBubbles = container.querySelectorAll<HTMLButtonElement>('.color-bubble');
  const rhythmBtns = container.querySelectorAll<HTMLButtonElement>('.rhythm-btn');
  const modelTabs = container.querySelectorAll<HTMLButtonElement>('[data-target-model]');
  const modelCards = container.querySelectorAll<HTMLElement>('.model-detail-card');

  // Selector de Color
  colorBubbles.forEach((bubble) => {
    bubble.addEventListener('click', () => {
      colorBubbles.forEach((b) => b.classList.remove('active'));
      bubble.classList.add('active');

      const colorKey = bubble.getAttribute('data-color-name-key');
      const color = bubble.getAttribute('data-candy-color') || '#e83e86';
      const colorSec = bubble.getAttribute('data-candy-color-sec') || color;
      const colorName = bubble.getAttribute('data-color-name') || 'Color Oficial';

      if (lightStage) {
        lightStage.style.setProperty('--candy-glow-color', color);
        lightStage.style.setProperty('--candy-secondary-color', colorSec);
      }
      if (readoutDot) {
        readoutDot.style.backgroundColor = color;
      }
      if (readoutLabel) {
        if (colorKey) {
          readoutLabel.setAttribute('data-i18n', colorKey);
          readoutLabel.textContent = t(colorKey) || colorName;
        } else {
          readoutLabel.removeAttribute('data-i18n');
          readoutLabel.textContent = colorName;
        }
      }
    });
  });

  // Selector de Ritmo (Continuo, Pulso, Rave)
  rhythmBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      rhythmBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-light-mode') || 'steady';
      if (lightStage) {
        lightStage.setAttribute('data-active-mode', mode);
      }
    });
  });

  // Selector de Modelos de Candybong (V1, Z, Infinity)
  modelTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target-model');
      if (!targetId) return;

      modelTabs.forEach((t) => {
        const isActive = t === tab;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      modelCards.forEach((card) => {
        const isMatch = card.getAttribute('data-model-id') === targetId;
        card.classList.toggle('active', isMatch);
      });

      if (lightStage) {
        lightStage.setAttribute('data-model-shape', targetId);
      }
    });
  });

  // ==========================================
  // 3. PHOTOCARDS 3D & REFLEJO HOLOGRÁFICO
  // ==========================================
  const rarityChips = container.querySelectorAll<HTMLButtonElement>('[data-rarity-filter]');
  const cardWrappers = container.querySelectorAll<HTMLElement>('.grail-card-wrapper');

  // Filtro por Rareza
  rarityChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      rarityChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-rarity-filter') || 'all';

      cardWrappers.forEach((wrapper) => {
        const cardRarity = wrapper.getAttribute('data-rarity');
        if (filter === 'all' || cardRarity === filter) {
          wrapper.style.display = '';
        } else {
          wrapper.style.display = 'none';
        }
      });
    });
  });

  // Inclinación 3D Interactiva y Reflejo Foil Holográfico
  cardWrappers.forEach((wrapper) => {
    const card3d = wrapper.querySelector<HTMLElement>('.grail-card-3d');
    const flipBtn = wrapper.querySelector<HTMLButtonElement>('.btn-flip-card');
    const backBtn = wrapper.querySelector<HTMLButtonElement>('.btn-flip-back');

    if (flipBtn) {
      flipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.classList.toggle('flipped');
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.classList.remove('flipped');
      });
    }

    // Permitir seleccionar/focalizar la photocard con click para admirar el brillo
    wrapper.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.btn-flip-card, .btn-flip-back')) return;
      
      const isAlreadySelected = wrapper.classList.contains('selected-card');
      cardWrappers.forEach((w) => w.classList.remove('selected-card'));
      if (!isAlreadySelected) {
        wrapper.classList.add('selected-card');
      }
    });

    if (!card3d) return;

    // Solo activar cálculo de perspectiva si no está reducida la moción
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    wrapper.addEventListener('mousemove', (e) => {
      if (wrapper.classList.contains('flipped')) return;

      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12; // Inclinación vertical
      const rotateY = ((x - centerX) / centerX) * 12;  // Inclinación horizontal

      const percentX = Math.round((x / rect.width) * 100);
      const percentY = Math.round((y / rect.height) * 100);

      card3d.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      wrapper.style.setProperty('--holo-x', `${percentX}%`);
      wrapper.style.setProperty('--holo-y', `${percentY}%`);
    });

    wrapper.addEventListener('mouseleave', () => {
      if (wrapper.classList.contains('flipped')) return;
      card3d.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      if (!wrapper.classList.contains('selected-card')) {
        wrapper.style.setProperty('--holo-x', '50%');
        wrapper.style.setProperty('--holo-y', '50%');
      }
    });
  });
}
