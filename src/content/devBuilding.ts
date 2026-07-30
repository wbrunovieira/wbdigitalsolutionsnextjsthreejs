/**
 * Content for the DEV CV "Building now" section: a single product in ACTIVE
 * development (not shipped, no real users). Kept honest by design — a clear
 * "in development" badge plus two separated lists (what already runs vs what is
 * only designed/planned). Localized per CVLang; data file (exempt from the
 * 200-line rule). Independent from the Sales page (never shared).
 */

import type { CVLang } from '@/content/cv';

export interface DevBuildingContent {
  /** Short mono eyebrow above the section title. */
  eyebrow: string;
  sectionTitle: string;
  sectionIntro: string;
  /** "In development" badge on the card. */
  badge: string;
  name: string;
  /** One-line differentiator. */
  tagline: string;
  description: string;
  /** Honesty note: not in production, no users. */
  note: string;
  builtTitle: string;
  built: string[];
  roadmapTitle: string;
  roadmap: string[];
  stack: string[];
}

export const devBuilding: Record<CVLang, DevBuildingContent> = {
  'pt-BR': {
    eyebrow: 'Em construção',
    sectionTitle: 'Construindo agora.',
    sectionIntro:
      'Um produto que estou desenvolvendo agora. Ainda não está em produção nem tem usuários reais, mas mostra como penso produto e engenharia: o que já roda e o que está desenhado, separados com honestidade.',
    badge: 'Em desenvolvimento',
    name: 'Treino Aliado',
    tagline:
      'O diferencial: em modalidades com currículo, como o jiu-jitsu, a presença revela quais técnicas cada aluno já viu e sinaliza risco de churn, para crescer e reter alunos, não só guardar dados.',
    description:
      'SaaS multi-tenant para gerir academias de ponta a ponta, com modalidades configuráveis por academia: de artes marciais (jiu-jitsu) a musculação e outras atividades. Gere a academia, os alunos e os treinos, num modelo de mini-startup: página de vendas, checkout self-service e provisionamento automático de um subdomínio por academia.',
    note: 'Ainda não em produção, sem usuários reais.',
    builtTitle: 'Já construído e testado',
    built: [
      'Multi-tenancy e identidade (o contexto mais maduro): academia como tenant resolvido por Host, pessoas, papéis (dono/professor/aluno), JWT Ed25519 verificado localmente, refresh tokens rotativos com detecção de reuso, idempotência e hashing argon2.',
      'Alunos: perfis, histórico de faixas e graduações, planos e status de matrícula.',
      'Treinos: aulas ad-hoc e recorrentes, check-in de presença idempotente, técnicas dadas por aula e comentários privados do professor por aluno.',
      'Modalidades: catálogo configurável por academia (de jiu-jitsu a musculação e outras atividades); é o que permite servir academias de perfis diferentes.',
      'Insights (o diferencial): read-model (CQRS) via outbox transacional que deriva a cobertura de técnicas de cada aluno, streaks e progresso.',
      'Qualidade: API contract-first (OpenAPI) com gate de drift no CI, testes de integração HTTP→Postgres e CI com lint, vet e gitleaks. 19 ADRs e docs de design.',
    ],
    roadmapTitle: 'Desenhado, no roadmap',
    roadmap: [
      'Pagamentos: Asaas (aluno→academia) e Mercado Pago (academia→plataforma).',
      'Broker de eventos (RabbitMQ) com DLQ.',
      'Serviço de comunidade (feed e posts) em NestJS.',
      'Upload de mídia com CDN; cache e rate-limit com Redis.',
      'App do aluno em React Native.',
      'Site de marketing com checkout self-service e provisionamento automático de tenant.',
      'White-label e temas por academia; isolamento com Postgres RLS.',
    ],
    stack: ['Go', 'DDD', 'Arquitetura hexagonal', 'PostgreSQL', 'CQRS', 'Next.js', 'Caddy', 'Docker', 'OpenAPI'],
  },
  en: {
    eyebrow: 'Building',
    sectionTitle: 'Building now.',
    sectionIntro:
      'A product I am building right now. It is not in production yet and has no real users, but it shows how I think about product and engineering: what already runs and what is designed, honestly separated.',
    badge: 'In development',
    name: 'Treino Aliado',
    tagline:
      'The differentiator: for curriculum-based modalities like jiu-jitsu, attendance reveals which techniques each student has already seen and flags churn risk, to grow and retain students, not just store data.',
    description:
      'A multi-tenant SaaS to run academies end to end, with per-academy configurable modalities: from martial arts (jiu-jitsu) to weight training and other activities. It manages the academy, the students and the training, in a mini-startup model: sales page, self-service checkout and automatic provisioning of a subdomain per academy.',
    note: 'Not in production yet, no real users.',
    builtTitle: 'Already built and tested',
    built: [
      'Multi-tenancy and identity (the most mature context): academy as a Host-resolved tenant, people, roles (owner/professor/student), locally verified Ed25519 JWTs, rotating refresh tokens with reuse detection, idempotency and argon2 hashing.',
      'Students: profiles, belt and graduation history, plans and membership status.',
      'Training: ad-hoc and recurring classes, idempotent attendance check-in, techniques taught per class and private per-student professor comments.',
      'Modalities: per-academy configurable catalog (from jiu-jitsu to weight training and other activities); this is what lets the platform serve academies of different kinds.',
      "Insights (the differentiator): a read-model (CQRS) via a transactional outbox that derives each student's technique coverage, streaks and progress.",
      'Quality: contract-first API (OpenAPI) with a CI drift gate, HTTP→Postgres integration tests and CI with lint, vet and gitleaks. 19 ADRs and design docs.',
    ],
    roadmapTitle: 'Designed, on the roadmap',
    roadmap: [
      'Payments: Asaas (student→academy) and Mercado Pago (academy→platform).',
      'Event broker (RabbitMQ) with a DLQ.',
      'Community service (feed and posts) in NestJS.',
      'Media upload with CDN; caching and rate-limiting with Redis.',
      'Student app in React Native.',
      'Marketing site with self-service checkout and automatic tenant provisioning.',
      'White-label and per-academy theming; isolation with Postgres RLS.',
    ],
    stack: ['Go', 'DDD', 'Hexagonal architecture', 'PostgreSQL', 'CQRS', 'Next.js', 'Caddy', 'Docker', 'OpenAPI'],
  },
  it: {
    eyebrow: 'In costruzione',
    sectionTitle: 'In costruzione ora.',
    sectionIntro:
      "Un prodotto che sto sviluppando ora. Non è ancora in produzione e non ha utenti reali, ma mostra come penso al prodotto e all'ingegneria: ciò che già funziona e ciò che è progettato, separati con onestà.",
    badge: 'In sviluppo',
    name: 'Treino Aliado',
    tagline:
      'Il differenziale: per le modalità con un programma, come il jiu-jitsu, la presenza rivela quali tecniche ogni allievo ha già visto e segnala il rischio di abbandono, per far crescere e trattenere gli allievi, non solo archiviare dati.',
    description:
      'Un SaaS multi-tenant per gestire palestre end-to-end, con modalità configurabili per palestra: dalle arti marziali (jiu-jitsu) alla sala pesi e altre attività. Gestisce la palestra, gli allievi e gli allenamenti, con un modello mini-startup: pagina di vendita, checkout self-service e provisioning automatico di un sottodominio per palestra.',
    note: 'Non ancora in produzione, senza utenti reali.',
    builtTitle: 'Già costruito e testato',
    built: [
      'Multi-tenancy e identità (il contesto più maturo): palestra come tenant risolto per Host, persone, ruoli (titolare/istruttore/allievo), JWT Ed25519 verificati localmente, refresh token rotanti con rilevamento del riuso, idempotenza e hashing argon2.',
      'Allievi: profili, storico di cinture e gradi, piani e stato di iscrizione.',
      "Allenamenti: lezioni ad-hoc e ricorrenti, check-in delle presenze idempotente, tecniche insegnate per lezione e commenti privati dell'istruttore per allievo.",
      'Modalità: catalogo configurabile per palestra (dal jiu-jitsu alla sala pesi e altre attività); è ciò che permette di servire palestre di tipi diversi.',
      'Insights (il differenziale): read-model (CQRS) tramite outbox transazionale che deduce la copertura delle tecniche di ogni allievo, streak e progresso.',
      'Qualità: API contract-first (OpenAPI) con gate di drift nella CI, test di integrazione HTTP→Postgres e CI con lint, vet e gitleaks. 19 ADR e documenti di design.',
    ],
    roadmapTitle: 'Progettato, nella roadmap',
    roadmap: [
      'Pagamenti: Asaas (allievo→palestra) e Mercado Pago (palestra→piattaforma).',
      'Broker di eventi (RabbitMQ) con DLQ.',
      'Servizio community (feed e post) in NestJS.',
      'Upload di media con CDN; cache e rate-limit con Redis.',
      "App dell'allievo in React Native.",
      'Sito di marketing con checkout self-service e provisioning automatico del tenant.',
      'White-label e temi per palestra; isolamento con Postgres RLS.',
    ],
    stack: ['Go', 'DDD', 'Architettura esagonale', 'PostgreSQL', 'CQRS', 'Next.js', 'Caddy', 'Docker', 'OpenAPI'],
  },
  es: {
    eyebrow: 'Construyendo',
    sectionTitle: 'Construyendo ahora.',
    sectionIntro:
      'Un producto que estoy desarrollando ahora. Todavía no está en producción ni tiene usuarios reales, pero muestra cómo pienso el producto y la ingeniería: lo que ya funciona y lo que está diseñado, separados con honestidad.',
    badge: 'En desarrollo',
    name: 'Treino Aliado',
    tagline:
      'El diferencial: en modalidades con programa, como el jiu-jitsu, la asistencia revela qué técnicas ha visto cada alumno y señala el riesgo de abandono, para crecer y retener alumnos, no solo guardar datos.',
    description:
      'Un SaaS multi-tenant para gestionar academias de punta a punta, con modalidades configurables por academia: desde artes marciales (jiu-jitsu) hasta musculación y otras actividades. Gestiona la academia, los alumnos y los entrenamientos, en un modelo de mini-startup: página de ventas, checkout self-service y aprovisionamiento automático de un subdominio por academia.',
    note: 'Todavía no en producción, sin usuarios reales.',
    builtTitle: 'Ya construido y probado',
    built: [
      'Multi-tenancy e identidad (el contexto más maduro): academia como tenant resuelto por Host, personas, roles (dueño/profesor/alumno), JWT Ed25519 verificados localmente, refresh tokens rotativos con detección de reuso, idempotencia y hashing argon2.',
      'Alumnos: perfiles, historial de cinturones y graduaciones, planes y estado de membresía.',
      'Entrenamientos: clases ad-hoc y recurrentes, check-in de asistencia idempotente, técnicas dadas por clase y comentarios privados del profesor por alumno.',
      'Modalidades: catálogo configurable por academia (desde jiu-jitsu hasta musculación y otras actividades); es lo que permite servir academias de distintos perfiles.',
      'Insights (el diferencial): read-model (CQRS) vía outbox transaccional que deduce la cobertura de técnicas de cada alumno, streaks y progreso.',
      'Calidad: API contract-first (OpenAPI) con gate de drift en el CI, tests de integración HTTP→Postgres y CI con lint, vet y gitleaks. 19 ADRs y docs de diseño.',
    ],
    roadmapTitle: 'Diseñado, en el roadmap',
    roadmap: [
      'Pagos: Asaas (alumno→academia) y Mercado Pago (academia→plataforma).',
      'Broker de eventos (RabbitMQ) con DLQ.',
      'Servicio de comunidad (feed y posts) en NestJS.',
      'Subida de medios con CDN; caché y rate-limit con Redis.',
      'App del alumno en React Native.',
      'Sitio de marketing con checkout self-service y aprovisionamiento automático de tenant.',
      'White-label y temas por academia; aislamiento con Postgres RLS.',
    ],
    stack: ['Go', 'DDD', 'Arquitectura hexagonal', 'PostgreSQL', 'CQRS', 'Next.js', 'Caddy', 'Docker', 'OpenAPI'],
  },
};
