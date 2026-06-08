# Estrategia SEO y de difusión

## Objetivo
Posicionar el Observatorio como referencia pública en consultas sobre **adolescentes, smartphones, salud mental y educación digital**, en español primero y luego en los 10 idiomas más usados (ver `roadmap.md`).

## On-page (ya implementado en MVP)
- `<title>` y `meta description` ricos y específicos.
- `meta keywords`, `author`, `robots: index,follow`, `canonical`.
- **Open Graph + Twitter Card** con `og:image` (tarjeta social 1200×630).
- `theme-color`, favicon SVG.
- HTML semántico (`<main>`, `<section aria-label>`, encabezados jerárquicos).

## Pendiente (Fase 1–2)
- [ ] Generar `og.png` con resvg (igual que en otros proyectos del autor).
- [ ] `JSON-LD`: `Dataset` (cada JSON), `ScholarlyArticle`/`CreativeWork` para la biblioteca, `Organization`/`WebSite`.
- [ ] `robots.txt` + `sitemap.xml`.
- [ ] **Pre-render por módulo** (SSG ligero o `vite-plugin-ssr`/snapshot) para que cada módulo tenga su propia URL indexable — hoy el HashRouter limita el rastreo de subrutas.
- [ ] Landing por estudio (Biblioteca) con metadatos citables (mejora descubribilidad académica).

## SEO multilingüe (Fase 2)
- `hreflang` por idioma + `x-default`.
- Rutas `/{lng}/...` (requiere salir de HashRouter o usar prerender por idioma).
- `og:locale` y `og:locale:alternate`.
- Sitemap con `<xhtml:link rel="alternate" hreflang>`.

## Datos estructurados sugeridos (JSON-LD `Dataset`)
```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Uso de smartphones en adolescentes por país",
  "creator": { "@type": "Person", "name": "Carlos Cárdenas Fernández" },
  "license": "https://creativecommons.org/licenses/by/4.0/",
  "isAccessibleForFree": true,
  "distribution": [{ "@type": "DataDownload", "encodingFormat": "application/json",
    "contentUrl": "https://unimauro.github.io/observatorio-smartphones-adolescentes/data/countries.json" }]
}
```

## Difusión
- Tarjeta OG enfocada (titular + 3 datos + módulos) para WhatsApp/LinkedIn/X.
- Enlazar desde el perfil y sitio del autor.
- Citabilidad: DOI de cada estudio y enlace directo a la fuente oficial.
- Honestidad como ventaja: el sello “correlación ≠ causalidad” y el estado del dato dan credibilidad académica.
