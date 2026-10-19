# Gestión de Datos y Assets — Once Upon a Timeline

Este documento detalla las estructuras de datos, interfaces TypeScript, convención de nombres y el manejo de assets estáticos en el proyecto.

---

## 1. Modelos de Datos (TypeScript Interfaces)

Todos los tipos principales residen centralizados en [`src/types/index.ts`](file:///e:/Once_upon_a_Timeline/src/types/index.ts):

### `Member`
```typescript
export interface Member {
  id: string;             // ej: "member-nayeon"
  number: string;         // ej: "01"
  name: string;           // ej: "Nayeon"
  fullName: string;       // ej: "Im Na-yeon"
  hangul: string;         // ej: "임나연"
  birthdate: string;      // ej: "22 de septiembre de 1995"
  role: string;           // ej: "Vocalista principal, bailarina y centro"
  colorName: string;      // ej: "Celeste / Sky Blue"
  colorHex: string;       // ej: "#5bc2e7"
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
  eras?: {
    current: string;      // Fotografía era actual (2023-2025)
    between: string;      // Fotografía era BETWEEN 1&2 (2021-2022)
    classic: string;      // Fotografía era clásica / debut (2015-2018)
  };
}
```

### `CharacterItem`
```typescript
export interface CharacterItem {
  id: string;             // ej: "lovely-navely", "tdoongz-imnabong"
  name: string;           // ej: "Navely", "IMNABONG"
  member: string;         // ej: "Nayeon"
  type: 'lovely' | 'tdoongz';
  tagline: string;        // ej: "Alegre y brillante"
  symbol: string;         // Identificador gráfico distintivo
  colorHex: string;       // Color representativo de la integrante
  avatar?: string;        // Ruta al asset (.webp)
}
```

### `Release`
```typescript
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

export interface Release {
  id: string;             // ej: "release-strategy-2024-12-06"
  title: string;          // ej: "STRATEGY"
  date: string;           // Formato ISO: YYYY-MM-DD
  year: number;           // ej: 2024
  market: Market;
  format: ReleaseFormat;
  formatLabel: string;    // Etiqueta legible: "Mini álbum"
  status: 'released' | 'upcoming';
  cover: string | null;   // Ruta en /assets/covers/ o null
  tracks: { title: string }[];
  officialSource?: string;
}
```

### `MusicVideo` (Cinema MV Vault)
```typescript
export interface MusicVideo {
  id: string;             // ej: "mv-strategy"
  title: string;          // ej: "Strategy (feat. Megan Thee Stallion)"
  era: string;            // ej: "Strategy"
  year: number;           // ej: 2024
  category: 'group-kr' | 'group-jp' | 'group-en' | 'solo-sub';
  categoryLabel: string;  // ej: "Corea · Lead Single"
  youtubeId: string;      // Identificador oficial de YouTube
  director: string;       // ej: "Naive Creative Production"
  palette: string[];      // Colores visuales representativos del MV
  description: string;
  viewsEstimate: string;  // ej: "+65M views"
}
```

### `WorldTour` (World Tour Odyssey)
```typescript
export interface TourPhoto {
  url: string;            // ej: "/assets/tours/ready-to-be-1.webp"
  caption: string;        // ej: "Escenario Central en Estadios"
  location: string;       // ej: "SoFi Stadium / MetLife Stadium"
}

export interface WorldTour {
  id: string;             // ej: "tour-ready-to-be"
  name: string;           // ej: "5TH WORLD TOUR: READY TO BE"
  years: string;          // ej: "2023 — 2024"
  tagline: string;
  image: string;          // Cover principal
  logo: string;           // Logo o emblema oficial de la gira (ej: "/assets/tours/logos/this-is-for-logo.webp")
  gallery: TourPhoto[];   // Galería de 3 fotografías con rotación automática cada 30s
  totalShows: number;     // ej: 51
  attendance: string;     // ej: "+1.500.000 asistentes"
  keyVenues: {
    name: string;
    city: string;
    country: string;
    highlight: string;
  }[];
  setlistHighlights: string[];
}
```

### `HallOfFameItem` (Hall of Fame)
```typescript
export interface HallOfFameItem {
  id: string;
  category: 'music-show' | 'daesang' | 'global-record' | 'stadium';
  categoryLabel: string;
  title: string;
  metric: string;         // ej: "121 Victorias", "3 Años Consecutivos"
  image: string;          // ej: "/assets/records/music-show-wins.webp"
  description: string;
  year: string;
}
```

### `FashionConcept` (Stage Wardrobe Archive)
```typescript
export interface FashionConcept {
  id: string;
  title: string;          // ej: "High-Fashion Pop & Street Avant-Garde"
  era: string;            // ej: "Strategy"
  year: string;           // ej: "2024"
  style: string;
  description: string;
  image: string;          // ej: "/assets/fashion/strategy.webp"
  colorPalette: string[];
  keyPieces: string[];
  conceptMood: string;
}
```

---

## 2. Directorio de Assets Estáticos (`public/assets/`)

Los recursos multimedia se organizan de forma estructurada en formato `.webp` para máxima compresión y fidelidad visual:

- **`public/assets/characters/`**:
  - `navely.webp`, `jeongvely.webp`, `movely.webp`, `savely.webp`, `jively.webp`, `mively.webp`, `davely.webp`, `chaengvely.webp`, `tzuvely.webp`.
  - `imnabong.webp`, `yubbuibbui.webp`, `mokuring.webp`, `shyam-shyam.webp`, `parkzyoni.webp`, `myodette.webp`, `dupnyangee.webp`, `sonchaetty.webp`, `tzukumi.webp`.
- **`public/assets/covers/`**:
  - Portadas oficiales cuadradas de toda la discografía en Corea, Japón y Global.
- **`public/assets/members/`**:
  - Retratos de las integrantes organizados por era: `{nombre}.webp`, `{nombre}-current.webp`, `{nombre}-between.webp`, `{nombre}-classic.webp`.
- **`public/assets/fashion/`**:
  - Fotografías de alta fidelidad y vestuario escénico conceptual: `strategy.webp`, `talk-that-talk.webp`, `i-cant-stop-me.webp`, `feel-special.webp`, `cheer-up.webp`.
- **`public/assets/tours/`**:
  - Fotografía en vivo de conciertos y estadios mundiales: `ready-to-be.webp`, `world-tour-iii.webp`, `twicelights.webp`, `twiceland.webp`.
- **`public/assets/records/`**:
  - Vitrina de presentación visual para hitos y trofeos del Hall of Fame: `music-show-wins.webp`, `daesang-triple.webp`, `sofi-stadium.webp`, `nissan-stadium.webp`, `album-sales.webp`, `billboard-women.webp`, `billboard-200.webp`, `youtube-records.webp`.

### `KillingPart` (`src/data/killing-parts.ts`)
```typescript
export interface KillingPart {
  id: string;          // ej: "kp-shy-shy-shy"
  phrase: string;      // Frase emblemática, ej: "Shy Shy Shy"
  member: string;      // Integrante asociada, ej: "Sana"
  song: string;        // Canción, ej: "CHEER UP"
  releaseTitle: string;// Álbum, ej: "PAGE TWO"
  note: string;        // Hito cultural y contexto
  searchQuery: string; // Término de búsqueda para el explorador
}
```

### Assets de Progressive Web App (PWA)
- **`public/manifest.webmanifest`**: Manifiesto web que declara el nombre del archivo, iconos vectoriales, colores de tema (`#160918`, `#e83e86`) y modo de despliegue `standalone`.
- **`public/sw.js`**: Service Worker de alto rendimiento con estrategia *stale-while-revalidate* para hojas de estilo, fuentes y assets centrales, habilitando navegación offline.

---

## 3. Resolución de Rutas de Assets (`resolveAsset`)

El proyecto está configurado con `base: '/Once_upon_a_Timeline/'` en `astro.config.mjs` para despliegues en GitHub Pages. Para evitar rutas rotas en subdirectorios:

```typescript
// src/utils/streaming.ts
export function resolveAsset(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
```

---

## 4. Estrategia de Carga y Respaldo de Imágenes

1. **Lazy Loading**: Todas las etiquetas `<img>` incluyen `loading="lazy"` y `decoding="async"` para acelerar el tiempo de carga inicial.
2. **Dimensiones fijas (CLS = 0)**: Se declaran explícitamente atributos `width` y `height` en cada imagen para reservar el espacio geométrico en el DOM antes de su descarga.
3. **Manejo de Errores con Fallback Visual**:
   ```html
   <img
     src={avatarSrc}
     onerror="this.style.display='none'; if(this.nextElementSibling) this.nextElementSibling.style.display='grid';"
   />
   <div class="image-placeholder" style={avatarSrc ? 'display: none;' : ''}>
     ...
   </div>
   ```
   Si una imagen no pudiera cargarse, se oculta limpiamente y se muestra una ficha de respaldo estilizada con el símbolo del personaje o de la integrante.
