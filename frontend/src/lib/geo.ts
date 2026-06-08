// Localización de nombres de país: mapea el nombre (en español, usado como clave en
// los datos) a ISO 3166-1 alpha-2 y usa Intl.DisplayNames para traducirlo al idioma activo.

const NAME_TO_ISO2: Record<string, string> = {
  "Estados Unidos": "US", "EE.UU.": "US", "Canadá": "CA", "México": "MX", "Brasil": "BR",
  "Argentina": "AR", "Chile": "CL", "Colombia": "CO", "Perú": "PE", "Reino Unido": "GB",
  "España": "ES", "Francia": "FR", "Alemania": "DE", "Italia": "IT", "Suecia": "SE",
  "Países Bajos": "NL", "Portugal": "PT", "China": "CN", "Japón": "JP", "Corea del Sur": "KR",
  "India": "IN", "Indonesia": "ID", "Filipinas": "PH", "Australia": "AU", "Sudáfrica": "ZA",
  "Nigeria": "NG", "Kenia": "KE", "Arabia Saudita": "SA", "Turquía": "TR", "Finlandia": "FI",
};

const cache: Record<string, Intl.DisplayNames> = {};
function dn(lng: string): Intl.DisplayNames | null {
  try {
    if (!cache[lng]) cache[lng] = new Intl.DisplayNames([lng], { type: "region" });
    return cache[lng];
  } catch {
    return null;
  }
}

/** Devuelve el nombre del país en el idioma `lng`; si no se reconoce, el original. */
export function localizeCountry(name: string, lng: string): string {
  const iso2 = NAME_TO_ISO2[name];
  if (!iso2) return name;
  try {
    return dn(lng)?.of(iso2) ?? name;
  } catch {
    return name;
  }
}
