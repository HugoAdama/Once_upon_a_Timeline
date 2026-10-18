# Catálogo de Componentes — Once Upon a Timeline

Este documento describe cada componente del proyecto, sus propiedades (`Props`), propósito funcional y dependencias.

---

## 1. Componentes de Estructura y Navegación

### `Header.astro`
- **Ruta**: `src/components/Header.astro`
- **Propósito**: Barra de navegación superior fija con efecto *glassmorphism*, logotipo oficial, indicador de sincronización cromática Candybong, botón de modo concierto, 5 enlaces limpios de enrutamiento multi-página (`/`, `/musica`, `/giras`, `/fan-zone`, `/moda`) con indicador de página activa, y menú móvil desplegable accesible.
- **Scripts asociados**: [`src/scripts/navigation.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/navigation.ts), [`src/scripts/theme-toggle.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/theme-toggle.ts) y [`src/scripts/candybong-sync.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/candybong-sync.ts).

### `Hero.astro`
- **Ruta**: `src/components/Hero.astro`
- **Propósito**: Portada editorial K-Pop Deluxe. Presenta encabezado *Issue No. 10*, tipografía serif de alta jerarquía, franja bento de métricas y paleta oficial en vidrio esmerilado, y vitrina de vinilo audiófilo con constelación de 9 colores y tooltips interactivos.

### `ArchiveHubSection.astro`
- **Ruta**: `src/components/ArchiveHubSection.astro`
- **Propósito**: Centro interactivo de exploración del archivo ubicado en la portada principal. Despliega 4 portales visuales con tarjetas de vidrio esmerilado que guían directamente al usuario hacia los capítulos de Música, Giras, Fan Zone y Moda, optimizando la experiencia y evitando scrolls innecesarios.

### `Ticker.astro`
- **Ruta**: `src/components/Ticker.astro`
- **Propósito**: Marquesina horizontal continua con efecto de desvanecimiento suave en los bordes (`mask-image`), insignias temáticas y pausa automática al pasar el cursor.

### `CandyJukebox.astro`
- **Ruta**: `src/components/CandyJukebox.astro`
- **Propósito**: Mini reproductor de audio flotante interactivo. Incluye botón colapsable con mini ecualizador, tarjeta expandida con visualizador de audio en tiempo real por Canvas, barra de progreso seekable, selector de canciones y sincronización con el modo Candybong.
- **Scripts asociados**: [`src/scripts/candy-jukebox.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/candy-jukebox.ts).

### `ClosingSection.astro`
- **Ruta**: `src/components/ClosingSection.astro`
- **Propósito**: Bloque de despedida y conclusión con malla de gradiente cálido, destellos flotantes y enlaces al sitio oficial de TWICE.

### `Footer.astro`
- **Ruta**: `src/components/Footer.astro`
- **Propósito**: Pie de página informativo con enlaces a las 6 secciones principales del archivo, canales oficiales de TWICE y descargo de responsabilidad fan no oficial.

### `ScrollToTop.astro`
- **Ruta**: `src/components/ScrollToTop.astro`
- **Propósito**: Botón flotante FAB (Floating Action Button) que aparece al desplazarse más de 420px y permite volver suavemente a la parte superior de la página.

---

## 2. Componentes de Integrantes y Personajes

### `MembersSection.astro`
- **Ruta**: `src/components/MembersSection.astro`
- **Propósito**: Orquestador de la sección de integrantes. Renderiza el encabezado editorial, la barra de herramientas de filtrado de eras con indicador `Auto 30s` y la cuadrícula de 9 tarjetas de miembros.
- **Scripts asociados**: [`src/scripts/member-era-filter.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/member-era-filter.ts).

### `MemberCard.astro`
- **Ruta**: `src/components/MemberCard.astro`
- **Props**:
  - `member: Member` (Datos completos de la integrante, Hangul, biografía, colores y personajes).
- **Propósito**: Renderiza la Photocard interactiva individual (`<details>`). Soporta volteo 3D de 180°, inclinación fluida según la posición del cursor (*fluid 3D tilt*), botón para marcar a tu Bias con feedback de celebración y cajón biográfico expandible.

### `CharactersSection.astro`
- **Ruta**: `src/components/CharactersSection.astro`
- **Propósito**: Orquesta las dos colecciones oficiales de mascotas de TWICE: los clásicos **LOVELYS** y los nuevos **TDOONGZ** de *Dream Attic*, con selector de pestañas segmentado.
- **Subcomponentes**: Delega cada mascota en [`CharacterTile.astro`](file:///e:/Once_upon_a_Timeline/src/components/CharacterTile.astro).

### `CharacterTile.astro`
- **Ruta**: `src/components/CharacterTile.astro`
- **Props**:
  - `character: CharacterItem`
  - `galleryType?: 'lovely' | 'tdoongz'`
- **Propósito**: Tarjeta atómica individual con halo resplandeciente en el color del personaje, animación hover de levitación elástica y detalles de personalidad.

---

## 3. Componentes de Discografía y Cronología

### `DiscographySection.astro`
- **Ruta**: `src/components/DiscographySection.astro`
- **Propósito**: Orquestador principal de la discografía. Agrupa los lanzamientos mediante utilidades de datos y renderiza la barra de filtros y los paneles de mercado.
- **Subcomponentes**: [`DiscographyFilterBar.astro`](file:///e:/Once_upon_a_Timeline/src/components/DiscographyFilterBar.astro) y [`MarketPanel.astro`](file:///e:/Once_upon_a_Timeline/src/components/MarketPanel.astro).
- **Scripts asociados**: [`src/scripts/discography-explorer.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/discography-explorer.ts).

