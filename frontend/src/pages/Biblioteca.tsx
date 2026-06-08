import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import { num } from "../lib/format";

const MODULES = ["", "panorama", "mental", "education", "risks", "latam"];

export default function Biblioteca() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { studies } = useData();
  const { t } = useTranslation();
  const [q, setQ] = useState("");
  const [mod, setMod] = useState("");

  const rows = useMemo(() => {
    const all = studies?.rows ?? [];
    return all.filter((s) =>
      (!mod || s.module === mod) &&
      (!q || `${s.title} ${s.authors} ${s.source} ${s.country} ${s.findings}`.toLowerCase().includes(q.toLowerCase()))
    ).sort((a, b) => b.year - a.year);
  }, [studies, q, mod]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">{t("library.title")}</h1>
        <p className="text-sm text-slate-500">{t("library.subtitle")}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("common.search")}
          className="flex-1 min-w-[220px] bg-ink-800 border border-ink-600 rounded-md px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-brand-teal/60" />
        {MODULES.map((m) => (
          <button key={m || "all"} onClick={() => setMod(m)}
            className={`text-xs px-2.5 py-1.5 rounded border ${mod === m ? "border-brand-teal/60 text-brand-teal bg-brand-teal/10" : "border-ink-600 text-slate-400"}`}>
            {t(`library.mod.${m || "all"}`)}
          </button>
        ))}
      </div>

      <ChartCard title={t("library.count", { n: rows.length })} subtitle={t("library.sortedBy")}>
        <div className="space-y-3">
          {rows.map((s) => (
            <article key={s.id} className="border-b border-ink-700/60 pb-3 last:border-0">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-slate-100">{s.title}</h3>
                <span className="text-xs text-slate-500 whitespace-nowrap">{s.year}</span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{s.authors} · {s.source} · {s.country}</div>
              <p className="text-sm text-slate-300 mt-1">{s.findings}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-1.5">
                {s.sample && <span>{t("library.sample")} = {num(s.sample, 0)}</span>}
                <span>{t("library.age")} {s.age}</span>
                {s.doi
                  ? <a href={`https://doi.org/${s.doi}`} target="_blank" rel="noopener noreferrer" className="text-brand-sky hover:underline">DOI: {s.doi}</a>
                  : <span className="text-slate-600">DOI: —</span>}
              </div>
            </article>
          ))}
          {rows.length === 0 && <p className="text-sm text-slate-500">{t("library.noResults")}</p>}
        </div>
      </ChartCard>
    </div>
  );
}
