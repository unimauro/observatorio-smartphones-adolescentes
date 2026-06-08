import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import es from "../locales/es.json";
import en from "../locales/en.json";
import pt from "../locales/pt.json";
import fr from "../locales/fr.json";
import zh from "../locales/zh.json";
import ar from "../locales/ar.json";
import hi from "../locales/hi.json";
import bn from "../locales/bn.json";
import ru from "../locales/ru.json";
import id from "../locales/id.json";

// 10 idiomas más usados del mundo (por número de hablantes).
export const LANGS = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "bn", name: "বাংলা", flag: "🇧🇩" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
] as const;

export const RTL = new Set(["ar"]);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: es }, en: { translation: en }, pt: { translation: pt },
      fr: { translation: fr }, zh: { translation: zh }, ar: { translation: ar },
      hi: { translation: hi }, bn: { translation: bn }, ru: { translation: ru }, id: { translation: id },
    },
    fallbackLng: "en",
    supportedLngs: LANGS.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    interpolation: { escapeValue: false },
    detection: { order: ["localStorage", "navigator"], lookupLocalStorage: "obs-lng", caches: ["localStorage"] },
  });

function applyDir(lng: string) {
  const root = document.documentElement;
  root.lang = lng;
  root.dir = RTL.has(lng) ? "rtl" : "ltr";
}
applyDir(i18n.resolvedLanguage || "es");
i18n.on("languageChanged", applyDir);

export default i18n;
