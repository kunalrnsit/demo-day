import { ImageResponse } from "next/og";

// The preview card shown when the site is shared on WhatsApp, LinkedIn, X, etc.
export const alt = "Startup Karna Hai: build, pitch and raise";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#faf8f3",
          color: "#1b1b1b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 84,
              height: 84,
              borderRadius: 18,
              background: "#ea580c",
              color: "#fff",
              fontSize: 30,
              fontWeight: 900,
            }}
          >
            SKH
          </div>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 700 }}>Startup Karna Hai</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 78, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>
            Startup karna hai?
          </div>
          <div style={{ display: "flex", fontSize: 78, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#ea580c" }}>
            Chalo, karte hain.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#555" }}>
            Build, pitch and raise with investors, bankers and IIT · IIM · ISB alumni.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 26, fontWeight: 600 }}>
          {["Demo Day", "SKH Events", "Founder Caravan", "Portfolio"].map((t) => (
            <div key={t} style={{ display: "flex", padding: "10px 22px", borderRadius: 999, background: "#fff", border: "2px solid #e8e2d6" }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
