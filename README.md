# Once Upon a Timeline — TWICE Fan Archive

> **El archivo interactivo, musical y visual definitivo dedicado a TWICE.**  
> Recorre las 9 integrantes, sus eras musicales, el catálogo discográfico en Corea, Japón y el mundo, sus giras en estadios, salón de trofeos, videografía conceptual, moda escénica y las colecciones oficiales de personajes: **LOVELYS** y **TDOONGZ**.

---

## Características Principales

- **Soporte Multi-Idioma Internacional (i18n)**:
  - Sistema reactivo en cliente con selector interactivo en la cabecera: **Español (`es`)**, **English (`en`)**, **한국어 (`ko`)** y **日本語 (`ja`)**.
  - Detección automática del idioma del navegador, persistencia en `localStorage` (`once_preferred_lang`) y actualización dinámica de textos, atributos y placeholders sin necesidad de recargar la página.
- **Estante de Álbumes Físicos & Sistema de Logros de Fan ONCE**:
  - **Coleccionismo Físico (CD / Vinilo)**: Permite a los fans marcar qué álbumes oficiales de TWICE poseen en formato físico directamente desde cada ficha de la discografía (`/musica`) o desde el estante virtual en la Fan Zone (`/fan-zone`).
  - **Panel de Estadísticas KPI**: Visualización en vivo del total de álbumes en posesión, porcentaje de completitud respecto al catálogo oficial de TWICE y desglose clasificado por mercados (Corea, Japón y Global).
  - **Vitrina Virtual 3D**: Estante de CD virtuales en perspectiva isométrica con lomos y carátulas interactivas.
  - **Muro de 12 Logros Desbloqueables**: Medallas temáticas (*Primer Paso ONCE*, *Trilogía de Daesangs SOTY*, *Conquista de Domos Japoneses*, *Gran Maestro ONCE*, etc.) que se desbloquean instantáneamente con una notificación toast dorada y persistencia en `localStorage`.
- **Arquitectura Multi-Página Enfocada (Eliminación de Scroll Masivo)**:
  - **Inicio (`/`)**: Portada Hero, Photocards 3D de las 9 integrantes, vitrina de personajes (Lovelys y Tdoongz) y portales interactivos hacia los demás capítulos.
  - **Música & Videografía (`/musica`)**: Catálogo discográfico completo con botón de posesión física en cada álbum, buscador en vivo, reproductor de canciones, cronología histórica y Cinema MV Vault.
  - **Giras & Salón de la Fama (`/giras`)**: World Tour Odyssey (estadios y setlists) y vitrina de trofeos y récords históricos.
  - **ONCE Fan Zone (`/fan-zone`)**: Test de Afinidad interactivo, Photocard Studio con Polco Deco, la Bóveda de Coleccionista (Trilogía Candybong & Santos Griales de Photocards 3D) y el Estante de Álbumes Físicos con Muro de Logros.
  - **Moda Escénica (`/moda`)**: Galería visual de alta resolución del Stage Wardrobe Archive con paletas cromáticas y siluetas clave.
- **Bóveda de Coleccionista & Curiosidades (ONCE Vault)**:
  - **Trilogía & Simulador Lumínico Candybong**: Cronología interactiva con los 3 modelos oficiales (*Candybong Ver. 1* 2016 con base lámpara de noche, *Candybong Z* 2019 de ingeniería circular para domos, y *Candybong ∞ Infinity* 2023 con cámara de espejos infinitos 3D bilaterales). Incluye simulador de concierto con ritmos (Fijo, Pulso, Rave), túnel estelar LED y selector interactivo con los 9 colores oficiales.
  - **Santos Griales de Photocards 3D**: Cuadrícula de 6 cartas históricas ultra-raras de TWICE (Tzuyu Debut 2015, Momo SuperStar JYP 2017, Mina Page Two 3D Lenticular 2016, Sana Signal Secret Scratch 2017, Nayeon Likey Polaroid 2017 y Jihyo Ready to Be VIP 2023). Incorpora inclinación física reactiva al cursor (*fluid 3D tilt*), shaders de acabado reflectante (*Rainbow Prism*, *Gold Leaf*, *3D Lenticular Prisms*, *Cosmic Glitter*), toploader protector, filtro de rareza y giro 180° hacia el reverso histórico con cotizaciones del mercado de coleccionistas.
- **Sistema de Photocards Coleccionables & Giro 3D**:
  - Retratos oficiales de las 9 integrantes con efecto reflectante holográfico (*shimmer*) e inclinación reactiva al cursor (*3D tilt*).
  - **Rotación Automática Cada 30 Segundos**: Efecto de ola en cascada donde las tarjetas giran 180° hacia el reverso holográfico y regresan al frente actualizando el retrato de la era.
  - Selector manual de eras fotográficas: alterna instantáneamente entre **Actual & Giras (2023–2025)**, **BETWEEN 1&2 (2021–2022)** y **Debut Clásico (2015–2018)**.
