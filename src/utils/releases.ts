import type { Release, ReleaseFormat } from '../types';

export interface YearGroup {
  year: number;
  releases: Release[];
}

/**
 * Agrupa una lista de lanzamientos por año en orden descendente.
 */
export function groupReleasesByYear(releases: Release[]): YearGroup[] {
  const years = Array.from(new Set(releases.map((r) => r.year))).sort((a, b) => b - a);
  return years.map((year) => ({
    year,
    releases: releases.filter((r) => r.year === year),
  }));
}

/**
 * Obtiene todos los años únicos presentes en los lanzamientos, ordenados descendentemente.
 */
export function getUniqueYears(releases: Release[]): number[] {
  return Array.from(new Set(releases.map((r) => r.year))).sort((a, b) => b - a);
}

/**
 * Opciones de formatos disponibles para el filtro de discografía.
 */
export const FORMAT_OPTIONS: { value: ReleaseFormat | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos los formatos' },
  { value: 'album', label: 'Álbum de estudio' },
  { value: 'mini-album', label: 'Mini álbum' },
  { value: 'single', label: 'Sencillo' },
  { value: 'digital-single', label: 'Sencillo digital' },
  { value: 'special', label: 'Álbum especial' },
  { value: 'repackage', label: 'Repackage' },
  { value: 'compilation', label: 'Recopilatorio' },
  { value: 'remix', label: 'Remixes' },
];
