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

export const NazarETHDemo: React.FC = () => {
  return (
    <>
      <Audio src={staticFile("/narration/intro.mp3")} startFrom={0} />
      <Audio src={staticFile("/narration/hook.mp3")} startFrom={96} />
      <Audio src={staticFile("/narration/problem.mp3")} startFrom={327} />
      <Audio src={staticFile("/narration/solution.mp3")} startFrom={643} />
      <Audio src={staticFile("/narration/howitworks.mp3")} startFrom={934} />
      <Audio src={staticFile("/narration/featurecombo.mp3")} startFrom={1515} />
      <Audio src={staticFile("/narration/differentiator.mp3")} startFrom={1776} />
      <Audio src={staticFile("/narration/techstack.mp3")} startFrom={2017} />
      <Audio src={staticFile("/narration/cta.mp3")} startFrom={2153} />
      <Audio src={staticFile("/narration/outro.mp3")} startFrom={2254} />

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={90}>
          <Intro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={225}>
          <Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={310}>
          <Problem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={285}>
          <Solution />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={575}>
          <HowItWorks />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={255}>
          <FeatureCombo />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={235}>
          <Differentiator />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={130}>
          <TechStack />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={95}>
          <CTA />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={65}>
          <Outro />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
