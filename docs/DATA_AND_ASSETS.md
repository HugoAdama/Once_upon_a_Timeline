# Gestión de Datos y Assets — Once Upon a Timeline

Este documento detalla las estructuras de datos, interfaces TypeScript, convención de nombres y el manejo de assets estáticos (imágenes, carátulas y personajes) en el proyecto.

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
  colorHex: string;       // ej: "#91cdee"
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
  symbol: string;         // Identificador gráfico distintivo para Lovelys y TDOONGZ
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

### `TimelineMilestone`
```typescript
export interface TimelineMilestone {
  year: string;           // ej: "2024"
  badge: string;          // ej: "Mini Álbum 14"
  title: string;          // ej: "With YOU-th & DIVE & STRATEGY"
  description: string;
  releaseId: string;      // ID de conexión al ReleaseItem en la discografía
  date: string;
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

Esta función garantiza que una ruta como `/assets/members/nayeon.webp` se resuelva automáticamente como `/Once_upon_a_Timeline/assets/members/nayeon.webp` en producción, o `/assets/members/nayeon.webp` en desarrollo local.

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
