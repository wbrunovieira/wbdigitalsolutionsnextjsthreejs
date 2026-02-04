# Learning Experience (Ponto 1) - Especificação

## Conceito

Cubo modular que abre em camadas, revelando conteúdo progressivamente. Demonstra como conhecimento pode ser estruturado em níveis/módulos interativos.

---

## Design Visual

### Cubo Modular Explodível

```
  Estado Fechado:          Estado Aberto (Explodido):

    ┌─────────┐               ┌───┐
    │         │              ╱     ╲
    │  CUBO   │           ┌───┐ ┌───┐ ┌───┐
    │         │           │ 1 │ │ 2 │ │ 3 │  ← Camadas separadas
    └─────────┘           └───┘ └───┘ └───┘
                             ╲     ╱
                              └───┘
```

Cada camada representa um "módulo" ou "nível" de conhecimento.

---

## Componentes

### 1. Cubo Principal

```typescript
// LearningCube.tsx
interface LearningCubeProps {
  isExploded: boolean;
  activeLayer: number | null;
  onLayerClick: (layer: number) => void;
}

const LearningCube: React.FC<LearningCubeProps> = ({
  isExploded,
  activeLayer,
  onLayerClick
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Rotação suave quando fechado
  useFrame((state) => {
    if (groupRef.current && !isExploded) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {LAYERS.map((layer, index) => (
        <CubeLayer
          key={layer.id}
          {...layer}
          index={index}
          isExploded={isExploded}
          isActive={activeLayer === index}
          onClick={() => onLayerClick(index)}
        />
      ))}

      {/* Núcleo central (visível quando explodido) */}
      {isExploded && <CubeCore />}
    </group>
  );
};
```

### 2. Camadas do Cubo

```typescript
// CubeLayer.tsx
interface LayerData {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: string;
}

const LAYERS: LayerData[] = [
  {
    id: 'layer-1',
    title: 'Módulo 1',
    description: 'Fundamentos e conceitos básicos',
    color: '#792990',
    icon: '📖'
  },
  {
    id: 'layer-2',
    title: 'Módulo 2',
    description: 'Aplicação prática',
    color: '#ffb947',
    icon: '⚡'
  },
  {
    id: 'layer-3',
    title: 'Módulo 3',
    description: 'Casos avançados',
    color: '#4a90e2',
    icon: '🎯'
  },
  {
    id: 'layer-4',
    title: 'Módulo 4',
    description: 'Especialização',
    color: '#792990',
    icon: '🏆'
  }
];

const CubeLayer: React.FC<{
  id: string;
  title: string;
  color: string;
  index: number;
  isExploded: boolean;
  isActive: boolean;
  onClick: () => void;
}> = ({ title, color, index, isExploded, isActive, onClick }) => {
  const layerRef = useRef<THREE.Mesh>(null);

  // Posição quando explodido
  const explodedOffset = (index - 1.5) * 1.5;

  // Animação de transição
  useFrame(() => {
    if (layerRef.current) {
      const targetY = isExploded ? explodedOffset : 0;
      layerRef.current.position.y = THREE.MathUtils.lerp(
        layerRef.current.position.y,
        targetY,
        0.1
      );

      // Escala quando ativo
      const targetScale = isActive ? 1.1 : 1;
      layerRef.current.scale.setScalar(
        THREE.MathUtils.lerp(layerRef.current.scale.x, targetScale, 0.1)
      );
    }
  });

  const layerHeight = 0.4;
  const layerSize = 2;

  return (
    <group>
      <mesh
        ref={layerRef}
        onClick={onClick}
        onPointerEnter={() => document.body.style.cursor = 'pointer'}
        onPointerLeave={() => document.body.style.cursor = 'default'}
      >
        <boxGeometry args={[layerSize, layerHeight, layerSize]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={isActive ? 0.5 : 0.1}
        />
      </mesh>

      {/* Borda luminosa */}
      <mesh position={[0, isExploded ? explodedOffset : 0, 0]}>
        <boxGeometry args={[layerSize + 0.05, layerHeight + 0.05, layerSize + 0.05]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Label quando explodido */}
      {isExploded && (
        <Html position={[1.5, explodedOffset, 0]}>
          <div
            className={`px-3 py-1 rounded-lg text-white text-sm whitespace-nowrap transition-all ${
              isActive ? 'bg-white/20 scale-110' : 'bg-black/50'
            }`}
            style={{ borderLeft: `3px solid ${color}` }}
          >
            {title}
          </div>
        </Html>
      )}
    </group>
  );
};
```

### 3. Núcleo Central

```typescript
// CubeCore.tsx
const CubeCore: React.FC = () => {
  const coreRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      coreRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={coreRef}>
      {/* Esfera central */}
      <mesh>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#792990"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      {/* Glow */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial
          color="#792990"
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Partículas ao redor */}
      <CoreParticles />
    </group>
  );
};
```

### 4. Painel de Conteúdo da Camada

