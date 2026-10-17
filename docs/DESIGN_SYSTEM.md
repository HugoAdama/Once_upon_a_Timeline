# Sistema de Diseño — Once Upon a Timeline

Este documento define las pautas visuales, paleta de colores, tipografía, microinteracciones y estándares de accesibilidad aplicados en **Once Upon a Timeline**.

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
| :---: | :--- | :--- | :---: | :--- | :--- |
| **01** | Nayeon | Celeste / Sky Blue | `#91cdee` | Navely | IMNABONG |
| **02** | Jeongyeon | Verde lima / Lime Green | `#bdd36c` | Jeongvely | YUBBUIBBUI |
| **03** | Momo | Rosa / Pink | `#ed9fc2` | Movely | MOKURING |
| **04** | Sana | Púrpura / Purple | `#b9a0df` | Savely | SHYAM SHYAM |
| **05** | Jihyo | Albaricoque / Apricot | `#f2a77d` | Jively | PARKZYONI |
| **06** | Mina | Menta / Mint | `#91d1c1` | Mively | MYODETTE |
| **07** | Dahyun | Blanco / White (acento perla) | `#d8d4d0` | Davely | DUPNYANGEE |
| **08** | Chaeyoung | Rojo fresa / Strawberry Red | `#e66f7a` | Chaengvely | SONCHAETTY |
| **09** | Tzuyu | Azul marino / Navy Blue | `#76a3d8` | Tzuvely | TZUKUMI |

---

## 2. Tipografía

El sitio implementa una jerarquía tipográfica combinada de Google Fonts:

1. **Titulares y Acentos Editoriales**: `Newsreader` (Serif de estilo editorial clásico y cálido).
   - Variables: `font-style: italic;`, `font-weight: 400`.
   - Utilizado en: `h1`, `h2`, `h3`, marcas de fecha y números de álbum.
2. **Cuerpo de Texto y UI**: `Inter` (Sans-serif geométrica de alta legibilidad en pantallas).
   - Variables: `font-weight: 400`, `600`, `700`, `850`.
   - Utilizado en: párrafos, filtros, tracklists, tablas de metadatos.
3. **Números y Sellos Distintivos**: `Outfit` (Sans-serif moderna de proporciones circulares).
   - Utilizado en: números de integrante (`01 / MEMBER`), estadísticas del Hero y sellos de marca.

---

## 3. Componentes Visuales Clave

### Estética de Photocard de Colección (`MemberCard.astro`)
- **Proporción**: Marco fotográfico con relación de aspecto `4 / 4.9`.
- **Efecto Shimmer Holográfico**: Al pasar el cursor, un destello reflectante barre suavemente la fotografía simulando una carta física coleccionable.
- **Borde de Color Oficial**: Un borde superior de 6px resplandeciente en el color representativo de la integrante.
- **Filtro de Eras**: Pestañas para alternar entre "Actual (2023-2025)", "BETWEEN (2021-2022)" y "Debut (2015-2018)".

### Tarjetas de Álbum Estilo Streaming (`ReleaseItem.astro`)
- Carátulas cuadradas con tamaño fijo (56x56 px) para eliminar el Cumulative Layout Shift (CLS).
- Insignia de formato (`Álbum de estudio`, `Mini álbum`, `Sencillo digital`, etc.).
- Tracklist numerada con enlaces directos para escuchar el tema y álbum en **Spotify** y **YouTube Music** mediante botones con iconos SVG oficiales.

### Disco de Vinilo Interactivo del Hero (`Hero.astro`)
- Representación en CSS puro de un disco de vinilo con surcos concéntricos reflectantes (`repeating-radial-gradient`), centro circular con el logo de TWICE y animación de giro continuo (`spinSlow`).

---

## 4. Accesibilidad y Movimiento

- **Foco Accesible**: Todos los elementos interactivos (`a`, `button`, `input`, `select`, `summary`) tienen un contorno visible (`outline: 3px solid #e83e86; outline-offset: 3px;`).
- **Preferencia de Movimiento Reducido (`prefers-reduced-motion`)**:
  - Si el usuario tiene activada la reducción de movimiento en su sistema operativo, las animaciones infinitas (disco de vinilo, marquesina, radar pulse) y transiciones complejas se desactivan o se establecen en estado estático.
- **Contraste WCAG**: Todo texto cuenta con ratio de contraste óptimo sobre fondos claros o degradados.
