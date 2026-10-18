# Once Upon a Timeline — TWICE Fan Archive

> **El archivo interactivo, musical y visual definitivo dedicado a TWICE.**  
> Recorre las 9 integrantes, sus eras musicales, el catálogo discográfico en Corea, Japón y el mundo, sus giras en estadios, salón de trofeos, videografía conceptual, moda escénica y las colecciones oficiales de personajes: **LOVELYS** y **TDOONGZ**.

---

## Características Principales

- **Sistema de Photocards Coleccionables & Giro 3D**:
  - Retratos oficiales de las 9 integrantes con efecto reflectante holográfico (*shimmer*) e inclinación reactiva al cursor (*3D tilt*).
  - **Rotación Automática Cada 30 Segundos**: Efecto de ola en cascada donde las tarjetas giran 180° hacia el reverso holográfico y regresan al frente actualizando el retrato de la era.
  - Selector manual de eras fotográficas: alterna instantáneamente entre **Actual & Giras (2023–2025)**, **BETWEEN 1&2 (2021–2022)** y **Debut Clásico (2015–2018)**.
  - Ficha biográfica desplegable con roles, fechas de nacimiento, firmas manuscritas, Hangul y personalidades asociadas.
- **Cinema MV Vault (Videografía & Galería Conceptual)**:
  - Catálogo cronológico de videos musicales oficiales categorizado por Corea, Japón, lanzamientos globales en inglés y proyectos solistas/subunidades.
  - Ficha visual de cada video: paleta cromática dominante, director audiovisual, métricas y reproductor modal embebido.
- **World Tour Odyssey (Giras Mundiales & Estadios)**:
  - Recorrido interactivo por las grandes giras de TWICE (*Twiceland, TWICELIGHTS, World Tour III, READY TO BE*).
  - Fichas de estadios históricos (SoFi Stadium, MetLife Stadium, Nissan Stadium, Foro Sol), estadísticas de asistencia masiva y cajón de setlists oficiales.
- **Hall of Fame & Récords (Salón de Trofeos)**:
  - Vitrina de hitos históricos: +120 victorias en programas musicales surcoreanos, triple Daesang consecutivo a Canción del Año, número 1 en el Billboard 200 estadounidense y más de 20 millones de álbumes físicos certificados.
- **ONCE Fan Zone (Espacio Comunitario Interactivo)**:
  - **Test de Afinidad ONCE**: Cuestionario interactivo de 5 preguntas que evalúa tu personalidad y determina qué integrante de TWICE representa tu esencia.
  - **Photocard Studio**: Estudio de diseño interactivo para crear tu propia photocard personalizada con tu nombre, tu bias y marco holográfico, con descarga directa en imagen PNG de alta resolución mediante Canvas API.
- **Stage Wardrobe Archive (Moda & Estilismo Escénico)**:
  - Análisis de los conceptos estéticos y vestuarios más memorables del grupo: desde las chaquetas universitarias de *Cheer Up* y el barroquismo dorado de *Feel Special* hasta el ciberespionaje Y2K de *Talk that Talk* y la alta costura deconstruida de *Strategy*.
- **Candy Jukebox & Candybong Lightstick Sync**:
  - Mini reproductor de audio flotante con visualizador acústico en tiempo real por Canvas.
  - Sincronización cromática interactiva con los 9 colores oficiales del lightstick Candybong y modo de celebración al marcar a tu bias.
- **Explorador Reactivo de Discografía**:
  - Buscador en tiempo real por título de álbum o canción individual insensible a mayúsculas y acentos.
  - Atajo de teclado rápido: presiona `/` para enfocar el buscador desde cualquier lugar.
  - Botones de acceso rápido a eras populares (*Strategy, With YOU-th, Ready to Be, Between 1&2, Formula of Love, Feel Special, Fancy*).
  - Filtros multidimensionales por mercado (Corea, Japón, Global), año de lanzamiento y formato (álbumes, mini álbumes, sencillos, remixes, etc.).
- **Escaparate de Personajes Oficiales**:
  - Doble galería dedicada a los clásicos **TWICE LOVELYS** y a los nuevos **TDOONGZ** de *Dream Attic*.
  - Halos resplandecientes dinámicos adaptados al color representativo de cada miembro.
- **Cronología Conectada (Timeline)**:
  - Hitos históricos desde el debut en 2015 con nodos luminosos interactivos enlazados directamente con la discografía.
- **Accesibilidad y Rendimiento**:
  - Contraste validado bajo pautas WCAG 2.1 AA en temas claro y oscuro.
  - Cumplimiento de `prefers-reduced-motion` para usuarios con sensibilidad al movimiento.
  - Cero emojis en la interfaz: uso exclusivo de iconos vectoriales SVG limpios.

---

## Tecnologías Utilizadas

- **Framework**: [Astro 7](https://astro.build/) (Generación de sitios estáticos ultrarrápida, arquitectura basada en componentes).
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Tipado estricto en modelos de datos, APIs de streaming y controladores de cliente).
- **Estilos**: **CSS Vanilla Modular** (17 hojas de estilo temáticas desacopladas en `src/styles/` sin sobrecarga de frameworks externos).
- **Fuentes**: Google Fonts (*Newsreader* serif editorial, *Inter* sans-serif funcional, *Outfit* display).
- **Gráficos**: Canvas API para generación de imágenes PNG y visualizadores de audio en tiempo real.

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

Este es un proyecto no oficial creado por fans y para fans (**ONCE**), sin fines de lucro. TWICE, su música, composiciones, material fotográfico, videoclips, logotipos y los personajes Lovelys y TDOONGZ son propiedad exclusiva de **JYP Entertainment** y **Warner Music Japan**.

Visita los canales oficiales de TWICE:
- [Sitio Oficial de TWICE](https://twice.jype.com/)
- [TWICE Japan Oficial](https://www.twicejapan.com/)
- [Canal Oficial de YouTube](https://www.youtube.com/@TWICE)
- [JYP Online Store](https://jypj-store.com/)
