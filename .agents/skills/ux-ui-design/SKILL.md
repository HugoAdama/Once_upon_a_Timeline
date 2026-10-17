---
name: ux-ui-design
description: >-
  Comprehensive guide and rules for UX/UI design, interactive user interfaces,
  visual hierarchy, design tokens, harmonious color palettes, micro-interactions,
  component states, and accessibility standards (WCAG 2.1 AA/AAA). Use whenever
  crafting, auditing, or refining web application interfaces, components, or design systems.
---

# UX/UI Design & Interaction Architecture Guide

This skill provides production-grade principles, patterns, and checklists for designing and implementing exceptional, user-centered web interfaces.

---

## 1. Visual Hierarchy & Spatial System

### The 4px / 8px Spatial Grid
All margins, paddings, gaps, and component heights must align with an 8px base rhythm (with 4px for fine micro-spacing):
- **Micro (tags, badges, chips)**: 4px, 6px, 8px, 12px
- **Elements (inputs, buttons, cards)**: 16px, 20px, 24px, 32px
- **Sections (containers, layouts, sections)**: 48px, 64px, 92px, 120px

### Hierarchy Rules
1. **Scannability**: Utilize Z-pattern or F-pattern scanning flows. Place key branding and primary calls-to-action in prime focal zones.
2. **Contrast & Dominance**: Exactly **one** primary call-to-action (CTA) per view. Secondary actions must use tonal, bordered, or glassmorphic variants.
3. **Proximity**: Keep related labels, icons, and values tightly grouped (`gap: 4px` to `8px`), with distinct separation between independent clusters (`gap: 20px+`).

---

## 2. Color Harmonies & Design Tokens

### Token Structure
- **Surface / Background**: Layered surfaces (`--surface-ground`, `--surface-card`, `--surface-elevated`).
- **Brand Accents**: Primary gradient or dominant hue (`--primary`, `--secondary`, `--accent`).
- **Ink & Typography**:
  - Heading ink: High contrast (contrast ratio ≥ 7:1 against background).
  - Body ink: Balanced contrast (contrast ratio ≥ 4.5:1).
  - Muted / Supporting ink: Contrast ratio ≥ 3:1 for non-essential hints.

### Color Blending with `color-mix()`
Always use modern CSS `color-mix()` for subtle hover states and glass tints:
```css
/* Dynamic hover without declaring hardcoded hex colors */
background: color-mix(in srgb, var(--accent) 15%, transparent);
border-color: color-mix(in srgb, var(--accent) 40%, rgba(255, 255, 255, 0.2));
```

---

## 3. Typography & Scale

### Fluid Typography
Avoid rigid pixel font sizes on hero and section titles. Use mathematical `clamp()`:
```css
/* Fluid scale between mobile and desktop */
h1 {
  font-size: clamp(2.8rem, 6.5vw, 5.2rem);
  line-height: 0.95;
  letter-spacing: -0.04em;
}

h2 {
  font-size: clamp(2.0rem, 4.5vw, 3.4rem);
  line-height: 1.05;
  letter-spacing: -0.03em;
}
```

### Font Pairing Best Practice
- **Display / Editorial**: High-personality serif or display font for key titles.
- **Interface / Body**: Clean, humanist sans-serif (Inter, Outfit, Plus Jakarta Sans, system UI) with high legibility at 12px-16px.

---

## 4. Component Lifecycle States

Every interactive component (button, input, card, dropdown, tab) must explicitly define all 6 states:

| State | Visual Treatment | CSS Requirement |
| :--- | :--- | :--- |
| **Default** | Resting elevation, crisp border, readable text | Standard selector |
| **Hover** | Subtle translateY (-2px to -3px), glow, deepened shadow | `:hover` with smooth transition |
| **Active / Pressed** | Scale down (0.97 to 0.98), reduced shadow | `:active` |
| **Focus-Visible** | 2px to 3px solid accent ring with offset | `:focus-visible` (never outline: none without ring) |
| **Loading** | Indeterminate skeleton or spinner, disabled cursor | `aria-busy="true"`, pointer-events: none |
| **Disabled** | 40-50% opacity, no pointer cursor | `cursor: not-allowed`, `aria-disabled="true"` |

---

## 5. Micro-Interactions & Motion Physics

### Easing Functions
Never use linear transitions for UI elements:
- **Snappy Entrance**: `cubic-bezier(0.16, 1, 0.3, 1)` (duration: 250ms - 350ms)
- **Spring / Bouncy Hover**: `cubic-bezier(0.34, 1.56, 0.64, 1)` (duration: 300ms)
- **Smooth Fade**: `ease-out` (duration: 150ms - 220ms)

### Accessibility Motion Fallback
Always provide reduced motion alternatives:
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 6. Accessibility (A11y) Standards

1. **Keyboard Navigability**: Every interactive element must be reachable and operatable via `Tab`, `Enter`, `Space`, and `Escape`.
2. **Accessible Names**: All icon-only buttons must feature `aria-label` or visually hidden text.
3. **Skip to Main Content**: Provide `<a href="#main-content" class="skip-to-content">` as the very first body child.
4. **Target Size**: Minimum touch target of 44px × 44px for buttons, navigation links, and input toggles.
