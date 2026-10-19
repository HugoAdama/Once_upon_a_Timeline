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

---

## 4. Accesibilidad y Estándares WCAG

- **Navegación por Teclado**: Todo elemento interactivo (botones, balizas de estadios, chips de Killing Parts, selectores) incluye estados `:focus-visible` con anillo de alta visibilidad (`--magenta`).
- **Atajo Global de Búsqueda**: Pulsar `/` enfoca instantáneamente la barra de búsqueda de la discografía.
- **Preferencia de Movimiento Reducido (`prefers-reduced-motion: reduce`)**:
  - Desactiva giros continuos de discos de vinilo, ondas de choque, rotaciones de photocards y animaciones de radar.
  - Reemplaza transiciones complejas por transiciones inmediatas o de opacidad estática.
- **Cero Emojis**: Todo icono es un gráfico vectorial SVG inline con `aria-hidden="true"` y texto accesible para lectores de pantalla.
