import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/contexts/LanguageContext';
import PageHead from '@/components/PageHead';
import ProjectModal from '@/components/ProjectModal';

const ProjectsHero3D = dynamic(() => import('@/components/ProjectsHero3D'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="text-secondary">Loading 3D Experience...</div>
    </div>
  )
});

interface ProjectSlide {
  type: 'image' | 'video' | 'mixed';
  title: string;
  description?: string;
  imageUrl?: string;
  videoUrl?: string;
  features?: string[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  category: 'website' | 'automation' | 'ai' | 'ecommerce' | 'education';
  slides?: ProjectSlide[];
}

const ProjectsPage: React.FC = () => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getContent = () => {
    switch(language) {
      case 'pt-BR':
        return {
          title: 'Nossos Projetos',
          subtitle: 'Conheça alguns dos trabalhos que realizamos para nossos clientes',
          filterAll: 'Todos',
          filterWebsite: 'Websites',
          filterAutomation: 'Automação',
          filterAI: 'Inteligência Artificial',
          filterEcommerce: 'E-commerce',
          viewProject: 'Ver Projeto',
          viewCode: 'Ver Código',
          technologies: 'Tecnologias',
          noProjects: 'Nenhum projeto encontrado',
        };
      case 'es':
        return {
          title: 'Nuestros Proyectos',
          subtitle: 'Conoce algunos de los trabajos que hemos realizado para nuestros clientes',
          filterAll: 'Todos',
          filterWebsite: 'Sitios Web',
          filterAutomation: 'Automatización',
          filterAI: 'Inteligencia Artificial',
          filterEcommerce: 'E-commerce',
          viewProject: 'Ver Proyecto',
          viewCode: 'Ver Código',
          technologies: 'Tecnologías',
          noProjects: 'No se encontraron proyectos',
        };
      case 'it':
        return {
          title: 'I Nostri Progetti',
          subtitle: 'Scopri alcuni dei lavori che abbiamo realizzato per i nostri clienti',
          filterAll: 'Tutti',
          filterWebsite: 'Siti Web',
          filterAutomation: 'Automazione',
          filterAI: 'Intelligenza Artificiale',
          filterEcommerce: 'E-commerce',
          viewProject: 'Vedi Progetto',
          viewCode: 'Vedi Codice',
          technologies: 'Tecnologie',
          noProjects: 'Nessun progetto trovato',
        };
      default:
        return {
          title: 'Our Projects',
          subtitle: 'Discover some of the work we have done for our clients',
          filterAll: 'All',
          filterWebsite: 'Websites',
          filterAutomation: 'Automation',
          filterAI: 'Artificial Intelligence',
          filterEcommerce: 'E-commerce',
          viewProject: 'View Project',
          viewCode: 'View Code',
          technologies: 'Technologies',
          noProjects: 'No projects found',
        };
    }
  };

  const content = getContent();

