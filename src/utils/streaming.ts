/**
 * Genera enlaces dinámicos de búsqueda para canciones en YouTube Music y Spotify.
 */
export function getStreamingLinks(trackTitle: string, releaseTitle: string, artist = 'TWICE') {
  const query = `${artist} ${trackTitle} ${releaseTitle}`.trim();
  const encoded = encodeURIComponent(query);

  return {
    youtubeMusic: `https://music.youtube.com/search?q=${encoded}`,
    spotify: `https://open.spotify.com/search/${encoded}`,
    query,
  };
}

/**
 * Resuelve rutas de assets estáticos asegurando compatibilidad con base_url en GitHub Pages.
 */
export function resolveAsset(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
