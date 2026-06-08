import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loadAll, type Country, type Mental, type Education, type Risks, type Family, type Latam, type Peru, type Studies, type Timeline, type Meta } from "./data";

interface Store {
  countries: Country[]; mental: Mental | null; education: Education | null;
  risks: Risks | null; family: Family | null; latam: Latam | null; peru: Peru | null;
  studies: Studies | null; timeline: Timeline | null; meta: Meta | null;
  loading: boolean; error: string | null;
}
const empty: Store = {
  countries: [], mental: null, education: null, risks: null, family: null,
  latam: null, peru: null, studies: null, timeline: null, meta: null, loading: true, error: null,
};
const Ctx = createContext<Store>(empty);

export function DataProvider({ children }: { children: ReactNode }) {
  const [s, setS] = useState<Store>(empty);
  useEffect(() => {
    loadAll().then(([c, mental, education, risks, family, latam, peru, studies, timeline, meta]) =>
      setS({ countries: c.rows, mental, education, risks, family, latam, peru, studies, timeline, meta, loading: false, error: null }))
      .catch((e: Error) => setS((p) => ({ ...p, loading: false, error: e.message })));
  }, []);
  return <Ctx.Provider value={s}>{children}</Ctx.Provider>;
}
export const useData = () => useContext(Ctx);
