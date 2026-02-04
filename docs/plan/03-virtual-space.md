# Virtual Space (Ponto 4) - Especificação

## Conceito

Adaptar o OfficeScene existente para demonstrar o conceito de "sala navegável com conteúdos distribuídos". O prospect deve entender que pode ter um espaço assim para seu curso, evento ou apresentação.

---

## O Que Reaproveitar do OfficeScene

| Componente | Usar | Adaptar | Criar Novo |
|------------|------|---------|------------|
| Room (paredes, piso) | ✓ | | |
| Lighting | ✓ | | |
| Desk | | ✓ (sem botões físicos) | |
| HolographicInfo | | ✓ (conteúdo neutro) | |
| FloatingParticles | ✓ | | |
| InteractiveBall | | | Remover |
| Physics (Rapier) | | | Simplificar |
| PointerHand | | ✓ (posições novas) | |

---

## Modificações Necessárias

### 1. Remover Elementos Específicos

```typescript
// Remover:
// - Bolas com física (InteractiveBall)
// - Botões 3D nas mesas
// - Código typewriter na parede
// - Filosofia empresa na parede direita
```

### 2. Conteúdo Neutro

**Parede Traseira (onde era código):**
```typescript
// Antes: código específico
// Depois: "Área de Conteúdo Principal"

<Text position={[0, 5, -14.7]} fontSize={0.8} color="#ffffff">
  Módulo de Conhecimento
</Text>
<Text position={[0, 4, -14.7]} fontSize={0.4} color="#aaa">
  Clique para expandir
</Text>
```

**Parede Direita (onde era filosofia):**
```typescript
// Antes: missão/visão/valores
// Depois: "Recursos Complementares"

// Lista genérica:
// • Material de Apoio
// • Exercícios Práticos
// • Certificação
```

### 3. Estações de Conteúdo (substituir mesas)

```typescript
// Ao invés de 3 mesas com serviços específicos
// 3 "estações" genéricas:

const STATIONS = [
  {
    id: 'station-1',
    position: [0, 0, -5],
    title: 'Estação 1',
    subtitle: 'Conteúdo Interativo',
    icon: '📚'
  },
  {
    id: 'station-2',
    position: [-5, 0, 0],
    title: 'Estação 2',
    subtitle: 'Recursos Visuais',
    icon: '🎬'
  },
  {
    id: 'station-3',
    position: [5, 0, 0],
    title: 'Estação 3',
    subtitle: 'Avaliação',
    icon: '✅'
  }
];
```

---

## Novo Componente: ContentStation

```typescript
// ContentStation.tsx
interface ContentStationProps {
  position: [number, number, number];
  title: string;
  subtitle: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

const ContentStation: React.FC<ContentStationProps> = ({
  position,
  title,
  subtitle,
  icon,
  isActive,
  onClick
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Base da estação */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[2, 2, 0.2, 32]} />
        <meshStandardMaterial
          color={isActive ? "#792990" : "#2a2a2a"}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Anel luminoso */}
      <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2, 32]} />
        <meshStandardMaterial
          color="#792990"
          emissive="#792990"
          emissiveIntensity={isActive ? 0.5 : 0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Holograma flutuante */}
      <group position={[0, 2, 0]}>
        {/* Ícone */}
        <Text fontSize={1} anchorX="center" anchorY="middle">
          {icon}
        </Text>

        {/* Título */}
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.4}
          color="#ffffff"
          fontWeight={700}
          anchorX="center"
        >
          {title}
        </Text>

        {/* Subtítulo */}
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.25}
          color="#aaaaaa"
          anchorX="center"
        >
          {subtitle}
        </Text>
      </group>

      {/* Área clicável */}
      <mesh
        visible={false}
        onClick={onClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <cylinderGeometry args={[2.5, 2.5, 3, 32]} />
      </mesh>

      {/* Painel de conteúdo (aparece quando ativo) */}
      {isActive && <ContentPanel title={title} />}
    </group>
  );
};
```

---

## Painel de Conteúdo Expandido

