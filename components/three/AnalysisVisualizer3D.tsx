"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type AnalysisStatus = "idle" | "analyzing" | "real" | "synthetic";

interface AnalysisVisualizer3DProps {
  status: AnalysisStatus;
}

/**
 * Componente 3D melhorado que visualiza o processo de análise de imagem
 * Animação rica com fluxo de dados, scanner e plano principal
 * Só renderiza quando status === "analyzing"
 */

// Plano principal (representa a imagem sendo analisada)
const ImagePlane: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Sutil pulso durante análise
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      meshRef.current.scale.set(scale, scale, 1);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[-Math.PI / 2.2, 0, 0]}>
      <planeGeometry args={[3.5, 3.5]} />
      <meshStandardMaterial
        color={0x60a5fa}
        transparent
        opacity={0.6}
        emissive={0x3b82f6}
        emissiveIntensity={0.4}
      />
    </mesh>
  );
};

// Trails (linhas de dados correndo de esquerda para direita)
const DataTrails: React.FC = () => {
  const trailsRef = useRef<THREE.InstancedMesh>(null);
  const trailCount = 30;

  const { positions, lengths } = useMemo(() => {
    const pos = new Float32Array(trailCount * 3);
    const len = new Float32Array(trailCount);

    for (let i = 0; i < trailCount; i++) {
      // Posição inicial aleatória
      pos[i * 3] = (Math.random() - 0.5) * 8 - 4; // X: começa à esquerda
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4; // Y: variação vertical
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3; // Z: profundidade

      // Comprimento variado
      len[i] = 0.3 + Math.random() * 0.5;
    }

    return { positions: pos, lengths: len };
  }, []);

  useFrame((state) => {
    if (trailsRef.current) {
      const time = state.clock.elapsedTime;

      for (let i = 0; i < trailCount; i++) {
        const matrix = new THREE.Matrix4();
        const x = positions[i * 3];
        const y = positions[i * 3 + 1];
        const z = positions[i * 3 + 2];

        // Movimento lateral rápido (esquerda → direita)
        const speed = 2 + Math.random() * 2; // Velocidade variada
        const newX = ((x + time * speed) % 8) - 4;

        // Variação sutil em Y e Z para efeito de fluxo
        const offsetY = Math.sin(time * 0.5 + i) * 0.2;
        const offsetZ = Math.cos(time * 0.3 + i) * 0.1;

        matrix.makeScale(lengths[i], 0.05, 0.05);
        matrix.setPosition(newX, y + offsetY, z + offsetZ);

        trailsRef.current.setMatrixAt(i, matrix);
      }

      trailsRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={trailsRef} args={[undefined, undefined, trailCount]}>
      <boxGeometry args={[1, 0.05, 0.05]} />
      <meshStandardMaterial
        color={0x7dd3fc}
        emissive={0x38bdf8}
        emissiveIntensity={0.8}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
};

// Scanner (barra de luz atravessando o plano)
const Scanner: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Scanner movendo da esquerda para direita continuamente
      const position = ((state.clock.elapsedTime * 1.2) % 4) - 2;
      meshRef.current.position.x = position;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[-2, 0, 0.1]}
      rotation={[-Math.PI / 2.2, 0, 0]}
    >
      <planeGeometry args={[0.15, 3.8]} />
      <meshStandardMaterial
        color={0xffffff}
        transparent
        opacity={0.7}
        emissive={0xffffff}
        emissiveIntensity={1.2}
      />
    </mesh>
  );
};

// Partículas adicionais para efeito de fluxo
const FlowParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 150;

  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        // Movimento lateral rápido
        positions[i * 3] -= 0.15;
        if (positions[i * 3] < -5) {
          positions[i * 3] = 5;
          // Resetar Y e Z para variação
          positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={0x60a5fa}
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        emissive={0x3b82f6}
        emissiveIntensity={0.5}
      />
    </points>
  );
};

// Cena principal
const Scene: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.3} />

      <ImagePlane />
      <DataTrails />
      <FlowParticles />
      <Scanner />
    </>
  );
};

export const AnalysisVisualizer3D: React.FC<AnalysisVisualizer3DProps> = ({
  status,
}) => {
  // Só renderiza quando está analisando
  if (status !== "analyzing") {
    return null;
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden bg-gradient-to-br from-primary-900 to-primary-700">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 60 }}
        gl={{ antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};
