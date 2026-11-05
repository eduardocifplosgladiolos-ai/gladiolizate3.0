import { EffectComposer, Bloom } from "@react-three/postprocessing";

export default function PostprocessScene() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.2} luminanceThreshold={0.25} luminanceSmoothing={0.6} />
    </EffectComposer>
  );
}
