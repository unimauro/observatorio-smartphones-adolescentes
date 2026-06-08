// Tipos y carga de los JSON generados por etl/build_data.py.

export interface Country {
  country: string; iso3: string; region: string; lat: number; lng: number;
  smartphone_access_pct: number; first_phone_age: number; daily_hours: number;
  social_media_pct: number; internet_penetration_pct: number; status: string; source: string;
}
export interface MentalRow {
  country: string; anxiety_pct: number; depression_pct: number; stress_pct: number;
  loneliness_pct: number; cyberbullying_victim_pct: number; sleep_problems_pct: number;
  low_self_esteem_pct: number; status: string;
}
export interface Mental {
  rows: MentalRow[];
  correlation: { x_label: string; y_label: string; points: { daily_hours: number; depression_pct: number }[]; note: string; status: string };
}
export interface EduRow { country: string; academic_perception: number; educational_use_pct: number; classroom_distraction_pct: number; digital_skills_pct: number; }
export interface Education { rows: EduRow[]; note: string }
export interface Risks {
  rows: { key: string; risk: string; prevalence_pct: number; source: string; status: string }[];
  by_age: { age: number; problematic_use_pct: number }[]; note: string;
}
export interface Family {
  rows: { key: string; metric: string; value_pct: number; status: string; source: string }[];
  first_phone_given_age: { country: string; age: number }[];
}
export interface Latam { rows: any[]; note: string }
export interface Peru {
  country: string;
  indicators: { key: string; metric: string; value_pct: number; source: string; status: string }[];
  note: string; sources: { name: string; url: string }[];
}
export interface Study {
  id: number; title: string; authors: string; year: number; country: string;
  sample: number | null; age: string; findings: string; doi: string | null;
  source: string; module: string; status: string;
}
export interface Studies { count: number; rows: Study[] }
export interface Timeline { rows: { key: string; year: number; title: string; desc: string }[] }
export interface Meta {
  title: string; generated_by: string; n_countries: number; n_studies: number;
  disclaimer: string; sources: string[];
}

const base = import.meta.env.BASE_URL;
async function get<T>(name: string): Promise<T> {
  const r = await fetch(`${base}data/${name}`);
  if (!r.ok) throw new Error(`No se pudo cargar ${name}: ${r.status}`);
  return r.json() as Promise<T>;
}

export const loadAll = () => Promise.all([
  get<{ indicator_unit: string; rows: Country[] }>("countries.json"),
  get<Mental>("mental_health.json"),
  get<Education>("education.json"),
  get<Risks>("risks.json"),
  get<Family>("family.json"),
  get<Latam>("latam.json"),
  get<Peru>("peru.json"),
  get<Studies>("studies.json"),
  get<Timeline>("timeline.json"),
  get<Meta>("meta.json"),
]);
