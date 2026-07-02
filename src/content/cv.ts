/**
 * Content for the personal CV pages. Self-contained, NOT in the marketing
 * locale JSON bundles. Four locales: en, pt-BR, it, es.
 *
 * Rendered by two single-track pages (no toggle), one per subdomain:
 *   engineering → brunodev.wbdigitalsolutions.com (/dev)
 *   sales       → brunov.wbdigitalsolutions.com   (/vendas)
 * Experiences/projects carry audience-keyed bullets + a `summary` fallback so
 * each page shows the right depth for its track.
 */

export type CVLang = "en" | "pt-BR" | "it" | "es";
export type Audience = "engineering" | "sales";
type ItemAudience = Audience | "both";

/** Stable stat ids for the headline stats strip — used for icon mapping, never translated. */
export type StatId =
  | "years"
  | "tests"
  | "spoken"
  | "stack"
  | "e2e"
  | "coverage"
  | "accounts"
  | "markets";

export interface CVExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  audience: ItemAudience;
  /** One-line condensed summary, shown when the active audience has no bullets. */
  summary: string;
  /** Bullets per audience — a job may have only engineering, only sales, or both. */
  bullets: Partial<Record<Audience, string[]>>;
  tags?: string[];
}

export interface CVProject {
  /** Stable, language-independent identifier for icon/accent mapping. */
  id: "revalida" | "crm" | "site";
  name: string;
  blurb: string;
  highlights: string[];
  tech: string[];
}

/** Stable category keys for stack groups — used to map icons regardless of locale label. */
export type StackKey = "languages" | "frontend" | "backend" | "ai" | "devops";

export interface CVSkillGroup {
  key: StackKey;
  label: string;
  items: string[];
}

export interface CVEducation {
  school: string;
  detail: string;
  year: string;
}

export interface CVLanguageSkill {
  /** Stable key for proficiency bar (locale-independent). */
  code: "pt" | "en" | "it" | "es";
  name: string;
  level: string;
  /** Proficiency 0–100 for the visual bar. */
  proficiency: number;
}

export interface CVContent {
  name: string;
  fullName: string;
  headline: string;
  location: string;
  available: string;

  toggle: { intro: string; hint: string; engineering: string; sales: string };

  hero: Record<Audience, { title: string; sub: string; support: string; pills: string[] }>;

  sections: {
    summary: string;
    story: string;
    experience: string;
    projects: string;
    stack: string;
    sales: string;
    education: string;
    languages: string;
    contact: string;
  };

  summary: Record<Audience, string>;
  story: string[];

  /** Headline numbers for the stats strip — per audience. `id` is stable for icon mapping. */
  stats: Record<Audience, { id: StatId; value: string; label: string }[]>;

  experience: CVExperience[];
  projects: CVProject[];
  stack: CVSkillGroup[];
  salesHighlights: string[];
  education: CVEducation[];
  languages: CVLanguageSkill[];

  contact: { ctaTitle: string; ctaSub: string; emailLabel: string; linkedinLabel: string; githubLabel: string; siteLabel: string; resumeLabel: string; downloadCv: string };

  /** One-line pitch about the OTHER career, shown as a differentiator band. Keyed by the CURRENT page's track. */
  crossPitch: Record<Audience, string>;
  /** Link label to the other track's page (other subdomain). Keyed by the CURRENT page's track. */
  crossLinkLabel: Record<Audience, string>;
  /** Short role word(s) rendered oversized behind the hero portrait, per track. */
  bigRole: Record<Audience, string>;
  /** Phrases the oversized sales hero headline cycles through. */
  heroRotation: string[];
  /** Short availability line for the sales hero chip. */
  heroAvailable: string;
  /** The three value-pillar labels (product / need / person). */
  heroPillars: string[];
  /** The tagline payoff pre-split into display lines (keeps commas/articles). */
  taglinePayoff: string[];
  /** Personal greeting prefix shown before the name (e.g. "Olá, sou o"). */
  heroGreeting: string;
  /** Header nav labels for the sales page sections. */
  nav: { start: string; timeline: string; skills: string; education: string; languages: string; about: string; contact: string };
}

/** Non-translatable shared data. */
export const cvLinks = {
  email: "wbrunovieira@yahoo.com.br",
  phone: "+5511982864581",
  phoneDisplay: "+55 11 98286-4581",
  whatsapp: "https://wa.me/5511982864581",
  linkedin: "https://www.linkedin.com/in/walter-bruno-vieira",
  github: "https://github.com/wbrunovieira",
  site: "https://www.wbdigitalsolutions.com",
};

