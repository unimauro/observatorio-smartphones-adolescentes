import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import { localizeCountry } from "../lib/geo";

export default function Investigadores() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { countries, mental } = useData();
  const { t, i18n } = useTranslation();
  const lng = (i18n.resolvedLanguage || "es").slice(0, 2);
  const [region, setRegion] = useState("");
  const [q, setQ] = useState("");

  const regions = useMemo(() => ["", ...Array.from(new Set(countries.map((c) => c.region)))], [countries]);
  const mmap = useMemo(() => Object.fromEntries((mental?.rows ?? []).map((m) => [m.country, m])), [mental]);

  const merged = useMemo(() => countries
    .filter((c) => (!region || c.region === region) && (!q || c.country.toLowerCase().includes(q.toLowerCase())))
    .map((c) => ({
      pais: c.country, region: c.region, iso3: c.iso3,
      acceso_smartphone_pct: c.smartphone_access_pct, edad_primer_smartphone: c.first_phone_age,
      horas_dia: c.daily_hours, uso_redes_pct: c.social_media_pct, internet_pct: c.internet_penetration_pct,
      depresion_pct: mmap[c.country]?.depression_pct ?? "", ansiedad_pct: mmap[c.country]?.anxiety_pct ?? "",
      ciberacoso_pct: mmap[c.country]?.cyberbullying_victim_pct ?? "", estado: c.status,
    })), [countries, mmap, region, q]);

  const download = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };
  const exportJSON = () => download(JSON.stringify(merged, null, 2), "observatorio_adolescentes.json", "application/json");
  const exportCSV = () => {
    if (!merged.length) return;
    const cols = Object.keys(merged[0]);
    const csv = [cols.join(","), ...merged.map((r) => cols.map((c) => JSON.stringify((r as any)[c] ?? "")).join(","))].join("\n");
    download(csv, "observatorio_adolescentes.csv", "text/csv");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">{t("researchers.title")}</h1>
        <p className="text-sm text-slate-500">{t("researchers.subtitle")}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("common.searchCountry")}
          className="bg-ink-800 border border-ink-600 rounded-md px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-teal/60" />
        {regions.map((r) => (
          <button key={r || "all"} onClick={() => setRegion(r)}
            className={`text-xs px-2.5 py-1.5 rounded border ${region === r ? "border-brand-teal/60 text-brand-teal bg-brand-teal/10" : "border-ink-600 text-slate-400"}`}>
            {r || t("common.allRegions")}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button onClick={exportCSV} className="text-xs px-3 py-1.5 rounded-md bg-brand-teal/20 text-brand-teal border border-brand-teal/40 hover:bg-brand-teal/30">⬇ CSV</button>
          <button onClick={exportJSON} className="text-xs px-3 py-1.5 rounded-md bg-brand-indigo/20 text-brand-indigo border border-brand-indigo/40 hover:bg-brand-indigo/30">⬇ JSON</button>
        </div>
      </div>

      <ChartCard title={t("researchers.count", { n: merged.length })} subtitle={t("researchers.datasetSub")}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs tabular">
            <thead>
              <tr className="text-slate-500 border-b border-ink-600 text-left">
                {[t("common.country"), t("common.region"), t("metric.access"), t("metric.age"), t("metric.hours"), t("metric.social"), t("metric.internet"), t("mental.dim.depression"), t("mental.dim.anxiety"), t("mental.dim.cyber")].map((h, i) => (
                  <th key={i} className="py-2 px-2 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {merged.map((r) => (
                <tr key={r.iso3} className="border-b border-ink-700/50 hover:bg-ink-700/40 text-slate-300">
                  <td className="py-1.5 px-2 text-slate-100 font-medium whitespace-nowrap">{localizeCountry(r.pais, lng)}</td>
                  <td className="px-2 whitespace-nowrap">{r.region}</td>
                  <td className="px-2">{r.acceso_smartphone_pct}</td>
                  <td className="px-2">{r.edad_primer_smartphone}</td>
                  <td className="px-2">{r.horas_dia}</td>
                  <td className="px-2">{r.uso_redes_pct}</td>
                  <td className="px-2">{r.internet_pct}</td>
                  <td className="px-2">{String(r.depresion_pct)}</td>
                  <td className="px-2">{String(r.ansiedad_pct)}</td>
                  <td className="px-2">{String(r.ciberacoso_pct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      <div className="card text-xs text-slate-500">{t("researchers.note")}</div>
    </div>
  );
}
