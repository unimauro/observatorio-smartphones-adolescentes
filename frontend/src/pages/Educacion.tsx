import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import EChart from "../components/EChart";
import { baseOption } from "../lib/echart-theme";
import { PALETTE } from "../lib/format";

export default function Educacion() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { education } = useData();
  if (!education) return null;
  const rows = education.rows;

  const useVsDistract = {
    ...baseOption(),
    color: [PALETTE.teal, PALETTE.rose],
    legend: { ...baseOption().legend, data: ["Uso educativo", "Distracción en aula"] },
    xAxis: { ...baseOption().xAxis, data: rows.map((r) => r.country), axisLabel: { color: "#94a3b8", rotate: 25, fontSize: 10 } },
    yAxis: { ...baseOption().yAxis, axisLabel: { color: "#64748b", formatter: "{value}%" } },
    series: [
      { name: "Uso educativo", type: "bar", data: rows.map((r) => r.educational_use_pct) },
      { name: "Distracción en aula", type: "bar", data: rows.map((r) => r.classroom_distraction_pct) },
    ],
  };
  const skillsVsPerf = {
    ...baseOption(),
    color: [PALETTE.indigo, PALETTE.amber],
    legend: { ...baseOption().legend, data: ["Competencias digitales", "Percepción impacto académico"] },
    xAxis: { ...baseOption().xAxis, data: rows.map((r) => r.country), axisLabel: { color: "#94a3b8", rotate: 25, fontSize: 10 } },
    yAxis: { ...baseOption().yAxis },
    series: [
      { name: "Competencias digitales", type: "bar", data: rows.map((r) => r.digital_skills_pct) },
      { name: "Percepción impacto académico", type: "line", smooth: true, data: rows.map((r) => r.academic_perception) },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Educación</h1>
        <p className="text-sm text-slate-500">{education.note}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Uso educativo vs. distracción" subtitle="% de adolescentes por país">
          <EChart option={useVsDistract} />
        </ChartCard>
        <ChartCard title="Competencias digitales y percepción académica" subtitle="Percepción negativa = impacto adverso reportado">
          <EChart option={skillsVsPerf} />
        </ChartCard>
      </div>
      <div className="card text-sm text-slate-400">
        El smartphone es <strong>herramienta y distracción a la vez</strong>: usado pedagógicamente mejora el acceso al
        conocimiento, pero su uso recreativo en clase se asocia con menor desempeño (OECD/PISA 2022). La clave es el
        <strong> diseño del uso</strong>, no solo el dispositivo.
      </div>
    </div>
  );
}
