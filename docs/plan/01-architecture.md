# Arquitetura Técnica

## Stack

| Tecnologia | Uso |
|------------|-----|
| React Three Fiber | Renderização 3D |
| Three.js | Engine 3D |
| @react-three/drei | Helpers e componentes |
| @react-three/rapier | Física (onde necessário) |
| GSAP | Animações de câmera e UI |
| Framer Motion | Transições de UI |
| Zustand | Estado global (navegação, modo guiado) |

---

## Arquitetura de Componentes

```
┌─────────────────────────────────────────────────────────┐
│                    ExperiencePage                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │              ExperiencePlatform                  │   │
│  │  ┌─────────────────┐  ┌────────────────────┐   │   │
│  │  │  Canvas (R3F)   │  │    UI Overlay      │   │   │
│  │  │                 │  │  - BackToHub       │   │   │
│  │  │  - HubScene     │  │  - ProgressBar     │   │   │
│  │  │  - Experience   │  │  - GuidedControls  │   │   │
│  │  │  - Navigation   │  │  - MobileControls  │   │   │
│  │  │  - Lighting     │  │                    │   │   │
│  │  └─────────────────┘  └────────────────────┘   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Fluxo de Estados

```
                    ┌──────────────┐
                    │   LOADING    │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
         ┌─────────│     HUB      │─────────┐
         │         └──────────────┘         │
         │                │                 │
         ▼                ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ EXPERIENCE 1 │  │ EXPERIENCE 2 │  │ EXPERIENCE N │
└──────────────┘  └──────────────┘  └──────────────┘
         │                │                 │
         └────────────────┴─────────────────┘
                          │
                          ▼
                   [Voltar ao Hub]
```

---

## Estado Global (Zustand)

```typescript
interface ExperienceStore {
  // Navegação
  currentLocation: 'hub' | 'experience';
  currentExperience: ExperienceType | null;
  isTransitioning: boolean;

  // Modo Guiado
  isGuidedMode: boolean;
  guidedStep: number;

  // Dispositivo
  isMobile: boolean;

  // Ações
  goToHub: () => void;
  goToExperience: (exp: ExperienceType) => void;
  startGuidedTour: () => void;
  nextGuidedStep: () => void;
  exitGuidedTour: () => void;
}

type ExperienceType =
  | 'learning'
  | 'product'
  | 'landing'
  | 'virtual-space'
  | 'sales-demo'
  | 'brand'
  | 'micro';
```

---

## Sistema de Câmera

### Posições Definidas

```typescript
const CAMERA_POSITIONS = {
  hub: {
    position: [0, 8, 15],
    target: [0, 0, 0],
    fov: 60
  },
  portal_hover: {
    // Zoom suave no portal ao hover
    offset: [0, 0, -2]
  },
  experience: {
    // Cada experiência define sua câmera
    learning: { position: [0, 3, 8], target: [0, 1, 0] },
    product: { position: [5, 3, 5], target: [0, 0, 0] },
    virtualSpace: { position: [8, 5, 8], target: [0, 2, 0] },
    // ...
  }
};
```

### Transições

```typescript
// Usando GSAP para transições suaves
const transitionToExperience = (experience: ExperienceType) => {
  const targetPos = CAMERA_POSITIONS.experience[experience];

  gsap.to(camera.position, {
    x: targetPos.position[0],
    y: targetPos.position[1],
    z: targetPos.position[2],
    duration: 1.5,
    ease: "power2.inOut"
  });

  gsap.to(controls.target, {
    x: targetPos.target[0],
    y: targetPos.target[1],
    z: targetPos.target[2],
    duration: 1.5,
    ease: "power2.inOut"
  });
};
```

---

## Performance Budget

| Métrica | Target | Crítico |
|---------|--------|---------|
| FPS Desktop | 60 | > 30 |
| FPS Mobile | 30 | > 24 |
| Load Time | < 3s | < 5s |
| Bundle Size | < 500KB | < 1MB |
| Draw Calls | < 100 | < 200 |
| Triangles | < 100K | < 200K |

---

## Otimizações

### Geometria
- Usar `BufferGeometry` sempre
- LOD (Level of Detail) para objetos distantes
- Instancing para objetos repetidos (partículas)

### Materiais
- Reutilizar materiais entre objetos
- Evitar materiais com transparência excessiva
- `MeshBasicMaterial` para elementos distantes

### Texturas
- Máximo 1024x1024 para mobile
- Compressão com KTX2/Basis
- Atlas de texturas onde possível

### Renderização
- `frameloop="demand"` quando parado
- Frustum culling automático
- Desabilitar sombras em mobile

---

## Estrutura de Dados das Experiências

```typescript
interface Experience {
  id: ExperienceType;
  name: string;
  description: string;
  icon: string;
  color: string;

  // Posição do portal no hub
  portalPosition: [number, number, number];
  portalRotation: [number, number, number];

  // Configuração da câmera
  camera: {
    position: [number, number, number];
    target: [number, number, number];
    fov: number;
  };

  // Conteúdo do modo guiado
  guidedSteps: GuidedStep[];

  // Componente da experiência
  component: React.ComponentType;
}

interface GuidedStep {
  id: string;
  title: string;
  description: string;
  cameraPosition?: [number, number, number];
  highlightElement?: string;
  duration?: number; // para modo automático
}
```

---

## Lazy Loading

```typescript
// Experiências carregadas sob demanda
const experiences = {
  learning: lazy(() => import('./experiences/LearningExperience')),
  product: lazy(() => import('./experiences/ProductShowcase')),
  virtualSpace: lazy(() => import('./experiences/VirtualSpace')),
  // ...
};

// No componente
<Suspense fallback={<ExperienceLoader />}>
  {currentExperience && experiences[currentExperience]}
</Suspense>
```

---

## Assets Management

```typescript
// Preload de assets críticos
const PRELOAD_ASSETS = [
  '/models/hub/platform.glb',
  '/textures/portal-glow.png',
];

// Assets por experiência (carregados ao entrar)
const EXPERIENCE_ASSETS = {
  learning: ['/models/cube-modular.glb'],
  product: ['/models/product-sphere.glb'],
  virtualSpace: ['/models/desktop/scene.gltf'], // já existe
};
```
