import { useData } from "../lib/store";
import PageState from "../components/PageState";

export default function Timeline() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { timeline } = useData();
  if (!timeline) return null;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Línea de tiempo</h1>
        <p className="text-sm text-slate-500">Hitos tecnológicos y de comportamiento adolescente, 2005–presente.</p>
      </div>
      <div className="relative pl-6">
        <div className="absolute left-2 top-1 bottom-1 w-px bg-ink-600" />
        <div className="space-y-5">
          {timeline.rows.map((e) => (
            <div key={e.year} className="relative">
              <span className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-brand-teal ring-4 ring-ink-900" />
              <div className="card">
                <div className="flex items-baseline gap-3">
                  <span className="text-brand-teal font-bold tabular">{e.year}</span>
                  <span className="text-slate-100 font-semibold">{e.title}</span>
                </div>
                <p className="text-sm text-slate-400 mt-1">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
