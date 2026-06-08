import { useTranslation } from "react-i18next";
import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import EChart from "../components/EChart";
import { baseOption } from "../lib/echart-theme";
import { PALETTE } from "../lib/format";
import { localizeCountry } from "../lib/geo";

export default function Familia() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { family } = useData();
  const { t, i18n } = useTranslation();
  const lng = (i18n.resolvedLanguage || "es").slice(0, 2);
  if (!family) return null;

  const bar = {
    ...baseOption(),
    grid: { left: 200, right: 24, top: 10, bottom: 30 },
    color: [PALETTE.teal],
    xAxis: { type: "value", max: 100, axisLabel: { color: "#64748b", formatter: "{value}%" }, splitLine: { lineStyle: { color: "rgba(148,163,184,0.25)", type: "dashed" } } },
    yAxis: { type: "category", inverse: true, data: family.rows.map((r) => r.metric), axisLabel: { color: "#94a3b8", fontSize: 11 }, axisLine: { lineStyle: { color: "rgba(148,163,184,0.35)" } } },
    series: [{ type: "bar", data: family.rows.map((r) => r.value_pct), itemStyle: { borderRadius: [0, 3, 3, 0] }, barWidth: "55%" }],
  };
  const ages = {
    ...baseOption(),
    color: [PALETTE.violet],
    xAxis: { ...baseOption().xAxis, data: family.first_phone_given_age.map((r) => localizeCountry(r.country, lng)) },
    yAxis: { ...baseOption().yAxis, min: 9 },
    series: [{ type: "bar", data: family.first_phone_given_age.map((r) => r.age), itemStyle: { borderRadius: [3, 3, 0, 0] }, barWidth: "50%" }],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">{t("family.title")}</h1>
        <p className="text-sm text-slate-500">{t("family.subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title={t("family.stratTitle")} subtitle={t("family.stratSub")}><EChart option={bar} height={340} /></ChartCard>
        <ChartCard title={t("family.agesTitle")} subtitle={t("family.agesSub")}><EChart option={ages} height={340} /></ChartCard>
      </div>
      <div className="card text-sm text-slate-400">{t("family.note")}</div>
    </div>
  );
}
