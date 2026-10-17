/**
 * Candybong Lightstick Sync — Sincronización oficial de colores de TWICE en concierto
 * Soporta rotación automática en concierto (cada 30s) o bloqueo interactivo por "Bias Seleccionada".
 * Persiste la elección del usuario en localStorage.
 */

export interface CandybongMember {
  id: string;
  name: string;
  colorName: string;
  hex: string;
  glow: string;
}

export const CANDYBONG_MEMBERS: CandybongMember[] = [
  { id: 'nayeon', name: 'Nayeon', colorName: 'Sky Blue', hex: '#5bc2e7', glow: 'rgba(91, 194, 231, 0.5)' },
  { id: 'jeongyeon', name: 'Jeongyeon', colorName: 'Melon Green', hex: '#c8d879', glow: 'rgba(200, 216, 121, 0.5)' },
  { id: 'momo', name: 'Momo', colorName: 'Pink', hex: '#ff7399', glow: 'rgba(255, 115, 153, 0.5)' },
  { id: 'sana', name: 'Sana', colorName: 'Purple', hex: '#9f6bb5', glow: 'rgba(159, 107, 181, 0.5)' },
  { id: 'jihyo', name: 'Jihyo', colorName: 'Apricot', hex: '#f4a27e', glow: 'rgba(244, 162, 126, 0.5)' },
  { id: 'mina', name: 'Mina', colorName: 'Mint', hex: '#50b5a1', glow: 'rgba(80, 181, 161, 0.5)' },
  { id: 'dahyun', name: 'Dahyun', colorName: 'Pure White', hex: '#ffffff', glow: 'rgba(255, 255, 255, 0.65)' },
  { id: 'chaeyoung', name: 'Chaeyoung', colorName: 'Strawberry Red', hex: '#ee2737', glow: 'rgba(238, 39, 55, 0.5)' },
  { id: 'tzuyu', name: 'Tzuyu', colorName: 'Navy Blue', hex: '#2654b0', glow: 'rgba(38, 84, 176, 0.5)' },
];

const BIAS_STORAGE_KEY = 'once-candybong-bias';
let currentIndex = 0;
let syncTimer: number | null = null;
let countdownTimer: number | null = null;
let secondsRemaining = 30;
let activeBiasId: string | null = null;

export function getActiveBias(): string | null {
  return activeBiasId;
}

function updateBiasUI(): void {
  const allCards = document.querySelectorAll<HTMLElement>('.member-card');
  const allBiasBtns = document.querySelectorAll<HTMLButtonElement>('[data-set-bias]');

  allCards.forEach((card) => {
    const cardId = card.dataset.memberId || card.id;
    const isSelected = activeBiasId === cardId;
    card.classList.toggle('is-active-bias', isSelected);
  });

  allBiasBtns.forEach((btn) => {
    const btnMemberId = btn.dataset.setBias;
    const isSelected = activeBiasId === btnMemberId;
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-pressed', String(isSelected));
    const label = btn.querySelector('.bias-btn-label');
    if (label) {
      label.textContent = isSelected ? 'Mi Bias ★' : 'Mi Bias';
    }
  });

  const syncBadge = document.getElementById('candybong-sync-badge');
  if (syncBadge) {
    syncBadge.classList.toggle('is-bias-locked', Boolean(activeBiasId));
  }
}

export function applyCandybongColor(index: number, isBias = false): void {
  currentIndex = (index + CANDYBONG_MEMBERS.length) % CANDYBONG_MEMBERS.length;
  const member = CANDYBONG_MEMBERS[currentIndex];
  secondsRemaining = 30;

  // Aplicar variables CSS en el documento
  document.documentElement.style.setProperty('--candybong-active-color', member.hex);
  document.documentElement.style.setProperty('--candybong-glow', member.glow);

  // Actualizar indicador en el Header
  const badge = document.getElementById('candybong-sync-badge');
  const dot = document.getElementById('candybong-color-dot');
  const nameEl = document.getElementById('candybong-member-name');
  const ringProgress = document.getElementById('candybong-ring-progress');

  if (dot) {
    dot.style.backgroundColor = member.hex;
    dot.style.boxShadow = `0 0 10px ${member.hex}, 0 0 20px ${member.glow}`;
  }

  if (nameEl) {
    nameEl.textContent = isBias ? `Bias: ${member.name}` : `${member.name} (${member.colorName})`;
  }

  if (badge) {
    badge.title = isBias
      ? `Bias activa: ${member.name} (${member.colorName}) · Clic para desbloquear y rotar`
      : `Color actual: ${member.name} · ${member.colorName} (Cambio cada 30s · Clic para avanzar)`;
  }

  if (ringProgress) {
    ringProgress.style.strokeDashoffset = '0';
  }

  // Notificar a otros componentes (ej. Jukebox)
  window.dispatchEvent(new CustomEvent('candybong-color-changed', { detail: { ...member, isBias } }));
}

