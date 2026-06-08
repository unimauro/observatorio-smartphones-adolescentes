import { useTranslation } from "react-i18next";
import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import KpiCard from "../components/KpiCard";
import { num } from "../lib/format";

export default function Peru() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { peru, studies } = useData();
  const { t } = useTranslation();
  if (!peru) return null;
  const peruStudies = studies?.rows.filter((s) => /per[uú]|latam/i.test(s.country)) ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">🇵🇪 {t("peru.title")}</h1>
        <p className="text-sm text-slate-500 max-w-3xl">{peru.note}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {peru.indicators.map((ind) => (
          <KpiCard key={ind.metric} label={ind.metric}
            value={ind.metric.includes("Edad") || ind.metric.includes("Horas") ? num(ind.value_pct, 1) : `${num(ind.value_pct, 0)}%`}
            sub={`${ind.source} · ${ind.status === "verified" ? t("common.verified") : t("common.estimate")}`}
            tone={ind.status === "verified" ? "good" : "warn"} />
        ))}
      </div>

      <ChartCard title={t("peru.sourcesTitle")} subtitle={t("peru.sourcesSub")}>
        <ul className="text-sm space-y-2">
          {peru.sources.map((s) => (
            <li key={s.url} className="flex items-center gap-2">
              <span className="text-brand-teal">▸</span>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-brand-sky hover:underline">{s.name}</a>
            </li>
          ))}
        </ul>
      </ChartCard>

      {peruStudies.length > 0 && (
        <ChartCard title={t("peru.studiesTitle")} subtitle={t("peru.studiesSub")}>
          <ul className="text-sm space-y-2">
            {peruStudies.map((s) => (
              <li key={s.id} className="text-slate-300">
                <span className="text-slate-100 font-medium">{s.title}</span> — {s.authors} ({s.year}, {s.source})
              </li>
            ))}
          </ul>
        </ChartCard>
      )}

      <div className="card text-sm text-slate-400">{t("peru.note")}</div>
    </div>
  );
}
