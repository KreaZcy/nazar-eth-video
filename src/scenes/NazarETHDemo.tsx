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
      <TransitionSeries.Sequence durationInFrames={140}>
        <Intro />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 8 })}
      />
      <TransitionSeries.Sequence durationInFrames={185}>
        <Hook />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: 8 })}
      />
      <TransitionSeries.Sequence durationInFrames={200}>
        <Problem />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe()}
        timing={linearTiming({ durationInFrames: 8 })}
      />
      <TransitionSeries.Sequence durationInFrames={195}>
        <Solution />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: 8 })}
      />
      <TransitionSeries.Sequence durationInFrames={270}>
        <HowItWorks />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe()}
        timing={linearTiming({ durationInFrames: 8 })}
      />
      <TransitionSeries.Sequence durationInFrames={215}>
        <FeatureCombo />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 8 })}
      />
      <TransitionSeries.Sequence durationInFrames={175}>
        <Differentiator />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={slide()}
        timing={linearTiming({ durationInFrames: 8 })}
      />
      <TransitionSeries.Sequence durationInFrames={190}>
        <TechStack />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={wipe()}
        timing={linearTiming({ durationInFrames: 8 })}
      />
      <TransitionSeries.Sequence durationInFrames={120}>
        <CTA />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 8 })}
      />
      <TransitionSeries.Sequence durationInFrames={110}>
        <Outro />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
