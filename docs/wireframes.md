# Wireframes

Layout: **sidebar fija** (10 módulos) + header (toggle día/noche + badge de fuentes) + área de contenido en grilla. Estilo dashboard de investigación, limpio, alta densidad informativa.

## Marco general
```
┌──────────────┬─────────────────────────────────────────────────────┐
│ OBSERVATORIO │  Uso de smartphones en adolescentes   [☀ Día][ⓘ Fuentes]│
│ Adol&Pantallas├─────────────────────────────────────────────────────┤
│ 28 países    │                                                      │
│ 🌐 Panorama  │   (contenido del módulo activo)                      │
│ 🧠 Salud M.  │                                                      │
│ 🎓 Educación │                                                      │
│ ⚠️ Riesgos   │                                                      │
│ 👨‍👩‍👧 Familia │                                                      │
│ 🌎 LATAM     │                                                      │
│ 🇵🇪 Perú      │                                                      │
│ 📚 Biblioteca│                                                      │
│ 🕰️ Timeline  │                                                      │
│ 🔬 Investig. │                                                      │
└──────────────┴─────────────────────────────────────────────────────┘
```

## 1. Panorama Mundial
```
[Acceso prom.][Horas/día][Edad 1er móvil][Redes prom.]   ← KPIs
[Indicador del mapa: Acceso | Horas | Edad | Redes | Internet]
┌─────────────────────────────────────────────────────┐
│  🗺️ Mapa Leaflet — burbujas ∝ indicador, popup país  │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│  Ranking de países (barras horizontales)             │
└─────────────────────────────────────────────────────┘
```

## 2. Salud Mental
```
[Ansiedad][Depresión][Ciberacoso][Sueño]      ← KPIs
[ Barras agrupadas por país: ansiedad/depresión/soledad/ciberacoso/sueño ]
[ Dispersión horas-pantalla ↔ síntomas + línea de tendencia ]  ⚠ correlación≠causalidad
```

## 3–5. Educación / Riesgos / Familia
```
┌───────────────┐ ┌───────────────┐   2 gráficos lado a lado
│ uso vs distrac│ │ skills vs perf│   + nota interpretativa
└───────────────┘ └───────────────┘
```

## 6. LATAM
```
[ Barras: acceso/redes/internet ] [ Barras: depresión/ciberacoso ]
[ Tabla comparativa 6 países ]
```

## 7. Perú
```
[ KPIs nacionales con fuente + estado (INEI/MINSA/MINEDU) ]
[ Lista de fuentes oficiales con enlace ]
[ Estudios regionales en la biblioteca ]
```

## 8. Biblioteca
```
[ 🔎 buscador ............ ] [Todos][Salud][Educación][Riesgos][LATAM]
┌─────────────────────────────────────────────────────┐
│ Título (año) · autores · fuente · país               │
│ hallazgo principal · n · edad · DOI →                │
└─────────────────────────────────────────────────────┘
```

## 9. Línea de Tiempo
```
2005 ● YouTube
2007 ● iPhone
...   ● ...
2024 ● The Anxious Generation / HBSC
```

## 10. Investigadores
```
[🔎 país][Región: chips]                 [⬇ CSV][⬇ JSON]
┌─────────────────────────────────────────────────────┐
│ Tabla consolidada (panorama + salud mental) + estado │
└─────────────────────────────────────────────────────┘
```

## Lineamientos de accesibilidad
- Contraste ≥ 4.5:1; color como refuerzo, nunca único portador de significado.
- Navegación por teclado; `aria-label` en gráficos, mapa y formularios.
- `prefers-reduced-motion`: sin animaciones.
- Cifras con `tabular-nums`. Estado del dato comunicado por **texto + color**.
- Preparado para RTL (árabe) en la Fase 2 de i18n.
```
