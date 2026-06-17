// Rich, NON-CONFIDENTIAL detail content for individual project pages, keyed by
// slug then language. Capability-level only (no business rules, data or secrets).

export interface DetailFeature {
  icon: string;
  title: string;
  description: string;
}

export interface DetailStat {
  value: string;
  label: string;
}

export interface ProjectDetailContent {
  featuresTitle: string;
  features: DetailFeature[];
  highlightsTitle: string;
  highlights: string[];
  stats: DetailStat[];
}

const STATS_VALUES = ['12', '86', '630+', '3'];

const revalida: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que a plataforma faz',
    features: [
      { icon: '🎓', title: 'Cursos e trilhas', description: 'Trilhas, cursos, módulos e aulas organizados, com liberação programada de conteúdo.' },
      { icon: '🎬', title: 'Aulas em vídeo', description: 'Player com acompanhamento de progresso, materiais e áudios complementares.' },
      { icon: '📝', title: 'Simulados e avaliações', description: 'Provas e quizzes com banco de questões, tentativas e correção automática.' },
      { icon: '⚡', title: 'Flashcards inteligentes', description: 'Memorização ativa com tags, interações e acompanhamento de desempenho.' },
      { icon: '🧠', title: 'Anatomia em 3D', description: 'Ambientes 3D interativos (esqueleto e corpo humano) para estudo imersivo.' },
      { icon: '💬', title: 'Comunidade', description: 'Feed social com posts, comentários, reações e moderação de conteúdo.' },
      { icon: '🔴', title: 'Sessões ao vivo', description: 'Aulas via Zoom iniciadas dentro da plataforma, com proteção de links e gravação publicada automaticamente.' },
      { icon: '📜', title: 'Certificados verificáveis', description: 'Emissão automática de certificados em PDF com verificação pública.' },
      { icon: '🔒', title: 'Documentos protegidos', description: 'O admin publica materiais abertos (download) ou protegidos, que abrem só num leitor de PDF próprio na página do aluno — sem download e com registro de acessos.' },
    ],
    highlightsTitle: 'Engenharia por trás',
    highlights: [
      'Arquitetura modular orientada a domínio (DDD), com 12 módulos de negócio bem separados.',
      'Mais de 600 suítes de testes automatizados garantindo estabilidade a cada release.',
      'Processamento assíncrono com filas (BullMQ) e cache de alto desempenho com Redis.',
      'Pipeline de gravação automatizado: ao encerrar a aula no Zoom, a gravação é capturada via API, enviada ao Panda Video e publicada na plataforma — sem intervenção manual e sem expor links.',
      'Observabilidade completa com OpenTelemetry e rastreamento distribuído.',
      'Infraestrutura AWS (S3, CloudFront) provisionada como código com Terraform e Ansible.',
      'Segurança por padrão: autenticação JWT com refresh tokens, rate limiting e headers de proteção.',
      'Conteúdo totalmente multilíngue, com traduções em cada nível (trilha, curso, aula, questão).',
    ],
    stats: [
      { value: STATS_VALUES[0], label: 'Módulos de domínio' },
      { value: STATS_VALUES[1], label: 'Modelos de dados' },
      { value: STATS_VALUES[2], label: 'Arquivos de teste' },
      { value: STATS_VALUES[3], label: 'Idiomas' },
    ],
  },
  en: {
    featuresTitle: 'What the platform does',
    features: [
      { icon: '🎓', title: 'Courses & tracks', description: 'Organized tracks, courses, modules and lessons with scheduled content drip.' },
      { icon: '🎬', title: 'Video lessons', description: 'Player with progress tracking plus complementary materials and audio.' },
      { icon: '📝', title: 'Mock exams & quizzes', description: 'Exams and quizzes with a question bank, attempts and automatic grading.' },
      { icon: '⚡', title: 'Smart flashcards', description: 'Active recall with tags, interactions and performance tracking.' },
      { icon: '🧠', title: '3D anatomy', description: 'Interactive 3D environments (skeleton and human body) for immersive study.' },
      { icon: '💬', title: 'Community', description: 'Social feed with posts, comments, reactions and content moderation.' },
      { icon: '🔴', title: 'Live sessions', description: 'Zoom classes launched inside the platform, with link protection and recordings published automatically.' },
      { icon: '📜', title: 'Verifiable certificates', description: 'Automatic PDF certificate issuance with public verification.' },
      { icon: '🔒', title: 'Protected documents', description: 'Admins publish open materials (download) or protected ones that open only in an in-app PDF reader on the student page — no download, with access logging.' },
    ],
    highlightsTitle: 'The engineering behind it',
    highlights: [
      'Modular domain-driven architecture (DDD) with 12 cleanly separated business modules.',
      'Over 600 automated test suites ensuring stability with every release.',
      'Asynchronous processing with queues (BullMQ) and high-performance Redis caching.',
      'Automated recording pipeline: when a Zoom class ends, the recording is captured via API, sent to Panda Video and published on the platform — no manual steps, no exposed links.',
      'Full observability with OpenTelemetry and distributed tracing.',
      'AWS infrastructure (S3, CloudFront) provisioned as code with Terraform and Ansible.',
      'Secure by default: JWT auth with refresh tokens, rate limiting and protection headers.',
      'Fully multilingual content, with translations at every level (track, course, lesson, question).',
    ],
    stats: [
      { value: STATS_VALUES[0], label: 'Domain modules' },
      { value: STATS_VALUES[1], label: 'Data models' },
      { value: STATS_VALUES[2], label: 'Test files' },
      { value: STATS_VALUES[3], label: 'Languages' },
    ],
  },
  es: {
    featuresTitle: 'Lo que hace la plataforma',
    features: [
      { icon: '🎓', title: 'Cursos y rutas', description: 'Rutas, cursos, módulos y clases organizados, con liberación programada de contenido.' },
      { icon: '🎬', title: 'Clases en vídeo', description: 'Reproductor con seguimiento de progreso, materiales y audios complementarios.' },
      { icon: '📝', title: 'Simulacros y evaluaciones', description: 'Exámenes y quizzes con banco de preguntas, intentos y corrección automática.' },
      { icon: '⚡', title: 'Flashcards inteligentes', description: 'Memorización activa con etiquetas, interacciones y seguimiento de rendimiento.' },
      { icon: '🧠', title: 'Anatomía en 3D', description: 'Entornos 3D interactivos (esqueleto y cuerpo humano) para un estudio inmersivo.' },
      { icon: '💬', title: 'Comunidad', description: 'Feed social con publicaciones, comentarios, reacciones y moderación.' },
      { icon: '🔴', title: 'Sesiones en vivo', description: 'Clases por Zoom iniciadas dentro de la plataforma, con protección de enlaces y grabaciones publicadas automáticamente.' },
      { icon: '📜', title: 'Certificados verificables', description: 'Emisión automática de certificados en PDF con verificación pública.' },
      { icon: '🔒', title: 'Documentos protegidos', description: 'El admin publica materiales abiertos (descarga) o protegidos, que se abren solo en un lector de PDF propio en la página del alumno — sin descarga y con registro de accesos.' },
    ],
    highlightsTitle: 'La ingeniería detrás',
    highlights: [
      'Arquitectura modular orientada a dominio (DDD) con 12 módulos de negocio bien separados.',
      'Más de 600 suites de pruebas automatizadas que garantizan estabilidad en cada release.',
      'Procesamiento asíncrono con colas (BullMQ) y caché de alto rendimiento con Redis.',
      'Pipeline de grabación automatizado: al finalizar la clase en Zoom, la grabación se captura vía API, se envía a Panda Video y se publica en la plataforma — sin pasos manuales ni enlaces expuestos.',
      'Observabilidad completa con OpenTelemetry y trazado distribuido.',
      'Infraestructura AWS (S3, CloudFront) provisionada como código con Terraform y Ansible.',
      'Seguro por defecto: autenticación JWT con refresh tokens, rate limiting y headers de protección.',
      'Contenido totalmente multilingüe, con traducciones en cada nivel (ruta, curso, clase, pregunta).',
    ],
    stats: [
      { value: STATS_VALUES[0], label: 'Módulos de dominio' },
      { value: STATS_VALUES[1], label: 'Modelos de datos' },
      { value: STATS_VALUES[2], label: 'Archivos de prueba' },
      { value: STATS_VALUES[3], label: 'Idiomas' },
    ],
  },
  it: {
    featuresTitle: 'Cosa fa la piattaforma',
    features: [
      { icon: '🎓', title: 'Corsi e percorsi', description: 'Percorsi, corsi, moduli e lezioni organizzati, con rilascio programmato dei contenuti.' },
      { icon: '🎬', title: 'Lezioni video', description: 'Player con monitoraggio dei progressi, materiali e audio complementari.' },
      { icon: '📝', title: 'Simulazioni e valutazioni', description: 'Esami e quiz con banca dati di domande, tentativi e correzione automatica.' },
      { icon: '⚡', title: 'Flashcard intelligenti', description: 'Memorizzazione attiva con tag, interazioni e monitoraggio delle prestazioni.' },
      { icon: '🧠', title: 'Anatomia in 3D', description: 'Ambienti 3D interattivi (scheletro e corpo umano) per uno studio immersivo.' },
      { icon: '💬', title: 'Community', description: 'Feed social con post, commenti, reazioni e moderazione dei contenuti.' },
      { icon: '🔴', title: 'Sessioni dal vivo', description: 'Lezioni Zoom avviate dentro la piattaforma, con protezione dei link e registrazioni pubblicate automaticamente.' },
      { icon: '📜', title: 'Certificati verificabili', description: 'Emissione automatica di certificati PDF con verifica pubblica.' },
      { icon: '🔒', title: 'Documenti protetti', description: "L'admin pubblica materiali aperti (download) o protetti, che si aprono solo in un lettore PDF proprio nella pagina dello studente — senza download e con registro degli accessi." },
    ],
    highlightsTitle: "L'ingegneria dietro",
    highlights: [
      'Architettura modulare orientata al dominio (DDD) con 12 moduli di business ben separati.',
      'Oltre 600 suite di test automatizzati che garantiscono stabilità ad ogni release.',
      'Elaborazione asincrona con code (BullMQ) e cache ad alte prestazioni con Redis.',
      'Pipeline di registrazione automatizzato: al termine della lezione su Zoom, la registrazione viene catturata via API, inviata a Panda Video e pubblicata sulla piattaforma — senza passaggi manuali né link esposti.',
      'Osservabilità completa con OpenTelemetry e tracciamento distribuito.',
      'Infrastruttura AWS (S3, CloudFront) provisionata come codice con Terraform e Ansible.',
      'Sicuro per impostazione: autenticazione JWT con refresh token, rate limiting e header di protezione.',
      'Contenuti completamente multilingue, con traduzioni a ogni livello (percorso, corso, lezione, domanda).',
    ],
    stats: [
      { value: STATS_VALUES[0], label: 'Moduli di dominio' },
      { value: STATS_VALUES[1], label: 'Modelli di dati' },
      { value: STATS_VALUES[2], label: 'File di test' },
      { value: STATS_VALUES[3], label: 'Lingue' },
    ],
  },
};

