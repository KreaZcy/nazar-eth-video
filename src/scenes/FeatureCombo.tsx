import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../colors";

const COMBO = [
  {
    brand: "Strava",
    color: "#FC4C02",
    feature: "Real GPS activity data",
    logo: "/logos/strava-real.png",
  },
  {
    brand: "USDC",
    color: "#2775CA",
    feature: "Yield-bearing escrow",
    logo: "/logos/usdc-real.png",
  },
  {
    brand: "Base",
    color: C.blue,
    feature: "Secure onchain execution",
    logo: "/logos/base-real.png",
  },
];

export const FeatureCombo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const plusOpacity = interpolate(frame, [100, 120], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const resultScale = spring({ fps, frame: frame - 140, config: { damping: 12, mass: 0.5 } });

  const taglineOpacity = interpolate(frame, [170, 190], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
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
      <div style={{ opacity: titleOpacity, textAlign: "center" as const, marginBottom: 50 }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, color: C.muted, margin: 0 }}>THE PERFECT COMBO</h2>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {COMBO.map((item, i) => {
          const cardDelay = 25 + i * 30;
          const cardOpacity = interpolate(frame - cardDelay, [0, 20], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });
          const cardSlide = interpolate(frame - cardDelay, [0, 20], [40, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });

          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <div style={{ opacity: plusOpacity, fontSize: 36, fontWeight: 800, color: C.white, marginTop: -80 }}>
                  +
                </div>
              )}
              <div
                style={{
                  opacity: cardOpacity,
                  transform: `translateY(${cardSlide}px)`,
                  background: C.bgCard,
                  borderRadius: 16,
                  padding: "24px 28px",
                  borderLeft: `3px solid ${item.color}`,
                  width: 220,
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 10,
                  background: C.white, display: "flex", alignItems: "center",
                  justifyContent: "center", marginBottom: 10, overflow: "hidden",
                }}>
                  <Img src={staticFile(item.logo)} style={{ width: 36, height: 36 }} />
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: item.color, marginBottom: 4 }}>
                  {item.brand}
                </div>
                <div style={{ fontSize: 13, color: C.muted }}>{item.feature}</div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ opacity: plusOpacity, marginTop: 20, fontSize: 28, fontWeight: 800, color: C.white }}>=</div>

      <div
        style={{
          opacity: resultScale,
          transform: `scale(${resultScale})`,
          marginTop: 20,
          background: `linear-gradient(135deg, ${C.blue}, ${C.green})`,
          borderRadius: 16,
          padding: "16px 36px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 8, background: C.white, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <Img src={staticFile("/logo.png")} style={{ width: 34, height: 34 }} />
        </div>
        <span style={{ fontSize: 28, fontWeight: 800, color: C.white }}>NazarETH</span>
      </div>

      <div style={{ opacity: taglineOpacity, marginTop: 24, textAlign: "center" as const }}>
        <div style={{ fontSize: 16, color: C.green, fontWeight: 600, letterSpacing: 2 }}>
          PUT SKIN IN THE GAME. LET THE CHAIN DECIDE.
        </div>
      </div>
    </AbsoluteFill>
  );
};
