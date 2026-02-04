# Hub Central - Especificação

## Conceito Visual

Plataforma hexagonal flutuante no espaço, com 7 portais ao redor formando um círculo. Estética futurista/tecnológica mantendo as cores da marca.

```
              [Portal 1: Learning]
                     ↑
    [Portal 7: Micro]    [Portal 2: Product]
              ↖           ↗
               ┌─────────┐
               │   WB    │
               │  LOGO   │
               │ (centro)│
               └─────────┘
              ↙           ↘
    [Portal 6: Brand]    [Portal 3: Landing]
                     ↓
              [Portal 5: Sales]
                     ↓
              [Portal 4: Virtual Space]
```

---

## Componentes

### 1. Plataforma Base

```typescript
// HubPlatform.tsx
const HubPlatform: React.FC = () => {
  return (
    <group>
      {/* Plataforma hexagonal principal */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <cylinderGeometry args={[12, 12, 0.3, 6]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Anel luminoso externo */}
      <mesh position={[0, 0.16, 0]}>
        <ringGeometry args={[11.5, 12, 6]} />
        <meshStandardMaterial
          color="#792990"
          emissive="#792990"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Grid luminoso no piso */}
      <HexGrid />

      {/* Logo WB central */}
      <CenterLogo />
    </group>
  );
};
```

### 2. Portal Individual

```typescript
// Portal.tsx
interface PortalProps {
  experience: Experience;
  position: [number, number, number];
  rotation: [number, number, number];
  isActive: boolean;
  onEnter: () => void;
}

const Portal: React.FC<PortalProps> = ({
  experience,
  position,
  rotation,
  isActive,
  onEnter
}) => {
  const [hovered, setHovered] = useState(false);
  const portalRef = useRef<THREE.Group>(null);

  // Animação de hover
  useFrame((state) => {
    if (portalRef.current) {
      const scale = hovered ? 1.1 : 1;
      portalRef.current.scale.lerp(
        new THREE.Vector3(scale, scale, scale),
        0.1
      );
    }
  });

  return (
    <group
      ref={portalRef}
      position={position}
      rotation={rotation}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={onEnter}
    >
      {/* Arco do portal */}
      <PortalArch color={experience.color} />

      {/* Efeito de energia */}
      <PortalEnergy active={hovered} color={experience.color} />

      {/* Ícone */}
      <PortalIcon icon={experience.icon} />

      {/* Label */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
      >
        {experience.name}
      </Text>

      {/* Hotspot invisível para click */}
      <mesh visible={false}>
        <planeGeometry args={[3, 4]} />
      </mesh>
    </group>
  );
};
```

### 3. Arco do Portal

```typescript
// PortalArch.tsx
const PortalArch: React.FC<{ color: string }> = ({ color }) => {
  return (
    <group>
      {/* Estrutura do arco */}
      <mesh>
        <torusGeometry args={[1.5, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Brilho interno */}
      <mesh>
        <torusGeometry args={[1.5, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Pilares laterais */}
      <mesh position={[-1.5, -1, 0]}>
        <boxGeometry args={[0.2, 2, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} />
      </mesh>
      <mesh position={[1.5, -1, 0]}>
        <boxGeometry args={[0.2, 2, 0.2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.9} />
      </mesh>
    </group>
  );
};
```

### 4. Energia do Portal

```typescript
// PortalEnergy.tsx
const PortalEnergy: React.FC<{ active: boolean; color: string }> = ({
  active,
  color
}) => {
  const energyRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI;
      const radius = 1.3 + Math.random() * 0.4;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = Math.sin(angle) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (energyRef.current && active) {
      energyRef.current.rotation.z += 0.02;
    }
  });

  return (
    <points ref={energyRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color={color}
        transparent
        opacity={active ? 0.8 : 0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
```

### 5. Logo Central

```typescript
// CenterLogo.tsx
const CenterLogo: React.FC = () => {
  const logoRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (logoRef.current) {
      // Rotação suave
      logoRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      // Flutuação
      logoRef.current.position.y = 0.5 + Math.sin(state.clock.getElapsedTime()) * 0.1;
    }
  });

  return (
    <group ref={logoRef} position={[0, 0.5, 0]}>
      {/* Logo SVG convertido para 3D ou Image */}
      <Image
        url="/svg/logo-white.svg"
        scale={[3, 1]}
        transparent
        opacity={0.9}
      />

      {/* Glow abaixo do logo */}
      <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial
          color="#792990"
          emissive="#792990"
          emissiveIntensity={0.2}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};
```

