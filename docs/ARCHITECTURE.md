# Arquitectura del Sistema — Once Upon a Timeline

Este documento detalla la estructura técnica, los principios de diseño de software y la separación de responsabilidades implementados en **Once Upon a Timeline**, el archivo interactivo de TWICE construido con **Astro 7**, **TypeScript** y **CSS Vanilla Modular**.

---

## 1. Principios de Arquitectura

El proyecto está diseñado bajo estrictos principios de ingeniería de software:
1. **Separación de Responsabilidades (Separation of Concerns - SoC)**: Cada capa (datos, vistas, lógica reactiva del cliente, estilos y utilidades) está claramente desacoplada en carpetas y módulos especializados.
2. **Componentes Atómicos y Reutilizables (Single Responsibility Principle - SRP)**:
   - **Regla estricta de $< 150$ líneas**: Ningún componente `.astro` en `src/components/`, `src/pages/` o `src/layouts/` supera las 150 líneas de código.
   - Los componentes complejos se descomponen en subcomponentes atómicos dedicados (e.g. `MemberPhotocard`, `MemberDrawer`, `TourPhotoGallery`, `TourVenuesGrid`, `CandyJukeboxLauncher`, etc.).
   - Cero lógica de cliente embebida en bloques `<script>` masivos dentro de `.astro`. Toda la lógica DOM y reactiva reside en módulos TypeScript en `src/scripts/`.
3. **Cero Emojis**: Iconografía 100% limpia mediante vectores SVG inline accesibles.
4. **Compatibilidad con GitHub Pages**: Todas las rutas estáticas se resuelven mediante `resolveAsset()` desde `src/utils/streaming.ts`.

---

## 2. Mapa del Árbol de Directorios

