import React from "react";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
import { Audio, staticFile } from "remotion";
import { Intro } from "./Intro";
import { Hook } from "./Hook";
import { Problem } from "./Problem";
import { Solution } from "./Solution";
import { HowItWorks } from "./HowItWorks";
import { FeatureCombo } from "./FeatureCombo";
import { Differentiator } from "./Differentiator";
import { CTA } from "./CTA";
import { Outro } from "./Outro";

const T = 6;

const S: React.FC<{
  children: React.ReactNode;
  audioSrc: string;
}> = ({ children, audioSrc }) => (
  <>
    <Audio src={staticFile(audioSrc)} />
    {children}
  </>
);

export const NazarETHDemo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={108}>
        <S audioSrc="/narration/intro.mp3"><Intro /></S>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={226}>
        <S audioSrc="/narration/hook.mp3"><Hook /></S>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={309}>
        <S audioSrc="/narration/problem.mp3"><Problem /></S>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={285}>
        <S audioSrc="/narration/solution.mp3"><Solution /></S>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={357}>
        <S audioSrc="/narration/howitworks.mp3"><HowItWorks /></S>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={256}>
        <S audioSrc="/narration/featurecombo.mp3"><FeatureCombo /></S>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={455}>
        <S audioSrc="/narration/differentiator.mp3"><Differentiator /></S>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={320}>
        <S audioSrc="/narration/cta.mp3"><CTA /></S>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={234}>
        <S audioSrc="/narration/outro.mp3"><Outro /></S>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
