import { useTranslation } from "react-i18next";
import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import EChart from "../components/EChart";
import { baseOption } from "../lib/echart-theme";
import { PALETTE } from "../lib/format";

export default function Riesgos() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { risks } = useData();
  const { t } = useTranslation();
  if (!risks) return null;

  const bar = {
    ...baseOption(),
    grid: { left: 180, right: 24, top: 10, bottom: 30 },
    color: [PALETTE.rose],
    xAxis: { type: "value", axisLabel: { color: "#64748b", formatter: "{value}%" }, splitLine: { lineStyle: { color: "rgba(148,163,184,0.25)", type: "dashed" } } },
    yAxis: { type: "category", inverse: true, data: risks.rows.map((r) => t(`data.risk.${r.key}`)), axisLabel: { color: "#94a3b8", fontSize: 11 }, axisLine: { lineStyle: { color: "rgba(148,163,184,0.35)" } } },
    series: [{ type: "bar", data: risks.rows.map((r) => r.prevalence_pct), itemStyle: { borderRadius: [0, 3, 3, 0] }, barWidth: "58%" }],
  };
  const byAge = {
    ...baseOption(),
    color: [PALETTE.amber],
    xAxis: { ...baseOption().xAxis, data: risks.by_age.map((r) => `${r.age}`) },
    yAxis: { ...baseOption().yAxis, axisLabel: { color: "#64748b", formatter: "{value}%" } },
    series: [{ type: "line", smooth: true, areaStyle: { opacity: 0.12 }, data: risks.by_age.map((r) => r.problematic_use_pct) }],
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-bold text-slate-100">{t("risks.title")}</h1></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title={t("risks.prevTitle")} subtitle={t("risks.prevSub")}><EChart option={bar} height={360} /></ChartCard>
        <ChartCard title={t("risks.byAgeTitle")} subtitle={t("risks.byAgeSub")}><EChart option={byAge} height={360} /></ChartCard>
      </div>
      <div className="card text-sm text-slate-400">{t("risks.note")}</div>
    </div>
  );
}
