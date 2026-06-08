import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useData } from "../lib/store";
import ThemeToggle from "./ThemeToggle";
import DataStatusBadge from "./DataStatusBadge";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV = [
  { to: "/", key: "panorama", icon: "🌐", end: true },
  { to: "/salud-mental", key: "mental", icon: "🧠" },
  { to: "/educacion", key: "education", icon: "🎓" },
  { to: "/riesgos", key: "risks", icon: "⚠️" },
  { to: "/familia", key: "family", icon: "👨‍👩‍👧" },
  { to: "/latam", key: "latam", icon: "🌎" },
  { to: "/peru", key: "peru", icon: "🇵🇪" },
  { to: "/biblioteca", key: "library", icon: "📚" },
  { to: "/timeline", key: "timeline", icon: "🕰️" },
  { to: "/investigadores", key: "researchers", icon: "🔬" },
  { to: "/faq", key: "faq", icon: "❓" },
];

export default function Layout() {
  const { meta } = useData();
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 shrink-0 bg-ink-800 border-r border-ink-600 flex flex-col">
        <div className="px-4 py-4 border-b border-ink-600">
          <div className="text-base font-bold text-slate-100 leading-tight">
            {t("app.brand")} <span className="text-brand-teal">{t("app.tagline")}</span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {meta ? t("app.stats", { countries: meta.n_countries, studies: meta.n_studies }) : ""}
          </div>
        </div>
        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
              <span className="w-5 text-center">{n.icon}</span>{t(`nav.${n.key}`)}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-ink-600 text-[11px] text-slate-600 leading-relaxed">
          {t("footer.platform")}
          <br />
          {t("footer.by")}{" "}
          <a href="https://github.com/unimauro" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brand-teal">Carlos Cárdenas</a>{" "}· @unimauro
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 shrink-0 bg-ink-900/80 backdrop-blur border-b border-ink-600 flex items-center justify-between px-6 sticky top-0 z-[1000]">
          <div className="text-sm text-slate-400 truncate hidden md:block">{t("header.subtitle")}</div>
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher />
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
