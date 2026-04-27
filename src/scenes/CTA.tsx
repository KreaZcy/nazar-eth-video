import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { C } from "../colors";

export const CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const pulse = interpolate(frame % 30, [0, 15, 30], [1, 1.05, 1]);

  const buttonBounce = spring({
    fps,
    frame: frame - 30,
    config: { damping: 10, mass: 0.5 },
  });

  const repoOpacity = interpolate(frame, [60, 80], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const glowOpacity = interpolate(frame, [0, 30], [0, 0.6], {
    extrapolateRight: "clamp",
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
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.blue}44 0%, transparent 70%)`,
          filter: "blur(80px)",
          opacity: glowOpacity,
        }}
      />

      <div style={{ opacity, textAlign: "center" }}>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 900,
            color: C.white,
            margin: "0 0 16px",
            letterSpacing: "-2px",
          }}
        >
          Ready to put your{" "}
          <span style={{ color: C.green }}>money</span> where your{" "}
          <span style={{ color: C.orange }}>legs</span> are?
        </h2>

        <div
          style={{
            width: 80,
            height: 4,
            background: `linear-gradient(90deg, ${C.blue}, ${C.green})`,
            margin: "0 auto 40px",
            borderRadius: 2,
          }}
        />

        <div
          style={{
            display: "inline-block",
            background: `linear-gradient(135deg, ${C.blue}, ${C.green})`,
            padding: "18px 48px",
            borderRadius: 60,
            fontSize: 24,
            fontWeight: 700,
            color: C.white,
            transform: `scale(${buttonBounce * pulse})`,
            boxShadow: `0 0 40px ${C.blue}44`,
            letterSpacing: "1px",
          }}
        >
          TRY NAZARETH ON BASE →
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 16,
            color: C.muted,
            opacity: repoOpacity,
          }}
        >
          🔗 nazareth.izcy.tech · Built for Base Batches 003
        </div>
      </div>
    </AbsoluteFill>
  );
};
