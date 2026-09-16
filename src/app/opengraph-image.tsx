import { ImageResponse } from "next/og";

export const alt =
  "Subramanian — AI Engineer. A curious mind. A world to build.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 35,
        background: "#e7ecd9",
        color: "#304735",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          padding: "44px 50px",
          border: "3px solid #425641",
          borderRadius: 24,
          background: "#fff8e5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 65,
              height: 65,
              border: "2px solid #425641",
              transform: "rotate(-5deg)",
              fontSize: 38,
              fontWeight: 700,
            }}
          >
            sm
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <span style={{ fontSize: 24, fontWeight: 700 }}>SUBRAMANIAN</span>
            <span style={{ fontSize: 18, letterSpacing: 3 }}>
              AI ENGINEER · COIMBATORE, INDIA
            </span>
          </div>
          <span
            style={{
              display: "flex",
              marginLeft: "auto",
              color: "#b65032",
              fontSize: 65,
            }}
          >
            *
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 76,
            fontWeight: 700,
            lineHeight: 1.12,
            letterSpacing: -4,
          }}
        >
          <span>A curious mind.</span>
          <span style={{ color: "#b65032" }}>A world to build.</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 23,
            borderTop: "2px dashed #c4cdb1",
            paddingTop: 22,
          }}
        >
          <span>RAG · AI agents · Production backends</span>
          <span style={{ fontSize: 18 }}>THE LITTLE AI LAB →</span>
        </div>
      </div>
    </div>,
    size,
  );
}
