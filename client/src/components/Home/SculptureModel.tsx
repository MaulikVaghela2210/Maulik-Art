import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

function Model() {
  const model = useGLTF("/models/sculpture.glb");

  return <primitive object={model.scene} scale={2} />;
}

const SculptureModel = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>

      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight position={[2, 2, 5]} intensity={2} />

      {/* 3D Model */}
      <Model />

      {/* Mouse Control */}
      <OrbitControls enableZoom={false} />

      {/* Environment reflection */}
      <Environment preset="studio" />

    </Canvas>
  );
};

export default SculptureModel;