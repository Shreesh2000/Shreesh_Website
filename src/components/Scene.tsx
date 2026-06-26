'use client';

import { useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, ScrollControls, Scroll, SpotLight } from '@react-three/drei';
import {
  HeroConstellation,
  RetroTerminal,
  ImacWorkstation,
  AICore,
  ServerRack,
  DatabaseBlueprint,
  ContactBeacon,
} from './Models';

function ModelStages() {
  const { viewport } = useThree();
  const h = viewport.height;

  return (
    <>
      <ambientLight intensity={0.18} />

      {/* Page 1: Hero — constellation network */}
      <group position={[0, 0, 0]}>
        <SpotLight position={[0, 4, 6]} angle={0.65} penumbra={0.7} intensity={2.8} distance={15} color="#22d3ee" castShadow />
        <HeroConstellation />
      </group>

      {/* Page 2: Skills / Linux — CRT terminal ONLY here */}
      <group position={[0, -h, 0]}>
        <SpotLight position={[0, -h + 4, 6]} angle={0.6} penumbra={0.8} intensity={2.5} distance={15} color="#39ff14" castShadow />
        <RetroTerminal scale={0.95} rotation={[0, 0.12, 0]} />
      </group>

      {/* Page 3: Projects — iMac */}
      <group position={[0, -h * 2, 0]}>
        <SpotLight position={[0, -h * 2 + 4, 6]} angle={0.6} penumbra={0.8} intensity={2.8} distance={15} color="#22d3ee" castShadow />
        <ImacWorkstation scale={1.05} />
      </group>

      {/* Page 4: AI — neural core */}
      <group position={[0, -h * 3, 0]}>
        <SpotLight position={[0, -h * 3 + 4, 6]} angle={0.75} penumbra={0.8} intensity={3} distance={15} color="#c084fc" castShadow />
        <AICore />
      </group>

      {/* Page 5: Experience — server rack */}
      <group position={[0, -h * 4, 0]}>
        <SpotLight position={[0, -h * 4 + 4, 6]} angle={0.6} penumbra={0.8} intensity={2.5} distance={15} color="#fb7185" castShadow />
        <ServerRack />
      </group>

      {/* Page 6: Education — database blueprint */}
      <group position={[0, -h * 5, 0]}>
        <SpotLight position={[0, -h * 5 + 4, 6]} angle={0.6} penumbra={0.7} intensity={2.5} distance={15} color="#ffffff" castShadow />
        <DatabaseBlueprint />
      </group>

      {/* Page 7: Contact — beacon */}
      <group position={[0, -h * 6, 0]}>
        <SpotLight position={[0, -h * 6 + 4, 6]} angle={0.5} penumbra={0.9} intensity={3} distance={15} color="#22d3ee" castShadow />
        <ContactBeacon />
      </group>
    </>
  );
}

const MOBILE_BREAKPOINT = 768;

export default function CinematicScene({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // SSR: render nothing until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div style={{ background: '#04060d', minHeight: '100vh' }}>
        {children}
      </div>
    );
  }

  // Mobile: skip the heavy 3D Canvas entirely and render a plain scrollable page
  if (isMobile) {
    return (
      <div className="mobile-scene-root">
        <div className="ambient-orbs" aria-hidden="true">
          <div className="orb orb-mint" />
          <div className="orb orb-sky" />
          <div className="orb orb-violet" />
        </div>
        {children}
      </div>
    );
  }

  // Desktop: full 3D experience
  return (
    <div id="canvas-container" className="canvas-container">
      <Canvas
        camera={{ position: [0, 1.5, 9.5], fov: 45 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      >
        <color attach="background" args={['#04060d']} />

        <ScrollControls pages={8.28} damping={0.28} distance={1}>
          <Scroll>
            <ModelStages />
          </Scroll>

          <Scroll html style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
            <div className="scroll-html-root">{children}</div>
          </Scroll>
        </ScrollControls>

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
