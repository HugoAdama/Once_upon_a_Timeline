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
| **01** | Nayeon | Celeste / Sky Blue | `#5bc2e7` | Navely | IMNABONG |
| **02** | Jeongyeon | Verde lima / Lime Green | `#a9d535` | Jeongvely | YUBBUIBBUI |
| **03** | Momo | Rosa / Pink | `#ff6ea7` | Movely | MOKURING |
| **04** | Sana | Púrpura / Purple | `#9e7bb5` | Savely | SHYAM SHYAM |
| **05** | Jihyo | Albaricoque / Apricot | `#f4a27e` | Jively | PARKZYONI |
| **06** | Mina | Menta / Mint | `#75c9be` | Mively | MYODETTE |
| **07** | Dahyun | Blanco / White | `#ffffff` | Davely | DUPNYANGEE |
| **08** | Chaeyoung | Rojo fresa / Strawberry Red | `#e02438` | Chaengvely | SONCHAETTY |
| **09** | Tzuyu | Azul marino / Navy Blue | `#005bac` | Tzuvely | TZUKUMI |

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

## 3. Componentes Visuales y Microinteracciones Clave

### Photocards Coleccionables: Inclinación 3D y Giro en Cascada
- **Inclinación Reactiva al Cursor (Fluid 3D Tilt)**: El marco de la tarjeta sigue la posición del puntero mediante transformaciones de perspectiva `rotateX` y `rotateY` de hasta ±8.5°, con coordenadas de brillo holográfico `--shimmer-x` y `--shimmer-y`.
- **Rotación Automática Cada 30 Segundos (Flip & Reveal)**: Cada 30s, las 9 tarjetas giran de forma escalonada (45ms de retardo entre miembro) hacia su dorso holográfico, actualizan la fotografía de la era y regresan al frente.
- **Botón Mi Bias con Modo Celebración**: Permite fijar a tu integrante favorita, sincronizando el lightstick Candybong y activando un aura de celebración y notificación flotante (*toast*).

### Glass Bento Control & Segmented Switches
- Barras de herramientas pulidas en vidrio esmerilado (`backdrop-filter: blur(16px)`), evitando la saturación de bordes concéntricos.
- Pestañas activas con alto contraste (`color: #ffffff !important`, `text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45)`) e insignias luminosas.

### Vitrina de Vinilo Audiófilo (`Hero.astro`)
- Disco de acetato con surcos concéntricos reflectantes (`conic-gradient` y `repeating-radial-gradient`), centro con logo oficial, etiqueta `33 ⅓ RPM` y constelación orbital con 9 nodos de color y tooltips informativos interactivos.

### Cinema MV Vault & Modal
- Tarjetas con miniatura 16:9, paleta cromática dominante extraída en puntos de color, métricas de reproducciones y ventana modal de alta fidelidad con reproducción de video embebido.

### Photocard Studio & Canvas API
- Estudio interactivo que renderiza dinámicamente en un `<canvas>` offscreen de 600x900 px la tarjeta coleccionable personalizada con el alias del fan y la integrante elegida, exportable a archivo PNG.

---

## 4. Accesibilidad, Modo Oscuro y Movimiento

- **Foco Accesible**: Todos los elementos interactivos (`a`, `button`, `input`, `select`, `summary`) tienen contornos accesibles de alto contraste con `:focus-visible`.
- **Modo Concierto (Candybong Night Mode)**:
  - Fondo profundo obsidiana/ciruela (`#100813`) con auras de resplandor neón adaptadas a la paleta oficial y a la integrante seleccionada como Bias.
- **Preferencia de Movimiento Reducido (`prefers-reduced-motion`)**:
  - Si el usuario tiene activada la reducción de movimiento, las rotaciones automáticas de 30s, el giro del disco y los keyframes continuos se suspenden inmediatamente respetando la accesibilidad.
- **Regla Estricta de Cero Emojis**:
  - Toda la interfaz utiliza exclusivamente iconos vectoriales SVG limpios e inline para garantizar una apariencia premium y consistente en todos los sistemas operativos y navegadores.
