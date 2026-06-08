import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useData } from "../lib/store";

export default function PageState({ children }: { children: ReactNode }) {
  const { loading, error, meta } = useData();
  const { t } = useTranslation();
  if (loading) return <p className="text-slate-500 text-sm">{t("common.loading")}</p>;
  if (error) return <p className="text-brand-red text-sm">Error: {error}</p>;
  if (!meta) return <p className="text-slate-500 text-sm">—</p>;
  return <>{children}</>;
}
