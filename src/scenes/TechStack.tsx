import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  Easing,
} from "remotion";
import { C } from "../colors";

const TECH = [
  { label: "Base", sub: "L2 Chain", icon: "base-real.png" },
  { label: "Solidity", sub: "6 Contracts", icon: "solidity-real.png" },
  { label: "Go", sub: "Backend + Oracle", icon: "go-real.png" },
  { label: "React", sub: "Frontend DApp", icon: "react-real.png" },
  { label: "Strava API", sub: "Activity Data", icon: "strava-real.png" },
  { label: "USDC", sub: "Stablecoin Stakes", icon: "usdc-real.png" },
];

export const TechStack: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const titleSlide = interpolate(frame, [0, 10], [-20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleSlide}px)`,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 36, fontWeight: 800, color: C.white, margin: 0 }}>
          Built With
        </h2>
        <div style={{ width: 60, height: 3, background: C.blue, margin: "12px auto 0" }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          padding: "0 100px",
          width: "100%",
        }}
      >
        {TECH.map((t, i) => {
          const delay = 10 + i * 20;
          const opacity = interpolate(frame - delay, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });
          const scale = interpolate(frame - delay, [0, 15], [0.7, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          });

          return (
            <div
              key={i}
              style={{
                opacity,
                transform: `scale(${scale})`,
                background: C.bgCard,
                borderRadius: 12,
                padding: "20px 16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: `1px solid ${C.blue}22`,
              }}
            >
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 12,
                  background: "#FFFFFF",
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 6,
                }}
              >
                <Img
                  src={staticFile(`/logos/${t.icon}`)}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: C.white }}>
                {t.label}
              </span>
              <span style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>
                {t.sub}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
