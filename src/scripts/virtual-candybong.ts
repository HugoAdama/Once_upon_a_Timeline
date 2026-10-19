import { setBias, clearBias, getActiveBias } from './candybong-sync';

/**
 * Controlador de Virtual Candybong Z:
 * Modos de luz, sincronización con Jukebox y efectos de vitoreo (Cheer).
 */
export function initVirtualCandybong(): void {
  const launcherBtn = document.getElementById('candybong-launcher-btn');
  const panel = document.getElementById('candybong-panel');
  const closeBtn = document.getElementById('candybong-close-btn');
  const model = document.getElementById('candybong-model');
  const cheerBtn = document.getElementById('candybong-cheer-btn');
  const shockwave = document.getElementById('cheer-shockwave');
  const modeChips = document.querySelectorAll<HTMLButtonElement>('[data-light-mode]');
  const biasButtons = document.querySelectorAll<HTMLButtonElement>('[data-cb-member]');

  if (!launcherBtn || !panel) return;

  let partyInterval: number | null = null;

  // 1. Abrir / Cerrar Panel
  const togglePanel = (open?: boolean) => {
    const isOpen = open !== undefined ? open : !panel.classList.contains('is-open');
    panel.classList.toggle('is-open', isOpen);
    launcherBtn.setAttribute('aria-expanded', String(isOpen));
  };

  launcherBtn.addEventListener('click', () => togglePanel());
  closeBtn?.addEventListener('click', () => togglePanel(false));

  // Cerrar al hacer clic fuera
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (
      panel.classList.contains('is-open') &&
      !panel.contains(target) &&
      !launcherBtn.contains(target)
    ) {
      togglePanel(false);
    }
  });

  // 2. Vitorear / Cheer Animation
  const triggerCheer = () => {
    if (!model) return;
    model.classList.remove('cheering');
    void model.offsetWidth;
    model.classList.add('cheering');

    if (shockwave) {
      shockwave.classList.remove('active');
      void shockwave.offsetWidth;
      shockwave.classList.add('active');
    }

    // Vibración háptica ligera si el navegador lo soporta
    if ('vibrate' in navigator) {
      navigator.vibrate([40, 30, 60]);
    }
  };

  cheerBtn?.addEventListener('click', triggerCheer);
  model?.addEventListener('click', triggerCheer);

  // 3. Modos de Luz
  modeChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const mode = (chip.getAttribute('data-light-mode') || 'sync') as 'sync' | 'party' | 'rainbow';
      activeMode = mode;

      modeChips.forEach((c) => {
        const isActive = c === chip;
        c.classList.toggle('active', isActive);
        c.setAttribute('aria-checked', String(isActive));
      });

      if (model) {
        model.classList.toggle('mode-rainbow', mode === 'rainbow');
      }

      if (partyInterval) {
        clearInterval(partyInterval);
        partyInterval = null;
      }

      if (mode === 'party') {
        // Pulso rítmico automático simulando beat
        partyInterval = window.setInterval(() => {
          if (model) {
            model.classList.remove('beat-pulse');
            void model.offsetWidth;
            model.classList.add('beat-pulse');
          }
        }, 550);
      }
    });
  });

  // 4. Sincronización de Bias
  const updateActiveBiasUI = () => {
    const currentBias = getActiveBias();
    biasButtons.forEach((btn) => {
      const id = btn.getAttribute('data-cb-member');
      const isSelected = id === currentBias;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-pressed', String(isSelected));
    });
  };

  biasButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const memberId = btn.getAttribute('data-cb-member');
      if (!memberId) return;

      if (getActiveBias() === memberId) {
        clearBias();
      } else {
        setBias(memberId);
      }
      updateActiveBiasUI();
    });
  });

  // Actualizar al inicio y al cambiar bias
  window.addEventListener('candybong-color-changed', updateActiveBiasUI);
  updateActiveBiasUI();
}

let activeMode: 'sync' | 'party' | 'rainbow' = 'sync';
export function getActiveCandybongMode(): 'sync' | 'party' | 'rainbow' {
  return activeMode;
}
