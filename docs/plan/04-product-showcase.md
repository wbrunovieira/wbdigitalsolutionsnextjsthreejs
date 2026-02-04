# Product Showcase (Ponto 2) - Especificação

## Conceito

Objeto 3D explorável que gira, permite zoom, e tem hotspots clicáveis revelando informações. Demonstra como qualquer produto pode ser apresentado de forma interativa.

---

## Design Visual

### Objeto Principal: Esfera Tecnológica

Por que uma esfera abstrata (e não um produto real):
- **Neutro**: funciona para qualquer indústria
- **Escalável**: cliente imagina SEU produto
- **Impressionante**: efeitos visuais bonitos

```
        ┌───────────────────────┐
        │    ┌─────────────┐    │
        │   ╱ Hotspot 1    ╲   │
        │  │   ●━━━━━━━━●   │  │
        │  │  ╱          ╲  │  │
        │  │ ●  ESFERA   ● │  │  ← Hotspots nas bordas
        │  │  ╲          ╱  │  │
        │  │   ●━━━━━━━━●   │  │
        │   ╲  Hotspot 4   ╱   │
        │    └─────────────┘    │
        └───────────────────────┘
```

---

## Componentes

### 1. Produto Principal

```typescript
// ProductSphere.tsx
const ProductSphere: React.FC<{
  activeHotspot: string | null;
  onHotspotClick: (id: string) => void;
}> = ({ activeHotspot, onHotspotClick }) => {
  const sphereRef = useRef<THREE.Group>(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // Rotação automática (pausa quando interage)
  useFrame((state) => {
    if (sphereRef.current && autoRotate && !activeHotspot) {
      sphereRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={sphereRef}>
      {/* Esfera principal */}
      <mesh>
        <icosahedronGeometry args={[2, 2]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.9}
          roughness={0.1}
          wireframe={false}
        />
      </mesh>

      {/* Camada interna luminosa */}
      <mesh>
        <icosahedronGeometry args={[1.95, 2]} />
        <meshStandardMaterial
          color="#792990"
          emissive="#792990"
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Anéis orbitais */}
      <OrbitalRing radius={2.5} color="#792990" speed={0.5} />
      <OrbitalRing radius={3} color="#ffb947" speed={-0.3} tilt={Math.PI / 4} />

      {/* Hotspots */}
      {HOTSPOTS.map((hotspot) => (
        <ProductHotspot
          key={hotspot.id}
          {...hotspot}
          isActive={activeHotspot === hotspot.id}
          onClick={() => onHotspotClick(hotspot.id)}
        />
      ))}
    </group>
  );
};
```

### 2. Hotspots do Produto

```typescript
// ProductHotspot.tsx
interface HotspotData {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
  color: string;
}

const HOTSPOTS: HotspotData[] = [
  {
    id: 'feature-1',
    position: [2, 0.5, 0.5],
    title: 'Característica A',
    description: 'Descrição da primeira característica do produto.',
    color: '#792990'
  },
  {
    id: 'feature-2',
    position: [-1.5, 1.5, 1],
    title: 'Característica B',
    description: 'Descrição da segunda característica do produto.',
    color: '#ffb947'
  },
  {
    id: 'feature-3',
    position: [0, -2, 0.5],
    title: 'Característica C',
    description: 'Descrição da terceira característica do produto.',
    color: '#4a90e2'
  },
  {
    id: 'feature-4',
    position: [1, 1, -1.8],
    title: 'Característica D',
    description: 'Descrição da quarta característica do produto.',
    color: '#792990'
  }
];

const ProductHotspot: React.FC<{
  id: string;
  position: [number, number, number];
  title: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ position, title, color, isActive, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const hotspotRef = useRef<THREE.Group>(null);

  // Animação de pulso
  useFrame((state) => {
    if (hotspotRef.current) {
      const scale = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.1;
      hotspotRef.current.scale.setScalar(hovered || isActive ? 1.3 : scale);
    }
  });

  return (
    <group
      ref={hotspotRef}
      position={position}
      onClick={onClick}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      {/* Ponto central */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isActive ? 1 : 0.5}
        />
      </mesh>

      {/* Anel externo */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 0.25, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Label no hover */}
      {(hovered || isActive) && (
        <Html position={[0.5, 0.3, 0]} center>
          <div className="bg-black/80 px-2 py-1 rounded text-white text-sm whitespace-nowrap">
            {title}
          </div>
        </Html>
      )}
    </group>
  );
};
```

### 3. Painel de Informação

```typescript
// ProductInfoPanel.tsx
const ProductInfoPanel: React.FC<{
  hotspot: HotspotData | null;
  onClose: () => void;
}> = ({ hotspot, onClose }) => {
  if (!hotspot) return null;

  return (
    <Html
      position={[4, 0, 0]}
      transform
      occlude
      style={{
        transition: 'all 0.3s ease'
      }}
    >
      <div className="bg-black/90 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30 w-80">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: hotspot.color }}
          />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-white mb-2">
          {hotspot.title}
        </h3>
        <p className="text-gray-300 text-sm">
          {hotspot.description}
        </p>

        {/* Features list */}
        <ul className="mt-4 space-y-2 text-sm text-gray-400">
          <li className="flex items-center gap-2">
            <span style={{ color: hotspot.color }}>▸</span>
            Detalhe específico 1
          </li>
          <li className="flex items-center gap-2">
            <span style={{ color: hotspot.color }}>▸</span>
            Detalhe específico 2
          </li>
          <li className="flex items-center gap-2">
            <span style={{ color: hotspot.color }}>▸</span>
            Detalhe específico 3
          </li>
        </ul>
      </div>
    </Html>
  );
};
```

