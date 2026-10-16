/**
 * Normaliza un texto para búsquedas insensibles a mayúsculas, minúsculas,
 * tildes y diacríticos.
 */
export function normalizar(texto: string): string {
  if (!texto) return '';
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}
