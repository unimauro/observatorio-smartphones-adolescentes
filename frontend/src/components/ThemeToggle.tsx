import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getStoredTheme, toggleTheme, type Theme } from "../lib/theme";

export default function ThemeToggle() {
  const [t, setT] = useState<Theme>("dark");
  const { t: tr } = useTranslation();
  useEffect(() => setT(getStoredTheme()), []);
  const label = t === "dark" ? tr("theme.day") : tr("theme.night");
  return (
    <button onClick={() => setT(toggleTheme(t))}
      className="flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-md border border-ink-600 text-slate-400 hover:text-slate-100 hover:border-brand-amber/50 bg-ink-800 transition-colors"
      aria-label={label} title={label}>
      <span>{t === "dark" ? "☀" : "☾"}</span><span className="hidden sm:inline">{label}</span>
    </button>
  );
}
