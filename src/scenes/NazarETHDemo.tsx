import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { slide } from "@remotion/transitions/slide";
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

export const NazarETHDemo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={150}>
        <Intro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 9 })}
      />
      <TransitionSeries.Sequence durationInFrames={150}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: 9 })}
      />
      <TransitionSeries.Sequence durationInFrames={170}>
        <Problem />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe()}
        timing={linearTiming({ durationInFrames: 9 })}
      />
      <TransitionSeries.Sequence durationInFrames={170}>
        <Solution />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: 9 })}
      />
      <TransitionSeries.Sequence durationInFrames={280}>
        <HowItWorks />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe()}
        timing={linearTiming({ durationInFrames: 9 })}
      />
      <TransitionSeries.Sequence durationInFrames={220}>
        <FeatureCombo />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 9 })}
      />
      <TransitionSeries.Sequence durationInFrames={180}>
        <Differentiator />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: 9 })}
      />
      <TransitionSeries.Sequence durationInFrames={130}>
        <TechStack />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe()}
        timing={linearTiming({ durationInFrames: 9 })}
      />
      <TransitionSeries.Sequence durationInFrames={140}>
        <CTA />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe()}
        timing={linearTiming({ durationInFrames: 9 })}
      />
      <TransitionSeries.Sequence durationInFrames={129}>
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
