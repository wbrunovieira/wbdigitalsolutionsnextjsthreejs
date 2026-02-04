# Modo Guiado - Especificação

## Visão Geral

Dois modos de operação:
1. **Modo Manual**: Você controla durante a call, clicando para avançar
2. **Modo Automático**: Tour roda sozinho, prospect pode ver por link

---

## Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                   GuidedMode                         │
│  ┌──────────────────┐  ┌────────────────────────┐  │
│  │  TourController  │  │    NarrationOverlay    │  │
│  │                  │  │                        │  │
│  │ - steps[]       │  │ - title                │  │
│  │ - currentStep   │  │ - description          │  │
│  │ - next()        │  │ - progress             │  │
│  │ - prev()        │  │ - controls             │  │
│  │ - goTo(step)    │  │                        │  │
│  └──────────────────┘  └────────────────────────┘  │
│           │                      │                  │
│           └──────────┬───────────┘                  │
│                      │                              │
│           ┌──────────▼──────────┐                  │
│           │   GuidedTourState   │                  │
│           │   (Zustand Store)   │                  │
│           └─────────────────────┘                  │
└─────────────────────────────────────────────────────┘
```

---

## Estado do Tour Guiado

```typescript
// stores/guidedTourStore.ts
import { create } from 'zustand';

interface GuidedStep {
  id: string;
  title: string;
  description: string;
  location: 'hub' | ExperienceType;
  cameraPosition: [number, number, number];
  cameraTarget?: [number, number, number];
  highlightElement?: string;
  duration?: number; // Para modo automático (ms)
  action?: () => void; // Ação especial a executar
}

interface GuidedTourState {
  // Estado
  isActive: boolean;
  isAutomatic: boolean;
  currentStepIndex: number;
  steps: GuidedStep[];

  // Ações
  startTour: (automatic?: boolean) => void;
  endTour: () => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  setAutomatic: (auto: boolean) => void;
}

export const useGuidedTourStore = create<GuidedTourState>((set, get) => ({
  isActive: false,
  isAutomatic: false,
  currentStepIndex: 0,
  steps: FULL_TOUR_STEPS,

  startTour: (automatic = false) => set({
    isActive: true,
    isAutomatic: automatic,
    currentStepIndex: 0
  }),

  endTour: () => set({
    isActive: false,
    isAutomatic: false,
    currentStepIndex: 0
  }),

  nextStep: () => {
    const { currentStepIndex, steps } = get();
    if (currentStepIndex < steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    } else {
      get().endTour();
    }
  },

  prevStep: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  },

  goToStep: (index) => {
    const { steps } = get();
    if (index >= 0 && index < steps.length) {
      set({ currentStepIndex: index });
    }
  },

  setAutomatic: (auto) => set({ isAutomatic: auto })
}));
```

---

## Sequência Completa do Tour

```typescript
// constants/tourSteps.ts
export const FULL_TOUR_STEPS: GuidedStep[] = [
  // === INTRODUÇÃO ===
  {
    id: 'intro-welcome',
    title: 'Bem-vindo',
    description: 'Este é o Hub de Experiências 3D. Cada portal representa uma forma diferente de apresentar conteúdo.',
    location: 'hub',
    cameraPosition: [0, 12, 20],
    cameraTarget: [0, 0, 0],
    duration: 5000
  },
  {
    id: 'intro-hub',
    title: 'O Hub Central',
    description: 'O ponto de partida. De aqui, seu cliente pode explorar diferentes experiências.',
    location: 'hub',
    cameraPosition: [0, 8, 15],
    cameraTarget: [0, 0, 0],
    duration: 4000
  },

  // === LEARNING EXPERIENCE ===
  {
    id: 'learning-intro',
    title: 'Learning Experience',
    description: 'Ideal para cursos, treinamentos e educação.',
    location: 'hub',
    cameraPosition: [0, 5, -5],
    cameraTarget: [0, 2, -10],
    highlightElement: 'portal-learning',
    duration: 3000
  },
  {
    id: 'learning-enter',
    title: 'Entrando na Experiência',
    description: 'Veja como o conhecimento pode ser estruturado em camadas.',
    location: 'learning',
    cameraPosition: [5, 3, 5],
    duration: 5000,
    action: () => {
      // Trigger: explodir o cubo
    }
  },
  {
    id: 'learning-interact',
    title: 'Interação',
    description: 'Cada camada revela conteúdo. O aluno explora no seu ritmo.',
    location: 'learning',
    cameraPosition: [4, 2, 3],
    highlightElement: 'layer-1',
    duration: 5000
  },

  // === PRODUCT SHOWCASE ===
  {
    id: 'product-intro',
    title: 'Product Showcase',
    description: 'Perfeito para apresentar produtos físicos ou digitais.',
    location: 'hub',
    cameraPosition: [5, 5, 0],
    cameraTarget: [10, 2, 0],
    highlightElement: 'portal-product',
    duration: 3000
  },
  {
    id: 'product-enter',
    title: 'Produto em 3D',
    description: 'Rotação 360°, zoom, e pontos de interesse clicáveis.',
    location: 'product',
    cameraPosition: [6, 2, 6],
    duration: 5000
  },
  {
    id: 'product-hotspot',
    title: 'Informações Detalhadas',
    description: 'Cada hotspot revela especificações e features.',
    location: 'product',
    cameraPosition: [4, 0, 0],
    highlightElement: 'feature-1',
    duration: 5000
  },

  // === VIRTUAL SPACE ===
  {
    id: 'virtual-intro',
    title: 'Virtual Space',
    description: 'Espaços navegáveis para cursos, eventos, apresentações.',
    location: 'hub',
    cameraPosition: [5, 5, 5],
    cameraTarget: [7, 2, 7],
    highlightElement: 'portal-virtual-space',
    duration: 3000
  },
  {
    id: 'virtual-enter',
    title: 'Sala Interativa',
    description: 'O usuário anda pelo espaço e descobre conteúdos.',
    location: 'virtual-space',
    cameraPosition: [8, 5, 8],
    duration: 5000
  },
  {
    id: 'virtual-station',
    title: 'Estações de Conteúdo',
    description: 'Cada ponto pode conter vídeos, textos, ou interações.',
    location: 'virtual-space',
    cameraPosition: [2, 3, -3],
    highlightElement: 'station-1',
    duration: 5000
  },

  // === CONCLUSÃO ===
  {
    id: 'conclusion-return',
    title: 'Flexibilidade Total',
    description: 'Cada experiência pode ser adaptada para o seu negócio.',
    location: 'hub',
    cameraPosition: [0, 8, 15],
    duration: 4000
  },
  {
    id: 'conclusion-cta',
    title: 'Próximos Passos',
    description: 'Vamos conversar sobre como isso pode funcionar para você?',
    location: 'hub',
    cameraPosition: [0, 6, 12],
    duration: 5000
  }
];
```

---

## Componente do Tour Controller

```typescript
// guided/GuidedTourController.tsx
import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useGuidedTourStore } from '@/stores/guidedTourStore';
import { useNavigationStore } from '@/stores/navigationStore';

