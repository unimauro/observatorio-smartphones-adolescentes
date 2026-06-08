import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import EChart from "../components/EChart";
import { baseOption } from "../lib/echart-theme";
import { PALETTE, pct, hrs, yrs } from "../lib/format";

export default function Latam() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { latam } = useData();
  if (!latam) return null;
  const rows = latam.rows;
  const names = rows.map((r) => r.country);

  const usage = {
    ...baseOption(),
    color: [PALETTE.teal, PALETTE.sky, PALETTE.indigo],
    legend: { ...baseOption().legend, data: ["Acceso smartphone", "Uso de redes", "Internet"] },
    xAxis: { ...baseOption().xAxis, data: names },
    yAxis: { ...baseOption().yAxis, axisLabel: { color: "#64748b", formatter: "{value}%" } },
    series: [
      { name: "Acceso smartphone", type: "bar", data: rows.map((r) => r.smartphone_access_pct) },
      { name: "Uso de redes", type: "bar", data: rows.map((r) => r.social_media_pct) },
      { name: "Internet", type: "bar", data: rows.map((r) => r.internet_penetration_pct) },
    ],
  };
  const wellbeing = {
    ...baseOption(),
    color: [PALETTE.violet, PALETTE.amber],
    legend: { ...baseOption().legend, data: ["Depresión", "Ciberacoso (víctima)"] },
    xAxis: { ...baseOption().xAxis, data: names },
    yAxis: { ...baseOption().yAxis, axisLabel: { color: "#64748b", formatter: "{value}%" } },
    series: [
      { name: "Depresión", type: "bar", data: rows.map((r) => r.depression_pct) },
      { name: "Ciberacoso (víctima)", type: "bar", data: rows.map((r) => r.cyberbullying_victim_pct) },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">América Latina</h1>
        <p className="text-sm text-slate-500">{latam.note}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Acceso y conectividad" subtitle="% de adolescentes / población"><EChart option={usage} /></ChartCard>
        <ChartCard title="Indicadores de bienestar" subtitle="% de adolescentes"><EChart option={wellbeing} /></ChartCard>
      </div>
      <ChartCard title="Tabla comparativa LATAM" subtitle="Perú · Chile · Colombia · México · Argentina · Brasil">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 border-b border-ink-600 text-left">
                <th className="py-2 pr-3">País</th><th className="px-3">Acceso</th><th className="px-3">1er móvil</th>
                <th className="px-3">Horas/día</th><th className="px-3">Redes</th><th className="px-3">Internet</th>
                <th className="px-3">Depresión</th><th className="px-3">Ciberacoso</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.country} className="border-b border-ink-700/50 hover:bg-ink-700/40 text-slate-300">
                  <td className="py-1.5 pr-3 font-medium text-slate-100">{r.country}</td>
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
