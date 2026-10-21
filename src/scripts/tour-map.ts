import { t } from './i18n';

export { initTourOdyssey } from './tour-odyssey';

export function initTourMap(): void {
  const mapCard = document.getElementById('tour-route-map');
  const tooltip = document.getElementById('map-venue-tooltip');
  const ttVenue = document.getElementById('tt-venue-name');
  const ttCity = document.getElementById('tt-venue-city');
  const ttHighlight = document.getElementById('tt-venue-highlight');
  const beacons = document.querySelectorAll<SVGGElement>('.map-beacon');

  if (!mapCard || !tooltip) return;

  beacons.forEach((beacon) => {
    const beaconId = beacon.getAttribute('data-beacon-id') || '';
    const venue = beacon.getAttribute('data-venue') || '';
    const rawCity = beacon.getAttribute('data-city') || '';
    const rawHighlight = beacon.getAttribute('data-highlight') || '';

    const showTooltip = (e: MouseEvent | FocusEvent) => {
      const city = beaconId ? (t(`map.beacon.${beaconId}.city`) || rawCity) : rawCity;
      const highlight = beaconId ? (t(`map.beacon.${beaconId}.highlight`) || rawHighlight) : rawHighlight;

      if (ttVenue) ttVenue.textContent = venue;
      if (ttCity) ttCity.textContent = city;
      if (ttHighlight) ttHighlight.textContent = highlight;

      const rect = mapCard.getBoundingClientRect();
      const clientX = 'clientX' in e ? e.clientX : 0;
      const clientY = 'clientY' in e ? e.clientY : 0;

      const posX = clientX - rect.left;
      const posY = clientY - rect.top;

      tooltip.style.left = `${posX}px`;
      tooltip.style.top = `${posY - 12}px`;
      tooltip.classList.add('is-visible');
    };

    const hideTooltip = () => {
      tooltip.classList.remove('is-visible');
    };

    beacon.addEventListener('mouseenter', showTooltip);
    beacon.addEventListener('mousemove', showTooltip);
    beacon.addEventListener('mouseleave', hideTooltip);

    beacon.addEventListener('focus', showTooltip);
    beacon.addEventListener('blur', hideTooltip);
  });
}
