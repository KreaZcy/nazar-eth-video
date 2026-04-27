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

const IMG_W = 160;
const IMG_H = 108;
const IMG_GAP = 8;

export const HowItWorks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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

  const activeStep = Math.min(
    Math.floor(Math.max(0, frame - STEPS_START) / DURATION_PER_STEP),
    5,
  );

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
      <div style={{ opacity: titleOpacity, transform: `translateY(${titleSlide}px)`, marginBottom: 20 }}>
        <h2 style={{ fontSize: 40, fontWeight: 800, margin: 0, color: C.white, letterSpacing: "-0.02em" }}>
          How It Works
        </h2>
        <div
          style={{
            height: 4,
            width: lineWidth,
            background: `linear-gradient(90deg, ${C.blue}, ${C.green})`,
            borderRadius: 2,
            marginTop: 8,
          }}
        />
      </div>

      <div style={{ display: "flex", gap: 40, flex: 1 }}>
        {/* Left: step list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0, width: 380 }}>
          {STEPS.map((step, i) => {
            const localFrame = frame - STEPS_START;
            const stepStart = i * DURATION_PER_STEP;

            const opacity = interpolate(localFrame, [stepStart, stepStart + 5], [0, 1], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
            });

            const slideX = interpolate(localFrame, [stepStart, stepStart + 10], [40, 0], {
              extrapolateRight: "clamp",
              extrapolateLeft: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            });

            const iconScale = spring({ fps, frame: localFrame, config: { damping: 12 }, delay: stepStart, durationInFrames: 15 });

            const isActive = i === activeStep && localFrame >= stepStart;

            if (localFrame < stepStart) return null;

            return (
              <div
                key={step.num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  opacity,
                  transform: `translateX(${slideX}px)`,
                  background: isActive ? `${C.bgCard}` : "transparent",
                  borderRadius: 10,
                  padding: isActive ? "10px 14px" : "10px 14px",
                  border: isActive ? `1px solid ${C.blue}40` : "1px solid transparent",
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: step.num === "3" ? C.orange : step.num === "5" ? C.green : C.blue,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 700,
                    color: C.white,
                    flexShrink: 0,
                    transform: `scale(${iconScale})`,
                  }}
                >
                  {step.num}
                </div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 600, color: C.white }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: 14, color: C.muted }}>{step.desc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: current step images */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {STEPS.map((step, i) => {
            const localFrame = frame - STEPS_START;
            const stepStart = i * DURATION_PER_STEP;
            const isActive = i === activeStep && localFrame >= stepStart;

            if (!isActive) return null;

            const count = step.images.length;
            const totalW = count * IMG_W + (count - 1) * IMG_GAP;

            return (
              <div
                key={step.num}
                style={{
                  display: "flex",
                  gap: IMG_GAP,
                  justifyContent: "flex-end",
                  width: totalW,
                }}
              >
                {step.images.map((img, j) => {
                  const imgDelay = stepStart + j * 8;
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
                      key={j}
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
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
