# Arquitectura — Observatorio Adolescentes & Pantallas

Plataforma **100% estática** (sin backend): el ETL en Python genera JSON; un SPA React/Vite los consume y se sirve por GitHub Pages. Gratuita, reproducible y auditable.

## Vista de alto nivel

```mermaid
flowchart LR
  subgraph Fuentes["Fuentes (curadas)"]
    U[UNICEF/UNESCO/WHO]
    O[OECD/PISA]
    P[Pew / Common Sense]
    D[DataReportal/ITU]
    N[INEI/MINSA/MINEDU]
    A[PubMed/Scopus]
  end
  subgraph ETL["ETL (Python)"]
    B[build_data.py<br/>datos curados + estado + fuente]
  end
  subgraph Static["JSON estáticos"]
    J[countries · mental · education · risks<br/>family · latam · peru · studies · timeline · meta]
  end
  subgraph FE["Frontend (React/Vite)"]
    UI[10 módulos · ECharts · Leaflet]
  end
  U & O & P & D & N & A -.curaduría.-> B --> J --> UI -->|GitHub Pages| User((Usuario))
```

## Flujo de datos

```mermaid
flowchart TD
  A[Datos curados en build_data.py] --> B[Asignar status + source por registro]
  B --> C[Emitir JSON a frontend/public/data]
  C --> D[SPA fetch por BASE_URL]
  D --> E[Render: KPIs, ECharts, Leaflet, tablas]
  E --> F[Export CSV/JSON en módulo Investigadores]
```

## Estructura de carpetas

```
observatorio-smartphones-adolescentes/
├── data/PROVENANCE.md
├── etl/build_data.py            # genera los JSON (curaduría + estado + fuente)
├── frontend/
│   ├── public/data/*.json       # salida del ETL (consumida por el SPA)
│   ├── public/favicon.svg
│   └── src/
│       ├── lib/ (data.ts, store.tsx, theme.ts, format.ts, echart-theme.ts)
│       ├── components/ (Layout, EChart, WorldMap, KpiCard, ChartCard, PageState, DataStatusBadge, ThemeToggle)
│       └── pages/ (Panorama, SaludMental, Educacion, Riesgos, Familia, Latam, Peru, Biblioteca, Timeline, Investigadores)
├── docs/ (architecture, data_model, wireframes, roadmap, seo_strategy)
└── .github/workflows/deploy.yml
```

## Componentes del frontend

```mermaid
flowchart TD
  main[main.tsx · HashRouter] --> DP[DataProvider<br/>carga 10 JSON]
  DP --> L[Layout · sidebar 10 módulos + header]
  L --> P1[Panorama → WorldMap+ECharts]
  L --> P2[Salud Mental → scatter+barras]
  L --> P3[Educación] --> P4[Riesgos] --> P5[Familia]
  L --> P6[LATAM] --> P7[Perú] --> P8[Biblioteca]
  L --> P9[Timeline] --> P10[Investigadores → export]
```

## Decisiones de diseño
- **Sin backend:** alcance público y costo cero; los datos se regeneran por ETL (Action mensual), no en vivo.
- **HashRouter:** evita configurar *rewrites* en GitHub Pages.
- **Estado del dato de primera clase:** cada registro lleva `status` (`verified`/`estimate`) y `source`, visibles en la UI.
- **UI ⟂ datos:** prepara la i18n (Fase 2) sin duplicar el dataset.
- **Mapa con Leaflet + CARTO Voyager:** legible en claro y oscuro; marcadores proporcionales por indicador.