```typescript
// LayerContentPanel.tsx
const LayerContentPanel: React.FC<{
  layer: LayerData | null;
  onClose: () => void;
}> = ({ layer, onClose }) => {
  if (!layer) return null;

  return (
    <Html position={[3, 0, 0]} transform>
      <div className="bg-black/90 backdrop-blur-md p-6 rounded-2xl border w-80"
           style={{ borderColor: `${layer.color}50` }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{layer.icon}</span>
            <h3 className="text-lg font-bold text-white">{layer.title}</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4">{layer.description}</p>

        {/* Content preview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span style={{ color: layer.color }}>▸</span>
            Tópico 1 do módulo
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span style={{ color: layer.color }}>▸</span>
            Tópico 2 do módulo
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span style={{ color: layer.color }}>▸</span>
            Tópico 3 do módulo
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progresso</span>
            <span>0%</span>
          </div>
          <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: '0%', backgroundColor: layer.color }}
            />
          </div>
        </div>
      </div>
    </Html>
  );
};
```

---

## Controles de Interação

```typescript
// LearningExperience.tsx
const LearningExperience: React.FC = () => {
  const [isExploded, setIsExploded] = useState(false);
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const { isMobile } = useDeviceType();

  const handleLayerClick = (index: number) => {
    if (!isExploded) {
      // Primeiro clique: explode o cubo
      setIsExploded(true);
    } else {
      // Cliques subsequentes: seleciona camada
      setActiveLayer(activeLayer === index ? null : index);
    }
  };

  const handleReset = () => {
    setIsExploded(false);
    setActiveLayer(null);
  };

  const activeLayerData = activeLayer !== null ? LAYERS[activeLayer] : null;

  return (
    <>
      {/* Iluminação */}
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={0.5} color="#792990" />

      {/* Cubo */}
      <LearningCube
        isExploded={isExploded}
        activeLayer={activeLayer}
        onLayerClick={handleLayerClick}
      />

      {/* Painel de conteúdo */}
      <LayerContentPanel
        layer={activeLayerData}
        onClose={() => setActiveLayer(null)}
      />

      {/* Controles */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={!isExploded}
        autoRotate={!isExploded}
        autoRotateSpeed={0.5}
        minDistance={4}
        maxDistance={12}
      />

      {/* Botão de reset */}
      {isExploded && (
        <Html position={[0, -3, 0]}>
          <button
            onClick={handleReset}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
          >
            Fechar Módulos
          </button>
        </Html>
      )}

      {/* Instrução inicial */}
      {!isExploded && (
        <Html position={[0, -2.5, 0]}>
          <div className="text-center text-gray-400 text-sm">
            {isMobile ? 'Toque' : 'Clique'} para explorar os módulos
          </div>
        </Html>
      )}

      {/* Fog */}
      <fog attach="fog" color="#0a0015" near={10} far={25} />
    </>
  );
};
```

---

## Modo Guiado

```typescript
const LEARNING_EXPERIENCE_GUIDED_STEPS: GuidedStep[] = [
  {
    id: 'le-intro',
    title: 'Learning Experience',
    description: 'Conhecimento estruturado em camadas interativas.',
    cameraPosition: [5, 3, 5],
    duration: 4000
  },
  {
    id: 'le-closed',
    title: 'Visão Geral',
    description: 'O cubo representa o conteúdo completo do curso/método.',
    cameraPosition: [4, 2, 4],
    duration: 4000
  },
  {
    id: 'le-explode',
    title: 'Módulos',
    description: 'Ao interagir, as camadas se separam revelando a estrutura.',
    cameraPosition: [5, 0, 5],
    // Trigger: explodir o cubo
    duration: 5000
  },
  {
    id: 'le-layer',
    title: 'Conteúdo por Módulo',
    description: 'Cada camada pode ser explorada individualmente.',
    cameraPosition: [4, 1, 2],
    highlightElement: 'layer-1',
    duration: 5000
  },
  {
    id: 'le-conclusion',
    title: 'Aplicações',
    description: 'Ideal para cursos, treinamentos, onboarding, educação.',
    cameraPosition: [5, 3, 5],
    duration: 4000
  }
];
```

---

## Variações para Clientes

| Segmento | Adaptação |
|----------|-----------|
| Educação médica | Camadas = sistemas do corpo |
| Cursos online | Camadas = módulos do curso |
| Onboarding | Camadas = etapas do processo |
| Treinamento técnico | Camadas = níveis de certificação |

---

## Checklist de Implementação

- [ ] Criar `LearningExperience.tsx`
- [ ] Criar `LearningCube.tsx`
- [ ] Criar `CubeLayer.tsx`
- [ ] Criar `CubeCore.tsx`
- [ ] Criar `LayerContentPanel.tsx`
- [ ] Criar `CoreParticles.tsx`
- [ ] Implementar animação de explosão
- [ ] Implementar seleção de camadas
- [ ] Implementar controles mobile
- [ ] Definir guided steps
- [ ] Testar transições