### 4. Anéis Orbitais

```typescript
// OrbitalRing.tsx
const OrbitalRing: React.FC<{
  radius: number;
  color: string;
  speed: number;
  tilt?: number;
}> = ({ radius, color, speed, tilt = 0 }) => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, tilt, 0]}>
      <torusGeometry args={[radius, 0.02, 16, 100]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};
```

---

## Controles

### Desktop

```typescript
// ProductShowcaseControls.tsx (Desktop)
<OrbitControls
  enablePan={false}
  enableZoom={true}
  enableRotate={true}
  autoRotate={!activeHotspot}
  autoRotateSpeed={0.5}
  minDistance={4}
  maxDistance={10}
  target={[0, 0, 0]}
/>
```

### Mobile

```typescript
// ProductShowcaseControls.tsx (Mobile)
<OrbitControls
  enablePan={false}
  enableZoom={true}
  enableRotate={true}
  autoRotate={!activeHotspot}
  autoRotateSpeed={1}
  minDistance={5}
  maxDistance={12}
  target={[0, 0, 0]}
  touches={{
    ONE: THREE.TOUCH.ROTATE,
    TWO: THREE.TOUCH.DOLLY
  }}
/>

{/* Indicadores de hotspot para mobile */}
<MobileHotspotIndicators hotspots={HOTSPOTS} />
```

---

## Cena Completa

```typescript
// ProductShowcase.tsx
const ProductShowcase: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const { isMobile } = useDeviceType();

  const handleHotspotClick = (id: string) => {
    setActiveHotspot(activeHotspot === id ? null : id);
  };

  const activeHotspotData = HOTSPOTS.find(h => h.id === activeHotspot) || null;

  return (
    <>
      {/* Iluminação */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#792990" />
      <pointLight position={[0, 5, -5]} intensity={0.5} color="#ffb947" />

      {/* Produto */}
      <ProductSphere
        activeHotspot={activeHotspot}
        onHotspotClick={handleHotspotClick}
      />

      {/* Painel de informação */}
      <ProductInfoPanel
        hotspot={activeHotspotData}
        onClose={() => setActiveHotspot(null)}
      />

      {/* Controles */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        autoRotate={!activeHotspot}
        autoRotateSpeed={isMobile ? 1 : 0.5}
        minDistance={isMobile ? 5 : 4}
        maxDistance={isMobile ? 12 : 10}
      />

      {/* Partículas de fundo */}
      <ProductParticles />

      {/* Fog */}
      <fog attach="fog" color="#0a0015" near={15} far={30} />
    </>
  );
};
```

---

## Modo Guiado

```typescript
const PRODUCT_SHOWCASE_GUIDED_STEPS: GuidedStep[] = [
  {
    id: 'ps-intro',
    title: 'Product Showcase',
    description: 'Apresente seu produto de forma interativa e memorável.',
    cameraPosition: [6, 2, 6],
    duration: 4000
  },
  {
    id: 'ps-rotate',
    title: 'Exploração 360°',
    description: 'O cliente gira e explora todos os ângulos.',
    cameraPosition: [-6, 2, 6],
    duration: 5000
  },
  {
    id: 'ps-hotspot',
    title: 'Pontos de Interesse',
    description: 'Cada hotspot revela informações específicas.',
    cameraPosition: [4, 0, 0],
    highlightElement: 'feature-1',
    duration: 5000
  },
  {
    id: 'ps-info',
    title: 'Informação Detalhada',
    description: 'Painéis expansíveis com specs e detalhes.',
    cameraPosition: [5, 1, 2],
    duration: 4000
  },
  {
    id: 'ps-conclusion',
    title: 'Aplicações',
    description: 'Ideal para indústria, imobiliário, saúde, educação técnica.',
    cameraPosition: [6, 2, 6],
    duration: 4000
  }
];
```

---

## Variações para Clientes

O mesmo componente pode ser adaptado:

| Indústria | Objeto | Hotspots |
|-----------|--------|----------|
| Indústria | Máquina/Peça | Componentes técnicos |
| Imobiliário | Planta 3D | Cômodos, acabamentos |
| Saúde | Equipamento | Funcionalidades |
| Educação | Modelo anatômico | Partes, funções |

---

## Checklist de Implementação

- [ ] Criar `ProductShowcase.tsx`
- [ ] Criar `ProductSphere.tsx`
- [ ] Criar `ProductHotspot.tsx`
- [ ] Criar `ProductInfoPanel.tsx`
- [ ] Criar `OrbitalRing.tsx`
- [ ] Criar `ProductParticles.tsx`
- [ ] Implementar controles desktop
- [ ] Implementar controles mobile
- [ ] Definir guided steps
- [ ] Testar rotação automática
- [ ] Testar hotspot clicks
- [ ] Testar zoom