```text
Once_upon_a_Timeline/
├── .agents/
│   └── skills/              # Skills de diseño UX/UI y modern web design
├── docs/                    # Documentación técnica y guías del sistema
│   ├── ARCHITECTURE.md      # Principios SoC/SRP, árbol y flujo de datos
│   ├── COMPONENTS.md        # Catálogo y APIs de componentes Astro
│   ├── CONTRIBUTING.md      # Guía para desarrolladores y estándares
│   ├── DATA_AND_ASSETS.md   # Modelos TypeScript y gestión de assets
│   ├── DESIGN_SYSTEM.md     # Tokens, paleta oficial, curvas de animación y accesibilidad
│   └── ROADMAP_V2.md        # Visión estratégica y propuestas técnicas para la V2
├── public/
│   ├── assets/
│   │   ├── characters/      # Ilustraciones oficiales de Lovelys y TDOONGZ (.webp)
│   │   ├── collector/       # Fotografía oficial de Candybongs y Santos Griales de Photocards (.webp)
│   │   ├── covers/          # Portadas oficiales cuadradas de lanzamientos (.webp)
│   │   ├── members/         # Retratos oficiales por era (current, between, classic)
│   │   ├── tours/           # Fotografía de conciertos y logotipos oficiales de giras
│   │   └── twice-logo.svg   # Emblema vectorial oficial de TWICE
│   ├── favicon.ico
│   ├── favicon.svg          # Favicon oficial vectorial de TWICE
│   ├── manifest.webmanifest # Manifiesto de Progressive Web App (PWA)
│   └── sw.js                # Service Worker para caché y soporte offline
├── src/
│   ├── components/          # Componentes Astro de presentación (todos < 150 líneas)
│   │   ├── ArchiveHubSection.astro        # Portales de navegación principal hacia capítulos
│   │   ├── CandyJukebox.astro             # Orquestador del mini reproductor de audio
│   │   ├── CandyJukeboxControls.astro     # Controles, barra de progreso y volumen
│   │   ├── CandyJukeboxLauncher.astro     # Botón flotante FAB con badge giratorio
│   │   ├── CandyJukeboxPlaylist.astro     # Lista de canciones con indicador en vivo
│   │   ├── CandybongEvolutionShowcase.astro # Trilogía Candybong & simulador lumínico interactivo
│   │   ├── CharacterTile.astro            # Ficha atómica individual para personajes
│   │   ├── CharactersSection.astro        # Orquestador del escaparate de Lovelys y TDOONGZ
│   │   ├── ClosingSection.astro           # Banner de cierre con gradiente cósmico
│   │   ├── CollectorVaultSection.astro    # Orquestador de la Bóveda de Coleccionista y curiosidades
│   │   ├── DiscographyFilterBar.astro     # Buscador de discografía y barra de herramientas
│   │   ├── DiscographyKillingParts.astro  # Chips de frases y Killing Parts icónicas
│   │   ├── DiscographyQuickEras.astro     # Accesos directos a eras populares
│   │   ├── DiscographySection.astro       # Orquestador conciso de la discografía
│   │   ├── DiscographyViewControls.astro  # Conmutador de vistas Cuadrícula / Lista
│   │   ├── FanZoneSection.astro           # Sección comunitaria ONCE (Quiz, Studio & Vault)
│   │   ├── FashionCard.astro              # Tarjeta de concepto y estilismo escénico
│   │   ├── FashionSection.astro           # Orquestador de Stage Wardrobe Archive
│   │   ├── Footer.astro                   # Pie de página estructurado y créditos
│   │   ├── GrailPhotocardsShowcase.astro  # Vitrina 3D con shaders holográficos de photocards raras
│   │   ├── HallOfFameSection.astro        # Vitrina de récords y salón de trofeos
│   │   ├── Header.astro                   # Barra superior fija y navegación móvil
│   │   ├── Hero.astro                     # Portada editorial y métricas destacadas
│   │   ├── HeroVinylShowcase.astro        # Vitrina interactiva de vinilo con 9 auras
│   │   ├── MarketPanel.astro              # Acordeón de mercado (Corea, Japón, Global)
│   │   ├── MemberCard.astro               # Orquestador de photocard coleccionable
│   │   ├── MemberDrawer.astro             # Cajón biográfico expandible
│   │   ├── MemberPhotocard.astro          # Cara 3D con inclinación reactiva al cursor
│   │   ├── MembersSection.astro           # Orquestador de la cuadrícula de miembros
│   │   ├── MvCard.astro                   # Tarjeta de video musical con paleta cromática
│   │   ├── MvVaultSection.astro           # Galería cinematográfica de MVs y modal
│   │   ├── PhotocardDecoBar.astro         # Barra de herramientas Polco Deco y acabados holo
│   │   ├── PhotocardStudio.astro          # Estudio interactivo de diseño de photocards
│   │   ├── PhysicalShelfTracker.astro     # Estante de álbumes físicos (CD/Vinilo) y logros de fan
│   │   ├── QuizCard.astro                 # Cuestionario interactivo de afinidad
│   │   ├── ReleaseItem.astro              # Ficha de álbum estilo streaming con tracklist y botón de colección física
│   │   ├── ScrollToTop.astro              # Botón flotante FAB para volver arriba
│   │   ├── TimelineMilestoneCard.astro    # Tarjeta de hito histórico con vinilo deslizante
│   │   ├── TimelineScrubber.astro         # Riel cronológico 2015-2026 con nodos de año
│   │   ├── TimelineSection.astro          # Orquestador de la cronología interactiva
│   │   ├── TourCard.astro                 # Ficha Bento de gira con estadios y setlist
│   │   ├── TourOdysseySection.astro       # Navegación y vitrina de giras mundiales
│   │   ├── TourPhotoGallery.astro         # Galería de conciertos con rotación cada 30s
│   │   ├── TourRouteMap.astro             # Radar de rutas mundiales y baliceras de estadios
│   │   ├── TourVenuesGrid.astro           # Cuadrícula de estadios y recintos históricos
│   │   └── VirtualCandybong.astro         # Widget interactivo del lightstick Candybong Z
│   ├── data/                  # Fuentes de verdad estáticas fuertemente tipadas
│   │   ├── characters.ts      # Datos de Lovelys y TDOONGZ
│   │   ├── collector-vault.ts # Modelos Candybong, especificaciones y Santos Griales de photocards
│   │   ├── fan-achievements.ts # 12 logros de coleccionista físico y evaluación de desbloqueo
│   │   ├── fan-zone.ts        # Preguntas y opciones del test de afinidad
│   │   ├── fashion-archive.ts # Conceptos de vestuario y siluetas escénicas
│   │   ├── hall-of-fame.ts    # Récords históricos, Daesangs y ventas
│   │   ├── i18n.ts            # Diccionario completo en 4 idiomas (ES, EN, KO, JA)
│   │   ├── killing-parts.ts   # Frases legendarias, integrantes y consultas de búsqueda
│   │   ├── members.ts         # Datos de las 9 integrantes (bios, colores, eras)
│   │   ├── music-videos.ts    # Videografía oficial completa con directores y paletas
│   │   ├── releases.ts        # Catálogo exhaustivo de lanzamientos (Corea, Japón, Global)
│   │   ├── timeline.ts        # Hitos históricos y conexiones a lanzamientos
│   │   └── world-tours.ts     # Giras mundiales, estadios y setlists
│   ├── layouts/
│   │   └── Layout.astro       # Esqueleto HTML5, metadatos SEO, PWA y barra de scroll
│   ├── pages/                 # Arquitectura multi-página para navegación fluida
│   │   ├── index.astro        # Inicio: Hero, Integrantes 3D, Personajes y Portales
│   │   ├── musica.astro       # Discografía, Killing Parts, Cronología y Cinema MV Vault
│   │   ├── giras.astro        # World Tour Odyssey, Mapa de Rutas y Salón de la Fama
│   │   ├── fan-zone.astro     # Test de Afinidad, Photocard Studio, Bóveda & Estante Físico
│   │   └── moda.astro         # Stage Wardrobe Archive con galería de alta resolución
│   ├── scripts/               # Lógica cliente TypeScript desacoplada
│   │   ├── candy-jukebox.ts         # Mini reproductor de audio y visualizador canvas
│   │   ├── candybong-sync.ts        # Sincronización cromática de lightstick y bias
│   │   ├── characters-filter.ts     # Filtro por universo de personajes
│   │   ├── collector-vault.ts       # Simulador lumínico Candybong, 3D tilt, filtros y shaders foil
│   │   ├── discography-explorer.ts  # Búsqueda reactiva, killing parts, filtros y vista
│   │   ├── fan-zone.ts              # Motor del quiz y sincronización con el estudio
│   │   ├── fashion-gallery.ts       # Filtros y zoom de Stage Wardrobe Archive
│   │   ├── i18n.ts                  # Motor reactivo multi-idioma (ES/EN/KO/JA), prevención de claves nulas y persistencia
│   │   ├── member-era-filter.ts     # Rotación 30s con giro 3D e inclinación al cursor
│   │   ├── mv-vault.ts              # Filtro de videografía y reproductor modal
│   │   ├── navigation.ts            # Menú móvil desplegable y botón volver arriba
│   │   ├── photocard-deco.ts        # Polco Deco: stickers, acabados holo y render Canvas HD
│   │   ├── physical-collection.ts   # Gestor del estante físico, cálculo de KPIs y toasts de logros
│   │   ├── scroll-reveal.ts         # Animaciones al entrar en viewport y barra de scroll
│   │   ├── theme-toggle.ts          # Conmutador a 60 FPS con GPU View Transitions API y expansión radial
│   │   ├── timeline-filter.ts       # Filtro por era cronológica y salto a discografía
│   │   ├── tour-map.ts              # Controlador interactivo de balizas y vuelos
│   │   ├── tour-odyssey.ts          # Controlador de galería fotográfica con rotación 30s
│   │   └── virtual-candybong.ts     # Modos de luz, vibración y efecto Cheer de Candybong Z
│   └── styles/                # Sistema de estilos modular (CSS Vanilla)
│       ├── animations.css     # Curvas elásticas, View Transitions, scroll bar y keyframes
│       ├── archive-hub.css    # Tarjetas y portales de navegación del archivo principal
│       ├── base.css           # Reseteo CSS, tipografía base y utilidades .wrap, .button
│       ├── candybong.css      # Modelo vectorial de Candybong Z, modos y ondas de choque
│       ├── characters.css     # Estilos para personajes y mascotas
│       ├── closing-footer.css # Estilos de cierre, pie de página y botón flotante
│       ├── collector-vault.css # Estilos para simulador Candybong y photocards 3D con foil
│       ├── discography.css    # Estilos para el explorador, killing parts y streaming
│       ├── fan-zone.css       # Estilos para quiz, estudio de photocard y Polco Deco
│       ├── fashion.css        # Estilos para archivo de moda y vestuarios
│       ├── global.css         # Manifiesto maestro que importa los módulos en cascada
│       ├── header.css         # Cabecera fija, navegación, dropdown i18n y botón concierto
│       ├── hero.css           # Portada, métricas y vinilo 3D con auras
│       ├── physical-shelf.css # Estante de CD virtuales 3D, badges de logros y toast flotante
│       ├── hall-of-fame.css   # Vitrina de récords, trofeos y métricas
│       ├── header.css         # Barra superior fija, navegación y badge de sincronización
│       ├── hero.css           # Portada, tipografía editorial, métricas y vinilo
│       ├── jukebox.css        # Mini reproductor, ecualizador y visualizador
│       ├── members.css        # Photocards 3D, selector de eras y cajón biográfico
│       ├── mv-vault.css       # Galería de videos musicales y modal de reproducción
│       ├── timeline.css       # Cronología histórica interactiva con riel de años
│       ├── tokens.css         # Variables de diseño, paleta oficial, curvas spring y auras
│       └── tours.css          # Giras mundiales, galería 30s y radar de rutas de estadios
```

