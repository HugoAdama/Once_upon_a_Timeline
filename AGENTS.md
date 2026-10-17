## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Project Architecture & Engineering Guidelines

This codebase follows strict **Separation of Concerns (SoC)** and **Single Responsibility Principle (SRP)**:

1. **Components (`src/components/`)**:
   - Keep components focused and under 150 lines where possible.
   - Separate complex sub-interfaces into dedicated child components (e.g. `DiscographyFilterBar.astro`, `MarketPanel.astro`, `CharacterTile.astro`).
   - Do NOT embed large client-side script blocks directly in `.astro` files. Delegate client logic into `src/scripts/`.

2. **Client Scripts (`src/scripts/`)**:
   - Write strict TypeScript for any client-side DOM manipulation, search filtering, and event listeners.
   - Export named initialization functions (e.g., `initDiscographyExplorer`, `initMemberEraFilter`, `initNavigation`, `initScrollReveals`).

3. **Styles (`src/styles/`)**:
   - Maintain modularity across domain files: `tokens.css`, `base.css`, `header.css`, `hero.css`, `ticker.css`, `members.css`, `characters.css`, `discography.css`, `timeline.css`, `closing-footer.css`, `animations.css`.
   - Never write monolithic CSS dumps; place new styles in their corresponding domain module and import them via `global.css`.
   - Always preserve accessible focus indicators and `prefers-reduced-motion` fallbacks.

4. **Data & Types (`src/data/`, `src/types/`, `src/utils/`)**:
   - All dataset modifications must conform to interfaces defined in `src/types/index.ts`.
   - Use `resolveAsset()` from `src/utils/streaming.ts` whenever referencing static assets to maintain GitHub Pages base URL compatibility.

## Internal Documentation

Before implementing new features or making architectural adjustments, consult the local documentation:

- [Architecture & File Separation](docs/ARCHITECTURE.md)
- [Design System & Tokens](docs/DESIGN_SYSTEM.md)
- [Components Catalog & APIs](docs/COMPONENTS.md)
- [Data Models & Static Assets](docs/DATA_AND_ASSETS.md)
- [Developer & Contributing Guide](docs/CONTRIBUTING.md)

## Astro Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
