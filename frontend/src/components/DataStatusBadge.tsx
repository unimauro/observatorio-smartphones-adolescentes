import { useState } from "react";
import { useData } from "../lib/store";

/** Aviso de procedencia: explica el estado de los datos y cómo leer la plataforma. */
export default function DataStatusBadge() {
  const { meta } = useData();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}
        className="text-xs px-2.5 py-1 rounded border border-brand-amber/40 text-brand-amber bg-brand-amber/10 hover:bg-brand-amber/20 transition-colors"
        title="Procedencia y estado de los datos">
        ⓘ Síntesis · ver fuentes
      </button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => setOpen(false)} role="dialog" aria-modal="true">
          <div className="card max-w-lg max-h-[85vh] overflow-y-auto text-sm text-slate-300 space-y-3" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-semibold text-slate-100">Sobre los datos</h3>
            <p>{meta?.disclaimer}</p>
            <p>
              Cada indicador lleva un estado: <span className="text-brand-green">verified</span> (cifra citable de un
              reporte/estudio) o <span className="text-brand-amber">estimate</span> (síntesis plausible de varias
              fuentes; tómese como orden de magnitud). La <em>Biblioteca</em> reúne los estudios con su DOI/fuente.
            </p>
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500 mb-1">Fuentes</div>
              <div className="flex flex-wrap gap-1.5">
                {meta?.sources.map((s) => <span key={s} className="text-xs px-2 py-0.5 rounded bg-ink-700 text-slate-400">{s}</span>)}
              </div>
            </div>
            <p className="text-xs text-slate-500">Correlación ≠ causalidad: las asociaciones entre uso de pantallas y salud mental son, en promedio, pequeñas-moderadas y dependen del contexto.</p>
            <button onClick={() => setOpen(false)} className="mt-1 text-xs px-3 py-1.5 rounded-md border border-ink-600 text-slate-300 hover:text-slate-100">Entendido</button>
          </div>
        </div>
      )}
    </>
  );
}
