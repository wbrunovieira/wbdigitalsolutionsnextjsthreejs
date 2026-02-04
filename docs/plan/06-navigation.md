# Sistema de Navegação - Especificação

## Visão Geral

Sistema híbrido que funciona em desktop e mobile:
- **Desktop:** Click-to-move + hotspots visíveis
- **Mobile:** Apenas hotspots (teleporte)

---

## Arquitetura

```
┌─────────────────────────────────────────────────┐
│              NavigationSystem                    │
│  ┌─────────────────┐  ┌────────────────────┐   │
│  │ CameraController│  │    HotspotManager  │   │
│  │                 │  │                    │   │
│  │ - smoothMove()  │  │ - registerHotspot()│   │
│  │ - lookAt()      │  │ - onHotspotClick() │   │
│  │ - transition()  │  │ - highlightActive()│   │
│  └─────────────────┘  └────────────────────┘   │
│           │                    │                │
│           └──────────┬─────────┘                │
│                      │                          │
│            ┌─────────▼─────────┐               │
│            │   NavigationState  │               │
│            │   (Zustand Store)  │               │
│            └───────────────────┘               │
└─────────────────────────────────────────────────┘
```

---

## Estado de Navegação

```typescript
// stores/navigationStore.ts
import { create } from 'zustand';

interface NavigationState {
  // Localização atual
  currentLocation: 'hub' | 'experience';
  currentExperience: ExperienceType | null;

  // Estado de transição
  isTransitioning: boolean;
  transitionProgress: number;

  // Câmera
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];

  // Hotspots
  hoveredHotspot: string | null;
  activeHotspot: string | null;

  // Ações
  setLocation: (location: 'hub' | 'experience') => void;
  setExperience: (exp: ExperienceType | null) => void;
  startTransition: () => void;
  endTransition: () => void;
  setHoveredHotspot: (id: string | null) => void;
  setActiveHotspot: (id: string | null) => void;
  setCameraPosition: (pos: [number, number, number]) => void;
  setCameraTarget: (target: [number, number, number]) => void;
}

export const useNavigationStore = create<NavigationState>((set) => ({
  currentLocation: 'hub',
  currentExperience: null,
  isTransitioning: false,
  transitionProgress: 0,
  cameraPosition: [0, 8, 15],
  cameraTarget: [0, 0, 0],
  hoveredHotspot: null,
  activeHotspot: null,

  setLocation: (location) => set({ currentLocation: location }),
  setExperience: (exp) => set({ currentExperience: exp }),
  startTransition: () => set({ isTransitioning: true }),
  endTransition: () => set({ isTransitioning: false }),
  setHoveredHotspot: (id) => set({ hoveredHotspot: id }),
  setActiveHotspot: (id) => set({ activeHotspot: id }),
  setCameraPosition: (pos) => set({ cameraPosition: pos }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
}));
```

---

## Controlador de Câmera

```typescript
// navigation/CameraController.tsx
import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { useNavigationStore } from '@/stores/navigationStore';

interface CameraControllerProps {
  initialPosition?: [number, number, number];
  initialTarget?: [number, number, number];
}

const CameraController: React.FC<CameraControllerProps> = ({
  initialPosition = [0, 8, 15],
  initialTarget = [0, 0, 0]
}) => {
  const { camera } = useThree();
  const targetRef = useRef(new THREE.Vector3(...initialTarget));
  const { cameraPosition, cameraTarget, isTransitioning } = useNavigationStore();

  // Atualizar câmera quando estado muda
  useEffect(() => {
    if (!isTransitioning) {
      // Transição suave para nova posição
      gsap.to(camera.position, {
        x: cameraPosition[0],
        y: cameraPosition[1],
        z: cameraPosition[2],
        duration: 1.5,
        ease: "power2.inOut"
      });

      gsap.to(targetRef.current, {
        x: cameraTarget[0],
        y: cameraTarget[1],
        z: cameraTarget[2],
        duration: 1.5,
        ease: "power2.inOut"
      });
    }
  }, [cameraPosition, cameraTarget, isTransitioning]);

  // Atualizar lookAt a cada frame
  useFrame(() => {
    camera.lookAt(targetRef.current);
  });

  return null;
};

export default CameraController;
```

