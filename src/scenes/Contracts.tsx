import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  Easing,
} from "remotion";
import { C } from "../colors";

const CONTRACTS = [
  { name: "NazarChallenge", desc: "Stake & lifecycle" },
  { name: "NazarRegistry", desc: "Wallet ↔ Strava binding" },
  { name: "NazarOracle", desc: "Progress verification" },
  { name: "NazarTreasury", desc: "Slash pool" },
  { name: "NazarYield", desc: "Yield vault" },
  { name: "MockUSDC", desc: "Testnet faucet" },
];

export const Contracts: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        padding: "60px 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{ opacity: titleOpacity }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 32 }}>🔵</span>
          <h2
            style={{
              fontSize: 40,
              fontWeight: 800,
              margin: 0,
              color: C.white,
              letterSpacing: "-0.02em",
            }}
          >
            6 Contracts on Base
          </h2>
        </div>
        <p style={{ fontSize: 18, color: C.muted, marginTop: 0, marginBottom: 28 }}>
          All deployed on Base Sepolia — Solidity 0.8.26
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 14,
        }}
      >
        {CONTRACTS.map((c, i) => {
          const delay = i * 10;
          const opacity = interpolate(
            frame,
            [20 + delay, 30 + delay],
            [0, 1],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
          );
          const y = interpolate(
            frame,
            [20 + delay, 35 + delay],
            [30, 0],
            {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          );

          return (
            <div
              key={c.name}
              style={{
                background: C.bgCard,
                borderRadius: 12,
                padding: "16px 20px",
                opacity,
                transform: `translateY(${y}px)`,
                border: `1px solid ${i === 0 ? C.blue : i === 1 ? C.green : "rgba(255,255,255,0.06)"}`,
                borderLeft: `4px solid ${i < 3 ? C.blue : C.green}`,
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 700, color: C.white, fontFamily: "monospace" }}>
                {c.name}
              </div>
              <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>
                {c.desc}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 24,
          fontSize: 14,
          color: C.muted,
          textAlign: "center",
          opacity: interpolate(frame, [100, 120], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}
      >
        Base Sepolia · Chain ID 84532
      </div>
    </AbsoluteFill>
  );
};
