import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../colors";

const LOGO = staticFile("/logo.png");

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: "clamp" });
  const logoScale = spring({ fps, frame: frame - 5, config: { damping: 14, mass: 0.6 } });
  const titleOpacity = interpolate(frame, [20, 35], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const titleY = interpolate(frame, [20, 35], [15, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const taglineOpacity = interpolate(frame, [45, 60], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const glowOpacity = interpolate(frame, [0, 40], [0, 0.6], { extrapolateRight: "clamp" });
  const badgeOpacity = interpolate(frame, [70, 90], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, opacity: bgOpacity }}>
      <div style={{
        position: "absolute", width: 500, height: 500, top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", borderRadius: "50%",
        background: `radial-gradient(circle, ${C.blue}44 0%, transparent 70%)`,
        filter: "blur(80px)", opacity: glowOpacity,
      }} />

      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        height: "100%", fontFamily: "system-ui, sans-serif",
      }}>
        <div style={{
          transform: `scale(${logoScale})`,
          marginBottom: 20,
          background: "rgba(255,255,255,0.95)",
          borderRadius: 24,
          padding: 16,
          boxShadow: `0 0 40px ${C.blue}33`,
        }}>
          <Img src={LOGO} style={{ width: 140, height: 140 }} />
        </div>

        <h1 style={{
          fontSize: 80, fontWeight: 900, color: C.white, margin: 0,
          letterSpacing: "-2px", opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}>
          Nazar<span style={{ color: C.blue }}>ETH</span>
        </h1>

        <p style={{
          fontSize: 22, color: C.muted, marginTop: 12, opacity: taglineOpacity,
          letterSpacing: "1px",
        }}>
          Put your money where your fitness is.
        </p>

        <div style={{
          marginTop: 20, opacity: badgeOpacity,
          background: `${C.blue}22`, border: `1px solid ${C.blue}44`,
          borderRadius: 20, padding: "6px 18px",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          <Img src={staticFile("/logos/base.png")} style={{ width: 18, height: 18 }} />
          <span style={{ fontSize: 13, color: C.blue, fontWeight: 600, letterSpacing: "1px" }}>
            BASE BATCHES 003
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
