import "./index.css";
import { Composition } from "remotion";
import { NazarETHDemo } from "./scenes/NazarETHDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="NazarETHDemo"
      component={NazarETHDemo}
      durationInFrames={2598}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
