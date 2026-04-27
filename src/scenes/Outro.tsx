import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../colors";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ fps, frame, config: { damping: 12, mass: 0.5 } });
  const textOpacity = interpolate(frame, [15, 35], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const urlOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const badgeOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const glowOpacity = interpolate(frame, [0, 30], [0, 0.5], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [80, 110], [1, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", opacity: fadeOut }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}22 0%, transparent 70%)`, filter: "blur(80px)", opacity: glowOpacity }} />

      <div
        style={{
          width: 160,
          height: 160,
          borderRadius: 32,
          background: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 20,
          marginBottom: 24,
          transform: `scale(${logoScale})`,
          boxShadow: `0 8px 40px ${C.blue}33`,
        }}
      >
        <Img src={staticFile("/logo.png")} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>

      <div style={{ fontSize: 28, fontWeight: 700, color: C.white, opacity: textOpacity, letterSpacing: "-0.02em" }}>
        Commit Onchain. Deliver IRL.
      </div>

      <div style={{ fontSize: 18, color: C.blue, opacity: urlOpacity, marginTop: 12, fontWeight: 600 }}>
        nazareth.izcy.tech
      </div>

      <div style={{ fontSize: 14, color: C.muted, opacity: badgeOpacity, marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
        <span>Built on Base</span>
        <span style={{ color: C.blue }}>•</span>
        <span>Base Batches 003</span>
      </div>
    </AbsoluteFill>
  );
};
