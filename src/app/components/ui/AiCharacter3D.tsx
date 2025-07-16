"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function AvatarModel() {
  const { scene } = useGLTF("/character.glb");
  return <primitive object={scene} scale={1.3} />;
}

export default function AiCharacter3D() {
  return (
    <div className="w-full h-[220px] md:h-[280px]">
      <Canvas camera={{ position: [0, 1.5, 3] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={0.6} />
        <AvatarModel />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
