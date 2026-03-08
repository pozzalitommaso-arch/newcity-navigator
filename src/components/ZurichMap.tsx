import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface District {
  name: string;
  lat: number;
  lng: number;
  rentRange: string;
  buyRange: string;
  vibe: string;
  priceLevel: "affordable" | "moderate" | "premium" | "luxury";
}

const districts: District[] = [
  { name: "Kreis 1 – Altstadt", lat: 47.3717, lng: 8.5417, rentRange: "2'200–3'800", buyRange: "15'000–22'000", vibe: "Historic center, luxury", priceLevel: "luxury" },
  { name: "Kreis 2 – Enge", lat: 47.3600, lng: 8.5310, rentRange: "1'800–3'200", buyRange: "12'000–18'000", vibe: "Lake views, upscale, families", priceLevel: "premium" },
  { name: "Kreis 3 – Wiedikon", lat: 47.3650, lng: 8.5180, rentRange: "1'500–2'600", buyRange: "10'000–14'000", vibe: "Diverse, good transit", priceLevel: "moderate" },
  { name: "Kreis 4 – Aussersihl", lat: 47.3770, lng: 8.5240, rentRange: "1'400–2'400", buyRange: "9'000–13'000", vibe: "Trendy, multicultural", priceLevel: "moderate" },
  { name: "Kreis 5 – Industriequartier", lat: 47.3870, lng: 8.5200, rentRange: "1'600–2'800", buyRange: "11'000–16'000", vibe: "Hip, tech scene", priceLevel: "moderate" },
  { name: "Kreis 6 – Oberstrass", lat: 47.3900, lng: 8.5450, rentRange: "1'700–2'900", buyRange: "11'500–16'000", vibe: "University area, green", priceLevel: "premium" },
  { name: "Kreis 7 – Fluntern", lat: 47.3800, lng: 8.5600, rentRange: "2'000–3'500", buyRange: "14'000–20'000", vibe: "Premium, ETH/Zoo", priceLevel: "luxury" },
  { name: "Kreis 8 – Riesbach", lat: 47.3580, lng: 8.5550, rentRange: "1'900–3'400", buyRange: "13'000–19'000", vibe: "Lakeside, elegant", priceLevel: "premium" },
  { name: "Kreis 9 – Albisrieden", lat: 47.3740, lng: 8.4900, rentRange: "1'300–2'200", buyRange: "8'000–12'000", vibe: "Affordable, families", priceLevel: "affordable" },
  { name: "Kreis 10 – Höngg", lat: 47.3980, lng: 8.4970, rentRange: "1'400–2'400", buyRange: "9'500–13'000", vibe: "Green, village feel", priceLevel: "moderate" },
  { name: "Kreis 11 – Oerlikon", lat: 47.4100, lng: 8.5440, rentRange: "1'300–2'300", buyRange: "8'500–12'500", vibe: "Growing, good transit", priceLevel: "affordable" },
  { name: "Kreis 12 – Schwamendingen", lat: 47.4050, lng: 8.5700, rentRange: "1'200–2'000", buyRange: "7'500–11'000", vibe: "Most affordable", priceLevel: "affordable" },
];

const priceLevelColors: Record<string, string> = {
  affordable: "#4CAF50",
  moderate: "#2E9F8F",
  premium: "#E8833A",
  luxury: "#D94F4F",
};

const priceLevelLabels: Record<string, string> = {
  affordable: "Affordable",
  moderate: "Moderate",
  premium: "Premium",
  luxury: "Luxury",
};

function createCustomIcon(priceLevel: string) {
  const color = priceLevelColors[priceLevel];
  return L.divIcon({
    className: "custom-district-marker",
    html: `<div style="
      width: 14px; height: 14px;
      background: ${color};
      border: 2.5px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 6px rgba(0,0,0,0.25);
    "></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

function MapStyles() {
  const map = useMap();
  useEffect(() => {
    map.attributionControl.setPrefix("");
  }, [map]);
  return null;
}

export default function ZurichMap() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl overflow-hidden border border-border shadow-[var(--shadow-card)]" style={{ height: 420 }}>
        <MapContainer
          center={[47.3769, 8.5417]}
          zoom={12.5}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <MapStyles />
          {districts.map((d) => (
            <Marker key={d.name} position={[d.lat, d.lng]} icon={createCustomIcon(d.priceLevel)}>
              <Popup>
                <div style={{ fontFamily: "DM Sans, sans-serif", minWidth: 180 }}>
                  <strong style={{ fontSize: 13 }}>{d.name}</strong>
                  <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{d.vibe}</div>
                  <div style={{ marginTop: 8, fontSize: 12 }}>
                    <div><span style={{ color: "#888" }}>Rent: </span><strong>CHF {d.rentRange}</strong></div>
                    <div><span style={{ color: "#888" }}>Buy/m²: </span><strong>CHF {d.buyRange}</strong></div>
                  </div>
                  <div style={{
                    marginTop: 6,
                    display: "inline-block",
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "2px 8px",
                    borderRadius: 99,
                    background: priceLevelColors[d.priceLevel] + "18",
                    color: priceLevelColors[d.priceLevel],
                  }}>
                    {priceLevelLabels[d.priceLevel]}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 px-1">
        {Object.entries(priceLevelLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: priceLevelColors[key] }} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
