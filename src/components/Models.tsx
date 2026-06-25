'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. HERO CONSTELLATION: Futuristic geometric network mapping
export function HeroConstellation(props: React.ComponentPropsWithoutRef<'group'>) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    }
    if (coreRef.current) {
      coreRef.current.rotation.z = -t * 0.2;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <Float speed={2} floatIntensity={0.6}>
        {/* Core Node */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshStandardMaterial color="#00e5ff" wireframe emissive="#004455" emissiveIntensity={0.5} />
        </mesh>
        
        {/* Outer Orbit Rings */}
        <Torus args={[2.2, 0.02, 8, 64]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#3b82f6" opacity={0.3} transparent />
        </Torus>
        <Torus args={[2.5, 0.015, 8, 64]} rotation={[0, Math.PI / 4, 0]}>
          <meshBasicMaterial color="#bd00ff" opacity={0.2} transparent />
        </Torus>

        {/* Constellation Nodes */}
        {[[1.8, 1, 1], [-1.5, -1, 1.2], [0.5, -1.8, -1], [-0.8, 1.6, -1.2], [2, -0.5, -1.5]].map((pos, idx) => (
          <group key={idx} position={pos as [number, number, number]}>
            <Sphere args={[idx === 0 ? 0.18 : 0.12, 16, 16]}>
              <meshStandardMaterial 
                color={idx % 2 === 0 ? "#00e5ff" : "#bd00ff"} 
                emissive={idx % 2 === 0 ? "#00e5ff" : "#bd00ff"}
                emissiveIntensity={0.8}
              />
            </Sphere>
          </group>
        ))}
      </Float>
    </group>
  );
}

// 2. RETRO TERMINAL: Classic CRT Computer Setup for systems/Linux theme
export function RetroTerminal(props: React.ComponentPropsWithoutRef<'group'>) {
  const textRef = useRef<THREE.Mesh & { fillOpacity: number }>(null);
  
  useFrame((state) => {
    if (textRef.current) {
      // Simulate retro CRT screen flicker/blink
      textRef.current.fillOpacity = Math.sin(state.clock.elapsedTime * 6) > 0 ? 1 : 0.35;
    }
  });

  return (
    <group {...props}>
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
        {/* Desk Surface */}
        <Box args={[5.5, 0.15, 3.5]} position={[0, -1.4, 0.2]}>
          <meshStandardMaterial color="#1a1410" roughness={0.95} />
        </Box>
        
        {/* Computer Case / Base */}
        <Box args={[3.2, 1.2, 2.8]} position={[0, -0.7, 0]}>
          <meshStandardMaterial color="#cbc6bd" roughness={0.7} />
        </Box>
        
        {/* CRT Bezel / Screen Housing */}
        <Box args={[3.0, 2.2, 2.4]} position={[0, 0.8, -0.1]}>
          <meshStandardMaterial color="#cbc6bd" roughness={0.7} />
        </Box>
        
        {/* CRT Screen Glass */}
        <Box args={[2.5, 1.8, 0.15]} position={[0, 0.8, 1.1]}>
          <meshStandardMaterial color="#051c05" emissive="#002200" roughness={0.1} metalness={0.9} />
        </Box>
        
        {/* Keyboard Base */}
        <Box args={[2.8, 0.1, 1.2]} position={[0, -1.3, 1.4]}>
          <meshStandardMaterial color="#cbc6bd" />
        </Box>
        {/* Key blocks */}
        <Box args={[2.5, 0.08, 0.9]} position={[0, -1.23, 1.4]}>
          <meshStandardMaterial color="#403c37" roughness={0.8} />
        </Box>

        {/* Glowing Terminal Text */}
        <Text
          ref={textRef}
          position={[-1.0, 1.4, 1.21]}
          fontSize={0.12}
          color="#39ff14"
          anchorX="left"
          anchorY="top"
        >
          {`shreesh@ubuntu:~$ _`}
        </Text>
        <Text
          position={[-1.0, 1.1, 1.21]}
          fontSize={0.095}
          color="#39ff14"
          anchorX="left"
          anchorY="top"
        >
          {`$ cat systems_skills.yaml\n---------------------\nos: Linux (Ubuntu/CentOS)\nshell: Bash, Scripting\ntools: Docker, Git, SSH\npractices: Clean Code, CI/CD\nstatus: ACTIVE [OK]`}
        </Text>
      </Float>
    </group>
  );
}

// 3. iMAC WORKSTATION: Single Apple iMac for Projects section
export function ImacWorkstation(props: React.ComponentPropsWithoutRef<'group'>) {
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (screenRef.current) {
      const t = state.clock.elapsedTime;
      (screenRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.12 + Math.sin(t * 1.5) * 0.06;
    }
  });

  return (
    <group {...props}>
      <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.25}>
        {/* Desk */}
        <Box args={[5.5, 0.12, 2.8]} position={[0, -1.45, 0]}>
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </Box>

        <group position={[0, 0.15, 0]}>
          {/* Display housing — silver aluminum */}
          <Box args={[3.6, 2.35, 0.08]}>
            <meshStandardMaterial color="#d4d4d8" metalness={0.92} roughness={0.12} />
          </Box>
          {/* Inner bezel */}
          <Box args={[3.48, 2.22, 0.09]} position={[0, 0, 0.01]}>
            <meshStandardMaterial color="#09090b" roughness={0.95} />
          </Box>
          {/* Screen glow */}
          <Box ref={screenRef} args={[3.38, 2.12, 0.04]} position={[0, 0.02, 0.05]}>
            <meshStandardMaterial
              color="#0c1222"
              emissive="#22d3ee"
              emissiveIntensity={0.15}
              roughness={0.05}
              metalness={0.9}
            />
          </Box>
          {/* Chin strip */}
          <Box args={[3.6, 0.18, 0.09]} position={[0, -1.18, 0.01]}>
            <meshStandardMaterial color="#d4d4d8" metalness={0.92} roughness={0.12} />
          </Box>
          {/* Neck */}
          <Box args={[0.18, 0.55, 0.06]} position={[0, -1.52, -0.02]}>
            <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.15} />
          </Box>
          {/* Foot */}
          <Box args={[1.35, 0.04, 0.75]} position={[0, -1.78, 0]}>
            <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.15} />
          </Box>
        </group>

        {/* Keyboard */}
        <Box args={[2.2, 0.04, 0.85]} position={[0, -1.38, 0.85]}>
          <meshStandardMaterial color="#71717a" metalness={0.7} roughness={0.3} />
        </Box>
      </Float>
    </group>
  );
}