---

## Posições dos Portais

```typescript
const PORTAL_POSITIONS = [
  // Ponto 1: Learning (topo)
  {
    position: [0, 0.2, -10] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number]
  },
  // Ponto 2: Product (direita-topo)
  {
    position: [7, 0.2, -7] as [number, number, number],
    rotation: [0, -Math.PI / 4, 0] as [number, number, number]
  },
  // Ponto 3: Landing (direita-baixo)
  {
    position: [10, 0.2, 0] as [number, number, number],
    rotation: [0, -Math.PI / 2, 0] as [number, number, number]
  },
  // Ponto 4: Virtual Space (baixo)
  {
    position: [7, 0.2, 7] as [number, number, number],
    rotation: [0, -Math.PI * 0.75, 0] as [number, number, number]
  },
  // Ponto 5: Sales Demo (baixo-esquerda)
  {
    position: [0, 0.2, 10] as [number, number, number],
    rotation: [0, Math.PI, 0] as [number, number, number]
  },
  // Ponto 6: Brand (esquerda-baixo)
  {
    position: [-7, 0.2, 7] as [number, number, number],
    rotation: [0, Math.PI * 0.75, 0] as [number, number, number]
  },
  // Ponto 7: Micro (esquerda-topo)
  {
    position: [-10, 0.2, 0] as [number, number, number],
    rotation: [0, Math.PI / 2, 0] as [number, number, number]
  },
];
```

---

## Iluminação do Hub

```typescript
// HubLighting.tsx
const HubLighting: React.FC = () => {
  return (
    <>
      {/* Luz ambiente base */}
      <ambientLight intensity={0.3} />

      {/* Luz principal de cima */}
      <pointLight
        position={[0, 15, 0]}
        intensity={1.5}
        color="#ffffff"
        castShadow
      />

      {/* Luzes coloridas para cada portal */}
      <pointLight position={[0, 2, -10]} intensity={0.5} color="#792990" />
      <pointLight position={[10, 2, 0]} intensity={0.5} color="#ffb947" />
      <pointLight position={[0, 2, 10]} intensity={0.5} color="#4a90e2" />
      <pointLight position={[-10, 2, 0]} intensity={0.5} color="#792990" />

      {/* Fog para profundidade */}
      <fog attach="fog" color="#0a0015" near={20} far={50} />
    </>
  );
};
```

---

## Partículas de Ambiente

```typescript
// HubParticles.tsx
const HubParticles: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Distribuição esférica ao redor do hub
      const radius = 15 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      // Cores variadas (roxo a amarelo)
      const color = new THREE.Color();
      color.setHSL(0.75 + Math.random() * 0.15, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
```

---

## Interações

### Hover no Portal
- Escala aumenta para 1.1
- Energia do portal acelera
- Cursor muda para pointer
- Label fica mais visível

### Click no Portal
- Animação de "entrar" (câmera avança)
- Fade para experiência
- Estado muda para `experience`

### Mobile
- Tap substitui hover + click
- Portais maiores para touch
- Indicadores visuais mais claros

---

## Transição Hub → Experiência

```typescript
const enterExperience = async (experience: ExperienceType) => {
  // 1. Marcar transição
  setIsTransitioning(true);

  // 2. Animar câmera em direção ao portal
  await gsap.to(camera.position, {
    x: portalPosition[0],
    y: portalPosition[1] + 1,
    z: portalPosition[2] + 2,
    duration: 0.8,
    ease: "power2.in"
  });

  // 3. Fade out
  await gsap.to(fadeOverlay, {
    opacity: 1,
    duration: 0.3
  });

  // 4. Mudar estado
  setCurrentLocation('experience');
  setCurrentExperience(experience);

  // 5. Posicionar câmera na experiência
  camera.position.set(...experienceCameraPos);

  // 6. Fade in
  await gsap.to(fadeOverlay, {
    opacity: 0,
    duration: 0.3
  });

  // 7. Finalizar transição
  setIsTransitioning(false);
};
```