- **ONCE Fan Zone, Photocard Studio & Polco Deco**:
  - **Test de Afinidad ONCE**: Cuestionario interactivo de 5 preguntas que evalúa tu personalidad y determina qué integrante de TWICE representa tu esencia.
  - **Sincronización en Vivo**: Al finalizar el test, tu resultado pre-selecciona automáticamente a la integrante ganadora en el Photocard Studio, carga su retrato oficial, aplica su color característico y activa el sello de verificación de afinidad.
  - **Photocard Studio con Polco Deco & Renderizado HD**: Personaliza tu photocard con alias de fan, marco holográfico, stickers conmutables (*Washi Tape*, *Sello 10th Aniversario*, *Insignia Candybong*, *Destellos*), acabados *Holo Glitter* / *Prisma Arcoíris* y descarga directa en imagen PNG de alta fidelidad (600x900px) generada mediante Canvas API.
- **Virtual Candybong Z Sincronizado**:
  - Widget interactivo del lightstick oficial de TWICE.
  - 3 modos de concierto: *Auto-Sync 30s* (ciclo cromático de las 9 integrantes), *Party Beat* (pulso reactivo al ritmo de la música) y *Arcoíris Cromático*.
  - Sincronización instantánea con tu integrante favorita (Bias) y botón interactivo **¡Vitorear a TWICE! (Cheer)** con ondas de choque expansivas luminosas y respuesta háptica.
- **World Tour Odyssey & Radar Cartográfico Mundial**:
  - Vitrina de las 5 giras mundiales masivas en distribución Bento de doble columna, logotipos oficiales, galería fotográfica interactiva de conciertos reales con rotación automática cada 30 segundos y estadios emblemáticos (SoFi, MetLife, Nissan Stadium).
  - **Radar de Rutas Mundiales & Telemetría en Vivo**: Mapa mundial vectorial de alta precisión con continentes estilizados, coordenadas terrestres, arcos aéreos animados (*Seúl $\leftrightarrow$ Tokio $\leftrightarrow$ Los Ángeles $\to$ Nueva York $\to$ Londres $\to$ São Paulo*) y 12 balizas de estadios con tooltips interactivos.
- **Discografía Interactiva & Killing Parts Vault**:
  - Explorador completo con 80+ lanzamientos, atajo de teclado `/`, filtros combinados y conmutador de vista Cuadrícula / Lista.
  - **Buscador de Killing Parts**: Chips con frases icónicas (*"Shy Shy Shy"*, *"Risky risky wiggy wiggy"*, *"BB Cream papapa"*, *"Fancy You!"*, *"21:29"*) que abren y resaltan automáticamente la canción y su reproductor.
- **Stage Wardrobe Archive (Moda & Fotografía Conceptual)**:
  - Galería visual y análisis estético de los vestuarios de TWICE: siluetas deconstruidas de *Strategy*, ciberespionaje Y2K de *BETWEEN 1&2*, sastrería ochentera de *Eyes wide open*, opulencia dorada de *Feel Special* y chaquetas universitarias de *PAGE TWO*.
- **Cinema MV Vault (Videografía & Galería Conceptual)**:
  - Catálogo cronológico de videos musicales oficiales categorizado por Corea, Japón, lanzamientos globales y solistas/subunidades, con reproductor modal accesible.
- **PWA (Progressive Web App) & Navegación Offline**:
  - Instalable en dispositivos móviles y de escritorio gracias a `manifest.webmanifest`.
  - Service Worker de alto rendimiento (`sw.js`) con estrategia de caché *stale-while-revalidate* para soporte offline.
- **Accesibilidad, Arquitectura & Rendimiento**:
  - **Regla estricta de $< 150$ líneas**: Todos los componentes `.astro` cumplen los principios de Single Responsibility Principle (SRP) y Separation of Concerns (SoC).
  - Contraste validado bajo pautas WCAG 2.1 AA en temas claro y oscuro.
  - Cumplimiento estricto de `prefers-reduced-motion`.
  - Cero emojis en la interfaz: uso exclusivo de iconos vectoriales SVG limpios.

---

## Tecnologías Utilizadas

- **Framework**: [Astro 7](https://astro.build/) (Generación de sitios estáticos ultrarrápida, arquitectura basada en componentes).
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/) (Tipado estricto en modelos de datos, APIs de streaming y controladores de cliente).
- **Estilos**: **CSS Vanilla Modular** (18 hojas de estilo temáticas desacopladas en `src/styles/` sin sobrecarga de frameworks externos).
- **Fuentes**: Google Fonts (*Newsreader* serif editorial, *Inter* sans-serif funcional, *Outfit* display).
- **Gráficos**: Canvas API para generación de imágenes PNG de 600x900px y visualizadores de audio en tiempo real.
- **PWA**: Manifiesto web nativo y Service Worker para resiliencia offline.

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
