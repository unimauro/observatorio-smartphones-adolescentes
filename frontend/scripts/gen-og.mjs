// Genera una tarjeta Open Graph (1200x630) por idioma → public/og-<lng>.png
// Se ejecuta LOCALMENTE (requiere rsvg-convert + fuentes del sistema) y los PNG
// se commitean, porque el runner de CI (ubuntu) no tiene estas fuentes.
//   node scripts/gen-og.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";

const LANGS = ["es", "en", "zh", "hi", "fr", "ar", "bn", "pt", "ru", "id"];

// Subtítulo y sello por idioma (cortos, para la tarjeta).
const META = {
  es: { sub: "Evidencia científica y datos abiertos", seal: "Correlación ≠ causalidad · fuentes citadas" },
  en: { sub: "Scientific evidence and open data", seal: "Correlation ≠ causation · sources cited" },
  zh: { sub: "科学证据与开放数据", seal: "相关性 ≠ 因果 · 引用来源" },
  hi: { sub: "वैज्ञानिक साक्ष्य और खुला डेटा", seal: "सहसंबंध ≠ कारण · स्रोत उद्धृत" },
  fr: { sub: "Preuves scientifiques et données ouvertes", seal: "Corrélation ≠ causalité · sources citées" },
  ar: { sub: "أدلة علمية وبيانات مفتوحة", seal: "الارتباط ≠ السببية · مصادر مذكورة" },
  bn: { sub: "বৈজ্ঞানিক প্রমাণ ও উন্মুক্ত ডেটা", seal: "সম্পর্ক ≠ কারণ · উৎস উদ্ধৃত" },
  pt: { sub: "Evidência científica e dados abertos", seal: "Correlação ≠ causalidade · fontes citadas" },
  ru: { sub: "Научные данные и открытые источники", seal: "Корреляция ≠ причинность · источники указаны" },
  id: { sub: "Bukti ilmiah dan data terbuka", seal: "Korelasi ≠ kausalitas · sumber dikutip" },
};

const FONTS = "'PingFang SC','Hiragino Sans GB','Hiragino Kaku Gothic ProN','Al Nile','Kohinoor Devanagari','Kohinoor Bangla',Helvetica,Arial,sans-serif";
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const DOTS = ["#2dd4bf", "#38bdf8", "#818cf8", "#fbbf24", "#fb7185"];

for (const lng of LANGS) {
  const loc = JSON.parse(readFileSync(new URL(`../src/locales/${lng}.json`, import.meta.url), "utf8"));
  const brand = esc(loc.app.brand);
  const tagline = esc(loc.app.tagline);
  const sub = esc(META[lng].sub);
  const seal = esc(META[lng].seal);
  const dots = DOTS.map((c, i) => `<circle cx="${510 + i * 45}" cy="372" r="9" fill="${c}"/>`).join("");

  const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" font-family="${FONTS}">
  <rect width="1200" height="630" fill="#0b1220"/>
  <rect width="1200" height="8" fill="#2dd4bf"/>
  <text x="600" y="240" font-size="60" font-weight="700" fill="#f1f5f9" text-anchor="middle">${brand} <tspan fill="#2dd4bf">${tagline}</tspan></text>
  <text x="600" y="300" font-size="30" fill="#94a3b8" text-anchor="middle">${sub}</text>
  ${dots}
  <rect x="330" y="446" width="540" height="62" rx="31" fill="#111929" stroke="#2dd4bf" stroke-width="2"/>
  <text x="600" y="485" font-size="24" font-weight="600" fill="#2dd4bf" text-anchor="middle">${seal}</text>
  <text x="600" y="582" font-size="21" fill="#64748b" text-anchor="middle">unimauro.github.io/observatorio-smartphones-adolescentes · @unimauro</text>
</svg>`;

  writeFileSync("/tmp/og-gen.svg", svg);
  execSync(`rsvg-convert -w 1200 -h 630 /tmp/og-gen.svg -o public/og-${lng}.png`);
  console.log(`  → public/og-${lng}.png`);
}
console.log("OK");