// 3b. WEB MONITORS: Workstation Setup representing Frontend
export function WebMonitors(props: React.ComponentPropsWithoutRef<'group'>) {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Gentle parallax sway
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    }
  });

  return (
    <group ref={group} {...props}>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
        {/* Desktop Surface */}
        <Box args={[6, 0.1, 3.2]} position={[0, -1.4, 0]}>
          <meshStandardMaterial color="#111111" roughness={0.8} />
        </Box>

        {/* Central Apple Studio Display Monitor */}
        <group position={[-0.6, -0.1, -0.2]}>
          {/* Bezel & Aluminum Frame */}
          <Box args={[3.4, 2.1, 0.06]}>
            <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
          </Box>
          {/* Bezel inner border */}
          <Box args={[3.28, 1.98, 0.07]} position={[0, 0, 0.01]}>
            <meshStandardMaterial color="#111" roughness={0.9} />
          </Box>
          {/* Glass Screen */}
          <Box args={[3.24, 1.94, 0.05]} position={[0, 0, 0.04]}>
            <meshStandardMaterial color="#020205" emissive="#00e5ff" emissiveIntensity={0.08} roughness={0.05} metalness={0.95} />
          </Box>
          {/* Monitor Stand (Apple style minimalist aluminum arm) */}
          <Box args={[0.25, 1.15, 0.08]} position={[0, -0.9, -0.15]} rotation={[0.15, 0, 0]}>
            <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
          </Box>
          {/* Stand Base */}
          <Box args={[1.1, 0.02, 0.7]} position={[0, -1.38, -0.1]}>
            <meshStandardMaterial color="#e2e8f0" metalness={0.9} roughness={0.15} />
          </Box>
        </group>

        {/* Side vertical Monitor (Code) */}
        <group position={[1.8, 0.1, 0.3]} rotation={[0, -0.35, 0]}>
          <Box args={[1.2, 2.4, 0.08]}>
            <meshStandardMaterial color="#1e293b" />
          </Box>
          <Box args={[1.0, 2.2, 0.05]} position={[0, 0, 0.04]}>
            <meshStandardMaterial color="#0b0f19" emissive="#00e5ff" emissiveIntensity={0.1} />
          </Box>
          {/* Monitor Stand */}
          <Box args={[0.15, 1.2, 0.1]} position={[0, -1.2, -0.1]}>
            <meshStandardMaterial color="#334155" />
          </Box>
          <Box args={[0.8, 0.05, 0.8]} position={[0, -1.35, 0]}>
            <meshStandardMaterial color="#1e293b" />
          </Box>
        </group>
        
        {/* Floating Modern Laptop */}
        <group position={[-2.4, -0.9, 0.8]} rotation={[0, 0.5, 0]}>
          {/* Laptop Base */}
          <Box args={[1.6, 0.04, 1.1]}>
            <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
          </Box>
          {/* Laptop Screen (opened at angle) */}
          <group position={[0, 0.02, -0.55]} rotation={[1.2, 0, 0]}>
            <Box args={[1.6, 1.1, 0.04]} position={[0, 0.55, 0]}>
              <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
            </Box>
            <Box args={[1.5, 1.0, 0.02]} position={[0, 0.55, 0.03]}>
              <meshStandardMaterial color="#0f172a" emissive="#60a5fa" emissiveIntensity={0.2} />
            </Box>
          </group>
        </group>
      </Float>
    </group>
  );
}

