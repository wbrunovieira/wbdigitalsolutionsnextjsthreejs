/**
 * VirtualSpace - Realistic navigable room with interactive stations
 * Phase 3: Bookshelf (library), Monitor (video), Desk (quiz)
 */

import { useState, useRef, useMemo, memo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { Mesh, MeshStandardMaterial } from 'three';
import { useNavigationStore } from '@/stores/navigationStore';
import { useExperienceLanguage } from '../contexts';
import { COLORS } from '../constants';
import { VirtualRoom } from './components/VirtualRoom';
import { ContentPanel } from './components/ContentPanel';

type StationType = 'library' | 'video' | 'quiz';

// Default overlay translations (fallback)
const DEFAULT_OVERLAY = {
  close: 'Close',
  library: {
    search: 'Search content...',
    categories: ['Marketing', 'Sales', 'Leadership', 'Tech'],
    articles: [
      { title: 'Digital Marketing Strategy', category: 'Marketing', time: '5 min' },
      { title: 'Sales Funnel Optimization', category: 'Sales', time: '8 min' },
      { title: 'Leadership in Remote Teams', category: 'Leadership', time: '6 min' },
    ],
    viewAll: 'View All',
  },
  video: {
    title: 'Corporate Training',
    subtitle: 'Module 1: Introduction',
    playlist: [
      { title: 'Module 1: Introduction', duration: '12:30' },
      { title: 'Module 2: Fundamentals', duration: '18:45' },
      { title: 'Module 3: Advanced Topics', duration: '22:10' },
    ],
    play: 'Play',
  },
  quiz: {
    title: 'Knowledge Assessment',
    progress: 'Question 2 of 5',
    question: 'What is the primary benefit of immersive content?',
    options: ['Higher retention', 'Lower cost', 'Simpler setup', 'Less preparation'],
    submit: 'Submit Answer',
    score: 'Current Score',
    timer: 'Time remaining',
  },
};

// ===== BOOKSHELF STATION (Library) =====
const BookshelfStation = memo(function BookshelfStation({
  isActive,
  onClick,
  label,
}: {
  isActive: boolean;
  onClick: () => void;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);
  const glowRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const mat = glowRef.current.material as MeshStandardMaterial;
      if (isActive) {
        mat.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 3) * 0.15;
      } else {
        mat.emissiveIntensity = hovered ? 0.35 : 0.15;
      }
    }
  });

  const bookColors = [COLORS.purple, COLORS.yellow, COLORS.blue, '#e74c8b', COLORS.purple, COLORS.yellow];

  return (
    <group position={[0, 0, -5.5]}>
      {/* Bookshelf frame */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[4.5, 3.2, 0.45]} />
        <meshStandardMaterial color="#1a1520" metalness={0.3} roughness={0.6} />
      </mesh>

      {/* Shelves */}
      {[0.4, 1.2, 2.0, 2.8].map((y, i) => (
        <mesh key={i} position={[0, y, 0.05]}>
          <boxGeometry args={[4.2, 0.06, 0.38]} />
          <meshStandardMaterial color="#221a2e" metalness={0.4} roughness={0.5} />
        </mesh>
      ))}

      {/* Books on shelves */}
      {[0.6, 1.4, 2.2].map((shelfY, si) => (
        <group key={si}>
          {[-1.5, -0.9, -0.3, 0.3, 0.9, 1.5].map((x, bi) => {
            const height = 0.4 + Math.random() * 0.25;
            return (
              <mesh key={bi} position={[x, shelfY + height / 2 + 0.03, 0.05]}>
                <boxGeometry args={[0.35, height, 0.25]} />
                <meshStandardMaterial
                  color={bookColors[(si * 3 + bi) % bookColors.length]}
                  metalness={0.2}
                  roughness={0.7}
                />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Glow base */}
      <mesh ref={glowRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0.5]}>
        <planeGeometry args={[5, 1.5]} />
        <meshStandardMaterial
          color={COLORS.purple}
          emissive={COLORS.purple}
          emissiveIntensity={0.15}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 3.5, 0.3]}
        fontSize={0.3}
        color={isActive ? COLORS.purple : COLORS.white}
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        {label}
      </Text>

      {/* Click area */}
      <mesh
        visible={false}
        position={[0, 1.5, 0.5]}
        onClick={onClick}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <boxGeometry args={[5, 3.5, 1.5]} />
      </mesh>

      <pointLight position={[0, 2.5, 1]} intensity={isActive ? 0.5 : hovered ? 0.3 : 0.15} color={COLORS.purple} distance={6} />
    </group>
  );
});

// ===== MONITOR STATION (Video) =====
const MonitorStation = memo(function MonitorStation({
  isActive,
  onClick,
  label,
}: {
  isActive: boolean;
  onClick: () => void;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);
  const screenRef = useRef<Mesh>(null);
  const ledRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (screenRef.current) {
      const mat = screenRef.current.material as MeshStandardMaterial;
      mat.emissiveIntensity = isActive ? 0.15 + Math.sin(time * 2) * 0.05 : hovered ? 0.08 : 0.03;
    }
    if (ledRef.current) {
      const mat = ledRef.current.material as MeshStandardMaterial;
      mat.emissiveIntensity = isActive ? 1 : 0.3 + Math.sin(time * 2) * 0.2;
    }
  });

  return (
    <group position={[-6.5, 0, -1]}>
      {/* Monitor stand - vertical pole */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 3, 8]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Stand base */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.04, 16]} />
        <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Monitor frame */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[4.2, 2.6, 0.12]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Screen surface */}
      <mesh ref={screenRef} position={[0.06, 3.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[0.01, 1]} />
        <meshStandardMaterial color={COLORS.yellow} emissive={COLORS.yellow} emissiveIntensity={0.03} transparent opacity={0.01} />
      </mesh>
      {/* Screen front face */}
      <mesh ref={screenRef} position={[0, 3.2, 0.07]}>
        <planeGeometry args={[3.8, 2.2]} />
        <meshStandardMaterial color="#050510" emissive={COLORS.yellow} emissiveIntensity={0.03} />
      </mesh>

      {/* LED indicator */}
      <mesh ref={ledRef} position={[0, 1.95, 0.07]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color={COLORS.yellow} emissive={COLORS.yellow} emissiveIntensity={0.5} />
      </mesh>

      {/* Label */}
      <Text
        position={[0, 4.8, 0]}
        fontSize={0.3}
        color={isActive ? COLORS.yellow : COLORS.white}
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        {label}
      </Text>

      {/* Click area */}
      <mesh
        visible={false}
        position={[0, 2.5, 0]}
        onClick={onClick}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <boxGeometry args={[4.5, 4, 1.5]} />
      </mesh>

      <pointLight position={[0.5, 3.5, 1]} intensity={isActive ? 0.4 : hovered ? 0.25 : 0.1} color={COLORS.yellow} distance={6} />
    </group>
  );
});

