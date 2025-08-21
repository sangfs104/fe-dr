import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

interface Interactive3DAIProps {
  isActive: boolean;
  onToggle: () => void;
  onVoiceCommand: (command: string) => void;
}

export default function Interactive3DAI({
  isActive,
  onToggle,
  onVoiceCommand,
}: Interactive3DAIProps) {
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const modelRef = useRef<THREE.Group>(null);

  // Load 3D model and animations
  const { scene, animations } = useGLTF("/models/avatar.gltf"); // Replace with your GLTF path
  const { actions } = useAnimations(animations, modelRef);

  useEffect(() => {
    // Play idle animation by default
    actions["idle"]?.play();

    // Setup Web Speech API for voice recognition (Vietnamese + English support)
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.lang = "vi-VN"; // Vietnamese primary, fallback to en-US if needed
      rec.continuous = true;
      rec.interimResults = false;

      rec.onresult = (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        onVoiceCommand(transcript);
      };

      rec.onerror = (event) =>
        console.error("Speech recognition error:", event.error);

      setRecognition(rec);
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }

    return () => {
      actions["idle"]?.stop();
    };
  }, [actions, onVoiceCommand]);

  useEffect(() => {
    if (isActive && recognition) {
      recognition.start();
      // Play "listen" animation when active
      actions["listen"]?.play();
    } else if (recognition) {
      recognition.stop();
      actions["listen"]?.stop();
      actions["idle"]?.play();
    }
  }, [isActive, recognition, actions]);

  // Animate the model (e.g., subtle rotation or breathing)
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001; // Slow rotation for "alive" feel
    }
  });

  return (
    <div
      className="fixed bottom-20 right-4 w-32 h-32 cursor-pointer z-40" // Adjust size/position as needed
      onClick={onToggle}
    >
      <Canvas camera={{ position: [0, 1, 2], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <primitive
          object={scene}
          ref={modelRef}
          scale={0.5}
          position={[0, -1, 0]}
        />{" "}
        {/* Adjust scale/position */}
        <OrbitControls enableZoom={false} enablePan={false} />{" "}
        {/* Optional: allow orbiting */}
      </Canvas>
      {isActive && (
        <div className="text-center text-sm text-green-500">
          Đang lắng nghe...
        </div>
      )}
    </div>
  );
}

// Preload the model for better performance
useGLTF.preload("/models/avatar.gltf");
