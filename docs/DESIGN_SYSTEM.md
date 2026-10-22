# Sistema de Diseño — Once Upon a Timeline

Este documento define las pautas visuales, paleta de colores, tipografía, curvas de animación física, microinteracciones y estándares de accesibilidad aplicados en **Once Upon a Timeline**.

---

## 1. Identidad de Color

### Colores Oficiales del Grupo
TWICE cuenta con dos colores oficiales aprobados por JYP Entertainment que guían los acentos, gradientes principales y botones de llamada a la acción:

| Nombre | Hexadecimal | Muestra | Uso Principal |
| :--- | :--- | :--- | :--- |
| **Neon Magenta** | `#e83e86` | `rgb(232, 62, 134)` | Color primario, enlaces, estados activos, bordes de selección. |
| **Apricot** | `#f4a27e` | `rgb(244, 162, 126)` | Color secundario, gradientes combinados, fondos cálidos. |

### Gradiente Oficial TWICE
```css
--gradient-twice: linear-gradient(135deg, #e83e86 0%, #f4a27e 100%);
```

### Colores Individuales de las 9 Integrantes
Cada tarjeta de integrante en `MemberCard` y ficha en `CharacterTile` recibe dinámicamente su variable CSS `--member` o `--char-color`:

| # | Integrante | Nombre Oficial del Color | Hexadecimal | Lovely | TDOONGZ |
| :---: | :--- | :--- | :--- | :---: | :--- | :--- |
| **01** | Nayeon | Celeste / Sky Blue | `#5bc2e7` | Navely | IMNABONG |
| **02** | Jeongyeon | Verde melón / Melon Green | `#c8d879` | Jeongvely | YUBBUIBBUI |
| **03** | Momo | Rosa / Pink | `#ff7399` | Movely | MOKURING |
| **04** | Sana | Púrpura / Purple | `#9f6bb5` | Savely | SHYAM SHYAM |
| **05** | Jihyo | Albaricoque / Apricot | `#f4a27e` | Jively | PARKZYONI |
| **06** | Mina | Menta / Mint | `#50b5a1` | Mively | MYODETTE |
| **07** | Dahyun | Blanco Puro / Pure White | `#ffffff` | Davely | DUPNYANGEE |
| **08** | Chaeyoung | Rojo fresa / Strawberry Red | `#ee2737` | Chaengvely | SONCHAETTY |
| **09** | Tzuyu | Azul marino / Navy Blue | `#2654b0` | Tzuvely | TZUKUMI |

---

## 2. Tipografía y Jerarquía Editorial

El sitio implementa una jerarquía tipográfica combinada de Google Fonts:

1. **Titulares y Acentos Editoriales**: `Newsreader` (Serif de estilo editorial clásico y cálido).
   - Variables: `font-style: italic;`, `font-weight: 400`.
   - Utilizado en: `h1`, `h2`, `h3`, marcas de fecha y títulos de álbum.
2. **Cuerpo de Texto y UI**: `Inter` (Sans-serif geométrica de alta legibilidad en pantallas).
   - Variables: `font-weight: 400`, `600`, `700`, `850`.
   - Utilizado en: párrafos, filtros, tracklists, tablas de metadatos.
3. **Números y Sellos Distintivos**: `Outfit` (Sans-serif moderna de proporciones circulares).
   - Utilizado en: números de integrante (`01 / MEMBER`), estadísticas del Hero, cifras de giras y contadores de récords.

---

## 3. Tokens de Movimiento y Curvas Físicas (Spring Motion)

El sistema de animación utiliza funciones de aceleración natural calibradas para microinteracciones fluidas:

```css
:root {
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);     /* Rebote elástico para botones y modales */
  --ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1);   /* Desaceleración suave en aperturas */
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);      /* Transición estándar equilibrada */
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1); /* Acentos de salto y celebración */
}
```

### Microinteracciones Clave

1. **Photocards Coleccionables (Fluid 3D Tilt & Flip)**:
   - Inclinación según la posición del cursor (`rotateX`, `rotateY`) de hasta $\pm 8.5^\circ$.
   - Rotación automática escalonada cada 30 segundos con volteo de 180° hacia el reverso holográfico.
2. **Barra de Progreso de Lectura (`.scroll-progress-bar`)**:
   - Barra ultrafina fijada en el tope de la pantalla que se llena dinámicamente con la paleta de TWICE según la profundidad del desplazamiento.
3. **Virtual Candybong Z (Ondas de Choque & Concierto)**:
   - Efecto de balanceo suave (*gentle sway*) en el icono flotante.
   - Botón *Cheer*: dispara una animación de ola oscilatoria en el mango del lightstick y emite una onda de choque concéntrica luminosa (`.cheer-shockwave`).
   - Sincronización en vivo con el reproductor de audio Jukebox simulando el pulso rítmico de los conciertos.
4. **Radar de Giras & Vuelos Transcontinentales**:
   - Balizas de estadios con pulso de radar radar concéntrico (`beaconPulse`).
   - Trazado de rutas aéreas con flujo vectorial continuo de partículas (`flightFlow`).