// ===== DESK STATION (Quiz/Assessment) =====
const DeskStation = memo(function DeskStation({
  isActive,
  onClick,
  label,
}: {
  isActive: boolean;
  onClick: () => void;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);
  const screenRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as MeshStandardMaterial;
      mat.emissiveIntensity = isActive ? 0.2 + Math.sin(clock.getElapsedTime() * 2.5) * 0.08 : hovered ? 0.1 : 0.04;
    }
  });

  return (
    <group position={[5.5, 0, -1]}>
      {/* Desk surface */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <boxGeometry args={[2.2, 0.06, 1.2]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Desk legs */}
      {[[-0.95, -0.5], [-0.95, 0.5], [0.95, -0.5], [0.95, 0.5]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.37, z]}>
          <boxGeometry args={[0.05, 0.74, 0.05]} />
          <meshStandardMaterial color="#111120" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}

      {/* Laptop base */}
      <mesh position={[0, 0.8, -0.1]}>
        <boxGeometry args={[1.2, 0.03, 0.8]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.15} />
      </mesh>
      {/* Laptop screen */}
      <mesh ref={screenRef} position={[0, 1.2, -0.48]} rotation={[-0.25, 0, 0]}>
        <boxGeometry args={[1.15, 0.75, 0.02]} />
        <meshStandardMaterial color="#050510" emissive={COLORS.blue} emissiveIntensity={0.04} />
      </mesh>
      {/* Laptop keyboard area */}
      <mesh position={[0, 0.81, 0.1]}>
        <planeGeometry args={[1, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" emissive={COLORS.blue} emissiveIntensity={0.02} transparent opacity={0.8} />
      </mesh>

      {/* Chair */}
      <group position={[0, 0, 1]}>
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[0.5, 0.06, 0.5]} />
          <meshStandardMaterial color="#1e1e35" metalness={0.4} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.7, -0.22]}>
          <boxGeometry args={[0.48, 0.44, 0.04]} />
          <meshStandardMaterial color="#1e1e35" metalness={0.4} roughness={0.5} />
        </mesh>
        {[[-0.2, -0.2], [-0.2, 0.2], [0.2, -0.2], [0.2, 0.2]].map(([cx, cz], ci) => (
          <mesh key={ci} position={[cx, 0.21, cz]}>
            <cylinderGeometry args={[0.02, 0.02, 0.42, 8]} />
            <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Label */}
      <Text
        position={[0, 2, -0.2]}
        fontSize={0.3}
        color={isActive ? COLORS.blue : COLORS.white}
        anchorX="center"
        anchorY="middle"
        fontWeight={700}
      >
        {label}
      </Text>

      {/* Click area */}
      <mesh
        visible={false}
        position={[0, 1, 0]}
        onClick={onClick}
        onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <boxGeometry args={[3, 2.5, 2.5]} />
      </mesh>

      <pointLight position={[0, 1.8, 0.5]} intensity={isActive ? 0.4 : hovered ? 0.25 : 0.1} color={COLORS.blue} distance={5} />
    </group>
  );
});

