# Once Upon a Timeline — TWICE Fan Archive

> **Un archivo interactivo, musical y visual dedicado a TWICE.**  
> Recorre las 9 integrantes, sus eras musicales, el catálogo discográfico en Corea, Japón y el mundo, y las dos colecciones oficiales de personajes: **LOVELYS** y **TDOONGZ**.

---

## Características Principales

- **Sistema de Photocards Coleccionables**:
  - Retratos de alta calidad de las 9 integrantes con efecto reflectante holográfico (*shimmer*).
  - Selector de eras fotográficas: alterna instantáneamente entre la era **Actual & Giras (2023–2025)**, **BETWEEN 1&2 (2021–2022)** y **Debut Clásico (2015–2018)**.
  - Ficha biográfica desplegable con roles, fechas de nacimiento, Hangul y personalidades asociadas.
- **Explorador Reactivo de Discografía**:
  - Buscador en tiempo real por título de álbum o canción individual insensible a mayúsculas y acentos.
  - Atajo de teclado rápido: presiona `/` para enfocar el buscador desde cualquier lugar.
  - Botones de acceso rápido a eras populares (*Strategy, With YOU-th, Ready to Be, Between 1&2, Formula of Love, Feel Special, Fancy*).
  - Filtros multidimensionales por mercado (Corea, Japón, Global), año de lanzamiento y formato (álbumes, mini álbumes, sencillos, remixes, etc.).
- **Integración con Plataformas de Streaming**:
  - Cada una de las canciones archivadas cuenta con botones directos para escuchar el tema y álbum en **Spotify** y **YouTube Music**.
- **Escaparate de Personajes Oficiales**:
  - Doble galería dedicada a los clásicos **TWICE LOVELYS** y a los nuevos **TDOONGZ** de *Dream Attic*.
  - Halos resplandecientes dinámicos adaptados al color representativo de cada miembro.
- **Cronología Conectada (Timeline)**:
  - Hitos históricos desde el debut en 2015 con nodos luminosos interactivos.
  - Al hacer clic en un hito, la página se desplaza suavemente al álbum correspondiente en la discografía y lo resalta.
- **Experiencia Moderna y Responsiva**:
  - Cabecera con *glassmorphism*, ecualizador decorativo (*sound wave badge*) y cajón de navegación para móviles.
  - Botón flotante FAB para volver arriba (*Back to Top*).
  - Respeto total a la preferencia de movimiento reducido (`prefers-reduced-motion`).

---

## Tecnologías Utilizadas

- **Framework**: [Astro 7](https://astro.build/) (Generación de sitios estáticos ultrarrápida, Zero-JS por defecto).
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Tipado estricto en modelos, datos y scripts de cliente).
- **Estilos**: **CSS Vanilla Modular** (11 hojas de estilo temáticas desacopladas en `src/styles/` sin sobrecarga de frameworks externos).
- **Fuentes**: Google Fonts (*Newsreader* serif editorial, *Inter* sans-serif funcional, *Outfit* display).

---

## Documentación del Proyecto

La documentación técnica y de diseño completa se encuentra disponible en la carpeta [`docs/`](./docs/):

1. [**Arquitectura del Sistema** (`docs/ARCHITECTURE.md`)](./docs/ARCHITECTURE.md): Principios SoC y SRP, árbol de archivos y flujo de compilación.
2. [**Sistema de Diseño** (`docs/DESIGN_SYSTEM.md`)](./docs/DESIGN_SYSTEM.md): Paleta Apricot & Neon Magenta, colores de las 9 miembros, tipografía y accesibilidad.
3. [**Catálogo de Componentes** (`docs/COMPONENTS.md`)](./docs/COMPONENTS.md): API y documentación de cada componente Astro y Layout.
4. [**Datos y Assets** (`docs/DATA_AND_ASSETS.md`)](./docs/DATA_AND_ASSETS.md): Modelos de datos TypeScript, resolución de rutas y manejo de imágenes.
5. [**Guía de Contribución** (`docs/CONTRIBUTING.md`)](./docs/CONTRIBUTING.md): Puesta en marcha local, cómo añadir nuevos lanzamientos e hitos.

---

## Inicio Rápido

### Requisitos
- Node.js `>= 22.22.0`
- npm

### Comandos de Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor local de desarrollo
npm run dev

# 3. Compilar para producción (carpeta ./dist)
npm run build

# 4. Previsualizar la compilación de producción localmente
npm run preview
```

El servidor local estará disponible en:
`http://localhost:4321/Once_upon_a_Timeline/`

---

## Descargo de Responsabilidad (Disclaimer)

Este es un proyecto no oficial creado por fans y para fans (**ONCE**), sin fines de lucro. TWICE, su música, composiciones, material fotográfico, logotipos y los personajes Lovelys y TDOONGZ son propiedad exclusiva de **JYP Entertainment** y **Warner Music Japan**.

Visita los canales oficiales de TWICE:
- [Sitio Oficial de TWICE](https://twice.jype.com/)
- [TWICE Japan Oficial](https://www.twicejapan.com/)
- [Canal Oficial de YouTube](https://www.youtube.com/@TWICE)
- [JYP Online Store](https://jypj-store.com/)
