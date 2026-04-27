import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  Easing,
  staticFile,
} from "remotion";
import { C } from "../colors";

const PAIN = [
  {
    img: "/logos/gym-fail.png",
    title: "Skip the gym",
    desc: "No money lost. No consequences.",
    color: "#FF6B6B",
  },
  {
    img: "/logos/lie-face.png",
    title: "Quit mid-challenge",
    desc: "Self-reported? Just lie.",
    color: C.orange,
  },
  {
    img: "/logos/escrow-icon.png",
    title: "Trust the middleman",
    desc: "Centralized escrow can vanish.",
    color: "#FF4757",
  },
];

export const Problem = () => {
  const frame = useCurrentFrame();

  const headerOp = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const headerY = interpolate(frame, [0, 15], [-20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const bottomOp = interpolate(frame, [120, 140], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.bg,
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
          background: `radial-gradient(circle, #FF000012 0%, transparent 60%)`,
          filter: "blur(80px)",
          top: "15%",
        }}
      />

      <div
        style={{
          textAlign: "center",
          marginBottom: 50,
          opacity: headerOp,
          transform: `translateY(${headerY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "#FF4757",
            letterSpacing: "6px",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          THE PROBLEM
        </div>
        <div style={{ fontSize: 36, fontWeight: 800, color: C.white }}>
          Fitness commitments have{" "}
          <span style={{ color: "#FF4757" }}>zero teeth</span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 28, padding: "0 80px" }}>
        {PAIN.map((point, i) => {
          const delay = 25 + i * 35;
          const cardOp = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          });
          const cardY = interpolate(
            frame - delay,
            [0, 12],
            [25, 0],
            {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            },
          );

          return (
            <div
              key={i}
              style={{
                opacity: cardOp,
                transform: `translateY(${cardY}px)`,
                background: C.bgCard,
                border: `1px solid ${point.color}25`,
                borderRadius: 16,
                padding: "28px 24px",
                width: 280,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  marginBottom: 16,
                }}
              >
                <Img
                  src={staticFile(point.img)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: C.white,
                  marginBottom: 8,
                }}
              >
                {point.title}
              </div>
              <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.5 }}>
                {point.desc}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 40,
          fontSize: 16,
          color: C.muted,
          opacity: bottomOp,
        }}
      >
        No skin in the game. No real accountability.
      </div>
    </AbsoluteFill>
  );
};
