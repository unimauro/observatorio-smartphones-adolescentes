import type { ReactNode } from "react";
import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import ShareButtons from "../components/ShareButtons";

export default function Faq() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { meta } = useData();
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Preguntas frecuentes y metodología</h1>
        <p className="text-sm text-slate-500">Cómo se construye, cómo leerlo y cómo citarlo. Transparencia total.</p>
      </div>

      <ChartCard title="Comparte el Observatorio" subtitle="Difunde la evidencia">
        <ShareButtons />
      </ChartCard>

      <Q q="¿Estos datos son oficiales?">
        No todos. Cada indicador lleva un estado: <b className="text-brand-green">verified</b> (cifra citable de un
        reporte/estudio concreto) o <b className="text-brand-amber">estimate</b> (síntesis plausible de varias fuentes,
        orden de magnitud). La <i>Biblioteca</i> solo contiene estudios reales con su DOI/fuente. Antes de citar,
        verifica en la fuente original.
      </Q>

      <Q q="¿El uso de smartphones causa problemas de salud mental?">
        La evidencia muestra <b>asociaciones</b>, no causalidad directa. El efecto promedio entre tiempo de pantalla y
        bienestar es <b>pequeño-moderado</b> (Orben &amp; Przybylski, 2019) y depende del <b>tipo de uso</b>, el contexto y
        factores previos. Por eso el Observatorio repite el sello <b>“correlación ≠ causalidad”</b>.
      </Q>

      <Q q="¿De dónde salen los datos?">
        Un ETL en Python (<code>etl/build_data.py</code>) cura cifras de fuentes públicas (UNICEF, WHO/HBSC, OECD/PISA,
        Pew, Common Sense, DataReportal/ITU, INEI/MINSA/MINEDU) y emite JSON con estado y fuente. Una GitHub Action los
        regenera y publica mensualmente.
      </Q>

      <Q q="¿Cómo cito el Observatorio o un estudio?">
        Para un estudio, usa su <b>DOI</b> y la fuente original (botón “DOI →” en la Biblioteca). Para la plataforma:
        <i> Observatorio Global del Uso de Smartphones en Adolescentes (C. Cárdenas, {new Date().getFullYear()}),
        unimauro.github.io/observatorio-smartphones-adolescentes</i>. Indica que las cifras <i>estimate</i> son síntesis.
      </Q>

      <Q q="¿Puedo descargar los datos?">
        Sí. El módulo <b>Investigadores</b> permite filtrar y exportar en <b>CSV</b> o <b>JSON</b>. Los JSON crudos
        están en <code>/data/*.json</code> (p.ej. <code>/data/countries.json</code>).
      </Q>

      <Q q="¿Está disponible en otros idiomas?">
        Por ahora en español. El roadmap contempla los <b>10 idiomas más usados</b> (inglés, chino, hindi, español,
        francés, árabe, bengalí, portugués, ruso, indonesio), con soporte RTL para árabe y SEO multilingüe.
      </Q>

      <Q q="¿Cómo contribuyo o reporto un error?">
        El proyecto es abierto en{" "}
        <a className="text-brand-sky hover:underline" target="_blank" rel="noopener noreferrer"
           href="https://github.com/unimauro/observatorio-smartphones-adolescentes">GitHub</a>. Puedes abrir un issue o un
        PR añadiendo estudios/fuentes a <code>etl/build_data.py</code> con su DOI.
      </Q>

      <div className="card text-xs text-slate-500">{meta?.disclaimer}</div>
    </div>
  );
}

function Q({ q, children }: { q: string; children: ReactNode }) {
  return (
    <section className="card">
      <h3 className="text-sm font-semibold text-brand-teal mb-1">{q}</h3>
      <div className="text-sm text-slate-300 leading-relaxed">{children}</div>
    </section>
  );
}
