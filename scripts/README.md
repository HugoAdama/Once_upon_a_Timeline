# Scripts y Herramientas — Once Upon a Timeline

Este directorio contiene las herramientas de mantenimiento y extracción de datos multimedia del proyecto.

## Estructura

* `scrapers/`: Scripts de extracción y descarga utilizados para poblar los catálogos multimedia:
  * `download-all-album-covers.js`: Descarga y normalización en WebP de las 58 portadas oficiales de la discografía (Corea, Japón y Global).
  * `download-all-real-assets.js`: Pipeline de descarga inicial de portadas y fotografías oficiales.
  * `download-real-members-all-eras.js`: Descarga de retratos de integrantes categorizados por eras (Classic, Between 1&2, Current).
  * `download_official_mascots.cjs`: Descarga y normalización de ilustraciones oficiales de Lovelys y TDOONGZ.
  * `crop_tdoongz.cjs`: Normalización dimensional de avatares TDOONGZ.
  * `verify-html.js`: Validador de salida HTML.

