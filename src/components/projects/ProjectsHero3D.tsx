'use client';

import React, { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import CanvasErrorBoundary from '@/components/CanvasErrorBoundary';
import {
  Float,
  Text,
  RoundedBox,
  Environment,
  Lightformer,
  ContactShadows,
  MeshReflectorMaterial,
} from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useLanguage } from '@/contexts/LanguageContext';

// Brand palette only.
const ACCENT = '#ffb947'; // yellow
const BRAND_PURPLE = '#792990';

const CTA_LABELS: Record<string, string> = {
  en: 'View projects',
  es: 'Ver proyectos',
  it: 'Vedi progetti',
  'pt-BR': 'Ver projetos',
};

type ShowcaseProject = {
  id: string;
  title: string;
  descriptor?: string;
  category: 'all' | 'sistemas' | 'website' | 'automation' | 'ai' | 'ecommerce' | 'education';
  icon: string;
};

/* -------------------------------------------------------------------------- */
/* Card                                                                       */
/* -------------------------------------------------------------------------- */

interface CardProps {
  project: ShowcaseProject;
  position: [number, number, number];
  rotationY: number;
  isHovered: boolean;
  dimmed: boolean;
  ctaLabel: string;
  onHover: (id: string | null) => void;
  onClick: () => void;
}

const W = 2.6;
const H = 3.4;
const D = 0.22;
const halfH = H / 2;
const faceZ = D / 2 + 0.06;

const ProjectCard3D: React.FC<CardProps> = ({
  project,
  position,
  rotationY,
  isHovered,
  dimmed,
  ctaLabel,
  onHover,
  onClick,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const liftTarget = position[1] + (isHovered ? 0.3 : 0);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, liftTarget, 0.1);
    const scaleTarget = isHovered ? 1.06 : 1;
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, scaleTarget, 0.12);
    groupRef.current.scale.setScalar(s);
  });

  const cardOpacity = dimmed ? 0.35 : 1;

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(project.id);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Float speed={1.5} rotationIntensity={0.04} floatIntensity={0.3} floatingRange={[-0.05, 0.05]}>
        {/* Glass / obsidian card — solid so the back never shows through */}
        <RoundedBox args={[W, H, D]} radius={0.14} smoothness={6}>
          <meshPhysicalMaterial
            color="#1a0726"
            metalness={0.55}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.12}
            emissive={BRAND_PURPLE}
            emissiveIntensity={isHovered ? 0.5 : dimmed ? 0.1 : 0.24}
            envMapIntensity={1.4}
          />
        </RoundedBox>

        {/* Amber rim (blooms) */}
        <RoundedBox args={[W, H, D]} radius={0.14} smoothness={6} scale={[1.012, 1.01, 1.0]}>
          <meshBasicMaterial
            color={ACCENT}
            toneMapped={false}
            transparent
            opacity={(isHovered ? 0.9 : 0.45) * cardOpacity}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </RoundedBox>

        {/* Header accent bar */}
        <mesh position={[0, halfH * 0.88, faceZ]}>
          <boxGeometry args={[W * 0.26, 0.05, 0.02]} />
          <meshBasicMaterial color={ACCENT} toneMapped={false} transparent opacity={cardOpacity} depthWrite={false} />
        </mesh>

        {/* Icon chip ring + fill */}
        <mesh position={[0, halfH * 0.42, faceZ]}>
          <ringGeometry args={[0.46, 0.54, 48]} />
          <meshBasicMaterial
            color={ACCENT}
            toneMapped={false}
            transparent
            opacity={(isHovered ? 0.95 : 0.6) * cardOpacity}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[0, halfH * 0.42, faceZ - 0.01]}>
          <circleGeometry args={[0.5, 48]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.1 * cardOpacity} depthWrite={false} />
        </mesh>

        {/* Icon */}
        <Text position={[0, halfH * 0.42, faceZ + 0.05]} fontSize={0.46} anchorX="center" anchorY="middle">
          {project.icon}
        </Text>

        {/* Title — anchored from the top so a two-line title grows downward
            (away from the icon) instead of expanding into it. */}
        <Text
          position={[0, halfH * 0.056, faceZ + 0.05]}
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
          anchorY="top"
          textAlign="center"
          maxWidth={W * 0.68}
          lineHeight={1.18}
          fillOpacity={cardOpacity}
        >
          {project.title}
        </Text>

        {/* Divider */}
        <mesh position={[0, -halfH * 0.32, faceZ]}>
          <boxGeometry args={[W * 0.46, 0.012, 0.01]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.4 * cardOpacity} depthWrite={false} />
        </mesh>

        {/* Category label */}
        <Text
          position={[0, -halfH * 0.44, faceZ + 0.05]}
          fontSize={0.11}
          color={ACCENT}
          anchorX="center"
          anchorY="middle"
          letterSpacing={project.descriptor ? 0.08 : 0.2}
          maxWidth={W * 0.86}
          fillOpacity={cardOpacity}
        >
          {project.descriptor ?? project.category.toUpperCase()}
        </Text>

        {/* CTA */}
        <Text
          position={[0, -halfH * 0.68, faceZ + 0.05]}
          fontSize={0.135}
          color={isHovered ? '#ffb947' : '#aaa6c3'}
          anchorX="center"
          anchorY="middle"
          fillOpacity={cardOpacity}
        >
          {`${ctaLabel}  →`}
        </Text>

        {isHovered && <pointLight position={[0, 0, 1.6]} intensity={3} color={ACCENT} distance={6} />}
      </Float>
    </group>
  );
};

