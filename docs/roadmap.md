# Roadmap — Observatorio Global del Uso de Smartphones en Adolescentes

## Fase 0 — MVP (✅ entregado)
- Arquitectura React + Vite + TS + Tailwind + ECharts + Leaflet.
- 10 módulos: Panorama (mapa), Salud Mental, Educación, Riesgos, Familia, LATAM, Perú, Biblioteca, Línea de Tiempo, Investigadores.
- Datos JSON generados por ETL (`etl/build_data.py`) con estado (`verified`/`estimate`) y fuente.
- Biblioteca con ~12 estudios reales (DOI donde verificado).
- Export CSV/JSON, modo día/noche, SEO base, deploy a GitHub Pages + Action mensual.

## Fase 1 — Datos reales y profundidad
- [ ] Reemplazar `estimate` por cifras citables (DataReportal/ITU por país, WHO-HBSC, PISA 2022, EU Kids Online).
- [ ] Microdatos por **edad, género y año** (habilita los filtros completos del módulo Investigadores).
- [ ] Sección Perú con cifras INEI/MINSA/MINEDU verificadas y por región.
- [ ] Ampliar la biblioteca (PubMed/Scopus) con tagging por módulo y país.

## Fase 2 — 🌐 Internacionalización (10 idiomas más usados) ← prioridad solicitada
Objetivo: presentar la plataforma en los **10 idiomas más hablados del mundo** para maximizar alcance académico y de difusión.

### Idiomas objetivo (por número total de hablantes, Ethnologue 2023)

| # | Idioma | Código | Hablantes (aprox.) | Dirección | Notas |
|---|--------|--------|--------------------|-----------|-------|
| 1 | Inglés | `en` | ~1,500 M | LTR | idioma puente / académico |
| 2 | Chino mandarín | `zh` | ~1,140 M | LTR | usar Hans (simplificado) |
| 3 | Hindi | `hi` | ~610 M | LTR | script devanagari |
| 4 | Español | `es` | ~560 M | LTR | **idioma base actual** |
| 5 | Francés | `fr` | ~310 M | LTR | |
| 6 | Árabe (estándar) | `ar` | ~270 M | **RTL** | requiere `dir="rtl"` |
| 7 | Bengalí | `bn` | ~270 M | LTR | |
| 8 | Portugués | `pt` | ~260 M | LTR | foco Brasil (LATAM) |
| 9 | Ruso | `ru` | ~255 M | LTR | |
| 10 | Indonesio | `id` | ~200 M | LTR | |

> Orden de implementación sugerido: **es → en → pt → fr → zh → ar → hi → ru → bn → id**
> (primero los de mayor relevancia para el público objetivo y la difusión LATAM/global).

### Plan técnico de i18n
- **Librería:** `react-i18next` + `i18next-browser-languagedetector`.
- **Separar UI de datos:** los textos de interfaz van en `src/locales/<lng>/common.json`; los **datos** (JSON del ETL) llevan campos neutros (códigos ISO, números) y las **etiquetas traducibles** (nombres de indicadores, hallazgos) se referencian por clave o se traducen en una capa aparte (`data/i18n/`), no se duplica el dataset.
- **Selector de idioma** en el header (junto al toggle de tema), con persistencia en `localStorage` y `lang`/`dir` en `<html>`.
- **RTL:** para árabe, alternar `dir="rtl"` y revisar layout (sidebar, gráficos ECharts soportan RTL en ejes/leyendas).
- **Números/fechas:** `Intl.NumberFormat`/`Intl.DateTimeFormat` por locale (ya usamos `es-PE`).
- **Traducción:** primero máquina (LLM/DeepL) + **revisión humana** de los términos científicos sensibles (no overclaiming en la terminología clínica).
- **SEO multilingüe:** `hreflang` por idioma, rutas `/{lng}/...` o parámetro, `sitemap` con alternates, OG localizado.
- **Nombres de país:** usar `Intl.DisplayNames` por locale para no mantener listas a mano.

### Entregables Fase 2
- `src/locales/{en,es,pt,...}/common.json`
- `<LanguageSwitcher />` + hook `useT()`
- `hreflang` + sitemap multilingüe
- Guía de contribución de traducciones (`docs/i18n_contributing.md`)

## Fase 3 — Inteligencia y comunidad
- [ ] Asistente de evidencia (responde con estudios citados de la biblioteca).
- [ ] Comparador de países lado a lado y “fichas país” descargables (PDF/PNG).
- [ ] Envío de estudios por la comunidad (PR con plantilla JSON validada en CI).
- [ ] Alertas de nuevos reportes (WHO/UNICEF/Pew) vía Action.

## Hitos transversales
- Auditoría de accesibilidad (WCAG 2.1 AA, Lighthouse ≥ 90).
- Tests del ETL y validación de esquema JSON en CI.
- Política editorial anti-overclaiming (correlación ≠ causalidad, tamaños de efecto).
