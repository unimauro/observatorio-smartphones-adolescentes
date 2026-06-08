import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useData } from "../lib/store";
import PageState from "../components/PageState";
import KpiCard from "../components/KpiCard";
import ChartCard from "../components/ChartCard";
import EChart from "../components/EChart";
import WorldMap, { type MapMetric } from "../components/WorldMap";
import { baseOption } from "../lib/echart-theme";
import { PALETTE, pct, hrs, yrs } from "../lib/format";
import { localizeCountry } from "../lib/geo";

const METRICS: { id: MapMetric; key: string }[] = [
  { id: "smartphone_access_pct", key: "access" },
  { id: "daily_hours", key: "hours" },
  { id: "first_phone_age", key: "age" },
  { id: "social_media_pct", key: "social" },
  { id: "internet_penetration_pct", key: "internet" },
];

export default function Panorama() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { countries } = useData();
  const { t, i18n } = useTranslation();
  const lng = (i18n.resolvedLanguage || "es").slice(0, 2);
  const [metric, setMetric] = useState<MapMetric>("smartphone_access_pct");
  const metricLabel = t(`metric.${METRICS.find((m) => m.id === metric)!.key}`);

  const avg = (k: keyof typeof countries[0]) =>
    countries.reduce((s, c) => s + (c[k] as number), 0) / (countries.length || 1);

  const ranked = useMemo(() => {
    const asc = metric === "first_phone_age";
    return [...countries].sort((a, b) => (asc ? 1 : -1) * ((b[metric] as number) - (a[metric] as number))).slice(0, 14);
  }, [countries, metric]);

  const barOpt = {
    ...baseOption(),
    grid: { left: 120, right: 24, top: 10, bottom: 30 },
    color: [PALETTE.teal],
    xAxis: { type: "value", axisLabel: { color: "#64748b" }, splitLine: { lineStyle: { color: "rgba(148,163,184,0.25)", type: "dashed" } } },
    yAxis: { type: "category", inverse: true, data: ranked.map((c) => localizeCountry(c.country, lng)), axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "rgba(148,163,184,0.35)" } } },
    series: [{ type: "bar", data: ranked.map((c) => +(c[metric] as number).toFixed(1)), itemStyle: { borderRadius: [0, 3, 3, 0] }, barWidth: "60%" }],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">{t("panorama.title")}</h1>
        <p className="text-sm text-slate-500">{t("panorama.subtitle")}</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label={t("panorama.kpiAccess")} value={pct(avg("smartphone_access_pct"))} tone="info" />
        <KpiCard label={t("panorama.kpiHours")} value={hrs(avg("daily_hours"))} tone="warn" />
        <KpiCard label={t("panorama.kpiAge")} value={yrs(avg("first_phone_age"))} />
        <KpiCard label={t("panorama.kpiSocial")} value={pct(avg("social_media_pct"))} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 mr-1">{t("panorama.indicatorLabel")}</span>
        {METRICS.map((m) => (
          <button key={m.id} onClick={() => setMetric(m.id)}
            className={`text-xs px-2.5 py-1.5 rounded border transition-colors ${metric === m.id ? "border-brand-teal/60 text-brand-teal bg-brand-teal/10" : "border-ink-600 text-slate-400"}`}>
            {t(`metric.${m.key}`)}
          </button>
        ))}
      </div>

      <ChartCard title={t("panorama.mapTitle")} subtitle={t("panorama.mapSubtitle")}>
        <WorldMap countries={countries} metric={metric} lng={lng} metricLabel={metricLabel} />
      </ChartCard>

      <ChartCard title={t("panorama.rankingTitle", { metric: metricLabel })} subtitle={t("panorama.rankingSub")}>
        <EChart option={barOpt} height={400} />
      </ChartCard>
    </div>
  );
}
