import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import type { Country } from "../lib/data";
import { heat, pct, hrs, yrs } from "../lib/format";

export type MapMetric = "smartphone_access_pct" | "daily_hours" | "first_phone_age" | "social_media_pct" | "internet_penetration_pct";

const SCALE: Record<MapMetric, { min: number; max: number; fmt: (v: number) => string; label: string }> = {
  smartphone_access_pct: { min: 40, max: 100, fmt: (v) => pct(v), label: "Acceso a smartphone" },
  daily_hours: { min: 4, max: 9, fmt: (v) => hrs(v), label: "Horas/día" },
  first_phone_age: { min: 10, max: 13, fmt: (v) => yrs(v), label: "Edad primer smartphone" },
  social_media_pct: { min: 50, max: 95, fmt: (v) => pct(v), label: "Uso de redes" },
  internet_penetration_pct: { min: 40, max: 100, fmt: (v) => pct(v), label: "Internet" },
};

export default function WorldMap({ countries, metric }: { countries: Country[]; metric: MapMetric }) {
  const sc = SCALE[metric];
  return (
    <MapContainer center={[15, 0]} zoom={2} minZoom={2} maxZoom={6} style={{ height: 460, width: "100%", borderRadius: 12 }} worldCopyJump>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; OpenStreetMap &copy; CARTO'
      />
      {countries.map((c) => {
        const v = c[metric] as number;
        const r = 6 + ((v - sc.min) / (sc.max - sc.min)) * 14;
        return (
          <CircleMarker key={c.iso3} center={[c.lat, c.lng]} radius={Math.max(5, Math.min(22, r))}
            pathOptions={{ color: heat(v, sc.min, sc.max), fillColor: heat(v, sc.min, sc.max), fillOpacity: 0.6, weight: 1 }}>
            <Popup>
              <strong>{c.country}</strong> <span style={{ opacity: 0.7 }}>({c.region})</span><br />
              {sc.label}: <strong>{sc.fmt(v)}</strong><br />
              <span style={{ fontSize: 11, opacity: 0.8 }}>
                Acceso {pct(c.smartphone_access_pct)} · {hrs(c.daily_hours)} · 1er móvil {yrs(c.first_phone_age)}
              </span><br />
              <span style={{ fontSize: 10, opacity: 0.6 }}>{c.status === "verified" ? "✓ verificado" : "≈ estimado"}</span>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
