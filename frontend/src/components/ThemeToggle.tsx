import { useEffect, useState } from "react";
import { getStoredTheme, toggleTheme, type Theme } from "../lib/theme";

export default function ThemeToggle() {
  const [t, setT] = useState<Theme>("dark");
  useEffect(() => setT(getStoredTheme()), []);
  return (
    <button onClick={() => setT(toggleTheme(t))}
      className="flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-md border border-ink-600 text-slate-400 hover:text-slate-100 hover:border-brand-amber/50 bg-ink-800 transition-colors"
      aria-label={t === "dark" ? "Modo día" : "Modo noche"} title={t === "dark" ? "Modo día" : "Modo noche"}>
      <span>{t === "dark" ? "☀" : "☾"}</span><span>{t === "dark" ? "Día" : "Noche"}</span>
    </button>
  );
}
