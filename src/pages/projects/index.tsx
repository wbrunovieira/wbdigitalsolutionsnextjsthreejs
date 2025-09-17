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
          viewProject: 'Learn More',
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
      imageUrl: '/images/projects/project1.jpg',
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
      title: language === 'pt-BR' ? 'Sistema de Chatbot IA' :
              language === 'es' ? 'Sistema de Chatbot IA' :
              language === 'it' ? 'Sistema Chatbot IA' :
              'AI Chatbot System',
      description: language === 'pt-BR' ? 'Sistema inteligente de suporte ao cliente com processamento de linguagem natural' :
                   language === 'es' ? 'Sistema inteligente de soporte al cliente con procesamiento de lenguaje natural' :
                   language === 'it' ? 'Sistema intelligente di supporto clienti con elaborazione del linguaggio naturale' :
                   'Intelligent customer support system with natural language processing',
      technologies: ['Python', 'FastAPI', 'OpenAI', 'React'],
      imageUrl: '/images/projects/project2.jpg',
      liveUrl: 'https://example.com',
      category: 'ai',
      slides: [
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Visão Geral' : language === 'es' ? 'Visión General' : language === 'it' ? 'Panoramica' : 'Overview',
          description: language === 'pt-BR'
            ? 'Sistema avançado de chatbot com IA para atendimento ao cliente 24/7. Utiliza processamento de linguagem natural para compreender e responder perguntas complexas.'
            : language === 'es'
            ? 'Sistema avanzado de chatbot con IA para atención al cliente 24/7. Utiliza procesamiento de lenguaje natural para comprender y responder preguntas complejas.'
            : language === 'it'
            ? 'Sistema avanzato di chatbot con IA per assistenza clienti 24/7. Utilizza l\'elaborazione del linguaggio naturale per comprendere e rispondere a domande complesse.'
            : 'Advanced AI chatbot system for 24/7 customer support. Uses natural language processing to understand and respond to complex questions.',
          imageUrl: '/images/ai-overview.jpg',
          features: language === 'pt-BR'
            ? ['Atendimento 24/7', 'Múltiplos idiomas', 'Integração com CRM', 'Análise de sentimento', 'Aprendizado contínuo']
            : language === 'es'
            ? ['Atención 24/7', 'Múltiples idiomas', 'Integración con CRM', 'Análisis de sentimiento', 'Aprendizaje continuo']
            : language === 'it'
            ? ['Assistenza 24/7', 'Multilingue', 'Integrazione CRM', 'Analisi del sentiment', 'Apprendimento continuo']
            : ['24/7 support', 'Multiple languages', 'CRM integration', 'Sentiment analysis', 'Continuous learning']
        },
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Interface de Conversação' : language === 'es' ? 'Interfaz de Conversación' : language === 'it' ? 'Interfaccia di Conversazione' : 'Conversation Interface',
          description: language === 'pt-BR'
            ? 'Interface moderna e intuitiva para conversação com suporte a texto, voz e imagens. Design responsivo para todos os dispositivos.'
            : language === 'es'
            ? 'Interfaz moderna e intuitiva para conversación con soporte de texto, voz e imágenes. Diseño responsivo para todos los dispositivos.'
            : language === 'it'
            ? 'Interfaccia moderna e intuitiva per la conversazione con supporto per testo, voce e immagini. Design responsive per tutti i dispositivi.'
            : 'Modern and intuitive conversation interface with support for text, voice and images. Responsive design for all devices.',
          imageUrl: '/images/chat-interface.jpg',
          features: language === 'pt-BR'
            ? ['Chat em tempo real', 'Suporte a voz', 'Compartilhamento de arquivos', 'Histórico de conversas', 'Indicadores de digitação']
            : language === 'es'
            ? ['Chat en tiempo real', 'Soporte de voz', 'Compartir archivos', 'Historial de conversaciones', 'Indicadores de escritura']
            : language === 'it'
            ? ['Chat in tempo reale', 'Supporto vocale', 'Condivisione file', 'Cronologia conversazioni', 'Indicatori di digitazione']
            : ['Real-time chat', 'Voice support', 'File sharing', 'Conversation history', 'Typing indicators']
        }
      ]
    },
    {
      id: '3',
      title: language === 'pt-BR' ? 'Automação de Processos' :
              language === 'es' ? 'Automatización de Procesos' :
              language === 'it' ? 'Automazione dei Processi' :
              'Process Automation',
      description: language === 'pt-BR' ? 'Solução completa de automação de processos empresariais' :
                   language === 'es' ? 'Solución completa de automatización de procesos empresariales' :
                   language === 'it' ? 'Soluzione completa per l\'automazione dei processi aziendali' :
                   'Complete business process automation solution',
      technologies: ['Node.js', 'Docker', 'PostgreSQL', 'Redis'],
      imageUrl: '/images/projects/project3.jpg',
      githubUrl: 'https://github.com/example',
      category: 'automation',
      slides: [
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Visão Geral' : language === 'es' ? 'Visión General' : language === 'it' ? 'Panoramica' : 'Overview',
          description: language === 'pt-BR'
            ? 'Plataforma robusta de automação que otimiza processos empresariais, reduzindo custos operacionais e aumentando a eficiência.'
            : language === 'es'
            ? 'Plataforma robusta de automatización que optimiza procesos empresariales, reduciendo costos operativos y aumentando la eficiencia.'
            : language === 'it'
            ? 'Piattaforma robusta di automazione che ottimizza i processi aziendali, riducendo i costi operativi e aumentando l\'efficienza.'
            : 'Robust automation platform that optimizes business processes, reducing operational costs and increasing efficiency.',
          imageUrl: '/images/automation-overview.jpg',
          features: language === 'pt-BR'
            ? ['Workflows personalizados', 'Integração com APIs', 'Monitoramento em tempo real', 'Relatórios detalhados', 'Escalabilidade automática']
            : language === 'es'
            ? ['Flujos de trabajo personalizados', 'Integración con APIs', 'Monitoreo en tiempo real', 'Informes detallados', 'Escalabilidad automática']
            : language === 'it'
            ? ['Workflow personalizzati', 'Integrazione API', 'Monitoraggio in tempo reale', 'Report dettagliati', 'Scalabilità automatica']
            : ['Custom workflows', 'API integration', 'Real-time monitoring', 'Detailed reports', 'Automatic scaling']
        },
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Dashboard de Controle' : language === 'es' ? 'Panel de Control' : language === 'it' ? 'Pannello di Controllo' : 'Control Dashboard',
          description: language === 'pt-BR'
            ? 'Painel centralizado para gerenciamento e monitoramento de todos os processos automatizados, com métricas em tempo real.'
            : language === 'es'
            ? 'Panel centralizado para gestión y monitoreo de todos los procesos automatizados, con métricas en tiempo real.'
            : language === 'it'
            ? 'Pannello centralizzato per la gestione e il monitoraggio di tutti i processi automatizzati, con metriche in tempo reale.'
            : 'Centralized panel for management and monitoring of all automated processes, with real-time metrics.',
          imageUrl: '/images/automation-dashboard.jpg',
          features: language === 'pt-BR'
            ? ['Visualização em tempo real', 'Alertas inteligentes', 'Logs detalhados', 'Controle de acesso', 'Exportação de dados']
            : language === 'es'
            ? ['Visualización en tiempo real', 'Alertas inteligentes', 'Registros detallados', 'Control de acceso', 'Exportación de datos']
            : language === 'it'
            ? ['Visualizzazione in tempo reale', 'Avvisi intelligenti', 'Log dettagliati', 'Controllo accessi', 'Esportazione dati']
            : ['Real-time visualization', 'Smart alerts', 'Detailed logs', 'Access control', 'Data export']
        }
      ]
    },
    {
      id: '4',
      title: language === 'pt-BR' ? 'Site Corporativo' :
              language === 'es' ? 'Sitio Corporativo' :
              language === 'it' ? 'Sito Aziendale' :
              'Corporate Website',
      description: language === 'pt-BR' ? 'Site institucional moderno com design responsivo e otimizado para SEO' :
                   language === 'es' ? 'Sitio institucional moderno con diseño responsivo y optimizado para SEO' :
                   language === 'it' ? 'Sito istituzionale moderno con design responsive e ottimizzato per SEO' :
                   'Modern institutional website with responsive design and SEO optimization',
      technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      imageUrl: '/images/projects/project4.jpg',
      liveUrl: 'https://example.com',
      category: 'website',
      slides: [
        {
          type: 'mixed',
          title: language === 'pt-BR' ? 'Visão Geral' : language === 'es' ? 'Visión General' : language === 'it' ? 'Panoramica' : 'Overview',
          description: language === 'pt-BR'
            ? 'Site corporativo moderno desenvolvido com as últimas tecnologias web. Design elegante, performance otimizada e totalmente responsivo.'
            : language === 'es'
            ? 'Sitio corporativo moderno desarrollado con las últimas tecnologías web. Diseño elegante, rendimiento optimizado y totalmente responsivo.'
            : language === 'it'
            ? 'Sito aziendale moderno sviluppato con le ultime tecnologie web. Design elegante, prestazioni ottimizzate e completamente responsive.'
            : 'Modern corporate website developed with the latest web technologies. Elegant design, optimized performance and fully responsive.',
          imageUrl: '/images/corporate-overview.jpg',
          features: language === 'pt-BR'
            ? ['Design responsivo', 'SEO otimizado', 'Performance A+', 'Acessibilidade WCAG', 'Analytics integrado']
            : language === 'es'
            ? ['Diseño responsivo', 'SEO optimizado', 'Rendimiento A+', 'Accesibilidad WCAG', 'Analytics integrado']
            : language === 'it'
            ? ['Design responsive', 'SEO ottimizzato', 'Performance A+', 'Accessibilità WCAG', 'Analytics integrato']
            : ['Responsive design', 'SEO optimized', 'A+ Performance', 'WCAG accessibility', 'Integrated analytics']
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
                      {/* Use optimized image for education category, emoji fallback for others */}
                      {project.category === 'education' ? (
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <div className="relative w-full h-full max-w-[90%] max-h-[90%] rounded-lg border-2 border-custom-purple/40 overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-300">
                            <Image
                              src="/img/projects/revalida1.png"
                              alt={project.title}
                              fill
                              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
                              className="object-cover"
                              priority={project.id === '1'}
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