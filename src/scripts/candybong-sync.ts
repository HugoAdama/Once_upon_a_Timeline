/**
 * Candybong Lightstick Sync — Sincronización oficial de colores de TWICE en concierto
 * Cambia dinámicamente cada 30 segundos entre los 9 colores oficiales de las integrantes
 * emulando el funcionamiento inalámbrico por Bluetooth/DMX del Candybong en los conciertos.
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

let currentIndex = 0;
let syncTimer: number | null = null;
let countdownTimer: number | null = null;
let secondsRemaining = 30;

export function applyCandybongColor(index: number): void {
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
    nameEl.textContent = `${member.name} (${member.colorName})`;
  }

  if (badge) {
    badge.title = `Color actual: ${member.name} · ${member.colorName} (Cambio cada 30s · Clic para avanzar)`;
  }

  if (ringProgress) {
    ringProgress.style.strokeDashoffset = '0';
  }

  // Notificar a otros componentes (ej. Jukebox)
  window.dispatchEvent(new CustomEvent('candybong-color-changed', { detail: member }));
}

function tickCountdown(): void {
  secondsRemaining--;
  if (secondsRemaining < 0) {
    secondsRemaining = 30;
  }

  const ringProgress = document.getElementById('candybong-ring-progress');
  if (ringProgress) {
    // Circunferencia r=7 => ~44
    const totalCircumference = 44;
    const progress = (30 - secondsRemaining) / 30;
    const offset = totalCircumference * progress;
    ringProgress.style.strokeDashoffset = String(offset);
  }
}

export function startCandybongRotation(): void {
  stopCandybongRotation();
  applyCandybongColor(currentIndex);

  // Intervalo de 30 segundos
  syncTimer = window.setInterval(() => {
    applyCandybongColor(currentIndex + 1);
  }, 30000);

  // Actualización de progreso visual cada segundo
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

export function initCandybongSync(): void {
  const syncBadge = document.getElementById('candybong-sync-badge');

  if (syncBadge) {
    syncBadge.addEventListener('click', (e) => {
      e.stopPropagation();
      applyCandybongColor(currentIndex + 1);
      startCandybongRotation();
    });
  }

  // Iniciar rotación si ya está en modo oscuro
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    startCandybongRotation();
  }

  // Escuchar cambios de tema
  const observer = new MutationObserver(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      startCandybongRotation();
    } else {
      stopCandybongRotation();
    }
  });

  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}
