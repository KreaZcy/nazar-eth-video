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

const FEATURES = [
  {
    icon: "/logos/shield-real.png",
    title: "EIP-712 Sybil Protection",
    desc: "1:1 wallet-to-Strava binding, permanent & immutable",
    color: C.blue,
  },
  {
    icon: "/logos/milestone-real.png",
    title: "Milestone Withdrawals",
    desc: "Claim 10% back for every 10% progress — not just at end",
    color: C.green,
  },
  {
    icon: "/logos/check-real.png",
    title: "Oracle-Verified Progress",
    desc: "Backend fetches real Strava GPX, submits on-chain proof",
    color: C.orange,
  },
];

export const Differentiator: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const titleSlide = interpolate(frame, [0, 12], [-30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        padding: "60px 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ opacity: titleOpacity, transform: `translateY(${titleSlide}px)` }}>
        <h2 style={{ fontSize: 40, fontWeight: 800, margin: 0, color: C.white, letterSpacing: "-0.02em" }}>
          What Makes It Different
        </h2>
        <div
          style={{
            height: 4,
            width: interpolate(frame, [5, 30], [0, 220], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
            background: `linear-gradient(90deg, ${C.green}, ${C.blue})`,
            borderRadius: 2,
            marginTop: 8,
            marginBottom: 36,
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {FEATURES.map((f, i) => {
          const delay = i * 15;
          const cardOpacity = interpolate(frame, [20 + delay, 30 + delay], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });
          const cardX = interpolate(frame, [20 + delay, 35 + delay], [60, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });

          return (
            <div
              key={f.title}
              style={{
                background: C.bgCard,
                borderRadius: 16,
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                opacity: cardOpacity,
                transform: `translateX(${cardX}px)`,
                border: `1px solid ${f.color}20`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: `${f.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Img src={staticFile(f.icon)} style={{ width: 34, height: 34 }} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.white }}>
                  {f.title}
                </div>
                <div style={{ fontSize: 15, color: C.muted, marginTop: 4 }}>
                  {f.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
