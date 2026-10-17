/**
 * Filtro interactivo de colecciones de personajes (LOVELYS vs TDOONGZ)
 */
export function initCharactersFilter(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('.char-universe-tab');
  const container = document.querySelector<HTMLElement>('.character-intros');
  const lovelysPanel = document.querySelector<HTMLElement>('.lovelys-panel');
  const tdoongzPanel = document.querySelector<HTMLElement>('.tdoongz-panel');

  if (!tabs.length || !container || !lovelysPanel || !tdoongzPanel) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const universe = tab.getAttribute('data-universe') || 'all';

      if (universe === 'all') {
        container.classList.remove('single-universe');
        lovelysPanel.style.display = '';
        tdoongzPanel.style.display = '';
      } else if (universe === 'lovelys') {
        container.classList.add('single-universe');
        lovelysPanel.style.display = '';
        tdoongzPanel.style.display = 'none';
      } else if (universe === 'tdoongz') {
        container.classList.add('single-universe');
        lovelysPanel.style.display = 'none';
        tdoongzPanel.style.display = '';
      }
    });
  });
}
