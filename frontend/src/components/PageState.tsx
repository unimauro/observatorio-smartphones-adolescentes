import type { ReactNode } from "react";
import { useData } from "../lib/store";

export default function PageState({ children }: { children: ReactNode }) {
  const { loading, error, meta } = useData();
  if (loading) return <p className="text-slate-500 text-sm">Cargando datos…</p>;
  if (error) return <p className="text-brand-red text-sm">Error al cargar datos: {error}</p>;
  if (!meta) return <p className="text-slate-500 text-sm">Sin datos.</p>;
  return <>{children}</>;
}