const manon: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que o site entrega',
    features: [
      { icon: '🌍', title: 'Trilíngue', description: 'Interface nativa em PT/ES/EN para alcançar um público global.' },
      { icon: '✍️', title: 'Blog gerenciável', description: 'Conteúdo e blog editáveis pelo cliente via Sanity CMS.' },
      { icon: '🎞️', title: 'Hero animado', description: 'Slider de imagens interativo e seções com muito movimento.' },
      { icon: '👥', title: 'Seções por público', description: 'Áreas sob medida para diferentes públicos.' },
      { icon: '💬', title: 'Depoimentos', description: 'Depoimentos dinâmicos em vídeo e texto.' },
    ],
    highlightsTitle: 'Destaques de construção',
    highlights: [
      'CMS headless Sanity com preview em tempo real e estúdio em /studio.',
      'Animações com GSAP + Framer Motion e efeitos de partículas.',
      'Design responsivo e acessível, com SEO multilíngue.',
      'Performance otimizada com Next.js e imagens otimizadas.',
    ],
    stats: [
      { value: '3', label: 'Idiomas' },
      { value: 'CMS', label: 'Conteúdo gerenciável' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  en: {
    featuresTitle: 'What the site delivers',
    features: [
      { icon: '🌍', title: 'Trilingual', description: 'Native PT/ES/EN interface to reach a global audience.' },
      { icon: '✍️', title: 'Managed blog', description: 'Content and blog editable by the client via Sanity CMS.' },
      { icon: '🎞️', title: 'Animated hero', description: 'Interactive image slider and motion-rich sections.' },
      { icon: '👥', title: 'Audience sections', description: 'Tailored areas for different audiences.' },
      { icon: '💬', title: 'Testimonials', description: 'Dynamic video and text testimonials.' },
    ],
    highlightsTitle: 'Build highlights',
    highlights: [
      'Sanity headless CMS with live preview and an in-app studio at /studio.',
      'GSAP + Framer Motion animations with particle effects.',
      'Responsive, accessible design with multilingual SEO.',
      'Optimized performance with Next.js image optimization.',
    ],
    stats: [
      { value: '3', label: 'Languages' },
      { value: 'CMS', label: 'Managed content' },
      { value: '100%', label: 'Responsive' },
    ],
  },
  es: {
    featuresTitle: 'Lo que ofrece el sitio',
    features: [
      { icon: '🌍', title: 'Trilingüe', description: 'Interfaz nativa PT/ES/EN para alcanzar un público global.' },
      { icon: '✍️', title: 'Blog gestionable', description: 'Contenido y blog editables por el cliente vía Sanity CMS.' },
      { icon: '🎞️', title: 'Hero animado', description: 'Slider de imágenes interactivo y secciones con mucho movimiento.' },
      { icon: '👥', title: 'Secciones por público', description: 'Áreas a medida para diferentes públicos.' },
      { icon: '💬', title: 'Testimonios', description: 'Testimonios dinámicos en vídeo y texto.' },
    ],
    highlightsTitle: 'Aspectos destacados',
    highlights: [
      'CMS headless Sanity con vista previa en tiempo real y estudio en /studio.',
      'Animaciones con GSAP + Framer Motion y efectos de partículas.',
      'Diseño responsivo y accesible, con SEO multilingüe.',
      'Rendimiento optimizado con Next.js e imágenes optimizadas.',
    ],
    stats: [
      { value: '3', label: 'Idiomas' },
      { value: 'CMS', label: 'Contenido gestionable' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  it: {
    featuresTitle: 'Cosa offre il sito',
    features: [
      { icon: '🌍', title: 'Trilingue', description: 'Interfaccia nativa PT/ES/EN per raggiungere un pubblico globale.' },
      { icon: '✍️', title: 'Blog gestibile', description: 'Contenuti e blog modificabili dal cliente via Sanity CMS.' },
      { icon: '🎞️', title: 'Hero animato', description: 'Slider di immagini interattivo e sezioni ricche di movimento.' },
      { icon: '👥', title: 'Sezioni per pubblico', description: 'Aree su misura per diversi pubblici.' },
      { icon: '💬', title: 'Testimonianze', description: 'Testimonianze dinamiche in video e testo.' },
    ],
    highlightsTitle: 'Punti salienti',
    highlights: [
      'CMS headless Sanity con anteprima in tempo reale e studio su /studio.',
      'Animazioni con GSAP + Framer Motion ed effetti particellari.',
      'Design responsive e accessibile, con SEO multilingue.',
      'Prestazioni ottimizzate con Next.js e immagini ottimizzate.',
    ],
    stats: [
      { value: '3', label: 'Lingue' },
      { value: 'CMS', label: 'Contenuti gestibili' },
      { value: '100%', label: 'Responsive' },
    ],
  },
};

const flavia: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que o site entrega',
    features: [
      { icon: '🎁', title: 'Gift cards', description: 'Compra e envio de cartões-presente digitais.' },
      { icon: '🏦', title: 'Beauty Bank', description: 'Crédito pré-pago com bônus; serviços debitados no admin, com saldo por cliente e geral.' },
      { icon: '💳', title: 'Pagamentos', description: 'Checkout com Square e Stripe.' },
      { icon: '🛠️', title: 'Painel admin', description: 'Acompanhamento de vendas e pedidos (NextAuth + Firebase).' },
      { icon: '🖼️', title: 'Galeria', description: 'Galeria de fotos dos trabalhos.' },
      { icon: '📧', title: 'E-mails & QR', description: 'E-mails transacionais via Resend e QR codes nos cartões.' },
    ],
    highlightsTitle: 'Destaques de construção',
    highlights: [
      'Integração dupla de pagamentos (Square + Stripe) com checkout seguro.',
      'Área administrativa com autenticação (NextAuth) e backend Firebase.',
      'E-mails transacionais (Resend) e gift cards com QR code.',
      'Multilíngue, com analytics e SEO (sitemap/robots).',
    ],
    stats: [
      { value: '2', label: 'Gateways de pagamento' },
      { value: '2', label: 'Idiomas' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  en: {
    featuresTitle: 'What the site delivers',
    features: [
      { icon: '🎁', title: 'Gift cards', description: 'Buy and send digital gift cards.' },
      { icon: '🏦', title: 'Beauty Bank', description: 'Prepaid credit with bonuses; services deducted in the admin, with per-client and overall balances.' },
      { icon: '💳', title: 'Payments', description: 'Checkout with Square and Stripe.' },
      { icon: '🛠️', title: 'Admin panel', description: 'Sales and order tracking (NextAuth + Firebase).' },
      { icon: '🖼️', title: 'Gallery', description: 'Photo gallery of the work.' },
      { icon: '📧', title: 'Emails & QR', description: 'Transactional emails via Resend and QR-coded cards.' },
    ],
    highlightsTitle: 'Build highlights',
    highlights: [
      'Dual payment integration (Square + Stripe) with secure checkout.',
      'Admin area with authentication (NextAuth) and a Firebase backend.',
      'Transactional email (Resend) and QR-coded gift cards.',
      'Multilingual, with analytics and SEO (sitemap/robots).',
    ],
    stats: [
      { value: '2', label: 'Payment gateways' },
      { value: '2', label: 'Languages' },
      { value: '100%', label: 'Responsive' },
    ],
  },
  es: {
    featuresTitle: 'Lo que ofrece el sitio',
    features: [
      { icon: '🎁', title: 'Gift cards', description: 'Compra y envío de tarjetas regalo digitales.' },
      { icon: '🏦', title: 'Beauty Bank', description: 'Crédito prepago con bonos; servicios descontados en el admin, con saldo por cliente y total.' },
      { icon: '💳', title: 'Pagos', description: 'Checkout con Square y Stripe.' },
      { icon: '🛠️', title: 'Panel admin', description: 'Seguimiento de ventas y pedidos (NextAuth + Firebase).' },
      { icon: '🖼️', title: 'Galería', description: 'Galería de fotos de los trabajos.' },
      { icon: '📧', title: 'Emails & QR', description: 'Emails transaccionales vía Resend y QR en las tarjetas.' },
    ],
    highlightsTitle: 'Aspectos destacados',
    highlights: [
      'Integración doble de pagos (Square + Stripe) con checkout seguro.',
      'Área administrativa con autenticación (NextAuth) y backend Firebase.',
      'Emails transaccionales (Resend) y gift cards con QR.',
      'Multilingüe, con analytics y SEO (sitemap/robots).',
    ],
    stats: [
      { value: '2', label: 'Pasarelas de pago' },
      { value: '2', label: 'Idiomas' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  it: {
    featuresTitle: 'Cosa offre il sito',
    features: [
      { icon: '🎁', title: 'Gift card', description: 'Acquisto e invio di carte regalo digitali.' },
      { icon: '🏦', title: 'Beauty Bank', description: 'Credito prepagato con bonus; servizi scalati nell\'admin, con saldo per cliente e complessivo.' },
      { icon: '💳', title: 'Pagamenti', description: 'Checkout con Square e Stripe.' },
      { icon: '🛠️', title: 'Pannello admin', description: 'Monitoraggio di vendite e ordini (NextAuth + Firebase).' },
      { icon: '🖼️', title: 'Galleria', description: 'Galleria fotografica dei lavori.' },
      { icon: '📧', title: 'Email & QR', description: 'Email transazionali via Resend e QR sulle carte.' },
    ],
    highlightsTitle: 'Punti salienti',
    highlights: [
      'Doppia integrazione di pagamento (Square + Stripe) con checkout sicuro.',
      'Area amministrativa con autenticazione (NextAuth) e backend Firebase.',
      'Email transazionali (Resend) e gift card con QR code.',
      'Multilingue, con analytics e SEO (sitemap/robots).',
    ],
    stats: [
      { value: '2', label: 'Gateway di pagamento' },
      { value: '2', label: 'Lingue' },
      { value: '100%', label: 'Responsive' },
    ],
  },
};

const kundalini: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que o site entrega',
    features: [
      { icon: '💬', title: 'Depoimentos', description: 'Depoimentos em vídeo e texto.' },
      { icon: '🖼️', title: 'Galeria', description: 'Galeria de fotos em alta resolução.' },
      { icon: '🎥', title: 'Vídeo', description: 'Player de vídeo para conteúdos e depoimentos.' },
      { icon: '❓', title: 'FAQ', description: 'Seção de perguntas frequentes em accordion.' },
      { icon: '📍', title: 'Eventos', description: 'Informações de locais e eventos com CTAs estratégicas.' },
    ],
    highlightsTitle: 'Destaques de construção',
    highlights: [
      'Landing focada em conversão com múltiplas CTAs estratégicas.',
      'Animações com GSAP + Framer Motion.',
      'Galeria (react-photo-album) e vídeo (react-player).',
      'Rápido, responsivo e pronto para SEO.',
    ],
    stats: [
      { value: 'GSAP', label: 'Animações' },
      { value: '100%', label: 'Responsivo' },
      { value: 'SEO', label: 'Otimizado' },
    ],
  },
  en: {
    featuresTitle: 'What the site delivers',
    features: [
      { icon: '💬', title: 'Testimonials', description: 'Video and text testimonials.' },
      { icon: '🖼️', title: 'Gallery', description: 'High-resolution photo gallery.' },
      { icon: '🎥', title: 'Video', description: 'Video player for content and testimonials.' },
      { icon: '❓', title: 'FAQ', description: 'Accordion FAQ section.' },
      { icon: '📍', title: 'Events', description: 'Location and event info with strategic CTAs.' },
    ],
    highlightsTitle: 'Build highlights',
    highlights: [
      'Conversion-focused landing with multiple strategic CTAs.',
      'GSAP + Framer Motion animations.',
      'Gallery (react-photo-album) and video (react-player).',
      'Fast, responsive and SEO-ready.',
    ],
    stats: [
      { value: 'GSAP', label: 'Animations' },
      { value: '100%', label: 'Responsive' },
      { value: 'SEO', label: 'Optimized' },
    ],
  },
  es: {
    featuresTitle: 'Lo que ofrece el sitio',
    features: [
      { icon: '💬', title: 'Testimonios', description: 'Testimonios en vídeo y texto.' },
      { icon: '🖼️', title: 'Galería', description: 'Galería de fotos en alta resolución.' },
      { icon: '🎥', title: 'Vídeo', description: 'Reproductor de vídeo para contenidos y testimonios.' },
      { icon: '❓', title: 'FAQ', description: 'Sección de preguntas frecuentes en accordion.' },
      { icon: '📍', title: 'Eventos', description: 'Información de lugares y eventos con CTAs estratégicas.' },
    ],
    highlightsTitle: 'Aspectos destacados',
    highlights: [
      'Landing enfocada en conversión con múltiples CTAs estratégicas.',
      'Animaciones con GSAP + Framer Motion.',
      'Galería (react-photo-album) y vídeo (react-player).',
      'Rápido, responsivo y listo para SEO.',
    ],
    stats: [
      { value: 'GSAP', label: 'Animaciones' },
      { value: '100%', label: 'Responsivo' },
      { value: 'SEO', label: 'Optimizado' },
    ],
  },
  it: {
    featuresTitle: 'Cosa offre il sito',
    features: [
      { icon: '💬', title: 'Testimonianze', description: 'Testimonianze video e testuali.' },
      { icon: '🖼️', title: 'Galleria', description: 'Galleria fotografica ad alta risoluzione.' },
      { icon: '🎥', title: 'Video', description: 'Video player per contenuti e testimonianze.' },
      { icon: '❓', title: 'FAQ', description: 'Sezione FAQ in accordion.' },
      { icon: '📍', title: 'Eventi', description: 'Informazioni su luoghi ed eventi con CTA strategiche.' },
    ],
    highlightsTitle: 'Punti salienti',
    highlights: [
      'Landing orientata alla conversione con CTA multiple strategiche.',
      'Animazioni con GSAP + Framer Motion.',
      'Galleria (react-photo-album) e video (react-player).',
      'Veloce, responsive e pronto per la SEO.',
    ],
    stats: [
      { value: 'GSAP', label: 'Animazioni' },
      { value: '100%', label: 'Responsive' },
      { value: 'SEO', label: 'Ottimizzato' },
    ],
  },
};

const CRM_STATS = ['99', '30', '215', '5+'];

const wbcrm: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que o CRM faz',
    features: [
      { icon: '👥', title: 'Leads & contatos', description: 'Captação, importação, deduplicação e qualificação por ICP.' },
      { icon: '📊', title: 'Pipeline & negócios', description: 'Funil kanban arrastável com etapas e gestão de deals.' },
      { icon: '🔁', title: 'Cadências & atividades', description: 'Sequências automatizadas de tarefas e follow-ups.' },
      { icon: '📨', title: 'Campanhas de e-mail', description: 'Disparo em massa com aquecimento (warming) de domínio.' },
      { icon: '💬', title: 'Campanhas WhatsApp', description: 'Mensagens e campanhas em escala.' },
      { icon: '☎️', title: 'Telefonia GoTo', description: 'Ligações integradas com gravação e transcrição.' },
      { icon: '🤖', title: 'Agentes de IA', description: 'Agentes de leads e análise de ligações e reuniões.' },
      { icon: '🧩', title: 'Bot-flows', description: 'Construtor visual de fluxos e automações.' },
      { icon: '📁', title: 'Documentos & propostas', description: 'Armazenamento (S3) e geração de propostas.' },
    ],
    highlightsTitle: 'Engenharia por trás',
    highlights: [
      'Arquitetura modular DDD (NestJS) com cerca de 30 domínios de negócio.',
      '99 modelos de dados (Prisma/PostgreSQL) — um domínio de CRM muito rico.',
      '215 arquivos de teste automatizados.',
      'Integrações: Google (Gmail/Calendar/Meet), GoTo (telefonia), WhatsApp e AWS S3.',
      'Transcrição e análise de ligações e reuniões com IA.',
      'Automação agendada (jobs/cron) e eventos em tempo real.',
      'Front Next.js: pipeline kanban (dnd-kit), fluxos visuais (React Flow) e dashboards (Recharts).',
    ],
    stats: [
      { value: CRM_STATS[0], label: 'Modelos de dados' },
      { value: CRM_STATS[1], label: 'Módulos de domínio' },
      { value: CRM_STATS[2], label: 'Arquivos de teste' },
      { value: CRM_STATS[3], label: 'Integrações' },
    ],
  },
  en: {
    featuresTitle: 'What the CRM does',
    features: [
      { icon: '👥', title: 'Leads & contacts', description: 'Capture, import, deduplication and ICP-based qualification.' },
      { icon: '📊', title: 'Pipeline & deals', description: 'Draggable kanban funnel with stages and deal management.' },
      { icon: '🔁', title: 'Cadences & activities', description: 'Automated sequences of tasks and follow-ups.' },
      { icon: '📨', title: 'Email campaigns', description: 'Bulk sending with domain warming.' },
      { icon: '💬', title: 'WhatsApp campaigns', description: 'Messages and campaigns at scale.' },
      { icon: '☎️', title: 'GoTo telephony', description: 'Integrated calls with recording and transcription.' },
      { icon: '🤖', title: 'AI agents', description: 'Lead agents and call/meeting analysis.' },
      { icon: '🧩', title: 'Bot-flows', description: 'Visual builder for flows and automations.' },
      { icon: '📁', title: 'Documents & proposals', description: 'Storage (S3) and proposal generation.' },
    ],
    highlightsTitle: 'The engineering behind it',
    highlights: [
      'Modular domain-driven architecture (NestJS) with around 30 business domains.',
      '99 data models (Prisma/PostgreSQL) — a very rich CRM domain.',
      '215 automated test files.',
      'Integrations: Google (Gmail/Calendar/Meet), GoTo (telephony), WhatsApp and AWS S3.',
      'AI transcription and analysis of calls and meetings.',
      'Scheduled automation (jobs/cron) and real-time events.',
      'Next.js front: kanban pipeline (dnd-kit), visual flows (React Flow) and dashboards (Recharts).',
    ],
    stats: [
      { value: CRM_STATS[0], label: 'Data models' },
      { value: CRM_STATS[1], label: 'Domain modules' },
      { value: CRM_STATS[2], label: 'Test files' },
      { value: CRM_STATS[3], label: 'Integrations' },
    ],
  },
  es: {
    featuresTitle: 'Lo que hace el CRM',
    features: [
      { icon: '👥', title: 'Leads & contactos', description: 'Captación, importación, deduplicación y calificación por ICP.' },
      { icon: '📊', title: 'Pipeline & negocios', description: 'Embudo kanban arrastrable con etapas y gestión de deals.' },
      { icon: '🔁', title: 'Cadencias & actividades', description: 'Secuencias automatizadas de tareas y seguimientos.' },
      { icon: '📨', title: 'Campañas de email', description: 'Envío masivo con calentamiento (warming) de dominio.' },
      { icon: '💬', title: 'Campañas WhatsApp', description: 'Mensajes y campañas a escala.' },
      { icon: '☎️', title: 'Telefonía GoTo', description: 'Llamadas integradas con grabación y transcripción.' },
      { icon: '🤖', title: 'Agentes de IA', description: 'Agentes de leads y análisis de llamadas y reuniones.' },
      { icon: '🧩', title: 'Bot-flows', description: 'Constructor visual de flujos y automatizaciones.' },
      { icon: '📁', title: 'Documentos & propuestas', description: 'Almacenamiento (S3) y generación de propuestas.' },
    ],
    highlightsTitle: 'La ingeniería detrás',
    highlights: [
      'Arquitectura modular orientada a dominio (NestJS) con cerca de 30 dominios de negocio.',
      '99 modelos de datos (Prisma/PostgreSQL) — un dominio de CRM muy rico.',
      '215 archivos de prueba automatizados.',
      'Integraciones: Google (Gmail/Calendar/Meet), GoTo (telefonía), WhatsApp y AWS S3.',
      'Transcripción y análisis de llamadas y reuniones con IA.',
      'Automatización programada (jobs/cron) y eventos en tiempo real.',
      'Front Next.js: pipeline kanban (dnd-kit), flujos visuales (React Flow) y dashboards (Recharts).',
    ],
    stats: [
      { value: CRM_STATS[0], label: 'Modelos de datos' },
      { value: CRM_STATS[1], label: 'Módulos de dominio' },
      { value: CRM_STATS[2], label: 'Archivos de prueba' },
      { value: CRM_STATS[3], label: 'Integraciones' },
    ],
  },
  it: {
    featuresTitle: 'Cosa fa il CRM',
    features: [
      { icon: '👥', title: 'Lead & contatti', description: 'Acquisizione, importazione, deduplicazione e qualificazione per ICP.' },
      { icon: '📊', title: 'Pipeline & trattative', description: 'Funnel kanban trascinabile con fasi e gestione delle trattative.' },
      { icon: '🔁', title: 'Cadenze & attività', description: 'Sequenze automatizzate di attività e follow-up.' },
      { icon: '📨', title: 'Campagne email', description: 'Invio massivo con warming del dominio.' },
      { icon: '💬', title: 'Campagne WhatsApp', description: 'Messaggi e campagne su larga scala.' },
      { icon: '☎️', title: 'Telefonia GoTo', description: 'Chiamate integrate con registrazione e trascrizione.' },
      { icon: '🤖', title: 'Agenti IA', description: 'Agenti per i lead e analisi di chiamate e riunioni.' },
      { icon: '🧩', title: 'Bot-flows', description: 'Costruttore visuale di flussi e automazioni.' },
      { icon: '📁', title: 'Documenti & proposte', description: 'Archiviazione (S3) e generazione di proposte.' },
    ],
    highlightsTitle: "L'ingegneria dietro",
    highlights: [
      'Architettura modulare orientata al dominio (NestJS) con circa 30 domini di business.',
      '99 modelli di dati (Prisma/PostgreSQL) — un dominio CRM molto ricco.',
      '215 file di test automatizzati.',
      'Integrazioni: Google (Gmail/Calendar/Meet), GoTo (telefonia), WhatsApp e AWS S3.',
      'Trascrizione e analisi di chiamate e riunioni con IA.',
      'Automazione pianificata (job/cron) ed eventi in tempo reale.',
      'Front Next.js: pipeline kanban (dnd-kit), flussi visuali (React Flow) e dashboard (Recharts).',
    ],
    stats: [
      { value: CRM_STATS[0], label: 'Modelli di dati' },
      { value: CRM_STATS[1], label: 'Moduli di dominio' },
      { value: CRM_STATS[2], label: 'File di test' },
      { value: CRM_STATS[3], label: 'Integrazioni' },
    ],
  },
};

const aiAgents: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que o sistema faz',
    features: [
      { icon: '🧭', title: 'Roteamento por intenção', description: 'Um roteador classifica a intenção e direciona ao agente certo.' },
      { icon: '🧩', title: 'Agentes especializados', description: 'Agente de CRM e agente de finanças, cada um com seu escopo.' },
      { icon: '🔗', title: 'Ações integradas', description: 'Conecta-se aos serviços da plataforma (CRM, finanças) para executar.' },
      { icon: '🧠', title: 'Multi-modelo', description: 'Usa modelos da OpenAI e da Anthropic.' },
      { icon: '⚙️', title: 'Orquestração LangGraph', description: 'Grafo de nós com estado para fluxos de agentes confiáveis.' },
    ],
    highlightsTitle: 'Engenharia por trás',
    highlights: [
      'Orquestração de agentes com LangGraph (grafo + roteador de intenção).',
      'Multi-modelo: OpenAI e Anthropic.',
      'Serviço FastAPI conteinerizado (Docker).',
      'Integração com serviços de CRM e finanças para ações reais.',
    ],
    stats: [
      { value: '2', label: 'Agentes especializados' },
      { value: '2', label: 'Modelos de IA' },
      { value: '22', label: 'Arquivos de teste' },
    ],
  },
  en: {
    featuresTitle: 'What the system does',
    features: [
      { icon: '🧭', title: 'Intent routing', description: 'A router classifies intent and dispatches to the right agent.' },
      { icon: '🧩', title: 'Specialized agents', description: 'A CRM agent and a finances agent, each with its own scope.' },
      { icon: '🔗', title: 'Integrated actions', description: 'Connects to platform services (CRM, finances) to act.' },
      { icon: '🧠', title: 'Multi-model', description: 'Uses OpenAI and Anthropic models.' },
      { icon: '⚙️', title: 'LangGraph orchestration', description: 'Stateful node graph for reliable agent flows.' },
    ],
    highlightsTitle: 'The engineering behind it',
    highlights: [
      'Agent orchestration with LangGraph (graph + intent router).',
      'Multi-model: OpenAI and Anthropic.',
      'Containerized FastAPI service (Docker).',
      'Integration with CRM and finances services for real actions.',
    ],
    stats: [
      { value: '2', label: 'Specialized agents' },
      { value: '2', label: 'AI models' },
      { value: '22', label: 'Test files' },
    ],
  },
  es: {
    featuresTitle: 'Lo que hace el sistema',
    features: [
      { icon: '🧭', title: 'Enrutamiento por intención', description: 'Un enrutador clasifica la intención y dirige al agente correcto.' },
      { icon: '🧩', title: 'Agentes especializados', description: 'Un agente de CRM y un agente de finanzas, cada uno con su alcance.' },
      { icon: '🔗', title: 'Acciones integradas', description: 'Se conecta a los servicios de la plataforma (CRM, finanzas) para actuar.' },
      { icon: '🧠', title: 'Multimodelo', description: 'Usa modelos de OpenAI y Anthropic.' },
      { icon: '⚙️', title: 'Orquestación LangGraph', description: 'Grafo de nodos con estado para flujos de agentes fiables.' },
    ],
    highlightsTitle: 'La ingeniería detrás',
    highlights: [
      'Orquestación de agentes con LangGraph (grafo + enrutador de intención).',
      'Multimodelo: OpenAI y Anthropic.',
      'Servicio FastAPI en contenedor (Docker).',
      'Integración con servicios de CRM y finanzas para acciones reales.',
    ],
    stats: [
      { value: '2', label: 'Agentes especializados' },
      { value: '2', label: 'Modelos de IA' },
      { value: '22', label: 'Archivos de prueba' },
    ],
  },
  it: {
    featuresTitle: 'Cosa fa il sistema',
    features: [
      { icon: '🧭', title: 'Instradamento per intento', description: 'Un router classifica l\'intento e indirizza all\'agente giusto.' },
      { icon: '🧩', title: 'Agenti specializzati', description: 'Un agente CRM e un agente finanze, ciascuno con il proprio ambito.' },
      { icon: '🔗', title: 'Azioni integrate', description: 'Si collega ai servizi della piattaforma (CRM, finanze) per agire.' },
      { icon: '🧠', title: 'Multi-modello', description: 'Usa modelli OpenAI e Anthropic.' },
      { icon: '⚙️', title: 'Orchestrazione LangGraph', description: 'Grafo di nodi con stato per flussi di agenti affidabili.' },
    ],
    highlightsTitle: "L'ingegneria dietro",
    highlights: [
      'Orchestrazione di agenti con LangGraph (grafo + router di intento).',
      'Multi-modello: OpenAI e Anthropic.',
      'Servizio FastAPI containerizzato (Docker).',
      'Integrazione con servizi CRM e finanze per azioni reali.',
    ],
    stats: [
      { value: '2', label: 'Agenti specializzati' },
      { value: '2', label: 'Modelli di IA' },
      { value: '22', label: 'File di test' },
    ],
  },
};

const konnen: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que o app faz',
    features: [
      { icon: '👤', title: 'Cadastro de alunos', description: 'Perfil com foto comprimida no navegador antes do upload.' },
      { icon: '❤️', title: 'Zonas cardíacas', description: 'FC máxima (Tanaka) e zonas de treino.' },
      { icon: '🏃', title: 'Teste de Cooper', description: 'Distância, FC e esforço; VO₂máx estimado (Cooper e Uth).' },
      { icon: '📊', title: 'Evolução', description: 'Histórico do aluno com gráficos.' },
      { icon: '📄', title: 'Relatórios em PDF', description: 'Geração e envio por WhatsApp e e-mail.' },
      { icon: '🔒', title: 'Acesso protegido', description: 'Login por senha com sessão assinada.' },
    ],
    highlightsTitle: 'Engenharia por trás',
    highlights: [
      'Next.js 16 + React 19 + TypeScript.',
      'Banco local (SQLite) e fotos no Vercel Blob.',
      'PDF no cliente (jsPDF) e gráficos de evolução (Recharts).',
      'Cálculos de VO₂máx (Cooper e Uth), IMC e zonas cardíacas.',
    ],
    stats: [
      { value: '4+', label: 'Métricas calculadas' },
      { value: 'PDF', label: 'Relatórios' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  en: {
    featuresTitle: 'What the app does',
    features: [
      { icon: '👤', title: 'Student registration', description: 'Profile with a photo compressed in the browser before upload.' },
      { icon: '❤️', title: 'Heart-rate zones', description: 'Max HR (Tanaka) and training zones.' },
      { icon: '🏃', title: 'Cooper test', description: 'Distance, HR and effort; estimated VO₂max (Cooper and Uth).' },
      { icon: '📊', title: 'Evolution', description: 'Student history with charts.' },
      { icon: '📄', title: 'PDF reports', description: 'Generate and share via WhatsApp and email.' },
      { icon: '🔒', title: 'Protected access', description: 'Password login with a signed session.' },
    ],
    highlightsTitle: 'The engineering behind it',
    highlights: [
      'Next.js 16 + React 19 + TypeScript.',
      'Local database (SQLite) and photos on Vercel Blob.',
      'Client-side PDF (jsPDF) and evolution charts (Recharts).',
      'VO₂max (Cooper and Uth), BMI and heart-rate zone calculations.',
    ],
    stats: [
      { value: '4+', label: 'Computed metrics' },
      { value: 'PDF', label: 'Reports' },
      { value: '100%', label: 'Responsive' },
    ],
  },
  es: {
    featuresTitle: 'Lo que hace la app',
    features: [
      { icon: '👤', title: 'Registro de alumnos', description: 'Perfil con foto comprimida en el navegador antes de subir.' },
      { icon: '❤️', title: 'Zonas cardíacas', description: 'FC máxima (Tanaka) y zonas de entrenamiento.' },
      { icon: '🏃', title: 'Test de Cooper', description: 'Distancia, FC y esfuerzo; VO₂máx estimado (Cooper y Uth).' },
      { icon: '📊', title: 'Evolución', description: 'Historial del alumno con gráficos.' },
      { icon: '📄', title: 'Informes en PDF', description: 'Generación y envío por WhatsApp y email.' },
      { icon: '🔒', title: 'Acceso protegido', description: 'Login por contraseña con sesión firmada.' },
    ],
    highlightsTitle: 'La ingeniería detrás',
    highlights: [
      'Next.js 16 + React 19 + TypeScript.',
      'Base de datos local (SQLite) y fotos en Vercel Blob.',
      'PDF en el cliente (jsPDF) y gráficos de evolución (Recharts).',
      'Cálculos de VO₂máx (Cooper y Uth), IMC y zonas cardíacas.',
    ],
    stats: [
      { value: '4+', label: 'Métricas calculadas' },
      { value: 'PDF', label: 'Informes' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  it: {
    featuresTitle: 'Cosa fa la app',
    features: [
      { icon: '👤', title: 'Registrazione allievi', description: 'Profilo con foto compressa nel browser prima del caricamento.' },
      { icon: '❤️', title: 'Zone cardiache', description: 'FC massima (Tanaka) e zone di allenamento.' },
      { icon: '🏃', title: 'Test di Cooper', description: 'Distanza, FC e sforzo; VO₂max stimato (Cooper e Uth).' },
      { icon: '📊', title: 'Evoluzione', description: 'Storico dell\'allievo con grafici.' },
      { icon: '📄', title: 'Report PDF', description: 'Generazione e invio via WhatsApp ed email.' },
      { icon: '🔒', title: 'Accesso protetto', description: 'Login con password e sessione firmata.' },
    ],
    highlightsTitle: "L'ingegneria dietro",
    highlights: [
      'Next.js 16 + React 19 + TypeScript.',
      'Database locale (SQLite) e foto su Vercel Blob.',
      'PDF lato client (jsPDF) e grafici di evoluzione (Recharts).',
      'Calcoli di VO₂max (Cooper e Uth), IMC e zone cardiache.',
    ],
    stats: [
      { value: '4+', label: 'Metriche calcolate' },
      { value: 'PDF', label: 'Report' },
      { value: '100%', label: 'Responsive' },
    ],
  },
};

const calendar: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que o app faz',
    features: [
      { icon: '📆', title: 'Agenda & eventos', description: 'Eventos recorrentes com categorias e etiquetas.' },
      { icon: '✅', title: 'Hábitos', description: 'Acompanhamento de hábitos por conclusões.' },
      { icon: '🎯', title: 'Metas', description: 'Metas semanais e mensais.' },
      { icon: '⏰', title: 'Lembretes', description: 'Lembretes de eventos.' },
      { icon: '🔄', title: 'Google Calendar', description: 'Sincronização via OAuth.' },
      { icon: '📊', title: 'Dashboard', description: 'Visão geral e relatórios.' },
    ],
    highlightsTitle: 'Engenharia por trás',
    highlights: [
      'Backend NestJS + Prisma + PostgreSQL.',
      'Eventos recorrentes com exceções/overrides e conclusões (hábitos e metas).',
      'Integração com o Google Calendar (OAuth).',
      'Frontend Next.js com dashboard.',
    ],
    stats: [
      { value: '15', label: 'Modelos de dados' },
      { value: '6', label: 'Domínios' },
      { value: 'Google', label: 'Calendar sync' },
    ],
  },
  en: {
    featuresTitle: 'What the app does',
    features: [
      { icon: '📆', title: 'Calendar & events', description: 'Recurring events with categories and labels.' },
      { icon: '✅', title: 'Habits', description: 'Habit tracking via completions.' },
      { icon: '🎯', title: 'Goals', description: 'Weekly and monthly goals.' },
      { icon: '⏰', title: 'Reminders', description: 'Event reminders.' },
      { icon: '🔄', title: 'Google Calendar', description: 'Sync via OAuth.' },
      { icon: '📊', title: 'Dashboard', description: 'Overview and reports.' },
    ],
    highlightsTitle: 'The engineering behind it',
    highlights: [
      'NestJS + Prisma + PostgreSQL backend.',
      'Recurring events with exceptions/overrides and completions (habits & goals).',
      'Google Calendar integration (OAuth).',
      'Next.js frontend with a dashboard.',
    ],
    stats: [
      { value: '15', label: 'Data models' },
      { value: '6', label: 'Domains' },
      { value: 'Google', label: 'Calendar sync' },
    ],
  },
  es: {
    featuresTitle: 'Lo que hace la app',
    features: [
      { icon: '📆', title: 'Agenda & eventos', description: 'Eventos recurrentes con categorías y etiquetas.' },
      { icon: '✅', title: 'Hábitos', description: 'Seguimiento de hábitos por finalizaciones.' },
      { icon: '🎯', title: 'Metas', description: 'Metas semanales y mensuales.' },
      { icon: '⏰', title: 'Recordatorios', description: 'Recordatorios de eventos.' },
      { icon: '🔄', title: 'Google Calendar', description: 'Sincronización vía OAuth.' },
      { icon: '📊', title: 'Dashboard', description: 'Visión general e informes.' },
    ],
    highlightsTitle: 'La ingeniería detrás',
    highlights: [
      'Backend NestJS + Prisma + PostgreSQL.',
      'Eventos recurrentes con excepciones/overrides y finalizaciones (hábitos y metas).',
      'Integración con Google Calendar (OAuth).',
      'Frontend Next.js con dashboard.',
    ],
    stats: [
      { value: '15', label: 'Modelos de datos' },
      { value: '6', label: 'Dominios' },
      { value: 'Google', label: 'Calendar sync' },
    ],
  },
  it: {
    featuresTitle: 'Cosa fa la app',
    features: [
      { icon: '📆', title: 'Agenda & eventi', description: 'Eventi ricorrenti con categorie ed etichette.' },
      { icon: '✅', title: 'Abitudini', description: 'Monitoraggio delle abitudini tramite completamenti.' },
      { icon: '🎯', title: 'Obiettivi', description: 'Obiettivi settimanali e mensili.' },
      { icon: '⏰', title: 'Promemoria', description: 'Promemoria degli eventi.' },
      { icon: '🔄', title: 'Google Calendar', description: 'Sincronizzazione via OAuth.' },
      { icon: '📊', title: 'Dashboard', description: 'Panoramica e report.' },
    ],
    highlightsTitle: "L'ingegneria dietro",
    highlights: [
      'Backend NestJS + Prisma + PostgreSQL.',
      'Eventi ricorrenti con eccezioni/override e completamenti (abitudini e obiettivi).',
      'Integrazione con Google Calendar (OAuth).',
      'Frontend Next.js con dashboard.',
    ],
    stats: [
      { value: '15', label: 'Modelli di dati' },
      { value: '6', label: 'Domini' },
      { value: 'Google', label: 'Calendar sync' },
    ],
  },
};

const financas: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que o sistema faz',
    features: [
      { icon: '🏦', title: 'Contas & transações', description: 'Contas bancárias e lançamentos.' },
      { icon: '🏷️', title: 'Categorias & centros de custo', description: 'Organização e rateio dos gastos.' },
      { icon: '🎯', title: 'Orçamentos & metas', description: 'Metas financeiras e limites de orçamento.' },
      { icon: '🔁', title: 'Recorrências & faturas', description: 'Lançamentos recorrentes e faturas.' },
      { icon: '📥', title: 'Aportes', description: 'Aportes de capital e acompanhamento.' },
      { icon: '₿', title: 'Investimentos & cripto', description: 'Ativos e carteira de cripto com dados de mercado.' },
      { icon: '📈', title: 'Magic Formula', description: 'Screener de ações (ranking, base B3/IBOV).' },
    ],
    highlightsTitle: 'Engenharia por trás',
    highlights: [
      'Backend em Go com arquitetura DDD (107 arquivos, 13 domínios).',
      'Integrações de mercado: B3 (brapi), Yahoo Finance e Binance.',
      'Dashboards e visão geral com frontend Next.js.',
      'Screener Magic Formula (ranking de empresas) em Python/FastAPI.',
    ],
    stats: [
      { value: '107', label: 'Arquivos Go' },
      { value: '13', label: 'Domínios' },
      { value: '3', label: 'Fontes de mercado' },
    ],
  },
  en: {
    featuresTitle: 'What the system does',
    features: [
      { icon: '🏦', title: 'Accounts & transactions', description: 'Bank accounts and entries.' },
      { icon: '🏷️', title: 'Categories & cost centers', description: 'Spend organization and allocation.' },
      { icon: '🎯', title: 'Budgets & goals', description: 'Financial goals and budget targets.' },
      { icon: '🔁', title: 'Recurring & invoices', description: 'Recurring entries and invoices.' },
      { icon: '📥', title: 'Contributions', description: 'Capital contributions and tracking.' },
      { icon: '₿', title: 'Investments & crypto', description: 'Assets and a crypto portfolio with market data.' },
      { icon: '📈', title: 'Magic Formula', description: 'Stock screener (ranking, B3/IBOV dataset).' },
    ],
    highlightsTitle: 'The engineering behind it',
    highlights: [
      'Go backend with DDD architecture (107 files, 13 domains).',
      'Market integrations: B3 (brapi), Yahoo Finance and Binance.',
      'Dashboards and overview with a Next.js frontend.',
      'Magic Formula screener (company ranking) in Python/FastAPI.',
    ],
    stats: [
      { value: '107', label: 'Go files' },
      { value: '13', label: 'Domains' },
      { value: '3', label: 'Market sources' },
    ],
  },
  es: {
    featuresTitle: 'Lo que hace el sistema',
    features: [
      { icon: '🏦', title: 'Cuentas & transacciones', description: 'Cuentas bancarias y movimientos.' },
      { icon: '🏷️', title: 'Categorías & centros de costo', description: 'Organización y prorrateo de gastos.' },
      { icon: '🎯', title: 'Presupuestos & metas', description: 'Metas financieras y límites de presupuesto.' },
      { icon: '🔁', title: 'Recurrencias & facturas', description: 'Movimientos recurrentes y facturas.' },
      { icon: '📥', title: 'Aportes', description: 'Aportes de capital y seguimiento.' },
      { icon: '₿', title: 'Inversiones & cripto', description: 'Activos y cartera cripto con datos de mercado.' },
      { icon: '📈', title: 'Magic Formula', description: 'Screener de acciones (ranking, base B3/IBOV).' },
    ],
    highlightsTitle: 'La ingeniería detrás',
    highlights: [
      'Backend en Go con arquitectura DDD (107 archivos, 13 dominios).',
      'Integraciones de mercado: B3 (brapi), Yahoo Finance y Binance.',
      'Dashboards y visión general con frontend Next.js.',
      'Screener Magic Formula (ranking de empresas) en Python/FastAPI.',
    ],
    stats: [
      { value: '107', label: 'Archivos Go' },
      { value: '13', label: 'Dominios' },
      { value: '3', label: 'Fuentes de mercado' },
    ],
  },
  it: {
    featuresTitle: 'Cosa fa il sistema',
    features: [
      { icon: '🏦', title: 'Conti & transazioni', description: 'Conti bancari e movimenti.' },
      { icon: '🏷️', title: 'Categorie & centri di costo', description: 'Organizzazione e ripartizione delle spese.' },
      { icon: '🎯', title: 'Budget & obiettivi', description: 'Obiettivi finanziari e limiti di budget.' },
      { icon: '🔁', title: 'Ricorrenze & fatture', description: 'Movimenti ricorrenti e fatture.' },
      { icon: '📥', title: 'Conferimenti', description: 'Conferimenti di capitale e monitoraggio.' },
      { icon: '₿', title: 'Investimenti & cripto', description: 'Asset e portafoglio cripto con dati di mercato.' },
      { icon: '📈', title: 'Magic Formula', description: 'Screener azionario (ranking, dataset B3/IBOV).' },
    ],
    highlightsTitle: "L'ingegneria dietro",
    highlights: [
      'Backend in Go con architettura DDD (107 file, 13 domini).',
      'Integrazioni di mercato: B3 (brapi), Yahoo Finance e Binance.',
      'Dashboard e panoramica con frontend Next.js.',
      'Screener Magic Formula (ranking aziende) in Python/FastAPI.',
    ],
    stats: [
      { value: '107', label: 'File Go' },
      { value: '13', label: 'Domini' },
      { value: '3', label: 'Fonti di mercato' },
    ],
  },
};

const salto: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que o site entrega',
    features: [
      { icon: '🌍', title: 'Multilíngue', description: 'Site com múltiplos idiomas (next-intl).' },
      { icon: '🎯', title: 'Decks de vendas', description: 'Apresentações protegidas por acesso (automação, websites, Google Business, OS).' },
      { icon: '📋', title: 'Briefing & OS', description: 'Formulários de briefing e ordens de serviço.' },
      { icon: '📄', title: 'Geração de PDF', description: 'Fichas técnicas e OS em PDF (jsPDF).' },
      { icon: '📧', title: 'E-mails automáticos', description: 'Disparos transacionais (Resend + React Email) e webhooks.' },
      { icon: '✨', title: 'Animações & scroll', description: 'GSAP e scroll suave (Lenis).' },
    ],
    highlightsTitle: 'Destaques de construção',
    highlights: [
      'Next.js multilíngue (next-intl) com OG images dinâmicas.',
      'Decks protegidos por autenticação de acesso.',
      'Automação de e-mail (Resend/React Email) com webhooks (svix) e eventos Meta.',
      'Geração de PDF no cliente (jsPDF) para fichas e ordens de serviço.',
    ],
    stats: [
      { value: '6', label: 'Decks de vendas' },
      { value: 'PDF', label: 'Fichas & OS' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  en: {
    featuresTitle: 'What the site delivers',
    features: [
      { icon: '🌍', title: 'Multilingual', description: 'Multi-language site (next-intl).' },
      { icon: '🎯', title: 'Sales decks', description: 'Access-protected presentations (automation, websites, Google Business, service orders).' },
      { icon: '📋', title: 'Briefing & orders', description: 'Briefing and service-order forms.' },
      { icon: '📄', title: 'PDF generation', description: 'Spec sheets and service orders as PDF (jsPDF).' },
      { icon: '📧', title: 'Automatic emails', description: 'Transactional sends (Resend + React Email) and webhooks.' },
      { icon: '✨', title: 'Animations & scroll', description: 'GSAP and smooth scroll (Lenis).' },
    ],
    highlightsTitle: 'Build highlights',
    highlights: [
      'Multilingual Next.js (next-intl) with dynamic OG images.',
      'Access-authenticated protected decks.',
      'Email automation (Resend/React Email) with webhooks (svix) and Meta events.',
      'Client-side PDF generation (jsPDF) for spec sheets and service orders.',
    ],
    stats: [
      { value: '6', label: 'Sales decks' },
      { value: 'PDF', label: 'Specs & orders' },
      { value: '100%', label: 'Responsive' },
    ],
  },
  es: {
    featuresTitle: 'Lo que ofrece el sitio',
    features: [
      { icon: '🌍', title: 'Multilingüe', description: 'Sitio con múltiples idiomas (next-intl).' },
      { icon: '🎯', title: 'Decks de ventas', description: 'Presentaciones protegidas por acceso (automatización, sitios, Google Business, OS).' },
      { icon: '📋', title: 'Briefing & órdenes', description: 'Formularios de briefing y órdenes de servicio.' },
      { icon: '📄', title: 'Generación de PDF', description: 'Fichas técnicas y órdenes en PDF (jsPDF).' },
      { icon: '📧', title: 'Emails automáticos', description: 'Envíos transaccionales (Resend + React Email) y webhooks.' },
      { icon: '✨', title: 'Animaciones & scroll', description: 'GSAP y scroll suave (Lenis).' },
    ],
    highlightsTitle: 'Aspectos destacados',
    highlights: [
      'Next.js multilingüe (next-intl) con OG images dinámicas.',
      'Decks protegidos por autenticación de acceso.',
      'Automatización de email (Resend/React Email) con webhooks (svix) y eventos Meta.',
      'Generación de PDF en el cliente (jsPDF) para fichas y órdenes de servicio.',
    ],
    stats: [
      { value: '6', label: 'Decks de ventas' },
      { value: 'PDF', label: 'Fichas & órdenes' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  it: {
    featuresTitle: 'Cosa offre il sito',
    features: [
      { icon: '🌍', title: 'Multilingue', description: 'Sito con più lingue (next-intl).' },
      { icon: '🎯', title: 'Deck di vendita', description: 'Presentazioni protette da accesso (automazione, siti, Google Business, ordini).' },
      { icon: '📋', title: 'Briefing & ordini', description: 'Moduli di briefing e ordini di servizio.' },
      { icon: '📄', title: 'Generazione PDF', description: 'Schede tecniche e ordini in PDF (jsPDF).' },
      { icon: '📧', title: 'Email automatiche', description: 'Invii transazionali (Resend + React Email) e webhook.' },
      { icon: '✨', title: 'Animazioni & scroll', description: 'GSAP e scroll fluido (Lenis).' },
    ],
    highlightsTitle: 'Punti salienti',
    highlights: [
      'Next.js multilingue (next-intl) con OG image dinamiche.',
      'Deck protetti da autenticazione di accesso.',
      'Automazione email (Resend/React Email) con webhook (svix) ed eventi Meta.',
      'Generazione PDF lato client (jsPDF) per schede e ordini di servizio.',
    ],
    stats: [
      { value: '6', label: 'Deck di vendita' },
      { value: 'PDF', label: 'Schede & ordini' },
      { value: '100%', label: 'Responsive' },
    ],
  },
};

const projectManager: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que a ferramenta faz',
    features: [
      { icon: '🗂️', title: 'Workspaces & projetos', description: 'Organização do trabalho por workspace e projeto.' },
      { icon: '✅', title: 'Issues & milestones', description: 'Tarefas, marcos, labels e features.' },
      { icon: '📌', title: 'Kanban arrastável', description: 'Quadros com arrastar e soltar (dnd-kit).' },
      { icon: '⏱️', title: 'Time tracking', description: 'Registro e controle de tempo por tarefa.' },
      { icon: '⌨️', title: 'Command palette', description: 'Navegação e ações rápidas (cmdk).' },
      { icon: '🔐', title: 'Autenticação', description: 'Login e registro com NextAuth.' },
    ],
    highlightsTitle: 'Engenharia por trás',
    highlights: [
      'Next.js full-stack (App Router + API routes) com Prisma.',
      'Autenticação NextAuth (Prisma adapter) e validação com Zod.',
      'Kanban com dnd-kit e UI acessível (Radix UI).',
      'Modelo de dados com 13 entidades (workspaces, projetos, issues, etc.).',
    ],
    stats: [
      { value: '13', label: 'Modelos de dados' },
      { value: 'Kanban', label: 'Quadros arrastáveis' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  en: {
    featuresTitle: 'What the tool does',
    features: [
      { icon: '🗂️', title: 'Workspaces & projects', description: 'Organize work by workspace and project.' },
      { icon: '✅', title: 'Issues & milestones', description: 'Tasks, milestones, labels and features.' },
      { icon: '📌', title: 'Draggable kanban', description: 'Drag-and-drop boards (dnd-kit).' },
      { icon: '⏱️', title: 'Time tracking', description: 'Track and log time per task.' },
      { icon: '⌨️', title: 'Command palette', description: 'Fast navigation and actions (cmdk).' },
      { icon: '🔐', title: 'Authentication', description: 'Login and registration with NextAuth.' },
    ],
    highlightsTitle: 'The engineering behind it',
    highlights: [
      'Full-stack Next.js (App Router + API routes) with Prisma.',
      'NextAuth authentication (Prisma adapter) and Zod validation.',
      'Kanban with dnd-kit and accessible UI (Radix UI).',
      'Data model with 13 entities (workspaces, projects, issues, etc.).',
    ],
    stats: [
      { value: '13', label: 'Data models' },
      { value: 'Kanban', label: 'Drag-and-drop boards' },
      { value: '100%', label: 'Responsive' },
    ],
  },
  es: {
    featuresTitle: 'Lo que hace la herramienta',
    features: [
      { icon: '🗂️', title: 'Workspaces & proyectos', description: 'Organización del trabajo por workspace y proyecto.' },
      { icon: '✅', title: 'Issues & hitos', description: 'Tareas, hitos, etiquetas y features.' },
      { icon: '📌', title: 'Kanban arrastrable', description: 'Tableros con arrastrar y soltar (dnd-kit).' },
      { icon: '⏱️', title: 'Time tracking', description: 'Registro y control de tiempo por tarea.' },
      { icon: '⌨️', title: 'Command palette', description: 'Navegación y acciones rápidas (cmdk).' },
      { icon: '🔐', title: 'Autenticación', description: 'Login y registro con NextAuth.' },
    ],
    highlightsTitle: 'La ingeniería detrás',
    highlights: [
      'Next.js full-stack (App Router + API routes) con Prisma.',
      'Autenticación NextAuth (Prisma adapter) y validación con Zod.',
      'Kanban con dnd-kit y UI accesible (Radix UI).',
      'Modelo de datos con 13 entidades (workspaces, proyectos, issues, etc.).',
    ],
    stats: [
      { value: '13', label: 'Modelos de datos' },
      { value: 'Kanban', label: 'Tableros arrastrables' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  it: {
    featuresTitle: 'Cosa fa lo strumento',
    features: [
      { icon: '🗂️', title: 'Workspace & progetti', description: 'Organizzazione del lavoro per workspace e progetto.' },
      { icon: '✅', title: 'Issue & milestone', description: 'Attività, milestone, label e feature.' },
      { icon: '📌', title: 'Kanban trascinabile', description: 'Board con drag-and-drop (dnd-kit).' },
      { icon: '⏱️', title: 'Time tracking', description: 'Registrazione e controllo del tempo per attività.' },
      { icon: '⌨️', title: 'Command palette', description: 'Navigazione e azioni rapide (cmdk).' },
      { icon: '🔐', title: 'Autenticazione', description: 'Login e registrazione con NextAuth.' },
    ],
    highlightsTitle: "L'ingegneria dietro",
    highlights: [
      'Next.js full-stack (App Router + API routes) con Prisma.',
      'Autenticazione NextAuth (Prisma adapter) e validazione con Zod.',
      'Kanban con dnd-kit e UI accessibile (Radix UI).',
      'Modello dati con 13 entità (workspace, progetti, issue, ecc.).',
    ],
    stats: [
      { value: '13', label: 'Modelli di dati' },
      { value: 'Kanban', label: 'Board trascinabili' },
      { value: '100%', label: 'Responsive' },
    ],
  },
};

const stylos: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que a loja faz',
    features: [
      { icon: '🛍️', title: 'Catálogo', description: 'Produtos com variantes: cores, tamanhos, marcas e categorias.' },
      { icon: '🛒', title: 'Carrinho', description: 'Carrinho persistente com recuperação de carrinho.' },
      { icon: '💳', title: 'Checkout MercadoPago', description: 'Pagamento integrado com estados de sucesso, falha e pendente.' },
      { icon: '🚚', title: 'Frete', description: 'Cálculo de frete no checkout.' },
      { icon: '🔐', title: 'Contas', description: 'Login, cadastro e verificação de e-mail (NextAuth).' },
      { icon: '🛠️', title: 'Painel admin', description: 'Gestão de produtos e pedidos.' },
    ],
    highlightsTitle: 'Engenharia por trás',
    highlights: [
      'Backend NestJS + Prisma (19 modelos) com arquitetura DDD.',
      'Pagamentos com MercadoPago e e-mails transacionais (SendGrid).',
      'Front Next.js com estado global (Zustand) e animações (GSAP).',
      'Fluxo completo: catálogo → carrinho → checkout → pedido.',
    ],
    stats: [
      { value: '19', label: 'Modelos de dados' },
      { value: 'MercadoPago', label: 'Pagamentos' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  en: {
    featuresTitle: 'What the store does',
    features: [
      { icon: '🛍️', title: 'Catalog', description: 'Products with variants: colors, sizes, brands and categories.' },
      { icon: '🛒', title: 'Cart', description: 'Persistent cart with cart recovery.' },
      { icon: '💳', title: 'MercadoPago checkout', description: 'Integrated payment with success, failure and pending states.' },
      { icon: '🚚', title: 'Shipping', description: 'Shipping calculation at checkout.' },
      { icon: '🔐', title: 'Accounts', description: 'Login, sign-up and email verification (NextAuth).' },
      { icon: '🛠️', title: 'Admin panel', description: 'Product and order management.' },
    ],
    highlightsTitle: 'The engineering behind it',
    highlights: [
      'NestJS + Prisma backend (19 models) with DDD architecture.',
      'MercadoPago payments and transactional emails (SendGrid).',
      'Next.js front with global state (Zustand) and animations (GSAP).',
      'Full flow: catalog → cart → checkout → order.',
    ],
    stats: [
      { value: '19', label: 'Data models' },
      { value: 'MercadoPago', label: 'Payments' },
      { value: '100%', label: 'Responsive' },
    ],
  },
  es: {
    featuresTitle: 'Lo que hace la tienda',
    features: [
      { icon: '🛍️', title: 'Catálogo', description: 'Productos con variantes: colores, tallas, marcas y categorías.' },
      { icon: '🛒', title: 'Carrito', description: 'Carrito persistente con recuperación de carrito.' },
      { icon: '💳', title: 'Checkout MercadoPago', description: 'Pago integrado con estados de éxito, fallo y pendiente.' },
      { icon: '🚚', title: 'Envío', description: 'Cálculo de envío en el checkout.' },
      { icon: '🔐', title: 'Cuentas', description: 'Login, registro y verificación de email (NextAuth).' },
      { icon: '🛠️', title: 'Panel admin', description: 'Gestión de productos y pedidos.' },
    ],
    highlightsTitle: 'La ingeniería detrás',
    highlights: [
      'Backend NestJS + Prisma (19 modelos) con arquitectura DDD.',
      'Pagos con MercadoPago y emails transaccionales (SendGrid).',
      'Front Next.js con estado global (Zustand) y animaciones (GSAP).',
      'Flujo completo: catálogo → carrito → checkout → pedido.',
    ],
    stats: [
      { value: '19', label: 'Modelos de datos' },
      { value: 'MercadoPago', label: 'Pagos' },
      { value: '100%', label: 'Responsivo' },
    ],
  },
  it: {
    featuresTitle: 'Cosa fa il negozio',
    features: [
      { icon: '🛍️', title: 'Catalogo', description: 'Prodotti con varianti: colori, taglie, marchi e categorie.' },
      { icon: '🛒', title: 'Carrello', description: 'Carrello persistente con recupero del carrello.' },
      { icon: '💳', title: 'Checkout MercadoPago', description: 'Pagamento integrato con stati di successo, errore e in attesa.' },
      { icon: '🚚', title: 'Spedizione', description: 'Calcolo della spedizione al checkout.' },
      { icon: '🔐', title: 'Account', description: 'Login, registrazione e verifica email (NextAuth).' },
      { icon: '🛠️', title: 'Pannello admin', description: 'Gestione di prodotti e ordini.' },
    ],
    highlightsTitle: "L'ingegneria dietro",
    highlights: [
      'Backend NestJS + Prisma (19 modelli) con architettura DDD.',
      'Pagamenti con MercadoPago ed email transazionali (SendGrid).',
      'Front Next.js con stato globale (Zustand) e animazioni (GSAP).',
      'Flusso completo: catalogo → carrello → checkout → ordine.',
    ],
    stats: [
      { value: '19', label: 'Modelli di dati' },
      { value: 'MercadoPago', label: 'Pagamenti' },
      { value: '100%', label: 'Responsive' },
    ],
  },
};

const vetor: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que o app faz',
    features: [
      { icon: '📂', title: 'Importação de .DEC', description: 'Lê arquivos de declaração do IRPF (Receita Federal).' },
      { icon: '🧾', title: 'Dados por CPF & exercício', description: 'Rendimentos tributáveis, isentos e de tributação exclusiva.' },
      { icon: '🔍', title: 'Conferência', description: 'Organiza e revisa as declarações por contribuinte.' },
      { icon: '💾', title: 'Offline & local', description: 'Armazenamento em SQLite (rusqlite), sem nuvem.' },
      { icon: '🔑', title: 'Licenciamento', description: 'Ativação por chave/JWT vinculada ao dispositivo.' },
      { icon: '🖥️', title: 'Desktop nativo', description: 'Tauri (Rust + React).' },
    ],
    highlightsTitle: 'Engenharia por trás',
    highlights: [
      'Cliente desktop em Tauri + Rust (nativo e leve), funciona offline.',
      'Importa e interpreta arquivos .DEC do IRPF e armazena em SQLite.',
      'Licenças vinculadas ao dispositivo (impressão digital da máquina + JWT).',
      'Backend de licenças em NestJS + Prisma/PostgreSQL.',
    ],
    stats: [
      { value: 'IRPF', label: 'Declarações .DEC' },
      { value: 'Rust', label: 'Núcleo nativo' },
      { value: 'Offline', label: 'SQLite local' },
    ],
  },
  en: {
    featuresTitle: 'What the app does',
    features: [
      { icon: '📂', title: '.DEC import', description: 'Reads IRPF (Brazilian income-tax) declaration files from Receita Federal.' },
      { icon: '🧾', title: 'Data by taxpayer & year', description: 'Taxable, exempt and exclusively-taxed income.' },
      { icon: '🔍', title: 'Review', description: 'Organizes and reviews returns per taxpayer.' },
      { icon: '💾', title: 'Offline & local', description: 'SQLite storage (rusqlite), no cloud.' },
      { icon: '🔑', title: 'Licensing', description: 'Key/JWT activation bound to the device.' },
      { icon: '🖥️', title: 'Native desktop', description: 'Tauri (Rust + React).' },
    ],
    highlightsTitle: 'The engineering behind it',
    highlights: [
      'Desktop client in Tauri + Rust (native, lightweight), works offline.',
      'Imports and parses IRPF .DEC files and stores them in SQLite.',
      'Device-bound licenses (machine fingerprint + JWT).',
      'NestJS + Prisma/PostgreSQL licensing backend.',
    ],
    stats: [
      { value: 'IRPF', label: '.DEC files' },
      { value: 'Rust', label: 'Native core' },
      { value: 'Offline', label: 'Local SQLite' },
    ],
  },
  es: {
    featuresTitle: 'Lo que hace la app',
    features: [
      { icon: '📂', title: 'Importación .DEC', description: 'Lee archivos de declaración de IRPF (Receita Federal).' },
      { icon: '🧾', title: 'Datos por CPF & ejercicio', description: 'Rentas gravables, exentas y de tributación exclusiva.' },
      { icon: '🔍', title: 'Revisión', description: 'Organiza y revisa las declaraciones por contribuyente.' },
      { icon: '💾', title: 'Offline & local', description: 'Almacenamiento en SQLite (rusqlite), sin nube.' },
      { icon: '🔑', title: 'Licenciamiento', description: 'Activación por clave/JWT vinculada al dispositivo.' },
      { icon: '🖥️', title: 'Escritorio nativo', description: 'Tauri (Rust + React).' },
    ],
    highlightsTitle: 'La ingeniería detrás',
    highlights: [
      'Cliente de escritorio en Tauri + Rust (nativo y ligero), funciona offline.',
      'Importa e interpreta archivos .DEC de IRPF y los guarda en SQLite.',
      'Licencias vinculadas al dispositivo (huella de la máquina + JWT).',
      'Backend de licencias en NestJS + Prisma/PostgreSQL.',
    ],
    stats: [
      { value: 'IRPF', label: 'Archivos .DEC' },
      { value: 'Rust', label: 'Núcleo nativo' },
      { value: 'Offline', label: 'SQLite local' },
    ],
  },
  it: {
    featuresTitle: 'Cosa fa la app',
    features: [
      { icon: '📂', title: 'Import .DEC', description: 'Legge i file di dichiarazione IRPF (Receita Federal).' },
      { icon: '🧾', title: 'Dati per CPF & esercizio', description: 'Redditi imponibili, esenti e a tassazione esclusiva.' },
      { icon: '🔍', title: 'Revisione', description: 'Organizza e revisiona le dichiarazioni per contribuente.' },
      { icon: '💾', title: 'Offline & locale', description: 'Archiviazione in SQLite (rusqlite), senza cloud.' },
      { icon: '🔑', title: 'Licenze', description: 'Attivazione con chiave/JWT legata al dispositivo.' },
      { icon: '🖥️', title: 'Desktop nativo', description: 'Tauri (Rust + React).' },
    ],
    highlightsTitle: "L'ingegneria dietro",
    highlights: [
      'Client desktop in Tauri + Rust (nativo e leggero), funziona offline.',
      "Importa e interpreta i file .DEC dell'IRPF e li archivia in SQLite.",
      'Licenze legate al dispositivo (impronta della macchina + JWT).',
      'Backend di licenze in NestJS + Prisma/PostgreSQL.',
    ],
    stats: [
      { value: 'IRPF', label: 'File .DEC' },
      { value: 'Rust', label: 'Core nativo' },
      { value: 'Offline', label: 'SQLite locale' },
    ],
  },
};

const salaoLoha: Record<string, ProjectDetailContent> = {
  'pt-BR': {
    featuresTitle: 'O que o site entrega',
    features: [
      { icon: '💇', title: 'Serviços', description: 'Vitrine dos serviços de estética e beleza.' },
      { icon: '🖼️', title: 'Portfólio', description: 'Galeria de trabalhos com lightbox (FancyBox).' },
      { icon: '📅', title: 'Calendário animado', description: 'Destaque de horários e agenda.' },
      { icon: '📍', title: 'Localização', description: 'Mapa e informações de contato.' },
      { icon: '✨', title: 'Animações', description: 'Lottie, AOS e LordIcon.' },
    ],
    highlightsTitle: 'Destaques de construção',
    highlights: [
      'Single-page estático (HTML/CSS/JS) — sem build, ultrarrápido.',
      'Bootstrap 5 responsivo com animações Lottie/AOS.',
      'Deploy contínuo na Vercel.',
    ],
    stats: [
      { value: 'SPA', label: 'Single-page' },
      { value: '100%', label: 'Responsivo' },
      { value: 'Lottie', label: 'Animações' },
    ],
  },
  en: {
    featuresTitle: 'What the site delivers',
    features: [
      { icon: '💇', title: 'Services', description: 'Showcase of beauty and aesthetics services.' },
      { icon: '🖼️', title: 'Portfolio', description: 'Work gallery with a lightbox (FancyBox).' },
      { icon: '📅', title: 'Animated calendar', description: 'Schedule and hours highlight.' },
      { icon: '📍', title: 'Location', description: 'Map and contact information.' },
      { icon: '✨', title: 'Animations', description: 'Lottie, AOS and LordIcon.' },
    ],
    highlightsTitle: 'Build highlights',
    highlights: [
      'Static single-page (HTML/CSS/JS) — no build, ultra-fast.',
      'Responsive Bootstrap 5 with Lottie/AOS animations.',
      'Continuous deploy on Vercel.',
    ],
    stats: [
      { value: 'SPA', label: 'Single-page' },
      { value: '100%', label: 'Responsive' },
      { value: 'Lottie', label: 'Animations' },
    ],
  },
  es: {
    featuresTitle: 'Lo que ofrece el sitio',
    features: [
      { icon: '💇', title: 'Servicios', description: 'Vitrina de servicios de estética y belleza.' },
      { icon: '🖼️', title: 'Portafolio', description: 'Galería de trabajos con lightbox (FancyBox).' },
      { icon: '📅', title: 'Calendario animado', description: 'Destaque de horarios y agenda.' },
      { icon: '📍', title: 'Ubicación', description: 'Mapa e información de contacto.' },
      { icon: '✨', title: 'Animaciones', description: 'Lottie, AOS y LordIcon.' },
    ],
    highlightsTitle: 'Aspectos destacados',
    highlights: [
      'Single-page estático (HTML/CSS/JS) — sin build, ultrarrápido.',
      'Bootstrap 5 responsivo con animaciones Lottie/AOS.',
      'Despliegue continuo en Vercel.',
    ],
    stats: [
      { value: 'SPA', label: 'Single-page' },
      { value: '100%', label: 'Responsivo' },
      { value: 'Lottie', label: 'Animaciones' },
    ],
  },
  it: {
    featuresTitle: 'Cosa offre il sito',
    features: [
      { icon: '💇', title: 'Servizi', description: 'Vetrina dei servizi di estetica e bellezza.' },
      { icon: '🖼️', title: 'Portfolio', description: 'Galleria di lavori con lightbox (FancyBox).' },
      { icon: '📅', title: 'Calendario animato', description: 'Evidenza di orari e agenda.' },
      { icon: '📍', title: 'Posizione', description: 'Mappa e informazioni di contatto.' },
      { icon: '✨', title: 'Animazioni', description: 'Lottie, AOS e LordIcon.' },
    ],
    highlightsTitle: 'Punti salienti',
    highlights: [
      'Single-page statico (HTML/CSS/JS) — senza build, ultrarapido.',
      'Bootstrap 5 responsive con animazioni Lottie/AOS.',
      'Deploy continuo su Vercel.',
    ],
    stats: [
      { value: 'SPA', label: 'Single-page' },
      { value: '100%', label: 'Responsive' },
      { value: 'Lottie', label: 'Animazioni' },
    ],
  },
};

export const PROJECT_DETAILS: Record<string, Record<string, ProjectDetailContent>> = {
  'revalida-italia': revalida,
  'manon-ruivo': manon,
  'flavia-guedes': flavia,
  'kundalini-activation': kundalini,
  'wb-crm': wbcrm,
  'ai-agents': aiAgents,
  'konnen': konnen,
  'calendar': calendar,
  'financas': financas,
  'salto': salto,
  'wb-project-manager': projectManager,
  'stylos': stylos,
  'vetor': vetor,
  'salao-loha': salaoLoha,
};

export function getProjectDetail(slug: string | undefined, language: string): ProjectDetailContent | null {
  if (!slug) return null;
  const byLang = PROJECT_DETAILS[slug];
  if (!byLang) return null;
  const key = language === 'pt' ? 'pt-BR' : language;
  return byLang[key] ?? byLang.en ?? null;
}
