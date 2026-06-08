import { useTranslation } from "react-i18next";
import { useData } from "../lib/store";
import PageState from "../components/PageState";
import ChartCard from "../components/ChartCard";
import ShareButtons from "../components/ShareButtons";

export default function Faq() {
  return <PageState><Content /></PageState>;
}

function Content() {
  const { meta } = useData();
  const { t } = useTranslation();
  const qs = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-slate-100">{t("faq.title")}</h1>
        <p className="text-sm text-slate-500">{t("faq.subtitle")}</p>
      </div>

      <ChartCard title={t("faq.shareTitle")} subtitle={t("faq.shareSub")}>
        <ShareButtons />
      </ChartCard>

      {qs.map((i) => (
        <section key={i} className="card">
          <h3 className="text-sm font-semibold text-brand-teal mb-1">{t(`faq.q${i}`)}</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{t(`faq.a${i}`)}</p>
          {i === 7 && (
            <a className="text-brand-sky hover:underline text-sm" target="_blank" rel="noopener noreferrer"
               href="https://github.com/unimauro/observatorio-smartphones-adolescentes">
              github.com/unimauro/observatorio-smartphones-adolescentes
            </a>
          )}
        </section>
      ))}

      <div className="card text-xs text-slate-500">{meta?.disclaimer}</div>
    </div>
  );
}