// 4. AI CORE: Glowing central core with particle orbital rings
export function AICore(props: React.ComponentPropsWithoutRef<'group'>) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      // Dynamic breathing scale
      const scale = 1.1 + Math.sin(t * 2.2) * 0.12;
      coreRef.current.scale.setScalar(scale);
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.5 + Math.sin(t * 4) * 0.5;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.45;
      ring1Ref.current.rotation.y = t * 0.65;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -t * 0.5;
      ring2Ref.current.rotation.z = t * 0.75;
    }
  });

  return (
    <group {...props}>
      <Float speed={2.5} floatIntensity={1.2} rotationIntensity={0.8}>
        {/* Core Sphere */}
        <Sphere ref={coreRef} args={[0.9, 16, 16]}>
          <meshStandardMaterial color="#bd00ff" emissive="#d8b4fe" emissiveIntensity={2} wireframe />
        </Sphere>
        
        {/* Inner Glowing Ring */}
        <Torus ref={ring1Ref} args={[1.8, 0.04, 16, 100]}>
          <meshStandardMaterial color="#bd00ff" emissive="#bd00ff" emissiveIntensity={1} />
        </Torus>
        
        {/* Outer Orbiting Ring */}
        <Torus ref={ring2Ref} args={[2.3, 0.03, 16, 100]}>
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.8} />
        </Torus>

        {/* Orbit Node particles */}
        {[0, 1, 2].map((i) => (
          <group key={i} rotation={[0, (i * Math.PI) / 1.5, 0]}>
            <Sphere args={[0.08, 8, 8]} position={[2.3, 0, 0]}>
              <meshBasicMaterial color="#00e5ff" />
            </Sphere>
          </group>
        ))}
      </Float>
    </group>
  );
}

// 5. SERVER RACK: Data center stacks with flashing lights
export function ServerRack(props: React.ComponentPropsWithoutRef<'group'>) {
  return (
    <group {...props}>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.25}>
        {/* External Frame */}
        <Box args={[2.8, 4.8, 2.2]}>
          <meshStandardMaterial color="#070707" roughness={0.85} metalness={0.7} />
        </Box>
        {/* Side panels */}
        <Box args={[2.84, 4.7, 0.15]} position={[0, 0, 1.05]}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </Box>

        {/* 7 Server Blades stacked vertically */}
        {Array.from({ length: 7 }).map((_, idx) => (
          <ServerBlade key={idx} position={[0, 1.8 - idx * 0.6, 1.04]} index={idx} />
        ))}
      </Float>
    </group>
  );
}

function ServerBlade({ position, index }: { position: [number, number, number], index: number }) {
  const ledRef1 = useRef<THREE.Mesh>(null);
  const ledRef2 = useRef<THREE.Mesh>(null);
  const ledRef3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ledRef1.current && ledRef2.current && ledRef3.current) {
      // Simulate rapid server disk usage / read-write blinking
      const flash1 = Math.sin(t * (12 + index * 2)) > 0;
      const flash2 = Math.cos(t * (8 + index * 3)) > -0.2;
      const flash3 = Math.sin(t * (15 + index)) > 0.5;

      (ledRef1.current.material as THREE.MeshStandardMaterial).emissiveIntensity = flash1 ? 2.5 : 0.1;
      (ledRef2.current.material as THREE.MeshStandardMaterial).emissiveIntensity = flash2 ? 2.5 : 0.1;
      (ledRef3.current.material as THREE.MeshStandardMaterial).emissiveIntensity = flash3 ? 2.5 : 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Blade face */}
      <Box args={[2.6, 0.45, 0.08]}>
        <meshStandardMaterial color="#121212" roughness={0.5} />
      </Box>
      {/* Grille slot details */}
      <Box args={[1.2, 0.15, 0.05]} position={[0.4, 0, 0.04]}>
        <meshStandardMaterial color="#222222" />
      </Box>

      {/* LEDs */}
      <Box ref={ledRef1} args={[0.08, 0.08, 0.08]} position={[-1.1, 0.08, 0.05]}>
        <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={0.2} />
      </Box>
      <Box ref={ledRef2} args={[0.08, 0.08, 0.08]} position={[-0.95, 0.08, 0.05]}>
        <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={0.2} />
      </Box>
      <Box ref={ledRef3} args={[0.08, 0.08, 0.08]} position={[-0.8, 0.08, 0.05]}>
        <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={0.2} />
      </Box>

      {/* Handle details */}
      <Box args={[0.08, 0.3, 0.12]} position={[-1.2, 0, 0.05]}>
        <meshStandardMaterial color="#333" />
      </Box>
      <Box args={[0.08, 0.3, 0.12]} position={[1.2, 0, 0.05]}>
        <meshStandardMaterial color="#333" />
      </Box>
    </group>
  );
}

