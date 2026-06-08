export type Theme = "dark" | "light";
const KEY = "obs-theme";

export const getStoredTheme = (): Theme => {
  try { return (localStorage.getItem(KEY) as Theme) || "dark"; } catch { return "dark"; }
};
export const applyTheme = (t: Theme) => {
  document.documentElement.classList.toggle("light", t === "light");
  try { localStorage.setItem(KEY, t); } catch { /* noop */ }
};
export const toggleTheme = (cur: Theme): Theme => {
  const next: Theme = cur === "dark" ? "light" : "dark";
  applyTheme(next);
  return next;
};
