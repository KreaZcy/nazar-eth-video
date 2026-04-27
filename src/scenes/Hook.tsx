import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { C } from "../colors";

const APPS = [
  {
    name: "Strava",
    color: "#FC4C02",
    logo: staticFile("/logos/strava-kite.png"),
    tagline: "Track your runs & rides",
  },
  {
    name: "INTVL",
    color: "#FF6B6B",
    logo: staticFile("/logos/intvl-real.png"),
    tagline: "High-intensity challenges",
  },
];

export const Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const titleY = interpolate(frame, [0, 15], [30, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const andOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const questionScale = spring({ fps, frame: frame - 70, config: { damping: 10, mass: 0.5 } });
  const questionOpacity = interpolate(frame, [75, 90], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const bottomTextOp = interpolate(frame, [100, 115], [0, 1], {
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
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C.green}12 0%, transparent 70%)`,
          filter: "blur(80px)",
          top: "10%",
        }}
      />

      <div
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: C.muted,
          letterSpacing: "3px",
          textTransform: "uppercase",
          marginBottom: 50,
          opacity: titleOp,
          transform: `translateY(${titleY}px)`,
        }}
      >
        You already use
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 60,
          marginBottom: 50,
        }}
      >
        {APPS.map((app, i) => {
          const delay = 15 + i * 40;
          const s = interpolate(frame - delay, [0, 15], [0.5, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          });
          const op = interpolate(frame, [delay, delay + 12], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });

          return (
            <div
              key={app.name}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
                opacity: op,
                transform: `scale(${s})`,
              }}
            >
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 28,
                  background: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 4px 30px ${app.color}33`,
                  padding: 20,
                }}
              >
                <Img
                  src={app.logo}
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: app.color }}>
                {app.name}
              </div>
              <div style={{ fontSize: 16, color: C.muted, fontWeight: 400 }}>
                {app.tagline}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          fontSize: 22,
          fontWeight: 500,
          color: C.muted,
          opacity: andOpacity,
          marginBottom: 20,
        }}
      >
        ...but what happens when you miss a goal?
      </div>

      <div
        style={{
          fontSize: 42,
          fontWeight: 800,
          color: C.green,
          opacity: questionOpacity,
          transform: `scale(${questionScale})`,
          textShadow: `0 0 40px ${C.green}44`,
        }}
      >
        Nothing. Zero accountability.
      </div>

      <div
        style={{
          fontSize: 18,
          color: C.muted,
          marginTop: 30,
          opacity: bottomTextOp,
          fontWeight: 400,
        }}
      >
        Until now.
      </div>
    </AbsoluteFill>
  );
};