// 6. DATABASE BLUEPRINT: Rotating stacked cylinders representing system architecture
export function DatabaseBlueprint(props: React.ComponentPropsWithoutRef<'group'>) {
  const cyl1 = useRef<THREE.Mesh>(null);
  const cyl2 = useRef<THREE.Mesh>(null);
  const cyl3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (cyl1.current) cyl1.current.rotation.y = t * 0.3;
    if (cyl2.current) cyl2.current.rotation.y = -t * 0.4;
    if (cyl3.current) cyl3.current.rotation.y = t * 0.2;
  });

  return (
    <group {...props}>
      <Float speed={1.8} floatIntensity={0.4} rotationIntensity={0.1}>
        {/* Vertical alignment core shaft */}
        <Box args={[0.1, 3.2, 0.1]} position={[0, 0, 0]}>
          <meshBasicMaterial color="#334155" opacity={0.5} transparent />
        </Box>

        {/* Database Disc Layer 1 (Top) */}
        <mesh ref={cyl1} position={[0, 0.9, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 0.45, 16]} />
          <meshStandardMaterial color="#00e5ff" wireframe emissive="#002233" emissiveIntensity={0.6} />
        </mesh>

        {/* Database Disc Layer 2 (Middle) */}
        <mesh ref={cyl2} position={[0, 0, 0]}>
          <cylinderGeometry args={[1.5, 1.5, 0.5, 16]} />
          <meshStandardMaterial color="#ff007f" wireframe emissive="#220011" emissiveIntensity={0.5} />
        </mesh>

        {/* Database Disc Layer 3 (Bottom) */}
        <mesh ref={cyl3} position={[0, -0.9, 0]}>
          <cylinderGeometry args={[1.4, 1.4, 0.45, 16]} />
          <meshStandardMaterial color="#ffffff" wireframe emissive="#111111" emissiveIntensity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}

// 7. CONTACT BEACON: Simple signal tower emitting a beam of spotlight light
export function ContactBeacon(props: React.ComponentPropsWithoutRef<'group'>) {
  const coreMesh = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreMesh.current) {
      coreMesh.current.rotation.y = t * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.scale.setScalar(1.5 + Math.sin(t * 3.5) * 0.35);
    }
  });

  return (
    <group {...props}>
      <Float speed={1.5} floatIntensity={0.3} rotationIntensity={0.05}>
        {/* Ground Pedestal base */}
        <Box args={[3.2, 0.2, 3.2]} position={[0, -1.4, 0]}>
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
        </Box>
        <Box args={[2.5, 0.15, 2.5]} position={[0, -1.22, 0]}>
          <meshStandardMaterial color="#111" />
        </Box>

        {/* Center glowing crystal beacon core */}
        <mesh ref={coreMesh} position={[0, -0.3, 0]}>
          <octahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial color="#00e5ff" emissive="#00e5ff" emissiveIntensity={1.8} wireframe />
        </mesh>

        {/* Expand-contract pulsing ring */}
        <mesh ref={ringRef} position={[0, -0.3, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.2, 1.3, 32]} />
          <meshBasicMaterial color="#00e5ff" side={THREE.DoubleSide} opacity={0.6} transparent />
        </mesh>
        
        {/* Decorative thin structural beams */}
        {Array.from({ length: 4 }).map((_, idx) => (
          <group key={idx} rotation={[0, (idx * Math.PI) / 2, 0]}>
            <Box args={[0.08, 1.6, 0.08]} position={[1.1, -0.5, 1.1]}>
              <meshStandardMaterial color="#475569" />
            </Box>
          </group>
        ))}

        {/* Fake light beam volumetric cylinder */}
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.05, 1.5, 5, 16, 1, true]} />
          <meshBasicMaterial color="#00e5ff" transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      </Float>
    </group>
  );
}