```typescript
// ContentPanel.tsx
const ContentPanel: React.FC<{ title: string }> = ({ title }) => {
  const panelRef = useRef<THREE.Group>(null);

  // Animação de entrada
  useEffect(() => {
    if (panelRef.current) {
      gsap.from(panelRef.current.scale, {
        x: 0, y: 0, z: 0,
        duration: 0.5,
        ease: "back.out"
      });
    }
  }, []);

  return (
    <group ref={panelRef} position={[0, 4, 0]}>
      {/* Fundo do painel */}
      <Box args={[6, 4, 0.1]}>
        <meshStandardMaterial
          color="#1a1a1a"
          transparent
          opacity={0.9}
        />
      </Box>

      {/* Borda luminosa */}
      <Box args={[6.1, 4.1, 0.05]} position={[0, 0, -0.05]}>
        <meshStandardMaterial
          color="#792990"
          emissive="#792990"
          emissiveIntensity={0.3}
        />
      </Box>

      {/* Conteúdo */}
      <Text position={[0, 1.5, 0.1]} fontSize={0.4} color="#ffffff" fontWeight={700}>
        {title}
      </Text>

      <Text
        position={[0, 0.5, 0.1]}
        fontSize={0.25}
        color="#cccccc"
        maxWidth={5}
        textAlign="center"
      >
        Este espaço pode conter qualquer tipo de conteúdo: vídeos, textos, imagens, modelos 3D.
      </Text>

      {/* Botões de exemplo */}
      <group position={[0, -1, 0.1]}>
        <ExampleButton position={[-1.5, 0, 0]} label="Opção A" />
        <ExampleButton position={[0, 0, 0]} label="Opção B" />
        <ExampleButton position={[1.5, 0, 0]} label="Opção C" />
      </group>
    </group>
  );
};
```

---

## Navegação Dentro do Virtual Space

### Desktop
- Click-to-move para andar
- Click nas estações para expandir conteúdo
- Scroll para zoom

### Mobile
- Tap em hotspots (estações)
- Pinch para zoom
- Drag para rotacionar vista

```typescript
// VirtualSpaceControls.tsx
const VirtualSpaceControls: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  if (isMobile) {
    return (
      <MobileHotspots
        hotspots={STATIONS.map(s => ({
          position: s.position,
          label: s.title,
          onTap: () => setActiveStation(s.id)
        }))}
      />
    );
  }

  return (
    <OrbitControls
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      maxPolarAngle={Math.PI / 2}
      minDistance={5}
      maxDistance={20}
      target={[0, 2, 0]}
    />
  );
};
```

---

## Integração com Modo Guiado

```typescript
const VIRTUAL_SPACE_GUIDED_STEPS: GuidedStep[] = [
  {
    id: 'vs-intro',
    title: 'Espaço Virtual',
    description: 'Um ambiente navegável onde conteúdos estão distribuídos no espaço.',
    cameraPosition: [8, 5, 8],
    duration: 4000
  },
  {
    id: 'vs-station-1',
    title: 'Estações de Conteúdo',
    description: 'Cada estação pode conter módulos, aulas, recursos.',
    cameraPosition: [2, 3, -3],
    highlightElement: 'station-1',
    duration: 5000
  },
  {
    id: 'vs-interaction',
    title: 'Interação',
    description: 'O usuário clica para expandir e explorar.',
    cameraPosition: [0, 4, 2],
    duration: 4000
  },
  {
    id: 'vs-conclusion',
    title: 'Aplicações',
    description: 'Ideal para cursos, eventos, treinamentos corporativos.',
    cameraPosition: [8, 5, 8],
    duration: 4000
  }
];
```

---

## Checklist de Implementação

- [ ] Criar `VirtualSpace.tsx` baseado no `OfficeScene.tsx`
- [ ] Remover componentes específicos (bolas, botões, código)
- [ ] Criar `ContentStation.tsx`
- [ ] Criar `ContentPanel.tsx`
- [ ] Adaptar textos para neutros
- [ ] Implementar controles mobile
- [ ] Definir guided steps
- [ ] Testar transição Hub → Virtual Space
- [ ] Testar botão "Voltar ao Hub"
