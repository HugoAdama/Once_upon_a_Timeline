import type { FanAchievement, Release } from '../types';

export const FAN_ACHIEVEMENTS: FanAchievement[] = [
  {
    id: 'ach-first-album',
    title: 'Primer Paso ONCE',
    description: 'Añade tu primer álbum físico (CD o Vinilo) a tu estante personal.',
    category: 'milestone',
    categoryLabel: 'Iniciación',
    iconType: 'disc',
    requiredCount: 1,
  },
  {
    id: 'ach-bronze-shelf',
    title: 'Estante de Bronce',
    description: 'Colecciona al menos 5 álbumes físicos oficiales de TWICE.',
    category: 'milestone',
    categoryLabel: 'Hito',
    iconType: 'star',
    requiredCount: 5,
  },
  {
    id: 'ach-silver-shelf',
    title: 'Estante de Plata',
    description: 'Alcanza 15 álbumes físicos en tu colección privada.',
    category: 'milestone',
    categoryLabel: 'Hito',
    iconType: 'trophy',
    requiredCount: 15,
  },
  {
    id: 'ach-gold-shelf',
    title: 'Estante de Oro',
    description: 'Alcanza 30 álbumes físicos en tu santuario de TWICE.',
    category: 'milestone',
    categoryLabel: 'Hito Élite',
    iconType: 'crown',
    requiredCount: 30,
  },
  {
    id: 'ach-grandmaster',
    title: 'Gran Maestro ONCE',
    description: 'Colecciona 50 o más álbumes físicos. Eres un pilar legendario del fandom.',
    category: 'legendary',
    categoryLabel: 'Leyenda',
    iconType: 'crown',
    requiredCount: 50,
  },
  {
    id: 'ach-debut-nostalgia',
    title: 'Nostalgia del Debut (2015-2016)',
    description: 'Posee en formato físico "The Story Begins" y "PAGE TWO".',
    category: 'era',
    categoryLabel: 'Era Clásica',
    iconType: 'sparkle',
  },
  {
    id: 'ach-daesang-trilogy',
    title: 'Trilogía de Daesangs (SOTY)',
    description: 'Posee los álbumes de los 3 Daesangs consecutivos: PAGE TWO, SIGNAL y What is Love?.',
    category: 'legendary',
    categoryLabel: 'Mítico',
    iconType: 'trophy',
  },
  {
    id: 'ach-fancy-feel-special',
    title: 'Revolución FANCY (2019)',
    description: 'Posee en físico "FANCY YOU" y "Feel Special", la era de oro y madurez.',
    category: 'era',
    categoryLabel: 'Era Dorada',
    iconType: 'sparkle',
  },
  {
    id: 'ach-japan-dome',
    title: 'Conquistador de Japón',
    description: 'Colecciona al menos 3 álbumes japoneses físicos (BDZ, &TWICE, Perfect World, Celebrate, DIVE, etc.).',
    category: 'market',
    categoryLabel: 'Japón',
    iconType: 'flag',
    requiredCount: 3,
  },
  {
    id: 'ach-global-expansion',
    title: 'Frontera Global',
    description: 'Posee al menos 1 lanzamiento internacional en formato físico (Ready to Be, With YOU-th, STRATEGY, etc.).',
    category: 'market',
    categoryLabel: 'Global',
    iconType: 'flag',
    requiredCount: 1,
  },
  {
    id: 'ach-special-repackage',
    title: 'Tesoros Especiales',
    description: 'Posee al menos 1 álbum en versión Repackage o Especial (Merry & Happy, Summer Nights, Year of YES, etc.).',
    category: 'era',
    categoryLabel: 'Especial',
    iconType: 'star',
    requiredCount: 1,
  },
  {
    id: 'ach-time-traveler',
    title: 'Viajero del Tiempo ONCE',
    description: 'Posee álbumes físicos pertenecientes a al menos 5 años diferentes de la historia de TWICE.',
    category: 'milestone',
    categoryLabel: 'Cronología',
    iconType: 'disc',
    requiredCount: 5,
  },
];

export function isAchievementUnlocked(
  achievementId: string,
  ownedIds: Set<string>,
  allReleases: Release[]
): boolean {
  if (ownedIds.size === 0) return false;

  const ownedReleases = allReleases.filter((r) => ownedIds.has(r.id));
  const count = ownedReleases.length;

  switch (achievementId) {
    case 'ach-first-album':
      return count >= 1;
    case 'ach-bronze-shelf':
      return count >= 5;
    case 'ach-silver-shelf':
      return count >= 15;
    case 'ach-gold-shelf':
      return count >= 30;
    case 'ach-grandmaster':
      return count >= 50;

    case 'ach-debut-nostalgia': {
      const hasDebut = ownedReleases.some((r) => r.title.toLowerCase().includes('the story begins'));
      const hasPageTwo = ownedReleases.some((r) => r.title.toLowerCase().includes('page two'));
      return hasDebut && hasPageTwo;
    }

    case 'ach-daesang-trilogy': {
      const hasCheerUp = ownedReleases.some((r) => r.title.toLowerCase().includes('page two'));
      const hasSignal = ownedReleases.some((r) => r.title.toLowerCase().includes('signal'));
      const hasWhatIsLove = ownedReleases.some((r) => r.title.toLowerCase().includes('what is love'));
      return hasCheerUp && hasSignal && hasWhatIsLove;
    }

    case 'ach-fancy-feel-special': {
      const hasFancy = ownedReleases.some((r) => r.title.toLowerCase().includes('fancy you'));
      const hasFeelSpecial = ownedReleases.some((r) => r.title.toLowerCase().includes('feel special'));
      return hasFancy && hasFeelSpecial;
    }

    case 'ach-japan-dome': {
      const japanCount = ownedReleases.filter((r) => r.market === 'japan').length;
      return japanCount >= 3;
    }

    case 'ach-global-expansion': {
      const globalCount = ownedReleases.filter(
        (r) =>
          r.market === 'global' ||
          r.title.toLowerCase().includes('ready to be') ||
          r.title.toLowerCase().includes('with you-th') ||
          r.title.toLowerCase().includes('strategy')
      ).length;
      return globalCount >= 1;
    }

    case 'ach-special-repackage': {
      const specialCount = ownedReleases.filter(
        (r) =>
          r.format === 'repackage' ||
          r.format === 'special' ||
          r.title.toLowerCase().includes('merry & happy') ||
          r.title.toLowerCase().includes('summer nights') ||
          r.title.toLowerCase().includes('year of yes')
      ).length;
      return specialCount >= 1;
    }

    case 'ach-time-traveler': {
      const distinctYears = new Set(ownedReleases.map((r) => r.year));
      return distinctYears.size >= 5;
    }

    default:
      return false;
  }
}