---

## 3. Flujo de Navegación Multi-Página

1. **`/` (Inicio)**: Experiencia de presentación con el Hero editorial, las 9 integrantes con rotación 30s, vitrina de personajes LOVELYS y TDOONGZ, y los portales interactivos hacia los 4 capítulos temáticos.
2. **`/musica` (Música)**: Discografía completa con 80+ lanzamientos, barra de Killing Parts populares, cronología interactiva 2015-2026 y Cinema MV Vault.
3. **`/giras` (Giras)**: World Tour Odyssey con navegación de 5 giras mundiales, galería con temporizador de 30s, estadios históricos, radar cartográfico de rutas aéreas y vitrina del Salón de la Fama.
4. **`/fan-zone` (Comunidad)**: Test de Afinidad de 5 preguntas sincronizado en vivo con el Photocard Studio & Polco Deco (stickers, holo glitter y descarga PNG de 600x900px), más la **Bóveda de Coleccionista**: simulador interactivo de la Trilogía Candybong y escaparate 3D de los Santos Griales de Photocards con shaders reflectantes y cotizaciones de mercado.
5. **`/moda` (Estilo)**: Stage Wardrobe Archive con análisis estético de 5 eras de vestuario, siluetas y paletas de color.

---

## 4. Motor de Internacionalización Reactiva (i18n)

