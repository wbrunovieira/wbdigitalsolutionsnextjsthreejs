/**
 * VirtualSpace - Navigable room with distributed content stations
 * Phase 3 experience: Virtual Space
 */

import { useState, useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { useNavigationStore } from '@/stores/navigationStore';
import { useExperienceLanguage } from '../contexts';
import { COLORS } from '../constants';
import { VirtualRoom } from './components/VirtualRoom';
import { ContentStation } from './components/ContentStation';
import { ContentPanel } from './components/ContentPanel';

// Station definitions
const STATIONS = [
  {
    id: 'station-1',
    position: [0, 0, -5] as [number, number, number],
    icon: '\u{1F4DA}', // books emoji
    color: COLORS.purple,
    panelRotation: [0, 0, 0] as [number, number, number],
  },
  {
    id: 'station-2',
    position: [-5, 0, 0] as [number, number, number],
    icon: '\u{1F3AC}', // clapper emoji
    color: COLORS.yellow,
    panelRotation: [0, Math.PI / 2, 0] as [number, number, number],
  },
  {
    id: 'station-3',
    position: [5, 0, 0] as [number, number, number],
    icon: '\u{2705}', // check emoji
    color: COLORS.blue,
    panelRotation: [0, -Math.PI / 2, 0] as [number, number, number],
  },
];

// Floating particles component
const FloatingParticles = memo(function FloatingParticles({ count }: { count: number }) {
  const meshRef = useRef<Mesh>(null);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: Math.random() * 6,
      z: (Math.random() - 0.5) * 14,
      speed: 0.2 + Math.random() * 0.3,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  return (
    <>
      {particles.map((p, i) => (
        <FloatingParticle key={i} {...p} />
      ))}
    </>
  );
});

function FloatingParticle({
  x, y, z, speed, offset,
}: {
  x: number; y: number; z: number; speed: number; offset: number;
}) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime();
      ref.current.position.y = y + Math.sin(time * speed + offset) * 0.5;
      ref.current.position.x = x + Math.sin(time * speed * 0.5 + offset) * 0.3;
    }
  });

  return (
    <mesh ref={ref} position={[x, y, z]}>
      <sphereGeometry args={[0.03, 6, 6]} />
      <meshStandardMaterial
        color={COLORS.purple}
        emissive={COLORS.purple}
        emissiveIntensity={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

export function VirtualSpace() {
  const [activeStation, setActiveStation] = useState<string | null>(null);
  const { isMobile } = useNavigationStore();
  const { t } = useExperienceLanguage();

  const vs = t.virtualSpace;

  // Fallback translations if not available
  const mainContentTitle = vs?.mainContentTitle || 'Knowledge Module';
  const mainContentSubtitle = vs?.mainContentSubtitle || 'Interactive content organized in stations';
  const resourcesTitle = vs?.resourcesTitle || 'Complementary Resources';
  const resourceItems = vs?.resourceItems || ['Video Library', 'Documents', 'Assessments', 'Certificates'];
  const stationTranslations = vs?.stations || STATIONS.map((s, i) => ({
    id: s.id,
    title: `Station ${i + 1}`,
    subtitle: 'Explore',
    description: 'Interactive content station',
    options: ['Option 1', 'Option 2', 'Option 3'],
  }));

  const handleStationClick = (stationId: string) => {
    setActiveStation(prev => prev === stationId ? null : stationId);
  };

  const handleClosePanel = () => {
    setActiveStation(null);
  };

  const particleCount = isMobile ? 30 : 60;

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 5, 0]} intensity={1} color="#ffffff" />
      <directionalLight position={[5, 8, 5]} intensity={0.5} color="#ffffff" />
      <pointLight position={[0, 3, -5]} intensity={0.3} color={COLORS.purple} distance={10} />
      <pointLight position={[-5, 3, 0]} intensity={0.3} color={COLORS.yellow} distance={10} />
      <pointLight position={[5, 3, 0]} intensity={0.3} color={COLORS.blue} distance={10} />

      {/* Room */}
      <VirtualRoom
        mainContentTitle={mainContentTitle}
        mainContentSubtitle={mainContentSubtitle}
        resourcesTitle={resourcesTitle}
        resourceItems={resourceItems}
        isMobile={isMobile}
      />

      {/* Content Stations */}
      {STATIONS.map((station, i) => {
        const trans = stationTranslations.find(st => st.id === station.id) || stationTranslations[i];
        return (
          <ContentStation
            key={station.id}
            position={station.position}
            title={trans.title}
            subtitle={trans.subtitle}
            icon={station.icon}
            color={station.color}
            isActive={activeStation === station.id}
            onClick={() => handleStationClick(station.id)}
            isMobile={isMobile}
          />
        );
      })}

      {/* Content Panel for active station */}
      {activeStation && (() => {
        const stationDef = STATIONS.find(s => s.id === activeStation);
        const stationTrans = stationTranslations.find(st => st.id === activeStation);
        if (!stationDef || !stationTrans) return null;

        return (
          <ContentPanel
            position={stationDef.position}
            title={stationTrans.title}
            description={stationTrans.description}
            options={stationTrans.options}
            color={stationDef.color}
            rotation={stationDef.panelRotation}
            onClose={handleClosePanel}
          />
        );
      })()}

      {/* Floating particles */}
      <FloatingParticles count={particleCount} />

      {/* Fog */}
      <fog attach="fog" args={[COLORS.darkPurple, 12, 28]} />
    </group>
  );
}

export default VirtualSpace;
