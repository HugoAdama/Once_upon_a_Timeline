import { FAN_ACHIEVEMENTS, isAchievementUnlocked } from '../data/fan-achievements';
import { RELEASES } from '../data/releases';
import { resolveAsset } from '../utils/streaming';
import { t } from './i18n';

const STORAGE_KEY = 'once_physical_collection';
const UNLOCKED_ACHIEVEMENTS_KEY = 'once_unlocked_achievements';

export function getPhysicalOwnedIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function savePhysicalOwnedIds(ids: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids)));
  } catch (err) {
    console.error('Error saving physical collection:', err);
  }
}

function getAlreadyAwardedAchievements(): Set<string> {
  try {
    const raw = localStorage.getItem(UNLOCKED_ACHIEVEMENTS_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveAwardedAchievements(achIds: Set<string>): void {
  try {
    localStorage.setItem(UNLOCKED_ACHIEVEMENTS_KEY, JSON.stringify(Array.from(achIds)));
  } catch (err) {
    console.error('Error saving awarded achievements:', err);
  }
}

export function togglePhysicalRelease(releaseId: string): boolean {
  const owned = getPhysicalOwnedIds();
  const willOwn = !owned.has(releaseId);

  if (willOwn) {
    owned.add(releaseId);
  } else {
    owned.delete(releaseId);
  }
  savePhysicalOwnedIds(owned);

  // Verificar nuevos logros desbloqueados
  if (willOwn) {
    checkAndNotifyAchievements(owned);
  }

  // Notificar al sistema
  window.dispatchEvent(
    new CustomEvent('once:physical-collection-updated', {
      detail: { releaseId, isOwned: willOwn, totalCount: owned.size },
    })
  );

  return willOwn;
}

export function showAchievementToast(title: string, desc: string): void {
  // Crear contenedor de toast si no existe
  let toastContainer = document.querySelector<HTMLElement>('#achievement-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'achievement-toast-container';
    toastContainer.className = 'achievement-toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'achievement-toast';
  toast.innerHTML = `
    <div class="toast-badge-glow">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    </div>
    <div class="toast-body">
      <span class="toast-kicker">${t('shelf.toastTitle')}</span>
      <strong class="toast-title">${title}</strong>
      <p class="toast-desc">${desc}</p>
    </div>
  `;

  toastContainer.appendChild(toast);

  // Animación de entrada y auto-eliminación
  requestAnimationFrame(() => toast.classList.add('is-visible'));

  setTimeout(() => {
    toast.classList.remove('is-visible');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

function checkAndNotifyAchievements(owned: Set<string>): void {
  const awarded = getAlreadyAwardedAchievements();
  const newlyUnlocked: string[] = [];

  FAN_ACHIEVEMENTS.forEach((ach) => {
    if (!awarded.has(ach.id)) {
      if (isAchievementUnlocked(ach.id, owned, RELEASES)) {
        awarded.add(ach.id);
        newlyUnlocked.push(ach.id);
        const localizedTitle = t(`ach.${ach.key}.title`) || ach.title;
        const localizedDesc = t(`ach.${ach.key}.desc`) || ach.description;
        showAchievementToast(localizedTitle, localizedDesc);
      }
    }
  });

  if (newlyUnlocked.length > 0) {
    saveAwardedAchievements(awarded);
  }
}

export function updatePhysicalButtonsUI(): void {
  const owned = getPhysicalOwnedIds();
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-physical-release]');

  buttons.forEach((btn) => {
    const id = btn.getAttribute('data-physical-release');
    if (!id) return;

    const isOwned = owned.has(id);
    if (isOwned) {
      btn.classList.add('is-collected');
      btn.setAttribute('aria-pressed', 'true');
      btn.title = t('music.physicalBtnRemove');
    } else {
      btn.classList.remove('is-collected');
      btn.setAttribute('aria-pressed', 'false');
      btn.title = t('music.physicalBtnAdd');
    }
  });
}

export function updatePhysicalShelfTrackerUI(): void {
  const owned = getPhysicalOwnedIds();
  const ownedReleases = RELEASES.filter((r) => owned.has(r.id));
  const totalReleases = RELEASES.length;
  const percentage = Math.round((owned.size / totalReleases) * 100);

  // Métricas
  const countEl = document.querySelector<HTMLElement>('#shelf-owned-count');
  const percentEl = document.querySelector<HTMLElement>('#shelf-owned-percent');
  const barEl = document.querySelector<HTMLElement>('#shelf-progress-fill');

  if (countEl) countEl.textContent = `${owned.size} / ${totalReleases}`;
  if (percentEl) percentEl.textContent = `${percentage}%`;
  if (barEl) barEl.style.width = `${Math.min(100, Math.max(0, percentage))}%`;

  const krEl = document.querySelector<HTMLElement>('#shelf-kr-count');
  const jpEl = document.querySelector<HTMLElement>('#shelf-jp-count');
  const glEl = document.querySelector<HTMLElement>('#shelf-gl-count');

  if (krEl) krEl.textContent = String(ownedReleases.filter((r) => r.market === 'korea').length);
  if (jpEl) jpEl.textContent = String(ownedReleases.filter((r) => r.market === 'japan').length);
  if (glEl) glEl.textContent = String(ownedReleases.filter((r) => r.market === 'global').length);

  // Estante 3D Virtual de carátulas
  const shelfGrid = document.querySelector<HTMLElement>('#physical-shelf-display');
  const emptyState = document.querySelector<HTMLElement>('#physical-shelf-empty');

  if (shelfGrid && emptyState) {
    if (ownedReleases.length === 0) {
      shelfGrid.style.display = 'none';
      emptyState.style.display = 'flex';
    } else {
      shelfGrid.style.display = 'grid';
      emptyState.style.display = 'none';

      shelfGrid.innerHTML = ownedReleases
        .map((r) => {
          const rawCover = r.cover || '/assets/twice-logo.svg';
          const cover = resolveAsset(rawCover) || rawCover;
          const fallback = resolveAsset('/assets/twice-logo.svg') || '/assets/twice-logo.svg';
          return `
            <div class="shelf-album-case" title="${r.title} (${r.year})">
              <div class="case-cover-wrapper">
                <div class="case-jewel-sheen" aria-hidden="true"></div>
                <div class="case-spine" aria-hidden="true"></div>
                <img src="${cover}" alt="${r.title}" class="case-cover-img" loading="lazy" width="84" height="84" onerror="this.onerror=null;this.src='${fallback}';" />
              </div>
              <span class="case-title">${r.title}</span>
            </div>
          `;
        })
        .join('');
    }
  }

  // Muro de Logros
  const achievementsGrid = document.querySelectorAll<HTMLElement>('.achievement-badge-card');
  let unlockedCount = 0;

  achievementsGrid.forEach((card) => {
    const achId = card.getAttribute('data-achievement-id');
    if (!achId) return;

    const achObj = FAN_ACHIEVEMENTS.find((a) => a.id === achId);
    if (achObj) {
      const catEl = card.querySelector<HTMLElement>('.ach-category-tag');
      const titleEl = card.querySelector<HTMLElement>('.ach-title');
      const descEl = card.querySelector<HTMLElement>('.ach-desc');
      if (catEl) catEl.textContent = t(`ach.${achObj.key}.category`) || achObj.categoryLabel;
      if (titleEl) titleEl.textContent = t(`ach.${achObj.key}.title`) || achObj.title;
      if (descEl) descEl.textContent = t(`ach.${achObj.key}.desc`) || achObj.description;
    }

    const isUnlocked = isAchievementUnlocked(achId, owned, RELEASES);
    if (isUnlocked) {
      unlockedCount++;
      card.classList.add('is-unlocked');
      card.classList.remove('is-locked');
      const statusPill = card.querySelector<HTMLElement>('.ach-status-pill');
      if (statusPill) statusPill.textContent = t('shelf.unlocked');
    } else {
      card.classList.remove('is-unlocked');
      card.classList.add('is-locked');
      const statusPill = card.querySelector<HTMLElement>('.ach-status-pill');
      if (statusPill) statusPill.textContent = t('shelf.locked');
    }
  });

  const unlockedCountEl = document.querySelector<HTMLElement>('#shelf-achievements-unlocked');
  if (unlockedCountEl) {
    unlockedCountEl.textContent = `${unlockedCount} / ${FAN_ACHIEVEMENTS.length}`;
  }
}

export function initPhysicalCollection(): void {
  // 1. Delegación de clics en botones de colección física
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const btn = target.closest<HTMLButtonElement>('[data-physical-release]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const releaseId = btn.getAttribute('data-physical-release');
    if (releaseId) {
      togglePhysicalRelease(releaseId);
      updatePhysicalButtonsUI();
      updatePhysicalShelfTrackerUI();
    }
  });

  // 2. Escuchar evento de actualización para sincronizar en vivo
  window.addEventListener('once:physical-collection-updated', () => {
    updatePhysicalButtonsUI();
    updatePhysicalShelfTrackerUI();
  });

  // 3. Escuchar cambio de idioma para actualizar títulos y textos
  window.addEventListener('once:lang-changed', () => {
    updatePhysicalButtonsUI();
    updatePhysicalShelfTrackerUI();
  });

  // 4. Pintar estado inicial
  updatePhysicalButtonsUI();
  updatePhysicalShelfTrackerUI();
}
