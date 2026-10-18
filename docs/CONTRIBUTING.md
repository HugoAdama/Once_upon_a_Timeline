# Guía de Contribución y Desarrollo — Once Upon a Timeline

Esta guía explica cómo ejecutar el proyecto localmente, las convenciones de código y los pasos para añadir nuevos lanzamientos, videos musicales, giras, récords o conceptos estéticos al archivo.

---

## 1. Requisitos Previos

- **Node.js**: Versión `>= 22.22.0` (recomendada `v22.x` o superior).
- **npm**: Administrador de paquetes incluido con Node.js.

---

## 2. Puesta en Marcha Local

### Instalación de dependencias
```bash
npm install
```

### Ejecutar el servidor de desarrollo
Para iniciar el servidor local con recarga en caliente:

```bash
npm run dev
```

El sitio estará disponible en:
- `http://localhost:4321/Once_upon_a_Timeline/`

> **Nota de desarrollo**: Si ejecutas comandos automáticos en segundo plano, utiliza `npx astro dev --background` y consulta el estado con `npx astro dev status`.

### Compilación para Producción
Para generar el paquete estático final en la carpeta `./dist/`:

```bash
npm run build
```

### Previsualizar la compilación de producción
```bash
npm run preview
```

---

## 3. ¿Cómo Añadir Contenido al Archivo?

### Añadir un Nuevo Lanzamiento Musical
1. Abre [`src/data/releases.ts`](file:///e:/Once_upon_a_Timeline/src/data/releases.ts).
2. Añade un nuevo objeto al array `RELEASES` siguiendo la interfaz `Release`:
   ```typescript
   {
     id: 'release-nombre-album-2025-05-15',
     title: 'NUEVO ÁLBUM',
     date: '2025-05-15',
     year: 2025,
     market: 'korea', // 'korea' | 'japan' | 'global'
     format: 'mini-album', // 'album' | 'mini-album' | 'single' | 'digital-single' | etc.
     formatLabel: 'Mini álbum · 15th',
     status: 'released',
     cover: '/assets/covers/nuevo-album.webp',
     tracks: [
       { title: 'Canción Principal' },
       { title: 'Track 02' },
     ],
     officialSource: 'https://twice.jype.com/discography',
   }
   ```
3. Coloca la carátula cuadrada en `public/assets/covers/nuevo-album.webp`. Se indexará automáticamente en el buscador reactivo y filtros.

### Añadir un Nuevo Video Musical (MV Vault)
1. Abre [`src/data/music-videos.ts`](file:///e:/Once_upon_a_Timeline/src/data/music-videos.ts).
2. Inserta el objeto con el ID oficial de YouTube, paleta cromática y director:
   ```typescript
   {
     id: 'mv-nuevo-single',
     title: 'Nombre del Sencillo',
     era: 'Era Name',
     year: 2025,
     category: 'group-kr', // 'group-kr' | 'group-jp' | 'group-en' | 'solo-sub'
     categoryLabel: 'Corea · Title Track',
     youtubeId: 'ID_DE_YOUTUBE',
     director: 'Estudio Director',
     palette: ['#hex1', '#hex2', '#hex3', '#hex4'],
     description: 'Descripción del concepto estético y visual.',
     viewsEstimate: '+10M views',
   }
   ```

### Añadir una Nueva Gira Mundial (Tour Odyssey)
1. Abre [`src/data/world-tours.ts`](file:///e:/Once_upon_a_Timeline/src/data/world-tours.ts).
2. Configura los estadios clave y canciones del setlist siguiendo la interfaz `WorldTour`.

### Añadir un Nuevo Récord o Trofeo (Hall of Fame)
1. Abre [`src/data/hall-of-fame.ts`](file:///e:/Once_upon_a_Timeline/src/data/hall-of-fame.ts).
2. Agrega la métrica verificada bajo su categoría correspondiente (`music-show`, `daesang`, `stadium`, `global-record`).

---

## 4. Convenciones de Código y Estilo

- **Componentes Astro**: Mantener la lógica de presentación limpia. Si un componente supera las 150 líneas, evaluar si puede extraerse un subcomponente hijo en `src/components/`.
- **Scripts del Cliente**: Escribir TypeScript estricto en `src/scripts/` con funciones exportadas `initX()` en lugar de bloques `<script>` monolíticos en las páginas.
- **Estilos CSS**:
  - Utilizar variables semánticas de [`src/styles/tokens.css`](file:///e:/Once_upon_a_Timeline/src/styles/tokens.css).
  - Colocar los estilos en el módulo temático correspondiente en `src/styles/`.
  - Asegurar alto contraste en modo claro y oscuro (`[data-theme="dark"]`).
  - Respetar siempre `prefers-reduced-motion` para suspender giros 3D y animaciones en usuarios sensibles.
- **Regla Estricta de Emojis**: CERO emojis en la interfaz y en el código de producción. Utilizar siempre iconos vectoriales SVG limpios.
