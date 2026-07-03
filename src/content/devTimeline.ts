/**
 * Journey timeline for the DEV CV page (/dev → brunodev.wbdigitalsolutions.com).
 *
 * Unlike the sales timeline (a long job history), this one tells the BUILD
 * journey: the second career, constructed on top of the first. The pre-code
 * decades are compressed into a single foundation node so the history reads
 * as depth, not absence.
 *
 * WIP: authored in pt-BR while the content is being assembled (Bruno feeds
 * entries one by one). Localize to en / it / es once finalized.
 */

export interface DevTimelineEntry {
  /** Year or year range, e.g. "2020" or "1987–2020". */
  year: string;
  /** Age or age range at the time, e.g. "46 anos". */
  age: string;
  /** Milestone title (chapter of the journey). */
  title: string;
  /** Short subtitle / role line. */
  subtitle: string;
  /** Location. */
  location?: string;
  /** What happened / what it means. */
  bullets: string[];
}

export const devTimeline: DevTimelineEntry[] = [
  {
    year: "1987–2020",
    age: "13 – 46 anos",
    title: "Antes do código",
    subtitle: "25+ anos de mundo real",
    location: "BR · EUA · IT · PT",
    bullets: [
      "Vendas técnicas B2B, empresas próprias e grandes contas: 25+ anos entendendo negócios por dentro.",
      "Morei e trabalhei em 4 países; 4 idiomas na bagagem.",
      "A fluência em negócio que hoje guia meu código: entendo o problema antes da primeira linha.",
    ],
  },
  {
    year: "2020",
    age: "46 anos",
    title: "Harvard CS50",
    subtitle: "Primeiras linhas de código",
    location: "Portugal",
    bullets: [
      "Comecei a estudar programação em Portugal, entre uma corrida e outra como motorista de app.",
      "CS50 de Harvard: fundamentos de ciência da computação.",
      "Primeiras páginas de teste em HTML e CSS, o começo da segunda carreira.",
    ],
  },
  {
    year: "2020",
    age: "46 anos",
    title: "TrueCoders",
    subtitle: "Bootcamp de Desenvolvimento de Software",
    location: "Birmingham, EUA · ao vivo, remoto",
    bullets: [
      "Bootcamp intensivo de 500+ horas, baseado em projetos, numa escola dos EUA com aulas ao vivo.",
      "C#, .NET Core, ASP.NET MVC, MySQL, Git e HTML, individual e em grupo.",
      "A base em orientação a objetos e tipagem forte que carrego até hoje.",
    ],
  },
  {
    year: "2020–2024",
    age: "46 – 50 anos",
    title: "Frontend, design & criatividade",
    subtitle: "Imersão contínua: a robustez precisava ficar bonita",
    bullets: [
      "Com a base sólida de backend, me dediquei ao frontend e ao design: agora era preciso saber fazer páginas bonitas e eficientes.",
      "Rocketseat Ignite (2021–2023): treinamento imersivo e avançado em Node.js, React, Next.js e React Native com TypeScript, construindo aplicações full-stack de ponta a ponta.",
      "JavaScript a fundo com Cod3r (assíncrono, funcional, RxJS) e B7Web; frontend e UX/UI com Origamid; design de interfaces e prototipagem com Figma Descomplicado.",
      "O acabamento criativo: Three.js Journey do Bruno Simon (WebGL, shaders, 3D) e GSAP (animação de alta performance). É essa camada que você vê nesta página.",
    ],
  },
  {
    year: "2023",
    age: "49 anos",
    title: "WB Digital Solutions",
    subtitle: "Fundador · a segunda carreira vira negócio",
    location: "São Paulo · Remoto",
    bullets: [
      "De volta ao Brasil, fundei minha software house: agora era construir de verdade, para clientes reais.",
      "Primeiros clientes e primeiros produtos em produção.",
    ],
  },
  {
    year: "2023",
    age: "49 anos",
    title: "Full Cycle",
    subtitle: "Arquitetura, engenharia de software & DevOps",
    bullets: [
      "Me aprofundei em arquitetura e engenharia de software: a base para construir sistemas que escalam.",
      "DDD, arquitetura limpa e hexagonal aplicadas a projetos práticos.",
      "E o mundo DevOps: Docker, Kubernetes e a cultura de levar código à produção com confiança.",
    ],
  },
  {
    year: "2023–2024",
    age: "49 – 50 anos",
    title: "Dados & IA",
    subtitle: "Uma nova ferramenta e um novo mundo chegando com força",
    bullets: [
      "Era impossível ignorar: a IA estava redefinindo o que software significa. Fui estudar a fundo.",
      "Ciência de dados, fundamentos e conceitos profundos de IA na Data Science Academy.",
      "A base que hoje vira agentes de IA (LangGraph, RAG) rodando em produção.",
    ],
  },
  {
    year: "2024",
    age: "50 anos",
    title: "Go, Rust & infraestrutura",
    subtitle: "Aprendendo direto da fonte: documentação e cursos pontuais",
    bullets: [
      "Já com programação madura, o aprendizado mudou de forma: documentação oficial e cursos pontuais na Alura e Udemy.",
      "Go e Rust: linguagens de backend modernas, rápidas e seguras, para serviços de alta performance.",
      "Redes de computadores para DevOps (HTTP, DNS, sockets, Wireshark) e gestão de projetos com SCRUM e GTD.",
    ],
  },
  {
    year: "2023 – hoje",
    age: "49 – 52 anos",
    title: "Produtos em produção",
    subtitle: "Da arquitetura ao deploy, de ponta a ponta",
    location: "Brasil · Itália · EUA",
    bullets: [
      "Revalida Italia: plataforma de ensino robusta construída do zero, com aulas em ambiente 3D, integrações via API e hospedagem na AWS.",
      "O site 3D do estúdio no ar: experiência guiada por scroll com Three.js, prova viva do stack.",
      "CRM com IA que automatiza meu próprio processo comercial: qualificação de leads, propostas e análise financeira.",
      "Sistemas com agentes de IA (LangGraph, RAG) integrados a produtos reais.",
      "Deploy cloud-native na AWS com Docker, Terraform e Kubernetes, para clientes no Brasil, na Itália e nos EUA.",
    ],
  },
];
