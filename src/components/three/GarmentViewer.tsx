'use client';

import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, RoundedBox } from '@react-three/drei';
import { useStore } from '@/store/useStore';
import * as THREE from 'three';

// Hoodie 3D model built from primitives
function HoodieModel({ color = '#1a1a1a' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const mat = <meshStandardMaterial color={color} roughness={0.8} metalness={0.05} />;

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.02 : 1}
    >
      {/* Main body / torso */}
      <RoundedBox args={[1.6, 2, 0.7]} radius={0.15} position={[0, 0, 0]}>
        {mat}
      </RoundedBox>

      {/* Hood */}
      <RoundedBox args={[0.9, 0.7, 0.6]} radius={0.15} position={[0, 1.3, -0.1]}>
        {mat}
      </RoundedBox>
      {/* Hood brim */}
      <RoundedBox args={[0.7, 0.3, 0.15]} radius={0.08} position={[0, 1.05, 0.3]}>
        {mat}
      </RoundedBox>

      {/* Left sleeve */}
      <RoundedBox args={[0.55, 1.6, 0.55]} radius={0.12} position={[-1.05, 0.1, 0]} rotation={[0, 0, 0.2]}>
        {mat}
      </RoundedBox>

      {/* Right sleeve */}
      <RoundedBox args={[0.55, 1.6, 0.55]} radius={0.12} position={[1.05, 0.1, 0]} rotation={[0, 0, -0.2]}>
        {mat}
      </RoundedBox>

      {/* Kangaroo pocket */}
      <RoundedBox args={[0.9, 0.4, 0.08]} radius={0.06} position={[0, -0.4, 0.38]}>
        <meshStandardMaterial color={color} roughness={0.9} metalness={0.02} />
      </RoundedBox>

      {/* Ribbed hem */}
      <RoundedBox args={[1.55, 0.15, 0.68]} radius={0.04} position={[0, -1.05, 0]}>
        <meshStandardMaterial color={color} roughness={0.95} metalness={0.02} />
      </RoundedBox>

      {/* Left cuff */}
      <RoundedBox args={[0.52, 0.12, 0.52]} radius={0.04} position={[-1.2, -0.7, 0]}>
        <meshStandardMaterial color={color} roughness={0.95} metalness={0.02} />
      </RoundedBox>

      {/* Right cuff */}
      <RoundedBox args={[0.52, 0.12, 0.52]} radius={0.04} position={[1.2, -0.7, 0]}>
        <meshStandardMaterial color={color} roughness={0.95} metalness={0.02} />
      </RoundedBox>

      {/* Drawstrings */}
      <mesh position={[-0.1, 0.85, 0.35]}>
        <cylinderGeometry args={[0.012, 0.012, 0.5, 8]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[0.1, 0.85, 0.35]}>
        <cylinderGeometry args={[0.012, 0.012, 0.5, 8]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </group>
  );
}

// Annotation markers in 3D space
function AnnotationMarkers() {
  const annotations = useStore((s) => s.annotations);
  const openAnnotations = annotations.filter((a) => a.status === 'open');

  return (
    <>
      {openAnnotations.map((ann, i) => (
        <group key={ann.id} position={[ann.posX, ann.posY, ann.posZ]}>
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
    </>
  );
}

export function GarmentViewer() {
  const garments = useStore((s) => s.garments);
  const activeGarment = garments[0];
  const firstColor = activeGarment?.colorways?.[0] ?? '#1a1a1a';

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 40 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <directionalLight position={[-3, 3, -3]} intensity={0.3} />

        <HoodieModel color={firstColor} />
        <AnnotationMarkers />

        <ContactShadows position={[0, -1.3, 0]} opacity={0.3} scale={5} blur={2.5} />
        <Environment preset="studio" />
        <OrbitControls
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          minDistance={3}
          maxDistance={8}
        />
      </Canvas>

      {/* Bottom bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <button className="bg-gray-800/80 backdrop-blur text-white text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" /></svg>
          Sequencer
        </button>
      </div>
    </div>
  );
}
