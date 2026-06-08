# Observatorio Global del Uso de Smartphones en Adolescentes

Dashboard **público y abierto** que consolida evidencia científica, reportes y datos abiertos sobre el uso de
smartphones, redes sociales e internet en **adolescentes**. Plataforma estática (React + Vite) desplegada en
**GitHub Pages**, con foco especial en **Perú y LATAM**.

> ### ⚠️ Aviso de integridad
> Es una **síntesis con fines educativos y de investigación**. Cada indicador lleva estado
> `verified` (cifra citable) o `estimate` (síntesis plausible, orden de magnitud). **No es estadística
> oficial.** Verificar en la fuente antes de citar — ver [`data/PROVENANCE.md`](data/PROVENANCE.md). El aviso
> también aparece en la propia UI (botón “ⓘ Síntesis · ver fuentes”).

## Módulos (10)
🌐 Panorama Mundial (mapa Leaflet) · 🧠 Salud Mental (correlaciones) · 🎓 Educación · ⚠️ Riesgos Digitales ·
👨‍👩‍👧 Familia · 🌎 LATAM · 🇵🇪 Perú · 📚 Biblioteca Científica (DOI) · 🕰️ Línea de Tiempo · 🔬 Investigadores (export CSV/JSON).

## Stack
`React + TypeScript + Vite` · `TailwindCSS` · `ECharts` · `Leaflet` · datos `JSON` · `GitHub Actions` + `Pages`.

## Arquitectura (resumen)
```
Fuentes (curadas) ─▶ ETL Python (build_data.py) ─▶ JSON estáticos ─▶ SPA React/Vite ─▶ GitHub Pages
```
Detalle, diagramas Mermaid y modelo ER en [`docs/`](docs/): architecture, data_model, wireframes, roadmap, seo_strategy.

## Estructura
```
observatorio-smartphones-adolescentes/
├── etl/build_data.py            # genera los JSON (curaduría + estado + fuente)
├── frontend/                    # React + Vite + TS + Tailwind + ECharts + Leaflet
│   ├── public/data/*.json       # salida del ETL
│   └── src/{lib,components,pages}
├── docs/                        # arquitectura, modelo de datos, wireframes, roadmap, SEO
├── data/PROVENANCE.md
└── .github/workflows/deploy.yml # ETL -> build -> Pages (+ refresco mensual)
```

## Inicio rápido
```bash
python etl/build_data.py                 # genera los JSON
cd frontend && npm install && npm run dev # http://localhost:5173
```

## Despliegue
Push a `main` → la GitHub Action corre el ETL, hace build y publica en Pages
(`https://unimauro.github.io/observatorio-smartphones-adolescentes/`). En **Settings → Pages**, *Source: GitHub Actions*.

## Roadmap (destacados)
- **Fase 1:** elevar `estimate` → `verified`; microdatos por edad/género/año.
- **Fase 2 — i18n:** presentar la plataforma en los **10 idiomas más usados** (en, zh, hi, es, fr, ar, bn, pt, ru, id) con `react-i18next`, RTL para árabe y SEO multilingüe. Ver [`docs/roadmap.md`](docs/roadmap.md).
- **Fase 3:** asistente de evidencia, comparador de países, aportes de la comunidad.

## Licencia y propósito
Proyecto cívico-académico, sin fines de lucro, por la **alfabetización digital y el bienestar adolescente**.
Datos de fuentes públicas. Las conclusiones son responsabilidad de quien las publique; esta herramienta facilita
el análisis, no lo certifica. **Correlación ≠ causalidad.**

Por Carlos Cárdenas Fernández · [@unimauro](https://github.com/unimauro)
