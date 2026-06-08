# Procedencia y estado de los datos

> **Aviso de integridad (anti-overclaiming).**
> Esta plataforma es una **síntesis con fines educativos y de investigación**. Cada indicador lleva un
> estado: `verified` (cifra citable de un reporte/estudio concreto) o `estimate` (síntesis plausible de
> varias fuentes; tómese como orden de magnitud, **no** como estadística oficial). La nube de correlación
> es `illustrative` (demostrativa del método). **Verificar siempre en la fuente antes de citar.**

## Cómo se construyen los datos
`etl/build_data.py` contiene la curaduría: combina cifras conocidas de reportes públicos (estado `verified`)
con estimaciones por país (estado `estimate`) para permitir comparaciones. La **Biblioteca** (`studies.json`)
solo contiene estudios reales; el `doi` queda `null` cuando no se pudo verificar.

## Estudios con DOI verificado (selección)
| Estudio | Fuente | DOI |
|---|---|---|
| Twenge & Campbell 2018 — pantallas y bienestar | Preventive Medicine Reports | 10.1016/j.pmedr.2018.10.003 |
| Orben & Przybylski 2019 — tecnología y bienestar | Nature Human Behaviour | 10.1038/s41562-018-0506-1 |
| Riehm et al. 2019 — redes y problemas internalizantes | JAMA Psychiatry | 10.1001/jamapsychiatry.2019.2325 |
| Madigan et al. 2018 — prevalencia de sexting | JAMA Pediatrics | 10.1001/jamapediatrics.2018.5314 |
| Keles et al. 2020 — redes y depresión/ansiedad | Int. J. Adolescence and Youth | 10.1080/02673843.2019.1590851 |

Reportes sin DOI (institucionales) citados: Pew Research Center (Teens 2023), Common Sense Media (Census 2021),
WHO/HBSC (2024, datos 2022), UNICEF (SOWC 2017), OECD/PISA 2022, DataReportal (Digital 2024), CEPAL/UNICEF.

## Fuentes para elevar a `verified`
UNICEF · UNESCO · WHO (HBSC) · OECD/PISA · Global Kids Online · World Bank · Pew Research Center ·
Common Sense Media · NIH/PubMed · Scopus · DataReportal/ITU · CEPAL · INEI Perú · MINSA Perú · MINEDU Perú (SíseVe).

## Advertencias de interpretación
- **Correlación ≠ causalidad.** La asociación promedio entre tiempo de pantalla y bienestar es pequeña-moderada
  (Orben & Przybylski 2019) y depende del **tipo de uso**, el contexto y factores previos.
- Las prevalencias de salud mental son **autorreportadas** y varían por instrumento y año.
- Las comparaciones entre países mezclan definiciones y años; úsense como panorama, no como ranking oficial.
