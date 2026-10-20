# Catálogo de Componentes — Once Upon a Timeline

Este documento describe cada componente del proyecto, sus propiedades (`Props`), propósito funcional, dependencias y arquitectura modular. **Todos los componentes `.astro` cumplen la regla estricta de $< 150$ líneas de código.**

---

## 1. Componentes de Estructura y Navegación

### `Header.astro`
- **Ruta**: `src/components/Header.astro`
- **Propósito**: Barra de navegación superior fija con efecto *glassmorphism*, logotipo oficial de TWICE, indicador de sincronización cromática Candybong con anillo de cuenta regresiva, botón de conmutación de modo concierto, 5 enlaces limpios de enrutamiento multi-página (`/`, `/musica`, `/giras`, `/fan-zone`, `/moda`) con indicador de página activa, y cajón móvil accesible.
- **Scripts asociados**: [`src/scripts/navigation.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/navigation.ts), [`src/scripts/theme-toggle.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/theme-toggle.ts) y [`src/scripts/candybong-sync.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/candybong-sync.ts).

### `Hero.astro`
- **Ruta**: `src/components/Hero.astro`
- **Propósito**: Portada editorial K-Pop Deluxe. Despliega el encabezado *Issue No. 10*, tipografía serif de alta jerarquía, franja bento de métricas en vidrio esmerilado y delega la vitrina del disco interactivo en [`HeroVinylShowcase.astro`](file:///e:/Once_upon_a_Timeline/src/components/HeroVinylShowcase.astro).

### `HeroVinylShowcase.astro`
- **Ruta**: `src/components/HeroVinylShowcase.astro`
- **Propósito**: Vitrina de vinilo audiófilo con simulación de disco analógico interactivo, constelación de 9 auras cromáticas oficiales de las integrantes y tooltips interactivos con animaciones físicas elásticas.

### `ArchiveHubSection.astro`
- **Ruta**: `src/components/ArchiveHubSection.astro`
- **Propósito**: Centro interactivo de exploración del archivo en la portada principal (`/`). Despliega 4 portales visuales en Bento Glassmorphic que dirigen directamente a los capítulos de Música, Giras, Fan Zone y Moda.

### `CandyJukebox.astro`
- **Ruta**: `src/components/CandyJukebox.astro`
- **Propósito**: Orquestador del mini reproductor de audio flotante interactivo. Ensambla de forma modular el botón lanzador ([`CandyJukeboxLauncher.astro`](file:///e:/Once_upon_a_Timeline/src/components/CandyJukeboxLauncher.astro)), la lista de reproducción ([`CandyJukeboxPlaylist.astro`](file:///e:/Once_upon_a_Timeline/src/components/CandyJukeboxPlaylist.astro)) y los controles de audio ([`CandyJukeboxControls.astro`](file:///e:/Once_upon_a_Timeline/src/components/CandyJukeboxControls.astro)).
- **Scripts asociados**: [`src/scripts/candy-jukebox.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/candy-jukebox.ts).

### `VirtualCandybong.astro`
- **Ruta**: `src/components/VirtualCandybong.astro`
- **Propósito**: Widget interactivo del lightstick oficial de TWICE (Candybong Z). Incluye modelo vectorial SVG realista (cabezal giratorio LED, aro exterior y botón central), 3 modos de concierto (*Auto-Sync 30s*, *Party Beat* pulsante y *Arcoíris cromático*), sincronización rápida con la integrante favorita (Bias) y botón interactivo **Cheer** con emisión de ondas de choque expansivas luminosas y respuesta háptica.
- **Scripts asociados**: [`src/scripts/virtual-candybong.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/virtual-candybong.ts).

### `ClosingSection.astro`
- **Ruta**: `src/components/ClosingSection.astro`
- **Propósito**: Bloque de despedida y conclusión con malla de gradiente cósmico cálido, destellos flotantes y enlaces al sitio oficial de TWICE.

### `Footer.astro`
- **Ruta**: `src/components/Footer.astro`
- **Propósito**: Pie de página informativo con enlaces a las 6 secciones principales del archivo, canales oficiales de TWICE y descargo de responsabilidad fan no oficial.

### `ScrollToTop.astro`
- **Ruta**: `src/components/ScrollToTop.astro`
- **Propósito**: Botón flotante FAB ubicado en la esquina inferior derecha que aparece tras desplazarse más de 420px y permite volver suavemente al tope de la página.

---

## 2. Componentes de Integrantes y Personajes

### `MembersSection.astro`
- **Ruta**: `src/components/MembersSection.astro`
- **Propósito**: Orquestador de la sección de integrantes. Renderiza el encabezado editorial, la barra de herramientas de filtrado de eras con indicador `Auto 30s` y la cuadrícula de 9 tarjetas de miembros.
- **Scripts asociados**: [`src/scripts/member-era-filter.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/member-era-filter.ts).

