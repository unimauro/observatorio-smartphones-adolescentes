import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import EChart from "../components/EChart";
import { baseOption } from "../lib/echart-theme";
import { PALETTE, yrs } from "../lib/format";

export default function Familia() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { family } = useData();
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
    xAxis: { ...baseOption().xAxis, data: family.first_phone_given_age.map((r) => r.country) },
    yAxis: { ...baseOption().yAxis, name: "años", min: 9 },
    series: [{ type: "bar", data: family.first_phone_given_age.map((r) => r.age), itemStyle: { borderRadius: [3, 3, 0, 0] }, barWidth: "50%" }],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Familia y mediación parental</h1>
        <p className="text-sm text-slate-500">Normas, supervisión, control parental y edad de entrega del primer smartphone.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Estrategias de mediación parental" subtitle="% de hogares (síntesis)">
          <EChart option={bar} height={340} />
        </ChartCard>
        <ChartCard title="Edad de entrega del primer smartphone" subtitle={`Promedio por país · global ≈ ${yrs(11)}`}>
          <EChart option={ages} height={340} />
        </ChartCard>
      </div>
      <div className="card text-sm text-slate-400">
        La evidencia favorece la <strong>mediación activa</strong> (acompañar, conversar, acordar reglas) por sobre la
        <strong> restricción pura</strong> o la vigilancia encubierta: mejora la alfabetización digital y reduce riesgos
        sin dañar la confianza.
      </div>
    </div>
  );
}
