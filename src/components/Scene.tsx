'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Environment, ScrollControls, Scroll, SpotLight } from '@react-three/drei';
import { 
  HeroConstellation, 
  RetroTerminal, 
  WebMonitors, 
  AICore, 
  ServerRack, 
  DatabaseBlueprint, 
  ContactBeacon 
} from './Models';

function ModelStages() {
  const { viewport } = useThree();
  const h = viewport.height;

  return (
    <>
      <ambientLight intensity={0.15} />

      {/* Page 1: Hero Constellation */}
      <group position={[0, 0, 0]}>
        <SpotLight
          position={[0, 4, 6]}
          angle={0.65}
          penumbra={0.7}
          intensity={3}
          distance={15}
          color="#00e5ff"
          castShadow
        />
        <HeroConstellation />
      </group>

      {/* Page 2: Retro Linux Setup */}
      <group position={[0, -h, 0]}>
        <SpotLight
          position={[0, -h + 4, 6]}
          angle={0.6}
          penumbra={0.8}
          intensity={2.5}
          distance={15}
          color="#39ff14"
          castShadow
        />
        <RetroTerminal />
      </group>

      {/* Page 3: Modern Web Monitors */}
      <group position={[0, -h * 2, 0]}>
        <SpotLight
          position={[0, -h * 2 + 4, 6]}
          angle={0.6}
          penumbra={0.8}
          intensity={2.5}
          distance={15}
          color="#00e5ff"
          castShadow
        />
        <WebMonitors />
      </group>

      {/* Page 4: AI Gen Core */}
      <group position={[0, -h * 3, 0]}>
        <SpotLight
          position={[0, -h * 3 + 4, 6]}
          angle={0.75}
          penumbra={0.8}
          intensity={3.5}
          distance={15}
          color="#bd00ff"
          castShadow
        />
        <AICore />
      </group>

      {/* Page 5: Server Rack */}
      <group position={[0, -h * 4, 0]}>
        <SpotLight
          position={[0, -h * 4 + 4, 6]}
          angle={0.6}
          penumbra={0.8}
          intensity={3}
          distance={15}
          color="#ff007f"
          castShadow
        />
        <ServerRack />
      </group>

      {/* Page 6: Database Blueprint (Timeline) */}
      <group position={[0, -h * 5, 0]}>
        <SpotLight
          position={[0, -h * 5 + 4, 6]}
          angle={0.6}
          penumbra={0.7}
          intensity={2.5}
          distance={15}
          color="#ffffff"
          castShadow
        />
        <DatabaseBlueprint />
      </group>

      {/* Page 7: Contact Beacon */}
      <group position={[0, -h * 6, 0]}>
        <SpotLight
          position={[0, -h * 6 + 4, 6]}
          angle={0.5}
          penumbra={0.9}
          intensity={4}
          distance={15}
          color="#00e5ff"
          castShadow
        />
        <ContactBeacon />
      </group>
    </>
  );
}

export default function CinematicScene({ children }: { children: React.ReactNode }) {
  return (
    <div id="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 1.5, 9.5], fov: 45 }}>
        <color attach="background" args={['#030303']} />
        
        {/* ScrollControls set to 7 pages */}
        <ScrollControls pages={7} damping={0.25} distance={1}>
          
          <Scroll>
            <ModelStages />
          </Scroll>

          {/* HTML Overlay */}
          <Scroll html style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
            <div style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              zIndex: 10,
              pointerEvents: 'auto'
            }}>
              {children}
            </div>
          </Scroll>

        </ScrollControls>
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
