import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Text, Box, RoundedBox, Image as DreiImage, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectCard3DProps {
  position: [number, number, number];
  project: {
    id: string;
    title: string;
    category: 'website' | 'automation' | 'ai' | 'ecommerce' | 'education';
    color: string;
    icon: string;
  };
  onHover: (id: string | null) => void;
  isHovered: boolean;
  onClick: () => void;
}

const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  position,
  project,
  onHover,
  isHovered,
  onClick
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardSize = isMobile ? [2.5, 1.8, 0.3] : [3.75, 2.7, 0.45]; // 50% larger on desktop
  const iconSize = isMobile ? 0.8 : 1.2;
  const titleSize = isMobile ? 0.15 : 0.225;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;

      if (isHovered) {
        groupRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={position}>
        <group
          ref={groupRef}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            onHover(project.id);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHovered(false);
            onHover(null);
            document.body.style.cursor = 'auto';
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <mesh>
            <RoundedBox
              args={cardSize as [number, number, number]}
              radius={0.1}
              smoothness={4}
            >
              <meshStandardMaterial
                color={hovered ? project.color : '#350545'}
                emissive={project.color}
                emissiveIntensity={hovered ? 0.3 : 0.1}
                metalness={0.8}
                roughness={0.2}
              />
            </RoundedBox>
          </mesh>

          {/* Icon - Front */}
          <Text
            position={[0, 0, cardSize[2] / 2 + 0.05]}
            fontSize={iconSize}
            color={hovered ? '#ffffff' : '#aaa6c3'}
            anchorX="center"
            anchorY="middle"
          >
            {project.icon}
          </Text>

          {/* Title - Front */}
          <Text
            position={[0, -0.9, cardSize[2] / 2 + 0.05]}
            fontSize={titleSize}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={isMobile ? 2 : 3}
          >
            {project.title}
          </Text>

          {/* Icon - Back */}
          <Text
            position={[0, 0, -(cardSize[2] / 2 + 0.05)]}
            fontSize={iconSize}
            color={hovered ? '#ffffff' : '#aaa6c3'}
            anchorX="center"
            anchorY="middle"
            rotation={[0, Math.PI, 0]}
          >
            {project.icon}
          </Text>

          {/* Title - Back */}
          <Text
            position={[0, -0.9, -(cardSize[2] / 2 + 0.05)]}
            fontSize={titleSize}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={isMobile ? 2 : 3}
            rotation={[0, Math.PI, 0]}
          >
            {project.title}
          </Text>

          {/* Glow effect */}
          {hovered && (
            <pointLight
              position={[0, 0, 0.5]}
              intensity={1}
              color={project.color}
              distance={3}
            />
          )}

          {/* Tooltip on Hover - Below the card */}
          {hovered && (
            <Html
              position={[0, -(cardSize[1] / 2 + 0.8), 0]}
              center
              style={{
                transition: 'all 0.3s',
                pointerEvents: 'none'
              }}
            >
              <div className="bg-gradient-to-r from-custom-purple to-primary text-white px-4 py-2 rounded-lg shadow-xl border border-custom-purple/30 whitespace-nowrap backdrop-blur-sm">
                <div className="text-xs font-light opacity-90 mb-1">Click to filter by</div>
                <div className="text-sm font-bold">{project.category.toUpperCase()}</div>
              </div>
            </Html>
          )}
        </group>
      </group>
    </Float>
  );
};

