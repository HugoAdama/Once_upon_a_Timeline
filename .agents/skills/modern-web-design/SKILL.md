---
name: modern-web-design
description: >-
  Advanced technical manual for modern web design, CSS architecture, cutting-edge
  CSS features (Container Queries, Subgrid, :has(), native nesting), glassmorphism,
  bento grids, scroll-driven animations, View Transitions, and Core Web Vitals optimization.
  Use whenever implementing cutting-edge visual styles, fluid layouts, or high-performance frontend interfaces.
---

# Modern Web Design & Advanced CSS Architecture

This skill provides architectural guidance and code patterns for contemporary, high-performance web design.

---

## 1. Advanced CSS Features & Selectors

### Modern CSS Selectors
- **Parent / Relational Selector (`:has()`)**:
  ```css
  /* Elevate card when an internal interactive control is focused */
  .card:has(:focus-visible) {
    border-color: var(--primary);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  /* Style navigation link when its target modal is open */
  header:has(.nav-links.nav-open) {
    backdrop-filter: blur(24px);
  }
  ```

- **Container Queries (`@container`)**:
  Style components based on their container's width rather than the global viewport:
  ```css
  .catalog-container {
    container-type: inline-size;
    container-name: catalog;
  }

  @container catalog (max-width: 480px) {
    .item-card {
      grid-template-columns: 1fr;
    }
  }
  ```

- **CSS Subgrid**:
  Align child elements across independent cards in a grid:
  ```css
  .grid-parent {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .grid-card {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 4;
  }
  ```

---

## 2. Contemporary Visual Aesthetics

### High-Fidelity Glassmorphism (Frosted Glass)
To prevent banding and blur clipping, layer backdrop filters with subtle internal borders and radial tints:
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid rgba(255, 255, 255, 0.85);
  box-shadow:
    0 12px 36px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
}
```

### Bento Grid Layouts
Combine varying card spans (`grid-column: span 2`, `aspect-ratio: 16/9`, `aspect-ratio: 1`) to construct rich, magazine-style layouts with organic asymmetry:
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.bento-card-featured {
  grid-column: span 2;
}
```

### Edge Fade Masks (`mask-image`)
Provide seamless, non-abrupt edges for marquees, tickers, and horizontal sliders:
```css
.scroll-track-masked {
  mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
}
```

---

## 3. High-Performance Motion & Animation

### Hardware-Accelerated Transforms
Only animate properties that do not trigger browser recalculation / layout reflow:
- **Allowed**: `transform` (`translate3d`, `scale`, `rotate`), `opacity`, `filter`
- **Avoid animating**: `width`, `height`, `margin`, `top`, `left`, `padding`

### Scroll-Driven Animations & Observers
Use `IntersectionObserver` with `requestAnimationFrame` for performant scroll-reveals without blocking the main JavaScript thread:
```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
```

---

## 4. Core Web Vitals (CWV) & Layout Stability

1. **Cumulative Layout Shift (CLS = 0)**:
   - Always declare explicit `width` and `height` attributes on `<img>` and `<svg>` elements.
   - Use CSS `aspect-ratio` to reserve space before assets load.
2. **Largest Contentful Paint (LCP)**:
   - Mark hero assets above the fold with `fetchpriority="high"` and `loading="eager"`.
   - Lazy load everything below the fold with `loading="lazy"` and `decoding="async"`.
3. **Font Rendering**:
   - Apply `font-display: swap` on web fonts to prevent invisible text during loading (FOIT).
4. **Rendering Performance**:
   - Utilize `content-visibility: auto;` with `contain-intrinsic-size` on long sections below the fold to defer rendering off-screen elements.
