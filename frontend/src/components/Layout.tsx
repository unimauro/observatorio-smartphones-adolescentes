import { NavLink, Outlet } from "react-router-dom";
import { useData } from "../lib/store";
import ThemeToggle from "./ThemeToggle";
import DataStatusBadge from "./DataStatusBadge";

const NAV = [
  { to: "/", label: "Panorama Mundial", icon: "🌐", end: true },
  { to: "/salud-mental", label: "Salud Mental", icon: "🧠" },
  { to: "/educacion", label: "Educación", icon: "🎓" },
  { to: "/riesgos", label: "Riesgos Digitales", icon: "⚠️" },
  { to: "/familia", label: "Familia", icon: "👨‍👩‍👧" },
  { to: "/latam", label: "LATAM", icon: "🌎" },
  { to: "/peru", label: "Perú", icon: "🇵🇪" },
  { to: "/biblioteca", label: "Biblioteca", icon: "📚" },
  { to: "/timeline", label: "Línea de Tiempo", icon: "🕰️" },
  { to: "/investigadores", label: "Investigadores", icon: "🔬" },
];

export default function Layout() {
  const { meta } = useData();
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 shrink-0 bg-ink-800 border-r border-ink-600 flex flex-col">
        <div className="px-4 py-4 border-b border-ink-600">
          <div className="text-base font-bold text-slate-100 leading-tight">
            Observatorio <span className="text-brand-teal">Adolescentes & Pantallas</span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {meta ? `${meta.n_countries} países · ${meta.n_studies} estudios` : "evidencia y datos abiertos"}
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <span className="w-5 text-center">{n.icon}</span>{n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-ink-600 text-[11px] text-slate-600 leading-relaxed">
          Plataforma de investigación · sin fines de lucro
          <br />
          Por{" "}
          <a href="https://github.com/unimauro" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-teal">Carlos Cárdenas</a>{" "}· @unimauro
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 shrink-0 bg-ink-900/80 backdrop-blur border-b border-ink-600 flex items-center justify-between px-6 sticky top-0 z-[1000]">
          <div className="text-sm text-slate-400 truncate hidden md:block">
            Uso de smartphones, redes e internet en adolescentes · evidencia global
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />
            <DataStatusBadge />
          </div>
        </header>
        <main className="flex-1 p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
