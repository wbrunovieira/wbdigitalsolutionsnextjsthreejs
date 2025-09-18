import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
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
          viewProject: 'Saber Mais',
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
          viewProject: 'Saber Más',
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
          viewProject: 'Scopri di Più',
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
          viewProject: 'View Details',
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
      title: language === 'pt-BR' ? 'Plataforma de Ensino' :
              language === 'es' ? 'Plataforma de Enseñanza' :
              language === 'it' ? 'Piattaforma di Apprendimento' :
              'Learning Platform',
      description: language === 'pt-BR' ? 'Plataforma moderna de ensino online com recursos interativos e suporte multilíngue completo' :
                   language === 'es' ? 'Plataforma moderna de enseñanza en línea con funciones interactivas y soporte multilingüe completo' :
                   language === 'it' ? 'Piattaforma di apprendimento online moderna con funzionalità interattive e supporto multilingue completo' :
                   'Modern online learning platform with interactive features and complete multilingual support',
      technologies: ['Next.js', 'NestJS', 'PostgreSQL', 'AWS'],
      imageUrl: '/img/projects/revalida1.png',
      liveUrl: 'https://example.com',
      category: 'education',
      slides: [
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Plataforma de Ensino Sob Medida' :
                 language === 'es' ? 'Plataforma de Enseñanza a Medida' :
                 language === 'it' ? 'Piattaforma di Apprendimento Su Misura' :
                 'Custom Learning Platform',
          description: language === 'pt-BR'
            ? 'Desenvolvemos este projeto a partir das necessidades específicas do cliente, criando uma solução completa e totalmente personalizada.\n\nTudo dentro de uma interface moderna, intuitiva e multilíngue, garantindo a melhor experiência para administradores, professores e estudantes.'
            : language === 'es'
            ? 'Desarrollamos este proyecto a partir de las necesidades específicas del cliente, creando una solución completa y totalmente personalizada.\n\nTodo dentro de una interfaz moderna, intuitiva y multilingüe, garantizando la mejor experiencia para administradores, profesores y estudiantes.'
            : language === 'it'
            ? 'Abbiamo sviluppato questo progetto partendo dalle esigenze specifiche del cliente, creando una soluzione completa e totalmente personalizzata.\n\nTutto all\'interno di un\'interfaccia moderna, intuitiva e multilingue, garantendo la migliore esperienza per amministratori, insegnanti e studenti.'
            : 'We developed this project based on the client\'s specific needs, creating a complete and fully customized solution.\n\nAll within a modern, intuitive and multilingual interface, ensuring the best experience for administrators, teachers and students.',
          imageUrl: '/img/projects/revalida2.png',
          features: language === 'pt-BR'
            ? ['Gestão de usuários e perfis', 'Controle de cursos, aulas e trilhas de aprendizado', 'Criação de quizzes, simulados e avaliações', 'Estatísticas e relatórios detalhados', 'Comunicação integrada entre alunos e professores', 'Emissão automática de certificados', 'Integrações com Panda Video, Zoom e Hotmart']
            : language === 'es'
            ? ['Gestión de usuarios y perfiles', 'Control de cursos, clases y rutas de aprendizaje', 'Creación de quizzes, simulacros y evaluaciones', 'Estadísticas e informes detallados', 'Comunicación integrada entre alumnos y profesores', 'Emisión automática de certificados', 'Integraciones con Panda Video, Zoom y Hotmart']
            : language === 'it'
            ? ['Gestione utenti e profili', 'Controllo corsi, lezioni e percorsi di apprendimento', 'Creazione di quiz, simulazioni e valutazioni', 'Statistiche e report dettagliati', 'Comunicazione integrata tra studenti e insegnanti', 'Emissione automatica di certificati', 'Integrazioni con Panda Video, Zoom e Hotmart']
            : ['User and profile management', 'Course, class and learning path control', 'Quiz, mock test and assessment creation', 'Detailed statistics and reports', 'Integrated communication between students and teachers', 'Automatic certificate issuance', 'Integrations with Panda Video, Zoom and Hotmart']
        },
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Comunidade Interativa' :
                 language === 'es' ? 'Comunidad Interactiva' :
                 language === 'it' ? 'Comunità Interattiva' :
                 'Interactive Community',
          description: language === 'pt-BR'
            ? 'Além do aprendizado formal, a plataforma conta com um espaço exclusivo de comunidade — um ambiente dinâmico que conecta alunos, professores e administradores em tempo real.\n\nFunciona como uma rede social acadêmica, onde os participantes podem interagir em tópicos de interesse comum.\n\nEsse espaço promove colaboração, troca de conhecimento e engajamento contínuo entre todos os envolvidos no processo de ensino.'
            : language === 'es'
            ? 'Además del aprendizaje formal, la plataforma cuenta con un espacio exclusivo de comunidad — un ambiente dinámico que conecta estudiantes, profesores y administradores en tiempo real.\n\nFunciona como una red social académica, donde los participantes pueden interactuar en temas de interés común.\n\nEste espacio promueve la colaboración, el intercambio de conocimientos y el compromiso continuo entre todos los involucrados en el proceso de enseñanza.'
            : language === 'it'
            ? 'Oltre all\'apprendimento formale, la piattaforma dispone di uno spazio comunitario esclusivo — un ambiente dinamico che collega studenti, insegnanti e amministratori in tempo reale.\n\nFunziona come un social network accademico, dove i partecipanti possono interagire su argomenti di interesse comune.\n\nQuesto spazio promuove la collaborazione, lo scambio di conoscenze e il coinvolgimento continuo tra tutti i soggetti coinvolti nel processo di insegnamento.'
            : 'In addition to formal learning, the platform features an exclusive community space — a dynamic environment that connects students, teachers and administrators in real time.\n\nIt works as an academic social network, where participants can interact on topics of common interest.\n\nThis space promotes collaboration, knowledge exchange and continuous engagement among all those involved in the teaching process.',
          imageUrl: '/img/projects/revalida3.png',
          features: language === 'pt-BR'
            ? ['Criar posts e compartilhar dúvidas, resumos e experiências', 'Curtir com reações em emojis e responder aos comentários', 'Interagir em tópicos de interesse comum']
            : language === 'es'
            ? ['Crear publicaciones y compartir dudas, resúmenes y experiencias', 'Dar me gusta con reacciones emoji y responder comentarios', 'Interactuar en temas de interés común']
            : language === 'it'
            ? ['Creare post e condividere domande, riassunti ed esperienze', 'Mettere mi piace con reazioni emoji e rispondere ai commenti', 'Interagire su argomenti di interesse comune']
            : ['Create posts and share questions, summaries and experiences', 'Like with emoji reactions and reply to comments', 'Interact on topics of common interest']
        },
        {
          type: 'video',
          title: language === 'pt-BR' ? 'Flashcards Interativos e Dinâmicos' :
                 language === 'es' ? 'Flashcards Interactivos y Dinámicos' :
                 language === 'it' ? 'Flashcard Interattivi e Dinamici' :
                 'Interactive and Dynamic Flashcards',
          description: language === 'pt-BR'
            ? 'Criamos um recurso de flashcards com animações modernas para tornar a memorização mais envolvente e eficaz.\n\nCada aluno possui um painel completo que permite acompanhar seu desempenho em tempo real.\n\nEsse acompanhamento inteligente ajuda o estudante a identificar pontos fortes, revisar conteúdos mais difíceis e manter constância no aprendizado.'
            : language === 'es'
            ? 'Creamos un recurso de flashcards con animaciones modernas para hacer la memorización más atractiva y eficaz.\n\nCada estudiante tiene un panel completo que le permite seguir su rendimiento en tiempo real.\n\nEste seguimiento inteligente ayuda al estudiante a identificar puntos fuertes, revisar contenidos más difíciles y mantener constancia en el aprendizaje.'
            : language === 'it'
            ? 'Abbiamo creato una risorsa di flashcard con animazioni moderne per rendere la memorizzazione più coinvolgente ed efficace.\n\nOgni studente ha un pannello completo che permette di monitorare le proprie prestazioni in tempo reale.\n\nQuesto monitoraggio intelligente aiuta lo studente a identificare i punti di forza, rivedere i contenuti più difficili e mantenere costanza nell\'apprendimento.'
            : 'We created a flashcard feature with modern animations to make memorization more engaging and effective.\n\nEach student has a complete panel that allows them to track their performance in real time.\n\nThis intelligent tracking helps students identify strengths, review more difficult content and maintain consistency in learning.',
          videoUrl: '/img/projects/revalidaFlashcard.mp4',
          features: language === 'pt-BR'
            ? ['Evolução da taxa de acerto', 'Número de interações e sequência de estudo', 'Distribuição por dificuldade', 'Histórico de atividades recentes', 'Calendário personalizado de estudos', 'Insights de horários mais produtivos']
            : language === 'es'
            ? ['Evolución de la tasa de acierto', 'Número de interacciones y secuencia de estudio', 'Distribución por dificultad', 'Historial de actividades recientes', 'Calendario personalizado de estudios', 'Insights de horarios más productivos']
            : language === 'it'
            ? ['Evoluzione del tasso di successo', 'Numero di interazioni e sequenza di studio', 'Distribuzione per difficoltà', 'Storico delle attività recenti', 'Calendario personalizzato di studio', 'Insights sugli orari più produttivi']
            : ['Hit rate evolution', 'Number of interactions and study sequence', 'Distribution by difficulty', 'Recent activity history', 'Personalized study calendar', 'Most productive hours insights']
        },
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Infraestrutura em Nuvem com AWS' :
                 language === 'es' ? 'Infraestructura en la Nube con AWS' :
                 language === 'it' ? 'Infrastruttura Cloud con AWS' :
                 'Cloud Infrastructure with AWS',
          description: language === 'pt-BR'
            ? 'A plataforma foi projetada para operar com máxima performance e confiabilidade, utilizando a AWS (Amazon Web Services) — líder mundial em serviços de nuvem.\n\nToda a infraestrutura é automatizada e otimizada com as melhores ferramentas do mercado: Terraform e Ansible.\n\nEssa base sólida permite que a solução entregue desempenho de nível global, acompanhando as necessidades do cliente em qualquer escala.'
            : language === 'es'
            ? 'La plataforma fue diseñada para operar con máximo rendimiento y confiabilidad, utilizando AWS (Amazon Web Services) — líder mundial en servicios en la nube.\n\nToda la infraestructura está automatizada y optimizada con las mejores herramientas del mercado: Terraform y Ansible.\n\nEsta base sólida permite que la solución entregue un rendimiento de nivel global, acompañando las necesidades del cliente a cualquier escala.'
            : language === 'it'
            ? 'La piattaforma è stata progettata per operare con massime prestazioni e affidabilità, utilizzando AWS (Amazon Web Services) — leader mondiale nei servizi cloud.\n\nTutta l\'infrastruttura è automatizzata e ottimizzata con i migliori strumenti del mercato: Terraform e Ansible.\n\nQuesta solida base consente alla soluzione di fornire prestazioni a livello globale, soddisfacendo le esigenze del cliente su qualsiasi scala.'
            : 'The platform was designed to operate with maximum performance and reliability, using AWS (Amazon Web Services) — the global leader in cloud services.\n\nAll infrastructure is automated and optimized with the best tools on the market: Terraform and Ansible.\n\nThis solid foundation allows the solution to deliver global-level performance, meeting client needs at any scale.',
          imageUrl: '/img/projects/aws.svg',
          features: language === 'pt-BR'
            ? ['Escalabilidade sob demanda para acompanhar o crescimento da plataforma', 'Alta disponibilidade e segurança dos dados', 'Automação de deploys e configurações, reduzindo falhas humanas', 'Monitoramento e atualizações contínuas', 'Flexibilidade para integração de novos recursos e serviços']
            : language === 'es'
            ? ['Escalabilidad bajo demanda para acompañar el crecimiento de la plataforma', 'Alta disponibilidad y seguridad de los datos', 'Automatización de despliegues y configuraciones, reduciendo fallas humanas', 'Monitoreo y actualizaciones continuas', 'Flexibilidad para integración de nuevos recursos y servicios']
            : language === 'it'
            ? ['Scalabilità on-demand per accompagnare la crescita della piattaforma', 'Alta disponibilità e sicurezza dei dati', 'Automazione di deploy e configurazioni, riducendo errori umani', 'Monitoraggio e aggiornamenti continui', 'Flessibilità per l\'integrazione di nuove risorse e servizi']
            : ['On-demand scalability to keep up with platform growth', 'High availability and data security', 'Deployment and configuration automation, reducing human errors', 'Continuous monitoring and updates', 'Flexibility for integrating new features and services']
        },
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Qualidade, Confiabilidade e Integrações Inteligentes' :
                 language === 'es' ? 'Calidad, Confiabilidad e Integraciones Inteligentes' :
                 language === 'it' ? 'Qualità, Affidabilità e Integrazioni Intelligenti' :
                 'Quality, Reliability and Smart Integrations',
          description: language === 'pt-BR'
            ? 'Este projeto foi desenvolvido seguindo as melhores práticas de código, com mais de 5.000 testes automatizados garantindo estabilidade e segurança em cada atualização.\n\nO sistema também conta com integrações estratégicas que ampliam o valor da plataforma.\n\nUma solução robusta e escalável, unindo tecnologia avançada, automação e praticidade para alunos, professores e administradores.'
            : language === 'es'
            ? 'Este proyecto fue desarrollado siguiendo las mejores prácticas de código, con más de 5.000 pruebas automatizadas garantizando estabilidad y seguridad en cada actualización.\n\nEl sistema también cuenta con integraciones estratégicas que amplían el valor de la plataforma.\n\nUna solución robusta y escalable, uniendo tecnología avanzada, automatización y practicidad para estudiantes, profesores y administradores.'
            : language === 'it'
            ? 'Questo progetto è stato sviluppato seguendo le migliori pratiche di codifica, con oltre 5.000 test automatizzati che garantiscono stabilità e sicurezza ad ogni aggiornamento.\n\nIl sistema dispone anche di integrazioni strategiche che ampliano il valore della piattaforma.\n\nUna soluzione robusta e scalabile, che unisce tecnologia avanzata, automazione e praticità per studenti, insegnanti e amministratori.'
            : 'This project was developed following code best practices, with over 5,000 automated tests ensuring stability and security with every update.\n\nThe system also features strategic integrations that extend the platform\'s value.\n\nA robust and scalable solution, combining advanced technology, automation and practicality for students, teachers and administrators.',
          imageUrl: '/images/quality-shield.svg',
          features: language === 'pt-BR'
            ? ['Zoom – gestão completa das aulas ao vivo diretamente pela plataforma', 'Hotmart – integração nativa que automatiza o processo de vendas', 'Gestão de Compras e Acessos – estatísticas de vendas e controle de inscrições']
            : language === 'es'
            ? ['Zoom – gestión completa de clases en vivo directamente desde la plataforma', 'Hotmart – integración nativa que automatiza el proceso de ventas', 'Gestión de Compras y Accesos – estadísticas de ventas y control de inscripciones']
            : language === 'it'
            ? ['Zoom – gestione completa delle lezioni dal vivo direttamente dalla piattaforma', 'Hotmart – integrazione nativa che automatizza il processo di vendita', 'Gestione Acquisti e Accessi – statistiche di vendita e controllo iscrizioni']
            : ['Zoom – complete management of live classes directly from the platform', 'Hotmart – native integration that automates the sales process', 'Purchase and Access Management – sales statistics and enrollment control']
        }
      ]
    },
    {
      id: '2',
      title: language === 'pt-BR' ? 'Site de Consultoria' :
              language === 'es' ? 'Sitio de Consultoría' :
              language === 'it' ? 'Sito di Consulenza' :
              'Consulting Website',
      description: language === 'pt-BR' ? 'Plataforma digital completa para consultora internacional em Access Consciousness' :
                   language === 'es' ? 'Plataforma digital completa para consultora internacional en Access Consciousness' :
                   language === 'it' ? 'Piattaforma digitale completa per consulente internazionale di Access Consciousness' :
                   'Complete digital platform for international Access Consciousness consultant',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Sanity CMS', 'PostgreSQL', 'GSAP', 'i18n'],
      imageUrl: '/img/projects/manon1.png',
      liveUrl: 'https://manoruivo.com',
      category: 'website',
      slides: [
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Site de Consultoria - Manon Ruivo' :
                 language === 'es' ? 'Sitio de Consultoría - Manon Ruivo' :
                 language === 'it' ? 'Sito di Consulenza - Manon Ruivo' :
                 'Consulting Website - Manon Ruivo',
          description: language === 'pt-BR'
            ? 'Desenvolvemos uma plataforma digital completa e moderna para Manon Ruivo, consultora internacional em Access Consciousness.\n\nA solução entrega uma experiência imersiva com design responsivo, trilíngue (PT/ES/EN), permitindo que a consultora alcance clientes globalmente.'
            : language === 'es'
            ? 'Desarrollamos una plataforma digital completa y moderna para Manon Ruivo, consultora internacional en Access Consciousness.\n\nLa solución ofrece una experiencia inmersiva con diseño responsivo, trilingüe (PT/ES/EN), permitiendo que la consultora alcance clientes globalmente.'
            : language === 'it'
            ? 'Abbiamo sviluppato una piattaforma digitale completa e moderna per Manon Ruivo, consulente internazionale di Access Consciousness.\n\nLa soluzione offre un\'esperienza immersiva con design responsive, trilingue (PT/ES/EN), permettendo alla consulente di raggiungere clienti a livello globale.'
            : 'We developed a complete and modern digital platform for Manon Ruivo, international Access Consciousness consultant.\n\nThe solution delivers an immersive experience with responsive design, trilingual (PT/ES/EN), allowing the consultant to reach clients globally.',
          imageUrl: '/img/projects/manon1.png',
          features: language === 'pt-BR'
            ? ['Interface trilíngue com suporte nativo para PT/ES/EN', 'Hero section com slider interativo de imagens', 'Seções especializadas para diferentes públicos', 'Depoimentos dinâmicos com vídeo e texto', 'Design responsivo e acessível']
            : language === 'es'
            ? ['Interfaz trilingüe con soporte nativo para PT/ES/EN', 'Hero section con slider interactivo de imágenes', 'Secciones especializadas para diferentes públicos', 'Testimonios dinámicos con video y texto', 'Diseño responsivo y accesible']
            : language === 'it'
            ? ['Interfaccia trilingue con supporto nativo per PT/ES/EN', 'Hero section con slider interattivo di immagini', 'Sezioni specializzate per diversi pubblici', 'Testimonianze dinamiche con video e testo', 'Design responsive e accessibile']
            : ['Trilingual interface with native support for PT/ES/EN', 'Hero section with interactive image slider', 'Specialized sections for different audiences', 'Dynamic testimonials with video and text', 'Responsive and accessible design']
        },
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Gestão de Conteúdo com Sanity CMS' :
                 language === 'es' ? 'Gestión de Contenido con Sanity CMS' :
                 language === 'it' ? 'Gestione Contenuti con Sanity CMS' :
                 'Content Management with Sanity CMS',
          description: language === 'pt-BR'
            ? 'Implementamos o Sanity como CMS headless, permitindo que o cliente gerencie o conteúdo da página de blog de forma autônoma.\n\nO sistema de blog integrado possibilita a criação de artigos, categorias e autores, fortalecendo a estratégia de marketing de conteúdo.\n\nInterface administrativa intuitiva com preview em tempo real das alterações antes da publicação.'
            : language === 'es'
            ? 'Implementamos Sanity como CMS headless, permitiendo que el cliente gestione el contenido de la página del blog de forma autónoma.\n\nEl sistema de blog integrado posibilita la creación de artículos, categorías y autores, fortaleciendo la estrategia de marketing de contenidos.\n\nInterfaz administrativa intuitiva con vista previa en tiempo real de los cambios antes de la publicación.'
            : language === 'it'
            ? 'Abbiamo implementato Sanity come CMS headless, permettendo al cliente di gestire autonomamente i contenuti della pagina del blog.\n\nIl sistema di blog integrato consente la creazione di articoli, categorie e autori, rafforzando la strategia di content marketing.\n\nInterfaccia amministrativa intuitiva con anteprima in tempo reale delle modifiche prima della pubblicazione.'
            : 'We implemented Sanity as a headless CMS, allowing the client to manage blog page content autonomously.\n\nThe integrated blog system enables the creation of articles, categories and authors, strengthening the content marketing strategy.\n\nIntuitive administrative interface with real-time preview of changes before publication.',
          imageUrl: '/img/projects/manon2.png',
          features: language === 'pt-BR'
            ? ['Painel administrativo personalizado no /studio', 'Sistema de blog com categorias e tags', 'Upload e gestão de imagens otimizadas', 'Preview em tempo real das alterações', 'Versionamento automático de conteúdo']
            : language === 'es'
            ? ['Panel administrativo personalizado en /studio', 'Sistema de blog con categorías y etiquetas', 'Carga y gestión de imágenes optimizadas', 'Vista previa en tiempo real de los cambios', 'Versionado automático de contenido']
            : language === 'it'
            ? ['Pannello amministrativo personalizzato su /studio', 'Sistema blog con categorie e tag', 'Upload e gestione di immagini ottimizzate', 'Anteprima in tempo reale delle modifiche', 'Versioning automatico dei contenuti']
            : ['Custom admin panel at /studio', 'Blog system with categories and tags', 'Upload and management of optimized images', 'Real-time preview of changes', 'Automatic content versioning']
        }
      ]
    },
    {
      id: '3',
      title: language === 'pt-BR' ? 'Site de Salão de Beleza' :
              language === 'es' ? 'Sitio de Salón de Belleza' :
              language === 'it' ? 'Sito Salone di Bellezza' :
              'Beauty Salon Website',
      description: language === 'pt-BR' ? 'Landing page moderna com e-commerce de gift cards integrado' :
                   language === 'es' ? 'Landing page moderna con e-commerce de tarjetas regalo integrado' :
                   language === 'it' ? 'Landing page moderna con e-commerce di gift card integrato' :
                   'Modern landing page with integrated gift card e-commerce',
      technologies: ['Next.js', 'GSAP', 'Firebase', 'Square'],
      imageUrl: '/img/projects/flavia1.png',
      liveUrl: 'https://example.com',
      category: 'website',
      slides: [
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Landing Page de Salão de Beleza' :
                 language === 'es' ? 'Landing Page de Salón de Belleza' :
                 language === 'it' ? 'Landing Page Salone di Bellezza' :
                 'Beauty Salon Landing Page',
          description: language === 'pt-BR'
            ? 'Desenvolvemos uma landing page elegante e funcional para um salão de beleza de alto padrão.\n\nA plataforma apresenta seções interativas que destacam os serviços oferecidos e um portfólio visual impressionante dos trabalhos realizados.\n\nO grande diferencial é o sistema de venda de gift cards online, totalmente integrado com o Square para processamento seguro de pagamentos.\n\nInclui também um painel administrativo exclusivo onde o proprietário pode acompanhar as vendas em tempo real, gerenciar pedidos e visualizar relatórios detalhados.'
            : language === 'es'
            ? 'Desarrollamos una landing page elegante y funcional para un salón de belleza de alto estándar.\n\nLa plataforma presenta secciones interactivas que destacan los servicios ofrecidos y un portafolio visual impresionante de los trabajos realizados.\n\nEl gran diferencial es el sistema de venta de tarjetas regalo en línea, totalmente integrado con Square para el procesamiento seguro de pagos.\n\nTambién incluye un panel administrativo exclusivo donde el propietario puede seguir las ventas en tiempo real, gestionar pedidos y ver informes detallados.'
            : language === 'it'
            ? 'Abbiamo sviluppato una landing page elegante e funzionale per un salone di bellezza di alto livello.\n\nLa piattaforma presenta sezioni interattive che evidenziano i servizi offerti e un portfolio visivo impressionante dei lavori realizzati.\n\nIl grande differenziale è il sistema di vendita di gift card online, completamente integrato con Square per l\'elaborazione sicura dei pagamenti.\n\nInclude anche un pannello amministrativo esclusivo dove il proprietario può seguire le vendite in tempo reale, gestire gli ordini e visualizzare report dettagliati.'
            : 'We developed an elegant and functional landing page for a high-end beauty salon.\n\nThe platform features interactive sections that highlight the services offered and an impressive visual portfolio of completed work.\n\nThe major differentiator is the online gift card sales system, fully integrated with Square for secure payment processing.\n\nIt also includes an exclusive admin panel where the owner can track sales in real-time, manage orders and view detailed reports.',
          imageUrl: '/img/projects/flavia1.png',
          features: language === 'pt-BR'
            ? ['Seções interativas de serviços', 'Portfólio visual de trabalhos', 'Sistema de venda de gift cards', 'Integração com Square para pagamentos', 'Painel administrativo em tempo real']
            : language === 'es'
            ? ['Secciones interactivas de servicios', 'Portafolio visual de trabajos', 'Sistema de venta de tarjetas regalo', 'Integración con Square para pagos', 'Panel administrativo en tiempo real']
            : language === 'it'
            ? ['Sezioni interattive dei servizi', 'Portfolio visivo dei lavori', 'Sistema di vendita gift card', 'Integrazione con Square per pagamenti', 'Pannello amministrativo in tempo reale']
            : ['Interactive service sections', 'Visual portfolio of work', 'Gift card sales system', 'Square payment integration', 'Real-time admin panel']
        }
      ]
    },
    {
      id: '4',
      title: language === 'pt-BR' ? 'Kundalini Activation' :
              language === 'es' ? 'Activación Kundalini' :
              language === 'it' ? 'Attivazione Kundalini' :
              'Kundalini Activation',
      description: language === 'pt-BR' ? 'Plataforma de agendamento e apresentação de sessões de Kundalini' :
                   language === 'es' ? 'Plataforma de programación y presentación de sesiones de Kundalini' :
                   language === 'it' ? 'Piattaforma di prenotazione e presentazione di sessioni Kundalini' :
                   'Kundalini session scheduling and presentation platform',
      technologies: ['Next.js', 'Tailwind CSS', 'GSAP'],
      imageUrl: '/img/projects/elaine1.png',
      liveUrl: 'https://kundaliniactivation.com',
      category: 'website',
      slides: [
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Kundalini Activation by Elaine Vieira' :
                 language === 'es' ? 'Activación Kundalini por Elaine Vieira' :
                 language === 'it' ? 'Attivazione Kundalini di Elaine Vieira' :
                 'Kundalini Activation by Elaine Vieira',
          description: language === 'pt-BR'
            ? 'Desenvolvemos uma plataforma completa para Elaine Vieira, especialista em ativação de Kundalini e harmonização energética.\n\nO site oferece uma jornada transformadora onde energia, cura e conexão se fundem. As sessões presenciais de Ativação Kundalini são projetadas para despertar o poder interior, liberar bloqueios emocionais e reconectar com o eu superior.\n\nA plataforma inclui sistema de agendamento para sessões presenciais e online, galeria de fotos inspiradoras, depoimentos em vídeo e texto, e seção de FAQ completa.\n\nInterface otimizada para conversão com múltiplas CTAs estratégicas, informações sobre locais dos eventos (Fort Lauderdale e Orlando), e diferentes opções de experiência Kundalini.'
            : language === 'es'
            ? 'Desarrollamos una plataforma completa para Elaine Vieira, especialista en activación de Kundalini y armonización energética.\n\nEl sitio ofrece un viaje transformador donde la energía, la sanación y la conexión se fusionan. Las sesiones presenciales de Activación Kundalini están diseñadas para despertar el poder interior, liberar bloqueos emocionales y reconectar con el yo superior.\n\nLa plataforma incluye sistema de programación para sesiones presenciales y en línea, galería de fotos inspiradoras, testimonios en video y texto, y sección completa de preguntas frecuentes.\n\nInterfaz optimizada para conversión con múltiples CTAs estratégicos, información sobre ubicaciones de eventos (Fort Lauderdale y Orlando), y diferentes opciones de experiencia Kundalini.'
            : language === 'it'
            ? 'Abbiamo sviluppato una piattaforma completa per Elaine Vieira, specialista in attivazione Kundalini e armonizzazione energetica.\n\nIl sito offre un viaggio trasformativo dove energia, guarigione e connessione si fondono. Le sessioni in presenza di Attivazione Kundalini sono progettate per risvegliare il potere interiore, rilasciare blocchi emotivi e riconnettersi con il sé superiore.\n\nLa piattaforma include sistema di prenotazione per sessioni in presenza e online, galleria di foto ispiratrici, testimonianze video e testuali, e sezione FAQ completa.\n\nInterfaccia ottimizzata per la conversione con molteplici CTA strategiche, informazioni sulle location degli eventi (Fort Lauderdale e Orlando), e diverse opzioni di esperienza Kundalini.'
            : 'We developed a complete platform for Elaine Vieira, a specialist in Kundalini activation and energy harmonization.\n\nThe site offers a transformative journey where energy, healing, and connection merge. The in-person Kundalini Activation sessions are designed to awaken inner power, release emotional blockages, and reconnect with the higher self.\n\nThe platform includes a booking system for in-person and online sessions, inspiring photo gallery, video and text testimonials, and comprehensive FAQ section.\n\nConversion-optimized interface with multiple strategic CTAs, event location information (Fort Lauderdale and Orlando), and different Kundalini experience options.',
          imageUrl: '/img/projects/elaine1.png',
          features: language === 'pt-BR'
            ? ['Sistema de agendamento de sessões', 'Galeria de fotos de alta resolução', 'Depoimentos em vídeo e texto', 'Seção de perguntas frequentes', 'Informações de locais e eventos', 'Design responsivo e espiritual']
            : language === 'es'
            ? ['Sistema de programación de sesiones', 'Galería de fotos de alta resolución', 'Testimonios en video y texto', 'Sección de preguntas frecuentes', 'Información de ubicaciones y eventos', 'Diseño responsivo y espiritual']
            : language === 'it'
            ? ['Sistema di prenotazione sessioni', 'Galleria foto ad alta risoluzione', 'Testimonianze video e testuali', 'Sezione domande frequenti', 'Informazioni su location ed eventi', 'Design responsive e spirituale']
            : ['Session booking system', 'High-resolution photo gallery', 'Video and text testimonials', 'Frequently asked questions section', 'Location and event information', 'Responsive and spiritual design']
        },
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Páginas e Funcionalidades' : language === 'es' ? 'Páginas y Funcionalidades' : language === 'it' ? 'Pagine e Funzionalità' : 'Pages and Features',
          description: language === 'pt-BR'
            ? 'Conjunto completo de páginas institucionais com sistema de blog integrado, formulários de contato e área de cliente.'
            : language === 'es'
            ? 'Conjunto completo de páginas institucionales con sistema de blog integrado, formularios de contacto y área de cliente.'
            : language === 'it'
            ? 'Set completo di pagine istituzionali con sistema blog integrato, moduli di contatto e area cliente.'
            : 'Complete set of institutional pages with integrated blog system, contact forms and client area.',
          imageUrl: '/images/corporate-pages.jpg',
          features: language === 'pt-BR'
            ? ['Sistema de blog', 'Formulários dinâmicos', 'Galeria de mídia', 'Integração social', 'Newsletter']
            : language === 'es'
            ? ['Sistema de blog', 'Formularios dinámicos', 'Galería de medios', 'Integración social', 'Newsletter']
            : language === 'it'
            ? ['Sistema blog', 'Moduli dinamici', 'Galleria media', 'Integrazione social', 'Newsletter']
            : ['Blog system', 'Dynamic forms', 'Media gallery', 'Social integration', 'Newsletter']
        },
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Otimização e Performance' : language === 'es' ? 'Optimización y Rendimiento' : language === 'it' ? 'Ottimizzazione e Prestazioni' : 'Optimization and Performance',
          description: language === 'pt-BR'
            ? 'Site otimizado para máxima performance com carregamento ultrarrápido, CDN global e cache inteligente.'
            : language === 'es'
            ? 'Sitio optimizado para máximo rendimiento con carga ultrarrápida, CDN global y caché inteligente.'
            : language === 'it'
            ? 'Sito ottimizzato per massime prestazioni con caricamento ultrarapido, CDN globale e cache intelligente.'
            : 'Site optimized for maximum performance with ultra-fast loading, global CDN and smart caching.',
          imageUrl: '/images/corporate-performance.jpg',
          features: language === 'pt-BR'
            ? ['Score 100 no Lighthouse', 'Tempo de carregamento < 1s', 'Imagens otimizadas', 'Lazy loading', 'Compressão Brotli']
            : language === 'es'
            ? ['Puntuación 100 en Lighthouse', 'Tiempo de carga < 1s', 'Imágenes optimizadas', 'Lazy loading', 'Compresión Brotli']
            : language === 'it'
            ? ['Punteggio 100 su Lighthouse', 'Tempo di caricamento < 1s', 'Immagini ottimizzate', 'Lazy loading', 'Compressione Brotli']
            : ['Lighthouse score 100', 'Load time < 1s', 'Optimized images', 'Lazy loading', 'Brotli compression']
        }
      ]
    },
    {
      id: '5',
      title: language === 'pt-BR' ? 'Salão Loha' :
              language === 'es' ? 'Salón Loha' :
              language === 'it' ? 'Salone Loha' :
              'Loha Beauty Salon',
      description: language === 'pt-BR' ? 'Website institucional para salão de beleza com design elegante' :
                   language === 'es' ? 'Sitio web institucional para salón de belleza con diseño elegante' :
                   language === 'it' ? 'Sito web istituzionale per salone di bellezza con design elegante' :
                   'Institutional website for beauty salon with elegant design',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      imageUrl: '/img/projects/loha1.png',
      liveUrl: 'https://salaololha.com.br',
      category: 'website',
      slides: [
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Salão Loha - Estética e Beleza' :
                 language === 'es' ? 'Salón Loha - Estética y Belleza' :
                 language === 'it' ? 'Salone Loha - Estetica e Bellezza' :
                 'Loha Salon - Aesthetics and Beauty',
          description: language === 'pt-BR'
            ? 'Desenvolvemos um website institucional moderno e elegante para o Salão Loha, focado em transmitir a atmosfera acolhedora e profissional do estabelecimento.\n\nO site apresenta uma experiência visual envolvente com seções que destacam os serviços oferecidos: cabeleireiro, manicure, terapia capilar e depilação.\n\nA galeria de fotos permite aos visitantes conhecerem o espaço e os trabalhos realizados, enquanto a seção de portfólio exibe transformações inspiradoras.\n\nDestaque especial para a sala de esterilização, demonstrando o compromisso com higiene e segurança, utilizando autoclave para garantir um ambiente seguro para todos os clientes.'
            : language === 'es'
            ? 'Desarrollamos un sitio web institucional moderno y elegante para el Salón Loha, enfocado en transmitir la atmósfera acogedora y profesional del establecimiento.\n\nEl sitio presenta una experiencia visual envolvente con secciones que destacan los servicios ofrecidos: peluquería, manicura, terapia capilar y depilación.\n\nLa galería de fotos permite a los visitantes conocer el espacio y los trabajos realizados, mientras que la sección de portafolio muestra transformaciones inspiradoras.\n\nDestaque especial para la sala de esterilización, demostrando el compromiso con la higiene y seguridad, utilizando autoclave para garantizar un ambiente seguro para todos los clientes.'
            : language === 'it'
            ? 'Abbiamo sviluppato un sito web istituzionale moderno ed elegante per il Salone Loha, focalizzato nel trasmettere l\'atmosfera accogliente e professionale dello stabilimento.\n\nIl sito presenta un\'esperienza visiva coinvolgente con sezioni che evidenziano i servizi offerti: parrucchiere, manicure, terapia capillare e depilazione.\n\nLa galleria fotografica permette ai visitatori di conoscere lo spazio e i lavori realizzati, mentre la sezione portfolio mostra trasformazioni ispiratrici.\n\nRilievo speciale per la sala di sterilizzazione, dimostrando l\'impegno per l\'igiene e la sicurezza, utilizzando l\'autoclave per garantire un ambiente sicuro per tutti i clienti.'
            : 'We developed a modern and elegant institutional website for Loha Salon, focused on conveying the welcoming and professional atmosphere of the establishment.\n\nThe site features an engaging visual experience with sections highlighting the services offered: hairdressing, manicure, hair therapy and waxing.\n\nThe photo gallery allows visitors to get to know the space and work performed, while the portfolio section showcases inspiring transformations.\n\nSpecial highlight for the sterilization room, demonstrating commitment to hygiene and safety, using autoclave to ensure a safe environment for all clients.',
          imageUrl: '/img/projects/loha1.png',
          features: language === 'pt-BR'
            ? ['Design responsivo e elegante', 'Galeria de fotos interativa', 'Seção de serviços detalhada', 'Portfólio de transformações', 'Informações sobre esterilização', 'Localização e contato']
            : language === 'es'
            ? ['Diseño responsivo y elegante', 'Galería de fotos interactiva', 'Sección de servicios detallada', 'Portafolio de transformaciones', 'Información sobre esterilización', 'Ubicación y contacto']
            : language === 'it'
            ? ['Design responsive ed elegante', 'Galleria fotografica interattiva', 'Sezione servizi dettagliata', 'Portfolio di trasformazioni', 'Informazioni sulla sterilizzazione', 'Posizione e contatto']
            : ['Responsive and elegant design', 'Interactive photo gallery', 'Detailed services section', 'Transformation portfolio', 'Sterilization information', 'Location and contact']
        }
      ]
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
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent z-10"></div>
                      {/* Use project image if available */}
                      {project.imageUrl ? (
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <div className="relative w-full h-full max-w-[90%] max-h-[90%] rounded-lg border-2 border-custom-purple/40 overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-300">
                            <Image
                              src={project.imageUrl}
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
                              className="object-cover"
                              priority={project.id === '1' || project.id === '2'}
                              quality={85}
                            />
                            {/* Purple overlay that disappears on hover */}
                            <div className="absolute inset-0 bg-custom-purple/40 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-300"></div>
                          </div>
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                            {project.category === 'website' && '🌐'}
                            {project.category === 'automation' && '⚙️'}
                            {project.category === 'ai' && '🤖'}
                            {project.category === 'ecommerce' && '🛒'}
                            {project.category === 'education' && '🎓'}
                          </span>
                        </div>
                      )}
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