El proyecto cuenta con un sistema integral de localización del lado del cliente diseñado para responder inmediatamente sin recargas de página:

1. **Fuente de verdad tipada (`src/data/i18n.ts`)**:
   - Diccionario completo en 4 idiomas: Español (`es`), Inglés (`en`), Coreano (`ko`), Japonés (`ja`) con 744 claves por idioma y paridad total (100%).
   - Cobertura exhaustiva por dominios: navegación (`nav.*`), portales (`hub.*`), discografía y mercados (`disco.*`, `market.*`), videografía (`mv.*`), cronología y riel temporal (`timeline.*`, `scrubber.*`), giras y telemetría (`tours.*`, `tour.*`, `map.beacon.*`), récords mundiales y trofeos (`hof.*`), Bóveda de Coleccionista y Santos Griales (`candybong.*`, `photocard.*`, `vault.*`), moda escénica (`fashion.*`), Fan Zone y quiz de afinidad (`quiz.*`, `studio.*`, `shelf.*`, `ach.*`, `virtualCandybong.*`), integrantes y personajes (`members.*`, `member.*`, `characters.*`, `char.*`), y pie de página completo (`footer.*`).
2. **Enlace declarativo en el DOM (`data-i18n`) y formateo dinámico**:
   - Atributos estándar: `data-i18n` (texto), `data-i18n-placeholder`, `data-i18n-title`, `data-i18n-aria`.
   - Fechas localizadas nativas (`data-date`): Formatea fechas ISO (`YYYY-MM-DD`) automáticamente al estándar cultural de cada idioma (`10 oct.` / `Oct 10` / `10월 10일` / `10月10日`).
   - Formatos discográficos (`data-format-badge`): Adapta insignias y etiquetas de formato (`Mini álbum`, `Studio Album`, `정규 앨범`, `フルアルバム`).
   - Contadores y métricas dinámicas (`data-track-count`, `data-setlist-count`, `data-year-release-count`, `data-market-panel-count`): Formateo gramatical y plurales automáticos (`10 canciones`, `10 songs`, `10곡`, `10曲`).
   - Controles de formulario (`#filter-format`, `#filter-year`, `#custom-member-select`, `#custom-fan-name`): Actualización dinámica de etiquetas y placeholders.
   - Sincronización de interactivos: Simulador lumínico Candybong (`collector-vault.ts`), selector de ángulos y looks de moda (`fashion-gallery.ts`), y estado de selección de bias (`candybong-sync.ts`).
3. **Arquitectura basada en eventos (`once:lang-changed`)**:
   - Al seleccionar un nuevo idioma desde la cabecera, `src/scripts/i18n.ts` emite el evento global `window.dispatchEvent(new CustomEvent('once:lang-changed', { detail: { lang } }))`.
   - Módulos reactivos que reaccionan inmediatamente al evento:
     - `discography-explorer.ts`: Re-ejecuta filtros y actualiza contadores de resultados en vivo.
     - `timeline-filter.ts`: Actualiza contadores de momentos históricos visibles.
     - `tour-odyssey.ts`: Actualiza subtítulos y ubicaciones de la galería activa.
     - `tour-map.ts`: Provee telemetría y reseñas de estadios en el idioma activo.
     - `fan-zone.ts`: Traduce en caliente el resultado del quiz de afinidad y el Photocard Studio.
     - `candybong-sync.ts`: Actualiza las etiquetas de selección de sesgo ("Mi Bias" / "My Bias" / "내 최애" / "推し").
     - `collector-vault.ts` & `fashion-gallery.ts`: Conservan el estado traducido en readouts y subtítulos de vista activa.
4. **Persistencia y fallback**:
   - El idioma elegido se preserva en `localStorage.getItem('once_preferred_lang')`.
   - En ausencia de preferencia previa, se toma el idioma predeterminado (`es`).

