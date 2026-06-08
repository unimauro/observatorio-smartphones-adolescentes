import { useTranslation } from "react-i18next";
import { LANGS } from "../lib/i18n";

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const cur = (i18n.resolvedLanguage || "es").slice(0, 2);
  return (
    <label className="flex items-center gap-1.5" title={t("lang.label")}>
      <span className="text-slate-500 text-xs hidden sm:inline">🌐</span>
      <select
        value={cur}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        aria-label={t("lang.label")}
        className="text-xs bg-ink-800 border border-ink-600 rounded-md px-2 py-1.5 text-slate-300 hover:border-brand-teal/50 focus:outline-none cursor-pointer"
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>{l.flag} {l.name}</option>
        ))}
      </select>
    </label>
  );
}