// ===== FLOATING PARTICLES =====
const FloatingParticles = memo(function FloatingParticles({ count }: { count: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 12,
      y: 0.5 + Math.random() * 5,
      z: (Math.random() - 0.5) * 10,
      speed: 0.15 + Math.random() * 0.25,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  return (
    <>
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </>
  );
});

function Particle({ x, y, z, speed, offset }: { x: number; y: number; z: number; speed: number; offset: number }) {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime();
      ref.current.position.y = y + Math.sin(t * speed + offset) * 0.4;
      ref.current.position.x = x + Math.sin(t * speed * 0.4 + offset) * 0.2;
    }
  });

  return (
    <mesh ref={ref} position={[x, y, z]}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshStandardMaterial color={COLORS.purple} emissive={COLORS.purple} emissiveIntensity={0.6} transparent opacity={0.5} />
    </mesh>
  );
}

// ===== MAIN COMPONENT =====
export function VirtualSpace() {
  const [activeStation, setActiveStation] = useState<StationType | null>(null);
  const { isMobile } = useNavigationStore();
  const { t } = useExperienceLanguage();

  const vs = t.virtualSpace;
  const overlayTranslations = vs?.overlay || DEFAULT_OVERLAY;
  const stations = vs?.stations || [];

  const handleStationClick = (station: StationType) => {
    setActiveStation(prev => prev === station ? null : station);
  };

  const handleClose = () => setActiveStation(null);

  const stationLabels = {
    library: stations.find(s => s.id === 'station-1')?.title || 'Content Library',
    video: stations.find(s => s.id === 'station-2')?.title || 'Media Center',
    quiz: stations.find(s => s.id === 'station-3')?.title || 'Assessments',
  };

  // Overlay positions (floating above each station)
  const overlayPositions: Record<StationType, [number, number, number]> = {
    library: [0, 4, -4],
    video: [-5, 4.5, -1],
    quiz: [4.5, 3.5, -1],
  };

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5.5, 2]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[4, 6, 5]} intensity={0.4} color="#ffffff" />
      <pointLight position={[0, 3, -5]} intensity={0.2} color={COLORS.purple} distance={8} />
      <pointLight position={[-6, 3, 0]} intensity={0.2} color={COLORS.yellow} distance={8} />
      <pointLight position={[6, 3, 0]} intensity={0.2} color={COLORS.blue} distance={8} />

      {/* Room structure + decorative furniture */}
      <VirtualRoom isMobile={isMobile} />

      {/* Interactive stations */}
      <BookshelfStation
        isActive={activeStation === 'library'}
        onClick={() => handleStationClick('library')}
        label={stationLabels.library}
      />
      <MonitorStation
        isActive={activeStation === 'video'}
        onClick={() => handleStationClick('video')}
        label={stationLabels.video}
      />
      <DeskStation
        isActive={activeStation === 'quiz'}
        onClick={() => handleStationClick('quiz')}
        label={stationLabels.quiz}
      />

      {/* Floating overlay for active station */}
      {activeStation && (
        <ContentPanel
          type={activeStation}
          position={overlayPositions[activeStation]}
          onClose={handleClose}
          translations={overlayTranslations}
        />
      )}

      {/* Floating particles */}
      <FloatingParticles count={isMobile ? 20 : 40} />

      {/* Fog */}
      <fog attach="fog" args={[COLORS.darkPurple, 12, 26]} />
    </group>
  );
}

export default VirtualSpace;
