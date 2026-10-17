# Catálogo de Componentes — Once Upon a Timeline

Este documento describe cada componente del proyecto, sus propiedades (`Props`), propósito funcional y dependencias.

---

## 1. Componentes de Estructura y Navegación

### `Header.astro`
- **Ruta**: `src/components/Header.astro`
- **Propósito**: Barra de navegación superior fija con efecto *glassmorphism*, logotipo oficial, insignia de ecualizador decorativo (*sound wave badge*), enlaces de navegación y botón hamburguesa para pantallas móviles.
- **Scripts asociados**: Delega el menú móvil y el scroll-spy en [`src/scripts/navigation.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/navigation.ts).

### `Hero.astro`
- **Ruta**: `src/components/Hero.astro`
- **Propósito**: Portada de apertura del sitio. Muestra el título principal, descripción introductoria, botones de navegación rápida, barra de estadísticas clave (9 integrantes, 10+ años, 100+ lanzamientos, 18 personajes) y el vinilo giratorio con órbitas cósmicas.

### `Ticker.astro`
- **Ruta**: `src/components/Ticker.astro`
- **Propósito**: Marquesina horizontal continua con efecto de desvanecimiento suave en los bordes (`mask-image`), insignias temáticas y pausa automática al pasar el cursor.

### `ClosingSection.astro`
- **Ruta**: `src/components/ClosingSection.astro`
- **Propósito**: Bloque de despedida y conclusión con malla de gradiente cálido, destellos flotantes y enlaces al sitio oficial de TWICE.

### `Footer.astro`
- **Ruta**: `src/components/Footer.astro`
- **Propósito**: Pie de página informativo con enlaces a las secciones internas, redes oficiales del grupo y descargo de responsabilidad fan no oficial.

### `ScrollToTop.astro`
- **Ruta**: `src/components/ScrollToTop.astro`
- **Propósito**: Botón flotante FAB (Floating Action Button) que aparece al desplazarse más de 420px y permite volver suavemente a la parte superior de la página.
- **Scripts asociados**: Delega el desplazamiento suave en [`src/scripts/navigation.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/navigation.ts).

---

## 2. Componentes de Integrantes y Personajes

### `MembersSection.astro`
- **Ruta**: `src/components/MembersSection.astro`
- **Propósito**: Orquestador de la sección de integrantes. Renderiza el encabezado, la barra de herramientas para alternar eras fotográficas y la cuadrícula de 9 tarjetas de miembros.
- **Scripts asociados**: [`src/scripts/member-era-filter.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/member-era-filter.ts).

### `MemberCard.astro`
- **Ruta**: `src/components/MemberCard.astro`
- **Props**:
  - `member: Member` (Objeto con datos completos de la integrante, Hangul, biografía, colores y personajes).
- **Propósito**: Renderiza la Photocard interactiva individual (`<details>`). Incluye retrato fotográfico por era, efecto de brillo holográfico (*shimmer*), chips para Lovely y TDOONGZ, y un cajón biográfico desplegable.

### `CharactersSection.astro`
- **Ruta**: `src/components/CharactersSection.astro`
- **Propósito**: Orquesta las dos colecciones oficiales de mascotas de TWICE: los clásicos **LOVELYS** y los nuevos **TDOONGZ** de *Dream Attic*.
- **Subcomponentes**: Delega cada mascota en [`CharacterTile.astro`](file:///e:/Once_upon_a_Timeline/src/components/CharacterTile.astro).

### `CharacterTile.astro`
- **Ruta**: `src/components/CharacterTile.astro`
- **Props**:
  - `character: CharacterItem` (Datos del personaje: nombre, miembro asociada, símbolo, color hexadecimal, tagline y avatar).
  - `galleryType?: 'lovely' | 'tdoongz'`
- **Propósito**: Tarjeta atómica individual con halo resplandeciente en el color del personaje, imagen con proporción fija, placeholder de respaldo en caso de error y pie con nombre y personalidad.

---

## 3. Componentes de Discografía y Cronología

### `DiscographySection.astro`
- **Ruta**: `src/components/DiscographySection.astro`
- **Propósito**: Orquestador principal de la discografía. Agrupa los lanzamientos mediante utilidades de datos y renderiza la barra de filtros y los paneles de mercado.
- **Subcomponentes**: [`DiscographyFilterBar.astro`](file:///e:/Once_upon_a_Timeline/src/components/DiscographyFilterBar.astro) y [`MarketPanel.astro`](file:///e:/Once_upon_a_Timeline/src/components/MarketPanel.astro).
- **Scripts asociados**: [`src/scripts/discography-explorer.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/discography-explorer.ts).

### `DiscographyFilterBar.astro`
- **Ruta**: `src/components/DiscographyFilterBar.astro`
- **Props**:
  - `totalCount: number`
  - `koreaCount: number`
  - `japanCount: number`
  - `globalCount: number`
  - `allYears: number[]`
- **Propósito**: Interfaz del buscador con soporte para teclado (`/`), botones de filtro rápido de eras (*Strategy, With YOU-th, Ready to Be, etc.*), chips de mercado con iconos SVG (Corea, Japón, Global), selects de año y formato, contador y mensaje de estado vacío.

### `MarketPanel.astro`
- **Ruta**: `src/components/MarketPanel.astro`
- **Props**:
  - `marketKey: Market` ('korea' | 'japan' | 'global')
  - `kicker: string`
  - `title: string`
  - `description: string`
  - `groups: YearGroup[]`
  - `totalReleases: number`
  - `defaultOpen?: boolean`
- **Propósito**: Bloque colapsable (`<details class="release-market">`) para un mercado discográfico, agrupado por años descendentes y renderizando sus respectivos `ReleaseItem`.

### `ReleaseItem.astro`
- **Ruta**: `src/components/ReleaseItem.astro`
- **Props**:
  - `release: Release` (Objeto con título, fecha, portada, formato, canciones y enlaces oficiales).
- **Propósito**: Tarjeta individual de álbum/sencillo con portada cuadrada antidesplazamiento (CLS), insignia de formato y tracklist desplegable con botones directos para escuchar en Spotify y YouTube Music.

### `TimelineSection.astro`
- **Ruta**: `src/components/TimelineSection.astro`
- **Propósito**: Cronología histórica que conecta los momentos más importantes desde el debut en 2015 hasta el presente. Cada hito incluye un botón interactivo que despliega el álbum en la discografía y lo resalta.

---

## 4. Componente de Plantilla Base

### `Layout.astro`
- **Ruta**: `src/layouts/Layout.astro`
- **Props**:
  - `title?: string`
  - `description?: string`
- **Propósito**: Plantilla global HTML5. Configura metas SEO, Open Graph para redes sociales, Twitter Cards, canonical URL, favicon SVG personalizado, inyección del manifiesto CSS y montaje de `Header`, `Footer` y `ScrollToTop`.
