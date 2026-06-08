import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import KpiCard from "../components/KpiCard";
import EChart from "../components/EChart";
import { baseOption } from "../lib/echart-theme";
import { PALETTE, pct } from "../lib/format";

export default function SaludMental() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { mental } = useData();
  if (!mental) return null;
  const rows = mental.rows;
  const avg = (k: keyof typeof rows[0]) => rows.reduce((s, r) => s + (r[k] as number), 0) / rows.length;

  const dims = [
    { k: "anxiety_pct", name: "Ansiedad", color: PALETTE.rose },
    { k: "depression_pct", name: "Depresión", color: PALETTE.violet },
    { k: "loneliness_pct", name: "Soledad", color: PALETTE.sky },
    { k: "cyberbullying_victim_pct", name: "Ciberacoso", color: PALETTE.amber },
    { k: "sleep_problems_pct", name: "Sueño deficiente", color: PALETTE.teal },
  ] as const;

  const grouped = {
    ...baseOption(),
    color: dims.map((d) => d.color),
    legend: { ...baseOption().legend, data: dims.map((d) => d.name) },
    xAxis: { ...baseOption().xAxis, data: rows.map((r) => r.country), axisLabel: { color: "#94a3b8", rotate: 35, fontSize: 10 } },
    yAxis: { ...baseOption().yAxis, axisLabel: { color: "#64748b", formatter: "{value}%" } },
    series: dims.map((d) => ({ name: d.name, type: "bar", data: rows.map((r) => r[d.k] as number) })),
  };

  const p = mental.correlation.points;
  const scatter = {
    ...baseOption(),
    tooltip: { trigger: "item", backgroundColor: "#111929", borderColor: "#26324a", textStyle: { color: "#e2e8f0" }, formatter: (o: any) => `${o.value[0]} h/día → ${o.value[1]}% síntomas` },
    color: [PALETTE.violet],
    xAxis: { type: "value", name: mental.correlation.x_label, nameLocation: "middle", nameGap: 28, axisLabel: { color: "#64748b" }, splitLine: { lineStyle: { color: "rgba(148,163,184,0.25)", type: "dashed" } } },
    yAxis: { type: "value", name: "% síntomas", axisLabel: { color: "#64748b" }, splitLine: { lineStyle: { color: "rgba(148,163,184,0.25)", type: "dashed" } } },
    series: [
      { type: "scatter", symbolSize: 14, data: p.map((d) => [d.daily_hours, d.depression_pct]) },
      { type: "line", smooth: true, showSymbol: false, lineStyle: { color: PALETTE.amber, type: "dashed" }, data: p.map((d) => [d.daily_hours, d.depression_pct]) },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Salud mental</h1>
        <p className="text-sm text-slate-500">Prevalencias autorreportadas y su relación con el tiempo de pantalla.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KpiCard label="Ansiedad (prom.)" value={pct(avg("anxiety_pct"))} tone="bad" />
        <KpiCard label="Depresión (prom.)" value={pct(avg("depression_pct"))} tone="bad" />
        <KpiCard label="Ciberacoso víctima (prom.)" value={pct(avg("cyberbullying_victim_pct"))} tone="warn" />
        <KpiCard label="Problemas de sueño (prom.)" value={pct(avg("sleep_problems_pct"))} tone="warn" />
      </div>

      <ChartCard title="Indicadores de salud mental por país" subtitle="% de adolescentes (autorreporte, síntesis)">
        <EChart option={grouped} height={360} />
      </ChartCard>

      <ChartCard title="Correlación: tiempo de pantalla ↔ síntomas depresivos" subtitle={mental.correlation.note}>
        <EChart option={scatter} height={320} />
        <p className="text-xs text-brand-amber mt-2">⚠ Asociación ≠ causalidad. El efecto promedio reportado en la literatura es pequeño-moderado y depende del contexto, el tipo de uso y factores previos.</p>
      </ChartCard>
    </div>
  );
}
