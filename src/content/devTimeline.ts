/**
 * Journey timeline for the DEV CV page (/dev → brunodev.wbdigitalsolutions.com).
 *
 * Unlike the sales timeline (a long job history), this one tells the BUILD
 * journey: the second career, constructed on top of the first. The pre-code
 * decades are compressed into a single foundation node so the history reads
 * as depth, not absence.
 *
 * Localized: the export is a per-locale record keyed by CVLang
 * ("pt-BR" is the source content; en / it / es are translations).
 */

import type { CVLang } from '@/content/cv';

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

export const devTimeline: Record<CVLang, DevTimelineEntry[]> = {
  'pt-BR': [
    {
      year: '1987–2020',
      age: '13 – 46 anos',
      title: 'Antes do código',
      subtitle: '25+ anos de mundo real',
      location: 'BR · EUA · IT · PT',
      bullets: [
        'Vendas técnicas B2B, empresas próprias e grandes contas: 25+ anos entendendo negócios por dentro.',
        'Morei e trabalhei em 4 países; 4 idiomas na bagagem.',
        'A fluência em negócio que hoje guia meu código: entendo o problema antes da primeira linha.',
      ],
    },
    {
      year: '2020',
      age: '46 anos',
      title: 'Harvard CS50',
      subtitle: 'Primeiras linhas de código',
      location: 'Portugal',
      bullets: [
        'Comecei a estudar programação em Portugal, entre uma corrida e outra como motorista de app.',
        'CS50 de Harvard: fundamentos de ciência da computação.',
        'Primeiras páginas de teste em HTML e CSS, o começo da segunda carreira.',
      ],
    },
    {
      year: '2020',
      age: '46 anos',
      title: 'TrueCoders',
      subtitle: 'Bootcamp de Desenvolvimento de Software',
      location: 'Birmingham, EUA · ao vivo, remoto',
      bullets: [
        'Bootcamp intensivo de 500+ horas, baseado em projetos, numa escola dos EUA com aulas ao vivo.',
        'C#, .NET Core, ASP.NET MVC, MySQL, Git e HTML, individual e em grupo.',
        'A base em orientação a objetos e tipagem forte que carrego até hoje.',
      ],
    },
    {
      year: '2020–2024',
      age: '46 – 50 anos',
      title: 'Frontend, design & criatividade',
      subtitle: 'Imersão contínua: a robustez precisava ficar bonita',
      bullets: [
        'Com a base sólida de backend, me dediquei ao frontend e ao design: agora era preciso saber fazer páginas bonitas e eficientes.',
        'Rocketseat Ignite (2021–2023): treinamento imersivo e avançado em Node.js, React, Next.js e React Native com TypeScript, construindo aplicações full-stack de ponta a ponta.',
        'JavaScript a fundo com Cod3r (assíncrono, funcional, RxJS) e B7Web; frontend e UX/UI com Origamid; design de interfaces e prototipagem com Figma Descomplicado.',
        'O acabamento criativo: Three.js Journey do Bruno Simon (WebGL, shaders, 3D) e GSAP (animação de alta performance). É essa camada que você vê nesta página.',
      ],
    },
    {
      year: '2023',
      age: '49 anos',
      title: 'WB Digital Solutions',
      subtitle: 'Fundador · a segunda carreira vira negócio',
      location: 'São Paulo · Remoto',
      bullets: [
        'De volta ao Brasil, fundei minha software house: agora era construir de verdade, para clientes reais.',
        'Primeiros clientes e primeiros produtos em produção.',
      ],
    },
    {
      year: '2023',
      age: '49 anos',
      title: 'Full Cycle',
      subtitle: 'Arquitetura, engenharia de software & DevOps',
      bullets: [
        'Me aprofundei em arquitetura e engenharia de software: a base para construir sistemas que escalam.',
        'DDD, arquitetura limpa e hexagonal aplicadas a projetos práticos.',
        'E o mundo DevOps: Docker, Kubernetes e a cultura de levar código à produção com confiança.',
      ],
    },
    {
      year: '2023–2024',
      age: '49 – 50 anos',
      title: 'Dados & IA',
      subtitle: 'Uma nova ferramenta e um novo mundo chegando com força',
      bullets: [
        'Era impossível ignorar: a IA estava redefinindo o que software significa. Fui estudar a fundo.',
        'Ciência de dados, fundamentos e conceitos profundos de IA na Data Science Academy.',
        'A base que hoje vira agentes de IA (LangGraph, RAG) rodando em produção.',
      ],
    },
    {
      year: '2024',
      age: '50 anos',
      title: 'Go, Rust & infraestrutura',
      subtitle: 'Aprendendo direto da fonte: documentação e cursos pontuais',
      bullets: [
        'Já com programação madura, o aprendizado mudou de forma: documentação oficial e cursos pontuais na Alura e Udemy.',
        'Go e Rust: linguagens de backend modernas, rápidas e seguras, para serviços de alta performance.',
        'Redes de computadores para DevOps (HTTP, DNS, sockets, Wireshark) e gestão de projetos com SCRUM e GTD.',
      ],
    },
    {
      year: '2023 – hoje',
      age: '49 – 52 anos',
      title: 'Produtos em produção',
      subtitle: 'Da arquitetura ao deploy, de ponta a ponta',
      location: 'Brasil · Itália · EUA',
      bullets: [
        'Revalida Italia: plataforma de ensino robusta construída do zero, com aulas em ambiente 3D, integrações via API e hospedagem na AWS.',
        'O site 3D do estúdio no ar: experiência guiada por scroll com Three.js, prova viva do stack.',
        'CRM com IA que automatiza meu próprio processo comercial: qualificação de leads, propostas e análise financeira.',
        'Sistemas com agentes de IA (LangGraph, RAG) integrados a produtos reais.',
        'Deploy cloud-native na AWS com Docker, Terraform e Kubernetes, para clientes no Brasil, na Itália e nos EUA.',
      ],
    },
    {
      year: '2025–2026',
      age: '51 anos',
      title: 'MBA em Engenharia de Software com IA',
      subtitle: 'Full Cycle · em andamento',
      bullets: [
        'MBA de 400 horas focado no novo perfil de engenheiro da era da IA.',
        'Arquitetura na era da IA: agentes vs microsserviços, protocolos MCP e A2A, RAG e vector databases.',
        'Desenvolvimento orientado por IA (AI-driven workflow), desenvolvimento de agentes (LangGraph, CrewAI), prompt engineering e DevOps/SRE com IA.',
        'A formalização do caminho que já pratico em produção: IA no workflow diário e agentes em sistemas reais.',
      ],
    },
  ],
  en: [
    {
      year: '1987–2020',
      age: 'age 13 – 46',
      title: 'Before the code',
      subtitle: '25+ years of real world',
      location: 'BR · USA · IT · PT',
      bullets: [
        'B2B technical sales, my own companies and major accounts: 25+ years understanding businesses from the inside.',
        'Lived and worked in 4 countries; 4 languages under my belt.',
        'The business fluency that now guides my code: I understand the problem before the first line.',
      ],
    },
    {
      year: '2020',
      age: 'age 46',
      title: 'Harvard CS50',
      subtitle: 'First lines of code',
      location: 'Portugal',
      bullets: [
        'Started studying programming in Portugal, between rides as an app driver.',
        "Harvard's CS50: computer science fundamentals.",
        'First test pages in HTML and CSS, the beginning of the second career.',
      ],
    },
    {
      year: '2020',
      age: 'age 46',
      title: 'TrueCoders',
      subtitle: 'Software Development Bootcamp',
      location: 'Birmingham, USA · live, remote',
      bullets: [
        'Intensive 500+ hour, project-based bootcamp at a US school with live classes.',
        'C#, .NET Core, ASP.NET MVC, MySQL, Git and HTML, solo and in teams.',
        'The foundation in object orientation and strong typing I carry to this day.',
      ],
    },
    {
      year: '2020–2024',
      age: 'age 46 – 50',
      title: 'Frontend, design & creativity',
      subtitle: 'Continuous immersion: the robustness needed to look good',
      bullets: [
        'With a solid backend foundation, I devoted myself to frontend and design: now I needed to build pages that were beautiful and efficient.',
        'Rocketseat Ignite (2021–2023): immersive, advanced training in Node.js, React, Next.js and React Native with TypeScript, building full-stack applications end to end.',
        'Deep JavaScript with Cod3r (async, functional, RxJS) and B7Web; frontend and UX/UI with Origamid; interface design and prototyping with Figma Descomplicado.',
        "The creative finish: Bruno Simon's Three.js Journey (WebGL, shaders, 3D) and GSAP (high-performance animation). It's the layer you're seeing on this page.",
      ],
    },
    {
      year: '2023',
      age: 'age 49',
      title: 'WB Digital Solutions',
      subtitle: 'Founder · the second career becomes a business',
      location: 'São Paulo · Remote',
      bullets: [
        'Back in Brazil, I founded my software house: now it was about building for real, for real clients.',
        'First clients and first products in production.',
      ],
    },
    {
      year: '2023',
      age: 'age 49',
      title: 'Full Cycle',
      subtitle: 'Architecture, software engineering & DevOps',
      bullets: [
        'I went deep into software architecture and engineering: the foundation for building systems that scale.',
        'DDD, clean and hexagonal architecture applied to hands-on projects.',
        'And the DevOps world: Docker, Kubernetes and the culture of shipping code to production with confidence.',
      ],
    },
    {
      year: '2023–2024',
      age: 'age 49 – 50',
      title: 'Data & AI',
      subtitle: 'A new tool and a new world arriving in force',
      bullets: [
        'It was impossible to ignore: AI was redefining what software means. So I went to study it in depth.',
        'Data science, fundamentals and deep AI concepts at the Data Science Academy.',
        'The foundation that today becomes AI agents (LangGraph, RAG) running in production.',
      ],
    },
    {
      year: '2024',
      age: 'age 50',
      title: 'Go, Rust & infrastructure',
      subtitle: 'Learning straight from the source: documentation and targeted courses',
      bullets: [
        'With programming now mature, learning changed shape: official documentation and targeted courses on Alura and Udemy.',
        'Go and Rust: modern, fast and safe backend languages for high-performance services.',
        'Computer networking for DevOps (HTTP, DNS, sockets, Wireshark) and project management with SCRUM and GTD.',
      ],
    },
    {
      year: '2023 – today',
      age: 'age 49 – 52',
      title: 'Products in production',
      subtitle: 'From architecture to deploy, end to end',
      location: 'Brazil · Italy · USA',
      bullets: [
        'Revalida Italia: a robust learning platform built from scratch, with classes in a 3D environment, API integrations and AWS hosting.',
        "The studio's 3D website live: a scroll-driven experience with Three.js, living proof of the stack.",
        'An AI-powered CRM that automates my own sales process: lead qualification, proposals and financial analysis.',
        'Systems with AI agents (LangGraph, RAG) integrated into real products.',
        'Cloud-native deploys on AWS with Docker, Terraform and Kubernetes, for clients in Brazil, Italy and the USA.',
      ],
    },
    {
      year: '2025–2026',
      age: 'age 51',
      title: 'MBA in Software Engineering with AI',
      subtitle: 'Full Cycle · in progress',
      bullets: [
        '400-hour MBA focused on the new engineer profile of the AI era.',
        'Architecture in the AI era: agents vs microservices, MCP and A2A protocols, RAG and vector databases.',
        'AI-driven development workflow, agent development (LangGraph, CrewAI), prompt engineering and DevOps/SRE with AI.',
        'The formalization of a path I already practice in production: AI in the daily workflow and agents in real systems.',
      ],
    },
  ],
  it: [
    {
      year: '1987–2020',
      age: '13 – 46 anni',
      title: 'Prima del codice',
      subtitle: '25+ anni di mondo reale',
      location: 'BR · USA · IT · PT',
      bullets: [
        "Vendite tecniche B2B, aziende proprie e grandi clienti: 25+ anni a capire il business dall'interno.",
        'Ho vissuto e lavorato in 4 paesi; 4 lingue nel bagaglio.',
        'La padronanza del business che oggi guida il mio codice: capisco il problema prima della prima riga.',
      ],
    },
    {
      year: '2020',
      age: '46 anni',
      title: 'Harvard CS50',
      subtitle: 'Prime righe di codice',
      location: 'Portogallo',
      bullets: [
        "Ho iniziato a studiare programmazione in Portogallo, tra una corsa e l'altra come autista di app.",
        'CS50 di Harvard: fondamenti di informatica.',
        "Prime pagine di prova in HTML e CSS, l'inizio della seconda carriera.",
      ],
    },
    {
      year: '2020',
      age: '46 anni',
      title: 'TrueCoders',
      subtitle: 'Bootcamp di Sviluppo Software',
      location: 'Birmingham, USA · dal vivo, da remoto',
      bullets: [
        'Bootcamp intensivo di oltre 500 ore, basato su progetti, in una scuola statunitense con lezioni dal vivo.',
        'C#, .NET Core, ASP.NET MVC, MySQL, Git e HTML, da solo e in gruppo.',
        'Le basi di orientamento agli oggetti e tipizzazione forte che porto con me ancora oggi.',
      ],
    },
    {
      year: '2020–2024',
      age: '46 – 50 anni',
      title: 'Frontend, design & creatività',
      subtitle: 'Immersione continua: la robustezza doveva diventare bella',
      bullets: [
        'Con solide basi di backend, mi sono dedicato al frontend e al design: ora serviva saper creare pagine belle ed efficienti.',
        'Rocketseat Ignite (2021–2023): formazione immersiva e avanzata in Node.js, React, Next.js e React Native con TypeScript, costruendo applicazioni full-stack da cima a fondo.',
        'JavaScript in profondità con Cod3r (asincrono, funzionale, RxJS) e B7Web; frontend e UX/UI con Origamid; design di interfacce e prototipazione con Figma Descomplicado.',
        'Il tocco creativo: Three.js Journey di Bruno Simon (WebGL, shaders, 3D) e GSAP (animazione ad alte prestazioni). È lo strato che vedi in questa pagina.',
      ],
    },
    {
      year: '2023',
      age: '49 anni',
      title: 'WB Digital Solutions',
      subtitle: "Fondatore · la seconda carriera diventa un'azienda",
      location: 'São Paulo · Remoto',
      bullets: [
        'Tornato in Brasile, ho fondato la mia software house: ora si trattava di costruire davvero, per clienti reali.',
        'Primi clienti e primi prodotti in produzione.',
      ],
    },
    {
      year: '2023',
      age: '49 anni',
      title: 'Full Cycle',
      subtitle: 'Architettura, ingegneria del software & DevOps',
      bullets: [
        'Mi sono approfondito in architettura e ingegneria del software: la base per costruire sistemi che scalano.',
        'DDD, architettura pulita ed esagonale applicate a progetti pratici.',
        'E il mondo DevOps: Docker, Kubernetes e la cultura di portare il codice in produzione con fiducia.',
      ],
    },
    {
      year: '2023–2024',
      age: '49 – 50 anni',
      title: 'Dati & IA',
      subtitle: 'Un nuovo strumento e un nuovo mondo in arrivo con forza',
      bullets: [
        "Era impossibile ignorarlo: l'IA stava ridefinendo il significato stesso di software. Sono andato a studiarla a fondo.",
        'Data science, fondamenti e concetti profondi di IA alla Data Science Academy.',
        'La base che oggi diventa agenti di IA (LangGraph, RAG) in produzione.',
      ],
    },
    {
      year: '2024',
      age: '50 anni',
      title: 'Go, Rust & infrastruttura',
      subtitle: 'Imparare direttamente dalla fonte: documentazione e corsi mirati',
      bullets: [
        "Con una programmazione ormai matura, l'apprendimento ha cambiato forma: documentazione ufficiale e corsi mirati su Alura e Udemy.",
        'Go e Rust: linguaggi di backend moderni, veloci e sicuri, per servizi ad alte prestazioni.',
        'Reti di computer per DevOps (HTTP, DNS, socket, Wireshark) e gestione dei progetti con SCRUM e GTD.',
      ],
    },
    {
      year: '2023 – oggi',
      age: '49 – 52 anni',
      title: 'Prodotti in produzione',
      subtitle: "Dall'architettura al deploy, da cima a fondo",
      location: 'Brasile · Italia · USA',
      bullets: [
        'Revalida Italia: piattaforma didattica robusta costruita da zero, con lezioni in ambiente 3D, integrazioni via API e hosting su AWS.',
        'Il sito 3D dello studio online: esperienza guidata dallo scroll con Three.js, prova vivente dello stack.',
        'CRM con IA che automatizza il mio stesso processo commerciale: qualificazione dei lead, proposte e analisi finanziaria.',
        'Sistemi con agenti di IA (LangGraph, RAG) integrati in prodotti reali.',
        'Deploy cloud-native su AWS con Docker, Terraform e Kubernetes, per clienti in Brasile, in Italia e negli USA.',
      ],
    },
    {
      year: '2025–2026',
      age: '51 anni',
      title: 'MBA in Ingegneria del Software con IA',
      subtitle: 'Full Cycle · in corso',
      bullets: [
        "MBA di 400 ore focalizzato sul nuovo profilo di ingegnere dell'era dell'IA.",
        "Architettura nell'era dell'IA: agenti vs microservizi, protocolli MCP e A2A, RAG e vector database.",
        "Sviluppo orientato dall'IA (AI-driven workflow), sviluppo di agenti (LangGraph, CrewAI), prompt engineering e DevOps/SRE con IA.",
        'La formalizzazione di un percorso che già pratico in produzione: IA nel workflow quotidiano e agenti in sistemi reali.',
      ],
    },
  ],
  es: [
    {
      year: '1987–2020',
      age: '13 – 46 años',
      title: 'Antes del código',
      subtitle: '25+ años de mundo real',
      location: 'BR · EE. UU. · IT · PT',
      bullets: [
        'Ventas técnicas B2B, empresas propias y grandes cuentas: 25+ años entendiendo los negocios desde dentro.',
        'Viví y trabajé en 4 países; 4 idiomas en el equipaje.',
        'La fluidez en negocio que hoy guía mi código: entiendo el problema antes de la primera línea.',
      ],
    },
    {
      year: '2020',
      age: '46 años',
      title: 'Harvard CS50',
      subtitle: 'Primeras líneas de código',
      location: 'Portugal',
      bullets: [
        'Empecé a estudiar programación en Portugal, entre un viaje y otro como conductor de app.',
        'CS50 de Harvard: fundamentos de ciencias de la computación.',
        'Primeras páginas de prueba en HTML y CSS, el comienzo de la segunda carrera.',
      ],
    },
    {
      year: '2020',
      age: '46 años',
      title: 'TrueCoders',
      subtitle: 'Bootcamp de Desarrollo de Software',
      location: 'Birmingham, EE. UU. · en vivo, remoto',
      bullets: [
        'Bootcamp intensivo de más de 500 horas, basado en proyectos, en una escuela de EE. UU. con clases en vivo.',
        'C#, .NET Core, ASP.NET MVC, MySQL, Git y HTML, individual y en grupo.',
        'La base en orientación a objetos y tipado fuerte que llevo conmigo hasta hoy.',
      ],
    },
    {
      year: '2020–2024',
      age: '46 – 50 años',
      title: 'Frontend, diseño & creatividad',
      subtitle: 'Inmersión continua: la robustez necesitaba verse bien',
      bullets: [
        'Con una base sólida de backend, me dediqué al frontend y al diseño: ahora había que saber crear páginas bonitas y eficientes.',
        'Rocketseat Ignite (2021–2023): formación inmersiva y avanzada en Node.js, React, Next.js y React Native con TypeScript, construyendo aplicaciones full-stack de punta a punta.',
        'JavaScript a fondo con Cod3r (asíncrono, funcional, RxJS) y B7Web; frontend y UX/UI con Origamid; diseño de interfaces y prototipado con Figma Descomplicado.',
        'El acabado creativo: Three.js Journey de Bruno Simon (WebGL, shaders, 3D) y GSAP (animación de alto rendimiento). Es la capa que ves en esta página.',
      ],
    },
    {
      year: '2023',
      age: '49 años',
      title: 'WB Digital Solutions',
      subtitle: 'Fundador · la segunda carrera se convierte en negocio',
      location: 'São Paulo · Remoto',
      bullets: [
        'De vuelta en Brasil, fundé mi software house: ahora tocaba construir de verdad, para clientes reales.',
        'Primeros clientes y primeros productos en producción.',
      ],
    },
    {
      year: '2023',
      age: '49 años',
      title: 'Full Cycle',
      subtitle: 'Arquitectura, ingeniería de software & DevOps',
      bullets: [
        'Me adentré en la arquitectura y la ingeniería de software: la base para construir sistemas que escalan.',
        'DDD, arquitectura limpia y hexagonal aplicadas a proyectos prácticos.',
        'Y el mundo DevOps: Docker, Kubernetes y la cultura de llevar código a producción con confianza.',
      ],
    },
    {
      year: '2023–2024',
      age: '49 – 50 años',
      title: 'Datos & IA',
      subtitle: 'Una nueva herramienta y un nuevo mundo llegando con fuerza',
      bullets: [
        'Era imposible ignorarlo: la IA estaba redefiniendo lo que significa el software. Fui a estudiarla a fondo.',
        'Ciencia de datos, fundamentos y conceptos profundos de IA en la Data Science Academy.',
        'La base que hoy se convierte en agentes de IA (LangGraph, RAG) funcionando en producción.',
      ],
    },
    {
      year: '2024',
      age: '50 años',
      title: 'Go, Rust & infraestructura',
      subtitle: 'Aprendiendo directo de la fuente: documentación y cursos puntuales',
      bullets: [
        'Ya con una programación madura, el aprendizaje cambió de forma: documentación oficial y cursos puntuales en Alura y Udemy.',
        'Go y Rust: lenguajes de backend modernos, rápidos y seguros, para servicios de alto rendimiento.',
        'Redes de computadoras para DevOps (HTTP, DNS, sockets, Wireshark) y gestión de proyectos con SCRUM y GTD.',
      ],
    },
    {
      year: '2023 – hoy',
      age: '49 – 52 años',
      title: 'Productos en producción',
      subtitle: 'De la arquitectura al deploy, de punta a punta',
      location: 'Brasil · Italia · EE. UU.',
      bullets: [
        'Revalida Italia: plataforma de enseñanza robusta construida desde cero, con clases en entorno 3D, integraciones vía API y alojamiento en AWS.',
        'El sitio 3D del estudio en línea: experiencia guiada por scroll con Three.js, prueba viva del stack.',
        'CRM con IA que automatiza mi propio proceso comercial: calificación de leads, propuestas y análisis financiero.',
        'Sistemas con agentes de IA (LangGraph, RAG) integrados en productos reales.',
        'Deploy cloud-native en AWS con Docker, Terraform y Kubernetes, para clientes en Brasil, Italia y EE. UU.',
      ],
    },
    {
      year: '2025–2026',
      age: '51 años',
      title: 'MBA en Ingeniería de Software con IA',
      subtitle: 'Full Cycle · en curso',
      bullets: [
        'MBA de 400 horas enfocado en el nuevo perfil de ingeniero de la era de la IA.',
        'Arquitectura en la era de la IA: agentes vs microservicios, protocolos MCP y A2A, RAG y vector databases.',
        'Desarrollo orientado por IA (AI-driven workflow), desarrollo de agentes (LangGraph, CrewAI), prompt engineering y DevOps/SRE con IA.',
        'La formalización de un camino que ya practico en producción: IA en el workflow diario y agentes en sistemas reales.',
      ],
    },
  ],
};
