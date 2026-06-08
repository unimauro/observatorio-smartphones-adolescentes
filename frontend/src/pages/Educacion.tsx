import { useTranslation } from "react-i18next";
import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import EChart from "../components/EChart";
import { baseOption } from "../lib/echart-theme";
import { PALETTE } from "../lib/format";
import { localizeCountry } from "../lib/geo";

export default function Educacion() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { education } = useData();
  const { t, i18n } = useTranslation();
  const lng = (i18n.resolvedLanguage || "es").slice(0, 2);
  if (!education) return null;
  const rows = education.rows;
  const cats = rows.map((r) => localizeCountry(r.country, lng));

  const useVsDistract = {
    ...baseOption(),
    color: [PALETTE.teal, PALETTE.rose],
    legend: { ...baseOption().legend, data: [t("education.legendUse"), t("education.legendDistract")] },
    xAxis: { ...baseOption().xAxis, data: cats, axisLabel: { color: "#94a3b8", rotate: 25, fontSize: 10 } },
    yAxis: { ...baseOption().yAxis, axisLabel: { color: "#64748b", formatter: "{value}%" } },
    series: [
      { name: t("education.legendUse"), type: "bar", data: rows.map((r) => r.educational_use_pct) },
      { name: t("education.legendDistract"), type: "bar", data: rows.map((r) => r.classroom_distraction_pct) },
    ],
  };
  const skillsVsPerf = {
    ...baseOption(),
    color: [PALETTE.indigo, PALETTE.amber],
    legend: { ...baseOption().legend, data: [t("education.legendSkills"), t("education.legendPerf")] },
    xAxis: { ...baseOption().xAxis, data: cats, axisLabel: { color: "#94a3b8", rotate: 25, fontSize: 10 } },
    yAxis: { ...baseOption().yAxis },
    series: [
      { name: t("education.legendSkills"), type: "bar", data: rows.map((r) => r.digital_skills_pct) },
      { name: t("education.legendPerf"), type: "line", smooth: true, data: rows.map((r) => r.academic_perception) },
    ],
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-xl font-bold text-slate-100">{t("education.title")}</h1></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title={t("education.useVsDistract")} subtitle={t("education.useVsDistractSub")}><EChart option={useVsDistract} /></ChartCard>
        <ChartCard title={t("education.skillsVsPerf")} subtitle={t("education.skillsVsPerfSub")}><EChart option={skillsVsPerf} /></ChartCard>
      </div>
      <div className="card text-sm text-slate-400">{t("education.note")}</div>
    </div>
  );
}
