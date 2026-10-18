# Once Upon a Timeline — TWICE Fan Archive

> **El archivo interactivo, musical y visual definitivo dedicado a TWICE.**  
> Recorre las 9 integrantes, sus eras musicales, el catálogo discográfico en Corea, Japón y el mundo, sus giras en estadios, salón de trofeos, videografía conceptual, moda escénica y las colecciones oficiales de personajes: **LOVELYS** y **TDOONGZ**.

---

## Características Principales

- **Arquitectura Multi-Página Enfocada (Eliminación de Scroll Masivo)**:
  - **Inicio (`/`)**: Portada Hero, Photocards 3D de las 9 integrantes, vitrina de personajes (Lovelys y Tdoongz) y portales interactivos hacia los demás capítulos.
  - **Música & Videografía (`/musica`)**: Catálogo discográfico completo, buscador en vivo, reproductor de canciones, cronología histórica y Cinema MV Vault.
  - **Giras & Salón de la Fama (`/giras`)**: World Tour Odyssey (estadios y setlists) y vitrina de trofeos y récords históricos.
  - **ONCE Fan Zone (`/fan-zone`)**: Test de Afinidad interactivo sincronizado en tiempo real con el Photocard Studio.
  - **Moda Escénica (`/moda`)**: Galería visual de alta resolución del Stage Wardrobe Archive con paletas cromáticas y siluetas clave.
- **Sistema de Photocards Coleccionables & Giro 3D**:
  - Retratos oficiales de las 9 integrantes con efecto reflectante holográfico (*shimmer*) e inclinación reactiva al cursor (*3D tilt*).
  - **Rotación Automática Cada 30 Segundos**: Efecto de ola en cascada donde las tarjetas giran 180° hacia el reverso holográfico y regresan al frente actualizando el retrato de la era.
  - Selector manual de eras fotográficas: alterna instantáneamente entre **Actual & Giras (2023–2025)**, **BETWEEN 1&2 (2021–2022)** y **Debut Clásico (2015–2018)**.
- **ONCE Fan Zone Sincronizada con Photocard Studio**:
  - **Test de Afinidad ONCE**: Cuestionario interactivo de 5 preguntas que evalúa tu personalidad y determina qué integrante de TWICE representa tu esencia.
  - **Sincronización en Vivo**: Al finalizar el test, tu resultado pre-selecciona automáticamente a la integrante ganadora en el Photocard Studio, carga su retrato oficial, aplica su color característico y activa el sello de verificación de afinidad.
  - **Photocard Studio con Renderizado Visual**: Personaliza tu photocard con tu alias de fan, marco holográfico y descarga directa en imagen PNG de alta fidelidad generada mediante Canvas API con el retrato oficial de la integrante.
- **Stage Wardrobe Archive (Moda & Fotografía Conceptual)**:
  - Galería visual y análisis estético de los vestuarios de TWICE: siluetas deconstruidas de *Strategy*, ciberespionaje Y2K de *BETWEEN 1&2*, sastrería ochentera de *Eyes wide open*, opulencia dorada de *Feel Special* y chaquetas universitarias de *PAGE TWO*.
- **Cinema MV Vault (Videografía & Galería Conceptual)**:
  - Catálogo cronológico de videos musicales oficiales categorizado por Corea, Japón, lanzamientos globales y solistas/subunidades, con reproductor modal accesible.
- **World Tour Odyssey & Hall of Fame**:
  - Vitrina de las 5 giras mundiales masivas (desde *TWICELAND* hasta la gira de 10.º aniversario *THIS IS FOR*) en distribución Bento de doble columna, logotipos oficiales de cada gira, vitrina fotográfica interactiva de conciertos reales con rotación automática cada 30 segundos, estadios icónicos (SoFi, MetLife, Nissan Stadium) en grillas balanceadas y vitrina de trofeos Daesang y certificaciones globales.
- **Accesibilidad y Rendimiento**:
  - Contraste validado bajo pautas WCAG 2.1 AA en temas claro y oscuro.
  - Cumplimiento estricto de `prefers-reduced-motion`.
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
