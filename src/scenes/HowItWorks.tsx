import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from "remotion";
import { C } from "../colors";

const STEPS = [
  { icon: "1", title: "Connect Wallet + Strava", desc: "OAuth 2.0 | EIP-712" },
  { icon: "2", title: "Create Challenge", desc: "Pick sport · distance · stake" },
  { icon: "3", title: "Deposit USDC", desc: "Locked · earns yield while you train" },
  { icon: "4", title: "Train & Sync", desc: "Strava GPX → oracle verified" },
  { icon: "5", title: "Withdraw Milestones", desc: "10% back per 10% progress" },
  { icon: "6", title: "Claim Territory", desc: "Own your fitness domain" },
] as const;

const Step: React.FC<{
  step: (typeof STEPS)[number];
  index: number;
  startFrame: number;
  durationPerStep: number;
}> = ({ step, index, startFrame, durationPerStep }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  const stepStart = index * durationPerStep;

  const opacity = interpolate(
    localFrame,
    [stepStart, stepStart + 5],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
  );

  const slideX = interpolate(
    localFrame,
    [stepStart, stepStart + 10],
    [40, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  const iconScale = spring({
    fps,
    frame: localFrame,
    config: { damping: 12 },
    delay: stepStart,
    durationInFrames: 15,
  });

  if (localFrame < stepStart) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        opacity,
        transform: `translateX(${slideX}px)`,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: step.icon === "3" ? C.orange : step.icon === "5" ? C.green : C.blue,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 700,
          color: C.white,
          flexShrink: 0,
          transform: `scale(${iconScale})`,
        }}
      >
        {step.icon}
      </div>
      <div>
        <div style={{ fontSize: 22, fontWeight: 600, color: C.white }}>
          {step.title}
        </div>
        <div style={{ fontSize: 15, color: C.muted }}>{step.desc}</div>
      </div>
    </div>
  );
};

export const HowItWorks: React.FC = () => {
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

  const lineWidth = interpolate(frame, [5, 30], [0, 180], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const STEPS_START = 30;
  const DURATION_PER_STEP = 80;

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
      <div style={{ opacity: titleOpacity, transform: `translateY(${titleSlide}px)` }}>
        <h2
          style={{
            fontSize: 40,
            fontWeight: 800,
            margin: 0,
            color: C.white,
            letterSpacing: "-0.02em",
          }}
        >
          How It Works
        </h2>
        <div
          style={{
            height: 4,
            width: lineWidth,
            background: `linear-gradient(90deg, ${C.blue}, ${C.green})`,
            borderRadius: 2,
            marginTop: 8,
            marginBottom: 30,
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {STEPS.map((step, i) => (
          <Step
            key={step.icon}
            step={step}
            index={i}
            startFrame={STEPS_START}
            durationPerStep={DURATION_PER_STEP}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