const Scene: React.FC<{
  projects: any[];
  onProjectClick: (category: 'all' | 'website' | 'automation' | 'ai' | 'ecommerce' | 'education') => void;
}> = ({ projects, onProjectClick }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Arrange projects in a circular pattern - smaller radius on mobile, larger on desktop
  const projectPositions = useMemo(() => {
    const radius = isMobile ? 2.5 : 6; // Much larger radius on desktop for spacing
    const verticalSpread = isMobile ? 1 : 2;
    const depthSpread = isMobile ? 1 : 3;

    return projects.map((_, index) => {
      const angle = (index / projects.length) * Math.PI * 2;
      return [
        Math.cos(angle) * radius,
        Math.sin(angle) * verticalSpread,
        Math.sin(angle) * depthSpread
      ] as [number, number, number];
    });
  }, [projects.length, isMobile]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#792990" />

      {projects.map((project, index) => (
        <ProjectCard3D
          key={project.id}
          position={projectPositions[index]}
          project={project}
          onHover={setHoveredId}
          isHovered={hoveredId === project.id}
          onClick={() => onProjectClick(project.category)}
        />
      ))}

      {/* Central glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          emissive="#792990"
          emissiveIntensity={2}
          color="#792990"
        />
      </mesh>
    </>
  );
};

interface ProjectsHero3DProps {
  onCategorySelect: (category: 'all' | 'website' | 'automation' | 'ai' | 'ecommerce' | 'education') => void;
}

const ProjectsHero3D: React.FC<ProjectsHero3DProps> = ({ onCategorySelect }) => {
  const { language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getContent = () => {
    switch(language) {
      case 'pt-BR':
        return {
          title: 'Nossos Projetos',
          subtitle: 'Conheça alguns dos trabalhos que realizamos para nossos clientes',
          explore: 'Explorar Projetos',
        };
      case 'es':
        return {
          title: 'Nuestros Proyectos',
          subtitle: 'Conoce algunos de los trabajos que hemos realizado para nuestros clientes',
          explore: 'Explorar Proyectos',
        };
      case 'it':
        return {
          title: 'I Nostri Progetti',
          subtitle: 'Scopri alcuni dei lavori che abbiamo realizzato per i nostri clienti',
          explore: 'Esplora Progetti',
        };
      default:
        return {
          title: 'Our Projects',
          subtitle: 'Discover some of the work we have done for our clients',
          explore: 'Explore Projects',
        };
    }
  };

  const content = getContent();

  const showcaseProjects = [
    {
      id: '1',
      title: 'Plataforma de Ensino',
      category: 'education',
      color: '#10b981',
      icon: '🎓'
    },
    {
      id: '2',
      title: 'AI Chatbot',
      category: 'ai',
      color: '#3b82f6',
      icon: '🤖'
    },
    {
      id: '3',
      title: 'Automation System',
      category: 'automation',
      color: '#ffb947',
      icon: '⚙️'
    },
    {
      id: '4',
      title: 'Corporate Website',
      category: 'website',
      color: '#792990',
      icon: '🌐'
    },
    {
      id: '5',
      title: 'Dashboard Analytics',
      category: 'website',
      color: '#792990',
      icon: '📊'
    },
    {
      id: '6',
      title: 'Mobile App',
      category: 'website',
      color: '#792990',
      icon: '📱'
    }
  ];

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center py-20 px-6 mt-32 overflow-hidden">
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/90 to-primary">
        <div className="absolute inset-0 bg-gradient-to-r from-custom-purple/20 via-transparent to-custom-purple/20 animate-pulse" />
      </div>

      {/* Tech Lines Effects - Top Left */}
      <div className="absolute top-0 left-0 w-96 h-96 pointer-events-none">
        <svg className="w-full h-full opacity-60" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="lineGradientTL" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#792990" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#792990" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#792990" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <path
              key={`tl-${i}`}
              d={`M ${20 + i * 15} 0 Q ${100 + i * 20} ${100 + i * 10} 400 ${300 + i * 20}`}
              stroke="url(#lineGradientTL)"
              strokeWidth="1.5"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Tech Lines Effects - Top Right */}
      <div className="absolute top-0 right-0 w-96 h-96 pointer-events-none">
        <svg className="w-full h-full opacity-60" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="lineGradientTR" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#792990" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#792990" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#792990" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <path
              key={`tr-${i}`}
              d={`M ${380 - i * 15} 0 Q ${300 - i * 20} ${100 + i * 10} 0 ${300 + i * 20}`}
              stroke="url(#lineGradientTR)"
              strokeWidth="1.5"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Tech Lines Effects - Bottom Left */}
      <div className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none">
        <svg className="w-full h-full opacity-60" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="lineGradientBL" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffb947" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ffb947" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffb947" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <path
              key={`bl-${i}`}
              d={`M ${20 + i * 15} 400 Q ${100 + i * 20} ${300 - i * 10} 400 ${100 - i * 20}`}
              stroke="url(#lineGradientBL)"
              strokeWidth="1.5"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Tech Lines Effects - Bottom Right */}
      <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none">
        <svg className="w-full h-full opacity-60" viewBox="0 0 400 400">
          <defs>
            <linearGradient id="lineGradientBR" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#ffb947" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ffb947" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ffb947" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <path
              key={`br-${i}`}
              d={`M ${380 - i * 15} 400 Q ${300 - i * 20} ${300 - i * 10} 0 ${100 - i * 20}`}
              stroke="url(#lineGradientBR)"
              strokeWidth="1.5"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Tech Grid Pattern - Left Side */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-full pointer-events-none">
        <div className="relative w-full h-full">
          {[...Array(8)].map((_, i) => (
            <div
              key={`grid-l-${i}`}
              className="absolute h-px bg-gradient-to-r from-custom-purple/40 to-transparent"
              style={{
                top: `${(i + 1) * 12}%`,
                width: `${100 - i * 10}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Tech Grid Pattern - Right Side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-full pointer-events-none">
        <div className="relative w-full h-full">
          {[...Array(8)].map((_, i) => (
            <div
              key={`grid-r-${i}`}
              className="absolute h-px bg-gradient-to-l from-custom-purple/40 to-transparent right-0"
              style={{
                top: `${(i + 1) * 12}%`,
                width: `${100 - i * 10}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-white via-secondary to-white bg-clip-text text-transparent">
            {content.title}
          </span>
        </h1>
        <p className="text-xl text-secondary animate-fade-in animation-delay-200">
          {content.subtitle}
        </p>
      </div>

      {/* 3D Canvas */}
      <div className="relative w-full h-[400px] max-w-7xl mx-auto">
        <Canvas
          camera={{
            position: [0, 0, isMobile ? 12 : 15], // Further back on desktop to see wider spread
            fov: isMobile ? 60 : 55 // Slightly wider FOV on desktop for better view
          }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene
            projects={showcaseProjects}
            onProjectClick={(cat) => onCategorySelect(cat as 'all' | 'website' | 'automation' | 'ai' | 'ecommerce' | 'education')}
          />
        </Canvas>
      </div>

      {/* CTA Button */}
      <div className="relative z-10 mt-8">
        <button
          onClick={() => {
            const projectsSection = document.getElementById('projects-grid');
            projectsSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-gradient-to-r from-custom-purple to-primary hover:from-custom-purple/90 hover:to-primary/90 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-3"
        >
          <span>{content.explore}</span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* Floating badge for new projects */}
      <div className="absolute top-10 right-10 animate-float">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          ✨ New Project
        </div>
      </div>
    </section>
  );
};

export default ProjectsHero3D;