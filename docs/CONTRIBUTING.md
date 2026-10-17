# Guía de Contribución y Desarrollo — Once Upon a Timeline

Esta guía explica cómo ejecutar el proyecto localmente, las convenciones de código y los pasos para añadir nuevos lanzamientos o integrantes al archivo.

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

## 3. ¿Cómo Añadir un Nuevo Lanzamiento Musical?

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
       { title: 'Track 03' },
     ],
     officialSource: 'https://twice.jype.com/discography',
   }
   ```
3. Coloca la carátula cuadrada en `public/assets/covers/nuevo-album.webp`.
4. El nuevo lanzamiento se indexará automáticamente en el buscador reactivo, en los filtros por año y en los contadores del mercado correspondiente sin necesidad de modificar ningún componente HTML.

---

## 4. ¿Cómo Conectar un Nuevo Hito en la Cronología?

1. Abre [`src/data/timeline.ts`](file:///e:/Once_upon_a_Timeline/src/data/timeline.ts).
2. Añade una entrada vinculada al `id` del lanzamiento:
   ```typescript
   {
     year: '2025',
     badge: '10th Anniversary',
     title: 'Décimo Aniversario de TWICE',
     description: 'Celebración de una década de música, giras globales y récords.',
     releaseId: 'release-nombre-album-2025-05-15',
     date: '2025-10-20',
   }
   ```
3. El botón "Ver canciones y eras" del hito navegará y resaltará automáticamente el álbum correspondiente en la discografía.

---

## 5. Convenciones de Código y Estilo

- **Componentes Astro**: Mantener la lógica de presentación limpia. Si un componente supera las 150 líneas, evaluar si puede extraerse un subcomponente hijo en `src/components/`.
- **Scripts del Cliente**: Escribir TypeScript estricto en `src/scripts/` en lugar de bloques `<script>` monolíticos en las páginas.
- **Estilos CSS**:
  - Utilizar variables semánticas de [`src/styles/tokens.css`](file:///e:/Once_upon_a_Timeline/src/styles/tokens.css).
  - Colocar los estilos en el módulo temático correspondiente en `src/styles/`.
  - Evitar el uso de selectores con `!important` a menos que sea en consultas de `prefers-reduced-motion`.
- **Accesibilidad**: Asegurarse de que cada elemento interactivo cuente con etiquetas `aria-label`, contraste legible y foco visual visible.
