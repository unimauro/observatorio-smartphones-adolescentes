export const PALETTE = {
  teal: "#2dd4bf", indigo: "#818cf8", amber: "#fbbf24", rose: "#fb7185",
  green: "#34d399", red: "#f87171", sky: "#38bdf8", violet: "#a78bfa", slate: "#94a3b8",
};

const nf = (o: Intl.NumberFormatOptions) => new Intl.NumberFormat("es-PE", o);

export const pct = (v: number | null | undefined, d = 0) =>
  v === null || v === undefined ? "—" : `${nf({ maximumFractionDigits: d }).format(v)}%`;
export const num = (v: number | null | undefined, d = 1) =>
  v === null || v === undefined ? "—" : nf({ maximumFractionDigits: d }).format(v);
export const hrs = (v: number | null | undefined) =>
  v === null || v === undefined ? "—" : `${nf({ maximumFractionDigits: 1 }).format(v)} h`;
export const yrs = (v: number | null | undefined) =>
  v === null || v === undefined ? "—" : `${nf({ maximumFractionDigits: 1 }).format(v)} años`;

/** Color de un valor 0..100 en escala teal→amber→rose (más alto = más intenso). */
export function heat(v: number, min = 40, max = 100): string {
  const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
  if (t < 0.5) return lerp("#38bdf8", "#fbbf24", t * 2);
  return lerp("#fbbf24", "#fb7185", (t - 0.5) * 2);
}
function lerp(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const c = pa.map((x, i) => Math.round(x + (pb[i] - x) * t));
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