export const cvContent: Record<CVLang, CVContent> = {
  en: {
    name: "Bruno Vieira",
    fullName: "Walter Bruno Prado Vieira",
    headline: "Senior Full-Stack & AI Engineer · Technical Sales",
    location: "São Paulo, Brazil",
    available: "Open to engineering & commercial roles — remote, or relocation with visa sponsorship",
    toggle: { intro: "What are you hiring for?", hint: "Switch anytime — the whole page adapts.", engineering: "Engineering", sales: "Sales" },
    hero: {
      engineering: {
        title: "I turn complex problems into software that scales.",
        sub: "Senior Full-Stack & AI Engineer",
        support:
          "Scalable platforms, AI-powered systems and interactive 3D — owning everything from architecture to deployment.",
        pills: ["React / Next.js", "Node / NestJS", "AI · LangGraph", "AWS · Docker · K8s"],
      },
      sales: {
        title: "Selling is understanding: the product, the need, and the person.",
        sub: "Technical Sales & Business Development",
        support:
          "25+ years in B2B sales — enterprise accounts, the full commercial cycle, and the technical depth that closes deals.",
        pills: ["B2B Sales", "Enterprise Accounts", "Full Cycle", "BR · IT · US"],
      },
    },
    sections: {
      summary: "Summary",
      story: "From the sales floor to system architecture",
      experience: "Experience",
      projects: "Selected work",
      stack: "Stack",
      sales: "Commercial track record",
      education: "Education & certifications",
      languages: "Languages",
      contact: "Let's talk",
    },
    summary: {
      engineering:
        "Senior Full-Stack and AI engineer with a product mindset. I build scalable platforms, AI-powered systems and interactive 3D experiences that are technically deep and focused on real users — TypeScript, React/Next.js, Node/NestJS, with DDD and hexagonal architecture, plus Python, Go and Rust on the backend. I integrate AI into real products (LangGraph, LangChain, RAG, agents) and ship cloud-native on AWS with Docker, Terraform and Kubernetes.",
      sales:
        "Technical sales and business-development leader with 25+ years in B2B — from selling industrial equipment to enterprise accounts (Reckitt Benckiser, Carrefour, Colgate) to business development at Adobe, and today running the full commercial cycle for my own studio. I speak both engineering and business, so I scope, price, negotiate and close — and then build the solution myself.",
    },
    stats: {
      engineering: [
        { id: "tests", value: "8,000+", label: "unit tests shipped" },
        { id: "e2e", value: "4,000+", label: "E2E tests" },
        { id: "stack", value: "5+", label: "programming languages" },
        { id: "coverage", value: "80%+", label: "test coverage" },
      ],
      sales: [
        { id: "years", value: "25+", label: "years in B2B sales" },
        { id: "accounts", value: "4+", label: "enterprise accounts" },
        { id: "markets", value: "3", label: "markets · BR · IT · US" },
        { id: "spoken", value: "4", label: "languages spoken" },
      ],
    },
    story: [
      "My path is unusual: I started in commercial and creative work, spent 25+ years in B2B sales, and became a software engineer — so I can sit on either side of the table.",
      "Design in Italy and business development at Adobe taught me how buyers think. Eight years of consultative technical sales at Retrak taught me to turn requirements into solutions.",
      "Then I learned to build them. Today I architect, code and ship full products end to end — and I still own the commercial cycle. I sell what I build, and I build what I sell.",
    ],
    experience: [
      {
        company: "WB Digital Solutions",
        role: "Full-Stack Software Engineer (Founder)",
        period: "Feb 2023 — Present",
        location: "São Paulo, Brazil",
        audience: "both",
        summary: "Founder-engineer building and selling full-stack products end to end.",
        bullets: {
          engineering: [
            "Design and ship full-stack products — React/Next.js on the front; Node/TypeScript, Python, Go and Rust on the back — with Domain-Driven Design and clean architecture.",
            "Cloud-native delivery on AWS with Docker, Infrastructure as Code (Terraform, Ansible) and Linux; UI/UX and product thinking baked in.",
            "Built Revalida Italia from scratch: a full e-learning platform with 8,000+ unit and 4,000+ E2E tests, Hotmart/Panda Video/Zoom integrations and 3D learning with Three.js.",
            "Built a production-grade B2B CRM: VoIP click-to-call with AI transcription, 8+ LangGraph agent pipelines, omnichannel WhatsApp/Gmail/Meet, on NestJS with 80%+ coverage.",
          ],
          sales: [
            "Run the full commercial cycle — prospecting, discovery, scoping, proposals, pricing, negotiation and closing — with SMB clients in Brazil, Italy and the US.",
            "Grow accounts by upselling new packages on delivered products, from landing pages to multi-month platforms.",
            "Built a CRM that automates my own sales process — AI lead qualification, automated proposals and financial analysis. I sell, and I build the tool that sells.",
          ],
        },
        tags: ["TypeScript", "Next.js", "NestJS", "AI / LangGraph", "AWS", "Three.js"],
      },
      {
        company: "Retrak Empilhadeiras",
        role: "Technical Sales Specialist",
        period: "Mar 2009 — Jul 2017",
        location: "São Paulo, Brazil",
        audience: "sales",
        summary: "8 years of consultative B2B technical sales — enterprise accounts (Reckitt Benckiser, Carrefour, Colgate).",
        bullets: {
          sales: [
            "B2B technical sales for a market-leading forklift brand across Greater São Paulo, the company's primary market.",
            "Sold new equipment and closed large, long-term rental contracts at high volume.",
            "Managed SMB-to-enterprise accounts including Reckitt Benckiser, Carrefour, Colgate and Droga Raia.",
            "Consultative, solution-oriented selling: technical sizing and configuration for distribution centers and retail networks.",
            "Consistently met and exceeded sales targets.",
          ],
        },
        tags: ["Enterprise Accounts", "Consultative Selling", "Contracts"],
      },
      {
        company: "Adobe",
        role: "Commercial Specialist",
        period: "Feb 2005 — Jan 2006",
        location: "São Paulo, Brazil",
        audience: "sales",
        summary: "Business development and software licensing for enterprise and education clients.",
        bullets: {
          sales: [
            "Business development and software-licensing strategy for enterprise and education clients.",
            "Worked with distributors and resellers to expand adoption and manage key accounts.",
            "Led negotiations and represented the brand at industry events.",
          ],
        },
        tags: ["Business Development", "Licensing", "Key Accounts"],
      },
      {
        company: "LM Grafics",
        role: "Graphic & Web Designer",
        period: "Dec 2007 — Nov 2008",
        location: "Italy",
        audience: "both",
        summary: "Graphic and web design in Italy — the visual-communication roots of today's product/UI work.",
        bullets: {
          engineering: [
            "Designed websites, brochures and visual materials for digital and print.",
            "Built strong foundations in visual communication, usability and layout — the roots of today's product/UI work.",
          ],
        },
        tags: ["Design", "UI/UX", "Web"],
      },
    ],
    projects: [
      {
        id: "revalida",
        name: "Revalida Italia",
        blurb: "A full online learning platform built from scratch for the Italian medical-revalidation market.",
        highlights: ["8,000+ unit tests, 4,000+ E2E", "Hotmart, Panda Video & Zoom integrations", "3D learning experiences with Three.js"],
        tech: ["Next.js", "NestJS", "DDD", "Three.js", "AWS"],
      },
      {
        id: "crm",
        name: "B2B CRM with AI",
        blurb: "A production-grade CRM that automates the sales process I run myself.",
        highlights: ["8+ LangGraph agent pipelines", "AI call transcription & lead qualification", "Omnichannel: WhatsApp, Gmail, Meet · 80%+ coverage"],
        tech: ["NestJS", "LangGraph", "Hexagonal", "Ansible"],
      },
      {
        id: "site",
        name: "This site (wbdigitalsolutions.com)",
        blurb: "The studio site itself — a scroll-driven 3D experience and a live proof of the stack.",
        highlights: ["Scroll-driven Three.js heroes", "Lighthouse Perf 90+ · SEO/A11y 100", "i18n in 4 languages"],
        tech: ["Next.js", "React Three Fiber", "GSAP", "Tailwind"],
      },
    ],
    stack: [
      { key: "languages", label: "Languages", items: ["TypeScript", "JavaScript", "Python", "Go", "Rust"] },
      { key: "frontend", label: "Frontend", items: ["React", "Next.js", "Three.js / R3F", "GSAP", "Tailwind"] },
      { key: "backend", label: "Backend", items: ["Node.js", "NestJS", "DDD", "Hexagonal Architecture", "REST / APIs"] },
      { key: "ai", label: "AI", items: ["LangGraph", "LangChain", "RAG", "Agent pipelines"] },
      { key: "devops", label: "Cloud & DevOps", items: ["AWS", "Docker", "Terraform", "Kubernetes", "Ansible", "Linux"] },
    ],
    salesHighlights: [
      "25+ years in B2B sales across industrial, software and digital services.",
      "Enterprise accounts: Reckitt Benckiser, Carrefour, Colgate, Droga Raia.",
      "Full commercial cycle — prospecting to closing — across Brazil, Italy and the US.",
      "Business development & software licensing at Adobe (distributors, resellers, key accounts).",
      "Consistently met and exceeded targets; high-volume equipment sales and long-term contracts.",
      "Rare edge: I scope and price the deal, then build the solution myself.",
    ],
    education: [
      { school: "Full Cycle", detail: "Software Engineering — System Architecture (specialization)", year: "2023" },
      { school: "Data Science Academy (DSA)", detail: "Artificial Intelligence Engineering", year: "2023" },
      { school: "Rocketseat", detail: "Immersive Node.js, React & React Native", year: "2021–2023" },
      { school: "Three.js Journey (Bruno Simon)", detail: "WebGL / Three.js for the web", year: "2023–2024" },
      { school: "GreenSock (GSAP)", detail: "Creative animation for the web", year: "2024" },
    ],
    languages: [
      { code: "pt", name: "Portuguese", level: "Native / Bilingual", proficiency: 100 },
      { code: "en", name: "English", level: "Full Professional", proficiency: 90 },
      { code: "it", name: "Italian", level: "Full Professional", proficiency: 90 },
      { code: "es", name: "Spanish", level: "Professional Working", proficiency: 75 },
    ],
    contact: {
      ctaTitle: "Let's build or close something.",
      ctaSub: "The fastest way to reach me:",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      siteLabel: "Studio",
      resumeLabel: "WhatsApp",
      downloadCv: "Download CV",
    },
    crossPitch: {
      engineering:
        "Beyond the code: 25+ years closing B2B sales — I speak the customer's and the business's language, not just the compiler's.",
      sales:
        "And I build what I sell: a full-stack engineer who ships the product himself — the technical depth that closes complex deals.",
    },
    crossLinkLabel: {
      engineering: "See my sales profile",
      sales: "See my engineering profile",
    },
    bigRole: {
      engineering: "Software Engineer",
      sales: "Technical Sales",
    },
    heroRotation: ["Technical Sales", "Solution Selling", "Key Accounts", "SMBs", "Relationships", "New Markets"],
    heroAvailable: "Open to commercial opportunities",
    heroPillars: ["Product", "Need", "Person"],
    taglinePayoff: ["the product,", "the need,", "and the person."],
    heroGreeting: "Hi, I'm",
    nav: { start: "Home", timeline: "Journey", skills: "Skills", education: "Education", languages: "Languages", about: "About", contact: "Contact" },
  },

  "pt-BR": {
    name: "Bruno Vieira",
    fullName: "Walter Bruno Prado Vieira",
    headline: "Engenheiro Full-Stack & IA Sênior · Vendas Técnicas",
    location: "São Paulo, Brasil",
    available: "Aberto a vagas de engenharia e comerciais — remoto, ou realocação com patrocínio de visto",
    toggle: { intro: "O que você está contratando?", hint: "Alterne quando quiser — a página inteira se adapta.", engineering: "Engenharia", sales: "Vendas" },
    hero: {
      engineering: {
        title: "Eu transformo problemas complexos em software que escala.",
        sub: "Engenheiro Full-Stack & IA Sênior",
        support:
          "Plataformas escaláveis, sistemas com IA e 3D interativo — dono de tudo, da arquitetura ao deploy.",
        pills: ["React / Next.js", "Node / NestJS", "IA · LangGraph", "AWS · Docker · K8s"],
      },
      sales: {
        title: "Vender é entender: o produto, a necessidade e a pessoa.",
        sub: "Vendas Técnicas & Desenvolvimento Comercial",
        support:
          "25+ anos em vendas B2B — contas enterprise, ciclo comercial completo e a profundidade técnica que fecha negócio.",
        pills: ["Vendas B2B", "Contas Enterprise", "Ciclo Completo", "BR · IT · US"],
      },
    },
    sections: {
      summary: "Resumo",
      story: "Do balcão à arquitetura de sistemas",
      experience: "Experiência",
      projects: "Trabalhos selecionados",
      stack: "Stack",
      sales: "Trajetória comercial",
      education: "Formação & certificações",
      languages: "Idiomas",
      contact: "Vamos conversar",
    },
    summary: {
      engineering:
        "Engenheiro Full-Stack e de IA sênior com mentalidade de produto. Construo plataformas escaláveis, sistemas com IA e experiências 3D interativas — tecnicamente profundas e focadas no usuário real — com TypeScript, React/Next.js, Node/NestJS, DDD e arquitetura hexagonal, além de Python, Go e Rust no backend. Integro IA em produtos reais (LangGraph, LangChain, RAG, agentes) e entrego cloud-native na AWS com Docker, Terraform e Kubernetes.",
      sales:
        "Líder de vendas técnicas e desenvolvimento comercial com 25+ anos em B2B — de equipamentos industriais para contas enterprise (Reckitt Benckiser, Carrefour, Colgate) ao business development na Adobe, e hoje conduzindo o ciclo comercial completo do meu próprio estúdio. Falo a língua da engenharia e a do negócio: faço escopo, precifico, negocio e fecho — e depois construo a solução.",
    },
    stats: {
      engineering: [
        { id: "tests", value: "8.000+", label: "testes unitários entregues" },
        { id: "e2e", value: "4.000+", label: "testes E2E" },
        { id: "stack", value: "5+", label: "linguagens de programação" },
        { id: "coverage", value: "80%+", label: "cobertura de testes" },
      ],
      sales: [
        { id: "years", value: "25+", label: "anos em vendas B2B" },
        { id: "accounts", value: "4+", label: "contas enterprise" },
        { id: "markets", value: "3", label: "mercados · BR · IT · US" },
        { id: "spoken", value: "4", label: "idiomas falados" },
      ],
    },
    story: [
      "Meu caminho é fora da curva: comecei no comercial e no criativo, passei 25+ anos em vendas B2B e me tornei engenheiro de software — então sento dos dois lados da mesa.",
      "Design na Itália e business development na Adobe me ensinaram como o comprador pensa. Oito anos de venda técnica consultiva na Retrak me ensinaram a transformar requisitos em solução.",
      "Depois aprendi a construí-las. Hoje arquiteto, codifico e entrego produtos completos de ponta a ponta — e ainda toco o ciclo comercial. Vendo o que construo e construo o que vendo.",
    ],
    experience: [
      {
        company: "WB Digital Solutions",
        role: "Engenheiro de Software Full-Stack (Fundador)",
        period: "Fev 2023 — Atual",
        location: "São Paulo, Brasil",
        audience: "both",
        summary: "Engenheiro-fundador que constrói e vende produtos full-stack de ponta a ponta.",
        bullets: {
          engineering: [
            "Projeto e entrego produtos full-stack — React/Next.js no front; Node/TypeScript, Python, Go e Rust no back — com Domain-Driven Design e arquitetura limpa.",
            "Entrega cloud-native na AWS com Docker, Infraestrutura como Código (Terraform, Ansible) e Linux; UI/UX e visão de produto incluídas.",
            "Construí a Revalida Italia do zero: plataforma de e-learning com 8.000+ testes unitários e 4.000+ E2E, integrações Hotmart/Panda Video/Zoom e aprendizagem 3D com Three.js.",
            "Construí um CRM B2B de produção: click-to-call VoIP com transcrição por IA, 8+ pipelines de agentes LangGraph, omnichannel WhatsApp/Gmail/Meet, em NestJS com 80%+ de cobertura.",
          ],
          sales: [
            "Conduzo o ciclo comercial completo — prospecção, descoberta, escopo, propostas, precificação, negociação e fechamento — com clientes PME no Brasil, Itália e EUA.",
            "Expando contas com upsell de novos pacotes sobre produtos entregues, de landing pages a plataformas de vários meses.",
            "Construí um CRM que automatiza meu próprio processo de vendas — qualificação de leads por IA, propostas e análise financeira automatizadas. Eu vendo e construo a ferramenta que vende.",
          ],
        },
        tags: ["TypeScript", "Next.js", "NestJS", "IA / LangGraph", "AWS", "Three.js"],
      },
      {
        company: "Retrak Empilhadeiras",
        role: "Especialista em Vendas Técnicas",
        period: "Mar 2009 — Jul 2017",
        location: "São Paulo, Brasil",
        audience: "sales",
        summary: "8 anos de venda técnica B2B consultiva — contas enterprise (Reckitt Benckiser, Carrefour, Colgate).",
        bullets: {
          sales: [
            "Vendas técnicas B2B para uma marca líder de empilhadeiras na Grande São Paulo, o principal mercado da empresa.",
            "Vendi equipamentos novos e fechei contratos de locação de longo prazo em alto volume.",
            "Gerenciei contas de PMEs a enterprise, incluindo Reckitt Benckiser, Carrefour, Colgate e Droga Raia.",
            "Venda consultiva e orientada a solução: dimensionamento e configuração técnica para centros de distribuição e redes de varejo.",
            "Bati e superei metas de forma consistente.",
          ],
        },
        tags: ["Contas Enterprise", "Venda Consultiva", "Contratos"],
      },
      {
        company: "Adobe",
        role: "Especialista Comercial",
        period: "Fev 2005 — Jan 2006",
        location: "São Paulo, Brasil",
        audience: "sales",
        summary: "Desenvolvimento de negócios e licenciamento de software para clientes enterprise e educação.",
        bullets: {
          sales: [
            "Desenvolvimento de negócios e estratégia de licenciamento de software para clientes enterprise e educação.",
            "Atuei com distribuidores e revendas para ampliar adoção e gerir contas-chave.",
            "Conduzi negociações e representei a marca em eventos do setor.",
          ],
        },
        tags: ["Business Development", "Licenciamento", "Contas-Chave"],
      },
      {
        company: "LM Grafics",
        role: "Designer Gráfico & Web",
        period: "Dez 2007 — Nov 2008",
        location: "Itália",
        audience: "both",
        summary: "Design gráfico e web na Itália — a raiz em comunicação visual do trabalho de produto/UI de hoje.",
        bullets: {
          engineering: [
            "Criei sites, folhetos e materiais visuais para digital e impresso.",
            "Construí bases sólidas em comunicação visual, usabilidade e layout — a raiz do trabalho de produto/UI de hoje.",
          ],
        },
        tags: ["Design", "UI/UX", "Web"],
      },
    ],
    projects: [
      {
        id: "revalida",
        name: "Revalida Italia",
        blurb: "Plataforma de ensino online completa, construída do zero para o mercado de revalidação médica na Itália.",
        highlights: ["8.000+ testes unitários, 4.000+ E2E", "Integrações Hotmart, Panda Video e Zoom", "Experiências de aprendizagem 3D com Three.js"],
        tech: ["Next.js", "NestJS", "DDD", "Three.js", "AWS"],
      },
      {
        id: "crm",
        name: "CRM B2B com IA",
        blurb: "Um CRM de produção que automatiza o processo de vendas que eu mesmo conduzo.",
        highlights: ["8+ pipelines de agentes LangGraph", "Transcrição de chamadas por IA e qualificação de leads", "Omnichannel: WhatsApp, Gmail, Meet · 80%+ de cobertura"],
        tech: ["NestJS", "LangGraph", "Hexagonal", "Ansible"],
      },
      {
        id: "site",
        name: "Este site (wbdigitalsolutions.com)",
        blurb: "O próprio site do estúdio — uma experiência 3D guiada por scroll e prova viva do stack.",
        highlights: ["Heros 3D guiados por scroll (Three.js)", "Lighthouse Perf 90+ · SEO/A11y 100", "i18n em 4 idiomas"],
        tech: ["Next.js", "React Three Fiber", "GSAP", "Tailwind"],
      },
    ],
    stack: [
      { key: "languages", label: "Linguagens", items: ["TypeScript", "JavaScript", "Python", "Go", "Rust"] },
      { key: "frontend", label: "Frontend", items: ["React", "Next.js", "Three.js / R3F", "GSAP", "Tailwind"] },
      { key: "backend", label: "Backend", items: ["Node.js", "NestJS", "DDD", "Arquitetura Hexagonal", "REST / APIs"] },
      { key: "ai", label: "IA", items: ["LangGraph", "LangChain", "RAG", "Pipelines de agentes"] },
      { key: "devops", label: "Cloud & DevOps", items: ["AWS", "Docker", "Terraform", "Kubernetes", "Ansible", "Linux"] },
    ],
    salesHighlights: [
      "25+ anos em vendas B2B — industrial, software e serviços digitais.",
      "Contas enterprise: Reckitt Benckiser, Carrefour, Colgate, Droga Raia.",
      "Ciclo comercial completo — da prospecção ao fechamento — no Brasil, Itália e EUA.",
      "Business development e licenciamento de software na Adobe (distribuidores, revendas, contas-chave).",
      "Metas batidas e superadas; vendas de alto volume e contratos de longo prazo.",
      "Diferencial raro: faço o escopo e precifico o negócio, depois construo a solução.",
    ],
    education: [
      { school: "Full Cycle", detail: "Engenharia de Software — Arquitetura de Sistemas (especialização)", year: "2023" },
      { school: "Data Science Academy (DSA)", detail: "Engenharia de Inteligência Artificial", year: "2023" },
      { school: "Rocketseat", detail: "Imersão Node.js, React & React Native", year: "2021–2023" },
      { school: "Three.js Journey (Bruno Simon)", detail: "WebGL / Three.js para web", year: "2023–2024" },
      { school: "GreenSock (GSAP)", detail: "Animação criativa para web", year: "2024" },
    ],
    languages: [
      { code: "pt", name: "Português", level: "Nativo / Bilíngue", proficiency: 100 },
      { code: "en", name: "Inglês", level: "Profissional Pleno", proficiency: 90 },
      { code: "it", name: "Italiano", level: "Profissional Pleno", proficiency: 90 },
      { code: "es", name: "Espanhol", level: "Profissional", proficiency: 75 },
    ],
    contact: {
      ctaTitle: "Vamos construir ou fechar algo.",
      ctaSub: "O jeito mais rápido de falar comigo:",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      siteLabel: "Estúdio",
      resumeLabel: "WhatsApp",
      downloadCv: "Baixar CV",
    },
    crossPitch: {
      engineering:
        "Além do código: 25+ anos fechando vendas B2B — eu falo a língua do cliente e do negócio, não só a do compilador.",
      sales:
        "E eu construo o que vendo: um engenheiro full-stack que entrega o próprio produto — a profundidade técnica que fecha negócios complexos.",
    },
    crossLinkLabel: {
      engineering: "Ver meu perfil de vendas",
      sales: "Ver meu perfil técnico",
    },
    bigRole: {
      engineering: "Engenheiro de Software",
      sales: "Vendas Técnicas",
    },
    heroRotation: ["Vendas Técnicas", "Venda de Soluções", "Grandes Contas", "PMEs", "Relacionamento", "Novos Mercados"],
    heroAvailable: "Aberto a oportunidades comerciais",
    heroPillars: ["Produto", "Necessidade", "Pessoa"],
    taglinePayoff: ["o produto,", "a necessidade", "e a pessoa."],
    heroGreeting: "Olá, sou o",
    nav: { start: "Início", timeline: "Trajetória", skills: "Competências", education: "Formação", languages: "Idiomas", about: "Sobre", contact: "Contato" },
  },

  it: {
    name: "Bruno Vieira",
    fullName: "Walter Bruno Prado Vieira",
    headline: "Senior Full-Stack & AI Engineer · Vendite Tecniche",
    location: "San Paolo, Brasile",
    available: "Disponibile per ruoli di engineering e commerciali — remoto, o trasferimento con sponsorship del visto",
    toggle: { intro: "Per cosa stai assumendo?", hint: "Cambia quando vuoi — l'intera pagina si adatta.", engineering: "Engineering", sales: "Vendite" },
    hero: {
      engineering: {
        title: "Trasformo problemi complessi in software che scala.",
        sub: "Senior Full-Stack & AI Engineer",
        support:
          "Piattaforme scalabili, sistemi con AI e 3D interattivo — dall'architettura al deploy, tutto in prima persona.",
        pills: ["React / Next.js", "Node / NestJS", "AI · LangGraph", "AWS · Docker · K8s"],
      },
      sales: {
        title: "Vendere è capire: il prodotto, il bisogno e la persona.",
        sub: "Vendite Tecniche & Sviluppo Commerciale",
        support:
          "25+ anni di vendite B2B — clienti enterprise, ciclo commerciale completo e la profondità tecnica che chiude le trattative.",
        pills: ["Vendite B2B", "Clienti Enterprise", "Ciclo Completo", "BR · IT · US"],
      },
    },
    sections: {
      summary: "Profilo",
      story: "Dal banco vendita all'architettura di sistemi",
      experience: "Esperienza",
      projects: "Lavori selezionati",
      stack: "Stack",
      sales: "Percorso commerciale",
      education: "Formazione & certificazioni",
      languages: "Lingue",
      contact: "Parliamone",
    },
    summary: {
      engineering:
        "Senior Full-Stack e AI engineer con una mentalità di prodotto. Costruisco piattaforme scalabili, sistemi con AI ed esperienze 3D interattive — tecnicamente solide e centrate sull'utente reale — con TypeScript, React/Next.js, Node/NestJS, DDD e architettura esagonale, oltre a Python, Go e Rust nel backend. Integro l'AI in prodotti reali (LangGraph, LangChain, RAG, agenti) e rilascio cloud-native su AWS con Docker, Terraform e Kubernetes.",
      sales:
        "Leader di vendite tecniche e sviluppo commerciale con 25+ anni nel B2B — dalle attrezzature industriali a clienti enterprise (Reckitt Benckiser, Carrefour, Colgate) allo sviluppo commerciale in Adobe, e oggi gestisco l'intero ciclo commerciale del mio studio. Parlo sia la lingua dell'engineering sia quella del business: definisco lo scope, prezzo, negozio e chiudo — e poi costruisco io la soluzione.",
    },
    stats: {
      engineering: [
        { id: "tests", value: "8.000+", label: "test unitari rilasciati" },
        { id: "e2e", value: "4.000+", label: "test E2E" },
        { id: "stack", value: "5+", label: "linguaggi di programmazione" },
        { id: "coverage", value: "80%+", label: "coverage dei test" },
      ],
      sales: [
        { id: "years", value: "25+", label: "anni di vendite B2B" },
        { id: "accounts", value: "4+", label: "clienti enterprise" },
        { id: "markets", value: "3", label: "mercati · BR · IT · US" },
        { id: "spoken", value: "4", label: "lingue parlate" },
      ],
    },
    story: [
      "Il mio percorso è atipico: ho iniziato nel commerciale e nel creativo, ho passato 25+ anni nelle vendite B2B e sono diventato software engineer — così posso sedermi da entrambi i lati del tavolo.",
      "Il design in Italia e lo sviluppo commerciale in Adobe mi hanno insegnato come ragiona chi compra. Otto anni di vendita tecnica consultiva in Retrak mi hanno insegnato a trasformare i requisiti in soluzioni.",
      "Poi ho imparato a costruirle. Oggi progetto, sviluppo e rilascio prodotti completi end-to-end — e gestisco ancora il ciclo commerciale. Vendo ciò che costruisco e costruisco ciò che vendo.",
    ],
    experience: [
      {
        company: "WB Digital Solutions",
        role: "Full-Stack Software Engineer (Fondatore)",
        period: "Feb 2023 — Presente",
        location: "San Paolo, Brasile",
        audience: "both",
        summary: "Ingegnere-fondatore che costruisce e vende prodotti full-stack end-to-end.",
        bullets: {
          engineering: [
            "Progetto e rilascio prodotti full-stack — React/Next.js sul front; Node/TypeScript, Python, Go e Rust sul back — con Domain-Driven Design e architettura pulita.",
            "Rilascio cloud-native su AWS con Docker, Infrastructure as Code (Terraform, Ansible) e Linux; UI/UX e visione di prodotto incluse.",
            "Ho costruito Revalida Italia da zero: piattaforma e-learning con 8.000+ test unitari e 4.000+ E2E, integrazioni Hotmart/Panda Video/Zoom e apprendimento 3D con Three.js.",
            "Ho costruito un CRM B2B di produzione: click-to-call VoIP con trascrizione AI, 8+ pipeline di agenti LangGraph, omnichannel WhatsApp/Gmail/Meet, su NestJS con 80%+ di coverage.",
          ],
          sales: [
            "Gestisco l'intero ciclo commerciale — prospecting, discovery, scoping, proposte, pricing, negoziazione e chiusura — con clienti PMI in Brasile, Italia e USA.",
            "Faccio crescere i clienti con upsell di nuovi pacchetti sui prodotti già consegnati, da landing page a piattaforme di più mesi.",
            "Ho costruito un CRM che automatizza il mio stesso processo di vendita — qualificazione lead con AI, proposte e analisi finanziaria automatizzate. Vendo e costruisco lo strumento che vende.",
          ],
        },
        tags: ["TypeScript", "Next.js", "NestJS", "AI / LangGraph", "AWS", "Three.js"],
      },
      {
        company: "Retrak Empilhadeiras",
        role: "Specialista Vendite Tecniche",
        period: "Mar 2009 — Lug 2017",
        location: "San Paolo, Brasile",
        audience: "sales",
        summary: "8 anni di vendita tecnica B2B consultiva — clienti enterprise (Reckitt Benckiser, Carrefour, Colgate).",
        bullets: {
          sales: [
            "Vendite tecniche B2B per un marchio leader di carrelli elevatori nella Grande San Paolo, il mercato principale dell'azienda.",
            "Ho venduto attrezzature nuove e chiuso contratti di noleggio a lungo termine ad alto volume.",
            "Ho gestito clienti da PMI a enterprise, tra cui Reckitt Benckiser, Carrefour, Colgate e Droga Raia.",
            "Vendita consultiva orientata alla soluzione: dimensionamento e configurazione tecnica per centri di distribuzione e reti retail.",
            "Ho raggiunto e superato gli obiettivi in modo costante.",
          ],
        },
        tags: ["Clienti Enterprise", "Vendita Consultiva", "Contratti"],
      },
      {
        company: "Adobe",
        role: "Specialista Commerciale",
        period: "Feb 2005 — Gen 2006",
        location: "San Paolo, Brasile",
        audience: "sales",
        summary: "Sviluppo commerciale e licensing software per clienti enterprise ed education.",
        bullets: {
          sales: [
            "Sviluppo commerciale e strategia di licensing software per clienti enterprise ed education.",
            "Ho lavorato con distributori e rivenditori per ampliare l'adozione e gestire i key account.",
            "Ho condotto negoziazioni e rappresentato il brand a eventi di settore.",
          ],
        },
        tags: ["Business Development", "Licensing", "Key Account"],
      },
      {
        company: "LM Grafics",
        role: "Graphic & Web Designer",
        period: "Dic 2007 — Nov 2008",
        location: "Italia",
        audience: "both",
        summary: "Design grafico e web in Italia — le radici di comunicazione visiva del lavoro di prodotto/UI di oggi.",
        bullets: {
          engineering: [
            "Ho progettato siti web, brochure e materiali visivi per digitale e stampa.",
            "Ho costruito basi solide in comunicazione visiva, usabilità e layout — le radici del lavoro di prodotto/UI di oggi.",
          ],
        },
        tags: ["Design", "UI/UX", "Web"],
      },
    ],
    projects: [
      {
        id: "revalida",
        name: "Revalida Italia",
        blurb: "Piattaforma di formazione online completa, costruita da zero per il mercato della rivalidazione medica in Italia.",
        highlights: ["8.000+ test unitari, 4.000+ E2E", "Integrazioni Hotmart, Panda Video e Zoom", "Esperienze di apprendimento 3D con Three.js"],
        tech: ["Next.js", "NestJS", "DDD", "Three.js", "AWS"],
      },
      {
        id: "crm",
        name: "CRM B2B con AI",
        blurb: "Un CRM di produzione che automatizza il processo di vendita che gestisco io stesso.",
        highlights: ["8+ pipeline di agenti LangGraph", "Trascrizione AI delle chiamate e qualificazione lead", "Omnichannel: WhatsApp, Gmail, Meet · 80%+ di coverage"],
        tech: ["NestJS", "LangGraph", "Hexagonal", "Ansible"],
      },
      {
        id: "site",
        name: "Questo sito (wbdigitalsolutions.com)",
        blurb: "Il sito stesso dello studio — un'esperienza 3D guidata dallo scroll e prova viva dello stack.",
        highlights: ["Hero 3D guidati dallo scroll (Three.js)", "Lighthouse Perf 90+ · SEO/A11y 100", "i18n in 4 lingue"],
        tech: ["Next.js", "React Three Fiber", "GSAP", "Tailwind"],
      },
    ],
    stack: [
      { key: "languages", label: "Linguaggi", items: ["TypeScript", "JavaScript", "Python", "Go", "Rust"] },
      { key: "frontend", label: "Frontend", items: ["React", "Next.js", "Three.js / R3F", "GSAP", "Tailwind"] },
      { key: "backend", label: "Backend", items: ["Node.js", "NestJS", "DDD", "Architettura Esagonale", "REST / API"] },
      { key: "ai", label: "AI", items: ["LangGraph", "LangChain", "RAG", "Pipeline di agenti"] },
      { key: "devops", label: "Cloud & DevOps", items: ["AWS", "Docker", "Terraform", "Kubernetes", "Ansible", "Linux"] },
    ],
    salesHighlights: [
      "25+ anni di vendite B2B — industriale, software e servizi digitali.",
      "Clienti enterprise: Reckitt Benckiser, Carrefour, Colgate, Droga Raia.",
      "Ciclo commerciale completo — dal prospecting alla chiusura — in Brasile, Italia e USA.",
      "Sviluppo commerciale e licensing software in Adobe (distributori, rivenditori, key account).",
      "Obiettivi raggiunti e superati; vendite ad alto volume e contratti a lungo termine.",
      "Un vantaggio raro: definisco e prezzo la trattativa, poi costruisco io la soluzione.",
    ],
    education: [
      { school: "Full Cycle", detail: "Ingegneria del Software — Architettura di Sistemi (specializzazione)", year: "2023" },
      { school: "Data Science Academy (DSA)", detail: "Ingegneria dell'Intelligenza Artificiale", year: "2023" },
      { school: "Rocketseat", detail: "Immersione Node.js, React & React Native", year: "2021–2023" },
      { school: "Three.js Journey (Bruno Simon)", detail: "WebGL / Three.js per il web", year: "2023–2024" },
      { school: "GreenSock (GSAP)", detail: "Animazione creativa per il web", year: "2024" },
    ],
    languages: [
      { code: "pt", name: "Portoghese", level: "Madrelingua / Bilingue", proficiency: 100 },
      { code: "en", name: "Inglese", level: "Professionale Completo", proficiency: 90 },
      { code: "it", name: "Italiano", level: "Professionale Completo", proficiency: 90 },
      { code: "es", name: "Spagnolo", level: "Professionale", proficiency: 75 },
    ],
    contact: {
      ctaTitle: "Costruiamo o chiudiamo qualcosa.",
      ctaSub: "Il modo più rapido per contattarmi:",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      siteLabel: "Studio",
      resumeLabel: "WhatsApp",
      downloadCv: "Scarica il CV",
    },
    crossPitch: {
      engineering:
        "Oltre il codice: 25+ anni a chiudere vendite B2B — parlo la lingua del cliente e del business, non solo quella del compilatore.",
      sales:
        "E costruisco ciò che vendo: un ingegnere full-stack che consegna il prodotto in prima persona — la profondità tecnica che chiude trattative complesse.",
    },
    crossLinkLabel: {
      engineering: "Vedi il mio profilo vendite",
      sales: "Vedi il mio profilo tecnico",
    },
    bigRole: {
      engineering: "Software Engineer",
      sales: "Vendite Tecniche",
    },
    heroRotation: ["Vendite Tecniche", "Vendita di Soluzioni", "Grandi Clienti", "PMI", "Relazioni", "Nuovi Mercati"],
    heroAvailable: "Aperto a opportunità commerciali",
    heroPillars: ["Prodotto", "Bisogno", "Persona"],
    taglinePayoff: ["il prodotto,", "il bisogno", "e la persona."],
    heroGreeting: "Ciao, sono",
    nav: { start: "Inizio", timeline: "Percorso", skills: "Competenze", education: "Formazione", languages: "Lingue", about: "Chi sono", contact: "Contatti" },
  },

  es: {
    name: "Bruno Vieira",
    fullName: "Walter Bruno Prado Vieira",
    headline: "Ingeniero Full-Stack & IA Senior · Ventas Técnicas",
    location: "São Paulo, Brasil",
    available: "Abierto a vacantes de ingeniería y comerciales — remoto, o reubicación con patrocinio de visa",
    toggle: { intro: "¿Para qué estás contratando?", hint: "Cambia cuando quieras — la página entera se adapta.", engineering: "Ingeniería", sales: "Ventas" },
    hero: {
      engineering: {
        title: "Transformo problemas complejos en software que escala.",
        sub: "Ingeniero Full-Stack & IA Senior",
        support:
          "Plataformas escalables, sistemas con IA y 3D interactivo — dueño de todo, de la arquitectura al despliegue.",
        pills: ["React / Next.js", "Node / NestJS", "IA · LangGraph", "AWS · Docker · K8s"],
      },
      sales: {
        title: "Vender es entender: el producto, la necesidad y la persona.",
        sub: "Ventas Técnicas & Desarrollo Comercial",
        support:
          "25+ años en ventas B2B — cuentas enterprise, el ciclo comercial completo y la profundidad técnica que cierra negocios.",
        pills: ["Ventas B2B", "Cuentas Enterprise", "Ciclo Completo", "BR · IT · US"],
      },
    },
    sections: {
      summary: "Resumen",
      story: "Del mostrador a la arquitectura de sistemas",
      experience: "Experiencia",
      projects: "Trabajos seleccionados",
      stack: "Stack",
      sales: "Trayectoria comercial",
      education: "Formación & certificaciones",
      languages: "Idiomas",
      contact: "Hablemos",
    },
    summary: {
      engineering:
        "Ingeniero Full-Stack y de IA senior con mentalidad de producto. Construyo plataformas escalables, sistemas con IA y experiencias 3D interactivas — técnicamente profundas y centradas en el usuario real — con TypeScript, React/Next.js, Node/NestJS, DDD y arquitectura hexagonal, además de Python, Go y Rust en el backend. Integro IA en productos reales (LangGraph, LangChain, RAG, agentes) y despliego cloud-native en AWS con Docker, Terraform y Kubernetes.",
      sales:
        "Líder de ventas técnicas y desarrollo comercial con 25+ años en B2B — desde equipos industriales para cuentas enterprise (Reckitt Benckiser, Carrefour, Colgate) hasta desarrollo de negocio en Adobe, y hoy gestionando el ciclo comercial completo de mi propio estudio. Hablo el idioma de la ingeniería y el del negocio: defino el alcance, cotizo, negocio y cierro — y luego construyo la solución.",
    },
    stats: {
      engineering: [
        { id: "tests", value: "8.000+", label: "pruebas unitarias entregadas" },
        { id: "e2e", value: "4.000+", label: "pruebas E2E" },
        { id: "stack", value: "5+", label: "lenguajes de programación" },
        { id: "coverage", value: "80%+", label: "cobertura de pruebas" },
      ],
      sales: [
        { id: "years", value: "25+", label: "años en ventas B2B" },
        { id: "accounts", value: "4+", label: "cuentas enterprise" },
        { id: "markets", value: "3", label: "mercados · BR · IT · US" },
        { id: "spoken", value: "4", label: "idiomas hablados" },
      ],
    },
    story: [
      "Mi camino es atípico: empecé en lo comercial y lo creativo, pasé 25+ años en ventas B2B y me convertí en ingeniero de software — así que puedo sentarme en cualquier lado de la mesa.",
      "El diseño en Italia y el desarrollo de negocio en Adobe me enseñaron cómo piensa quien compra. Ocho años de venta técnica consultiva en Retrak me enseñaron a convertir requisitos en soluciones.",
      "Después aprendí a construirlas. Hoy diseño, programo y entrego productos completos de punta a punta — y sigo a cargo del ciclo comercial. Vendo lo que construyo y construyo lo que vendo.",
    ],
    experience: [
      {
        company: "WB Digital Solutions",
        role: "Ingeniero de Software Full-Stack (Fundador)",
        period: "Feb 2023 — Actual",
        location: "São Paulo, Brasil",
        audience: "both",
        summary: "Ingeniero-fundador que construye y vende productos full-stack de punta a punta.",
        bullets: {
          engineering: [
            "Diseño y entrego productos full-stack — React/Next.js en el front; Node/TypeScript, Python, Go y Rust en el back — con Domain-Driven Design y arquitectura limpia.",
            "Entrega cloud-native en AWS con Docker, Infraestructura como Código (Terraform, Ansible) y Linux; UI/UX y visión de producto incluidas.",
            "Construí Revalida Italia desde cero: plataforma de e-learning con 8.000+ pruebas unitarias y 4.000+ E2E, integraciones Hotmart/Panda Video/Zoom y aprendizaje 3D con Three.js.",
            "Construí un CRM B2B de producción: click-to-call VoIP con transcripción por IA, 8+ pipelines de agentes LangGraph, omnicanal WhatsApp/Gmail/Meet, en NestJS con 80%+ de cobertura.",
          ],
          sales: [
            "Gestiono el ciclo comercial completo — prospección, descubrimiento, alcance, propuestas, precios, negociación y cierre — con clientes pyme en Brasil, Italia y EE. UU.",
            "Hago crecer las cuentas con upsell de nuevos paquetes sobre productos ya entregados, de landing pages a plataformas de varios meses.",
            "Construí un CRM que automatiza mi propio proceso de ventas — calificación de leads por IA, propuestas y análisis financiero automatizados. Vendo y construyo la herramienta que vende.",
          ],
        },
        tags: ["TypeScript", "Next.js", "NestJS", "IA / LangGraph", "AWS", "Three.js"],
      },
      {
        company: "Retrak Empilhadeiras",
        role: "Especialista en Ventas Técnicas",
        period: "Mar 2009 — Jul 2017",
        location: "São Paulo, Brasil",
        audience: "sales",
        summary: "8 años de venta técnica B2B consultiva — cuentas enterprise (Reckitt Benckiser, Carrefour, Colgate).",
        bullets: {
          sales: [
            "Ventas técnicas B2B para una marca líder de montacargas en el Gran São Paulo, el mercado principal de la empresa.",
            "Vendí equipos nuevos y cerré contratos de alquiler a largo plazo en alto volumen.",
            "Gestioné cuentas de pymes a enterprise, incluyendo Reckitt Benckiser, Carrefour, Colgate y Droga Raia.",
            "Venta consultiva orientada a la solución: dimensionamiento y configuración técnica para centros de distribución y redes de retail.",
            "Alcancé y superé objetivos de forma constante.",
          ],
        },
        tags: ["Cuentas Enterprise", "Venta Consultiva", "Contratos"],
      },
      {
        company: "Adobe",
        role: "Especialista Comercial",
        period: "Feb 2005 — Ene 2006",
        location: "São Paulo, Brasil",
        audience: "sales",
        summary: "Desarrollo de negocio y licenciamiento de software para clientes enterprise y educación.",
        bullets: {
          sales: [
            "Desarrollo de negocio y estrategia de licenciamiento de software para clientes enterprise y educación.",
            "Trabajé con distribuidores y revendedores para ampliar la adopción y gestionar cuentas clave.",
            "Lideré negociaciones y representé a la marca en eventos del sector.",
          ],
        },
        tags: ["Desarrollo de Negocio", "Licenciamiento", "Cuentas Clave"],
      },
      {
        company: "LM Grafics",
        role: "Diseñador Gráfico & Web",
        period: "Dic 2007 — Nov 2008",
        location: "Italia",
        audience: "both",
        summary: "Diseño gráfico y web en Italia — la raíz en comunicación visual del trabajo de producto/UI de hoy.",
        bullets: {
          engineering: [
            "Diseñé sitios web, folletos y materiales visuales para digital e impreso.",
            "Construí bases sólidas en comunicación visual, usabilidad y maquetación — la raíz del trabajo de producto/UI de hoy.",
          ],
        },
        tags: ["Diseño", "UI/UX", "Web"],
      },
    ],
    projects: [
      {
        id: "revalida",
        name: "Revalida Italia",
        blurb: "Plataforma de formación online completa, construida desde cero para el mercado de revalidación médica en Italia.",
        highlights: ["8.000+ pruebas unitarias, 4.000+ E2E", "Integraciones Hotmart, Panda Video y Zoom", "Experiencias de aprendizaje 3D con Three.js"],
        tech: ["Next.js", "NestJS", "DDD", "Three.js", "AWS"],
      },
      {
        id: "crm",
        name: "CRM B2B con IA",
        blurb: "Un CRM de producción que automatiza el proceso de ventas que yo mismo gestiono.",
        highlights: ["8+ pipelines de agentes LangGraph", "Transcripción de llamadas por IA y calificación de leads", "Omnicanal: WhatsApp, Gmail, Meet · 80%+ de cobertura"],
        tech: ["NestJS", "LangGraph", "Hexagonal", "Ansible"],
      },
      {
        id: "site",
        name: "Este sitio (wbdigitalsolutions.com)",
        blurb: "El propio sitio del estudio — una experiencia 3D guiada por scroll y prueba viva del stack.",
        highlights: ["Heros 3D guiados por scroll (Three.js)", "Lighthouse Perf 90+ · SEO/A11y 100", "i18n en 4 idiomas"],
        tech: ["Next.js", "React Three Fiber", "GSAP", "Tailwind"],
      },
    ],
    stack: [
      { key: "languages", label: "Lenguajes", items: ["TypeScript", "JavaScript", "Python", "Go", "Rust"] },
      { key: "frontend", label: "Frontend", items: ["React", "Next.js", "Three.js / R3F", "GSAP", "Tailwind"] },
      { key: "backend", label: "Backend", items: ["Node.js", "NestJS", "DDD", "Arquitectura Hexagonal", "REST / APIs"] },
      { key: "ai", label: "IA", items: ["LangGraph", "LangChain", "RAG", "Pipelines de agentes"] },
      { key: "devops", label: "Cloud & DevOps", items: ["AWS", "Docker", "Terraform", "Kubernetes", "Ansible", "Linux"] },
    ],
    salesHighlights: [
      "25+ años en ventas B2B — industrial, software y servicios digitales.",
      "Cuentas enterprise: Reckitt Benckiser, Carrefour, Colgate, Droga Raia.",
      "Ciclo comercial completo — de la prospección al cierre — en Brasil, Italia y EE. UU.",
      "Desarrollo de negocio y licenciamiento de software en Adobe (distribuidores, revendedores, cuentas clave).",
      "Objetivos alcanzados y superados; ventas de alto volumen y contratos a largo plazo.",
      "Una ventaja poco común: defino y cotizo el negocio, luego construyo la solución.",
    ],
    education: [
      { school: "Full Cycle", detail: "Ingeniería de Software — Arquitectura de Sistemas (especialización)", year: "2023" },
      { school: "Data Science Academy (DSA)", detail: "Ingeniería de Inteligencia Artificial", year: "2023" },
      { school: "Rocketseat", detail: "Inmersión Node.js, React & React Native", year: "2021–2023" },
      { school: "Three.js Journey (Bruno Simon)", detail: "WebGL / Three.js para la web", year: "2023–2024" },
      { school: "GreenSock (GSAP)", detail: "Animación creativa para la web", year: "2024" },
    ],
    languages: [
      { code: "pt", name: "Portugués", level: "Nativo / Bilingüe", proficiency: 100 },
      { code: "en", name: "Inglés", level: "Profesional Pleno", proficiency: 90 },
      { code: "it", name: "Italiano", level: "Profesional Pleno", proficiency: 90 },
      { code: "es", name: "Español", level: "Profesional", proficiency: 75 },
    ],
    contact: {
      ctaTitle: "Construyamos o cerremos algo.",
      ctaSub: "La forma más rápida de contactarme:",
      emailLabel: "Email",
      linkedinLabel: "LinkedIn",
      githubLabel: "GitHub",
      siteLabel: "Estudio",
      resumeLabel: "WhatsApp",
      downloadCv: "Descargar CV",
    },
    crossPitch: {
      engineering:
        "Más allá del código: 25+ años cerrando ventas B2B — hablo el idioma del cliente y del negocio, no solo el del compilador.",
      sales:
        "Y construyo lo que vendo: un ingeniero full-stack que entrega el propio producto — la profundidad técnica que cierra negocios complejos.",
    },
    crossLinkLabel: {
      engineering: "Ver mi perfil de ventas",
      sales: "Ver mi perfil técnico",
    },
    bigRole: {
      engineering: "Ingeniero de Software",
      sales: "Ventas Técnicas",
    },
    heroRotation: ["Ventas Técnicas", "Venta de Soluciones", "Grandes Cuentas", "PYMEs", "Relaciones", "Nuevos Mercados"],
    heroAvailable: "Abierto a oportunidades comerciales",
    heroPillars: ["Producto", "Necesidad", "Persona"],
    taglinePayoff: ["el producto,", "la necesidad", "y la persona."],
    heroGreeting: "Hola, soy",
    nav: { start: "Inicio", timeline: "Trayectoria", skills: "Competencias", education: "Formación", languages: "Idiomas", about: "Sobre mí", contact: "Contacto" },
  },
};