  // Sample projects data - replace with real data later
  const projects: Project[] = [
    {
      id: '1',
      title: 'Plataforma de Ensino',
      description: 'Plataforma moderna de ensino online com recursos interativos',
      technologies: ['Next.js', 'Three.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
      imageUrl: '/images/projects/project1.jpg',
      liveUrl: 'https://example.com',
      category: 'education',
      slides: [
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Visão Geral' : 'Overview',
          description: language === 'pt-BR'
            ? 'Plataforma completa de ensino online desenvolvida para instituições educacionais e instrutores independentes. Sistema robusto com foco em experiência do usuário e recursos avançados de aprendizagem.'
            : 'Complete online learning platform developed for educational institutions and independent instructors. Robust system focused on user experience and advanced learning features.',
          imageUrl: '/images/education-overview.jpg',
          features: language === 'pt-BR'
            ? ['Sistema de gestão de cursos', 'Videoaulas em alta qualidade', 'Avaliações e certificados', 'Dashboard analítico', 'Pagamento integrado']
            : ['Course management system', 'High quality video lessons', 'Assessments and certificates', 'Analytics dashboard', 'Integrated payment']
        },
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Área do Aluno' : 'Student Area',
          description: language === 'pt-BR'
            ? 'Interface intuitiva e responsiva para os alunos acessarem cursos, acompanharem progresso e interagirem com instrutores e colegas.'
            : 'Intuitive and responsive interface for students to access courses, track progress and interact with instructors and peers.',
          imageUrl: '/images/student-dashboard.jpg',
          features: language === 'pt-BR'
            ? ['Progresso detalhado do curso', 'Sistema de gamificação', 'Fórum de discussão', 'Biblioteca de recursos', 'App mobile disponível']
            : ['Detailed course progress', 'Gamification system', 'Discussion forum', 'Resource library', 'Mobile app available']
        },
        {
          type: 'video',
          title: language === 'pt-BR' ? 'Sistema de Videoaulas' : 'Video Lesson System',
          description: language === 'pt-BR'
            ? 'Player de vídeo customizado com recursos avançados como velocidade variável, legendas, marcadores e sistema de anotações.'
            : 'Custom video player with advanced features like variable speed, subtitles, markers and note-taking system.',
          videoUrl: '/videos/video-system-demo.mp4',
          features: language === 'pt-BR'
            ? ['Streaming adaptativo', 'Múltiplas resoluções', 'Sistema de bookmarks', 'Transcrição automática']
            : ['Adaptive streaming', 'Multiple resolutions', 'Bookmark system', 'Automatic transcription']
        },
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Painel do Instrutor' : 'Instructor Panel',
          description: language === 'pt-BR'
            ? 'Ferramentas completas para criação e gestão de cursos, acompanhamento de alunos e análise de desempenho.'
            : 'Complete tools for course creation and management, student tracking and performance analysis.',
          imageUrl: '/images/instructor-panel.jpg',
          features: language === 'pt-BR'
            ? ['Editor de curso drag-and-drop', 'Upload em massa', 'Relatórios detalhados', 'Comunicação com alunos', 'Gestão financeira']
            : ['Drag-and-drop course editor', 'Bulk upload', 'Detailed reports', 'Student communication', 'Financial management']
        },
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Tecnologia e Segurança' : 'Technology and Security',
          description: language === 'pt-BR'
            ? 'Infraestrutura moderna e segura, garantindo disponibilidade, performance e proteção de dados.'
            : 'Modern and secure infrastructure, ensuring availability, performance and data protection.',
          imageUrl: '/images/tech-stack.jpg',
          features: language === 'pt-BR'
            ? ['Criptografia end-to-end', 'Backup automático', 'CDN global', 'Conformidade LGPD', 'API RESTful']
            : ['End-to-end encryption', 'Automatic backup', 'Global CDN', 'GDPR compliance', 'RESTful API']
        }
      ]
    },
    {
      id: '2',
      title: 'AI Chatbot System',
      description: 'Intelligent customer support system with natural language processing',
      technologies: ['Python', 'FastAPI', 'OpenAI', 'React'],
      imageUrl: '/images/projects/project2.jpg',
      liveUrl: 'https://example.com',
      category: 'ai',
    },
    {
      id: '3',
      title: 'Process Automation',
      description: 'Complete business process automation solution',
      technologies: ['Node.js', 'Docker', 'PostgreSQL', 'Redis'],
      imageUrl: '/images/projects/project3.jpg',
      githubUrl: 'https://github.com/example',
      category: 'automation',
    },
  ];

  const [filter, setFilter] = React.useState<'all' | 'website' | 'automation' | 'ai' | 'ecommerce' | 'education'>('all');

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <>
      <PageHead
        pageKey="projects"
        customTitle={content.title}
      />

      <main className="min-h-screen bg-gradient-to-b from-primary via-primary/90 to-primary">
        {/* 3D Hero Section */}
        <ProjectsHero3D onCategorySelect={setFilter} />

        {/* Filter Section */}
        <section className="py-10 px-6">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-custom-purple to-primary text-white shadow-lg'
                    : 'bg-primary/50 text-secondary hover:bg-primary/70 border border-custom-purple/30'
                }`}
              >
                {content.filterAll}
              </button>
              <button
                onClick={() => setFilter('website')}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  filter === 'website'
                    ? 'bg-gradient-to-r from-custom-purple to-primary text-white shadow-lg'
                    : 'bg-primary/50 text-secondary hover:bg-primary/70 border border-custom-purple/30'
                }`}
              >
                {content.filterWebsite}
              </button>
              <button
                onClick={() => setFilter('automation')}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  filter === 'automation'
                    ? 'bg-gradient-to-r from-yellowcustom to-yellow-600 text-white shadow-lg'
                    : 'bg-primary/50 text-secondary hover:bg-primary/70 border border-yellowcustom/30'
                }`}
              >
                {content.filterAutomation}
              </button>
              <button
                onClick={() => setFilter('ai')}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  filter === 'ai'
                    ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-lg'
                    : 'bg-primary/50 text-secondary hover:bg-primary/70 border border-blue-500/30'
                }`}
              >
                {content.filterAI}
              </button>
              <button
                onClick={() => setFilter('ecommerce')}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  filter === 'ecommerce'
                    ? 'bg-gradient-to-r from-green-500 to-green-700 text-white shadow-lg'
                    : 'bg-primary/50 text-secondary hover:bg-primary/70 border border-green-500/30'
                }`}
              >
                {content.filterEcommerce}
              </button>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section id="projects-grid" className="py-20 px-6">
          <div className="container mx-auto">
            {filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-primary/50 backdrop-blur-sm border border-custom-purple/30 rounded-2xl overflow-hidden hover:border-custom-purple/70 hover:shadow-xl hover:shadow-custom-purple/20 transition-all duration-300 group cursor-pointer"
                    onClick={() => handleProjectClick(project)}
                  >
                    {/* Project Image */}
                    <div className="aspect-video bg-gradient-to-br from-custom-purple/20 to-primary/40 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                          {project.category === 'website' && '🌐'}
                          {project.category === 'automation' && '⚙️'}
                          {project.category === 'ai' && '🤖'}
                          {project.category === 'ecommerce' && '🛒'}
                          {project.category === 'education' && '🎓'}
                        </span>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-secondary mb-4">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="mb-4">
                        <p className="text-sm text-secondary/70 mb-2">{content.technologies}:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-custom-purple/20 text-secondary text-xs rounded-full border border-custom-purple/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions - Buttons are visual only, click opens modal */}
                      <div className="flex gap-4">
                        {project.liveUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProjectClick(project);
                            }}
                            className="flex-1 bg-gradient-to-r from-custom-purple to-primary hover:from-custom-purple/90 hover:to-primary/90 text-white py-2 px-4 rounded-lg text-center font-semibold transition-all shadow-lg"
                          >
                            {content.viewProject}
                          </button>
                        )}
                        {project.githubUrl && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProjectClick(project);
                            }}
                            className="flex-1 bg-primary/70 hover:bg-primary text-white py-2 px-4 rounded-lg text-center font-semibold transition-all border border-custom-purple/30"
                          >
                            {content.viewCode}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-secondary text-xl">{content.noProjects}</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProject(null);
          }}
          project={selectedProject}
        />
      )}
    </>
  );
};

export default ProjectsPage;