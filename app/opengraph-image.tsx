import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0A0D0F",
          color: "#F3F1EB",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, textTransform: "uppercase", letterSpacing: -2 }}>
          Miguel&nbsp;<span style={{ color: "#B89B6A", fontStyle: "italic" }}>Jarquín</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 30, color: "rgba(243,241,235,0.7)" }}>
          Charlas · Talleres · Consultoría de IA
        </div>
      </div>
    ),
    { ...size },
  );
}