### `DiscographyFilterBar.astro`
- **Ruta**: `src/components/DiscographyFilterBar.astro`
- **Propósito**: Interfaz del buscador con soporte para teclado (`/`), accesos rápidos a eras, chips de mercado, selects de año y formato, contador y mensaje de estado vacío.

### `MarketPanel.astro`
- **Ruta**: `src/components/MarketPanel.astro`
- **Propósito**: Bloque colapsable (`<details class="release-market">`) para un mercado discográfico, agrupado por años descendentes y renderizando sus respectivos `ReleaseItem`.

### `ReleaseItem.astro`
- **Ruta**: `src/components/ReleaseItem.astro`
- **Props**:
  - `release: Release`
- **Propósito**: Tarjeta individual de álbum/sencillo con portada cuadrada antidesplazamiento (CLS), insignia de formato y tracklist desplegable con botones directos para escuchar en Spotify y YouTube Music.

### `TimelineSection.astro`
- **Ruta**: `src/components/TimelineSection.astro`
- **Propósito**: Cronología histórica interactiva con nodos de pulso radar que conectan los momentos más importantes desde el debut en 2015 con su álbum correspondiente en la discografía.

---

## 4. Nuevas Secciones Especializadas

### `MvVaultSection.astro` & `MvCard.astro`
- **Ruta**: `src/components/MvVaultSection.astro` y `src/components/MvCard.astro`
- **Propósito**: Catálogo cinematográfico de videoclips oficiales. Cuenta con barra de filtros por territorio (Corea, Japón, Global, Solos), paletas cromáticas por MV, directores y ventana modal con reproductor de video de alta resolución.
- **Scripts asociados**: [`src/scripts/mv-vault.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/mv-vault.ts).

### `TourOdysseySection.astro` & `TourCard.astro`
- **Ruta**: `src/components/TourOdysseySection.astro` y `src/components/TourCard.astro`
- **Propósito**: Vitrina interactiva de las 4 giras mundiales de TWICE. Presenta un layout Bento de doble columna que equilibra una galería interactiva con rotación automática de fotografías cada 30 segundos (con barra de progreso continua, badges de recinto y controles manuales) junto a columnas de métricas de conciertos, asistencia total, setlist integrado y una grilla equilibrada de recintos y estadios históricos sin tarjetas aisladas.
- **Scripts asociados**: [`src/scripts/tour-map.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/tour-map.ts).

### `HallOfFameSection.astro`
- **Ruta**: `src/components/HallOfFameSection.astro`
- **Propósito**: Salón de trofeos y récords históricos. Tarjetas con métricas destacadas: +120 victorias en Music Shows, triples Daesangs, Billboard 200 #1 y récords mundiales en YouTube y ventas de álbumes físicos.

### `FanZoneSection.astro`, `QuizCard.astro` & `PhotocardStudio.astro`
- **Ruta**: `src/components/FanZoneSection.astro`, `src/components/QuizCard.astro` y `src/components/PhotocardStudio.astro`
- **Propósito**: Espacio lúdico para la comunidad ONCE:
  - `QuizCard`: Test interactivo de 5 preguntas que evalúa afinidad con las integrantes, sincroniza el resultado en vivo con el Photocard Studio y ofrece un botón de salto directo.
  - `PhotocardStudio`: Diseñador interactivo en tiempo real con previsualización del retrato oficial de la integrante, viñeta cinematográfica, selector cromático según su color oficial, personalización del nombre de fan y exportación en PNG mediante Canvas API.
- **Scripts asociados**: [`src/scripts/fan-zone.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/fan-zone.ts).

### `FashionSection.astro` & `FashionCard.astro`
- **Ruta**: `src/components/FashionSection.astro` y `src/components/FashionCard.astro`
- **Propósito**: Archivo estético y de vestuario escénico. Presenta una galería visual de alta definición de los atuendos de cada era con zoom al hover, análisis de siluetas, prendas clave, paletas cromáticas e insignias conceptuales.

---

## 5. Componente de Plantilla Base

### `Layout.astro`
- **Ruta**: `src/layouts/Layout.astro`
- **Props**:
  - `title?: string`
  - `description?: string`
- **Propósito**: Plantilla global HTML5. Configura metas SEO, Open Graph para redes sociales, Twitter Cards, canonical URL, favicon SVG personalizado, inyección del manifiesto CSS y montaje de `Header`, `Footer`, `CandyJukebox` y `ScrollToTop`.