---

## Componente Hotspot

```typescript
// navigation/Hotspot.tsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigationStore } from '@/stores/navigationStore';

interface HotspotProps {
  id: string;
  position: [number, number, number];
  label: string;
  color?: string;
  size?: number;
  onClick: () => void;
  showLabel?: boolean;
}

const Hotspot: React.FC<HotspotProps> = ({
  id,
  position,
  label,
  color = '#792990',
  size = 0.5,
  onClick,
  showLabel = true
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { setHoveredHotspot, isTransitioning } = useNavigationStore();

  // Animação de pulso
  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 2) * 0.15;
      meshRef.current.scale.setScalar(hovered ? 1.3 : scale);
    }
  });

  const handlePointerEnter = () => {
    if (isTransitioning) return;
    setHovered(true);
    setHoveredHotspot(id);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = () => {
    setHovered(false);
    setHoveredHotspot(null);
    document.body.style.cursor = 'default';
  };

  const handleClick = () => {
    if (isTransitioning) return;
    onClick();
  };

  return (
    <group position={position}>
      {/* Hitbox invisível maior para facilitar click */}
      <mesh
        visible={false}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <sphereGeometry args={[size * 2, 16, 16]} />
      </mesh>

      {/* Visual do hotspot */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size * 0.3, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1 : 0.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Anel externo */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 0.5, size * 0.6, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={hovered ? 0.8 : 0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Ondas de pulso */}
      <PulseWaves color={color} size={size} active={hovered} />

      {/* Label */}
      {showLabel && (
        <Html
          position={[0, size + 0.5, 0]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div
            className={`px-3 py-1 rounded-full text-white text-sm whitespace-nowrap transition-all duration-300 ${
              hovered ? 'bg-black/80 scale-110' : 'bg-black/50'
            }`}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  );
};

// Ondas de pulso animadas
const PulseWaves: React.FC<{ color: string; size: number; active: boolean }> = ({
  color,
  size,
  active
}) => {
  const wave1Ref = useRef<THREE.Mesh>(null);
  const wave2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (wave1Ref.current) {
      const scale1 = 1 + (time % 2) * 0.5;
      wave1Ref.current.scale.setScalar(scale1);
      (wave1Ref.current.material as THREE.MeshStandardMaterial).opacity =
        Math.max(0, 0.5 - (time % 2) * 0.25);
    }

    if (wave2Ref.current) {
      const scale2 = 1 + ((time + 1) % 2) * 0.5;
      wave2Ref.current.scale.setScalar(scale2);
      (wave2Ref.current.material as THREE.MeshStandardMaterial).opacity =
        Math.max(0, 0.5 - ((time + 1) % 2) * 0.25);
    }
  });

  if (!active) return null;

  return (
    <>
      <mesh ref={wave1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 0.4, size * 0.45, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={wave2Ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 0.4, size * 0.45, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

export default Hotspot;
```

---

## Controles Mobile

```typescript
// navigation/MobileControls.tsx
import { Html } from '@react-three/drei';
import { useNavigationStore } from '@/stores/navigationStore';

interface MobileControlsProps {
  hotspots: Array<{
    id: string;
    label: string;
    onClick: () => void;
  }>;
}

const MobileControls: React.FC<MobileControlsProps> = ({ hotspots }) => {
  const { isTransitioning, hoveredHotspot } = useNavigationStore();

  return (
    <Html fullscreen>
      {/* Barra de navegação inferior */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-center gap-2 flex-wrap max-w-md mx-auto">
          {hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              onClick={hotspot.onClick}
              disabled={isTransitioning}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                hoveredHotspot === hotspot.id
                  ? 'bg-purple-600 text-white scale-105'
                  : 'bg-white/10 text-white/80'
              } ${isTransitioning ? 'opacity-50' : ''}`}
            >
              {hotspot.label}
            </button>
          ))}
        </div>
      </div>
    </Html>
  );
};

