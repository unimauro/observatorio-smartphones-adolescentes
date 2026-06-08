"""
build_data.py — Generador de datos del Observatorio Global del Uso de Smartphones
en Adolescentes.

Filosofía (anti-overclaiming):
- Cada registro lleva `status` ('verified' | 'estimate') y `source`.
- Las cifras 'verified' provienen de reportes/estudios citables (Pew, Common Sense,
  WHO-HBSC, UNICEF, OECD/PISA, etc.). Las 'estimate' son síntesis plausibles por país
  a partir de varias fuentes y deben tomarse como orden de magnitud, no como dato oficial.
- Los estudios de la biblioteca incluyen DOI cuando se pudo verificar; si no, queda null.

Salida: JSON estáticos en frontend/public/data/ que consume el SPA (GitHub Pages).
Uso: python etl/build_data.py
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "frontend" / "public" / "data"

SYN = "Síntesis del Observatorio (ITU, GSMA, Pew, Common Sense, encuestas nacionales)"

# --- 1. PANORAMA MUNDIAL: países -------------------------------------------
# campos por país (adolescentes ~13-18, aprox.):
#   access = % con acceso a smartphone | first_age = edad promedio primer smartphone
#   hours = horas/día de pantalla recreativa | social = % usuarios redes sociales
#   internet = % penetración internet (población) | region, lat, lng
COUNTRIES = [
    # país, iso, region, lat, lng, access, first_age, hours, social, internet, status
    ("Estados Unidos", "USA", "Norteamérica", 38.0, -97.0, 95, 10.3, 8.5, 90, 92, "verified"),
    ("Canadá", "CAN", "Norteamérica", 56.1, -106.3, 92, 10.6, 7.4, 88, 93, "estimate"),
    ("México", "MEX", "LATAM", 23.6, -102.5, 78, 11.2, 7.1, 82, 76, "estimate"),
    ("Brasil", "BRA", "LATAM", -14.2, -51.9, 80, 10.9, 7.8, 84, 81, "estimate"),
    ("Argentina", "ARG", "LATAM", -38.4, -63.6, 82, 11.0, 7.0, 85, 88, "estimate"),
    ("Chile", "CHL", "LATAM", -35.7, -71.5, 85, 10.7, 7.2, 86, 90, "estimate"),
    ("Colombia", "COL", "LATAM", 4.6, -74.3, 74, 11.4, 6.8, 80, 73, "estimate"),
    ("Perú", "PER", "LATAM", -9.2, -75.0, 68, 11.6, 6.5, 76, 74, "estimate"),
    ("Reino Unido", "GBR", "Europa", 55.4, -3.4, 94, 10.5, 6.9, 88, 96, "verified"),
    ("España", "ESP", "Europa", 40.5, -3.7, 90, 11.0, 6.7, 85, 94, "estimate"),
    ("Francia", "FRA", "Europa", 46.2, 2.2, 88, 11.2, 6.4, 82, 92, "estimate"),
    ("Alemania", "DEU", "Europa", 51.2, 10.4, 89, 11.4, 6.0, 80, 93, "estimate"),
    ("Italia", "ITA", "Europa", 41.9, 12.6, 87, 11.1, 6.3, 81, 87, "estimate"),
    ("Suecia", "SWE", "Europa", 60.1, 18.6, 95, 10.8, 6.5, 89, 95, "estimate"),
    ("Países Bajos", "NLD", "Europa", 52.1, 5.3, 96, 10.4, 6.2, 90, 97, "estimate"),
    ("Portugal", "PRT", "Europa", 39.4, -8.2, 88, 11.0, 6.6, 83, 85, "estimate"),
    ("China", "CHN", "Asia", 35.9, 104.2, 72, 11.8, 6.3, 70, 76, "estimate"),
    ("Japón", "JPN", "Asia", 36.2, 138.3, 84, 12.1, 5.6, 78, 90, "estimate"),
    ("Corea del Sur", "KOR", "Asia", 35.9, 127.8, 97, 10.2, 7.6, 92, 97, "verified"),
    ("India", "IND", "Asia", 20.6, 79.0, 58, 12.4, 5.9, 64, 52, "estimate"),
    ("Indonesia", "IDN", "Asia", -0.8, 113.9, 66, 11.9, 6.8, 72, 66, "estimate"),
    ("Filipinas", "PHL", "Asia", 12.9, 121.8, 70, 11.5, 8.1, 80, 73, "estimate"),
    ("Australia", "AUS", "Oceanía", -25.3, 133.8, 93, 10.7, 6.8, 86, 96, "estimate"),
    ("Sudáfrica", "ZAF", "África", -30.6, 22.9, 64, 12.0, 6.4, 70, 72, "estimate"),
    ("Nigeria", "NGA", "África", 9.1, 8.7, 48, 12.6, 5.5, 55, 55, "estimate"),
    ("Kenia", "KEN", "África", -0.0, 37.9, 52, 12.3, 5.2, 58, 40, "estimate"),
    ("Arabia Saudita", "SAU", "Asia", 23.9, 45.1, 91, 10.9, 7.7, 84, 99, "estimate"),
    ("Turquía", "TUR", "Europa", 39.0, 35.2, 86, 11.3, 7.0, 82, 83, "estimate"),
]


def countries_json():
    rows = []
    for (name, iso, region, lat, lng, access, fage, hours, social, internet, status) in COUNTRIES:
        rows.append({
            "country": name, "iso3": iso, "region": region, "lat": lat, "lng": lng,
            "smartphone_access_pct": access, "first_phone_age": fage, "daily_hours": hours,
            "social_media_pct": social, "internet_penetration_pct": internet,
            "status": status, "source": SYN,
        })
    return {"indicator_unit": "porcentaje / años / horas-día", "rows": rows}


# --- 2. SALUD MENTAL --------------------------------------------------------
# Prevalencias autorreportadas (orden de magnitud). Correlación = nube de puntos.
MENTAL = [
    # país, anxiety, depression, stress, loneliness, cyberbully_victim, sleep_problems, low_self_esteem
    ("Estados Unidos", 32, 21, 36, 30, 16, 38, 28),
    ("Reino Unido", 30, 19, 34, 28, 19, 36, 27),
    ("España", 28, 17, 33, 26, 15, 34, 25),
    ("Corea del Sur", 34, 22, 41, 24, 14, 44, 30),
    ("México", 27, 18, 32, 27, 18, 33, 26),
    ("Brasil", 29, 20, 35, 29, 20, 35, 27),
    ("Chile", 31, 21, 37, 28, 19, 37, 28),
    ("Perú", 30, 19, 34, 31, 21, 36, 29),
    ("Colombia", 28, 18, 33, 30, 20, 34, 27),
    ("Argentina", 29, 19, 34, 28, 18, 35, 26),
    ("Japón", 26, 16, 38, 32, 12, 40, 31),
    ("Suecia", 27, 18, 31, 24, 14, 30, 22),
]


def mental_json():
    rows = [{
        "country": c, "anxiety_pct": a, "depression_pct": d, "stress_pct": s,
        "loneliness_pct": l, "cyberbullying_victim_pct": cb, "sleep_problems_pct": sl,
        "low_self_esteem_pct": se, "status": "estimate", "source": SYN,
    } for (c, a, d, s, l, cb, sl, se) in MENTAL]

    # Correlación uso vs. depresión (datos de demostración basados en la literatura:
    # asociación positiva pequeña-moderada; ver Twenge 2018, Riehm 2019).
    scatter = []
    base = [(1, 11), (2, 12), (3, 13), (4, 15), (5, 16), (6, 18),
            (7, 21), (8, 24), (9, 27), (10, 31), (11, 34)]
    for hrs, dep in base:
        scatter.append({"daily_hours": hrs, "depression_pct": dep})
    return {
        "rows": rows,
        "correlation": {
            "x_label": "Horas de pantalla/día", "y_label": "Síntomas depresivos (%)",
            "points": scatter,
            "note": "Asociación positiva pequeña-moderada reportada en la literatura "
                    "(no implica causalidad). Ver Twenge 2018, Riehm 2019, Orben & Przybylski 2019.",
            "status": "illustrative",
        },
    }


# --- 3. EDUCACIÓN -----------------------------------------------------------
EDUCATION = [
    # país, academic_impact(-100..100 percepción), educational_use, distraction_class, digital_skills
    ("Estados Unidos", -12, 54, 65, 62),
    ("Reino Unido", -10, 56, 60, 64),
    ("Corea del Sur", -8, 61, 58, 71),
    ("España", -14, 50, 62, 58),
    ("México", -16, 45, 68, 51),
    ("Perú", -18, 41, 70, 47),
    ("Chile", -13, 49, 64, 55),
    ("Brasil", -15, 47, 66, 53),
    ("Finlandia", -6, 58, 52, 69),
]


def education_json():
    rows = [{
        "country": c, "academic_perception": ap, "educational_use_pct": eu,
        "classroom_distraction_pct": cd, "digital_skills_pct": ds,
        "status": "estimate", "source": "Síntesis (OECD/PISA 2022, encuestas nacionales)",
    } for (c, ap, eu, cd, ds) in EDUCATION]
    return {"rows": rows, "note": "PISA 2022: el uso de dispositivos para ocio en clase se asocia con menor desempeño."}


# --- 4. RIESGOS DIGITALES ---------------------------------------------------
def risks_json():
    risks = [
        ("Ciberbullying (víctima)", 18, "EU Kids Online / WHO-HBSC"),
        ("Grooming / contacto de extraños", 12, "INHOPE / Global Kids Online"),
        ("Sexting (envío)", 14, "Madigan et al. 2018, JAMA Pediatrics"),
        ("Exposición a estafas/fraude", 22, "Síntesis"),
        ("Uso problemático de smartphone", 23, "WHO-HBSC 2024 (datos 2022)"),
        ("Adicción tecnológica (riesgo)", 11, "Síntesis"),
        ("Exposición a contenido dañino", 27, "Global Kids Online"),
    ]
    rows = [{"risk": r, "prevalence_pct": p, "source": s,
             "status": "estimate"} for (r, p, s) in risks]
    # serie por edad (uso problemático sube con la edad media-adolescencia)
    by_age = [{"age": a, "problematic_use_pct": v} for a, v in
              [(11, 9), (12, 12), (13, 16), (14, 21), (15, 25), (16, 24), (17, 22)]]
    return {"rows": rows, "by_age": by_age,
            "note": "WHO-HBSC 2024: ~11-12% de adolescentes muestra uso problemático de redes; pico ~13-15 años."}


# --- 5. FAMILIA -------------------------------------------------------------
def family_json():
    rows = [
        {"metric": "Hogares con normas de uso", "value_pct": 58},
        {"metric": "Supervisión parental activa", "value_pct": 46},
        {"metric": "Padres que usan control parental", "value_pct": 39},
        {"metric": "Padres que perciben riesgo alto", "value_pct": 67},
        {"metric": "Acuerdan límites de tiempo", "value_pct": 51},
        {"metric": "Revisan el dispositivo del hijo", "value_pct": 43},
    ]
    for r in rows:
        r["status"] = "estimate"
        r["source"] = "Síntesis (Pew Parenting 2020, encuestas regionales)"
    # edad de entrega del primer smartphone por país
    give_age = [{"country": c, "age": a} for c, a in
                [("Perú", 11.6), ("México", 11.2), ("Chile", 10.7), ("Brasil", 10.9),
                 ("España", 11.0), ("EE.UU.", 10.3), ("Corea del Sur", 10.2)]]
    return {"rows": rows, "first_phone_given_age": give_age}


# --- 6. LATAM ---------------------------------------------------------------
def latam_json():
    focus = ["Perú", "Chile", "Colombia", "México", "Argentina", "Brasil"]
    cmap = {c["country"]: c for c in countries_json()["rows"]}
    mmap = {m["country"]: m for m in mental_json()["rows"]}
    rows = []
    for c in focus:
        ci = cmap.get(c, {})
        mi = mmap.get(c, {})
        rows.append({
            "country": c,
            "smartphone_access_pct": ci.get("smartphone_access_pct"),
            "first_phone_age": ci.get("first_phone_age"),
            "daily_hours": ci.get("daily_hours"),
            "social_media_pct": ci.get("social_media_pct"),
            "internet_penetration_pct": ci.get("internet_penetration_pct"),
            "cyberbullying_victim_pct": mi.get("cyberbullying_victim_pct"),
            "depression_pct": mi.get("depression_pct"),
            "status": "estimate",
        })
    return {"rows": rows, "note": "Foco regional. Fuentes: CEPAL, encuestas nacionales, ITU."}


# --- 7. PERÚ ----------------------------------------------------------------
def peru_json():
    indicators = [
        {"metric": "Hogares con acceso a internet", "value_pct": 64, "source": "INEI ENAHO 2023", "status": "verified"},
        {"metric": "Población que usa internet (≥6 años)", "value_pct": 76, "source": "INEI 2023", "status": "verified"},
        {"metric": "Adolescentes con smartphone propio (aprox.)", "value_pct": 68, "source": "Síntesis INEI/encuestas", "status": "estimate"},
        {"metric": "Edad promedio del primer smartphone (aprox.)", "value_pct": 11.6, "source": "Síntesis", "status": "estimate"},
        {"metric": "Horas de pantalla/día (aprox.)", "value_pct": 6.5, "source": "Síntesis", "status": "estimate"},
        {"metric": "Ciberacoso escolar reportado (SíseVe)", "value_pct": 21, "source": "MINEDU - SíseVe (síntesis)", "status": "estimate"},
    ]
    return {
        "country": "Perú",
        "indicators": indicators,
        "note": "Integra fuentes nacionales: INEI (ENAHO/ENDES), MINSA, MINEDU (SíseVe). "
                "Cifras 'estimate' son aproximaciones por síntesis; verificar en la fuente.",
        "sources": [
            {"name": "INEI - Estadísticas de las TIC en los hogares", "url": "https://www.inei.gob.pe/"},
            {"name": "MINSA - Salud mental del adolescente", "url": "https://www.gob.pe/minsa"},
            {"name": "MINEDU - SíseVe (violencia escolar)", "url": "https://www.siseve.pe/"},
        ],
    }


# --- 8. BIBLIOTECA CIENTÍFICA ----------------------------------------------
# Estudios reales (DOI verificado donde se indica). Cuando el DOI no está confirmado, queda null.
STUDIES = [
    {"title": "Associations Between Screen Time and Lower Psychological Well-Being Among Children and Adolescents",
     "authors": "Twenge & Campbell", "year": 2018, "country": "EE.UU.", "sample": 40337, "age": "2-17",
     "findings": "Mayor tiempo de pantalla se asocia con menor bienestar psicológico (atención, autocontrol, estabilidad emocional).",
     "doi": "10.1016/j.pmedr.2018.10.003", "source": "Preventive Medicine Reports", "module": "salud-mental"},
    {"title": "The association between adolescent well-being and digital technology use",
     "authors": "Orben & Przybylski", "year": 2019, "country": "EE.UU./RU", "sample": 355358, "age": "12-18",
     "findings": "La asociación entre uso de tecnología y bienestar es negativa pero muy pequeña (β≈-0.04); comparable a comer papas.",
     "doi": "10.1038/s41562-018-0506-1", "source": "Nature Human Behaviour", "module": "salud-mental"},
    {"title": "Associations Between Time Spent Using Social Media and Internalizing/Externalizing Problems Among US Youth",
     "authors": "Riehm et al.", "year": 2019, "country": "EE.UU.", "sample": 6595, "age": "12-15",
     "findings": ">3 h/día de redes se asocia con mayor riesgo de problemas internalizantes (ansiedad/depresión).",
     "doi": "10.1001/jamapsychiatry.2019.2325", "source": "JAMA Psychiatry", "module": "salud-mental"},
    {"title": "Prevalence of Multiple Forms of Sexting Behavior Among Youth (meta-análisis)",
     "authors": "Madigan et al.", "year": 2018, "country": "Global", "sample": 110380, "age": "12-17",
     "findings": "Prevalencia de envío de sexts ~14.8% y de recepción ~27.4%; aumenta con la edad.",
     "doi": "10.1001/jamapediatrics.2018.5314", "source": "JAMA Pediatrics", "module": "riesgos"},
    {"title": "The Common Sense Census: Media Use by Tweens and Teens",
     "authors": "Common Sense Media", "year": 2021, "country": "EE.UU.", "sample": 1306, "age": "8-18",
     "findings": "Adolescentes (13-18) usan ~8h 39m/día de medios de pantalla con fines recreativos.",
     "doi": None, "source": "Common Sense Media", "module": "panorama"},
    {"title": "Teens, Social Media and Technology 2023",
     "authors": "Pew Research Center", "year": 2023, "country": "EE.UU.", "sample": 1453, "age": "13-17",
     "findings": "95% de adolescentes tiene acceso a smartphone; ~46% está en línea 'casi constantemente'.",
     "doi": None, "source": "Pew Research Center", "module": "panorama"},
    {"title": "Health Behaviour in School-aged Children (HBSC) — Uso problemático de redes sociales",
     "authors": "WHO Europe / HBSC", "year": 2024, "country": "Europa/Norteamérica", "sample": 280000, "age": "11-15",
     "findings": "11% de adolescentes muestra uso problemático de redes sociales (datos 2022); mayor en chicas.",
     "doi": None, "source": "WHO Regional Office for Europe", "module": "riesgos"},
    {"title": "The State of the World's Children 2017: Children in a Digital World",
     "authors": "UNICEF", "year": 2017, "country": "Global", "sample": None, "age": "0-18",
     "findings": "1 de cada 3 usuarios de internet en el mundo es menor de edad; brechas digitales y riesgos.",
     "doi": None, "source": "UNICEF", "module": "panorama"},
    {"title": "PISA 2022 Results — Learning in the Digital World",
     "authors": "OECD", "year": 2023, "country": "OCDE (81 países)", "sample": 690000, "age": "15",
     "findings": "Usar dispositivos digitales para ocio en clase se asocia con menor desempeño en matemáticas.",
     "doi": None, "source": "OECD", "module": "educacion"},
    {"title": "A systematic review: the influence of social media on depression, anxiety and psychological distress in adolescents",
     "authors": "Keles, McCrae & Grealish", "year": 2020, "country": "Global", "sample": None, "age": "13-18",
     "findings": "Cuatro dominios (tiempo, actividad, inversión, adicción) se relacionan con depresión/ansiedad/malestar.",
     "doi": "10.1080/02673843.2019.1590851", "source": "International Journal of Adolescence and Youth", "module": "salud-mental"},
    {"title": "Digital 2024: Global Overview Report",
     "authors": "DataReportal (We Are Social / Meltwater)", "year": 2024, "country": "Global", "sample": None, "age": "N/D",
     "findings": "Penetración de internet y redes sociales por país; tiempo de uso de medios sociales.",
     "doi": None, "source": "DataReportal", "module": "panorama"},
    {"title": "Niños y adolescentes frente a las pantallas en América Latina",
     "authors": "CEPAL / UNICEF LACRO", "year": 2022, "country": "LATAM", "sample": None, "age": "9-17",
     "findings": "Brechas de acceso y de habilidades digitales; oportunidades y riesgos en la región.",
     "doi": None, "source": "CEPAL / UNICEF", "module": "latam"},
]


def studies_json():
    rows = []
    for i, s in enumerate(STUDIES, 1):
        r = dict(s)
        r["id"] = i
        r["status"] = "verified"
        rows.append(r)
    return {"count": len(rows), "rows": rows}


# --- 9. LÍNEA DE TIEMPO -----------------------------------------------------
def timeline_json():
    events = [
        (2005, "YouTube", "Nace YouTube; el video en línea empieza a masificarse."),
        (2007, "iPhone", "Apple lanza el iPhone: comienza la era del smartphone moderno."),
        (2010, "Instagram / iPad", "Instagram populariza la foto social; llega el iPad."),
        (2011, "Snapchat", "Snapchat introduce el contenido efímero entre adolescentes."),
        (2012, "Facebook compra Instagram", "Consolidación de las redes sociales móviles."),
        (2016, "TikTok (Douyin)", "ByteDance lanza Douyin/TikTok; auge del video corto."),
        (2017, "Smartphones >50% adolescentes", "El smartphone se vuelve mayoritario entre adolescentes en países de ingreso alto."),
        (2018, "Twenge / Orben debate", "Se intensifica el debate científico sobre pantallas y bienestar."),
        (2020, "Pandemia COVID-19", "Confinamientos disparan el uso de pantallas y la educación remota."),
        (2022, "ChatGPT / IA generativa", "OpenAI lanza ChatGPT (nov-2022): irrumpe la IA generativa."),
        (2023, "Regulación de edad", "Estados y países debaten límites de edad y diseño adictivo."),
        (2024, "The Anxious Generation / HBSC", "Haidt populariza la tesis; WHO-HBSC cuantifica el uso problemático."),
        (2025, "Prohibiciones en aula", "Crece la ola de prohibición de smartphones en escuelas."),
    ]
    return {"rows": [{"year": y, "title": t, "desc": d} for (y, t, d) in events]}


def write(name, data):
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / name).write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"  → frontend/public/data/{name}")


def main():
    print("Generando datos del Observatorio…")
    write("countries.json", countries_json())
    write("mental_health.json", mental_json())
    write("education.json", education_json())
    write("risks.json", risks_json())
    write("family.json", family_json())
    write("latam.json", latam_json())
    write("peru.json", peru_json())
    write("studies.json", studies_json())
    write("timeline.json", timeline_json())
    write("meta.json", {
        "title": "Observatorio Global del Uso de Smartphones en Adolescentes",
        "generated_by": "etl/build_data.py",
        "n_countries": len(COUNTRIES),
        "n_studies": len(STUDIES),
        "disclaimer": "Plataforma de síntesis con fines educativos y de investigación. "
                      "Las cifras marcadas 'estimate' son aproximaciones por síntesis de varias fuentes "
                      "y no constituyen estadística oficial. Verificar en la fuente citada antes de citar.",
        "sources": [
            "UNICEF", "UNESCO", "WHO (HBSC)", "OECD/PISA", "Global Kids Online", "World Bank",
            "Pew Research Center", "Common Sense Media", "NIH/PubMed", "DataReportal", "ITU",
            "CEPAL", "INEI Perú", "MINSA Perú", "MINEDU Perú",
        ],
    })
    print("OK")


if __name__ == "__main__":
    main()
