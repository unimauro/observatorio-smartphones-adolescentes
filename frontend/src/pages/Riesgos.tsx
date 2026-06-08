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
  if (!risks) return null;

  const bar = {
    ...baseOption(),
    grid: { left: 180, right: 24, top: 10, bottom: 30 },
    color: [PALETTE.rose],
    xAxis: { type: "value", axisLabel: { color: "#64748b", formatter: "{value}%" }, splitLine: { lineStyle: { color: "rgba(148,163,184,0.25)", type: "dashed" } } },
    yAxis: { type: "category", inverse: true, data: risks.rows.map((r) => r.risk), axisLabel: { color: "#94a3b8", fontSize: 11 }, axisLine: { lineStyle: { color: "rgba(148,163,184,0.35)" } } },
    series: [{ type: "bar", data: risks.rows.map((r) => r.prevalence_pct), itemStyle: { borderRadius: [0, 3, 3, 0] }, barWidth: "58%" }],
  };
  const byAge = {
    ...baseOption(),
    color: [PALETTE.amber],
    xAxis: { ...baseOption().xAxis, data: risks.by_age.map((r) => `${r.age} a`) },
    yAxis: { ...baseOption().yAxis, axisLabel: { color: "#64748b", formatter: "{value}%" } },
    series: [{ type: "line", smooth: true, areaStyle: { opacity: 0.12 }, data: risks.by_age.map((r) => r.problematic_use_pct) }],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Riesgos digitales</h1>
        <p className="text-sm text-slate-500">{risks.note}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Prevalencia de riesgos" subtitle="% de adolescentes expuestos (síntesis)">
          <EChart option={bar} height={360} />
        </ChartCard>
        <ChartCard title="Uso problemático por edad" subtitle="Pico en la adolescencia media (~13-15 años)">
          <EChart option={byAge} height={360} />
        </ChartCard>
      </div>
      <div className="card text-sm text-slate-400">
        Las cifras combinan definiciones de varias fuentes (EU Kids Online, WHO-HBSC, INHOPE, meta-análisis). El
        <strong> ciberacoso</strong> y el <strong>uso problemático</strong> son los riesgos más prevalentes y mejor
        documentados; <strong>grooming</strong> y <strong>sextorsión</strong> son menos frecuentes pero de alto impacto.
      </div>
    </div>
  );
}
