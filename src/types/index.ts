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
}
