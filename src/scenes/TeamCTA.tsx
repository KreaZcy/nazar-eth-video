import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { C } from "../colors";

export const TeamCTA: React.FC = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const titleSlideY = interpolate(frame, [0, 15], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const scale = interpolate(frame, [0, 20], [0.85, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  const lineWidth = interpolate(frame, [10, 50], [0, 100], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const buttonOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const repoOpacity = interpolate(frame, [80, 100], [0, 1], {
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
        textAlign: "center",
        padding: 60,
      }}
    >
      <div style={{ opacity, transform: `scale(${scale})` }}>
        <h2
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: C.white,
            margin: 0,
            letterSpacing: "-0.02em",
            transform: `translateY(${titleSlideY}px)`,
          }}
        >
          <span style={{ color: C.blue }}>Nazar</span>
          <span style={{ color: C.green }}>ETH</span>
        </h2>

        <div
          style={{
            height: 4,
            width: lineWidth,
            background: `linear-gradient(90deg, ${C.blue}, ${C.green})`,
            borderRadius: 2,
            margin: "12px auto 20px",
          }}
        />

        <p
          style={{
            fontSize: 22,
            color: C.muted,
            margin: 0,
            fontWeight: 500,
          }}
        >
          Stake on yourself. Earn while you grind.
        </p>

        <div style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center" }}>
          <div
            style={{
              opacity: buttonOpacity,
              background: C.blue,
              color: C.white,
              padding: "14px 32px",
              borderRadius: 12,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            Base Batches 003 · Student Track
          </div>
        </div>

        <div
          style={{
            marginTop: 28,
            opacity: repoOpacity,
            fontSize: 16,
            color: C.muted,
          }}
        >
          github.com/grandiv/NazarETH
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 40,
          opacity: interpolate(frame, [100, 130], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
          fontSize: 14,
          color: C.muted,
        }}
      >
        Yogyakarta, Indonesia · Founded Jan 2026
      </div>
    </AbsoluteFill>
  );
};
