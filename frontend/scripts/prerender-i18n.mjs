// Pre-render SEO multilingüe: a partir de dist/index.html (español, raíz) genera
// dist/<lng>/index.html para cada idioma no-raíz, con <title>, meta description,
// Open Graph y twitter traducidos + og:image por idioma + clúster hreflang +
// window.__OBS_LNG__ para que la SPA arranque en ese idioma. Inserta hreflang en la
// raíz y reescribe sitemap.xml con todos los idiomas.  Corre tras `vite build`.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

const BASE = "/observatorio-smartphones-adolescentes/";
const ORIGIN = "https://unimauro.github.io";
const SITE = ORIGIN + BASE; // termina en /
const LANGS = ["es", "en", "zh", "hi", "fr", "ar", "bn", "pt", "ru", "id"];
const RTL = new Set(["ar"]);
const OG_LOCALE = { es: "es_ES", en: "en_US", zh: "zh_CN", hi: "hi_IN", fr: "fr_FR", ar: "ar_AR", bn: "bn_BD", pt: "pt_BR", ru: "ru_RU", id: "id_ID" };

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const url = (lng) => (lng === "es" ? SITE : SITE + lng + "/");

const dist = new URL("../dist/", import.meta.url);
const root = readFileSync(new URL("index.html", dist), "utf8");

// Clúster hreflang (igual para todas las páginas)
const hreflang =
  LANGS.map((l) => `    <link rel="alternate" hreflang="${l}" href="${url(l)}" />`).join("\n") +
  `\n    <link rel="alternate" hreflang="x-default" href="${SITE}" />`;

function meta(lng) {
  const loc = JSON.parse(readFileSync(new URL(`../src/locales/${lng}.json`, import.meta.url), "utf8"));
  const ogTitle = `${loc.app.brand} ${loc.app.tagline}`;
  const desc = loc.header.subtitle;
  return { title: `${ogTitle} — Observatorio`, desc, ogTitle, ogImage: `${SITE}og-${lng}.png` };
}

function build(lng, html) {
  const m = meta(lng);
  const u = url(lng);
  let out = html;
  out = out.replace(/<html lang="es"([^>]*)>/, `<html lang="${lng}"${RTL.has(lng) ? ' dir="rtl"' : ""}$1>`);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${esc(m.title)}</title>`);
  out = out.replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(m.desc)}$2`);
  out = out.replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(m.ogTitle)}$2`);
  out = out.replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(m.desc)}$2`);
  out = out.replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${u}$2`);
  out = out.replace(/(<meta property="og:image" content=")[^"]*(")/g, `$1${m.ogImage}$2`);
  out = out.replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${m.ogImage}$2`);
  out = out.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${u}$2`);
  // Insertar og:locale + hreflang + bootstrap de idioma antes de </head>
  const inject = `    <meta property="og:locale" content="${OG_LOCALE[lng]}" />\n${hreflang}\n    <script>window.__OBS_LNG__=${JSON.stringify(lng)};<\/script>\n`;
  out = out.replace("</head>", inject + "  </head>");
  return out;
}

// Raíz (español): inyecta hreflang + og:locale (sin tocar el resto)
let rootOut = root.replace("</head>",
  `    <meta property="og:locale" content="${OG_LOCALE.es}" />\n${hreflang}\n  </head>`);
writeFileSync(new URL("index.html", dist), rootOut);

// Páginas por idioma (todos menos es)
for (const lng of LANGS.filter((l) => l !== "es")) {
  mkdirSync(new URL(`${lng}/`, dist), { recursive: true });
  writeFileSync(new URL(`${lng}/index.html`, dist), build(lng, root));
  console.log(`  → dist/${lng}/index.html`);
}

// Sitemap multilingüe con alternates hreflang
const xhtml = (loc) => LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${url(l)}"/>`).join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map((l) => `  <url>\n    <loc>${url(l)}</loc>\n${xhtml(l)}\n    <changefreq>monthly</changefreq>\n  </url>`).join("\n")}
</urlset>
`;
writeFileSync(new URL("sitemap.xml", dist), sitemap);
console.log("  → dist/sitemap.xml (multilingüe)\nOK");