/* -------------------------------------------------------------------------- */
/* Atmosphere                                                                 */
/* -------------------------------------------------------------------------- */

const Dust: React.FC = () => {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(90 * 3);
    for (let i = 0; i < 90; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={ACCENT} size={0.06} sizeAttenuation transparent opacity={0.5} toneMapped={false} depthWrite={false} />
    </points>
  );
};

const Rig: React.FC<{ dragging: React.MutableRefObject<boolean> }> = ({ dragging }) => {
  useFrame((state) => {
    // Hold horizontal while dragging the ring so the two don't fight.
    const targetX = dragging.current ? state.camera.position.x : state.pointer.x * 0.5;
    const targetY = 0.4 + state.pointer.y * 0.18;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.04;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, -0.1, 0);
  });
  return null;
};

/* -------------------------------------------------------------------------- */
/* Stage                                                                      */
/* -------------------------------------------------------------------------- */

const RADIUS = 3.4;

interface StageProps {
  projects: ShowcaseProject[];
  ctaLabel: string;
  onSelect: (category: ShowcaseProject['category']) => void;
  targetRotation: React.MutableRefObject<number>;
  dragging: React.MutableRefObject<boolean>;
  didDrag: React.MutableRefObject<boolean>;
}

const Stage: React.FC<StageProps> = ({ projects, ctaLabel, onSelect, targetRotation, dragging, didDrag }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const ringRef = useRef<THREE.Group>(null);
  const n = projects.length;

  useFrame(() => {
    // Slow idle spin, paused while dragging or hovering.
    if (!dragging.current && hovered === null) targetRotation.current += 0.0016;
    if (ringRef.current) {
      ringRef.current.rotation.y = THREE.MathUtils.lerp(
        ringRef.current.rotation.y,
        targetRotation.current,
        0.08
      );
    }
  });

  // Rotate the clicked card to the front (shortest path), then filter.
  const bringToFront = (base: number, category: ShowcaseProject['category']) => {
    if (didDrag.current) return; // it was a drag, not a tap
    let desired = -base;
    desired += Math.round((targetRotation.current - desired) / (Math.PI * 2)) * Math.PI * 2;
    targetRotation.current = desired;
    onSelect(category);
    // Reveal the filtered projects of this type below.
    setTimeout(() => {
      document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' });
    }, 550);
  };

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 8, 6]} intensity={1.2} />

      <Environment frames={1} resolution={256}>
        <Lightformer intensity={2} color="#ffffff" position={[0, 5, -5]} scale={[12, 5, 1]} />
        <Lightformer intensity={3} color={ACCENT} position={[6, 1, 3]} scale={[7, 7, 1]} />
        <Lightformer intensity={2.6} color={BRAND_PURPLE} position={[-7, 1, 3]} scale={[7, 7, 1]} />
        <Lightformer intensity={1.4} color="#ffffff" position={[0, -3, 4]} scale={[12, 2, 1]} />
      </Environment>

      {/* Rotating carousel ring */}
      <group ref={ringRef}>
        {projects.map((p, i) => {
          const base = (i / n) * Math.PI * 2;
          const position: [number, number, number] = [
            Math.sin(base) * RADIUS,
            0,
            Math.cos(base) * RADIUS,
          ];
          return (
            <ProjectCard3D
              key={p.id}
              project={p}
              position={position}
              rotationY={base}
              isHovered={hovered === p.id}
              dimmed={hovered !== null && hovered !== p.id}
              ctaLabel={ctaLabel}
              onHover={setHovered}
              onClick={() => bringToFront(base, p.category)}
            />
          );
        })}
      </group>

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
        <planeGeometry args={[70, 70]} />
        <MeshReflectorMaterial
          blur={[320, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={28}
          roughness={0.9}
          depthScale={1.1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.3}
          color="#0c0414"
          metalness={0.6}
          mirror={0.45}
        />
      </mesh>
      <ContactShadows position={[0, -2.38, 0]} opacity={0.55} scale={30} blur={2.6} far={6} color="#000000" />

      <Dust />
      <Rig dragging={dragging} />

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.6} intensity={1.1} radius={0.7} />
        <DepthOfField target={[0, 0, RADIUS]} focalLength={0.025} bokehScale={2.4} height={480} />
        <Vignette eskil={false} offset={0.3} darkness={0.72} />
      </EffectComposer>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

interface ProjectsHero3DProps {
  onCategorySelect: (category: 'all' | 'sistemas' | 'website' | 'automation' | 'ai' | 'ecommerce' | 'education') => void;
}

const ProjectsHero3D: React.FC<ProjectsHero3DProps> = ({ onCategorySelect }) => {
  const { language } = useLanguage();
  const lang = language === 'pt' ? 'pt-BR' : language;
  const ctaLabel = CTA_LABELS[lang] ?? CTA_LABELS.en;

  const content = useMemo(() => {
    switch (lang) {
      case 'pt-BR':
        return { eyebrow: 'Portfólio', lead: 'Nossos', accent: 'Projetos', subtitle: 'Conheça alguns dos trabalhos que realizamos para nossos clientes', explore: 'Explorar projetos' };
      case 'es':
        return { eyebrow: 'Portafolio', lead: 'Nuestros', accent: 'Proyectos', subtitle: 'Conoce algunos de los trabajos que hemos realizado para nuestros clientes', explore: 'Explorar proyectos' };
      case 'it':
        return { eyebrow: 'Portfolio', lead: 'I Nostri', accent: 'Progetti', subtitle: 'Scopri alcuni dei lavori che abbiamo realizzato per i nostri clienti', explore: 'Esplora progetti' };
      default:
        return { eyebrow: 'Portfolio', lead: 'Our', accent: 'Projects', subtitle: 'Discover some of the work we have done for our clients', explore: 'Explore projects' };
    }
  }, [lang]);

  const projects: ShowcaseProject[] = useMemo(
    () => [
      { id: '1', category: 'education', icon: '🎓', title: lang === 'pt-BR' ? 'Plataforma de Ensino' : lang === 'es' ? 'Plataforma de Enseñanza' : lang === 'it' ? 'Piattaforma di Apprendimento' : 'Learning Platform' },
      { id: '2', category: 'website', icon: '🌐', title: lang === 'pt-BR' ? 'Site Corporativo' : lang === 'es' ? 'Sitio Corporativo' : lang === 'it' ? 'Sito Aziendale' : 'Corporate Website' },
      { id: '3', category: 'automation', icon: '⚙️', title: lang === 'pt-BR' ? 'Sistema de Automação' : lang === 'es' ? 'Sistema de Automatización' : lang === 'it' ? 'Sistema di Automazione' : 'Automation System' },
      { id: '4', category: 'ai', icon: '🤖', title: lang === 'pt-BR' ? 'Agentes de IA' : lang === 'es' ? 'Agentes de IA' : lang === 'it' ? 'Agenti IA' : 'AI Agents' },
      { id: '5', category: 'sistemas', icon: '🖥️', title: lang === 'pt-BR' ? 'Sistemas' : lang === 'es' ? 'Sistemas' : lang === 'it' ? 'Sistemi' : 'Systems' },
      { id: '6', category: 'ecommerce', icon: '🛒', title: 'E-commerce' },
    ],
    [lang]
  );

  // Carousel rotation shared between DOM drag handlers and the R3F ring.
  const targetRotation = useRef(0);
  const dragging = useRef(false);
  const didDrag = useRef(false);
  const lastX = useRef(0);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    didDrag.current = false;
    lastX.current = e.clientX;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    targetRotation.current += dx * 0.006;
    if (Math.abs(dx) > 2) didDrag.current = true;
  };
  const endDrag = () => {
    dragging.current = false;
  };

  const scrollToGrid = () => {
    document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#1a0526]">
      {/* Title band — sits above the 3D, never over it */}
      <div className="relative z-10 px-6 pt-32 pb-2 text-center md:pt-40">
        {/* Eyebrow between hairlines */}
        <div
          className="mb-6 flex animate-fade-in items-center justify-center gap-4"
          style={{ opacity: 0, animationDelay: '0s' }}
        >
          <span className="h-px w-8 bg-yellowcustom/40 md:w-12" />
          <span className="font-mono text-[11px] uppercase tracking-[0.4em] text-yellowcustom md:text-xs">
            {content.eyebrow}
          </span>
          <span className="h-px w-8 bg-yellowcustom/40 md:w-12" />
        </div>

        {/* Title — single colour, tight editorial scale */}
        <h1
          className="animate-fade-in text-5xl font-extrabold leading-[0.9] tracking-[-0.03em] text-white md:text-7xl lg:text-[5.25rem]"
          style={{ opacity: 0, animationDelay: '0.12s' }}
        >
          {content.lead} {content.accent}
        </h1>

        <p
          className="mx-auto mt-6 max-w-md animate-fade-in text-sm leading-relaxed text-secondary/80 md:max-w-xl md:text-base"
          style={{ opacity: 0, animationDelay: '0.24s' }}
        >
          {content.subtitle}
        </p>
      </div>

      {/* 3D carousel — explicit height so it never collapses */}
      <div
        className="relative h-[64vh] min-h-[460px] w-full cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
      >
        <CanvasErrorBoundary>
        <Canvas
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.4, 9.5], fov: 38 }}
        >
          <color attach="background" args={['#1a0526']} />
          <fog attach="fog" args={['#1a0526', 10, 22]} />
          <Suspense fallback={null}>
            <Stage
              projects={projects}
              ctaLabel={ctaLabel}
              onSelect={onCategorySelect}
              targetRotation={targetRotation}
              dragging={dragging}
              didDrag={didDrag}
            />
          </Suspense>
        </Canvas>
        </CanvasErrorBoundary>

        {/* Explore CTA */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex justify-center">
          <button
            onClick={scrollToGrid}
            className="pointer-events-auto group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-yellowcustom to-custom-purple px-8 py-4 font-semibold text-white shadow-lg shadow-custom-purple/30 transition-transform duration-300 hover:scale-105"
          >
            {content.explore}
            <svg className="h-4 w-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsHero3D;