export default MobileControls;
```

---

## Hook de Navegação

```typescript
// hooks/useExperienceNavigation.ts
import { useCallback } from 'react';
import { gsap } from 'gsap';
import { useThree } from '@react-three/fiber';
import { useNavigationStore } from '@/stores/navigationStore';
import { EXPERIENCES } from '@/components/3d-experience/constants/experiences';

export const useExperienceNavigation = () => {
  const { camera } = useThree();
  const {
    setLocation,
    setExperience,
    startTransition,
    endTransition,
    setCameraPosition,
    setCameraTarget,
    currentLocation,
    currentExperience
  } = useNavigationStore();

  // Navegar para uma experiência
  const goToExperience = useCallback(async (experienceId: ExperienceType) => {
    const experience = EXPERIENCES[experienceId];
    if (!experience) return;

    startTransition();

    // Fase 1: Zoom em direção ao portal
    await gsap.to(camera.position, {
      x: experience.portalPosition[0],
      y: experience.portalPosition[1] + 2,
      z: experience.portalPosition[2] + 3,
      duration: 0.8,
      ease: "power2.in"
    });

    // Fase 2: Atualizar estado
    setLocation('experience');
    setExperience(experienceId);

    // Fase 3: Posicionar câmera na experiência
    camera.position.set(...experience.camera.position);
    setCameraPosition(experience.camera.position);
    setCameraTarget(experience.camera.target);

    // Fase 4: Fade in (handled by UI)
    await new Promise(resolve => setTimeout(resolve, 300));

    endTransition();
  }, [camera]);

  // Voltar ao Hub
  const goToHub = useCallback(async () => {
    startTransition();

    // Fade out
    await new Promise(resolve => setTimeout(resolve, 300));

    // Atualizar estado
    setLocation('hub');
    setExperience(null);

    // Posicionar câmera no hub
    const hubPosition: [number, number, number] = [0, 8, 15];
    const hubTarget: [number, number, number] = [0, 0, 0];

    camera.position.set(...hubPosition);
    setCameraPosition(hubPosition);
    setCameraTarget(hubTarget);

    // Fade in
    await new Promise(resolve => setTimeout(resolve, 300));

    endTransition();
  }, [camera]);

  return {
    goToExperience,
    goToHub,
    currentLocation,
    currentExperience
  };
};
```

---

## Overlay de Transição

```typescript
// navigation/TransitionOverlay.tsx
import { useNavigationStore } from '@/stores/navigationStore';

const TransitionOverlay: React.FC = () => {
  const { isTransitioning } = useNavigationStore();

  return (
    <div
      className={`fixed inset-0 bg-black pointer-events-none transition-opacity duration-300 z-50 ${
        isTransitioning ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};

export default TransitionOverlay;
```

---

## Botão Voltar ao Hub

```typescript
// navigation/BackToHubButton.tsx
import { useExperienceNavigation } from '@/hooks/useExperienceNavigation';
import { useNavigationStore } from '@/stores/navigationStore';

const BackToHubButton: React.FC = () => {
  const { goToHub } = useExperienceNavigation();
  const { currentLocation, isTransitioning } = useNavigationStore();

  if (currentLocation === 'hub') return null;

  return (
    <button
      onClick={goToHub}
      disabled={isTransitioning}
      className={`fixed top-4 left-4 z-40 flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all ${
        isTransitioning ? 'opacity-50' : ''
      }`}
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
      <span className="hidden sm:inline">Voltar ao Hub</span>
    </button>
  );
};

export default BackToHubButton;
```

---

## Checklist de Implementação

- [ ] Criar store de navegação (Zustand)
- [ ] Criar `CameraController.tsx`
- [ ] Criar `Hotspot.tsx`
- [ ] Criar `MobileControls.tsx`
- [ ] Criar `useExperienceNavigation.ts`
- [ ] Criar `TransitionOverlay.tsx`
- [ ] Criar `BackToHubButton.tsx`
- [ ] Integrar com Hub Central
- [ ] Integrar com cada experiência
- [ ] Testar transições desktop
- [ ] Testar navegação mobile
- [ ] Testar performance
