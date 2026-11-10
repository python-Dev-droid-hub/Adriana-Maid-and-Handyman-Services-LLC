"use client";

import { Canvas } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

function FloatingShapes() {
  return (
    <group>
      <Float speed={1.15} rotationIntensity={0.25} floatIntensity={0.75}>
        <mesh position={[-1.4, 0.35, -1.6]}>
          <sphereGeometry args={[0.32, 20, 20]} />
          <meshBasicMaterial color="#13A89E" transparent opacity={0.38} />
        </mesh>
      </Float>

      <Float speed={1.45} rotationIntensity={0.35} floatIntensity={0.9}>
        <RoundedBox
          args={[0.55, 0.55, 0.55]}
          radius={0.12}
          smoothness={4}
          position={[1.25, -0.1, -1.4]}
        >
          <meshBasicMaterial color="#FF8A3D" transparent opacity={0.34} />
        </RoundedBox>
      </Float>

      <Float speed={1.05} rotationIntensity={0.2} floatIntensity={0.65}>
        <mesh position={[0.2, 0.8, -2.1]}>
          <sphereGeometry args={[0.22, 16, 16]} />
          <meshBasicMaterial color="#7AD7F0" transparent opacity={0.42} />
        </mesh>
      </Float>

      <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.7}>
        <RoundedBox
          args={[0.42, 0.42, 0.42]}
          radius={0.1}
          smoothness={3}
          position={[-0.5, -0.65, -1.9]}
        >
          <meshBasicMaterial color="#4FC3F7" transparent opacity={0.32} />
        </RoundedBox>
      </Float>

      <Float speed={0.95} rotationIntensity={0.15} floatIntensity={0.55}>
        <mesh position={[1.6, 0.55, -2.4]}>
          <sphereGeometry args={[0.18, 14, 14]} />
          <meshBasicMaterial color="#13A89E" transparent opacity={0.28} />
        </mesh>
      </Float>
    </group>
  );
}

type HeroScene3DProps = HTMLAttributes<HTMLDivElement>;

export function HeroScene3D({ className, ...props }: HeroScene3DProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0", className)} {...props}>
      <Canvas
        dpr={[1, 1.35]}
        camera={{ position: [0, 0, 3.2], fov: 42 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