const GuidedTourController: React.FC = () => {
  const { camera } = useThree();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const {
    isActive,
    isAutomatic,
    currentStepIndex,
    steps,
    nextStep,
    endTour
  } = useGuidedTourStore();

  const { setLocation, setExperience, setCameraPosition, setCameraTarget } = useNavigationStore();

  const currentStep = steps[currentStepIndex];

  // Executar quando step muda
  useEffect(() => {
    if (!isActive || !currentStep) return;

    // Limpar timer anterior
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Navegar para localização
    if (currentStep.location === 'hub') {
      setLocation('hub');
      setExperience(null);
    } else {
      setLocation('experience');
      setExperience(currentStep.location);
    }

    // Mover câmera
    gsap.to(camera.position, {
      x: currentStep.cameraPosition[0],
      y: currentStep.cameraPosition[1],
      z: currentStep.cameraPosition[2],
      duration: 1.5,
      ease: "power2.inOut"
    });

    if (currentStep.cameraTarget) {
      setCameraTarget(currentStep.cameraTarget);
    }

    // Executar ação especial
    if (currentStep.action) {
      setTimeout(currentStep.action, 1500);
    }

    // Auto-avançar se modo automático
    if (isAutomatic && currentStep.duration) {
      timerRef.current = setTimeout(() => {
        nextStep();
      }, currentStep.duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isActive, currentStepIndex, isAutomatic]);

  return null;
};

export default GuidedTourController;
```

---

## Overlay de Narração

```typescript
// guided/NarrationOverlay.tsx
import { useGuidedTourStore } from '@/stores/guidedTourStore';

const NarrationOverlay: React.FC = () => {
  const {
    isActive,
    isAutomatic,
    currentStepIndex,
    steps,
    nextStep,
    prevStep,
    endTour,
    setAutomatic
  } = useGuidedTourStore();

  if (!isActive) return null;

  const currentStep = steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Card de narração */}
        <div className="bg-black/90 backdrop-blur-md rounded-2xl border border-purple-500/30 overflow-hidden">
          {/* Barra de progresso */}
          <div className="h-1 bg-gray-800">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-yellow-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-6">
            {/* Título e descrição */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-2">
                {currentStep.title}
              </h3>
              <p className="text-gray-300">
                {currentStep.description}
              </p>
            </div>

            {/* Controles */}
            <div className="flex items-center justify-between">
              {/* Contador de steps */}
              <span className="text-sm text-gray-500">
                {currentStepIndex + 1} / {steps.length}
              </span>

              {/* Botões de navegação */}
              <div className="flex items-center gap-2">
                {/* Toggle Auto/Manual */}
                <button
                  onClick={() => setAutomatic(!isAutomatic)}
                  className={`px-3 py-1 rounded-lg text-sm ${
                    isAutomatic
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300'
                  }`}
                >
                  {isAutomatic ? '⏸ Auto' : '▶ Auto'}
                </button>

                {/* Anterior */}
                <button
                  onClick={prevStep}
                  disabled={currentStepIndex === 0}
                  className="p-2 rounded-lg bg-gray-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {/* Próximo */}
                <button
                  onClick={nextStep}
                  className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium"
                >
                  {currentStepIndex === steps.length - 1 ? 'Finalizar' : 'Próximo'}
                </button>

                {/* Sair */}
                <button
                  onClick={endTour}
                  className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NarrationOverlay;
```

---

## Indicador de Steps (Mini-mapa)

```typescript
// guided/StepsIndicator.tsx
import { useGuidedTourStore } from '@/stores/guidedTourStore';

const StepsIndicator: React.FC = () => {
  const { isActive, currentStepIndex, steps, goToStep } = useGuidedTourStore();

  if (!isActive) return null;

  // Agrupar steps por localização
  const groupedSteps = steps.reduce((acc, step, index) => {
    const location = step.location;
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push({ ...step, index });
    return acc;
  }, {} as Record<string, (GuidedStep & { index: number })[]>);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col gap-4">
        {Object.entries(groupedSteps).map(([location, locationSteps]) => (
          <div key={location} className="flex flex-col items-center gap-1">
            {/* Label da seção */}
            <span className="text-xs text-gray-500 mb-1">
              {location === 'hub' ? 'Hub' : location}
            </span>

            {/* Dots dos steps */}
            {locationSteps.map((step) => (
              <button
                key={step.id}
                onClick={() => goToStep(step.index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  step.index === currentStepIndex
                    ? 'bg-purple-500 scale-125'
                    : step.index < currentStepIndex
                    ? 'bg-green-500'
                    : 'bg-gray-600'
                }`}
                title={step.title}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepsIndicator;
```

---

## Botão para Iniciar Tour

```typescript
// guided/StartTourButton.tsx
import { useGuidedTourStore } from '@/stores/guidedTourStore';

const StartTourButton: React.FC = () => {
  const { isActive, startTour } = useGuidedTourStore();

  if (isActive) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2">
      {/* Tour Automático */}
      <button
        onClick={() => startTour(true)}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center gap-2 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Tour Automático
      </button>

      {/* Tour Manual */}
      <button
        onClick={() => startTour(false)}
        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl flex items-center gap-2 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
        Tour Guiado
      </button>
    </div>
  );
};

export default StartTourButton;
```

---

## Highlight de Elementos

```typescript
// guided/ElementHighlight.tsx
import { useGuidedTourStore } from '@/stores/guidedTourStore';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ElementHighlightProps {
  elementId: string;
  position: [number, number, number];
}

const ElementHighlight: React.FC<ElementHighlightProps> = ({
  elementId,
  position
}) => {
  const { isActive, steps, currentStepIndex } = useGuidedTourStore();
  const ringRef = useRef<THREE.Mesh>(null);

  const currentStep = steps[currentStepIndex];
  const shouldHighlight = isActive && currentStep?.highlightElement === elementId;

  useFrame((state) => {
    if (ringRef.current && shouldHighlight) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * 2;
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.1;
      ringRef.current.scale.setScalar(scale);
    }
  });

  if (!shouldHighlight) return null;

  return (
    <group position={position}>
      {/* Anel de destaque */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.1, 16, 32]} />
        <meshStandardMaterial
          color="#ffb947"
          emissive="#ffb947"
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Seta apontando */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[0.3, 0.6, 8]} />
        <meshStandardMaterial
          color="#ffb947"
          emissive="#ffb947"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

export default ElementHighlight;
```

---

## Checklist de Implementação

- [ ] Criar store do tour guiado (Zustand)
- [ ] Definir sequência completa de steps
- [ ] Criar `GuidedTourController.tsx`
- [ ] Criar `NarrationOverlay.tsx`
- [ ] Criar `StepsIndicator.tsx`
- [ ] Criar `StartTourButton.tsx`
- [ ] Criar `ElementHighlight.tsx`
- [ ] Implementar modo automático (timer)
- [ ] Implementar modo manual (cliques)
- [ ] Testar transições entre steps
- [ ] Testar navegação entre localizações
- [ ] Testar em mobile
