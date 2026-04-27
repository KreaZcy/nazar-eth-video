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
import { TechStack } from "./TechStack";
import { CTA } from "./CTA";
import { Outro } from "./Outro";

const T = 6;

const SceneWithAudio: React.FC<{
  children: React.ReactNode;
  audioSrc: string;
}> = ({ children, audioSrc }) => {
  return (
    <>
      <Audio src={staticFile(audioSrc)} />
      {children}
    </>
  );
};

export const NazarETHDemo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={90}>
        <SceneWithAudio audioSrc="/narration/intro.mp3">
          <Intro />
        </SceneWithAudio>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={225}>
        <SceneWithAudio audioSrc="/narration/hook.mp3">
          <Hook />
        </SceneWithAudio>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={310}>
        <SceneWithAudio audioSrc="/narration/problem.mp3">
          <Problem />
        </SceneWithAudio>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={285}>
        <SceneWithAudio audioSrc="/narration/solution.mp3">
          <Solution />
        </SceneWithAudio>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={575}>
        <SceneWithAudio audioSrc="/narration/howitworks.mp3">
          <HowItWorks />
        </SceneWithAudio>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={255}>
        <SceneWithAudio audioSrc="/narration/featurecombo.mp3">
          <FeatureCombo />
        </SceneWithAudio>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={235}>
        <SceneWithAudio audioSrc="/narration/differentiator.mp3">
          <Differentiator />
        </SceneWithAudio>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={slide()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={130}>
        <SceneWithAudio audioSrc="/narration/techstack.mp3">
          <TechStack />
        </SceneWithAudio>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={wipe()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={95}>
        <SceneWithAudio audioSrc="/narration/cta.mp3">
          <CTA />
        </SceneWithAudio>
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
      <TransitionSeries.Sequence durationInFrames={65}>
        <SceneWithAudio audioSrc="/narration/outro.mp3">
          <Outro />
        </SceneWithAudio>
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
