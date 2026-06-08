import { useTranslation } from "react-i18next";
import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import EChart from "../components/EChart";
import { baseOption } from "../lib/echart-theme";
import { PALETTE, pct, hrs, yrs } from "../lib/format";
import { localizeCountry } from "../lib/geo";

export default function Latam() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { latam } = useData();
  const { t, i18n } = useTranslation();
  const lng = (i18n.resolvedLanguage || "es").slice(0, 2);
  if (!latam) return null;
  const rows = latam.rows;
  const names = rows.map((r) => localizeCountry(r.country, lng));

  const usage = {
    ...baseOption(),
    color: [PALETTE.teal, PALETTE.sky, PALETTE.indigo],
    legend: { ...baseOption().legend, data: [t("latam.legendAccess"), t("latam.legendSocial"), t("latam.legendInternet")] },
    xAxis: { ...baseOption().xAxis, data: names },
    yAxis: { ...baseOption().yAxis, axisLabel: { color: "#64748b", formatter: "{value}%" } },
    series: [
      { name: t("latam.legendAccess"), type: "bar", data: rows.map((r) => r.smartphone_access_pct) },
      { name: t("latam.legendSocial"), type: "bar", data: rows.map((r) => r.social_media_pct) },
      { name: t("latam.legendInternet"), type: "bar", data: rows.map((r) => r.internet_penetration_pct) },
    ],
  };
  const wellbeing = {
    ...baseOption(),
    color: [PALETTE.violet, PALETTE.amber],
    legend: { ...baseOption().legend, data: [t("latam.legendDepression"), t("latam.legendCyber")] },
    xAxis: { ...baseOption().xAxis, data: names },
    yAxis: { ...baseOption().yAxis, axisLabel: { color: "#64748b", formatter: "{value}%" } },
    series: [
      { name: t("latam.legendDepression"), type: "bar", data: rows.map((r) => r.depression_pct) },
      { name: t("latam.legendCyber"), type: "bar", data: rows.map((r) => r.cyberbullying_victim_pct) },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">{t("latam.title")}</h1>
        <p className="text-sm text-slate-500">{t("latam.subtitle")}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title={t("latam.usageTitle")} subtitle={t("latam.usageSub")}><EChart option={usage} /></ChartCard>
        <ChartCard title={t("latam.wellTitle")} subtitle={t("latam.wellSub")}><EChart option={wellbeing} /></ChartCard>
      </div>
      <ChartCard title={t("latam.tableTitle")} subtitle={t("latam.tableSub")}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-ink-600 text-left">
                <th className="py-2 pr-3">{t("common.country")}</th><th className="px-3">{t("metric.access")}</th><th className="px-3">{t("metric.age")}</th>
                <th className="px-3">{t("metric.hours")}</th><th className="px-3">{t("metric.social")}</th><th className="px-3">{t("metric.internet")}</th>
                <th className="px-3">{t("latam.legendDepression")}</th><th className="px-3">{t("latam.legendCyber")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.country} className="border-b border-ink-700/50 hover:bg-ink-700/40 text-slate-300">
                  <td className="py-1.5 pr-3 font-medium text-slate-100">{localizeCountry(r.country, lng)}</td>
                  <td className="px-3 tabular">{pct(r.smartphone_access_pct)}</td>
                  <td className="px-3 tabular">{yrs(r.first_phone_age)}</td>
                  <td className="px-3 tabular">{hrs(r.daily_hours)}</td>
                  <td className="px-3 tabular">{pct(r.social_media_pct)}</td>
                  <td className="px-3 tabular">{pct(r.internet_penetration_pct)}</td>
                  <td className="px-3 tabular">{pct(r.depression_pct)}</td>
                  <td className="px-3 tabular">{pct(r.cyberbullying_victim_pct)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