function tickCountdown(): void {
  if (activeBiasId) return; // Si hay bias fijada, no hay cuenta regresiva

  secondsRemaining--;
  if (secondsRemaining < 0) {
    secondsRemaining = 30;
  }

  const ringProgress = document.getElementById('candybong-ring-progress');
  if (ringProgress) {
    const totalCircumference = 44;
    const progress = (30 - secondsRemaining) / 30;
    const offset = totalCircumference * progress;
    ringProgress.style.strokeDashoffset = String(offset);
  }
}

export function startCandybongRotation(): void {
  if (activeBiasId) {
    // Si hay una bias activa guardada, no rotamos automáticamente
    const biasIndex = CANDYBONG_MEMBERS.findIndex((m) => m.id === activeBiasId);
    if (biasIndex !== -1) {
      applyCandybongColor(biasIndex, true);
    }
    return;
  }

  stopCandybongRotation();
  applyCandybongColor(currentIndex, false);

  syncTimer = window.setInterval(() => {
    applyCandybongColor(currentIndex + 1, false);
  }, 30000);

  countdownTimer = window.setInterval(() => {
    tickCountdown();
  }, 1000);
}

export function stopCandybongRotation(): void {
  if (syncTimer) {
    clearInterval(syncTimer);
    syncTimer = null;
  }
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
}

export function setBias(memberId: string): void {
  const index = CANDYBONG_MEMBERS.findIndex((m) => m.id === memberId);
  if (index === -1) return;

  stopCandybongRotation();
  activeBiasId = memberId;
  try {
    localStorage.setItem(BIAS_STORAGE_KEY, memberId);
  } catch (_) {
    // LocalStorage fallback
  }

  applyCandybongColor(index, true);
  updateBiasUI();
}

export function clearBias(): void {
  activeBiasId = null;
  try {
    localStorage.removeItem(BIAS_STORAGE_KEY);
  } catch (_) {
    // LocalStorage fallback
  }

  updateBiasUI();
  startCandybongRotation();
}

export function initCandybongSync(): void {
  // 1. Cargar preferencia guardada
  try {
    const savedBias = localStorage.getItem(BIAS_STORAGE_KEY);
    if (savedBias && CANDYBONG_MEMBERS.some((m) => m.id === savedBias)) {
      activeBiasId = savedBias;
    }
  } catch (_) {
    // Ignorar si cookies/storage restringidos
  }

  // 2. Interacción con el Badge del Header
  const syncBadge = document.getElementById('candybong-sync-badge');
  if (syncBadge) {
    syncBadge.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeBiasId) {
        // Si estaba fijado a una bias, hacer clic lo desbloquea para volver al modo aleatorio de concierto
        clearBias();
      } else {
        applyCandybongColor(currentIndex + 1, false);
        startCandybongRotation();
      }
    });
  }

  // 3. Interacción con los botones de "Mi Bias" en las tarjetas de miembros
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const biasBtn = target?.closest<HTMLButtonElement>('[data-set-bias]');
    if (biasBtn) {
      e.preventDefault();
      e.stopPropagation();
      const memberId = biasBtn.dataset.setBias;
      if (!memberId) return;

      if (activeBiasId === memberId) {
        // Alternar: si ya era bias, desmarcarla
        clearBias();
      } else {
        setBias(memberId);
      }
    }
  });

  // 4. Iniciar rotación o fijar color de bias
  startCandybongRotation();
  updateBiasUI();

  // 5. Observar cambios de tema (Dark/Concert mode)
  const observer = new MutationObserver(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      startCandybongRotation();
    } else if (!activeBiasId) {
      stopCandybongRotation();
    }
  });

  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}
