import { useState } from "react";

const URL = "https://unimauro.github.io/observatorio-smartphones-adolescentes/";
const MSG = "Observatorio Global del Uso de Smartphones en Adolescentes: evidencia científica y datos abiertos sobre pantallas, salud mental y educación 👇";

const links = {
  whatsapp: `https://wa.me/?text=${encodeURIComponent(MSG + " " + URL)}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(URL)}`,
  x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(MSG)}&url=${encodeURIComponent(URL)}`,
};

export default function ShareButtons({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(URL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* noop */ }
  };
  const base = "flex items-center justify-center gap-1.5 rounded-md border transition-colors";
  const size = compact ? "text-xs px-2 py-1.5" : "text-sm px-3 py-2";
  return (
    <div className="flex gap-2">
      <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className={`${base} ${size} border-brand-green/50 text-brand-green hover:bg-brand-green/10`}>WhatsApp</a>
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={`${base} ${size} border-brand-sky/50 text-brand-sky hover:bg-brand-sky/10`}>LinkedIn</a>
      <a href={links.x} target="_blank" rel="noopener noreferrer" className={`${base} ${size} border-ink-500 text-slate-300 hover:bg-ink-700`}>X</a>
      <button onClick={copy} className={`${base} ${size} border-ink-500 text-slate-300 hover:bg-ink-700`}>{copied ? "¡Copiado!" : "Copiar"}</button>
    </div>
  );
}
