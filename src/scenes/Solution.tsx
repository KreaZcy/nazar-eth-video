import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { C } from "../colors";

const PILLARS = [
  { logo: "/logos/usdc-real.png", title: "Stake USDC", desc: "Lock real value\nas commitment", color: C.blue, delay: 70 },
  { logo: "/logos/strava-real.png", title: "Strava Oracle", desc: "GPS-verified\nactivity data", color: "#FC4C02", delay: 95 },
  { logo: "/logos/base-real.png", title: "Base Escrow", desc: "Trustless\nonchain locks", color: C.lightBlue, delay: 120 },
];

export const Solution = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOp = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const titleOp = spring({ fps, frame: frame - 8, config: { damping: 15 } });
  const titleY = interpolate(frame, [0, 15], [20, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const lineW = interpolate(frame, [5, 25], [0, 140], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const subtitleOp = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}12 0%, transparent 70%)`, filter: "blur(80px)", bottom: "5%" }} />

      <div style={{ fontSize: 18, fontWeight: 700, color: C.blue, letterSpacing: "5px", marginBottom: 16, opacity: labelOp, textTransform: "uppercase" }}>
        The Solution
      </div>

      <h2 style={{ fontSize: 52, fontWeight: 900, color: C.white, margin: 0, opacity: titleOp, textAlign: "center", lineHeight: 1.15, transform: `translateY(${titleY}px)` }}>
        Onchain Fitness<br />Commitment Protocol
      </h2>

      <div style={{ width: lineW, height: 4, background: `linear-gradient(90deg, ${C.blue}, ${C.green})`, borderRadius: 2, margin: "20px 0" }} />

      <div style={{ fontSize: 20, color: C.muted, maxWidth: 600, textAlign: "center", lineHeight: 1.5, opacity: subtitleOp, margin: 0 }}>
        Escrow + Oracle + Onchain. Fitness commitments that actually bite.
      </div>

      <div style={{ display: "flex", gap: 32, marginTop: 40 }}>
        {PILLARS.map((p, i) => {
          const op = interpolate(frame - p.delay, [0, 15], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });
          const sc = interpolate(frame - p.delay, [0, 12], [0.6, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          });

          return (
            <div key={i} style={{ opacity: op, transform: `scale(${sc})`, display: "flex", flexDirection: "column", alignItems: "center", width: 180 }}>
              <div style={{
                width: 80, height: 80, borderRadius: 20,
                background: C.white, display: "flex", alignItems: "center",
                justifyContent: "center", marginBottom: 14,
                boxShadow: `0 8px 30px ${p.color}22`,
              }}>
                <Img src={staticFile(p.logo)} style={{ width: 54, height: 54 }} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.white, textAlign: "center", marginBottom: 6 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 13, color: C.muted, textAlign: "center", lineHeight: 1.4, whiteSpace: "pre-line" }}>
                {p.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
