import { PALETTE } from "../lib/format";

const tones: Record<string, string> = {
  default: PALETTE.teal, good: PALETTE.green, bad: PALETTE.red, warn: PALETTE.amber, info: PALETTE.sky,
};

export default function KpiCard({ label, value, sub, hint, tone = "default" }: {
  label: string; value: string; sub?: string; hint?: string; tone?: keyof typeof tones;
}) {
  return (
    <div className="card flex flex-col gap-1" title={hint}>
      <span className="text-xs uppercase tracking-wider text-slate-500">{label}</span>
      <span className="text-2xl tabular font-semibold" style={{ color: tones[tone] }}>{value}</span>
      {sub && <span className="text-xs text-slate-500">{sub}</span>}
    </div>
  );
}
