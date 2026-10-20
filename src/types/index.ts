export type Market = 'korea' | 'japan' | 'global';

export type ReleaseFormat =
  | 'album'
  | 'mini-album'
  | 'single'
  | 'digital-single'
  | 'repackage'
  | 'special'
  | 'compilation'
  | 'remix';

export type ReleaseStatus = 'released' | 'upcoming';

export interface Track {
  title: string;
}

export interface Release {
  id: string; // e.g. "release-the-story-begins-2015-10-20"
  title: string;
  date: string; // YYYY-MM-DD
  year: number;
  market: Market;
  format: ReleaseFormat;
  formatLabel: string; // Human-friendly label e.g. "Mini álbum · debut"
  status: ReleaseStatus;
  cover: string | null;
  tracks: Track[];
  officialSource?: string;
}

export interface MemberEraPhotos {
  classic: string;
  between: string;
  current: string;
}

export interface Member {
  id: string;
  number: string;
  name: string;
  fullName: string;
  hangul: string;
  birthdate: string;
  role: string;
  colorName: string;
  colorHex: string;
  accentClass?: string;
  lovely: {
    name: string;
    description: string;
    symbol: string;
    avatar?: string;
  };
  tdoongz: {
    name: string;
    description: string;
    symbol: string;
    avatar?: string;
  };
  bio: string;
  photo?: string;
  eras?: MemberEraPhotos;
  instagram?: {
    handle: string;
    url: string;
  };
}

export interface CharacterItem {
  id: string;
  name: string;
  member: string;
  type: 'lovely' | 'tdoongz';
  tagline: string;
  symbol: string;
  colorHex: string;
  avatar?: string;
}

export interface TimelineMilestone {
  year: string;
  badge: string;
  title: string;
  description: string;
  releaseId: string;
  date: string;
  highlightTrack?: string;
  category?: 'origins' | 'golden' | 'expansion' | 'anniversary';
}

/* ========================================================
   NUEVAS SECCIONES: MV VAULT, TOURS, HALL OF FAME, FAN ZONE & FASHION
   ======================================================== */
export type MvCategory = 'group-kr' | 'group-jp' | 'group-en' | 'solo-sub';

export interface MusicVideo {
  id: string;
  title: string;
  era: string;
  year: number;
  category: MvCategory;
  categoryLabel: string;
  youtubeId: string;
  director: string;
  palette: string[];
  description: string;
  viewsEstimate: string;
}

export interface TourVenue {
  name: string;
  city: string;
  country: string;
  highlight: string;
}

export interface TourPhoto {
  url: string;
  caption: string;
  location: string;
}

export interface WorldTour {
  id: string;
  name: string;
  years: string;
  tagline: string;
  image: string;
  logo: string;
  gallery: TourPhoto[];
  totalShows: number;
  attendance: string;
  keyVenues: TourVenue[];
  setlistHighlights: string[];
}

export interface HallOfFameItem {
  id: string;
  category: 'music-show' | 'daesang' | 'global-record' | 'stadium';
  categoryLabel: string;
  title: string;
  metric: string;
  image: string;
  description: string;
  year: string;
}

export interface QuizOption {
  text: string;
  trait: string;
  memberId: string;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  options: QuizOption[];
}

export interface FashionLook {
  url: string;
  label: string;
}

export interface FashionConcept {
  id: string;
  title: string;
  era: string;
  year: string;
  style: string;
  description: string;
  image: string;
  gallery?: FashionLook[];
  colorPalette: string[];
  keyPieces: string[];
  conceptMood: string;
}

/* ========================================================
   COLECCIONISMO & FAN ZONE: CANDYBONG & SANTOS GRIALES
   ======================================================== */
export interface CandybongModel {
  id: string;
  version: string;
  name: string;
  releaseYear: string;
  eraName: string;
  conceptTag: string;
  description: string;
  lightingSpecs: {
    technology: string;
    batteryType: string;
    modes: string[];
    connectivity: string;
  };
  stadiumLore: string;
  funFact: string;
  defaultColor: string;
  shapeType: 'lollipop' | 'ring-z' | 'infinity-mirror';
  image?: string;
}

export interface RarePhotocard {
  id: string;
  title: string;
  member: string;
  memberId: string;
  era: string;
  year: string;
  rarity: 'mythic' | 'legendary' | 'rare';
  rarityBadge: string;
  category: 'broadcast' | 'tournament' | 'special-album' | 'world-tour';
  categoryLabel: string;
  collectorLore: string;
  specialFinish: string;
  estimatedRarityUnits: string;
  marketPriceRange: string;
  memberColor: string;
  holographicStyle: 'rainbow' | 'glitter' | 'glass-shards' | 'gold-leaf';
  sampleFrontPhoto: string;
}

export interface FanAchievement {
  id: string;
  key: string;
  title: string;
  description: string;
  category: 'milestone' | 'era' | 'market' | 'legendary';
  categoryLabel: string;
  iconType: 'disc' | 'trophy' | 'crown' | 'sparkle' | 'flag' | 'star';
  requiredCount?: number;
}

export interface PhysicalShelfStats {
  totalOwned: number;
  totalReleases: number;
  percentage: number;
  koreaCount: number;
  japanCount: number;
  globalCount: number;
  achievementsUnlocked: number;
  totalAchievements: number;
}
