import type { ReactNode } from "react";

export default function ChartCard({ title, subtitle, children, className = "" }: {
  title: string; subtitle?: string; children: ReactNode; className?: string;
}) {
  return (
    <section className={`card ${className}`} aria-label={title}>
      <header className="mb-3">
        <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </header>
      {children}
    </section>
  );
}
