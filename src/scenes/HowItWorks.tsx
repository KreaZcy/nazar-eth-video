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

const STEPS = [
  {
    num: "1",
    title: "Connect Wallet + Strava",
    desc: "OAuth 2.0 | EIP-712",
    images: [
      "/steps/1_1_ConnectWallet.png",
      "/steps/1_2_Connect Strava.jpeg",
      "/steps/1_3_Strava OAuth.jpeg",
    ],
  },
  {
    num: "2",
    title: "Create Challenge",
    desc: "Pick sport \u00b7 distance \u00b7 stake",
    images: [
      "/steps/2_1_Create Challenge.jpeg",
      "/steps/2_2_Set Challenge.jpeg",
      "/steps/2_3_See Challenge.jpeg",
    ],
  },
  {
    num: "3",
    title: "Deposit USDC",
    desc: "Locked \u00b7 earns yield while you train",
    images: [
      "/steps/3_1_Init Deposit.jpeg",
      "/steps/3_2_Deposited.jpeg",
    ],
  },
  {
    num: "4",
    title: "Train & Sync",
    desc: "Strava GPX \u2192 oracle verified",
    images: [
      "/steps/4_1_Sync 0.jpeg",
      "/steps/4_2_Sync Progress.jpeg",
    ],
  },
  {
    num: "5",
    title: "Withdraw Milestones",
    desc: "10% back per 10% progress",
    images: [
      "/steps/5_1_Withdrawable.jpeg",
      "/steps/5_2_Withdrawn.jpeg",
      "/steps/5_3_Withdraw Full.jpeg",
    ],
  },
  {
    num: "6",
    title: "Claim Territory",
    desc: "Own your fitness domain",
    images: [
      "/steps/6_1_Strava History.jpeg",
      "/steps/6_2_Conquered 1.jpeg",
      "/steps/6_3_Conquered 2.jpeg",
    ],
  },
] as const;

const IMG_W = 180;
const IMG_H = 120;
const IMG_GAP = 8;

const StepImages: React.FC<{
  images: readonly string[];
  localFrame: number;
  stepStart: number;
}> = ({ images, localFrame, stepStart }) => {
  const count = images.length;
  const totalW = count * IMG_W + (count - 1) * IMG_GAP;

  return (
    <div
      style={{
        display: "flex",
        gap: IMG_GAP,
        justifyContent: "flex-end",
        width: totalW,
      }}
    >
      {images.map((img, i) => {
        const imgDelay = stepStart + i * 8;
        const imgScale = interpolate(
          localFrame - imgDelay,
          [0, 12],
          [0.5, 1],
          {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
            easing: Easing.bezier(0.34, 1.56, 0.64, 1),
          },
        );
        const imgOp = interpolate(
          localFrame,
          [imgDelay, imgDelay + 6],
          [0, 1],
          { extrapolateRight: "clamp", extrapolateLeft: "clamp" },
        );

        return (
          <div
            key={i}
            style={{
              width: IMG_W,
              height: IMG_H,
              borderRadius: 10,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              opacity: imgOp,
              transform: `scale(${imgScale})`,
              background: C.bgCard,
            }}
          >
            <Img
              src={staticFile(img)}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        );
      })}
    </div>
  );
};

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
        justifyContent: "space-between",
        opacity,
        transform: `translateX(${slideX}px)`,
        marginBottom: 8,
        gap: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background:
              step.num === "3"
                ? C.orange
                : step.num === "5"
                  ? C.green
                  : C.blue,
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
          {step.num}
        </div>
        <div>
          <div style={{ fontSize: 22, fontWeight: 600, color: C.white }}>
            {step.title}
          </div>
          <div style={{ fontSize: 15, color: C.muted }}>{step.desc}</div>
        </div>
      </div>

      <StepImages
        images={step.images}
        localFrame={localFrame}
        stepStart={stepStart}
      />
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
  const DURATION_PER_STEP = 50;

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        padding: "50px 60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontFamily: "system-ui, sans-serif",
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
            marginBottom: 24,
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {STEPS.map((step, i) => (
          <Step
            key={step.num}
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