### `MemberCard.astro`
- **Ruta**: `src/components/MemberCard.astro`
- **Props**: `member: Member`
- **Propósito**: Orquestador individual de la photocard coleccionable. Delega la cara fotográfica 3D en [`MemberPhotocard.astro`](file:///e:/Once_upon_a_Timeline/src/components/MemberPhotocard.astro) y el cajón biográfico expandible en [`MemberDrawer.astro`](file:///e:/Once_upon_a_Timeline/src/components/MemberDrawer.astro).

### `MemberPhotocard.astro`
- **Ruta**: `src/components/MemberPhotocard.astro`
- **Props**: `member: Member`, `initialPhoto: string`
- **Propósito**: Cara frontal y dorso de la photocard coleccionable. Gestiona la inclinación física 3D reactiva a la posición del cursor (*fluid 3D tilt*), la rotación automática en cascada cada 30 segundos, el botón de fijación de Bias con feedback de celebración y los sellos de firma.

### `MemberDrawer.astro`
- **Ruta**: `src/components/MemberDrawer.astro`
- **Props**: `member: Member`
- **Propósito**: Cajón biográfico expandible que despliega los datos personales de la integrante, rol en el grupo, fecha de nacimiento, Hangul, biografía y enlaces a sus personajes oficiales (Lovelys y TDOONGZ).

### `CharactersSection.astro`
- **Ruta**: `src/components/CharactersSection.astro`
- **Propósito**: Orquesta las dos colecciones oficiales de mascotas de TWICE: los clásicos **LOVELYS** y los nuevos **TDOONGZ** de *Dream Attic*, con selector de pestañas segmentado.
- **Subcomponentes**: Delega cada mascota en [`CharacterTile.astro`](file:///e:/Once_upon_a_Timeline/src/components/CharacterTile.astro).

### `CharacterTile.astro`
- **Ruta**: `src/components/CharacterTile.astro`
- **Props**: `character: CharacterItem`, `galleryType?: 'lovely' | 'tdoongz'`
- **Propósito**: Tarjeta atómica individual con halo resplandeciente en el color del personaje, animación hover de levitación elástica y detalles de personalidad.

---

## 3. Componentes de Discografía y Cronología

### `DiscographySection.astro`
- **Ruta**: `src/components/DiscographySection.astro`
- **Propósito**: Orquestador principal de la discografía. Renderiza la barra de filtros de búsqueda y los paneles por mercado.
- **Subcomponentes**: [`DiscographyFilterBar.astro`](file:///e:/Once_upon_a_Timeline/src/components/DiscographyFilterBar.astro) y [`MarketPanel.astro`](file:///e:/Once_upon_a_Timeline/src/components/MarketPanel.astro).

### `DiscographyFilterBar.astro`
- **Ruta**: `src/components/DiscographyFilterBar.astro`
- **Propósito**: Barra de búsqueda interactiva (con atajo `/`), selector de mercado (Corea, Japón, Global), filtro de favoritos y conmutador de vistas.
- **Subcomponentes**: [`DiscographyQuickEras.astro`](file:///e:/Once_upon_a_Timeline/src/components/DiscographyQuickEras.astro), [`DiscographyKillingParts.astro`](file:///e:/Once_upon_a_Timeline/src/components/DiscographyKillingParts.astro) y [`DiscographyViewControls.astro`](file:///e:/Once_upon_a_Timeline/src/components/DiscographyViewControls.astro).

### `DiscographyKillingParts.astro`
- **Ruta**: `src/components/DiscographyKillingParts.astro`
- **Propósito**: Barra de chips de frases y *killing parts* célebres de TWICE (*"Shy Shy Shy"*, *"Risky risky wiggy wiggy"*, *"BB Cream papapa"*, *"Fancy You!"*, *"21:29"*). Al hacer clic, filtra inmediatamente la discografía, despliega el álbum y resalta la canción con animación musical.

### `ReleaseItem.astro`
- **Ruta**: `src/components/ReleaseItem.astro`
- **Props**: `release: Release`
- **Propósito**: Ficha de álbum estilo plataforma de streaming (`<details>`). Presenta portada de alta resolución, badge de mercado, botón para guardar en favoritos (*localStorage*), ecualizador animado en el track principal y enlaces directos a Spotify, Apple Music y YouTube.

### `TimelineSection.astro`
- **Ruta**: `src/components/TimelineSection.astro`
- **Propósito**: Orquestador de la cronología histórica interactiva 2015-2026. Ensambla el riel temporal superior ([`TimelineScrubber.astro`](file:///e:/Once_upon_a_Timeline/src/components/TimelineScrubber.astro)) y las tarjetas de hitos ([`TimelineMilestoneCard.astro`](file:///e:/Once_upon_a_Timeline/src/components/TimelineMilestoneCard.astro)).

### `TimelineScrubber.astro`
- **Ruta**: `src/components/TimelineScrubber.astro`
- **Propósito**: Riel cronológico navegable con nodos de año que permite desplazarse suavemente y enfocar los hitos de cada año histórico de TWICE.

### `TimelineMilestoneCard.astro`
- **Ruta**: `src/components/TimelineMilestoneCard.astro`
- **Props**: `milestone: TimelineMilestone`, `index: number`
- **Propósito**: Tarjeta de hito histórico con efecto de disco de vinilo que se asoma suavemente al hacer hover, badge de era con código cromático y botón para saltar y resaltar el álbum correspondiente en la discografía.

---

## 4. Componentes de Giras y Salón de la Fama

### `TourOdysseySection.astro`
- **Ruta**: `src/components/TourOdysseySection.astro`
- **Propósito**: Orquestador del capítulo de conciertos. Presenta las pestañas de selección de giras, el panel de la gira activa ([`TourCard.astro`](file:///e:/Once_upon_a_Timeline/src/components/TourCard.astro)) y el mapa de radar mundial ([`TourRouteMap.astro`](file:///e:/Once_upon_a_Timeline/src/components/TourRouteMap.astro)).
- **Scripts asociados**: [`src/scripts/tour-odyssey.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/tour-odyssey.ts) y [`src/scripts/tour-map.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/tour-map.ts).

### `TourCard.astro`
- **Ruta**: `src/components/TourCard.astro`
- **Props**: `tour: WorldTour`, `isFirst?: boolean`
- **Propósito**: Tarjeta Bento principal de cada gira. Descompuesta limpiamente en la galería de fotos ([`TourPhotoGallery.astro`](file:///e:/Once_upon_a_Timeline/src/components/TourPhotoGallery.astro)), estadísticas de asistencia, píldoras de setlist y la cuadrícula de recintos ([`TourVenuesGrid.astro`](file:///e:/Once_upon_a_Timeline/src/components/TourVenuesGrid.astro)).

### `TourPhotoGallery.astro`
- **Ruta**: `src/components/TourPhotoGallery.astro`
- **Props**: `tourId: string`, `years: string`, `slidesData: SlideItem[]`
- **Propósito**: Vitrina fotográfica de concierto con rotación automática cada 30 segundos, barra de progreso interactiva, controles de diapositiva anterior/siguiente y pie de foto con ubicación del estadio.

### `TourRouteMap.astro`
- **Ruta**: `src/components/TourRouteMap.astro`
- **Propósito**: Radar cartográfico vectorial SVG de alta definición que proyecta los continentes reales, grilla de radar con coordenadas terrestres, arcos aéreos transcontinentales animados (*Seúl $\leftrightarrow$ Tokio $\leftrightarrow$ Los Ángeles $\to$ Nueva York $\to$ Londres $\to$ São Paulo*) y 12 balizas de estadios históricos con tooltip flotante interactivo.

### `HallOfFameSection.astro`
- **Ruta**: `src/components/HallOfFameSection.astro`
- **Propósito**: Salón de trofeos y vitrina de récords de TWICE: ventas globales (+20M de álbumes), victorias en programas musicales (+120 wins), trofeos Daesang y certificaciones internacionales.

---

## 5. Componentes de Fan Zone & Comunidad

### `FanZoneSection.astro`
- **Ruta**: `src/components/FanZoneSection.astro`
- **Propósito**: Orquestador del espacio interactivo para ONCE. Contiene el test de afinidad ([`QuizCard.astro`](file:///e:/Once_upon_a_Timeline/src/components/QuizCard.astro)), el estudio de diseño ([`PhotocardStudio.astro`](file:///e:/Once_upon_a_Timeline/src/components/PhotocardStudio.astro)) y la Bóveda de Coleccionista ([`CollectorVaultSection.astro`](file:///e:/Once_upon_a_Timeline/src/components/CollectorVaultSection.astro)).
- **Scripts asociados**: [`src/scripts/fan-zone.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/fan-zone.ts) y [`src/scripts/collector-vault.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/collector-vault.ts).

### `PhotocardStudio.astro`
- **Ruta**: `src/components/PhotocardStudio.astro`
- **Propósito**: Estudio de diseño de photocards oficiales personalizadas. Incluye previsualizador de tarjeta en tiempo real, selector de integrante/bias, entrada de alias de fan, selector de color de marco y barra de herramientas Polco Deco ([`PhotocardDecoBar.astro`](file:///e:/Once_upon_a_Timeline/src/components/PhotocardDecoBar.astro)), con exportación en PNG de 600x900px mediante Canvas API.

### `PhotocardDecoBar.astro`
- **Ruta**: `src/components/PhotocardDecoBar.astro`
- **Propósito**: Barra de herramientas Polco Deco con selector de acabados holográficos (*Liso*, *Holo Glitter*, *Prisma Arcoíris*) y stickers conmutables (*Washi Tape*, *Sello 10th Aniversario*, *Insignia Candybong* y *Destellos*).
- **Scripts asociados**: [`src/scripts/photocard-deco.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/photocard-deco.ts).

---

## 6. Componentes de la Bóveda de Coleccionista (Collector's Vault)

### `CollectorVaultSection.astro`
- **Ruta**: `src/components/CollectorVaultSection.astro`
- **Propósito**: Orquestador de la bóveda de reliquias y curiosidades en `/fan-zone`. Dispone un conmutador de pestañas segmentadas que alterna entre la evolución de los lightsticks ([`CandybongEvolutionShowcase.astro`](file:///e:/Once_upon_a_Timeline/src/components/CandybongEvolutionShowcase.astro)) y las tarjetas más codiciadas ([`GrailPhotocardsShowcase.astro`](file:///e:/Once_upon_a_Timeline/src/components/GrailPhotocardsShowcase.astro)).

### `CandybongEvolutionShowcase.astro`
- **Ruta**: `src/components/CandybongEvolutionShowcase.astro`
- **Propósito**: Escaparate y simulador interactivo de los 3 modelos oficiales (*Candybong Ver. 1* 2016 con base dock de noche, *Candybong Z* 2019 con aro LED RGB para domos, y *Candybong ∞ Infinity* 2023 con túnel bilateral de espejos infinitos). Cuenta con un simulador lumínico reactivo con ritmos (Luz Fija, Pulso, Rave), paleta interactiva de los 9 colores oficiales, vitrina con pedestal giratorio y especificaciones técnicas oficiales.

### `GrailPhotocardsShowcase.astro`
- **Ruta**: `src/components/GrailPhotocardsShowcase.astro`
- **Propósito**: Cuadrícula interactiva de los 6 Santos Griales de photocards de TWICE. Cada photocard cuenta con soporte toploader biselado, shaders holográficos dinámicos (*Rainbow Prism*, *Gold Leaf*, *3D Lenticular Prisms*, *Cosmic Glitter*) que reaccionan a la posición del cursor, selección activa con clic para admirar el acabado lumínico, filtro de rareza (*Mítico*, *Legendario*, *Raro*) y botón con animación de giro 3D de 180° hacia el reverso con cotizaciones de mercado y datos de coleccionista.
- **Scripts asociados**: [`src/scripts/collector-vault.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/collector-vault.ts).

---

## 7. Componentes de Moda Escénica y Videografía

### `FashionSection.astro`
- **Ruta**: `src/components/FashionSection.astro`
- **Propósito**: Orquestador del archivo de vestuarios escénicos (*Stage Wardrobe Archive* en `/moda`). Presenta el lookbook interactivo con selector de conceptos, paletas de color y cuadrícula de tarjetas de estilismo ([`FashionCard.astro`](file:///e:/Once_upon_a_Timeline/src/components/FashionCard.astro)).
- **Scripts asociados**: [`src/scripts/fashion-gallery.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/fashion-gallery.ts).

### `FashionCard.astro`
- **Ruta**: `src/components/FashionCard.astro`
- **Props**: `concept: FashionConcept`
- **Propósito**: Ficha Bento de moda con fotografía de alta fidelidad, desglose de piezas de vestuario, concepto estético y chips cromáticos de la paleta.

### `MvVaultSection.astro`
- **Ruta**: `src/components/MvVaultSection.astro`
- **Propósito**: Galería cinematográfica de videos musicales oficiales en `/musica`. Incluye filtros por categoría (*Corea*, *Japón*, *Global*, *Solos & Subunidades*), tarjetas interactivas ([`MvCard.astro`](file:///e:/Once_upon_a_Timeline/src/components/MvCard.astro)) y modal accesible de reproducción con iframe oficial de YouTube.
- **Scripts asociados**: [`src/scripts/mv-vault.ts`](file:///e:/Once_upon_a_Timeline/src/scripts/mv-vault.ts).

### `MvCard.astro`
- **Ruta**: `src/components/MvCard.astro`
- **Props**: `mv: MusicVideo`
- **Propósito**: Tarjeta individual de video musical con miniatura de alta resolución, créditos de dirección, paleta cromática extraída del videoclip y botón de reproducción modal accesible.