5. **Polco Deco & Acabados Holográficos**:
   - Capa de brillo reflectante *Holo Glitter* con desplazamiento de estrellas y partículas.
   - Capa de prisma cromático *Prism Sheen* con onda continua en 45°.
6. **Shaders Holográficos de Photocards & Simulación Toploader (`.card-holographic-foil`)**:
   - *Rainbow Prism*: Gradiente radial reactivo a `--holo-x` y `--holo-y` con descomposición espectral completa.
   - *Gold Leaf*: Reflejo áurico y ámbar de alta densidad para ediciones de torneo y pases de estadio VIP.
   - *3D Lenticular Prisms*: Fusión de gradiente radial de tonos menta/magenta con micro-prismas estriados a 110° (`repeating-linear-gradient`) simulando la superficie lenticular física.
   - *Cosmic Glitter*: Destellos violetas y magentas con dispersión concentrada para tarjetas secretas.
   - *Toploader Bevel & Color-Dodge*: Bisel acrílico con sombras internas de precisión y modo de fusión `color-dodge` que magnifica el resplandor de la tarjeta al interactuar o seleccionarla con un clic.
7. **Transición del Modo Concierto / Dark Mode a 60 FPS (GPU View Transitions & Morphing)**:
   - Expansión radial orgánica utilizando `clip-path: circle(...)` en el pseudo-elemento `::view-transition-new(root)` con duración de 440ms y curva `cubic-bezier(0.16, 1, 0.3, 1)`.
   - Rotación continua interpolada de los iconos vectoriales del sol y la luna con física *spring* (`cubic-bezier(0.34, 1.56, 0.64, 1)`) y escala coordinada sin parpadeos.
   - Fallback sincronizado a través de la clase temporal `html.theme-transitioning` y desactivación respetuosa ante `prefers-reduced-motion`.

---

## 4. Accesibilidad y Estándares WCAG

- **Navegación por Teclado**: Todo elemento interactivo (botones, balizas de estadios, chips de Killing Parts, selectores) incluye estados `:focus-visible` con anillo de alta visibilidad (`--magenta`).
- **Atajo Global de Búsqueda**: Pulsar `/` enfoca instantáneamente la barra de búsqueda de la discografía.
- **Preferencia de Movimiento Reducido (`prefers-reduced-motion: reduce`)**:
  - Desactiva giros continuos de discos de vinilo, ondas de choque, rotaciones de photocards y animaciones de radar.
  - Reemplaza transiciones complejas por transiciones inmediatas o de opacidad estática.
- **Cero Emojis**: Todo icono es un gráfico vectorial SVG inline con `aria-hidden="true"` y texto accesible para lectores de pantalla.

---

## 5. Arquitectura Responsiva y Puntos de Quiebre (Responsive Breakpoints)

El diseño del sitio es totalmente adaptable y móvil-primero con degradación elegante, estructurado a través de los siguientes rangos de pantalla:

| Breakpoint | Dispositivos Destino | Comportamiento del Layout |
| :--- | :--- | :--- |
| **`<= 380px`** | Móviles ultracompactos (iPhone SE, Galaxy Fold cerrado) | Escalamiento de escenario vinilo a 168px, órbitas reducidas a 246px/218px, `.wrap` con margen dinámico `calc(100% - 24px)`. |
| **`<= 480px`** | Smartphones estándar en vertical (iPhone 13-16, Pixel) | Menú superior compacto (oculta subtítulo de marca y nombres de integrante en badge Candybong), discografía en fila simple con portada compacta (42px), métricas de repisa física a 1 columna. |
| **`<= 640px`** | Smartphones grandes y phablets | Barras de filtros (`.members-era-toolbar`, `.characters-filter-bar`) apiladas verticalmente con esquinas adaptadas (14px), widgets flotantes alineados simétricamente (Jukebox a la izquierda, Back-to-Top y Candybong a la derecha sin colisiones). |
| **`<= 840px`** | Tablets en vertical y pantallas intermedias | Activación de botón hamburguesa accesible con cajón móvil animado y scroll interior seguro (`max-height: calc(100vh - 72px)`), colapso de grillas a 2 columnas. |
| **`<= 1100px`** | Tablets en horizontal y laptops pequeñas | Transición de grillas principales (integrantes, giras, cronología histórica) de 3-4 columnas a 2 columnas equilibradas sin tarjetas huérfanas. |
| **`> 1100px`** | Escritorio y monitores panorámicos | Grillas multi-columna completas con ancho contenido en `.wrap` (`max-width: 1180px`). |

### Prevención de Desbordamiento y Desplazamiento Seguro
- **`overflow-x: clip`**: Implementado en `html` y `body` en lugar de `overflow-x: hidden`, suprimiendo desbordamientos horizontales por animaciones o sombras mientras mantiene inalterado el comportamiento de `position: sticky`.
- **Modales Seguros para Viewports Móviles**: Todos los diálogos (`.mv-modal`, `.candybong-panel`, `.bias-toast`) emplean `max-width: calc(100vw - 32px)` y padding contenido para garantizar accesibilidad táctil completa.
