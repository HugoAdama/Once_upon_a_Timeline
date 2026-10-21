/**
 * Candybong Lightstick Sync — Sincronización oficial de colores de TWICE en concierto
 * Soporta rotación automática en concierto (cada 30s) o bloqueo interactivo por "Bias Seleccionada".
 * Persiste la elección del usuario en localStorage y dispara celebraciones visuales fluidas.
 */

import { t } from './i18n';

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
let toastTimeout: number | null = null;

export function normalizeMemberId(id: string): string {
  return id.replace(/^member-/, '').toLowerCase().trim();
}

export function getActiveBias(): string | null {
  return activeBiasId;
}

function showBiasToast(member: CandybongMember, isDeselect = false): void {
  let toast = document.getElementById('bias-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'bias-toast';
    toast.className = 'bias-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  if (isDeselect) {
    toast.innerHTML = `
      <span class="bias-toast-dot" style="background-color: var(--magenta); box-shadow: 0 0 12px rgba(232, 62, 134, 0.5);"></span>
      <div class="bias-toast-content">
        <strong>Modo Concierto Reanudado</strong>
        <small>El Candybong rota automáticamente entre las 9 integrantes</small>
      </div>
    `;
  } else {
    toast.innerHTML = `
      <span class="bias-toast-dot" style="background-color: ${member.hex}; box-shadow: 0 0 14px ${member.glow};"></span>
      <div class="bias-toast-content">
        <strong>${member.name} es tu Bias</strong>
        <small>Candybong sincronizado a su color oficial (${member.colorName})</small>
      </div>
      <span class="bias-toast-star" aria-hidden="true">★</span>
    `;
  }

  // Activar animación fluida
  toast.classList.remove('is-active');
  void toast.offsetWidth; // Force reflow
  toast.classList.add('is-active');

  toastTimeout = window.setTimeout(() => {
    toast?.classList.remove('is-active');
  }, 3400);
}

function triggerBiasCelebration(memberId: string): void {
  const norm = normalizeMemberId(memberId);
  const card = document.getElementById(`member-${norm}`) || document.querySelector<HTMLElement>(`[data-member-id*="${norm}"]`);
  if (card) {
    card.classList.remove('bias-burst-active');
    void card.offsetWidth;
    card.classList.add('bias-burst-active');
    setTimeout(() => {
      card.classList.remove('bias-burst-active');
    }, 1800);
  }
}

function updateBiasUI(): void {
  const allCards = document.querySelectorAll<HTMLElement>('.member-card');
  const allBiasBtns = document.querySelectorAll<HTMLButtonElement>('[data-set-bias]');

  const currentBiasNorm = activeBiasId ? normalizeMemberId(activeBiasId) : null;

  allCards.forEach((card) => {
    const cardId = card.dataset.memberId || card.id;
    const cardNorm = normalizeMemberId(cardId);
    const isSelected = Boolean(currentBiasNorm && currentBiasNorm === cardNorm);
    card.classList.toggle('is-active-bias', isSelected);
  });

  allBiasBtns.forEach((btn) => {
    const btnMemberId = btn.dataset.setBias || '';
    const btnNorm = normalizeMemberId(btnMemberId);
    const isSelected = Boolean(currentBiasNorm && currentBiasNorm === btnNorm);
    btn.classList.toggle('active', isSelected);
    btn.setAttribute('aria-pressed', String(isSelected));
    const label = btn.querySelector('.bias-btn-label');
    if (label) {
      label.textContent = isSelected ? (t('members.myBiasActive') || 'Mi Bias ★') : (t('members.myBias') || 'Mi Bias');
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
      ? `Bias activa: ${member.name} (${member.colorName}) · Clic para desbloquear y reanudar rotación`
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
    const norm = normalizeMemberId(activeBiasId);
    const biasIndex = CANDYBONG_MEMBERS.findIndex((m) => m.id === norm);
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
  const norm = normalizeMemberId(memberId);
  const index = CANDYBONG_MEMBERS.findIndex((m) => m.id === norm);
  if (index === -1) return;

  stopCandybongRotation();
  activeBiasId = norm;
  try {
    localStorage.setItem(BIAS_STORAGE_KEY, norm);
  } catch (_) {
    // LocalStorage fallback
  }

  applyCandybongColor(index, true);
  updateBiasUI();
  triggerBiasCelebration(norm);
  showBiasToast(CANDYBONG_MEMBERS[index], false);
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
  showBiasToast(CANDYBONG_MEMBERS[currentIndex], true);
}

export function initCandybongSync(): void {
  // 1. Cargar preferencia guardada
  try {
    const savedBias = localStorage.getItem(BIAS_STORAGE_KEY);
    if (savedBias) {
      const normSaved = normalizeMemberId(savedBias);
      if (CANDYBONG_MEMBERS.some((m) => m.id === normSaved)) {
        activeBiasId = normSaved;
      }
    }
  } catch (_) {
    // Ignorar si storage restringido
  }

  // 2. Interacción con el Badge del Header
  const syncBadge = document.getElementById('candybong-sync-badge');
  if (syncBadge) {
    syncBadge.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeBiasId) {
        clearBias();
      } else {
        applyCandybongColor(currentIndex + 1, false);
        startCandybongRotation();
      }
    });
  }

  // 3. Interacción robusta con botones "Mi Bias"
  // Prevenir que el summary del <details> se active
  const handleBiasClick = (e: Event) => {
    const target = e.target as HTMLElement | null;
    const biasBtn = target?.closest<HTMLButtonElement>('[data-set-bias]');
    if (biasBtn) {
      e.preventDefault();
      e.stopPropagation();
      const rawId = biasBtn.dataset.setBias;
      if (!rawId) return;

      const norm = normalizeMemberId(rawId);
      if (activeBiasId === norm) {
        clearBias();
      } else {
        setBias(norm);
      }
    }
  };

  document.addEventListener('click', handleBiasClick, true);
  document.addEventListener('pointerdown', (e) => {
    const target = e.target as HTMLElement | null;
    if (target?.closest('[data-set-bias]')) {
      e.stopPropagation();
    }
  }, true);

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

  // 6. Actualizar textos de UI al cambiar el idioma
  window.addEventListener('once:lang-changed', () => {
    updateBiasUI();
  });
}
